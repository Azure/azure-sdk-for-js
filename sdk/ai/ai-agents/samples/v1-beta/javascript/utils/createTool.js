// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Utils to create tools for Azure AI Agents.
 */
const { ToolUtility } = require("@azure/ai-agents");
require("dotenv/config");

const connectionName = process.env["AZURE_AI_SEARCH_CONNECTION_NAME"] || "<connection-name>";
const connectionId = process.env["AZURE_BING_CONNECTION_ID"] || "<connection-name>";

function createAzureAISearchTool() {
  const azureAISearchTool = ToolUtility.createAzureAISearchTool(
    connectionName,
    "contoso-ai-search",
    {
      queryType: "vector",
      topK: 3,
      filter: "",
      indexConnectionId: connectionName,
      indexName: "contoso-ai-search",
      indexAssetId: "ashy-bag-x1xhr19c5q",
    },
  );
  return azureAISearchTool;
}

function createBingGroundingTool() {
  // Initialize agent bing tool with the connection id
  const bingTool = ToolUtility.createBingGroundingTool([{ connectionId: connectionId }]);
  return bingTool;
}

function createConnectedAgentTool(id, name, description) {
  return ToolUtility.createConnectedAgentTool(id, name, description).definition;
}

function getTool(names) {
  const tools = [];
  let toolResources;
  names.forEach((name) => {
    if (name === "azure-ai-search") {
      const azureAISearchTool = createAzureAISearchTool();
      tools.push(azureAISearchTool.definition);
      toolResources = azureAISearchTool.resources;
    } else if (name === "bing-grounding") {
      tools.push(createBingGroundingTool().definition);
    } else if (typeof name === "object" && name["connected-agent"]) {
      const connectedAgentTool = createConnectedAgentTool(
        name["connected-agent"].id,
        name["connected-agent"].name,
        name["connected-agent"].description,
      );
      tools.push(connectedAgentTool);
    }
  });
  return { tools, toolResources };
}

module.exports = {
  createAzureAISearchTool,
  createBingGroundingTool,
  createConnectedAgentTool,
  getTool,
};
