# Voice Agents browser sample

This Vite app demonstrates the browser build of `@azure/ai-voiceagents`. It follows the short-term
Voice Agent web bridge from
[`@azure/ai-voicelive`](https://github.com/niuzheng168/azure-sdk-for-js/commit/d326e5ea7185e4b08c1470916517480a85e8239e):
the browser SDK still owns REST models, protocol serialization, event handling, and audio, while a
loopback-only Vite plugin supplies local Azure CLI authentication and adds the headers that browser
WebSockets cannot set.

## Prerequisites

| Input                                | Required | Default                            | Purpose                                                                                                                                      |
| ------------------------------------ | -------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Node.js 22 or later                  | Yes      | None                               | Runs Vite and the loopback-only authentication bridge.                                                                                       |
| Project endpoint in the UI           | Yes      | `VITE_AZURE_VOICE_AGENTS_ENDPOINT` | Foundry project endpoint, for example `https://<resource>.services.ai.azure.com/api/projects/<project>`.                                     |
| Voice agent selection                | No       | Preferred or first enabled agent   | **Load agents** lists enabled agents from the project. The configured preference is selected when found; otherwise the first agent is used.  |
| `VITE_AZURE_VOICE_AGENTS_ENDPOINT`   | No       | Empty                              | Optional project-endpoint prefill for the UI.                                                                                                |
| `VITE_AZURE_VOICE_AGENTS_AGENT_NAME` | No       | First enabled agent                | Optional preferred agent selection after the list is loaded.                                                                                 |
| Azure CLI login                      | Yes      | None                               | Run `az login` as a user with project access, such as the Foundry User role. The Vite plugin uses this session through `AzureCliCredential`. |
| Agent PCM output                     | No       | Agent setting                      | Enables streamed audio playback. The app reads the configured PCM sample rate; if the output is not PCM, it requests text output only.       |
| Browser microphone permission        | No       | Denied                             | Required only to use **Start microphone**. Text messages and response audio playback do not require microphone access.                       |

The project endpoint is the only required value entered in the UI. Both
`VITE_AZURE_VOICE_AGENTS_*` variables are optional conveniences. No SPA client ID, tenant ID,
client secret, API key, raw access token, or direct Voice Agent WebSocket URL is an input to this
sample.

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

## Management APIs

The **Management** tab calls the generated management methods independently and displays each JSON
response. **Get agent** and **Get version** load the returned definition into the JSON editor for
subsequent update or version operations. A shared agent target sits above the **Agents** and
**Versions** resource views. **Generate agent** is the primary creation command and opens
**Generate from goal** by default. **Create from definition** remains a secondary creation path;
the creation editor can switch between both modes. **Edit definition** and **Create version** open
the definition editor in their respective contexts. Optional write settings stay collapsed until
needed.

| UI action      | SDK method                | Required inputs                          |
| -------------- | ------------------------- | ---------------------------------------- |
| List agents    | `listVoiceAgents`         | Project endpoint                         |
| Get agent      | `getVoiceAgent`           | Project endpoint, agent name             |
| Create agent   | `createVoiceAgent`        | Project endpoint, agent name, definition |
| Generate agent | `generateVoiceAgent`      | Endpoint, name, model inputs, goal       |
| Update agent   | `updateVoiceAgent`        | Project endpoint, agent name, definition |
| Enable agent   | `enableVoiceAgent`        | Project endpoint, agent name             |
| Disable agent  | `disableVoiceAgent`       | Project endpoint, agent name             |
| Delete agent   | `deleteVoiceAgent`        | Project endpoint, agent name             |
| List versions  | `listVoiceAgentVersions`  | Project endpoint, agent name             |
| Get version    | `getVoiceAgentVersion`    | Endpoint, agent name, version            |
| Create version | `createVoiceAgentVersion` | Endpoint, agent name, definition         |
| Delete version | `deleteVoiceAgentVersion` | Endpoint, agent name, version            |

Description, initial state, draft creation, and inclusion of drafts in version listings are
optional. The JSON definition requires `kind`, `model_type`, and `model`; other definition fields
are service- and model-dependent. **Delete agent** and **Delete version** display a confirmation
dialog and operate only on the explicitly entered name and version. No management action runs
automatically.

## Build

```bash
npm run build
npm run preview
```
