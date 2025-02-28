// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the Realtime Websocket API to interact with the OpenAI service.
 *
 * @summary converse with Realtime API.
 * @azsdk-weight 100
 */

import { OpenAIRealtimeWebSocket } from "openai/beta/realtime/websocket";
import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";

// Set AZURE_OPENAI_ENDPOINT to the endpoint of your
// OpenAI resource. You can find this in the Azure portal.
// Load the .env file if it exists
import "dotenv/config";

async function main() {
  const cred = new DefaultAzureCredential();
  const scope = "https://cognitiveservices.azure.com/.default";
  const deploymentName = "gpt-4o-realtime-preview-1001";
  const azureADTokenProvider = getBearerTokenProvider(cred, scope);
  const client = new AzureOpenAI({
    azureADTokenProvider,
    apiVersion: "2024-10-01-preview",
    deployment: deploymentName,
  });
  const rt = await OpenAIRealtimeWebSocket.azure(client);

  // access the underlying `ws.WebSocket` instance
  rt.socket.addEventListener("open", () => {
    console.log("Connection opened!");
    rt.send({
      type: "session.update",
      session: {
        modalities: ["text"],
        model: "gpt-4o-realtime-preview",
      },
    });

    rt.send({
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "Say a couple paragraphs!" }],
      },
    });

    rt.send({ type: "response.create" });
  });

  rt.on("error", (err) => {
    // in a real world scenario this should be logged somewhere as you
    // likely want to continue procesing events regardless of any errors
    throw err;
  });

  rt.on("session.created", (event) => {
    console.log("session created!", event.session);
    console.log();
  });

  rt.on("response.text.delta", (event) => process.stdout.write(event.delta));
  rt.on("response.text.done", () => console.log());

  rt.on("response.done", () => rt.close());

  rt.socket.addEventListener("close", () => console.log("\nConnection closed!"));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
