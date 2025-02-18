// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the Realtime Websocket API to interact with the OpenAI service.
 *
 * @summary converse with Realtime API.
 * @azsdk-weight 100
 */

import { createWebSocketClient } from "@azure/core-websockets";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import "dotenv/config";

async function main(): Promise<void> {
  const deploymentName = "gpt-4o-realtime-preview-1001";
  const url = new URL(process.env.AZURE_OPENAI_ENDPOINT + "/openai/realtime");
  url.searchParams.set("api-version", "2024-10-01-preview");
  url.searchParams.set("deployment", deploymentName);
  const getAzureADToken = getBearerTokenProvider(
    new DefaultAzureCredential(),
    "https://cognitiveservices.azure.com/.default",
  );
  url.searchParams.set("Authorization", `Bearer ${await getAzureADToken()}`);
  const webSocketClient = await createWebSocketClient(url.toString(), {
    on: {
      message: async (data) => {
        let event;
        try {
          event = JSON.parse(data as string);
        } catch (err) {
          console.error("could not parse websocket event", err);
          return;
        }
        switch (event.type) {
          case "response.text.delta":
            process.stdout.write(event.delta);
            break;
          case "response.text.done":
            console.log();
            break;
          case "response.done":
            await webSocketClient.close();
            break;
          case "session.created":
            console.log("session created!", event.session);
            break;
        }
      },
      close: () => console.log("\nConnection closed!"),
      error: (err) => console.error("Error:", err),
    },
  });

  await webSocketClient.send(
    JSON.stringify({
      type: "session.update",
      session: {
        modalities: ["text"],
        model: deploymentName,
      },
    }),
  );

  await webSocketClient.send(
    JSON.stringify({
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "Say a couple paragraphs!" }],
      },
    }),
  );

  await webSocketClient.send(JSON.stringify({ type: "response.create" }));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
