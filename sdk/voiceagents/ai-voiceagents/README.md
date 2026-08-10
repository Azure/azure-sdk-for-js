# Azure AI Voice Agents client library for JavaScript

The Azure AI Voice Agents client library manages Foundry voice agents and connects applications to
those agents over a bidirectional WebSocket. It supports Node.js and modern browsers.

Use this package to:

- Create, retrieve, update, list, enable, disable, and delete voice agents and versions.
- Read persisted voice-agent conversations, responses, items, and audio.
- Configure a live voice-agent session.
- Send text or PCM/G.711 audio and receive typed text, audio, transcription, tool, search, handoff,
  avatar, warning, and error events.
- Return client-executed function results and cancel active responses.

## Getting started

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/).
- An Azure AI Foundry project with Voice Agents preview access.
- Node.js 22 or later, or a current version of Chrome, Edge, Firefox, or Safari.

### Install packages

```bash
npm install @azure/ai-voiceagents @azure/identity
```

### Authenticate

The root client uses a `TokenCredential` for both management and streaming operations.
`DefaultAzureCredential` is suitable for local development and managed identity deployments:

```ts
import { VoiceAgentsClient } from "@azure/ai-voiceagents";
import { DefaultAzureCredential } from "@azure/identity";

const endpoint = "https://example.services.ai.azure.com/api/projects/my-project";
const credential = new DefaultAzureCredential();

const client = new VoiceAgentsClient(endpoint, credential);
```

The default Microsoft Entra scope is `https://ai.azure.com/.default`.

## Management API

Management operations are generated directly from TypeSpec and are grouped under
`client.voiceAgents`. Voice-agent preview operations require the `VoiceAgents=V1Preview` feature
header, represented by the first generated method argument:

```ts
import { VoiceAgentsClient } from "@azure/ai-voiceagents";
import { DefaultAzureCredential } from "@azure/identity";

const client = new VoiceAgentsClient(endpoint, new DefaultAzureCredential());
const preview = "VoiceAgents=V1Preview";

const agent = await client.voiceAgents.createVoiceAgent(preview, "support-agent", {
  kind: "voice",
  model_type: "managed",
  model: "gpt-realtime",
  instructions: "Help customers with concise, spoken answers.",
  output_modalities: ["text", "audio"],
});

const current = await client.voiceAgents.getVoiceAgent(preview, agent.name);

for await (const item of client.voiceAgents.listVoiceAgents(preview)) {
  console.log(item.name, item.state);
}
```

Persisted conversation reads are available under `client.agentEndpointConversations` when the
agent definition has `store: true`.

## Streaming API

Streaming follows the same operation-group hierarchy as the Foundry client. Call
`client.streaming.connect` to authenticate the WebSocket upgrade and obtain a
`VoiceAgentConnection`. A connection is an `AsyncIterable<VoiceAgentServerEvent>` and supports one
active iterator. The root client shares its endpoint, credential, API version, credential scopes,
and user-agent options with the streaming operation group.

```ts
const connection = await client.streaming.connect("support-agent", {
  agentSessionId: "call-42",
  structuredInputs: { customerName: "Ada" },
});

try {
  await connection.configureSession({
    type: "realtime",
    output_modalities: ["text", "audio"],
    audio: {
      input: { format: { type: "audio/pcm", rate: 24000 } },
    },
  });

  await connection.sendText("How can you help me?");

  for await (const event of connection) {
    switch (event.type) {
      case "response.output_text.delta":
      case "response.output_audio_transcript.delta":
        process.stdout.write(event.delta);
        break;
      case "response.output_audio.delta":
        playPcmAudio(event.delta);
        break;
      case "error":
        throw new Error(event.error.message);
      case "response.done":
        await connection.close();
        break;
    }
  }
} finally {
  await connection.dispose();
}
```

Audio deltas are deserialized to plain `Uint8Array` values in both Node.js and browsers. Audio input
can be an `ArrayBuffer` or `Uint8Array`:

```ts
await connection.sendAudio(pcmBytes);
await connection.commitAudio();
await connection.requestResponse();
```

### Function calls

Use generated function-call events and `sendToolOutput` for client-executed tools:

```ts
for await (const event of connection) {
  if (event.type === "response.function_call_arguments.done") {
    const args = JSON.parse(event.arguments);
    const output = await runFunction(event.name, args);
    await connection.sendToolOutput(event.call_id, JSON.stringify(output));
  }
}
```

`sendEvent` accepts the complete generated `VoiceAgentClientEvent` union for protocol features that
do not have a convenience method.

### Cancellation and connection state

Pass an `AbortSignal` to `connect`, `sendEvent`, or any convenience send method. Connection state is
available through `connection.state` and the `onConnectionStateChange` connect option. Transport and
protocol failures reject the event iterator with a typed `VoiceAgentStreamingError`; the
`connection.closed` promise always resolves with the WebSocket close details.

The SDK does not reconnect automatically. The v1 protocol does not define session resumption, so an
unexpected disconnect ends the connection and the application should create a new one explicitly.

### Browser authentication

Browser WebSocket APIs cannot set upgrade headers. Following the Azure Voice Live browser transport
convention, the browser sample keeps `VoiceAgentsClient` in the page but uses a loopback-only Vite
development plugin for authentication. The plugin gets a token from `AzureCliCredential`, exposes a
no-store token endpoint for management REST calls, and opens the upstream Voice Agent WebSocket with
the required `Authorization` and `Foundry-Features` headers. Protocol frames are relayed unchanged.

This bridge is local-development infrastructure, not a production authentication design. It needs
an `az login` session but no SPA client ID, tenant ID, client secret, or API key. A production app
should use authenticated application infrastructure with managed identity, or deliberately use
user-delegated browser authentication with a registered SPA and `InteractiveBrowserCredential`.

## Samples

Runnable JavaScript and TypeScript samples are under `samples/v1-beta`:

- `managementLifecycle`: create, get, update, list, and delete.
- `liveTextAndTools`: management lookup/create, text input, text/audio output, and function calls.
- `liveAudioFile`: management lookup/create, raw PCM input, and streamed PCM/text output.
- `browser`: Azure CLI development authentication, independent agent and version management API
  operations, text/microphone input, streaming text/audio, browser-local tools, and explicit
  connection cleanup.

The live samples use only `@azure/ai-voiceagents`; they do not depend on Voice Live.
The Node samples require endpoint and agent-name environment variables. Model and audio-file
variables are optional and have sample-specific defaults. In the browser sample, the project
endpoint is the only required typed value; the SDK lists enabled agents for selection. Its
`VITE_AZURE_*` variables only prefill the endpoint and preferred agent. See each sample README and
`sample.env` for the complete parameter matrix.

## Troubleshooting

Set `AZURE_LOG_LEVEL=info` or use `setLogLevel("info")` from `@azure/logger` to inspect SDK logs.
`VoiceAgentServerEventError` values are service protocol errors and remain in the event stream;
connection and parsing failures are raised as `VoiceAgentConnectionError` or
`VoiceAgentProtocolError`.

## Contributing

See the Azure SDK for JavaScript [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md).
