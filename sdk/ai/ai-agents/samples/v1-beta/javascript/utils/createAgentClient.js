// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Utils to create an Azure AI Agents client.
 */

const { AgentsClient } = require("@azure/ai-agents");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";

function createAgentClient() {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());
  return client;
}

module.exports = { createAgentClient };
