# Foundry Voice Agent browser sample

This Vite app demonstrates the browser build of `@azure/ai-projects`. It follows the short-term
Voice Agent web bridge from
[`@azure/ai-voicelive`](https://github.com/niuzheng168/azure-sdk-for-js/commit/d326e5ea7185e4b08c1470916517480a85e8239e):
the browser SDK still owns REST models, protocol serialization, event handling, and audio, while a
loopback-only Vite plugin supplies local Azure CLI authentication and adds the headers that browser
WebSockets cannot set.

## Prerequisites

| Input                           | Required | Default                          | Purpose                                                                                                                                      |
| ------------------------------- | -------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Node.js 22 or later             | Yes      | None                             | Runs Vite and the loopback-only authentication bridge.                                                                                       |
| Project endpoint in the UI      | Yes      | `VITE_FOUNDRY_PROJECT_ENDPOINT`  | Foundry project endpoint, for example `https://<resource>.services.ai.azure.com/api/projects/<project>`.                                     |
| Voice agent selection           | No       | Preferred or first enabled agent | **Load agents** lists enabled agents from the project. The configured preference is selected when found; otherwise the first agent is used.  |
| `VITE_FOUNDRY_PROJECT_ENDPOINT` | No       | Empty                            | Optional project-endpoint prefill for the UI.                                                                                                |
| `VITE_FOUNDRY_VOICE_AGENT_NAME` | No       | First enabled agent              | Optional preferred agent selection after the list is loaded.                                                                                 |
| Azure CLI login                 | Yes      | None                             | Run `az login` as a user with project access, such as the Foundry User role. The Vite plugin uses this session through `AzureCliCredential`. |
| Agent PCM output                | No       | Agent setting                    | Enables streamed audio playback. The app reads the configured PCM sample rate; if the output is not PCM, it requests text output only.       |
| Browser microphone permission   | No       | Denied                           | Required only to use **Start microphone**. Text messages and response audio playback do not require microphone access.                       |

The project endpoint is the only required value entered in the UI. Both
`VITE_FOUNDRY_*` variables are optional conveniences. No SPA client ID, tenant ID,
client secret, API key, raw access token, or direct Voice Agent WebSocket URL is an input to this
sample.

> The Voice Agent management and realtime APIs are preview service features. This sample builds
> against the target TypeSpec contract, but live requests require that contract to be deployed in
> the selected Foundry project and region.

No SPA client ID, tenant ID, client secret, or API key is required. The Vite plugin uses
`AzureCliCredential` to expose a no-store token endpoint for the management REST request. For the
voice connection, it keeps the token server-side, opens the Foundry WebSocket with `Authorization`
and `Foundry-Features` headers, and relays Voice Agent protocol frames unchanged. Both development
routes validate loopback access and same-origin browser requests.

This bridge is intentionally local-development only. It is not a production authentication design.
For a deployed web app, put the relay behind authenticated application infrastructure and use a
managed identity, or deliberately implement user-delegated browser authentication with a registered
SPA and `InteractiveBrowserCredential`.

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
connects its voice WebSocket through the transparent local bridge. The microphone requires browser
permission and sends mono 24 kHz PCM16 audio with server-side voice activity detection.
Capture and playback follow the [VoiceLive basic web voice assistant](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/voicelive/ai-voicelive/samples/basic-web-voice-assistant)
audio pattern: request a 24 kHz capture context, convert microphone samples to mono PCM16, play
response chunks sequentially, and clear queued output when a response is replaced or interrupted.
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
