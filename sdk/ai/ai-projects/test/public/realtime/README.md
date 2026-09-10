# Voice Agent Realtime Tests

This directory contains tests for the `project.beta.realtime` (`VoiceAgentRealtimeClient`) WebSocket
client. Recorded/mocked tests for voice agent CRUD, generation, and telephony are covered
separately by `test/public/agentVoiceAndTelephony.spec.ts` and `test/public/voiceIntegration.spec.ts`.

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
TEST_MODE=live npm run test:node -- --grep "live"
```
