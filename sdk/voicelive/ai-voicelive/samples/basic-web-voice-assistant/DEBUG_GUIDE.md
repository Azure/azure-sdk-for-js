# 🔍 **Voice Live SDK Debugging Guide**

Complete guide for debugging the Azure Voice Live SDK when running the web assistant sample.

## 🚀 **Quick Debug Setup**

### **1. Enable SDK Logging**
The Voice Live SDK logs through the standard `@azure/logger` package. Enable verbose logs one of two ways:

- **Browser console** — before creating the client:
  ```ts
  import { setLogLevel } from "@azure/logger";
  setLogLevel("verbose");
  ```
- **Node / dev server** — set the env var before launching:
  ```bash
  AZURE_LOG_LEVEL=verbose npm run dev
  ```

Then:
1. **Open the web assistant** (`npm run dev`)
2. **Open Browser DevTools** (F12)
3. **Connect and start a conversation** — detailed SDK logs appear in the console

> The sample's **"Enable Debug Mode"** checkbox is a *sample-level* convenience that prints a reminder about `AZURE_LOG_LEVEL`. It does **not** itself control SDK log verbosity — `@azure/logger` does.

### **2. Browser DevTools Debugging**

**Console Tab:**
- ✅ **SDK Debug Logs**: Detailed internal SDK operations
- ✅ **Event Logging**: All SDK events with data
- ✅ **Connection States**: WebSocket connection lifecycle
- ✅ **Error Details**: Full error stack traces

**Network Tab:**
- ✅ **WebSocket Traffic**: Real-time message inspection
- ✅ **Headers**: Authentication and connection details
- ✅ **Timing**: Connection and message latency

**Sources Tab:**
- ✅ **Breakpoints**: Set breakpoints in sample code
- ✅ **Source Maps**: Debug TypeScript source (not minified)
- ✅ **Call Stack**: Full execution path during errors

## 🛠️ **Debug Methods Available**

### **Method 1: Built-in Event Stream (Easiest)**

The sample has a **live event stream** that shows all SDK events in real-time:

1. **Click "Show Events"** in the sample UI
2. **Toggle "Filter Important Events Only"** to see all events
3. **Watch real-time SDK events** with full JSON data

**What you see:**
```javascript
[14:23:45] server.response.text.delta
{
  "responseId": "resp_123",
  "itemId": "item_456", 
  "delta": "Hello there!"
}
```

### **Method 2: Console Debug Logging**

**Enable verbose SDK logs using the standard `@azure/logger` package:**
```typescript
import { setLogLevel } from "@azure/logger";
setLogLevel("verbose");
```

Or via environment variable:
```bash
AZURE_LOG_LEVEL=verbose
```

**What you see in console:**
```
azure:ai-voicelive:info VoiceLiveSession created { ... }
azure:ai-voicelive:info Connecting to Voice Live service { ... }
azure:ai-voicelive:info Sent event { type: 'session.update', ... }
🔔 SDK Event: connected {...}
🔔 SDK Event: server.response.created {...}
```

### **Method 3: Network Tab WebSocket Inspection**

1. **Open DevTools → Network Tab**
2. **Filter by "WS" (WebSocket)**
3. **Click on the WebSocket connection**
4. **View Messages tab** for real-time traffic

**What you see:**
```json
// Outgoing to server
{"type": "session.update", "session": {...}}

// Incoming from server  
{"type": "session.created", "session": {...}}
{"type": "response.text.delta", "delta": "Hello"}
```

### **Method 4: SDK Source Code Debugging (Advanced)**

For debugging the actual SDK internals:

**Step 1: Switch to Source Debugging**
```typescript
// In vite.config.ts, uncomment these lines:
resolve: {
  alias: {
    '@azure/ai-voicelive': '../../src/index.ts'
  }
},
optimizeDeps: {
  exclude: ['@azure/ai-voicelive']
}
```

**Step 2: Restart Dev Server**
```bash
npm run dev
```

**Step 3: Set Breakpoints**
- **Navigate to Sources tab** in DevTools
- **Find SDK files** under `webpack://` or similar
- **Set breakpoints** in SDK source code
- **Step through execution** line by line

## 🎯 **Common Debug Scenarios**

### **Connection Issues**

**Debug Steps:**
1. **Check Console** for connection errors
2. **Network Tab** → verify WebSocket connection attempt
3. **Headers** → check authentication token
4. **Sample Events** → look for 'error' or 'disconnected' events

**Common Issues:**
```javascript
// Wrong endpoint
Error: WebSocket connection failed to wss://wrong-url.com

// Authentication failure  
Error: 401 Unauthorized

// Network timeout
Error: Connection timeout after 30000ms
```

### **Audio Problems**

**Debug Steps:**
1. **Console** → check for getUserMedia errors
2. **Audio Level Meter** → verify microphone input
3. **Sample Events** → look for audio buffer events
4. **Network Tab** → verify audio data being sent

**Common Issues:**
```javascript
// Microphone permission denied
Error: NotAllowedError: Permission denied

// Audio format issues
Warning: Audio format conversion needed

// No audio input detected
Warning: Microphone level is 0
```

### **Response Streaming Issues**

**Debug Steps:**
1. **Sample Events** → filter for response events
2. **Console** → check streaming iterator logs  
3. **Network Tab** → verify response deltas coming from server

**Event Types to Watch:**
```javascript
server.response.created        // Response started
server.response.text.delta     // Text chunks
server.response.audio.delta    // Audio chunks  
server.response.done          // Response completed
```

### **Performance Issues**

**Debug Steps:**
1. **Performance Tab** → record during conversation
2. **Memory Tab** → check for memory leaks
3. **Console** → look for timeout warnings

**Metrics to Watch:**
- **Memory Usage**: Should stay stable during long conversations
- **CPU Usage**: Should spike only during active processing
- **WebSocket Ping**: Should stay under 100ms typically

## 🔧 **Advanced Debugging Techniques**

### **Custom Event Logging**

Add custom logging to track specific flows:

```typescript
// In your sample code
client.events.on('server.response.text.delta', (event) => {
  console.log('📝 Text Delta:', {
    responseId: event.responseId,
    deltaLength: event.delta.length,
    timestamp: Date.now()
  });
});

client.events.on('server.response.audio.delta', (event) => {
  console.log('🎵 Audio Delta:', {
    responseId: event.responseId,
    dataSize: event.delta.byteLength,
    timestamp: Date.now()
  });
});
```

### **State Inspection**

Monitor SDK state in real-time:

```typescript
// Add to your sample
setInterval(() => {
  if (client.avatarManager) {
    console.log('👤 Avatar State:', client.avatarManager.currentState);
  }
  console.log('🔗 Connection Status:', client.connectionStatus);
}, 5000);
```

### **Performance Monitoring**

Track streaming performance:

```typescript
let textChunkCount = 0;
let audioChunkCount = 0;

client.events.on('server.response.text.delta', () => textChunkCount++);
client.events.on('server.response.audio.delta', () => audioChunkCount++);

setInterval(() => {
  console.log('📊 Streaming Stats:', {
    textChunks: textChunkCount,
    audioChunks: audioChunkCount,
    rate: `${textChunkCount + audioChunkCount}/min`
  });
  textChunkCount = 0;
  audioChunkCount = 0;
}, 60000);
```

## 🐛 **Debug Logging Levels**

Log verbosity is controlled through `@azure/logger`:

```typescript
import { setLogLevel } from "@azure/logger";

// Available levels:
// - 'error'   : Only errors
// - 'warning' : Errors + warnings
// - 'info'    : Errors + warnings + lifecycle info
// - 'verbose' : Everything including internal state changes
setLogLevel("verbose");
```

Or via environment variable (Node / dev server):

```bash
AZURE_LOG_LEVEL=verbose
```

Or per-namespace (Node `DEBUG`-style):

```bash
DEBUG=azure:ai-voicelive:*
```

See the [@azure/logger docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger) for advanced configuration (custom sinks, etc.).

## 📱 **Mobile Debugging**

For debugging on mobile devices:

**Option 1: Remote Debugging**
1. **Chrome DevTools** → More tools → Remote devices
2. **Connect your phone** via USB
3. **Debug the mobile browser** from desktop

**Option 2: Console Overlay**
```typescript
// Add to sample for mobile console
if (window.innerWidth < 768) {
  const consoleDiv = document.createElement('div');
  consoleDiv.style.cssText = 'position:fixed;bottom:0;left:0;right:0;height:200px;background:black;color:green;overflow:auto;font-size:10px;z-index:9999;';
  document.body.appendChild(consoleDiv);
  
  const originalConsoleLog = console.log;
  console.log = (...args) => {
    originalConsoleLog(...args);
    consoleDiv.innerHTML += args.join(' ') + '<br>';
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
  };
}
```

## 🎯 **Production Debugging**

For debugging in production environments:

**Option 1: Remote Logging**
```typescript
// Send debug info to your logging service
const logToService = (level, message, data) => {
  fetch('/api/logs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ level, message, data, timestamp: Date.now() })
  });
};

// Hook into SDK events
client.events.on('error', (error) => {
  logToService('error', 'Voice Live SDK Error', error);
});
```

**Option 2: User Feedback Integration**
```typescript
// Add debug info to user feedback
const gatherDebugInfo = () => ({
  userAgent: navigator.userAgent,
  connection: client.connectionStatus,
  lastError: lastErrorMessage,
  eventCounts: { text: textEventCount, audio: audioEventCount },
  performance: { 
    avgLatency: averageLatency,
    memoryUsage: performance.memory?.usedJSHeapSize 
  }
});
```

## ✅ **Debug Checklist**

When experiencing issues, check:

- [ ] **`setLogLevel("verbose")` called** (or `AZURE_LOG_LEVEL=verbose` set) to enable SDK logs
- [ ] **Console tab open** to see SDK logs
- [ ] **Network tab filtered** to WebSocket traffic
- [ ] **Events panel visible** in sample UI
- [ ] **Audio permissions granted** by browser
- [ ] **HTTPS connection** (required for microphone)
- [ ] **API key and endpoint** correct
- [ ] **Browser compatibility** (modern browser)

## 🚀 **Getting Help**

When reporting issues, include:

1. **Browser and version**
2. **Console logs** (with debug enabled)
3. **Network tab screenshot** (WebSocket messages)
4. **Sample events output** (from Events panel)  
5. **Steps to reproduce**
6. **Expected vs actual behavior**

This comprehensive debugging setup gives you full visibility into the Voice Live SDK's operation, from high-level events down to individual WebSocket messages and internal state changes!