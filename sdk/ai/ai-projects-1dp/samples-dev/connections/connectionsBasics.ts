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
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());

  // List the details of all the connections
  const connections: Connection[] = [];
  const connectionNames: string[] = [];
  for await (const connection of project.connections.list()) {
    connections.push(connection);
    connectionNames.push(connection.name);
  }
  console.log(`Retrieved connections: ${connectionNames}`);

  // Get the details of a connection, without credentials
  const connectionName = connections[0].name;
  const connection = await project.connections.get(connectionName);
  console.log(`Retrieved connection ${JSON.stringify(connection, null, 2)}`);

  const connectionWithCredentials = await project.connections.getWithCredentials(connectionName);
  console.log(
    `Retrieved connection with credentials ${JSON.stringify(connectionWithCredentials, null, 2)}`,
  );

  // List all connections of a specific type
  const azureAIConnections: Connection[] = [];
  for await (const azureOpenAIConnection of project.connections.list({
    connectionType: "AzureOpenAI",
    defaultConnection: true,
  })) {
    azureAIConnections.push(azureOpenAIConnection);
  }
  console.log(`Retrieved ${azureAIConnections.length} Azure OpenAI connections`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
