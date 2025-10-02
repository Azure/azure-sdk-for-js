// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

export function _agentObjectVersionsDeserializer(
  item: any,
): _AgentObjectVersions {
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
  kind: AgentKind;
  /** Configuration for Responsible AI (RAI) content filtering and safety features. */
  raiConfig?: RaiConfig;
}

export function agentDefinitionSerializer(item: AgentDefinition): any {
  return {
    kind: item["kind"],
    rai_config: !item["raiConfig"]
      ? item["raiConfig"]
      : raiConfigSerializer(item["raiConfig"]),
  };
}

export function agentDefinitionDeserializer(item: any): AgentDefinition {
  return {
    kind: item["kind"],
    raiConfig: !item["rai_config"]
      ? item["rai_config"]
      : raiConfigDeserializer(item["rai_config"]),
  };
}

/** Alias for AgentDefinitionUnion */
export type AgentDefinitionUnion =
  | WorkflowDefinition
  | HostedAgentDefinitionUnion
  | ContainerAppAgentDefinition
  | PromptAgentDefinition
  | AgentDefinition;

export function agentDefinitionUnionSerializer(
  item: AgentDefinitionUnion,
): any {
  switch (item.kind) {
    case "workflow":
      return workflowDefinitionSerializer(item as WorkflowDefinition);

    case "hosted":
      return hostedAgentDefinitionUnionSerializer(
        item as HostedAgentDefinitionUnion,
      );

    case "container_app":
      return containerAppAgentDefinitionSerializer(
        item as ContainerAppAgentDefinition,
      );

    case "prompt":
      return promptAgentDefinitionSerializer(item as PromptAgentDefinition);

    default:
      return agentDefinitionSerializer(item);
  }
}

export function agentDefinitionUnionDeserializer(
  item: any,
): AgentDefinitionUnion {
  switch (item.kind) {
    case "workflow":
      return workflowDefinitionDeserializer(item as WorkflowDefinition);

    case "hosted":
      return hostedAgentDefinitionUnionDeserializer(
        item as HostedAgentDefinitionUnion,
      );

    case "container_app":
      return containerAppAgentDefinitionDeserializer(
        item as ContainerAppAgentDefinition,
      );

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
  kind: "workflow";
  trigger?: Record<string, any>;
}

export function workflowDefinitionSerializer(item: WorkflowDefinition): any {
  return {
    kind: item["kind"],
    rai_config: !item["raiConfig"]
      ? item["raiConfig"]
      : raiConfigSerializer(item["raiConfig"]),
    trigger: item["trigger"],
  };
}

export function workflowDefinitionDeserializer(item: any): WorkflowDefinition {
  return {
    kind: item["kind"],
    raiConfig: !item["rai_config"]
      ? item["rai_config"]
      : raiConfigDeserializer(item["rai_config"]),
    trigger: item["trigger"],
  };
}

/** The hosted agent definition. */
export interface HostedAgentDefinition extends AgentDefinition {
  kind: "hosted" | "hosted";
  /** The protocols that the agent supports for ingress communication of the containers. */
  containerProtocolVersions: ProtocolVersionRecord[];
  /** The CPU configuration for the hosted agent. */
  cpu: string;
  /** The memory configuration for the hosted agent. */
  memory: string;
  /** Environment variables to set in the hosted agent container. */
  environmentVariables?: Record<string, string>;
}

export function hostedAgentDefinitionSerializer(
  item: HostedAgentDefinition,
): any {
  return {
    kind: item["kind"],
    rai_config: !item["raiConfig"]
      ? item["raiConfig"]
      : raiConfigSerializer(item["raiConfig"]),
    container_protocol_versions: protocolVersionRecordArraySerializer(
      item["containerProtocolVersions"],
    ),
    cpu: item["cpu"],
    memory: item["memory"],
    environment_variables: item["environmentVariables"],
  };
}

export function hostedAgentDefinitionDeserializer(
  item: any,
): HostedAgentDefinition {
  return {
    kind: item["kind"],
    raiConfig: !item["rai_config"]
      ? item["rai_config"]
      : raiConfigDeserializer(item["rai_config"]),
    containerProtocolVersions: protocolVersionRecordArrayDeserializer(
      item["container_protocol_versions"],
    ),
    cpu: item["cpu"],
    memory: item["memory"],
    environmentVariables: item["environment_variables"],
  };
}

/** Alias for HostedAgentDefinitionUnion */
export type HostedAgentDefinitionUnion =
  | ImageBasedHostedAgentDefinition
  | HostedAgentDefinition;

export function hostedAgentDefinitionUnionSerializer(
  item: HostedAgentDefinitionUnion,
): any {
  switch (item.kind) {
    case "hosted":
      return imageBasedHostedAgentDefinitionSerializer(
        item as ImageBasedHostedAgentDefinition,
      );

    default:
      return hostedAgentDefinitionSerializer(item);
  }
}

export function hostedAgentDefinitionUnionDeserializer(
  item: any,
): HostedAgentDefinitionUnion {
  switch (item.kind) {
    case "hosted":
      return imageBasedHostedAgentDefinitionDeserializer(
        item as ImageBasedHostedAgentDefinition,
      );

    default:
      return hostedAgentDefinitionDeserializer(item);
  }
}

export function protocolVersionRecordArraySerializer(
  result: Array<ProtocolVersionRecord>,
): any[] {
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

export function protocolVersionRecordSerializer(
  item: ProtocolVersionRecord,
): any {
  return { protocol: item["protocol"], version: item["version"] };
}

export function protocolVersionRecordDeserializer(
  item: any,
): ProtocolVersionRecord {
  return {
    protocol: item["protocol"],
    version: item["version"],
  };
}

/** Type of AgentProtocol */
export type AgentProtocol = "activity_protocol" | "responses";

/** The image-based deployment definition for a hosted agent. */
export interface ImageBasedHostedAgentDefinition extends HostedAgentDefinition {
  kind: "hosted";
  /** The image for the hosted agent. */
  image: string;
}

export function imageBasedHostedAgentDefinitionSerializer(
  item: ImageBasedHostedAgentDefinition,
): any {
  return {
    kind: item["kind"],
    container_protocol_versions: protocolVersionRecordArraySerializer(
      item["containerProtocolVersions"],
    ),
    cpu: item["cpu"],
    memory: item["memory"],
    environment_variables: item["environmentVariables"],
    rai_config: !item["raiConfig"]
      ? item["raiConfig"]
      : raiConfigSerializer(item["raiConfig"]),
    image: item["image"],
  };
}

export function imageBasedHostedAgentDefinitionDeserializer(
  item: any,
): ImageBasedHostedAgentDefinition {
  return {
    kind: item["kind"],
    containerProtocolVersions: protocolVersionRecordArrayDeserializer(
      item["container_protocol_versions"],
    ),
    cpu: item["cpu"],
    memory: item["memory"],
    environmentVariables: item["environment_variables"],
    raiConfig: !item["rai_config"]
      ? item["rai_config"]
      : raiConfigDeserializer(item["rai_config"]),
    image: item["image"],
  };
}

/** The container app agent definition. */
export interface ContainerAppAgentDefinition extends AgentDefinition {
  kind: "container_app";
  /** The protocols that the agent supports for ingress communication of the containers. */
  containerProtocolVersions: ProtocolVersionRecord[];
  /** The resource ID of the Azure Container App that hosts this agent. Not mutable across versions. */
  containerAppResourceId: string;
  /** The suffix to apply to the app subdomain when sending ingress to the agent. This can be a label (e.g., '---current'), a specific revision (e.g., '--0000001'), or empty to use the default endpoint for the container app. */
  ingressSubdomainSuffix: string;
}

export function containerAppAgentDefinitionSerializer(
  item: ContainerAppAgentDefinition,
): any {
  return {
    kind: item["kind"],
    rai_config: !item["raiConfig"]
      ? item["raiConfig"]
      : raiConfigSerializer(item["raiConfig"]),
    container_protocol_versions: protocolVersionRecordArraySerializer(
      item["containerProtocolVersions"],
    ),
    container_app_resource_id: item["containerAppResourceId"],
    ingress_subdomain_suffix: item["ingressSubdomainSuffix"],
  };
}

export function containerAppAgentDefinitionDeserializer(
  item: any,
): ContainerAppAgentDefinition {
  return {
    kind: item["kind"],
    raiConfig: !item["rai_config"]
      ? item["rai_config"]
      : raiConfigDeserializer(item["rai_config"]),
    containerProtocolVersions: protocolVersionRecordArrayDeserializer(
      item["container_protocol_versions"],
    ),
    containerAppResourceId: item["container_app_resource_id"],
    ingressSubdomainSuffix: item["ingress_subdomain_suffix"],
  };
}

/** The prompt agent definition */
export interface PromptAgentDefinition extends AgentDefinition {
  kind: "prompt";
  /** The model deployment to use for this agent. */
  model: string;
  /** A system (or developer) message inserted into the model's context. */
  instructions?: string | null;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * We generally recommend altering this or `top_p` but not both.
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling,
   * where the model considers the results of the tokens with top_p probability
   * mass. So 0.1 means only the tokens comprising the top 10% probability mass
   * are considered.
   *
   * We generally recommend altering this or `temperature` but not both.
   */
  topP?: number | null;
  reasoning?: Reasoning | null;
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

export function promptAgentDefinitionSerializer(
  item: PromptAgentDefinition,
): any {
  return {
    kind: item["kind"],
    rai_config: !item["raiConfig"]
      ? item["raiConfig"]
      : raiConfigSerializer(item["raiConfig"]),
    model: item["model"],
    instructions: item["instructions"],
    temperature: item["temperature"],
    top_p: item["topP"],
    reasoning: !item["reasoning"]
      ? item["reasoning"]
      : reasoningSerializer(item["reasoning"]),
    tools: !item["tools"]
      ? item["tools"]
      : toolUnionArraySerializer(item["tools"]),
    text: !item["text"]
      ? item["text"]
      : _promptAgentDefinitionTextSerializer(item["text"]),
    structured_inputs: !item["structuredInputs"]
      ? item["structuredInputs"]
      : structuredInputDefinitionRecordSerializer(item["structuredInputs"]),
  };
}

export function promptAgentDefinitionDeserializer(
  item: any,
): PromptAgentDefinition {
  return {
    kind: item["kind"],
    raiConfig: !item["rai_config"]
      ? item["rai_config"]
      : raiConfigDeserializer(item["rai_config"]),
    model: item["model"],
    instructions: item["instructions"],
    temperature: item["temperature"],
    topP: item["top_p"],
    reasoning: !item["reasoning"]
      ? item["reasoning"]
      : reasoningDeserializer(item["reasoning"]),
    tools: !item["tools"]
      ? item["tools"]
      : toolUnionArrayDeserializer(item["tools"]),
    text: !item["text"]
      ? item["text"]
      : _promptAgentDefinitionTextDeserializer(item["text"]),
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
  effort?: ReasoningEffort | null;
  /**
   * A summary of the reasoning performed by the model. This can be
   * useful for debugging and understanding the model's reasoning process.
   * One of `auto`, `concise`, or `detailed`.
   */
  summary?: ("auto" | "concise" | "detailed") | null;
  /**
   * **Deprecated:** use `summary` instead.
   *
   * A summary of the reasoning performed by the model. This can be
   * useful for debugging and understanding the model's reasoning process.
   * One of `auto`, `concise`, or `detailed`.
   */
  generateSummary?: ("auto" | "concise" | "detailed") | null;
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
  | ConnectedAgentAgentTool
  | BrowserAutomationAgentTool
  | CaptureStructuredOutputsTool
  | CaptureSemanticEventsTool
  | A2ATool
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

    case "fabric_dataagent":
      return microsoftFabricAgentToolSerializer(
        item as MicrosoftFabricAgentTool,
      );

    case "sharepoint_grounding":
      return sharepointAgentToolSerializer(item as SharepointAgentTool);

    case "azure_ai_search":
      return azureAISearchAgentToolSerializer(item as AzureAISearchAgentTool);

    case "openapi":
      return openApiAgentToolSerializer(item as OpenApiAgentTool);

    case "bing_custom_search":
      return bingCustomSearchAgentToolSerializer(
        item as BingCustomSearchAgentTool,
      );

    case "connected_agent":
      return connectedAgentAgentToolSerializer(item as ConnectedAgentAgentTool);

    case "browser_automation":
      return browserAutomationAgentToolSerializer(
        item as BrowserAutomationAgentTool,
      );

    case "capture_structured_outputs":
      return captureStructuredOutputsToolSerializer(
        item as CaptureStructuredOutputsTool,
      );

    case "capture_semantic_events":
      return captureSemanticEventsToolSerializer(
        item as CaptureSemanticEventsTool,
      );

    case "a2a":
      return a2AToolSerializer(item as A2ATool);

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

    case "fabric_dataagent":
      return microsoftFabricAgentToolDeserializer(
        item as MicrosoftFabricAgentTool,
      );

    case "sharepoint_grounding":
      return sharepointAgentToolDeserializer(item as SharepointAgentTool);

    case "azure_ai_search":
      return azureAISearchAgentToolDeserializer(item as AzureAISearchAgentTool);

    case "openapi":
      return openApiAgentToolDeserializer(item as OpenApiAgentTool);

    case "bing_custom_search":
      return bingCustomSearchAgentToolDeserializer(
        item as BingCustomSearchAgentTool,
      );

    case "connected_agent":
      return connectedAgentAgentToolDeserializer(
        item as ConnectedAgentAgentTool,
      );

    case "browser_automation":
      return browserAutomationAgentToolDeserializer(
        item as BrowserAutomationAgentTool,
      );

    case "capture_structured_outputs":
      return captureStructuredOutputsToolDeserializer(
        item as CaptureStructuredOutputsTool,
      );

    case "capture_semantic_events":
      return captureSemanticEventsToolDeserializer(
        item as CaptureSemanticEventsTool,
      );

    case "a2a":
      return a2AToolDeserializer(item as A2ATool);

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
  | "browser_automation"
  | "fabric_dataagent"
  | "sharepoint_grounding"
  | "azure_ai_search"
  | "openapi"
  | "bing_custom_search"
  | "connected_agent"
  | "capture_structured_outputs"
  | "capture_semantic_events"
  | "a2a";

/** Defines a function in your own code the model can choose to call. Learn more about [function calling](https://platform.openai.com/docs/guides/function-calling). */
export interface FunctionTool extends Tool {
  /** The type of the function tool. Always `function`. */
  type: "function";
  /** The name of the function to call. */
  name: string;
  /** A description of the function. Used by the model to determine whether or not to call the function. */
  description?: string | null;
  /** A JSON schema object describing the parameters of the function. */
  parameters: any | null;
  /** Whether to enforce strict parameter validation. Default `true`. */
  strict: boolean | null;
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
    filters: !item["filters"]
      ? item["filters"]
      : filtersSerializer(item["filters"]),
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
    filters: !item["filters"]
      ? item["filters"]
      : filtersDeserializer(item["filters"]),
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

export function _comparisonFilterValueSerializer(
  item: _ComparisonFilterValue,
): any {
  return item;
}

export function _comparisonFilterValueDeserializer(
  item: any,
): _ComparisonFilterValue {
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

export function _compoundFilterFilterArraySerializer(
  result: Array<_CompoundFilterFilter>,
): any[] {
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

export function _compoundFilterFilterSerializer(
  item: _CompoundFilterFilter,
): any {
  return item;
}

export function _compoundFilterFilterDeserializer(
  item: any,
): _CompoundFilterFilter {
  return item;
}

/** A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use). */
export interface ComputerUsePreviewTool extends Tool {
  /** The type of the computer use tool. Always `computer_use_preview`. */
  type: "computer_use_preview";
  /** The type of computer environment to control. */
  environment: "windows" | "mac" | "linux" | "ubuntu" | "browser";
  /** The width of the computer display. */
  displayWidth: number;
  /** The height of the computer display. */
  displayHeight: number;
}

export function computerUsePreviewToolSerializer(
  item: ComputerUsePreviewTool,
): any {
  return {
    type: item["type"],
    environment: item["environment"],
    display_width: item["displayWidth"],
    display_height: item["displayHeight"],
  };
}

export function computerUsePreviewToolDeserializer(
  item: any,
): ComputerUsePreviewTool {
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
  userLocation?: LocationUnion | null;
  /** High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default. */
  searchContextSize?: "low" | "medium" | "high";
}

export function webSearchPreviewToolSerializer(
  item: WebSearchPreviewTool,
): any {
  return {
    type: item["type"],
    user_location: !item["userLocation"]
      ? item["userLocation"]
      : locationUnionSerializer(item["userLocation"]),
    search_context_size: item["searchContextSize"],
  };
}

export function webSearchPreviewToolDeserializer(
  item: any,
): WebSearchPreviewTool {
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
  type: "approximate";
  country?: string | null;
  region?: string | null;
  city?: string | null;
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

export function approximateLocationDeserializer(
  item: any,
): ApproximateLocation {
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

export function codeInterpreterToolDeserializer(
  item: any,
): CodeInterpreterTool {
  return {
    type: item["type"],
    container: _codeInterpreterToolContainerDeserializer(item["container"]),
  };
}

/** Alias for _CodeInterpreterToolContainer */
export type _CodeInterpreterToolContainer = string | CodeInterpreterToolAuto;

export function _codeInterpreterToolContainerSerializer(
  item: _CodeInterpreterToolContainer,
): any {
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

export function codeInterpreterToolAutoSerializer(
  item: CodeInterpreterToolAuto,
): any {
  return {
    type: item["type"],
    file_ids: !item["fileIds"]
      ? item["fileIds"]
      : item["fileIds"].map((p: any) => {
          return p;
        }),
  };
}

export function codeInterpreterToolAutoDeserializer(
  item: any,
): CodeInterpreterToolAuto {
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

export function _imageGenToolInputImageMaskSerializer(
  item: _ImageGenToolInputImageMask,
): any {
  return { image_url: item["imageUrl"], file_id: item["fileId"] };
}

export function _imageGenToolInputImageMaskDeserializer(
  item: any,
): _ImageGenToolInputImageMask {
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
    | (
        | string[]
        | {
            toolNames?: string[];
          }
      )
    | null;
  /** Specify which of the MCP server's tools require approval. */
  requireApproval?:
    | (
        | {
            always?: {
              toolNames?: string[];
            };
            never?: {
              toolNames?: string[];
            };
          }
        | "always"
        | "never"
      )
    | null;
  /** The connection ID in the project for the MCP server. The connection stores authentication and other connection details needed to connect to the MCP server. */
  projectConnectionId: string;
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

export function _mcpToolAllowedToolsSerializer(
  item: _MCPToolAllowedTools,
): any {
  return item;
}

export function _mcpToolAllowedToolsDeserializer(
  item: any,
): _MCPToolAllowedTools {
  return item;
}

/** model interface _MCPToolAllowedTools1 */
export interface _MCPToolAllowedTools1 {
  /** List of allowed tool names. */
  toolNames?: string[];
}

export function _mcpToolAllowedTools1Serializer(
  item: _MCPToolAllowedTools1,
): any {
  return {
    tool_names: !item["toolNames"]
      ? item["toolNames"]
      : item["toolNames"].map((p: any) => {
          return p;
        }),
  };
}

export function _mcpToolAllowedTools1Deserializer(
  item: any,
): _MCPToolAllowedTools1 {
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

export function _mcpToolRequireApprovalSerializer(
  item: _MCPToolRequireApproval,
): any {
  return item;
}

export function _mcpToolRequireApprovalDeserializer(
  item: any,
): _MCPToolRequireApproval {
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

export function _mcpToolRequireApproval1Serializer(
  item: _MCPToolRequireApproval1,
): any {
  return {
    always: !item["always"]
      ? item["always"]
      : _mcpToolRequireApprovalAlwaysSerializer(item["always"]),
    never: !item["never"]
      ? item["never"]
      : _mcpToolRequireApprovalNeverSerializer(item["never"]),
  };
}

export function _mcpToolRequireApproval1Deserializer(
  item: any,
): _MCPToolRequireApproval1 {
  return {
    always: !item["always"]
      ? item["always"]
      : _mcpToolRequireApprovalAlwaysDeserializer(item["always"]),
    never: !item["never"]
      ? item["never"]
      : _mcpToolRequireApprovalNeverDeserializer(item["never"]),
  };
}

/** model interface _MCPToolRequireApprovalAlways */
export interface _MCPToolRequireApprovalAlways {
  /** List of tools that require approval. */
  toolNames?: string[];
}

export function _mcpToolRequireApprovalAlwaysSerializer(
  item: _MCPToolRequireApprovalAlways,
): any {
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

export function _mcpToolRequireApprovalNeverSerializer(
  item: _MCPToolRequireApprovalNever,
): any {
  return {
    tool_names: !item["toolNames"]
      ? item["toolNames"]
      : item["toolNames"].map((p: any) => {
          return p;
        }),
  };
}

export function _mcpToolRequireApprovalNeverDeserializer(
  item: any,
): _MCPToolRequireApprovalNever {
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

export function bingGroundingAgentToolSerializer(
  item: BingGroundingAgentTool,
): any {
  return {
    type: item["type"],
    bing_grounding: bingGroundingSearchToolParametersSerializer(
      item["bingGrounding"],
    ),
  };
}

export function bingGroundingAgentToolDeserializer(
  item: any,
): BingGroundingAgentTool {
  return {
    type: item["type"],
    bingGrounding: bingGroundingSearchToolParametersDeserializer(
      item["bing_grounding"],
    ),
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
    project_connections: toolProjectConnectionListSerializer(
      item["projectConnections"],
    ),
    search_configurations: bingGroundingSearchConfigurationArraySerializer(
      item["searchConfigurations"],
    ),
  };
}

export function bingGroundingSearchToolParametersDeserializer(
  item: any,
): BingGroundingSearchToolParameters {
  return {
    projectConnections: toolProjectConnectionListDeserializer(
      item["project_connections"],
    ),
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

export function toolProjectConnectionListSerializer(
  item: ToolProjectConnectionList,
): any {
  return {
    project_connections: !item["projectConnections"]
      ? item["projectConnections"]
      : toolProjectConnectionArraySerializer(item["projectConnections"]),
  };
}

export function toolProjectConnectionListDeserializer(
  item: any,
): ToolProjectConnectionList {
  return {
    projectConnections: !item["project_connections"]
      ? item["project_connections"]
      : toolProjectConnectionArrayDeserializer(item["project_connections"]),
  };
}

export function toolProjectConnectionArraySerializer(
  result: Array<ToolProjectConnection>,
): any[] {
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

export function toolProjectConnectionSerializer(
  item: ToolProjectConnection,
): any {
  return { project_connection_id: item["projectConnectionId"] };
}

export function toolProjectConnectionDeserializer(
  item: any,
): ToolProjectConnection {
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
  type: "fabric_dataagent";
  /** The fabric data agent tool parameters. */
  fabricDataagent: FabricDataAgentToolParameters;
}

export function microsoftFabricAgentToolSerializer(
  item: MicrosoftFabricAgentTool,
): any {
  return {
    type: item["type"],
    fabric_dataagent: fabricDataAgentToolParametersSerializer(
      item["fabricDataagent"],
    ),
  };
}

export function microsoftFabricAgentToolDeserializer(
  item: any,
): MicrosoftFabricAgentTool {
  return {
    type: item["type"],
    fabricDataagent: fabricDataAgentToolParametersDeserializer(
      item["fabric_dataagent"],
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

export function fabricDataAgentToolParametersSerializer(
  item: FabricDataAgentToolParameters,
): any {
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
  type: "sharepoint_grounding";
  /** The sharepoint grounding tool parameters. */
  sharepointGrounding: SharepointGroundingToolParameters;
}

export function sharepointAgentToolSerializer(item: SharepointAgentTool): any {
  return {
    type: item["type"],
    sharepoint_grounding: sharepointGroundingToolParametersSerializer(
      item["sharepointGrounding"],
    ),
  };
}

export function sharepointAgentToolDeserializer(
  item: any,
): SharepointAgentTool {
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
}

export function azureAISearchAgentToolSerializer(
  item: AzureAISearchAgentTool,
): any {
  return { type: item["type"] };
}

export function azureAISearchAgentToolDeserializer(
  item: any,
): AzureAISearchAgentTool {
  return {
    type: item["type"],
  };
}

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

export function openApiFunctionDefinitionSerializer(
  item: OpenApiFunctionDefinition,
): any {
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

export function openApiFunctionDefinitionDeserializer(
  item: any,
): OpenApiFunctionDefinition {
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

export function openApiAuthDetailsUnionSerializer(
  item: OpenApiAuthDetailsUnion,
): any {
  switch (item.type) {
    case "anonymous":
      return openApiAnonymousAuthDetailsSerializer(
        item as OpenApiAnonymousAuthDetails,
      );

    case "project_connection":
      return openApiProjectConnectionAuthDetailsSerializer(
        item as OpenApiProjectConnectionAuthDetails,
      );

    case "managed_identity":
      return openApiManagedAuthDetailsSerializer(
        item as OpenApiManagedAuthDetails,
      );

    default:
      return openApiAuthDetailsSerializer(item);
  }
}

export function openApiAuthDetailsUnionDeserializer(
  item: any,
): OpenApiAuthDetailsUnion {
  switch (item.type) {
    case "anonymous":
      return openApiAnonymousAuthDetailsDeserializer(
        item as OpenApiAnonymousAuthDetails,
      );

    case "project_connection":
      return openApiProjectConnectionAuthDetailsDeserializer(
        item as OpenApiProjectConnectionAuthDetails,
      );

    case "managed_identity":
      return openApiManagedAuthDetailsDeserializer(
        item as OpenApiManagedAuthDetails,
      );

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
export type OpenApiAuthType =
  | "anonymous"
  | "project_connection"
  | "managed_identity";

/** Security details for OpenApi anonymous authentication */
export interface OpenApiAnonymousAuthDetails extends OpenApiAuthDetails {
  /** The object type, which is always 'anonymous'. */
  type: "anonymous";
}

export function openApiAnonymousAuthDetailsSerializer(
  item: OpenApiAnonymousAuthDetails,
): any {
  return { type: item["type"] };
}

export function openApiAnonymousAuthDetailsDeserializer(
  item: any,
): OpenApiAnonymousAuthDetails {
  return {
    type: item["type"],
  };
}

/** Security details for OpenApi project connection authentication */
export interface OpenApiProjectConnectionAuthDetails
  extends OpenApiAuthDetails {
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
    security_scheme: openApiProjectConnectionSecuritySchemeSerializer(
      item["securityScheme"],
    ),
  };
}

export function openApiProjectConnectionAuthDetailsDeserializer(
  item: any,
): OpenApiProjectConnectionAuthDetails {
  return {
    type: item["type"],
    securityScheme: openApiProjectConnectionSecuritySchemeDeserializer(
      item["security_scheme"],
    ),
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

export function openApiManagedAuthDetailsSerializer(
  item: OpenApiManagedAuthDetails,
): any {
  return {
    type: item["type"],
    security_scheme: openApiManagedSecuritySchemeSerializer(
      item["securityScheme"],
    ),
  };
}

export function openApiManagedAuthDetailsDeserializer(
  item: any,
): OpenApiManagedAuthDetails {
  return {
    type: item["type"],
    securityScheme: openApiManagedSecuritySchemeDeserializer(
      item["security_scheme"],
    ),
  };
}

/** Security scheme for OpenApi managed_identity authentication */
export interface OpenApiManagedSecurityScheme {
  /** Authentication scope for managed_identity auth type */
  audience: string;
}

export function openApiManagedSecuritySchemeSerializer(
  item: OpenApiManagedSecurityScheme,
): any {
  return { audience: item["audience"] };
}

export function openApiManagedSecuritySchemeDeserializer(
  item: any,
): OpenApiManagedSecurityScheme {
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
  type: "bing_custom_search";
  /** The bing custom search tool parameters. */
  bingCustomSearch: BingCustomSearchToolParameters;
}

export function bingCustomSearchAgentToolSerializer(
  item: BingCustomSearchAgentTool,
): any {
  return {
    type: item["type"],
    bing_custom_search: bingCustomSearchToolParametersSerializer(
      item["bingCustomSearch"],
    ),
  };
}

export function bingCustomSearchAgentToolDeserializer(
  item: any,
): BingCustomSearchAgentTool {
  return {
    type: item["type"],
    bingCustomSearch: bingCustomSearchToolParametersDeserializer(
      item["bing_custom_search"],
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

export function bingCustomSearchConfigurationSerializer(
  item: BingCustomSearchConfiguration,
): any {
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

/** The input definition information for a connected agent tool which defines a domain specific sub-agent */
export interface ConnectedAgentAgentTool extends Tool {
  /** The object type, which is always 'connected_agent'. */
  type: "connected_agent";
  /** The sub-agent to connect */
  connectedAgent: ConnectedAgentDetails;
}

export function connectedAgentAgentToolSerializer(
  item: ConnectedAgentAgentTool,
): any {
  return {
    type: item["type"],
    connected_agent: connectedAgentDetailsSerializer(item["connectedAgent"]),
  };
}

export function connectedAgentAgentToolDeserializer(
  item: any,
): ConnectedAgentAgentTool {
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

export function connectedAgentDetailsSerializer(
  item: ConnectedAgentDetails,
): any {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
  };
}

export function connectedAgentDetailsDeserializer(
  item: any,
): ConnectedAgentDetails {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
  };
}

/** The input definition information for a Browser Automation Tool, as used to configure an Agent. */
export interface BrowserAutomationAgentTool extends Tool {
  /** The object type, which is always 'browser_automation'. */
  type: "browser_automation";
  /** The Browser Automation Tool parameters. */
  browserAutomation: BrowserAutomationToolParameters;
}

export function browserAutomationAgentToolSerializer(
  item: BrowserAutomationAgentTool,
): any {
  return {
    type: item["type"],
    browser_automation: browserAutomationToolParametersSerializer(
      item["browserAutomation"],
    ),
  };
}

export function browserAutomationAgentToolDeserializer(
  item: any,
): BrowserAutomationAgentTool {
  return {
    type: item["type"],
    browserAutomation: browserAutomationToolParametersDeserializer(
      item["browser_automation"],
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

/** A tool for capturing structured outputs */
export interface CaptureStructuredOutputsTool extends Tool {
  /** The type of the tool. Always `capture_structured_outputs`. */
  type: "capture_structured_outputs";
  /** Set of structured outputs to capture from the model. */
  outputs: Record<string, StructuredOutputDefinition>;
}

export function captureStructuredOutputsToolSerializer(
  item: CaptureStructuredOutputsTool,
): any {
  return {
    type: item["type"],
    outputs: structuredOutputDefinitionRecordSerializer(item["outputs"]),
  };
}

export function captureStructuredOutputsToolDeserializer(
  item: any,
): CaptureStructuredOutputsTool {
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
    result[key] = !item[key]
      ? item[key]
      : structuredOutputDefinitionSerializer(item[key]);
  });
  return result;
}

export function structuredOutputDefinitionRecordDeserializer(
  item: Record<string, any>,
): Record<string, StructuredOutputDefinition> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : structuredOutputDefinitionDeserializer(item[key]);
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

export function structuredOutputDefinitionSerializer(
  item: StructuredOutputDefinition,
): any {
  return { description: item["description"], schema: item["schema"] };
}

export function structuredOutputDefinitionDeserializer(
  item: any,
): StructuredOutputDefinition {
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

export function captureSemanticEventsToolSerializer(
  item: CaptureSemanticEventsTool,
): any {
  return {
    type: item["type"],
    events: semanticEventDefinitionRecordSerializer(item["events"]),
  };
}

export function captureSemanticEventsToolDeserializer(
  item: any,
): CaptureSemanticEventsTool {
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
    result[key] = !item[key]
      ? item[key]
      : semanticEventDefinitionSerializer(item[key]);
  });
  return result;
}

export function semanticEventDefinitionRecordDeserializer(
  item: Record<string, any>,
): Record<string, SemanticEventDefinition> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : semanticEventDefinitionDeserializer(item[key]);
  });
  return result;
}

/** An event that can be raised by the agent based on a semantic condition. */
export interface SemanticEventDefinition {
  /** A condition that specifies when the event must be raised. Used by the model to determine when to raise the event. */
  condition: string;
}

export function semanticEventDefinitionSerializer(
  item: SemanticEventDefinition,
): any {
  return { condition: item["condition"] };
}

export function semanticEventDefinitionDeserializer(
  item: any,
): SemanticEventDefinition {
  return {
    condition: item["condition"],
  };
}

/** An agent implementing the A2A protocol. */
export interface A2ATool extends Tool {
  /** The type of the tool. Always `a2a`. */
  type: "a2a";
  /** Base URL of the agent. */
  baseUrl: string;
  /**
   * The path to the agent card relative to the `base_url`.
   * If not provided, defaults to  `/.well-known/agent-card.json`
   */
  agentCardPath?: string;
}

export function a2AToolSerializer(item: A2ATool): any {
  return {
    type: item["type"],
    base_url: item["baseUrl"],
    agent_card_path: item["agentCardPath"],
  };
}

export function a2AToolDeserializer(item: any): A2ATool {
  return {
    type: item["type"],
    baseUrl: item["base_url"],
    agentCardPath: item["agent_card_path"],
  };
}

/** model interface _PromptAgentDefinitionText */
export interface _PromptAgentDefinitionText {
  format?: ResponseTextFormatConfigurationUnion;
}

export function _promptAgentDefinitionTextSerializer(
  item: _PromptAgentDefinitionText,
): any {
  return {
    format: !item["format"]
      ? item["format"]
      : responseTextFormatConfigurationUnionSerializer(item["format"]),
  };
}

export function _promptAgentDefinitionTextDeserializer(
  item: any,
): _PromptAgentDefinitionText {
  return {
    format: !item["format"]
      ? item["format"]
      : responseTextFormatConfigurationUnionDeserializer(item["format"]),
  };
}

/** model interface ResponseTextFormatConfiguration */
export interface ResponseTextFormatConfiguration {
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
export type ResponseTextFormatConfigurationType =
  | "text"
  | "json_schema"
  | "json_object";

/** model interface ResponseTextFormatConfigurationText */
export interface ResponseTextFormatConfigurationText
  extends ResponseTextFormatConfiguration {
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
export interface ResponseTextFormatConfigurationJsonObject
  extends ResponseTextFormatConfiguration {
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
export interface ResponseTextFormatConfigurationJsonSchema
  extends ResponseTextFormatConfiguration {
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
  schema: ResponseFormatJsonSchemaSchema;
  /**
   * Whether to enable strict schema adherence when generating the output.
   * If set to true, the model will always follow the exact schema defined
   * in the `schema` field. Only a subset of JSON Schema is supported when
   * `strict` is `true`. To learn more, read the [Structured Outputs
   * guide](/docs/guides/structured-outputs).
   */
  strict?: boolean | null;
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
    result[key] = !item[key]
      ? item[key]
      : structuredInputDefinitionSerializer(item[key]);
  });
  return result;
}

export function structuredInputDefinitionRecordDeserializer(
  item: Record<string, any>,
): Record<string, StructuredInputDefinition> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : structuredInputDefinitionDeserializer(item[key]);
  });
  return result;
}

/** An structured input that can participate in prompt template substitutions and tool argument binding. */
export interface StructuredInputDefinition {
  /** A human-readable description of the input. */
  description?: string;
  /** The default value for the input if no run-time value is provided. */
  defaultValue?: any;
  /** When provided, the input value is binded to the specified tool arguments. */
  toolArgumentBindings?: ToolArgumentBinding[];
  /** The JSON schema for the structured input (optional). */
  schema?: any;
  /** Whether the input property is required when the agent is invoked. */
  required?: boolean;
}

export function structuredInputDefinitionSerializer(
  item: StructuredInputDefinition,
): any {
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

export function structuredInputDefinitionDeserializer(
  item: any,
): StructuredInputDefinition {
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

export function toolArgumentBindingArraySerializer(
  result: Array<ToolArgumentBinding>,
): any[] {
  return result.map((item) => {
    return toolArgumentBindingSerializer(item);
  });
}

export function toolArgumentBindingArrayDeserializer(
  result: Array<ToolArgumentBinding>,
): any[] {
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

export function toolArgumentBindingDeserializer(
  item: any,
): ToolArgumentBinding {
  return {
    toolName: item["tool_name"],
    argumentName: item["argument_name"],
  };
}

/** model interface ApiError */
export interface ApiError {
  code: string;
  message: string;
  details?: string;
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

export function deleteAgentResponseDeserializer(
  item: any,
): DeleteAgentResponse {
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

export function agentObjectArrayDeserializer(
  result: Array<AgentObject>,
): any[] {
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

export function deleteAgentVersionResponseDeserializer(
  item: any,
): DeleteAgentVersionResponse {
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

export function agentVersionObjectArrayDeserializer(
  result: Array<AgentVersionObject>,
): any[] {
  return result.map((item) => {
    return agentVersionObjectDeserializer(item);
  });
}

/** model interface AgentEventHandlerFilter */
export interface AgentEventHandlerFilter {
  /** The agent versions where this handler is applicable. */
  agentVersions: string[];
}

export function agentEventHandlerFilterSerializer(
  item: AgentEventHandlerFilter,
): any {
  return {
    agent_versions: item["agentVersions"].map((p: any) => {
      return p;
    }),
  };
}

export function agentEventHandlerFilterDeserializer(
  item: any,
): AgentEventHandlerFilter {
  return {
    agentVersions: item["agent_versions"].map((p: any) => {
      return p;
    }),
  };
}

/** model interface AgentEventHandlerDestination */
export interface AgentEventHandlerDestination {
  type: AgentEventHandlerDestinationType;
}

export function agentEventHandlerDestinationSerializer(
  item: AgentEventHandlerDestination,
): any {
  return { type: item["type"] };
}

export function agentEventHandlerDestinationDeserializer(
  item: any,
): AgentEventHandlerDestination {
  return {
    type: item["type"],
  };
}

/** Alias for AgentEventHandlerDestinationUnion */
export type AgentEventHandlerDestinationUnion =
  | EvalsDestination
  | AgentEventHandlerDestination;

export function agentEventHandlerDestinationUnionSerializer(
  item: AgentEventHandlerDestinationUnion,
): any {
  switch (item.type) {
    case "evals":
      return evalsDestinationSerializer(item as EvalsDestination);

    default:
      return agentEventHandlerDestinationSerializer(item);
  }
}

export function agentEventHandlerDestinationUnionDeserializer(
  item: any,
): AgentEventHandlerDestinationUnion {
  switch (item.type) {
    case "evals":
      return evalsDestinationDeserializer(item as EvalsDestination);

    default:
      return agentEventHandlerDestinationDeserializer(item);
  }
}

/** Type of AgentEventHandlerDestinationType */
export type AgentEventHandlerDestinationType = "evals";

/** model interface EvalsDestination */
export interface EvalsDestination extends AgentEventHandlerDestination {
  type: "evals";
  /** The eval Id where new run for the agent response will be created. */
  evalId: string;
  /** The maximum number of times the eval runs will be invoked via this handler per hour. */
  maxHourlyRuns?: number;
}

export function evalsDestinationSerializer(item: EvalsDestination): any {
  return {
    type: item["type"],
    eval_id: item["evalId"],
    max_hourly_runs: item["maxHourlyRuns"],
  };
}

export function evalsDestinationDeserializer(item: any): EvalsDestination {
  return {
    type: item["type"],
    evalId: item["eval_id"],
    maxHourlyRuns: item["max_hourly_runs"],
  };
}

/** Type of AgentEventType */
export type AgentEventType = "response.completed";

/** An object that listens for agent-generated events and forwards them to a destination for processing. */
export interface AgentEventHandlerObject {
  /** The object type, which is always 'agent.event_handler'. */
  object: "agent.event_handler";
  /** The unique identifier of the event handler. Every event handler update creates a new ID. */
  id: string;
  /** The name of the event handler. */
  name: string;
  /** Arbitrary key-value metadata to associate with the event handler. */
  metadata?: Record<string, string>;
  /** The Unix timestamp (seconds) when the event handler was created. */
  createdAt: Date;
  /** The event types the handler listens to. */
  eventTypes: AgentEventType[];
  /** An optional filter condition where this event handler is applicable. */
  filter?: AgentEventHandlerFilter;
  /** The destination where the event handler will send the event. */
  destination: AgentEventHandlerDestinationUnion;
}

export function agentEventHandlerObjectDeserializer(
  item: any,
): AgentEventHandlerObject {
  return {
    object: item["object"],
    id: item["id"],
    name: item["name"],
    metadata: item["metadata"],
    createdAt: new Date(item["created_at"] * 1000),
    eventTypes: item["event_types"].map((p: any) => {
      return p;
    }),
    filter: !item["filter"]
      ? item["filter"]
      : agentEventHandlerFilterDeserializer(item["filter"]),
    destination: agentEventHandlerDestinationUnionDeserializer(
      item["destination"],
    ),
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultAgentEventHandlerObject {
  /** The requested list of items. */
  data: AgentEventHandlerObject[];
  /** The first ID represented in this list. */
  firstId?: string;
  /** The last ID represented in this list. */
  lastId?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

export function _agentsPagedResultAgentEventHandlerObjectDeserializer(
  item: any,
): _AgentsPagedResultAgentEventHandlerObject {
  return {
    data: agentEventHandlerObjectArrayDeserializer(item["data"]),
    firstId: item["first_id"],
    lastId: item["last_id"],
    hasMore: item["has_more"],
  };
}

export function agentEventHandlerObjectArrayDeserializer(
  result: Array<AgentEventHandlerObject>,
): any[] {
  return result.map((item) => {
    return agentEventHandlerObjectDeserializer(item);
  });
}

/** A deleted agent event handler Object */
export interface DeleteAgentEventHandlerResponse {
  /** The object type. Always 'agent.deleted'. */
  object: "agent.event_handler.deleted";
  /** The event handler name of the agent. */
  name: string;
  /** Whether the agent event handlerwas successfully deleted. */
  deleted: boolean;
}

export function deleteAgentEventHandlerResponseDeserializer(
  item: any,
): DeleteAgentEventHandlerResponse {
  return {
    object: item["object"],
    name: item["name"],
    deleted: item["deleted"],
  };
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
    error: !item["error"]
      ? item["error"]
      : agentContainerOperationErrorDeserializer(item["error"]),
    container: !item["container"]
      ? item["container"]
      : agentContainerObjectDeserializer(item["container"]),
  };
}

/** Status of the container operation for a specific version of an agent. */
export type AgentContainerOperationStatus =
  | "NotStarted"
  | "InProgress"
  | "Succeeded"
  | "Failed";

/** The error details of the container operation, if any. */
export interface AgentContainerOperationError {
  /** The error code of the container operation, if any. */
  code: string;
  /** The error type of the container operation, if any. */
  type: string;
  /** The error message of the container operation, if any. */
  message: string;
}

export function agentContainerOperationErrorDeserializer(
  item: any,
): AgentContainerOperationError {
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

export function agentContainerObjectDeserializer(
  item: any,
): AgentContainerObject {
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
export interface AgentsPagedResultAgentContainerOperationObject {
  /** The requested list of items. */
  data: AgentContainerOperationObject[];
  /** The first ID represented in this list. */
  firstId?: string;
  /** The last ID represented in this list. */
  lastId?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

export function agentsPagedResultAgentContainerOperationObjectDeserializer(
  item: any,
): AgentsPagedResultAgentContainerOperationObject {
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

/** Content item used to generate a response. */
export interface ItemParam {
  type: ItemType;
}

export function itemParamSerializer(item: ItemParam): any {
  return { type: item["type"] };
}

export function itemParamDeserializer(item: any): ItemParam {
  return {
    type: item["type"],
  };
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
  | ItemParam;

export function itemParamUnionSerializer(item: ItemParamUnion): any {
  switch (item.type) {
    case "structured_inputs":
      return structuredInputsItemParamSerializer(
        item as StructuredInputsItemParam,
      );

    case "message":
      return responsesMessageItemParamUnionSerializer(
        item as ResponsesMessageItemParamUnion,
      );

    case "function_call_output":
      return functionToolCallOutputItemParamSerializer(
        item as FunctionToolCallOutputItemParam,
      );

    case "file_search_call":
      return fileSearchToolCallItemParamSerializer(
        item as FileSearchToolCallItemParam,
      );

    case "computer_call":
      return computerToolCallItemParamSerializer(
        item as ComputerToolCallItemParam,
      );

    case "computer_call_output":
      return computerToolCallOutputItemParamSerializer(
        item as ComputerToolCallOutputItemParam,
      );

    case "web_search_call":
      return webSearchToolCallItemParamSerializer(
        item as WebSearchToolCallItemParam,
      );

    case "function_call":
      return functionToolCallItemParamSerializer(
        item as FunctionToolCallItemParam,
      );

    case "reasoning":
      return reasoningItemParamSerializer(item as ReasoningItemParam);

    case "item_reference":
      return itemReferenceItemParamSerializer(item as ItemReferenceItemParam);

    case "image_generation_call":
      return imageGenToolCallItemParamSerializer(
        item as ImageGenToolCallItemParam,
      );

    case "code_interpreter_call":
      return codeInterpreterToolCallItemParamSerializer(
        item as CodeInterpreterToolCallItemParam,
      );

    case "local_shell_call":
      return localShellToolCallItemParamSerializer(
        item as LocalShellToolCallItemParam,
      );

    case "local_shell_call_output":
      return localShellToolCallOutputItemParamSerializer(
        item as LocalShellToolCallOutputItemParam,
      );

    case "mcp_list_tools":
      return mcpListToolsItemParamSerializer(item as MCPListToolsItemParam);

    case "mcp_approval_request":
      return mcpApprovalRequestItemParamSerializer(
        item as MCPApprovalRequestItemParam,
      );

    case "mcp_approval_response":
      return mcpApprovalResponseItemParamSerializer(
        item as MCPApprovalResponseItemParam,
      );

    case "mcp_call":
      return mcpCallItemParamSerializer(item as MCPCallItemParam);

    default:
      return itemParamSerializer(item);
  }
}

export function itemParamUnionDeserializer(item: any): ItemParamUnion {
  switch (item.type) {
    case "structured_inputs":
      return structuredInputsItemParamDeserializer(
        item as StructuredInputsItemParam,
      );

    case "message":
      return responsesMessageItemParamUnionDeserializer(
        item as ResponsesMessageItemParamUnion,
      );

    case "function_call_output":
      return functionToolCallOutputItemParamDeserializer(
        item as FunctionToolCallOutputItemParam,
      );

    case "file_search_call":
      return fileSearchToolCallItemParamDeserializer(
        item as FileSearchToolCallItemParam,
      );

    case "computer_call":
      return computerToolCallItemParamDeserializer(
        item as ComputerToolCallItemParam,
      );

    case "computer_call_output":
      return computerToolCallOutputItemParamDeserializer(
        item as ComputerToolCallOutputItemParam,
      );

    case "web_search_call":
      return webSearchToolCallItemParamDeserializer(
        item as WebSearchToolCallItemParam,
      );

    case "function_call":
      return functionToolCallItemParamDeserializer(
        item as FunctionToolCallItemParam,
      );

    case "reasoning":
      return reasoningItemParamDeserializer(item as ReasoningItemParam);

    case "item_reference":
      return itemReferenceItemParamDeserializer(item as ItemReferenceItemParam);

    case "image_generation_call":
      return imageGenToolCallItemParamDeserializer(
        item as ImageGenToolCallItemParam,
      );

    case "code_interpreter_call":
      return codeInterpreterToolCallItemParamDeserializer(
        item as CodeInterpreterToolCallItemParam,
      );

    case "local_shell_call":
      return localShellToolCallItemParamDeserializer(
        item as LocalShellToolCallItemParam,
      );

    case "local_shell_call_output":
      return localShellToolCallOutputItemParamDeserializer(
        item as LocalShellToolCallOutputItemParam,
      );

    case "mcp_list_tools":
      return mcpListToolsItemParamDeserializer(item as MCPListToolsItemParam);

    case "mcp_approval_request":
      return mcpApprovalRequestItemParamDeserializer(
        item as MCPApprovalRequestItemParam,
      );

    case "mcp_approval_response":
      return mcpApprovalResponseItemParamDeserializer(
        item as MCPApprovalResponseItemParam,
      );

    case "mcp_call":
      return mcpCallItemParamDeserializer(item as MCPCallItemParam);

    default:
      return itemParamDeserializer(item);
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
  | "workflow_action";

/** model interface StructuredInputsItemParam */
export interface StructuredInputsItemParam extends ItemParam {
  type: "structured_inputs";
  /** The structured inputs to the response. */
  inputs?: Record<string, any>;
}

export function structuredInputsItemParamSerializer(
  item: StructuredInputsItemParam,
): any {
  return { type: item["type"], inputs: item["inputs"] };
}

export function structuredInputsItemParamDeserializer(
  item: any,
): StructuredInputsItemParam {
  return {
    type: item["type"],
    inputs: item["inputs"],
  };
}

/** A response message item, representing a role and content, as provided as client request parameters. */
export interface ResponsesMessageItemParam extends ItemParam {
  /** The type of the responses item, which is always 'message'. */
  type: "message";
  /** The role associated with the message. */
  /** The discriminator possible values: user, system, developer, assistant */
  role: ResponsesMessageRole;
}

export function responsesMessageItemParamSerializer(
  item: ResponsesMessageItemParam,
): any {
  return { type: item["type"], role: item["role"] };
}

export function responsesMessageItemParamDeserializer(
  item: any,
): ResponsesMessageItemParam {
  return {
    type: item["type"],
    role: item["role"],
  };
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
      return responsesUserMessageItemParamSerializer(
        item as ResponsesUserMessageItemParam,
      );

    case "system":
      return responsesSystemMessageItemParamSerializer(
        item as ResponsesSystemMessageItemParam,
      );

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

export function responsesMessageItemParamUnionDeserializer(
  item: any,
): ResponsesMessageItemParamUnion {
  switch (item.role) {
    case "user":
      return responsesUserMessageItemParamDeserializer(
        item as ResponsesUserMessageItemParam,
      );

    case "system":
      return responsesSystemMessageItemParamDeserializer(
        item as ResponsesSystemMessageItemParam,
      );

    case "developer":
      return responsesDeveloperMessageItemParamDeserializer(
        item as ResponsesDeveloperMessageItemParam,
      );

    case "assistant":
      return responsesAssistantMessageItemParamDeserializer(
        item as ResponsesAssistantMessageItemParam,
      );

    default:
      return responsesMessageItemParamDeserializer(item);
  }
}

/** The collection of valid roles for responses message items. */
export type ResponsesMessageRole =
  | "system"
  | "developer"
  | "user"
  | "assistant";

/** A message parameter item with the `user` role. */
export interface ResponsesUserMessageItemParam
  extends ResponsesMessageItemParam {
  /** The role of the message, which is always `user`. */
  role: "user";
  /** The content associated with the message. */
  content: string | ItemContentUnion[];
}

export function responsesUserMessageItemParamSerializer(
  item: ResponsesUserMessageItemParam,
): any {
  return {
    type: item["type"],
    role: item["role"],
    content: _responsesUserMessageItemParamContentSerializer(item["content"]),
  };
}

export function responsesUserMessageItemParamDeserializer(
  item: any,
): ResponsesUserMessageItemParam {
  return {
    type: item["type"],
    role: item["role"],
    content: _responsesUserMessageItemParamContentDeserializer(item["content"]),
  };
}

/** Alias for _ResponsesUserMessageItemParamContent */
export type _ResponsesUserMessageItemParamContent = string | ItemContentUnion[];

export function _responsesUserMessageItemParamContentSerializer(
  item: _ResponsesUserMessageItemParamContent,
): any {
  return item;
}

export function _responsesUserMessageItemParamContentDeserializer(
  item: any,
): _ResponsesUserMessageItemParamContent {
  return item;
}

export function itemContentUnionArraySerializer(
  result: Array<ItemContentUnion>,
): any[] {
  return result.map((item) => {
    return itemContentUnionSerializer(item);
  });
}

export function itemContentUnionArrayDeserializer(
  result: Array<ItemContentUnion>,
): any[] {
  return result.map((item) => {
    return itemContentUnionDeserializer(item);
  });
}

/** model interface ItemContent */
export interface ItemContent {
  type: ItemContentType;
}

export function itemContentSerializer(item: ItemContent): any {
  return { type: item["type"] };
}

export function itemContentDeserializer(item: any): ItemContent {
  return {
    type: item["type"],
  };
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

export function itemContentUnionDeserializer(item: any): ItemContentUnion {
  switch (item.type) {
    case "input_audio":
      return itemContentInputAudioDeserializer(item as ItemContentInputAudio);

    case "output_audio":
      return itemContentOutputAudioDeserializer(item as ItemContentOutputAudio);

    case "refusal":
      return itemContentRefusalDeserializer(item as ItemContentRefusal);

    case "input_text":
      return itemContentInputTextDeserializer(item as ItemContentInputText);

    case "input_image":
      return itemContentInputImageDeserializer(item as ItemContentInputImage);

    case "input_file":
      return itemContentInputFileDeserializer(item as ItemContentInputFile);

    case "output_text":
      return itemContentOutputTextDeserializer(item as ItemContentOutputText);

    default:
      return itemContentDeserializer(item);
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

export function itemContentInputAudioSerializer(
  item: ItemContentInputAudio,
): any {
  return { type: item["type"], data: item["data"], format: item["format"] };
}

export function itemContentInputAudioDeserializer(
  item: any,
): ItemContentInputAudio {
  return {
    type: item["type"],
    data: item["data"],
    format: item["format"],
  };
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

export function itemContentOutputAudioSerializer(
  item: ItemContentOutputAudio,
): any {
  return {
    type: item["type"],
    data: item["data"],
    transcript: item["transcript"],
  };
}

export function itemContentOutputAudioDeserializer(
  item: any,
): ItemContentOutputAudio {
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

export function itemContentRefusalDeserializer(item: any): ItemContentRefusal {
  return {
    type: item["type"],
    refusal: item["refusal"],
  };
}

/** A text input to the model. */
export interface ItemContentInputText extends ItemContent {
  /** The type of the input item. Always `input_text`. */
  type: "input_text";
  /** The text input to the model. */
  text: string;
}

export function itemContentInputTextSerializer(
  item: ItemContentInputText,
): any {
  return { type: item["type"], text: item["text"] };
}

export function itemContentInputTextDeserializer(
  item: any,
): ItemContentInputText {
  return {
    type: item["type"],
    text: item["text"],
  };
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

export function itemContentInputImageSerializer(
  item: ItemContentInputImage,
): any {
  return {
    type: item["type"],
    image_url: item["imageUrl"],
    file_id: item["fileId"],
    detail: item["detail"],
  };
}

export function itemContentInputImageDeserializer(
  item: any,
): ItemContentInputImage {
  return {
    type: item["type"],
    imageUrl: item["image_url"],
    fileId: item["file_id"],
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

export function itemContentInputFileSerializer(
  item: ItemContentInputFile,
): any {
  return {
    type: item["type"],
    file_id: item["fileId"],
    filename: item["filename"],
    file_data: item["fileData"],
  };
}

export function itemContentInputFileDeserializer(
  item: any,
): ItemContentInputFile {
  return {
    type: item["type"],
    fileId: item["file_id"],
    filename: item["filename"],
    fileData: item["file_data"],
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
  logprobs?: LogProb[];
}

export function itemContentOutputTextSerializer(
  item: ItemContentOutputText,
): any {
  return {
    type: item["type"],
    text: item["text"],
    annotations: annotationUnionArraySerializer(item["annotations"]),
    logprobs: !item["logprobs"]
      ? item["logprobs"]
      : logProbArraySerializer(item["logprobs"]),
  };
}

export function itemContentOutputTextDeserializer(
  item: any,
): ItemContentOutputText {
  return {
    type: item["type"],
    text: item["text"],
    annotations: annotationUnionArrayDeserializer(item["annotations"]),
    logprobs: !item["logprobs"]
      ? item["logprobs"]
      : logProbArrayDeserializer(item["logprobs"]),
  };
}

export function annotationUnionArraySerializer(
  result: Array<AnnotationUnion>,
): any[] {
  return result.map((item) => {
    return annotationUnionSerializer(item);
  });
}

export function annotationUnionArrayDeserializer(
  result: Array<AnnotationUnion>,
): any[] {
  return result.map((item) => {
    return annotationUnionDeserializer(item);
  });
}

/** model interface Annotation */
export interface Annotation {
  type: AnnotationType;
}

export function annotationSerializer(item: Annotation): any {
  return { type: item["type"] };
}

export function annotationDeserializer(item: any): Annotation {
  return {
    type: item["type"],
  };
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

export function annotationUnionDeserializer(item: any): AnnotationUnion {
  switch (item.type) {
    case "file_citation":
      return annotationFileCitationDeserializer(item as AnnotationFileCitation);

    case "url_citation":
      return annotationUrlCitationDeserializer(item as AnnotationUrlCitation);

    case "file_path":
      return annotationFilePathDeserializer(item as AnnotationFilePath);

    default:
      return annotationDeserializer(item);
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

export function annotationFileCitationSerializer(
  item: AnnotationFileCitation,
): any {
  return {
    type: item["type"],
    file_id: item["fileId"],
    index: item["index"],
    filename: item["filename"],
  };
}

export function annotationFileCitationDeserializer(
  item: any,
): AnnotationFileCitation {
  return {
    type: item["type"],
    fileId: item["file_id"],
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

export function annotationUrlCitationSerializer(
  item: AnnotationUrlCitation,
): any {
  return {
    type: item["type"],
    url: item["url"],
    start_index: item["startIndex"],
    end_index: item["endIndex"],
    title: item["title"],
  };
}

export function annotationUrlCitationDeserializer(
  item: any,
): AnnotationUrlCitation {
  return {
    type: item["type"],
    url: item["url"],
    startIndex: item["start_index"],
    endIndex: item["end_index"],
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

export function annotationFilePathDeserializer(item: any): AnnotationFilePath {
  return {
    type: item["type"],
    fileId: item["file_id"],
    index: item["index"],
  };
}

export function logProbArraySerializer(result: Array<LogProb>): any[] {
  return result.map((item) => {
    return logProbSerializer(item);
  });
}

export function logProbArrayDeserializer(result: Array<LogProb>): any[] {
  return result.map((item) => {
    return logProbDeserializer(item);
  });
}

/** The log probability of a token. */
export interface LogProb {
  token: string;
  logprob: number;
  bytes: number[];
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

export function logProbDeserializer(item: any): LogProb {
  return {
    token: item["token"],
    logprob: item["logprob"],
    bytes: item["bytes"].map((p: any) => {
      return p;
    }),
    topLogprobs: topLogProbArrayDeserializer(item["top_logprobs"]),
  };
}

export function topLogProbArraySerializer(result: Array<TopLogProb>): any[] {
  return result.map((item) => {
    return topLogProbSerializer(item);
  });
}

export function topLogProbArrayDeserializer(result: Array<TopLogProb>): any[] {
  return result.map((item) => {
    return topLogProbDeserializer(item);
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

export function topLogProbDeserializer(item: any): TopLogProb {
  return {
    token: item["token"],
    logprob: item["logprob"],
    bytes: item["bytes"].map((p: any) => {
      return p;
    }),
  };
}

/** A message parameter item with the `system` role. */
export interface ResponsesSystemMessageItemParam
  extends ResponsesMessageItemParam {
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

export function responsesSystemMessageItemParamDeserializer(
  item: any,
): ResponsesSystemMessageItemParam {
  return {
    type: item["type"],
    role: item["role"],
    content: _responsesSystemMessageItemParamContentDeserializer(
      item["content"],
    ),
  };
}

/** Alias for _ResponsesSystemMessageItemParamContent */
export type _ResponsesSystemMessageItemParamContent =
  | string
  | ItemContentUnion[];

export function _responsesSystemMessageItemParamContentSerializer(
  item: _ResponsesSystemMessageItemParamContent,
): any {
  return item;
}

export function _responsesSystemMessageItemParamContentDeserializer(
  item: any,
): _ResponsesSystemMessageItemParamContent {
  return item;
}

/** A message parameter item with the `developer` role. */
export interface ResponsesDeveloperMessageItemParam
  extends ResponsesMessageItemParam {
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
    content: _responsesDeveloperMessageItemParamContentSerializer(
      item["content"],
    ),
  };
}

export function responsesDeveloperMessageItemParamDeserializer(
  item: any,
): ResponsesDeveloperMessageItemParam {
  return {
    type: item["type"],
    role: item["role"],
    content: _responsesDeveloperMessageItemParamContentDeserializer(
      item["content"],
    ),
  };
}

/** Alias for _ResponsesDeveloperMessageItemParamContent */
export type _ResponsesDeveloperMessageItemParamContent =
  | string
  | ItemContentUnion[];

export function _responsesDeveloperMessageItemParamContentSerializer(
  item: _ResponsesDeveloperMessageItemParamContent,
): any {
  return item;
}

export function _responsesDeveloperMessageItemParamContentDeserializer(
  item: any,
): _ResponsesDeveloperMessageItemParamContent {
  return item;
}

/** A message parameter item with the `assistant` role. */
export interface ResponsesAssistantMessageItemParam
  extends ResponsesMessageItemParam {
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
    content: _responsesAssistantMessageItemParamContentSerializer(
      item["content"],
    ),
  };
}

export function responsesAssistantMessageItemParamDeserializer(
  item: any,
): ResponsesAssistantMessageItemParam {
  return {
    type: item["type"],
    role: item["role"],
    content: _responsesAssistantMessageItemParamContentDeserializer(
      item["content"],
    ),
  };
}

/** Alias for _ResponsesAssistantMessageItemParamContent */
export type _ResponsesAssistantMessageItemParamContent =
  | string
  | ItemContentUnion[];

export function _responsesAssistantMessageItemParamContentSerializer(
  item: _ResponsesAssistantMessageItemParamContent,
): any {
  return item;
}

export function _responsesAssistantMessageItemParamContentDeserializer(
  item: any,
): _ResponsesAssistantMessageItemParamContent {
  return item;
}

/**
 * The output of a function tool call.
 *
 */
export interface FunctionToolCallOutputItemParam extends ItemParam {
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

export function functionToolCallOutputItemParamDeserializer(
  item: any,
): FunctionToolCallOutputItemParam {
  return {
    type: item["type"],
    callId: item["call_id"],
    output: item["output"],
  };
}

/**
 * The results of a file search tool call. See the
 * [file search guide](/docs/guides/tools-file-search) for more information.
 *
 */
export interface FileSearchToolCallItemParam extends ItemParam {
  type: "file_search_call";
  /** The queries used to search for files. */
  queries: string[];
  /** The results of the file search tool call. */
  results?:
    | {
        fileId?: string;
        text?: string;
        filename?: string;
        attributes?: VectorStoreFileAttributes;
        score?: number;
      }[]
    | null;
}

export function fileSearchToolCallItemParamSerializer(
  item: FileSearchToolCallItemParam,
): any {
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

export function fileSearchToolCallItemParamDeserializer(
  item: any,
): FileSearchToolCallItemParam {
  return {
    type: item["type"],
    queries: item["queries"].map((p: any) => {
      return p;
    }),
    results: !item["results"]
      ? item["results"]
      : _fileSearchToolCallItemParamResultArrayDeserializer(item["results"]),
  };
}

export function _fileSearchToolCallItemParamResultArraySerializer(
  result: Array<_FileSearchToolCallItemParamResult>,
): any[] {
  return result.map((item) => {
    return _fileSearchToolCallItemParamResultSerializer(item);
  });
}

export function _fileSearchToolCallItemParamResultArrayDeserializer(
  result: Array<_FileSearchToolCallItemParamResult>,
): any[] {
  return result.map((item) => {
    return _fileSearchToolCallItemParamResultDeserializer(item);
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

export function _fileSearchToolCallItemParamResultDeserializer(
  item: any,
): _FileSearchToolCallItemParamResult {
  return {
    fileId: item["file_id"],
    text: item["text"],
    filename: item["filename"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : vectorStoreFileAttributesDeserializer(item["attributes"]),
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

export function vectorStoreFileAttributesSerializer(
  item: VectorStoreFileAttributes,
): any {
  return {
    ...serializeRecord(
      item.additionalProperties,
      undefined,
      _vectorStoreFileAttributesAdditionalPropertySerializer,
    ),
  };
}

export function vectorStoreFileAttributesDeserializer(
  item: any,
): VectorStoreFileAttributes {
  return {
    additionalProperties: serializeRecord(
      item,
      [],
      _vectorStoreFileAttributesAdditionalPropertyDeserializer,
    ),
  };
}

/** Alias for _VectorStoreFileAttributesAdditionalProperty */
export type _VectorStoreFileAttributesAdditionalProperty =
  | string
  | boolean
  | number
  | number;

export function _vectorStoreFileAttributesAdditionalPropertySerializer(
  item: _VectorStoreFileAttributesAdditionalProperty,
): any {
  return item;
}

export function _vectorStoreFileAttributesAdditionalPropertyDeserializer(
  item: any,
): _VectorStoreFileAttributesAdditionalProperty {
  return item;
}

/**
 * A tool call to a computer use tool. See the
 * [computer use guide](/docs/guides/tools-computer-use) for more information.
 *
 */
export interface ComputerToolCallItemParam extends ItemParam {
  type: "computer_call";
  /** An identifier used when responding to the tool call with output. */
  callId: string;
  action: ComputerActionUnion;
  /** The pending safety checks for the computer call. */
  pendingSafetyChecks: ComputerToolCallSafetyCheck[];
}

export function computerToolCallItemParamSerializer(
  item: ComputerToolCallItemParam,
): any {
  return {
    type: item["type"],
    call_id: item["callId"],
    action: computerActionUnionSerializer(item["action"]),
    pending_safety_checks: computerToolCallSafetyCheckArraySerializer(
      item["pendingSafetyChecks"],
    ),
  };
}

export function computerToolCallItemParamDeserializer(
  item: any,
): ComputerToolCallItemParam {
  return {
    type: item["type"],
    callId: item["call_id"],
    action: computerActionUnionDeserializer(item["action"]),
    pendingSafetyChecks: computerToolCallSafetyCheckArrayDeserializer(
      item["pending_safety_checks"],
    ),
  };
}

/** model interface ComputerAction */
export interface ComputerAction {
  type: ComputerActionType;
}

export function computerActionSerializer(item: ComputerAction): any {
  return { type: item["type"] };
}

export function computerActionDeserializer(item: any): ComputerAction {
  return {
    type: item["type"],
  };
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
      return computerActionDoubleClickSerializer(
        item as ComputerActionDoubleClick,
      );

    case "drag":
      return computerActionDragSerializer(item as ComputerActionDrag);

    case "move":
      return computerActionMoveSerializer(item as ComputerActionMove);

    case "screenshot":
      return computerActionScreenshotSerializer(
        item as ComputerActionScreenshot,
      );

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

export function computerActionUnionDeserializer(
  item: any,
): ComputerActionUnion {
  switch (item.type) {
    case "click":
      return computerActionClickDeserializer(item as ComputerActionClick);

    case "double_click":
      return computerActionDoubleClickDeserializer(
        item as ComputerActionDoubleClick,
      );

    case "drag":
      return computerActionDragDeserializer(item as ComputerActionDrag);

    case "move":
      return computerActionMoveDeserializer(item as ComputerActionMove);

    case "screenshot":
      return computerActionScreenshotDeserializer(
        item as ComputerActionScreenshot,
      );

    case "scroll":
      return computerActionScrollDeserializer(item as ComputerActionScroll);

    case "type":
      return computerActionTypeKeysDeserializer(item as ComputerActionTypeKeys);

    case "wait":
      return computerActionWaitDeserializer(item as ComputerActionWait);

    case "keypress":
      return computerActionKeyPressDeserializer(item as ComputerActionKeyPress);

    default:
      return computerActionDeserializer(item);
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

export function computerActionClickDeserializer(
  item: any,
): ComputerActionClick {
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

export function computerActionDoubleClickSerializer(
  item: ComputerActionDoubleClick,
): any {
  return { type: item["type"], x: item["x"], y: item["y"] };
}

export function computerActionDoubleClickDeserializer(
  item: any,
): ComputerActionDoubleClick {
  return {
    type: item["type"],
    x: item["x"],
    y: item["y"],
  };
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

export function computerActionDragDeserializer(item: any): ComputerActionDrag {
  return {
    type: item["type"],
    path: coordinateArrayDeserializer(item["path"]),
  };
}

export function coordinateArraySerializer(result: Array<Coordinate>): any[] {
  return result.map((item) => {
    return coordinateSerializer(item);
  });
}

export function coordinateArrayDeserializer(result: Array<Coordinate>): any[] {
  return result.map((item) => {
    return coordinateDeserializer(item);
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

export function coordinateDeserializer(item: any): Coordinate {
  return {
    x: item["x"],
    y: item["y"],
  };
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

export function computerActionMoveDeserializer(item: any): ComputerActionMove {
  return {
    type: item["type"],
    x: item["x"],
    y: item["y"],
  };
}

/** A screenshot action. */
export interface ComputerActionScreenshot extends ComputerAction {
  /**
   * Specifies the event type. For a screenshot action, this property is
   * always set to `screenshot`.
   */
  type: "screenshot";
}

export function computerActionScreenshotSerializer(
  item: ComputerActionScreenshot,
): any {
  return { type: item["type"] };
}

export function computerActionScreenshotDeserializer(
  item: any,
): ComputerActionScreenshot {
  return {
    type: item["type"],
  };
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

export function computerActionScrollSerializer(
  item: ComputerActionScroll,
): any {
  return {
    type: item["type"],
    x: item["x"],
    y: item["y"],
    scroll_x: item["scrollX"],
    scroll_y: item["scrollY"],
  };
}

export function computerActionScrollDeserializer(
  item: any,
): ComputerActionScroll {
  return {
    type: item["type"],
    x: item["x"],
    y: item["y"],
    scrollX: item["scroll_x"],
    scrollY: item["scroll_y"],
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

export function computerActionTypeKeysSerializer(
  item: ComputerActionTypeKeys,
): any {
  return { type: item["type"], text: item["text"] };
}

export function computerActionTypeKeysDeserializer(
  item: any,
): ComputerActionTypeKeys {
  return {
    type: item["type"],
    text: item["text"],
  };
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

export function computerActionWaitDeserializer(item: any): ComputerActionWait {
  return {
    type: item["type"],
  };
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

export function computerActionKeyPressSerializer(
  item: ComputerActionKeyPress,
): any {
  return {
    type: item["type"],
    keys: item["keys"].map((p: any) => {
      return p;
    }),
  };
}

export function computerActionKeyPressDeserializer(
  item: any,
): ComputerActionKeyPress {
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

export function computerToolCallSafetyCheckArrayDeserializer(
  result: Array<ComputerToolCallSafetyCheck>,
): any[] {
  return result.map((item) => {
    return computerToolCallSafetyCheckDeserializer(item);
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

export function computerToolCallSafetyCheckSerializer(
  item: ComputerToolCallSafetyCheck,
): any {
  return { id: item["id"], code: item["code"], message: item["message"] };
}

export function computerToolCallSafetyCheckDeserializer(
  item: any,
): ComputerToolCallSafetyCheck {
  return {
    id: item["id"],
    code: item["code"],
    message: item["message"],
  };
}

/**
 * The output of a computer tool call.
 *
 */
export interface ComputerToolCallOutputItemParam extends ItemParam {
  type: "computer_call_output";
  /** The ID of the computer tool call that produced the output. */
  callId: string;
  /**
   * The safety checks reported by the API that have been acknowledged by the
   * developer.
   */
  acknowledgedSafetyChecks?: ComputerToolCallSafetyCheck[];
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
      : computerToolCallSafetyCheckArraySerializer(
          item["acknowledgedSafetyChecks"],
        ),
    output: computerToolCallOutputItemOutputUnionSerializer(item["output"]),
  };
}

export function computerToolCallOutputItemParamDeserializer(
  item: any,
): ComputerToolCallOutputItemParam {
  return {
    type: item["type"],
    callId: item["call_id"],
    acknowledgedSafetyChecks: !item["acknowledged_safety_checks"]
      ? item["acknowledged_safety_checks"]
      : computerToolCallSafetyCheckArrayDeserializer(
          item["acknowledged_safety_checks"],
        ),
    output: computerToolCallOutputItemOutputUnionDeserializer(item["output"]),
  };
}

/** model interface ComputerToolCallOutputItemOutput */
export interface ComputerToolCallOutputItemOutput {
  type: ComputerToolCallOutputItemOutputType;
}

export function computerToolCallOutputItemOutputSerializer(
  item: ComputerToolCallOutputItemOutput,
): any {
  return { type: item["type"] };
}

export function computerToolCallOutputItemOutputDeserializer(
  item: any,
): ComputerToolCallOutputItemOutput {
  return {
    type: item["type"],
  };
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

export function computerToolCallOutputItemOutputUnionDeserializer(
  item: any,
): ComputerToolCallOutputItemOutputUnion {
  switch (item.type) {
    case "computer_screenshot":
      return computerToolCallOutputItemOutputComputerScreenshotDeserializer(
        item as ComputerToolCallOutputItemOutputComputerScreenshot,
      );

    default:
      return computerToolCallOutputItemOutputDeserializer(item);
  }
}

/** A computer screenshot image used with the computer use tool. */
export type ComputerToolCallOutputItemOutputType = "computer_screenshot";

/** model interface ComputerToolCallOutputItemOutputComputerScreenshot */
export interface ComputerToolCallOutputItemOutputComputerScreenshot
  extends ComputerToolCallOutputItemOutput {
  type: "computer_screenshot";
  imageUrl?: string;
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

export function computerToolCallOutputItemOutputComputerScreenshotDeserializer(
  item: any,
): ComputerToolCallOutputItemOutputComputerScreenshot {
  return {
    type: item["type"],
    imageUrl: item["image_url"],
    fileId: item["file_id"],
  };
}

/**
 * The results of a web search tool call. See the
 * [web search guide](/docs/guides/tools-web-search) for more information.
 *
 */
export interface WebSearchToolCallItemParam extends ItemParam {
  type: "web_search_call";
  /**
   * An object describing the specific action taken in this web search call.
   * Includes details on how the model used the web (search, open_page, find).
   */
  action: WebSearchActionUnion;
}

export function webSearchToolCallItemParamSerializer(
  item: WebSearchToolCallItemParam,
): any {
  return {
    type: item["type"],
    action: webSearchActionUnionSerializer(item["action"]),
  };
}

export function webSearchToolCallItemParamDeserializer(
  item: any,
): WebSearchToolCallItemParam {
  return {
    type: item["type"],
    action: webSearchActionUnionDeserializer(item["action"]),
  };
}

/** model interface WebSearchAction */
export interface WebSearchAction {
  type: WebSearchActionType;
}

export function webSearchActionSerializer(item: WebSearchAction): any {
  return { type: item["type"] };
}

export function webSearchActionDeserializer(item: any): WebSearchAction {
  return {
    type: item["type"],
  };
}

/** Alias for WebSearchActionUnion */
export type WebSearchActionUnion =
  | WebSearchActionFind
  | WebSearchActionOpenPage
  | WebSearchActionSearch
  | WebSearchAction;

export function webSearchActionUnionSerializer(
  item: WebSearchActionUnion,
): any {
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

export function webSearchActionUnionDeserializer(
  item: any,
): WebSearchActionUnion {
  switch (item.type) {
    case "find":
      return webSearchActionFindDeserializer(item as WebSearchActionFind);

    case "open_page":
      return webSearchActionOpenPageDeserializer(
        item as WebSearchActionOpenPage,
      );

    case "search":
      return webSearchActionSearchDeserializer(item as WebSearchActionSearch);

    default:
      return webSearchActionDeserializer(item);
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

export function webSearchActionFindDeserializer(
  item: any,
): WebSearchActionFind {
  return {
    type: item["type"],
    url: item["url"],
    pattern: item["pattern"],
  };
}

/** Action type "open_page" - Opens a specific URL from search results. */
export interface WebSearchActionOpenPage extends WebSearchAction {
  /** The action type. */
  type: "open_page";
  /** The URL opened by the model. */
  url: string;
}

export function webSearchActionOpenPageSerializer(
  item: WebSearchActionOpenPage,
): any {
  return { type: item["type"], url: item["url"] };
}

export function webSearchActionOpenPageDeserializer(
  item: any,
): WebSearchActionOpenPage {
  return {
    type: item["type"],
    url: item["url"],
  };
}

/** Action type "search" - Performs a web search query. */
export interface WebSearchActionSearch extends WebSearchAction {
  /** The action type. */
  type: "search";
  /** The search query. */
  query: string;
}

export function webSearchActionSearchSerializer(
  item: WebSearchActionSearch,
): any {
  return { type: item["type"], query: item["query"] };
}

export function webSearchActionSearchDeserializer(
  item: any,
): WebSearchActionSearch {
  return {
    type: item["type"],
    query: item["query"],
  };
}

/**
 * A tool call to run a function. See the
 * [function calling guide](/docs/guides/function-calling) for more information.
 *
 */
export interface FunctionToolCallItemParam extends ItemParam {
  type: "function_call";
  /** The unique ID of the function tool call generated by the model. */
  callId: string;
  /** The name of the function to run. */
  name: string;
  /** A JSON string of the arguments to pass to the function. */
  arguments: string;
}

export function functionToolCallItemParamSerializer(
  item: FunctionToolCallItemParam,
): any {
  return {
    type: item["type"],
    call_id: item["callId"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

export function functionToolCallItemParamDeserializer(
  item: any,
): FunctionToolCallItemParam {
  return {
    type: item["type"],
    callId: item["call_id"],
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

export function reasoningItemParamDeserializer(item: any): ReasoningItemParam {
  return {
    type: item["type"],
    encryptedContent: item["encrypted_content"],
    summary: reasoningItemSummaryPartUnionArrayDeserializer(item["summary"]),
  };
}

export function reasoningItemSummaryPartUnionArraySerializer(
  result: Array<ReasoningItemSummaryPartUnion>,
): any[] {
  return result.map((item) => {
    return reasoningItemSummaryPartUnionSerializer(item);
  });
}

export function reasoningItemSummaryPartUnionArrayDeserializer(
  result: Array<ReasoningItemSummaryPartUnion>,
): any[] {
  return result.map((item) => {
    return reasoningItemSummaryPartUnionDeserializer(item);
  });
}

/** model interface ReasoningItemSummaryPart */
export interface ReasoningItemSummaryPart {
  type: ReasoningItemSummaryPartType;
}

export function reasoningItemSummaryPartSerializer(
  item: ReasoningItemSummaryPart,
): any {
  return { type: item["type"] };
}

export function reasoningItemSummaryPartDeserializer(
  item: any,
): ReasoningItemSummaryPart {
  return {
    type: item["type"],
  };
}

/** Alias for ReasoningItemSummaryPartUnion */
export type ReasoningItemSummaryPartUnion =
  | ReasoningItemSummaryTextPart
  | ReasoningItemSummaryPart;

export function reasoningItemSummaryPartUnionSerializer(
  item: ReasoningItemSummaryPartUnion,
): any {
  switch (item.type) {
    case "summary_text":
      return reasoningItemSummaryTextPartSerializer(
        item as ReasoningItemSummaryTextPart,
      );

    default:
      return reasoningItemSummaryPartSerializer(item);
  }
}

export function reasoningItemSummaryPartUnionDeserializer(
  item: any,
): ReasoningItemSummaryPartUnion {
  switch (item.type) {
    case "summary_text":
      return reasoningItemSummaryTextPartDeserializer(
        item as ReasoningItemSummaryTextPart,
      );

    default:
      return reasoningItemSummaryPartDeserializer(item);
  }
}

/** Type of ReasoningItemSummaryPartType */
export type ReasoningItemSummaryPartType = "summary_text";

/** model interface ReasoningItemSummaryTextPart */
export interface ReasoningItemSummaryTextPart extends ReasoningItemSummaryPart {
  type: "summary_text";
  text: string;
}

export function reasoningItemSummaryTextPartSerializer(
  item: ReasoningItemSummaryTextPart,
): any {
  return { type: item["type"], text: item["text"] };
}

export function reasoningItemSummaryTextPartDeserializer(
  item: any,
): ReasoningItemSummaryTextPart {
  return {
    type: item["type"],
    text: item["text"],
  };
}

/** An internal identifier for an item to reference. */
export interface ItemReferenceItemParam extends ItemParam {
  type: "item_reference";
  /** The service-originated ID of the previously generated response item being referenced. */
  id: string;
}

export function itemReferenceItemParamSerializer(
  item: ItemReferenceItemParam,
): any {
  return { type: item["type"], id: item["id"] };
}

export function itemReferenceItemParamDeserializer(
  item: any,
): ItemReferenceItemParam {
  return {
    type: item["type"],
    id: item["id"],
  };
}

/**
 * An image generation request made by the model.
 *
 */
export interface ImageGenToolCallItemParam extends ItemParam {
  type: "image_generation_call";
  /** The generated image encoded in base64. */
  result: string | null;
}

export function imageGenToolCallItemParamSerializer(
  item: ImageGenToolCallItemParam,
): any {
  return { type: item["type"], result: item["result"] };
}

export function imageGenToolCallItemParamDeserializer(
  item: any,
): ImageGenToolCallItemParam {
  return {
    type: item["type"],
    result: item["result"],
  };
}

/**
 * A tool call to run code.
 *
 */
export interface CodeInterpreterToolCallItemParam extends ItemParam {
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

export function codeInterpreterToolCallItemParamDeserializer(
  item: any,
): CodeInterpreterToolCallItemParam {
  return {
    type: item["type"],
    containerId: item["container_id"],
    code: item["code"],
    outputs: !item["outputs"]
      ? item["outputs"]
      : codeInterpreterOutputUnionArrayDeserializer(item["outputs"]),
  };
}

export function codeInterpreterOutputUnionArraySerializer(
  result: Array<CodeInterpreterOutputUnion>,
): any[] {
  return result.map((item) => {
    return codeInterpreterOutputUnionSerializer(item);
  });
}

export function codeInterpreterOutputUnionArrayDeserializer(
  result: Array<CodeInterpreterOutputUnion>,
): any[] {
  return result.map((item) => {
    return codeInterpreterOutputUnionDeserializer(item);
  });
}

/** model interface CodeInterpreterOutput */
export interface CodeInterpreterOutput {
  type: CodeInterpreterOutputType;
}

export function codeInterpreterOutputSerializer(
  item: CodeInterpreterOutput,
): any {
  return { type: item["type"] };
}

export function codeInterpreterOutputDeserializer(
  item: any,
): CodeInterpreterOutput {
  return {
    type: item["type"],
  };
}

/** Alias for CodeInterpreterOutputUnion */
export type CodeInterpreterOutputUnion =
  | CodeInterpreterOutputImage
  | CodeInterpreterOutputLogs
  | CodeInterpreterOutput;

export function codeInterpreterOutputUnionSerializer(
  item: CodeInterpreterOutputUnion,
): any {
  switch (item.type) {
    case "image":
      return codeInterpreterOutputImageSerializer(
        item as CodeInterpreterOutputImage,
      );

    case "logs":
      return codeInterpreterOutputLogsSerializer(
        item as CodeInterpreterOutputLogs,
      );

    default:
      return codeInterpreterOutputSerializer(item);
  }
}

export function codeInterpreterOutputUnionDeserializer(
  item: any,
): CodeInterpreterOutputUnion {
  switch (item.type) {
    case "image":
      return codeInterpreterOutputImageDeserializer(
        item as CodeInterpreterOutputImage,
      );

    case "logs":
      return codeInterpreterOutputLogsDeserializer(
        item as CodeInterpreterOutputLogs,
      );

    default:
      return codeInterpreterOutputDeserializer(item);
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

export function codeInterpreterOutputImageSerializer(
  item: CodeInterpreterOutputImage,
): any {
  return { type: item["type"], url: item["url"] };
}

export function codeInterpreterOutputImageDeserializer(
  item: any,
): CodeInterpreterOutputImage {
  return {
    type: item["type"],
    url: item["url"],
  };
}

/** The logs output from the code interpreter. */
export interface CodeInterpreterOutputLogs extends CodeInterpreterOutput {
  /** The type of the output. Always 'logs'. */
  type: "logs";
  /** The logs output from the code interpreter. */
  logs: string;
}

export function codeInterpreterOutputLogsSerializer(
  item: CodeInterpreterOutputLogs,
): any {
  return { type: item["type"], logs: item["logs"] };
}

export function codeInterpreterOutputLogsDeserializer(
  item: any,
): CodeInterpreterOutputLogs {
  return {
    type: item["type"],
    logs: item["logs"],
  };
}

/**
 * A tool call to run a command on the local shell.
 *
 */
export interface LocalShellToolCallItemParam extends ItemParam {
  type: "local_shell_call";
  /** The unique ID of the local shell tool call generated by the model. */
  callId: string;
  action: LocalShellExecAction;
}

export function localShellToolCallItemParamSerializer(
  item: LocalShellToolCallItemParam,
): any {
  return {
    type: item["type"],
    call_id: item["callId"],
    action: localShellExecActionSerializer(item["action"]),
  };
}

export function localShellToolCallItemParamDeserializer(
  item: any,
): LocalShellToolCallItemParam {
  return {
    type: item["type"],
    callId: item["call_id"],
    action: localShellExecActionDeserializer(item["action"]),
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

export function localShellExecActionSerializer(
  item: LocalShellExecAction,
): any {
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

export function localShellExecActionDeserializer(
  item: any,
): LocalShellExecAction {
  return {
    type: item["type"],
    command: item["command"].map((p: any) => {
      return p;
    }),
    timeoutMs: item["timeout_ms"],
    workingDirectory: item["working_directory"],
    env: item["env"],
    user: item["user"],
  };
}

/**
 * The output of a local shell tool call.
 *
 */
export interface LocalShellToolCallOutputItemParam extends ItemParam {
  type: "local_shell_call_output";
  /** A JSON string of the output of the local shell tool call. */
  output: string;
}

export function localShellToolCallOutputItemParamSerializer(
  item: LocalShellToolCallOutputItemParam,
): any {
  return { type: item["type"], output: item["output"] };
}

export function localShellToolCallOutputItemParamDeserializer(
  item: any,
): LocalShellToolCallOutputItemParam {
  return {
    type: item["type"],
    output: item["output"],
  };
}

/**
 * A list of tools available on an MCP server.
 *
 */
export interface MCPListToolsItemParam extends ItemParam {
  type: "mcp_list_tools";
  /** The label of the MCP server. */
  serverLabel: string;
  /** The tools available on the server. */
  tools: MCPListToolsTool[];
  /** Error message if the server could not list tools. */
  error?: string | null;
}

export function mcpListToolsItemParamSerializer(
  item: MCPListToolsItemParam,
): any {
  return {
    type: item["type"],
    server_label: item["serverLabel"],
    tools: mcpListToolsToolArraySerializer(item["tools"]),
    error: item["error"],
  };
}

export function mcpListToolsItemParamDeserializer(
  item: any,
): MCPListToolsItemParam {
  return {
    type: item["type"],
    serverLabel: item["server_label"],
    tools: mcpListToolsToolArrayDeserializer(item["tools"]),
    error: item["error"],
  };
}

export function mcpListToolsToolArraySerializer(
  result: Array<MCPListToolsTool>,
): any[] {
  return result.map((item) => {
    return mcpListToolsToolSerializer(item);
  });
}

export function mcpListToolsToolArrayDeserializer(
  result: Array<MCPListToolsTool>,
): any[] {
  return result.map((item) => {
    return mcpListToolsToolDeserializer(item);
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

export function mcpListToolsToolDeserializer(item: any): MCPListToolsTool {
  return {
    name: item["name"],
    description: item["description"],
    inputSchema: item["input_schema"],
    annotations: item["annotations"],
  };
}

/**
 * A request for human approval of a tool invocation.
 *
 */
export interface MCPApprovalRequestItemParam extends ItemParam {
  type: "mcp_approval_request";
  /** The label of the MCP server making the request. */
  serverLabel: string;
  /** The name of the tool to run. */
  name: string;
  /** A JSON string of arguments for the tool. */
  arguments: string;
}

export function mcpApprovalRequestItemParamSerializer(
  item: MCPApprovalRequestItemParam,
): any {
  return {
    type: item["type"],
    server_label: item["serverLabel"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

export function mcpApprovalRequestItemParamDeserializer(
  item: any,
): MCPApprovalRequestItemParam {
  return {
    type: item["type"],
    serverLabel: item["server_label"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

/**
 * A response to an MCP approval request.
 *
 */
export interface MCPApprovalResponseItemParam extends ItemParam {
  type: "mcp_approval_response";
  /** The ID of the approval request being answered. */
  approvalRequestId: string;
  /** Whether the request was approved. */
  approve: boolean;
  /** Optional reason for the decision. */
  reason?: string | null;
}

export function mcpApprovalResponseItemParamSerializer(
  item: MCPApprovalResponseItemParam,
): any {
  return {
    type: item["type"],
    approval_request_id: item["approvalRequestId"],
    approve: item["approve"],
    reason: item["reason"],
  };
}

export function mcpApprovalResponseItemParamDeserializer(
  item: any,
): MCPApprovalResponseItemParam {
  return {
    type: item["type"],
    approvalRequestId: item["approval_request_id"],
    approve: item["approve"],
    reason: item["reason"],
  };
}

/**
 * An invocation of a tool on an MCP server.
 *
 */
export interface MCPCallItemParam extends ItemParam {
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

export function mcpCallItemParamDeserializer(item: any): MCPCallItemParam {
  return {
    type: item["type"],
    serverLabel: item["server_label"],
    name: item["name"],
    arguments: item["arguments"],
    output: item["output"],
    error: item["error"],
  };
}

export function itemParamUnionArraySerializer(
  result: Array<ItemParamUnion>,
): any[] {
  return result.map((item) => {
    return itemParamUnionSerializer(item);
  });
}

export function itemParamUnionArrayDeserializer(
  result: Array<ItemParamUnion>,
): any[] {
  return result.map((item) => {
    return itemParamUnionDeserializer(item);
  });
}

/** model interface ConversationResource */
export interface ConversationResource {
  /** The unique ID of the conversation. */
  id: string;
  /** The object type, which is always 'conversation'. */
  object: "conversation";
  createdAt: Date;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata: Record<string, string> | null;
}

export function conversationResourceDeserializer(
  item: any,
): ConversationResource {
  return {
    id: item["id"],
    object: item["object"],
    createdAt: new Date(item["created_at"] * 1000),
    metadata: item["metadata"],
  };
}

/** model interface DeletedConversationResource */
export interface DeletedConversationResource {
  object: "conversation.deleted";
  deleted: boolean;
  id: string;
}

export function deletedConversationResourceDeserializer(
  item: any,
): DeletedConversationResource {
  return {
    object: item["object"],
    deleted: item["deleted"],
    id: item["id"],
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultConversationResource {
  /** The requested list of items. */
  data: ConversationResource[];
  /** The first ID represented in this list. */
  firstId?: string;
  /** The last ID represented in this list. */
  lastId?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

export function _agentsPagedResultConversationResourceDeserializer(
  item: any,
): _AgentsPagedResultConversationResource {
  return {
    data: conversationResourceArrayDeserializer(item["data"]),
    firstId: item["first_id"],
    lastId: item["last_id"],
    hasMore: item["has_more"],
  };
}

export function conversationResourceArrayDeserializer(
  result: Array<ConversationResource>,
): any[] {
  return result.map((item) => {
    return conversationResourceDeserializer(item);
  });
}

/** model interface ConversationItemList */
export interface ConversationItemList {
  object: "list";
  data: ItemResourceUnion[];
  hasMore: boolean;
  firstId: string;
  lastId: string;
}

export function conversationItemListDeserializer(
  item: any,
): ConversationItemList {
  return {
    object: item["object"],
    data: itemResourceUnionArrayDeserializer(item["data"]),
    hasMore: item["has_more"],
    firstId: item["first_id"],
    lastId: item["last_id"],
  };
}

export function itemResourceUnionArrayDeserializer(
  result: Array<ItemResourceUnion>,
): any[] {
  return result.map((item) => {
    return itemResourceUnionDeserializer(item);
  });
}

/** Content item used to generate a response. */
export interface ItemResource {
  type: ItemType;
  id: string;
}

export function itemResourceDeserializer(item: any): ItemResource {
  return {
    type: item["type"],
    id: item["id"],
  };
}

/** Alias for ItemResourceUnion */
export type ItemResourceUnion =
  | StructuredInputsItemResource
  | StructuredOutputsItemResource
  | SemanticEventsOutputItemResource
  | WorkflowActionOutputItemResourceUnion
  | ResponsesMessageItemResourceUnion
  | ComputerToolCallOutputItemResource
  | FunctionToolCallItemResource
  | FunctionToolCallOutputItemResource
  | MCPApprovalResponseItemResource
  | FileSearchToolCallItemResource
  | ComputerToolCallItemResource
  | WebSearchToolCallItemResource
  | ReasoningItemResource
  | ImageGenToolCallItemResource
  | CodeInterpreterToolCallItemResource
  | LocalShellToolCallItemResource
  | LocalShellToolCallOutputItemResource
  | MCPListToolsItemResource
  | MCPApprovalRequestItemResource
  | MCPCallItemResource
  | ItemResource;

export function itemResourceUnionDeserializer(item: any): ItemResourceUnion {
  switch (item.type) {
    case "structured_inputs":
      return structuredInputsItemResourceDeserializer(
        item as StructuredInputsItemResource,
      );

    case "structured_outputs":
      return structuredOutputsItemResourceDeserializer(
        item as StructuredOutputsItemResource,
      );

    case "semantic_event":
      return semanticEventsOutputItemResourceDeserializer(
        item as SemanticEventsOutputItemResource,
      );

    case "workflow_action":
      return workflowActionOutputItemResourceUnionDeserializer(
        item as WorkflowActionOutputItemResourceUnion,
      );

    case "message":
      return responsesMessageItemResourceUnionDeserializer(
        item as ResponsesMessageItemResourceUnion,
      );

    case "computer_call_output":
      return computerToolCallOutputItemResourceDeserializer(
        item as ComputerToolCallOutputItemResource,
      );

    case "function_call":
      return functionToolCallItemResourceDeserializer(
        item as FunctionToolCallItemResource,
      );

    case "function_call_output":
      return functionToolCallOutputItemResourceDeserializer(
        item as FunctionToolCallOutputItemResource,
      );

    case "mcp_approval_response":
      return mcpApprovalResponseItemResourceDeserializer(
        item as MCPApprovalResponseItemResource,
      );

    case "file_search_call":
      return fileSearchToolCallItemResourceDeserializer(
        item as FileSearchToolCallItemResource,
      );

    case "computer_call":
      return computerToolCallItemResourceDeserializer(
        item as ComputerToolCallItemResource,
      );

    case "web_search_call":
      return webSearchToolCallItemResourceDeserializer(
        item as WebSearchToolCallItemResource,
      );

    case "reasoning":
      return reasoningItemResourceDeserializer(item as ReasoningItemResource);

    case "image_generation_call":
      return imageGenToolCallItemResourceDeserializer(
        item as ImageGenToolCallItemResource,
      );

    case "code_interpreter_call":
      return codeInterpreterToolCallItemResourceDeserializer(
        item as CodeInterpreterToolCallItemResource,
      );

    case "local_shell_call":
      return localShellToolCallItemResourceDeserializer(
        item as LocalShellToolCallItemResource,
      );

    case "local_shell_call_output":
      return localShellToolCallOutputItemResourceDeserializer(
        item as LocalShellToolCallOutputItemResource,
      );

    case "mcp_list_tools":
      return mcpListToolsItemResourceDeserializer(
        item as MCPListToolsItemResource,
      );

    case "mcp_approval_request":
      return mcpApprovalRequestItemResourceDeserializer(
        item as MCPApprovalRequestItemResource,
      );

    case "mcp_call":
      return mcpCallItemResourceDeserializer(item as MCPCallItemResource);

    default:
      return itemResourceDeserializer(item);
  }
}

/** model interface StructuredInputsItemResource */
export interface StructuredInputsItemResource extends ItemResource {
  type: "structured_inputs";
  /** The structured inputs provided to the response. */
  inputs?: Record<string, any>;
}

export function structuredInputsItemResourceDeserializer(
  item: any,
): StructuredInputsItemResource {
  return {
    type: item["type"],
    id: item["id"],
    inputs: item["inputs"],
  };
}

/** model interface StructuredOutputsItemResource */
export interface StructuredOutputsItemResource extends ItemResource {
  type: "structured_outputs";
  /** The structured outputs captured during the response. */
  outputs?: Record<string, any>;
}

export function structuredOutputsItemResourceDeserializer(
  item: any,
): StructuredOutputsItemResource {
  return {
    type: item["type"],
    id: item["id"],
    outputs: item["outputs"],
  };
}

/** model interface SemanticEventsOutputItemResource */
export interface SemanticEventsOutputItemResource extends ItemResource {
  type: "semantic_event";
  /** The name of the semantic event. */
  name: string;
}

export function semanticEventsOutputItemResourceDeserializer(
  item: any,
): SemanticEventsOutputItemResource {
  return {
    type: item["type"],
    id: item["id"],
    name: item["name"],
  };
}

/** model interface WorkflowActionOutputItemResource */
export interface WorkflowActionOutputItemResource extends ItemResource {
  type: "workflow_action";
  /** The kind of CPSDL action (e.g., 'SetVariable', 'InvokeAzureAgent'). */
  /** The discriminator possible values: InvokeAzureAgent */
  kind: string;
  /** Unique identifier for the action. */
  actionId: string;
  /** ID of the parent action if this is a nested action. */
  parentActionId?: string;
  /** ID of the previous action if this action follows another. */
  previousActionId?: string;
  /** Status of the action (e.g., 'in_progress', 'completed', 'failed', 'cancelled'). */
  status: "completed" | "failed" | "in_progress" | "cancelled";
}

export function workflowActionOutputItemResourceDeserializer(
  item: any,
): WorkflowActionOutputItemResource {
  return {
    type: item["type"],
    id: item["id"],
    kind: item["kind"],
    actionId: item["action_id"],
    parentActionId: item["parent_action_id"],
    previousActionId: item["previous_action_id"],
    status: item["status"],
  };
}

/** Alias for WorkflowActionOutputItemResourceUnion */
export type WorkflowActionOutputItemResourceUnion =
  | InvokeAzureAgentWorkflowActionOutputItemResource
  | WorkflowActionOutputItemResource;

export function workflowActionOutputItemResourceUnionDeserializer(
  item: any,
): WorkflowActionOutputItemResourceUnion {
  switch (item.kind) {
    case "InvokeAzureAgent":
      return invokeAzureAgentWorkflowActionOutputItemResourceDeserializer(
        item as InvokeAzureAgentWorkflowActionOutputItemResource,
      );

    default:
      return workflowActionOutputItemResourceDeserializer(item);
  }
}

/** Details about an agent invocation as part of a workflow action. */
export interface InvokeAzureAgentWorkflowActionOutputItemResource
  extends WorkflowActionOutputItemResource {
  kind: "InvokeAzureAgent";
  /** Agent id. */
  agent: AgentId;
  /** ID of the conversation for the agent invocation. */
  conversationId?: string;
  /** The response id for the agent invocation. */
  responseId: string;
}

export function invokeAzureAgentWorkflowActionOutputItemResourceDeserializer(
  item: any,
): InvokeAzureAgentWorkflowActionOutputItemResource {
  return {
    type: item["type"],
    kind: item["kind"],
    actionId: item["action_id"],
    parentActionId: item["parent_action_id"],
    previousActionId: item["previous_action_id"],
    status: item["status"],
    id: item["id"],
    agent: agentIdDeserializer(item["agent"]),
    conversationId: item["conversation_id"],
    responseId: item["response_id"],
  };
}

/** model interface AgentId */
export interface AgentId {
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

/** A response message resource item, representing a role and content, as provided on service responses. */
export interface ResponsesMessageItemResource extends ItemResource {
  /** The type of the responses item, which is always 'message'. */
  type: "message";
  /**
   * The status of the item. One of `in_progress`, `completed`, or
   * `incomplete`. Populated when items are returned via API.
   */
  status: "in_progress" | "completed" | "incomplete";
  /** The role associated with the message. */
  /** The discriminator possible values: user, system, developer, assistant */
  role: ResponsesMessageRole;
}

export function responsesMessageItemResourceDeserializer(
  item: any,
): ResponsesMessageItemResource {
  return {
    type: item["type"],
    id: item["id"],
    status: item["status"],
    role: item["role"],
  };
}

/** Alias for ResponsesMessageItemResourceUnion */
export type ResponsesMessageItemResourceUnion =
  | ResponsesUserMessageItemResource
  | ResponsesSystemMessageItemResource
  | ResponsesDeveloperMessageItemResource
  | ResponsesAssistantMessageItemResource
  | ResponsesMessageItemResource;

export function responsesMessageItemResourceUnionDeserializer(
  item: any,
): ResponsesMessageItemResourceUnion {
  switch (item.role) {
    case "user":
      return responsesUserMessageItemResourceDeserializer(
        item as ResponsesUserMessageItemResource,
      );

    case "system":
      return responsesSystemMessageItemResourceDeserializer(
        item as ResponsesSystemMessageItemResource,
      );

    case "developer":
      return responsesDeveloperMessageItemResourceDeserializer(
        item as ResponsesDeveloperMessageItemResource,
      );

    case "assistant":
      return responsesAssistantMessageItemResourceDeserializer(
        item as ResponsesAssistantMessageItemResource,
      );

    default:
      return responsesMessageItemResourceDeserializer(item);
  }
}

/** A message resource item with the `user` role. */
export interface ResponsesUserMessageItemResource
  extends ResponsesMessageItemResource {
  /** The role of the message, which is always `user`. */
  role: "user";
  /** The content associated with the message. */
  content: ItemContentUnion[];
}

export function responsesUserMessageItemResourceDeserializer(
  item: any,
): ResponsesUserMessageItemResource {
  return {
    type: item["type"],
    status: item["status"],
    role: item["role"],
    id: item["id"],
    content: itemContentUnionArrayDeserializer(item["content"]),
  };
}

/** A message resource item with the `system` role. */
export interface ResponsesSystemMessageItemResource
  extends ResponsesMessageItemResource {
  /** The role of the message, which is always `system`. */
  role: "system";
  /** The content associated with the message. */
  content: ItemContentUnion[];
}

export function responsesSystemMessageItemResourceDeserializer(
  item: any,
): ResponsesSystemMessageItemResource {
  return {
    type: item["type"],
    status: item["status"],
    role: item["role"],
    id: item["id"],
    content: itemContentUnionArrayDeserializer(item["content"]),
  };
}

/** A message resource item with the `developer` role. */
export interface ResponsesDeveloperMessageItemResource
  extends ResponsesMessageItemResource {
  /** The role of the message, which is always `developer`. */
  role: "developer";
  /** The content associated with the message. */
  content: ItemContentUnion[];
}

export function responsesDeveloperMessageItemResourceDeserializer(
  item: any,
): ResponsesDeveloperMessageItemResource {
  return {
    type: item["type"],
    status: item["status"],
    role: item["role"],
    id: item["id"],
    content: itemContentUnionArrayDeserializer(item["content"]),
  };
}

/** A message resource item with the `assistant` role. */
export interface ResponsesAssistantMessageItemResource
  extends ResponsesMessageItemResource {
  /** The role of the message, which is always `assistant`. */
  role: "assistant";
  /** The content associated with the message. */
  content: ItemContentUnion[];
}

export function responsesAssistantMessageItemResourceDeserializer(
  item: any,
): ResponsesAssistantMessageItemResource {
  return {
    type: item["type"],
    status: item["status"],
    role: item["role"],
    id: item["id"],
    content: itemContentUnionArrayDeserializer(item["content"]),
  };
}

/**
 * The output of a computer tool call.
 *
 */
export interface ComputerToolCallOutputItemResource extends ItemResource {
  type: "computer_call_output";
  /**
   * The status of the item. One of `in_progress`, `completed`, or
   * `incomplete`. Populated when items are returned via API.
   */
  status: "in_progress" | "completed" | "incomplete";
  /** The ID of the computer tool call that produced the output. */
  callId: string;
  /**
   * The safety checks reported by the API that have been acknowledged by the
   * developer.
   */
  acknowledgedSafetyChecks?: ComputerToolCallSafetyCheck[];
  output: ComputerToolCallOutputItemOutputUnion;
}

export function computerToolCallOutputItemResourceDeserializer(
  item: any,
): ComputerToolCallOutputItemResource {
  return {
    type: item["type"],
    id: item["id"],
    status: item["status"],
    callId: item["call_id"],
    acknowledgedSafetyChecks: !item["acknowledged_safety_checks"]
      ? item["acknowledged_safety_checks"]
      : computerToolCallSafetyCheckArrayDeserializer(
          item["acknowledged_safety_checks"],
        ),
    output: computerToolCallOutputItemOutputUnionDeserializer(item["output"]),
  };
}

/**
 * A tool call to run a function. See the
 * [function calling guide](/docs/guides/function-calling) for more information.
 *
 */
export interface FunctionToolCallItemResource extends ItemResource {
  type: "function_call";
  /**
   * The status of the item. One of `in_progress`, `completed`, or
   * `incomplete`. Populated when items are returned via API.
   */
  status: "in_progress" | "completed" | "incomplete";
  /** The unique ID of the function tool call generated by the model. */
  callId: string;
  /** The name of the function to run. */
  name: string;
  /** A JSON string of the arguments to pass to the function. */
  arguments: string;
}

export function functionToolCallItemResourceDeserializer(
  item: any,
): FunctionToolCallItemResource {
  return {
    type: item["type"],
    id: item["id"],
    status: item["status"],
    callId: item["call_id"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

/**
 * The output of a function tool call.
 *
 */
export interface FunctionToolCallOutputItemResource extends ItemResource {
  type: "function_call_output";
  /**
   * The status of the item. One of `in_progress`, `completed`, or
   * `incomplete`. Populated when items are returned via API.
   */
  status: "in_progress" | "completed" | "incomplete";
  /** The unique ID of the function tool call generated by the model. */
  callId: string;
  /** A JSON string of the output of the function tool call. */
  output: string;
}

export function functionToolCallOutputItemResourceDeserializer(
  item: any,
): FunctionToolCallOutputItemResource {
  return {
    type: item["type"],
    id: item["id"],
    status: item["status"],
    callId: item["call_id"],
    output: item["output"],
  };
}

/**
 * A response to an MCP approval request.
 *
 */
export interface MCPApprovalResponseItemResource extends ItemResource {
  type: "mcp_approval_response";
  /** The ID of the approval request being answered. */
  approvalRequestId: string;
  /** Whether the request was approved. */
  approve: boolean;
  /** Optional reason for the decision. */
  reason?: string | null;
}

export function mcpApprovalResponseItemResourceDeserializer(
  item: any,
): MCPApprovalResponseItemResource {
  return {
    type: item["type"],
    id: item["id"],
    approvalRequestId: item["approval_request_id"],
    approve: item["approve"],
    reason: item["reason"],
  };
}

/**
 * The results of a file search tool call. See the
 * [file search guide](/docs/guides/tools-file-search) for more information.
 *
 */
export interface FileSearchToolCallItemResource extends ItemResource {
  type: "file_search_call";
  /**
   * The status of the file search tool call. One of `in_progress`,
   * `searching`, `incomplete` or `failed`,
   */
  status: "in_progress" | "searching" | "completed" | "incomplete" | "failed";
  /** The queries used to search for files. */
  queries: string[];
  /** The results of the file search tool call. */
  results?:
    | {
        fileId?: string;
        text?: string;
        filename?: string;
        attributes?: VectorStoreFileAttributes;
        score?: number;
      }[]
    | null;
}

export function fileSearchToolCallItemResourceDeserializer(
  item: any,
): FileSearchToolCallItemResource {
  return {
    type: item["type"],
    id: item["id"],
    status: item["status"],
    queries: item["queries"].map((p: any) => {
      return p;
    }),
    results: !item["results"]
      ? item["results"]
      : _fileSearchToolCallItemParamResultArrayDeserializer(item["results"]),
  };
}

/**
 * A tool call to a computer use tool. See the
 * [computer use guide](/docs/guides/tools-computer-use) for more information.
 *
 */
export interface ComputerToolCallItemResource extends ItemResource {
  type: "computer_call";
  /**
   * The status of the item. One of `in_progress`, `completed`, or
   * `incomplete`. Populated when items are returned via API.
   */
  status: "in_progress" | "completed" | "incomplete";
  /** An identifier used when responding to the tool call with output. */
  callId: string;
  action: ComputerActionUnion;
  /** The pending safety checks for the computer call. */
  pendingSafetyChecks: ComputerToolCallSafetyCheck[];
}

export function computerToolCallItemResourceDeserializer(
  item: any,
): ComputerToolCallItemResource {
  return {
    type: item["type"],
    id: item["id"],
    status: item["status"],
    callId: item["call_id"],
    action: computerActionUnionDeserializer(item["action"]),
    pendingSafetyChecks: computerToolCallSafetyCheckArrayDeserializer(
      item["pending_safety_checks"],
    ),
  };
}

/**
 * The results of a web search tool call. See the
 * [web search guide](/docs/guides/tools-web-search) for more information.
 *
 */
export interface WebSearchToolCallItemResource extends ItemResource {
  type: "web_search_call";
  /** The status of the web search tool call. */
  status: "in_progress" | "searching" | "completed" | "failed";
  /**
   * An object describing the specific action taken in this web search call.
   * Includes details on how the model used the web (search, open_page, find).
   */
  action: WebSearchActionUnion;
}

export function webSearchToolCallItemResourceDeserializer(
  item: any,
): WebSearchToolCallItemResource {
  return {
    type: item["type"],
    id: item["id"],
    status: item["status"],
    action: webSearchActionUnionDeserializer(item["action"]),
  };
}

/**
 * A description of the chain of thought used by a reasoning model while generating
 * a response. Be sure to include these items in your `input` to the Responses API
 * for subsequent turns of a conversation if you are manually
 * [managing context](/docs/guides/conversation-state).
 *
 */
export interface ReasoningItemResource extends ItemResource {
  type: "reasoning";
  /**
   * The encrypted content of the reasoning item - populated when a response is
   * generated with `reasoning.encrypted_content` in the `include` parameter.
   */
  encryptedContent?: string | null;
  /** Reasoning text contents. */
  summary: ReasoningItemSummaryPartUnion[];
}

export function reasoningItemResourceDeserializer(
  item: any,
): ReasoningItemResource {
  return {
    type: item["type"],
    id: item["id"],
    encryptedContent: item["encrypted_content"],
    summary: reasoningItemSummaryPartUnionArrayDeserializer(item["summary"]),
  };
}

/**
 * An image generation request made by the model.
 *
 */
export interface ImageGenToolCallItemResource extends ItemResource {
  type: "image_generation_call";
  status: "in_progress" | "completed" | "generating" | "failed";
  /** The generated image encoded in base64. */
  result: string | null;
}

export function imageGenToolCallItemResourceDeserializer(
  item: any,
): ImageGenToolCallItemResource {
  return {
    type: item["type"],
    id: item["id"],
    status: item["status"],
    result: item["result"],
  };
}

/**
 * A tool call to run code.
 *
 */
export interface CodeInterpreterToolCallItemResource extends ItemResource {
  type: "code_interpreter_call";
  status:
    | "in_progress"
    | "completed"
    | "incomplete"
    | "interpreting"
    | "failed";
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

export function codeInterpreterToolCallItemResourceDeserializer(
  item: any,
): CodeInterpreterToolCallItemResource {
  return {
    type: item["type"],
    id: item["id"],
    status: item["status"],
    containerId: item["container_id"],
    code: item["code"],
    outputs: !item["outputs"]
      ? item["outputs"]
      : codeInterpreterOutputUnionArrayDeserializer(item["outputs"]),
  };
}

/**
 * A tool call to run a command on the local shell.
 *
 */
export interface LocalShellToolCallItemResource extends ItemResource {
  type: "local_shell_call";
  status: "in_progress" | "completed" | "incomplete";
  /** The unique ID of the local shell tool call generated by the model. */
  callId: string;
  action: LocalShellExecAction;
}

export function localShellToolCallItemResourceDeserializer(
  item: any,
): LocalShellToolCallItemResource {
  return {
    type: item["type"],
    id: item["id"],
    status: item["status"],
    callId: item["call_id"],
    action: localShellExecActionDeserializer(item["action"]),
  };
}

/**
 * The output of a local shell tool call.
 *
 */
export interface LocalShellToolCallOutputItemResource extends ItemResource {
  type: "local_shell_call_output";
  status: "in_progress" | "completed" | "incomplete";
  /** A JSON string of the output of the local shell tool call. */
  output: string;
}

export function localShellToolCallOutputItemResourceDeserializer(
  item: any,
): LocalShellToolCallOutputItemResource {
  return {
    type: item["type"],
    id: item["id"],
    status: item["status"],
    output: item["output"],
  };
}

/**
 * A list of tools available on an MCP server.
 *
 */
export interface MCPListToolsItemResource extends ItemResource {
  type: "mcp_list_tools";
  /** The label of the MCP server. */
  serverLabel: string;
  /** The tools available on the server. */
  tools: MCPListToolsTool[];
  /** Error message if the server could not list tools. */
  error?: string | null;
}

export function mcpListToolsItemResourceDeserializer(
  item: any,
): MCPListToolsItemResource {
  return {
    type: item["type"],
    id: item["id"],
    serverLabel: item["server_label"],
    tools: mcpListToolsToolArrayDeserializer(item["tools"]),
    error: item["error"],
  };
}

/**
 * A request for human approval of a tool invocation.
 *
 */
export interface MCPApprovalRequestItemResource extends ItemResource {
  type: "mcp_approval_request";
  /** The label of the MCP server making the request. */
  serverLabel: string;
  /** The name of the tool to run. */
  name: string;
  /** A JSON string of arguments for the tool. */
  arguments: string;
}

export function mcpApprovalRequestItemResourceDeserializer(
  item: any,
): MCPApprovalRequestItemResource {
  return {
    type: item["type"],
    id: item["id"],
    serverLabel: item["server_label"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

/**
 * An invocation of a tool on an MCP server.
 *
 */
export interface MCPCallItemResource extends ItemResource {
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

export function mcpCallItemResourceDeserializer(
  item: any,
): MCPCallItemResource {
  return {
    type: item["type"],
    id: item["id"],
    serverLabel: item["server_label"],
    name: item["name"],
    arguments: item["arguments"],
    output: item["output"],
    error: item["error"],
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultItemResource {
  /** The requested list of items. */
  data: ItemResourceUnion[];
  /** The first ID represented in this list. */
  firstId?: string;
  /** The last ID represented in this list. */
  lastId?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

export function _agentsPagedResultItemResourceDeserializer(
  item: any,
): _AgentsPagedResultItemResource {
  return {
    data: itemResourceUnionArrayDeserializer(item["data"]),
    firstId: item["first_id"],
    lastId: item["last_id"],
    hasMore: item["has_more"],
  };
}

/** model interface _CreateResponseRequestText */
export interface _CreateResponseRequestText {
  format?: ResponseTextFormatConfigurationUnion;
}

export function _createResponseRequestTextSerializer(
  item: _CreateResponseRequestText,
): any {
  return {
    format: !item["format"]
      ? item["format"]
      : responseTextFormatConfigurationUnionSerializer(item["format"]),
  };
}

export function _createResponseRequestTextDeserializer(
  item: any,
): _CreateResponseRequestText {
  return {
    format: !item["format"]
      ? item["format"]
      : responseTextFormatConfigurationUnionDeserializer(item["format"]),
  };
}

/** model interface ToolChoiceObject */
export interface ToolChoiceObject {
  type: ToolChoiceObjectType;
}

export function toolChoiceObjectSerializer(item: ToolChoiceObject): any {
  return { type: item["type"] };
}

export function toolChoiceObjectDeserializer(item: any): ToolChoiceObject {
  return {
    type: item["type"],
  };
}

/** Alias for ToolChoiceObjectUnion */
export type ToolChoiceObjectUnion =
  | ToolChoiceObjectFileSearch
  | ToolChoiceObjectComputer
  | ToolChoiceObjectWebSearch
  | ToolChoiceObjectImageGen
  | ToolChoiceObjectCodeInterpreter
  | ToolChoiceObjectFunction
  | ToolChoiceObjectMCP
  | ToolChoiceObject;

export function toolChoiceObjectUnionSerializer(
  item: ToolChoiceObjectUnion,
): any {
  switch (item.type) {
    case "file_search":
      return toolChoiceObjectFileSearchSerializer(
        item as ToolChoiceObjectFileSearch,
      );

    case "computer_use_preview":
      return toolChoiceObjectComputerSerializer(
        item as ToolChoiceObjectComputer,
      );

    case "web_search_preview":
      return toolChoiceObjectWebSearchSerializer(
        item as ToolChoiceObjectWebSearch,
      );

    case "image_generation":
      return toolChoiceObjectImageGenSerializer(
        item as ToolChoiceObjectImageGen,
      );

    case "code_interpreter":
      return toolChoiceObjectCodeInterpreterSerializer(
        item as ToolChoiceObjectCodeInterpreter,
      );

    case "function":
      return toolChoiceObjectFunctionSerializer(
        item as ToolChoiceObjectFunction,
      );

    case "mcp":
      return toolChoiceObjectMCPSerializer(item as ToolChoiceObjectMCP);

    default:
      return toolChoiceObjectSerializer(item);
  }
}

export function toolChoiceObjectUnionDeserializer(
  item: any,
): ToolChoiceObjectUnion {
  switch (item.type) {
    case "file_search":
      return toolChoiceObjectFileSearchDeserializer(
        item as ToolChoiceObjectFileSearch,
      );

    case "computer_use_preview":
      return toolChoiceObjectComputerDeserializer(
        item as ToolChoiceObjectComputer,
      );

    case "web_search_preview":
      return toolChoiceObjectWebSearchDeserializer(
        item as ToolChoiceObjectWebSearch,
      );

    case "image_generation":
      return toolChoiceObjectImageGenDeserializer(
        item as ToolChoiceObjectImageGen,
      );

    case "code_interpreter":
      return toolChoiceObjectCodeInterpreterDeserializer(
        item as ToolChoiceObjectCodeInterpreter,
      );

    case "function":
      return toolChoiceObjectFunctionDeserializer(
        item as ToolChoiceObjectFunction,
      );

    case "mcp":
      return toolChoiceObjectMCPDeserializer(item as ToolChoiceObjectMCP);

    default:
      return toolChoiceObjectDeserializer(item);
  }
}

/**
 * Indicates that the model should use a built-in tool to generate a response.
 * [Learn more about built-in tools](/docs/guides/tools).
 */
export type ToolChoiceObjectType =
  | "file_search"
  | "function"
  | "computer_use_preview"
  | "web_search_preview"
  | "image_generation"
  | "code_interpreter"
  | "mcp";

/** model interface ToolChoiceObjectFileSearch */
export interface ToolChoiceObjectFileSearch extends ToolChoiceObject {
  type: "file_search";
}

export function toolChoiceObjectFileSearchSerializer(
  item: ToolChoiceObjectFileSearch,
): any {
  return { type: item["type"] };
}

export function toolChoiceObjectFileSearchDeserializer(
  item: any,
): ToolChoiceObjectFileSearch {
  return {
    type: item["type"],
  };
}

/** model interface ToolChoiceObjectComputer */
export interface ToolChoiceObjectComputer extends ToolChoiceObject {
  type: "computer_use_preview";
}

export function toolChoiceObjectComputerSerializer(
  item: ToolChoiceObjectComputer,
): any {
  return { type: item["type"] };
}

export function toolChoiceObjectComputerDeserializer(
  item: any,
): ToolChoiceObjectComputer {
  return {
    type: item["type"],
  };
}

/** Note: web_search is not yet available via Azure OpenAI. */
export interface ToolChoiceObjectWebSearch extends ToolChoiceObject {
  type: "web_search_preview";
}

export function toolChoiceObjectWebSearchSerializer(
  item: ToolChoiceObjectWebSearch,
): any {
  return { type: item["type"] };
}

export function toolChoiceObjectWebSearchDeserializer(
  item: any,
): ToolChoiceObjectWebSearch {
  return {
    type: item["type"],
  };
}

/** model interface ToolChoiceObjectImageGen */
export interface ToolChoiceObjectImageGen extends ToolChoiceObject {
  type: "image_generation";
}

export function toolChoiceObjectImageGenSerializer(
  item: ToolChoiceObjectImageGen,
): any {
  return { type: item["type"] };
}

export function toolChoiceObjectImageGenDeserializer(
  item: any,
): ToolChoiceObjectImageGen {
  return {
    type: item["type"],
  };
}

/** model interface ToolChoiceObjectCodeInterpreter */
export interface ToolChoiceObjectCodeInterpreter extends ToolChoiceObject {
  type: "code_interpreter";
}

export function toolChoiceObjectCodeInterpreterSerializer(
  item: ToolChoiceObjectCodeInterpreter,
): any {
  return { type: item["type"] };
}

export function toolChoiceObjectCodeInterpreterDeserializer(
  item: any,
): ToolChoiceObjectCodeInterpreter {
  return {
    type: item["type"],
  };
}

/** Use this option to force the model to call a specific function. */
export interface ToolChoiceObjectFunction extends ToolChoiceObject {
  /** For function calling, the type is always `function`. */
  type: "function";
  /** The name of the function to call. */
  name: string;
}

export function toolChoiceObjectFunctionSerializer(
  item: ToolChoiceObjectFunction,
): any {
  return { type: item["type"], name: item["name"] };
}

export function toolChoiceObjectFunctionDeserializer(
  item: any,
): ToolChoiceObjectFunction {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** Use this option to force the model to call a specific tool on a remote MCP server. */
export interface ToolChoiceObjectMCP extends ToolChoiceObject {
  /** For MCP tools, the type is always `mcp`. */
  type: "mcp";
  /** The label of the MCP server to use. */
  serverLabel: string;
  /** The name of the tool to call on the server. */
  name?: string | null;
}

export function toolChoiceObjectMCPSerializer(item: ToolChoiceObjectMCP): any {
  return {
    type: item["type"],
    server_label: item["serverLabel"],
    name: item["name"],
  };
}

export function toolChoiceObjectMCPDeserializer(
  item: any,
): ToolChoiceObjectMCP {
  return {
    type: item["type"],
    serverLabel: item["server_label"],
    name: item["name"],
  };
}

/**
 * Reference to a prompt template and its variables.
 * [Learn more](/docs/guides/text?api-mode=responses#reusable-prompts).
 */
export interface Prompt {
  /** The unique identifier of the prompt template to use. */
  id: string;
  /** Optional version of the prompt template. */
  version?: string | null;
  variables?: ResponsePromptVariables | null;
}

export function promptSerializer(item: Prompt): any {
  return {
    id: item["id"],
    version: item["version"],
    variables: !item["variables"]
      ? item["variables"]
      : responsePromptVariablesSerializer(item["variables"]),
  };
}

export function promptDeserializer(item: any): Prompt {
  return {
    id: item["id"],
    version: item["version"],
    variables: !item["variables"]
      ? item["variables"]
      : responsePromptVariablesDeserializer(item["variables"]),
  };
}

/**
 * Optional map of values to substitute in for variables in your
 * prompt. The substitution values can either be strings, or other
 * Response input types like images or files.
 */
export interface ResponsePromptVariables {
  /** Additional properties */
  additionalProperties?: Record<string, ItemParamUnion>;
}

export function responsePromptVariablesSerializer(
  item: ResponsePromptVariables,
): any {
  return {
    ...serializeRecord(
      item.additionalProperties,
      undefined,
      itemParamUnionSerializer,
    ),
  };
}

export function responsePromptVariablesDeserializer(
  item: any,
): ResponsePromptVariables {
  return {
    additionalProperties: serializeRecord(item, [], itemParamUnionDeserializer),
  };
}

/** model interface ImplicitUserMessage */
export interface ImplicitUserMessage {
  content: string | ItemContentUnion[];
}

export function implicitUserMessageSerializer(item: ImplicitUserMessage): any {
  return { content: _implicitUserMessageContentSerializer(item["content"]) };
}

/** Alias for _ImplicitUserMessageContent */
export type _ImplicitUserMessageContent = string | ItemContentUnion[];

export function _implicitUserMessageContentSerializer(
  item: _ImplicitUserMessageContent,
): any {
  return item;
}

/** model interface _CreateResponseRequestConversation1 */
export interface _CreateResponseRequestConversation1 {
  id: string;
}

export function _createResponseRequestConversation1Serializer(
  item: _CreateResponseRequestConversation1,
): any {
  return { id: item["id"] };
}

/** model interface AgentReference */
export interface AgentReference {
  type: "agent_reference";
  /** The name of the agent. */
  name: string;
  /** The version identifier of the agent. */
  version?: string;
}

export function agentReferenceSerializer(item: AgentReference): any {
  return { type: item["type"], name: item["name"], version: item["version"] };
}

/**
 * Specifies the processing type used for serving the request.
 *   - If set to 'auto', then the request will be processed with the service tier configured in the Project settings. Unless otherwise configured, the Project will use 'default'.
 *   - If set to 'default', then the request will be processed with the standard pricing and performance for the selected model.
 *   - If set to '[flex](/docs/guides/flex-processing)' or 'priority', then the request will be processed with the corresponding service tier. [Contact sales](https://openai.com/contact-sales) to learn more about Priority processing.
 *   - When not set, the default behavior is 'auto'.
 *
 *   When the `service_tier` parameter is set, the response body will include the `service_tier` value based on the processing mode actually used to serve the request. This response value may be different from the value set in the parameter.
 */
export type ServiceTier = "auto" | "default" | "flex" | "scale" | "priority";
/** Alias for _CreateResponseRequestToolChoice */
export type _CreateResponseRequestToolChoice =
  | ToolChoiceOptions
  | ToolChoiceObjectUnion;

export function _createResponseRequestToolChoiceSerializer(
  item: _CreateResponseRequestToolChoice,
): any {
  return item;
}

export function _createResponseRequestToolChoiceDeserializer(
  item: any,
): _CreateResponseRequestToolChoice {
  return item;
}

/**
 * Controls which (if any) tool is called by the model.
 *
 * `none` means the model will not call any tool and instead generates a message.
 *
 * `auto` means the model can pick between generating a message or calling one or
 * more tools.
 *
 * `required` means the model must call one or more tools.
 */
export type ToolChoiceOptions = "none" | "auto" | "required";
/** Alias for _CreateResponseRequestInput */
export type _CreateResponseRequestInput =
  | string
  | (ImplicitUserMessage | ItemParamUnion)[];

export function _createResponseRequestInputSerializer(
  item: _CreateResponseRequestInput,
): any {
  return item;
}

export function _createResponseRequestInput1ArraySerializer(
  result: Array<_CreateResponseRequestInput1>,
): any[] {
  return result.map((item) => {
    return _createResponseRequestInput1Serializer(item);
  });
}

/** Alias for _CreateResponseRequestInput1 */
export type _CreateResponseRequestInput1 = ImplicitUserMessage | ItemParamUnion;

export function _createResponseRequestInput1Serializer(
  item: _CreateResponseRequestInput1,
): any {
  return item;
}

/**
 * Specify additional output data to include in the model response. Currently
 * supported values are:
 * - `code_interpreter_call.outputs`: Includes the outputs of python code execution
 *   in code interpreter tool call items.
 * - `computer_call_output.output.image_url`: Include image urls from the computer call output.
 * - `file_search_call.results`: Include the search results of
 *   the file search tool call.
 * - `message.input_image.image_url`: Include image urls from the input message.
 * - `message.output_text.logprobs`: Include logprobs with assistant messages.
 * - `reasoning.encrypted_content`: Includes an encrypted version of reasoning
 *   tokens in reasoning item outputs. This enables reasoning items to be used in
 *   multi-turn conversations when using the Responses API statelessly (like
 *   when the `store` parameter is set to `false`, or when an organization is
 *   enrolled in the zero data retention program).
 */
export type Includable =
  | "code_interpreter_call.outputs"
  | "computer_call_output.output.image_url"
  | "file_search_call.results"
  | "message.input_image.image_url"
  | "message.output_text.logprobs"
  | "reasoning.encrypted_content";
/** Alias for _CreateResponseRequestConversation */
export type _CreateResponseRequestConversation =
  | string
  | {
      id: string;
    };

export function _createResponseRequestConversationSerializer(
  item: _CreateResponseRequestConversation,
): any {
  return item;
}

/** model interface Response */
export interface Response {
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata: Record<string, string> | null;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * We generally recommend altering this or `top_p` but not both.
   */
  temperature: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling,
   * where the model considers the results of the tokens with top_p probability
   * mass. So 0.1 means only the tokens comprising the top 10% probability mass
   * are considered.
   *
   * We generally recommend altering this or `temperature` but not both.
   */
  topP: number | null;
  /** A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices#end-user-ids). */
  user: string | null;
  /** Note: service_tier is not applicable to Azure OpenAI. */
  serviceTier?: ServiceTier;
  /** An integer between 0 and 20 specifying the number of most likely tokens to return at each token position, each with an associated log probability. */
  topLogprobs?: number | null;
  /**
   * The unique ID of the previous response to the model. Use this to
   * create multi-turn conversations. Learn more about
   * [conversation state](/docs/guides/conversation-state).
   */
  previousResponseId?: string | null;
  /** The model deployment to use for the creation of this response. */
  model?: string;
  reasoning?: Reasoning | null;
  /**
   * Whether to run the model response in the background.
   * [Learn more](/docs/guides/background).
   */
  background?: boolean | null;
  /** An upper bound for the number of tokens that can be generated for a response, including visible output tokens and [reasoning tokens](/docs/guides/reasoning). */
  maxOutputTokens?: number | null;
  /** The maximum number of total calls to built-in tools that can be processed in a response. This maximum number applies across all built-in tool calls, not per individual tool. Any further attempts to call a tool by the model will be ignored. */
  maxToolCalls?: number | null;
  /**
   * Configuration options for a text response from the model. Can be plain
   * text or structured JSON data. Learn more:
   * - [Text inputs and outputs](/docs/guides/text)
   * - [Structured Outputs](/docs/guides/structured-outputs)
   */
  text?: {
    format?: ResponseTextFormatConfigurationUnion;
  };
  /**
   * An array of tools the model may call while generating a response. You
   * can specify which tool to use by setting the `tool_choice` parameter.
   *
   * The two categories of tools you can provide the model are:
   *
   * - **Built-in tools**: Tools that are provided by OpenAI that extend the
   *   model's capabilities, like [web search](/docs/guides/tools-web-search)
   *   or [file search](/docs/guides/tools-file-search). Learn more about
   *   [built-in tools](/docs/guides/tools).
   * - **Function calls (custom tools)**: Functions that are defined by you,
   *   enabling the model to call your own code. Learn more about
   *   [function calling](/docs/guides/function-calling).
   */
  tools?: ToolUnion[];
  /**
   * How the model should select which tool (or tools) to use when generating
   * a response. See the `tools` parameter to see how to specify which tools
   * the model can call.
   */
  toolChoice?: ToolChoiceOptions | ToolChoiceObjectUnion;
  prompt?: Prompt | null;
  /**
   * The truncation strategy to use for the model response.
   * - `auto`: If the context of this response and previous ones exceeds
   *   the model's context window size, the model will truncate the
   *   response to fit the context window by dropping input items in the
   *   middle of the conversation.
   * - `disabled` (default): If a model response will exceed the context window
   *   size for a model, the request will fail with a 400 error.
   */
  truncation?: ("auto" | "disabled") | null;
  /** Unique identifier for this Response. */
  id: string;
  /** The object type of this resource - always set to `response`. */
  object: "response";
  /**
   * The status of the response generation. One of `completed`, `failed`,
   * `in_progress`, `cancelled`, `queued`, or `incomplete`.
   */
  status?:
    | "completed"
    | "failed"
    | "in_progress"
    | "cancelled"
    | "queued"
    | "incomplete";
  /** Unix timestamp (in seconds) of when this Response was created. */
  createdAt: Date;
  error: ResponseError | null;
  /** Details about why the response is incomplete. */
  incompleteDetails: {
    reason?: "max_output_tokens" | "content_filter";
  } | null;
  /**
   * An array of content items generated by the model.
   *
   * - The length and order of items in the `output` array is dependent
   *   on the model's response.
   * - Rather than accessing the first item in the `output` array and
   *   assuming it's an `assistant` message with the content generated by
   *   the model, you might consider using the `output_text` property where
   *   supported in SDKs.
   */
  output: ItemResourceUnion[];
  /**
   * A system (or developer) message inserted into the model's context.
   *
   * When using along with `previous_response_id`, the instructions from a previous
   * response will not be carried over to the next response. This makes it simple
   * to swap out system (or developer) messages in new responses.
   */
  instructions: (string | ItemParamUnion[]) | null;
  /**
   * SDK-only convenience property that contains the aggregated text output
   * from all `output_text` items in the `output` array, if any are present.
   * Supported in the Python and JavaScript SDKs.
   */
  outputText?: string | null;
  usage?: ResponseUsage;
  /** Whether to allow the model to run tool calls in parallel. */
  parallelToolCalls: boolean;
  conversation: {
    id: string;
  } | null;
  /** The agent used for this response */
  agent?: AgentId;
}

export function responseDeserializer(item: any): Response {
  return {
    metadata: item["metadata"],
    temperature: item["temperature"],
    topP: item["top_p"],
    user: item["user"],
    serviceTier: item["service_tier"],
    topLogprobs: item["top_logprobs"],
    previousResponseId: item["previous_response_id"],
    model: item["model"],
    reasoning: !item["reasoning"]
      ? item["reasoning"]
      : reasoningDeserializer(item["reasoning"]),
    background: item["background"],
    maxOutputTokens: item["max_output_tokens"],
    maxToolCalls: item["max_tool_calls"],
    text: !item["text"]
      ? item["text"]
      : _createResponseRequestTextDeserializer(item["text"]),
    tools: !item["tools"]
      ? item["tools"]
      : toolUnionArrayDeserializer(item["tools"]),
    toolChoice: !item["tool_choice"]
      ? item["tool_choice"]
      : _createResponseRequestToolChoiceDeserializer(item["tool_choice"]),
    prompt: !item["prompt"]
      ? item["prompt"]
      : promptDeserializer(item["prompt"]),
    truncation: item["truncation"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    createdAt: new Date(item["created_at"] * 1000),
    error: !item["error"]
      ? item["error"]
      : responseErrorDeserializer(item["error"]),
    incompleteDetails: !item["incomplete_details"]
      ? item["incomplete_details"]
      : _responseIncompleteDetails1Deserializer(item["incomplete_details"]),
    output: itemResourceUnionArrayDeserializer(item["output"]),
    instructions: !item["instructions"]
      ? item["instructions"]
      : _responseInstructionsDeserializer(item["instructions"]),
    outputText: item["output_text"],
    usage: !item["usage"]
      ? item["usage"]
      : responseUsageDeserializer(item["usage"]),
    parallelToolCalls: item["parallel_tool_calls"],
    conversation: !item["conversation"]
      ? item["conversation"]
      : _responseConversation1Deserializer(item["conversation"]),
    agent: !item["agent"] ? item["agent"] : agentIdDeserializer(item["agent"]),
  };
}

/** An error object returned when the model fails to generate a Response. */
export interface ResponseError {
  code: ResponseErrorCode;
  /** A human-readable description of the error. */
  message: string;
}

export function responseErrorDeserializer(item: any): ResponseError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The error code for the response. */
export type ResponseErrorCode =
  | "server_error"
  | "rate_limit_exceeded"
  | "invalid_prompt"
  | "vector_store_timeout"
  | "invalid_image"
  | "invalid_image_format"
  | "invalid_base64_image"
  | "invalid_image_url"
  | "image_too_large"
  | "image_too_small"
  | "image_parse_error"
  | "image_content_policy_violation"
  | "invalid_image_mode"
  | "image_file_too_large"
  | "unsupported_image_media_type"
  | "empty_image_file"
  | "failed_to_download_image"
  | "image_file_not_found";

/** model interface _ResponseIncompleteDetails1 */
export interface _ResponseIncompleteDetails1 {
  /** The reason why the response is incomplete. */
  reason?: "max_output_tokens" | "content_filter";
}

export function _responseIncompleteDetails1Deserializer(
  item: any,
): _ResponseIncompleteDetails1 {
  return {
    reason: item["reason"],
  };
}

/** Alias for _ResponseInstructions */
export type _ResponseInstructions = string | ItemParamUnion[];

export function _responseInstructionsDeserializer(
  item: any,
): _ResponseInstructions {
  return item;
}

/**
 * Represents token usage details including input tokens, output tokens,
 * a breakdown of output tokens, and the total tokens used.
 */
export interface ResponseUsage {
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

export function responseUsageDeserializer(item: any): ResponseUsage {
  return {
    inputTokens: item["input_tokens"],
    inputTokensDetails: _responseUsageInputTokensDetailsDeserializer(
      item["input_tokens_details"],
    ),
    outputTokens: item["output_tokens"],
    outputTokensDetails: _responseUsageOutputTokensDetailsDeserializer(
      item["output_tokens_details"],
    ),
    totalTokens: item["total_tokens"],
  };
}

/** model interface _ResponseUsageInputTokensDetails */
export interface _ResponseUsageInputTokensDetails {
  /**
   * The number of tokens that were retrieved from the cache.
   * [More on prompt caching](/docs/guides/prompt-caching).
   */
  cachedTokens: number;
}

export function _responseUsageInputTokensDetailsDeserializer(
  item: any,
): _ResponseUsageInputTokensDetails {
  return {
    cachedTokens: item["cached_tokens"],
  };
}

/** model interface _ResponseUsageOutputTokensDetails */
export interface _ResponseUsageOutputTokensDetails {
  /** The number of reasoning tokens. */
  reasoningTokens: number;
}

export function _responseUsageOutputTokensDetailsDeserializer(
  item: any,
): _ResponseUsageOutputTokensDetails {
  return {
    reasoningTokens: item["reasoning_tokens"],
  };
}

/** model interface _ResponseConversation1 */
export interface _ResponseConversation1 {
  id: string;
}

export function _responseConversation1Deserializer(
  item: any,
): _ResponseConversation1 {
  return {
    id: item["id"],
  };
}

/** model interface CreateResponseRequest */
export interface CreateResponseRequest {
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Record<string, string>;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * We generally recommend altering this or `top_p` but not both.
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling,
   * where the model considers the results of the tokens with top_p probability
   * mass. So 0.1 means only the tokens comprising the top 10% probability mass
   * are considered.
   *
   * We generally recommend altering this or `temperature` but not both.
   */
  topP?: number | null;
  /** A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices#end-user-ids). */
  user?: string;
  /** Note: service_tier is not applicable to Azure OpenAI. */
  serviceTier?: ServiceTier;
  /** An integer between 0 and 20 specifying the number of most likely tokens to return at each token position, each with an associated log probability. */
  topLogprobs?: number;
  /**
   * The unique ID of the previous response to the model. Use this to
   * create multi-turn conversations. Learn more about
   * [conversation state](/docs/guides/conversation-state).
   */
  previousResponseId?: string | null;
  /** The model deployment to use for the creation of this response. */
  model?: string;
  reasoning?: Reasoning | null;
  /**
   * Whether to run the model response in the background.
   * [Learn more](/docs/guides/background).
   */
  background?: boolean | null;
  /** An upper bound for the number of tokens that can be generated for a response, including visible output tokens and [reasoning tokens](/docs/guides/reasoning). */
  maxOutputTokens?: number | null;
  /** The maximum number of total calls to built-in tools that can be processed in a response. This maximum number applies across all built-in tool calls, not per individual tool. Any further attempts to call a tool by the model will be ignored. */
  maxToolCalls?: number | null;
  /**
   * Configuration options for a text response from the model. Can be plain
   * text or structured JSON data. Learn more:
   * - [Text inputs and outputs](/docs/guides/text)
   * - [Structured Outputs](/docs/guides/structured-outputs)
   */
  text?: {
    format?: ResponseTextFormatConfigurationUnion;
  };
  /**
   * An array of tools the model may call while generating a response. You
   * can specify which tool to use by setting the `tool_choice` parameter.
   *
   * The two categories of tools you can provide the model are:
   *
   * - **Built-in tools**: Tools that are provided by OpenAI that extend the
   *   model's capabilities, like file search.
   * - **Function calls (custom tools)**: Functions that are defined by you,
   *   enabling the model to call your own code.
   */
  tools?: ToolUnion[];
  /**
   * How the model should select which tool (or tools) to use when generating
   * a response. See the `tools` parameter to see how to specify which tools
   * the model can call.
   */
  toolChoice?: ToolChoiceOptions | ToolChoiceObjectUnion;
  prompt?: Prompt | null;
  /**
   * The truncation strategy to use for the model response.
   * - `auto`: If the context of this response and previous ones exceeds
   *   the model's context window size, the model will truncate the
   *   response to fit the context window by dropping input items in the
   *   middle of the conversation.
   * - `disabled` (default): If a model response will exceed the context window
   *   size for a model, the request will fail with a 400 error.
   */
  truncation?: ("auto" | "disabled") | null;
  /**
   * Text, image, or file inputs to the model, used to generate a response.
   *
   * Learn more:
   * - [Text inputs and outputs](/docs/guides/text)
   * - [Image inputs](/docs/guides/images)
   * - [File inputs](/docs/guides/pdf-files)
   * - [Conversation state](/docs/guides/conversation-state)
   * - [Function calling](/docs/guides/function-calling)
   */
  input?: string | (ImplicitUserMessage | ItemParamUnion)[];
  /**
   * Specify additional output data to include in the model response. Currently
   * supported values are:
   * - `code_interpreter_call.outputs`: Includes the outputs of python code execution
   *   in code interpreter tool call items.
   * - `computer_call_output.output.image_url`: Include image urls from the computer call output.
   * - `file_search_call.results`: Include the search results of
   *   the file search tool call.
   * - `message.input_image.image_url`: Include image urls from the input message.
   * - `message.output_text.logprobs`: Include logprobs with assistant messages.
   * - `reasoning.encrypted_content`: Includes an encrypted version of reasoning
   *   tokens in reasoning item outputs. This enables reasoning items to be used in
   *   multi-turn conversations when using the Responses API statelessly (like
   *   when the `store` parameter is set to `false`, or when an organization is
   *   enrolled in the zero data retention program).
   */
  include?: Includable[] | null;
  /** Whether to allow the model to run tool calls in parallel. */
  parallelToolCalls?: boolean | null;
  /**
   * Whether to store the generated model response for later retrieval via
   * API.
   */
  store?: boolean | null;
  /**
   * A system (or developer) message inserted into the model's context.
   *
   * When using along with `previous_response_id`, the instructions from a previous
   * response will not be carried over to the next response. This makes it simple
   * to swap out system (or developer) messages in new responses.
   */
  instructions?: string | null;
  /**
   * If set to true, the model response data will be streamed to the client
   * as it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
   * See the [Streaming section below](/docs/api-reference/responses-streaming)
   * for more information.
   */
  stream?: boolean | null;
  conversation?:
    | string
    | {
        id: string;
      };
  /** The agent to use for generating the response. */
  agent?: AgentReference;
}

export function createResponseRequestSerializer(
  item: CreateResponseRequest,
): any {
  return {
    metadata: item["metadata"],
    temperature: item["temperature"],
    top_p: item["topP"],
    user: item["user"],
    service_tier: item["serviceTier"],
    top_logprobs: item["topLogprobs"],
    previous_response_id: item["previousResponseId"],
    model: item["model"],
    reasoning: !item["reasoning"]
      ? item["reasoning"]
      : reasoningSerializer(item["reasoning"]),
    background: item["background"],
    max_output_tokens: item["maxOutputTokens"],
    max_tool_calls: item["maxToolCalls"],
    text: !item["text"]
      ? item["text"]
      : _createResponseRequestTextSerializer(item["text"]),
    tools: !item["tools"]
      ? item["tools"]
      : toolUnionArraySerializer(item["tools"]),
    tool_choice: !item["toolChoice"]
      ? item["toolChoice"]
      : _createResponseRequestToolChoiceSerializer(item["toolChoice"]),
    prompt: !item["prompt"] ? item["prompt"] : promptSerializer(item["prompt"]),
    truncation: item["truncation"],
    input: !item["input"]
      ? item["input"]
      : _createResponseRequestInputSerializer(item["input"]),
    include: !item["include"]
      ? item["include"]
      : item["include"].map((p: any) => {
          return p;
        }),
    parallel_tool_calls: item["parallelToolCalls"],
    store: item["store"],
    instructions: item["instructions"],
    stream: item["stream"],
    conversation: !item["conversation"]
      ? item["conversation"]
      : _createResponseRequestConversationSerializer(item["conversation"]),
    agent: !item["agent"]
      ? item["agent"]
      : agentReferenceSerializer(item["agent"]),
  };
}

/** model interface ResponseStreamEvent */
export interface ResponseStreamEvent {
  type: ResponseStreamEventType;
  /** The sequence number for this event. */
  sequenceNumber: number;
}

export function responseStreamEventDeserializer(
  item: any,
): ResponseStreamEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
  };
}

/** Alias for ResponseStreamEventUnion */
export type ResponseStreamEventUnion =
  | ResponseCompletedEvent
  | ResponseContentPartAddedEvent
  | ResponseContentPartDoneEvent
  | ResponseCreatedEvent
  | ResponseErrorEvent
  | ResponseFileSearchCallCompletedEvent
  | ResponseFileSearchCallInProgressEvent
  | ResponseFileSearchCallSearchingEvent
  | ResponseFunctionCallArgumentsDeltaEvent
  | ResponseFunctionCallArgumentsDoneEvent
  | ResponseInProgressEvent
  | ResponseFailedEvent
  | ResponseIncompleteEvent
  | ResponseOutputItemAddedEvent
  | ResponseOutputItemDoneEvent
  | ResponseRefusalDeltaEvent
  | ResponseRefusalDoneEvent
  | ResponseTextDeltaEvent
  | ResponseTextDoneEvent
  | ResponseReasoningSummaryPartAddedEvent
  | ResponseReasoningSummaryPartDoneEvent
  | ResponseReasoningSummaryTextDeltaEvent
  | ResponseReasoningSummaryTextDoneEvent
  | ResponseWebSearchCallCompletedEvent
  | ResponseWebSearchCallInProgressEvent
  | ResponseWebSearchCallSearchingEvent
  | ResponseImageGenCallCompletedEvent
  | ResponseImageGenCallGeneratingEvent
  | ResponseImageGenCallInProgressEvent
  | ResponseImageGenCallPartialImageEvent
  | ResponseMCPCallArgumentsDeltaEvent
  | ResponseMCPCallArgumentsDoneEvent
  | ResponseMCPCallCompletedEvent
  | ResponseMCPCallFailedEvent
  | ResponseMCPCallInProgressEvent
  | ResponseMCPListToolsCompletedEvent
  | ResponseMCPListToolsFailedEvent
  | ResponseMCPListToolsInProgressEvent
  | ResponseQueuedEvent
  | ResponseReasoningDeltaEvent
  | ResponseReasoningDoneEvent
  | ResponseReasoningSummaryDeltaEvent
  | ResponseReasoningSummaryDoneEvent
  | ResponseCodeInterpreterCallCodeDeltaEvent
  | ResponseCodeInterpreterCallCodeDoneEvent
  | ResponseCodeInterpreterCallCompletedEvent
  | ResponseCodeInterpreterCallInProgressEvent
  | ResponseCodeInterpreterCallInterpretingEvent
  | ResponseStreamEvent;

export function responseStreamEventUnionDeserializer(
  item: any,
): ResponseStreamEventUnion {
  switch (item.type) {
    case "response.completed":
      return responseCompletedEventDeserializer(item as ResponseCompletedEvent);

    case "response.content_part.added":
      return responseContentPartAddedEventDeserializer(
        item as ResponseContentPartAddedEvent,
      );

    case "response.content_part.done":
      return responseContentPartDoneEventDeserializer(
        item as ResponseContentPartDoneEvent,
      );

    case "response.created":
      return responseCreatedEventDeserializer(item as ResponseCreatedEvent);

    case "error":
      return responseErrorEventDeserializer(item as ResponseErrorEvent);

    case "response.file_search_call.completed":
      return responseFileSearchCallCompletedEventDeserializer(
        item as ResponseFileSearchCallCompletedEvent,
      );

    case "response.file_search_call.in_progress":
      return responseFileSearchCallInProgressEventDeserializer(
        item as ResponseFileSearchCallInProgressEvent,
      );

    case "response.file_search_call.searching":
      return responseFileSearchCallSearchingEventDeserializer(
        item as ResponseFileSearchCallSearchingEvent,
      );

    case "response.function_call_arguments.delta":
      return responseFunctionCallArgumentsDeltaEventDeserializer(
        item as ResponseFunctionCallArgumentsDeltaEvent,
      );

    case "response.function_call_arguments.done":
      return responseFunctionCallArgumentsDoneEventDeserializer(
        item as ResponseFunctionCallArgumentsDoneEvent,
      );

    case "response.in_progress":
      return responseInProgressEventDeserializer(
        item as ResponseInProgressEvent,
      );

    case "response.failed":
      return responseFailedEventDeserializer(item as ResponseFailedEvent);

    case "response.incomplete":
      return responseIncompleteEventDeserializer(
        item as ResponseIncompleteEvent,
      );

    case "response.output_item.added":
      return responseOutputItemAddedEventDeserializer(
        item as ResponseOutputItemAddedEvent,
      );

    case "response.output_item.done":
      return responseOutputItemDoneEventDeserializer(
        item as ResponseOutputItemDoneEvent,
      );

    case "response.refusal.delta":
      return responseRefusalDeltaEventDeserializer(
        item as ResponseRefusalDeltaEvent,
      );

    case "response.refusal.done":
      return responseRefusalDoneEventDeserializer(
        item as ResponseRefusalDoneEvent,
      );

    case "response.output_text.delta":
      return responseTextDeltaEventDeserializer(item as ResponseTextDeltaEvent);

    case "response.output_text.done":
      return responseTextDoneEventDeserializer(item as ResponseTextDoneEvent);

    case "response.reasoning_summary_part.added":
      return responseReasoningSummaryPartAddedEventDeserializer(
        item as ResponseReasoningSummaryPartAddedEvent,
      );

    case "response.reasoning_summary_part.done":
      return responseReasoningSummaryPartDoneEventDeserializer(
        item as ResponseReasoningSummaryPartDoneEvent,
      );

    case "response.reasoning_summary_text.delta":
      return responseReasoningSummaryTextDeltaEventDeserializer(
        item as ResponseReasoningSummaryTextDeltaEvent,
      );

    case "response.reasoning_summary_text.done":
      return responseReasoningSummaryTextDoneEventDeserializer(
        item as ResponseReasoningSummaryTextDoneEvent,
      );

    case "response.web_search_call.completed":
      return responseWebSearchCallCompletedEventDeserializer(
        item as ResponseWebSearchCallCompletedEvent,
      );

    case "response.web_search_call.in_progress":
      return responseWebSearchCallInProgressEventDeserializer(
        item as ResponseWebSearchCallInProgressEvent,
      );

    case "response.web_search_call.searching":
      return responseWebSearchCallSearchingEventDeserializer(
        item as ResponseWebSearchCallSearchingEvent,
      );

    case "response.image_generation_call.completed":
      return responseImageGenCallCompletedEventDeserializer(
        item as ResponseImageGenCallCompletedEvent,
      );

    case "response.image_generation_call.generating":
      return responseImageGenCallGeneratingEventDeserializer(
        item as ResponseImageGenCallGeneratingEvent,
      );

    case "response.image_generation_call.in_progress":
      return responseImageGenCallInProgressEventDeserializer(
        item as ResponseImageGenCallInProgressEvent,
      );

    case "response.image_generation_call.partial_image":
      return responseImageGenCallPartialImageEventDeserializer(
        item as ResponseImageGenCallPartialImageEvent,
      );

    case "response.mcp_call.arguments_delta":
      return responseMCPCallArgumentsDeltaEventDeserializer(
        item as ResponseMCPCallArgumentsDeltaEvent,
      );

    case "response.mcp_call.arguments_done":
      return responseMCPCallArgumentsDoneEventDeserializer(
        item as ResponseMCPCallArgumentsDoneEvent,
      );

    case "response.mcp_call.completed":
      return responseMCPCallCompletedEventDeserializer(
        item as ResponseMCPCallCompletedEvent,
      );

    case "response.mcp_call.failed":
      return responseMCPCallFailedEventDeserializer(
        item as ResponseMCPCallFailedEvent,
      );

    case "response.mcp_call.in_progress":
      return responseMCPCallInProgressEventDeserializer(
        item as ResponseMCPCallInProgressEvent,
      );

    case "response.mcp_list_tools.completed":
      return responseMCPListToolsCompletedEventDeserializer(
        item as ResponseMCPListToolsCompletedEvent,
      );

    case "response.mcp_list_tools.failed":
      return responseMCPListToolsFailedEventDeserializer(
        item as ResponseMCPListToolsFailedEvent,
      );

    case "response.mcp_list_tools.in_progress":
      return responseMCPListToolsInProgressEventDeserializer(
        item as ResponseMCPListToolsInProgressEvent,
      );

    case "response.queued":
      return responseQueuedEventDeserializer(item as ResponseQueuedEvent);

    case "response.reasoning.delta":
      return responseReasoningDeltaEventDeserializer(
        item as ResponseReasoningDeltaEvent,
      );

    case "response.reasoning.done":
      return responseReasoningDoneEventDeserializer(
        item as ResponseReasoningDoneEvent,
      );

    case "response.reasoning_summary.delta":
      return responseReasoningSummaryDeltaEventDeserializer(
        item as ResponseReasoningSummaryDeltaEvent,
      );

    case "response.reasoning_summary.done":
      return responseReasoningSummaryDoneEventDeserializer(
        item as ResponseReasoningSummaryDoneEvent,
      );

    case "response.code_interpreter_call_code.delta":
      return responseCodeInterpreterCallCodeDeltaEventDeserializer(
        item as ResponseCodeInterpreterCallCodeDeltaEvent,
      );

    case "response.code_interpreter_call_code.done":
      return responseCodeInterpreterCallCodeDoneEventDeserializer(
        item as ResponseCodeInterpreterCallCodeDoneEvent,
      );

    case "response.code_interpreter_call.completed":
      return responseCodeInterpreterCallCompletedEventDeserializer(
        item as ResponseCodeInterpreterCallCompletedEvent,
      );

    case "response.code_interpreter_call.in_progress":
      return responseCodeInterpreterCallInProgressEventDeserializer(
        item as ResponseCodeInterpreterCallInProgressEvent,
      );

    case "response.code_interpreter_call.interpreting":
      return responseCodeInterpreterCallInterpretingEventDeserializer(
        item as ResponseCodeInterpreterCallInterpretingEvent,
      );

    default:
      return responseStreamEventDeserializer(item);
  }
}

/** Type of ResponseStreamEventType */
export type ResponseStreamEventType =
  | "response.audio.delta"
  | "response.audio.done"
  | "response.audio_transcript.delta"
  | "response.audio_transcript.done"
  | "response.code_interpreter_call_code.delta"
  | "response.code_interpreter_call_code.done"
  | "response.code_interpreter_call.completed"
  | "response.code_interpreter_call.in_progress"
  | "response.code_interpreter_call.interpreting"
  | "response.completed"
  | "response.content_part.added"
  | "response.content_part.done"
  | "response.created"
  | "error"
  | "response.file_search_call.completed"
  | "response.file_search_call.in_progress"
  | "response.file_search_call.searching"
  | "response.function_call_arguments.delta"
  | "response.function_call_arguments.done"
  | "response.in_progress"
  | "response.failed"
  | "response.incomplete"
  | "response.output_item.added"
  | "response.output_item.done"
  | "response.refusal.delta"
  | "response.refusal.done"
  | "response.output_text.annotation.added"
  | "response.output_text.delta"
  | "response.output_text.done"
  | "response.reasoning_summary_part.added"
  | "response.reasoning_summary_part.done"
  | "response.reasoning_summary_text.delta"
  | "response.reasoning_summary_text.done"
  | "response.web_search_call.completed"
  | "response.web_search_call.in_progress"
  | "response.web_search_call.searching"
  | "response.image_generation_call.completed"
  | "response.image_generation_call.generating"
  | "response.image_generation_call.in_progress"
  | "response.image_generation_call.partial_image"
  | "response.mcp_call.arguments_delta"
  | "response.mcp_call.arguments_done"
  | "response.mcp_call.completed"
  | "response.mcp_call.failed"
  | "response.mcp_call.in_progress"
  | "response.mcp_list_tools.completed"
  | "response.mcp_list_tools.failed"
  | "response.mcp_list_tools.in_progress"
  | "response.queued"
  | "response.reasoning.delta"
  | "response.reasoning.done"
  | "response.reasoning_summary.delta"
  | "response.reasoning_summary.done";

/** Emitted when the model response is complete. */
export interface ResponseCompletedEvent extends ResponseStreamEvent {
  /** The type of the event. Always `response.completed`. */
  type: "response.completed";
  /** Properties of the completed response. */
  response: Response;
}

export function responseCompletedEventDeserializer(
  item: any,
): ResponseCompletedEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    response: responseDeserializer(item["response"]),
  };
}

/** Emitted when a new content part is added. */
export interface ResponseContentPartAddedEvent extends ResponseStreamEvent {
  /** The type of the event. Always `response.content_part.added`. */
  type: "response.content_part.added";
  /** The ID of the output item that the content part was added to. */
  itemId: string;
  /** The index of the output item that the content part was added to. */
  outputIndex: number;
  /** The index of the content part that was added. */
  contentIndex: number;
  /** The content part that was added. */
  part: ItemContentUnion;
}

export function responseContentPartAddedEventDeserializer(
  item: any,
): ResponseContentPartAddedEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    contentIndex: item["content_index"],
    part: itemContentUnionDeserializer(item["part"]),
  };
}

/** Emitted when a content part is done. */
export interface ResponseContentPartDoneEvent extends ResponseStreamEvent {
  /** The type of the event. Always `response.content_part.done`. */
  type: "response.content_part.done";
  /** The ID of the output item that the content part was added to. */
  itemId: string;
  /** The index of the output item that the content part was added to. */
  outputIndex: number;
  /** The index of the content part that is done. */
  contentIndex: number;
  /** The content part that is done. */
  part: ItemContentUnion;
}

export function responseContentPartDoneEventDeserializer(
  item: any,
): ResponseContentPartDoneEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    contentIndex: item["content_index"],
    part: itemContentUnionDeserializer(item["part"]),
  };
}

/** An event that is emitted when a response is created. */
export interface ResponseCreatedEvent extends ResponseStreamEvent {
  /** The type of the event. Always `response.created`. */
  type: "response.created";
  /** The response that was created. */
  response: Response;
}

export function responseCreatedEventDeserializer(
  item: any,
): ResponseCreatedEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    response: responseDeserializer(item["response"]),
  };
}

/** Emitted when an error occurs. */
export interface ResponseErrorEvent extends ResponseStreamEvent {
  /** The type of the event. Always `error`. */
  type: "error";
  /** The error code. */
  code: string | null;
  /** The error message. */
  message: string;
  /** The error parameter. */
  param: string | null;
}

export function responseErrorEventDeserializer(item: any): ResponseErrorEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    code: item["code"],
    message: item["message"],
    param: item["param"],
  };
}

/** Emitted when a file search call is completed (results found). */
export interface ResponseFileSearchCallCompletedEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always `response.file_search_call.completed`. */
  type: "response.file_search_call.completed";
  /** The index of the output item that the file search call is initiated. */
  outputIndex: number;
  /** The ID of the output item that the file search call is initiated. */
  itemId: string;
}

export function responseFileSearchCallCompletedEventDeserializer(
  item: any,
): ResponseFileSearchCallCompletedEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    outputIndex: item["output_index"],
    itemId: item["item_id"],
  };
}

/** Emitted when a file search call is initiated. */
export interface ResponseFileSearchCallInProgressEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always `response.file_search_call.in_progress`. */
  type: "response.file_search_call.in_progress";
  /** The index of the output item that the file search call is initiated. */
  outputIndex: number;
  /** The ID of the output item that the file search call is initiated. */
  itemId: string;
}

export function responseFileSearchCallInProgressEventDeserializer(
  item: any,
): ResponseFileSearchCallInProgressEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    outputIndex: item["output_index"],
    itemId: item["item_id"],
  };
}

/** Emitted when a file search is currently searching. */
export interface ResponseFileSearchCallSearchingEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always `response.file_search_call.searching`. */
  type: "response.file_search_call.searching";
  /** The index of the output item that the file search call is searching. */
  outputIndex: number;
  /** The ID of the output item that the file search call is initiated. */
  itemId: string;
}

export function responseFileSearchCallSearchingEventDeserializer(
  item: any,
): ResponseFileSearchCallSearchingEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    outputIndex: item["output_index"],
    itemId: item["item_id"],
  };
}

/** Emitted when there is a partial function-call arguments delta. */
export interface ResponseFunctionCallArgumentsDeltaEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always `response.function_call_arguments.delta`. */
  type: "response.function_call_arguments.delta";
  /** The ID of the output item that the function-call arguments delta is added to. */
  itemId: string;
  /** The index of the output item that the function-call arguments delta is added to. */
  outputIndex: number;
  /** The function-call arguments delta that is added. */
  delta: string;
}

export function responseFunctionCallArgumentsDeltaEventDeserializer(
  item: any,
): ResponseFunctionCallArgumentsDeltaEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    delta: item["delta"],
  };
}

/** Emitted when function-call arguments are finalized. */
export interface ResponseFunctionCallArgumentsDoneEvent
  extends ResponseStreamEvent {
  type: "response.function_call_arguments.done";
  /** The ID of the item. */
  itemId: string;
  /** The index of the output item. */
  outputIndex: number;
  /** The function-call arguments. */
  arguments: string;
}

export function responseFunctionCallArgumentsDoneEventDeserializer(
  item: any,
): ResponseFunctionCallArgumentsDoneEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    arguments: item["arguments"],
  };
}

/** Emitted when the response is in progress. */
export interface ResponseInProgressEvent extends ResponseStreamEvent {
  /** The type of the event. Always `response.in_progress`. */
  type: "response.in_progress";
  /** The response that is in progress. */
  response: Response;
}

export function responseInProgressEventDeserializer(
  item: any,
): ResponseInProgressEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    response: responseDeserializer(item["response"]),
  };
}

/** An event that is emitted when a response fails. */
export interface ResponseFailedEvent extends ResponseStreamEvent {
  /** The type of the event. Always `response.failed`. */
  type: "response.failed";
  /** The response that failed. */
  response: Response;
}

export function responseFailedEventDeserializer(
  item: any,
): ResponseFailedEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    response: responseDeserializer(item["response"]),
  };
}

/** An event that is emitted when a response finishes as incomplete. */
export interface ResponseIncompleteEvent extends ResponseStreamEvent {
  /** The type of the event. Always `response.incomplete`. */
  type: "response.incomplete";
  /** The response that was incomplete. */
  response: Response;
}

export function responseIncompleteEventDeserializer(
  item: any,
): ResponseIncompleteEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    response: responseDeserializer(item["response"]),
  };
}

/** Emitted when a new output item is added. */
export interface ResponseOutputItemAddedEvent extends ResponseStreamEvent {
  /** The type of the event. Always `response.output_item.added`. */
  type: "response.output_item.added";
  /** The index of the output item that was added. */
  outputIndex: number;
  /** The output item that was added. */
  item: ItemResourceUnion;
}

export function responseOutputItemAddedEventDeserializer(
  item: any,
): ResponseOutputItemAddedEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    outputIndex: item["output_index"],
    item: itemResourceUnionDeserializer(item["item"]),
  };
}

/** Emitted when an output item is marked done. */
export interface ResponseOutputItemDoneEvent extends ResponseStreamEvent {
  /** The type of the event. Always `response.output_item.done`. */
  type: "response.output_item.done";
  /** The index of the output item that was marked done. */
  outputIndex: number;
  /** The output item that was marked done. */
  item: ItemResourceUnion;
}

export function responseOutputItemDoneEventDeserializer(
  item: any,
): ResponseOutputItemDoneEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    outputIndex: item["output_index"],
    item: itemResourceUnionDeserializer(item["item"]),
  };
}

/** Emitted when there is a partial refusal text. */
export interface ResponseRefusalDeltaEvent extends ResponseStreamEvent {
  /** The type of the event. Always `response.refusal.delta`. */
  type: "response.refusal.delta";
  /** The ID of the output item that the refusal text is added to. */
  itemId: string;
  /** The index of the output item that the refusal text is added to. */
  outputIndex: number;
  /** The index of the content part that the refusal text is added to. */
  contentIndex: number;
  /** The refusal text that is added. */
  delta: string;
}

export function responseRefusalDeltaEventDeserializer(
  item: any,
): ResponseRefusalDeltaEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    contentIndex: item["content_index"],
    delta: item["delta"],
  };
}

/** Emitted when refusal text is finalized. */
export interface ResponseRefusalDoneEvent extends ResponseStreamEvent {
  /** The type of the event. Always `response.refusal.done`. */
  type: "response.refusal.done";
  /** The ID of the output item that the refusal text is finalized. */
  itemId: string;
  /** The index of the output item that the refusal text is finalized. */
  outputIndex: number;
  /** The index of the content part that the refusal text is finalized. */
  contentIndex: number;
  /** The refusal text that is finalized. */
  refusal: string;
}

export function responseRefusalDoneEventDeserializer(
  item: any,
): ResponseRefusalDoneEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    contentIndex: item["content_index"],
    refusal: item["refusal"],
  };
}

/** Emitted when there is an additional text delta. */
export interface ResponseTextDeltaEvent extends ResponseStreamEvent {
  /** The type of the event. Always `response.output_text.delta`. */
  type: "response.output_text.delta";
  /** The ID of the output item that the text delta was added to. */
  itemId: string;
  /** The index of the output item that the text delta was added to. */
  outputIndex: number;
  /** The index of the content part that the text delta was added to. */
  contentIndex: number;
  /** The text delta that was added. */
  delta: string;
}

export function responseTextDeltaEventDeserializer(
  item: any,
): ResponseTextDeltaEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    contentIndex: item["content_index"],
    delta: item["delta"],
  };
}

/** Emitted when text content is finalized. */
export interface ResponseTextDoneEvent extends ResponseStreamEvent {
  /** The type of the event. Always `response.output_text.done`. */
  type: "response.output_text.done";
  /** The ID of the output item that the text content is finalized. */
  itemId: string;
  /** The index of the output item that the text content is finalized. */
  outputIndex: number;
  /** The index of the content part that the text content is finalized. */
  contentIndex: number;
  /** The text content that is finalized. */
  text: string;
}

export function responseTextDoneEventDeserializer(
  item: any,
): ResponseTextDoneEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    contentIndex: item["content_index"],
    text: item["text"],
  };
}

/** Emitted when a new reasoning summary part is added. */
export interface ResponseReasoningSummaryPartAddedEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always `response.reasoning_summary_part.added`. */
  type: "response.reasoning_summary_part.added";
  /** The ID of the item this summary part is associated with. */
  itemId: string;
  /** The index of the output item this summary part is associated with. */
  outputIndex: number;
  /** The index of the summary part within the reasoning summary. */
  summaryIndex: number;
  /** The summary part that was added. */
  part: ReasoningItemSummaryPartUnion;
}

export function responseReasoningSummaryPartAddedEventDeserializer(
  item: any,
): ResponseReasoningSummaryPartAddedEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    summaryIndex: item["summary_index"],
    part: reasoningItemSummaryPartUnionDeserializer(item["part"]),
  };
}

/** Emitted when a reasoning summary part is completed. */
export interface ResponseReasoningSummaryPartDoneEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always `response.reasoning_summary_part.done`. */
  type: "response.reasoning_summary_part.done";
  /** The ID of the item this summary part is associated with. */
  itemId: string;
  /** The index of the output item this summary part is associated with. */
  outputIndex: number;
  /** The index of the summary part within the reasoning summary. */
  summaryIndex: number;
  /** The completed summary part. */
  part: ReasoningItemSummaryPartUnion;
}

export function responseReasoningSummaryPartDoneEventDeserializer(
  item: any,
): ResponseReasoningSummaryPartDoneEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    summaryIndex: item["summary_index"],
    part: reasoningItemSummaryPartUnionDeserializer(item["part"]),
  };
}

/** Emitted when a delta is added to a reasoning summary text. */
export interface ResponseReasoningSummaryTextDeltaEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always `response.reasoning_summary_text.delta`. */
  type: "response.reasoning_summary_text.delta";
  /** The ID of the item this summary text delta is associated with. */
  itemId: string;
  /** The index of the output item this summary text delta is associated with. */
  outputIndex: number;
  /** The index of the summary part within the reasoning summary. */
  summaryIndex: number;
  /** The text delta that was added to the summary. */
  delta: string;
}

export function responseReasoningSummaryTextDeltaEventDeserializer(
  item: any,
): ResponseReasoningSummaryTextDeltaEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    summaryIndex: item["summary_index"],
    delta: item["delta"],
  };
}

/** Emitted when a reasoning summary text is completed. */
export interface ResponseReasoningSummaryTextDoneEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always `response.reasoning_summary_text.done`. */
  type: "response.reasoning_summary_text.done";
  /** The ID of the item this summary text is associated with. */
  itemId: string;
  /** The index of the output item this summary text is associated with. */
  outputIndex: number;
  /** The index of the summary part within the reasoning summary. */
  summaryIndex: number;
  /** The full text of the completed reasoning summary. */
  text: string;
}

export function responseReasoningSummaryTextDoneEventDeserializer(
  item: any,
): ResponseReasoningSummaryTextDoneEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    summaryIndex: item["summary_index"],
    text: item["text"],
  };
}

/** Note: web_search is not yet available via Azure OpenAI. */
export interface ResponseWebSearchCallCompletedEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always `response.web_search_call.completed`. */
  type: "response.web_search_call.completed";
  /** The index of the output item that the web search call is associated with. */
  outputIndex: number;
  /** Unique ID for the output item associated with the web search call. */
  itemId: string;
}

export function responseWebSearchCallCompletedEventDeserializer(
  item: any,
): ResponseWebSearchCallCompletedEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    outputIndex: item["output_index"],
    itemId: item["item_id"],
  };
}

/** Note: web_search is not yet available via Azure OpenAI. */
export interface ResponseWebSearchCallInProgressEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always `response.web_search_call.in_progress`. */
  type: "response.web_search_call.in_progress";
  /** The index of the output item that the web search call is associated with. */
  outputIndex: number;
  /** Unique ID for the output item associated with the web search call. */
  itemId: string;
}

export function responseWebSearchCallInProgressEventDeserializer(
  item: any,
): ResponseWebSearchCallInProgressEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    outputIndex: item["output_index"],
    itemId: item["item_id"],
  };
}

/** Note: web_search is not yet available via Azure OpenAI. */
export interface ResponseWebSearchCallSearchingEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always `response.web_search_call.searching`. */
  type: "response.web_search_call.searching";
  /** The index of the output item that the web search call is associated with. */
  outputIndex: number;
  /** Unique ID for the output item associated with the web search call. */
  itemId: string;
}

export function responseWebSearchCallSearchingEventDeserializer(
  item: any,
): ResponseWebSearchCallSearchingEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    outputIndex: item["output_index"],
    itemId: item["item_id"],
  };
}

/** Emitted when an image generation tool call has completed and the final image is available. */
export interface ResponseImageGenCallCompletedEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always 'response.image_generation_call.completed'. */
  type: "response.image_generation_call.completed";
  /** The index of the output item in the response's output array. */
  outputIndex: number;
  /** The unique identifier of the image generation item being processed. */
  itemId: string;
}

export function responseImageGenCallCompletedEventDeserializer(
  item: any,
): ResponseImageGenCallCompletedEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    outputIndex: item["output_index"],
    itemId: item["item_id"],
  };
}

/** Emitted when an image generation tool call is actively generating an image (intermediate state). */
export interface ResponseImageGenCallGeneratingEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always 'response.image_generation_call.generating'. */
  type: "response.image_generation_call.generating";
  /** The index of the output item in the response's output array. */
  outputIndex: number;
  /** The unique identifier of the image generation item being processed. */
  itemId: string;
}

export function responseImageGenCallGeneratingEventDeserializer(
  item: any,
): ResponseImageGenCallGeneratingEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    outputIndex: item["output_index"],
    itemId: item["item_id"],
  };
}

/** Emitted when an image generation tool call is in progress. */
export interface ResponseImageGenCallInProgressEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always 'response.image_generation_call.in_progress'. */
  type: "response.image_generation_call.in_progress";
  /** The index of the output item in the response's output array. */
  outputIndex: number;
  /** The unique identifier of the image generation item being processed. */
  itemId: string;
}

export function responseImageGenCallInProgressEventDeserializer(
  item: any,
): ResponseImageGenCallInProgressEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    outputIndex: item["output_index"],
    itemId: item["item_id"],
  };
}

/** Emitted when a partial image is available during image generation streaming. */
export interface ResponseImageGenCallPartialImageEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always 'response.image_generation_call.partial_image'. */
  type: "response.image_generation_call.partial_image";
  /** The index of the output item in the response's output array. */
  outputIndex: number;
  /** The unique identifier of the image generation item being processed. */
  itemId: string;
  /** 0-based index for the partial image (backend is 1-based, but this is 0-based for the user). */
  partialImageIndex: number;
  /** Base64-encoded partial image data, suitable for rendering as an image. */
  partialImageB64: string;
}

export function responseImageGenCallPartialImageEventDeserializer(
  item: any,
): ResponseImageGenCallPartialImageEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    outputIndex: item["output_index"],
    itemId: item["item_id"],
    partialImageIndex: item["partial_image_index"],
    partialImageB64: item["partial_image_b64"],
  };
}

/** Emitted when there is a delta (partial update) to the arguments of an MCP tool call. */
export interface ResponseMCPCallArgumentsDeltaEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always 'response.mcp_call.arguments_delta'. */
  type: "response.mcp_call.arguments_delta";
  /** The index of the output item in the response's output array. */
  outputIndex: number;
  /** The unique identifier of the MCP tool call item being processed. */
  itemId: string;
  /** The partial update to the arguments for the MCP tool call. */
  delta: any;
}

export function responseMCPCallArgumentsDeltaEventDeserializer(
  item: any,
): ResponseMCPCallArgumentsDeltaEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    outputIndex: item["output_index"],
    itemId: item["item_id"],
    delta: item["delta"],
  };
}

/** Emitted when the arguments for an MCP tool call are finalized. */
export interface ResponseMCPCallArgumentsDoneEvent extends ResponseStreamEvent {
  /** The type of the event. Always 'response.mcp_call.arguments_done'. */
  type: "response.mcp_call.arguments_done";
  /** The index of the output item in the response's output array. */
  outputIndex: number;
  /** The unique identifier of the MCP tool call item being processed. */
  itemId: string;
  /** The finalized arguments for the MCP tool call. */
  arguments: any;
}

export function responseMCPCallArgumentsDoneEventDeserializer(
  item: any,
): ResponseMCPCallArgumentsDoneEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    outputIndex: item["output_index"],
    itemId: item["item_id"],
    arguments: item["arguments"],
  };
}

/** Emitted when an MCP  tool call has completed successfully. */
export interface ResponseMCPCallCompletedEvent extends ResponseStreamEvent {
  /** The type of the event. Always 'response.mcp_call.completed'. */
  type: "response.mcp_call.completed";
}

export function responseMCPCallCompletedEventDeserializer(
  item: any,
): ResponseMCPCallCompletedEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
  };
}

/** Emitted when an MCP  tool call has failed. */
export interface ResponseMCPCallFailedEvent extends ResponseStreamEvent {
  /** The type of the event. Always 'response.mcp_call.failed'. */
  type: "response.mcp_call.failed";
}

export function responseMCPCallFailedEventDeserializer(
  item: any,
): ResponseMCPCallFailedEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
  };
}

/** Emitted when an MCP  tool call is in progress. */
export interface ResponseMCPCallInProgressEvent extends ResponseStreamEvent {
  /** The type of the event. Always 'response.mcp_call.in_progress'. */
  type: "response.mcp_call.in_progress";
  /** The index of the output item in the response's output array. */
  outputIndex: number;
  /** The unique identifier of the MCP tool call item being processed. */
  itemId: string;
}

export function responseMCPCallInProgressEventDeserializer(
  item: any,
): ResponseMCPCallInProgressEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    outputIndex: item["output_index"],
    itemId: item["item_id"],
  };
}

/** Emitted when the list of available MCP tools has been successfully retrieved. */
export interface ResponseMCPListToolsCompletedEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always 'response.mcp_list_tools.completed'. */
  type: "response.mcp_list_tools.completed";
}

export function responseMCPListToolsCompletedEventDeserializer(
  item: any,
): ResponseMCPListToolsCompletedEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
  };
}

/** Emitted when the attempt to list available MCP tools has failed. */
export interface ResponseMCPListToolsFailedEvent extends ResponseStreamEvent {
  /** The type of the event. Always 'response.mcp_list_tools.failed'. */
  type: "response.mcp_list_tools.failed";
}

export function responseMCPListToolsFailedEventDeserializer(
  item: any,
): ResponseMCPListToolsFailedEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
  };
}

/** Emitted when the system is in the process of retrieving the list of available MCP tools. */
export interface ResponseMCPListToolsInProgressEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always 'response.mcp_list_tools.in_progress'. */
  type: "response.mcp_list_tools.in_progress";
}

export function responseMCPListToolsInProgressEventDeserializer(
  item: any,
): ResponseMCPListToolsInProgressEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
  };
}

/** Emitted when a response is queued and waiting to be processed. */
export interface ResponseQueuedEvent extends ResponseStreamEvent {
  /** The type of the event. Always 'response.queued'. */
  type: "response.queued";
  /** The full response object that is queued. */
  response: Response;
}

export function responseQueuedEventDeserializer(
  item: any,
): ResponseQueuedEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    response: responseDeserializer(item["response"]),
  };
}

/** Emitted when there is a delta (partial update) to the reasoning content. */
export interface ResponseReasoningDeltaEvent extends ResponseStreamEvent {
  /** The type of the event. Always 'response.reasoning.delta'. */
  type: "response.reasoning.delta";
  /** The unique identifier of the item for which reasoning is being updated. */
  itemId: string;
  /** The index of the output item in the response's output array. */
  outputIndex: number;
  /** The index of the reasoning content part within the output item. */
  contentIndex: number;
  /** The partial update to the reasoning content. */
  delta: any;
}

export function responseReasoningDeltaEventDeserializer(
  item: any,
): ResponseReasoningDeltaEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    contentIndex: item["content_index"],
    delta: item["delta"],
  };
}

/** Emitted when the reasoning content is finalized for an item. */
export interface ResponseReasoningDoneEvent extends ResponseStreamEvent {
  /** The type of the event. Always 'response.reasoning.done'. */
  type: "response.reasoning.done";
  /** The unique identifier of the item for which reasoning is finalized. */
  itemId: string;
  /** The index of the output item in the response's output array. */
  outputIndex: number;
  /** The index of the reasoning content part within the output item. */
  contentIndex: number;
  /** The finalized reasoning text. */
  text: string;
}

export function responseReasoningDoneEventDeserializer(
  item: any,
): ResponseReasoningDoneEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    contentIndex: item["content_index"],
    text: item["text"],
  };
}

/** Emitted when there is a delta (partial update) to the reasoning summary content. */
export interface ResponseReasoningSummaryDeltaEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always 'response.reasoning_summary.delta'. */
  type: "response.reasoning_summary.delta";
  /** The unique identifier of the item for which the reasoning summary is being updated. */
  itemId: string;
  /** The index of the output item in the response's output array. */
  outputIndex: number;
  /** The index of the summary part within the output item. */
  summaryIndex: number;
  /** The partial update to the reasoning summary content. */
  delta: any;
}

export function responseReasoningSummaryDeltaEventDeserializer(
  item: any,
): ResponseReasoningSummaryDeltaEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    summaryIndex: item["summary_index"],
    delta: item["delta"],
  };
}

/** Emitted when the reasoning summary content is finalized for an item. */
export interface ResponseReasoningSummaryDoneEvent extends ResponseStreamEvent {
  /** The type of the event. Always 'response.reasoning_summary.done'. */
  type: "response.reasoning_summary.done";
  /** The unique identifier of the item for which the reasoning summary is finalized. */
  itemId: string;
  /** The index of the output item in the response's output array. */
  outputIndex: number;
  /** The index of the summary part within the output item. */
  summaryIndex: number;
  /** The finalized reasoning summary text. */
  text: string;
}

export function responseReasoningSummaryDoneEventDeserializer(
  item: any,
): ResponseReasoningSummaryDoneEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    summaryIndex: item["summary_index"],
    text: item["text"],
  };
}

/** Emitted when a partial code snippet is streamed by the code interpreter. */
export interface ResponseCodeInterpreterCallCodeDeltaEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always `response.code_interpreter_call_code.delta`. */
  type: "response.code_interpreter_call_code.delta";
  /** The index of the output item in the response for which the code is being streamed. */
  outputIndex: number;
  /** The unique identifier of the code interpreter tool call item. */
  itemId: string;
  /** The partial code snippet being streamed by the code interpreter. */
  delta: string;
}

export function responseCodeInterpreterCallCodeDeltaEventDeserializer(
  item: any,
): ResponseCodeInterpreterCallCodeDeltaEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    outputIndex: item["output_index"],
    itemId: item["item_id"],
    delta: item["delta"],
  };
}

/** Emitted when the code snippet is finalized by the code interpreter. */
export interface ResponseCodeInterpreterCallCodeDoneEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always `response.code_interpreter_call_code.done`. */
  type: "response.code_interpreter_call_code.done";
  /** The index of the output item in the response for which the code is finalized. */
  outputIndex: number;
  /** The unique identifier of the code interpreter tool call item. */
  itemId: string;
  /** The final code snippet output by the code interpreter. */
  code: string;
}

export function responseCodeInterpreterCallCodeDoneEventDeserializer(
  item: any,
): ResponseCodeInterpreterCallCodeDoneEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    outputIndex: item["output_index"],
    itemId: item["item_id"],
    code: item["code"],
  };
}

/** Emitted when the code interpreter call is completed. */
export interface ResponseCodeInterpreterCallCompletedEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always `response.code_interpreter_call.completed`. */
  type: "response.code_interpreter_call.completed";
  /** The index of the output item in the response for which the code interpreter call is completed. */
  outputIndex: number;
  /** The unique identifier of the code interpreter tool call item. */
  itemId: string;
}

export function responseCodeInterpreterCallCompletedEventDeserializer(
  item: any,
): ResponseCodeInterpreterCallCompletedEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    outputIndex: item["output_index"],
    itemId: item["item_id"],
  };
}

/** Emitted when a code interpreter call is in progress. */
export interface ResponseCodeInterpreterCallInProgressEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always `response.code_interpreter_call.in_progress`. */
  type: "response.code_interpreter_call.in_progress";
  /** The index of the output item in the response for which the code interpreter call is in progress. */
  outputIndex: number;
  /** The unique identifier of the code interpreter tool call item. */
  itemId: string;
}

export function responseCodeInterpreterCallInProgressEventDeserializer(
  item: any,
): ResponseCodeInterpreterCallInProgressEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    outputIndex: item["output_index"],
    itemId: item["item_id"],
  };
}

/** Emitted when the code interpreter is actively interpreting the code snippet. */
export interface ResponseCodeInterpreterCallInterpretingEvent
  extends ResponseStreamEvent {
  /** The type of the event. Always `response.code_interpreter_call.interpreting`. */
  type: "response.code_interpreter_call.interpreting";
  /** The index of the output item in the response for which the code interpreter is interpreting code. */
  outputIndex: number;
  /** The unique identifier of the code interpreter tool call item. */
  itemId: string;
}

export function responseCodeInterpreterCallInterpretingEventDeserializer(
  item: any,
): ResponseCodeInterpreterCallInterpretingEvent {
  return {
    type: item["type"],
    sequenceNumber: item["sequence_number"],
    outputIndex: item["output_index"],
    itemId: item["item_id"],
  };
}

/** The result of a delete response operation. */
export interface DeleteResponseResult {
  /** The operation ID. */
  id: string;
  /** Always return 'response'. */
  object: "response";
  /** Always return true */
  deleted: true;
}

export function deleteResponseResultDeserializer(
  item: any,
): DeleteResponseResult {
  return {
    id: item["id"],
    object: item["object"],
    deleted: item["deleted"],
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultResponse {
  /** The requested list of items. */
  data: Response[];
  /** The first ID represented in this list. */
  firstId?: string;
  /** The last ID represented in this list. */
  lastId?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

export function _agentsPagedResultResponseDeserializer(
  item: any,
): _AgentsPagedResultResponse {
  return {
    data: responseArrayDeserializer(item["data"]),
    firstId: item["first_id"],
    lastId: item["last_id"],
    hasMore: item["has_more"],
  };
}

export function responseArrayDeserializer(result: Array<Response>): any[] {
  return result.map((item) => {
    return responseDeserializer(item);
  });
}

/** Azure AI Agents API versions */
export enum KnownVersions {
  /** Azure AI API version 2025-05-01. */
  V20250501 = "2025-05-01",
  /** Azure AI API version v2. */
  V2 = "v2",
}
