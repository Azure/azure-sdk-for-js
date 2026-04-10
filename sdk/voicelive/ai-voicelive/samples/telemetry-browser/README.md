# Browser Telemetry Sample

Demonstrates **OpenTelemetry tracing** for the Azure VoiceLive SDK running entirely in the browser using `@opentelemetry/sdk-trace-web`.

Spans are rendered inline on the page via a custom `DomSpanExporter`. Optionally, spans can also be exported to an OTLP-compatible collector (e.g., Jaeger or Aspire Dashboard) for richer visualization.

## Prerequisites

1. An Azure AI Foundry resource with a deployed realtime model (`gpt-4o-realtime-preview`).
2. Node.js 18+.
3. (Optional) A local OTLP collector — [Jaeger all-in-one](https://www.jaegertracing.io/docs/latest/getting-started/) or [.NET Aspire Dashboard](https://learn.microsoft.com/dotnet/aspire/fundamentals/dashboard/standalone).

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3001`, enter your endpoint and API key, and click **Connect**. Traced spans appear in the **Traced Spans** panel at the bottom of the page.

## How It Works

| Component | Description |
|-----------|-------------|
| `WebTracerProvider` | Browser-compatible OTel trace provider |
| `DomSpanExporter` | Custom exporter that renders spans directly in the page |
| `OTLPTraceExporter` | Sends spans to a collector (optional — leave the field empty to skip) |
| `VoiceLiveInstrumentor` | SDK hook that auto-emits spans for connect / send / recv / close |

All spans follow [GenAI Semantic Conventions v1.34.0](https://opentelemetry.io/docs/specs/semconv/gen-ai/).

## Configuration

| Field | Description |
|-------|-------------|
| **Endpoint** | Your Azure AI Foundry endpoint |
| **API Key** | Azure API key |
| **OTLP Endpoint** | (Optional) Where to export spans for external visualization. Leave empty to only display spans in the page. Enter `http://localhost:4318` if you have a local collector running. |
| **Content Recording** | Whether to include full event payloads (instructions, tool definitions, function call arguments) in span events. When enabled, span events include a `gen_ai.event.content` attribute with the serialized payload. |

## Reading the Traced Spans Panel

Each entry in the **Traced Spans** panel shows:

- **Span name** (highlighted) — e.g., `send session.update`, `recv session.created`, `recv response.done`
- **Duration** — time from span start to end
- **Attributes** — key-value pairs following GenAI semantic conventions, such as:
  - `gen_ai.voice.session_id` — the session identifier
  - `gen_ai.voice.event_type` — the WebSocket event type
  - `gen_ai.voice.message_size` — serialized message size in bytes
  - `gen_ai.usage.input_tokens` / `gen_ai.usage.output_tokens` — token counts (on `response.done`)
  - `gen_ai.voice.first_token_latency_ms` — time to first token
- **Events** (when Content Recording is enabled) — contain the full event payload under `gen_ai.event.content`

The `connect` span is a long-lived root span that only appears after you click **Disconnect** — it carries session-level counters like turn count, audio bytes, and interruptions.

For the full attribute reference, see the [Node.js telemetry sample README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voicelive/ai-voicelive/samples/telemetry/README.md).

## Browser-Specific Notes

Running the VoiceLive SDK with OpenTelemetry in the browser requires a few polyfills that this sample sets up automatically:

1. **`globalThis.require` polyfill** — The SDK loads `@opentelemetry/api` via `require()`. In the browser, this sample provides a shim that returns the bundled OTel API module.
2. **`process.env` polyfill** — The SDK gates tracing on the `AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING` environment variable. This sample sets it on `globalThis.process.env` before enabling instrumentation.
3. **`@opentelemetry/api` deduplication** — The Vite config aliases `@opentelemetry/api` to a single copy to ensure the provider and SDK share the same global tracer registry.

## Troubleshooting

### Spans show 0 / no spans appearing

- **OTel API not found** — If you see `OpenTelemetry is not installed`, the `globalThis.require` polyfill must run before `new VoiceLiveInstrumentor()`. Check that the polyfill is at the top of your entry file.
- **Provider not registered** — `WebTracerProvider.register()` must be called before creating the instrumentor. The OTel API only allows one global registration.
- **Duplicate `@opentelemetry/api`** — If the SDK and your app use different copies, spans are no-ops. Add a Vite resolve alias (see `vite.config.ts` in this sample).
- **`trace.setSpan is not a function`** — The SDK fell back to the OTel global symbol which lacks the full API. Ensure the `globalThis.require` polyfill returns the real `@opentelemetry/api` module.

### Content recording not working

- Content data appears in **span events** (not attributes). Look for `gen_ai.event.content` entries under each span in the Traced Spans panel.
- Ensure the Content Recording dropdown is set to **Enabled** before clicking Connect.

### `ERR_CONNECTION_REFUSED` on OTLP endpoint

- This means no local collector is running. Leave the OTLP Endpoint field **empty** to suppress these errors — spans will still render in the page.

### Microphone not working

- Check that the browser has microphone permission (click the lock icon in the address bar).
- Ensure you're on `localhost` or HTTPS — browsers block mic access on insecure origins.
