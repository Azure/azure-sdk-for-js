# Voice Agent Realtime Tests

This directory contains tests for the `project.voiceAgents.realtime` (`VoiceAgentRealtimeClient`) WebSocket
client and its persisted conversation REST APIs. Offline HTTP tests for voice agent CRUD,
generation, and telephony are covered separately by `test/public/agentVoiceAndTelephony.spec.ts`
and `test/public/voiceIntegration.spec.ts`; those two files do not create recordings.

## Test Files

### Unit Tests (realtime.spec.ts, browser/realtime.spec.ts, node/webSocketTransport.spec.ts)

These are offline, mocked tests: they inject a fake `VoiceAgentWebSocketTransport`/`WebSocket` and
never make a network request.

- **realtime.spec.ts**: protocol-level tests (event serialization/deserialization, connection
  lifecycle, error handling) shared behavior of `VoiceAgentRealtimeClient`.
- **browser/realtime.spec.ts**: the browser-specific transport (Entra bearer token carried via the
  WebSocket subprotocol, since browsers cannot set a custom `Authorization` header on the upgrade
  request).
- **node/webSocketTransport.spec.ts**: the Node `ws`-backed transport implementation.

### Live Tests (voiceAgentRealtimeLive.spec.ts)

These tests run only in live mode and exercise real-time WebSocket streaming end-to-end.

- **Test Mode**: Live/Integration tests only (`describe.runIf(isLiveMode())`)
- **Uses**: Real WebSocket connections to the voice agent realtime endpoint
- **Environment**: Requires `FOUNDRY_PROJECT_ENDPOINT` and `FOUNDRY_VOICE_MODEL` environment variables

### Recorded REST Tests

- **voiceConversations.spec.ts**: exercises all 14 GA conversation REST methods.
  Covers finalized conversations, items and responses, pagination/continuation, input/output
  audio metadata, WAV downloads, and cascade deletion. The two generated-audio methods are
  covered by the expected 404 when playback was not interrupted; their artifact-present
  success path still requires an interrupted-playback fixture.
- **../voiceTelephony.spec.ts**: exercises all 16 GA telephony REST methods without placing
  calls or requiring provider credentials. Success cases cover empty binding/call/job
  lists and transfer-target get/replace/clear, including ETag conflict handling. Binding
  and call-job creation use a nonexistent connection; the remaining provider-dependent
  methods cover invalid identifiers or missing calls, not successful provider operations.
- **../live/liveConversations.spec.ts**: records the nine preview GPT Live conversation
  REST methods. WebSocket streaming itself is not recorded.

Node conversation recording creates an isolated, self-deployed Realtime voice agent
(`FOUNDRY_VOICE_MODEL`, default `gpt-realtime`), persists three audio sessions, then deletes
the agent. The model must be deployed in the test project. Browser recording needs
equivalent Node-created fixtures supplied through the `FOUNDRY_VOICE_RECORDING_*`
variables in `sample.env`; `createVoiceConversationFixtures` in
`../utils/voiceConversationFixtures.ts` prepares them. Delete the fixture agent after
browser recording. Playback needs neither fixtures nor Azure credentials.

```powershell
# Record only the new GA REST tests, then verify the local recordings.
$env:TEST_MODE = "record"
npx dev-tool run test:vitest -- test\public\realtime\voiceConversations.spec.ts test\public\voiceTelephony.spec.ts
$env:TEST_MODE = "playback"
npx dev-tool run test:vitest -- test\public\realtime\voiceConversations.spec.ts test\public\voiceTelephony.spec.ts
npx dev-tool run build-test
npx dev-tool run test:vitest --browser -- voiceConversations.spec.js voiceTelephony.spec.js
```

Node and browser have separate recording directories; browser playback requires recordings
captured with `--browser` in record mode. Recordings remain in the local `.assets` clone
until explicitly published with asset-sync and referenced by an updated `assets.json`.
Before committing these specs for CI, publish their recordings and update `assets.json`.

## Test Fixtures

The `data/` directory contains audio fixtures used by the live test:

- `input.pcm`: Sample PCM audio input for voice agent testing
- `output.pcm`: Sample PCM audio output from voice agent

## Running Tests

```bash
# Unit tests (Node + browser), no live resources needed
npm run test:node
npm run test:browser

# Live test, requires FOUNDRY_PROJECT_ENDPOINT / FOUNDRY_VOICE_MODEL and az login
TEST_MODE=live npm run test:node -- -- -t "live"
```
