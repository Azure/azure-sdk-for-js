# Azure Communication Calling Diagnostics

This package provides enhanced diagnostics for the Azure Communication Calling SDK. It addresses known issues with the UserFacingDiagnostics feature in the `@azure/communication-calling` package.

## Features

- Enhanced network diagnostics that properly detect and trigger network events
- Compatible with `@azure/communication-calling` version 1.33.4 and above
- Fixes issues with network events not being triggered
- Ensures `getLatest()` returns proper network diagnostic information

## Installation

```bash
npm install @azure/communication-calling-diagnostics
```

## Usage

Replace your UserFacingDiagnostics implementation with the enhanced version:

```typescript
import { EnhancedUserFacingDiagnostics } from '@azure/communication-calling-diagnostics';

// Instead of:
// const userFacingDiagnostics = call.feature(Features.UserFacingDiagnostics);

// Use:
const enhancedDiagnostics = new EnhancedUserFacingDiagnostics(call);

// Subscribe to events as usual
enhancedDiagnostics.network.on('diagnosticChanged', (event) => {
  console.log('Network diagnostic changed:', event);
});

// Get latest diagnostics
const latestNetworkDiagnostics = enhancedDiagnostics.network.getLatest();
```

## Known Issues

This package provides a workaround for the following issues in the `@azure/communication-calling` package:

- Network events not being triggered despite network quality changes
- `getLatest()` returning an empty object for network diagnostics

## License

MIT