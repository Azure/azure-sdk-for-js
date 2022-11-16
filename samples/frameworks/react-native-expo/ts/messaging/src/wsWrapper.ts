// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export class WebSocketWrapper extends globalThis.WebSocket{
  constructor(url: string | URL, protocols?: string | string[]) {
    super(url, protocols);
    this.binaryType = "blob";
  }
}
