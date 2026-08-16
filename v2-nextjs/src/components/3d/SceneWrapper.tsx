"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-background flex items-center justify-center">
      <div className="animate-pulse w-32 h-32 rounded-full bg-primary/20 blur-xl" />
    </div>
  ),
});

export function SceneWrapper() {
  return <Scene />;
}
