# Azure VoiceLive SDK — Telemetry Sample

This sample demonstrates how to enable **OpenTelemetry tracing** for the Azure VoiceLive SDK. When enabled, the SDK automatically emits spans for every WebSocket operation:

| Span | Description |
|------|-------------|
| `connect` | Root span covering the entire session lifetime |
| `send <event_type>` | One span per outgoing client event |
| `recv <event_type>` | One span per incoming server event (deltas are skipped) |
| `close` | Final span that flushes session-level counters |

All spans follow [GenAI Semantic Conventions v1.34.0](https://opentelemetry.io/docs/specs/semconv/gen-ai/).

## Prerequisites

1. An Azure AI Foundry resource with a deployed realtime model (`gpt-4o-realtime-preview`).
2. Node.js 18+.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Set the required environment variables:

   ```bash
   export AZURE_VOICELIVE_ENDPOINT="https://your-resource.cognitiveservices.azure.com"
   export AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING="true"
   ```

## Running the sample

```bash
# Basic — traces printed to the console
AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING=true npx tsx index.ts

# With content recording (captures event payloads in span events)
AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING=true \
OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=true \
npx tsx index.ts
```

## Viewing traces

### Console exporter (default)

Spans are printed directly to your terminal.

### Jaeger

1. Start Jaeger with OTLP:
   ```bash
   docker run -d --name jaeger \
     -p 16686:16686 \
     -p 4318:4318 \
     jaegertracing/jaeger:latest
   ```
2. Run the sample — spans are sent to `http://localhost:4318` automatically.
3. Open [http://localhost:16686](http://localhost:16686) and search for the `@azure/ai-voicelive` service.

### .NET Aspire Dashboard

```bash
docker run -d -p 18888:18888 -p 4317:18889 \
  mcr.microsoft.com/dotnet/aspire-dashboard:latest
```

## What gets traced

### Session-level attributes (on the `connect` span)

- `gen_ai.voice.session_id` — WebSocket session ID
- `gen_ai.conversation.id` — conversation ID
- `gen_ai.request.model` — deployed model name
- `gen_ai.voice.turn_count` — number of completed turns
- `gen_ai.voice.interruption_count` — user interruptions
- `gen_ai.voice.audio_bytes_sent` / `audio_bytes_received` — audio traffic
- `gen_ai.voice.mcp_call_count` / `mcp_list_tools_count` — MCP tool activity
- `gen_ai.voice.first_token_latency_ms` — time to first audio/text token
- Agent attributes (`gen_ai.agent.name`, `gen_ai.agent.id`, etc.) when in agent mode

### Per-event attributes

- `gen_ai.voice.event_type` — the realtime protocol event type
- `gen_ai.voice.message_size` — serialized message size in bytes
- `gen_ai.response.id`, `gen_ai.voice.call_id`, `gen_ai.voice.item_id` — correlation IDs
- `gen_ai.usage.input_tokens` / `output_tokens` — token counts (on `response.done`)
- `gen_ai.response.finish_reasons` — completion status

### Content recording

When `enableContentRecording: true` or `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=true`:

- `gen_ai.event.content` is added to span events with full JSON payloads
- System instructions are captured as `gen_ai.system.instruction` events
- Function call arguments and results are included in done-event content

> **Note:** Content recording may capture sensitive data. Enable it only in development or controlled environments.

## Troubleshooting

### Traces not appearing

1. **Env var not set** — `AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING` must be exactly `"true"` (case-insensitive). Without it, `instrument()` silently returns without enabling tracing.
2. **OTel not installed** — `new VoiceLiveInstrumentor()` throws if `@opentelemetry/api` is not installed. Install it with `npm install @opentelemetry/api`.
3. **Provider not registered** — Call `provider.register()` before `new VoiceLiveInstrumentor()` so the SDK can find the active tracer.
4. **Using ESM** — In ESM mode, the SDK may not find `@opentelemetry/api` via `require()`. Use the `preload.mts` script (included in this sample) to polyfill `globalThis.require`.

### Content recording not working

- Ensure `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=true` is set, **or** pass `{ enableContentRecording: true }` to `instrument()`.
- Content appears in **span events** (not span attributes). Look for `gen_ai.event.content` inside event entries when viewing spans.

### OTLP export errors

- `ECONNREFUSED` on `localhost:4318` means no OTLP collector is running. Start Jaeger or Aspire Dashboard (see above), or remove the OTLP exporter.

## Other samples

- **Browser:** [`../telemetry-browser/`](../telemetry-browser/) — In-page span viewer with Vite, microphone input, no Node.js required
- **Agent mode:** [`agentTelemetry.ts`](./agentTelemetry.ts) — Function calling and MCP tool tracing with agent-specific attributes
