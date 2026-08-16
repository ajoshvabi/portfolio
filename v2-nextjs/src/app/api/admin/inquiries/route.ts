import { NextResponse } from "next/server";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const systemPassword = process.env.ADMIN_PASSWORD || "admin123";

    // Extract cookie header
    const cookieHeader = request.headers.get("cookie") || "";
    const hasAdminSession = cookieHeader.split(";").some(c => c.trim().startsWith("admin_session=true"));

    const isCookieAuth = password === "SESSION_COOKIE" && hasAdminSession;

    if (!isCookieAuth && (!password || password !== systemPassword)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }


    const inquiriesRef = collection(db, "inquiries");
    const q = query(inquiriesRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const inquiries = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
      };
    });

    return NextResponse.json({ inquiries });
  } catch (err) {
    console.error("Failed to fetch inquiries:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
