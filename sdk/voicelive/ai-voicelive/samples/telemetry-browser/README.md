# Browser Telemetry Sample — Azure Voice Live SDK

This sample shows how to enable **distributed tracing** (OpenTelemetry) for the
`@azure/ai-voicelive` SDK running in a browser.

Captured spans are rendered directly in the page so you can inspect the
`connect → send / recv → close` hierarchy without opening DevTools.

## Prerequisites

| Requirement | Details |
|---|---|
| Node.js | >= 18 (for the Vite dev server) |
| Azure Foundry Agent endpoint | e.g. `https://<your-foundry>.services.ai.azure.com` |
| API key | Foundry-level key with inference permissions |

## Setup

```bash
cd samples/telemetry-browser
npm install
npm run dev          # starts Vite on http://localhost:3001
```

Open the URL in a browser, enter your **endpoint** and **API key**, then click
**Connect**.  The panel below the form will show spans as they are exported.

## What happens

1. A `WebTracerProvider` and the Azure SDK instrumentation bridge are
   configured at module load time.
2. When you click Connect, the sample creates a `VoiceLiveClient` with an
   `AzureKeyCredential`, starts a session, and sends a short text prompt.
3. Each SDK operation (`connect`, `send`, `recv`, `disconnect`) produces
   OpenTelemetry spans that appear in the page.

> **Note:** The browser cannot use `DefaultAzureCredential`.  Use
> `AzureKeyCredential` (or a bearer-token flow) instead.

## Node.js equivalent

See the companion [Node.js telemetry sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voicelive/ai-voicelive/samples/telemetry/README.md) for a
console-based exporter and Azure Monitor integration.
