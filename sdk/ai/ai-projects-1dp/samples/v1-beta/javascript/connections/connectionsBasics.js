// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to how to use basic connections operations.
 *
 * @summary Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all connections,
 * get the properties of a default connection, and get the properties of a connection by its name.
 */

const { AIProjectClient } = require("@azure/ai-projects-1dp");
const { AzureKeyCredential } = require("@azure/core-auth");

require("dotenv").config();

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const apiKey = process.env["AZURE_AI_PROJECT_API_KEY"] || "<project key>";

async function main() {
  const project = new AIProjectClient(endpoint, new AzureKeyCredential(apiKey));

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
  console.log(`Retrieved connection ${JSON.stringify(connection, null, 2)}`);

  // List all connections of a specific type
  const azureAIConnections = [];
  for await (const azureOpenAIConnection of project.connections.list({
    connectionType: "AzureOpenAI",
  })) {
    azureAIConnections.push(azureOpenAIConnection);
  }
  console.log(`Retrieved ${azureAIConnections.length} Azure OpenAI connections`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
