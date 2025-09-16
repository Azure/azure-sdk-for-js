// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the Realtime Websocket API to interact with the OpenAI service.
 *
 * @summary converse with Realtime API.
 * @azsdk-weight 100
 */

import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { OpenAIRealtimeWS } from "openai/beta/realtime/ws";
import { OpenAI } from "openai";
import "dotenv/config";

const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];

async function main(): Promise<void> {
  console.log("== Realtime WebSocket Sample ==");

  if (!endpoint) {
    throw new Error("Please set the AZURE_OPENAI_ENDPOINT environment variable.");
  }

  const cred = new DefaultAzureCredential();
  const scope = "https://cognitiveservices.azure.com/.default";
  const deploymentName = "gpt-4o-mini-realtime-preview-1217";
  const azureADTokenProvider = getBearerTokenProvider(cred, scope);
  const client = new OpenAI({
    baseURL: endpoint + "/openai/v1",
    apiKey: azureADTokenProvider,
  });
  const rt = await OpenAIRealtimeWS.create(client, { model: deploymentName });

  // access the underlying `ws.WebSocket` instance
  rt.socket.on("open", () => {
    console.log("Connection opened!");
    rt.send({
      type: "session.update",
      session: {
        modalities: ["text"],
        model: "gpt-4o-mini-realtime-preview-2024-12-17",
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
    // likely want to continue processing events regardless of any errors
    throw err;
  });

  rt.on("session.created", (event) => {
    console.log("session created!", event.session);
    console.log();
  });

  rt.on("response.text.delta", (event) => process.stdout.write(event.delta));
  rt.on("response.text.done", () => console.log());

  rt.on("response.done", () => rt.close());

  rt.socket.on("close", () => console.log("\nConnection closed!"));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
