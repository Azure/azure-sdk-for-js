export class WebSocketWrapper {
  constructor(...args) {
    const instance = new globalThis.WebSocket(...args);
    instance.binaryType = "blob";
    return instance;
  }
}
