// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the Realtime Websocket API to interact with the OpenAI service.
 *
 * @summary converse with Realtime API.
 * @azsdk-weight 100
 */

import { createWebSocketClient } from "@azure/core-websockets";
import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";

// Set AZURE_OPENAI_ENDPOINT to the endpoint of your
// OpenAI resource. You can find this in the Azure portal.
// Load the .env file if it exists
import "dotenv/config";

async function createUrl(
  client: Pick<AzureOpenAI, "baseURL" | "apiVersion" | "deploymentName" | "_getAzureADToken">,
): Promise<string> {
  const url = new URL(client.baseURL + "/realtime");
  url.searchParams.set("api-version", client.apiVersion);
  url.searchParams.set("deployment", client.deploymentName!);
  url.searchParams.set("Authorization", `Bearer ${await client._getAzureADToken()}`);
  return url.toString();
}

async function main(): Promise<void> {
  const deploymentName = "gpt-4o-realtime-preview-1001";
  const url = await createUrl(
    new AzureOpenAI({
      azureADTokenProvider: getBearerTokenProvider(
        new DefaultAzureCredential(),
        "https://cognitiveservices.azure.com/.default",
      ),
      apiVersion: "2024-10-01-preview",
      deployment: deploymentName,
    }),
  );
  const webSocketClient = await createWebSocketClient(url, {
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
