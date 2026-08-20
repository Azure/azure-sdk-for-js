# Azure AI Projects Voice Agents private-preview setup

This guide covers the private-preview Voice Agents surface in `@azure/ai-projects` and all samples
that exercise it. It is intended for users who receive the package through an approved private npm
feed or as an npm package tarball (`.tgz`). The public npm registry does not currently contain
`@azure/ai-projects@2.4.1`; obtain the private-preview package location from the preview program
before following the installation steps.

> Private-preview APIs and service deployments are not available in every project or region. A
> successful SDK installation does not enable the service feature. The selected Foundry project must
> have Voice Agents enabled and the signed-in identity must have project data-plane access.

Use these focused Voice Agent sample locations instead of browsing the full samples tree:

- [Browser Voice Agent sample](https://github.com/Azure/azure-sdk-for-js/tree/xitzhang/voice-agents-private-preview/sdk/ai/ai-projects/samples/v2-beta/browser)
- [JavaScript Voice Agent samples](https://github.com/Azure/azure-sdk-for-js/tree/xitzhang/voice-agents-private-preview/sdk/ai/ai-projects/samples/v2/javascript/agents/voiceAgents)
- [TypeScript Voice Agent samples](https://github.com/Azure/azure-sdk-for-js/tree/xitzhang/voice-agents-private-preview/sdk/ai/ai-projects/samples/v2/typescript/src/agents/voiceAgents)

Repository maintainers can find the authoring sources under
[`samples-dev/agents/voiceAgents`](https://github.com/Azure/azure-sdk-for-js/tree/xitzhang/voice-agents-private-preview/sdk/ai/ai-projects/samples-dev/agents/voiceAgents),
but private-preview users should run the published JavaScript/TypeScript samples above.

## Scenarios in this preview

| Scenario                                                                | Runtime                       | Sample                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Generate and manage a voice agent over REST                             | Node.js                       | [voiceAgentGeneration.ts](https://github.com/Azure/azure-sdk-for-js/blob/xitzhang/voice-agents-private-preview/sdk/ai/ai-projects/samples/v2/typescript/src/agents/voiceAgents/voiceAgentGeneration.ts)                     |
| Stream a PCM16 file and save audio/text output                          | Node.js                       | [voiceAgentRealtimeAudio.ts](https://github.com/Azure/azure-sdk-for-js/blob/xitzhang/voice-agents-private-preview/sdk/ai/ai-projects/samples/v2/typescript/src/agents/voiceAgents/voiceAgentRealtimeAudio.ts)               |
| Stream text, audio, and a local function tool                           | Node.js                       | [voiceAgentRealtimeTextAndTools.ts](https://github.com/Azure/azure-sdk-for-js/blob/xitzhang/voice-agents-private-preview/sdk/ai/ai-projects/samples/v2/typescript/src/agents/voiceAgents/voiceAgentRealtimeTextAndTools.ts) |
| Manage agents, run Realtime sessions, and retrieve persisted text/audio | Browser + local Node.js relay | [browser sample](https://github.com/Azure/azure-sdk-for-js/tree/xitzhang/voice-agents-private-preview/sdk/ai/ai-projects/samples/v2-beta/browser)                                                                           |

Equivalent ready-to-run JavaScript files are under
[JavaScript Voice Agent samples](https://github.com/Azure/azure-sdk-for-js/tree/xitzhang/voice-agents-private-preview/sdk/ai/ai-projects/samples/v2/javascript/agents/voiceAgents).

## Prerequisites

- Node.js 22 or later. Node.js 22 LTS is recommended for preview users.
- npm 10 or later.
- Azure CLI, signed in with `az login`.
- An Azure subscription and a Microsoft Foundry project with Voice Agents enabled.
- A role assignment that permits project data-plane access, such as **Azure AI User** (use the
  role required by the preview program if it differs).
- A project endpoint in this exact shape:

  ```text
  https://<resource-name>.services.ai.azure.com/api/projects/<project-name>
  ```

- Access to the private-preview package, either:
  - `@azure/ai-projects@2.4.1` in an approved private registry, or
  - the `azure-ai-projects-2.4.1.tgz` package tarball.

The samples use Microsoft Entra ID. API-key authentication is not supported by these Voice Agent
samples.

## Packages and dependencies

### Common runtime packages

All Node and browser scenarios use the following package:

```bash
npm install "@azure/ai-projects@2.4.1"
```

For a private feed, configure the feed supplied by the preview program before installing. Do not
commit credentials from `.npmrc`:

```ini
@azure:registry=https://<private-feed-host>/<private-feed-path>/
always-auth=true
```

For tarball distribution, use the exact path supplied by the preview program:

```bash
npm install "/path/to/azure-ai-projects-2.4.1.tgz"
```

PowerShell example:

```powershell
npm install "C:\Downloads\azure-ai-projects-2.4.1.tgz"
```

The `.tgz` is not a self-contained offline distribution. It contains the built
`@azure/ai-projects` SDK and this guide, but it does not bundle transitive npm dependencies or the
`samples/` tree. npm must be able to download the dependencies below from the configured registry,
and preview users must also receive the companion sample archive or access to the preview branch.

Do not substitute `latest` or `next`; those tags may resolve to a build that does not contain the
private-preview Voice Agent contract. The supplied sample manifests are pinned to `2.4.1`.

`@azure/ai-projects@2.4.1` declares the following runtime dependencies. npm installs these
transitively; applications should not install them individually unless they import them directly:

| Dependency                  | Declared range |
| --------------------------- | -------------- |
| `@azure-rest/core-client`   | `^2.1.0`       |
| `@azure/abort-controller`   | `^2.1.2`       |
| `@azure/core-auth`          | `^1.6.0`       |
| `@azure/core-lro`           | `^3.1.0`       |
| `@azure/core-paging`        | `^1.5.0`       |
| `@azure/core-rest-pipeline` | `^1.5.0`       |
| `@azure/core-sse`           | `^2.1.3`       |
| `@azure/core-util`          | `^1.9.0`       |
| `@azure/identity`           | `^4.13.0`      |
| `@azure/logger`             | `^1.1.4`       |
| `@azure/storage-blob`       | `^12.26.0`     |
| `@opentelemetry/api`        | `^1.9.1`       |
| `https-proxy-agent`         | `^7.0.1`       |
| `openai`                    | `^6.16.0`      |
| `tslib`                     | `^2.6.2`       |
| `ws`                        | `^8.18.3`      |

### Node/server-only packages

The REST and Node Realtime samples use `DefaultAzureCredential` and `.env` loading:

```bash
npm install @azure/identity@4.13.1 dotenv@16.6.1
```

The samples otherwise use built-in Node modules (`node:fs`, `node:events`, and
`node:stream/promises`). Do not import those modules in browser code.

### Browser-only development dependencies

The browser sample uses Vite for bundling and a local authentication/WebSocket relay:

```bash
npm install --save-dev vite@7.3.6 typescript@6.0.3 @types/node@22.20.1 @types/ws@8.18.1
npm install @azure/identity@4.13.1 @azure/core-auth@1.11.0 ws@8.21.2
```

`@azure/identity` and `ws` run in the local Vite server plugin, not in the browser bundle. The page
imports `AIProjectClient` from `@azure/ai-projects`; Vite selects the package's `browser` export.

### Optional and sample-specific dependencies

- `voiceAgentRealtimeAudio` requires a raw mono 24 kHz, signed 16-bit little-endian PCM input file.
  No input audio asset is bundled with the sample.
- TypeScript source execution requires a compiler or runner. The published TypeScript sample
  project includes TypeScript and compiles to `dist/`; the JavaScript samples need no compiler.
- Browser microphone capture requires a browser with Web Audio and `getUserMedia` support.

## Authentication and environment setup

Sign in and select the subscription that owns the Foundry project:

```bash
az login
az account list --output table
az account set --subscription "<subscription-id-or-name>"
```

Do not put access tokens, client secrets, API keys, or connection strings in sample source or
`VITE_*` variables.

### Node REST and Realtime configuration

Create `.env` in the Node sample directory:

```dotenv
FOUNDRY_PROJECT_ENDPOINT=https://<resource-name>.services.ai.azure.com/api/projects/<project-name>
FOUNDRY_VOICE_AGENT_NAME=<optional-agent-name>
FOUNDRY_VOICE_MODEL=<voice-model-or-deployment-name>
FOUNDRY_VOICE_AGENT_AUDIO_INPUT_FILE=./input.pcm
FOUNDRY_VOICE_AGENT_AUDIO_OUTPUT_FILE=./output.pcm
```

| Variable                                | REST lifecycle | Realtime text/tools | Realtime audio | Notes                                                                                              |
| --------------------------------------- | -------------- | ------------------- | -------------- | -------------------------------------------------------------------------------------------------- |
| `FOUNDRY_PROJECT_ENDPOINT`              | Required       | Required            | Required       | Project endpoint, not a resource root or model endpoint.                                           |
| `FOUNDRY_VOICE_AGENT_NAME`              | Optional       | Optional            | Optional       | Generated when omitted. Realtime samples reuse an existing agent or create/delete a temporary one. |
| `FOUNDRY_VOICE_MODEL`                   | Not used       | Optional            | Optional       | Defaults to `gpt-realtime`; set the preview-approved model/deployment name when required.          |
| `FOUNDRY_VOICE_AGENT_AUDIO_INPUT_FILE`  | Not used       | Not used            | Optional       | Defaults to `./input.pcm`; that file must exist.                                                   |
| `FOUNDRY_VOICE_AGENT_AUDIO_OUTPUT_FILE` | Not used       | Optional            | Optional       | Defaults to `voice-agent-output.pcm` (text/tools) or `./output.pcm` (audio).                       |

### Browser configuration

Copy `samples/v2-beta/browser/sample.env` to `.env` only when UI prefills are useful:

```dotenv
VITE_FOUNDRY_PROJECT_ENDPOINT=https://<resource-name>.services.ai.azure.com/api/projects/<project-name>
VITE_FOUNDRY_VOICE_AGENT_NAME=<optional-existing-enabled-agent-name>
```

Both variables are optional. The endpoint can be entered and the agent selected in the UI. These
values are embedded in the browser bundle and therefore must never contain secrets.

## Run the samples

Clone the dedicated private-preview branch:

```bash
git clone --branch xitzhang/voice-agents-private-preview --single-branch https://github.com/Azure/azure-sdk-for-js.git
cd azure-sdk-for-js/sdk/ai/ai-projects
```

The commands below assume that checkout. For a standalone sample bundle supplied by the preview
program, run the same commands from the corresponding sample directory.

Private-feed users must configure feed access before the first `npm install`. Tarball users should
replace the manifest's SDK dependency from the sample directory before installing the remaining
dependencies:

```bash
npm install "/path/to/azure-ai-projects-2.4.1.tgz" --save-exact
```

### REST: generate and manage a voice agent

This sample generates a voice agent, retrieves it, updates its instructions, lists voice agents,
and deletes the generated agent in `finally`.

TypeScript:

```bash
cd samples/v2/typescript
npm install
npm run build
node dist/agents/voiceAgents/voiceAgentGeneration.js
```

JavaScript:

```bash
cd samples/v2/javascript
npm install
node agents/voiceAgents/voiceAgentGeneration.js
```

Expected output includes `Generated`, `Retrieved`, `Updated`, a list headed by `Voice agents:`, and
`Deleted`. A failed process may leave a resource only if deletion itself fails.

### Realtime: text, audio output, and a local tool

This sample sends a weather question, receives streamed text/audio, handles `get_weather` locally,
writes raw PCM16 output, and deletes a temporary agent when it created one.

TypeScript:

```bash
cd samples/v2/typescript
npm install
npm run build
node dist/agents/voiceAgents/voiceAgentRealtimeTextAndTools.js
```

JavaScript:

```bash
cd samples/v2/javascript
npm install
node agents/voiceAgents/voiceAgentRealtimeTextAndTools.js
```

Expected output is a streamed answer followed by a summary containing the tool-call count, text
character count, and audio byte count. The output file is headerless PCM16, not WAV.

### Realtime: PCM16 audio input and output

Prepare mono 24 kHz PCM16 input. For example, with FFmpeg:

```bash
ffmpeg -i input.wav -ac 1 -ar 24000 -f s16le input.pcm
```

Then run:

```bash
cd samples/v2/typescript
npm install
npm run build
node dist/agents/voiceAgents/voiceAgentRealtimeAudio.js
```

or:

```bash
cd samples/v2/javascript
npm install
node agents/voiceAgents/voiceAgentRealtimeAudio.js
```

The sample sends audio in real-time-sized chunks, appends one second of silence for server VAD,
prints streamed text, and writes raw PCM16 output. Expected completion output reports nonzero text
characters and audio bytes. Input format is not auto-detected; WAV/MP3 data passed directly as
`input.pcm` produces invalid audio.

### Browser: management, Realtime, persisted text, and audio

The browser package cannot be loaded by opening `index.html` directly. It is an ES module package
and must be bundled. The provided Vite app also supplies local-only authentication and WebSocket
relay routes.

The supplied browser project uses this effective package configuration:

```json
{
  "type": "module",
  "scripts": {
    "build": "tsc --noEmit && vite build",
    "dev": "vite",
    "preview": "vite preview"
  },
  "dependencies": {
    "@azure/ai-projects": "2.4.1"
  },
  "devDependencies": {
    "@azure/core-auth": "1.11.0",
    "@azure/identity": "4.13.1",
    "@types/node": "22.20.1",
    "@types/ws": "8.18.1",
    "typescript": "6.0.3",
    "vite": "7.3.6",
    "ws": "8.21.2"
  }
}
```

Its Vite configuration installs `localAzureDevelopmentPlugin()`, binds the development server to
`127.0.0.1:5173`, binds preview to `127.0.0.1:4173`, and sets `strictPort: true`. Copy the
`server/`, `src/`, `index.html`, `vite.config.ts`, and `tsconfig.json` files together; the relay is
implemented by the server plugin and cannot be replaced by Vite configuration alone.

From a clean copy of the browser sample:

```bash
cd samples/v2-beta/browser
npm install
npm run build
npm run dev
```

Open `http://127.0.0.1:5173/`. Do not expose this development server on a LAN or public interface.

1. Enter the Foundry project endpoint or use the optional `.env` prefill.
2. Select **Load agents** and choose an enabled voice agent.
3. Select **Connect**. The status must change to **Connected**, **REST verified**, and
   **Socket connected**.
4. Send text or grant microphone permission and select **Start microphone**.
5. Confirm user and agent messages appear and audio plays when the agent produces PCM output.
6. Disconnect before using **Fetch conversation**. The persisted conversation ID appears in the
   header. Fetching loads stored text and, when available, whole-call WAV playback/download.

The browser app also exposes REST management operations under **Management**, including separate
**Generate agent** and **Create from definition** commands.

## Browser architecture and security

### Imports and bundling

Browser source uses the same public import as Node:

```ts
import { AIProjectClient } from "@azure/ai-projects";
```

Vite resolves the package's browser export. No Node polyfills are required by the browser source.
Do not import `node:fs`, `node:events`, `node:stream`, `ws`, or server credential implementations
into browser code.

The package currently emits Vite externalization warnings for the Node-only filesystem helpers
`project.datasets.uploadFile`, `project.datasets.uploadFolder`, and
`project.beta.models.createFromSource`. Do not call those methods in browser code. The tested Voice
Agent management, Realtime, conversation text, and conversation audio paths do not require the
externalized modules or any Node polyfill.

### Authentication

The provided sample is for local development only:

- The Vite server uses `AzureCliCredential`.
- `/api/azure-token` returns a short-lived Entra token to the same-origin page for REST calls and
  marks the response `Cache-Control: no-store`.
- The `/voice` WebSocket relay keeps the token server-side and adds `Authorization` and
  `Foundry-Features: VoiceAgents=V1Preview` to the upstream upgrade.
- Both routes reject non-loopback clients and cross-origin browser requests.

Never place a client secret, API key, long-lived token, or service credential in browser code or a
`VITE_*` variable. For production, host an authenticated application backend/relay and use managed
identity or an approved user-delegated Entra flow. The local Azure CLI bridge is not a production
authentication design.

### CORS and WebSocket requirements

- REST requests originate in the browser and the Foundry endpoint must allow the web application's
  origin and required headers. The local sample origin is `http://127.0.0.1:5173`.
- Browser WebSocket APIs cannot set an `Authorization` header. Direct authenticated Realtime
  connection is therefore disabled by default; use the supplied relay or a production equivalent.
- The upstream URL must use `wss://`, target
  `*.services.ai.azure.com`, and match the project/agent voice endpoint path. The local relay rejects
  other hosts and paths.
- Corporate proxies must permit secure WebSocket upgrades to the Foundry service.

### Browser audio

- Microphone input uses `navigator.mediaDevices.getUserMedia` and mono 24 kHz PCM16 conversion.
- Browsers grant microphone access only in a secure context; loopback HTTP is treated as secure by
  modern browsers. Deployed applications must use HTTPS.
- The user must explicitly grant microphone permission.
- Streamed PCM output is queued through Web Audio. Persisted whole-call audio is exposed as WAV via
  a browser Blob URL.
- **Clear chat** clears only rendered text; it does not delete persisted data or fetched audio.

### Browser and Node differences

| Area            | Node/server                                              | Browser sample                                                                                  |
| --------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Credential      | `DefaultAzureCredential`                                 | Local Vite relay uses `AzureCliCredential`; page uses a same-origin short-lived token endpoint. |
| WebSocket auth  | SDK can add an `Authorization` header                    | Native browser WebSocket cannot add headers; relay required.                                    |
| File access     | `node:fs` reads/writes PCM files                         | Microphone/Web Audio and Blob downloads; no filesystem APIs.                                    |
| Binary download | `readableStreamBody`                                     | `blobBody`                                                                                      |
| Build           | JavaScript runs directly; TypeScript compiles with `tsc` | Bundler/dev server required.                                                                    |
| Secrets         | May use server-side credential environment               | Never expose secrets or long-lived tokens to the page.                                          |

## Known limitations and blockers

- **Package distribution blocker:** `@azure/ai-projects@2.4.1` is not currently available from the
  public npm registry. Private-preview users need an approved private feed or `.tgz` artifact. Do
  not distribute the guide without supplying exact feed authentication or tarball access steps.
- **Sample distribution blocker:** npm packaging includes this guide but not the `samples/` tree.
  Provide a stable preview branch or companion sample archive containing the four documented
  scenarios. The public `main` sample link is insufficient until these samples merge there.
- Voice Agents and their model choices are service/region gated.
- The Vite authentication/WebSocket bridge is loopback-only and development-only.
- Browser REST calls still depend on service CORS configuration. A CORS failure must be fixed in
  the service/project configuration or by using an application backend; do not disable browser
  security.
- Persisted conversations require `store: true`. Recording finalization can lag disconnection;
  fetching audio may temporarily return `409 recording_not_ready`.
- BYOS recording metadata can be retrieved, but Foundry does not proxy BYOS bytes. Download them
  from customer storage using customer credentials.
- Raw PCM output files have no container header and may require conversion for playback.

## Validation results (2026-08-19)

Validation used `@azure/ai-projects@2.4.1`, Windows 10, Node.js 22.18.0, npm 10.9.3, Vite 7.3.6,
Azure CLI authentication, and a Voice Agents-enabled Foundry project. Browser validation used the
VS Code integrated browser based on Chromium 148 / Electron 42.

| Check                            | Result                               | Evidence                                                                                                                                                                                 |
| -------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Official SDK build               | Passed                               | `npm run build` produced browser, React Native, ESM, and CommonJS targets and regenerated API reports.                                                                                   |
| Node test suite                  | Passed                               | `npm run test:node` completed with 40 files / 231 tests passed and 64 tests intentionally skipped.                                                                                       |
| Package lint                     | Blocked by existing unrelated errors | `npm run lint` reports the package Node-engine policy mismatch and an unused tracing assignment, plus generated-code warnings; neither was introduced by the preview guide/sample fixes. |
| Package artifact                 | Passed                               | `npm pack` produced `azure-ai-projects-2.4.1.tgz`; dry run contains 1,897 files including this guide.                                                                                    |
| Public package availability      | Blocked as expected                  | `npm view @azure/ai-projects@2.4.1` returned `E404`; use private feed/tarball distribution.                                                                                              |
| Clean network install            | Not completed on this machine        | npmjs.org TLS handshakes failed on Node 22 and 24; the offline cache was incomplete. Repeat clean install in release CI before handoff.                                                  |
| TypeScript sample build          | Passed after fix                     | Adding `"type": "module"` to the sample manifest fixed NodeNext `import.meta` compilation; `npm run build` now passes.                                                                   |
| Browser production build         | Passed                               | `tsc --noEmit && vite build` completed; only the documented unrelated Node filesystem externalization and chunk-size warnings remain.                                                    |
| REST lifecycle sample            | Passed live                          | Generated, retrieved, updated, listed, and deleted a uniquely named temporary voice agent.                                                                                               |
| Realtime text/tools sample       | Passed live                          | One local function call, 60 streamed text characters, and 172,800 output PCM bytes.                                                                                                      |
| Realtime audio sample            | Passed live                          | Sent synthesized mono 24 kHz PCM16 speech; received 118 text characters and 300,000 output PCM bytes.                                                                                    |
| Browser agent loading/CORS       | Passed live                          | Same-origin Azure CLI token route returned `200`; two paged Foundry agent requests returned `200` and loaded 189 enabled agents.                                                         |
| Browser Realtime                 | Passed live                          | Relay connected with `store=true`; UI reached Connected/REST verified/Socket connected and completed a real text turn with text and audio events.                                        |
| Browser persistence/audio        | Passed live                          | Persisted ID populated; conversation, items, audio metadata, and WAV content routes all returned `200`; playback/download controls rendered.                                             |
| Browser management               | Passed live                          | Generated and deleted a uniquely named temporary agent through the Management UI.                                                                                                        |
| Browser microphone prerequisites | Passed capability check              | Loopback was a secure context; `getUserMedia`, Web Audio, and microphone permission were available. Ambient microphone recording was intentionally not performed.                        |

The SDK/sample scenarios were tested live, but the package cannot be declared release-ready until a
separate clean machine or CI job successfully installs the private feed/tarball plus dependencies
without using this repository's existing `node_modules`.

## Validation checklist

Before distributing the preview:

1. Publish `@azure/ai-projects@2.4.1` to the approved private feed or provide the exact tarball and
   feed/access instructions.
2. In a clean directory, install the package plus only the dependencies listed above.
3. Run all three Node samples against a preview-enabled project.
4. Build the browser sample from a clean install.
5. Launch the browser sample, load agents, connect Realtime, send text, test microphone/audio,
   disconnect, fetch persisted text/audio, and exercise Management operations.
6. Record the tested package version, service region, Node/browser versions, and any service-gated
   failures in the release handoff.

## Private-preview quick reference

```bash
# Common package (choose private registry version or supplied tarball)
npm install "@azure/ai-projects@2.4.1"

# Node sample dependencies
npm install @azure/identity@4.13.1 dotenv@16.6.1

# Browser sample
cd samples/v2-beta/browser
npm install
npm run build
npm run dev
```

Required for every scenario: `FOUNDRY_PROJECT_ENDPOINT` (or browser UI entry), Azure CLI login for
the supplied samples, project data-plane role assignment, and a Voice Agents-enabled project.
Realtime additionally requires an enabled voice agent/model. Browser usage requires bundling, the
local relay (or production equivalent), valid service CORS, WebSocket egress, and microphone
permission for audio input.
