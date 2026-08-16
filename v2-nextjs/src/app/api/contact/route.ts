import { NextResponse } from "next/server";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Simple in-memory rate limit: max 3 submissions per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return true;
  }

  if (entry.count >= 3) return false;

  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  // Get client IP
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    website?: string; // honeypot
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot check — bots fill this, real users don't see it
  if (body.website) {
    // Silently succeed to confuse bots
    return NextResponse.json({ ok: true });
  }

  const { name, email, subject, message } = body;

  // Validation
  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  if (message.trim().length < 20) {
    return NextResponse.json(
      { error: "Message must be at least 20 characters." },
      { status: 400 }
    );
  }

  try {
    await addDoc(collection(db, "inquiries"), {
      name: name.trim().substring(0, 100),
      email: email.trim().toLowerCase().substring(0, 200),
      subject: subject.trim().substring(0, 200),
      message: message.trim().substring(0, 5000),
      ip,
      createdAt: Timestamp.now(),
      read: false,
    });

    // Send email notification if configured
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailTo = process.env.EMAIL_TO || "ajoshvabi17@gmail.com";

    if (emailUser && emailPass) {
      try {
        const nodemailer = require("nodemailer");
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: emailUser,
            pass: emailPass,
          },
        });

        await transporter.sendMail({
          from: `"Portfolio Contact Form" <${emailUser}>`,
          to: emailTo,
          replyTo: email,
          subject: `Portfolio: ${subject} from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
          html: `<p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Subject:</strong> ${subject}</p>
                 <br/>
                 <p><strong>Message:</strong></p>
                 <p style="white-space: pre-wrap;">${message}</p>`,
        });
      } catch (emailErr) {
        console.error("Nodemailer error:", emailErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Firestore write error (contact):", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try email directly." },
      { status: 500 }
    );
  }
}
