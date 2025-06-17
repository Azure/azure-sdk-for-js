// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  AzureAISearchToolDefinition,
  BingGroundingToolDefinition,
  ToolResources,
  ToolDefinition,
  ToolUtility,
} from "@azure/ai-agents";
import "dotenv/config";

const connectionName = process.env["AZURE_AI_SEARCH_CONNECTION_NAME"] || "<connection-name>";
const connectionId = process.env["AZURE_BING_CONNECTION_ID"] || "<connection-name>";

export function createAzureAISearchTool(): {
  definition: AzureAISearchToolDefinition;
  resources: ToolResources;
} {
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

export function createBingGroundingTool(): {
  definition: BingGroundingToolDefinition;
} {
  // Initialize agent bing tool with the connection id
  const bingTool = ToolUtility.createBingGroundingTool([{ connectionId: connectionId }]);
  return bingTool;
}

export function createConnectedAgentTool(
  id: string,
  name: string,
  description: string,
): ToolDefinition {
  return ToolUtility.createConnectedAgentTool(id, name, description).definition;
}

export function getTool(
  names: Array<
    | "azure-ai-search"
    | "bing-grounding"
    | { "connected-agent": { id: string; name: string; description: string } }
  >,
): {
  tools: ToolDefinition[];
  toolResources?: ToolResources | undefined;
} {
  const tools: ToolDefinition[] = [];
  let toolResources: ToolResources | undefined;
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
