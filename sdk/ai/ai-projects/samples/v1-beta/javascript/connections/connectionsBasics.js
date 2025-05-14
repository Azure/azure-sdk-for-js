// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic connections operations.
 *
 * @summary Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all connections,
 * get the properties of a default connection, and get the properties of a connection by its name.
 */

const { AIProjectClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";

async function main() {
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());

  // List the details of all the connections
  const connections = [];
  const connectionNames = [];
  for await (const connection of project.connections.list()) {
    connections.push(connection);
    connectionNames.push(connection.name);
  }
  console.log(`Retrieved connections: ${connectionNames}`);

  // Get the details of a connection, without credentials
  const connectionName = connections[0].name;
  const connection = await project.connections.get(connectionName);
  console.log(
    "connection.type: ",
    connection.type,
    "connection.name: ",
    connection.name,
    "connection.target: ",
    connection.target,
  );

  const connectionWithCredentials = await project.connections.getWithCredentials(connectionName);
  const credentials = connectionWithCredentials.credentials;
  console.log("credentials.type: ", credentials.type, "credentials", credentials);

  // List all connections of a specific type
  const azureAIConnections = [];
  for await (const azureOpenAIConnection of project.connections.list({
    connectionType: "AzureOpenAI",
    defaultConnection: true,
  })) {
    azureAIConnections.push(azureOpenAIConnection);
  }
  console.log(`Retrieved ${azureAIConnections.length} Azure OpenAI connections`);

  // Get the details of a default connection
  const defaultConnection = await project.connections.getDefault("AzureOpenAI", true);
  console.log(`Retrieved default connection ${JSON.stringify(defaultConnection, null, 2)}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
