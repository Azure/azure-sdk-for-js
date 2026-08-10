# Release History

## 1.0.0-beta.1 (Unreleased)

### Features Added

- Added the generated `VoiceAgentsClient` management, version, persisted-conversation, and audio
  operations from the Foundry Voice Agents TypeSpec definition.
- Added `VoiceAgentStreamingClient` and `VoiceAgentConnection` for authenticated WebSocket sessions.
- Added the Foundry-style `client.streaming` operation group to the root `VoiceAgentsClient` while
  preserving the generated management client and operation groups.
- Added async iteration over generated server events and convenience methods for session updates,
  text, audio, response creation/cancellation, and function outputs.
- Added Node.js and browser WebSocket transports with proxy, abort signal, error, and cleanup support.
- Added JavaScript and TypeScript management, text/tool, and audio-file samples.
- Added a browser console sample that combines REST agent verification with WebSocket text,
  microphone, audio, and function-tool streaming through a loopback-only Azure CLI development
  bridge adapted from the VoiceLive web sample.
- Added a browser management console covering agent list/get/create/generate/update,
  enable/disable/delete, and version list/get/create/delete operations with confirmed destructive
  actions.

### Breaking Changes

### Bugs Fixed

- Preserved platform WebSocket import resolution inside the emitted CommonJS, ESM, and browser
  package boundaries.
- Bounded Node.js and browser WebSocket shutdown so a missing close event cannot hang connection
  disposal indefinitely.
- Validated required function-tool arguments consistently in the JavaScript and TypeScript text
  samples instead of silently substituting malformed values.
- Accepted the live service's HTTP 200 voice-agent-version deletion response in addition to the
  TypeSpec-declared 204 response.
- Resolved the conditional browser WebSocket transport import during clean Vite dependency
  optimization in the browser sample.
- Coalesced repeated high-frequency browser events so audio streaming does not evict tool and
  lifecycle events from the event console.
- Normalized generated audio delta deserialization to plain `Uint8Array` in Node.js and browsers.
- Applied concrete generated serializers to nested turn-detection and interim-response unions.
- Accepted the live service's HTTP 200 responses for voice-agent create and delete operations in
  addition to the TypeSpec-declared 201 and 204 statuses.
- Fixed the function-call sample to request its follow-up response after the tool-call response
  completes.
- Aligned sample audio handling with VoiceLive: request 24 kHz mono PCM16, pace file input by its
  byte duration, honor output-file backpressure, queue browser playback sequentially, and clear
  stale audio on interruption without overriding the agent's configured output voice.

### Other Changes

- Added unit and integration tests for connection lifecycle, protocol serialization, event handling,
  cancellation, and errors.
- Added pipeline-level management CRUD/list coverage, gated live REST/WebSocket workflows,
  executable browser transport tests, and snippet type-checking.
- Standardized sample configuration on the `AZURE_VOICE_AGENTS_*` environment variable prefix.
