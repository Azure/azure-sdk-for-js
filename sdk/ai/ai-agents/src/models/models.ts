// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createFilePartDescriptor } from "../static-helpers/multipartHelpers.js";
import type { FileContents } from "../static-helpers/multipartHelpers.js";

/** An abstract representation of an input tool definition that an agent can use. */
export interface ToolDefinition {
  /** The object type. */
  /** The discriminator possible values: code_interpreter, file_search, function, bing_grounding, fabric_dataagent, sharepoint_grounding, azure_ai_search, openapi, bing_custom_search, connected_agent, deep_research, mcp, azure_function, browser_automation */
  type: string;
}

export function toolDefinitionSerializer(item: ToolDefinition): any {
  return { type: item["type"] };
}

export function toolDefinitionDeserializer(item: any): ToolDefinition {
  return {
    type: item["type"],
  };
}

/** Alias for ToolDefinitionUnion */
export type ToolDefinitionUnion =
  | CodeInterpreterToolDefinition
  | FileSearchToolDefinition
  | FunctionToolDefinition
  | BingGroundingToolDefinition
  | MicrosoftFabricToolDefinition
  | SharepointToolDefinition
  | AzureAISearchToolDefinition
  | OpenApiToolDefinition
  | BingCustomSearchToolDefinition
  | ConnectedAgentToolDefinition
  | DeepResearchToolDefinition
  | MCPToolDefinition
  | AzureFunctionToolDefinition
  | BrowserAutomationToolDefinition
  | ToolDefinition;

export function toolDefinitionUnionSerializer(item: ToolDefinitionUnion): any {
  switch (item.type) {
    case "code_interpreter":
      return codeInterpreterToolDefinitionSerializer(item as CodeInterpreterToolDefinition);

    case "file_search":
      return fileSearchToolDefinitionSerializer(item as FileSearchToolDefinition);

    case "function":
      return functionToolDefinitionSerializer(item as FunctionToolDefinition);

    case "bing_grounding":
      return bingGroundingToolDefinitionSerializer(item as BingGroundingToolDefinition);

    case "fabric_dataagent":
      return microsoftFabricToolDefinitionSerializer(item as MicrosoftFabricToolDefinition);

    case "sharepoint_grounding":
      return sharepointToolDefinitionSerializer(item as SharepointToolDefinition);

    case "azure_ai_search":
      return azureAISearchToolDefinitionSerializer(item as AzureAISearchToolDefinition);

    case "openapi":
      return openApiToolDefinitionSerializer(item as OpenApiToolDefinition);

    case "bing_custom_search":
      return bingCustomSearchToolDefinitionSerializer(item as BingCustomSearchToolDefinition);

    case "connected_agent":
      return connectedAgentToolDefinitionSerializer(item as ConnectedAgentToolDefinition);

    case "deep_research":
      return deepResearchToolDefinitionSerializer(item as DeepResearchToolDefinition);

    case "mcp":
      return mcpToolDefinitionSerializer(item as MCPToolDefinition);

    case "azure_function":
      return azureFunctionToolDefinitionSerializer(item as AzureFunctionToolDefinition);

    case "browser_automation":
      return browserAutomationToolDefinitionSerializer(item as BrowserAutomationToolDefinition);

    default:
      return toolDefinitionSerializer(item);
  }
}

export function toolDefinitionUnionDeserializer(item: any): ToolDefinitionUnion {
  switch (item.type) {
    case "code_interpreter":
      return codeInterpreterToolDefinitionDeserializer(item as CodeInterpreterToolDefinition);

    case "file_search":
      return fileSearchToolDefinitionDeserializer(item as FileSearchToolDefinition);

    case "function":
      return functionToolDefinitionDeserializer(item as FunctionToolDefinition);

    case "bing_grounding":
      return bingGroundingToolDefinitionDeserializer(item as BingGroundingToolDefinition);

    case "fabric_dataagent":
      return microsoftFabricToolDefinitionDeserializer(item as MicrosoftFabricToolDefinition);

    case "sharepoint_grounding":
      return sharepointToolDefinitionDeserializer(item as SharepointToolDefinition);

    case "azure_ai_search":
      return azureAISearchToolDefinitionDeserializer(item as AzureAISearchToolDefinition);

    case "openapi":
      return openApiToolDefinitionDeserializer(item as OpenApiToolDefinition);

    case "bing_custom_search":
      return bingCustomSearchToolDefinitionDeserializer(item as BingCustomSearchToolDefinition);

    case "connected_agent":
      return connectedAgentToolDefinitionDeserializer(item as ConnectedAgentToolDefinition);

    case "deep_research":
      return deepResearchToolDefinitionDeserializer(item as DeepResearchToolDefinition);

    case "mcp":
      return mcpToolDefinitionDeserializer(item as MCPToolDefinition);

    case "azure_function":
      return azureFunctionToolDefinitionDeserializer(item as AzureFunctionToolDefinition);

    case "browser_automation":
      return browserAutomationToolDefinitionDeserializer(item as BrowserAutomationToolDefinition);

    default:
      return toolDefinitionDeserializer(item);
  }
}

/** The input definition information for a code interpreter tool as used to configure an agent. */
export interface CodeInterpreterToolDefinition extends ToolDefinition {
  /** The object type, which is always 'code_interpreter'. */
  type: "code_interpreter";
}

export function codeInterpreterToolDefinitionSerializer(item: CodeInterpreterToolDefinition): any {
  return { type: item["type"] };
}

export function codeInterpreterToolDefinitionDeserializer(
  item: any,
): CodeInterpreterToolDefinition {
  return {
    type: item["type"],
  };
}

/** The input definition information for a file search tool as used to configure an agent. */
export interface FileSearchToolDefinition extends ToolDefinition {
  /** The object type, which is always 'file_search'. */
  type: "file_search";
  /** Options overrides for the file search tool. */
  fileSearch?: FileSearchToolDefinitionDetails;
}

export function fileSearchToolDefinitionSerializer(item: FileSearchToolDefinition): any {
  return {
    type: item["type"],
    file_search: !item["fileSearch"]
      ? item["fileSearch"]
      : fileSearchToolDefinitionDetailsSerializer(item["fileSearch"]),
  };
}

export function fileSearchToolDefinitionDeserializer(item: any): FileSearchToolDefinition {
  return {
    type: item["type"],
    fileSearch: !item["file_search"]
      ? item["file_search"]
      : fileSearchToolDefinitionDetailsDeserializer(item["file_search"]),
  };
}

/** Options overrides for the file search tool. */
export interface FileSearchToolDefinitionDetails {
  /**
   * The maximum number of results the file search tool should output. The default is 20 for gpt-4* models and 5 for gpt-3.5-turbo. This number should be between 1 and 50 inclusive.
   *
   * Note that the file search tool may output fewer than `max_num_results` results. See the file search tool documentation for more information.
   */
  maxNumResults?: number;
  /** Ranking options for file search. */
  rankingOptions?: FileSearchRankingOptions;
}

export function fileSearchToolDefinitionDetailsSerializer(
  item: FileSearchToolDefinitionDetails,
): any {
  return {
    max_num_results: item["maxNumResults"],
    ranking_options: !item["rankingOptions"]
      ? item["rankingOptions"]
      : fileSearchRankingOptionsSerializer(item["rankingOptions"]),
  };
}

export function fileSearchToolDefinitionDetailsDeserializer(
  item: any,
): FileSearchToolDefinitionDetails {
  return {
    maxNumResults: item["max_num_results"],
    rankingOptions: !item["ranking_options"]
      ? item["ranking_options"]
      : fileSearchRankingOptionsDeserializer(item["ranking_options"]),
  };
}

/** Ranking options for file search. */
export interface FileSearchRankingOptions {
  /** File search ranker. */
  ranker: string;
  /** Ranker search threshold. */
  scoreThreshold: number;
}

export function fileSearchRankingOptionsSerializer(item: FileSearchRankingOptions): any {
  return { ranker: item["ranker"], score_threshold: item["scoreThreshold"] };
}

export function fileSearchRankingOptionsDeserializer(item: any): FileSearchRankingOptions {
  return {
    ranker: item["ranker"],
    scoreThreshold: item["score_threshold"],
  };
}

/** The input definition information for a function tool as used to configure an agent. */
export interface FunctionToolDefinition extends ToolDefinition {
  /** The object type, which is always 'function'. */
  type: "function";
  /** The definition of the concrete function that the function tool should call. */
  function: FunctionDefinition;
}

export function functionToolDefinitionSerializer(item: FunctionToolDefinition): any {
  return {
    type: item["type"],
    function: functionDefinitionSerializer(item["function"]),
  };
}

export function functionToolDefinitionDeserializer(item: any): FunctionToolDefinition {
  return {
    type: item["type"],
    function: functionDefinitionDeserializer(item["function"]),
  };
}

/** The input definition information for a function. */
export interface FunctionDefinition {
  /** The name of the function to be called. */
  name: string;
  /** A description of what the function does, used by the model to choose when and how to call the function. */
  description?: string;
  /** The parameters the functions accepts, described as a JSON Schema object. */
  parameters: any;
}

export function functionDefinitionSerializer(item: FunctionDefinition): any {
  return {
    name: item["name"],
    description: item["description"],
    parameters: item["parameters"],
  };
}

export function functionDefinitionDeserializer(item: any): FunctionDefinition {
  return {
    name: item["name"],
    description: item["description"],
    parameters: item["parameters"],
  };
}

/** The input definition information for a bing grounding search tool as used to configure an agent. */
export interface BingGroundingToolDefinition extends ToolDefinition {
  /** The object type, which is always 'bing_grounding'. */
  type: "bing_grounding";
  /** The bing grounding search tool parameters. */
  bingGrounding: BingGroundingSearchToolParameters;
}

export function bingGroundingToolDefinitionSerializer(item: BingGroundingToolDefinition): any {
  return {
    type: item["type"],
    bing_grounding: bingGroundingSearchToolParametersSerializer(item["bingGrounding"]),
  };
}

export function bingGroundingToolDefinitionDeserializer(item: any): BingGroundingToolDefinition {
  return {
    type: item["type"],
    bingGrounding: bingGroundingSearchToolParametersDeserializer(item["bing_grounding"]),
  };
}

/** The bing grounding search tool parameters. */
export interface BingGroundingSearchToolParameters {
  /**
   * The search configurations attached to this tool. There can be a maximum of 1
   * search configuration resource attached to the tool.
   */
  searchConfigurations: BingGroundingSearchConfiguration[];
}

export function bingGroundingSearchToolParametersSerializer(
  item: BingGroundingSearchToolParameters,
): any {
  return {
    search_configurations: bingGroundingSearchConfigurationArraySerializer(
      item["searchConfigurations"],
    ),
  };
}

export function bingGroundingSearchToolParametersDeserializer(
  item: any,
): BingGroundingSearchToolParameters {
  // Handle the case where item might be undefined
  if (!item) {
    return { searchConfigurations: [] };
  }
  return {
    searchConfigurations: bingGroundingSearchConfigurationArrayDeserializer(
      item["search_configurations"],
    ),
  };
}

export function bingGroundingSearchConfigurationArraySerializer(
  result: Array<BingGroundingSearchConfiguration>,
): any[] {
  return result.map((item) => {
    return bingGroundingSearchConfigurationSerializer(item);
  });
}

export function bingGroundingSearchConfigurationArrayDeserializer(
  result: Array<BingGroundingSearchConfiguration>,
): any[] {
  // Handle the case where result might be undefined
  if (!result) {
    return [];
  }
  return result.map((item) => {
    return bingGroundingSearchConfigurationDeserializer(item);
  });
}

/** Search configuration for Bing Grounding */
export interface BingGroundingSearchConfiguration {
  /** Connection id for grounding with bing search */
  connectionId: string;
  /** The market where the results come from. */
  market?: string;
  /** The language to use for user interface strings when calling Bing API. */
  setLang?: string;
  /** The number of search results to return in the bing api response */
  count?: number;
  /** Filter search results by a specific time range. Accepted values: https://learn.microsoft.com/bing/search-apis/bing-web-search/reference/query-parameters */
  freshness?: string;
}

export function bingGroundingSearchConfigurationSerializer(
  item: BingGroundingSearchConfiguration,
): any {
  return {
    connection_id: item["connectionId"],
    market: item["market"],
    set_lang: item["setLang"],
    count: item["count"],
    freshness: item["freshness"],
  };
}

export function bingGroundingSearchConfigurationDeserializer(
  item: any,
): BingGroundingSearchConfiguration {
  return {
    connectionId: item["connection_id"],
    market: item["market"],
    setLang: item["set_lang"],
    count: item["count"],
    freshness: item["freshness"],
  };
}

/** The input definition information for a Microsoft Fabric tool as used to configure an agent. */
export interface MicrosoftFabricToolDefinition extends ToolDefinition {
  /** The object type, which is always 'fabric_dataagent'. */
  type: "fabric_dataagent";
  /** The fabric data agent tool parameters. */
  fabricDataagent: FabricDataAgentToolParameters;
}

export function microsoftFabricToolDefinitionSerializer(item: MicrosoftFabricToolDefinition): any {
  return {
    type: item["type"],
    fabric_dataagent: fabricDataAgentToolParametersSerializer(item["fabricDataagent"]),
  };
}

export function microsoftFabricToolDefinitionDeserializer(
  item: any,
): MicrosoftFabricToolDefinition {
  return {
    type: item["type"],
    fabricDataagent: fabricDataAgentToolParametersDeserializer(item["fabric_dataagent"]),
  };
}

/** The fabric data agent tool parameters. */
export interface FabricDataAgentToolParameters {
  /**
   * The connections attached to this tool. There can be a maximum of 1 connection
   * resource attached to the tool.
   */
  connectionList?: ToolConnection[];
}

export function fabricDataAgentToolParametersSerializer(item: FabricDataAgentToolParameters): any {
  return {
    connections: !item["connectionList"]
      ? item["connectionList"]
      : toolConnectionArraySerializer(item["connectionList"]),
  };
}

export function fabricDataAgentToolParametersDeserializer(
  item: any,
): FabricDataAgentToolParameters {
  return {
    connectionList: !item["connections"]
      ? item["connections"]
      : toolConnectionArrayDeserializer(item["connections"]),
  };
}

export function toolConnectionArraySerializer(result: Array<ToolConnection>): any[] {
  return result.map((item) => {
    return toolConnectionSerializer(item);
  });
}

export function toolConnectionArrayDeserializer(result: Array<ToolConnection>): any[] {
  return result.map((item) => {
    return toolConnectionDeserializer(item);
  });
}

/** A connection resource. */
export interface ToolConnection {
  /** A connection in a ToolConnectionList attached to this tool. */
  connectionId: string;
}

export function toolConnectionSerializer(item: ToolConnection): any {
  return { connection_id: item["connectionId"] };
}

export function toolConnectionDeserializer(item: any): ToolConnection {
  return {
    connectionId: item["connection_id"],
  };
}

/** The input definition information for a sharepoint tool as used to configure an agent. */
export interface SharepointToolDefinition extends ToolDefinition {
  /** The object type, which is always 'sharepoint_grounding'. */
  type: "sharepoint_grounding";
  /** The sharepoint grounding tool parameters. */
  sharepointGrounding: SharepointGroundingToolParameters;
}

export function sharepointToolDefinitionSerializer(item: SharepointToolDefinition): any {
  return {
    type: item["type"],
    sharepoint_grounding: sharepointGroundingToolParametersSerializer(item["sharepointGrounding"]),
  };
}

export function sharepointToolDefinitionDeserializer(item: any): SharepointToolDefinition {
  return {
    type: item["type"],
    sharepointGrounding: sharepointGroundingToolParametersDeserializer(
      item["sharepoint_grounding"],
    ),
  };
}

/** The sharepoint grounding tool parameters. */
export interface SharepointGroundingToolParameters {
  /**
   * The connections attached to this tool. There can be a maximum of 1 connection
   * resource attached to the tool.
   */
  connectionList?: ToolConnection[];
}

export function sharepointGroundingToolParametersSerializer(
  item: SharepointGroundingToolParameters,
): any {
  return {
    connections: !item["connectionList"]
      ? item["connectionList"]
      : toolConnectionArraySerializer(item["connectionList"]),
  };
}

export function sharepointGroundingToolParametersDeserializer(
  item: any,
): SharepointGroundingToolParameters {
  return {
    connectionList: !item["connections"]
      ? item["connections"]
      : toolConnectionArrayDeserializer(item["connections"]),
  };
}

/** The input definition information for an Azure AI search tool as used to configure an agent. */
export interface AzureAISearchToolDefinition extends ToolDefinition {
  /** The object type, which is always 'azure_ai_search'. */
  type: "azure_ai_search";
}

export function azureAISearchToolDefinitionSerializer(item: AzureAISearchToolDefinition): any {
  return { type: item["type"] };
}

export function azureAISearchToolDefinitionDeserializer(item: any): AzureAISearchToolDefinition {
  return {
    type: item["type"],
  };
}

/** The input definition information for an OpenAPI tool as used to configure an agent. */
export interface OpenApiToolDefinition extends ToolDefinition {
  /** The object type, which is always 'openapi'. */
  type: "openapi";
  /** The openapi function definition. */
  openapi: OpenApiFunctionDefinition;
}

export function openApiToolDefinitionSerializer(item: OpenApiToolDefinition): any {
  return {
    type: item["type"],
    openapi: openApiFunctionDefinitionSerializer(item["openapi"]),
  };
}

export function openApiToolDefinitionDeserializer(item: any): OpenApiToolDefinition {
  return {
    type: item["type"],
    openapi: openApiFunctionDefinitionDeserializer(item["openapi"]),
  };
}

/** The input definition information for an openapi function. */
export interface OpenApiFunctionDefinition {
  /** The name of the function to be called. */
  name: string;
  /** A description of what the function does, used by the model to choose when and how to call the function. */
  description?: string;
  /** The openapi function shape, described as a JSON Schema object. */
  spec: any;
  /** Open API authentication details */
  auth: OpenApiAuthDetailsUnion;
  /** List of OpenAPI spec parameters that will use user-provided defaults */
  defaultParams?: string[];
  /** List of function definitions used by OpenApi tool */
  readonly functions?: FunctionDefinition[];
}

export function openApiFunctionDefinitionSerializer(item: OpenApiFunctionDefinition): any {
  return {
    name: item["name"],
    description: item["description"],
    spec: item["spec"],
    auth: openApiAuthDetailsUnionSerializer(item["auth"]),
    default_params: !item["defaultParams"]
      ? item["defaultParams"]
      : item["defaultParams"].map((p: any) => {
          return p;
        }),
  };
}

export function openApiFunctionDefinitionDeserializer(item: any): OpenApiFunctionDefinition {
  return {
    name: item["name"],
    description: item["description"],
    spec: item["spec"],
    auth: openApiAuthDetailsUnionDeserializer(item["auth"]),
    defaultParams: !item["default_params"]
      ? item["default_params"]
      : item["default_params"].map((p: any) => {
          return p;
        }),
    functions: !item["functions"]
      ? item["functions"]
      : functionDefinitionArrayDeserializer(item["functions"]),
  };
}

/** authentication details for OpenApiFunctionDefinition */
export interface OpenApiAuthDetails {
  /** The type of authentication, must be anonymous/connection/managed_identity */
  /** The discriminator possible values: anonymous, connection, managed_identity */
  type: OpenApiAuthType;
}

export function openApiAuthDetailsSerializer(item: OpenApiAuthDetails): any {
  return { type: item["type"] };
}

export function openApiAuthDetailsDeserializer(item: any): OpenApiAuthDetails {
  return {
    type: item["type"],
  };
}

/** Alias for OpenApiAuthDetailsUnion */
export type OpenApiAuthDetailsUnion =
  | OpenApiAnonymousAuthDetails
  | OpenApiConnectionAuthDetails
  | OpenApiManagedAuthDetails
  | OpenApiAuthDetails;

export function openApiAuthDetailsUnionSerializer(item: OpenApiAuthDetailsUnion): any {
  switch (item.type) {
    case "anonymous":
      return openApiAnonymousAuthDetailsSerializer(item as OpenApiAnonymousAuthDetails);

    case "connection":
      return openApiConnectionAuthDetailsSerializer(item as OpenApiConnectionAuthDetails);

    case "managed_identity":
      return openApiManagedAuthDetailsSerializer(item as OpenApiManagedAuthDetails);

    default:
      return openApiAuthDetailsSerializer(item);
  }
}

export function openApiAuthDetailsUnionDeserializer(item: any): OpenApiAuthDetailsUnion {
  switch (item.type) {
    case "anonymous":
      return openApiAnonymousAuthDetailsDeserializer(item as OpenApiAnonymousAuthDetails);

    case "connection":
      return openApiConnectionAuthDetailsDeserializer(item as OpenApiConnectionAuthDetails);

    case "managed_identity":
      return openApiManagedAuthDetailsDeserializer(item as OpenApiManagedAuthDetails);

    default:
      return openApiAuthDetailsDeserializer(item);
  }
}

/**
 *   Authentication type for OpenApi endpoint. Allowed types are:
 *   - Anonymous (no authentication required)
 *   - Connection (requires connection_id to endpoint, as setup in AI Foundry)
 *   - Managed_Identity (requires audience for identity based auth)
 */
export type OpenApiAuthType = "anonymous" | "connection" | "managed_identity";

/** Security details for OpenApi anonymous authentication */
export interface OpenApiAnonymousAuthDetails extends OpenApiAuthDetails {
  /** The object type, which is always 'anonymous'. */
  type: "anonymous";
}

export function openApiAnonymousAuthDetailsSerializer(item: OpenApiAnonymousAuthDetails): any {
  return { type: item["type"] };
}

export function openApiAnonymousAuthDetailsDeserializer(item: any): OpenApiAnonymousAuthDetails {
  return {
    type: item["type"],
  };
}

/** Security details for OpenApi connection authentication */
export interface OpenApiConnectionAuthDetails extends OpenApiAuthDetails {
  /** The object type, which is always 'connection'. */
  type: "connection";
  /** Connection auth security details */
  securityScheme: OpenApiConnectionSecurityScheme;
}

export function openApiConnectionAuthDetailsSerializer(item: OpenApiConnectionAuthDetails): any {
  return {
    type: item["type"],
    security_scheme: openApiConnectionSecuritySchemeSerializer(item["securityScheme"]),
  };
}

export function openApiConnectionAuthDetailsDeserializer(item: any): OpenApiConnectionAuthDetails {
  return {
    type: item["type"],
    securityScheme: openApiConnectionSecuritySchemeDeserializer(item["security_scheme"]),
  };
}

/** Security scheme for OpenApi managed_identity authentication */
export interface OpenApiConnectionSecurityScheme {
  /** Connection id for Connection auth type */
  connectionId: string;
}

export function openApiConnectionSecuritySchemeSerializer(
  item: OpenApiConnectionSecurityScheme,
): any {
  return { connection_id: item["connectionId"] };
}

export function openApiConnectionSecuritySchemeDeserializer(
  item: any,
): OpenApiConnectionSecurityScheme {
  return {
    connectionId: item["connection_id"],
  };
}

/** Security details for OpenApi managed_identity authentication */
export interface OpenApiManagedAuthDetails extends OpenApiAuthDetails {
  /** The object type, which is always 'managed_identity'. */
  type: "managed_identity";
  /** Connection auth security details */
  securityScheme: OpenApiManagedSecurityScheme;
}

export function openApiManagedAuthDetailsSerializer(item: OpenApiManagedAuthDetails): any {
  return {
    type: item["type"],
    security_scheme: openApiManagedSecuritySchemeSerializer(item["securityScheme"]),
  };
}

export function openApiManagedAuthDetailsDeserializer(item: any): OpenApiManagedAuthDetails {
  return {
    type: item["type"],
    securityScheme: openApiManagedSecuritySchemeDeserializer(item["security_scheme"]),
  };
}

/** Security scheme for OpenApi managed_identity authentication */
export interface OpenApiManagedSecurityScheme {
  /** Authentication scope for managed_identity auth type */
  audience: string;
}

export function openApiManagedSecuritySchemeSerializer(item: OpenApiManagedSecurityScheme): any {
  return { audience: item["audience"] };
}

export function openApiManagedSecuritySchemeDeserializer(item: any): OpenApiManagedSecurityScheme {
  return {
    audience: item["audience"],
  };
}

export function functionDefinitionArraySerializer(result: Array<FunctionDefinition>): any[] {
  return result.map((item) => {
    return functionDefinitionSerializer(item);
  });
}

export function functionDefinitionArrayDeserializer(result: Array<FunctionDefinition>): any[] {
  return result.map((item) => {
    return functionDefinitionDeserializer(item);
  });
}

/** The input definition information for a Bing custom search tool as used to configure an agent. */
export interface BingCustomSearchToolDefinition extends ToolDefinition {
  /** The object type, which is always 'bing_custom_search'. */
  type: "bing_custom_search";
  /** The bing custom search tool parameters. */
  bingCustomSearch: BingCustomSearchToolParameters;
}

export function bingCustomSearchToolDefinitionSerializer(
  item: BingCustomSearchToolDefinition,
): any {
  return {
    type: item["type"],
    bing_custom_search: bingCustomSearchToolParametersSerializer(item["bingCustomSearch"]),
  };
}

export function bingCustomSearchToolDefinitionDeserializer(
  item: any,
): BingCustomSearchToolDefinition {
  return {
    type: item["type"],
    bingCustomSearch: bingCustomSearchToolParametersDeserializer(item["bing_custom_search"]),
  };
}

/** The bing custom search tool parameters. */
export interface BingCustomSearchToolParameters {
  /**
   * The connections attached to this tool. There can be a maximum of 1 connection
   * resource attached to the tool.
   */
  searchConfigurations: BingCustomSearchConfiguration[];
}

export function bingCustomSearchToolParametersSerializer(
  item: BingCustomSearchToolParameters,
): any {
  return {
    search_configurations: bingCustomSearchConfigurationArraySerializer(
      item["searchConfigurations"],
    ),
  };
}

export function bingCustomSearchToolParametersDeserializer(
  item: any,
): BingCustomSearchToolParameters {
  return {
    searchConfigurations: bingCustomSearchConfigurationArrayDeserializer(
      item["search_configurations"],
    ),
  };
}

export function bingCustomSearchConfigurationArraySerializer(
  result: Array<BingCustomSearchConfiguration>,
): any[] {
  return result.map((item) => {
    return bingCustomSearchConfigurationSerializer(item);
  });
}

export function bingCustomSearchConfigurationArrayDeserializer(
  result: Array<BingCustomSearchConfiguration>,
): any[] {
  return result.map((item) => {
    return bingCustomSearchConfigurationDeserializer(item);
  });
}

/** A bing custom search configuration. */
export interface BingCustomSearchConfiguration {
  /** Connection id for grounding with bing search */
  connectionId: string;
  /** Name of the custom configuration instance given to config. */
  instanceName: string;
  /** The market where the results come from. */
  market?: string;
  /** The language to use for user interface strings when calling Bing API. */
  setLang?: string;
  /** The number of search results to return in the bing api response */
  count?: number;
  /** Filter search results by a specific time range. Accepted values: https://learn.microsoft.com/bing/search-apis/bing-web-search/reference/query-parameters */
  freshness?: string;
}

export function bingCustomSearchConfigurationSerializer(item: BingCustomSearchConfiguration): any {
  return {
    connection_id: item["connectionId"],
    instance_name: item["instanceName"],
    market: item["market"],
    set_lang: item["setLang"],
    count: item["count"],
    freshness: item["freshness"],
  };
}

export function bingCustomSearchConfigurationDeserializer(
  item: any,
): BingCustomSearchConfiguration {
  return {
    connectionId: item["connection_id"],
    instanceName: item["instance_name"],
    market: item["market"],
    setLang: item["set_lang"],
    count: item["count"],
    freshness: item["freshness"],
  };
}

/** The input definition information for a connected agent tool which defines a domain specific sub-agent */
export interface ConnectedAgentToolDefinition extends ToolDefinition {
  /** The object type, which is always 'connected_agent'. */
  type: "connected_agent";
  /** The sub-agent to connect */
  connectedAgent: ConnectedAgentDetails;
}

export function connectedAgentToolDefinitionSerializer(item: ConnectedAgentToolDefinition): any {
  return {
    type: item["type"],
    connected_agent: connectedAgentDetailsSerializer(item["connectedAgent"]),
  };
}

export function connectedAgentToolDefinitionDeserializer(item: any): ConnectedAgentToolDefinition {
  return {
    type: item["type"],
    connectedAgent: connectedAgentDetailsDeserializer(item["connected_agent"]),
  };
}

/** Information for connecting one agent to another as a tool */
export interface ConnectedAgentDetails {
  /** The identifier of the child agent. */
  id: string;
  /** The name of the agent to be called. */
  name: string;
  /** A description of what the agent does, used by the model to choose when and how to call the agent. */
  description: string;
}

export function connectedAgentDetailsSerializer(item: ConnectedAgentDetails): any {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
  };
}

export function connectedAgentDetailsDeserializer(item: any): ConnectedAgentDetails {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
  };
}

/** The input definition information for a Deep Research tool as used to configure an agent. */
export interface DeepResearchToolDefinition extends ToolDefinition {
  /** The object type, which is always 'deep_research'. */
  type: "deep_research";
  /** The deep_research tool definition configuration. */
  deepResearch: DeepResearchDetails;
}

export function deepResearchToolDefinitionSerializer(item: DeepResearchToolDefinition): any {
  return {
    type: item["type"],
    deep_research: deepResearchDetailsSerializer(item["deepResearch"]),
  };
}

export function deepResearchToolDefinitionDeserializer(item: any): DeepResearchToolDefinition {
  return {
    type: item["type"],
    deepResearch: deepResearchDetailsDeserializer(item["deep_research"]),
  };
}

/** The details of the Deep Research tool. */
export interface DeepResearchDetails {
  /** The deep research model deployment name. */
  model: string;
  /** The array containing Bing grounding connection IDs to enhance deep research capabilities. */
  bingGroundingConnections: DeepResearchBingGroundingConnection[];
}

export function deepResearchDetailsSerializer(item: DeepResearchDetails): any {
  return {
    deep_research_model: item["model"],
    bing_grounding_connections: deepResearchBingGroundingConnectionArraySerializer(
      item["bingGroundingConnections"],
    ),
  };
}

export function deepResearchDetailsDeserializer(item: any): DeepResearchDetails {
  return {
    model: item["deep_research_model"],
    bingGroundingConnections: deepResearchBingGroundingConnectionArrayDeserializer(
      item["bing_grounding_connections"],
    ),
  };
}

export function deepResearchBingGroundingConnectionArraySerializer(
  result: Array<DeepResearchBingGroundingConnection>,
): any[] {
  return result.map((item) => {
    return deepResearchBingGroundingConnectionSerializer(item);
  });
}

export function deepResearchBingGroundingConnectionArrayDeserializer(
  result: Array<DeepResearchBingGroundingConnection>,
): any[] {
  return result.map((item) => {
    return deepResearchBingGroundingConnectionDeserializer(item);
  });
}

/** The connection resource ID for the Bing grounding resource . */
export interface DeepResearchBingGroundingConnection {
  /** The connection ID for the Bing grounding connection. */
  connectionId: string;
}

export function deepResearchBingGroundingConnectionSerializer(
  item: DeepResearchBingGroundingConnection,
): any {
  return { connection_id: item["connectionId"] };
}

export function deepResearchBingGroundingConnectionDeserializer(
  item: any,
): DeepResearchBingGroundingConnection {
  return {
    connectionId: item["connection_id"],
  };
}

/** The input definition information for a MCP tool which defines a MCP server endpoint */
export interface MCPToolDefinition extends ToolDefinition {
  /** The object type, which is always 'mcp'. */
  type: "mcp";
  /** The label for the MCP server */
  serverLabel: string;
  /** The endpoint for the MCP server */
  serverUrl: string;
  /** List of allowed tools for MCP server */
  allowedTools?: string[];
}

export function mcpToolDefinitionSerializer(item: MCPToolDefinition): any {
  return {
    type: item["type"],
    server_label: item["serverLabel"],
    server_url: item["serverUrl"],
    allowed_tools: !item["allowedTools"]
      ? item["allowedTools"]
      : item["allowedTools"].map((p: any) => {
          return p;
        }),
  };
}

export function mcpToolDefinitionDeserializer(item: any): MCPToolDefinition {
  return {
    type: item["type"],
    serverLabel: item["server_label"],
    serverUrl: item["server_url"],
    allowedTools: !item["allowed_tools"]
      ? item["allowed_tools"]
      : item["allowed_tools"].map((p: any) => {
          return p;
        }),
  };
}

/** The input definition information for a azure function tool as used to configure an agent. */
export interface AzureFunctionToolDefinition extends ToolDefinition {
  /** The object type, which is always 'azure_function'. */
  type: "azure_function";
  /** The definition of the concrete function that the function tool should call. */
  azureFunction: AzureFunctionDefinition;
}

export function azureFunctionToolDefinitionSerializer(item: AzureFunctionToolDefinition): any {
  return {
    type: item["type"],
    azure_function: azureFunctionDefinitionSerializer(item["azureFunction"]),
  };
}

export function azureFunctionToolDefinitionDeserializer(item: any): AzureFunctionToolDefinition {
  return {
    type: item["type"],
    azureFunction: azureFunctionDefinitionDeserializer(item["azure_function"]),
  };
}

/** The definition of Azure function. */
export interface AzureFunctionDefinition {
  /** The definition of azure function and its parameters. */
  function: FunctionDefinition;
  /** Input storage queue. The queue storage trigger runs a function as messages are added to it. */
  inputBinding: AzureFunctionBinding;
  /** Output storage queue. The function writes output to this queue when the input items are processed. */
  outputBinding: AzureFunctionBinding;
}

export function azureFunctionDefinitionSerializer(item: AzureFunctionDefinition): any {
  return {
    function: functionDefinitionSerializer(item["function"]),
    input_binding: azureFunctionBindingSerializer(item["inputBinding"]),
    output_binding: azureFunctionBindingSerializer(item["outputBinding"]),
  };
}

export function azureFunctionDefinitionDeserializer(item: any): AzureFunctionDefinition {
  return {
    function: functionDefinitionDeserializer(item["function"]),
    inputBinding: azureFunctionBindingDeserializer(item["input_binding"]),
    outputBinding: azureFunctionBindingDeserializer(item["output_binding"]),
  };
}

/** The structure for keeping storage queue name and URI. */
export interface AzureFunctionBinding {
  /** The type of binding, which is always 'storage_queue'. */
  type: "storage_queue";
  /** Storage queue. */
  storageQueue: AzureFunctionStorageQueue;
}

export function azureFunctionBindingSerializer(item: AzureFunctionBinding): any {
  return {
    type: item["type"],
    storage_queue: azureFunctionStorageQueueSerializer(item["storageQueue"]),
  };
}

export function azureFunctionBindingDeserializer(item: any): AzureFunctionBinding {
  return {
    type: item["type"],
    storageQueue: azureFunctionStorageQueueDeserializer(item["storage_queue"]),
  };
}

/** The structure for keeping storage queue name and URI. */
export interface AzureFunctionStorageQueue {
  /** URI to the Azure Storage Queue service allowing you to manipulate a queue. */
  storageServiceEndpoint: string;
  /** The name of an Azure function storage queue. */
  queueName: string;
}

export function azureFunctionStorageQueueSerializer(item: AzureFunctionStorageQueue): any {
  return {
    queue_service_endpoint: item["storageServiceEndpoint"],
    queue_name: item["queueName"],
  };
}

export function azureFunctionStorageQueueDeserializer(item: any): AzureFunctionStorageQueue {
  return {
    storageServiceEndpoint: item["queue_service_endpoint"],
    queueName: item["queue_name"],
  };
}

/** The input definition information for a Browser Automation Tool, as used to configure an Agent. */
export interface BrowserAutomationToolDefinition extends ToolDefinition {
  /** The object type, which is always 'browser_automation'. */
  type: "browser_automation";
  /** The Browser Automation Tool parameters. */
  browserAutomation: BrowserAutomationToolParameters;
}

export function browserAutomationToolDefinitionSerializer(
  item: BrowserAutomationToolDefinition,
): any {
  return {
    type: item["type"],
    browser_automation: browserAutomationToolParametersSerializer(item["browserAutomation"]),
  };
}

export function browserAutomationToolDefinitionDeserializer(
  item: any,
): BrowserAutomationToolDefinition {
  return {
    type: item["type"],
    browserAutomation: browserAutomationToolParametersDeserializer(item["browser_automation"]),
  };
}

/** Definition of input parameters for the Browser Automation Tool. */
export interface BrowserAutomationToolParameters {
  /** The connection parameters associated with the Browser Automation Tool. */
  connection: BrowserAutomationToolConnectionParameters;
}

export function browserAutomationToolParametersSerializer(
  item: BrowserAutomationToolParameters,
): any {
  return {
    connection: browserAutomationToolConnectionParametersSerializer(item["connection"]),
  };
}

export function browserAutomationToolParametersDeserializer(
  item: any,
): BrowserAutomationToolParameters {
  return {
    connection: browserAutomationToolConnectionParametersDeserializer(item["connection"]),
  };
}

/** Definition of input parameters for the connection used by the Browser Automation Tool. */
export interface BrowserAutomationToolConnectionParameters {
  /** The ID of the connection to your Azure Playwright resource. */
  id: string;
}

export function browserAutomationToolConnectionParametersSerializer(
  item: BrowserAutomationToolConnectionParameters,
): any {
  return { id: item["id"] };
}

export function browserAutomationToolConnectionParametersDeserializer(
  item: any,
): BrowserAutomationToolConnectionParameters {
  return {
    id: item["id"],
  };
}

/**
 * A set of resources that are used by the agent's tools. The resources are specific to the type of
 * tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search`
 * tool requires a list of vector store IDs.
 */
export interface ToolResources {
  /** Resources to be used by the `code_interpreter` tool consisting of file IDs. */
  codeInterpreter?: CodeInterpreterToolResource;
  /** Resources to be used by the `file_search` tool consisting of vector store IDs. */
  fileSearch?: FileSearchToolResource;
  /** Resources to be used by the `azure_ai_search` tool consisting of index IDs and names. */
  azureAISearch?: AzureAISearchToolResource;
  /** Resources to be used by the `mcp` tool consisting of a server label and headers. */
  mcp?: MCPToolResource[];
}

export function toolResourcesSerializer(item: ToolResources): any {
  return {
    code_interpreter: !item["codeInterpreter"]
      ? item["codeInterpreter"]
      : codeInterpreterToolResourceSerializer(item["codeInterpreter"]),
    file_search: !item["fileSearch"]
      ? item["fileSearch"]
      : fileSearchToolResourceSerializer(item["fileSearch"]),
    azure_ai_search: !item["azureAISearch"]
      ? item["azureAISearch"]
      : azureAISearchToolResourceSerializer(item["azureAISearch"]),
    mcp: !item["mcp"] ? item["mcp"] : mcpToolResourceArraySerializer(item["mcp"]),
  };
}

export function toolResourcesDeserializer(item: any): ToolResources {
  return {
    codeInterpreter: !item["code_interpreter"]
      ? item["code_interpreter"]
      : codeInterpreterToolResourceDeserializer(item["code_interpreter"]),
    fileSearch: !item["file_search"]
      ? item["file_search"]
      : fileSearchToolResourceDeserializer(item["file_search"]),
    azureAISearch: !item["azure_ai_search"]
      ? item["azure_ai_search"]
      : azureAISearchToolResourceDeserializer(item["azure_ai_search"]),
    mcp: !item["mcp"] ? item["mcp"] : mcpToolResourceArrayDeserializer(item["mcp"]),
  };
}

/** A set of resources that are used by the `code_interpreter` tool. */
export interface CodeInterpreterToolResource {
  /**
   * A list of file IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files
   * associated with the tool.
   */
  fileIds?: string[];
  /** The data sources to be used. This option is mutually exclusive with the `fileIds` property. */
  dataSources?: VectorStoreDataSource[];
}

export function codeInterpreterToolResourceSerializer(item: CodeInterpreterToolResource): any {
  return {
    file_ids: !item["fileIds"]
      ? item["fileIds"]
      : item["fileIds"].map((p: any) => {
          return p;
        }),
    data_sources: !item["dataSources"]
      ? item["dataSources"]
      : vectorStoreDataSourceArraySerializer(item["dataSources"]),
  };
}

export function codeInterpreterToolResourceDeserializer(item: any): CodeInterpreterToolResource {
  return {
    fileIds: !item["file_ids"]
      ? item["file_ids"]
      : item["file_ids"].map((p: any) => {
          return p;
        }),
    dataSources: !item["data_sources"]
      ? item["data_sources"]
      : vectorStoreDataSourceArrayDeserializer(item["data_sources"]),
  };
}

export function vectorStoreDataSourceArraySerializer(result: Array<VectorStoreDataSource>): any[] {
  return result.map((item) => {
    return vectorStoreDataSourceSerializer(item);
  });
}

export function vectorStoreDataSourceArrayDeserializer(
  result: Array<VectorStoreDataSource>,
): any[] {
  return result.map((item) => {
    return vectorStoreDataSourceDeserializer(item);
  });
}

/**
 * The structure, containing Azure asset URI path and the asset type of the file used as a data source
 * for the enterprise file search.
 */
export interface VectorStoreDataSource {
  /** Asset URI. */
  assetIdentifier: string;
  /** The asset type */
  assetType: VectorStoreDataSourceAssetType;
}

export function vectorStoreDataSourceSerializer(item: VectorStoreDataSource): any {
  return { uri: item["assetIdentifier"], type: item["assetType"] };
}

export function vectorStoreDataSourceDeserializer(item: any): VectorStoreDataSource {
  return {
    assetIdentifier: item["uri"],
    assetType: item["type"],
  };
}

/**
 * Type of vector storage asset. Asset type may be a uri_asset, in this case it should contain asset URI ID,
 * in the case of id_asset it should contain the data ID.
 */
export enum VectorStoreDataSourceAssetType {
  UriAsset = "uri_asset",
  IdAsset = "id_asset",
}

/** A set of resources that are used by the `file_search` tool. */
export interface FileSearchToolResource {
  /**
   * The ID of the vector store attached to this agent. There can be a maximum of 1 vector
   * store attached to the agent.
   */
  vectorStoreIds?: string[];
  /**
   * The list of vector store configuration objects from Azure.
   * This list is limited to one element.
   * The only element of this list contains the list of azure asset IDs used by the search tool.
   */
  vectorStores?: VectorStoreConfigurations[];
}

export function fileSearchToolResourceSerializer(item: FileSearchToolResource): any {
  return {
    vector_store_ids: !item["vectorStoreIds"]
      ? item["vectorStoreIds"]
      : item["vectorStoreIds"].map((p: any) => {
          return p;
        }),
    vector_stores: !item["vectorStores"]
      ? item["vectorStores"]
      : vectorStoreConfigurationsArraySerializer(item["vectorStores"]),
  };
}

export function fileSearchToolResourceDeserializer(item: any): FileSearchToolResource {
  return {
    vectorStoreIds: !item["vector_store_ids"]
      ? item["vector_store_ids"]
      : item["vector_store_ids"].map((p: any) => {
          return p;
        }),
    vectorStores: !item["vector_stores"]
      ? item["vector_stores"]
      : vectorStoreConfigurationsArrayDeserializer(item["vector_stores"]),
  };
}

export function vectorStoreConfigurationsArraySerializer(
  result: Array<VectorStoreConfigurations>,
): any[] {
  return result.map((item) => {
    return vectorStoreConfigurationsSerializer(item);
  });
}

export function vectorStoreConfigurationsArrayDeserializer(
  result: Array<VectorStoreConfigurations>,
): any[] {
  return result.map((item) => {
    return vectorStoreConfigurationsDeserializer(item);
  });
}

/** The structure, containing the list of vector storage configurations i.e. the list of azure asset IDs. */
export interface VectorStoreConfigurations {
  /** Name */
  storeName: string;
  /** Configurations */
  storeConfiguration: VectorStoreConfiguration;
}

export function vectorStoreConfigurationsSerializer(item: VectorStoreConfigurations): any {
  return {
    name: item["storeName"],
    configuration: vectorStoreConfigurationSerializer(item["storeConfiguration"]),
  };
}

export function vectorStoreConfigurationsDeserializer(item: any): VectorStoreConfigurations {
  return {
    storeName: item["name"],
    storeConfiguration: vectorStoreConfigurationDeserializer(item["configuration"]),
  };
}

/**
 * Vector storage configuration is the list of data sources, used when multiple
 * files can be used for the enterprise file search.
 */
export interface VectorStoreConfiguration {
  /** Data sources */
  dataSources: VectorStoreDataSource[];
}

export function vectorStoreConfigurationSerializer(item: VectorStoreConfiguration): any {
  return {
    data_sources: vectorStoreDataSourceArraySerializer(item["dataSources"]),
  };
}

export function vectorStoreConfigurationDeserializer(item: any): VectorStoreConfiguration {
  return {
    dataSources: vectorStoreDataSourceArrayDeserializer(item["data_sources"]),
  };
}

/** A set of index resources used by the `azure_ai_search` tool. */
export interface AzureAISearchToolResource {
  /**
   * The indices attached to this agent. There can be a maximum of 1 index
   * resource attached to the agent.
   */
  indexList?: AISearchIndexResource[];
}

export function azureAISearchToolResourceSerializer(item: AzureAISearchToolResource): any {
  return {
    indexes: !item["indexList"]
      ? item["indexList"]
      : aiSearchIndexResourceArraySerializer(item["indexList"]),
  };
}

export function azureAISearchToolResourceDeserializer(item: any): AzureAISearchToolResource {
  return {
    indexList: !item["indexes"]
      ? item["indexes"]
      : aiSearchIndexResourceArrayDeserializer(item["indexes"]),
  };
}

export function aiSearchIndexResourceArraySerializer(result: Array<AISearchIndexResource>): any[] {
  return result.map((item) => {
    return aiSearchIndexResourceSerializer(item);
  });
}

export function aiSearchIndexResourceArrayDeserializer(
  result: Array<AISearchIndexResource>,
): any[] {
  return result.map((item) => {
    return aiSearchIndexResourceDeserializer(item);
  });
}

/** A AI Search Index resource. */
export interface AISearchIndexResource {
  /** An index connection id in an IndexResource attached to this agent. */
  indexConnectionId?: string;
  /** The name of an index in an IndexResource attached to this agent. */
  indexName?: string;
  /** Type of query in an AIIndexResource attached to this agent. */
  queryType?: AzureAISearchQueryType;
  /** Number of documents to retrieve from search and present to the model. */
  topK?: number;
  /** filter string for search resource. */
  filter?: string;
  /** Index asset id for search resource. */
  indexAssetId?: string;
}

export function aiSearchIndexResourceSerializer(item: AISearchIndexResource): any {
  return {
    index_connection_id: item["indexConnectionId"],
    index_name: item["indexName"],
    query_type: item["queryType"],
    top_k: item["topK"],
    filter: item["filter"],
    index_asset_id: item["indexAssetId"],
  };
}

export function aiSearchIndexResourceDeserializer(item: any): AISearchIndexResource {
  return {
    indexConnectionId: item["index_connection_id"],
    indexName: item["index_name"],
    queryType: item["query_type"],
    topK: item["top_k"],
    filter: item["filter"],
    indexAssetId: item["index_asset_id"],
  };
}

/** Available query types for Azure AI Search tool. */
export type AzureAISearchQueryType =
  | "simple"
  | "semantic"
  | "vector"
  | "vector_simple_hybrid"
  | "vector_semantic_hybrid";

export function mcpToolResourceArraySerializer(result: Array<MCPToolResource>): any[] {
  return result.map((item) => {
    return mcpToolResourceSerializer(item);
  });
}

export function mcpToolResourceArrayDeserializer(result: Array<MCPToolResource>): any[] {
  return result.map((item) => {
    return mcpToolResourceDeserializer(item);
  });
}

/** A set of resources that are used by the `mcp` tool. */
export interface MCPToolResource {
  /** The label for the MCP server */
  serverLabel: string;
  /** The headers for the MCP server updates */
  headers: Record<string, string>;
  /** Does MCP server require approval */
  requireApproval?: MCPRequiredApproval;
}

export function mcpToolResourceSerializer(item: MCPToolResource): any {
  return {
    server_label: item["serverLabel"],
    headers: item["headers"],
    require_approval: !item["requireApproval"]
      ? item["requireApproval"]
      : mcpRequiredApprovalSerializer(item["requireApproval"]),
  };
}

export function mcpToolResourceDeserializer(item: any): MCPToolResource {
  return {
    serverLabel: item["server_label"],
    headers: item["headers"],
    requireApproval: !item["require_approval"]
      ? item["require_approval"]
      : mcpRequiredApprovalDeserializer(item["require_approval"]),
  };
}

/** Alias for MCPRequiredApproval */
export type MCPRequiredApproval = string | "never" | "always" | MCPApprovalPerTool;

export function mcpRequiredApprovalSerializer(item: MCPRequiredApproval): any {
  return item;
}

export function mcpRequiredApprovalDeserializer(item: any): MCPRequiredApproval {
  return item;
}

/** Customized MCP approval object, listing tools requiring and not requiring approvals */
export interface MCPApprovalPerTool {
  /** The list of tools, not requiring approval. */
  never?: MCPToolList;
  /** The list of tools, always requiring approval. */
  always?: MCPToolList;
}

export function mcpApprovalPerToolSerializer(item: MCPApprovalPerTool): any {
  return {
    never: !item["never"] ? item["never"] : mcpToolListSerializer(item["never"]),
    always: !item["always"] ? item["always"] : mcpToolListSerializer(item["always"]),
  };
}

export function mcpApprovalPerToolDeserializer(item: any): MCPApprovalPerTool {
  return {
    never: !item["never"] ? item["never"] : mcpToolListDeserializer(item["never"]),
    always: !item["always"] ? item["always"] : mcpToolListDeserializer(item["always"]),
  };
}

/** The object, containing list of tools for approvals. */
export interface MCPToolList {
  /** The list of tools for approval. */
  toolNames: string[];
}

export function mcpToolListSerializer(item: MCPToolList): any {
  return {
    tool_names: item["toolNames"].map((p: any) => {
      return p;
    }),
  };
}

export function mcpToolListDeserializer(item: any): MCPToolList {
  return {
    toolNames: item["tool_names"].map((p: any) => {
      return p;
    }),
  };
}

/**
 * An object describing the expected output of the model. If `json_object` only `function` type `tools` are allowed to be passed to the Run.
 * If `text` the model can return text or any value needed.
 */
export interface AgentsResponseFormat {
  /** Must be one of `text` or `json_object`. */
  type?: ResponseFormat;
}

export function agentsResponseFormatSerializer(item: AgentsResponseFormat): any {
  return { type: item["type"] };
}

export function agentsResponseFormatDeserializer(item: any): AgentsResponseFormat {
  return {
    type: item["type"],
  };
}

/** Possible API response formats. */
export type ResponseFormat = "text" | "json_object";

/** The type of response format being defined: `json_schema` */
export interface ResponseFormatJsonSchemaType {
  /** Type */
  type: "json_schema";
  /** The JSON schema, describing response format. */
  jsonSchema: ResponseFormatJsonSchema;
}

export function responseFormatJsonSchemaTypeSerializer(item: ResponseFormatJsonSchemaType): any {
  return {
    type: item["type"],
    json_schema: responseFormatJsonSchemaSerializer(item["jsonSchema"]),
  };
}

export function responseFormatJsonSchemaTypeDeserializer(item: any): ResponseFormatJsonSchemaType {
  return {
    type: item["type"],
    jsonSchema: responseFormatJsonSchemaDeserializer(item["json_schema"]),
  };
}

/** A description of what the response format is for, used by the model to determine how to respond in the format. */
export interface ResponseFormatJsonSchema {
  /** A description of what the response format is for, used by the model to determine how to respond in the format. */
  description?: string;
  /** The name of a schema. */
  name: string;
  /** The JSON schema object, describing the response format. */
  schema: any;
}

export function responseFormatJsonSchemaSerializer(item: ResponseFormatJsonSchema): any {
  return {
    description: item["description"],
    name: item["name"],
    schema: item["schema"],
  };
}

export function responseFormatJsonSchemaDeserializer(item: any): ResponseFormatJsonSchema {
  return {
    description: item["description"],
    name: item["name"],
    schema: item["schema"],
  };
}

export function toolDefinitionUnionArraySerializer(result: Array<ToolDefinitionUnion>): any[] {
  return result.map((item) => {
    return toolDefinitionUnionSerializer(item);
  });
}

export function toolDefinitionUnionArrayDeserializer(result: Array<ToolDefinitionUnion>): any[] {
  return result.map((item) => {
    return toolDefinitionUnionDeserializer(item);
  });
}

/** Alias for AgentsResponseFormatOption */
export type AgentsResponseFormatOption =
  | string
  | AgentsResponseFormatMode
  | AgentsResponseFormat
  | ResponseFormatJsonSchemaType;

export function agentsResponseFormatOptionSerializer(item: AgentsResponseFormatOption): any {
  if (typeof item === "object" && item.type === "json_schema") {
    return responseFormatJsonSchemaTypeSerializer(item);
  }
  return item;
}

export function agentsResponseFormatOptionDeserializer(item: any): AgentsResponseFormatOption {
  if (typeof item === "object" && item.type === "json_schema") {
    return responseFormatJsonSchemaTypeDeserializer(item);
  }
  return item;
}

/** Represents the mode in which the model will handle the return format of a tool call. */
export type AgentsResponseFormatMode = "auto" | "none";

/** Represents an agent that can call the model and use tools. */
export interface Agent {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always assistant. */
  object: "assistant";
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /** The name of the agent. */
  name: string | null;
  /** The description of the agent. */
  description: string | null;
  /** The ID of the model to use. */
  model: string;
  /** The system instructions for the agent to use. */
  instructions: string | null;
  /** The collection of tools enabled for the agent. */
  tools: ToolDefinitionUnion[];
  /**
   * A set of resources that are used by the agent's tools. The resources are specific to the type of tool. For example, the `code_interpreter`
   * tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.
   */
  toolResources: ToolResources | null;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random,
   * while lower values like 0.2 will make it more focused and deterministic.
   */
  temperature: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass.
   * So 0.1 means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   */
  topP: number | null;
  /** The response format of the tool calls used by this agent. */
  responseFormat?: AgentsResponseFormatOption | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata: Record<string, string> | null;
}

export function agentDeserializer(item: any): Agent {
  return {
    id: item["id"],
    object: item["object"],
    createdAt: new Date(item["created_at"] * 1000),
    name: item["name"],
    description: item["description"],
    model: item["model"],
    instructions: item["instructions"],
    tools: toolDefinitionUnionArrayDeserializer(item["tools"]),
    toolResources: !item["tool_resources"]
      ? item["tool_resources"]
      : toolResourcesDeserializer(item["tool_resources"]),
    temperature: item["temperature"],
    topP: item["top_p"],
    responseFormat: !item["response_format"]
      ? item["response_format"]
      : agentsResponseFormatOptionDeserializer(item["response_format"]),
    metadata: item["metadata"],
  };
}

/** Error payload returned by the agents API. */
export interface AgentV1Error {
  /** Represents the error. */
  error: AgentErrorDetail;
}

export function agentV1ErrorDeserializer(item: any): AgentV1Error {
  return {
    error: agentErrorDetailDeserializer(item["error"]),
  };
}

/** Describes the error information returned by the agents API. */
export interface AgentErrorDetail {
  /** Human-readable description of the error. */
  message?: string | null;
  /** Error type identifier (e.g. `invalid_request_error`). */
  type?: string | null;
  /** Name of the parameter that caused the error, if applicable. */
  param?: string | null;
  /** Machine-readable error code. */
  code?: string | null;
}

export function agentErrorDetailDeserializer(item: any): AgentErrorDetail {
  return {
    message: item["message"],
    type: item["type"],
    param: item["param"],
    code: item["code"],
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultAgent {
  /** The requested list of items. */
  data: Agent[];
  /** The last ID represented in this list. */
  lastId?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

export function _agentsPagedResultAgentDeserializer(item: any): _AgentsPagedResultAgent {
  return {
    data: agentArrayDeserializer(item["data"]),
    lastId: item["last_id"],
    hasMore: item["has_more"],
  };
}

export function agentArrayDeserializer(result: Array<Agent>): any[] {
  return result.map((item) => {
    return agentDeserializer(item);
  });
}

/** The status of an agent deletion operation. */
export interface AgentDeletionStatus {
  /** The ID of the resource specified for deletion. */
  id: string;
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
  /** The object type, which is always 'assistant.deleted'. */
  object: "assistant.deleted";
}

export function agentDeletionStatusDeserializer(item: any): AgentDeletionStatus {
  return {
    id: item["id"],
    deleted: item["deleted"],
    object: item["object"],
  };
}

/** The details used to create a new agent thread. */
export interface AgentThreadCreationOptions {
  /** The initial messages to associate with the new thread. */
  messages?: ThreadMessageOptions[];
  /**
   * A set of resources that are made available to the agent's tools in this thread. The resources are specific to the
   * type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires
   * a list of vector store IDs.
   */
  toolResources?: ToolResources | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

export function agentThreadCreationOptionsSerializer(item: AgentThreadCreationOptions): any {
  return {
    messages: !item["messages"]
      ? item["messages"]
      : threadMessageOptionsArraySerializer(item["messages"]),
    tool_resources: !item["toolResources"]
      ? item["toolResources"]
      : toolResourcesSerializer(item["toolResources"]),
    metadata: item["metadata"],
  };
}

export function threadMessageOptionsArraySerializer(result: Array<ThreadMessageOptions>): any[] {
  return result.map((item) => {
    return threadMessageOptionsSerializer(item);
  });
}

/**
 * A single message within an agent thread,
 * as provided during that thread's creation for its initial state.
 */
export interface ThreadMessageOptions {
  /**
   * The role of the entity that is creating the message. Allowed values include:
   * `user`, which indicates the message is sent by an actual user (and should be
   * used in most cases to represent user-generated messages), and `assistant`,
   * which indicates the message is generated by the agent (use this value to insert
   * messages from the agent into the conversation).
   */
  role: MessageRole;
  /**
   * The content of the initial message. This may be a basic string (if you only
   * need text) or an array of typed content blocks (for example, text, image_file,
   * image_url, and so on).
   */
  content: MessageInputContent;
  /** A list of files attached to the message, and the tools they should be added to. */
  attachments?: MessageAttachment[] | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

export function threadMessageOptionsSerializer(item: ThreadMessageOptions): any {
  return {
    role: item["role"],
    content: messageInputContentSerializer(item["content"]),
    attachments: !item["attachments"]
      ? item["attachments"]
      : messageAttachmentArraySerializer(item["attachments"]),
    metadata: item["metadata"],
  };
}

/** The possible values for roles attributed to messages in a thread. */
export type MessageRole = "user" | "assistant";
/** Alias for MessageInputContent */
export type MessageInputContent = string | MessageInputContentBlockUnion[];

export function messageInputContentSerializer(item: MessageInputContent): any {
  if (typeof item === "string") {
    return item;
  }

  return messageInputContentBlockUnionArraySerializer(item);
}

export function messageInputContentBlockUnionArraySerializer(
  result: Array<MessageInputContentBlockUnion>,
): any[] {
  return result.map((item) => {
    return messageInputContentBlockUnionSerializer(item);
  });
}

/** Defines a single content block when creating a message. The 'type' field determines whether it is text, an image file, or an external image URL, etc. */
export interface MessageInputContentBlock {
  /** Specifies which kind of content block this is (text, image_file, image_url, etc.). */
  /** The discriminator possible values: text, image_file, image_url */
  type: MessageBlockType;
}

export function messageInputContentBlockSerializer(item: MessageInputContentBlock): any {
  return { type: item["type"] };
}

/** Alias for MessageInputContentBlockUnion */
export type MessageInputContentBlockUnion =
  | MessageInputTextBlock
  | MessageInputImageFileBlock
  | MessageInputImageUrlBlock
  | MessageInputContentBlock;

export function messageInputContentBlockUnionSerializer(item: MessageInputContentBlockUnion): any {
  switch (item.type) {
    case "text":
      return messageInputTextBlockSerializer(item as MessageInputTextBlock);

    case "image_file":
      return messageInputImageFileBlockSerializer(item as MessageInputImageFileBlock);

    case "image_url":
      return messageInputImageUrlBlockSerializer(item as MessageInputImageUrlBlock);

    default:
      return messageInputContentBlockSerializer(item);
  }
}

/** Specifies the kind of content block within a message. Could be text, an image file, an external image URL, or an unknown future type. */
export type MessageBlockType = "text" | "image_file" | "image_url";

/** A text block in a new message, containing plain text content. */
export interface MessageInputTextBlock extends MessageInputContentBlock {
  /** Must be 'text' for a text block. */
  type: "text";
  /** The plain text content for this block. */
  text: string;
}

export function messageInputTextBlockSerializer(item: MessageInputTextBlock): any {
  return { type: item["type"], text: item["text"] };
}

/** An image-file block in a new message, referencing an internally uploaded image by file ID. */
export interface MessageInputImageFileBlock extends MessageInputContentBlock {
  /** Must be 'image_file' for an internally uploaded image block. */
  type: "image_file";
  /** Information about the referenced image file, including file ID and optional detail level. */
  imageFile: MessageImageFileParam;
}

export function messageInputImageFileBlockSerializer(item: MessageInputImageFileBlock): any {
  return {
    type: item["type"],
    image_file: messageImageFileParamSerializer(item["imageFile"]),
  };
}

/** Defines how an internally uploaded image file is referenced when creating an image-file block. */
export interface MessageImageFileParam {
  /** The ID of the previously uploaded image file. */
  fileId: string;
  /** Optional detail level for the image (auto, low, or high). */
  detail?: ImageDetailLevel;
}

export function messageImageFileParamSerializer(item: MessageImageFileParam): any {
  return { file_id: item["fileId"], detail: item["detail"] };
}

/** Specifies an image's detail level. Can be 'auto', 'low', 'high', or an unknown future value. */
export type ImageDetailLevel = "auto" | "low" | "high";

/** An image-URL block in a new message, referencing an external image by URL. */
export interface MessageInputImageUrlBlock extends MessageInputContentBlock {
  /** Must be 'image_url' for an externally hosted image block. */
  type: "image_url";
  /** Information about the external image URL, including the URL and optional detail level. */
  imageUrl: MessageImageUrlParam;
}

export function messageInputImageUrlBlockSerializer(item: MessageInputImageUrlBlock): any {
  return {
    type: item["type"],
    image_url: messageImageUrlParamSerializer(item["imageUrl"]),
  };
}

/** Defines how an external image URL is referenced when creating an image-URL block. */
export interface MessageImageUrlParam {
  /** The publicly accessible URL of the external image. */
  url: string;
  /** Optional detail level for the image (auto, low, or high). Defaults to 'auto' if not specified. */
  detail?: ImageDetailLevel;
}

export function messageImageUrlParamSerializer(item: MessageImageUrlParam): any {
  return { url: item["url"], detail: item["detail"] };
}

export function messageAttachmentArraySerializer(result: Array<MessageAttachment>): any[] {
  return result.map((item) => {
    return messageAttachmentSerializer(item);
  });
}

export function messageAttachmentArrayDeserializer(result: Array<MessageAttachment>): any[] {
  return result.map((item) => {
    return messageAttachmentDeserializer(item);
  });
}

/** This describes to which tools a file has been attached. */
export interface MessageAttachment {
  /** The ID of the file to attach to the message. */
  fileId?: string;
  /** Azure asset ID. */
  dataSource?: VectorStoreDataSource;
  /** The tools to add to this file. */
  tools: MessageAttachmentToolDefinition[];
}

export function messageAttachmentSerializer(item: MessageAttachment): any {
  return {
    file_id: item["fileId"],
    data_source: !item["dataSource"]
      ? item["dataSource"]
      : vectorStoreDataSourceSerializer(item["dataSource"]),
    tools: messageAttachmentToolDefinitionArraySerializer(item["tools"]),
  };
}

export function messageAttachmentDeserializer(item: any): MessageAttachment {
  return {
    fileId: item["file_id"],
    dataSource: !item["data_source"]
      ? item["data_source"]
      : vectorStoreDataSourceDeserializer(item["data_source"]),
    tools: messageAttachmentToolDefinitionArrayDeserializer(item["tools"]),
  };
}

export function messageAttachmentToolDefinitionArraySerializer(
  result: Array<MessageAttachmentToolDefinition>,
): any[] {
  return result.map((item) => {
    return messageAttachmentToolDefinitionSerializer(item);
  });
}

export function messageAttachmentToolDefinitionArrayDeserializer(
  result: Array<MessageAttachmentToolDefinition>,
): any[] {
  return result.map((item) => {
    return messageAttachmentToolDefinitionDeserializer(item);
  });
}

/** Alias for MessageAttachmentToolDefinition */
export type MessageAttachmentToolDefinition =
  | CodeInterpreterToolDefinition
  | FileSearchToolDefinition;

export function messageAttachmentToolDefinitionSerializer(
  item: MessageAttachmentToolDefinition,
): any {
  return item;
}

export function messageAttachmentToolDefinitionDeserializer(
  item: any,
): MessageAttachmentToolDefinition {
  return item;
}

/**
 * Controls for how a thread will be truncated prior to the run. Use this to control the initial
 * context window of the run.
 */
export interface TruncationObject {
  /**
   * The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will
   * be truncated to the `lastMessages` count most recent messages in the thread. When set to `auto`, messages in the middle of the thread
   * will be dropped to fit the context length of the model, `max_prompt_tokens`.
   */
  type: TruncationStrategy;
  /** The number of most recent messages from the thread when constructing the context for the run. */
  lastMessages?: number | null;
}

export function truncationObjectSerializer(item: TruncationObject): any {
  return { type: item["type"], last_messages: item["lastMessages"] };
}

export function truncationObjectDeserializer(item: any): TruncationObject {
  return {
    type: item["type"],
    lastMessages: item["last_messages"],
  };
}

/** Possible truncation strategies for the thread. */
export type TruncationStrategy = "auto" | "last_messages";

/** Specifies a tool the model should use. Use to force the model to call a specific tool. */
export interface AgentsNamedToolChoice {
  /** the type of tool. If type is `function`, the function name must be set. */
  type: AgentsNamedToolChoiceType;
  /** The name of the function to call */
  function?: FunctionName;
}

export function agentsNamedToolChoiceSerializer(item: AgentsNamedToolChoice): any {
  return {
    type: item["type"],
    function: !item["function"] ? item["function"] : functionNameSerializer(item["function"]),
  };
}

export function agentsNamedToolChoiceDeserializer(item: any): AgentsNamedToolChoice {
  return {
    type: item["type"],
    function: !item["function"] ? item["function"] : functionNameDeserializer(item["function"]),
  };
}

/** Available tool types for agents named tools. */
export type AgentsNamedToolChoiceType =
  | "function"
  | "code_interpreter"
  | "file_search"
  | "bing_grounding"
  | "fabric_dataagent"
  | "sharepoint_grounding"
  | "azure_ai_search"
  | "bing_custom_search"
  | "connected_agent"
  | "deep_research"
  | "mcp";

/** The function name that will be used, if using the `function` tool */
export interface FunctionName {
  /** The name of the function to call */
  name: string;
}

export function functionNameSerializer(item: FunctionName): any {
  return { name: item["name"] };
}

export function functionNameDeserializer(item: any): FunctionName {
  return {
    name: item["name"],
  };
}

/** Alias for AgentsToolChoiceOption */
export type AgentsToolChoiceOption = string | AgentsToolChoiceOptionMode | AgentsNamedToolChoice;

export function agentsToolChoiceOptionSerializer(item: AgentsToolChoiceOption): any {
  return item;
}

export function agentsToolChoiceOptionDeserializer(item: any): AgentsToolChoiceOption {
  return item;
}

/** Specifies how the tool choice will be used */
export type AgentsToolChoiceOptionMode = "none" | "auto";

/** Data representing a single evaluation run of an agent thread. */
export interface ThreadRun {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread.run'. */
  object: "thread.run";
  /** The ID of the thread associated with this run. */
  threadId: string;
  /** The ID of the agent associated with the thread this run was performed against. */
  assistantId: string;
  /** The status of the agent thread run. */
  status: RunStatus;
  /** The details of the action required for the agent thread run to continue. */
  requiredAction?: RequiredActionUnion | null;
  /** The last error, if any, encountered by this agent thread run. */
  lastError: RunError | null;
  /** The ID of the model to use. */
  model: string;
  /** The overridden system instructions used for this agent thread run. */
  instructions: string;
  /** The overridden enabled tools used for this agent thread run. */
  tools: ToolDefinitionUnion[];
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /** The Unix timestamp, in seconds, representing when this item expires. */
  expiresAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this item was started. */
  startedAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this completed. */
  completedAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this was cancelled. */
  cancelledAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this failed. */
  failedAt: Date | null;
  /** Details on why the run is incomplete. Will be `null` if the run is not incomplete. */
  incompleteDetails: IncompleteRunDetails | null;
  /** Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.). */
  usage: RunCompletionUsage | null;
  /** The sampling temperature used for this run. If not set, defaults to 1. */
  temperature?: number | null;
  /** The nucleus sampling value used for this run. If not set, defaults to 1. */
  topP?: number | null;
  /** The maximum number of prompt tokens specified to have been used over the course of the run. */
  maxPromptTokens: number | null;
  /** The maximum number of completion tokens specified to have been used over the course of the run. */
  maxCompletionTokens: number | null;
  /** The strategy to use for dropping messages as the context windows moves forward. */
  truncationStrategy: TruncationObject | null;
  /** Controls whether or not and which tool is called by the model. */
  toolChoice: AgentsToolChoiceOption | null;
  /** The response format of the tool calls used in this run. */
  responseFormat: AgentsResponseFormatOption | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata: Record<string, string> | null;
  /** Override the tools the agent can use for this run. This is useful for modifying the behavior on a per-run basis */
  toolResources?: ToolResources | null;
  /** Determines if tools can be executed in parallel within the run. */
  parallelToolCalls: boolean;
}

export function threadRunDeserializer(item: any): ThreadRun {
  return {
    id: item["id"],
    object: item["object"],
    threadId: item["thread_id"],
    assistantId: item["assistant_id"],
    status: item["status"],
    requiredAction: !item["required_action"]
      ? item["required_action"]
      : requiredActionUnionDeserializer(item["required_action"]),
    lastError: !item["last_error"] ? item["last_error"] : runErrorDeserializer(item["last_error"]),
    model: item["model"],
    instructions: item["instructions"],
    tools: !item["tools"] ? [] : toolDefinitionUnionArrayDeserializer(item["tools"]),
    createdAt: new Date(item["created_at"] * 1000),
    expiresAt: !item["expires_at"] ? item["expires_at"] : new Date(item["expires_at"] * 1000),
    startedAt: !item["started_at"] ? item["started_at"] : new Date(item["started_at"] * 1000),
    completedAt: !item["completed_at"]
      ? item["completed_at"]
      : new Date(item["completed_at"] * 1000),
    cancelledAt: !item["cancelled_at"]
      ? item["cancelled_at"]
      : new Date(item["cancelled_at"] * 1000),
    failedAt: !item["failed_at"] ? item["failed_at"] : new Date(item["failed_at"] * 1000),
    incompleteDetails: !item["incomplete_details"]
      ? item["incomplete_details"]
      : incompleteRunDetailsDeserializer(item["incomplete_details"]),
    usage: !item["usage"] ? item["usage"] : runCompletionUsageDeserializer(item["usage"]),
    temperature: item["temperature"],
    topP: item["top_p"],
    maxPromptTokens: item["max_prompt_tokens"],
    maxCompletionTokens: item["max_completion_tokens"],
    truncationStrategy: !item["truncation_strategy"]
      ? item["truncation_strategy"]
      : truncationObjectDeserializer(item["truncation_strategy"]),
    toolChoice: !item["tool_choice"]
      ? item["tool_choice"]
      : agentsToolChoiceOptionDeserializer(item["tool_choice"]),
    responseFormat: !item["response_format"]
      ? item["response_format"]
      : agentsResponseFormatOptionDeserializer(item["response_format"]),
    metadata: item["metadata"],
    toolResources: !item["tool_resources"]
      ? item["tool_resources"]
      : toolResourcesDeserializer(item["tool_resources"]),
    parallelToolCalls: item["parallel_tool_calls"],
  };
}

/** Possible values for the status of an agent thread run. */
export type RunStatus =
  | "queued"
  | "in_progress"
  | "requires_action"
  | "cancelling"
  | "cancelled"
  | "failed"
  | "completed"
  | "expired";

/** An abstract representation of a required action for an agent thread run to continue. */
export interface RequiredAction {
  /** The object type. */
  /** The discriminator possible values: submit_tool_outputs, submit_tool_approval */
  type: string;
}

export function requiredActionDeserializer(item: any): RequiredAction {
  return {
    type: item["type"],
  };
}

/** Alias for RequiredActionUnion */
export type RequiredActionUnion =
  | SubmitToolOutputsAction
  | SubmitToolApprovalAction
  | RequiredAction;

export function requiredActionUnionDeserializer(item: any): RequiredActionUnion {
  switch (item.type) {
    case "submit_tool_outputs":
      return submitToolOutputsActionDeserializer(item as SubmitToolOutputsAction);

    case "submit_tool_approval":
      return submitToolApprovalActionDeserializer(item as SubmitToolApprovalAction);

    default:
      return requiredActionDeserializer(item);
  }
}

/** The details for required tool calls that must be submitted for an agent thread run to continue. */
export interface SubmitToolOutputsAction extends RequiredAction {
  /** The object type, which is always 'submit_tool_outputs'. */
  type: "submit_tool_outputs";
  /** The details describing tools that should be called to submit tool outputs. */
  submitToolOutputs: SubmitToolOutputsDetails;
}

export function submitToolOutputsActionDeserializer(item: any): SubmitToolOutputsAction {
  return {
    type: item["type"],
    submitToolOutputs: submitToolOutputsDetailsDeserializer(item["submit_tool_outputs"]),
  };
}

/** The details describing tools that should be called to submit tool outputs. */
export interface SubmitToolOutputsDetails {
  /** The list of tool calls that must be resolved for the agent thread run to continue. */
  toolCalls: RequiredToolCallUnion[];
}

export function submitToolOutputsDetailsDeserializer(item: any): SubmitToolOutputsDetails {
  return {
    toolCalls: requiredToolCallUnionArrayDeserializer(item["tool_calls"]),
  };
}

export function requiredToolCallUnionArrayDeserializer(
  result: Array<RequiredToolCallUnion>,
): any[] {
  return result.map((item) => {
    return requiredToolCallUnionDeserializer(item);
  });
}

/** An abstract representation of a tool invocation needed by the model to continue a run. */
export interface RequiredToolCall {
  /** The object type for the required tool call. */
  /** The discriminator possible values: function, mcp */
  type: string;
  /** The ID of the tool call. This ID must be referenced when submitting tool outputs. */
  id: string;
}

export function requiredToolCallDeserializer(item: any): RequiredToolCall {
  return {
    type: item["type"],
    id: item["id"],
  };
}

/** Alias for RequiredToolCallUnion */
export type RequiredToolCallUnion =
  | RequiredFunctionToolCall
  | RequiredMcpToolCall
  | RequiredToolCall;

export function requiredToolCallUnionDeserializer(item: any): RequiredToolCallUnion {
  switch (item.type) {
    case "function":
      return requiredFunctionToolCallDeserializer(item as RequiredFunctionToolCall);

    case "mcp":
      return requiredMcpToolCallDeserializer(item as RequiredMcpToolCall);

    default:
      return requiredToolCallDeserializer(item);
  }
}

/** A representation of a requested call to a function tool, needed by the model to continue evaluation of a run. */
export interface RequiredFunctionToolCall extends RequiredToolCall {
  /** The object type of the required tool call. Always 'function' for function tools. */
  type: "function";
  /** Detailed information about the function to be executed by the tool that includes name and arguments. */
  function: RequiredFunctionToolCallDetails;
}

export function requiredFunctionToolCallDeserializer(item: any): RequiredFunctionToolCall {
  return {
    type: item["type"],
    id: item["id"],
    function: requiredFunctionToolCallDetailsDeserializer(item["function"]),
  };
}

/** The detailed information for a function invocation, as provided by a required action invoking a function tool, that includes the name of and arguments to the function. */
export interface RequiredFunctionToolCallDetails {
  /** The name of the function. */
  name: string;
  /** The arguments to use when invoking the named function, as provided by the model. Arguments are presented as a JSON document that should be validated and parsed for evaluation. */
  arguments: string;
}

export function requiredFunctionToolCallDetailsDeserializer(
  item: any,
): RequiredFunctionToolCallDetails {
  return {
    name: item["name"],
    arguments: item["arguments"],
  };
}

/** A representation of a requested call to a MCP tool, needed by the model to continue evaluation of a run. */
export interface RequiredMcpToolCall extends RequiredToolCall {
  /** The object type of the required tool call. Always 'mcp' for MCP tools. */
  type: "mcp";
  /** The arguments to use when invoking the mcp tool, as provided by the model. Arguments are presented as a JSON document that should be validated and parsed for evaluation. */
  arguments: string;
  /** The name of the function used on the MCP server. */
  name: string;
  /** The label of the MCP server. */
  serverLabel: string;
}

export function requiredMcpToolCallDeserializer(item: any): RequiredMcpToolCall {
  return {
    type: item["type"],
    id: item["id"],
    arguments: item["arguments"],
    name: item["name"],
    serverLabel: item["server_label"],
  };
}

/** The details for required tool call approval that must be submitted for an agent thread run to continue. */
export interface SubmitToolApprovalAction extends RequiredAction {
  /** The object type, which is always 'submit_tool_approval'. */
  type: "submit_tool_approval";
  /** The details describing tools that should be approved to continue run. */
  submitToolApproval: SubmitToolApprovalDetails;
}

export function submitToolApprovalActionDeserializer(item: any): SubmitToolApprovalAction {
  return {
    type: item["type"],
    submitToolApproval: submitToolApprovalDetailsDeserializer(item["submit_tool_approval"]),
  };
}

/** The details describing tools that should be approved. */
export interface SubmitToolApprovalDetails {
  /** The list of tool calls that must be approved for the agent thread run to continue. */
  toolCalls: RequiredToolCallUnion[];
}

export function submitToolApprovalDetailsDeserializer(item: any): SubmitToolApprovalDetails {
  return {
    toolCalls: requiredToolCallUnionArrayDeserializer(item["tool_calls"]),
  };
}

/** The details of an error as encountered by an agent thread run. */
export interface RunError {
  /** The status for the error. */
  code: string;
  /** The human-readable text associated with the error. */
  message: string;
}

export function runErrorDeserializer(item: any): RunError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Details on why the run is incomplete. Will be `null` if the run is not incomplete. */
export interface IncompleteRunDetails {
  /** The reason why the run is incomplete. This indicates which specific token limit was reached during the run. */
  reason: IncompleteDetailsReason;
}

export function incompleteRunDetailsDeserializer(item: any): IncompleteRunDetails {
  return {
    reason: item["reason"],
  };
}

/** The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run. */
export type IncompleteDetailsReason = "max_completion_tokens" | "max_prompt_tokens";

/** Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.). */
export interface RunCompletionUsage {
  /** Number of completion tokens used over the course of the run. */
  completionTokens: number;
  /** Number of prompt tokens used over the course of the run. */
  promptTokens: number;
  /** Total number of tokens used (prompt + completion). */
  totalTokens: number;
}

export function runCompletionUsageDeserializer(item: any): RunCompletionUsage {
  return {
    completionTokens: item["completion_tokens"],
    promptTokens: item["prompt_tokens"],
    totalTokens: item["total_tokens"],
  };
}

/** Information about a single thread associated with an agent. */
export interface AgentThread {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread'. */
  object: "thread";
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /**
   * A set of resources that are made available to the agent's tools in this thread. The resources are specific to the type
   * of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list
   * of vector store IDs.
   */
  toolResources: ToolResources | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata: Record<string, string> | null;
}

export function agentThreadDeserializer(item: any): AgentThread {
  return {
    id: item["id"],
    object: item["object"],
    createdAt: new Date(item["created_at"] * 1000),
    toolResources: !item["tool_resources"]
      ? item["tool_resources"]
      : toolResourcesDeserializer(item["tool_resources"]),
    metadata: item["metadata"],
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultAgentThread {
  /** The requested list of items. */
  data: AgentThread[];
  /** The last ID represented in this list. */
  lastId?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

export function _agentsPagedResultAgentThreadDeserializer(
  item: any,
): _AgentsPagedResultAgentThread {
  return {
    data: agentThreadArrayDeserializer(item["data"]),
    lastId: item["last_id"],
    hasMore: item["has_more"],
  };
}

export function agentThreadArrayDeserializer(result: Array<AgentThread>): any[] {
  return result.map((item) => {
    return agentThreadDeserializer(item);
  });
}

/** The status of a thread deletion operation. */
export interface ThreadDeletionStatus {
  /** The ID of the resource specified for deletion. */
  id: string;
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
  /** The object type, which is always 'thread.deleted'. */
  object: "thread.deleted";
}

export function threadDeletionStatusDeserializer(item: any): ThreadDeletionStatus {
  return {
    id: item["id"],
    deleted: item["deleted"],
    object: item["object"],
  };
}

/** A single, existing message within an agent thread. */
export interface ThreadMessage {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread.message'. */
  object: "thread.message";
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /** The ID of the thread that this message belongs to. */
  threadId: string;
  /** The status of the message. */
  status: MessageStatus;
  /** On an incomplete message, details about why the message is incomplete. */
  incompleteDetails: MessageIncompleteDetails | null;
  /** The Unix timestamp (in seconds) for when the message was completed. */
  completedAt: Date | null;
  /** The Unix timestamp (in seconds) for when the message was marked as incomplete. */
  incompleteAt: Date | null;
  /** The role associated with the agent thread message. */
  role: MessageRole;
  /** The list of content items associated with the agent thread message. */
  content: MessageContentUnion[];
  /** If applicable, the ID of the agent that authored this message. */
  assistantId: string | null;
  /** If applicable, the ID of the run associated with the authoring of this message. */
  runId: string | null;
  /** A list of files attached to the message, and the tools they were added to. */
  attachments: MessageAttachment[] | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata: Record<string, string> | null;
}

export function threadMessageDeserializer(item: any): ThreadMessage {
  return {
    id: item["id"],
    object: item["object"],
    createdAt: new Date(item["created_at"] * 1000),
    threadId: item["thread_id"],
    status: item["status"],
    incompleteDetails: !item["incomplete_details"]
      ? item["incomplete_details"]
      : messageIncompleteDetailsDeserializer(item["incomplete_details"]),
    completedAt: !item["completed_at"]
      ? item["completed_at"]
      : new Date(item["completed_at"] * 1000),
    incompleteAt: !item["incomplete_at"]
      ? item["incomplete_at"]
      : new Date(item["incomplete_at"] * 1000),
    role: item["role"],
    content: messageContentUnionArrayDeserializer(item["content"]),
    assistantId: item["assistant_id"],
    runId: item["run_id"],
    attachments: !item["attachments"]
      ? item["attachments"]
      : messageAttachmentArrayDeserializer(item["attachments"]),
    metadata: item["metadata"],
  };
}

/** The possible execution status values for a thread message. */
export type MessageStatus = "in_progress" | "incomplete" | "completed";

/** Information providing additional detail about a message entering an incomplete status. */
export interface MessageIncompleteDetails {
  /** The provided reason describing why the message was marked as incomplete. */
  reason: MessageIncompleteDetailsReason;
}

export function messageIncompleteDetailsDeserializer(item: any): MessageIncompleteDetails {
  return {
    reason: item["reason"],
  };
}

/** A set of reasons describing why a message is marked as incomplete. */
export type MessageIncompleteDetailsReason =
  | "content_filter"
  | "max_tokens"
  | "run_cancelled"
  | "run_failed"
  | "run_expired";

export function messageContentUnionArrayDeserializer(result: Array<MessageContentUnion>): any[] {
  return result.map((item) => {
    return messageContentUnionDeserializer(item);
  });
}

/** An abstract representation of a single item of thread message content. */
export interface MessageContent {
  /** The object type. */
  /** The discriminator possible values: text, image_file */
  type: string;
}

export function messageContentDeserializer(item: any): MessageContent {
  return {
    type: item["type"],
  };
}

/** Alias for MessageContentUnion */
export type MessageContentUnion = MessageTextContent | MessageImageFileContent | MessageContent;

export function messageContentUnionDeserializer(item: any): MessageContentUnion {
  switch (item.type) {
    case "text":
      return messageTextContentDeserializer(item as MessageTextContent);

    case "image_file":
      return messageImageFileContentDeserializer(item as MessageImageFileContent);

    default:
      return messageContentDeserializer(item);
  }
}

/** A representation of a textual item of thread message content. */
export interface MessageTextContent extends MessageContent {
  /** The object type, which is always 'text'. */
  type: "text";
  /** The text and associated annotations for this thread message content item. */
  text: MessageTextDetails;
}

export function messageTextContentDeserializer(item: any): MessageTextContent {
  return {
    type: item["type"],
    text: messageTextDetailsDeserializer(item["text"]),
  };
}

/** The text and associated annotations for a single item of agent thread message content. */
export interface MessageTextDetails {
  /** The text data. */
  value: string;
  /** A list of annotations associated with this text. */
  annotations: MessageTextAnnotationUnion[];
}

export function messageTextDetailsDeserializer(item: any): MessageTextDetails {
  return {
    value: item["value"],
    annotations: messageTextAnnotationUnionArrayDeserializer(item["annotations"]),
  };
}

export function messageTextAnnotationUnionArrayDeserializer(
  result: Array<MessageTextAnnotationUnion>,
): any[] {
  return result.map((item) => {
    return messageTextAnnotationUnionDeserializer(item);
  });
}

/** An abstract representation of an annotation to text thread message content. */
export interface MessageTextAnnotation {
  /** The object type. */
  /** The discriminator possible values: url_citation, file_citation, file_path */
  type: string;
  /** The textual content associated with this text annotation item. */
  text: string;
}

export function messageTextAnnotationDeserializer(item: any): MessageTextAnnotation {
  return {
    type: item["type"],
    text: item["text"],
  };
}

/** Alias for MessageTextAnnotationUnion */
export type MessageTextAnnotationUnion =
  | MessageTextUrlCitationAnnotation
  | MessageTextFileCitationAnnotation
  | MessageTextFilePathAnnotation
  | MessageTextAnnotation;

export function messageTextAnnotationUnionDeserializer(item: any): MessageTextAnnotationUnion {
  switch (item.type) {
    case "url_citation":
      return messageTextUrlCitationAnnotationDeserializer(item as MessageTextUrlCitationAnnotation);

    case "file_citation":
      return messageTextFileCitationAnnotationDeserializer(
        item as MessageTextFileCitationAnnotation,
      );

    case "file_path":
      return messageTextFilePathAnnotationDeserializer(item as MessageTextFilePathAnnotation);

    default:
      return messageTextAnnotationDeserializer(item);
  }
}

/** A citation within the message that points to a specific URL associated with the message. Generated when the agent uses tools such as 'bing_grounding' to search the Internet. */
export interface MessageTextUrlCitationAnnotation extends MessageTextAnnotation {
  /** The object type, which is always 'url_citation'. */
  type: "url_citation";
  /** The details of the URL citation. */
  urlCitation: MessageTextUrlCitationDetails;
  /** The first text index associated with this text annotation. */
  startIndex?: number;
  /** The last text index associated with this text annotation. */
  endIndex?: number;
}

export function messageTextUrlCitationAnnotationDeserializer(
  item: any,
): MessageTextUrlCitationAnnotation {
  return {
    type: item["type"],
    text: item["text"],
    urlCitation: messageTextUrlCitationDetailsDeserializer(item["url_citation"]),
    startIndex: item["start_index"],
    endIndex: item["end_index"],
  };
}

/** A representation of a URL citation, as used in text thread message content. */
export interface MessageTextUrlCitationDetails {
  /** The URL associated with this citation. */
  url: string;
  /** The title of the URL. */
  title?: string;
}

export function messageTextUrlCitationDetailsDeserializer(
  item: any,
): MessageTextUrlCitationDetails {
  return {
    url: item["url"],
    title: item["title"],
  };
}

/** A citation within the message that points to a specific quote from a specific File associated with the agent or the message. Generated when the agent uses the 'file_search' tool to search files. */
export interface MessageTextFileCitationAnnotation extends MessageTextAnnotation {
  /** The object type, which is always 'file_citation'. */
  type: "file_citation";
  /**
   * A citation within the message that points to a specific quote from a specific file.
   * Generated when the agent uses the "file_search" tool to search files.
   */
  fileCitation: MessageTextFileCitationDetails;
  /** The first text index associated with this text annotation. */
  startIndex?: number;
  /** The last text index associated with this text annotation. */
  endIndex?: number;
}

export function messageTextFileCitationAnnotationDeserializer(
  item: any,
): MessageTextFileCitationAnnotation {
  return {
    type: item["type"],
    text: item["text"],
    fileCitation: messageTextFileCitationDetailsDeserializer(item["file_citation"]),
    startIndex: item["start_index"],
    endIndex: item["end_index"],
  };
}

/** A representation of a file-based text citation, as used in a file-based annotation of text thread message content. */
export interface MessageTextFileCitationDetails {
  /** The ID of the file associated with this citation. */
  fileId: string;
  /** The specific quote cited in the associated file. */
  quote: string;
}

export function messageTextFileCitationDetailsDeserializer(
  item: any,
): MessageTextFileCitationDetails {
  return {
    fileId: item["file_id"],
    quote: item["quote"],
  };
}

/** A citation within the message that points to a file located at a specific path. */
export interface MessageTextFilePathAnnotation extends MessageTextAnnotation {
  /** The object type, which is always 'file_path'. */
  type: "file_path";
  /** A URL for the file that's generated when the agent used the code_interpreter tool to generate a file. */
  filePath: MessageTextFilePathDetails;
  /** The first text index associated with this text annotation. */
  startIndex?: number;
  /** The last text index associated with this text annotation. */
  endIndex?: number;
}

export function messageTextFilePathAnnotationDeserializer(
  item: any,
): MessageTextFilePathAnnotation {
  return {
    type: item["type"],
    text: item["text"],
    filePath: messageTextFilePathDetailsDeserializer(item["file_path"]),
    startIndex: item["start_index"],
    endIndex: item["end_index"],
  };
}

/** An encapsulation of an image file ID, as used by message image content. */
export interface MessageTextFilePathDetails {
  /** The ID of the specific file that the citation is from. */
  fileId: string;
}

export function messageTextFilePathDetailsDeserializer(item: any): MessageTextFilePathDetails {
  return {
    fileId: item["file_id"],
  };
}

/** A representation of image file content in a thread message. */
export interface MessageImageFileContent extends MessageContent {
  /** The object type, which is always 'image_file'. */
  type: "image_file";
  /** The image file for this thread message content item. */
  imageFile: MessageImageFileDetails;
}

export function messageImageFileContentDeserializer(item: any): MessageImageFileContent {
  return {
    type: item["type"],
    imageFile: messageImageFileDetailsDeserializer(item["image_file"]),
  };
}

/** An image reference, as represented in thread message content. */
export interface MessageImageFileDetails {
  /** The ID for the file associated with this image. */
  fileId: string;
}

export function messageImageFileDetailsDeserializer(item: any): MessageImageFileDetails {
  return {
    fileId: item["file_id"],
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultThreadMessage {
  /** The requested list of items. */
  data: ThreadMessage[];
  /** The last ID represented in this list. */
  lastId?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

export function _agentsPagedResultThreadMessageDeserializer(
  item: any,
): _AgentsPagedResultThreadMessage {
  return {
    data: threadMessageArrayDeserializer(item["data"]),
    lastId: item["last_id"],
    hasMore: item["has_more"],
  };
}

export function threadMessageArrayDeserializer(result: Array<ThreadMessage>): any[] {
  return result.map((item) => {
    return threadMessageDeserializer(item);
  });
}

/** The status of a thread message deletion operation. */
export interface MessageDeletionStatus {
  /** The ID of the resource specified for deletion. */
  id: string;
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
  /** The object type, which is always 'thread.message.deleted'. */
  object: "thread.message.deleted";
}

export function messageDeletionStatusDeserializer(item: any): MessageDeletionStatus {
  return {
    id: item["id"],
    deleted: item["deleted"],
    object: item["object"],
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultThreadRun {
  /** The requested list of items. */
  data: ThreadRun[];
  /** The last ID represented in this list. */
  lastId?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

export function _agentsPagedResultThreadRunDeserializer(item: any): _AgentsPagedResultThreadRun {
  return {
    data: threadRunArrayDeserializer(item["data"]),
    lastId: item["last_id"],
    hasMore: item["has_more"],
  };
}

export function threadRunArrayDeserializer(result: Array<ThreadRun>): any[] {
  return result.map((item) => {
    return threadRunDeserializer(item);
  });
}

/** The data provided during a tool outputs submission to resolve pending tool calls and allow the model to continue. */
export interface ToolOutput {
  /** The ID of the tool call being resolved, as provided in the tool calls of a required action from a run. */
  toolCallId?: string;
  /** The output from the tool to be submitted. */
  output?: string;
}

export function toolOutputSerializer(item: ToolOutput): any {
  return { tool_call_id: item["toolCallId"], output: item["output"] };
}

/** The data provided during a tool outputs submission to resolve pending tool calls and allow the model to continue. */
export interface ToolApproval {
  /** The ID of the tool call being resolved, as provided in the tool calls of a required action from a run. */
  toolCallId: string;
  /** The approval boolean value to be submitted. */
  approve: boolean;
  /** Headers to be attached to the approval. */
  headers?: Record<string, string>;
}

export function toolApprovalSerializer(item: ToolApproval): any {
  return {
    tool_call_id: item["toolCallId"],
    approve: item["approve"],
    headers: item["headers"],
  };
}

export function toolOutputArraySerializer(result: Array<ToolOutput>): any[] {
  return result.map((item) => {
    return toolOutputSerializer(item);
  });
}

export function toolApprovalArraySerializer(result: Array<ToolApproval>): any[] {
  return result.map((item) => {
    return toolApprovalSerializer(item);
  });
}

/** Detailed information about a single step of an agent thread run. */
export interface RunStep {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread.run.step'. */
  object: "thread.run.step";
  /** The type of run step, which can be either message_creation or tool_calls. */
  type: RunStepType;
  /** The ID of the agent associated with the run step. */
  assistantId: string;
  /** The ID of the thread that was run. */
  threadId: string;
  /** The ID of the run that this run step is a part of. */
  runId: string;
  /** The status of this run step. */
  status: RunStepStatus;
  /** The details for this run step. */
  stepDetails: RunStepDetailsUnion;
  /** If applicable, information about the last error encountered by this run step. */
  lastError: RunStepError | null;
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /** The Unix timestamp, in seconds, representing when this item expired. */
  expiredAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this completed. */
  completedAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this was cancelled. */
  cancelledAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this failed. */
  failedAt: Date | null;
  /** Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`. */
  usage?: RunStepCompletionUsage | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata: Record<string, string> | null;
}

export function runStepDeserializer(item: any): RunStep {
  return {
    id: item["id"],
    object: item["object"],
    type: item["type"],
    assistantId: item["assistant_id"],
    threadId: item["thread_id"],
    runId: item["run_id"],
    status: item["status"],
    stepDetails: runStepDetailsUnionDeserializer(item["step_details"]),
    lastError: !item["last_error"]
      ? item["last_error"]
      : runStepErrorDeserializer(item["last_error"]),
    createdAt: new Date(item["created_at"] * 1000),
    expiredAt: !item["expired_at"] ? item["expired_at"] : new Date(item["expired_at"] * 1000),
    completedAt: !item["completed_at"]
      ? item["completed_at"]
      : new Date(item["completed_at"] * 1000),
    cancelledAt: !item["cancelled_at"]
      ? item["cancelled_at"]
      : new Date(item["cancelled_at"] * 1000),
    failedAt: !item["failed_at"] ? item["failed_at"] : new Date(item["failed_at"] * 1000),
    usage: !item["usage"] ? item["usage"] : runStepCompletionUsageDeserializer(item["usage"]),
    metadata: item["metadata"],
  };
}

/** The possible types of run steps. */
export type RunStepType = "message_creation" | "tool_calls" | "activities";
/** Possible values for the status of a run step. */
export type RunStepStatus = "in_progress" | "cancelled" | "failed" | "completed" | "expired";

/** An abstract representation of the details for a run step. */
export interface RunStepDetails {
  /** The object type. */
  /** The discriminator possible values: message_creation, tool_calls, activities */
  type: RunStepType;
}

export function runStepDetailsDeserializer(item: any): RunStepDetails {
  return {
    type: item["type"],
  };
}

/** Alias for RunStepDetailsUnion */
export type RunStepDetailsUnion =
  | RunStepMessageCreationDetails
  | RunStepToolCallDetails
  | RunStepActivityDetails
  | RunStepDetails;

export function runStepDetailsUnionDeserializer(item: any): RunStepDetailsUnion {
  switch (item.type) {
    case "message_creation":
      return runStepMessageCreationDetailsDeserializer(item as RunStepMessageCreationDetails);

    case "tool_calls":
      return runStepToolCallDetailsDeserializer(item as RunStepToolCallDetails);

    case "activities":
      return runStepActivityDetailsDeserializer(item as RunStepActivityDetails);

    default:
      return runStepDetailsDeserializer(item);
  }
}

/** The detailed information associated with a message creation run step. */
export interface RunStepMessageCreationDetails extends RunStepDetails {
  /** The object type, which is always 'message_creation'. */
  type: "message_creation";
  /** Information about the message creation associated with this run step. */
  messageCreation: RunStepMessageCreationReference;
}

export function runStepMessageCreationDetailsDeserializer(
  item: any,
): RunStepMessageCreationDetails {
  return {
    type: item["type"],
    messageCreation: runStepMessageCreationReferenceDeserializer(item["message_creation"]),
  };
}

/** The details of a message created as a part of a run step. */
export interface RunStepMessageCreationReference {
  /** The ID of the message created by this run step. */
  messageId: string;
}

export function runStepMessageCreationReferenceDeserializer(
  item: any,
): RunStepMessageCreationReference {
  return {
    messageId: item["message_id"],
  };
}

/** The detailed information associated with a run step calling tools. */
export interface RunStepToolCallDetails extends RunStepDetails {
  /** The object type, which is always 'tool_calls'. */
  type: "tool_calls";
  /** A list of tool call details for this run step. */
  toolCalls: RunStepToolCallUnion[];
}

export function runStepToolCallDetailsDeserializer(item: any): RunStepToolCallDetails {
  return {
    type: item["type"],
    toolCalls: runStepToolCallUnionArrayDeserializer(item["tool_calls"]),
  };
}

export function runStepToolCallUnionArrayDeserializer(result: Array<RunStepToolCallUnion>): any[] {
  return result.map((item) => {
    return runStepToolCallUnionDeserializer(item);
  });
}

/** An abstract representation of a detailed tool call as recorded within a run step for an existing run. */
export interface RunStepToolCall {
  /** The object type. */
  /** The discriminator possible values: code_interpreter, file_search, bing_grounding, azure_ai_search, browser_automation, mcp, sharepoint_grounding, fabric_dataagent, bing_custom_search, azure_function, function, openapi, deep_research, connected_agent */
  type: string;
  /** The ID of the tool call. This ID must be referenced when you submit tool outputs. */
  id: string;
}

export function runStepToolCallDeserializer(item: any): RunStepToolCall {
  return {
    type: item["type"],
    id: item["id"],
  };
}

/** Alias for RunStepToolCallUnion */
export type RunStepToolCallUnion =
  | RunStepCodeInterpreterToolCall
  | RunStepFileSearchToolCall
  | RunStepBingGroundingToolCall
  | RunStepAzureAISearchToolCall
  | RunStepBrowserAutomationToolCall
  | RunStepMcpToolCall
  | RunStepSharepointToolCall
  | RunStepMicrosoftFabricToolCall
  | RunStepBingCustomSearchToolCall
  | RunStepAzureFunctionToolCall
  | RunStepFunctionToolCall
  | RunStepOpenAPIToolCall
  | RunStepDeepResearchToolCall
  | RunStepConnectedAgentToolCall
  | RunStepToolCall;

export function runStepToolCallUnionDeserializer(item: any): RunStepToolCallUnion {
  switch (item.type) {
    case "code_interpreter":
      return runStepCodeInterpreterToolCallDeserializer(item as RunStepCodeInterpreterToolCall);

    case "file_search":
      return runStepFileSearchToolCallDeserializer(item as RunStepFileSearchToolCall);

    case "bing_grounding":
      return runStepBingGroundingToolCallDeserializer(item as RunStepBingGroundingToolCall);

    case "azure_ai_search":
      return runStepAzureAISearchToolCallDeserializer(item as RunStepAzureAISearchToolCall);

    case "browser_automation":
      return runStepBrowserAutomationToolCallDeserializer(item as RunStepBrowserAutomationToolCall);

    case "mcp":
      return runStepMcpToolCallDeserializer(item as RunStepMcpToolCall);

    case "sharepoint_grounding":
      return runStepSharepointToolCallDeserializer(item as RunStepSharepointToolCall);

    case "fabric_dataagent":
      return runStepMicrosoftFabricToolCallDeserializer(item as RunStepMicrosoftFabricToolCall);

    case "bing_custom_search":
      return runStepBingCustomSearchToolCallDeserializer(item as RunStepBingCustomSearchToolCall);

    case "azure_function":
      return runStepAzureFunctionToolCallDeserializer(item as RunStepAzureFunctionToolCall);

    case "function":
      return runStepFunctionToolCallDeserializer(item as RunStepFunctionToolCall);

    case "openapi":
      return runStepOpenAPIToolCallDeserializer(item as RunStepOpenAPIToolCall);

    case "deep_research":
      return runStepDeepResearchToolCallDeserializer(item as RunStepDeepResearchToolCall);

    case "connected_agent":
      return runStepConnectedAgentToolCallDeserializer(item as RunStepConnectedAgentToolCall);

    default:
      return runStepToolCallDeserializer(item);
  }
}

/**
 * A record of a call to a code interpreter tool, issued by the model in evaluation of a defined tool, that
 * represents inputs and outputs consumed and emitted by the code interpreter.
 */
export interface RunStepCodeInterpreterToolCall extends RunStepToolCall {
  /** The object type, which is always 'code_interpreter'. */
  type: "code_interpreter";
  /** The details of the tool call to the code interpreter tool. */
  codeInterpreter: RunStepCodeInterpreterToolCallDetails;
}

export function runStepCodeInterpreterToolCallDeserializer(
  item: any,
): RunStepCodeInterpreterToolCall {
  return {
    type: item["type"],
    id: item["id"],
    codeInterpreter: runStepCodeInterpreterToolCallDetailsDeserializer(item["code_interpreter"]),
  };
}

/** The detailed information about a code interpreter invocation by the model. */
export interface RunStepCodeInterpreterToolCallDetails {
  /** The input provided by the model to the code interpreter tool. */
  input: string;
  /** The outputs produced by the code interpreter tool back to the model in response to the tool call. */
  outputs: RunStepCodeInterpreterToolCallOutputUnion[];
}

export function runStepCodeInterpreterToolCallDetailsDeserializer(
  item: any,
): RunStepCodeInterpreterToolCallDetails {
  return {
    input: item["input"],
    outputs: runStepCodeInterpreterToolCallOutputUnionArrayDeserializer(item["outputs"]),
  };
}

export function runStepCodeInterpreterToolCallOutputUnionArrayDeserializer(
  result: Array<RunStepCodeInterpreterToolCallOutputUnion>,
): any[] {
  return result.map((item) => {
    return runStepCodeInterpreterToolCallOutputUnionDeserializer(item);
  });
}

/** An abstract representation of an emitted output from a code interpreter tool. */
export interface RunStepCodeInterpreterToolCallOutput {
  /** The object type. */
  /** The discriminator possible values: logs, image */
  type: string;
}

export function runStepCodeInterpreterToolCallOutputDeserializer(
  item: any,
): RunStepCodeInterpreterToolCallOutput {
  return {
    type: item["type"],
  };
}

/** Alias for RunStepCodeInterpreterToolCallOutputUnion */
export type RunStepCodeInterpreterToolCallOutputUnion =
  | RunStepCodeInterpreterLogOutput
  | RunStepCodeInterpreterImageOutput
  | RunStepCodeInterpreterToolCallOutput;

export function runStepCodeInterpreterToolCallOutputUnionDeserializer(
  item: any,
): RunStepCodeInterpreterToolCallOutputUnion {
  switch (item.type) {
    case "logs":
      return runStepCodeInterpreterLogOutputDeserializer(item as RunStepCodeInterpreterLogOutput);

    case "image":
      return runStepCodeInterpreterImageOutputDeserializer(
        item as RunStepCodeInterpreterImageOutput,
      );

    default:
      return runStepCodeInterpreterToolCallOutputDeserializer(item);
  }
}

/** A representation of a log output emitted by a code interpreter tool in response to a tool call by the model. */
export interface RunStepCodeInterpreterLogOutput extends RunStepCodeInterpreterToolCallOutput {
  /** The object type, which is always 'logs'. */
  type: "logs";
  /** The serialized log output emitted by the code interpreter. */
  logs: string;
}

export function runStepCodeInterpreterLogOutputDeserializer(
  item: any,
): RunStepCodeInterpreterLogOutput {
  return {
    type: item["type"],
    logs: item["logs"],
  };
}

/** A representation of an image output emitted by a code interpreter tool in response to a tool call by the model. */
export interface RunStepCodeInterpreterImageOutput extends RunStepCodeInterpreterToolCallOutput {
  /** The object type, which is always 'image'. */
  type: "image";
  /** Referential information for the image associated with this output. */
  image: RunStepCodeInterpreterImageReference;
}

export function runStepCodeInterpreterImageOutputDeserializer(
  item: any,
): RunStepCodeInterpreterImageOutput {
  return {
    type: item["type"],
    image: runStepCodeInterpreterImageReferenceDeserializer(item["image"]),
  };
}

/** An image reference emitted by a code interpreter tool in response to a tool call by the model. */
export interface RunStepCodeInterpreterImageReference {
  /** The ID of the file associated with this image. */
  fileId: string;
}

export function runStepCodeInterpreterImageReferenceDeserializer(
  item: any,
): RunStepCodeInterpreterImageReference {
  return {
    fileId: item["file_id"],
  };
}

/**
 * A record of a call to a file search tool, issued by the model in evaluation of a defined tool, that represents
 * executed file search.
 */
export interface RunStepFileSearchToolCall extends RunStepToolCall {
  /** The object type, which is always 'file_search'. */
  type: "file_search";
  /** The ID of the tool call. This ID must be referenced when you submit tool outputs. */
  id: string;
  /** For now, this is always going to be an empty object. */
  fileSearch: RunStepFileSearchToolCallResults;
}

export function runStepFileSearchToolCallDeserializer(item: any): RunStepFileSearchToolCall {
  return {
    type: item["type"],
    id: item["id"],
    fileSearch: runStepFileSearchToolCallResultsDeserializer(item["file_search"]),
  };
}

/** The results of the file search. */
export interface RunStepFileSearchToolCallResults {
  /** Ranking options for file search. */
  rankingOptions?: FileSearchRankingOptions;
  /** The array of a file search results */
  results: RunStepFileSearchToolCallResult[];
}

export function runStepFileSearchToolCallResultsDeserializer(
  item: any,
): RunStepFileSearchToolCallResults {
  return {
    rankingOptions: !item["ranking_options"]
      ? item["ranking_options"]
      : fileSearchRankingOptionsDeserializer(item["ranking_options"]),
    results: runStepFileSearchToolCallResultArrayDeserializer(item["results"]),
  };
}

export function runStepFileSearchToolCallResultArrayDeserializer(
  result: Array<RunStepFileSearchToolCallResult>,
): any[] {
  return result.map((item) => {
    return runStepFileSearchToolCallResultDeserializer(item);
  });
}

/**   File search tool call result. */
export interface RunStepFileSearchToolCallResult {
  /** The ID of the file that result was found in. */
  fileId: string;
  /** The name of the file that result was found in. */
  fileName: string;
  /** The score of the result. All values must be a floating point number between 0 and 1. */
  score: number;
  /** The content of the result that was found. The content is only included if requested via the include query parameter. */
  content?: FileSearchToolCallContent[];
}

export function runStepFileSearchToolCallResultDeserializer(
  item: any,
): RunStepFileSearchToolCallResult {
  return {
    fileId: item["file_id"],
    fileName: item["file_name"],
    score: item["score"],
    content: !item["content"]
      ? item["content"]
      : fileSearchToolCallContentArrayDeserializer(item["content"]),
  };
}

export function fileSearchToolCallContentArrayDeserializer(
  result: Array<FileSearchToolCallContent>,
): any[] {
  return result.map((item) => {
    return fileSearchToolCallContentDeserializer(item);
  });
}

/** The file search result content object. */
export interface FileSearchToolCallContent {
  /** The type of the content. */
  type: "text";
  /** The text content of the file. */
  text: string;
}

export function fileSearchToolCallContentDeserializer(item: any): FileSearchToolCallContent {
  return {
    type: item["type"],
    text: item["text"],
  };
}

/**
 * A record of a call to a bing grounding tool, issued by the model in evaluation of a defined tool, that represents
 * executed search with bing grounding.
 */
export interface RunStepBingGroundingToolCall extends RunStepToolCall {
  /** The object type, which is always 'bing_grounding'. */
  type: "bing_grounding";
  /** The dictionary with request and response from Bing Grounding search tool. */
  bingGrounding: Record<string, string>;
}

export function runStepBingGroundingToolCallDeserializer(item: any): RunStepBingGroundingToolCall {
  return {
    type: item["type"],
    id: item["id"],
    bingGrounding: item["bing_grounding"],
  };
}

/**
 * A record of a call to an Azure AI Search tool, issued by the model in evaluation of a defined tool, that represents
 * executed Azure AI search.
 */
export interface RunStepAzureAISearchToolCall extends RunStepToolCall {
  /** The object type, which is always 'azure_ai_search'. */
  type: "azure_ai_search";
  /** Reserved for future use. */
  azureAISearch: Record<string, string>;
}

export function runStepAzureAISearchToolCallDeserializer(item: any): RunStepAzureAISearchToolCall {
  return {
    type: item["type"],
    id: item["id"],
    azureAISearch: item["azure_ai_search"],
  };
}

/** A record of a call to a Browser Automation tool issued by the Agent. */
export interface RunStepBrowserAutomationToolCall extends RunStepToolCall {
  /** The object type, which is always 'browser_automation'. */
  type: "browser_automation";
  /** Details of the browser automation tool call. */
  browserAutomation: BrowserAutomationToolCallDetails;
}

export function runStepBrowserAutomationToolCallDeserializer(
  item: any,
): RunStepBrowserAutomationToolCall {
  return {
    type: item["type"],
    id: item["id"],
    browserAutomation: browserAutomationToolCallDetailsDeserializer(item["browser_automation"]),
  };
}

/** Details of a Browser Automation tool call. */
export interface BrowserAutomationToolCallDetails {
  /** The input provided to the Browser Automation tool. */
  input: string;
  /** The output returned by the Browser Automation tool. */
  output: string;
  /** The steps the Browser Automation tool executed. */
  steps: BrowserAutomationToolCallStep[];
}

export function browserAutomationToolCallDetailsDeserializer(
  item: any,
): BrowserAutomationToolCallDetails {
  return {
    input: item["input"],
    output: item["output"],
    steps: browserAutomationToolCallStepArrayDeserializer(item["steps"]),
  };
}

export function browserAutomationToolCallStepArrayDeserializer(
  result: Array<BrowserAutomationToolCallStep>,
): any[] {
  return result.map((item) => {
    return browserAutomationToolCallStepDeserializer(item);
  });
}

/** Describes a single step of a Browser Automation tool execution. */
export interface BrowserAutomationToolCallStep {
  /** The result of the last step executed with the Browser. */
  lastStepResult: string;
  /** The current state of execution with the Browser. */
  currentState: string;
  /** The next step to execute with the Browser. */
  nextStep: string;
}

export function browserAutomationToolCallStepDeserializer(
  item: any,
): BrowserAutomationToolCallStep {
  return {
    lastStepResult: item["last_step_result"],
    currentState: item["current_state"],
    nextStep: item["next_step"],
  };
}

/**
 * A record of a call to a MCP tool, issued by the model in evaluation of a defined tool, that represents
 * executed MCP actions.
 */
export interface RunStepMcpToolCall extends RunStepToolCall {
  /** The object type, which is always 'mcp'. */
  type: "mcp";
  /** Arguments to the MCP tool call, as provided by the model. Arguments are presented as a JSON document that should be validated and parsed for evaluation. */
  arguments: string;
  /** Name of the function used on the MCP server. */
  name: string;
  /** Output of the MCP tool call. */
  output: string;
  /** The label for the MCP server */
  serverLabel?: string;
}

export function runStepMcpToolCallDeserializer(item: any): RunStepMcpToolCall {
  return {
    type: item["type"],
    id: item["id"],
    arguments: item["arguments"],
    name: item["name"],
    output: item["output"],
    serverLabel: item["server_label"],
  };
}

/**
 * A record of a call to a SharePoint tool, issued by the model in evaluation of a defined tool, that represents
 * executed SharePoint actions.
 */
export interface RunStepSharepointToolCall extends RunStepToolCall {
  /** The object type, which is always 'sharepoint_grounding'. */
  type: "sharepoint_grounding";
  /** SharePoint tool input and output. */
  sharePoint: Record<string, string>;
}

export function runStepSharepointToolCallDeserializer(item: any): RunStepSharepointToolCall {
  return {
    type: item["type"],
    id: item["id"],
    sharePoint: item["sharepoint_grounding"],
  };
}

/**
 * A record of a call to a Microsoft Fabric tool, issued by the model in evaluation of a defined tool, that represents
 * executed Microsoft Fabric operations.
 */
export interface RunStepMicrosoftFabricToolCall extends RunStepToolCall {
  /** The object type, which is always 'fabric_dataagent'. */
  type: "fabric_dataagent";
  /** Fabric input and output. */
  microsoftFabric: Record<string, string>;
}

export function runStepMicrosoftFabricToolCallDeserializer(
  item: any,
): RunStepMicrosoftFabricToolCall {
  return {
    type: item["type"],
    id: item["id"],
    microsoftFabric: item["fabric_dataagent"],
  };
}

/**
 * A record of a call to a Bing Custom Search tool, issued by the model in evaluation of a defined tool, that represents
 * executed search with Bing Custom Search.
 */
export interface RunStepBingCustomSearchToolCall extends RunStepToolCall {
  /** The object type, which is always 'bing_custom_search'. */
  type: "bing_custom_search";
  /** The dictionary with request and response from Bing Custom Search tool. */
  bingCustomSearch: Record<string, string>;
}

export function runStepBingCustomSearchToolCallDeserializer(
  item: any,
): RunStepBingCustomSearchToolCall {
  return {
    type: item["type"],
    id: item["id"],
    bingCustomSearch: item["bing_custom_search"],
  };
}

/** A record of a call to an Azure Function tool. */
export interface RunStepAzureFunctionToolCall extends RunStepToolCall {
  /** The object type, which is always 'azure_function'. */
  type: "azure_function";
  /** The description of an Azure function call. */
  azureFunction: AzureFunctionToolCallDetails;
}

export function runStepAzureFunctionToolCallDeserializer(item: any): RunStepAzureFunctionToolCall {
  return {
    type: item["type"],
    id: item["id"],
    azureFunction: azureFunctionToolCallDetailsDeserializer(item["azure_function"]),
  };
}

/**
 * The Azure function call description. All the fields are present in the completed run step, however
 * only some fields are present in the RunStepDeltaAzureFunctionToolCall.
 */
export interface AzureFunctionToolCallDetails {
  /** The Azure function name */
  name?: string;
  /** JSON serialized function arguments. */
  arguments?: string;
  /** The function output. */
  output?: string;
}

export function azureFunctionToolCallDetailsDeserializer(item: any): AzureFunctionToolCallDetails {
  return {
    name: item["name"],
    arguments: item["arguments"],
    output: item["output"],
  };
}

/**
 * A record of a call to a function tool, issued by the model in evaluation of a defined tool, that represents the inputs
 * and output consumed and emitted by the specified function.
 */
export interface RunStepFunctionToolCall extends RunStepToolCall {
  /** The object type, which is always 'function'. */
  type: "function";
  /** The detailed information about the function called by the model. */
  function: RunStepFunctionToolCallDetails;
}

export function runStepFunctionToolCallDeserializer(item: any): RunStepFunctionToolCall {
  return {
    type: item["type"],
    id: item["id"],
    function: runStepFunctionToolCallDetailsDeserializer(item["function"]),
  };
}

/** The detailed information about the function called by the model. */
export interface RunStepFunctionToolCallDetails {
  /** The name of the function. */
  name: string;
  /** The arguments that the model requires are provided to the named function. */
  arguments: string;
}

export function runStepFunctionToolCallDetailsDeserializer(
  item: any,
): RunStepFunctionToolCallDetails {
  return {
    name: item["name"],
    arguments: item["arguments"],
  };
}

/**
 * A record of a call to an OpenAPI tool, issued by the model in evaluation of a defined tool, that represents
 * executed OpenAPI operations.
 */
export interface RunStepOpenAPIToolCall extends RunStepToolCall {
  /** The object type, which is always 'openapi'. */
  type: "openapi";
  /** Reserved for future use. */
  openAPI: Record<string, string>;
}

export function runStepOpenAPIToolCallDeserializer(item: any): RunStepOpenAPIToolCall {
  return {
    type: item["type"],
    id: item["id"],
    openAPI: item["openapi"],
  };
}

/**
 * A record of a call to a Deep Research tool, issued by the model in evaluation of a defined tool, that represents
 * executed deep research operations.
 */
export interface RunStepDeepResearchToolCall extends RunStepToolCall {
  /** The object type, which is always 'deep_research'. */
  type: "deep_research";
  /** The detailed information about the automated browser tasks performed by the model. */
  deepResearch: RunStepDeepResearchToolCallDetails;
}

export function runStepDeepResearchToolCallDeserializer(item: any): RunStepDeepResearchToolCall {
  return {
    type: item["type"],
    id: item["id"],
    deepResearch: runStepDeepResearchToolCallDetailsDeserializer(item["deep_research"]),
  };
}

/** The detailed information about the deep research tasks performed by the model. */
export interface RunStepDeepResearchToolCallDetails {
  /** The input provided by the model to the deep research tool. */
  input: string;
  /** The final output for the deep research tool. */
  output?: string;
}

export function runStepDeepResearchToolCallDetailsDeserializer(
  item: any,
): RunStepDeepResearchToolCallDetails {
  return {
    input: item["input"],
    output: item["output"],
  };
}

/** A record of a call to the connected agent. */
export interface RunStepConnectedAgentToolCall extends RunStepToolCall {
  /** The object type, which is always 'connected_agent'. */
  type: "connected_agent";
  /** The connected agent step information. */
  connectedAgent: RunStepConnectedAgent;
}

export function runStepConnectedAgentToolCallDeserializer(
  item: any,
): RunStepConnectedAgentToolCall {
  return {
    type: item["type"],
    id: item["id"],
    connectedAgent: runStepConnectedAgentDeserializer(item["connected_agent"]),
  };
}

/** The detailed information about connected agent tool call. */
export interface RunStepConnectedAgent {
  /** The name of connected agent. */
  name?: string;
  /** The JSON serialized query to the connected agent. */
  arguments?: string;
  /** The tool output. */
  output?: string;
  /** The run ID used by the connected agent. */
  runId?: string;
  /** The thread ID used by the connected agent. */
  threadId?: string;
  /** The ID of a connected agent. */
  agentId?: string;
}

export function runStepConnectedAgentDeserializer(item: any): RunStepConnectedAgent {
  return {
    name: item["name"],
    arguments: item["arguments"],
    output: item["output"],
    runId: item["run_id"],
    threadId: item["thread_id"],
    agentId: item["assistant_id"],
  };
}

/** The detailed information associated with a run step activities. */
export interface RunStepActivityDetails extends RunStepDetails {
  /** The object type, which is always 'activities'. */
  type: "activities";
  /** A list of activities for this run step. */
  activities: RunStepDetailsActivity[];
}

export function runStepActivityDetailsDeserializer(item: any): RunStepActivityDetails {
  return {
    type: item["type"],
    activities: runStepDetailsActivityArrayDeserializer(item["activities"]),
  };
}

export function runStepDetailsActivityArrayDeserializer(
  result: Array<RunStepDetailsActivity>,
): any[] {
  return result.map((item) => {
    return runStepDetailsActivityDeserializer(item);
  });
}

/** Represents the list of activities, associated with the given step. */
export interface RunStepDetailsActivity {
  /** The activity type, which is always 'mcp_list_tools'. */
  type: "mcp_list_tools";
  /** The activity ID. */
  id: string;
  /** Server label. */
  serverLabel: string;
  /** The supported function list. */
  tools: Record<string, ActivityFunctionDefinition>;
}

export function runStepDetailsActivityDeserializer(item: any): RunStepDetailsActivity {
  return {
    type: item["type"],
    id: item["id"],
    serverLabel: item["server_label"],
    tools: activityFunctionDefinitionRecordDeserializer(item["tools"]),
  };
}

export function activityFunctionDefinitionRecordDeserializer(
  item: Record<string, any>,
): Record<string, ActivityFunctionDefinition> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : activityFunctionDefinitionDeserializer(item[key]);
  });
  return result;
}

/** The activity definition information for a function. */
export interface ActivityFunctionDefinition {
  /** A description of what the function does, used by the model to choose when and how to call the function. */
  description?: string;
  /** The parameters the functions accepts, described as a JSON Schema object. */
  parameters: ActivityFunctionParameters;
}

export function activityFunctionDefinitionDeserializer(item: any): ActivityFunctionDefinition {
  return {
    description: item["description"],
    parameters: activityFunctionParametersDeserializer(item["parameters"]),
  };
}

/** The parameters used for activity function definition. */
export interface ActivityFunctionParameters {
  /** The parameter type, it is always object. */
  type: "object";
  /** The dictionary of function arguments. */
  properties: Record<string, FunctionArgument>;
  /** The list of the required parameters. */
  required: string[];
  /** If true the function has additional parameters. */
  additionalProperties?: boolean;
}

export function activityFunctionParametersDeserializer(item: any): ActivityFunctionParameters {
  return {
    type: item["type"],
    properties: functionArgumentRecordDeserializer(item["properties"]),
    required: item["required"].map((p: any) => {
      return p;
    }),
    additionalProperties: item["additionalProperties"],
  };
}

export function functionArgumentRecordDeserializer(
  item: Record<string, any>,
): Record<string, FunctionArgument> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : functionArgumentDeserializer(item[key]);
  });
  return result;
}

/** The function argument and description. */
export interface FunctionArgument {
  /** The type of an argument, for example 'string' or 'number'. */
  type: string;
  /** The argument description. */
  description?: string;
}

export function functionArgumentDeserializer(item: any): FunctionArgument {
  return {
    type: item["type"],
    description: item["description"],
  };
}

/** The error information associated with a failed run step. */
export interface RunStepError {
  /** The error code for this error. */
  code: RunStepErrorCode;
  /** The human-readable text associated with this error. */
  message: string;
}

export function runStepErrorDeserializer(item: any): RunStepError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Possible error code values attributable to a failed run step. */
export type RunStepErrorCode = "server_error" | "rate_limit_exceeded";

/** Usage statistics related to the run step. */
export interface RunStepCompletionUsage {
  /** Number of completion tokens used over the course of the run step. */
  completionTokens: number;
  /** Number of prompt tokens used over the course of the run step. */
  promptTokens: number;
  /** Total number of tokens used (prompt + completion). */
  totalTokens: number;
}

export function runStepCompletionUsageDeserializer(item: any): RunStepCompletionUsage {
  return {
    completionTokens: item["completion_tokens"],
    promptTokens: item["prompt_tokens"],
    totalTokens: item["total_tokens"],
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultRunStep {
  /** The requested list of items. */
  data: RunStep[];
  /** The last ID represented in this list. */
  lastId?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

export function _agentsPagedResultRunStepDeserializer(item: any): _AgentsPagedResultRunStep {
  return {
    data: runStepArrayDeserializer(item["data"]),
    lastId: item["last_id"],
    hasMore: item["has_more"],
  };
}

export function runStepArrayDeserializer(result: Array<RunStep>): any[] {
  return result.map((item) => {
    return runStepDeserializer(item);
  });
}

/** The response data from a file list operation. */
export interface FileListResponse {
  /** The object type, which is always 'list'. */
  object: "list";
  /** The files returned for the request. */
  data: FileInfo[];
}

export function fileListResponseDeserializer(item: any): FileListResponse {
  return {
    object: item["object"],
    data: fileInfoArrayDeserializer(item["data"]),
  };
}

export function fileInfoArrayDeserializer(result: Array<FileInfo>): any[] {
  return result.map((item) => {
    return fileInfoDeserializer(item);
  });
}

/** Represents an agent that can call the model and use tools. */
export interface FileInfo {
  /** The object type, which is always 'file'. */
  object: "file";
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The size of the file, in bytes. */
  bytes: number;
  /** The name of the file. */
  filename: string;
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /** The intended purpose of a file. */
  purpose: FilePurpose;
  /** The state of the file. This field is available in Azure OpenAI only. */
  status?: FileState;
  /** The error message with details in case processing of this file failed. This field is available in Azure OpenAI only. */
  statusDetails?: string;
}

export function fileInfoDeserializer(item: any): FileInfo {
  return {
    object: item["object"],
    id: item["id"],
    bytes: item["bytes"],
    filename: item["filename"],
    createdAt: new Date(item["created_at"] * 1000),
    purpose: item["purpose"],
    status: item["status"],
    statusDetails: item["status_details"],
  };
}

/** The possible values denoting the intended usage of a file. */
export type FilePurpose = "assistants" | "assistants_output" | "vision";
/** The state of the file. */
export type FileState =
  | "uploaded"
  | "pending"
  | "running"
  | "processed"
  | "error"
  | "deleting"
  | "deleted";

/** model interface _UploadFileRequest */
export interface _UploadFileRequest {
  /** The file data, in bytes. */
  file: FileContents | { contents: FileContents; contentType?: string; filename?: string };
  /** The intended purpose of the uploaded file. Use `assistants` for Agents and Message files, `vision` for Agents image file inputs, `batch` for Batch API, and `fine-tune` for Fine-tuning. */
  purpose: FilePurpose;
  /** The name of the file. */
  filename?: string;
}

export function _uploadFileRequestSerializer(item: _UploadFileRequest): any {
  const filePart = createFilePartDescriptor("file", item["file"], "application/octet-stream");
  if (!filePart.filename) {
    filePart.filename = item["filename"];
  }
  return [filePart, { name: "purpose", body: item["purpose"] }];
}

/** A status response from a file deletion operation. */
export interface FileDeletionStatus {
  /** The ID of the resource specified for deletion. */
  id: string;
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
  /** The object type, which is always 'file'. */
  object: "file";
}

export function fileDeletionStatusDeserializer(item: any): FileDeletionStatus {
  return {
    id: item["id"],
    deleted: item["deleted"],
    object: item["object"],
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultVectorStore {
  /** The requested list of items. */
  data: VectorStore[];
  /** The last ID represented in this list. */
  lastId?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

export function _agentsPagedResultVectorStoreDeserializer(
  item: any,
): _AgentsPagedResultVectorStore {
  return {
    data: vectorStoreArrayDeserializer(item["data"]),
    lastId: item["last_id"],
    hasMore: item["has_more"],
  };
}

export function vectorStoreArrayDeserializer(result: Array<VectorStore>): any[] {
  return result.map((item) => {
    return vectorStoreDeserializer(item);
  });
}

/** A vector store is a collection of processed files can be used by the `file_search` tool. */
export interface VectorStore {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always `vector_store` */
  object: "vector_store";
  /** The Unix timestamp (in seconds) for when the vector store was created. */
  createdAt: Date;
  /** The name of the vector store. */
  name: string;
  /** The total number of bytes used by the files in the vector store. */
  usageBytes: number;
  /** Files count grouped by status processed or being processed by this vector store. */
  fileCounts: VectorStoreFileCount;
  /** The status of the vector store, which can be either `expired`, `in_progress`, or `completed`. A status of `completed` indicates that the vector store is ready for use. */
  status: VectorStoreStatus;
  /** Details on when this vector store expires */
  expiresAfter?: VectorStoreExpirationPolicy;
  /** The Unix timestamp (in seconds) for when the vector store will expire. */
  expiresAt?: Date | null;
  /** The Unix timestamp (in seconds) for when the vector store was last active. */
  lastActiveAt: Date | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata: Record<string, string> | null;
}

export function vectorStoreDeserializer(item: any): VectorStore {
  return {
    id: item["id"],
    object: item["object"],
    createdAt: new Date(item["created_at"] * 1000),
    name: item["name"],
    usageBytes: item["usage_bytes"],
    fileCounts: vectorStoreFileCountDeserializer(item["file_counts"]),
    status: item["status"],
    expiresAfter: !item["expires_after"]
      ? item["expires_after"]
      : vectorStoreExpirationPolicyDeserializer(item["expires_after"]),
    expiresAt: !item["expires_at"] ? item["expires_at"] : new Date(item["expires_at"] * 1000),
    lastActiveAt: !item["last_active_at"]
      ? item["last_active_at"]
      : new Date(item["last_active_at"] * 1000),
    metadata: item["metadata"],
  };
}

/** Counts of files processed or being processed by this vector store grouped by status. */
export interface VectorStoreFileCount {
  /** The number of files that are currently being processed. */
  inProgress: number;
  /** The number of files that have been successfully processed. */
  completed: number;
  /** The number of files that have failed to process. */
  failed: number;
  /** The number of files that were cancelled. */
  cancelled: number;
  /** The total number of files. */
  total: number;
}

export function vectorStoreFileCountDeserializer(item: any): VectorStoreFileCount {
  return {
    inProgress: item["in_progress"],
    completed: item["completed"],
    failed: item["failed"],
    cancelled: item["cancelled"],
    total: item["total"],
  };
}

/** Vector store possible status */
export type VectorStoreStatus = "expired" | "in_progress" | "completed";

/** The expiration policy for a vector store. */
export interface VectorStoreExpirationPolicy {
  /** Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`. */
  anchor: VectorStoreExpirationPolicyAnchor;
  /** The anchor timestamp after which the expiration policy applies. */
  days: number;
}

export function vectorStoreExpirationPolicySerializer(item: VectorStoreExpirationPolicy): any {
  return { anchor: item["anchor"], days: item["days"] };
}

export function vectorStoreExpirationPolicyDeserializer(item: any): VectorStoreExpirationPolicy {
  return {
    anchor: item["anchor"],
    days: item["days"],
  };
}

/** Describes the relationship between the days and the expiration of this vector store */
export type VectorStoreExpirationPolicyAnchor = "last_active_at";

/** An abstract representation of a vector store chunking strategy configuration. */
export interface VectorStoreChunkingStrategyRequest {
  /** The object type. */
  /** The discriminator possible values: auto, static */
  type: VectorStoreChunkingStrategyRequestType;
}

export function vectorStoreChunkingStrategyRequestSerializer(
  item: VectorStoreChunkingStrategyRequest,
): any {
  return { type: item["type"] };
}

/** Alias for VectorStoreChunkingStrategyRequestUnion */
export type VectorStoreChunkingStrategyRequestUnion =
  | VectorStoreAutoChunkingStrategyRequest
  | VectorStoreStaticChunkingStrategyRequest
  | VectorStoreChunkingStrategyRequest;

export function vectorStoreChunkingStrategyRequestUnionSerializer(
  item: VectorStoreChunkingStrategyRequestUnion,
): any {
  switch (item.type) {
    case "auto":
      return vectorStoreAutoChunkingStrategyRequestSerializer(
        item as VectorStoreAutoChunkingStrategyRequest,
      );

    case "static":
      return vectorStoreStaticChunkingStrategyRequestSerializer(
        item as VectorStoreStaticChunkingStrategyRequest,
      );

    default:
      return vectorStoreChunkingStrategyRequestSerializer(item);
  }
}

/** Type of chunking strategy */
export type VectorStoreChunkingStrategyRequestType = "auto" | "static";

/** The default strategy. This strategy currently uses a max_chunk_size_tokens of 800 and chunk_overlap_tokens of 400. */
export interface VectorStoreAutoChunkingStrategyRequest extends VectorStoreChunkingStrategyRequest {
  /** The object type, which is always 'auto'. */
  type: "auto";
}

export function vectorStoreAutoChunkingStrategyRequestSerializer(
  item: VectorStoreAutoChunkingStrategyRequest,
): any {
  return { type: item["type"] };
}

/** A statically configured chunking strategy. */
export interface VectorStoreStaticChunkingStrategyRequest extends VectorStoreChunkingStrategyRequest {
  /** The object type, which is always 'static'. */
  type: "static";
  /** The options for the static chunking strategy. */
  static: VectorStoreStaticChunkingStrategyOptions;
}

export function vectorStoreStaticChunkingStrategyRequestSerializer(
  item: VectorStoreStaticChunkingStrategyRequest,
): any {
  return {
    type: item["type"],
    static: vectorStoreStaticChunkingStrategyOptionsSerializer(item["static"]),
  };
}

/** Options to configure a vector store static chunking strategy. */
export interface VectorStoreStaticChunkingStrategyOptions {
  /** The maximum number of tokens in each chunk. The default value is 800. The minimum value is 100 and the maximum value is 4096. */
  maxChunkSizeTokens: number;
  /**
   * The number of tokens that overlap between chunks. The default value is 400.
   * Note that the overlap must not exceed half of max_chunk_size_tokens.
   */
  chunkOverlapTokens: number;
}

export function vectorStoreStaticChunkingStrategyOptionsSerializer(
  item: VectorStoreStaticChunkingStrategyOptions,
): any {
  return {
    max_chunk_size_tokens: item["maxChunkSizeTokens"],
    chunk_overlap_tokens: item["chunkOverlapTokens"],
  };
}

export function vectorStoreStaticChunkingStrategyOptionsDeserializer(
  item: any,
): VectorStoreStaticChunkingStrategyOptions {
  return {
    maxChunkSizeTokens: item["max_chunk_size_tokens"],
    chunkOverlapTokens: item["chunk_overlap_tokens"],
  };
}

/** Response object for deleting a vector store. */
export interface VectorStoreDeletionStatus {
  /** The ID of the resource specified for deletion. */
  id: string;
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
  /** The object type, which is always 'vector_store.deleted'. */
  object: "vector_store.deleted";
}

export function vectorStoreDeletionStatusDeserializer(item: any): VectorStoreDeletionStatus {
  return {
    id: item["id"],
    deleted: item["deleted"],
    object: item["object"],
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultVectorStoreFile {
  /** The requested list of items. */
  data: VectorStoreFile[];
  /** The last ID represented in this list. */
  lastId?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

export function _agentsPagedResultVectorStoreFileDeserializer(
  item: any,
): _AgentsPagedResultVectorStoreFile {
  return {
    data: vectorStoreFileArrayDeserializer(item["data"]),
    lastId: item["last_id"],
    hasMore: item["has_more"],
  };
}

export function vectorStoreFileArrayDeserializer(result: Array<VectorStoreFile>): any[] {
  return result.map((item) => {
    return vectorStoreFileDeserializer(item);
  });
}

/** Description of a file attached to a vector store. */
export interface VectorStoreFile {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always `vector_store.file`. */
  object: "vector_store.file";
  /**
   * The total vector store usage in bytes. Note that this may be different from the original file
   * size.
   */
  usageBytes: number;
  /** The Unix timestamp (in seconds) for when the vector store file was created. */
  createdAt: Date;
  /** The ID of the vector store that the file is attached to. */
  vectorStoreId: string;
  /** The status of the vector store file, which can be either `in_progress`, `completed`, `cancelled`, or `failed`. The status `completed` indicates that the vector store file is ready for use. */
  status: VectorStoreFileStatus;
  /** The last error associated with this vector store file. Will be `null` if there are no errors. */
  lastError: VectorStoreFileError | null;
  /** The strategy used to chunk the file. */
  chunkingStrategy: VectorStoreChunkingStrategyResponseUnion;
}

export function vectorStoreFileDeserializer(item: any): VectorStoreFile {
  return {
    id: item["id"],
    object: item["object"],
    usageBytes: item["usage_bytes"],
    createdAt: new Date(item["created_at"] * 1000),
    vectorStoreId: item["vector_store_id"],
    status: item["status"],
    lastError: !item["last_error"]
      ? item["last_error"]
      : vectorStoreFileErrorDeserializer(item["last_error"]),
    chunkingStrategy: vectorStoreChunkingStrategyResponseUnionDeserializer(
      item["chunking_strategy"],
    ),
  };
}

/** Vector store file status */
export type VectorStoreFileStatus = "in_progress" | "completed" | "failed" | "cancelled";

/** Details on the error that may have occurred while processing a file for this vector store */
export interface VectorStoreFileError {
  /** One of `server_error` or `rate_limit_exceeded`. */
  code: VectorStoreFileErrorCode;
  /** A human-readable description of the error. */
  message: string;
}

export function vectorStoreFileErrorDeserializer(item: any): VectorStoreFileError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Error code variants for vector store file processing */
export type VectorStoreFileErrorCode = "server_error" | "invalid_file" | "unsupported_file";

/** An abstract representation of a vector store chunking strategy configuration. */
export interface VectorStoreChunkingStrategyResponse {
  /** The object type. */
  /** The discriminator possible values: other, static */
  type: VectorStoreChunkingStrategyResponseType;
}

export function vectorStoreChunkingStrategyResponseDeserializer(
  item: any,
): VectorStoreChunkingStrategyResponse {
  return {
    type: item["type"],
  };
}

/** Alias for VectorStoreChunkingStrategyResponseUnion */
export type VectorStoreChunkingStrategyResponseUnion =
  | VectorStoreAutoChunkingStrategyResponse
  | VectorStoreStaticChunkingStrategyResponse
  | VectorStoreChunkingStrategyResponse;

export function vectorStoreChunkingStrategyResponseUnionDeserializer(
  item: any,
): VectorStoreChunkingStrategyResponseUnion {
  // Handle undefined or null input by returning a default response
  if (!item) {
    return vectorStoreChunkingStrategyResponseDeserializer({ type: "other" });
  }

  switch (item.type) {
    case "other":
      return vectorStoreAutoChunkingStrategyResponseDeserializer(
        item as VectorStoreAutoChunkingStrategyResponse,
      );

    case "static":
      return vectorStoreStaticChunkingStrategyResponseDeserializer(
        item as VectorStoreStaticChunkingStrategyResponse,
      );

    default:
      return vectorStoreChunkingStrategyResponseDeserializer(item);
  }
}

/** Type of chunking strategy */
export type VectorStoreChunkingStrategyResponseType = "other" | "static";

/** This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the chunking_strategy concept was introduced in the API. */
export interface VectorStoreAutoChunkingStrategyResponse extends VectorStoreChunkingStrategyResponse {
  /** The object type, which is always 'other'. */
  type: "other";
}

export function vectorStoreAutoChunkingStrategyResponseDeserializer(
  item: any,
): VectorStoreAutoChunkingStrategyResponse {
  return {
    type: item["type"],
  };
}

/** A statically configured chunking strategy. */
export interface VectorStoreStaticChunkingStrategyResponse extends VectorStoreChunkingStrategyResponse {
  /** The object type, which is always 'static'. */
  type: "static";
  /** The options for the static chunking strategy. */
  static: VectorStoreStaticChunkingStrategyOptions;
}

export function vectorStoreStaticChunkingStrategyResponseDeserializer(
  item: any,
): VectorStoreStaticChunkingStrategyResponse {
  return {
    type: item["type"],
    static: vectorStoreStaticChunkingStrategyOptionsDeserializer(item["static"]),
  };
}

/** Response object for deleting a vector store file relationship. */
export interface VectorStoreFileDeletionStatus {
  /** The ID of the resource specified for deletion. */
  id: string;
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
  /** The object type, which is always 'vector_store.deleted'. */
  object: "vector_store.file.deleted";
}

export function vectorStoreFileDeletionStatusDeserializer(
  item: any,
): VectorStoreFileDeletionStatus {
  return {
    id: item["id"],
    deleted: item["deleted"],
    object: item["object"],
  };
}

/** A batch of files attached to a vector store. */
export interface VectorStoreFileBatch {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always `vector_store.file_batch`. */
  object: "vector_store.files_batch";
  /** The Unix timestamp (in seconds) for when the vector store files batch was created. */
  createdAt: Date;
  /** The ID of the vector store that the file is attached to. */
  vectorStoreId: string;
  /** The status of the vector store files batch, which can be either `in_progress`, `completed`, `cancelled` or `failed`. */
  status: VectorStoreFileBatchStatus;
  /** Files count grouped by status processed or being processed by this vector store. */
  fileCounts: VectorStoreFileCount;
}

export function vectorStoreFileBatchDeserializer(item: any): VectorStoreFileBatch {
  return {
    id: item["id"],
    object: item["object"],
    createdAt: new Date(item["created_at"] * 1000),
    vectorStoreId: item["vector_store_id"],
    status: item["status"],
    fileCounts: vectorStoreFileCountDeserializer(item["file_counts"]),
  };
}

/** The status of the vector store file batch. */
export type VectorStoreFileBatchStatus = "in_progress" | "completed" | "cancelled" | "failed";

/** Represents a message delta i.e. any changed fields on a message during streaming. */
export interface MessageDeltaChunk {
  /** The identifier of the message, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always `thread.message.delta`. */
  object: "thread.message.delta";
  /** The delta containing the fields that have changed on the Message. */
  delta: MessageDelta;
}

export function messageDeltaChunkDeserializer(item: any): MessageDeltaChunk {
  return {
    id: item["id"],
    object: item["object"],
    delta: messageDeltaDeserializer(item["delta"]),
  };
}

/** Represents the typed 'delta' payload within a streaming message delta chunk. */
export interface MessageDelta {
  /** The entity that produced the message. */
  role: MessageRole;
  /** The content of the message as an array of text and/or images. */
  content: MessageDeltaContentUnion[];
}

export function messageDeltaDeserializer(item: any): MessageDelta {
  return {
    role: item["role"],
    content: messageDeltaContentUnionArrayDeserializer(item["content"]),
  };
}

export function messageDeltaContentUnionArrayDeserializer(
  result: Array<MessageDeltaContentUnion>,
): any[] {
  return result.map((item) => {
    return messageDeltaContentUnionDeserializer(item);
  });
}

/** The abstract base representation of a partial streamed message content payload. */
export interface MessageDeltaContent {
  /** The index of the content part of the message. */
  index: number;
  /** The type of content for this content part. */
  /** The discriminator possible values: image_file, text */
  type: string;
}

export function messageDeltaContentDeserializer(item: any): MessageDeltaContent {
  return {
    index: item["index"],
    type: item["type"],
  };
}

/** Alias for MessageDeltaContentUnion */
export type MessageDeltaContentUnion =
  | MessageDeltaImageFileContent
  | MessageDeltaTextContent
  | MessageDeltaContent;

export function messageDeltaContentUnionDeserializer(item: any): MessageDeltaContentUnion {
  switch (item.type) {
    case "image_file":
      return messageDeltaImageFileContentDeserializer(item as MessageDeltaImageFileContent);

    case "text":
      return messageDeltaTextContentDeserializer(item as MessageDeltaTextContent);

    default:
      return messageDeltaContentDeserializer(item);
  }
}

/** Represents a streamed image file content part within a streaming message delta chunk. */
export interface MessageDeltaImageFileContent extends MessageDeltaContent {
  /** The type of content for this content part, which is always "image_file." */
  type: "image_file";
  /** The image_file data. */
  imageFile?: MessageDeltaImageFileContentObject;
}

export function messageDeltaImageFileContentDeserializer(item: any): MessageDeltaImageFileContent {
  return {
    index: item["index"],
    type: item["type"],
    imageFile: !item["image_file"]
      ? item["image_file"]
      : messageDeltaImageFileContentObjectDeserializer(item["image_file"]),
  };
}

/** Represents the 'image_file' payload within streaming image file content. */
export interface MessageDeltaImageFileContentObject {
  /** The file ID of the image in the message content. */
  fileId?: string;
}

export function messageDeltaImageFileContentObjectDeserializer(
  item: any,
): MessageDeltaImageFileContentObject {
  return {
    fileId: item["file_id"],
  };
}

/** Represents a streamed text content part within a streaming message delta chunk. */
export interface MessageDeltaTextContent extends MessageDeltaContent {
  /** The type of content for this content part, which is always "text." */
  type: "text";
  /** The text content details. */
  text?: MessageDeltaTextContentObject;
}

export function messageDeltaTextContentDeserializer(item: any): MessageDeltaTextContent {
  return {
    index: item["index"],
    type: item["type"],
    text: !item["text"] ? item["text"] : messageDeltaTextContentObjectDeserializer(item["text"]),
  };
}

/** Represents the data of a streamed text content part within a streaming message delta chunk. */
export interface MessageDeltaTextContentObject {
  /** The data that makes up the text. */
  value?: string;
  /** Annotations for the text. */
  annotations?: MessageDeltaTextAnnotationUnion[];
}

export function messageDeltaTextContentObjectDeserializer(
  item: any,
): MessageDeltaTextContentObject {
  return {
    value: item["value"],
    annotations: !item["annotations"]
      ? item["annotations"]
      : messageDeltaTextAnnotationUnionArrayDeserializer(item["annotations"]),
  };
}

export function messageDeltaTextAnnotationUnionArrayDeserializer(
  result: Array<MessageDeltaTextAnnotationUnion>,
): any[] {
  return result.map((item) => {
    return messageDeltaTextAnnotationUnionDeserializer(item);
  });
}

/** The abstract base representation of a streamed text content part's text annotation. */
export interface MessageDeltaTextAnnotation {
  /** The index of the annotation within a text content part. */
  index: number;
  /** The type of the text content annotation. */
  /** The discriminator possible values: url_citation, file_citation, file_path */
  type: string;
}

export function messageDeltaTextAnnotationDeserializer(item: any): MessageDeltaTextAnnotation {
  return {
    index: item["index"],
    type: item["type"],
  };
}

/** Alias for MessageDeltaTextAnnotationUnion */
export type MessageDeltaTextAnnotationUnion =
  | MessageDeltaTextUrlCitationAnnotation
  | MessageDeltaTextFileCitationAnnotation
  | MessageDeltaTextFilePathAnnotation
  | MessageDeltaTextAnnotation;

export function messageDeltaTextAnnotationUnionDeserializer(
  item: any,
): MessageDeltaTextAnnotationUnion {
  switch (item.type) {
    case "url_citation":
      return messageDeltaTextUrlCitationAnnotationDeserializer(
        item as MessageDeltaTextUrlCitationAnnotation,
      );

    case "file_citation":
      return messageDeltaTextFileCitationAnnotationDeserializer(
        item as MessageDeltaTextFileCitationAnnotation,
      );

    case "file_path":
      return messageDeltaTextFilePathAnnotationDeserializer(
        item as MessageDeltaTextFilePathAnnotation,
      );

    default:
      return messageDeltaTextAnnotationDeserializer(item);
  }
}

/** A citation within the message that points to a specific URL associated with the message. Generated when the agent uses tools such as 'bing_grounding' to search the Internet. */
export interface MessageDeltaTextUrlCitationAnnotation extends MessageDeltaTextAnnotation {
  /** The object type, which is always 'url_citation'. */
  type: "url_citation";
  /** The details of the URL citation. */
  urlCitation: MessageDeltaTextUrlCitationDetails;
  /** The first text index associated with this text annotation. */
  startIndex?: number;
  /** The last text index associated with this text annotation. */
  endIndex?: number;
}

export function messageDeltaTextUrlCitationAnnotationDeserializer(
  item: any,
): MessageDeltaTextUrlCitationAnnotation {
  return {
    index: item["index"],
    type: item["type"],
    urlCitation: messageDeltaTextUrlCitationDetailsDeserializer(item["url_citation"]),
    startIndex: item["start_index"],
    endIndex: item["end_index"],
  };
}

/** A representation of a URL citation, as used in text thread message content. */
export interface MessageDeltaTextUrlCitationDetails {
  /** The URL associated with this citation. */
  url: string;
  /** The title of the URL. */
  title?: string;
}

export function messageDeltaTextUrlCitationDetailsDeserializer(
  item: any,
): MessageDeltaTextUrlCitationDetails {
  return {
    url: item["url"],
    title: item["title"],
  };
}

/** Represents a streamed file citation applied to a streaming text content part. */
export interface MessageDeltaTextFileCitationAnnotation extends MessageDeltaTextAnnotation {
  /** The type of the text content annotation, which is always "file_citation." */
  type: "file_citation";
  /** The file citation information. */
  fileCitation?: MessageDeltaTextFileCitationAnnotationObject;
  /** The text in the message content that needs to be replaced */
  text?: string;
  /** The start index of this annotation in the content text. */
  startIndex?: number;
  /** The end index of this annotation in the content text. */
  endIndex?: number;
}

export function messageDeltaTextFileCitationAnnotationDeserializer(
  item: any,
): MessageDeltaTextFileCitationAnnotation {
  return {
    index: item["index"],
    type: item["type"],
    fileCitation: !item["file_citation"]
      ? item["file_citation"]
      : messageDeltaTextFileCitationAnnotationObjectDeserializer(item["file_citation"]),
    text: item["text"],
    startIndex: item["start_index"],
    endIndex: item["end_index"],
  };
}

/** Represents the data of a streamed file citation as applied to a streaming text content part. */
export interface MessageDeltaTextFileCitationAnnotationObject {
  /** The ID of the specific file the citation is from. */
  fileId?: string;
  /** The specific quote in the cited file. */
  quote?: string;
}

export function messageDeltaTextFileCitationAnnotationObjectDeserializer(
  item: any,
): MessageDeltaTextFileCitationAnnotationObject {
  return {
    fileId: item["file_id"],
    quote: item["quote"],
  };
}

/** Represents a streamed file path annotation applied to a streaming text content part. */
export interface MessageDeltaTextFilePathAnnotation extends MessageDeltaTextAnnotation {
  /** The type of the text content annotation, which is always "file_path." */
  type: "file_path";
  /** The file path information. */
  filePath?: MessageDeltaTextFilePathAnnotationObject;
  /** The start index of this annotation in the content text. */
  startIndex?: number;
  /** The end index of this annotation in the content text. */
  endIndex?: number;
  /** The text in the message content that needs to be replaced */
  text?: string;
}

export function messageDeltaTextFilePathAnnotationDeserializer(
  item: any,
): MessageDeltaTextFilePathAnnotation {
  return {
    index: item["index"],
    type: item["type"],
    filePath: !item["file_path"]
      ? item["file_path"]
      : messageDeltaTextFilePathAnnotationObjectDeserializer(item["file_path"]),
    startIndex: item["start_index"],
    endIndex: item["end_index"],
    text: item["text"],
  };
}

/** Represents the data of a streamed file path annotation as applied to a streaming text content part. */
export interface MessageDeltaTextFilePathAnnotationObject {
  /** The file ID for the annotation. */
  fileId?: string;
}

export function messageDeltaTextFilePathAnnotationObjectDeserializer(
  item: any,
): MessageDeltaTextFilePathAnnotationObject {
  return {
    fileId: item["file_id"],
  };
}

/** Represents a run step delta i.e. any changed fields on a run step during streaming. */
export interface RunStepDeltaChunk {
  /** The identifier of the run step, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always `thread.run.step.delta`. */
  object: "thread.run.step.delta";
  /** The delta containing the fields that have changed on the run step. */
  delta: RunStepDelta;
}

export function runStepDeltaChunkDeserializer(item: any): RunStepDeltaChunk {
  return {
    id: item["id"],
    object: item["object"],
    delta: runStepDeltaDeserializer(item["delta"]),
  };
}

/** Represents the delta payload in a streaming run step delta chunk. */
export interface RunStepDelta {
  /** The details of the run step. */
  stepDetails?: RunStepDeltaDetailUnion;
}

export function runStepDeltaDeserializer(item: any): RunStepDelta {
  return {
    stepDetails: !item["step_details"]
      ? item["step_details"]
      : runStepDeltaDetailUnionDeserializer(item["step_details"]),
  };
}

/** Represents a single run step detail item in a streaming run step's delta payload. */
export interface RunStepDeltaDetail {
  /** The object type for the run step detail object. */
  /** The discriminator possible values: message_creation, tool_calls, mcp, openapi */
  type: string;
}

export function runStepDeltaDetailDeserializer(item: any): RunStepDeltaDetail {
  return {
    type: item["type"],
  };
}

/** Alias for RunStepDeltaDetailUnion */
export type RunStepDeltaDetailUnion =
  | RunStepDeltaMessageCreation
  | RunStepDeltaToolCallObject
  | RunStepDeltaMCPObject
  | RunStepDeltaOpenAPIObject
  | RunStepDeltaDetail;

export function runStepDeltaDetailUnionDeserializer(item: any): RunStepDeltaDetailUnion {
  switch (item.type) {
    case "message_creation":
      return runStepDeltaMessageCreationDeserializer(item as RunStepDeltaMessageCreation);

    case "tool_calls":
      return runStepDeltaToolCallObjectDeserializer(item as RunStepDeltaToolCallObject);

    case "mcp":
      return runStepDeltaMCPObjectDeserializer(item as RunStepDeltaMCPObject);

    case "openapi":
      return runStepDeltaOpenAPIObjectDeserializer(item as RunStepDeltaOpenAPIObject);

    default:
      return runStepDeltaDetailDeserializer(item);
  }
}

/** Represents a message creation within a streaming run step delta. */
export interface RunStepDeltaMessageCreation extends RunStepDeltaDetail {
  /** The object type, which is always "message_creation." */
  type: "message_creation";
  /** The message creation data. */
  messageCreation?: RunStepDeltaMessageCreationObject;
}

export function runStepDeltaMessageCreationDeserializer(item: any): RunStepDeltaMessageCreation {
  return {
    type: item["type"],
    messageCreation: !item["message_creation"]
      ? item["message_creation"]
      : runStepDeltaMessageCreationObjectDeserializer(item["message_creation"]),
  };
}

/** Represents the data within a streaming run step message creation response object. */
export interface RunStepDeltaMessageCreationObject {
  /** The ID of the newly-created message. */
  messageId?: string;
}

export function runStepDeltaMessageCreationObjectDeserializer(
  item: any,
): RunStepDeltaMessageCreationObject {
  return {
    messageId: item["message_id"],
  };
}

/** Represents an invocation of tool calls as part of a streaming run step. */
export interface RunStepDeltaToolCallObject extends RunStepDeltaDetail {
  /** The object type, which is always "tool_calls." */
  type: "tool_calls";
  /** The collection of tool calls for the tool call detail item. */
  toolCalls?: RunStepDeltaToolCallUnion[];
}

export function runStepDeltaToolCallObjectDeserializer(item: any): RunStepDeltaToolCallObject {
  return {
    type: item["type"],
    toolCalls: !item["tool_calls"]
      ? item["tool_calls"]
      : runStepDeltaToolCallUnionArrayDeserializer(item["tool_calls"]),
  };
}

export function runStepDeltaToolCallUnionArrayDeserializer(
  result: Array<RunStepDeltaToolCallUnion>,
): any[] {
  return result.map((item) => {
    return runStepDeltaToolCallUnionDeserializer(item);
  });
}

/** The abstract base representation of a single tool call within a streaming run step's delta tool call details. */
export interface RunStepDeltaToolCall {
  /** The index of the tool call detail in the run step's tool_calls array. */
  index: number;
  /** The ID of the tool call, used when submitting outputs to the run. */
  id: string;
  /** The type of the tool call detail item in a streaming run step's details. */
  /** The discriminator possible values: mcp, openapi, connected_agent, function, file_search, code_interpreter, bing_grounding, bing_custom_search, azure_function, deep_research, azure_ai_search, fabric_dataagent, sharepoint_grounding */
  type: string;
}

export function runStepDeltaToolCallDeserializer(item: any): RunStepDeltaToolCall {
  return {
    index: item["index"],
    id: item["id"],
    type: item["type"],
  };
}

/** Alias for RunStepDeltaToolCallUnion */
export type RunStepDeltaToolCallUnion =
  | RunStepDeltaMcpToolCall
  | RunStepDeltaOpenAPIToolCall
  | RunStepDeltaConnectedAgentToolCall
  | RunStepDeltaFunctionToolCall
  | RunStepDeltaFileSearchToolCall
  | RunStepDeltaCodeInterpreterToolCall
  | RunStepDeltaBingGroundingToolCall
  | RunStepDeltaCustomBingGroundingToolCall
  | RunStepDeltaAzureFunctionToolCall
  | RunStepDeltaDeepResearchToolCall
  | RunStepDeltaAzureAISearchToolCall
  | RunStepDeltaMicrosoftFabricToolCall
  | RunStepDeltaSharepointToolCall
  | RunStepDeltaToolCall;

export function runStepDeltaToolCallUnionDeserializer(item: any): RunStepDeltaToolCallUnion {
  switch (item.type) {
    case "mcp":
      return runStepDeltaMcpToolCallDeserializer(item as RunStepDeltaMcpToolCall);

    case "openapi":
      return runStepDeltaOpenAPIToolCallDeserializer(item as RunStepDeltaOpenAPIToolCall);

    case "connected_agent":
      return runStepDeltaConnectedAgentToolCallDeserializer(
        item as RunStepDeltaConnectedAgentToolCall,
      );

    case "function":
      return runStepDeltaFunctionToolCallDeserializer(item as RunStepDeltaFunctionToolCall);

    case "file_search":
      return runStepDeltaFileSearchToolCallDeserializer(item as RunStepDeltaFileSearchToolCall);

    case "code_interpreter":
      return runStepDeltaCodeInterpreterToolCallDeserializer(
        item as RunStepDeltaCodeInterpreterToolCall,
      );

    case "bing_grounding":
      return runStepDeltaBingGroundingToolCallDeserializer(
        item as RunStepDeltaBingGroundingToolCall,
      );

    case "bing_custom_search":
      return runStepDeltaCustomBingGroundingToolCallDeserializer(
        item as RunStepDeltaCustomBingGroundingToolCall,
      );

    case "azure_function":
      return runStepDeltaAzureFunctionToolCallDeserializer(
        item as RunStepDeltaAzureFunctionToolCall,
      );

    case "deep_research":
      return runStepDeltaDeepResearchToolCallDeserializer(item as RunStepDeltaDeepResearchToolCall);

    case "azure_ai_search":
      return runStepDeltaAzureAISearchToolCallDeserializer(
        item as RunStepDeltaAzureAISearchToolCall,
      );

    case "fabric_dataagent":
      return runStepDeltaMicrosoftFabricToolCallDeserializer(
        item as RunStepDeltaMicrosoftFabricToolCall,
      );

    case "sharepoint_grounding":
      return runStepDeltaSharepointToolCallDeserializer(item as RunStepDeltaSharepointToolCall);

    default:
      return runStepDeltaToolCallDeserializer(item);
  }
}

/** Represents the function data in a streaming run step MCP call. */
export interface RunStepDeltaMcpToolCall extends RunStepDeltaToolCall {
  /** The object type, which is always "mcp". */
  type: "mcp";
  /** The index of a response. */
  index: number;
  /** The arguments for MCP call. */
  arguments: string;
}

export function runStepDeltaMcpToolCallDeserializer(item: any): RunStepDeltaMcpToolCall {
  return {
    index: item["index"],
    id: item["id"],
    type: item["type"],
    arguments: item["arguments"],
  };
}

/** Represents the openapi tool call in a streaming run step. */
export interface RunStepDeltaOpenAPIToolCall extends RunStepDeltaToolCall {
  /** The object type, which is always "openapi". */
  type: "openapi";
  /** Reserved for future use. */
  openAPI: Record<string, string>;
}

export function runStepDeltaOpenAPIToolCallDeserializer(item: any): RunStepDeltaOpenAPIToolCall {
  return {
    index: item["index"],
    id: item["id"],
    type: item["type"],
    openAPI: item["openapi"],
  };
}

/** Represents the invocation of connected agent as a part of a streaming run step. */
export interface RunStepDeltaConnectedAgentToolCall extends RunStepDeltaToolCall {
  /** The object type, which is always "connected_agent". */
  type: "connected_agent";
  /** The collection of tool calls for the tool call detail item. */
  connectedAgent: RunStepConnectedAgent;
}

export function runStepDeltaConnectedAgentToolCallDeserializer(
  item: any,
): RunStepDeltaConnectedAgentToolCall {
  return {
    index: item["index"],
    id: item["id"],
    type: item["type"],
    connectedAgent: runStepConnectedAgentDeserializer(item["connected_agent"]),
  };
}

/** Represents a function tool call within a streaming run step's tool call details. */
export interface RunStepDeltaFunctionToolCall extends RunStepDeltaToolCall {
  /** The object type, which is always "function." */
  type: "function";
  /** The function data for the tool call. */
  function?: RunStepDeltaFunction;
}

export function runStepDeltaFunctionToolCallDeserializer(item: any): RunStepDeltaFunctionToolCall {
  return {
    index: item["index"],
    id: item["id"],
    type: item["type"],
    function: !item["function"]
      ? item["function"]
      : runStepDeltaFunctionDeserializer(item["function"]),
  };
}

/** Represents the function data in a streaming run step delta's function tool call. */
export interface RunStepDeltaFunction {
  /** The name of the function. */
  name?: string;
  /** The arguments passed to the function as input. */
  arguments?: string;
  /** The output of the function, null if outputs have not yet been submitted. */
  output?: string | null;
}

export function runStepDeltaFunctionDeserializer(item: any): RunStepDeltaFunction {
  return {
    name: item["name"],
    arguments: item["arguments"],
    output: item["output"],
  };
}

/** Represents a file search tool call within a streaming run step's tool call details. */
export interface RunStepDeltaFileSearchToolCall extends RunStepDeltaToolCall {
  /** The object type, which is always "file_search." */
  type: "file_search";
  /** Reserved for future use. */
  fileSearch?: RunStepFileSearchToolCallResults;
}

export function runStepDeltaFileSearchToolCallDeserializer(
  item: any,
): RunStepDeltaFileSearchToolCall {
  return {
    index: item["index"],
    id: item["id"],
    type: item["type"],
    fileSearch: !item["file_search"]
      ? item["file_search"]
      : runStepFileSearchToolCallResultsDeserializer(item["file_search"]),
  };
}

/** Represents a Code Interpreter tool call within a streaming run step's tool call details. */
export interface RunStepDeltaCodeInterpreterToolCall extends RunStepDeltaToolCall {
  /** The object type, which is always "code_interpreter." */
  type: "code_interpreter";
  /** The Code Interpreter data for the tool call. */
  codeInterpreter?: RunStepDeltaCodeInterpreterDetailItemObject;
}

export function runStepDeltaCodeInterpreterToolCallDeserializer(
  item: any,
): RunStepDeltaCodeInterpreterToolCall {
  return {
    index: item["index"],
    id: item["id"],
    type: item["type"],
    codeInterpreter: !item["code_interpreter"]
      ? item["code_interpreter"]
      : runStepDeltaCodeInterpreterDetailItemObjectDeserializer(item["code_interpreter"]),
  };
}

/** Represents the Code Interpreter tool call data in a streaming run step's tool calls. */
export interface RunStepDeltaCodeInterpreterDetailItemObject {
  /** The input into the Code Interpreter tool call. */
  input?: string;
  /**
   * The outputs from the Code Interpreter tool call. Code Interpreter can output one or more
   * items, including text (`logs`) or images (`image`). Each of these are represented by a
   * different object type.
   */
  outputs?: RunStepDeltaCodeInterpreterOutputUnion[];
}

export function runStepDeltaCodeInterpreterDetailItemObjectDeserializer(
  item: any,
): RunStepDeltaCodeInterpreterDetailItemObject {
  return {
    input: item["input"],
    outputs: !item["outputs"]
      ? item["outputs"]
      : runStepDeltaCodeInterpreterOutputUnionArrayDeserializer(item["outputs"]),
  };
}

export function runStepDeltaCodeInterpreterOutputUnionArrayDeserializer(
  result: Array<RunStepDeltaCodeInterpreterOutputUnion>,
): any[] {
  return result.map((item) => {
    return runStepDeltaCodeInterpreterOutputUnionDeserializer(item);
  });
}

/** The abstract base representation of a streaming run step tool call's Code Interpreter tool output. */
export interface RunStepDeltaCodeInterpreterOutput {
  /** The index of the output in the streaming run step tool call's Code Interpreter outputs array. */
  index: number;
  /** The type of the streaming run step tool call's Code Interpreter output. */
  /** The discriminator possible values: logs, image */
  type: string;
}

export function runStepDeltaCodeInterpreterOutputDeserializer(
  item: any,
): RunStepDeltaCodeInterpreterOutput {
  return {
    index: item["index"],
    type: item["type"],
  };
}

/** Alias for RunStepDeltaCodeInterpreterOutputUnion */
export type RunStepDeltaCodeInterpreterOutputUnion =
  | RunStepDeltaCodeInterpreterLogOutput
  | RunStepDeltaCodeInterpreterImageOutput
  | RunStepDeltaCodeInterpreterOutput;

export function runStepDeltaCodeInterpreterOutputUnionDeserializer(
  item: any,
): RunStepDeltaCodeInterpreterOutputUnion {
  switch (item.type) {
    case "logs":
      return runStepDeltaCodeInterpreterLogOutputDeserializer(
        item as RunStepDeltaCodeInterpreterLogOutput,
      );

    case "image":
      return runStepDeltaCodeInterpreterImageOutputDeserializer(
        item as RunStepDeltaCodeInterpreterImageOutput,
      );

    default:
      return runStepDeltaCodeInterpreterOutputDeserializer(item);
  }
}

/** Represents a log output as produced by the Code Interpreter tool and as represented in a streaming run step's delta tool calls collection. */
export interface RunStepDeltaCodeInterpreterLogOutput extends RunStepDeltaCodeInterpreterOutput {
  /** The type of the object, which is always "logs." */
  type: "logs";
  /** The text output from the Code Interpreter tool call. */
  logs?: string;
}

export function runStepDeltaCodeInterpreterLogOutputDeserializer(
  item: any,
): RunStepDeltaCodeInterpreterLogOutput {
  return {
    index: item["index"],
    type: item["type"],
    logs: item["logs"],
  };
}

/** Represents an image output as produced the Code interpreter tool and as represented in a streaming run step's delta tool calls collection. */
export interface RunStepDeltaCodeInterpreterImageOutput extends RunStepDeltaCodeInterpreterOutput {
  /** The object type, which is always "image." */
  type: "image";
  /** The image data for the Code Interpreter tool call output. */
  image?: RunStepDeltaCodeInterpreterImageOutputObject;
}

export function runStepDeltaCodeInterpreterImageOutputDeserializer(
  item: any,
): RunStepDeltaCodeInterpreterImageOutput {
  return {
    index: item["index"],
    type: item["type"],
    image: !item["image"]
      ? item["image"]
      : runStepDeltaCodeInterpreterImageOutputObjectDeserializer(item["image"]),
  };
}

/** Represents the data for a streaming run step's Code Interpreter tool call image output. */
export interface RunStepDeltaCodeInterpreterImageOutputObject {
  /** The file ID for the image. */
  fileId?: string;
}

export function runStepDeltaCodeInterpreterImageOutputObjectDeserializer(
  item: any,
): RunStepDeltaCodeInterpreterImageOutputObject {
  return {
    fileId: item["file_id"],
  };
}

/** Represents the bing grounding tool call in a streaming run step. */
export interface RunStepDeltaBingGroundingToolCall extends RunStepDeltaToolCall {
  /** The object type, which is always "bing_grounding". */
  type: "bing_grounding";
  /** The dictionary with request and response from Bing Grounding search tool. */
  bingGrounding: Record<string, string>;
}

export function runStepDeltaBingGroundingToolCallDeserializer(
  item: any,
): RunStepDeltaBingGroundingToolCall {
  return {
    index: item["index"],
    id: item["id"],
    type: item["type"],
    bingGrounding: item["bing_grounding"],
  };
}

/** Represents the Bing Custom Search tool call in a streaming run step. */
export interface RunStepDeltaCustomBingGroundingToolCall extends RunStepDeltaToolCall {
  /** The object type, which is always 'bing_custom_search'. */
  type: "bing_custom_search";
  /** The dictionary with request and response from Bing Custom Search tool. */
  bingCustomSearch: Record<string, string>;
}

export function runStepDeltaCustomBingGroundingToolCallDeserializer(
  item: any,
): RunStepDeltaCustomBingGroundingToolCall {
  return {
    index: item["index"],
    id: item["id"],
    type: item["type"],
    bingCustomSearch: item["bing_custom_search"],
  };
}

/** Represents the Azure Function tool call in a streaming run step. */
export interface RunStepDeltaAzureFunctionToolCall extends RunStepDeltaToolCall {
  /** The object type, which is always 'azure_function'. */
  type: "azure_function";
  /** Partial description of an Azure function call. */
  azureFunction: AzureFunctionToolCallDetails;
}

export function runStepDeltaAzureFunctionToolCallDeserializer(
  item: any,
): RunStepDeltaAzureFunctionToolCall {
  return {
    index: item["index"],
    id: item["id"],
    type: item["type"],
    azureFunction: azureFunctionToolCallDetailsDeserializer(item["azure_function"]),
  };
}

/** Represents the Deep research in a streaming run step. */
export interface RunStepDeltaDeepResearchToolCall extends RunStepDeltaToolCall {
  /** The object type, which is always "deep_research". */
  type: "deep_research";
  /** The details of DeepResearch tool call. */
  deepResearch: RunStepDeepResearchToolCallDetails;
}

export function runStepDeltaDeepResearchToolCallDeserializer(
  item: any,
): RunStepDeltaDeepResearchToolCall {
  return {
    index: item["index"],
    id: item["id"],
    type: item["type"],
    deepResearch: runStepDeepResearchToolCallDetailsDeserializer(item["deep_research"]),
  };
}

/** Represents the Azure AI Search in a streaming run step. */
export interface RunStepDeltaAzureAISearchToolCall extends RunStepDeltaToolCall {
  /** The object type, which is always "azure_ai_search". */
  type: "azure_ai_search";
  /** Reserved for future use. */
  azureAISearch: Record<string, string>;
}

export function runStepDeltaAzureAISearchToolCallDeserializer(
  item: any,
): RunStepDeltaAzureAISearchToolCall {
  return {
    index: item["index"],
    id: item["id"],
    type: item["type"],
    azureAISearch: item["azure_ai_search"],
  };
}

/** Represents the Microsoft Fabric tool call in a streaming run step. */
export interface RunStepDeltaMicrosoftFabricToolCall extends RunStepDeltaToolCall {
  /** The object type, which is always 'fabric_dataagent' */
  type: "fabric_dataagent";
  /** Fabric input and output. */
  microsoftFabric: Record<string, string>;
}

export function runStepDeltaMicrosoftFabricToolCallDeserializer(
  item: any,
): RunStepDeltaMicrosoftFabricToolCall {
  return {
    index: item["index"],
    id: item["id"],
    type: item["type"],
    microsoftFabric: item["fabric_dataagent"],
  };
}

/** Represents the SharePoint tool call in a streaming run step. */
export interface RunStepDeltaSharepointToolCall extends RunStepDeltaToolCall {
  /** The object type, which is always 'sharepoint_grounding' */
  type: "sharepoint_grounding";
  /** SharePoint tool input and output. */
  sharepointGrounding: Record<string, string>;
}

export function runStepDeltaSharepointToolCallDeserializer(
  item: any,
): RunStepDeltaSharepointToolCall {
  return {
    index: item["index"],
    id: item["id"],
    type: item["type"],
    sharepointGrounding: item["sharepoint_grounding"],
  };
}

/** Represents an invocation of mcp as part of a streaming run step. */
export interface RunStepDeltaMCPObject extends RunStepDeltaDetail {
  /** The object type, which is always "mcp". */
  type: "mcp";
  /** The collection of tool calls for the tool call detail item. */
  toolCalls?: RunStepDeltaMcpToolCall[];
}

export function runStepDeltaMCPObjectDeserializer(item: any): RunStepDeltaMCPObject {
  return {
    type: item["type"],
    toolCalls: !item["tool_calls"]
      ? item["tool_calls"]
      : runStepDeltaMcpToolCallArrayDeserializer(item["tool_calls"]),
  };
}

export function runStepDeltaMcpToolCallArrayDeserializer(
  result: Array<RunStepDeltaMcpToolCall>,
): any[] {
  return result.map((item) => {
    return runStepDeltaMcpToolCallDeserializer(item);
  });
}

/** Represents an invocation of openapi as part of a streaming run step. */
export interface RunStepDeltaOpenAPIObject extends RunStepDeltaDetail {
  /** The object type, which is always "openapi". */
  type: "openapi";
  /** The collection of tool calls for the tool call detail item. */
  toolCalls?: RunStepDeltaOpenAPIToolCall[];
}

export function runStepDeltaOpenAPIObjectDeserializer(item: any): RunStepDeltaOpenAPIObject {
  return {
    type: item["type"],
    toolCalls: !item["tool_calls"]
      ? item["tool_calls"]
      : runStepDeltaOpenAPIToolCallArrayDeserializer(item["tool_calls"]),
  };
}

export function runStepDeltaOpenAPIToolCallArrayDeserializer(
  result: Array<RunStepDeltaOpenAPIToolCall>,
): any[] {
  return result.map((item) => {
    return runStepDeltaOpenAPIToolCallDeserializer(item);
  });
}

/** Alias for AgentStreamEvent */
export type AgentStreamEvent =
  | string
  | ThreadStreamEvent
  | RunStreamEvent
  | RunStepStreamEvent
  | MessageStreamEvent
  | ErrorEvent
  | DoneEvent;

export function agentStreamEventDeserializer(item: any): AgentStreamEvent {
  return item;
}

/** Thread operation related streaming events */
export enum ThreadStreamEvent {
  /** Event emitted when a thread is created */
  Created = "thread.created",
}

/** Run operation related streaming events */
export enum RunStreamEvent {
  /** Event emitted when a run is created */
  ThreadRunCreated = "thread.run.created",
  /** Event emitted when a run is queued */
  ThreadRunQueued = "thread.run.queued",
  /** Event emitted when a run is in progress */
  ThreadRunInProgress = "thread.run.in_progress",
  /** Event emitted when a run requires action */
  ThreadRunRequiresAction = "thread.run.requires_action",
  /** Event emitted when a run is completed */
  ThreadRunCompleted = "thread.run.completed",
  /** Event emitted when a run is incomplete */
  ThreadRunIncomplete = "thread.run.incomplete",
  /** Event emitted when a run has failed */
  ThreadRunFailed = "thread.run.failed",
  /** Event emitted when a run is being cancelled */
  ThreadRunCancelling = "thread.run.cancelling",
  /** Event emitted when a run has been cancelled */
  ThreadRunCancelled = "thread.run.cancelled",
  /** Event emitted when a run has expired */
  ThreadRunExpired = "thread.run.expired",
}

/** Run step operation related streaming events */
export enum RunStepStreamEvent {
  /** Event emitted when a run step is created */
  ThreadRunStepCreated = "thread.run.step.created",
  /** Event emitted when a run step is in progress */
  ThreadRunStepInProgress = "thread.run.step.in_progress",
  /** Event emitted when a run step delta is received */
  ThreadRunStepDelta = "thread.run.step.delta",
  /** Event emitted when a run step is completed */
  ThreadRunStepCompleted = "thread.run.step.completed",
  /** Event emitted when a run step has failed */
  ThreadRunStepFailed = "thread.run.step.failed",
  /** Event emitted when a run step has been cancelled */
  ThreadRunStepCancelled = "thread.run.step.cancelled",
  /** Event emitted when a run step has expired */
  ThreadRunStepExpired = "thread.run.step.expired",
}

/** Message operation related streaming events */
export enum MessageStreamEvent {
  /** Event emitted when a message is created */
  ThreadMessageCreated = "thread.message.created",
  /** Event emitted when a message is in progress */
  ThreadMessageInProgress = "thread.message.in_progress",
  /** Event emitted when a message delta is received */
  ThreadMessageDelta = "thread.message.delta",
  /** Event emitted when a message is completed */
  ThreadMessageCompleted = "thread.message.completed",
  /** Event emitted when a message is incomplete */
  ThreadMessageIncomplete = "thread.message.incomplete",
}

/** Terminal event indicating a server side error while streaming. */
export enum ErrorEvent {
  /** Server error while streaming */
  Error = "error",
}
/** Terminal event indicating the successful end of a stream. */
export enum DoneEvent {
  /** Event emitted when a stream has completed successfully */
  Done = "done",
}
/** The available sorting options when requesting a list of response objects. */
export type ListSortOrder = "asc" | "desc";
/** A list of additional fields to include in the response. */
export type RunAdditionalFieldList = "step_details.tool_calls[*].file_search.results[*].content";
/** Query parameter filter for vector store file retrieval endpoint */
export type VectorStoreFileStatusFilter = "in_progress" | "completed" | "failed" | "cancelled";

/** Azure AI Agents API versions */
export enum KnownVersions {
  /** Azure AI API version 2025-05-01. */
  V20250501 = "2025-05-01",
  /** Azure AI API version v1. */
  V1 = "v1",
  /** Azure AI API version 2025-05-15-preview. */
  V20250515Preview = "2025-05-15-preview",
}
