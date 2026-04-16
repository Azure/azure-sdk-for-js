// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AzureAISearchToolDefinition,
  CodeInterpreterToolDefinition,
  FileSearchToolDefinition,
  FileSearchToolDefinitionDetails,
  FunctionDefinition,
  FunctionToolDefinition,
  OpenApiToolDefinition,
  RequiredAction,
  RequiredToolCall,
  ToolDefinition,
  ToolDefinitionUnion,
  ToolResources,
  VectorStoreConfigurations,
  VectorStoreDataSource,
  OpenApiFunctionDefinition,
  AISearchIndexResource,
  BingGroundingToolDefinition,
  BingGroundingSearchConfiguration,
  ConnectedAgentToolDefinition,
  MCPToolDefinition,
  BrowserAutomationToolDefinition,
} from "../index.js";
import { OpenApiTool } from "./OpenApiTool.js";
import { MCPTool } from "./MCPTool.js";
/**
 * Determines if the given output is of the specified type.
 *
 * @typeParam T - The type to check against, which extends one of the possible output parent types.
 * @param output - The action to check, which can be of type `RequiredAction`, `RequiredToolCall`, or `ToolDefinitionUnion`.
 * @param type - The type to check the action against.
 * @returns A boolean indicating whether the action is of the specified type.
 */
export function isOutputOfType<T extends { type: string }>(
  output: RequiredAction | RequiredToolCall | ToolDefinitionUnion,
  type: string,
): output is T {
  return output.type === type;
}

/** Types of connection tools used to configure an agent */
export enum connectionToolType {
  /** Bing grounding search tool */
  BingGrounding = "bing_grounding",
  /** Microsoft Fabric tool */
  MicrosoftFabric = "fabric_dataagent",
  /** Sharepoint tool */
  SharepointGrounding = "sharepoint_grounding",
  /** Azure Function tool */
  AzureFunction = "azure_function",
  /** Bing custom search tool */
  BingCustomSearch = "bing_custom_search",
}

const toolMap = {
  bing_grounding: "bingGrounding",
  fabric_dataagent: "fabric_dataagent",
  sharepoint_grounding: "sharepointGrounding",
  azure_function: "azureFunction",
  bing_custom_search: "bingCustomSearch",
};

/**
 * Utility class for creating various tools.
 */
export class ToolUtility {
  /**
   * Creates a connection tool
   *
   * @param toolType - The type of the connection tool.
   * @param connectionIds - A list of the IDs of the connections to use.
   * @returns An object containing the definition for the connection tool
   */
  static createConnectionTool(
    toolType: connectionToolType,
    connectionIds: string[],
  ): { definition: ToolDefinitionUnion } {
    return {
      definition: {
        type: toolType,
        [toolMap[toolType]]: {
          connections: connectionIds.map((connectionId) => ({ connectionId: connectionId })),
        },
      },
    };
  }

  /**
   * Creates a bing grounding search tool
   *
   * @param connectionId - The ID of the bing search connection.
   *
   * @returns An object containing the definition and resources for the bing grounding search tool
   *
   */
  static createBingGroundingTool(searchConfigurations: BingGroundingSearchConfiguration[]): {
    definition: BingGroundingToolDefinition;
  } {
    // Ensure searchConfigurations is an array even if it's undefined
    const configs = searchConfigurations || [];
    return {
      definition: {
        type: "bing_grounding",
        bingGrounding: {
          searchConfigurations: configs.map((searchConfiguration) => ({
            connectionId: searchConfiguration.connectionId,
            market: searchConfiguration?.market,
            setLang: searchConfiguration?.setLang,
            count: searchConfiguration?.count,
            freshness: searchConfiguration?.freshness,
          })),
        },
      },
    };
  }

  /**
   * Creates a file search tool
   *
   * @param vectorStoreIds - The ID of the vector store attached to this agent. There can be a maximum of 1 vector store attached to the agent.
   * @param vectorStores - The list of vector store configuration objects from Azure. This list is limited to one element. The only element of this list contains the list of azure asset IDs used by the search tool.
   * @param definitionDetails - The input definition information for a file search tool as used to configure an agent.
   *
   * @returns An object containing the definition and resources for the file search tool
   */
  static createFileSearchTool(
    vectorStoreIds?: string[],
    vectorStores?: Array<VectorStoreConfigurations>,
    definitionDetails?: FileSearchToolDefinitionDetails,
  ): { definition: FileSearchToolDefinition; resources: ToolResources } {
    return {
      definition: { type: "file_search", fileSearch: definitionDetails },
      resources: { fileSearch: { vectorStoreIds: vectorStoreIds, vectorStores: vectorStores } },
    };
  }

  /**
   * Creates a code interpreter tool
   *
   * @param fileIds - A list of file IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.
   * @param dataSources - The data sources to be used. This option is mutually exclusive with fileIds.
   *
   * @returns An object containing the definition and resources for the code interpreter tool.
   */
  static createCodeInterpreterTool(
    fileIds?: string[],
    dataSources?: Array<VectorStoreDataSource>,
  ): { definition: CodeInterpreterToolDefinition; resources: ToolResources } {
    if (fileIds && dataSources) {
      throw new Error("Cannot specify both fileIds and dataSources");
    }

    return {
      definition: { type: "code_interpreter" },
      resources: { codeInterpreter: { fileIds: fileIds, dataSources: dataSources } },
    };
  }

  /**
   * Creates an Azure AI search tool
   *
   * @param indexConnectionId - The connection ID of the Azure AI search index.
   * @param indexName - The name of the Azure AI search index.
   *
   * @returns An object containing the definition and resources for the Azure AI search tool.
   */
  static createAzureAISearchTool(
    indexConnectionId: string,
    indexName: string,
    options?: AISearchIndexResource,
  ): { definition: AzureAISearchToolDefinition; resources: ToolResources } {
    return {
      definition: { type: "azure_ai_search" },
      resources: {
        azureAISearch: {
          indexList: [
            {
              indexConnectionId: indexConnectionId,
              indexName: indexName,
              queryType: options?.queryType,
              topK: options?.topK,
              filter: options?.filter,
            },
          ],
        },
      },
    };
  }

  /**
   * Creates a connected agent tool
   *
   * @returns An object containing the definition for the connected agent tool.
   */
  static createConnectedAgentTool(
    id: string,
    name: string,
    description: string,
  ): { definition: ConnectedAgentToolDefinition } {
    return {
      definition: {
        type: "connected_agent",
        connectedAgent: {
          id: id,
          name: name,
          description: description,
        },
      },
    };
  }

  /**
   * Creates a function tool
   *
   * @param functionDefinition - The function definition to use.
   *
   * @returns An object containing the definition for the function tool.
   */
  static createFunctionTool(functionDefinition: FunctionDefinition): {
    definition: FunctionToolDefinition;
  } {
    return {
      definition: {
        type: "function",
        function: functionDefinition,
      },
    };
  }

  /**
   * Creates an OpenApi tool
   *
   * @param openApiFunctionDefinition - The OpenApi function definition to use.
   *
   * @returns An object containing the definition for the OpenApi tool.
   */
  static createOpenApiTool(openApiFunctionDefinition: OpenApiFunctionDefinition): {
    definition: OpenApiToolDefinition;
  } {
    return {
      definition: OpenApiTool.createDefinition(openApiFunctionDefinition),
    };
  }

  /**
   * Creates an MCP tool with the provided configuration.
   * @param options - Configuration options for the MCP tool
   * @returns A new MCPTool instance
   */
  static createMCPTool(options: {
    serverLabel: string;
    serverUrl: string;
    allowedTools?: string[];
  }): MCPTool {
    return new MCPTool(options.serverLabel, options.serverUrl, options.allowedTools);
  }

  /**
   * Creates a Browser Automation tool
   *
   * @param connectionId - Connection ID to an Azure Playwright service, to be used by tool.
   *
   * @returns An object containing the definition for the browser automation tool.
   */
  static createBrowserAutomationTool(connectionId: string): {
    definition: BrowserAutomationToolDefinition;
  } {
    return {
      definition: {
        type: "browser_automation",
        browserAutomation: {
          connection: {
            id: connectionId,
          },
        },
      },
    };
  }
}

/**
 * Represents a set of tools with their definitions and resources.
 */
export class ToolSet {
  /** A list of tool definitions that have been added to the tool set. */
  toolDefinitions: ToolDefinition[] = [];

  /** A collection of resources associated with the tools in the tool set. */
  toolResources: ToolResources = {};

  /**
   * Adds a connection tool to the tool set.
   *
   * @param toolType - The type of the connection tool.
   * @param connectionIds - A list of the IDs of the connections to use.
   *
   * @returns An object containing the definition for the connection tool
   */
  addConnectionTool(
    toolType: connectionToolType,
    connectionIds: string[],
  ): { definition: ToolDefinition } {
    const tool = ToolUtility.createConnectionTool(toolType, connectionIds);
    this.toolDefinitions.push(tool.definition);
    return tool;
  }

  /**
   * Adds a file search tool to the tool set.
   *
   * @param vectorStoreIds - The ID of the vector store attached to this agent. There can be a maximum of 1 vector store attached to the agent.
   * @param vectorStores -  The list of vector store configuration objects from Azure. This list is limited to one element. The only element of this list contains the list of azure asset IDs used by the search tool.
   * @param definitionDetails - The input definition information for a file search tool as used to configure an agent.
   *
   * @returns An object containing the definition and resources for the file search tool
   */
  addFileSearchTool(
    vectorStoreIds?: string[],
    vectorStores?: Array<VectorStoreConfigurations>,
    definitionDetails?: FileSearchToolDefinitionDetails,
  ): { definition: FileSearchToolDefinition; resources: ToolResources } {
    const tool = ToolUtility.createFileSearchTool(vectorStoreIds, vectorStores, definitionDetails);
    this.toolDefinitions.push(tool.definition);
    this.toolResources = { ...this.toolResources, ...tool.resources };
    return tool;
  }

  /**
   * Adds a code interpreter tool to the tool set.
   *
   * @param fileIds - A list of file IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.
   * @param dataSources - The data sources to be used. This option is mutually exclusive with fileIds.
   *
   * @returns An object containing the definition and resources for the code interpreter tool
   */
  addCodeInterpreterTool(
    fileIds?: string[],
    dataSources?: Array<VectorStoreDataSource>,
  ): { definition: CodeInterpreterToolDefinition; resources: ToolResources } {
    const tool = ToolUtility.createCodeInterpreterTool(fileIds, dataSources);
    this.toolDefinitions.push(tool.definition);
    this.toolResources = { ...this.toolResources, ...tool.resources };
    return tool;
  }

  /**
   * Adds an Azure AI search tool to the tool set.
   *
   * @param indexConnectionId - The connection ID of the Azure AI search index.
   * @param indexName - The name of the Azure AI search index.
   *
   * @returns An object containing the definition and resources for the Azure AI search tool
   */
  addAzureAISearchTool(
    indexConnectionId: string,
    indexName: string,
  ): { definition: AzureAISearchToolDefinition; resources: ToolResources } {
    const tool = ToolUtility.createAzureAISearchTool(indexConnectionId, indexName);
    this.toolDefinitions.push(tool.definition);
    this.toolResources = { ...this.toolResources, ...tool.resources };
    return tool;
  }

  /**
   * Adds an OpenApi tool to the tool set.
   *
   * @param openApiFunctionDefinition - The OpenApi function definition to use.
   *
   * @returns An object containing the definition for the OpenApi tool
   */
  addOpenApiTool(openApiFunctionDefinition: OpenApiFunctionDefinition): {
    definition: OpenApiToolDefinition;
  } {
    const tool = ToolUtility.createOpenApiTool(openApiFunctionDefinition);
    this.toolDefinitions.push(tool.definition);
    return tool;
  }

  /**
   * Adds a Model Context Protocol (MCP) tool to the tool set.
   * @param options - The options for configuring the MCP tool.
   * @returns An object containing the definition and resources for the MCP tool
   */
  addMCPTool(options: { serverLabel: string; serverUrl: string; allowedTools?: string[] }): {
    definition: MCPToolDefinition;
    resources: ToolResources;
  } {
    const tool = ToolUtility.createMCPTool(options);
    this.toolDefinitions.push(tool.definition);
    this.toolResources = { ...this.toolResources, ...tool.resources };
    return tool;
  }

  /**
   * Adds a bing grounding search tool to the tool set.
   *
   * @param connectionId - The ID of the bing search connection.
   *
   * @returns An object containing the definition and resources for the bing grounding search tool
   */
  addBingGroundingTool(searchConfigurations: BingGroundingSearchConfiguration[]): {
    definition: BingGroundingToolDefinition;
  } {
    const tool = ToolUtility.createBingGroundingTool(searchConfigurations);
    this.toolDefinitions.push(tool.definition);
    return tool;
  }

  /**
   * Adds a connected agent tool to the tool set.
   *
   * @param id - The ID of the connected agent.
   * @param name - The name of the connected agent.
   * @param description - The description of the connected agent.
   * @returns An object containing the definition for the connected agent tool
   */
  addConnectedAgentTool(
    id: string,
    name: string,
    description: string,
  ): { definition: ConnectedAgentToolDefinition } {
    const tool = ToolUtility.createConnectedAgentTool(id, name, description);
    this.toolDefinitions.push(tool.definition);
    return tool;
  }
}
