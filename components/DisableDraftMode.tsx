"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";
import { useRouter } from "next/navigation";

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment();
  const router = useRouter();

  // Show the button only when in draft mode
  if (environment === "live" || environment === "unknown") {
    return null;
  }

  const handleClick = async () => {
    await fetch("/api/draft-mode/disable");
    router.refresh();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 bg-gray-50 hover:bg-gray-100 text-gray-900 rounded px-4 py-2 cursor-pointer z-50"
    >
      Exit draft mode
    </button>
  );
}
