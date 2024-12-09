// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * FILE: files.ts
 *
 * @summary Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all connections, get the properties of a default connection, and get the properties of a connection by its name.
 *
 *  USAGE:
 *  npm node files.ts
 *
 *  Before running the sample:
 *
 *  npm install @azure/ai-projects @azure/identity stream dotenv
 *
 *  Set this environment variables with your own values:
 *  AZURE_AI_PROJECTS_CONNECTION_STRING - the Azure AI Project connection string, as found in your AI Studio Project
 */

const { AIProjectsClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");

require("dotenv").config();

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] ||
  "<endpoint>;<subscription>;<resource group>;<project>";

async function main() {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  // Get the properties of the specified machine learning workspace
  const workspace = await client.connections.getWorkspace();
  console.log(`Retrieved workspace, workspace name: ${workspace.name}`);

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

module.exports = { main };
