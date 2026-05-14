# Release History

## 1.0.0-beta.5 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.4 (2026-05-06)

### Features Added

- Added distributed tracing support via `@azure/core-tracing`. Spans are emitted for the session lifecycle (`connect`, `send`, `recv`, `close`) following [GenAI Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/). Tracing is no-op by default and activates only when an OpenTelemetry tracer provider is registered — CommonJS apps can use the standard `@azure/opentelemetry-instrumentation-azure-sdk` bridge, while ESM and browser apps register an Instrumenter directly via `useInstrumenter`. See the [Telemetry / Distributed Tracing](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voicelive/ai-voicelive/README.md#telemetry--distributed-tracing) section in the README, plus the new [`samples/telemetry/`](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voicelive/ai-voicelive/samples/telemetry/README.md) (Node.js ESM, console + Azure Monitor) and [`samples/telemetry-browser/`](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/voicelive/ai-voicelive/samples/telemetry-browser/README.md) (browser, Vite) samples.

### Bugs Fixed

- Fixed `voiceSerializer` to properly convert Azure voice properties (e.g., `endpointId`, `customLexiconUrl`) to snake_case wire format (`endpoint_id`, `custom_lexicon_url`). Previously, Azure voice objects passed through `requestSessionSerializer` were sent with camelCase keys, which the service rejected.

## 1.0.0-beta.3 (2026-02-17)

### Features Added

- Added reasoning effort configuration with `ReasoningEffort` and `KnownReasoningEffort`
- Added interim response configuration for generating responses while waiting
  - `InterimResponseConfig`, `StaticInterimResponseConfig`, `LlmInterimResponseConfig` types
  - `InterimResponseConfigBase`, `InterimResponseConfigBaseUnion` base types
  - `InterimResponseConfigType`, `KnownInterimResponseConfigType` for configuration type selection
  - `InterimResponseTrigger`, `KnownInterimResponseTrigger` for trigger configuration
- Added metadata support for responses
  - `metadata` property added to `ResponseCreateParams` and `Response` for storing key-value pairs
- Added voice customization enhancements
  - `customTextNormalizationUrl` property for voice configuration
- Added event handler subscriptions for MCP events in `VoiceLiveSessionHandlers`
  - MCP event handlers: `onMcpListToolsInProgress`, `onMcpListToolsCompleted`, `onMcpListToolsFailed`, `onResponseMcpCallArgumentsDelta`, `onResponseMcpCallArgumentsDone`, `onResponseMcpCallInProgress`, `onResponseMcpCallCompleted`, `onResponseMcpCallFailed`
- Added agent session mode for targeting AI Foundry agents directly
  - `AgentSessionConfig` and `SessionTarget` types for session configuration
  - `isAgentSessionTarget` and `isModelSessionTarget` helper functions

### Breaking Changes

- `KnownOutputAudioFormat` enum values changed from hyphens to underscores (this fixes a bug where the SDK's format was wrong):
  - `pcm16-8000hz` → `pcm16_8000hz`
  - `pcm16-16000hz` → `pcm16_16000hz`

### Other Changes

- Refactored client modules into `client/` subdirectory for better organization

## 1.0.0-beta.2 (2026-01-05)

### Features Added
- Added Model Context Protocol (MCP) support for integrating external tools and services
  - `MCPServer` tool type for connecting to MCP servers
  - MCP approval workflow with `MCPApprovalType` and approval request/response items
  - MCP tool listing events (`ServerEventMcpListToolsInProgress`, `ServerEventMcpListToolsCompleted`, `ServerEventMcpListToolsFailed`)
  - MCP call execution with streaming support (`ResponseMCPCallItem`, `ServerEventResponseMcpCallArgumentsDelta`, `ServerEventResponseMcpCallArgumentsDone`, `ServerEventResponseMcpCallInProgress`, `ServerEventResponseMcpCallCompleted`, `ServerEventResponseMcpCallFailed`)
  - MCP approval request and response items (`ResponseMCPApprovalRequestItem`, `ResponseMCPApprovalResponseItem`)
- Added avatar configuration enhancements
  - `AvatarConfigTypes` enum with support for `video-avatar` and `photo-avatar`
  - `PhotoAvatarBaseModes` enum with `vasa-1` model support
  - `AvatarOutputProtocol` enum for choosing between `webrtc` and `websocket` output
  - Enhanced `AvatarConfig` with `type`, `model`, and `outputProtocol` properties
- Added image content support
  - `RequestImageContentPart` for including images in conversation input
  - `RequestImageContentPartDetail` for controlling image detail levels
- Added new voice options
  - `Marin` and `Cedar` voice types
  - Enhanced voice configuration with `style`, `pitch`, `rate`, `volume` properties
  - Added `customLexiconUrl`, `preferLocales`, and `locale` options for voice customization
- Added automatic proxy support with environment variable detection (HTTPS_PROXY, HTTP_PROXY)

### Other Changes
- Added comprehensive test infrastructure including integration and unit tests for MCP functionality
- Refactored WebSocket implementations for better maintainability
- Added developer tooling including VS Code debug configurations and additional npm scripts
- Updated workspace dependencies to use caret (^) version specifiers
- Added `https-proxy-agent` dependency for proxy support

## 1.0.0-beta.1 (2025-11-14)

### Features Added

- Initial version of Voice Live Typescript SDK.
