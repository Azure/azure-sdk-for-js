# Voice Agents SDK design

## Generated surface

`src/generated` is emitted from the pinned TypeSpec source in `tsp-location.yaml`. It owns:

- `VoiceAgentsClient` and all REST operation groups.
- Voice-agent management, version, persisted-conversation, and WebSocket protocol models.
- REST serializers/deserializers, paging helpers, URL expansion, and generated logging.

Generated files must not be manually edited. Regeneration uses `npm run generate:client`.
The post-emitter customization changes the generated package-version self-import to the shared
`SDK_VERSION` constant; nested target package boundaries prevent Node.js from resolving the emitted
bare self-import. It also accepts HTTP 200 for `createVoiceAgent` in addition to the TypeSpec-declared
201 because the current live service returns 200 with a valid `VoiceAgentObject`. Likewise,
`deleteVoiceAgent` accepts 200 or 204 because the service currently returns 200 with an
`agent.deleted` body instead of an empty 204 response. `deleteVoiceAgentVersion` applies the same
compatibility rule for the service's 200 `agent.version.deleted` response.

The post-build customization copies the platform WebSocket import into each emitted package
boundary. Node.js outputs resolve `webSocketTransport.js`; the browser output resolves
`webSocketTransport-browser.mjs`.

## Handwritten surface

`src/streaming` owns behavior TypeSpec does not currently emit:

- Node.js and browser WebSocket transports.
- Microsoft Entra authentication for the upgrade request.
- Connection state, cancellation, close handling, and cleanup.
- Async iteration over generated server-event types.
- Dispatch to concrete generated serializers/deserializers.
- Text, audio, session, response, cancellation, and function-output convenience methods.

`src/voiceAgentsClient.ts` subclasses the generated client without modifying it. The facade
preserves all generated management operation groups and adds `client.streaming`, sharing the root
endpoint, credential, API version, credential scopes, and user-agent prefix. `src/index.ts` makes
that facade the root `VoiceAgentsClient` export and continues to re-export all generated models and
operation types.

## API decisions

- Async iteration follows existing Microsoft Foundry JavaScript streaming APIs.
- The root hierarchy follows Foundry operation-group conventions: management uses
  `client.voiceAgents` and live connections use `client.streaming`.
- Event payloads are generated types; the handwritten API does not define a parallel wire model.
- Audio output is normalized to `Uint8Array` across runtimes.
- Browser upgrade headers use the same header-query convention as the Voice Live JavaScript SDK.
- Unexpected disconnects are fail-fast. Automatic reconnection is omitted because v1 has no session
  resume contract.
- Transport shutdown waits at most five seconds for the WebSocket close handshake; Node.js then
  terminates a hung socket, while browsers release the local transport wait.
- A `VoiceAgentConnection` permits one active iterator to preserve event ordering and backpressure.

## Test and sample matrix

| Surface             | Node.js                                                                        | Browser                                                                           |
| ------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Management REST     | Generated-pipeline CRUD/list test; opt-in live lifecycle                       | Agent/version management console with confirmed destructive actions               |
| Streaming WebSocket | Mock transport/protocol tests; opt-in live text/tool turn                      | Executable Chromium transport tests                                               |
| User samples        | Parallel TypeScript and JavaScript management, text/tool, and PCM-file samples | Vite app with REST verification, text/microphone input, PCM playback, and cleanup |

The `test:node` script invokes every listed test file; live-service cases skip themselves at runtime
unless `TEST_MODE=live`. Live tests require `AZURE_VOICE_AGENTS_ENDPOINT` and
`AZURE_VOICE_AGENTS_AGENT_NAME`; the lifecycle case always removes its temporary agent. Browser
tests instantiate the shipped native-WebSocket transport and verify header-query authentication,
Blob event delivery, protocol errors, and bounded close behavior. `test/snippets.spec.ts`
type-checks the public management and streaming examples without executing them.

## Known limitations

- The SDK does not capture microphone audio or play PCM output; applications choose their audio I/O
  library. The audio-file samples and browser sample demonstrate the SDK boundary.
- Raw avatar WebSocket binary frames are not modeled by the current TypeSpec JSON event union.
  Base64 `response.video.delta` events are supported.
- Live service tests require project RBAC and are skipped unless `TEST_MODE=live`.
- The source TypeSpec currently emits union-enum linter warnings for model unions; generation
  succeeds without TypeSpec errors.
