import { useEffect, useRef, useState } from "react";

export function OfficialPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [frameHeight, setFrameHeight] = useState(900);

  useEffect(() => {
    const iframe = iframeRef.current;

    if (!iframe) {
      return;
    }

    let resizeObserver: ResizeObserver | null = null;
    let intervalId: number | undefined;
    const timeoutIds: number[] = [];

    const updateHeight = () => {
      try {
        const doc = iframe.contentDocument;

        if (!doc) {
          return;
        }

        const body = doc.body;
        const root = doc.documentElement;
        const nextHeight = Math.max(
          body?.scrollHeight ?? 0,
          body?.offsetHeight ?? 0,
          root?.scrollHeight ?? 0,
          root?.offsetHeight ?? 0
        );

        if (nextHeight > 0) {
          setFrameHeight(Math.ceil(nextHeight));
        }
      } catch {
        setFrameHeight(12000);
      }
    };

    const handleLoad = () => {
      updateHeight();

      try {
        const doc = iframe.contentDocument;

        if (doc?.body && "ResizeObserver" in window) {
          resizeObserver?.disconnect();
          resizeObserver = new ResizeObserver(updateHeight);
          resizeObserver.observe(doc.body);
          resizeObserver.observe(doc.documentElement);
        }
      } catch {
        // The copied page is local, but keep a fallback in case the browser blocks access.
      }

      intervalId = window.setInterval(updateHeight, 1000);
      [250, 800, 1600, 3000, 5000].forEach((delay) => {
        timeoutIds.push(window.setTimeout(updateHeight, delay));
      });
    };

    iframe.addEventListener("load", handleLoad);

    if (iframe.contentDocument?.readyState === "complete") {
      handleLoad();
    }

    return () => {
      iframe.removeEventListener("load", handleLoad);
      resizeObserver?.disconnect();

      if (intervalId) {
        window.clearInterval(intervalId);
      }

      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  return (
    <main className="official-mirror-page" aria-label="Terminal Sekinchan official website">
      <div className="official-mirror-frame-shell" style={{ height: frameHeight }}>
        <iframe
          ref={iframeRef}
          className="official-mirror-frame"
          src="/official/index.html"
          title="Terminal Sekinchan official page copy"
          loading="eager"
          scrolling="no"
        />
      </div>
    </main>
  );
}
