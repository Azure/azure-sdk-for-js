// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary demonstrates how to create a WebSocket client using createWebSocketClient.
 */
const { delay } = require("@azure/core-util");
const { createWebSocketClient } = require("@azure/core-websockets");

async function main() {
  const client = await createWebSocketClient("wss://echo.websocket.org").asWs();
  console.log("Connected to:", client.websocket.url);
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
