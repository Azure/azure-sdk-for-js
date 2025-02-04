// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary demonstrates how to create a WebSocket client using createWebSocketClient.
 */
import { delay } from "@azure/core-util";
import { createWebSocketClient } from "@azure/core-websockets";

async function main(): Promise<void> {
  const client = await createWebSocketClient("wss://echo.websocket.org", {});
  client.on("message", (data) => {
    console.log("received:", data);
  });
  const isSendBufferNotFull = await client.send("Hello, World!");
  console.log(`The send buffer has enough room to send more data: ${isSendBufferNotFull}`);
  await delay(200);
  await client.close();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
