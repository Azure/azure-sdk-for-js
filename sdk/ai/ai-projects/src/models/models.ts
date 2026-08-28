// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NodeReadableStream } from "#platform/static-helpers/platform-types";
import type { FileContents } from "../static-helpers/multipartHelpers.js";
import { createFilePartDescriptor } from "../static-helpers/multipartHelpers.js";
import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

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
  /** The operational state of the agent. Controls whether the agent endpoint accepts or rejects requests. */
  readonly state: AgentState;
  /** The source of the agent's operational state. When the agent is disabled, indicates where the disabled state originates from. Empty when not derived from a specific source. */
  readonly state_source?: AgentStateSource;
  /** The latest version of the agent. */
  versions: {
    latest: AgentVersion;
  };
  /** The endpoint configuration for the agent */
  agent_endpoint?: AgentEndpointConfig;
  /** (Preview) The type of digital worker (previously known as `autopilot`). If omitted, it is not a digital worker. */
  digital_worker_type?: DigitalWorkerType;
  /** The instance identity of the agent */
  readonly instance_identity?: AgentIdentity;
  /** The blueprint for the agent */
  readonly blueprint?: AgentIdentity;
  /** The blueprint for the agent */
  readonly blueprint_reference?: AgentBlueprintReferenceUnion;
  agent_card?: AgentCard;
}

export function agentDeserializer(item: any): Agent {
  return {
    object: item["object"],
    id: item["id"],
    name: item["name"],
    state: item["state"],
    state_source: item["state_source"],
    versions: _agentVersionsDeserializer(item["versions"]),
    agent_endpoint: !item["agent_endpoint"]
      ? item["agent_endpoint"]
      : agentEndpointConfigDeserializer(item["agent_endpoint"]),
    digital_worker_type: item["digital_worker_type"],
    instance_identity: !item["instance_identity"]
      ? item["instance_identity"]
      : agentIdentityDeserializer(item["instance_identity"]),
    blueprint: !item["blueprint"]
      ? item["blueprint"]
      : agentIdentityDeserializer(item["blueprint"]),
    blueprint_reference: !item["blueprint_reference"]
      ? item["blueprint_reference"]
      : agentBlueprintReferenceUnionDeserializer(item["blueprint_reference"]),
    agent_card: !item["agent_card"]
      ? item["agent_card"]
      : agentCardDeserializer(item["agent_card"]),
  };
}

/** The operational state of an agent. */
export type AgentState = "enabled" | "disabled";
/** Indicates the source of an agent's operational state. Empty when the state is not derived from a specific source. */
export type AgentStateSource = "agent_instance_identity" | "agent_blueprint";

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
  metadata?: Record<string, string>;
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
  /** Whether this agent version is a draft (candidate) rather than a release. Draft versions are recorded but excluded from default 'latest' resolution and are not auto-promoted. Defaults to false. */
  draft?: boolean;
  /** The provisioning status of the agent version. Defaults to 'active' for non-hosted agents. For hosted agents, reflects infrastructure readiness. */
  status?: AgentVersionStatus;
  /** The instance identity of the agent */
  readonly instance_identity?: AgentIdentity;
  /** The blueprint for the agent */
  readonly blueprint?: AgentIdentity;
  /** The blueprint for the agent */
  readonly blueprint_reference?: AgentBlueprintReferenceUnion;
  /** The unique GUID identifier of the agent. */
  readonly agent_guid?: string;
}

export function agentVersionDeserializer(item: any): AgentVersion {
  return {
    metadata: item["metadata"],
    object: item["object"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    status: item["status"],
    description: item["description"],
    created_at: new Date(item["created_at"] * 1000),
    definition: agentDefinitionUnionDeserializer(item["definition"]),
    draft: item["draft"],
    instance_identity: !item["instance_identity"]
      ? item["instance_identity"]
      : agentIdentityDeserializer(item["instance_identity"]),
    blueprint: !item["blueprint"]
      ? item["blueprint"]
      : agentIdentityDeserializer(item["blueprint"]),
    blueprint_reference: !item["blueprint_reference"]
      ? item["blueprint_reference"]
      : agentBlueprintReferenceUnionDeserializer(item["blueprint_reference"]),
    agent_guid: item["agent_guid"],
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
 * Supports workflow, hosted, container app, prompt and external agents.
 */
export type AgentDefinitionUnion =
  | HostedAgentDefinition
  | PromptAgentDefinition
  | WorkflowAgentDefinition
  | ExternalAgentDefinition
  | VoiceAgentDefinition
  | AgentDefinition;

export function agentDefinitionUnionSerializer(item: AgentDefinitionUnion): any {
  switch (item.kind) {
    case "hosted":
      return hostedAgentDefinitionSerializer(item as HostedAgentDefinition);

    case "prompt":
      return promptAgentDefinitionSerializer(item as PromptAgentDefinition);

    case "workflow":
      return workflowAgentDefinitionSerializer(item as WorkflowAgentDefinition);

    case "external":
      return externalAgentDefinitionSerializer(item as ExternalAgentDefinition);

    case "voice":
      return voiceAgentDefinitionSerializer(item as VoiceAgentDefinition);

    default:
      return agentDefinitionSerializer(item);
  }
}

export function agentDefinitionUnionDeserializer(item: any): AgentDefinitionUnion {
  switch (item["kind"]) {
    case "hosted":
      return hostedAgentDefinitionDeserializer(item as HostedAgentDefinition);

    case "prompt":
      return promptAgentDefinitionDeserializer(item as PromptAgentDefinition);

    case "workflow":
      return workflowAgentDefinitionDeserializer(item as WorkflowAgentDefinition);

    case "external":
      return externalAgentDefinitionDeserializer(item as ExternalAgentDefinition);

    case "voice":
      return voiceAgentDefinitionDeserializer(item as VoiceAgentDefinition);

    default:
      return agentDefinitionDeserializer(item);
  }
}

/**
 * Defines the type/kind of agent.
 * Determines which agent definition structure is used.
 */
export type AgentKind = "prompt" | "hosted" | "workflow" | "external" | "voice";

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

/** The hosted agent definition. */
export interface HostedAgentDefinition extends AgentDefinition {
  kind: "hosted";
  /** The CPU configuration for the hosted agent. */
  cpu: string;
  /** The memory configuration for the hosted agent. */
  memory: string;
  /** Environment variables to set in the hosted agent container. */
  environment_variables?: Record<string, string>;
  /** Container-based deployment configuration. Provide this for image-based deployments. Mutually exclusive with code_configuration — the service validates that exactly one is set. */
  container_configuration?: ContainerConfiguration;
  /** The protocols that the agent supports for ingress communication. */
  protocol_versions?: ProtocolVersionRecord[];
  /** Code-based deployment configuration. Provide this for code-based deployments. Mutually exclusive with container_configuration — the service validates that exactly one is set. */
  code_configuration?: CodeConfiguration;
  /** Optional customer-supplied telemetry configuration for exporting container logs, traces, and metrics. */
  telemetry_config?: TelemetryConfig;
  /** Optional session defaults (for example, the idle timeout) applied to sessions created for this agent version. */
  session_configuration?: SessionConfiguration;
}

export function hostedAgentDefinitionSerializer(item: HostedAgentDefinition): any {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"] ? item["rai_config"] : raiConfigSerializer(item["rai_config"]),
    cpu: item["cpu"],
    memory: item["memory"],
    environment_variables: item["environment_variables"],
    container_configuration: !item["container_configuration"]
      ? item["container_configuration"]
      : containerConfigurationSerializer(item["container_configuration"]),
    protocol_versions: !item["protocol_versions"]
      ? item["protocol_versions"]
      : protocolVersionRecordArraySerializer(item["protocol_versions"]),
    code_configuration: !item["code_configuration"]
      ? item["code_configuration"]
      : codeConfigurationSerializer(item["code_configuration"]),
    telemetry_config: !item["telemetry_config"]
      ? item["telemetry_config"]
      : telemetryConfigSerializer(item["telemetry_config"]),
    session_configuration: !item["session_configuration"]
      ? item["session_configuration"]
      : sessionConfigurationSerializer(item["session_configuration"]),
  };
}

export function hostedAgentDefinitionDeserializer(item: any): HostedAgentDefinition {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"]
      ? item["rai_config"]
      : raiConfigDeserializer(item["rai_config"]),
    cpu: item["cpu"],
    memory: item["memory"],
    environment_variables: item["environment_variables"],
    container_configuration: !item["container_configuration"]
      ? item["container_configuration"]
      : containerConfigurationDeserializer(item["container_configuration"]),
    protocol_versions: !item["protocol_versions"]
      ? item["protocol_versions"]
      : protocolVersionRecordArrayDeserializer(item["protocol_versions"]),
    code_configuration: !item["code_configuration"]
      ? item["code_configuration"]
      : codeConfigurationDeserializer(item["code_configuration"]),
    telemetry_config: !item["telemetry_config"]
      ? item["telemetry_config"]
      : telemetryConfigDeserializer(item["telemetry_config"]),
    session_configuration: !item["session_configuration"]
      ? item["session_configuration"]
      : sessionConfigurationDeserializer(item["session_configuration"]),
  };
}

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
  /** The tool type identifier. */
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
  | A2ATool
  | WorkIQPreviewTool
  | FabricIQPreviewTool
  | WebIQPreviewTool
  | MemorySearchPreviewTool
  | CodeInterpreterTool
  | FileSearchTool
  | WebSearchTool
  | MCPTool
  | FunctionTool
  | ComputerUsePreviewTool
  | ProgrammaticToolCallingParam
  | ImageGenTool
  | LocalShellToolParam
  | FunctionShellToolParam
  | CustomToolParam
  | WebSearchPreviewTool
  | ApplyPatchToolParam
  | ComputerTool
  | NamespaceToolParam
  | ToolSearchToolParam
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

    case "a2a":
      return a2AToolSerializer(item as A2ATool);

    case "work_iq_preview":
      return workIQPreviewToolSerializer(item as WorkIQPreviewTool);

    case "fabric_iq_preview":
      return fabricIQPreviewToolSerializer(item as FabricIQPreviewTool);

    case "web_iq_preview":
      return webIQPreviewToolSerializer(item as WebIQPreviewTool);

    case "memory_search_preview":
      return memorySearchPreviewToolSerializer(item as MemorySearchPreviewTool);

    case "code_interpreter":
      return codeInterpreterToolSerializer(item as CodeInterpreterTool);

    case "file_search":
      return fileSearchToolSerializer(item as FileSearchTool);

    case "web_search":
      return webSearchToolSerializer(item as WebSearchTool);

    case "mcp":
      return mcpToolSerializer(item as MCPTool);

    case "function":
      return functionToolSerializer(item as FunctionTool);

    case "computer_use_preview":
      return computerUsePreviewToolSerializer(item as ComputerUsePreviewTool);

    case "programmatic_tool_calling":
      return programmaticToolCallingParamSerializer(item as ProgrammaticToolCallingParam);

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

    case "computer":
      return computerToolSerializer(item as ComputerTool);

    case "namespace":
      return namespaceToolParamSerializer(item as NamespaceToolParam);

    case "tool_search":
      return toolSearchToolParamSerializer(item as ToolSearchToolParam);

    default:
      return toolSerializer(item);
  }
}

export function toolUnionDeserializer(item: any): ToolUnion {
  switch (item["type"]) {
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

    case "a2a":
      return a2AToolDeserializer(item as A2ATool);

    case "work_iq_preview":
      return workIQPreviewToolDeserializer(item as WorkIQPreviewTool);

    case "fabric_iq_preview":
      return fabricIQPreviewToolDeserializer(item as FabricIQPreviewTool);

    case "web_iq_preview":
      return webIQPreviewToolDeserializer(item as WebIQPreviewTool);

    case "memory_search_preview":
      return memorySearchPreviewToolDeserializer(item as MemorySearchPreviewTool);

    case "code_interpreter":
      return codeInterpreterToolDeserializer(item as CodeInterpreterTool);

    case "file_search":
      return fileSearchToolDeserializer(item as FileSearchTool);

    case "web_search":
      return webSearchToolDeserializer(item as WebSearchTool);

    case "mcp":
      return mcpToolDeserializer(item as MCPTool);

    case "function":
      return functionToolDeserializer(item as FunctionTool);

    case "computer_use_preview":
      return computerUsePreviewToolDeserializer(item as ComputerUsePreviewTool);

    case "programmatic_tool_calling":
      return programmaticToolCallingParamDeserializer(item as ProgrammaticToolCallingParam);

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

    case "computer":
      return computerToolDeserializer(item as ComputerTool);

    case "namespace":
      return namespaceToolParamDeserializer(item as NamespaceToolParam);

    case "tool_search":
      return toolSearchToolParamDeserializer(item as ToolSearchToolParam);

    default:
      return toolDeserializer(item);
  }
}

/** Type of ToolType */
export type ToolType =
  | "function"
  | "file_search"
  | "computer"
  | "computer_use_preview"
  | "web_search"
  | "mcp"
  | "code_interpreter"
  | "programmatic_tool_calling"
  | "image_generation"
  | "local_shell"
  | "shell"
  | "custom"
  | "namespace"
  | "tool_search"
  | "web_search_preview"
  | "apply_patch"
  | "a2a_preview"
  | "bing_custom_search_preview"
  | "browser_automation_preview"
  | "fabric_dataagent_preview"
  | "sharepoint_grounding_preview"
  | "memory_search_preview"
  | "work_iq_preview"
  | "fabric_iq_preview"
  | "toolbox_search_preview"
  | "web_iq_preview"
  | "a2a"
  | "azure_ai_search"
  | "azure_function"
  | "bing_grounding"
  | "capture_structured_outputs"
  | "openapi";

/** The input definition information for a bing grounding search tool as used to configure an agent. */
export interface BingGroundingTool extends Tool {
  /** The object type, which is always 'bing_grounding'. */
  type: "bing_grounding";
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  name?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  description?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  tool_configs?: Record<string, ToolConfig>;
  /** The bing grounding search tool parameters. */
  bing_grounding: BingGroundingSearchToolParameters;
}

export function bingGroundingToolSerializer(item: BingGroundingTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    bing_grounding: bingGroundingSearchToolParametersSerializer(item["bing_grounding"]),
  };
}

export function bingGroundingToolDeserializer(item: any): BingGroundingTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
    bing_grounding: bingGroundingSearchToolParametersDeserializer(item["bing_grounding"]),
  };
}

export function toolConfigRecordSerializer(item: Record<string, ToolConfig>): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : toolConfigSerializer(item[key]);
  });
  return result;
}

export function toolConfigRecordDeserializer(
  item: Record<string, any>,
): Record<string, ToolConfig> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : toolConfigDeserializer(item[key]);
  });
  return result;
}

/** Per-tool configuration that controls tool visibility and search behavior. */
export interface ToolConfig {
  /**
   * When true, the tool is always included in agent context and visible in `tools/list`.
   * When false (default), the tool is hidden from `tools/list` and only discoverable via `tool_search`.
   */
  pin?: boolean;
  /**
   * Additional text indexed for tool_search. Supplements the native tool description
   * to improve discoverability. Does not alter `tools/list` output.
   */
  additional_search_text?: string;
}

export function toolConfigSerializer(item: ToolConfig): any {
  return { pin: item["pin"], additional_search_text: item["additional_search_text"] };
}

export function toolConfigDeserializer(item: any): ToolConfig {
  return {
    pin: item["pin"],
    additional_search_text: item["additional_search_text"],
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
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  name?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  description?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  tool_configs?: Record<string, ToolConfig>;
  /** The azure ai search index resource. */
  azure_ai_search: AzureAISearchToolResource;
}

export function azureAISearchToolSerializer(item: AzureAISearchTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    azure_ai_search: azureAISearchToolResourceSerializer(item["azure_ai_search"]),
  };
}

export function azureAISearchToolDeserializer(item: any): AzureAISearchTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
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
  "simple" | "semantic" | "vector" | "vector_simple_hybrid" | "vector_semantic_hybrid";

/** The input definition information for an OpenAPI tool as used to configure an agent. */
export interface OpenApiTool extends Tool {
  /** The object type, which is always 'openapi'. */
  type: "openapi";
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  tool_configs?: Record<string, ToolConfig>;
  /** The openapi function definition. */
  openapi: OpenApiFunctionDefinition;
}

export function openApiToolSerializer(item: OpenApiTool): any {
  return {
    type: item["type"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    openapi: openApiFunctionDefinitionSerializer(item["openapi"]),
  };
}

export function openApiToolDeserializer(item: any): OpenApiTool {
  return {
    type: item["type"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
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
    default_params: item["default_params"],
  };
}

export function openApiFunctionDefinitionDeserializer(item: any): OpenApiFunctionDefinition {
  return {
    name: item["name"],
    description: item["description"],
    spec: item["spec"],
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
  switch (item["type"]) {
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
    parameters: item["parameters"],
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
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  tool_configs?: Record<string, ToolConfig>;
  /** The Azure Function Tool definition. */
  azure_function: AzureFunctionDefinition;
}

export function azureFunctionToolSerializer(item: AzureFunctionTool): any {
  return {
    type: item["type"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    azure_function: azureFunctionDefinitionSerializer(item["azure_function"]),
  };
}

export function azureFunctionToolDeserializer(item: any): AzureFunctionTool {
  return {
    type: item["type"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
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
    parameters: item["parameters"],
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
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  name?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  description?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  tool_configs?: Record<string, ToolConfig>;
  /** The structured outputs to capture from the model. */
  outputs: StructuredOutputDefinition;
}

export function captureStructuredOutputsToolSerializer(item: CaptureStructuredOutputsTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    outputs: structuredOutputDefinitionSerializer(item["outputs"]),
  };
}

export function captureStructuredOutputsToolDeserializer(item: any): CaptureStructuredOutputsTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
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
  strict?: boolean;
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
    schema: item["schema"],
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
  /**
   * When `true`, Foundry sends its credentials when fetching the remote
   * agent's Agent Card. The service defaults to `false` if a value is not
   * specified by the caller (anonymous fetch).
   */
  send_credentials_for_agent_card?: boolean;
}

export function a2APreviewToolSerializer(item: A2APreviewTool): any {
  return {
    type: item["type"],
    base_url: item["base_url"],
    agent_card_path: item["agent_card_path"],
    project_connection_id: item["project_connection_id"],
    send_credentials_for_agent_card: item["send_credentials_for_agent_card"],
  };
}

export function a2APreviewToolDeserializer(item: any): A2APreviewTool {
  return {
    type: item["type"],
    base_url: item["base_url"],
    agent_card_path: item["agent_card_path"],
    project_connection_id: item["project_connection_id"],
    send_credentials_for_agent_card: item["send_credentials_for_agent_card"],
  };
}

/** A WorkIQ server-side tool. */
export interface WorkIQPreviewTool extends Tool {
  /** The object type, which is always 'work_iq_preview'. */
  type: "work_iq_preview";
  /** The ID of the WorkIQ project connection. */
  project_connection_id: string;
}

export function workIQPreviewToolSerializer(item: WorkIQPreviewTool): any {
  return {
    type: item["type"],
    project_connection_id: item["project_connection_id"],
  };
}

export function workIQPreviewToolDeserializer(item: any): WorkIQPreviewTool {
  return {
    type: item["type"],
    project_connection_id: item["project_connection_id"],
  };
}

/** A FabricIQ server-side tool. */
export interface FabricIQPreviewTool extends Tool {
  /** The object type, which is always 'fabric_iq_preview'. */
  type: "fabric_iq_preview";
  /** The ID of the FabricIQ project connection. */
  project_connection_id: string;
  /** (Optional) The label of the FabricIQ MCP server to connect to. */
  server_label?: string;
  /** (Optional) The URL of the FabricIQ MCP server. If not provided, the URL from the project connection will be used. */
  server_url?: string;
  /** (Optional) Whether the agent requires approval before executing actions. Default is always. */
  require_approval?: MCPToolRequireApproval | string;
}

export function fabricIQPreviewToolSerializer(item: FabricIQPreviewTool): any {
  return {
    type: item["type"],
    project_connection_id: item["project_connection_id"],
    server_label: item["server_label"],
    server_url: item["server_url"],
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _fabricIQPreviewToolRequireApprovalSerializer(item["require_approval"]),
  };
}

export function fabricIQPreviewToolDeserializer(item: any): FabricIQPreviewTool {
  return {
    type: item["type"],
    project_connection_id: item["project_connection_id"],
    server_label: item["server_label"],
    server_url: item["server_url"],
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _fabricIQPreviewToolRequireApprovalDeserializer(item["require_approval"]),
  };
}

/** Alias for _FabricIQPreviewToolRequireApproval */
export type _FabricIQPreviewToolRequireApproval = MCPToolRequireApproval | string;

export function _fabricIQPreviewToolRequireApprovalSerializer(
  item: _FabricIQPreviewToolRequireApproval,
): any {
  return item;
}

export function _fabricIQPreviewToolRequireApprovalDeserializer(
  item: any,
): _FabricIQPreviewToolRequireApproval {
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
  allowed_callers?: CallableToolAllowedCaller[];
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  name?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  description?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  tool_configs?: Record<string, ToolConfig>;
  /**
   * The code interpreter container. Can be a container ID or an object that
   * specifies uploaded file IDs to make available to your code, along with an
   * optional `memory_limit` setting.
   * If not provided, the service assumes auto.
   */
  container?: string | AutoCodeInterpreterToolParam;
}

export function codeInterpreterToolSerializer(item: CodeInterpreterTool): any {
  return {
    type: item["type"],
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p: any) => {
          return p;
        }),
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    container: !item["container"]
      ? item["container"]
      : _codeInterpreterToolContainerSerializer(item["container"]),
  };
}

export function codeInterpreterToolDeserializer(item: any): CodeInterpreterTool {
  return {
    type: item["type"],
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p1: any) => {
          return p1;
        }),
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
    container: !item["container"]
      ? item["container"]
      : _codeInterpreterToolContainerDeserializer(item["container"]),
  };
}

/** Alias for _CodeInterpreterToolContainer */
export type _CodeInterpreterToolContainer = string | AutoCodeInterpreterToolParam;

export function _codeInterpreterToolContainerSerializer(item: _CodeInterpreterToolContainer): any {
  return item;
}

export function _codeInterpreterToolContainerDeserializer(
  item: any,
): _CodeInterpreterToolContainer {
  return item;
}

/** Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on. */
export interface AutoCodeInterpreterToolParam {
  /** Always `auto`. */
  type: "auto";
  /** An optional list of uploaded files to make available to your code. */
  file_ids?: string[];
  /** The memory limit for the code interpreter container, in bytes. */
  memory_limit?: ContainerMemoryLimit;
  /** The network access policy for the code interpreter container. */
  network_policy?: ContainerNetworkPolicyParamUnion;
}

export function autoCodeInterpreterToolParamSerializer(item: AutoCodeInterpreterToolParam): any {
  return {
    type: item["type"],
    file_ids: !item["file_ids"]
      ? item["file_ids"]
      : item["file_ids"].map((p: any) => {
          return p;
        }),
    memory_limit: item["memory_limit"],
    network_policy: !item["network_policy"]
      ? item["network_policy"]
      : containerNetworkPolicyParamUnionSerializer(item["network_policy"]),
  };
}

export function autoCodeInterpreterToolParamDeserializer(item: any): AutoCodeInterpreterToolParam {
  return {
    type: item["type"],
    file_ids: !item["file_ids"]
      ? item["file_ids"]
      : item["file_ids"].map((p: any) => {
          return p;
        }),
    memory_limit: item["memory_limit"],
    network_policy: !item["network_policy"]
      ? item["network_policy"]
      : containerNetworkPolicyParamUnionDeserializer(item["network_policy"]),
  };
}

/** Type of ContainerMemoryLimit */
export type ContainerMemoryLimit = "1g" | "4g" | "16g" | "64g";

/** Network access policy for the container. */
export interface ContainerNetworkPolicyParam {
  /** The network policy type. */
  type: ContainerNetworkPolicyParamType;
}

export function containerNetworkPolicyParamSerializer(item: ContainerNetworkPolicyParam): any {
  return { type: item["type"] };
}

export function containerNetworkPolicyParamDeserializer(item: any): ContainerNetworkPolicyParam {
  return {
    type: item["type"],
  };
}

/** Alias for ContainerNetworkPolicyParamUnion */
export type ContainerNetworkPolicyParamUnion =
  | ContainerNetworkPolicyDisabledParam
  | ContainerNetworkPolicyAllowlistParam
  | ContainerNetworkPolicyParam;

export function containerNetworkPolicyParamUnionSerializer(
  item: ContainerNetworkPolicyParamUnion,
): any {
  switch (item.type) {
    case "disabled":
      return containerNetworkPolicyDisabledParamSerializer(
        item as ContainerNetworkPolicyDisabledParam,
      );

    case "allowlist":
      return containerNetworkPolicyAllowlistParamSerializer(
        item as ContainerNetworkPolicyAllowlistParam,
      );

    default:
      return containerNetworkPolicyParamSerializer(item);
  }
}

export function containerNetworkPolicyParamUnionDeserializer(
  item: any,
): ContainerNetworkPolicyParamUnion {
  switch (item["type"]) {
    case "disabled":
      return containerNetworkPolicyDisabledParamDeserializer(
        item as ContainerNetworkPolicyDisabledParam,
      );

    case "allowlist":
      return containerNetworkPolicyAllowlistParamDeserializer(
        item as ContainerNetworkPolicyAllowlistParam,
      );

    default:
      return containerNetworkPolicyParamDeserializer(item);
  }
}

/** Type of ContainerNetworkPolicyParamType */
export type ContainerNetworkPolicyParamType = "disabled" | "allowlist";

/** model interface ContainerNetworkPolicyDisabledParam */
export interface ContainerNetworkPolicyDisabledParam extends ContainerNetworkPolicyParam {
  /** Disable outbound network access. Always `disabled`. */
  type: "disabled";
}

export function containerNetworkPolicyDisabledParamSerializer(
  item: ContainerNetworkPolicyDisabledParam,
): any {
  return { type: item["type"] };
}

export function containerNetworkPolicyDisabledParamDeserializer(
  item: any,
): ContainerNetworkPolicyDisabledParam {
  return {
    type: item["type"],
  };
}

/** model interface ContainerNetworkPolicyAllowlistParam */
export interface ContainerNetworkPolicyAllowlistParam extends ContainerNetworkPolicyParam {
  /** Allow outbound network access only to specified domains. Always `allowlist`. */
  type: "allowlist";
  /** A list of allowed domains when type is `allowlist`. */
  allowed_domains: string[];
  /** Optional domain-scoped secrets for allowlisted domains. */
  domain_secrets?: ContainerNetworkPolicyDomainSecretParam[];
}

export function containerNetworkPolicyAllowlistParamSerializer(
  item: ContainerNetworkPolicyAllowlistParam,
): any {
  return {
    type: item["type"],
    allowed_domains: item["allowed_domains"],
    domain_secrets: !item["domain_secrets"]
      ? item["domain_secrets"]
      : containerNetworkPolicyDomainSecretParamArraySerializer(item["domain_secrets"]),
  };
}

export function containerNetworkPolicyAllowlistParamDeserializer(
  item: any,
): ContainerNetworkPolicyAllowlistParam {
  return {
    type: item["type"],
    allowed_domains: item["allowed_domains"],
    domain_secrets: !item["domain_secrets"]
      ? item["domain_secrets"]
      : containerNetworkPolicyDomainSecretParamArrayDeserializer(item["domain_secrets"]),
  };
}

export function containerNetworkPolicyDomainSecretParamArraySerializer(
  result: Array<ContainerNetworkPolicyDomainSecretParam>,
): any[] {
  return result.map((item) => {
    return containerNetworkPolicyDomainSecretParamSerializer(item);
  });
}

export function containerNetworkPolicyDomainSecretParamArrayDeserializer(
  result: Array<ContainerNetworkPolicyDomainSecretParam>,
): any[] {
  return result.map((item) => {
    return containerNetworkPolicyDomainSecretParamDeserializer(item);
  });
}

/** model interface ContainerNetworkPolicyDomainSecretParam */
export interface ContainerNetworkPolicyDomainSecretParam {
  /** The domain associated with the secret. */
  domain: string;
  /** The name of the secret to inject for the domain. */
  name: string;
  /** The secret value to inject for the domain. */
  value: string;
}

export function containerNetworkPolicyDomainSecretParamSerializer(
  item: ContainerNetworkPolicyDomainSecretParam,
): any {
  return { domain: item["domain"], name: item["name"], value: item["value"] };
}

export function containerNetworkPolicyDomainSecretParamDeserializer(
  item: any,
): ContainerNetworkPolicyDomainSecretParam {
  return {
    domain: item["domain"],
    name: item["name"],
    value: item["value"],
  };
}

/** Defines a function in your own code the model can choose to call. Learn more about [function calling](https://platform.openai.com/docs/guides/function-calling). */
export interface FunctionTool extends Tool {
  /** The type of the function tool. Always `function`. */
  type: "function";
  /** The name of the function to call. */
  name: string;
  /** A description of the function tool. */
  description?: string;
  /** The parameters schema for the function. */
  parameters?: Record<string, unknown>;
  /** The schema for the function output. */
  output_schema?: Record<string, unknown>;
  /** Whether the function arguments must strictly match the parameters schema. */
  strict?: boolean;
  /** Whether this function is deferred and loaded via tool search. */
  defer_loading?: boolean;
  /** The callers that may invoke this tool. */
  allowed_callers?: CallableToolAllowedCaller[];
}

export function functionToolSerializer(item: FunctionTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    parameters: item["parameters"],
    output_schema: item["output_schema"],
    strict: item["strict"],
    defer_loading: item["defer_loading"],
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p: any) => {
          return p;
        }),
  };
}

export function functionToolDeserializer(item: any): FunctionTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    parameters: item["parameters"],
    output_schema: !item["output_schema"]
      ? item["output_schema"]
      : Object.fromEntries(
          Object.entries(item["output_schema"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
    strict: item["strict"],
    defer_loading: item["defer_loading"],
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p1: any) => {
          return p1;
        }),
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
  /** Filters to apply to the file search. */
  filters?: Filters;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  name?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  description?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  tool_configs?: Record<string, ToolConfig>;
}

export function fileSearchToolSerializer(item: FileSearchTool): any {
  return {
    type: item["type"],
    vector_store_ids: item["vector_store_ids"],
    max_num_results: item["max_num_results"],
    ranking_options: !item["ranking_options"]
      ? item["ranking_options"]
      : rankingOptionsSerializer(item["ranking_options"]),
    filters: !item["filters"] ? item["filters"] : filtersSerializer(item["filters"]),
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
  };
}

export function fileSearchToolDeserializer(item: any): FileSearchTool {
  return {
    type: item["type"],
    vector_store_ids: item["vector_store_ids"],
    max_num_results: item["max_num_results"],
    ranking_options: !item["ranking_options"]
      ? item["ranking_options"]
      : rankingOptionsDeserializer(item["ranking_options"]),
    filters: !item["filters"] ? item["filters"] : filtersDeserializer(item["filters"]),
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
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
  type: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "in" | "nin";
  /** The key to compare against the value. */
  key: string;
  /** The value to compare against the attribute key; supports string, number, or boolean types. */
  value: string | number | boolean | _FileSearchToolFiltersValue[];
}

export function comparisonFilterSerializer(item: ComparisonFilter): any {
  return {
    type: item["type"],
    key: item["key"],
    value: _fileSearchToolFiltersValueSerializer(item["value"]),
  };
}

export function comparisonFilterDeserializer(item: any): ComparisonFilter {
  return {
    type: item["type"],
    key: item["key"],
    value: _fileSearchToolFiltersValueDeserializer(item["value"]),
  };
}

/** Alias for FileSearchToolFiltersValue */
export type FileSearchToolFiltersValue = string | number | boolean | _FileSearchToolFiltersValue[];

export function _fileSearchToolFiltersValueSerializer(item: FileSearchToolFiltersValue): any {
  return item;
}

export function _fileSearchToolFiltersValueDeserializer(item: any): FileSearchToolFiltersValue {
  return item;
}

export function _fileSearchToolFiltersValue1ArraySerializer(
  result: Array<_FileSearchToolFiltersValue>,
): any[] {
  return result.map((item) => {
    return _fileSearchToolFiltersValue1Serializer(item);
  });
}

export function _fileSearchToolFiltersValue1ArrayDeserializer(
  result: Array<_FileSearchToolFiltersValue>,
): any[] {
  return result.map((item) => {
    return _fileSearchToolFiltersValue1Deserializer(item);
  });
}

/** Alias for _FileSearchToolFiltersValue */
export type _FileSearchToolFiltersValue = string | number;
/** Alias for ComparisonFilterValueItems */
export type ComparisonFilterValueItems = _FileSearchToolFiltersValue;

export function _fileSearchToolFiltersValue1Serializer(item: _FileSearchToolFiltersValue): any {
  return item;
}

export function _fileSearchToolFiltersValue1Deserializer(item: any): _FileSearchToolFiltersValue {
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
    filters: _fileSearchToolFiltersFilterArraySerializer(item["filters"]),
  };
}

export function compoundFilterDeserializer(item: any): CompoundFilter {
  return {
    type: item["type"],
    filters: _fileSearchToolFiltersFilterArrayDeserializer(item["filters"]),
  };
}

export function _fileSearchToolFiltersFilterArraySerializer(
  result: Array<_FileSearchToolFiltersFilter>,
): any[] {
  return result.map((item) => {
    return _fileSearchToolFiltersFilterSerializer(item);
  });
}

export function _fileSearchToolFiltersFilterArrayDeserializer(
  result: Array<_FileSearchToolFiltersFilter>,
): any[] {
  return result.map((item) => {
    return _fileSearchToolFiltersFilterDeserializer(item);
  });
}

/** Alias for _FileSearchToolFiltersFilter */
export type _FileSearchToolFiltersFilter = ComparisonFilter | CompoundFilter;

export function _fileSearchToolFiltersFilterSerializer(item: _FileSearchToolFiltersFilter): any {
  return item;
}

export function _fileSearchToolFiltersFilterDeserializer(item: any): _FileSearchToolFiltersFilter {
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
  /** Filters to apply to web search results. */
  filters?: WebSearchToolFilters;
  /** The approximate location of the user for search relevance. */
  user_location?: WebSearchApproximateLocation;
  /** High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default. */
  search_context_size?: "low" | "medium" | "high";
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  name?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  description?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  tool_configs?: Record<string, ToolConfig>;
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
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
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
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
    custom_search_configuration: !item["custom_search_configuration"]
      ? item["custom_search_configuration"]
      : webSearchConfigurationDeserializer(item["custom_search_configuration"]),
  };
}

/** model interface WebSearchToolFilters */
export interface WebSearchToolFilters {
  /** The list of allowed domains for web search results. */
  allowed_domains?: string[];
}

export function webSearchToolFiltersSerializer(item: WebSearchToolFilters): any {
  return {
    allowed_domains: item["allowed_domains"],
  };
}

export function webSearchToolFiltersDeserializer(item: any): WebSearchToolFilters {
  return {
    allowed_domains: item["allowed_domains"],
  };
}

/** The approximate location of the user. */
export interface WebSearchApproximateLocation {
  /** The type of location approximation. Always `approximate`. */
  type?: "approximate";
  /** The two-letter ISO country code. */
  country?: string;
  /** The region or state for the approximate location. */
  region?: string;
  /** The city for the approximate location. */
  city?: string;
  /** The IANA timezone identifier (e.g. 'America/New_York'). */
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
   * The URL for the MCP server. One of `server_url`, `connector_id`, or
   *   `tunnel_id` must be provided.
   */
  server_url?: string;
  /**
   * Identifier for service connectors, like those available in ChatGPT. One of
   *   `server_url`, `connector_id`, or `tunnel_id` must be provided. Learn more
   *   about service connectors [here](https://platform.openai.com/docs/guides/tools-remote-mcp#connectors).
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
   * The Secure MCP Tunnel ID to use instead of a direct server URL. One of
   *   `server_url`, `connector_id`, or `tunnel_id` must be provided.
   */
  tunnel_id?: string;
  /**
   * An OAuth access token that can be used with a remote MCP server, either
   *   with a custom MCP server URL or a service connector. Your application
   *   must handle the OAuth authorization flow and provide the token here.
   */
  authorization?: string;
  /** Optional description of the MCP server, used to provide more context. */
  server_description?: string;
  /** Custom headers to include in requests to the MCP server. */
  headers?: Record<string, string>;
  /** The list of allowed tool names for the MCP server. */
  allowed_tools?: string[] | MCPToolFilter;
  /** The callers that may invoke this tool. */
  allowed_callers?: CallableToolAllowedCaller[];
  /** The approval requirements for the MCP tool. */
  require_approval?: MCPToolRequireApproval | "always" | "never";
  /** Whether this MCP tool is deferred and discovered via tool search. */
  defer_loading?: boolean;
  /** The connection ID in the project for the MCP server. The connection stores authentication and other connection details needed to connect to the MCP server. */
  project_connection_id?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  tool_configs?: Record<string, ToolConfig>;
}

export function mcpToolSerializer(item: MCPTool): any {
  return {
    type: item["type"],
    server_label: item["server_label"],
    server_url: item["server_url"],
    connector_id: item["connector_id"],
    tunnel_id: item["tunnel_id"],
    authorization: item["authorization"],
    server_description: item["server_description"],
    headers: item["headers"],
    allowed_tools: !item["allowed_tools"]
      ? item["allowed_tools"]
      : _mcpToolAllowedToolsSerializer(item["allowed_tools"]),
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p: any) => {
          return p;
        }),
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _mcpToolRequireApprovalSerializer(item["require_approval"]),
    defer_loading: item["defer_loading"],
    project_connection_id: item["project_connection_id"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
  };
}

export function mcpToolDeserializer(item: any): MCPTool {
  return {
    type: item["type"],
    server_label: item["server_label"],
    server_url: item["server_url"],
    connector_id: item["connector_id"],
    tunnel_id: item["tunnel_id"],
    authorization: item["authorization"],
    server_description: item["server_description"],
    headers: item["headers"],
    allowed_tools: !item["allowed_tools"]
      ? item["allowed_tools"]
      : _mcpToolAllowedToolsDeserializer(item["allowed_tools"]),
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p1: any) => {
          return p1;
        }),
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _mcpToolRequireApprovalDeserializer(item["require_approval"]),
    defer_loading: item["defer_loading"],
    project_connection_id: item["project_connection_id"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
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

/** Alias for _MCPToolRequireApproval */
export type _MCPToolRequireApproval = MCPToolRequireApproval | "always" | "never";

export function _mcpToolRequireApprovalSerializer(item: _MCPToolRequireApproval): any {
  return item;
}

export function _mcpToolRequireApprovalDeserializer(item: any): _MCPToolRequireApproval {
  return item;
}

/** A tool that generates images using the GPT image models. */
export interface ImageGenTool extends Tool {
  /** The type of the image generation tool. Always `image_generation`. */
  type: "image_generation";
  /** The model to use for image generation. */
  model?: "gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5";
  /**
   * The quality of the generated image. One of `low`, `medium`, `high`,
   *   or `auto`. Default: `auto`.
   */
  quality?: "low" | "medium" | "high" | "auto";
  /** The size of the generated images. For `gpt-image-2` and `gpt-image-2-2026-04-21`, arbitrary resolutions are supported as `WIDTHxHEIGHT` strings, for example `1536x864`. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above `2560x1440` are experimental, and the maximum supported resolution is `3840x2160`. The requested size must also satisfy the model's current pixel and edge limits. The standard sizes `1024x1024`, `1536x1024`, and `1024x1536` are supported by the GPT image models; `auto` is supported for models that allow automatic sizing. For `dall-e-2`, use one of `256x256`, `512x512`, or `1024x1024`. For `dall-e-3`, use one of `1024x1024`, `1792x1024`, or `1024x1792`. */
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
  /** The fidelity level for input image processing. */
  input_fidelity?: InputFidelity;
  /**
   * Optional mask for inpainting. Contains `image_url`
   *   (string, optional) and `file_id` (string, optional).
   */
  input_image_mask?: ImageGenToolInputImageMask;
  /** Number of partial images to generate in streaming mode, from 0 (default value) to 3. */
  partial_images?: number;
  /** Whether to generate a new image or edit an existing image. Default: `auto`. */
  action?: ImageGenAction;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  name?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  description?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  tool_configs?: Record<string, ToolConfig>;
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
    action: item["action"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
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
    action: item["action"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
  };
}

/** Control how much effort the model will exert to match the style and features, especially facial features, of input images. This parameter is only supported for `gpt-image-1` and `gpt-image-1.5` and later models, unsupported for `gpt-image-1-mini`. Supports `high` and `low`. Defaults to `low`. */
export type InputFidelity = "high" | "low";

/** model interface ImageGenToolInputImageMask */
export interface ImageGenToolInputImageMask {
  /** The URL of the mask image. */
  image_url?: string;
  /** The file identifier for the mask image. */
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

/** Type of ImageGenAction */
export type ImageGenAction = "generate" | "edit" | "auto";

/** A tool that allows the model to execute shell commands in a local environment. */
export interface LocalShellToolParam extends Tool {
  /** The type of the local shell tool. Always `local_shell`. */
  type: "local_shell";
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  name?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  description?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  tool_configs?: Record<string, ToolConfig>;
}

export function localShellToolParamSerializer(item: LocalShellToolParam): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
  };
}

export function localShellToolParamDeserializer(item: any): LocalShellToolParam {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
  };
}

/** A tool that allows the model to execute shell commands. */
export interface FunctionShellToolParam extends Tool {
  /** The type of the shell tool. Always `shell`. */
  type: "shell";
  /** The environment configuration for the function shell tool. */
  environment?: FunctionShellToolParamEnvironmentUnion;
  /** The callers that may invoke this tool. */
  allowed_callers?: CallableToolAllowedCaller[];
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  name?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  description?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  tool_configs?: Record<string, ToolConfig>;
}

export function functionShellToolParamSerializer(item: FunctionShellToolParam): any {
  return {
    type: item["type"],
    environment: !item["environment"]
      ? item["environment"]
      : functionShellToolParamEnvironmentUnionSerializer(item["environment"]),
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p: any) => {
          return p;
        }),
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
  };
}

export function functionShellToolParamDeserializer(item: any): FunctionShellToolParam {
  return {
    type: item["type"],
    environment: !item["environment"]
      ? item["environment"]
      : functionShellToolParamEnvironmentUnionDeserializer(item["environment"]),
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p1: any) => {
          return p1;
        }),
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
  };
}

/** model interface FunctionShellToolParamEnvironment */
export interface FunctionShellToolParamEnvironment {
  /** The environment type. */
  type: FunctionShellToolParamEnvironmentType;
}

export function functionShellToolParamEnvironmentSerializer(
  item: FunctionShellToolParamEnvironment,
): any {
  return { type: item["type"] };
}

export function functionShellToolParamEnvironmentDeserializer(
  item: any,
): FunctionShellToolParamEnvironment {
  return {
    type: item["type"],
  };
}

/** Alias for FunctionShellToolParamEnvironmentUnion */
export type FunctionShellToolParamEnvironmentUnion =
  | FunctionShellToolParamEnvironmentLocalEnvironmentParam
  | FunctionShellToolParamEnvironmentContainerReferenceParam
  | ContainerAutoParam
  | FunctionShellToolParamEnvironment;

export function functionShellToolParamEnvironmentUnionSerializer(
  item: FunctionShellToolParamEnvironmentUnion,
): any {
  switch (item.type) {
    case "local":
      return functionShellToolParamEnvironmentLocalEnvironmentParamSerializer(
        item as FunctionShellToolParamEnvironmentLocalEnvironmentParam,
      );

    case "container_reference":
      return functionShellToolParamEnvironmentContainerReferenceParamSerializer(
        item as FunctionShellToolParamEnvironmentContainerReferenceParam,
      );

    case "container_auto":
      return containerAutoParamSerializer(item as ContainerAutoParam);

    default:
      return functionShellToolParamEnvironmentSerializer(item);
  }
}

export function functionShellToolParamEnvironmentUnionDeserializer(
  item: any,
): FunctionShellToolParamEnvironmentUnion {
  switch (item["type"]) {
    case "local":
      return functionShellToolParamEnvironmentLocalEnvironmentParamDeserializer(
        item as FunctionShellToolParamEnvironmentLocalEnvironmentParam,
      );

    case "container_reference":
      return functionShellToolParamEnvironmentContainerReferenceParamDeserializer(
        item as FunctionShellToolParamEnvironmentContainerReferenceParam,
      );

    case "container_auto":
      return containerAutoParamDeserializer(item as ContainerAutoParam);

    default:
      return functionShellToolParamEnvironmentDeserializer(item);
  }
}

/** Type of FunctionShellToolParamEnvironmentType */
export type FunctionShellToolParamEnvironmentType =
  "container_auto" | "local" | "container_reference";

/** model interface FunctionShellToolParamEnvironmentLocalEnvironmentParam */
export interface FunctionShellToolParamEnvironmentLocalEnvironmentParam extends FunctionShellToolParamEnvironment {
  /** Use a local computer environment. */
  type: "local";
  /** An optional list of skills. */
  skills?: LocalSkillParam[];
}

export function functionShellToolParamEnvironmentLocalEnvironmentParamSerializer(
  item: FunctionShellToolParamEnvironmentLocalEnvironmentParam,
): any {
  return {
    type: item["type"],
    skills: !item["skills"] ? item["skills"] : localSkillParamArraySerializer(item["skills"]),
  };
}

export function functionShellToolParamEnvironmentLocalEnvironmentParamDeserializer(
  item: any,
): FunctionShellToolParamEnvironmentLocalEnvironmentParam {
  return {
    type: item["type"],
    skills: !item["skills"] ? item["skills"] : localSkillParamArrayDeserializer(item["skills"]),
  };
}

export function localSkillParamArraySerializer(result: Array<LocalSkillParam>): any[] {
  return result.map((item) => {
    return localSkillParamSerializer(item);
  });
}

export function localSkillParamArrayDeserializer(result: Array<LocalSkillParam>): any[] {
  return result.map((item) => {
    return localSkillParamDeserializer(item);
  });
}

/** model interface LocalSkillParam */
export interface LocalSkillParam {
  /** The name of the skill. */
  name: string;
  /** The description of the skill. */
  description: string;
  /** The path to the directory containing the skill. */
  path: string;
}

export function localSkillParamSerializer(item: LocalSkillParam): any {
  return { name: item["name"], description: item["description"], path: item["path"] };
}

export function localSkillParamDeserializer(item: any): LocalSkillParam {
  return {
    name: item["name"],
    description: item["description"],
    path: item["path"],
  };
}

/** model interface FunctionShellToolParamEnvironmentContainerReferenceParam */
export interface FunctionShellToolParamEnvironmentContainerReferenceParam extends FunctionShellToolParamEnvironment {
  /** References a container created with the /v1/containers endpoint */
  type: "container_reference";
  /** The ID of the referenced container. */
  container_id: string;
}

export function functionShellToolParamEnvironmentContainerReferenceParamSerializer(
  item: FunctionShellToolParamEnvironmentContainerReferenceParam,
): any {
  return { type: item["type"], container_id: item["container_id"] };
}

export function functionShellToolParamEnvironmentContainerReferenceParamDeserializer(
  item: any,
): FunctionShellToolParamEnvironmentContainerReferenceParam {
  return {
    type: item["type"],
    container_id: item["container_id"],
  };
}

/** model interface ContainerAutoParam */
export interface ContainerAutoParam extends FunctionShellToolParamEnvironment {
  /** Automatically creates a container for this request */
  type: "container_auto";
  /** An optional list of uploaded files to make available to your code. */
  file_ids?: string[];
  /** The memory limit for the container, in bytes. */
  memory_limit?: ContainerMemoryLimit;
  /** An optional list of skills referenced by id or inline data. */
  skills?: ContainerSkillUnion[];
  /** The network access policy for the container. */
  network_policy?: ContainerNetworkPolicyParamUnion;
}

export function containerAutoParamSerializer(item: ContainerAutoParam): any {
  return {
    type: item["type"],
    file_ids: item["file_ids"],
    memory_limit: item["memory_limit"],
    skills: !item["skills"] ? item["skills"] : containerSkillUnionArraySerializer(item["skills"]),
    network_policy: !item["network_policy"]
      ? item["network_policy"]
      : containerNetworkPolicyParamUnionSerializer(item["network_policy"]),
  };
}

export function containerAutoParamDeserializer(item: any): ContainerAutoParam {
  return {
    type: item["type"],
    file_ids: item["file_ids"],
    memory_limit: item["memory_limit"],
    skills: !item["skills"] ? item["skills"] : containerSkillUnionArrayDeserializer(item["skills"]),
    network_policy: !item["network_policy"]
      ? item["network_policy"]
      : containerNetworkPolicyParamUnionDeserializer(item["network_policy"]),
  };
}

export function containerSkillUnionArraySerializer(result: Array<ContainerSkillUnion>): any[] {
  return result.map((item) => {
    return containerSkillUnionSerializer(item);
  });
}

export function containerSkillUnionArrayDeserializer(result: Array<ContainerSkillUnion>): any[] {
  return result.map((item) => {
    return containerSkillUnionDeserializer(item);
  });
}

/** model interface ContainerSkill */
export interface ContainerSkill {
  /** The type discriminator for the container skill. */
  type: ContainerSkillType;
}

export function containerSkillSerializer(item: ContainerSkill): any {
  return { type: item["type"] };
}

export function containerSkillDeserializer(item: any): ContainerSkill {
  return {
    type: item["type"],
  };
}

/** Alias for ContainerSkillUnion */
export type ContainerSkillUnion = SkillReferenceParam | InlineSkillParam | ContainerSkill;

export function containerSkillUnionSerializer(item: ContainerSkillUnion): any {
  switch (item.type) {
    case "skill_reference":
      return skillReferenceParamSerializer(item as SkillReferenceParam);

    case "inline":
      return inlineSkillParamSerializer(item as InlineSkillParam);

    default:
      return containerSkillSerializer(item);
  }
}

export function containerSkillUnionDeserializer(item: any): ContainerSkillUnion {
  switch (item["type"]) {
    case "skill_reference":
      return skillReferenceParamDeserializer(item as SkillReferenceParam);

    case "inline":
      return inlineSkillParamDeserializer(item as InlineSkillParam);

    default:
      return containerSkillDeserializer(item);
  }
}

/** Type of ContainerSkillType */
export type ContainerSkillType = "skill_reference" | "inline";

/** model interface SkillReferenceParam */
export interface SkillReferenceParam extends ContainerSkill {
  /** References a skill created with the /v1/skills endpoint. */
  type: "skill_reference";
  /** The ID of the referenced skill. */
  skill_id: string;
  /** Optional skill version. Use a positive integer or 'latest'. Omit for default. */
  version?: string;
}

export function skillReferenceParamSerializer(item: SkillReferenceParam): any {
  return { type: item["type"], skill_id: item["skill_id"], version: item["version"] };
}

export function skillReferenceParamDeserializer(item: any): SkillReferenceParam {
  return {
    type: item["type"],
    skill_id: item["skill_id"],
    version: item["version"],
  };
}

/** model interface InlineSkillParam */
export interface InlineSkillParam extends ContainerSkill {
  /** Defines an inline skill for this request. */
  type: "inline";
  /** The name of the skill. */
  name: string;
  /** The description of the skill. */
  description: string;
  /** Inline skill payload */
  source: InlineSkillSourceParam;
}

export function inlineSkillParamSerializer(item: InlineSkillParam): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    source: inlineSkillSourceParamSerializer(item["source"]),
  };
}

export function inlineSkillParamDeserializer(item: any): InlineSkillParam {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    source: inlineSkillSourceParamDeserializer(item["source"]),
  };
}

/** Inline skill payload */
export interface InlineSkillSourceParam {
  /** The type of the inline skill source. Must be `base64`. */
  type: "base64";
  /** The media type of the inline skill payload. Must be `application/zip`. */
  media_type: "application/zip";
  /** Base64-encoded skill zip bundle. */
  data: string;
}

export function inlineSkillSourceParamSerializer(item: InlineSkillSourceParam): any {
  return { type: item["type"], media_type: item["media_type"], data: item["data"] };
}

export function inlineSkillSourceParamDeserializer(item: any): InlineSkillSourceParam {
  return {
    type: item["type"],
    media_type: item["media_type"],
    data: item["data"],
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
  /** Whether this tool should be deferred and discovered via tool search. */
  defer_loading?: boolean;
  allowed_callers?: CallableToolAllowedCaller[];
}

export function customToolParamSerializer(item: CustomToolParam): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    format: !item["format"] ? item["format"] : customToolParamFormatUnionSerializer(item["format"]),
    defer_loading: item["defer_loading"],
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p: any) => {
          return p;
        }),
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
    defer_loading: item["defer_loading"],
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p1: any) => {
          return p1;
        }),
  };
}

/** The input format for the custom tool. Default is unconstrained text. */
export interface CustomToolParamFormat {
  /** The custom tool parameter format type. */
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
  CustomTextFormatParam | CustomGrammarFormatParam | CustomToolParamFormat;

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
  switch (item["type"]) {
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
  syntax: GrammarSyntax;
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

/** Type of GrammarSyntax */
export type GrammarSyntax = "lark" | "regex";

/** This tool searches the web for relevant results to use in a response. Learn more about the [web search tool](https://platform.openai.com/docs/guides/tools-web-search). */
export interface WebSearchPreviewTool extends Tool {
  /** The type of the web search tool. One of `web_search_preview` or `web_search_preview_2025_03_11`. */
  type: "web_search_preview";
  /** The approximate location of the user for search relevance. */
  user_location?: ApproximateLocation;
  /** High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default. */
  search_context_size?: SearchContextSize;
  search_content_types?: SearchContentType[];
}

export function webSearchPreviewToolSerializer(item: WebSearchPreviewTool): any {
  return {
    type: item["type"],
    user_location: !item["user_location"]
      ? item["user_location"]
      : approximateLocationSerializer(item["user_location"]),
    search_context_size: item["search_context_size"],
    search_content_types: !item["search_content_types"]
      ? item["search_content_types"]
      : item["search_content_types"].map((p: any) => {
          return p;
        }),
  };
}

export function webSearchPreviewToolDeserializer(item: any): WebSearchPreviewTool {
  return {
    type: item["type"],
    user_location: !item["user_location"]
      ? item["user_location"]
      : approximateLocationDeserializer(item["user_location"]),
    search_context_size: item["search_context_size"],
    search_content_types: !item["search_content_types"]
      ? item["search_content_types"]
      : item["search_content_types"].map((p: any) => {
          return p;
        }),
  };
}

/** model interface ApproximateLocation */
export interface ApproximateLocation {
  /** The type of location approximation. Always `approximate`. */
  type: "approximate";
  /** The two-letter ISO country code. */
  country?: string;
  /** The region or state for the approximate location. */
  region?: string;
  /** The city for the approximate location. */
  city?: string;
  /** The IANA timezone identifier (e.g. 'America/New_York'). */
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

/** Type of SearchContentType */
export type SearchContentType = "text" | "image";

/** Allows the assistant to create, delete, or update files using unified diffs. */
export interface ApplyPatchToolParam extends Tool {
  /** The type of the tool. Always `apply_patch`. */
  type: "apply_patch";
  allowed_callers?: CallableToolAllowedCaller[];
}

export function applyPatchToolParamSerializer(item: ApplyPatchToolParam): any {
  return {
    type: item["type"],
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p: any) => {
          return p;
        }),
  };
}

export function applyPatchToolParamDeserializer(item: any): ApplyPatchToolParam {
  return {
    type: item["type"],
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p1: any) => {
          return p1;
        }),
  };
}

/** A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use). */
export interface ComputerTool extends Tool {
  /** The type of the computer tool. Always `computer`. */
  type: "computer";
}

export function computerToolSerializer(item: ComputerTool): any {
  return { type: item["type"] };
}

export function computerToolDeserializer(item: any): ComputerTool {
  return {
    type: item["type"],
  };
}

/** Groups function/custom tools under a shared namespace. */
export interface NamespaceToolParam extends Tool {
  /** The type of the tool. Always `namespace`. */
  type: "namespace";
  /** The namespace name used in tool calls (for example, `crm`). */
  name: string;
  /** A description of the namespace shown to the model. */
  description: string;
  /** The function/custom tools available inside this namespace. */
  tools: (FunctionToolParam | CustomToolParam)[];
}

export function namespaceToolParamSerializer(item: NamespaceToolParam): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tools: _namespaceToolParamToolArraySerializer(item["tools"]),
  };
}

export function namespaceToolParamDeserializer(item: any): NamespaceToolParam {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tools: _namespaceToolParamToolArrayDeserializer(item["tools"]),
  };
}

export function _namespaceToolParamToolArraySerializer(
  result: Array<_NamespaceToolParamTool>,
): any[] {
  return result.map((item) => {
    return _namespaceToolParamToolSerializer(item);
  });
}

export function _namespaceToolParamToolArrayDeserializer(
  result: Array<_NamespaceToolParamTool>,
): any[] {
  return result.map((item) => {
    return _namespaceToolParamToolDeserializer(item);
  });
}

/** Alias for _NamespaceToolParamTool */
export type _NamespaceToolParamTool = FunctionToolParam | CustomToolParam;

export function _namespaceToolParamToolSerializer(item: _NamespaceToolParamTool): any {
  return item;
}

export function _namespaceToolParamToolDeserializer(item: any): _NamespaceToolParamTool {
  return item;
}

/** model interface FunctionToolParam */
export interface FunctionToolParam {
  name: string;
  description?: string;
  parameters?: EmptyModelParam;
  strict?: boolean;
  type: "function";
  output_schema?: Record<string, any>;
  /** Whether this function should be deferred and discovered via tool search. */
  defer_loading?: boolean;
  allowed_callers?: CallableToolAllowedCaller[];
}

export function functionToolParamSerializer(item: FunctionToolParam): any {
  return {
    name: item["name"],
    description: item["description"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : emptyModelParamSerializer(item["parameters"]),
    strict: item["strict"],
    type: item["type"],
    output_schema: item["output_schema"],
    defer_loading: item["defer_loading"],
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p: any) => {
          return p;
        }),
  };
}

export function functionToolParamDeserializer(item: any): FunctionToolParam {
  return {
    name: item["name"],
    description: item["description"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : emptyModelParamDeserializer(item["parameters"]),
    strict: item["strict"],
    type: item["type"],
    output_schema: !item["output_schema"]
      ? item["output_schema"]
      : Object.fromEntries(
          Object.entries(item["output_schema"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
    defer_loading: item["defer_loading"],
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p1: any) => {
          return p1;
        }),
  };
}

/** model interface EmptyModelParam */
export interface EmptyModelParam {}

export function emptyModelParamSerializer(_item: EmptyModelParam): any {
  return {};
}

export function emptyModelParamDeserializer(item: any): EmptyModelParam {
  return item;
}

/** Hosted or BYOT tool search configuration for deferred tools. */
export interface ToolSearchToolParam extends Tool {
  /** The type of the tool. Always `tool_search`. */
  type: "tool_search";
  /** Whether tool search is executed by the server or by the client. */
  execution?: ToolSearchExecutionType;
  description?: string;
  parameters?: EmptyModelParam;
}

export function toolSearchToolParamSerializer(item: ToolSearchToolParam): any {
  return {
    type: item["type"],
    execution: item["execution"],
    description: item["description"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : emptyModelParamSerializer(item["parameters"]),
  };
}

export function toolSearchToolParamDeserializer(item: any): ToolSearchToolParam {
  return {
    type: item["type"],
    execution: item["execution"],
    description: item["description"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : emptyModelParamDeserializer(item["parameters"]),
  };
}

/** Type of ToolSearchExecutionType */
export type ToolSearchExecutionType = "server" | "client";

/** Container-based deployment configuration for a hosted agent. */
export interface ContainerConfiguration {
  /** The container image for the hosted agent. */
  image: string;
  /**
   * The id (or name) of the Foundry project connection that provides the credentials used to
   * authenticate to the private container registry hosting `image`. The connection abstracts the
   * auth mechanism — for example a managed-identity-federated token exchange, or a username/token
   * secret — so registry credentials are never part of the agent definition. Omit for public images
   * or registries already reachable by the platform's default identity (for example, Azure Container Registry).
   */
  registry_connection_id?: string;
}

export function containerConfigurationSerializer(item: ContainerConfiguration): any {
  return { image: item["image"], registry_connection_id: item["registry_connection_id"] };
}

export function containerConfigurationDeserializer(item: any): ContainerConfiguration {
  return {
    image: item["image"],
    registry_connection_id: item["registry_connection_id"],
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
  /** The version string for the protocol, e.g. '1.0.0'. */
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
export type AgentProtocol =
  "activity" | "responses" | "a2a" | "mcp" | "invocations" | "voice" | "invocations_ws";

/** Code-based deployment configuration for a hosted agent. */
export interface CodeConfiguration {
  /** The runtime identifier for code execution ('python_3_14'). */
  runtime: string;
  /** The entry point command and arguments for the code execution. */
  entry_point: string[];
  /**
   * How package dependencies are resolved at deployment time. Defaults to `bundled`,
   * where the caller bundles all dependencies into the uploaded zip and the service
   * performs no remote build. `remote_build` instructs the service to build
   * dependencies remotely from the manifest included in the uploaded zip.
   */
  dependency_resolution: CodeDependencyResolution;
  /** The SHA-256 hex digest of the uploaded code zip. Set by the service from the `x-ms-code-zip-sha256` request header; read-only in responses and never accepted in request payloads. */
  readonly content_hash?: string;
}

export function codeConfigurationSerializer(item: CodeConfiguration): any {
  return {
    runtime: item["runtime"],
    entry_point: item["entry_point"].map((p: any) => {
      return p;
    }),
    dependency_resolution: item["dependency_resolution"],
  };
}

export function codeConfigurationDeserializer(item: any): CodeConfiguration {
  return {
    runtime: item["runtime"],
    entry_point: item["entry_point"].map((p: any) => {
      return p;
    }),
    dependency_resolution: item["dependency_resolution"],
    content_hash: item["content_hash"],
  };
}

/** How package dependencies are resolved at deployment time for a code-based hosted agent. */
export type CodeDependencyResolution = "bundled" | "remote_build";

/** Customer-supplied telemetry configuration for exporting container logs, traces, and metrics. */
export interface TelemetryConfig {
  /** Customer-supplied telemetry export endpoint configurations. */
  endpoints: TelemetryEndpointUnion[];
}

export function telemetryConfigSerializer(item: TelemetryConfig): any {
  return { endpoints: telemetryEndpointUnionArraySerializer(item["endpoints"]) };
}

export function telemetryConfigDeserializer(item: any): TelemetryConfig {
  return {
    endpoints: telemetryEndpointUnionArrayDeserializer(item["endpoints"]),
  };
}

export function telemetryEndpointUnionArraySerializer(
  result: Array<TelemetryEndpointUnion>,
): any[] {
  return result.map((item) => {
    return telemetryEndpointUnionSerializer(item);
  });
}

export function telemetryEndpointUnionArrayDeserializer(
  result: Array<TelemetryEndpointUnion>,
): any[] {
  return result.map((item) => {
    return telemetryEndpointUnionDeserializer(item);
  });
}

/** A telemetry export endpoint configuration. */
export interface TelemetryEndpoint {
  /** The telemetry export endpoint kind. */
  /** The discriminator possible values: OTLP */
  kind: TelemetryEndpointKind;
  /** Data types to export to this endpoint. Use an empty array to export no data. */
  data: TelemetryDataKind[];
  /** Optional authentication configuration. */
  auth?: TelemetryEndpointAuthUnion;
}

export function telemetryEndpointSerializer(item: TelemetryEndpoint): any {
  return {
    kind: item["kind"],
    data: item["data"].map((p: any) => {
      return p;
    }),
    auth: !item["auth"] ? item["auth"] : telemetryEndpointAuthUnionSerializer(item["auth"]),
  };
}

export function telemetryEndpointDeserializer(item: any): TelemetryEndpoint {
  return {
    kind: item["kind"],
    data: item["data"].map((p: any) => {
      return p;
    }),
    auth: !item["auth"] ? item["auth"] : telemetryEndpointAuthUnionDeserializer(item["auth"]),
  };
}

/** Alias for TelemetryEndpointUnion */
export type TelemetryEndpointUnion = OtlpTelemetryEndpoint | TelemetryEndpoint;

export function telemetryEndpointUnionSerializer(item: TelemetryEndpointUnion): any {
  switch (item.kind) {
    case "OTLP":
      return otlpTelemetryEndpointSerializer(item as OtlpTelemetryEndpoint);

    default:
      return telemetryEndpointSerializer(item);
  }
}

export function telemetryEndpointUnionDeserializer(item: any): TelemetryEndpointUnion {
  switch (item["kind"]) {
    case "OTLP":
      return otlpTelemetryEndpointDeserializer(item as OtlpTelemetryEndpoint);

    default:
      return telemetryEndpointDeserializer(item);
  }
}

/** The kind of telemetry export endpoint. */
export type TelemetryEndpointKind = "OTLP";

/** The type of telemetry data to export. */
export type TelemetryDataKind = "ContainerStdoutStderr" | "ContainerOtel" | "Metrics";

/** Authentication configuration for a telemetry endpoint. */
export interface TelemetryEndpointAuth {
  /** The authentication type. */
  /** The discriminator possible values: header */
  type: TelemetryEndpointAuthType;
}

export function telemetryEndpointAuthSerializer(item: TelemetryEndpointAuth): any {
  return { type: item["type"] };
}

export function telemetryEndpointAuthDeserializer(item: any): TelemetryEndpointAuth {
  return {
    type: item["type"],
  };
}

/** Alias for TelemetryEndpointAuthUnion */
export type TelemetryEndpointAuthUnion = HeaderTelemetryEndpointAuth | TelemetryEndpointAuth;

export function telemetryEndpointAuthUnionSerializer(item: TelemetryEndpointAuthUnion): any {
  switch (item.type) {
    case "header":
      return headerTelemetryEndpointAuthSerializer(item as HeaderTelemetryEndpointAuth);

    default:
      return telemetryEndpointAuthSerializer(item);
  }
}

export function telemetryEndpointAuthUnionDeserializer(item: any): TelemetryEndpointAuthUnion {
  switch (item["type"]) {
    case "header":
      return headerTelemetryEndpointAuthDeserializer(item as HeaderTelemetryEndpointAuth);

    default:
      return telemetryEndpointAuthDeserializer(item);
  }
}

/** The type of authentication for a telemetry endpoint. */
export type TelemetryEndpointAuthType = "header";

/** Header-based secret authentication for a telemetry endpoint. The resolved secret value is injected as an HTTP header. */
export interface HeaderTelemetryEndpointAuth extends TelemetryEndpointAuth {
  /** The authentication type, always 'header' for header-based secret authentication. */
  type: "header";
  /** The name of the HTTP header to inject the secret value into. */
  header_name: string;
  /** The identifier of the secret store or connection. */
  secret_id: string;
  /** The key within the secret to retrieve the authentication value. */
  secret_key: string;
}

export function headerTelemetryEndpointAuthSerializer(item: HeaderTelemetryEndpointAuth): any {
  return {
    type: item["type"],
    header_name: item["header_name"],
    secret_id: item["secret_id"],
    secret_key: item["secret_key"],
  };
}

export function headerTelemetryEndpointAuthDeserializer(item: any): HeaderTelemetryEndpointAuth {
  return {
    type: item["type"],
    header_name: item["header_name"],
    secret_id: item["secret_id"],
    secret_key: item["secret_key"],
  };
}

/** An OTLP (OpenTelemetry Protocol) telemetry export endpoint. */
export interface OtlpTelemetryEndpoint extends TelemetryEndpoint {
  /** The endpoint kind, always 'OTLP' for OpenTelemetry Protocol endpoints. */
  kind: "OTLP";
  /** The OTLP collector endpoint URL. */
  endpoint: string;
  /** The transport protocol for the OTLP endpoint. */
  protocol: TelemetryTransportProtocol;
}

export function otlpTelemetryEndpointSerializer(item: OtlpTelemetryEndpoint): any {
  return {
    kind: item["kind"],
    data: item["data"].map((p: any) => {
      return p;
    }),
    auth: !item["auth"] ? item["auth"] : telemetryEndpointAuthUnionSerializer(item["auth"]),
    endpoint: item["endpoint"],
    protocol: item["protocol"],
  };
}

export function otlpTelemetryEndpointDeserializer(item: any): OtlpTelemetryEndpoint {
  return {
    kind: item["kind"],
    data: item["data"].map((p: any) => {
      return p;
    }),
    auth: !item["auth"] ? item["auth"] : telemetryEndpointAuthUnionDeserializer(item["auth"]),
    endpoint: item["endpoint"],
    protocol: item["protocol"],
  };
}

/** The transport protocol for telemetry export. */
export type TelemetryTransportProtocol = "Http" | "Grpc";

/** The prompt agent definition */
export interface PromptAgentDefinition extends AgentDefinition {
  kind: "prompt";
  /** The model deployment to use for this agent. */
  model: string;
  /** A system (or developer) message inserted into the model's context. */
  instructions?: string;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * We generally recommend altering this or `top_p` but not both. Defaults to `1`.
   */
  temperature?: number;
  /**
   * An alternative to sampling with temperature, called nucleus sampling,
   * where the model considers the results of the tokens with top_p probability
   * mass. So 0.1 means only the tokens comprising the top 10% probability mass
   * are considered. We generally recommend altering this or `temperature` but not both.
   * Defaults to `1`.
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
  /**
   * Controls the reasoning execution mode for the request.
   *   When returned on a response, this is the effective execution mode.
   */
  mode?: ReasoningModeEnum;
  effort?: ReasoningEffort;
  summary?: "auto" | "concise" | "detailed";
  context?: "auto" | "current_turn" | "all_turns";
  generate_summary?: "auto" | "concise" | "detailed";
}

export function reasoningSerializer(item: Reasoning): any {
  return {
    mode: !item["mode"] ? item["mode"] : reasoningModeEnumSerializer(item["mode"]),
    effort: item["effort"],
    summary: item["summary"],
    context: item["context"],
    generate_summary: item["generate_summary"],
  };
}

export function reasoningDeserializer(item: any): Reasoning {
  return {
    mode: !item["mode"] ? item["mode"] : reasoningModeEnumDeserializer(item["mode"]),
    effort: item["effort"],
    summary: item["summary"],
    context: item["context"],
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
export type ReasoningEffort = "none" | "minimal" | "low" | "medium" | "high" | "xhigh" | "max";
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
  | SpecificProgrammaticToolCallingParam
  | SpecificApplyPatchParam
  | SpecificFunctionShellParam
  | ToolChoiceFileSearch
  | ToolChoiceWebSearchPreview
  | ToolChoiceComputerUsePreview
  | ToolChoiceWebSearchPreview20250311
  | ToolChoiceImageGeneration
  | ToolChoiceCodeInterpreter
  | ToolChoiceComputer
  | ToolChoiceComputerUse
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

    case "programmatic_tool_calling":
      return specificProgrammaticToolCallingParamSerializer(
        item as SpecificProgrammaticToolCallingParam,
      );

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

    case "computer":
      return toolChoiceComputerSerializer(item as ToolChoiceComputer);

    case "computer_use":
      return toolChoiceComputerUseSerializer(item as ToolChoiceComputerUse);

    default:
      return toolChoiceParamSerializer(item);
  }
}

export function toolChoiceParamUnionDeserializer(item: any): ToolChoiceParamUnion {
  switch (item["type"]) {
    case "allowed_tools":
      return toolChoiceAllowedDeserializer(item as ToolChoiceAllowed);

    case "function":
      return toolChoiceFunctionDeserializer(item as ToolChoiceFunction);

    case "mcp":
      return toolChoiceMCPDeserializer(item as ToolChoiceMCP);

    case "custom":
      return toolChoiceCustomDeserializer(item as ToolChoiceCustom);

    case "programmatic_tool_calling":
      return specificProgrammaticToolCallingParamDeserializer(
        item as SpecificProgrammaticToolCallingParam,
      );

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

    case "computer":
      return toolChoiceComputerDeserializer(item as ToolChoiceComputer);

    case "computer_use":
      return toolChoiceComputerUseDeserializer(item as ToolChoiceComputerUse);

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
  | "programmatic_tool_calling"
  | "apply_patch"
  | "shell"
  | "file_search"
  | "web_search_preview"
  | "computer_use_preview"
  | "web_search_preview_2025_03_11"
  | "image_generation"
  | "code_interpreter"
  | "computer"
  | "computer_use";

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
    tools: item["tools"],
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

/**
 * Indicates that the model should use a built-in tool to generate a response.
 * [Learn more about built-in tools](https://platform.openai.com/docs/guides/tools).
 */
export interface ToolChoiceComputer extends ToolChoiceParam {
  type: "computer";
}

export function toolChoiceComputerSerializer(item: ToolChoiceComputer): any {
  return { type: item["type"] };
}

export function toolChoiceComputerDeserializer(item: any): ToolChoiceComputer {
  return {
    type: item["type"],
  };
}

/**
 * Indicates that the model should use a built-in tool to generate a response.
 * [Learn more about built-in tools](https://platform.openai.com/docs/guides/tools).
 */
export interface ToolChoiceComputerUse extends ToolChoiceParam {
  type: "computer_use";
}

export function toolChoiceComputerUseSerializer(item: ToolChoiceComputerUse): any {
  return { type: item["type"] };
}

export function toolChoiceComputerUseDeserializer(item: any): ToolChoiceComputerUse {
  return {
    type: item["type"],
  };
}

/** Configuration options for a text response from the model. Can be plain text or structured JSON data. */
export interface PromptAgentDefinitionTextOptions {
  format?: TextResponseFormatUnion;
}

export function promptAgentDefinitionTextOptionsSerializer(
  item: PromptAgentDefinitionTextOptions,
): any {
  return {
    format: !item["format"] ? item["format"] : textResponseFormatUnionSerializer(item["format"]),
  };
}

export function promptAgentDefinitionTextOptionsDeserializer(
  item: any,
): PromptAgentDefinitionTextOptions {
  return {
    format: !item["format"] ? item["format"] : textResponseFormatUnionDeserializer(item["format"]),
  };
}

/**
 * An object specifying the format that the model must output.
 * Configuring `{ "type": "json_schema" }` enables Structured Outputs,
 * which ensures the model will match your supplied JSON schema. Learn more in the
 * [Structured Outputs guide](/docs/guides/structured-outputs).
 * The default format is `{ "type": "text" }` with no additional options.
 * *Not recommended for gpt-4o and newer models:**
 * Setting to `{ "type": "json_object" }` enables the older JSON mode, which
 * ensures the message the model generates is valid JSON. Using `json_schema`
 * is preferred for models that support it.
 */
export interface TextResponseFormat {
  type: TextResponseFormatConfigurationType;
}

export function textResponseFormatSerializer(item: TextResponseFormat): any {
  return { type: item["type"] };
}

export function textResponseFormatDeserializer(item: any): TextResponseFormat {
  return {
    type: item["type"],
  };
}

/** Alias for TextResponseFormatUnion */
export type TextResponseFormatUnion =
  | TextResponseFormatJsonSchema
  | TextResponseFormatText
  | TextResponseFormatJsonObject
  | TextResponseFormat;

export function textResponseFormatUnionSerializer(item: TextResponseFormatUnion): any {
  switch (item.type) {
    case "json_schema":
      return textResponseFormatJsonSchemaSerializer(item as TextResponseFormatJsonSchema);

    case "text":
      return textResponseFormatTextSerializer(item as TextResponseFormatText);

    case "json_object":
      return textResponseFormatJsonObjectSerializer(item as TextResponseFormatJsonObject);

    default:
      return textResponseFormatSerializer(item);
  }
}

export function textResponseFormatUnionDeserializer(item: any): TextResponseFormatUnion {
  switch (item["type"]) {
    case "json_schema":
      return textResponseFormatJsonSchemaDeserializer(item as TextResponseFormatJsonSchema);

    case "text":
      return textResponseFormatTextDeserializer(item as TextResponseFormatText);

    case "json_object":
      return textResponseFormatJsonObjectDeserializer(item as TextResponseFormatJsonObject);

    default:
      return textResponseFormatDeserializer(item);
  }
}

/** Type of TextResponseFormatConfigurationType */
export type TextResponseFormatConfigurationType = "text" | "json_schema" | "json_object";

/**
 * JSON Schema response format. Used to generate structured JSON responses.
 * Learn more about [Structured Outputs](/docs/guides/structured-outputs).
 */
export interface TextResponseFormatJsonSchema extends TextResponseFormat {
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
    schema: item["schema"],
    strict: item["strict"],
  };
}

/** Default response format. Used to generate text responses. */
export interface TextResponseFormatText extends TextResponseFormat {
  /** The type of response format being defined. Always `text`. */
  type: "text";
}

export function textResponseFormatTextSerializer(item: TextResponseFormatText): any {
  return { type: item["type"] };
}

export function textResponseFormatTextDeserializer(item: any): TextResponseFormatText {
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
export interface TextResponseFormatJsonObject extends TextResponseFormat {
  /** The type of response format being defined. Always `json_object`. */
  type: "json_object";
}

export function textResponseFormatJsonObjectSerializer(item: TextResponseFormatJsonObject): any {
  return { type: item["type"] };
}

export function textResponseFormatJsonObjectDeserializer(item: any): TextResponseFormatJsonObject {
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
  default_value?: unknown;
  /** The JSON schema for the structured input (optional). */
  schema?: Record<string, unknown>;
  /** Whether the input property is required when the agent is invoked. Defaults to `false`. */
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
    schema: item["schema"],
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

/**
 * The external agent definition. Represents a third-party agent hosted outside Foundry (for example, on GCP or AWS).
 * Registration is metadata-only: Foundry records the agent definition to light up observability experiences (traces, evaluations)
 * over customer-emitted OpenTelemetry data.
 */
export interface ExternalAgentDefinition extends AgentDefinition {
  kind: "external";
  /**
   * The OpenTelemetry agent identifier used to attribute customer-emitted spans to this Foundry agent.
   * Spans must include the attribute `gen_ai.agent.id = <otel_agent_id>` to appear under this registration.
   * Defaults to the top-level agent name when omitted. Provide an explicit value only for migration scenarios
   * where the running external agent already emits a stable id that differs from the Foundry agent name.
   * The resolved value is always echoed on read.
   */
  otel_agent_id?: string;
}

export function externalAgentDefinitionSerializer(item: ExternalAgentDefinition): any {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"] ? item["rai_config"] : raiConfigSerializer(item["rai_config"]),
    otel_agent_id: item["otel_agent_id"],
  };
}

export function externalAgentDefinitionDeserializer(item: any): ExternalAgentDefinition {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"]
      ? item["rai_config"]
      : raiConfigDeserializer(item["rai_config"]),
    otel_agent_id: item["otel_agent_id"],
  };
}

/** The provisioning status of an agent version. */
export type AgentVersionStatus = "creating" | "active" | "failed" | "deleting" | "deleted";

/** model interface AgentIdentity */
export interface AgentIdentity {
  /** The principal ID of the agent instance */
  principal_id: string;
  /** The client ID of the agent instance. Also referred to as the instance ID */
  client_id: string;
  /** The status of the agent identity. Present for both the agent instance identity and the agent blueprint. */
  status?: AgentIdentityStatus;
}

export function agentIdentityDeserializer(item: any): AgentIdentity {
  return {
    principal_id: item["principal_id"],
    client_id: item["client_id"],
    status: item["status"],
  };
}

/** The status of an agent identity, applicable to both the agent instance identity and the agent blueprint. */
export type AgentIdentityStatus = "active" | "disabled";

/** model interface AgentBlueprintReference */
export interface AgentBlueprintReference {
  type: AgentBlueprintReferenceType;
}

export function agentBlueprintReferenceSerializer(item: AgentBlueprintReference): any {
  return { type: item["type"] };
}

export function agentBlueprintReferenceDeserializer(item: any): AgentBlueprintReference {
  return {
    type: item["type"],
  };
}

/** Alias for AgentBlueprintReferenceUnion */
export type AgentBlueprintReferenceUnion =
  ManagedAgentIdentityBlueprintReference | AgentBlueprintReference;

export function agentBlueprintReferenceUnionSerializer(item: AgentBlueprintReferenceUnion): any {
  switch (item.type) {
    case "ManagedAgentIdentityBlueprint":
      return managedAgentIdentityBlueprintReferenceSerializer(
        item as ManagedAgentIdentityBlueprintReference,
      );

    default:
      return agentBlueprintReferenceSerializer(item);
  }
}

export function agentBlueprintReferenceUnionDeserializer(item: any): AgentBlueprintReferenceUnion {
  switch (item["type"]) {
    case "ManagedAgentIdentityBlueprint":
      return managedAgentIdentityBlueprintReferenceDeserializer(
        item as ManagedAgentIdentityBlueprintReference,
      );

    default:
      return agentBlueprintReferenceDeserializer(item);
  }
}

/** Type of AgentBlueprintReferenceType */
export type AgentBlueprintReferenceType = "ManagedAgentIdentityBlueprint";

/** model interface ManagedAgentIdentityBlueprintReference */
export interface ManagedAgentIdentityBlueprintReference extends AgentBlueprintReference {
  type: "ManagedAgentIdentityBlueprint";
  /** The ID of the managed blueprint */
  blueprint_id: string;
}

export function managedAgentIdentityBlueprintReferenceSerializer(
  item: ManagedAgentIdentityBlueprintReference,
): any {
  return { type: item["type"], blueprint_id: item["blueprint_id"] };
}

export function managedAgentIdentityBlueprintReferenceDeserializer(
  item: any,
): ManagedAgentIdentityBlueprintReference {
  return {
    type: item["type"],
    blueprint_id: item["blueprint_id"],
  };
}

/** model interface AgentEndpointConfig */
export interface AgentEndpointConfig {
  /** The version selector of the agent endpoint determines how traffic is routed to different versions of the agent. */
  version_selector?: VersionSelector;
  /** Per-protocol configuration for the agent endpoint. */
  protocol_configuration?: ProtocolConfiguration;
  /** The authorization schemes supported by the agent endpoint */
  authorization_schemes?: AgentEndpointAuthorizationSchemeUnion[];
  /** The Microsoft Agent Certification review status of the Microsoft 365 store title published for this agent. Server-populated and best-effort: it is absent when the status could not be determined, and an absent value must not be interpreted as the agent not being published. No value is terminal, because publishing a new version of an agent reuses the same store title and sends it back through review. */
  readonly publish_approval_status?: PublishApprovalStatus;
}

export function agentEndpointConfigSerializer(item: AgentEndpointConfig): any {
  return {
    version_selector: !item["version_selector"]
      ? item["version_selector"]
      : versionSelectorSerializer(item["version_selector"]),
    protocol_configuration: !item["protocol_configuration"]
      ? item["protocol_configuration"]
      : protocolConfigurationSerializer(item["protocol_configuration"]),
    authorization_schemes: !item["authorization_schemes"]
      ? item["authorization_schemes"]
      : agentEndpointAuthorizationSchemeUnionArraySerializer(item["authorization_schemes"]),
  };
}

export function agentEndpointConfigDeserializer(item: any): AgentEndpointConfig {
  return {
    version_selector: !item["version_selector"]
      ? item["version_selector"]
      : versionSelectorDeserializer(item["version_selector"]),
    protocol_configuration: !item["protocol_configuration"]
      ? item["protocol_configuration"]
      : protocolConfigurationDeserializer(item["protocol_configuration"]),
    authorization_schemes: !item["authorization_schemes"]
      ? item["authorization_schemes"]
      : agentEndpointAuthorizationSchemeUnionArrayDeserializer(item["authorization_schemes"]),
    publish_approval_status: item["publish_approval_status"],
  };
}

/** @deprecated Use AgentEndpointConfig instead. */
export type AgentEndpoint = AgentEndpointConfig;

/** model interface VersionSelector */
export interface VersionSelector {
  version_selection_rules: VersionSelectionRuleUnion[];
}

export function versionSelectorSerializer(item: VersionSelector): any {
  return {
    version_selection_rules: versionSelectionRuleUnionArraySerializer(
      item["version_selection_rules"],
    ),
  };
}

export function versionSelectorDeserializer(item: any): VersionSelector {
  return {
    version_selection_rules: versionSelectionRuleUnionArrayDeserializer(
      item["version_selection_rules"],
    ),
  };
}

export function versionSelectionRuleUnionArraySerializer(
  result: Array<VersionSelectionRuleUnion>,
): any[] {
  return result.map((item) => {
    return versionSelectionRuleUnionSerializer(item);
  });
}

export function versionSelectionRuleUnionArrayDeserializer(
  result: Array<VersionSelectionRuleUnion>,
): any[] {
  return result.map((item) => {
    return versionSelectionRuleUnionDeserializer(item);
  });
}

/** model interface VersionSelectionRule */
export interface VersionSelectionRule {
  type: VersionSelectionRuleType;
  /** The agent version to route traffic to */
  agent_version: string;
}

export function versionSelectionRuleSerializer(item: VersionSelectionRule): any {
  return { type: item["type"], agent_version: item["agent_version"] };
}

export function versionSelectionRuleDeserializer(item: any): VersionSelectionRule {
  return {
    type: item["type"],
    agent_version: item["agent_version"],
  };
}

/** Alias for VersionSelectionRuleUnion */
export type VersionSelectionRuleUnion = FixedRatioVersionSelectionRule | VersionSelectionRule;

export function versionSelectionRuleUnionSerializer(item: VersionSelectionRuleUnion): any {
  switch (item.type) {
    case "FixedRatio":
      return fixedRatioVersionSelectionRuleSerializer(item as FixedRatioVersionSelectionRule);

    default:
      return versionSelectionRuleSerializer(item);
  }
}

export function versionSelectionRuleUnionDeserializer(item: any): VersionSelectionRuleUnion {
  switch (item["type"]) {
    case "FixedRatio":
      return fixedRatioVersionSelectionRuleDeserializer(item as FixedRatioVersionSelectionRule);

    default:
      return versionSelectionRuleDeserializer(item);
  }
}

/** Type of VersionSelectionRuleType */
export type VersionSelectionRuleType = "FixedRatio";

/** model interface FixedRatioVersionSelectionRule */
export interface FixedRatioVersionSelectionRule extends VersionSelectionRule {
  type: "FixedRatio";
  /** The percentage of traffic to route to the version. Must be between 0 and 100. */
  traffic_percentage: number;
}

export function fixedRatioVersionSelectionRuleSerializer(
  item: FixedRatioVersionSelectionRule,
): any {
  return {
    type: item["type"],
    agent_version: item["agent_version"],
    traffic_percentage: item["traffic_percentage"],
  };
}

export function fixedRatioVersionSelectionRuleDeserializer(
  item: any,
): FixedRatioVersionSelectionRule {
  return {
    type: item["type"],
    agent_version: item["agent_version"],
    traffic_percentage: item["traffic_percentage"],
  };
}

/** Per-protocol configuration for the agent endpoint. */
export interface ProtocolConfiguration {
  /** Configuration for the activity protocol. */
  activity?: ActivityProtocolConfiguration;
  /** Configuration for the responses protocol. */
  responses?: ResponsesProtocolConfiguration;
  /** Configuration for the A2A protocol. */
  a2a?: A2AProtocolConfiguration;
  /** Configuration for the MCP protocol. */
  mcp?: McpProtocolConfiguration;
  /** Configuration for the invocations protocol. */
  invocations?: InvocationsProtocolConfiguration;
  /** Configuration for the WebSocket-based invocations protocol. */
  invocations_ws?: InvocationsWsProtocolConfiguration;
}

export function protocolConfigurationSerializer(item: ProtocolConfiguration): any {
  return {
    activity: !item["activity"]
      ? item["activity"]
      : activityProtocolConfigurationSerializer(item["activity"]),
    responses: !item["responses"]
      ? item["responses"]
      : responsesProtocolConfigurationSerializer(item["responses"]),
    a2a: !item["a2a"] ? item["a2a"] : a2AProtocolConfigurationSerializer(item["a2a"]),
    mcp: !item["mcp"] ? item["mcp"] : mcpProtocolConfigurationSerializer(item["mcp"]),
    invocations: !item["invocations"]
      ? item["invocations"]
      : invocationsProtocolConfigurationSerializer(item["invocations"]),
    invocations_ws: !item["invocations_ws"]
      ? item["invocations_ws"]
      : invocationsWsProtocolConfigurationSerializer(item["invocations_ws"]),
  };
}

export function protocolConfigurationDeserializer(item: any): ProtocolConfiguration {
  return {
    activity: !item["activity"]
      ? item["activity"]
      : activityProtocolConfigurationDeserializer(item["activity"]),
    responses: !item["responses"]
      ? item["responses"]
      : responsesProtocolConfigurationDeserializer(item["responses"]),
    a2a: !item["a2a"] ? item["a2a"] : a2AProtocolConfigurationDeserializer(item["a2a"]),
    mcp: !item["mcp"] ? item["mcp"] : mcpProtocolConfigurationDeserializer(item["mcp"]),
    invocations: !item["invocations"]
      ? item["invocations"]
      : invocationsProtocolConfigurationDeserializer(item["invocations"]),
    invocations_ws: !item["invocations_ws"]
      ? item["invocations_ws"]
      : invocationsWsProtocolConfigurationDeserializer(item["invocations_ws"]),
  };
}

/** Configuration specific to the activity protocol. */
export interface ActivityProtocolConfiguration {
  /** Whether to enable the M365 public endpoint for the activity protocol. */
  enable_m365_public_endpoint?: boolean;
  /** The access boundaries for the activity protocol. */
  readonly access_boundaries?: ActivityProtocolAccessBoundary[];
}

export function activityProtocolConfigurationSerializer(item: ActivityProtocolConfiguration): any {
  return { enable_m365_public_endpoint: item["enable_m365_public_endpoint"] };
}

export function activityProtocolConfigurationDeserializer(
  item: any,
): ActivityProtocolConfiguration {
  return {
    enable_m365_public_endpoint: item["enable_m365_public_endpoint"],
    access_boundaries: !item["access_boundaries"]
      ? item["access_boundaries"]
      : item["access_boundaries"].map((p: any) => {
          return p;
        }),
  };
}

/** Configuration specific to the responses protocol. */
export interface ResponsesProtocolConfiguration {}

export function responsesProtocolConfigurationSerializer(
  _item: ResponsesProtocolConfiguration,
): any {
  return {};
}

export function responsesProtocolConfigurationDeserializer(
  item: any,
): ResponsesProtocolConfiguration {
  return item;
}

/** Configuration specific to the A2A protocol. */
export interface A2AProtocolConfiguration {}

export function a2AProtocolConfigurationSerializer(_item: A2AProtocolConfiguration): any {
  return {};
}

export function a2AProtocolConfigurationDeserializer(item: any): A2AProtocolConfiguration {
  return item;
}

/** Configuration specific to the MCP protocol. */
export interface McpProtocolConfiguration {}

export function mcpProtocolConfigurationSerializer(_item: McpProtocolConfiguration): any {
  return {};
}

export function mcpProtocolConfigurationDeserializer(item: any): McpProtocolConfiguration {
  return item;
}

/** Configuration specific to the invocations protocol. */
export interface InvocationsProtocolConfiguration {}

export function invocationsProtocolConfigurationSerializer(
  _item: InvocationsProtocolConfiguration,
): any {
  return {};
}

export function invocationsProtocolConfigurationDeserializer(
  item: any,
): InvocationsProtocolConfiguration {
  return item;
}

/** Configuration specific to the WebSocket-based invocations protocol. */
export interface InvocationsWsProtocolConfiguration {}

export function invocationsWsProtocolConfigurationSerializer(
  _item: InvocationsWsProtocolConfiguration,
): any {
  return {};
}

export function invocationsWsProtocolConfigurationDeserializer(
  item: any,
): InvocationsWsProtocolConfiguration {
  return item;
}

export function agentEndpointAuthorizationSchemeUnionArraySerializer(
  result: Array<AgentEndpointAuthorizationSchemeUnion>,
): any[] {
  return result.map((item) => {
    return agentEndpointAuthorizationSchemeUnionSerializer(item);
  });
}

export function agentEndpointAuthorizationSchemeUnionArrayDeserializer(
  result: Array<AgentEndpointAuthorizationSchemeUnion>,
): any[] {
  return result.map((item) => {
    return agentEndpointAuthorizationSchemeUnionDeserializer(item);
  });
}

/** model interface AgentEndpointAuthorizationScheme */
export interface AgentEndpointAuthorizationScheme {
  type: AgentEndpointAuthorizationSchemeType;
}

export function agentEndpointAuthorizationSchemeSerializer(
  item: AgentEndpointAuthorizationScheme,
): any {
  return { type: item["type"] };
}

export function agentEndpointAuthorizationSchemeDeserializer(
  item: any,
): AgentEndpointAuthorizationScheme {
  return {
    type: item["type"],
  };
}

/** Alias for AgentEndpointAuthorizationSchemeUnion */
export type AgentEndpointAuthorizationSchemeUnion =
  | EntraAuthorizationScheme
  | BotServiceAuthorizationScheme
  | BotServiceRbacAuthorizationScheme
  | BotServiceTenantAuthorizationScheme
  | AgentEndpointAuthorizationScheme;

export function agentEndpointAuthorizationSchemeUnionSerializer(
  item: AgentEndpointAuthorizationSchemeUnion,
): any {
  switch (item.type) {
    case "Entra":
      return entraAuthorizationSchemeSerializer(item as EntraAuthorizationScheme);

    case "BotService":
      return botServiceAuthorizationSchemeSerializer(item as BotServiceAuthorizationScheme);

    case "BotServiceRbac":
      return botServiceRbacAuthorizationSchemeSerializer(item as BotServiceRbacAuthorizationScheme);

    case "BotServiceTenant":
      return botServiceTenantAuthorizationSchemeSerializer(
        item as BotServiceTenantAuthorizationScheme,
      );

    default:
      return agentEndpointAuthorizationSchemeSerializer(item);
  }
}

export function agentEndpointAuthorizationSchemeUnionDeserializer(
  item: any,
): AgentEndpointAuthorizationSchemeUnion {
  switch (item["type"]) {
    case "Entra":
      return entraAuthorizationSchemeDeserializer(item as EntraAuthorizationScheme);

    case "BotService":
      return botServiceAuthorizationSchemeDeserializer(item as BotServiceAuthorizationScheme);

    case "BotServiceRbac":
      return botServiceRbacAuthorizationSchemeDeserializer(
        item as BotServiceRbacAuthorizationScheme,
      );

    case "BotServiceTenant":
      return botServiceTenantAuthorizationSchemeDeserializer(
        item as BotServiceTenantAuthorizationScheme,
      );

    default:
      return agentEndpointAuthorizationSchemeDeserializer(item);
  }
}

/** Type of AgentEndpointAuthorizationSchemeType */
export type AgentEndpointAuthorizationSchemeType =
  "Entra" | "BotService" | "BotServiceRbac" | "BotServiceTenant";

/** model interface EntraAuthorizationScheme */
export interface EntraAuthorizationScheme extends AgentEndpointAuthorizationScheme {
  type: "Entra";
}

export function entraAuthorizationSchemeSerializer(item: EntraAuthorizationScheme): any {
  return {
    type: item["type"],
  };
}

export function entraAuthorizationSchemeDeserializer(item: any): EntraAuthorizationScheme {
  return {
    type: item["type"],
  };
}

/** model interface BotServiceAuthorizationScheme */
export interface BotServiceAuthorizationScheme extends AgentEndpointAuthorizationScheme {
  type: "BotService";
}

export function botServiceAuthorizationSchemeSerializer(item: BotServiceAuthorizationScheme): any {
  return { type: item["type"] };
}

export function botServiceAuthorizationSchemeDeserializer(
  item: any,
): BotServiceAuthorizationScheme {
  return {
    type: item["type"],
  };
}

/** model interface BotServiceRbacAuthorizationScheme */
export interface BotServiceRbacAuthorizationScheme extends AgentEndpointAuthorizationScheme {
  type: "BotServiceRbac";
}

export function botServiceRbacAuthorizationSchemeSerializer(
  item: BotServiceRbacAuthorizationScheme,
): any {
  return { type: item["type"] };
}

export function botServiceRbacAuthorizationSchemeDeserializer(
  item: any,
): BotServiceRbacAuthorizationScheme {
  return {
    type: item["type"],
  };
}

/** model interface BotServiceTenantAuthorizationScheme */
export interface BotServiceTenantAuthorizationScheme extends AgentEndpointAuthorizationScheme {
  type: "BotServiceTenant";
}

export function botServiceTenantAuthorizationSchemeSerializer(
  item: BotServiceTenantAuthorizationScheme,
): any {
  return { type: item["type"] };
}

export function botServiceTenantAuthorizationSchemeDeserializer(
  item: any,
): BotServiceTenantAuthorizationScheme {
  return {
    type: item["type"],
  };
}

/** model interface AgentCard */
export interface AgentCard {
  /** The version of the agent card. */
  version: string;
  /** The description of the agent card. */
  description?: string;
  /** The set of skills that an agent can perform. */
  skills: AgentCardSkill[];
}

export function agentCardSerializer(item: AgentCard): any {
  return {
    version: item["version"],
    description: item["description"],
    skills: agentCardSkillArraySerializer(item["skills"]),
  };
}

export function agentCardDeserializer(item: any): AgentCard {
  return {
    version: item["version"],
    description: item["description"],
    skills: agentCardSkillArrayDeserializer(item["skills"]),
  };
}

export function agentCardSkillArraySerializer(result: Array<AgentCardSkill>): any[] {
  return result.map((item) => {
    return agentCardSkillSerializer(item);
  });
}

export function agentCardSkillArrayDeserializer(result: Array<AgentCardSkill>): any[] {
  return result.map((item) => {
    return agentCardSkillDeserializer(item);
  });
}

/** model interface AgentCardSkill */
export interface AgentCardSkill {
  /** a unique identifier for the skill */
  id: string;
  /** The name of the skill */
  name: string;
  /** A description of the skill */
  description?: string;
  /** set of tagwords describing classes of capabilities for the skill */
  tags?: string[];
  /** A list of example scenarios that the skill can perform. */
  examples?: string[];
}

export function agentCardSkillSerializer(item: AgentCardSkill): any {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
    examples: !item["examples"]
      ? item["examples"]
      : item["examples"].map((p: any) => {
          return p;
        }),
  };
}

export function agentCardSkillDeserializer(item: any): AgentCardSkill {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
    examples: !item["examples"]
      ? item["examples"]
      : item["examples"].map((p: any) => {
          return p;
        }),
  };
}

/** Error response for API failures. */
export interface ApiErrorResponse {
  /** The error details. */
  error: ErrorModel;
}

export function apiErrorResponseDeserializer(item: any): ApiErrorResponse {
  return {
    error: apiErrorDeserializer(item["error"]),
  };
}

/** model interface ErrorModel */
export interface ErrorModel {
  /** The error code. */
  code: string;
  /** The error message. */
  message: string;
  /** The parameter that caused the error. */
  param?: string;
  /** The error type. */
  type?: string;
  /** The error details. */
  details?: ErrorModel[];
  /** Additional information about the error. */
  additionalInfo?: Record<string, unknown>;
  /** Debug information for the error. */
  debugInfo?: Record<string, unknown>;
}

export function apiErrorDeserializer(item: any): ErrorModel {
  return {
    code: item["code"],
    message: item["message"],
    param: item["param"],
    type: item["type"],
    details: !item["details"] ? item["details"] : apiErrorArrayDeserializer(item["details"]),
    additionalInfo: item["additionalInfo"],
    debugInfo: item["debugInfo"],
  };
}

export function apiErrorArrayDeserializer(result: Array<ErrorModel>): any[] {
  return result.map((item) => {
    return apiErrorDeserializer(item);
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
    systemData: item["systemData"],
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
  ContinuousEvaluationRuleAction | HumanEvaluationPreviewRuleAction | EvaluationRuleAction;

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
  switch (item["type"]) {
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
  /** The type discriminator, always 'continuousEvaluation'. */
  type: "continuousEvaluation";
  /** Eval Id to add continuous evaluation runs to. */
  evalId: string;
  /** Maximum number of evaluation runs allowed per hour. */
  maxHourlyRuns?: number;
  /** Percentage (0-100] chance that a matching event triggers an evaluation. When omitted, the service-default is to evaluate every event, which is equivalent to setting a sampling rate of 100. */
  samplingRate?: number;
}

export function continuousEvaluationRuleActionSerializer(
  item: ContinuousEvaluationRuleAction,
): any {
  return {
    type: item["type"],
    evalId: item["evalId"],
    maxHourlyRuns: item["maxHourlyRuns"],
    samplingRate: item["samplingRate"],
  };
}

export function continuousEvaluationRuleActionDeserializer(
  item: any,
): ContinuousEvaluationRuleAction {
  return {
    type: item["type"],
    evalId: item["evalId"],
    maxHourlyRuns: item["maxHourlyRuns"],
    samplingRate: item["samplingRate"],
  };
}

/** Evaluation rule action for human evaluation. */
export interface HumanEvaluationPreviewRuleAction extends EvaluationRuleAction {
  /** The type discriminator, always 'humanEvaluationPreview'. */
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
    metadata: item["metadata"],
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
  switch (item["type"]) {
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
  "ApiKey" | "AAD" | "SAS" | "CustomKeys" | "None" | "AgenticIdentityToken_Preview";

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
  switch (item["type"]) {
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
  /** The type of pending upload. */
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
  /** The type of pending upload. */
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
    type: item["credentialType"] ?? item["type"],
  };
}

/** Type alias for BlobReferenceSasCredential - same as SasCredential */
export type BlobReferenceSasCredential = SasCredential;

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
  switch (item["type"]) {
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
  switch (item["type"]) {
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
    contentFields: item["contentFields"],
    filepathField: item["filepathField"],
    titleField: item["titleField"],
    urlField: item["urlField"],
    vectorFields: item["vectorFields"],
    metadataFields: item["metadataFields"],
  };
}

export function fieldMappingDeserializer(item: any): FieldMapping {
  return {
    contentFields: item["contentFields"],
    filepathField: item["filepathField"],
    titleField: item["titleField"],
    urlField: item["urlField"],
    vectorFields: item["vectorFields"],
    metadataFields: item["metadataFields"],
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

/** File contents with optional metadata for multipart uploads. */
export interface FileWithMetadata {
  contents: FileContents;
  contentType?: string;
  filename?: string;
}

/** Multipart request body for updating or versioning a code-based agent (POST /agents/{name} and POST /agents/{name}/versions). */
export interface CreateAgentVersionFromCodeContent {
  /** JSON metadata including description and hosted definition. */
  metadata: CreateAgentVersionFromCodeMetadata;
  /** The code zip file (max 250 MB). */
  code: FileContents | FileWithMetadata;
}

export function createAgentVersionFromCodeContentSerializer(
  item: CreateAgentVersionFromCodeContent,
): any {
  return [
    { name: "metadata", body: createAgentVersionFromCodeMetadataSerializer(item["metadata"]) },
    createFilePartDescriptor("code", item["code"], "application/octet-stream"),
  ];
}

/**
 * JSON metadata for code-based agent operations (create, update, create version).
 * The agent name comes from the URL path parameter or the `x-ms-agent-name` header,
 * so it is not included in this model.
 * The content hash (SHA-256 of the zip) is carried in the `x-ms-code-zip-sha256` header.
 */
export interface CreateAgentVersionFromCodeMetadata {
  /** A human-readable description of the agent. */
  description?: string;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Record<string, string>;
  /** The hosted agent definition including code_configuration (runtime, entry_point), cpu, memory, and protocol_versions. */
  definition: HostedAgentDefinition;
}

export function createAgentVersionFromCodeMetadataSerializer(
  item: CreateAgentVersionFromCodeMetadata,
): any {
  return {
    description: item["description"],
    metadata: item["metadata"],
    definition: hostedAgentDefinitionSerializer(item["definition"]),
  };
}

/** Version indicator determining which agent version backs the session. */
export interface VersionIndicator {
  /** The type of version indicator. */
  /** The discriminator possible values: version_ref */
  type: VersionIndicatorType;
}

export function versionIndicatorSerializer(item: VersionIndicator): any {
  return { type: item["type"] };
}

export function versionIndicatorDeserializer(item: any): VersionIndicator {
  return {
    type: item["type"],
  };
}

/** Alias for VersionIndicatorUnion */
export type VersionIndicatorUnion = VersionRefIndicator | VersionIndicator;

export function versionIndicatorUnionSerializer(item: VersionIndicatorUnion): any {
  switch (item.type) {
    case "version_ref":
      return versionRefIndicatorSerializer(item as VersionRefIndicator);

    default:
      return versionIndicatorSerializer(item);
  }
}

export function versionIndicatorUnionDeserializer(item: any): VersionIndicatorUnion {
  switch (item["type"]) {
    case "version_ref":
      return versionRefIndicatorDeserializer(item as VersionRefIndicator);

    default:
      return versionIndicatorDeserializer(item);
  }
}

/** The type of version indicator used to determine the agent version backing a session. */
export type VersionIndicatorType = "version_ref";

/** Version indicator that references a specific agent version by name. */
export interface VersionRefIndicator extends VersionIndicator {
  /** Discriminator value for version_ref. */
  type: "version_ref";
  /** The agent version identifier returned by the agent version APIs. */
  agent_version: string;
}

export function versionRefIndicatorSerializer(item: VersionRefIndicator): any {
  return { type: item["type"], agent_version: item["agent_version"] };
}

export function versionRefIndicatorDeserializer(item: any): VersionRefIndicator {
  return {
    type: item["type"],
    agent_version: item["agent_version"],
  };
}

/** An agent session providing a long-lived compute sandbox for hosted agent invocations. */
export interface AgentSessionResource {
  /** The session identifier. */
  agent_session_id: string;
  /** The version indicator determining which agent version backs this session. */
  version_indicator: VersionIndicatorUnion;
  /** The current status of the session. */
  status: AgentSessionStatus;
  /** The Unix timestamp (in seconds) when the session was created. */
  readonly created_at: Date;
  /** The Unix timestamp (in seconds) when the session was last accessed. */
  readonly last_accessed_at: Date;
  /** The Unix timestamp (in seconds) when the session expires (rolling, 30 days from last activity). */
  readonly expires_at: Date;
}

export function agentSessionResourceDeserializer(item: any): AgentSessionResource {
  return {
    agent_session_id: item["agent_session_id"],
    version_indicator: versionIndicatorUnionDeserializer(item["version_indicator"]),
    status: item["status"],
    created_at: new Date(item["created_at"] * 1000),
    last_accessed_at: new Date(item["last_accessed_at"] * 1000),
    expires_at: new Date(item["expires_at"] * 1000),
  };
}

/** The status of an agent session. */
export type AgentSessionStatus =
  "creating" | "active" | "idle" | "updating" | "failed" | "deleting" | "deleted" | "expired";

/** The response data for a requested list of items. */
export interface _AgentsPagedResultAgentSessionResource {
  /** The requested list of items. */
  data: AgentSessionResource[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultAgentSessionResourceDeserializer(
  item: any,
): _AgentsPagedResultAgentSessionResource {
  return {
    data: agentSessionResourceArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function agentSessionResourceArrayDeserializer(result: Array<AgentSessionResource>): any[] {
  return result.map((item) => {
    return agentSessionResourceDeserializer(item);
  });
}

/**
 * A single Server-Sent Event frame emitted by the hosted agent session log stream.
 *
 * Each frame contains an `event` field identifying the event type and a `data`
 * field carrying the payload as plain text. Although the current `data` payload
 * is JSON-formatted, its schema is not contractual — additional keys may appear
 * and the format may change over time. Clients should treat `data` as an
 * opaque string and optionally attempt JSON parsing.
 *
 * New event types may be added in the future. Clients should gracefully
 * ignore unrecognized event types.
 *
 * Wire format:
 * ```
 * event: log
 * data: {"timestamp":"2026-03-10T09:33:17.121Z","stream":"stdout","message":"Starting server on port 18080"}
 *
 * event: log
 * data: {"timestamp":"2026-03-10T09:34:52.714Z","stream":"status","message":"Successfully connected to container"}
 * ```
 */
export interface SessionLogEvent {
  /** The SSE event type. Currently `log`, but additional event types may be added in the future. Clients should ignore unrecognized event types. */
  event: SessionLogEventType;
  /** The event payload as plain text. Currently JSON-formatted but the schema is not contractual and may change. */
  data: string;
}

export function sessionLogEventDeserializer(item: any): SessionLogEvent {
  return {
    event: item["event"],
    data: item["data"],
  };
}

/**
 * Known SSE event types emitted by the hosted agent session log stream.
 * Additional event types may be introduced in future versions.
 */
export type SessionLogEventType = "log";

/** Response from uploading a file to a session sandbox. */
export interface SessionFileWriteResponse {
  /** The path where the file was written, relative to the session home directory. */
  path: string;
  /** Number of bytes written. */
  bytes_written: number;
}

export function sessionFileWriteResponseDeserializer(item: any): SessionFileWriteResponse {
  return {
    path: item["path"],
    bytes_written: item["bytes_written"],
  };
}

/** Response from listing a directory in a session sandbox. */
export interface SessionDirectoryListResponse {
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
  /** The path that was listed, relative to the session home directory. */
  path: string;
  /** The directory entries. */
  entries: SessionDirectoryEntry[];
}

export function sessionDirectoryListResponseDeserializer(item: any): SessionDirectoryListResponse {
  return {
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
    path: item["path"],
    entries: sessionDirectoryEntryArrayDeserializer(item["entries"]),
  };
}

export function sessionDirectoryEntryArrayDeserializer(
  result: Array<SessionDirectoryEntry>,
): any[] {
  return result.map((item) => {
    return sessionDirectoryEntryDeserializer(item);
  });
}

/** A single entry in a directory listing. */
export interface SessionDirectoryEntry {
  /** The name of the file or directory. */
  name: string;
  /** The size in bytes (0 for directories). */
  size: number;
  /** Whether this entry is a directory. */
  is_directory: boolean;
  /** The Unix timestamp (in seconds) when the file was last modified. */
  modified_time: Date;
}

export function sessionDirectoryEntryDeserializer(item: any): SessionDirectoryEntry {
  return {
    name: item["name"],
    size: item["size"],
    is_directory: item["is_directory"],
    modified_time: new Date(item["modified_time"] * 1000),
  };
}

export function toolboxToolUnionArraySerializer(result: Array<ToolboxToolUnion>): any[] {
  return result.map((item) => {
    return toolboxToolUnionSerializer(item);
  });
}

export function toolboxToolUnionArrayDeserializer(result: Array<ToolboxToolUnion>): any[] {
  return result.map((item) => {
    return toolboxToolUnionDeserializer(item);
  });
}

/** An abstract representation of a tool stored in a toolbox. */
export interface ToolboxTool {
  /** The type of tool. */
  /** The discriminator possible values: code_interpreter, file_search, web_search, shell, mcp, azure_ai_search, openapi, a2a, a2a_preview, browser_automation_preview, reminder_preview, work_iq_preview, fabric_iq_preview, web_iq_preview, toolbox_search_preview, toolbox_search */
  type: ToolboxToolType;
  /** Optional user-defined name for this tool or configuration. */
  name?: string;
  /** Optional user-defined description for this tool or configuration. */
  description?: string;
  /**
   * Per-tool configuration map. Keys are tool names or `*` (catch-all default).
   * Resolution order: exact tool name match takes priority over `*`.
   * Unknown tool names are silently ignored at runtime.
   */
  tool_configs?: Record<string, ToolConfig>;
}

export function toolboxToolSerializer(item: ToolboxTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
  };
}

export function toolboxToolDeserializer(item: any): ToolboxTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
  };
}

/** Alias for ToolboxToolUnion */
export type ToolboxToolUnion =
  | CodeInterpreterToolboxTool
  | FileSearchToolboxTool
  | WebSearchToolboxTool
  | ShellToolboxTool
  | MCPToolboxTool
  | AzureAISearchToolboxTool
  | OpenApiToolboxTool
  | A2AToolboxTool
  | A2APreviewToolboxTool
  | BrowserAutomationPreviewToolboxTool
  | ReminderPreviewToolboxTool
  | WorkIQPreviewToolboxTool
  | FabricIQPreviewToolboxTool
  | WebIQPreviewToolboxTool
  | ToolboxSearchPreviewToolboxTool
  | ToolSearchToolboxTool
  | ToolboxTool;

export function toolboxToolUnionSerializer(item: ToolboxToolUnion): any {
  switch (item.type) {
    case "code_interpreter":
      return codeInterpreterToolboxToolSerializer(item as CodeInterpreterToolboxTool);

    case "file_search":
      return fileSearchToolboxToolSerializer(item as FileSearchToolboxTool);

    case "web_search":
      return webSearchToolboxToolSerializer(item as WebSearchToolboxTool);

    case "shell":
      return shellToolboxToolSerializer(item as ShellToolboxTool);

    case "mcp":
      return mcpToolboxToolSerializer(item as MCPToolboxTool);

    case "azure_ai_search":
      return azureAISearchToolboxToolSerializer(item as AzureAISearchToolboxTool);

    case "openapi":
      return openApiToolboxToolSerializer(item as OpenApiToolboxTool);

    case "a2a":
      return a2AToolboxToolSerializer(item as A2AToolboxTool);

    case "a2a_preview":
      return a2APreviewToolboxToolSerializer(item as A2APreviewToolboxTool);

    case "browser_automation_preview":
      return browserAutomationPreviewToolboxToolSerializer(
        item as BrowserAutomationPreviewToolboxTool,
      );

    case "reminder_preview":
      return reminderPreviewToolboxToolSerializer(item as ReminderPreviewToolboxTool);

    case "work_iq_preview":
      return workIQPreviewToolboxToolSerializer(item as WorkIQPreviewToolboxTool);

    case "fabric_iq_preview":
      return fabricIQPreviewToolboxToolSerializer(item as FabricIQPreviewToolboxTool);

    case "web_iq_preview":
      return webIQPreviewToolboxToolSerializer(item as WebIQPreviewToolboxTool);

    case "toolbox_search_preview":
      return toolboxSearchPreviewToolboxToolSerializer(item as ToolboxSearchPreviewToolboxTool);

    case "toolbox_search":
      return toolSearchToolboxToolSerializer(item as ToolSearchToolboxTool);

    default:
      return toolboxToolSerializer(item);
  }
}

export function toolboxToolUnionDeserializer(item: any): ToolboxToolUnion {
  switch (item["type"]) {
    case "code_interpreter":
      return codeInterpreterToolboxToolDeserializer(item as CodeInterpreterToolboxTool);

    case "file_search":
      return fileSearchToolboxToolDeserializer(item as FileSearchToolboxTool);

    case "web_search":
      return webSearchToolboxToolDeserializer(item as WebSearchToolboxTool);

    case "shell":
      return shellToolboxToolDeserializer(item as ShellToolboxTool);

    case "mcp":
      return mcpToolboxToolDeserializer(item as MCPToolboxTool);

    case "azure_ai_search":
      return azureAISearchToolboxToolDeserializer(item as AzureAISearchToolboxTool);

    case "openapi":
      return openApiToolboxToolDeserializer(item as OpenApiToolboxTool);

    case "a2a":
      return a2AToolboxToolDeserializer(item as A2AToolboxTool);

    case "a2a_preview":
      return a2APreviewToolboxToolDeserializer(item as A2APreviewToolboxTool);

    case "browser_automation_preview":
      return browserAutomationPreviewToolboxToolDeserializer(
        item as BrowserAutomationPreviewToolboxTool,
      );

    case "reminder_preview":
      return reminderPreviewToolboxToolDeserializer(item as ReminderPreviewToolboxTool);

    case "work_iq_preview":
      return workIQPreviewToolboxToolDeserializer(item as WorkIQPreviewToolboxTool);

    case "fabric_iq_preview":
      return fabricIQPreviewToolboxToolDeserializer(item as FabricIQPreviewToolboxTool);

    case "web_iq_preview":
      return webIQPreviewToolboxToolDeserializer(item as WebIQPreviewToolboxTool);

    case "toolbox_search_preview":
      return toolboxSearchPreviewToolboxToolDeserializer(item as ToolboxSearchPreviewToolboxTool);

    case "toolbox_search":
      return toolSearchToolboxToolDeserializer(item as ToolSearchToolboxTool);

    default:
      return toolboxToolDeserializer(item);
  }
}

/** Supported tool types for tools stored in a toolbox. */
export type ToolboxToolType =
  | "code_interpreter"
  | "file_search"
  | "web_search"
  | "mcp"
  | "azure_ai_search"
  | "openapi"
  | "a2a_preview"
  | "browser_automation_preview"
  | "reminder_preview"
  | "work_iq_preview"
  | "fabric_iq_preview"
  | "toolbox_search"
  | "toolbox_search_preview"
  | "a2a"
  | "shell"
  | "web_iq_preview";

/** A code interpreter tool stored in a toolbox. */
export interface CodeInterpreterToolboxTool extends ToolboxTool {
  type: "code_interpreter";
  allowed_callers?: CallableToolAllowedCaller[];
  /**
   * The code interpreter container. Can be a container ID or an object that
   * specifies uploaded file IDs to make available to your code, along with an
   * optional `memory_limit` setting.
   * If not provided, the service assumes auto.
   */
  container?: string | AutoCodeInterpreterToolParam;
}

export function codeInterpreterToolboxToolSerializer(item: CodeInterpreterToolboxTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p: any) => {
          return p;
        }),
    container: !item["container"]
      ? item["container"]
      : _codeInterpreterToolContainerSerializer(item["container"]),
  };
}

export function codeInterpreterToolboxToolDeserializer(item: any): CodeInterpreterToolboxTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p1: any) => {
          return p1;
        }),
    container: !item["container"]
      ? item["container"]
      : _codeInterpreterToolContainerDeserializer(item["container"]),
  };
}

/** A file search tool stored in a toolbox. */
export interface FileSearchToolboxTool extends ToolboxTool {
  type: "file_search";
  /** The maximum number of results to return. This number should be between 1 and 50 inclusive. */
  max_num_results?: number;
  /** Ranking options for search. */
  ranking_options?: RankingOptions;
  filters?: Filters;
  /** The IDs of the vector stores to search. */
  vector_store_ids?: string[];
}

export function fileSearchToolboxToolSerializer(item: FileSearchToolboxTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    max_num_results: item["max_num_results"],
    ranking_options: !item["ranking_options"]
      ? item["ranking_options"]
      : rankingOptionsSerializer(item["ranking_options"]),
    filters: !item["filters"] ? item["filters"] : filtersSerializer(item["filters"]),
    vector_store_ids: !item["vector_store_ids"]
      ? item["vector_store_ids"]
      : item["vector_store_ids"].map((p: any) => {
          return p;
        }),
  };
}

export function fileSearchToolboxToolDeserializer(item: any): FileSearchToolboxTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
    max_num_results: item["max_num_results"],
    ranking_options: !item["ranking_options"]
      ? item["ranking_options"]
      : rankingOptionsDeserializer(item["ranking_options"]),
    filters: !item["filters"] ? item["filters"] : filtersDeserializer(item["filters"]),
    vector_store_ids: !item["vector_store_ids"]
      ? item["vector_store_ids"]
      : item["vector_store_ids"].map((p: any) => {
          return p;
        }),
  };
}

/** A web search tool stored in a toolbox. */
export interface WebSearchToolboxTool extends ToolboxTool {
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

export function webSearchToolboxToolSerializer(item: WebSearchToolboxTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
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

export function webSearchToolboxToolDeserializer(item: any): WebSearchToolboxTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
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

/** An MCP tool stored in a toolbox. */
export interface MCPToolboxTool extends ToolboxTool {
  type: "mcp";
  /** A label for this MCP server, used to identify it in tool calls. */
  server_label: string;
  /**
   * The URL for the MCP server. One of `server_url`, `connector_id`, or
   *   `tunnel_id` must be provided.
   */
  server_url?: string;
  /**
   * Identifier for service connectors, like those available in ChatGPT. One of
   *   `server_url`, `connector_id`, or `tunnel_id` must be provided. Learn more
   *   about service connectors [here](/docs/guides/tools-remote-mcp#connectors).
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
   * The Secure MCP Tunnel ID to use instead of a direct server URL. One of
   *   `server_url`, `connector_id`, or `tunnel_id` must be provided.
   */
  tunnel_id?: string;
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
  allowed_callers?: CallableToolAllowedCaller[];
  require_approval?: MCPToolRequireApproval | "always" | "never";
  /** Whether this MCP tool is deferred and discovered via tool search. */
  defer_loading?: boolean;
  /** The connection ID in the project for the MCP server. The connection stores authentication and other connection details needed to connect to the MCP server. */
  project_connection_id?: string;
}

export function mcpToolboxToolSerializer(item: MCPToolboxTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    server_label: item["server_label"],
    server_url: item["server_url"],
    connector_id: item["connector_id"],
    tunnel_id: item["tunnel_id"],
    authorization: item["authorization"],
    server_description: item["server_description"],
    headers: item["headers"],
    allowed_tools: !item["allowed_tools"]
      ? item["allowed_tools"]
      : _mcpToolAllowedToolsSerializer(item["allowed_tools"]),
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p: any) => {
          return p;
        }),
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _mcpToolRequireApprovalSerializer(item["require_approval"]),
    defer_loading: item["defer_loading"],
    project_connection_id: item["project_connection_id"],
  };
}

export function mcpToolboxToolDeserializer(item: any): MCPToolboxTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
    server_label: item["server_label"],
    server_url: item["server_url"],
    connector_id: item["connector_id"],
    tunnel_id: item["tunnel_id"],
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
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p1: any) => {
          return p1;
        }),
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _mcpToolRequireApprovalDeserializer(item["require_approval"]),
    defer_loading: item["defer_loading"],
    project_connection_id: item["project_connection_id"],
  };
}

/** An Azure AI Search tool stored in a toolbox. */
export interface AzureAISearchToolboxTool extends ToolboxTool {
  type: "azure_ai_search";
  /** The azure ai search index resource. */
  azure_ai_search: AzureAISearchToolResource;
}

export function azureAISearchToolboxToolSerializer(item: AzureAISearchToolboxTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    azure_ai_search: azureAISearchToolResourceSerializer(item["azure_ai_search"]),
  };
}

export function azureAISearchToolboxToolDeserializer(item: any): AzureAISearchToolboxTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
    azure_ai_search: azureAISearchToolResourceDeserializer(item["azure_ai_search"]),
  };
}

/** An OpenAPI tool stored in a toolbox. */
export interface OpenApiToolboxTool extends ToolboxTool {
  type: "openapi";
  /** The openapi function definition. */
  openapi: OpenApiFunctionDefinition;
}

export function openApiToolboxToolSerializer(item: OpenApiToolboxTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    openapi: openApiFunctionDefinitionSerializer(item["openapi"]),
  };
}

export function openApiToolboxToolDeserializer(item: any): OpenApiToolboxTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
    openapi: openApiFunctionDefinitionDeserializer(item["openapi"]),
  };
}

/** An A2A tool stored in a toolbox. */
export interface A2APreviewToolboxTool extends ToolboxTool {
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
  /**
   * When `true`, Foundry sends its credentials when fetching the remote
   * agent's Agent Card. The service defaults to `false` if a value is not
   * specified by the caller (anonymous fetch).
   */
  send_credentials_for_agent_card?: boolean;
}

export function a2APreviewToolboxToolSerializer(item: A2APreviewToolboxTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    base_url: item["base_url"],
    agent_card_path: item["agent_card_path"],
    project_connection_id: item["project_connection_id"],
    send_credentials_for_agent_card: item["send_credentials_for_agent_card"],
  };
}

export function a2APreviewToolboxToolDeserializer(item: any): A2APreviewToolboxTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
    base_url: item["base_url"],
    agent_card_path: item["agent_card_path"],
    project_connection_id: item["project_connection_id"],
    send_credentials_for_agent_card: item["send_credentials_for_agent_card"],
  };
}

/** A browser automation tool stored in a toolbox. */
export interface BrowserAutomationPreviewToolboxTool extends ToolboxTool {
  type: "browser_automation_preview";
  /** The Browser Automation Tool parameters. */
  browser_automation_preview: BrowserAutomationToolParameters;
}

export function browserAutomationPreviewToolboxToolSerializer(
  item: BrowserAutomationPreviewToolboxTool,
): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    browser_automation_preview: browserAutomationToolParametersSerializer(
      item["browser_automation_preview"],
    ),
  };
}

export function browserAutomationPreviewToolboxToolDeserializer(
  item: any,
): BrowserAutomationPreviewToolboxTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
    browser_automation_preview: browserAutomationToolParametersDeserializer(
      item["browser_automation_preview"],
    ),
  };
}

/** A reminder tool stored in a toolbox. */
export interface ReminderPreviewToolboxTool extends ToolboxTool {
  type: "reminder_preview";
}

export function reminderPreviewToolboxToolSerializer(item: ReminderPreviewToolboxTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
  };
}

export function reminderPreviewToolboxToolDeserializer(item: any): ReminderPreviewToolboxTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
  };
}

/** A WorkIQ tool stored in a toolbox. */
export interface WorkIQPreviewToolboxTool extends ToolboxTool {
  type: "work_iq_preview";
  /** The ID of the WorkIQ project connection. */
  project_connection_id: string;
}

export function workIQPreviewToolboxToolSerializer(item: WorkIQPreviewToolboxTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    project_connection_id: item["project_connection_id"],
  };
}

export function workIQPreviewToolboxToolDeserializer(item: any): WorkIQPreviewToolboxTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
    project_connection_id: item["project_connection_id"],
  };
}

/** A FabricIQ tool stored in a toolbox. */
export interface FabricIQPreviewToolboxTool extends ToolboxTool {
  type: "fabric_iq_preview";
  /** The ID of the FabricIQ project connection. */
  project_connection_id: string;
  /** (Optional) The label of the FabricIQ MCP server to connect to. */
  server_label?: string;
  /** (Optional) The URL of the FabricIQ MCP server. If not provided, the URL from the project connection will be used. */
  server_url?: string;
  /** (Optional) Whether the agent requires approval before executing actions. Default is always. */
  require_approval?: MCPToolRequireApproval | string;
}

export function fabricIQPreviewToolboxToolSerializer(item: FabricIQPreviewToolboxTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    project_connection_id: item["project_connection_id"],
    server_label: item["server_label"],
    server_url: item["server_url"],
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _fabricIQPreviewToolRequireApprovalSerializer(item["require_approval"]),
  };
}

export function fabricIQPreviewToolboxToolDeserializer(item: any): FabricIQPreviewToolboxTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
    project_connection_id: item["project_connection_id"],
    server_label: item["server_label"],
    server_url: item["server_url"],
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _fabricIQPreviewToolRequireApprovalDeserializer(item["require_approval"]),
  };
}

/** A toolbox search tool stored in a toolbox. */
export interface ToolboxSearchPreviewToolboxTool extends ToolboxTool {
  /** The type of the tool. Always `toolbox_search_preview`. */
  type: "toolbox_search_preview";
}

export function toolboxSearchPreviewToolboxToolSerializer(
  item: ToolboxSearchPreviewToolboxTool,
): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
  };
}

export function toolboxSearchPreviewToolboxToolDeserializer(
  item: any,
): ToolboxSearchPreviewToolboxTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
  };
}

/** A toolbox search tool stored in a toolbox. */
export interface ToolSearchToolboxTool extends ToolboxTool {
  /** The type of the tool. Always `toolbox_search`. */
  type: "toolbox_search";
}

export function toolSearchToolboxToolSerializer(item: ToolSearchToolboxTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
  };
}

export function toolSearchToolboxToolDeserializer(item: any): ToolSearchToolboxTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
  };
}

export function toolboxSkillUnionArraySerializer(result: Array<ToolboxSkillUnion>): any[] {
  return result.map((item) => {
    return toolboxSkillUnionSerializer(item);
  });
}

export function toolboxSkillUnionArrayDeserializer(result: Array<ToolboxSkillUnion>): any[] {
  return result.map((item) => {
    return toolboxSkillUnionDeserializer(item);
  });
}

/** A skill source included in a toolbox. */
export interface ToolboxSkill {
  /** The type of skill source. */
  /** The discriminator possible values: skill_reference */
  type: string;
}

export function toolboxSkillSerializer(item: ToolboxSkill): any {
  return { type: item["type"] };
}

export function toolboxSkillDeserializer(item: any): ToolboxSkill {
  return {
    type: item["type"],
  };
}

/** Alias for ToolboxSkillUnion */
export type ToolboxSkillUnion = ToolboxSkillReference | ToolboxSkill;

export function toolboxSkillUnionSerializer(item: ToolboxSkillUnion): any {
  switch (item.type) {
    case "skill_reference":
      return toolboxSkillReferenceSerializer(item as ToolboxSkillReference);

    default:
      return toolboxSkillSerializer(item);
  }
}

export function toolboxSkillUnionDeserializer(item: any): ToolboxSkillUnion {
  switch (item["type"]) {
    case "skill_reference":
      return toolboxSkillReferenceDeserializer(item as ToolboxSkillReference);

    default:
      return toolboxSkillDeserializer(item);
  }
}

/** A reference to an existing skill to include in a toolbox. */
export interface ToolboxSkillReference extends ToolboxSkill {
  /** The type of skill source. */
  type: "skill_reference";
  /** The name of the skill. */
  name: string;
  /** The version of the skill. If not specified, the skill's default version is used. When a version is specified, the reference is pinned to that immutable version. */
  version?: string;
}

export function toolboxSkillReferenceSerializer(item: ToolboxSkillReference): any {
  return { type: item["type"], name: item["name"], version: item["version"] };
}

export function toolboxSkillReferenceDeserializer(item: any): ToolboxSkillReference {
  return {
    type: item["type"],
    name: item["name"],
    version: item["version"],
  };
}

/** Policy configuration for a toolbox, including content safety and other governance settings. */
export interface ToolboxPolicies {
  /** Responsible AI content filtering configuration. */
  rai_config?: RaiConfig;
}

export function toolboxPoliciesSerializer(item: ToolboxPolicies): any {
  return {
    rai_config: !item["rai_config"] ? item["rai_config"] : raiConfigSerializer(item["rai_config"]),
  };
}

export function toolboxPoliciesDeserializer(item: any): ToolboxPolicies {
  return {
    rai_config: !item["rai_config"]
      ? item["rai_config"]
      : raiConfigDeserializer(item["rai_config"]),
  };
}

/** A specific version of a toolbox. */
export interface ToolboxVersionObject {
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata: Record<string, string> | null;
  /** The unique identifier of the toolbox version. */
  id: string;
  /** The name of the toolbox. */
  name: string;
  /** The version identifier of the toolbox. Toolbox versions are immutable and every update creates a new version. */
  version: string;
  /** A human-readable description of the toolbox. */
  description?: string;
  /** The Unix timestamp (seconds) when the toolbox version was created. */
  created_at: Date;
  /** The list of tools contained in this toolbox version. */
  tools: ToolboxToolUnion[];
  /** The list of skill sources included in this toolbox version. */
  skills?: ToolboxSkillUnion[];
  /** Policy configuration for the toolbox version. */
  policies?: ToolboxPolicies;
}

export function toolboxVersionObjectDeserializer(item: any): ToolboxVersionObject {
  return {
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(
          Object.entries(item["metadata"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    created_at: new Date(item["created_at"] * 1000),
    tools: toolboxToolUnionArrayDeserializer(item["tools"]),
    skills: !item["skills"] ? item["skills"] : toolboxSkillUnionArrayDeserializer(item["skills"]),
    policies: !item["policies"] ? item["policies"] : toolboxPoliciesDeserializer(item["policies"]),
  };
}

/** A toolbox that stores reusable tool definitions for agents. */
export interface ToolboxObject {
  /** The unique identifier of the toolbox. */
  id: string;
  /** The name of the toolbox. */
  name: string;
  /** The version identifier that the toolbox currently points to. Defaults to the latest version. Can be changed via updateToolbox. */
  default_version: string;
}

export function toolboxObjectDeserializer(item: any): ToolboxObject {
  return {
    id: item["id"],
    name: item["name"],
    default_version: item["default_version"],
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultToolboxObject {
  /** The requested list of items. */
  data: ToolboxObject[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultToolboxObjectDeserializer(
  item: any,
): _AgentsPagedResultToolboxObject {
  return {
    data: toolboxObjectArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function toolboxObjectArrayDeserializer(result: Array<ToolboxObject>): any[] {
  return result.map((item) => {
    return toolboxObjectDeserializer(item);
  });
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultToolboxVersionObject {
  /** The requested list of items. */
  data: ToolboxVersionObject[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultToolboxVersionObjectDeserializer(
  item: any,
): _AgentsPagedResultToolboxVersionObject {
  return {
    data: toolboxVersionObjectArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function toolboxVersionObjectArrayDeserializer(result: Array<ToolboxVersionObject>): any[] {
  return result.map((item) => {
    return toolboxVersionObjectDeserializer(item);
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
  switch (item["type"]) {
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
  target: EvaluationTargetUnion;
  /** List of risk categories to evaluate against. */
  riskCategories: RiskCategory[];
}

export function agentTaxonomyInputSerializer(item: AgentTaxonomyInput): any {
  return {
    type: item["type"],
    target: evaluationTargetUnionSerializer(item["target"]),
    riskCategories: item["riskCategories"],
  };
}

export function agentTaxonomyInputDeserializer(item: any): AgentTaxonomyInput {
  return {
    type: item["type"],
    target: evaluationTargetUnionDeserializer(item["target"]),
    riskCategories: item["riskCategories"],
  };
}

/** Base class for targets with discriminator support. */
export interface EvaluationTarget {
  /** The type of target. */
  /** The discriminator possible values: azure_ai_model, azure_ai_agent */
  type: string;
}

export function evaluationTargetSerializer(item: EvaluationTarget): any {
  return { type: item["type"] };
}

export function evaluationTargetDeserializer(item: any): EvaluationTarget {
  return {
    type: item["type"],
  };
}

/** Alias for EvaluationTargetUnion */
export type EvaluationTargetUnion = AzureAIModelTarget | AzureAIAgentTarget | EvaluationTarget;

export function evaluationTargetUnionSerializer(item: EvaluationTargetUnion): any {
  switch (item.type) {
    case "azure_ai_model":
      return azureAIModelTargetSerializer(item as AzureAIModelTarget);

    case "azure_ai_agent":
      return azureAIAgentTargetSerializer(item as AzureAIAgentTarget);

    default:
      return evaluationTargetSerializer(item);
  }
}

export function evaluationTargetUnionDeserializer(item: any): EvaluationTargetUnion {
  switch (item["type"]) {
    case "azure_ai_model":
      return azureAIModelTargetDeserializer(item as AzureAIModelTarget);

    case "azure_ai_agent":
      return azureAIAgentTargetDeserializer(item as AzureAIAgentTarget);

    default:
      return evaluationTargetDeserializer(item);
  }
}

/** Represents a target specifying an Azure AI model for operations requiring model selection. */
export interface AzureAIModelTarget extends EvaluationTarget {
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
  /** The temperature parameter for sampling. Defaults to 1.0. */
  temperature?: number;
  /** The top-p parameter for nucleus sampling. Defaults to 1.0. */
  top_p?: number;
  /** The random seed for reproducibility. Defaults to 42. */
  seed?: number;
  /** The maximum number of tokens allowed in the completion. */
  max_completion_tokens?: number;
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
export interface AzureAIAgentTarget extends EvaluationTarget {
  /** The type of target, always `azure_ai_agent`. */
  type: "azure_ai_agent";
  /** The unique identifier of the Azure AI agent. */
  name: string;
  /** The version of the Azure AI agent. */
  version?: string;
  /** The parameters used to control the sampling behavior of the agent during text generation. */
  tool_descriptions?: ToolDescription[];
  tools?: ToolUnion[];
}

export function azureAIAgentTargetSerializer(item: AzureAIAgentTarget): any {
  return {
    type: item["type"],
    name: item["name"],
    version: item["version"],
    tool_descriptions: !item["tool_descriptions"]
      ? item["tool_descriptions"]
      : toolDescriptionArraySerializer(item["tool_descriptions"]),
    tools: !item["tools"] ? item["tools"] : toolUnionArraySerializer(item["tools"]),
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
    tools: !item["tools"] ? item["tools"] : toolUnionArrayDeserializer(item["tools"]),
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
  /** Evaluation levels this evaluator supports (e.g., `turn`, `conversation`). When omitted on create, the service defaults to `["turn"]`. On update, omitting this field leaves it unchanged; an empty list is rejected. Custom code-based evaluators support only `turn`; custom prompt-based evaluators support exactly one level (`turn` or `conversation`). */
  supported_evaluation_levels?: EvaluationLevel[];
  /** Definition of the evaluator */
  definition: EvaluatorDefinitionUnion;
  /** Provenance artifacts from the generation pipeline. Read-only; present only on evaluator versions created via an EvaluatorGenerationJob. Each artifact resolves to a versioned Foundry Dataset. */
  readonly generation_artifacts?: EvaluatorGenerationArtifacts;
  /** Read-only provenance link back to the EvaluatorGenerationJob that produced this version. Present only on evaluator versions created via the generation pipeline; absent for manually-created versions and unaffected by subsequent `PATCH` calls. */
  readonly generation_job_id?: string;
  /** Categories of warnings surfaced on this generated evaluator version. Present only on versions created via an EvaluatorGenerationJob when the paired job produced non-empty warnings. Absent (treat as no warnings) when the version is not from generation, when the paired job was clean, or when a subsequent `PATCH` to `definition` cleared the paired job's advisories. Follow `generation_job_id` to fetch the detailed warning payloads. */
  readonly warnings?: GenerationWarningType[];
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
    categories: item["categories"],
    supported_evaluation_levels: item["supported_evaluation_levels"],
    definition: evaluatorDefinitionUnionSerializer(item["definition"]),
    description: item["description"],
    tags: item["tags"],
  };
}

export function evaluatorVersionDeserializer(item: any): EvaluatorVersion {
  return {
    display_name: item["display_name"],
    metadata: item["metadata"],
    evaluator_type: item["evaluator_type"],
    categories: item["categories"],
    supported_evaluation_levels: item["supported_evaluation_levels"],
    definition: evaluatorDefinitionUnionDeserializer(item["definition"]),
    generation_artifacts: !item["generation_artifacts"]
      ? item["generation_artifacts"]
      : evaluatorGenerationArtifactsDeserializer(item["generation_artifacts"]),
    generation_job_id: item["generation_job_id"],
    warnings: !item["warnings"]
      ? item["warnings"]
      : item["warnings"].map((p: any) => {
          return p;
        }),
    created_by: item["created_by"],
    created_at: item["created_at"],
    modified_at: item["modified_at"],
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

/** The level at which evaluation is performed. */
export type EvaluationLevel = "turn" | "conversation";

/** Base evaluator configuration with discriminator */
export interface EvaluatorDefinition {
  /** The type of evaluator definition */
  /** The discriminator possible values: code, prompt, rubric, endpoint */
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
    init_parameters: item["init_parameters"],
    data_schema: item["data_schema"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : evaluatorMetricRecordDeserializer(item["metrics"]),
  };
}

/** Alias for EvaluatorDefinitionUnion */
export type EvaluatorDefinitionUnion =
  | CodeBasedEvaluatorDefinition
  | PromptBasedEvaluatorDefinition
  | RubricBasedEvaluatorDefinition
  | EndpointBasedEvaluatorDefinition
  | EvaluatorDefinition;

export function evaluatorDefinitionUnionSerializer(item: EvaluatorDefinitionUnion): any {
  switch (item.type) {
    case "code":
      return codeBasedEvaluatorDefinitionSerializer(item as CodeBasedEvaluatorDefinition);

    case "prompt":
      return promptBasedEvaluatorDefinitionSerializer(item as PromptBasedEvaluatorDefinition);

    case "rubric":
      return rubricBasedEvaluatorDefinitionSerializer(item as RubricBasedEvaluatorDefinition);

    case "endpoint":
      return endpointBasedEvaluatorDefinitionSerializer(item as EndpointBasedEvaluatorDefinition);

    default:
      return evaluatorDefinitionSerializer(item);
  }
}

export function evaluatorDefinitionUnionDeserializer(item: any): EvaluatorDefinitionUnion {
  switch (item["type"]) {
    case "code":
      return codeBasedEvaluatorDefinitionDeserializer(item as CodeBasedEvaluatorDefinition);

    case "prompt":
      return promptBasedEvaluatorDefinitionDeserializer(item as PromptBasedEvaluatorDefinition);

    case "rubric":
      return rubricBasedEvaluatorDefinitionDeserializer(item as RubricBasedEvaluatorDefinition);

    case "endpoint":
      return endpointBasedEvaluatorDefinitionDeserializer(item as EndpointBasedEvaluatorDefinition);

    default:
      return evaluatorDefinitionDeserializer(item);
  }
}

/** The type of evaluator definition */
export type EvaluatorDefinitionType =
  "prompt" | "code" | "prompt_and_code" | "service" | "openai_graders" | "endpoint" | "rubric";

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
  /** Default pass/fail threshold for this metric. */
  threshold?: number;
  /** Indicates if this metric is primary when there are multiple metrics. */
  is_primary?: boolean;
}

export function evaluatorMetricSerializer(item: EvaluatorMetric): any {
  return {
    type: item["type"],
    desirable_direction: item["desirable_direction"],
    min_value: item["min_value"],
    max_value: item["max_value"],
    threshold: item["threshold"],
    is_primary: item["is_primary"],
  };
}

export function evaluatorMetricDeserializer(item: any): EvaluatorMetric {
  return {
    type: item["type"],
    desirable_direction: item["desirable_direction"],
    min_value: item["min_value"],
    max_value: item["max_value"],
    threshold: item["threshold"],
    is_primary: item["is_primary"],
  };
}

/** The type of the evaluator */
export type EvaluatorMetricType = "ordinal" | "continuous" | "boolean";

/** The direction of the metric indicating whether a higher value is better, a lower value is better, or neutral */
export type EvaluatorMetricDirection = "increase" | "decrease" | "neutral";

/** Code-based evaluator definition using python code */
export interface CodeBasedEvaluatorDefinition extends EvaluatorDefinition {
  /** The type discriminator, always 'code'. */
  type: "code";
  /** Inline code text for the evaluator */
  code_text?: string;
  /** The entry point Python file name for the uploaded evaluator code (e.g. 'answer_length_evaluator.py') */
  entry_point?: string;
  /** The container image tag to use for evaluator code execution */
  image_tag?: string;
  /** The blob URI for the evaluator storage */
  blob_uri?: string;
}

export function codeBasedEvaluatorDefinitionSerializer(item: CodeBasedEvaluatorDefinition): any {
  return {
    type: item["type"],
    init_parameters: item["init_parameters"],
    data_schema: item["data_schema"],
    metrics: !item["metrics"] ? item["metrics"] : evaluatorMetricRecordSerializer(item["metrics"]),
    code_text: item["code_text"],
    entry_point: item["entry_point"],
    image_tag: item["image_tag"],
    blob_uri: item["blob_uri"],
  };
}

export function codeBasedEvaluatorDefinitionDeserializer(item: any): CodeBasedEvaluatorDefinition {
  return {
    type: item["type"],
    init_parameters: item["init_parameters"],
    data_schema: item["data_schema"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : evaluatorMetricRecordDeserializer(item["metrics"]),
    code_text: item["code_text"],
    entry_point: item["entry_point"],
    image_tag: item["image_tag"],
    blob_uri: item["blob_uri"],
  };
}

/** Prompt-based evaluator */
export interface PromptBasedEvaluatorDefinition extends EvaluatorDefinition {
  /** The type discriminator, always 'prompt'. */
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
    init_parameters: item["init_parameters"],
    data_schema: item["data_schema"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : evaluatorMetricRecordDeserializer(item["metrics"]),
    prompt_text: item["prompt_text"],
  };
}

/** Rubric-based evaluator definition — stores dimensions produced by the generate API. Used for both quality and safety evaluators. */
export interface RubricBasedEvaluatorDefinition extends EvaluatorDefinition {
  type: "rubric";
  /** The set of dimensions — the scoring blueprint used by the LLM judge. Quality evaluators include a non-editable residual dimension with id 'general_quality' (always_applicable: true); safety evaluators include 'general_policy_compliance'. Both use the same Dimension structure. */
  dimensions: Dimension[];
  /** Pass/fail threshold for the aggregate rubric score, on the same normalized 0.0-1.0 scale as the emitted `score`. When the runtime weighted average meets or exceeds this value, the result is `pass`. Defaults to 0.5 (equivalent to a raw 1-5 weighted average of 3.0). The 'any dimension scored 1 → fail' rule still applies regardless of this threshold. */
  pass_threshold?: number;
}

export function rubricBasedEvaluatorDefinitionSerializer(
  item: RubricBasedEvaluatorDefinition,
): any {
  return {
    type: item["type"],
    init_parameters: item["init_parameters"],
    data_schema: item["data_schema"],
    metrics: !item["metrics"] ? item["metrics"] : evaluatorMetricRecordSerializer(item["metrics"]),
    dimensions: dimensionArraySerializer(item["dimensions"]),
    pass_threshold: item["pass_threshold"],
  };
}

export function rubricBasedEvaluatorDefinitionDeserializer(
  item: any,
): RubricBasedEvaluatorDefinition {
  return {
    type: item["type"],
    init_parameters: item["init_parameters"],
    data_schema: item["data_schema"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : evaluatorMetricRecordDeserializer(item["metrics"]),
    dimensions: dimensionArrayDeserializer(item["dimensions"]),
    pass_threshold: item["pass_threshold"],
  };
}

export function dimensionArraySerializer(result: Array<Dimension>): any[] {
  return result.map((item) => {
    return dimensionSerializer(item);
  });
}

export function dimensionArrayDeserializer(result: Array<Dimension>): any[] {
  return result.map((item) => {
    return dimensionDeserializer(item);
  });
}

/** A single dimension — one independent, measurable quality dimension within a rubric evaluator's scoring blueprint. */
export interface Dimension {
  /** Stable identifier for this dimension (snake_case, e.g., `correct_resolution`). Required. Provided by the user when manually creating a rubric evaluator or during human-in-the-loop review of a generated set; the generation pipeline produces an initial value the user can edit. Editable when saving new versions. */
  id: string;
  /** What this dimension measures (e.g., 'Correctly identifies the user's reservation intent and pursues the appropriate workflow'). */
  description: string;
  /** Relative weight of this dimension (1-10). The generation pipeline assigns exactly one dimension weight 8-10; all others use 1-6. User edits are not constrained by this heuristic. */
  weight: number;
  /** When true, the LLM judge always scores this dimension regardless of relevance (skips applicability assessment). The service-generated general quality/policy dimension has this set to true and is non-editable. Users may set this on their own custom dimensions. The service defaults to `false` if a value is not specified by the caller. */
  always_applicable?: boolean;
}

export function dimensionSerializer(item: Dimension): any {
  return {
    id: item["id"],
    description: item["description"],
    weight: item["weight"],
    always_applicable: item["always_applicable"],
  };
}

export function dimensionDeserializer(item: any): Dimension {
  return {
    id: item["id"],
    description: item["description"],
    weight: item["weight"],
    always_applicable: item["always_applicable"],
  };
}

/** Endpoint-based evaluator definition. The customer owns and hosts an HTTP endpoint that implements the evaluation contract. The evaluator references a Project Connection by name; the connection stores the endpoint URL and credentials (API Key or Entra ID). At execution time, the service resolves the connection to obtain the endpoint URL and authentication details, then calls the endpoint for each evaluation row. */
export interface EndpointBasedEvaluatorDefinition extends EvaluatorDefinition {
  type: "endpoint";
  /** Name of the Project Connection that stores the endpoint URL and credentials. The connection must exist on the project and have a non-empty target URL. Supported auth types: ApiKey (sends `api-key` header) and AAD/Entra ID (acquires a bearer token via the project's Managed Identity). */
  connection_name: string;
}

export function endpointBasedEvaluatorDefinitionSerializer(
  item: EndpointBasedEvaluatorDefinition,
): any {
  return {
    type: item["type"],
    init_parameters: item["init_parameters"],
    data_schema: item["data_schema"],
    metrics: !item["metrics"] ? item["metrics"] : evaluatorMetricRecordSerializer(item["metrics"]),
    connection_name: item["connection_name"],
  };
}

export function endpointBasedEvaluatorDefinitionDeserializer(
  item: any,
): EndpointBasedEvaluatorDefinition {
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
    connection_name: item["connection_name"],
  };
}

/** Service-managed provenance artifacts produced by an evaluator generation job. Present only on EvaluatorVersion resources created via the generation pipeline. The combined-JSONL Foundry Dataset is read-only and resolves to a versioned dataset in a service-reserved namespace. */
export interface EvaluatorGenerationArtifacts {
  /** Reference to the single Foundry Dataset (one combined JSONL file, version-aligned to `EvaluatorVersion.version`) holding all artifacts produced by the generation pipeline. Each row in the JSONL carries a `kind` field discriminating its content (e.g. `spec`, `tools`, `context`). */
  dataset: DatasetReference;
  /** The kinds of rows present in `dataset`. Always contains `"spec"` (the generated evaluation specification, a Markdown document describing what the evaluator measures). May additionally contain `"tools"` (when the generation pipeline produced or inferred OpenAI tool schemas) and/or `"context"` (when supplementary materials such as file uploads or trace samples were used during generation). */
  kinds: string[];
}

export function evaluatorGenerationArtifactsDeserializer(item: any): EvaluatorGenerationArtifacts {
  return {
    dataset: datasetReferenceDeserializer(item["dataset"]),
    kinds: item["kinds"].map((p: any) => {
      return p;
    }),
  };
}

/** Reference to a versioned Foundry Dataset. */
export interface DatasetReference {
  /** Dataset name. */
  name: string;
  /** Dataset version. */
  version: string;
}

export function datasetReferenceDeserializer(item: any): DatasetReference {
  return {
    name: item["name"],
    version: item["version"],
  };
}

/** Category of a warning surfaced on a generated evaluator version. Extensible so new warning categories (e.g., safety, output quality) can be introduced without a breaking change. */
export type GenerationWarningType = "input_quality";

/** Request body for getting evaluator credentials */
export interface EvaluatorCredentialRequest {
  /** The blob URI for the evaluator storage. Example: `https://account.blob.core.windows.net:443/container` */
  blob_uri: string;
}

export function evaluatorCredentialRequestSerializer(item: EvaluatorCredentialRequest): any {
  return { blob_uri: item["blob_uri"] };
}

/** Evaluator Generation Job resource — a long-running job that generates rubric-based evaluator definitions from source materials. On success, the result is the persisted EvaluatorVersion. */
export interface EvaluatorGenerationJob {
  /** Server-assigned unique identifier. */
  readonly id?: string;
  /** Caller-supplied inputs. */
  inputs?: EvaluatorGenerationInputs;
  /** Result produced on success. */
  readonly result?: EvaluatorVersion;
  /** Current lifecycle status. */
  readonly status?: JobStatus;
  /** Error details — populated only on failure. */
  readonly error?: ErrorModel;
  /** The timestamp when the job was created, represented in Unix time (seconds since January 1, 1970). */
  readonly created_at?: Date;
  /** The timestamp when the job finished, represented in Unix time (seconds since January 1, 1970). */
  readonly finished_at?: Date;
  /** Token consumption summary. Populated when the job reaches a terminal state. */
  readonly usage?: EvaluatorGenerationTokenUsage;
  /** Non-fatal input-quality advisories produced by the generation pipeline. Read-only; service-generated; populated only on terminal jobs when advisories fired. Omitted when generation was clean. Cleared when a subsequent `PATCH` to the paired `EvaluatorVersion.definition` invalidates the advisories. */
  readonly input_quality_warnings?: RubricGenerationInputQualityWarning[];
}

export function evaluatorGenerationJobSerializer(item: EvaluatorGenerationJob): any {
  if (!item["inputs"]) {
    return {};
  }
  return evaluatorGenerationInputsSerializer(item["inputs"]);
}

export function evaluatorGenerationJobDeserializer(item: any): EvaluatorGenerationJob {
  return {
    id: item["id"],
    inputs: !item["inputs"]
      ? item["inputs"]
      : evaluatorGenerationInputsDeserializer(item["inputs"]),
    result: !item["result"] ? item["result"] : evaluatorVersionDeserializer(item["result"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
    created_at: new Date(item["created_at"] * 1000),
    finished_at: !item["finished_at"] ? item["finished_at"] : new Date(item["finished_at"] * 1000),
    usage: !item["usage"]
      ? item["usage"]
      : evaluatorGenerationTokenUsageDeserializer(item["usage"]),
    input_quality_warnings: !item["input_quality_warnings"]
      ? item["input_quality_warnings"]
      : rubricGenerationInputQualityWarningArrayDeserializer(item["input_quality_warnings"]),
  };
}

/** Caller-supplied inputs for an evaluator generation job. */
export interface EvaluatorGenerationInputs {
  /** Source materials for generation — agent descriptions, prompts, traces, or datasets. Each entry is an `EvaluatorGenerationJobSource` variant discriminated by `type`. */
  sources: EvaluatorGenerationJobSourceUnion[];
  /** The LLM model to use for rubric generation (e.g., 'gpt-4o'). Required — users must provide their own model rather than relying on service-owned capacity. */
  model: string;
  /** The evaluator name (immutable identifier). 1-256 characters; allowed characters are ASCII letters, digits, underscore (`_`), period (`.`), tilde (`~`), and hyphen (`-`). The prefix `builtin.` is reserved for system-managed evaluators and is rejected by the service. If an evaluator with this name already exists in the project (and is rubric-subtype), the service creates a new version under the same name and uses the prior version's `dimensions` as context for incremental improvement (foundation of the post-//build adaptive loop). Old versions remain queryable via `get_version(name, version)`. If the existing evaluator is not a rubric-subtype evaluator (built-in, prompt-based, code-based), the request is rejected with `400 Bad Request`. */
  evaluator_name: string;
  /** Optional human-friendly display name for the resulting evaluator. Surfaced as `EvaluatorVersion.display_name` on the persisted evaluator. When omitted, the service uses `evaluator_name` as the display name. The `evaluator_` prefix disambiguates this from the immutable `evaluator_name` identifier. */
  evaluator_display_name?: string;
  /** Optional human-friendly description for the resulting evaluator. Surfaced as `EvaluatorVersion.description` on the persisted evaluator. Typically collected from the UI alongside `evaluator_display_name`. The `evaluator_` prefix disambiguates this from any other description fields on related models. */
  evaluator_description?: string;
}

export function evaluatorGenerationInputsSerializer(item: EvaluatorGenerationInputs): any {
  return {
    sources: evaluatorGenerationJobSourceUnionArraySerializer(item["sources"]),
    model: item["model"],
    evaluator_name: item["evaluator_name"],
    evaluator_display_name: item["evaluator_display_name"],
    evaluator_description: item["evaluator_description"],
  };
}

export function evaluatorGenerationInputsDeserializer(item: any): EvaluatorGenerationInputs {
  return {
    sources: evaluatorGenerationJobSourceUnionArrayDeserializer(item["sources"]),
    model: item["model"],
    evaluator_name: item["evaluator_name"],
    evaluator_display_name: item["evaluator_display_name"],
    evaluator_description: item["evaluator_description"],
  };
}

export function evaluatorGenerationJobSourceUnionArraySerializer(
  result: Array<EvaluatorGenerationJobSourceUnion>,
): any[] {
  return result.map((item) => {
    return evaluatorGenerationJobSourceUnionSerializer(item);
  });
}

export function evaluatorGenerationJobSourceUnionArrayDeserializer(
  result: Array<EvaluatorGenerationJobSourceUnion>,
): any[] {
  return result.map((item) => {
    return evaluatorGenerationJobSourceUnionDeserializer(item);
  });
}

/** The base source model for evaluator generation jobs. Polymorphic over `type`. */
export interface EvaluatorGenerationJobSource {
  /** The type of source. */
  /** The discriminator possible values: prompt, agent, traces, dataset */
  type: EvaluatorGenerationJobSourceType;
}

export function evaluatorGenerationJobSourceSerializer(item: EvaluatorGenerationJobSource): any {
  return { type: item["type"] };
}

export function evaluatorGenerationJobSourceDeserializer(item: any): EvaluatorGenerationJobSource {
  return {
    type: item["type"],
  };
}

/** Alias for EvaluatorGenerationJobSourceUnion */
export type EvaluatorGenerationJobSourceUnion =
  | PromptEvaluatorGenerationJobSource
  | AgentEvaluatorGenerationJobSource
  | TracesEvaluatorGenerationJobSource
  | DatasetEvaluatorGenerationJobSource
  | EvaluatorGenerationJobSource;

export function evaluatorGenerationJobSourceUnionSerializer(
  item: EvaluatorGenerationJobSourceUnion,
): any {
  switch (item.type) {
    case "prompt":
      return promptEvaluatorGenerationJobSourceSerializer(
        item as PromptEvaluatorGenerationJobSource,
      );

    case "agent":
      return agentEvaluatorGenerationJobSourceSerializer(item as AgentEvaluatorGenerationJobSource);

    case "traces":
      return tracesEvaluatorGenerationJobSourceSerializer(
        item as TracesEvaluatorGenerationJobSource,
      );

    case "dataset":
      return datasetEvaluatorGenerationJobSourceSerializer(
        item as DatasetEvaluatorGenerationJobSource,
      );

    default:
      return evaluatorGenerationJobSourceSerializer(item);
  }
}

export function evaluatorGenerationJobSourceUnionDeserializer(
  item: any,
): EvaluatorGenerationJobSourceUnion {
  switch (item["type"]) {
    case "prompt":
      return promptEvaluatorGenerationJobSourceDeserializer(
        item as PromptEvaluatorGenerationJobSource,
      );

    case "agent":
      return agentEvaluatorGenerationJobSourceDeserializer(
        item as AgentEvaluatorGenerationJobSource,
      );

    case "traces":
      return tracesEvaluatorGenerationJobSourceDeserializer(
        item as TracesEvaluatorGenerationJobSource,
      );

    case "dataset":
      return datasetEvaluatorGenerationJobSourceDeserializer(
        item as DatasetEvaluatorGenerationJobSource,
      );

    default:
      return evaluatorGenerationJobSourceDeserializer(item);
  }
}

/** The supported source types for evaluator generation jobs. */
export type EvaluatorGenerationJobSourceType = "prompt" | "agent" | "traces" | "dataset";

/** Prompt source for evaluator generation jobs — inline text provided by the user. */
export interface PromptEvaluatorGenerationJobSource extends EvaluatorGenerationJobSource {
  /** Optional description of what this source represents — helps the pipeline interpret its content (e.g., 'Company refund policy document' or 'Describes the agent's core capabilities'). */
  description?: string;
  /** The source type for this source, which is Prompt. */
  type: "prompt";
  /** Inline prompt text (e.g., agent description, policy text, supplementary context). */
  prompt: string;
}

export function promptEvaluatorGenerationJobSourceSerializer(
  item: PromptEvaluatorGenerationJobSource,
): any {
  return { type: item["type"], description: item["description"], prompt: item["prompt"] };
}

export function promptEvaluatorGenerationJobSourceDeserializer(
  item: any,
): PromptEvaluatorGenerationJobSource {
  return {
    type: item["type"],
    description: item["description"],
    prompt: item["prompt"],
  };
}

/** Agent source for evaluator generation jobs — references an agent to fetch instructions and metadata from. */
export interface AgentEvaluatorGenerationJobSource extends EvaluatorGenerationJobSource {
  /** Optional description of what this source represents — helps the pipeline interpret its content (e.g., 'Company refund policy document' or 'Describes the agent's core capabilities'). */
  description?: string;
  /** The source type for this source, which is Agent. */
  type: "agent";
  /** The agent name to fetch instructions from. */
  agent_name: string;
  /** The agent version. If not specified, the latest version is used. */
  agent_version?: string;
}

export function agentEvaluatorGenerationJobSourceSerializer(
  item: AgentEvaluatorGenerationJobSource,
): any {
  return {
    type: item["type"],
    description: item["description"],
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
  };
}

export function agentEvaluatorGenerationJobSourceDeserializer(
  item: any,
): AgentEvaluatorGenerationJobSource {
  return {
    type: item["type"],
    description: item["description"],
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
  };
}

/** Traces source for evaluator generation jobs — conversation traces from Application Insights. */
export interface TracesEvaluatorGenerationJobSource extends EvaluatorGenerationJobSource {
  /** Optional description of what this source represents — helps the pipeline interpret its content (e.g., 'Company refund policy document' or 'Describes the agent's core capabilities'). */
  description?: string;
  /** The source type for this source, which is Traces. */
  type: "traces";
  /** The unique agent ID used to filter traces. Provide either `agent_id` or `agent_name` — at least one is required. */
  agent_id?: string;
  /** The agent name to fetch traces for. Provide either `agent_id` or `agent_name` — at least one is required. */
  agent_name?: string;
  /** The agent version. If not specified, traces for ALL versions of the agent are included within the time window. */
  agent_version?: string;
  /** Start of the time window (Unix timestamp in seconds) for fetching traces. */
  start_time?: Date;
  /** End of the time window (Unix timestamp in seconds). Defaults to current time. */
  end_time?: Date;
}

export function tracesEvaluatorGenerationJobSourceSerializer(
  item: TracesEvaluatorGenerationJobSource,
): any {
  return {
    type: item["type"],
    description: item["description"],
    agent_id: item["agent_id"],
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
    start_time: !item["start_time"]
      ? item["start_time"]
      : (item["start_time"].getTime() / 1000) | 0,
    end_time: !item["end_time"] ? item["end_time"] : (item["end_time"].getTime() / 1000) | 0,
  };
}

export function tracesEvaluatorGenerationJobSourceDeserializer(
  item: any,
): TracesEvaluatorGenerationJobSource {
  return {
    type: item["type"],
    description: item["description"],
    agent_id: item["agent_id"],
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
    start_time: !item["start_time"] ? item["start_time"] : new Date(item["start_time"] * 1000),
    end_time: !item["end_time"] ? item["end_time"] : new Date(item["end_time"] * 1000),
  };
}

/** Dataset source for evaluator generation jobs — reference to a dataset. */
export interface DatasetEvaluatorGenerationJobSource extends EvaluatorGenerationJobSource {
  /** Optional description of what this source represents — helps the pipeline interpret its content (e.g., 'Company refund policy document' or 'Describes the agent's core capabilities'). */
  description?: string;
  /** The source type for this source, which is Dataset. */
  type: "dataset";
  /** The name of the dataset. */
  name: string;
  /** The version of the dataset. If not specified, the latest version is used. */
  version?: string;
}

export function datasetEvaluatorGenerationJobSourceSerializer(
  item: DatasetEvaluatorGenerationJobSource,
): any {
  return {
    type: item["type"],
    description: item["description"],
    name: item["name"],
    version: item["version"],
  };
}

export function datasetEvaluatorGenerationJobSourceDeserializer(
  item: any,
): DatasetEvaluatorGenerationJobSource {
  return {
    type: item["type"],
    description: item["description"],
    name: item["name"],
    version: item["version"],
  };
}

/** Extensible status values shared by Foundry jobs. */
export type JobStatus = "queued" | "in_progress" | "succeeded" | "failed" | "cancelled";

/** Token consumption summary for an evaluator generation job. Populated when the job reaches a terminal state. */
export interface EvaluatorGenerationTokenUsage {
  /** Number of input (prompt) tokens consumed. */
  input_tokens: number;
  /** Number of output (completion) tokens generated. */
  output_tokens: number;
  /** Total tokens consumed (input + output). */
  total_tokens: number;
}

export function evaluatorGenerationTokenUsageDeserializer(
  item: any,
): EvaluatorGenerationTokenUsage {
  return {
    input_tokens: item["input_tokens"],
    output_tokens: item["output_tokens"],
    total_tokens: item["total_tokens"],
  };
}

export function rubricGenerationInputQualityWarningArrayDeserializer(
  result: Array<RubricGenerationInputQualityWarning>,
): any[] {
  return result.map((item) => {
    return rubricGenerationInputQualityWarningDeserializer(item);
  });
}

/** A non-fatal advisory produced during rubric evaluator generation when resolved inputs are technically valid but likely too weak to produce a high-quality rubric. Read-only; service-generated. Persisted with the terminal EvaluatorGenerationJob. */
export interface RubricGenerationInputQualityWarning {
  /** Stable searchable machine-readable warning code. */
  code: RubricGenerationInputQualityWarningCode;
  /** Advisory severity. Initial values: `warning`. */
  severity: RubricGenerationInputQualityWarningSeverity;
  /** Human-readable message suitable for direct SDK/CLI/UI display. Must not include raw prompt, instruction, dataset, or trace text. */
  message: string;
  /** Which source category the warning applies to. `aggregate` is used only for cross-source warnings. */
  source: RubricGenerationInputQualityWarningSource;
  /** Zero-based index into `EvaluatorGenerationJob.inputs.sources` when the warning applies to a specific source. Omitted for aggregate warnings and for warnings not tied to one source. */
  source_index?: number;
}

export function rubricGenerationInputQualityWarningDeserializer(
  item: any,
): RubricGenerationInputQualityWarning {
  return {
    code: item["code"],
    severity: item["severity"],
    message: item["message"],
    source: item["source"],
    source_index: item["source_index"],
  };
}

/** Stable searchable machine-readable warning code for a rubric-generation input-quality warning. Values are `snake_case`; clients must tolerate additional service-defined identifiers. */
export type RubricGenerationInputQualityWarningCode =
  | "empty_prompt"
  | "short_prompt"
  | "empty_agent_instructions"
  | "short_agent_instructions"
  | "empty_dataset_content"
  | "short_dataset_content"
  | "low_trace_count"
  | "insufficient_total_input";

/** Advisory severity for a rubric-generation input-quality warning. Initial value set: `warning`. */
export type RubricGenerationInputQualityWarningSeverity = "warning";

/** Warning source attribution for a rubric-generation input-quality warning. Per-source values (`prompt`, `agent`, `dataset`) match the source category visible to the generation runtime. `aggregate` is a synthetic value used only for warnings computed across successfully resolved sources. `traces` is not exposed because trace sources resolve into dataset content upstream. */
export type RubricGenerationInputQualityWarningSource =
  "prompt" | "agent" | "dataset" | "aggregate";

/** The response data for a requested list of items. */
export interface _AgentsPagedResultEvaluatorGenerationJob {
  /** The requested list of items. */
  data: EvaluatorGenerationJob[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultEvaluatorGenerationJobDeserializer(
  item: any,
): _AgentsPagedResultEvaluatorGenerationJob {
  return {
    data: evaluatorGenerationJobArrayDeserializer(item["value"] ?? item["data"] ?? []),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"] ?? false,
  };
}

export function evaluatorGenerationJobArraySerializer(
  result: Array<EvaluatorGenerationJob>,
): any[] {
  return result.map((item) => {
    return evaluatorGenerationJobSerializer(item);
  });
}

export function evaluatorGenerationJobArrayDeserializer(
  result: Array<EvaluatorGenerationJob>,
): any[] {
  return result.map((item) => {
    return evaluatorGenerationJobDeserializer(item);
  });
}

/** The response body for cluster insights. */
export interface Insight {
  /** The unique identifier for the insights report. */
  readonly insight_id: string;
  /** Metadata about the insights report. */
  readonly metadata: InsightsMetadata;
  /** The current state of the insights. */
  readonly state: OperationState;
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
    insight_id: item["id"],
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
  switch (item["type"]) {
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
  "EvaluationRunClusterInsight" | "AgentClusterInsight" | "EvaluationComparison";

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
    runIds: item["runIds"],
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
    runIds: item["runIds"],
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
    treatmentRunIds: item["treatmentRunIds"],
  };
}

export function evaluationComparisonInsightRequestDeserializer(
  item: any,
): EvaluationComparisonInsightRequest {
  return {
    type: item["type"],
    evalId: item["evalId"],
    baselineRunId: item["baselineRunId"],
    treatmentRunIds: item["treatmentRunIds"],
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
  switch (item["type"]) {
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
  "TooFewSamples" | "Inconclusive" | "Changed" | "Improved" | "Degraded";

/** Insights from the evaluation run cluster analysis. */
export interface EvaluationRunClusterInsightResult extends InsightResult {
  /** The type of insights result. */
  type: "EvaluationRunClusterInsight";
  /** The cluster insight details. */
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
    features: item["features"],
    correlationInfo: item["correlationInfo"],
  };
}

/** Alias for InsightSampleUnion */
export type InsightSampleUnion = EvaluationResultSample | InsightSample;

export function insightSampleUnionDeserializer(item: any): InsightSampleUnion {
  switch (item["type"]) {
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
  Object.keys(item).forEach((key) => {
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
  switch (item["kind"]) {
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
  /** Whether to enable chat summary extraction and storage. Defaults to `true`. */
  chat_summary_enabled: boolean;
  /** Whether to enable procedural memory extraction and storage. The service defaults to `true` if a value is not specified by the caller. */
  procedural_memory_enabled?: boolean;
  /** The default time-to-live for memories in seconds. A value of `0` indicates that memories do not expire. Defaults to `0`. */
  default_ttl_seconds?: number;
}

export function memoryStoreDefaultOptionsSerializer(item: MemoryStoreDefaultOptions): any {
  return {
    user_profile_enabled: item["user_profile_enabled"],
    user_profile_details: item["user_profile_details"],
    chat_summary_enabled: item["chat_summary_enabled"],
    procedural_memory_enabled: item["procedural_memory_enabled"],
    default_ttl_seconds: item["default_ttl_seconds"],
  };
}

export function memoryStoreDefaultOptionsDeserializer(item: any): MemoryStoreDefaultOptions {
  return {
    user_profile_enabled: item["user_profile_enabled"],
    user_profile_details: item["user_profile_details"],
    chat_summary_enabled: item["chat_summary_enabled"],
    procedural_memory_enabled: item["procedural_memory_enabled"],
    default_ttl_seconds: item["default_ttl_seconds"],
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
    metadata: item["metadata"],
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
  /** The discriminator possible values: user_profile, chat_summary, procedural */
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
export type MemoryItemUnion =
  UserProfileMemoryItem | ChatSummaryMemoryItem | ProceduralMemoryItem | MemoryItem;

export function memoryItemUnionDeserializer(item: any): MemoryItemUnion {
  switch (item["kind"]) {
    case "user_profile":
      return userProfileMemoryItemDeserializer(item as UserProfileMemoryItem);

    case "chat_summary":
      return chatSummaryMemoryItemDeserializer(item as ChatSummaryMemoryItem);

    case "procedural":
      return proceduralMemoryItemDeserializer(item as ProceduralMemoryItem);

    default:
      return memoryItemDeserializer(item);
  }
}

/** Memory item kind. */
export type MemoryItemKind = "user_profile" | "chat_summary" | "procedural";

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

/** A memory item containing a procedure extracted from conversations. */
export interface ProceduralMemoryItem extends MemoryItem {
  /** The kind of the memory item. */
  kind: "procedural";
}

export function proceduralMemoryItemDeserializer(item: any): ProceduralMemoryItem {
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
  /** The number of cached input tokens used. */
  cached_tokens: number;
  /** The number of cache-write input tokens used. */
  cache_write_tokens?: number;
}

export function responseUsageInputTokensDetailsDeserializer(
  item: any,
): ResponseUsageInputTokensDetails {
  return {
    cached_tokens: item["cached_tokens"],
    cache_write_tokens: item["cache_write_tokens"],
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
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
  };
}

/** Status of a memory store update operation. */
export type MemoryStoreUpdateStatus =
  "queued" | "in_progress" | "completed" | "failed" | "superseded";

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

/** The response data for a requested list of items. */
export interface _AgentsPagedResultMemoryItem {
  /** The requested list of items. */
  data: MemoryItemUnion[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultMemoryItemDeserializer(item: any): _AgentsPagedResultMemoryItem {
  return {
    data: memoryItemUnionArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function memoryItemUnionArrayDeserializer(result: Array<MemoryItemUnion>): any[] {
  return result.map((item) => {
    return memoryItemUnionDeserializer(item);
  });
}

/** Response for deleting a memory item from a memory store. */
export interface DeleteMemoryResponse {
  /** The object type. Always 'memory_store.item.deleted'. */
  object: "memory_store.item.deleted";
  /** The unique ID of the deleted memory item. */
  memory_id: string;
  /** Whether the memory item was successfully deleted. */
  deleted: boolean;
}

export function deleteMemoryResponseDeserializer(item: any): DeleteMemoryResponse {
  return {
    object: item["object"],
    memory_id: item["memory_id"],
    deleted: item["deleted"],
  };
}

/** Paged collection of ModelVersion items */
export interface _PagedModelVersion {
  /** The ModelVersion items on this page */
  value: ModelVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedModelVersionDeserializer(item: any): _PagedModelVersion {
  return {
    value: modelVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function modelVersionArraySerializer(result: Array<ModelVersion>): any[] {
  return result.map((item) => {
    return modelVersionSerializer(item);
  });
}

export function modelVersionArrayDeserializer(result: Array<ModelVersion>): any[] {
  return result.map((item) => {
    return modelVersionDeserializer(item);
  });
}

/** Model Version Definition */
export interface ModelVersion {
  /** URI of the model artifact in blob storage */
  blobUri: string;
  /** The weight type of the model */
  weightType?: FoundryModelWeightType;
  /** Base model asset ID */
  baseModel?: string;
  /** The source of the model */
  source?: ModelSourceData;
  /** Adapter-specific configuration. Required when weight_type is lora; ignored otherwise. May be auto-populated from adapter_config.json when present in the uploaded files — user-provided values take precedence over auto-detected values. */
  loraConfig?: LoraConfig;
  /** The artifact profile of the model */
  readonly artifactProfile?: ArtifactProfile;
  /** Service-computed advisory warnings derived from the artifact profile. */
  readonly warnings?: FoundryModelWarning[];
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

export function modelVersionSerializer(item: ModelVersion): any {
  return {
    blobUri: item["blobUri"],
    weightType: item["weightType"],
    baseModel: item["baseModel"],
    source: !item["source"] ? item["source"] : modelSourceDataSerializer(item["source"]),
    loraConfig: !item["loraConfig"] ? item["loraConfig"] : loraConfigSerializer(item["loraConfig"]),
    description: item["description"],
    tags: item["tags"],
  };
}

export function modelVersionDeserializer(item: any): ModelVersion {
  return {
    blobUri: item["blobUri"],
    weightType: item["weightType"],
    baseModel: item["baseModel"],
    source: !item["source"] ? item["source"] : modelSourceDataDeserializer(item["source"]),
    loraConfig: !item["loraConfig"]
      ? item["loraConfig"]
      : loraConfigDeserializer(item["loraConfig"]),
    artifactProfile: !item["artifactProfile"]
      ? item["artifactProfile"]
      : artifactProfileDeserializer(item["artifactProfile"]),
    warnings: !item["warnings"]
      ? item["warnings"]
      : foundryModelWarningArrayDeserializer(item["warnings"]),
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    tags: item["tags"],
  };
}

/** The weight type of the model. */
export type FoundryModelWeightType = "FullWeight" | "LoRA" | "DraftModel";

/** Source information for the model */
export interface ModelSourceData {
  /** The source type of the model */
  sourceType?: FoundryModelSourceType;
  /** The job ID that produced this model */
  jobId?: string;
}

export function modelSourceDataSerializer(item: ModelSourceData): any {
  return { sourceType: item["sourceType"], jobId: item["jobId"] };
}

export function modelSourceDataDeserializer(item: any): ModelSourceData {
  return {
    sourceType: item["sourceType"],
    jobId: item["jobId"],
  };
}

/** The source type of the model. */
export type FoundryModelSourceType = "LocalUpload" | "TrainingJob";

/** Adapter-specific metadata for LoRA models. Drives serving engine configuration at deployment time. */
export interface LoraConfig {
  /** LoRA rank (r). Positive integer. Common values: 8, 16, 32, 64. */
  rank?: number;
  /** LoRA scaling factor (α). Positive integer; typically 2× the rank. */
  alpha?: number;
  /** Model layers modified by the adapter (e.g., q_proj, v_proj). Auto-detected from adapter_config.json if omitted. */
  targetModules?: string[];
  /** Dropout rate used during training. Informational — not used at serving time. */
  dropout?: number;
}

export function loraConfigSerializer(item: LoraConfig): any {
  return {
    rank: item["rank"],
    alpha: item["alpha"],
    targetModules: !item["targetModules"]
      ? item["targetModules"]
      : item["targetModules"].map((p: any) => {
          return p;
        }),
    dropout: item["dropout"],
  };
}

export function loraConfigDeserializer(item: any): LoraConfig {
  return {
    rank: item["rank"],
    alpha: item["alpha"],
    targetModules: !item["targetModules"]
      ? item["targetModules"]
      : item["targetModules"].map((p: any) => {
          return p;
        }),
    dropout: item["dropout"],
  };
}

/** Artifact profile of the model */
export interface ArtifactProfile {
  /** The category of the artifact profile */
  category: FoundryModelArtifactProfileCategory;
  /** Signals detected in the model artifact */
  signals?: FoundryModelArtifactProfileSignal[];
}

export function artifactProfileDeserializer(item: any): ArtifactProfile {
  return {
    category: item["category"],
    signals: !item["signals"]
      ? item["signals"]
      : item["signals"].map((p: any) => {
          return p;
        }),
  };
}

/** The artifact profile category. */
export type FoundryModelArtifactProfileCategory = "DataOnly" | "RuntimeDependent" | "Unknown";

/** Signals detected in the model artifact. */
export type FoundryModelArtifactProfileSignal =
  "PickleDeserialization" | "CustomPythonCode" | "DynamicOps" | "NativeBinary" | "UnknownFormat";

export function foundryModelWarningArrayDeserializer(result: Array<FoundryModelWarning>): any[] {
  return result.map((item) => {
    return foundryModelWarningDeserializer(item);
  });
}

/** A warning associated with a model. */
export interface FoundryModelWarning {
  /** The warning code. */
  code?: FoundryModelWarningCode;
  /** The warning message. */
  message?: string;
}

export function foundryModelWarningDeserializer(item: any): FoundryModelWarning {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Warning code for model artifacts. */
export type FoundryModelWarningCode = "RuntimeDependentArtifact" | "UnclassifiedArtifact";

/** Request body for updating a model version. Only description and tags can be modified. */
export interface UpdateModelVersionRequest {
  /** The asset description text. */
  description?: string;
  /** Tag dictionary. Tags can be added, removed, and updated. */
  tags?: Record<string, string>;
}

export function updateModelVersionRequestSerializer(item: UpdateModelVersionRequest): any {
  return { description: item["description"], tags: item["tags"] };
}

/** model interface _CreateAsyncResponse */
export interface _CreateAsyncResponse {
  /** URL to poll for operation status. */
  location?: string;
  /** URL to the operation result, or null if the operation is still in progress. */
  operationResult?: string;
}

export function _createAsyncResponseDeserializer(item: any): _CreateAsyncResponse {
  return {
    location: item["location"],
    operationResult: item["operationResult"],
  };
}

/** Represents a request for a pending upload of a model version. */
export interface ModelPendingUploadRequest {
  /** If PendingUploadId is not provided, a random GUID will be used. */
  pendingUploadId?: string;
  /** Azure Storage Account connection name to use for generating temporary SAS token */
  connectionName?: string;
  /** The type of pending upload. Only TemporaryBlobReference is supported for models. */
  pendingUploadType: "TemporaryBlobReference";
}

export function modelPendingUploadRequestSerializer(item: ModelPendingUploadRequest): any {
  return {
    pendingUploadId: item["pendingUploadId"],
    connectionName: item["connectionName"],
    pendingUploadType: item["pendingUploadType"],
  };
}

/** Represents the response for a model pending upload request. */
export interface ModelPendingUploadResponse {
  /** Container-level read, write, list SAS. */
  blobReference: BlobReference;
  /** ID for this upload request. */
  pendingUploadId: string;
  /** Version of asset to be created if user did not specify version when initially creating upload */
  version?: string;
  /** The type of pending upload. Only TemporaryBlobReference is supported for models. */
  pendingUploadType: "TemporaryBlobReference";
}

export function modelPendingUploadResponseDeserializer(item: any): ModelPendingUploadResponse {
  return {
    blobReference: blobReferenceDeserializer(item["blobReference"]),
    pendingUploadId: item["pendingUploadId"],
    version: item["version"],
    pendingUploadType: item["pendingUploadType"],
  };
}

/** Request to fetch credentials for a model asset. */
export interface ModelCredentialRequest {
  /** Blob URI of the model asset to fetch credentials for. */
  blobUri: string;
}

export function modelCredentialRequestSerializer(item: ModelCredentialRequest): any {
  return { blobUri: item["blobUri"] };
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
  /** Simulation-only or Simulation + Evaluation. If `true` the scan outputs conversation not evaluation result. The service defaults to `false` if a value is not specified by the caller. */
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
  target?: RedTeamTargetConfigUnion;
}

export function redTeamSerializer(item: RedTeam): any {
  return {
    displayName: item["displayName"],
    numTurns: item["numTurns"],
    attackStrategies: item["attackStrategies"],
    simulationOnly: item["simulationOnly"],
    riskCategories: item["riskCategories"],
    applicationScenario: item["applicationScenario"],
    tags: item["tags"],
    properties: item["properties"],
    target: item["target"] ? redTeamTargetConfigUnionSerializer(item["target"]) : undefined,
  };
}

export function redTeamDeserializer(item: any): RedTeam {
  return {
    name: item["id"],
    displayName: item["displayName"],
    numTurns: item["numTurns"],
    attackStrategies: item["attackStrategies"],
    simulationOnly: item["simulationOnly"],
    riskCategories: item["riskCategories"],
    applicationScenario: item["applicationScenario"],
    tags: item["tags"],
    properties: item["properties"],
    status: item["status"],
    target: item["target"] ? redTeamTargetConfigUnionDeserializer(item["target"]) : undefined,
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
export interface RedTeamTargetConfig {
  /** Type of the model configuration. */
  /** The discriminator possible values: AzureOpenAIModel */
  type: string;
}

export function redTeamTargetConfigSerializer(item: RedTeamTargetConfig): any {
  return { type: item["type"] };
}

export function redTeamTargetConfigDeserializer(item: any): RedTeamTargetConfig {
  return {
    type: item["type"],
  };
}

/** Alias for RedTeamTargetConfigUnion */
export type RedTeamTargetConfigUnion = AzureOpenAIModelConfiguration | RedTeamTargetConfig;

export function redTeamTargetConfigUnionSerializer(item: RedTeamTargetConfigUnion): any {
  switch (item.type) {
    case "AzureOpenAIModel":
      return azureOpenAIModelConfigurationSerializer(item as AzureOpenAIModelConfiguration);

    default:
      return redTeamTargetConfigSerializer(item);
  }
}

export function redTeamTargetConfigUnionDeserializer(item: any): RedTeamTargetConfigUnion {
  switch (item["type"]) {
    case "AzureOpenAIModel":
      return azureOpenAIModelConfigurationDeserializer(item as AzureOpenAIModelConfiguration);

    default:
      return redTeamTargetConfigDeserializer(item);
  }
}

/** Azure OpenAI model configuration. The API version would be selected by the service for querying the model. */
export interface AzureOpenAIModelConfiguration extends RedTeamTargetConfig {
  /** The type discriminator, always 'AzureOpenAIModel'. */
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

export function routineTriggerUnionRecordSerializer(
  item: Record<string, RoutineTrigger>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : routineTriggerUnionSerializer(item[key]);
  });
  return result;
}

export function routineTriggerUnionRecordDeserializer(
  item: Record<string, any>,
): Record<string, RoutineTrigger> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : routineTriggerUnionDeserializer(item[key]);
  });
  return result;
}

/** Base model for a routine trigger. */
export interface RoutineTrigger {
  /** The trigger type. */
  /** The discriminator possible values: schedule, timer, github_issue, custom */
  type: RoutineTriggerType;
}

export function routineTriggerSerializer(item: RoutineTrigger): any {
  return { type: item["type"] };
}

export function routineTriggerDeserializer(item: any): RoutineTrigger {
  return {
    type: item["type"],
  };
}

/** Alias for RoutineTriggerUnion */
export type RoutineTriggerUnion =
  | ScheduleRoutineTrigger
  | TimerRoutineTrigger
  | GitHubIssueRoutineTrigger
  | CustomRoutineTrigger
  | RoutineTrigger;

export function routineTriggerUnionSerializer(item: RoutineTriggerUnion): any {
  switch (item.type) {
    case "schedule":
      return scheduleRoutineTriggerSerializer(item as ScheduleRoutineTrigger);

    case "timer":
      return timerRoutineTriggerSerializer(item as TimerRoutineTrigger);

    case "github_issue":
      return gitHubIssueRoutineTriggerSerializer(item as GitHubIssueRoutineTrigger);

    case "custom":
      return customRoutineTriggerSerializer(item as CustomRoutineTrigger);

    default:
      return routineTriggerSerializer(item);
  }
}

export function routineTriggerUnionDeserializer(item: any): RoutineTriggerUnion {
  switch (item["type"]) {
    case "schedule":
      return scheduleRoutineTriggerDeserializer(item as ScheduleRoutineTrigger);

    case "timer":
      return timerRoutineTriggerDeserializer(item as TimerRoutineTrigger);

    case "github_issue":
      return gitHubIssueRoutineTriggerDeserializer(item as GitHubIssueRoutineTrigger);

    case "custom":
      return customRoutineTriggerDeserializer(item as CustomRoutineTrigger);

    default:
      return routineTriggerDeserializer(item);
  }
}

/** The discriminator values supported for routine triggers. */
export type RoutineTriggerType = "custom" | "github_issue" | "schedule" | "timer";

/** A recurring cron-based routine trigger. */
export interface ScheduleRoutineTrigger extends RoutineTrigger {
  /** The trigger type. */
  type: "schedule";
  /** A 5-field cron expression. The service enforces a minimum interval of five minutes by default. */
  cron_expression: string;
  /** An IANA or Windows time zone identifier for the schedule. */
  time_zone: string;
}

export function scheduleRoutineTriggerSerializer(item: ScheduleRoutineTrigger): any {
  return {
    type: item["type"],
    cron_expression: item["cron_expression"],
    time_zone: item["time_zone"],
  };
}

export function scheduleRoutineTriggerDeserializer(item: any): ScheduleRoutineTrigger {
  return {
    type: item["type"],
    cron_expression: item["cron_expression"],
    time_zone: item["time_zone"],
  };
}

/** A one-shot timer routine trigger. */
export interface TimerRoutineTrigger extends RoutineTrigger {
  /** The trigger type. */
  type: "timer";
  /** The UTC date and time at which the timer fires. */
  at?: Date;
}

export function timerRoutineTriggerSerializer(item: TimerRoutineTrigger): any {
  return { type: item["type"], at: !item["at"] ? item["at"] : item["at"].toISOString() };
}

export function timerRoutineTriggerDeserializer(item: any): TimerRoutineTrigger {
  return {
    type: item["type"],
    at: !item["at"] ? item["at"] : new Date(item["at"]),
  };
}

/** A GitHub issue routine trigger. */
export interface GitHubIssueRoutineTrigger extends RoutineTrigger {
  /** The trigger type. */
  type: "github_issue";
  /** The workspace connection identifier that resolves the GitHub configuration for the trigger. */
  connection_id: string;
  /** The GitHub owner or organization that scopes which issues can fire the trigger. */
  owner: string;
  /** The GitHub repository filter that scopes which issues can fire the trigger. */
  repository: string;
  /** The GitHub issue event that fires the routine. */
  issue_event: GitHubIssueEvent;
}

export function gitHubIssueRoutineTriggerSerializer(item: GitHubIssueRoutineTrigger): any {
  return {
    type: item["type"],
    connection_id: item["connection_id"],
    owner: item["owner"],
    repository: item["repository"],
    issue_event: item["issue_event"],
  };
}

export function gitHubIssueRoutineTriggerDeserializer(item: any): GitHubIssueRoutineTrigger {
  return {
    type: item["type"],
    connection_id: item["connection_id"],
    owner: item["owner"],
    repository: item["repository"],
    issue_event: item["issue_event"],
  };
}

/** Known GitHub issue events that can fire a routine. */
export type GitHubIssueEvent = "opened" | "closed";

/** A custom event routine trigger. */
export interface CustomRoutineTrigger extends RoutineTrigger {
  /** The trigger type. */
  type: "custom";
  /** The external provider that emits the custom event. */
  provider: string;
  /** The provider-specific event name that fires the routine. */
  event_name?: string;
  /** Provider-specific trigger parameters. */
  parameters: Record<string, any>;
}

export function customRoutineTriggerSerializer(item: CustomRoutineTrigger): any {
  return {
    type: item["type"],
    provider: item["provider"],
    event_name: item["event_name"],
    parameters: item["parameters"],
  };
}

export function customRoutineTriggerDeserializer(item: any): CustomRoutineTrigger {
  return {
    type: item["type"],
    provider: item["provider"],
    event_name: item["event_name"],
    parameters: item["parameters"],
  };
}

/** Base model for a routine action. */
export interface RoutineAction {
  /** The action type. */
  /** The discriminator possible values: invoke_agent_responses_api, invoke_agent_invocations_api */
  type: RoutineActionType;
}

export function routineActionSerializer(item: RoutineAction): any {
  return { type: item["type"] };
}

export function routineActionDeserializer(item: any): RoutineAction {
  return {
    type: item["type"],
  };
}

/** Alias for RoutineActionUnion */
export type RoutineActionUnion =
  InvokeAgentResponsesApiRoutineAction | InvokeAgentInvocationsApiRoutineAction | RoutineAction;

export function routineActionUnionSerializer(item: RoutineActionUnion): any {
  switch (item.type) {
    case "invoke_agent_responses_api":
      return invokeAgentResponsesApiRoutineActionSerializer(
        item as InvokeAgentResponsesApiRoutineAction,
      );

    case "invoke_agent_invocations_api":
      return invokeAgentInvocationsApiRoutineActionSerializer(
        item as InvokeAgentInvocationsApiRoutineAction,
      );

    default:
      return routineActionSerializer(item);
  }
}

export function routineActionUnionDeserializer(item: any): RoutineActionUnion {
  switch (item["type"]) {
    case "invoke_agent_responses_api":
      return invokeAgentResponsesApiRoutineActionDeserializer(
        item as InvokeAgentResponsesApiRoutineAction,
      );

    case "invoke_agent_invocations_api":
      return invokeAgentInvocationsApiRoutineActionDeserializer(
        item as InvokeAgentInvocationsApiRoutineAction,
      );

    default:
      return routineActionDeserializer(item);
  }
}

/** The discriminator values supported for routine actions. */
export type RoutineActionType = "invoke_agent_responses_api" | "invoke_agent_invocations_api";

/** Dispatches a routine through the responses API. Exactly one of agent_name or agent_endpoint_id must be provided. */
export interface InvokeAgentResponsesApiRoutineAction extends RoutineAction {
  /** The action type. */
  type: "invoke_agent_responses_api";
  /** The project-scoped agent name for routine dispatch. */
  agent_name?: string;
  /** Legacy endpoint-scoped agent identifier for routine dispatch. */
  agent_endpoint_id?: string;
  /** Static JSON value sent as the complete downstream input when the routine fires. The value is passed through as-is; no templating is applied. */
  input?: any;
  /** An optional existing conversation identifier to continue during the downstream dispatch. */
  conversation?: string;
}

export function invokeAgentResponsesApiRoutineActionSerializer(
  item: InvokeAgentResponsesApiRoutineAction,
): any {
  return {
    type: item["type"],
    agent_name: item["agent_name"],
    agent_endpoint_id: item["agent_endpoint_id"],
    input: item["input"],
    conversation: item["conversation"],
  };
}

export function invokeAgentResponsesApiRoutineActionDeserializer(
  item: any,
): InvokeAgentResponsesApiRoutineAction {
  return {
    type: item["type"],
    agent_name: item["agent_name"],
    agent_endpoint_id: item["agent_endpoint_id"],
    input: item["input"],
    conversation: item["conversation"],
  };
}

/** Dispatches a routine through the raw invocations API. Exactly one of agent_name or agent_endpoint_id must be provided. */
export interface InvokeAgentInvocationsApiRoutineAction extends RoutineAction {
  /** The action type. */
  type: "invoke_agent_invocations_api";
  /** The project-scoped agent name for routine dispatch. */
  agent_name?: string;
  /** Legacy endpoint-scoped agent identifier for routine dispatch. */
  agent_endpoint_id?: string;
  /** Static JSON value sent as the complete downstream input when the routine fires. The value is passed through as-is; no templating is applied. */
  input?: any;
  /** An optional existing hosted-agent session identifier to continue during the downstream dispatch. */
  session_id?: string;
}

export function invokeAgentInvocationsApiRoutineActionSerializer(
  item: InvokeAgentInvocationsApiRoutineAction,
): any {
  return {
    type: item["type"],
    agent_name: item["agent_name"],
    agent_endpoint_id: item["agent_endpoint_id"],
    input: item["input"],
    session_id: item["session_id"],
  };
}

export function invokeAgentInvocationsApiRoutineActionDeserializer(
  item: any,
): InvokeAgentInvocationsApiRoutineAction {
  return {
    type: item["type"],
    agent_name: item["agent_name"],
    agent_endpoint_id: item["agent_endpoint_id"],
    input: item["input"],
    session_id: item["session_id"],
  };
}

/** A routine definition returned by the service. */
export interface Routine {
  /** The routine name. */
  name?: string;
  /** A human-readable description of the routine. */
  description?: string;
  /** Whether the routine is enabled. */
  enabled: boolean;
  /** The triggers configured for the routine. */
  triggers?: Record<string, RoutineTriggerUnion>;
  /** The action executed when the routine fires. */
  action?: RoutineActionUnion;
  /** The time when the routine was created. */
  created_at?: Date;
  /** The time when the routine was last updated. */
  updated_at?: Date;
}

export function routineDeserializer(item: any): Routine {
  return {
    name: item["name"],
    description: item["description"],
    enabled: item["enabled"],
    triggers: !item["triggers"]
      ? item["triggers"]
      : routineTriggerUnionRecordDeserializer(item["triggers"]),
    action: !item["action"] ? item["action"] : routineActionUnionDeserializer(item["action"]),
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    updated_at: !item["updated_at"] ? item["updated_at"] : new Date(item["updated_at"] * 1000),
  };
}

/** The response data for a requested list of items. */
export interface _PagedResultWithNextLinkRoutine {
  /** The requested list of items. */
  data: Routine[];
  /** The URL to fetch the next page of results, or absent if there are no additional pages. */
  next_link?: string;
}

export function _pagedResultWithNextLinkRoutineDeserializer(
  item: any,
): _PagedResultWithNextLinkRoutine {
  return {
    data: routineArrayDeserializer(item["data"]),
    next_link: item["next_link"],
  };
}

export function routineArrayDeserializer(result: Array<Routine>): any[] {
  return (result ?? []).map((item) => {
    return routineDeserializer(item);
  });
}

/** The response data for a requested list of items. */
export interface _PagedResultWithNextLinkRoutineRun {
  /** The requested list of items. */
  data: RoutineRun[];
  /** The URL to fetch the next page of results, or absent if there are no additional pages. */
  next_link?: string;
}

export function _pagedResultWithNextLinkRoutineRunDeserializer(
  item: any,
): _PagedResultWithNextLinkRoutineRun {
  return {
    data: routineRunArrayDeserializer(item["data"]),
    next_link: item["next_link"],
  };
}

export function routineRunArrayDeserializer(result: Array<RoutineRun>): any[] {
  return result.map((item) => {
    return routineRunDeserializer(item);
  });
}

/** A single routine run returned from the run history API. */
export interface RoutineRun {
  /** The unique run identifier for the routine attempt. */
  readonly id: string;
  /** The run status. */
  status?: RoutineRunStatus;
  /** The AgentExtensions lifecycle phase for the routine attempt. */
  phase?: RoutineRunPhase;
  /** The trigger type that produced the routine attempt. */
  trigger_type?: RoutineTriggerType;
  /** The configured trigger name that produced the routine attempt. */
  trigger_name?: string;
  /** The event payload captured from the event that triggered the routine attempt, when available. */
  trigger_event_payload?: Record<string, any>;
  /** The source path that created the routine attempt. */
  attempt_source?: RoutineAttemptSource;
  /** The action type dispatched for the routine attempt. */
  action_type?: RoutineActionType;
  /** The project-scoped agent identifier recorded for the routine attempt. */
  agent_id?: string;
  /** The legacy endpoint-scoped agent identifier recorded for the routine attempt. */
  agent_endpoint_id?: string;
  /** The conversation identifier used by a responses API dispatch. */
  conversation_id?: string;
  /** The hosted-agent session identifier used by an invocations API dispatch. */
  session_id?: string;
  /** The logical trigger time recorded for the routine attempt. */
  triggered_at?: Date;
  /** The scheduled fire time recorded for timer and schedule deliveries. */
  scheduled_fire_at?: Date;
  /** The time when the underlying run started. */
  started_at?: Date;
  /** The time when the underlying run reached a terminal state. */
  ended_at?: Date;
  /** The dispatch identifier associated with the routine attempt. */
  dispatch_id?: string;
  /** The downstream action correlation identifier, when available. */
  action_correlation_id?: string;
  /** The downstream response or invocation identifier, when available. */
  response_id?: string;
  /** The workspace task identifier linked to the routine attempt, when available. */
  task_id?: string;
  /** The downstream error status code captured for a failed attempt, when available. */
  error_status_code?: number;
  /** The fully qualified error type captured for a failed attempt, when available. */
  error_type?: string;
  /** The truncated failure message captured for a failed attempt, when available. */
  error_message?: string;
}

export function routineRunDeserializer(item: any): RoutineRun {
  return {
    id: item["id"],
    status: !item["status"] ? item["status"] : routineRunStatusDeserializer(item["status"]),
    phase: item["phase"],
    trigger_type: item["trigger_type"],
    trigger_name: item["trigger_name"],
    trigger_event_payload: !item["trigger_event_payload"]
      ? item["trigger_event_payload"]
      : Object.fromEntries(
          Object.entries(item["trigger_event_payload"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    attempt_source: item["attempt_source"],
    action_type: item["action_type"],
    agent_id: item["agent_id"],
    agent_endpoint_id: item["agent_endpoint_id"],
    conversation_id: item["conversation_id"],
    session_id: item["session_id"],
    triggered_at: !item["triggered_at"]
      ? item["triggered_at"]
      : new Date(item["triggered_at"] * 1000),
    scheduled_fire_at: !item["scheduled_fire_at"]
      ? item["scheduled_fire_at"]
      : new Date(item["scheduled_fire_at"] * 1000),
    started_at: !item["started_at"] ? item["started_at"] : new Date(item["started_at"] * 1000),
    ended_at: !item["ended_at"] ? item["ended_at"] : new Date(item["ended_at"] * 1000),
    dispatch_id: item["dispatch_id"],
    action_correlation_id: item["action_correlation_id"],
    response_id: item["response_id"],
    task_id: item["task_id"],
    error_status_code: item["error_status_code"],
    error_type: item["error_type"],
    error_message: item["error_message"],
  };
}

/** The status of a routine run. */
export type RoutineRunStatus = string;

export function routineRunStatusDeserializer(item: any): RoutineRunStatus {
  return item;
}

/** Known lifecycle phases recorded for a routine run. */
export type RoutineRunPhase = "queued" | "dispatching" | "completed" | "failed";

/** Known source paths that can produce a routine run. */
export type RoutineAttemptSource =
  "event_fire" | "manual_dispatch" | "queued_dispatch" | "schedule_delivery" | "timer_delivery";

/** Base model for a manual dispatch payload. */
export interface RoutineDispatchPayload {
  /** The manual dispatch payload type. */
  /** The discriminator possible values: invoke_agent_responses_api, invoke_agent_invocations_api */
  type: RoutineDispatchPayloadType;
}

export function routineDispatchPayloadSerializer(item: RoutineDispatchPayload): any {
  return { type: item["type"] };
}

/** Alias for RoutineDispatchPayloadUnion */
export type RoutineDispatchPayloadUnion =
  | InvokeAgentResponsesApiDispatchPayload
  | InvokeAgentInvocationsApiDispatchPayload
  | RoutineDispatchPayload;

export function routineDispatchPayloadUnionSerializer(item: RoutineDispatchPayloadUnion): any {
  switch (item.type) {
    case "invoke_agent_responses_api":
      return invokeAgentResponsesApiDispatchPayloadSerializer(
        item as InvokeAgentResponsesApiDispatchPayload,
      );

    case "invoke_agent_invocations_api":
      return invokeAgentInvocationsApiDispatchPayloadSerializer(
        item as InvokeAgentInvocationsApiDispatchPayload,
      );

    default:
      return routineDispatchPayloadSerializer(item);
  }
}

/** The discriminator values supported for manual routine dispatch payloads. */
export type RoutineDispatchPayloadType =
  "invoke_agent_responses_api" | "invoke_agent_invocations_api";

/** A manual payload used to test a responses API routine dispatch. */
export interface InvokeAgentResponsesApiDispatchPayload extends RoutineDispatchPayload {
  /** The manual dispatch payload type. */
  type: "invoke_agent_responses_api";
  /** The JSON value sent as the complete downstream responses input. The value is passed through as-is and can be an object, string, number, boolean, array, or null. */
  input: unknown;
}

export function invokeAgentResponsesApiDispatchPayloadSerializer(
  item: InvokeAgentResponsesApiDispatchPayload,
): any {
  return { type: item["type"], input: item["input"] };
}

/** A manual payload used to test an invocations API routine dispatch. */
export interface InvokeAgentInvocationsApiDispatchPayload extends RoutineDispatchPayload {
  /** The manual dispatch payload type. */
  type: "invoke_agent_invocations_api";
  /** The JSON value sent as the complete downstream invocations input. The value is passed through as-is and can be an object, string, number, boolean, array, or null. */
  input: unknown;
}

export function invokeAgentInvocationsApiDispatchPayloadSerializer(
  item: InvokeAgentInvocationsApiDispatchPayload,
): any {
  return { type: item["type"], input: item["input"] };
}

/** Identifiers returned after a routine dispatch is queued. */
export interface DispatchRoutineResponse {
  /** The dispatch identifier created for the routine dispatch. */
  dispatch_id?: string;
  /** A downstream action correlation identifier, when available. */
  action_correlation_id?: string;
  /** A workspace task identifier created for the dispatch, when available. */
  task_id?: string;
}

export function dispatchRoutineResponseDeserializer(item: any): DispatchRoutineResponse {
  return {
    dispatch_id: item["dispatch_id"],
    action_correlation_id: item["action_correlation_id"],
    task_id: item["task_id"],
  };
}

/** Schedule model. */
export interface Schedule {
  /** Identifier of the schedule. */
  readonly schedule_id?: string;
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
    schedule_id: item["id"],
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
  "Creating" | "Updating" | "Deleting" | "Succeeded" | "Failed";

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
  switch (item["type"]) {
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
  /** The type discriminator, always 'Cron'. */
  type: "Cron";
  /** Cron expression that defines the schedule frequency. */
  expression: string;
  /** Time zone for the cron schedule. Defaults to `UTC`. */
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
  /** Time zone for the recurrence schedule. Defaults to `UTC`. */
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
  switch (item["type"]) {
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
  /** The type discriminator, always 'Hourly'. */
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
    hours: item["hours"],
  };
}

export function dailyRecurrenceScheduleDeserializer(item: any): DailyRecurrenceSchedule {
  return {
    type: item["type"],
    hours: item["hours"],
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
    daysOfWeek: item["daysOfWeek"],
  };
}

export function weeklyRecurrenceScheduleDeserializer(item: any): WeeklyRecurrenceSchedule {
  return {
    type: item["type"],
    daysOfWeek: item["daysOfWeek"],
  };
}

/** Days of the week for recurrence schedule. */
export type DayOfWeek =
  "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";

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
    daysOfMonth: item["daysOfMonth"],
  };
}

export function monthlyRecurrenceScheduleDeserializer(item: any): MonthlyRecurrenceSchedule {
  return {
    type: item["type"],
    daysOfMonth: item["daysOfMonth"],
  };
}

/** One-time trigger. */
export interface OneTimeTrigger extends Trigger {
  /** The type discriminator, always 'OneTime'. */
  type: "OneTime";
  /** Date and time for the one-time trigger in ISO 8601 format. */
  triggerAt: string;
  /** Time zone for the one-time trigger. Defaults to `UTC`. */
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
  switch (item["type"]) {
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
  evalRun: Record<string, unknown>;
}

export function evaluationScheduleTaskSerializer(item: EvaluationScheduleTask): any {
  return {
    type: item["type"],
    configuration: item["configuration"],
    evalId: item["evalId"],
    evalRun: item["evalRun"],
  };
}

export function evaluationScheduleTaskDeserializer(item: any): EvaluationScheduleTask {
  return {
    type: item["type"],
    configuration: item["configuration"],
    evalId: item["evalId"],
    evalRun: item["evalRun"],
  };
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

/** A skill resource. */
export interface Skill {
  /** The unique identifier of the skill. */
  id: string;
  /** The unique name of the skill. */
  name: string;
  /** A human-readable description of the skill. */
  description: string;
  /** The Unix timestamp (seconds) when the skill was created. */
  created_at: Date;
  /** The default version for the skill. Can be changed via updateSkill. */
  default_version: string;
  /** The latest version for the skill. */
  latest_version: string;
}

export function skillDeserializer(item: any): Skill {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    created_at: new Date(item["created_at"] * 1000),
    default_version: item["default_version"],
    latest_version: item["latest_version"],
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultSkill {
  /** The requested list of items. */
  data: Skill[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultSkillDeserializer(item: any): _AgentsPagedResultSkill {
  return {
    data: skillArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function skillArrayDeserializer(result: Array<Skill>): any[] {
  return result.map((item) => {
    return skillDeserializer(item);
  });
}

/** A deleted skill. */
export interface DeleteSkillResponse {
  /** The unique identifier of the deleted skill. */
  id: string;
  /** The unique name of the skill. */
  name: string;
  /** Whether the skill was successfully deleted. */
  deleted: boolean;
}

export function deleteSkillResponseDeserializer(item: any): DeleteSkillResponse {
  return {
    id: item["id"],
    name: item["name"],
    deleted: item["deleted"],
  };
}

/** Inline content for defining a simple skill without uploading files. Follows the agentskills.io SKILL.md specification. */
export interface SkillInlineContent {
  /** A human-readable description of what the skill does and when to use it. */
  description: string;
  /** The skill instructions in markdown format. This is the body content of the SKILL.md file. */
  instructions: string;
  /** License name or reference to a bundled license file. */
  license?: string;
  /** Environment requirements or compatibility notes for the skill. */
  compatibility?: string;
  /** Arbitrary key-value metadata for additional properties. */
  metadata?: Record<string, string>;
  /** List of pre-approved tools the skill may use. Experimental. */
  allowed_tools?: string[];
}

export function skillInlineContentSerializer(item: SkillInlineContent): any {
  return {
    description: item["description"],
    instructions: item["instructions"],
    license: item["license"],
    compatibility: item["compatibility"],
    metadata: item["metadata"],
    allowed_tools: !item["allowed_tools"]
      ? item["allowed_tools"]
      : item["allowed_tools"].map((p: any) => {
          return p;
        }),
  };
}

/** A specific version of a skill. */
export interface SkillVersion {
  /** The unique identifier of the skill version. */
  id: string;
  /** The identifier of the parent skill. */
  skill_id: string;
  /** The name of the skill version. */
  name: string;
  /** The version identifier. Skill versions are immutable. */
  version: string;
  /** A human-readable description of the skill version. */
  description: string;
  /** The Unix timestamp (seconds) when the skill version was created. */
  created_at: Date;
}

export function skillVersionDeserializer(item: any): SkillVersion {
  return {
    id: item["id"],
    skill_id: item["skill_id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    created_at: new Date(item["created_at"] * 1000),
  };
}

/** Multipart request body for creating a skill version from files. Accepts either a single zip file or multiple individual skill files (directory upload). For zip uploads, the server extracts and validates contents. For directory uploads, files are validated as-is. */
export interface CreateSkillVersionFromFilesBody {
  /** Skill files to upload. Upload a single zip file or multiple individual files with relative paths. */
  files: Array<FileContents | { contents: FileContents; contentType?: string; filename?: string }>;
  /** Whether to set this version as the default. Defaults to false. */
  default?: boolean;
}

export function createSkillVersionFromFilesBodySerializer(
  item: CreateSkillVersionFromFilesBody,
): any {
  return [
    ...item["files"].map((x: any) => createFilePartDescriptor("files", x)),
    ...(item["default"] === undefined ? [] : [{ name: "default", body: item["default"] }]),
  ];
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultSkillVersion {
  /** The requested list of items. */
  data: SkillVersion[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultSkillVersionDeserializer(
  item: any,
): _AgentsPagedResultSkillVersion {
  return {
    data: skillVersionArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function skillVersionArrayDeserializer(result: Array<SkillVersion>): any[] {
  return result.map((item) => {
    return skillVersionDeserializer(item);
  });
}

/** A deleted skill version. */
export interface DeleteSkillVersionResponse {
  /** The unique identifier of the deleted skill version. */
  id: string;
  /** The name of the skill. */
  name: string;
  /** Whether the skill version was successfully deleted. */
  deleted: boolean;
  /** The version that was deleted. */
  version: string;
}

export function deleteSkillVersionResponseDeserializer(item: any): DeleteSkillVersionResponse {
  return {
    id: item["id"],
    name: item["name"],
    deleted: item["deleted"],
    version: item["version"],
  };
}

/** Data Generation Job resource. */
export interface DataGenerationJob {
  /** Server-assigned unique identifier. */
  readonly id?: string;
  /** Caller-supplied inputs. */
  inputs?: DataGenerationJobInputs;
  /** Result produced on success. */
  readonly result?: DataGenerationJobResult;
  /** Current lifecycle status. */
  readonly status?: JobStatus;
  /** Error details — populated only on failure. */
  readonly error?: ErrorModel;
  /** The timestamp when the job was created, represented in Unix time (seconds since January 1, 1970). */
  readonly created_at?: Date;
  /** The timestamp when the job was finished, represented in Unix time (seconds since January 1, 1970). */
  readonly finished_at?: Date;
}

export function dataGenerationJobSerializer(item: DataGenerationJob): any {
  return {
    inputs: !item["inputs"] ? item["inputs"] : dataGenerationJobInputsSerializer(item["inputs"]),
  };
}

export function dataGenerationJobDeserializer(item: any): DataGenerationJob {
  return {
    id: item["id"],
    inputs: !item["inputs"] ? item["inputs"] : dataGenerationJobInputsDeserializer(item["inputs"]),
    result: !item["result"] ? item["result"] : dataGenerationJobResultDeserializer(item["result"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
    created_at: new Date(item["created_at"] * 1000),
    finished_at: !item["finished_at"] ? item["finished_at"] : new Date(item["finished_at"] * 1000),
  };
}

/** Caller-supplied inputs for a data generation job. */
export interface DataGenerationJobInputs {
  /** The display name of the data generation job. */
  name: string;
  /** The sources used for the data generation job. */
  sources: DataGenerationJobSourceUnion[];
  /** The options for the data generation job. */
  options: DataGenerationJobOptionsUnion;
  /** The scenario of the data generation job. Either for fine-tuning or evaluation. */
  scenario: DataGenerationJobScenario;
  /** Optional caller-supplied metadata for the job's output. See individual fields for whether they apply to file outputs (fine-tuning scenarios), dataset outputs (evaluation scenario), or both. */
  output_options?: DataGenerationJobOutputOptions;
}

export function dataGenerationJobInputsSerializer(item: DataGenerationJobInputs): any {
  return {
    name: item["name"],
    sources: dataGenerationJobSourceUnionArraySerializer(item["sources"]),
    options: dataGenerationJobOptionsUnionSerializer(item["options"]),
    scenario: item["scenario"],
    output_options: !item["output_options"]
      ? item["output_options"]
      : dataGenerationJobOutputOptionsSerializer(item["output_options"]),
  };
}

export function dataGenerationJobInputsDeserializer(item: any): DataGenerationJobInputs {
  return {
    name: item["name"],
    sources: dataGenerationJobSourceUnionArrayDeserializer(item["sources"]),
    options: dataGenerationJobOptionsUnionDeserializer(item["options"]),
    scenario: item["scenario"],
    output_options: !item["output_options"]
      ? item["output_options"]
      : dataGenerationJobOutputOptionsDeserializer(item["output_options"]),
  };
}

export function dataGenerationJobSourceUnionArraySerializer(
  result: Array<DataGenerationJobSourceUnion>,
): any[] {
  return result.map((item) => {
    return dataGenerationJobSourceUnionSerializer(item);
  });
}

export function dataGenerationJobSourceUnionArrayDeserializer(
  result: Array<DataGenerationJobSourceUnion>,
): any[] {
  return result.map((item) => {
    return dataGenerationJobSourceUnionDeserializer(item);
  });
}

/** The base source model for data generation jobs. */
export interface DataGenerationJobSource {
  /** The type of source. */
  /** The discriminator possible values: prompt, agent, traces, file */
  type: DataGenerationJobSourceType;
  /** Optional description of what this source represents — helps the pipeline interpret its content (e.g., 'Company refund policy document' or 'Describes the agent's core capabilities'). */
  description?: string;
}

export function dataGenerationJobSourceSerializer(item: DataGenerationJobSource): any {
  return { type: item["type"], description: item["description"] };
}

export function dataGenerationJobSourceDeserializer(item: any): DataGenerationJobSource {
  return {
    type: item["type"],
    description: item["description"],
  };
}

/** Alias for DataGenerationJobSourceUnion */
export type DataGenerationJobSourceUnion =
  | PromptDataGenerationJobSource
  | AgentDataGenerationJobSource
  | TracesDataGenerationJobSource
  | FileDataGenerationJobSource
  | DataGenerationJobSource;

export function dataGenerationJobSourceUnionSerializer(item: DataGenerationJobSourceUnion): any {
  switch (item.type) {
    case "prompt":
      return promptDataGenerationJobSourceSerializer(item as PromptDataGenerationJobSource);

    case "agent":
      return agentDataGenerationJobSourceSerializer(item as AgentDataGenerationJobSource);

    case "traces":
      return tracesDataGenerationJobSourceSerializer(item as TracesDataGenerationJobSource);

    case "file":
      return fileDataGenerationJobSourceSerializer(item as FileDataGenerationJobSource);

    default:
      return dataGenerationJobSourceSerializer(item);
  }
}

export function dataGenerationJobSourceUnionDeserializer(item: any): DataGenerationJobSourceUnion {
  switch (item["type"]) {
    case "prompt":
      return promptDataGenerationJobSourceDeserializer(item as PromptDataGenerationJobSource);

    case "agent":
      return agentDataGenerationJobSourceDeserializer(item as AgentDataGenerationJobSource);

    case "traces":
      return tracesDataGenerationJobSourceDeserializer(item as TracesDataGenerationJobSource);

    case "file":
      return fileDataGenerationJobSourceDeserializer(item as FileDataGenerationJobSource);

    default:
      return dataGenerationJobSourceDeserializer(item);
  }
}

/** The supported source types for data generation jobs. */
export type DataGenerationJobSourceType = "prompt" | "agent" | "traces" | "file";

/** Prompt source for data generation jobs — inline text provided by the user. */
export interface PromptDataGenerationJobSource extends DataGenerationJobSource {
  /** Optional description of what this source represents — helps the pipeline interpret its content (e.g., 'Company refund policy document' or 'Describes the agent's core capabilities'). */
  description?: string;
  /** The source type for this source, which is Prompt. */
  type: "prompt";
  /** Inline prompt text (e.g., agent description, policy text, supplementary context). */
  prompt: string;
}

export function promptDataGenerationJobSourceSerializer(item: PromptDataGenerationJobSource): any {
  return { type: item["type"], description: item["description"], prompt: item["prompt"] };
}

export function promptDataGenerationJobSourceDeserializer(
  item: any,
): PromptDataGenerationJobSource {
  return {
    type: item["type"],
    description: item["description"],
    prompt: item["prompt"],
  };
}

/** Agent source for data generation jobs — references an agent to fetch instructions and metadata from. */
export interface AgentDataGenerationJobSource extends DataGenerationJobSource {
  /** Optional description of what this source represents — helps the pipeline interpret its content (e.g., 'Company refund policy document' or 'Describes the agent's core capabilities'). */
  description?: string;
  /** The source type for this source, which is Agent. */
  type: "agent";
  /** The agent name to fetch instructions from. */
  agent_name: string;
  /** The agent version. If not specified, the latest version is used. */
  agent_version?: string;
}

export function agentDataGenerationJobSourceSerializer(item: AgentDataGenerationJobSource): any {
  return {
    type: item["type"],
    description: item["description"],
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
  };
}

export function agentDataGenerationJobSourceDeserializer(item: any): AgentDataGenerationJobSource {
  return {
    type: item["type"],
    description: item["description"],
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
  };
}

/** Traces source for data generation jobs — conversation traces from Application Insights. */
export interface TracesDataGenerationJobSource extends DataGenerationJobSource {
  /** Optional description of what this source represents — helps the pipeline interpret its content (e.g., 'Company refund policy document' or 'Describes the agent's core capabilities'). */
  description?: string;
  /** The source type for this source, which is Traces. */
  type: "traces";
  /** The unique agent ID used to filter traces. Provide either `agent_id` or `agent_name` — at least one is required. */
  agent_id?: string;
  /** The agent name to fetch traces for. Provide either `agent_id` or `agent_name` — at least one is required. */
  agent_name?: string;
  /** The agent version. If not specified, traces for ALL versions of the agent are included within the time window. */
  agent_version?: string;
  /** Start of the time window (Unix timestamp in seconds) for fetching traces. */
  start_time: Date;
  /** End of the time window (Unix timestamp in seconds). Defaults to current time. */
  end_time?: Date;
}

export function tracesDataGenerationJobSourceSerializer(item: TracesDataGenerationJobSource): any {
  return {
    type: item["type"],
    description: item["description"],
    agent_id: item["agent_id"],
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
    start_time: !item["start_time"]
      ? item["start_time"]
      : (item["start_time"].getTime() / 1000) | 0,
    end_time: !item["end_time"] ? item["end_time"] : (item["end_time"].getTime() / 1000) | 0,
  };
}

export function tracesDataGenerationJobSourceDeserializer(
  item: any,
): TracesDataGenerationJobSource {
  return {
    type: item["type"],
    description: item["description"],
    agent_id: item["agent_id"],
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
    start_time: new Date(item["start_time"] * 1000),
    end_time: !item["end_time"] ? item["end_time"] : new Date(item["end_time"] * 1000),
  };
}

/** File source for data generation jobs — Azure OpenAI file input. */
export interface FileDataGenerationJobSource extends DataGenerationJobSource {
  /** The source type for this job, which is File. */
  type: "file";
  /** Input Azure Open AI file id used for data generation. */
  id: string;
}

export function fileDataGenerationJobSourceSerializer(item: FileDataGenerationJobSource): any {
  return { type: item["type"], description: item["description"], id: item["id"] };
}

export function fileDataGenerationJobSourceDeserializer(item: any): FileDataGenerationJobSource {
  return {
    type: item["type"],
    description: item["description"],
    id: item["id"],
  };
}

/** Options for managing data generation jobs. */
export interface DataGenerationJobOptions {
  /** The data generation job type. */
  /** The discriminator possible values: simple_qna, traces, task_generation, simulation_seed, tool_use */
  type: DataGenerationJobType;
  /** Maximum number of samples to generate. */
  max_samples: number;
  /** The proportion of the generated data to be used for training when the data is used for fine-tuning. The rest will be used for validation. Value should be between 0 and 1. */
  train_split?: number;
  /** The LLM model options. */
  model_options?: DataGenerationModelOptions;
}

export function dataGenerationJobOptionsSerializer(item: DataGenerationJobOptions): any {
  return {
    type: item["type"],
    max_samples: item["max_samples"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsSerializer(item["model_options"]),
  };
}

export function dataGenerationJobOptionsDeserializer(item: any): DataGenerationJobOptions {
  return {
    type: item["type"],
    max_samples: item["max_samples"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsDeserializer(item["model_options"]),
  };
}

/** Alias for DataGenerationJobOptionsUnion */
export type DataGenerationJobOptionsUnion =
  | SimpleQnADataGenerationJobOptions
  | TracesDataGenerationJobOptions
  | TaskGenerationDataGenerationJobOptions
  | SimulationSeedDataGenerationJobOptions
  | ToolUseFineTuningDataGenerationJobOptions
  | DataGenerationJobOptions;

export function dataGenerationJobOptionsUnionSerializer(item: DataGenerationJobOptionsUnion): any {
  switch (item.type) {
    case "simple_qna":
      return simpleQnADataGenerationJobOptionsSerializer(item as SimpleQnADataGenerationJobOptions);

    case "traces":
      return tracesDataGenerationJobOptionsSerializer(item as TracesDataGenerationJobOptions);

    case "simulation_seed":
      return simulationSeedDataGenerationJobOptionsSerializer(
        item as SimulationSeedDataGenerationJobOptions,
      );

    case "task_generation":
      return taskGenerationDataGenerationJobOptionsSerializer(
        item as TaskGenerationDataGenerationJobOptions,
      );

    case "tool_use":
      return toolUseFineTuningDataGenerationJobOptionsSerializer(
        item as ToolUseFineTuningDataGenerationJobOptions,
      );

    default:
      return dataGenerationJobOptionsSerializer(item);
  }
}

export function dataGenerationJobOptionsUnionDeserializer(
  item: any,
): DataGenerationJobOptionsUnion {
  switch (item["type"]) {
    case "simple_qna":
      return simpleQnADataGenerationJobOptionsDeserializer(
        item as SimpleQnADataGenerationJobOptions,
      );

    case "traces":
      return tracesDataGenerationJobOptionsDeserializer(item as TracesDataGenerationJobOptions);

    case "simulation_seed":
      return simulationSeedDataGenerationJobOptionsDeserializer(
        item as SimulationSeedDataGenerationJobOptions,
      );

    case "task_generation":
      return taskGenerationDataGenerationJobOptionsDeserializer(
        item as TaskGenerationDataGenerationJobOptions,
      );

    case "tool_use":
      return toolUseFineTuningDataGenerationJobOptionsDeserializer(
        item as ToolUseFineTuningDataGenerationJobOptions,
      );

    default:
      return dataGenerationJobOptionsDeserializer(item);
  }
}

/** The supported data generation job types. */
export type DataGenerationJobType =
  "simple_qna" | "traces" | "tool_use" | "task_generation" | "simulation_seed";

/** LLM model options for data generation jobs. */
export interface DataGenerationModelOptions {
  /** Base model name used to generate data. */
  model: string;
}

export function dataGenerationModelOptionsSerializer(item: DataGenerationModelOptions): any {
  return { model: item["model"] };
}

export function dataGenerationModelOptionsDeserializer(item: any): DataGenerationModelOptions {
  return {
    model: item["model"],
  };
}

/** The options for a data generation job with SimpleQnA type. */
export interface SimpleQnADataGenerationJobOptions extends DataGenerationJobOptions {
  /** The data generation job type, which is SimpleQnA for this model. */
  type: "simple_qna";
  /** The question types to generate. Used only for fine-tuning scenarios. */
  question_types?: SimpleQnAFineTuningQuestionType[];
}

export function simpleQnADataGenerationJobOptionsSerializer(
  item: SimpleQnADataGenerationJobOptions,
): any {
  return {
    type: item["type"],
    max_samples: item["max_samples"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsSerializer(item["model_options"]),
    question_types: !item["question_types"]
      ? item["question_types"]
      : item["question_types"].map((p: any) => {
          return p;
        }),
  };
}

export function simpleQnADataGenerationJobOptionsDeserializer(
  item: any,
): SimpleQnADataGenerationJobOptions {
  return {
    type: item["type"],
    max_samples: item["max_samples"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsDeserializer(item["model_options"]),
    question_types: !item["question_types"]
      ? item["question_types"]
      : item["question_types"].map((p: any) => {
          return p;
        }),
  };
}

/** The supported question types for SimpleQnA data generation jobs used for fine-tuning scenarios. */
export type SimpleQnAFineTuningQuestionType = "short_answer" | "long_answer";

/** The options for a data generation job with Traces type. */
export interface TracesDataGenerationJobOptions extends DataGenerationJobOptions {
  /** The data generation job type, which is Traces for this model. */
  type: "traces";
  /** Whether to redact private content from traces. When omitted or set to true, private content is redacted. Set to false to opt out of redaction. */
  redact_private_content?: boolean;
}

export function tracesDataGenerationJobOptionsSerializer(
  item: TracesDataGenerationJobOptions,
): any {
  return {
    type: item["type"],
    max_samples: item["max_samples"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsSerializer(item["model_options"]),
    redact_private_content: item["redact_private_content"],
  };
}

export function tracesDataGenerationJobOptionsDeserializer(
  item: any,
): TracesDataGenerationJobOptions {
  return {
    type: item["type"],
    max_samples: item["max_samples"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsDeserializer(item["model_options"]),
    redact_private_content: item["redact_private_content"],
  };
}

/** The options for a simulation seed data generation job. Use with multiturn evaluation scenarios and with prompt, file, or agent sources. Generated dataset rows include fields such as `id`, `category`, `test_case_description`, and `desired_num_turns`. */
export interface SimulationSeedDataGenerationJobOptions extends DataGenerationJobOptions {
  /** The data generation job type, which is SimulationSeed for this model. */
  type: "simulation_seed";
}

export function simulationSeedDataGenerationJobOptionsSerializer(
  item: SimulationSeedDataGenerationJobOptions,
): any {
  return {
    type: item["type"],
    max_samples: item["max_samples"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsSerializer(item["model_options"]),
  };
}

export function simulationSeedDataGenerationJobOptionsDeserializer(
  item: any,
): SimulationSeedDataGenerationJobOptions {
  return {
    type: item["type"],
    max_samples: item["max_samples"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsDeserializer(item["model_options"]),
  };
}

/** @deprecated Use `SimulationSeedDataGenerationJobOptions` instead. */
export interface TaskGenerationDataGenerationJobOptions extends DataGenerationJobOptions {
  /** The data generation job type. */
  type: "task_generation";
}

export function taskGenerationDataGenerationJobOptionsSerializer(
  item: TaskGenerationDataGenerationJobOptions,
): any {
  return {
    type: item["type"],
    max_samples: item["max_samples"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsSerializer(item["model_options"]),
  };
}

export function taskGenerationDataGenerationJobOptionsDeserializer(
  item: any,
): TaskGenerationDataGenerationJobOptions {
  return {
    type: item["type"],
    max_samples: item["max_samples"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsDeserializer(item["model_options"]),
  };
}

/** The options for a data generation job with ToolUse type. Used only for fine-tuning scenarios. */
export interface ToolUseFineTuningDataGenerationJobOptions extends DataGenerationJobOptions {
  /** The data generation job type, which is ToolUse for this model. */
  type: "tool_use";
}

export function toolUseFineTuningDataGenerationJobOptionsSerializer(
  item: ToolUseFineTuningDataGenerationJobOptions,
): any {
  return {
    type: item["type"],
    max_samples: item["max_samples"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsSerializer(item["model_options"]),
  };
}

export function toolUseFineTuningDataGenerationJobOptionsDeserializer(
  item: any,
): ToolUseFineTuningDataGenerationJobOptions {
  return {
    type: item["type"],
    max_samples: item["max_samples"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsDeserializer(item["model_options"]),
  };
}

/** The supported scenarios for a data generation job. */
export type DataGenerationJobScenario =
  "supervised_finetuning" | "reinforcement_finetuning" | "evaluation";

/** Output options for data generation job. */
export interface DataGenerationJobOutputOptions {
  /** Name to assign to the output. Used as the filename for Azure OpenAI file outputs (fine-tuning scenarios) and as the dataset name for dataset outputs (evaluation scenario). */
  name?: string;
  /** Description to assign to the output. Applies only to dataset outputs (evaluation scenario); ignored for Azure OpenAI file outputs. */
  description?: string;
  /** Tags to assign to the output. Applies only to dataset outputs (evaluation scenario); ignored for Azure OpenAI file outputs. */
  tags?: Record<string, string>;
}

export function dataGenerationJobOutputOptionsSerializer(
  item: DataGenerationJobOutputOptions,
): any {
  return { name: item["name"], description: item["description"], tags: item["tags"] };
}

export function dataGenerationJobOutputOptionsDeserializer(
  item: any,
): DataGenerationJobOutputOptions {
  return {
    name: item["name"],
    description: item["description"],
    tags: item["tags"],
  };
}

/** Result produced by a successful data generation job. */
export interface DataGenerationJobResult {
  /** The final job outputs: Azure OpenAI files for fine-tuning, or datasets for evaluation. */
  outputs?: DataGenerationJobOutputUnion[];
  /** The number of samples actually generated. */
  generated_samples: number;
  /** The token usage information for the data generation job. */
  token_usage?: DataGenerationTokenUsage;
}

export function dataGenerationJobResultDeserializer(item: any): DataGenerationJobResult {
  return {
    outputs: !item["outputs"]
      ? item["outputs"]
      : dataGenerationJobOutputUnionArrayDeserializer(item["outputs"]),
    generated_samples: item["generated_samples"],
    token_usage: !item["token_usage"]
      ? item["token_usage"]
      : dataGenerationTokenUsageDeserializer(item["token_usage"]),
  };
}

export function dataGenerationJobOutputUnionArrayDeserializer(
  result: Array<DataGenerationJobOutputUnion>,
): any[] {
  return result.map((item) => {
    return dataGenerationJobOutputUnionDeserializer(item);
  });
}

/** Output information for a data generation job. */
export interface DataGenerationJobOutput {
  /** The type of the output. */
  /** The discriminator possible values: file, dataset */
  type: DataGenerationJobOutputType;
}

export function dataGenerationJobOutputDeserializer(item: any): DataGenerationJobOutput {
  return {
    type: item["type"],
  };
}

/** Alias for DataGenerationJobOutputUnion */
export type DataGenerationJobOutputUnion =
  FileDataGenerationJobOutput | DatasetDataGenerationJobOutput | DataGenerationJobOutput;

export function dataGenerationJobOutputUnionDeserializer(item: any): DataGenerationJobOutputUnion {
  switch (item["type"]) {
    case "file":
      return fileDataGenerationJobOutputDeserializer(item as FileDataGenerationJobOutput);

    case "dataset":
      return datasetDataGenerationJobOutputDeserializer(item as DatasetDataGenerationJobOutput);

    default:
      return dataGenerationJobOutputDeserializer(item);
  }
}

/** The supported output file types for a data generation job. */
export type DataGenerationJobOutputType = "file" | "dataset";

/** Azure OpenAI file output for a data generation job. */
export interface FileDataGenerationJobOutput extends DataGenerationJobOutput {
  /** Azure OpenAI file output. */
  type: "file";
  /** The id of the output Azure OpenAI file. */
  readonly id: string;
  /** The filename of the output Azure OpenAI file. */
  readonly filename: string;
}

export function fileDataGenerationJobOutputDeserializer(item: any): FileDataGenerationJobOutput {
  return {
    type: item["type"],
    id: item["id"],
    filename: item["filename"],
  };
}

/** Dataset output for a data generation job. */
export interface DatasetDataGenerationJobOutput extends DataGenerationJobOutput {
  /** Dataset output. */
  type: "dataset";
  /** The id of the output dataset created. */
  readonly id?: string;
  /** The name of the output dataset. */
  readonly name?: string;
  /** The version of the output dataset. */
  readonly version?: string;
  /** Description of the output dataset. */
  readonly description?: string;
  /** Tag dictionary of the output dataset. */
  readonly tags?: Record<string, string>;
}

export function datasetDataGenerationJobOutputDeserializer(
  item: any,
): DatasetDataGenerationJobOutput {
  return {
    type: item["type"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    tags: item["tags"],
  };
}

/** Token usage information for a data generation job. */
export interface DataGenerationTokenUsage {
  /** The number of prompt tokens used. */
  readonly prompt_tokens: number;
  /** The number of completion tokens generated. */
  readonly completion_tokens: number;
  /** Total number of tokens used. */
  readonly total_tokens: number;
}

export function dataGenerationTokenUsageDeserializer(item: any): DataGenerationTokenUsage {
  return {
    prompt_tokens: item["prompt_tokens"],
    completion_tokens: item["completion_tokens"],
    total_tokens: item["total_tokens"],
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultDataGenerationJob {
  /** The requested list of items. */
  data: DataGenerationJob[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultDataGenerationJobDeserializer(
  item: any,
): _AgentsPagedResultDataGenerationJob {
  return {
    data: dataGenerationJobArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function dataGenerationJobArraySerializer(result: Array<DataGenerationJob>): any[] {
  return result.map((item) => {
    return dataGenerationJobSerializer(item);
  });
}

export function dataGenerationJobArrayDeserializer(result: Array<DataGenerationJob>): any[] {
  return result.map((item) => {
    return dataGenerationJobDeserializer(item);
  });
}

/** Agent optimization job resource — a long-running job that optimizes an agent's configuration (instructions, model, skills, tools) to maximize evaluation scores. On success, the result contains scored candidates. */
export interface AgentOptimizationJob {
  /** Server-assigned unique identifier. */
  readonly id: string;
  /** Caller-supplied inputs. */
  inputs?: AgentOptimizationJobInputs;
  /** Result produced on success. */
  readonly result?: AgentOptimizationJobResult;
  /** Current lifecycle status. */
  readonly status: JobStatus;
  /** Error details — populated only on failure. */
  readonly error?: ErrorModel;
  /** The timestamp when the job was created, represented in Unix time. */
  readonly created_at: Date;
  /** The timestamp when the job was last updated, represented in Unix time. */
  readonly updated_at: Date;
  /** Progress snapshot. May be present in terminal states reflecting last-known progress. */
  readonly progress?: AgentOptimizationJobProgress;
  /** Non-fatal warnings emitted at any point during optimization. */
  readonly warnings?: string[];
}

export function agentOptimizationJobSerializer(item: AgentOptimizationJob): any {
  return {
    inputs: !item["inputs"] ? item["inputs"] : agentOptimizationJobInputsSerializer(item["inputs"]),
  };
}

export function agentOptimizationJobDeserializer(item: any): AgentOptimizationJob {
  return {
    id: item["id"],
    inputs: !item["inputs"]
      ? item["inputs"]
      : agentOptimizationJobInputsDeserializer(item["inputs"]),
    result: !item["result"]
      ? item["result"]
      : agentOptimizationJobResultDeserializer(item["result"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
    created_at: new Date(item["created_at"] * 1000),
    updated_at: new Date(item["updated_at"] * 1000),
    progress: !item["progress"]
      ? item["progress"]
      : agentOptimizationJobProgressDeserializer(item["progress"]),
    warnings: !item["warnings"]
      ? item["warnings"]
      : item["warnings"].map((p: any) => {
          return p;
        }),
  };
}

/** Caller-supplied inputs for an optimization job. */
export interface AgentOptimizationJobInputs {
  /** The agent (and pinned version) being optimized. */
  agent: OptimizedAgentIdentifier;
  /** Training dataset — either inline items or a reference to a registered dataset. Required. */
  train_dataset: AgentOptimizationDatasetInputUnion;
  /** Optional held-out validation dataset for measuring generalization of the final candidate. */
  validation_dataset?: AgentOptimizationDatasetInputUnion;
  /** Job-level evaluators referenced by name and optional version. Required; at least one must be provided. */
  evaluators: AgentOptimizationEvaluatorRef[];
  /** Tuning knobs and run-mode. */
  options?: AgentOptimizationOptions;
}

export function agentOptimizationJobInputsSerializer(item: AgentOptimizationJobInputs): any {
  return {
    agent: optimizedAgentIdentifierSerializer(item["agent"]),
    train_dataset: agentOptimizationDatasetInputUnionSerializer(item["train_dataset"]),
    validation_dataset: !item["validation_dataset"]
      ? item["validation_dataset"]
      : agentOptimizationDatasetInputUnionSerializer(item["validation_dataset"]),
    evaluators: agentOptimizationEvaluatorRefArraySerializer(item["evaluators"]),
    options: !item["options"]
      ? item["options"]
      : agentOptimizationOptionsSerializer(item["options"]),
  };
}

export function agentOptimizationJobInputsDeserializer(item: any): AgentOptimizationJobInputs {
  return {
    agent: optimizedAgentIdentifierDeserializer(item["agent"]),
    train_dataset: agentOptimizationDatasetInputUnionDeserializer(item["train_dataset"]),
    validation_dataset: !item["validation_dataset"]
      ? item["validation_dataset"]
      : agentOptimizationDatasetInputUnionDeserializer(item["validation_dataset"]),
    evaluators: agentOptimizationEvaluatorRefArrayDeserializer(item["evaluators"]),
    options: !item["options"]
      ? item["options"]
      : agentOptimizationOptionsDeserializer(item["options"]),
  };
}

/** Identifies the registered Foundry agent to optimize (request-only). Skills, tools, and system_prompt are specified in options.optimization_config. */
export interface OptimizedAgentIdentifier {
  /** Registered Foundry agent name (required). */
  agent_name: string;
  /** Pinned agent version. Defaults to latest if omitted. */
  agent_version?: string;
}

export function optimizedAgentIdentifierSerializer(item: OptimizedAgentIdentifier): any {
  return { agent_name: item["agent_name"], agent_version: item["agent_version"] };
}

export function optimizedAgentIdentifierDeserializer(item: any): OptimizedAgentIdentifier {
  return {
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
  };
}

/** Base discriminated model for dataset input. Either inline items or a registered reference. */
export interface AgentOptimizationDatasetInput {
  /** Dataset input type discriminator. */
  /** The discriminator possible values: inline, reference */
  type: AgentOptimizationDatasetInputType;
}

export function agentOptimizationDatasetInputSerializer(item: AgentOptimizationDatasetInput): any {
  return { type: item["type"] };
}

export function agentOptimizationDatasetInputDeserializer(
  item: any,
): AgentOptimizationDatasetInput {
  return {
    type: item["type"],
  };
}

/** Alias for AgentOptimizationDatasetInputUnion */
export type AgentOptimizationDatasetInputUnion =
  | AgentOptimizationInlineDatasetInput
  | AgentOptimizationReferenceDatasetInput
  | AgentOptimizationDatasetInput;

export function agentOptimizationDatasetInputUnionSerializer(
  item: AgentOptimizationDatasetInputUnion,
): any {
  switch (item.type) {
    case "inline":
      return agentOptimizationInlineDatasetInputSerializer(
        item as AgentOptimizationInlineDatasetInput,
      );

    case "reference":
      return agentOptimizationReferenceDatasetInputSerializer(
        item as AgentOptimizationReferenceDatasetInput,
      );

    default:
      return agentOptimizationDatasetInputSerializer(item);
  }
}

export function agentOptimizationDatasetInputUnionDeserializer(
  item: any,
): AgentOptimizationDatasetInputUnion {
  switch (item["type"]) {
    case "inline":
      return agentOptimizationInlineDatasetInputDeserializer(
        item as AgentOptimizationInlineDatasetInput,
      );

    case "reference":
      return agentOptimizationReferenceDatasetInputDeserializer(
        item as AgentOptimizationReferenceDatasetInput,
      );

    default:
      return agentOptimizationDatasetInputDeserializer(item);
  }
}

/** Discriminator values for the dataset input union. */
export type AgentOptimizationDatasetInputType = "inline" | "reference";

/** Inline dataset — items supplied directly in the request body. */
export interface AgentOptimizationInlineDatasetInput extends AgentOptimizationDatasetInput {
  /** Dataset input type discriminator. */
  type: "inline";
  /** Dataset items. */
  items: AgentOptimizationDatasetItem[];
}

export function agentOptimizationInlineDatasetInputSerializer(
  item: AgentOptimizationInlineDatasetInput,
): any {
  return { type: item["type"], items: agentOptimizationDatasetItemArraySerializer(item["items"]) };
}

export function agentOptimizationInlineDatasetInputDeserializer(
  item: any,
): AgentOptimizationInlineDatasetInput {
  return {
    type: item["type"],
    items: agentOptimizationDatasetItemArrayDeserializer(item["items"]),
  };
}

export function agentOptimizationDatasetItemArraySerializer(
  result: Array<AgentOptimizationDatasetItem>,
): any[] {
  return result.map((item) => {
    return agentOptimizationDatasetItemSerializer(item);
  });
}

export function agentOptimizationDatasetItemArrayDeserializer(
  result: Array<AgentOptimizationDatasetItem>,
): any[] {
  return result.map((item) => {
    return agentOptimizationDatasetItemDeserializer(item);
  });
}

/** A single item in an inline dataset. */
export interface AgentOptimizationDatasetItem {
  /** The user query / prompt. */
  query?: string;
  /** Expected ground truth answer. */
  ground_truth?: string;
  /** Desired number of conversation turns for simulation mode (1-20). */
  desired_num_turns?: number;
  /** Per-item evaluation criteria. */
  criteria?: AgentOptimizationDatasetCriterion[];
}

export function agentOptimizationDatasetItemSerializer(item: AgentOptimizationDatasetItem): any {
  return {
    query: item["query"],
    ground_truth: item["ground_truth"],
    desired_num_turns: item["desired_num_turns"],
    criteria: !item["criteria"]
      ? item["criteria"]
      : agentOptimizationDatasetCriterionArraySerializer(item["criteria"]),
  };
}

export function agentOptimizationDatasetItemDeserializer(item: any): AgentOptimizationDatasetItem {
  return {
    query: item["query"],
    ground_truth: item["ground_truth"],
    desired_num_turns: item["desired_num_turns"],
    criteria: !item["criteria"]
      ? item["criteria"]
      : agentOptimizationDatasetCriterionArrayDeserializer(item["criteria"]),
  };
}

export function agentOptimizationDatasetCriterionArraySerializer(
  result: Array<AgentOptimizationDatasetCriterion>,
): any[] {
  return result.map((item) => {
    return agentOptimizationDatasetCriterionSerializer(item);
  });
}

export function agentOptimizationDatasetCriterionArrayDeserializer(
  result: Array<AgentOptimizationDatasetCriterion>,
): any[] {
  return result.map((item) => {
    return agentOptimizationDatasetCriterionDeserializer(item);
  });
}

/** Evaluation criterion: a name + instruction pair used for per-item scoring. */
export interface AgentOptimizationDatasetCriterion {
  /** Criterion name. */
  name: string;
  /** Criterion instruction / description. */
  instruction: string;
}

export function agentOptimizationDatasetCriterionSerializer(
  item: AgentOptimizationDatasetCriterion,
): any {
  return { name: item["name"], instruction: item["instruction"] };
}

export function agentOptimizationDatasetCriterionDeserializer(
  item: any,
): AgentOptimizationDatasetCriterion {
  return {
    name: item["name"],
    instruction: item["instruction"],
  };
}

/** Reference to a registered Foundry dataset. */
export interface AgentOptimizationReferenceDatasetInput extends AgentOptimizationDatasetInput {
  /** Dataset input type discriminator. */
  type: "reference";
  /** Registered dataset name. */
  name: string;
  /** Dataset version. If not specified, the latest version is used. */
  version?: string;
}

export function agentOptimizationReferenceDatasetInputSerializer(
  item: AgentOptimizationReferenceDatasetInput,
): any {
  return { type: item["type"], name: item["name"], version: item["version"] };
}

export function agentOptimizationReferenceDatasetInputDeserializer(
  item: any,
): AgentOptimizationReferenceDatasetInput {
  return {
    type: item["type"],
    name: item["name"],
    version: item["version"],
  };
}

export function agentOptimizationEvaluatorRefArraySerializer(
  result: Array<AgentOptimizationEvaluatorRef>,
): any[] {
  return result.map((item) => {
    return agentOptimizationEvaluatorRefSerializer(item);
  });
}

export function agentOptimizationEvaluatorRefArrayDeserializer(
  result: Array<AgentOptimizationEvaluatorRef>,
): any[] {
  return result.map((item) => {
    return agentOptimizationEvaluatorRefDeserializer(item);
  });
}

/** Reference to a named evaluator, optionally pinned to a version. */
export interface AgentOptimizationEvaluatorRef {
  /** Evaluator name. */
  name: string;
  /** Evaluator version. If not specified, the latest version is used. */
  version?: string;
}

export function agentOptimizationEvaluatorRefSerializer(item: AgentOptimizationEvaluatorRef): any {
  return { name: item["name"], version: item["version"] };
}

export function agentOptimizationEvaluatorRefDeserializer(
  item: any,
): AgentOptimizationEvaluatorRef {
  return {
    name: item["name"],
    version: item["version"],
  };
}

/** Tuning knobs and run-mode for an optimization job. */
export interface AgentOptimizationOptions {
  /** Maximum number of optimization candidates to generate. Must be >= 1. Default: 5. */
  max_candidates?: number;
  /** Per-target-attribute configuration overrides. Contains skills, tools, system_prompt for the agent, plus model space for model optimization. */
  optimization_config?: Record<string, any>;
  /** Model deployment used for evaluation. Defaults to server config (typically 'gpt-4o'). */
  eval_model?: string;
  /** Model deployment for optimization reasoning (must be gpt-5 family). Falls back to the default eval model when not set. */
  optimization_model?: string;
  /** Evaluation granularity. Null/omitted means per-item single-turn. Set to 'conversation' for per-conversation multi-turn simulation scoring. */
  evaluation_level?: EvaluationLevel;
  /** Maximum number of consecutive reflective minibatch rejections before stopping early. A 'stall' occurs when the optimizer proposes a prompt change, evaluates it on a small subset, and the score does not improve — so no full validation-set evaluation is triggered. The counter resets whenever a minibatch passes and its full-validation score beats the current best. Only a sustained plateau of `max_stalls` consecutive minibatch failures triggers the stop. The service defaults to 5 if a value is not specified by the caller. Must be >= 1 when set. */
  max_stalls?: number;
}

export function agentOptimizationOptionsSerializer(item: AgentOptimizationOptions): any {
  return {
    max_candidates: item["max_candidates"],
    optimization_config: item["optimization_config"],
    eval_model: item["eval_model"],
    optimization_model: item["optimization_model"],
    evaluation_level: item["evaluation_level"],
    max_stalls: item["max_stalls"],
  };
}

export function agentOptimizationOptionsDeserializer(item: any): AgentOptimizationOptions {
  return {
    max_candidates: item["max_candidates"],
    optimization_config: !item["optimization_config"]
      ? item["optimization_config"]
      : Object.fromEntries(
          Object.entries(item["optimization_config"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    eval_model: item["eval_model"],
    optimization_model: item["optimization_model"],
    evaluation_level: item["evaluation_level"],
    max_stalls: item["max_stalls"],
  };
}

/** Terminal-state result body. Populated when status is succeeded or failed. */
export interface AgentOptimizationJobResult {
  /** Candidate ID of the original (un-optimized) baseline evaluation. */
  baseline?: string;
  /** Candidate ID of the highest-scoring candidate found during optimization. */
  best?: string;
  /** All evaluated candidates including baseline. */
  candidates?: AgentOptimizationCandidate[];
}

export function agentOptimizationJobResultDeserializer(item: any): AgentOptimizationJobResult {
  return {
    baseline: item["baseline"],
    best: item["best"],
    candidates: !item["candidates"]
      ? item["candidates"]
      : agentOptimizationCandidateArrayDeserializer(item["candidates"]),
  };
}

export function agentOptimizationCandidateArrayDeserializer(
  result: Array<AgentOptimizationCandidate>,
): any[] {
  return result.map((item) => {
    return agentOptimizationCandidateDeserializer(item);
  });
}

/** Aggregated evaluation result for a single candidate agent configuration across all tasks. */
export interface AgentOptimizationCandidate {
  /** Server-assigned candidate identifier. Use with GET /candidates/{id} sub-endpoints. */
  candidate_id?: string;
  /** Display name of the candidate (e.g., 'baseline', 'instruction-v2'). */
  name: string;
  /** What was mutated from the baseline (e.g., {system_prompt: 'new prompt'}). */
  mutations?: Record<string, any>;
  /** Average composite score across all tasks. */
  avg_score: number;
  /** Average token usage across all tasks. */
  avg_tokens: number;
  /** Foundry evaluation identifier used to score this candidate. */
  eval_id?: string;
  /** Foundry evaluation run identifier for this candidate's scoring run. */
  eval_run_id?: string;
  /** Promotion metadata. Null if the candidate has not been promoted. */
  promotion?: PromotionInfo;
}

export function agentOptimizationCandidateDeserializer(item: any): AgentOptimizationCandidate {
  return {
    candidate_id: item["candidate_id"],
    name: item["name"],
    mutations: !item["mutations"]
      ? item["mutations"]
      : Object.fromEntries(
          Object.entries(item["mutations"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    avg_score: item["avg_score"],
    avg_tokens: item["avg_tokens"],
    eval_id: item["eval_id"],
    eval_run_id: item["eval_run_id"],
    promotion: !item["promotion"]
      ? item["promotion"]
      : promotionInfoDeserializer(item["promotion"]),
  };
}

/** Promotion metadata recorded when a candidate is deployed to a Foundry agent. */
export interface PromotionInfo {
  /** Timestamp when promotion occurred, represented in Unix time. */
  promoted_at: Date;
  /** Name of the Foundry agent this candidate was promoted to. */
  agent_name: string;
  /** Version of the Foundry agent this candidate was promoted to. */
  agent_version: string;
}

export function promotionInfoDeserializer(item: any): PromotionInfo {
  return {
    promoted_at: new Date(item["promoted_at"] * 1000),
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
  };
}

/** In-flight progress; only populated while status is queued or in_progress. */
export interface AgentOptimizationJobProgress {
  /** Number of candidates whose evaluation has completed so far. */
  candidates_completed: number;
  /** Best score observed so far across all candidates. */
  best_score: number;
  /** Wall-clock time elapsed in seconds since the job began executing. */
  elapsed_seconds: number;
}

export function agentOptimizationJobProgressDeserializer(item: any): AgentOptimizationJobProgress {
  return {
    candidates_completed: item["candidates_completed"],
    best_score: item["best_score"],
    elapsed_seconds: item["elapsed_seconds"],
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultAgentOptimizationJobListItem {
  /** The requested list of items. */
  data: AgentOptimizationJobListItem[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultAgentOptimizationJobListItemDeserializer(
  item: any,
): _AgentsPagedResultAgentOptimizationJobListItem {
  return {
    data: agentOptimizationJobListItemArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function agentOptimizationJobListItemArrayDeserializer(
  result: Array<AgentOptimizationJobListItem>,
): any[] {
  return result.map((item) => {
    return agentOptimizationJobListItemDeserializer(item);
  });
}

/** Slim job representation returned by the LIST endpoint. */
export interface AgentOptimizationJobListItem {
  /** Server-assigned unique identifier. */
  readonly id: string;
  /** Current lifecycle status. */
  readonly status: JobStatus;
  /** Error details — populated only on failure. */
  readonly error?: ErrorModel;
  /** The timestamp when the job was created, represented in Unix time. */
  readonly created_at: Date;
  /** The timestamp when the job was last updated, represented in Unix time. */
  readonly updated_at: Date;
  /** Progress snapshot. May be present in terminal states reflecting last-known progress. */
  readonly progress?: AgentOptimizationJobProgress;
  /** The agent targeted by this optimization job. */
  readonly agent?: OptimizedAgentIdentifier;
}

/** @deprecated Use `AgentOptimizationJob` instead. */
export type OptimizationJob = AgentOptimizationJob;
/** @deprecated Use `AgentOptimizationJobInputs` instead. */
export type OptimizationJobInputs = AgentOptimizationJobInputs;
/** @deprecated Use `OptimizedAgentIdentifier` instead. */
export type OptimizationAgentIdentifier = OptimizedAgentIdentifier;
/** @deprecated Use `AgentOptimizationDatasetInput` instead. */
export type OptimizationDatasetInput = AgentOptimizationDatasetInput;
/** @deprecated Use `AgentOptimizationDatasetInputUnion` instead. */
export type OptimizationDatasetInputUnion = AgentOptimizationDatasetInputUnion;
/** @deprecated Use `AgentOptimizationDatasetInputType` instead. */
export type OptimizationDatasetInputType = AgentOptimizationDatasetInputType;
/** @deprecated Use `AgentOptimizationInlineDatasetInput` instead. */
export type OptimizationInlineDatasetInput = AgentOptimizationInlineDatasetInput;
/** @deprecated Use `AgentOptimizationDatasetItem` instead. */
export type OptimizationDatasetItem = AgentOptimizationDatasetItem;
/** @deprecated Use `AgentOptimizationDatasetCriterion` instead. */
export type OptimizationDatasetCriterion = AgentOptimizationDatasetCriterion;
/** @deprecated Use `AgentOptimizationReferenceDatasetInput` instead. */
export type OptimizationReferenceDatasetInput = AgentOptimizationReferenceDatasetInput;
/** @deprecated Use `AgentOptimizationEvaluatorRef` instead. */
export type OptimizationEvaluatorRef = AgentOptimizationEvaluatorRef;
/** @deprecated Use `AgentOptimizationOptions` instead. */
export type OptimizationOptions = AgentOptimizationOptions;
/** @deprecated Use `AgentOptimizationJobResult` instead. */
export type OptimizationJobResult = AgentOptimizationJobResult;
/** @deprecated Use `AgentOptimizationCandidate` instead. */
export type OptimizationCandidate = AgentOptimizationCandidate;
/** @deprecated Use `AgentOptimizationJobProgress` instead. */
export type OptimizationJobProgress = AgentOptimizationJobProgress;
/** @deprecated Use `AgentOptimizationJobListItem` instead. */
export type OptimizationJobListItem = AgentOptimizationJobListItem;

export function agentOptimizationJobListItemDeserializer(item: any): AgentOptimizationJobListItem {
  return {
    id: item["id"],
    status: item["status"],
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
    created_at: new Date(item["created_at"] * 1000),
    updated_at: new Date(item["updated_at"] * 1000),
    progress: !item["progress"]
      ? item["progress"]
      : agentOptimizationJobProgressDeserializer(item["progress"]),
    agent: !item["agent"] ? item["agent"] : optimizedAgentIdentifierDeserializer(item["agent"]),
  };
}

/** model interface UpdateToolboxRequest */
export interface UpdateToolboxRequest {
  /** The name of the toolbox to update. */
  name: string;
  /** The version identifier that the toolbox should point to. When set, the toolbox's default version will resolve to this version instead of the latest. */
  default_version: string;
}

export function updateToolboxRequestSerializer(item: UpdateToolboxRequest): any {
  return { default_version: item["default_version"] };
}

/** Alias for _ListVersionsRequestType */
export type _ListVersionsRequestType = EvaluatorType | "all";

export function _listVersionsRequestTypeSerializer(item: _ListVersionsRequestType): any {
  return item;
}

/** Type of AgentType */
export type AgentType =
  "agent" | "agent.version" | "agent.deleted" | "agent.version.deleted" | "agent.container";
/** Feature opt-in keys for agent definition operations supporting hosted or workflow agents. */
export type AgentDefinitionOptInKeys =
  | "WorkflowAgents=V1Preview"
  | "ExternalAgents=V1Preview"
  | "DraftAgents=V1Preview"
  | "VoiceAgents=V1Preview"
  | "DigitalWorker=V1Preview";

/** Type of PageOrder */
export type PageOrder = "asc" | "desc";

/** Type of FoundryFeaturesOptInKeys */
export type FoundryFeaturesOptInKeys =
  | "Evaluations=V1Preview"
  | "Schedules=V1Preview"
  | "RedTeams=V1Preview"
  | "Insights=V1Preview"
  | "MemoryStores=V1Preview"
  | "Routines=V1Preview"
  | "Routines=V2Preview"
  | "Skills=V1Preview"
  | "DataGenerationJobs=V1Preview"
  | "Models=V1Preview"
  | "AgentsOptimization=V2Preview"
  | "ModelRouterControls=V1Preview";

/** The type of pending upload. */
export type PendingUploadType = "None" | "BlobReference" | "TemporaryBlobReference";
/** Type of MemoryStoreType */
export type MemoryStoreType =
  | "memory_store"
  | "memory_store.deleted"
  | "memory_store.scope.deleted"
  | "memory_store.item.deleted";

/** Microsoft Foundry API versions */
export enum KnownApiVersions {
  /** Microsoft Foundry API version v1. */
  v1 = "v1",
}

export type AgentsDownloadSessionFileResponse = {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeReadableStream;
};

export type AgentsDownloadAgentCodeResponse = {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeReadableStream;
};

export type DownloadVersionResponse = {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeReadableStream;
};

export type BetaSkillsDownloadResponse = {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeReadableStream;
};

/** Type of CallableToolAllowedCaller */
export type CallableToolAllowedCaller = "direct" | "programmatic";

/** model interface ProgrammaticToolCallingParam */
export interface ProgrammaticToolCallingParam extends Tool {
  /** The type of the tool. Always `programmatic_tool_calling`. */
  type: "programmatic_tool_calling";
}

/** model interface SpecificProgrammaticToolCallingParam */
export interface SpecificProgrammaticToolCallingParam extends ToolChoiceParam {
  /** The tool to call. Always `programmatic_tool_calling`. */
  type: "programmatic_tool_calling";
}

/** Alias for ReasoningModeEnum */
export type ReasoningModeEnum = string | "standard" | "pro";

export function programmaticToolCallingParamDeserializer(item: any): ProgrammaticToolCallingParam {
  return {
    type: item["type"],
  };
}

export function programmaticToolCallingParamSerializer(item: ProgrammaticToolCallingParam): any {
  return { type: item["type"] };
}

export function reasoningModeEnumDeserializer(item: any): ReasoningModeEnum {
  return item;
}

export function reasoningModeEnumSerializer(item: ReasoningModeEnum): any {
  return item;
}

export function specificProgrammaticToolCallingParamDeserializer(
  item: any,
): SpecificProgrammaticToolCallingParam {
  return {
    type: item["type"],
  };
}

export function specificProgrammaticToolCallingParamSerializer(
  item: SpecificProgrammaticToolCallingParam,
): any {
  return { type: item["type"] };
}

/** Session defaults applied to sessions created for a hosted agent version. */
export interface SessionConfiguration {
  /**
   * The idle duration, in seconds, before a session's sandbox is suspended. Optional — when
   * unset, the server default of 900 seconds is used. Must be between 120 and 3600 seconds
   * (inclusive).
   */
  idle_timeout_seconds?: number;
}

export function sessionConfigurationSerializer(item: SessionConfiguration): any {
  return { idle_timeout_seconds: item["idle_timeout_seconds"] };
}

export function sessionConfigurationDeserializer(item: any): SessionConfiguration {
  return {
    idle_timeout_seconds: item["idle_timeout_seconds"],
  };
}

/** An agent implementing the A2A protocol. */
export interface A2ATool extends Tool {
  /** The type of the tool. Always `"a2a"`. */
  type: "a2a";
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
  /**
   * When `true`, Foundry sends its credentials when fetching the remote
   * agent's Agent Card. The service defaults to `false` if a value is not
   * specified by the caller (anonymous fetch).
   */
  send_credentials_for_agent_card?: boolean;
  /** The A2A protocol version supported by the agent. */
  a2a_version: A2AProtocolVersion;
}

export function a2AToolSerializer(item: A2ATool): any {
  return {
    type: item["type"],
    base_url: item["base_url"],
    agent_card_path: item["agent_card_path"],
    project_connection_id: item["project_connection_id"],
    send_credentials_for_agent_card: item["send_credentials_for_agent_card"],
    a2a_version: item["a2a_version"],
  };
}

export function a2AToolDeserializer(item: any): A2ATool {
  return {
    type: item["type"],
    base_url: item["base_url"],
    agent_card_path: item["agent_card_path"],
    project_connection_id: item["project_connection_id"],
    send_credentials_for_agent_card: item["send_credentials_for_agent_card"],
    a2a_version: item["a2a_version"],
  };
}

/** Supported A2A protocol versions. */
export type A2AProtocolVersion = "1.0";

/** A WebIQ server-side tool. */
export interface WebIQPreviewTool extends Tool {
  /** The object type, which is always 'web_iq_preview'. */
  type: "web_iq_preview";
  /** The ID of the WebIQ project connection. */
  project_connection_id: string;
  /** The label of the WebIQ MCP server to connect to. When omitted, the service defaults to connection name extracted from project_connection_id. */
  server_label?: string;
  /** Whether the agent requires approval before executing actions. When omitted, the service defaults to "always". */
  require_approval?: MCPToolRequireApproval | string;
}

export function webIQPreviewToolSerializer(item: WebIQPreviewTool): any {
  return {
    type: item["type"],
    project_connection_id: item["project_connection_id"],
    server_label: item["server_label"],
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _webIQPreviewToolRequireApprovalSerializer(item["require_approval"]),
  };
}

export function webIQPreviewToolDeserializer(item: any): WebIQPreviewTool {
  return {
    type: item["type"],
    project_connection_id: item["project_connection_id"],
    server_label: item["server_label"],
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _webIQPreviewToolRequireApprovalDeserializer(item["require_approval"]),
  };
}

/** Alias for _WebIQPreviewToolRequireApproval */
export type _WebIQPreviewToolRequireApproval = MCPToolRequireApproval | string;

export function _webIQPreviewToolRequireApprovalSerializer(
  item: _WebIQPreviewToolRequireApproval,
): any {
  return item;
}

export function _webIQPreviewToolRequireApprovalDeserializer(
  item: any,
): _WebIQPreviewToolRequireApproval {
  return item;
}

/**
 * The voice agent definition. Its configuration (model, instructions, audio, tools, and optional avatar) drives a
 * managed speech-to-speech experience. Establish realtime voice sessions through
 * `GET /agents/{agent_name}/endpoint/protocols/voice`. Every create or update produces a new immutable version.
 */
export interface VoiceAgentDefinition extends AgentDefinition {
  /** The kind discriminator for a voice agent definition. Always `voice`. */
  kind: "voice";
  /** How the model backing this agent is served. Together with `model`, this selects the model up front. `managed` uses a service-managed model; `self_deployed` uses the customer's own Foundry deployment. This is independent of the architecture (realtime or cascaded), which the service derives from the selected model. */
  model_type: VoiceModelType;
  /** The model to use for this agent, paired with `model_type`: the service-managed model name when `model_type` is `managed`, or the customer's Foundry deployment name when `model_type` is `self_deployed`. The model must support realtime or cascaded voice. The service derives the architecture from the selected model. */
  model: string;
  /** A system (or developer) message inserted into the model's context. Supports template substitution via `structured_inputs`, rendered per session before the live session starts. */
  instructions?: string;
  /** Optional session-start greeting. Template mode speaks exact rendered text; LLM-generated mode asks the session model to author the opening response and may use configured tools. */
  greeting?: VoiceAgentGreetingConfigUnion;
  /**
   * The audio configuration, including input and output formats, voice, turn detection, noise reduction, and
   * transcription. These values are session defaults; a client may override supported fields when connecting.
   */
  audio?: VoiceAgentAudioConfig;
  /**
   * The output modalities the agent produces. Defaults to `["audio"]`. `animation` and `avatar` are available
   * when an avatar is configured.
   */
  output_modalities?: VoiceOutputModality[];
  /** The maximum output-token count for one response. */
  max_output_tokens?: VoiceAgentMaxOutputTokens;
  /** Additional fields to include in service outputs. */
  include?: VoiceAgentSessionIncludeOption[];
  /** Interim-response settings for latency and tool execution. */
  interim_response?: VoiceAgentInterimResponseConfigUnion;
  /** Optional avatar configuration. These values are session defaults and may be overridden when connecting. */
  avatar?: VoiceAgentAvatarConfig;
  /**
   * The tools the voice agent may use. Supported tool kinds are `function` (executed by the client), `mcp`,
   * `system` (service-managed session controls), and `toolbox`. Server-side tools such as `web_search`,
   * `azure_ai_search`, and `openapi` are provided through a toolbox rather than declared directly.
   */
  tools?: VoiceAgentToolUnion[];
  /**
   * How the model chooses tools for generated responses. `none` prevents tool calls, `auto` lets the model decide,
   * `required` requires at least one tool call, and a specific function or MCP tool can be selected with an object.
   * Defaults to `auto`.
   */
  tool_choice?: VoiceAgentToolChoice;
  /** Whether the model may call multiple tools in parallel. */
  parallel_tool_calls?: boolean;
  /** Set of structured inputs that participate in prompt template substitution, rendered per session before the live session starts. */
  structured_inputs?: Record<string, StructuredInputDefinition>;
  /**
   * Whether conversations with this agent are persisted. A single, all-or-nothing persistence switch that defaults to
   * `false` (privacy-safe: off by default). When `true`, Foundry persists the full conversation — the transcript/event
   * timeline and raw audio. When `false`, nothing is persisted and no conversation is surfaced. There is no separate
   * audio-logging control; audio is persisted only as part of this switch. Latency/performance telemetry (e.g.
   * time-to-first-audio, inter-token latency, interruption) is observability-only (customer trace / App Insights) and
   * is not part of the persisted conversation content.
   */
  store?: boolean;
}

export function voiceAgentDefinitionSerializer(item: VoiceAgentDefinition): any {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"] ? item["rai_config"] : raiConfigSerializer(item["rai_config"]),
    model_type: item["model_type"],
    model: item["model"],
    instructions: item["instructions"],
    greeting: !item["greeting"]
      ? item["greeting"]
      : voiceAgentGreetingConfigUnionSerializer(item["greeting"]),
    audio: !item["audio"] ? item["audio"] : voiceAgentAudioConfigSerializer(item["audio"]),
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : voiceAgentMaxOutputTokensSerializer(item["max_output_tokens"]),
    include: !item["include"]
      ? item["include"]
      : item["include"].map((p: any) => {
          return p;
        }),
    interim_response: !item["interim_response"]
      ? item["interim_response"]
      : voiceAgentInterimResponseConfigUnionSerializer(item["interim_response"]),
    avatar: !item["avatar"] ? item["avatar"] : voiceAgentAvatarConfigSerializer(item["avatar"]),
    tools: !item["tools"] ? item["tools"] : voiceAgentToolUnionArraySerializer(item["tools"]),
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : voiceAgentToolChoiceSerializer(item["tool_choice"]),
    parallel_tool_calls: item["parallel_tool_calls"],
    structured_inputs: !item["structured_inputs"]
      ? item["structured_inputs"]
      : structuredInputDefinitionRecordSerializer(item["structured_inputs"]),
    store: item["store"],
  };
}

export function voiceAgentDefinitionDeserializer(item: any): VoiceAgentDefinition {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"]
      ? item["rai_config"]
      : raiConfigDeserializer(item["rai_config"]),
    model_type: item["model_type"],
    model: item["model"],
    instructions: item["instructions"],
    greeting: !item["greeting"]
      ? item["greeting"]
      : voiceAgentGreetingConfigUnionDeserializer(item["greeting"]),
    audio: !item["audio"] ? item["audio"] : voiceAgentAudioConfigDeserializer(item["audio"]),
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : voiceAgentMaxOutputTokensDeserializer(item["max_output_tokens"]),
    include: !item["include"]
      ? item["include"]
      : item["include"].map((p: any) => {
          return p;
        }),
    interim_response: !item["interim_response"]
      ? item["interim_response"]
      : voiceAgentInterimResponseConfigUnionDeserializer(item["interim_response"]),
    avatar: !item["avatar"] ? item["avatar"] : voiceAgentAvatarConfigDeserializer(item["avatar"]),
    tools: !item["tools"] ? item["tools"] : voiceAgentToolUnionArrayDeserializer(item["tools"]),
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : voiceAgentToolChoiceDeserializer(item["tool_choice"]),
    parallel_tool_calls: item["parallel_tool_calls"],
    structured_inputs: !item["structured_inputs"]
      ? item["structured_inputs"]
      : structuredInputDefinitionRecordDeserializer(item["structured_inputs"]),
    store: item["store"],
  };
}

/**
 * How the model backing a voice agent is served. This is independent of the architecture (realtime or cascaded),
 * which the service derives from the selected model.
 */
export type VoiceModelType = "managed" | "self_deployed";

/** Session-start greeting configuration for a voice agent. */
export interface VoiceAgentGreetingConfig {
  /** The greeting mode. */
  /** The discriminator possible values: template, llm_generated */
  type: string;
}

export function voiceAgentGreetingConfigSerializer(item: VoiceAgentGreetingConfig): any {
  return { type: item["type"] };
}

export function voiceAgentGreetingConfigDeserializer(item: any): VoiceAgentGreetingConfig {
  return {
    type: item["type"],
  };
}

/** Alias for VoiceAgentGreetingConfigUnion */
export type VoiceAgentGreetingConfigUnion =
  | VoiceAgentTemplateGreetingConfig
  | VoiceAgentLlmGeneratedGreetingConfig
  | VoiceAgentGreetingConfig;

export function voiceAgentGreetingConfigUnionSerializer(item: VoiceAgentGreetingConfigUnion): any {
  switch (item.type) {
    case "template":
      return voiceAgentTemplateGreetingConfigSerializer(item as VoiceAgentTemplateGreetingConfig);

    case "llm_generated":
      return voiceAgentLlmGeneratedGreetingConfigSerializer(
        item as VoiceAgentLlmGeneratedGreetingConfig,
      );

    default:
      return voiceAgentGreetingConfigSerializer(item);
  }
}

export function voiceAgentGreetingConfigUnionDeserializer(
  item: any,
): VoiceAgentGreetingConfigUnion {
  switch (item["type"]) {
    case "template":
      return voiceAgentTemplateGreetingConfigDeserializer(item as VoiceAgentTemplateGreetingConfig);

    case "llm_generated":
      return voiceAgentLlmGeneratedGreetingConfigDeserializer(
        item as VoiceAgentLlmGeneratedGreetingConfig,
      );

    default:
      return voiceAgentGreetingConfigDeserializer(item);
  }
}

/** A deterministic greeting rendered with the voice agent's structured inputs and synthesized without model-authored generation. */
export interface VoiceAgentTemplateGreetingConfig extends VoiceAgentGreetingConfig {
  type: "template";
  /** The Handlebars text template spoken at session start. */
  text: string;
}

export function voiceAgentTemplateGreetingConfigSerializer(
  item: VoiceAgentTemplateGreetingConfig,
): any {
  return { type: item["type"], text: item["text"] };
}

export function voiceAgentTemplateGreetingConfigDeserializer(
  item: any,
): VoiceAgentTemplateGreetingConfig {
  return {
    type: item["type"],
    text: item["text"],
  };
}

/** A greeting authored by the session model from a scoped opening-turn prompt. */
export interface VoiceAgentLlmGeneratedGreetingConfig extends VoiceAgentGreetingConfig {
  type: "llm_generated";
  /** The Handlebars prompt that guides the opening turn. */
  prompt: string;
  /** The tool-selection policy for the opening response. Defaults to `none`. */
  tool_choice?: VoiceAgentToolChoice;
}

export function voiceAgentLlmGeneratedGreetingConfigSerializer(
  item: VoiceAgentLlmGeneratedGreetingConfig,
): any {
  return {
    type: item["type"],
    prompt: item["prompt"],
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : voiceAgentToolChoiceSerializer(item["tool_choice"]),
  };
}

export function voiceAgentLlmGeneratedGreetingConfigDeserializer(
  item: any,
): VoiceAgentLlmGeneratedGreetingConfig {
  return {
    type: item["type"],
    prompt: item["prompt"],
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : voiceAgentToolChoiceDeserializer(item["tool_choice"]),
  };
}

/** Tool-selection behavior for a voice agent. */
export type VoiceAgentToolChoice =
  "none" | "auto" | "required" | ToolChoiceFunction | ToolChoiceMCP;

export function voiceAgentToolChoiceSerializer(item: VoiceAgentToolChoice): any {
  return item;
}

export function voiceAgentToolChoiceDeserializer(item: any): VoiceAgentToolChoice {
  return item;
}

/** The audio configuration for a voice agent. These values are session defaults and may be overridden when connecting. */
export interface VoiceAgentAudioConfig {
  /** Input (microphone) audio configuration. */
  input?: VoiceAgentAudioInputConfig;
  /** Output (agent speech) audio configuration. */
  output?: VoiceAgentAudioOutputConfig;
}

export function voiceAgentAudioConfigSerializer(item: VoiceAgentAudioConfig): any {
  return {
    input: !item["input"] ? item["input"] : voiceAgentAudioInputConfigSerializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : voiceAgentAudioOutputConfigSerializer(item["output"]),
  };
}

export function voiceAgentAudioConfigDeserializer(item: any): VoiceAgentAudioConfig {
  return {
    input: !item["input"] ? item["input"] : voiceAgentAudioInputConfigDeserializer(item["input"]),
    output: !item["output"]
      ? item["output"]
      : voiceAgentAudioOutputConfigDeserializer(item["output"]),
  };
}

/** Input audio configuration for a voice agent. */
export interface VoiceAgentAudioInputConfig {
  /** The input audio format. */
  format?: RealtimeAudioFormatsUnion;
  /** Input noise reduction. Set to null to disable. */
  noise_reduction?: VoiceAgentNoiseReduction;
  /** Turn (end-of-speech) detection. Server-side turn detection is enabled by default; set to null to disable it, in which case the client must trigger responses manually. */
  turn_detection?: VoiceAgentTurnDetectionConfigUnion;
  /** Optional server-side echo cancellation settings. */
  echo_cancellation?: VoiceAgentEchoCancellation;
  /** Asynchronous input-audio transcription. Set to null to disable transcription. */
  transcription?: VoiceAgentInputTranscription;
}

export function voiceAgentAudioInputConfigSerializer(item: VoiceAgentAudioInputConfig): any {
  return {
    format: !item["format"] ? item["format"] : realtimeAudioFormatsUnionSerializer(item["format"]),
    noise_reduction: !item["noise_reduction"]
      ? item["noise_reduction"]
      : voiceAgentNoiseReductionSerializer(item["noise_reduction"]),
    turn_detection: !item["turn_detection"]
      ? item["turn_detection"]
      : voiceAgentTurnDetectionConfigUnionSerializer(item["turn_detection"]),
    echo_cancellation: !item["echo_cancellation"]
      ? item["echo_cancellation"]
      : voiceAgentEchoCancellationSerializer(item["echo_cancellation"]),
    transcription: !item["transcription"]
      ? item["transcription"]
      : voiceAgentInputTranscriptionSerializer(item["transcription"]),
  };
}

export function voiceAgentAudioInputConfigDeserializer(item: any): VoiceAgentAudioInputConfig {
  return {
    format: !item["format"]
      ? item["format"]
      : realtimeAudioFormatsUnionDeserializer(item["format"]),
    noise_reduction: !item["noise_reduction"]
      ? item["noise_reduction"]
      : voiceAgentNoiseReductionDeserializer(item["noise_reduction"]),
    turn_detection: !item["turn_detection"]
      ? item["turn_detection"]
      : voiceAgentTurnDetectionConfigUnionDeserializer(item["turn_detection"]),
    echo_cancellation: !item["echo_cancellation"]
      ? item["echo_cancellation"]
      : voiceAgentEchoCancellationDeserializer(item["echo_cancellation"]),
    transcription: !item["transcription"]
      ? item["transcription"]
      : voiceAgentInputTranscriptionDeserializer(item["transcription"]),
  };
}

/** model interface RealtimeAudioFormats */
export interface RealtimeAudioFormats {
  type: RealtimeAudioFormatsType;
}

export function realtimeAudioFormatsSerializer(item: RealtimeAudioFormats): any {
  return { type: item["type"] };
}

export function realtimeAudioFormatsDeserializer(item: any): RealtimeAudioFormats {
  return {
    type: item["type"],
  };
}

/** Alias for RealtimeAudioFormatsUnion */
export type RealtimeAudioFormatsUnion =
  | RealtimeAudioFormatsAudioPcm
  | RealtimeAudioFormatsAudioPcmu
  | RealtimeAudioFormatsAudioPcma
  | RealtimeAudioFormats;

export function realtimeAudioFormatsUnionSerializer(item: RealtimeAudioFormatsUnion): any {
  switch (item.type) {
    case "audio/pcm":
      return realtimeAudioFormatsAudioPcmSerializer(item as RealtimeAudioFormatsAudioPcm);

    case "audio/pcmu":
      return realtimeAudioFormatsAudioPcmuSerializer(item as RealtimeAudioFormatsAudioPcmu);

    case "audio/pcma":
      return realtimeAudioFormatsAudioPcmaSerializer(item as RealtimeAudioFormatsAudioPcma);

    default:
      return realtimeAudioFormatsSerializer(item);
  }
}

export function realtimeAudioFormatsUnionDeserializer(item: any): RealtimeAudioFormatsUnion {
  switch (item["type"]) {
    case "audio/pcm":
      return realtimeAudioFormatsAudioPcmDeserializer(item as RealtimeAudioFormatsAudioPcm);

    case "audio/pcmu":
      return realtimeAudioFormatsAudioPcmuDeserializer(item as RealtimeAudioFormatsAudioPcmu);

    case "audio/pcma":
      return realtimeAudioFormatsAudioPcmaDeserializer(item as RealtimeAudioFormatsAudioPcma);

    default:
      return realtimeAudioFormatsDeserializer(item);
  }
}

/** Type of RealtimeAudioFormatsType */
export type RealtimeAudioFormatsType = "audio/pcm" | "audio/pcmu" | "audio/pcma";

/** model interface RealtimeAudioFormatsAudioPcm */
export interface RealtimeAudioFormatsAudioPcm extends RealtimeAudioFormats {
  type: "audio/pcm";
  rate?: 24000;
}

export function realtimeAudioFormatsAudioPcmSerializer(item: RealtimeAudioFormatsAudioPcm): any {
  return { type: item["type"], rate: item["rate"] };
}

export function realtimeAudioFormatsAudioPcmDeserializer(item: any): RealtimeAudioFormatsAudioPcm {
  return {
    type: item["type"],
    rate: item["rate"],
  };
}

/** model interface RealtimeAudioFormatsAudioPcmu */
export interface RealtimeAudioFormatsAudioPcmu extends RealtimeAudioFormats {
  type: "audio/pcmu";
}

export function realtimeAudioFormatsAudioPcmuSerializer(item: RealtimeAudioFormatsAudioPcmu): any {
  return { type: item["type"] };
}

export function realtimeAudioFormatsAudioPcmuDeserializer(
  item: any,
): RealtimeAudioFormatsAudioPcmu {
  return {
    type: item["type"],
  };
}

/** model interface RealtimeAudioFormatsAudioPcma */
export interface RealtimeAudioFormatsAudioPcma extends RealtimeAudioFormats {
  type: "audio/pcma";
}

export function realtimeAudioFormatsAudioPcmaSerializer(item: RealtimeAudioFormatsAudioPcma): any {
  return { type: item["type"] };
}

export function realtimeAudioFormatsAudioPcmaDeserializer(
  item: any,
): RealtimeAudioFormatsAudioPcma {
  return {
    type: item["type"],
  };
}

/** Input audio noise reduction configuration. */
export interface VoiceAgentNoiseReduction {
  /** The noise reduction mode. */
  type: VoiceAgentNoiseReductionType;
}

export function voiceAgentNoiseReductionSerializer(item: VoiceAgentNoiseReduction): any {
  return { type: item["type"] };
}

export function voiceAgentNoiseReductionDeserializer(item: any): VoiceAgentNoiseReduction {
  return {
    type: item["type"],
  };
}

/** The input audio noise reduction mode. */
export type VoiceAgentNoiseReductionType =
  "near_field" | "far_field" | "azure_deep_noise_suppression";

/** Turn-detection configuration for a voice agent. */
export interface VoiceAgentTurnDetectionConfig {
  /** The turn-detection strategy. */
  /** The discriminator possible values: server_vad, azure_semantic_vad, azure_semantic_vad_en, azure_semantic_vad_multilingual, semantic_vad */
  type: VoiceAgentTurnDetectionType;
  /** Whether the input audio buffer is truncated automatically when speech stops. */
  auto_truncate?: boolean;
}

export function voiceAgentTurnDetectionConfigSerializer(item: VoiceAgentTurnDetectionConfig): any {
  return { type: item["type"], auto_truncate: item["auto_truncate"] };
}

export function voiceAgentTurnDetectionConfigDeserializer(
  item: any,
): VoiceAgentTurnDetectionConfig {
  return {
    type: item["type"],
    auto_truncate: item["auto_truncate"],
  };
}

/** Alias for VoiceAgentTurnDetectionConfigUnion */
export type VoiceAgentTurnDetectionConfigUnion =
  | VoiceAgentServerVadTurnDetection
  | VoiceAgentAzureSemanticVadTurnDetection
  | VoiceAgentAzureSemanticVadEnTurnDetection
  | VoiceAgentAzureSemanticVadMultilingualTurnDetection
  | VoiceAgentSemanticVadTurnDetection
  | VoiceAgentTurnDetectionConfig;

export function voiceAgentTurnDetectionConfigUnionSerializer(
  item: VoiceAgentTurnDetectionConfigUnion,
): any {
  switch (item.type) {
    case "server_vad":
      return voiceAgentServerVadTurnDetectionSerializer(item as VoiceAgentServerVadTurnDetection);

    case "azure_semantic_vad":
      return voiceAgentAzureSemanticVadTurnDetectionSerializer(
        item as VoiceAgentAzureSemanticVadTurnDetection,
      );

    case "azure_semantic_vad_en":
      return voiceAgentAzureSemanticVadEnTurnDetectionSerializer(
        item as VoiceAgentAzureSemanticVadEnTurnDetection,
      );

    case "azure_semantic_vad_multilingual":
      return voiceAgentAzureSemanticVadMultilingualTurnDetectionSerializer(
        item as VoiceAgentAzureSemanticVadMultilingualTurnDetection,
      );

    case "semantic_vad":
      return voiceAgentSemanticVadTurnDetectionSerializer(
        item as VoiceAgentSemanticVadTurnDetection,
      );

    default:
      return voiceAgentTurnDetectionConfigSerializer(item);
  }
}

export function voiceAgentTurnDetectionConfigUnionDeserializer(
  item: any,
): VoiceAgentTurnDetectionConfigUnion {
  switch (item["type"]) {
    case "server_vad":
      return voiceAgentServerVadTurnDetectionDeserializer(item as VoiceAgentServerVadTurnDetection);

    case "azure_semantic_vad":
      return voiceAgentAzureSemanticVadTurnDetectionDeserializer(
        item as VoiceAgentAzureSemanticVadTurnDetection,
      );

    case "azure_semantic_vad_en":
      return voiceAgentAzureSemanticVadEnTurnDetectionDeserializer(
        item as VoiceAgentAzureSemanticVadEnTurnDetection,
      );

    case "azure_semantic_vad_multilingual":
      return voiceAgentAzureSemanticVadMultilingualTurnDetectionDeserializer(
        item as VoiceAgentAzureSemanticVadMultilingualTurnDetection,
      );

    case "semantic_vad":
      return voiceAgentSemanticVadTurnDetectionDeserializer(
        item as VoiceAgentSemanticVadTurnDetection,
      );

    default:
      return voiceAgentTurnDetectionConfigDeserializer(item);
  }
}

/** The turn-detection strategy. Additional values may be added over time. */
export type VoiceAgentTurnDetectionType =
  | "server_vad"
  | "semantic_vad"
  | "azure_semantic_vad"
  | "azure_semantic_vad_en"
  | "azure_semantic_vad_multilingual";

/** Server-side voice activity detection. */
export interface VoiceAgentServerVadTurnDetection extends VoiceAgentTurnDetectionConfig {
  threshold?: number;
  prefix_padding_ms?: number;
  silence_duration_ms?: number;
  create_response?: boolean;
  interrupt_response?: boolean;
  idle_timeout_ms?: number;
  type: "server_vad";
  /** Minimum speech duration required to trigger detection, in milliseconds. */
  speech_duration_ms?: number;
  /** Semantic end-of-utterance detection configuration. Set to null to disable it. */
  end_of_utterance_detection?: VoiceAgentEndOfUtteranceDetection;
}

export function voiceAgentServerVadTurnDetectionSerializer(
  item: VoiceAgentServerVadTurnDetection,
): any {
  return {
    type: item["type"],
    auto_truncate: item["auto_truncate"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefix_padding_ms"],
    silence_duration_ms: item["silence_duration_ms"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
    idle_timeout_ms: item["idle_timeout_ms"],
    speech_duration_ms: item["speech_duration_ms"],
    end_of_utterance_detection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : voiceAgentEndOfUtteranceDetectionSerializer(item["end_of_utterance_detection"]),
  };
}

export function voiceAgentServerVadTurnDetectionDeserializer(
  item: any,
): VoiceAgentServerVadTurnDetection {
  return {
    type: item["type"],
    auto_truncate: item["auto_truncate"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefix_padding_ms"],
    silence_duration_ms: item["silence_duration_ms"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
    idle_timeout_ms: item["idle_timeout_ms"],
    speech_duration_ms: item["speech_duration_ms"],
    end_of_utterance_detection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : voiceAgentEndOfUtteranceDetectionDeserializer(item["end_of_utterance_detection"]),
  };
}

/** Semantic end-of-utterance detection configuration. */
export interface VoiceAgentEndOfUtteranceDetection {
  /** The semantic detection model. */
  model: VoiceAgentEndOfUtteranceDetectionModel;
  /** The sensitivity threshold. */
  threshold_level?: VoiceAgentEndOfUtteranceThresholdLevel;
  /** The detection timeout in milliseconds. */
  timeout_ms?: number;
}

export function voiceAgentEndOfUtteranceDetectionSerializer(
  item: VoiceAgentEndOfUtteranceDetection,
): any {
  return {
    model: item["model"],
    threshold_level: item["threshold_level"],
    timeout_ms: item["timeout_ms"],
  };
}

export function voiceAgentEndOfUtteranceDetectionDeserializer(
  item: any,
): VoiceAgentEndOfUtteranceDetection {
  return {
    model: item["model"],
    threshold_level: item["threshold_level"],
    timeout_ms: item["timeout_ms"],
  };
}

/** The semantic end-of-utterance detection model. */
export type VoiceAgentEndOfUtteranceDetectionModel =
  | "semantic_detection_v1"
  | "semantic_detection_v1_en"
  | "semantic_detection_v1_multilingual"
  | "smart_end_of_turn_detection";

/** The sensitivity threshold for semantic end-of-utterance detection. */
export type VoiceAgentEndOfUtteranceThresholdLevel = "low" | "medium" | "high" | "default";

/** Azure semantic voice activity detection. */
export interface VoiceAgentAzureSemanticVadTurnDetection extends VoiceAgentTurnDetectionConfig {
  type: "azure_semantic_vad";
  /** Activation threshold for voice activity detection, from 0 to 1. */
  threshold?: number;
  /** Audio to include before detected speech, in milliseconds. */
  prefix_padding_ms?: number;
  /** Silence required to end speech detection, in milliseconds. */
  silence_duration_ms?: number;
  /** Maximum idle time before the detector ends the turn, in milliseconds. */
  idle_timeout_ms?: number;
  /** Semantic end-of-utterance detection configuration. Set to null to disable it. */
  end_of_utterance_detection?: VoiceAgentEndOfUtteranceDetection;
  /** Minimum speech duration required to trigger detection, in milliseconds. */
  speech_duration_ms?: number;
  /** Whether filler words are removed from transcription. */
  remove_filler_words?: boolean;
  /** Whether a response is created automatically when speech stops. */
  create_response?: boolean;
  /** Whether user speech may interrupt the agent's response. */
  interrupt_response?: boolean;
  /** BCP-47 language codes used for speech detection. */
  languages?: string[];
}

export function voiceAgentAzureSemanticVadTurnDetectionSerializer(
  item: VoiceAgentAzureSemanticVadTurnDetection,
): any {
  return {
    type: item["type"],
    auto_truncate: item["auto_truncate"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefix_padding_ms"],
    silence_duration_ms: item["silence_duration_ms"],
    idle_timeout_ms: item["idle_timeout_ms"],
    end_of_utterance_detection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : voiceAgentEndOfUtteranceDetectionSerializer(item["end_of_utterance_detection"]),
    speech_duration_ms: item["speech_duration_ms"],
    remove_filler_words: item["remove_filler_words"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
    languages: !item["languages"]
      ? item["languages"]
      : item["languages"].map((p: any) => {
          return p;
        }),
  };
}

export function voiceAgentAzureSemanticVadTurnDetectionDeserializer(
  item: any,
): VoiceAgentAzureSemanticVadTurnDetection {
  return {
    type: item["type"],
    auto_truncate: item["auto_truncate"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefix_padding_ms"],
    silence_duration_ms: item["silence_duration_ms"],
    idle_timeout_ms: item["idle_timeout_ms"],
    end_of_utterance_detection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : voiceAgentEndOfUtteranceDetectionDeserializer(item["end_of_utterance_detection"]),
    speech_duration_ms: item["speech_duration_ms"],
    remove_filler_words: item["remove_filler_words"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
    languages: !item["languages"]
      ? item["languages"]
      : item["languages"].map((p: any) => {
          return p;
        }),
  };
}

/** English-optimized Azure semantic voice activity detection. */
export interface VoiceAgentAzureSemanticVadEnTurnDetection extends VoiceAgentTurnDetectionConfig {
  type: "azure_semantic_vad_en";
  /** Activation threshold for voice activity detection, from 0 to 1. */
  threshold?: number;
  /** Audio to include before detected speech, in milliseconds. */
  prefix_padding_ms?: number;
  /** Silence required to end speech detection, in milliseconds. */
  silence_duration_ms?: number;
  /** Maximum idle time before the detector ends the turn, in milliseconds. */
  idle_timeout_ms?: number;
  /** Semantic end-of-utterance detection configuration. Set to null to disable it. */
  end_of_utterance_detection?: VoiceAgentEndOfUtteranceDetection;
  /** Minimum speech duration required to trigger detection, in milliseconds. */
  speech_duration_ms?: number;
  /** Whether filler words are removed from transcription. */
  remove_filler_words?: boolean;
  /** Whether a response is created automatically when speech stops. */
  create_response?: boolean;
  /** Whether user speech may interrupt the agent's response. */
  interrupt_response?: boolean;
}

export function voiceAgentAzureSemanticVadEnTurnDetectionSerializer(
  item: VoiceAgentAzureSemanticVadEnTurnDetection,
): any {
  return {
    type: item["type"],
    auto_truncate: item["auto_truncate"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefix_padding_ms"],
    silence_duration_ms: item["silence_duration_ms"],
    idle_timeout_ms: item["idle_timeout_ms"],
    end_of_utterance_detection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : voiceAgentEndOfUtteranceDetectionSerializer(item["end_of_utterance_detection"]),
    speech_duration_ms: item["speech_duration_ms"],
    remove_filler_words: item["remove_filler_words"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
  };
}

export function voiceAgentAzureSemanticVadEnTurnDetectionDeserializer(
  item: any,
): VoiceAgentAzureSemanticVadEnTurnDetection {
  return {
    type: item["type"],
    auto_truncate: item["auto_truncate"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefix_padding_ms"],
    silence_duration_ms: item["silence_duration_ms"],
    idle_timeout_ms: item["idle_timeout_ms"],
    end_of_utterance_detection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : voiceAgentEndOfUtteranceDetectionDeserializer(item["end_of_utterance_detection"]),
    speech_duration_ms: item["speech_duration_ms"],
    remove_filler_words: item["remove_filler_words"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
  };
}

/** Multilingual Azure semantic voice activity detection. */
export interface VoiceAgentAzureSemanticVadMultilingualTurnDetection extends VoiceAgentTurnDetectionConfig {
  type: "azure_semantic_vad_multilingual";
  /** Activation threshold for voice activity detection, from 0 to 1. */
  threshold?: number;
  /** Audio to include before detected speech, in milliseconds. */
  prefix_padding_ms?: number;
  /** Silence required to end speech detection, in milliseconds. */
  silence_duration_ms?: number;
  /** Maximum idle time before the detector ends the turn, in milliseconds. */
  idle_timeout_ms?: number;
  /** Semantic end-of-utterance detection configuration. Set to null to disable it. */
  end_of_utterance_detection?: VoiceAgentEndOfUtteranceDetection;
  /** Minimum speech duration required to trigger detection, in milliseconds. */
  speech_duration_ms?: number;
  /** Whether filler words are removed from transcription. */
  remove_filler_words?: boolean;
  /** Whether a response is created automatically when speech stops. */
  create_response?: boolean;
  /** Whether user speech may interrupt the agent's response. */
  interrupt_response?: boolean;
  /** BCP-47 language codes used for speech detection. */
  languages?: string[];
}

export function voiceAgentAzureSemanticVadMultilingualTurnDetectionSerializer(
  item: VoiceAgentAzureSemanticVadMultilingualTurnDetection,
): any {
  return {
    type: item["type"],
    auto_truncate: item["auto_truncate"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefix_padding_ms"],
    silence_duration_ms: item["silence_duration_ms"],
    idle_timeout_ms: item["idle_timeout_ms"],
    end_of_utterance_detection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : voiceAgentEndOfUtteranceDetectionSerializer(item["end_of_utterance_detection"]),
    speech_duration_ms: item["speech_duration_ms"],
    remove_filler_words: item["remove_filler_words"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
    languages: !item["languages"]
      ? item["languages"]
      : item["languages"].map((p: any) => {
          return p;
        }),
  };
}

export function voiceAgentAzureSemanticVadMultilingualTurnDetectionDeserializer(
  item: any,
): VoiceAgentAzureSemanticVadMultilingualTurnDetection {
  return {
    type: item["type"],
    auto_truncate: item["auto_truncate"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefix_padding_ms"],
    silence_duration_ms: item["silence_duration_ms"],
    idle_timeout_ms: item["idle_timeout_ms"],
    end_of_utterance_detection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : voiceAgentEndOfUtteranceDetectionDeserializer(item["end_of_utterance_detection"]),
    speech_duration_ms: item["speech_duration_ms"],
    remove_filler_words: item["remove_filler_words"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
    languages: !item["languages"]
      ? item["languages"]
      : item["languages"].map((p: any) => {
          return p;
        }),
  };
}

/** OpenAI semantic VAD turn-detection settings. */
export interface VoiceAgentSemanticVadTurnDetection extends VoiceAgentTurnDetectionConfig {
  eagerness?: "low" | "medium" | "high" | "auto";
  create_response?: boolean;
  interrupt_response?: boolean;
  type: "semantic_vad";
}

export function voiceAgentSemanticVadTurnDetectionSerializer(
  item: VoiceAgentSemanticVadTurnDetection,
): any {
  return {
    type: item["type"],
    auto_truncate: item["auto_truncate"],
    eagerness: item["eagerness"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
  };
}

export function voiceAgentSemanticVadTurnDetectionDeserializer(
  item: any,
): VoiceAgentSemanticVadTurnDetection {
  return {
    type: item["type"],
    auto_truncate: item["auto_truncate"],
    eagerness: item["eagerness"],
    create_response: item["create_response"],
    interrupt_response: item["interrupt_response"],
  };
}

/** Server-side echo cancellation settings for input audio. */
export interface VoiceAgentEchoCancellation {
  /** The echo cancellation implementation. Always `server_echo_cancellation`. */
  type: "server_echo_cancellation";
  /** Whether reference audio comes from server playback or a client-provided channel. */
  reference_source?: VoiceAgentEchoCancellationReferenceSource;
  /** The number of input channels. Use two interleaved channels when `reference_source` is `client`. */
  channels?: number;
}

export function voiceAgentEchoCancellationSerializer(item: VoiceAgentEchoCancellation): any {
  return {
    type: item["type"],
    reference_source: item["reference_source"],
    channels: item["channels"],
  };
}

export function voiceAgentEchoCancellationDeserializer(item: any): VoiceAgentEchoCancellation {
  return {
    type: item["type"],
    reference_source: item["reference_source"],
    channels: item["channels"],
  };
}

/** The source of reference audio used for echo cancellation. */
export type VoiceAgentEchoCancellationReferenceSource = "server" | "client";

/**
 * Asynchronous input-audio transcription configuration. Extends the OpenAI Realtime transcription
 * options with the Azure and MAI transcription models, custom speech models, and phrase hints.
 */
export interface VoiceAgentInputTranscription {
  /**
   * The language of the input audio. Supplying the input language in
   *   [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format
   *   will improve accuracy and latency.
   */
  language?: string;
  /**
   * An optional text to guide the model's style or continue a previous audio
   *   segment.
   *   For `whisper-1`, the [prompt is a list of keywords](/docs/guides/speech-to-text#prompting).
   *   For `gpt-4o-transcribe` models (excluding `gpt-4o-transcribe-diarize`), the prompt is a free text string, for example "expect words related to technology".
   *   Prompt is not supported with `gpt-realtime-whisper` in GA Realtime sessions.
   */
  prompt?: string;
  /**
   * Controls how long the model waits before emitting transcription text.
   *   Higher values can improve transcription accuracy at the cost of latency.
   *   Only supported with `gpt-realtime-whisper` in GA Realtime sessions.
   */
  delay?: "minimal" | "low" | "medium" | "high" | "xhigh";
  /** The transcription model identifier. Configure customer custom speech deployments in `custom_speech`. */
  model: VoiceAgentInputTranscriptionModel;
  /** Optional customer custom speech deployment configuration, keyed by locale. */
  custom_speech?: Record<string, string>;
  /** Optional phrase hints that bias recognition toward domain terms. */
  phrase_list?: string[];
}

export function voiceAgentInputTranscriptionSerializer(item: VoiceAgentInputTranscription): any {
  return {
    language: item["language"],
    prompt: item["prompt"],
    delay: item["delay"],
    model: item["model"],
    custom_speech: item["custom_speech"],
    phrase_list: !item["phrase_list"]
      ? item["phrase_list"]
      : item["phrase_list"].map((p: any) => {
          return p;
        }),
  };
}

export function voiceAgentInputTranscriptionDeserializer(item: any): VoiceAgentInputTranscription {
  return {
    language: item["language"],
    prompt: item["prompt"],
    delay: item["delay"],
    model: item["model"],
    custom_speech: !item["custom_speech"]
      ? item["custom_speech"]
      : Object.fromEntries(
          Object.entries(item["custom_speech"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    phrase_list: !item["phrase_list"]
      ? item["phrase_list"]
      : item["phrase_list"].map((p: any) => {
          return p;
        }),
  };
}

/**
 * The input-audio transcription model identifier. This is a model name, not a Foundry deployment name. Mirrors the transcription models supported by the managed
 * voice backend, covering the OpenAI Realtime transcription models plus the Azure and MAI models.
 * Additional values may be added over time.
 */
export type VoiceAgentInputTranscriptionModel =
  | "whisper-1"
  | "gpt-realtime-whisper"
  | "gpt-4o-transcribe"
  | "gpt-4o-mini-transcribe"
  | "gpt-4o-transcribe-diarize"
  | "gpt-transcribe"
  | "gpt-live-transcribe"
  | "mai-transcribe"
  | "azure-speech";

/**
 * Output audio configuration for a voice agent.
 * Provider-specific fields are selected by `voice_type`:
 * - `openai`: `voice` and `speed`.
 * - `azure-standard`: `voice`, `voice_locale`, `speed`, `voice_temperature`, `custom_lexicon_url`,
 *   `custom_text_normalization_url`, `prefer_locales`, `style`, `pitch`, and `volume`.
 * - `azure-custom`: all `azure-standard` fields except `style`, plus `custom_voice_endpoint_id`.
 * - `azure-personal`: all `azure-standard` fields except `style`, plus `personal_voice_model`.
 * - `avatar-voice-sync`: all `azure-standard` fields except `voice` and `style`, plus `personal_voice_model`; the voice name is derived from the avatar.
 * - `azure-realtime-native`: `voice` and `speed`.
 * `format` and `output_audio_timestamp_types` apply to every voice type.
 */
export interface VoiceAgentAudioOutputConfig {
  /** The output audio format. Applies to every `voice_type` and defaults to 24 kHz PCM. */
  format?: RealtimeAudioFormatsUnion;
  /** The voice name or identifier. Applies to `openai`, `azure-standard`, `azure-custom`, `azure-personal`, and `azure-realtime-native`. It does not apply to `avatar-voice-sync`, which derives the voice name from the avatar. */
  voice?: string;
  /** The voice implementation. */
  voice_type?: VoiceType;
  /** The enforced BCP-47 output locale. Applies to `azure-standard`, `azure-custom`, `azure-personal`, and `avatar-voice-sync`. */
  voice_locale?: string;
  /** The numeric output speed multiplier. Applies to all known `voice_type` values and defaults to 1. */
  speed?: number;
  /** The voice variation temperature. Applies to `azure-standard`, `azure-custom`, `azure-personal`, and `avatar-voice-sync`. */
  voice_temperature?: number;
  /** The URL of a custom pronunciation lexicon. Applies to `azure-standard`, `azure-custom`, `azure-personal`, and `avatar-voice-sync`. */
  custom_lexicon_url?: string;
  /** The URL of a custom text-normalization configuration. Applies to `azure-standard`, `azure-custom`, `azure-personal`, and `avatar-voice-sync`. */
  custom_text_normalization_url?: string;
  /** Preferred BCP-47 locales for multilingual synthesis. Applies to `azure-standard`, `azure-custom`, `azure-personal`, and `avatar-voice-sync`. */
  prefer_locales?: string[];
  /** The voice speaking style. Applies only when `voice_type` is `azure-standard`. */
  style?: string;
  /** The voice pitch adjustment. Applies to `azure-standard`, `azure-custom`, `azure-personal`, and `avatar-voice-sync`. */
  pitch?: string;
  /** The voice volume adjustment. Applies to `azure-standard`, `azure-custom`, `azure-personal`, and `avatar-voice-sync`. */
  volume?: string;
  /** The Azure custom-voice deployment endpoint identifier. Applies only when `voice_type` is `azure-custom`. */
  custom_voice_endpoint_id?: string;
  /** The Azure personal or avatar voice model. Applies only when `voice_type` is `azure-personal` or `avatar-voice-sync`. */
  personal_voice_model?: string;
  /** Timestamp kinds to include with output audio. Applies to every `voice_type`. */
  output_audio_timestamp_types?: VoiceAgentAudioTimestampType[];
}

export function voiceAgentAudioOutputConfigSerializer(item: VoiceAgentAudioOutputConfig): any {
  return {
    format: !item["format"] ? item["format"] : realtimeAudioFormatsUnionSerializer(item["format"]),
    voice: item["voice"],
    voice_type: item["voice_type"],
    voice_locale: item["voice_locale"],
    speed: item["speed"],
    voice_temperature: item["voice_temperature"],
    custom_lexicon_url: item["custom_lexicon_url"],
    custom_text_normalization_url: item["custom_text_normalization_url"],
    prefer_locales: !item["prefer_locales"]
      ? item["prefer_locales"]
      : item["prefer_locales"].map((p: any) => {
          return p;
        }),
    style: item["style"],
    pitch: item["pitch"],
    volume: item["volume"],
    custom_voice_endpoint_id: item["custom_voice_endpoint_id"],
    personal_voice_model: item["personal_voice_model"],
    output_audio_timestamp_types: !item["output_audio_timestamp_types"]
      ? item["output_audio_timestamp_types"]
      : item["output_audio_timestamp_types"].map((p: any) => {
          return p;
        }),
  };
}

export function voiceAgentAudioOutputConfigDeserializer(item: any): VoiceAgentAudioOutputConfig {
  return {
    format: !item["format"]
      ? item["format"]
      : realtimeAudioFormatsUnionDeserializer(item["format"]),
    voice: item["voice"],
    voice_type: item["voice_type"],
    voice_locale: item["voice_locale"],
    speed: item["speed"],
    voice_temperature: item["voice_temperature"],
    custom_lexicon_url: item["custom_lexicon_url"],
    custom_text_normalization_url: item["custom_text_normalization_url"],
    prefer_locales: !item["prefer_locales"]
      ? item["prefer_locales"]
      : item["prefer_locales"].map((p: any) => {
          return p;
        }),
    style: item["style"],
    pitch: item["pitch"],
    volume: item["volume"],
    custom_voice_endpoint_id: item["custom_voice_endpoint_id"],
    personal_voice_model: item["personal_voice_model"],
    output_audio_timestamp_types: !item["output_audio_timestamp_types"]
      ? item["output_audio_timestamp_types"]
      : item["output_audio_timestamp_types"].map((p: any) => {
          return p;
        }),
  };
}

/** The voice implementation. Additional values may be added over time. */
export type VoiceType =
  | "openai"
  | "azure-standard"
  | "azure-custom"
  | "azure-personal"
  | "avatar-voice-sync"
  | "azure-realtime-native";

/** An output-audio timestamp kind supported by a voice agent. */
export type VoiceAgentAudioTimestampType = "word";

/** An output modality the agent may produce. `animation` and `avatar` are used when an avatar is configured. */
export type VoiceOutputModality = "text" | "audio" | "animation" | "avatar";

/** The maximum output-token count or the literal `inf`. */
export type VoiceAgentMaxOutputTokens = number | "inf";

export function voiceAgentMaxOutputTokensSerializer(item: VoiceAgentMaxOutputTokens): any {
  return item;
}

export function voiceAgentMaxOutputTokensDeserializer(item: any): VoiceAgentMaxOutputTokens {
  return item;
}

/** Additional fields that a voice-agent session may include in service outputs. */
export type VoiceAgentSessionIncludeOption =
  | "item.input_audio_transcription.logprobs"
  | "item.input_audio_transcription.phrases"
  | "file_search_call.results";

/** Fields shared by interim-response configurations. */
export interface VoiceAgentInterimResponseConfig {
  /** The interim-response implementation. */
  /** The discriminator possible values: static_interim_response, llm_interim_response */
  type: string;
  /** Conditions that may trigger one interim response. */
  triggers?: VoiceAgentInterimResponseTrigger[];
  /** The latency threshold in milliseconds. */
  latency_threshold_ms?: number;
}

export function voiceAgentInterimResponseConfigSerializer(
  item: VoiceAgentInterimResponseConfig,
): any {
  return {
    type: item["type"],
    triggers: !item["triggers"]
      ? item["triggers"]
      : item["triggers"].map((p: any) => {
          return p;
        }),
    latency_threshold_ms: item["latency_threshold_ms"],
  };
}

export function voiceAgentInterimResponseConfigDeserializer(
  item: any,
): VoiceAgentInterimResponseConfig {
  return {
    type: item["type"],
    triggers: !item["triggers"]
      ? item["triggers"]
      : item["triggers"].map((p: any) => {
          return p;
        }),
    latency_threshold_ms: item["latency_threshold_ms"],
  };
}

/** Alias for VoiceAgentInterimResponseConfigUnion */
export type VoiceAgentInterimResponseConfigUnion =
  | VoiceAgentStaticInterimResponseConfig
  | VoiceAgentLlmInterimResponseConfig
  | VoiceAgentInterimResponseConfig;

export function voiceAgentInterimResponseConfigUnionSerializer(
  item: VoiceAgentInterimResponseConfigUnion,
): any {
  switch (item.type) {
    case "static_interim_response":
      return voiceAgentStaticInterimResponseConfigSerializer(
        item as VoiceAgentStaticInterimResponseConfig,
      );

    case "llm_interim_response":
      return voiceAgentLlmInterimResponseConfigSerializer(
        item as VoiceAgentLlmInterimResponseConfig,
      );

    default:
      return voiceAgentInterimResponseConfigSerializer(item);
  }
}

export function voiceAgentInterimResponseConfigUnionDeserializer(
  item: any,
): VoiceAgentInterimResponseConfigUnion {
  switch (item["type"]) {
    case "static_interim_response":
      return voiceAgentStaticInterimResponseConfigDeserializer(
        item as VoiceAgentStaticInterimResponseConfig,
      );

    case "llm_interim_response":
      return voiceAgentLlmInterimResponseConfigDeserializer(
        item as VoiceAgentLlmInterimResponseConfig,
      );

    default:
      return voiceAgentInterimResponseConfigDeserializer(item);
  }
}

/** A condition that may trigger an interim response. */
export type VoiceAgentInterimResponseTrigger = "latency" | "tool";

/** A static interim response selected from configured text. */
export interface VoiceAgentStaticInterimResponseConfig extends VoiceAgentInterimResponseConfig {
  type: "static_interim_response";
  /** Candidate text values for the interim response. */
  texts?: string[];
}

export function voiceAgentStaticInterimResponseConfigSerializer(
  item: VoiceAgentStaticInterimResponseConfig,
): any {
  return {
    type: item["type"],
    triggers: !item["triggers"]
      ? item["triggers"]
      : item["triggers"].map((p: any) => {
          return p;
        }),
    latency_threshold_ms: item["latency_threshold_ms"],
    texts: !item["texts"]
      ? item["texts"]
      : item["texts"].map((p: any) => {
          return p;
        }),
  };
}

export function voiceAgentStaticInterimResponseConfigDeserializer(
  item: any,
): VoiceAgentStaticInterimResponseConfig {
  return {
    type: item["type"],
    triggers: !item["triggers"]
      ? item["triggers"]
      : item["triggers"].map((p: any) => {
          return p;
        }),
    latency_threshold_ms: item["latency_threshold_ms"],
    texts: !item["texts"]
      ? item["texts"]
      : item["texts"].map((p: any) => {
          return p;
        }),
  };
}

/** An interim response generated by a language model. */
export interface VoiceAgentLlmInterimResponseConfig extends VoiceAgentInterimResponseConfig {
  type: "llm_interim_response";
  /** The model used to generate interim responses. */
  model?: string;
  /** Optional instructions for generating interim responses. */
  instructions?: string;
  /** The maximum completion-token count for an interim response. */
  max_completion_tokens?: number;
}

export function voiceAgentLlmInterimResponseConfigSerializer(
  item: VoiceAgentLlmInterimResponseConfig,
): any {
  return {
    type: item["type"],
    triggers: !item["triggers"]
      ? item["triggers"]
      : item["triggers"].map((p: any) => {
          return p;
        }),
    latency_threshold_ms: item["latency_threshold_ms"],
    model: item["model"],
    instructions: item["instructions"],
    max_completion_tokens: item["max_completion_tokens"],
  };
}

export function voiceAgentLlmInterimResponseConfigDeserializer(
  item: any,
): VoiceAgentLlmInterimResponseConfig {
  return {
    type: item["type"],
    triggers: !item["triggers"]
      ? item["triggers"]
      : item["triggers"].map((p: any) => {
          return p;
        }),
    latency_threshold_ms: item["latency_threshold_ms"],
    model: item["model"],
    instructions: item["instructions"],
    max_completion_tokens: item["max_completion_tokens"],
  };
}

/** Avatar configuration for a voice agent. These values are session defaults and may be overridden when connecting. */
export interface VoiceAgentAvatarConfig {
  /** The avatar type. */
  type: VoiceAgentAvatarType;
  /** The avatar character identifier, e.g. 'lisa'. */
  character: string;
  /** The avatar style, e.g. 'casual-sitting'. */
  style?: string;
  /** Whether the avatar is a customer-customized avatar. Defaults to false. */
  customized?: boolean;
  /** The transport used to deliver the avatar video stream. */
  output_protocol?: VoiceAgentAvatarOutputProtocol;
  /** The avatar model identifier. */
  model?: string;
  /** Avatar video encoder and presentation settings. */
  video?: VoiceAgentAvatarVideoParams;
  /** Avatar placement and motion settings. */
  scene?: VoiceAgentAvatarScene;
  /** Whether audit audio is emitted with avatar output. Defaults to false. */
  output_audit_audio?: boolean;
}

export function voiceAgentAvatarConfigSerializer(item: VoiceAgentAvatarConfig): any {
  return {
    type: item["type"],
    character: item["character"],
    style: item["style"],
    customized: item["customized"],
    output_protocol: item["output_protocol"],
    model: item["model"],
    video: !item["video"] ? item["video"] : voiceAgentAvatarVideoParamsSerializer(item["video"]),
    scene: !item["scene"] ? item["scene"] : voiceAgentAvatarSceneSerializer(item["scene"]),
    output_audit_audio: item["output_audit_audio"],
  };
}

export function voiceAgentAvatarConfigDeserializer(item: any): VoiceAgentAvatarConfig {
  return {
    type: item["type"],
    character: item["character"],
    style: item["style"],
    customized: item["customized"],
    output_protocol: item["output_protocol"],
    model: item["model"],
    video: !item["video"] ? item["video"] : voiceAgentAvatarVideoParamsDeserializer(item["video"]),
    scene: !item["scene"] ? item["scene"] : voiceAgentAvatarSceneDeserializer(item["scene"]),
    output_audit_audio: item["output_audit_audio"],
  };
}

/** The avatar type. */
export type VoiceAgentAvatarType = "video_avatar" | "photo_avatar";

/** The transport used to deliver the avatar video stream. */
export type VoiceAgentAvatarOutputProtocol = "webrtc" | "websocket" | "websocket-binary";

/** Avatar video encoder and presentation settings. */
export interface VoiceAgentAvatarVideoParams {
  /** The target video bitrate in bits per second. */
  bitrate?: number;
  crop?: VoiceAgentAvatarVideoCrop;
  resolution?: VoiceAgentAvatarVideoResolution;
  background?: VoiceAgentAvatarVideoBackground;
  gop_size?: number;
}

export function voiceAgentAvatarVideoParamsSerializer(item: VoiceAgentAvatarVideoParams): any {
  return {
    bitrate: item["bitrate"],
    crop: !item["crop"] ? item["crop"] : voiceAgentAvatarVideoCropSerializer(item["crop"]),
    resolution: !item["resolution"]
      ? item["resolution"]
      : voiceAgentAvatarVideoResolutionSerializer(item["resolution"]),
    background: !item["background"]
      ? item["background"]
      : voiceAgentAvatarVideoBackgroundSerializer(item["background"]),
    gop_size: item["gop_size"],
  };
}

export function voiceAgentAvatarVideoParamsDeserializer(item: any): VoiceAgentAvatarVideoParams {
  return {
    bitrate: item["bitrate"],
    crop: !item["crop"] ? item["crop"] : voiceAgentAvatarVideoCropDeserializer(item["crop"]),
    resolution: !item["resolution"]
      ? item["resolution"]
      : voiceAgentAvatarVideoResolutionDeserializer(item["resolution"]),
    background: !item["background"]
      ? item["background"]
      : voiceAgentAvatarVideoBackgroundDeserializer(item["background"]),
    gop_size: item["gop_size"],
  };
}

/** The rectangular crop applied to avatar video. */
export interface VoiceAgentAvatarVideoCrop {
  bottom_right: number[];
  top_left: number[];
}

export function voiceAgentAvatarVideoCropSerializer(item: VoiceAgentAvatarVideoCrop): any {
  return {
    bottom_right: item["bottom_right"].map((p: any) => {
      return p;
    }),
    top_left: item["top_left"].map((p: any) => {
      return p;
    }),
  };
}

export function voiceAgentAvatarVideoCropDeserializer(item: any): VoiceAgentAvatarVideoCrop {
  return {
    bottom_right: item["bottom_right"].map((p: any) => {
      return p;
    }),
    top_left: item["top_left"].map((p: any) => {
      return p;
    }),
  };
}

/** The avatar video resolution. */
export interface VoiceAgentAvatarVideoResolution {
  width: number;
  height: number;
}

export function voiceAgentAvatarVideoResolutionSerializer(
  item: VoiceAgentAvatarVideoResolution,
): any {
  return { width: item["width"], height: item["height"] };
}

export function voiceAgentAvatarVideoResolutionDeserializer(
  item: any,
): VoiceAgentAvatarVideoResolution {
  return {
    width: item["width"],
    height: item["height"],
  };
}

/** The avatar video background. */
export interface VoiceAgentAvatarVideoBackground {
  image_url?: string;
  color?: string;
}

export function voiceAgentAvatarVideoBackgroundSerializer(
  item: VoiceAgentAvatarVideoBackground,
): any {
  return { image_url: item["image_url"], color: item["color"] };
}

export function voiceAgentAvatarVideoBackgroundDeserializer(
  item: any,
): VoiceAgentAvatarVideoBackground {
  return {
    image_url: item["image_url"],
    color: item["color"],
  };
}

/** Avatar placement and motion settings. */
export interface VoiceAgentAvatarScene {
  zoom?: number;
  position_x?: number;
  position_y?: number;
  rotation_x?: number;
  rotation_y?: number;
  rotation_z?: number;
  amplitude?: number;
}

export function voiceAgentAvatarSceneSerializer(item: VoiceAgentAvatarScene): any {
  return {
    zoom: item["zoom"],
    position_x: item["position_x"],
    position_y: item["position_y"],
    rotation_x: item["rotation_x"],
    rotation_y: item["rotation_y"],
    rotation_z: item["rotation_z"],
    amplitude: item["amplitude"],
  };
}

export function voiceAgentAvatarSceneDeserializer(item: any): VoiceAgentAvatarScene {
  return {
    zoom: item["zoom"],
    position_x: item["position_x"],
    position_y: item["position_y"],
    rotation_x: item["rotation_x"],
    rotation_y: item["rotation_y"],
    rotation_z: item["rotation_z"],
    amplitude: item["amplitude"],
  };
}

export function voiceAgentToolUnionArraySerializer(result: Array<VoiceAgentToolUnion>): any[] {
  return result.map((item) => {
    return voiceAgentToolUnionSerializer(item);
  });
}

export function voiceAgentToolUnionArrayDeserializer(result: Array<VoiceAgentToolUnion>): any[] {
  return result.map((item) => {
    return voiceAgentToolUnionDeserializer(item);
  });
}

/** A tool usable by a voice agent. */
export interface VoiceAgentTool {
  /** The tool kind. */
  /** The discriminator possible values: function, mcp, system, toolbox */
  type: string;
}

export function voiceAgentToolSerializer(item: VoiceAgentTool): any {
  return { type: item["type"] };
}

export function voiceAgentToolDeserializer(item: any): VoiceAgentTool {
  return {
    type: item["type"],
  };
}

/** Alias for VoiceAgentToolUnion */
export type VoiceAgentToolUnion =
  | VoiceAgentFunctionTool
  | VoiceAgentMcpTool
  | VoiceAgentSystemTool
  | VoiceAgentToolboxTool
  | VoiceAgentTool;

export function voiceAgentToolUnionSerializer(item: VoiceAgentToolUnion): any {
  switch (item.type) {
    case "function":
      return voiceAgentFunctionToolSerializer(item as VoiceAgentFunctionTool);

    case "mcp":
      return voiceAgentMcpToolSerializer(item as VoiceAgentMcpTool);

    case "system":
      return voiceAgentSystemToolSerializer(item as VoiceAgentSystemTool);

    case "toolbox":
      return voiceAgentToolboxToolSerializer(item as VoiceAgentToolboxTool);

    default:
      return voiceAgentToolSerializer(item);
  }
}

export function voiceAgentToolUnionDeserializer(item: any): VoiceAgentToolUnion {
  switch (item["type"]) {
    case "function":
      return voiceAgentFunctionToolDeserializer(item as VoiceAgentFunctionTool);

    case "mcp":
      return voiceAgentMcpToolDeserializer(item as VoiceAgentMcpTool);

    case "system":
      return voiceAgentSystemToolDeserializer(item as VoiceAgentSystemTool);

    case "toolbox":
      return voiceAgentToolboxToolDeserializer(item as VoiceAgentToolboxTool);

    default:
      return voiceAgentToolDeserializer(item);
  }
}

/** A native function tool executed by the client. */
export interface VoiceAgentFunctionTool extends VoiceAgentTool {
  /**
   * The description of the function, including guidance on when and how
   *   to call it, and guidance about what to tell the user when calling
   *   (if anything).
   */
  description?: string;
  /** Parameters of the function in JSON Schema. */
  parameters?: RealtimeFunctionToolParameters;
  type: "function";
  /** The function name. */
  name: string;
}

export function voiceAgentFunctionToolSerializer(item: VoiceAgentFunctionTool): any {
  return {
    type: item["type"],
    description: item["description"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : realtimeFunctionToolParametersSerializer(item["parameters"]),
    name: item["name"],
  };
}

export function voiceAgentFunctionToolDeserializer(item: any): VoiceAgentFunctionTool {
  return {
    type: item["type"],
    description: item["description"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : realtimeFunctionToolParametersDeserializer(item["parameters"]),
    name: item["name"],
  };
}

/** model interface RealtimeFunctionToolParameters */
export interface RealtimeFunctionToolParameters {}

export function realtimeFunctionToolParametersSerializer(
  _item: RealtimeFunctionToolParameters,
): any {
  return {};
}

export function realtimeFunctionToolParametersDeserializer(
  item: any,
): RealtimeFunctionToolParameters {
  return item;
}

/** An MCP tool available to a voice agent. */
export interface VoiceAgentMcpTool extends VoiceAgentTool {
  /** A label for this MCP server, used to identify it in tool calls. */
  server_label: string;
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
  allowed_callers?: CallableToolAllowedCaller[];
  require_approval?: MCPToolRequireApproval | "always" | "never";
  /** Whether this MCP tool is deferred and discovered via tool search. */
  defer_loading?: boolean;
  /** The connection ID in the project for the MCP server. The connection stores authentication and other connection details needed to connect to the MCP server. */
  project_connection_id?: string;
  /** Deprecated. This property is deprecated and will be removed in a future version. */
  tool_configs?: Record<string, ToolConfig>;
  type: "mcp";
  /** The URL for the MCP server. */
  server_url?: string;
  /** When the MCP invocation creates a follow-up response. Defaults to `when_idle`. */
  response_scheduling?: VoiceAgentToolResponseScheduling;
}

export function voiceAgentMcpToolSerializer(item: VoiceAgentMcpTool): any {
  return {
    type: item["type"],
    server_label: item["server_label"],
    authorization: item["authorization"],
    server_description: item["server_description"],
    headers: item["headers"],
    allowed_tools: !item["allowed_tools"]
      ? item["allowed_tools"]
      : _mcpToolAllowedToolsSerializer(item["allowed_tools"]),
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p: any) => {
          return p;
        }),
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _mcpToolRequireApprovalSerializer(item["require_approval"]),
    defer_loading: item["defer_loading"],
    project_connection_id: item["project_connection_id"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    server_url: item["server_url"],
    response_scheduling: item["response_scheduling"],
  };
}

export function voiceAgentMcpToolDeserializer(item: any): VoiceAgentMcpTool {
  return {
    type: item["type"],
    server_label: item["server_label"],
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
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p1: any) => {
          return p1;
        }),
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _mcpToolRequireApprovalDeserializer(item["require_approval"]),
    defer_loading: item["defer_loading"],
    project_connection_id: item["project_connection_id"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
    server_url: item["server_url"],
    response_scheduling: item["response_scheduling"],
  };
}

/** When a tool invocation creates a follow-up response. Additional values may be added over time. */
export type VoiceAgentToolResponseScheduling =
  "silent" | "when_idle" | "interrupt" | "skip_if_busy";

/** A service-managed control that acts on the active voice session without customer code or external authentication. */
export interface VoiceAgentSystemTool extends VoiceAgentTool {
  /** The type of the tool. Always `system`. */
  type: "system";
  /** The service-managed control action. Known values are stable; additional values may be added over time. */
  name: VoiceAgentSystemToolName;
  /** An optional description of the system tool. */
  description?: string;
}

export function voiceAgentSystemToolSerializer(item: VoiceAgentSystemTool): any {
  return { type: item["type"], name: item["name"], description: item["description"] };
}

export function voiceAgentSystemToolDeserializer(item: any): VoiceAgentSystemTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
  };
}

/** A service-managed voice-session control action. Known values are stable; additional values may be added over time. */
export type VoiceAgentSystemToolName = "end_conversation";

/** A reference to a Foundry toolbox, which is a versioned bundle of tools executed through its MCP endpoint. */
export interface VoiceAgentToolboxTool extends VoiceAgentTool {
  /** The type of the tool. Always `toolbox`. */
  type: "toolbox";
  /** The name of the toolbox to attach. */
  toolbox_name: string;
  /** The immutable version of the toolbox to attach. */
  toolbox_version: string;
  /** When the toolbox invocation creates a follow-up response. Defaults to `when_idle`. */
  response_scheduling?: VoiceAgentToolResponseScheduling;
}

export function voiceAgentToolboxToolSerializer(item: VoiceAgentToolboxTool): any {
  return {
    type: item["type"],
    toolbox_name: item["toolbox_name"],
    toolbox_version: item["toolbox_version"],
    response_scheduling: item["response_scheduling"],
  };
}

export function voiceAgentToolboxToolDeserializer(item: any): VoiceAgentToolboxTool {
  return {
    type: item["type"],
    toolbox_name: item["toolbox_name"],
    toolbox_version: item["toolbox_version"],
    response_scheduling: item["response_scheduling"],
  };
}

/** An access boundary for the activity protocol. */
export type ActivityProtocolAccessBoundary =
  | "read.1on1.developers"
  | "read.1on1.manager"
  | "read.1on1.allowlisted"
  | "read.1on1.tenant"
  | "write.1on1.developers"
  | "write.1on1.manager"
  | "write.1on1.allowlisted"
  | "write.1on1.tenant"
  | "read.group.developers"
  | "read.group.allowlisted"
  | "read.group.manager-invited"
  | "read.group.manager-present"
  | "read.group.tenant"
  | "write.group.developers"
  | "write.group.allowlisted"
  | "write.group.manager-invited"
  | "write.group.manager-present"
  | "write.group.tenant";

/** The Microsoft Agent Certification review status of the Microsoft 365 store title published for an agent. */
export type PublishApprovalStatus =
  "not_published" | "pending" | "approved" | "rejected" | "no_approval_needed";

/** The type of digital worker. */
export type DigitalWorkerType = "m365";

/**
 * The inputs for generating a voice agent. Only `kind` and `name` are always required.
 * The authoring service expands these inputs into a full, editable `VoiceAgentDefinition`, which is then created through `POST /agents`.
 * The generated `instructions` and audio/voice settings are stored as separate fields on the resulting agent
 * definition, so the caller can edit or override any of them afterward via standard agent versioning.
 */
export interface GenerateVoiceAgentRequest {
  /** The agent kind. Always `voice`. */
  kind: "voice";
  /** The unique name for the agent to create. Must be a non-empty DNS-like agent name. */
  name: string;
  /** Optional inference mode. When omitted, the authoring service uses `managed`. When supplied, use `managed` or `self_deployed`. */
  model_type?: VoiceModelType;
  /** Optional model identifier. Required when `model_type` is `self_deployed`; optional when `model_type` is `managed` or omitted. The service never invents a customer deployment name. */
  model?: string;
  /** An optional authoring use case. An empty string is accepted. */
  use_case?: string;
  /** An optional natural-language description of what the agent should do. When supplied, it seeds the generated instructions. */
  goal?: string;
  /** An optional agent description. The authoring service resolves its fallback when omitted. */
  description?: string;
  /** Optional tools carried through verbatim onto the generated agent (see `VoiceAgentTool`). */
  tools?: VoiceAgentToolUnion[];
  /** (Preview) When `true`, the generated voice agent is created as a draft — an editable, unpublished version the caller can review and refine before publishing it via the standard create/version path. The service defaults to `false` if a value is not specified by the caller, in which case the agent is created and published normally. */
  draft?: boolean;
}

export function generateVoiceAgentRequestSerializer(item: GenerateVoiceAgentRequest): any {
  return {
    kind: item["kind"],
    name: item["name"],
    model_type: item["model_type"],
    model: item["model"],
    use_case: item["use_case"],
    goal: item["goal"],
    description: item["description"],
    tools: !item["tools"] ? item["tools"] : voiceAgentToolUnionArraySerializer(item["tools"]),
    draft: item["draft"],
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultVoiceConversation {
  /** The requested list of items. */
  data: VoiceConversation[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultVoiceConversationDeserializer(
  item: any,
): _AgentsPagedResultVoiceConversation {
  return {
    data: voiceConversationArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function voiceConversationArrayDeserializer(result: Array<VoiceConversation>): any[] {
  return result.map((item) => {
    return voiceConversationDeserializer(item);
  });
}

/**
 * A persisted voice conversation. The Foundry envelope that owns a voice agent's stored
 * transcript, responses, per-turn metrics, and audio. It is the parent, retention, and delete boundary:
 * deleting it cascades to its responses, items, metrics, and audio. When finalization fails, any partial persisted
 * responses, items, and item audio remain readable.
 */
export interface VoiceConversation {
  /** The unique id of the conversation. */
  id: string;
  /** The object type. Always `voice.conversation`. */
  object: "voice.conversation";
  /** The lifecycle status of the conversation. */
  status: VoiceConversationStatus;
  /** The Unix timestamp (in seconds) for when the conversation was created. */
  created_at: Date;
  /** The Unix timestamp (in seconds) for when session and persistence finalization reached the terminal `completed` or `failed` status. Absent while `status` is `in_progress`. */
  completed_at?: Date;
  /** A set of key-value pairs attached to the conversation. */
  metadata?: Record<string, string>;
  /** Final aggregate token usage across all responses in this conversation. Absent while `status` is `in_progress` and populated after successful `completed` finalization; it may be absent when `status` is `failed`, and values are not guaranteed to be reported incrementally. */
  usage?: RealtimeResponseUsage;
  /** The terminal error that prevented persistence finalization. Present only when `status` is `failed`. */
  last_error?: ErrorModel;
}

export function voiceConversationDeserializer(item: any): VoiceConversation {
  return {
    id: item["id"],
    object: item["object"],
    status: item["status"],
    created_at: new Date(item["created_at"] * 1000),
    completed_at: !item["completed_at"]
      ? item["completed_at"]
      : new Date(item["completed_at"] * 1000),
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    usage: !item["usage"] ? item["usage"] : realtimeResponseUsageDeserializer(item["usage"]),
    last_error: !item["last_error"] ? item["last_error"] : apiErrorDeserializer(item["last_error"]),
  };
}

/**
 * The lifecycle status of a persisted voice conversation:
 * - `in_progress`: the live session is active, or post-session persistence finalization is pending.
 * - `completed`: finalization succeeded after normal or client close, `end_conversation`, a max-duration `1001`
 *   close, or a client or network disconnect that the service can still finalize.
 * - `failed`: a terminal service, bridge, storage, or unrecoverable transport failure prevented finalization.
 */
export type VoiceConversationStatus = "in_progress" | "completed" | "failed";

/** model interface RealtimeResponseUsage */
export interface RealtimeResponseUsage {
  total_tokens?: number;
  input_tokens?: number;
  output_tokens?: number;
  input_token_details?: RealtimeResponseUsageInputTokenDetails;
  output_token_details?: RealtimeResponseUsageOutputTokenDetails;
}

export function realtimeResponseUsageSerializer(item: RealtimeResponseUsage): any {
  return {
    total_tokens: item["total_tokens"],
    input_tokens: item["input_tokens"],
    output_tokens: item["output_tokens"],
    input_token_details: !item["input_token_details"]
      ? item["input_token_details"]
      : realtimeResponseUsageInputTokenDetailsSerializer(item["input_token_details"]),
    output_token_details: !item["output_token_details"]
      ? item["output_token_details"]
      : realtimeResponseUsageOutputTokenDetailsSerializer(item["output_token_details"]),
  };
}

export function realtimeResponseUsageDeserializer(item: any): RealtimeResponseUsage {
  return {
    total_tokens: item["total_tokens"],
    input_tokens: item["input_tokens"],
    output_tokens: item["output_tokens"],
    input_token_details: !item["input_token_details"]
      ? item["input_token_details"]
      : realtimeResponseUsageInputTokenDetailsDeserializer(item["input_token_details"]),
    output_token_details: !item["output_token_details"]
      ? item["output_token_details"]
      : realtimeResponseUsageOutputTokenDetailsDeserializer(item["output_token_details"]),
  };
}

/** model interface RealtimeResponseUsageInputTokenDetails */
export interface RealtimeResponseUsageInputTokenDetails {
  cached_tokens?: number;
  text_tokens?: number;
  image_tokens?: number;
  audio_tokens?: number;
  cached_tokens_details?: RealtimeResponseUsageInputTokenDetailsCachedTokensDetails;
}

export function realtimeResponseUsageInputTokenDetailsSerializer(
  item: RealtimeResponseUsageInputTokenDetails,
): any {
  return {
    cached_tokens: item["cached_tokens"],
    text_tokens: item["text_tokens"],
    image_tokens: item["image_tokens"],
    audio_tokens: item["audio_tokens"],
    cached_tokens_details: !item["cached_tokens_details"]
      ? item["cached_tokens_details"]
      : realtimeResponseUsageInputTokenDetailsCachedTokensDetailsSerializer(
          item["cached_tokens_details"],
        ),
  };
}

export function realtimeResponseUsageInputTokenDetailsDeserializer(
  item: any,
): RealtimeResponseUsageInputTokenDetails {
  return {
    cached_tokens: item["cached_tokens"],
    text_tokens: item["text_tokens"],
    image_tokens: item["image_tokens"],
    audio_tokens: item["audio_tokens"],
    cached_tokens_details: !item["cached_tokens_details"]
      ? item["cached_tokens_details"]
      : realtimeResponseUsageInputTokenDetailsCachedTokensDetailsDeserializer(
          item["cached_tokens_details"],
        ),
  };
}

/** model interface RealtimeResponseUsageInputTokenDetailsCachedTokensDetails */
export interface RealtimeResponseUsageInputTokenDetailsCachedTokensDetails {
  text_tokens?: number;
  image_tokens?: number;
  audio_tokens?: number;
}

export function realtimeResponseUsageInputTokenDetailsCachedTokensDetailsSerializer(
  item: RealtimeResponseUsageInputTokenDetailsCachedTokensDetails,
): any {
  return {
    text_tokens: item["text_tokens"],
    image_tokens: item["image_tokens"],
    audio_tokens: item["audio_tokens"],
  };
}

export function realtimeResponseUsageInputTokenDetailsCachedTokensDetailsDeserializer(
  item: any,
): RealtimeResponseUsageInputTokenDetailsCachedTokensDetails {
  return {
    text_tokens: item["text_tokens"],
    image_tokens: item["image_tokens"],
    audio_tokens: item["audio_tokens"],
  };
}

/** model interface RealtimeResponseUsageOutputTokenDetails */
export interface RealtimeResponseUsageOutputTokenDetails {
  text_tokens?: number;
  audio_tokens?: number;
}

export function realtimeResponseUsageOutputTokenDetailsSerializer(
  item: RealtimeResponseUsageOutputTokenDetails,
): any {
  return { text_tokens: item["text_tokens"], audio_tokens: item["audio_tokens"] };
}

export function realtimeResponseUsageOutputTokenDetailsDeserializer(
  item: any,
): RealtimeResponseUsageOutputTokenDetails {
  return {
    text_tokens: item["text_tokens"],
    audio_tokens: item["audio_tokens"],
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultVoiceResponse {
  /** The requested list of items. */
  data: VoiceResponse[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultVoiceResponseDeserializer(
  item: any,
): _AgentsPagedResultVoiceResponse {
  return {
    data: voiceResponseArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function voiceResponseArrayDeserializer(result: Array<VoiceResponse>): any[] {
  return result.map((item) => {
    return voiceResponseDeserializer(item);
  });
}

/**
 * A persisted voice response representing one model inference turn within a conversation. In list results the
 * `output` projection may be omitted; retrieve the
 * full response (`GET .../responses/{response_id}`) or the paged response-items route
 * (`GET .../responses/{response_id}/items`) for its output items. `created_at`/`completed_at` are Foundry
 * durable ordering extensions.
 */
export interface VoiceResponse extends OmitPropertiesRealtimeResponse {
  /** The unique id of the response. */
  id: string;
  /** The output items produced by the response. May be omitted in list results; retrieve the full response (GET .../responses/{response_id}) or use the paged response-items route (GET .../responses/{response_id}/items) for its output items. Each item's `response_id` also links it back to this response in the conversation-level items list. */
  output?: RealtimeConversationItemUnion[];
  /** The id of the conversation this response belongs to. */
  conversation_id: string;
  /** The audio configuration used for the response, including the voice and audio format used for output. */
  audio?: VoiceResponseAudio;
  /** A set of key-value pairs attached to the response. */
  metadata?: Record<string, string>;
  /** The sampling temperature used for the response. */
  temperature?: number;
  /** The Unix timestamp (in seconds) for when the response was created. */
  created_at?: Date;
  /** The Unix timestamp (in seconds) for when the response completed. */
  completed_at?: Date;
}

export function voiceResponseDeserializer(item: any): VoiceResponse {
  return {
    id: item["id"],
    object: item["object"],
    status: item["status"],
    status_details: !item["status_details"]
      ? item["status_details"]
      : realtimeResponseStatusDetailsDeserializer(item["status_details"]),
    usage: !item["usage"] ? item["usage"] : realtimeResponseUsageDeserializer(item["usage"]),
    conversation_id: item["conversation_id"],
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : _omitPropertiesMaxOutputTokensDeserializer(item["max_output_tokens"]),
    output: !item["output"]
      ? item["output"]
      : realtimeConversationItemUnionArrayDeserializer(item["output"]),
    audio: !item["audio"] ? item["audio"] : voiceResponseAudioDeserializer(item["audio"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    temperature: item["temperature"],
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    completed_at: !item["completed_at"]
      ? item["completed_at"]
      : new Date(item["completed_at"] * 1000),
  };
}

export function realtimeConversationItemUnionArraySerializer(
  result: Array<RealtimeConversationItemUnion>,
): any[] {
  return result.map((item) => {
    return realtimeConversationItemUnionSerializer(item);
  });
}

export function realtimeConversationItemUnionArrayDeserializer(
  result: Array<RealtimeConversationItemUnion>,
): any[] {
  return result.map((item) => {
    return realtimeConversationItemUnionDeserializer(item);
  });
}

/** A single item within a Realtime conversation. */
export interface RealtimeConversationItem {
  type: RealtimeConversationItemType;
}

export function realtimeConversationItemSerializer(item: RealtimeConversationItem): any {
  return { type: item["type"] };
}

export function realtimeConversationItemDeserializer(item: any): RealtimeConversationItem {
  return {
    type: item["type"],
  };
}

/** Alias for RealtimeConversationItemUnion */
export type RealtimeConversationItemUnion =
  | RealtimeConversationItemFunctionCall
  | RealtimeConversationItemFunctionCallOutput
  | RealtimeMCPApprovalResponse
  | RealtimeMCPListTools
  | RealtimeMCPToolCall
  | RealtimeMCPApprovalRequest
  | RealtimeConversationItem;

export function realtimeConversationItemUnionSerializer(item: RealtimeConversationItemUnion): any {
  switch (item.type) {
    case "function_call":
      return realtimeConversationItemFunctionCallSerializer(
        item as RealtimeConversationItemFunctionCall,
      );

    case "function_call_output":
      return realtimeConversationItemFunctionCallOutputSerializer(
        item as RealtimeConversationItemFunctionCallOutput,
      );

    case "mcp_approval_response":
      return realtimeMCPApprovalResponseSerializer(item as RealtimeMCPApprovalResponse);

    case "mcp_list_tools":
      return realtimeMCPListToolsSerializer(item as RealtimeMCPListTools);

    case "mcp_call":
      return realtimeMCPToolCallSerializer(item as RealtimeMCPToolCall);

    case "mcp_approval_request":
      return realtimeMCPApprovalRequestSerializer(item as RealtimeMCPApprovalRequest);

    default:
      return realtimeConversationItemSerializer(item);
  }
}

export function realtimeConversationItemUnionDeserializer(
  item: any,
): RealtimeConversationItemUnion {
  switch (item["type"]) {
    case "function_call":
      return realtimeConversationItemFunctionCallDeserializer(
        item as RealtimeConversationItemFunctionCall,
      );

    case "function_call_output":
      return realtimeConversationItemFunctionCallOutputDeserializer(
        item as RealtimeConversationItemFunctionCallOutput,
      );

    case "mcp_approval_response":
      return realtimeMCPApprovalResponseDeserializer(item as RealtimeMCPApprovalResponse);

    case "mcp_list_tools":
      return realtimeMCPListToolsDeserializer(item as RealtimeMCPListTools);

    case "mcp_call":
      return realtimeMCPToolCallDeserializer(item as RealtimeMCPToolCall);

    case "mcp_approval_request":
      return realtimeMCPApprovalRequestDeserializer(item as RealtimeMCPApprovalRequest);

    default:
      return realtimeConversationItemDeserializer(item);
  }
}

/** Type of RealtimeConversationItemType */
export type RealtimeConversationItemType =
  | "function_call"
  | "function_call_output"
  | "mcp_approval_response"
  | "mcp_list_tools"
  | "mcp_call"
  | "mcp_approval_request";

/** A function call item in a Realtime conversation. */
export interface RealtimeConversationItemFunctionCall extends RealtimeConversationItem {
  /** The unique ID of the item. This may be provided by the client or generated by the server. */
  id?: string;
  /** Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item. */
  object?: "realtime.item";
  /** The type of the item. Always `function_call`. */
  type: "function_call";
  /** The status of the item. Has no effect on the conversation. */
  status?: "completed" | "incomplete" | "in_progress";
  /** The ID of the function call. */
  call_id?: string;
  /** The name of the function being called. */
  name: string;
  /** The arguments of the function call. This is a JSON-encoded string representing the arguments passed to the function, for example `{"arg1": "value1", "arg2": 42}`. */
  arguments: string;
  /** The Unix timestamp (in seconds) for when the item was persisted. */
  readonly created_at?: Date;
  /** The id of the response that produced this item, when applicable. */
  readonly response_id?: string;
}

export function realtimeConversationItemFunctionCallSerializer(
  item: RealtimeConversationItemFunctionCall,
): any {
  return {
    type: item["type"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    call_id: item["call_id"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

export function realtimeConversationItemFunctionCallDeserializer(
  item: any,
): RealtimeConversationItemFunctionCall {
  return {
    type: item["type"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    call_id: item["call_id"],
    name: item["name"],
    arguments: item["arguments"],
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    response_id: item["response_id"],
  };
}

/** A function call output item in a Realtime conversation. */
export interface RealtimeConversationItemFunctionCallOutput extends RealtimeConversationItem {
  /** The unique ID of the item. This may be provided by the client or generated by the server. */
  id?: string;
  /** Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item. */
  object?: "realtime.item";
  /** The type of the item. Always `function_call_output`. */
  type: "function_call_output";
  /** The status of the item. Has no effect on the conversation. */
  status?: "completed" | "incomplete" | "in_progress";
  /** The ID of the function call this output is for. */
  call_id: string;
  /** The output of the function call, this is free text and can contain any information or simply be empty. */
  output: string;
  /** The Unix timestamp (in seconds) for when the item was persisted. */
  readonly created_at?: Date;
  /** The id of the response that produced this item, when applicable. */
  readonly response_id?: string;
  /** The name of the function that was called. A Foundry extension: OpenAI's function_call_output does not carry the function name, only `call_id`. */
  name?: string;
}

export function realtimeConversationItemFunctionCallOutputSerializer(
  item: RealtimeConversationItemFunctionCallOutput,
): any {
  return {
    type: item["type"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    call_id: item["call_id"],
    output: item["output"],
    name: item["name"],
  };
}

export function realtimeConversationItemFunctionCallOutputDeserializer(
  item: any,
): RealtimeConversationItemFunctionCallOutput {
  return {
    type: item["type"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    call_id: item["call_id"],
    output: item["output"],
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    response_id: item["response_id"],
    name: item["name"],
  };
}

/** A Realtime item responding to an MCP approval request. */
export interface RealtimeMCPApprovalResponse extends RealtimeConversationItem {
  /** The type of the item. Always `mcp_approval_response`. */
  type: "mcp_approval_response";
  /** The unique ID of the approval response. */
  id: string;
  /** The ID of the approval request being answered. */
  approval_request_id: string;
  /** Whether the request was approved. */
  approve: boolean;
  reason?: string;
  /** The Unix timestamp (in seconds) for when the item was persisted. */
  readonly created_at?: Date;
  /** The id of the response that produced this item, when applicable. */
  readonly response_id?: string;
}

export function realtimeMCPApprovalResponseSerializer(item: RealtimeMCPApprovalResponse): any {
  return {
    type: item["type"],
    id: item["id"],
    approval_request_id: item["approval_request_id"],
    approve: item["approve"],
    reason: item["reason"],
  };
}

export function realtimeMCPApprovalResponseDeserializer(item: any): RealtimeMCPApprovalResponse {
  return {
    type: item["type"],
    id: item["id"],
    approval_request_id: item["approval_request_id"],
    approve: item["approve"],
    reason: item["reason"],
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    response_id: item["response_id"],
  };
}

/** A Realtime item listing tools available on an MCP server. */
export interface RealtimeMCPListTools extends RealtimeConversationItem {
  /** The type of the item. Always `mcp_list_tools`. */
  type: "mcp_list_tools";
  /** The unique ID of the list. */
  id?: string;
  /** The label of the MCP server. */
  server_label: string;
  /** The tools available on the server. */
  tools: MCPListToolsTool[];
  /** The Unix timestamp (in seconds) for when the item was persisted. */
  readonly created_at?: Date;
  /** The id of the response that produced this item, when applicable. */
  readonly response_id?: string;
}

export function realtimeMCPListToolsSerializer(item: RealtimeMCPListTools): any {
  return {
    type: item["type"],
    id: item["id"],
    server_label: item["server_label"],
    tools: mcpListToolsToolArraySerializer(item["tools"]),
  };
}

export function realtimeMCPListToolsDeserializer(item: any): RealtimeMCPListTools {
  return {
    type: item["type"],
    id: item["id"],
    server_label: item["server_label"],
    tools: mcpListToolsToolArrayDeserializer(item["tools"]),
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    response_id: item["response_id"],
  };
}

export function mcpListToolsToolArraySerializer(result: Array<MCPListToolsTool>): any[] {
  return result.map((item) => {
    return mcpListToolsToolSerializer(item);
  });
}

export function mcpListToolsToolArrayDeserializer(result: Array<MCPListToolsTool>): any[] {
  return result.map((item) => {
    return mcpListToolsToolDeserializer(item);
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

export function mcpListToolsToolDeserializer(item: any): MCPListToolsTool {
  return {
    name: item["name"],
    description: item["description"],
    input_schema: mcpListToolsToolInputSchemaDeserializer(item["input_schema"]),
    annotations: !item["annotations"]
      ? item["annotations"]
      : mcpListToolsToolAnnotationsDeserializer(item["annotations"]),
  };
}

/** model interface MCPListToolsToolInputSchema */
export interface MCPListToolsToolInputSchema {}

export function mcpListToolsToolInputSchemaSerializer(_item: MCPListToolsToolInputSchema): any {
  return {};
}

export function mcpListToolsToolInputSchemaDeserializer(item: any): MCPListToolsToolInputSchema {
  return item;
}

/** model interface MCPListToolsToolAnnotations */
export interface MCPListToolsToolAnnotations {}

export function mcpListToolsToolAnnotationsSerializer(_item: MCPListToolsToolAnnotations): any {
  return {};
}

export function mcpListToolsToolAnnotationsDeserializer(item: any): MCPListToolsToolAnnotations {
  return item;
}

/** A Realtime item representing an invocation of a tool on an MCP server. */
export interface RealtimeMCPToolCall extends RealtimeConversationItem {
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
  approval_request_id?: string;
  output?: string;
  error?: RealtimeMCPErrorUnion;
  /** The Unix timestamp (in seconds) for when the item was persisted. */
  readonly created_at?: Date;
  /** The id of the response that produced this item, when applicable. */
  readonly response_id?: string;
}

export function realtimeMCPToolCallSerializer(item: RealtimeMCPToolCall): any {
  return {
    type: item["type"],
    id: item["id"],
    server_label: item["server_label"],
    name: item["name"],
    arguments: item["arguments"],
    approval_request_id: item["approval_request_id"],
    output: item["output"],
    error: !item["error"] ? item["error"] : realtimeMCPErrorUnionSerializer(item["error"]),
  };
}

export function realtimeMCPToolCallDeserializer(item: any): RealtimeMCPToolCall {
  return {
    type: item["type"],
    id: item["id"],
    server_label: item["server_label"],
    name: item["name"],
    arguments: item["arguments"],
    approval_request_id: item["approval_request_id"],
    output: item["output"],
    error: !item["error"] ? item["error"] : realtimeMCPErrorUnionDeserializer(item["error"]),
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    response_id: item["response_id"],
  };
}

/** model interface RealtimeMCPError */
export interface RealtimeMCPError {
  type: RealtimeMcpErrorType;
}

export function realtimeMCPErrorSerializer(item: RealtimeMCPError): any {
  return { type: item["type"] };
}

export function realtimeMCPErrorDeserializer(item: any): RealtimeMCPError {
  return {
    type: item["type"],
  };
}

/** Alias for RealtimeMCPErrorUnion */
export type RealtimeMCPErrorUnion =
  | RealtimeMCPProtocolError
  | RealtimeMCPToolExecutionError
  | RealtimeMcphttpError
  | RealtimeMCPError;

export function realtimeMCPErrorUnionSerializer(item: RealtimeMCPErrorUnion): any {
  switch (item.type) {
    case "protocol_error":
      return realtimeMCPProtocolErrorSerializer(item as RealtimeMCPProtocolError);

    case "tool_execution_error":
      return realtimeMCPToolExecutionErrorSerializer(item as RealtimeMCPToolExecutionError);

    case "http_error":
      return realtimeMcphttpErrorSerializer(item as RealtimeMcphttpError);

    default:
      return realtimeMCPErrorSerializer(item);
  }
}

export function realtimeMCPErrorUnionDeserializer(item: any): RealtimeMCPErrorUnion {
  switch (item["type"]) {
    case "protocol_error":
      return realtimeMCPProtocolErrorDeserializer(item as RealtimeMCPProtocolError);

    case "tool_execution_error":
      return realtimeMCPToolExecutionErrorDeserializer(item as RealtimeMCPToolExecutionError);

    case "http_error":
      return realtimeMcphttpErrorDeserializer(item as RealtimeMcphttpError);

    default:
      return realtimeMCPErrorDeserializer(item);
  }
}

/** Type of RealtimeMcpErrorType */
export type RealtimeMcpErrorType = "protocol_error" | "tool_execution_error" | "http_error";

/** model interface RealtimeMCPProtocolError */
export interface RealtimeMCPProtocolError extends RealtimeMCPError {
  type: "protocol_error";
  code: number;
  message: string;
}

export function realtimeMCPProtocolErrorSerializer(item: RealtimeMCPProtocolError): any {
  return { type: item["type"], code: item["code"], message: item["message"] };
}

export function realtimeMCPProtocolErrorDeserializer(item: any): RealtimeMCPProtocolError {
  return {
    type: item["type"],
    code: item["code"],
    message: item["message"],
  };
}

/** model interface RealtimeMCPToolExecutionError */
export interface RealtimeMCPToolExecutionError extends RealtimeMCPError {
  type: "tool_execution_error";
  message: string;
}

export function realtimeMCPToolExecutionErrorSerializer(item: RealtimeMCPToolExecutionError): any {
  return { type: item["type"], message: item["message"] };
}

export function realtimeMCPToolExecutionErrorDeserializer(
  item: any,
): RealtimeMCPToolExecutionError {
  return {
    type: item["type"],
    message: item["message"],
  };
}

/** model interface RealtimeMcphttpError */
export interface RealtimeMcphttpError extends RealtimeMCPError {
  type: "http_error";
  code: number;
  message: string;
}

export function realtimeMcphttpErrorSerializer(item: RealtimeMcphttpError): any {
  return { type: item["type"], code: item["code"], message: item["message"] };
}

export function realtimeMcphttpErrorDeserializer(item: any): RealtimeMcphttpError {
  return {
    type: item["type"],
    code: item["code"],
    message: item["message"],
  };
}

/** A Realtime item requesting human approval of a tool invocation. */
export interface RealtimeMCPApprovalRequest extends RealtimeConversationItem {
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
  /** The Unix timestamp (in seconds) for when the item was persisted. */
  readonly created_at?: Date;
  /** The id of the response that produced this item, when applicable. */
  readonly response_id?: string;
}

export function realtimeMCPApprovalRequestSerializer(item: RealtimeMCPApprovalRequest): any {
  return {
    type: item["type"],
    id: item["id"],
    server_label: item["server_label"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

export function realtimeMCPApprovalRequestDeserializer(item: any): RealtimeMCPApprovalRequest {
  return {
    type: item["type"],
    id: item["id"],
    server_label: item["server_label"],
    name: item["name"],
    arguments: item["arguments"],
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    response_id: item["response_id"],
  };
}

/** Audio configuration for a response. Follows the OpenAI Realtime GA `audio` object shape. */
export interface VoiceResponseAudio {
  /** The audio output configuration used for the response. */
  output?: VoiceResponseAudioOutput;
}

export function voiceResponseAudioSerializer(item: VoiceResponseAudio): any {
  return {
    output: !item["output"] ? item["output"] : voiceResponseAudioOutputSerializer(item["output"]),
  };
}

export function voiceResponseAudioDeserializer(item: any): VoiceResponseAudio {
  return {
    output: !item["output"] ? item["output"] : voiceResponseAudioOutputDeserializer(item["output"]),
  };
}

/** The flat response audio-output projection, with optional `voice`, `voice_type`, `voice_locale`, and `format` fields. */
export interface VoiceResponseAudioOutput {
  /** The voice name used for the response's audio output. */
  voice?: string;
  /** The extensible provider/type of the voice used for the response's audio output. */
  voice_type?: VoiceType;
  /** The BCP-47 locale of the voice used for the response's audio output. */
  voice_locale?: string;
  /** The audio format used for the response's audio output. */
  format?: RealtimeAudioFormatsUnion;
}

export function voiceResponseAudioOutputSerializer(item: VoiceResponseAudioOutput): any {
  return {
    voice: item["voice"],
    voice_type: item["voice_type"],
    voice_locale: item["voice_locale"],
    format: !item["format"] ? item["format"] : realtimeAudioFormatsUnionSerializer(item["format"]),
  };
}

export function voiceResponseAudioOutputDeserializer(item: any): VoiceResponseAudioOutput {
  return {
    voice: item["voice"],
    voice_type: item["voice_type"],
    voice_locale: item["voice_locale"],
    format: !item["format"]
      ? item["format"]
      : realtimeAudioFormatsUnionDeserializer(item["format"]),
  };
}

/** The template for omitting properties. */
export interface OmitPropertiesRealtimeResponse {
  /** The unique ID of the response, will look like `resp_1234`. */
  id?: string;
  /** The object type, must be `realtime.response`. */
  object?: "realtime.response";
  /**
   * The final status of the response (`completed`, `cancelled`, `failed`, or
   *   `incomplete`, `in_progress`).
   */
  status?: "completed" | "cancelled" | "failed" | "incomplete" | "in_progress";
  /** Additional details about the status. */
  status_details?: RealtimeResponseStatusDetails;
  /**
   * Usage statistics for the Response, this will correspond to billing. A
   *   Realtime API session will maintain a conversation context and append new
   *   Items to the Conversation, thus output from previous turns (text and
   *   audio tokens) will become the input for later turns.
   */
  usage?: RealtimeResponseUsage;
  /**
   * Which conversation the response is added to, determined by the `conversation`
   *   field in the `response.create` event. If `auto`, the response will be added to
   *   the default conversation and the value of `conversation_id` will be an id like
   *   `conv_1234`. If `none`, the response will not be added to any conversation and
   *   the value of `conversation_id` will be `null`. If responses are being triggered
   *   automatically by VAD the response will be added to the default conversation
   */
  conversation_id?: string;
  /**
   * The set of modalities the model used to respond, currently the only possible values are
   *   `[\"audio\"]`, `[\"text\"]`. Audio output always include a text transcript. Setting the
   *   output to mode `text` will disable audio output from the model.
   */
  output_modalities?: ("text" | "audio")[];
  /**
   * Maximum number of output tokens for a single assistant response,
   *   inclusive of tool calls, that was used in this response.
   */
  max_output_tokens?: number | "inf";
}

export function omitPropertiesRealtimeResponseDeserializer(
  item: any,
): OmitPropertiesRealtimeResponse {
  return {
    id: item["id"],
    object: item["object"],
    status: item["status"],
    status_details: !item["status_details"]
      ? item["status_details"]
      : realtimeResponseStatusDetailsDeserializer(item["status_details"]),
    usage: !item["usage"] ? item["usage"] : realtimeResponseUsageDeserializer(item["usage"]),
    conversation_id: item["conversation_id"],
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : _omitPropertiesMaxOutputTokensDeserializer(item["max_output_tokens"]),
  };
}

/** model interface RealtimeResponseStatusDetails */
export interface RealtimeResponseStatusDetails {
  type?: "completed" | "cancelled" | "failed" | "incomplete";
  reason?: "turn_detected" | "client_cancelled" | "max_output_tokens" | "content_filter";
  error?: RealtimeResponseStatusDetailsError;
}

export function realtimeResponseStatusDetailsSerializer(item: RealtimeResponseStatusDetails): any {
  return {
    type: item["type"],
    reason: item["reason"],
    error: !item["error"]
      ? item["error"]
      : realtimeResponseStatusDetailsErrorSerializer(item["error"]),
  };
}

export function realtimeResponseStatusDetailsDeserializer(
  item: any,
): RealtimeResponseStatusDetails {
  return {
    type: item["type"],
    reason: item["reason"],
    error: !item["error"]
      ? item["error"]
      : realtimeResponseStatusDetailsErrorDeserializer(item["error"]),
  };
}

/** model interface RealtimeResponseStatusDetailsError */
export interface RealtimeResponseStatusDetailsError {
  type?: string;
  code?: string;
}

export function realtimeResponseStatusDetailsErrorSerializer(
  item: RealtimeResponseStatusDetailsError,
): any {
  return { type: item["type"], code: item["code"] };
}

export function realtimeResponseStatusDetailsErrorDeserializer(
  item: any,
): RealtimeResponseStatusDetailsError {
  return {
    type: item["type"],
    code: item["code"],
  };
}

/** Alias for _OmitPropertiesMaxOutputTokens */
export type _OmitPropertiesMaxOutputTokens = number | "inf";

export function _omitPropertiesMaxOutputTokensSerializer(
  item: _OmitPropertiesMaxOutputTokens,
): any {
  return item;
}

export function _omitPropertiesMaxOutputTokensDeserializer(
  item: any,
): _OmitPropertiesMaxOutputTokens {
  return item;
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultRealtimeConversationItem {
  /** The requested list of items. */
  data: RealtimeConversationItemUnion[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultRealtimeConversationItemDeserializer(
  item: any,
): _AgentsPagedResultRealtimeConversationItem {
  return {
    data: realtimeConversationItemUnionArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

/**
 * Metadata for a single conversation item's audio segment. For bring-your-own-storage (BYOS), the response includes
 * `blob_uri`, a direct customer-storage URI without a SAS token, that the customer accesses with their own
 * credentials. For Foundry-managed storage, `blob_uri` is absent and the bytes are streamed through the item's
 * `/audio/content` route.
 */
export interface VoiceItemAudioResponse {
  /** The id of the conversation the item belongs to. */
  conversation_id: string;
  /** The id of the item this audio belongs to. */
  item_id: string;
  /** The role the audio belongs to. */
  role?: VoiceAudioRole;
  /** The container format of the audio. */
  format?: VoiceAudioContainerFormat;
  /** The audio codec. */
  codec?: VoiceAudioCodec;
  /** The sample rate in Hz. */
  sample_rate?: number;
  /** The number of audio channels. */
  channels?: number;
  /** The offset from the session start at which this segment begins. */
  start_offset_ms?: number;
  /** The duration of the audio segment. */
  duration_ms?: number;
  /** For bring-your-own-storage (BYOS) recordings only: the URI of the recording in the customer's own storage, without a SAS token. The customer downloads it using their own storage credentials. Absent for Foundry-managed storage, where the bytes are streamed via the item's `/audio/content` route instead. */
  blob_uri?: string;
}

export function voiceItemAudioResponseDeserializer(item: any): VoiceItemAudioResponse {
  return {
    conversation_id: item["conversation_id"],
    item_id: item["item_id"],
    role: item["role"],
    format: item["format"],
    codec: item["codec"],
    sample_rate: item["sample_rate"],
    channels: item["channels"],
    start_offset_ms: item["start_offset_ms"],
    duration_ms: item["duration_ms"],
    blob_uri: item["blob_uri"],
  };
}

/** A voice-audio participant role. Additional values may be added over time. */
export type VoiceAudioRole = "user" | "agent";

/** An audio container format. Additional values may be added over time. */
export type VoiceAudioContainerFormat = "wav";

/** An audio codec. Additional values may be added over time. */
export type VoiceAudioCodec = "pcm16" | "pcmu" | "pcma";

/**
 * Metadata for the merged, whole-call stereo recording of a voice conversation (user audio on the left channel,
 * agent audio on the right). Built once from the per-turn segments after the session ends and durably cached.
 * The common metadata (format, sample rate, channels, channel layout, duration) is returned for both
 * Foundry-managed and bring-your-own-storage (BYOS) recordings. For BYOS the response also includes `blob_uri`,
 * the URI of the recording in the customer's own storage (no SAS token), which the customer downloads using their
 * own storage credentials. For Foundry-managed storage `blob_uri` is absent and the bytes are streamed via the
 * `/audio/content` route instead.
 */
export interface VoiceRecordingResponse {
  /** The id of the conversation this recording belongs to. */
  conversation_id: string;
  /** The container format of the recording. */
  format: VoiceAudioContainerFormat;
  /** The sample rate of the recording in Hz, e.g. 24000. */
  sample_rate: number;
  /** The number of audio channels. The merged recording is stereo (`2`). */
  channels: number;
  /** The role assigned to each stereo channel. */
  channel_layout: VoiceRecordingChannelLayout;
  /** The total duration of the recording. */
  duration_ms: number;
  /** For bring-your-own-storage (BYOS) recordings only: the URI of the recording in the customer's own storage, without a SAS token. The customer downloads it using their own storage credentials. Absent for Foundry-managed storage, where the bytes are streamed via the `/audio/content` route instead. */
  blob_uri?: string;
}

export function voiceRecordingResponseDeserializer(item: any): VoiceRecordingResponse {
  return {
    conversation_id: item["conversation_id"],
    format: item["format"],
    sample_rate: item["sample_rate"],
    channels: item["channels"],
    channel_layout: voiceRecordingChannelLayoutDeserializer(item["channel_layout"]),
    duration_ms: item["duration_ms"],
    blob_uri: item["blob_uri"],
  };
}

/** The role assigned to each channel of a merged stereo voice recording. */
export interface VoiceRecordingChannelLayout {
  /** The role carried on the left channel. Always `user`. */
  left: "user";
  /** The role carried on the right channel. Always `agent`. */
  right: "agent";
}

export function voiceRecordingChannelLayoutDeserializer(item: any): VoiceRecordingChannelLayout {
  return {
    left: item["left"],
    right: item["right"],
  };
}

/** A shell tool stored in a toolbox. This model is additive to toolbox configuration and does not modify the OpenAI tool contract or existing toolbox tool definitions. */
export interface ShellToolboxTool extends ToolboxTool {
  /** The type of the tool. Always `shell`. */
  type: "shell";
  allowed_callers?: CallableToolAllowedCaller[];
  /** The environment in which shell commands are executed. Specify an automatically provisioned container or an existing container. */
  environment: ToolboxShellEnvironmentUnion;
}

export function shellToolboxToolSerializer(item: ShellToolboxTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p: any) => {
          return p;
        }),
    environment: toolboxShellEnvironmentUnionSerializer(item["environment"]),
  };
}

export function shellToolboxToolDeserializer(item: any): ShellToolboxTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p1: any) => {
          return p1;
        }),
    environment: toolboxShellEnvironmentUnionDeserializer(item["environment"]),
  };
}

/** An execution environment for a shell tool stored in a toolbox. This environment model is scoped to toolbox configuration and does not modify the OpenAI shell environment contract. */
export interface ToolboxShellEnvironment {
  /** The type of the shell execution environment. */
  /** The discriminator possible values: container_auto, container_reference */
  type: string;
}

export function toolboxShellEnvironmentSerializer(item: ToolboxShellEnvironment): any {
  return { type: item["type"] };
}

export function toolboxShellEnvironmentDeserializer(item: any): ToolboxShellEnvironment {
  return {
    type: item["type"],
  };
}

/** Alias for ToolboxShellEnvironmentUnion */
export type ToolboxShellEnvironmentUnion =
  | ToolboxShellContainerAutoEnvironment
  | ToolboxShellContainerReferenceEnvironment
  | ToolboxShellEnvironment;

export function toolboxShellEnvironmentUnionSerializer(item: ToolboxShellEnvironmentUnion): any {
  switch (item.type) {
    case "container_auto":
      return toolboxShellContainerAutoEnvironmentSerializer(
        item as ToolboxShellContainerAutoEnvironment,
      );

    case "container_reference":
      return toolboxShellContainerReferenceEnvironmentSerializer(
        item as ToolboxShellContainerReferenceEnvironment,
      );

    default:
      return toolboxShellEnvironmentSerializer(item);
  }
}

export function toolboxShellEnvironmentUnionDeserializer(item: any): ToolboxShellEnvironmentUnion {
  switch (item["type"]) {
    case "container_auto":
      return toolboxShellContainerAutoEnvironmentDeserializer(
        item as ToolboxShellContainerAutoEnvironment,
      );

    case "container_reference":
      return toolboxShellContainerReferenceEnvironmentDeserializer(
        item as ToolboxShellContainerReferenceEnvironment,
      );

    default:
      return toolboxShellEnvironmentDeserializer(item);
  }
}

/** An automatically provisioned container environment for a shell tool stored in a toolbox. */
export interface ToolboxShellContainerAutoEnvironment extends ToolboxShellEnvironment {
  /** The type of the shell execution environment. Always `container_auto`. */
  type: "container_auto";
  /** An optional list of uploaded files to make available to your code. */
  file_ids?: string[];
  memory_limit?: ContainerMemoryLimit;
  /** An optional list of skills referenced by id or inline data. */
  skills?: ContainerSkillUnion[];
  /** The network access policy for the container. When omitted, the service defaults to disabled outbound network access. */
  network_policy?: ToolboxShellNetworkPolicyUnion;
}

export function toolboxShellContainerAutoEnvironmentSerializer(
  item: ToolboxShellContainerAutoEnvironment,
): any {
  return {
    type: item["type"],
    file_ids: !item["file_ids"]
      ? item["file_ids"]
      : item["file_ids"].map((p: any) => {
          return p;
        }),
    memory_limit: item["memory_limit"],
    skills: !item["skills"] ? item["skills"] : containerSkillUnionArraySerializer(item["skills"]),
    network_policy: !item["network_policy"]
      ? item["network_policy"]
      : toolboxShellNetworkPolicyUnionSerializer(item["network_policy"]),
  };
}

export function toolboxShellContainerAutoEnvironmentDeserializer(
  item: any,
): ToolboxShellContainerAutoEnvironment {
  return {
    type: item["type"],
    file_ids: !item["file_ids"]
      ? item["file_ids"]
      : item["file_ids"].map((p: any) => {
          return p;
        }),
    memory_limit: item["memory_limit"],
    skills: !item["skills"] ? item["skills"] : containerSkillUnionArrayDeserializer(item["skills"]),
    network_policy: !item["network_policy"]
      ? item["network_policy"]
      : toolboxShellNetworkPolicyUnionDeserializer(item["network_policy"]),
  };
}

/** Network access policy for an automatically provisioned toolbox shell container. */
export interface ToolboxShellNetworkPolicy {
  /** The type of network access policy. */
  /** The discriminator possible values: disabled */
  type: string;
}

export function toolboxShellNetworkPolicySerializer(item: ToolboxShellNetworkPolicy): any {
  return { type: item["type"] };
}

export function toolboxShellNetworkPolicyDeserializer(item: any): ToolboxShellNetworkPolicy {
  return {
    type: item["type"],
  };
}

/** Alias for ToolboxShellNetworkPolicyUnion */
export type ToolboxShellNetworkPolicyUnion =
  ToolboxShellNetworkPolicyDisabled | ToolboxShellNetworkPolicy;

export function toolboxShellNetworkPolicyUnionSerializer(
  item: ToolboxShellNetworkPolicyUnion,
): any {
  switch (item.type) {
    case "disabled":
      return toolboxShellNetworkPolicyDisabledSerializer(item as ToolboxShellNetworkPolicyDisabled);

    default:
      return toolboxShellNetworkPolicySerializer(item);
  }
}

export function toolboxShellNetworkPolicyUnionDeserializer(
  item: any,
): ToolboxShellNetworkPolicyUnion {
  switch (item["type"]) {
    case "disabled":
      return toolboxShellNetworkPolicyDisabledDeserializer(
        item as ToolboxShellNetworkPolicyDisabled,
      );

    default:
      return toolboxShellNetworkPolicyDeserializer(item);
  }
}

/** A network policy that disables outbound access from a toolbox shell container. */
export interface ToolboxShellNetworkPolicyDisabled extends ToolboxShellNetworkPolicy {
  /** The type of network access policy. Always `disabled`. */
  type: "disabled";
}

export function toolboxShellNetworkPolicyDisabledSerializer(
  item: ToolboxShellNetworkPolicyDisabled,
): any {
  return { type: item["type"] };
}

export function toolboxShellNetworkPolicyDisabledDeserializer(
  item: any,
): ToolboxShellNetworkPolicyDisabled {
  return {
    type: item["type"],
  };
}

/** An existing container environment for a shell tool stored in a toolbox. */
export interface ToolboxShellContainerReferenceEnvironment extends ToolboxShellEnvironment {
  /** The type of the shell execution environment. Always `container_reference`. */
  type: "container_reference";
  /** The ID of the referenced container. */
  container_id: string;
}

export function toolboxShellContainerReferenceEnvironmentSerializer(
  item: ToolboxShellContainerReferenceEnvironment,
): any {
  return { type: item["type"], container_id: item["container_id"] };
}

export function toolboxShellContainerReferenceEnvironmentDeserializer(
  item: any,
): ToolboxShellContainerReferenceEnvironment {
  return {
    type: item["type"],
    container_id: item["container_id"],
  };
}

/** An A2A tool stored in a toolbox. */
export interface A2AToolboxTool extends ToolboxTool {
  type: "a2a";
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
  /**
   * When `true`, Foundry sends its credentials when fetching the remote
   * agent's Agent Card. The service defaults to `false` if a value is not
   * specified by the caller (anonymous fetch).
   */
  send_credentials_for_agent_card?: boolean;
  /** The A2A protocol version supported by the agent. */
  a2a_version: A2AProtocolVersion;
}

export function a2AToolboxToolSerializer(item: A2AToolboxTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    base_url: item["base_url"],
    agent_card_path: item["agent_card_path"],
    project_connection_id: item["project_connection_id"],
    send_credentials_for_agent_card: item["send_credentials_for_agent_card"],
    a2a_version: item["a2a_version"],
  };
}

export function a2AToolboxToolDeserializer(item: any): A2AToolboxTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
    base_url: item["base_url"],
    agent_card_path: item["agent_card_path"],
    project_connection_id: item["project_connection_id"],
    send_credentials_for_agent_card: item["send_credentials_for_agent_card"],
    a2a_version: item["a2a_version"],
  };
}

/** A WebIQ tool stored in a toolbox. */
export interface WebIQPreviewToolboxTool extends ToolboxTool {
  type: "web_iq_preview";
  /** The ID of the WebIQ project connection. */
  project_connection_id: string;
  /** The label of the WebIQ MCP server to connect to. When omitted, the service defaults to connection name extracted from project_connection_id. */
  server_label?: string;
  /** Whether the agent requires approval before executing actions. When omitted, the service defaults to "always". */
  require_approval?: MCPToolRequireApproval | string;
}

export function webIQPreviewToolboxToolSerializer(item: WebIQPreviewToolboxTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    project_connection_id: item["project_connection_id"],
    server_label: item["server_label"],
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _webIQPreviewToolRequireApprovalSerializer(item["require_approval"]),
  };
}

export function webIQPreviewToolboxToolDeserializer(item: any): WebIQPreviewToolboxTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
    project_connection_id: item["project_connection_id"],
    server_label: item["server_label"],
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _webIQPreviewToolRequireApprovalDeserializer(item["require_approval"]),
  };
}

/** The stable realtime session settings accepted in a `session.update` client event. */
export interface VoiceAgentSessionUpdateConfig {
  /** The session type. Always `realtime`. */
  type: "realtime";
  /** Instructions applied throughout the session. */
  instructions?: string;
  /** The sampling temperature for compatible cascaded pipelines. */
  temperature?: number;
  /** The maximum output-token count for one response. */
  max_output_tokens?: VoiceAgentMaxOutputTokens;
  /** The output modalities enabled for the session. */
  output_modalities?: VoiceOutputModality[];
  /** The input- and output-audio settings for the session. */
  audio?: VoiceAgentAudioConfig;
  /** The avatar settings for the session. */
  avatar?: VoiceAgentSessionAvatarConfig;
  /** Animation settings for the session. */
  animation?: VoiceAgentAnimationConfig;
  /** Tools available to the session. */
  tools?: VoiceAgentToolUnion[];
  /** Tool-selection behavior for the session. */
  tool_choice?: VoiceAgentToolChoice;
  /** Reasoning settings for compatible realtime models. */
  reasoning?: RealtimeReasoning;
  /** Whether the model may call multiple tools in parallel. */
  parallel_tool_calls?: boolean;
  /** Additional fields to include in service outputs. */
  include?: VoiceAgentSessionIncludeOption[];
  /** Up to 16 string key-value pairs attached to the session. */
  metadata?: Record<string, string>;
  /** Interim-response settings for latency and tool execution. */
  interim_response?: VoiceAgentInterimResponseConfigUnion;
  /** A proactive assistant greeting started after session configuration. */
  greeting?: VoiceAgentGreetingConfigUnion;
}

export function voiceAgentSessionUpdateConfigSerializer(item: VoiceAgentSessionUpdateConfig): any {
  return {
    type: item["type"],
    instructions: item["instructions"],
    temperature: item["temperature"],
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : voiceAgentMaxOutputTokensSerializer(item["max_output_tokens"]),
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    audio: !item["audio"] ? item["audio"] : voiceAgentAudioConfigSerializer(item["audio"]),
    avatar: !item["avatar"]
      ? item["avatar"]
      : voiceAgentSessionAvatarConfigSerializer(item["avatar"]),
    animation: !item["animation"]
      ? item["animation"]
      : voiceAgentAnimationConfigSerializer(item["animation"]),
    tools: !item["tools"] ? item["tools"] : voiceAgentToolUnionArraySerializer(item["tools"]),
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : voiceAgentToolChoiceSerializer(item["tool_choice"]),
    reasoning: !item["reasoning"]
      ? item["reasoning"]
      : realtimeReasoningSerializer(item["reasoning"]),
    parallel_tool_calls: item["parallel_tool_calls"],
    include: !item["include"]
      ? item["include"]
      : item["include"].map((p: any) => {
          return p;
        }),
    metadata: item["metadata"],
    interim_response: !item["interim_response"]
      ? item["interim_response"]
      : voiceAgentInterimResponseConfigUnionSerializer(item["interim_response"]),
    greeting: !item["greeting"]
      ? item["greeting"]
      : voiceAgentGreetingConfigUnionSerializer(item["greeting"]),
  };
}

export function voiceAgentSessionUpdateConfigDeserializer(
  item: any,
): VoiceAgentSessionUpdateConfig {
  return {
    type: item["type"],
    instructions: item["instructions"],
    temperature: item["temperature"],
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : voiceAgentMaxOutputTokensDeserializer(item["max_output_tokens"]),
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    audio: !item["audio"] ? item["audio"] : voiceAgentAudioConfigDeserializer(item["audio"]),
    avatar: !item["avatar"]
      ? item["avatar"]
      : voiceAgentSessionAvatarConfigDeserializer(item["avatar"]),
    animation: !item["animation"]
      ? item["animation"]
      : voiceAgentAnimationConfigDeserializer(item["animation"]),
    tools: !item["tools"] ? item["tools"] : voiceAgentToolUnionArrayDeserializer(item["tools"]),
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : voiceAgentToolChoiceDeserializer(item["tool_choice"]),
    reasoning: !item["reasoning"]
      ? item["reasoning"]
      : realtimeReasoningDeserializer(item["reasoning"]),
    parallel_tool_calls: item["parallel_tool_calls"],
    include: !item["include"]
      ? item["include"]
      : item["include"].map((p: any) => {
          return p;
        }),
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    interim_response: !item["interim_response"]
      ? item["interim_response"]
      : voiceAgentInterimResponseConfigUnionDeserializer(item["interim_response"]),
    greeting: !item["greeting"]
      ? item["greeting"]
      : voiceAgentGreetingConfigUnionDeserializer(item["greeting"]),
  };
}

/** Avatar settings accepted by the stable voice-agent WebSocket contract. */
export interface VoiceAgentSessionAvatarConfig extends VoiceAgentAvatarConfig {
  ice_servers?: VoiceAgentAvatarIceServer[];
}

export function voiceAgentSessionAvatarConfigSerializer(item: VoiceAgentSessionAvatarConfig): any {
  return {
    type: item["type"],
    character: item["character"],
    style: item["style"],
    customized: item["customized"],
    output_protocol: item["output_protocol"],
    model: item["model"],
    video: !item["video"] ? item["video"] : voiceAgentAvatarVideoParamsSerializer(item["video"]),
    scene: !item["scene"] ? item["scene"] : voiceAgentAvatarSceneSerializer(item["scene"]),
    output_audit_audio: item["output_audit_audio"],
    ice_servers: !item["ice_servers"]
      ? item["ice_servers"]
      : voiceAgentAvatarIceServerArraySerializer(item["ice_servers"]),
  };
}

export function voiceAgentSessionAvatarConfigDeserializer(
  item: any,
): VoiceAgentSessionAvatarConfig {
  return {
    type: item["type"],
    character: item["character"],
    style: item["style"],
    customized: item["customized"],
    output_protocol: item["output_protocol"],
    model: item["model"],
    video: !item["video"] ? item["video"] : voiceAgentAvatarVideoParamsDeserializer(item["video"]),
    scene: !item["scene"] ? item["scene"] : voiceAgentAvatarSceneDeserializer(item["scene"]),
    output_audit_audio: item["output_audit_audio"],
    ice_servers: !item["ice_servers"]
      ? item["ice_servers"]
      : voiceAgentAvatarIceServerArrayDeserializer(item["ice_servers"]),
  };
}

export function voiceAgentAvatarIceServerArraySerializer(
  result: Array<VoiceAgentAvatarIceServer>,
): any[] {
  return result.map((item) => {
    return voiceAgentAvatarIceServerSerializer(item);
  });
}

export function voiceAgentAvatarIceServerArrayDeserializer(
  result: Array<VoiceAgentAvatarIceServer>,
): any[] {
  return result.map((item) => {
    return voiceAgentAvatarIceServerDeserializer(item);
  });
}

/** An ICE server used for avatar WebRTC negotiation. */
export interface VoiceAgentAvatarIceServer {
  urls: string[];
  username?: string;
  credential?: string;
}

export function voiceAgentAvatarIceServerSerializer(item: VoiceAgentAvatarIceServer): any {
  return {
    urls: item["urls"].map((p: any) => {
      return p;
    }),
    username: item["username"],
    credential: item["credential"],
  };
}

export function voiceAgentAvatarIceServerDeserializer(item: any): VoiceAgentAvatarIceServer {
  return {
    urls: item["urls"].map((p: any) => {
      return p;
    }),
    username: item["username"],
    credential: item["credential"],
  };
}

/** Animation settings for a voice-agent session. */
export interface VoiceAgentAnimationConfig {
  /** The animation model name. */
  model_name?: string;
  /** The requested animation output kinds. */
  outputs?: VoiceAgentAnimationOutputType[];
}

export function voiceAgentAnimationConfigSerializer(item: VoiceAgentAnimationConfig): any {
  return {
    model_name: item["model_name"],
    outputs: !item["outputs"]
      ? item["outputs"]
      : item["outputs"].map((p: any) => {
          return p;
        }),
  };
}

export function voiceAgentAnimationConfigDeserializer(item: any): VoiceAgentAnimationConfig {
  return {
    model_name: item["model_name"],
    outputs: !item["outputs"]
      ? item["outputs"]
      : item["outputs"].map((p: any) => {
          return p;
        }),
  };
}

/** An animation output produced by a voice-agent session. */
export type VoiceAgentAnimationOutputType = "blendshapes" | "viseme_id";

/** Configuration for reasoning-capable Realtime models such as `gpt-realtime-2`. */
export interface RealtimeReasoning {
  effort?: RealtimeReasoningEffort;
}

export function realtimeReasoningSerializer(item: RealtimeReasoning): any {
  return { effort: item["effort"] };
}

export function realtimeReasoningDeserializer(item: any): RealtimeReasoning {
  return {
    effort: item["effort"],
  };
}

/**
 * Constrains effort on reasoning for reasoning-capable Realtime models such as
 * `gpt-realtime-2`.
 */
export type RealtimeReasoningEffort = "minimal" | "low" | "medium" | "high" | "xhigh";

/** The effective stable realtime session settings returned by the voice-agent service. */
export interface VoiceAgentSessionResponseConfig {
  /** The session type. Always `realtime`. */
  type: "realtime";
  /** Instructions applied throughout the session. */
  instructions?: string;
  /** The sampling temperature for compatible cascaded pipelines. */
  temperature?: number;
  /** The maximum output-token count for one response. */
  max_output_tokens?: VoiceAgentMaxOutputTokens;
  /** The output modalities enabled for the session. */
  output_modalities?: VoiceOutputModality[];
  /** The input- and output-audio settings for the session. */
  audio?: VoiceAgentAudioConfig;
  /** The avatar settings for the session. */
  avatar?: VoiceAgentSessionAvatarConfig;
  /** Animation settings for the session. */
  animation?: VoiceAgentAnimationConfig;
  /** Tools available to the session. */
  tools?: VoiceAgentToolUnion[];
  /** Tool-selection behavior for the session. */
  tool_choice?: VoiceAgentToolChoice;
  /** Reasoning settings for compatible realtime models. */
  reasoning?: RealtimeReasoning;
  /** Whether the model may call multiple tools in parallel. */
  parallel_tool_calls?: boolean;
  /** Additional fields to include in service outputs. */
  include?: VoiceAgentSessionIncludeOption[];
  /** Up to 16 string key-value pairs attached to the session. */
  metadata?: Record<string, string>;
  /** Interim-response settings for latency and tool execution. */
  interim_response?: VoiceAgentInterimResponseConfigUnion;
  /** A proactive assistant greeting started after session configuration. */
  greeting?: VoiceAgentGreetingConfigUnion;
  /** The object type. Always `realtime.session`. */
  object: "realtime.session";
  /** The session identifier. */
  id: string;
  /** The selected model. */
  model: string;
  /** The session expiration time as a Unix timestamp in seconds. */
  expires_at?: Date;
}

export function voiceAgentSessionResponseConfigSerializer(
  item: VoiceAgentSessionResponseConfig,
): any {
  return {
    type: item["type"],
    instructions: item["instructions"],
    temperature: item["temperature"],
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : voiceAgentMaxOutputTokensSerializer(item["max_output_tokens"]),
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    audio: !item["audio"] ? item["audio"] : voiceAgentAudioConfigSerializer(item["audio"]),
    avatar: !item["avatar"]
      ? item["avatar"]
      : voiceAgentSessionAvatarConfigSerializer(item["avatar"]),
    animation: !item["animation"]
      ? item["animation"]
      : voiceAgentAnimationConfigSerializer(item["animation"]),
    tools: !item["tools"] ? item["tools"] : voiceAgentToolUnionArraySerializer(item["tools"]),
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : voiceAgentToolChoiceSerializer(item["tool_choice"]),
    reasoning: !item["reasoning"]
      ? item["reasoning"]
      : realtimeReasoningSerializer(item["reasoning"]),
    parallel_tool_calls: item["parallel_tool_calls"],
    include: !item["include"]
      ? item["include"]
      : item["include"].map((p: any) => {
          return p;
        }),
    metadata: item["metadata"],
    interim_response: !item["interim_response"]
      ? item["interim_response"]
      : voiceAgentInterimResponseConfigUnionSerializer(item["interim_response"]),
    greeting: !item["greeting"]
      ? item["greeting"]
      : voiceAgentGreetingConfigUnionSerializer(item["greeting"]),
    object: item["object"],
    id: item["id"],
    model: item["model"],
    expires_at: !item["expires_at"]
      ? item["expires_at"]
      : (item["expires_at"].getTime() / 1000) | 0,
  };
}

export function voiceAgentSessionResponseConfigDeserializer(
  item: any,
): VoiceAgentSessionResponseConfig {
  return {
    type: item["type"],
    instructions: item["instructions"],
    temperature: item["temperature"],
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : voiceAgentMaxOutputTokensDeserializer(item["max_output_tokens"]),
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    audio: !item["audio"] ? item["audio"] : voiceAgentAudioConfigDeserializer(item["audio"]),
    avatar: !item["avatar"]
      ? item["avatar"]
      : voiceAgentSessionAvatarConfigDeserializer(item["avatar"]),
    animation: !item["animation"]
      ? item["animation"]
      : voiceAgentAnimationConfigDeserializer(item["animation"]),
    tools: !item["tools"] ? item["tools"] : voiceAgentToolUnionArrayDeserializer(item["tools"]),
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : voiceAgentToolChoiceDeserializer(item["tool_choice"]),
    reasoning: !item["reasoning"]
      ? item["reasoning"]
      : realtimeReasoningDeserializer(item["reasoning"]),
    parallel_tool_calls: item["parallel_tool_calls"],
    include: !item["include"]
      ? item["include"]
      : item["include"].map((p: any) => {
          return p;
        }),
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    interim_response: !item["interim_response"]
      ? item["interim_response"]
      : voiceAgentInterimResponseConfigUnionDeserializer(item["interim_response"]),
    greeting: !item["greeting"]
      ? item["greeting"]
      : voiceAgentGreetingConfigUnionDeserializer(item["greeting"]),
    object: item["object"],
    id: item["id"],
    model: item["model"],
    expires_at: !item["expires_at"] ? item["expires_at"] : new Date(item["expires_at"] * 1000),
  };
}

/** The `session.avatar.connect` client event. */
export interface VoiceAgentClientEventSessionAvatarConnect extends RealtimeClientEvent {
  /** The event type. Always `session.avatar.connect`. */
  type: "session.avatar.connect";
  /** An optional client-generated event identifier. */
  event_id?: string;
  /** The client's SDP offer for avatar media negotiation. */
  client_sdp: string;
}

export function voiceAgentClientEventSessionAvatarConnectSerializer(
  item: VoiceAgentClientEventSessionAvatarConnect,
): any {
  return { type: item["type"], event_id: item["event_id"], client_sdp: item["client_sdp"] };
}

export function voiceAgentClientEventSessionAvatarConnectDeserializer(
  item: any,
): VoiceAgentClientEventSessionAvatarConnect {
  return {
    type: item["type"],
    event_id: item["event_id"],
    client_sdp: item["client_sdp"],
  };
}

/** A realtime client event. */
export interface RealtimeClientEvent {
  type: RealtimeClientEventType;
}

export function realtimeClientEventSerializer(item: RealtimeClientEvent): any {
  return { type: item["type"] };
}

export function realtimeClientEventDeserializer(item: any): RealtimeClientEvent {
  return {
    type: item["type"],
  };
}

/** Alias for RealtimeClientEventUnion */
export type RealtimeClientEventUnion =
  | RealtimeClientEventConversationItemCreate
  | RealtimeClientEventConversationItemDelete
  | RealtimeClientEventConversationItemRetrieve
  | RealtimeClientEventConversationItemTruncate
  | RealtimeClientEventInputAudioBufferAppend
  | RealtimeClientEventInputAudioBufferClear
  | RealtimeClientEventOutputAudioBufferClear
  | RealtimeClientEventInputAudioBufferCommit
  | RealtimeClientEventResponseCancel
  | RealtimeClientEventResponseCreate
  | VoiceAgentClientEventSessionAvatarConnect
  | RealtimeClientEvent;

export function realtimeClientEventUnionSerializer(item: RealtimeClientEventUnion): any {
  switch (item.type) {
    case "conversation.item.create":
      return realtimeClientEventConversationItemCreateSerializer(
        item as RealtimeClientEventConversationItemCreate,
      );

    case "conversation.item.delete":
      return realtimeClientEventConversationItemDeleteSerializer(
        item as RealtimeClientEventConversationItemDelete,
      );

    case "conversation.item.retrieve":
      return realtimeClientEventConversationItemRetrieveSerializer(
        item as RealtimeClientEventConversationItemRetrieve,
      );

    case "conversation.item.truncate":
      return realtimeClientEventConversationItemTruncateSerializer(
        item as RealtimeClientEventConversationItemTruncate,
      );

    case "input_audio_buffer.append":
      return realtimeClientEventInputAudioBufferAppendSerializer(
        item as RealtimeClientEventInputAudioBufferAppend,
      );

    case "input_audio_buffer.clear":
      return realtimeClientEventInputAudioBufferClearSerializer(
        item as RealtimeClientEventInputAudioBufferClear,
      );

    case "output_audio_buffer.clear":
      return realtimeClientEventOutputAudioBufferClearSerializer(
        item as RealtimeClientEventOutputAudioBufferClear,
      );

    case "input_audio_buffer.commit":
      return realtimeClientEventInputAudioBufferCommitSerializer(
        item as RealtimeClientEventInputAudioBufferCommit,
      );

    case "response.cancel":
      return realtimeClientEventResponseCancelSerializer(item as RealtimeClientEventResponseCancel);

    case "response.create":
      return realtimeClientEventResponseCreateSerializer(item as RealtimeClientEventResponseCreate);

    case "session.avatar.connect":
      return voiceAgentClientEventSessionAvatarConnectSerializer(
        item as VoiceAgentClientEventSessionAvatarConnect,
      );

    default:
      return realtimeClientEventSerializer(item);
  }
}

export function realtimeClientEventUnionDeserializer(item: any): RealtimeClientEventUnion {
  switch (item["type"]) {
    case "conversation.item.create":
      return realtimeClientEventConversationItemCreateDeserializer(
        item as RealtimeClientEventConversationItemCreate,
      );

    case "conversation.item.delete":
      return realtimeClientEventConversationItemDeleteDeserializer(
        item as RealtimeClientEventConversationItemDelete,
      );

    case "conversation.item.retrieve":
      return realtimeClientEventConversationItemRetrieveDeserializer(
        item as RealtimeClientEventConversationItemRetrieve,
      );

    case "conversation.item.truncate":
      return realtimeClientEventConversationItemTruncateDeserializer(
        item as RealtimeClientEventConversationItemTruncate,
      );

    case "input_audio_buffer.append":
      return realtimeClientEventInputAudioBufferAppendDeserializer(
        item as RealtimeClientEventInputAudioBufferAppend,
      );

    case "input_audio_buffer.clear":
      return realtimeClientEventInputAudioBufferClearDeserializer(
        item as RealtimeClientEventInputAudioBufferClear,
      );

    case "output_audio_buffer.clear":
      return realtimeClientEventOutputAudioBufferClearDeserializer(
        item as RealtimeClientEventOutputAudioBufferClear,
      );

    case "input_audio_buffer.commit":
      return realtimeClientEventInputAudioBufferCommitDeserializer(
        item as RealtimeClientEventInputAudioBufferCommit,
      );

    case "response.cancel":
      return realtimeClientEventResponseCancelDeserializer(
        item as RealtimeClientEventResponseCancel,
      );

    case "response.create":
      return realtimeClientEventResponseCreateDeserializer(
        item as RealtimeClientEventResponseCreate,
      );

    case "session.avatar.connect":
      return voiceAgentClientEventSessionAvatarConnectDeserializer(
        item as VoiceAgentClientEventSessionAvatarConnect,
      );

    default:
      return realtimeClientEventDeserializer(item);
  }
}

/** Type of RealtimeClientEventType */
export type RealtimeClientEventType =
  | "conversation.item.create"
  | "conversation.item.delete"
  | "conversation.item.retrieve"
  | "conversation.item.truncate"
  | "input_audio_buffer.append"
  | "input_audio_buffer.clear"
  | "output_audio_buffer.clear"
  | "input_audio_buffer.commit"
  | "response.cancel"
  | "response.create"
  | "session.update"
  | "session.avatar.connect";

/**
 * Add a new Item to the Conversation's context, including messages, function
 * calls, and function call responses. This event can be used both to populate a
 * "history" of the conversation and to add new items mid-stream, but has the
 * current limitation that it cannot populate assistant audio messages.
 * If successful, the server will respond with a `conversation.item.created`
 * event, otherwise an `error` event will be sent.
 */
export interface RealtimeClientEventConversationItemCreate extends RealtimeClientEvent {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `conversation.item.create`. */
  type: "conversation.item.create";
  /**
   * The ID of the preceding item after which the new item will be inserted. If not set, the new item will be appended to the end of the conversation.
   *   If set to `root`, the new item will be added to the beginning of the conversation.
   *   If set to an existing ID, it allows an item to be inserted mid-conversation. If the ID cannot be found, an error will be returned and the item will not be added.
   */
  previous_item_id?: string;
  item: RealtimeConversationItemUnion;
}

export function realtimeClientEventConversationItemCreateSerializer(
  item: RealtimeClientEventConversationItemCreate,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    previous_item_id: item["previous_item_id"],
    item: realtimeConversationItemUnionSerializer(item["item"]),
  };
}

export function realtimeClientEventConversationItemCreateDeserializer(
  item: any,
): RealtimeClientEventConversationItemCreate {
  return {
    type: item["type"],
    event_id: item["event_id"],
    previous_item_id: item["previous_item_id"],
    item: realtimeConversationItemUnionDeserializer(item["item"]),
  };
}

/**
 * Send this event when you want to remove any item from the conversation
 * history. The server will respond with a `conversation.item.deleted` event,
 * unless the item does not exist in the conversation history, in which case the
 * server will respond with an error.
 */
export interface RealtimeClientEventConversationItemDelete extends RealtimeClientEvent {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `conversation.item.delete`. */
  type: "conversation.item.delete";
  /** The ID of the item to delete. */
  item_id: string;
}

export function realtimeClientEventConversationItemDeleteSerializer(
  item: RealtimeClientEventConversationItemDelete,
): any {
  return { type: item["type"], event_id: item["event_id"], item_id: item["item_id"] };
}

export function realtimeClientEventConversationItemDeleteDeserializer(
  item: any,
): RealtimeClientEventConversationItemDelete {
  return {
    type: item["type"],
    event_id: item["event_id"],
    item_id: item["item_id"],
  };
}

/**
 * Send this event when you want to retrieve the server's representation of a specific item in the conversation history. This is useful, for example, to inspect user audio after noise cancellation and VAD.
 * The server will respond with a `conversation.item.retrieved` event,
 * unless the item does not exist in the conversation history, in which case the
 * server will respond with an error.
 */
export interface RealtimeClientEventConversationItemRetrieve extends RealtimeClientEvent {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `conversation.item.retrieve`. */
  type: "conversation.item.retrieve";
  /** The ID of the item to retrieve. */
  item_id: string;
}

export function realtimeClientEventConversationItemRetrieveSerializer(
  item: RealtimeClientEventConversationItemRetrieve,
): any {
  return { type: item["type"], event_id: item["event_id"], item_id: item["item_id"] };
}

export function realtimeClientEventConversationItemRetrieveDeserializer(
  item: any,
): RealtimeClientEventConversationItemRetrieve {
  return {
    type: item["type"],
    event_id: item["event_id"],
    item_id: item["item_id"],
  };
}

/**
 * Send this event to truncate a previous assistant message’s audio. The server
 * will produce audio faster than realtime, so this event is useful when the user
 * interrupts to truncate audio that has already been sent to the client but not
 * yet played. This will synchronize the server's understanding of the audio with
 * the client's playback.
 * Truncating audio will delete the server-side text transcript to ensure there
 * is not text in the context that hasn't been heard by the user.
 * If successful, the server will respond with a `conversation.item.truncated`
 * event.
 */
export interface RealtimeClientEventConversationItemTruncate extends RealtimeClientEvent {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `conversation.item.truncate`. */
  type: "conversation.item.truncate";
  /**
   * The ID of the assistant message item to truncate. Only assistant message
   *   items can be truncated.
   */
  item_id: string;
  /** The index of the content part to truncate. Set this to `0`. */
  content_index: number;
  /**
   * Inclusive duration up to which audio is truncated, in milliseconds. If
   *   the audio_end_ms is greater than the actual audio duration, the server
   *   will respond with an error.
   */
  audio_end_ms: number;
}

export function realtimeClientEventConversationItemTruncateSerializer(
  item: RealtimeClientEventConversationItemTruncate,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    audio_end_ms: item["audio_end_ms"],
  };
}

export function realtimeClientEventConversationItemTruncateDeserializer(
  item: any,
): RealtimeClientEventConversationItemTruncate {
  return {
    type: item["type"],
    event_id: item["event_id"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    audio_end_ms: item["audio_end_ms"],
  };
}

/**
 * Send this event to append audio bytes to the input audio buffer. The audio
 * buffer is temporary storage you can write to and later commit. A "commit" will create a new
 * user message item in the conversation history from the buffer content and clear the buffer.
 * Input audio transcription (if enabled) will be generated when the buffer is committed.
 * If VAD is enabled the audio buffer is used to detect speech and the server will decide
 * when to commit. When Server VAD is disabled, you must commit the audio buffer
 * manually. Input audio noise reduction operates on writes to the audio buffer.
 * The client may choose how much audio to place in each event up to a maximum
 * of 15 MiB, for example streaming smaller chunks from the client may allow the
 * VAD to be more responsive. Unlike most other client events, the server will
 * not send a confirmation response to this event.
 */
export interface RealtimeClientEventInputAudioBufferAppend extends RealtimeClientEvent {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `input_audio_buffer.append`. */
  type: "input_audio_buffer.append";
  /**
   * Base64-encoded audio bytes. This must be in the format specified by the
   *   `input_audio_format` field in the session configuration.
   */
  audio: string;
}

export function realtimeClientEventInputAudioBufferAppendSerializer(
  item: RealtimeClientEventInputAudioBufferAppend,
): any {
  return { type: item["type"], event_id: item["event_id"], audio: item["audio"] };
}

export function realtimeClientEventInputAudioBufferAppendDeserializer(
  item: any,
): RealtimeClientEventInputAudioBufferAppend {
  return {
    type: item["type"],
    event_id: item["event_id"],
    audio: item["audio"],
  };
}

/**
 * Send this event to clear the audio bytes in the buffer. The server will
 * respond with an `input_audio_buffer.cleared` event.
 */
export interface RealtimeClientEventInputAudioBufferClear extends RealtimeClientEvent {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `input_audio_buffer.clear`. */
  type: "input_audio_buffer.clear";
}

export function realtimeClientEventInputAudioBufferClearSerializer(
  item: RealtimeClientEventInputAudioBufferClear,
): any {
  return { type: item["type"], event_id: item["event_id"] };
}

export function realtimeClientEventInputAudioBufferClearDeserializer(
  item: any,
): RealtimeClientEventInputAudioBufferClear {
  return {
    type: item["type"],
    event_id: item["event_id"],
  };
}

/**
 * **WebRTC/SIP Only:** Emit to cut off the current audio response. This will trigger the server to
 * stop generating audio and emit a `output_audio_buffer.cleared` event. This
 * event should be preceded by a `response.cancel` client event to stop the
 * generation of the current response.
 * [Learn more](/docs/guides/realtime-conversations#client-and-server-events-for-audio-in-webrtc).
 */
export interface RealtimeClientEventOutputAudioBufferClear extends RealtimeClientEvent {
  /** The unique ID of the client event used for error handling. */
  event_id?: string;
  /** The event type, must be `output_audio_buffer.clear`. */
  type: "output_audio_buffer.clear";
}

export function realtimeClientEventOutputAudioBufferClearSerializer(
  item: RealtimeClientEventOutputAudioBufferClear,
): any {
  return { type: item["type"], event_id: item["event_id"] };
}

export function realtimeClientEventOutputAudioBufferClearDeserializer(
  item: any,
): RealtimeClientEventOutputAudioBufferClear {
  return {
    type: item["type"],
    event_id: item["event_id"],
  };
}

/**
 * Send this event to commit the user input audio buffer, which will create a  new user message item in the conversation. This event will produce an error  if the input audio buffer is empty. When in Server VAD mode, the client does  not need to send this event, the server will commit the audio buffer  automatically.
 * Committing the input audio buffer will trigger input audio transcription  (if enabled in session configuration), but it will not create a response  from the model. The server will respond with an `input_audio_buffer.committed` event.
 */
export interface RealtimeClientEventInputAudioBufferCommit extends RealtimeClientEvent {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `input_audio_buffer.commit`. */
  type: "input_audio_buffer.commit";
}

export function realtimeClientEventInputAudioBufferCommitSerializer(
  item: RealtimeClientEventInputAudioBufferCommit,
): any {
  return { type: item["type"], event_id: item["event_id"] };
}

export function realtimeClientEventInputAudioBufferCommitDeserializer(
  item: any,
): RealtimeClientEventInputAudioBufferCommit {
  return {
    type: item["type"],
    event_id: item["event_id"],
  };
}

/**
 * Send this event to cancel an in-progress response. The server will respond
 * with a `response.done` event with a status of `response.status=cancelled`. If
 * there is no response to cancel, the server will respond with an error. It's safe
 * to call `response.cancel` even if no response is in progress, an error will be
 * returned the session will remain unaffected.
 */
export interface RealtimeClientEventResponseCancel extends RealtimeClientEvent {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `response.cancel`. */
  type: "response.cancel";
  /**
   * A specific response ID to cancel - if not provided, will cancel an
   *   in-progress response in the default conversation.
   */
  response_id?: string;
}

export function realtimeClientEventResponseCancelSerializer(
  item: RealtimeClientEventResponseCancel,
): any {
  return { type: item["type"], event_id: item["event_id"], response_id: item["response_id"] };
}

export function realtimeClientEventResponseCancelDeserializer(
  item: any,
): RealtimeClientEventResponseCancel {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
  };
}

/**
 * This event instructs the server to create a Response, which means triggering
 * model inference. When in Server VAD mode, the server will create Responses
 * automatically.
 * A Response will include at least one Item, and may have two, in which case
 * the second will be a function call. These Items will be appended to the
 * conversation history by default.
 * The server will respond with a `response.created` event, events for Items
 * and content created, and finally a `response.done` event to indicate the
 * Response is complete.
 * The `response.create` event includes inference configuration like
 * `instructions` and `tools`. If these are set, they will override the Session's
 * configuration for this Response only.
 * Responses can be created out-of-band of the default Conversation, meaning that they can
 * have arbitrary input, and it's possible to disable writing the output to the Conversation.
 * Only one Response can write to the default Conversation at a time, but otherwise multiple
 * Responses can be created in parallel. The `metadata` field is a good way to disambiguate
 * multiple simultaneous Responses.
 * Clients can set `conversation` to `none` to create a Response that does not write to the default
 * Conversation. Arbitrary input can be provided with the `input` field, which is an array accepting
 * raw Items and references to existing Items.
 */
export interface RealtimeClientEventResponseCreate extends RealtimeClientEvent {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `response.create`. */
  type: "response.create";
  response?: VoiceAgentResponseCreateParams;
}

export function realtimeClientEventResponseCreateSerializer(
  item: RealtimeClientEventResponseCreate,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response: !item["response"]
      ? item["response"]
      : voiceAgentResponseCreateParamsSerializer(item["response"]),
  };
}

export function realtimeClientEventResponseCreateDeserializer(
  item: any,
): RealtimeClientEventResponseCreate {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response: !item["response"]
      ? item["response"]
      : voiceAgentResponseCreateParamsDeserializer(item["response"]),
  };
}

/** Parameters accepted by a voice-agent `response.create` event. */
export interface VoiceAgentResponseCreateParams {
  /**
   * The default system instructions (i.e. system message) prepended to model calls. This field allows the client to guide the model on desired responses. The model can be instructed on response content and format, (e.g. "be extremely succinct", "act friendly", "here are examples of good responses") and on audio behavior (e.g. "talk quickly", "inject emotion into your voice", "laugh frequently"). The instructions are not guaranteed to be followed by the model, but they provide guidance to the model on the desired behavior.
   *   Note that the server sets default instructions which will be used if this field is not set and are visible in the `session.created` event at the start of the session.
   */
  instructions?: string;
  /** Tools available to the model. */
  tools?: (RealtimeFunctionTool | MCPTool)[];
  /**
   * How the model chooses tools. Provide one of the string modes or force a specific
   *   function/MCP tool.
   */
  tool_choice?: ToolChoiceOptions | ToolChoiceFunction | ToolChoiceMCP;
  /**
   * Whether the model may call multiple tools in parallel. Only supported by
   *   reasoning Realtime models such as `gpt-realtime-2`.
   */
  parallel_tool_calls?: boolean;
  reasoning?: RealtimeReasoning;
  /**
   * Maximum number of output tokens for a single assistant response,
   *   inclusive of tool calls. Provide an integer between 1 and 4096 to
   *   limit output tokens, or `inf` for the maximum available tokens for a
   *   given model. Defaults to `inf`.
   */
  max_output_tokens?: number | "inf";
  /**
   * Controls which conversation the response is added to. Currently supports
   *   `auto` and `none`, with `auto` as the default value. The `auto` value
   *   means that the contents of the response will be added to the default
   *   conversation. Set this to `none` to create an out-of-band response which
   *   will not add items to default conversation.
   */
  conversation?: "auto" | "none";
  metadata?: Metadata;
  /** Modalities that the response may return. */
  output_modalities?: VoiceOutputModality[];
  /** Response-specific audio settings. */
  audio?: PickPropertiesVoiceAgentAudioConfig;
  /** Conversation items used as inline response input. */
  input?: RealtimeConversationItemUnion[];
  /** A pre-generated assistant message used to begin the response. */
  pre_generated_assistant_message?: RealtimeConversationItemUnion;
  /** Interim-response settings for this response. */
  interim_response?: VoiceAgentInterimResponseConfigUnion;
}

export function voiceAgentResponseCreateParamsSerializer(
  item: VoiceAgentResponseCreateParams,
): any {
  return {
    instructions: item["instructions"],
    tools: !item["tools"]
      ? item["tools"]
      : _voiceAgentResponseCreateParamsToolArraySerializer(item["tools"]),
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : _voiceAgentResponseCreateParamsToolChoiceSerializer(item["tool_choice"]),
    parallel_tool_calls: item["parallel_tool_calls"],
    reasoning: !item["reasoning"]
      ? item["reasoning"]
      : realtimeReasoningSerializer(item["reasoning"]),
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : _voiceAgentResponseCreateParamsMaxOutputTokensSerializer(item["max_output_tokens"]),
    conversation: item["conversation"],
    metadata: !item["metadata"] ? item["metadata"] : metadataSerializer(item["metadata"]),
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    audio: !item["audio"]
      ? item["audio"]
      : pickPropertiesVoiceAgentAudioConfigSerializer(item["audio"]),
    input: !item["input"]
      ? item["input"]
      : realtimeConversationItemUnionArraySerializer(item["input"]),
    pre_generated_assistant_message: !item["pre_generated_assistant_message"]
      ? item["pre_generated_assistant_message"]
      : realtimeConversationItemUnionSerializer(item["pre_generated_assistant_message"]),
    interim_response: !item["interim_response"]
      ? item["interim_response"]
      : voiceAgentInterimResponseConfigUnionSerializer(item["interim_response"]),
  };
}

export function voiceAgentResponseCreateParamsDeserializer(
  item: any,
): VoiceAgentResponseCreateParams {
  return {
    instructions: item["instructions"],
    tools: !item["tools"]
      ? item["tools"]
      : _voiceAgentResponseCreateParamsToolArrayDeserializer(item["tools"]),
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : _voiceAgentResponseCreateParamsToolChoiceDeserializer(item["tool_choice"]),
    parallel_tool_calls: item["parallel_tool_calls"],
    reasoning: !item["reasoning"]
      ? item["reasoning"]
      : realtimeReasoningDeserializer(item["reasoning"]),
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : _voiceAgentResponseCreateParamsMaxOutputTokensDeserializer(item["max_output_tokens"]),
    conversation: item["conversation"],
    metadata: !item["metadata"] ? item["metadata"] : metadataDeserializer(item["metadata"]),
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    audio: !item["audio"]
      ? item["audio"]
      : pickPropertiesVoiceAgentAudioConfigDeserializer(item["audio"]),
    input: !item["input"]
      ? item["input"]
      : realtimeConversationItemUnionArrayDeserializer(item["input"]),
    pre_generated_assistant_message: !item["pre_generated_assistant_message"]
      ? item["pre_generated_assistant_message"]
      : realtimeConversationItemUnionDeserializer(item["pre_generated_assistant_message"]),
    interim_response: !item["interim_response"]
      ? item["interim_response"]
      : voiceAgentInterimResponseConfigUnionDeserializer(item["interim_response"]),
  };
}

export function _voiceAgentResponseCreateParamsToolArraySerializer(
  result: Array<_VoiceAgentResponseCreateParamsTool>,
): any[] {
  return result.map((item) => {
    return _voiceAgentResponseCreateParamsToolSerializer(item);
  });
}

export function _voiceAgentResponseCreateParamsToolArrayDeserializer(
  result: Array<_VoiceAgentResponseCreateParamsTool>,
): any[] {
  return result.map((item) => {
    return _voiceAgentResponseCreateParamsToolDeserializer(item);
  });
}

/** Alias for _VoiceAgentResponseCreateParamsTool */
export type _VoiceAgentResponseCreateParamsTool = RealtimeFunctionTool | MCPTool;

export function _voiceAgentResponseCreateParamsToolSerializer(
  item: _VoiceAgentResponseCreateParamsTool,
): any {
  return item;
}

export function _voiceAgentResponseCreateParamsToolDeserializer(
  item: any,
): _VoiceAgentResponseCreateParamsTool {
  return item;
}

/** model interface RealtimeFunctionTool */
export interface RealtimeFunctionTool {
  /** The type of the tool, i.e. `function`. */
  type?: "function";
  /** The name of the function. */
  name?: string;
  /**
   * The description of the function, including guidance on when and how
   *   to call it, and guidance about what to tell the user when calling
   *   (if anything).
   */
  description?: string;
  /** Parameters of the function in JSON Schema. */
  parameters?: RealtimeFunctionToolParameters;
}

export function realtimeFunctionToolSerializer(item: RealtimeFunctionTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : realtimeFunctionToolParametersSerializer(item["parameters"]),
  };
}

export function realtimeFunctionToolDeserializer(item: any): RealtimeFunctionTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : realtimeFunctionToolParametersDeserializer(item["parameters"]),
  };
}

/** Alias for _VoiceAgentResponseCreateParamsToolChoice */
export type _VoiceAgentResponseCreateParamsToolChoice =
  ToolChoiceOptions | ToolChoiceFunction | ToolChoiceMCP;

export function _voiceAgentResponseCreateParamsToolChoiceSerializer(
  item: _VoiceAgentResponseCreateParamsToolChoice,
): any {
  return item;
}

export function _voiceAgentResponseCreateParamsToolChoiceDeserializer(
  item: any,
): _VoiceAgentResponseCreateParamsToolChoice {
  return item;
}

/**
 * Controls which (if any) tool is called by the model.
 * `none` means the model will not call any tool and instead generates a message.
 * `auto` means the model can pick between generating a message or calling one or
 * more tools.
 * `required` means the model must call one or more tools.
 */
export type ToolChoiceOptions = "none" | "auto" | "required";

/** Alias for _VoiceAgentResponseCreateParamsMaxOutputTokens */
export type _VoiceAgentResponseCreateParamsMaxOutputTokens = number | "inf";

export function _voiceAgentResponseCreateParamsMaxOutputTokensSerializer(
  item: _VoiceAgentResponseCreateParamsMaxOutputTokens,
): any {
  return item;
}

export function _voiceAgentResponseCreateParamsMaxOutputTokensDeserializer(
  item: any,
): _VoiceAgentResponseCreateParamsMaxOutputTokens {
  return item;
}

/**
 * Set of 16 key-value pairs that can be attached to an object. This can be
 * useful for storing additional information about the object in a structured
 * format, and querying for objects via API or the dashboard.
 * Keys are strings with a maximum length of 64 characters. Values are strings
 * with a maximum length of 512 characters.
 */
export interface Metadata {
  /** Additional properties */
  additionalProperties?: Record<string, string>;
}

export function metadataSerializer(item: Metadata): any {
  return { ...serializeRecord(item.additionalProperties ?? {}) };
}

export function metadataDeserializer(item: any): Metadata {
  return {
    additionalProperties: serializeRecord(item, []),
  };
}

/** The template for picking properties. */
export interface PickPropertiesVoiceAgentAudioConfig {
  /** Output (agent speech) audio configuration. */
  output?: VoiceAgentAudioOutputConfig;
}

export function pickPropertiesVoiceAgentAudioConfigSerializer(
  item: PickPropertiesVoiceAgentAudioConfig,
): any {
  return {
    output: !item["output"]
      ? item["output"]
      : voiceAgentAudioOutputConfigSerializer(item["output"]),
  };
}

export function pickPropertiesVoiceAgentAudioConfigDeserializer(
  item: any,
): PickPropertiesVoiceAgentAudioConfig {
  return {
    output: !item["output"]
      ? item["output"]
      : voiceAgentAudioOutputConfigDeserializer(item["output"]),
  };
}

/** The `session.update` client event. */
export interface VoiceAgentClientEventSessionUpdate {
  /** Optional client-generated ID used to identify this event. This is an arbitrary string that a client may assign. It will be passed back if there is an error with the event, but the corresponding `session.updated` event will not include it. */
  event_id?: string;
  /** The event type, must be `session.update`. */
  type: "session.update";
  /** The voice-agent session settings to update. */
  session: VoiceAgentSessionUpdate;
}

export function voiceAgentClientEventSessionUpdateSerializer(
  item: VoiceAgentClientEventSessionUpdate,
): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    session: voiceAgentSessionUpdateSerializer(item["session"]),
  };
}

export function voiceAgentClientEventSessionUpdateDeserializer(
  item: any,
): VoiceAgentClientEventSessionUpdate {
  return {
    event_id: item["event_id"],
    type: item["type"],
    session: voiceAgentSessionUpdateDeserializer(item["session"]),
  };
}

/** The session configuration accepted by a voice-agent session update event. */
export type VoiceAgentSessionUpdate = VoiceAgentSessionUpdateConfig;

export function voiceAgentSessionUpdateSerializer(item: VoiceAgentSessionUpdate): any {
  return item;
}

export function voiceAgentSessionUpdateDeserializer(item: any): VoiceAgentSessionUpdate {
  return item;
}

/** Details of a non-fatal warning. */
export interface VoiceAgentServerEventWarningDetails {
  message: string;
  code?: string;
  param?: string;
}

export function voiceAgentServerEventWarningDetailsSerializer(
  item: VoiceAgentServerEventWarningDetails,
): any {
  return { message: item["message"], code: item["code"], param: item["param"] };
}

export function voiceAgentServerEventWarningDetailsDeserializer(
  item: any,
): VoiceAgentServerEventWarningDetails {
  return {
    message: item["message"],
    code: item["code"],
    param: item["param"],
  };
}

/** The `session.avatar.connecting` server event. */
export interface VoiceAgentServerEventSessionAvatarConnecting extends RealtimeServerEvent {
  type: "session.avatar.connecting";
  event_id: string;
  /** The server's SDP answer for avatar media negotiation. */
  server_sdp: string;
}

export function voiceAgentServerEventSessionAvatarConnectingSerializer(
  item: VoiceAgentServerEventSessionAvatarConnecting,
): any {
  return { type: item["type"], event_id: item["event_id"], server_sdp: item["server_sdp"] };
}

export function voiceAgentServerEventSessionAvatarConnectingDeserializer(
  item: any,
): VoiceAgentServerEventSessionAvatarConnecting {
  return {
    type: item["type"],
    event_id: item["event_id"],
    server_sdp: item["server_sdp"],
  };
}

/** A realtime server event. */
export interface RealtimeServerEvent {
  type: RealtimeServerEventType;
}

export function realtimeServerEventSerializer(item: RealtimeServerEvent): any {
  return { type: item["type"] };
}

export function realtimeServerEventDeserializer(item: any): RealtimeServerEvent {
  return {
    type: item["type"],
  };
}

/** Alias for RealtimeServerEventUnion */
export type RealtimeServerEventUnion =
  | RealtimeServerEventConversationItemCreated
  | RealtimeServerEventConversationItemDeleted
  | RealtimeServerEventConversationItemInputAudioTranscriptionCompleted
  | RealtimeServerEventConversationItemInputAudioTranscriptionDelta
  | RealtimeServerEventConversationItemInputAudioTranscriptionFailed
  | RealtimeServerEventConversationItemRetrieved
  | RealtimeServerEventConversationItemTruncated
  | RealtimeServerEventInputAudioBufferCleared
  | RealtimeServerEventInputAudioBufferCommitted
  | RealtimeServerEventInputAudioBufferSpeechStarted
  | RealtimeServerEventInputAudioBufferSpeechStopped
  | RealtimeServerEventRateLimitsUpdated
  | RealtimeServerEventResponseAudioDelta
  | RealtimeServerEventResponseAudioDone
  | RealtimeServerEventResponseAudioTranscriptDelta
  | RealtimeServerEventResponseAudioTranscriptDone
  | RealtimeServerEventResponseContentPartAdded
  | RealtimeServerEventResponseContentPartDone
  | RealtimeServerEventResponseCreated
  | RealtimeServerEventResponseDone
  | RealtimeServerEventResponseFunctionCallArgumentsDelta
  | RealtimeServerEventResponseFunctionCallArgumentsDone
  | RealtimeServerEventResponseOutputItemAdded
  | RealtimeServerEventResponseOutputItemDone
  | RealtimeServerEventResponseTextDelta
  | RealtimeServerEventResponseTextDone
  | RealtimeServerEventSessionCreated
  | RealtimeServerEventSessionUpdated
  | RealtimeServerEventOutputAudioBufferCleared
  | RealtimeServerEventConversationItemAdded
  | RealtimeServerEventConversationItemDone
  | RealtimeServerEventInputAudioBufferTimeoutTriggered
  | RealtimeServerEventConversationItemInputAudioTranscriptionSegment
  | RealtimeServerEventMCPListToolsInProgress
  | RealtimeServerEventMCPListToolsCompleted
  | RealtimeServerEventMCPListToolsFailed
  | RealtimeServerEventResponseMCPCallArgumentsDelta
  | RealtimeServerEventResponseMCPCallArgumentsDone
  | RealtimeServerEventResponseMCPCallInProgress
  | RealtimeServerEventResponseMCPCallCompleted
  | RealtimeServerEventResponseMCPCallFailed
  | VoiceAgentServerEventWarning
  | VoiceAgentServerEventSessionAvatarConnecting
  | VoiceAgentServerEventSessionAvatarSwitchToSpeaking
  | VoiceAgentServerEventSessionAvatarSwitchToIdle
  | VoiceAgentServerEventResponseAudioTimestampDelta
  | VoiceAgentServerEventResponseAudioTimestampDone
  | VoiceAgentServerEventResponseAnimationBlendshapesDelta
  | VoiceAgentServerEventResponseAnimationBlendshapesDone
  | VoiceAgentServerEventResponseAnimationVisemeDelta
  | VoiceAgentServerEventResponseAnimationVisemeDone
  | VoiceAgentServerEventResponseVideoDelta
  | RealtimeServerEvent;

export function realtimeServerEventUnionSerializer(item: RealtimeServerEventUnion): any {
  switch (item.type) {
    case "conversation.item.created":
      return realtimeServerEventConversationItemCreatedSerializer(
        item as RealtimeServerEventConversationItemCreated,
      );

    case "conversation.item.deleted":
      return realtimeServerEventConversationItemDeletedSerializer(
        item as RealtimeServerEventConversationItemDeleted,
      );

    case "conversation.item.input_audio_transcription.completed":
      return realtimeServerEventConversationItemInputAudioTranscriptionCompletedSerializer(
        item as RealtimeServerEventConversationItemInputAudioTranscriptionCompleted,
      );

    case "conversation.item.input_audio_transcription.delta":
      return realtimeServerEventConversationItemInputAudioTranscriptionDeltaSerializer(
        item as RealtimeServerEventConversationItemInputAudioTranscriptionDelta,
      );

    case "conversation.item.input_audio_transcription.failed":
      return realtimeServerEventConversationItemInputAudioTranscriptionFailedSerializer(
        item as RealtimeServerEventConversationItemInputAudioTranscriptionFailed,
      );

    case "conversation.item.retrieved":
      return realtimeServerEventConversationItemRetrievedSerializer(
        item as RealtimeServerEventConversationItemRetrieved,
      );

    case "conversation.item.truncated":
      return realtimeServerEventConversationItemTruncatedSerializer(
        item as RealtimeServerEventConversationItemTruncated,
      );

    case "input_audio_buffer.cleared":
      return realtimeServerEventInputAudioBufferClearedSerializer(
        item as RealtimeServerEventInputAudioBufferCleared,
      );

    case "input_audio_buffer.committed":
      return realtimeServerEventInputAudioBufferCommittedSerializer(
        item as RealtimeServerEventInputAudioBufferCommitted,
      );

    case "input_audio_buffer.speech_started":
      return realtimeServerEventInputAudioBufferSpeechStartedSerializer(
        item as RealtimeServerEventInputAudioBufferSpeechStarted,
      );

    case "input_audio_buffer.speech_stopped":
      return realtimeServerEventInputAudioBufferSpeechStoppedSerializer(
        item as RealtimeServerEventInputAudioBufferSpeechStopped,
      );

    case "rate_limits.updated":
      return realtimeServerEventRateLimitsUpdatedSerializer(
        item as RealtimeServerEventRateLimitsUpdated,
      );

    case "response.output_audio.delta":
      return realtimeServerEventResponseAudioDeltaSerializer(
        item as RealtimeServerEventResponseAudioDelta,
      );

    case "response.output_audio.done":
      return realtimeServerEventResponseAudioDoneSerializer(
        item as RealtimeServerEventResponseAudioDone,
      );

    case "response.output_audio_transcript.delta":
      return realtimeServerEventResponseAudioTranscriptDeltaSerializer(
        item as RealtimeServerEventResponseAudioTranscriptDelta,
      );

    case "response.output_audio_transcript.done":
      return realtimeServerEventResponseAudioTranscriptDoneSerializer(
        item as RealtimeServerEventResponseAudioTranscriptDone,
      );

    case "response.content_part.added":
      return realtimeServerEventResponseContentPartAddedSerializer(
        item as RealtimeServerEventResponseContentPartAdded,
      );

    case "response.content_part.done":
      return realtimeServerEventResponseContentPartDoneSerializer(
        item as RealtimeServerEventResponseContentPartDone,
      );

    case "response.created":
      return realtimeServerEventResponseCreatedSerializer(
        item as RealtimeServerEventResponseCreated,
      );

    case "response.done":
      return realtimeServerEventResponseDoneSerializer(item as RealtimeServerEventResponseDone);

    case "response.function_call_arguments.delta":
      return realtimeServerEventResponseFunctionCallArgumentsDeltaSerializer(
        item as RealtimeServerEventResponseFunctionCallArgumentsDelta,
      );

    case "response.function_call_arguments.done":
      return realtimeServerEventResponseFunctionCallArgumentsDoneSerializer(
        item as RealtimeServerEventResponseFunctionCallArgumentsDone,
      );

    case "response.output_item.added":
      return realtimeServerEventResponseOutputItemAddedSerializer(
        item as RealtimeServerEventResponseOutputItemAdded,
      );

    case "response.output_item.done":
      return realtimeServerEventResponseOutputItemDoneSerializer(
        item as RealtimeServerEventResponseOutputItemDone,
      );

    case "response.output_text.delta":
      return realtimeServerEventResponseTextDeltaSerializer(
        item as RealtimeServerEventResponseTextDelta,
      );

    case "response.output_text.done":
      return realtimeServerEventResponseTextDoneSerializer(
        item as RealtimeServerEventResponseTextDone,
      );

    case "session.created":
      return realtimeServerEventSessionCreatedSerializer(item as RealtimeServerEventSessionCreated);

    case "session.updated":
      return realtimeServerEventSessionUpdatedSerializer(item as RealtimeServerEventSessionUpdated);

    case "output_audio_buffer.cleared":
      return realtimeServerEventOutputAudioBufferClearedSerializer(
        item as RealtimeServerEventOutputAudioBufferCleared,
      );

    case "conversation.item.added":
      return realtimeServerEventConversationItemAddedSerializer(
        item as RealtimeServerEventConversationItemAdded,
      );

    case "conversation.item.done":
      return realtimeServerEventConversationItemDoneSerializer(
        item as RealtimeServerEventConversationItemDone,
      );

    case "input_audio_buffer.timeout_triggered":
      return realtimeServerEventInputAudioBufferTimeoutTriggeredSerializer(
        item as RealtimeServerEventInputAudioBufferTimeoutTriggered,
      );

    case "conversation.item.input_audio_transcription.segment":
      return realtimeServerEventConversationItemInputAudioTranscriptionSegmentSerializer(
        item as RealtimeServerEventConversationItemInputAudioTranscriptionSegment,
      );

    case "mcp_list_tools.in_progress":
      return realtimeServerEventMCPListToolsInProgressSerializer(
        item as RealtimeServerEventMCPListToolsInProgress,
      );

    case "mcp_list_tools.completed":
      return realtimeServerEventMCPListToolsCompletedSerializer(
        item as RealtimeServerEventMCPListToolsCompleted,
      );

    case "mcp_list_tools.failed":
      return realtimeServerEventMCPListToolsFailedSerializer(
        item as RealtimeServerEventMCPListToolsFailed,
      );

    case "response.mcp_call_arguments.delta":
      return realtimeServerEventResponseMCPCallArgumentsDeltaSerializer(
        item as RealtimeServerEventResponseMCPCallArgumentsDelta,
      );

    case "response.mcp_call_arguments.done":
      return realtimeServerEventResponseMCPCallArgumentsDoneSerializer(
        item as RealtimeServerEventResponseMCPCallArgumentsDone,
      );

    case "response.mcp_call.in_progress":
      return realtimeServerEventResponseMCPCallInProgressSerializer(
        item as RealtimeServerEventResponseMCPCallInProgress,
      );

    case "response.mcp_call.completed":
      return realtimeServerEventResponseMCPCallCompletedSerializer(
        item as RealtimeServerEventResponseMCPCallCompleted,
      );

    case "response.mcp_call.failed":
      return realtimeServerEventResponseMCPCallFailedSerializer(
        item as RealtimeServerEventResponseMCPCallFailed,
      );

    case "warning":
      return voiceAgentServerEventWarningSerializer(item as VoiceAgentServerEventWarning);

    case "session.avatar.connecting":
      return voiceAgentServerEventSessionAvatarConnectingSerializer(
        item as VoiceAgentServerEventSessionAvatarConnecting,
      );

    case "session.avatar.switch_to_speaking":
      return voiceAgentServerEventSessionAvatarSwitchToSpeakingSerializer(
        item as VoiceAgentServerEventSessionAvatarSwitchToSpeaking,
      );

    case "session.avatar.switch_to_idle":
      return voiceAgentServerEventSessionAvatarSwitchToIdleSerializer(
        item as VoiceAgentServerEventSessionAvatarSwitchToIdle,
      );

    case "response.audio_timestamp.delta":
      return voiceAgentServerEventResponseAudioTimestampDeltaSerializer(
        item as VoiceAgentServerEventResponseAudioTimestampDelta,
      );

    case "response.audio_timestamp.done":
      return voiceAgentServerEventResponseAudioTimestampDoneSerializer(
        item as VoiceAgentServerEventResponseAudioTimestampDone,
      );

    case "response.animation_blendshapes.delta":
      return voiceAgentServerEventResponseAnimationBlendshapesDeltaSerializer(
        item as VoiceAgentServerEventResponseAnimationBlendshapesDelta,
      );

    case "response.animation_blendshapes.done":
      return voiceAgentServerEventResponseAnimationBlendshapesDoneSerializer(
        item as VoiceAgentServerEventResponseAnimationBlendshapesDone,
      );

    case "response.animation_viseme.delta":
      return voiceAgentServerEventResponseAnimationVisemeDeltaSerializer(
        item as VoiceAgentServerEventResponseAnimationVisemeDelta,
      );

    case "response.animation_viseme.done":
      return voiceAgentServerEventResponseAnimationVisemeDoneSerializer(
        item as VoiceAgentServerEventResponseAnimationVisemeDone,
      );

    case "response.video.delta":
      return voiceAgentServerEventResponseVideoDeltaSerializer(
        item as VoiceAgentServerEventResponseVideoDelta,
      );

    default:
      return realtimeServerEventSerializer(item);
  }
}

export function realtimeServerEventUnionDeserializer(item: any): RealtimeServerEventUnion {
  switch (item["type"]) {
    case "conversation.item.created":
      return realtimeServerEventConversationItemCreatedDeserializer(
        item as RealtimeServerEventConversationItemCreated,
      );

    case "conversation.item.deleted":
      return realtimeServerEventConversationItemDeletedDeserializer(
        item as RealtimeServerEventConversationItemDeleted,
      );

    case "conversation.item.input_audio_transcription.completed":
      return realtimeServerEventConversationItemInputAudioTranscriptionCompletedDeserializer(
        item as RealtimeServerEventConversationItemInputAudioTranscriptionCompleted,
      );

    case "conversation.item.input_audio_transcription.delta":
      return realtimeServerEventConversationItemInputAudioTranscriptionDeltaDeserializer(
        item as RealtimeServerEventConversationItemInputAudioTranscriptionDelta,
      );

    case "conversation.item.input_audio_transcription.failed":
      return realtimeServerEventConversationItemInputAudioTranscriptionFailedDeserializer(
        item as RealtimeServerEventConversationItemInputAudioTranscriptionFailed,
      );

    case "conversation.item.retrieved":
      return realtimeServerEventConversationItemRetrievedDeserializer(
        item as RealtimeServerEventConversationItemRetrieved,
      );

    case "conversation.item.truncated":
      return realtimeServerEventConversationItemTruncatedDeserializer(
        item as RealtimeServerEventConversationItemTruncated,
      );

    case "input_audio_buffer.cleared":
      return realtimeServerEventInputAudioBufferClearedDeserializer(
        item as RealtimeServerEventInputAudioBufferCleared,
      );

    case "input_audio_buffer.committed":
      return realtimeServerEventInputAudioBufferCommittedDeserializer(
        item as RealtimeServerEventInputAudioBufferCommitted,
      );

    case "input_audio_buffer.speech_started":
      return realtimeServerEventInputAudioBufferSpeechStartedDeserializer(
        item as RealtimeServerEventInputAudioBufferSpeechStarted,
      );

    case "input_audio_buffer.speech_stopped":
      return realtimeServerEventInputAudioBufferSpeechStoppedDeserializer(
        item as RealtimeServerEventInputAudioBufferSpeechStopped,
      );

    case "rate_limits.updated":
      return realtimeServerEventRateLimitsUpdatedDeserializer(
        item as RealtimeServerEventRateLimitsUpdated,
      );

    case "response.output_audio.delta":
      return realtimeServerEventResponseAudioDeltaDeserializer(
        item as RealtimeServerEventResponseAudioDelta,
      );

    case "response.output_audio.done":
      return realtimeServerEventResponseAudioDoneDeserializer(
        item as RealtimeServerEventResponseAudioDone,
      );

    case "response.output_audio_transcript.delta":
      return realtimeServerEventResponseAudioTranscriptDeltaDeserializer(
        item as RealtimeServerEventResponseAudioTranscriptDelta,
      );

    case "response.output_audio_transcript.done":
      return realtimeServerEventResponseAudioTranscriptDoneDeserializer(
        item as RealtimeServerEventResponseAudioTranscriptDone,
      );

    case "response.content_part.added":
      return realtimeServerEventResponseContentPartAddedDeserializer(
        item as RealtimeServerEventResponseContentPartAdded,
      );

    case "response.content_part.done":
      return realtimeServerEventResponseContentPartDoneDeserializer(
        item as RealtimeServerEventResponseContentPartDone,
      );

    case "response.created":
      return realtimeServerEventResponseCreatedDeserializer(
        item as RealtimeServerEventResponseCreated,
      );

    case "response.done":
      return realtimeServerEventResponseDoneDeserializer(item as RealtimeServerEventResponseDone);

    case "response.function_call_arguments.delta":
      return realtimeServerEventResponseFunctionCallArgumentsDeltaDeserializer(
        item as RealtimeServerEventResponseFunctionCallArgumentsDelta,
      );

    case "response.function_call_arguments.done":
      return realtimeServerEventResponseFunctionCallArgumentsDoneDeserializer(
        item as RealtimeServerEventResponseFunctionCallArgumentsDone,
      );

    case "response.output_item.added":
      return realtimeServerEventResponseOutputItemAddedDeserializer(
        item as RealtimeServerEventResponseOutputItemAdded,
      );

    case "response.output_item.done":
      return realtimeServerEventResponseOutputItemDoneDeserializer(
        item as RealtimeServerEventResponseOutputItemDone,
      );

    case "response.output_text.delta":
      return realtimeServerEventResponseTextDeltaDeserializer(
        item as RealtimeServerEventResponseTextDelta,
      );

    case "response.output_text.done":
      return realtimeServerEventResponseTextDoneDeserializer(
        item as RealtimeServerEventResponseTextDone,
      );

    case "session.created":
      return realtimeServerEventSessionCreatedDeserializer(
        item as RealtimeServerEventSessionCreated,
      );

    case "session.updated":
      return realtimeServerEventSessionUpdatedDeserializer(
        item as RealtimeServerEventSessionUpdated,
      );

    case "output_audio_buffer.cleared":
      return realtimeServerEventOutputAudioBufferClearedDeserializer(
        item as RealtimeServerEventOutputAudioBufferCleared,
      );

    case "conversation.item.added":
      return realtimeServerEventConversationItemAddedDeserializer(
        item as RealtimeServerEventConversationItemAdded,
      );

    case "conversation.item.done":
      return realtimeServerEventConversationItemDoneDeserializer(
        item as RealtimeServerEventConversationItemDone,
      );

    case "input_audio_buffer.timeout_triggered":
      return realtimeServerEventInputAudioBufferTimeoutTriggeredDeserializer(
        item as RealtimeServerEventInputAudioBufferTimeoutTriggered,
      );

    case "conversation.item.input_audio_transcription.segment":
      return realtimeServerEventConversationItemInputAudioTranscriptionSegmentDeserializer(
        item as RealtimeServerEventConversationItemInputAudioTranscriptionSegment,
      );

    case "mcp_list_tools.in_progress":
      return realtimeServerEventMCPListToolsInProgressDeserializer(
        item as RealtimeServerEventMCPListToolsInProgress,
      );

    case "mcp_list_tools.completed":
      return realtimeServerEventMCPListToolsCompletedDeserializer(
        item as RealtimeServerEventMCPListToolsCompleted,
      );

    case "mcp_list_tools.failed":
      return realtimeServerEventMCPListToolsFailedDeserializer(
        item as RealtimeServerEventMCPListToolsFailed,
      );

    case "response.mcp_call_arguments.delta":
      return realtimeServerEventResponseMCPCallArgumentsDeltaDeserializer(
        item as RealtimeServerEventResponseMCPCallArgumentsDelta,
      );

    case "response.mcp_call_arguments.done":
      return realtimeServerEventResponseMCPCallArgumentsDoneDeserializer(
        item as RealtimeServerEventResponseMCPCallArgumentsDone,
      );

    case "response.mcp_call.in_progress":
      return realtimeServerEventResponseMCPCallInProgressDeserializer(
        item as RealtimeServerEventResponseMCPCallInProgress,
      );

    case "response.mcp_call.completed":
      return realtimeServerEventResponseMCPCallCompletedDeserializer(
        item as RealtimeServerEventResponseMCPCallCompleted,
      );

    case "response.mcp_call.failed":
      return realtimeServerEventResponseMCPCallFailedDeserializer(
        item as RealtimeServerEventResponseMCPCallFailed,
      );

    case "warning":
      return voiceAgentServerEventWarningDeserializer(item as VoiceAgentServerEventWarning);

    case "session.avatar.connecting":
      return voiceAgentServerEventSessionAvatarConnectingDeserializer(
        item as VoiceAgentServerEventSessionAvatarConnecting,
      );

    case "session.avatar.switch_to_speaking":
      return voiceAgentServerEventSessionAvatarSwitchToSpeakingDeserializer(
        item as VoiceAgentServerEventSessionAvatarSwitchToSpeaking,
      );

    case "session.avatar.switch_to_idle":
      return voiceAgentServerEventSessionAvatarSwitchToIdleDeserializer(
        item as VoiceAgentServerEventSessionAvatarSwitchToIdle,
      );

    case "response.audio_timestamp.delta":
      return voiceAgentServerEventResponseAudioTimestampDeltaDeserializer(
        item as VoiceAgentServerEventResponseAudioTimestampDelta,
      );

    case "response.audio_timestamp.done":
      return voiceAgentServerEventResponseAudioTimestampDoneDeserializer(
        item as VoiceAgentServerEventResponseAudioTimestampDone,
      );

    case "response.animation_blendshapes.delta":
      return voiceAgentServerEventResponseAnimationBlendshapesDeltaDeserializer(
        item as VoiceAgentServerEventResponseAnimationBlendshapesDelta,
      );

    case "response.animation_blendshapes.done":
      return voiceAgentServerEventResponseAnimationBlendshapesDoneDeserializer(
        item as VoiceAgentServerEventResponseAnimationBlendshapesDone,
      );

    case "response.animation_viseme.delta":
      return voiceAgentServerEventResponseAnimationVisemeDeltaDeserializer(
        item as VoiceAgentServerEventResponseAnimationVisemeDelta,
      );

    case "response.animation_viseme.done":
      return voiceAgentServerEventResponseAnimationVisemeDoneDeserializer(
        item as VoiceAgentServerEventResponseAnimationVisemeDone,
      );

    case "response.video.delta":
      return voiceAgentServerEventResponseVideoDeltaDeserializer(
        item as VoiceAgentServerEventResponseVideoDelta,
      );

    default:
      return realtimeServerEventDeserializer(item);
  }
}

/** Type of RealtimeServerEventType */
export type RealtimeServerEventType =
  | "conversation.created"
  | "conversation.item.created"
  | "conversation.item.deleted"
  | "conversation.item.input_audio_transcription.completed"
  | "conversation.item.input_audio_transcription.delta"
  | "conversation.item.input_audio_transcription.failed"
  | "conversation.item.retrieved"
  | "conversation.item.truncated"
  | "error"
  | "input_audio_buffer.cleared"
  | "input_audio_buffer.committed"
  | "input_audio_buffer.dtmf_event_received"
  | "input_audio_buffer.speech_started"
  | "input_audio_buffer.speech_stopped"
  | "rate_limits.updated"
  | "response.output_audio.delta"
  | "response.output_audio.done"
  | "response.output_audio_transcript.delta"
  | "response.output_audio_transcript.done"
  | "response.content_part.added"
  | "response.content_part.done"
  | "response.created"
  | "response.done"
  | "response.function_call_arguments.delta"
  | "response.function_call_arguments.done"
  | "response.output_item.added"
  | "response.output_item.done"
  | "response.output_text.delta"
  | "response.output_text.done"
  | "session.created"
  | "session.updated"
  | "output_audio_buffer.started"
  | "output_audio_buffer.stopped"
  | "output_audio_buffer.cleared"
  | "conversation.item.added"
  | "conversation.item.done"
  | "input_audio_buffer.timeout_triggered"
  | "conversation.item.input_audio_transcription.segment"
  | "mcp_list_tools.in_progress"
  | "mcp_list_tools.completed"
  | "mcp_list_tools.failed"
  | "response.mcp_call_arguments.delta"
  | "response.mcp_call_arguments.done"
  | "response.mcp_call.in_progress"
  | "response.mcp_call.completed"
  | "response.mcp_call.failed"
  | "warning"
  | "session.avatar.connecting"
  | "session.avatar.switch_to_speaking"
  | "session.avatar.switch_to_idle"
  | "response.audio_timestamp.delta"
  | "response.audio_timestamp.done"
  | "response.animation_blendshapes.delta"
  | "response.animation_blendshapes.done"
  | "response.animation_viseme.delta"
  | "response.animation_viseme.done"
  | "response.video.delta";

/**
 * Returned when a conversation item is created. There are several scenarios that produce this event:
 * - The server is generating a Response, which if successful will produce
 * either one or two Items, which will be of type `message`
 * (role `assistant`) or type `function_call`.
 * - The input audio buffer has been committed, either by the client or the
 * server (in `server_vad` mode). The server will take the content of the
 * input audio buffer and add it to a new user message Item.
 * - The client has sent a `conversation.item.create` event to add a new Item
 * to the Conversation.
 */
export interface RealtimeServerEventConversationItemCreated extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.item.created`. */
  type: "conversation.item.created";
  previous_item_id?: string;
  item: RealtimeConversationItemUnion;
}

export function realtimeServerEventConversationItemCreatedSerializer(
  item: RealtimeServerEventConversationItemCreated,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    previous_item_id: item["previous_item_id"],
    item: realtimeConversationItemUnionSerializer(item["item"]),
  };
}

export function realtimeServerEventConversationItemCreatedDeserializer(
  item: any,
): RealtimeServerEventConversationItemCreated {
  return {
    type: item["type"],
    event_id: item["event_id"],
    previous_item_id: item["previous_item_id"],
    item: realtimeConversationItemUnionDeserializer(item["item"]),
  };
}

/**
 * Returned when an item in the conversation is deleted by the client with a
 * `conversation.item.delete` event. This event is used to synchronize the
 * server's understanding of the conversation history with the client's view.
 */
export interface RealtimeServerEventConversationItemDeleted extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.item.deleted`. */
  type: "conversation.item.deleted";
  /** The ID of the item that was deleted. */
  item_id: string;
}

export function realtimeServerEventConversationItemDeletedSerializer(
  item: RealtimeServerEventConversationItemDeleted,
): any {
  return { type: item["type"], event_id: item["event_id"], item_id: item["item_id"] };
}

export function realtimeServerEventConversationItemDeletedDeserializer(
  item: any,
): RealtimeServerEventConversationItemDeleted {
  return {
    type: item["type"],
    event_id: item["event_id"],
    item_id: item["item_id"],
  };
}

/**
 * This event is the output of audio transcription for user audio written to the
 * user audio buffer. Transcription begins when the input audio buffer is
 * committed by the client or server (when VAD is enabled). Transcription runs
 * asynchronously with Response creation, so this event may come before or after
 * the Response events.
 * Realtime API models accept audio natively, and thus input transcription is a
 * separate process run on a separate ASR (Automatic Speech Recognition) model.
 * The transcript may diverge somewhat from the model's interpretation, and
 * should be treated as a rough guide.
 */
export interface RealtimeServerEventConversationItemInputAudioTranscriptionCompleted extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /**
   * The event type, must be
   *   `conversation.item.input_audio_transcription.completed`.
   */
  type: "conversation.item.input_audio_transcription.completed";
  /** The ID of the item containing the audio that is being transcribed. */
  item_id: string;
  /** The index of the content part containing the audio. */
  content_index: number;
  /** The transcribed text. */
  transcript: string;
  logprobs?: LogProbProperties[];
  /** Usage statistics for the transcription, this is billed according to the ASR model's pricing rather than the realtime model's pricing. */
  usage: TranscriptTextUsageTokens | TranscriptTextUsageDuration;
  /** Phrase-level transcription timing and confidence details. */
  phrases?: VoiceAgentTranscriptionPhrase[];
}

export function realtimeServerEventConversationItemInputAudioTranscriptionCompletedSerializer(
  item: RealtimeServerEventConversationItemInputAudioTranscriptionCompleted,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    transcript: item["transcript"],
    logprobs: !item["logprobs"]
      ? item["logprobs"]
      : logProbPropertiesArraySerializer(item["logprobs"]),
    usage: _realtimeServerEventConversationItemInputAudioTranscriptionCompletedUsageSerializer(
      item["usage"],
    ),
    phrases: !item["phrases"]
      ? item["phrases"]
      : voiceAgentTranscriptionPhraseArraySerializer(item["phrases"]),
  };
}

export function realtimeServerEventConversationItemInputAudioTranscriptionCompletedDeserializer(
  item: any,
): RealtimeServerEventConversationItemInputAudioTranscriptionCompleted {
  return {
    type: item["type"],
    event_id: item["event_id"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    transcript: item["transcript"],
    logprobs: !item["logprobs"]
      ? item["logprobs"]
      : logProbPropertiesArrayDeserializer(item["logprobs"]),
    usage: _realtimeServerEventConversationItemInputAudioTranscriptionCompletedUsageDeserializer(
      item["usage"],
    ),
    phrases: !item["phrases"]
      ? item["phrases"]
      : voiceAgentTranscriptionPhraseArrayDeserializer(item["phrases"]),
  };
}

export function logProbPropertiesArraySerializer(result: Array<LogProbProperties>): any[] {
  return result.map((item) => {
    return logProbPropertiesSerializer(item);
  });
}

export function logProbPropertiesArrayDeserializer(result: Array<LogProbProperties>): any[] {
  return result.map((item) => {
    return logProbPropertiesDeserializer(item);
  });
}

/** A log probability object. */
export interface LogProbProperties {
  /** The token that was used to generate the log probability. */
  token: string;
  /** The log probability of the token. */
  logprob: number;
  /** The bytes that were used to generate the log probability. */
  bytes: number[];
}

export function logProbPropertiesSerializer(item: LogProbProperties): any {
  return {
    token: item["token"],
    logprob: item["logprob"],
    bytes: item["bytes"].map((p: any) => {
      return p;
    }),
  };
}

export function logProbPropertiesDeserializer(item: any): LogProbProperties {
  return {
    token: item["token"],
    logprob: item["logprob"],
    bytes: item["bytes"].map((p: any) => {
      return p;
    }),
  };
}

/** Alias for _RealtimeServerEventConversationItemInputAudioTranscriptionCompletedUsage */
export type _RealtimeServerEventConversationItemInputAudioTranscriptionCompletedUsage =
  TranscriptTextUsageTokens | TranscriptTextUsageDuration;

export function _realtimeServerEventConversationItemInputAudioTranscriptionCompletedUsageSerializer(
  item: _RealtimeServerEventConversationItemInputAudioTranscriptionCompletedUsage,
): any {
  return item;
}

export function _realtimeServerEventConversationItemInputAudioTranscriptionCompletedUsageDeserializer(
  item: any,
): _RealtimeServerEventConversationItemInputAudioTranscriptionCompletedUsage {
  return item;
}

/** Usage statistics for models billed by token usage. */
export interface TranscriptTextUsageTokens extends CreateTranscriptionResponseJsonUsage {
  /** The type of the usage object. Always `tokens` for this variant. */
  type: "tokens";
  /** Number of input tokens billed for this request. */
  input_tokens: number;
  /** Details about the input tokens billed for this request. */
  input_token_details?: TranscriptTextUsageTokensInputTokenDetails;
  /** Number of output tokens generated. */
  output_tokens: number;
  /** Total number of tokens used (input + output). */
  total_tokens: number;
}

export function transcriptTextUsageTokensSerializer(item: TranscriptTextUsageTokens): any {
  return {
    type: item["type"],
    input_tokens: item["input_tokens"],
    input_token_details: !item["input_token_details"]
      ? item["input_token_details"]
      : transcriptTextUsageTokensInputTokenDetailsSerializer(item["input_token_details"]),
    output_tokens: item["output_tokens"],
    total_tokens: item["total_tokens"],
  };
}

export function transcriptTextUsageTokensDeserializer(item: any): TranscriptTextUsageTokens {
  return {
    type: item["type"],
    input_tokens: item["input_tokens"],
    input_token_details: !item["input_token_details"]
      ? item["input_token_details"]
      : transcriptTextUsageTokensInputTokenDetailsDeserializer(item["input_token_details"]),
    output_tokens: item["output_tokens"],
    total_tokens: item["total_tokens"],
  };
}

/** model interface TranscriptTextUsageTokensInputTokenDetails */
export interface TranscriptTextUsageTokensInputTokenDetails {
  text_tokens?: number;
  audio_tokens?: number;
}

export function transcriptTextUsageTokensInputTokenDetailsSerializer(
  item: TranscriptTextUsageTokensInputTokenDetails,
): any {
  return { text_tokens: item["text_tokens"], audio_tokens: item["audio_tokens"] };
}

export function transcriptTextUsageTokensInputTokenDetailsDeserializer(
  item: any,
): TranscriptTextUsageTokensInputTokenDetails {
  return {
    text_tokens: item["text_tokens"],
    audio_tokens: item["audio_tokens"],
  };
}

/** Usage statistics for models billed by audio input duration. */
export interface TranscriptTextUsageDuration extends CreateTranscriptionResponseJsonUsage {
  /** The type of the usage object. Always `duration` for this variant. */
  type: "duration";
  /** Duration of the input audio in seconds. */
  seconds: number;
}

export function transcriptTextUsageDurationSerializer(item: TranscriptTextUsageDuration): any {
  return { type: item["type"], seconds: item["seconds"] };
}

export function transcriptTextUsageDurationDeserializer(item: any): TranscriptTextUsageDuration {
  return {
    type: item["type"],
    seconds: item["seconds"],
  };
}

export function voiceAgentTranscriptionPhraseArraySerializer(
  result: Array<VoiceAgentTranscriptionPhrase>,
): any[] {
  return result.map((item) => {
    return voiceAgentTranscriptionPhraseSerializer(item);
  });
}

export function voiceAgentTranscriptionPhraseArrayDeserializer(
  result: Array<VoiceAgentTranscriptionPhrase>,
): any[] {
  return result.map((item) => {
    return voiceAgentTranscriptionPhraseDeserializer(item);
  });
}

/** A transcribed phrase with timing information. */
export interface VoiceAgentTranscriptionPhrase {
  /** The phrase offset from the beginning of the audio, in milliseconds. */
  offset_milliseconds: number;
  /** The phrase duration in milliseconds. */
  duration_milliseconds: number;
  /** The transcribed phrase text. */
  text: string;
  /** Word-level timing details, when available. */
  words?: VoiceAgentTranscriptionWord[];
  /** The detected locale. */
  locale?: string;
  /** The transcription confidence score. */
  confidence?: number;
}

export function voiceAgentTranscriptionPhraseSerializer(item: VoiceAgentTranscriptionPhrase): any {
  return {
    offset_milliseconds: item["offset_milliseconds"],
    duration_milliseconds: item["duration_milliseconds"],
    text: item["text"],
    words: !item["words"]
      ? item["words"]
      : voiceAgentTranscriptionWordArraySerializer(item["words"]),
    locale: item["locale"],
    confidence: item["confidence"],
  };
}

export function voiceAgentTranscriptionPhraseDeserializer(
  item: any,
): VoiceAgentTranscriptionPhrase {
  return {
    offset_milliseconds: item["offset_milliseconds"],
    duration_milliseconds: item["duration_milliseconds"],
    text: item["text"],
    words: !item["words"]
      ? item["words"]
      : voiceAgentTranscriptionWordArrayDeserializer(item["words"]),
    locale: item["locale"],
    confidence: item["confidence"],
  };
}

export function voiceAgentTranscriptionWordArraySerializer(
  result: Array<VoiceAgentTranscriptionWord>,
): any[] {
  return result.map((item) => {
    return voiceAgentTranscriptionWordSerializer(item);
  });
}

export function voiceAgentTranscriptionWordArrayDeserializer(
  result: Array<VoiceAgentTranscriptionWord>,
): any[] {
  return result.map((item) => {
    return voiceAgentTranscriptionWordDeserializer(item);
  });
}

/** A time-stamped word in an input-audio transcription. */
export interface VoiceAgentTranscriptionWord {
  /** The transcribed word text. */
  text: string;
  /** The word offset from the beginning of the audio, in milliseconds. */
  offset_milliseconds: number;
  /** The word duration in milliseconds. */
  duration_milliseconds: number;
}

export function voiceAgentTranscriptionWordSerializer(item: VoiceAgentTranscriptionWord): any {
  return {
    text: item["text"],
    offset_milliseconds: item["offset_milliseconds"],
    duration_milliseconds: item["duration_milliseconds"],
  };
}

export function voiceAgentTranscriptionWordDeserializer(item: any): VoiceAgentTranscriptionWord {
  return {
    text: item["text"],
    offset_milliseconds: item["offset_milliseconds"],
    duration_milliseconds: item["duration_milliseconds"],
  };
}

/** Returned when the text value of an input audio transcription content part is updated with incremental transcription results. */
export interface RealtimeServerEventConversationItemInputAudioTranscriptionDelta extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.item.input_audio_transcription.delta`. */
  type: "conversation.item.input_audio_transcription.delta";
  /** The ID of the item containing the audio that is being transcribed. */
  item_id: string;
  /** The index of the content part in the item's content array. */
  content_index?: number;
  /** The text delta. */
  delta?: string;
  logprobs?: LogProbProperties[];
}

export function realtimeServerEventConversationItemInputAudioTranscriptionDeltaSerializer(
  item: RealtimeServerEventConversationItemInputAudioTranscriptionDelta,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    delta: item["delta"],
    logprobs: !item["logprobs"]
      ? item["logprobs"]
      : logProbPropertiesArraySerializer(item["logprobs"]),
  };
}

export function realtimeServerEventConversationItemInputAudioTranscriptionDeltaDeserializer(
  item: any,
): RealtimeServerEventConversationItemInputAudioTranscriptionDelta {
  return {
    type: item["type"],
    event_id: item["event_id"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    delta: item["delta"],
    logprobs: !item["logprobs"]
      ? item["logprobs"]
      : logProbPropertiesArrayDeserializer(item["logprobs"]),
  };
}

/**
 * Returned when input audio transcription is configured, and a transcription
 * request for a user message failed. These events are separate from other
 * `error` events so that the client can identify the related Item.
 */
export interface RealtimeServerEventConversationItemInputAudioTranscriptionFailed extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /**
   * The event type, must be
   *   `conversation.item.input_audio_transcription.failed`.
   */
  type: "conversation.item.input_audio_transcription.failed";
  /** The ID of the user message item. */
  item_id: string;
  /** The index of the content part containing the audio. */
  content_index: number;
  /** Details of the transcription error. */
  error: RealtimeServerEventConversationItemInputAudioTranscriptionFailedError;
}

export function realtimeServerEventConversationItemInputAudioTranscriptionFailedSerializer(
  item: RealtimeServerEventConversationItemInputAudioTranscriptionFailed,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    error: realtimeServerEventConversationItemInputAudioTranscriptionFailedErrorSerializer(
      item["error"],
    ),
  };
}

export function realtimeServerEventConversationItemInputAudioTranscriptionFailedDeserializer(
  item: any,
): RealtimeServerEventConversationItemInputAudioTranscriptionFailed {
  return {
    type: item["type"],
    event_id: item["event_id"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    error: realtimeServerEventConversationItemInputAudioTranscriptionFailedErrorDeserializer(
      item["error"],
    ),
  };
}

/** model interface RealtimeServerEventConversationItemInputAudioTranscriptionFailedError */
export interface RealtimeServerEventConversationItemInputAudioTranscriptionFailedError {
  type?: string;
  code?: string;
  message?: string;
  param?: string;
}

export function realtimeServerEventConversationItemInputAudioTranscriptionFailedErrorSerializer(
  item: RealtimeServerEventConversationItemInputAudioTranscriptionFailedError,
): any {
  return { type: item["type"], code: item["code"], message: item["message"], param: item["param"] };
}

export function realtimeServerEventConversationItemInputAudioTranscriptionFailedErrorDeserializer(
  item: any,
): RealtimeServerEventConversationItemInputAudioTranscriptionFailedError {
  return {
    type: item["type"],
    code: item["code"],
    message: item["message"],
    param: item["param"],
  };
}

/** Returned when a conversation item is retrieved with `conversation.item.retrieve`. This is provided as a way to fetch the server's representation of an item, for example to get access to the post-processed audio data after noise cancellation and VAD. It includes the full content of the Item, including audio data. */
export interface RealtimeServerEventConversationItemRetrieved extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.item.retrieved`. */
  type: "conversation.item.retrieved";
  item: RealtimeConversationItemUnion;
}

export function realtimeServerEventConversationItemRetrievedSerializer(
  item: RealtimeServerEventConversationItemRetrieved,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    item: realtimeConversationItemUnionSerializer(item["item"]),
  };
}

export function realtimeServerEventConversationItemRetrievedDeserializer(
  item: any,
): RealtimeServerEventConversationItemRetrieved {
  return {
    type: item["type"],
    event_id: item["event_id"],
    item: realtimeConversationItemUnionDeserializer(item["item"]),
  };
}

/**
 * Returned when an earlier assistant audio message item is truncated by the
 * client with a `conversation.item.truncate` event. This event is used to
 * synchronize the server's understanding of the audio with the client's playback.
 * This action will truncate the audio and remove the server-side text transcript
 * to ensure there is no text in the context that hasn't been heard by the user.
 */
export interface RealtimeServerEventConversationItemTruncated extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.item.truncated`. */
  type: "conversation.item.truncated";
  /** The ID of the assistant message item that was truncated. */
  item_id: string;
  /** The index of the content part that was truncated. */
  content_index: number;
  /** The duration up to which the audio was truncated, in milliseconds. */
  audio_end_ms: number;
  /** The assistant message after truncation, when the service returns the updated item. */
  item?: RealtimeConversationItemUnion;
}

export function realtimeServerEventConversationItemTruncatedSerializer(
  item: RealtimeServerEventConversationItemTruncated,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    audio_end_ms: item["audio_end_ms"],
    item: !item["item"] ? item["item"] : realtimeConversationItemUnionSerializer(item["item"]),
  };
}

export function realtimeServerEventConversationItemTruncatedDeserializer(
  item: any,
): RealtimeServerEventConversationItemTruncated {
  return {
    type: item["type"],
    event_id: item["event_id"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    audio_end_ms: item["audio_end_ms"],
    item: !item["item"] ? item["item"] : realtimeConversationItemUnionDeserializer(item["item"]),
  };
}

/**
 * Returned when the input audio buffer is cleared by the client with a
 * `input_audio_buffer.clear` event.
 */
export interface RealtimeServerEventInputAudioBufferCleared extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `input_audio_buffer.cleared`. */
  type: "input_audio_buffer.cleared";
}

export function realtimeServerEventInputAudioBufferClearedSerializer(
  item: RealtimeServerEventInputAudioBufferCleared,
): any {
  return { type: item["type"], event_id: item["event_id"] };
}

export function realtimeServerEventInputAudioBufferClearedDeserializer(
  item: any,
): RealtimeServerEventInputAudioBufferCleared {
  return {
    type: item["type"],
    event_id: item["event_id"],
  };
}

/**
 * Returned when an input audio buffer is committed, either by the client or
 * automatically in server VAD mode. The `item_id` property is the ID of the user
 * message item that will be created, thus a `conversation.item.created` event
 * will also be sent to the client.
 */
export interface RealtimeServerEventInputAudioBufferCommitted extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `input_audio_buffer.committed`. */
  type: "input_audio_buffer.committed";
  previous_item_id?: string;
  /** The ID of the user message item that will be created. */
  item_id: string;
}

export function realtimeServerEventInputAudioBufferCommittedSerializer(
  item: RealtimeServerEventInputAudioBufferCommitted,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    previous_item_id: item["previous_item_id"],
    item_id: item["item_id"],
  };
}

export function realtimeServerEventInputAudioBufferCommittedDeserializer(
  item: any,
): RealtimeServerEventInputAudioBufferCommitted {
  return {
    type: item["type"],
    event_id: item["event_id"],
    previous_item_id: item["previous_item_id"],
    item_id: item["item_id"],
  };
}

/**
 * Sent by the server when in `server_vad` mode to indicate that speech has been
 * detected in the audio buffer. This can happen any time audio is added to the
 * buffer (unless speech is already detected). The client may want to use this
 * event to interrupt audio playback or provide visual feedback to the user.
 * The client should expect to receive a `input_audio_buffer.speech_stopped` event
 * when speech stops. The `item_id` property is the ID of the user message item
 * that will be created when speech stops and will also be included in the
 * `input_audio_buffer.speech_stopped` event (unless the client manually commits
 * the audio buffer during VAD activation).
 */
export interface RealtimeServerEventInputAudioBufferSpeechStarted extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `input_audio_buffer.speech_started`. */
  type: "input_audio_buffer.speech_started";
  /**
   * Milliseconds from the start of all audio written to the buffer during the
   *   session when speech was first detected. This will correspond to the
   *   beginning of audio sent to the model, and thus includes the
   *   `prefix_padding_ms` configured in the Session.
   */
  audio_start_ms: number;
  /** The ID of the user message item that will be created when speech stops. */
  item_id: string;
}

export function realtimeServerEventInputAudioBufferSpeechStartedSerializer(
  item: RealtimeServerEventInputAudioBufferSpeechStarted,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    audio_start_ms: item["audio_start_ms"],
    item_id: item["item_id"],
  };
}

export function realtimeServerEventInputAudioBufferSpeechStartedDeserializer(
  item: any,
): RealtimeServerEventInputAudioBufferSpeechStarted {
  return {
    type: item["type"],
    event_id: item["event_id"],
    audio_start_ms: item["audio_start_ms"],
    item_id: item["item_id"],
  };
}

/**
 * Returned in `server_vad` mode when the server detects the end of speech in
 * the audio buffer. The server will also send an `conversation.item.created`
 * event with the user message item that is created from the audio buffer.
 */
export interface RealtimeServerEventInputAudioBufferSpeechStopped extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `input_audio_buffer.speech_stopped`. */
  type: "input_audio_buffer.speech_stopped";
  /**
   * Milliseconds since the session started when speech stopped. This will
   *   correspond to the end of audio sent to the model, and thus includes the
   *   `min_silence_duration_ms` configured in the Session.
   */
  audio_end_ms: number;
  /** The ID of the user message item that will be created. */
  item_id: string;
}

export function realtimeServerEventInputAudioBufferSpeechStoppedSerializer(
  item: RealtimeServerEventInputAudioBufferSpeechStopped,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    audio_end_ms: item["audio_end_ms"],
    item_id: item["item_id"],
  };
}

export function realtimeServerEventInputAudioBufferSpeechStoppedDeserializer(
  item: any,
): RealtimeServerEventInputAudioBufferSpeechStopped {
  return {
    type: item["type"],
    event_id: item["event_id"],
    audio_end_ms: item["audio_end_ms"],
    item_id: item["item_id"],
  };
}

/**
 * Emitted at the beginning of a Response to indicate the updated rate limits.
 * When a Response is created some tokens will be "reserved" for the output
 * tokens, the rate limits shown here reflect that reservation, which is then
 * adjusted accordingly once the Response is completed.
 */
export interface RealtimeServerEventRateLimitsUpdated extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `rate_limits.updated`. */
  type: "rate_limits.updated";
  /** List of rate limit information. */
  rate_limits: RealtimeServerEventRateLimitsUpdatedRateLimits[];
}

export function realtimeServerEventRateLimitsUpdatedSerializer(
  item: RealtimeServerEventRateLimitsUpdated,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    rate_limits: realtimeServerEventRateLimitsUpdatedRateLimitsArraySerializer(item["rate_limits"]),
  };
}

export function realtimeServerEventRateLimitsUpdatedDeserializer(
  item: any,
): RealtimeServerEventRateLimitsUpdated {
  return {
    type: item["type"],
    event_id: item["event_id"],
    rate_limits: realtimeServerEventRateLimitsUpdatedRateLimitsArrayDeserializer(
      item["rate_limits"],
    ),
  };
}

export function realtimeServerEventRateLimitsUpdatedRateLimitsArraySerializer(
  result: Array<RealtimeServerEventRateLimitsUpdatedRateLimits>,
): any[] {
  return result.map((item) => {
    return realtimeServerEventRateLimitsUpdatedRateLimitsSerializer(item);
  });
}

export function realtimeServerEventRateLimitsUpdatedRateLimitsArrayDeserializer(
  result: Array<RealtimeServerEventRateLimitsUpdatedRateLimits>,
): any[] {
  return result.map((item) => {
    return realtimeServerEventRateLimitsUpdatedRateLimitsDeserializer(item);
  });
}

/** model interface RealtimeServerEventRateLimitsUpdatedRateLimits */
export interface RealtimeServerEventRateLimitsUpdatedRateLimits {
  name?: "requests" | "tokens";
  limit?: number;
  remaining?: number;
  reset_seconds?: number;
}

export function realtimeServerEventRateLimitsUpdatedRateLimitsSerializer(
  item: RealtimeServerEventRateLimitsUpdatedRateLimits,
): any {
  return {
    name: item["name"],
    limit: item["limit"],
    remaining: item["remaining"],
    reset_seconds: item["reset_seconds"],
  };
}

export function realtimeServerEventRateLimitsUpdatedRateLimitsDeserializer(
  item: any,
): RealtimeServerEventRateLimitsUpdatedRateLimits {
  return {
    name: item["name"],
    limit: item["limit"],
    remaining: item["remaining"],
    reset_seconds: item["reset_seconds"],
  };
}

/** Returned when the model-generated audio is updated. */
export interface RealtimeServerEventResponseAudioDelta extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.output_audio.delta`. */
  type: "response.output_audio.delta";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
  /** Base64-encoded audio data delta. */
  delta: Uint8Array;
}

export function realtimeServerEventResponseAudioDeltaSerializer(
  item: RealtimeServerEventResponseAudioDelta,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    delta: uint8ArrayToString(item["delta"], "base64"),
  };
}

export function realtimeServerEventResponseAudioDeltaDeserializer(
  item: any,
): RealtimeServerEventResponseAudioDelta {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    delta:
      typeof item["delta"] === "string"
        ? stringToUint8Array(item["delta"], "base64")
        : item["delta"],
  };
}

/**
 * Returned when the model-generated audio is done. Also emitted when a Response
 * is interrupted, incomplete, or cancelled.
 */
export interface RealtimeServerEventResponseAudioDone extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.output_audio.done`. */
  type: "response.output_audio.done";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
}

export function realtimeServerEventResponseAudioDoneSerializer(
  item: RealtimeServerEventResponseAudioDone,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
  };
}

export function realtimeServerEventResponseAudioDoneDeserializer(
  item: any,
): RealtimeServerEventResponseAudioDone {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
  };
}

/** Returned when the model-generated transcription of audio output is updated. */
export interface RealtimeServerEventResponseAudioTranscriptDelta extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.output_audio_transcript.delta`. */
  type: "response.output_audio_transcript.delta";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
  /** The transcript delta. */
  delta: string;
}

export function realtimeServerEventResponseAudioTranscriptDeltaSerializer(
  item: RealtimeServerEventResponseAudioTranscriptDelta,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    delta: item["delta"],
  };
}

export function realtimeServerEventResponseAudioTranscriptDeltaDeserializer(
  item: any,
): RealtimeServerEventResponseAudioTranscriptDelta {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    delta: item["delta"],
  };
}

/**
 * Returned when the model-generated transcription of audio output is done
 * streaming. Also emitted when a Response is interrupted, incomplete, or
 * cancelled.
 */
export interface RealtimeServerEventResponseAudioTranscriptDone extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.output_audio_transcript.done`. */
  type: "response.output_audio_transcript.done";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
  /** The final transcript of the audio. */
  transcript: string;
}

export function realtimeServerEventResponseAudioTranscriptDoneSerializer(
  item: RealtimeServerEventResponseAudioTranscriptDone,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    transcript: item["transcript"],
  };
}

export function realtimeServerEventResponseAudioTranscriptDoneDeserializer(
  item: any,
): RealtimeServerEventResponseAudioTranscriptDone {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    transcript: item["transcript"],
  };
}

/**
 * Returned when a new content part is added to an assistant message item during
 * response generation.
 */
export interface RealtimeServerEventResponseContentPartAdded extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.content_part.added`. */
  type: "response.content_part.added";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item to which the content part was added. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
  /** The content part that was added. */
  part: RealtimeServerEventResponseContentPartAddedPart;
}

export function realtimeServerEventResponseContentPartAddedSerializer(
  item: RealtimeServerEventResponseContentPartAdded,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    part: realtimeServerEventResponseContentPartAddedPartSerializer(item["part"]),
  };
}

export function realtimeServerEventResponseContentPartAddedDeserializer(
  item: any,
): RealtimeServerEventResponseContentPartAdded {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    part: realtimeServerEventResponseContentPartAddedPartDeserializer(item["part"]),
  };
}

/** model interface RealtimeServerEventResponseContentPartAddedPart */
export interface RealtimeServerEventResponseContentPartAddedPart {
  type?: "audio" | "text";
  text?: string;
  audio?: string;
  transcript?: string;
}

export function realtimeServerEventResponseContentPartAddedPartSerializer(
  item: RealtimeServerEventResponseContentPartAddedPart,
): any {
  return {
    type: item["type"],
    text: item["text"],
    audio: item["audio"],
    transcript: item["transcript"],
  };
}

export function realtimeServerEventResponseContentPartAddedPartDeserializer(
  item: any,
): RealtimeServerEventResponseContentPartAddedPart {
  return {
    type: item["type"],
    text: item["text"],
    audio: item["audio"],
    transcript: item["transcript"],
  };
}

/**
 * Returned when a content part is done streaming in an assistant message item.
 * Also emitted when a Response is interrupted, incomplete, or cancelled.
 */
export interface RealtimeServerEventResponseContentPartDone extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.content_part.done`. */
  type: "response.content_part.done";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
  /** The content part that is done. */
  part: RealtimeServerEventResponseContentPartDonePart;
}

export function realtimeServerEventResponseContentPartDoneSerializer(
  item: RealtimeServerEventResponseContentPartDone,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    part: realtimeServerEventResponseContentPartDonePartSerializer(item["part"]),
  };
}

export function realtimeServerEventResponseContentPartDoneDeserializer(
  item: any,
): RealtimeServerEventResponseContentPartDone {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    part: realtimeServerEventResponseContentPartDonePartDeserializer(item["part"]),
  };
}

/** model interface RealtimeServerEventResponseContentPartDonePart */
export interface RealtimeServerEventResponseContentPartDonePart {
  type?: "audio" | "text";
  text?: string;
  audio?: string;
  transcript?: string;
  /** The audio format, when this is an audio content part. */
  format?: RealtimeAudioFormatsUnion;
}

export function realtimeServerEventResponseContentPartDonePartSerializer(
  item: RealtimeServerEventResponseContentPartDonePart,
): any {
  return {
    type: item["type"],
    text: item["text"],
    audio: item["audio"],
    transcript: item["transcript"],
    format: !item["format"] ? item["format"] : realtimeAudioFormatsUnionSerializer(item["format"]),
  };
}

export function realtimeServerEventResponseContentPartDonePartDeserializer(
  item: any,
): RealtimeServerEventResponseContentPartDonePart {
  return {
    type: item["type"],
    text: item["text"],
    audio: item["audio"],
    transcript: item["transcript"],
    format: !item["format"]
      ? item["format"]
      : realtimeAudioFormatsUnionDeserializer(item["format"]),
  };
}

/**
 * Returned when a new Response is created. The first event of response creation,
 * where the response is in an initial state of `in_progress`.
 */
export interface RealtimeServerEventResponseCreated extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.created`. */
  type: "response.created";
  response: VoiceAgentRealtimeResponse;
}

export function realtimeServerEventResponseCreatedSerializer(
  item: RealtimeServerEventResponseCreated,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response: voiceAgentRealtimeResponseSerializer(item["response"]),
  };
}

export function realtimeServerEventResponseCreatedDeserializer(
  item: any,
): RealtimeServerEventResponseCreated {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response: voiceAgentRealtimeResponseDeserializer(item["response"]),
  };
}

/** A live realtime response returned by the voice-agent service in both `response.created` and `response.done` events. */
export interface VoiceAgentRealtimeResponse extends OmitPropertiesRealtimeResponse1 {
  /** The audio configuration used by the live response, including flat voice provider, locale, and format fields under `output`. */
  audio?: VoiceResponseAudio;
  /** The items produced by the live response. */
  output?: RealtimeConversationItemUnion[];
}

export function voiceAgentRealtimeResponseSerializer(item: VoiceAgentRealtimeResponse): any {
  return {
    id: item["id"],
    object: item["object"],
    status: item["status"],
    status_details: !item["status_details"]
      ? item["status_details"]
      : realtimeResponseStatusDetailsSerializer(item["status_details"]),
    metadata: !item["metadata"] ? item["metadata"] : metadataSerializer(item["metadata"]),
    usage: !item["usage"] ? item["usage"] : realtimeResponseUsageSerializer(item["usage"]),
    conversation_id: item["conversation_id"],
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : _omitPropertiesMaxOutputTokensSerializer(item["max_output_tokens"]),
    audio: !item["audio"] ? item["audio"] : voiceResponseAudioSerializer(item["audio"]),
    output: !item["output"]
      ? item["output"]
      : realtimeConversationItemUnionArraySerializer(item["output"]),
  };
}

export function voiceAgentRealtimeResponseDeserializer(item: any): VoiceAgentRealtimeResponse {
  return {
    id: item["id"],
    object: item["object"],
    status: item["status"],
    status_details: !item["status_details"]
      ? item["status_details"]
      : realtimeResponseStatusDetailsDeserializer(item["status_details"]),
    metadata: !item["metadata"] ? item["metadata"] : metadataDeserializer(item["metadata"]),
    usage: !item["usage"] ? item["usage"] : realtimeResponseUsageDeserializer(item["usage"]),
    conversation_id: item["conversation_id"],
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : _omitPropertiesMaxOutputTokensDeserializer(item["max_output_tokens"]),
    audio: !item["audio"] ? item["audio"] : voiceResponseAudioDeserializer(item["audio"]),
    output: !item["output"]
      ? item["output"]
      : realtimeConversationItemUnionArrayDeserializer(item["output"]),
  };
}

/**
 * Returned when a Response is done streaming. Always emitted, no matter the
 * final state. The Response object included in the `response.done` event will
 * include all output Items in the Response but will omit the raw audio data.
 * Clients should check the `status` field of the Response to determine if it was successful
 * (`completed`) or if there was another outcome: `cancelled`, `failed`, or `incomplete`.
 * A response will contain all output items that were generated during the response, excluding
 * any audio content.
 */
export interface RealtimeServerEventResponseDone extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.done`. */
  type: "response.done";
  response: VoiceAgentRealtimeResponse;
}

export function realtimeServerEventResponseDoneSerializer(
  item: RealtimeServerEventResponseDone,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response: voiceAgentRealtimeResponseSerializer(item["response"]),
  };
}

export function realtimeServerEventResponseDoneDeserializer(
  item: any,
): RealtimeServerEventResponseDone {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response: voiceAgentRealtimeResponseDeserializer(item["response"]),
  };
}

/** Returned when the model-generated function call arguments are updated. */
export interface RealtimeServerEventResponseFunctionCallArgumentsDelta extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.function_call_arguments.delta`. */
  type: "response.function_call_arguments.delta";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the function call item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The ID of the function call. */
  call_id: string;
  /** The arguments delta as a JSON string. */
  delta: string;
}

export function realtimeServerEventResponseFunctionCallArgumentsDeltaSerializer(
  item: RealtimeServerEventResponseFunctionCallArgumentsDelta,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    call_id: item["call_id"],
    delta: item["delta"],
  };
}

export function realtimeServerEventResponseFunctionCallArgumentsDeltaDeserializer(
  item: any,
): RealtimeServerEventResponseFunctionCallArgumentsDelta {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    call_id: item["call_id"],
    delta: item["delta"],
  };
}

/**
 * Returned when the model-generated function call arguments are done streaming.
 * Also emitted when a Response is interrupted, incomplete, or cancelled.
 */
export interface RealtimeServerEventResponseFunctionCallArgumentsDone extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.function_call_arguments.done`. */
  type: "response.function_call_arguments.done";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the function call item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The ID of the function call. */
  call_id: string;
  /** The name of the function that was called. */
  name: string;
  /** The final arguments as a JSON string. */
  arguments: string;
}

export function realtimeServerEventResponseFunctionCallArgumentsDoneSerializer(
  item: RealtimeServerEventResponseFunctionCallArgumentsDone,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    call_id: item["call_id"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

export function realtimeServerEventResponseFunctionCallArgumentsDoneDeserializer(
  item: any,
): RealtimeServerEventResponseFunctionCallArgumentsDone {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    call_id: item["call_id"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

/** Returned when a new Item is created during Response generation. */
export interface RealtimeServerEventResponseOutputItemAdded extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.output_item.added`. */
  type: "response.output_item.added";
  /** The ID of the Response to which the item belongs. */
  response_id: string;
  /** The index of the output item in the Response. */
  output_index: number;
  item: RealtimeConversationItemUnion;
}

export function realtimeServerEventResponseOutputItemAddedSerializer(
  item: RealtimeServerEventResponseOutputItemAdded,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    output_index: item["output_index"],
    item: realtimeConversationItemUnionSerializer(item["item"]),
  };
}

export function realtimeServerEventResponseOutputItemAddedDeserializer(
  item: any,
): RealtimeServerEventResponseOutputItemAdded {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    output_index: item["output_index"],
    item: realtimeConversationItemUnionDeserializer(item["item"]),
  };
}

/**
 * Returned when an Item is done streaming. Also emitted when a Response is
 * interrupted, incomplete, or cancelled.
 */
export interface RealtimeServerEventResponseOutputItemDone extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.output_item.done`. */
  type: "response.output_item.done";
  /** The ID of the Response to which the item belongs. */
  response_id: string;
  /** The index of the output item in the Response. */
  output_index: number;
  item: RealtimeConversationItemUnion;
}

export function realtimeServerEventResponseOutputItemDoneSerializer(
  item: RealtimeServerEventResponseOutputItemDone,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    output_index: item["output_index"],
    item: realtimeConversationItemUnionSerializer(item["item"]),
  };
}

export function realtimeServerEventResponseOutputItemDoneDeserializer(
  item: any,
): RealtimeServerEventResponseOutputItemDone {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    output_index: item["output_index"],
    item: realtimeConversationItemUnionDeserializer(item["item"]),
  };
}

/** Returned when the text value of an "output_text" content part is updated. */
export interface RealtimeServerEventResponseTextDelta extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.output_text.delta`. */
  type: "response.output_text.delta";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
  /** The text delta. */
  delta: string;
}

export function realtimeServerEventResponseTextDeltaSerializer(
  item: RealtimeServerEventResponseTextDelta,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    delta: item["delta"],
  };
}

export function realtimeServerEventResponseTextDeltaDeserializer(
  item: any,
): RealtimeServerEventResponseTextDelta {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    delta: item["delta"],
  };
}

/**
 * Returned when the text value of an "output_text" content part is done streaming. Also
 * emitted when a Response is interrupted, incomplete, or cancelled.
 */
export interface RealtimeServerEventResponseTextDone extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.output_text.done`. */
  type: "response.output_text.done";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
  /** The final text content. */
  text: string;
}

export function realtimeServerEventResponseTextDoneSerializer(
  item: RealtimeServerEventResponseTextDone,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    text: item["text"],
  };
}

export function realtimeServerEventResponseTextDoneDeserializer(
  item: any,
): RealtimeServerEventResponseTextDone {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    text: item["text"],
  };
}

/**
 * Returned when a Session is created. Emitted automatically when a new
 * connection is established as the first server event. This event will contain
 * the default Session configuration.
 */
export interface RealtimeServerEventSessionCreated extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `session.created`. */
  type: "session.created";
  /** The session configuration. */
  session: VoiceAgentSessionResponse;
  /** The id of the persisted conversation. Only present when conversation persistence is enabled for the session. */
  conversation_id?: string;
}

export function realtimeServerEventSessionCreatedSerializer(
  item: RealtimeServerEventSessionCreated,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    session: voiceAgentSessionResponseSerializer(item["session"]),
    conversation_id: item["conversation_id"],
  };
}

export function realtimeServerEventSessionCreatedDeserializer(
  item: any,
): RealtimeServerEventSessionCreated {
  return {
    type: item["type"],
    event_id: item["event_id"],
    session: voiceAgentSessionResponseDeserializer(item["session"]),
    conversation_id: item["conversation_id"],
  };
}

/** The effective session configuration returned in voice-agent session lifecycle events. */
export type VoiceAgentSessionResponse = VoiceAgentSessionResponseConfig;

export function voiceAgentSessionResponseSerializer(item: VoiceAgentSessionResponse): any {
  return item;
}

export function voiceAgentSessionResponseDeserializer(item: any): VoiceAgentSessionResponse {
  return item;
}

/**
 * Returned when a session is updated with a `session.update` event, unless
 * there is an error.
 */
export interface RealtimeServerEventSessionUpdated extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `session.updated`. */
  type: "session.updated";
  /** The session configuration. */
  session: VoiceAgentSessionResponse;
}

export function realtimeServerEventSessionUpdatedSerializer(
  item: RealtimeServerEventSessionUpdated,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    session: voiceAgentSessionResponseSerializer(item["session"]),
  };
}

export function realtimeServerEventSessionUpdatedDeserializer(
  item: any,
): RealtimeServerEventSessionUpdated {
  return {
    type: item["type"],
    event_id: item["event_id"],
    session: voiceAgentSessionResponseDeserializer(item["session"]),
  };
}

/**
 * **WebRTC/SIP Only:** Emitted when the output audio buffer is cleared. This happens either in VAD
 * mode when the user has interrupted (`input_audio_buffer.speech_started`),
 * or when the client has emitted the `output_audio_buffer.clear` event to manually
 * cut off the current audio response.
 * [Learn more](/docs/guides/realtime-conversations#client-and-server-events-for-audio-in-webrtc).
 */
export interface RealtimeServerEventOutputAudioBufferCleared extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `output_audio_buffer.cleared`. */
  type: "output_audio_buffer.cleared";
  /** The unique ID of the response that produced the audio. */
  response_id: string;
}

export function realtimeServerEventOutputAudioBufferClearedSerializer(
  item: RealtimeServerEventOutputAudioBufferCleared,
): any {
  return { type: item["type"], event_id: item["event_id"], response_id: item["response_id"] };
}

export function realtimeServerEventOutputAudioBufferClearedDeserializer(
  item: any,
): RealtimeServerEventOutputAudioBufferCleared {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
  };
}

/**
 * Sent by the server when an Item is added to the default Conversation. This can happen in several cases:
 * - When the client sends a `conversation.item.create` event.
 * - When the input audio buffer is committed. In this case the item will be a user message containing the audio from the buffer.
 * - When the model is generating a Response. In this case the `conversation.item.added` event will be sent when the model starts generating a specific Item, and thus it will not yet have any content (and `status` will be `in_progress`).
 * The event will include the full content of the Item (except when model is generating a Response) except for audio data, which can be retrieved separately with a `conversation.item.retrieve` event if necessary.
 */
export interface RealtimeServerEventConversationItemAdded extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.item.added`. */
  type: "conversation.item.added";
  previous_item_id?: string;
  item: RealtimeConversationItemUnion;
}

export function realtimeServerEventConversationItemAddedSerializer(
  item: RealtimeServerEventConversationItemAdded,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    previous_item_id: item["previous_item_id"],
    item: realtimeConversationItemUnionSerializer(item["item"]),
  };
}

export function realtimeServerEventConversationItemAddedDeserializer(
  item: any,
): RealtimeServerEventConversationItemAdded {
  return {
    type: item["type"],
    event_id: item["event_id"],
    previous_item_id: item["previous_item_id"],
    item: realtimeConversationItemUnionDeserializer(item["item"]),
  };
}

/**
 * Returned when a conversation item is finalized.
 * The event will include the full content of the Item except for audio data, which can be retrieved separately with a `conversation.item.retrieve` event if needed.
 */
export interface RealtimeServerEventConversationItemDone extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.item.done`. */
  type: "conversation.item.done";
  previous_item_id?: string;
  item: RealtimeConversationItemUnion;
}

export function realtimeServerEventConversationItemDoneSerializer(
  item: RealtimeServerEventConversationItemDone,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    previous_item_id: item["previous_item_id"],
    item: realtimeConversationItemUnionSerializer(item["item"]),
  };
}

export function realtimeServerEventConversationItemDoneDeserializer(
  item: any,
): RealtimeServerEventConversationItemDone {
  return {
    type: item["type"],
    event_id: item["event_id"],
    previous_item_id: item["previous_item_id"],
    item: realtimeConversationItemUnionDeserializer(item["item"]),
  };
}

/**
 * Returned when the Server VAD timeout is triggered for the input audio buffer. This is configured
 * with `idle_timeout_ms` in the `turn_detection` settings of the session, and it indicates that
 * there hasn't been any speech detected for the configured duration.
 * The `audio_start_ms` and `audio_end_ms` fields indicate the segment of audio after the last
 * model response up to the triggering time, as an offset from the beginning of audio written
 * to the input audio buffer. This means it demarcates the segment of audio that was silent and
 * the difference between the start and end values will roughly match the configured timeout.
 * The empty audio will be committed to the conversation as an `input_audio` item (there will be a
 * `input_audio_buffer.committed` event) and a model response will be generated. There may be speech
 * that didn't trigger VAD but is still detected by the model, so the model may respond with
 * something relevant to the conversation or a prompt to continue speaking.
 */
export interface RealtimeServerEventInputAudioBufferTimeoutTriggered extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `input_audio_buffer.timeout_triggered`. */
  type: "input_audio_buffer.timeout_triggered";
  /** Millisecond offset of audio written to the input audio buffer that was after the playback time of the last model response. */
  audio_start_ms: number;
  /** Millisecond offset of audio written to the input audio buffer at the time the timeout was triggered. */
  audio_end_ms: number;
  /** The ID of the item associated with this segment. */
  item_id: string;
}

export function realtimeServerEventInputAudioBufferTimeoutTriggeredSerializer(
  item: RealtimeServerEventInputAudioBufferTimeoutTriggered,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    audio_start_ms: item["audio_start_ms"],
    audio_end_ms: item["audio_end_ms"],
    item_id: item["item_id"],
  };
}

export function realtimeServerEventInputAudioBufferTimeoutTriggeredDeserializer(
  item: any,
): RealtimeServerEventInputAudioBufferTimeoutTriggered {
  return {
    type: item["type"],
    event_id: item["event_id"],
    audio_start_ms: item["audio_start_ms"],
    audio_end_ms: item["audio_end_ms"],
    item_id: item["item_id"],
  };
}

/** Returned when an input audio transcription segment is identified for an item. */
export interface RealtimeServerEventConversationItemInputAudioTranscriptionSegment extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.item.input_audio_transcription.segment`. */
  type: "conversation.item.input_audio_transcription.segment";
  /** The ID of the item containing the input audio content. */
  item_id: string;
  /** The index of the input audio content part within the item. */
  content_index: number;
  /** The text for this segment. */
  text: string;
  /** The segment identifier. */
  id: string;
  /** The detected speaker label for this segment. */
  speaker: string;
  /** Start time of the segment in seconds. */
  start: number;
  /** End time of the segment in seconds. */
  end: number;
}

export function realtimeServerEventConversationItemInputAudioTranscriptionSegmentSerializer(
  item: RealtimeServerEventConversationItemInputAudioTranscriptionSegment,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    text: item["text"],
    id: item["id"],
    speaker: item["speaker"],
    start: item["start"],
    end: item["end"],
  };
}

export function realtimeServerEventConversationItemInputAudioTranscriptionSegmentDeserializer(
  item: any,
): RealtimeServerEventConversationItemInputAudioTranscriptionSegment {
  return {
    type: item["type"],
    event_id: item["event_id"],
    item_id: item["item_id"],
    content_index: item["content_index"],
    text: item["text"],
    id: item["id"],
    speaker: item["speaker"],
    start: item["start"],
    end: item["end"],
  };
}

/** Returned when listing MCP tools is in progress for an item. */
export interface RealtimeServerEventMCPListToolsInProgress extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `mcp_list_tools.in_progress`. */
  type: "mcp_list_tools.in_progress";
  /** The ID of the MCP list tools item. */
  item_id: string;
}

export function realtimeServerEventMCPListToolsInProgressSerializer(
  item: RealtimeServerEventMCPListToolsInProgress,
): any {
  return { type: item["type"], event_id: item["event_id"], item_id: item["item_id"] };
}

export function realtimeServerEventMCPListToolsInProgressDeserializer(
  item: any,
): RealtimeServerEventMCPListToolsInProgress {
  return {
    type: item["type"],
    event_id: item["event_id"],
    item_id: item["item_id"],
  };
}

/** Returned when listing MCP tools has completed for an item. */
export interface RealtimeServerEventMCPListToolsCompleted extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `mcp_list_tools.completed`. */
  type: "mcp_list_tools.completed";
  /** The ID of the MCP list tools item. */
  item_id: string;
}

export function realtimeServerEventMCPListToolsCompletedSerializer(
  item: RealtimeServerEventMCPListToolsCompleted,
): any {
  return { type: item["type"], event_id: item["event_id"], item_id: item["item_id"] };
}

export function realtimeServerEventMCPListToolsCompletedDeserializer(
  item: any,
): RealtimeServerEventMCPListToolsCompleted {
  return {
    type: item["type"],
    event_id: item["event_id"],
    item_id: item["item_id"],
  };
}

/** Returned when listing MCP tools has failed for an item. */
export interface RealtimeServerEventMCPListToolsFailed extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `mcp_list_tools.failed`. */
  type: "mcp_list_tools.failed";
  /** The ID of the MCP list tools item. */
  item_id: string;
}

export function realtimeServerEventMCPListToolsFailedSerializer(
  item: RealtimeServerEventMCPListToolsFailed,
): any {
  return { type: item["type"], event_id: item["event_id"], item_id: item["item_id"] };
}

export function realtimeServerEventMCPListToolsFailedDeserializer(
  item: any,
): RealtimeServerEventMCPListToolsFailed {
  return {
    type: item["type"],
    event_id: item["event_id"],
    item_id: item["item_id"],
  };
}

/** Returned when MCP tool call arguments are updated during response generation. */
export interface RealtimeServerEventResponseMCPCallArgumentsDelta extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.mcp_call_arguments.delta`. */
  type: "response.mcp_call_arguments.delta";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the MCP tool call item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The JSON-encoded arguments delta. */
  delta: string;
  obfuscation?: string;
}

export function realtimeServerEventResponseMCPCallArgumentsDeltaSerializer(
  item: RealtimeServerEventResponseMCPCallArgumentsDelta,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    delta: item["delta"],
    obfuscation: item["obfuscation"],
  };
}

export function realtimeServerEventResponseMCPCallArgumentsDeltaDeserializer(
  item: any,
): RealtimeServerEventResponseMCPCallArgumentsDelta {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    delta: item["delta"],
    obfuscation: item["obfuscation"],
  };
}

/** Returned when MCP tool call arguments are finalized during response generation. */
export interface RealtimeServerEventResponseMCPCallArgumentsDone extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.mcp_call_arguments.done`. */
  type: "response.mcp_call_arguments.done";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the MCP tool call item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The final JSON-encoded arguments string. */
  arguments: string;
}

export function realtimeServerEventResponseMCPCallArgumentsDoneSerializer(
  item: RealtimeServerEventResponseMCPCallArgumentsDone,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    arguments: item["arguments"],
  };
}

export function realtimeServerEventResponseMCPCallArgumentsDoneDeserializer(
  item: any,
): RealtimeServerEventResponseMCPCallArgumentsDone {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    arguments: item["arguments"],
  };
}

/** Returned when an MCP tool call has started and is in progress. */
export interface RealtimeServerEventResponseMCPCallInProgress extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.mcp_call.in_progress`. */
  type: "response.mcp_call.in_progress";
  /** The index of the output item in the response. */
  output_index: number;
  /** The ID of the MCP tool call item. */
  item_id: string;
}

export function realtimeServerEventResponseMCPCallInProgressSerializer(
  item: RealtimeServerEventResponseMCPCallInProgress,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    output_index: item["output_index"],
    item_id: item["item_id"],
  };
}

export function realtimeServerEventResponseMCPCallInProgressDeserializer(
  item: any,
): RealtimeServerEventResponseMCPCallInProgress {
  return {
    type: item["type"],
    event_id: item["event_id"],
    output_index: item["output_index"],
    item_id: item["item_id"],
  };
}

/** Returned when an MCP tool call has completed successfully. */
export interface RealtimeServerEventResponseMCPCallCompleted extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.mcp_call.completed`. */
  type: "response.mcp_call.completed";
  /** The index of the output item in the response. */
  output_index: number;
  /** The ID of the MCP tool call item. */
  item_id: string;
}

export function realtimeServerEventResponseMCPCallCompletedSerializer(
  item: RealtimeServerEventResponseMCPCallCompleted,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    output_index: item["output_index"],
    item_id: item["item_id"],
  };
}

export function realtimeServerEventResponseMCPCallCompletedDeserializer(
  item: any,
): RealtimeServerEventResponseMCPCallCompleted {
  return {
    type: item["type"],
    event_id: item["event_id"],
    output_index: item["output_index"],
    item_id: item["item_id"],
  };
}

/** Returned when an MCP tool call has failed. */
export interface RealtimeServerEventResponseMCPCallFailed extends RealtimeServerEvent {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.mcp_call.failed`. */
  type: "response.mcp_call.failed";
  /** The index of the output item in the response. */
  output_index: number;
  /** The ID of the MCP tool call item. */
  item_id: string;
}

export function realtimeServerEventResponseMCPCallFailedSerializer(
  item: RealtimeServerEventResponseMCPCallFailed,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    output_index: item["output_index"],
    item_id: item["item_id"],
  };
}

export function realtimeServerEventResponseMCPCallFailedDeserializer(
  item: any,
): RealtimeServerEventResponseMCPCallFailed {
  return {
    type: item["type"],
    event_id: item["event_id"],
    output_index: item["output_index"],
    item_id: item["item_id"],
  };
}

/** The `warning` server event. */
export interface VoiceAgentServerEventWarning extends RealtimeServerEvent {
  type: "warning";
  event_id: string;
  warning: VoiceAgentServerEventWarningDetails;
}

export function voiceAgentServerEventWarningSerializer(item: VoiceAgentServerEventWarning): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    warning: voiceAgentServerEventWarningDetailsSerializer(item["warning"]),
  };
}

export function voiceAgentServerEventWarningDeserializer(item: any): VoiceAgentServerEventWarning {
  return {
    type: item["type"],
    event_id: item["event_id"],
    warning: voiceAgentServerEventWarningDetailsDeserializer(item["warning"]),
  };
}

/** The `session.avatar.switch_to_speaking` server event. */
export interface VoiceAgentServerEventSessionAvatarSwitchToSpeaking extends RealtimeServerEvent {
  type: "session.avatar.switch_to_speaking";
  event_id: string;
  turn_id?: string;
}

export function voiceAgentServerEventSessionAvatarSwitchToSpeakingSerializer(
  item: VoiceAgentServerEventSessionAvatarSwitchToSpeaking,
): any {
  return { type: item["type"], event_id: item["event_id"], turn_id: item["turn_id"] };
}

export function voiceAgentServerEventSessionAvatarSwitchToSpeakingDeserializer(
  item: any,
): VoiceAgentServerEventSessionAvatarSwitchToSpeaking {
  return {
    type: item["type"],
    event_id: item["event_id"],
    turn_id: item["turn_id"],
  };
}

/** The `session.avatar.switch_to_idle` server event. */
export interface VoiceAgentServerEventSessionAvatarSwitchToIdle extends RealtimeServerEvent {
  type: "session.avatar.switch_to_idle";
  event_id: string;
  turn_id?: string;
}

export function voiceAgentServerEventSessionAvatarSwitchToIdleSerializer(
  item: VoiceAgentServerEventSessionAvatarSwitchToIdle,
): any {
  return { type: item["type"], event_id: item["event_id"], turn_id: item["turn_id"] };
}

export function voiceAgentServerEventSessionAvatarSwitchToIdleDeserializer(
  item: any,
): VoiceAgentServerEventSessionAvatarSwitchToIdle {
  return {
    type: item["type"],
    event_id: item["event_id"],
    turn_id: item["turn_id"],
  };
}

/** The `response.audio_timestamp.delta` server event. */
export interface VoiceAgentServerEventResponseAudioTimestampDelta extends RealtimeServerEvent {
  type: "response.audio_timestamp.delta";
  event_id: string;
  response_id: string;
  item_id: string;
  output_index: number;
  content_index: number;
  audio_offset_ms: number;
  audio_duration_ms: number;
  text: string;
  timestamp_type: "word";
}

export function voiceAgentServerEventResponseAudioTimestampDeltaSerializer(
  item: VoiceAgentServerEventResponseAudioTimestampDelta,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    audio_offset_ms: item["audio_offset_ms"],
    audio_duration_ms: item["audio_duration_ms"],
    text: item["text"],
    timestamp_type: item["timestamp_type"],
  };
}

export function voiceAgentServerEventResponseAudioTimestampDeltaDeserializer(
  item: any,
): VoiceAgentServerEventResponseAudioTimestampDelta {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    audio_offset_ms: item["audio_offset_ms"],
    audio_duration_ms: item["audio_duration_ms"],
    text: item["text"],
    timestamp_type: item["timestamp_type"],
  };
}

/** The `response.audio_timestamp.done` server event. */
export interface VoiceAgentServerEventResponseAudioTimestampDone extends RealtimeServerEvent {
  type: "response.audio_timestamp.done";
  event_id: string;
  response_id: string;
  item_id: string;
  output_index: number;
  content_index: number;
}

export function voiceAgentServerEventResponseAudioTimestampDoneSerializer(
  item: VoiceAgentServerEventResponseAudioTimestampDone,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
  };
}

export function voiceAgentServerEventResponseAudioTimestampDoneDeserializer(
  item: any,
): VoiceAgentServerEventResponseAudioTimestampDone {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
  };
}

/** The `response.animation_blendshapes.delta` server event. */
export interface VoiceAgentServerEventResponseAnimationBlendshapesDelta extends RealtimeServerEvent {
  type: "response.animation_blendshapes.delta";
  event_id: string;
  response_id: string;
  item_id: string;
  output_index: number;
  content_index: number;
  /** Animation frames as numeric blendshape weights. */
  frames: number[][];
  /** The index of the first frame in this delta. */
  frame_index: number;
}

export function voiceAgentServerEventResponseAnimationBlendshapesDeltaSerializer(
  item: VoiceAgentServerEventResponseAnimationBlendshapesDelta,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    frames: item["frames"].map((p: any) => {
      return p.map((p: any) => {
        return p;
      });
    }),
    frame_index: item["frame_index"],
  };
}

export function voiceAgentServerEventResponseAnimationBlendshapesDeltaDeserializer(
  item: any,
): VoiceAgentServerEventResponseAnimationBlendshapesDelta {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    frames: item["frames"].map((p: any) => {
      return p.map((p1: any) => {
        return p1;
      });
    }),
    frame_index: item["frame_index"],
  };
}

/** The `response.animation_blendshapes.done` server event. */
export interface VoiceAgentServerEventResponseAnimationBlendshapesDone extends RealtimeServerEvent {
  type: "response.animation_blendshapes.done";
  event_id: string;
  response_id: string;
  item_id: string;
  output_index: number;
}

export function voiceAgentServerEventResponseAnimationBlendshapesDoneSerializer(
  item: VoiceAgentServerEventResponseAnimationBlendshapesDone,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
  };
}

export function voiceAgentServerEventResponseAnimationBlendshapesDoneDeserializer(
  item: any,
): VoiceAgentServerEventResponseAnimationBlendshapesDone {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
  };
}

/** The `response.animation_viseme.delta` server event. */
export interface VoiceAgentServerEventResponseAnimationVisemeDelta extends RealtimeServerEvent {
  type: "response.animation_viseme.delta";
  event_id: string;
  response_id: string;
  item_id: string;
  output_index: number;
  content_index: number;
  audio_offset_ms: number;
  viseme_id: number;
}

export function voiceAgentServerEventResponseAnimationVisemeDeltaSerializer(
  item: VoiceAgentServerEventResponseAnimationVisemeDelta,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    audio_offset_ms: item["audio_offset_ms"],
    viseme_id: item["viseme_id"],
  };
}

export function voiceAgentServerEventResponseAnimationVisemeDeltaDeserializer(
  item: any,
): VoiceAgentServerEventResponseAnimationVisemeDelta {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
    audio_offset_ms: item["audio_offset_ms"],
    viseme_id: item["viseme_id"],
  };
}

/** The `response.animation_viseme.done` server event. */
export interface VoiceAgentServerEventResponseAnimationVisemeDone extends RealtimeServerEvent {
  type: "response.animation_viseme.done";
  event_id: string;
  response_id: string;
  item_id: string;
  output_index: number;
  content_index: number;
}

export function voiceAgentServerEventResponseAnimationVisemeDoneSerializer(
  item: VoiceAgentServerEventResponseAnimationVisemeDone,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
  };
}

export function voiceAgentServerEventResponseAnimationVisemeDoneDeserializer(
  item: any,
): VoiceAgentServerEventResponseAnimationVisemeDone {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    content_index: item["content_index"],
  };
}

/** The `response.video.delta` server event. */
export interface VoiceAgentServerEventResponseVideoDelta extends RealtimeServerEvent {
  type: "response.video.delta";
  event_id: string;
  output_index: number;
  codec: string;
  /** The base64-encoded video frame data. */
  delta: string;
}

export function voiceAgentServerEventResponseVideoDeltaSerializer(
  item: VoiceAgentServerEventResponseVideoDelta,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    output_index: item["output_index"],
    codec: item["codec"],
    delta: item["delta"],
  };
}

export function voiceAgentServerEventResponseVideoDeltaDeserializer(
  item: any,
): VoiceAgentServerEventResponseVideoDelta {
  return {
    type: item["type"],
    event_id: item["event_id"],
    output_index: item["output_index"],
    codec: item["codec"],
    delta: item["delta"],
  };
}

/** Token usage statistics for the request. */
export interface CreateTranscriptionResponseJsonUsage {
  type: CreateTranscriptionResponseJsonUsageType;
}

export function createTranscriptionResponseJsonUsageSerializer(
  item: CreateTranscriptionResponseJsonUsage,
): any {
  return { type: item["type"] };
}

export function createTranscriptionResponseJsonUsageDeserializer(
  item: any,
): CreateTranscriptionResponseJsonUsage {
  return {
    type: item["type"],
  };
}

/** Alias for CreateTranscriptionResponseJsonUsageUnion */
export type CreateTranscriptionResponseJsonUsageUnion =
  TranscriptTextUsageTokens | TranscriptTextUsageDuration | CreateTranscriptionResponseJsonUsage;

export function createTranscriptionResponseJsonUsageUnionSerializer(
  item: CreateTranscriptionResponseJsonUsageUnion,
): any {
  switch (item.type) {
    case "tokens":
      return transcriptTextUsageTokensSerializer(item as TranscriptTextUsageTokens);

    case "duration":
      return transcriptTextUsageDurationSerializer(item as TranscriptTextUsageDuration);

    default:
      return createTranscriptionResponseJsonUsageSerializer(item);
  }
}

export function createTranscriptionResponseJsonUsageUnionDeserializer(
  item: any,
): CreateTranscriptionResponseJsonUsageUnion {
  switch (item["type"]) {
    case "tokens":
      return transcriptTextUsageTokensDeserializer(item as TranscriptTextUsageTokens);

    case "duration":
      return transcriptTextUsageDurationDeserializer(item as TranscriptTextUsageDuration);

    default:
      return createTranscriptionResponseJsonUsageDeserializer(item);
  }
}

/** Type of CreateTranscriptionResponseJsonUsageType */
export type CreateTranscriptionResponseJsonUsageType = "tokens" | "duration";

/** The template for omitting properties. */
export interface OmitPropertiesRealtimeResponse1 {
  /** The unique ID of the response, will look like `resp_1234`. */
  id?: string;
  /** The object type, must be `realtime.response`. */
  object?: "realtime.response";
  /**
   * The final status of the response (`completed`, `cancelled`, `failed`, or
   *   `incomplete`, `in_progress`).
   */
  status?: "completed" | "cancelled" | "failed" | "incomplete" | "in_progress";
  /** Additional details about the status. */
  status_details?: RealtimeResponseStatusDetails;
  metadata?: Metadata;
  /**
   * Usage statistics for the Response, this will correspond to billing. A
   *   Realtime API session will maintain a conversation context and append new
   *   Items to the Conversation, thus output from previous turns (text and
   *   audio tokens) will become the input for later turns.
   */
  usage?: RealtimeResponseUsage;
  /**
   * Which conversation the response is added to, determined by the `conversation`
   *   field in the `response.create` event. If `auto`, the response will be added to
   *   the default conversation and the value of `conversation_id` will be an id like
   *   `conv_1234`. If `none`, the response will not be added to any conversation and
   *   the value of `conversation_id` will be `null`. If responses are being triggered
   *   automatically by VAD the response will be added to the default conversation
   */
  conversation_id?: string;
  /**
   * The set of modalities the model used to respond, currently the only possible values are
   *   `[\"audio\"]`, `[\"text\"]`. Audio output always include a text transcript. Setting the
   *   output to mode `text` will disable audio output from the model.
   */
  output_modalities?: ("text" | "audio")[];
  /**
   * Maximum number of output tokens for a single assistant response,
   *   inclusive of tool calls, that was used in this response.
   */
  max_output_tokens?: number | "inf";
}

export function omitPropertiesRealtimeResponse1Serializer(
  item: OmitPropertiesRealtimeResponse1,
): any {
  return {
    id: item["id"],
    object: item["object"],
    status: item["status"],
    status_details: !item["status_details"]
      ? item["status_details"]
      : realtimeResponseStatusDetailsSerializer(item["status_details"]),
    metadata: !item["metadata"] ? item["metadata"] : metadataSerializer(item["metadata"]),
    usage: !item["usage"] ? item["usage"] : realtimeResponseUsageSerializer(item["usage"]),
    conversation_id: item["conversation_id"],
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : _omitPropertiesMaxOutputTokensSerializer(item["max_output_tokens"]),
  };
}

export function omitPropertiesRealtimeResponse1Deserializer(
  item: any,
): OmitPropertiesRealtimeResponse1 {
  return {
    id: item["id"],
    object: item["object"],
    status: item["status"],
    status_details: !item["status_details"]
      ? item["status_details"]
      : realtimeResponseStatusDetailsDeserializer(item["status_details"]),
    metadata: !item["metadata"] ? item["metadata"] : metadataDeserializer(item["metadata"]),
    usage: !item["usage"] ? item["usage"] : realtimeResponseUsageDeserializer(item["usage"]),
    conversation_id: item["conversation_id"],
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    max_output_tokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : _omitPropertiesMaxOutputTokensDeserializer(item["max_output_tokens"]),
  };
}

/** model interface RealtimeServerEventErrorError */
export interface RealtimeServerEventErrorError {
  type: string;
  code?: string;
  message: string;
  param?: string;
  event_id?: string;
}

export function realtimeServerEventErrorErrorSerializer(item: RealtimeServerEventErrorError): any {
  return {
    type: item["type"],
    code: item["code"],
    message: item["message"],
    param: item["param"],
    event_id: item["event_id"],
  };
}

export function realtimeServerEventErrorErrorDeserializer(
  item: any,
): RealtimeServerEventErrorError {
  return {
    type: item["type"],
    code: item["code"],
    message: item["message"],
    param: item["param"],
    event_id: item["event_id"],
  };
}

/**
 * Returned when an error occurs, which could be a client problem or a server
 * problem. Most errors are recoverable and the session will stay open, we
 * recommend to implementors to monitor and log error messages by default.
 */
export interface RealtimeServerEventError {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `error`. */
  type: "error";
  /** Details of the error. */
  error: RealtimeServerEventErrorError;
}

export function realtimeServerEventErrorSerializer(item: RealtimeServerEventError): any {
  return {
    event_id: item["event_id"],
    type: item["type"],
    error: realtimeServerEventErrorErrorSerializer(item["error"]),
  };
}

export function realtimeServerEventErrorDeserializer(item: any): RealtimeServerEventError {
  return {
    event_id: item["event_id"],
    type: item["type"],
    error: realtimeServerEventErrorErrorDeserializer(item["error"]),
  };
}

/** The kind-specific inputs for generating and creating an agent. */
export type GenerateAgentRequest = GenerateVoiceAgentRequest;

export function generateAgentRequestSerializer(item: GenerateAgentRequest): any {
  return item;
}

/** A stable v1 message sent by a client over a voice-agent WebSocket. */
export type VoiceAgentClientEvent =
  | RealtimeClientEventConversationItemCreate
  | RealtimeClientEventConversationItemDelete
  | RealtimeClientEventConversationItemRetrieve
  | RealtimeClientEventConversationItemTruncate
  | RealtimeClientEventInputAudioBufferAppend
  | RealtimeClientEventInputAudioBufferClear
  | RealtimeClientEventOutputAudioBufferClear
  | RealtimeClientEventInputAudioBufferCommit
  | RealtimeClientEventResponseCancel
  | RealtimeClientEventResponseCreate
  | VoiceAgentClientEventSessionUpdate
  | VoiceAgentClientEventSessionAvatarConnect;

export function voiceAgentClientEventSerializer(item: VoiceAgentClientEvent): any {
  return item;
}

export function voiceAgentClientEventDeserializer(item: any): VoiceAgentClientEvent {
  return item;
}

/** A stable v1 message sent by the service over a voice-agent WebSocket. */
export type VoiceAgentServerEvent =
  | RealtimeServerEventConversationItemAdded
  | RealtimeServerEventConversationItemCreated
  | RealtimeServerEventConversationItemDeleted
  | RealtimeServerEventConversationItemDone
  | RealtimeServerEventConversationItemInputAudioTranscriptionCompleted
  | RealtimeServerEventConversationItemInputAudioTranscriptionDelta
  | RealtimeServerEventConversationItemInputAudioTranscriptionFailed
  | RealtimeServerEventConversationItemInputAudioTranscriptionSegment
  | RealtimeServerEventConversationItemRetrieved
  | RealtimeServerEventConversationItemTruncated
  | RealtimeServerEventInputAudioBufferCleared
  | RealtimeServerEventInputAudioBufferCommitted
  | RealtimeServerEventInputAudioBufferSpeechStarted
  | RealtimeServerEventInputAudioBufferSpeechStopped
  | RealtimeServerEventInputAudioBufferTimeoutTriggered
  | RealtimeServerEventMCPListToolsCompleted
  | RealtimeServerEventMCPListToolsFailed
  | RealtimeServerEventMCPListToolsInProgress
  | RealtimeServerEventOutputAudioBufferCleared
  | RealtimeServerEventRateLimitsUpdated
  | RealtimeServerEventResponseAudioDelta
  | RealtimeServerEventResponseAudioDone
  | RealtimeServerEventResponseAudioTranscriptDelta
  | RealtimeServerEventResponseAudioTranscriptDone
  | RealtimeServerEventResponseContentPartAdded
  | RealtimeServerEventResponseContentPartDone
  | RealtimeServerEventResponseCreated
  | RealtimeServerEventResponseDone
  | RealtimeServerEventResponseFunctionCallArgumentsDelta
  | RealtimeServerEventResponseFunctionCallArgumentsDone
  | RealtimeServerEventResponseMCPCallArgumentsDelta
  | RealtimeServerEventResponseMCPCallArgumentsDone
  | RealtimeServerEventResponseMCPCallCompleted
  | RealtimeServerEventResponseMCPCallFailed
  | RealtimeServerEventResponseMCPCallInProgress
  | RealtimeServerEventResponseOutputItemAdded
  | RealtimeServerEventResponseOutputItemDone
  | RealtimeServerEventResponseTextDelta
  | RealtimeServerEventResponseTextDone
  | RealtimeServerEventSessionCreated
  | RealtimeServerEventSessionUpdated
  | RealtimeServerEventError
  | VoiceAgentServerEventWarning
  | VoiceAgentServerEventSessionAvatarConnecting
  | VoiceAgentServerEventSessionAvatarSwitchToSpeaking
  | VoiceAgentServerEventSessionAvatarSwitchToIdle
  | VoiceAgentServerEventResponseAudioTimestampDelta
  | VoiceAgentServerEventResponseAudioTimestampDone
  | VoiceAgentServerEventResponseAnimationBlendshapesDelta
  | VoiceAgentServerEventResponseAnimationBlendshapesDone
  | VoiceAgentServerEventResponseAnimationVisemeDelta
  | VoiceAgentServerEventResponseAnimationVisemeDone
  | VoiceAgentServerEventResponseVideoDelta;

export function voiceAgentServerEventSerializer(item: VoiceAgentServerEvent): any {
  return item;
}

export function voiceAgentServerEventDeserializer(item: any): VoiceAgentServerEvent {
  return item;
}

/** A JSON text message exchanged over an established voice-agent WebSocket. Audio bytes are base64-encoded in JSON event fields. */
export type VoiceAgentWebSocketMessage = VoiceAgentClientEvent | VoiceAgentServerEvent;

export function voiceAgentWebSocketMessageSerializer(item: VoiceAgentWebSocketMessage): any {
  return item;
}

export function voiceAgentWebSocketMessageDeserializer(item: any): VoiceAgentWebSocketMessage {
  return item;
}

/** The WebSocket subprotocol supported by a voice-agent connection. */
export type VoiceAgentWebSocketSubprotocol = "realtime";

export type AgentEndpointConversationsGetAgentConversationAudioContentResponse = {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeReadableStream;
};

export type AgentEndpointConversationsGetAgentConversationItemAudioContentResponse = {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeReadableStream;
};
