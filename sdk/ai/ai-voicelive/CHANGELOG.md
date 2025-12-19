# Release History

## 1.0.0-beta.2 (Unreleased)

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
