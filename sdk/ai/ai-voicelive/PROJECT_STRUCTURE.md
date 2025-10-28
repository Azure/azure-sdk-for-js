# Project Structure Setup - Voice Live SDK

## Overview
This document establishes the proper project structure for the Voice Live SDK, designed to support Azure SDK customization workflow, code generation, and multi-platform development.

## Current Structure Analysis

The project currently follows Azure SDK TypeScript patterns with:
- **TypeSpec-based code generation** - Models generated from TypeSpec to `src/models/`
- **Multi-platform support** - Browser, Node.js, and React Native builds via `tshy`
- **Azure SDK tooling** - Standard Azure SDK build and testing infrastructure
- **API extraction** - Automatic API documentation generation

## Proposed Project Structure

```
/git/sdk-repos/azure-sdk-for-js/sdk/ai/ai-voicelive/
├── README.md                           # Main project documentation
├── LICENSE                             # MIT License
├── package.json                        # Package configuration
├── tsconfig.json                       # Root TypeScript config
├── tsconfig.src.json                   # Source TypeScript config
├── tsconfig.test.json                  # Test TypeScript config
├── tsconfig.snippets.json              # Snippets TypeScript config
├── eslint.config.mjs                   # ESLint configuration
├── vitest.config.ts                    # Vitest configuration (Node.js)
├── vitest.browser.config.ts            # Vitest configuration (Browser)
├── vitest.esm.config.ts               # Vitest configuration (ESM)
├── api-extractor.json                 # API Extractor configuration
├── metadata.json                       # SDK metadata
│
├── .tshy/                              # tshy build configuration
│   ├── browser.json                   # Browser-specific config
│   ├── commonjs.json                  # CommonJS config
│   ├── esm.json                       # ESM config
│   └── react-native.json              # React Native config
│
├── src/                                # Source code (hand-written + customized)
│   ├── index.ts                       # Main exports
│   ├── logger.ts                      # Logging utilities
│   │
│   ├── models/                        # Generated models (DO NOT MODIFY)
│   │   ├── index.ts                   # Generated exports
│   │   └── models.ts                  # Generated type definitions
│   │
│   ├── client/                        # Client implementation
│   │   ├── voiceLiveClient.ts         # Main VoiceLiveClient class
│   │   ├── connectionManager.ts       # Connection lifecycle management
│   │   ├── sessionManager.ts          # Session state management
│   │   └── index.ts                   # Client exports
│   │
│   ├── websocket/                     # WebSocket abstraction layer
│   │   ├── websocketLike.ts           # WebSocket interface definitions
│   │   ├── websocketNode.ts           # Node.js WebSocket implementation
│   │   ├── websocketBrowser.ts        # Browser WebSocket implementation
│   │   ├── websocketFactory.ts        # WebSocket factory and platform detection
│   │   └── index.ts                   # WebSocket exports
│   │
│   ├── auth/                          # Authentication handling
│   │   ├── authenticationHandler.ts   # Authentication interface and base classes
│   │   ├── tokenCredentialHandler.ts  # TokenCredential implementation
│   │   ├── keyCredentialHandler.ts    # KeyCredential implementation
│   │   ├── connectionBuilder.ts       # Connection URL and header building
│   │   └── index.ts                   # Authentication exports
│   │
│   ├── errors/                        # Error classes and handling
│   │   ├── voiceLiveError.ts          # Base error class
│   │   ├── connectionErrors.ts        # Connection-related errors
│   │   ├── authenticationErrors.ts    # Authentication errors
│   │   ├── protocolErrors.ts          # Protocol errors
│   │   ├── serviceErrors.ts           # Service errors
│   │   ├── clientErrors.ts            # Client usage errors
│   │   ├── errorRecovery.ts           # Error recovery framework
│   │   └── index.ts                   # Error exports
│   │
│   ├── events/                        # Event system
│   │   ├── eventEmitter.ts            # Event emitter utilities
│   │   ├── eventTypes.ts              # Event type definitions
│   │   └── index.ts                   # Event exports
│   │
│   ├── protocol/                      # Protocol handling
│   │   ├── messageParser.ts           # WebSocket message parsing
│   │   ├── messageSerializer.ts       # Message serialization utilities
│   │   ├── protocolHandler.ts         # Protocol state machine
│   │   └── index.ts                   # Protocol exports
│   │
│   ├── audio/                         # Audio processing utilities
│   │   ├── audioProcessor.ts          # Audio format conversion
│   │   ├── audioBuffer.ts             # Audio buffer management
│   │   ├── audioUtils.ts              # Audio utility functions
│   │   └── index.ts                   # Audio exports
│   │
│   ├── utils/                         # General utilities
│   │   ├── platform.ts                # Platform detection utilities
│   │   ├── validation.ts              # Input validation helpers
│   │   ├── async.ts                   # Async utility functions
│   │   ├── types.ts                   # Utility type definitions
│   │   └── index.ts                   # Utility exports
│   │
│   └── internal/                      # Internal implementation details
│       ├── constants.ts               # Internal constants
│       ├── helpers.ts                 # Internal helper functions
│       └── index.ts                   # Internal exports (not in main index)
│
├── test/                              # Test code
│   ├── public/                        # Public test files (snippets, samples)
│   │   ├── utils/                     # Test utilities
│   │   └── ...sample files...
│   │
│   ├── unit/                          # Unit tests
│   │   ├── client/                    # Client tests
│   │   │   ├── voiceLiveClient.spec.ts
│   │   │   ├── connectionManager.spec.ts
│   │   │   └── sessionManager.spec.ts
│   │   │
│   │   ├── websocket/                 # WebSocket tests
│   │   │   ├── websocketNode.spec.ts
│   │   │   ├── websocketBrowser.spec.ts
│   │   │   └── websocketFactory.spec.ts
│   │   │
│   │   ├── auth/                      # Authentication tests
│   │   │   ├── tokenCredentialHandler.spec.ts
│   │   │   ├── keyCredentialHandler.spec.ts
│   │   │   └── connectionBuilder.spec.ts
│   │   │
│   │   ├── errors/                    # Error handling tests
│   │   │   ├── errorRecovery.spec.ts
│   │   │   └── errorTypes.spec.ts
│   │   │
│   │   ├── protocol/                  # Protocol tests
│   │   │   ├── messageParser.spec.ts
│   │   │   └── protocolHandler.spec.ts
│   │   │
│   │   └── utils/                     # Utility tests
│   │       ├── platform.spec.ts
│   │       └── validation.spec.ts
│   │
│   ├── integration/                   # Integration tests
│   │   ├── realtime.spec.ts          # Real Voice Live service tests
│   │   ├── authentication.spec.ts     # Auth integration tests
│   │   └── connection.spec.ts         # Connection integration tests
│   │
│   └── mocks/                         # Test mocks and utilities
│       ├── mockWebSocket.ts           # WebSocket mock implementation
│       ├── mockVoiceLiveService.ts    # Voice Live service mock
│       ├── mockCredentials.ts         # Credential mocks
│       └── testUtils.ts               # Test utility functions
│
├── samples/                           # Usage samples
│   ├── javascript/                    # JavaScript samples
│   │   ├── basicConversation.js      # Basic conversation sample
│   │   ├── audioStreaming.js          # Audio streaming sample
│   │   ├── authentication.js          # Authentication examples
│   │   └── errorHandling.js           # Error handling examples
│   │
│   ├── typescript/                    # TypeScript samples
│   │   ├── basicConversation.ts      # Basic conversation sample
│   │   ├── audioStreaming.ts          # Audio streaming sample
│   │   ├── authentication.ts          # Authentication examples
│   │   └── errorHandling.ts           # Error handling examples
│   │
│   └── README.md                      # Sample documentation
│
├── docs/                              # Documentation
│   ├── README.md                      # Documentation index
│   ├── quickstart.md                  # Quick start guide
│   ├── authentication.md              # Authentication guide
│   ├── audio-processing.md            # Audio processing guide
│   ├── error-handling.md              # Error handling guide
│   ├── websocket-integration.md       # WebSocket integration guide
│   └── troubleshooting.md             # Troubleshooting guide
│
├── dist/                              # Compiled output (generated)
│   ├── browser/                       # Browser build
│   ├── commonjs/                      # CommonJS build
│   ├── esm/                          # ESM build
│   └── react-native/                 # React Native build
│
├── review/                            # API review files (generated)
│   ├── ai-voicelive-node.api.md
│   ├── ai-voicelive-browser.api.md
│   ├── ai-voicelive-react-native.api.md
│   └── ai-voicelive-models-*.api.md
│
├── temp/                              # Temporary build files (generated)
│
└── Design Documents/                   # Architecture documentation
    ├── EXISTING_TYPES_ANALYSIS.md     # Analysis of generated types
    ├── CLIENT_ARCHITECTURE.md         # Client architecture design
    ├── WEBSOCKET_ABSTRACTION.md       # WebSocket abstraction design
    ├── AUTHENTICATION_DESIGN.md       # Authentication integration design
    ├── ERROR_HANDLING_DESIGN.md       # Error handling framework design
    └── PROJECT_STRUCTURE.md           # This document
```

## File Organization Principles

### 1. Generated vs Hand-Written Code
- **Generated**: `src/models/` - Contains TypeSpec-generated models (DO NOT MODIFY)
- **Hand-Written**: All other files in `src/` - Custom implementations and extensions
- **Integration**: Use imports from `src/models/` in hand-written code

### 2. Module Boundaries
- **Clear Separation**: Each subdirectory represents a distinct module/feature
- **Focused Responsibility**: Each module has a single, well-defined purpose
- **Minimal Dependencies**: Modules depend on as few other modules as possible
- **Interface-First**: Each module exposes clean interfaces via `index.ts`

### 3. Cross-Platform Support
- **Platform Abstraction**: Use interfaces to abstract platform differences
- **Conditional Exports**: Use build tools to include appropriate implementations
- **Feature Detection**: Runtime detection of platform capabilities
- **Graceful Degradation**: Fallbacks for unsupported platform features

### 4. Testing Strategy
- **Unit Tests**: Test individual modules in isolation
- **Integration Tests**: Test module interactions and real service integration
- **Mock Infrastructure**: Comprehensive mocks for testing without external dependencies
- **Platform Testing**: Separate test configurations for different platforms

## Build System Integration

### TypeScript Configuration

```json
// tsconfig.src.json
{
  "extends": "../../../tsconfig.lib.json",
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "src/**/*.spec.ts",
    "src/**/*.test.ts"
  ]
}
```

### Package.json Scripts

```json
{
  "scripts": {
    "build": "npm run clean && dev-tool run build-package && dev-tool run extract-api",
    "build:browser": "dev-tool run build-package --browser",
    "build:node": "dev-tool run build-package --node", 
    "build:samples": "dev-tool run build-samples",
    "clean": "rimraf --glob dist dist-browser dist-esm test-dist temp types *.tgz *.log",
    "extract-api": "dev-tool run extract-api",
    "format": "dev-tool run vendored prettier --write --config ../../../.prettierrc.json --ignore-path ../../../.prettierignore \"src/**/*.ts\" \"test/**/*.ts\" \"samples/**/*.ts\"",
    "integration-test": "npm run integration-test:node && npm run integration-test:browser",
    "integration-test:browser": "dev-tool run test:vitest --no-test-proxy --browser",
    "integration-test:node": "dev-tool run test:vitest --no-test-proxy",
    "lint": "eslint src test",
    "lint:fix": "eslint src test --fix",
    "pack": "npm pack 2>&1",
    "test": "npm run clean && npm run unit-test && npm run integration-test",
    "test:browser": "npm run unit-test:browser && npm run integration-test:browser",
    "test:node": "npm run unit-test:node && npm run integration-test:node",
    "unit-test": "npm run unit-test:node && npm run unit-test:browser",
    "unit-test:browser": "dev-tool run test:vitest --browser",
    "unit-test:node": "dev-tool run test:vitest"
  }
}
```

## Code Generation Integration

### Generated Model Usage

```typescript
// src/models/index.ts (Generated - DO NOT MODIFY)
export * from "./models.js";

// src/client/voiceLiveClient.ts (Hand-written)
import type { 
  ClientEventUnion, 
  ServerEventUnion,
  RequestSession,
  ResponseSession
} from "../models/index.js";

export class VoiceLiveClient {
  // Implementation uses generated types
  async sendEvent(event: ClientEventUnion): Promise<void> {
    // ...
  }
}
```

### Model Extensions

```typescript
// src/client/types.ts (Hand-written extensions)
import type { ResponseSession } from "../models/index.js";

// Extend generated types with client-specific properties
export interface VoiceLiveSession extends ResponseSession {
  readonly connectionId?: string;
  readonly isConnected: boolean;
  readonly lastActivity: Date;
}
```

## Export Strategy

### Main Index Exports

```typescript
// src/index.ts
// Core client
export { VoiceLiveClient } from "./client/index.js";
export type { 
  VoiceLiveClientOptions,
  ConnectOptions,
  SendEventOptions,
  ConnectedEventArgs,
  DisconnectedEventArgs,
  ErrorEventArgs
} from "./client/index.js";

// Generated models (re-export)
export type {
  ClientEventUnion,
  ServerEventUnion,
  RequestSession,
  ResponseSession,
  // ... other important types
} from "./models/index.js";

// Error types
export {
  VoiceLiveError,
  VoiceLiveConnectionError,
  VoiceLiveAuthenticationError,
  VoiceLiveProtocolError,
  VoiceLiveServiceError,
  VoiceLiveClientError
} from "./errors/index.js";

// Utilities (selective export)
export { PlatformDetector } from "./utils/index.js";

// WebSocket abstractions (for advanced users)
export type { 
  VoiceLiveWebSocketLike,
  VoiceLiveWebSocketFactory 
} from "./websocket/index.js";
```

### Module-Specific Exports

```typescript
// src/client/index.ts
export { VoiceLiveClient } from "./voiceLiveClient.js";
export { VoiceLiveConnectionManager } from "./connectionManager.js";
export { VoiceLiveSessionManager } from "./sessionManager.js";

export type {
  VoiceLiveClientOptions,
  ConnectOptions,
  // ... other types
} from "./types.js";

// src/websocket/index.ts
export type { VoiceLiveWebSocketLike } from "./websocketLike.js";
export { VoiceLiveWebSocketNode } from "./websocketNode.js";
export { VoiceLiveWebSocketBrowser } from "./websocketBrowser.js";
export { 
  VoiceLiveWebSocketDefaultFactory,
  PlatformDetector 
} from "./websocketFactory.js";
```

## Development Workflow

### 1. Adding New Features
1. **Design Phase**: Create design document in root directory
2. **Interface First**: Define interfaces in appropriate module
3. **Implementation**: Implement functionality following Azure SDK patterns
4. **Testing**: Add comprehensive unit and integration tests
5. **Documentation**: Update relevant documentation and samples
6. **API Review**: Extract API and review changes

### 2. Handling Generated Code Updates
1. **TypeSpec Changes**: Modify TypeSpec definitions (external to this project)
2. **Code Generation**: Run code generation to update `src/models/`
3. **Integration Testing**: Ensure hand-written code still works with new models
4. **API Compatibility**: Verify no breaking changes to public API
5. **Update Tests**: Update tests if needed for new model features

### 3. Release Process
1. **Build Verification**: Ensure all platforms build successfully
2. **Test Suite**: Run complete test suite on all platforms
3. **API Review**: Ensure API changes are approved
4. **Documentation**: Update documentation and samples
5. **Version Bump**: Update version following semantic versioning
6. **Package**: Create package for distribution

## Benefits of This Structure

### 1. Maintainability
- **Clear Separation**: Generated vs hand-written code clearly separated
- **Modular Design**: Features organized into focused modules
- **Consistent Patterns**: Follows Azure SDK TypeScript patterns
- **Easy Navigation**: Intuitive directory structure

### 2. Extensibility
- **Plugin Architecture**: Easy to add new WebSocket implementations
- **Strategy Pattern**: Error recovery strategies easily extensible
- **Interface-Based**: New implementations can be added without breaking changes
- **Platform Support**: Easy to add support for new platforms

### 3. Testing
- **Comprehensive Coverage**: Unit, integration, and mock testing infrastructure
- **Platform Testing**: Separate test configurations for different platforms
- **Isolation**: Tests can run in isolation with proper mocking
- **CI/CD Ready**: Structure supports automated testing and deployment

### 4. Documentation
- **Self-Documenting**: Clear module structure explains functionality
- **Comprehensive Docs**: Documentation covers all major features
- **Sample Code**: Rich samples demonstrate proper usage
- **API Documentation**: Automatic API documentation generation

### 5. Azure SDK Compliance
- **Standard Patterns**: Follows Azure SDK TypeScript patterns and conventions
- **Build Integration**: Uses standard Azure SDK build tools and configuration
- **API Extraction**: Automatic API documentation and review process
- **Multi-Platform**: Supports Azure SDK's multi-platform requirements

## Migration Strategy

### Phase 1: Foundation (Current)
- ✅ Create design documents
- ✅ Establish project structure
- 🚧 Implement basic directory structure

### Phase 2: Core Implementation
- 🔄 Implement client architecture
- 🔄 Add WebSocket abstraction layer
- 🔄 Integrate authentication handling
- 🔄 Build error handling framework

### Phase 3: Enhancement
- ⏳ Add audio processing utilities
- ⏳ Implement protocol handling
- ⏳ Create comprehensive test suite
- ⏳ Add usage samples and documentation

### Phase 4: Finalization
- ⏳ API review and finalization
- ⏳ Performance optimization
- ⏳ Documentation completion
- ⏳ Release preparation

## Next Steps

1. **Create Directory Structure**: Implement the proposed directory structure
2. **Stub Implementations**: Create stub files with interfaces and basic implementations
3. **Build Verification**: Ensure build system works with new structure
4. **Test Infrastructure**: Set up testing framework and initial tests
5. **Documentation**: Create initial documentation framework
6. **Sample Setup**: Create basic sample structure and initial examples

This project structure provides a solid foundation for implementing the Voice Live SDK while maintaining Azure SDK compliance and supporting future growth and enhancements.