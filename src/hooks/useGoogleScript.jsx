import { useEffect } from "react";

export function useGoogleScript() {
  useEffect(() => {
    const scriptId = "google-identity-service";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.id = scriptId;
      document.head.appendChild(script);
    }
  }, []);
}