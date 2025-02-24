// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

type WebSocketFromDOM = WebSocket;

declare module "../../models/public.js" {
  interface WebsocketClientAdapter<WebSocketT> extends Promise<WebSocketClient<WebSocketT>> {
    /**
     * Returns the WebSocket client as a web WebSocket API client.
     * @returns The Web WebSocket API client.
     */
    web: () => Promise<WebSocketClient<WebSocketFromDOM>>;
  }
}

export { WebSocketFromDOM as WebSocket };
