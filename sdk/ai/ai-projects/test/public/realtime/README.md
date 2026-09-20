# Voice Agent Realtime Tests

This directory contains tests for the `project.beta.voiceAgents.realtime` (`VoiceAgentRealtimeClient`) WebSocket
client. Offline/mocked tests for voice agent CRUD, generation, and telephony are covered separately
by `test/public/agentVoiceAndTelephony.spec.ts` and `test/public/voiceIntegration.spec.ts`; live agent
CRUD tests are covered by `test/public/agents/voiceAgentLive.spec.ts`.

## Test Files

Tests are classified by runtime scenario: `browser/` and `node/`.

### Unit Tests (realtime.spec.ts, browser/realtime.spec.ts, node/webSocketTransport.spec.ts)

These are offline, mocked tests: they inject a fake `VoiceAgentWebSocketTransport`/`WebSocket` and
never make a network request.

- **realtime.spec.ts**: protocol-level tests (event serialization/deserialization, connection
  lifecycle, error handling) shared behavior of `VoiceAgentRealtimeClient`.
- **browser/realtime.spec.ts**: the browser-specific transport (Entra bearer token carried via the
  WebSocket subprotocol, since browsers cannot set a custom `Authorization` header on the upgrade
  request).
- **node/webSocketTransport.spec.ts**: the Node `ws`-backed transport implementation.

### Live Tests (node/voiceAgentWebSocketLive.spec.ts, browser/voiceAgentWebSocketLive.spec.ts)

These tests run only in live mode and exercise real-time WebSocket streaming end-to-end, against
the ai-projects package's live pipeline (see `../../../tests.yml`/`../../../test-resources.bicep`).
That pipeline provisions only the Foundry project endpoint and a realtime-capable voice model, and
sets `TEST_SCOPE=voiceAgents` so `../../../vitest.config.ts`/`../../../vitest.browser.config.ts`
restrict the live run to just the Voice Agent specs — the package's other live-capable tests (AI
Search, Bing, storage, etc.) need env vars this pipeline doesn't provision, so they don't run here.

**node/voiceAgentWebSocketLive.spec.ts** (uses `node:fs` to stream the audio fixture below):

- Text streaming and tool calls (single and multiple, sequential)
- Basic text streaming without tools
- Graceful connection close and session reconfiguration
- Bidirectional audio streaming (`sendAudio`/`response.output_audio.delta`), using the `data/`
  fixtures below
- Turn detection configuration (`configureSession` with `server_vad` settings, verified via the
  echoed `session.updated` event)
- Cancelling an in-progress response (`cancelResponse`)
- Clearing the output audio buffer outside avatar mode (`clearOutputAudio`) — Voice Agents only
  supports this for barge-in when the session is configured for avatar mode, so this test asserts
  the expected `avatar_not_configured` rejection

**browser/voiceAgentWebSocketLive.spec.ts**: a smaller, browser-only counterpart. The protocol
behavior above is transport-agnostic, so this file only covers what is actually browser-specific —
acquiring a real Microsoft Entra token via the relay credential (`createTestCredential()`
auto-detects the browser environment via `@azure-tools/test-credential`'s
`createBrowserRelayCredential`, which talks to the `dev-tool run start-browser-relay` server) and
completing the WebSocket upgrade via the subprotocol-based bearer token implemented by
`BrowserWebSocketTransport` (see `src/webSocketTransport-browser.mts`):

- Connecting and receiving a `session.created`/`session.updated` confirmation
- Streaming text output for a basic conversation

See also `test/public/agents/voiceAgentLive.spec.ts` for live agent CRUD tests (create/get/update/
delete for the `"voice"` agent kind, and `createFromPrompt` generation).

- **Test Mode**: Live/Integration tests only (`describe.runIf(isLiveMode())`)
- **Uses**: Real WebSocket connections to the voice agent realtime endpoint
- **Environment**: Requires `FOUNDRY_PROJECT_ENDPOINT` and `FOUNDRY_VOICE_AGENT_MODEL` environment
  variables; the browser variant additionally requires the browser relay server (started
  automatically by `dev-tool run test:vitest --browser` unless `--no-relay-server` is passed)

Getting `browser/voiceAgentWebSocketLive.spec.ts` to pass against a real headless Chromium required
two non-obvious Playwright overrides in `../../../vitest.browser.config.ts` (see the comments
there for the full explanation):

- `--disable-http2`: the realtime endpoint doesn't support Chrome's HTTP/2 "Extended CONNECT"
  WebSocket upgrade, which Chrome attempts when reusing an already-open HTTP/2 connection to the
  same origin (e.g. from the REST call that creates the test agent). Without this flag, a
  WebSocket `connect()` that follows an earlier HTTPS request to the same host fails with an
  opaque "WebSocket connection failed" error.
- A spoofed `userAgent` with the "Headless" product token removed: headless Chromium's default
  User-Agent (`HeadlessChrome/...`) is rejected by the endpoint, most likely by bot-detection at
  the ingress.

Both were found by bisecting against a local, correctly-negotiating WebSocket server and a public
echo server to rule out the SDK's subprotocol-based auth scheme itself, which works correctly.

## Test Fixtures

The `data/` directory contains audio fixtures used by the live test:

- `input.pcm`: Sample PCM16 24kHz mono audio input with real, audible speech, streamed to the voice
  agent by the audio-streaming live test
- `output.pcm`: Sample PCM audio output from a voice agent, kept for reference

## Running Tests

```bash
# Unit tests (Node + browser), no live resources needed
npm run test:node
npm run test:browser

# Live tests, require FOUNDRY_PROJECT_ENDPOINT / FOUNDRY_VOICE_AGENT_MODEL and az login
TEST_MODE=live npm run test:node -- -- -t "live"
TEST_MODE=live npm run test:browser -- -- -t "live"
```
