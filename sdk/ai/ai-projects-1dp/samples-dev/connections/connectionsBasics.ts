// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to how to use basic connections operations.
 *
 * @summary Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all connections,
 * get the properties of a default connection, and get the properties of a connection by its name.
 *
 */

import type { Connection } from "@azure/ai-projects-1dp";
import { AIProjectClient } from "@azure/ai-projects-1dp";
import { AzureKeyCredential } from "@azure/core-auth";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint =
  process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const apiKey = process.env["AZURE_AI_PROJECT_API_KEY"] || "<project key>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(endpoint, new AzureKeyCredential(apiKey));

  // List the details of all the connections
  const connections: Connection[] = [];
  for await (const connection of project.connections.list()) {
    connections.push(connection);
  }
  console.log(`Retrieved ${connections.length} connections`);

  // Get the details of a connection, without credentials
  const connectionName = connections[0].name;
  const connection = await project.connections.get(connectionName);
  console.log(`Retrieved connection, connection name: ${connection.name}`);

  // List all connections of a specific type
  const auzreAIConnections: Connection[] = [];
  for await (const azureOpenAIConnection of project.connections.list({ connectionType: "AzureOpenAI" })) {
    auzreAIConnections.push(azureOpenAIConnection);
  }
  console.log(`Retrieved ${auzreAIConnections.length} Azure OpenAI connections`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
