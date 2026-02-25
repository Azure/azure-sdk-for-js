// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable tsdoc/syntax */

/** model interface Agent */
export interface Agent {
  /** The object type, which is always 'agent'. */
  object: "agent";
  /** The unique identifier of the agent. */
  id: string;
  /** The name of the agent. */
  name: string;
  /** The latest version of the agent. */
  versions: {
    latest: AgentVersion;
  };
}

export function agentDeserializer(item: any): Agent {
  return {
    object: item["object"],
    id: item["id"],
    name: item["name"],
    versions: _agentVersionsDeserializer(item["versions"]),
  };
}

/**
 * Helper interface for agent version references.
 */
export interface _AgentVersions {
  latest: AgentVersion;
}

export function _agentVersionsDeserializer(item: any): _AgentVersions {
  return {
    latest: agentVersionDeserializer(item["latest"]),
  };
}

/**
 * Represents a specific version of an agent.
 * Includes metadata, versioning, creation time, and agent definition.
 */
export interface AgentVersion {
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata: Record<string, string>;
  /** The object type, which is always 'agent.version'. */
  object: "agent.version";
  /** The unique identifier of the agent version. */
  id: string;
  /** The name of the agent. Name can be used to retrieve/update/delete the agent. */
  name: string;
  /** The version identifier of the agent. Agents are immutable and every update creates a new version while keeping the name same. */
  version: string;
  /** A human-readable description of the agent. */
  description?: string;
  /** The Unix timestamp (seconds) when the agent was created. */
  created_at: Date;
  /** The definition of the agent. */
  definition: AgentDefinitionUnion;
}

export function agentVersionDeserializer(item: any): AgentVersion {
  return {
    metadata: item["metadata"],
    object: item["object"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    created_at: new Date(item["created_at"] * 1000),
    definition: agentDefinitionUnionDeserializer(item["definition"]),
  };
}

/**
 * Base definition interface for agents.
 * Contains the agent kind and optional RAI configuration.
 */
export interface AgentDefinition {
  /** The kind of agent. */
  kind: AgentKind;
  /** Configuration for Responsible AI (RAI) content filtering and safety features. */
  rai_config?: RaiConfig;
}

export function agentDefinitionSerializer(item: AgentDefinition): any {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"] ? item["rai_config"] : raiConfigSerializer(item["rai_config"]),
  };
}

export function agentDefinitionDeserializer(item: any): AgentDefinition {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"]
      ? item["rai_config"]
      : raiConfigDeserializer(item["rai_config"]),
  };
}

/**
 * Union type for all agent definition types.
 * Supports workflow, hosted, container app, and prompt agents.
 */
export type AgentDefinitionUnion =
  | PromptAgentDefinition
  | WorkflowAgentDefinition
  | HostedAgentDefinition
  | ContainerAppAgentDefinition
  | AgentDefinition;

export function agentDefinitionUnionSerializer(item: AgentDefinitionUnion): any {
  switch (item.kind) {
    case "prompt":
      return promptAgentDefinitionSerializer(item as PromptAgentDefinition);

    case "workflow":
      return workflowAgentDefinitionSerializer(item as WorkflowAgentDefinition);

    case "hosted":
      return hostedAgentDefinitionSerializer(item as HostedAgentDefinition);

    case "container_app":
      return containerAppAgentDefinitionSerializer(item as ContainerAppAgentDefinition);

    default:
      return agentDefinitionSerializer(item);
  }
}

export function agentDefinitionUnionDeserializer(item: any): AgentDefinitionUnion {
  switch (item.kind) {
    case "prompt":
      return promptAgentDefinitionDeserializer(item as PromptAgentDefinition);

    case "workflow":
      return workflowAgentDefinitionDeserializer(item as WorkflowAgentDefinition);

    case "hosted":
      return hostedAgentDefinitionDeserializer(item as HostedAgentDefinition);

    case "container_app":
      return containerAppAgentDefinitionDeserializer(item as ContainerAppAgentDefinition);

    default:
      return agentDefinitionDeserializer(item);
  }
}

/**
 * Defines the type/kind of agent.
 * Determines which agent definition structure is used.
 */
export type AgentKind = "prompt" | "hosted" | "container_app" | "workflow";

/** Configuration for Responsible AI (RAI) content filtering and safety features. */
export interface RaiConfig {
  /** The name of the RAI policy to apply. */
  rai_policy_name: string;
}

export function raiConfigSerializer(item: RaiConfig): any {
  return { rai_policy_name: item["rai_policy_name"] };
}

export function raiConfigDeserializer(item: any): RaiConfig {
  return {
    rai_policy_name: item["rai_policy_name"],
  };
}

/** The prompt agent definition */
export interface PromptAgentDefinition extends AgentDefinition {
  kind: "prompt";
  /** The model deployment to use for this agent. */
  model: string;
  /** A system (or developer) message inserted into the model's context. */
  instructions?: string;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * We generally recommend altering this or `top_p` but not both.
   */
  temperature?: number;
  /**
   * An alternative to sampling with temperature, called nucleus sampling,
   * where the model considers the results of the tokens with top_p probability
   * mass. So 0.1 means only the tokens comprising the top 10% probability mass
   * are considered.
   *
   * We generally recommend altering this or `temperature` but not both.
   */
  top_p?: number;
  reasoning?: Reasoning;
  /**
   * An array of tools the model may call while generating a response. You
   * can specify which tool to use by setting the `tool_choice` parameter.
   */
  tools?: ToolUnion[];
  /**
   * How the model should select which tool (or tools) to use when generating a response.
   * See the `tools` parameter to see how to specify which tools the model can call.
   */
  tool_choice?: string | ToolChoiceParamUnion;
  /** Configuration options for a text response from the model. Can be plain text or structured JSON data. */
  text?: PromptAgentDefinitionTextOptions;
  /** Set of structured inputs that can participate in prompt template substitution or tool argument bindings. */
  structured_inputs?: Record<string, StructuredInputDefinition>;
}

export function promptAgentDefinitionSerializer(item: PromptAgentDefinition): any {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"] ? item["rai_config"] : raiConfigSerializer(item["rai_config"]),
    model: item["model"],
    instructions: item["instructions"],
    temperature: item["temperature"],
    top_p: item["top_p"],
    reasoning: !item["reasoning"] ? item["reasoning"] : reasoningSerializer(item["reasoning"]),
    tools: !item["tools"] ? item["tools"] : toolUnionArraySerializer(item["tools"]),
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : _promptAgentDefinitionToolChoiceSerializer(item["tool_choice"]),
    text: !item["text"] ? item["text"] : promptAgentDefinitionTextOptionsSerializer(item["text"]),
    structured_inputs: !item["structured_inputs"]
      ? item["structured_inputs"]
      : structuredInputDefinitionRecordSerializer(item["structured_inputs"]),
  };
}

export function promptAgentDefinitionDeserializer(item: any): PromptAgentDefinition {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"]
      ? item["rai_config"]
      : raiConfigDeserializer(item["rai_config"]),
    model: item["model"],
    instructions: item["instructions"],
    temperature: item["temperature"],
    top_p: item["top_p"],
    reasoning: !item["reasoning"] ? item["reasoning"] : reasoningDeserializer(item["reasoning"]),
    tools: !item["tools"] ? item["tools"] : toolUnionArrayDeserializer(item["tools"]),
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : _promptAgentDefinitionToolChoiceDeserializer(item["tool_choice"]),
    text: !item["text"] ? item["text"] : promptAgentDefinitionTextOptionsDeserializer(item["text"]),
    structured_inputs: !item["structured_inputs"]
      ? item["structured_inputs"]
      : structuredInputDefinitionRecordDeserializer(item["structured_inputs"]),
  };
}

/**
 * **gpt-5 and o-series models only**
 * Configuration options for
 * [reasoning models](https://platform.openai.com/docs/guides/reasoning).
 */
export interface Reasoning {
  effort?: ReasoningEffort;
  summary?: "auto" | "concise" | "detailed";
  generate_summary?: "auto" | "concise" | "detailed";
}

export function reasoningSerializer(item: Reasoning): any {
  return {
    effort: item["effort"],
    summary: item["summary"],
    generate_summary: item["generate_summary"],
  };
}

export function reasoningDeserializer(item: any): Reasoning {
  return {
    effort: item["effort"],
    summary: item["summary"],
    generate_summary: item["generate_summary"],
  };
}

/**
 * Constrains effort on reasoning for
 * [reasoning models](https://platform.openai.com/docs/guides/reasoning).
 * Currently supported values are `none`, `minimal`, `low`, `medium`, `high`, and `xhigh`. Reducing
 * reasoning effort can result in faster responses and fewer tokens used
 * on reasoning in a response.
 * - `gpt-5.1` defaults to `none`, which does not perform reasoning. The supported reasoning values for `gpt-5.1` are `none`, `low`, `medium`, and `high`. Tool calls are supported for all reasoning values in gpt-5.1.
 * - All models before `gpt-5.1` default to `medium` reasoning effort, and do not support `none`.
 * - The `gpt-5-pro` model defaults to (and only supports) `high` reasoning effort.
 * - `xhigh` is supported for all models after `gpt-5.1-codex-max`.
 */
export type ReasoningEffort = "none" | "minimal" | "low" | "medium" | "high" | "xhigh";

export function toolUnionArraySerializer(result: Array<ToolUnion>): any[] {
  return result.map((item) => {
    return toolUnionSerializer(item);
  });
}

export function toolUnionArrayDeserializer(result: Array<ToolUnion>): any[] {
  return result.map((item) => {
    return toolUnionDeserializer(item);
  });
}

/** A tool that can be used to generate a response. */
export interface Tool {
  type: ToolType;
}

export function toolSerializer(item: Tool): any {
  return { type: item["type"] };
}

export function toolDeserializer(item: any): Tool {
  return {
    type: item["type"],
  };
}

/** Alias for ToolUnion */
export type ToolUnion =
  | BingGroundingTool
  | MicrosoftFabricPreviewTool
  | SharepointPreviewTool
  | AzureAISearchTool
  | OpenApiTool
  | BingCustomSearchPreviewTool
  | BrowserAutomationPreviewTool
  | AzureFunctionTool
  | CaptureStructuredOutputsTool
  | A2APreviewTool
  | MemorySearchPreviewTool
  | CodeInterpreterTool
  | FunctionTool
  | FileSearchTool
  | ComputerUsePreviewTool
  | WebSearchTool
  | MCPTool
  | ImageGenTool
  | LocalShellToolParam
  | FunctionShellToolParam
  | CustomToolParam
  | WebSearchPreviewTool
  | ApplyPatchToolParam
  | Tool;

export function toolUnionSerializer(item: ToolUnion): any {
  switch (item.type) {
    case "bing_grounding":
      return bingGroundingToolSerializer(item as BingGroundingTool);

    case "fabric_dataagent_preview":
      return microsoftFabricPreviewToolSerializer(item as MicrosoftFabricPreviewTool);

    case "sharepoint_grounding_preview":
      return sharepointPreviewToolSerializer(item as SharepointPreviewTool);

    case "azure_ai_search":
      return azureAISearchToolSerializer(item as AzureAISearchTool);

    case "openapi":
      return openApiToolSerializer(item as OpenApiTool);

    case "bing_custom_search_preview":
      return bingCustomSearchPreviewToolSerializer(item as BingCustomSearchPreviewTool);

    case "browser_automation_preview":
      return browserAutomationPreviewToolSerializer(item as BrowserAutomationPreviewTool);

    case "azure_function":
      return azureFunctionToolSerializer(item as AzureFunctionTool);

    case "capture_structured_outputs":
      return captureStructuredOutputsToolSerializer(item as CaptureStructuredOutputsTool);

    case "a2a_preview":
      return a2APreviewToolSerializer(item as A2APreviewTool);

    case "memory_search_preview":
      return memorySearchPreviewToolSerializer(item as MemorySearchPreviewTool);

    case "code_interpreter":
      return codeInterpreterToolSerializer(item as CodeInterpreterTool);

    case "function":
      return functionToolSerializer(item as FunctionTool);

    case "file_search":
      return fileSearchToolSerializer(item as FileSearchTool);

    case "computer_use_preview":
      return computerUsePreviewToolSerializer(item as ComputerUsePreviewTool);

    case "web_search":
      return webSearchToolSerializer(item as WebSearchTool);

    case "mcp":
      return mcpToolSerializer(item as MCPTool);

    case "image_generation":
      return imageGenToolSerializer(item as ImageGenTool);

    case "local_shell":
      return localShellToolParamSerializer(item as LocalShellToolParam);

    case "shell":
      return functionShellToolParamSerializer(item as FunctionShellToolParam);

    case "custom":
      return customToolParamSerializer(item as CustomToolParam);

    case "web_search_preview":
      return webSearchPreviewToolSerializer(item as WebSearchPreviewTool);

    case "apply_patch":
      return applyPatchToolParamSerializer(item as ApplyPatchToolParam);

    default:
      return toolSerializer(item);
  }
}

export function toolUnionDeserializer(item: any): ToolUnion {
  switch (item.type) {
    case "bing_grounding":
      return bingGroundingToolDeserializer(item as BingGroundingTool);

    case "fabric_dataagent_preview":
      return microsoftFabricPreviewToolDeserializer(item as MicrosoftFabricPreviewTool);

    case "sharepoint_grounding_preview":
      return sharepointPreviewToolDeserializer(item as SharepointPreviewTool);

    case "azure_ai_search":
      return azureAISearchToolDeserializer(item as AzureAISearchTool);

    case "openapi":
      return openApiToolDeserializer(item as OpenApiTool);

    case "bing_custom_search_preview":
      return bingCustomSearchPreviewToolDeserializer(item as BingCustomSearchPreviewTool);

    case "browser_automation_preview":
      return browserAutomationPreviewToolDeserializer(item as BrowserAutomationPreviewTool);

    case "azure_function":
      return azureFunctionToolDeserializer(item as AzureFunctionTool);

    case "capture_structured_outputs":
      return captureStructuredOutputsToolDeserializer(item as CaptureStructuredOutputsTool);

    case "a2a_preview":
      return a2APreviewToolDeserializer(item as A2APreviewTool);

    case "memory_search_preview":
      return memorySearchPreviewToolDeserializer(item as MemorySearchPreviewTool);

    case "code_interpreter":
      return codeInterpreterToolDeserializer(item as CodeInterpreterTool);

    case "function":
      return functionToolDeserializer(item as FunctionTool);

    case "file_search":
      return fileSearchToolDeserializer(item as FileSearchTool);

    case "computer_use_preview":
      return computerUsePreviewToolDeserializer(item as ComputerUsePreviewTool);

    case "web_search":
      return webSearchToolDeserializer(item as WebSearchTool);

    case "mcp":
      return mcpToolDeserializer(item as MCPTool);

    case "image_generation":
      return imageGenToolDeserializer(item as ImageGenTool);

    case "local_shell":
      return localShellToolParamDeserializer(item as LocalShellToolParam);

    case "shell":
      return functionShellToolParamDeserializer(item as FunctionShellToolParam);

    case "custom":
      return customToolParamDeserializer(item as CustomToolParam);

    case "web_search_preview":
      return webSearchPreviewToolDeserializer(item as WebSearchPreviewTool);

    case "apply_patch":
      return applyPatchToolParamDeserializer(item as ApplyPatchToolParam);

    default:
      return toolDeserializer(item);
  }
}

/** Type of ToolType */
export type ToolType =
  | "function"
  | "file_search"
  | "computer_use_preview"
  | "web_search"
  | "mcp"
  | "code_interpreter"
  | "image_generation"
  | "local_shell"
  | "shell"
  | "custom"
  | "web_search_preview"
  | "apply_patch"
  | "a2a_preview"
  | "bing_custom_search_preview"
  | "browser_automation_preview"
  | "fabric_dataagent_preview"
  | "sharepoint_grounding_preview"
  | "memory_search_preview"
  | "azure_ai_search"
  | "azure_function"
  | "bing_grounding"
  | "capture_structured_outputs"
  | "openapi";

/** The input definition information for a bing grounding search tool as used to configure an agent. */
export interface BingGroundingTool extends Tool {
  /** The object type, which is always 'bing_grounding'. */
  type: "bing_grounding";
  /** The bing grounding search tool parameters. */
  bing_grounding: BingGroundingSearchToolParameters;
}

export function bingGroundingToolSerializer(item: BingGroundingTool): any {
  return {
    type: item["type"],
    bing_grounding: bingGroundingSearchToolParametersSerializer(item["bing_grounding"]),
  };
}

export function bingGroundingToolDeserializer(item: any): BingGroundingTool {
  return {
    type: item["type"],
    bing_grounding: bingGroundingSearchToolParametersDeserializer(item["bing_grounding"]),
  };
}

/** The bing grounding search tool parameters. */
export interface BingGroundingSearchToolParameters {
  /**
   * The search configurations attached to this tool. There can be a maximum of 1
   * search configuration resource attached to the tool.
   */
  search_configurations: BingGroundingSearchConfiguration[];
}

export function bingGroundingSearchToolParametersSerializer(
  item: BingGroundingSearchToolParameters,
): any {
  return {
    search_configurations: bingGroundingSearchConfigurationArraySerializer(
      item["search_configurations"],
    ),
  };
}

export function bingGroundingSearchToolParametersDeserializer(
  item: any,
): BingGroundingSearchToolParameters {
  return {
    search_configurations: bingGroundingSearchConfigurationArrayDeserializer(
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
  return result.map((item) => {
    return bingGroundingSearchConfigurationDeserializer(item);
  });
}

/** Search configuration for Bing Grounding */
export interface BingGroundingSearchConfiguration {
  /** Project connection id for grounding with bing search */
  project_connection_id: string;
  /** The market where the results come from. */
  market?: string;
  /** The language to use for user interface strings when calling Bing API. */
  set_lang?: string;
  /** The number of search results to return in the bing api response */
  count?: number;
  /** Filter search results by a specific time range. See [accepted values here](https://learn.microsoft.com/bing/search-apis/bing-web-search/reference/query-parameters). */
  freshness?: string;
}

export function bingGroundingSearchConfigurationSerializer(
  item: BingGroundingSearchConfiguration,
): any {
  return {
    project_connection_id: item["project_connection_id"],
    market: item["market"],
    set_lang: item["set_lang"],
    count: item["count"],
    freshness: item["freshness"],
  };
}

export function bingGroundingSearchConfigurationDeserializer(
  item: any,
): BingGroundingSearchConfiguration {
  return {
    project_connection_id: item["project_connection_id"],
    market: item["market"],
    set_lang: item["set_lang"],
    count: item["count"],
    freshness: item["freshness"],
  };
}

/** The input definition information for a Microsoft Fabric tool as used to configure an agent. */
export interface MicrosoftFabricPreviewTool extends Tool {
  /** The object type, which is always 'fabric_dataagent_preview'. */
  type: "fabric_dataagent_preview";
  /** The fabric data agent tool parameters. */
  fabric_dataagent_preview: FabricDataAgentToolParameters;
}

export function microsoftFabricPreviewToolSerializer(item: MicrosoftFabricPreviewTool): any {
  return {
    type: item["type"],
    fabric_dataagent_preview: fabricDataAgentToolParametersSerializer(
      item["fabric_dataagent_preview"],
    ),
  };
}

export function microsoftFabricPreviewToolDeserializer(item: any): MicrosoftFabricPreviewTool {
  return {
    type: item["type"],
    fabric_dataagent_preview: fabricDataAgentToolParametersDeserializer(
      item["fabric_dataagent_preview"],
    ),
  };
}

/** The fabric data agent tool parameters. */
export interface FabricDataAgentToolParameters {
  /**
   * The project connections attached to this tool. There can be a maximum of 1 connection
   * resource attached to the tool.
   */
  project_connections?: ToolProjectConnection[];
}

export function fabricDataAgentToolParametersSerializer(item: FabricDataAgentToolParameters): any {
  return {
    project_connections: !item["project_connections"]
      ? item["project_connections"]
      : toolProjectConnectionArraySerializer(item["project_connections"]),
  };
}

export function fabricDataAgentToolParametersDeserializer(
  item: any,
): FabricDataAgentToolParameters {
  return {
    project_connections: !item["project_connections"]
      ? item["project_connections"]
      : toolProjectConnectionArrayDeserializer(item["project_connections"]),
  };
}

export function toolProjectConnectionArraySerializer(result: Array<ToolProjectConnection>): any[] {
  return result.map((item) => {
    return toolProjectConnectionSerializer(item);
  });
}

export function toolProjectConnectionArrayDeserializer(
  result: Array<ToolProjectConnection>,
): any[] {
  return result.map((item) => {
    return toolProjectConnectionDeserializer(item);
  });
}

/** A project connection resource. */
export interface ToolProjectConnection {
  /** A project connection in a ToolProjectConnectionList attached to this tool. */
  project_connection_id: string;
}

export function toolProjectConnectionSerializer(item: ToolProjectConnection): any {
  return { project_connection_id: item["project_connection_id"] };
}

export function toolProjectConnectionDeserializer(item: any): ToolProjectConnection {
  return {
    project_connection_id: item["project_connection_id"],
  };
}

/** The input definition information for a sharepoint tool as used to configure an agent. */
export interface SharepointPreviewTool extends Tool {
  /** The object type, which is always 'sharepoint_grounding_preview'. */
  type: "sharepoint_grounding_preview";
  /** The sharepoint grounding tool parameters. */
  sharepoint_grounding_preview: SharepointGroundingToolParameters;
}

export function sharepointPreviewToolSerializer(item: SharepointPreviewTool): any {
  return {
    type: item["type"],
    sharepoint_grounding_preview: sharepointGroundingToolParametersSerializer(
      item["sharepoint_grounding_preview"],
    ),
  };
}

export function sharepointPreviewToolDeserializer(item: any): SharepointPreviewTool {
  return {
    type: item["type"],
    sharepoint_grounding_preview: sharepointGroundingToolParametersDeserializer(
      item["sharepoint_grounding_preview"],
    ),
  };
}

/** The sharepoint grounding tool parameters. */
export interface SharepointGroundingToolParameters {
  /**
   * The project connections attached to this tool. There can be a maximum of 1 connection
   * resource attached to the tool.
   */
  project_connections?: ToolProjectConnection[];
}

export function sharepointGroundingToolParametersSerializer(
  item: SharepointGroundingToolParameters,
): any {
  return {
    project_connections: !item["project_connections"]
      ? item["project_connections"]
      : toolProjectConnectionArraySerializer(item["project_connections"]),
  };
}

export function sharepointGroundingToolParametersDeserializer(
  item: any,
): SharepointGroundingToolParameters {
  return {
    project_connections: !item["project_connections"]
      ? item["project_connections"]
      : toolProjectConnectionArrayDeserializer(item["project_connections"]),
  };
}

/** The input definition information for an Azure AI search tool as used to configure an agent. */
export interface AzureAISearchTool extends Tool {
  /** The object type, which is always 'azure_ai_search'. */
  type: "azure_ai_search";
  /** The azure ai search index resource. */
  azure_ai_search: AzureAISearchToolResource;
}

export function azureAISearchToolSerializer(item: AzureAISearchTool): any {
  return {
    type: item["type"],
    azure_ai_search: azureAISearchToolResourceSerializer(item["azure_ai_search"]),
  };
}

export function azureAISearchToolDeserializer(item: any): AzureAISearchTool {
  return {
    type: item["type"],
    azure_ai_search: azureAISearchToolResourceDeserializer(item["azure_ai_search"]),
  };
}

/** A set of index resources used by the `azure_ai_search` tool. */
export interface AzureAISearchToolResource {
  /**
   * The indices attached to this agent. There can be a maximum of 1 index
   * resource attached to the agent.
   */
  indexes: AISearchIndexResource[];
}

export function azureAISearchToolResourceSerializer(item: AzureAISearchToolResource): any {
  return { indexes: aiSearchIndexResourceArraySerializer(item["indexes"]) };
}

export function azureAISearchToolResourceDeserializer(item: any): AzureAISearchToolResource {
  return {
    indexes: aiSearchIndexResourceArrayDeserializer(item["indexes"]),
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
  /** An index connection ID in an IndexResource attached to this agent. */
  project_connection_id?: string;
  /** The name of an index in an IndexResource attached to this agent. */
  index_name?: string;
  /** Type of query in an AIIndexResource attached to this agent. */
  query_type?: AzureAISearchQueryType;
  /** Number of documents to retrieve from search and present to the model. */
  top_k?: number;
  /** filter string for search resource. [Learn more here](https://learn.microsoft.com/azure/search/search-filters). */
  filter?: string;
  /** Index asset id for search resource. */
  index_asset_id?: string;
}

export function aiSearchIndexResourceSerializer(item: AISearchIndexResource): any {
  return {
    project_connection_id: item["project_connection_id"],
    index_name: item["index_name"],
    query_type: item["query_type"],
    top_k: item["top_k"],
    filter: item["filter"],
    index_asset_id: item["index_asset_id"],
  };
}

export function aiSearchIndexResourceDeserializer(item: any): AISearchIndexResource {
  return {
    project_connection_id: item["project_connection_id"],
    index_name: item["index_name"],
    query_type: item["query_type"],
    top_k: item["top_k"],
    filter: item["filter"],
    index_asset_id: item["index_asset_id"],
  };
}

/** Available query types for Azure AI Search tool. */
export type AzureAISearchQueryType =
  | "simple"
  | "semantic"
  | "vector"
  | "vector_simple_hybrid"
  | "vector_semantic_hybrid";

/** The input definition information for an OpenAPI tool as used to configure an agent. */
export interface OpenApiTool extends Tool {
  /** The object type, which is always 'openapi'. */
  type: "openapi";
  /** The openapi function definition. */
  openapi: OpenApiFunctionDefinition;
}

export function openApiToolSerializer(item: OpenApiTool): any {
  return { type: item["type"], openapi: openApiFunctionDefinitionSerializer(item["openapi"]) };
}

export function openApiToolDeserializer(item: any): OpenApiTool {
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
  spec: unknown;
  /** Open API authentication details */
  auth: OpenApiAuthDetailsUnion;
  /** List of OpenAPI spec parameters that will use user-provided defaults */
  default_params?: string[];
  /** List of function definitions used by OpenApi tool */
  readonly functions?: {
    name: string;
    description?: string;
    parameters: Record<string, unknown>;
  }[];
}

export function openApiFunctionDefinitionSerializer(item: OpenApiFunctionDefinition): any {
  return {
    name: item["name"],
    description: item["description"],
    spec: item["spec"],
    auth: openApiAuthDetailsUnionSerializer(item["auth"]),
    default_params: !item["default_params"]
      ? item["default_params"]
      : item["default_params"].map((p: any) => {
          return p;
        }),
  };
}

export function openApiFunctionDefinitionDeserializer(item: any): OpenApiFunctionDefinition {
  return {
    name: item["name"],
    description: item["description"],
    spec: Object.fromEntries(Object.entries(item["spec"]).map(([k, p]: [string, any]) => [k, p])),
    auth: openApiAuthDetailsUnionDeserializer(item["auth"]),
    default_params: !item["default_params"]
      ? item["default_params"]
      : item["default_params"].map((p: any) => {
          return p;
        }),
    functions: !item["functions"]
      ? item["functions"]
      : _openApiFunctionDefinitionFunctionArrayDeserializer(item["functions"]),
  };
}

/** authentication details for OpenApiFunctionDefinition */
export interface OpenApiAuthDetails {
  /** The type of authentication, must be anonymous/project_connection/managed_identity */
  /** The discriminator possible values: anonymous, project_connection, managed_identity */
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
  | OpenApiProjectConnectionAuthDetails
  | OpenApiManagedAuthDetails
  | OpenApiAuthDetails;

export function openApiAuthDetailsUnionSerializer(item: OpenApiAuthDetailsUnion): any {
  switch (item.type) {
    case "anonymous":
      return openApiAnonymousAuthDetailsSerializer(item as OpenApiAnonymousAuthDetails);

    case "project_connection":
      return openApiProjectConnectionAuthDetailsSerializer(
        item as OpenApiProjectConnectionAuthDetails,
      );

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

    case "project_connection":
      return openApiProjectConnectionAuthDetailsDeserializer(
        item as OpenApiProjectConnectionAuthDetails,
      );

    case "managed_identity":
      return openApiManagedAuthDetailsDeserializer(item as OpenApiManagedAuthDetails);

    default:
      return openApiAuthDetailsDeserializer(item);
  }
}

/**
 * Authentication type for OpenApi endpoint. Allowed types are:
 * - Anonymous (no authentication required)
 * - Project Connection (requires project_connection_id to endpoint, as setup in AI Foundry)
 * - Managed_Identity (requires audience for identity based auth)
 */
export type OpenApiAuthType = "anonymous" | "project_connection" | "managed_identity";

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

/** Security details for OpenApi project connection authentication */
export interface OpenApiProjectConnectionAuthDetails extends OpenApiAuthDetails {
  /** The object type, which is always 'project_connection'. */
  type: "project_connection";
  /** Project connection auth security details */
  security_scheme: OpenApiProjectConnectionSecurityScheme;
}

export function openApiProjectConnectionAuthDetailsSerializer(
  item: OpenApiProjectConnectionAuthDetails,
): any {
  return {
    type: item["type"],
    security_scheme: openApiProjectConnectionSecuritySchemeSerializer(item["security_scheme"]),
  };
}

export function openApiProjectConnectionAuthDetailsDeserializer(
  item: any,
): OpenApiProjectConnectionAuthDetails {
  return {
    type: item["type"],
    security_scheme: openApiProjectConnectionSecuritySchemeDeserializer(item["security_scheme"]),
  };
}

/** Security scheme for OpenApi managed_identity authentication */
export interface OpenApiProjectConnectionSecurityScheme {
  /** Project connection id for Project Connection auth type */
  project_connection_id: string;
}

export function openApiProjectConnectionSecuritySchemeSerializer(
  item: OpenApiProjectConnectionSecurityScheme,
): any {
  return { project_connection_id: item["project_connection_id"] };
}

export function openApiProjectConnectionSecuritySchemeDeserializer(
  item: any,
): OpenApiProjectConnectionSecurityScheme {
  return {
    project_connection_id: item["project_connection_id"],
  };
}

/** Security details for OpenApi managed_identity authentication */
export interface OpenApiManagedAuthDetails extends OpenApiAuthDetails {
  /** The object type, which is always 'managed_identity'. */
  type: "managed_identity";
  /** Connection auth security details */
  security_scheme: OpenApiManagedSecurityScheme;
}

export function openApiManagedAuthDetailsSerializer(item: OpenApiManagedAuthDetails): any {
  return {
    type: item["type"],
    security_scheme: openApiManagedSecuritySchemeSerializer(item["security_scheme"]),
  };
}

export function openApiManagedAuthDetailsDeserializer(item: any): OpenApiManagedAuthDetails {
  return {
    type: item["type"],
    security_scheme: openApiManagedSecuritySchemeDeserializer(item["security_scheme"]),
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

export function _openApiFunctionDefinitionFunctionArrayDeserializer(
  result: Array<_OpenApiFunctionDefinitionFunction>,
): any[] {
  return result.map((item) => {
    return _openApiFunctionDefinitionFunctionDeserializer(item);
  });
}

/** model interface _OpenApiFunctionDefinitionFunction */
export interface _OpenApiFunctionDefinitionFunction {
  /** The name of the function to be called. */
  name: string;
  /** A description of what the function does, used by the model to choose when and how to call the function. */
  description?: string;
  /** The parameters the functions accepts, described as a JSON Schema object. */
  parameters: Record<string, unknown>;
}

export function _openApiFunctionDefinitionFunctionDeserializer(
  item: any,
): _OpenApiFunctionDefinitionFunction {
  return {
    name: item["name"],
    description: item["description"],
    parameters: Object.fromEntries(
      Object.entries(item["parameters"]).map(([k, p]: [string, any]) => [k, p]),
    ),
  };
}

/** The input definition information for a Bing custom search tool as used to configure an agent. */
export interface BingCustomSearchPreviewTool extends Tool {
  /** The object type, which is always 'bing_custom_search_preview'. */
  type: "bing_custom_search_preview";
  /** The bing custom search tool parameters. */
  bing_custom_search_preview: BingCustomSearchToolParameters;
}

export function bingCustomSearchPreviewToolSerializer(item: BingCustomSearchPreviewTool): any {
  return {
    type: item["type"],
    bing_custom_search_preview: bingCustomSearchToolParametersSerializer(
      item["bing_custom_search_preview"],
    ),
  };
}

export function bingCustomSearchPreviewToolDeserializer(item: any): BingCustomSearchPreviewTool {
  return {
    type: item["type"],
    bing_custom_search_preview: bingCustomSearchToolParametersDeserializer(
      item["bing_custom_search_preview"],
    ),
  };
}

/** The bing custom search tool parameters. */
export interface BingCustomSearchToolParameters {
  /**
   * The project connections attached to this tool. There can be a maximum of 1 connection
   * resource attached to the tool.
   */
  search_configurations: BingCustomSearchConfiguration[];
}

export function bingCustomSearchToolParametersSerializer(
  item: BingCustomSearchToolParameters,
): any {
  return {
    search_configurations: bingCustomSearchConfigurationArraySerializer(
      item["search_configurations"],
    ),
  };
}

export function bingCustomSearchToolParametersDeserializer(
  item: any,
): BingCustomSearchToolParameters {
  return {
    search_configurations: bingCustomSearchConfigurationArrayDeserializer(
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
  /** Project connection id for grounding with bing search */
  project_connection_id: string;
  /** Name of the custom configuration instance given to config. */
  instance_name: string;
  /** The market where the results come from. */
  market?: string;
  /** The language to use for user interface strings when calling Bing API. */
  set_lang?: string;
  /** The number of search results to return in the bing api response */
  count?: number;
  /** Filter search results by a specific time range. See [accepted values here](https://learn.microsoft.com/bing/search-apis/bing-web-search/reference/query-parameters). */
  freshness?: string;
}

export function bingCustomSearchConfigurationSerializer(item: BingCustomSearchConfiguration): any {
  return {
    project_connection_id: item["project_connection_id"],
    instance_name: item["instance_name"],
    market: item["market"],
    set_lang: item["set_lang"],
    count: item["count"],
    freshness: item["freshness"],
  };
}

export function bingCustomSearchConfigurationDeserializer(
  item: any,
): BingCustomSearchConfiguration {
  return {
    project_connection_id: item["project_connection_id"],
    instance_name: item["instance_name"],
    market: item["market"],
    set_lang: item["set_lang"],
    count: item["count"],
    freshness: item["freshness"],
  };
}

/** The input definition information for a Browser Automation Tool, as used to configure an Agent. */
export interface BrowserAutomationPreviewTool extends Tool {
  /** The object type, which is always 'browser_automation_preview'. */
  type: "browser_automation_preview";
  /** The Browser Automation Tool parameters. */
  browser_automation_preview: BrowserAutomationToolParameters;
}

export function browserAutomationPreviewToolSerializer(item: BrowserAutomationPreviewTool): any {
  return {
    type: item["type"],
    browser_automation_preview: browserAutomationToolParametersSerializer(
      item["browser_automation_preview"],
    ),
  };
}

export function browserAutomationPreviewToolDeserializer(item: any): BrowserAutomationPreviewTool {
  return {
    type: item["type"],
    browser_automation_preview: browserAutomationToolParametersDeserializer(
      item["browser_automation_preview"],
    ),
  };
}

/** Definition of input parameters for the Browser Automation Tool. */
export interface BrowserAutomationToolParameters {
  /** The project connection parameters associated with the Browser Automation Tool. */
  connection: BrowserAutomationToolConnectionParameters;
}

export function browserAutomationToolParametersSerializer(
  item: BrowserAutomationToolParameters,
): any {
  return { connection: browserAutomationToolConnectionParametersSerializer(item["connection"]) };
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
  /** The ID of the project connection to your Azure Playwright resource. */
  project_connection_id: string;
}

export function browserAutomationToolConnectionParametersSerializer(
  item: BrowserAutomationToolConnectionParameters,
): any {
  return { project_connection_id: item["project_connection_id"] };
}

export function browserAutomationToolConnectionParametersDeserializer(
  item: any,
): BrowserAutomationToolConnectionParameters {
  return {
    project_connection_id: item["project_connection_id"],
  };
}

/** The input definition information for an Azure Function Tool, as used to configure an Agent. */
export interface AzureFunctionTool extends Tool {
  /** The object type, which is always 'browser_automation'. */
  type: "azure_function";
  /** The Azure Function Tool definition. */
  azure_function: AzureFunctionDefinition;
}

export function azureFunctionToolSerializer(item: AzureFunctionTool): any {
  return {
    type: item["type"],
    azure_function: azureFunctionDefinitionSerializer(item["azure_function"]),
  };
}

export function azureFunctionToolDeserializer(item: any): AzureFunctionTool {
  return {
    type: item["type"],
    azure_function: azureFunctionDefinitionDeserializer(item["azure_function"]),
  };
}

/** The definition of Azure function. */
export interface AzureFunctionDefinition {
  /** The definition of azure function and its parameters. */
  function: {
    name: string;
    description?: string;
    parameters: Record<string, unknown>;
  };
  /** Input storage queue. The queue storage trigger runs a function as messages are added to it. */
  input_binding: AzureFunctionBinding;
  /** Output storage queue. The function writes output to this queue when the input items are processed. */
  output_binding: AzureFunctionBinding;
}

export function azureFunctionDefinitionSerializer(item: AzureFunctionDefinition): any {
  return {
    function: _azureFunctionDefinitionFunctionSerializer(item["function"]),
    input_binding: azureFunctionBindingSerializer(item["input_binding"]),
    output_binding: azureFunctionBindingSerializer(item["output_binding"]),
  };
}

export function azureFunctionDefinitionDeserializer(item: any): AzureFunctionDefinition {
  return {
    function: _azureFunctionDefinitionFunctionDeserializer(item["function"]),
    input_binding: azureFunctionBindingDeserializer(item["input_binding"]),
    output_binding: azureFunctionBindingDeserializer(item["output_binding"]),
  };
}

/** model interface _AzureFunctionDefinitionFunction */
export interface _AzureFunctionDefinitionFunction {
  /** The name of the function to be called. */
  name: string;
  /** A description of what the function does, used by the model to choose when and how to call the function. */
  description?: string;
  /** The parameters the functions accepts, described as a JSON Schema object. */
  parameters: Record<string, unknown>;
}

export function _azureFunctionDefinitionFunctionSerializer(
  item: _AzureFunctionDefinitionFunction,
): any {
  return { name: item["name"], description: item["description"], parameters: item["parameters"] };
}

export function _azureFunctionDefinitionFunctionDeserializer(
  item: any,
): _AzureFunctionDefinitionFunction {
  return {
    name: item["name"],
    description: item["description"],
    parameters: Object.fromEntries(
      Object.entries(item["parameters"]).map(([k, p]: [string, any]) => [k, p]),
    ),
  };
}

/** The structure for keeping storage queue name and URI. */
export interface AzureFunctionBinding {
  /** The type of binding, which is always 'storage_queue'. */
  type: "storage_queue";
  /** Storage queue. */
  storage_queue: AzureFunctionStorageQueue;
}

export function azureFunctionBindingSerializer(item: AzureFunctionBinding): any {
  return {
    type: item["type"],
    storage_queue: azureFunctionStorageQueueSerializer(item["storage_queue"]),
  };
}

export function azureFunctionBindingDeserializer(item: any): AzureFunctionBinding {
  return {
    type: item["type"],
    storage_queue: azureFunctionStorageQueueDeserializer(item["storage_queue"]),
  };
}

/** The structure for keeping storage queue name and URI. */
export interface AzureFunctionStorageQueue {
  /** URI to the Azure Storage Queue service allowing you to manipulate a queue. */
  queue_service_endpoint: string;
  /** The name of an Azure function storage queue. */
  queue_name: string;
}

export function azureFunctionStorageQueueSerializer(item: AzureFunctionStorageQueue): any {
  return { queue_service_endpoint: item["queue_service_endpoint"], queue_name: item["queue_name"] };
}

export function azureFunctionStorageQueueDeserializer(item: any): AzureFunctionStorageQueue {
  return {
    queue_service_endpoint: item["queue_service_endpoint"],
    queue_name: item["queue_name"],
  };
}

/** A tool for capturing structured outputs */
export interface CaptureStructuredOutputsTool extends Tool {
  /** The type of the tool. Always `capture_structured_outputs`. */
  type: "capture_structured_outputs";
  /** The structured outputs to capture from the model. */
  outputs: StructuredOutputDefinition;
}

export function captureStructuredOutputsToolSerializer(item: CaptureStructuredOutputsTool): any {
  return { type: item["type"], outputs: structuredOutputDefinitionSerializer(item["outputs"]) };
}

export function captureStructuredOutputsToolDeserializer(item: any): CaptureStructuredOutputsTool {
  return {
    type: item["type"],
    outputs: structuredOutputDefinitionDeserializer(item["outputs"]),
  };
}

/** A structured output that can be produced by the agent. */
export interface StructuredOutputDefinition {
  /** The name of the structured output. */
  name: string;
  /** A description of the output to emit. Used by the model to determine when to emit the output. */
  description: string;
  /** The JSON schema for the structured output. */
  schema: Record<string, unknown>;
  /** Whether to enforce strict validation. Default `true`. */
  strict: boolean;
}

export function structuredOutputDefinitionSerializer(item: StructuredOutputDefinition): any {
  return {
    name: item["name"],
    description: item["description"],
    schema: item["schema"],
    strict: item["strict"],
  };
}

export function structuredOutputDefinitionDeserializer(item: any): StructuredOutputDefinition {
  return {
    name: item["name"],
    description: item["description"],
    schema: Object.fromEntries(
      Object.entries(item["schema"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    strict: item["strict"],
  };
}

/** An agent implementing the A2A protocol. */
export interface A2APreviewTool extends Tool {
  /** The type of the tool. Always `"a2a_preview`. */
  type: "a2a_preview";
  /** Base URL of the agent. */
  base_url?: string;
  /**
   * The path to the agent card relative to the `base_url`.
   * If not provided, defaults to  `/.well-known/agent-card.json`
   */
  agent_card_path?: string;
  /**
   * The connection ID in the project for the A2A server.
   * The connection stores authentication and other connection details needed to connect to the A2A server.
   */
  project_connection_id?: string;
}

export function a2APreviewToolSerializer(item: A2APreviewTool): any {
  return {
    type: item["type"],
    base_url: item["base_url"],
    agent_card_path: item["agent_card_path"],
    project_connection_id: item["project_connection_id"],
  };
}

export function a2APreviewToolDeserializer(item: any): A2APreviewTool {
  return {
    type: item["type"],
    base_url: item["base_url"],
    agent_card_path: item["agent_card_path"],
    project_connection_id: item["project_connection_id"],
  };
}

/** A tool for integrating memories into the agent. */
export interface MemorySearchPreviewTool extends Tool {
  /** The type of the tool. Always `memory_search_preview`. */
  type: "memory_search_preview";
  /** The name of the memory store to use. */
  memory_store_name: string;
  /**
   * The namespace used to group and isolate memories, such as a user ID.
   * Limits which memories can be retrieved or updated.
   * Use special variable `{{$userId}}` to scope memories to the current signed-in user.
   */
  scope: string;
  /** Options for searching the memory store. */
  search_options?: MemorySearchOptions;
  /** Time to wait before updating memories after inactivity (seconds). Default 300. */
  update_delay?: number;
}

export function memorySearchPreviewToolSerializer(item: MemorySearchPreviewTool): any {
  return {
    type: item["type"],
    memory_store_name: item["memory_store_name"],
    scope: item["scope"],
    search_options: !item["search_options"]
      ? item["search_options"]
      : memorySearchOptionsSerializer(item["search_options"]),
    update_delay: item["update_delay"],
  };
}

export function memorySearchPreviewToolDeserializer(item: any): MemorySearchPreviewTool {
  return {
    type: item["type"],
    memory_store_name: item["memory_store_name"],
    scope: item["scope"],
    search_options: !item["search_options"]
      ? item["search_options"]
      : memorySearchOptionsDeserializer(item["search_options"]),
    update_delay: item["update_delay"],
  };
}

/** Memory search options. */
export interface MemorySearchOptions {
  /** Maximum number of memory items to return. */
  max_memories?: number;
}

export function memorySearchOptionsSerializer(item: MemorySearchOptions): any {
  return { max_memories: item["max_memories"] };
}

export function memorySearchOptionsDeserializer(item: any): MemorySearchOptions {
  return {
    max_memories: item["max_memories"],
  };
}

/** A tool that runs Python code to help generate a response to a prompt. */
export interface CodeInterpreterTool extends Tool {
  /** The type of the code interpreter tool. Always `code_interpreter`. */
  type: "code_interpreter";
  /**
   * The code interpreter container. Can be a container ID or an object that
   * specifies uploaded file IDs to make available to your code, along with an
   * optional `memory_limit` setting.
   * If not provided, the service assumes auto.
   */
  container?: string | CodeInterpreterContainerAuto;
}

export function codeInterpreterToolSerializer(item: CodeInterpreterTool): any {
  return {
    type: item["type"],
    container: !item["container"]
      ? item["container"]
      : _codeInterpreterToolContainerSerializer(item["container"]),
  };
}

export function codeInterpreterToolDeserializer(item: any): CodeInterpreterTool {
  return {
    type: item["type"],
    container: !item["container"]
      ? item["container"]
      : _codeInterpreterToolContainerDeserializer(item["container"]),
  };
}

/** Alias for _CodeInterpreterToolContainer */
export type _CodeInterpreterToolContainer = string | CodeInterpreterContainerAuto;

export function _codeInterpreterToolContainerSerializer(item: _CodeInterpreterToolContainer): any {
  return item;
}

export function _codeInterpreterToolContainerDeserializer(
  item: any,
): _CodeInterpreterToolContainer {
  return item;
}

/** Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on. */
export interface CodeInterpreterContainerAuto {
  /** Always `auto`. */
  type: "auto";
  /** An optional list of uploaded files to make available to your code. */
  file_ids?: string[];
  memory_limit?: ContainerMemoryLimit;
}

export function codeInterpreterContainerAutoSerializer(item: CodeInterpreterContainerAuto): any {
  return {
    type: item["type"],
    file_ids: !item["file_ids"]
      ? item["file_ids"]
      : item["file_ids"].map((p: any) => {
          return p;
        }),
    memory_limit: item["memory_limit"],
  };
}

export function codeInterpreterContainerAutoDeserializer(item: any): CodeInterpreterContainerAuto {
  return {
    type: item["type"],
    file_ids: !item["file_ids"]
      ? item["file_ids"]
      : item["file_ids"].map((p: any) => {
          return p;
        }),
    memory_limit: item["memory_limit"],
  };
}

/** Type of ContainerMemoryLimit */
export type ContainerMemoryLimit = "1g" | "4g" | "16g" | "64g";

/** Defines a function in your own code the model can choose to call. Learn more about [function calling](https://platform.openai.com/docs/guides/function-calling). */
export interface FunctionTool extends Tool {
  /** The type of the function tool. Always `function`. */
  type: "function";
  /** The name of the function to call. */
  name: string;
  description?: string;
  parameters: Record<string, unknown>;
  strict: boolean;
}

export function functionToolSerializer(item: FunctionTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    parameters: item["parameters"],
    strict: item["strict"],
  };
}

export function functionToolDeserializer(item: any): FunctionTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : Object.fromEntries(
          Object.entries(item["parameters"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
    strict: item["strict"],
  };
}

/** A tool that searches for relevant content from uploaded files. Learn more about the [file search tool](https://platform.openai.com/docs/guides/tools-file-search). */
export interface FileSearchTool extends Tool {
  /** The type of the file search tool. Always `file_search`. */
  type: "file_search";
  /** The IDs of the vector stores to search. */
  vector_store_ids: string[];
  /** The maximum number of results to return. This number should be between 1 and 50 inclusive. */
  max_num_results?: number;
  /** Ranking options for search. */
  ranking_options?: RankingOptions;
  filters?: Filters;
}

export function fileSearchToolSerializer(item: FileSearchTool): any {
  return {
    type: item["type"],
    vector_store_ids: item["vector_store_ids"].map((p: any) => {
      return p;
    }),
    max_num_results: item["max_num_results"],
    ranking_options: !item["ranking_options"]
      ? item["ranking_options"]
      : rankingOptionsSerializer(item["ranking_options"]),
    filters: !item["filters"] ? item["filters"] : filtersSerializer(item["filters"]),
  };
}

export function fileSearchToolDeserializer(item: any): FileSearchTool {
  return {
    type: item["type"],
    vector_store_ids: item["vector_store_ids"].map((p: any) => {
      return p;
    }),
    max_num_results: item["max_num_results"],
    ranking_options: !item["ranking_options"]
      ? item["ranking_options"]
      : rankingOptionsDeserializer(item["ranking_options"]),
    filters: !item["filters"] ? item["filters"] : filtersDeserializer(item["filters"]),
  };
}

/** model interface RankingOptions */
export interface RankingOptions {
  /** The ranker to use for the file search. */
  ranker?: RankerVersionType;
  /** The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results. */
  score_threshold?: number;
  /** Weights that control how reciprocal rank fusion balances semantic embedding matches versus sparse keyword matches when hybrid search is enabled. */
  hybrid_search?: HybridSearchOptions;
}

export function rankingOptionsSerializer(item: RankingOptions): any {
  return {
    ranker: item["ranker"],
    score_threshold: item["score_threshold"],
    hybrid_search: !item["hybrid_search"]
      ? item["hybrid_search"]
      : hybridSearchOptionsSerializer(item["hybrid_search"]),
  };
}

export function rankingOptionsDeserializer(item: any): RankingOptions {
  return {
    ranker: item["ranker"],
    score_threshold: item["score_threshold"],
    hybrid_search: !item["hybrid_search"]
      ? item["hybrid_search"]
      : hybridSearchOptionsDeserializer(item["hybrid_search"]),
  };
}

/** Type of RankerVersionType */
export type RankerVersionType = "auto" | "default-2024-11-15";

/** model interface HybridSearchOptions */
export interface HybridSearchOptions {
  /** The weight of the embedding in the reciprocal ranking fusion. */
  embedding_weight: number;
  /** The weight of the text in the reciprocal ranking fusion. */
  text_weight: number;
}

export function hybridSearchOptionsSerializer(item: HybridSearchOptions): any {
  return { embedding_weight: item["embedding_weight"], text_weight: item["text_weight"] };
}

export function hybridSearchOptionsDeserializer(item: any): HybridSearchOptions {
  return {
    embedding_weight: item["embedding_weight"],
    text_weight: item["text_weight"],
  };
}

/** Alias for Filters */
export type Filters = ComparisonFilter | CompoundFilter;

export function filtersSerializer(item: Filters): any {
  return item;
}

export function filtersDeserializer(item: any): Filters {
  return item;
}

/** A filter used to compare a specified attribute key to a given value using a defined comparison operation. */
export interface ComparisonFilter {
  /**
   * Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.
   *   - `eq`: equals
   *   - `ne`: not equal
   *   - `gt`: greater than
   *   - `gte`: greater than or equal
   *   - `lt`: less than
   *   - `lte`: less than or equal
   *   - `in`: in
   *   - `nin`: not in
   */
  type: "eq" | "ne" | "gt" | "gte" | "lt" | "lte";
  /** The key to compare against the value. */
  key: string;
  /** The value to compare against the attribute key; supports string, number, or boolean types. */
  value: string | number | boolean | ComparisonFilterValueItems[];
}

export function comparisonFilterSerializer(item: ComparisonFilter): any {
  return {
    type: item["type"],
    key: item["key"],
    value: _comparisonFilterValueSerializer(item["value"]),
  };
}

export function comparisonFilterDeserializer(item: any): ComparisonFilter {
  return {
    type: item["type"],
    key: item["key"],
    value: _comparisonFilterValueDeserializer(item["value"]),
  };
}

/** Alias for _ComparisonFilterValue */
export type _ComparisonFilterValue = string | number | boolean | ComparisonFilterValueItems[];

export function _comparisonFilterValueSerializer(item: _ComparisonFilterValue): any {
  return item;
}

export function _comparisonFilterValueDeserializer(item: any): _ComparisonFilterValue {
  return item;
}

export function comparisonFilterValueItemsArraySerializer(
  result: Array<ComparisonFilterValueItems>,
): any[] {
  return result.map((item) => {
    return comparisonFilterValueItemsSerializer(item);
  });
}

export function comparisonFilterValueItemsArrayDeserializer(
  result: Array<ComparisonFilterValueItems>,
): any[] {
  return result.map((item) => {
    return comparisonFilterValueItemsDeserializer(item);
  });
}

/** Alias for ComparisonFilterValueItems */
export type ComparisonFilterValueItems = string | number;

export function comparisonFilterValueItemsSerializer(item: ComparisonFilterValueItems): any {
  return item;
}

export function comparisonFilterValueItemsDeserializer(item: any): ComparisonFilterValueItems {
  return item;
}

/** Combine multiple filters using `and` or `or`. */
export interface CompoundFilter {
  /** Type of operation: `and` or `or`. */
  type: "and" | "or";
  /** Array of filters to combine. Items can be `ComparisonFilter` or `CompoundFilter`. */
  filters: (ComparisonFilter | any)[];
}

export function compoundFilterSerializer(item: CompoundFilter): any {
  return { type: item["type"], filters: _compoundFilterFilterArraySerializer(item["filters"]) };
}

export function compoundFilterDeserializer(item: any): CompoundFilter {
  return {
    type: item["type"],
    filters: _compoundFilterFilterArrayDeserializer(item["filters"]),
  };
}

export function _compoundFilterFilterArraySerializer(result: Array<_CompoundFilterFilter>): any[] {
  return result.map((item) => {
    return _compoundFilterFilterSerializer(item);
  });
}

export function _compoundFilterFilterArrayDeserializer(
  result: Array<_CompoundFilterFilter>,
): any[] {
  return result.map((item) => {
    return _compoundFilterFilterDeserializer(item);
  });
}

/** Alias for _CompoundFilterFilter */
export type _CompoundFilterFilter = ComparisonFilter | any;

export function _compoundFilterFilterSerializer(item: _CompoundFilterFilter): any {
  return item;
}

export function _compoundFilterFilterDeserializer(item: any): _CompoundFilterFilter {
  return item;
}

/** A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use). */
export interface ComputerUsePreviewTool extends Tool {
  /** The type of the computer use tool. Always `computer_use_preview`. */
  type: "computer_use_preview";
  /** The type of computer environment to control. */
  environment: ComputerEnvironment;
  /** The width of the computer display. */
  display_width: number;
  /** The height of the computer display. */
  display_height: number;
}

export function computerUsePreviewToolSerializer(item: ComputerUsePreviewTool): any {
  return {
    type: item["type"],
    environment: item["environment"],
    display_width: item["display_width"],
    display_height: item["display_height"],
  };
}

export function computerUsePreviewToolDeserializer(item: any): ComputerUsePreviewTool {
  return {
    type: item["type"],
    environment: item["environment"],
    display_width: item["display_width"],
    display_height: item["display_height"],
  };
}

/** Type of ComputerEnvironment */
export type ComputerEnvironment = "windows" | "mac" | "linux" | "ubuntu" | "browser";

/**
 * Search the Internet for sources related to the prompt. Learn more about the
 * [web search tool](https://platform.openai.com/docs/guides/tools-web-search).
 */
export interface WebSearchTool extends Tool {
  /** The type of the web search tool. One of `web_search` or `web_search_2025_08_26`. */
  type: "web_search";
  filters?: WebSearchToolFilters;
  user_location?: WebSearchApproximateLocation;
  /** High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default. */
  search_context_size?: "low" | "medium" | "high";
  /**
   * The project connections attached to this tool. There can be a maximum of 1 connection
   * resource attached to the tool.
   */
  custom_search_configuration?: WebSearchConfiguration;
}

export function webSearchToolSerializer(item: WebSearchTool): any {
  return {
    type: item["type"],
    filters: !item["filters"] ? item["filters"] : webSearchToolFiltersSerializer(item["filters"]),
    user_location: !item["user_location"]
      ? item["user_location"]
      : webSearchApproximateLocationSerializer(item["user_location"]),
    search_context_size: item["search_context_size"],
    custom_search_configuration: !item["custom_search_configuration"]
      ? item["custom_search_configuration"]
      : webSearchConfigurationSerializer(item["custom_search_configuration"]),
  };
}

export function webSearchToolDeserializer(item: any): WebSearchTool {
  return {
    type: item["type"],
    filters: !item["filters"] ? item["filters"] : webSearchToolFiltersDeserializer(item["filters"]),
    user_location: !item["user_location"]
      ? item["user_location"]
      : webSearchApproximateLocationDeserializer(item["user_location"]),
    search_context_size: item["search_context_size"],
    custom_search_configuration: !item["custom_search_configuration"]
      ? item["custom_search_configuration"]
      : webSearchConfigurationDeserializer(item["custom_search_configuration"]),
  };
}

/** model interface WebSearchToolFilters */
export interface WebSearchToolFilters {
  allowed_domains?: string[];
}

export function webSearchToolFiltersSerializer(item: WebSearchToolFilters): any {
  return {
    allowed_domains: !item["allowed_domains"]
      ? item["allowed_domains"]
      : item["allowed_domains"].map((p: any) => {
          return p;
        }),
  };
}

export function webSearchToolFiltersDeserializer(item: any): WebSearchToolFilters {
  return {
    allowed_domains: !item["allowed_domains"]
      ? item["allowed_domains"]
      : item["allowed_domains"].map((p1: any) => {
          return p1;
        }),
  };
}

/** The approximate location of the user. */
export interface WebSearchApproximateLocation {
  /** The type of location approximation. Always `approximate`. */
  type?: "approximate";
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
}

export function webSearchApproximateLocationSerializer(item: WebSearchApproximateLocation): any {
  return {
    type: item["type"],
    country: item["country"],
    region: item["region"],
    city: item["city"],
    timezone: item["timezone"],
  };
}

export function webSearchApproximateLocationDeserializer(item: any): WebSearchApproximateLocation {
  return {
    type: item["type"],
    country: item["country"],
    region: item["region"],
    city: item["city"],
    timezone: item["timezone"],
  };
}

/** A web search configuration for bing custom search */
export interface WebSearchConfiguration {
  /** Project connection id for grounding with bing custom search */
  project_connection_id: string;
  /** Name of the custom configuration instance given to config. */
  instance_name: string;
}

export function webSearchConfigurationSerializer(item: WebSearchConfiguration): any {
  return {
    project_connection_id: item["project_connection_id"],
    instance_name: item["instance_name"],
  };
}

export function webSearchConfigurationDeserializer(item: any): WebSearchConfiguration {
  return {
    project_connection_id: item["project_connection_id"],
    instance_name: item["instance_name"],
  };
}

/**
 * Give the model access to additional tools via remote Model Context Protocol
 * (MCP) servers. [Learn more about MCP](https://platform.openai.com/docs/guides/tools-remote-mcp).
 */
export interface MCPTool extends Tool {
  /** The type of the MCP tool. Always `mcp`. */
  type: "mcp";
  /** A label for this MCP server, used to identify it in tool calls. */
  server_label: string;
  /**
   * The URL for the MCP server. One of `server_url` or `connector_id` must be
   *   provided.
   */
  server_url?: string;
  /**
   * Identifier for service connectors, like those available in ChatGPT. One of
   *   `server_url` or `connector_id` must be provided. Learn more about service
   *   connectors [here](https://platform.openai.com/docs/guides/tools-remote-mcp#connectors).
   *   Currently supported `connector_id` values are:
   *   - Dropbox: `connector_dropbox`
   *   - Gmail: `connector_gmail`
   *   - Google Calendar: `connector_googlecalendar`
   *   - Google Drive: `connector_googledrive`
   *   - Microsoft Teams: `connector_microsoftteams`
   *   - Outlook Calendar: `connector_outlookcalendar`
   *   - Outlook Email: `connector_outlookemail`
   *   - SharePoint: `connector_sharepoint`
   */
  connector_id?:
    | "connector_dropbox"
    | "connector_gmail"
    | "connector_googlecalendar"
    | "connector_googledrive"
    | "connector_microsoftteams"
    | "connector_outlookcalendar"
    | "connector_outlookemail"
    | "connector_sharepoint";
  /**
   * An OAuth access token that can be used with a remote MCP server, either
   *   with a custom MCP server URL or a service connector. Your application
   *   must handle the OAuth authorization flow and provide the token here.
   */
  authorization?: string;
  /** Optional description of the MCP server, used to provide more context. */
  server_description?: string;
  headers?: Record<string, string>;
  allowed_tools?: string[] | MCPToolFilter;
  require_approval?: MCPToolRequireApproval | "always" | "never";
  /** The connection ID in the project for the MCP server. The connection stores authentication and other connection details needed to connect to the MCP server. */
  project_connection_id?: string;
}

export function mcpToolSerializer(item: MCPTool): any {
  return {
    type: item["type"],
    server_label: item["server_label"],
    server_url: item["server_url"],
    connector_id: item["connector_id"],
    authorization: item["authorization"],
    server_description: item["server_description"],
    headers: item["headers"],
    allowed_tools: !item["allowed_tools"]
      ? item["allowed_tools"]
      : _mcpToolAllowedToolsSerializer(item["allowed_tools"]),
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _mcpToolRequireApprovalSerializer(item["require_approval"]),
    project_connection_id: item["project_connection_id"],
  };
}

export function mcpToolDeserializer(item: any): MCPTool {
  return {
    type: item["type"],
    server_label: item["server_label"],
    server_url: item["server_url"],
    connector_id: item["connector_id"],
    authorization: item["authorization"],
    server_description: item["server_description"],
    headers: !item["headers"]
      ? item["headers"]
      : Object.fromEntries(
          Object.entries(item["headers"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
    allowed_tools: !item["allowed_tools"]
      ? item["allowed_tools"]
      : _mcpToolAllowedToolsDeserializer(item["allowed_tools"]),
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _mcpToolRequireApprovalDeserializer(item["require_approval"]),
    project_connection_id: item["project_connection_id"],
  };
}

/** Alias for _MCPToolAllowedTools */
export type _MCPToolAllowedTools = string[] | MCPToolFilter;

export function _mcpToolAllowedToolsSerializer(item: _MCPToolAllowedTools): any {
  return item;
}

export function _mcpToolAllowedToolsDeserializer(item: any): _MCPToolAllowedTools {
  return item;
}

/** A filter object to specify which tools are allowed. */
export interface MCPToolFilter {
  /** List of allowed tool names. */
  tool_names?: string[];
  /**
   * Indicates whether or not a tool modifies data or is read-only. If an
   *   MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
   *   it will match this filter.
   */
  read_only?: boolean;
}

export function mcpToolFilterSerializer(item: MCPToolFilter): any {
  return {
    tool_names: !item["tool_names"]
      ? item["tool_names"]
      : item["tool_names"].map((p: any) => {
          return p;
        }),
    read_only: item["read_only"],
  };
}

export function mcpToolFilterDeserializer(item: any): MCPToolFilter {
  return {
    tool_names: !item["tool_names"]
      ? item["tool_names"]
      : item["tool_names"].map((p: any) => {
          return p;
        }),
    read_only: item["read_only"],
  };
}

/** Alias for _MCPToolRequireApproval */
export type _MCPToolRequireApproval = MCPToolRequireApproval | "always" | "never";

export function _mcpToolRequireApprovalSerializer(item: _MCPToolRequireApproval): any {
  return item;
}

export function _mcpToolRequireApprovalDeserializer(item: any): _MCPToolRequireApproval {
  return item;
}

/** model interface MCPToolRequireApproval */
export interface MCPToolRequireApproval {
  always?: MCPToolFilter;
  never?: MCPToolFilter;
}

export function mcpToolRequireApprovalSerializer(item: MCPToolRequireApproval): any {
  return {
    always: !item["always"] ? item["always"] : mcpToolFilterSerializer(item["always"]),
    never: !item["never"] ? item["never"] : mcpToolFilterSerializer(item["never"]),
  };
}

export function mcpToolRequireApprovalDeserializer(item: any): MCPToolRequireApproval {
  return {
    always: !item["always"] ? item["always"] : mcpToolFilterDeserializer(item["always"]),
    never: !item["never"] ? item["never"] : mcpToolFilterDeserializer(item["never"]),
  };
}

/** A tool that generates images using the GPT image models. */
export interface ImageGenTool extends Tool {
  /** The type of the image generation tool. Always `image_generation`. */
  type: "image_generation";
  model?: "gpt-image-1" | "gpt-image-1-mini";
  /**
   * The quality of the generated image. One of `low`, `medium`, `high`,
   *   or `auto`. Default: `auto`.
   */
  quality?: "low" | "medium" | "high" | "auto";
  /**
   * The size of the generated image. One of `1024x1024`, `1024x1536`,
   *   `1536x1024`, or `auto`. Default: `auto`.
   */
  size?: "1024x1024" | "1024x1536" | "1536x1024" | "auto";
  /**
   * The output format of the generated image. One of `png`, `webp`, or
   *   `jpeg`. Default: `png`.
   */
  output_format?: "png" | "webp" | "jpeg";
  /** Compression level for the output image. Default: 100. */
  output_compression?: number;
  /** Moderation level for the generated image. Default: `auto`. */
  moderation?: "auto" | "low";
  /**
   * Background type for the generated image. One of `transparent`,
   *   `opaque`, or `auto`. Default: `auto`.
   */
  background?: "transparent" | "opaque" | "auto";
  input_fidelity?: InputFidelity;
  /**
   * Optional mask for inpainting. Contains `image_url`
   *   (string, optional) and `file_id` (string, optional).
   */
  input_image_mask?: ImageGenToolInputImageMask;
  /** Number of partial images to generate in streaming mode, from 0 (default value) to 3. */
  partial_images?: number;
}

export function imageGenToolSerializer(item: ImageGenTool): any {
  return {
    type: item["type"],
    model: item["model"],
    quality: item["quality"],
    size: item["size"],
    output_format: item["output_format"],
    output_compression: item["output_compression"],
    moderation: item["moderation"],
    background: item["background"],
    input_fidelity: item["input_fidelity"],
    input_image_mask: !item["input_image_mask"]
      ? item["input_image_mask"]
      : imageGenToolInputImageMaskSerializer(item["input_image_mask"]),
    partial_images: item["partial_images"],
  };
}

export function imageGenToolDeserializer(item: any): ImageGenTool {
  return {
    type: item["type"],
    model: item["model"],
    quality: item["quality"],
    size: item["size"],
    output_format: item["output_format"],
    output_compression: item["output_compression"],
    moderation: item["moderation"],
    background: item["background"],
    input_fidelity: item["input_fidelity"],
    input_image_mask: !item["input_image_mask"]
      ? item["input_image_mask"]
      : imageGenToolInputImageMaskDeserializer(item["input_image_mask"]),
    partial_images: item["partial_images"],
  };
}

/** Control how much effort the model will exert to match the style and features, especially facial features, of input images. This parameter is only supported for `gpt-image-1`. Unsupported for `gpt-image-1-mini`. Supports `high` and `low`. Defaults to `low`. */
export type InputFidelity = "high" | "low";

/** model interface ImageGenToolInputImageMask */
export interface ImageGenToolInputImageMask {
  image_url?: string;
  file_id?: string;
}

export function imageGenToolInputImageMaskSerializer(item: ImageGenToolInputImageMask): any {
  return { image_url: item["image_url"], file_id: item["file_id"] };
}

export function imageGenToolInputImageMaskDeserializer(item: any): ImageGenToolInputImageMask {
  return {
    image_url: item["image_url"],
    file_id: item["file_id"],
  };
}

/** A tool that allows the model to execute shell commands in a local environment. */
export interface LocalShellToolParam extends Tool {
  /** The type of the local shell tool. Always `local_shell`. */
  type: "local_shell";
}

export function localShellToolParamSerializer(item: LocalShellToolParam): any {
  return { type: item["type"] };
}

export function localShellToolParamDeserializer(item: any): LocalShellToolParam {
  return {
    type: item["type"],
  };
}

/** A tool that allows the model to execute shell commands. */
export interface FunctionShellToolParam extends Tool {
  /** The type of the shell tool. Always `shell`. */
  type: "shell";
}

export function functionShellToolParamSerializer(item: FunctionShellToolParam): any {
  return { type: item["type"] };
}

export function functionShellToolParamDeserializer(item: any): FunctionShellToolParam {
  return {
    type: item["type"],
  };
}

/** A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools) */
export interface CustomToolParam extends Tool {
  /** The type of the custom tool. Always `custom`. */
  type: "custom";
  /** The name of the custom tool, used to identify it in tool calls. */
  name: string;
  /** Optional description of the custom tool, used to provide more context. */
  description?: string;
  /** The input format for the custom tool. Default is unconstrained text. */
  format?: CustomToolParamFormatUnion;
}

export function customToolParamSerializer(item: CustomToolParam): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    format: !item["format"] ? item["format"] : customToolParamFormatUnionSerializer(item["format"]),
  };
}

export function customToolParamDeserializer(item: any): CustomToolParam {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    format: !item["format"]
      ? item["format"]
      : customToolParamFormatUnionDeserializer(item["format"]),
  };
}

/** The input format for the custom tool. Default is unconstrained text. */
export interface CustomToolParamFormat {
  type: CustomToolParamFormatType;
}

export function customToolParamFormatSerializer(item: CustomToolParamFormat): any {
  return { type: item["type"] };
}

export function customToolParamFormatDeserializer(item: any): CustomToolParamFormat {
  return {
    type: item["type"],
  };
}

/** Alias for CustomToolParamFormatUnion */
export type CustomToolParamFormatUnion =
  | CustomTextFormatParam
  | CustomGrammarFormatParam
  | CustomToolParamFormat;

export function customToolParamFormatUnionSerializer(item: CustomToolParamFormatUnion): any {
  switch (item.type) {
    case "text":
      return customTextFormatParamSerializer(item as CustomTextFormatParam);

    case "grammar":
      return customGrammarFormatParamSerializer(item as CustomGrammarFormatParam);

    default:
      return customToolParamFormatSerializer(item);
  }
}

export function customToolParamFormatUnionDeserializer(item: any): CustomToolParamFormatUnion {
  switch (item.type) {
    case "text":
      return customTextFormatParamDeserializer(item as CustomTextFormatParam);

    case "grammar":
      return customGrammarFormatParamDeserializer(item as CustomGrammarFormatParam);

    default:
      return customToolParamFormatDeserializer(item);
  }
}

/** Type of CustomToolParamFormatType */
export type CustomToolParamFormatType = "text" | "grammar";

/** Unconstrained free-form text. */
export interface CustomTextFormatParam extends CustomToolParamFormat {
  /** Unconstrained text format. Always `text`. */
  type: "text";
}

export function customTextFormatParamSerializer(item: CustomTextFormatParam): any {
  return { type: item["type"] };
}

export function customTextFormatParamDeserializer(item: any): CustomTextFormatParam {
  return {
    type: item["type"],
  };
}

/** A grammar defined by the user. */
export interface CustomGrammarFormatParam extends CustomToolParamFormat {
  /** Grammar format. Always `grammar`. */
  type: "grammar";
  /** The syntax of the grammar definition. One of `lark` or `regex`. */
  syntax: GrammarSyntax1;
  /** The grammar definition. */
  definition: string;
}

export function customGrammarFormatParamSerializer(item: CustomGrammarFormatParam): any {
  return { type: item["type"], syntax: item["syntax"], definition: item["definition"] };
}

export function customGrammarFormatParamDeserializer(item: any): CustomGrammarFormatParam {
  return {
    type: item["type"],
    syntax: item["syntax"],
    definition: item["definition"],
  };
}

/** Type of GrammarSyntax1 */
export type GrammarSyntax1 = "lark" | "regex";

/** This tool searches the web for relevant results to use in a response. Learn more about the [web search tool](https://platform.openai.com/docs/guides/tools-web-search). */
export interface WebSearchPreviewTool extends Tool {
  /** The type of the web search tool. One of `web_search_preview` or `web_search_preview_2025_03_11`. */
  type: "web_search_preview";
  user_location?: ApproximateLocation;
  /** High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default. */
  search_context_size?: SearchContextSize;
}

export function webSearchPreviewToolSerializer(item: WebSearchPreviewTool): any {
  return {
    type: item["type"],
    user_location: !item["user_location"]
      ? item["user_location"]
      : approximateLocationSerializer(item["user_location"]),
    search_context_size: item["search_context_size"],
  };
}

export function webSearchPreviewToolDeserializer(item: any): WebSearchPreviewTool {
  return {
    type: item["type"],
    user_location: !item["user_location"]
      ? item["user_location"]
      : approximateLocationDeserializer(item["user_location"]),
    search_context_size: item["search_context_size"],
  };
}

/** model interface ApproximateLocation */
export interface ApproximateLocation {
  /** The type of location approximation. Always `approximate`. */
  type: "approximate";
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
}

export function approximateLocationSerializer(item: ApproximateLocation): any {
  return {
    type: item["type"],
    country: item["country"],
    region: item["region"],
    city: item["city"],
    timezone: item["timezone"],
  };
}

export function approximateLocationDeserializer(item: any): ApproximateLocation {
  return {
    type: item["type"],
    country: item["country"],
    region: item["region"],
    city: item["city"],
    timezone: item["timezone"],
  };
}

/** Type of SearchContextSize */
export type SearchContextSize = "low" | "medium" | "high";

/** Allows the assistant to create, delete, or update files using unified diffs. */
export interface ApplyPatchToolParam extends Tool {
  /** The type of the tool. Always `apply_patch`. */
  type: "apply_patch";
}

export function applyPatchToolParamSerializer(item: ApplyPatchToolParam): any {
  return { type: item["type"] };
}

export function applyPatchToolParamDeserializer(item: any): ApplyPatchToolParam {
  return {
    type: item["type"],
  };
}

/** Alias for _PromptAgentDefinitionToolChoice */
export type _PromptAgentDefinitionToolChoice = string | ToolChoiceParamUnion;

export function _promptAgentDefinitionToolChoiceSerializer(
  item: _PromptAgentDefinitionToolChoice,
): any {
  return item;
}

export function _promptAgentDefinitionToolChoiceDeserializer(
  item: any,
): _PromptAgentDefinitionToolChoice {
  return item;
}

/**
 * How the model should select which tool (or tools) to use when generating
 * a response. See the `tools` parameter to see how to specify which tools
 * the model can call.
 */
export interface ToolChoiceParam {
  type: ToolChoiceParamType;
}

export function toolChoiceParamSerializer(item: ToolChoiceParam): any {
  return { type: item["type"] };
}

export function toolChoiceParamDeserializer(item: any): ToolChoiceParam {
  return {
    type: item["type"],
  };
}

/** Alias for ToolChoiceParamUnion */
export type ToolChoiceParamUnion =
  | ToolChoiceAllowed
  | ToolChoiceFunction
  | ToolChoiceMCP
  | ToolChoiceCustom
  | SpecificApplyPatchParam
  | SpecificFunctionShellParam
  | ToolChoiceFileSearch
  | ToolChoiceWebSearchPreview
  | ToolChoiceComputerUsePreview
  | ToolChoiceWebSearchPreview20250311
  | ToolChoiceImageGeneration
  | ToolChoiceCodeInterpreter
  | ToolChoiceParam;

export function toolChoiceParamUnionSerializer(item: ToolChoiceParamUnion): any {
  switch (item.type) {
    case "allowed_tools":
      return toolChoiceAllowedSerializer(item as ToolChoiceAllowed);

    case "function":
      return toolChoiceFunctionSerializer(item as ToolChoiceFunction);

    case "mcp":
      return toolChoiceMCPSerializer(item as ToolChoiceMCP);

    case "custom":
      return toolChoiceCustomSerializer(item as ToolChoiceCustom);

    case "apply_patch":
      return specificApplyPatchParamSerializer(item as SpecificApplyPatchParam);

    case "shell":
      return specificFunctionShellParamSerializer(item as SpecificFunctionShellParam);

    case "file_search":
      return toolChoiceFileSearchSerializer(item as ToolChoiceFileSearch);

    case "web_search_preview":
      return toolChoiceWebSearchPreviewSerializer(item as ToolChoiceWebSearchPreview);

    case "computer_use_preview":
      return toolChoiceComputerUsePreviewSerializer(item as ToolChoiceComputerUsePreview);

    case "web_search_preview_2025_03_11":
      return toolChoiceWebSearchPreview20250311Serializer(
        item as ToolChoiceWebSearchPreview20250311,
      );

    case "image_generation":
      return toolChoiceImageGenerationSerializer(item as ToolChoiceImageGeneration);

    case "code_interpreter":
      return toolChoiceCodeInterpreterSerializer(item as ToolChoiceCodeInterpreter);

    default:
      return toolChoiceParamSerializer(item);
  }
}

export function toolChoiceParamUnionDeserializer(item: any): ToolChoiceParamUnion {
  switch (item.type) {
    case "allowed_tools":
      return toolChoiceAllowedDeserializer(item as ToolChoiceAllowed);

    case "function":
      return toolChoiceFunctionDeserializer(item as ToolChoiceFunction);

    case "mcp":
      return toolChoiceMCPDeserializer(item as ToolChoiceMCP);

    case "custom":
      return toolChoiceCustomDeserializer(item as ToolChoiceCustom);

    case "apply_patch":
      return specificApplyPatchParamDeserializer(item as SpecificApplyPatchParam);

    case "shell":
      return specificFunctionShellParamDeserializer(item as SpecificFunctionShellParam);

    case "file_search":
      return toolChoiceFileSearchDeserializer(item as ToolChoiceFileSearch);

    case "web_search_preview":
      return toolChoiceWebSearchPreviewDeserializer(item as ToolChoiceWebSearchPreview);

    case "computer_use_preview":
      return toolChoiceComputerUsePreviewDeserializer(item as ToolChoiceComputerUsePreview);

    case "web_search_preview_2025_03_11":
      return toolChoiceWebSearchPreview20250311Deserializer(
        item as ToolChoiceWebSearchPreview20250311,
      );

    case "image_generation":
      return toolChoiceImageGenerationDeserializer(item as ToolChoiceImageGeneration);

    case "code_interpreter":
      return toolChoiceCodeInterpreterDeserializer(item as ToolChoiceCodeInterpreter);

    default:
      return toolChoiceParamDeserializer(item);
  }
}

/** Type of ToolChoiceParamType */
export type ToolChoiceParamType =
  | "allowed_tools"
  | "function"
  | "mcp"
  | "custom"
  | "apply_patch"
  | "shell"
  | "file_search"
  | "web_search_preview"
  | "computer_use_preview"
  | "web_search_preview_2025_03_11"
  | "image_generation"
  | "code_interpreter";

/** Constrains the tools available to the model to a pre-defined set. */
export interface ToolChoiceAllowed extends ToolChoiceParam {
  /** Allowed tool configuration type. Always `allowed_tools`. */
  type: "allowed_tools";
  /**
   * Constrains the tools available to the model to a pre-defined set.
   *   `auto` allows the model to pick from among the allowed tools and generate a
   *   message.
   *   `required` requires the model to call one or more of the allowed tools.
   */
  mode: "auto" | "required";
  /**
   * A list of tool definitions that the model should be allowed to call.
   *   For the Responses API, the list of tool definitions might look like:
   *   ```json
   *   [
   *     { "type": "function", "name": "get_weather" },
   *     { "type": "mcp", "server_label": "deepwiki" },
   *     { "type": "image_generation" }
   *   ]
   *   ```
   */
  tools: Record<string, unknown>[];
}

export function toolChoiceAllowedSerializer(item: ToolChoiceAllowed): any {
  return {
    type: item["type"],
    mode: item["mode"],
    tools: item["tools"].map((p: any) => {
      return p;
    }),
  };
}

export function toolChoiceAllowedDeserializer(item: any): ToolChoiceAllowed {
  return {
    type: item["type"],
    mode: item["mode"],
    tools: item["tools"].map((p: any) => {
      return Object.fromEntries(Object.entries(p).map(([k1, p1]: [string, any]) => [k1, p1]));
    }),
  };
}

/** Use this option to force the model to call a specific function. */
export interface ToolChoiceFunction extends ToolChoiceParam {
  /** For function calling, the type is always `function`. */
  type: "function";
  /** The name of the function to call. */
  name: string;
}

export function toolChoiceFunctionSerializer(item: ToolChoiceFunction): any {
  return { type: item["type"], name: item["name"] };
}

export function toolChoiceFunctionDeserializer(item: any): ToolChoiceFunction {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** Use this option to force the model to call a specific tool on a remote MCP server. */
export interface ToolChoiceMCP extends ToolChoiceParam {
  /** For MCP tools, the type is always `mcp`. */
  type: "mcp";
  /** The label of the MCP server to use. */
  server_label: string;
  name?: string;
}

export function toolChoiceMCPSerializer(item: ToolChoiceMCP): any {
  return { type: item["type"], server_label: item["server_label"], name: item["name"] };
}

export function toolChoiceMCPDeserializer(item: any): ToolChoiceMCP {
  return {
    type: item["type"],
    server_label: item["server_label"],
    name: item["name"],
  };
}

/** Use this option to force the model to call a specific custom tool. */
export interface ToolChoiceCustom extends ToolChoiceParam {
  /** For custom tool calling, the type is always `custom`. */
  type: "custom";
  /** The name of the custom tool to call. */
  name: string;
}

export function toolChoiceCustomSerializer(item: ToolChoiceCustom): any {
  return { type: item["type"], name: item["name"] };
}

export function toolChoiceCustomDeserializer(item: any): ToolChoiceCustom {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** Forces the model to call the apply_patch tool when executing a tool call. */
export interface SpecificApplyPatchParam extends ToolChoiceParam {
  /** The tool to call. Always `apply_patch`. */
  type: "apply_patch";
}

export function specificApplyPatchParamSerializer(item: SpecificApplyPatchParam): any {
  return { type: item["type"] };
}

export function specificApplyPatchParamDeserializer(item: any): SpecificApplyPatchParam {
  return {
    type: item["type"],
  };
}

/** Forces the model to call the shell tool when a tool call is required. */
export interface SpecificFunctionShellParam extends ToolChoiceParam {
  /** The tool to call. Always `shell`. */
  type: "shell";
}

export function specificFunctionShellParamSerializer(item: SpecificFunctionShellParam): any {
  return { type: item["type"] };
}

export function specificFunctionShellParamDeserializer(item: any): SpecificFunctionShellParam {
  return {
    type: item["type"],
  };
}

/**
 * Indicates that the model should use a built-in tool to generate a response.
 * [Learn more about built-in tools](https://platform.openai.com/docs/guides/tools).
 */
export interface ToolChoiceFileSearch extends ToolChoiceParam {
  type: "file_search";
}

export function toolChoiceFileSearchSerializer(item: ToolChoiceFileSearch): any {
  return { type: item["type"] };
}

export function toolChoiceFileSearchDeserializer(item: any): ToolChoiceFileSearch {
  return {
    type: item["type"],
  };
}

/**
 * Indicates that the model should use a built-in tool to generate a response.
 * [Learn more about built-in tools](https://platform.openai.com/docs/guides/tools).
 */
export interface ToolChoiceWebSearchPreview extends ToolChoiceParam {
  type: "web_search_preview";
}

export function toolChoiceWebSearchPreviewSerializer(item: ToolChoiceWebSearchPreview): any {
  return { type: item["type"] };
}

export function toolChoiceWebSearchPreviewDeserializer(item: any): ToolChoiceWebSearchPreview {
  return {
    type: item["type"],
  };
}

/**
 * Indicates that the model should use a built-in tool to generate a response.
 * [Learn more about built-in tools](https://platform.openai.com/docs/guides/tools).
 */
export interface ToolChoiceComputerUsePreview extends ToolChoiceParam {
  type: "computer_use_preview";
}

export function toolChoiceComputerUsePreviewSerializer(item: ToolChoiceComputerUsePreview): any {
  return { type: item["type"] };
}

export function toolChoiceComputerUsePreviewDeserializer(item: any): ToolChoiceComputerUsePreview {
  return {
    type: item["type"],
  };
}

/**
 * Indicates that the model should use a built-in tool to generate a response.
 * [Learn more about built-in tools](https://platform.openai.com/docs/guides/tools).
 */
export interface ToolChoiceWebSearchPreview20250311 extends ToolChoiceParam {
  type: "web_search_preview_2025_03_11";
}

export function toolChoiceWebSearchPreview20250311Serializer(
  item: ToolChoiceWebSearchPreview20250311,
): any {
  return { type: item["type"] };
}

export function toolChoiceWebSearchPreview20250311Deserializer(
  item: any,
): ToolChoiceWebSearchPreview20250311 {
  return {
    type: item["type"],
  };
}

/**
 * Indicates that the model should use a built-in tool to generate a response.
 * [Learn more about built-in tools](https://platform.openai.com/docs/guides/tools).
 */
export interface ToolChoiceImageGeneration extends ToolChoiceParam {
  type: "image_generation";
}

export function toolChoiceImageGenerationSerializer(item: ToolChoiceImageGeneration): any {
  return { type: item["type"] };
}

export function toolChoiceImageGenerationDeserializer(item: any): ToolChoiceImageGeneration {
  return {
    type: item["type"],
  };
}

/**
 * Indicates that the model should use a built-in tool to generate a response.
 * [Learn more about built-in tools](https://platform.openai.com/docs/guides/tools).
 */
export interface ToolChoiceCodeInterpreter extends ToolChoiceParam {
  type: "code_interpreter";
}

export function toolChoiceCodeInterpreterSerializer(item: ToolChoiceCodeInterpreter): any {
  return { type: item["type"] };
}

export function toolChoiceCodeInterpreterDeserializer(item: any): ToolChoiceCodeInterpreter {
  return {
    type: item["type"],
  };
}

/** Configuration options for a text response from the model. Can be plain text or structured JSON data. */
export interface PromptAgentDefinitionTextOptions {
  format?: TextResponseFormatConfigurationUnion;
}

export function promptAgentDefinitionTextOptionsSerializer(
  item: PromptAgentDefinitionTextOptions,
): any {
  return {
    format: !item["format"]
      ? item["format"]
      : textResponseFormatConfigurationUnionSerializer(item["format"]),
  };
}

export function promptAgentDefinitionTextOptionsDeserializer(
  item: any,
): PromptAgentDefinitionTextOptions {
  return {
    format: !item["format"]
      ? item["format"]
      : textResponseFormatConfigurationUnionDeserializer(item["format"]),
  };
}

/**
 * An object specifying the format that the model must output.
 * Configuring `{ "type": "json_schema" }` enables Structured Outputs,
 * which ensures the model will match your supplied JSON schema. Learn more in the
 * [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).
 * The default format is `{ "type": "text" }` with no additional options.
 * *Not recommended for gpt-4o and newer models:**
 * Setting to `{ "type": "json_object" }` enables the older JSON mode, which
 * ensures the message the model generates is valid JSON. Using `json_schema`
 * is preferred for models that support it.
 */
export interface TextResponseFormatConfiguration {
  type: TextResponseFormatConfigurationType;
}

export function textResponseFormatConfigurationSerializer(
  item: TextResponseFormatConfiguration,
): any {
  return { type: item["type"] };
}

export function textResponseFormatConfigurationDeserializer(
  item: any,
): TextResponseFormatConfiguration {
  return {
    type: item["type"],
  };
}

/** Alias for TextResponseFormatConfigurationUnion */
export type TextResponseFormatConfigurationUnion =
  | TextResponseFormatJsonSchema
  | TextResponseFormatConfigurationResponseFormatText
  | TextResponseFormatConfigurationResponseFormatJsonObject
  | TextResponseFormatConfiguration;

export function textResponseFormatConfigurationUnionSerializer(
  item: TextResponseFormatConfigurationUnion,
): any {
  switch (item.type) {
    case "json_schema":
      return textResponseFormatJsonSchemaSerializer(item as TextResponseFormatJsonSchema);

    case "text":
      return textResponseFormatConfigurationResponseFormatTextSerializer(
        item as TextResponseFormatConfigurationResponseFormatText,
      );

    case "json_object":
      return textResponseFormatConfigurationResponseFormatJsonObjectSerializer(
        item as TextResponseFormatConfigurationResponseFormatJsonObject,
      );

    default:
      return textResponseFormatConfigurationSerializer(item);
  }
}

export function textResponseFormatConfigurationUnionDeserializer(
  item: any,
): TextResponseFormatConfigurationUnion {
  switch (item.type) {
    case "json_schema":
      return textResponseFormatJsonSchemaDeserializer(item as TextResponseFormatJsonSchema);

    case "text":
      return textResponseFormatConfigurationResponseFormatTextDeserializer(
        item as TextResponseFormatConfigurationResponseFormatText,
      );

    case "json_object":
      return textResponseFormatConfigurationResponseFormatJsonObjectDeserializer(
        item as TextResponseFormatConfigurationResponseFormatJsonObject,
      );

    default:
      return textResponseFormatConfigurationDeserializer(item);
  }
}

/** Type of TextResponseFormatConfigurationType */
export type TextResponseFormatConfigurationType = "text" | "json_schema" | "json_object";

/**
 * JSON Schema response format. Used to generate structured JSON responses.
 * Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).
 */
export interface TextResponseFormatJsonSchema extends TextResponseFormatConfiguration {
  /** The type of response format being defined. Always `json_schema`. */
  type: "json_schema";
  /**
   * A description of what the response format is for, used by the model to
   *   determine how to respond in the format.
   */
  description?: string;
  /**
   * The name of the response format. Must be a-z, A-Z, 0-9, or contain
   *   underscores and dashes, with a maximum length of 64.
   */
  name: string;
  schema: Record<string, unknown>;
  strict?: boolean;
}

export function textResponseFormatJsonSchemaSerializer(item: TextResponseFormatJsonSchema): any {
  return {
    type: item["type"],
    description: item["description"],
    name: item["name"],
    schema: item["schema"],
    strict: item["strict"],
  };
}

export function textResponseFormatJsonSchemaDeserializer(item: any): TextResponseFormatJsonSchema {
  return {
    type: item["type"],
    description: item["description"],
    name: item["name"],
    schema: Object.fromEntries(
      Object.entries(item["schema"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    strict: item["strict"],
  };
}

/** Default response format. Used to generate text responses. */
export interface TextResponseFormatConfigurationResponseFormatText extends TextResponseFormatConfiguration {
  /** The type of response format being defined. Always `text`. */
  type: "text";
}

export function textResponseFormatConfigurationResponseFormatTextSerializer(
  item: TextResponseFormatConfigurationResponseFormatText,
): any {
  return { type: item["type"] };
}

export function textResponseFormatConfigurationResponseFormatTextDeserializer(
  item: any,
): TextResponseFormatConfigurationResponseFormatText {
  return {
    type: item["type"],
  };
}

/**
 * JSON object response format. An older method of generating JSON responses.
 * Using `json_schema` is recommended for models that support it. Note that the
 * model will not generate JSON without a system or user message instructing it
 * to do so.
 */
export interface TextResponseFormatConfigurationResponseFormatJsonObject extends TextResponseFormatConfiguration {
  /** The type of response format being defined. Always `json_object`. */
  type: "json_object";
}

export function textResponseFormatConfigurationResponseFormatJsonObjectSerializer(
  item: TextResponseFormatConfigurationResponseFormatJsonObject,
): any {
  return { type: item["type"] };
}

export function textResponseFormatConfigurationResponseFormatJsonObjectDeserializer(
  item: any,
): TextResponseFormatConfigurationResponseFormatJsonObject {
  return {
    type: item["type"],
  };
}

export function structuredInputDefinitionRecordSerializer(
  item: Record<string, StructuredInputDefinition>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : structuredInputDefinitionSerializer(item[key]);
  });
  return result;
}

export function structuredInputDefinitionRecordDeserializer(
  item: Record<string, any>,
): Record<string, StructuredInputDefinition> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : structuredInputDefinitionDeserializer(item[key]);
  });
  return result;
}

/** An structured input that can participate in prompt template substitutions and tool argument binding. */
export interface StructuredInputDefinition {
  /** A human-readable description of the input. */
  description?: string;
  /** The default value for the input if no run-time value is provided. */
  default_value?: any;
  /** The JSON schema for the structured input (optional). */
  schema?: Record<string, unknown>;
  /** Whether the input property is required when the agent is invoked. */
  required?: boolean;
}

export function structuredInputDefinitionSerializer(item: StructuredInputDefinition): any {
  return {
    description: item["description"],
    default_value: item["default_value"],
    schema: item["schema"],
    required: item["required"],
  };
}

export function structuredInputDefinitionDeserializer(item: any): StructuredInputDefinition {
  return {
    description: item["description"],
    default_value: item["default_value"],
    schema: !item["schema"]
      ? item["schema"]
      : Object.fromEntries(Object.entries(item["schema"]).map(([k, p]: [string, any]) => [k, p])),
    required: item["required"],
  };
}

/** The workflow agent definition. */
export interface WorkflowAgentDefinition extends AgentDefinition {
  kind: "workflow";
  /** The CSDL YAML definition of the workflow. */
  workflow?: string;
}

export function workflowAgentDefinitionSerializer(item: WorkflowAgentDefinition): any {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"] ? item["rai_config"] : raiConfigSerializer(item["rai_config"]),
    workflow: item["workflow"],
  };
}

export function workflowAgentDefinitionDeserializer(item: any): WorkflowAgentDefinition {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"]
      ? item["rai_config"]
      : raiConfigDeserializer(item["rai_config"]),
    workflow: item["workflow"],
  };
}

/** The hosted agent definition. */
export interface HostedAgentDefinition extends AgentDefinition {
  kind: "hosted";
  /**
   * An array of tools the hosted agent's model may call while generating a response. You
   * can specify which tool to use by setting the `tool_choice` parameter.
   */
  tools?: ToolUnion[];
  /** The protocols that the agent supports for ingress communication of the containers. */
  container_protocol_versions: ProtocolVersionRecord[];
  /** The CPU configuration for the hosted agent. */
  cpu: string;
  /** The memory configuration for the hosted agent. */
  memory: string;
  /** Environment variables to set in the hosted agent container. */
  environment_variables?: Record<string, string>;
  /** The image ID for the agent, applicable to image-based hosted agents. */
  image?: string;
}

export function hostedAgentDefinitionSerializer(item: HostedAgentDefinition): any {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"] ? item["rai_config"] : raiConfigSerializer(item["rai_config"]),
    tools: !item["tools"] ? item["tools"] : toolUnionArraySerializer(item["tools"]),
    container_protocol_versions: protocolVersionRecordArraySerializer(
      item["container_protocol_versions"],
    ),
    cpu: item["cpu"],
    memory: item["memory"],
    environment_variables: item["environment_variables"],
    image: item["image"],
  };
}

export function hostedAgentDefinitionDeserializer(item: any): HostedAgentDefinition {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"]
      ? item["rai_config"]
      : raiConfigDeserializer(item["rai_config"]),
    tools: !item["tools"] ? item["tools"] : toolUnionArrayDeserializer(item["tools"]),
    container_protocol_versions: protocolVersionRecordArrayDeserializer(
      item["container_protocol_versions"],
    ),
    cpu: item["cpu"],
    memory: item["memory"],
    environment_variables: !item["environment_variables"]
      ? item["environment_variables"]
      : Object.fromEntries(
          Object.entries(item["environment_variables"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    image: item["image"],
  };
}

export function protocolVersionRecordArraySerializer(result: Array<ProtocolVersionRecord>): any[] {
  return result.map((item) => {
    return protocolVersionRecordSerializer(item);
  });
}

export function protocolVersionRecordArrayDeserializer(
  result: Array<ProtocolVersionRecord>,
): any[] {
  return result.map((item) => {
    return protocolVersionRecordDeserializer(item);
  });
}

/** A record mapping for a single protocol and its version. */
export interface ProtocolVersionRecord {
  /** The protocol type. */
  protocol: AgentProtocol;
  /** The version string for the protocol, e.g. 'v0.1.1'. */
  version: string;
}

export function protocolVersionRecordSerializer(item: ProtocolVersionRecord): any {
  return { protocol: item["protocol"], version: item["version"] };
}

export function protocolVersionRecordDeserializer(item: any): ProtocolVersionRecord {
  return {
    protocol: item["protocol"],
    version: item["version"],
  };
}

/** Type of AgentProtocol */
export type AgentProtocol = "activity_protocol" | "responses";

/** The container app agent definition. */
export interface ContainerAppAgentDefinition extends AgentDefinition {
  kind: "container_app";
  /** The protocols that the agent supports for ingress communication of the containers. */
  container_protocol_versions: ProtocolVersionRecord[];
  /** The resource ID of the Azure Container App that hosts this agent. Not mutable across versions. */
  container_app_resource_id: string;
  /** The suffix to apply to the app subdomain when sending ingress to the agent. This can be a label (e.g., '---current'), a specific revision (e.g., '--0000001'), or empty to use the default endpoint for the container app. */
  ingress_subdomain_suffix: string;
}

export function containerAppAgentDefinitionSerializer(item: ContainerAppAgentDefinition): any {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"] ? item["rai_config"] : raiConfigSerializer(item["rai_config"]),
    container_protocol_versions: protocolVersionRecordArraySerializer(
      item["container_protocol_versions"],
    ),
    container_app_resource_id: item["container_app_resource_id"],
    ingress_subdomain_suffix: item["ingress_subdomain_suffix"],
  };
}

export function containerAppAgentDefinitionDeserializer(item: any): ContainerAppAgentDefinition {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"]
      ? item["rai_config"]
      : raiConfigDeserializer(item["rai_config"]),
    container_protocol_versions: protocolVersionRecordArrayDeserializer(
      item["container_protocol_versions"],
    ),
    container_app_resource_id: item["container_app_resource_id"],
    ingress_subdomain_suffix: item["ingress_subdomain_suffix"],
  };
}

/** Error response for API failures. */
export interface ApiErrorResponse {
  error: ErrorModel;
}

export function apiErrorResponseDeserializer(item: any): ApiErrorResponse {
  return {
    error: errorDeserializer(item["error"]),
  };
}

/** model interface ErrorModel */
export interface ErrorModel {
  code: string;
  message: string;
  param?: string;
  type?: string;
  details?: ErrorModel[];
  additionalInfo?: Record<string, unknown>;
  debugInfo?: Record<string, unknown>;
}

export function errorDeserializer(item: any): ErrorModel {
  return {
    code: item["code"],
    message: item["message"],
    param: item["param"],
    type: item["type"],
    details: !item["details"] ? item["details"] : errorArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : Object.fromEntries(
          Object.entries(item["additionalInfo"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    debugInfo: !item["debugInfo"]
      ? item["debugInfo"]
      : Object.fromEntries(
          Object.entries(item["debugInfo"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function errorArrayDeserializer(result: Array<ErrorModel>): any[] {
  return result.map((item) => {
    return errorDeserializer(item);
  });
}

/** A deleted agent Object */
export interface DeleteAgentResponse {
  /** The object type. Always 'agent.deleted'. */
  object: "agent.deleted";
  /** The name of the agent. */
  name: string;
  /** Whether the agent was successfully deleted. */
  deleted: boolean;
}

export function deleteAgentResponseDeserializer(item: any): DeleteAgentResponse {
  return {
    object: item["object"],
    name: item["name"],
    deleted: item["deleted"],
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultAgentObject {
  /** The requested list of items. */
  data: Agent[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultAgentObjectDeserializer(
  item: any,
): _AgentsPagedResultAgentObject {
  return {
    data: agentArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function agentArrayDeserializer(result: Array<Agent>): any[] {
  return result.map((item) => {
    return agentDeserializer(item);
  });
}

/** A deleted agent version Object */
export interface DeleteAgentVersionResponse {
  /** The object type. Always 'agent.version.deleted'. */
  object: "agent.version.deleted";
  /** The name of the agent. */
  name: string;
  /** The version identifier of the agent. */
  version: string;
  /** Whether the agent was successfully deleted. */
  deleted: boolean;
}

export function deleteAgentVersionResponseDeserializer(item: any): DeleteAgentVersionResponse {
  return {
    object: item["object"],
    name: item["name"],
    version: item["version"],
    deleted: item["deleted"],
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultAgentVersionObject {
  /** The requested list of items. */
  data: AgentVersion[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultAgentVersionObjectDeserializer(
  item: any,
): _AgentsPagedResultAgentVersionObject {
  return {
    data: agentVersionArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function agentVersionArrayDeserializer(result: Array<AgentVersion>): any[] {
  return result.map((item) => {
    return agentVersionDeserializer(item);
  });
}

/** Evaluation rule model. */
export interface EvaluationRule {
  /** Unique identifier for the evaluation rule. */
  readonly id: string;
  /** Display Name for the evaluation rule. */
  displayName?: string;
  /** Description for the evaluation rule. */
  description?: string;
  /** Definition of the evaluation rule action. */
  action: EvaluationRuleActionUnion;
  /** Filter condition of the evaluation rule. */
  filter?: EvaluationRuleFilter;
  /** Event type that the evaluation rule applies to. */
  eventType: EvaluationRuleEventType;
  /** Indicates whether the evaluation rule is enabled. Default is true. */
  enabled: boolean;
  /** System metadata for the evaluation rule. */
  readonly systemData: Record<string, string>;
}

export function evaluationRuleSerializer(item: EvaluationRule): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    action: evaluationRuleActionUnionSerializer(item["action"]),
    filter: !item["filter"] ? item["filter"] : evaluationRuleFilterSerializer(item["filter"]),
    eventType: item["eventType"],
    enabled: item["enabled"],
  };
}

export function evaluationRuleDeserializer(item: any): EvaluationRule {
  return {
    id: item["id"],
    displayName: item["displayName"],
    description: item["description"],
    action: evaluationRuleActionUnionDeserializer(item["action"]),
    filter: !item["filter"] ? item["filter"] : evaluationRuleFilterDeserializer(item["filter"]),
    eventType: item["eventType"],
    enabled: item["enabled"],
    systemData: Object.fromEntries(
      Object.entries(item["systemData"]).map(([k, p]: [string, any]) => [k, p]),
    ),
  };
}

/** Evaluation action model. */
export interface EvaluationRuleAction {
  /** Type of the evaluation action. */
  /** The discriminator possible values: continuousEvaluation, humanEvaluationPreview */
  type: EvaluationRuleActionType;
}

export function evaluationRuleActionSerializer(item: EvaluationRuleAction): any {
  return { type: item["type"] };
}

export function evaluationRuleActionDeserializer(item: any): EvaluationRuleAction {
  return {
    type: item["type"],
  };
}

/** Alias for EvaluationRuleActionUnion */
export type EvaluationRuleActionUnion =
  | ContinuousEvaluationRuleAction
  | HumanEvaluationPreviewRuleAction
  | EvaluationRuleAction;

export function evaluationRuleActionUnionSerializer(item: EvaluationRuleActionUnion): any {
  switch (item.type) {
    case "continuousEvaluation":
      return continuousEvaluationRuleActionSerializer(item as ContinuousEvaluationRuleAction);

    case "humanEvaluationPreview":
      return humanEvaluationPreviewRuleActionSerializer(item as HumanEvaluationPreviewRuleAction);

    default:
      return evaluationRuleActionSerializer(item);
  }
}

export function evaluationRuleActionUnionDeserializer(item: any): EvaluationRuleActionUnion {
  switch (item.type) {
    case "continuousEvaluation":
      return continuousEvaluationRuleActionDeserializer(item as ContinuousEvaluationRuleAction);

    case "humanEvaluationPreview":
      return humanEvaluationPreviewRuleActionDeserializer(item as HumanEvaluationPreviewRuleAction);

    default:
      return evaluationRuleActionDeserializer(item);
  }
}

/** Type of the evaluation action. */
export type EvaluationRuleActionType = "continuousEvaluation" | "humanEvaluationPreview";

/** Evaluation rule action for continuous evaluation. */
export interface ContinuousEvaluationRuleAction extends EvaluationRuleAction {
  type: "continuousEvaluation";
  /** Eval Id to add continuous evaluation runs to. */
  evalId: string;
  /** Maximum number of evaluation runs allowed per hour. */
  maxHourlyRuns?: number;
}

export function continuousEvaluationRuleActionSerializer(
  item: ContinuousEvaluationRuleAction,
): any {
  return { type: item["type"], evalId: item["evalId"], maxHourlyRuns: item["maxHourlyRuns"] };
}

export function continuousEvaluationRuleActionDeserializer(
  item: any,
): ContinuousEvaluationRuleAction {
  return {
    type: item["type"],
    evalId: item["evalId"],
    maxHourlyRuns: item["maxHourlyRuns"],
  };
}

/** Evaluation rule action for human evaluation. */
export interface HumanEvaluationPreviewRuleAction extends EvaluationRuleAction {
  type: "humanEvaluationPreview";
  /** Human evaluation template Id. */
  templateId: string;
}

export function humanEvaluationPreviewRuleActionSerializer(
  item: HumanEvaluationPreviewRuleAction,
): any {
  return { type: item["type"], templateId: item["templateId"] };
}

export function humanEvaluationPreviewRuleActionDeserializer(
  item: any,
): HumanEvaluationPreviewRuleAction {
  return {
    type: item["type"],
    templateId: item["templateId"],
  };
}

/** Evaluation filter model. */
export interface EvaluationRuleFilter {
  /** Filter by agent name. */
  agentName: string;
}

export function evaluationRuleFilterSerializer(item: EvaluationRuleFilter): any {
  return { agentName: item["agentName"] };
}

export function evaluationRuleFilterDeserializer(item: any): EvaluationRuleFilter {
  return {
    agentName: item["agentName"],
  };
}

/** Type of the evaluation rule event. */
export type EvaluationRuleEventType = "responseCompleted" | "manual";

/** Paged collection of EvaluationRule items */
export interface _PagedEvaluationRule {
  /** The EvaluationRule items on this page */
  value: EvaluationRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedEvaluationRuleDeserializer(item: any): _PagedEvaluationRule {
  return {
    value: evaluationRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function evaluationRuleArraySerializer(result: Array<EvaluationRule>): any[] {
  return result.map((item) => {
    return evaluationRuleSerializer(item);
  });
}

export function evaluationRuleArrayDeserializer(result: Array<EvaluationRule>): any[] {
  return result.map((item) => {
    return evaluationRuleDeserializer(item);
  });
}

/** Response from the list and get connections operations */
export interface Connection {
  /** The friendly name of the connection, provided by the user. */
  readonly name: string;
  /** A unique identifier for the connection, generated by the service */
  readonly id: string;
  /** Category of the connection */
  readonly type: ConnectionType;
  /** The connection URL to be used for this service */
  readonly target: string;
  /** Whether the connection is tagged as the default connection of its type */
  readonly isDefault: boolean;
  /** The credentials used by the connection */
  readonly credentials: BaseCredentialsUnion;
  /** Metadata of the connection */
  readonly metadata: Record<string, string>;
}

export function connectionDeserializer(item: any): Connection {
  return {
    name: item["name"],
    id: item["id"],
    type: item["type"],
    target: item["target"],
    isDefault: item["isDefault"],
    credentials: baseCredentialsUnionDeserializer(item["credentials"]),
    metadata: Object.fromEntries(
      Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p]),
    ),
  };
}

/** The Type (or category) of the connection */
export type ConnectionType =
  | "AzureOpenAI"
  | "AzureBlob"
  | "AzureStorageAccount"
  | "CognitiveSearch"
  | "CosmosDB"
  | "ApiKey"
  | "AppConfig"
  | "AppInsights"
  | "CustomKeys"
  | "RemoteTool_Preview";

/** A base class for connection credentials */
export interface BaseCredentials {
  /** The type of credential used by the connection */
  /** The discriminator possible values: ApiKey, AAD, CustomKeys, SAS, None, AgenticIdentityToken_Preview */
  readonly type: CredentialType;
}

export function baseCredentialsDeserializer(item: any): BaseCredentials {
  return {
    type: item["type"],
  };
}

/** Alias for BaseCredentialsUnion */
export type BaseCredentialsUnion =
  | ApiKeyCredentials
  | EntraIDCredentials
  | CustomCredential
  | SASTokenCredentials
  | NoAuthenticationCredentials
  | AgenticIdentityPreviewCredentials
  | BaseCredentials;

export function baseCredentialsUnionDeserializer(item: any): BaseCredentialsUnion {
  switch (item.type) {
    case "ApiKey":
      return apiKeyCredentialsDeserializer(item as ApiKeyCredentials);

    case "AAD":
      return entraIDCredentialsDeserializer(item as EntraIDCredentials);

    case "CustomKeys":
      return customCredentialDeserializer(item as CustomCredential);

    case "SAS":
      return sasCredentialsDeserializer(item as SASTokenCredentials);

    case "None":
      return noAuthenticationCredentialsDeserializer(item as NoAuthenticationCredentials);

    case "AgenticIdentityToken_Preview":
      return agenticIdentityPreviewCredentialsDeserializer(
        item as AgenticIdentityPreviewCredentials,
      );

    default:
      return baseCredentialsDeserializer(item);
  }
}

/** The credential type used by the connection */
export type CredentialType =
  | "ApiKey"
  | "AAD"
  | "SAS"
  | "CustomKeys"
  | "None"
  | "AgenticIdentityToken_Preview";

/** API Key Credential definition */
export interface ApiKeyCredentials extends BaseCredentials {
  /** The credential type */
  readonly type: "ApiKey";
  /** API Key */
  readonly apiKey?: string;
}

export function apiKeyCredentialsDeserializer(item: any): ApiKeyCredentials {
  return {
    type: item["type"],
    apiKey: item["key"],
  };
}

/** Entra ID credential definition */
export interface EntraIDCredentials extends BaseCredentials {
  /** The credential type */
  readonly type: "AAD";
}

export function entraIDCredentialsDeserializer(item: any): EntraIDCredentials {
  return {
    type: item["type"],
  };
}

/** Custom credential definition */
export interface CustomCredential extends BaseCredentials {
  /** The credential type */
  readonly type: "CustomKeys";
  /** Additional properties */
  additionalProperties?: Record<string, string>;
}

export function customCredentialDeserializer(item: any): CustomCredential {
  return {
    additionalProperties: serializeRecord(item, ["type"]),
    type: item["type"],
  };
}

/** Shared Access Signature (SAS) credential definition */
export interface SASTokenCredentials extends BaseCredentials {
  /** The credential type */
  readonly type: "SAS";
  /** SAS token */
  readonly sasToken?: string;
}

export function sasCredentialsDeserializer(item: any): SASTokenCredentials {
  return {
    type: item["type"],
    sasToken: item["SAS"],
  };
}

/** Credentials that do not require authentication */
export interface NoAuthenticationCredentials extends BaseCredentials {
  /** The credential type */
  readonly type: "None";
}

export function noAuthenticationCredentialsDeserializer(item: any): NoAuthenticationCredentials {
  return {
    type: item["type"],
  };
}

/** Agentic identity credential definition */
export interface AgenticIdentityPreviewCredentials extends BaseCredentials {
  /** The credential type */
  readonly type: "AgenticIdentityToken_Preview";
}

export function agenticIdentityPreviewCredentialsDeserializer(
  item: any,
): AgenticIdentityPreviewCredentials {
  return {
    type: item["type"],
  };
}

/** Paged collection of Connection items */
export interface _PagedConnection {
  /** The Connection items on this page */
  value: Connection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedConnectionDeserializer(item: any): _PagedConnection {
  return {
    value: connectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function connectionArrayDeserializer(result: Array<Connection>): any[] {
  return result.map((item) => {
    return connectionDeserializer(item);
  });
}

/** Paged collection of DatasetVersion items */
export interface _PagedDatasetVersion {
  /** The DatasetVersion items on this page */
  value: DatasetVersionUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedDatasetVersionDeserializer(item: any): _PagedDatasetVersion {
  return {
    value: datasetVersionUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function datasetVersionUnionArraySerializer(result: Array<DatasetVersionUnion>): any[] {
  return result.map((item) => {
    return datasetVersionUnionSerializer(item);
  });
}

export function datasetVersionUnionArrayDeserializer(result: Array<DatasetVersionUnion>): any[] {
  return result.map((item) => {
    return datasetVersionUnionDeserializer(item);
  });
}

/** DatasetVersion Definition */
export interface DatasetVersion {
  /** URI of the data ([example](https://go.microsoft.com/fwlink/?linkid=2202330)) */
  dataUri: string;
  /** Dataset type */
  /** The discriminator possible values: uri_file, uri_folder */
  type: DatasetType;
  /** Indicates if the dataset holds a reference to the storage, or the dataset manages storage itself. If true, the underlying data will not be deleted when the dataset version is deleted */
  readonly isReference?: boolean;
  /** The Azure Storage Account connection name. Required if startPendingUploadVersion was not called before creating the Dataset */
  connectionName?: string;
  /** Asset ID, a unique identifier for the asset */
  readonly id?: string;
  /** The name of the resource */
  readonly name: string;
  /** The version of the resource */
  readonly version: string;
  /** The asset description text. */
  description?: string;
  /** Tag dictionary. Tags can be added, removed, and updated. */
  tags?: Record<string, string>;
}

export function datasetVersionSerializer(item: DatasetVersion): any {
  return {
    dataUri: item["dataUri"],
    type: item["type"],
    connectionName: item["connectionName"],
    description: item["description"],
    tags: item["tags"],
  };
}

export function datasetVersionDeserializer(item: any): DatasetVersion {
  return {
    dataUri: item["dataUri"],
    type: item["type"],
    isReference: item["isReference"],
    connectionName: item["connectionName"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Alias for DatasetVersionUnion */
export type DatasetVersionUnion = FileDatasetVersion | FolderDatasetVersion | DatasetVersion;

export function datasetVersionUnionSerializer(item: DatasetVersionUnion): any {
  switch (item.type) {
    case "uri_file":
      return fileDatasetVersionSerializer(item as FileDatasetVersion);

    case "uri_folder":
      return folderDatasetVersionSerializer(item as FolderDatasetVersion);

    default:
      return datasetVersionSerializer(item);
  }
}

export function datasetVersionUnionDeserializer(item: any): DatasetVersionUnion {
  switch (item.type) {
    case "uri_file":
      return fileDatasetVersionDeserializer(item as FileDatasetVersion);

    case "uri_folder":
      return folderDatasetVersionDeserializer(item as FolderDatasetVersion);

    default:
      return datasetVersionDeserializer(item);
  }
}

/** Enum to determine the type of data. */
export type DatasetType = "uri_file" | "uri_folder";

/** FileDatasetVersion Definition */
export interface FileDatasetVersion extends DatasetVersion {
  /** Dataset type */
  type: "uri_file";
}

export function fileDatasetVersionSerializer(item: FileDatasetVersion): any {
  return {
    dataUri: item["dataUri"],
    type: item["type"],
    connectionName: item["connectionName"],
    description: item["description"],
    tags: item["tags"],
  };
}

export function fileDatasetVersionDeserializer(item: any): FileDatasetVersion {
  return {
    dataUri: item["dataUri"],
    type: item["type"],
    isReference: item["isReference"],
    connectionName: item["connectionName"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** FileDatasetVersion Definition */
export interface FolderDatasetVersion extends DatasetVersion {
  /** Dataset type */
  type: "uri_folder";
}

export function folderDatasetVersionSerializer(item: FolderDatasetVersion): any {
  return {
    dataUri: item["dataUri"],
    type: item["type"],
    connectionName: item["connectionName"],
    description: item["description"],
    tags: item["tags"],
  };
}

export function folderDatasetVersionDeserializer(item: any): FolderDatasetVersion {
  return {
    dataUri: item["dataUri"],
    type: item["type"],
    isReference: item["isReference"],
    connectionName: item["connectionName"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Represents a request for a pending upload. */
export interface PendingUploadRequest {
  /** If PendingUploadId is not provided, a random GUID will be used. */
  pendingUploadId?: string;
  /** Azure Storage Account connection name to use for generating temporary SAS token */
  connectionName?: string;
  /** BlobReference is the only supported type. */
  pendingUploadType: "BlobReference";
}

export function pendingUploadRequestSerializer(item: PendingUploadRequest): any {
  return {
    pendingUploadId: item["pendingUploadId"],
    connectionName: item["connectionName"],
    pendingUploadType: item["pendingUploadType"],
  };
}

/** Represents the response for a pending upload request */
export interface PendingUploadResponse {
  /** Container-level read, write, list SAS. */
  blobReference: BlobReference;
  /** ID for this upload request. */
  pendingUploadId: string;
  /** Version of asset to be created if user did not specify version when initially creating upload */
  version?: string;
  /** BlobReference is the only supported type */
  pendingUploadType: "BlobReference";
}

export function pendingUploadResponseDeserializer(item: any): PendingUploadResponse {
  return {
    blobReference: blobReferenceDeserializer(item["blobReference"]),
    pendingUploadId: item["pendingUploadId"],
    version: item["version"],
    pendingUploadType: item["pendingUploadType"],
  };
}

/** Blob reference details. */
export interface BlobReference {
  /** Blob URI path for client to upload data. Example: `https://blob.windows.core.net/Container/Path` */
  blobUri: string;
  /** ARM ID of the storage account to use. */
  storageAccountArmId: string;
  /** Credential info to access the storage account. */
  credential: SasCredential;
}

export function blobReferenceDeserializer(item: any): BlobReference {
  return {
    blobUri: item["blobUri"],
    storageAccountArmId: item["storageAccountArmId"],
    credential: blobReferenceSasCredentialDeserializer(item["credential"]),
  };
}

/** SAS Credential definition */
export interface SasCredential {
  /** SAS uri */
  readonly sasUri: string;
  /** Type of credential */
  readonly type: "SAS";
}

export function blobReferenceSasCredentialDeserializer(item: any): SasCredential {
  return {
    sasUri: item["sasUri"],
    type: item["type"],
  };
}

/** Represents a reference to a blob for consumption */
export interface DatasetCredential {
  /** Credential info to access the storage account. */
  blobReference: BlobReference;
}

export function datasetCredentialDeserializer(item: any): DatasetCredential {
  return {
    blobReference: blobReferenceDeserializer(item["blobReference"]),
  };
}

/** Model Deployment Definition */
export interface Deployment {
  /** The type of the deployment */
  /** The discriminator possible values: ModelDeployment */
  type: DeploymentType;
  /** Name of the deployment */
  readonly name: string;
}

export function deploymentDeserializer(item: any): Deployment {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** Alias for DeploymentUnion */
export type DeploymentUnion = ModelDeployment | Deployment;

export function deploymentUnionDeserializer(item: any): DeploymentUnion {
  switch (item.type) {
    case "ModelDeployment":
      return modelDeploymentDeserializer(item as ModelDeployment);

    default:
      return deploymentDeserializer(item);
  }
}

/** Type of DeploymentType */
export type DeploymentType = "ModelDeployment";

/** Model Deployment Definition */
export interface ModelDeployment extends Deployment {
  /** The type of the deployment */
  type: "ModelDeployment";
  /** Publisher-specific name of the deployed model */
  readonly modelName: string;
  /** Publisher-specific version of the deployed model */
  readonly modelVersion: string;
  /** Name of the deployed model's publisher */
  readonly modelPublisher: string;
  /** Capabilities of deployed model */
  readonly capabilities: Record<string, string>;
  /** Sku of the model deployment */
  readonly sku: ModelDeploymentSku;
  /** Name of the connection the deployment comes from */
  readonly connectionName?: string;
}

export function modelDeploymentDeserializer(item: any): ModelDeployment {
  return {
    type: item["type"],
    name: item["name"],
    modelName: item["modelName"],
    modelVersion: item["modelVersion"],
    modelPublisher: item["modelPublisher"],
    capabilities: Object.fromEntries(
      Object.entries(item["capabilities"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    sku: modelDeploymentSkuDeserializer(item["sku"]),
    connectionName: item["connectionName"],
  };
}

/** Sku information */
export interface ModelDeploymentSku {
  /** Sku capacity */
  capacity: number;
  /** Sku family */
  family: string;
  /** Sku name */
  name: string;
  /** Sku size */
  size: string;
  /** Sku tier */
  tier: string;
}

export function modelDeploymentSkuDeserializer(item: any): ModelDeploymentSku {
  return {
    capacity: item["capacity"],
    family: item["family"],
    name: item["name"],
    size: item["size"],
    tier: item["tier"],
  };
}

/** Paged collection of Deployment items */
export interface _PagedDeployment {
  /** The Deployment items on this page */
  value: DeploymentUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedDeploymentDeserializer(item: any): _PagedDeployment {
  return {
    value: deploymentUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deploymentUnionArrayDeserializer(result: Array<DeploymentUnion>): any[] {
  return result.map((item) => {
    return deploymentUnionDeserializer(item);
  });
}

/** Paged collection of Index items */
export interface _PagedIndex {
  /** The Index items on this page */
  value: IndexUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedIndexDeserializer(item: any): _PagedIndex {
  return {
    value: indexUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function indexUnionArraySerializer(result: Array<IndexUnion>): any[] {
  return result.map((item) => {
    return indexUnionSerializer(item);
  });
}

export function indexUnionArrayDeserializer(result: Array<IndexUnion>): any[] {
  return result.map((item) => {
    return indexUnionDeserializer(item);
  });
}

/** Index resource Definition */
export interface Index {
  /** Type of index */
  /** The discriminator possible values: AzureSearch, ManagedAzureSearch, CosmosDBNoSqlVectorStore */
  type: IndexType;
  /** Asset ID, a unique identifier for the asset */
  readonly id?: string;
  /** The name of the resource */
  readonly name: string;
  /** The version of the resource */
  readonly version: string;
  /** The asset description text. */
  description?: string;
  /** Tag dictionary. Tags can be added, removed, and updated. */
  tags?: Record<string, string>;
}

export function indexSerializer(item: Index): any {
  return { type: item["type"], description: item["description"], tags: item["tags"] };
}

export function indexDeserializer(item: any): Index {
  return {
    type: item["type"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Alias for IndexUnion */
export type IndexUnion = AzureAISearchIndex | ManagedAzureAISearchIndex | CosmosDBIndex | Index;

export function indexUnionSerializer(item: IndexUnion): any {
  switch (item.type) {
    case "AzureSearch":
      return azureAISearchIndexSerializer(item as AzureAISearchIndex);

    case "ManagedAzureSearch":
      return managedAzureAISearchIndexSerializer(item as ManagedAzureAISearchIndex);

    case "CosmosDBNoSqlVectorStore":
      return cosmosDBIndexSerializer(item as CosmosDBIndex);

    default:
      return indexSerializer(item);
  }
}

export function indexUnionDeserializer(item: any): IndexUnion {
  switch (item.type) {
    case "AzureSearch":
      return azureAISearchIndexDeserializer(item as AzureAISearchIndex);

    case "ManagedAzureSearch":
      return managedAzureAISearchIndexDeserializer(item as ManagedAzureAISearchIndex);

    case "CosmosDBNoSqlVectorStore":
      return cosmosDBIndexDeserializer(item as CosmosDBIndex);

    default:
      return indexDeserializer(item);
  }
}

/** Type of IndexType */
export type IndexType = "AzureSearch" | "CosmosDBNoSqlVectorStore" | "ManagedAzureSearch";

/** Azure AI Search Index Definition */
export interface AzureAISearchIndex extends Index {
  /** Type of index */
  type: "AzureSearch";
  /** Name of connection to Azure AI Search */
  connectionName: string;
  /** Name of index in Azure AI Search resource to attach */
  indexName: string;
  /** Field mapping configuration */
  fieldMapping?: FieldMapping;
}

export function azureAISearchIndexSerializer(item: AzureAISearchIndex): any {
  return {
    type: item["type"],
    description: item["description"],
    tags: item["tags"],
    connectionName: item["connectionName"],
    indexName: item["indexName"],
    fieldMapping: !item["fieldMapping"]
      ? item["fieldMapping"]
      : fieldMappingSerializer(item["fieldMapping"]),
  };
}

export function azureAISearchIndexDeserializer(item: any): AzureAISearchIndex {
  return {
    type: item["type"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    connectionName: item["connectionName"],
    indexName: item["indexName"],
    fieldMapping: !item["fieldMapping"]
      ? item["fieldMapping"]
      : fieldMappingDeserializer(item["fieldMapping"]),
  };
}

/** Field mapping configuration class */
export interface FieldMapping {
  /** List of fields with text content */
  contentFields: string[];
  /** Path of file to be used as a source of text content */
  filepathField?: string;
  /** Field containing the title of the document */
  titleField?: string;
  /** Field containing the url of the document */
  urlField?: string;
  /** List of fields with vector content */
  vectorFields?: string[];
  /** List of fields with metadata content */
  metadataFields?: string[];
}

export function fieldMappingSerializer(item: FieldMapping): any {
  return {
    contentFields: item["contentFields"].map((p: any) => {
      return p;
    }),
    filepathField: item["filepathField"],
    titleField: item["titleField"],
    urlField: item["urlField"],
    vectorFields: !item["vectorFields"]
      ? item["vectorFields"]
      : item["vectorFields"].map((p: any) => {
          return p;
        }),
    metadataFields: !item["metadataFields"]
      ? item["metadataFields"]
      : item["metadataFields"].map((p: any) => {
          return p;
        }),
  };
}

export function fieldMappingDeserializer(item: any): FieldMapping {
  return {
    contentFields: item["contentFields"].map((p: any) => {
      return p;
    }),
    filepathField: item["filepathField"],
    titleField: item["titleField"],
    urlField: item["urlField"],
    vectorFields: !item["vectorFields"]
      ? item["vectorFields"]
      : item["vectorFields"].map((p: any) => {
          return p;
        }),
    metadataFields: !item["metadataFields"]
      ? item["metadataFields"]
      : item["metadataFields"].map((p: any) => {
          return p;
        }),
  };
}

/** Managed Azure AI Search Index Definition */
export interface ManagedAzureAISearchIndex extends Index {
  /** Type of index */
  type: "ManagedAzureSearch";
  /** Vector store id of managed index */
  vectorStoreId: string;
}

export function managedAzureAISearchIndexSerializer(item: ManagedAzureAISearchIndex): any {
  return {
    type: item["type"],
    description: item["description"],
    tags: item["tags"],
    vectorStoreId: item["vectorStoreId"],
  };
}

export function managedAzureAISearchIndexDeserializer(item: any): ManagedAzureAISearchIndex {
  return {
    type: item["type"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    vectorStoreId: item["vectorStoreId"],
  };
}

/** CosmosDB Vector Store Index Definition */
export interface CosmosDBIndex extends Index {
  /** Type of index */
  type: "CosmosDBNoSqlVectorStore";
  /** Name of connection to CosmosDB */
  connectionName: string;
  /** Name of the CosmosDB Database */
  databaseName: string;
  /** Name of CosmosDB Container */
  containerName: string;
  /** Embedding model configuration */
  embeddingConfiguration: EmbeddingConfiguration;
  /** Field mapping configuration */
  fieldMapping: FieldMapping;
}

export function cosmosDBIndexSerializer(item: CosmosDBIndex): any {
  return {
    type: item["type"],
    description: item["description"],
    tags: item["tags"],
    connectionName: item["connectionName"],
    databaseName: item["databaseName"],
    containerName: item["containerName"],
    embeddingConfiguration: embeddingConfigurationSerializer(item["embeddingConfiguration"]),
    fieldMapping: fieldMappingSerializer(item["fieldMapping"]),
  };
}

export function cosmosDBIndexDeserializer(item: any): CosmosDBIndex {
  return {
    type: item["type"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    connectionName: item["connectionName"],
    databaseName: item["databaseName"],
    containerName: item["containerName"],
    embeddingConfiguration: embeddingConfigurationDeserializer(item["embeddingConfiguration"]),
    fieldMapping: fieldMappingDeserializer(item["fieldMapping"]),
  };
}

/** Embedding configuration class */
export interface EmbeddingConfiguration {
  /** Deployment name of embedding model. It can point to a model deployment either in the parent AIServices or a connection. */
  modelDeploymentName: string;
  /** Embedding field */
  embeddingField: string;
}

export function embeddingConfigurationSerializer(item: EmbeddingConfiguration): any {
  return {
    modelDeploymentName: item["modelDeploymentName"],
    embeddingField: item["embeddingField"],
  };
}

export function embeddingConfigurationDeserializer(item: any): EmbeddingConfiguration {
  return {
    modelDeploymentName: item["modelDeploymentName"],
    embeddingField: item["embeddingField"],
  };
}

/** Evaluation Taxonomy Definition */
export interface EvaluationTaxonomy {
  /** Asset ID, a unique identifier for the asset */
  readonly id?: string;
  /** The name of the resource */
  readonly name: string;
  /** The version of the resource */
  readonly version: string;
  /** The asset description text. */
  description?: string;
  /** Tag dictionary. Tags can be added, removed, and updated. */
  tags?: Record<string, string>;
  /** Input configuration for the evaluation taxonomy. */
  taxonomyInput: EvaluationTaxonomyInputUnion;
  /** List of taxonomy categories. */
  taxonomyCategories?: TaxonomyCategory[];
  /** Additional properties for the evaluation taxonomy. */
  properties?: Record<string, string>;
}

export function evaluationTaxonomySerializer(item: EvaluationTaxonomy): any {
  return {
    description: item["description"],
    tags: item["tags"],
    taxonomyInput: evaluationTaxonomyInputUnionSerializer(item["taxonomyInput"]),
    taxonomyCategories: !item["taxonomyCategories"]
      ? item["taxonomyCategories"]
      : taxonomyCategoryArraySerializer(item["taxonomyCategories"]),
    properties: item["properties"],
  };
}

export function evaluationTaxonomyDeserializer(item: any): EvaluationTaxonomy {
  return {
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    taxonomyInput: evaluationTaxonomyInputUnionDeserializer(item["taxonomyInput"]),
    taxonomyCategories: !item["taxonomyCategories"]
      ? item["taxonomyCategories"]
      : taxonomyCategoryArrayDeserializer(item["taxonomyCategories"]),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Input configuration for the evaluation taxonomy. */
export interface EvaluationTaxonomyInput {
  /** Input type of the evaluation taxonomy. */
  /** The discriminator possible values: agent */
  type: EvaluationTaxonomyInputType;
}

export function evaluationTaxonomyInputSerializer(item: EvaluationTaxonomyInput): any {
  return { type: item["type"] };
}

export function evaluationTaxonomyInputDeserializer(item: any): EvaluationTaxonomyInput {
  return {
    type: item["type"],
  };
}

/** Alias for EvaluationTaxonomyInputUnion */
export type EvaluationTaxonomyInputUnion = AgentTaxonomyInput | EvaluationTaxonomyInput;

export function evaluationTaxonomyInputUnionSerializer(item: EvaluationTaxonomyInputUnion): any {
  switch (item.type) {
    case "agent":
      return agentTaxonomyInputSerializer(item as AgentTaxonomyInput);

    default:
      return evaluationTaxonomyInputSerializer(item);
  }
}

export function evaluationTaxonomyInputUnionDeserializer(item: any): EvaluationTaxonomyInputUnion {
  switch (item.type) {
    case "agent":
      return agentTaxonomyInputDeserializer(item as AgentTaxonomyInput);

    default:
      return evaluationTaxonomyInputDeserializer(item);
  }
}

/** Type of the evaluation taxonomy input. */
export type EvaluationTaxonomyInputType = "agent" | "policy";

/** Input configuration for the evaluation taxonomy when the input type is agent. */
export interface AgentTaxonomyInput extends EvaluationTaxonomyInput {
  /** Input type of the evaluation taxonomy. */
  type: "agent";
  /** Target configuration for the agent. */
  target: TargetUnion;
  /** List of risk categories to evaluate against. */
  riskCategories: RiskCategory[];
}

export function agentTaxonomyInputSerializer(item: AgentTaxonomyInput): any {
  return {
    type: item["type"],
    target: targetUnionSerializer(item["target"]),
    riskCategories: item["riskCategories"].map((p: any) => {
      return p;
    }),
  };
}

export function agentTaxonomyInputDeserializer(item: any): AgentTaxonomyInput {
  return {
    type: item["type"],
    target: targetUnionDeserializer(item["target"]),
    riskCategories: item["riskCategories"].map((p: any) => {
      return p;
    }),
  };
}

/** Base class for targets with discriminator support. */
export interface Target {
  /** The type of target. */
  /** The discriminator possible values: azure_ai_model, azure_ai_agent */
  type: string;
}

export function targetSerializer(item: Target): any {
  return { type: item["type"] };
}

export function targetDeserializer(item: any): Target {
  return {
    type: item["type"],
  };
}

/** Alias for TargetUnion */
export type TargetUnion = AzureAIModelTarget | AzureAIAgentTarget | Target;

export function targetUnionSerializer(item: TargetUnion): any {
  switch (item.type) {
    case "azure_ai_model":
      return azureAIModelTargetSerializer(item as AzureAIModelTarget);

    case "azure_ai_agent":
      return azureAIAgentTargetSerializer(item as AzureAIAgentTarget);

    default:
      return targetSerializer(item);
  }
}

export function targetUnionDeserializer(item: any): TargetUnion {
  switch (item.type) {
    case "azure_ai_model":
      return azureAIModelTargetDeserializer(item as AzureAIModelTarget);

    case "azure_ai_agent":
      return azureAIAgentTargetDeserializer(item as AzureAIAgentTarget);

    default:
      return targetDeserializer(item);
  }
}

/** Represents a target specifying an Azure AI model for operations requiring model selection. */
export interface AzureAIModelTarget extends Target {
  /** The type of target, always `azure_ai_model`. */
  type: "azure_ai_model";
  /** The unique identifier of the Azure AI model. */
  model?: string;
  /** The parameters used to control the sampling behavior of the model during text generation. */
  sampling_params?: ModelSamplingParams;
}

export function azureAIModelTargetSerializer(item: AzureAIModelTarget): any {
  return {
    type: item["type"],
    model: item["model"],
    sampling_params: !item["sampling_params"]
      ? item["sampling_params"]
      : modelSamplingParamsSerializer(item["sampling_params"]),
  };
}

export function azureAIModelTargetDeserializer(item: any): AzureAIModelTarget {
  return {
    type: item["type"],
    model: item["model"],
    sampling_params: !item["sampling_params"]
      ? item["sampling_params"]
      : modelSamplingParamsDeserializer(item["sampling_params"]),
  };
}

/** Represents a set of parameters used to control the sampling behavior of a language model during text generation. */
export interface ModelSamplingParams {
  /** The temperature parameter for sampling. */
  temperature: number;
  /** The top-p parameter for nucleus sampling. */
  top_p: number;
  /** The random seed for reproducibility. */
  seed: number;
  /** The maximum number of tokens allowed in the completion. */
  max_completion_tokens: number;
}

export function modelSamplingParamsSerializer(item: ModelSamplingParams): any {
  return {
    temperature: item["temperature"],
    top_p: item["top_p"],
    seed: item["seed"],
    max_completion_tokens: item["max_completion_tokens"],
  };
}

export function modelSamplingParamsDeserializer(item: any): ModelSamplingParams {
  return {
    temperature: item["temperature"],
    top_p: item["top_p"],
    seed: item["seed"],
    max_completion_tokens: item["max_completion_tokens"],
  };
}

/** Represents a target specifying an Azure AI agent. */
export interface AzureAIAgentTarget extends Target {
  /** The type of target, always `azure_ai_agent`. */
  type: "azure_ai_agent";
  /** The unique identifier of the Azure AI agent. */
  name: string;
  /** The version of the Azure AI agent. */
  version?: string;
  /** The parameters used to control the sampling behavior of the agent during text generation. */
  tool_descriptions?: ToolDescription[];
}

export function azureAIAgentTargetSerializer(item: AzureAIAgentTarget): any {
  return {
    type: item["type"],
    name: item["name"],
    version: item["version"],
    tool_descriptions: !item["tool_descriptions"]
      ? item["tool_descriptions"]
      : toolDescriptionArraySerializer(item["tool_descriptions"]),
  };
}

export function azureAIAgentTargetDeserializer(item: any): AzureAIAgentTarget {
  return {
    type: item["type"],
    name: item["name"],
    version: item["version"],
    tool_descriptions: !item["tool_descriptions"]
      ? item["tool_descriptions"]
      : toolDescriptionArrayDeserializer(item["tool_descriptions"]),
  };
}

export function toolDescriptionArraySerializer(result: Array<ToolDescription>): any[] {
  return result.map((item) => {
    return toolDescriptionSerializer(item);
  });
}

export function toolDescriptionArrayDeserializer(result: Array<ToolDescription>): any[] {
  return result.map((item) => {
    return toolDescriptionDeserializer(item);
  });
}

/** Description of a tool that can be used by an agent. */
export interface ToolDescription {
  /** The name of the tool. */
  name?: string;
  /** A brief description of the tool's purpose. */
  description?: string;
}

export function toolDescriptionSerializer(item: ToolDescription): any {
  return { name: item["name"], description: item["description"] };
}

export function toolDescriptionDeserializer(item: any): ToolDescription {
  return {
    name: item["name"],
    description: item["description"],
  };
}

/** Risk category for the attack objective. */
export type RiskCategory =
  | "HateUnfairness"
  | "Violence"
  | "Sexual"
  | "SelfHarm"
  | "ProtectedMaterial"
  | "CodeVulnerability"
  | "UngroundedAttributes"
  | "ProhibitedActions"
  | "SensitiveDataLeakage"
  | "TaskAdherence";

export function taxonomyCategoryArraySerializer(result: Array<TaxonomyCategory>): any[] {
  return result.map((item) => {
    return taxonomyCategorySerializer(item);
  });
}

export function taxonomyCategoryArrayDeserializer(result: Array<TaxonomyCategory>): any[] {
  return result.map((item) => {
    return taxonomyCategoryDeserializer(item);
  });
}

/** Taxonomy category definition. */
export interface TaxonomyCategory {
  /** Unique identifier of the taxonomy category. */
  id: string;
  /** Name of the taxonomy category. */
  name: string;
  /** Description of the taxonomy category. */
  description?: string;
  /** Risk category associated with this taxonomy category. */
  riskCategory: RiskCategory;
  /** List of taxonomy sub categories. */
  subCategories: TaxonomySubCategory[];
  /** Additional properties for the taxonomy category. */
  properties?: Record<string, string>;
}

export function taxonomyCategorySerializer(item: TaxonomyCategory): any {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    riskCategory: item["riskCategory"],
    subCategories: taxonomySubCategoryArraySerializer(item["subCategories"]),
    properties: item["properties"],
  };
}

export function taxonomyCategoryDeserializer(item: any): TaxonomyCategory {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    riskCategory: item["riskCategory"],
    subCategories: taxonomySubCategoryArrayDeserializer(item["subCategories"]),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function taxonomySubCategoryArraySerializer(result: Array<TaxonomySubCategory>): any[] {
  return result.map((item) => {
    return taxonomySubCategorySerializer(item);
  });
}

export function taxonomySubCategoryArrayDeserializer(result: Array<TaxonomySubCategory>): any[] {
  return result.map((item) => {
    return taxonomySubCategoryDeserializer(item);
  });
}

/** Taxonomy sub-category definition. */
export interface TaxonomySubCategory {
  /** Unique identifier of the taxonomy sub-category. */
  id: string;
  /** Name of the taxonomy sub-category. */
  name: string;
  /** Description of the taxonomy sub-category. */
  description?: string;
  /** List of taxonomy items under this sub-category. */
  enabled: boolean;
  /** Additional properties for the taxonomy sub-category. */
  properties?: Record<string, string>;
}

export function taxonomySubCategorySerializer(item: TaxonomySubCategory): any {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    enabled: item["enabled"],
    properties: item["properties"],
  };
}

export function taxonomySubCategoryDeserializer(item: any): TaxonomySubCategory {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    enabled: item["enabled"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Paged collection of EvaluationTaxonomy items */
export interface _PagedEvaluationTaxonomy {
  /** The EvaluationTaxonomy items on this page */
  value: EvaluationTaxonomy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedEvaluationTaxonomyDeserializer(item: any): _PagedEvaluationTaxonomy {
  return {
    value: evaluationTaxonomyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function evaluationTaxonomyArraySerializer(result: Array<EvaluationTaxonomy>): any[] {
  return result.map((item) => {
    return evaluationTaxonomySerializer(item);
  });
}

export function evaluationTaxonomyArrayDeserializer(result: Array<EvaluationTaxonomy>): any[] {
  return result.map((item) => {
    return evaluationTaxonomyDeserializer(item);
  });
}

/** Paged collection of EvaluatorVersion items */
export interface _PagedEvaluatorVersion {
  /** The EvaluatorVersion items on this page */
  value: EvaluatorVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedEvaluatorVersionDeserializer(item: any): _PagedEvaluatorVersion {
  return {
    value: evaluatorVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function evaluatorVersionArraySerializer(result: Array<EvaluatorVersion>): any[] {
  return result.map((item) => {
    return evaluatorVersionSerializer(item);
  });
}

export function evaluatorVersionArrayDeserializer(result: Array<EvaluatorVersion>): any[] {
  return result.map((item) => {
    return evaluatorVersionDeserializer(item);
  });
}

/** Evaluator Definition */
export interface EvaluatorVersion {
  /** Display Name for evaluator. It helps to find the evaluator easily in AI Foundry. It does not need to be unique. */
  display_name?: string;
  /** Metadata about the evaluator */
  metadata?: Record<string, string>;
  /** The type of the evaluator */
  evaluator_type: EvaluatorType;
  /** The categories of the evaluator */
  categories: EvaluatorCategory[];
  /** Definition of the evaluator */
  definition: EvaluatorDefinitionUnion;
  /** Creator of the evaluator */
  readonly created_by?: string;
  /** Creation date/time of the evaluator */
  readonly created_at?: string;
  /** Last modified date/time of the evaluator */
  readonly modified_at?: string;
  /** Asset ID, a unique identifier for the asset */
  readonly id?: string;
  /** The name of the resource */
  readonly name: string;
  /** The version of the resource */
  readonly version?: string;
  /** The asset description text. */
  description?: string;
  /** Tag dictionary. Tags can be added, removed, and updated. */
  tags?: Record<string, string>;
}

export function evaluatorVersionSerializer(item: EvaluatorVersion): any {
  return {
    display_name: item["display_name"],
    metadata: item["metadata"],
    evaluator_type: item["evaluator_type"],
    categories: item["categories"].map((p: any) => {
      return p;
    }),
    definition: evaluatorDefinitionUnionSerializer(item["definition"]),
    description: item["description"],
    tags: item["tags"],
  };
}

export function evaluatorVersionDeserializer(item: any): EvaluatorVersion {
  return {
    display_name: item["display_name"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    evaluator_type: item["evaluator_type"],
    categories: item["categories"].map((p: any) => {
      return p;
    }),
    definition: evaluatorDefinitionUnionDeserializer(item["definition"]),
    created_by: item["created_by"],
    created_at: item["created_at"],
    modified_at: item["modified_at"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The type of the evaluator */
export type EvaluatorType = "builtin" | "custom";
/** The category of the evaluator */
export type EvaluatorCategory = "quality" | "safety" | "agents";

/** Base evaluator configuration with discriminator */
export interface EvaluatorDefinition {
  /** The type of evaluator definition */
  /** The discriminator possible values: code, prompt */
  type: EvaluatorDefinitionType;
  /** The JSON schema (Draft 2020-12) for the evaluator's input parameters. This includes parameters like type, properties, required. */
  init_parameters?: Record<string, unknown>;
  /** The JSON schema (Draft 2020-12) for the evaluator's input data. This includes parameters like type, properties, required. */
  data_schema?: Record<string, unknown>;
  /** List of output metrics produced by this evaluator */
  metrics?: Record<string, EvaluatorMetric>;
}

export function evaluatorDefinitionSerializer(item: EvaluatorDefinition): any {
  return {
    type: item["type"],
    init_parameters: item["init_parameters"],
    data_schema: item["data_schema"],
    metrics: !item["metrics"] ? item["metrics"] : evaluatorMetricRecordSerializer(item["metrics"]),
  };
}

export function evaluatorDefinitionDeserializer(item: any): EvaluatorDefinition {
  return {
    type: item["type"],
    init_parameters: !item["init_parameters"]
      ? item["init_parameters"]
      : Object.fromEntries(
          Object.entries(item["init_parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    data_schema: !item["data_schema"]
      ? item["data_schema"]
      : Object.fromEntries(
          Object.entries(item["data_schema"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    metrics: !item["metrics"]
      ? item["metrics"]
      : evaluatorMetricRecordDeserializer(item["metrics"]),
  };
}

/** Alias for EvaluatorDefinitionUnion */
export type EvaluatorDefinitionUnion =
  | CodeBasedEvaluatorDefinition
  | PromptBasedEvaluatorDefinition
  | EvaluatorDefinition;

export function evaluatorDefinitionUnionSerializer(item: EvaluatorDefinitionUnion): any {
  switch (item.type) {
    case "code":
      return codeBasedEvaluatorDefinitionSerializer(item as CodeBasedEvaluatorDefinition);

    case "prompt":
      return promptBasedEvaluatorDefinitionSerializer(item as PromptBasedEvaluatorDefinition);

    default:
      return evaluatorDefinitionSerializer(item);
  }
}

export function evaluatorDefinitionUnionDeserializer(item: any): EvaluatorDefinitionUnion {
  switch (item.type) {
    case "code":
      return codeBasedEvaluatorDefinitionDeserializer(item as CodeBasedEvaluatorDefinition);

    case "prompt":
      return promptBasedEvaluatorDefinitionDeserializer(item as PromptBasedEvaluatorDefinition);

    default:
      return evaluatorDefinitionDeserializer(item);
  }
}

/** The type of evaluator definition */
export type EvaluatorDefinitionType =
  | "prompt"
  | "code"
  | "prompt_and_code"
  | "service"
  | "openai_graders";

export function evaluatorMetricRecordSerializer(
  item: Record<string, EvaluatorMetric>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : evaluatorMetricSerializer(item[key]);
  });
  return result;
}

export function evaluatorMetricRecordDeserializer(
  item: Record<string, any>,
): Record<string, EvaluatorMetric> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : evaluatorMetricDeserializer(item[key]);
  });
  return result;
}

/** Evaluator Metric */
export interface EvaluatorMetric {
  /** Type of the metric. */
  type?: EvaluatorMetricType;
  /** It indicates whether a higher value is better or a lower value is better for this metric. */
  desirable_direction?: EvaluatorMetricDirection;
  /** Minimum value for the metric */
  min_value?: number;
  /** Maximum value for the metric. If not specified, it is assumed to be unbounded. */
  max_value?: number;
  /** Indicates if this metric is primary when there are multiple metrics. */
  is_primary?: boolean;
}

export function evaluatorMetricSerializer(item: EvaluatorMetric): any {
  return {
    type: item["type"],
    desirable_direction: item["desirable_direction"],
    min_value: item["min_value"],
    max_value: item["max_value"],
    is_primary: item["is_primary"],
  };
}

export function evaluatorMetricDeserializer(item: any): EvaluatorMetric {
  return {
    type: item["type"],
    desirable_direction: item["desirable_direction"],
    min_value: item["min_value"],
    max_value: item["max_value"],
    is_primary: item["is_primary"],
  };
}

/** The type of the evaluator */
export type EvaluatorMetricType = "ordinal" | "continuous" | "boolean";
/** The direction of the metric indicating whether a higher value is better, a lower value is better, or neutral */
export type EvaluatorMetricDirection = "increase" | "decrease" | "neutral";

/** Code-based evaluator definition using python code */
export interface CodeBasedEvaluatorDefinition extends EvaluatorDefinition {
  type: "code";
  /** Inline code text for the evaluator */
  code_text: string;
}

export function codeBasedEvaluatorDefinitionSerializer(item: CodeBasedEvaluatorDefinition): any {
  return {
    type: item["type"],
    init_parameters: item["init_parameters"],
    data_schema: item["data_schema"],
    metrics: !item["metrics"] ? item["metrics"] : evaluatorMetricRecordSerializer(item["metrics"]),
    code_text: item["code_text"],
  };
}

export function codeBasedEvaluatorDefinitionDeserializer(item: any): CodeBasedEvaluatorDefinition {
  return {
    type: item["type"],
    init_parameters: !item["init_parameters"]
      ? item["init_parameters"]
      : Object.fromEntries(
          Object.entries(item["init_parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    data_schema: !item["data_schema"]
      ? item["data_schema"]
      : Object.fromEntries(
          Object.entries(item["data_schema"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    metrics: !item["metrics"]
      ? item["metrics"]
      : evaluatorMetricRecordDeserializer(item["metrics"]),
    code_text: item["code_text"],
  };
}

/** Prompt-based evaluator */
export interface PromptBasedEvaluatorDefinition extends EvaluatorDefinition {
  type: "prompt";
  /** The prompt text used for evaluation */
  prompt_text: string;
}

export function promptBasedEvaluatorDefinitionSerializer(
  item: PromptBasedEvaluatorDefinition,
): any {
  return {
    type: item["type"],
    init_parameters: item["init_parameters"],
    data_schema: item["data_schema"],
    metrics: !item["metrics"] ? item["metrics"] : evaluatorMetricRecordSerializer(item["metrics"]),
    prompt_text: item["prompt_text"],
  };
}

export function promptBasedEvaluatorDefinitionDeserializer(
  item: any,
): PromptBasedEvaluatorDefinition {
  return {
    type: item["type"],
    init_parameters: !item["init_parameters"]
      ? item["init_parameters"]
      : Object.fromEntries(
          Object.entries(item["init_parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    data_schema: !item["data_schema"]
      ? item["data_schema"]
      : Object.fromEntries(
          Object.entries(item["data_schema"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    metrics: !item["metrics"]
      ? item["metrics"]
      : evaluatorMetricRecordDeserializer(item["metrics"]),
    prompt_text: item["prompt_text"],
  };
}

/** The response body for cluster insights. */
export interface Insight {
  /** The unique identifier for the insights report. */
  readonly id?: string;
  /** Metadata about the insights report. */
  readonly metadata?: InsightsMetadata;
  /** The current state of the insights. */
  readonly state?: OperationState;
  /** User friendly display name for the insight. */
  displayName: string;
  /** Request for the insights analysis. */
  request: InsightRequestUnion;
  /** The result of the insights report. */
  readonly result?: InsightResultUnion;
}

export function insightSerializer(item: Insight): any {
  return {
    displayName: item["displayName"],
    request: insightRequestUnionSerializer(item["request"]),
  };
}

export function insightDeserializer(item: any): Insight {
  return {
    id: item["id"],
    metadata: insightsMetadataDeserializer(item["metadata"]),
    state: item["state"],
    displayName: item["displayName"],
    request: insightRequestUnionDeserializer(item["request"]),
    result: !item["result"] ? item["result"] : insightResultUnionDeserializer(item["result"]),
  };
}

/** Metadata about the insights. */
export interface InsightsMetadata {
  /** The timestamp when the insights were created. */
  createdAt: Date;
  /** The timestamp when the insights were completed. */
  completedAt?: Date;
}

export function insightsMetadataDeserializer(item: any): InsightsMetadata {
  return {
    createdAt: new Date(item["createdAt"]),
    completedAt: !item["completedAt"] ? item["completedAt"] : new Date(item["completedAt"]),
  };
}

/** Enum describing allowed operation states. */
export type OperationState = "NotStarted" | "Running" | "Succeeded" | "Failed" | "Canceled";

/** The request of the insights report. */
export interface InsightRequest {
  /** The type of request. */
  /** The discriminator possible values: EvaluationRunClusterInsight, AgentClusterInsight, EvaluationComparison */
  type: InsightType;
}

export function insightRequestSerializer(item: InsightRequest): any {
  return { type: item["type"] };
}

export function insightRequestDeserializer(item: any): InsightRequest {
  return {
    type: item["type"],
  };
}

/** Alias for InsightRequestUnion */
export type InsightRequestUnion =
  | EvaluationRunClusterInsightRequest
  | AgentClusterInsightRequest
  | EvaluationComparisonInsightRequest
  | InsightRequest;

export function insightRequestUnionSerializer(item: InsightRequestUnion): any {
  switch (item.type) {
    case "EvaluationRunClusterInsight":
      return evaluationRunClusterInsightRequestSerializer(
        item as EvaluationRunClusterInsightRequest,
      );

    case "AgentClusterInsight":
      return agentClusterInsightRequestSerializer(item as AgentClusterInsightRequest);

    case "EvaluationComparison":
      return evaluationComparisonInsightRequestSerializer(
        item as EvaluationComparisonInsightRequest,
      );

    default:
      return insightRequestSerializer(item);
  }
}

export function insightRequestUnionDeserializer(item: any): InsightRequestUnion {
  switch (item.type) {
    case "EvaluationRunClusterInsight":
      return evaluationRunClusterInsightRequestDeserializer(
        item as EvaluationRunClusterInsightRequest,
      );

    case "AgentClusterInsight":
      return agentClusterInsightRequestDeserializer(item as AgentClusterInsightRequest);

    case "EvaluationComparison":
      return evaluationComparisonInsightRequestDeserializer(
        item as EvaluationComparisonInsightRequest,
      );

    default:
      return insightRequestDeserializer(item);
  }
}

/** The request of the insights. */
export type InsightType =
  | "EvaluationRunClusterInsight"
  | "AgentClusterInsight"
  | "EvaluationComparison";

/** Insights on set of Evaluation Results */
export interface EvaluationRunClusterInsightRequest extends InsightRequest {
  /** The type of insights request. */
  type: "EvaluationRunClusterInsight";
  /** Evaluation Id for the insights. */
  evalId: string;
  /** List of evaluation run IDs for the insights. */
  runIds: string[];
  /** Configuration of the model used in the insight generation. */
  modelConfiguration?: InsightModelConfiguration;
}

export function evaluationRunClusterInsightRequestSerializer(
  item: EvaluationRunClusterInsightRequest,
): any {
  return {
    type: item["type"],
    evalId: item["evalId"],
    runIds: item["runIds"].map((p: any) => {
      return p;
    }),
    modelConfiguration: !item["modelConfiguration"]
      ? item["modelConfiguration"]
      : insightModelConfigurationSerializer(item["modelConfiguration"]),
  };
}

export function evaluationRunClusterInsightRequestDeserializer(
  item: any,
): EvaluationRunClusterInsightRequest {
  return {
    type: item["type"],
    evalId: item["evalId"],
    runIds: item["runIds"].map((p: any) => {
      return p;
    }),
    modelConfiguration: !item["modelConfiguration"]
      ? item["modelConfiguration"]
      : insightModelConfigurationDeserializer(item["modelConfiguration"]),
  };
}

/** Configuration of the model used in the insight generation. */
export interface InsightModelConfiguration {
  /** The model deployment to be evaluated. Accepts either the deployment name alone or with the connection name as '{connectionName}/<modelDeploymentName>'. */
  modelDeploymentName: string;
}

export function insightModelConfigurationSerializer(item: InsightModelConfiguration): any {
  return { modelDeploymentName: item["modelDeploymentName"] };
}

export function insightModelConfigurationDeserializer(item: any): InsightModelConfiguration {
  return {
    modelDeploymentName: item["modelDeploymentName"],
  };
}

/** Insights on set of Agent Evaluation Results */
export interface AgentClusterInsightRequest extends InsightRequest {
  /** The type of request. */
  type: "AgentClusterInsight";
  /** Identifier for the agent. */
  agentName: string;
  /** Configuration of the model used in the insight generation. */
  modelConfiguration?: InsightModelConfiguration;
}

export function agentClusterInsightRequestSerializer(item: AgentClusterInsightRequest): any {
  return {
    type: item["type"],
    agentName: item["agentName"],
    modelConfiguration: !item["modelConfiguration"]
      ? item["modelConfiguration"]
      : insightModelConfigurationSerializer(item["modelConfiguration"]),
  };
}

export function agentClusterInsightRequestDeserializer(item: any): AgentClusterInsightRequest {
  return {
    type: item["type"],
    agentName: item["agentName"],
    modelConfiguration: !item["modelConfiguration"]
      ? item["modelConfiguration"]
      : insightModelConfigurationDeserializer(item["modelConfiguration"]),
  };
}

/** Evaluation Comparison Request */
export interface EvaluationComparisonInsightRequest extends InsightRequest {
  /** The type of request. */
  type: "EvaluationComparison";
  /** Identifier for the evaluation. */
  evalId: string;
  /** The baseline run ID for comparison. */
  baselineRunId: string;
  /** List of treatment run IDs for comparison. */
  treatmentRunIds: string[];
}

export function evaluationComparisonInsightRequestSerializer(
  item: EvaluationComparisonInsightRequest,
): any {
  return {
    type: item["type"],
    evalId: item["evalId"],
    baselineRunId: item["baselineRunId"],
    treatmentRunIds: item["treatmentRunIds"].map((p: any) => {
      return p;
    }),
  };
}

export function evaluationComparisonInsightRequestDeserializer(
  item: any,
): EvaluationComparisonInsightRequest {
  return {
    type: item["type"],
    evalId: item["evalId"],
    baselineRunId: item["baselineRunId"],
    treatmentRunIds: item["treatmentRunIds"].map((p: any) => {
      return p;
    }),
  };
}

/** The result of the insights. */
export interface InsightResult {
  /** The type of insights result. */
  /** The discriminator possible values: EvaluationComparison, EvaluationRunClusterInsight, AgentClusterInsight */
  type: InsightType;
}

export function insightResultDeserializer(item: any): InsightResult {
  return {
    type: item["type"],
  };
}

/** Alias for InsightResultUnion */
export type InsightResultUnion =
  | EvaluationComparisonInsightResult
  | EvaluationRunClusterInsightResult
  | AgentClusterInsightResult
  | InsightResult;

export function insightResultUnionDeserializer(item: any): InsightResultUnion {
  switch (item.type) {
    case "EvaluationComparison":
      return evaluationComparisonInsightResultDeserializer(
        item as EvaluationComparisonInsightResult,
      );

    case "EvaluationRunClusterInsight":
      return evaluationRunClusterInsightResultDeserializer(
        item as EvaluationRunClusterInsightResult,
      );

    case "AgentClusterInsight":
      return agentClusterInsightResultDeserializer(item as AgentClusterInsightResult);

    default:
      return insightResultDeserializer(item);
  }
}

/** Insights from the evaluation comparison. */
export interface EvaluationComparisonInsightResult extends InsightResult {
  /** The type of insights result. */
  type: "EvaluationComparison";
  /** Comparison results for each treatment run against the baseline. */
  comparisons: EvalRunResultComparison[];
  /** The statistical method used for comparison. */
  method: string;
}

export function evaluationComparisonInsightResultDeserializer(
  item: any,
): EvaluationComparisonInsightResult {
  return {
    type: item["type"],
    comparisons: evalRunResultComparisonArrayDeserializer(item["comparisons"]),
    method: item["method"],
  };
}

export function evalRunResultComparisonArrayDeserializer(
  result: Array<EvalRunResultComparison>,
): any[] {
  return result.map((item) => {
    return evalRunResultComparisonDeserializer(item);
  });
}

/** Comparison results for treatment runs against the baseline. */
export interface EvalRunResultComparison {
  /** Name of the testing criteria. */
  testingCriteria: string;
  /** Metric being evaluated. */
  metric: string;
  /** Name of the evaluator for this testing criteria. */
  evaluator: string;
  /** Summary statistics of the baseline run. */
  baselineRunSummary: EvalRunResultSummary;
  /** List of comparison results for each treatment run. */
  compareItems: EvalRunResultCompareItem[];
}

export function evalRunResultComparisonDeserializer(item: any): EvalRunResultComparison {
  return {
    testingCriteria: item["testingCriteria"],
    metric: item["metric"],
    evaluator: item["evaluator"],
    baselineRunSummary: evalRunResultSummaryDeserializer(item["baselineRunSummary"]),
    compareItems: evalRunResultCompareItemArrayDeserializer(item["compareItems"]),
  };
}

/** Summary statistics of a metric in an evaluation run. */
export interface EvalRunResultSummary {
  /** The evaluation run ID. */
  runId: string;
  /** Number of samples in the evaluation run. */
  sampleCount: number;
  /** Average value of the metric in the evaluation run. */
  average: number;
  /** Standard deviation of the metric in the evaluation run. */
  standardDeviation: number;
}

export function evalRunResultSummaryDeserializer(item: any): EvalRunResultSummary {
  return {
    runId: item["runId"],
    sampleCount: item["sampleCount"],
    average: item["average"],
    standardDeviation: item["standardDeviation"],
  };
}

export function evalRunResultCompareItemArrayDeserializer(
  result: Array<EvalRunResultCompareItem>,
): any[] {
  return result.map((item) => {
    return evalRunResultCompareItemDeserializer(item);
  });
}

/** Metric comparison for a treatment against the baseline. */
export interface EvalRunResultCompareItem {
  /** The treatment run ID. */
  treatmentRunId: string;
  /** Summary statistics of the treatment run. */
  treatmentRunSummary: EvalRunResultSummary;
  /** Estimated difference between treatment and baseline. */
  deltaEstimate: number;
  /** P-value for the treatment effect. */
  pValue: number;
  /** Type of treatment effect. */
  treatmentEffect: TreatmentEffectType;
}

export function evalRunResultCompareItemDeserializer(item: any): EvalRunResultCompareItem {
  return {
    treatmentRunId: item["treatmentRunId"],
    treatmentRunSummary: evalRunResultSummaryDeserializer(item["treatmentRunSummary"]),
    deltaEstimate: item["deltaEstimate"],
    pValue: item["pValue"],
    treatmentEffect: item["treatmentEffect"],
  };
}

/** Treatment Effect Type. */
export type TreatmentEffectType =
  | "TooFewSamples"
  | "Inconclusive"
  | "Changed"
  | "Improved"
  | "Degraded";

/** Insights from the evaluation run cluster analysis. */
export interface EvaluationRunClusterInsightResult extends InsightResult {
  /** The type of insights result. */
  type: "EvaluationRunClusterInsight";
  clusterInsight: ClusterInsightResult;
}

export function evaluationRunClusterInsightResultDeserializer(
  item: any,
): EvaluationRunClusterInsightResult {
  return {
    type: item["type"],
    clusterInsight: clusterInsightResultDeserializer(item["clusterInsight"]),
  };
}

/** Insights from the cluster analysis. */
export interface ClusterInsightResult {
  /** Summary of the insights report. */
  summary: InsightSummary;
  /** List of clusters identified in the insights. */
  clusters: InsightCluster[];
  /**
   *   Optional mapping of IDs to 2D coordinates used by the UX for visualization.
   *
   *   The map keys are string identifiers (for example, a cluster id or a sample id)
   *   and the values are the coordinates and visual size for rendering on a 2D chart.
   *
   *   This property is omitted unless the client requests coordinates (for example,
   *   by passing `includeCoordinates=true` as a query parameter).
   *
   *   Example:
   *   ```
   *   {
   *     "cluster-1": { "x": 12, "y": 34, "size": 8 },
   *     "sample-123": { "x": 18, "y": 22, "size": 4 }
   *   }
   *   ```
   *
   *   Coordinates are intended only for client-side visualization and do not
   *   modify the canonical insights results.
   */
  coordinates?: Record<string, ChartCoordinate>;
}

export function clusterInsightResultDeserializer(item: any): ClusterInsightResult {
  return {
    summary: insightSummaryDeserializer(item["summary"]),
    clusters: insightClusterArrayDeserializer(item["clusters"]),
    coordinates: !item["coordinates"]
      ? item["coordinates"]
      : chartCoordinateRecordDeserializer(item["coordinates"]),
  };
}

/** Summary of the error cluster analysis. */
export interface InsightSummary {
  /** Total number of samples analyzed. */
  sampleCount: number;
  /** Total number of unique subcluster labels. */
  uniqueSubclusterCount: number;
  /** Total number of unique clusters. */
  uniqueClusterCount: number;
  /** Method used for clustering. */
  method: string;
  /** Token usage while performing clustering analysis */
  usage: ClusterTokenUsage;
}

export function insightSummaryDeserializer(item: any): InsightSummary {
  return {
    sampleCount: item["sampleCount"],
    uniqueSubclusterCount: item["uniqueSubclusterCount"],
    uniqueClusterCount: item["uniqueClusterCount"],
    method: item["method"],
    usage: clusterTokenUsageDeserializer(item["usage"]),
  };
}

/** Token usage for cluster analysis */
export interface ClusterTokenUsage {
  /** input token usage */
  inputTokenUsage: number;
  /** output token usage */
  outputTokenUsage: number;
  /** total token usage */
  totalTokenUsage: number;
}

export function clusterTokenUsageDeserializer(item: any): ClusterTokenUsage {
  return {
    inputTokenUsage: item["inputTokenUsage"],
    outputTokenUsage: item["outputTokenUsage"],
    totalTokenUsage: item["totalTokenUsage"],
  };
}

export function insightClusterArrayDeserializer(result: Array<InsightCluster>): any[] {
  return result.map((item) => {
    return insightClusterDeserializer(item);
  });
}

/** A cluster of analysis samples. */
export interface InsightCluster {
  /** The id of the analysis cluster. */
  id: string;
  /** Label for the cluster */
  label: string;
  /** Suggestion for the cluster */
  suggestion: string;
  /** The title of the suggestion for the cluster */
  suggestionTitle: string;
  /** Description of the analysis cluster. */
  description: string;
  /** The weight of the analysis cluster. This indicate number of samples in the cluster. */
  weight: number;
  /** List of subclusters within this cluster. Empty if no subclusters exist. */
  subClusters?: InsightCluster[];
  /** List of samples that belong to this cluster. Empty if samples are part of subclusters. */
  samples?: InsightSampleUnion[];
}

export function insightClusterDeserializer(item: any): InsightCluster {
  return {
    id: item["id"],
    label: item["label"],
    suggestion: item["suggestion"],
    suggestionTitle: item["suggestionTitle"],
    description: item["description"],
    weight: item["weight"],
    subClusters: !item["subClusters"]
      ? item["subClusters"]
      : insightClusterArrayDeserializer(item["subClusters"]),
    samples: !item["samples"]
      ? item["samples"]
      : insightSampleUnionArrayDeserializer(item["samples"]),
  };
}

export function insightSampleUnionArrayDeserializer(result: Array<InsightSampleUnion>): any[] {
  return result.map((item) => {
    return insightSampleUnionDeserializer(item);
  });
}

/** A sample from the analysis. */
export interface InsightSample {
  /** The unique identifier for the analysis sample. */
  id: string;
  /** Sample type */
  /** The discriminator possible values: EvaluationResultSample */
  type: SampleType;
  /** Features to help with additional filtering of data in UX. */
  features: Record<string, unknown>;
  /** Info about the correlation for the analysis sample. */
  correlationInfo: Record<string, unknown>;
}

export function insightSampleDeserializer(item: any): InsightSample {
  return {
    id: item["id"],
    type: item["type"],
    features: Object.fromEntries(
      Object.entries(item["features"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    correlationInfo: Object.fromEntries(
      Object.entries(item["correlationInfo"]).map(([k, p]: [string, any]) => [k, p]),
    ),
  };
}

/** Alias for InsightSampleUnion */
export type InsightSampleUnion = EvaluationResultSample | InsightSample;

export function insightSampleUnionDeserializer(item: any): InsightSampleUnion {
  switch (item.type) {
    case "EvaluationResultSample":
      return evaluationResultSampleDeserializer(item as EvaluationResultSample);

    default:
      return insightSampleDeserializer(item);
  }
}

/** The type of sample used in the analysis. */
export type SampleType = "EvaluationResultSample";

/** A sample from the evaluation result. */
export interface EvaluationResultSample extends InsightSample {
  /** Evaluation Result Sample Type */
  type: "EvaluationResultSample";
  /** Evaluation result for the analysis sample. */
  evaluationResult: EvalResult;
}

export function evaluationResultSampleDeserializer(item: any): EvaluationResultSample {
  return {
    id: item["id"],
    type: item["type"],
    features: Object.fromEntries(
      Object.entries(item["features"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    correlationInfo: Object.fromEntries(
      Object.entries(item["correlationInfo"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    evaluationResult: evalResultDeserializer(item["evaluationResult"]),
  };
}

/** Result of the evaluation. */
export interface EvalResult {
  /** name of the check */
  name: string;
  /** type of the check */
  type: string;
  /** score */
  score: number;
  /** indicates if the check passed or failed */
  passed: boolean;
}

export function evalResultDeserializer(item: any): EvalResult {
  return {
    name: item["name"],
    type: item["type"],
    score: item["score"],
    passed: item["passed"],
  };
}

export function chartCoordinateRecordDeserializer(
  item: Record<string, any>,
): Record<string, ChartCoordinate> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : chartCoordinateDeserializer(item[key]);
  });
  return result;
}

/** Coordinates for the analysis chart. */
export interface ChartCoordinate {
  /** X-axis coordinate. */
  x: number;
  /** Y-axis coordinate. */
  y: number;
  /** Size of the chart element. */
  size: number;
}

export function chartCoordinateDeserializer(item: any): ChartCoordinate {
  return {
    x: item["x"],
    y: item["y"],
    size: item["size"],
  };
}

/** Insights from the agent cluster analysis. */
export interface AgentClusterInsightResult extends InsightResult {
  /** The type of insights result. */
  type: "AgentClusterInsight";
  clusterInsight: ClusterInsightResult;
}

export function agentClusterInsightResultDeserializer(item: any): AgentClusterInsightResult {
  return {
    type: item["type"],
    clusterInsight: clusterInsightResultDeserializer(item["clusterInsight"]),
  };
}

/** Paged collection of Insight items */
export interface _PagedInsight {
  /** The Insight items on this page */
  value: Insight[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedInsightDeserializer(item: any): _PagedInsight {
  return {
    value: insightArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function insightArraySerializer(result: Array<Insight>): any[] {
  return result.map((item) => {
    return insightSerializer(item);
  });
}

export function insightArrayDeserializer(result: Array<Insight>): any[] {
  return result.map((item) => {
    return insightDeserializer(item);
  });
}

/** Base definition for memory store configurations. */
export interface MemoryStoreDefinition {
  /** The kind of the memory store. */
  /** The discriminator possible values: default */
  kind: MemoryStoreKind;
}

export function memoryStoreDefinitionSerializer(item: MemoryStoreDefinition): any {
  return { kind: item["kind"] };
}

export function memoryStoreDefinitionDeserializer(item: any): MemoryStoreDefinition {
  return {
    kind: item["kind"],
  };
}

/** Alias for MemoryStoreDefinitionUnion */
export type MemoryStoreDefinitionUnion = MemoryStoreDefaultDefinition | MemoryStoreDefinition;

export function memoryStoreDefinitionUnionSerializer(item: MemoryStoreDefinitionUnion): any {
  switch (item.kind) {
    case "default":
      return memoryStoreDefaultDefinitionSerializer(item as MemoryStoreDefaultDefinition);

    default:
      return memoryStoreDefinitionSerializer(item);
  }
}

export function memoryStoreDefinitionUnionDeserializer(item: any): MemoryStoreDefinitionUnion {
  switch (item.kind) {
    case "default":
      return memoryStoreDefaultDefinitionDeserializer(item as MemoryStoreDefaultDefinition);

    default:
      return memoryStoreDefinitionDeserializer(item);
  }
}

/** The type of memory store implementation to use. */
export type MemoryStoreKind = "default";

/** Default memory store implementation. */
export interface MemoryStoreDefaultDefinition extends MemoryStoreDefinition {
  /** The kind of the memory store. */
  kind: "default";
  /** The name or identifier of the chat completion model deployment used for memory processing. */
  chat_model: string;
  /** The name or identifier of the embedding model deployment used for memory processing. */
  embedding_model: string;
  /** Default memory store options. */
  options?: MemoryStoreDefaultOptions;
}

export function memoryStoreDefaultDefinitionSerializer(item: MemoryStoreDefaultDefinition): any {
  return {
    kind: item["kind"],
    chat_model: item["chat_model"],
    embedding_model: item["embedding_model"],
    options: !item["options"]
      ? item["options"]
      : memoryStoreDefaultOptionsSerializer(item["options"]),
  };
}

export function memoryStoreDefaultDefinitionDeserializer(item: any): MemoryStoreDefaultDefinition {
  return {
    kind: item["kind"],
    chat_model: item["chat_model"],
    embedding_model: item["embedding_model"],
    options: !item["options"]
      ? item["options"]
      : memoryStoreDefaultOptionsDeserializer(item["options"]),
  };
}

/** Default memory store configurations. */
export interface MemoryStoreDefaultOptions {
  /** Whether to enable user profile extraction and storage. Default is true. */
  user_profile_enabled: boolean;
  /** Specific categories or types of user profile information to extract and store. */
  user_profile_details?: string;
  /** Whether to enable chat summary extraction and storage. Default is true. */
  chat_summary_enabled: boolean;
}

export function memoryStoreDefaultOptionsSerializer(item: MemoryStoreDefaultOptions): any {
  return {
    user_profile_enabled: item["user_profile_enabled"],
    user_profile_details: item["user_profile_details"],
    chat_summary_enabled: item["chat_summary_enabled"],
  };
}

export function memoryStoreDefaultOptionsDeserializer(item: any): MemoryStoreDefaultOptions {
  return {
    user_profile_enabled: item["user_profile_enabled"],
    user_profile_details: item["user_profile_details"],
    chat_summary_enabled: item["chat_summary_enabled"],
  };
}

/** A memory store that can store and retrieve user memories. */
export interface MemoryStore {
  /** The object type, which is always 'memory_store'. */
  object: "memory_store";
  /** The unique identifier of the memory store. */
  id: string;
  /** The Unix timestamp (seconds) when the memory store was created. */
  created_at: Date;
  /** The Unix timestamp (seconds) when the memory store was last updated. */
  updated_at: Date;
  /** The name of the memory store. */
  name: string;
  /** A human-readable description of the memory store. */
  description?: string;
  /** Arbitrary key-value metadata to associate with the memory store. */
  metadata?: Record<string, string>;
  /** The definition of the memory store. */
  definition: MemoryStoreDefinitionUnion;
}

export function memoryStoreDeserializer(item: any): MemoryStore {
  return {
    object: item["object"],
    id: item["id"],
    created_at: new Date(item["created_at"] * 1000),
    updated_at: new Date(item["updated_at"] * 1000),
    name: item["name"],
    description: item["description"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    definition: memoryStoreDefinitionUnionDeserializer(item["definition"]),
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultMemoryStoreObject {
  /** The requested list of items. */
  data: MemoryStore[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultMemoryStoreObjectDeserializer(
  item: any,
): _AgentsPagedResultMemoryStoreObject {
  return {
    data: memoryStoreArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function memoryStoreArrayDeserializer(result: Array<MemoryStore>): any[] {
  return result.map((item) => {
    return memoryStoreDeserializer(item);
  });
}

/** model interface DeleteMemoryStoreResponse */
export interface DeleteMemoryStoreResponse {
  /** The object type. Always 'memory_store.deleted'. */
  object: "memory_store.deleted";
  /** The name of the memory store. */
  name: string;
  /** Whether the memory store was successfully deleted. */
  deleted: boolean;
}

export function deleteMemoryStoreResponseDeserializer(item: any): DeleteMemoryStoreResponse {
  return {
    object: item["object"],
    name: item["name"],
    deleted: item["deleted"],
  };
}

/**
 * An item representing part of the context for the response to be
 * generated by the model. Can contain text, images, and audio inputs,
 * as well as previous assistant responses and tool call outputs.
 */
export interface InputItem {
  type: InputItemType;
}

export function inputItemSerializer(item: InputItem): any {
  return { type: item["type"] };
}

/** Alias for InputItemUnion */
export type InputItemUnion =
  | EasyInputMessage
  | ItemReferenceParam
  | InputItemOutputMessage
  | InputItemFileSearchToolCall
  | InputItemComputerToolCall
  | InputItemComputerCallOutputItemParam
  | InputItemWebSearchToolCall
  | InputItemFunctionToolCall
  | InputItemFunctionCallOutputItemParam
  | InputItemReasoningItem
  | InputItemCompactionSummaryItemParam
  | InputItemImageGenToolCall
  | InputItemCodeInterpreterToolCall
  | InputItemLocalShellToolCall
  | InputItemLocalShellToolCallOutput
  | InputItemFunctionShellCallItemParam
  | InputItemFunctionShellCallOutputItemParam
  | InputItemApplyPatchToolCallItemParam
  | InputItemApplyPatchToolCallOutputItemParam
  | InputItemMcpListTools
  | InputItemMcpApprovalRequest
  | InputItemMcpApprovalResponse
  | InputItemMcpToolCall
  | InputItemCustomToolCallOutput
  | InputItemCustomToolCall
  | InputItem;

export function inputItemUnionSerializer(item: InputItemUnion): any {
  switch (item.type) {
    case "message":
      return easyInputMessageSerializer(item as EasyInputMessage);

    case "item_reference":
      return itemReferenceParamSerializer(item as ItemReferenceParam);

    case "output_message":
      return inputItemOutputMessageSerializer(item as InputItemOutputMessage);

    case "file_search_call":
      return inputItemFileSearchToolCallSerializer(item as InputItemFileSearchToolCall);

    case "computer_call":
      return inputItemComputerToolCallSerializer(item as InputItemComputerToolCall);

    case "computer_call_output":
      return inputItemComputerCallOutputItemParamSerializer(
        item as InputItemComputerCallOutputItemParam,
      );

    case "web_search_call":
      return inputItemWebSearchToolCallSerializer(item as InputItemWebSearchToolCall);

    case "function_call":
      return inputItemFunctionToolCallSerializer(item as InputItemFunctionToolCall);

    case "function_call_output":
      return inputItemFunctionCallOutputItemParamSerializer(
        item as InputItemFunctionCallOutputItemParam,
      );

    case "reasoning":
      return inputItemReasoningItemSerializer(item as InputItemReasoningItem);

    case "compaction":
      return inputItemCompactionSummaryItemParamSerializer(
        item as InputItemCompactionSummaryItemParam,
      );

    case "image_generation_call":
      return inputItemImageGenToolCallSerializer(item as InputItemImageGenToolCall);

    case "code_interpreter_call":
      return inputItemCodeInterpreterToolCallSerializer(item as InputItemCodeInterpreterToolCall);

    case "local_shell_call":
      return inputItemLocalShellToolCallSerializer(item as InputItemLocalShellToolCall);

    case "local_shell_call_output":
      return inputItemLocalShellToolCallOutputSerializer(item as InputItemLocalShellToolCallOutput);

    case "shell_call":
      return inputItemFunctionShellCallItemParamSerializer(
        item as InputItemFunctionShellCallItemParam,
      );

    case "shell_call_output":
      return inputItemFunctionShellCallOutputItemParamSerializer(
        item as InputItemFunctionShellCallOutputItemParam,
      );

    case "apply_patch_call":
      return inputItemApplyPatchToolCallItemParamSerializer(
        item as InputItemApplyPatchToolCallItemParam,
      );

    case "apply_patch_call_output":
      return inputItemApplyPatchToolCallOutputItemParamSerializer(
        item as InputItemApplyPatchToolCallOutputItemParam,
      );

    case "mcp_list_tools":
      return inputItemMcpListToolsSerializer(item as InputItemMcpListTools);

    case "mcp_approval_request":
      return inputItemMcpApprovalRequestSerializer(item as InputItemMcpApprovalRequest);

    case "mcp_approval_response":
      return inputItemMcpApprovalResponseSerializer(item as InputItemMcpApprovalResponse);

    case "mcp_call":
      return inputItemMcpToolCallSerializer(item as InputItemMcpToolCall);

    case "custom_tool_call_output":
      return inputItemCustomToolCallOutputSerializer(item as InputItemCustomToolCallOutput);

    case "custom_tool_call":
      return inputItemCustomToolCallSerializer(item as InputItemCustomToolCall);

    default:
      return inputItemSerializer(item);
  }
}

/** Type of InputItemType */
export type InputItemType =
  | "message"
  | "output_message"
  | "file_search_call"
  | "computer_call"
  | "computer_call_output"
  | "web_search_call"
  | "function_call"
  | "function_call_output"
  | "reasoning"
  | "compaction"
  | "image_generation_call"
  | "code_interpreter_call"
  | "local_shell_call"
  | "local_shell_call_output"
  | "shell_call"
  | "shell_call_output"
  | "apply_patch_call"
  | "apply_patch_call_output"
  | "mcp_list_tools"
  | "mcp_approval_request"
  | "mcp_approval_response"
  | "mcp_call"
  | "custom_tool_call_output"
  | "custom_tool_call"
  | "item_reference";

/**
 * A message input to the model with a role indicating instruction following
 * hierarchy. Instructions given with the `developer` or `system` role take
 * precedence over instructions given with the `user` role. Messages with the
 * `assistant` role are presumed to have been generated by the model in previous
 * interactions.
 */
export interface EasyInputMessage extends InputItem {
  /**
   * The role of the message input. One of `user`, `assistant`, `system`, or
   *   `developer`.
   */
  role: "user" | "assistant" | "system" | "developer";
  /**
   * Text, image, or audio input to the model, used to generate a response.
   *   Can also contain previous assistant responses.
   */
  content: string | InputContentUnion[];
  /** The type of the message input. Always `message`. */
  type: "message";
  /**
   * The status of item. One of `in_progress`, `completed`, or
   *   `incomplete`. Populated when items are returned via API.
   */
  status?: "in_progress" | "completed" | "incomplete";
}

export function easyInputMessageSerializer(item: EasyInputMessage): any {
  return {
    type: item["type"],
    role: item["role"],
    content: _easyInputMessageContentSerializer(item["content"]),
    status: item["status"],
  };
}

/** Alias for _EasyInputMessageContent */
export type _EasyInputMessageContent = string | InputContentUnion[];

export function _easyInputMessageContentSerializer(item: _EasyInputMessageContent): any {
  return item;
}

export function inputContentUnionArraySerializer(result: Array<InputContentUnion>): any[] {
  return result.map((item) => {
    return inputContentUnionSerializer(item);
  });
}

/** model interface InputContent */
export interface InputContent {
  type: InputContentType;
}

export function inputContentSerializer(item: InputContent): any {
  return { type: item["type"] };
}

/** Alias for InputContentUnion */
export type InputContentUnion =
  | InputContentInputTextContent
  | InputContentInputImageContent
  | InputContentInputFileContent
  | InputContent;

export function inputContentUnionSerializer(item: InputContentUnion): any {
  switch (item.type) {
    case "input_text":
      return inputContentInputTextContentSerializer(item as InputContentInputTextContent);

    case "input_image":
      return inputContentInputImageContentSerializer(item as InputContentInputImageContent);

    case "input_file":
      return inputContentInputFileContentSerializer(item as InputContentInputFileContent);

    default:
      return inputContentSerializer(item);
  }
}

/** Type of InputContentType */
export type InputContentType = "input_text" | "input_image" | "input_file";

/** A text input to the model. */
export interface InputContentInputTextContent extends InputContent {
  /** The type of the input item. Always `input_text`. */
  type: "input_text";
  /** The text input to the model. */
  text: string;
}

export function inputContentInputTextContentSerializer(item: InputContentInputTextContent): any {
  return { type: item["type"], text: item["text"] };
}

/** An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision). */
export interface InputContentInputImageContent extends InputContent {
  /** The type of the input item. Always `input_image`. */
  type: "input_image";
  image_url?: string;
  file_id?: string;
  /** The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`. */
  detail: ImageDetail;
}

export function inputContentInputImageContentSerializer(item: InputContentInputImageContent): any {
  return {
    type: item["type"],
    image_url: item["image_url"],
    file_id: item["file_id"],
    detail: item["detail"],
  };
}

/** Type of ImageDetail */
export type ImageDetail = "low" | "high" | "auto";

/** A file input to the model. */
export interface InputContentInputFileContent extends InputContent {
  /** The type of the input item. Always `input_file`. */
  type: "input_file";
  file_id?: string;
  /** The name of the file to be sent to the model. */
  filename?: string;
  /** The URL of the file to be sent to the model. */
  file_url?: string;
  /** The content of the file to be sent to the model. */
  file_data?: string;
}

export function inputContentInputFileContentSerializer(item: InputContentInputFileContent): any {
  return {
    type: item["type"],
    file_id: item["file_id"],
    filename: item["filename"],
    file_url: item["file_url"],
    file_data: item["file_data"],
  };
}

/** An internal identifier for an item to reference. */
export interface ItemReferenceParam extends InputItem {
  /** The type of item to reference. Always `item_reference`. */
  type: "item_reference";
  /** The ID of the item to reference. */
  id: string;
}

export function itemReferenceParamSerializer(item: ItemReferenceParam): any {
  return { type: item["type"], id: item["id"] };
}

/** An output message from the model. */
export interface InputItemOutputMessage extends InputItem {
  /** The unique ID of the output message. */
  id: string;
  /** The type of the output message. Always `message`. */
  type: "output_message";
  /** The role of the output message. Always `assistant`. */
  role: "assistant";
  /** The content of the output message. */
  content: OutputMessageContentUnion[];
  /**
   * The status of the message input. One of `in_progress`, `completed`, or
   *   `incomplete`. Populated when input items are returned via API.
   */
  status: "in_progress" | "completed" | "incomplete";
}

export function inputItemOutputMessageSerializer(item: InputItemOutputMessage): any {
  return {
    type: item["type"],
    id: item["id"],
    role: item["role"],
    content: outputMessageContentUnionArraySerializer(item["content"]),
    status: item["status"],
  };
}

export function outputMessageContentUnionArraySerializer(
  result: Array<OutputMessageContentUnion>,
): any[] {
  return result.map((item) => {
    return outputMessageContentUnionSerializer(item);
  });
}

/** model interface OutputMessageContent */
export interface OutputMessageContent {
  type: OutputMessageContentType;
}

export function outputMessageContentSerializer(item: OutputMessageContent): any {
  return { type: item["type"] };
}

/** Alias for OutputMessageContentUnion */
export type OutputMessageContentUnion =
  | OutputMessageContentOutputTextContent
  | OutputMessageContentRefusalContent
  | OutputMessageContent;

export function outputMessageContentUnionSerializer(item: OutputMessageContentUnion): any {
  switch (item.type) {
    case "output_text":
      return outputMessageContentOutputTextContentSerializer(
        item as OutputMessageContentOutputTextContent,
      );

    case "refusal":
      return outputMessageContentRefusalContentSerializer(
        item as OutputMessageContentRefusalContent,
      );

    default:
      return outputMessageContentSerializer(item);
  }
}

/** Type of OutputMessageContentType */
export type OutputMessageContentType = "output_text" | "refusal";

/** A text output from the model. */
export interface OutputMessageContentOutputTextContent extends OutputMessageContent {
  /** The type of the output text. Always `output_text`. */
  type: "output_text";
  /** The text output from the model. */
  text: string;
  /** The annotations of the text output. */
  annotations: AnnotationUnion[];
  logprobs?: LogProb[];
}

export function outputMessageContentOutputTextContentSerializer(
  item: OutputMessageContentOutputTextContent,
): any {
  return {
    type: item["type"],
    text: item["text"],
    annotations: annotationUnionArraySerializer(item["annotations"]),
    logprobs: !item["logprobs"] ? item["logprobs"] : logProbArraySerializer(item["logprobs"]),
  };
}

export function annotationUnionArraySerializer(result: Array<AnnotationUnion>): any[] {
  return result.map((item) => {
    return annotationUnionSerializer(item);
  });
}

/** An annotation that applies to a span of output text. */
export interface Annotation {
  type: AnnotationType;
}

export function annotationSerializer(item: Annotation): any {
  return { type: item["type"] };
}

/** Alias for AnnotationUnion */
export type AnnotationUnion =
  | FileCitationBody
  | UrlCitationBody
  | ContainerFileCitationBody
  | FilePath
  | Annotation;

export function annotationUnionSerializer(item: AnnotationUnion): any {
  switch (item.type) {
    case "file_citation":
      return fileCitationBodySerializer(item as FileCitationBody);

    case "url_citation":
      return urlCitationBodySerializer(item as UrlCitationBody);

    case "container_file_citation":
      return containerFileCitationBodySerializer(item as ContainerFileCitationBody);

    case "file_path":
      return filePathSerializer(item as FilePath);

    default:
      return annotationSerializer(item);
  }
}

/** Type of AnnotationType */
export type AnnotationType =
  | "file_citation"
  | "url_citation"
  | "container_file_citation"
  | "file_path";

/** A citation to a file. */
export interface FileCitationBody extends Annotation {
  /** The type of the file citation. Always `file_citation`. */
  type: "file_citation";
  /** The ID of the file. */
  file_id: string;
  /** The index of the file in the list of files. */
  index: number;
  /** The filename of the file cited. */
  filename: string;
}

export function fileCitationBodySerializer(item: FileCitationBody): any {
  return {
    type: item["type"],
    file_id: item["file_id"],
    index: item["index"],
    filename: item["filename"],
  };
}

/** A citation for a web resource used to generate a model response. */
export interface UrlCitationBody extends Annotation {
  /** The type of the URL citation. Always `url_citation`. */
  type: "url_citation";
  /** The URL of the web resource. */
  url: string;
  /** The index of the first character of the URL citation in the message. */
  start_index: number;
  /** The index of the last character of the URL citation in the message. */
  end_index: number;
  /** The title of the web resource. */
  title: string;
}

export function urlCitationBodySerializer(item: UrlCitationBody): any {
  return {
    type: item["type"],
    url: item["url"],
    start_index: item["start_index"],
    end_index: item["end_index"],
    title: item["title"],
  };
}

/** A citation for a container file used to generate a model response. */
export interface ContainerFileCitationBody extends Annotation {
  /** The type of the container file citation. Always `container_file_citation`. */
  type: "container_file_citation";
  /** The ID of the container file. */
  container_id: string;
  /** The ID of the file. */
  file_id: string;
  /** The index of the first character of the container file citation in the message. */
  start_index: number;
  /** The index of the last character of the container file citation in the message. */
  end_index: number;
  /** The filename of the container file cited. */
  filename: string;
}

export function containerFileCitationBodySerializer(item: ContainerFileCitationBody): any {
  return {
    type: item["type"],
    container_id: item["container_id"],
    file_id: item["file_id"],
    start_index: item["start_index"],
    end_index: item["end_index"],
    filename: item["filename"],
  };
}

/** A path to a file. */
export interface FilePath extends Annotation {
  /** The type of the file path. Always `file_path`. */
  type: "file_path";
  /** The ID of the file. */
  file_id: string;
  /** The index of the file in the list of files. */
  index: number;
}

export function filePathSerializer(item: FilePath): any {
  return { type: item["type"], file_id: item["file_id"], index: item["index"] };
}

export function logProbArraySerializer(result: Array<LogProb>): any[] {
  return result.map((item) => {
    return logProbSerializer(item);
  });
}

/** The log probability of a token. */
export interface LogProb {
  token: string;
  logprob: number;
  bytes: number[];
  top_logprobs: TopLogProb[];
}

export function logProbSerializer(item: LogProb): any {
  return {
    token: item["token"],
    logprob: item["logprob"],
    bytes: item["bytes"].map((p: any) => {
      return p;
    }),
    top_logprobs: topLogProbArraySerializer(item["top_logprobs"]),
  };
}

export function topLogProbArraySerializer(result: Array<TopLogProb>): any[] {
  return result.map((item) => {
    return topLogProbSerializer(item);
  });
}

/** The top log probability of a token. */
export interface TopLogProb {
  token: string;
  logprob: number;
  bytes: number[];
}

export function topLogProbSerializer(item: TopLogProb): any {
  return {
    token: item["token"],
    logprob: item["logprob"],
    bytes: item["bytes"].map((p: any) => {
      return p;
    }),
  };
}

/** A refusal from the model. */
export interface OutputMessageContentRefusalContent extends OutputMessageContent {
  /** The type of the refusal. Always `refusal`. */
  type: "refusal";
  /** The refusal explanation from the model. */
  refusal: string;
}

export function outputMessageContentRefusalContentSerializer(
  item: OutputMessageContentRefusalContent,
): any {
  return { type: item["type"], refusal: item["refusal"] };
}

/**
 * The results of a file search tool call. See the
 * [file search guide](https://platform.openai.com/docs/guides/tools-file-search) for more information.
 */
export interface InputItemFileSearchToolCall extends InputItem {
  /** The unique ID of the file search tool call. */
  id: string;
  /** The type of the file search tool call. Always `file_search_call`. */
  type: "file_search_call";
  /**
   * The status of the file search tool call. One of `in_progress`,
   *   `searching`, `incomplete` or `failed`,
   */
  status: "in_progress" | "searching" | "completed" | "incomplete" | "failed";
  /** The queries used to search for files. */
  queries: string[];
  results?: FileSearchToolCallResults[];
}

export function inputItemFileSearchToolCallSerializer(item: InputItemFileSearchToolCall): any {
  return {
    type: item["type"],
    id: item["id"],
    status: item["status"],
    queries: item["queries"].map((p: any) => {
      return p;
    }),
    results: !item["results"]
      ? item["results"]
      : fileSearchToolCallResultsArraySerializer(item["results"]),
  };
}

export function fileSearchToolCallResultsArraySerializer(
  result: Array<FileSearchToolCallResults>,
): any[] {
  return result.map((item) => {
    return fileSearchToolCallResultsSerializer(item);
  });
}

/** model interface FileSearchToolCallResults */
export interface FileSearchToolCallResults {
  file_id?: string;
  text?: string;
  filename?: string;
  attributes?: VectorStoreFileAttributes;
  score?: number;
}

export function fileSearchToolCallResultsSerializer(item: FileSearchToolCallResults): any {
  return {
    file_id: item["file_id"],
    text: item["text"],
    filename: item["filename"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : vectorStoreFileAttributesSerializer(item["attributes"]),
    score: item["score"],
  };
}

/**
 * Set of 16 key-value pairs that can be attached to an object. This can be
 * useful for storing additional information about the object in a structured
 * format, and querying for objects via API or the dashboard. Keys are strings
 * with a maximum length of 64 characters. Values are strings with a maximum
 * length of 512 characters, booleans, or numbers.
 */
export interface VectorStoreFileAttributes {
  /** Additional properties */
  additionalProperties?: Record<string, string | number | boolean>;
}

export function vectorStoreFileAttributesSerializer(item: VectorStoreFileAttributes): any {
  return {
    ...serializeRecord(
      item.additionalProperties ?? {},
      undefined,
      _vectorStoreFileAttributesAdditionalPropertySerializer,
    ),
  };
}

/** Alias for _VectorStoreFileAttributesAdditionalProperty */
export type _VectorStoreFileAttributesAdditionalProperty = string | number | boolean;

export function _vectorStoreFileAttributesAdditionalPropertySerializer(
  item: _VectorStoreFileAttributesAdditionalProperty,
): any {
  return item;
}

/**
 * A tool call to a computer use tool. See the
 * [computer use guide](https://platform.openai.com/docs/guides/tools-computer-use) for more information.
 */
export interface InputItemComputerToolCall extends InputItem {
  /** The type of the computer call. Always `computer_call`. */
  type: "computer_call";
  /** The unique ID of the computer call. */
  id: string;
  /** An identifier used when responding to the tool call with output. */
  call_id: string;
  action: ComputerActionUnion;
  /** The pending safety checks for the computer call. */
  pending_safety_checks: ComputerCallSafetyCheckParam[];
  /**
   * The status of the item. One of `in_progress`, `completed`, or
   *   `incomplete`. Populated when items are returned via API.
   */
  status: "in_progress" | "completed" | "incomplete";
}

export function inputItemComputerToolCallSerializer(item: InputItemComputerToolCall): any {
  return {
    type: item["type"],
    id: item["id"],
    call_id: item["call_id"],
    action: computerActionUnionSerializer(item["action"]),
    pending_safety_checks: computerCallSafetyCheckParamArraySerializer(
      item["pending_safety_checks"],
    ),
    status: item["status"],
  };
}

/** model interface ComputerAction */
export interface ComputerAction {
  type: ComputerActionType;
}

export function computerActionSerializer(item: ComputerAction): any {
  return { type: item["type"] };
}

/** Alias for ComputerActionUnion */
export type ComputerActionUnion =
  | ClickParam
  | DoubleClickAction
  | Drag
  | KeyPressAction
  | Move
  | Screenshot
  | Scroll
  | Type
  | Wait
  | ComputerAction;

export function computerActionUnionSerializer(item: ComputerActionUnion): any {
  switch (item.type) {
    case "click":
      return clickParamSerializer(item as ClickParam);

    case "double_click":
      return doubleClickActionSerializer(item as DoubleClickAction);

    case "drag":
      return dragSerializer(item as Drag);

    case "keypress":
      return keyPressActionSerializer(item as KeyPressAction);

    case "move":
      return moveSerializer(item as Move);

    case "screenshot":
      return screenshotSerializer(item as Screenshot);

    case "scroll":
      return scrollSerializer(item as Scroll);

    case "type":
      return typeSerializer(item as Type);

    case "wait":
      return waitSerializer(item as Wait);

    default:
      return computerActionSerializer(item);
  }
}

/** Type of ComputerActionType */
export type ComputerActionType =
  | "click"
  | "double_click"
  | "drag"
  | "keypress"
  | "move"
  | "screenshot"
  | "scroll"
  | "type"
  | "wait";

/** A click action. */
export interface ClickParam extends ComputerAction {
  /** Specifies the event type. For a click action, this property is always `click`. */
  type: "click";
  /** Indicates which mouse button was pressed during the click. One of `left`, `right`, `wheel`, `back`, or `forward`. */
  button: ClickButtonType;
  /** The x-coordinate where the click occurred. */
  x: number;
  /** The y-coordinate where the click occurred. */
  y: number;
}

export function clickParamSerializer(item: ClickParam): any {
  return { type: item["type"], button: item["button"], x: item["x"], y: item["y"] };
}

/** Type of ClickButtonType */
export type ClickButtonType = "left" | "right" | "wheel" | "back" | "forward";

/** A double click action. */
export interface DoubleClickAction extends ComputerAction {
  /** Specifies the event type. For a double click action, this property is always set to `double_click`. */
  type: "double_click";
  /** The x-coordinate where the double click occurred. */
  x: number;
  /** The y-coordinate where the double click occurred. */
  y: number;
}

export function doubleClickActionSerializer(item: DoubleClickAction): any {
  return { type: item["type"], x: item["x"], y: item["y"] };
}

/** A drag action. */
export interface Drag extends ComputerAction {
  /**
   * Specifies the event type. For a drag action, this property is
   *   always set to `drag`.
   */
  type: "drag";
  /**
   * An array of coordinates representing the path of the drag action. Coordinates will appear as an array
   *   of objects, eg
   *   ```
   *   [
   *     { x: 100, y: 200 },
   *     { x: 200, y: 300 }
   *   ]
   *   ```
   */
  path: DragPoint[];
}

export function dragSerializer(item: Drag): any {
  return { type: item["type"], path: dragPointArraySerializer(item["path"]) };
}

export function dragPointArraySerializer(result: Array<DragPoint>): any[] {
  return result.map((item) => {
    return dragPointSerializer(item);
  });
}

/** An x/y coordinate pair, e.g. `{ x: 100, y: 200 }`. */
export interface DragPoint {
  /** The x-coordinate. */
  x: number;
  /** The y-coordinate. */
  y: number;
}

export function dragPointSerializer(item: DragPoint): any {
  return { x: item["x"], y: item["y"] };
}

/** A collection of keypresses the model would like to perform. */
export interface KeyPressAction extends ComputerAction {
  /** Specifies the event type. For a keypress action, this property is always set to `keypress`. */
  type: "keypress";
  /** The combination of keys the model is requesting to be pressed. This is an array of strings, each representing a key. */
  keys: string[];
}

export function keyPressActionSerializer(item: KeyPressAction): any {
  return {
    type: item["type"],
    keys: item["keys"].map((p: any) => {
      return p;
    }),
  };
}

/** A mouse move action. */
export interface Move extends ComputerAction {
  /**
   * Specifies the event type. For a move action, this property is
   *   always set to `move`.
   */
  type: "move";
  /** The x-coordinate to move to. */
  x: number;
  /** The y-coordinate to move to. */
  y: number;
}

export function moveSerializer(item: Move): any {
  return { type: item["type"], x: item["x"], y: item["y"] };
}

/** A screenshot action. */
export interface Screenshot extends ComputerAction {
  /**
   * Specifies the event type. For a screenshot action, this property is
   *   always set to `screenshot`.
   */
  type: "screenshot";
}

export function screenshotSerializer(item: Screenshot): any {
  return { type: item["type"] };
}

/** A scroll action. */
export interface Scroll extends ComputerAction {
  /**
   * Specifies the event type. For a scroll action, this property is
   *   always set to `scroll`.
   */
  type: "scroll";
  /** The x-coordinate where the scroll occurred. */
  x: number;
  /** The y-coordinate where the scroll occurred. */
  y: number;
  /** The horizontal scroll distance. */
  scroll_x: number;
  /** The vertical scroll distance. */
  scroll_y: number;
}

export function scrollSerializer(item: Scroll): any {
  return {
    type: item["type"],
    x: item["x"],
    y: item["y"],
    scroll_x: item["scroll_x"],
    scroll_y: item["scroll_y"],
  };
}

/** An action to type in text. */
export interface Type extends ComputerAction {
  /**
   * Specifies the event type. For a type action, this property is
   *   always set to `type`.
   */
  type: "type";
  /** The text to type. */
  text: string;
}

export function typeSerializer(item: Type): any {
  return { type: item["type"], text: item["text"] };
}

/** A wait action. */
export interface Wait extends ComputerAction {
  /**
   * Specifies the event type. For a wait action, this property is
   *   always set to `wait`.
   */
  type: "wait";
}

export function waitSerializer(item: Wait): any {
  return { type: item["type"] };
}

export function computerCallSafetyCheckParamArraySerializer(
  result: Array<ComputerCallSafetyCheckParam>,
): any[] {
  return result.map((item) => {
    return computerCallSafetyCheckParamSerializer(item);
  });
}

/** A pending safety check for the computer call. */
export interface ComputerCallSafetyCheckParam {
  /** The ID of the pending safety check. */
  id: string;
  code?: string;
  message?: string;
}

export function computerCallSafetyCheckParamSerializer(item: ComputerCallSafetyCheckParam): any {
  return { id: item["id"], code: item["code"], message: item["message"] };
}

/** The output of a computer tool call. */
export interface InputItemComputerCallOutputItemParam extends InputItem {
  id?: string;
  /** The ID of the computer tool call that produced the output. */
  call_id: string;
  /** The type of the computer tool call output. Always `computer_call_output`. */
  type: "computer_call_output";
  output: ComputerScreenshotImage;
  acknowledged_safety_checks?: ComputerCallSafetyCheckParam[];
  status?: FunctionCallItemStatus;
}

export function inputItemComputerCallOutputItemParamSerializer(
  item: InputItemComputerCallOutputItemParam,
): any {
  return {
    type: item["type"],
    id: item["id"],
    call_id: item["call_id"],
    output: computerScreenshotImageSerializer(item["output"]),
    acknowledged_safety_checks: !item["acknowledged_safety_checks"]
      ? item["acknowledged_safety_checks"]
      : computerCallSafetyCheckParamArraySerializer(item["acknowledged_safety_checks"]),
    status: item["status"],
  };
}

/** A computer screenshot image used with the computer use tool. */
export interface ComputerScreenshotImage {
  /**
   * Specifies the event type. For a computer screenshot, this property is
   *   always set to `computer_screenshot`.
   */
  type: "computer_screenshot";
  /** The URL of the screenshot image. */
  image_url?: string;
  /** The identifier of an uploaded file that contains the screenshot. */
  file_id?: string;
}

export function computerScreenshotImageSerializer(item: ComputerScreenshotImage): any {
  return { type: item["type"], image_url: item["image_url"], file_id: item["file_id"] };
}

/** Type of FunctionCallItemStatus */
export type FunctionCallItemStatus = "in_progress" | "completed" | "incomplete";

/**
 * The results of a web search tool call. See the
 * [web search guide](https://platform.openai.com/docs/guides/tools-web-search) for more information.
 */
export interface InputItemWebSearchToolCall extends InputItem {
  /** The unique ID of the web search tool call. */
  id: string;
  /** The type of the web search tool call. Always `web_search_call`. */
  type: "web_search_call";
  /** The status of the web search tool call. */
  status: "in_progress" | "searching" | "completed" | "failed";
  /**
   * An object describing the specific action taken in this web search call.
   *   Includes details on how the model used the web (search, open_page, find).
   */
  action: WebSearchActionSearch | WebSearchActionOpenPage | WebSearchActionFind;
}

export function inputItemWebSearchToolCallSerializer(item: InputItemWebSearchToolCall): any {
  return {
    type: item["type"],
    id: item["id"],
    status: item["status"],
    action: _outputItemWebSearchToolCallActionSerializer(item["action"]),
  };
}

/** Alias for _OutputItemWebSearchToolCallAction */
export type _OutputItemWebSearchToolCallAction =
  | WebSearchActionSearch
  | WebSearchActionOpenPage
  | WebSearchActionFind;

export function _outputItemWebSearchToolCallActionSerializer(
  item: _OutputItemWebSearchToolCallAction,
): any {
  return item;
}

/** Action type "search" - Performs a web search query. */
export interface WebSearchActionSearch {
  /** The action type. */
  type: "search";
  /** [DEPRECATED] The search query. */
  query: string;
  /** The search queries. */
  queries?: string[];
  /** The sources used in the search. */
  sources?: WebSearchActionSearchSources[];
}

export function webSearchActionSearchSerializer(item: WebSearchActionSearch): any {
  return {
    type: item["type"],
    query: item["query"],
    queries: !item["queries"]
      ? item["queries"]
      : item["queries"].map((p: any) => {
          return p;
        }),
    sources: !item["sources"]
      ? item["sources"]
      : webSearchActionSearchSourcesArraySerializer(item["sources"]),
  };
}

export function webSearchActionSearchSourcesArraySerializer(
  result: Array<WebSearchActionSearchSources>,
): any[] {
  return result.map((item) => {
    return webSearchActionSearchSourcesSerializer(item);
  });
}

/** model interface WebSearchActionSearchSources */
export interface WebSearchActionSearchSources {
  type: "url";
  url: string;
}

export function webSearchActionSearchSourcesSerializer(item: WebSearchActionSearchSources): any {
  return { type: item["type"], url: item["url"] };
}

/** Action type "open_page" - Opens a specific URL from search results. */
export interface WebSearchActionOpenPage {
  /** The action type. */
  type: "open_page";
  /** The URL opened by the model. */
  url: string;
}

export function webSearchActionOpenPageSerializer(item: WebSearchActionOpenPage): any {
  return { type: item["type"], url: item["url"] };
}

/** Action type "find": Searches for a pattern within a loaded page. */
export interface WebSearchActionFind {
  /** The action type. */
  type: "find_in_page";
  /** The URL of the page searched for the pattern. */
  url: string;
  /** The pattern or text to search for within the page. */
  pattern: string;
}

export function webSearchActionFindSerializer(item: WebSearchActionFind): any {
  return { type: item["type"], url: item["url"], pattern: item["pattern"] };
}

/**
 * A tool call to run a function. See the
 * [function calling guide](https://platform.openai.com/docs/guides/function-calling) for more information.
 */
export interface InputItemFunctionToolCall extends InputItem {
  /** The unique ID of the function tool call. */
  id?: string;
  /** The type of the function tool call. Always `function_call`. */
  type: "function_call";
  /** The unique ID of the function tool call generated by the model. */
  call_id: string;
  /** The name of the function to run. */
  name: string;
  /** A JSON string of the arguments to pass to the function. */
  arguments: string;
  /**
   * The status of the item. One of `in_progress`, `completed`, or
   *   `incomplete`. Populated when items are returned via API.
   */
  status?: "in_progress" | "completed" | "incomplete";
}

export function inputItemFunctionToolCallSerializer(item: InputItemFunctionToolCall): any {
  return {
    type: item["type"],
    id: item["id"],
    call_id: item["call_id"],
    name: item["name"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

/** The output of a function tool call. */
export interface InputItemFunctionCallOutputItemParam extends InputItem {
  id?: string;
  /** The unique ID of the function tool call generated by the model. */
  call_id: string;
  /** The type of the function tool call output. Always `function_call_output`. */
  type: "function_call_output";
  /** Text, image, or file output of the function tool call. */
  output:
    | string
    | (InputTextContentParam | InputImageContentParamAutoParam | InputFileContentParam)[];
  status?: FunctionCallItemStatus;
}

export function inputItemFunctionCallOutputItemParamSerializer(
  item: InputItemFunctionCallOutputItemParam,
): any {
  return {
    type: item["type"],
    id: item["id"],
    call_id: item["call_id"],
    output: _itemFunctionCallOutputItemParamOutputSerializer(item["output"]),
    status: item["status"],
  };
}

/** Alias for _ItemFunctionCallOutputItemParamOutput */
export type _ItemFunctionCallOutputItemParamOutput =
  | string
  | (InputTextContentParam | InputImageContentParamAutoParam | InputFileContentParam)[];

export function _itemFunctionCallOutputItemParamOutputSerializer(
  item: _ItemFunctionCallOutputItemParamOutput,
): any {
  return item;
}

export function _itemFunctionCallOutputItemParamOutput1ArraySerializer(
  result: Array<_ItemFunctionCallOutputItemParamOutput1>,
): any[] {
  return result.map((item) => {
    return _itemFunctionCallOutputItemParamOutput1Serializer(item);
  });
}

/** Alias for _ItemFunctionCallOutputItemParamOutput1 */
export type _ItemFunctionCallOutputItemParamOutput1 =
  | InputTextContentParam
  | InputImageContentParamAutoParam
  | InputFileContentParam;

export function _itemFunctionCallOutputItemParamOutput1Serializer(
  item: _ItemFunctionCallOutputItemParamOutput1,
): any {
  return item;
}

/** A text input to the model. */
export interface InputTextContentParam {
  /** The type of the input item. Always `input_text`. */
  type: "input_text";
  /** The text input to the model. */
  text: string;
}

export function inputTextContentParamSerializer(item: InputTextContentParam): any {
  return { type: item["type"], text: item["text"] };
}

/** An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision) */
export interface InputImageContentParamAutoParam {
  /** The type of the input item. Always `input_image`. */
  type: "input_image";
  image_url?: string;
  file_id?: string;
  detail?: DetailEnum;
}

export function inputImageContentParamAutoParamSerializer(
  item: InputImageContentParamAutoParam,
): any {
  return {
    type: item["type"],
    image_url: item["image_url"],
    file_id: item["file_id"],
    detail: item["detail"],
  };
}

/** Type of DetailEnum */
export type DetailEnum = "low" | "high" | "auto";

/** A file input to the model. */
export interface InputFileContentParam {
  /** The type of the input item. Always `input_file`. */
  type: "input_file";
  file_id?: string;
  filename?: string;
  file_data?: string;
  file_url?: string;
}

export function inputFileContentParamSerializer(item: InputFileContentParam): any {
  return {
    type: item["type"],
    file_id: item["file_id"],
    filename: item["filename"],
    file_data: item["file_data"],
    file_url: item["file_url"],
  };
}

/**
 * A description of the chain of thought used by a reasoning model while generating
 * a response. Be sure to include these items in your `input` to the Responses API
 * for subsequent turns of a conversation if you are manually
 * [managing context](https://platform.openai.com/docs/guides/conversation-state).
 */
export interface InputItemReasoningItem extends InputItem {
  /** The type of the object. Always `reasoning`. */
  type: "reasoning";
  /** The unique identifier of the reasoning content. */
  id: string;
  encrypted_content?: string;
  /** Reasoning summary content. */
  summary: Summary[];
  /** Reasoning text content. */
  content?: ReasoningTextContent[];
  /**
   * The status of the item. One of `in_progress`, `completed`, or
   *   `incomplete`. Populated when items are returned via API.
   */
  status?: "in_progress" | "completed" | "incomplete";
}

export function inputItemReasoningItemSerializer(item: InputItemReasoningItem): any {
  return {
    type: item["type"],
    id: item["id"],
    encrypted_content: item["encrypted_content"],
    summary: summaryArraySerializer(item["summary"]),
    content: !item["content"]
      ? item["content"]
      : reasoningTextContentArraySerializer(item["content"]),
    status: item["status"],
  };
}

export function summaryArraySerializer(result: Array<Summary>): any[] {
  return result.map((item) => {
    return summarySerializer(item);
  });
}

/** A summary text from the model. */
export interface Summary {
  /** The type of the object. Always `summary_text`. */
  type: "summary_text";
  /** A summary of the reasoning output from the model so far. */
  text: string;
}

export function summarySerializer(item: Summary): any {
  return { type: item["type"], text: item["text"] };
}

export function reasoningTextContentArraySerializer(result: Array<ReasoningTextContent>): any[] {
  return result.map((item) => {
    return reasoningTextContentSerializer(item);
  });
}

/** Reasoning text from the model. */
export interface ReasoningTextContent {
  /** The type of the reasoning text. Always `reasoning_text`. */
  type: "reasoning_text";
  /** The reasoning text from the model. */
  text: string;
}

export function reasoningTextContentSerializer(item: ReasoningTextContent): any {
  return { type: item["type"], text: item["text"] };
}

/** A compaction item generated by the [`v1/responses/compact` API](https://platform.openai.com/docs/api-reference/responses/compact). */
export interface InputItemCompactionSummaryItemParam extends InputItem {
  id?: string;
  /** The type of the item. Always `compaction`. */
  type: "compaction";
  /** The encrypted content of the compaction summary. */
  encrypted_content: string;
}

export function inputItemCompactionSummaryItemParamSerializer(
  item: InputItemCompactionSummaryItemParam,
): any {
  return { type: item["type"], id: item["id"], encrypted_content: item["encrypted_content"] };
}

/** An image generation request made by the model. */
export interface InputItemImageGenToolCall extends InputItem {
  /** The type of the image generation call. Always `image_generation_call`. */
  type: "image_generation_call";
  /** The unique ID of the image generation call. */
  id: string;
  /** The status of the image generation call. */
  status: "in_progress" | "completed" | "generating" | "failed";
  result: string;
}

export function inputItemImageGenToolCallSerializer(item: InputItemImageGenToolCall): any {
  return { type: item["type"], id: item["id"], status: item["status"], result: item["result"] };
}

/** A tool call to run code. */
export interface InputItemCodeInterpreterToolCall extends InputItem {
  /** The type of the code interpreter tool call. Always `code_interpreter_call`. */
  type: "code_interpreter_call";
  /** The unique ID of the code interpreter tool call. */
  id: string;
  /** The status of the code interpreter tool call. Valid values are `in_progress`, `completed`, `incomplete`, `interpreting`, and `failed`. */
  status: "in_progress" | "completed" | "incomplete" | "interpreting" | "failed";
  /** The ID of the container used to run the code. */
  container_id: string;
  code: string;
  outputs: (CodeInterpreterOutputLogs | CodeInterpreterOutputImage)[];
}

export function inputItemCodeInterpreterToolCallSerializer(
  item: InputItemCodeInterpreterToolCall,
): any {
  return {
    type: item["type"],
    id: item["id"],
    status: item["status"],
    container_id: item["container_id"],
    code: item["code"],
    outputs: !item["outputs"]
      ? item["outputs"]
      : _outputItemCodeInterpreterToolCallOutputArraySerializer(item["outputs"]),
  };
}

export function _outputItemCodeInterpreterToolCallOutputArraySerializer(
  result: Array<_OutputItemCodeInterpreterToolCallOutput>,
): any[] {
  return result.map((item) => {
    return _outputItemCodeInterpreterToolCallOutputSerializer(item);
  });
}

/** Alias for _OutputItemCodeInterpreterToolCallOutput */
export type _OutputItemCodeInterpreterToolCallOutput =
  | CodeInterpreterOutputLogs
  | CodeInterpreterOutputImage;

export function _outputItemCodeInterpreterToolCallOutputSerializer(
  item: _OutputItemCodeInterpreterToolCallOutput,
): any {
  return item;
}

/** The logs output from the code interpreter. */
export interface CodeInterpreterOutputLogs {
  /** The type of the output. Always `logs`. */
  type: "logs";
  /** The logs output from the code interpreter. */
  logs: string;
}

export function codeInterpreterOutputLogsSerializer(item: CodeInterpreterOutputLogs): any {
  return { type: item["type"], logs: item["logs"] };
}

/** The image output from the code interpreter. */
export interface CodeInterpreterOutputImage {
  /** The type of the output. Always `image`. */
  type: "image";
  /** The URL of the image output from the code interpreter. */
  url: string;
}

export function codeInterpreterOutputImageSerializer(item: CodeInterpreterOutputImage): any {
  return { type: item["type"], url: item["url"] };
}

/** A tool call to run a command on the local shell. */
export interface InputItemLocalShellToolCall extends InputItem {
  /** The type of the local shell call. Always `local_shell_call`. */
  type: "local_shell_call";
  /** The unique ID of the local shell call. */
  id: string;
  /** The unique ID of the local shell tool call generated by the model. */
  call_id: string;
  action: LocalShellExecAction;
  /** The status of the local shell call. */
  status: "in_progress" | "completed" | "incomplete";
}

export function inputItemLocalShellToolCallSerializer(item: InputItemLocalShellToolCall): any {
  return {
    type: item["type"],
    id: item["id"],
    call_id: item["call_id"],
    action: localShellExecActionSerializer(item["action"]),
    status: item["status"],
  };
}

/** Execute a shell command on the server. */
export interface LocalShellExecAction {
  /** The type of the local shell action. Always `exec`. */
  type: "exec";
  /** The command to run. */
  command: string[];
  timeout_ms?: number;
  working_directory?: string;
  /** Environment variables to set for the command. */
  env: Record<string, string>;
  user?: string;
}

export function localShellExecActionSerializer(item: LocalShellExecAction): any {
  return {
    type: item["type"],
    command: item["command"].map((p: any) => {
      return p;
    }),
    timeout_ms: item["timeout_ms"],
    working_directory: item["working_directory"],
    env: item["env"],
    user: item["user"],
  };
}

/** The output of a local shell tool call. */
export interface InputItemLocalShellToolCallOutput extends InputItem {
  /** The type of the local shell tool call output. Always `local_shell_call_output`. */
  type: "local_shell_call_output";
  /** The unique ID of the local shell tool call generated by the model. */
  id: string;
  /** A JSON string of the output of the local shell tool call. */
  output: string;
  status?: "in_progress" | "completed" | "incomplete";
}

export function inputItemLocalShellToolCallOutputSerializer(
  item: InputItemLocalShellToolCallOutput,
): any {
  return { type: item["type"], id: item["id"], output: item["output"], status: item["status"] };
}

/** A tool representing a request to execute one or more shell commands. */
export interface InputItemFunctionShellCallItemParam extends InputItem {
  id?: string;
  /** The unique ID of the shell tool call generated by the model. */
  call_id: string;
  /** The type of the item. Always `shell_call`. */
  type: "shell_call";
  /** The shell commands and limits that describe how to run the tool call. */
  action: FunctionShellActionParam;
  status?: FunctionShellCallItemStatus;
}

export function inputItemFunctionShellCallItemParamSerializer(
  item: InputItemFunctionShellCallItemParam,
): any {
  return {
    type: item["type"],
    id: item["id"],
    call_id: item["call_id"],
    action: functionShellActionParamSerializer(item["action"]),
    status: item["status"],
  };
}

/** Commands and limits describing how to run the shell tool call. */
export interface FunctionShellActionParam {
  /** Ordered shell commands for the execution environment to run. */
  commands: string[];
  timeout_ms?: number;
  max_output_length?: number;
}

export function functionShellActionParamSerializer(item: FunctionShellActionParam): any {
  return {
    commands: item["commands"].map((p: any) => {
      return p;
    }),
    timeout_ms: item["timeout_ms"],
    max_output_length: item["max_output_length"],
  };
}

/** Status values reported for shell tool calls. */
export type FunctionShellCallItemStatus = "in_progress" | "completed" | "incomplete";

/** The streamed output items emitted by a shell tool call. */
export interface InputItemFunctionShellCallOutputItemParam extends InputItem {
  id?: string;
  /** The unique ID of the shell tool call generated by the model. */
  call_id: string;
  /** The type of the item. Always `shell_call_output`. */
  type: "shell_call_output";
  /** Captured chunks of stdout and stderr output, along with their associated outcomes. */
  output: FunctionShellCallOutputContentParam[];
  max_output_length?: number;
}

export function inputItemFunctionShellCallOutputItemParamSerializer(
  item: InputItemFunctionShellCallOutputItemParam,
): any {
  return {
    type: item["type"],
    id: item["id"],
    call_id: item["call_id"],
    output: functionShellCallOutputContentParamArraySerializer(item["output"]),
    max_output_length: item["max_output_length"],
  };
}

export function functionShellCallOutputContentParamArraySerializer(
  result: Array<FunctionShellCallOutputContentParam>,
): any[] {
  return result.map((item) => {
    return functionShellCallOutputContentParamSerializer(item);
  });
}

/** Captured stdout and stderr for a portion of a shell tool call output. */
export interface FunctionShellCallOutputContentParam {
  /** Captured stdout output for the shell call. */
  stdout: string;
  /** Captured stderr output for the shell call. */
  stderr: string;
  /** The exit or timeout outcome associated with this shell call. */
  outcome: FunctionShellCallOutputOutcomeParamUnion;
}

export function functionShellCallOutputContentParamSerializer(
  item: FunctionShellCallOutputContentParam,
): any {
  return {
    stdout: item["stdout"],
    stderr: item["stderr"],
    outcome: functionShellCallOutputOutcomeParamUnionSerializer(item["outcome"]),
  };
}

/** The exit or timeout outcome associated with this shell call. */
export interface FunctionShellCallOutputOutcomeParam {
  type: FunctionShellCallOutputOutcomeParamType;
}

export function functionShellCallOutputOutcomeParamSerializer(
  item: FunctionShellCallOutputOutcomeParam,
): any {
  return { type: item["type"] };
}

/** Alias for FunctionShellCallOutputOutcomeParamUnion */
export type FunctionShellCallOutputOutcomeParamUnion =
  | FunctionShellCallOutputTimeoutOutcomeParam
  | FunctionShellCallOutputExitOutcomeParam
  | FunctionShellCallOutputOutcomeParam;

export function functionShellCallOutputOutcomeParamUnionSerializer(
  item: FunctionShellCallOutputOutcomeParamUnion,
): any {
  switch (item.type) {
    case "timeout":
      return functionShellCallOutputTimeoutOutcomeParamSerializer(
        item as FunctionShellCallOutputTimeoutOutcomeParam,
      );

    case "exit":
      return functionShellCallOutputExitOutcomeParamSerializer(
        item as FunctionShellCallOutputExitOutcomeParam,
      );

    default:
      return functionShellCallOutputOutcomeParamSerializer(item);
  }
}

/** Type of FunctionShellCallOutputOutcomeParamType */
export type FunctionShellCallOutputOutcomeParamType = "timeout" | "exit";

/** Indicates that the shell call exceeded its configured time limit. */
export interface FunctionShellCallOutputTimeoutOutcomeParam extends FunctionShellCallOutputOutcomeParam {
  /** The outcome type. Always `timeout`. */
  type: "timeout";
}

export function functionShellCallOutputTimeoutOutcomeParamSerializer(
  item: FunctionShellCallOutputTimeoutOutcomeParam,
): any {
  return { type: item["type"] };
}

/** Indicates that the shell commands finished and returned an exit code. */
export interface FunctionShellCallOutputExitOutcomeParam extends FunctionShellCallOutputOutcomeParam {
  /** The outcome type. Always `exit`. */
  type: "exit";
  /** The exit code returned by the shell process. */
  exit_code: number;
}

export function functionShellCallOutputExitOutcomeParamSerializer(
  item: FunctionShellCallOutputExitOutcomeParam,
): any {
  return { type: item["type"], exit_code: item["exit_code"] };
}

/** A tool call representing a request to create, delete, or update files using diff patches. */
export interface InputItemApplyPatchToolCallItemParam extends InputItem {
  /** The type of the item. Always `apply_patch_call`. */
  type: "apply_patch_call";
  id?: string;
  /** The unique ID of the apply patch tool call generated by the model. */
  call_id: string;
  /** The status of the apply patch tool call. One of `in_progress` or `completed`. */
  status: ApplyPatchCallStatusParam;
  /** The specific create, delete, or update instruction for the apply_patch tool call. */
  operation: ApplyPatchOperationParamUnion;
}

export function inputItemApplyPatchToolCallItemParamSerializer(
  item: InputItemApplyPatchToolCallItemParam,
): any {
  return {
    type: item["type"],
    id: item["id"],
    call_id: item["call_id"],
    status: item["status"],
    operation: applyPatchOperationParamUnionSerializer(item["operation"]),
  };
}

/** Status values reported for apply_patch tool calls. */
export type ApplyPatchCallStatusParam = "in_progress" | "completed";

/** One of the create_file, delete_file, or update_file operations supplied to the apply_patch tool. */
export interface ApplyPatchOperationParam {
  type: ApplyPatchOperationParamType;
}

export function applyPatchOperationParamSerializer(item: ApplyPatchOperationParam): any {
  return { type: item["type"] };
}

/** Alias for ApplyPatchOperationParamUnion */
export type ApplyPatchOperationParamUnion =
  | ApplyPatchCreateFileOperationParam
  | ApplyPatchDeleteFileOperationParam
  | ApplyPatchUpdateFileOperationParam
  | ApplyPatchOperationParam;

export function applyPatchOperationParamUnionSerializer(item: ApplyPatchOperationParamUnion): any {
  switch (item.type) {
    case "create_file":
      return applyPatchCreateFileOperationParamSerializer(
        item as ApplyPatchCreateFileOperationParam,
      );

    case "delete_file":
      return applyPatchDeleteFileOperationParamSerializer(
        item as ApplyPatchDeleteFileOperationParam,
      );

    case "update_file":
      return applyPatchUpdateFileOperationParamSerializer(
        item as ApplyPatchUpdateFileOperationParam,
      );

    default:
      return applyPatchOperationParamSerializer(item);
  }
}

/** Type of ApplyPatchOperationParamType */
export type ApplyPatchOperationParamType = "create_file" | "delete_file" | "update_file";

/** Instruction for creating a new file via the apply_patch tool. */
export interface ApplyPatchCreateFileOperationParam extends ApplyPatchOperationParam {
  /** The operation type. Always `create_file`. */
  type: "create_file";
  /** Path of the file to create relative to the workspace root. */
  path: string;
  /** Unified diff content to apply when creating the file. */
  diff: string;
}

export function applyPatchCreateFileOperationParamSerializer(
  item: ApplyPatchCreateFileOperationParam,
): any {
  return { type: item["type"], path: item["path"], diff: item["diff"] };
}

/** Instruction for deleting an existing file via the apply_patch tool. */
export interface ApplyPatchDeleteFileOperationParam extends ApplyPatchOperationParam {
  /** The operation type. Always `delete_file`. */
  type: "delete_file";
  /** Path of the file to delete relative to the workspace root. */
  path: string;
}

export function applyPatchDeleteFileOperationParamSerializer(
  item: ApplyPatchDeleteFileOperationParam,
): any {
  return { type: item["type"], path: item["path"] };
}

/** Instruction for updating an existing file via the apply_patch tool. */
export interface ApplyPatchUpdateFileOperationParam extends ApplyPatchOperationParam {
  /** The operation type. Always `update_file`. */
  type: "update_file";
  /** Path of the file to update relative to the workspace root. */
  path: string;
  /** Unified diff content to apply to the existing file. */
  diff: string;
}

export function applyPatchUpdateFileOperationParamSerializer(
  item: ApplyPatchUpdateFileOperationParam,
): any {
  return { type: item["type"], path: item["path"], diff: item["diff"] };
}

/** The streamed output emitted by an apply patch tool call. */
export interface InputItemApplyPatchToolCallOutputItemParam extends InputItem {
  /** The type of the item. Always `apply_patch_call_output`. */
  type: "apply_patch_call_output";
  id?: string;
  /** The unique ID of the apply patch tool call generated by the model. */
  call_id: string;
  /** The status of the apply patch tool call output. One of `completed` or `failed`. */
  status: ApplyPatchCallOutputStatusParam;
  output?: string;
}

export function inputItemApplyPatchToolCallOutputItemParamSerializer(
  item: InputItemApplyPatchToolCallOutputItemParam,
): any {
  return {
    type: item["type"],
    id: item["id"],
    call_id: item["call_id"],
    status: item["status"],
    output: item["output"],
  };
}

/** Outcome values reported for apply_patch tool call outputs. */
export type ApplyPatchCallOutputStatusParam = "completed" | "failed";

/** A list of tools available on an MCP server. */
export interface InputItemMcpListTools extends InputItem {
  /** The type of the item. Always `mcp_list_tools`. */
  type: "mcp_list_tools";
  /** The unique ID of the list. */
  id: string;
  /** The label of the MCP server. */
  server_label: string;
  /** The tools available on the server. */
  tools: MCPListToolsTool[];
  error?: string;
}

export function inputItemMcpListToolsSerializer(item: InputItemMcpListTools): any {
  return {
    type: item["type"],
    id: item["id"],
    server_label: item["server_label"],
    tools: mcpListToolsToolArraySerializer(item["tools"]),
    error: item["error"],
  };
}

export function mcpListToolsToolArraySerializer(result: Array<MCPListToolsTool>): any[] {
  return result.map((item) => {
    return mcpListToolsToolSerializer(item);
  });
}

/** A tool available on an MCP server. */
export interface MCPListToolsTool {
  /** The name of the tool. */
  name: string;
  description?: string;
  /** The JSON schema describing the tool's input. */
  input_schema: MCPListToolsToolInputSchema;
  annotations?: MCPListToolsToolAnnotations;
}

export function mcpListToolsToolSerializer(item: MCPListToolsTool): any {
  return {
    name: item["name"],
    description: item["description"],
    input_schema: mcpListToolsToolInputSchemaSerializer(item["input_schema"]),
    annotations: !item["annotations"]
      ? item["annotations"]
      : mcpListToolsToolAnnotationsSerializer(item["annotations"]),
  };
}

/** model interface MCPListToolsToolInputSchema */
export interface MCPListToolsToolInputSchema {}

export function mcpListToolsToolInputSchemaSerializer(item: MCPListToolsToolInputSchema): any {
  return item;
}

/** model interface MCPListToolsToolAnnotations */
export interface MCPListToolsToolAnnotations {}

export function mcpListToolsToolAnnotationsSerializer(item: MCPListToolsToolAnnotations): any {
  return item;
}

/** A request for human approval of a tool invocation. */
export interface InputItemMcpApprovalRequest extends InputItem {
  /** The type of the item. Always `mcp_approval_request`. */
  type: "mcp_approval_request";
  /** The unique ID of the approval request. */
  id: string;
  /** The label of the MCP server making the request. */
  server_label: string;
  /** The name of the tool to run. */
  name: string;
  /** A JSON string of arguments for the tool. */
  arguments: string;
}

export function inputItemMcpApprovalRequestSerializer(item: InputItemMcpApprovalRequest): any {
  return {
    type: item["type"],
    id: item["id"],
    server_label: item["server_label"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

/** A response to an MCP approval request. */
export interface InputItemMcpApprovalResponse extends InputItem {
  /** The type of the item. Always `mcp_approval_response`. */
  type: "mcp_approval_response";
  id?: string;
  /** The ID of the approval request being answered. */
  approval_request_id: string;
  /** Whether the request was approved. */
  approve: boolean;
  reason?: string;
}

export function inputItemMcpApprovalResponseSerializer(item: InputItemMcpApprovalResponse): any {
  return {
    type: item["type"],
    id: item["id"],
    approval_request_id: item["approval_request_id"],
    approve: item["approve"],
    reason: item["reason"],
  };
}

/** An invocation of a tool on an MCP server. */
export interface InputItemMcpToolCall extends InputItem {
  /** The type of the item. Always `mcp_call`. */
  type: "mcp_call";
  /** The unique ID of the tool call. */
  id: string;
  /** The label of the MCP server running the tool. */
  server_label: string;
  /** The name of the tool that was run. */
  name: string;
  /** A JSON string of the arguments passed to the tool. */
  arguments: string;
  output?: string;
  error?: string;
  /** The status of the tool call. One of `in_progress`, `completed`, `incomplete`, `calling`, or `failed`. */
  status?: MCPToolCallStatus;
  approval_request_id?: string;
}

export function inputItemMcpToolCallSerializer(item: InputItemMcpToolCall): any {
  return {
    type: item["type"],
    id: item["id"],
    server_label: item["server_label"],
    name: item["name"],
    arguments: item["arguments"],
    output: item["output"],
    error: item["error"],
    status: item["status"],
    approval_request_id: item["approval_request_id"],
  };
}

/** Type of MCPToolCallStatus */
export type MCPToolCallStatus = "in_progress" | "completed" | "incomplete" | "calling" | "failed";

/** The output of a custom tool call from your code, being sent back to the model. */
export interface InputItemCustomToolCallOutput extends InputItem {
  /** The type of the custom tool call output. Always `custom_tool_call_output`. */
  type: "custom_tool_call_output";
  /** The unique ID of the custom tool call output in the OpenAI platform. */
  id?: string;
  /** The call ID, used to map this custom tool call output to a custom tool call. */
  call_id: string;
  /**
   * The output from the custom tool call generated by your code.
   *   Can be a string or an list of output content.
   */
  output: string | FunctionAndCustomToolCallOutputUnion[];
}

export function inputItemCustomToolCallOutputSerializer(item: InputItemCustomToolCallOutput): any {
  return {
    type: item["type"],
    id: item["id"],
    call_id: item["call_id"],
    output: _itemCustomToolCallOutputOutputSerializer(item["output"]),
  };
}

/** Alias for _ItemCustomToolCallOutputOutput */
export type _ItemCustomToolCallOutputOutput = string | FunctionAndCustomToolCallOutputUnion[];

export function _itemCustomToolCallOutputOutputSerializer(
  item: _ItemCustomToolCallOutputOutput,
): any {
  return item;
}

export function functionAndCustomToolCallOutputUnionArraySerializer(
  result: Array<FunctionAndCustomToolCallOutputUnion>,
): any[] {
  return result.map((item) => {
    return functionAndCustomToolCallOutputUnionSerializer(item);
  });
}

/** model interface FunctionAndCustomToolCallOutput */
export interface FunctionAndCustomToolCallOutput {
  type: FunctionAndCustomToolCallOutputType;
}

export function functionAndCustomToolCallOutputSerializer(
  item: FunctionAndCustomToolCallOutput,
): any {
  return { type: item["type"] };
}

/** Alias for FunctionAndCustomToolCallOutputUnion */
export type FunctionAndCustomToolCallOutputUnion =
  | FunctionAndCustomToolCallOutputInputTextContent
  | FunctionAndCustomToolCallOutputInputImageContent
  | FunctionAndCustomToolCallOutputInputFileContent
  | FunctionAndCustomToolCallOutput;

export function functionAndCustomToolCallOutputUnionSerializer(
  item: FunctionAndCustomToolCallOutputUnion,
): any {
  switch (item.type) {
    case "input_text":
      return functionAndCustomToolCallOutputInputTextContentSerializer(
        item as FunctionAndCustomToolCallOutputInputTextContent,
      );

    case "input_image":
      return functionAndCustomToolCallOutputInputImageContentSerializer(
        item as FunctionAndCustomToolCallOutputInputImageContent,
      );

    case "input_file":
      return functionAndCustomToolCallOutputInputFileContentSerializer(
        item as FunctionAndCustomToolCallOutputInputFileContent,
      );

    default:
      return functionAndCustomToolCallOutputSerializer(item);
  }
}

/** Type of FunctionAndCustomToolCallOutputType */
export type FunctionAndCustomToolCallOutputType = "input_text" | "input_image" | "input_file";

/** A text input to the model. */
export interface FunctionAndCustomToolCallOutputInputTextContent extends FunctionAndCustomToolCallOutput {
  /** The type of the input item. Always `input_text`. */
  type: "input_text";
  /** The text input to the model. */
  text: string;
}

export function functionAndCustomToolCallOutputInputTextContentSerializer(
  item: FunctionAndCustomToolCallOutputInputTextContent,
): any {
  return { type: item["type"], text: item["text"] };
}

/** An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision). */
export interface FunctionAndCustomToolCallOutputInputImageContent extends FunctionAndCustomToolCallOutput {
  /** The type of the input item. Always `input_image`. */
  type: "input_image";
  image_url?: string;
  file_id?: string;
  /** The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`. */
  detail: ImageDetail;
}

export function functionAndCustomToolCallOutputInputImageContentSerializer(
  item: FunctionAndCustomToolCallOutputInputImageContent,
): any {
  return {
    type: item["type"],
    image_url: item["image_url"],
    file_id: item["file_id"],
    detail: item["detail"],
  };
}

/** A file input to the model. */
export interface FunctionAndCustomToolCallOutputInputFileContent extends FunctionAndCustomToolCallOutput {
  /** The type of the input item. Always `input_file`. */
  type: "input_file";
  file_id?: string;
  /** The name of the file to be sent to the model. */
  filename?: string;
  /** The URL of the file to be sent to the model. */
  file_url?: string;
  /** The content of the file to be sent to the model. */
  file_data?: string;
}

export function functionAndCustomToolCallOutputInputFileContentSerializer(
  item: FunctionAndCustomToolCallOutputInputFileContent,
): any {
  return {
    type: item["type"],
    file_id: item["file_id"],
    filename: item["filename"],
    file_url: item["file_url"],
    file_data: item["file_data"],
  };
}

/** A call to a custom tool created by the model. */
export interface InputItemCustomToolCall extends InputItem {
  /** The type of the custom tool call. Always `custom_tool_call`. */
  type: "custom_tool_call";
  /** The unique ID of the custom tool call in the OpenAI platform. */
  id?: string;
  /** An identifier used to map this custom tool call to a tool call output. */
  call_id: string;
  /** The name of the custom tool being called. */
  name: string;
  /** The input for the custom tool call generated by the model. */
  input: string;
}

export function inputItemCustomToolCallSerializer(item: InputItemCustomToolCall): any {
  return {
    type: item["type"],
    id: item["id"],
    call_id: item["call_id"],
    name: item["name"],
    input: item["input"],
  };
}

export function inputItemUnionArraySerializer(result: Array<InputItemUnion>): any[] {
  return result.map((item) => {
    return inputItemUnionSerializer(item);
  });
}

/** Memory search response. */
export interface MemoryStoreSearchResponse {
  /** The unique ID of this search request. Use this value as previous_search_id in subsequent requests to perform incremental searches. */
  search_id: string;
  /** Related memory items found during the search operation. */
  memories: MemorySearchItem[];
  /** Usage statistics associated with the memory search operation. */
  usage: MemoryStoreOperationUsage;
}

export function memoryStoreSearchResponseDeserializer(item: any): MemoryStoreSearchResponse {
  return {
    search_id: item["search_id"],
    memories: memorySearchItemArrayDeserializer(item["memories"]),
    usage: memoryStoreOperationUsageDeserializer(item["usage"]),
  };
}

export function memorySearchItemArrayDeserializer(result: Array<MemorySearchItem>): any[] {
  return result.map((item) => {
    return memorySearchItemDeserializer(item);
  });
}

/** A retrieved memory item from memory search. */
export interface MemorySearchItem {
  /** Retrieved memory item. */
  memory_item: MemoryItemUnion;
}

export function memorySearchItemDeserializer(item: any): MemorySearchItem {
  return {
    memory_item: memoryItemUnionDeserializer(item["memory_item"]),
  };
}

/** A single memory item stored in the memory store, containing content and metadata. */
export interface MemoryItem {
  /** The unique ID of the memory item. */
  memory_id: string;
  /** The last update time of the memory item. */
  updated_at: Date;
  /** The namespace that logically groups and isolates memories, such as a user ID. */
  scope: string;
  /** The content of the memory. */
  content: string;
  /** The kind of the memory item. */
  /** The discriminator possible values: user_profile, chat_summary */
  kind: MemoryItemKind;
}

export function memoryItemDeserializer(item: any): MemoryItem {
  return {
    memory_id: item["memory_id"],
    updated_at: new Date(item["updated_at"] * 1000),
    scope: item["scope"],
    content: item["content"],
    kind: item["kind"],
  };
}

/** Alias for MemoryItemUnion */
export type MemoryItemUnion = UserProfileMemoryItem | ChatSummaryMemoryItem | MemoryItem;

export function memoryItemUnionDeserializer(item: any): MemoryItemUnion {
  switch (item.kind) {
    case "user_profile":
      return userProfileMemoryItemDeserializer(item as UserProfileMemoryItem);

    case "chat_summary":
      return chatSummaryMemoryItemDeserializer(item as ChatSummaryMemoryItem);

    default:
      return memoryItemDeserializer(item);
  }
}

/** Memory item kind. */
export type MemoryItemKind = "user_profile" | "chat_summary";

/** A memory item specifically containing user profile information extracted from conversations, such as preferences, interests, and personal details. */
export interface UserProfileMemoryItem extends MemoryItem {
  /** The kind of the memory item. */
  kind: "user_profile";
}

export function userProfileMemoryItemDeserializer(item: any): UserProfileMemoryItem {
  return {
    memory_id: item["memory_id"],
    updated_at: new Date(item["updated_at"] * 1000),
    scope: item["scope"],
    content: item["content"],
    kind: item["kind"],
  };
}

/** A memory item containing a summary extracted from conversations. */
export interface ChatSummaryMemoryItem extends MemoryItem {
  /** The kind of the memory item. */
  kind: "chat_summary";
}

export function chatSummaryMemoryItemDeserializer(item: any): ChatSummaryMemoryItem {
  return {
    memory_id: item["memory_id"],
    updated_at: new Date(item["updated_at"] * 1000),
    scope: item["scope"],
    content: item["content"],
    kind: item["kind"],
  };
}

/** Usage statistics of a memory store operation. */
export interface MemoryStoreOperationUsage {
  /** The number of embedding tokens. */
  embedding_tokens: number;
  /** The number of input tokens. */
  input_tokens: number;
  /** A detailed breakdown of the input tokens. */
  input_tokens_details: ResponseUsageInputTokensDetails;
  /** The number of output tokens. */
  output_tokens: number;
  /** A detailed breakdown of the output tokens. */
  output_tokens_details: ResponseUsageOutputTokensDetails;
  /** The total number of tokens used. */
  total_tokens: number;
}

export function memoryStoreOperationUsageDeserializer(item: any): MemoryStoreOperationUsage {
  return {
    embedding_tokens: item["embedding_tokens"],
    input_tokens: item["input_tokens"],
    input_tokens_details: responseUsageInputTokensDetailsDeserializer(item["input_tokens_details"]),
    output_tokens: item["output_tokens"],
    output_tokens_details: responseUsageOutputTokensDetailsDeserializer(
      item["output_tokens_details"],
    ),
    total_tokens: item["total_tokens"],
  };
}

/** model interface ResponseUsageInputTokensDetails */
export interface ResponseUsageInputTokensDetails {
  cached_tokens: number;
}

export function responseUsageInputTokensDetailsDeserializer(
  item: any,
): ResponseUsageInputTokensDetails {
  return {
    cached_tokens: item["cached_tokens"],
  };
}

/** model interface ResponseUsageOutputTokensDetails */
export interface ResponseUsageOutputTokensDetails {
  reasoning_tokens: number;
}

export function responseUsageOutputTokensDetailsDeserializer(
  item: any,
): ResponseUsageOutputTokensDetails {
  return {
    reasoning_tokens: item["reasoning_tokens"],
  };
}

/** Provides the status of a memory store update operation. */
export interface MemoryStoreUpdateResponse {
  /** The unique ID of this update request. Use this value as previous_update_id in subsequent requests to perform incremental updates. */
  update_id: string;
  /** The status of the memory update operation. One of "queued", "in_progress", "completed", "failed", or "superseded". */
  status: MemoryStoreUpdateStatus;
  /** The update_id the operation was superseded by when status is "superseded". */
  superseded_by?: string;
  /** The result of memory store update operation when status is "completed". */
  result?: MemoryStoreUpdateCompletedResult;
  /** Error object that describes the error when status is "failed". */
  error?: ErrorModel;
}

export function memoryStoreUpdateResponseDeserializer(item: any): MemoryStoreUpdateResponse {
  return {
    update_id: item["update_id"],
    status: item["status"],
    superseded_by: item["superseded_by"],
    result: !item["result"]
      ? item["result"]
      : memoryStoreUpdateCompletedResultDeserializer(item["result"]),
    error: !item["error"] ? item["error"] : errorDeserializer(item["error"]),
  };
}

/** Status of a memory store update operation. */
export type MemoryStoreUpdateStatus =
  | "queued"
  | "in_progress"
  | "completed"
  | "failed"
  | "superseded";

/** Memory update result. */
export interface MemoryStoreUpdateCompletedResult {
  /** A list of individual memory operations that were performed during the update. */
  memory_operations: MemoryOperation[];
  /** Usage statistics associated with the memory update operation. */
  usage: MemoryStoreOperationUsage;
}

export function memoryStoreUpdateCompletedResultDeserializer(
  item: any,
): MemoryStoreUpdateCompletedResult {
  return {
    memory_operations: memoryOperationArrayDeserializer(item["memory_operations"]),
    usage: memoryStoreOperationUsageDeserializer(item["usage"]),
  };
}

export function memoryOperationArrayDeserializer(result: Array<MemoryOperation>): any[] {
  return result.map((item) => {
    return memoryOperationDeserializer(item);
  });
}

/** Represents a single memory operation (create, update, or delete) performed on a memory item. */
export interface MemoryOperation {
  /** The type of memory operation being performed. */
  kind: MemoryOperationKind;
  /** The memory item to create, update, or delete. */
  memory_item: MemoryItemUnion;
}

export function memoryOperationDeserializer(item: any): MemoryOperation {
  return {
    kind: item["kind"],
    memory_item: memoryItemUnionDeserializer(item["memory_item"]),
  };
}

/** Memory operation kind. */
export type MemoryOperationKind = "create" | "update" | "delete";

/** Response for deleting memories from a scope. */
export interface MemoryStoreDeleteScopeResponse {
  /** The object type. Always 'memory_store.scope.deleted'. */
  object: "memory_store.scope.deleted";
  /** The name of the memory store. */
  name: string;
  /** The scope from which memories were deleted. */
  scope: string;
  /** Whether the deletion operation was successful. */
  deleted: boolean;
}

export function memoryStoreDeleteScopeResponseDeserializer(
  item: any,
): MemoryStoreDeleteScopeResponse {
  return {
    object: item["object"],
    name: item["name"],
    scope: item["scope"],
    deleted: item["deleted"],
  };
}

/** Red team details. */
export interface RedTeam {
  /** Identifier of the red team run. */
  readonly name: string;
  /** Name of the red-team run. */
  displayName?: string;
  /** Number of simulation rounds. */
  numTurns?: number;
  /** List of attack strategies or nested lists of attack strategies. */
  attackStrategies?: AttackStrategy[];
  /** Simulation-only or Simulation + Evaluation. Default false, if true the scan outputs conversation not evaluation result. */
  simulationOnly?: boolean;
  /** List of risk categories to generate attack objectives for. */
  riskCategories?: RiskCategory[];
  /** Application scenario for the red team operation, to generate scenario specific attacks. */
  applicationScenario?: string;
  /** Red team's tags. Unlike properties, tags are fully mutable. */
  tags?: Record<string, string>;
  /** Red team's properties. Unlike tags, properties are add-only. Once added, a property cannot be removed. */
  properties?: Record<string, string>;
  /** Status of the red-team. It is set by service and is read-only. */
  readonly status?: string;
  /** Target configuration for the red-team run. */
  target: TargetConfigUnion;
}

export function redTeamSerializer(item: RedTeam): any {
  return {
    displayName: item["displayName"],
    numTurns: item["numTurns"],
    attackStrategies: !item["attackStrategies"]
      ? item["attackStrategies"]
      : item["attackStrategies"].map((p: any) => {
          return p;
        }),
    simulationOnly: item["simulationOnly"],
    riskCategories: !item["riskCategories"]
      ? item["riskCategories"]
      : item["riskCategories"].map((p: any) => {
          return p;
        }),
    applicationScenario: item["applicationScenario"],
    tags: item["tags"],
    properties: item["properties"],
    target: targetConfigUnionSerializer(item["target"]),
  };
}

export function redTeamDeserializer(item: any): RedTeam {
  return {
    name: item["id"],
    displayName: item["displayName"],
    numTurns: item["numTurns"],
    attackStrategies: !item["attackStrategies"]
      ? item["attackStrategies"]
      : item["attackStrategies"].map((p: any) => {
          return p;
        }),
    simulationOnly: item["simulationOnly"],
    riskCategories: !item["riskCategories"]
      ? item["riskCategories"]
      : item["riskCategories"].map((p: any) => {
          return p;
        }),
    applicationScenario: item["applicationScenario"],
    tags: item["tags"],
    properties: item["properties"],
    status: item["status"],
    target: targetConfigUnionDeserializer(item["target"]),
  };
}

/** Strategies for attacks. */
export type AttackStrategy =
  | "easy"
  | "moderate"
  | "difficult"
  | "ascii_art"
  | "ascii_smuggler"
  | "atbash"
  | "base64"
  | "binary"
  | "caesar"
  | "character_space"
  | "jailbreak"
  | "ansi_attack"
  | "character_swap"
  | "suffix_append"
  | "string_join"
  | "unicode_confusable"
  | "unicode_substitution"
  | "diacritic"
  | "flip"
  | "leetspeak"
  | "rot13"
  | "morse"
  | "url"
  | "baseline"
  | "indirect_jailbreak"
  | "tense"
  | "multi_turn"
  | "crescendo";

/** Abstract class for target configuration. */
export interface TargetConfig {
  /** Type of the model configuration. */
  /** The discriminator possible values: AzureOpenAIModel */
  type: string;
}

export function targetConfigSerializer(item: TargetConfig): any {
  return { type: item["type"] };
}

export function targetConfigDeserializer(item: any): TargetConfig {
  return {
    type: item["type"],
  };
}

/** Alias for TargetConfigUnion */
export type TargetConfigUnion = AzureOpenAIModelConfiguration | TargetConfig;

export function targetConfigUnionSerializer(item: TargetConfigUnion): any {
  switch (item.type) {
    case "AzureOpenAIModel":
      return azureOpenAIModelConfigurationSerializer(item as AzureOpenAIModelConfiguration);

    default:
      return targetConfigSerializer(item);
  }
}

export function targetConfigUnionDeserializer(item: any): TargetConfigUnion {
  switch (item.type) {
    case "AzureOpenAIModel":
      return azureOpenAIModelConfigurationDeserializer(item as AzureOpenAIModelConfiguration);

    default:
      return targetConfigDeserializer(item);
  }
}

/** Azure OpenAI model configuration. The API version would be selected by the service for querying the model. */
export interface AzureOpenAIModelConfiguration extends TargetConfig {
  type: "AzureOpenAIModel";
  /** Deployment name for AOAI model. Example: gpt-4o if in AIServices or connection based `connection_name/deployment_name` (e.g. `my-aoai-connection/gpt-4o`). */
  modelDeploymentName: string;
}

export function azureOpenAIModelConfigurationSerializer(item: AzureOpenAIModelConfiguration): any {
  return { type: item["type"], modelDeploymentName: item["modelDeploymentName"] };
}

export function azureOpenAIModelConfigurationDeserializer(
  item: any,
): AzureOpenAIModelConfiguration {
  return {
    type: item["type"],
    modelDeploymentName: item["modelDeploymentName"],
  };
}

/** Paged collection of RedTeam items */
export interface _PagedRedTeam {
  /** The RedTeam items on this page */
  value: RedTeam[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedRedTeamDeserializer(item: any): _PagedRedTeam {
  return {
    value: redTeamArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function redTeamArraySerializer(result: Array<RedTeam>): any[] {
  return result.map((item) => {
    return redTeamSerializer(item);
  });
}

export function redTeamArrayDeserializer(result: Array<RedTeam>): any[] {
  return result.map((item) => {
    return redTeamDeserializer(item);
  });
}

/** Schedule model. */
export interface Schedule {
  /** Identifier of the schedule. */
  readonly id?: string;
  /** Name of the schedule. */
  displayName?: string;
  /** Description of the schedule. */
  description?: string;
  /** Enabled status of the schedule. */
  enabled: boolean;
  /** Provisioning status of the schedule. */
  readonly provisioningStatus?: ScheduleProvisioningStatus;
  /** Trigger for the schedule. */
  trigger: TriggerUnion;
  /** Task for the schedule. */
  task: ScheduleTaskUnion;
  /** Schedule's tags. Unlike properties, tags are fully mutable. */
  tags?: Record<string, string>;
  /** Schedule's properties. Unlike tags, properties are add-only. Once added, a property cannot be removed. */
  properties?: Record<string, string>;
  /** System metadata for the resource. */
  readonly systemData?: Record<string, string>;
}

export function scheduleSerializer(item: Schedule): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    enabled: item["enabled"],
    trigger: triggerUnionSerializer(item["trigger"]),
    task: scheduleTaskUnionSerializer(item["task"]),
    tags: item["tags"],
    properties: item["properties"],
  };
}

export function scheduleDeserializer(item: any): Schedule {
  return {
    id: item["id"],
    displayName: item["displayName"],
    description: item["description"],
    enabled: item["enabled"],
    provisioningStatus: item["provisioningStatus"],
    trigger: triggerUnionDeserializer(item["trigger"]),
    task: scheduleTaskUnionDeserializer(item["task"]),
    tags: item["tags"],
    properties: item["properties"],
    systemData: item["systemData"],
  };
}

/** Schedule provisioning status. */
export type ScheduleProvisioningStatus =
  | "Creating"
  | "Updating"
  | "Deleting"
  | "Succeeded"
  | "Failed";

/** Base model for Trigger of the schedule. */
export interface Trigger {
  /** Type of the trigger. */
  /** The discriminator possible values: Cron, Recurrence, OneTime */
  type: TriggerType;
}

export function triggerSerializer(item: Trigger): any {
  return { type: item["type"] };
}

export function triggerDeserializer(item: any): Trigger {
  return {
    type: item["type"],
  };
}

/** Alias for TriggerUnion */
export type TriggerUnion = CronTrigger | RecurrenceTrigger | OneTimeTrigger | Trigger;

export function triggerUnionSerializer(item: TriggerUnion): any {
  switch (item.type) {
    case "Cron":
      return cronTriggerSerializer(item as CronTrigger);

    case "Recurrence":
      return recurrenceTriggerSerializer(item as RecurrenceTrigger);

    case "OneTime":
      return oneTimeTriggerSerializer(item as OneTimeTrigger);

    default:
      return triggerSerializer(item);
  }
}

export function triggerUnionDeserializer(item: any): TriggerUnion {
  switch (item.type) {
    case "Cron":
      return cronTriggerDeserializer(item as CronTrigger);

    case "Recurrence":
      return recurrenceTriggerDeserializer(item as RecurrenceTrigger);

    case "OneTime":
      return oneTimeTriggerDeserializer(item as OneTimeTrigger);

    default:
      return triggerDeserializer(item);
  }
}

/** Type of the trigger. */
export type TriggerType = "Cron" | "Recurrence" | "OneTime";

/** Cron based trigger. */
export interface CronTrigger extends Trigger {
  type: "Cron";
  /** Cron expression that defines the schedule frequency. */
  expression: string;
  /** Time zone for the cron schedule. */
  timeZone?: string;
  /** Start time for the cron schedule in ISO 8601 format. */
  startTime?: string;
  /** End time for the cron schedule in ISO 8601 format. */
  endTime?: string;
}

export function cronTriggerSerializer(item: CronTrigger): any {
  return {
    type: item["type"],
    expression: item["expression"],
    timeZone: item["timeZone"],
    startTime: item["startTime"],
    endTime: item["endTime"],
  };
}

export function cronTriggerDeserializer(item: any): CronTrigger {
  return {
    type: item["type"],
    expression: item["expression"],
    timeZone: item["timeZone"],
    startTime: item["startTime"],
    endTime: item["endTime"],
  };
}

/** Recurrence based trigger. */
export interface RecurrenceTrigger extends Trigger {
  /** Type of the trigger. */
  type: "Recurrence";
  /** Start time for the recurrence schedule in ISO 8601 format. */
  startTime?: string;
  /** End time for the recurrence schedule in ISO 8601 format. */
  endTime?: string;
  /** Time zone for the recurrence schedule. */
  timeZone?: string;
  /** Interval for the recurrence schedule. */
  interval: number;
  /** Recurrence schedule for the recurrence trigger. */
  schedule: RecurrenceScheduleUnion;
}

export function recurrenceTriggerSerializer(item: RecurrenceTrigger): any {
  return {
    type: item["type"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    timeZone: item["timeZone"],
    interval: item["interval"],
    schedule: recurrenceScheduleUnionSerializer(item["schedule"]),
  };
}

export function recurrenceTriggerDeserializer(item: any): RecurrenceTrigger {
  return {
    type: item["type"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    timeZone: item["timeZone"],
    interval: item["interval"],
    schedule: recurrenceScheduleUnionDeserializer(item["schedule"]),
  };
}

/** Recurrence schedule model. */
export interface RecurrenceSchedule {
  /** Recurrence type for the recurrence schedule. */
  /** The discriminator possible values: Hourly, Daily, Weekly, Monthly */
  type: RecurrenceType;
}

export function recurrenceScheduleSerializer(item: RecurrenceSchedule): any {
  return { type: item["type"] };
}

export function recurrenceScheduleDeserializer(item: any): RecurrenceSchedule {
  return {
    type: item["type"],
  };
}

/** Alias for RecurrenceScheduleUnion */
export type RecurrenceScheduleUnion =
  | HourlyRecurrenceSchedule
  | DailyRecurrenceSchedule
  | WeeklyRecurrenceSchedule
  | MonthlyRecurrenceSchedule
  | RecurrenceSchedule;

export function recurrenceScheduleUnionSerializer(item: RecurrenceScheduleUnion): any {
  switch (item.type) {
    case "Hourly":
      return hourlyRecurrenceScheduleSerializer(item as HourlyRecurrenceSchedule);

    case "Daily":
      return dailyRecurrenceScheduleSerializer(item as DailyRecurrenceSchedule);

    case "Weekly":
      return weeklyRecurrenceScheduleSerializer(item as WeeklyRecurrenceSchedule);

    case "Monthly":
      return monthlyRecurrenceScheduleSerializer(item as MonthlyRecurrenceSchedule);

    default:
      return recurrenceScheduleSerializer(item);
  }
}

export function recurrenceScheduleUnionDeserializer(item: any): RecurrenceScheduleUnion {
  switch (item.type) {
    case "Hourly":
      return hourlyRecurrenceScheduleDeserializer(item as HourlyRecurrenceSchedule);

    case "Daily":
      return dailyRecurrenceScheduleDeserializer(item as DailyRecurrenceSchedule);

    case "Weekly":
      return weeklyRecurrenceScheduleDeserializer(item as WeeklyRecurrenceSchedule);

    case "Monthly":
      return monthlyRecurrenceScheduleDeserializer(item as MonthlyRecurrenceSchedule);

    default:
      return recurrenceScheduleDeserializer(item);
  }
}

/** Recurrence type. */
export type RecurrenceType = "Hourly" | "Daily" | "Weekly" | "Monthly";

/** Hourly recurrence schedule. */
export interface HourlyRecurrenceSchedule extends RecurrenceSchedule {
  type: "Hourly";
}

export function hourlyRecurrenceScheduleSerializer(item: HourlyRecurrenceSchedule): any {
  return { type: item["type"] };
}

export function hourlyRecurrenceScheduleDeserializer(item: any): HourlyRecurrenceSchedule {
  return {
    type: item["type"],
  };
}

/** Daily recurrence schedule. */
export interface DailyRecurrenceSchedule extends RecurrenceSchedule {
  /** Daily recurrence type. */
  type: "Daily";
  /** Hours for the recurrence schedule. */
  hours: number[];
}

export function dailyRecurrenceScheduleSerializer(item: DailyRecurrenceSchedule): any {
  return {
    type: item["type"],
    hours: item["hours"].map((p: any) => {
      return p;
    }),
  };
}

export function dailyRecurrenceScheduleDeserializer(item: any): DailyRecurrenceSchedule {
  return {
    type: item["type"],
    hours: item["hours"].map((p: any) => {
      return p;
    }),
  };
}

/** Weekly recurrence schedule. */
export interface WeeklyRecurrenceSchedule extends RecurrenceSchedule {
  /** Weekly recurrence type. */
  type: "Weekly";
  /** Days of the week for the recurrence schedule. */
  daysOfWeek: DayOfWeek[];
}

export function weeklyRecurrenceScheduleSerializer(item: WeeklyRecurrenceSchedule): any {
  return {
    type: item["type"],
    daysOfWeek: item["daysOfWeek"].map((p: any) => {
      return p;
    }),
  };
}

export function weeklyRecurrenceScheduleDeserializer(item: any): WeeklyRecurrenceSchedule {
  return {
    type: item["type"],
    daysOfWeek: item["daysOfWeek"].map((p: any) => {
      return p;
    }),
  };
}

/** Days of the week for recurrence schedule. */
export type DayOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

/** Monthly recurrence schedule. */
export interface MonthlyRecurrenceSchedule extends RecurrenceSchedule {
  /** Monthly recurrence type. */
  type: "Monthly";
  /** Days of the month for the recurrence schedule. */
  daysOfMonth: number[];
}

export function monthlyRecurrenceScheduleSerializer(item: MonthlyRecurrenceSchedule): any {
  return {
    type: item["type"],
    daysOfMonth: item["daysOfMonth"].map((p: any) => {
      return p;
    }),
  };
}

export function monthlyRecurrenceScheduleDeserializer(item: any): MonthlyRecurrenceSchedule {
  return {
    type: item["type"],
    daysOfMonth: item["daysOfMonth"].map((p: any) => {
      return p;
    }),
  };
}

/** One-time trigger. */
export interface OneTimeTrigger extends Trigger {
  type: "OneTime";
  /** Date and time for the one-time trigger in ISO 8601 format. */
  triggerAt: string;
  /** Time zone for the one-time trigger. */
  timeZone?: string;
}

export function oneTimeTriggerSerializer(item: OneTimeTrigger): any {
  return { type: item["type"], triggerAt: item["triggerAt"], timeZone: item["timeZone"] };
}

export function oneTimeTriggerDeserializer(item: any): OneTimeTrigger {
  return {
    type: item["type"],
    triggerAt: item["triggerAt"],
    timeZone: item["timeZone"],
  };
}

/** Schedule task model. */
export interface ScheduleTask {
  /** Type of the task. */
  /** The discriminator possible values: Evaluation, Insight */
  type: ScheduleTaskType;
  /** Configuration for the task. */
  configuration?: Record<string, string>;
}

export function scheduleTaskSerializer(item: ScheduleTask): any {
  return { type: item["type"], configuration: item["configuration"] };
}

export function scheduleTaskDeserializer(item: any): ScheduleTask {
  return {
    type: item["type"],
    configuration: item["configuration"],
  };
}

/** Alias for ScheduleTaskUnion */
export type ScheduleTaskUnion = EvaluationScheduleTask | InsightScheduleTask | ScheduleTask;

export function scheduleTaskUnionSerializer(item: ScheduleTaskUnion): any {
  switch (item.type) {
    case "Evaluation":
      return evaluationScheduleTaskSerializer(item as EvaluationScheduleTask);

    case "Insight":
      return insightScheduleTaskSerializer(item as InsightScheduleTask);

    default:
      return scheduleTaskSerializer(item);
  }
}

export function scheduleTaskUnionDeserializer(item: any): ScheduleTaskUnion {
  switch (item.type) {
    case "Evaluation":
      return evaluationScheduleTaskDeserializer(item as EvaluationScheduleTask);

    case "Insight":
      return insightScheduleTaskDeserializer(item as InsightScheduleTask);

    default:
      return scheduleTaskDeserializer(item);
  }
}

/** Type of the task. */
export type ScheduleTaskType = "Evaluation" | "Insight";

/** Evaluation task for the schedule. */
export interface EvaluationScheduleTask extends ScheduleTask {
  /** Type of the task, which is always 'Evaluation'. */
  type: "Evaluation";
  /** Identifier of the evaluation group. */
  evalId: string;
  /** The evaluation run payload. */
  evalRun: Record<string, any>;
}

export function evaluationScheduleTaskSerializer(item: EvaluationScheduleTask): any {
  return {
    type: item["type"],
    configuration: item["configuration"],
    evalId: item["evalId"],
    evalRun: _evaluationScheduleTaskEvalRunSerializer(item["evalRun"]),
  };
}

export function evaluationScheduleTaskDeserializer(item: any): EvaluationScheduleTask {
  return {
    type: item["type"],
    configuration: item["configuration"],
    evalId: item["evalId"],
    evalRun: _evaluationScheduleTaskEvalRunDeserializer(item["evalRun"]),
  };
}

/** model interface _EvaluationScheduleTaskEvalRun */
export interface _EvaluationScheduleTaskEvalRun {}

export function _evaluationScheduleTaskEvalRunSerializer(
  item: _EvaluationScheduleTaskEvalRun,
): any {
  return item;
}

export function _evaluationScheduleTaskEvalRunDeserializer(
  item: any,
): _EvaluationScheduleTaskEvalRun {
  return item;
}

/** Insight task for the schedule. */
export interface InsightScheduleTask extends ScheduleTask {
  /** Type of the task, which is always 'Insight'. */
  type: "Insight";
  /** The insight payload. */
  insight: Insight;
}

export function insightScheduleTaskSerializer(item: InsightScheduleTask): any {
  return {
    type: item["type"],
    configuration: item["configuration"],
    insight: insightSerializer(item["insight"]),
  };
}

export function insightScheduleTaskDeserializer(item: any): InsightScheduleTask {
  return {
    type: item["type"],
    configuration: item["configuration"],
    insight: insightDeserializer(item["insight"]),
  };
}

/** Paged collection of Schedule items */
export interface _PagedSchedule {
  /** The Schedule items on this page */
  value: Schedule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedScheduleDeserializer(item: any): _PagedSchedule {
  return {
    value: scheduleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scheduleArraySerializer(result: Array<Schedule>): any[] {
  return result.map((item) => {
    return scheduleSerializer(item);
  });
}

export function scheduleArrayDeserializer(result: Array<Schedule>): any[] {
  return result.map((item) => {
    return scheduleDeserializer(item);
  });
}

/** Schedule run model. */
export interface ScheduleRun {
  /** Identifier of the schedule run. */
  readonly runId: string;
  /** Identifier of the schedule. */
  scheduleId: string;
  /** Trigger success status of the schedule run. */
  readonly success: boolean;
  /** Trigger time of the schedule run. */
  triggerTime?: string;
  /** Error information for the schedule run. */
  readonly error?: string;
  /** Properties of the schedule run. */
  readonly properties: Record<string, string>;
}

export function scheduleRunDeserializer(item: any): ScheduleRun {
  return {
    runId: item["id"],
    scheduleId: item["scheduleId"],
    success: item["success"],
    triggerTime: item["triggerTime"],
    error: item["error"],
    properties: item["properties"],
  };
}

/** Paged collection of ScheduleRun items */
export interface _PagedScheduleRun {
  /** The ScheduleRun items on this page */
  value: ScheduleRun[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedScheduleRunDeserializer(item: any): _PagedScheduleRun {
  return {
    value: scheduleRunArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scheduleRunArrayDeserializer(result: Array<ScheduleRun>): any[] {
  return result.map((item) => {
    return scheduleRunDeserializer(item);
  });
}

/** Type of AgentType */
export type AgentType =
  | "agent"
  | "agent.version"
  | "agent.deleted"
  | "agent.version.deleted"
  | "agent.container";
/** Type of FoundryFeaturesOptInKeys */
export type FoundryFeaturesOptInKeys =
  | "ContainerAgents=V1Preview"
  | "HostedAgents=V1Preview"
  | "WorkflowAgents=V1Preview"
  | "Evaluations=V1Preview"
  | "Schedules=V1Preview"
  | "RedTeams=V1Preview"
  | "Insights=V1Preview"
  | "MemoryStores=V1Preview";
/** Type of PageOrder */
export type PageOrder = "asc" | "desc";
/** The type of pending upload. */
export type PendingUploadType = "None" | "BlobReference";
/** Type of MemoryStoreType */
export type MemoryStoreType =
  | "memory_store"
  | "memory_store.deleted"
  | "memory_store.scope.deleted";

/** Microsoft Foundry API versions */
export enum KnownApiVersions {
  /** Microsoft Foundry API version v1. */
  v1 = "v1",
}
