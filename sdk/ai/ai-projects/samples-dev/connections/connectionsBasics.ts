// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to how to use basic connections operations.
 *
 * @summary Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all connections,
 * get the properties of a default connection, and get the properties of a connection by its name.
 *
 */

import { AIProjectsClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
dotenv.config();

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

export async function main(): Promise<void> {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  // List the details of all the connections
  const connections = await client.connections.listConnections();
  console.log(`Retrieved ${connections.length} connections`);

  // Get the details of a connection, without credentials
  const connectionName = connections[0].name;
  const connection = await client.connections.getConnection(connectionName);
  console.log(`Retrieved connection, connection name: ${connection.name}`);

  // Get the details of a connection, including credentials (if available)
  const connectionWithSecrets = await client.connections.getConnectionWithSecrets(connectionName);
  console.log(`Retrieved connection with secrets, connection name: ${connectionWithSecrets.name}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
