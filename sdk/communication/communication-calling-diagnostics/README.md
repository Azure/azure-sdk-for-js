# Azure Communication Calling Diagnostics

This package provides enhanced diagnostics for the Azure Communication Calling SDK. It addresses known issues with the UserFacingDiagnostics feature in the `@azure/communication-calling` package, specifically the issue where network events are not triggered despite network quality changes.

## Features

- Enhanced network diagnostics that properly detect and trigger network events
- Compatible with `@azure/communication-calling` version 1.33.4 and above
- Fixes issues with network events not being triggered
- Ensures `getLatest()` returns proper network diagnostic information
- Detects and reports network quality changes
- Browser online/offline state detection and reporting

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
  
  // Handle specific network diagnostics
  switch (event.diagnostic) {
    case 'noNetwork':
      console.log('Network connection lost:', event.value);
      break;
    case 'networkReconnect':
      console.log('Network reconnected:', event.value);
      break;
    case 'networkSendQuality':
    case 'networkReceiveQuality':
      console.log('Network quality changed:', event.diagnostic, event.value);
      break;
  }
});

// Media events work as before
enhancedDiagnostics.media.on('diagnosticChanged', (event) => {
  console.log('Media diagnostic changed:', event);
});

// Get latest diagnostics
const latestNetworkDiagnostics = enhancedDiagnostics.network.getLatest();
```

## Configuration Options

You can customize the behavior of the enhanced diagnostics by passing options to the constructor:

```typescript
const enhancedDiagnostics = new EnhancedUserFacingDiagnostics(call, {
  // How frequently to check network status (ms)
  pollingInterval: 1000, // default: 2000ms
  
  // Thresholds for poor network quality detection
  poorRttThreshold: 250, // default: 300ms
  poorPacketLossThreshold: 3, // default: 5%
  poorJitterThreshold: 20, // default: 30ms
  
  // Whether to detect browser's online/offline status
  detectBrowserNetworkStatus: true // default: true
});
```

## Advanced Usage

### On-demand Network Checks

You can trigger an immediate network diagnostic check:

```typescript
// Check network quality outside of the regular polling interval
enhancedDiagnostics.checkNetworkNow();
```

### Clean-up

Always dispose of the enhanced diagnostics when you're done with it:

```typescript
// Properly clean up when you're done
enhancedDiagnostics.dispose();
```

## Network Diagnostic Events

The following network diagnostic events can be emitted:

| Diagnostic | Value Type | Description |
|------------|------------|-------------|
| `noNetwork` | boolean | Indicates whether the network connection is lost |
| `networkReconnect` | boolean | Indicates whether the network connection was restored after being lost |
| `networkSendQuality` | DiagnosticQuality | The quality of the network for sending data |
| `networkReceiveQuality` | DiagnosticQuality | The quality of the network for receiving data |

## Known Issues

This package provides a workaround for the following issues in the `@azure/communication-calling` package:

- Network events not being triggered despite network quality changes
- `getLatest()` returning an empty object for network diagnostics

## Limitations

- The network quality detection is based on browser APIs that might not be available in all browsers
- The network quality metrics are estimated and might not be as accurate as the ones provided by the calling SDK when it works correctly

## License

MIT