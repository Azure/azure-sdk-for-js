// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { serializeRecord } from "../../static-helpers/serialization/serialize-record.js";
import {
  GitHubCopilotToolsetPreview,
  gitHubCopilotToolsetPreviewSerializer,
  gitHubCopilotToolsetPreviewDeserializer,
  BingGroundingTool,
  bingGroundingToolSerializer,
  bingGroundingToolDeserializer,
  toolConfigRecordSerializer,
  toolConfigRecordDeserializer,
  ToolConfig,
  MicrosoftFabricPreviewTool,
  microsoftFabricPreviewToolSerializer,
  microsoftFabricPreviewToolDeserializer,
  SharepointPreviewTool,
  sharepointPreviewToolSerializer,
  sharepointPreviewToolDeserializer,
  AzureAISearchTool,
  azureAISearchToolSerializer,
  azureAISearchToolDeserializer,
  OpenApiTool,
  openApiToolSerializer,
  openApiToolDeserializer,
  BingCustomSearchPreviewTool,
  bingCustomSearchPreviewToolSerializer,
  bingCustomSearchPreviewToolDeserializer,
  BrowserAutomationPreviewTool,
  browserAutomationPreviewToolSerializer,
  browserAutomationPreviewToolDeserializer,
  BrowserAutomationTool,
  browserAutomationToolSerializer,
  browserAutomationToolDeserializer,
  AzureFunctionTool,
  azureFunctionToolSerializer,
  azureFunctionToolDeserializer,
  CaptureStructuredOutputsTool,
  captureStructuredOutputsToolSerializer,
  captureStructuredOutputsToolDeserializer,
  A2APreviewTool,
  a2APreviewToolSerializer,
  a2APreviewToolDeserializer,
  A2ATool,
  a2AToolSerializer,
  a2AToolDeserializer,
  WorkIQPreviewTool,
  workIQPreviewToolSerializer,
  workIQPreviewToolDeserializer,
  FabricIQPreviewTool,
  fabricIQPreviewToolSerializer,
  fabricIQPreviewToolDeserializer,
  WebIQPreviewTool,
  webIQPreviewToolSerializer,
  webIQPreviewToolDeserializer,
  MemorySearchPreviewTool,
  memorySearchPreviewToolSerializer,
  memorySearchPreviewToolDeserializer,
  _codeInterpreterToolContainerSerializer,
  _codeInterpreterToolContainerDeserializer,
  WebSearchConfiguration,
  webSearchConfigurationSerializer,
  webSearchConfigurationDeserializer,
  VoiceAgentClientEventSessionAvatarConnect,
  voiceAgentClientEventSessionAvatarConnectSerializer,
  voiceAgentClientEventSessionAvatarConnectDeserializer,
  VoiceAgentResponseCreateParams,
  voiceAgentResponseCreateParamsSerializer,
  voiceAgentResponseCreateParamsDeserializer,
  VoiceAgentClientEventRtcCallSdpCreate,
  voiceAgentClientEventRtcCallSdpCreateSerializer,
  voiceAgentClientEventRtcCallSdpCreateDeserializer,
  VoiceAgentServerEventSessionSubagentCompleted,
  voiceAgentServerEventSessionSubagentCompletedSerializer,
  voiceAgentServerEventSessionSubagentCompletedDeserializer,
  voiceAgentTranscriptionPhraseArraySerializer,
  voiceAgentTranscriptionPhraseArrayDeserializer,
  VoiceAgentTranscriptionPhrase,
  VoiceAgentRealtimeResponse,
  voiceAgentRealtimeResponseSerializer,
  voiceAgentRealtimeResponseDeserializer,
  VoiceAgentSessionResponse,
  voiceAgentSessionResponseSerializer,
  voiceAgentSessionResponseDeserializer,
  VoiceAgentServerEventSessionSubagentStarted,
  voiceAgentServerEventSessionSubagentStartedSerializer,
  voiceAgentServerEventSessionSubagentStartedDeserializer,
  VoiceAgentServerEventSessionSubagentAborted,
  voiceAgentServerEventSessionSubagentAbortedSerializer,
  voiceAgentServerEventSessionSubagentAbortedDeserializer,
  VoiceAgentServerEventWarning,
  voiceAgentServerEventWarningSerializer,
  voiceAgentServerEventWarningDeserializer,
  VoiceAgentServerEventSessionAvatarConnecting,
  voiceAgentServerEventSessionAvatarConnectingSerializer,
  voiceAgentServerEventSessionAvatarConnectingDeserializer,
  VoiceAgentServerEventRtcCallSdpCreated,
  voiceAgentServerEventRtcCallSdpCreatedSerializer,
  voiceAgentServerEventRtcCallSdpCreatedDeserializer,
  VoiceAgentServerEventRtcCallError,
  voiceAgentServerEventRtcCallErrorSerializer,
  voiceAgentServerEventRtcCallErrorDeserializer,
  VoiceAgentServerEventSessionAvatarSwitchToSpeaking,
  voiceAgentServerEventSessionAvatarSwitchToSpeakingSerializer,
  voiceAgentServerEventSessionAvatarSwitchToSpeakingDeserializer,
  VoiceAgentServerEventSessionAvatarSwitchToIdle,
  voiceAgentServerEventSessionAvatarSwitchToIdleSerializer,
  voiceAgentServerEventSessionAvatarSwitchToIdleDeserializer,
  VoiceAgentServerEventResponseAudioTimestampDelta,
  voiceAgentServerEventResponseAudioTimestampDeltaSerializer,
  voiceAgentServerEventResponseAudioTimestampDeltaDeserializer,
  VoiceAgentServerEventResponseAudioTimestampDone,
  voiceAgentServerEventResponseAudioTimestampDoneSerializer,
  voiceAgentServerEventResponseAudioTimestampDoneDeserializer,
  VoiceAgentServerEventResponseAnimationBlendshapesDelta,
  voiceAgentServerEventResponseAnimationBlendshapesDeltaSerializer,
  voiceAgentServerEventResponseAnimationBlendshapesDeltaDeserializer,
  VoiceAgentServerEventResponseAnimationBlendshapesDone,
  voiceAgentServerEventResponseAnimationBlendshapesDoneSerializer,
  voiceAgentServerEventResponseAnimationBlendshapesDoneDeserializer,
  VoiceAgentServerEventResponseAnimationVisemeDelta,
  voiceAgentServerEventResponseAnimationVisemeDeltaSerializer,
  voiceAgentServerEventResponseAnimationVisemeDeltaDeserializer,
  VoiceAgentServerEventResponseAnimationVisemeDone,
  voiceAgentServerEventResponseAnimationVisemeDoneSerializer,
  voiceAgentServerEventResponseAnimationVisemeDoneDeserializer,
  VoiceAgentServerEventResponseVideoDelta,
  voiceAgentServerEventResponseVideoDeltaSerializer,
  voiceAgentServerEventResponseVideoDeltaDeserializer,
} from "../models.js";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

/**
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

/** Alias for ReasoningModeEnum */
export type ReasoningModeEnum = string | "standard" | "pro";

export function reasoningModeEnumSerializer(item: ReasoningModeEnum): any {
  return item;
}

export function reasoningModeEnumDeserializer(item: any): ReasoningModeEnum {
  return item;
}

/**
 * Constrains effort on reasoning for reasoning models. Currently supported
 * values are `none`, `minimal`, `low`, `medium`, `high`, `xhigh`, and `max`.
 * Reducing reasoning effort can result in faster responses and fewer tokens
 * used on reasoning in a response. Not all reasoning models support every
 * value. See the
 * [reasoning guide](https://platform.openai.com/docs/guides/reasoning)
 * for model-specific support.
 */
export type ReasoningEffort = "none" | "minimal" | "low" | "medium" | "high" | "xhigh" | "max";

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
  | GitHubCopilotToolsetPreview
  | BingGroundingTool
  | MicrosoftFabricPreviewTool
  | SharepointPreviewTool
  | AzureAISearchTool
  | OpenApiTool
  | BingCustomSearchPreviewTool
  | BrowserAutomationPreviewTool
  | BrowserAutomationTool
  | AzureFunctionTool
  | CaptureStructuredOutputsTool
  | A2APreviewTool
  | A2ATool
  | WorkIQPreviewTool
  | FabricIQPreviewTool
  | WebIQPreviewTool
  | MemorySearchPreviewTool
  | MCPTool
  | CodeInterpreterTool
  | FunctionTool
  | FileSearchTool
  | ComputerUsePreviewTool
  | WebSearchTool
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
    case "github_copilot_toolset_preview":
      return gitHubCopilotToolsetPreviewSerializer(item as GitHubCopilotToolsetPreview);

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

    case "browser_automation":
      return browserAutomationToolSerializer(item as BrowserAutomationTool);

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

    case "mcp":
      return mcpToolSerializer(item as MCPTool);

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
    case "github_copilot_toolset_preview":
      return gitHubCopilotToolsetPreviewDeserializer(item as GitHubCopilotToolsetPreview);

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

    case "browser_automation":
      return browserAutomationToolDeserializer(item as BrowserAutomationTool);

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

    case "mcp":
      return mcpToolDeserializer(item as MCPTool);

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
  | "github_copilot_toolset_preview"
  | "a2a"
  | "azure_ai_search"
  | "azure_function"
  | "bing_grounding"
  | "browser_automation"
  | "capture_structured_outputs"
  | "openapi";

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

/** Type of CallableToolAllowedCaller */
export type CallableToolAllowedCaller = "direct" | "programmatic";

/** Alias for _MCPToolRequireApproval */
export type _MCPToolRequireApproval = MCPToolRequireApproval | "always" | "never";

export function _mcpToolRequireApprovalSerializer(item: _MCPToolRequireApproval): any {
  return item;
}

export function _mcpToolRequireApprovalDeserializer(item: any): _MCPToolRequireApproval {
  return item;
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
  async?: boolean;
  description?: string;
  parameters: Record<string, any> | null;
  output_schema?: Record<string, any>;
  strict: boolean | null;
  /** Whether this function is deferred and loaded via tool search. */
  defer_loading?: boolean;
  allowed_callers?: CallableToolAllowedCaller[];
}

export function functionToolSerializer(item: FunctionTool): any {
  return {
    type: item["type"],
    name: item["name"],
    async: item["async"],
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
    async: item["async"],
    description: item["description"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : Object.fromEntries(
          Object.entries(item["parameters"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
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
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
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
  /** Allow live internet access for web search. Defaults to true when omitted. When false, the web search tool runs in offline/cache-only mode and will not fetch new external content. */
  external_web_access?: boolean;
  filters?: WebSearchToolFilters;
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
    external_web_access: item["external_web_access"],
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
    external_web_access: item["external_web_access"],
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

/** model interface ProgrammaticToolCallingParam */
export interface ProgrammaticToolCallingParam extends Tool {
  /** The type of the tool. Always `programmatic_tool_calling`. */
  type: "programmatic_tool_calling";
}

export function programmaticToolCallingParamSerializer(item: ProgrammaticToolCallingParam): any {
  return { type: item["type"] };
}

export function programmaticToolCallingParamDeserializer(item: any): ProgrammaticToolCallingParam {
  return {
    type: item["type"],
  };
}

/** A tool that generates images using the GPT image models. */
export interface ImageGenTool extends Tool {
  /** The type of the image generation tool. Always `image_generation`. */
  type: "image_generation";
  model?:
    "gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5" | "gpt-image-2" | "gpt-image-2-2026-04-21";
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
   * Set the background of the generated image. One of `transparent`,
   *   `opaque`, or `auto`. Transparent backgrounds are available for
   *   supported GPT Image models. For `gpt-image-2` and
   *   `gpt-image-2-2026-04-21`, this support is in preview. When using
   *   `transparent`, set the output format to `png` or `webp`. Default: `auto`.
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
  environment?: FunctionShellToolParamEnvironmentUnion;
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
  /** Whether the tool response can be returned asynchronously versus immediately returned on next response creation. */
  async?: boolean;
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
    async: item["async"],
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
    async: item["async"],
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
  /** Whether the tool response can be returned asynchronously versus immediately returned on next response creation. */
  async?: boolean;
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
    async: item["async"],
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
    async: item["async"],
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
  | ToolChoiceFunction
  | ToolChoiceMCP
  | ToolChoiceAllowed
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
    case "function":
      return toolChoiceFunctionSerializer(item as ToolChoiceFunction);

    case "mcp":
      return toolChoiceMCPSerializer(item as ToolChoiceMCP);

    case "allowed_tools":
      return toolChoiceAllowedSerializer(item as ToolChoiceAllowed);

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
    case "function":
      return toolChoiceFunctionDeserializer(item as ToolChoiceFunction);

    case "mcp":
      return toolChoiceMCPDeserializer(item as ToolChoiceMCP);

    case "allowed_tools":
      return toolChoiceAllowedDeserializer(item as ToolChoiceAllowed);

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

/** model interface SpecificProgrammaticToolCallingParam */
export interface SpecificProgrammaticToolCallingParam extends ToolChoiceParam {
  /** The tool to call. Always `programmatic_tool_calling`. */
  type: "programmatic_tool_calling";
}

export function specificProgrammaticToolCallingParamSerializer(
  item: SpecificProgrammaticToolCallingParam,
): any {
  return { type: item["type"] };
}

export function specificProgrammaticToolCallingParamDeserializer(
  item: any,
): SpecificProgrammaticToolCallingParam {
  return {
    type: item["type"],
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

/** model interface ApiError */
export interface ApiError {
  code: string | null;
  message: string;
  param?: string;
  type?: string;
  misalignment?: MisalignmentErrorDetailsResource;
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
    misalignment: !item["misalignment"]
      ? item["misalignment"]
      : misalignmentErrorDetailsResourceDeserializer(item["misalignment"]),
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

/** model interface MisalignmentErrorDetailsResource */
export interface MisalignmentErrorDetailsResource {
  /** An optional classification; clients must accept additional values. */
  error_type?: MisalignmentErrorType;
  /** The public explanation for this block. */
  detailed_explanation?: string;
  /** An optional public continuation instruction. */
  steer?: MisalignmentSteer;
}

export function misalignmentErrorDetailsResourceDeserializer(
  item: any,
): MisalignmentErrorDetailsResource {
  return {
    error_type: !item["error_type"]
      ? item["error_type"]
      : misalignmentErrorTypeDeserializer(item["error_type"]),
    detailed_explanation: item["detailed_explanation"],
    steer: !item["steer"] ? item["steer"] : misalignmentSteerDeserializer(item["steer"]),
  };
}

/** Alias for MisalignmentErrorType */
export type MisalignmentErrorType =
  | string
  | "potentially_unintended_data_transfer"
  | "potentially_unintended_data_access"
  | "potentially_unintended_destructive_activity"
  | "other";

export function misalignmentErrorTypeDeserializer(item: any): MisalignmentErrorType {
  return item;
}

/** model interface MisalignmentSteer */
export interface MisalignmentSteer {
  /** The public continuation instruction. */
  message: string;
}

export function misalignmentSteerDeserializer(item: any): MisalignmentSteer {
  return {
    message: item["message"],
  };
}

export function apiErrorArrayDeserializer(result: Array<ApiError>): any[] {
  return result.map((item) => {
    return apiErrorDeserializer(item);
  });
}

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
  | RealtimeConversationItemMessageUnion
  | RealtimeConversationItemFunctionCall
  | RealtimeConversationItemFunctionCallOutput
  | RealtimeMCPApprovalResponse
  | RealtimeMCPListTools
  | RealtimeMCPToolCall
  | RealtimeMCPApprovalRequest
  | RealtimeConversationItem;

export function realtimeConversationItemUnionSerializer(item: RealtimeConversationItemUnion): any {
  switch (item.type) {
    case "message":
      return realtimeConversationItemMessageUnionSerializer(
        item as RealtimeConversationItemMessageUnion,
      );

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
    case "message":
      return realtimeConversationItemMessageUnionDeserializer(
        item as RealtimeConversationItemMessageUnion,
      );

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
  | "mcp_approval_request"
  | "message";

/** model interface RealtimeConversationItemMessage */
export interface RealtimeConversationItemMessage extends RealtimeConversationItem {
  role: RealtimeConversationItemMessageType;
  type: "message";
}

export function realtimeConversationItemMessageSerializer(
  item: RealtimeConversationItemMessage,
): any {
  return { type: item["type"], role: item["role"] };
}

export function realtimeConversationItemMessageDeserializer(
  item: any,
): RealtimeConversationItemMessage {
  return {
    type: item["type"],
    role: item["role"],
  };
}

/** Alias for RealtimeConversationItemMessageUnion */
export type RealtimeConversationItemMessageUnion =
  | RealtimeConversationItemMessageSystem
  | RealtimeConversationItemMessageUser
  | RealtimeConversationItemMessageAssistant
  | RealtimeConversationItemMessage;

export function realtimeConversationItemMessageUnionSerializer(
  item: RealtimeConversationItemMessageUnion,
): any {
  switch (item.role) {
    case "system":
      return realtimeConversationItemMessageSystemSerializer(
        item as RealtimeConversationItemMessageSystem,
      );

    case "user":
      return realtimeConversationItemMessageUserSerializer(
        item as RealtimeConversationItemMessageUser,
      );

    case "assistant":
      return realtimeConversationItemMessageAssistantSerializer(
        item as RealtimeConversationItemMessageAssistant,
      );

    default:
      return realtimeConversationItemMessageSerializer(item);
  }
}

export function realtimeConversationItemMessageUnionDeserializer(
  item: any,
): RealtimeConversationItemMessageUnion {
  switch (item["role"]) {
    case "system":
      return realtimeConversationItemMessageSystemDeserializer(
        item as RealtimeConversationItemMessageSystem,
      );

    case "user":
      return realtimeConversationItemMessageUserDeserializer(
        item as RealtimeConversationItemMessageUser,
      );

    case "assistant":
      return realtimeConversationItemMessageAssistantDeserializer(
        item as RealtimeConversationItemMessageAssistant,
      );

    default:
      return realtimeConversationItemMessageDeserializer(item);
  }
}

/** Type of RealtimeConversationItemMessageType */
export type RealtimeConversationItemMessageType = "system" | "user" | "assistant";

/** A system message in a Realtime conversation can be used to provide additional context or instructions to the model. This is similar but distinct from the instruction prompt provided at the start of a conversation, as system messages can be added at any point in the conversation. For major changes to the conversation's behavior, use instructions, but for smaller updates (e.g. "the user is now asking about a different topic"), use system messages. */
export interface RealtimeConversationItemMessageSystem extends RealtimeConversationItemMessage {
  /** The unique ID of the item. This may be provided by the client or generated by the server. */
  id?: string;
  /** Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item. */
  object?: "realtime.item";
  /** The type of the item. Always `message`. */
  type: "message";
  /** The status of the item. Has no effect on the conversation. */
  status?: "completed" | "incomplete" | "in_progress";
  /** The role of the message sender. Always `system`. */
  role: "system";
  /** The content of the message. */
  content: RealtimeConversationItemMessageSystemContent[];
  /** The Unix timestamp (in seconds) for when the item was persisted. */
  readonly created_at?: Date;
  /** The id of the response that produced this item, when applicable. */
  readonly response_id?: string;
}

export function realtimeConversationItemMessageSystemSerializer(
  item: RealtimeConversationItemMessageSystem,
): any {
  return {
    role: item["role"],
    type: item["type"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    content: realtimeConversationItemMessageSystemContentArraySerializer(item["content"]),
  };
}

export function realtimeConversationItemMessageSystemDeserializer(
  item: any,
): RealtimeConversationItemMessageSystem {
  return {
    role: item["role"],
    type: item["type"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    content: realtimeConversationItemMessageSystemContentArrayDeserializer(item["content"]),
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    response_id: item["response_id"],
  };
}

export function realtimeConversationItemMessageSystemContentArraySerializer(
  result: Array<RealtimeConversationItemMessageSystemContent>,
): any[] {
  return result.map((item) => {
    return realtimeConversationItemMessageSystemContentSerializer(item);
  });
}

export function realtimeConversationItemMessageSystemContentArrayDeserializer(
  result: Array<RealtimeConversationItemMessageSystemContent>,
): any[] {
  return result.map((item) => {
    return realtimeConversationItemMessageSystemContentDeserializer(item);
  });
}

/** model interface RealtimeConversationItemMessageSystemContent */
export interface RealtimeConversationItemMessageSystemContent {
  type?: "input_text";
  text?: string;
}

export function realtimeConversationItemMessageSystemContentSerializer(
  item: RealtimeConversationItemMessageSystemContent,
): any {
  return { type: item["type"], text: item["text"] };
}

export function realtimeConversationItemMessageSystemContentDeserializer(
  item: any,
): RealtimeConversationItemMessageSystemContent {
  return {
    type: item["type"],
    text: item["text"],
  };
}

/** A user message item in a Realtime conversation. */
export interface RealtimeConversationItemMessageUser extends RealtimeConversationItemMessage {
  /** The unique ID of the item. This may be provided by the client or generated by the server. */
  id?: string;
  /** Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item. */
  object?: "realtime.item";
  /** The type of the item. Always `message`. */
  type: "message";
  /** The status of the item. Has no effect on the conversation. */
  status?: "completed" | "incomplete" | "in_progress";
  /** The role of the message sender. Always `user`. */
  role: "user";
  /** The content of the message. */
  content: RealtimeConversationItemMessageUserContent[];
  /** The Unix timestamp (in seconds) for when the item was persisted. */
  readonly created_at?: Date;
  /** The id of the response that produced this item, when applicable. */
  readonly response_id?: string;
}

export function realtimeConversationItemMessageUserSerializer(
  item: RealtimeConversationItemMessageUser,
): any {
  return {
    role: item["role"],
    type: item["type"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    content: realtimeConversationItemMessageUserContentArraySerializer(item["content"]),
  };
}

export function realtimeConversationItemMessageUserDeserializer(
  item: any,
): RealtimeConversationItemMessageUser {
  return {
    role: item["role"],
    type: item["type"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    content: realtimeConversationItemMessageUserContentArrayDeserializer(item["content"]),
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    response_id: item["response_id"],
  };
}

export function realtimeConversationItemMessageUserContentArraySerializer(
  result: Array<RealtimeConversationItemMessageUserContent>,
): any[] {
  return result.map((item) => {
    return realtimeConversationItemMessageUserContentSerializer(item);
  });
}

export function realtimeConversationItemMessageUserContentArrayDeserializer(
  result: Array<RealtimeConversationItemMessageUserContent>,
): any[] {
  return result.map((item) => {
    return realtimeConversationItemMessageUserContentDeserializer(item);
  });
}

/** model interface RealtimeConversationItemMessageUserContent */
export interface RealtimeConversationItemMessageUserContent {
  type?: "input_text" | "input_audio" | "input_image";
  text?: string;
  audio?: string;
  image_url?: string;
  detail?: "auto" | "low" | "high";
  transcript?: string;
}

export function realtimeConversationItemMessageUserContentSerializer(
  item: RealtimeConversationItemMessageUserContent,
): any {
  return {
    type: item["type"],
    text: item["text"],
    audio: item["audio"],
    image_url: item["image_url"],
    detail: item["detail"],
    transcript: item["transcript"],
  };
}

export function realtimeConversationItemMessageUserContentDeserializer(
  item: any,
): RealtimeConversationItemMessageUserContent {
  return {
    type: item["type"],
    text: item["text"],
    audio: item["audio"],
    image_url: item["image_url"],
    detail: item["detail"],
    transcript: item["transcript"],
  };
}

/** An assistant message item in a Realtime conversation. */
export interface RealtimeConversationItemMessageAssistant extends RealtimeConversationItemMessage {
  /** The unique ID of the item. This may be provided by the client or generated by the server. */
  id?: string;
  /** Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item. */
  object?: "realtime.item";
  /** The type of the item. Always `message`. */
  type: "message";
  /** The status of the item. Has no effect on the conversation. */
  status?: "completed" | "incomplete" | "in_progress";
  /** The role of the message sender. Always `assistant`. */
  role: "assistant";
  /** The content of the message. */
  content: RealtimeConversationItemMessageAssistantContent[];
  /** The Unix timestamp (in seconds) for when the item was persisted. */
  readonly created_at?: Date;
  /** The id of the response that produced this item, when applicable. */
  readonly response_id?: string;
}

export function realtimeConversationItemMessageAssistantSerializer(
  item: RealtimeConversationItemMessageAssistant,
): any {
  return {
    role: item["role"],
    type: item["type"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    content: realtimeConversationItemMessageAssistantContentArraySerializer(item["content"]),
  };
}

export function realtimeConversationItemMessageAssistantDeserializer(
  item: any,
): RealtimeConversationItemMessageAssistant {
  return {
    role: item["role"],
    type: item["type"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    content: realtimeConversationItemMessageAssistantContentArrayDeserializer(item["content"]),
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    response_id: item["response_id"],
  };
}

export function realtimeConversationItemMessageAssistantContentArraySerializer(
  result: Array<RealtimeConversationItemMessageAssistantContent>,
): any[] {
  return result.map((item) => {
    return realtimeConversationItemMessageAssistantContentSerializer(item);
  });
}

export function realtimeConversationItemMessageAssistantContentArrayDeserializer(
  result: Array<RealtimeConversationItemMessageAssistantContent>,
): any[] {
  return result.map((item) => {
    return realtimeConversationItemMessageAssistantContentDeserializer(item);
  });
}

/** model interface RealtimeConversationItemMessageAssistantContent */
export interface RealtimeConversationItemMessageAssistantContent {
  type?: "output_text" | "output_audio";
  text?: string;
  audio?: string;
  transcript?: string;
}

export function realtimeConversationItemMessageAssistantContentSerializer(
  item: RealtimeConversationItemMessageAssistantContent,
): any {
  return {
    type: item["type"],
    text: item["text"],
    audio: item["audio"],
    transcript: item["transcript"],
  };
}

export function realtimeConversationItemMessageAssistantContentDeserializer(
  item: any,
): RealtimeConversationItemMessageAssistantContent {
  return {
    type: item["type"],
    text: item["text"],
    audio: item["audio"],
    transcript: item["transcript"],
  };
}

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
  type: RealtimeMCPErrorType;
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
  | RealtimeMCPHttpError
  | RealtimeMCPError;

export function realtimeMCPErrorUnionSerializer(item: RealtimeMCPErrorUnion): any {
  switch (item.type) {
    case "protocol_error":
      return realtimeMCPProtocolErrorSerializer(item as RealtimeMCPProtocolError);

    case "tool_execution_error":
      return realtimeMCPToolExecutionErrorSerializer(item as RealtimeMCPToolExecutionError);

    case "http_error":
      return realtimeMCPHttpErrorSerializer(item as RealtimeMCPHttpError);

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
      return realtimeMCPHttpErrorDeserializer(item as RealtimeMCPHttpError);

    default:
      return realtimeMCPErrorDeserializer(item);
  }
}

/** Type of RealtimeMCPErrorType */
export type RealtimeMCPErrorType = "protocol_error" | "tool_execution_error" | "http_error";

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

/** model interface RealtimeMCPHttpError */
export interface RealtimeMCPHttpError extends RealtimeMCPError {
  type: "http_error";
  code: number;
  message: string;
}

export function realtimeMCPHttpErrorSerializer(item: RealtimeMCPHttpError): any {
  return { type: item["type"], code: item["code"], message: item["message"] };
}

export function realtimeMCPHttpErrorDeserializer(item: any): RealtimeMCPHttpError {
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

/** Alias for _VoiceResponseBaseMaxOutputTokens */
export type _VoiceResponseBaseMaxOutputTokens = number | "inf";

export function _voiceResponseBaseMaxOutputTokensSerializer(
  item: _VoiceResponseBaseMaxOutputTokens,
): any {
  return item;
}

export function _voiceResponseBaseMaxOutputTokensDeserializer(
  item: any,
): _VoiceResponseBaseMaxOutputTokens {
  return item;
}

/** model interface ResponseUsageInputTokensDetails */
export interface ResponseUsageInputTokensDetails {
  cached_tokens: number;
  cache_write_tokens: number;
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
  | VoiceAgentClientEventRtcCallSdpCreate
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

    case "rtc.call.sdp.create":
      return voiceAgentClientEventRtcCallSdpCreateSerializer(
        item as VoiceAgentClientEventRtcCallSdpCreate,
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

    case "rtc.call.sdp.create":
      return voiceAgentClientEventRtcCallSdpCreateDeserializer(
        item as VoiceAgentClientEventRtcCallSdpCreate,
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
  | "session.avatar.connect"
  | "rtc.call.sdp.create";

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
  | VoiceAgentServerEventSessionSubagentStarted
  | VoiceAgentServerEventSessionSubagentCompleted
  | VoiceAgentServerEventSessionSubagentAborted
  | VoiceAgentServerEventWarning
  | VoiceAgentServerEventSessionAvatarConnecting
  | VoiceAgentServerEventRtcCallSdpCreated
  | VoiceAgentServerEventRtcCallError
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

    case "session.subagent.started":
      return voiceAgentServerEventSessionSubagentStartedSerializer(
        item as VoiceAgentServerEventSessionSubagentStarted,
      );

    case "session.subagent.completed":
      return voiceAgentServerEventSessionSubagentCompletedSerializer(
        item as VoiceAgentServerEventSessionSubagentCompleted,
      );

    case "session.subagent.aborted":
      return voiceAgentServerEventSessionSubagentAbortedSerializer(
        item as VoiceAgentServerEventSessionSubagentAborted,
      );

    case "warning":
      return voiceAgentServerEventWarningSerializer(item as VoiceAgentServerEventWarning);

    case "session.avatar.connecting":
      return voiceAgentServerEventSessionAvatarConnectingSerializer(
        item as VoiceAgentServerEventSessionAvatarConnecting,
      );

    case "rtc.call.sdp.created":
      return voiceAgentServerEventRtcCallSdpCreatedSerializer(
        item as VoiceAgentServerEventRtcCallSdpCreated,
      );

    case "rtc.call.error":
      return voiceAgentServerEventRtcCallErrorSerializer(item as VoiceAgentServerEventRtcCallError);

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

    case "session.subagent.started":
      return voiceAgentServerEventSessionSubagentStartedDeserializer(
        item as VoiceAgentServerEventSessionSubagentStarted,
      );

    case "session.subagent.completed":
      return voiceAgentServerEventSessionSubagentCompletedDeserializer(
        item as VoiceAgentServerEventSessionSubagentCompleted,
      );

    case "session.subagent.aborted":
      return voiceAgentServerEventSessionSubagentAbortedDeserializer(
        item as VoiceAgentServerEventSessionSubagentAborted,
      );

    case "warning":
      return voiceAgentServerEventWarningDeserializer(item as VoiceAgentServerEventWarning);

    case "session.avatar.connecting":
      return voiceAgentServerEventSessionAvatarConnectingDeserializer(
        item as VoiceAgentServerEventSessionAvatarConnecting,
      );

    case "rtc.call.sdp.created":
      return voiceAgentServerEventRtcCallSdpCreatedDeserializer(
        item as VoiceAgentServerEventRtcCallSdpCreated,
      );

    case "rtc.call.error":
      return voiceAgentServerEventRtcCallErrorDeserializer(
        item as VoiceAgentServerEventRtcCallError,
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
  | "session.subagent.started"
  | "session.subagent.completed"
  | "session.subagent.aborted"
  | "session.avatar.connecting"
  | "session.avatar.switch_to_speaking"
  | "session.avatar.switch_to_idle"
  | "rtc.call.sdp.created"
  | "rtc.call.error"
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
  /** The languages detected in the audio. Returned by `gpt-transcribe`. An empty array indicates that no language could be reliably detected. */
  languages?: TranscriptionLanguage[];
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
    languages: !item["languages"]
      ? item["languages"]
      : transcriptionLanguageArraySerializer(item["languages"]),
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
    languages: !item["languages"]
      ? item["languages"]
      : transcriptionLanguageArrayDeserializer(item["languages"]),
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

export function transcriptionLanguageArraySerializer(result: Array<TranscriptionLanguage>): any[] {
  return result.map((item) => {
    return transcriptionLanguageSerializer(item);
  });
}

export function transcriptionLanguageArrayDeserializer(
  result: Array<TranscriptionLanguage>,
): any[] {
  return result.map((item) => {
    return transcriptionLanguageDeserializer(item);
  });
}

/** A language detected in transcribed audio. */
export interface TranscriptionLanguage {
  /** The code of a language detected in the audio. */
  code: string;
}

export function transcriptionLanguageSerializer(item: TranscriptionLanguage): any {
  return { code: item["code"] };
}

export function transcriptionLanguageDeserializer(item: any): TranscriptionLanguage {
  return {
    code: item["code"],
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
  /** The session-scoped conversation id. When present, responses attached to the session conversation use the same value in `response.created` and `response.done`. */
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
