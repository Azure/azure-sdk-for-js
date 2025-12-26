// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* ============================================================
   Service Worker: Redirect trace/index.html to trace.playwright.dev
   - Intercepts navigation to trace/index.html with trace parameter
   - Extracts and properly encodes the trace URL
   - Redirects to trace.playwright.dev viewer
   ============================================================ */

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only Azure Blob
  if (!url.hostname.endsWith(".blob.core.windows.net")) return;

  // Never intercept the worker itself
  if (url.pathname.endsWith("/sasworker.js")) return;

  // Intercept trace/index.html with trace parameter
  if (url.pathname.includes("/trace/index.html") && url.searchParams.has("trace")) {

    // Extract the trace parameter value (URL-encoded blob URL)
    const traceParam = url.searchParams.get("trace");

    // Decode it to get the actual blob URL
    const decodedTraceUrl = decodeURIComponent(traceParam);

    // The SAS params are separate query params on the main URL, not part of trace param
    // We need to append them to the decoded trace URL
    const traceUrl = new URL(decodedTraceUrl);

    // Copy all SAS params from the main URL to the trace URL
    for (const [key, value] of url.searchParams.entries()) {
      if (key !== "trace") {
        traceUrl.searchParams.set(key, value);
      }
    }

    const completeTraceUrl = traceUrl.toString();

    // Now encode the entire URL (base + query params together)
    const properlyEncodedUrl = encodeURIComponent(completeTraceUrl);

    // Build the trace.playwright.dev URL
    const traceViewerUrl = `https://trace.playwright.dev/?trace=${properlyEncodedUrl}`;

    event.respondWith(Response.redirect(traceViewerUrl, 302));
    return;
  }
});
