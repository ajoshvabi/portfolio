import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ajosh V Abi — Flutter & MERN Developer",
    short_name: "Aj.Dev",
    description:
      "Freelance Flutter & MERN developer in Kerala, India — building custom mobile apps and web platforms.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f1321",
    theme_color: "#006970",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
