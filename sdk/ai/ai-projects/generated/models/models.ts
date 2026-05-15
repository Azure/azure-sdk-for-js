// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileContents, createFilePartDescriptor } from "../static-helpers/multipartHelpers.js";
import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
  /** The endpoint configuration for the agent */
  agent_endpoint?: AgentEndpointConfig;
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
    versions: _agentObjectVersionsDeserializer(item["versions"]),
    agent_endpoint: !item["agent_endpoint"]
      ? item["agent_endpoint"]
      : agentEndpointConfigDeserializer(item["agent_endpoint"]),
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

/** model interface _AgentObjectVersions */
export interface _AgentObjectVersions {
  latest: AgentVersion;
}

export function _agentObjectVersionsDeserializer(item: any): _AgentObjectVersions {
  return {
    latest: agentVersionDeserializer(item["latest"]),
  };
}

/** model interface AgentVersion */
export interface AgentVersion {
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata: Record<string, string> | null;
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
  definition: AgentDefinitionUnion;
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
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(
          Object.entries(item["metadata"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
    object: item["object"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    created_at: new Date(item["created_at"] * 1000),
    definition: agentDefinitionUnionDeserializer(item["definition"]),
    status: item["status"],
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

/** model interface AgentDefinition */
export interface AgentDefinition {
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

/** Alias for AgentDefinitionUnion */
export type AgentDefinitionUnion =
  | HostedAgentDefinition
  | PromptAgentDefinition
  | WorkflowAgentDefinition
  | AgentDefinition;

export function agentDefinitionUnionSerializer(item: AgentDefinitionUnion): any {
  switch (item.kind) {
    case "hosted":
      return hostedAgentDefinitionSerializer(item as HostedAgentDefinition);

    case "prompt":
      return promptAgentDefinitionSerializer(item as PromptAgentDefinition);

    case "workflow":
      return workflowAgentDefinitionSerializer(item as WorkflowAgentDefinition);

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

    default:
      return agentDefinitionDeserializer(item);
  }
}

/** Type of AgentKind */
export type AgentKind = "prompt" | "hosted" | "workflow";

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
  /**
   * An array of tools the hosted agent's model may call while generating a response. You
   * can specify which tool to use by setting the `tool_choice` parameter.
   */
  tools?: ToolUnion[];
  /** The protocols that the agent supports for ingress communication of the containers. */
  container_protocol_versions?: ProtocolVersionRecord[];
  /** The CPU configuration for the hosted agent. */
  cpu: string;
  /** The memory configuration for the hosted agent. */
  memory: string;
  /** Environment variables to set in the hosted agent container. */
  environment_variables?: Record<string, string>;
  /** The image ID for the agent, applicable to image-based hosted agents. */
  image?: string;
  /** Container-based deployment configuration. Provide this for image-based deployments. Mutually exclusive with code_configuration — the service validates that exactly one is set. */
  container_configuration?: ContainerConfiguration;
  /** The protocols that the agent supports for ingress communication. */
  protocol_versions?: ProtocolVersionRecord[];
  /** Code-based deployment configuration. Provide this for code-based deployments. Mutually exclusive with container_configuration — the service validates that exactly one is set. */
  code_configuration?: CodeConfiguration;
  /** Optional customer-supplied telemetry configuration for exporting container logs, traces, and metrics. */
  telemetry_config?: TelemetryConfig;
}

export function hostedAgentDefinitionSerializer(item: HostedAgentDefinition): any {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"] ? item["rai_config"] : raiConfigSerializer(item["rai_config"]),
    tools: !item["tools"] ? item["tools"] : toolUnionArraySerializer(item["tools"]),
    container_protocol_versions: !item["container_protocol_versions"]
      ? item["container_protocol_versions"]
      : protocolVersionRecordArraySerializer(item["container_protocol_versions"]),
    cpu: item["cpu"],
    memory: item["memory"],
    environment_variables: item["environment_variables"],
    image: item["image"],
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
  };
}

export function hostedAgentDefinitionDeserializer(item: any): HostedAgentDefinition {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"]
      ? item["rai_config"]
      : raiConfigDeserializer(item["rai_config"]),
    tools: !item["tools"] ? item["tools"] : toolUnionArrayDeserializer(item["tools"]),
    container_protocol_versions: !item["container_protocol_versions"]
      ? item["container_protocol_versions"]
      : protocolVersionRecordArrayDeserializer(item["container_protocol_versions"]),
    cpu: item["cpu"],
    memory: item["memory"],
    environment_variables: !item["environment_variables"]
      ? item["environment_variables"]
      : Object.fromEntries(
          Object.entries(item["environment_variables"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    image: item["image"],
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
  | WorkIQPreviewTool
  | FabricIQPreviewTool
  | MemorySearchPreviewTool
  | ToolboxSearchPreviewTool
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

    case "work_iq_preview":
      return workIQPreviewToolSerializer(item as WorkIQPreviewTool);

    case "fabric_iq_preview":
      return fabricIQPreviewToolSerializer(item as FabricIQPreviewTool);

    case "memory_search_preview":
      return memorySearchPreviewToolSerializer(item as MemorySearchPreviewTool);

    case "toolbox_search_preview":
      return toolboxSearchPreviewToolSerializer(item as ToolboxSearchPreviewTool);

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

    case "work_iq_preview":
      return workIQPreviewToolDeserializer(item as WorkIQPreviewTool);

    case "fabric_iq_preview":
      return fabricIQPreviewToolDeserializer(item as FabricIQPreviewTool);

    case "memory_search_preview":
      return memorySearchPreviewToolDeserializer(item as MemorySearchPreviewTool);

    case "toolbox_search_preview":
      return toolboxSearchPreviewToolDeserializer(item as ToolboxSearchPreviewTool);

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
  | "azure_ai_search"
  | "azure_function"
  | "bing_grounding"
  | "capture_structured_outputs"
  | "openapi";

/** The input definition information for a bing grounding search tool as used to configure an agent. */
export interface BingGroundingTool extends Tool {
  /** The object type, which is always 'bing_grounding'. */
  type: "bing_grounding";
  /** Optional user-defined name for this tool or configuration. */
  name?: string;
  /** Optional user-defined description for this tool or configuration. */
  description?: string;
  /** The bing grounding search tool parameters. */
  bing_grounding: BingGroundingSearchToolParameters;
}

export function bingGroundingToolSerializer(item: BingGroundingTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    bing_grounding: bingGroundingSearchToolParametersSerializer(item["bing_grounding"]),
  };
}

export function bingGroundingToolDeserializer(item: any): BingGroundingTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
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
  /** Optional user-defined name for this tool or configuration. */
  name?: string;
  /** Optional user-defined description for this tool or configuration. */
  description?: string;
  /** The fabric data agent tool parameters. */
  fabric_dataagent_preview: FabricDataAgentToolParameters;
}

export function microsoftFabricPreviewToolSerializer(item: MicrosoftFabricPreviewTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    fabric_dataagent_preview: fabricDataAgentToolParametersSerializer(
      item["fabric_dataagent_preview"],
    ),
  };
}

export function microsoftFabricPreviewToolDeserializer(item: any): MicrosoftFabricPreviewTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
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
  /** Optional user-defined name for this tool or configuration. */
  name?: string;
  /** Optional user-defined description for this tool or configuration. */
  description?: string;
  /** The sharepoint grounding tool parameters. */
  sharepoint_grounding_preview: SharepointGroundingToolParameters;
}

export function sharepointPreviewToolSerializer(item: SharepointPreviewTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    sharepoint_grounding_preview: sharepointGroundingToolParametersSerializer(
      item["sharepoint_grounding_preview"],
    ),
  };
}

export function sharepointPreviewToolDeserializer(item: any): SharepointPreviewTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
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
  /** Optional user-defined name for this tool or configuration. */
  name?: string;
  /** Optional user-defined description for this tool or configuration. */
  description?: string;
  /** The azure ai search index resource. */
  azure_ai_search: AzureAISearchToolResource;
}

export function azureAISearchToolSerializer(item: AzureAISearchTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    azure_ai_search: azureAISearchToolResourceSerializer(item["azure_ai_search"]),
  };
}

export function azureAISearchToolDeserializer(item: any): AzureAISearchTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
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
  spec: Record<string, any>;
  /** Open API authentication details */
  auth: OpenApiAuthDetailsUnion;
  /** List of OpenAPI spec parameters that will use user-provided defaults */
  default_params?: string[];
  /** List of function definitions used by OpenApi tool */
  readonly functions?: {
    name: string;
    description?: string;
    parameters: Record<string, any>;
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
  parameters: Record<string, any>;
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
  /** Optional user-defined name for this tool or configuration. */
  name?: string;
  /** Optional user-defined description for this tool or configuration. */
  description?: string;
  /** The bing custom search tool parameters. */
  bing_custom_search_preview: BingCustomSearchToolParameters;
}

export function bingCustomSearchPreviewToolSerializer(item: BingCustomSearchPreviewTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    bing_custom_search_preview: bingCustomSearchToolParametersSerializer(
      item["bing_custom_search_preview"],
    ),
  };
}

export function bingCustomSearchPreviewToolDeserializer(item: any): BingCustomSearchPreviewTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
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
  /** Optional user-defined name for this tool or configuration. */
  name?: string;
  /** Optional user-defined description for this tool or configuration. */
  description?: string;
  /** The Browser Automation Tool parameters. */
  browser_automation_preview: BrowserAutomationToolParameters;
}

export function browserAutomationPreviewToolSerializer(item: BrowserAutomationPreviewTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    browser_automation_preview: browserAutomationToolParametersSerializer(
      item["browser_automation_preview"],
    ),
  };
}

export function browserAutomationPreviewToolDeserializer(item: any): BrowserAutomationPreviewTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
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
    parameters: Record<string, any>;
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
  parameters: Record<string, any>;
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
  /** Optional user-defined name for this tool or configuration. */
  name?: string;
  /** Optional user-defined description for this tool or configuration. */
  description?: string;
  /** The structured outputs to capture from the model. */
  outputs: StructuredOutputDefinition;
}

export function captureStructuredOutputsToolSerializer(item: CaptureStructuredOutputsTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    outputs: structuredOutputDefinitionSerializer(item["outputs"]),
  };
}

export function captureStructuredOutputsToolDeserializer(item: any): CaptureStructuredOutputsTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
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
  schema: Record<string, any>;
  /** Whether to enforce strict validation. Default `true`. */
  strict: boolean | null;
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
  /** Optional user-defined name for this tool or configuration. */
  name?: string;
  /** Optional user-defined description for this tool or configuration. */
  description?: string;
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
    name: item["name"],
    description: item["description"],
    base_url: item["base_url"],
    agent_card_path: item["agent_card_path"],
    project_connection_id: item["project_connection_id"],
  };
}

export function a2APreviewToolDeserializer(item: any): A2APreviewTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    base_url: item["base_url"],
    agent_card_path: item["agent_card_path"],
    project_connection_id: item["project_connection_id"],
  };
}

/** A WorkIQ server-side tool. */
export interface WorkIQPreviewTool extends Tool {
  /** The object type, which is always 'work_iq_preview'. */
  type: "work_iq_preview";
  /** The ID of the WorkIQ project connection. */
  project_connection_id: string;
  /** Optional user-defined name for this tool or configuration. */
  name?: string;
  /** Optional user-defined description for this tool or configuration. */
  description?: string;
}

export function workIQPreviewToolSerializer(item: WorkIQPreviewTool): any {
  return {
    type: item["type"],
    project_connection_id: item["project_connection_id"],
    name: item["name"],
    description: item["description"],
  };
}

export function workIQPreviewToolDeserializer(item: any): WorkIQPreviewTool {
  return {
    type: item["type"],
    project_connection_id: item["project_connection_id"],
    name: item["name"],
    description: item["description"],
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
  /** Optional user-defined name for this tool or configuration. */
  name?: string;
  /** Optional user-defined description for this tool or configuration. */
  description?: string;
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
    name: item["name"],
    description: item["description"],
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
    name: item["name"],
    description: item["description"],
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
  /** Optional user-defined name for this tool or configuration. */
  name?: string;
  /** Optional user-defined description for this tool or configuration. */
  description?: string;
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
    name: item["name"],
    description: item["description"],
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
    name: item["name"],
    description: item["description"],
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

/**
 * A tool for searching over the agent's toolbox.
 * When present, deferred tools are hidden from `tools/list` and only
 * discoverable via `search_tools` queries at runtime.
 */
export interface ToolboxSearchPreviewTool extends Tool {
  /** The type of the tool. Always `toolbox_search_preview`. */
  type: "toolbox_search_preview";
  /** Optional user-defined name for this tool or configuration. */
  name?: string;
  /** Optional user-defined description for this tool or configuration. */
  description?: string;
}

export function toolboxSearchPreviewToolSerializer(item: ToolboxSearchPreviewTool): any {
  return { type: item["type"], name: item["name"], description: item["description"] };
}

export function toolboxSearchPreviewToolDeserializer(item: any): ToolboxSearchPreviewTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
  };
}

/** A tool that runs Python code to help generate a response to a prompt. */
export interface CodeInterpreterTool extends Tool {
  /** The type of the code interpreter tool. Always `code_interpreter`. */
  type: "code_interpreter";
  /** Optional user-defined name for this tool or configuration. */
  name?: string;
  /** Optional user-defined description for this tool or configuration. */
  description?: string;
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
    name: item["name"],
    description: item["description"],
    container: !item["container"]
      ? item["container"]
      : _codeInterpreterToolContainerSerializer(item["container"]),
  };
}

export function codeInterpreterToolDeserializer(item: any): CodeInterpreterTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
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
  memory_limit?: ContainerMemoryLimit;
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
    allowed_domains: item["allowed_domains"].map((p: any) => {
      return p;
    }),
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
    allowed_domains: item["allowed_domains"].map((p: any) => {
      return p;
    }),
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
  description?: string;
  parameters: Record<string, any> | null;
  strict: boolean | null;
  /** Whether this function is deferred and loaded via tool search. */
  defer_loading?: boolean;
}

export function functionToolSerializer(item: FunctionTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    parameters: item["parameters"],
    strict: item["strict"],
    defer_loading: item["defer_loading"],
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
    defer_loading: item["defer_loading"],
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
  /** Optional user-defined name for this tool or configuration. */
  name?: string;
  /** Optional user-defined description for this tool or configuration. */
  description?: string;
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
    name: item["name"],
    description: item["description"],
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
    name: item["name"],
    description: item["description"],
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
  value: string | number | boolean | (string | number)[];
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

/** Alias for _FileSearchToolFiltersValue */
export type _FileSearchToolFiltersValue = string | number | boolean | (string | number)[];

export function _fileSearchToolFiltersValueSerializer(item: _FileSearchToolFiltersValue): any {
  return item;
}

export function _fileSearchToolFiltersValueDeserializer(item: any): _FileSearchToolFiltersValue {
  return item;
}

export function _fileSearchToolFiltersValue1ArraySerializer(
  result: Array<_FileSearchToolFiltersValue1>,
): any[] {
  return result.map((item) => {
    return _fileSearchToolFiltersValue1Serializer(item);
  });
}

export function _fileSearchToolFiltersValue1ArrayDeserializer(
  result: Array<_FileSearchToolFiltersValue1>,
): any[] {
  return result.map((item) => {
    return _fileSearchToolFiltersValue1Deserializer(item);
  });
}

/** Alias for _FileSearchToolFiltersValue1 */
export type _FileSearchToolFiltersValue1 = string | number;

export function _fileSearchToolFiltersValue1Serializer(item: _FileSearchToolFiltersValue1): any {
  return item;
}

export function _fileSearchToolFiltersValue1Deserializer(item: any): _FileSearchToolFiltersValue1 {
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
export type _FileSearchToolFiltersFilter = ComparisonFilter | any;

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
 * [web search tool](/docs/guides/tools-web-search).
 */
export interface WebSearchTool extends Tool {
  /** The type of the web search tool. One of `web_search` or `web_search_2025_08_26`. */
  type: "web_search";
  filters?: WebSearchToolFilters;
  user_location?: WebSearchApproximateLocation;
  /** High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default. */
  search_context_size?: "low" | "medium" | "high";
  /** Optional user-defined name for this tool or configuration. */
  name?: string;
  /** Optional user-defined description for this tool or configuration. */
  description?: string;
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
  type: "approximate";
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
 * (MCP) servers. [Learn more about MCP](/docs/guides/tools-remote-mcp).
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
   *   connectors [here](/docs/guides/tools-remote-mcp#connectors).
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
  /** Whether this MCP tool is deferred and discovered via tool search. */
  defer_loading?: boolean;
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
    defer_loading: item["defer_loading"],
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
    defer_loading: item["defer_loading"],
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
  model?: "gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5";
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
  /** Whether to generate a new image or edit an existing image. Default: `auto`. */
  action?: ImageGenAction;
  /** Optional user-defined name for this tool or configuration. */
  name?: string;
  /** Optional user-defined description for this tool or configuration. */
  description?: string;
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
  };
}

/** Control how much effort the model will exert to match the style and features, especially facial features, of input images. This parameter is only supported for `gpt-image-1` and `gpt-image-1.5` and later models, unsupported for `gpt-image-1-mini`. Supports `high` and `low`. Defaults to `low`. */
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

/** Type of ImageGenAction */
export type ImageGenAction = "generate" | "edit" | "auto";

/** A tool that allows the model to execute shell commands in a local environment. */
export interface LocalShellToolParam extends Tool {
  /** The type of the local shell tool. Always `local_shell`. */
  type: "local_shell";
  /** Optional user-defined name for this tool or configuration. */
  name?: string;
  /** Optional user-defined description for this tool or configuration. */
  description?: string;
}

export function localShellToolParamSerializer(item: LocalShellToolParam): any {
  return { type: item["type"], name: item["name"], description: item["description"] };
}

export function localShellToolParamDeserializer(item: any): LocalShellToolParam {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
  };
}

/** A tool that allows the model to execute shell commands. */
export interface FunctionShellToolParam extends Tool {
  /** The type of the shell tool. Always `shell`. */
  type: "shell";
  environment?: FunctionShellToolParamEnvironmentUnion;
  /** Optional user-defined name for this tool or configuration. */
  name?: string;
  /** Optional user-defined description for this tool or configuration. */
  description?: string;
}

export function functionShellToolParamSerializer(item: FunctionShellToolParam): any {
  return {
    type: item["type"],
    environment: !item["environment"]
      ? item["environment"]
      : functionShellToolParamEnvironmentUnionSerializer(item["environment"]),
    name: item["name"],
    description: item["description"],
  };
}

export function functionShellToolParamDeserializer(item: any): FunctionShellToolParam {
  return {
    type: item["type"],
    environment: !item["environment"]
      ? item["environment"]
      : functionShellToolParamEnvironmentUnionDeserializer(item["environment"]),
    name: item["name"],
    description: item["description"],
  };
}

/** model interface FunctionShellToolParamEnvironment */
export interface FunctionShellToolParamEnvironment {
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
  | "container_auto"
  | "local"
  | "container_reference";

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
  memory_limit?: ContainerMemoryLimit;
  /** An optional list of skills referenced by id or inline data. */
  skills?: ContainerSkillUnion[];
  network_policy?: ContainerNetworkPolicyParamUnion;
}

export function containerAutoParamSerializer(item: ContainerAutoParam): any {
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
      : containerNetworkPolicyParamUnionSerializer(item["network_policy"]),
  };
}

export function containerAutoParamDeserializer(item: any): ContainerAutoParam {
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

/** A custom tool that processes input using a specified format. Learn more about   [custom tools](/docs/guides/function-calling#custom-tools) */
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
}

export function customToolParamSerializer(item: CustomToolParam): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    format: !item["format"] ? item["format"] : customToolParamFormatUnionSerializer(item["format"]),
    defer_loading: item["defer_loading"],
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
/** Type of SearchContentType */
export type SearchContentType = "text" | "image";

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
  /** Whether this function should be deferred and discovered via tool search. */
  defer_loading?: boolean;
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
    defer_loading: item["defer_loading"],
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
    defer_loading: item["defer_loading"],
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
export type AgentProtocol = "activity_protocol" | "responses" | "mcp" | "invocations";

/** Container-based deployment configuration for a hosted agent. */
export interface ContainerConfiguration {
  /** The container image for the hosted agent. */
  image: string;
}

export function containerConfigurationSerializer(item: ContainerConfiguration): any {
  return { image: item["image"] };
}

export function containerConfigurationDeserializer(item: any): ContainerConfiguration {
  return {
    image: item["image"],
  };
}

/** Code-based deployment configuration for a hosted agent. */
export interface CodeConfiguration {
  /** The runtime identifier for code execution (e.g., 'python_3_11', 'python_3_12', 'python_3_13'). */
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
export type ReasoningEffort = "none" | "minimal" | "low" | "medium" | "high" | "xhigh" | null;
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
  tools: Record<string, any>[];
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
  schema: Record<string, any>;
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
  default_value?: any;
  /** The JSON schema for the structured input (optional). */
  schema?: Record<string, any>;
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

/** The provisioning status of an agent version. */
export type AgentVersionStatus = "creating" | "active" | "failed" | "deleting" | "deleted";

/** model interface AgentIdentity */
export interface AgentIdentity {
  /** The principal ID of the agent instance */
  principal_id: string;
  /** The client ID of the agent instance. Also referred to as the instance ID */
  client_id: string;
}

export function agentIdentityDeserializer(item: any): AgentIdentity {
  return {
    principal_id: item["principal_id"],
    client_id: item["client_id"],
  };
}

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
  | ManagedAgentIdentityBlueprintReference
  | AgentBlueprintReference;

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
  /** The protocols that the agent supports */
  protocols?: AgentEndpointProtocol[];
  /** The authorization schemes supported by the agent endpoint */
  authorization_schemes?: AgentEndpointAuthorizationSchemeUnion[];
}

export function agentEndpointConfigSerializer(item: AgentEndpointConfig): any {
  return {
    version_selector: !item["version_selector"]
      ? item["version_selector"]
      : versionSelectorSerializer(item["version_selector"]),
    protocols: !item["protocols"]
      ? item["protocols"]
      : item["protocols"].map((p: any) => {
          return p;
        }),
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
    protocols: !item["protocols"]
      ? item["protocols"]
      : item["protocols"].map((p: any) => {
          return p;
        }),
    authorization_schemes: !item["authorization_schemes"]
      ? item["authorization_schemes"]
      : agentEndpointAuthorizationSchemeUnionArrayDeserializer(item["authorization_schemes"]),
  };
}

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
  type: VersionSelectorType;
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

/** Type of VersionSelectorType */
export type VersionSelectorType = "FixedRatio";

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

/** Type of AgentEndpointProtocol */
export type AgentEndpointProtocol = "activity" | "responses" | "a2a" | "mcp" | "invocations";

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

    default:
      return agentEndpointAuthorizationSchemeDeserializer(item);
  }
}

/** Type of AgentEndpointAuthorizationSchemeType */
export type AgentEndpointAuthorizationSchemeType = "Entra" | "BotService" | "BotServiceRbac";

/** model interface EntraAuthorizationScheme */
export interface EntraAuthorizationScheme extends AgentEndpointAuthorizationScheme {
  type: "Entra";
}

export function entraAuthorizationSchemeSerializer(item: EntraAuthorizationScheme): any {
  return { type: item["type"] };
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
  error: ApiError;
}

export function apiErrorResponseDeserializer(item: any): ApiErrorResponse {
  return {
    error: apiErrorDeserializer(item["error"]),
  };
}

/** model interface ApiError */
export interface ApiError {
  code: string | null;
  message: string;
  param?: string;
  type?: string;
  details?: ApiError[];
  additionalInfo?: Record<string, any>;
  debugInfo?: Record<string, any>;
}

export function apiErrorDeserializer(item: any): ApiError {
  return {
    code: item["code"],
    message: item["message"],
    param: item["param"],
    type: item["type"],
    details: !item["details"] ? item["details"] : apiErrorArrayDeserializer(item["details"]),
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

export function apiErrorArrayDeserializer(result: Array<ApiError>): any[] {
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
  | SASCredentials
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
      return sasCredentialsDeserializer(item as SASCredentials);

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
export interface SASCredentials extends BaseCredentials {
  /** The credential type */
  readonly type: "SAS";
  /** SAS token */
  readonly sasToken?: string;
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
  credential: BlobReferenceSasCredential;
}

export function blobReferenceDeserializer(item: any): BlobReference {
  return {
    blobUri: item["blobUri"],
    storageAccountArmId: item["storageAccountArmId"],
    credential: blobReferenceSasCredentialDeserializer(item["credential"]),
  };
}

/** SAS Credential definition */
export interface BlobReferenceSasCredential {
  /** SAS uri */
  readonly sasUri: string;
  /** Type of credential */
  readonly type: "SAS";
}

export function blobReferenceSasCredentialDeserializer(item: any): BlobReferenceSasCredential {
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

/** Request body for getting evaluator credentials */
export interface EvaluatorCredentialRequest {
  /** The blob URI for the evaluator storage. Example: `https://account.blob.core.windows.net:443/container` */
  blob_uri: string;
}

export function evaluatorCredentialRequestSerializer(item: EvaluatorCredentialRequest): any {
  return { blob_uri: item["blob_uri"] };
}

/** Paged collection of EvaluationSuiteVersion items */
export interface _PagedEvaluationSuiteVersion {
  /** The EvaluationSuiteVersion items on this page */
  value: EvaluationSuiteVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedEvaluationSuiteVersionDeserializer(item: any): _PagedEvaluationSuiteVersion {
  return {
    value: evaluationSuiteVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function evaluationSuiteVersionArraySerializer(
  result: Array<EvaluationSuiteVersion>,
): any[] {
  return result.map((item) => {
    return evaluationSuiteVersionSerializer(item);
  });
}

export function evaluationSuiteVersionArrayDeserializer(
  result: Array<EvaluationSuiteVersion>,
): any[] {
  return result.map((item) => {
    return evaluationSuiteVersionDeserializer(item);
  });
}

/**
 * An evaluation suite bundles testing criteria — an optional dataset, one or more
 * evaluator configs with thresholds and init params — into a reusable, named artifact that
 * can gate agent changes across batch, scheduled, continuous, and CI/CD evals.
 */
export interface EvaluationSuiteVersion {
  /**
   * Human-readable display name.
   * Does not need to be unique. Shown in Foundry portal list views and eval reports.
   */
  display_name?: string;
  /** Subtype of the evaluation suite. */
  subtype?: EvaluationSuiteSubtype;
  /**
   * Dataset reference for evaluation.
   * Optional — omit for evaluator-only suites where data comes from
   * live production traces or is provided at run time.
   * The referenced dataset must exist in the project's dataset registry.
   */
  dataset?: EvaluationDatasetReference;
  /**
   * Testing criteria — the evaluator configurations for this suite.
   * Supports all grader types: azure_ai_evaluator, string_check, label_model,
   * score_model, text_similarity, python, etc.
   * At least one entry is required.
   */
  testing_criteria: (
    | EvalGraderLabelModel
    | EvalGraderStringCheck
    | EvalGraderTextSimilarity
    | EvalGraderPython
    | EvalGraderScoreModel
    | TestingCriterionAzureAIEvaluator
  )[];
  /**
   * Target for this evaluation suite. Uses the existing Target discriminated type
   * from eval runs. Supports azure_ai_agent, azure_ai_model, azure_ai_assistant.
   * Optional — allows suites to exist without a target.
   */
  target?: EvaluationTargetUnion;
  /**
   * How to send dataset rows to the target (agent or model).
   * Supports template type (prompt with column placeholders) and
   * item_reference type (column containing pre-built messages).
   */
  input_messages?:
    | CreateEvalResponsesRunDataSourceInputMessagesTemplate
    | CreateEvalCompletionsRunDataSourceInputMessagesItemReference;
  /** Default evaluation level for this suite. Can be overridden at run time. */
  evaluation_level?: EvaluationLevel;
  /** The name of the resource. */
  readonly name: string;
  /** The version of the resource. */
  readonly version: string;
  /** The asset description text. */
  description?: string;
  /** Tag dictionary. Tags can be added, removed, and updated. */
  tags?: Record<string, string>;
}

export function evaluationSuiteVersionSerializer(item: EvaluationSuiteVersion): any {
  return {
    display_name: item["display_name"],
    subtype: item["subtype"],
    dataset: !item["dataset"]
      ? item["dataset"]
      : evaluationDatasetReferenceSerializer(item["dataset"]),
    testing_criteria: _evaluationSuiteVersionTestingCriterionArraySerializer(
      item["testing_criteria"],
    ),
    target: !item["target"] ? item["target"] : evaluationTargetUnionSerializer(item["target"]),
    input_messages: !item["input_messages"]
      ? item["input_messages"]
      : _evaluationSuiteVersionInputMessagesSerializer(item["input_messages"]),
    evaluation_level: item["evaluation_level"],
    description: item["description"],
    tags: item["tags"],
  };
}

export function evaluationSuiteVersionDeserializer(item: any): EvaluationSuiteVersion {
  return {
    display_name: item["display_name"],
    subtype: item["subtype"],
    dataset: !item["dataset"]
      ? item["dataset"]
      : evaluationDatasetReferenceDeserializer(item["dataset"]),
    testing_criteria: _evaluationSuiteVersionTestingCriterionArrayDeserializer(
      item["testing_criteria"],
    ),
    target: !item["target"] ? item["target"] : evaluationTargetUnionDeserializer(item["target"]),
    input_messages: !item["input_messages"]
      ? item["input_messages"]
      : _evaluationSuiteVersionInputMessagesDeserializer(item["input_messages"]),
    evaluation_level: item["evaluation_level"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The subtype of an evaluation suite. */
export type EvaluationSuiteSubtype = "default" | "benchmark";

/** Reference to a dataset by name and version. */
export interface EvaluationDatasetReference {
  /** Dataset name. */
  name: string;
  /** Dataset version. If not provided, resolves to the latest version. */
  version?: string;
  /**
   * Name of the schema file within the dataset's blob folder (e.g., "a3f2b1c4_schema.json").
   * Optional — if not provided, schema is inferred at runtime from the data.
   * Only applicable for uri_folder datasets.
   */
  schema_file_name?: string;
}

export function evaluationDatasetReferenceSerializer(item: EvaluationDatasetReference): any {
  return {
    name: item["name"],
    version: item["version"],
    schema_file_name: item["schema_file_name"],
  };
}

export function evaluationDatasetReferenceDeserializer(item: any): EvaluationDatasetReference {
  return {
    name: item["name"],
    version: item["version"],
    schema_file_name: item["schema_file_name"],
  };
}

export function _evaluationSuiteVersionTestingCriterionArraySerializer(
  result: Array<_EvaluationSuiteVersionTestingCriterion>,
): any[] {
  return result.map((item) => {
    return _evaluationSuiteVersionTestingCriterionSerializer(item);
  });
}

export function _evaluationSuiteVersionTestingCriterionArrayDeserializer(
  result: Array<_EvaluationSuiteVersionTestingCriterion>,
): any[] {
  return result.map((item) => {
    return _evaluationSuiteVersionTestingCriterionDeserializer(item);
  });
}

/** Alias for _EvaluationSuiteVersionTestingCriterion */
export type _EvaluationSuiteVersionTestingCriterion =
  | EvalGraderLabelModel
  | EvalGraderStringCheck
  | EvalGraderTextSimilarity
  | EvalGraderPython
  | EvalGraderScoreModel
  | TestingCriterionAzureAIEvaluator;

export function _evaluationSuiteVersionTestingCriterionSerializer(
  item: _EvaluationSuiteVersionTestingCriterion,
): any {
  return item;
}

export function _evaluationSuiteVersionTestingCriterionDeserializer(
  item: any,
): _EvaluationSuiteVersionTestingCriterion {
  return item;
}

/** model interface EvalGraderLabelModel */
export interface EvalGraderLabelModel {
  /** The object type, which is always `label_model`. */
  type: "label_model";
  /** The name of the grader. */
  name: string;
  /** The model to use for the evaluation. Must support structured outputs. */
  model: string;
  input: EvalItem[];
  /** The labels to assign to each item in the evaluation. */
  labels: string[];
  /** The labels that indicate a passing result. Must be a subset of labels. */
  passing_labels: string[];
}

export function evalGraderLabelModelSerializer(item: EvalGraderLabelModel): any {
  return {
    type: item["type"],
    name: item["name"],
    model: item["model"],
    input: evalItemArraySerializer(item["input"]),
    labels: item["labels"].map((p: any) => {
      return p;
    }),
    passing_labels: item["passing_labels"].map((p: any) => {
      return p;
    }),
  };
}

export function evalGraderLabelModelDeserializer(item: any): EvalGraderLabelModel {
  return {
    type: item["type"],
    name: item["name"],
    model: item["model"],
    input: evalItemArrayDeserializer(item["input"]),
    labels: item["labels"].map((p: any) => {
      return p;
    }),
    passing_labels: item["passing_labels"].map((p: any) => {
      return p;
    }),
  };
}

export function evalItemArraySerializer(result: Array<EvalItem>): any[] {
  return result.map((item) => {
    return evalItemSerializer(item);
  });
}

export function evalItemArrayDeserializer(result: Array<EvalItem>): any[] {
  return result.map((item) => {
    return evalItemDeserializer(item);
  });
}

/**
 * A message input to the model with a role indicating instruction following
 * hierarchy. Instructions given with the `developer` or `system` role take
 * precedence over instructions given with the `user` role. Messages with the
 * `assistant` role are presumed to have been generated by the model in previous
 * interactions.
 */
export interface EvalItem {
  /**
   * The role of the message input. One of `user`, `assistant`, `system`, or
   *   `developer`.
   */
  role: "user" | "assistant" | "system" | "developer";
  content: EvalItemContent;
  /** The type of the message input. Always `message`. */
  type?: "message";
}

export function evalItemSerializer(item: EvalItem): any {
  return {
    role: item["role"],
    content: evalItemContentSerializer(item["content"]),
    type: item["type"],
  };
}

export function evalItemDeserializer(item: any): EvalItem {
  return {
    role: item["role"],
    content: evalItemContentDeserializer(item["content"]),
    type: item["type"],
  };
}

/** Inputs to the model - can contain template strings. Supports text, output text, input images, and input audio, either as a single item or an array of items. */
export type EvalItemContent = EvalItemContentItem | EvalItemContentItem[];

export function evalItemContentSerializer(item: EvalItemContent): any {
  return item;
}

export function evalItemContentDeserializer(item: any): EvalItemContent {
  return item;
}

/** A single content item: input text, output text, input image, or input audio. */
export type EvalItemContentItem = string | EvalItemContentItemObjectUnion;

export function evalItemContentItemSerializer(item: EvalItemContentItem): any {
  return item;
}

export function evalItemContentItemDeserializer(item: any): EvalItemContentItem {
  return item;
}

/** A single content item: input text, output text, input image, or input audio. */
export interface EvalItemContentItemObject {
  type: EvalItemContentItemObjectType;
}

export function evalItemContentItemObjectSerializer(item: EvalItemContentItemObject): any {
  return { type: item["type"] };
}

export function evalItemContentItemObjectDeserializer(item: any): EvalItemContentItemObject {
  return {
    type: item["type"],
  };
}

/** Alias for EvalItemContentItemObjectUnion */
export type EvalItemContentItemObjectUnion =
  | EvalItemContentOutputText
  | EvalItemInputImage
  | InputAudio
  | EvalItemContentItemObjectInputTextContent
  | EvalItemContentItemObject;

export function evalItemContentItemObjectUnionSerializer(
  item: EvalItemContentItemObjectUnion,
): any {
  switch (item.type) {
    case "output_text":
      return evalItemContentOutputTextSerializer(item as EvalItemContentOutputText);

    case "input_image":
      return evalItemInputImageSerializer(item as EvalItemInputImage);

    case "input_audio":
      return inputAudioSerializer(item as InputAudio);

    case "input_text":
      return evalItemContentItemObjectInputTextContentSerializer(
        item as EvalItemContentItemObjectInputTextContent,
      );

    default:
      return evalItemContentItemObjectSerializer(item);
  }
}

export function evalItemContentItemObjectUnionDeserializer(
  item: any,
): EvalItemContentItemObjectUnion {
  switch (item["type"]) {
    case "output_text":
      return evalItemContentOutputTextDeserializer(item as EvalItemContentOutputText);

    case "input_image":
      return evalItemInputImageDeserializer(item as EvalItemInputImage);

    case "input_audio":
      return inputAudioDeserializer(item as InputAudio);

    case "input_text":
      return evalItemContentItemObjectInputTextContentDeserializer(
        item as EvalItemContentItemObjectInputTextContent,
      );

    default:
      return evalItemContentItemObjectDeserializer(item);
  }
}

/** Type of EvalItemContentItemObjectType */
export type EvalItemContentItemObjectType =
  | "input_text"
  | "output_text"
  | "input_image"
  | "input_audio";

/** A text output from the model. */
export interface EvalItemContentOutputText extends EvalItemContentItemObject {
  /** The type of the output text. Always `output_text`. */
  type: "output_text";
  /** The text output from the model. */
  text: string;
}

export function evalItemContentOutputTextSerializer(item: EvalItemContentOutputText): any {
  return { type: item["type"], text: item["text"] };
}

export function evalItemContentOutputTextDeserializer(item: any): EvalItemContentOutputText {
  return {
    type: item["type"],
    text: item["text"],
  };
}

/** An image input block used within EvalItem content arrays. */
export interface EvalItemInputImage extends EvalItemContentItemObject {
  /** The type of the image input. Always `input_image`. */
  type: "input_image";
  /** The URL of the image input. */
  image_url: string;
  /** The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`. */
  detail?: string;
}

export function evalItemInputImageSerializer(item: EvalItemInputImage): any {
  return { type: item["type"], image_url: item["image_url"], detail: item["detail"] };
}

export function evalItemInputImageDeserializer(item: any): EvalItemInputImage {
  return {
    type: item["type"],
    image_url: item["image_url"],
    detail: item["detail"],
  };
}

/** An audio input to the model. */
export interface InputAudio extends EvalItemContentItemObject {
  /** The type of the input item. Always `input_audio`. */
  type: "input_audio";
  input_audio: InputAudioInputAudio;
}

export function inputAudioSerializer(item: InputAudio): any {
  return { type: item["type"], input_audio: inputAudioInputAudioSerializer(item["input_audio"]) };
}

export function inputAudioDeserializer(item: any): InputAudio {
  return {
    type: item["type"],
    input_audio: inputAudioInputAudioDeserializer(item["input_audio"]),
  };
}

/** model interface InputAudioInputAudio */
export interface InputAudioInputAudio {
  data: string;
  format: "mp3" | "wav";
}

export function inputAudioInputAudioSerializer(item: InputAudioInputAudio): any {
  return { data: item["data"], format: item["format"] };
}

export function inputAudioInputAudioDeserializer(item: any): InputAudioInputAudio {
  return {
    data: item["data"],
    format: item["format"],
  };
}

/** A text input to the model. */
export interface EvalItemContentItemObjectInputTextContent extends EvalItemContentItemObject {
  /** The type of the input item. Always `input_text`. */
  type: "input_text";
  /** The text input to the model. */
  text: string;
}

export function evalItemContentItemObjectInputTextContentSerializer(
  item: EvalItemContentItemObjectInputTextContent,
): any {
  return { type: item["type"], text: item["text"] };
}

export function evalItemContentItemObjectInputTextContentDeserializer(
  item: any,
): EvalItemContentItemObjectInputTextContent {
  return {
    type: item["type"],
    text: item["text"],
  };
}

export function evalItemContentItemArraySerializer(result: Array<EvalItemContentItem>): any[] {
  return result.map((item) => {
    return evalItemContentItemSerializer(item);
  });
}

export function evalItemContentItemArrayDeserializer(result: Array<EvalItemContentItem>): any[] {
  return result.map((item) => {
    return evalItemContentItemDeserializer(item);
  });
}

/** model interface EvalGraderStringCheck */
export interface EvalGraderStringCheck {
  /** The object type, which is always `string_check`. */
  type: "string_check";
  /** The name of the grader. */
  name: string;
  /** The input text. This may include template strings. */
  input: string;
  /** The reference text. This may include template strings. */
  reference: string;
  /** The string check operation to perform. One of `eq`, `ne`, `like`, or `ilike`. */
  operation: "eq" | "ne" | "like" | "ilike";
}

export function evalGraderStringCheckSerializer(item: EvalGraderStringCheck): any {
  return {
    type: item["type"],
    name: item["name"],
    input: item["input"],
    reference: item["reference"],
    operation: item["operation"],
  };
}

export function evalGraderStringCheckDeserializer(item: any): EvalGraderStringCheck {
  return {
    type: item["type"],
    name: item["name"],
    input: item["input"],
    reference: item["reference"],
    operation: item["operation"],
  };
}

/** model interface EvalGraderTextSimilarity */
export interface EvalGraderTextSimilarity {
  /** The type of grader. */
  type: "text_similarity";
  /** The name of the grader. */
  name: string;
  /** The text being graded. */
  input: string;
  /** The text being graded against. */
  reference: string;
  /**
   * The evaluation metric to use. One of `cosine`, `fuzzy_match`, `bleu`,
   *   `gleu`, `meteor`, `rouge_1`, `rouge_2`, `rouge_3`, `rouge_4`, `rouge_5`,
   *   or `rouge_l`.
   */
  evaluation_metric:
    | "cosine"
    | "fuzzy_match"
    | "bleu"
    | "gleu"
    | "meteor"
    | "rouge_1"
    | "rouge_2"
    | "rouge_3"
    | "rouge_4"
    | "rouge_5"
    | "rouge_l";
  /** The threshold for the score. */
  pass_threshold: number;
}

export function evalGraderTextSimilaritySerializer(item: EvalGraderTextSimilarity): any {
  return {
    type: item["type"],
    name: item["name"],
    input: item["input"],
    reference: item["reference"],
    evaluation_metric: item["evaluation_metric"],
    pass_threshold: item["pass_threshold"],
  };
}

export function evalGraderTextSimilarityDeserializer(item: any): EvalGraderTextSimilarity {
  return {
    type: item["type"],
    name: item["name"],
    input: item["input"],
    reference: item["reference"],
    evaluation_metric: item["evaluation_metric"],
    pass_threshold: item["pass_threshold"],
  };
}

/** model interface EvalGraderPython */
export interface EvalGraderPython {
  /** The object type, which is always `python`. */
  type: "python";
  /** The name of the grader. */
  name: string;
  /** The source code of the python script. */
  source: string;
  /** The image tag to use for the python script. */
  image_tag?: string;
  /** The threshold for the score. */
  pass_threshold?: number;
}

export function evalGraderPythonSerializer(item: EvalGraderPython): any {
  return {
    type: item["type"],
    name: item["name"],
    source: item["source"],
    image_tag: item["image_tag"],
    pass_threshold: item["pass_threshold"],
  };
}

export function evalGraderPythonDeserializer(item: any): EvalGraderPython {
  return {
    type: item["type"],
    name: item["name"],
    source: item["source"],
    image_tag: item["image_tag"],
    pass_threshold: item["pass_threshold"],
  };
}

/** model interface EvalGraderScoreModel */
export interface EvalGraderScoreModel {
  /** The object type, which is always `score_model`. */
  type: "score_model";
  /** The name of the grader. */
  name: string;
  /** The model to use for the evaluation. */
  model: string;
  /** The sampling parameters for the model. */
  sampling_params?: EvalGraderScoreModelSamplingParams;
  /** The input messages evaluated by the grader. Supports text, output text, input image, and input audio content blocks, and may include template strings. */
  input: EvalItem[];
  /** The range of the score. Defaults to `[0, 1]`. */
  range?: number[];
  /** The threshold for the score. */
  pass_threshold?: number;
}

export function evalGraderScoreModelSerializer(item: EvalGraderScoreModel): any {
  return {
    type: item["type"],
    name: item["name"],
    model: item["model"],
    sampling_params: !item["sampling_params"]
      ? item["sampling_params"]
      : evalGraderScoreModelSamplingParamsSerializer(item["sampling_params"]),
    input: evalItemArraySerializer(item["input"]),
    range: !item["range"]
      ? item["range"]
      : item["range"].map((p: any) => {
          return p;
        }),
    pass_threshold: item["pass_threshold"],
  };
}

export function evalGraderScoreModelDeserializer(item: any): EvalGraderScoreModel {
  return {
    type: item["type"],
    name: item["name"],
    model: item["model"],
    sampling_params: !item["sampling_params"]
      ? item["sampling_params"]
      : evalGraderScoreModelSamplingParamsDeserializer(item["sampling_params"]),
    input: evalItemArrayDeserializer(item["input"]),
    range: !item["range"]
      ? item["range"]
      : item["range"].map((p: any) => {
          return p;
        }),
    pass_threshold: item["pass_threshold"],
  };
}

/** model interface EvalGraderScoreModelSamplingParams */
export interface EvalGraderScoreModelSamplingParams {
  seed?: number;
  top_p?: number;
  temperature?: number;
  max_completions_tokens?: number;
  reasoning_effort?: ReasoningEffort;
}

export function evalGraderScoreModelSamplingParamsSerializer(
  item: EvalGraderScoreModelSamplingParams,
): any {
  return {
    seed: item["seed"],
    top_p: item["top_p"],
    temperature: item["temperature"],
    max_completions_tokens: item["max_completions_tokens"],
    reasoning_effort: item["reasoning_effort"],
  };
}

export function evalGraderScoreModelSamplingParamsDeserializer(
  item: any,
): EvalGraderScoreModelSamplingParams {
  return {
    seed: item["seed"],
    top_p: item["top_p"],
    temperature: item["temperature"],
    max_completions_tokens: item["max_completions_tokens"],
    reasoning_effort: item["reasoning_effort"],
  };
}

/** An Azure AI Evaluator grader used as testing criterion in evaluations. */
export interface TestingCriterionAzureAIEvaluator {
  /** The object type, which is always `azure_ai_evaluator`. */
  type: "azure_ai_evaluator";
  /** The name of the grader. */
  name: string;
  /** The name of the evaluator. */
  evaluator_name: string;
  /** The version of the evaluator. Latest version if not specified. */
  evaluator_version?: string;
  /** The initialization parameters for the evaluation. Must support structured outputs. */
  initialization_parameters?: Record<string, any>;
  /** The model to use for the evaluation. Must support structured outputs. */
  data_mapping?: Record<string, string>;
}

export function testingCriterionAzureAIEvaluatorSerializer(
  item: TestingCriterionAzureAIEvaluator,
): any {
  return {
    type: item["type"],
    name: item["name"],
    evaluator_name: item["evaluator_name"],
    evaluator_version: item["evaluator_version"],
    initialization_parameters: !item["initialization_parameters"]
      ? item["initialization_parameters"]
      : _evaluationSuiteVersionTestingCriterionInitializationParametersSerializer(
          item["initialization_parameters"],
        ),
    data_mapping: item["data_mapping"],
  };
}

export function testingCriterionAzureAIEvaluatorDeserializer(
  item: any,
): TestingCriterionAzureAIEvaluator {
  return {
    type: item["type"],
    name: item["name"],
    evaluator_name: item["evaluator_name"],
    evaluator_version: item["evaluator_version"],
    initialization_parameters: !item["initialization_parameters"]
      ? item["initialization_parameters"]
      : _evaluationSuiteVersionTestingCriterionInitializationParametersDeserializer(
          item["initialization_parameters"],
        ),
    data_mapping: !item["data_mapping"]
      ? item["data_mapping"]
      : Object.fromEntries(
          Object.entries(item["data_mapping"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** model interface _EvaluationSuiteVersionTestingCriterionInitializationParameters */
export interface _EvaluationSuiteVersionTestingCriterionInitializationParameters {}

export function _evaluationSuiteVersionTestingCriterionInitializationParametersSerializer(
  _item: _EvaluationSuiteVersionTestingCriterionInitializationParameters,
): any {
  return {};
}

export function _evaluationSuiteVersionTestingCriterionInitializationParametersDeserializer(
  item: any,
): _EvaluationSuiteVersionTestingCriterionInitializationParameters {
  return item;
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

/** Alias for _EvaluationSuiteVersionInputMessages */
export type _EvaluationSuiteVersionInputMessages =
  | CreateEvalResponsesRunDataSourceInputMessagesTemplate
  | CreateEvalCompletionsRunDataSourceInputMessagesItemReference;

export function _evaluationSuiteVersionInputMessagesSerializer(
  item: _EvaluationSuiteVersionInputMessages,
): any {
  return item;
}

export function _evaluationSuiteVersionInputMessagesDeserializer(
  item: any,
): _EvaluationSuiteVersionInputMessages {
  return item;
}

/** model interface CreateEvalResponsesRunDataSourceInputMessagesTemplate */
export interface CreateEvalResponsesRunDataSourceInputMessagesTemplate {
  type: "template";
  template: (
    | {
        role: string;
        content: string;
      }
    | EvalItem
  )[];
}

export function createEvalResponsesRunDataSourceInputMessagesTemplateSerializer(
  item: CreateEvalResponsesRunDataSourceInputMessagesTemplate,
): any {
  return {
    type: item["type"],
    template: _evaluationSuiteVersionInputMessagesTemplateArraySerializer(item["template"]),
  };
}

export function createEvalResponsesRunDataSourceInputMessagesTemplateDeserializer(
  item: any,
): CreateEvalResponsesRunDataSourceInputMessagesTemplate {
  return {
    type: item["type"],
    template: _evaluationSuiteVersionInputMessagesTemplateArrayDeserializer(item["template"]),
  };
}

export function _evaluationSuiteVersionInputMessagesTemplateArraySerializer(
  result: Array<_EvaluationSuiteVersionInputMessagesTemplate>,
): any[] {
  return result.map((item) => {
    return _evaluationSuiteVersionInputMessagesTemplateSerializer(item);
  });
}

export function _evaluationSuiteVersionInputMessagesTemplateArrayDeserializer(
  result: Array<_EvaluationSuiteVersionInputMessagesTemplate>,
): any[] {
  return result.map((item) => {
    return _evaluationSuiteVersionInputMessagesTemplateDeserializer(item);
  });
}

/** Alias for _EvaluationSuiteVersionInputMessagesTemplate */
export type _EvaluationSuiteVersionInputMessagesTemplate =
  | {
      role: string;
      content: string;
    }
  | EvalItem;

export function _evaluationSuiteVersionInputMessagesTemplateSerializer(
  item: _EvaluationSuiteVersionInputMessagesTemplate,
): any {
  return item;
}

export function _evaluationSuiteVersionInputMessagesTemplateDeserializer(
  item: any,
): _EvaluationSuiteVersionInputMessagesTemplate {
  return item;
}

/** model interface _EvaluationSuiteVersionInputMessagesTemplate1 */
export interface _EvaluationSuiteVersionInputMessagesTemplate1 {
  role: string;
  content: string;
}

export function _evaluationSuiteVersionInputMessagesTemplate1Serializer(
  item: _EvaluationSuiteVersionInputMessagesTemplate1,
): any {
  return { role: item["role"], content: item["content"] };
}

export function _evaluationSuiteVersionInputMessagesTemplate1Deserializer(
  item: any,
): _EvaluationSuiteVersionInputMessagesTemplate1 {
  return {
    role: item["role"],
    content: item["content"],
  };
}

/** model interface CreateEvalCompletionsRunDataSourceInputMessagesItemReference */
export interface CreateEvalCompletionsRunDataSourceInputMessagesItemReference {
  type: "item_reference";
  item_reference: string;
}

export function createEvalCompletionsRunDataSourceInputMessagesItemReferenceSerializer(
  item: CreateEvalCompletionsRunDataSourceInputMessagesItemReference,
): any {
  return { type: item["type"], item_reference: item["item_reference"] };
}

export function createEvalCompletionsRunDataSourceInputMessagesItemReferenceDeserializer(
  item: any,
): CreateEvalCompletionsRunDataSourceInputMessagesItemReference {
  return {
    type: item["type"],
    item_reference: item["item_reference"],
  };
}

/** The level at which evaluation is performed. */
export type EvaluationLevel = "turn" | "conversation";

/** Multipart request body for creating a new code-based agent (POST /agents). Inherits from CreateAgentVersionFromCodeContent for future extensibility. */
export interface CreateAgentFromCodeContent {
  /** JSON metadata including description and hosted definition. */
  metadata: CreateAgentVersionFromCodeMetadata;
  /** The code zip file (max 250 MB). */
  code: FileContents | { contents: FileContents; contentType?: string; filename?: string };
}

export function createAgentFromCodeContentSerializer(item: CreateAgentFromCodeContent): any {
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

/** Multipart request body for updating or versioning a code-based agent (POST /agents/{name} and POST /agents/{name}/versions). */
export interface CreateAgentVersionFromCodeContent {
  /** JSON metadata including description and hosted definition. */
  metadata: CreateAgentVersionFromCodeMetadata;
  /** The code zip file (max 250 MB). */
  code: FileContents | { contents: FileContents; contentType?: string; filename?: string };
}

export function createAgentVersionFromCodeContentSerializer(
  item: CreateAgentVersionFromCodeContent,
): any {
  return [
    { name: "metadata", body: createAgentVersionFromCodeMetadataSerializer(item["metadata"]) },
    createFilePartDescriptor("code", item["code"], "application/octet-stream"),
  ];
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
  | "creating"
  | "active"
  | "idle"
  | "updating"
  | "failed"
  | "deleting"
  | "deleted"
  | "expired";

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
  /** The path that was listed, relative to the session home directory. */
  path: string;
  /** The directory entries. */
  entries: SessionDirectoryEntry[];
}

export function sessionDirectoryListResponseDeserializer(item: any): SessionDirectoryListResponse {
  return {
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
    riskCategories: item["riskCategories"].map((p: any) => {
      return p;
    }),
  };
}

export function agentTaxonomyInputDeserializer(item: any): AgentTaxonomyInput {
  return {
    type: item["type"],
    target: evaluationTargetUnionDeserializer(item["target"]),
    riskCategories: item["riskCategories"].map((p: any) => {
      return p;
    }),
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
  /** Provenance artifacts from the generation pipeline. Read-only; present only on evaluator versions created via an EvaluatorGenerationJob. Each artifact resolves to a versioned Foundry Dataset. */
  readonly generation_artifacts?: EvaluatorGenerationArtifacts;
  /** Creator of the evaluator */
  readonly created_by: string;
  /** Creation date/time of the evaluator */
  readonly created_at: string;
  /** Last modified date/time of the evaluator */
  readonly modified_at: string;
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
    generation_artifacts: !item["generation_artifacts"]
      ? item["generation_artifacts"]
      : evaluatorGenerationArtifactsDeserializer(item["generation_artifacts"]),
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
  /** The discriminator possible values: code, prompt, rubric */
  type: EvaluatorDefinitionType;
  /** The JSON schema (Draft 2020-12) for the evaluator's input parameters. This includes parameters like type, properties, required. */
  init_parameters?: Record<string, any>;
  /** The JSON schema (Draft 2020-12) for the evaluator's input data. This includes parameters like type, properties, required. */
  data_schema?: Record<string, any>;
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
  | RubricBasedEvaluatorDefinition
  | EvaluatorDefinition;

export function evaluatorDefinitionUnionSerializer(item: EvaluatorDefinitionUnion): any {
  switch (item.type) {
    case "code":
      return codeBasedEvaluatorDefinitionSerializer(item as CodeBasedEvaluatorDefinition);

    case "prompt":
      return promptBasedEvaluatorDefinitionSerializer(item as PromptBasedEvaluatorDefinition);

    case "rubric":
      return rubricBasedEvaluatorDefinitionSerializer(item as RubricBasedEvaluatorDefinition);

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
  | "openai_graders"
  | "rubric";

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
    entry_point: item["entry_point"],
    image_tag: item["image_tag"],
    blob_uri: item["blob_uri"],
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

/** Rubric-based evaluator definition — stores dimensions produced by the generate API. Used for both quality and safety evaluators. */
export interface RubricBasedEvaluatorDefinition extends EvaluatorDefinition {
  type: "rubric";
  /** The set of dimensions — the scoring blueprint used by the LLM judge. Quality evaluators include a non-editable residual dimension with dimension_id 'general_quality' (always_applicable: true); safety evaluators include 'general_policy_compliance'. Both use the same Dimension structure. */
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
  dimension_id: string;
  /** What this dimension measures (e.g., 'Correctly identifies the user's reservation intent and pursues the appropriate workflow'). */
  description: string;
  /** Relative weight of this dimension (1-10). The generation pipeline assigns exactly one dimension weight 8-10; all others use 1-6. User edits are not constrained by this heuristic. */
  weight: number;
  /** When true, the LLM judge always scores this dimension regardless of relevance (skips applicability assessment). The service-generated general quality/policy dimension has this set to true and is non-editable. Users may set this on their own custom dimensions. */
  always_applicable?: boolean;
}

export function dimensionSerializer(item: Dimension): any {
  return {
    dimension_id: item["dimension_id"],
    description: item["description"],
    weight: item["weight"],
    always_applicable: item["always_applicable"],
  };
}

export function dimensionDeserializer(item: any): Dimension {
  return {
    dimension_id: item["dimension_id"],
    description: item["description"],
    weight: item["weight"],
    always_applicable: item["always_applicable"],
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

/** Evaluator Generation Job resource — a long-running job that generates rubric-based evaluator definitions from source materials. On success, the result is the persisted EvaluatorVersion. */
export interface EvaluatorGenerationJob {
  /** Server-assigned unique identifier. */
  readonly id: string;
  /** Caller-supplied inputs. */
  inputs?: EvaluatorGenerationInputs;
  /** Result produced on success. */
  readonly result?: EvaluatorVersion;
  /** Current lifecycle status. */
  readonly status: JobStatus;
  /** Error details — populated only on failure. */
  readonly error?: ApiError;
  /** The timestamp when the job was created, represented in Unix time (seconds since January 1, 1970). */
  readonly created_at: Date;
  /** The timestamp when the job finished, represented in Unix time (seconds since January 1, 1970). */
  readonly finished_at?: Date;
  /** Token consumption summary. Populated when the job reaches a terminal state. */
  readonly usage?: EvaluatorGenerationTokenUsage;
}

export function evaluatorGenerationJobSerializer(item: EvaluatorGenerationJob): any {
  return {
    inputs: !item["inputs"] ? item["inputs"] : evaluatorGenerationInputsSerializer(item["inputs"]),
  };
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
  };
}

/** Caller-supplied inputs for an evaluator generation job. */
export interface EvaluatorGenerationInputs {
  /** Source materials for generation — agent descriptions, prompts, traces, or datasets. Each entry is an `EvaluatorGenerationJobSource` variant discriminated by `type`. */
  sources: EvaluatorGenerationJobSourceUnion[];
  /** Category determines the rubric generation focus: 'quality' (default) produces quality-focused dimensions, 'safety' produces policy-derived safety dimensions. Both use the same Dimension structure. Singular because quality and safety generation are mutually exclusive pipelines — the output EvaluatorVersion.categories is an array (e.g., ['agents', 'quality']). */
  category?: EvaluatorCategory;
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
    category: item["category"],
    model: item["model"],
    evaluator_name: item["evaluator_name"],
    evaluator_display_name: item["evaluator_display_name"],
    evaluator_description: item["evaluator_description"],
  };
}

export function evaluatorGenerationInputsDeserializer(item: any): EvaluatorGenerationInputs {
  return {
    sources: evaluatorGenerationJobSourceUnionArrayDeserializer(item["sources"]),
    category: item["category"],
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
  start_time: Date;
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
    start_time: (item["start_time"].getTime() / 1000) | 0,
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
    start_time: new Date(item["start_time"] * 1000),
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
    data: evaluatorGenerationJobArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
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

/** Request body for running an evaluation from a suite. */
export interface EvaluationSuiteRunRequest {
  /** Name for the evaluation. Default: '{suiteName}-runs'. */
  evaluation_name?: string;
  /** Evaluation suite version to run. Default: latest. */
  evaluation_suite_version?: string;
  /** Overrides the suite's default evaluation level. If omitted, uses the level from the suite. */
  evaluation_level?: EvaluationLevel;
}

export function evaluationSuiteRunRequestSerializer(item: EvaluationSuiteRunRequest): any {
  return {
    evaluation_name: item["evaluation_name"],
    evaluation_suite_version: item["evaluation_suite_version"],
    evaluation_level: item["evaluation_level"],
  };
}

/** Response from running an evaluation suite. */
export interface EvaluationSuiteRunResponse {
  /** The evaluation suite name used. */
  evaluation_suite_name: string;
  /** The evaluation suite version resolved. */
  evaluation_suite_version: string;
  /** The run results. Currently a single-element array; will support multiple runs in the future. */
  results: EvaluationSuiteRunResult[];
}

export function evaluationSuiteRunResponseDeserializer(item: any): EvaluationSuiteRunResponse {
  return {
    evaluation_suite_name: item["evaluation_suite_name"],
    evaluation_suite_version: item["evaluation_suite_version"],
    results: evaluationSuiteRunResultArrayDeserializer(item["results"]),
  };
}

export function evaluationSuiteRunResultArrayDeserializer(
  result: Array<EvaluationSuiteRunResult>,
): any[] {
  return result.map((item) => {
    return evaluationSuiteRunResultDeserializer(item);
  });
}

/** Result of a single evaluation run within a suite execution. */
export interface EvaluationSuiteRunResult {
  /** The evaluation ID created. */
  eval_id: string;
  /** The eval run ID created. */
  run_id: string;
  /** Status of the run. */
  status: JobStatus;
  /** Timestamp when the run was created. */
  created_at: Date;
}

export function evaluationSuiteRunResultDeserializer(item: any): EvaluationSuiteRunResult {
  return {
    eval_id: item["eval_id"],
    run_id: item["run_id"],
    status: item["status"],
    created_at: new Date(item["created_at"] * 1000),
  };
}

/** Evaluation suite generation job resource — a long-running job that generates testing criteria and optionally a dataset from source materials. On success, the result is the persisted EvaluationSuiteVersion. */
export interface EvaluationSuiteGenerationJob {
  /** Server-assigned unique identifier. */
  readonly id: string;
  /** Caller-supplied inputs. */
  inputs?: EvaluationSuiteGenerationJobInputs;
  /** Result produced on success. */
  readonly result?: EvaluationSuiteVersion;
  /** Current lifecycle status. */
  readonly status: JobStatus;
  /** Error details — populated only on failure. */
  readonly error?: ApiError;
  /** The timestamp when the job was created, represented in Unix time. */
  readonly created_at: Date;
  /** The timestamp when the job finished, represented in Unix time. */
  readonly finished_at?: Date;
  /** Token consumption summary. Populated on terminal states. */
  readonly usage?: EvaluationSuiteGenerationTokenUsage;
}

export function evaluationSuiteGenerationJobSerializer(item: EvaluationSuiteGenerationJob): any {
  return {
    inputs: !item["inputs"]
      ? item["inputs"]
      : evaluationSuiteGenerationJobInputsSerializer(item["inputs"]),
  };
}

export function evaluationSuiteGenerationJobDeserializer(item: any): EvaluationSuiteGenerationJob {
  return {
    id: item["id"],
    inputs: !item["inputs"]
      ? item["inputs"]
      : evaluationSuiteGenerationJobInputsDeserializer(item["inputs"]),
    result: !item["result"] ? item["result"] : evaluationSuiteVersionDeserializer(item["result"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
    created_at: new Date(item["created_at"] * 1000),
    finished_at: !item["finished_at"] ? item["finished_at"] : new Date(item["finished_at"] * 1000),
    usage: !item["usage"]
      ? item["usage"]
      : evaluationSuiteGenerationTokenUsageDeserializer(item["usage"]),
  };
}

/** Caller-supplied inputs for an evaluation suite generation job. */
export interface EvaluationSuiteGenerationJobInputs {
  /** The evaluation suite name to create. */
  evaluation_suite_name: string;
  /** Source materials for generation — agent context, prompts, traces, or datasets. */
  sources: EvaluationSuiteJobSourceUnion[];
  /** The LLM model to use for rubric and data generation (e.g., 'gpt-4o'). */
  generation_model: string;
  /** Category determines the generation focus. Default: quality. */
  category?: EvaluationSuiteGenerationCategory;
  /**
   * Optional initialization parameters applied to all generated evaluators.
   * For example, deployment_name for LLM judge model, default threshold.
   */
  initialization_parameters?: Record<string, any>;
  /**
   * Data generation options. Controls how the evaluation dataset is generated.
   * If omitted, defaults are used (simple_qna, 100 max_samples).
   */
  data_generation_options?: EvaluationSuiteDataGenerationOptions;
}

export function evaluationSuiteGenerationJobInputsSerializer(
  item: EvaluationSuiteGenerationJobInputs,
): any {
  return {
    evaluation_suite_name: item["evaluation_suite_name"],
    sources: evaluationSuiteJobSourceUnionArraySerializer(item["sources"]),
    generation_model: item["generation_model"],
    category: item["category"],
    initialization_parameters: item["initialization_parameters"],
    data_generation_options: !item["data_generation_options"]
      ? item["data_generation_options"]
      : evaluationSuiteDataGenerationOptionsSerializer(item["data_generation_options"]),
  };
}

export function evaluationSuiteGenerationJobInputsDeserializer(
  item: any,
): EvaluationSuiteGenerationJobInputs {
  return {
    evaluation_suite_name: item["evaluation_suite_name"],
    sources: evaluationSuiteJobSourceUnionArrayDeserializer(item["sources"]),
    generation_model: item["generation_model"],
    category: item["category"],
    initialization_parameters: !item["initialization_parameters"]
      ? item["initialization_parameters"]
      : Object.fromEntries(
          Object.entries(item["initialization_parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    data_generation_options: !item["data_generation_options"]
      ? item["data_generation_options"]
      : evaluationSuiteDataGenerationOptionsDeserializer(item["data_generation_options"]),
  };
}

export function evaluationSuiteJobSourceUnionArraySerializer(
  result: Array<EvaluationSuiteJobSourceUnion>,
): any[] {
  return result.map((item) => {
    return evaluationSuiteJobSourceUnionSerializer(item);
  });
}

export function evaluationSuiteJobSourceUnionArrayDeserializer(
  result: Array<EvaluationSuiteJobSourceUnion>,
): any[] {
  return result.map((item) => {
    return evaluationSuiteJobSourceUnionDeserializer(item);
  });
}

/** The base source model for evaluation suite generation jobs. Polymorphic over `type`. */
export interface EvaluationSuiteJobSource {
  /** The type of source. */
  /** The discriminator possible values: prompt, agent, traces, dataset */
  type: EvaluationSuiteJobSourceType;
  /** Optional description of what this source represents — helps the pipeline interpret its content (e.g., 'Company refund policy document' or 'Describes the agent's core capabilities'). */
  description?: string;
}

export function evaluationSuiteJobSourceSerializer(item: EvaluationSuiteJobSource): any {
  return { type: item["type"], description: item["description"] };
}

export function evaluationSuiteJobSourceDeserializer(item: any): EvaluationSuiteJobSource {
  return {
    type: item["type"],
    description: item["description"],
  };
}

/** Alias for EvaluationSuiteJobSourceUnion */
export type EvaluationSuiteJobSourceUnion =
  | PromptEvaluationSuiteJobSource
  | AgentEvaluationSuiteJobSource
  | TracesEvaluationSuiteJobSource
  | DatasetEvaluationSuiteJobSource
  | EvaluationSuiteJobSource;

export function evaluationSuiteJobSourceUnionSerializer(item: EvaluationSuiteJobSourceUnion): any {
  switch (item.type) {
    case "prompt":
      return promptEvaluationSuiteJobSourceSerializer(item as PromptEvaluationSuiteJobSource);

    case "agent":
      return agentEvaluationSuiteJobSourceSerializer(item as AgentEvaluationSuiteJobSource);

    case "traces":
      return tracesEvaluationSuiteJobSourceSerializer(item as TracesEvaluationSuiteJobSource);

    case "dataset":
      return datasetEvaluationSuiteJobSourceSerializer(item as DatasetEvaluationSuiteJobSource);

    default:
      return evaluationSuiteJobSourceSerializer(item);
  }
}

export function evaluationSuiteJobSourceUnionDeserializer(
  item: any,
): EvaluationSuiteJobSourceUnion {
  switch (item["type"]) {
    case "prompt":
      return promptEvaluationSuiteJobSourceDeserializer(item as PromptEvaluationSuiteJobSource);

    case "agent":
      return agentEvaluationSuiteJobSourceDeserializer(item as AgentEvaluationSuiteJobSource);

    case "traces":
      return tracesEvaluationSuiteJobSourceDeserializer(item as TracesEvaluationSuiteJobSource);

    case "dataset":
      return datasetEvaluationSuiteJobSourceDeserializer(item as DatasetEvaluationSuiteJobSource);

    default:
      return evaluationSuiteJobSourceDeserializer(item);
  }
}

/** The supported source types for evaluation suite generation jobs. */
export type EvaluationSuiteJobSourceType = "prompt" | "agent" | "traces" | "dataset";

/** Prompt source for evaluation suite generation jobs — inline text provided by the user. */
export interface PromptEvaluationSuiteJobSource extends EvaluationSuiteJobSource {
  /** Optional description of what this source represents — helps the pipeline interpret its content (e.g., 'Company refund policy document' or 'Describes the agent's core capabilities'). */
  description?: string;
  /** The source type for this source, which is Prompt. */
  type: "prompt";
  /** Inline prompt text (e.g., agent description, policy text, supplementary context). */
  prompt: string;
}

export function promptEvaluationSuiteJobSourceSerializer(
  item: PromptEvaluationSuiteJobSource,
): any {
  return { type: item["type"], description: item["description"], prompt: item["prompt"] };
}

export function promptEvaluationSuiteJobSourceDeserializer(
  item: any,
): PromptEvaluationSuiteJobSource {
  return {
    type: item["type"],
    description: item["description"],
    prompt: item["prompt"],
  };
}

/** Agent source for evaluation suite generation jobs — references an agent to fetch instructions and metadata from. */
export interface AgentEvaluationSuiteJobSource extends EvaluationSuiteJobSource {
  /** Optional description of what this source represents — helps the pipeline interpret its content (e.g., 'Company refund policy document' or 'Describes the agent's core capabilities'). */
  description?: string;
  /** The source type for this source, which is Agent. */
  type: "agent";
  /** The agent name to fetch instructions from. */
  agent_name: string;
  /** The agent version. If not specified, the latest version is used. */
  agent_version?: string;
}

export function agentEvaluationSuiteJobSourceSerializer(item: AgentEvaluationSuiteJobSource): any {
  return {
    type: item["type"],
    description: item["description"],
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
  };
}

export function agentEvaluationSuiteJobSourceDeserializer(
  item: any,
): AgentEvaluationSuiteJobSource {
  return {
    type: item["type"],
    description: item["description"],
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
  };
}

/** Traces source for evaluation suite generation jobs — conversation traces from Application Insights. */
export interface TracesEvaluationSuiteJobSource extends EvaluationSuiteJobSource {
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

export function tracesEvaluationSuiteJobSourceSerializer(
  item: TracesEvaluationSuiteJobSource,
): any {
  return {
    type: item["type"],
    description: item["description"],
    agent_id: item["agent_id"],
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
    start_time: (item["start_time"].getTime() / 1000) | 0,
    end_time: !item["end_time"] ? item["end_time"] : (item["end_time"].getTime() / 1000) | 0,
  };
}

export function tracesEvaluationSuiteJobSourceDeserializer(
  item: any,
): TracesEvaluationSuiteJobSource {
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

/** Dataset source for evaluation suite generation jobs — reference to a dataset. */
export interface DatasetEvaluationSuiteJobSource extends EvaluationSuiteJobSource {
  /** Optional description of what this source represents — helps the pipeline interpret its content (e.g., 'Company refund policy document' or 'Describes the agent's core capabilities'). */
  description?: string;
  /** The source type for this source, which is Dataset. */
  type: "dataset";
  /** The name of the dataset. */
  name: string;
  /** The version of the dataset. If not specified, the latest version is used. */
  version?: string;
}

export function datasetEvaluationSuiteJobSourceSerializer(
  item: DatasetEvaluationSuiteJobSource,
): any {
  return {
    type: item["type"],
    description: item["description"],
    name: item["name"],
    version: item["version"],
  };
}

export function datasetEvaluationSuiteJobSourceDeserializer(
  item: any,
): DatasetEvaluationSuiteJobSource {
  return {
    type: item["type"],
    description: item["description"],
    name: item["name"],
    version: item["version"],
  };
}

/** The category of evaluator generation. */
export type EvaluationSuiteGenerationCategory = "quality" | "safety";

/** Options for dataset generation within an evaluation suite generation job. */
export interface EvaluationSuiteDataGenerationOptions {
  /** The data generation type. Defaults to 'simple_qna' if not specified. */
  type?: EvaluationDataGenerationType;
  /** Maximum number of samples to generate. Valid range: 15-1000. */
  max_samples?: number;
}

export function evaluationSuiteDataGenerationOptionsSerializer(
  item: EvaluationSuiteDataGenerationOptions,
): any {
  return { type: item["type"], max_samples: item["max_samples"] };
}

export function evaluationSuiteDataGenerationOptionsDeserializer(
  item: any,
): EvaluationSuiteDataGenerationOptions {
  return {
    type: item["type"],
    max_samples: item["max_samples"],
  };
}

/** The data generation type. */
export type EvaluationDataGenerationType = "simple_qna" | "traces" | "tool_use" | "task";

/** Token usage summary for an evaluation suite generation job. */
export interface EvaluationSuiteGenerationTokenUsage {
  /** Number of input tokens consumed. */
  input_tokens?: number;
  /** Number of output tokens consumed. */
  output_tokens?: number;
  /** Total tokens consumed. */
  total_tokens?: number;
}

export function evaluationSuiteGenerationTokenUsageDeserializer(
  item: any,
): EvaluationSuiteGenerationTokenUsage {
  return {
    input_tokens: item["input_tokens"],
    output_tokens: item["output_tokens"],
    total_tokens: item["total_tokens"],
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultEvaluationSuiteGenerationJob {
  /** The requested list of items. */
  data: EvaluationSuiteGenerationJob[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultEvaluationSuiteGenerationJobDeserializer(
  item: any,
): _AgentsPagedResultEvaluationSuiteGenerationJob {
  return {
    data: evaluationSuiteGenerationJobArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function evaluationSuiteGenerationJobArraySerializer(
  result: Array<EvaluationSuiteGenerationJob>,
): any[] {
  return result.map((item) => {
    return evaluationSuiteGenerationJobSerializer(item);
  });
}

export function evaluationSuiteGenerationJobArrayDeserializer(
  result: Array<EvaluationSuiteGenerationJob>,
): any[] {
  return result.map((item) => {
    return evaluationSuiteGenerationJobDeserializer(item);
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
  features: Record<string, any>;
  /** Info about the correlation for the analysis sample. */
  correlationInfo: Record<string, any>;
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
  memory_item: MemoryItemUnion;
}

export function memorySearchItemSerializer(item: MemorySearchItem): any {
  return { memory_item: memoryItemUnionSerializer(item["memory_item"]) };
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

export function memoryItemSerializer(item: MemoryItem): any {
  return {
    memory_id: item["memory_id"],
    updated_at: (item["updated_at"].getTime() / 1000) | 0,
    scope: item["scope"],
    content: item["content"],
    kind: item["kind"],
  };
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

export function memoryItemUnionSerializer(item: MemoryItemUnion): any {
  switch (item.kind) {
    case "user_profile":
      return userProfileMemoryItemSerializer(item as UserProfileMemoryItem);

    case "chat_summary":
      return chatSummaryMemoryItemSerializer(item as ChatSummaryMemoryItem);

    default:
      return memoryItemSerializer(item);
  }
}

export function memoryItemUnionDeserializer(item: any): MemoryItemUnion {
  switch (item["kind"]) {
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

export function userProfileMemoryItemSerializer(item: UserProfileMemoryItem): any {
  return {
    memory_id: item["memory_id"],
    updated_at: (item["updated_at"].getTime() / 1000) | 0,
    scope: item["scope"],
    content: item["content"],
    kind: item["kind"],
  };
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

export function chatSummaryMemoryItemSerializer(item: ChatSummaryMemoryItem): any {
  return {
    memory_id: item["memory_id"],
    updated_at: (item["updated_at"].getTime() / 1000) | 0,
    scope: item["scope"],
    content: item["content"],
    kind: item["kind"],
  };
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
  error?: ApiError;
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

export function memoryItemUnionArraySerializer(result: Array<MemoryItemUnion>): any[] {
  return result.map((item) => {
    return memoryItemUnionSerializer(item);
  });
}

export function memoryItemUnionArrayDeserializer(result: Array<MemoryItemUnion>): any[] {
  return result.map((item) => {
    return memoryItemUnionDeserializer(item);
  });
}

/** Response for deleting a memory item from a memory store. */
export interface DeleteMemoryResponse {
  /** The object type. Always 'memory.deleted'. */
  object: "memory.deleted";
  /** The name of the memory store. */
  name: string;
  /** The unique ID of the deleted memory item. */
  memory_id: string;
  /** Whether the memory item was successfully deleted. */
  deleted: boolean;
}

export function deleteMemoryResponseDeserializer(item: any): DeleteMemoryResponse {
  return {
    object: item["object"],
    name: item["name"],
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
  /** System related metadata */
  readonly systemData?: SystemDataV3;
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
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataV3Deserializer(item["systemData"]),
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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** System metadata for a resource */
export interface SystemDataV3 {
  /** Timestamp of resource creation */
  createdAt?: Date;
  /** Identity that created the resource */
  createdBy?: string;
  /** Type of identity that created the resource */
  createdByType?: string;
  /** Timestamp of last resource modification */
  lastModifiedAt?: Date;
}

export function systemDataV3Deserializer(item: any): SystemDataV3 {
  return {
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"] * 1000),
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"] * 1000),
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
  | "PickleDeserialization"
  | "CustomPythonCode"
  | "DynamicOps"
  | "NativeBinary"
  | "UnknownFormat";

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
  target: RedTeamTargetConfigUnion;
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
    target: redTeamTargetConfigUnionSerializer(item["target"]),
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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    status: item["status"],
    target: redTeamTargetConfigUnionDeserializer(item["target"]),
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
  readonly schedule_id: string;
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
    schedule_id: item["id"],
    displayName: item["displayName"],
    description: item["description"],
    enabled: item["enabled"],
    provisioningStatus: item["provisioningStatus"],
    trigger: triggerUnionDeserializer(item["trigger"]),
    task: scheduleTaskUnionDeserializer(item["task"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    systemData: Object.fromEntries(
      Object.entries(item["systemData"]).map(([k, p]: [string, any]) => [k, p]),
    ),
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
    configuration: !item["configuration"]
      ? item["configuration"]
      : Object.fromEntries(
          Object.entries(item["configuration"]).map(([k, p]: [string, any]) => [k, p]),
        ),
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
    configuration: !item["configuration"]
      ? item["configuration"]
      : Object.fromEntries(
          Object.entries(item["configuration"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    evalId: item["evalId"],
    evalRun: _evaluationScheduleTaskEvalRunDeserializer(item["evalRun"]),
  };
}

/** model interface _EvaluationScheduleTaskEvalRun */
export interface _EvaluationScheduleTaskEvalRun {}

export function _evaluationScheduleTaskEvalRunSerializer(
  _item: _EvaluationScheduleTaskEvalRun,
): any {
  return {};
}

export function _evaluationScheduleTaskEvalRunDeserializer(
  item: any,
): _EvaluationScheduleTaskEvalRun {
  return item;
}

/** Insight task for the schedule. */
export interface InsightScheduleTask extends ScheduleTask {
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
    configuration: !item["configuration"]
      ? item["configuration"]
      : Object.fromEntries(
          Object.entries(item["configuration"]).map(([k, p]: [string, any]) => [k, p]),
        ),
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
    properties: Object.fromEntries(
      Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
    ),
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
  tools: ToolUnion[];
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
    tools: toolUnionArrayDeserializer(item["tools"]),
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

/** A skill object. */
export interface SkillObject {
  /** The unique identifier of the skill. */
  skill_id: string;
  /** Whether the skill was created from a zip blob package. */
  has_blob: boolean;
  /** The unique name of the skill. */
  name: string;
  /** A human-readable description of the skill. */
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
}

export function skillObjectDeserializer(item: any): SkillObject {
  return {
    skill_id: item["skill_id"],
    has_blob: item["has_blob"],
    name: item["name"],
    description: item["description"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultSkillObject {
  /** The requested list of items. */
  data: SkillObject[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultSkillObjectDeserializer(
  item: any,
): _AgentsPagedResultSkillObject {
  return {
    data: skillObjectArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function skillObjectArrayDeserializer(result: Array<SkillObject>): any[] {
  return result.map((item) => {
    return skillObjectDeserializer(item);
  });
}

/** A deleted skill Object */
export interface DeleteSkillResponse {
  /** The unique name of the skill. */
  name: string;
  /** Whether the skill was successfully deleted. */
  deleted: boolean;
}

export function deleteSkillResponseDeserializer(item: any): DeleteSkillResponse {
  return {
    name: item["name"],
    deleted: item["deleted"],
  };
}

/** Data Generation Job resource. */
export interface DataGenerationJob {
  /** Server-assigned unique identifier. */
  readonly id: string;
  /** Caller-supplied inputs. */
  inputs?: DataGenerationJobInputs;
  /** Result produced on success. */
  readonly result?: DataGenerationJobResult;
  /** Current lifecycle status. */
  readonly status: JobStatus;
  /** Error details — populated only on failure. */
  readonly error?: ApiError;
  /** The timestamp when the job was created, represented in Unix time (seconds since January 1, 1970). */
  readonly created_at: Date;
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
  /** The discriminator possible values: prompt, agent, traces, dataset, file */
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
  | DatasetDataGenerationJobSource
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

    case "dataset":
      return datasetDataGenerationJobSourceSerializer(item as DatasetDataGenerationJobSource);

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

    case "dataset":
      return datasetDataGenerationJobSourceDeserializer(item as DatasetDataGenerationJobSource);

    case "file":
      return fileDataGenerationJobSourceDeserializer(item as FileDataGenerationJobSource);

    default:
      return dataGenerationJobSourceDeserializer(item);
  }
}

/** The supported source types for data generation jobs. */
export type DataGenerationJobSourceType = "prompt" | "agent" | "traces" | "dataset" | "file";

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
    start_time: (item["start_time"].getTime() / 1000) | 0,
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

/** Dataset source for data generation jobs — reference to a dataset. */
export interface DatasetDataGenerationJobSource extends DataGenerationJobSource {
  /** Optional description of what this source represents — helps the pipeline interpret its content (e.g., 'Company refund policy document' or 'Describes the agent's core capabilities'). */
  description?: string;
  /** The source type for this source, which is Dataset. */
  type: "dataset";
  /** The name of the dataset. */
  name: string;
  /** The version of the dataset. If not specified, the latest version is used. */
  version?: string;
}

export function datasetDataGenerationJobSourceSerializer(
  item: DatasetDataGenerationJobSource,
): any {
  return {
    type: item["type"],
    description: item["description"],
    name: item["name"],
    version: item["version"],
  };
}

export function datasetDataGenerationJobSourceDeserializer(
  item: any,
): DatasetDataGenerationJobSource {
  return {
    type: item["type"],
    description: item["description"],
    name: item["name"],
    version: item["version"],
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
  /** The discriminator possible values: simple_qna, traces, tool_use */
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
  | ToolUseFineTuningDataGenerationJobOptions
  | DataGenerationJobOptions;

export function dataGenerationJobOptionsUnionSerializer(item: DataGenerationJobOptionsUnion): any {
  switch (item.type) {
    case "simple_qna":
      return simpleQnADataGenerationJobOptionsSerializer(item as SimpleQnADataGenerationJobOptions);

    case "traces":
      return tracesDataGenerationJobOptionsSerializer(item as TracesDataGenerationJobOptions);

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

    case "tool_use":
      return toolUseFineTuningDataGenerationJobOptionsDeserializer(
        item as ToolUseFineTuningDataGenerationJobOptions,
      );

    default:
      return dataGenerationJobOptionsDeserializer(item);
  }
}

/** The supported data generation job types. */
export type DataGenerationJobType = "simple_qna" | "traces" | "tool_use";

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
  | "supervised_finetuning"
  | "reinforcement_finetuning"
  | "evaluation";

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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
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
  | FileDataGenerationJobOutput
  | DatasetDataGenerationJobOutput
  | DataGenerationJobOutput;

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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
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

/** Agent optimization job resource — a long-running job that optimizes an agent's configuration (instructions, model, skills) to maximize evaluation scores. On success, the result contains scored candidates. */
export interface OptimizationJob {
  /** Server-assigned unique identifier. */
  readonly id: string;
  /** Caller-supplied inputs. */
  inputs?: OptimizationJobInputs;
  /** Result produced on success. */
  readonly result?: OptimizationJobResult;
  /** Current lifecycle status. */
  readonly status: JobStatus;
  /** Error details — populated only on failure. */
  readonly error?: ApiError;
  /** The timestamp when the job was created, represented in Unix time. */
  readonly created_at: Date;
  /** The timestamp when the job was last updated, represented in Unix time. */
  readonly updated_at?: Date;
  /** Progress while in flight. Absent in terminal states. */
  readonly progress?: OptimizationJobProgress;
}

export function optimizationJobSerializer(item: OptimizationJob): any {
  return {
    inputs: !item["inputs"] ? item["inputs"] : optimizationJobInputsSerializer(item["inputs"]),
  };
}

export function optimizationJobDeserializer(item: any): OptimizationJob {
  return {
    id: item["id"],
    inputs: !item["inputs"] ? item["inputs"] : optimizationJobInputsDeserializer(item["inputs"]),
    result: !item["result"] ? item["result"] : optimizationJobResultDeserializer(item["result"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
    created_at: new Date(item["created_at"] * 1000),
    updated_at: !item["updated_at"] ? item["updated_at"] : new Date(item["updated_at"] * 1000),
    progress: !item["progress"]
      ? item["progress"]
      : optimizationJobProgressDeserializer(item["progress"]),
  };
}

/** Caller-supplied inputs for an optimization job. */
export interface OptimizationJobInputs {
  /** The agent (and pinned version) being optimized. */
  agent: OptimizationAgentDefinition;
  /** Inline evaluation dataset. Mutually exclusive with `train_dataset_reference`. */
  dataset?: DatasetItem[];
  /** Reference to a registered training dataset. Mutually exclusive with `dataset`. */
  train_dataset_reference?: DatasetRef;
  /** Optional held-out validation dataset for measuring generalization of the final candidate. */
  validation_dataset_reference?: DatasetRef;
  /** Job-level evaluators (referenced by `name`). Per-task `criteria` may override. Default: ['task_adherence']. */
  evaluators?: string[];
  /** Job-level evaluation criteria. Applied to all tasks unless overridden by per-task `criteria`. */
  criteria?: EvaluationCriterion[];
  /** Tuning knobs and run-mode. */
  options?: OptimizationOptions;
}

export function optimizationJobInputsSerializer(item: OptimizationJobInputs): any {
  return {
    agent: optimizationAgentDefinitionSerializer(item["agent"]),
    dataset: !item["dataset"] ? item["dataset"] : datasetItemArraySerializer(item["dataset"]),
    train_dataset_reference: !item["train_dataset_reference"]
      ? item["train_dataset_reference"]
      : datasetRefSerializer(item["train_dataset_reference"]),
    validation_dataset_reference: !item["validation_dataset_reference"]
      ? item["validation_dataset_reference"]
      : datasetRefSerializer(item["validation_dataset_reference"]),
    evaluators: !item["evaluators"]
      ? item["evaluators"]
      : item["evaluators"].map((p: any) => {
          return p;
        }),
    criteria: !item["criteria"]
      ? item["criteria"]
      : evaluationCriterionArraySerializer(item["criteria"]),
    options: !item["options"] ? item["options"] : optimizationOptionsSerializer(item["options"]),
  };
}

export function optimizationJobInputsDeserializer(item: any): OptimizationJobInputs {
  return {
    agent: optimizationAgentDefinitionDeserializer(item["agent"]),
    dataset: !item["dataset"] ? item["dataset"] : datasetItemArrayDeserializer(item["dataset"]),
    train_dataset_reference: !item["train_dataset_reference"]
      ? item["train_dataset_reference"]
      : datasetRefDeserializer(item["train_dataset_reference"]),
    validation_dataset_reference: !item["validation_dataset_reference"]
      ? item["validation_dataset_reference"]
      : datasetRefDeserializer(item["validation_dataset_reference"]),
    evaluators: !item["evaluators"]
      ? item["evaluators"]
      : item["evaluators"].map((p: any) => {
          return p;
        }),
    criteria: !item["criteria"]
      ? item["criteria"]
      : evaluationCriterionArrayDeserializer(item["criteria"]),
    options: !item["options"] ? item["options"] : optimizationOptionsDeserializer(item["options"]),
  };
}

/** The agent definition being optimized. Identifies the Foundry agent and optional configuration overrides. */
export interface OptimizationAgentDefinition {
  /** Registered Foundry agent name. Required — bare-model mode is not supported. */
  agent_name: string;
  /** Pinned agent version. Defaults to latest if omitted. */
  agent_version?: string;
  /** Model deployment name (e.g., 'gpt-4o'). Optional when agent_name is set — the agent definition provides the model. */
  model?: string;
  /** System prompt / instructions override. When set, used as the baseline instructions for the agent. */
  system_prompt?: string;
  /** Optional named skills the optimizer may tune. Tool descriptions and parameters. */
  skills?: OptimizationAgentSkill[];
}

export function optimizationAgentDefinitionSerializer(item: OptimizationAgentDefinition): any {
  return {
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
    model: item["model"],
    system_prompt: item["system_prompt"],
    skills: !item["skills"]
      ? item["skills"]
      : optimizationAgentSkillArraySerializer(item["skills"]),
  };
}

export function optimizationAgentDefinitionDeserializer(item: any): OptimizationAgentDefinition {
  return {
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
    model: item["model"],
    system_prompt: item["system_prompt"],
    skills: !item["skills"]
      ? item["skills"]
      : optimizationAgentSkillArrayDeserializer(item["skills"]),
  };
}

export function optimizationAgentSkillArraySerializer(
  result: Array<OptimizationAgentSkill>,
): any[] {
  return result.map((item) => {
    return optimizationAgentSkillSerializer(item);
  });
}

export function optimizationAgentSkillArrayDeserializer(
  result: Array<OptimizationAgentSkill>,
): any[] {
  return result.map((item) => {
    return optimizationAgentSkillDeserializer(item);
  });
}

/** A named skill on the agent that the optimizer may tune. */
export interface OptimizationAgentSkill {
  /** Skill name (matches the tool name on the agent). */
  name: string;
  /** Free-form description used as the seed when tuning skill descriptions. */
  description?: string;
}

export function optimizationAgentSkillSerializer(item: OptimizationAgentSkill): any {
  return { name: item["name"], description: item["description"] };
}

export function optimizationAgentSkillDeserializer(item: any): OptimizationAgentSkill {
  return {
    name: item["name"],
    description: item["description"],
  };
}

export function datasetItemArraySerializer(result: Array<DatasetItem>): any[] {
  return result.map((item) => {
    return datasetItemSerializer(item);
  });
}

export function datasetItemArrayDeserializer(result: Array<DatasetItem>): any[] {
  return result.map((item) => {
    return datasetItemDeserializer(item);
  });
}

/** A single evaluation task with input query, expected output, and evaluation criteria. */
export interface DatasetItem {
  /** Unique-within-the-dataset identifier for this task. */
  name: string;
  /** The user query / input for the task. */
  query: string;
  /** Optional ground truth used by reference-based evaluators. */
  ground_truth?: string;
  /** Per-task evaluation criteria. Defaults to the job-level evaluators if unset. */
  criteria?: EvaluationCriterion[];
  /** Pre-computed evaluation results in AOAI-compatible format. When provided together with `response_items`, the baseline run-and-evaluate phase is skipped. */
  eval_results?: EvalRunOutputItemResult[];
  /** Pre-computed agent response output items. Captures the full trajectory (function calls, tool outputs, messages) from a prior agent run. */
  response_items?: OutputItemUnion[];
}

export function datasetItemSerializer(item: DatasetItem): any {
  return {
    name: item["name"],
    query: item["query"],
    ground_truth: item["ground_truth"],
    criteria: !item["criteria"]
      ? item["criteria"]
      : evaluationCriterionArraySerializer(item["criteria"]),
    eval_results: !item["eval_results"]
      ? item["eval_results"]
      : evalRunOutputItemResultArraySerializer(item["eval_results"]),
    response_items: !item["response_items"]
      ? item["response_items"]
      : outputItemUnionArraySerializer(item["response_items"]),
  };
}

export function datasetItemDeserializer(item: any): DatasetItem {
  return {
    name: item["name"],
    query: item["query"],
    ground_truth: item["ground_truth"],
    criteria: !item["criteria"]
      ? item["criteria"]
      : evaluationCriterionArrayDeserializer(item["criteria"]),
    eval_results: !item["eval_results"]
      ? item["eval_results"]
      : evalRunOutputItemResultArrayDeserializer(item["eval_results"]),
    response_items: !item["response_items"]
      ? item["response_items"]
      : outputItemUnionArrayDeserializer(item["response_items"]),
  };
}

export function evaluationCriterionArraySerializer(result: Array<EvaluationCriterion>): any[] {
  return result.map((item) => {
    return evaluationCriterionSerializer(item);
  });
}

export function evaluationCriterionArrayDeserializer(result: Array<EvaluationCriterion>): any[] {
  return result.map((item) => {
    return evaluationCriterionDeserializer(item);
  });
}

/** LLM-as-judge evaluation criterion applied to a single task. */
export interface EvaluationCriterion {
  /** Criterion name (referenced in evaluation result rows). */
  name: string;
  /** Natural-language instruction passed to the judge LLM. */
  instruction: string;
}

export function evaluationCriterionSerializer(item: EvaluationCriterion): any {
  return { name: item["name"], instruction: item["instruction"] };
}

export function evaluationCriterionDeserializer(item: any): EvaluationCriterion {
  return {
    name: item["name"],
    instruction: item["instruction"],
  };
}

export function evalRunOutputItemResultArraySerializer(
  result: Array<EvalRunOutputItemResult>,
): any[] {
  return result.map((item) => {
    return evalRunOutputItemResultSerializer(item);
  });
}

export function evalRunOutputItemResultArrayDeserializer(
  result: Array<EvalRunOutputItemResult>,
): any[] {
  return result.map((item) => {
    return evalRunOutputItemResultDeserializer(item);
  });
}

/** A single grader result for an evaluation run output item. */
export interface EvalRunOutputItemResult {
  /** The name of the grader. */
  name: string;
  /** The grader type (for example, "string-check-grader"). */
  type?: string;
  /** The numeric score produced by the grader. */
  score: number;
  /** Whether the grader considered the output a pass. */
  passed: boolean;
  /** Optional sample or intermediate data produced by the grader. */
  sample?: Record<string, any>;
  /** The evaluation status for this result item. Values: "completed", "errored", "skipped". Null if not provided by evaluator. When status is skipped, passed/score can be ignored. */
  status?: EvalRunOutputItemResultStatus;
  /** The name of the metric (e.g., "fluency", "f1_score"). */
  metric?: string;
  /** The label associated with the test criteria metric (e.g., "pass", "fail", "good", "bad"). */
  label?: string;
  /** The threshold used to determine pass/fail for this test criteria, if it is numerical. */
  threshold?: number;
  /** The reason for the test criteria metric. */
  reason?: string;
  /** Additional details about the test criteria metric. */
  properties?: Record<string, string>;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function evalRunOutputItemResultSerializer(item: EvalRunOutputItemResult): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    name: item["name"],
    type: item["type"],
    score: item["score"],
    passed: item["passed"],
    sample: item["sample"],
    status: item["status"],
    metric: item["metric"],
    label: item["label"],
    threshold: item["threshold"],
    reason: item["reason"],
    properties: item["properties"],
  };
}

export function evalRunOutputItemResultDeserializer(item: any): EvalRunOutputItemResult {
  return {
    additionalProperties: serializeRecord(item, [
      "name",
      "type",
      "score",
      "passed",
      "sample",
      "status",
      "metric",
      "label",
      "threshold",
      "reason",
      "properties",
    ]),
    name: item["name"],
    type: item["type"],
    score: item["score"],
    passed: item["passed"],
    sample: !item["sample"]
      ? item["sample"]
      : Object.fromEntries(
          Object.entries(item["sample"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
    status: item["status"],
    metric: item["metric"],
    label: item["label"],
    threshold: item["threshold"],
    reason: item["reason"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** The evaluation status for an evaluation run output item result. */
export type EvalRunOutputItemResultStatus = "completed" | "errored" | "skipped";

export function outputItemUnionArraySerializer(result: Array<OutputItemUnion>): any[] {
  return result.map((item) => {
    return outputItemUnionSerializer(item);
  });
}

export function outputItemUnionArrayDeserializer(result: Array<OutputItemUnion>): any[] {
  return result.map((item) => {
    return outputItemUnionDeserializer(item);
  });
}

/** model interface OutputItem */
export interface OutputItem {
  type: OutputItemType;
  /** The agent that created the item. */
  agent_reference?: AgentReference;
  /** The response on which the item is created. */
  response_id?: string;
}

export function outputItemSerializer(item: OutputItem): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
  };
}

export function outputItemDeserializer(item: any): OutputItem {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
  };
}

/** Alias for OutputItemUnion */
export type OutputItemUnion =
  | StructuredOutputsOutputItem
  | WorkflowActionOutputItem
  | OAuthConsentRequestOutputItem
  | MemorySearchToolCallItemResource
  | BingGroundingToolCall
  | BingGroundingToolCallOutput
  | SharepointGroundingToolCall
  | SharepointGroundingToolCallOutput
  | AzureAISearchToolCall
  | AzureAISearchToolCallOutput
  | BingCustomSearchToolCall
  | BingCustomSearchToolCallOutput
  | OpenApiToolCall
  | OpenApiToolCallOutput
  | BrowserAutomationToolCall
  | BrowserAutomationToolCallOutput
  | FabricDataAgentToolCall
  | FabricDataAgentToolCallOutput
  | AzureFunctionToolCall
  | AzureFunctionToolCallOutput
  | A2AToolCall
  | A2AToolCallOutput
  | OutputItemOutputMessage
  | OutputItemFileSearchToolCall
  | OutputItemFunctionToolCall
  | OutputItemFunctionToolCallOutput
  | OutputItemWebSearchToolCall
  | OutputItemComputerToolCall
  | OutputItemComputerToolCallOutput
  | OutputItemReasoningItem
  | OutputItemToolSearchCall
  | OutputItemToolSearchOutput
  | OutputItemCompactionBody
  | OutputItemImageGenToolCall
  | OutputItemCodeInterpreterToolCall
  | OutputItemLocalShellToolCall
  | OutputItemLocalShellToolCallOutput
  | OutputItemFunctionShellCall
  | OutputItemFunctionShellCallOutput
  | OutputItemApplyPatchToolCall
  | OutputItemApplyPatchToolCallOutput
  | OutputItemMcpToolCall
  | OutputItemMcpListTools
  | OutputItemMcpApprovalRequest
  | OutputItemMcpApprovalResponseResource
  | OutputItemCustomToolCallResource
  | OutputItemCustomToolCallOutputResource
  | OutputItem;

export function outputItemUnionSerializer(item: OutputItemUnion): any {
  switch (item.type) {
    case "structured_outputs":
      return structuredOutputsOutputItemSerializer(item as StructuredOutputsOutputItem);

    case "workflow_action":
      return workflowActionOutputItemSerializer(item as WorkflowActionOutputItem);

    case "oauth_consent_request":
      return oAuthConsentRequestOutputItemSerializer(item as OAuthConsentRequestOutputItem);

    case "memory_search_call":
      return memorySearchToolCallItemResourceSerializer(item as MemorySearchToolCallItemResource);

    case "bing_grounding_call":
      return bingGroundingToolCallSerializer(item as BingGroundingToolCall);

    case "bing_grounding_call_output":
      return bingGroundingToolCallOutputSerializer(item as BingGroundingToolCallOutput);

    case "sharepoint_grounding_preview_call":
      return sharepointGroundingToolCallSerializer(item as SharepointGroundingToolCall);

    case "sharepoint_grounding_preview_call_output":
      return sharepointGroundingToolCallOutputSerializer(item as SharepointGroundingToolCallOutput);

    case "azure_ai_search_call":
      return azureAISearchToolCallSerializer(item as AzureAISearchToolCall);

    case "azure_ai_search_call_output":
      return azureAISearchToolCallOutputSerializer(item as AzureAISearchToolCallOutput);

    case "bing_custom_search_preview_call":
      return bingCustomSearchToolCallSerializer(item as BingCustomSearchToolCall);

    case "bing_custom_search_preview_call_output":
      return bingCustomSearchToolCallOutputSerializer(item as BingCustomSearchToolCallOutput);

    case "openapi_call":
      return openApiToolCallSerializer(item as OpenApiToolCall);

    case "openapi_call_output":
      return openApiToolCallOutputSerializer(item as OpenApiToolCallOutput);

    case "browser_automation_preview_call":
      return browserAutomationToolCallSerializer(item as BrowserAutomationToolCall);

    case "browser_automation_preview_call_output":
      return browserAutomationToolCallOutputSerializer(item as BrowserAutomationToolCallOutput);

    case "fabric_dataagent_preview_call":
      return fabricDataAgentToolCallSerializer(item as FabricDataAgentToolCall);

    case "fabric_dataagent_preview_call_output":
      return fabricDataAgentToolCallOutputSerializer(item as FabricDataAgentToolCallOutput);

    case "azure_function_call":
      return azureFunctionToolCallSerializer(item as AzureFunctionToolCall);

    case "azure_function_call_output":
      return azureFunctionToolCallOutputSerializer(item as AzureFunctionToolCallOutput);

    case "a2a_preview_call":
      return a2AToolCallSerializer(item as A2AToolCall);

    case "a2a_preview_call_output":
      return a2AToolCallOutputSerializer(item as A2AToolCallOutput);

    case "output_message":
      return outputItemOutputMessageSerializer(item as OutputItemOutputMessage);

    case "file_search_call":
      return outputItemFileSearchToolCallSerializer(item as OutputItemFileSearchToolCall);

    case "function_call":
      return outputItemFunctionToolCallSerializer(item as OutputItemFunctionToolCall);

    case "function_call_output":
      return outputItemFunctionToolCallOutputSerializer(item as OutputItemFunctionToolCallOutput);

    case "web_search_call":
      return outputItemWebSearchToolCallSerializer(item as OutputItemWebSearchToolCall);

    case "computer_call":
      return outputItemComputerToolCallSerializer(item as OutputItemComputerToolCall);

    case "computer_call_output":
      return outputItemComputerToolCallOutputSerializer(item as OutputItemComputerToolCallOutput);

    case "reasoning":
      return outputItemReasoningItemSerializer(item as OutputItemReasoningItem);

    case "tool_search_call":
      return outputItemToolSearchCallSerializer(item as OutputItemToolSearchCall);

    case "tool_search_output":
      return outputItemToolSearchOutputSerializer(item as OutputItemToolSearchOutput);

    case "compaction":
      return outputItemCompactionBodySerializer(item as OutputItemCompactionBody);

    case "image_generation_call":
      return outputItemImageGenToolCallSerializer(item as OutputItemImageGenToolCall);

    case "code_interpreter_call":
      return outputItemCodeInterpreterToolCallSerializer(item as OutputItemCodeInterpreterToolCall);

    case "local_shell_call":
      return outputItemLocalShellToolCallSerializer(item as OutputItemLocalShellToolCall);

    case "local_shell_call_output":
      return outputItemLocalShellToolCallOutputSerializer(
        item as OutputItemLocalShellToolCallOutput,
      );

    case "shell_call":
      return outputItemFunctionShellCallSerializer(item as OutputItemFunctionShellCall);

    case "shell_call_output":
      return outputItemFunctionShellCallOutputSerializer(item as OutputItemFunctionShellCallOutput);

    case "apply_patch_call":
      return outputItemApplyPatchToolCallSerializer(item as OutputItemApplyPatchToolCall);

    case "apply_patch_call_output":
      return outputItemApplyPatchToolCallOutputSerializer(
        item as OutputItemApplyPatchToolCallOutput,
      );

    case "mcp_call":
      return outputItemMcpToolCallSerializer(item as OutputItemMcpToolCall);

    case "mcp_list_tools":
      return outputItemMcpListToolsSerializer(item as OutputItemMcpListTools);

    case "mcp_approval_request":
      return outputItemMcpApprovalRequestSerializer(item as OutputItemMcpApprovalRequest);

    case "mcp_approval_response":
      return outputItemMcpApprovalResponseResourceSerializer(
        item as OutputItemMcpApprovalResponseResource,
      );

    case "custom_tool_call":
      return outputItemCustomToolCallResourceSerializer(item as OutputItemCustomToolCallResource);

    case "custom_tool_call_output":
      return outputItemCustomToolCallOutputResourceSerializer(
        item as OutputItemCustomToolCallOutputResource,
      );

    default:
      return outputItemSerializer(item);
  }
}

export function outputItemUnionDeserializer(item: any): OutputItemUnion {
  switch (item["type"]) {
    case "structured_outputs":
      return structuredOutputsOutputItemDeserializer(item as StructuredOutputsOutputItem);

    case "workflow_action":
      return workflowActionOutputItemDeserializer(item as WorkflowActionOutputItem);

    case "oauth_consent_request":
      return oAuthConsentRequestOutputItemDeserializer(item as OAuthConsentRequestOutputItem);

    case "memory_search_call":
      return memorySearchToolCallItemResourceDeserializer(item as MemorySearchToolCallItemResource);

    case "bing_grounding_call":
      return bingGroundingToolCallDeserializer(item as BingGroundingToolCall);

    case "bing_grounding_call_output":
      return bingGroundingToolCallOutputDeserializer(item as BingGroundingToolCallOutput);

    case "sharepoint_grounding_preview_call":
      return sharepointGroundingToolCallDeserializer(item as SharepointGroundingToolCall);

    case "sharepoint_grounding_preview_call_output":
      return sharepointGroundingToolCallOutputDeserializer(
        item as SharepointGroundingToolCallOutput,
      );

    case "azure_ai_search_call":
      return azureAISearchToolCallDeserializer(item as AzureAISearchToolCall);

    case "azure_ai_search_call_output":
      return azureAISearchToolCallOutputDeserializer(item as AzureAISearchToolCallOutput);

    case "bing_custom_search_preview_call":
      return bingCustomSearchToolCallDeserializer(item as BingCustomSearchToolCall);

    case "bing_custom_search_preview_call_output":
      return bingCustomSearchToolCallOutputDeserializer(item as BingCustomSearchToolCallOutput);

    case "openapi_call":
      return openApiToolCallDeserializer(item as OpenApiToolCall);

    case "openapi_call_output":
      return openApiToolCallOutputDeserializer(item as OpenApiToolCallOutput);

    case "browser_automation_preview_call":
      return browserAutomationToolCallDeserializer(item as BrowserAutomationToolCall);

    case "browser_automation_preview_call_output":
      return browserAutomationToolCallOutputDeserializer(item as BrowserAutomationToolCallOutput);

    case "fabric_dataagent_preview_call":
      return fabricDataAgentToolCallDeserializer(item as FabricDataAgentToolCall);

    case "fabric_dataagent_preview_call_output":
      return fabricDataAgentToolCallOutputDeserializer(item as FabricDataAgentToolCallOutput);

    case "azure_function_call":
      return azureFunctionToolCallDeserializer(item as AzureFunctionToolCall);

    case "azure_function_call_output":
      return azureFunctionToolCallOutputDeserializer(item as AzureFunctionToolCallOutput);

    case "a2a_preview_call":
      return a2AToolCallDeserializer(item as A2AToolCall);

    case "a2a_preview_call_output":
      return a2AToolCallOutputDeserializer(item as A2AToolCallOutput);

    case "output_message":
      return outputItemOutputMessageDeserializer(item as OutputItemOutputMessage);

    case "file_search_call":
      return outputItemFileSearchToolCallDeserializer(item as OutputItemFileSearchToolCall);

    case "function_call":
      return outputItemFunctionToolCallDeserializer(item as OutputItemFunctionToolCall);

    case "function_call_output":
      return outputItemFunctionToolCallOutputDeserializer(item as OutputItemFunctionToolCallOutput);

    case "web_search_call":
      return outputItemWebSearchToolCallDeserializer(item as OutputItemWebSearchToolCall);

    case "computer_call":
      return outputItemComputerToolCallDeserializer(item as OutputItemComputerToolCall);

    case "computer_call_output":
      return outputItemComputerToolCallOutputDeserializer(item as OutputItemComputerToolCallOutput);

    case "reasoning":
      return outputItemReasoningItemDeserializer(item as OutputItemReasoningItem);

    case "tool_search_call":
      return outputItemToolSearchCallDeserializer(item as OutputItemToolSearchCall);

    case "tool_search_output":
      return outputItemToolSearchOutputDeserializer(item as OutputItemToolSearchOutput);

    case "compaction":
      return outputItemCompactionBodyDeserializer(item as OutputItemCompactionBody);

    case "image_generation_call":
      return outputItemImageGenToolCallDeserializer(item as OutputItemImageGenToolCall);

    case "code_interpreter_call":
      return outputItemCodeInterpreterToolCallDeserializer(
        item as OutputItemCodeInterpreterToolCall,
      );

    case "local_shell_call":
      return outputItemLocalShellToolCallDeserializer(item as OutputItemLocalShellToolCall);

    case "local_shell_call_output":
      return outputItemLocalShellToolCallOutputDeserializer(
        item as OutputItemLocalShellToolCallOutput,
      );

    case "shell_call":
      return outputItemFunctionShellCallDeserializer(item as OutputItemFunctionShellCall);

    case "shell_call_output":
      return outputItemFunctionShellCallOutputDeserializer(
        item as OutputItemFunctionShellCallOutput,
      );

    case "apply_patch_call":
      return outputItemApplyPatchToolCallDeserializer(item as OutputItemApplyPatchToolCall);

    case "apply_patch_call_output":
      return outputItemApplyPatchToolCallOutputDeserializer(
        item as OutputItemApplyPatchToolCallOutput,
      );

    case "mcp_call":
      return outputItemMcpToolCallDeserializer(item as OutputItemMcpToolCall);

    case "mcp_list_tools":
      return outputItemMcpListToolsDeserializer(item as OutputItemMcpListTools);

    case "mcp_approval_request":
      return outputItemMcpApprovalRequestDeserializer(item as OutputItemMcpApprovalRequest);

    case "mcp_approval_response":
      return outputItemMcpApprovalResponseResourceDeserializer(
        item as OutputItemMcpApprovalResponseResource,
      );

    case "custom_tool_call":
      return outputItemCustomToolCallResourceDeserializer(item as OutputItemCustomToolCallResource);

    case "custom_tool_call_output":
      return outputItemCustomToolCallOutputResourceDeserializer(
        item as OutputItemCustomToolCallOutputResource,
      );

    default:
      return outputItemDeserializer(item);
  }
}

/** Type of OutputItemType */
export type OutputItemType =
  | "output_message"
  | "file_search_call"
  | "function_call"
  | "function_call_output"
  | "web_search_call"
  | "computer_call"
  | "computer_call_output"
  | "reasoning"
  | "tool_search_call"
  | "tool_search_output"
  | "compaction"
  | "image_generation_call"
  | "code_interpreter_call"
  | "local_shell_call"
  | "local_shell_call_output"
  | "shell_call"
  | "shell_call_output"
  | "apply_patch_call"
  | "apply_patch_call_output"
  | "mcp_call"
  | "mcp_list_tools"
  | "mcp_approval_request"
  | "mcp_approval_response"
  | "custom_tool_call"
  | "custom_tool_call_output"
  | "structured_outputs"
  | "oauth_consent_request"
  | "memory_search_call"
  | "workflow_action"
  | "a2a_preview_call"
  | "a2a_preview_call_output"
  | "bing_grounding_call"
  | "bing_grounding_call_output"
  | "sharepoint_grounding_preview_call"
  | "sharepoint_grounding_preview_call_output"
  | "azure_ai_search_call"
  | "azure_ai_search_call_output"
  | "bing_custom_search_preview_call"
  | "bing_custom_search_preview_call_output"
  | "openapi_call"
  | "openapi_call_output"
  | "browser_automation_preview_call"
  | "browser_automation_preview_call_output"
  | "fabric_dataagent_preview_call"
  | "fabric_dataagent_preview_call_output"
  | "azure_function_call"
  | "azure_function_call_output";

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

export function agentReferenceDeserializer(item: any): AgentReference {
  return {
    type: item["type"],
    name: item["name"],
    version: item["version"],
  };
}

/** model interface StructuredOutputsOutputItem */
export interface StructuredOutputsOutputItem extends OutputItem {
  type: "structured_outputs";
  /** The structured output captured during the response. */
  output: any;
}

export function structuredOutputsOutputItemSerializer(item: StructuredOutputsOutputItem): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    output: item["output"],
  };
}

export function structuredOutputsOutputItemDeserializer(item: any): StructuredOutputsOutputItem {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    output: item["output"],
  };
}

/** model interface WorkflowActionOutputItem */
export interface WorkflowActionOutputItem extends OutputItem {
  type: "workflow_action";
  /** The kind of CSDL action (e.g., 'SetVariable', 'InvokeAzureAgent'). */
  kind: string;
  /** Unique identifier for the action. */
  action_id: string;
  /** ID of the parent action if this is a nested action. */
  parent_action_id?: string;
  /** ID of the previous action if this action follows another. */
  previous_action_id?: string;
  /** Status of the action (e.g., 'in_progress', 'completed', 'failed', 'cancelled'). */
  status: "completed" | "failed" | "in_progress" | "cancelled";
}

export function workflowActionOutputItemSerializer(item: WorkflowActionOutputItem): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    kind: item["kind"],
    action_id: item["action_id"],
    parent_action_id: item["parent_action_id"],
    previous_action_id: item["previous_action_id"],
    status: item["status"],
  };
}

export function workflowActionOutputItemDeserializer(item: any): WorkflowActionOutputItem {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    kind: item["kind"],
    action_id: item["action_id"],
    parent_action_id: item["parent_action_id"],
    previous_action_id: item["previous_action_id"],
    status: item["status"],
  };
}

/** Request from the service for the user to perform OAuth consent. */
export interface OAuthConsentRequestOutputItem extends OutputItem {
  id: string;
  type: "oauth_consent_request";
  /** The link the user can use to perform OAuth consent. */
  consent_link: string;
  /** The server label for the OAuth consent request. */
  server_label: string;
}

export function oAuthConsentRequestOutputItemSerializer(item: OAuthConsentRequestOutputItem): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    consent_link: item["consent_link"],
    server_label: item["server_label"],
  };
}

export function oAuthConsentRequestOutputItemDeserializer(
  item: any,
): OAuthConsentRequestOutputItem {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    consent_link: item["consent_link"],
    server_label: item["server_label"],
  };
}

/** model interface MemorySearchToolCallItemResource */
export interface MemorySearchToolCallItemResource extends OutputItem {
  type: "memory_search_call";
  /**
   * The status of the memory search tool call. One of `in_progress`,
   * `searching`, `completed`, `incomplete` or `failed`,
   */
  status: "in_progress" | "searching" | "completed" | "incomplete" | "failed";
  /** The results returned from the memory search. */
  results?: MemorySearchItem[];
}

export function memorySearchToolCallItemResourceSerializer(
  item: MemorySearchToolCallItemResource,
): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    status: item["status"],
    results: !item["results"] ? item["results"] : memorySearchItemArraySerializer(item["results"]),
  };
}

export function memorySearchToolCallItemResourceDeserializer(
  item: any,
): MemorySearchToolCallItemResource {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    status: item["status"],
    results: !item["results"]
      ? item["results"]
      : memorySearchItemArrayDeserializer(item["results"]),
  };
}

/** A Bing grounding tool call. */
export interface BingGroundingToolCall extends OutputItem {
  type: "bing_grounding_call";
  /** The unique ID of the tool call generated by the model. */
  call_id: string;
  /** A JSON string of the arguments to pass to the tool. */
  arguments: string;
  /** The status of the tool call. */
  status: ToolCallStatus;
}

export function bingGroundingToolCallSerializer(item: BingGroundingToolCall): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

export function bingGroundingToolCallDeserializer(item: any): BingGroundingToolCall {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

/** The status of a tool call. */
export type ToolCallStatus = "in_progress" | "completed" | "incomplete" | "failed";

/** The output of a Bing grounding tool call. */
export interface BingGroundingToolCallOutput extends OutputItem {
  type: "bing_grounding_call_output";
  /** The unique ID of the tool call generated by the model. */
  call_id: string;
  /** The output from the Bing grounding tool call. */
  output?: ToolCallOutputContent;
  /** The status of the tool call. */
  status: ToolCallStatus;
}

export function bingGroundingToolCallOutputSerializer(item: BingGroundingToolCallOutput): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    output: !item["output"] ? item["output"] : toolCallOutputContentSerializer(item["output"]),
    status: item["status"],
  };
}

export function bingGroundingToolCallOutputDeserializer(item: any): BingGroundingToolCallOutput {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    output: !item["output"] ? item["output"] : toolCallOutputContentDeserializer(item["output"]),
    status: item["status"],
  };
}

/** The output content from a tool call, which can be a dictionary, string, or array. */
export type ToolCallOutputContent = Record<string, any> | string | any[];

export function toolCallOutputContentSerializer(item: ToolCallOutputContent): any {
  return item;
}

export function toolCallOutputContentDeserializer(item: any): ToolCallOutputContent {
  return item;
}

/** A SharePoint grounding tool call. */
export interface SharepointGroundingToolCall extends OutputItem {
  type: "sharepoint_grounding_preview_call";
  /** The unique ID of the tool call generated by the model. */
  call_id: string;
  /** A JSON string of the arguments to pass to the tool. */
  arguments: string;
  /** The status of the tool call. */
  status: ToolCallStatus;
}

export function sharepointGroundingToolCallSerializer(item: SharepointGroundingToolCall): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

export function sharepointGroundingToolCallDeserializer(item: any): SharepointGroundingToolCall {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

/** The output of a SharePoint grounding tool call. */
export interface SharepointGroundingToolCallOutput extends OutputItem {
  type: "sharepoint_grounding_preview_call_output";
  /** The unique ID of the tool call generated by the model. */
  call_id: string;
  /** The output from the SharePoint grounding tool call. */
  output?: ToolCallOutputContent;
  /** The status of the tool call. */
  status: ToolCallStatus;
}

export function sharepointGroundingToolCallOutputSerializer(
  item: SharepointGroundingToolCallOutput,
): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    output: !item["output"] ? item["output"] : toolCallOutputContentSerializer(item["output"]),
    status: item["status"],
  };
}

export function sharepointGroundingToolCallOutputDeserializer(
  item: any,
): SharepointGroundingToolCallOutput {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    output: !item["output"] ? item["output"] : toolCallOutputContentDeserializer(item["output"]),
    status: item["status"],
  };
}

/** An Azure AI Search tool call. */
export interface AzureAISearchToolCall extends OutputItem {
  type: "azure_ai_search_call";
  /** The unique ID of the tool call generated by the model. */
  call_id: string;
  /** A JSON string of the arguments to pass to the tool. */
  arguments: string;
  /** The status of the tool call. */
  status: ToolCallStatus;
}

export function azureAISearchToolCallSerializer(item: AzureAISearchToolCall): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

export function azureAISearchToolCallDeserializer(item: any): AzureAISearchToolCall {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

/** The output of an Azure AI Search tool call. */
export interface AzureAISearchToolCallOutput extends OutputItem {
  type: "azure_ai_search_call_output";
  /** The unique ID of the tool call generated by the model. */
  call_id: string;
  /** The output from the Azure AI Search tool call. */
  output?: ToolCallOutputContent;
  /** The status of the tool call. */
  status: ToolCallStatus;
}

export function azureAISearchToolCallOutputSerializer(item: AzureAISearchToolCallOutput): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    output: !item["output"] ? item["output"] : toolCallOutputContentSerializer(item["output"]),
    status: item["status"],
  };
}

export function azureAISearchToolCallOutputDeserializer(item: any): AzureAISearchToolCallOutput {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    output: !item["output"] ? item["output"] : toolCallOutputContentDeserializer(item["output"]),
    status: item["status"],
  };
}

/** A Bing custom search tool call. */
export interface BingCustomSearchToolCall extends OutputItem {
  type: "bing_custom_search_preview_call";
  /** The unique ID of the tool call generated by the model. */
  call_id: string;
  /** A JSON string of the arguments to pass to the tool. */
  arguments: string;
  /** The status of the tool call. */
  status: ToolCallStatus;
}

export function bingCustomSearchToolCallSerializer(item: BingCustomSearchToolCall): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

export function bingCustomSearchToolCallDeserializer(item: any): BingCustomSearchToolCall {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

/** The output of a Bing custom search tool call. */
export interface BingCustomSearchToolCallOutput extends OutputItem {
  type: "bing_custom_search_preview_call_output";
  /** The unique ID of the tool call generated by the model. */
  call_id: string;
  /** The output from the Bing custom search tool call. */
  output?: ToolCallOutputContent;
  /** The status of the tool call. */
  status: ToolCallStatus;
}

export function bingCustomSearchToolCallOutputSerializer(
  item: BingCustomSearchToolCallOutput,
): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    output: !item["output"] ? item["output"] : toolCallOutputContentSerializer(item["output"]),
    status: item["status"],
  };
}

export function bingCustomSearchToolCallOutputDeserializer(
  item: any,
): BingCustomSearchToolCallOutput {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    output: !item["output"] ? item["output"] : toolCallOutputContentDeserializer(item["output"]),
    status: item["status"],
  };
}

/** An OpenAPI tool call. */
export interface OpenApiToolCall extends OutputItem {
  type: "openapi_call";
  /** The unique ID of the tool call generated by the model. */
  call_id: string;
  /** The name of the OpenAPI operation being called. */
  name: string;
  /** A JSON string of the arguments to pass to the tool. */
  arguments: string;
  /** The status of the tool call. */
  status: ToolCallStatus;
}

export function openApiToolCallSerializer(item: OpenApiToolCall): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    name: item["name"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

export function openApiToolCallDeserializer(item: any): OpenApiToolCall {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    name: item["name"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

/** The output of an OpenAPI tool call. */
export interface OpenApiToolCallOutput extends OutputItem {
  type: "openapi_call_output";
  /** The unique ID of the tool call generated by the model. */
  call_id: string;
  /** The name of the OpenAPI operation that was called. */
  name: string;
  /** The output from the OpenAPI tool call. */
  output?: ToolCallOutputContent;
  /** The status of the tool call. */
  status: ToolCallStatus;
}

export function openApiToolCallOutputSerializer(item: OpenApiToolCallOutput): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    name: item["name"],
    output: !item["output"] ? item["output"] : toolCallOutputContentSerializer(item["output"]),
    status: item["status"],
  };
}

export function openApiToolCallOutputDeserializer(item: any): OpenApiToolCallOutput {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    name: item["name"],
    output: !item["output"] ? item["output"] : toolCallOutputContentDeserializer(item["output"]),
    status: item["status"],
  };
}

/** A browser automation tool call. */
export interface BrowserAutomationToolCall extends OutputItem {
  type: "browser_automation_preview_call";
  /** The unique ID of the tool call generated by the model. */
  call_id: string;
  /** A JSON string of the arguments to pass to the tool. */
  arguments: string;
  /** The status of the tool call. */
  status: ToolCallStatus;
}

export function browserAutomationToolCallSerializer(item: BrowserAutomationToolCall): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

export function browserAutomationToolCallDeserializer(item: any): BrowserAutomationToolCall {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

/** The output of a browser automation tool call. */
export interface BrowserAutomationToolCallOutput extends OutputItem {
  type: "browser_automation_preview_call_output";
  /** The unique ID of the tool call generated by the model. */
  call_id: string;
  /** The output from the browser automation tool call. */
  output?: ToolCallOutputContent;
  /** The status of the tool call. */
  status: ToolCallStatus;
}

export function browserAutomationToolCallOutputSerializer(
  item: BrowserAutomationToolCallOutput,
): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    output: !item["output"] ? item["output"] : toolCallOutputContentSerializer(item["output"]),
    status: item["status"],
  };
}

export function browserAutomationToolCallOutputDeserializer(
  item: any,
): BrowserAutomationToolCallOutput {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    output: !item["output"] ? item["output"] : toolCallOutputContentDeserializer(item["output"]),
    status: item["status"],
  };
}

/** A Fabric data agent tool call. */
export interface FabricDataAgentToolCall extends OutputItem {
  type: "fabric_dataagent_preview_call";
  /** The unique ID of the tool call generated by the model. */
  call_id: string;
  /** A JSON string of the arguments to pass to the tool. */
  arguments: string;
  /** The status of the tool call. */
  status: ToolCallStatus;
}

export function fabricDataAgentToolCallSerializer(item: FabricDataAgentToolCall): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

export function fabricDataAgentToolCallDeserializer(item: any): FabricDataAgentToolCall {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

/** The output of a Fabric data agent tool call. */
export interface FabricDataAgentToolCallOutput extends OutputItem {
  type: "fabric_dataagent_preview_call_output";
  /** The unique ID of the tool call generated by the model. */
  call_id: string;
  /** The output from the Fabric data agent tool call. */
  output?: ToolCallOutputContent;
  /** The status of the tool call. */
  status: ToolCallStatus;
}

export function fabricDataAgentToolCallOutputSerializer(item: FabricDataAgentToolCallOutput): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    output: !item["output"] ? item["output"] : toolCallOutputContentSerializer(item["output"]),
    status: item["status"],
  };
}

export function fabricDataAgentToolCallOutputDeserializer(
  item: any,
): FabricDataAgentToolCallOutput {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    output: !item["output"] ? item["output"] : toolCallOutputContentDeserializer(item["output"]),
    status: item["status"],
  };
}

/** An Azure Function tool call. */
export interface AzureFunctionToolCall extends OutputItem {
  type: "azure_function_call";
  /** The unique ID of the tool call generated by the model. */
  call_id: string;
  /** The name of the Azure Function being called. */
  name: string;
  /** A JSON string of the arguments to pass to the tool. */
  arguments: string;
  /** The status of the tool call. */
  status: ToolCallStatus;
}

export function azureFunctionToolCallSerializer(item: AzureFunctionToolCall): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    name: item["name"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

export function azureFunctionToolCallDeserializer(item: any): AzureFunctionToolCall {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    name: item["name"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

/** The output of an Azure Function tool call. */
export interface AzureFunctionToolCallOutput extends OutputItem {
  type: "azure_function_call_output";
  /** The unique ID of the tool call generated by the model. */
  call_id: string;
  /** The name of the Azure Function that was called. */
  name: string;
  /** The output from the Azure Function tool call. */
  output?: ToolCallOutputContent;
  /** The status of the tool call. */
  status: ToolCallStatus;
}

export function azureFunctionToolCallOutputSerializer(item: AzureFunctionToolCallOutput): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    name: item["name"],
    output: !item["output"] ? item["output"] : toolCallOutputContentSerializer(item["output"]),
    status: item["status"],
  };
}

export function azureFunctionToolCallOutputDeserializer(item: any): AzureFunctionToolCallOutput {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    name: item["name"],
    output: !item["output"] ? item["output"] : toolCallOutputContentDeserializer(item["output"]),
    status: item["status"],
  };
}

/** An A2A (Agent-to-Agent) tool call. */
export interface A2AToolCall extends OutputItem {
  type: "a2a_preview_call";
  /** The unique ID of the tool call generated by the model. */
  call_id: string;
  /** The name of the A2A agent card being called. */
  name: string;
  /** A JSON string of the arguments to pass to the tool. */
  arguments: string;
  /** The status of the tool call. */
  status: ToolCallStatus;
}

export function a2AToolCallSerializer(item: A2AToolCall): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    name: item["name"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

export function a2AToolCallDeserializer(item: any): A2AToolCall {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    name: item["name"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

/** The output of an A2A (Agent-to-Agent) tool call. */
export interface A2AToolCallOutput extends OutputItem {
  type: "a2a_preview_call_output";
  /** The unique ID of the tool call generated by the model. */
  call_id: string;
  /** The name of the A2A agent card that was called. */
  name: string;
  /** The output from the A2A tool call. */
  output?: ToolCallOutputContent;
  /** The status of the tool call. */
  status: ToolCallStatus;
}

export function a2AToolCallOutputSerializer(item: A2AToolCallOutput): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    name: item["name"],
    output: !item["output"] ? item["output"] : toolCallOutputContentSerializer(item["output"]),
    status: item["status"],
  };
}

export function a2AToolCallOutputDeserializer(item: any): A2AToolCallOutput {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    name: item["name"],
    output: !item["output"] ? item["output"] : toolCallOutputContentDeserializer(item["output"]),
    status: item["status"],
  };
}

/** An output message from the model. */
export interface OutputItemOutputMessage extends OutputItem {
  /** The unique ID of the output message. */
  id: string;
  /** The type of the output message. Always `message`. */
  type: "output_message";
  /** The role of the output message. Always `assistant`. */
  role: "assistant";
  /** The content of the output message. */
  content: OutputMessageContentUnion[];
  phase?: MessagePhase;
  /**
   * The status of the message input. One of `in_progress`, `completed`, or
   *   `incomplete`. Populated when input items are returned via API.
   */
  status: "in_progress" | "completed" | "incomplete";
}

export function outputItemOutputMessageSerializer(item: OutputItemOutputMessage): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    role: item["role"],
    content: outputMessageContentUnionArraySerializer(item["content"]),
    phase: item["phase"],
    status: item["status"],
  };
}

export function outputItemOutputMessageDeserializer(item: any): OutputItemOutputMessage {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    role: item["role"],
    content: outputMessageContentUnionArrayDeserializer(item["content"]),
    phase: item["phase"],
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

export function outputMessageContentUnionArrayDeserializer(
  result: Array<OutputMessageContentUnion>,
): any[] {
  return result.map((item) => {
    return outputMessageContentUnionDeserializer(item);
  });
}

/** model interface OutputMessageContent */
export interface OutputMessageContent {
  type: OutputMessageContentType;
}

export function outputMessageContentSerializer(item: OutputMessageContent): any {
  return { type: item["type"] };
}

export function outputMessageContentDeserializer(item: any): OutputMessageContent {
  return {
    type: item["type"],
  };
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

export function outputMessageContentUnionDeserializer(item: any): OutputMessageContentUnion {
  switch (item["type"]) {
    case "output_text":
      return outputMessageContentOutputTextContentDeserializer(
        item as OutputMessageContentOutputTextContent,
      );

    case "refusal":
      return outputMessageContentRefusalContentDeserializer(
        item as OutputMessageContentRefusalContent,
      );

    default:
      return outputMessageContentDeserializer(item);
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
  logprobs: LogProb[];
}

export function outputMessageContentOutputTextContentSerializer(
  item: OutputMessageContentOutputTextContent,
): any {
  return {
    type: item["type"],
    text: item["text"],
    annotations: annotationUnionArraySerializer(item["annotations"]),
    logprobs: logProbArraySerializer(item["logprobs"]),
  };
}

export function outputMessageContentOutputTextContentDeserializer(
  item: any,
): OutputMessageContentOutputTextContent {
  return {
    type: item["type"],
    text: item["text"],
    annotations: annotationUnionArrayDeserializer(item["annotations"]),
    logprobs: logProbArrayDeserializer(item["logprobs"]),
  };
}

export function annotationUnionArraySerializer(result: Array<AnnotationUnion>): any[] {
  return result.map((item) => {
    return annotationUnionSerializer(item);
  });
}

export function annotationUnionArrayDeserializer(result: Array<AnnotationUnion>): any[] {
  return result.map((item) => {
    return annotationUnionDeserializer(item);
  });
}

/** An annotation that applies to a span of output text. */
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

export function annotationUnionDeserializer(item: any): AnnotationUnion {
  switch (item["type"]) {
    case "file_citation":
      return fileCitationBodyDeserializer(item as FileCitationBody);

    case "url_citation":
      return urlCitationBodyDeserializer(item as UrlCitationBody);

    case "container_file_citation":
      return containerFileCitationBodyDeserializer(item as ContainerFileCitationBody);

    case "file_path":
      return filePathDeserializer(item as FilePath);

    default:
      return annotationDeserializer(item);
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

export function fileCitationBodyDeserializer(item: any): FileCitationBody {
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

export function urlCitationBodyDeserializer(item: any): UrlCitationBody {
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

export function containerFileCitationBodyDeserializer(item: any): ContainerFileCitationBody {
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

export function filePathDeserializer(item: any): FilePath {
  return {
    type: item["type"],
    file_id: item["file_id"],
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

export function logProbDeserializer(item: any): LogProb {
  return {
    token: item["token"],
    logprob: item["logprob"],
    bytes: item["bytes"].map((p: any) => {
      return p;
    }),
    top_logprobs: topLogProbArrayDeserializer(item["top_logprobs"]),
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

export function outputMessageContentRefusalContentDeserializer(
  item: any,
): OutputMessageContentRefusalContent {
  return {
    type: item["type"],
    refusal: item["refusal"],
  };
}

/**
 * Labels an `assistant` message as intermediate commentary (`commentary`) or the final answer (`final_answer`).
 * For models like `gpt-5.3-codex` and beyond, when sending follow-up requests, preserve and resend
 * phase on all assistant messages — dropping it can degrade performance. Not used for user messages.
 */
export type MessagePhase = "commentary" | "final_answer";

/**
 * The results of a file search tool call. See the
 * [file search guide](/docs/guides/tools-file-search) for more information.
 */
export interface OutputItemFileSearchToolCall extends OutputItem {
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

export function outputItemFileSearchToolCallSerializer(item: OutputItemFileSearchToolCall): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
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

export function outputItemFileSearchToolCallDeserializer(item: any): OutputItemFileSearchToolCall {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    status: item["status"],
    queries: item["queries"].map((p: any) => {
      return p;
    }),
    results: !item["results"]
      ? item["results"]
      : fileSearchToolCallResultsArrayDeserializer(item["results"]),
  };
}

export function fileSearchToolCallResultsArraySerializer(
  result: Array<FileSearchToolCallResults>,
): any[] {
  return result.map((item) => {
    return fileSearchToolCallResultsSerializer(item);
  });
}

export function fileSearchToolCallResultsArrayDeserializer(
  result: Array<FileSearchToolCallResults>,
): any[] {
  return result.map((item) => {
    return fileSearchToolCallResultsDeserializer(item);
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

export function fileSearchToolCallResultsDeserializer(item: any): FileSearchToolCallResults {
  return {
    file_id: item["file_id"],
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
  additionalProperties?: Record<string, string | number | boolean>;
}

export function vectorStoreFileAttributesSerializer(item: VectorStoreFileAttributes): any {
  return {
    ...serializeRecord(
      item.additionalProperties ?? {},
      undefined,
      _fileSearchToolCallResultsAttributesAdditionalPropertySerializer,
    ),
  };
}

export function vectorStoreFileAttributesDeserializer(item: any): VectorStoreFileAttributes {
  return {
    additionalProperties: serializeRecord(
      item,
      [],
      _fileSearchToolCallResultsAttributesAdditionalPropertyDeserializer,
    ),
  };
}

/** Alias for _FileSearchToolCallResultsAttributesAdditionalProperty */
export type _FileSearchToolCallResultsAttributesAdditionalProperty = string | number | boolean;

export function _fileSearchToolCallResultsAttributesAdditionalPropertySerializer(
  item: _FileSearchToolCallResultsAttributesAdditionalProperty,
): any {
  return item;
}

export function _fileSearchToolCallResultsAttributesAdditionalPropertyDeserializer(
  item: any,
): _FileSearchToolCallResultsAttributesAdditionalProperty {
  return item;
}

/**
 * A tool call to run a function. See the
 * [function calling guide](/docs/guides/function-calling) for more information.
 */
export interface OutputItemFunctionToolCall extends OutputItem {
  /** The unique ID of the function tool call. */
  readonly id: string;
  /** The type of the function tool call. Always `function_call`. */
  type: "function_call";
  /** The unique ID of the function tool call generated by the model. */
  call_id: string;
  /** The namespace of the function to run. */
  namespace?: string;
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

export function outputItemFunctionToolCallSerializer(item: OutputItemFunctionToolCall): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    namespace: item["namespace"],
    name: item["name"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

export function outputItemFunctionToolCallDeserializer(item: any): OutputItemFunctionToolCall {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    namespace: item["namespace"],
    name: item["name"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

/** The output of a function tool call. */
export interface OutputItemFunctionToolCallOutput extends OutputItem {
  /**
   * The unique ID of the function tool call output. Populated when this item
   *   is returned via API.
   */
  readonly id: string;
  /** The type of the function tool call output. Always `function_call_output`. */
  type: "function_call_output";
  /** The unique ID of the function tool call generated by the model. */
  call_id: string;
  /**
   * The output from the function call generated by your code.
   *   Can be a string or an list of output content.
   */
  output: string | FunctionAndCustomToolCallOutputUnion[];
  /**
   * The status of the item. One of `in_progress`, `completed`, or
   *   `incomplete`. Populated when items are returned via API.
   */
  status?: "in_progress" | "completed" | "incomplete";
}

export function outputItemFunctionToolCallOutputSerializer(
  item: OutputItemFunctionToolCallOutput,
): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    output: _outputItemFunctionToolCallOutputOutputSerializer(item["output"]),
    status: item["status"],
  };
}

export function outputItemFunctionToolCallOutputDeserializer(
  item: any,
): OutputItemFunctionToolCallOutput {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    output: _outputItemFunctionToolCallOutputOutputDeserializer(item["output"]),
    status: item["status"],
  };
}

/** Alias for _OutputItemFunctionToolCallOutputOutput */
export type _OutputItemFunctionToolCallOutputOutput =
  | string
  | FunctionAndCustomToolCallOutputUnion[];

export function _outputItemFunctionToolCallOutputOutputSerializer(
  item: _OutputItemFunctionToolCallOutputOutput,
): any {
  return item;
}

export function _outputItemFunctionToolCallOutputOutputDeserializer(
  item: any,
): _OutputItemFunctionToolCallOutputOutput {
  return item;
}

export function functionAndCustomToolCallOutputUnionArraySerializer(
  result: Array<FunctionAndCustomToolCallOutputUnion>,
): any[] {
  return result.map((item) => {
    return functionAndCustomToolCallOutputUnionSerializer(item);
  });
}

export function functionAndCustomToolCallOutputUnionArrayDeserializer(
  result: Array<FunctionAndCustomToolCallOutputUnion>,
): any[] {
  return result.map((item) => {
    return functionAndCustomToolCallOutputUnionDeserializer(item);
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

export function functionAndCustomToolCallOutputDeserializer(
  item: any,
): FunctionAndCustomToolCallOutput {
  return {
    type: item["type"],
  };
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

export function functionAndCustomToolCallOutputUnionDeserializer(
  item: any,
): FunctionAndCustomToolCallOutputUnion {
  switch (item["type"]) {
    case "input_text":
      return functionAndCustomToolCallOutputInputTextContentDeserializer(
        item as FunctionAndCustomToolCallOutputInputTextContent,
      );

    case "input_image":
      return functionAndCustomToolCallOutputInputImageContentDeserializer(
        item as FunctionAndCustomToolCallOutputInputImageContent,
      );

    case "input_file":
      return functionAndCustomToolCallOutputInputFileContentDeserializer(
        item as FunctionAndCustomToolCallOutputInputFileContent,
      );

    default:
      return functionAndCustomToolCallOutputDeserializer(item);
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

export function functionAndCustomToolCallOutputInputTextContentDeserializer(
  item: any,
): FunctionAndCustomToolCallOutputInputTextContent {
  return {
    type: item["type"],
    text: item["text"],
  };
}

/** An image input to the model. Learn about [image inputs](/docs/guides/vision). */
export interface FunctionAndCustomToolCallOutputInputImageContent extends FunctionAndCustomToolCallOutput {
  /** The type of the input item. Always `input_image`. */
  type: "input_image";
  image_url?: string;
  file_id?: string;
  /** The detail level of the image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`. */
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

export function functionAndCustomToolCallOutputInputImageContentDeserializer(
  item: any,
): FunctionAndCustomToolCallOutputInputImageContent {
  return {
    type: item["type"],
    image_url: item["image_url"],
    file_id: item["file_id"],
    detail: item["detail"],
  };
}

/** Type of ImageDetail */
export type ImageDetail = "low" | "high" | "auto" | "original";

/** A file input to the model. */
export interface FunctionAndCustomToolCallOutputInputFileContent extends FunctionAndCustomToolCallOutput {
  /** The type of the input item. Always `input_file`. */
  type: "input_file";
  file_id?: string;
  /** The name of the file to be sent to the model. */
  filename?: string;
  /** The content of the file to be sent to the model. */
  file_data?: string;
  /** The URL of the file to be sent to the model. */
  file_url?: string;
  /** The detail level of the file to be sent to the model. Use `low` for the default rendering behavior, or `high` to render the file at higher quality. Defaults to `low`. */
  detail?: FileInputDetail;
}

export function functionAndCustomToolCallOutputInputFileContentSerializer(
  item: FunctionAndCustomToolCallOutputInputFileContent,
): any {
  return {
    type: item["type"],
    file_id: item["file_id"],
    filename: item["filename"],
    file_data: item["file_data"],
    file_url: item["file_url"],
    detail: item["detail"],
  };
}

export function functionAndCustomToolCallOutputInputFileContentDeserializer(
  item: any,
): FunctionAndCustomToolCallOutputInputFileContent {
  return {
    type: item["type"],
    file_id: item["file_id"],
    filename: item["filename"],
    file_data: item["file_data"],
    file_url: item["file_url"],
    detail: item["detail"],
  };
}

/** Type of FileInputDetail */
export type FileInputDetail = "low" | "high";

/**
 * The results of a web search tool call. See the
 * [web search guide](/docs/guides/tools-web-search) for more information.
 */
export interface OutputItemWebSearchToolCall extends OutputItem {
  /** The unique ID of the web search tool call. */
  id: string;
  /** The type of the web search tool call. Always `web_search_call`. */
  type: "web_search_call";
  /** The status of the web search tool call. */
  status: "in_progress" | "searching" | "completed" | "failed";
  /**
   * An object describing the specific action taken in this web search call.
   *   Includes details on how the model used the web (search, open_page, find_in_page).
   */
  action: WebSearchActionSearch | WebSearchActionOpenPage | WebSearchActionFind;
}

export function outputItemWebSearchToolCallSerializer(item: OutputItemWebSearchToolCall): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    status: item["status"],
    action: _outputItemWebSearchToolCallActionSerializer(item["action"]),
  };
}

export function outputItemWebSearchToolCallDeserializer(item: any): OutputItemWebSearchToolCall {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    status: item["status"],
    action: _outputItemWebSearchToolCallActionDeserializer(item["action"]),
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

export function _outputItemWebSearchToolCallActionDeserializer(
  item: any,
): _OutputItemWebSearchToolCallAction {
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

export function webSearchActionSearchDeserializer(item: any): WebSearchActionSearch {
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
      : webSearchActionSearchSourcesArrayDeserializer(item["sources"]),
  };
}

export function webSearchActionSearchSourcesArraySerializer(
  result: Array<WebSearchActionSearchSources>,
): any[] {
  return result.map((item) => {
    return webSearchActionSearchSourcesSerializer(item);
  });
}

export function webSearchActionSearchSourcesArrayDeserializer(
  result: Array<WebSearchActionSearchSources>,
): any[] {
  return result.map((item) => {
    return webSearchActionSearchSourcesDeserializer(item);
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

export function webSearchActionSearchSourcesDeserializer(item: any): WebSearchActionSearchSources {
  return {
    type: item["type"],
    url: item["url"],
  };
}

/** Action type "open_page" - Opens a specific URL from search results. */
export interface WebSearchActionOpenPage {
  /** The action type. */
  type: "open_page";
  /** The URL opened by the model. */
  url?: string;
}

export function webSearchActionOpenPageSerializer(item: WebSearchActionOpenPage): any {
  return { type: item["type"], url: item["url"] };
}

export function webSearchActionOpenPageDeserializer(item: any): WebSearchActionOpenPage {
  return {
    type: item["type"],
    url: item["url"],
  };
}

/** Action type "find_in_page": Searches for a pattern within a loaded page. */
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

export function webSearchActionFindDeserializer(item: any): WebSearchActionFind {
  return {
    type: item["type"],
    url: item["url"],
    pattern: item["pattern"],
  };
}

/**
 * A tool call to a computer use tool. See the
 * [computer use guide](/docs/guides/tools-computer-use) for more information.
 */
export interface OutputItemComputerToolCall extends OutputItem {
  /** The type of the computer call. Always `computer_call`. */
  type: "computer_call";
  /** The unique ID of the computer call. */
  id: string;
  /** An identifier used when responding to the tool call with output. */
  call_id: string;
  action?: ComputerActionUnion;
  actions?: ComputerActionUnion[];
  /** The pending safety checks for the computer call. */
  pending_safety_checks: ComputerCallSafetyCheckParam[];
  /**
   * The status of the item. One of `in_progress`, `completed`, or
   *   `incomplete`. Populated when items are returned via API.
   */
  status: "in_progress" | "completed" | "incomplete";
}

export function outputItemComputerToolCallSerializer(item: OutputItemComputerToolCall): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    action: !item["action"] ? item["action"] : computerActionUnionSerializer(item["action"]),
    actions: !item["actions"]
      ? item["actions"]
      : computerActionUnionArraySerializer(item["actions"]),
    pending_safety_checks: computerCallSafetyCheckParamArraySerializer(
      item["pending_safety_checks"],
    ),
    status: item["status"],
  };
}

export function outputItemComputerToolCallDeserializer(item: any): OutputItemComputerToolCall {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    action: !item["action"] ? item["action"] : computerActionUnionDeserializer(item["action"]),
    actions: !item["actions"]
      ? item["actions"]
      : computerActionUnionArrayDeserializer(item["actions"]),
    pending_safety_checks: computerCallSafetyCheckParamArrayDeserializer(
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

export function computerActionDeserializer(item: any): ComputerAction {
  return {
    type: item["type"],
  };
}

/** Alias for ComputerActionUnion */
export type ComputerActionUnion =
  | ClickParam
  | DoubleClickAction
  | DragParam
  | KeyPressAction
  | MoveParam
  | ScreenshotParam
  | ScrollParam
  | TypeParam
  | WaitParam
  | ComputerAction;

export function computerActionUnionSerializer(item: ComputerActionUnion): any {
  switch (item.type) {
    case "click":
      return clickParamSerializer(item as ClickParam);

    case "double_click":
      return doubleClickActionSerializer(item as DoubleClickAction);

    case "drag":
      return dragParamSerializer(item as DragParam);

    case "keypress":
      return keyPressActionSerializer(item as KeyPressAction);

    case "move":
      return moveParamSerializer(item as MoveParam);

    case "screenshot":
      return screenshotParamSerializer(item as ScreenshotParam);

    case "scroll":
      return scrollParamSerializer(item as ScrollParam);

    case "type":
      return typeParamSerializer(item as TypeParam);

    case "wait":
      return waitParamSerializer(item as WaitParam);

    default:
      return computerActionSerializer(item);
  }
}

export function computerActionUnionDeserializer(item: any): ComputerActionUnion {
  switch (item["type"]) {
    case "click":
      return clickParamDeserializer(item as ClickParam);

    case "double_click":
      return doubleClickActionDeserializer(item as DoubleClickAction);

    case "drag":
      return dragParamDeserializer(item as DragParam);

    case "keypress":
      return keyPressActionDeserializer(item as KeyPressAction);

    case "move":
      return moveParamDeserializer(item as MoveParam);

    case "screenshot":
      return screenshotParamDeserializer(item as ScreenshotParam);

    case "scroll":
      return scrollParamDeserializer(item as ScrollParam);

    case "type":
      return typeParamDeserializer(item as TypeParam);

    case "wait":
      return waitParamDeserializer(item as WaitParam);

    default:
      return computerActionDeserializer(item);
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
  keys?: string[];
}

export function clickParamSerializer(item: ClickParam): any {
  return {
    type: item["type"],
    button: item["button"],
    x: item["x"],
    y: item["y"],
    keys: !item["keys"]
      ? item["keys"]
      : item["keys"].map((p: any) => {
          return p;
        }),
  };
}

export function clickParamDeserializer(item: any): ClickParam {
  return {
    type: item["type"],
    button: item["button"],
    x: item["x"],
    y: item["y"],
    keys: !item["keys"]
      ? item["keys"]
      : item["keys"].map((p1: any) => {
          return p1;
        }),
  };
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
  keys: string[] | null;
}

export function doubleClickActionSerializer(item: DoubleClickAction): any {
  return {
    type: item["type"],
    x: item["x"],
    y: item["y"],
    keys: !item["keys"]
      ? item["keys"]
      : item["keys"].map((p: any) => {
          return p;
        }),
  };
}

export function doubleClickActionDeserializer(item: any): DoubleClickAction {
  return {
    type: item["type"],
    x: item["x"],
    y: item["y"],
    keys: !item["keys"]
      ? item["keys"]
      : item["keys"].map((p1: any) => {
          return p1;
        }),
  };
}

/** A drag action. */
export interface DragParam extends ComputerAction {
  /** Specifies the event type. For a drag action, this property is always set to `drag`. */
  type: "drag";
  /**
   * An array of coordinates representing the path of the drag action. Coordinates will appear as an array of objects, eg
   *   ```
   *   [
   *     { x: 100, y: 200 },
   *     { x: 200, y: 300 }
   *   ]
   *   ```
   */
  path: CoordParam[];
  keys?: string[];
}

export function dragParamSerializer(item: DragParam): any {
  return {
    type: item["type"],
    path: coordParamArraySerializer(item["path"]),
    keys: !item["keys"]
      ? item["keys"]
      : item["keys"].map((p: any) => {
          return p;
        }),
  };
}

export function dragParamDeserializer(item: any): DragParam {
  return {
    type: item["type"],
    path: coordParamArrayDeserializer(item["path"]),
    keys: !item["keys"]
      ? item["keys"]
      : item["keys"].map((p1: any) => {
          return p1;
        }),
  };
}

export function coordParamArraySerializer(result: Array<CoordParam>): any[] {
  return result.map((item) => {
    return coordParamSerializer(item);
  });
}

export function coordParamArrayDeserializer(result: Array<CoordParam>): any[] {
  return result.map((item) => {
    return coordParamDeserializer(item);
  });
}

/** An x/y coordinate pair, e.g. `{ x: 100, y: 200 }`. */
export interface CoordParam {
  /** The x-coordinate. */
  x: number;
  /** The y-coordinate. */
  y: number;
}

export function coordParamSerializer(item: CoordParam): any {
  return { x: item["x"], y: item["y"] };
}

export function coordParamDeserializer(item: any): CoordParam {
  return {
    x: item["x"],
    y: item["y"],
  };
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

export function keyPressActionDeserializer(item: any): KeyPressAction {
  return {
    type: item["type"],
    keys: item["keys"].map((p: any) => {
      return p;
    }),
  };
}

/** A mouse move action. */
export interface MoveParam extends ComputerAction {
  /** Specifies the event type. For a move action, this property is always set to `move`. */
  type: "move";
  /** The x-coordinate to move to. */
  x: number;
  /** The y-coordinate to move to. */
  y: number;
  keys?: string[];
}

export function moveParamSerializer(item: MoveParam): any {
  return {
    type: item["type"],
    x: item["x"],
    y: item["y"],
    keys: !item["keys"]
      ? item["keys"]
      : item["keys"].map((p: any) => {
          return p;
        }),
  };
}

export function moveParamDeserializer(item: any): MoveParam {
  return {
    type: item["type"],
    x: item["x"],
    y: item["y"],
    keys: !item["keys"]
      ? item["keys"]
      : item["keys"].map((p1: any) => {
          return p1;
        }),
  };
}

/** A screenshot action. */
export interface ScreenshotParam extends ComputerAction {
  /** Specifies the event type. For a screenshot action, this property is always set to `screenshot`. */
  type: "screenshot";
}

export function screenshotParamSerializer(item: ScreenshotParam): any {
  return { type: item["type"] };
}

export function screenshotParamDeserializer(item: any): ScreenshotParam {
  return {
    type: item["type"],
  };
}

/** A scroll action. */
export interface ScrollParam extends ComputerAction {
  /** Specifies the event type. For a scroll action, this property is always set to `scroll`. */
  type: "scroll";
  /** The x-coordinate where the scroll occurred. */
  x: number;
  /** The y-coordinate where the scroll occurred. */
  y: number;
  /** The horizontal scroll distance. */
  scroll_x: number;
  /** The vertical scroll distance. */
  scroll_y: number;
  keys?: string[];
}

export function scrollParamSerializer(item: ScrollParam): any {
  return {
    type: item["type"],
    x: item["x"],
    y: item["y"],
    scroll_x: item["scroll_x"],
    scroll_y: item["scroll_y"],
    keys: !item["keys"]
      ? item["keys"]
      : item["keys"].map((p: any) => {
          return p;
        }),
  };
}

export function scrollParamDeserializer(item: any): ScrollParam {
  return {
    type: item["type"],
    x: item["x"],
    y: item["y"],
    scroll_x: item["scroll_x"],
    scroll_y: item["scroll_y"],
    keys: !item["keys"]
      ? item["keys"]
      : item["keys"].map((p1: any) => {
          return p1;
        }),
  };
}

/** An action to type in text. */
export interface TypeParam extends ComputerAction {
  /** Specifies the event type. For a type action, this property is always set to `type`. */
  type: "type";
  /** The text to type. */
  text: string;
}

export function typeParamSerializer(item: TypeParam): any {
  return { type: item["type"], text: item["text"] };
}

export function typeParamDeserializer(item: any): TypeParam {
  return {
    type: item["type"],
    text: item["text"],
  };
}

/** A wait action. */
export interface WaitParam extends ComputerAction {
  /** Specifies the event type. For a wait action, this property is always set to `wait`. */
  type: "wait";
}

export function waitParamSerializer(item: WaitParam): any {
  return { type: item["type"] };
}

export function waitParamDeserializer(item: any): WaitParam {
  return {
    type: item["type"],
  };
}

export function computerActionUnionArraySerializer(result: Array<ComputerActionUnion>): any[] {
  return result.map((item) => {
    return computerActionUnionSerializer(item);
  });
}

export function computerActionUnionArrayDeserializer(result: Array<ComputerActionUnion>): any[] {
  return result.map((item) => {
    return computerActionUnionDeserializer(item);
  });
}

export function computerCallSafetyCheckParamArraySerializer(
  result: Array<ComputerCallSafetyCheckParam>,
): any[] {
  return result.map((item) => {
    return computerCallSafetyCheckParamSerializer(item);
  });
}

export function computerCallSafetyCheckParamArrayDeserializer(
  result: Array<ComputerCallSafetyCheckParam>,
): any[] {
  return result.map((item) => {
    return computerCallSafetyCheckParamDeserializer(item);
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

export function computerCallSafetyCheckParamDeserializer(item: any): ComputerCallSafetyCheckParam {
  return {
    id: item["id"],
    code: item["code"],
    message: item["message"],
  };
}

/** The output of a computer tool call. */
export interface OutputItemComputerToolCallOutput extends OutputItem {
  /** The type of the computer tool call output. Always `computer_call_output`. */
  type: "computer_call_output";
  /** The ID of the computer tool call output. */
  readonly id: string;
  /** The ID of the computer tool call that produced the output. */
  call_id: string;
  /**
   * The safety checks reported by the API that have been acknowledged by the
   *   developer.
   */
  acknowledged_safety_checks?: ComputerCallSafetyCheckParam[];
  output: ComputerScreenshotImage;
  /**
   * The status of the message input. One of `in_progress`, `completed`, or
   *   `incomplete`. Populated when input items are returned via API.
   */
  status?: "in_progress" | "completed" | "incomplete";
}

export function outputItemComputerToolCallOutputSerializer(
  item: OutputItemComputerToolCallOutput,
): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    call_id: item["call_id"],
    acknowledged_safety_checks: !item["acknowledged_safety_checks"]
      ? item["acknowledged_safety_checks"]
      : computerCallSafetyCheckParamArraySerializer(item["acknowledged_safety_checks"]),
    output: computerScreenshotImageSerializer(item["output"]),
    status: item["status"],
  };
}

export function outputItemComputerToolCallOutputDeserializer(
  item: any,
): OutputItemComputerToolCallOutput {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    acknowledged_safety_checks: !item["acknowledged_safety_checks"]
      ? item["acknowledged_safety_checks"]
      : computerCallSafetyCheckParamArrayDeserializer(item["acknowledged_safety_checks"]),
    output: computerScreenshotImageDeserializer(item["output"]),
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

export function computerScreenshotImageDeserializer(item: any): ComputerScreenshotImage {
  return {
    type: item["type"],
    image_url: item["image_url"],
    file_id: item["file_id"],
  };
}

/**
 * A description of the chain of thought used by a reasoning model while generating
 * a response. Be sure to include these items in your `input` to the Responses API
 * for subsequent turns of a conversation if you are manually
 * [managing context](/docs/guides/conversation-state).
 */
export interface OutputItemReasoningItem extends OutputItem {
  /** The type of the object. Always `reasoning`. */
  type: "reasoning";
  /** The unique identifier of the reasoning content. */
  id: string;
  encrypted_content?: string;
  /** Reasoning summary content. */
  summary: SummaryTextContent[];
  /** Reasoning text content. */
  content?: ReasoningTextContent[];
  /**
   * The status of the item. One of `in_progress`, `completed`, or
   *   `incomplete`. Populated when items are returned via API.
   */
  status?: "in_progress" | "completed" | "incomplete";
}

export function outputItemReasoningItemSerializer(item: OutputItemReasoningItem): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    encrypted_content: item["encrypted_content"],
    summary: summaryTextContentArraySerializer(item["summary"]),
    content: !item["content"]
      ? item["content"]
      : reasoningTextContentArraySerializer(item["content"]),
    status: item["status"],
  };
}

export function outputItemReasoningItemDeserializer(item: any): OutputItemReasoningItem {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    encrypted_content: item["encrypted_content"],
    summary: summaryTextContentArrayDeserializer(item["summary"]),
    content: !item["content"]
      ? item["content"]
      : reasoningTextContentArrayDeserializer(item["content"]),
    status: item["status"],
  };
}

export function summaryTextContentArraySerializer(result: Array<SummaryTextContent>): any[] {
  return result.map((item) => {
    return summaryTextContentSerializer(item);
  });
}

export function summaryTextContentArrayDeserializer(result: Array<SummaryTextContent>): any[] {
  return result.map((item) => {
    return summaryTextContentDeserializer(item);
  });
}

/** A summary text from the model. */
export interface SummaryTextContent extends MessageContent {
  /** The type of the object. Always `summary_text`. */
  type: "summary_text";
  /** A summary of the reasoning output from the model so far. */
  text: string;
}

export function summaryTextContentSerializer(item: SummaryTextContent): any {
  return { type: item["type"], text: item["text"] };
}

export function summaryTextContentDeserializer(item: any): SummaryTextContent {
  return {
    type: item["type"],
    text: item["text"],
  };
}

export function reasoningTextContentArraySerializer(result: Array<ReasoningTextContent>): any[] {
  return result.map((item) => {
    return reasoningTextContentSerializer(item);
  });
}

export function reasoningTextContentArrayDeserializer(result: Array<ReasoningTextContent>): any[] {
  return result.map((item) => {
    return reasoningTextContentDeserializer(item);
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

export function reasoningTextContentDeserializer(item: any): ReasoningTextContent {
  return {
    type: item["type"],
    text: item["text"],
  };
}

/** model interface OutputItemToolSearchCall */
export interface OutputItemToolSearchCall extends OutputItem {
  /** The type of the item. Always `tool_search_call`. */
  type: "tool_search_call";
  /** The unique ID of the tool search call item. */
  id: string;
  call_id: string | null;
  /** Whether tool search was executed by the server or by the client. */
  execution: ToolSearchExecutionType;
  /** Arguments used for the tool search call. */
  arguments: any;
  /** The status of the tool search call item that was recorded. */
  status: FunctionCallStatus;
  /** The identifier of the actor that created the item. */
  created_by?: string;
}

export function outputItemToolSearchCallSerializer(item: OutputItemToolSearchCall): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    execution: item["execution"],
    arguments: item["arguments"],
    status: item["status"],
    created_by: item["created_by"],
  };
}

export function outputItemToolSearchCallDeserializer(item: any): OutputItemToolSearchCall {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    execution: item["execution"],
    arguments: item["arguments"],
    status: item["status"],
    created_by: item["created_by"],
  };
}

/** Type of FunctionCallStatus */
export type FunctionCallStatus = "in_progress" | "completed" | "incomplete";

/** model interface OutputItemToolSearchOutput */
export interface OutputItemToolSearchOutput extends OutputItem {
  /** The type of the item. Always `tool_search_output`. */
  type: "tool_search_output";
  /** The unique ID of the tool search output item. */
  id: string;
  call_id: string | null;
  /** Whether tool search was executed by the server or by the client. */
  execution: ToolSearchExecutionType;
  /** The loaded tool definitions returned by tool search. */
  tools: ToolUnion[];
  /** The status of the tool search output item that was recorded. */
  status: FunctionCallOutputStatusEnum;
  /** The identifier of the actor that created the item. */
  created_by?: string;
}

export function outputItemToolSearchOutputSerializer(item: OutputItemToolSearchOutput): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    execution: item["execution"],
    tools: toolUnionArraySerializer(item["tools"]),
    status: item["status"],
    created_by: item["created_by"],
  };
}

export function outputItemToolSearchOutputDeserializer(item: any): OutputItemToolSearchOutput {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    execution: item["execution"],
    tools: toolUnionArrayDeserializer(item["tools"]),
    status: item["status"],
    created_by: item["created_by"],
  };
}

/** Type of FunctionCallOutputStatusEnum */
export type FunctionCallOutputStatusEnum = "in_progress" | "completed" | "incomplete";

/** A compaction item generated by the [`v1/responses/compact` API](/docs/api-reference/responses/compact). */
export interface OutputItemCompactionBody extends OutputItem {
  /** The type of the item. Always `compaction`. */
  type: "compaction";
  /** The unique ID of the compaction item. */
  id: string;
  /** The encrypted content that was produced by compaction. */
  encrypted_content: string;
  /** The identifier of the actor that created the item. */
  created_by?: string;
}

export function outputItemCompactionBodySerializer(item: OutputItemCompactionBody): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    encrypted_content: item["encrypted_content"],
    created_by: item["created_by"],
  };
}

export function outputItemCompactionBodyDeserializer(item: any): OutputItemCompactionBody {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    encrypted_content: item["encrypted_content"],
    created_by: item["created_by"],
  };
}

/** An image generation request made by the model. */
export interface OutputItemImageGenToolCall extends OutputItem {
  /** The type of the image generation call. Always `image_generation_call`. */
  type: "image_generation_call";
  /** The unique ID of the image generation call. */
  id: string;
  /** The status of the image generation call. */
  status: "in_progress" | "completed" | "generating" | "failed";
  result: string | null;
}

export function outputItemImageGenToolCallSerializer(item: OutputItemImageGenToolCall): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    status: item["status"],
    result: item["result"],
  };
}

export function outputItemImageGenToolCallDeserializer(item: any): OutputItemImageGenToolCall {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    status: item["status"],
    result: item["result"],
  };
}

/** A tool call to run code. */
export interface OutputItemCodeInterpreterToolCall extends OutputItem {
  /** The type of the code interpreter tool call. Always `code_interpreter_call`. */
  type: "code_interpreter_call";
  /** The unique ID of the code interpreter tool call. */
  id: string;
  /** The status of the code interpreter tool call. Valid values are `in_progress`, `completed`, `incomplete`, `interpreting`, and `failed`. */
  status: "in_progress" | "completed" | "incomplete" | "interpreting" | "failed";
  /** The ID of the container used to run the code. */
  container_id: string;
  code: string | null;
  outputs: (CodeInterpreterOutputLogs | CodeInterpreterOutputImage)[] | null;
}

export function outputItemCodeInterpreterToolCallSerializer(
  item: OutputItemCodeInterpreterToolCall,
): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    status: item["status"],
    container_id: item["container_id"],
    code: item["code"],
    outputs: !item["outputs"]
      ? item["outputs"]
      : _outputItemCodeInterpreterToolCallOutputArraySerializer(item["outputs"]),
  };
}

export function outputItemCodeInterpreterToolCallDeserializer(
  item: any,
): OutputItemCodeInterpreterToolCall {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    status: item["status"],
    container_id: item["container_id"],
    code: item["code"],
    outputs: !item["outputs"]
      ? item["outputs"]
      : _outputItemCodeInterpreterToolCallOutputArrayDeserializer(item["outputs"]),
  };
}

export function _outputItemCodeInterpreterToolCallOutputArraySerializer(
  result: Array<_OutputItemCodeInterpreterToolCallOutput>,
): any[] {
  return result.map((item) => {
    return _outputItemCodeInterpreterToolCallOutputSerializer(item);
  });
}

export function _outputItemCodeInterpreterToolCallOutputArrayDeserializer(
  result: Array<_OutputItemCodeInterpreterToolCallOutput>,
): any[] {
  return result.map((item) => {
    return _outputItemCodeInterpreterToolCallOutputDeserializer(item);
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

export function _outputItemCodeInterpreterToolCallOutputDeserializer(
  item: any,
): _OutputItemCodeInterpreterToolCallOutput {
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

export function codeInterpreterOutputLogsDeserializer(item: any): CodeInterpreterOutputLogs {
  return {
    type: item["type"],
    logs: item["logs"],
  };
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

export function codeInterpreterOutputImageDeserializer(item: any): CodeInterpreterOutputImage {
  return {
    type: item["type"],
    url: item["url"],
  };
}

/** A tool call to run a command on the local shell. */
export interface OutputItemLocalShellToolCall extends OutputItem {
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

export function outputItemLocalShellToolCallSerializer(item: OutputItemLocalShellToolCall): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    action: localShellExecActionSerializer(item["action"]),
    status: item["status"],
  };
}

export function outputItemLocalShellToolCallDeserializer(item: any): OutputItemLocalShellToolCall {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    action: localShellExecActionDeserializer(item["action"]),
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

export function localShellExecActionDeserializer(item: any): LocalShellExecAction {
  return {
    type: item["type"],
    command: item["command"].map((p: any) => {
      return p;
    }),
    timeout_ms: item["timeout_ms"],
    working_directory: item["working_directory"],
    env: Object.fromEntries(Object.entries(item["env"]).map(([k, p]: [string, any]) => [k, p])),
    user: item["user"],
  };
}

/** The output of a local shell tool call. */
export interface OutputItemLocalShellToolCallOutput extends OutputItem {
  /** The type of the local shell tool call output. Always `local_shell_call_output`. */
  type: "local_shell_call_output";
  /** The unique ID of the local shell tool call generated by the model. */
  id: string;
  /** A JSON string of the output of the local shell tool call. */
  output: string;
  status?: "in_progress" | "completed" | "incomplete";
}

export function outputItemLocalShellToolCallOutputSerializer(
  item: OutputItemLocalShellToolCallOutput,
): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    output: item["output"],
    status: item["status"],
  };
}

export function outputItemLocalShellToolCallOutputDeserializer(
  item: any,
): OutputItemLocalShellToolCallOutput {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    output: item["output"],
    status: item["status"],
  };
}

/** A tool call that executes one or more shell commands in a managed environment. */
export interface OutputItemFunctionShellCall extends OutputItem {
  /** The type of the item. Always `shell_call`. */
  type: "shell_call";
  /** The unique ID of the shell tool call. Populated when this item is returned via API. */
  id: string;
  /** The unique ID of the shell tool call generated by the model. */
  call_id: string;
  /** The shell commands and limits that describe how to run the tool call. */
  action: FunctionShellAction;
  /** The status of the shell call. One of `in_progress`, `completed`, or `incomplete`. */
  status: LocalShellCallStatus;
  environment: FunctionShellCallEnvironmentUnion | null;
  /** The ID of the entity that created this tool call. */
  created_by?: string;
}

export function outputItemFunctionShellCallSerializer(item: OutputItemFunctionShellCall): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    action: functionShellActionSerializer(item["action"]),
    status: item["status"],
    environment: !item["environment"]
      ? item["environment"]
      : functionShellCallEnvironmentUnionSerializer(item["environment"]),
    created_by: item["created_by"],
  };
}

export function outputItemFunctionShellCallDeserializer(item: any): OutputItemFunctionShellCall {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    action: functionShellActionDeserializer(item["action"]),
    status: item["status"],
    environment: !item["environment"]
      ? item["environment"]
      : functionShellCallEnvironmentUnionDeserializer(item["environment"]),
    created_by: item["created_by"],
  };
}

/** Execute a shell command. */
export interface FunctionShellAction {
  commands: string[];
  timeout_ms: number | null;
  max_output_length: number | null;
}

export function functionShellActionSerializer(item: FunctionShellAction): any {
  return {
    commands: item["commands"].map((p: any) => {
      return p;
    }),
    timeout_ms: item["timeout_ms"],
    max_output_length: item["max_output_length"],
  };
}

export function functionShellActionDeserializer(item: any): FunctionShellAction {
  return {
    commands: item["commands"].map((p: any) => {
      return p;
    }),
    timeout_ms: item["timeout_ms"],
    max_output_length: item["max_output_length"],
  };
}

/** Type of LocalShellCallStatus */
export type LocalShellCallStatus = "in_progress" | "completed" | "incomplete";

/** model interface FunctionShellCallEnvironment */
export interface FunctionShellCallEnvironment {
  type: FunctionShellCallEnvironmentType;
}

export function functionShellCallEnvironmentSerializer(item: FunctionShellCallEnvironment): any {
  return { type: item["type"] };
}

export function functionShellCallEnvironmentDeserializer(item: any): FunctionShellCallEnvironment {
  return {
    type: item["type"],
  };
}

/** Alias for FunctionShellCallEnvironmentUnion */
export type FunctionShellCallEnvironmentUnion =
  | LocalEnvironmentResource
  | ContainerReferenceResource
  | FunctionShellCallEnvironment;

export function functionShellCallEnvironmentUnionSerializer(
  item: FunctionShellCallEnvironmentUnion,
): any {
  switch (item.type) {
    case "local":
      return localEnvironmentResourceSerializer(item as LocalEnvironmentResource);

    case "container_reference":
      return containerReferenceResourceSerializer(item as ContainerReferenceResource);

    default:
      return functionShellCallEnvironmentSerializer(item);
  }
}

export function functionShellCallEnvironmentUnionDeserializer(
  item: any,
): FunctionShellCallEnvironmentUnion {
  switch (item["type"]) {
    case "local":
      return localEnvironmentResourceDeserializer(item as LocalEnvironmentResource);

    case "container_reference":
      return containerReferenceResourceDeserializer(item as ContainerReferenceResource);

    default:
      return functionShellCallEnvironmentDeserializer(item);
  }
}

/** Type of FunctionShellCallEnvironmentType */
export type FunctionShellCallEnvironmentType = "local" | "container_reference";

/** Represents the use of a local environment to perform shell actions. */
export interface LocalEnvironmentResource extends FunctionShellCallEnvironment {
  /** The environment type. Always `local`. */
  type: "local";
}

export function localEnvironmentResourceSerializer(item: LocalEnvironmentResource): any {
  return { type: item["type"] };
}

export function localEnvironmentResourceDeserializer(item: any): LocalEnvironmentResource {
  return {
    type: item["type"],
  };
}

/** Represents a container created with /v1/containers. */
export interface ContainerReferenceResource extends FunctionShellCallEnvironment {
  /** The environment type. Always `container_reference`. */
  type: "container_reference";
  container_id: string;
}

export function containerReferenceResourceSerializer(item: ContainerReferenceResource): any {
  return { type: item["type"], container_id: item["container_id"] };
}

export function containerReferenceResourceDeserializer(item: any): ContainerReferenceResource {
  return {
    type: item["type"],
    container_id: item["container_id"],
  };
}

/** The output of a shell tool call that was emitted. */
export interface OutputItemFunctionShellCallOutput extends OutputItem {
  /** The type of the shell call output. Always `shell_call_output`. */
  type: "shell_call_output";
  /** The unique ID of the shell call output. Populated when this item is returned via API. */
  id: string;
  /** The unique ID of the shell tool call generated by the model. */
  call_id: string;
  /** The status of the shell call output. One of `in_progress`, `completed`, or `incomplete`. */
  status: LocalShellCallOutputStatusEnum;
  /** An array of shell call output contents */
  output: FunctionShellCallOutputContent[];
  max_output_length: number | null;
  /** The identifier of the actor that created the item. */
  created_by?: string;
}

export function outputItemFunctionShellCallOutputSerializer(
  item: OutputItemFunctionShellCallOutput,
): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    status: item["status"],
    output: functionShellCallOutputContentArraySerializer(item["output"]),
    max_output_length: item["max_output_length"],
    created_by: item["created_by"],
  };
}

export function outputItemFunctionShellCallOutputDeserializer(
  item: any,
): OutputItemFunctionShellCallOutput {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    status: item["status"],
    output: functionShellCallOutputContentArrayDeserializer(item["output"]),
    max_output_length: item["max_output_length"],
    created_by: item["created_by"],
  };
}

/** Type of LocalShellCallOutputStatusEnum */
export type LocalShellCallOutputStatusEnum = "in_progress" | "completed" | "incomplete";

export function functionShellCallOutputContentArraySerializer(
  result: Array<FunctionShellCallOutputContent>,
): any[] {
  return result.map((item) => {
    return functionShellCallOutputContentSerializer(item);
  });
}

export function functionShellCallOutputContentArrayDeserializer(
  result: Array<FunctionShellCallOutputContent>,
): any[] {
  return result.map((item) => {
    return functionShellCallOutputContentDeserializer(item);
  });
}

/** The content of a shell tool call output that was emitted. */
export interface FunctionShellCallOutputContent {
  /** The standard output that was captured. */
  stdout: string;
  /** The standard error output that was captured. */
  stderr: string;
  /** Represents either an exit outcome (with an exit code) or a timeout outcome for a shell call output chunk. */
  outcome: FunctionShellCallOutputOutcomeUnion;
  /** The identifier of the actor that created the item. */
  created_by?: string;
}

export function functionShellCallOutputContentSerializer(
  item: FunctionShellCallOutputContent,
): any {
  return {
    stdout: item["stdout"],
    stderr: item["stderr"],
    outcome: functionShellCallOutputOutcomeUnionSerializer(item["outcome"]),
    created_by: item["created_by"],
  };
}

export function functionShellCallOutputContentDeserializer(
  item: any,
): FunctionShellCallOutputContent {
  return {
    stdout: item["stdout"],
    stderr: item["stderr"],
    outcome: functionShellCallOutputOutcomeUnionDeserializer(item["outcome"]),
    created_by: item["created_by"],
  };
}

/** Represents either an exit outcome (with an exit code) or a timeout outcome for a shell call output chunk. */
export interface FunctionShellCallOutputOutcome {
  type: FunctionShellCallOutputOutcomeType;
}

export function functionShellCallOutputOutcomeSerializer(
  item: FunctionShellCallOutputOutcome,
): any {
  return { type: item["type"] };
}

export function functionShellCallOutputOutcomeDeserializer(
  item: any,
): FunctionShellCallOutputOutcome {
  return {
    type: item["type"],
  };
}

/** Alias for FunctionShellCallOutputOutcomeUnion */
export type FunctionShellCallOutputOutcomeUnion =
  | FunctionShellCallOutputTimeoutOutcome
  | FunctionShellCallOutputExitOutcome
  | FunctionShellCallOutputOutcome;

export function functionShellCallOutputOutcomeUnionSerializer(
  item: FunctionShellCallOutputOutcomeUnion,
): any {
  switch (item.type) {
    case "timeout":
      return functionShellCallOutputTimeoutOutcomeSerializer(
        item as FunctionShellCallOutputTimeoutOutcome,
      );

    case "exit":
      return functionShellCallOutputExitOutcomeSerializer(
        item as FunctionShellCallOutputExitOutcome,
      );

    default:
      return functionShellCallOutputOutcomeSerializer(item);
  }
}

export function functionShellCallOutputOutcomeUnionDeserializer(
  item: any,
): FunctionShellCallOutputOutcomeUnion {
  switch (item["type"]) {
    case "timeout":
      return functionShellCallOutputTimeoutOutcomeDeserializer(
        item as FunctionShellCallOutputTimeoutOutcome,
      );

    case "exit":
      return functionShellCallOutputExitOutcomeDeserializer(
        item as FunctionShellCallOutputExitOutcome,
      );

    default:
      return functionShellCallOutputOutcomeDeserializer(item);
  }
}

/** Type of FunctionShellCallOutputOutcomeType */
export type FunctionShellCallOutputOutcomeType = "timeout" | "exit";

/** Indicates that the shell call exceeded its configured time limit. */
export interface FunctionShellCallOutputTimeoutOutcome extends FunctionShellCallOutputOutcome {
  /** The outcome type. Always `timeout`. */
  type: "timeout";
}

export function functionShellCallOutputTimeoutOutcomeSerializer(
  item: FunctionShellCallOutputTimeoutOutcome,
): any {
  return { type: item["type"] };
}

export function functionShellCallOutputTimeoutOutcomeDeserializer(
  item: any,
): FunctionShellCallOutputTimeoutOutcome {
  return {
    type: item["type"],
  };
}

/** Indicates that the shell commands finished and returned an exit code. */
export interface FunctionShellCallOutputExitOutcome extends FunctionShellCallOutputOutcome {
  /** The outcome type. Always `exit`. */
  type: "exit";
  /** Exit code from the shell process. */
  exit_code: number;
}

export function functionShellCallOutputExitOutcomeSerializer(
  item: FunctionShellCallOutputExitOutcome,
): any {
  return { type: item["type"], exit_code: item["exit_code"] };
}

export function functionShellCallOutputExitOutcomeDeserializer(
  item: any,
): FunctionShellCallOutputExitOutcome {
  return {
    type: item["type"],
    exit_code: item["exit_code"],
  };
}

/** A tool call that applies file diffs by creating, deleting, or updating files. */
export interface OutputItemApplyPatchToolCall extends OutputItem {
  /** The type of the item. Always `apply_patch_call`. */
  type: "apply_patch_call";
  /** The unique ID of the apply patch tool call. Populated when this item is returned via API. */
  id: string;
  /** The unique ID of the apply patch tool call generated by the model. */
  call_id: string;
  /** The status of the apply patch tool call. One of `in_progress` or `completed`. */
  status: ApplyPatchCallStatus;
  /** One of the create_file, delete_file, or update_file operations applied via apply_patch. */
  operation: ApplyPatchFileOperationUnion;
  /** The ID of the entity that created this tool call. */
  created_by?: string;
}

export function outputItemApplyPatchToolCallSerializer(item: OutputItemApplyPatchToolCall): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    status: item["status"],
    operation: applyPatchFileOperationUnionSerializer(item["operation"]),
    created_by: item["created_by"],
  };
}

export function outputItemApplyPatchToolCallDeserializer(item: any): OutputItemApplyPatchToolCall {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    status: item["status"],
    operation: applyPatchFileOperationUnionDeserializer(item["operation"]),
    created_by: item["created_by"],
  };
}

/** Type of ApplyPatchCallStatus */
export type ApplyPatchCallStatus = "in_progress" | "completed";

/** One of the create_file, delete_file, or update_file operations applied via apply_patch. */
export interface ApplyPatchFileOperation {
  type: ApplyPatchFileOperationType;
}

export function applyPatchFileOperationSerializer(item: ApplyPatchFileOperation): any {
  return { type: item["type"] };
}

export function applyPatchFileOperationDeserializer(item: any): ApplyPatchFileOperation {
  return {
    type: item["type"],
  };
}

/** Alias for ApplyPatchFileOperationUnion */
export type ApplyPatchFileOperationUnion =
  | ApplyPatchCreateFileOperation
  | ApplyPatchDeleteFileOperation
  | ApplyPatchUpdateFileOperation
  | ApplyPatchFileOperation;

export function applyPatchFileOperationUnionSerializer(item: ApplyPatchFileOperationUnion): any {
  switch (item.type) {
    case "create_file":
      return applyPatchCreateFileOperationSerializer(item as ApplyPatchCreateFileOperation);

    case "delete_file":
      return applyPatchDeleteFileOperationSerializer(item as ApplyPatchDeleteFileOperation);

    case "update_file":
      return applyPatchUpdateFileOperationSerializer(item as ApplyPatchUpdateFileOperation);

    default:
      return applyPatchFileOperationSerializer(item);
  }
}

export function applyPatchFileOperationUnionDeserializer(item: any): ApplyPatchFileOperationUnion {
  switch (item["type"]) {
    case "create_file":
      return applyPatchCreateFileOperationDeserializer(item as ApplyPatchCreateFileOperation);

    case "delete_file":
      return applyPatchDeleteFileOperationDeserializer(item as ApplyPatchDeleteFileOperation);

    case "update_file":
      return applyPatchUpdateFileOperationDeserializer(item as ApplyPatchUpdateFileOperation);

    default:
      return applyPatchFileOperationDeserializer(item);
  }
}

/** Type of ApplyPatchFileOperationType */
export type ApplyPatchFileOperationType = "create_file" | "delete_file" | "update_file";

/** Instruction describing how to create a file via the apply_patch tool. */
export interface ApplyPatchCreateFileOperation extends ApplyPatchFileOperation {
  /** Create a new file with the provided diff. */
  type: "create_file";
  /** Path of the file to create. */
  path: string;
  /** Diff to apply. */
  diff: string;
}

export function applyPatchCreateFileOperationSerializer(item: ApplyPatchCreateFileOperation): any {
  return { type: item["type"], path: item["path"], diff: item["diff"] };
}

export function applyPatchCreateFileOperationDeserializer(
  item: any,
): ApplyPatchCreateFileOperation {
  return {
    type: item["type"],
    path: item["path"],
    diff: item["diff"],
  };
}

/** Instruction describing how to delete a file via the apply_patch tool. */
export interface ApplyPatchDeleteFileOperation extends ApplyPatchFileOperation {
  /** Delete the specified file. */
  type: "delete_file";
  /** Path of the file to delete. */
  path: string;
}

export function applyPatchDeleteFileOperationSerializer(item: ApplyPatchDeleteFileOperation): any {
  return { type: item["type"], path: item["path"] };
}

export function applyPatchDeleteFileOperationDeserializer(
  item: any,
): ApplyPatchDeleteFileOperation {
  return {
    type: item["type"],
    path: item["path"],
  };
}

/** Instruction describing how to update a file via the apply_patch tool. */
export interface ApplyPatchUpdateFileOperation extends ApplyPatchFileOperation {
  /** Update an existing file with the provided diff. */
  type: "update_file";
  /** Path of the file to update. */
  path: string;
  /** Diff to apply. */
  diff: string;
}

export function applyPatchUpdateFileOperationSerializer(item: ApplyPatchUpdateFileOperation): any {
  return { type: item["type"], path: item["path"], diff: item["diff"] };
}

export function applyPatchUpdateFileOperationDeserializer(
  item: any,
): ApplyPatchUpdateFileOperation {
  return {
    type: item["type"],
    path: item["path"],
    diff: item["diff"],
  };
}

/** The output emitted by an apply patch tool call. */
export interface OutputItemApplyPatchToolCallOutput extends OutputItem {
  /** The type of the item. Always `apply_patch_call_output`. */
  type: "apply_patch_call_output";
  /** The unique ID of the apply patch tool call output. Populated when this item is returned via API. */
  id: string;
  /** The unique ID of the apply patch tool call generated by the model. */
  call_id: string;
  /** The status of the apply patch tool call output. One of `completed` or `failed`. */
  status: ApplyPatchCallOutputStatus;
  output?: string;
  /** The ID of the entity that created this tool call output. */
  created_by?: string;
}

export function outputItemApplyPatchToolCallOutputSerializer(
  item: OutputItemApplyPatchToolCallOutput,
): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    status: item["status"],
    output: item["output"],
    created_by: item["created_by"],
  };
}

export function outputItemApplyPatchToolCallOutputDeserializer(
  item: any,
): OutputItemApplyPatchToolCallOutput {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    status: item["status"],
    output: item["output"],
    created_by: item["created_by"],
  };
}

/** Type of ApplyPatchCallOutputStatus */
export type ApplyPatchCallOutputStatus = "completed" | "failed";

/** An invocation of a tool on an MCP server. */
export interface OutputItemMcpToolCall extends OutputItem {
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
  error?: Record<string, any>;
  /** The status of the tool call. One of `in_progress`, `completed`, `incomplete`, `calling`, or `failed`. */
  status?: MCPToolCallStatus;
  approval_request_id?: string;
}

export function outputItemMcpToolCallSerializer(item: OutputItemMcpToolCall): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
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

export function outputItemMcpToolCallDeserializer(item: any): OutputItemMcpToolCall {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    server_label: item["server_label"],
    name: item["name"],
    arguments: item["arguments"],
    output: item["output"],
    error: !item["error"]
      ? item["error"]
      : Object.fromEntries(Object.entries(item["error"]).map(([k, p]: [string, any]) => [k, p])),
    status: item["status"],
    approval_request_id: item["approval_request_id"],
  };
}

/** Type of MCPToolCallStatus */
export type MCPToolCallStatus = "in_progress" | "completed" | "incomplete" | "calling" | "failed";

/** A list of tools available on an MCP server. */
export interface OutputItemMcpListTools extends OutputItem {
  /** The type of the item. Always `mcp_list_tools`. */
  type: "mcp_list_tools";
  /** The unique ID of the list. */
  id: string;
  /** The label of the MCP server. */
  server_label: string;
  /** The tools available on the server. */
  tools: MCPListToolsTool[];
  error?: RealtimeMCPErrorUnion;
}

export function outputItemMcpListToolsSerializer(item: OutputItemMcpListTools): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    server_label: item["server_label"],
    tools: mcpListToolsToolArraySerializer(item["tools"]),
    error: !item["error"] ? item["error"] : realtimeMCPErrorUnionSerializer(item["error"]),
  };
}

export function outputItemMcpListToolsDeserializer(item: any): OutputItemMcpListTools {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    server_label: item["server_label"],
    tools: mcpListToolsToolArrayDeserializer(item["tools"]),
    error: !item["error"] ? item["error"] : realtimeMCPErrorUnionDeserializer(item["error"]),
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

/** A request for human approval of a tool invocation. */
export interface OutputItemMcpApprovalRequest extends OutputItem {
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

export function outputItemMcpApprovalRequestSerializer(item: OutputItemMcpApprovalRequest): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    server_label: item["server_label"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

export function outputItemMcpApprovalRequestDeserializer(item: any): OutputItemMcpApprovalRequest {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    server_label: item["server_label"],
    name: item["name"],
    arguments: item["arguments"],
  };
}

/** A response to an MCP approval request. */
export interface OutputItemMcpApprovalResponseResource extends OutputItem {
  /** The type of the item. Always `mcp_approval_response`. */
  type: "mcp_approval_response";
  /** The unique ID of the approval response */
  id: string;
  /** The ID of the approval request being answered. */
  approval_request_id: string;
  /** Whether the request was approved. */
  approve: boolean;
  reason?: string;
}

export function outputItemMcpApprovalResponseResourceSerializer(
  item: OutputItemMcpApprovalResponseResource,
): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    approval_request_id: item["approval_request_id"],
    approve: item["approve"],
    reason: item["reason"],
  };
}

export function outputItemMcpApprovalResponseResourceDeserializer(
  item: any,
): OutputItemMcpApprovalResponseResource {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    approval_request_id: item["approval_request_id"],
    approve: item["approve"],
    reason: item["reason"],
  };
}

/** model interface OutputItemCustomToolCallResource */
export interface OutputItemCustomToolCallResource extends OutputItem {
  /** The type of the custom tool call. Always `custom_tool_call`. */
  type: "custom_tool_call";
  /** The unique ID of the custom tool call in the OpenAI platform. */
  id?: string;
  /** An identifier used to map this custom tool call to a tool call output. */
  call_id: string;
  /** The namespace of the custom tool being called. */
  namespace?: string;
  /** The name of the custom tool being called. */
  name: string;
  /** The input for the custom tool call generated by the model. */
  input: string;
  /**
   * The status of the item. One of `in_progress`, `completed`, or
   *   `incomplete`. Populated when items are returned via API.
   */
  status: FunctionCallStatus;
  /** The identifier of the actor that created the item. */
  created_by?: string;
}

export function outputItemCustomToolCallResourceSerializer(
  item: OutputItemCustomToolCallResource,
): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    namespace: item["namespace"],
    name: item["name"],
    input: item["input"],
    status: item["status"],
    created_by: item["created_by"],
  };
}

export function outputItemCustomToolCallResourceDeserializer(
  item: any,
): OutputItemCustomToolCallResource {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    namespace: item["namespace"],
    name: item["name"],
    input: item["input"],
    status: item["status"],
    created_by: item["created_by"],
  };
}

/** model interface OutputItemCustomToolCallOutputResource */
export interface OutputItemCustomToolCallOutputResource extends OutputItem {
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
  /**
   * The status of the item. One of `in_progress`, `completed`, or
   *   `incomplete`. Populated when items are returned via API.
   */
  status: FunctionCallOutputStatusEnum;
  /** The identifier of the actor that created the item. */
  created_by?: string;
}

export function outputItemCustomToolCallOutputResourceSerializer(
  item: OutputItemCustomToolCallOutputResource,
): any {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceSerializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    output: _outputItemCustomToolCallOutputResourceOutputSerializer(item["output"]),
    status: item["status"],
    created_by: item["created_by"],
  };
}

export function outputItemCustomToolCallOutputResourceDeserializer(
  item: any,
): OutputItemCustomToolCallOutputResource {
  return {
    type: item["type"],
    agent_reference: !item["agent_reference"]
      ? item["agent_reference"]
      : agentReferenceDeserializer(item["agent_reference"]),
    response_id: item["response_id"],
    id: item["id"],
    call_id: item["call_id"],
    output: _outputItemCustomToolCallOutputResourceOutputDeserializer(item["output"]),
    status: item["status"],
    created_by: item["created_by"],
  };
}

/** Alias for _OutputItemCustomToolCallOutputResourceOutput */
export type _OutputItemCustomToolCallOutputResourceOutput =
  | string
  | FunctionAndCustomToolCallOutputUnion[];

export function _outputItemCustomToolCallOutputResourceOutputSerializer(
  item: _OutputItemCustomToolCallOutputResourceOutput,
): any {
  return item;
}

export function _outputItemCustomToolCallOutputResourceOutputDeserializer(
  item: any,
): _OutputItemCustomToolCallOutputResourceOutput {
  return item;
}

/** Reference to a registered dataset in the Foundry Dataset Service. */
export interface DatasetRef {
  /** Dataset name. */
  name: string;
  /** Dataset version. If not specified, the latest version is used. */
  version?: string;
}

export function datasetRefSerializer(item: DatasetRef): any {
  return { name: item["name"], version: item["version"] };
}

export function datasetRefDeserializer(item: any): DatasetRef {
  return {
    name: item["name"],
    version: item["version"],
  };
}

/** Tuning knobs and run-mode for an optimization job. */
export interface OptimizationOptions {
  /** Strategies to apply this run. Default: ['instruction']. */
  strategies?: OptimizationStrategy[];
  /** Total candidate generation budget (number of candidates explored). Default: 10. */
  budget?: number;
  /** Maximum optimization iterations per strategy. Default: 5. */
  max_iterations?: number;
  /** Tasks sampled per iteration (mutation step input). Default: service-decided (auto-computed). */
  tasks_per_iteration?: number;
  /** Maximum tasks fed into the reflective-mutation LLM per iteration. Default: 5. */
  max_reflection_tasks?: number;
  /** Minimum score improvement between iterations to continue (plateau detection). Default: 0.005. */
  min_improvement?: number;
  /** Composite score threshold for a task to be considered passing. Default: 0.5. */
  pass_threshold?: number;
  /** Target average score at which optimization stops early (quality ceiling). Default: 0.95. */
  improvement_threshold?: number;
  /** Run mode. */
  mode?: OptimizationMode;
  /** Foundry deployment name to use as the LLM-as-judge evaluation model. Required. */
  eval_model?: string;
  /** Optional model deployment for strategy reflection (instruction rewriting, skill generation). Falls back to `eval_model` if unset. */
  reflection_model?: string;
  /** Per-task timeout for agent execution. Default: 300 seconds (5 minutes). */
  task_timeout_seconds?: number;
  /** If true, retain temporary candidate-evaluation agent versions for inspection. Default: false. */
  keep_versions?: boolean;
}

export function optimizationOptionsSerializer(item: OptimizationOptions): any {
  return {
    strategies: !item["strategies"]
      ? item["strategies"]
      : item["strategies"].map((p: any) => {
          return p;
        }),
    budget: item["budget"],
    max_iterations: item["max_iterations"],
    tasks_per_iteration: item["tasks_per_iteration"],
    max_reflection_tasks: item["max_reflection_tasks"],
    min_improvement: item["min_improvement"],
    pass_threshold: item["pass_threshold"],
    improvement_threshold: item["improvement_threshold"],
    mode: item["mode"],
    eval_model: item["eval_model"],
    reflection_model: item["reflection_model"],
    task_timeout_seconds: item["task_timeout_seconds"],
    keep_versions: item["keep_versions"],
  };
}

export function optimizationOptionsDeserializer(item: any): OptimizationOptions {
  return {
    strategies: !item["strategies"]
      ? item["strategies"]
      : item["strategies"].map((p: any) => {
          return p;
        }),
    budget: item["budget"],
    max_iterations: item["max_iterations"],
    tasks_per_iteration: item["tasks_per_iteration"],
    max_reflection_tasks: item["max_reflection_tasks"],
    min_improvement: item["min_improvement"],
    pass_threshold: item["pass_threshold"],
    improvement_threshold: item["improvement_threshold"],
    mode: item["mode"],
    eval_model: item["eval_model"],
    reflection_model: item["reflection_model"],
    task_timeout_seconds: item["task_timeout_seconds"],
    keep_versions: item["keep_versions"],
  };
}

/** Optimization strategy dimension. */
export type OptimizationStrategy = "instruction" | "model" | "skill";
/** Run mode for an optimization job. */
export type OptimizationMode = "optimize";

/** Terminal-state result body. Populated when `status` is `succeeded` or `failed`. */
export interface OptimizationJobResult {
  /** Evaluation scores for the original (un-optimized) agent configuration. */
  baseline?: OptimizationCandidate;
  /** The highest-scoring candidate found during optimization. */
  best?: OptimizationCandidate;
  /** All evaluated candidates including baseline. */
  candidates?: OptimizationCandidate[];
  /** Candidates on the Pareto frontier (maximize score, minimize cost). */
  pareto_frontier?: OptimizationCandidate[];
  /** Score of the best candidate on the held-out validation dataset. Null when no validation dataset was provided. */
  validation_score?: OptimizationCandidate;
  /** The options used for this optimization run. */
  options?: OptimizationOptions;
  /** Number of tasks sampled during optimization iterations (null if sampling was not used). */
  sample_size?: number;
  /** Non-fatal warnings from the optimization run (e.g., strategy failures that were skipped). */
  warnings?: string[];
  /** True when all optimization strategies failed — only the baseline was evaluated. */
  all_strategies_failed?: boolean;
}

export function optimizationJobResultDeserializer(item: any): OptimizationJobResult {
  return {
    baseline: !item["baseline"]
      ? item["baseline"]
      : optimizationCandidateDeserializer(item["baseline"]),
    best: !item["best"] ? item["best"] : optimizationCandidateDeserializer(item["best"]),
    candidates: !item["candidates"]
      ? item["candidates"]
      : optimizationCandidateArrayDeserializer(item["candidates"]),
    pareto_frontier: !item["pareto_frontier"]
      ? item["pareto_frontier"]
      : optimizationCandidateArrayDeserializer(item["pareto_frontier"]),
    validation_score: !item["validation_score"]
      ? item["validation_score"]
      : optimizationCandidateDeserializer(item["validation_score"]),
    options: !item["options"] ? item["options"] : optimizationOptionsDeserializer(item["options"]),
    sample_size: item["sample_size"],
    warnings: !item["warnings"]
      ? item["warnings"]
      : item["warnings"].map((p: any) => {
          return p;
        }),
    all_strategies_failed: item["all_strategies_failed"],
  };
}

/** Aggregated evaluation result for a single candidate agent configuration across all tasks. */
export interface OptimizationCandidate {
  /** Server-assigned candidate identifier. Use with `GET /candidates/{id}` sub-endpoints. */
  candidate_id?: string;
  /** Display name of the candidate (e.g., 'baseline', 'instruction-v2'). */
  name: string;
  /** The agent configuration that produced this candidate. */
  config: OptimizationAgentDefinition;
  /** What was mutated from the baseline (e.g., {instructions: 'new prompt'}). */
  mutations: Record<string, any>;
  /** Strategy rationale — why this candidate was generated. */
  rationale: string;
  /** Average composite score across all tasks. */
  avg_score: number;
  /** Average token usage across all tasks. */
  avg_tokens: number;
  /** Fraction of tasks that met the pass threshold. */
  pass_rate: number;
  /** Individual task-level scores. */
  task_scores: OptimizationTaskResult[];
  /** Whether this candidate is on the Pareto frontier (score vs cost). */
  is_pareto_optimal: boolean;
  /** Average score from sampled evaluation (null if full dataset was used). */
  sample_avg_score?: number;
  /** Number of tasks in the sample (null if full dataset was used). */
  sample_size?: number;
  /** 'sample' if scored on a subset, 'full' if re-evaluated on the full dataset. */
  evaluation_type?: string;
  /** Identifies the strategy that produced this candidate. */
  strategy?: OptimizationStrategy;
  /** Foundry evaluation identifier used to score this candidate. */
  eval_id?: string;
  /** Foundry evaluation run identifier for this candidate's scoring run. */
  eval_run_id?: string;
}

export function optimizationCandidateDeserializer(item: any): OptimizationCandidate {
  return {
    candidate_id: item["candidate_id"],
    name: item["name"],
    config: optimizationAgentDefinitionDeserializer(item["config"]),
    mutations: Object.fromEntries(
      Object.entries(item["mutations"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    rationale: item["rationale"],
    avg_score: item["avg_score"],
    avg_tokens: item["avg_tokens"],
    pass_rate: item["pass_rate"],
    task_scores: optimizationTaskResultArrayDeserializer(item["task_scores"]),
    is_pareto_optimal: item["is_pareto_optimal"],
    sample_avg_score: item["sample_avg_score"],
    sample_size: item["sample_size"],
    evaluation_type: item["evaluation_type"],
    strategy: item["strategy"],
    eval_id: item["eval_id"],
    eval_run_id: item["eval_run_id"],
  };
}

export function optimizationTaskResultArrayDeserializer(
  result: Array<OptimizationTaskResult>,
): any[] {
  return result.map((item) => {
    return optimizationTaskResultDeserializer(item);
  });
}

/** Per-task evaluation result for a single candidate. */
export interface OptimizationTaskResult {
  /** Task name (from the dataset). */
  task_name: string;
  /** The user query / input for the task. */
  query?: string;
  /** Per-evaluator scores keyed by evaluator name. */
  scores: Record<string, number>;
  /** Composite score combining all evaluator scores. */
  composite_score: number;
  /** Total tokens consumed during the agent run for this task. */
  tokens: number;
  /** Wall-clock seconds for this task's agent execution. */
  duration_seconds: number;
  /** Whether the task met the pass threshold. */
  passed: boolean;
  /** Error message if the task failed during execution. */
  error_message?: string;
  /** Per-evaluator reasoning keyed by evaluator name. */
  rationales?: Record<string, string>;
  /** Raw agent response text. */
  response?: string;
  /** Identifier of the agent run that produced this result. */
  run_id?: string;
}

export function optimizationTaskResultDeserializer(item: any): OptimizationTaskResult {
  return {
    task_name: item["task_name"],
    query: item["query"],
    scores: Object.fromEntries(
      Object.entries(item["scores"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    composite_score: item["composite_score"],
    tokens: item["tokens"],
    duration_seconds: item["duration_seconds"],
    passed: item["passed"],
    error_message: item["error_message"],
    rationales: !item["rationales"]
      ? item["rationales"]
      : Object.fromEntries(
          Object.entries(item["rationales"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    response: item["response"],
    run_id: item["run_id"],
  };
}

export function optimizationCandidateArrayDeserializer(
  result: Array<OptimizationCandidate>,
): any[] {
  return result.map((item) => {
    return optimizationCandidateDeserializer(item);
  });
}

/** In-flight progress; only populated while status is `queued` or `in_progress`. */
export interface OptimizationJobProgress {
  /** Strategy currently being explored. */
  current_strategy: OptimizationStrategy;
  /** 1-based current iteration index. */
  current_iteration: number;
  /** Tasks evaluated so far this iteration. */
  tasks_completed: number;
  /** Total tasks scheduled this iteration. */
  tasks_total: number;
  /** Best score observed so far across all candidates. */
  best_score: number;
  /** Wall-clock time elapsed since the job began executing. */
  elapsed_seconds: number;
}

export function optimizationJobProgressDeserializer(item: any): OptimizationJobProgress {
  return {
    current_strategy: item["current_strategy"],
    current_iteration: item["current_iteration"],
    tasks_completed: item["tasks_completed"],
    tasks_total: item["tasks_total"],
    best_score: item["best_score"],
    elapsed_seconds: item["elapsed_seconds"],
  };
}

/** A content part that makes up an input or output item. */
export interface MessageContent {
  type: MessageContentType;
}

export function messageContentSerializer(item: MessageContent): any {
  return { type: item["type"] };
}

export function messageContentDeserializer(item: any): MessageContent {
  return {
    type: item["type"],
  };
}

/** Alias for MessageContentUnion */
export type MessageContentUnion = SummaryTextContent | MessageContent;

export function messageContentUnionSerializer(item: MessageContentUnion): any {
  switch (item.type) {
    case "summary_text":
      return summaryTextContentSerializer(item as SummaryTextContent);

    default:
      return messageContentSerializer(item);
  }
}

export function messageContentUnionDeserializer(item: any): MessageContentUnion {
  switch (item["type"]) {
    case "summary_text":
      return summaryTextContentDeserializer(item as SummaryTextContent);

    default:
      return messageContentDeserializer(item);
  }
}

/** Type of MessageContentType */
export type MessageContentType =
  | "input_text"
  | "output_text"
  | "text"
  | "summary_text"
  | "reasoning_text"
  | "refusal"
  | "input_image"
  | "computer_screenshot"
  | "input_file";

/** The response data for a requested list of items. */
export interface _AgentsPagedResultOptimizationJob {
  /** The requested list of items. */
  data: OptimizationJob[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultOptimizationJobDeserializer(
  item: any,
): _AgentsPagedResultOptimizationJob {
  return {
    data: optimizationJobArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function optimizationJobArraySerializer(result: Array<OptimizationJob>): any[] {
  return result.map((item) => {
    return optimizationJobSerializer(item);
  });
}

export function optimizationJobArrayDeserializer(result: Array<OptimizationJob>): any[] {
  return result.map((item) => {
    return optimizationJobDeserializer(item);
  });
}

/** The response data for a requested list of items. */
export interface AgentsPagedResultOptimizationCandidate {
  /** The requested list of items. */
  data: OptimizationCandidate[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function agentsPagedResultOptimizationCandidateDeserializer(
  item: any,
): AgentsPagedResultOptimizationCandidate {
  return {
    data: optimizationCandidateArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

/** Deploy-config blob for a candidate. Suitable for setting OPTIMIZATION_CONFIG on a hosted-agent version. */
export interface CandidateDeployConfig {
  /** System prompt / instructions. */
  instructions?: string;
  /** Foundry deployment name. */
  model?: string;
  /** Optional sampling temperature. */
  temperature?: number;
  /** Optional skill overrides. */
  skills?: OptimizationAgentSkill[];
}

export function candidateDeployConfigDeserializer(item: any): CandidateDeployConfig {
  return {
    instructions: item["instructions"],
    model: item["model"],
    temperature: item["temperature"],
    skills: !item["skills"]
      ? item["skills"]
      : optimizationAgentSkillArrayDeserializer(item["skills"]),
  };
}

/** Full per-task evaluation results for a candidate, returned by GET /candidates/{id}/results. */
export interface CandidateResults {
  /** Owning candidate id. */
  candidate_id: string;
  /** Per-task evaluation rows. */
  results: OptimizationTaskResult[];
}

export function candidateResultsDeserializer(item: any): CandidateResults {
  return {
    candidate_id: item["candidate_id"],
    results: optimizationTaskResultArrayDeserializer(item["results"]),
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

/** Type of AgentObjectType */
export type AgentObjectType =
  | "agent"
  | "agent.version"
  | "agent.deleted"
  | "agent.version.deleted"
  | "agent.container";
/** Feature opt-in keys for agent definition operations supporting hosted or workflow agents. */
export type AgentDefinitionOptInKeys =
  | "HostedAgents=V1Preview"
  | "WorkflowAgents=V1Preview"
  | "ContainerAgents=V1Preview"
  | "AgentEndpoints=V1Preview"
  | "CodeAgents=V1Preview";
/** Type of PageOrder */
export type PageOrder = "asc" | "desc";
/** Type of FoundryFeaturesOptInKeys */
export type FoundryFeaturesOptInKeys =
  | "Evaluations=V1Preview"
  | "Schedules=V1Preview"
  | "RedTeams=V1Preview"
  | "Insights=V1Preview"
  | "MemoryStores=V1Preview"
  | "Toolboxes=V1Preview"
  | "Skills=V1Preview"
  | "DataGenerationJobs=V1Preview"
  | "Models=V1Preview"
  | "AgentsOptimization=V1Preview";
/** The type of pending upload. */
export type PendingUploadType = "None" | "BlobReference" | "TemporaryBlobReference";
/** Type of MemoryStoreObjectType */
export type MemoryStoreObjectType =
  | "memory_store"
  | "memory_store.deleted"
  | "memory_store.scope.deleted"
  | "memory.deleted";

/** Microsoft Foundry API versions */
export enum KnownVersions {
  /** Microsoft Foundry API version v1. */
  v1 = "v1",
}

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
  readableStreamBody?: NodeJS.ReadableStream;
};

export type BetaAgentsDownloadSessionFileResponse = {
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
  readableStreamBody?: NodeJS.ReadableStream;
};

export type BetaAgentsDownloadAgentCodeResponse = {
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
  readableStreamBody?: NodeJS.ReadableStream;
};
