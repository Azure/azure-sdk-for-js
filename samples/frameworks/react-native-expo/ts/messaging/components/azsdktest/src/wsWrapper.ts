// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export class WebSocketWrapper extends WebSocket {
  constructor(url: string | URL, protocols?: string | string[]) {
    super(url, protocols);
    this.binaryType = "blob";
  }
}
