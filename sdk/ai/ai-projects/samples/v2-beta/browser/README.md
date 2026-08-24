# Foundry Voice Agent browser sample

This Vite app demonstrates the browser build of `@azure/ai-projects`. The browser SDK owns REST
models, protocol serialization, event handling, audio, and the direct WebSocket connection. Because
browsers cannot set an `Authorization` header during a WebSocket upgrade, the SDK sends the
Microsoft Entra token as an `authorization.bearer.<token>` WebSocket subprotocol. A loopback-only
Vite plugin supplies Azure CLI authentication for local development.

## Prerequisites

| Input                              | Required | Default                          | Purpose                                                                                                                                      |
| ---------------------------------- | -------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Node.js 22 or later                | Yes      | None                             | Runs Vite and the loopback-only token endpoint.                                                                                              |
| Project endpoint in the UI         | Yes      | `VITE_FOUNDRY_PROJECT_ENDPOINT`  | Foundry project endpoint, for example `https://<resource>.services.ai.azure.com/api/projects/<project>`.                                     |
| Voice agent selection              | No       | Preferred or first enabled agent | **Load agents** lists enabled agents from the project. The configured preference is selected when found; otherwise the first agent is used.  |
| `VITE_FOUNDRY_PROJECT_ENDPOINT`    | No       | Empty                            | Optional project-endpoint prefill for the UI.                                                                                                |
| `VITE_FOUNDRY_VOICE_AGENT_NAME`    | No       | First enabled agent              | Optional preferred agent selection after the list is loaded.                                                                                 |
| `VITE_FOUNDRY_CLIENT_REFERENCE_EC` | No       | `false`                          | Prefills the client-reference echo cancellation checkbox.                                                                                    |
| Azure CLI login                    | Yes      | None                             | Run `az login` as a user with project access, such as the Foundry User role. The Vite plugin uses this session through `AzureCliCredential`. |
| Agent PCM output                   | No       | Agent setting                    | Enables streamed audio playback. The app reads the configured PCM sample rate; if the output is not PCM, it requests text output only.       |
| Browser microphone permission      | No       | Denied                           | Required only to use **Start microphone**. Text messages and response audio playback do not require microphone access.                       |

The project endpoint is the only required value entered in the UI. All
`VITE_FOUNDRY_*` variables are optional conveniences. No SPA client ID, tenant ID,
client secret, API key, raw access token, or direct Voice Agent WebSocket URL is an input to this
sample.

> The Voice Agent management and realtime APIs are preview service features. This sample builds
> against the target TypeSpec contract, but live requests require that contract to be deployed in
> the selected Foundry project and region. In particular, the endpoint must accept
> `foundry_features=VoiceAgents=V1Preview` on the WebSocket URL.

No SPA client ID, tenant ID, client secret, or API key is required. The Vite plugin uses
`AzureCliCredential` to expose a no-store token endpoint to the same-origin page. The SDK uses that
short-lived token for REST requests and sends it directly to the Voice Agent WebSocket endpoint in
the credential subprotocol alongside the `realtime` application subprotocol. The required
`VoiceAgents=V1Preview` feature value is sent in the `foundry_features` query parameter.

The token endpoint is intentionally local-development only. For a deployed web app, use an approved
user-delegated Microsoft Entra flow, such as `InteractiveBrowserCredential` with a registered SPA,
or supply a `TokenCredential` backed by your application's authentication flow.

## Run

Sign in with Azure CLI and start the sample. Copying `sample.env` to `.env` is optional and only
prefills the endpoint and preferred agent:

```bash
az login
npm install
npm run dev
```

Open `http://127.0.0.1:5173/`, enter the project endpoint, and select **Load agents**. The sample
lists enabled voice agents and preselects the configured preference or the first result. **Connect**
then reuses the Azure CLI session, verifies the selected agent through the management REST API, and
connects its voice WebSocket directly using Microsoft Entra subprotocol authentication. Enable
**Client-reference echo cancellation** before connecting to send interleaved stereo PCM16: channel 0
is microphone input and channel 1 is the agent audio tapped from the browser's rendered playback.
When the option is off, the microphone sends the existing mono 24 kHz PCM16 stream.
Capture and playback follow the [VoiceLive basic web voice assistant](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/voicelive/ai-voicelive/samples/basic-web-voice-assistant)
audio pattern: request a capture context, convert audio to 24 kHz PCM16, play response chunks
sequentially, and clear queued output when a response is replaced or interrupted.
The conversation follows new streamed phrases while the reader remains near the bottom; scrolling
up pauses that behavior until the reader returns to the latest messages.
**Clear chat** removes only the messages rendered in the browser and resets the transcript viewport;
it does not delete persisted data, disconnect the live session, clear the conversation ID, or remove
the fetched recording.

Realtime connections set `store: true` so the service persists the sample conversation. The sample
reads the persisted resource ID from the `session.created` event and displays it in both the
**Conversation ID** field and the conversation header. It intentionally does not use the shorter
default-conversation ID carried by response events. A new `session.created` event replaces the ID
from the previous session. After disconnecting, **Fetch conversation** calls
`agentEndpointConversations.getAgentConversation` and
`agentEndpointConversations.listAgentConversationItems` for the selected agent, then replaces the
transcript with the persisted user and assistant messages. A conversation ID from another session
can also be pasted into the field, provided the agent that owns it is selected.

The same fetch also calls `agentEndpointConversations.getAgentConversationAudio` for whole-call
recording metadata. For Foundry-managed storage, it retrieves the WAV with
`getAgentConversationAudioContent` and exposes playback and download controls above the transcript.
Audio is optional and finalized after the session ends, so an unavailable or not-yet-ready recording
does not prevent text from loading. BYOS metadata is shown, but its bytes must be downloaded from the
customer storage account with customer credentials because the Foundry route does not proxy them.

## Client-reference echo cancellation

When enabled, the sample sends a narrow `session.update` immediately after the WebSocket connects and
before microphone capture starts:

```json
{
  "type": "realtime",
  "audio": {
    "input": {
      "format": { "type": "audio/pcm", "rate": 24000 },
      "echo_cancellation": {
        "type": "server_echo_cancellation",
        "reference_source": "client",
        "channels": 2
      }
    }
  }
}
```

The microphone and playback tap share one Web Audio context so each uploaded frame is aligned as
`[microphone, rendered playback reference]`. Browser-provided echo cancellation and noise suppression
are disabled in this mode to avoid applying echo cancellation twice. The selected agent must produce
PCM audio; the sample rejects client-reference mode for non-PCM output.

## Management APIs

The **Management** tab calls the generated management methods independently and displays each JSON
response. **Get agent** and **Get version** load the returned definition into the JSON editor for
subsequent update or version operations. A shared agent target sits above the **Agents** and
**Versions** resource views. **Generate agent** is the primary generation command and opens the
editor in **Generate** mode. **Create from definition** is a separate creation command that opens
the editor in **From definition** mode. The in-editor mode toggle can switch between both methods.
**Edit definition** and **Create version** open the definition editor in their respective contexts;
optional write settings stay collapsed until needed.

| UI action      | SDK method             | Required inputs                          |
| -------------- | ---------------------- | ---------------------------------------- |
| List agents    | `agents.list`          | Project endpoint                         |
| Get agent      | `agents.get`           | Project endpoint, agent name             |
| Create agent   | `agents.create`        | Project endpoint, agent name, definition |
| Generate agent | `agents.generateAgent` | Project endpoint, agent name             |
| Update agent   | `agents.update`        | Project endpoint, agent name, definition |
| Enable agent   | `agents.enable`        | Project endpoint, agent name             |
| Disable agent  | `agents.disable`       | Project endpoint, agent name             |
| Delete agent   | `agents.delete`        | Project endpoint, agent name             |
| List versions  | `agents.listVersions`  | Project endpoint, agent name             |
| Get version    | `agents.getVersion`    | Endpoint, agent name, version            |
| Create version | `agents.createVersion` | Endpoint, agent name, definition         |
| Delete version | `agents.deleteVersion` | Endpoint, agent name, version            |

Description and initial state are optional. The JSON definition requires `kind`, `model_type`, and `model`; other definition fields
are service- and model-dependent. **Delete agent** and **Delete version** display a confirmation
dialog and operate only on the explicitly entered name and version. No management action runs
automatically.

## Build

```bash
npm run build
npm run preview
```
