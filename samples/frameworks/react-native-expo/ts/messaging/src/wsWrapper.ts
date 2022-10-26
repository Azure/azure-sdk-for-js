// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT Licence.

export class WebSocketWrapper {
  constructor(...args) {
    const instance = new globalThis.WebSocket(...args);
    instance.binaryType = "blob";
    return instance;
  }
}
