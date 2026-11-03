# VoiceLive Telemetry — Node.js Sample

Demonstrates enabling distributed tracing for the Azure Voice Live SDK in a Node.js application.

## What this shows

- **Console exporter** (`src/index.ts`) — prints spans to stdout for local debugging
- **Azure Monitor exporter** (`src/azure-monitor.ts`) — sends spans to Application Insights

> **Why these samples use `useInstrumenter` instead of `createAzureSdkInstrumentation`**
>
> Both samples are ESM (`"type": "module"`). `@azure/opentelemetry-instrumentation-azure-sdk` patches the SDK via CommonJS `require`-hooks, which do not fire on ESM `import`s, so it emits no spans in this configuration. We instead bridge `@azure/core-tracing` directly into OpenTelemetry via `useInstrumenter()`, which produces the same spans in both ESM and CommonJS.
>
> If your app is **CommonJS**, prefer the canonical `createAzureSdkInstrumentation()` pattern shown in the [package README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voicelive/ai-voicelive/README.md#telemetry--distributed-tracing) — it matches every other Azure SDK for JavaScript.

## Setup

```bash
# Install dependencies
npm install

# Set environment variables
export AZURE_VOICELIVE_ENDPOINT="https://your-resource.cognitiveservices.azure.com"
# For Azure Monitor sample only:
export APPLICATIONINSIGHTS_CONNECTION_STRING="InstrumentationKey=..."
```

## Run

```bash
# Console exporter — spans printed to stdout
npm run dev

# Azure Monitor exporter — spans sent to Application Insights
npm run start:monitor
```

## What to expect

The console exporter prints one span per operation:

```
connect                          ← parent span (session lifetime)
  send session.update            ← child span
  recv session.created           ← child span
  send conversation.item.create  ← child span
  send response.create           ← child span
  recv response.created          ← child span
  recv response.done             ← child span (token usage recorded)
  close                          ← child span (session counters flushed)
```

Each span carries GenAI semantic convention attributes:

| Attribute | Example value |
|---|---|
| `az.namespace` | `Microsoft.CognitiveServices` |
| `gen_ai.system` | `az.ai.voicelive` |
| `gen_ai.operation.name` | `connect` / `send` / `recv` / `close` |
| `gen_ai.voice.session_id` | `sess_abc123` |
| `gen_ai.voice.turn_count` | `1` |
| `gen_ai.voice.first_token_latency_ms` | `342.5` |

For the browser version, see [`samples/telemetry-browser/`](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voicelive/ai-voicelive/samples/telemetry-browser/README.md).
