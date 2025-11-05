// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable tsdoc/syntax */

import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";

/** model interface AgentObject */
export interface AgentObject {
  /** The object type, which is always 'agent'. */
  object: "agent";
  /** The unique identifier of the agent. */
  id: string;
  /** The name of the agent. */
  name: string;
  /** The latest version of the agent. */
  versions: {
    latest: AgentVersionObject;
  };
}

export function agentObjectDeserializer(item: any): AgentObject {
  return {
    object: item["object"],
    id: item["id"],
    name: item["name"],
    versions: _agentObjectVersionsDeserializer(item["versions"]),
  };
}

/** model interface _AgentObjectVersions */
export interface _AgentObjectVersions {
  latest: AgentVersionObject;
}

export function _agentObjectVersionsDeserializer(item: any): _AgentObjectVersions {
  return {
    latest: agentVersionObjectDeserializer(item["latest"]),
  };
}

/** model interface AgentVersionObject */
export interface AgentVersionObject {
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
  /** Arbitrary key-value metadata to associate with the agent. */
  metadata?: Record<string, string>;
  /** The Unix timestamp (seconds) when the agent was created. */
  createdAt: Date;
  /** The definition of the agent. */
  definition: AgentDefinitionUnion;
}

export function agentVersionObjectDeserializer(item: any): AgentVersionObject {
  return {
    object: item["object"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    metadata: item["metadata"],
    createdAt: new Date(item["created_at"] * 1000),
    definition: agentDefinitionUnionDeserializer(item["definition"]),
  };
}

/** model interface AgentDefinition */
export interface AgentDefinition {
  /** The kind of agent. */
  kind: AgentKind;
  /** Configuration for Responsible AI (RAI) content filtering and safety features. */
  raiConfig?: RaiConfig;
}

export function agentDefinitionSerializer(item: AgentDefinition): any {
  return {
    kind: item["kind"],
    rai_config: !item["raiConfig"] ? item["raiConfig"] : raiConfigSerializer(item["raiConfig"]),
  };
}

export function agentDefinitionDeserializer(item: any): AgentDefinition {
  return {
    kind: item["kind"],
    raiConfig: !item["rai_config"] ? item["rai_config"] : raiConfigDeserializer(item["rai_config"]),
  };
}

/** Alias for AgentDefinitionUnion */
export type AgentDefinitionUnion =
  | WorkflowDefinition
  | HostedAgentDefinitionUnion
  | ContainerAppAgentDefinition
  | PromptAgentDefinition
  | AgentDefinition;

export function agentDefinitionUnionSerializer(item: AgentDefinitionUnion): any {
  switch (item.kind) {
    case "workflow":
      return workflowDefinitionSerializer(item as WorkflowDefinition);

    case "hosted":
      return hostedAgentDefinitionUnionSerializer(item as HostedAgentDefinitionUnion);

    case "container_app":
      return containerAppAgentDefinitionSerializer(item as ContainerAppAgentDefinition);

    case "prompt":
      return promptAgentDefinitionSerializer(item as PromptAgentDefinition);

    default:
      return agentDefinitionSerializer(item);
  }
}

export function agentDefinitionUnionDeserializer(item: any): AgentDefinitionUnion {
  switch (item.kind) {
    case "workflow":
      return workflowDefinitionDeserializer(item as WorkflowDefinition);

    case "hosted":
      return hostedAgentDefinitionUnionDeserializer(item as HostedAgentDefinitionUnion);

    case "container_app":
      return containerAppAgentDefinitionDeserializer(item as ContainerAppAgentDefinition);

    case "prompt":
      return promptAgentDefinitionDeserializer(item as PromptAgentDefinition);

    default:
      return agentDefinitionDeserializer(item);
  }
}

/** Type of AgentKind */
export type AgentKind = "prompt" | "hosted" | "container_app" | "workflow";

/** Configuration for Responsible AI (RAI) content filtering and safety features. */
export interface RaiConfig {
  /** The name of the RAI policy to apply. */
  raiPolicyName: string;
}

export function raiConfigSerializer(item: RaiConfig): any {
  return { rai_policy_name: item["raiPolicyName"] };
}

export function raiConfigDeserializer(item: any): RaiConfig {
  return {
    raiPolicyName: item["rai_policy_name"],
  };
}

/** The workflow specification in CPSDL format. */
export interface WorkflowDefinition extends AgentDefinition {
  /** The kind of agent definition. */
  kind: "workflow";
  /** The trigger for the workflow. */
  trigger?: Record<string, any>;
}

export function workflowDefinitionSerializer(item: WorkflowDefinition): any {
  return {
    kind: item["kind"],
    rai_config: !item["raiConfig"] ? item["raiConfig"] : raiConfigSerializer(item["raiConfig"]),
    trigger: item["trigger"],
  };
}

export function workflowDefinitionDeserializer(item: any): WorkflowDefinition {
  return {
    kind: item["kind"],
    raiConfig: !item["rai_config"] ? item["rai_config"] : raiConfigDeserializer(item["rai_config"]),
    trigger: item["trigger"],
  };
}

/** The hosted agent definition. */
export interface HostedAgentDefinition extends AgentDefinition {
  /** The kind of agent definition. */
  kind: "hosted";
  /**
   * An array of tools the hosted agent's model may call while generating a response. You
   * can specify which tool to use by setting the `tool_choice` parameter.
   */
  tools?: ToolUnion[];
  /** The protocols that the agent supports for ingress communication of the containers. */
  containerProtocolVersions: ProtocolVersionRecord[];
  /** The CPU configuration for the hosted agent. */
  cpu: string;
  /** The memory configuration for the hosted agent. */
  memory: string;
  /** Environment variables to set in the hosted agent container. */
  environmentVariables?: Record<string, string>;
}

export function hostedAgentDefinitionSerializer(item: HostedAgentDefinition): any {
  return {
    kind: item["kind"],
    rai_config: !item["raiConfig"] ? item["raiConfig"] : raiConfigSerializer(item["raiConfig"]),
    tools: !item["tools"] ? item["tools"] : toolUnionArraySerializer(item["tools"]),
    container_protocol_versions: protocolVersionRecordArraySerializer(
      item["containerProtocolVersions"],
    ),
    cpu: item["cpu"],
    memory: item["memory"],
    environment_variables: item["environmentVariables"],
  };
}

export function hostedAgentDefinitionDeserializer(item: any): HostedAgentDefinition {
  return {
    kind: item["kind"],
    raiConfig: !item["rai_config"] ? item["rai_config"] : raiConfigDeserializer(item["rai_config"]),
    tools: !item["tools"] ? item["tools"] : toolUnionArrayDeserializer(item["tools"]),
    containerProtocolVersions: protocolVersionRecordArrayDeserializer(
      item["container_protocol_versions"],
    ),
    cpu: item["cpu"],
    memory: item["memory"],
    environmentVariables: item["environment_variables"],
  };
}

/** Alias for HostedAgentDefinitionUnion */
export type HostedAgentDefinitionUnion = ImageBasedHostedAgentDefinition | HostedAgentDefinition;

export function hostedAgentDefinitionUnionSerializer(item: HostedAgentDefinitionUnion): any {
  switch (item.kind) {
    case "hosted":
      return imageBasedHostedAgentDefinitionSerializer(item as ImageBasedHostedAgentDefinition);

    default:
      return hostedAgentDefinitionSerializer(item);
  }
}

export function hostedAgentDefinitionUnionDeserializer(item: any): HostedAgentDefinitionUnion {
  switch (item.kind) {
    case "hosted":
      return imageBasedHostedAgentDefinitionDeserializer(item as ImageBasedHostedAgentDefinition);

    default:
      return hostedAgentDefinitionDeserializer(item);
  }
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

/** The image-based deployment definition for a hosted agent. */
export interface ImageBasedHostedAgentDefinition extends HostedAgentDefinition {
  /** The kind of agent definition. */
  kind: "hosted";
  /** The image for the hosted agent. */
  image: string;
}

export function imageBasedHostedAgentDefinitionSerializer(
  item: ImageBasedHostedAgentDefinition,
): any {
  return {
    kind: item["kind"],
    tools: !item["tools"] ? item["tools"] : toolUnionArraySerializer(item["tools"]),
    container_protocol_versions: protocolVersionRecordArraySerializer(
      item["containerProtocolVersions"],
    ),
    cpu: item["cpu"],
    memory: item["memory"],
    environment_variables: item["environmentVariables"],
    rai_config: !item["raiConfig"] ? item["raiConfig"] : raiConfigSerializer(item["raiConfig"]),
    image: item["image"],
  };
}

export function imageBasedHostedAgentDefinitionDeserializer(
  item: any,
): ImageBasedHostedAgentDefinition {
  return {
    kind: item["kind"],
    tools: !item["tools"] ? item["tools"] : toolUnionArrayDeserializer(item["tools"]),
    containerProtocolVersions: protocolVersionRecordArrayDeserializer(
      item["container_protocol_versions"],
    ),
    cpu: item["cpu"],
    memory: item["memory"],
    environmentVariables: item["environment_variables"],
    raiConfig: !item["rai_config"] ? item["rai_config"] : raiConfigDeserializer(item["rai_config"]),
    image: item["image"],
  };
}

/** The container app agent definition. */
export interface ContainerAppAgentDefinition extends AgentDefinition {
  /** The kind of agent. */
  kind: "container_app";
  /** The protocols that the agent supports for ingress communication of the containers. */
  containerProtocolVersions: ProtocolVersionRecord[];
  /** The resource ID of the Azure Container App that hosts this agent. Not mutable across versions. */
  containerAppResourceId: string;
  /** The suffix to apply to the app subdomain when sending ingress to the agent. This can be a label (e.g., '---current'), a specific revision (e.g., '--0000001'), or empty to use the default endpoint for the container app. */
  ingressSubdomainSuffix: string;
}

export function containerAppAgentDefinitionSerializer(item: ContainerAppAgentDefinition): any {
  return {
    kind: item["kind"],
    rai_config: !item["raiConfig"] ? item["raiConfig"] : raiConfigSerializer(item["raiConfig"]),
    container_protocol_versions: protocolVersionRecordArraySerializer(
      item["containerProtocolVersions"],
    ),
    container_app_resource_id: item["containerAppResourceId"],
    ingress_subdomain_suffix: item["ingressSubdomainSuffix"],
  };
}

export function containerAppAgentDefinitionDeserializer(item: any): ContainerAppAgentDefinition {
  return {
    kind: item["kind"],
    raiConfig: !item["rai_config"] ? item["rai_config"] : raiConfigDeserializer(item["rai_config"]),
    containerProtocolVersions: protocolVersionRecordArrayDeserializer(
      item["container_protocol_versions"],
    ),
    containerAppResourceId: item["container_app_resource_id"],
    ingressSubdomainSuffix: item["ingress_subdomain_suffix"],
  };
}

/** The prompt agent definition */
export interface PromptAgentDefinition extends AgentDefinition {
  /** The kind of agent. */
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
  topP?: number;
  /** Configuration options for reasoning with o-series models. */
  reasoning?: Reasoning;
  /**
   * An array of tools the model may call while generating a response. You
   * can specify which tool to use by setting the `tool_choice` parameter.
   */
  tools?: ToolUnion[];
  /** Configuration options for a text response from the model. Can be plain text or structured JSON data. */
  text?: {
    format?: ResponseTextFormatConfigurationUnion;
  };
  /** Set of structured inputs that can participate in prompt template substitution or tool argument bindings. */
  structuredInputs?: Record<string, StructuredInputDefinition>;
}

export function promptAgentDefinitionSerializer(item: PromptAgentDefinition): any {
  return {
    kind: item["kind"],
    rai_config: !item["raiConfig"] ? item["raiConfig"] : raiConfigSerializer(item["raiConfig"]),
    model: item["model"],
    instructions: item["instructions"],
    temperature: item["temperature"],
    top_p: item["topP"],
    reasoning: !item["reasoning"] ? item["reasoning"] : reasoningSerializer(item["reasoning"]),
    tools: !item["tools"] ? item["tools"] : toolUnionArraySerializer(item["tools"]),
    text: !item["text"] ? item["text"] : _promptAgentDefinitionTextSerializer(item["text"]),
    structured_inputs: !item["structuredInputs"]
      ? item["structuredInputs"]
      : structuredInputDefinitionRecordSerializer(item["structuredInputs"]),
  };
}

export function promptAgentDefinitionDeserializer(item: any): PromptAgentDefinition {
  return {
    kind: item["kind"],
    raiConfig: !item["rai_config"] ? item["rai_config"] : raiConfigDeserializer(item["rai_config"]),
    model: item["model"],
    instructions: item["instructions"],
    temperature: item["temperature"],
    topP: item["top_p"],
    reasoning: !item["reasoning"] ? item["reasoning"] : reasoningDeserializer(item["reasoning"]),
    tools: !item["tools"] ? item["tools"] : toolUnionArrayDeserializer(item["tools"]),
    text: !item["text"] ? item["text"] : _promptAgentDefinitionTextDeserializer(item["text"]),
    structuredInputs: !item["structured_inputs"]
      ? item["structured_inputs"]
      : structuredInputDefinitionRecordDeserializer(item["structured_inputs"]),
  };
}

/**
 * **o-series models only**
 *
 * Configuration options for
 * [reasoning models](https://platform.openai.com/docs/guides/reasoning).
 */
export interface Reasoning {
  /** the effort level of the reasoning */
  effort?: ReasoningEffort;
  /**
   * A summary of the reasoning performed by the model. This can be
   * useful for debugging and understanding the model's reasoning process.
   * One of `auto`, `concise`, or `detailed`.
   */
  summary?: "auto" | "concise" | "detailed";
  /**
   * **Deprecated:** use `summary` instead.
   *
   * A summary of the reasoning performed by the model. This can be
   * useful for debugging and understanding the model's reasoning process.
   * One of `auto`, `concise`, or `detailed`.
   */
  generateSummary?: "auto" | "concise" | "detailed";
}

export function reasoningSerializer(item: Reasoning): any {
  return {
    effort: item["effort"],
    summary: item["summary"],
    generate_summary: item["generateSummary"],
  };
}

export function reasoningDeserializer(item: any): Reasoning {
  return {
    effort: item["effort"],
    summary: item["summary"],
    generateSummary: item["generate_summary"],
  };
}

/**
 * **o-series models only**
 *
 * Constrains effort on reasoning for
 * [reasoning models](https://platform.openai.com/docs/guides/reasoning).
 * Currently supported values are `low`, `medium`, and `high`. Reducing
 * reasoning effort can result in faster responses and fewer tokens used
 * on reasoning in a response.
 */
export type ReasoningEffort = "low" | "medium" | "high";

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

/** model interface Tool */
export interface Tool {
  /** The type of the tool. */
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
  | FunctionTool
  | FileSearchTool
  | ComputerUsePreviewTool
  | WebSearchPreviewTool
  | CodeInterpreterTool
  | ImageGenTool
  | LocalShellTool
  | MCPTool
  | BingGroundingAgentTool
  | MicrosoftFabricAgentTool
  | SharepointAgentTool
  | AzureAISearchAgentTool
  | OpenApiAgentTool
  | BingCustomSearchAgentTool
  | BrowserAutomationAgentTool
  | AzureFunctionAgentTool
  | CaptureStructuredOutputsTool
  | CaptureSemanticEventsTool
  | A2ATool
  | MemorySearchTool
  | Tool;

export function toolUnionSerializer(item: ToolUnion): any {
  switch (item.type) {
    case "function":
      return functionToolSerializer(item as FunctionTool);

    case "file_search":
      return fileSearchToolSerializer(item as FileSearchTool);

    case "computer_use_preview":
      return computerUsePreviewToolSerializer(item as ComputerUsePreviewTool);

    case "web_search_preview":
      return webSearchPreviewToolSerializer(item as WebSearchPreviewTool);

    case "code_interpreter":
      return codeInterpreterToolSerializer(item as CodeInterpreterTool);

    case "image_generation":
      return imageGenToolSerializer(item as ImageGenTool);

    case "local_shell":
      return localShellToolSerializer(item as LocalShellTool);

    case "mcp":
      return mcpToolSerializer(item as MCPTool);

    case "bing_grounding":
      return bingGroundingAgentToolSerializer(item as BingGroundingAgentTool);

    case "fabric_dataagent_preview":
      return microsoftFabricAgentToolSerializer(item as MicrosoftFabricAgentTool);

    case "sharepoint_grounding_preview":
      return sharepointAgentToolSerializer(item as SharepointAgentTool);

    case "azure_ai_search":
      return azureAISearchAgentToolSerializer(item as AzureAISearchAgentTool);

    case "openapi":
      return openApiAgentToolSerializer(item as OpenApiAgentTool);

    case "bing_custom_search_preview":
      return bingCustomSearchAgentToolSerializer(item as BingCustomSearchAgentTool);

    case "browser_automation_preview":
      return browserAutomationAgentToolSerializer(item as BrowserAutomationAgentTool);

    case "azure_function":
      return azureFunctionAgentToolSerializer(item as AzureFunctionAgentTool);

    case "capture_structured_outputs":
      return captureStructuredOutputsToolSerializer(item as CaptureStructuredOutputsTool);

    case "capture_semantic_events":
      return captureSemanticEventsToolSerializer(item as CaptureSemanticEventsTool);

    case "a2a_preview":
      return a2AToolSerializer(item as A2ATool);

    case "memory_search":
      return memorySearchToolSerializer(item as MemorySearchTool);

    default:
      return toolSerializer(item);
  }
}

export function toolUnionDeserializer(item: any): ToolUnion {
  switch (item.type) {
    case "function":
      return functionToolDeserializer(item as FunctionTool);

    case "file_search":
      return fileSearchToolDeserializer(item as FileSearchTool);

    case "computer_use_preview":
      return computerUsePreviewToolDeserializer(item as ComputerUsePreviewTool);

    case "web_search_preview":
      return webSearchPreviewToolDeserializer(item as WebSearchPreviewTool);

    case "code_interpreter":
      return codeInterpreterToolDeserializer(item as CodeInterpreterTool);

    case "image_generation":
      return imageGenToolDeserializer(item as ImageGenTool);

    case "local_shell":
      return localShellToolDeserializer(item as LocalShellTool);

    case "mcp":
      return mcpToolDeserializer(item as MCPTool);

    case "bing_grounding":
      return bingGroundingAgentToolDeserializer(item as BingGroundingAgentTool);

    case "fabric_dataagent_preview":
      return microsoftFabricAgentToolDeserializer(item as MicrosoftFabricAgentTool);

    case "sharepoint_grounding_preview":
      return sharepointAgentToolDeserializer(item as SharepointAgentTool);

    case "azure_ai_search":
      return azureAISearchAgentToolDeserializer(item as AzureAISearchAgentTool);

    case "openapi":
      return openApiAgentToolDeserializer(item as OpenApiAgentTool);

    case "bing_custom_search_preview":
      return bingCustomSearchAgentToolDeserializer(item as BingCustomSearchAgentTool);

    case "browser_automation_preview":
      return browserAutomationAgentToolDeserializer(item as BrowserAutomationAgentTool);

    case "azure_function":
      return azureFunctionAgentToolDeserializer(item as AzureFunctionAgentTool);

    case "capture_structured_outputs":
      return captureStructuredOutputsToolDeserializer(item as CaptureStructuredOutputsTool);

    case "capture_semantic_events":
      return captureSemanticEventsToolDeserializer(item as CaptureSemanticEventsTool);

    case "a2a_preview":
      return a2AToolDeserializer(item as A2ATool);

    case "memory_search":
      return memorySearchToolDeserializer(item as MemorySearchTool);

    default:
      return toolDeserializer(item);
  }
}

/** A tool that can be used to generate a response. */
export type ToolType =
  | "file_search"
  | "function"
  | "computer_use_preview"
  | "web_search_preview"
  | "mcp"
  | "code_interpreter"
  | "image_generation"
  | "local_shell"
  | "bing_grounding"
  | "browser_automation_preview"
  | "fabric_dataagent_preview"
  | "sharepoint_grounding_preview"
  | "azure_ai_search"
  | "openapi"
  | "bing_custom_search_preview"
  | "capture_structured_outputs"
  | "capture_semantic_events"
  | "a2a_preview"
  | "azure_function"
  | "memory_search";

/** Defines a function in your own code the model can choose to call. Learn more about [function calling](https://platform.openai.com/docs/guides/function-calling). */
export interface FunctionTool extends Tool {
  /** The type of the function tool. Always `function`. */
  type: "function";
  /** The name of the function to call. */
  name: string;
  /** A description of the function. Used by the model to determine whether or not to call the function. */
  description?: string;
  /** A JSON schema object describing the parameters of the function. */
  parameters?: any;
  /** Whether to enforce strict parameter validation. Default `true`. */
  strict?: boolean;
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
    parameters: item["parameters"],
    strict: item["strict"],
  };
}

/** A tool that searches for relevant content from uploaded files. Learn more about the [file search tool](https://platform.openai.com/docs/guides/tools-file-search). */
export interface FileSearchTool extends Tool {
  /** The type of the file search tool. Always `file_search`. */
  type: "file_search";
  /** The IDs of the vector stores to search. */
  vectorStoreIds: string[];
  /** The maximum number of results to return. This number should be between 1 and 50 inclusive. */
  maxNumResults?: number;
  /** Ranking options for search. */
  rankingOptions?: RankingOptions;
  /** A filter to apply. */
  filters?: Filters | null;
}

export function fileSearchToolSerializer(item: FileSearchTool): any {
  return {
    type: item["type"],
    vector_store_ids: item["vectorStoreIds"].map((p: any) => {
      return p;
    }),
    max_num_results: item["maxNumResults"],
    ranking_options: !item["rankingOptions"]
      ? item["rankingOptions"]
      : rankingOptionsSerializer(item["rankingOptions"]),
    filters: !item["filters"] ? item["filters"] : filtersSerializer(item["filters"]),
  };
}

export function fileSearchToolDeserializer(item: any): FileSearchTool {
  return {
    type: item["type"],
    vectorStoreIds: item["vector_store_ids"].map((p: any) => {
      return p;
    }),
    maxNumResults: item["max_num_results"],
    rankingOptions: !item["ranking_options"]
      ? item["ranking_options"]
      : rankingOptionsDeserializer(item["ranking_options"]),
    filters: !item["filters"] ? item["filters"] : filtersDeserializer(item["filters"]),
  };
}

/** model interface RankingOptions */
export interface RankingOptions {
  /** The ranker to use for the file search. */
  ranker?: "auto" | "default-2024-11-15";
  /** The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results. */
  scoreThreshold?: number;
}

export function rankingOptionsSerializer(item: RankingOptions): any {
  return { ranker: item["ranker"], score_threshold: item["scoreThreshold"] };
}

export function rankingOptionsDeserializer(item: any): RankingOptions {
  return {
    ranker: item["ranker"],
    scoreThreshold: item["score_threshold"],
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
   * Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`.
   * - `eq`: equals
   * - `ne`: not equal
   * - `gt`: greater than
   * - `gte`: greater than or equal
   * - `lt`: less than
   * - `lte`: less than or equal
   */
  type: "eq" | "ne" | "gt" | "gte" | "lt" | "lte";
  /** The key to compare against the value. */
  key: string;
  /** The value to compare against the attribute key; supports string, number, or boolean types. */
  value: string | number | boolean;
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
export type _ComparisonFilterValue = string | number | boolean;

export function _comparisonFilterValueSerializer(item: _ComparisonFilterValue): any {
  return item;
}

export function _comparisonFilterValueDeserializer(item: any): _ComparisonFilterValue {
  return item;
}

/** Combine multiple filters using `and` or `or`. */
export interface CompoundFilter {
  /** Type of operation: `and` or `or`. */
  type: "and" | "or";
  /** Array of filters to combine. Items can be `ComparisonFilter` or `CompoundFilter`. */
  filters: (ComparisonFilter | CompoundFilter)[];
}

export function compoundFilterSerializer(item: CompoundFilter): any {
  return {
    type: item["type"],
    filters: _compoundFilterFilterArraySerializer(item["filters"]),
  };
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
export type _CompoundFilterFilter = ComparisonFilter | CompoundFilter;

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
  environment: "windows" | "mac" | "linux" | "browser";
  /** The width of the computer display. */
  displayWidth: number;
  /** The height of the computer display. */
  displayHeight: number;
}

export function computerUsePreviewToolSerializer(item: ComputerUsePreviewTool): any {
  return {
    type: item["type"],
    environment: item["environment"],
    display_width: item["displayWidth"],
    display_height: item["displayHeight"],
  };
}

export function computerUsePreviewToolDeserializer(item: any): ComputerUsePreviewTool {
  return {
    type: item["type"],
    environment: item["environment"],
    displayWidth: item["display_width"],
    displayHeight: item["display_height"],
  };
}

/** Note: web_search is not yet available via Azure OpenAI. */
export interface WebSearchPreviewTool extends Tool {
  /** The type of the web search tool. One of `web_search_preview` or `web_search_preview_2025_03_11`. */
  type: "web_search_preview";
  /** The user's location. */
  userLocation?: LocationUnion;
  /** High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default. */
  searchContextSize?: "low" | "medium" | "high";
}

export function webSearchPreviewToolSerializer(item: WebSearchPreviewTool): any {
  return {
    type: item["type"],
    user_location: !item["userLocation"]
      ? item["userLocation"]
      : locationUnionSerializer(item["userLocation"]),
    search_context_size: item["searchContextSize"],
  };
}

export function webSearchPreviewToolDeserializer(item: any): WebSearchPreviewTool {
  return {
    type: item["type"],
    userLocation: !item["user_location"]
      ? item["user_location"]
      : locationUnionDeserializer(item["user_location"]),
    searchContextSize: item["search_context_size"],
  };
}

/** model interface Location */
export interface Location {
  /** The type of the location. */
  type: LocationType;
}

export function locationSerializer(item: Location): any {
  return { type: item["type"] };
}

export function locationDeserializer(item: any): Location {
  return {
    type: item["type"],
  };
}

/** Alias for LocationUnion */
export type LocationUnion = ApproximateLocation | Location;

export function locationUnionSerializer(item: LocationUnion): any {
  switch (item.type) {
    case "approximate":
      return approximateLocationSerializer(item as ApproximateLocation);

    default:
      return locationSerializer(item);
  }
}

export function locationUnionDeserializer(item: any): LocationUnion {
  switch (item.type) {
    case "approximate":
      return approximateLocationDeserializer(item as ApproximateLocation);

    default:
      return locationDeserializer(item);
  }
}

/** Type of LocationType */
export type LocationType = "approximate";

/** model interface ApproximateLocation */
export interface ApproximateLocation extends Location {
  /** The type of the location. Always `approximate`. */
  type: "approximate";
  /** The country of the location. */
  country?: string | null;
  /** The region of the location. */
  region?: string | null;
  /** The city of the location. */
  city?: string | null;
  /** The timezone of the location. */
  timezone?: string | null;
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

/** A tool that runs Python code to help generate a response to a prompt. */
export interface CodeInterpreterTool extends Tool {
  /** The type of the code interpreter tool. Always `code_interpreter`. */
  type: "code_interpreter";
  /**
   * The code interpreter container. Can be a container ID or an object that
   * specifies uploaded file IDs to make available to your code.
   */
  container: string | CodeInterpreterToolAuto;
}

export function codeInterpreterToolSerializer(item: CodeInterpreterTool): any {
  return {
    type: item["type"],
    container: _codeInterpreterToolContainerSerializer(item["container"]),
  };
}

export function codeInterpreterToolDeserializer(item: any): CodeInterpreterTool {
  return {
    type: item["type"],
    container: _codeInterpreterToolContainerDeserializer(item["container"]),
  };
}

/** Alias for _CodeInterpreterToolContainer */
export type _CodeInterpreterToolContainer = string | CodeInterpreterToolAuto;

export function _codeInterpreterToolContainerSerializer(item: _CodeInterpreterToolContainer): any {
  return item;
}

export function _codeInterpreterToolContainerDeserializer(
  item: any,
): _CodeInterpreterToolContainer {
  return item;
}

/**
 * Configuration for a code interpreter container. Optionally specify the IDs
 * of the files to run the code on.
 */
export interface CodeInterpreterToolAuto {
  /** Always `auto`. */
  type: "auto";
  /** An optional list of uploaded files to make available to your code. */
  fileIds?: string[];
}

export function codeInterpreterToolAutoSerializer(item: CodeInterpreterToolAuto): any {
  return {
    type: item["type"],
    file_ids: !item["fileIds"]
      ? item["fileIds"]
      : item["fileIds"].map((p: any) => {
          return p;
        }),
  };
}

export function codeInterpreterToolAutoDeserializer(item: any): CodeInterpreterToolAuto {
  return {
    type: item["type"],
    fileIds: !item["file_ids"]
      ? item["file_ids"]
      : item["file_ids"].map((p: any) => {
          return p;
        }),
  };
}

/** A tool that generates images using a model like `gpt-image-1`. */
export interface ImageGenTool extends Tool {
  /** The type of the image generation tool. Always `image_generation`. */
  type: "image_generation";
  /** The image generation model to use. Default: `gpt-image-1`. */
  model?: "gpt-image-1";
  /**
   * The quality of the generated image. One of `low`, `medium`, `high`,
   * or `auto`. Default: `auto`.
   */
  quality?: "low" | "medium" | "high" | "auto";
  /**
   * The size of the generated image. One of `1024x1024`, `1024x1536`,
   * `1536x1024`, or `auto`. Default: `auto`.
   */
  size?: "1024x1024" | "1024x1536" | "1536x1024" | "auto";
  /**
   * The output format of the generated image. One of `png`, `webp`, or
   * `jpeg`. Default: `png`.
   */
  outputFormat?: "png" | "webp" | "jpeg";
  /** Compression level for the output image. Default: 100. */
  outputCompression?: number;
  /** Moderation level for the generated image. Default: `auto`. */
  moderation?: "auto" | "low";
  /**
   * Background type for the generated image. One of `transparent`,
   * `opaque`, or `auto`. Default: `auto`.
   */
  background?: "transparent" | "opaque" | "auto";
  /**
   * Optional mask for inpainting. Contains `image_url`
   * (string, optional) and `file_id` (string, optional).
   */
  inputImageMask?: {
    imageUrl?: string;
    fileId?: string;
  };
  /** Number of partial images to generate in streaming mode, from 0 (default value) to 3. */
  partialImages?: number;
}

export function imageGenToolSerializer(item: ImageGenTool): any {
  return {
    type: item["type"],
    model: item["model"],
    quality: item["quality"],
    size: item["size"],
    output_format: item["outputFormat"],
    output_compression: item["outputCompression"],
    moderation: item["moderation"],
    background: item["background"],
    input_image_mask: !item["inputImageMask"]
      ? item["inputImageMask"]
      : _imageGenToolInputImageMaskSerializer(item["inputImageMask"]),
    partial_images: item["partialImages"],
  };
}

export function imageGenToolDeserializer(item: any): ImageGenTool {
  return {
    type: item["type"],
    model: item["model"],
    quality: item["quality"],
    size: item["size"],
    outputFormat: item["output_format"],
    outputCompression: item["output_compression"],
    moderation: item["moderation"],
    background: item["background"],
    inputImageMask: !item["input_image_mask"]
      ? item["input_image_mask"]
      : _imageGenToolInputImageMaskDeserializer(item["input_image_mask"]),
    partialImages: item["partial_images"],
  };
}

/** model interface _ImageGenToolInputImageMask */
export interface _ImageGenToolInputImageMask {
  /** Base64-encoded mask image. */
  imageUrl?: string;
  /** File ID for the mask image. */
  fileId?: string;
}

export function _imageGenToolInputImageMaskSerializer(item: _ImageGenToolInputImageMask): any {
  return { image_url: item["imageUrl"], file_id: item["fileId"] };
}

export function _imageGenToolInputImageMaskDeserializer(item: any): _ImageGenToolInputImageMask {
  return {
    imageUrl: item["image_url"],
    fileId: item["file_id"],
  };
}

/** A tool that allows the model to execute shell commands in a local environment. */
export interface LocalShellTool extends Tool {
  /** The type of the local shell tool. Always `local_shell`. */
  type: "local_shell";
}

export function localShellToolSerializer(item: LocalShellTool): any {
  return { type: item["type"] };
}

export function localShellToolDeserializer(item: any): LocalShellTool {
  return {
    type: item["type"],
  };
}

/**
 * Give the model access to additional tools via remote Model Context Protocol
 * (MCP) servers. [Learn more about MCP](/docs/guides/tools-remote-mcp).
 */
export interface MCPTool extends Tool {
  /** The type of the MCP tool. Always `mcp`. */
  type: "mcp";
  /** A label for this MCP server, used to identify it in tool calls. */
  serverLabel: string;
  /** The URL for the MCP server. */
  serverUrl: string;
  /**
   * Optional HTTP headers to send to the MCP server. Use for authentication
   * or other purposes.
   */
  headers?: Record<string, string> | null;
  /** List of allowed tool names or a filter object. */
  allowedTools?:
  | string[]
  | {
      toolNames?: string[];
    };
  /** Specify which of the MCP server's tools require approval. */
  requireApproval?:
  | {
      always?: {
        toolNames?: string[];
      };
      never?: {
        toolNames?: string[];
      };
    }
  | "always"
  | "never";
  /** The connection ID in the project for the MCP server. The connection stores authentication and other connection details needed to connect to the MCP server. */
  projectConnectionId?: string;
}

export function mcpToolSerializer(item: MCPTool): any {
  return {
    type: item["type"],
    server_label: item["serverLabel"],
    server_url: item["serverUrl"],
    headers: item["headers"],
    allowed_tools: !item["allowedTools"]
      ? item["allowedTools"]
      : _mcpToolAllowedToolsSerializer(item["allowedTools"]),
    require_approval: !item["requireApproval"]
      ? item["requireApproval"]
      : _mcpToolRequireApprovalSerializer(item["requireApproval"]),
    project_connection_id: item["projectConnectionId"],
  };
}

export function mcpToolDeserializer(item: any): MCPTool {
  return {
    type: item["type"],
    serverLabel: item["server_label"],
    serverUrl: item["server_url"],
    headers: item["headers"],
    allowedTools: !item["allowed_tools"]
      ? item["allowed_tools"]
      : _mcpToolAllowedToolsDeserializer(item["allowed_tools"]),
    requireApproval: !item["require_approval"]
      ? item["require_approval"]
      : _mcpToolRequireApprovalDeserializer(item["require_approval"]),
    projectConnectionId: item["project_connection_id"],
  };
}

/** Alias for _MCPToolAllowedTools */
export type _MCPToolAllowedTools =
  | string[]
  | {
      toolNames?: string[];
    };

export function _mcpToolAllowedToolsSerializer(item: _MCPToolAllowedTools): any {
  return item;
}

export function _mcpToolAllowedToolsDeserializer(item: any): _MCPToolAllowedTools {
  return item;
}

/** model interface _MCPToolAllowedTools1 */
export interface _MCPToolAllowedTools1 {
  /** List of allowed tool names. */
  toolNames?: string[];
}

export function _mcpToolAllowedTools1Serializer(item: _MCPToolAllowedTools1): any {
  return {
    tool_names: !item["toolNames"]
      ? item["toolNames"]
      : item["toolNames"].map((p: any) => {
          return p;
        }),
  };
}

export function _mcpToolAllowedTools1Deserializer(item: any): _MCPToolAllowedTools1 {
  return {
    toolNames: !item["tool_names"]
      ? item["tool_names"]
      : item["tool_names"].map((p: any) => {
          return p;
        }),
  };
}

/** Alias for _MCPToolRequireApproval */
export type _MCPToolRequireApproval =
  | {
      always?: {
        toolNames?: string[];
      };
      never?: {
        toolNames?: string[];
      };
    }
  | "always"
  | "never";

export function _mcpToolRequireApprovalSerializer(item: _MCPToolRequireApproval): any {
  return item;
}

export function _mcpToolRequireApprovalDeserializer(item: any): _MCPToolRequireApproval {
  return item;
}

/** model interface _MCPToolRequireApproval1 */
export interface _MCPToolRequireApproval1 {
  /** A list of tools that always require approval. */
  always?: {
    toolNames?: string[];
  };
  /** A list of tools that never require approval. */
  never?: {
    toolNames?: string[];
  };
}

export function _mcpToolRequireApproval1Serializer(item: _MCPToolRequireApproval1): any {
  return {
    always: !item["always"]
      ? item["always"]
      : _mcpToolRequireApprovalAlwaysSerializer(item["always"]),
    never: !item["never"] ? item["never"] : _mcpToolRequireApprovalNeverSerializer(item["never"]),
  };
}

export function _mcpToolRequireApproval1Deserializer(item: any): _MCPToolRequireApproval1 {
  return {
    always: !item["always"]
      ? item["always"]
      : _mcpToolRequireApprovalAlwaysDeserializer(item["always"]),
    never: !item["never"] ? item["never"] : _mcpToolRequireApprovalNeverDeserializer(item["never"]),
  };
}

/** model interface _MCPToolRequireApprovalAlways */
export interface _MCPToolRequireApprovalAlways {
  /** List of tools that require approval. */
  toolNames?: string[];
}

export function _mcpToolRequireApprovalAlwaysSerializer(item: _MCPToolRequireApprovalAlways): any {
  return {
    tool_names: !item["toolNames"]
      ? item["toolNames"]
      : item["toolNames"].map((p: any) => {
          return p;
        }),
  };
}

export function _mcpToolRequireApprovalAlwaysDeserializer(
  item: any,
): _MCPToolRequireApprovalAlways {
  return {
    toolNames: !item["tool_names"]
      ? item["tool_names"]
      : item["tool_names"].map((p: any) => {
          return p;
        }),
  };
}

/** model interface _MCPToolRequireApprovalNever */
export interface _MCPToolRequireApprovalNever {
  /** List of tools that do not require approval. */
  toolNames?: string[];
}

export function _mcpToolRequireApprovalNeverSerializer(item: _MCPToolRequireApprovalNever): any {
  return {
    tool_names: !item["toolNames"]
      ? item["toolNames"]
      : item["toolNames"].map((p: any) => {
          return p;
        }),
  };
}

export function _mcpToolRequireApprovalNeverDeserializer(item: any): _MCPToolRequireApprovalNever {
  return {
    toolNames: !item["tool_names"]
      ? item["tool_names"]
      : item["tool_names"].map((p: any) => {
          return p;
        }),
  };
}

/** The input definition information for a bing grounding search tool as used to configure an agent. */
export interface BingGroundingAgentTool extends Tool {
  /** The object type, which is always 'bing_grounding'. */
  type: "bing_grounding";
  /** The bing grounding search tool parameters. */
  bingGrounding: BingGroundingSearchToolParameters;
}

export function bingGroundingAgentToolSerializer(item: BingGroundingAgentTool): any {
  return {
    type: item["type"],
    bing_grounding: bingGroundingSearchToolParametersSerializer(item["bingGrounding"]),
  };
}

export function bingGroundingAgentToolDeserializer(item: any): BingGroundingAgentTool {
  return {
    type: item["type"],
    bingGrounding: bingGroundingSearchToolParametersDeserializer(item["bing_grounding"]),
  };
}

/** The bing grounding search tool parameters. */
export interface BingGroundingSearchToolParameters {
  /**
   * The project connections attached to this tool. There can be a maximum of 1 connection
   * resource attached to the tool.
   */
  projectConnections: ToolProjectConnectionList;
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
    project_connections: toolProjectConnectionListSerializer(item["projectConnections"]),
    search_configurations: bingGroundingSearchConfigurationArraySerializer(
      item["searchConfigurations"],
    ),
  };
}

export function bingGroundingSearchToolParametersDeserializer(
  item: any,
): BingGroundingSearchToolParameters {
  return {
    projectConnections: toolProjectConnectionListDeserializer(item["project_connections"]),
    searchConfigurations: bingGroundingSearchConfigurationArrayDeserializer(
      item["search_configurations"],
    ),
  };
}

/** A set of project connection resources currently used by either the `bing_grounding`, `fabric_dataagent`, or `sharepoint_grounding` tools. */
export interface ToolProjectConnectionList {
  /**
   * The project connections attached to this tool. There can be a maximum of 1 connection
   * resource attached to the tool.
   */
  projectConnections?: ToolProjectConnection[];
}

export function toolProjectConnectionListSerializer(item: ToolProjectConnectionList): any {
  return {
    project_connections: !item["projectConnections"]
      ? item["projectConnections"]
      : toolProjectConnectionArraySerializer(item["projectConnections"]),
  };
}

export function toolProjectConnectionListDeserializer(item: any): ToolProjectConnectionList {
  return {
    projectConnections: !item["project_connections"]
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
  projectConnectionId: string;
}

export function toolProjectConnectionSerializer(item: ToolProjectConnection): any {
  return { project_connection_id: item["projectConnectionId"] };
}

export function toolProjectConnectionDeserializer(item: any): ToolProjectConnection {
  return {
    projectConnectionId: item["project_connection_id"],
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
  projectConnectionId: string;
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
    project_connection_id: item["projectConnectionId"],
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
    projectConnectionId: item["project_connection_id"],
    market: item["market"],
    setLang: item["set_lang"],
    count: item["count"],
    freshness: item["freshness"],
  };
}

/** The input definition information for a Microsoft Fabric tool as used to configure an agent. */
export interface MicrosoftFabricAgentTool extends Tool {
  /** The object type, which is always 'fabric_dataagent'. */
  type: "fabric_dataagent_preview";
  /** The fabric data agent tool parameters. */
  fabricDataagentPreview: FabricDataAgentToolParameters;
}

export function microsoftFabricAgentToolSerializer(item: MicrosoftFabricAgentTool): any {
  return {
    type: item["type"],
    fabric_dataagent_preview: fabricDataAgentToolParametersSerializer(
      item["fabricDataagentPreview"],
    ),
  };
}

export function microsoftFabricAgentToolDeserializer(item: any): MicrosoftFabricAgentTool {
  return {
    type: item["type"],
    fabricDataagentPreview: fabricDataAgentToolParametersDeserializer(
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
  projectConnections?: ToolProjectConnection[];
}

export function fabricDataAgentToolParametersSerializer(item: FabricDataAgentToolParameters): any {
  return {
    project_connections: !item["projectConnections"]
      ? item["projectConnections"]
      : toolProjectConnectionArraySerializer(item["projectConnections"]),
  };
}

export function fabricDataAgentToolParametersDeserializer(
  item: any,
): FabricDataAgentToolParameters {
  return {
    projectConnections: !item["project_connections"]
      ? item["project_connections"]
      : toolProjectConnectionArrayDeserializer(item["project_connections"]),
  };
}

/** The input definition information for a sharepoint tool as used to configure an agent. */
export interface SharepointAgentTool extends Tool {
  /** The object type, which is always 'sharepoint_grounding'. */
  type: "sharepoint_grounding_preview";
  /** The sharepoint grounding tool parameters. */
  sharepointGroundingPreview: SharepointGroundingToolParameters;
}

export function sharepointAgentToolSerializer(item: SharepointAgentTool): any {
  return {
    type: item["type"],
    sharepoint_grounding_preview: sharepointGroundingToolParametersSerializer(
      item["sharepointGroundingPreview"],
    ),
  };
}

export function sharepointAgentToolDeserializer(item: any): SharepointAgentTool {
  return {
    type: item["type"],
    sharepointGroundingPreview: sharepointGroundingToolParametersDeserializer(
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
  projectConnections?: ToolProjectConnection[];
}

export function sharepointGroundingToolParametersSerializer(
  item: SharepointGroundingToolParameters,
): any {
  return {
    project_connections: !item["projectConnections"]
      ? item["projectConnections"]
      : toolProjectConnectionArraySerializer(item["projectConnections"]),
  };
}

export function sharepointGroundingToolParametersDeserializer(
  item: any,
): SharepointGroundingToolParameters {
  return {
    projectConnections: !item["project_connections"]
      ? item["project_connections"]
      : toolProjectConnectionArrayDeserializer(item["project_connections"]),
  };
}

/** The input definition information for an Azure AI search tool as used to configure an agent. */
export interface AzureAISearchAgentTool extends Tool {
  /** The object type, which is always 'azure_ai_search'. */
  type: "azure_ai_search";
  /** The azure ai search index resource. */
  azureAiSearch: AzureAISearchToolResource;
}

export function azureAISearchAgentToolSerializer(item: AzureAISearchAgentTool): any {
  return {
    type: item["type"],
    azure_ai_search: azureAISearchToolResourceSerializer(item["azureAiSearch"]),
  };
}

export function azureAISearchAgentToolDeserializer(item: any): AzureAISearchAgentTool {
  return {
    type: item["type"],
    azureAiSearch: azureAISearchToolResourceDeserializer(item["azure_ai_search"]),
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
    indexList: !item["indexList"]
      ? item["indexList"]
      : aiSearchIndexResourceArraySerializer(item["indexList"]),
  };
}

export function azureAISearchToolResourceDeserializer(item: any): AzureAISearchToolResource {
  return {
    indexList: !item["indexList"]
      ? item["indexList"]
      : aiSearchIndexResourceArrayDeserializer(item["indexList"]),
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
  projectConnectionId: string;
  /** The name of an index in an IndexResource attached to this agent. */
  indexName?: string;
  /** Type of query in an AIIndexResource attached to this agent. */
  queryType?: AzureAISearchQueryType;
  /** Number of documents to retrieve from search and present to the model. */
  topK?: number;
  /** filter string for search resource. Learn more from here: https://learn.microsoft.com/azure/search/search-filters */
  filter?: string;
  /** Index asset id for search resource. */
  indexAssetId?: string;
}

export function aiSearchIndexResourceSerializer(item: AISearchIndexResource): any {
  return {
    project_connection_id: item["projectConnectionId"],
    indexName: item["indexName"],
    queryType: item["queryType"],
    topK: item["topK"],
    filter: item["filter"],
    indexAssetId: item["indexAssetId"],
  };
}

export function aiSearchIndexResourceDeserializer(item: any): AISearchIndexResource {
  return {
    projectConnectionId: item["project_connection_id"],
    indexName: item["indexName"],
    queryType: item["queryType"],
    topK: item["topK"],
    filter: item["filter"],
    indexAssetId: item["indexAssetId"],
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
export interface OpenApiAgentTool extends Tool {
  /** The object type, which is always 'openapi'. */
  type: "openapi";
  /** The openapi function definition. */
  openapi: OpenApiFunctionDefinition;
}

export function openApiAgentToolSerializer(item: OpenApiAgentTool): any {
  return {
    type: item["type"],
    openapi: openApiFunctionDefinitionSerializer(item["openapi"]),
  };
}

export function openApiAgentToolDeserializer(item: any): OpenApiAgentTool {
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
  functions?: {
    name: string;
    description?: string;
    parameters: any;
  }[];
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
    functions: !item["functions"]
      ? item["functions"]
      : _openApiFunctionDefinitionFunctionArraySerializer(item["functions"]),
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
  securityScheme: OpenApiProjectConnectionSecurityScheme;
}

export function openApiProjectConnectionAuthDetailsSerializer(
  item: OpenApiProjectConnectionAuthDetails,
): any {
  return {
    type: item["type"],
    security_scheme: openApiProjectConnectionSecuritySchemeSerializer(item["securityScheme"]),
  };
}

export function openApiProjectConnectionAuthDetailsDeserializer(
  item: any,
): OpenApiProjectConnectionAuthDetails {
  return {
    type: item["type"],
    securityScheme: openApiProjectConnectionSecuritySchemeDeserializer(item["security_scheme"]),
  };
}

/** Security scheme for OpenApi managed_identity authentication */
export interface OpenApiProjectConnectionSecurityScheme {
  /** Project connection id for Project Connection auth type */
  projectConnectionId: string;
}

export function openApiProjectConnectionSecuritySchemeSerializer(
  item: OpenApiProjectConnectionSecurityScheme,
): any {
  return { project_connection_id: item["projectConnectionId"] };
}

export function openApiProjectConnectionSecuritySchemeDeserializer(
  item: any,
): OpenApiProjectConnectionSecurityScheme {
  return {
    projectConnectionId: item["project_connection_id"],
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

export function _openApiFunctionDefinitionFunctionArraySerializer(
  result: Array<_OpenApiFunctionDefinitionFunction>,
): any[] {
  return result.map((item) => {
    return _openApiFunctionDefinitionFunctionSerializer(item);
  });
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
  parameters: any;
}

export function _openApiFunctionDefinitionFunctionSerializer(
  item: _OpenApiFunctionDefinitionFunction,
): any {
  return {
    name: item["name"],
    description: item["description"],
    parameters: item["parameters"],
  };
}

export function _openApiFunctionDefinitionFunctionDeserializer(
  item: any,
): _OpenApiFunctionDefinitionFunction {
  return {
    name: item["name"],
    description: item["description"],
    parameters: item["parameters"],
  };
}

/** The input definition information for a Bing custom search tool as used to configure an agent. */
export interface BingCustomSearchAgentTool extends Tool {
  /** The object type, which is always 'bing_custom_search'. */
  type: "bing_custom_search_preview";
  /** The bing custom search tool parameters. */
  bingCustomSearchPreview: BingCustomSearchToolParameters;
}

export function bingCustomSearchAgentToolSerializer(item: BingCustomSearchAgentTool): any {
  return {
    type: item["type"],
    bing_custom_search_preview: bingCustomSearchToolParametersSerializer(
      item["bingCustomSearchPreview"],
    ),
  };
}

export function bingCustomSearchAgentToolDeserializer(item: any): BingCustomSearchAgentTool {
  return {
    type: item["type"],
    bingCustomSearchPreview: bingCustomSearchToolParametersDeserializer(
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
  /** Project connection id for grounding with bing search */
  projectConnectionId: string;
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
    project_connection_id: item["projectConnectionId"],
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
    projectConnectionId: item["project_connection_id"],
    instanceName: item["instance_name"],
    market: item["market"],
    setLang: item["set_lang"],
    count: item["count"],
    freshness: item["freshness"],
  };
}

/** The input definition information for a Browser Automation Tool, as used to configure an Agent. */
export interface BrowserAutomationAgentTool extends Tool {
  /** The object type, which is always 'browser_automation'. */
  type: "browser_automation_preview";
  /** The Browser Automation Tool parameters. */
  browserAutomationPreview: BrowserAutomationToolParameters;
}

export function browserAutomationAgentToolSerializer(item: BrowserAutomationAgentTool): any {
  return {
    type: item["type"],
    browser_automation_preview: browserAutomationToolParametersSerializer(
      item["browserAutomationPreview"],
    ),
  };
}

export function browserAutomationAgentToolDeserializer(item: any): BrowserAutomationAgentTool {
  return {
    type: item["type"],
    browserAutomationPreview: browserAutomationToolParametersDeserializer(
      item["browser_automation_preview"],
    ),
  };
}

/** Definition of input parameters for the Browser Automation Tool. */
export interface BrowserAutomationToolParameters {
  /** The project connection parameters associated with the Browser Automation Tool. */
  projectConnection: BrowserAutomationToolConnectionParameters;
}

export function browserAutomationToolParametersSerializer(
  item: BrowserAutomationToolParameters,
): any {
  return {
    project_connection: browserAutomationToolConnectionParametersSerializer(
      item["projectConnection"],
    ),
  };
}

export function browserAutomationToolParametersDeserializer(
  item: any,
): BrowserAutomationToolParameters {
  return {
    projectConnection: browserAutomationToolConnectionParametersDeserializer(
      item["project_connection"],
    ),
  };
}

/** Definition of input parameters for the connection used by the Browser Automation Tool. */
export interface BrowserAutomationToolConnectionParameters {
  /** The ID of the project connection to your Azure Playwright resource. */
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

/** The input definition information for an Azure Function Tool, as used to configure an Agent. */
export interface AzureFunctionAgentTool extends Tool {
  /** The object type, which is always 'browser_automation'. */
  type: "azure_function";
  /** The Azure Function Tool definition. */
  azureFunction: AzureFunctionDefinition;
}

export function azureFunctionAgentToolSerializer(item: AzureFunctionAgentTool): any {
  return {
    type: item["type"],
    azure_function: azureFunctionDefinitionSerializer(item["azureFunction"]),
  };
}

export function azureFunctionAgentToolDeserializer(item: any): AzureFunctionAgentTool {
  return {
    type: item["type"],
    azureFunction: azureFunctionDefinitionDeserializer(item["azure_function"]),
  };
}

/** The definition of Azure function. */
export interface AzureFunctionDefinition {
  /** The definition of azure function and its parameters. */
  function: {
    name: string;
    description?: string;
    parameters: any;
  };
  /** Input storage queue. The queue storage trigger runs a function as messages are added to it. */
  inputBinding: AzureFunctionBinding;
  /** Output storage queue. The function writes output to this queue when the input items are processed. */
  outputBinding: AzureFunctionBinding;
}

export function azureFunctionDefinitionSerializer(item: AzureFunctionDefinition): any {
  return {
    function: _azureFunctionDefinitionFunctionSerializer(item["function"]),
    input_binding: azureFunctionBindingSerializer(item["inputBinding"]),
    output_binding: azureFunctionBindingSerializer(item["outputBinding"]),
  };
}

export function azureFunctionDefinitionDeserializer(item: any): AzureFunctionDefinition {
  return {
    function: _azureFunctionDefinitionFunctionDeserializer(item["function"]),
    inputBinding: azureFunctionBindingDeserializer(item["input_binding"]),
    outputBinding: azureFunctionBindingDeserializer(item["output_binding"]),
  };
}

/** model interface _AzureFunctionDefinitionFunction */
export interface _AzureFunctionDefinitionFunction {
  /** The name of the function to be called. */
  name: string;
  /** A description of what the function does, used by the model to choose when and how to call the function. */
  description?: string;
  /** The parameters the functions accepts, described as a JSON Schema object. */
  parameters: any;
}

export function _azureFunctionDefinitionFunctionSerializer(
  item: _AzureFunctionDefinitionFunction,
): any {
  return {
    name: item["name"],
    description: item["description"],
    parameters: item["parameters"],
  };
}

export function _azureFunctionDefinitionFunctionDeserializer(
  item: any,
): _AzureFunctionDefinitionFunction {
  return {
    name: item["name"],
    description: item["description"],
    parameters: item["parameters"],
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
  queueServiceEndpoint: string;
  /** The name of an Azure function storage queue. */
  queueName: string;
}

export function azureFunctionStorageQueueSerializer(item: AzureFunctionStorageQueue): any {
  return {
    queue_service_endpoint: item["queueServiceEndpoint"],
    queue_name: item["queueName"],
  };
}

export function azureFunctionStorageQueueDeserializer(item: any): AzureFunctionStorageQueue {
  return {
    queueServiceEndpoint: item["queue_service_endpoint"],
    queueName: item["queue_name"],
  };
}

/** A tool for capturing structured outputs */
export interface CaptureStructuredOutputsTool extends Tool {
  /** The type of the tool. Always `capture_structured_outputs`. */
  type: "capture_structured_outputs";
  /** Set of structured outputs to capture from the model. */
  outputs: Record<string, StructuredOutputDefinition>;
}

export function captureStructuredOutputsToolSerializer(item: CaptureStructuredOutputsTool): any {
  return {
    type: item["type"],
    outputs: structuredOutputDefinitionRecordSerializer(item["outputs"]),
  };
}

export function captureStructuredOutputsToolDeserializer(item: any): CaptureStructuredOutputsTool {
  return {
    type: item["type"],
    outputs: structuredOutputDefinitionRecordDeserializer(item["outputs"]),
  };
}

export function structuredOutputDefinitionRecordSerializer(
  item: Record<string, StructuredOutputDefinition>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : structuredOutputDefinitionSerializer(item[key]);
  });
  return result;
}

export function structuredOutputDefinitionRecordDeserializer(
  item: Record<string, any>,
): Record<string, StructuredOutputDefinition> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : structuredOutputDefinitionDeserializer(item[key]);
  });
  return result;
}

/** A structured output that can be produced by the agent. */
export interface StructuredOutputDefinition {
  /** A description of the output to emit. Used by the model to determine when to emit the output. */
  description?: string;
  /** The JSON schema for the structured output. */
  schema: Record<string, any>;
}

export function structuredOutputDefinitionSerializer(item: StructuredOutputDefinition): any {
  return { description: item["description"], schema: item["schema"] };
}

export function structuredOutputDefinitionDeserializer(item: any): StructuredOutputDefinition {
  return {
    description: item["description"],
    schema: item["schema"],
  };
}

/** model interface CaptureSemanticEventsTool */
export interface CaptureSemanticEventsTool extends Tool {
  /** The type of the tool. Always `capture_semantic_events`. */
  type: "capture_semantic_events";
  /** The set of structured events to capture from the model. */
  events: Record<string, SemanticEventDefinition>;
}

export function captureSemanticEventsToolSerializer(item: CaptureSemanticEventsTool): any {
  return {
    type: item["type"],
    events: semanticEventDefinitionRecordSerializer(item["events"]),
  };
}

export function captureSemanticEventsToolDeserializer(item: any): CaptureSemanticEventsTool {
  return {
    type: item["type"],
    events: semanticEventDefinitionRecordDeserializer(item["events"]),
  };
}

export function semanticEventDefinitionRecordSerializer(
  item: Record<string, SemanticEventDefinition>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : semanticEventDefinitionSerializer(item[key]);
  });
  return result;
}

export function semanticEventDefinitionRecordDeserializer(
  item: Record<string, any>,
): Record<string, SemanticEventDefinition> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : semanticEventDefinitionDeserializer(item[key]);
  });
  return result;
}

/** An event that can be raised by the agent based on a semantic condition. */
export interface SemanticEventDefinition {
  /** A condition that specifies when the event must be raised. Used by the model to determine when to raise the event. */
  condition: string;
}

export function semanticEventDefinitionSerializer(item: SemanticEventDefinition): any {
  return { condition: item["condition"] };
}

export function semanticEventDefinitionDeserializer(item: any): SemanticEventDefinition {
  return {
    condition: item["condition"],
  };
}

/** An agent implementing the A2A protocol. */
export interface A2ATool extends Tool {
  /** The type of the tool. Always `a2a`. */
  type: "a2a_preview";
  /** Base URL of the agent. */
  baseUrl?: string;
  /**
   * The path to the agent card relative to the `base_url`.
   * If not provided, defaults to  `/.well-known/agent-card.json`
   */
  agentCardPath?: string;
  /**
   * The connection ID in the project for the A2A server.
   * The connection stores authentication and other connection details needed to connect to the A2A server.
   */
  projectConnectionId?: string;
}

export function a2AToolSerializer(item: A2ATool): any {
  return {
    type: item["type"],
    base_url: item["baseUrl"],
    agent_card_path: item["agentCardPath"],
    project_connection_id: item["projectConnectionId"],
  };
}

export function a2AToolDeserializer(item: any): A2ATool {
  return {
    type: item["type"],
    baseUrl: item["base_url"],
    agentCardPath: item["agent_card_path"],
    projectConnectionId: item["project_connection_id"],
  };
}

/** A tool for integrating memories into the agent. */
export interface MemorySearchTool extends Tool {
  /** The type of the tool. Always `memory_search`. */
  type: "memory_search";
  /** The ID of the memory store to use. */
  memoryStoreId: string;
  /**
   * The namespace used to group and isolate memories, such as a user ID.
   * Limits which memories can be retrieved or updated.
   */
  scope: string;
  /** Options for searching the memory store. */
  searchOptions?: MemorySearchOptions;
  /** The amount of time to wait after inactivity before updating memories with messages from the call (e.g., '0s', '5m'). Defaults to '60s'. */
  updateDelay?: string;
}

export function memorySearchToolSerializer(item: MemorySearchTool): any {
  return {
    type: item["type"],
    memory_store_id: item["memoryStoreId"],
    scope: item["scope"],
    search_options: !item["searchOptions"]
      ? item["searchOptions"]
      : memorySearchOptionsSerializer(item["searchOptions"]),
    update_delay: item["updateDelay"],
  };
}

export function memorySearchToolDeserializer(item: any): MemorySearchTool {
  return {
    type: item["type"],
    memoryStoreId: item["memory_store_id"],
    scope: item["scope"],
    searchOptions: !item["search_options"]
      ? item["search_options"]
      : memorySearchOptionsDeserializer(item["search_options"]),
    updateDelay: item["update_delay"],
  };
}

/** Memory search options. */
export interface MemorySearchOptions {
  /** Maximum number of memory items to return. */
  maxMemories?: number;
}

export function memorySearchOptionsSerializer(item: MemorySearchOptions): any {
  return { max_memories: item["maxMemories"] };
}

export function memorySearchOptionsDeserializer(item: any): MemorySearchOptions {
  return {
    maxMemories: item["max_memories"],
  };
}

/** model interface _PromptAgentDefinitionText */
export interface _PromptAgentDefinitionText {
  format?: ResponseTextFormatConfigurationUnion;
}

export function _promptAgentDefinitionTextSerializer(item: _PromptAgentDefinitionText): any {
  return {
    format: !item["format"]
      ? item["format"]
      : responseTextFormatConfigurationUnionSerializer(item["format"]),
  };
}

export function _promptAgentDefinitionTextDeserializer(item: any): _PromptAgentDefinitionText {
  return {
    format: !item["format"]
      ? item["format"]
      : responseTextFormatConfigurationUnionDeserializer(item["format"]),
  };
}

/** model interface ResponseTextFormatConfiguration */
export interface ResponseTextFormatConfiguration {
  /** The type of response format being defined. */
  type: ResponseTextFormatConfigurationType;
}

export function responseTextFormatConfigurationSerializer(
  item: ResponseTextFormatConfiguration,
): any {
  return { type: item["type"] };
}

export function responseTextFormatConfigurationDeserializer(
  item: any,
): ResponseTextFormatConfiguration {
  return {
    type: item["type"],
  };
}

/** Alias for ResponseTextFormatConfigurationUnion */
export type ResponseTextFormatConfigurationUnion =
  | ResponseTextFormatConfigurationText
  | ResponseTextFormatConfigurationJsonObject
  | ResponseTextFormatConfigurationJsonSchema
  | ResponseTextFormatConfiguration;

export function responseTextFormatConfigurationUnionSerializer(
  item: ResponseTextFormatConfigurationUnion,
): any {
  switch (item.type) {
    case "text":
      return responseTextFormatConfigurationTextSerializer(
        item as ResponseTextFormatConfigurationText,
      );

    case "json_object":
      return responseTextFormatConfigurationJsonObjectSerializer(
        item as ResponseTextFormatConfigurationJsonObject,
      );

    case "json_schema":
      return responseTextFormatConfigurationJsonSchemaSerializer(
        item as ResponseTextFormatConfigurationJsonSchema,
      );

    default:
      return responseTextFormatConfigurationSerializer(item);
  }
}

export function responseTextFormatConfigurationUnionDeserializer(
  item: any,
): ResponseTextFormatConfigurationUnion {
  switch (item.type) {
    case "text":
      return responseTextFormatConfigurationTextDeserializer(
        item as ResponseTextFormatConfigurationText,
      );

    case "json_object":
      return responseTextFormatConfigurationJsonObjectDeserializer(
        item as ResponseTextFormatConfigurationJsonObject,
      );

    case "json_schema":
      return responseTextFormatConfigurationJsonSchemaDeserializer(
        item as ResponseTextFormatConfigurationJsonSchema,
      );

    default:
      return responseTextFormatConfigurationDeserializer(item);
  }
}

/**
 * An object specifying the format that the model must output.
 *
 * Configuring `{ "type": "json_schema" }` enables Structured Outputs,
 * which ensures the model will match your supplied JSON schema. Learn more in the
 * [Structured Outputs guide](/docs/guides/structured-outputs).
 *
 * The default format is `{ "type": "text" }` with no additional options.
 *
 * **Not recommended for gpt-4o and newer models:**
 *
 * Setting to `{ "type": "json_object" }` enables the older JSON mode, which
 * ensures the message the model generates is valid JSON. Using `json_schema`
 * is preferred for models that support it.
 */
export type ResponseTextFormatConfigurationType = "text" | "json_schema" | "json_object";

/** model interface ResponseTextFormatConfigurationText */
export interface ResponseTextFormatConfigurationText extends ResponseTextFormatConfiguration {
  /** The type of the item. Always `text`. */
  type: "text";
}

export function responseTextFormatConfigurationTextSerializer(
  item: ResponseTextFormatConfigurationText,
): any {
  return { type: item["type"] };
}

export function responseTextFormatConfigurationTextDeserializer(
  item: any,
): ResponseTextFormatConfigurationText {
  return {
    type: item["type"],
  };
}

/** model interface ResponseTextFormatConfigurationJsonObject */
export interface ResponseTextFormatConfigurationJsonObject extends ResponseTextFormatConfiguration {
  /** The type of the item. Always `json_object`. */
  type: "json_object";
}

export function responseTextFormatConfigurationJsonObjectSerializer(
  item: ResponseTextFormatConfigurationJsonObject,
): any {
  return { type: item["type"] };
}

export function responseTextFormatConfigurationJsonObjectDeserializer(
  item: any,
): ResponseTextFormatConfigurationJsonObject {
  return {
    type: item["type"],
  };
}

/**
 * JSON Schema response format. Used to generate structured JSON responses.
 * Learn more about [Structured Outputs](/docs/guides/structured-outputs).
 */
export interface ResponseTextFormatConfigurationJsonSchema extends ResponseTextFormatConfiguration {
  /** The type of response format being defined. Always `json_schema`. */
  type: "json_schema";
  /**
   * A description of what the response format is for, used by the model to
   * determine how to respond in the format.
   */
  description?: string;
  /**
   * The name of the response format. Must be a-z, A-Z, 0-9, or contain
   * underscores and dashes, with a maximum length of 64.
   */
  name: string;
  /** The JSON Schema describing the desired response format. */
  schema: ResponseFormatJsonSchemaSchema;
  /**
   * Whether to enable strict schema adherence when generating the output.
   * If set to true, the model will always follow the exact schema defined
   * in the `schema` field. Only a subset of JSON Schema is supported when
   * `strict` is `true`. To learn more, read the [Structured Outputs
   * guide](/docs/guides/structured-outputs).
   */
  strict?: boolean;
}

export function responseTextFormatConfigurationJsonSchemaSerializer(
  item: ResponseTextFormatConfigurationJsonSchema,
): any {
  return {
    type: item["type"],
    description: item["description"],
    name: item["name"],
    schema: responseFormatJsonSchemaSchemaSerializer(item["schema"]),
    strict: item["strict"],
  };
}

export function responseTextFormatConfigurationJsonSchemaDeserializer(
  item: any,
): ResponseTextFormatConfigurationJsonSchema {
  return {
    type: item["type"],
    description: item["description"],
    name: item["name"],
    schema: responseFormatJsonSchemaSchemaDeserializer(item["schema"]),
    strict: item["strict"],
  };
}

/**
 * The schema for the response format, described as a JSON Schema object.
 * Learn how to build JSON schemas [here](https://json-schema.org/).
 */
export interface ResponseFormatJsonSchemaSchema {
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function responseFormatJsonSchemaSchemaSerializer(
  item: ResponseFormatJsonSchemaSchema,
): any {
  return { ...serializeRecord(item.additionalProperties) };
}

export function responseFormatJsonSchemaSchemaDeserializer(
  item: any,
): ResponseFormatJsonSchemaSchema {
  return {
    additionalProperties: serializeRecord(item, []),
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
  defaultValue?: any;
  /** When provided, the input value is bound to the specified tool arguments. */
  toolArgumentBindings?: ToolArgumentBinding[];
  /** The JSON schema for the structured input (optional). */
  schema?: any;
  /** Whether the input property is required when the agent is invoked. */
  required?: boolean;
}

export function structuredInputDefinitionSerializer(item: StructuredInputDefinition): any {
  return {
    description: item["description"],
    default_value: item["defaultValue"],
    tool_argument_bindings: !item["toolArgumentBindings"]
      ? item["toolArgumentBindings"]
      : toolArgumentBindingArraySerializer(item["toolArgumentBindings"]),
    schema: item["schema"],
    required: item["required"],
  };
}

export function structuredInputDefinitionDeserializer(item: any): StructuredInputDefinition {
  return {
    description: item["description"],
    defaultValue: item["default_value"],
    toolArgumentBindings: !item["tool_argument_bindings"]
      ? item["tool_argument_bindings"]
      : toolArgumentBindingArrayDeserializer(item["tool_argument_bindings"]),
    schema: item["schema"],
    required: item["required"],
  };
}

export function toolArgumentBindingArraySerializer(result: Array<ToolArgumentBinding>): any[] {
  return result.map((item) => {
    return toolArgumentBindingSerializer(item);
  });
}

export function toolArgumentBindingArrayDeserializer(result: Array<ToolArgumentBinding>): any[] {
  return result.map((item) => {
    return toolArgumentBindingDeserializer(item);
  });
}

/** model interface ToolArgumentBinding */
export interface ToolArgumentBinding {
  /** The name of the tool to participate in the argument binding. If not provided, then all tools with matching arguments will participate in binding. */
  toolName?: string;
  /** The name of the argument within the tool. */
  argumentName: string;
}

export function toolArgumentBindingSerializer(item: ToolArgumentBinding): any {
  return { tool_name: item["toolName"], argument_name: item["argumentName"] };
}

export function toolArgumentBindingDeserializer(item: any): ToolArgumentBinding {
  return {
    toolName: item["tool_name"],
    argumentName: item["argument_name"],
  };
}

/** model interface ApiError */
export interface ApiError {
  /** The error code. */
  code: string;
  /** The error message. */
  message: string;
  /** The error details. */
  details?: string;
  /** The error fields. */
  errors?: Record<string, string[]>;
}

export function apiErrorDeserializer(item: any): ApiError {
  return {
    code: item["code"],
    message: item["message"],
    details: item["details"],
    errors: item["errors"],
  };
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
  data: AgentObject[];
  /** The first ID represented in this list. */
  firstId?: string;
  /** The last ID represented in this list. */
  lastId?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

export function _agentsPagedResultAgentObjectDeserializer(
  item: any,
): _AgentsPagedResultAgentObject {
  return {
    data: agentObjectArrayDeserializer(item["data"]),
    firstId: item["first_id"],
    lastId: item["last_id"],
    hasMore: item["has_more"],
  };
}

export function agentObjectArrayDeserializer(result: Array<AgentObject>): any[] {
  return result.map((item) => {
    return agentObjectDeserializer(item);
  });
}

/** A deleted agent version Object */
export interface DeleteAgentVersionResponse {
  /** The object type. Always 'agent.deleted'. */
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
  data: AgentVersionObject[];
  /** The first ID represented in this list. */
  firstId?: string;
  /** The last ID represented in this list. */
  lastId?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

export function _agentsPagedResultAgentVersionObjectDeserializer(
  item: any,
): _AgentsPagedResultAgentVersionObject {
  return {
    data: agentVersionObjectArrayDeserializer(item["data"]),
    firstId: item["first_id"],
    lastId: item["last_id"],
    hasMore: item["has_more"],
  };
}

export function agentVersionObjectArrayDeserializer(result: Array<AgentVersionObject>): any[] {
  return result.map((item) => {
    return agentVersionObjectDeserializer(item);
  });
}

/** The container operation for a specific version of an agent. */
export interface AgentContainerOperationObject {
  /** The ID of the container operation. This id is unique identifier across the system. */
  id: string;
  /** The ID of the agent. */
  agentId: string;
  /** The ID of the agent version. */
  agentVersionId: string;
  /** The status of the container operation. */
  status: AgentContainerOperationStatus;
  /** The error of the container operation, if any. */
  error?: AgentContainerOperationError;
  /** The container of the specific version of an agent. */
  container?: AgentContainerObject;
}

export function agentContainerOperationObjectDeserializer(
  item: any,
): AgentContainerOperationObject {
  return {
    id: item["id"],
    agentId: item["agent_id"],
    agentVersionId: item["agent_version_id"],
    status: item["status"],
    error: !item["error"] ? item["error"] : agentContainerOperationErrorDeserializer(item["error"]),
    container: !item["container"]
      ? item["container"]
      : agentContainerObjectDeserializer(item["container"]),
  };
}

/** Status of the container operation for a specific version of an agent. */
export type AgentContainerOperationStatus = "NotStarted" | "InProgress" | "Succeeded" | "Failed";

/** The error details of the container operation, if any. */
export interface AgentContainerOperationError {
  /** The error code of the container operation, if any. */
  code: string;
  /** The error type of the container operation, if any. */
  type: string;
  /** The error message of the container operation, if any. */
  message: string;
}

export function agentContainerOperationErrorDeserializer(item: any): AgentContainerOperationError {
  return {
    code: item["code"],
    type: item["type"],
    message: item["message"],
  };
}

/** The details of the container of a specific version of an agent. */
export interface AgentContainerObject {
  /** The object type, which is always 'agent.container'. */
  readonly object: "agent.container";
  /** The status of the container of a specific version of an agent. */
  readonly status: AgentContainerStatus;
  /** The maximum number of replicas for the container. Default is 1. */
  maxReplicas?: number;
  /** The minimum number of replicas for the container. Default is 1. */
  minReplicas?: number;
  /** The error message if the container failed to operate, if any. */
  readonly errorMessage?: string;
  /** The creation time of the container. */
  readonly createdAt: Date;
  /** The last update time of the container. */
  readonly updatedAt: Date;
}

export function agentContainerObjectDeserializer(item: any): AgentContainerObject {
  return {
    object: item["object"],
    status: item["status"],
    maxReplicas: item["max_replicas"],
    minReplicas: item["min_replicas"],
    errorMessage: item["error_message"],
    createdAt: new Date(item["created_at"]),
    updatedAt: new Date(item["updated_at"]),
  };
}

/** Status of the container of a specific version of an agent. */
export type AgentContainerStatus =
  | "Starting"
  | "Running"
  | "Stopping"
  | "Stopped"
  | "Failed"
  | "Deleting"
  | "Deleted"
  | "Updating";

/** The response data for a requested list of items. */
export interface _AgentsPagedResultAgentContainerOperationObject {
  /** The requested list of items. */
  data: AgentContainerOperationObject[];
  /** The first ID represented in this list. */
  firstId?: string;
  /** The last ID represented in this list. */
  lastId?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

export function _agentsPagedResultAgentContainerOperationObjectDeserializer(
  item: any,
): _AgentsPagedResultAgentContainerOperationObject {
  return {
    data: agentContainerOperationObjectArrayDeserializer(item["data"]),
    firstId: item["first_id"],
    lastId: item["last_id"],
    hasMore: item["has_more"],
  };
}

export function agentContainerOperationObjectArrayDeserializer(
  result: Array<AgentContainerOperationObject>,
): any[] {
  return result.map((item) => {
    return agentContainerOperationObjectDeserializer(item);
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
  chatModel: string;
  /** The name or identifier of the embedding model deployment used for memory processing. */
  embeddingModel: string;
  /** Default memory store options. */
  options?: MemoryStoreDefaultOptions;
}

export function memoryStoreDefaultDefinitionSerializer(item: MemoryStoreDefaultDefinition): any {
  return {
    kind: item["kind"],
    chat_model: item["chatModel"],
    embedding_model: item["embeddingModel"],
    options: !item["options"]
      ? item["options"]
      : memoryStoreDefaultOptionsSerializer(item["options"]),
  };
}

export function memoryStoreDefaultDefinitionDeserializer(item: any): MemoryStoreDefaultDefinition {
  return {
    kind: item["kind"],
    chatModel: item["chat_model"],
    embeddingModel: item["embedding_model"],
    options: !item["options"]
      ? item["options"]
      : memoryStoreDefaultOptionsDeserializer(item["options"]),
  };
}

/** Default memory store configurations. */
export interface MemoryStoreDefaultOptions {
  /** Whether to enable user profile extraction and storage. Default is true. */
  userProfileEnabled: boolean;
  /** Specific categories or types of user profile information to extract and store. */
  userProfileDetails?: string;
  /** Whether to enable chat summary extraction and storage. Default is true. */
  chatSummaryEnabled: boolean;
}

export function memoryStoreDefaultOptionsSerializer(item: MemoryStoreDefaultOptions): any {
  return {
    user_profile_enabled: item["userProfileEnabled"],
    user_profile_details: item["userProfileDetails"],
    chat_summary_enabled: item["chatSummaryEnabled"],
  };
}

export function memoryStoreDefaultOptionsDeserializer(item: any): MemoryStoreDefaultOptions {
  return {
    userProfileEnabled: item["user_profile_enabled"],
    userProfileDetails: item["user_profile_details"],
    chatSummaryEnabled: item["chat_summary_enabled"],
  };
}

/** A memory store that can store and retrieve user memories. */
export interface MemoryStoreObject {
  /** The object type, which is always 'memory_store'. */
  object: "memory_store";
  /** The unique identifier of the memory store. */
  id: string;
  /** The Unix timestamp (seconds) when the memory store was created. */
  createdAt: Date;
  /** The Unix timestamp (seconds) when the memory store was last updated. */
  updatedAt: Date;
  /** The name of the memory store. */
  name: string;
  /** A human-readable description of the memory store. */
  description?: string;
  /** Arbitrary key-value metadata to associate with the memory store. */
  metadata?: Record<string, string>;
  /** The definition of the memory store. */
  definition: MemoryStoreDefinitionUnion;
}

export function memoryStoreObjectDeserializer(item: any): MemoryStoreObject {
  return {
    object: item["object"],
    id: item["id"],
    createdAt: new Date(item["created_at"] * 1000),
    updatedAt: new Date(item["updated_at"] * 1000),
    name: item["name"],
    description: item["description"],
    metadata: item["metadata"],
    definition: memoryStoreDefinitionUnionDeserializer(item["definition"]),
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultMemoryStoreObject {
  /** The requested list of items. */
  data: MemoryStoreObject[];
  /** The first ID represented in this list. */
  firstId?: string;
  /** The last ID represented in this list. */
  lastId?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

export function _agentsPagedResultMemoryStoreObjectDeserializer(
  item: any,
): _AgentsPagedResultMemoryStoreObject {
  return {
    data: memoryStoreObjectArrayDeserializer(item["data"]),
    firstId: item["first_id"],
    lastId: item["last_id"],
    hasMore: item["has_more"],
  };
}

export function memoryStoreObjectArrayDeserializer(result: Array<MemoryStoreObject>): any[] {
  return result.map((item) => {
    return memoryStoreObjectDeserializer(item);
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

/** Content item used to generate a response. */
export interface ItemParam {
  /** The type of the content item. */
  type: ItemType;
}

export function itemParamSerializer(item: ItemParam): any {
  return { type: item["type"] };
}

/** Alias for ItemParamUnion */
export type ItemParamUnion =
  | StructuredInputsItemParam
  | ResponsesMessageItemParamUnion
  | FunctionToolCallOutputItemParam
  | FileSearchToolCallItemParam
  | ComputerToolCallItemParam
  | ComputerToolCallOutputItemParam
  | WebSearchToolCallItemParam
  | FunctionToolCallItemParam
  | ReasoningItemParam
  | ItemReferenceItemParam
  | ImageGenToolCallItemParam
  | CodeInterpreterToolCallItemParam
  | LocalShellToolCallItemParam
  | LocalShellToolCallOutputItemParam
  | MCPListToolsItemParam
  | MCPApprovalRequestItemParam
  | MCPApprovalResponseItemParam
  | MCPCallItemParam
  | MemorySearchToolCallItemParam
  | ItemParam;

export function itemParamUnionSerializer(item: ItemParamUnion): any {
  switch (item.type) {
    case "structured_inputs":
      return structuredInputsItemParamSerializer(item as StructuredInputsItemParam);

    case "message":
      return responsesMessageItemParamUnionSerializer(item as ResponsesMessageItemParamUnion);

    case "function_call_output":
      return functionToolCallOutputItemParamSerializer(item as FunctionToolCallOutputItemParam);

    case "file_search_call":
      return fileSearchToolCallItemParamSerializer(item as FileSearchToolCallItemParam);

    case "computer_call":
      return computerToolCallItemParamSerializer(item as ComputerToolCallItemParam);

    case "computer_call_output":
      return computerToolCallOutputItemParamSerializer(item as ComputerToolCallOutputItemParam);

    case "web_search_call":
      return webSearchToolCallItemParamSerializer(item as WebSearchToolCallItemParam);

    case "function_call":
      return functionToolCallItemParamSerializer(item as FunctionToolCallItemParam);

    case "reasoning":
      return reasoningItemParamSerializer(item as ReasoningItemParam);

    case "item_reference":
      return itemReferenceItemParamSerializer(item as ItemReferenceItemParam);

    case "image_generation_call":
      return imageGenToolCallItemParamSerializer(item as ImageGenToolCallItemParam);

    case "code_interpreter_call":
      return codeInterpreterToolCallItemParamSerializer(item as CodeInterpreterToolCallItemParam);

    case "local_shell_call":
      return localShellToolCallItemParamSerializer(item as LocalShellToolCallItemParam);

    case "local_shell_call_output":
      return localShellToolCallOutputItemParamSerializer(item as LocalShellToolCallOutputItemParam);

    case "mcp_list_tools":
      return mcpListToolsItemParamSerializer(item as MCPListToolsItemParam);

    case "mcp_approval_request":
      return mcpApprovalRequestItemParamSerializer(item as MCPApprovalRequestItemParam);

    case "mcp_approval_response":
      return mcpApprovalResponseItemParamSerializer(item as MCPApprovalResponseItemParam);

    case "mcp_call":
      return mcpCallItemParamSerializer(item as MCPCallItemParam);

    case "memory_search_call":
      return memorySearchToolCallItemParamSerializer(item as MemorySearchToolCallItemParam);

    default:
      return itemParamSerializer(item);
  }
}

/** Type of ItemType */
export type ItemType =
  | "message"
  | "file_search_call"
  | "function_call"
  | "function_call_output"
  | "computer_call"
  | "computer_call_output"
  | "web_search_call"
  | "reasoning"
  | "item_reference"
  | "image_generation_call"
  | "code_interpreter_call"
  | "local_shell_call"
  | "local_shell_call_output"
  | "mcp_list_tools"
  | "mcp_approval_request"
  | "mcp_approval_response"
  | "mcp_call"
  | "structured_inputs"
  | "structured_outputs"
  | "semantic_event"
  | "workflow_action"
  | "memory_search_call"
  | "oauth_consent_request";

/** model interface StructuredInputsItemParam */
export interface StructuredInputsItemParam extends ItemParam {
  /** The type of the structured inputs item, which is always 'structured_inputs'. */
  type: "structured_inputs";
  /** The structured inputs to the response. */
  inputs?: Record<string, any>;
}

export function structuredInputsItemParamSerializer(item: StructuredInputsItemParam): any {
  return { type: item["type"], inputs: item["inputs"] };
}

/** A response message item, representing a role and content, as provided as client request parameters. */
export interface ResponsesMessageItemParam extends ItemParam {
  /** The type of the responses item, which is always 'message'. */
  type: "message";
  /** The role associated with the message. */
  /** The discriminator possible values: user, system, developer, assistant */
  role: ResponsesMessageRole;
}

export function responsesMessageItemParamSerializer(item: ResponsesMessageItemParam): any {
  return { type: item["type"], role: item["role"] };
}

/** Alias for ResponsesMessageItemParamUnion */
export type ResponsesMessageItemParamUnion =
  | ResponsesUserMessageItemParam
  | ResponsesSystemMessageItemParam
  | ResponsesDeveloperMessageItemParam
  | ResponsesAssistantMessageItemParam
  | ResponsesMessageItemParam;

export function responsesMessageItemParamUnionSerializer(
  item: ResponsesMessageItemParamUnion,
): any {
  switch (item.role) {
    case "user":
      return responsesUserMessageItemParamSerializer(item as ResponsesUserMessageItemParam);

    case "system":
      return responsesSystemMessageItemParamSerializer(item as ResponsesSystemMessageItemParam);

    case "developer":
      return responsesDeveloperMessageItemParamSerializer(
        item as ResponsesDeveloperMessageItemParam,
      );

    case "assistant":
      return responsesAssistantMessageItemParamSerializer(
        item as ResponsesAssistantMessageItemParam,
      );

    default:
      return responsesMessageItemParamSerializer(item);
  }
}

/** The collection of valid roles for responses message items. */
export type ResponsesMessageRole = "system" | "developer" | "user" | "assistant";

/** A message parameter item with the `user` role. */
export interface ResponsesUserMessageItemParam extends ResponsesMessageItemParam {
  /** The role of the message, which is always `user`. */
  role: "user";
  /** The content associated with the message. */
  content: string | ItemContentUnion[];
}

export function responsesUserMessageItemParamSerializer(item: ResponsesUserMessageItemParam): any {
  return {
    type: item["type"],
    role: item["role"],
    content: _responsesUserMessageItemParamContentSerializer(item["content"]),
  };
}

/** Alias for _ResponsesUserMessageItemParamContent */
export type _ResponsesUserMessageItemParamContent = string | ItemContentUnion[];

export function _responsesUserMessageItemParamContentSerializer(
  item: _ResponsesUserMessageItemParamContent,
): any {
  return item;
}

export function itemContentUnionArraySerializer(result: Array<ItemContentUnion>): any[] {
  return result.map((item) => {
    return itemContentUnionSerializer(item);
  });
}

/** model interface ItemContent */
export interface ItemContent {
  /** the type of the content item. */
  type: ItemContentType;
}

export function itemContentSerializer(item: ItemContent): any {
  return { type: item["type"] };
}

/** Alias for ItemContentUnion */
export type ItemContentUnion =
  | ItemContentInputAudio
  | ItemContentOutputAudio
  | ItemContentRefusal
  | ItemContentInputText
  | ItemContentInputImage
  | ItemContentInputFile
  | ItemContentOutputText
  | ItemContent;

export function itemContentUnionSerializer(item: ItemContentUnion): any {
  switch (item.type) {
    case "input_audio":
      return itemContentInputAudioSerializer(item as ItemContentInputAudio);

    case "output_audio":
      return itemContentOutputAudioSerializer(item as ItemContentOutputAudio);

    case "refusal":
      return itemContentRefusalSerializer(item as ItemContentRefusal);

    case "input_text":
      return itemContentInputTextSerializer(item as ItemContentInputText);

    case "input_image":
      return itemContentInputImageSerializer(item as ItemContentInputImage);

    case "input_file":
      return itemContentInputFileSerializer(item as ItemContentInputFile);

    case "output_text":
      return itemContentOutputTextSerializer(item as ItemContentOutputText);

    default:
      return itemContentSerializer(item);
  }
}

/** Multi-modal input and output contents. */
export type ItemContentType =
  | "input_text"
  | "input_audio"
  | "input_image"
  | "input_file"
  | "output_text"
  | "output_audio"
  | "refusal";

/** An audio input to the model. */
export interface ItemContentInputAudio extends ItemContent {
  /** The type of the input item. Always `input_audio`. */
  type: "input_audio";
  /** Base64-encoded audio data. */
  data: string;
  /**
   * The format of the audio data. Currently supported formats are `mp3` and
   * `wav`.
   */
  format: "mp3" | "wav";
}

export function itemContentInputAudioSerializer(item: ItemContentInputAudio): any {
  return { type: item["type"], data: item["data"], format: item["format"] };
}

/** An audio output from the model. */
export interface ItemContentOutputAudio extends ItemContent {
  /** The type of the output audio. Always `output_audio`. */
  type: "output_audio";
  /** Base64-encoded audio data from the model. */
  data: string;
  /** The transcript of the audio data from the model. */
  transcript: string;
}

export function itemContentOutputAudioSerializer(item: ItemContentOutputAudio): any {
  return {
    type: item["type"],
    data: item["data"],
    transcript: item["transcript"],
  };
}

/** A refusal from the model. */
export interface ItemContentRefusal extends ItemContent {
  /** The type of the refusal. Always `refusal`. */
  type: "refusal";
  /** The refusal explanationfrom the model. */
  refusal: string;
}

export function itemContentRefusalSerializer(item: ItemContentRefusal): any {
  return { type: item["type"], refusal: item["refusal"] };
}

/** A text input to the model. */
export interface ItemContentInputText extends ItemContent {
  /** The type of the input item. Always `input_text`. */
  type: "input_text";
  /** The text input to the model. */
  text: string;
}

export function itemContentInputTextSerializer(item: ItemContentInputText): any {
  return { type: item["type"], text: item["text"] };
}

/** An image input to the model. Learn about [image inputs](/docs/guides/vision). */
export interface ItemContentInputImage extends ItemContent {
  /** The type of the input item. Always `input_image`. */
  type: "input_image";
  /** The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL. */
  imageUrl?: string | null;
  /** The ID of the file to be sent to the model. */
  fileId?: string | null;
  /** The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`. */
  detail?: "low" | "high" | "auto";
}

export function itemContentInputImageSerializer(item: ItemContentInputImage): any {
  return {
    type: item["type"],
    image_url: item["imageUrl"],
    file_id: item["fileId"],
    detail: item["detail"],
  };
}

/** A file input to the model. */
export interface ItemContentInputFile extends ItemContent {
  /** The type of the input item. Always `input_file`. */
  type: "input_file";
  /** The ID of the file to be sent to the model. */
  fileId?: string | null;
  /** The name of the file to be sent to the model. */
  filename?: string;
  /** The content of the file to be sent to the model. */
  fileData?: string;
}

export function itemContentInputFileSerializer(item: ItemContentInputFile): any {
  return {
    type: item["type"],
    file_id: item["fileId"],
    filename: item["filename"],
    file_data: item["fileData"],
  };
}

/** A text output from the model. */
export interface ItemContentOutputText extends ItemContent {
  /** The type of the output text. Always `output_text`. */
  type: "output_text";
  /** The text output from the model. */
  text: string;
  /** The annotations of the text output. */
  annotations: AnnotationUnion[];
  /** The log probabilities of the text output tokens. */
  logprobs?: LogProb[];
}

export function itemContentOutputTextSerializer(item: ItemContentOutputText): any {
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

/** model interface Annotation */
export interface Annotation {
  /** The type of the annotation. */
  type: AnnotationType;
}

export function annotationSerializer(item: Annotation): any {
  return { type: item["type"] };
}

/** Alias for AnnotationUnion */
export type AnnotationUnion =
  | AnnotationFileCitation
  | AnnotationUrlCitation
  | AnnotationFilePath
  | Annotation;

export function annotationUnionSerializer(item: AnnotationUnion): any {
  switch (item.type) {
    case "file_citation":
      return annotationFileCitationSerializer(item as AnnotationFileCitation);

    case "url_citation":
      return annotationUrlCitationSerializer(item as AnnotationUrlCitation);

    case "file_path":
      return annotationFilePathSerializer(item as AnnotationFilePath);

    default:
      return annotationSerializer(item);
  }
}

/** Type of AnnotationType */
export type AnnotationType =
  | "file_citation"
  | "url_citation"
  | "file_path"
  | "container_file_citation";

/** A citation to a file. */
export interface AnnotationFileCitation extends Annotation {
  /** The type of the file citation. Always `file_citation`. */
  type: "file_citation";
  /** The ID of the file. */
  fileId: string;
  /** The index of the file in the list of files. */
  index: number;
  /** The filename of the file cited. */
  filename: string;
}

export function annotationFileCitationSerializer(item: AnnotationFileCitation): any {
  return {
    type: item["type"],
    file_id: item["fileId"],
    index: item["index"],
    filename: item["filename"],
  };
}

/** A citation for a web resource used to generate a model response. */
export interface AnnotationUrlCitation extends Annotation {
  /** The type of the URL citation. Always `url_citation`. */
  type: "url_citation";
  /** The URL of the web resource. */
  url: string;
  /** The index of the first character of the URL citation in the message. */
  startIndex: number;
  /** The index of the last character of the URL citation in the message. */
  endIndex: number;
  /** The title of the web resource. */
  title: string;
}

export function annotationUrlCitationSerializer(item: AnnotationUrlCitation): any {
  return {
    type: item["type"],
    url: item["url"],
    start_index: item["startIndex"],
    end_index: item["endIndex"],
    title: item["title"],
  };
}

/** A path to a file. */
export interface AnnotationFilePath extends Annotation {
  /** The type of the file path. Always `file_path`. */
  type: "file_path";
  /** The ID of the file. */
  fileId: string;
  /** The index of the file in the list of files. */
  index: number;
}

export function annotationFilePathSerializer(item: AnnotationFilePath): any {
  return { type: item["type"], file_id: item["fileId"], index: item["index"] };
}

export function logProbArraySerializer(result: Array<LogProb>): any[] {
  return result.map((item) => {
    return logProbSerializer(item);
  });
}

/** The log probability of a token. */
export interface LogProb {
  /** The token text. */
  token: string;
  /** The log probability of the token. */
  logprob: number;
  /** The bytes of the token. */
  bytes: number[];
  /** The top log probabilities for the token. */
  topLogprobs: TopLogProb[];
}

export function logProbSerializer(item: LogProb): any {
  return {
    token: item["token"],
    logprob: item["logprob"],
    bytes: item["bytes"].map((p: any) => {
      return p;
    }),
    top_logprobs: topLogProbArraySerializer(item["topLogprobs"]),
  };
}

export function topLogProbArraySerializer(result: Array<TopLogProb>): any[] {
  return result.map((item) => {
    return topLogProbSerializer(item);
  });
}

/** The top log probability of a token. */
export interface TopLogProb {
  /** The token text. */
  token: string;
  /** The log probability of the token. */
  logprob: number;
  /** The bytes of the token. */
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

/** A message parameter item with the `system` role. */
export interface ResponsesSystemMessageItemParam extends ResponsesMessageItemParam {
  /** The role of the message, which is always `system`. */
  role: "system";
  /** The content associated with the message. */
  content: string | ItemContentUnion[];
}

export function responsesSystemMessageItemParamSerializer(
  item: ResponsesSystemMessageItemParam,
): any {
  return {
    type: item["type"],
    role: item["role"],
    content: _responsesSystemMessageItemParamContentSerializer(item["content"]),
  };
}

/** Alias for _ResponsesSystemMessageItemParamContent */
export type _ResponsesSystemMessageItemParamContent = string | ItemContentUnion[];

export function _responsesSystemMessageItemParamContentSerializer(
  item: _ResponsesSystemMessageItemParamContent,
): any {
  return item;
}

/** A message parameter item with the `developer` role. */
export interface ResponsesDeveloperMessageItemParam extends ResponsesMessageItemParam {
  /** The role of the message, which is always `developer`. */
  role: "developer";
  /** The content associated with the message. */
  content: string | ItemContentUnion[];
}

export function responsesDeveloperMessageItemParamSerializer(
  item: ResponsesDeveloperMessageItemParam,
): any {
  return {
    type: item["type"],
    role: item["role"],
    content: _responsesDeveloperMessageItemParamContentSerializer(item["content"]),
  };
}

/** Alias for _ResponsesDeveloperMessageItemParamContent */
export type _ResponsesDeveloperMessageItemParamContent = string | ItemContentUnion[];

export function _responsesDeveloperMessageItemParamContentSerializer(
  item: _ResponsesDeveloperMessageItemParamContent,
): any {
  return item;
}

/** A message parameter item with the `assistant` role. */
export interface ResponsesAssistantMessageItemParam extends ResponsesMessageItemParam {
  /** The role of the message, which is always `assistant`. */
  role: "assistant";
  /** The content associated with the message. */
  content: string | ItemContentUnion[];
}

export function responsesAssistantMessageItemParamSerializer(
  item: ResponsesAssistantMessageItemParam,
): any {
  return {
    type: item["type"],
    role: item["role"],
    content: _responsesAssistantMessageItemParamContentSerializer(item["content"]),
  };
}

/** Alias for _ResponsesAssistantMessageItemParamContent */
export type _ResponsesAssistantMessageItemParamContent = string | ItemContentUnion[];

export function _responsesAssistantMessageItemParamContentSerializer(
  item: _ResponsesAssistantMessageItemParamContent,
): any {
  return item;
}

/**
 * The output of a function tool call.
 *
 */
export interface FunctionToolCallOutputItemParam extends ItemParam {
  /** The type of the tool call output. Always `function_call_output`. */
  type: "function_call_output";
  /** The unique ID of the function tool call generated by the model. */
  callId: string;
  /** A JSON string of the output of the function tool call. */
  output: string;
}

export function functionToolCallOutputItemParamSerializer(
  item: FunctionToolCallOutputItemParam,
): any {
  return {
    type: item["type"],
    call_id: item["callId"],
    output: item["output"],
  };
}

/**
 * The results of a file search tool call. See the
 * [file search guide](/docs/guides/tools-file-search) for more information.
 *
 */
export interface FileSearchToolCallItemParam extends ItemParam {
  /** The type of the tool call. Always `file_search_call`. */
  type: "file_search_call";
  /** The queries used to search for files. */
  queries: string[];
  /** The results of the file search tool call. */
  results?: Array<{
        fileId?: string;
        text?: string;
        filename?: string;
        attributes?: VectorStoreFileAttributes;
        score?: number;
      }>;
}

export function fileSearchToolCallItemParamSerializer(item: FileSearchToolCallItemParam): any {
  return {
    type: item["type"],
    queries: item["queries"].map((p: any) => {
      return p;
    }),
    results: !item["results"]
      ? item["results"]
      : _fileSearchToolCallItemParamResultArraySerializer(item["results"]),
  };
}

export function _fileSearchToolCallItemParamResultArraySerializer(
  result: Array<_FileSearchToolCallItemParamResult>,
): any[] {
  return result.map((item) => {
    return _fileSearchToolCallItemParamResultSerializer(item);
  });
}

/** model interface _FileSearchToolCallItemParamResult */
export interface _FileSearchToolCallItemParamResult {
  /** The unique ID of the file. */
  fileId?: string;
  /** The text that was retrieved from the file. */
  text?: string;
  /** The name of the file. */
  filename?: string;
  attributes?: VectorStoreFileAttributes;
  /** The relevance score of the file - a value between 0 and 1. */
  score?: number;
}

export function _fileSearchToolCallItemParamResultSerializer(
  item: _FileSearchToolCallItemParamResult,
): any {
  return {
    file_id: item["fileId"],
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
  additionalProperties?: Record<string, string | boolean | number>;
}

export function vectorStoreFileAttributesSerializer(item: VectorStoreFileAttributes): any {
  return {
    ...serializeRecord(
      item.additionalProperties,
      undefined,
      _vectorStoreFileAttributesAdditionalPropertySerializer,
    ),
  };
}

/** Alias for _VectorStoreFileAttributesAdditionalProperty */
export type _VectorStoreFileAttributesAdditionalProperty = string | boolean | number | number;

export function _vectorStoreFileAttributesAdditionalPropertySerializer(
  item: _VectorStoreFileAttributesAdditionalProperty,
): any {
  return item;
}

/**
 * A tool call to a computer use tool. See the
 * [computer use guide](/docs/guides/tools-computer-use) for more information.
 *
 */
export interface ComputerToolCallItemParam extends ItemParam {
  /** The type of the tool call. Always `computer_call`. */
  type: "computer_call";
  /** An identifier used when responding to the tool call with output. */
  callId: string;
  /** The action to be performed on the computer. */
  action: ComputerActionUnion;
  /** The pending safety checks for the computer call. */
  pendingSafetyChecks: ComputerToolCallSafetyCheck[];
}

export function computerToolCallItemParamSerializer(item: ComputerToolCallItemParam): any {
  return {
    type: item["type"],
    call_id: item["callId"],
    action: computerActionUnionSerializer(item["action"]),
    pending_safety_checks: computerToolCallSafetyCheckArraySerializer(item["pendingSafetyChecks"]),
  };
}

/** model interface ComputerAction */
export interface ComputerAction {
  /** The type of the computer action. */
  type: ComputerActionType;
}

export function computerActionSerializer(item: ComputerAction): any {
  return { type: item["type"] };
}

/** Alias for ComputerActionUnion */
export type ComputerActionUnion =
  | ComputerActionClick
  | ComputerActionDoubleClick
  | ComputerActionDrag
  | ComputerActionMove
  | ComputerActionScreenshot
  | ComputerActionScroll
  | ComputerActionTypeKeys
  | ComputerActionWait
  | ComputerActionKeyPress
  | ComputerAction;

export function computerActionUnionSerializer(item: ComputerActionUnion): any {
  switch (item.type) {
    case "click":
      return computerActionClickSerializer(item as ComputerActionClick);

    case "double_click":
      return computerActionDoubleClickSerializer(item as ComputerActionDoubleClick);

    case "drag":
      return computerActionDragSerializer(item as ComputerActionDrag);

    case "move":
      return computerActionMoveSerializer(item as ComputerActionMove);

    case "screenshot":
      return computerActionScreenshotSerializer(item as ComputerActionScreenshot);

    case "scroll":
      return computerActionScrollSerializer(item as ComputerActionScroll);

    case "type":
      return computerActionTypeKeysSerializer(item as ComputerActionTypeKeys);

    case "wait":
      return computerActionWaitSerializer(item as ComputerActionWait);

    case "keypress":
      return computerActionKeyPressSerializer(item as ComputerActionKeyPress);

    default:
      return computerActionSerializer(item);
  }
}

/** Type of ComputerActionType */
export type ComputerActionType =
  | "screenshot"
  | "click"
  | "double_click"
  | "scroll"
  | "type"
  | "wait"
  | "keypress"
  | "drag"
  | "move";

/** A click action. */
export interface ComputerActionClick extends ComputerAction {
  /**
   * Specifies the event type. For a click action, this property is
   * always set to `click`.
   */
  type: "click";
  /** Indicates which mouse button was pressed during the click. One of `left`, `right`, `wheel`, `back`, or `forward`. */
  button: "left" | "right" | "wheel" | "back" | "forward";
  /** The x-coordinate where the click occurred. */
  x: number;
  /** The y-coordinate where the click occurred. */
  y: number;
}

export function computerActionClickSerializer(item: ComputerActionClick): any {
  return {
    type: item["type"],
    button: item["button"],
    x: item["x"],
    y: item["y"],
  };
}

/** A double click action. */
export interface ComputerActionDoubleClick extends ComputerAction {
  /**
   * Specifies the event type. For a double click action, this property is
   * always set to `double_click`.
   */
  type: "double_click";
  /** The x-coordinate where the double click occurred. */
  x: number;
  /** The y-coordinate where the double click occurred. */
  y: number;
}

export function computerActionDoubleClickSerializer(item: ComputerActionDoubleClick): any {
  return { type: item["type"], x: item["x"], y: item["y"] };
}

/** A drag action. */
export interface ComputerActionDrag extends ComputerAction {
  /**
   * Specifies the event type. For a drag action, this property is
   * always set to `drag`.
   */
  type: "drag";
  /**
   * An array of coordinates representing the path of the drag action. Coordinates will appear as an array
   * of objects, eg
   * ```
   * [
   *   { x: 100, y: 200 },
   *   { x: 200, y: 300 }
   * ]
   * ```
   */
  path: Coordinate[];
}

export function computerActionDragSerializer(item: ComputerActionDrag): any {
  return { type: item["type"], path: coordinateArraySerializer(item["path"]) };
}

export function coordinateArraySerializer(result: Array<Coordinate>): any[] {
  return result.map((item) => {
    return coordinateSerializer(item);
  });
}

/** An x/y coordinate pair, e.g. `{ x: 100, y: 200 }`. */
export interface Coordinate {
  /** The x-coordinate. */
  x: number;
  /** The y-coordinate. */
  y: number;
}

export function coordinateSerializer(item: Coordinate): any {
  return { x: item["x"], y: item["y"] };
}

/** A mouse move action. */
export interface ComputerActionMove extends ComputerAction {
  /**
   * Specifies the event type. For a move action, this property is
   * always set to `move`.
   */
  type: "move";
  /** The x-coordinate to move to. */
  x: number;
  /** The y-coordinate to move to. */
  y: number;
}

export function computerActionMoveSerializer(item: ComputerActionMove): any {
  return { type: item["type"], x: item["x"], y: item["y"] };
}

/** A screenshot action. */
export interface ComputerActionScreenshot extends ComputerAction {
  /**
   * Specifies the event type. For a screenshot action, this property is
   * always set to `screenshot`.
   */
  type: "screenshot";
}

export function computerActionScreenshotSerializer(item: ComputerActionScreenshot): any {
  return { type: item["type"] };
}

/** A scroll action. */
export interface ComputerActionScroll extends ComputerAction {
  /**
   * Specifies the event type. For a scroll action, this property is
   * always set to `scroll`.
   */
  type: "scroll";
  /** The x-coordinate where the scroll occurred. */
  x: number;
  /** The y-coordinate where the scroll occurred. */
  y: number;
  /** The horizontal scroll distance. */
  scrollX: number;
  /** The vertical scroll distance. */
  scrollY: number;
}

export function computerActionScrollSerializer(item: ComputerActionScroll): any {
  return {
    type: item["type"],
    x: item["x"],
    y: item["y"],
    scroll_x: item["scrollX"],
    scroll_y: item["scrollY"],
  };
}

/** An action to type in text. */
export interface ComputerActionTypeKeys extends ComputerAction {
  /**
   * Specifies the event type. For a type action, this property is
   * always set to `type`.
   */
  type: "type";
  /** The text to type. */
  text: string;
}

export function computerActionTypeKeysSerializer(item: ComputerActionTypeKeys): any {
  return { type: item["type"], text: item["text"] };
}

/** A wait action. */
export interface ComputerActionWait extends ComputerAction {
  /**
   * Specifies the event type. For a wait action, this property is
   * always set to `wait`.
   */
  type: "wait";
}

export function computerActionWaitSerializer(item: ComputerActionWait): any {
  return { type: item["type"] };
}

/** A collection of keypresses the model would like to perform. */
export interface ComputerActionKeyPress extends ComputerAction {
  /**
   * Specifies the event type. For a keypress action, this property is
   * always set to `keypress`.
   */
  type: "keypress";
  /**
   * The combination of keys the model is requesting to be pressed. This is an
   * array of strings, each representing a key.
   */
  keys: string[];
}

export function computerActionKeyPressSerializer(item: ComputerActionKeyPress): any {
  return {
    type: item["type"],
    keys: item["keys"].map((p: any) => {
      return p;
    }),
  };
}

export function computerToolCallSafetyCheckArraySerializer(
  result: Array<ComputerToolCallSafetyCheck>,
): any[] {
  return result.map((item) => {
    return computerToolCallSafetyCheckSerializer(item);
  });
}

/** A pending safety check for the computer call. */
export interface ComputerToolCallSafetyCheck {
  /** The ID of the pending safety check. */
  id: string;
  /** The type of the pending safety check. */
  code: string;
  /** Details about the pending safety check. */
  message: string;
}

export function computerToolCallSafetyCheckSerializer(item: ComputerToolCallSafetyCheck): any {
  return { id: item["id"], code: item["code"], message: item["message"] };
}

/**
 * The output of a computer tool call.
 *
 */
export interface ComputerToolCallOutputItemParam extends ItemParam {
  /**
   * The type of the output. Always `computer_call_output`.
   */
  type: "computer_call_output";
  /** The ID of the computer tool call that produced the output. */
  callId: string;
  /**
   * The safety checks reported by the API that have been acknowledged by the
   * developer.
   */
  acknowledgedSafetyChecks?: ComputerToolCallSafetyCheck[];
  /** The output produced by the computer tool call. */
  output: ComputerToolCallOutputItemOutputUnion;
}

export function computerToolCallOutputItemParamSerializer(
  item: ComputerToolCallOutputItemParam,
): any {
  return {
    type: item["type"],
    call_id: item["callId"],
    acknowledged_safety_checks: !item["acknowledgedSafetyChecks"]
      ? item["acknowledgedSafetyChecks"]
      : computerToolCallSafetyCheckArraySerializer(item["acknowledgedSafetyChecks"]),
    output: computerToolCallOutputItemOutputUnionSerializer(item["output"]),
  };
}

/** model interface ComputerToolCallOutputItemOutput */
export interface ComputerToolCallOutputItemOutput {
  /** The type of the output. */
  type: ComputerToolCallOutputItemOutputType;
}

export function computerToolCallOutputItemOutputSerializer(
  item: ComputerToolCallOutputItemOutput,
): any {
  return { type: item["type"] };
}

/** Alias for ComputerToolCallOutputItemOutputUnion */
export type ComputerToolCallOutputItemOutputUnion =
  | ComputerToolCallOutputItemOutputComputerScreenshot
  | ComputerToolCallOutputItemOutput;

export function computerToolCallOutputItemOutputUnionSerializer(
  item: ComputerToolCallOutputItemOutputUnion,
): any {
  switch (item.type) {
    case "computer_screenshot":
      return computerToolCallOutputItemOutputComputerScreenshotSerializer(
        item as ComputerToolCallOutputItemOutputComputerScreenshot,
      );

    default:
      return computerToolCallOutputItemOutputSerializer(item);
  }
}

/** A computer screenshot image used with the computer use tool. */
export type ComputerToolCallOutputItemOutputType = "computer_screenshot";

/** model interface ComputerToolCallOutputItemOutputComputerScreenshot */
export interface ComputerToolCallOutputItemOutputComputerScreenshot
  extends ComputerToolCallOutputItemOutput {
  /** The type of the output. Always `computer_screenshot`. */
  type: "computer_screenshot";
  /** The URL of the screenshot image. */
  imageUrl?: string;
  /** The ID of the screenshot file. */
  fileId?: string;
}

export function computerToolCallOutputItemOutputComputerScreenshotSerializer(
  item: ComputerToolCallOutputItemOutputComputerScreenshot,
): any {
  return {
    type: item["type"],
    image_url: item["imageUrl"],
    file_id: item["fileId"],
  };
}

/**
 * The results of a web search tool call. See the
 * [web search guide](/docs/guides/tools-web-search) for more information.
 *
 */
export interface WebSearchToolCallItemParam extends ItemParam {
  /** The type of the tool call. Always `web_search_call`. */
  type: "web_search_call";
  /**
   * An object describing the specific action taken in this web search call.
   * Includes details on how the model used the web (search, open_page, find).
   */
  action: WebSearchActionUnion;
}

export function webSearchToolCallItemParamSerializer(item: WebSearchToolCallItemParam): any {
  return {
    type: item["type"],
    action: webSearchActionUnionSerializer(item["action"]),
  };
}

/** model interface WebSearchAction */
export interface WebSearchAction {
  /** The action type. */
  type: WebSearchActionType;
}

export function webSearchActionSerializer(item: WebSearchAction): any {
  return { type: item["type"] };
}

/** Alias for WebSearchActionUnion */
export type WebSearchActionUnion =
  | WebSearchActionFind
  | WebSearchActionOpenPage
  | WebSearchActionSearch
  | WebSearchAction;

export function webSearchActionUnionSerializer(item: WebSearchActionUnion): any {
  switch (item.type) {
    case "find":
      return webSearchActionFindSerializer(item as WebSearchActionFind);

    case "open_page":
      return webSearchActionOpenPageSerializer(item as WebSearchActionOpenPage);

    case "search":
      return webSearchActionSearchSerializer(item as WebSearchActionSearch);

    default:
      return webSearchActionSerializer(item);
  }
}

/** Type of WebSearchActionType */
export type WebSearchActionType = "search" | "open_page" | "find";

/** Action type "find": Searches for a pattern within a loaded page. */
export interface WebSearchActionFind extends WebSearchAction {
  /** The action type. */
  type: "find";
  /** The URL of the page searched for the pattern. */
  url: string;
  /** The pattern or text to search for within the page. */
  pattern: string;
}

export function webSearchActionFindSerializer(item: WebSearchActionFind): any {
  return { type: item["type"], url: item["url"], pattern: item["pattern"] };
}

/** Action type "open_page" - Opens a specific URL from search results. */
export interface WebSearchActionOpenPage extends WebSearchAction {
  /** The action type. */
  type: "open_page";
  /** The URL opened by the model. */
  url: string;
}

export function webSearchActionOpenPageSerializer(item: WebSearchActionOpenPage): any {
  return { type: item["type"], url: item["url"] };
}

/** Action type "search" - Performs a web search query. */
export interface WebSearchActionSearch extends WebSearchAction {
  /** The action type. */
  type: "search";
  /** The search query. */
  query: string;
}

export function webSearchActionSearchSerializer(item: WebSearchActionSearch): any {
  return { type: item["type"], query: item["query"] };
}

/**
 * A tool call to run a function. See the
 * [function calling guide](/docs/guides/function-calling) for more information.
 *
 */
export interface FunctionToolCallItemParam extends ItemParam {
  /** The type of the tool call. Always `function_call`. */
  type: "function_call";
  /** The unique ID of the function tool call generated by the model. */
  callId: string;
  /** The name of the function to run. */
  name: string;
  /** A JSON string of the arguments to pass to the function. */
  arguments: string;
}

export function functionToolCallItemParamSerializer(item: FunctionToolCallItemParam): any {
  return {
    type: item["type"],
    call_id: item["callId"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

/**
 * A description of the chain of thought used by a reasoning model while generating
 * a response. Be sure to include these items in your `input` to the Responses API
 * for subsequent turns of a conversation if you are manually
 * [managing context](/docs/guides/conversation-state).
 *
 */
export interface ReasoningItemParam extends ItemParam {
  /** The type of the reasoning item. Always `reasoning`. */
  type: "reasoning";
  /**
   * The encrypted content of the reasoning item - populated when a response is
   * generated with `reasoning.encrypted_content` in the `include` parameter.
   */
  encryptedContent?: string | null;
  /** Reasoning text contents. */
  summary: ReasoningItemSummaryPartUnion[];
}

export function reasoningItemParamSerializer(item: ReasoningItemParam): any {
  return {
    type: item["type"],
    encrypted_content: item["encryptedContent"],
    summary: reasoningItemSummaryPartUnionArraySerializer(item["summary"]),
  };
}

export function reasoningItemSummaryPartUnionArraySerializer(
  result: Array<ReasoningItemSummaryPartUnion>,
): any[] {
  return result.map((item) => {
    return reasoningItemSummaryPartUnionSerializer(item);
  });
}

/** model interface ReasoningItemSummaryPart */
export interface ReasoningItemSummaryPart {
  /** The type of the reasoning item summary part. */
  type: ReasoningItemSummaryPartType;
}

export function reasoningItemSummaryPartSerializer(item: ReasoningItemSummaryPart): any {
  return { type: item["type"] };
}

/** Alias for ReasoningItemSummaryPartUnion */
export type ReasoningItemSummaryPartUnion = ReasoningItemSummaryTextPart | ReasoningItemSummaryPart;

export function reasoningItemSummaryPartUnionSerializer(item: ReasoningItemSummaryPartUnion): any {
  switch (item.type) {
    case "summary_text":
      return reasoningItemSummaryTextPartSerializer(item as ReasoningItemSummaryTextPart);

    default:
      return reasoningItemSummaryPartSerializer(item);
  }
}

/** Type of ReasoningItemSummaryPartType */
export type ReasoningItemSummaryPartType = "summary_text";

/** model interface ReasoningItemSummaryTextPart */
export interface ReasoningItemSummaryTextPart extends ReasoningItemSummaryPart {
  /** The type of the reasoning item summary part. Always `summary_text`. */
  type: "summary_text";
  /** The text content of the reasoning item summary part. */
  text: string;
}

export function reasoningItemSummaryTextPartSerializer(item: ReasoningItemSummaryTextPart): any {
  return { type: item["type"], text: item["text"] };
}

/** An internal identifier for an item to reference. */
export interface ItemReferenceItemParam extends ItemParam {
  /** The type of the item reference. Always `item_reference`. */
  type: "item_reference";
  /** The service-originated ID of the previously generated response item being referenced. */
  id: string;
}

export function itemReferenceItemParamSerializer(item: ItemReferenceItemParam): any {
  return { type: item["type"], id: item["id"] };
}

/**
 * An image generation request made by the model.
 *
 */
export interface ImageGenToolCallItemParam extends ItemParam {
  /** The type of the tool call. Always `image_generation_call`. */
  type: "image_generation_call";
  /** The generated image encoded in base64. */
  result: string | null;
}

export function imageGenToolCallItemParamSerializer(item: ImageGenToolCallItemParam): any {
  return { type: item["type"], result: item["result"] };
}

/**
 * A tool call to run code.
 *
 */
export interface CodeInterpreterToolCallItemParam extends ItemParam {
  /** The type of the tool call. Always `code_interpreter_call`. */
  type: "code_interpreter_call";
  /** The ID of the container used to run the code. */
  containerId: string;
  /** The code to run, or null if not available. */
  code: string | null;
  /**
   * The outputs generated by the code interpreter, such as logs or images.
   * Can be null if no outputs are available.
   */
  outputs: CodeInterpreterOutputUnion[] | null;
}

export function codeInterpreterToolCallItemParamSerializer(
  item: CodeInterpreterToolCallItemParam,
): any {
  return {
    type: item["type"],
    container_id: item["containerId"],
    code: item["code"],
    outputs: !item["outputs"]
      ? item["outputs"]
      : codeInterpreterOutputUnionArraySerializer(item["outputs"]),
  };
}

export function codeInterpreterOutputUnionArraySerializer(
  result: Array<CodeInterpreterOutputUnion>,
): any[] {
  return result.map((item) => {
    return codeInterpreterOutputUnionSerializer(item);
  });
}

/** model interface CodeInterpreterOutput */
export interface CodeInterpreterOutput {
  /** The type of the output. */
  type: CodeInterpreterOutputType;
}

export function codeInterpreterOutputSerializer(item: CodeInterpreterOutput): any {
  return { type: item["type"] };
}

/** Alias for CodeInterpreterOutputUnion */
export type CodeInterpreterOutputUnion =
  | CodeInterpreterOutputImage
  | CodeInterpreterOutputLogs
  | CodeInterpreterOutput;

export function codeInterpreterOutputUnionSerializer(item: CodeInterpreterOutputUnion): any {
  switch (item.type) {
    case "image":
      return codeInterpreterOutputImageSerializer(item as CodeInterpreterOutputImage);

    case "logs":
      return codeInterpreterOutputLogsSerializer(item as CodeInterpreterOutputLogs);

    default:
      return codeInterpreterOutputSerializer(item);
  }
}

/** Type of CodeInterpreterOutputType */
export type CodeInterpreterOutputType = "logs" | "image";

/** The image output from the code interpreter. */
export interface CodeInterpreterOutputImage extends CodeInterpreterOutput {
  /** The type of the output. Always 'image'. */
  type: "image";
  /** The URL of the image output from the code interpreter. */
  url: string;
}

export function codeInterpreterOutputImageSerializer(item: CodeInterpreterOutputImage): any {
  return { type: item["type"], url: item["url"] };
}

/** The logs output from the code interpreter. */
export interface CodeInterpreterOutputLogs extends CodeInterpreterOutput {
  /** The type of the output. Always 'logs'. */
  type: "logs";
  /** The logs output from the code interpreter. */
  logs: string;
}

export function codeInterpreterOutputLogsSerializer(item: CodeInterpreterOutputLogs): any {
  return { type: item["type"], logs: item["logs"] };
}

/**
 * A tool call to run a command on the local shell.
 *
 */
export interface LocalShellToolCallItemParam extends ItemParam {
  /** The type of the tool call. Always `local_shell_call`. */
  type: "local_shell_call";
  /** The unique ID of the local shell tool call generated by the model. */
  callId: string;
  /** The action to be performed on the local shell. */
  action: LocalShellExecAction;
}

export function localShellToolCallItemParamSerializer(item: LocalShellToolCallItemParam): any {
  return {
    type: item["type"],
    call_id: item["callId"],
    action: localShellExecActionSerializer(item["action"]),
  };
}

/** Execute a shell command on the server. */
export interface LocalShellExecAction {
  /** The type of the local shell action. Always `exec`. */
  type: "exec";
  /** The command to run. */
  command: string[];
  /** Optional timeout in milliseconds for the command. */
  timeoutMs?: number | null;
  /** Optional working directory to run the command in. */
  workingDirectory?: string | null;
  /** Environment variables to set for the command. */
  env: Record<string, string>;
  /** Optional user to run the command as. */
  user?: string | null;
}

export function localShellExecActionSerializer(item: LocalShellExecAction): any {
  return {
    type: item["type"],
    command: item["command"].map((p: any) => {
      return p;
    }),
    timeout_ms: item["timeoutMs"],
    working_directory: item["workingDirectory"],
    env: item["env"],
    user: item["user"],
  };
}

/**
 * The output of a local shell tool call.
 *
 */
export interface LocalShellToolCallOutputItemParam extends ItemParam {
  /** The type of the tool call output. Always `local_shell_call_output`. */
  type: "local_shell_call_output";
  /** A JSON string of the output of the local shell tool call. */
  output: string;
}

export function localShellToolCallOutputItemParamSerializer(
  item: LocalShellToolCallOutputItemParam,
): any {
  return { type: item["type"], output: item["output"] };
}

/**
 * A list of tools available on an MCP server.
 *
 */
export interface MCPListToolsItemParam extends ItemParam {
  /** The type of the item. Always `mcp_list_tools`. */
  type: "mcp_list_tools";
  /** The label of the MCP server. */
  serverLabel: string;
  /** The tools available on the server. */
  tools: MCPListToolsTool[];
  /** Error message if the server could not list tools. */
  error?: string | null;
}

export function mcpListToolsItemParamSerializer(item: MCPListToolsItemParam): any {
  return {
    type: item["type"],
    server_label: item["serverLabel"],
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
  /** The description of the tool. */
  description?: string | null;
  /** The JSON schema describing the tool's input. */
  inputSchema: any;
  /** Additional annotations about the tool. */
  annotations?: any | null;
}

export function mcpListToolsToolSerializer(item: MCPListToolsTool): any {
  return {
    name: item["name"],
    description: item["description"],
    input_schema: item["inputSchema"],
    annotations: item["annotations"],
  };
}

/**
 * A request for human approval of a tool invocation.
 *
 */
export interface MCPApprovalRequestItemParam extends ItemParam {
  /** The type of the item. Always `mcp_approval_request`. */
  type: "mcp_approval_request";
  /** The label of the MCP server making the request. */
  serverLabel: string;
  /** The name of the tool to run. */
  name: string;
  /** A JSON string of arguments for the tool. */
  arguments: string;
}

export function mcpApprovalRequestItemParamSerializer(item: MCPApprovalRequestItemParam): any {
  return {
    type: item["type"],
    server_label: item["serverLabel"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

/**
 * A response to an MCP approval request.
 *
 */
export interface MCPApprovalResponseItemParam extends ItemParam {
  /** The type of the item. Always `mcp_approval_response`. */
  type: "mcp_approval_response";
  /** The ID of the approval request being answered. */
  approvalRequestId: string;
  /** Whether the request was approved. */
  approve: boolean;
  /** Optional reason for the decision. */
  reason?: string | null;
}

export function mcpApprovalResponseItemParamSerializer(item: MCPApprovalResponseItemParam): any {
  return {
    type: item["type"],
    approval_request_id: item["approvalRequestId"],
    approve: item["approve"],
    reason: item["reason"],
  };
}

/**
 * An invocation of a tool on an MCP server.
 *
 */
export interface MCPCallItemParam extends ItemParam {
  /** The type of the item. Always `mcp_call`. */
  type: "mcp_call";
  /** The label of the MCP server running the tool. */
  serverLabel: string;
  /** The name of the tool that was run. */
  name: string;
  /** A JSON string of the arguments passed to the tool. */
  arguments: string;
  /** The output from the tool call. */
  output?: string | null;
  /** The error from the tool call, if any. */
  error?: string | null;
}

export function mcpCallItemParamSerializer(item: MCPCallItemParam): any {
  return {
    type: item["type"],
    server_label: item["serverLabel"],
    name: item["name"],
    arguments: item["arguments"],
    output: item["output"],
    error: item["error"],
  };
}

/** model interface MemorySearchToolCallItemParam */
export interface MemorySearchToolCallItemParam extends ItemParam {
  /** The type of the item. Always `memory_search_call`. */
  type: "memory_search_call";
  /** The results returned from the memory search. */
  results?: MemorySearchItem[] | null;
}

export function memorySearchToolCallItemParamSerializer(item: MemorySearchToolCallItemParam): any {
  return {
    type: item["type"],
    results: !item["results"] ? item["results"] : memorySearchItemArraySerializer(item["results"]),
  };
}

export function memorySearchItemArraySerializer(result: Array<MemorySearchItem>): any[] {
  return result.map((item) => {
    return memorySearchItemSerializer(item);
  });
}

export function memorySearchItemArrayDeserializer(result: Array<MemorySearchItem>): any[] {
  return result.map((item) => {
    return memorySearchItemDeserializer(item);
  });
}

/** A retrieved memory item from memory search. */
export interface MemorySearchItem {
  /** Retrieved memory item. */
  memoryItem: MemoryItemUnion;
}

export function memorySearchItemSerializer(item: MemorySearchItem): any {
  return { memory_item: memoryItemUnionSerializer(item["memoryItem"]) };
}

export function memorySearchItemDeserializer(item: any): MemorySearchItem {
  return {
    memoryItem: memoryItemUnionDeserializer(item["memory_item"]),
  };
}

/** A single memory item stored in the memory store, containing content and metadata. */
export interface MemoryItem {
  /** The unique ID of the memory item. */
  memoryId: string;
  /** The last update time of the memory item. */
  updatedAt: Date;
  /** The namespace that logically groups and isolates memories, such as a user ID. */
  scope: string;
  /** The content of the memory. */
  content: string;
  /** The kind of the memory item. */
  /** The discriminator possible values: user_profile */
  kind: MemoryItemKind;
}

export function memoryItemSerializer(item: MemoryItem): any {
  return {
    memory_id: item["memoryId"],
    updated_at: (item["updatedAt"].getTime() / 1000) | 0,
    scope: item["scope"],
    content: item["content"],
    kind: item["kind"],
  };
}

export function memoryItemDeserializer(item: any): MemoryItem {
  return {
    memoryId: item["memory_id"],
    updatedAt: new Date(item["updated_at"] * 1000),
    scope: item["scope"],
    content: item["content"],
    kind: item["kind"],
  };
}

/** Alias for MemoryItemUnion */
export type MemoryItemUnion = UserProfileMemoryItem | MemoryItem;

export function memoryItemUnionSerializer(item: MemoryItemUnion): any {
  switch (item.kind) {
    case "user_profile":
      return userProfileMemoryItemSerializer(item as UserProfileMemoryItem);

    default:
      return memoryItemSerializer(item);
  }
}

export function memoryItemUnionDeserializer(item: any): MemoryItemUnion {
  switch (item.kind) {
    case "user_profile":
      return userProfileMemoryItemDeserializer(item as UserProfileMemoryItem);

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

export function userProfileMemoryItemSerializer(item: UserProfileMemoryItem): any {
  return {
    memory_id: item["memoryId"],
    updated_at: (item["updatedAt"].getTime() / 1000) | 0,
    scope: item["scope"],
    content: item["content"],
    kind: item["kind"],
  };
}

export function userProfileMemoryItemDeserializer(item: any): UserProfileMemoryItem {
  return {
    memoryId: item["memory_id"],
    updatedAt: new Date(item["updated_at"] * 1000),
    scope: item["scope"],
    content: item["content"],
    kind: item["kind"],
  };
}

export function itemParamUnionArraySerializer(result: Array<ItemParamUnion>): any[] {
  return result.map((item) => {
    return itemParamUnionSerializer(item);
  });
}

/** Memory search response. */
export interface MemoryStoreSearchResponse {
  /** The unique ID of this search request. Use this value as previous_search_id in subsequent requests to perform incremental searches. */
  searchId: string;
  /** Related memory items found during the search operation. */
  memories: MemorySearchItem[];
  /** Usage statistics associated with the memory search operation. */
  usage: MemoryStoreOperationUsage;
}

export function memoryStoreSearchResponseDeserializer(item: any): MemoryStoreSearchResponse {
  return {
    searchId: item["search_id"],
    memories: memorySearchItemArrayDeserializer(item["memories"]),
    usage: memoryStoreOperationUsageDeserializer(item["usage"]),
  };
}

/** Usage statistics of a memory store operation. */
export interface MemoryStoreOperationUsage {
  /** The number of embedding tokens. */
  embeddingTokens: number;
  /** The number of input tokens. */
  inputTokens: number;
  /** A detailed breakdown of the input tokens. */
  inputTokensDetails: {
    cachedTokens: number;
  };
  /** The number of output tokens. */
  outputTokens: number;
  /** A detailed breakdown of the output tokens. */
  outputTokensDetails: {
    reasoningTokens: number;
  };
  /** The total number of tokens used. */
  totalTokens: number;
}

export function memoryStoreOperationUsageDeserializer(item: any): MemoryStoreOperationUsage {
  return {
    embeddingTokens: item["embedding_tokens"],
    inputTokens: item["input_tokens"],
    inputTokensDetails: _memoryStoreOperationUsageInputTokensDetailsDeserializer(
      item["input_tokens_details"],
    ),
    outputTokens: item["output_tokens"],
    outputTokensDetails: _memoryStoreOperationUsageOutputTokensDetailsDeserializer(
      item["output_tokens_details"],
    ),
    totalTokens: item["total_tokens"],
  };
}

/** model interface _MemoryStoreOperationUsageInputTokensDetails */
export interface _MemoryStoreOperationUsageInputTokensDetails {
  /**
   * The number of tokens that were retrieved from the cache.
   * [More on prompt caching](/docs/guides/prompt-caching).
   */
  cachedTokens: number;
}

export function _memoryStoreOperationUsageInputTokensDetailsDeserializer(
  item: any,
): _MemoryStoreOperationUsageInputTokensDetails {
  return {
    cachedTokens: item["cached_tokens"],
  };
}

/** model interface _MemoryStoreOperationUsageOutputTokensDetails */
export interface _MemoryStoreOperationUsageOutputTokensDetails {
  /** The number of reasoning tokens. */
  reasoningTokens: number;
}

export function _memoryStoreOperationUsageOutputTokensDetailsDeserializer(
  item: any,
): _MemoryStoreOperationUsageOutputTokensDetails {
  return {
    reasoningTokens: item["reasoning_tokens"],
  };
}

/** Provides the status of a memory store update operation. */
export interface MemoryStoreUpdateResponse {
  /** The unique ID of this update request. Use this value as previous_update_id in subsequent requests to perform incremental updates. */
  updateId: string;
  /** The status of the memory update operation. One of "queued", "in_progress", "completed", "failed", or "superseded". */
  status: MemoryStoreUpdateStatus;
  /** The update_id the operation was superseded by when status is "superseded". */
  supersededBy?: string;
  /** The result of memory store update operation when status is "completed". */
  result?: MemoryStoreUpdateResult;
  /** Error object that describes the error when status is "failed". */
  error?: ApiError;
}

export function memoryStoreUpdateResponseDeserializer(item: any): MemoryStoreUpdateResponse {
  return {
    updateId: item["update_id"],
    status: item["status"],
    supersededBy: item["superseded_by"],
    result: !item["result"] ? item["result"] : memoryStoreUpdateResultDeserializer(item["result"]),
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
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
export interface MemoryStoreUpdateResult {
  /** A list of individual memory operations that were performed during the update. */
  memoryOperations: MemoryOperation[];
  /** Usage statistics associated with the memory update operation. */
  usage: MemoryStoreOperationUsage;
}

export function memoryStoreUpdateResultDeserializer(item: any): MemoryStoreUpdateResult {
  return {
    memoryOperations: memoryOperationArrayDeserializer(item["memory_operations"]),
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
  memoryItem: MemoryItemUnion;
}

export function memoryOperationDeserializer(item: any): MemoryOperation {
  return {
    kind: item["kind"],
    memoryItem: memoryItemUnionDeserializer(item["memory_item"]),
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
  | "CustomKeys";

/** A base class for connection credentials */
export interface BaseCredentials {
  /** The type of credential used by the connection */
  /** The discriminator possible values: ApiKey, AAD, CustomKeys, SAS, None */
  readonly type: CredentialType;
}
export function connectionDeserializer(item: any): Connection {
  return {
    name: item["name"],
    id: item["id"],
    type: item["type"],
    target: item["target"],
    metadata: item["metadata"],
    isDefault: item["isDefault"],
    credentials: item["credentials"]
      ? baseCredentialsUnionDeserializer(item["credentials"])
      : { type: "None" },
  };
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
  | SASCredentials
  | NoAuthenticationCredentials
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
      return sasCredentialsDeserializer(item as SASCredentials);

    case "None":
      return noAuthenticationCredentialsDeserializer(item as NoAuthenticationCredentials);

    default:
      return baseCredentialsDeserializer(item);
  }
}

/** The credential type used by the connection */
export type CredentialType = "ApiKey" | "AAD" | "SAS" | "CustomKeys" | "None";

/** API Key Credential definition */
export interface ApiKeyCredentials extends BaseCredentials {
  /** The credential type */
  readonly type: "ApiKey";
  /** API Key */
  readonly apiKey: string;
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
    type: item["type"],
    additionalProperties: serializeRecord(item, ["type"]),
  };
}

/** Shared Access Signature (SAS) credential definition */
export interface SASCredentials extends BaseCredentials {
  /** The credential type */
  readonly type: "SAS";
  /** SAS token */
  readonly sasToken: string;
}

export function sasCredentialsDeserializer(item: any): SASCredentials {
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
  /** URI of the data. Example: https://go.microsoft.com/fwlink/?linkid=2202330 */
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
    tags: item["tags"],
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
    tags: item["tags"],
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
    tags: item["tags"],
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
  /** Blob URI path for client to upload data. Example: https://blob.windows.core.net/Container/Path */
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
  return {
    type: item["type"],
    description: item["description"],
    tags: item["tags"],
  };
}

export function indexDeserializer(item: any): Index {
  return {
    type: item["type"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    tags: item["tags"],
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
    tags: item["tags"],
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
    tags: item["tags"],
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
    tags: item["tags"],
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
    capabilities: item["capabilities"],
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
  | "ansii_attack"
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
  | "baseline";
/** Risk category for the attack objective. */
export type RiskCategory = "HateUnfairness" | "Violence" | "Sexual" | "SelfHarm";

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
  /** Type of the model configuration. */
  type: "AzureOpenAIModel";
  /** Deployment name for AOAI model. Example: gpt-4o if in AIServices or connection based `connection_name/deployment_name` (e.g. `my-aoai-connection/gpt-4o`). */
  modelDeploymentName: string;
}

export function azureOpenAIModelConfigurationSerializer(item: AzureOpenAIModelConfiguration): any {
  return {
    type: item["type"],
    modelDeploymentName: item["modelDeploymentName"],
  };
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
    systemData: item["systemData"],
  };
}

/** Evaluation action model. */
export interface EvaluationRuleAction {
  /** Type of the evaluation action. */
  /** The discriminator possible values: continuousEvaluation, humanEvaluation */
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
  | HumanEvaluationRuleAction
  | EvaluationRuleAction;

export function evaluationRuleActionUnionSerializer(item: EvaluationRuleActionUnion): any {
  switch (item.type) {
    case "continuousEvaluation":
      return continuousEvaluationRuleActionSerializer(item as ContinuousEvaluationRuleAction);

    case "humanEvaluation":
      return humanEvaluationRuleActionSerializer(item as HumanEvaluationRuleAction);

    default:
      return evaluationRuleActionSerializer(item);
  }
}

export function evaluationRuleActionUnionDeserializer(item: any): EvaluationRuleActionUnion {
  switch (item.type) {
    case "continuousEvaluation":
      return continuousEvaluationRuleActionDeserializer(item as ContinuousEvaluationRuleAction);

    case "humanEvaluation":
      return humanEvaluationRuleActionDeserializer(item as HumanEvaluationRuleAction);

    default:
      return evaluationRuleActionDeserializer(item);
  }
}

/** Type of the evaluation action. */
export type EvaluationRuleActionType = "continuousEvaluation" | "humanEvaluation";

/** Evaluation rule action for continuous evaluation. */
export interface ContinuousEvaluationRuleAction extends EvaluationRuleAction {
  /** The type of the action. */
  type: "continuousEvaluation";
  /** Eval Id to add continuous evaluation runs to. */
  evalId: string;
  /** Maximum number of evaluation runs allowed per hour. */
  maxHourlyRuns?: number;
}

export function continuousEvaluationRuleActionSerializer(
  item: ContinuousEvaluationRuleAction,
): any {
  return {
    type: item["type"],
    evalId: item["evalId"],
    maxHourlyRuns: item["maxHourlyRuns"],
  };
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
export interface HumanEvaluationRuleAction extends EvaluationRuleAction {
  /** The type of the action. */
  type: "humanEvaluation";
  /** Human evaluation template Id. */
  templateId: string;
}

export function humanEvaluationRuleActionSerializer(item: HumanEvaluationRuleAction): any {
  return { type: item["type"], templateId: item["templateId"] };
}

export function humanEvaluationRuleActionDeserializer(item: any): HumanEvaluationRuleAction {
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
export type EvaluationRuleEventType = "response.completed" | "manual";

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
    tags: item["tags"],
    taxonomyInput: evaluationTaxonomyInputUnionDeserializer(item["taxonomyInput"]),
    taxonomyCategories: !item["taxonomyCategories"]
      ? item["taxonomyCategories"]
      : taxonomyCategoryArrayDeserializer(item["taxonomyCategories"]),
    properties: item["properties"],
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
  target: AzureAIAgentTarget;
  /** List of risk categories to evaluate against. */
  riskCategories: RiskCategory[];
}

export function agentTaxonomyInputSerializer(item: AgentTaxonomyInput): any {
  return {
    type: item["type"],
    target: azureAIAgentTargetSerializer(item["target"]),
    riskCategories: item["riskCategories"].map((p: any) => {
      return p;
    }),
  };
}

export function agentTaxonomyInputDeserializer(item: any): AgentTaxonomyInput {
  return {
    type: item["type"],
    target: azureAIAgentTargetDeserializer(item["target"]),
    riskCategories: item["riskCategories"].map((p: any) => {
      return p;
    }),
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
  toolDescriptions?: ToolDescription[];
}

export function azureAIAgentTargetSerializer(item: AzureAIAgentTarget): any {
  return {
    type: item["type"],
    name: item["name"],
    version: item["version"],
    tool_descriptions: !item["toolDescriptions"]
      ? item["toolDescriptions"]
      : toolDescriptionArraySerializer(item["toolDescriptions"]),
  };
}

export function azureAIAgentTargetDeserializer(item: any): AzureAIAgentTarget {
  return {
    type: item["type"],
    name: item["name"],
    version: item["version"],
    toolDescriptions: !item["tool_descriptions"]
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
    properties: item["properties"],
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
    properties: item["properties"],
  };
}

/** Base class for targets with discriminator support. */
export interface Target {
  /** The type of target. */
  /** The discriminator possible values: azure_ai_model, azure_ai_agent, azure_ai_assistant */
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
export type TargetUnion = AzureAIAgentTarget | Target;

export function targetUnionSerializer(item: TargetUnion): any {
  switch (item.type) {
    case "azure_ai_agent":
      return azureAIAgentTargetSerializer(item as AzureAIAgentTarget);

    default:
      return targetSerializer(item);
  }
}

export function targetUnionDeserializer(item: any): TargetUnion {
  switch (item.type) {
    case "azure_ai_agent":
      return azureAIAgentTargetDeserializer(item as AzureAIAgentTarget);

    default:
      return targetDeserializer(item);
  }
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

export function evaluatorVersionArrayDeserializer(result: Array<EvaluatorVersion>): any[] {
  return result.map((item) => {
    return evaluatorVersionDeserializer(item);
  });
}

/** Evaluator Definition */
export interface EvaluatorVersion {
  /** Display Name for evaluator. It helps to find the evaluator easily in AI Foundry. It does not need to be unique. */
  displayName?: string;
  /** Metadata about the evaluator */
  metadata?: Record<string, string>;
  /** The type of the evaluator */
  evaluatorType: EvaluatorType;
  /** The categories of the evaluator */
  categories: EvaluatorCategory[];
  /** Definition of the evaluator */
  definition: EvaluatorDefinitionUnion;
  /** Creator of the evaluator */
  readonly createdBy: string;
  /** Creation date/time of the evaluator */
  readonly createdAt: number;
  /** Last modified date/time of the evaluator */
  readonly modifiedAt: number;
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

export function evaluatorVersionDeserializer(item: any): EvaluatorVersion {
  return {
    displayName: item["display_name"],
    metadata: item["metadata"],
    evaluatorType: item["evaluator_type"],
    categories: item["categories"].map((p: any) => {
      return p;
    }),
    definition: evaluatorDefinitionUnionDeserializer(item["definition"]),
    createdBy: item["created_by"],
    createdAt: item["created_at"],
    modifiedAt: item["modified_at"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    tags: item["tags"],
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
  initParameters?: any;
  /** The JSON schema (Draft 2020-12) for the evaluator's input data. This includes parameters like type, properties, required. */
  dataSchema?: any;
  /** List of output metrics produced by this evaluator */
  metrics?: Record<string, EvaluatorMetric>;
}

export function evaluatorDefinitionDeserializer(item: any): EvaluatorDefinition {
  return {
    type: item["type"],
    initParameters: item["init_parameters"],
    dataSchema: item["data_schema"],
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
  desirableDirection?: EvaluatorMetricDirection;
  /** Minimum value for the metric */
  minValue?: number;
  /** Maximum value for the metric. If not specified, it is assumed to be unbounded. */
  maxValue?: number;
  /** Indicates if this metric is primary when there are multiple metrics. */
  isPrimary?: boolean;
}

export function evaluatorMetricDeserializer(item: any): EvaluatorMetric {
  return {
    type: item["type"],
    desirableDirection: item["desirable_direction"],
    minValue: item["min_value"],
    maxValue: item["max_value"],
    isPrimary: item["is_primary"],
  };
}

/** The type of the evaluator */
export type EvaluatorMetricType = "ordinal" | "continuous" | "boolean";
/** The direction of the metric indicating whether a higher value is better, a lower value is better, or neutral */
export type EvaluatorMetricDirection = "increase" | "decrease" | "neutral";

/** Code-based evaluator definition using python code */
export interface CodeBasedEvaluatorDefinition extends EvaluatorDefinition {
  /** the type of the evaluator definition */
  type: "code";
  /** Inline code text for the evaluator */
  codeText: string;
}

export function codeBasedEvaluatorDefinitionDeserializer(item: any): CodeBasedEvaluatorDefinition {
  return {
    type: item["type"],
    initParameters: item["init_parameters"],
    dataSchema: item["data_schema"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : evaluatorMetricRecordDeserializer(item["metrics"]),
    codeText: item["code_text"],
  };
}

/** Prompt-based evaluator */
export interface PromptBasedEvaluatorDefinition extends EvaluatorDefinition {
  /** the type of the evaluator definition */
  type: "prompt";
  /** The prompt text used for evaluation */
  promptText: string;
}

export function promptBasedEvaluatorDefinitionDeserializer(
  item: any,
): PromptBasedEvaluatorDefinition {
  return {
    type: item["type"],
    initParameters: item["init_parameters"],
    dataSchema: item["data_schema"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : evaluatorMetricRecordDeserializer(item["metrics"]),
    promptText: item["prompt_text"],
  };
}

/** The response body for cluster insights. */
export interface Insight {
  /** The unique identifier for the insights report. */
  readonly id: string;
  /** Metadata about the insights report. */
  readonly metadata: InsightsMetadata;
  /** The current state of the insights. */
  readonly state: any;
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
  | EvaluationRunClusterInsightsRequest
  | AgentClusterInsightsRequest
  | EvaluationComparisonRequest
  | InsightRequest;

export function insightRequestUnionSerializer(item: InsightRequestUnion): any {
  switch (item.type) {
    case "EvaluationRunClusterInsight":
      return evaluationRunClusterInsightsRequestSerializer(
        item as EvaluationRunClusterInsightsRequest,
      );

    case "AgentClusterInsight":
      return agentClusterInsightsRequestSerializer(item as AgentClusterInsightsRequest);

    case "EvaluationComparison":
      return evaluationComparisonRequestSerializer(item as EvaluationComparisonRequest);

    default:
      return insightRequestSerializer(item);
  }
}

export function insightRequestUnionDeserializer(item: any): InsightRequestUnion {
  switch (item.type) {
    case "EvaluationRunClusterInsight":
      return evaluationRunClusterInsightsRequestDeserializer(
        item as EvaluationRunClusterInsightsRequest,
      );

    case "AgentClusterInsight":
      return agentClusterInsightsRequestDeserializer(item as AgentClusterInsightsRequest);

    case "EvaluationComparison":
      return evaluationComparisonRequestDeserializer(item as EvaluationComparisonRequest);

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
export interface EvaluationRunClusterInsightsRequest extends InsightRequest {
  /** The type of insights request. */
  type: "EvaluationRunClusterInsight";
  /** Evaluation Id for the insights. */
  evalId: string;
  /** List of evaluation run IDs for the insights. */
  runIds: string[];
  /** Configuration of the model used in the insight generation. */
  modelConfiguration?: InsightModelConfiguration;
}

export function evaluationRunClusterInsightsRequestSerializer(
  item: EvaluationRunClusterInsightsRequest,
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

export function evaluationRunClusterInsightsRequestDeserializer(
  item: any,
): EvaluationRunClusterInsightsRequest {
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
export interface AgentClusterInsightsRequest extends InsightRequest {
  /** The type of request. */
  type: "AgentClusterInsight";
  /** Identifier for the agent. */
  agentName: string;
  /** Configuration of the model used in the insight generation. */
  modelConfiguration?: InsightModelConfiguration;
}

export function agentClusterInsightsRequestSerializer(item: AgentClusterInsightsRequest): any {
  return {
    type: item["type"],
    agentName: item["agentName"],
    modelConfiguration: !item["modelConfiguration"]
      ? item["modelConfiguration"]
      : insightModelConfigurationSerializer(item["modelConfiguration"]),
  };
}

export function agentClusterInsightsRequestDeserializer(item: any): AgentClusterInsightsRequest {
  return {
    type: item["type"],
    agentName: item["agentName"],
    modelConfiguration: !item["modelConfiguration"]
      ? item["modelConfiguration"]
      : insightModelConfigurationDeserializer(item["modelConfiguration"]),
  };
}

/** Evaluation Comparison Request */
export interface EvaluationComparisonRequest extends InsightRequest {
  /** The type of request. */
  type: "EvaluationComparison";
  /** Identifier for the evaluation. */
  evalId: string;
  /** The baseline run ID for comparison. */
  baselineRunId: string;
  /** List of treatment run IDs for comparison. */
  treatmentRunIds: string[];
}

export function evaluationComparisonRequestSerializer(item: EvaluationComparisonRequest): any {
  return {
    type: item["type"],
    evalId: item["evalId"],
    baselineRunId: item["baselineRunId"],
    treatmentRunIds: item["treatmentRunIds"].map((p: any) => {
      return p;
    }),
  };
}

export function evaluationComparisonRequestDeserializer(item: any): EvaluationComparisonRequest {
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
  | EvalCompareReport
  | EvaluationRunClusterInsightResult
  | AgentClusterInsightResult
  | InsightResult;

export function insightResultUnionDeserializer(item: any): InsightResultUnion {
  switch (item.type) {
    case "EvaluationComparison":
      return evalCompareReportDeserializer(item as EvalCompareReport);

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
export interface EvalCompareReport extends InsightResult {
  /** The type of insights result. */
  type: "EvaluationComparison";
  /** Comparison results for each treatment run against the baseline. */
  comparisons: EvalRunResultComparison[];
  /** The statistical method used for comparison. */
  method: string;
}

export function evalCompareReportDeserializer(item: any): EvalCompareReport {
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
  /** Cluster insights from the evaluation run analysis. */
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
   *   {
   *     "cluster-1": { "x": 12, "y": 34, "size": 8 },
   *     "sample-123": { "x": 18, "y": 22, "size": 4 }
   *   }
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
  features: Record<string, any>;
  /** Info about the correlation for the analysis sample. */
  correlationInfo: Record<string, any>;
}

export function insightSampleDeserializer(item: any): InsightSample {
  return {
    id: item["id"],
    type: item["type"],
    features: item["features"],
    correlationInfo: item["correlationInfo"],
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
    features: item["features"],
    correlationInfo: item["correlationInfo"],
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
  /** The cluster insight details. */
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

/** Schedule model. */
export interface Schedule {
  /** Identifier of the schedule. */
  readonly id: string;
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
  readonly systemData: Record<string, string>;
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
  /** Type of the trigger. */
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

/** Hourly recurrencce schedule. */
export interface HourlyRecurrenceSchedule extends RecurrenceSchedule {
  /** the type of the schedule. */
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
  /** Type of the trigger. */
  type: "OneTime";
  /** Date and time for the one-time trigger in ISO 8601 format. */
  triggerAt: string;
  /** Time zone for the one-time trigger. */
  timeZone?: string;
}

export function oneTimeTriggerSerializer(item: OneTimeTrigger): any {
  return {
    type: item["type"],
    triggerAt: item["triggerAt"],
    timeZone: item["timeZone"],
  };
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
  /** The type of the task. Always `Evaluation`. */
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
  /** The type of the task. Always `Insight`. */
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
  readonly id: string;
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
    id: item["id"],
    scheduleId: item["scheduleId"],
    success: item["success"],
    triggerTime: item["triggerTime"],
    error: item["error"],
    properties: item["properties"],
  };
}

/** Paged collection of ScheduleRun items */
export interface PagedScheduleRun {
  /** The ScheduleRun items on this page */
  value: ScheduleRun[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function pagedScheduleRunDeserializer(item: any): PagedScheduleRun {
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

/** model interface AgentId */
export interface AgentId {
  /** The type of the agent ID. */
  type: "agent_id";
  /** The name of the agent. */
  name: string;
  /** The version identifier of the agent. */
  version: string;
}

export function agentIdDeserializer(item: any): AgentId {
  return {
    type: item["type"],
    name: item["name"],
    version: item["version"],
  };
}

/** Alias for _ResponseInstructions */
export type _ResponseInstructions = string | ItemParamUnion[];

/** model interface AgentReference */
export interface AgentReference {
  /** The type of the agent reference. */
  type: "agent_reference";
  /** The name of the agent. */
  name: string;
  /** The version identifier of the agent. */
  version?: string;
}

export function agentReferenceSerializer(item: AgentReference): any {
  return { type: item["type"], name: item["name"], version: item["version"] };
}

/** Alias for _ListVersionsRequestType */
export type _ListVersionsRequestType = EvaluatorType | "all";

export function _listVersionsRequestTypeSerializer(item: _ListVersionsRequestType): any {
  return item;
}

/** The type of pending upload. */
export type PendingUploadType = "None" | "BlobReference";

/** Azure AI Projects API versions */
export enum KnownApiVersions {
  /** Azure AI API version 2025-05-01. */
  V20250501 = "2025-05-01",
  /** Azure AI API version 2025-05-15-preview. */
  V20250515Preview = "2025-05-15-preview",
  /** Azure AI API version 2025-11-15-preview. */
  V20251115Preview = "2025-11-15-preview",
}
