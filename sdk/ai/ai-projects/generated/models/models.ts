// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FileContents, createFilePartDescriptor } from "../static-helpers/multipartHelpers.js";
import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";
import {
  Reasoning,
  reasoningSerializer,
  reasoningDeserializer,
  toolUnionArraySerializer,
  toolUnionArrayDeserializer,
  Tool,
  ToolUnion,
  MCPToolRequireApproval,
  MCPToolFilter,
  MCPTool,
  CallableToolAllowedCaller,
  RankingOptions,
  rankingOptionsSerializer,
  rankingOptionsDeserializer,
  Filters,
  filtersSerializer,
  filtersDeserializer,
  WebSearchToolFilters,
  webSearchToolFiltersSerializer,
  webSearchToolFiltersDeserializer,
  WebSearchApproximateLocation,
  webSearchApproximateLocationSerializer,
  webSearchApproximateLocationDeserializer,
  AutoCodeInterpreterToolParam,
  ContainerMemoryLimit,
  containerSkillUnionArraySerializer,
  containerSkillUnionArrayDeserializer,
  ContainerSkillUnion,
  ToolChoiceParamUnion,
  ToolChoiceFunction,
  ToolChoiceMCP,
  textResponseFormatUnionSerializer,
  textResponseFormatUnionDeserializer,
  TextResponseFormatUnion,
  realtimeAudioFormatsUnionSerializer,
  realtimeAudioFormatsUnionDeserializer,
  RealtimeAudioFormatsUnion,
  RealtimeFunctionToolParameters,
  realtimeFunctionToolParametersSerializer,
  realtimeFunctionToolParametersDeserializer,
  _voiceAgentMcpToolAllowedToolsSerializer,
  _voiceAgentMcpToolAllowedToolsDeserializer,
  _voiceAgentMcpToolRequireApprovalSerializer,
  _voiceAgentMcpToolRequireApprovalDeserializer,
  LiveInitialSessionAudioParam,
  liveInitialSessionAudioParamSerializer,
  liveInitialSessionAudioParamDeserializer,
  LiveResponsesDelegationSettingsInputParam,
  liveResponsesDelegationSettingsInputParamSerializer,
  liveResponsesDelegationSettingsInputParamDeserializer,
  ApiError,
  apiErrorDeserializer,
  chatCompletionToolArraySerializer,
  chatCompletionToolArrayDeserializer,
  ChatCompletionTool,
  CreateEvalJsonlRunDataSource,
  EvalJsonlFileContentSource,
  evalJsonlFileContentSourceSerializer,
  evalJsonlFileContentSourceDeserializer,
  EvalJsonlFileIdSource,
  CreateEvalCompletionsRunDataSource,
  CreateEvalCompletionsRunDataSourceInputMessagesItemReference,
  createEvalCompletionsRunDataSourceInputMessagesItemReferenceSerializer,
  createEvalCompletionsRunDataSourceInputMessagesItemReferenceDeserializer,
  Metadata,
  metadataSerializer,
  metadataDeserializer,
  evalJsonlFileIdSourceArraySerializer,
  evalJsonlFileIdSourceArrayDeserializer,
  ResponseUsageInputTokensDetails,
  responseUsageInputTokensDetailsDeserializer,
  ResponseUsageOutputTokensDetails,
  responseUsageOutputTokensDetailsDeserializer,
  RealtimeResponseUsage,
  realtimeResponseUsageSerializer,
  realtimeResponseUsageDeserializer,
  RealtimeResponseStatusDetails,
  realtimeResponseStatusDetailsSerializer,
  realtimeResponseStatusDetailsDeserializer,
  realtimeConversationItemUnionArraySerializer,
  realtimeConversationItemUnionArrayDeserializer,
  RealtimeConversationItem,
  realtimeConversationItemUnionSerializer,
  realtimeConversationItemUnionDeserializer,
  RealtimeConversationItemUnion,
  _voiceResponseMaxOutputTokensSerializer,
  _voiceResponseMaxOutputTokensDeserializer,
  LiveSessionUsage,
  liveSessionUsageDeserializer,
  RealtimeReasoning,
  realtimeReasoningSerializer,
  realtimeReasoningDeserializer,
  RealtimeServerEvent,
  RealtimeServerEventConversationItemCreated,
  RealtimeServerEventConversationItemDeleted,
  RealtimeServerEventConversationItemInputAudioTranscriptionCompleted,
  RealtimeServerEventConversationItemInputAudioTranscriptionDelta,
  RealtimeServerEventConversationItemInputAudioTranscriptionFailed,
  RealtimeServerEventConversationItemRetrieved,
  RealtimeServerEventConversationItemTruncated,
  RealtimeServerEventInputAudioBufferCleared,
  RealtimeServerEventInputAudioBufferCommitted,
  RealtimeServerEventInputAudioBufferSpeechStarted,
  RealtimeServerEventInputAudioBufferSpeechStopped,
  RealtimeServerEventRateLimitsUpdated,
  RealtimeServerEventResponseAudioDelta,
  RealtimeServerEventResponseAudioDone,
  RealtimeServerEventResponseAudioTranscriptDelta,
  RealtimeServerEventResponseAudioTranscriptDone,
  RealtimeServerEventResponseContentPartAdded,
  RealtimeServerEventResponseContentPartDone,
  RealtimeServerEventResponseCreated,
  RealtimeServerEventResponseDone,
  RealtimeServerEventResponseFunctionCallArgumentsDelta,
  RealtimeServerEventResponseFunctionCallArgumentsDone,
  RealtimeServerEventResponseOutputItemAdded,
  RealtimeServerEventResponseOutputItemDone,
  RealtimeServerEventResponseTextDelta,
  RealtimeServerEventResponseTextDone,
  RealtimeServerEventSessionCreated,
  RealtimeServerEventSessionUpdated,
  RealtimeServerEventOutputAudioBufferCleared,
  RealtimeServerEventConversationItemAdded,
  RealtimeServerEventConversationItemDone,
  RealtimeServerEventInputAudioBufferTimeoutTriggered,
  RealtimeServerEventConversationItemInputAudioTranscriptionSegment,
  RealtimeServerEventMCPListToolsInProgress,
  RealtimeServerEventMCPListToolsCompleted,
  RealtimeServerEventMCPListToolsFailed,
  RealtimeServerEventResponseMCPCallArgumentsDelta,
  RealtimeServerEventResponseMCPCallArgumentsDone,
  RealtimeServerEventResponseMCPCallInProgress,
  RealtimeServerEventResponseMCPCallCompleted,
  RealtimeServerEventResponseMCPCallFailed,
  RealtimeServerEventErrorError,
  realtimeServerEventErrorErrorSerializer,
  realtimeServerEventErrorErrorDeserializer,
  RealtimeClientEvent,
  RealtimeClientEventConversationItemCreate,
  RealtimeClientEventConversationItemDelete,
  RealtimeClientEventConversationItemRetrieve,
  RealtimeClientEventConversationItemTruncate,
  RealtimeClientEventInputAudioBufferAppend,
  RealtimeClientEventInputAudioBufferClear,
  RealtimeClientEventOutputAudioBufferClear,
  RealtimeClientEventInputAudioBufferCommit,
  RealtimeClientEventResponseCancel,
  RealtimeClientEventResponseCreate,
  _voiceAgentResponseCreateParamsToolArraySerializer,
  _voiceAgentResponseCreateParamsToolArrayDeserializer,
  RealtimeFunctionTool,
  _voiceAgentResponseCreateParamsToolChoiceSerializer,
  _voiceAgentResponseCreateParamsToolChoiceDeserializer,
  ToolChoiceOptions,
  _voiceAgentResponseCreateParamsMaxOutputTokensSerializer,
  _voiceAgentResponseCreateParamsMaxOutputTokensDeserializer,
  realtimeResponseInputItemArraySerializer,
  realtimeResponseInputItemArrayDeserializer,
  RealtimeResponseInputItem,
  ModelIdsLive,
  liveInitialItemUnionArrayDeserializer,
  LiveInitialItemUnion,
  liveDecisionTriggerInputParamArrayDeserializer,
  LiveDecisionTriggerInputParam,
  LiveClientConfigParam,
  liveClientConfigParamDeserializer,
  RealtimeServerEventError,
} from "./openAI/models.js";
import {
  PickPropertiesVoiceAgentAudioConfig,
  pickPropertiesVoiceAgentAudioConfigSerializer,
  pickPropertiesVoiceAgentAudioConfigDeserializer,
} from "./typeSpec/models.js";
import { ErrorModel } from "@azure-rest/core-client";
import { NodeReadableStream } from "@azure/core-rest-pipeline";

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
  /** The administrative configuration state of the agent. This reflects whether the agent was explicitly enabled or disabled, independently of identity-derived operational state. */
  readonly configuration_state: AgentState;
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
    configuration_state: item["configuration_state"],
    state_source: item["state_source"],
    versions: _agentObjectVersionsDeserializer(item["versions"]),
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
    draft: item["draft"],
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
  | ExternalAgentDefinition
  | VoiceAgentBaseDefinitionUnion
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
      return voiceAgentBaseDefinitionUnionSerializer(item as VoiceAgentBaseDefinitionUnion);

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
      return voiceAgentBaseDefinitionUnionDeserializer(item as VoiceAgentBaseDefinitionUnion);

    default:
      return agentDefinitionDeserializer(item);
  }
}

/** Type of AgentKind */
export type AgentKind = "prompt" | "hosted" | "workflow" | "external" | "voice";

/** Configuration for Responsible AI (RAI) content filtering and safety features. */
export interface RaiConfig {
  /** The name of the RAI policy to apply. */
  rai_policy_name: string;
  /**
   * Author-declared configuration telling the platform where user/agent text lives in the
   * agent-defined invocations request/response bodies, so content-safety guardrails can extract
   * and moderate it. Optional; a rai_config without it leaves the invocations path without
   * content-safety moderation.
   */
  invocations_moderation?: RaiInvocationModeration;
}

export function raiConfigSerializer(item: RaiConfig): any {
  return {
    rai_policy_name: item["rai_policy_name"],
    invocations_moderation: !item["invocations_moderation"]
      ? item["invocations_moderation"]
      : raiInvocationModerationSerializer(item["invocations_moderation"]),
  };
}

export function raiConfigDeserializer(item: any): RaiConfig {
  return {
    rai_policy_name: item["rai_policy_name"],
    invocations_moderation: !item["invocations_moderation"]
      ? item["invocations_moderation"]
      : raiInvocationModerationDeserializer(item["invocations_moderation"]),
  };
}

/** Declares where request/response text lives so content-safety guardrails can extract it. */
export interface RaiInvocationModeration {
  /** How the REQUEST body is parsed. When omitted, the service defaults to `json`. */
  input_content_type?: RaiInvocationContentType;
  /** How the RESPONSE body is parsed. When omitted, the service defaults to `json`. */
  output_content_type?: RaiInvocationContentType;
  /** Author-declared response shape; drives which output gate runs and which fields are required. */
  response_mode: RaiInvocationMode;
  /** Path(s) to user text in the REQUEST body. Required when input_content_type is `json`. */
  input_paths?: string[];
  /** Path(s) to agent text in a NON-STREAMING response body. Required when response_mode is non_streaming/both and output_content_type is `json`. */
  output_paths?: string[];
  /** One SSE event->field selector per event type carrying text. Required when response_mode is streaming/both and output_content_type is `json`. */
  stream_selectors?: RaiSseTextSelector[];
}

export function raiInvocationModerationSerializer(item: RaiInvocationModeration): any {
  return {
    input_content_type: item["input_content_type"],
    output_content_type: item["output_content_type"],
    response_mode: item["response_mode"],
    input_paths: !item["input_paths"]
      ? item["input_paths"]
      : item["input_paths"].map((p: any) => {
          return p;
        }),
    output_paths: !item["output_paths"]
      ? item["output_paths"]
      : item["output_paths"].map((p: any) => {
          return p;
        }),
    stream_selectors: !item["stream_selectors"]
      ? item["stream_selectors"]
      : raiSseTextSelectorArraySerializer(item["stream_selectors"]),
  };
}

export function raiInvocationModerationDeserializer(item: any): RaiInvocationModeration {
  return {
    input_content_type: item["input_content_type"],
    output_content_type: item["output_content_type"],
    response_mode: item["response_mode"],
    input_paths: !item["input_paths"]
      ? item["input_paths"]
      : item["input_paths"].map((p: any) => {
          return p;
        }),
    output_paths: !item["output_paths"]
      ? item["output_paths"]
      : item["output_paths"].map((p: any) => {
          return p;
        }),
    stream_selectors: !item["stream_selectors"]
      ? item["stream_selectors"]
      : raiSseTextSelectorArrayDeserializer(item["stream_selectors"]),
  };
}

/** How an invocations request/response body is parsed to locate text for content-safety moderation. */
export type RaiInvocationContentType = "json" | "text";

/** Author-declared response shape for the invocations protocol. */
export type RaiInvocationMode = "non_streaming" | "streaming" | "both";

export function raiSseTextSelectorArraySerializer(result: Array<RaiSseTextSelector>): any[] {
  return result.map((item) => {
    return raiSseTextSelectorSerializer(item);
  });
}

export function raiSseTextSelectorArrayDeserializer(result: Array<RaiSseTextSelector>): any[] {
  return result.map((item) => {
    return raiSseTextSelectorDeserializer(item);
  });
}

/** An SSE event-type to text-field selector for streaming invocation output. */
export interface RaiSseTextSelector {
  /** The SSE event `type` value that carries text. */
  event_type: string;
  /** The field on a matched event holding the text delta. When omitted, the service defaults to `delta`. */
  text_field?: string;
}

export function raiSseTextSelectorSerializer(item: RaiSseTextSelector): any {
  return { event_type: item["event_type"], text_field: item["text_field"] };
}

export function raiSseTextSelectorDeserializer(item: any): RaiSseTextSelector {
  return {
    event_type: item["event_type"],
    text_field: item["text_field"],
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
  /** Whether this agent version uses memory snapshots. Sessions for a snapshot-enabled version start from a snapshot of the agent's initialized process rather than starting the process from its image. Defaults to false. */
  enable_memory_snapshot?: boolean;
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
    enable_memory_snapshot: item["enable_memory_snapshot"],
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
    environment_variables: !item["environment_variables"]
      ? item["environment_variables"]
      : Object.fromEntries(
          Object.entries(item["environment_variables"]).map(([k, p]: [string, any]) => [k, p]),
        ),
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
    enable_memory_snapshot: item["enable_memory_snapshot"],
  };
}

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
  protocol: AgentEndpointProtocol;
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

/** Type of AgentEndpointProtocol */
export type AgentEndpointProtocol =
  | "activity"
  | "responses"
  | "a2a"
  | "mcp"
  | "invocations"
  | "voice"
  | "invocations_ws"
  | "voice_conversation_engine";

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

/** Session defaults applied to sessions created for a hosted agent version. */
export interface SessionConfiguration {
  /**
   * The idle duration, in seconds, before a session's sandbox is suspended. When omitted,
   * the server defaults to 900 seconds. Must be between 120 and 14400 seconds (4 hours).
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

/** The prompt agent definition */
export interface PromptAgentDefinition extends AgentDefinition {
  kind: "prompt";
  /** The managed runtime and agent loop used to execute this prompt agent. */
  harness?: AgentHarnessUnion;
  /** The model deployment to use for this agent. */
  model: string;
  /** A system (or developer) message inserted into the model's context. */
  instructions?: string;
  /** The Foundry skills available to this prompt agent. An omitted skill version is resolved and pinned when the agent version is created. */
  skills?: SkillReference[];
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
    harness: !item["harness"] ? item["harness"] : agentHarnessUnionSerializer(item["harness"]),
    model: item["model"],
    instructions: item["instructions"],
    skills: !item["skills"] ? item["skills"] : skillReferenceArraySerializer(item["skills"]),
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
    harness: !item["harness"] ? item["harness"] : agentHarnessUnionDeserializer(item["harness"]),
    model: item["model"],
    instructions: item["instructions"],
    skills: !item["skills"] ? item["skills"] : skillReferenceArrayDeserializer(item["skills"]),
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

/** A managed runtime and agent loop used to execute a prompt agent. */
export interface AgentHarness {
  /** The type of managed harness. */
  /** The discriminator possible values: microsoft_copilot_preview, github_copilot_preview */
  type: string;
}

export function agentHarnessSerializer(item: AgentHarness): any {
  return { type: item["type"] };
}

export function agentHarnessDeserializer(item: any): AgentHarness {
  return {
    type: item["type"],
  };
}

/** Alias for AgentHarnessUnion */
export type AgentHarnessUnion = MicrosoftCopilotHarness | GitHubCopilotHarness | AgentHarness;

export function agentHarnessUnionSerializer(item: AgentHarnessUnion): any {
  switch (item.type) {
    case "microsoft_copilot_preview":
      return microsoftCopilotHarnessSerializer(item as MicrosoftCopilotHarness);

    case "github_copilot_preview":
      return gitHubCopilotHarnessSerializer(item as GitHubCopilotHarness);

    default:
      return agentHarnessSerializer(item);
  }
}

export function agentHarnessUnionDeserializer(item: any): AgentHarnessUnion {
  switch (item["type"]) {
    case "microsoft_copilot_preview":
      return microsoftCopilotHarnessDeserializer(item as MicrosoftCopilotHarness);

    case "github_copilot_preview":
      return gitHubCopilotHarnessDeserializer(item as GitHubCopilotHarness);

    default:
      return agentHarnessDeserializer(item);
  }
}

/** The Microsoft Copilot managed harness for prompt agents. */
export interface MicrosoftCopilotHarness extends AgentHarness {
  /** The type of managed harness. Always `microsoft_copilot_preview`. */
  type: "microsoft_copilot_preview";
}

export function microsoftCopilotHarnessSerializer(item: MicrosoftCopilotHarness): any {
  return { type: item["type"] };
}

export function microsoftCopilotHarnessDeserializer(item: any): MicrosoftCopilotHarness {
  return {
    type: item["type"],
  };
}

/** The legacy GitHub Copilot managed harness retained for compatibility. Use `MicrosoftCopilotHarness` for new prompt agents. */
export interface GitHubCopilotHarness extends AgentHarness {
  /** The legacy type of managed harness. Always `github_copilot_preview`; use `microsoft_copilot_preview` for new prompt agents. */
  type: "github_copilot_preview";
}

export function gitHubCopilotHarnessSerializer(item: GitHubCopilotHarness): any {
  return { type: item["type"] };
}

export function gitHubCopilotHarnessDeserializer(item: any): GitHubCopilotHarness {
  return {
    type: item["type"],
  };
}

export function skillReferenceArraySerializer(result: Array<SkillReference>): any[] {
  return result.map((item) => {
    return skillReferenceSerializer(item);
  });
}

export function skillReferenceArrayDeserializer(result: Array<SkillReference>): any[] {
  return result.map((item) => {
    return skillReferenceDeserializer(item);
  });
}

/** A reference to a versioned Foundry skill. */
export interface SkillReference {
  /** The name of the skill. */
  name: string;
  /** The skill version. If omitted, the current default version is resolved and pinned when the agent version is created. */
  version?: string;
}

export function skillReferenceSerializer(item: SkillReference): any {
  return { name: item["name"], version: item["version"] };
}

export function skillReferenceDeserializer(item: any): SkillReference {
  return {
    name: item["name"],
    version: item["version"],
  };
}

/** Configuration overrides for Microsoft Copilot built-in tools. */
export interface MicrosoftCopilotToolsetPreview extends Tool {
  /** The type of the toolset. Always `microsoft_copilot_toolset_preview`. */
  type: "microsoft_copilot_toolset_preview";
  /** The default configuration for built-in tools. If omitted, built-in tools are enabled by default. */
  default_config?: MicrosoftCopilotToolsetDefaultConfig;
  /** Per-tool configuration overrides. Duplicate built-in tool names are not allowed. */
  configs?: MicrosoftCopilotToolsetConfig[];
}

export function microsoftCopilotToolsetPreviewSerializer(
  item: MicrosoftCopilotToolsetPreview,
): any {
  return {
    type: item["type"],
    default_config: !item["default_config"]
      ? item["default_config"]
      : microsoftCopilotToolsetDefaultConfigSerializer(item["default_config"]),
    configs: !item["configs"]
      ? item["configs"]
      : microsoftCopilotToolsetConfigArraySerializer(item["configs"]),
  };
}

export function microsoftCopilotToolsetPreviewDeserializer(
  item: any,
): MicrosoftCopilotToolsetPreview {
  return {
    type: item["type"],
    default_config: !item["default_config"]
      ? item["default_config"]
      : microsoftCopilotToolsetDefaultConfigDeserializer(item["default_config"]),
    configs: !item["configs"]
      ? item["configs"]
      : microsoftCopilotToolsetConfigArrayDeserializer(item["configs"]),
  };
}

/** The default enablement setting for Microsoft Copilot built-in tools. */
export interface MicrosoftCopilotToolsetDefaultConfig {
  /** Whether built-in tools are enabled by default. Defaults to true. */
  enabled?: boolean;
}

export function microsoftCopilotToolsetDefaultConfigSerializer(
  item: MicrosoftCopilotToolsetDefaultConfig,
): any {
  return { enabled: item["enabled"] };
}

export function microsoftCopilotToolsetDefaultConfigDeserializer(
  item: any,
): MicrosoftCopilotToolsetDefaultConfig {
  return {
    enabled: item["enabled"],
  };
}

export function microsoftCopilotToolsetConfigArraySerializer(
  result: Array<MicrosoftCopilotToolsetConfig>,
): any[] {
  return result.map((item) => {
    return microsoftCopilotToolsetConfigSerializer(item);
  });
}

export function microsoftCopilotToolsetConfigArrayDeserializer(
  result: Array<MicrosoftCopilotToolsetConfig>,
): any[] {
  return result.map((item) => {
    return microsoftCopilotToolsetConfigDeserializer(item);
  });
}

/** An enablement override for a Microsoft Copilot built-in tool. */
export interface MicrosoftCopilotToolsetConfig {
  /** The built-in tool to configure. */
  name: MicrosoftCopilotBuiltInTool;
  /** Whether the built-in tool is enabled. If omitted, the toolset default applies. */
  enabled?: boolean;
}

export function microsoftCopilotToolsetConfigSerializer(item: MicrosoftCopilotToolsetConfig): any {
  return { name: item["name"], enabled: item["enabled"] };
}

export function microsoftCopilotToolsetConfigDeserializer(
  item: any,
): MicrosoftCopilotToolsetConfig {
  return {
    name: item["name"],
    enabled: item["enabled"],
  };
}

/** A customer-configurable Microsoft Copilot built-in tool. */
export type MicrosoftCopilotBuiltInTool =
  "filesystem_read" | "filesystem_write" | "shell" | "web" | "subagents";

/** The legacy GitHub Copilot toolset retained for compatibility. Use `MicrosoftCopilotToolsetPreview` for new integrations. */
export interface GitHubCopilotToolsetPreview extends Tool {
  /** The legacy type of the toolset. Always `github_copilot_toolset_preview`; use `microsoft_copilot_toolset_preview` for new integrations. */
  type: "github_copilot_toolset_preview";
  /** The default configuration for built-in tools. If omitted, built-in tools are enabled by default. */
  default_config?: GitHubCopilotToolsetDefaultConfig;
  /** Per-tool configuration overrides. Duplicate built-in tool names are not allowed. */
  configs?: GitHubCopilotToolsetConfig[];
}

export function gitHubCopilotToolsetPreviewSerializer(item: GitHubCopilotToolsetPreview): any {
  return {
    type: item["type"],
    default_config: !item["default_config"]
      ? item["default_config"]
      : gitHubCopilotToolsetDefaultConfigSerializer(item["default_config"]),
    configs: !item["configs"]
      ? item["configs"]
      : gitHubCopilotToolsetConfigArraySerializer(item["configs"]),
  };
}

export function gitHubCopilotToolsetPreviewDeserializer(item: any): GitHubCopilotToolsetPreview {
  return {
    type: item["type"],
    default_config: !item["default_config"]
      ? item["default_config"]
      : gitHubCopilotToolsetDefaultConfigDeserializer(item["default_config"]),
    configs: !item["configs"]
      ? item["configs"]
      : gitHubCopilotToolsetConfigArrayDeserializer(item["configs"]),
  };
}

/** The legacy default enablement setting retained for compatibility. Use `MicrosoftCopilotToolsetDefaultConfig` for new integrations. */
export interface GitHubCopilotToolsetDefaultConfig {
  /** Whether built-in tools are enabled by default. Defaults to true. */
  enabled?: boolean;
}

export function gitHubCopilotToolsetDefaultConfigSerializer(
  item: GitHubCopilotToolsetDefaultConfig,
): any {
  return { enabled: item["enabled"] };
}

export function gitHubCopilotToolsetDefaultConfigDeserializer(
  item: any,
): GitHubCopilotToolsetDefaultConfig {
  return {
    enabled: item["enabled"],
  };
}

export function gitHubCopilotToolsetConfigArraySerializer(
  result: Array<GitHubCopilotToolsetConfig>,
): any[] {
  return result.map((item) => {
    return gitHubCopilotToolsetConfigSerializer(item);
  });
}

export function gitHubCopilotToolsetConfigArrayDeserializer(
  result: Array<GitHubCopilotToolsetConfig>,
): any[] {
  return result.map((item) => {
    return gitHubCopilotToolsetConfigDeserializer(item);
  });
}

/** The legacy per-tool enablement override retained for compatibility. Use `MicrosoftCopilotToolsetConfig` for new integrations. */
export interface GitHubCopilotToolsetConfig {
  /** The built-in tool to configure. */
  name: GitHubCopilotBuiltInTool;
  /** Whether the built-in tool is enabled. If omitted, the toolset default applies. */
  enabled?: boolean;
}

export function gitHubCopilotToolsetConfigSerializer(item: GitHubCopilotToolsetConfig): any {
  return { name: item["name"], enabled: item["enabled"] };
}

export function gitHubCopilotToolsetConfigDeserializer(item: any): GitHubCopilotToolsetConfig {
  return {
    name: item["name"],
    enabled: item["enabled"],
  };
}

/** The legacy GitHub Copilot built-in tool names retained for compatibility. Use `MicrosoftCopilotBuiltInTool` for new integrations. */
export type GitHubCopilotBuiltInTool =
  "filesystem_read" | "filesystem_write" | "shell" | "web" | "subagents";

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

/**
 * The input definition information for a Browser Automation Tool, as used to configure an Agent.
 * BrowserAutomationPreviewTool is deprecated.
 * Please use BrowserAutomationTool instead.
 * See https://aka.ms/bat/docs for more information on Browser automation tool.
 */
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

/** The input definition information for a Browser Automation Tool, as used to configure an Agent. */
export interface BrowserAutomationTool extends Tool {
  /** The object type, which is always 'browser_automation'. */
  type: "browser_automation";
  /** The Browser Automation Tool parameters. */
  browser_automation: BrowserAutomationToolParameters;
}

export function browserAutomationToolSerializer(item: BrowserAutomationTool): any {
  return {
    type: item["type"],
    browser_automation: browserAutomationToolParametersSerializer(item["browser_automation"]),
  };
}

export function browserAutomationToolDeserializer(item: any): BrowserAutomationTool {
  return {
    type: item["type"],
    browser_automation: browserAutomationToolParametersDeserializer(item["browser_automation"]),
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

/** A WorkIQ server-side tool. */
export interface WorkIQPreviewTool extends Tool {
  /** The object type, which is always 'work_iq_preview'. */
  type: "work_iq_preview";
  /** The ID of the WorkIQ project connection. */
  project_connection_id: string;
}

export function workIQPreviewToolSerializer(item: WorkIQPreviewTool): any {
  return { type: item["type"], project_connection_id: item["project_connection_id"] };
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
  /** Whether the input property is required when the agent is invoked. The service defaults to `false` if a value is not specified by the caller. */
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

/**
 * The workflow agent definition. Microsoft Foundry is retiring workflows on December 1, 2026.
 * If you're looking to build new workflows, use Microsoft Agent Framework. To migrate existing workflows,
 * see the [Migration guide](https://learn.microsoft.com/azure/foundry/agents/concepts/workflow#migration-guide).
 */
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

/**
 * Shared voice-agent settings; protocol-specific fields remain flat on each subtype.
 * Creates and updates produce immutable versions. Each version selects its own protocol, so a new version can switch between Realtime and Live.
 */
export interface VoiceAgentBaseDefinition extends AgentDefinition {
  /** Always voice. */
  kind: "voice";
  /** The voice protocol for this agent version. Null and unknown values are invalid. */
  /** The discriminator possible values: realtime, live */
  sub_protocol: VoiceAgentSubProtocol;
  /** Frontend instructions, templated with structured_inputs. Backend instructions belong in delegation.responses. */
  instructions?: string;
  /** Template inputs for session instructions and supported greetings. */
  structured_inputs?: Record<string, StructuredInputDefinition>;
  /** Persists conversation content and audio in Foundry, not native Live recordings. Defaults to false. */
  store?: boolean;
}

export function voiceAgentBaseDefinitionSerializer(item: VoiceAgentBaseDefinition): any {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"] ? item["rai_config"] : raiConfigSerializer(item["rai_config"]),
    sub_protocol: item["sub_protocol"],
    instructions: item["instructions"],
    structured_inputs: !item["structured_inputs"]
      ? item["structured_inputs"]
      : structuredInputDefinitionRecordSerializer(item["structured_inputs"]),
    store: item["store"],
  };
}

export function voiceAgentBaseDefinitionDeserializer(item: any): VoiceAgentBaseDefinition {
  return {
    kind: item["kind"],
    rai_config: !item["rai_config"]
      ? item["rai_config"]
      : raiConfigDeserializer(item["rai_config"]),
    sub_protocol: item["sub_protocol"],
    instructions: item["instructions"],
    structured_inputs: !item["structured_inputs"]
      ? item["structured_inputs"]
      : structuredInputDefinitionRecordDeserializer(item["structured_inputs"]),
    store: item["store"],
  };
}

/** Alias for VoiceAgentBaseDefinitionUnion */
export type VoiceAgentBaseDefinitionUnion =
  VoiceAgentDefinition | VoiceAgentLiveDefinition | VoiceAgentBaseDefinition;

export function voiceAgentBaseDefinitionUnionSerializer(item: VoiceAgentBaseDefinitionUnion): any {
  switch (item.subProtocol) {
    case "realtime":
      return voiceAgentDefinitionSerializer(item as VoiceAgentDefinition);

    case "live":
      return voiceAgentLiveDefinitionSerializer(item as VoiceAgentLiveDefinition);

    default:
      return voiceAgentBaseDefinitionSerializer(item);
  }
}

export function voiceAgentBaseDefinitionUnionDeserializer(
  item: any,
): VoiceAgentBaseDefinitionUnion {
  switch (item["sub_protocol"]) {
    case "realtime":
      return voiceAgentDefinitionDeserializer(item as VoiceAgentDefinition);

    case "live":
      return voiceAgentLiveDefinitionDeserializer(item as VoiceAgentLiveDefinition);

    default:
      return voiceAgentBaseDefinitionDeserializer(item);
  }
}

/** Voice protocol; realtime includes cascaded models. */
export type VoiceAgentSubProtocol = "realtime" | "live";

/**
 * The voice agent definition. Its configuration (model, instructions, audio, tools, and optional avatar) drives a
 * managed speech-to-speech experience. Establish realtime voice sessions through
 * `GET /agents/{agent_name}/endpoint/protocols/voice`. Every create or update produces a new immutable version.
 */
export interface VoiceAgentDefinition extends VoiceAgentBaseDefinition {
  /** Selects the Realtime protocol. */
  sub_protocol: "realtime";
  /** How the model backing this voice agent is served. Required with `model` for a model-backed voice agent and omitted when `conversation_engine` is provided. This is independent of the architecture (realtime or cascaded), which the service derives from the selected model. */
  model_type?: VoiceModelType;
  /** The model to use for this agent. Required with `model_type` for a model-backed voice agent and omitted when `conversation_engine` is provided. The model must support realtime or cascaded voice. */
  model?: string;
  /** The engine that owns conversation handling for this voice agent. Exactly one of this property and the model-backed configuration (`model_type` with `model`) must be provided. When this property is provided, `model_type`, `model`, `instructions`, `tools`, and `tool_choice` must be omitted, and `greeting.tool_choice` cannot be `required`, because the engine owns the conversation logic. The initial implementation supports a hosted-agent engine. */
  conversation_engine?: VoiceConversationEngineUnion;
  /** Optional session-start greeting. Template mode speaks exact rendered text; LLM-generated mode asks the session model to author the opening response and may use configured tools. */
  greeting?: VoiceAgentGreetingConfigUnion;
  /**
   * The audio configuration, including input and output formats, voice, turn detection, noise reduction, and
   * transcription. These values are session defaults; a client may override supported fields when connecting.
   */
  audio?: VoiceAgentAudioConfig;
  /** Optional background ambience and event cues, stored with the agent version and separate from the audio configuration. Currently rendered only for telephony calls, not browser WebRTC or direct voice WebSocket sessions. Omit this property to disable all auxiliary audio. Persisted conversation recordings do not include the soundscape mix. */
  soundscape?: VoiceAgentSoundscapeConfig;
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
  /** Optional subagent configuration. Set `subagent_type` to `delegate` for delegated background specialists or `inline` for inline voice subagents. */
  subagent_config?: VoiceAgentSubagentConfigUnion;
  /** Optional post-call delivery configuration. After each session ends, the service notifies the configured destinations. Post-call delivery is in preview and requires `VoiceAgents=V1Preview`. */
  post_call?: VoiceAgentPostCallConfig;
}

export function voiceAgentDefinitionSerializer(item: VoiceAgentDefinition): any {
  return {
    kind: item["kind"],
    sub_protocol: item["sub_protocol"],
    instructions: item["instructions"],
    structured_inputs: !item["structured_inputs"]
      ? item["structured_inputs"]
      : structuredInputDefinitionRecordSerializer(item["structured_inputs"]),
    store: item["store"],
    rai_config: !item["rai_config"] ? item["rai_config"] : raiConfigSerializer(item["rai_config"]),
    model_type: item["model_type"],
    model: item["model"],
    conversation_engine: !item["conversation_engine"]
      ? item["conversation_engine"]
      : voiceConversationEngineUnionSerializer(item["conversation_engine"]),
    greeting: !item["greeting"]
      ? item["greeting"]
      : voiceAgentGreetingConfigUnionSerializer(item["greeting"]),
    audio: !item["audio"] ? item["audio"] : voiceAgentAudioConfigSerializer(item["audio"]),
    soundscape: !item["soundscape"]
      ? item["soundscape"]
      : voiceAgentSoundscapeConfigSerializer(item["soundscape"]),
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
    subagent_config: !item["subagent_config"]
      ? item["subagent_config"]
      : voiceAgentSubagentConfigUnionSerializer(item["subagent_config"]),
    post_call: !item["post_call"]
      ? item["post_call"]
      : voiceAgentPostCallConfigSerializer(item["post_call"]),
  };
}

export function voiceAgentDefinitionDeserializer(item: any): VoiceAgentDefinition {
  return {
    kind: item["kind"],
    sub_protocol: item["sub_protocol"],
    instructions: item["instructions"],
    structured_inputs: !item["structured_inputs"]
      ? item["structured_inputs"]
      : structuredInputDefinitionRecordDeserializer(item["structured_inputs"]),
    store: item["store"],
    rai_config: !item["rai_config"]
      ? item["rai_config"]
      : raiConfigDeserializer(item["rai_config"]),
    model_type: item["model_type"],
    model: item["model"],
    conversation_engine: !item["conversation_engine"]
      ? item["conversation_engine"]
      : voiceConversationEngineUnionDeserializer(item["conversation_engine"]),
    greeting: !item["greeting"]
      ? item["greeting"]
      : voiceAgentGreetingConfigUnionDeserializer(item["greeting"]),
    audio: !item["audio"] ? item["audio"] : voiceAgentAudioConfigDeserializer(item["audio"]),
    soundscape: !item["soundscape"]
      ? item["soundscape"]
      : voiceAgentSoundscapeConfigDeserializer(item["soundscape"]),
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
    subagent_config: !item["subagent_config"]
      ? item["subagent_config"]
      : voiceAgentSubagentConfigUnionDeserializer(item["subagent_config"]),
    post_call: !item["post_call"]
      ? item["post_call"]
      : voiceAgentPostCallConfigDeserializer(item["post_call"]),
  };
}

/**
 * How the model backing a voice agent is served. This is independent of the architecture (realtime or cascaded),
 * which the service derives from the selected model.
 */
export type VoiceModelType = "managed" | "self_deployed";

/** An engine that owns conversation handling for a voice agent. */
export interface VoiceConversationEngine {
  /** The conversation engine type. */
  /** The discriminator possible values: hosted_agent */
  type: VoiceConversationEngineType;
}

export function voiceConversationEngineSerializer(item: VoiceConversationEngine): any {
  return { type: item["type"] };
}

export function voiceConversationEngineDeserializer(item: any): VoiceConversationEngine {
  return {
    type: item["type"],
  };
}

/** Alias for VoiceConversationEngineUnion */
export type VoiceConversationEngineUnion =
  VoiceHostedAgentConversationEngine | VoiceConversationEngine;

export function voiceConversationEngineUnionSerializer(item: VoiceConversationEngineUnion): any {
  switch (item.type) {
    case "hosted_agent":
      return voiceHostedAgentConversationEngineSerializer(
        item as VoiceHostedAgentConversationEngine,
      );

    default:
      return voiceConversationEngineSerializer(item);
  }
}

export function voiceConversationEngineUnionDeserializer(item: any): VoiceConversationEngineUnion {
  switch (item["type"]) {
    case "hosted_agent":
      return voiceHostedAgentConversationEngineDeserializer(
        item as VoiceHostedAgentConversationEngine,
      );

    default:
      return voiceConversationEngineDeserializer(item);
  }
}

/** The conversation engine types supported by a voice agent. */
export type VoiceConversationEngineType = "hosted_agent";

/** A closed reference to the hosted text agent that owns conversation handling for a voice agent. The hosted agent is resolved within the same project and must declare `voice_conversation_engine` version `1.0.0`. Voice Live connects through the dedicated voice-conversation-engine endpoint using the existing Bridge Protocol 1.0 wire semantics; the Bridge message version is independent of the container protocol version and the Hosted Agents API version `v1`. Declaring `invocations_ws` is optional and does not substitute for `voice_conversation_engine`. */
export interface VoiceHostedAgentConversationEngine extends VoiceConversationEngine {
  /** Selects a hosted Foundry agent as the conversation engine. */
  type: "hosted_agent";
  /** The non-empty DNS-like name of the target hosted text agent in the same project. */
  name: string;
  /** The target agent version. Omit this property to select the latest version when the voice session starts. When supplied, use a positive integer or `draft-{positive-unix-timestamp}` whose numeric component fits in a signed 64-bit integer. */
  version?: string;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function voiceHostedAgentConversationEngineSerializer(
  item: VoiceHostedAgentConversationEngine,
): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    type: item["type"],
    name: item["name"],
    version: item["version"],
  };
}

export function voiceHostedAgentConversationEngineDeserializer(
  item: any,
): VoiceHostedAgentConversationEngine {
  return {
    additionalProperties: serializeRecord(item, ["type", "name", "version"]),
    type: item["type"],
    name: item["name"],
    version: item["version"],
  };
}

/** Session-start greeting configuration for a voice agent. */
export interface VoiceAgentGreetingConfig {
  /** The greeting mode. */
  /** The discriminator possible values: template, llm_generated */
  type: VoiceAgentGreetingMode;
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

/** The greeting modes supported by a voice agent. */
export type VoiceAgentGreetingMode = "template" | "llm_generated";

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

/**
 * Input audio noise reduction configuration. `azure_deep_noise_suppression_headset` and
 * `azure_personal_noise_suppression` are modes for local voice activity detection that
 * enhance detection audio without changing the audio used for recognition.
 */
export interface VoiceAgentNoiseReduction {
  /**
   * The noise reduction mode. `azure_deep_noise_suppression_headset` provides
   * headset-optimized noise suppression for local voice activity detection, optimized for
   * low-sample-rate audio including 8 kHz telephony audio without changing recognition audio (not
   * restricted to headset devices). `azure_personal_noise_suppression` starts with headset
   * suppression for local voice activity detection and personalizes detection after automatic speaker
   * enrollment while keeping recognition audio unchanged and keeping headset suppression active when
   * personalization is unavailable.
   */
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

/**
 * The input audio noise reduction mode.
 * - `azure_deep_noise_suppression_headset`: Azure headset-optimized noise suppression for local voice activity detection. Optimized for low-sample-rate audio, including 8 kHz telephony audio. Enhances detection audio without changing the audio used for recognition. The mode is not restricted to headset devices.
 * - `azure_personal_noise_suppression`: Azure personalized noise suppression for local voice activity detection. Starts with headset suppression and personalizes detection after automatic speaker enrollment. Recognition audio is unchanged; headset suppression remains active when personalization is unavailable.
 */
export type VoiceAgentNoiseReductionType =
  | "near_field"
  | "far_field"
  | "azure_deep_noise_suppression"
  | "azure_deep_noise_suppression_headset"
  | "azure_personal_noise_suppression";

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
 * Settings for transcribing input audio, including the transcription model, Custom Speech deployments,
 * and phrase hints.
 * When `model` is `azure-speech-streaming`, transcription is supported for cascaded text-model
 * conversations only (not realtime speech-to-speech models), requires a nonempty `language` such as
 * `en-US` (comma-separated locales are supported), and supports `custom_speech`, `phrase_list`, and
 * `profanity_filter`.
 */
export interface VoiceAgentInputTranscription {
  /**
   * The language of the input audio. Supplying the input language in
   * [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format
   * will improve accuracy and latency. Optional for other transcription models; required and must be
   * nonempty when `model` is `azure-speech-streaming` (such as `en-US`; comma-separated locales are
   * supported).
   */
  language?: string;
  /** Possible languages of the input audio, in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. Supported by `gpt-transcribe` and `gpt-live-transcribe`. */
  languages?: string[];
  /** Words or phrases to guide transcription of the input audio. Supported by `gpt-transcribe` and `gpt-live-transcribe`. */
  keywords?: string[];
  /**
   * An optional text to guide the model's style or continue a previous audio
   *   segment.
   *   For `whisper-1`, the [prompt is a list of keywords](https://developers.openai.com/api/docs/guides/speech-to-text#prompting).
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
  /** The transcription model identifier. Configure customer custom speech deployments in `custom_speech`. `azure-speech-streaming` is for cascaded text-model conversations only (not realtime speech-to-speech models), requires a nonempty `language` such as `en-US` (comma-separated locales are supported), and supports `custom_speech`, `phrase_list`, and `profanity_filter`. */
  model: VoiceAgentInputTranscriptionModel;
  /** Optional customer custom speech deployment configuration, keyed by locale. */
  custom_speech?: Record<string, string>;
  /** Optional phrase hints that bias recognition toward domain terms. */
  phrase_list?: string[];
  /**
   * Controls how profanity is handled in input transcripts. Supported only with managed Azure Speech
   * (`azure-speech` and `azure-speech-streaming`), including Custom Speech.
   * Set this property before the session starts. If omitted, the transcription provider's default applies.
   * You cannot change the mode during a session.
   * Filtering affects transcript events and the text sent to cascaded models. It does not change input
   * audio, voice activity detection, or assistant speech; audio-native models still receive the original
   * audio. Mandatory service masking policies apply even when you select `unfiltered`.
   */
  profanity_filter?: VoiceAgentProfanityFilterMode;
}

export function voiceAgentInputTranscriptionSerializer(item: VoiceAgentInputTranscription): any {
  return {
    language: item["language"],
    languages: !item["languages"]
      ? item["languages"]
      : item["languages"].map((p: any) => {
          return p;
        }),
    keywords: !item["keywords"]
      ? item["keywords"]
      : item["keywords"].map((p: any) => {
          return p;
        }),
    prompt: item["prompt"],
    delay: item["delay"],
    model: item["model"],
    custom_speech: item["custom_speech"],
    phrase_list: !item["phrase_list"]
      ? item["phrase_list"]
      : item["phrase_list"].map((p: any) => {
          return p;
        }),
    profanity_filter: item["profanity_filter"],
  };
}

export function voiceAgentInputTranscriptionDeserializer(item: any): VoiceAgentInputTranscription {
  return {
    language: item["language"],
    languages: !item["languages"]
      ? item["languages"]
      : item["languages"].map((p: any) => {
          return p;
        }),
    keywords: !item["keywords"]
      ? item["keywords"]
      : item["keywords"].map((p: any) => {
          return p;
        }),
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
    profanity_filter: item["profanity_filter"],
  };
}

/**
 * The input-audio transcription model identifier. This is a model name, not a Foundry deployment name. Mirrors the transcription models supported by the managed
 * voice backend, covering the OpenAI Realtime transcription models plus the Azure and MAI models.
 * `azure-speech-streaming` is supported for cascaded text-model conversations only (not realtime speech-to-speech models), requires a nonempty `language` such as `en-US` (comma-separated locales are supported), and supports `custom_speech`, `phrase_list`, and `profanity_filter`.
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
  | "azure-speech"
  | "azure-speech-streaming";

/** The supported input-transcript profanity filtering modes. */
export type VoiceAgentProfanityFilterMode = "masked" | "unfiltered" | "removed";

/**
 * Output audio configuration for a voice agent. Extends the voice configuration with the session-level `format` and
 * `output_audio_timestamp_types` settings, which apply to every voice type.
 */
export interface VoiceAgentAudioOutputConfig extends VoiceAgentVoiceConfig {
  /** The output audio format. Applies to every `voice_type` and defaults to 24 kHz PCM. */
  format?: RealtimeAudioFormatsUnion;
  /** Timestamp kinds to include with output audio. Applies to every `voice_type`. */
  output_audio_timestamp_types?: VoiceAgentAudioTimestampType[];
}

export function voiceAgentAudioOutputConfigSerializer(item: VoiceAgentAudioOutputConfig): any {
  return {
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
    format: !item["format"] ? item["format"] : realtimeAudioFormatsUnionSerializer(item["format"]),
    output_audio_timestamp_types: !item["output_audio_timestamp_types"]
      ? item["output_audio_timestamp_types"]
      : item["output_audio_timestamp_types"].map((p: any) => {
          return p;
        }),
  };
}

export function voiceAgentAudioOutputConfigDeserializer(item: any): VoiceAgentAudioOutputConfig {
  return {
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
    format: !item["format"]
      ? item["format"]
      : realtimeAudioFormatsUnionDeserializer(item["format"]),
    output_audio_timestamp_types: !item["output_audio_timestamp_types"]
      ? item["output_audio_timestamp_types"]
      : item["output_audio_timestamp_types"].map((p: any) => {
          return p;
        }),
  };
}

/** An output-audio timestamp kind supported by a voice agent. */
export type VoiceAgentAudioTimestampType = "word";

/** Agent-owned background ambience and event cues. Each omitted track is disabled. The service rejects unknown fields; custom uploads, URLs, and inline audio are not supported. */
export interface VoiceAgentSoundscapeConfig {
  /** Continuous background ambience that continues during caller and agent speech. */
  background?: VoiceAgentSoundscapeTrackConfig;
  /** A loop played while a non-call-control tool is pending and the agent is silent, after the configured delay. */
  working?: VoiceAgentSoundscapeWorkingTrackConfig;
  /** An interruptible cue played before the first agent speech. */
  opening?: VoiceAgentSoundscapeTrackConfig;
  /** A one-shot cue played after queued agent speech drains and before a committed call transfer. */
  transfer?: VoiceAgentSoundscapeTrackConfig;
  /** A one-shot cue played after queued agent speech drains and before a committed session end. */
  closing?: VoiceAgentSoundscapeTrackConfig;
}

export function voiceAgentSoundscapeConfigSerializer(item: VoiceAgentSoundscapeConfig): any {
  return {
    background: !item["background"]
      ? item["background"]
      : voiceAgentSoundscapeTrackConfigSerializer(item["background"]),
    working: !item["working"]
      ? item["working"]
      : voiceAgentSoundscapeWorkingTrackConfigSerializer(item["working"]),
    opening: !item["opening"]
      ? item["opening"]
      : voiceAgentSoundscapeTrackConfigSerializer(item["opening"]),
    transfer: !item["transfer"]
      ? item["transfer"]
      : voiceAgentSoundscapeTrackConfigSerializer(item["transfer"]),
    closing: !item["closing"]
      ? item["closing"]
      : voiceAgentSoundscapeTrackConfigSerializer(item["closing"]),
  };
}

export function voiceAgentSoundscapeConfigDeserializer(item: any): VoiceAgentSoundscapeConfig {
  return {
    background: !item["background"]
      ? item["background"]
      : voiceAgentSoundscapeTrackConfigDeserializer(item["background"]),
    working: !item["working"]
      ? item["working"]
      : voiceAgentSoundscapeWorkingTrackConfigDeserializer(item["working"]),
    opening: !item["opening"]
      ? item["opening"]
      : voiceAgentSoundscapeTrackConfigDeserializer(item["opening"]),
    transfer: !item["transfer"]
      ? item["transfer"]
      : voiceAgentSoundscapeTrackConfigDeserializer(item["transfer"]),
    closing: !item["closing"]
      ? item["closing"]
      : voiceAgentSoundscapeTrackConfigDeserializer(item["closing"]),
  };
}

/** A soundscape track with its own audio source and playback volume. */
export interface VoiceAgentSoundscapeTrackConfig {
  /** The required audio source for this track. */
  source: VoiceAgentSoundscapeSourceConfig;
  /** Linear playback gain from 0 to 1, independent of agent speech volume. If omitted, the service defaults to 1. A value of 0 mutes this track. */
  gain?: number;
}

export function voiceAgentSoundscapeTrackConfigSerializer(
  item: VoiceAgentSoundscapeTrackConfig,
): any {
  return { source: voiceAgentSoundscapeSourceConfigSerializer(item["source"]), gain: item["gain"] };
}

export function voiceAgentSoundscapeTrackConfigDeserializer(
  item: any,
): VoiceAgentSoundscapeTrackConfig {
  return {
    source: voiceAgentSoundscapeSourceConfigDeserializer(item["source"]),
    gain: item["gain"],
  };
}

/** A packaged sound selected from the service-managed catalogue. The service rejects unknown source fields and discriminator values. */
export interface VoiceAgentSoundscapeSourceConfig {
  /** The audio source type. Always `built_in`. */
  type: "built_in";
  /** The name of the packaged sound. Only the listed built-in sounds are accepted. */
  name: VoiceAgentSoundscapeSound;
}

export function voiceAgentSoundscapeSourceConfigSerializer(
  item: VoiceAgentSoundscapeSourceConfig,
): any {
  return { type: item["type"], name: item["name"] };
}

export function voiceAgentSoundscapeSourceConfigDeserializer(
  item: any,
): VoiceAgentSoundscapeSourceConfig {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** The packaged sounds accepted by a built-in soundscape source. */
export type VoiceAgentSoundscapeSound =
  | "office"
  | "call_center"
  | "busy_street"
  | "people_talking"
  | "street_and_metro_station"
  | "ding1"
  | "ding2";

/** A working-loop track with a delay measured from the first pending non-call-control tool. */
export interface VoiceAgentSoundscapeWorkingTrackConfig {
  /** The required audio source for this track. */
  source: VoiceAgentSoundscapeSourceConfig;
  /** Linear playback gain from 0 to 1, independent of agent speech volume. If omitted, the service defaults to 1. A value of 0 mutes this track. */
  gain?: number;
  /** The delay in milliseconds before working audio starts, from 0 to 10000. If omitted, the service defaults to 1000 milliseconds. This delays only working audio, not tool execution, and is valid only on the working track. */
  delay_ms?: number;
}

export function voiceAgentSoundscapeWorkingTrackConfigSerializer(
  item: VoiceAgentSoundscapeWorkingTrackConfig,
): any {
  return {
    source: voiceAgentSoundscapeSourceConfigSerializer(item["source"]),
    gain: item["gain"],
    delay_ms: item["delay_ms"],
  };
}

export function voiceAgentSoundscapeWorkingTrackConfigDeserializer(
  item: any,
): VoiceAgentSoundscapeWorkingTrackConfig {
  return {
    source: voiceAgentSoundscapeSourceConfigDeserializer(item["source"]),
    gain: item["gain"],
    delay_ms: item["delay_ms"],
  };
}

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
  type: VoiceAgentInterimResponseType;
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

/** The interim-response implementations supported by a voice agent. */
export type VoiceAgentInterimResponseType = "static_interim_response" | "llm_interim_response";

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
export type VoiceAgentAvatarOutputProtocol = "webrtc" | "websocket";

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
  type: VoiceAgentToolType;
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
  | VoiceAgentSystemToolUnion
  | VoiceAgentToolboxTool
  | VoiceAgentTool;

export function voiceAgentToolUnionSerializer(item: VoiceAgentToolUnion): any {
  switch (item.type) {
    case "function":
      return voiceAgentFunctionToolSerializer(item as VoiceAgentFunctionTool);

    case "mcp":
      return voiceAgentMcpToolSerializer(item as VoiceAgentMcpTool);

    case "system":
      return voiceAgentSystemToolUnionSerializer(item as VoiceAgentSystemToolUnion);

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
      return voiceAgentSystemToolUnionDeserializer(item as VoiceAgentSystemToolUnion);

    case "toolbox":
      return voiceAgentToolboxToolDeserializer(item as VoiceAgentToolboxTool);

    default:
      return voiceAgentToolDeserializer(item);
  }
}

/** The tool kinds supported by a voice agent. */
export type VoiceAgentToolType = "function" | "mcp" | "system" | "toolbox";

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

/** An MCP tool available to a voice agent. Server endpoints use `server_url`; connector and tunnel identifiers are not supported. */
export interface VoiceAgentMcpTool extends VoiceAgentTool {
  /** A label for this MCP server, used to identify it in tool calls. */
  server_label: string;
  /**
   * The URL for the MCP server. One of `server_url`, `connector_id`, or
   *   `tunnel_id` must be provided.
   */
  server_url?: string;
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
  /** When the MCP invocation creates a follow-up response. Defaults to `when_idle`. */
  response_scheduling?: VoiceAgentToolResponseScheduling;
}

export function voiceAgentMcpToolSerializer(item: VoiceAgentMcpTool): any {
  return {
    type: item["type"],
    server_label: item["server_label"],
    server_url: item["server_url"],
    authorization: item["authorization"],
    server_description: item["server_description"],
    headers: item["headers"],
    allowed_tools: !item["allowed_tools"]
      ? item["allowed_tools"]
      : _voiceAgentMcpToolAllowedToolsSerializer(item["allowed_tools"]),
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p: any) => {
          return p;
        }),
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _voiceAgentMcpToolRequireApprovalSerializer(item["require_approval"]),
    defer_loading: item["defer_loading"],
    project_connection_id: item["project_connection_id"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    response_scheduling: item["response_scheduling"],
  };
}

export function voiceAgentMcpToolDeserializer(item: any): VoiceAgentMcpTool {
  return {
    type: item["type"],
    server_label: item["server_label"],
    server_url: item["server_url"],
    authorization: item["authorization"],
    server_description: item["server_description"],
    headers: !item["headers"]
      ? item["headers"]
      : Object.fromEntries(
          Object.entries(item["headers"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
    allowed_tools: !item["allowed_tools"]
      ? item["allowed_tools"]
      : _voiceAgentMcpToolAllowedToolsDeserializer(item["allowed_tools"]),
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p1: any) => {
          return p1;
        }),
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _voiceAgentMcpToolRequireApprovalDeserializer(item["require_approval"]),
    defer_loading: item["defer_loading"],
    project_connection_id: item["project_connection_id"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
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
  /** The discriminator possible values: end_conversation, language_detection, digit_recognition, collect_sms, collect_dtmf, transfer, send_dtmf, send_sms */
  name: VoiceAgentSystemToolName;
  /** An optional description of the system tool. */
  description?: string;
  /** The execution timeout in seconds, from 1 to 300. If omitted, the service defaults to 60 seconds. */
  timeout_seconds?: number;
}

export function voiceAgentSystemToolSerializer(item: VoiceAgentSystemTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    timeout_seconds: item["timeout_seconds"],
  };
}

export function voiceAgentSystemToolDeserializer(item: any): VoiceAgentSystemTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    timeout_seconds: item["timeout_seconds"],
  };
}

/** Alias for VoiceAgentSystemToolUnion */
export type VoiceAgentSystemToolUnion =
  | VoiceAgentEndConversationSystemTool
  | VoiceAgentLanguageDetectionSystemTool
  | VoiceAgentDigitRecognitionSystemTool
  | VoiceAgentCollectSmsSystemTool
  | VoiceAgentCollectDtmfSystemTool
  | VoiceAgentTransferSystemTool
  | VoiceAgentSendDtmfSystemTool
  | VoiceAgentSendSmsSystemTool
  | VoiceAgentSystemTool;

export function voiceAgentSystemToolUnionSerializer(item: VoiceAgentSystemToolUnion): any {
  switch (item.name) {
    case "end_conversation":
      return voiceAgentEndConversationSystemToolSerializer(
        item as VoiceAgentEndConversationSystemTool,
      );

    case "language_detection":
      return voiceAgentLanguageDetectionSystemToolSerializer(
        item as VoiceAgentLanguageDetectionSystemTool,
      );

    case "digit_recognition":
      return voiceAgentDigitRecognitionSystemToolSerializer(
        item as VoiceAgentDigitRecognitionSystemTool,
      );

    case "collect_sms":
      return voiceAgentCollectSmsSystemToolSerializer(item as VoiceAgentCollectSmsSystemTool);

    case "collect_dtmf":
      return voiceAgentCollectDtmfSystemToolSerializer(item as VoiceAgentCollectDtmfSystemTool);

    case "transfer":
      return voiceAgentTransferSystemToolSerializer(item as VoiceAgentTransferSystemTool);

    case "send_dtmf":
      return voiceAgentSendDtmfSystemToolSerializer(item as VoiceAgentSendDtmfSystemTool);

    case "send_sms":
      return voiceAgentSendSmsSystemToolSerializer(item as VoiceAgentSendSmsSystemTool);

    default:
      return voiceAgentSystemToolSerializer(item);
  }
}

export function voiceAgentSystemToolUnionDeserializer(item: any): VoiceAgentSystemToolUnion {
  switch (item["name"]) {
    case "end_conversation":
      return voiceAgentEndConversationSystemToolDeserializer(
        item as VoiceAgentEndConversationSystemTool,
      );

    case "language_detection":
      return voiceAgentLanguageDetectionSystemToolDeserializer(
        item as VoiceAgentLanguageDetectionSystemTool,
      );

    case "digit_recognition":
      return voiceAgentDigitRecognitionSystemToolDeserializer(
        item as VoiceAgentDigitRecognitionSystemTool,
      );

    case "collect_sms":
      return voiceAgentCollectSmsSystemToolDeserializer(item as VoiceAgentCollectSmsSystemTool);

    case "collect_dtmf":
      return voiceAgentCollectDtmfSystemToolDeserializer(item as VoiceAgentCollectDtmfSystemTool);

    case "transfer":
      return voiceAgentTransferSystemToolDeserializer(item as VoiceAgentTransferSystemTool);

    case "send_dtmf":
      return voiceAgentSendDtmfSystemToolDeserializer(item as VoiceAgentSendDtmfSystemTool);

    case "send_sms":
      return voiceAgentSendSmsSystemToolDeserializer(item as VoiceAgentSendSmsSystemTool);

    default:
      return voiceAgentSystemToolDeserializer(item);
  }
}

/** A service-managed voice-session control action. Known values are stable; additional values may be added over time. */
export type VoiceAgentSystemToolName =
  | "end_conversation"
  | "language_detection"
  | "digit_recognition"
  | "transfer"
  | "collect_sms"
  | "collect_dtmf"
  | "send_dtmf"
  | "send_sms";

/** A service-managed control that ends the active conversation. */
export interface VoiceAgentEndConversationSystemTool extends VoiceAgentSystemTool {
  /** The service-managed control action. Always `end_conversation`. */
  name: "end_conversation";
}

export function voiceAgentEndConversationSystemToolSerializer(
  item: VoiceAgentEndConversationSystemTool,
): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    timeout_seconds: item["timeout_seconds"],
  };
}

export function voiceAgentEndConversationSystemToolDeserializer(
  item: any,
): VoiceAgentEndConversationSystemTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    timeout_seconds: item["timeout_seconds"],
  };
}

/** Switches supported conversation language settings. */
export interface VoiceAgentLanguageDetectionSystemTool extends VoiceAgentSystemTool {
  /** The service-managed control action. Always `language_detection`. */
  name: "language_detection";
}

export function voiceAgentLanguageDetectionSystemToolSerializer(
  item: VoiceAgentLanguageDetectionSystemTool,
): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    timeout_seconds: item["timeout_seconds"],
  };
}

export function voiceAgentLanguageDetectionSystemToolDeserializer(
  item: any,
): VoiceAgentLanguageDetectionSystemTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    timeout_seconds: item["timeout_seconds"],
  };
}

/** Retrieves the unchanged transcript of the last user audio turn. */
export interface VoiceAgentDigitRecognitionSystemTool extends VoiceAgentSystemTool {
  /** The service-managed control action. Always `digit_recognition`. */
  name: "digit_recognition";
}

export function voiceAgentDigitRecognitionSystemToolSerializer(
  item: VoiceAgentDigitRecognitionSystemTool,
): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    timeout_seconds: item["timeout_seconds"],
  };
}

export function voiceAgentDigitRecognitionSystemToolDeserializer(
  item: any,
): VoiceAgentDigitRecognitionSystemTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    timeout_seconds: item["timeout_seconds"],
  };
}

/** Collects one complete SMS from an explicitly selected sender. */
export interface VoiceAgentCollectSmsSystemTool extends VoiceAgentSystemTool {
  /** The service-managed control action. Always `collect_sms`. */
  name: "collect_sms";
}

export function voiceAgentCollectSmsSystemToolSerializer(
  item: VoiceAgentCollectSmsSystemTool,
): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    timeout_seconds: item["timeout_seconds"],
  };
}

export function voiceAgentCollectSmsSystemToolDeserializer(
  item: any,
): VoiceAgentCollectSmsSystemTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    timeout_seconds: item["timeout_seconds"],
  };
}

/** Collects keypad digits on the current call. */
export interface VoiceAgentCollectDtmfSystemTool extends VoiceAgentSystemTool {
  /** The service-managed control action. Always `collect_dtmf`. */
  name: "collect_dtmf";
}

export function voiceAgentCollectDtmfSystemToolSerializer(
  item: VoiceAgentCollectDtmfSystemTool,
): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    timeout_seconds: item["timeout_seconds"],
  };
}

export function voiceAgentCollectDtmfSystemToolDeserializer(
  item: any,
): VoiceAgentCollectDtmfSystemTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    timeout_seconds: item["timeout_seconds"],
  };
}

/** Requests a transfer to an explicitly configured logical target. */
export interface VoiceAgentTransferSystemTool extends VoiceAgentSystemTool {
  /** The service-managed control action. Always `transfer`. */
  name: "transfer";
  /** Require a non-blank handoff summary in each model-generated transfer call. Defaults to false; does not guarantee delivery to the recipient. */
  require_handoff?: boolean;
  /** The non-empty set of logical targets that the model may select. */
  targets: VoiceAgentTransferTarget[];
}

export function voiceAgentTransferSystemToolSerializer(item: VoiceAgentTransferSystemTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    timeout_seconds: item["timeout_seconds"],
    require_handoff: item["require_handoff"],
    targets: voiceAgentTransferTargetArraySerializer(item["targets"]),
  };
}

export function voiceAgentTransferSystemToolDeserializer(item: any): VoiceAgentTransferSystemTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    timeout_seconds: item["timeout_seconds"],
    require_handoff: item["require_handoff"],
    targets: voiceAgentTransferTargetArrayDeserializer(item["targets"]),
  };
}

export function voiceAgentTransferTargetArraySerializer(
  result: Array<VoiceAgentTransferTarget>,
): any[] {
  return result.map((item) => {
    return voiceAgentTransferTargetSerializer(item);
  });
}

export function voiceAgentTransferTargetArrayDeserializer(
  result: Array<VoiceAgentTransferTarget>,
): any[] {
  return result.map((item) => {
    return voiceAgentTransferTargetDeserializer(item);
  });
}

/** A configured logical transfer target. Only its name and description are model-visible; destinations and routing are executor settings. */
export interface VoiceAgentTransferTarget {
  /** The non-blank logical target name. Names must be unique after trimming within the transfer tool. */
  name: string;
  /** A description that helps the model select this target. */
  description?: string;
  /** The concrete destinations for this transfer target. */
  destinations: VoiceAgentTransferDestination[];
  /** The trusted routing policy for this target. */
  routing: VoiceAgentTransferRouting;
}

export function voiceAgentTransferTargetSerializer(item: VoiceAgentTransferTarget): any {
  return {
    name: item["name"],
    description: item["description"],
    destinations: voiceAgentTransferDestinationArraySerializer(item["destinations"]),
    routing: voiceAgentTransferRoutingSerializer(item["routing"]),
  };
}

export function voiceAgentTransferTargetDeserializer(item: any): VoiceAgentTransferTarget {
  return {
    name: item["name"],
    description: item["description"],
    destinations: voiceAgentTransferDestinationArrayDeserializer(item["destinations"]),
    routing: voiceAgentTransferRoutingDeserializer(item["routing"]),
  };
}

export function voiceAgentTransferDestinationArraySerializer(
  result: Array<VoiceAgentTransferDestination>,
): any[] {
  return result.map((item) => {
    return voiceAgentTransferDestinationSerializer(item);
  });
}

export function voiceAgentTransferDestinationArrayDeserializer(
  result: Array<VoiceAgentTransferDestination>,
): any[] {
  return result.map((item) => {
    return voiceAgentTransferDestinationDeserializer(item);
  });
}

/** The canonical system-tool transfer destination. */
export interface VoiceAgentTransferDestination {
  /** The destination format: phone_number for an E.164 number, teams for a Teams identifier, or sip for a SIP URI. */
  type: VoiceAgentTransferDestinationType;
  /** The concrete address. Phone numbers use E.164; Teams and SIP identifiers are validated against the selected provider's capabilities. */
  value: string;
}

export function voiceAgentTransferDestinationSerializer(item: VoiceAgentTransferDestination): any {
  return { type: item["type"], value: item["value"] };
}

export function voiceAgentTransferDestinationDeserializer(
  item: any,
): VoiceAgentTransferDestination {
  return {
    type: item["type"],
    value: item["value"],
  };
}

/** The supported address formats for a system-tool transfer destination. */
export type VoiceAgentTransferDestinationType = "phone_number" | "teams" | "sip";

/** The configured transfer routing policy. The model selects a target name, not destinations or routing settings. */
export interface VoiceAgentTransferRouting {
  /** The routing strategy. Current native Telephony transfer supports ACS sequential and random routing only. */
  strategy: VoiceAgentTransferStrategy;
  /** The per-destination ring timeout in seconds, from 1 to 300. If omitted, the service defaults to 20 seconds. Must not exceed the tool's execution timeout. ACS allows at most 180 seconds. */
  ring_timeout_seconds?: number;
}

export function voiceAgentTransferRoutingSerializer(item: VoiceAgentTransferRouting): any {
  return { strategy: item["strategy"], ring_timeout_seconds: item["ring_timeout_seconds"] };
}

export function voiceAgentTransferRoutingDeserializer(item: any): VoiceAgentTransferRouting {
  return {
    strategy: item["strategy"],
    ring_timeout_seconds: item["ring_timeout_seconds"],
  };
}

/** Per-invocation transfer routing. Unsupported strategies are rejected before provider execution; schema membership does not imply support by every provider. */
export type VoiceAgentTransferStrategy = "sequential" | "random" | "parallel";

/** Sends literal or templated keypad digits. */
export interface VoiceAgentSendDtmfSystemTool extends VoiceAgentSystemTool {
  /** The service-managed control action. Always `send_dtmf`. */
  name: "send_dtmf";
}

export function voiceAgentSendDtmfSystemToolSerializer(item: VoiceAgentSendDtmfSystemTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    timeout_seconds: item["timeout_seconds"],
  };
}

export function voiceAgentSendDtmfSystemToolDeserializer(item: any): VoiceAgentSendDtmfSystemTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    timeout_seconds: item["timeout_seconds"],
  };
}

/** Sends a text message from the Agent's SMS-capable number. */
export interface VoiceAgentSendSmsSystemTool extends VoiceAgentSystemTool {
  /** The service-managed control action. Always `send_sms`. */
  name: "send_sms";
}

export function voiceAgentSendSmsSystemToolSerializer(item: VoiceAgentSendSmsSystemTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    timeout_seconds: item["timeout_seconds"],
  };
}

export function voiceAgentSendSmsSystemToolDeserializer(item: any): VoiceAgentSendSmsSystemTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    timeout_seconds: item["timeout_seconds"],
  };
}

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

/**
 * Configuration for delegated background specialists or inline voice subagents. For compatibility with existing
 * delegate configurations, the service treats an omitted `subagent_type` as `delegate`.
 */
export interface VoiceAgentSubagentConfig {
  /** The subagent mode. */
  /** The discriminator possible values: delegate, inline */
  subagentType: VoiceAgentSubagentType;
}

export function voiceAgentSubagentConfigSerializer(item: VoiceAgentSubagentConfig): any {
  return { subagent_type: item["subagentType"] };
}

export function voiceAgentSubagentConfigDeserializer(item: any): VoiceAgentSubagentConfig {
  return {
    subagentType: item["subagent_type"],
  };
}

/** Alias for VoiceAgentSubagentConfigUnion */
export type VoiceAgentSubagentConfigUnion =
  VoiceAgentDelegateSubagentConfig | VoiceAgentInlineSubagentConfig | VoiceAgentSubagentConfig;

export function voiceAgentSubagentConfigUnionSerializer(item: VoiceAgentSubagentConfigUnion): any {
  switch (item.subagentType) {
    case "delegate":
      return voiceAgentDelegateSubagentConfigSerializer(item as VoiceAgentDelegateSubagentConfig);

    case "inline":
      return voiceAgentInlineSubagentConfigSerializer(item as VoiceAgentInlineSubagentConfig);

    default:
      return voiceAgentSubagentConfigSerializer(item);
  }
}

export function voiceAgentSubagentConfigUnionDeserializer(
  item: any,
): VoiceAgentSubagentConfigUnion {
  switch (item["subagent_type"]) {
    case "delegate":
      return voiceAgentDelegateSubagentConfigDeserializer(item as VoiceAgentDelegateSubagentConfig);

    case "inline":
      return voiceAgentInlineSubagentConfigDeserializer(item as VoiceAgentInlineSubagentConfig);

    default:
      return voiceAgentSubagentConfigDeserializer(item);
  }
}

/** The subagent configuration mode. Additional modes may be added over time. */
export type VoiceAgentSubagentType = "delegate" | "inline";

/** Configuration for referenced Foundry agents invoked as delegated background specialists. */
export interface VoiceAgentDelegateSubagentConfig extends VoiceAgentSubagentConfig {
  /** The subagent mode for delegated background specialists. */
  subagentType: "delegate";
  /** The sibling Foundry text agents, in the same project, that this Voice Agent may consult. */
  subagents: VoiceAgentSubagent[];
}

export function voiceAgentDelegateSubagentConfigSerializer(
  item: VoiceAgentDelegateSubagentConfig,
): any {
  return {
    subagent_type: item["subagentType"],
    subagents: voiceAgentSubagentArraySerializer(item["subagents"]),
  };
}

export function voiceAgentDelegateSubagentConfigDeserializer(
  item: any,
): VoiceAgentDelegateSubagentConfig {
  return {
    subagentType: item["subagent_type"],
    subagents: voiceAgentSubagentArrayDeserializer(item["subagents"]),
  };
}

export function voiceAgentSubagentArraySerializer(result: Array<VoiceAgentSubagent>): any[] {
  return result.map((item) => {
    return voiceAgentSubagentSerializer(item);
  });
}

export function voiceAgentSubagentArrayDeserializer(result: Array<VoiceAgentSubagent>): any[] {
  return result.map((item) => {
    return voiceAgentSubagentDeserializer(item);
  });
}

/** A sibling Foundry text agent that a voice agent may consult as a background specialist. */
export interface VoiceAgentSubagent {
  /** The name of the subagent. The subagent must be in the same project as the voice agent. */
  agent_name: string;
  /** The version of the subagent. When omitted, the active version is used. */
  agent_version?: string;
  /** A description of the subagent's capabilities, used by the voice agent to decide whether to forward a query. */
  agent_capabilities: string;
  /** Policy for acknowledging forwarded requests and filling gaps while waiting for this subagent's response. */
  response_policy?: VoiceAgentSubagentResponsePolicy;
  /** The wall-clock timeout in seconds for each invocation of this subagent. When omitted, the service timeout is used. */
  invoke_timeout_seconds?: number;
}

export function voiceAgentSubagentSerializer(item: VoiceAgentSubagent): any {
  return {
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
    agent_capabilities: item["agent_capabilities"],
    response_policy: !item["response_policy"]
      ? item["response_policy"]
      : voiceAgentSubagentResponsePolicySerializer(item["response_policy"]),
    invoke_timeout_seconds: item["invoke_timeout_seconds"],
  };
}

export function voiceAgentSubagentDeserializer(item: any): VoiceAgentSubagent {
  return {
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
    agent_capabilities: item["agent_capabilities"],
    response_policy: !item["response_policy"]
      ? item["response_policy"]
      : voiceAgentSubagentResponsePolicyDeserializer(item["response_policy"]),
    invoke_timeout_seconds: item["invoke_timeout_seconds"],
  };
}

/** Policy for delivering responses while a voice agent waits for a subagent. */
export interface VoiceAgentSubagentResponsePolicy {
  /** Whether the voice agent provides an immediate acknowledgement before forwarding a request to a subagent. */
  immediate_ack?: boolean;
  /** The number of seconds without subagent content or user input before the voice agent provides a gap-filling response. */
  gap_filling_interval?: number;
  /** Instructions used to generate the immediate acknowledgement. */
  ack_instructions?: string;
  /** Instructions used to generate gap-filling speech while waiting for progress. */
  gap_filling_instructions?: string;
  /** Whether progress updates are emitted incrementally instead of only when the subagent invocation completes. Defaults to `false`. */
  enable_delta_progress?: boolean;
  /** Instructions used to summarize streamed subagent progress for speech. */
  progress_instructions?: string;
  /** The minimum number of seconds between spoken progress updates. */
  progress_update_interval?: number;
}

export function voiceAgentSubagentResponsePolicySerializer(
  item: VoiceAgentSubagentResponsePolicy,
): any {
  return {
    immediate_ack: item["immediate_ack"],
    gap_filling_interval: item["gap_filling_interval"],
    ack_instructions: item["ack_instructions"],
    gap_filling_instructions: item["gap_filling_instructions"],
    enable_delta_progress: item["enable_delta_progress"],
    progress_instructions: item["progress_instructions"],
    progress_update_interval: item["progress_update_interval"],
  };
}

export function voiceAgentSubagentResponsePolicyDeserializer(
  item: any,
): VoiceAgentSubagentResponsePolicy {
  return {
    immediate_ack: item["immediate_ack"],
    gap_filling_interval: item["gap_filling_interval"],
    ack_instructions: item["ack_instructions"],
    gap_filling_instructions: item["gap_filling_instructions"],
    enable_delta_progress: item["enable_delta_progress"],
    progress_instructions: item["progress_instructions"],
    progress_update_interval: item["progress_update_interval"],
  };
}

/** Configuration for inline voice subagents that may become active through Handoff. */
export interface VoiceAgentInlineSubagentConfig extends VoiceAgentSubagentConfig {
  /** The subagent mode for inline voice subagents. */
  subagentType: "inline";
  /**
   * Inline voice subagents owned and versioned with the parent Voice Agent. `$entrypoint` must be first, followed
   * by at least one specialist and at most 31 additional subagents. Each subagent declares its outgoing
   * `handoff_conditions`; condition identifiers and the 128-condition limit apply across the entire Agent.
   */
  subagents: InlineVoiceSubagent[];
  /** Session-wide Handoff limits. Requires `$entrypoint` with at least one outgoing condition. When omitted, the service permits up to 16 completed and 16 attempted handoffs. */
  handoff_policy?: VoiceAgentHandoffPolicy;
}

export function voiceAgentInlineSubagentConfigSerializer(
  item: VoiceAgentInlineSubagentConfig,
): any {
  return {
    subagent_type: item["subagentType"],
    subagents: inlineVoiceSubagentArraySerializer(item["subagents"]),
    handoff_policy: !item["handoff_policy"]
      ? item["handoff_policy"]
      : voiceAgentHandoffPolicySerializer(item["handoff_policy"]),
  };
}

export function voiceAgentInlineSubagentConfigDeserializer(
  item: any,
): VoiceAgentInlineSubagentConfig {
  return {
    subagentType: item["subagent_type"],
    subagents: inlineVoiceSubagentArrayDeserializer(item["subagents"]),
    handoff_policy: !item["handoff_policy"]
      ? item["handoff_policy"]
      : voiceAgentHandoffPolicyDeserializer(item["handoff_policy"]),
  };
}

export function inlineVoiceSubagentArraySerializer(result: Array<InlineVoiceSubagent>): any[] {
  return result.map((item) => {
    return inlineVoiceSubagentSerializer(item);
  });
}

export function inlineVoiceSubagentArrayDeserializer(result: Array<InlineVoiceSubagent>): any[] {
  return result.map((item) => {
    return inlineVoiceSubagentDeserializer(item);
  });
}

/** One inline voice subagent owned and versioned with its parent Voice Agent, not a separate Agent resource. */
export interface InlineVoiceSubagent {
  /** The subagent identifier. New Handoff authoring requires `$entrypoint` as the first subagent; other values use the normal handoff ID grammar. */
  id: string;
  /** The definition source. This phase supports only `inline`; referenced Agent resources are deferred. */
  source: "inline";
  /** The interaction interface. This phase supports only `voice`; text delegation is deferred. */
  interface: "voice";
  /** A non-empty display-only description of the specialist behavior. This value is not provided to the model. */
  display_description: string;
  /** The target model for a cascaded graph. Realtime graphs reject this property and retain the connection model. */
  model?: string;
  /** Subagent-specific instructions. With default inheritance, non-empty instructions follow the original top-level instructions. Omission, null, or an empty string adds nothing after that base. With inheritance disabled, only this value applies. */
  instructions?: string;
  /** Whether the subagent inherits the original top-level instructions before applying its own non-empty instructions. Defaults to true; set to false to opt out. */
  inherit_base_instructions?: boolean;
  /** Customer tools available to this subagent. Omission or null selects an empty customer tool set. */
  tools?: VoiceAgentToolUnion[];
  /** Tool-selection behavior for this subagent. If omitted, the service defaults to auto. Null also selects auto. */
  tool_choice?: VoiceAgentToolChoice;
  /** The output voice configuration activated for this subagent, using the same flat voice fields as the top-level audio output. Omission inherits the entrypoint configuration; a supplied object replaces the voice-specific settings. */
  audio_output?: VoiceAgentVoiceConfig;
  /** The sampling temperature for a compatible subagent model, from 0 through 2. */
  temperature?: number;
  /** The maximum output-token count for one response while this subagent is active. */
  max_response_output_tokens?: VoiceAgentHandoffMaxOutputTokens;
  /** Reasoning effort for a compatible subagent model. */
  reasoning_effort?: VoiceAgentHandoffReasoningEffort;
  /** Voice-optimized instruction adaptation for this subagent. Null disables adaptation. */
  voice_adaptation?: VoiceAgentHandoffVoiceAdaptation;
  /** Interim-response settings for this subagent. Null disables interim responses. */
  interim_response?: VoiceAgentInterimResponseConfigUnion;
  /** Whether this subagent may call customer tools in parallel. If omitted, the service defaults to false. Subagents with outgoing handoff conditions must use `false`. */
  parallel_tool_calls?: boolean;
  /** Outgoing handoffs from this subagent. The containing subagent supplies each condition's source. The service permits at most 128 conditions across the entire Agent. */
  handoff_conditions?: VoiceAgentHandoffCondition[];
}

export function inlineVoiceSubagentSerializer(item: InlineVoiceSubagent): any {
  return {
    id: item["id"],
    source: item["source"],
    interface: item["interface"],
    description: item["display_description"],
    model: item["model"],
    instructions: item["instructions"],
    inherit_base_instructions: item["inherit_base_instructions"],
    tools: !item["tools"] ? item["tools"] : voiceAgentToolUnionArraySerializer(item["tools"]),
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : voiceAgentToolChoiceSerializer(item["tool_choice"]),
    audio_output: !item["audio_output"]
      ? item["audio_output"]
      : voiceAgentVoiceConfigSerializer(item["audio_output"]),
    temperature: item["temperature"],
    max_response_output_tokens: !item["max_response_output_tokens"]
      ? item["max_response_output_tokens"]
      : voiceAgentHandoffMaxOutputTokensSerializer(item["max_response_output_tokens"]),
    reasoning_effort: item["reasoning_effort"],
    voice_adaptation: !item["voice_adaptation"]
      ? item["voice_adaptation"]
      : voiceAgentHandoffVoiceAdaptationSerializer(item["voice_adaptation"]),
    interim_response: !item["interim_response"]
      ? item["interim_response"]
      : voiceAgentInterimResponseConfigUnionSerializer(item["interim_response"]),
    parallel_tool_calls: item["parallel_tool_calls"],
    handoff_conditions: !item["handoff_conditions"]
      ? item["handoff_conditions"]
      : voiceAgentHandoffConditionArraySerializer(item["handoff_conditions"]),
  };
}

export function inlineVoiceSubagentDeserializer(item: any): InlineVoiceSubagent {
  return {
    id: item["id"],
    source: item["source"],
    interface: item["interface"],
    display_description: item["description"],
    model: item["model"],
    instructions: item["instructions"],
    inherit_base_instructions: item["inherit_base_instructions"],
    tools: !item["tools"] ? item["tools"] : voiceAgentToolUnionArrayDeserializer(item["tools"]),
    tool_choice: !item["tool_choice"]
      ? item["tool_choice"]
      : voiceAgentToolChoiceDeserializer(item["tool_choice"]),
    audio_output: !item["audio_output"]
      ? item["audio_output"]
      : voiceAgentVoiceConfigDeserializer(item["audio_output"]),
    temperature: item["temperature"],
    max_response_output_tokens: !item["max_response_output_tokens"]
      ? item["max_response_output_tokens"]
      : voiceAgentHandoffMaxOutputTokensDeserializer(item["max_response_output_tokens"]),
    reasoning_effort: item["reasoning_effort"],
    voice_adaptation: !item["voice_adaptation"]
      ? item["voice_adaptation"]
      : voiceAgentHandoffVoiceAdaptationDeserializer(item["voice_adaptation"]),
    interim_response: !item["interim_response"]
      ? item["interim_response"]
      : voiceAgentInterimResponseConfigUnionDeserializer(item["interim_response"]),
    parallel_tool_calls: item["parallel_tool_calls"],
    handoff_conditions: !item["handoff_conditions"]
      ? item["handoff_conditions"]
      : voiceAgentHandoffConditionArrayDeserializer(item["handoff_conditions"]),
  };
}

/**
 * Voice output configuration. Inline subagents use it directly as their voice override, and the session-level
 * output audio configuration extends it.
 * Provider-specific fields are selected by `voice_type`:
 * - `openai`: `voice` and `speed`.
 * - `azure-standard`: `voice`, `voice_locale`, `speed`, `voice_temperature`, `custom_lexicon_url`,
 *   `custom_text_normalization_url`, `prefer_locales`, `style`, `pitch`, and `volume`.
 * - `azure-custom`: all `azure-standard` fields except `style`, plus `custom_voice_endpoint_id`.
 * - `azure-personal`: all `azure-standard` fields except `style`, plus `personal_voice_model`.
 * - `avatar-voice-sync`: all `azure-standard` fields except `voice` and `style`, plus `personal_voice_model`;
 *   the voice name is derived from the avatar.
 * - `azure-realtime-native`: `voice` and `speed`.
 */
export interface VoiceAgentVoiceConfig {
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
}

export function voiceAgentVoiceConfigSerializer(item: VoiceAgentVoiceConfig): any {
  return {
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
  };
}

export function voiceAgentVoiceConfigDeserializer(item: any): VoiceAgentVoiceConfig {
  return {
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

/** The maximum output-token count or the literal `inf` for a handoff node. */
export type VoiceAgentHandoffMaxOutputTokens = number | "inf";

export function voiceAgentHandoffMaxOutputTokensSerializer(
  item: VoiceAgentHandoffMaxOutputTokens,
): any {
  return item;
}

export function voiceAgentHandoffMaxOutputTokensDeserializer(
  item: any,
): VoiceAgentHandoffMaxOutputTokens {
  return item;
}

/** Reasoning effort applied by a compatible handoff-node model. */
export type VoiceAgentHandoffReasoningEffort =
  "none" | "minimal" | "low" | "medium" | "high" | "xhigh";

/** Voice-optimized instruction adaptation applied while a handoff node is active. */
export interface VoiceAgentHandoffVoiceAdaptation {
  /** The adaptation strategy. Currently only `auto` is supported. */
  type: "auto";
}

export function voiceAgentHandoffVoiceAdaptationSerializer(
  item: VoiceAgentHandoffVoiceAdaptation,
): any {
  return { type: item["type"] };
}

export function voiceAgentHandoffVoiceAdaptationDeserializer(
  item: any,
): VoiceAgentHandoffVoiceAdaptation {
  return {
    type: item["type"],
  };
}

export function voiceAgentHandoffConditionArraySerializer(
  result: Array<VoiceAgentHandoffCondition>,
): any[] {
  return result.map((item) => {
    return voiceAgentHandoffConditionSerializer(item);
  });
}

export function voiceAgentHandoffConditionArrayDeserializer(
  result: Array<VoiceAgentHandoffCondition>,
): any[] {
  return result.map((item) => {
    return voiceAgentHandoffConditionDeserializer(item);
  });
}

/** One allowed outgoing handoff from an inline voice subagent. */
export interface VoiceAgentHandoffCondition {
  /** The handoff condition identifier. */
  id: string;
  /** The target subagent identifier or `$entrypoint`. The containing subagent supplies the source. */
  target: string;
  /** Natural-language routing guidance supplied alongside the active subagent instructions, from 1 through 500 characters. This is not an executable Boolean predicate. */
  condition: string;
  /** Whether user interruption before commit cancels the pending handoff. If omitted, the service defaults to false. */
  cancel_on_interruption?: boolean;
  /** The minimum delay before target activation, in milliseconds, from 0 through 10000. If omitted, the service defaults to 0. */
  delay_ms?: number;
  /**
   * Optional deterministic source-voice announcement played before target activation. Supported by cascaded
   * pipelines and realtime pipelines using local Azure TTS; model-native realtime voice requires omission or null.
   * At most 500 characters. If omitted or null, no announcement is played.
   */
  transfer_message?: string;
  /** Whether Voice Live automatically starts a response after target activation. If omitted, the service defaults to `auto`. */
  target_response?: VoiceAgentHandoffTargetResponse;
}

export function voiceAgentHandoffConditionSerializer(item: VoiceAgentHandoffCondition): any {
  return {
    id: item["id"],
    target: item["target"],
    condition: item["condition"],
    cancel_on_interruption: item["cancel_on_interruption"],
    delay_ms: item["delay_ms"],
    transfer_message: item["transfer_message"],
    target_response: item["target_response"],
  };
}

export function voiceAgentHandoffConditionDeserializer(item: any): VoiceAgentHandoffCondition {
  return {
    id: item["id"],
    target: item["target"],
    condition: item["condition"],
    cancel_on_interruption: item["cancel_on_interruption"],
    delay_ms: item["delay_ms"],
    transfer_message: item["transfer_message"],
    target_response: item["target_response"],
  };
}

/** Whether Voice Live automatically starts a response after a handoff target becomes active. */
export type VoiceAgentHandoffTargetResponse = "auto" | "none";

/** Session-wide limits shared by all handoff conditions in one Voice Agent session. */
export interface VoiceAgentHandoffPolicy {
  /** The maximum number of successfully completed handoffs in one session, from 1 through 100. If omitted, the service defaults to 16. */
  max_transfers?: number;
  /** The maximum number of attempted handoffs, from 1 through 100. If omitted, the service uses `max_transfers`. The service requires this value to be greater than or equal to `max_transfers`. */
  max_attempts?: number;
}

export function voiceAgentHandoffPolicySerializer(item: VoiceAgentHandoffPolicy): any {
  return { max_transfers: item["max_transfers"], max_attempts: item["max_attempts"] };
}

export function voiceAgentHandoffPolicyDeserializer(item: any): VoiceAgentHandoffPolicy {
  return {
    max_transfers: item["max_transfers"],
    max_attempts: item["max_attempts"],
  };
}

/** Post-call delivery configuration. */
export interface VoiceAgentPostCallConfig {
  /** The destinations to notify. */
  destinations: VoiceAgentPostCallDestinationUnion[];
  /** Additional content to include in each delivery. The transcript is always delivered; add `audio` to also deliver a URL to the merged call recording. */
  include?: VoiceAgentPostCallIncludeOption[];
}

export function voiceAgentPostCallConfigSerializer(item: VoiceAgentPostCallConfig): any {
  return {
    destinations: voiceAgentPostCallDestinationUnionArraySerializer(item["destinations"]),
    include: !item["include"]
      ? item["include"]
      : item["include"].map((p: any) => {
          return p;
        }),
  };
}

export function voiceAgentPostCallConfigDeserializer(item: any): VoiceAgentPostCallConfig {
  return {
    destinations: voiceAgentPostCallDestinationUnionArrayDeserializer(item["destinations"]),
    include: !item["include"]
      ? item["include"]
      : item["include"].map((p: any) => {
          return p;
        }),
  };
}

export function voiceAgentPostCallDestinationUnionArraySerializer(
  result: Array<VoiceAgentPostCallDestinationUnion>,
): any[] {
  return result.map((item) => {
    return voiceAgentPostCallDestinationUnionSerializer(item);
  });
}

export function voiceAgentPostCallDestinationUnionArrayDeserializer(
  result: Array<VoiceAgentPostCallDestinationUnion>,
): any[] {
  return result.map((item) => {
    return voiceAgentPostCallDestinationUnionDeserializer(item);
  });
}

/** A post-call destination. */
export interface VoiceAgentPostCallDestination {
  /** The destination type. */
  /** The discriminator possible values: event_grid, routine */
  type: VoiceAgentPostCallDestinationType;
}

export function voiceAgentPostCallDestinationSerializer(item: VoiceAgentPostCallDestination): any {
  return { type: item["type"] };
}

export function voiceAgentPostCallDestinationDeserializer(
  item: any,
): VoiceAgentPostCallDestination {
  return {
    type: item["type"],
  };
}

/** Alias for VoiceAgentPostCallDestinationUnion */
export type VoiceAgentPostCallDestinationUnion =
  | VoiceAgentEventGridPostCallDestination
  | VoiceAgentRoutinePostCallDestination
  | VoiceAgentPostCallDestination;

export function voiceAgentPostCallDestinationUnionSerializer(
  item: VoiceAgentPostCallDestinationUnion,
): any {
  switch (item.type) {
    case "event_grid":
      return voiceAgentEventGridPostCallDestinationSerializer(
        item as VoiceAgentEventGridPostCallDestination,
      );

    case "routine":
      return voiceAgentRoutinePostCallDestinationSerializer(
        item as VoiceAgentRoutinePostCallDestination,
      );

    default:
      return voiceAgentPostCallDestinationSerializer(item);
  }
}

export function voiceAgentPostCallDestinationUnionDeserializer(
  item: any,
): VoiceAgentPostCallDestinationUnion {
  switch (item["type"]) {
    case "event_grid":
      return voiceAgentEventGridPostCallDestinationDeserializer(
        item as VoiceAgentEventGridPostCallDestination,
      );

    case "routine":
      return voiceAgentRoutinePostCallDestinationDeserializer(
        item as VoiceAgentRoutinePostCallDestination,
      );

    default:
      return voiceAgentPostCallDestinationDeserializer(item);
  }
}

/** The type of a post-call destination. */
export type VoiceAgentPostCallDestinationType = "event_grid" | "routine";

/** An Event Grid connection that receives post-call events. */
export interface VoiceAgentEventGridPostCallDestination extends VoiceAgentPostCallDestination {
  /** The destination type. Always `event_grid`. */
  type: "event_grid";
  /** The name of the Event Grid connection. */
  connection_name: string;
}

export function voiceAgentEventGridPostCallDestinationSerializer(
  item: VoiceAgentEventGridPostCallDestination,
): any {
  return { type: item["type"], connection_name: item["connection_name"] };
}

export function voiceAgentEventGridPostCallDestinationDeserializer(
  item: any,
): VoiceAgentEventGridPostCallDestination {
  return {
    type: item["type"],
    connection_name: item["connection_name"],
  };
}

/** A routine that is dispatched with the post-call event. */
export interface VoiceAgentRoutinePostCallDestination extends VoiceAgentPostCallDestination {
  /** The destination type. Always `routine`. */
  type: "routine";
  /** The name of the routine. */
  name: string;
}

export function voiceAgentRoutinePostCallDestinationSerializer(
  item: VoiceAgentRoutinePostCallDestination,
): any {
  return { type: item["type"], name: item["name"] };
}

export function voiceAgentRoutinePostCallDestinationDeserializer(
  item: any,
): VoiceAgentRoutinePostCallDestination {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** Content that can be included in a post-call delivery. */
export type VoiceAgentPostCallIncludeOption = "audio";

/**
 * The Live voice agent definition. Its configuration (model, instructions, audio, and delegation) drives a
 * managed speech-to-speech experience using a Foundry GPT Live deployment. Establish Live voice sessions through
 * `GET /agents/{agent_name}/endpoint/protocols/voice/live/sessions`. Every create or update produces a new immutable version.
 */
export interface VoiceAgentLiveDefinition extends VoiceAgentBaseDefinition {
  /** Selects the Live protocol. */
  sub_protocol: "live";
  /** Uses a Foundry model deployment. */
  model_type: "self_deployed";
  /** The GPT Live deployment name. */
  model: string;
  /** Template-only startup greeting, rendered with session structured inputs. Foundry-only; not sent in native Live settings. */
  greeting?: VoiceAgentTemplateGreetingConfig;
  /** Startup audio formats and output voice. */
  audio?: LiveInitialSessionAudioParam;
  /** Delegation settings. Omit for client mode. responses.model is a backend deployment name in the Live resource, not a model catalog ID. */
  delegation?: VoiceAgentLiveDelegationUnion;
}

export function voiceAgentLiveDefinitionSerializer(item: VoiceAgentLiveDefinition): any {
  return {
    kind: item["kind"],
    sub_protocol: item["sub_protocol"],
    instructions: item["instructions"],
    structured_inputs: !item["structured_inputs"]
      ? item["structured_inputs"]
      : structuredInputDefinitionRecordSerializer(item["structured_inputs"]),
    store: item["store"],
    rai_config: !item["rai_config"] ? item["rai_config"] : raiConfigSerializer(item["rai_config"]),
    model_type: item["model_type"],
    model: item["model"],
    greeting: !item["greeting"]
      ? item["greeting"]
      : voiceAgentTemplateGreetingConfigSerializer(item["greeting"]),
    audio: !item["audio"] ? item["audio"] : liveInitialSessionAudioParamSerializer(item["audio"]),
    delegation: !item["delegation"]
      ? item["delegation"]
      : voiceAgentLiveDelegationUnionSerializer(item["delegation"]),
  };
}

export function voiceAgentLiveDefinitionDeserializer(item: any): VoiceAgentLiveDefinition {
  return {
    kind: item["kind"],
    sub_protocol: item["sub_protocol"],
    instructions: item["instructions"],
    structured_inputs: !item["structured_inputs"]
      ? item["structured_inputs"]
      : structuredInputDefinitionRecordDeserializer(item["structured_inputs"]),
    store: item["store"],
    rai_config: !item["rai_config"]
      ? item["rai_config"]
      : raiConfigDeserializer(item["rai_config"]),
    model_type: item["model_type"],
    model: item["model"],
    greeting: !item["greeting"]
      ? item["greeting"]
      : voiceAgentTemplateGreetingConfigDeserializer(item["greeting"]),
    audio: !item["audio"] ? item["audio"] : liveInitialSessionAudioParamDeserializer(item["audio"]),
    delegation: !item["delegation"]
      ? item["delegation"]
      : voiceAgentLiveDelegationUnionDeserializer(item["delegation"]),
  };
}

/** Who handles delegated work for a Live voice agent. */
export interface VoiceAgentLiveDelegation {
  /** The delegation owner. */
  /** The discriminator possible values: client, responses, foundry_managed_agent */
  type: VoiceAgentLiveDelegationType;
}

export function voiceAgentLiveDelegationSerializer(item: VoiceAgentLiveDelegation): any {
  return { type: item["type"] };
}

export function voiceAgentLiveDelegationDeserializer(item: any): VoiceAgentLiveDelegation {
  return {
    type: item["type"],
  };
}

/** Alias for VoiceAgentLiveDelegationUnion */
export type VoiceAgentLiveDelegationUnion =
  | VoiceAgentLiveClientDelegation
  | VoiceAgentLiveResponsesDelegation
  | VoiceAgentLiveManagedAgentDelegation
  | VoiceAgentLiveDelegation;

export function voiceAgentLiveDelegationUnionSerializer(item: VoiceAgentLiveDelegationUnion): any {
  switch (item.type) {
    case "client":
      return voiceAgentLiveClientDelegationSerializer(item as VoiceAgentLiveClientDelegation);

    case "responses":
      return voiceAgentLiveResponsesDelegationSerializer(item as VoiceAgentLiveResponsesDelegation);

    case "foundry_managed_agent":
      return voiceAgentLiveManagedAgentDelegationSerializer(
        item as VoiceAgentLiveManagedAgentDelegation,
      );

    default:
      return voiceAgentLiveDelegationSerializer(item);
  }
}

export function voiceAgentLiveDelegationUnionDeserializer(
  item: any,
): VoiceAgentLiveDelegationUnion {
  switch (item["type"]) {
    case "client":
      return voiceAgentLiveClientDelegationDeserializer(item as VoiceAgentLiveClientDelegation);

    case "responses":
      return voiceAgentLiveResponsesDelegationDeserializer(
        item as VoiceAgentLiveResponsesDelegation,
      );

    case "foundry_managed_agent":
      return voiceAgentLiveManagedAgentDelegationDeserializer(
        item as VoiceAgentLiveManagedAgentDelegation,
      );

    default:
      return voiceAgentLiveDelegationDeserializer(item);
  }
}

/** Supported owners of work delegated by a Live voice agent. */
export type VoiceAgentLiveDelegationType = "client" | "responses" | "foundry_managed_agent";

/** Delegates work to the application using native client delegation. */
export interface VoiceAgentLiveClientDelegation extends VoiceAgentLiveDelegation {
  /** Milliseconds to wait before requesting an automatic spoken acknowledgement for a delegation. The model may still speak before this delay. Any commentary or thinking appended to the session cancels all pending acknowledgements, including those for other delegations. Defaults to 400 for Decisions sessions and 0 (request immediately) for other sessions. Omission in a session update preserves the current value. Updates apply to subsequent delegations. */
  acknowledgement_delay_ms?: number;
  type: "client";
}

export function voiceAgentLiveClientDelegationSerializer(
  item: VoiceAgentLiveClientDelegation,
): any {
  return { type: item["type"], acknowledgement_delay_ms: item["acknowledgement_delay_ms"] };
}

export function voiceAgentLiveClientDelegationDeserializer(
  item: any,
): VoiceAgentLiveClientDelegation {
  return {
    type: item["type"],
    acknowledgement_delay_ms: item["acknowledgement_delay_ms"],
  };
}

/** Delegates work to a Responses backend using native Responses settings. */
export interface VoiceAgentLiveResponsesDelegation extends VoiceAgentLiveDelegation {
  /** Milliseconds to wait before requesting an automatic spoken acknowledgement for a delegation. The model may still speak before this delay. Any commentary or thinking appended to the session cancels all pending acknowledgements, including those for other delegations. Defaults to 400 for Decisions sessions and 0 (request immediately) for other sessions. Omission in a session update preserves the current value. Updates apply to subsequent delegations. */
  acknowledgement_delay_ms?: number;
  /** Backend model, prompt, and tools used when the Live session delegates a task to Responses. */
  responses: LiveResponsesDelegationSettingsInputParam;
  type: "responses";
}

export function voiceAgentLiveResponsesDelegationSerializer(
  item: VoiceAgentLiveResponsesDelegation,
): any {
  return {
    type: item["type"],
    acknowledgement_delay_ms: item["acknowledgement_delay_ms"],
    responses: liveResponsesDelegationSettingsInputParamSerializer(item["responses"]),
  };
}

export function voiceAgentLiveResponsesDelegationDeserializer(
  item: any,
): VoiceAgentLiveResponsesDelegation {
  return {
    type: item["type"],
    acknowledgement_delay_ms: item["acknowledgement_delay_ms"],
    responses: liveResponsesDelegationSettingsInputParamDeserializer(item["responses"]),
  };
}

/** Delegates to a same-project prompt agent using native client delegation. Requires [thinking] and/or [commentary] output sections. */
export interface VoiceAgentLiveManagedAgentDelegation extends VoiceAgentLiveDelegation {
  /** Canonical delegation type; legacy managed_prompt_agent values are returned as foundry_managed_agent. */
  type: "foundry_managed_agent";
  /** Name of a prompt agent in the same project. */
  agent_name: string;
  /** Agent version, pinned per connection. Omit to select the active version. */
  agent_version?: string;
}

export function voiceAgentLiveManagedAgentDelegationSerializer(
  item: VoiceAgentLiveManagedAgentDelegation,
): any {
  return {
    type: item["type"],
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
  };
}

export function voiceAgentLiveManagedAgentDelegationDeserializer(
  item: any,
): VoiceAgentLiveManagedAgentDelegation {
  return {
    type: item["type"],
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
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

/** The Microsoft Agent Certification review status of the Microsoft 365 store title published for an agent. */
export type PublishApprovalStatus =
  "not_published" | "pending" | "approved" | "rejected" | "no_approval_needed";

/** The type of digital worker. */
export type DigitalWorkerType = "m365";

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
  /** The Unix timestamp (in seconds) when the session sandbox was last observed to stop or go idle. Present only after the session has gone idle at least once, used for accurate idle-billing reconciliation. */
  readonly stopped_at?: Date;
}

export function agentSessionResourceDeserializer(item: any): AgentSessionResource {
  return {
    agent_session_id: item["agent_session_id"],
    version_indicator: versionIndicatorUnionDeserializer(item["version_indicator"]),
    status: item["status"],
    created_at: new Date(item["created_at"] * 1000),
    last_accessed_at: new Date(item["last_accessed_at"] * 1000),
    expires_at: new Date(item["expires_at"] * 1000),
    stopped_at: !item["stopped_at"] ? item["stopped_at"] : new Date(item["stopped_at"] * 1000),
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

/** Agent optimization job resource — a long-running job that produces candidate changes or versioned skill packages. For failed or skipped jobs, error explains the outcome; status distinguishes failure from a skip. */
export interface AgentOptimizationJob {
  /** Server-assigned unique identifier. */
  readonly id: string;
  /** Result produced on success. */
  readonly result?: AgentOptimizationJobResult;
  /** Current lifecycle status. */
  readonly status: AgentOptimizationJobStatus;
  /** Failure or skip reason; status distinguishes the outcomes. Omitted otherwise. */
  readonly error?: ApiError;
  /** Human-readable label. Omitted when no label is needed; it has no uniqueness, routing, or idempotency semantics. */
  display_name?: string;
  /** Foundry agent whose configuration is optimized, or a read-only trace and skill source for skill_optimization. Agentless skill optimization requires explicit agent_traces telemetry configuration with an exact agent_name. Skill optimization does not modify the target agent. */
  target_configuration?: AgentOptimizationTargetConfigurationUnion;
  /** Model used to generate candidate changes. An existing deployment name is also accepted. */
  optimization_model_configuration: AgentOptimizationModelConfiguration;
  /** Type-specific optimization configuration. */
  optimization_configuration: AgentOptimizationConfigurationBaseUnion;
  /** Duration for which the job has been running, in milliseconds. */
  readonly run_duration_ms: number;
  /** The timestamp when the job was created, represented in Unix time. */
  readonly created_at: Date;
  /** The timestamp when the job was last updated, represented in Unix time. */
  readonly updated_at: Date;
  /** Non-fatal warnings emitted during optimization. Omitted when no warnings were produced. */
  readonly warnings?: string[];
}

export function agentOptimizationJobSerializer(item: AgentOptimizationJob): any {
  return {
    display_name: item["display_name"],
    target_configuration: !item["target_configuration"]
      ? item["target_configuration"]
      : agentOptimizationTargetConfigurationUnionSerializer(item["target_configuration"]),
    optimization_model_configuration: agentOptimizationModelConfigurationSerializer(
      item["optimization_model_configuration"],
    ),
    optimization_configuration: agentOptimizationConfigurationBaseUnionSerializer(
      item["optimization_configuration"],
    ),
  };
}

export function agentOptimizationJobDeserializer(item: any): AgentOptimizationJob {
  return {
    id: item["id"],
    result: !item["result"]
      ? item["result"]
      : agentOptimizationJobResultDeserializer(item["result"]),
    status: agentOptimizationJobStatusDeserializer(item["status"]),
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
    display_name: item["display_name"],
    target_configuration: !item["target_configuration"]
      ? item["target_configuration"]
      : agentOptimizationTargetConfigurationUnionDeserializer(item["target_configuration"]),
    optimization_model_configuration: agentOptimizationModelConfigurationDeserializer(
      item["optimization_model_configuration"],
    ),
    optimization_configuration: agentOptimizationConfigurationBaseUnionDeserializer(
      item["optimization_configuration"],
    ),
    run_duration_ms: item["run_duration_ms"],
    created_at: new Date(item["created_at"] * 1000),
    updated_at: new Date(item["updated_at"] * 1000),
    warnings: !item["warnings"]
      ? item["warnings"]
      : item["warnings"].map((p: any) => {
          return p;
        }),
  };
}

/** Partial or terminal result produced by an agent optimization job. */
export interface AgentOptimizationJobResult {
  /** Summary of candidates produced by the job. Omitted until candidate processing begins. */
  candidate_summary?: AgentOptimizationResultCandidateSummary;
  /** Aggregate token usage per stage and model. Always present; empty array when no calls were measured. */
  token_usage: AgentOptimizationJobTokenUsage[];
  /** Aggregate latency per stage and model. Always present; empty when no server-measured latency is available. */
  latency_metrics: AgentOptimizationJobLatency[];
  /** Reason the candidate search terminated. Omitted for jobs that do not comparatively evaluate candidates and until the job reaches a terminal state. */
  termination_reason?: AgentOptimizationTerminationReason;
}

export function agentOptimizationJobResultDeserializer(item: any): AgentOptimizationJobResult {
  return {
    candidate_summary: !item["candidate_summary"]
      ? item["candidate_summary"]
      : agentOptimizationResultCandidateSummaryDeserializer(item["candidate_summary"]),
    token_usage: agentOptimizationJobTokenUsageArrayDeserializer(item["token_usage"]),
    latency_metrics: agentOptimizationJobLatencyArrayDeserializer(item["latency_metrics"]),
    termination_reason: item["termination_reason"],
  };
}

/** Summary of candidates produced by an agent optimization job. */
export interface AgentOptimizationResultCandidateSummary {
  /** Number of completed candidates. Does not include the baseline. */
  completed_candidate_count: number;
  /** Candidate ID of the original baseline. Omitted until the baseline candidate is available. */
  baseline_id?: string;
  /** Candidate ID of the highest-scoring candidate for evaluated jobs, or the selected transformed output for non-comparative jobs. Omitted until a candidate has been selected. */
  best_id?: string;
  /** Normalized score of the baseline candidate from 0.0 to 1.0 for a comparatively evaluated job. Omitted otherwise and until baseline evaluation completes. */
  baseline_score?: number;
  /** Best normalized score observed from 0.0 to 1.0 for a comparatively evaluated job. Omitted otherwise and until a candidate completes evaluation. */
  best_score?: number;
  /** Most recently promoted candidate for the job. Omitted if no candidates have been promoted. */
  latest_promoted_candidate?: AgentOptimizationCandidatePromotionInfo;
}

export function agentOptimizationResultCandidateSummaryDeserializer(
  item: any,
): AgentOptimizationResultCandidateSummary {
  return {
    completed_candidate_count: item["completed_candidate_count"],
    baseline_id: item["baseline_id"],
    best_id: item["best_id"],
    baseline_score: item["baseline_score"],
    best_score: item["best_score"],
    latest_promoted_candidate: !item["latest_promoted_candidate"]
      ? item["latest_promoted_candidate"]
      : agentOptimizationCandidatePromotionInfoDeserializer(item["latest_promoted_candidate"]),
  };
}

/** Promotion metadata recorded for a candidate. */
export interface AgentOptimizationCandidatePromotionInfo {
  /** Timestamp when promotion occurred, represented in Unix time. */
  promoted_at: Date;
  /** Agent reference associated with the completed promotion. */
  promoted_agent: AgentReference;
}

export function agentOptimizationCandidatePromotionInfoDeserializer(
  item: any,
): AgentOptimizationCandidatePromotionInfo {
  return {
    promoted_at: new Date(item["promoted_at"] * 1000),
    promoted_agent: agentReferenceDeserializer(item["promoted_agent"]),
  };
}

/** model interface AgentReference */
export interface AgentReference {
  type: "agent_reference";
  /** The name of the agent. */
  name: string;
  /** The version identifier of the agent. */
  version?: string;
}

export function agentReferenceDeserializer(item: any): AgentReference {
  return {
    type: item["type"],
    name: item["name"],
    version: item["version"],
  };
}

export function agentOptimizationJobTokenUsageArrayDeserializer(
  result: Array<AgentOptimizationJobTokenUsage>,
): any[] {
  return result.map((item) => {
    return agentOptimizationJobTokenUsageDeserializer(item);
  });
}

/** Aggregated token usage for one optimization stage and model. */
export interface AgentOptimizationJobTokenUsage {
  /** Optimization stage that generated these calls. */
  stage: AgentOptimizationStage;
  /** Model name or deployment name that served the calls. */
  model?: string;
  /** Total input tokens. Omitted when unmeasured. */
  input_tokens?: number;
  /** Total output tokens. Omitted when unmeasured. */
  output_tokens?: number;
  /** Sum of input_tokens + output_tokens. Omitted when unmeasured. */
  total_tokens?: number;
  /** Input tokens served from the model's cache. Included in input_tokens and not additive. If omitted, the service defaults to 0. */
  cached_tokens?: number;
  /** Reasoning tokens counted separately by reasoning models. Included in output_tokens and not additive. If omitted, the service defaults to 0. */
  reasoning_tokens?: number;
}

export function agentOptimizationJobTokenUsageDeserializer(
  item: any,
): AgentOptimizationJobTokenUsage {
  return {
    stage: item["stage"],
    model: item["model"],
    input_tokens: item["input_tokens"],
    output_tokens: item["output_tokens"],
    total_tokens: item["total_tokens"],
    cached_tokens: item["cached_tokens"],
    reasoning_tokens: item["reasoning_tokens"],
  };
}

/** Stage of optimization that consumed model resources. */
export type AgentOptimizationStage = "agent" | "evaluation" | "optimization";

export function agentOptimizationJobLatencyArrayDeserializer(
  result: Array<AgentOptimizationJobLatency>,
): any[] {
  return result.map((item) => {
    return agentOptimizationJobLatencyDeserializer(item);
  });
}

/** Average latency for one optimization stage and model. */
export interface AgentOptimizationJobLatency {
  /** Optimization stage measured by this entry. */
  stage: AgentOptimizationStage;
  /** Model name or deployment name measured by this entry. */
  model?: string;
  /** Average per-call latency, rounded to milliseconds. */
  avg_latency_ms: number;
  /** Total number of calls contributing to this entry. */
  call_count: number;
}

export function agentOptimizationJobLatencyDeserializer(item: any): AgentOptimizationJobLatency {
  return {
    stage: item["stage"],
    model: item["model"],
    avg_latency_ms: item["avg_latency_ms"],
    call_count: item["call_count"],
  };
}

/** Reason the optimization process ended. Early termination reasons still indicate a successful job; completed candidates remain available. */
export type AgentOptimizationTerminationReason =
  "completed" | "budget_exhausted" | "candidate_screening_stalled";

/** Optimization job lifecycle, including a terminal skip when required input is unavailable. */
export type AgentOptimizationJobStatus = JobStatus | "skipped";

export function agentOptimizationJobStatusSerializer(item: AgentOptimizationJobStatus): any {
  return item;
}

export function agentOptimizationJobStatusDeserializer(item: any): AgentOptimizationJobStatus {
  return item;
}

/** Extensible status values shared by Foundry jobs. */
export type JobStatus = "queued" | "in_progress" | "succeeded" | "failed" | "cancelled";

/** Base target configuration for an optimization job. */
export interface AgentOptimizationTargetConfiguration {
  /** Target configuration type. Additional types may be added in future API versions. */
  /** The discriminator possible values: foundry_agent */
  type: AgentOptimizationTargetConfigurationType;
}

export function agentOptimizationTargetConfigurationSerializer(
  item: AgentOptimizationTargetConfiguration,
): any {
  return { type: item["type"] };
}

export function agentOptimizationTargetConfigurationDeserializer(
  item: any,
): AgentOptimizationTargetConfiguration {
  return {
    type: item["type"],
  };
}

/** Alias for AgentOptimizationTargetConfigurationUnion */
export type AgentOptimizationTargetConfigurationUnion =
  AgentOptimizationFoundryAgentTargetConfiguration | AgentOptimizationTargetConfiguration;

export function agentOptimizationTargetConfigurationUnionSerializer(
  item: AgentOptimizationTargetConfigurationUnion,
): any {
  switch (item.type) {
    case "foundry_agent":
      return agentOptimizationFoundryAgentTargetConfigurationSerializer(
        item as AgentOptimizationFoundryAgentTargetConfiguration,
      );

    default:
      return agentOptimizationTargetConfigurationSerializer(item);
  }
}

export function agentOptimizationTargetConfigurationUnionDeserializer(
  item: any,
): AgentOptimizationTargetConfigurationUnion {
  switch (item["type"]) {
    case "foundry_agent":
      return agentOptimizationFoundryAgentTargetConfigurationDeserializer(
        item as AgentOptimizationFoundryAgentTargetConfiguration,
      );

    default:
      return agentOptimizationTargetConfigurationDeserializer(item);
  }
}

/** Target configuration types supported by optimization jobs. */
export type AgentOptimizationTargetConfigurationType = "foundry_agent";

/** Identifies the Foundry agent that owns the configuration being optimized. */
export interface AgentOptimizationFoundryAgentTargetConfiguration extends AgentOptimizationTargetConfiguration {
  /** Foundry-agent target discriminator. */
  type: "foundry_agent";
  /** Registered Foundry agent name. */
  name: string;
  /** Pinned agent version. Omitted to resolve and pin the latest version. */
  version?: string;
}

export function agentOptimizationFoundryAgentTargetConfigurationSerializer(
  item: AgentOptimizationFoundryAgentTargetConfiguration,
): any {
  return { type: item["type"], name: item["name"], version: item["version"] };
}

export function agentOptimizationFoundryAgentTargetConfigurationDeserializer(
  item: any,
): AgentOptimizationFoundryAgentTargetConfiguration {
  return {
    type: item["type"],
    name: item["name"],
    version: item["version"],
  };
}

/** Identifies a model used by an optimization or evaluation step. */
export interface AgentOptimizationModelConfiguration {
  /** Model name or existing deployment name in the Foundry project. */
  model: string;
}

export function agentOptimizationModelConfigurationSerializer(
  item: AgentOptimizationModelConfiguration,
): any {
  return { model: item["model"] };
}

export function agentOptimizationModelConfigurationDeserializer(
  item: any,
): AgentOptimizationModelConfiguration {
  return {
    model: item["model"],
  };
}

/** Base model for type-specific optimization configuration. */
export interface AgentOptimizationConfigurationBase {
  /** Optimization type discriminator. */
  /** The discriminator possible values: agent_optimization, prompt_optimization, skill_optimization */
  type: AgentOptimizationConfigurationType;
}

export function agentOptimizationConfigurationBaseSerializer(
  item: AgentOptimizationConfigurationBase,
): any {
  return { type: item["type"] };
}

export function agentOptimizationConfigurationBaseDeserializer(
  item: any,
): AgentOptimizationConfigurationBase {
  return {
    type: item["type"],
  };
}

/** Alias for AgentOptimizationConfigurationBaseUnion */
export type AgentOptimizationConfigurationBaseUnion =
  | AgentOptimizationConfiguration
  | PromptOptimizationConfiguration
  | SkillOptimizationConfiguration
  | AgentOptimizationConfigurationBase;

export function agentOptimizationConfigurationBaseUnionSerializer(
  item: AgentOptimizationConfigurationBaseUnion,
): any {
  switch (item.type) {
    case "agent_optimization":
      return agentOptimizationConfigurationSerializer(item as AgentOptimizationConfiguration);

    case "prompt_optimization":
      return promptOptimizationConfigurationSerializer(item as PromptOptimizationConfiguration);

    case "skill_optimization":
      return skillOptimizationConfigurationSerializer(item as SkillOptimizationConfiguration);

    default:
      return agentOptimizationConfigurationBaseSerializer(item);
  }
}

export function agentOptimizationConfigurationBaseUnionDeserializer(
  item: any,
): AgentOptimizationConfigurationBaseUnion {
  switch (item["type"]) {
    case "agent_optimization":
      return agentOptimizationConfigurationDeserializer(item as AgentOptimizationConfiguration);

    case "prompt_optimization":
      return promptOptimizationConfigurationDeserializer(item as PromptOptimizationConfiguration);

    case "skill_optimization":
      return skillOptimizationConfigurationDeserializer(item as SkillOptimizationConfiguration);

    default:
      return agentOptimizationConfigurationBaseDeserializer(item);
  }
}

/** Optimization job configuration types. */
export type AgentOptimizationConfigurationType =
  "agent_optimization" | "prompt_optimization" | "skill_optimization";

/** Configuration for optimizing an agent for measured quality. */
export interface AgentOptimizationConfiguration extends AgentOptimizationConfigurationBase {
  /** Optimization type discriminator. */
  type: "agent_optimization";
  /** Optimization goal. If omitted, the service defaults to improve_quality. */
  goal?: AgentOptimizationGoal;
  /** Quality measurement configuration. */
  evaluation_configuration: AgentOptimizationEvaluationConfiguration;
  /** Configuration for candidate search and screening. */
  candidate_search_configuration: AgentOptimizationCandidateSearchConfiguration;
  /** Caller-supplied baseline agent configuration. Omitted when all baseline values can be resolved from the target agent. */
  baseline_agent_configuration?: AgentOptimizationBaselineAgentConfiguration;
  /** Agent attributes and alternatives available to the search. */
  agent_optimization_space: AgentOptimizationSpace;
}

export function agentOptimizationConfigurationSerializer(
  item: AgentOptimizationConfiguration,
): any {
  return {
    type: item["type"],
    goal: item["goal"],
    evaluation_configuration: agentOptimizationEvaluationConfigurationSerializer(
      item["evaluation_configuration"],
    ),
    candidate_search_configuration: agentOptimizationCandidateSearchConfigurationSerializer(
      item["candidate_search_configuration"],
    ),
    baseline_agent_configuration: !item["baseline_agent_configuration"]
      ? item["baseline_agent_configuration"]
      : agentOptimizationBaselineAgentConfigurationSerializer(item["baseline_agent_configuration"]),
    agent_optimization_space: agentOptimizationSpaceSerializer(item["agent_optimization_space"]),
  };
}

export function agentOptimizationConfigurationDeserializer(
  item: any,
): AgentOptimizationConfiguration {
  return {
    type: item["type"],
    goal: item["goal"],
    evaluation_configuration: agentOptimizationEvaluationConfigurationDeserializer(
      item["evaluation_configuration"],
    ),
    candidate_search_configuration: agentOptimizationCandidateSearchConfigurationDeserializer(
      item["candidate_search_configuration"],
    ),
    baseline_agent_configuration: !item["baseline_agent_configuration"]
      ? item["baseline_agent_configuration"]
      : agentOptimizationBaselineAgentConfigurationDeserializer(
          item["baseline_agent_configuration"],
        ),
    agent_optimization_space: agentOptimizationSpaceDeserializer(item["agent_optimization_space"]),
  };
}

/** Goal for an agent-optimization job. */
export type AgentOptimizationGoal = "improve_quality";

/** Reusable quality-measurement configuration for agent optimization. */
export interface AgentOptimizationEvaluationConfiguration {
  /** Evaluation set used to guide the optimization search. Inline data supports up to 2,000 test cases when a separate validation set is supplied; otherwise it is also used for validation and is limited to 500. */
  training_set: AgentOptimizationEvaluationSetUnion;
  /** Held-out evaluation set used for full candidate evaluation, limited to 500 inline test cases. The training set is reused and subject to the same 500-test-case validation limit when omitted. */
  validation_set?: AgentOptimizationEvaluationSetUnion;
  /** Evaluator references used to score candidate quality. */
  evaluators: AgentOptimizationEvaluator[];
  /** Model configuration used by model-based evaluators and conversation simulation. */
  evaluation_model: EvaluationModelConfiguration;
  /** Maximum number of target-agent runs executed concurrently during each single-turn evaluation. If omitted, the service defaults to 1. Conversation evaluation supports only 1. */
  max_concurrent_agent_runs?: number;
}

export function agentOptimizationEvaluationConfigurationSerializer(
  item: AgentOptimizationEvaluationConfiguration,
): any {
  return {
    training_set: agentOptimizationEvaluationSetUnionSerializer(item["training_set"]),
    validation_set: !item["validation_set"]
      ? item["validation_set"]
      : agentOptimizationEvaluationSetUnionSerializer(item["validation_set"]),
    evaluators: agentOptimizationEvaluatorArraySerializer(item["evaluators"]),
    evaluation_model: evaluationModelConfigurationSerializer(item["evaluation_model"]),
    max_concurrent_agent_runs: item["max_concurrent_agent_runs"],
  };
}

export function agentOptimizationEvaluationConfigurationDeserializer(
  item: any,
): AgentOptimizationEvaluationConfiguration {
  return {
    training_set: agentOptimizationEvaluationSetUnionDeserializer(item["training_set"]),
    validation_set: !item["validation_set"]
      ? item["validation_set"]
      : agentOptimizationEvaluationSetUnionDeserializer(item["validation_set"]),
    evaluators: agentOptimizationEvaluatorArrayDeserializer(item["evaluators"]),
    evaluation_model: evaluationModelConfigurationDeserializer(item["evaluation_model"]),
    max_concurrent_agent_runs: item["max_concurrent_agent_runs"],
  };
}

/** Base discriminated model for an optimization evaluation set. */
export interface AgentOptimizationEvaluationSet {
  /** Logical format of the evaluation set rows. */
  /** The discriminator possible values: target_completion, user_conversation_simulation */
  type: AgentOptimizationEvaluationSetType;
}

export function agentOptimizationEvaluationSetSerializer(
  item: AgentOptimizationEvaluationSet,
): any {
  return { type: item["type"] };
}

export function agentOptimizationEvaluationSetDeserializer(
  item: any,
): AgentOptimizationEvaluationSet {
  return {
    type: item["type"],
  };
}

/** Alias for AgentOptimizationEvaluationSetUnion */
export type AgentOptimizationEvaluationSetUnion =
  | AgentOptimizationTargetCompletionEvaluationSet
  | AgentOptimizationUserConversationSimulationEvaluationSet
  | AgentOptimizationEvaluationSet;

export function agentOptimizationEvaluationSetUnionSerializer(
  item: AgentOptimizationEvaluationSetUnion,
): any {
  switch (item.type) {
    case "target_completion":
      return agentOptimizationTargetCompletionEvaluationSetSerializer(
        item as AgentOptimizationTargetCompletionEvaluationSet,
      );

    case "user_conversation_simulation":
      return agentOptimizationUserConversationSimulationEvaluationSetSerializer(
        item as AgentOptimizationUserConversationSimulationEvaluationSet,
      );

    default:
      return agentOptimizationEvaluationSetSerializer(item);
  }
}

export function agentOptimizationEvaluationSetUnionDeserializer(
  item: any,
): AgentOptimizationEvaluationSetUnion {
  switch (item["type"]) {
    case "target_completion":
      return agentOptimizationTargetCompletionEvaluationSetDeserializer(
        item as AgentOptimizationTargetCompletionEvaluationSet,
      );

    case "user_conversation_simulation":
      return agentOptimizationUserConversationSimulationEvaluationSetDeserializer(
        item as AgentOptimizationUserConversationSimulationEvaluationSet,
      );

    default:
      return agentOptimizationEvaluationSetDeserializer(item);
  }
}

/** Logical row formats supported by optimization evaluation sets. */
export type AgentOptimizationEvaluationSetType =
  "target_completion" | "user_conversation_simulation";

/** Evaluation set containing independent single-turn inputs. */
export interface AgentOptimizationTargetCompletionEvaluationSet extends AgentOptimizationEvaluationSet {
  /** Target-completion set discriminator. */
  type: "target_completion";
  /** Inline test cases or an explicitly versioned registered Foundry dataset. */
  source: AgentOptimizationTargetCompletionDataSourceUnion;
}

export function agentOptimizationTargetCompletionEvaluationSetSerializer(
  item: AgentOptimizationTargetCompletionEvaluationSet,
): any {
  return {
    type: item["type"],
    source: agentOptimizationTargetCompletionDataSourceUnionSerializer(item["source"]),
  };
}

export function agentOptimizationTargetCompletionEvaluationSetDeserializer(
  item: any,
): AgentOptimizationTargetCompletionEvaluationSet {
  return {
    type: item["type"],
    source: agentOptimizationTargetCompletionDataSourceUnionDeserializer(item["source"]),
  };
}

/** Base source for a target-completion optimization evaluation set. */
export interface AgentOptimizationTargetCompletionDataSource {
  /** Target-completion source type. Additional types may be added in future API versions. */
  /** The discriminator possible values: inline, dataset_reference */
  type: AgentOptimizationDataSourceType;
}

export function agentOptimizationTargetCompletionDataSourceSerializer(
  item: AgentOptimizationTargetCompletionDataSource,
): any {
  return { type: item["type"] };
}

export function agentOptimizationTargetCompletionDataSourceDeserializer(
  item: any,
): AgentOptimizationTargetCompletionDataSource {
  return {
    type: item["type"],
  };
}

/** Alias for AgentOptimizationTargetCompletionDataSourceUnion */
export type AgentOptimizationTargetCompletionDataSourceUnion =
  | AgentOptimizationTargetCompletionInlineDataSource
  | AgentOptimizationTargetCompletionDatasetReferenceDataSource
  | AgentOptimizationTargetCompletionDataSource;

export function agentOptimizationTargetCompletionDataSourceUnionSerializer(
  item: AgentOptimizationTargetCompletionDataSourceUnion,
): any {
  switch (item.type) {
    case "inline":
      return agentOptimizationTargetCompletionInlineDataSourceSerializer(
        item as AgentOptimizationTargetCompletionInlineDataSource,
      );

    case "dataset_reference":
      return agentOptimizationTargetCompletionDatasetReferenceDataSourceSerializer(
        item as AgentOptimizationTargetCompletionDatasetReferenceDataSource,
      );

    default:
      return agentOptimizationTargetCompletionDataSourceSerializer(item);
  }
}

export function agentOptimizationTargetCompletionDataSourceUnionDeserializer(
  item: any,
): AgentOptimizationTargetCompletionDataSourceUnion {
  switch (item["type"]) {
    case "inline":
      return agentOptimizationTargetCompletionInlineDataSourceDeserializer(
        item as AgentOptimizationTargetCompletionInlineDataSource,
      );

    case "dataset_reference":
      return agentOptimizationTargetCompletionDatasetReferenceDataSourceDeserializer(
        item as AgentOptimizationTargetCompletionDatasetReferenceDataSource,
      );

    default:
      return agentOptimizationTargetCompletionDataSourceDeserializer(item);
  }
}

/** Source types supported by optimization evaluation sets. */
export type AgentOptimizationDataSourceType = "inline" | "dataset_reference";

/** Supplies single-turn rows directly in the optimization request. */
export interface AgentOptimizationTargetCompletionInlineDataSource extends AgentOptimizationTargetCompletionDataSource {
  /** Inline source discriminator. */
  type: "inline";
  /** Target-completion test cases. */
  test_cases: AgentOptimizationTargetCompletionTestCase[];
}

export function agentOptimizationTargetCompletionInlineDataSourceSerializer(
  item: AgentOptimizationTargetCompletionInlineDataSource,
): any {
  return {
    type: item["type"],
    test_cases: agentOptimizationTargetCompletionTestCaseArraySerializer(item["test_cases"]),
  };
}

export function agentOptimizationTargetCompletionInlineDataSourceDeserializer(
  item: any,
): AgentOptimizationTargetCompletionInlineDataSource {
  return {
    type: item["type"],
    test_cases: agentOptimizationTargetCompletionTestCaseArrayDeserializer(item["test_cases"]),
  };
}

export function agentOptimizationTargetCompletionTestCaseArraySerializer(
  result: Array<AgentOptimizationTargetCompletionTestCase>,
): any[] {
  return result.map((item) => {
    return agentOptimizationTargetCompletionTestCaseSerializer(item);
  });
}

export function agentOptimizationTargetCompletionTestCaseArrayDeserializer(
  result: Array<AgentOptimizationTargetCompletionTestCase>,
): any[] {
  return result.map((item) => {
    return agentOptimizationTargetCompletionTestCaseDeserializer(item);
  });
}

/** A single item in an inline evaluation set. */
export interface AgentOptimizationTargetCompletionTestCase {
  /** The user query / prompt. */
  query: string;
  /** Expected ground truth answer. Omitted when no ground truth is supplied. */
  ground_truth?: string;
}

export function agentOptimizationTargetCompletionTestCaseSerializer(
  item: AgentOptimizationTargetCompletionTestCase,
): any {
  return { query: item["query"], ground_truth: item["ground_truth"] };
}

export function agentOptimizationTargetCompletionTestCaseDeserializer(
  item: any,
): AgentOptimizationTargetCompletionTestCase {
  return {
    query: item["query"],
    ground_truth: item["ground_truth"],
  };
}

/** References an explicitly versioned registered Foundry dataset for target-completion evaluation. */
export interface AgentOptimizationTargetCompletionDatasetReferenceDataSource extends AgentOptimizationTargetCompletionDataSource {
  /** Registered dataset source discriminator. */
  type: "dataset_reference";
  /** Registered dataset name. */
  name: string;
  /** Registered dataset version. */
  version: string;
}

export function agentOptimizationTargetCompletionDatasetReferenceDataSourceSerializer(
  item: AgentOptimizationTargetCompletionDatasetReferenceDataSource,
): any {
  return { type: item["type"], name: item["name"], version: item["version"] };
}

export function agentOptimizationTargetCompletionDatasetReferenceDataSourceDeserializer(
  item: any,
): AgentOptimizationTargetCompletionDatasetReferenceDataSource {
  return {
    type: item["type"],
    name: item["name"],
    version: item["version"],
  };
}

/** Evaluation set containing scenarios for simulated conversations. */
export interface AgentOptimizationUserConversationSimulationEvaluationSet extends AgentOptimizationEvaluationSet {
  /** User-conversation-simulation set discriminator. */
  type: "user_conversation_simulation";
  /** Inline test cases or an explicitly versioned registered Foundry dataset. */
  source: AgentOptimizationUserConversationSimulationDataSourceUnion;
  /** Defaults applied to every scenario. A test case's simulation_configuration overrides corresponding properties. */
  default_simulation_configuration?: UserConversationSimulationConfiguration;
}

export function agentOptimizationUserConversationSimulationEvaluationSetSerializer(
  item: AgentOptimizationUserConversationSimulationEvaluationSet,
): any {
  return {
    type: item["type"],
    source: agentOptimizationUserConversationSimulationDataSourceUnionSerializer(item["source"]),
    default_simulation_configuration: !item["default_simulation_configuration"]
      ? item["default_simulation_configuration"]
      : userConversationSimulationConfigurationSerializer(item["default_simulation_configuration"]),
  };
}

export function agentOptimizationUserConversationSimulationEvaluationSetDeserializer(
  item: any,
): AgentOptimizationUserConversationSimulationEvaluationSet {
  return {
    type: item["type"],
    source: agentOptimizationUserConversationSimulationDataSourceUnionDeserializer(item["source"]),
    default_simulation_configuration: !item["default_simulation_configuration"]
      ? item["default_simulation_configuration"]
      : userConversationSimulationConfigurationDeserializer(
          item["default_simulation_configuration"],
        ),
  };
}

/** Base source for a user-conversation-simulation optimization evaluation set. */
export interface AgentOptimizationUserConversationSimulationDataSource {
  /** User-conversation-simulation source type. Additional types may be added in future API versions. */
  /** The discriminator possible values: inline, dataset_reference */
  type: AgentOptimizationDataSourceType;
}

export function agentOptimizationUserConversationSimulationDataSourceSerializer(
  item: AgentOptimizationUserConversationSimulationDataSource,
): any {
  return { type: item["type"] };
}

export function agentOptimizationUserConversationSimulationDataSourceDeserializer(
  item: any,
): AgentOptimizationUserConversationSimulationDataSource {
  return {
    type: item["type"],
  };
}

/** Alias for AgentOptimizationUserConversationSimulationDataSourceUnion */
export type AgentOptimizationUserConversationSimulationDataSourceUnion =
  | AgentOptimizationUserConversationSimulationInlineDataSource
  | AgentOptimizationUserConversationSimulationDatasetReferenceDataSource
  | AgentOptimizationUserConversationSimulationDataSource;

export function agentOptimizationUserConversationSimulationDataSourceUnionSerializer(
  item: AgentOptimizationUserConversationSimulationDataSourceUnion,
): any {
  switch (item.type) {
    case "inline":
      return agentOptimizationUserConversationSimulationInlineDataSourceSerializer(
        item as AgentOptimizationUserConversationSimulationInlineDataSource,
      );

    case "dataset_reference":
      return agentOptimizationUserConversationSimulationDatasetReferenceDataSourceSerializer(
        item as AgentOptimizationUserConversationSimulationDatasetReferenceDataSource,
      );

    default:
      return agentOptimizationUserConversationSimulationDataSourceSerializer(item);
  }
}

export function agentOptimizationUserConversationSimulationDataSourceUnionDeserializer(
  item: any,
): AgentOptimizationUserConversationSimulationDataSourceUnion {
  switch (item["type"]) {
    case "inline":
      return agentOptimizationUserConversationSimulationInlineDataSourceDeserializer(
        item as AgentOptimizationUserConversationSimulationInlineDataSource,
      );

    case "dataset_reference":
      return agentOptimizationUserConversationSimulationDatasetReferenceDataSourceDeserializer(
        item as AgentOptimizationUserConversationSimulationDatasetReferenceDataSource,
      );

    default:
      return agentOptimizationUserConversationSimulationDataSourceDeserializer(item);
  }
}

/** Supplies Evals user-conversation simulation test cases directly in the optimization request. */
export interface AgentOptimizationUserConversationSimulationInlineDataSource extends AgentOptimizationUserConversationSimulationDataSource {
  /** Inline source discriminator. */
  type: "inline";
  /** Conversation test scenarios. */
  test_cases: UserConversationSimulationTestCase[];
}

export function agentOptimizationUserConversationSimulationInlineDataSourceSerializer(
  item: AgentOptimizationUserConversationSimulationInlineDataSource,
): any {
  return {
    type: item["type"],
    test_cases: userConversationSimulationTestCaseArraySerializer(item["test_cases"]),
  };
}

export function agentOptimizationUserConversationSimulationInlineDataSourceDeserializer(
  item: any,
): AgentOptimizationUserConversationSimulationInlineDataSource {
  return {
    type: item["type"],
    test_cases: userConversationSimulationTestCaseArrayDeserializer(item["test_cases"]),
  };
}

export function userConversationSimulationTestCaseArraySerializer(
  result: Array<UserConversationSimulationTestCase>,
): any[] {
  return result.map((item) => {
    return userConversationSimulationTestCaseSerializer(item);
  });
}

export function userConversationSimulationTestCaseArrayDeserializer(
  result: Array<UserConversationSimulationTestCase>,
): any[] {
  return result.map((item) => {
    return userConversationSimulationTestCaseDeserializer(item);
  });
}

/** Defines one test scenario. Simulation configuration properties specified here override the corresponding data-source defaults. */
export interface UserConversationSimulationTestCase {
  /** Identifier for the test case. When omitted, the service generates a random identifier. */
  test_case_id?: string;
  /** Category used to group related test cases. When omitted, the service leaves the category null. */
  test_case_category?: string;
  /** Scenario, simulated user goal, and behavioral constraints that guide the conversation. The length must be from 1 through 2,500 characters. */
  test_case_description?: string;
  /** Configuration for conversations generated from this test case. Each specified property overrides the corresponding property in `default_simulation_configuration`. */
  simulation_configuration?: UserConversationSimulationConfiguration;
}

export function userConversationSimulationTestCaseSerializer(
  item: UserConversationSimulationTestCase,
): any {
  return {
    test_case_id: item["test_case_id"],
    test_case_category: item["test_case_category"],
    test_case_description: item["test_case_description"],
    simulation_configuration: !item["simulation_configuration"]
      ? item["simulation_configuration"]
      : userConversationSimulationConfigurationSerializer(item["simulation_configuration"]),
  };
}

export function userConversationSimulationTestCaseDeserializer(
  item: any,
): UserConversationSimulationTestCase {
  return {
    test_case_id: item["test_case_id"],
    test_case_category: item["test_case_category"],
    test_case_description: item["test_case_description"],
    simulation_configuration: !item["simulation_configuration"]
      ? item["simulation_configuration"]
      : userConversationSimulationConfigurationDeserializer(item["simulation_configuration"]),
  };
}

/** Configures the number, length, audio effects, and simulated user behavior of conversations. */
export interface UserConversationSimulationConfiguration {
  /** Hard limit on turns in each conversation. When omitted, the service defaults to 20. */
  max_num_turns?: number;
  /** Number of independent conversation repetitions for each test case. Defaults to 1 when not specified at either the data-source or test-case level. */
  conversation_repetitions?: number;
  /** Target number of turns in each conversation. The effective value cannot exceed the effective `max_num_turns`. When omitted, no target is set and the simulation model determines the conversation length dynamically from the scenario. */
  desired_num_turns?: number;
  /** Audio effects applied to voice conversation simulations. This property is ignored for text-only simulations. */
  audio_effects?: UserConversationSimulationAudioEffectsConfiguration;
  /** Conversation behavior of the simulated user. */
  user_behavior?: UserConversationSimulationUserBehaviorConfiguration;
}

export function userConversationSimulationConfigurationSerializer(
  item: UserConversationSimulationConfiguration,
): any {
  return {
    max_num_turns: item["max_num_turns"],
    conversation_repetitions: item["conversation_repetitions"],
    desired_num_turns: item["desired_num_turns"],
    audio_effects: !item["audio_effects"]
      ? item["audio_effects"]
      : userConversationSimulationAudioEffectsConfigurationSerializer(item["audio_effects"]),
    user_behavior: !item["user_behavior"]
      ? item["user_behavior"]
      : userConversationSimulationUserBehaviorConfigurationSerializer(item["user_behavior"]),
  };
}

export function userConversationSimulationConfigurationDeserializer(
  item: any,
): UserConversationSimulationConfiguration {
  return {
    max_num_turns: item["max_num_turns"],
    conversation_repetitions: item["conversation_repetitions"],
    desired_num_turns: item["desired_num_turns"],
    audio_effects: !item["audio_effects"]
      ? item["audio_effects"]
      : userConversationSimulationAudioEffectsConfigurationDeserializer(item["audio_effects"]),
    user_behavior: !item["user_behavior"]
      ? item["user_behavior"]
      : userConversationSimulationUserBehaviorConfigurationDeserializer(item["user_behavior"]),
  };
}

/** Configures effects applied to simulated conversation audio. */
export interface UserConversationSimulationAudioEffectsConfiguration {
  /** Effects to apply to simulated audio. */
  effects?: UserConversationSimulationAudioEffect[];
  /** Volume of the configured audio effects, as a percentage from 1 through 100. When omitted, the service defaults to 15. */
  volume_percentage?: number;
}

export function userConversationSimulationAudioEffectsConfigurationSerializer(
  item: UserConversationSimulationAudioEffectsConfiguration,
): any {
  return {
    effects: !item["effects"]
      ? item["effects"]
      : item["effects"].map((p: any) => {
          return p;
        }),
    volume_percentage: item["volume_percentage"],
  };
}

export function userConversationSimulationAudioEffectsConfigurationDeserializer(
  item: any,
): UserConversationSimulationAudioEffectsConfiguration {
  return {
    effects: !item["effects"]
      ? item["effects"]
      : item["effects"].map((p: any) => {
          return p;
        }),
    volume_percentage: item["volume_percentage"],
  };
}

/** Effect that can be applied to simulated conversation audio. The union is extensible for additional effects. */
export type UserConversationSimulationAudioEffect =
  "street_traffic" | "crowd_chatter" | "background_tv" | "metro_station" | "telephonic_voice";

/** Configures conversation behavior for the simulated user. */
export interface UserConversationSimulationUserBehaviorConfiguration {
  /** Configures how the simulated user interrupts the target while it is speaking. Omit to disable interruption. */
  interruption?: UserConversationSimulationInterruptionConfigurationUnion;
}

export function userConversationSimulationUserBehaviorConfigurationSerializer(
  item: UserConversationSimulationUserBehaviorConfiguration,
): any {
  return {
    interruption: !item["interruption"]
      ? item["interruption"]
      : userConversationSimulationInterruptionConfigurationUnionSerializer(item["interruption"]),
  };
}

export function userConversationSimulationUserBehaviorConfigurationDeserializer(
  item: any,
): UserConversationSimulationUserBehaviorConfiguration {
  return {
    interruption: !item["interruption"]
      ? item["interruption"]
      : userConversationSimulationInterruptionConfigurationUnionDeserializer(item["interruption"]),
  };
}

/** Configuration for simulated user interruption behavior. */
export interface UserConversationSimulationInterruptionConfiguration {
  /** The interruption type. */
  /** The discriminator possible values: default */
  type: string;
}

export function userConversationSimulationInterruptionConfigurationSerializer(
  item: UserConversationSimulationInterruptionConfiguration,
): any {
  return { type: item["type"] };
}

export function userConversationSimulationInterruptionConfigurationDeserializer(
  item: any,
): UserConversationSimulationInterruptionConfiguration {
  return {
    type: item["type"],
  };
}

/** Alias for UserConversationSimulationInterruptionConfigurationUnion */
export type UserConversationSimulationInterruptionConfigurationUnion =
  | UserConversationSimulationDefaultInterruptionConfiguration
  | UserConversationSimulationInterruptionConfiguration;

export function userConversationSimulationInterruptionConfigurationUnionSerializer(
  item: UserConversationSimulationInterruptionConfigurationUnion,
): any {
  switch (item.type) {
    case "default":
      return userConversationSimulationDefaultInterruptionConfigurationSerializer(
        item as UserConversationSimulationDefaultInterruptionConfiguration,
      );

    default:
      return userConversationSimulationInterruptionConfigurationSerializer(item);
  }
}

export function userConversationSimulationInterruptionConfigurationUnionDeserializer(
  item: any,
): UserConversationSimulationInterruptionConfigurationUnion {
  switch (item["type"]) {
    case "default":
      return userConversationSimulationDefaultInterruptionConfigurationDeserializer(
        item as UserConversationSimulationDefaultInterruptionConfiguration,
      );

    default:
      return userConversationSimulationInterruptionConfigurationDeserializer(item);
  }
}

/** Configures the default interruption behavior for the simulated user. */
export interface UserConversationSimulationDefaultInterruptionConfiguration extends UserConversationSimulationInterruptionConfiguration {
  /** The interruption type, always `default`. */
  type: "default";
}

export function userConversationSimulationDefaultInterruptionConfigurationSerializer(
  item: UserConversationSimulationDefaultInterruptionConfiguration,
): any {
  return { type: item["type"] };
}

export function userConversationSimulationDefaultInterruptionConfigurationDeserializer(
  item: any,
): UserConversationSimulationDefaultInterruptionConfiguration {
  return {
    type: item["type"],
  };
}

/** References an explicitly versioned registered Foundry dataset for user-conversation-simulation evaluation. */
export interface AgentOptimizationUserConversationSimulationDatasetReferenceDataSource extends AgentOptimizationUserConversationSimulationDataSource {
  /** Registered dataset source discriminator. */
  type: "dataset_reference";
  /** Registered dataset name. */
  name: string;
  /** Registered dataset version. */
  version: string;
}

export function agentOptimizationUserConversationSimulationDatasetReferenceDataSourceSerializer(
  item: AgentOptimizationUserConversationSimulationDatasetReferenceDataSource,
): any {
  return { type: item["type"], name: item["name"], version: item["version"] };
}

export function agentOptimizationUserConversationSimulationDatasetReferenceDataSourceDeserializer(
  item: any,
): AgentOptimizationUserConversationSimulationDatasetReferenceDataSource {
  return {
    type: item["type"],
    name: item["name"],
    version: item["version"],
  };
}

export function agentOptimizationEvaluatorArraySerializer(
  result: Array<AgentOptimizationEvaluator>,
): any[] {
  return result.map((item) => {
    return agentOptimizationEvaluatorSerializer(item);
  });
}

export function agentOptimizationEvaluatorArrayDeserializer(
  result: Array<AgentOptimizationEvaluator>,
): any[] {
  return result.map((item) => {
    return agentOptimizationEvaluatorDeserializer(item);
  });
}

/** Reference to a named evaluator, optionally pinned to a version. */
export interface AgentOptimizationEvaluator {
  /** Evaluator name. */
  name: string;
  /** Evaluator version. Omitted to use the latest version. */
  version?: string;
  /** Parameters passed to the evaluator at initialization. Omitted when the evaluator requires no initialization parameters. */
  initialization_parameters?: Record<string, any>;
}

export function agentOptimizationEvaluatorSerializer(item: AgentOptimizationEvaluator): any {
  return {
    name: item["name"],
    version: item["version"],
    initialization_parameters: item["initialization_parameters"],
  };
}

export function agentOptimizationEvaluatorDeserializer(item: any): AgentOptimizationEvaluator {
  return {
    name: item["name"],
    version: item["version"],
    initialization_parameters: !item["initialization_parameters"]
      ? item["initialization_parameters"]
      : Object.fromEntries(
          Object.entries(item["initialization_parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Configures the model that plays the simulated user. This model is separate from the evaluated `target`. */
export interface EvaluationModelConfiguration {
  /** Model deployment that generates simulated user turns, in the format `{connectionName}/modelDeploymentName`. */
  model: string;
  /** Sampling parameters applied when the simulation model produces user turns. */
  sampling_params?: ModelSamplingParams;
  /** Voice configuration used to convert simulated user text to speech. Currently, only Azure standard voices are supported. Omit for text-only simulation. */
  voice_model?: EvaluationVoiceModelConfigurationUnion;
}

export function evaluationModelConfigurationSerializer(item: EvaluationModelConfiguration): any {
  return {
    model: item["model"],
    sampling_params: !item["sampling_params"]
      ? item["sampling_params"]
      : modelSamplingParamsSerializer(item["sampling_params"]),
    voice_model: !item["voice_model"]
      ? item["voice_model"]
      : evaluationVoiceModelConfigurationUnionSerializer(item["voice_model"]),
  };
}

export function evaluationModelConfigurationDeserializer(item: any): EvaluationModelConfiguration {
  return {
    model: item["model"],
    sampling_params: !item["sampling_params"]
      ? item["sampling_params"]
      : modelSamplingParamsDeserializer(item["sampling_params"]),
    voice_model: !item["voice_model"]
      ? item["voice_model"]
      : evaluationVoiceModelConfigurationUnionDeserializer(item["voice_model"]),
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

/** Voice configuration used to convert text to speech for evaluation through the Voice Live endpoint. */
export interface EvaluationVoiceModelConfiguration {
  /** The voice kind. */
  /** The discriminator possible values: azure-standard */
  type: string;
}

export function evaluationVoiceModelConfigurationSerializer(
  item: EvaluationVoiceModelConfiguration,
): any {
  return { type: item["type"] };
}

export function evaluationVoiceModelConfigurationDeserializer(
  item: any,
): EvaluationVoiceModelConfiguration {
  return {
    type: item["type"],
  };
}

/** Alias for EvaluationVoiceModelConfigurationUnion */
export type EvaluationVoiceModelConfigurationUnion =
  EvaluationAzureStandardVoiceModelConfiguration | EvaluationVoiceModelConfiguration;

export function evaluationVoiceModelConfigurationUnionSerializer(
  item: EvaluationVoiceModelConfigurationUnion,
): any {
  switch (item.type) {
    case "azure-standard":
      return evaluationAzureStandardVoiceModelConfigurationSerializer(
        item as EvaluationAzureStandardVoiceModelConfiguration,
      );

    default:
      return evaluationVoiceModelConfigurationSerializer(item);
  }
}

export function evaluationVoiceModelConfigurationUnionDeserializer(
  item: any,
): EvaluationVoiceModelConfigurationUnion {
  switch (item["type"]) {
    case "azure-standard":
      return evaluationAzureStandardVoiceModelConfigurationDeserializer(
        item as EvaluationAzureStandardVoiceModelConfiguration,
      );

    default:
      return evaluationVoiceModelConfigurationDeserializer(item);
  }
}

/** Configures an Azure standard neural voice used to convert text to speech for evaluation through the Voice Live endpoint. */
export interface EvaluationAzureStandardVoiceModelConfiguration extends EvaluationVoiceModelConfiguration {
  /** The voice kind. Always `azure-standard`. */
  type: "azure-standard";
  /** The Azure neural voice name. */
  name: string;
  /** The synthesis temperature, from 0 to 1. When omitted, the service defaults to the underlying voice model's default temperature. */
  temperature?: number;
}

export function evaluationAzureStandardVoiceModelConfigurationSerializer(
  item: EvaluationAzureStandardVoiceModelConfiguration,
): any {
  return { type: item["type"], name: item["name"], temperature: item["temperature"] };
}

export function evaluationAzureStandardVoiceModelConfigurationDeserializer(
  item: any,
): EvaluationAzureStandardVoiceModelConfiguration {
  return {
    type: item["type"],
    name: item["name"],
    temperature: item["temperature"],
  };
}

/** Candidate search settings. */
export interface AgentOptimizationCandidateSearchConfiguration {
  /** Maximum number of non-baseline candidates to fully evaluate. If omitted, the service defaults to 1. */
  max_candidates?: number;
}

export function agentOptimizationCandidateSearchConfigurationSerializer(
  item: AgentOptimizationCandidateSearchConfiguration,
): any {
  return { max_candidates: item["max_candidates"] };
}

export function agentOptimizationCandidateSearchConfigurationDeserializer(
  item: any,
): AgentOptimizationCandidateSearchConfiguration {
  return {
    max_candidates: item["max_candidates"],
  };
}

/** Caller-supplied baseline agent values that cannot be resolved from the target agent. */
export interface AgentOptimizationBaselineAgentConfiguration {
  /** Caller-supplied baseline system prompt. Omitted to resolve the baseline from the target; a prompt agent's stored definition is authoritative. */
  system_prompt?: string;
  /** Current model name. An existing deployment name is also accepted. Omitted to resolve the model from the target. */
  current_model?: string;
  /** Skills available for optimization. Omitted when no manual skill surface is supplied. */
  skills?: AgentOptimizationSkill[];
  /** Function tools available for optimization. Omitted when no manual tool surface is supplied. The optimizer may change function and argument descriptions while preserving names and parameter JSON Schema. */
  tools?: ChatCompletionTool[];
}

export function agentOptimizationBaselineAgentConfigurationSerializer(
  item: AgentOptimizationBaselineAgentConfiguration,
): any {
  return {
    system_prompt: item["system_prompt"],
    current_model: item["current_model"],
    skills: !item["skills"]
      ? item["skills"]
      : agentOptimizationSkillArraySerializer(item["skills"]),
    tools: !item["tools"] ? item["tools"] : chatCompletionToolArraySerializer(item["tools"]),
  };
}

export function agentOptimizationBaselineAgentConfigurationDeserializer(
  item: any,
): AgentOptimizationBaselineAgentConfiguration {
  return {
    system_prompt: item["system_prompt"],
    current_model: item["current_model"],
    skills: !item["skills"]
      ? item["skills"]
      : agentOptimizationSkillArrayDeserializer(item["skills"]),
    tools: !item["tools"] ? item["tools"] : chatCompletionToolArrayDeserializer(item["tools"]),
  };
}

export function agentOptimizationSkillArraySerializer(
  result: Array<AgentOptimizationSkill>,
): any[] {
  return result.map((item) => {
    return agentOptimizationSkillSerializer(item);
  });
}

export function agentOptimizationSkillArrayDeserializer(
  result: Array<AgentOptimizationSkill>,
): any[] {
  return result.map((item) => {
    return agentOptimizationSkillDeserializer(item);
  });
}

/** A skill in the manually supplied agent optimization surface. */
export interface AgentOptimizationSkill {
  /** Stable skill name. */
  name: string;
  /** Short description used for skill discovery and progressive disclosure. */
  description: string;
  /** Skill instructions or content that may be optimized. Omitted when the skill has no body. */
  body?: string;
}

export function agentOptimizationSkillSerializer(item: AgentOptimizationSkill): any {
  return { name: item["name"], description: item["description"], body: item["body"] };
}

export function agentOptimizationSkillDeserializer(item: any): AgentOptimizationSkill {
  return {
    name: item["name"],
    description: item["description"],
    body: item["body"],
  };
}

/** The agent attributes and alternative values available to an agent-optimization search. */
export interface AgentOptimizationSpace {
  /** Agent attributes the optimizer may change. If omitted, the service defaults to instructions. */
  target_attributes?: TargetAttribute[];
  /** Alternative model names or existing deployment names available when model is an optimization target. */
  model_search_space?: string[];
}

export function agentOptimizationSpaceSerializer(item: AgentOptimizationSpace): any {
  return {
    target_attributes: !item["target_attributes"]
      ? item["target_attributes"]
      : item["target_attributes"].map((p: any) => {
          return p;
        }),
    model_search_space: !item["model_search_space"]
      ? item["model_search_space"]
      : item["model_search_space"].map((p: any) => {
          return p;
        }),
  };
}

export function agentOptimizationSpaceDeserializer(item: any): AgentOptimizationSpace {
  return {
    target_attributes: !item["target_attributes"]
      ? item["target_attributes"]
      : item["target_attributes"].map((p: any) => {
          return p;
        }),
    model_search_space: !item["model_search_space"]
      ? item["model_search_space"]
      : item["model_search_space"].map((p: any) => {
          return p;
        }),
  };
}

/** Agent attribute that can be optimized. */
export type TargetAttribute = "instructions" | "model" | "skills" | "tools";

/** Configuration for a one-shot prompt transformation without comparative evaluation. */
export interface PromptOptimizationConfiguration extends AgentOptimizationConfigurationBase {
  /** Optimization type discriminator. */
  type: "prompt_optimization";
  /** Steering context for prompt optimization. Agent trace and skill reference context are supported only by skill optimization. Omitted when no context is supplied. */
  context?: SteeringPromptOptimizationContext[];
}

export function promptOptimizationConfigurationSerializer(
  item: PromptOptimizationConfiguration,
): any {
  return {
    type: item["type"],
    context: !item["context"]
      ? item["context"]
      : steeringPromptOptimizationContextArraySerializer(item["context"]),
  };
}

export function promptOptimizationConfigurationDeserializer(
  item: any,
): PromptOptimizationConfiguration {
  return {
    type: item["type"],
    context: !item["context"]
      ? item["context"]
      : steeringPromptOptimizationContextArrayDeserializer(item["context"]),
  };
}

export function steeringPromptOptimizationContextArraySerializer(
  result: Array<SteeringPromptOptimizationContext>,
): any[] {
  return result.map((item) => {
    return steeringPromptOptimizationContextSerializer(item);
  });
}

export function steeringPromptOptimizationContextArrayDeserializer(
  result: Array<SteeringPromptOptimizationContext>,
): any[] {
  return result.map((item) => {
    return steeringPromptOptimizationContextDeserializer(item);
  });
}

/** Natural-language guidance for the desired optimization. */
export interface SteeringPromptOptimizationContext extends OptimizationContext {
  /** Optimization context type discriminator. */
  type: "steering_prompt";
  /** Developer guidance describing the desired changes. */
  prompt: string;
}

export function steeringPromptOptimizationContextSerializer(
  item: SteeringPromptOptimizationContext,
): any {
  return { type: item["type"], prompt: item["prompt"] };
}

export function steeringPromptOptimizationContextDeserializer(
  item: any,
): SteeringPromptOptimizationContext {
  return {
    type: item["type"],
    prompt: item["prompt"],
  };
}

/** Configuration for generating a single skill candidate from trace evidence. The candidate can contain zero or more skill outcomes; no new learnings can produce an empty skill_results array without publishing versions. Optional evaluation reuses a non-generated baseline candidate. */
export interface SkillOptimizationConfiguration extends AgentOptimizationConfigurationBase {
  /** Skill optimization discriminator. */
  type: "skill_optimization";
  /** At least one context item containing trace evidence, optional steering guidance, and optional exact baseline references. Supply agent_traces context; use separate steering_prompt and skill_references items for guidance and baselines. For skill optimization only, a steering prompt must be non-empty and at most 100 KiB (102,400 UTF-8 bytes), enforced by the service; oversized prompts are rejected rather than truncated. */
  context: OptimizationContextUnion[];
  /** Fraction of generated question groups assigned to learning, strictly greater than 0 and less than 1. Defaults to 0.7 when omitted. Normalized questions and shared source traces stay in the same group, and every generated row belongs to learning or validation. The service rejects splits that leave either side empty. Caller-provided validation data is not split. */
  training_split_ratio?: number;
  /** Optional historical training-trace grading and before/after comparison for supported registered targets. Requires target_configuration, evaluation_model, and one existing evaluator or evaluator_generation_configuration. Training verdicts can inform learning; separate before/after scores report impact and do not drive candidate search, selection, or publication. Omitted to skip new training grading and comparison. */
  evaluation_configuration?: SkillOptimizationEvaluationConfiguration;
}

export function skillOptimizationConfigurationSerializer(
  item: SkillOptimizationConfiguration,
): any {
  return {
    type: item["type"],
    context: optimizationContextUnionArraySerializer(item["context"]),
    training_split_ratio: item["training_split_ratio"],
    evaluation_configuration: !item["evaluation_configuration"]
      ? item["evaluation_configuration"]
      : skillOptimizationEvaluationConfigurationSerializer(item["evaluation_configuration"]),
  };
}

export function skillOptimizationConfigurationDeserializer(
  item: any,
): SkillOptimizationConfiguration {
  return {
    type: item["type"],
    context: optimizationContextUnionArrayDeserializer(item["context"]),
    training_split_ratio: item["training_split_ratio"],
    evaluation_configuration: !item["evaluation_configuration"]
      ? item["evaluation_configuration"]
      : skillOptimizationEvaluationConfigurationDeserializer(item["evaluation_configuration"]),
  };
}

export function optimizationContextUnionArraySerializer(
  result: Array<OptimizationContextUnion>,
): any[] {
  return result.map((item) => {
    return optimizationContextUnionSerializer(item);
  });
}

export function optimizationContextUnionArrayDeserializer(
  result: Array<OptimizationContextUnion>,
): any[] {
  return result.map((item) => {
    return optimizationContextUnionDeserializer(item);
  });
}

/** Base model for typed optimization context. */
export interface OptimizationContext {
  /** Optimization context type discriminator. */
  /** The discriminator possible values: steering_prompt, skill_references, agent_traces */
  type: OptimizationContextType;
}

export function optimizationContextSerializer(item: OptimizationContext): any {
  return { type: item["type"] };
}

export function optimizationContextDeserializer(item: any): OptimizationContext {
  return {
    type: item["type"],
  };
}

/** Alias for OptimizationContextUnion */
export type OptimizationContextUnion =
  | SteeringPromptOptimizationContext
  | SkillReferencesOptimizationContext
  | AgentTracesOptimizationContext
  | OptimizationContext;

export function optimizationContextUnionSerializer(item: OptimizationContextUnion): any {
  switch (item.type) {
    case "steering_prompt":
      return steeringPromptOptimizationContextSerializer(item as SteeringPromptOptimizationContext);

    case "skill_references":
      return skillReferencesOptimizationContextSerializer(
        item as SkillReferencesOptimizationContext,
      );

    case "agent_traces":
      return agentTracesOptimizationContextSerializer(item as AgentTracesOptimizationContext);

    default:
      return optimizationContextSerializer(item);
  }
}

export function optimizationContextUnionDeserializer(item: any): OptimizationContextUnion {
  switch (item["type"]) {
    case "steering_prompt":
      return steeringPromptOptimizationContextDeserializer(
        item as SteeringPromptOptimizationContext,
      );

    case "skill_references":
      return skillReferencesOptimizationContextDeserializer(
        item as SkillReferencesOptimizationContext,
      );

    case "agent_traces":
      return agentTracesOptimizationContextDeserializer(item as AgentTracesOptimizationContext);

    default:
      return optimizationContextDeserializer(item);
  }
}

/** Type of context supplied to an optimization workflow. */
export type OptimizationContextType = "steering_prompt" | "agent_traces" | "skill_references";

/** Explicit exact-version baselines for skill optimization. */
export interface SkillReferencesOptimizationContext extends OptimizationContext {
  /** Skill reference context discriminator. */
  type: "skill_references";
  /** Exact skill versions combined with skills discovered from Prompt or Managed targets, including toolboxes. References across context items and discovered skills are deduplicated. Without a target these are the only baselines; an empty effective inventory permits creation from selected traces. An empty list supplies no explicit baselines. */
  skill_references: AgentOptimizationSkillReferenceUnion[];
}

export function skillReferencesOptimizationContextSerializer(
  item: SkillReferencesOptimizationContext,
): any {
  return {
    type: item["type"],
    skill_references: agentOptimizationSkillReferenceUnionArraySerializer(item["skill_references"]),
  };
}

export function skillReferencesOptimizationContextDeserializer(
  item: any,
): SkillReferencesOptimizationContext {
  return {
    type: item["type"],
    skill_references: agentOptimizationSkillReferenceUnionArrayDeserializer(
      item["skill_references"],
    ),
  };
}

export function agentOptimizationSkillReferenceUnionArraySerializer(
  result: Array<AgentOptimizationSkillReferenceUnion>,
): any[] {
  return result.map((item) => {
    return agentOptimizationSkillReferenceUnionSerializer(item);
  });
}

export function agentOptimizationSkillReferenceUnionArrayDeserializer(
  result: Array<AgentOptimizationSkillReferenceUnion>,
): any[] {
  return result.map((item) => {
    return agentOptimizationSkillReferenceUnionDeserializer(item);
  });
}

/** Base reference to a skill used by optimization. */
export interface AgentOptimizationSkillReference {
  /** Skill reference type. Additional types may be added in future API versions. */
  /** The discriminator possible values: foundry_skill */
  type: AgentOptimizationSkillReferenceType;
}

export function agentOptimizationSkillReferenceSerializer(
  item: AgentOptimizationSkillReference,
): any {
  return { type: item["type"] };
}

export function agentOptimizationSkillReferenceDeserializer(
  item: any,
): AgentOptimizationSkillReference {
  return {
    type: item["type"],
  };
}

/** Alias for AgentOptimizationSkillReferenceUnion */
export type AgentOptimizationSkillReferenceUnion =
  AgentOptimizationFoundrySkillReference | AgentOptimizationSkillReference;

export function agentOptimizationSkillReferenceUnionSerializer(
  item: AgentOptimizationSkillReferenceUnion,
): any {
  switch (item.type) {
    case "foundry_skill":
      return agentOptimizationFoundrySkillReferenceSerializer(
        item as AgentOptimizationFoundrySkillReference,
      );

    default:
      return agentOptimizationSkillReferenceSerializer(item);
  }
}

export function agentOptimizationSkillReferenceUnionDeserializer(
  item: any,
): AgentOptimizationSkillReferenceUnion {
  switch (item["type"]) {
    case "foundry_skill":
      return agentOptimizationFoundrySkillReferenceDeserializer(
        item as AgentOptimizationFoundrySkillReference,
      );

    default:
      return agentOptimizationSkillReferenceDeserializer(item);
  }
}

/** Types of skill references used by optimization. */
export type AgentOptimizationSkillReferenceType = "foundry_skill";

/** Exact reference to an existing skill version in the job's project. */
export interface AgentOptimizationFoundrySkillReference extends AgentOptimizationSkillReference {
  /** Registered Foundry skill reference discriminator. */
  type: "foundry_skill";
  /** Registered skill name, from 1 to 64 characters, following the shared skill naming rules. */
  name: string;
  /** Non-empty opaque pinned version. The aliases latest and default are not accepted. */
  version: string;
}

export function agentOptimizationFoundrySkillReferenceSerializer(
  item: AgentOptimizationFoundrySkillReference,
): any {
  return { type: item["type"], name: item["name"], version: item["version"] };
}

export function agentOptimizationFoundrySkillReferenceDeserializer(
  item: any,
): AgentOptimizationFoundrySkillReference {
  return {
    type: item["type"],
    name: item["name"],
    version: item["version"],
  };
}

/** Trace evidence for skill optimization, selected independently of feedback availability. */
export interface AgentTracesOptimizationContext extends OptimizationContext {
  /** Agent trace context discriminator. */
  type: "agent_traces";
  /** Explicit telemetry selection. Required without a target agent. When omitted with a target, use its project-linked telemetry. Not accepted on steering_prompt context. */
  trace_connection_configuration?: AgentOptimizationTraceConnectionConfigurationUnion;
  /** Trace selection using a fixed half-open window or explicit trace_ids within a lookback interval ending at job creation. */
  trace_window: AgentOptimizationTraceWindowUnion;
}

export function agentTracesOptimizationContextSerializer(
  item: AgentTracesOptimizationContext,
): any {
  return {
    type: item["type"],
    trace_connection_configuration: !item["trace_connection_configuration"]
      ? item["trace_connection_configuration"]
      : agentOptimizationTraceConnectionConfigurationUnionSerializer(
          item["trace_connection_configuration"],
        ),
    trace_window: agentOptimizationTraceWindowUnionSerializer(item["trace_window"]),
  };
}

export function agentTracesOptimizationContextDeserializer(
  item: any,
): AgentTracesOptimizationContext {
  return {
    type: item["type"],
    trace_connection_configuration: !item["trace_connection_configuration"]
      ? item["trace_connection_configuration"]
      : agentOptimizationTraceConnectionConfigurationUnionDeserializer(
          item["trace_connection_configuration"],
        ),
    trace_window: agentOptimizationTraceWindowUnionDeserializer(item["trace_window"]),
  };
}

/** Explicit project-authorized telemetry selection, not an arbitrary endpoint. */
export interface AgentOptimizationTraceConnectionConfiguration {
  /** Trace provider discriminator. */
  /** The discriminator possible values: application_insights */
  type: AgentOptimizationTraceConnectionType;
}

export function agentOptimizationTraceConnectionConfigurationSerializer(
  item: AgentOptimizationTraceConnectionConfiguration,
): any {
  return { type: item["type"] };
}

export function agentOptimizationTraceConnectionConfigurationDeserializer(
  item: any,
): AgentOptimizationTraceConnectionConfiguration {
  return {
    type: item["type"],
  };
}

/** Alias for AgentOptimizationTraceConnectionConfigurationUnion */
export type AgentOptimizationTraceConnectionConfigurationUnion =
  | AgentOptimizationAppInsightsTraceConnectionConfiguration
  | AgentOptimizationTraceConnectionConfiguration;

export function agentOptimizationTraceConnectionConfigurationUnionSerializer(
  item: AgentOptimizationTraceConnectionConfigurationUnion,
): any {
  switch (item.type) {
    case "application_insights":
      return agentOptimizationAppInsightsTraceConnectionConfigurationSerializer(
        item as AgentOptimizationAppInsightsTraceConnectionConfiguration,
      );

    default:
      return agentOptimizationTraceConnectionConfigurationSerializer(item);
  }
}

export function agentOptimizationTraceConnectionConfigurationUnionDeserializer(
  item: any,
): AgentOptimizationTraceConnectionConfigurationUnion {
  switch (item["type"]) {
    case "application_insights":
      return agentOptimizationAppInsightsTraceConnectionConfigurationDeserializer(
        item as AgentOptimizationAppInsightsTraceConnectionConfiguration,
      );

    default:
      return agentOptimizationTraceConnectionConfigurationDeserializer(item);
  }
}

/** Project-authorized trace providers for skill optimization. */
export type AgentOptimizationTraceConnectionType = "application_insights";

/** Selects a project-linked Application Insights component. */
export interface AgentOptimizationAppInsightsTraceConnectionConfiguration extends AgentOptimizationTraceConnectionConfiguration {
  /** Application Insights provider discriminator. */
  type: "application_insights";
  /** Non-empty ARM component resource ID of an Application Insights connection linked to this project. Invalid or unavailable explicit configuration must fail rather than fall back. */
  resource_id: string;
  /** Required without target_configuration and omitted with a target agent. From 1 to 256 characters. Exact, case-sensitive AppRoleName or cloud_RoleName, including any emitted OpenTelemetry namespace prefix. This is a telemetry service identity, not a Foundry agent reference. No surrounding whitespace, wildcards, or KQL. */
  agent_name?: string;
}

export function agentOptimizationAppInsightsTraceConnectionConfigurationSerializer(
  item: AgentOptimizationAppInsightsTraceConnectionConfiguration,
): any {
  return { type: item["type"], resource_id: item["resource_id"], agent_name: item["agent_name"] };
}

export function agentOptimizationAppInsightsTraceConnectionConfigurationDeserializer(
  item: any,
): AgentOptimizationAppInsightsTraceConnectionConfiguration {
  return {
    type: item["type"],
    resource_id: item["resource_id"],
    agent_name: item["agent_name"],
  };
}

/** Trace selection window for a one-time skill optimization job. */
export interface AgentOptimizationTraceWindow {
  /** Trace window discriminator. */
  /** The discriminator possible values: fixed, trace_ids */
  type: AgentOptimizationTraceWindowType;
}

export function agentOptimizationTraceWindowSerializer(item: AgentOptimizationTraceWindow): any {
  return { type: item["type"] };
}

export function agentOptimizationTraceWindowDeserializer(item: any): AgentOptimizationTraceWindow {
  return {
    type: item["type"],
  };
}

/** Alias for AgentOptimizationTraceWindowUnion */
export type AgentOptimizationTraceWindowUnion =
  | AgentOptimizationFixedTraceWindow
  | AgentOptimizationTraceIdsTraceWindow
  | AgentOptimizationTraceWindow;

export function agentOptimizationTraceWindowUnionSerializer(
  item: AgentOptimizationTraceWindowUnion,
): any {
  switch (item.type) {
    case "fixed":
      return agentOptimizationFixedTraceWindowSerializer(item as AgentOptimizationFixedTraceWindow);

    case "trace_ids":
      return agentOptimizationTraceIdsTraceWindowSerializer(
        item as AgentOptimizationTraceIdsTraceWindow,
      );

    default:
      return agentOptimizationTraceWindowSerializer(item);
  }
}

export function agentOptimizationTraceWindowUnionDeserializer(
  item: any,
): AgentOptimizationTraceWindowUnion {
  switch (item["type"]) {
    case "fixed":
      return agentOptimizationFixedTraceWindowDeserializer(
        item as AgentOptimizationFixedTraceWindow,
      );

    case "trace_ids":
      return agentOptimizationTraceIdsTraceWindowDeserializer(
        item as AgentOptimizationTraceIdsTraceWindow,
      );

    default:
      return agentOptimizationTraceWindowDeserializer(item);
  }
}

/** Trace selection strategies for skill optimization. */
export type AgentOptimizationTraceWindowType = "fixed" | "trace_ids";

/** Selects the latest readable trace conversations in a half-open interval, independently of feedback availability. */
export interface AgentOptimizationFixedTraceWindow extends AgentOptimizationTraceWindow {
  /** Fixed-window discriminator. */
  type: "fixed";
  /** Inclusive UTC Unix timestamp in seconds, at or after the Unix epoch. Must precede the effective end_time after truncation to job submission time. The service rejects empty or inverted effective intervals. */
  start_time: Date;
  /** Exclusive UTC Unix timestamp in seconds. A future value is truncated to job submission time, and the effective end is returned in the job configuration. The service does not wait for future traces. */
  end_time: Date;
  /** Maximum number of trace conversations to select, from 1 to 100 inclusive. If omitted, the service defaults to 100. Selects the latest matching readable traces before collecting their annotations or evaluation results; feedback availability does not affect selection priority. */
  max_traces?: number;
}

export function agentOptimizationFixedTraceWindowSerializer(
  item: AgentOptimizationFixedTraceWindow,
): any {
  return {
    type: item["type"],
    start_time: (item["start_time"].getTime() / 1000) | 0,
    end_time: (item["end_time"].getTime() / 1000) | 0,
    max_traces: item["max_traces"],
  };
}

export function agentOptimizationFixedTraceWindowDeserializer(
  item: any,
): AgentOptimizationFixedTraceWindow {
  return {
    type: item["type"],
    start_time: new Date(item["start_time"] * 1000),
    end_time: new Date(item["end_time"] * 1000),
    max_traces: item["max_traces"],
  };
}

/** Selects explicit trace IDs within the configured telemetry source and a lookback interval ending at job creation. */
export interface AgentOptimizationTraceIdsTraceWindow extends AgentOptimizationTraceWindow {
  /** Explicit trace-ID selection discriminator. */
  type: "trace_ids";
  /** At least one explicit trace identifier to look up within the configured telemetry source. Service support, maximum list size, duplicate handling, and missing-ID behavior are TBD. */
  trace_ids: string[];
  /** Telemetry lookup horizon in hours, at least 1. The half-open lookup interval starts this many hours before job creation and ends at job creation; retries do not move the anchor. */
  lookback_hours: number;
}

export function agentOptimizationTraceIdsTraceWindowSerializer(
  item: AgentOptimizationTraceIdsTraceWindow,
): any {
  return {
    type: item["type"],
    trace_ids: item["trace_ids"].map((p: any) => {
      return p;
    }),
    lookback_hours: item["lookback_hours"],
  };
}

export function agentOptimizationTraceIdsTraceWindowDeserializer(
  item: any,
): AgentOptimizationTraceIdsTraceWindow {
  return {
    type: item["type"],
    trace_ids: item["trace_ids"].map((p: any) => {
      return p;
    }),
    lookback_hours: item["lookback_hours"],
  };
}

/** Skill-only evaluation inputs. Training-trace grading can inform single-shot learning; supported before/after comparison reports impact without gating publication. */
export interface SkillOptimizationEvaluationConfiguration {
  /** Optional target-completion validation data, limited to 500 inline test cases. When omitted, the service generates data from the selected traces and partitions it using training_split_ratio for supported before/after comparison. Both comparison runs reuse the same frozen validation dataset. Caller-provided validation data is reused without splitting. Caller-supplied training_set is not accepted. */
  validation_set?: AgentOptimizationTargetCompletionEvaluationSet;
  /** Existing evaluator reference. At submission, supply exactly one reference or evaluator_generation_configuration, not both; the service validates this combination. After preparation, contains the resolved exact evaluator version used for training grading and supported baseline and learned-candidate evaluation. */
  evaluators?: AgentOptimizationEvaluator[];
  /** Required model configuration used for evaluation. Its model also supplies evaluator-generation requests when generation is selected. */
  evaluation_model: EvaluationModelConfiguration;
  /** Maximum number of target-agent runs executed concurrently during each target-completion evaluation, from 1 to 10. If omitted, the service defaults to 1. */
  max_concurrent_agent_runs?: number;
  /** Alternative to an existing evaluator reference at submission. Generates an evaluator using evaluation_model.model. Resolved exact versions are returned in evaluators after preparation. */
  evaluator_generation_configuration?: AgentOptimizationEvaluatorGenerationConfigurationUnion;
}

export function skillOptimizationEvaluationConfigurationSerializer(
  item: SkillOptimizationEvaluationConfiguration,
): any {
  return {
    validation_set: !item["validation_set"]
      ? item["validation_set"]
      : agentOptimizationTargetCompletionEvaluationSetSerializer(item["validation_set"]),
    evaluators: !item["evaluators"]
      ? item["evaluators"]
      : agentOptimizationEvaluatorArraySerializer(item["evaluators"]),
    evaluation_model: evaluationModelConfigurationSerializer(item["evaluation_model"]),
    max_concurrent_agent_runs: item["max_concurrent_agent_runs"],
    evaluator_generation_configuration: !item["evaluator_generation_configuration"]
      ? item["evaluator_generation_configuration"]
      : agentOptimizationEvaluatorGenerationConfigurationUnionSerializer(
          item["evaluator_generation_configuration"],
        ),
  };
}

export function skillOptimizationEvaluationConfigurationDeserializer(
  item: any,
): SkillOptimizationEvaluationConfiguration {
  return {
    validation_set: !item["validation_set"]
      ? item["validation_set"]
      : agentOptimizationTargetCompletionEvaluationSetDeserializer(item["validation_set"]),
    evaluators: !item["evaluators"]
      ? item["evaluators"]
      : agentOptimizationEvaluatorArrayDeserializer(item["evaluators"]),
    evaluation_model: evaluationModelConfigurationDeserializer(item["evaluation_model"]),
    max_concurrent_agent_runs: item["max_concurrent_agent_runs"],
    evaluator_generation_configuration: !item["evaluator_generation_configuration"]
      ? item["evaluator_generation_configuration"]
      : agentOptimizationEvaluatorGenerationConfigurationUnionDeserializer(
          item["evaluator_generation_configuration"],
        ),
  };
}

/** Base configuration for service-generated optimization evaluators. Currently supported for skill optimization only. Uses evaluation_configuration.evaluation_model; no separate generation model is accepted. */
export interface AgentOptimizationEvaluatorGenerationConfiguration {
  /** Evaluator generation source discriminator. */
  /** The discriminator possible values: agent_traces */
  type: AgentOptimizationEvaluatorGenerationSourceType;
  /** Additional instructions or context to guide evaluator generation from the selected source. */
  prompt?: string;
}

export function agentOptimizationEvaluatorGenerationConfigurationSerializer(
  item: AgentOptimizationEvaluatorGenerationConfiguration,
): any {
  return { type: item["type"], prompt: item["prompt"] };
}

export function agentOptimizationEvaluatorGenerationConfigurationDeserializer(
  item: any,
): AgentOptimizationEvaluatorGenerationConfiguration {
  return {
    type: item["type"],
    prompt: item["prompt"],
  };
}

/** Alias for AgentOptimizationEvaluatorGenerationConfigurationUnion */
export type AgentOptimizationEvaluatorGenerationConfigurationUnion =
  | AgentOptimizationTraceEvaluatorGenerationConfiguration
  | AgentOptimizationEvaluatorGenerationConfiguration;

export function agentOptimizationEvaluatorGenerationConfigurationUnionSerializer(
  item: AgentOptimizationEvaluatorGenerationConfigurationUnion,
): any {
  switch (item.type) {
    case "agent_traces":
      return agentOptimizationTraceEvaluatorGenerationConfigurationSerializer(
        item as AgentOptimizationTraceEvaluatorGenerationConfiguration,
      );

    default:
      return agentOptimizationEvaluatorGenerationConfigurationSerializer(item);
  }
}

export function agentOptimizationEvaluatorGenerationConfigurationUnionDeserializer(
  item: any,
): AgentOptimizationEvaluatorGenerationConfigurationUnion {
  switch (item["type"]) {
    case "agent_traces":
      return agentOptimizationTraceEvaluatorGenerationConfigurationDeserializer(
        item as AgentOptimizationTraceEvaluatorGenerationConfiguration,
      );

    default:
      return agentOptimizationEvaluatorGenerationConfigurationDeserializer(item);
  }
}

/** Evidence sources for generating skill-optimization evaluators. */
export type AgentOptimizationEvaluatorGenerationSourceType = "agent_traces";

/** Generates an evaluator from the job's trace evidence or a separate evaluator-only trace selection. */
export interface AgentOptimizationTraceEvaluatorGenerationConfiguration extends AgentOptimizationEvaluatorGenerationConfiguration {
  /** Generate evaluators from the agent_traces context. */
  type: "agent_traces";
  /** Optional trace selection used only to generate the evaluator. When omitted, reuses the agent_traces context window. An override does not change dataset generation, learning evidence, or validation partitioning. Uses the same fixed-window truncation and trace-ID lookup rules as the context window. */
  trace_window?: AgentOptimizationTraceWindowUnion;
}

export function agentOptimizationTraceEvaluatorGenerationConfigurationSerializer(
  item: AgentOptimizationTraceEvaluatorGenerationConfiguration,
): any {
  return {
    type: item["type"],
    prompt: item["prompt"],
    trace_window: !item["trace_window"]
      ? item["trace_window"]
      : agentOptimizationTraceWindowUnionSerializer(item["trace_window"]),
  };
}

export function agentOptimizationTraceEvaluatorGenerationConfigurationDeserializer(
  item: any,
): AgentOptimizationTraceEvaluatorGenerationConfiguration {
  return {
    type: item["type"],
    prompt: item["prompt"],
    trace_window: !item["trace_window"]
      ? item["trace_window"]
      : agentOptimizationTraceWindowUnionDeserializer(item["trace_window"]),
  };
}

/** Inputs for estimating an agent-optimization job. */
export interface AgentOptimizationEstimateInputs {
  /** Foundry agent whose configuration would be optimized. Omitted when the workflow does not target a registered Foundry agent. */
  target_configuration?: AgentOptimizationTargetConfigurationUnion;
  /** Model that would generate candidate changes. An existing deployment name is also accepted. */
  optimization_model_configuration: AgentOptimizationModelConfiguration;
  /** Agent-optimization configuration to estimate. */
  optimization_configuration: AgentOptimizationConfiguration;
}

export function agentOptimizationEstimateInputsSerializer(
  item: AgentOptimizationEstimateInputs,
): any {
  return {
    target_configuration: !item["target_configuration"]
      ? item["target_configuration"]
      : agentOptimizationTargetConfigurationUnionSerializer(item["target_configuration"]),
    optimization_model_configuration: agentOptimizationModelConfigurationSerializer(
      item["optimization_model_configuration"],
    ),
    optimization_configuration: agentOptimizationConfigurationSerializer(
      item["optimization_configuration"],
    ),
  };
}

/** Result returned when estimating an agent-optimization job. */
export interface AgentOptimizationEstimateResult {
  /** Estimated model-call counts grouped by optimization stage. Typical values are calibrated expectations and may be fractional. */
  call_counts?: AgentOptimizationStageEstimate;
  /** Estimated monetary cost. Omitted when no contributing model has pricing data. */
  cost?: AgentOptimizationCostEstimate;
  /** Timestamp of the pricing snapshot used for cost estimation, represented in Unix time. Omitted when no valid pricing snapshot is available. */
  prices_as_of?: Date;
}

export function agentOptimizationEstimateResultDeserializer(
  item: any,
): AgentOptimizationEstimateResult {
  return {
    call_counts: !item["call_counts"]
      ? item["call_counts"]
      : agentOptimizationStageEstimateDeserializer(item["call_counts"]),
    cost: !item["cost"] ? item["cost"] : agentOptimizationCostEstimateDeserializer(item["cost"]),
    prices_as_of: !item["prices_as_of"]
      ? item["prices_as_of"]
      : new Date(item["prices_as_of"] * 1000),
  };
}

/** Estimated values grouped by optimization stage. */
export interface AgentOptimizationStageEstimate {
  /** Estimated values for calls made by the agent being optimized. */
  agent?: AgentOptimizationEstimateBand;
  /** Estimated values for calls that evaluate candidate quality. */
  evaluation?: AgentOptimizationEstimateBand;
  /** Estimated values for calls that generate candidate changes. */
  optimization?: AgentOptimizationEstimateBand;
}

export function agentOptimizationStageEstimateDeserializer(
  item: any,
): AgentOptimizationStageEstimate {
  return {
    agent: !item["agent"]
      ? item["agent"]
      : agentOptimizationEstimateBandDeserializer(item["agent"]),
    evaluation: !item["evaluation"]
      ? item["evaluation"]
      : agentOptimizationEstimateBandDeserializer(item["evaluation"]),
    optimization: !item["optimization"]
      ? item["optimization"]
      : agentOptimizationEstimateBandDeserializer(item["optimization"]),
  };
}

/** A low/typical/ceiling range for an estimated quantity. Cost values apply average per-call usage assumptions to each call-count scenario. Expected values may be fractional, including estimated model-call counts. */
export interface AgentOptimizationEstimateBand {
  /** Lower estimate based on model calls required for every run. */
  low: number;
  /** Expected estimate based on model calls consumed by a typical run. */
  typical: number;
  /** Upper bound calculated from the maximum number of model calls. */
  ceiling: number;
}

export function agentOptimizationEstimateBandDeserializer(
  item: any,
): AgentOptimizationEstimateBand {
  return {
    low: item["low"],
    typical: item["typical"],
    ceiling: item["ceiling"],
  };
}

/** Estimated monetary cost. Present only when at least one contributing model has pricing data. */
export interface AgentOptimizationCostEstimate {
  /** ISO 4217 currency code for all monetary values in this estimate. */
  currency: string;
  /** Total estimated cost across all priced stages. */
  total?: AgentOptimizationEstimateBand;
  /** Estimated cost grouped by optimization stage. */
  by_stage?: AgentOptimizationStageEstimate;
  /** Stages excluded from the total because pricing was unavailable. */
  unpriced_stages?: AgentOptimizationStage[];
}

export function agentOptimizationCostEstimateDeserializer(
  item: any,
): AgentOptimizationCostEstimate {
  return {
    currency: item["currency"],
    total: !item["total"]
      ? item["total"]
      : agentOptimizationEstimateBandDeserializer(item["total"]),
    by_stage: !item["by_stage"]
      ? item["by_stage"]
      : agentOptimizationStageEstimateDeserializer(item["by_stage"]),
    unpriced_stages: !item["unpriced_stages"]
      ? item["unpriced_stages"]
      : item["unpriced_stages"].map((p: any) => {
          return p;
        }),
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultAgentOptimizationJob {
  /** The requested list of items. */
  data: AgentOptimizationJob[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultAgentOptimizationJobDeserializer(
  item: any,
): _AgentsPagedResultAgentOptimizationJob {
  return {
    data: agentOptimizationJobArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function agentOptimizationJobArraySerializer(result: Array<AgentOptimizationJob>): any[] {
  return result.map((item) => {
    return agentOptimizationJobSerializer(item);
  });
}

export function agentOptimizationJobArrayDeserializer(result: Array<AgentOptimizationJob>): any[] {
  return result.map((item) => {
    return agentOptimizationJobDeserializer(item);
  });
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultAgentOptimizationCandidate {
  /** The requested list of items. */
  data: AgentOptimizationCandidate[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultAgentOptimizationCandidateDeserializer(
  item: any,
): _AgentsPagedResultAgentOptimizationCandidate {
  return {
    data: agentOptimizationCandidateArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function agentOptimizationCandidateArrayDeserializer(
  result: Array<AgentOptimizationCandidate>,
): any[] {
  return result.map((item) => {
    return agentOptimizationCandidateDeserializer(item);
  });
}

/** A candidate generated by an optimization job. */
export interface AgentOptimizationCandidate {
  /** Server-assigned candidate identifier. */
  candidate_id: string;
  /** Identifier of the parent optimization job. */
  job_id: string;
  /** Display name of the candidate (e.g., 'baseline', 'instruction-v2'). */
  name: string;
  /** The candidate's current lifecycle state. */
  status: AgentOptimizationCandidateStatus;
  /** Primary failure or skip reason. Omitted for other candidate statuses. */
  error?: ApiError;
  /** Timestamp when work on this candidate slot began, represented in Unix time. */
  started_at: Date;
  /** Typed output generated for this candidate. The output type matches the parent job's optimization type. Omitted until output is available. */
  output?: AgentOptimizationCandidateOutputUnion;
  /** Persisted skill execution snapshot, including partial outcomes. Populated on candidate GET when available and omitted from LIST. */
  execution_summary?: AgentOptimizationSkillExecutionSummary;
  /** Frozen trace cohort and discovered agent skills for skill optimization. Populated on candidate GET when available and omitted from LIST. */
  resolved_context?: AgentOptimizationSkillResolvedContext;
  /** Human-readable explanation of why the optimizer produced this candidate. Populated on candidate GET when available and omitted from LIST. */
  rationale?: string;
  /** Metadata for files generated for this candidate, such as trace analysis. Populated on candidate GET when available and omitted from LIST. An empty list means no files were generated; omission means the inventory is not available. Metadata does not provide file content or a download URL. */
  files?: AgentOptimizationCandidateFile[];
  /** Foundry agent version associated with this candidate. Omitted when no temporary or evaluated agent version was created. */
  agent_version?: string;
  /** Evaluation summary, including reporting-only measurements for skill baseline and generated candidates. Omitted when no measurements are available. Missing scores do not imply success or zero. */
  evaluation?: AgentOptimizationCandidateEvaluation;
  /** Promotion metadata. Omitted if this candidate has not been promoted. */
  promotion?: AgentOptimizationCandidatePromotionInfo;
}

export function agentOptimizationCandidateDeserializer(item: any): AgentOptimizationCandidate {
  return {
    candidate_id: item["candidate_id"],
    job_id: item["job_id"],
    name: item["name"],
    status: item["status"],
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
    started_at: new Date(item["started_at"] * 1000),
    output: !item["output"]
      ? item["output"]
      : agentOptimizationCandidateOutputUnionDeserializer(item["output"]),
    execution_summary: !item["execution_summary"]
      ? item["execution_summary"]
      : agentOptimizationSkillExecutionSummaryDeserializer(item["execution_summary"]),
    resolved_context: !item["resolved_context"]
      ? item["resolved_context"]
      : agentOptimizationSkillResolvedContextDeserializer(item["resolved_context"]),
    rationale: item["rationale"],
    files: !item["files"]
      ? item["files"]
      : agentOptimizationCandidateFileArrayDeserializer(item["files"]),
    agent_version: item["agent_version"],
    evaluation: !item["evaluation"]
      ? item["evaluation"]
      : agentOptimizationCandidateEvaluationDeserializer(item["evaluation"]),
    promotion: !item["promotion"]
      ? item["promotion"]
      : agentOptimizationCandidatePromotionInfoDeserializer(item["promotion"]),
  };
}

/** The candidate's lifecycle state. */
export type AgentOptimizationCandidateStatus =
  "generating" | "evaluating" | "completed" | "failed" | "skipped";

/** Base candidate output. Job types define derived output models with their own fields. */
export interface AgentOptimizationCandidateOutput {
  /** Output type matching the parent job's optimization type. Additional types may be added in future API versions. */
  /** The discriminator possible values: agent_optimization, prompt_optimization, skill_optimization */
  type: AgentOptimizationConfigurationType;
}

export function agentOptimizationCandidateOutputDeserializer(
  item: any,
): AgentOptimizationCandidateOutput {
  return {
    type: item["type"],
  };
}

/** Alias for AgentOptimizationCandidateOutputUnion */
export type AgentOptimizationCandidateOutputUnion =
  | AgentOptimizationAgentCandidateOutput
  | AgentOptimizationPromptCandidateOutput
  | AgentOptimizationSkillCandidateOutput
  | AgentOptimizationCandidateOutput;

export function agentOptimizationCandidateOutputUnionDeserializer(
  item: any,
): AgentOptimizationCandidateOutputUnion {
  switch (item["type"]) {
    case "agent_optimization":
      return agentOptimizationAgentCandidateOutputDeserializer(
        item as AgentOptimizationAgentCandidateOutput,
      );

    case "prompt_optimization":
      return agentOptimizationPromptCandidateOutputDeserializer(
        item as AgentOptimizationPromptCandidateOutput,
      );

    case "skill_optimization":
      return agentOptimizationSkillCandidateOutputDeserializer(
        item as AgentOptimizationSkillCandidateOutput,
      );

    default:
      return agentOptimizationCandidateOutputDeserializer(item);
  }
}

/** Candidate output produced by an agent-optimization job. */
export interface AgentOptimizationAgentCandidateOutput extends AgentOptimizationCandidateOutput {
  type: "agent_optimization";
  /** Typed configuration mutations applied to the baseline. Omitted for the baseline candidate. LIST without `expand=mutations` returns mutation items with only `type`; expanded LIST and candidate GET populate each mutation's `value`. */
  mutations?: AgentOptimizationMutationUnion[];
}

export function agentOptimizationAgentCandidateOutputDeserializer(
  item: any,
): AgentOptimizationAgentCandidateOutput {
  return {
    type: item["type"],
    mutations: !item["mutations"]
      ? item["mutations"]
      : agentOptimizationMutationUnionArrayDeserializer(item["mutations"]),
  };
}

export function agentOptimizationMutationUnionArrayDeserializer(
  result: Array<AgentOptimizationMutationUnion>,
): any[] {
  return result.map((item) => {
    return agentOptimizationMutationUnionDeserializer(item);
  });
}

/** Base candidate mutation. */
export interface AgentOptimizationMutation {
  /** Attribute changed by this mutation. */
  /** The discriminator possible values: instructions, model, skills, tools */
  type: TargetAttribute;
}

export function agentOptimizationMutationDeserializer(item: any): AgentOptimizationMutation {
  return {
    type: item["type"],
  };
}

/** Alias for AgentOptimizationMutationUnion */
export type AgentOptimizationMutationUnion =
  | AgentOptimizationInstructionsMutation
  | AgentOptimizationModelMutation
  | AgentOptimizationSkillsMutation
  | AgentOptimizationToolsMutation
  | AgentOptimizationMutation;

export function agentOptimizationMutationUnionDeserializer(
  item: any,
): AgentOptimizationMutationUnion {
  switch (item["type"]) {
    case "instructions":
      return agentOptimizationInstructionsMutationDeserializer(
        item as AgentOptimizationInstructionsMutation,
      );

    case "model":
      return agentOptimizationModelMutationDeserializer(item as AgentOptimizationModelMutation);

    case "skills":
      return agentOptimizationSkillsMutationDeserializer(item as AgentOptimizationSkillsMutation);

    case "tools":
      return agentOptimizationToolsMutationDeserializer(item as AgentOptimizationToolsMutation);

    default:
      return agentOptimizationMutationDeserializer(item);
  }
}

/** Instructions mutation. */
export interface AgentOptimizationInstructionsMutation extends AgentOptimizationMutation {
  type: "instructions";
  /** Optimized agent instructions. Omitted on LIST unless `expand=mutations` is specified. */
  value?: string;
}

export function agentOptimizationInstructionsMutationDeserializer(
  item: any,
): AgentOptimizationInstructionsMutation {
  return {
    type: item["type"],
    value: item["value"],
  };
}

/** Model mutation. */
export interface AgentOptimizationModelMutation extends AgentOptimizationMutation {
  type: "model";
  /** Selected model name or deployment name. Omitted on LIST unless `expand=mutations` is specified. */
  value?: string;
}

export function agentOptimizationModelMutationDeserializer(
  item: any,
): AgentOptimizationModelMutation {
  return {
    type: item["type"],
    value: item["value"],
  };
}

/** Skill mutations. */
export interface AgentOptimizationSkillsMutation extends AgentOptimizationMutation {
  type: "skills";
  /** Added or changed skills. Omitted on LIST unless `expand=mutations` is specified. */
  value?: AgentOptimizationSkill[];
}

export function agentOptimizationSkillsMutationDeserializer(
  item: any,
): AgentOptimizationSkillsMutation {
  return {
    type: item["type"],
    value: !item["value"] ? item["value"] : agentOptimizationSkillArrayDeserializer(item["value"]),
  };
}

/** Tool mutations. */
export interface AgentOptimizationToolsMutation extends AgentOptimizationMutation {
  type: "tools";
  /** Added or changed function tools. Omitted on LIST unless `expand=mutations` is specified. */
  value?: ChatCompletionTool[];
}

export function agentOptimizationToolsMutationDeserializer(
  item: any,
): AgentOptimizationToolsMutation {
  return {
    type: item["type"],
    value: !item["value"] ? item["value"] : chatCompletionToolArrayDeserializer(item["value"]),
  };
}

/** Candidate output produced by a prompt-optimization job. */
export interface AgentOptimizationPromptCandidateOutput extends AgentOptimizationCandidateOutput {
  type: "prompt_optimization";
  /** Typed configuration mutations applied to the baseline. Omitted for the baseline candidate. LIST without `expand=mutations` returns mutation items with only `type`; expanded LIST and candidate GET populate each mutation's `value`. */
  mutations?: AgentOptimizationMutationUnion[];
}

export function agentOptimizationPromptCandidateOutputDeserializer(
  item: any,
): AgentOptimizationPromptCandidateOutput {
  return {
    type: item["type"],
    mutations: !item["mutations"]
      ? item["mutations"]
      : agentOptimizationMutationUnionArrayDeserializer(item["mutations"]),
  };
}

/** Output of the single generated candidate produced by trace-driven skill optimization. It can contain zero or more independent skill outcomes. Optional reporting-only evaluation reuses a baseline candidate and each candidate's evaluation summary; the baseline is not a generated alternative. */
export interface AgentOptimizationSkillCandidateOutput extends AgentOptimizationCandidateOutput {
  /** Skill optimization output discriminator. */
  type: "skill_optimization";
  /** Independent proposed skill outcomes. A completed empty array means no changes were proposed, for example because there were no new learnings; no new versions are published in that case. Discovered but untouched skills do not require outcomes. Populated on candidate GET when available and omitted from LIST summaries. */
  skill_results?: AgentOptimizationSkillResult[];
}

export function agentOptimizationSkillCandidateOutputDeserializer(
  item: any,
): AgentOptimizationSkillCandidateOutput {
  return {
    type: item["type"],
    skill_results: !item["skill_results"]
      ? item["skill_results"]
      : agentOptimizationSkillResultArrayDeserializer(item["skill_results"]),
  };
}

export function agentOptimizationSkillResultArrayDeserializer(
  result: Array<AgentOptimizationSkillResult>,
): any[] {
  return result.map((item) => {
    return agentOptimizationSkillResultDeserializer(item);
  });
}

/** One independent skill outcome with its input baseline and intended or confirmed output. */
export interface AgentOptimizationSkillResult {
  /** Validation or publication outcome. */
  status: AgentOptimizationSkillResultStatus;
  /** Exact input baseline when updating or retaining an existing skill, with the same name as output_skill. Omitted when creating a new skill. */
  input_skill?: AgentOptimizationSkillReferenceUnion;
  /** Intended identity for every result. A confirmed version appears only with status created; no_change retains the baseline version only in input_skill. */
  output_skill: AgentOptimizationSkillOutputReferenceUnion;
  /** Safe, human-readable explanation of why this skill was proposed or retained, grounded in the selected evidence. Omitted until available. Must not include sensitive trace excerpts or hidden model reasoning. */
  rationale?: string;
  /** Artifact checks, including rejections. Absence does not imply success. Candidate evaluation is reported through AgentOptimizationCandidate.evaluation and is not included in per-skill validations. */
  validations?: AgentOptimizationSkillValidationUnion[];
  /** Primary failure, rejection, or uncertain-publication reason. Detailed findings remain in validations. Omitted when there is no error. */
  error?: AgentOptimizationSkillResultError;
}

export function agentOptimizationSkillResultDeserializer(item: any): AgentOptimizationSkillResult {
  return {
    status: item["status"],
    input_skill: !item["input_skill"]
      ? item["input_skill"]
      : agentOptimizationSkillReferenceUnionDeserializer(item["input_skill"]),
    output_skill: agentOptimizationSkillOutputReferenceUnionDeserializer(item["output_skill"]),
    rationale: item["rationale"],
    validations: !item["validations"]
      ? item["validations"]
      : agentOptimizationSkillValidationUnionArrayDeserializer(item["validations"]),
    error: !item["error"]
      ? item["error"]
      : agentOptimizationSkillResultErrorDeserializer(item["error"]),
  };
}

/** Publication or validation outcome for one skill, independent of whole-job status. */
export type AgentOptimizationSkillResultStatus =
  "created" | "no_change" | "rejected" | "pending" | "failed" | "publication_unknown";

/** Base intended output identity, not proof that a skill version was created. */
export interface AgentOptimizationSkillOutputReference {
  /** Skill reference type. Additional types may be added in future API versions. */
  /** The discriminator possible values: foundry_skill */
  type: AgentOptimizationSkillReferenceType;
}

export function agentOptimizationSkillOutputReferenceDeserializer(
  item: any,
): AgentOptimizationSkillOutputReference {
  return {
    type: item["type"],
  };
}

/** Alias for AgentOptimizationSkillOutputReferenceUnion */
export type AgentOptimizationSkillOutputReferenceUnion =
  AgentOptimizationFoundrySkillOutputReference | AgentOptimizationSkillOutputReference;

export function agentOptimizationSkillOutputReferenceUnionDeserializer(
  item: any,
): AgentOptimizationSkillOutputReferenceUnion {
  switch (item["type"]) {
    case "foundry_skill":
      return agentOptimizationFoundrySkillOutputReferenceDeserializer(
        item as AgentOptimizationFoundrySkillOutputReference,
      );

    default:
      return agentOptimizationSkillOutputReferenceDeserializer(item);
  }
}

/** Intended output identity, not proof that a skill version was created. */
export interface AgentOptimizationFoundrySkillOutputReference extends AgentOptimizationSkillOutputReference {
  /** Registered Foundry skill reference discriminator. */
  type: "foundry_skill";
  /** Non-empty intended skill name, retained for rejected, failed, pending, and unchanged results. */
  name: string;
  /** Non-empty exact service-returned version, present only with status created after confirmed publication. Never copy the input version here or infer a version for an uncertain write. */
  version?: string;
}

export function agentOptimizationFoundrySkillOutputReferenceDeserializer(
  item: any,
): AgentOptimizationFoundrySkillOutputReference {
  return {
    type: item["type"],
    name: item["name"],
    version: item["version"],
  };
}

export function agentOptimizationSkillValidationUnionArrayDeserializer(
  result: Array<AgentOptimizationSkillValidationUnion>,
): any[] {
  return result.map((item) => {
    return agentOptimizationSkillValidationUnionDeserializer(item);
  });
}

/** Base validation category; reporting-only performance scores use the baseline and generated candidate evaluation summaries. */
export interface AgentOptimizationSkillValidation {
  /** Validation category discriminator. */
  /** The discriminator possible values: artifact */
  type: AgentOptimizationSkillValidationType;
}

export function agentOptimizationSkillValidationDeserializer(
  item: any,
): AgentOptimizationSkillValidation {
  return {
    type: item["type"],
  };
}

/** Alias for AgentOptimizationSkillValidationUnion */
export type AgentOptimizationSkillValidationUnion =
  AgentOptimizationSkillArtifactValidation | AgentOptimizationSkillValidation;

export function agentOptimizationSkillValidationUnionDeserializer(
  item: any,
): AgentOptimizationSkillValidationUnion {
  switch (item["type"]) {
    case "artifact":
      return agentOptimizationSkillArtifactValidationDeserializer(
        item as AgentOptimizationSkillArtifactValidation,
      );

    default:
      return agentOptimizationSkillValidationDeserializer(item);
  }
}

/** Categories of per-skill validation. */
export type AgentOptimizationSkillValidationType = "artifact";

/** Per-skill artifact validation with explicit coverage and limitations. */
export interface AgentOptimizationSkillArtifactValidation extends AgentOptimizationSkillValidation {
  /** Artifact validation discriminator. */
  type: "artifact";
  /** Check identifier. Each (type, id) pair is unique within one skill result. */
  id: AgentOptimizationSkillValidationId;
  /** Whether the check ran and its outcome. Unimplemented checks are omitted. */
  status: AgentOptimizationSkillValidationStatus;
  /** Safe explanation of coverage, limitations, or why the check did not run, at most 1,024 characters. Limited checks must not imply full-package coverage; no sensitive excerpts. */
  details: string;
  /** Service-authored failure or availability code. Omitted when unavailable. */
  error_code?: string;
  /** Advisory quality or overlap score from 0 to 1 inclusive, not a comparative candidate evaluation score. */
  score?: number;
}

export function agentOptimizationSkillArtifactValidationDeserializer(
  item: any,
): AgentOptimizationSkillArtifactValidation {
  return {
    type: item["type"],
    id: item["id"],
    status: item["status"],
    details: item["details"],
    error_code: item["error_code"],
    score: item["score"],
  };
}

/** Artifact check identifier. Only implemented checks in the validation plan are reported. */
export type AgentOptimizationSkillValidationId =
  | "schema"
  | "format"
  | "pii"
  | "lint-scripts"
  | "quality"
  | "security-scan"
  | "overlap"
  | "package_integrity"
  | "target_compatibility"
  | "evidence_provenance";

/** Status of an artifact validation and its coverage. */
export type AgentOptimizationSkillValidationStatus =
  "passed" | "failed" | "warning" | "skipped" | "unavailable";

/** Structured error for an independent skill outcome. */
export interface AgentOptimizationSkillResultError {
  /** Stable service-authored error code, from 1 to 128 characters. */
  code: string;
  /** Safe explanation, from 1 to 1,024 characters, never raw exceptions or sensitive trace or model content. */
  message: string;
}

export function agentOptimizationSkillResultErrorDeserializer(
  item: any,
): AgentOptimizationSkillResultError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Persisted candidate execution snapshot, including partial runs. Not exposed on the job or candidate list response. */
export interface AgentOptimizationSkillExecutionSummary {
  /** Time the recorded execution facts last changed, as a UTC Unix timestamp in seconds. */
  updated_at: Date;
  /** At most eleven distinct steps in pipeline order. Older snapshots may omit collect_feedback or evaluate_training_traces. */
  steps: AgentOptimizationSkillExecutionStep[];
}

export function agentOptimizationSkillExecutionSummaryDeserializer(
  item: any,
): AgentOptimizationSkillExecutionSummary {
  return {
    updated_at: new Date(item["updated_at"] * 1000),
    steps: agentOptimizationSkillExecutionStepArrayDeserializer(item["steps"]),
  };
}

export function agentOptimizationSkillExecutionStepArrayDeserializer(
  result: Array<AgentOptimizationSkillExecutionStep>,
): any[] {
  return result.map((item) => {
    return agentOptimizationSkillExecutionStepDeserializer(item);
  });
}

/** Latest recorded state of one logical step in the persisted execution snapshot. */
export interface AgentOptimizationSkillExecutionStep {
  /** Service-authored logical step name, unique within the snapshot, for example resolve_inputs, collect_traces, evaluate_training_traces, or publish_skills. Consumers must tolerate unfamiliar names. */
  name: string;
  /** Recorded step state. */
  status: AgentOptimizationSkillExecutionStepStatus;
  /** Safe service-authored explanation, at most 1,024 characters, never raw model or trace content. */
  summary?: string;
  /** Step-specific JSON key/value details, with arbitrary JSON values rather than a fixed property schema. Omitted when unavailable. Never include sensitive trace or model content. */
  step_details?: Record<string, any>;
  /** Safe failure or cancellation code, cleared when a retry starts or succeeds. */
  error_code?: string;
}

export function agentOptimizationSkillExecutionStepDeserializer(
  item: any,
): AgentOptimizationSkillExecutionStep {
  return {
    name: item["name"],
    status: item["status"],
    summary: item["summary"],
    step_details: !item["step_details"]
      ? item["step_details"]
      : Object.fromEntries(
          Object.entries(item["step_details"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    error_code: item["error_code"],
  };
}

/** Latest recorded state of a logical execution step. */
export type AgentOptimizationSkillExecutionStepStatus =
  "not_started" | "in_progress" | "completed" | "failed" | "skipped" | "cancelled";

/** Frozen evidence and discovered baselines, without duplicating requested job configuration. */
export interface AgentOptimizationSkillResolvedContext {
  /** Complete evidence cohort, including traces that produced no artifact. Omitted before resolution; an empty array means a resolved empty cohort. */
  source_trace_ids?: string[];
  /** Deduplicated exact baselines discovered from the agent and its toolboxes. Excludes skills supplied only through skill_references context items and does not imply invocation. Omitted before discovery; empty when none were discovered or the job is agentless. */
  agent_skills?: AgentOptimizationSkillReferenceUnion[];
}

export function agentOptimizationSkillResolvedContextDeserializer(
  item: any,
): AgentOptimizationSkillResolvedContext {
  return {
    source_trace_ids: !item["source_trace_ids"]
      ? item["source_trace_ids"]
      : item["source_trace_ids"].map((p: any) => {
          return p;
        }),
    agent_skills: !item["agent_skills"]
      ? item["agent_skills"]
      : agentOptimizationSkillReferenceUnionArrayDeserializer(item["agent_skills"]),
  };
}

export function agentOptimizationCandidateFileArrayDeserializer(
  result: Array<AgentOptimizationCandidateFile>,
): any[] {
  return result.map((item) => {
    return agentOptimizationCandidateFileDeserializer(item);
  });
}

/** Metadata for an artifact generated for an optimization candidate. */
export interface AgentOptimizationCandidateFile {
  /** Non-empty candidate-relative artifact path, not a local filesystem path or a download URL. */
  path: string;
  /** Non-empty artifact category, for example trace_analysis. Additional categories may be returned. */
  type: string;
  /** Artifact size in bytes, greater than or equal to 0. */
  size_in_bytes: number;
}

export function agentOptimizationCandidateFileDeserializer(
  item: any,
): AgentOptimizationCandidateFile {
  return {
    path: item["path"],
    type: item["type"],
    size_in_bytes: item["size_in_bytes"],
  };
}

/** Comparative evaluation summary for a candidate. */
export interface AgentOptimizationCandidateEvaluation {
  /** Average composite score across evaluated tasks. Omitted until scoring produces an aggregate score. */
  score?: number;
  /** Average total tokens consumed per task. Omitted when token usage was not measured. */
  avg_tokens?: number;
  /** Average end-to-end latency per task, rounded to milliseconds. */
  avg_latency_ms?: number;
  /** Foundry evaluation identifier used to score this candidate. Omitted when unavailable. */
  eval_id?: string;
  /** Foundry evaluation run identifier used to score this candidate. Omitted when unavailable. */
  eval_run_id?: string;
  /** Timestamp when full candidate evaluation completed, represented in Unix time. Omitted when unavailable. */
  completed_at?: Date;
}

export function agentOptimizationCandidateEvaluationDeserializer(
  item: any,
): AgentOptimizationCandidateEvaluation {
  return {
    score: item["score"],
    avg_tokens: item["avg_tokens"],
    avg_latency_ms: item["avg_latency_ms"],
    eval_id: item["eval_id"],
    eval_run_id: item["eval_run_id"],
    completed_at: !item["completed_at"]
      ? item["completed_at"]
      : new Date(item["completed_at"] * 1000),
  };
}

export function microsoft365PermissionScopesArraySerializer(
  result: Array<Microsoft365PermissionScopes>,
): any[] {
  return result.map((item) => {
    return microsoft365PermissionScopesSerializer(item);
  });
}

/** A set of delegated permission scopes requested from a single resource application. */
export interface Microsoft365PermissionScopes {
  /** Application id of the resource that exposes the requested delegated scopes. */
  resourceAppId: string;
  /** Delegated scope names requested from the resource application. Must not be empty. */
  scopes: string[];
}

export function microsoft365PermissionScopesSerializer(item: Microsoft365PermissionScopes): any {
  return {
    resourceAppId: item["resourceAppId"],
    scopes: item["scopes"].map((p: any) => {
      return p;
    }),
  };
}

/** The publish scope for the generated Microsoft Teams app. */
export type Microsoft365PublishScope = "Personal" | "Shared" | "Tenant";

/** Response from publishing an agent to Microsoft 365 / Microsoft Teams. */
export interface Microsoft365PublishResponse {
  /** The Microsoft 365 title id of the published app. */
  titleId?: string;
  /** The Microsoft Teams app id of the published app. */
  teamsAppId?: string;
}

export function microsoft365PublishResponseDeserializer(item: any): Microsoft365PublishResponse {
  return {
    titleId: item["titleId"],
    teamsAppId: item["teamsAppId"],
  };
}

/**
 * Default and previously-published values used to pre-populate a Microsoft 365 publish request for a
 * Foundry agent.
 */
export interface Microsoft365PublishDefaults {
  /** The publish scope. */
  appPublishScope?: Microsoft365PublishScope;
  /** The agent name. */
  agentName?: string;
  /**
   * The user-facing display name for the agent. Defaults to the agent name if not previously
   * overridden.
   */
  agentDisplayName?: string;
  /** The app-registration client id associated with the agent. */
  appRegistrationClientId?: string;
  /** ARM resource id of the Azure Bot Service associated with the previously-published app, if any. */
  botServiceArmId?: string;
  /** The most recently published app version. */
  appVersion?: string;
  /** The recommended next app version (the most recent app version, incremented). */
  recommendedNextAppVersion?: string;
  /** The Microsoft 365 title id of the previously-published app, if any. */
  titleId?: string;
  /** The Microsoft Teams app id of the previously-published app, if any. */
  teamsAppId?: string;
  /** Short, one-line description shown in the Teams app listing. */
  shortDescription?: string;
  /** Full description shown on the Teams app details page. */
  fullDescription?: string;
  /** Display name of the developer / publisher. */
  developerName?: string;
  /** Developer / publisher website URL. */
  developerWebsiteUrl?: string;
  /** Privacy policy URL. */
  privacyUrl?: string;
  /** Terms-of-use URL. */
  termsOfUseUrl?: string;
}

export function microsoft365PublishDefaultsDeserializer(item: any): Microsoft365PublishDefaults {
  return {
    appPublishScope: item["appPublishScope"],
    agentName: item["agentName"],
    agentDisplayName: item["agentDisplayName"],
    appRegistrationClientId: item["appRegistrationClientId"],
    botServiceArmId: item["botServiceArmId"],
    appVersion: item["appVersion"],
    recommendedNextAppVersion: item["recommendedNextAppVersion"],
    titleId: item["titleId"],
    teamsAppId: item["teamsAppId"],
    shortDescription: item["shortDescription"],
    fullDescription: item["fullDescription"],
    developerName: item["developerName"],
    developerWebsiteUrl: item["developerWebsiteUrl"],
    privacyUrl: item["privacyUrl"],
    termsOfUseUrl: item["termsOfUseUrl"],
  };
}

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

/** model interface _SessionDirectoryListResponse */
export interface _SessionDirectoryListResponse {
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

export function _sessionDirectoryListResponseDeserializer(
  item: any,
): _SessionDirectoryListResponse {
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
  /** Timing for timerTrigger rules. Required for timerTrigger and not allowed for other event types. */
  schedule?: TriggerUnion;
  /** Provisioning state of the rule's schedule. Returned for timerTrigger rules only. */
  readonly provisioningStatus?: ScheduleProvisioningStatus;
  /** Error that caused the rule to be disabled, if any. */
  readonly error?: ErrorModel;
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
    schedule: !item["schedule"] ? item["schedule"] : triggerUnionSerializer(item["schedule"]),
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
    schedule: !item["schedule"] ? item["schedule"] : triggerUnionDeserializer(item["schedule"]),
    provisioningStatus: item["provisioningStatus"],
    error: !item["error"] ? item["error"] : item["error"],
    enabled: item["enabled"],
    systemData: Object.fromEntries(
      Object.entries(item["systemData"]).map(([k, p]: [string, any]) => [k, p]),
    ),
  };
}

/** Evaluation action model. */
export interface EvaluationRuleAction {
  /** Type of the evaluation action. */
  /** The discriminator possible values: continuousEvaluation, traceEvaluation, datasetEvaluation, humanEvaluationPreview */
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
  | TraceEvaluationRuleAction
  | DatasetEvaluationRuleAction
  | HumanEvaluationPreviewRuleAction
  | EvaluationRuleAction;

export function evaluationRuleActionUnionSerializer(item: EvaluationRuleActionUnion): any {
  switch (item.type) {
    case "continuousEvaluation":
      return continuousEvaluationRuleActionSerializer(item as ContinuousEvaluationRuleAction);

    case "traceEvaluation":
      return traceEvaluationRuleActionSerializer(item as TraceEvaluationRuleAction);

    case "datasetEvaluation":
      return datasetEvaluationRuleActionSerializer(item as DatasetEvaluationRuleAction);

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

    case "traceEvaluation":
      return traceEvaluationRuleActionDeserializer(item as TraceEvaluationRuleAction);

    case "datasetEvaluation":
      return datasetEvaluationRuleActionDeserializer(item as DatasetEvaluationRuleAction);

    case "humanEvaluationPreview":
      return humanEvaluationPreviewRuleActionDeserializer(item as HumanEvaluationPreviewRuleAction);

    default:
      return evaluationRuleActionDeserializer(item);
  }
}

/** Type of the evaluation action. */
export type EvaluationRuleActionType =
  "continuousEvaluation" | "humanEvaluationPreview" | "traceEvaluation" | "datasetEvaluation";

/** Evaluation rule action for continuous evaluation. */
export interface ContinuousEvaluationRuleAction extends EvaluationRuleAction {
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

/** Configures a scheduled evaluation of observed agent traces. */
export interface TraceEvaluationRuleAction extends EvaluationRuleAction {
  type: "traceEvaluation";
  /** Identifier of the evaluation used to score the selected traces. */
  evalId: string;
  /**
   * Trace inputs for each scheduled occurrence. The selected variant's query-window and sampling behavior is preserved.
   *
   * For `azure_ai_traces`, set exactly one of `agent_id` or `agent_name`; `trace_ids` is not supported.
   * For `azure_ai_trace_data_source`, set `trace_source`.
   * Preview source types may appear in responses for existing schedules but are rejected on create and update.
   */
  source: TraceEvaluationSource;
  /** Level at which each scheduled run evaluates. Required when the evaluation uses the messages item schema. */
  evaluation_level?: EvaluationLevel;
}

export function traceEvaluationRuleActionSerializer(item: TraceEvaluationRuleAction): any {
  return {
    type: item["type"],
    evalId: item["evalId"],
    source: traceEvaluationSourceSerializer(item["source"]),
    evaluation_level: item["evaluation_level"],
  };
}

export function traceEvaluationRuleActionDeserializer(item: any): TraceEvaluationRuleAction {
  return {
    type: item["type"],
    evalId: item["evalId"],
    source: traceEvaluationSourceDeserializer(item["source"]),
    evaluation_level: item["evaluation_level"],
  };
}

/** Existing trace-evaluation inputs supported by scheduled rules. */
export type TraceEvaluationSource =
  | TracesEvalRunDataSource
  | AzureAITraceDataSourceEvalRunDataSource
  | TracesPreviewEvalRunDataSource
  | AzureAITraceDataSourcePreviewEvalRunDataSource;

export function traceEvaluationSourceSerializer(item: TraceEvaluationSource): any {
  return item;
}

export function traceEvaluationSourceDeserializer(item: any): TraceEvaluationSource {
  return item;
}

/**
 * A data source for evaluation runs over agent traces stored in Application Insights.
 *
 * See [create an evaluation dataset from traces](https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/traces-to-dataset?tabs=python).
 */
export interface TracesEvalRunDataSource extends EvalRunDataSource {
  /** The type of data source, always `azure_ai_traces`. */
  type: "azure_ai_traces";
  /** Collection of Agent trace identifiers that should be evaluated. */
  trace_ids?: string[];
  /** Collection of conversation identifiers to filter traces by conversation. */
  conversation_ids?: string[];
  /** The agent ID used to filter traces for evaluation. */
  agent_id?: string;
  /** The agent name used to filter traces for evaluation. */
  agent_name?: string;
  /**
   * Lookback window (in hours) applied when retrieving traces from Application Insights.
   *     For scheduled evaluations this is inferred from the recurrence interval.
   */
  lookback_hours?: number;
  /** Unix timestamp (in seconds) marking the end of the trace query window. Defaults to the current time. */
  end_time?: Date;
  /** Sampling limit applied to traces retrieved for evaluation. */
  max_traces?: number;
  /** The delay to apply for ingestion when querying traces. */
  ingestion_delay_seconds?: number;
}

export function tracesEvalRunDataSourceSerializer(item: TracesEvalRunDataSource): any {
  return {
    type: item["type"],
    trace_ids: !item["trace_ids"]
      ? item["trace_ids"]
      : item["trace_ids"].map((p: any) => {
          return p;
        }),
    conversation_ids: !item["conversation_ids"]
      ? item["conversation_ids"]
      : item["conversation_ids"].map((p: any) => {
          return p;
        }),
    agent_id: item["agent_id"],
    agent_name: item["agent_name"],
    lookback_hours: item["lookback_hours"],
    end_time: !item["end_time"] ? item["end_time"] : (item["end_time"].getTime() / 1000) | 0,
    max_traces: item["max_traces"],
    ingestion_delay_seconds: item["ingestion_delay_seconds"],
  };
}

export function tracesEvalRunDataSourceDeserializer(item: any): TracesEvalRunDataSource {
  return {
    type: item["type"],
    trace_ids: !item["trace_ids"]
      ? item["trace_ids"]
      : item["trace_ids"].map((p: any) => {
          return p;
        }),
    conversation_ids: !item["conversation_ids"]
      ? item["conversation_ids"]
      : item["conversation_ids"].map((p: any) => {
          return p;
        }),
    agent_id: item["agent_id"],
    agent_name: item["agent_name"],
    lookback_hours: item["lookback_hours"],
    end_time: !item["end_time"] ? item["end_time"] : new Date(item["end_time"] * 1000),
    max_traces: item["max_traces"],
    ingestion_delay_seconds: item["ingestion_delay_seconds"],
  };
}

/**
 * A data source that selects traces for evaluation.
 *
 * See [create an evaluation dataset from traces](https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/traces-to-dataset?tabs=python).
 */
export interface AzureAITraceDataSourceEvalRunDataSource extends EvalRunDataSource {
  /** The type of data source, always `azure_ai_trace_data_source`. */
  type: "azure_ai_trace_data_source";
  /** The trace source that defines how traces are selected for evaluation. */
  trace_source?: TraceSourceUnion;
}

export function azureAITraceDataSourceEvalRunDataSourceSerializer(
  item: AzureAITraceDataSourceEvalRunDataSource,
): any {
  return {
    type: item["type"],
    trace_source: !item["trace_source"]
      ? item["trace_source"]
      : traceSourceUnionSerializer(item["trace_source"]),
  };
}

export function azureAITraceDataSourceEvalRunDataSourceDeserializer(
  item: any,
): AzureAITraceDataSourceEvalRunDataSource {
  return {
    type: item["type"],
    trace_source: !item["trace_source"]
      ? item["trace_source"]
      : traceSourceUnionDeserializer(item["trace_source"]),
  };
}

/** Base class for polymorphic trace sources nested within an AzureAITraceDataSourceEvalRunDataSource. */
export interface TraceSource {
  /** The discriminator that identifies which kind of trace source this is. */
  /** The discriminator possible values: trace_id_source, conversation_id_source, agent_filter */
  type: TraceSourceType;
}

export function traceSourceSerializer(item: TraceSource): any {
  return { type: item["type"] };
}

export function traceSourceDeserializer(item: any): TraceSource {
  return {
    type: item["type"],
  };
}

/** Alias for TraceSourceUnion */
export type TraceSourceUnion =
  TraceIdTraceSource | ConversationIdTraceSource | AgentFilterTraceSource | TraceSource;

export function traceSourceUnionSerializer(item: TraceSourceUnion): any {
  switch (item.type) {
    case "trace_id_source":
      return traceIdTraceSourceSerializer(item as TraceIdTraceSource);

    case "conversation_id_source":
      return conversationIdTraceSourceSerializer(item as ConversationIdTraceSource);

    case "agent_filter":
      return agentFilterTraceSourceSerializer(item as AgentFilterTraceSource);

    default:
      return traceSourceSerializer(item);
  }
}

export function traceSourceUnionDeserializer(item: any): TraceSourceUnion {
  switch (item["type"]) {
    case "trace_id_source":
      return traceIdTraceSourceDeserializer(item as TraceIdTraceSource);

    case "conversation_id_source":
      return conversationIdTraceSourceDeserializer(item as ConversationIdTraceSource);

    case "agent_filter":
      return agentFilterTraceSourceDeserializer(item as AgentFilterTraceSource);

    default:
      return traceSourceDeserializer(item);
  }
}

/** Specifies the type of trace source used to select traces for evaluation. */
export type TraceSourceType = "trace_id_source" | "conversation_id_source" | "agent_filter";

/** A trace source that selects traces by explicit trace IDs. */
export interface TraceIdTraceSource extends TraceSource {
  /** The type of trace source, always `trace_id_source`. */
  type: "trace_id_source";
  /** Collection of trace identifiers to evaluate. */
  trace_ids: string[];
}

export function traceIdTraceSourceSerializer(item: TraceIdTraceSource): any {
  return {
    type: item["type"],
    trace_ids: item["trace_ids"].map((p: any) => {
      return p;
    }),
  };
}

export function traceIdTraceSourceDeserializer(item: any): TraceIdTraceSource {
  return {
    type: item["type"],
    trace_ids: item["trace_ids"].map((p: any) => {
      return p;
    }),
  };
}

/** A trace source that selects traces by conversation IDs. */
export interface ConversationIdTraceSource extends TraceSource {
  /** The type of trace source, always `conversation_id_source`. */
  type: "conversation_id_source";
  /** Collection of conversation identifiers to filter traces by. */
  conversation_ids: string[];
}

export function conversationIdTraceSourceSerializer(item: ConversationIdTraceSource): any {
  return {
    type: item["type"],
    conversation_ids: item["conversation_ids"].map((p: any) => {
      return p;
    }),
  };
}

export function conversationIdTraceSourceDeserializer(item: any): ConversationIdTraceSource {
  return {
    type: item["type"],
    conversation_ids: item["conversation_ids"].map((p: any) => {
      return p;
    }),
  };
}

/** A trace source that selects traces by agent reference with time-based filtering. */
export interface AgentFilterTraceSource extends TraceSource {
  /** The type of trace source, always `agent_filter`. */
  type: "agent_filter";
  /** The identifier of the agent to filter traces by. */
  agent_id?: string;
  /** The name of the agent to filter traces by. */
  agent_name?: string;
  /** The version of the agent to filter traces by. */
  agent_version?: string;
  /** Start time for the trace query window, expressed as a Unix timestamp (seconds). */
  start_time?: Date;
  /** End time for the trace query window, expressed as a Unix timestamp (seconds). */
  end_time?: Date;
  /** Maximum number of traces to sample. Must be greater than 0. */
  max_traces?: number;
  /** The strategy used to filter traces. */
  filter_strategy?: FilterStrategyType;
}

export function agentFilterTraceSourceSerializer(item: AgentFilterTraceSource): any {
  return {
    type: item["type"],
    agent_id: item["agent_id"],
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
    start_time: !item["start_time"]
      ? item["start_time"]
      : (item["start_time"].getTime() / 1000) | 0,
    end_time: !item["end_time"] ? item["end_time"] : (item["end_time"].getTime() / 1000) | 0,
    max_traces: item["max_traces"],
    filter_strategy: item["filter_strategy"],
  };
}

export function agentFilterTraceSourceDeserializer(item: any): AgentFilterTraceSource {
  return {
    type: item["type"],
    agent_id: item["agent_id"],
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
    start_time: !item["start_time"] ? item["start_time"] : new Date(item["start_time"] * 1000),
    end_time: !item["end_time"] ? item["end_time"] : new Date(item["end_time"] * 1000),
    max_traces: item["max_traces"],
    filter_strategy: item["filter_strategy"],
  };
}

/** Specifies the type of filter strategy used to select traces for evaluation. */
export type FilterStrategyType = "random_sampling" | "smart_filtering";

/** Preview form of `azure_ai_traces`. Returned only for rules backed by existing preview schedules; rejected on create and update. */
export interface TracesPreviewEvalRunDataSource extends EvalRunDataSource {
  /** The type of data source, always `azure_ai_traces_preview`. */
  type: "azure_ai_traces_preview";
  /** Collection of Agent trace identifiers that should be evaluated. */
  trace_ids?: string[];
  /** Collection of conversation identifiers to filter traces by conversation. */
  conversation_ids?: string[];
  /** The agent ID used to filter traces for evaluation. */
  agent_id?: string;
  /** The agent name used to filter traces for evaluation. */
  agent_name?: string;
  /**
   * Lookback window (in hours) applied when retrieving traces from Application Insights.
   *     For scheduled evaluations this is inferred from the recurrence interval.
   */
  lookback_hours?: number;
  /** Unix timestamp (in seconds) marking the end of the trace query window. Defaults to the current time. */
  end_time?: Date;
  /** Sampling limit applied to traces retrieved for evaluation. */
  max_traces?: number;
  /** The delay to apply for ingestion when querying traces. */
  ingestion_delay_seconds?: number;
}

export function tracesPreviewEvalRunDataSourceSerializer(
  item: TracesPreviewEvalRunDataSource,
): any {
  return {
    type: item["type"],
    trace_ids: !item["trace_ids"]
      ? item["trace_ids"]
      : item["trace_ids"].map((p: any) => {
          return p;
        }),
    conversation_ids: !item["conversation_ids"]
      ? item["conversation_ids"]
      : item["conversation_ids"].map((p: any) => {
          return p;
        }),
    agent_id: item["agent_id"],
    agent_name: item["agent_name"],
    lookback_hours: item["lookback_hours"],
    end_time: !item["end_time"] ? item["end_time"] : (item["end_time"].getTime() / 1000) | 0,
    max_traces: item["max_traces"],
    ingestion_delay_seconds: item["ingestion_delay_seconds"],
  };
}

export function tracesPreviewEvalRunDataSourceDeserializer(
  item: any,
): TracesPreviewEvalRunDataSource {
  return {
    type: item["type"],
    trace_ids: !item["trace_ids"]
      ? item["trace_ids"]
      : item["trace_ids"].map((p: any) => {
          return p;
        }),
    conversation_ids: !item["conversation_ids"]
      ? item["conversation_ids"]
      : item["conversation_ids"].map((p: any) => {
          return p;
        }),
    agent_id: item["agent_id"],
    agent_name: item["agent_name"],
    lookback_hours: item["lookback_hours"],
    end_time: !item["end_time"] ? item["end_time"] : new Date(item["end_time"] * 1000),
    max_traces: item["max_traces"],
    ingestion_delay_seconds: item["ingestion_delay_seconds"],
  };
}

/** Preview form of `azure_ai_trace_data_source`. Returned only for rules backed by existing preview schedules; rejected on create and update. */
export interface AzureAITraceDataSourcePreviewEvalRunDataSource extends EvalRunDataSource {
  /** The type of data source, always `azure_ai_trace_data_source_preview`. */
  type: "azure_ai_trace_data_source_preview";
  /** The trace source that defines how traces are selected for evaluation. */
  trace_source?: TraceSourceUnion;
}

export function azureAITraceDataSourcePreviewEvalRunDataSourceSerializer(
  item: AzureAITraceDataSourcePreviewEvalRunDataSource,
): any {
  return {
    type: item["type"],
    trace_source: !item["trace_source"]
      ? item["trace_source"]
      : traceSourceUnionSerializer(item["trace_source"]),
  };
}

export function azureAITraceDataSourcePreviewEvalRunDataSourceDeserializer(
  item: any,
): AzureAITraceDataSourcePreviewEvalRunDataSource {
  return {
    type: item["type"],
    trace_source: !item["trace_source"]
      ? item["trace_source"]
      : traceSourceUnionDeserializer(item["trace_source"]),
  };
}

/** The level at which evaluation is performed. */
export type EvaluationLevel = "turn" | "conversation";

/** Configures a scheduled evaluation of dataset inputs. */
export interface DatasetEvaluationRuleAction extends EvaluationRuleAction {
  type: "datasetEvaluation";
  /** Identifier of the evaluation used to score the dataset. */
  evalId: string;
  /** Dataset inputs for each scheduled occurrence. Preview source types may appear in responses for existing schedules but are rejected on create and update. */
  source: DatasetEvaluationSource;
  /** Level at which each scheduled run evaluates. Required when the evaluation uses the messages item schema. */
  evaluation_level?: EvaluationLevel;
}

export function datasetEvaluationRuleActionSerializer(item: DatasetEvaluationRuleAction): any {
  return {
    type: item["type"],
    evalId: item["evalId"],
    source: datasetEvaluationSourceSerializer(item["source"]),
    evaluation_level: item["evaluation_level"],
  };
}

export function datasetEvaluationRuleActionDeserializer(item: any): DatasetEvaluationRuleAction {
  return {
    type: item["type"],
    evalId: item["evalId"],
    source: datasetEvaluationSourceDeserializer(item["source"]),
    evaluation_level: item["evaluation_level"],
  };
}

/** Dataset inputs supported by scheduled rules. Targets are configured within the selected source. */
export type DatasetEvaluationSource =
  | CreateEvalJsonlRunDataSource
  | EvalCsvRunDataSource
  | CreateEvalCompletionsRunDataSource
  | TargetCompletionEvalRunDataSource
  | UserConversationSimulationEvalRunDataSource
  | UserConversationSimulationPreviewEvalRunDataSource;

export function datasetEvaluationSourceSerializer(item: DatasetEvaluationSource): any {
  return item;
}

export function datasetEvaluationSourceDeserializer(item: any): DatasetEvaluationSource {
  return item;
}

/**
 * A CSV data source for evaluation runs.
 *
 * See [evaluation datasets](https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/evaluation-datasets).
 */
export interface EvalCsvRunDataSource extends EvalRunDataSource {
  /** The type of data source, always `csv`. */
  type: "csv";
  /** The source of the CSV data, either inline content or a file reference. */
  source: EvalCsvFileIdSource;
}

export function evalCsvRunDataSourceSerializer(item: EvalCsvRunDataSource): any {
  return { type: item["type"], source: evalCsvFileIdSourceSerializer(item["source"]) };
}

export function evalCsvRunDataSourceDeserializer(item: any): EvalCsvRunDataSource {
  return {
    type: item["type"],
    source: evalCsvFileIdSourceDeserializer(item["source"]),
  };
}

/** Represents a reference to an uploaded CSV file used as a source for evaluation data. */
export interface EvalCsvFileIdSource {
  /** The type of source, always `file_id`. */
  type: "file_id";
  /** The identifier of the uploaded CSV file. */
  id: string;
}

export function evalCsvFileIdSourceSerializer(item: EvalCsvFileIdSource): any {
  return { type: item["type"], id: item["id"] };
}

export function evalCsvFileIdSourceDeserializer(item: any): EvalCsvFileIdSource {
  return {
    type: item["type"],
    id: item["id"],
  };
}

/**
 * A data source for evaluating model or agent target completions.
 *
 * See [evaluate conversations](https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/cloud-evaluation-conversations?tabs=python).
 */
export interface TargetCompletionEvalRunDataSource extends EvalRunDataSource {
  /** The type of data source, always `azure_ai_target_completions`. */
  type: "azure_ai_target_completions";
  /** Input messages configuration. */
  input_messages?: CreateEvalCompletionsRunDataSourceInputMessagesItemReference;
  /** The source configuration for inline or file data. */
  source: EvalJsonlFileContentSource | EvalJsonlFileIdSource;
  /** The target configuration for the evaluation. */
  target: EvaluationTargetUnion;
  /** The parameters for item generation. */
  item_generation_params?: ItemGenerationParamsUnion;
}

export function targetCompletionEvalRunDataSourceSerializer(
  item: TargetCompletionEvalRunDataSource,
): any {
  return {
    type: item["type"],
    input_messages: !item["input_messages"]
      ? item["input_messages"]
      : createEvalCompletionsRunDataSourceInputMessagesItemReferenceSerializer(
          item["input_messages"],
        ),
    source: _targetCompletionEvalRunDataSourceSourceSerializer(item["source"]),
    target: evaluationTargetUnionSerializer(item["target"]),
    item_generation_params: !item["item_generation_params"]
      ? item["item_generation_params"]
      : itemGenerationParamsUnionSerializer(item["item_generation_params"]),
  };
}

export function targetCompletionEvalRunDataSourceDeserializer(
  item: any,
): TargetCompletionEvalRunDataSource {
  return {
    type: item["type"],
    input_messages: !item["input_messages"]
      ? item["input_messages"]
      : createEvalCompletionsRunDataSourceInputMessagesItemReferenceDeserializer(
          item["input_messages"],
        ),
    source: _targetCompletionEvalRunDataSourceSourceDeserializer(item["source"]),
    target: evaluationTargetUnionDeserializer(item["target"]),
    item_generation_params: !item["item_generation_params"]
      ? item["item_generation_params"]
      : itemGenerationParamsUnionDeserializer(item["item_generation_params"]),
  };
}

/** Alias for _TargetCompletionEvalRunDataSourceSource */
export type _TargetCompletionEvalRunDataSourceSource =
  EvalJsonlFileContentSource | EvalJsonlFileIdSource;

export function _targetCompletionEvalRunDataSourceSourceSerializer(
  item: _TargetCompletionEvalRunDataSourceSource,
): any {
  return item;
}

export function _targetCompletionEvalRunDataSourceSourceDeserializer(
  item: any,
): _TargetCompletionEvalRunDataSourceSource {
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

/**
 * A target that identifies an Azure AI model.
 *
 * See [evaluate administrator-connected models](https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/evaluate-admin-connected-models?tabs=python).
 */
export interface AzureAIModelTarget extends EvaluationTarget {
  /** The type of target, always `azure_ai_model`. */
  type: "azure_ai_model";
  /** The name of the model deployment to invoke as the evaluation target. */
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

/**
 * A target that identifies an Azure AI agent.
 *
 * See [evaluate model or agent targets](https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/cloud-evaluation-targets?tabs=python).
 */
export interface AzureAIAgentTarget extends EvaluationTarget {
  /** The type of target, always `azure_ai_agent`. */
  type: "azure_ai_agent";
  /** The name of the Azure AI agent to invoke as the evaluation target. */
  name: string;
  /** The version of the Azure AI agent. When omitted, the latest version is used. */
  version?: string;
  /** Optional descriptions of tools available to the agent. */
  tool_descriptions?: ToolDescription[];
  /** Tool definitions made available when invoking the agent. */
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

/**
 * Configures how the service prepares input items for an evaluation run before applying testing criteria.
 *
 * Depending on `type`, preparation can generate new inputs, retrieve existing responses, transform source data, or simulate conversations. Each `type` selects a workflow-specific model with the parameters required by that preparation workflow. These parameters do not define the evaluated target or the testing criteria.
 */
export interface ItemGenerationParams {
  /** Preparation workflow to use. This discriminator determines which additional parameters are available. */
  /** The discriminator possible values: red_team, red_team_seed_prompts, red_team_taxonomy, response_retrieval, synthetic_data_gen, target_completion */
  type: ItemGenerationParamsType;
}

export function itemGenerationParamsSerializer(item: ItemGenerationParams): any {
  return { type: item["type"] };
}

export function itemGenerationParamsDeserializer(item: any): ItemGenerationParams {
  return {
    type: item["type"],
  };
}

/** Alias for ItemGenerationParamsUnion */
export type ItemGenerationParamsUnion =
  | RedTeamItemGenerationParams
  | RedTeamSeedPromptsItemGenerationParams
  | RedTeamTaxonomyItemGenerationParams
  | ResponseRetrievalItemGenerationParams
  | SyntheticDataGenerationItemGenerationParams
  | TargetCompletionItemGenerationParams
  | ItemGenerationParams;

export function itemGenerationParamsUnionSerializer(item: ItemGenerationParamsUnion): any {
  switch (item.type) {
    case "red_team":
      return redTeamItemGenerationParamsSerializer(item as RedTeamItemGenerationParams);

    case "red_team_seed_prompts":
      return redTeamSeedPromptsItemGenerationParamsSerializer(
        item as RedTeamSeedPromptsItemGenerationParams,
      );

    case "red_team_taxonomy":
      return redTeamTaxonomyItemGenerationParamsSerializer(
        item as RedTeamTaxonomyItemGenerationParams,
      );

    case "response_retrieval":
      return responseRetrievalItemGenerationParamsSerializer(
        item as ResponseRetrievalItemGenerationParams,
      );

    case "synthetic_data_gen":
      return syntheticDataGenerationItemGenerationParamsSerializer(
        item as SyntheticDataGenerationItemGenerationParams,
      );

    case "target_completion":
      return targetCompletionItemGenerationParamsSerializer(
        item as TargetCompletionItemGenerationParams,
      );

    default:
      return itemGenerationParamsSerializer(item);
  }
}

export function itemGenerationParamsUnionDeserializer(item: any): ItemGenerationParamsUnion {
  switch (item["type"]) {
    case "red_team":
      return redTeamItemGenerationParamsDeserializer(item as RedTeamItemGenerationParams);

    case "red_team_seed_prompts":
      return redTeamSeedPromptsItemGenerationParamsDeserializer(
        item as RedTeamSeedPromptsItemGenerationParams,
      );

    case "red_team_taxonomy":
      return redTeamTaxonomyItemGenerationParamsDeserializer(
        item as RedTeamTaxonomyItemGenerationParams,
      );

    case "response_retrieval":
      return responseRetrievalItemGenerationParamsDeserializer(
        item as ResponseRetrievalItemGenerationParams,
      );

    case "synthetic_data_gen":
      return syntheticDataGenerationItemGenerationParamsDeserializer(
        item as SyntheticDataGenerationItemGenerationParams,
      );

    case "target_completion":
      return targetCompletionItemGenerationParamsDeserializer(
        item as TargetCompletionItemGenerationParams,
      );

    default:
      return itemGenerationParamsDeserializer(item);
  }
}

/** Identifies how evaluation input items are prepared before evaluation. */
export type ItemGenerationParamsType =
  | "red_team"
  | "response_retrieval"
  | "red_team_seed_prompts"
  | "red_team_taxonomy"
  | "synthetic_data_gen"
  | "target_completion";

/** Represents the parameters for red team item generation. */
export interface RedTeamItemGenerationParams extends ItemGenerationParams {
  /** The type of item generation parameters. */
  type: "red_team";
  /** The collection of attack strategies to be used. */
  attack_strategies: AttackStrategy[];
  /** The number of turns allowed in the game. */
  num_turns: number;
}

export function redTeamItemGenerationParamsSerializer(item: RedTeamItemGenerationParams): any {
  return {
    type: item["type"],
    attack_strategies: item["attack_strategies"].map((p: any) => {
      return p;
    }),
    num_turns: item["num_turns"],
  };
}

export function redTeamItemGenerationParamsDeserializer(item: any): RedTeamItemGenerationParams {
  return {
    type: item["type"],
    attack_strategies: item["attack_strategies"].map((p: any) => {
      return p;
    }),
    num_turns: item["num_turns"],
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

/** Represents the parameters for red team seed prompts item generation. */
export interface RedTeamSeedPromptsItemGenerationParams extends ItemGenerationParams {
  /** The type of item generation parameters, always `red_team_seed_prompts`. */
  type: "red_team_seed_prompts";
  /** The collection of attack strategies to be used. */
  attack_strategies: AttackStrategy[];
  /** The number of turns allowed in the game. */
  num_turns: number;
  /** The source of JSONL content to be processed. */
  source: EvalJsonlFileContentSource;
}

export function redTeamSeedPromptsItemGenerationParamsSerializer(
  item: RedTeamSeedPromptsItemGenerationParams,
): any {
  return {
    type: item["type"],
    attack_strategies: item["attack_strategies"].map((p: any) => {
      return p;
    }),
    num_turns: item["num_turns"],
    source: evalJsonlFileContentSourceSerializer(item["source"]),
  };
}

export function redTeamSeedPromptsItemGenerationParamsDeserializer(
  item: any,
): RedTeamSeedPromptsItemGenerationParams {
  return {
    type: item["type"],
    attack_strategies: item["attack_strategies"].map((p: any) => {
      return p;
    }),
    num_turns: item["num_turns"],
    source: evalJsonlFileContentSourceDeserializer(item["source"]),
  };
}

/** Represents the parameters for red team taxonomy item generation. */
export interface RedTeamTaxonomyItemGenerationParams extends ItemGenerationParams {
  /** The type of item generation parameters, always `red_team_taxonomy`. */
  type: "red_team_taxonomy";
  /** The collection of attack strategies to be used. */
  attack_strategies: AttackStrategy[];
  /** The number of turns allowed in the game. */
  num_turns: number;
  /** The source from which JSONL content is read. */
  source: EvalJsonlFileContentSource;
}

export function redTeamTaxonomyItemGenerationParamsSerializer(
  item: RedTeamTaxonomyItemGenerationParams,
): any {
  return {
    type: item["type"],
    attack_strategies: item["attack_strategies"].map((p: any) => {
      return p;
    }),
    num_turns: item["num_turns"],
    source: evalJsonlFileContentSourceSerializer(item["source"]),
  };
}

export function redTeamTaxonomyItemGenerationParamsDeserializer(
  item: any,
): RedTeamTaxonomyItemGenerationParams {
  return {
    type: item["type"],
    attack_strategies: item["attack_strategies"].map((p: any) => {
      return p;
    }),
    num_turns: item["num_turns"],
    source: evalJsonlFileContentSourceDeserializer(item["source"]),
  };
}

/**
 * Parameters for retrieving deployed conversations for evaluation.
 *
 * See [evaluate deployed conversations](https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/cloud-evaluation-deployed-conversations?tabs=python).
 */
export interface ResponseRetrievalItemGenerationParams extends ItemGenerationParams {
  /** The type of item generation parameters, always `response_retrieval`. */
  type: "response_retrieval";
  /** The maximum number of turns of chat history to evaluate. */
  max_num_turns: number;
  /**
   * Maps `response_id` to the source field that contains a stored Responses API
   * response identifier. For example, `{"response_id": "{{item.resp_id}}"}`.
   * Field names are case-sensitive.
   */
  data_mapping: Record<string, string>;
  /**
   * The inline JSONL content containing the response identifiers to retrieve.
   * The `azure_ai_responses` data source supports `file_content` only;
   * providing a `file_id` results in a `400 Bad Request` response.
   */
  source: EvalJsonlFileContentSource | EvalJsonlFileIdSource;
}

export function responseRetrievalItemGenerationParamsSerializer(
  item: ResponseRetrievalItemGenerationParams,
): any {
  return {
    type: item["type"],
    max_num_turns: item["max_num_turns"],
    data_mapping: item["data_mapping"],
    source: _responseRetrievalItemGenerationParamsSourceSerializer(item["source"]),
  };
}

export function responseRetrievalItemGenerationParamsDeserializer(
  item: any,
): ResponseRetrievalItemGenerationParams {
  return {
    type: item["type"],
    max_num_turns: item["max_num_turns"],
    data_mapping: Object.fromEntries(
      Object.entries(item["data_mapping"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    source: _responseRetrievalItemGenerationParamsSourceDeserializer(item["source"]),
  };
}

/** Alias for _ResponseRetrievalItemGenerationParamsSource */
export type _ResponseRetrievalItemGenerationParamsSource =
  EvalJsonlFileContentSource | EvalJsonlFileIdSource;

export function _responseRetrievalItemGenerationParamsSourceSerializer(
  item: _ResponseRetrievalItemGenerationParamsSource,
): any {
  return item;
}

export function _responseRetrievalItemGenerationParamsSourceDeserializer(
  item: any,
): _ResponseRetrievalItemGenerationParamsSource {
  return item;
}

/** Represents the parameters for synthetic data generation item generation. */
export interface SyntheticDataGenerationItemGenerationParams extends ItemGenerationParams {
  /** The type of item generation parameters. */
  type: "synthetic_data_gen";
  /** The maximum number of data samples to generate. */
  samples_count: number;
  /** The prompt used to generate synthetic data. This property is optional when the target is an agent that already has instructions. */
  prompt?: string;
  /** The name of the model deployment to use for generating synthetic data. */
  model_deployment_name: string;
  /** The name of the output dataset where generated synthetic data will be stored. If not provided, service generates dataset name automatically. */
  output_dataset_name?: string;
  /** The identifier of the output dataset where generated synthetic data is stored. The generated data is a jsonl file with columns id, query and test_description. */
  readonly output_dataset_id?: string;
  /** The optional seed data content source files for data generation. */
  sources: EvalJsonlFileIdSource[];
}

export function syntheticDataGenerationItemGenerationParamsSerializer(
  item: SyntheticDataGenerationItemGenerationParams,
): any {
  return {
    type: item["type"],
    samples_count: item["samples_count"],
    prompt: item["prompt"],
    model_deployment_name: item["model_deployment_name"],
    output_dataset_name: item["output_dataset_name"],
    sources: evalJsonlFileIdSourceArraySerializer(item["sources"]),
  };
}

export function syntheticDataGenerationItemGenerationParamsDeserializer(
  item: any,
): SyntheticDataGenerationItemGenerationParams {
  return {
    type: item["type"],
    samples_count: item["samples_count"],
    prompt: item["prompt"],
    model_deployment_name: item["model_deployment_name"],
    output_dataset_name: item["output_dataset_name"],
    output_dataset_id: item["output_dataset_id"],
    sources: evalJsonlFileIdSourceArrayDeserializer(item["sources"]),
  };
}

/**
 * Parameters for generating target completions for simulated conversations.
 *
 * See [simulate conversations](https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/cloud-evaluation-simulate-conversations?tabs=python).
 */
export interface TargetCompletionItemGenerationParams extends ItemGenerationParams {
  /** The type of item generation parameters, always `target_completion`. */
  type: "target_completion";
  /** The maximum number of target completions to execute concurrently. The services defaults to 1 if a value is not specified by the caller, which invokes the target sequentially. */
  max_concurrency?: number;
}

export function targetCompletionItemGenerationParamsSerializer(
  item: TargetCompletionItemGenerationParams,
): any {
  return { type: item["type"], max_concurrency: item["max_concurrency"] };
}

export function targetCompletionItemGenerationParamsDeserializer(
  item: any,
): TargetCompletionItemGenerationParams {
  return {
    type: item["type"],
    max_concurrency: item["max_concurrency"],
  };
}

/**
 * Evaluates a model or agent by simulating user conversations against it.
 *
 * Each source item defines a test scenario. Use a JSONL source or an `inline_user_conversation_simulation` source with strongly typed test cases. JSONL attributes use the inline test-case property names by default; specify `data_mapping` only when the dataset uses different names. The model specified by `model_configuration` generates the simulated user's turns and drives the conversation with `target` until it reaches the desired length or maximum turn limit. The evaluation's testing criteria are then applied to the conversation.
 */
export interface UserConversationSimulationEvalRunDataSource extends EvalRunDataSource {
  /** The type of data source, always `azure_ai_user_conversation_simulation`. */
  type: "azure_ai_user_conversation_simulation";
  /** Test scenarios supplied as JSONL rows or strongly typed inline test cases. */
  source: UserConversationSimulationSource;
  /** Model or agent being evaluated. It receives turns from the simulated user. */
  target: EvaluationTargetUnion;
  /** Model used to simulate the user side of each conversation by generating turns sent to the evaluated `target`. */
  model_configuration: EvaluationModelConfiguration;
  /** Default configuration for generating simulated user conversations and persisting their output. Conversation properties in a test case's `simulation_configuration` override the corresponding defaults. */
  default_simulation_configuration?: UserConversationSimulationDefaultConfiguration;
  /** Maps JSONL dataset attributes to user conversation simulation inputs when their names differ from the defaults. The default attribute names are `test_case_id`, `test_case_category`, `test_case_description`, and `simulation_configuration`, matching `UserConversationSimulationTestCase`. Omit when the dataset uses these names or when using `inline_user_conversation_simulation`. */
  data_mapping?: Record<string, string>;
}

export function userConversationSimulationEvalRunDataSourceSerializer(
  item: UserConversationSimulationEvalRunDataSource,
): any {
  return {
    type: item["type"],
    source: userConversationSimulationSourceSerializer(item["source"]),
    target: evaluationTargetUnionSerializer(item["target"]),
    model_configuration: evaluationModelConfigurationSerializer(item["model_configuration"]),
    default_simulation_configuration: !item["default_simulation_configuration"]
      ? item["default_simulation_configuration"]
      : userConversationSimulationDefaultConfigurationSerializer(
          item["default_simulation_configuration"],
        ),
    data_mapping: item["data_mapping"],
  };
}

export function userConversationSimulationEvalRunDataSourceDeserializer(
  item: any,
): UserConversationSimulationEvalRunDataSource {
  return {
    type: item["type"],
    source: userConversationSimulationSourceDeserializer(item["source"]),
    target: evaluationTargetUnionDeserializer(item["target"]),
    model_configuration: evaluationModelConfigurationDeserializer(item["model_configuration"]),
    default_simulation_configuration: !item["default_simulation_configuration"]
      ? item["default_simulation_configuration"]
      : userConversationSimulationDefaultConfigurationDeserializer(
          item["default_simulation_configuration"],
        ),
    data_mapping: !item["data_mapping"]
      ? item["data_mapping"]
      : Object.fromEntries(
          Object.entries(item["data_mapping"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Sources supported by user conversation simulation. */
export type UserConversationSimulationSource =
  | EvalJsonlFileContentSource
  | EvalJsonlFileIdSource
  | UserConversationSimulationInlineTestCasesSource;

export function userConversationSimulationSourceSerializer(
  item: UserConversationSimulationSource,
): any {
  return item;
}

export function userConversationSimulationSourceDeserializer(
  item: any,
): UserConversationSimulationSource {
  return item;
}

/** Supplies strongly typed test scenarios directly in the evaluation run request. */
export interface UserConversationSimulationInlineTestCasesSource {
  /** The source type. Always `inline_user_conversation_simulation`. */
  type: "inline_user_conversation_simulation";
  /** Test scenarios from which user conversations are simulated. At least one test case is required. */
  test_cases: UserConversationSimulationTestCase[];
}

export function userConversationSimulationInlineTestCasesSourceSerializer(
  item: UserConversationSimulationInlineTestCasesSource,
): any {
  return {
    type: item["type"],
    test_cases: userConversationSimulationTestCaseArraySerializer(item["test_cases"]),
  };
}

export function userConversationSimulationInlineTestCasesSourceDeserializer(
  item: any,
): UserConversationSimulationInlineTestCasesSource {
  return {
    type: item["type"],
    test_cases: userConversationSimulationTestCaseArrayDeserializer(item["test_cases"]),
  };
}

/** Configures default conversation behavior and optional run-wide persistence of generated conversations. */
export interface UserConversationSimulationDefaultConfiguration {
  /** Hard limit on turns in each conversation. When omitted, the service defaults to 20. */
  max_num_turns?: number;
  /** Number of independent conversation repetitions for each test case. Defaults to 1 when not specified at either the data-source or test-case level. */
  conversation_repetitions?: number;
  /** Target number of turns in each conversation. The effective value cannot exceed the effective `max_num_turns`. When omitted, no target is set and the simulation model determines the conversation length dynamically from the scenario. */
  desired_num_turns?: number;
  /** Audio effects applied to voice conversation simulations. This property is ignored for text-only simulations. */
  audio_effects?: UserConversationSimulationAudioEffectsConfiguration;
  /** Conversation behavior of the simulated user. */
  user_behavior?: UserConversationSimulationUserBehaviorConfiguration;
  /** Whether to write all generated conversations to a versioned Foundry dataset. When enabled, the completed run includes a `simulated_user_conversations` entry in `output_datasets`. When omitted, the service defaults to `false`. */
  enable_conversation_dataset_generation?: boolean;
  /** Name of the dataset to which generated conversations are written. This property is used only when `enable_conversation_dataset_generation` is `true`. When omitted, the service generates a dataset name. */
  output_conversation_dataset_name?: string;
}

export function userConversationSimulationDefaultConfigurationSerializer(
  item: UserConversationSimulationDefaultConfiguration,
): any {
  return {
    max_num_turns: item["max_num_turns"],
    conversation_repetitions: item["conversation_repetitions"],
    desired_num_turns: item["desired_num_turns"],
    audio_effects: !item["audio_effects"]
      ? item["audio_effects"]
      : userConversationSimulationAudioEffectsConfigurationSerializer(item["audio_effects"]),
    user_behavior: !item["user_behavior"]
      ? item["user_behavior"]
      : userConversationSimulationUserBehaviorConfigurationSerializer(item["user_behavior"]),
    enable_conversation_dataset_generation: item["enable_conversation_dataset_generation"],
    output_conversation_dataset_name: item["output_conversation_dataset_name"],
  };
}

export function userConversationSimulationDefaultConfigurationDeserializer(
  item: any,
): UserConversationSimulationDefaultConfiguration {
  return {
    max_num_turns: item["max_num_turns"],
    conversation_repetitions: item["conversation_repetitions"],
    desired_num_turns: item["desired_num_turns"],
    audio_effects: !item["audio_effects"]
      ? item["audio_effects"]
      : userConversationSimulationAudioEffectsConfigurationDeserializer(item["audio_effects"]),
    user_behavior: !item["user_behavior"]
      ? item["user_behavior"]
      : userConversationSimulationUserBehaviorConfigurationDeserializer(item["user_behavior"]),
    enable_conversation_dataset_generation: item["enable_conversation_dataset_generation"],
    output_conversation_dataset_name: item["output_conversation_dataset_name"],
  };
}

/** Preview form of `azure_ai_user_conversation_simulation`. Returned only for rules backed by existing preview schedules; rejected on create and update. */
export interface UserConversationSimulationPreviewEvalRunDataSource extends EvalRunDataSource {
  /** The type of data source, always `azure_ai_user_conversation_simulation_preview`. */
  type: "azure_ai_user_conversation_simulation_preview";
  /** Test scenarios supplied as JSONL rows or strongly typed inline test cases. */
  source: UserConversationSimulationSource;
  /** Model or agent being evaluated. It receives turns from the simulated user. */
  target: EvaluationTargetUnion;
  /** Model used to simulate the user side of each conversation by generating turns sent to the evaluated `target`. */
  model_configuration: EvaluationModelConfiguration;
  /** Default configuration for generating simulated user conversations and persisting their output. Conversation properties in a test case's `simulation_configuration` override the corresponding defaults. */
  default_simulation_configuration?: UserConversationSimulationDefaultConfiguration;
  /** Maps JSONL dataset attributes to user conversation simulation inputs when their names differ from the defaults. The default attribute names are `test_case_id`, `test_case_category`, `test_case_description`, and `simulation_configuration`, matching `UserConversationSimulationTestCase`. Omit when the dataset uses these names or when using `inline_user_conversation_simulation`. */
  data_mapping?: Record<string, string>;
}

export function userConversationSimulationPreviewEvalRunDataSourceSerializer(
  item: UserConversationSimulationPreviewEvalRunDataSource,
): any {
  return {
    type: item["type"],
    source: userConversationSimulationSourceSerializer(item["source"]),
    target: evaluationTargetUnionSerializer(item["target"]),
    model_configuration: evaluationModelConfigurationSerializer(item["model_configuration"]),
    default_simulation_configuration: !item["default_simulation_configuration"]
      ? item["default_simulation_configuration"]
      : userConversationSimulationDefaultConfigurationSerializer(
          item["default_simulation_configuration"],
        ),
    data_mapping: item["data_mapping"],
  };
}

export function userConversationSimulationPreviewEvalRunDataSourceDeserializer(
  item: any,
): UserConversationSimulationPreviewEvalRunDataSource {
  return {
    type: item["type"],
    source: userConversationSimulationSourceDeserializer(item["source"]),
    target: evaluationTargetUnionDeserializer(item["target"]),
    model_configuration: evaluationModelConfigurationDeserializer(item["model_configuration"]),
    default_simulation_configuration: !item["default_simulation_configuration"]
      ? item["default_simulation_configuration"]
      : userConversationSimulationDefaultConfigurationDeserializer(
          item["default_simulation_configuration"],
        ),
    data_mapping: !item["data_mapping"]
      ? item["data_mapping"]
      : Object.fromEntries(
          Object.entries(item["data_mapping"]).map(([k, p]: [string, any]) => [k, p]),
        ),
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
export type EvaluationRuleEventType = "responseCompleted" | "manual" | "timerTrigger";

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
  /** Five-field cron expression that defines the schedule frequency: minute hour day-of-month month day-of-week. */
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
  /** Hours for the recurrence schedule. If omitted, the service uses the current UTC hour when the schedule is created. */
  hours?: number[];
}

export function dailyRecurrenceScheduleSerializer(item: DailyRecurrenceSchedule): any {
  return {
    type: item["type"],
    hours: !item["hours"]
      ? item["hours"]
      : item["hours"].map((p: any) => {
          return p;
        }),
  };
}

export function dailyRecurrenceScheduleDeserializer(item: any): DailyRecurrenceSchedule {
  return {
    type: item["type"],
    hours: !item["hours"]
      ? item["hours"]
      : item["hours"].map((p: any) => {
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

/** Schedule provisioning status. */
export type ScheduleProvisioningStatus =
  "Creating" | "Updating" | "Deleting" | "Succeeded" | "Failed";

/** Base class for run data sources with discriminator support. */
export interface EvalRunDataSource {
  /** The data source type discriminator. */
  /** The discriminator possible values: azure_ai_traces, azure_ai_traces_preview, azure_ai_trace_data_source, azure_ai_trace_data_source_preview, azure_ai_user_conversation_simulation, azure_ai_user_conversation_simulation_preview, csv, azure_ai_target_completions */
  type: string;
}

export function evalRunDataSourceSerializer(item: EvalRunDataSource): any {
  return { type: item["type"] };
}

export function evalRunDataSourceDeserializer(item: any): EvalRunDataSource {
  return {
    type: item["type"],
  };
}

/** Alias for EvalRunDataSourceUnion */
export type EvalRunDataSourceUnion =
  | TracesEvalRunDataSource
  | TracesPreviewEvalRunDataSource
  | AzureAITraceDataSourceEvalRunDataSource
  | AzureAITraceDataSourcePreviewEvalRunDataSource
  | UserConversationSimulationEvalRunDataSource
  | UserConversationSimulationPreviewEvalRunDataSource
  | EvalCsvRunDataSource
  | TargetCompletionEvalRunDataSource
  | EvalRunDataSource;

export function evalRunDataSourceUnionSerializer(item: EvalRunDataSourceUnion): any {
  switch (item.type) {
    case "azure_ai_traces":
      return tracesEvalRunDataSourceSerializer(item as TracesEvalRunDataSource);

    case "azure_ai_traces_preview":
      return tracesPreviewEvalRunDataSourceSerializer(item as TracesPreviewEvalRunDataSource);

    case "azure_ai_trace_data_source":
      return azureAITraceDataSourceEvalRunDataSourceSerializer(
        item as AzureAITraceDataSourceEvalRunDataSource,
      );

    case "azure_ai_trace_data_source_preview":
      return azureAITraceDataSourcePreviewEvalRunDataSourceSerializer(
        item as AzureAITraceDataSourcePreviewEvalRunDataSource,
      );

    case "azure_ai_user_conversation_simulation":
      return userConversationSimulationEvalRunDataSourceSerializer(
        item as UserConversationSimulationEvalRunDataSource,
      );

    case "azure_ai_user_conversation_simulation_preview":
      return userConversationSimulationPreviewEvalRunDataSourceSerializer(
        item as UserConversationSimulationPreviewEvalRunDataSource,
      );

    case "csv":
      return evalCsvRunDataSourceSerializer(item as EvalCsvRunDataSource);

    case "azure_ai_target_completions":
      return targetCompletionEvalRunDataSourceSerializer(item as TargetCompletionEvalRunDataSource);

    default:
      return evalRunDataSourceSerializer(item);
  }
}

export function evalRunDataSourceUnionDeserializer(item: any): EvalRunDataSourceUnion {
  switch (item["type"]) {
    case "azure_ai_traces":
      return tracesEvalRunDataSourceDeserializer(item as TracesEvalRunDataSource);

    case "azure_ai_traces_preview":
      return tracesPreviewEvalRunDataSourceDeserializer(item as TracesPreviewEvalRunDataSource);

    case "azure_ai_trace_data_source":
      return azureAITraceDataSourceEvalRunDataSourceDeserializer(
        item as AzureAITraceDataSourceEvalRunDataSource,
      );

    case "azure_ai_trace_data_source_preview":
      return azureAITraceDataSourcePreviewEvalRunDataSourceDeserializer(
        item as AzureAITraceDataSourcePreviewEvalRunDataSource,
      );

    case "azure_ai_user_conversation_simulation":
      return userConversationSimulationEvalRunDataSourceDeserializer(
        item as UserConversationSimulationEvalRunDataSource,
      );

    case "azure_ai_user_conversation_simulation_preview":
      return userConversationSimulationPreviewEvalRunDataSourceDeserializer(
        item as UserConversationSimulationPreviewEvalRunDataSource,
      );

    case "csv":
      return evalCsvRunDataSourceDeserializer(item as EvalCsvRunDataSource);

    case "azure_ai_target_completions":
      return targetCompletionEvalRunDataSourceDeserializer(
        item as TargetCompletionEvalRunDataSource,
      );

    default:
      return evalRunDataSourceDeserializer(item);
  }
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
  /** Optional explicit list of trace IDs to include. */
  trace_ids?: string[];
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
    trace_ids: !item["trace_ids"]
      ? item["trace_ids"]
      : item["trace_ids"].map((p: any) => {
          return p;
        }),
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
    trace_ids: !item["trace_ids"]
      ? item["trace_ids"]
      : item["trace_ids"].map((p: any) => {
          return p;
        }),
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

/** Data Generation Job resource. */
export interface DataGenerationJob {
  /** Server-assigned unique identifier. */
  readonly id: string;
  /** Result produced on success. */
  readonly result?: DataGenerationJobResult;
  /** Current lifecycle status. */
  readonly status: JobStatus;
  /** Error details — populated only on failure. */
  readonly error?: ApiError;
  /** The display name of the data generation job. */
  name: string;
  /** The sources used for the data generation job. */
  sources: DataGenerationJobSourceUnion[];
  /** The effective generation configuration for the data generation job. */
  generation_configuration: DataGenerationJobConfigurationUnion;
  /** The scenario of the data generation job. Either for fine-tuning or evaluation. */
  /** The discriminator possible values: evaluation, supervised_finetuning_preview, reinforcement_finetuning_preview */
  scenario: DataGenerationJobScenario;
  /** The timestamp when the job was created, represented in Unix time (seconds since January 1, 1970). */
  readonly created_at: Date;
  /** The timestamp when the job was finished, represented in Unix time (seconds since January 1, 1970). */
  readonly finished_at?: Date;
}

export function dataGenerationJobDeserializer(item: any): DataGenerationJob {
  return {
    id: item["id"],
    result: !item["result"] ? item["result"] : dataGenerationJobResultDeserializer(item["result"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
    name: item["name"],
    sources: dataGenerationJobSourceUnionArrayDeserializer(item["sources"]),
    generation_configuration: dataGenerationJobConfigurationUnionDeserializer(
      item["generation_configuration"],
    ),
    scenario: item["scenario"],
    created_at: new Date(item["created_at"] * 1000),
    finished_at: !item["finished_at"] ? item["finished_at"] : new Date(item["finished_at"] * 1000),
  };
}

/** Alias for DataGenerationJobUnion */
export type DataGenerationJobUnion =
  | EvaluationDataGenerationJob
  | SupervisedFineTuningDataGenerationJob
  | ReinforcementFineTuningDataGenerationJob
  | DataGenerationJob;

export function dataGenerationJobUnionDeserializer(item: any): DataGenerationJobUnion {
  switch (item["scenario"]) {
    case "evaluation":
      return evaluationDataGenerationJobDeserializer(item as EvaluationDataGenerationJob);

    case "supervised_finetuning_preview":
      return supervisedFineTuningDataGenerationJobDeserializer(
        item as SupervisedFineTuningDataGenerationJob,
      );

    case "reinforcement_finetuning_preview":
      return reinforcementFineTuningDataGenerationJobDeserializer(
        item as ReinforcementFineTuningDataGenerationJob,
      );

    default:
      return dataGenerationJobDeserializer(item);
  }
}

/** Result produced by a successful data generation job. */
export interface DataGenerationJobResult {
  /** The final job outputs: Azure OpenAI files for fine-tuning, or datasets for evaluation. */
  outputs?: DataGenerationJobOutputUnion[];
  /** The number of samples actually generated. */
  generated_samples: number;
  /** The token usage information for the data generation job. */
  token_usage?: DataGenerationTokenUsage;
  /** Nonfatal warnings associated with otherwise usable output. `test_case_description_generation_incomplete` indicates that conversation rows were produced but one or more optional descriptions failed. Warning messages do not expose raw provider or model error bodies. */
  warnings?: DataGenerationWarning[];
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
    warnings: !item["warnings"]
      ? item["warnings"]
      : dataGenerationWarningArrayDeserializer(item["warnings"]),
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

/** Azure OpenAI file output for a data generation job. This is a preview feature. */
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

export function dataGenerationWarningArrayDeserializer(
  result: Array<DataGenerationWarning>,
): any[] {
  return result.map((item) => {
    return dataGenerationWarningDeserializer(item);
  });
}

/** A nonfatal warning associated with data generation output. */
export interface DataGenerationWarning {
  /** The warning code. */
  code?: DataGenerationWarningCode;
  /** A safe, human-readable warning message that does not include raw provider or model error bodies. */
  message: string;
}

export function dataGenerationWarningDeserializer(item: any): DataGenerationWarning {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Known warning codes for data generation jobs. Additional codes may be returned. */
export type DataGenerationWarningCode = "test_case_description_generation_incomplete";

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

/** Configuration for managing data generation jobs. */
export interface DataGenerationJobConfiguration {
  /** The data generation job type. */
  /** The discriminator possible values: simple_qna, traces, conversations, simulation_seed, tool_use */
  type: DataGenerationJobType;
  /** The proportion of the generated data to be used for training when the data is used for fine-tuning. The rest will be used for validation. Value should be between 0 and 1. */
  train_split?: number;
  /** The LLM model options. */
  model_options?: DataGenerationModelOptions;
}

export function dataGenerationJobConfigurationSerializer(
  item: DataGenerationJobConfiguration,
): any {
  return {
    type: item["type"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsSerializer(item["model_options"]),
  };
}

export function dataGenerationJobConfigurationDeserializer(
  item: any,
): DataGenerationJobConfiguration {
  return {
    type: item["type"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsDeserializer(item["model_options"]),
  };
}

/** Alias for DataGenerationJobConfigurationUnion */
export type DataGenerationJobConfigurationUnion =
  | SimpleQnADataGenerationJobConfiguration
  | TracesDataGenerationJobConfiguration
  | ConversationsDataGenerationJobConfiguration
  | SimulationSeedDataGenerationJobConfiguration
  | ToolUseFineTuningDataGenerationJobConfiguration
  | DataGenerationJobConfiguration;

export function dataGenerationJobConfigurationUnionSerializer(
  item: DataGenerationJobConfigurationUnion,
): any {
  switch (item.type) {
    case "simple_qna":
      return simpleQnADataGenerationJobConfigurationSerializer(
        item as SimpleQnADataGenerationJobConfiguration,
      );

    case "traces":
      return tracesDataGenerationJobConfigurationSerializer(
        item as TracesDataGenerationJobConfiguration,
      );

    case "conversations":
      return conversationsDataGenerationJobConfigurationSerializer(
        item as ConversationsDataGenerationJobConfiguration,
      );

    case "simulation_seed":
      return simulationSeedDataGenerationJobConfigurationSerializer(
        item as SimulationSeedDataGenerationJobConfiguration,
      );

    case "tool_use":
      return toolUseFineTuningDataGenerationJobConfigurationSerializer(
        item as ToolUseFineTuningDataGenerationJobConfiguration,
      );

    default:
      return dataGenerationJobConfigurationSerializer(item);
  }
}

export function dataGenerationJobConfigurationUnionDeserializer(
  item: any,
): DataGenerationJobConfigurationUnion {
  switch (item["type"]) {
    case "simple_qna":
      return simpleQnADataGenerationJobConfigurationDeserializer(
        item as SimpleQnADataGenerationJobConfiguration,
      );

    case "traces":
      return tracesDataGenerationJobConfigurationDeserializer(
        item as TracesDataGenerationJobConfiguration,
      );

    case "conversations":
      return conversationsDataGenerationJobConfigurationDeserializer(
        item as ConversationsDataGenerationJobConfiguration,
      );

    case "simulation_seed":
      return simulationSeedDataGenerationJobConfigurationDeserializer(
        item as SimulationSeedDataGenerationJobConfiguration,
      );

    case "tool_use":
      return toolUseFineTuningDataGenerationJobConfigurationDeserializer(
        item as ToolUseFineTuningDataGenerationJobConfiguration,
      );

    default:
      return dataGenerationJobConfigurationDeserializer(item);
  }
}

/** The supported data generation job types. */
export type DataGenerationJobType =
  "simple_qna" | "traces" | "tool_use" | "simulation_seed" | "conversations";

/** LLM model options for data generation jobs. */
export interface DataGenerationModelOptions {
  /** Base model name used to generate data. For trace and conversation jobs, a nonempty value is required when `generate_test_case_rubric` is true. Conversation jobs also require a nonempty value when `generate_test_case_description` is true. Model options must be omitted for conversation reconstruction when neither description nor rubric generation is enabled. */
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

/** The configuration for a data generation job with SimpleQnA type. */
export interface SimpleQnADataGenerationJobConfiguration extends DataGenerationJobConfiguration {
  /** The data generation job type, which is SimpleQnA for this model. */
  type: "simple_qna";
  /** Maximum number of samples to generate, up to service-defined limits. */
  max_samples: number;
  /** The question types to generate. Used only for fine-tuning scenarios. */
  question_types?: SimpleQnAFineTuningQuestionType[];
}

export function simpleQnADataGenerationJobConfigurationSerializer(
  item: SimpleQnADataGenerationJobConfiguration,
): any {
  return {
    type: item["type"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsSerializer(item["model_options"]),
    max_samples: item["max_samples"],
    question_types: !item["question_types"]
      ? item["question_types"]
      : item["question_types"].map((p: any) => {
          return p;
        }),
  };
}

export function simpleQnADataGenerationJobConfigurationDeserializer(
  item: any,
): SimpleQnADataGenerationJobConfiguration {
  return {
    type: item["type"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsDeserializer(item["model_options"]),
    max_samples: item["max_samples"],
    question_types: !item["question_types"]
      ? item["question_types"]
      : item["question_types"].map((p: any) => {
          return p;
        }),
  };
}

/** The supported question types for SimpleQnA data generation jobs used for fine-tuning scenarios. This is a preview feature. */
export type SimpleQnAFineTuningQuestionType = "short_answer" | "long_answer";

/** The configuration for a data generation job with Traces type. */
export interface TracesDataGenerationJobConfiguration extends DataGenerationJobConfiguration {
  /** The data generation job type, which is Traces for this model. */
  type: "traces";
  /** Maximum number of samples to generate, up to service-defined limits. If omitted, sampling is turned off. */
  max_samples?: number;
  /** Whether to redact private content from traces. When omitted or set to true, private content is redacted. Set to false to opt out of redaction. */
  redact_private_content?: boolean;
  /** Whether to generate test-case rubric dimensions for each captured turn sample. This is a preview feature requiring the `Foundry-Features: DataGenerationJobs=V1Preview` request header. When true, requires a nonempty `model_options.model`. */
  generate_test_case_rubric?: boolean;
}

export function tracesDataGenerationJobConfigurationSerializer(
  item: TracesDataGenerationJobConfiguration,
): any {
  return {
    type: item["type"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsSerializer(item["model_options"]),
    max_samples: item["max_samples"],
    redact_private_content: item["redact_private_content"],
    generate_test_case_rubric: item["generate_test_case_rubric"],
  };
}

export function tracesDataGenerationJobConfigurationDeserializer(
  item: any,
): TracesDataGenerationJobConfiguration {
  return {
    type: item["type"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsDeserializer(item["model_options"]),
    max_samples: item["max_samples"],
    redact_private_content: item["redact_private_content"],
    generate_test_case_rubric: item["generate_test_case_rubric"],
  };
}

/** The configuration for reconstructing existing traced conversations for evaluation, not synthetic conversation simulation. This preview requires `scenario` to be `evaluation`, sources of type `traces`, and the `Foundry-Features: DataGenerationJobs=V1Preview` request header. Conversation-level sampling is implicit; `sample_level` is not supported. Existing trace selection, annotations, and output dataset row schemas are unchanged. Create, get, and list responses preserve `type: conversations`. The service enforces the scenario, source, and conditional model-options requirements. Conversation-level output rows contain `test_case_id`, `messages`, `tool_definitions`, and `metadata`. A successful optional description adds `test_case_description`. If description generation fails, the row is retained with safe row-level status and error metadata, without raw provider or model error bodies. */
export interface ConversationsDataGenerationJobConfiguration extends DataGenerationJobConfiguration {
  /** The data generation job type, which is Conversations for this model. */
  type: "conversations";
  /** Maximum number of whole conversations to generate, up to service-defined limits. If omitted, sampling is turned off. */
  max_samples?: number;
  /** Whether to redact private content from traces. When omitted or set to true, private content is redacted. Set to false to opt out of redaction. */
  redact_private_content?: boolean;
  /** Whether to generate an AI-authored test-case description for each reconstructed conversation. This is a preview feature. If omitted, the service defaults to `false`. When true, requires a nonempty `model_options.model`. Model options must be omitted when neither description nor rubric generation is enabled. */
  generate_test_case_description?: boolean;
  /** Whether to generate test-case rubric dimensions for each reconstructed conversation. This is a preview feature. When true, requires a nonempty `model_options.model`. Model options must be omitted when neither description nor rubric generation is enabled. */
  generate_test_case_rubric?: boolean;
  /** The model used to generate test-case descriptions or rubric dimensions. Required with a nonempty `model` when `generate_test_case_description` or `generate_test_case_rubric` is true; must be omitted otherwise. */
  model_options?: DataGenerationModelOptions;
}

export function conversationsDataGenerationJobConfigurationSerializer(
  item: ConversationsDataGenerationJobConfiguration,
): any {
  return {
    type: item["type"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsSerializer(item["model_options"]),
    max_samples: item["max_samples"],
    redact_private_content: item["redact_private_content"],
    generate_test_case_description: item["generate_test_case_description"],
    generate_test_case_rubric: item["generate_test_case_rubric"],
  };
}

export function conversationsDataGenerationJobConfigurationDeserializer(
  item: any,
): ConversationsDataGenerationJobConfiguration {
  return {
    type: item["type"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsDeserializer(item["model_options"]),
    max_samples: item["max_samples"],
    redact_private_content: item["redact_private_content"],
    generate_test_case_description: item["generate_test_case_description"],
    generate_test_case_rubric: item["generate_test_case_rubric"],
  };
}

/** The configuration for a task generation data generation job. Use with multiturn evaluation scenarios and with prompt, file, or agent sources. Generated dataset rows include fields such as `id`, `category`, `test_case_description`, and `desired_num_turns`. */
export interface SimulationSeedDataGenerationJobConfiguration extends DataGenerationJobConfiguration {
  /** The data generation job type, which is SimulationSeed for this model. */
  type: "simulation_seed";
  /** Maximum number of samples to generate, up to service-defined limits. */
  max_samples: number;
}

export function simulationSeedDataGenerationJobConfigurationSerializer(
  item: SimulationSeedDataGenerationJobConfiguration,
): any {
  return {
    type: item["type"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsSerializer(item["model_options"]),
    max_samples: item["max_samples"],
  };
}

export function simulationSeedDataGenerationJobConfigurationDeserializer(
  item: any,
): SimulationSeedDataGenerationJobConfiguration {
  return {
    type: item["type"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsDeserializer(item["model_options"]),
    max_samples: item["max_samples"],
  };
}

/** The configuration for a data generation job with ToolUse type. This is a preview feature used only for fine-tuning scenarios. */
export interface ToolUseFineTuningDataGenerationJobConfiguration extends DataGenerationJobConfiguration {
  /** The data generation job type, which is ToolUse for this model. */
  type: "tool_use";
  /** Maximum number of samples to generate, up to service-defined limits. */
  max_samples: number;
}

export function toolUseFineTuningDataGenerationJobConfigurationSerializer(
  item: ToolUseFineTuningDataGenerationJobConfiguration,
): any {
  return {
    type: item["type"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsSerializer(item["model_options"]),
    max_samples: item["max_samples"],
  };
}

export function toolUseFineTuningDataGenerationJobConfigurationDeserializer(
  item: any,
): ToolUseFineTuningDataGenerationJobConfiguration {
  return {
    type: item["type"],
    train_split: item["train_split"],
    model_options: !item["model_options"]
      ? item["model_options"]
      : dataGenerationModelOptionsDeserializer(item["model_options"]),
    max_samples: item["max_samples"],
  };
}

/** The supported scenarios for a data generation job. */
export type DataGenerationJobScenario =
  "supervised_finetuning_preview" | "reinforcement_finetuning_preview" | "evaluation";

/** Evaluation data generation job resource. */
export interface EvaluationDataGenerationJob extends DataGenerationJob {
  /** The scenario of the data generation job, which is Evaluation for this model. */
  scenario: "evaluation";
  /** Optional dataset output configuration for the generated evaluation data. */
  output_configuration?: EvaluationDataGenerationJobOutputConfiguration;
}

export function evaluationDataGenerationJobDeserializer(item: any): EvaluationDataGenerationJob {
  return {
    id: item["id"],
    result: !item["result"] ? item["result"] : dataGenerationJobResultDeserializer(item["result"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
    name: item["name"],
    sources: dataGenerationJobSourceUnionArrayDeserializer(item["sources"]),
    generation_configuration: dataGenerationJobConfigurationUnionDeserializer(
      item["generation_configuration"],
    ),
    scenario: item["scenario"],
    created_at: new Date(item["created_at"] * 1000),
    finished_at: !item["finished_at"] ? item["finished_at"] : new Date(item["finished_at"] * 1000),
    output_configuration: !item["output_configuration"]
      ? item["output_configuration"]
      : evaluationDataGenerationJobOutputConfigurationDeserializer(item["output_configuration"]),
  };
}

/** Dataset output configuration for an evaluation data generation job. */
export interface EvaluationDataGenerationJobOutputConfiguration {
  /** Dataset name to assign to the output. */
  name?: string;
  /** Description to assign to the output dataset. */
  description?: string;
  /** Tags to assign to the output dataset. */
  tags?: Record<string, string>;
  /** Controls how dataset outputs are written. If omitted, defaults to `overwrite` and creates the next dataset version using only newly generated rows. `merge` combines newly generated rows with the latest existing dataset version and de-duplicates trace rows. For conversation jobs, a newly generated conversation snapshot replaces the existing snapshot of the same conversation wholesale. The replacement snapshot may omit earlier turns outside the selected time window. Existing conversations without a newly generated replacement remain unchanged. Merging replaces whole conversation snapshots rather than unioning individual turns, so it does not retain every previous turn from the replaced snapshot. */
  write_mode?: DataGenerationJobOutputWriteMode;
}

export function evaluationDataGenerationJobOutputConfigurationSerializer(
  item: EvaluationDataGenerationJobOutputConfiguration,
): any {
  return {
    name: item["name"],
    description: item["description"],
    tags: item["tags"],
    write_mode: item["write_mode"],
  };
}

export function evaluationDataGenerationJobOutputConfigurationDeserializer(
  item: any,
): EvaluationDataGenerationJobOutputConfiguration {
  return {
    name: item["name"],
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    write_mode: item["write_mode"],
  };
}

/** The supported write modes for data generation job outputs. */
export type DataGenerationJobOutputWriteMode = "overwrite" | "merge";

/** Supervised fine-tuning data generation job resource. This is a preview feature. */
export interface SupervisedFineTuningDataGenerationJob extends DataGenerationJob {
  /** The scenario of the data generation job, which is Supervised Fine-tuning preview for this model. */
  scenario: "supervised_finetuning_preview";
  /** Optional file output configuration for the generated supervised fine-tuning data. */
  output_configuration?: SupervisedFineTuningDataGenerationJobOutputConfiguration;
}

export function supervisedFineTuningDataGenerationJobDeserializer(
  item: any,
): SupervisedFineTuningDataGenerationJob {
  return {
    id: item["id"],
    result: !item["result"] ? item["result"] : dataGenerationJobResultDeserializer(item["result"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
    name: item["name"],
    sources: dataGenerationJobSourceUnionArrayDeserializer(item["sources"]),
    generation_configuration: dataGenerationJobConfigurationUnionDeserializer(
      item["generation_configuration"],
    ),
    scenario: item["scenario"],
    created_at: new Date(item["created_at"] * 1000),
    finished_at: !item["finished_at"] ? item["finished_at"] : new Date(item["finished_at"] * 1000),
    output_configuration: !item["output_configuration"]
      ? item["output_configuration"]
      : supervisedFineTuningDataGenerationJobOutputConfigurationDeserializer(
          item["output_configuration"],
        ),
  };
}

/** File output configuration for a supervised fine-tuning data generation job. This is a preview feature. */
export interface SupervisedFineTuningDataGenerationJobOutputConfiguration {
  /** Filename to assign to the generated fine-tuning file. */
  name: string;
  /** Controls how file outputs are written. If omitted, defaults to `overwrite` and writes only the newly generated fine-tuning file content. */
  write_mode?: DataGenerationJobOutputWriteMode;
  /** File ID to merge into when `write_mode` is `merge`. */
  merge_file_id?: string;
}

export function supervisedFineTuningDataGenerationJobOutputConfigurationSerializer(
  item: SupervisedFineTuningDataGenerationJobOutputConfiguration,
): any {
  return {
    name: item["name"],
    write_mode: item["write_mode"],
    merge_file_id: item["merge_file_id"],
  };
}

export function supervisedFineTuningDataGenerationJobOutputConfigurationDeserializer(
  item: any,
): SupervisedFineTuningDataGenerationJobOutputConfiguration {
  return {
    name: item["name"],
    write_mode: item["write_mode"],
    merge_file_id: item["merge_file_id"],
  };
}

/** Reinforcement fine-tuning data generation job resource. This is a preview feature. */
export interface ReinforcementFineTuningDataGenerationJob extends DataGenerationJob {
  /** The scenario of the data generation job, which is Reinforcement Fine-tuning preview for this model. */
  scenario: "reinforcement_finetuning_preview";
  /** Optional file output configuration for the generated reinforcement fine-tuning data. */
  output_configuration?: ReinforcementFineTuningDataGenerationJobOutputConfiguration;
}

export function reinforcementFineTuningDataGenerationJobDeserializer(
  item: any,
): ReinforcementFineTuningDataGenerationJob {
  return {
    id: item["id"],
    result: !item["result"] ? item["result"] : dataGenerationJobResultDeserializer(item["result"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
    name: item["name"],
    sources: dataGenerationJobSourceUnionArrayDeserializer(item["sources"]),
    generation_configuration: dataGenerationJobConfigurationUnionDeserializer(
      item["generation_configuration"],
    ),
    scenario: item["scenario"],
    created_at: new Date(item["created_at"] * 1000),
    finished_at: !item["finished_at"] ? item["finished_at"] : new Date(item["finished_at"] * 1000),
    output_configuration: !item["output_configuration"]
      ? item["output_configuration"]
      : reinforcementFineTuningDataGenerationJobOutputConfigurationDeserializer(
          item["output_configuration"],
        ),
  };
}

/** File output configuration for a reinforcement fine-tuning data generation job. This is a preview feature. */
export interface ReinforcementFineTuningDataGenerationJobOutputConfiguration {
  /** Filename to assign to the generated fine-tuning file. */
  name: string;
  /** Controls how file outputs are written. If omitted, defaults to `overwrite` and writes only the newly generated fine-tuning file content. */
  write_mode?: DataGenerationJobOutputWriteMode;
  /** File ID to merge into when `write_mode` is `merge`. */
  merge_file_id?: string;
}

export function reinforcementFineTuningDataGenerationJobOutputConfigurationSerializer(
  item: ReinforcementFineTuningDataGenerationJobOutputConfiguration,
): any {
  return {
    name: item["name"],
    write_mode: item["write_mode"],
    merge_file_id: item["merge_file_id"],
  };
}

export function reinforcementFineTuningDataGenerationJobOutputConfigurationDeserializer(
  item: any,
): ReinforcementFineTuningDataGenerationJobOutputConfiguration {
  return {
    name: item["name"],
    write_mode: item["write_mode"],
    merge_file_id: item["merge_file_id"],
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultDataGenerationJob {
  /** The requested list of items. */
  data: DataGenerationJobUnion[];
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
    data: dataGenerationJobUnionArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function dataGenerationJobUnionArrayDeserializer(
  result: Array<DataGenerationJobUnion>,
): any[] {
  return result.map((item) => {
    return dataGenerationJobUnionDeserializer(item);
  });
}

/** Caller-supplied inputs for a data generation job. */
export interface DataGenerationJobInputs {
  /** The display name of the data generation job. */
  name: string;
  /** The sources used for the data generation job. */
  sources: DataGenerationJobSourceUnion[];
  /** The generation configuration for the data generation job. */
  generation_configuration: DataGenerationJobConfigurationUnion;
  /** The scenario of the data generation job. Either for fine-tuning or evaluation. */
  /** The discriminator possible values: evaluation, supervised_finetuning_preview, reinforcement_finetuning_preview */
  scenario: DataGenerationJobScenario;
}

export function dataGenerationJobInputsSerializer(item: DataGenerationJobInputs): any {
  return {
    name: item["name"],
    sources: dataGenerationJobSourceUnionArraySerializer(item["sources"]),
    generation_configuration: dataGenerationJobConfigurationUnionSerializer(
      item["generation_configuration"],
    ),
    scenario: item["scenario"],
  };
}

/** Alias for DataGenerationJobInputsUnion */
export type DataGenerationJobInputsUnion =
  | EvaluationDataGenerationJobInputs
  | SupervisedFineTuningDataGenerationJobInputs
  | ReinforcementFineTuningDataGenerationJobInputs
  | DataGenerationJobInputs;

export function dataGenerationJobInputsUnionSerializer(item: DataGenerationJobInputsUnion): any {
  switch (item.scenario) {
    case "evaluation":
      return evaluationDataGenerationJobInputsSerializer(item as EvaluationDataGenerationJobInputs);

    case "supervised_finetuning_preview":
      return supervisedFineTuningDataGenerationJobInputsSerializer(
        item as SupervisedFineTuningDataGenerationJobInputs,
      );

    case "reinforcement_finetuning_preview":
      return reinforcementFineTuningDataGenerationJobInputsSerializer(
        item as ReinforcementFineTuningDataGenerationJobInputs,
      );

    default:
      return dataGenerationJobInputsSerializer(item);
  }
}

/** Caller-supplied inputs for an evaluation data generation job. */
export interface EvaluationDataGenerationJobInputs extends DataGenerationJobInputs {
  /** The scenario of the data generation job, which is Evaluation for this model. */
  scenario: "evaluation";
  /** Optional dataset output configuration for the generated evaluation data. */
  output_configuration?: EvaluationDataGenerationJobOutputConfiguration;
}

export function evaluationDataGenerationJobInputsSerializer(
  item: EvaluationDataGenerationJobInputs,
): any {
  return {
    name: item["name"],
    sources: dataGenerationJobSourceUnionArraySerializer(item["sources"]),
    generation_configuration: dataGenerationJobConfigurationUnionSerializer(
      item["generation_configuration"],
    ),
    scenario: item["scenario"],
    output_configuration: !item["output_configuration"]
      ? item["output_configuration"]
      : evaluationDataGenerationJobOutputConfigurationSerializer(item["output_configuration"]),
  };
}

/** Caller-supplied inputs for a supervised fine-tuning data generation job. This is a preview feature. */
export interface SupervisedFineTuningDataGenerationJobInputs extends DataGenerationJobInputs {
  /** The scenario of the data generation job, which is Supervised Fine-tuning preview for this model. */
  scenario: "supervised_finetuning_preview";
  /** Optional file output configuration for the generated supervised fine-tuning data. */
  output_configuration?: SupervisedFineTuningDataGenerationJobOutputConfiguration;
}

export function supervisedFineTuningDataGenerationJobInputsSerializer(
  item: SupervisedFineTuningDataGenerationJobInputs,
): any {
  return {
    name: item["name"],
    sources: dataGenerationJobSourceUnionArraySerializer(item["sources"]),
    generation_configuration: dataGenerationJobConfigurationUnionSerializer(
      item["generation_configuration"],
    ),
    scenario: item["scenario"],
    output_configuration: !item["output_configuration"]
      ? item["output_configuration"]
      : supervisedFineTuningDataGenerationJobOutputConfigurationSerializer(
          item["output_configuration"],
        ),
  };
}

/** Caller-supplied inputs for a reinforcement fine-tuning data generation job. This is a preview feature. */
export interface ReinforcementFineTuningDataGenerationJobInputs extends DataGenerationJobInputs {
  /** The scenario of the data generation job, which is Reinforcement Fine-tuning preview for this model. */
  scenario: "reinforcement_finetuning_preview";
  /** Optional file output configuration for the generated reinforcement fine-tuning data. */
  output_configuration?: ReinforcementFineTuningDataGenerationJobOutputConfiguration;
}

export function reinforcementFineTuningDataGenerationJobInputsSerializer(
  item: ReinforcementFineTuningDataGenerationJobInputs,
): any {
  return {
    name: item["name"],
    sources: dataGenerationJobSourceUnionArraySerializer(item["sources"]),
    generation_configuration: dataGenerationJobConfigurationUnionSerializer(
      item["generation_configuration"],
    ),
    scenario: item["scenario"],
    output_configuration: !item["output_configuration"]
      ? item["output_configuration"]
      : reinforcementFineTuningDataGenerationJobOutputConfigurationSerializer(
          item["output_configuration"],
        ),
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultAgentInsightMonitorListItem {
  /** The requested list of items. */
  data: AgentInsightMonitorListItem[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultAgentInsightMonitorListItemDeserializer(
  item: any,
): _AgentsPagedResultAgentInsightMonitorListItem {
  return {
    data: agentInsightMonitorListItemArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function agentInsightMonitorListItemArrayDeserializer(
  result: Array<AgentInsightMonitorListItem>,
): any[] {
  return result.map((item) => {
    return agentInsightMonitorListItemDeserializer(item);
  });
}

/** Monitor list item without the summary. */
export interface AgentInsightMonitorListItem {
  /** The monitor identifier. */
  readonly id: string;
  /** The agent this monitor analyzes. There can be only one monitor per agent. */
  readonly agent_name: string;
  /** Whether scheduled insight generation is armed for the monitor. */
  readonly enabled: boolean;
  /** Interval between scheduled insight runs, in hours. */
  readonly run_interval_hours: number;
  /** The model deployment to use for analyzing traces. Accepts either the deployment name alone or with the connection name as '{connectionName}/modelDeploymentName'. */
  readonly model_deployment_name: string;
  /** The next time a scheduled agent insight run will start. Omitted when scheduled generation is disabled. */
  readonly next_scheduled_run_at?: Date;
  /** Estimated cost accumulated by Agent Insights for this monitor. */
  readonly estimated_cost?: AgentInsightEstimatedCost;
  /** Why the system suspended scheduled generation. Null when the monitor is not suspended. */
  readonly suspension: AgentInsightSuspension | null;
  /** Analysis priorities. Omitted when not configured. */
  readonly priorities?: AgentInsightPrioritiesRead;
  /** The time when this monitor was last updated. */
  readonly updated_at: Date;
}

export function agentInsightMonitorListItemDeserializer(item: any): AgentInsightMonitorListItem {
  return {
    id: item["id"],
    agent_name: item["agent_name"],
    enabled: item["enabled"],
    run_interval_hours: item["run_interval_hours"],
    model_deployment_name: item["model_deployment_name"],
    next_scheduled_run_at: !item["next_scheduled_run_at"]
      ? item["next_scheduled_run_at"]
      : new Date(item["next_scheduled_run_at"] * 1000),
    estimated_cost: !item["estimated_cost"]
      ? item["estimated_cost"]
      : agentInsightEstimatedCostDeserializer(item["estimated_cost"]),
    suspension: !item["suspension"]
      ? item["suspension"]
      : agentInsightSuspensionDeserializer(item["suspension"]),
    priorities: !item["priorities"]
      ? item["priorities"]
      : agentInsightPrioritiesReadDeserializer(item["priorities"]),
    updated_at: new Date(item["updated_at"] * 1000),
  };
}

/** Estimated Agent Insights cost. */
export interface AgentInsightEstimatedCost {
  /** Estimated cost amount. */
  amount: number;
  /** Currency for the estimated cost amount. Agent Insights estimates are reported in US dollars. */
  currency: "USD";
}

export function agentInsightEstimatedCostDeserializer(item: any): AgentInsightEstimatedCost {
  return {
    amount: item["amount"],
    currency: item["currency"],
  };
}

/** Structured reason why scheduled generation is suspended for a monitor. */
export interface AgentInsightSuspension {
  /** Stable, machine-readable suspension category. */
  code: string;
  /** Human-readable description of the suspension. */
  message: string;
  /** The time when the suspension occurred. */
  occurred_at: Date;
  /** Additional reason-specific suspension details. */
  details?: Record<string, any>;
}

export function agentInsightSuspensionDeserializer(item: any): AgentInsightSuspension {
  return {
    code: item["code"],
    message: item["message"],
    occurred_at: new Date(item["occurred_at"] * 1000),
    details: !item["details"]
      ? item["details"]
      : Object.fromEntries(Object.entries(item["details"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Monitor analysis priorities returned by the service. */
export interface AgentInsightPrioritiesRead {
  /** Up to 20 distinct normalized category identifiers. Can include legacy names containing commas. Empty uses defaults. */
  categories: string[];
  /** Analysis guidance. Omitted when unavailable. */
  instructions?: string;
}

export function agentInsightPrioritiesReadDeserializer(item: any): AgentInsightPrioritiesRead {
  return {
    categories: item["categories"].map((p: any) => {
      return p;
    }),
    instructions: item["instructions"],
  };
}

/** Monitor analysis priorities. */
export interface AgentInsightPriorities {
  /** Up to 20 distinct normalized category identifiers (128 UTF-8 bytes each). Empty uses defaults. */
  categories: string[];
  /** Analysis guidance, up to 2,000 UTF-8 bytes after trimming. Null or blank removes guidance. */
  instructions?: string;
}

export function agentInsightPrioritiesSerializer(item: AgentInsightPriorities): any {
  return {
    categories: item["categories"].map((p: any) => {
      return p;
    }),
    instructions: item["instructions"],
  };
}

/** A per-agent Agent Insights monitor that owns configuration, runs, and discovered insights. */
export interface AgentInsightMonitor {
  /** The monitor identifier. */
  readonly id: string;
  /** The agent this monitor analyzes. There can be only one monitor per agent. */
  readonly agent_name: string;
  /** Whether scheduled insight generation is armed for the monitor. */
  readonly enabled: boolean;
  /** Interval between scheduled insight runs, in hours. */
  readonly run_interval_hours: number;
  /** The model deployment to use for analyzing traces. Accepts either the deployment name alone or with the connection name as '{connectionName}/modelDeploymentName'. */
  readonly model_deployment_name: string;
  /** The next time a scheduled agent insight run will start. Omitted when scheduled generation is disabled. */
  readonly next_scheduled_run_at?: Date;
  /** Estimated cost accumulated by Agent Insights for this monitor. */
  readonly estimated_cost?: AgentInsightEstimatedCost;
  /** Why the system suspended scheduled generation. Null when the monitor is not suspended. */
  readonly suspension: AgentInsightSuspension | null;
  /** Generated summary. Omitted when unavailable. */
  readonly agent_summary?: AgentInsightSummary;
  /** Analysis priorities. Omitted when not configured. */
  readonly priorities?: AgentInsightPrioritiesRead;
  /** The time when this monitor was last updated. */
  readonly updated_at: Date;
}

export function agentInsightMonitorDeserializer(item: any): AgentInsightMonitor {
  return {
    id: item["id"],
    agent_name: item["agent_name"],
    enabled: item["enabled"],
    run_interval_hours: item["run_interval_hours"],
    model_deployment_name: item["model_deployment_name"],
    next_scheduled_run_at: !item["next_scheduled_run_at"]
      ? item["next_scheduled_run_at"]
      : new Date(item["next_scheduled_run_at"] * 1000),
    estimated_cost: !item["estimated_cost"]
      ? item["estimated_cost"]
      : agentInsightEstimatedCostDeserializer(item["estimated_cost"]),
    suspension: !item["suspension"]
      ? item["suspension"]
      : agentInsightSuspensionDeserializer(item["suspension"]),
    agent_summary: !item["agent_summary"]
      ? item["agent_summary"]
      : agentInsightSummaryDeserializer(item["agent_summary"]),
    priorities: !item["priorities"]
      ? item["priorities"]
      : agentInsightPrioritiesReadDeserializer(item["priorities"]),
    updated_at: new Date(item["updated_at"] * 1000),
  };
}

/** Service-generated agent summary. */
export interface AgentInsightSummary {
  /** Summary in Markdown. */
  readonly markdown: string;
}

export function agentInsightSummaryDeserializer(item: any): AgentInsightSummary {
  return {
    markdown: item["markdown"],
  };
}

/** A long-running run that analyzes one agent's traces and updates that agent's insights. */
export interface AgentInsightRun {
  /** Server-assigned unique identifier. */
  readonly id: string;
  /** Caller-supplied inputs. */
  inputs?: AgentInsightRunInputs;
  /** Result produced on success. */
  readonly result?: AgentInsightRunResult;
  /** Current lifecycle status. */
  readonly status: JobStatus;
  /** Error details — populated only on failure. */
  readonly error?: ApiError;
  /** The Agent Insights monitor this run belongs to. */
  readonly monitor_id: string;
  /** The agent whose traces are analyzed by this run. */
  readonly agent_name: string;
  /** The trigger that started the run. */
  readonly trigger: AgentInsightRunTrigger;
  /** The time when this run was created. */
  readonly created_at: Date;
  /** The time when this run was last updated. */
  readonly updated_at: Date;
  /** The start of the trace window analyzed by this run. */
  readonly window_start: Date;
  /** The end of the trace window analyzed by this run. */
  readonly window_end: Date;
  /** The time when this run started processing. */
  readonly started_at?: Date;
  /** The time when this run reached a terminal status. */
  readonly completed_at?: Date;
  /** The model deployment used to analyze traces for this run. */
  readonly model_deployment_name: string;
}

export function agentInsightRunDeserializer(item: any): AgentInsightRun {
  return {
    id: item["id"],
    inputs: !item["inputs"] ? item["inputs"] : agentInsightRunInputsDeserializer(item["inputs"]),
    result: !item["result"] ? item["result"] : agentInsightRunResultDeserializer(item["result"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
    monitor_id: item["monitor_id"],
    agent_name: item["agent_name"],
    trigger: item["trigger"],
    created_at: new Date(item["created_at"] * 1000),
    updated_at: new Date(item["updated_at"] * 1000),
    window_start: new Date(item["window_start"] * 1000),
    window_end: new Date(item["window_end"] * 1000),
    started_at: !item["started_at"] ? item["started_at"] : new Date(item["started_at"] * 1000),
    completed_at: !item["completed_at"]
      ? item["completed_at"]
      : new Date(item["completed_at"] * 1000),
    model_deployment_name: item["model_deployment_name"],
  };
}

/** Inputs recorded for an Agent Insights run. */
export interface AgentInsightRunInputs {
  /** Optional finite positive number of hours of trace history to analyze, up to 2,160. Defaults to 168. */
  lookback_hours?: number;
}

export function agentInsightRunInputsDeserializer(item: any): AgentInsightRunInputs {
  return {
    lookback_hours: item["lookback_hours"],
  };
}

/** Result statistics produced when an agent insight run succeeds. */
export interface AgentInsightRunResult {
  /** The number of traces in the analyzed time window. */
  traces_in_window: number;
  /** The number of traces analyzed by the run. */
  traces_analyzed: number;
  /** The number of insights created by the run. */
  insights_created: number;
  /** The number of insights updated by the run. */
  insights_updated: number;
  /** The number of insights reopened by the run. */
  insights_reopened: number;
  /** Token usage for the run's insight-generation analysis. */
  token_usage: AgentInsightTokenUsage;
}

export function agentInsightRunResultDeserializer(item: any): AgentInsightRunResult {
  return {
    traces_in_window: item["traces_in_window"],
    traces_analyzed: item["traces_analyzed"],
    insights_created: item["insights_created"],
    insights_updated: item["insights_updated"],
    insights_reopened: item["insights_reopened"],
    token_usage: agentInsightTokenUsageDeserializer(item["token_usage"]),
  };
}

/** Token usage for an Agent Insights run. */
export interface AgentInsightTokenUsage {
  /** The number of input tokens used by the run. */
  input_tokens: number;
  /** The number of output tokens used by the run. */
  output_tokens: number;
  /** The number of input tokens served from cache. */
  cached_tokens?: number;
  /** The total number of tokens used by the run. */
  total_tokens: number;
}

export function agentInsightTokenUsageDeserializer(item: any): AgentInsightTokenUsage {
  return {
    input_tokens: item["input_tokens"],
    output_tokens: item["output_tokens"],
    cached_tokens: item["cached_tokens"],
    total_tokens: item["total_tokens"],
  };
}

/** The trigger that started an agent insight run. */
export type AgentInsightRunTrigger = "on_demand" | "scheduled";

/** The response data for a requested list of items. */
export interface _AgentsPagedResultAgentInsightRun {
  /** The requested list of items. */
  data: AgentInsightRun[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultAgentInsightRunDeserializer(
  item: any,
): _AgentsPagedResultAgentInsightRun {
  return {
    data: agentInsightRunArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function agentInsightRunArrayDeserializer(result: Array<AgentInsightRun>): any[] {
  return result.map((item) => {
    return agentInsightRunDeserializer(item);
  });
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultAgentInsight {
  /** The requested list of items. */
  data: AgentInsight[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultAgentInsightDeserializer(
  item: any,
): _AgentsPagedResultAgentInsight {
  return {
    data: agentInsightArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function agentInsightArrayDeserializer(result: Array<AgentInsight>): any[] {
  return result.map((item) => {
    return agentInsightDeserializer(item);
  });
}

/** A persisted issue discovered from an agent's traces. */
export interface AgentInsight {
  /** The insight identifier. */
  readonly id: string;
  /** The Agent Insights monitor this insight belongs to. */
  readonly monitor_id: string;
  /** The agent this insight belongs to. */
  readonly agent_name: string;
  /** The latest immutable agent version associated with this insight. */
  readonly agent_version: string;
  /** A short title for the issue. */
  readonly title: string;
  /** The severity of the issue. */
  readonly severity: AgentInsightSeverity;
  /** An open, service-generated category label for the issue. Clients must accept previously unseen values. */
  readonly category: string;
  /** The lifecycle status of the insight. */
  readonly status: AgentInsightStatus;
  /** The number of traces that provide evidence for this insight. */
  readonly trace_count: number;
  /** The time when this insight was created. */
  readonly created_at: Date;
  /** The time when this insight was last updated. */
  readonly updated_at: Date;
  /** The root-cause diagnosis for the issue. */
  readonly description: string;
  /** Additional insight details. Omitted unless details are requested. */
  readonly details?: AgentInsightDetails;
}

export function agentInsightDeserializer(item: any): AgentInsight {
  return {
    id: item["id"],
    monitor_id: item["monitor_id"],
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
    title: item["title"],
    severity: item["severity"],
    category: item["category"],
    status: item["status"],
    trace_count: item["trace_count"],
    created_at: new Date(item["created_at"] * 1000),
    updated_at: new Date(item["updated_at"] * 1000),
    description: item["description"],
    details: !item["details"] ? item["details"] : agentInsightDetailsDeserializer(item["details"]),
  };
}

/** The severity of an agent insight. */
export type AgentInsightSeverity = "high" | "medium" | "low";

/** The lifecycle status of an agent insight. */
export type AgentInsightStatus = "active" | "resolved" | "ignored";

/** Additional insight details. Omitted unless details are requested. */
export interface AgentInsightDetails {
  /** Up to 5 highlighted traces that provide evidence for this insight. */
  highlighted_traces: AgentInsightHighlightedTrace[];
  /** Up to 200 most recent traces linked to this insight as supporting evidence. */
  linked_traces: AgentInsightLinkedTrace[];
  /** The recommended remediation for this insight. */
  recommended_actions: AgentInsightRecommendedAction;
}

export function agentInsightDetailsDeserializer(item: any): AgentInsightDetails {
  return {
    highlighted_traces: agentInsightHighlightedTraceArrayDeserializer(item["highlighted_traces"]),
    linked_traces: agentInsightLinkedTraceArrayDeserializer(item["linked_traces"]),
    recommended_actions: agentInsightRecommendedActionDeserializer(item["recommended_actions"]),
  };
}

export function agentInsightHighlightedTraceArrayDeserializer(
  result: Array<AgentInsightHighlightedTrace>,
): any[] {
  return result.map((item) => {
    return agentInsightHighlightedTraceDeserializer(item);
  });
}

/** A highlighted trace that provides evidence for an agent insight. */
export interface AgentInsightHighlightedTrace {
  /** The trace identifier. */
  readonly trace_id: string;
  /** A short summary of the trace. */
  summary: string;
  /** The end-to-end duration of the trace in milliseconds. */
  duration_ms: number;
  /** Aggregate input and output tokens reported across all model inference calls in this trace, including calls to different models. Intended for relative usage comparison, not cost estimation. */
  total_tokens?: number;
  /** The time when the trace was recorded. */
  timestamp: Date;
}

export function agentInsightHighlightedTraceDeserializer(item: any): AgentInsightHighlightedTrace {
  return {
    trace_id: item["trace_id"],
    summary: item["summary"],
    duration_ms: item["duration_ms"],
    total_tokens: item["total_tokens"],
    timestamp: new Date(item["timestamp"] * 1000),
  };
}

export function agentInsightLinkedTraceArrayDeserializer(
  result: Array<AgentInsightLinkedTrace>,
): any[] {
  return result.map((item) => {
    return agentInsightLinkedTraceDeserializer(item);
  });
}

/** A lightweight trace reference linked to an agent insight as supporting evidence. */
export interface AgentInsightLinkedTrace {
  /** The trace identifier. */
  readonly trace_id: string;
  /** The time when the trace was recorded. */
  readonly timestamp: Date;
}

export function agentInsightLinkedTraceDeserializer(item: any): AgentInsightLinkedTrace {
  return {
    trace_id: item["trace_id"],
    timestamp: new Date(item["timestamp"] * 1000),
  };
}

/** The recommended remediation for an agent insight. */
export interface AgentInsightRecommendedAction {
  /** The single recommended fix for the issue represented by the insight. */
  proposed_fix: AgentInsightProposedFix;
}

export function agentInsightRecommendedActionDeserializer(
  item: any,
): AgentInsightRecommendedAction {
  return {
    proposed_fix: agentInsightProposedFixDeserializer(item["proposed_fix"]),
  };
}

/** A recommended fix for an agent insight. */
export interface AgentInsightProposedFix {
  /** The proposed-fix discriminator. */
  kind: AgentInsightProposedFixKind;
  /** The human-readable remediation guidance. */
  text: string;
  /** The concrete changes. Omitted for a prose-only fix. */
  changes?: AgentInsightProposedFixChange[];
}

export function agentInsightProposedFixDeserializer(item: any): AgentInsightProposedFix {
  return {
    kind: item["kind"],
    text: item["text"],
    changes: !item["changes"]
      ? item["changes"]
      : agentInsightProposedFixChangeArrayDeserializer(item["changes"]),
  };
}

/** The customer-renderable kind of an agent insight's proposed fix. */
export type AgentInsightProposedFixKind = "prose" | "code_change" | "prompt_change";

export function agentInsightProposedFixChangeArrayDeserializer(
  result: Array<AgentInsightProposedFixChange>,
): any[] {
  return result.map((item) => {
    return agentInsightProposedFixChangeDeserializer(item);
  });
}

/** A customer-renderable change in a proposed fix. */
export interface AgentInsightProposedFixChange {
  /** The source path changed by a code change. */
  path?: string;
  /** The language of the changed source path. */
  language?: string;
  /** The unified diff for the changed source path. */
  diff?: string;
  /** The Prompt surface changed by a Prompt change. */
  surface?: AgentInsightPromptSurface;
  /** The user-visible target within a Prompt surface, when needed. */
  target?: string;
  /** The bounded Prompt value before the change. Present for Prompt changes, including when null. */
  old_value?: any;
  /** The bounded Prompt value after the change. Present for Prompt changes, including when null. */
  new_value?: any;
}

export function agentInsightProposedFixChangeDeserializer(
  item: any,
): AgentInsightProposedFixChange {
  return {
    path: item["path"],
    language: item["language"],
    diff: item["diff"],
    surface: item["surface"],
    target: item["target"],
    old_value: item["old_value"],
    new_value: item["new_value"],
  };
}

/** The Prompt surface changed by a proposed fix. */
export type AgentInsightPromptSurface = "instructions" | "tool";

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
  | "RemoteTool_Preview"
  | "OpenAPI"
  | "RemoteA2A";

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
    supported_evaluation_levels: !item["supported_evaluation_levels"]
      ? item["supported_evaluation_levels"]
      : item["supported_evaluation_levels"].map((p: any) => {
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
    supported_evaluation_levels: !item["supported_evaluation_levels"]
      ? item["supported_evaluation_levels"]
      : item["supported_evaluation_levels"].map((p: any) => {
          return p;
        }),
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
  /** The discriminator possible values: code, prompt, rubric, endpoint */
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
  "prompt" | "code" | "prompt_and_code" | "service" | "openai_graders" | "rubric" | "endpoint";

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

/** Rubric evaluator definition. Ordinary quality rubrics report one aggregate. Safety rubrics require Boolean scoring and an explicit allowed classification on every dimension, and report disallowed_behavior_violated and allowed_behavior_violated as two independent lower-is-better metrics. Safety rubrics have no weights, threshold, or combined safety score. */
export interface RubricBasedEvaluatorDefinition extends EvaluatorDefinition {
  type: "rubric";
  /** The rubric criteria. Safety dimensions require allowed and omit weight. Rating generation includes a service residual; Boolean generation does not inject a generic residual. Existing ordinary and legacy definitions retain their behavior. */
  dimensions: Dimension[];
  /** Optional normalized threshold for Likert scoring, interpreted as 0.5 when omitted. Ordinary Boolean scoring requires all applicable checks to pass: omit this field or set it to 1; its effective threshold is 1 and other values are rejected. Safety rubrics omit this field and report two separate metrics without an overall threshold. */
  pass_threshold?: number;
  /** Simple scoring choices. Omission preserves existing legacy scoring for existing clients. No policy version is required from the caller. */
  scoring?: RubricScoring;
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
    scoring: !item["scoring"] ? item["scoring"] : rubricScoringSerializer(item["scoring"]),
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
    scoring: !item["scoring"] ? item["scoring"] : rubricScoringDeserializer(item["scoring"]),
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

/** One measurable criterion within a rubric. Quality criteria may use rating weights; safety criteria classify a behavior as allowed or disallowed. */
export interface Dimension {
  /** Stable identifier for this dimension (snake_case, e.g., `correct_resolution`). Required. Provided by the user when manually creating a rubric evaluator or during human-in-the-loop review of a generated set; the generation pipeline produces an initial value the user can edit. Editable when saving new versions. */
  id: string;
  /** What this dimension measures (e.g., 'Correctly identifies the user's reservation intent and pursues the appropriate workflow'). */
  description: string;
  /** Safety behavior classification: true means allowed behavior and false means disallowed behavior. Required on every safety criterion instead of weight. This is not an evaluation verdict. Omit for ordinary quality criteria; omission never defaults a safety criterion to false. Preserved through edits and regeneration. */
  allowed?: boolean;
  /** Optional configured weight for legacy or Likert scoring. For Likert, omit every weight for equal contribution or supply a weight for every dimension; partially weighted definitions are rejected. Boolean scoring rejects every configured weight, including explicit unit weights. No schema default is emitted. */
  weight?: number;
  /** Read-only model-suggested weight (1-10) returned for unweighted Likert dimensions. */
  readonly generated_weight?: number;
  /** When true, the LLM judge always scores this dimension regardless of relevance (skips applicability assessment). The service-generated general quality/policy dimension has this set to true and is non-editable. Users may set this on their own custom dimensions. The service defaults to `false` if a value is not specified by the caller. */
  always_applicable?: boolean;
}

export function dimensionSerializer(item: Dimension): any {
  return {
    id: item["id"],
    description: item["description"],
    allowed: item["allowed"],
    weight: item["weight"],
    always_applicable: item["always_applicable"],
  };
}

export function dimensionDeserializer(item: any): Dimension {
  return {
    id: item["id"],
    description: item["description"],
    allowed: item["allowed"],
    weight: item["weight"],
    generated_weight: item["generated_weight"],
    always_applicable: item["always_applicable"],
  };
}

/** Simple rubric scoring choices. Omission preserves existing legacy scoring. */
export interface RubricScoring {
  /** Rubric-level scoring mode. Defaults to Likert when scoring is supplied. Omitting scoring preserves existing legacy behavior. */
  mode?: RubricScoringMode;
}

export function rubricScoringSerializer(item: RubricScoring): any {
  return { mode: item["mode"] };
}

export function rubricScoringDeserializer(item: any): RubricScoring {
  return {
    mode: item["mode"],
  };
}

/** The judgment mode selected for an entire rubric. Safety rubrics use Boolean judgments with separately reported allowed and disallowed behavior metrics. */
export type RubricScoringMode = "boolean" | "likert";

/** Endpoint-based evaluator definition. The customer owns and hosts an HTTP endpoint that implements the evaluation contract. The evaluator references a Project Connection by name; the connection stores the endpoint URL and credentials (API Key or Entra ID). At execution time, the service resolves the connection to obtain the endpoint URL and authentication details, then calls the endpoint for each evaluation row. */
export interface EndpointBasedEvaluatorDefinition extends EvaluatorDefinition {
  type: "endpoint";
  /** Name of the Project Connection that stores the endpoint URL and credentials. The connection must exist on the project and have a non-empty target URL. Supported auth types: ApiKey (sends `api-key` header) and AAD/Entra ID (acquires a bearer token via the project's Managed Identity). */
  connection_name: string;
  /** Version of the contract between the service and the evaluator endpoint. Optional on create; if omitted, the service uses `0.0.1`, so existing clients that do not send this property are unaffected. Stored evaluator versions keep the value they were created with. Registration rejects values the service does not support; the type stays extensible so responses can return newer versions. Version `0.0.2` requires `metrics` to contain exactly one metric, of type `ordinal` or `continuous`. */
  schema_version?: EndpointEvaluatorSchemaVersion;
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
    schema_version: item["schema_version"],
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
    schema_version: item["schema_version"],
  };
}

/** Contract version for an endpoint-based evaluator. */
export type EndpointEvaluatorSchemaVersion = "0.0.1" | "0.0.2";

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

/** Reference to a Dataset whose concrete version has already been resolved. */
export interface DatasetReference {
  /** Dataset name. */
  name: string;
  /** Concrete Dataset version. */
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

/** Caller-supplied inputs for an evaluator generation job. */
export interface EvaluatorGenerationInputs {
  /** Source materials for generation. Safety generation requires a nonempty prompt source for the objective and at least one agent or trace source for application context. An arbitrary dataset cannot replace safety application context. Ordinary generation keeps its existing supported sources. */
  sources: EvaluatorGenerationJobSourceUnion[];
  /** Generation intent. Omission preserves the existing quality path. Explicitly select safety for safety generation and regeneration. Safety output uses Boolean scoring, allowed classifications, and two named violation metrics. */
  category?: EvaluatorGenerationCategory;
  /** The caller's model for quality rubric generation (e.g., 'gpt-4o'). Required by the service when category is quality or omitted. Safety generation and regeneration use centrally managed red teaming simulation capacity, ignore this field when supplied, and do not fall back to caller capacity. Safety rubric scoring separately uses centrally managed red teaming evaluator capacity. */
  model?: string;
  /** The evaluator name (immutable identifier). 1-256 characters; allowed characters are ASCII letters, digits, underscore (`_`), period (`.`), tilde (`~`), and hyphen (`-`). The prefix `builtin.` is reserved for system-managed evaluators and is rejected by the service. If an evaluator with this name already exists in the project (and is rubric-subtype), the service creates a new version under the same name and uses the prior version's `dimensions` as context for incremental improvement (foundation of the post-//build adaptive loop). Old versions remain queryable via `get_version(name, version)`. If the existing evaluator is not a rubric-subtype evaluator (built-in, prompt-based, code-based), the request is rejected with `400 Bad Request`. */
  evaluator_name: string;
  /** Optional human-friendly display name for the resulting evaluator. Surfaced as `EvaluatorVersion.display_name` on the persisted evaluator. When omitted, the service uses `evaluator_name` as the display name. The `evaluator_` prefix disambiguates this from the immutable `evaluator_name` identifier. */
  evaluator_display_name?: string;
  /** Optional human-friendly description for the resulting evaluator. Surfaced as `EvaluatorVersion.description` on the persisted evaluator. Typically collected from the UI alongside `evaluator_display_name`. The `evaluator_` prefix disambiguates this from any other description fields on related models. */
  evaluator_description?: string;
  /** Scoring choices for the generated evaluator. For quality, supplied scoring defaults to Likert; omitted weights on first creation yield equal contribution, and regeneration preserves saved choices. Omitting scoring preserves existing quality generation behavior. Safety generation resolves omitted scoring to Boolean and rejects a conflicting supplied mode; its dimensions use allowed rather than weights and its two metric results are not combined. */
  scoring?: RubricScoring;
  /** Optional normalized Likert threshold: omission uses 0.5 for fresh generation and inherits the saved threshold on regeneration. For ordinary Boolean generation, omit this field or set it to 1; other values are rejected and its all-pass threshold is fixed at 1. Safety generation omits this field because its two violation metrics have no overall threshold. */
  pass_threshold?: number;
  /** Caller-approved dimensions to preserve while generating other checks. Omission preserves prior approved dimensions on regeneration; an explicit list replaces the fixed set. Safety fixed dimensions require an explicit allowed Boolean, omit weights, and preserve classification as part of their policy meaning. */
  dimensions?: Dimension[];
}

export function evaluatorGenerationInputsSerializer(item: EvaluatorGenerationInputs): any {
  return {
    sources: evaluatorGenerationJobSourceUnionArraySerializer(item["sources"]),
    category: item["category"],
    model: item["model"],
    evaluator_name: item["evaluator_name"],
    evaluator_display_name: item["evaluator_display_name"],
    evaluator_description: item["evaluator_description"],
    scoring: !item["scoring"] ? item["scoring"] : rubricScoringSerializer(item["scoring"]),
    pass_threshold: item["pass_threshold"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : dimensionArraySerializer(item["dimensions"]),
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
  /** Optional explicit list of trace IDs to include. */
  trace_ids?: string[];
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
    trace_ids: !item["trace_ids"]
      ? item["trace_ids"]
      : item["trace_ids"].map((p: any) => {
          return p;
        }),
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
    trace_ids: !item["trace_ids"]
      ? item["trace_ids"]
      : item["trace_ids"].map((p: any) => {
          return p;
        }),
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

/** The requested evaluator generation category. */
export type EvaluatorGenerationCategory = "quality" | "safety";

/** Evaluator Generation Job resource — a long-running job that generates rubric-based evaluator definitions from source materials. On success, the result is the persisted EvaluatorVersion. */
export interface EvaluatorGenerationJob {
  /** Server-assigned unique identifier. */
  readonly id: string;
  /** Result produced on success. */
  readonly result?: EvaluatorVersion;
  /** Current lifecycle status. */
  readonly status: JobStatus;
  /** Error details — populated only on failure. */
  readonly error?: ApiError;
  /** Source materials for generation — agent descriptions, prompts, traces, or datasets. Each entry is an `EvaluatorGenerationJobSource` variant discriminated by `type`. */
  sources: EvaluatorGenerationJobSourceUnion[];
  /** Generation intent selected or inherited for this generation attempt. Omitted when no category was supplied. */
  readonly category?: EvaluatorGenerationCategory;
  /** The LLM model used for quality rubric generation (e.g., 'gpt-4o'). Empty when safety generation uses centrally managed simulation capacity. */
  model: string;
  /** The evaluator name (immutable identifier). 1-256 characters; allowed characters are ASCII letters, digits, underscore (`_`), period (`.`), tilde (`~`), and hyphen (`-`). The prefix `builtin.` is reserved for system-managed evaluators and is rejected by the service. If an evaluator with this name already exists in the project (and is rubric-subtype), the service creates a new version under the same name and uses the prior version's `dimensions` as context for incremental improvement (foundation of the post-//build adaptive loop). Old versions remain queryable via `get_version(name, version)`. If the existing evaluator is not a rubric-subtype evaluator (built-in, prompt-based, code-based), the request is rejected with `400 Bad Request`. */
  evaluator_name: string;
  /** Optional human-friendly display name for the resulting evaluator. Surfaced as `EvaluatorVersion.display_name` on the persisted evaluator. When omitted, the service uses `evaluator_name` as the display name. The `evaluator_` prefix disambiguates this from the immutable `evaluator_name` identifier. */
  evaluator_display_name?: string;
  /** Optional human-friendly description for the resulting evaluator. Surfaced as `EvaluatorVersion.description` on the persisted evaluator. Typically collected from the UI alongside `evaluator_display_name`. The `evaluator_` prefix disambiguates this from any other description fields on related models. */
  evaluator_description?: string;
  /** Rubric scoring selected for this generation attempt, including an inherited saved mode. Omitted for legacy generation. */
  readonly scoring?: RubricScoring;
  /** Normalized pass threshold supplied or inherited for this generation attempt. Omitted when no threshold was supplied or saved. Boolean scoring always uses an effective threshold of 1. */
  readonly pass_threshold?: number;
  /** Caller-approved dimensions fixed for this generation attempt, not the complete generated result. Omission retains normal regeneration ownership handling; an empty list explicitly clears the fixed set. */
  readonly dimensions?: Dimension[];
  /** The timestamp when the job was created, represented in Unix time (seconds since January 1, 1970). */
  readonly created_at: Date;
  /** The timestamp when the job finished, represented in Unix time (seconds since January 1, 1970). */
  readonly finished_at?: Date;
  /** Token consumption summary. Populated when the job reaches a terminal state. */
  readonly usage?: EvaluatorGenerationTokenUsage;
  /** Non-fatal input-quality advisories produced by the generation pipeline. Read-only; service-generated; populated only on terminal jobs when advisories fired. Omitted when generation was clean. Cleared when a subsequent `PATCH` to the paired `EvaluatorVersion.definition` invalidates the advisories. */
  readonly input_quality_warnings?: RubricGenerationInputQualityWarning[];
}

export function evaluatorGenerationJobDeserializer(item: any): EvaluatorGenerationJob {
  return {
    id: item["id"],
    result: !item["result"] ? item["result"] : evaluatorVersionDeserializer(item["result"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
    sources: evaluatorGenerationJobSourceUnionArrayDeserializer(item["sources"]),
    category: item["category"],
    model: item["model"],
    evaluator_name: item["evaluator_name"],
    evaluator_display_name: item["evaluator_display_name"],
    evaluator_description: item["evaluator_description"],
    scoring: !item["scoring"] ? item["scoring"] : rubricScoringDeserializer(item["scoring"]),
    pass_threshold: item["pass_threshold"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : dimensionArrayDeserializer(item["dimensions"]),
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
  /** Zero-based index into `EvaluatorGenerationJob.sources` when the warning applies to a specific source. Omitted for aggregate warnings and for warnings not tied to one source. */
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
    data: evaluatorGenerationJobArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function evaluatorGenerationJobArrayDeserializer(
  result: Array<EvaluatorGenerationJob>,
): any[] {
  return result.map((item) => {
    return evaluatorGenerationJobDeserializer(item);
  });
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
  /** The discriminator possible values: code_interpreter, file_search, web_search, shell, mcp, azure_ai_search, openapi, a2a, a2a_preview, browser_automation_preview, browser_automation, reminder_preview, work_iq_preview, fabric_iq_preview, web_iq_preview, toolbox_search_preview, toolbox_search */
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
  | BrowserAutomationToolboxTool
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

    case "browser_automation":
      return browserAutomationToolboxToolSerializer(item as BrowserAutomationToolboxTool);

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

    case "browser_automation":
      return browserAutomationToolboxToolDeserializer(item as BrowserAutomationToolboxTool);

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
  | "web_iq_preview"
  | "browser_automation";

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
      : _codeInterpreterToolboxToolContainerSerializer(item["container"]),
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
      : _codeInterpreterToolboxToolContainerDeserializer(item["container"]),
  };
}

/** Alias for _CodeInterpreterToolboxToolContainer */
export type _CodeInterpreterToolboxToolContainer = string | AutoCodeInterpreterToolParam;

export function _codeInterpreterToolboxToolContainerSerializer(
  item: _CodeInterpreterToolboxToolContainer,
): any {
  return item;
}

export function _codeInterpreterToolboxToolContainerDeserializer(
  item: any,
): _CodeInterpreterToolboxToolContainer {
  return item;
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
  /** Allow live internet access for web search. Defaults to true when omitted. When false, the web search tool runs in offline/cache-only mode and will not fetch new external content. */
  external_web_access?: boolean;
  filters?: WebSearchToolFilters;
  /**
   * The approximate location of the user. If omitted or null, defaults to the
   *   United States. To avoid this fallback, pass `{"type": "approximate"}` without
   *   location fields. To localize results, provide the relevant location fields.
   */
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
    external_web_access: item["external_web_access"],
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
    external_web_access: item["external_web_access"],
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
   *   about service connectors [here](https://developers.openai.com/api/docs/guides/tools-connectors-mcp#connectors).
   *   This field is deprecated for models released after September 1, 2026.
   *   Use `server_url` to connect to a remote MCP server, or `tunnel_id` to
   *   connect through a Secure MCP Tunnel.
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
  /** Bindings that supply request headers to this MCP server. */
  request_header_bindings?: MCPToolboxRequestHeaderBinding[];
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
      : _voiceAgentMcpToolAllowedToolsSerializer(item["allowed_tools"]),
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p: any) => {
          return p;
        }),
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _voiceAgentMcpToolRequireApprovalSerializer(item["require_approval"]),
    defer_loading: item["defer_loading"],
    project_connection_id: item["project_connection_id"],
    request_header_bindings: !item["request_header_bindings"]
      ? item["request_header_bindings"]
      : mcpToolboxRequestHeaderBindingArraySerializer(item["request_header_bindings"]),
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
      : _voiceAgentMcpToolAllowedToolsDeserializer(item["allowed_tools"]),
    allowed_callers: !item["allowed_callers"]
      ? item["allowed_callers"]
      : item["allowed_callers"].map((p1: any) => {
          return p1;
        }),
    require_approval: !item["require_approval"]
      ? item["require_approval"]
      : _voiceAgentMcpToolRequireApprovalDeserializer(item["require_approval"]),
    defer_loading: item["defer_loading"],
    project_connection_id: item["project_connection_id"],
    request_header_bindings: !item["request_header_bindings"]
      ? item["request_header_bindings"]
      : mcpToolboxRequestHeaderBindingArrayDeserializer(item["request_header_bindings"]),
  };
}

export function mcpToolboxRequestHeaderBindingArraySerializer(
  result: Array<MCPToolboxRequestHeaderBinding>,
): any[] {
  return result.map((item) => {
    return mcpToolboxRequestHeaderBindingSerializer(item);
  });
}

export function mcpToolboxRequestHeaderBindingArrayDeserializer(
  result: Array<MCPToolboxRequestHeaderBinding>,
): any[] {
  return result.map((item) => {
    return mcpToolboxRequestHeaderBindingDeserializer(item);
  });
}

/** A binding that supplies a request header to an MCP server. */
export interface MCPToolboxRequestHeaderBinding {
  /** The name of the HTTP header to forward to the MCP server. Must be a non-empty HTTP field-name token. */
  header_name: string;
  /** The source of the header value, for example `client_headers`. */
  source: MCPToolboxRequestHeaderBindingSource;
  /** Whether the client must supply this header. */
  required: boolean;
}

export function mcpToolboxRequestHeaderBindingSerializer(
  item: MCPToolboxRequestHeaderBinding,
): any {
  return { header_name: item["header_name"], source: item["source"], required: item["required"] };
}

export function mcpToolboxRequestHeaderBindingDeserializer(
  item: any,
): MCPToolboxRequestHeaderBinding {
  return {
    header_name: item["header_name"],
    source: item["source"],
    required: item["required"],
  };
}

/** The source used to resolve a request header value for an MCP server. */
export type MCPToolboxRequestHeaderBindingSource = "client_headers";

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

/**
 * A browser automation tool stored in a toolbox.
 * BrowserAutomationPreviewToolboxTool is deprecated.
 * Please use BrowserAutomationToolboxTool instead.
 * See https://aka.ms/bat/docs for more information on Browser automation tool.
 */
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

/** A browser automation tool stored in a toolbox. */
export interface BrowserAutomationToolboxTool extends ToolboxTool {
  type: "browser_automation";
  /** The Browser Automation Tool parameters. */
  browser_automation: BrowserAutomationToolParameters;
}

export function browserAutomationToolboxToolSerializer(item: BrowserAutomationToolboxTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordSerializer(item["tool_configs"]),
    browser_automation: browserAutomationToolParametersSerializer(item["browser_automation"]),
  };
}

export function browserAutomationToolboxToolDeserializer(item: any): BrowserAutomationToolboxTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    tool_configs: !item["tool_configs"]
      ? item["tool_configs"]
      : toolConfigRecordDeserializer(item["tool_configs"]),
    browser_automation: browserAutomationToolParametersDeserializer(item["browser_automation"]),
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
  /** The Unix timestamp (seconds) when the toolbox was last updated. This value changes when a new toolbox version is created or the toolbox is updated. */
  updated_at: Date;
  /** The versions associated with the toolbox. */
  versions: ToolboxVersions;
  /** The version identifier that the toolbox currently points to. Defaults to the latest version. Can be changed via updateToolbox. */
  default_version: string;
}

export function toolboxObjectDeserializer(item: any): ToolboxObject {
  return {
    id: item["id"],
    name: item["name"],
    updated_at: new Date(item["updated_at"] * 1000),
    versions: toolboxVersionsDeserializer(item["versions"]),
    default_version: item["default_version"],
  };
}

/** The versions associated with a toolbox. */
export interface ToolboxVersions {
  /** The latest version of the toolbox. */
  latest: ToolboxVersionObject;
}

export function toolboxVersionsDeserializer(item: any): ToolboxVersions {
  return {
    latest: toolboxVersionObjectDeserializer(item["latest"]),
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

/** A flat page of recorded evaluator changes and computed health snapshots. */
export interface _CompletedEvaluatorDiagnosticsPage {
  /** The recorded evaluator diagnostics. */
  data: EvaluatorDiagnosticUnion[];
  /** The first diagnostic identifier represented in this page. */
  first_id?: string;
  /** The last diagnostic identifier represented in this page. */
  last_id?: string;
  /** Whether more diagnostic entries are available. */
  has_more: boolean;
}

export function _completedEvaluatorDiagnosticsPageDeserializer(
  item: any,
): _CompletedEvaluatorDiagnosticsPage {
  return {
    data: evaluatorDiagnosticUnionArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function evaluatorDiagnosticUnionArrayDeserializer(
  result: Array<EvaluatorDiagnosticUnion>,
): any[] {
  return result.map((item) => {
    return evaluatorDiagnosticUnionDeserializer(item);
  });
}

/** The shared fields for recorded evaluator changes and health snapshots. */
export interface EvaluatorDiagnostic {
  /** The stable server-assigned diagnostic identifier. */
  id: string;
  /** The evaluator version associated with the recorded snapshot. */
  evaluator_version: string;
  /** The server-recorded time when the change occurred, expressed as Unix seconds. */
  occurred_at: Date;
  /** A stable machine-readable classification describing why the change occurred. */
  change_type: EvaluatorDiagnosticChangeType;
  /** A bounded deterministic summary of the change. */
  explanation?: string;
  /** The diagnostic change shape. */
  /** The discriminator possible values: health_computed, version_created, dimension_added, dimension_updated, dimension_removed, definition_updated */
  type: EvaluatorDiagnosticType;
}

export function evaluatorDiagnosticDeserializer(item: any): EvaluatorDiagnostic {
  return {
    id: item["id"],
    evaluator_version: item["evaluator_version"],
    occurred_at: new Date(item["occurred_at"] * 1000),
    change_type: item["change_type"],
    explanation: item["explanation"],
    type: item["type"],
  };
}

/** Alias for EvaluatorDiagnosticUnion */
export type EvaluatorDiagnosticUnion =
  | HealthComputedDiagnosticChange
  | VersionCreatedDiagnosticChange
  | DimensionAddedDiagnosticChange
  | DimensionUpdatedDiagnosticChange
  | DimensionRemovedDiagnosticChange
  | DefinitionUpdatedDiagnosticChange
  | EvaluatorDiagnostic;

export function evaluatorDiagnosticUnionDeserializer(item: any): EvaluatorDiagnosticUnion {
  switch (item["type"]) {
    case "health_computed":
      return healthComputedDiagnosticChangeDeserializer(item as HealthComputedDiagnosticChange);

    case "version_created":
      return versionCreatedDiagnosticChangeDeserializer(item as VersionCreatedDiagnosticChange);

    case "dimension_added":
      return dimensionAddedDiagnosticChangeDeserializer(item as DimensionAddedDiagnosticChange);

    case "dimension_updated":
      return dimensionUpdatedDiagnosticChangeDeserializer(item as DimensionUpdatedDiagnosticChange);

    case "dimension_removed":
      return dimensionRemovedDiagnosticChangeDeserializer(item as DimensionRemovedDiagnosticChange);

    case "definition_updated":
      return definitionUpdatedDiagnosticChangeDeserializer(
        item as DefinitionUpdatedDiagnosticChange,
      );

    default:
      return evaluatorDiagnosticDeserializer(item);
  }
}

/** Known machine-readable classifications for evaluator diagnostic changes. */
export type EvaluatorDiagnosticChangeType =
  | "human_created"
  | "human_added"
  | "human_edited"
  | "human_removed"
  | "generated"
  | "regenerated"
  | "not_present_in_generated_rubric"
  | "generation_completed";

/** The supported evaluator diagnostic change shapes. */
export type EvaluatorDiagnosticType =
  | "version_created"
  | "dimension_added"
  | "dimension_updated"
  | "dimension_removed"
  | "definition_updated"
  | "health_computed";

/** Health computed during evaluator generation and retained as a historical snapshot. GET does not recompute these values after later edits. */
export interface HealthComputedDiagnosticChange extends EvaluatorDiagnostic {
  /** The authenticated user or service responsible for the lineage event. */
  actor: EvaluatorDiagnosticActorUnion;
  type: "health_computed";
  /** The generation job that produced the health snapshot. */
  generation_job_id: string;
  /** The computed health metrics and their availability. */
  health: EvaluatorHealthMetrics;
}

export function healthComputedDiagnosticChangeDeserializer(
  item: any,
): HealthComputedDiagnosticChange {
  return {
    id: item["id"],
    evaluator_version: item["evaluator_version"],
    occurred_at: new Date(item["occurred_at"] * 1000),
    change_type: item["change_type"],
    explanation: item["explanation"],
    type: item["type"],
    actor: evaluatorDiagnosticActorUnionDeserializer(item["actor"]),
    generation_job_id: item["generation_job_id"],
    health: evaluatorHealthMetricsDeserializer(item["health"]),
  };
}

/** The actor responsible for an evaluator lineage diagnostic. */
export interface EvaluatorDiagnosticActor {
  /** The type of actor. */
  /** The discriminator possible values: user, service */
  type: EvaluatorDiagnosticActorType;
  /** A stable opaque principal or service identifier, when available. */
  id?: string;
}

export function evaluatorDiagnosticActorDeserializer(item: any): EvaluatorDiagnosticActor {
  return {
    type: item["type"],
    id: item["id"],
  };
}

/** Alias for EvaluatorDiagnosticActorUnion */
export type EvaluatorDiagnosticActorUnion =
  UserEvaluatorDiagnosticActor | ServiceEvaluatorDiagnosticActor | EvaluatorDiagnosticActor;

export function evaluatorDiagnosticActorUnionDeserializer(
  item: any,
): EvaluatorDiagnosticActorUnion {
  switch (item["type"]) {
    case "user":
      return userEvaluatorDiagnosticActorDeserializer(item as UserEvaluatorDiagnosticActor);

    case "service":
      return serviceEvaluatorDiagnosticActorDeserializer(item as ServiceEvaluatorDiagnosticActor);

    default:
      return evaluatorDiagnosticActorDeserializer(item);
  }
}

/** The type of actor responsible for an evaluator lineage diagnostic. */
export type EvaluatorDiagnosticActorType = "user" | "service";

/** An authenticated user responsible for an evaluator lineage diagnostic. */
export interface UserEvaluatorDiagnosticActor extends EvaluatorDiagnosticActor {
  /** An authenticated user initiated the change. */
  type: "user";
}

export function userEvaluatorDiagnosticActorDeserializer(item: any): UserEvaluatorDiagnosticActor {
  return {
    type: item["type"],
    id: item["id"],
  };
}

/** A Foundry service component responsible for an evaluator lineage diagnostic. */
export interface ServiceEvaluatorDiagnosticActor extends EvaluatorDiagnosticActor {
  /** A Foundry service component initiated the change. */
  type: "service";
}

export function serviceEvaluatorDiagnosticActorDeserializer(
  item: any,
): ServiceEvaluatorDiagnosticActor {
  return {
    type: item["type"],
    id: item["id"],
  };
}

/** A snapshot of existing rubric-health computations. Missing components remain null and are not replaced with zeros. */
export interface EvaluatorHealthMetrics {
  /** The number of rubric dimensions used by the computation. */
  n_dimensions: number;
  /** The dimension identifiers in their order when health was computed. */
  dimension_ids: string[];
  /** Embedding-based dimension diversity, or null when unavailable. */
  diversity: number | null;
  /** Embedding-based source coverage, or null when unavailable. */
  coverage: number | null;
  /** Failure-path balance computed by the existing keyword heuristic. */
  negative_vs_positive: number;
  /** The existing weighted overall score. Null if any component is unavailable; weights are not renormalized around missing components. */
  overall: number | null;
  /** Provisional structural confidence: 'low', 'med', or 'high'. This is not a calibrated statistical confidence. */
  confidence: EvaluatorHealthConfidence;
  /** Pairs of dimension indices flagged as redundant by the existing computation. */
  redundant_pairs: number[][];
}

export function evaluatorHealthMetricsDeserializer(item: any): EvaluatorHealthMetrics {
  return {
    n_dimensions: item["n_dimensions"],
    dimension_ids: item["dimension_ids"].map((p: any) => {
      return p;
    }),
    diversity: item["diversity"],
    coverage: item["coverage"],
    negative_vs_positive: item["negative_vs_positive"],
    overall: item["overall"],
    confidence: item["confidence"],
    redundant_pairs: item["redundant_pairs"].map((p: any) => {
      return p.map((p1: any) => {
        return p1;
      });
    }),
  };
}

/** Provisional structural confidence level for computed rubric health. */
export type EvaluatorHealthConfidence = "low" | "med" | "high";

/** A diagnostic change recording the creation of an evaluator version. */
export interface VersionCreatedDiagnosticChange extends EvaluatorDiagnostic {
  /** The authenticated user or service responsible for the lineage event. */
  actor: EvaluatorDiagnosticActorUnion;
  type: "version_created";
  /** The preceding published evaluator version, when one exists. */
  prior_version?: string;
  /** The evaluator generation job that created the version, when applicable. */
  generation_job_id?: string;
}

export function versionCreatedDiagnosticChangeDeserializer(
  item: any,
): VersionCreatedDiagnosticChange {
  return {
    id: item["id"],
    evaluator_version: item["evaluator_version"],
    occurred_at: new Date(item["occurred_at"] * 1000),
    change_type: item["change_type"],
    explanation: item["explanation"],
    type: item["type"],
    actor: evaluatorDiagnosticActorUnionDeserializer(item["actor"]),
    prior_version: item["prior_version"],
    generation_job_id: item["generation_job_id"],
  };
}

/** A diagnostic change recording the addition of a rubric dimension. */
export interface DimensionAddedDiagnosticChange extends EvaluatorDiagnostic {
  /** The authenticated user or service responsible for the lineage event. */
  actor: EvaluatorDiagnosticActorUnion;
  type: "dimension_added";
  /** The public dimension identifier associated with the change. It remains stable until explicitly changed; changing an identifier produces a removal change for the prior identifier and an addition change for the new identifier. */
  dimension_id: string;
  /** The resulting complete dimension snapshot. */
  after: Dimension;
  /** The public dimension fields changed, when reported. */
  changed_fields?: string[];
}

export function dimensionAddedDiagnosticChangeDeserializer(
  item: any,
): DimensionAddedDiagnosticChange {
  return {
    id: item["id"],
    evaluator_version: item["evaluator_version"],
    occurred_at: new Date(item["occurred_at"] * 1000),
    change_type: item["change_type"],
    explanation: item["explanation"],
    type: item["type"],
    actor: evaluatorDiagnosticActorUnionDeserializer(item["actor"]),
    dimension_id: item["dimension_id"],
    after: dimensionDeserializer(item["after"]),
    changed_fields: !item["changed_fields"]
      ? item["changed_fields"]
      : item["changed_fields"].map((p: any) => {
          return p;
        }),
  };
}

/** A diagnostic change recording an update to a rubric dimension. */
export interface DimensionUpdatedDiagnosticChange extends EvaluatorDiagnostic {
  /** The authenticated user or service responsible for the lineage event. */
  actor: EvaluatorDiagnosticActorUnion;
  type: "dimension_updated";
  /** The public dimension identifier associated with the change. It remains stable until explicitly changed; changing an identifier produces a removal change for the prior identifier and an addition change for the new identifier. */
  dimension_id: string;
  /** The complete dimension snapshot before the update. */
  before: Dimension;
  /** The complete dimension snapshot after the update. */
  after: Dimension;
  /** The public dimension fields changed, when reported. */
  changed_fields?: string[];
}

export function dimensionUpdatedDiagnosticChangeDeserializer(
  item: any,
): DimensionUpdatedDiagnosticChange {
  return {
    id: item["id"],
    evaluator_version: item["evaluator_version"],
    occurred_at: new Date(item["occurred_at"] * 1000),
    change_type: item["change_type"],
    explanation: item["explanation"],
    type: item["type"],
    actor: evaluatorDiagnosticActorUnionDeserializer(item["actor"]),
    dimension_id: item["dimension_id"],
    before: dimensionDeserializer(item["before"]),
    after: dimensionDeserializer(item["after"]),
    changed_fields: !item["changed_fields"]
      ? item["changed_fields"]
      : item["changed_fields"].map((p: any) => {
          return p;
        }),
  };
}

/** A diagnostic change recording the removal of a rubric dimension. */
export interface DimensionRemovedDiagnosticChange extends EvaluatorDiagnostic {
  /** The authenticated user or service responsible for the lineage event. */
  actor: EvaluatorDiagnosticActorUnion;
  type: "dimension_removed";
  /** The public dimension identifier associated with the change. It remains stable until explicitly changed; changing an identifier produces a removal change for the prior identifier and an addition change for the new identifier. */
  dimension_id: string;
  /** The complete dimension snapshot before removal. */
  before: Dimension;
  /** The public dimension fields changed, when reported. */
  changed_fields?: string[];
}

export function dimensionRemovedDiagnosticChangeDeserializer(
  item: any,
): DimensionRemovedDiagnosticChange {
  return {
    id: item["id"],
    evaluator_version: item["evaluator_version"],
    occurred_at: new Date(item["occurred_at"] * 1000),
    change_type: item["change_type"],
    explanation: item["explanation"],
    type: item["type"],
    actor: evaluatorDiagnosticActorUnionDeserializer(item["actor"]),
    dimension_id: item["dimension_id"],
    before: dimensionDeserializer(item["before"]),
    changed_fields: !item["changed_fields"]
      ? item["changed_fields"]
      : item["changed_fields"].map((p: any) => {
          return p;
        }),
  };
}

/** A diagnostic change recording functional evaluator changes outside individual dimensions. */
export interface DefinitionUpdatedDiagnosticChange extends EvaluatorDiagnostic {
  /** The authenticated user or service responsible for the lineage event. */
  actor: EvaluatorDiagnosticActorUnion;
  type: "definition_updated";
  /** The functional field changes applied. */
  field_changes: EvaluatorFieldChange[];
}

export function definitionUpdatedDiagnosticChangeDeserializer(
  item: any,
): DefinitionUpdatedDiagnosticChange {
  return {
    id: item["id"],
    evaluator_version: item["evaluator_version"],
    occurred_at: new Date(item["occurred_at"] * 1000),
    change_type: item["change_type"],
    explanation: item["explanation"],
    type: item["type"],
    actor: evaluatorDiagnosticActorUnionDeserializer(item["actor"]),
    field_changes: evaluatorFieldChangeArrayDeserializer(item["field_changes"]),
  };
}

export function evaluatorFieldChangeArrayDeserializer(result: Array<EvaluatorFieldChange>): any[] {
  return result.map((item) => {
    return evaluatorFieldChangeDeserializer(item);
  });
}

/** A change to one functional evaluator field. */
export interface EvaluatorFieldChange {
  /** A stable path identifying the changed field. */
  field: string;
  /** The prior snapshot, mapping the exact `field` path to its JSON value. The mapped value may be a scalar, array, object, or null. */
  before: Record<string, any>;
  /** The resulting snapshot, mapping the exact `field` path to its JSON value. The mapped value may be a scalar, array, object, or null. */
  after: Record<string, any>;
}

export function evaluatorFieldChangeDeserializer(item: any): EvaluatorFieldChange {
  return {
    field: item["field"],
    before: Object.fromEntries(
      Object.entries(item["before"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    after: Object.fromEntries(Object.entries(item["after"]).map(([k, p]: [string, any]) => [k, p])),
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
  "TooFewSamples" | "Inconclusive" | "Changed" | "Improved" | "Degraded";

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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
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
  return { type: item["type"], at: !item["at"] ? item["at"] : (item["at"].getTime() / 1000) | 0 };
}

export function timerRoutineTriggerDeserializer(item: any): TimerRoutineTrigger {
  return {
    type: item["type"],
    at: !item["at"] ? item["at"] : new Date(item["at"] * 1000),
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
    parameters: Object.fromEntries(
      Object.entries(item["parameters"]).map(([k, p]: [string, any]) => [k, p]),
    ),
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

/** Optional authorization configuration for a routine dispatch. */
export interface RoutineAuthorization {
  /** The identity used when dispatching the routine. Defaults to agent when omitted; set to creator only when the customer opts in to creator identity dispatch. */
  identity?: RoutineDispatchIdentity;
}

export function routineAuthorizationSerializer(item: RoutineAuthorization): any {
  return { identity: item["identity"] };
}

/** The supported identities for routine dispatch authorization. */
export type RoutineDispatchIdentity = "agent" | "creator";

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

/** A page of items with a URL cursor to the next page. */
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
  return result.map((item) => {
    return routineDeserializer(item);
  });
}

/** A page of items with a URL cursor to the next page. */
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
  input: any;
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
  input: any;
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
    evalRun: item["evalRun"],
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
    evalRun: Object.fromEntries(
      Object.entries(item["evalRun"]).map(([k, p]: [string, any]) => [k, p]),
    ),
  };
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
    ...item["files"].map((x: unknown) => createFilePartDescriptor("files", x)),
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
  last_error?: ApiError;
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
export interface VoiceResponse {
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
  /** The list of output items generated by the response. */
  output?: RealtimeConversationItemUnion[];
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
  /** The audio configuration used for the response, including the voice and audio format used for output. */
  audio?: VoiceResponseAudio;
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
    output: !item["output"]
      ? item["output"]
      : realtimeConversationItemUnionArrayDeserializer(item["output"]),
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
      : _voiceResponseMaxOutputTokensDeserializer(item["max_output_tokens"]),
    audio: !item["audio"] ? item["audio"] : voiceResponseAudioDeserializer(item["audio"]),
    temperature: item["temperature"],
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    completed_at: !item["completed_at"]
      ? item["completed_at"]
      : new Date(item["completed_at"] * 1000),
  };
}

/** Additional item kinds used by the Voice Agent service. */
export type VoiceAgentConversationItemTypeExtension = "system_tool";

/** Service-generated system-tool intent, not a provider result. Clients cannot create it or complete it with `function_call_output`. */
export interface VoiceAgentSystemToolItem extends RealtimeConversationItem {
  /** The output-item kind. Always `system_tool`. */
  type: "system_tool";
  /** The identifier of the generated item. */
  id?: string;
  /** The realtime item marker. */
  object?: "realtime.item";
  /** The generation status of the item, not the provider execution outcome. */
  status: VoiceAgentSystemToolItemStatus;
  /** The built-in capability invoked by the model. */
  name: VoiceAgentSystemToolName;
  /** The invocation identifier used for correlation and duplicate suppression. */
  call_id: string;
  /** Original JSON-encoded intent: literals remain visible and references stay unexpanded. Excludes private values, resolved arguments and executor-only settings. */
  arguments: string;
  /** The Unix timestamp (in seconds) for when the item was persisted. */
  readonly created_at?: Date;
  /** The id of the response that produced this item, when applicable. */
  readonly response_id?: string;
}

export function voiceAgentSystemToolItemSerializer(item: VoiceAgentSystemToolItem): any {
  return {
    type: item["type"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    name: item["name"],
    call_id: item["call_id"],
    arguments: item["arguments"],
  };
}

export function voiceAgentSystemToolItemDeserializer(item: any): VoiceAgentSystemToolItem {
  return {
    type: item["type"],
    id: item["id"],
    object: item["object"],
    status: item["status"],
    name: item["name"],
    call_id: item["call_id"],
    arguments: item["arguments"],
    created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),
    response_id: item["response_id"],
  };
}

/** The generation status of a system-tool item. It does not indicate provider success. */
export type VoiceAgentSystemToolItemStatus = "in_progress" | "completed" | "incomplete";

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
export interface VoiceAudioItem {
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

export function voiceAudioItemDeserializer(item: any): VoiceAudioItem {
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
 * Metadata for a conversation item's generated audio. For bring-your-own-storage (BYOS), the response includes
 * `blob_uri`, a direct customer-storage URI without a SAS token, that the customer accesses with their own
 * credentials. For Foundry-managed storage, `blob_uri` is absent and the bytes are streamed through the item's
 * `/audio/generated/content` route.
 */
export interface VoiceGeneratedAudioItem {
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
  /** For bring-your-own-storage (BYOS) recordings only: the URI of the generated audio in the customer's own storage, without a SAS token. The customer downloads it using their own storage credentials. Absent for Foundry-managed storage, where the bytes are streamed via the item's `/audio/generated/content` route instead. */
  blob_uri?: string;
}

export function voiceGeneratedAudioItemDeserializer(item: any): VoiceGeneratedAudioItem {
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

/**
 * Metadata for the merged, whole-call stereo recording of a voice conversation (user audio on the left channel,
 * agent audio on the right). Built once from the per-turn segments after the session ends and durably cached.
 * The common metadata (format, sample rate, channels, channel layout, duration) is returned for both
 * Foundry-managed and bring-your-own-storage (BYOS) recordings. For BYOS the response also includes `blob_uri`,
 * the URI of the recording in the customer's own storage (no SAS token), which the customer downloads using their
 * own storage credentials. For Foundry-managed storage `blob_uri` is absent and the bytes are streamed via the
 * `/audio/content` route instead.
 */
export interface VoiceRecording {
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

export function voiceRecordingDeserializer(item: any): VoiceRecording {
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

/** A telephony binding owned by a voice agent. */
export interface TelephonyBinding {
  /** The service-generated binding identifier. */
  readonly id: string;
  /** The telephony provider. */
  /** The discriminator possible values: teams_phone_extensibility, twilio, sip */
  provider: TelephonyProvider;
  /** The Foundry connection name for the telephony provider. */
  connection_name: string;
  /** The optional display label for the binding. */
  label?: string;
  /** The service-generated incoming address: an HTTPS webhook for webhook-based providers or a SIP/SIPS ingress URI for SIP. */
  readonly incoming_call_url: string;
}

export function telephonyBindingSerializer(item: TelephonyBinding): any {
  return {
    provider: item["provider"],
    connection_name: item["connection_name"],
    label: item["label"],
  };
}

export function telephonyBindingDeserializer(item: any): TelephonyBinding {
  return {
    id: item["id"],
    provider: item["provider"],
    connection_name: item["connection_name"],
    label: item["label"],
    incoming_call_url: item["incoming_call_url"],
  };
}

/** Alias for TelephonyBindingUnion */
export type TelephonyBindingUnion =
  | TeamsPhoneExtensibilityTelephonyBinding
  | TwilioTelephonyBinding
  | SipTelephonyBinding
  | TelephonyBinding;

export function telephonyBindingUnionSerializer(item: TelephonyBindingUnion): any {
  switch (item.provider) {
    case "teams_phone_extensibility":
      return teamsPhoneExtensibilityTelephonyBindingSerializer(
        item as TeamsPhoneExtensibilityTelephonyBinding,
      );

    case "twilio":
      return twilioTelephonyBindingSerializer(item as TwilioTelephonyBinding);

    case "sip":
      return sipTelephonyBindingSerializer(item as SipTelephonyBinding);

    default:
      return telephonyBindingSerializer(item);
  }
}

export function telephonyBindingUnionDeserializer(item: any): TelephonyBindingUnion {
  switch (item["provider"]) {
    case "teams_phone_extensibility":
      return teamsPhoneExtensibilityTelephonyBindingDeserializer(
        item as TeamsPhoneExtensibilityTelephonyBinding,
      );

    case "twilio":
      return twilioTelephonyBindingDeserializer(item as TwilioTelephonyBinding);

    case "sip":
      return sipTelephonyBindingDeserializer(item as SipTelephonyBinding);

    default:
      return telephonyBindingDeserializer(item);
  }
}

/** A telephony provider supported by an agent binding. Known values are stable; additional values may be added over time. */
export type TelephonyProvider = "teams_phone_extensibility" | "twilio" | "sip";

/** A Microsoft Teams Phone extensibility binding owned by a voice agent. */
export interface TeamsPhoneExtensibilityTelephonyBinding extends TelephonyBinding {
  /** The Microsoft Teams Phone extensibility provider. */
  provider: "teams_phone_extensibility";
  /** The optional display phone number for the Teams resource account. */
  phone_number?: string;
  /** The Microsoft Teams resource-account object identifier as a GUID. */
  resource_account_object_id: string;
}

export function teamsPhoneExtensibilityTelephonyBindingSerializer(
  item: TeamsPhoneExtensibilityTelephonyBinding,
): any {
  return {
    provider: item["provider"],
    connection_name: item["connection_name"],
    label: item["label"],
    phone_number: item["phone_number"],
    resource_account_object_id: item["resource_account_object_id"],
  };
}

export function teamsPhoneExtensibilityTelephonyBindingDeserializer(
  item: any,
): TeamsPhoneExtensibilityTelephonyBinding {
  return {
    id: item["id"],
    provider: item["provider"],
    connection_name: item["connection_name"],
    label: item["label"],
    incoming_call_url: item["incoming_call_url"],
    phone_number: item["phone_number"],
    resource_account_object_id: item["resource_account_object_id"],
  };
}

/** A Twilio binding owned by a voice agent. */
export interface TwilioTelephonyBinding extends TelephonyBinding {
  /** The Twilio provider. */
  provider: "twilio";
  /** The Twilio E.164 phone number. */
  phone_number: string;
}

export function twilioTelephonyBindingSerializer(item: TwilioTelephonyBinding): any {
  return {
    provider: item["provider"],
    connection_name: item["connection_name"],
    label: item["label"],
    phone_number: item["phone_number"],
  };
}

export function twilioTelephonyBindingDeserializer(item: any): TwilioTelephonyBinding {
  return {
    id: item["id"],
    provider: item["provider"],
    connection_name: item["connection_name"],
    label: item["label"],
    incoming_call_url: item["incoming_call_url"],
    phone_number: item["phone_number"],
  };
}

/** Inbound binding using a same-project SipInbound connection for authentication/network restrictions. Creation does not prove regional runtime readiness. */
export interface SipTelephonyBinding extends TelephonyBinding {
  /** The SIP provider. */
  provider: "sip";
  /** Optional display metadata, not a routing key or E.164-constrained destination. */
  phone_number?: string;
  /** Exact E.164 caller numbers or restricted anchored patterns, validated by the service. Omit or use [] for no restriction. */
  allowed_calling_numbers?: string[];
}

export function sipTelephonyBindingSerializer(item: SipTelephonyBinding): any {
  return {
    provider: item["provider"],
    connection_name: item["connection_name"],
    label: item["label"],
    phone_number: item["phone_number"],
    allowed_calling_numbers: !item["allowed_calling_numbers"]
      ? item["allowed_calling_numbers"]
      : item["allowed_calling_numbers"].map((p: any) => {
          return p;
        }),
  };
}

export function sipTelephonyBindingDeserializer(item: any): SipTelephonyBinding {
  return {
    id: item["id"],
    provider: item["provider"],
    connection_name: item["connection_name"],
    label: item["label"],
    incoming_call_url: item["incoming_call_url"],
    phone_number: item["phone_number"],
    allowed_calling_numbers: !item["allowed_calling_numbers"]
      ? item["allowed_calling_numbers"]
      : item["allowed_calling_numbers"].map((p: any) => {
          return p;
        }),
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultTelephonyBindingListItem {
  /** The requested list of items. */
  data: TelephonyBindingListItemUnion[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultTelephonyBindingListItemDeserializer(
  item: any,
): _AgentsPagedResultTelephonyBindingListItem {
  return {
    data: telephonyBindingListItemUnionArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function telephonyBindingListItemUnionArrayDeserializer(
  result: Array<TelephonyBindingListItemUnion>,
): any[] {
  return result.map((item) => {
    return telephonyBindingListItemUnionDeserializer(item);
  });
}

/** A telephony binding returned in a list, including its entity tag. */
export interface TelephonyBindingListItem {
  /** The service-generated binding identifier. */
  id: string;
  /** The telephony provider. */
  /** The discriminator possible values: teams_phone_extensibility, twilio, sip */
  provider: TelephonyProvider;
  /** The Foundry connection name for the telephony provider. */
  connection_name: string;
  /** The optional display label for the binding. */
  label?: string;
  /** The service-generated HTTPS webhook or SIP/SIPS ingress URI to configure with the telephony provider. */
  incoming_call_url: string;
  /** The entity tag to send in the `If-Match` header when updating or deleting this binding. */
  readonly etag: string;
}

export function telephonyBindingListItemDeserializer(item: any): TelephonyBindingListItem {
  return {
    id: item["id"],
    provider: item["provider"],
    connection_name: item["connection_name"],
    label: item["label"],
    incoming_call_url: item["incoming_call_url"],
    etag: item["etag"],
  };
}

/** Alias for TelephonyBindingListItemUnion */
export type TelephonyBindingListItemUnion =
  | TeamsPhoneExtensibilityTelephonyBindingListItem
  | TwilioTelephonyBindingListItem
  | SipTelephonyBindingListItem
  | TelephonyBindingListItem;

export function telephonyBindingListItemUnionDeserializer(
  item: any,
): TelephonyBindingListItemUnion {
  switch (item["provider"]) {
    case "teams_phone_extensibility":
      return teamsPhoneExtensibilityTelephonyBindingListItemDeserializer(
        item as TeamsPhoneExtensibilityTelephonyBindingListItem,
      );

    case "twilio":
      return twilioTelephonyBindingListItemDeserializer(item as TwilioTelephonyBindingListItem);

    case "sip":
      return sipTelephonyBindingListItemDeserializer(item as SipTelephonyBindingListItem);

    default:
      return telephonyBindingListItemDeserializer(item);
  }
}

/** A Microsoft Teams Phone extensibility binding returned in a list, including its entity tag. */
export interface TeamsPhoneExtensibilityTelephonyBindingListItem extends TelephonyBindingListItem {
  /** The Microsoft Teams Phone extensibility provider. */
  provider: "teams_phone_extensibility";
  /** The optional display phone number for the Teams resource account. */
  phone_number?: string;
  /** The Microsoft Teams resource-account object identifier as a GUID. */
  resource_account_object_id: string;
}

export function teamsPhoneExtensibilityTelephonyBindingListItemDeserializer(
  item: any,
): TeamsPhoneExtensibilityTelephonyBindingListItem {
  return {
    id: item["id"],
    provider: item["provider"],
    connection_name: item["connection_name"],
    label: item["label"],
    incoming_call_url: item["incoming_call_url"],
    etag: item["etag"],
    phone_number: item["phone_number"],
    resource_account_object_id: item["resource_account_object_id"],
  };
}

/** A Twilio binding returned in a list, including its entity tag. */
export interface TwilioTelephonyBindingListItem extends TelephonyBindingListItem {
  /** The Twilio provider. */
  provider: "twilio";
  /** The Twilio E.164 phone number. */
  phone_number: string;
}

export function twilioTelephonyBindingListItemDeserializer(
  item: any,
): TwilioTelephonyBindingListItem {
  return {
    id: item["id"],
    provider: item["provider"],
    connection_name: item["connection_name"],
    label: item["label"],
    incoming_call_url: item["incoming_call_url"],
    etag: item["etag"],
    phone_number: item["phone_number"],
  };
}

/** An inbound SIP binding returned in a list, including its current entity tag. */
export interface SipTelephonyBindingListItem extends TelephonyBindingListItem {
  /** The SIP provider. */
  provider: "sip";
  /** Optional display phone metadata, not a routing key. */
  phone_number?: string;
  /** Current exact E.164 caller numbers or restricted fully anchored patterns. */
  allowed_calling_numbers?: string[];
}

export function sipTelephonyBindingListItemDeserializer(item: any): SipTelephonyBindingListItem {
  return {
    id: item["id"],
    provider: item["provider"],
    connection_name: item["connection_name"],
    label: item["label"],
    incoming_call_url: item["incoming_call_url"],
    etag: item["etag"],
    phone_number: item["phone_number"],
    allowed_calling_numbers: !item["allowed_calling_numbers"]
      ? item["allowed_calling_numbers"]
      : item["allowed_calling_numbers"].map((p: any) => {
          return p;
        }),
  };
}

/** The request to update an existing telephony binding. Every property is optional and the binding's provider is immutable. */
export interface UpdateTelephonyBindingRequest {
  /** Replacement label: omit to preserve, null/blank to clear. Trimmed before length validation. */
  label?: string;
  /** Replacement same-project connection for Teams or SIP (SipInbound only); immutable for Twilio. Null/blank names are invalid. */
  connection_name?: string;
  /** Teams/SIP display number, not SIP routing. Omit to preserve; null/empty/blank clears. Unsupported for Twilio. */
  phone_number?: string;
  /** SIP caller restrictions: omit to preserve, [] to clear; null is invalid. Network restrictions belong to the connection. */
  allowed_calling_numbers?: string[];
}

export function updateTelephonyBindingRequestSerializer(item: UpdateTelephonyBindingRequest): any {
  return {
    label: item["label"],
    connection_name: item["connection_name"],
    phone_number: item["phone_number"],
    allowed_calling_numbers: !item["allowed_calling_numbers"]
      ? item["allowed_calling_numbers"]
      : item["allowed_calling_numbers"].map((p: any) => {
          return p;
        }),
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultTelephonyCallSummary {
  /** The requested list of items. */
  data: TelephonyCallSummary[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultTelephonyCallSummaryDeserializer(
  item: any,
): _AgentsPagedResultTelephonyCallSummary {
  return {
    data: telephonyCallSummaryArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function telephonyCallSummaryArrayDeserializer(result: Array<TelephonyCallSummary>): any[] {
  return result.map((item) => {
    return telephonyCallSummaryDeserializer(item);
  });
}

/** A summary of a durable inbound call to a voice agent. */
export interface TelephonyCallSummary {
  /** The service-generated call identifier. */
  id: string;
  /** The telephony provider. */
  provider: TelephonyProvider;
  /** The provider-assigned call identifier, when available. */
  provider_call_id?: string;
  /** The caller's phone number, when supplied by the provider. */
  caller_number?: string;
  /** The Teams Phone extensibility or Twilio number that received the call. */
  provider_number?: string;
  /** The lifecycle status of the call. */
  status: TelephonyCallStatus;
  /** The provider-neutral lifecycle phase reached by the call. */
  phase: TelephonyCallPhase;
  /** The Unix timestamp (in seconds) for when the inbound webhook was received. */
  started_at: Date;
  /** The Unix timestamp (in seconds) for when the provider reported the call as answered. */
  answered_at?: Date;
  /** The Unix timestamp (in seconds) for when the provider media channel connected. */
  media_connected_at?: Date;
  /** The Unix timestamp (in seconds) for when the voice-agent session became ready. */
  agent_session_ready_at?: Date;
  /** The Unix timestamp (in seconds) for when the call ended. */
  ended_at?: Date;
  /** The call duration. */
  duration_ms?: number;
  /** The service-generated reason that this single call ended, rather than the outcome of an overall outbound call job. Additional string codes may be returned. */
  end_reason?: TelephonyCallEndReason;
  /** The provider status code associated with the terminal result. */
  provider_status_code?: number;
  /** The provider subcode associated with the terminal result. */
  provider_sub_code?: number;
  /** The provider message associated with the terminal result. */
  provider_message?: string;
}

export function telephonyCallSummaryDeserializer(item: any): TelephonyCallSummary {
  return {
    id: item["id"],
    provider: item["provider"],
    provider_call_id: item["provider_call_id"],
    caller_number: item["caller_number"],
    provider_number: item["provider_number"],
    status: item["status"],
    phase: item["phase"],
    started_at: new Date(item["started_at"] * 1000),
    answered_at: !item["answered_at"] ? item["answered_at"] : new Date(item["answered_at"] * 1000),
    media_connected_at: !item["media_connected_at"]
      ? item["media_connected_at"]
      : new Date(item["media_connected_at"] * 1000),
    agent_session_ready_at: !item["agent_session_ready_at"]
      ? item["agent_session_ready_at"]
      : new Date(item["agent_session_ready_at"] * 1000),
    ended_at: !item["ended_at"] ? item["ended_at"] : new Date(item["ended_at"] * 1000),
    duration_ms: item["duration_ms"],
    end_reason: item["end_reason"],
    provider_status_code: item["provider_status_code"],
    provider_sub_code: item["provider_sub_code"],
    provider_message: item["provider_message"],
  };
}

/** The lifecycle status of an inbound telephony call. */
export type TelephonyCallStatus = "in_progress" | "success" | "failed";

/** The provider-neutral phase reached by an inbound telephony call. */
export type TelephonyCallPhase =
  | "received"
  | "validated"
  | "admitted"
  | "answering"
  | "answered"
  | "media_connected"
  | "agent_session_ready"
  | "bridging"
  | "managing"
  | "completed"
  | "rejected"
  | "failed";

/** Known service-generated reasons that one telephony call ended, rather than reasons for an overall outbound call job. Additional string codes may be returned. */
export type TelephonyCallEndReason =
  | "invalid_webhook_payload"
  | "webhook_validation_failed"
  | "binding_not_found"
  | "binding_suspended"
  | "admission_rejected"
  | "admission_check_failed"
  | "route_agent_mismatch"
  | "invalid_binding_configuration"
  | "credential_resolution_failed"
  | "provider_resource_mismatch"
  | "endpoint_resolution_failed"
  | "ingress_setup_failed"
  | "live_call_conflict"
  | "live_call_persistence_failed"
  | "answer_failed"
  | "provider_disconnected"
  | "provider_busy"
  | "provider_no_answer"
  | "provider_cancelled"
  | "provider_failed"
  | "provider_stream_error"
  | "provider_stream_stopped"
  | "agent_session_connect_failed"
  | "media_stream_ended"
  | "bridge_cancelled"
  | "bridge_failed"
  | "managed_hangup"
  | "managed_transfer"
  | "manage_hangup_failed"
  | "manage_transfer_failed";

/** Detailed diagnostics for a durable inbound call to a voice agent. */
export interface TelephonyCallRecord {
  /** The service-generated call identifier. */
  id: string;
  /** The telephony provider. */
  provider: TelephonyProvider;
  /** The provider-assigned call identifier, when available. */
  provider_call_id?: string;
  /** The caller's phone number, when supplied by the provider. */
  caller_number?: string;
  /** The Teams Phone extensibility or Twilio number that received the call. */
  provider_number?: string;
  /** The lifecycle status of the call. */
  status: TelephonyCallStatus;
  /** The provider-neutral lifecycle phase reached by the call. */
  phase: TelephonyCallPhase;
  /** The Unix timestamp (in seconds) for when the inbound webhook was received. */
  started_at: Date;
  /** The Unix timestamp (in seconds) for when the provider reported the call as answered. */
  answered_at?: Date;
  /** The Unix timestamp (in seconds) for when the provider media channel connected. */
  media_connected_at?: Date;
  /** The Unix timestamp (in seconds) for when the voice-agent session became ready. */
  agent_session_ready_at?: Date;
  /** The Unix timestamp (in seconds) for when the call ended. */
  ended_at?: Date;
  /** The call duration. */
  duration_ms?: number;
  /** The service-generated reason that this single call ended, rather than the outcome of an overall outbound call job. Additional string codes may be returned. */
  end_reason?: TelephonyCallEndReason;
  /** The provider status code associated with the terminal result. */
  provider_status_code?: number;
  /** The provider subcode associated with the terminal result. */
  provider_sub_code?: number;
  /** The provider message associated with the terminal result. */
  provider_message?: string;
  /** Detailed provider-neutral call timing. */
  timing: TelephonyCallTiming;
  /** Correlation to the customer-facing Foundry trace. */
  trace?: TelephonyCallTrace;
  /** The lifecycle timeline. */
  events: TelephonyCallLifecycleEvent[];
  /** Whether older lifecycle events were omitted from the timeline. */
  events_truncated: boolean;
}

export function telephonyCallRecordDeserializer(item: any): TelephonyCallRecord {
  return {
    id: item["id"],
    provider: item["provider"],
    provider_call_id: item["provider_call_id"],
    caller_number: item["caller_number"],
    provider_number: item["provider_number"],
    status: item["status"],
    phase: item["phase"],
    started_at: new Date(item["started_at"] * 1000),
    answered_at: !item["answered_at"] ? item["answered_at"] : new Date(item["answered_at"] * 1000),
    media_connected_at: !item["media_connected_at"]
      ? item["media_connected_at"]
      : new Date(item["media_connected_at"] * 1000),
    agent_session_ready_at: !item["agent_session_ready_at"]
      ? item["agent_session_ready_at"]
      : new Date(item["agent_session_ready_at"] * 1000),
    ended_at: !item["ended_at"] ? item["ended_at"] : new Date(item["ended_at"] * 1000),
    duration_ms: item["duration_ms"],
    end_reason: item["end_reason"],
    provider_status_code: item["provider_status_code"],
    provider_sub_code: item["provider_sub_code"],
    provider_message: item["provider_message"],
    timing: telephonyCallTimingDeserializer(item["timing"]),
    trace: !item["trace"] ? item["trace"] : telephonyCallTraceDeserializer(item["trace"]),
    events: telephonyCallLifecycleEventArrayDeserializer(item["events"]),
    events_truncated: item["events_truncated"],
  };
}

/** Detailed provider-neutral timing for an inbound telephony call. */
export interface TelephonyCallTiming {
  /** The Unix timestamp (in seconds) for when the provider webhook was received. */
  received_at?: Date;
  /** The Unix timestamp (in seconds) for when webhook validation completed. */
  validated_at?: Date;
  /** The Unix timestamp (in seconds) for when the call was admitted to an agent binding. */
  admitted_at?: Date;
  /** The Unix timestamp (in seconds) for when the service requested that the provider answer the call. */
  answer_requested_at?: Date;
  /** The Unix timestamp (in seconds) for when the provider reported that the call was answered. */
  answered_at?: Date;
  /** The Unix timestamp (in seconds) for when the provider media channel connected. */
  media_connected_at?: Date;
  /** The Unix timestamp (in seconds) for when the voice-agent session became ready. */
  agent_session_ready_at?: Date;
  /** The Unix timestamp (in seconds) for when caller audio was first observed. */
  first_caller_audio_at?: Date;
  /** The Unix timestamp (in seconds) for when agent audio was first observed. */
  first_agent_audio_at?: Date;
  /** The Unix timestamp (in seconds) for when the call reached a terminal state. */
  ended_at?: Date;
  /** The timestamp used as the basis for duration. */
  duration_basis?: TelephonyCallDurationBasis;
  /** The primary source of the timing milestones. Individual lifecycle events identify their own timestamp source separately. */
  timestamp_source: TelephonyCallTimestampSource;
}

export function telephonyCallTimingDeserializer(item: any): TelephonyCallTiming {
  return {
    received_at: !item["received_at"] ? item["received_at"] : new Date(item["received_at"] * 1000),
    validated_at: !item["validated_at"]
      ? item["validated_at"]
      : new Date(item["validated_at"] * 1000),
    admitted_at: !item["admitted_at"] ? item["admitted_at"] : new Date(item["admitted_at"] * 1000),
    answer_requested_at: !item["answer_requested_at"]
      ? item["answer_requested_at"]
      : new Date(item["answer_requested_at"] * 1000),
    answered_at: !item["answered_at"] ? item["answered_at"] : new Date(item["answered_at"] * 1000),
    media_connected_at: !item["media_connected_at"]
      ? item["media_connected_at"]
      : new Date(item["media_connected_at"] * 1000),
    agent_session_ready_at: !item["agent_session_ready_at"]
      ? item["agent_session_ready_at"]
      : new Date(item["agent_session_ready_at"] * 1000),
    first_caller_audio_at: !item["first_caller_audio_at"]
      ? item["first_caller_audio_at"]
      : new Date(item["first_caller_audio_at"] * 1000),
    first_agent_audio_at: !item["first_agent_audio_at"]
      ? item["first_agent_audio_at"]
      : new Date(item["first_agent_audio_at"] * 1000),
    ended_at: !item["ended_at"] ? item["ended_at"] : new Date(item["ended_at"] * 1000),
    duration_basis: item["duration_basis"],
    timestamp_source: item["timestamp_source"],
  };
}

/** The timestamp used as the basis for call duration. */
export type TelephonyCallDurationBasis = "answered" | "received";

/** The source of a telephony lifecycle timestamp. */
export type TelephonyCallTimestampSource = "provider" | "gateway" | "derived";

/** Correlation from a durable telephony call record to its customer-facing Foundry trace. */
export interface TelephonyCallTrace {
  /** The trace availability status. */
  status: TelephonyCallTraceStatus;
  /** The W3C trace identifier, when a trace was recorded. */
  trace_id?: string;
  /** The root span identifier, when a trace was recorded. */
  root_span_id?: string;
  /** The voice-agent conversation identifier, when a conversation was created. */
  conversation_id?: string;
  /** Whether the trace was emitted live or after the call ended. */
  mode?: TelephonyCallTraceMode;
}

export function telephonyCallTraceDeserializer(item: any): TelephonyCallTrace {
  return {
    status: item["status"],
    trace_id: item["trace_id"],
    root_span_id: item["root_span_id"],
    conversation_id: item["conversation_id"],
    mode: item["mode"],
  };
}

/** The availability status of a customer-facing telephony call trace. */
export type TelephonyCallTraceStatus =
  "pending" | "emitting" | "available" | "not_recorded" | "not_applicable" | "failed";

/** The mode used to expose a telephony call as a customer-facing Foundry trace. */
export type TelephonyCallTraceMode = "live" | "post_call";

export function telephonyCallLifecycleEventArrayDeserializer(
  result: Array<TelephonyCallLifecycleEvent>,
): any[] {
  return result.map((item) => {
    return telephonyCallLifecycleEventDeserializer(item);
  });
}

/** A bounded durable observation in the lifecycle of one telephony call. */
export interface TelephonyCallLifecycleEvent {
  /** The service-assigned order of the event within the call record. */
  readonly sequence: number;
  /** The stable provider-neutral event name. */
  name: TelephonyCallLifecycleEventName;
  /** The component that supplied the observation. */
  source: TelephonyCallLifecycleEventSource;
  /** The outcome of the observed lifecycle operation. */
  outcome: TelephonyCallLifecycleEventOutcome;
  /** The Unix timestamp (in seconds) for when the service observed the event. */
  observed_at: Date;
  /** The Unix timestamp (in seconds) for when the event occurred according to the provider. */
  occurred_at?: Date;
  /** The source of the event timestamp. */
  timestamp_source: TelephonyCallTimestampSource;
  /** A stable service-generated reason associated with this lifecycle event, not necessarily the final outcome of the call. Additional string codes may be returned. */
  reason?: TelephonyCallLifecycleEventReason;
  /** The provider event identifier used for idempotency, when supplied. */
  provider_event_id?: string;
  /** The provider event sequence, when supplied. */
  provider_sequence?: number;
  /** The provider status code associated with the event. */
  provider_status_code?: number;
  /** The provider subcode associated with the event. */
  provider_sub_code?: number;
}

export function telephonyCallLifecycleEventDeserializer(item: any): TelephonyCallLifecycleEvent {
  return {
    sequence: item["sequence"],
    name: item["name"],
    source: item["source"],
    outcome: item["outcome"],
    observed_at: new Date(item["observed_at"] * 1000),
    occurred_at: !item["occurred_at"] ? item["occurred_at"] : new Date(item["occurred_at"] * 1000),
    timestamp_source: item["timestamp_source"],
    reason: item["reason"],
    provider_event_id: item["provider_event_id"],
    provider_sequence: item["provider_sequence"],
    provider_status_code: item["provider_status_code"],
    provider_sub_code: item["provider_sub_code"],
  };
}

/** A provider-neutral lifecycle event name. Known values are stable; additional values may be added over time. */
export type TelephonyCallLifecycleEventName =
  | "telephony.webhook.received"
  | "telephony.webhook.validation"
  | "telephony.binding.resolve"
  | "telephony.provider.answer"
  | "telephony.media.connect"
  | "telephony.agent_session.connect"
  | "telephony.media.first_caller_audio"
  | "telephony.media.first_agent_audio"
  | "telephony.call.transfer"
  | "telephony.call.hangup"
  | "telephony.call.disconnect";

/** The component that supplied a telephony lifecycle observation. */
export type TelephonyCallLifecycleEventSource =
  "gateway" | "teams_phone_extensibility" | "twilio" | "voice_agent";

/** The outcome of one telephony lifecycle observation. */
export type TelephonyCallLifecycleEventOutcome =
  "observed" | "started" | "succeeded" | "failed" | "rejected" | "cancelled";

/** Known service-generated reasons for a telephony lifecycle event. An event reason does not necessarily describe the final outcome of the call. Additional string codes may be returned. */
export type TelephonyCallLifecycleEventReason =
  | "invalid_webhook_payload"
  | "webhook_validation_failed"
  | "binding_not_found"
  | "binding_suspended"
  | "admission_rejected"
  | "admission_check_failed"
  | "route_agent_mismatch"
  | "invalid_binding_configuration"
  | "credential_resolution_failed"
  | "provider_resource_mismatch"
  | "endpoint_resolution_failed"
  | "ingress_setup_failed"
  | "live_call_conflict"
  | "live_call_persistence_failed"
  | "answer_failed"
  | "provider_disconnected"
  | "provider_busy"
  | "provider_no_answer"
  | "provider_cancelled"
  | "provider_failed"
  | "provider_stream_error"
  | "provider_stream_stopped"
  | "agent_session_connect_failed"
  | "media_stream_ended"
  | "bridge_cancelled"
  | "bridge_failed"
  | "managed_hangup"
  | "managed_transfer"
  | "manage_hangup_failed"
  | "manage_transfer_failed";

/** The telephony transfer targets configured for one voice agent. */
export interface TelephonyTransferTargets {
  /** The complete set of destinations to which the voice agent may transfer calls. An empty array clears all targets when replacing the configuration. */
  transfer_targets: TelephonyTransferTarget[];
}

export function telephonyTransferTargetsDeserializer(item: any): TelephonyTransferTargets {
  return {
    transfer_targets: telephonyTransferTargetArrayDeserializer(item["transfer_targets"]),
  };
}

export function telephonyTransferTargetArraySerializer(
  result: Array<TelephonyTransferTarget>,
): any[] {
  return result.map((item) => {
    return telephonyTransferTargetSerializer(item);
  });
}

export function telephonyTransferTargetArrayDeserializer(
  result: Array<TelephonyTransferTarget>,
): any[] {
  return result.map((item) => {
    return telephonyTransferTargetDeserializer(item);
  });
}

/** A named destination to which the voice agent may transfer a call. */
export interface TelephonyTransferTarget {
  /** The unique name exposed to the voice agent for this transfer target. */
  name: string;
  /** A description that helps the voice agent decide when to use this target. */
  description: string;
  /** The shared typed address to transfer to. The selected provider validates supported destination types. */
  destination: TelephonyAddressUnion;
}

export function telephonyTransferTargetSerializer(item: TelephonyTransferTarget): any {
  return {
    name: item["name"],
    description: item["description"],
    destination: telephonyAddressUnionSerializer(item["destination"]),
  };
}

export function telephonyTransferTargetDeserializer(item: any): TelephonyTransferTarget {
  return {
    name: item["name"],
    description: item["description"],
    destination: telephonyAddressUnionDeserializer(item["destination"]),
  };
}

/** Shared source, recipient and transfer address. Connections validate each role before dialing; unsupported types fail. New types may be added. */
export interface TelephonyAddress {
  /** Endpoint address type. */
  /** The discriminator possible values: phone_number, teams, sip */
  type: TelephonyAddressType;
  /** Concrete address value. Known variants apply their format constraints; unknown variants are rejected before dialing. */
  value: string;
}

export function telephonyAddressSerializer(item: TelephonyAddress): any {
  return { type: item["type"], value: item["value"] };
}

export function telephonyAddressDeserializer(item: any): TelephonyAddress {
  return {
    type: item["type"],
    value: item["value"],
  };
}

/** Alias for TelephonyAddressUnion */
export type TelephonyAddressUnion = PhoneNumber | TeamsAddress | SipAddress | TelephonyAddress;

export function telephonyAddressUnionSerializer(item: TelephonyAddressUnion): any {
  switch (item.type) {
    case "phone_number":
      return phoneNumberSerializer(item as PhoneNumber);

    case "teams":
      return teamsAddressSerializer(item as TeamsAddress);

    case "sip":
      return sipAddressSerializer(item as SipAddress);

    default:
      return telephonyAddressSerializer(item);
  }
}

export function telephonyAddressUnionDeserializer(item: any): TelephonyAddressUnion {
  switch (item["type"]) {
    case "phone_number":
      return phoneNumberDeserializer(item as PhoneNumber);

    case "teams":
      return teamsAddressDeserializer(item as TeamsAddress);

    case "sip":
      return sipAddressDeserializer(item as SipAddress);

    default:
      return telephonyAddressDeserializer(item);
  }
}

/** Extensible endpoint address kinds. Address type describes the endpoint independently of the provider. */
export type TelephonyAddressType = "phone_number" | "teams" | "sip";

/** Phone-number address used by supported source and destination roles. */
export interface PhoneNumber extends TelephonyAddress {
  /** The phone-number address type. */
  type: "phone_number";
  /** E.164 phone number. */
  value: string;
}

export function phoneNumberSerializer(item: PhoneNumber): any {
  return { type: item["type"], value: item["value"] };
}

export function phoneNumberDeserializer(item: any): PhoneNumber {
  return {
    type: item["type"],
    value: item["value"],
  };
}

/** Teams source/transfer identity, validated by role and provider. Not supported for outbound recipients. */
export interface TeamsAddress extends TelephonyAddress {
  /** The Microsoft Teams address type. */
  type: "teams";
  /** Source: nonempty resource-account GUID. Transfer: user/resource-account GUID or 28:orgid:{guid}. */
  value: string;
}

export function teamsAddressSerializer(item: TeamsAddress): any {
  return { type: item["type"], value: item["value"] };
}

export function teamsAddressDeserializer(item: any): TeamsAddress {
  return {
    type: item["type"],
    value: item["value"],
  };
}

/** SIP/SIPS transfer address, subject to provider validation. SIP outbound sources and recipients use phone_number, not SIP URIs. */
export interface SipAddress extends TelephonyAddress {
  /** The SIP address type. */
  type: "sip";
  /** The SIP or SIPS URI to call. */
  value: string;
}

export function sipAddressSerializer(item: SipAddress): any {
  return { type: item["type"], value: item["value"] };
}

export function sipAddressDeserializer(item: any): SipAddress {
  return {
    type: item["type"],
    value: item["value"],
  };
}

/** The direct outbound call to create. */
export interface TelephonyCallJobCreate {
  /** The phone destination to call. */
  destination: TelephonyAddressUnion;
  /** Same-project Twilio, ACS/Teams Phone extensibility or SipOutbound connection; no inbound binding needed. SIP requires CustomKeys and a DNS target, revalidated before dialing, not a connectivity guarantee. */
  connection_name: string;
  /** An optional customer-declared purpose for placing the call. */
  purpose?: string;
  /** Agent/greeting inputs, including nested JSON and null. Agent schemas, required fields and defaults apply. */
  structured_inputs?: Record<string, any>;
  /** The optional execution window. */
  schedule?: TelephonyCallJobSchedule;
  /** Frozen retry policy. Omission at creation returns fixed_interval with max_attempts=1 and interval=0 seconds: one initial attempt, no retry. */
  retry_policy?: TelephonyOutboundRetryPolicyUnion;
  /** Caller identity: phone_number for Twilio/SIP, or a teams resource-account GUID for ACS/Teams Phone extensibility. No sip source URI. */
  source: TelephonyAddressUnion;
}

export function telephonyCallJobCreateSerializer(item: TelephonyCallJobCreate): any {
  return {
    destination: telephonyAddressUnionSerializer(item["destination"]),
    connection_name: item["connection_name"],
    purpose: item["purpose"],
    structured_inputs: item["structured_inputs"],
    schedule: !item["schedule"]
      ? item["schedule"]
      : telephonyCallJobScheduleSerializer(item["schedule"]),
    retry_policy: !item["retry_policy"]
      ? item["retry_policy"]
      : telephonyOutboundRetryPolicyUnionSerializer(item["retry_policy"]),
    source: telephonyAddressUnionSerializer(item["source"]),
  };
}

/** The optional execution window for a direct outbound call. */
export interface TelephonyCallJobSchedule {
  /** The earliest instant at which dispatch may begin. */
  not_before?: Date;
  /** The instant after which the call job expires without dispatch. */
  expires_at?: Date;
}

export function telephonyCallJobScheduleSerializer(item: TelephonyCallJobSchedule): any {
  return {
    not_before: !item["not_before"]
      ? item["not_before"]
      : (item["not_before"].getTime() / 1000) | 0,
    expires_at: !item["expires_at"]
      ? item["expires_at"]
      : (item["expires_at"].getTime() / 1000) | 0,
  };
}

export function telephonyCallJobScheduleDeserializer(item: any): TelephonyCallJobSchedule {
  return {
    not_before: !item["not_before"] ? item["not_before"] : new Date(item["not_before"] * 1000),
    expires_at: !item["expires_at"] ? item["expires_at"] : new Date(item["expires_at"] * 1000),
  };
}

/** The retry policy for one durable outbound call intent. `max_attempts` includes the first attempt. Strategy-specific settings are defined by the derived policy. */
export interface TelephonyOutboundRetryPolicy {
  /** The retry strategy. Only fixed-interval retries are currently supported. */
  /** The discriminator possible values: fixed_interval */
  type: TelephonyOutboundRetryPolicyType;
  /** The maximum number of provider attempts, including the first attempt. Defaults to 1. */
  max_attempts?: number;
}

export function telephonyOutboundRetryPolicySerializer(item: TelephonyOutboundRetryPolicy): any {
  return { type: item["type"], max_attempts: item["max_attempts"] };
}

export function telephonyOutboundRetryPolicyDeserializer(item: any): TelephonyOutboundRetryPolicy {
  return {
    type: item["type"],
    max_attempts: item["max_attempts"],
  };
}

/** Alias for TelephonyOutboundRetryPolicyUnion */
export type TelephonyOutboundRetryPolicyUnion =
  FixedIntervalRetryPolicy | TelephonyOutboundRetryPolicy;

export function telephonyOutboundRetryPolicyUnionSerializer(
  item: TelephonyOutboundRetryPolicyUnion,
): any {
  switch (item.type) {
    case "fixed_interval":
      return fixedIntervalRetryPolicySerializer(item as FixedIntervalRetryPolicy);

    default:
      return telephonyOutboundRetryPolicySerializer(item);
  }
}

export function telephonyOutboundRetryPolicyUnionDeserializer(
  item: any,
): TelephonyOutboundRetryPolicyUnion {
  switch (item["type"]) {
    case "fixed_interval":
      return fixedIntervalRetryPolicyDeserializer(item as FixedIntervalRetryPolicy);

    default:
      return telephonyOutboundRetryPolicyDeserializer(item);
  }
}

/** The retry strategy for an outbound call. */
export type TelephonyOutboundRetryPolicyType = "fixed_interval";

/** Shared direct-call/Campaign retry policy. Omission means one attempt; CallJobs return max_attempts=1 and interval=0 seconds. */
export interface FixedIntervalRetryPolicy extends TelephonyOutboundRetryPolicy {
  /** The fixed-interval retry strategy. */
  type: "fixed_interval";
  /** The nonnegative delay between attempts, from 0 to 2147483647 seconds. Zero permits an immediate retry, subject to scheduling and capacity. */
  interval: number;
}

export function fixedIntervalRetryPolicySerializer(item: FixedIntervalRetryPolicy): any {
  return { type: item["type"], max_attempts: item["max_attempts"], interval: item["interval"] };
}

export function fixedIntervalRetryPolicyDeserializer(item: any): FixedIntervalRetryPolicy {
  return {
    type: item["type"],
    max_attempts: item["max_attempts"],
    interval: item["interval"],
  };
}

/** A durable direct or campaign-created outbound call intent. */
export interface TelephonyCallJob {
  /** The phone destination to call. */
  destination: TelephonyAddressUnion;
  /** Same-project Twilio, ACS/Teams Phone extensibility or SipOutbound connection; no inbound binding needed. SIP requires CustomKeys and a DNS target, revalidated before dialing, not a connectivity guarantee. */
  connection_name: string;
  /** An optional customer-declared purpose for placing the call. */
  purpose?: string;
  /** Agent/greeting inputs, including nested JSON and null. Agent schemas, required fields and defaults apply. */
  structured_inputs?: Record<string, any>;
  /** The optional execution window. */
  schedule?: TelephonyCallJobSchedule;
  /** The service-generated call-job identifier. */
  readonly id: string;
  /** The name of the voice agent used at execution time. */
  readonly agent_name: string;
  /** The current call-job lifecycle status. */
  readonly status: TelephonyCallJobStatus;
  /** The recorded cancellation request, when cancellation was requested. */
  readonly cancellation?: TelephonyCallJobCancellation;
  /** Frozen retry policy. Omission at creation returns fixed_interval with max_attempts=1 and interval=0 seconds: one initial attempt, no retry. */
  retry_policy: TelephonyOutboundRetryPolicyUnion;
  /** The number of provider attempts created so far. */
  readonly attempt_count: number;
  /** The Unix timestamp in seconds at which the next retry becomes eligible. */
  readonly next_attempt_at?: Date;
  /** The stable service-generated reason for the overall outbound call job, which can span multiple provider attempts, when available. Interpret this with `status`: a queued job can retain a temporary dispatch-deferral reason. Additional string codes may be returned. */
  readonly terminal_reason?: TelephonyCallJobTerminalReason;
  /** The monotonically increasing optimistic-concurrency revision. */
  readonly revision: number;
  /** The Unix timestamp in seconds when the call job was created. */
  readonly created_at: Date;
  /** The Unix timestamp in seconds when the call job was last updated. */
  readonly updated_at: Date;
  /** Caller identity: phone_number for Twilio/SIP, or a teams resource-account GUID for ACS/Teams Phone extensibility. No sip source URI. */
  source: TelephonyAddressUnion;
  /** Owning Campaign, absent for direct calls. Instance-bound despite name reuse; Campaign deletion hides then removes its jobs. */
  readonly campaign_name?: string;
}

export function telephonyCallJobDeserializer(item: any): TelephonyCallJob {
  return {
    destination: telephonyAddressUnionDeserializer(item["destination"]),
    connection_name: item["connection_name"],
    purpose: item["purpose"],
    structured_inputs: !item["structured_inputs"]
      ? item["structured_inputs"]
      : Object.fromEntries(
          Object.entries(item["structured_inputs"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    schedule: !item["schedule"]
      ? item["schedule"]
      : telephonyCallJobScheduleDeserializer(item["schedule"]),
    id: item["id"],
    agent_name: item["agent_name"],
    status: item["status"],
    cancellation: !item["cancellation"]
      ? item["cancellation"]
      : telephonyCallJobCancellationDeserializer(item["cancellation"]),
    retry_policy: telephonyOutboundRetryPolicyUnionDeserializer(item["retry_policy"]),
    attempt_count: item["attempt_count"],
    next_attempt_at: !item["next_attempt_at"]
      ? item["next_attempt_at"]
      : new Date(item["next_attempt_at"] * 1000),
    terminal_reason: item["terminal_reason"],
    revision: item["revision"],
    created_at: new Date(item["created_at"] * 1000),
    updated_at: new Date(item["updated_at"] * 1000),
    source: telephonyAddressUnionDeserializer(item["source"]),
    campaign_name: item["campaign_name"],
  };
}

/** The lifecycle status of a durable outbound call job. */
export type TelephonyCallJobStatus =
  | "accepted"
  | "waiting_for_schedule"
  | "queued"
  | "dispatching"
  | "in_progress"
  | "waiting_for_retry"
  | "cancellation_requested"
  | "completed"
  | "blocked"
  | "expired"
  | "failed"
  | "cancelled";

/** A cancellation request recorded for an outbound call job. */
export interface TelephonyCallJobCancellation {
  /** The authenticated principal that requested cancellation. */
  requested_by: string;
  /** The cancellation mode applied to the call job. */
  mode: string;
  /** The Unix timestamp in seconds when cancellation was requested. */
  requested_at: Date;
  /** The call-job revision at which cancellation was recorded. */
  revision: number;
}

export function telephonyCallJobCancellationDeserializer(item: any): TelephonyCallJobCancellation {
  return {
    requested_by: item["requested_by"],
    mode: item["mode"],
    requested_at: new Date(item["requested_at"] * 1000),
    revision: item["revision"],
  };
}

/** Known terminal reasons for an overall outbound call job, which can span multiple provider attempts. These are distinct from individual call lifecycle reasons. Additional string codes may be returned. */
export type TelephonyCallJobTerminalReason =
  | "no_answer"
  | "no_answer_timeout"
  | "answer_failed"
  | "bridge_cancelled"
  | "bridge_failed"
  | "voice_session_configuration_invalid"
  | "connection_project_mismatch"
  | "outbound_connection_changed"
  | "outbound_connection_unavailable"
  | "telephony_binding_invalid"
  | "telephony_binding_not_found"
  | "telephony_binding_inactive"
  | "telephony_binding_changed"
  | "campaign_not_found"
  | "campaign_cancelled"
  | "campaign_completed"
  | "campaign_failed"
  | "origination_fence_not_recorded"
  | "origination_reconciliation_timeout"
  | "cancellation_reconciliation_timeout"
  | "provider_callback_timeout_cancellation_reconciliation_timeout";

/** The response data for a requested list of items. */
export interface _AgentsPagedResultTelephonyCallJob {
  /** The requested list of items. */
  data: TelephonyCallJob[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultTelephonyCallJobDeserializer(
  item: any,
): _AgentsPagedResultTelephonyCallJob {
  return {
    data: telephonyCallJobArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function telephonyCallJobArrayDeserializer(result: Array<TelephonyCallJob>): any[] {
  return result.map((item) => {
    return telephonyCallJobDeserializer(item);
  });
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultVoiceAgentLiveConversation {
  /** The requested list of items. */
  data: VoiceAgentLiveConversation[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultVoiceAgentLiveConversationDeserializer(
  item: any,
): _AgentsPagedResultVoiceAgentLiveConversation {
  return {
    data: voiceAgentLiveConversationArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function voiceAgentLiveConversationArrayDeserializer(
  result: Array<VoiceAgentLiveConversation>,
): any[] {
  return result.map((item) => {
    return voiceAgentLiveConversationDeserializer(item);
  });
}

/** A Live session persisted when effective store is true. Uses voice-conversation lifecycle and retention; items are retrieved separately. */
export interface VoiceAgentLiveConversation {
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
  /** The terminal error that prevented persistence finalization. Present only when `status` is `failed`. */
  last_error?: ApiError;
  /** Cumulative Live audio usage, excluding delegated-model tokens. May be absent after abnormal close. */
  usage?: LiveSessionUsage;
}

export function voiceAgentLiveConversationDeserializer(item: any): VoiceAgentLiveConversation {
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
    last_error: !item["last_error"] ? item["last_error"] : apiErrorDeserializer(item["last_error"]),
    usage: !item["usage"] ? item["usage"] : liveSessionUsageDeserializer(item["usage"]),
  };
}

/** The response data for a requested list of items. */
export interface _AgentsPagedResultVoiceAgentLiveConversationItem {
  /** The requested list of items. */
  data: VoiceAgentLiveConversationItemUnion[];
  /** The first ID represented in this list. */
  first_id?: string;
  /** The last ID represented in this list. */
  last_id?: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export function _agentsPagedResultVoiceAgentLiveConversationItemDeserializer(
  item: any,
): _AgentsPagedResultVoiceAgentLiveConversationItem {
  return {
    data: voiceAgentLiveConversationItemUnionArrayDeserializer(item["data"]),
    first_id: item["first_id"],
    last_id: item["last_id"],
    has_more: item["has_more"],
  };
}

export function voiceAgentLiveConversationItemUnionArrayDeserializer(
  result: Array<VoiceAgentLiveConversationItemUnion>,
): any[] {
  return result.map((item) => {
    return voiceAgentLiveConversationItemUnionDeserializer(item);
  });
}

/** A stored speech segment or delegation. Speech segments are not native turns or proof of playback; delegation results are separate from spoken transcripts. */
export interface VoiceAgentLiveConversationItem {
  /** The persisted item kind. */
  /** The discriminator possible values: input, output, delegation */
  type: VoiceAgentLiveConversationItemType;
  /** Item ID used for retrieval. Foundry assigns speech IDs; delegation IDs retain their native value. */
  id: string;
}

export function voiceAgentLiveConversationItemDeserializer(
  item: any,
): VoiceAgentLiveConversationItem {
  return {
    type: item["type"],
    id: item["id"],
  };
}

/** Alias for VoiceAgentLiveConversationItemUnion */
export type VoiceAgentLiveConversationItemUnion =
  | VoiceAgentLiveInputConversationItem
  | VoiceAgentLiveOutputConversationItem
  | VoiceAgentLiveDelegationConversationItemUnion
  | VoiceAgentLiveConversationItem;

export function voiceAgentLiveConversationItemUnionDeserializer(
  item: any,
): VoiceAgentLiveConversationItemUnion {
  switch (item["type"]) {
    case "input":
      return voiceAgentLiveInputConversationItemDeserializer(
        item as VoiceAgentLiveInputConversationItem,
      );

    case "output":
      return voiceAgentLiveOutputConversationItemDeserializer(
        item as VoiceAgentLiveOutputConversationItem,
      );

    case "delegation":
      return voiceAgentLiveDelegationConversationItemUnionDeserializer(
        item as VoiceAgentLiveDelegationConversationItemUnion,
      );

    default:
      return voiceAgentLiveConversationItemDeserializer(item);
  }
}

/** The kind of a persisted Live conversation item. */
export type VoiceAgentLiveConversationItemType = "input" | "output" | "delegation";

/** A stored user speech segment. */
export interface VoiceAgentLiveInputConversationItem extends VoiceAgentLiveConversationItem {
  type: "input";
  /** Captured user transcription, when available. */
  transcription?: string;
  /** Captured audio metadata; audio.item_id matches this item's id. */
  audio?: VoiceAudioItem;
}

export function voiceAgentLiveInputConversationItemDeserializer(
  item: any,
): VoiceAgentLiveInputConversationItem {
  return {
    type: item["type"],
    id: item["id"],
    transcription: item["transcription"],
    audio: !item["audio"] ? item["audio"] : voiceAudioItemDeserializer(item["audio"]),
  };
}

/** A stored assistant speech segment. */
export interface VoiceAgentLiveOutputConversationItem extends VoiceAgentLiveConversationItem {
  type: "output";
  /** Captured assistant transcription, not backend output or commentary guidance. */
  transcription?: string;
  /** Captured audio metadata; audio.item_id matches this item's id. */
  audio?: VoiceAudioItem;
}

export function voiceAgentLiveOutputConversationItemDeserializer(
  item: any,
): VoiceAgentLiveOutputConversationItem {
  return {
    type: item["type"],
    id: item["id"],
    transcription: item["transcription"],
    audio: !item["audio"] ? item["audio"] : voiceAudioItemDeserializer(item["audio"]),
  };
}

/** A stored delegation using native fields with Foundry-specific targets. Its id is the native delegation ID. */
export interface VoiceAgentLiveDelegationConversationItem extends VoiceAgentLiveConversationItem {
  /** The ID of the Responses API response associated with a Responses delegation. Omitted for client delegations. */
  response_id?: string;
  type: "delegation";
  /** The configured delegation owner. */
  /** The discriminator possible values: client, responses, foundry_managed_agent */
  target: VoiceAgentLiveDelegationTarget;
  /** Observed delegation creation time, in Unix seconds. */
  created_at: Date;
}

export function voiceAgentLiveDelegationConversationItemDeserializer(
  item: any,
): VoiceAgentLiveDelegationConversationItem {
  return {
    type: item["type"],
    id: item["id"],
    response_id: item["response_id"],
    target: item["target"],
    created_at: new Date(item["created_at"] * 1000),
  };
}

/** Alias for VoiceAgentLiveDelegationConversationItemUnion */
export type VoiceAgentLiveDelegationConversationItemUnion =
  | VoiceAgentLiveClientDelegationConversationItem
  | VoiceAgentLiveResponsesDelegationConversationItem
  | VoiceAgentLiveFoundryManagedAgentDelegationItem
  | VoiceAgentLiveDelegationConversationItem;

export function voiceAgentLiveDelegationConversationItemUnionDeserializer(
  item: any,
): VoiceAgentLiveDelegationConversationItemUnion {
  switch (item["target"]) {
    case "client":
      return voiceAgentLiveClientDelegationConversationItemDeserializer(
        item as VoiceAgentLiveClientDelegationConversationItem,
      );

    case "responses":
      return voiceAgentLiveResponsesDelegationConversationItemDeserializer(
        item as VoiceAgentLiveResponsesDelegationConversationItem,
      );

    case "foundry_managed_agent":
      return voiceAgentLiveFoundryManagedAgentDelegationItemDeserializer(
        item as VoiceAgentLiveFoundryManagedAgentDelegationItem,
      );

    default:
      return voiceAgentLiveDelegationConversationItemDeserializer(item);
  }
}

/** Delegation owner. Foundry agent targets use native client delegation upstream. */
export type VoiceAgentLiveDelegationTarget = "responses" | "client" | "foundry_managed_agent";

/** Results supplied by the application for client delegation. */
export interface VoiceAgentLiveClientDelegationConversationItem extends VoiceAgentLiveDelegationConversationItem {
  target: "client";
  /** Guidance for Live to communicate to the user, when accepted. */
  commentary?: string;
  /** Accepted background context, not private reasoning or a request to speak. */
  thinking?: string;
}

export function voiceAgentLiveClientDelegationConversationItemDeserializer(
  item: any,
): VoiceAgentLiveClientDelegationConversationItem {
  return {
    response_id: item["response_id"],
    type: item["type"],
    target: item["target"],
    created_at: new Date(item["created_at"] * 1000),
    id: item["id"],
    commentary: item["commentary"],
    thinking: item["thinking"],
  };
}

/** Stored Responses delegation output, separate from Live speech. */
export interface VoiceAgentLiveResponsesDelegationConversationItem extends VoiceAgentLiveDelegationConversationItem {
  target: "responses";
  /** Final backend text, omitted when unavailable; excludes raw tool output. */
  output?: string;
}

export function voiceAgentLiveResponsesDelegationConversationItemDeserializer(
  item: any,
): VoiceAgentLiveResponsesDelegationConversationItem {
  return {
    response_id: item["response_id"],
    type: item["type"],
    target: item["target"],
    created_at: new Date(item["created_at"] * 1000),
    id: item["id"],
    output: item["output"],
  };
}

/** Stored prompt-agent delegation state and accepted results. */
export interface VoiceAgentLiveFoundryManagedAgentDelegationItem extends VoiceAgentLiveDelegationConversationItem {
  target: "foundry_managed_agent";
  /** Target agent name in the same project. */
  agent_name: string;
  /** Target version pinned at connection start. */
  agent_version: string;
  /** Native delegation offset from session start, in milliseconds. */
  offset_ms: number;
  /** Backend conversation ID, distinct from the voice conversation and Live session IDs. */
  backend_conversation_id?: string;
  /** Accepted guidance in order; empty until a result is accepted. Entries have no individual IDs, are noncumulative, and are independent of backend output_index. Partial results survive failure or cancellation. */
  output: VoiceAgentLiveDelegationResultItem[];
  /** Task context sent to the target agent, not the full request body. */
  delegation_context?: string;
  /** The persisted delegation outcome. */
  status: VoiceAgentLiveDelegationStatus;
}

export function voiceAgentLiveFoundryManagedAgentDelegationItemDeserializer(
  item: any,
): VoiceAgentLiveFoundryManagedAgentDelegationItem {
  return {
    response_id: item["response_id"],
    type: item["type"],
    target: item["target"],
    created_at: new Date(item["created_at"] * 1000),
    id: item["id"],
    agent_name: item["agent_name"],
    agent_version: item["agent_version"],
    offset_ms: item["offset_ms"],
    backend_conversation_id: item["backend_conversation_id"],
    output: voiceAgentLiveDelegationResultItemArrayDeserializer(item["output"]),
    delegation_context: item["delegation_context"],
    status: item["status"],
  };
}

export function voiceAgentLiveDelegationResultItemArrayDeserializer(
  result: Array<VoiceAgentLiveDelegationResultItem>,
): any[] {
  return result.map((item) => {
    return voiceAgentLiveDelegationResultItemDeserializer(item);
  });
}

/** Persisted guidance accepted by Live. The service populates commentary, thinking, or both. Agent delegation section markers are removed before storage. */
export interface VoiceAgentLiveDelegationResultItem {
  /** Guidance for Live to communicate to the user. */
  commentary?: string;
  /** Background context, not private reasoning or a request to speak. */
  thinking?: string;
}

export function voiceAgentLiveDelegationResultItemDeserializer(
  item: any,
): VoiceAgentLiveDelegationResultItem {
  return {
    commentary: item["commentary"],
    thinking: item["thinking"],
  };
}

/** Persisted delegation outcome, not speech or playback status. */
export type VoiceAgentLiveDelegationStatus =
  "in_progress" | "completed" | "failed" | "incomplete" | "cancelled";

/** Agent-owned outbound call Campaign. Creation/replacement authorizes execution after successful preparation. */
export interface TelephonyCampaign {
  /** Human-readable name of the provider connection in the current project. */
  connection_name: string;
  /** Typed caller address shared with generated CallJobs. The connection validates source support separately from recipient support. */
  source: TelephonyAddressUnion;
  /** 1-100 recipients, exclusive with recipient_dataset. The whole UTF-8 request is limited to 1 MiB. Omitted from reads; retain the submission for row correlation. */
  recipients?: TelephonyRecipient[];
  /** Same-project CSV/JSON/JSONL uri_file, exclusive with recipients. Omitted version pins latest per preparation. Limits: 1-1,000,000 rows, 256 MiB decoded/file, 1 MiB/row. */
  recipient_dataset?: TelephonyCampaignDatasetReference;
  /** Dispatch schedule; omission equals ImmediateSchedule. Every mode waits for successful preparation, then follows its schedule and available capacity. */
  schedule?: TelephonyCampaignScheduleUnion;
  /** Per-recipient retries. Omit for one attempt; generated CallJobs return fixed_interval with max_attempts=1 and interval=0 seconds. */
  retry_policy?: TelephonyOutboundRetryPolicyUnion;
  /** Business execution state. Each asynchronous action has its own retained operation monitor. */
  readonly status: TelephonyCampaignStatus;
  /** Preparation/control failure, cleared on retry. Never includes secrets or raw recipient values. */
  readonly error?: ApiError;
  /** Immutable name supplied as campaign_name in the PUT path, not the request body; echoed in responses. Unique within the project and Agent. */
  readonly name: string;
  /** Creation time. */
  readonly created_at: Date;
  /** Last observable progress update. */
  readonly updated_at: Date;
  /** Conditional-action token, not a cache validator. Changes with control state, not progress. */
  readonly etag: string;
  /** Latest accepted action, for discovery only. Poll the initiating response's Operation-Id/Operation-Location instead. */
  readonly operation_id: string;
  /** Time of terminal completion for the current round; cleared when failed preparation is replaced. */
  readonly finished_at?: Date;
  /** Latest Agent version pinned once per preparation and shared by retries/calls. Omitted until resolved; replacement clears it. Unavailable pins fail without fallback. */
  readonly locked_agent_version?: string;
  /** Available partial accounting even when the job fails or is cancelled. */
  readonly progress: TelephonyCampaignProgress;
}

export function telephonyCampaignSerializer(item: TelephonyCampaign): any {
  return {
    connection_name: item["connection_name"],
    source: telephonyAddressUnionSerializer(item["source"]),
    recipients: !item["recipients"]
      ? item["recipients"]
      : telephonyRecipientArraySerializer(item["recipients"]),
    recipient_dataset: !item["recipient_dataset"]
      ? item["recipient_dataset"]
      : telephonyCampaignDatasetReferenceSerializer(item["recipient_dataset"]),
    schedule: !item["schedule"]
      ? item["schedule"]
      : telephonyCampaignScheduleUnionSerializer(item["schedule"]),
    retry_policy: !item["retry_policy"]
      ? item["retry_policy"]
      : telephonyOutboundRetryPolicyUnionSerializer(item["retry_policy"]),
  };
}

export function telephonyCampaignDeserializer(item: any): TelephonyCampaign {
  return {
    connection_name: item["connection_name"],
    source: telephonyAddressUnionDeserializer(item["source"]),
    recipients: !item["recipients"]
      ? item["recipients"]
      : telephonyRecipientArrayDeserializer(item["recipients"]),
    recipient_dataset: !item["recipient_dataset"]
      ? item["recipient_dataset"]
      : telephonyCampaignDatasetReferenceDeserializer(item["recipient_dataset"]),
    schedule: !item["schedule"]
      ? item["schedule"]
      : telephonyCampaignScheduleUnionDeserializer(item["schedule"]),
    retry_policy: !item["retry_policy"]
      ? item["retry_policy"]
      : telephonyOutboundRetryPolicyUnionDeserializer(item["retry_policy"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
    name: item["name"],
    created_at: new Date(item["created_at"] * 1000),
    updated_at: new Date(item["updated_at"] * 1000),
    etag: item["etag"],
    operation_id: item["operation_id"],
    finished_at: !item["finished_at"] ? item["finished_at"] : new Date(item["finished_at"] * 1000),
    locked_agent_version: item["locked_agent_version"],
    progress: telephonyCampaignProgressDeserializer(item["progress"]),
  };
}

export function telephonyRecipientArraySerializer(result: Array<TelephonyRecipient>): any[] {
  return result.map((item) => {
    return telephonyRecipientSerializer(item);
  });
}

export function telephonyRecipientArrayDeserializer(result: Array<TelephonyRecipient>): any[] {
  return result.map((item) => {
    return telephonyRecipientDeserializer(item);
  });
}

/** One recipient in an inline campaign input. Each input position is a separate intended call, including repeated destinations. */
export interface TelephonyRecipient {
  /** Recipient address; currently phone_number only. Unsupported types fail preparation; future variants can reuse this field. */
  destination: TelephonyAddressUnion;
  /** Agent inputs with nested JSON/null, unique names and depth at most 16. Agent schemas/defaults apply. Replay preserves types, exact numbers, array order and null/omission, but ignores object order; use lossless numeric serialization. */
  structured_inputs?: Record<string, any>;
  /** Earliest dispatch time for recipient scheduling. Required only when schedule.type is recipient; forbidden for other modes. */
  scheduled_at?: Date;
}

export function telephonyRecipientSerializer(item: TelephonyRecipient): any {
  return {
    destination: telephonyAddressUnionSerializer(item["destination"]),
    structured_inputs: item["structured_inputs"],
    scheduled_at: !item["scheduled_at"]
      ? item["scheduled_at"]
      : (item["scheduled_at"].getTime() / 1000) | 0,
  };
}

export function telephonyRecipientDeserializer(item: any): TelephonyRecipient {
  return {
    destination: telephonyAddressUnionDeserializer(item["destination"]),
    structured_inputs: !item["structured_inputs"]
      ? item["structured_inputs"]
      : Object.fromEntries(
          Object.entries(item["structured_inputs"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    scheduled_at: !item["scheduled_at"]
      ? item["scheduled_at"]
      : new Date(item["scheduled_at"] * 1000),
  };
}

/** Reference to a Foundry Dataset in the current project. Consuming operations define supported Dataset kinds and resolution behavior. */
export interface TelephonyCampaignDatasetReference {
  /** Dataset name. */
  name: string;
  /** Optional Dataset version. Omit to select latest when the consuming operation resolves the reference. */
  version?: string;
}

export function telephonyCampaignDatasetReferenceSerializer(
  item: TelephonyCampaignDatasetReference,
): any {
  return { name: item["name"], version: item["version"] };
}

export function telephonyCampaignDatasetReferenceDeserializer(
  item: any,
): TelephonyCampaignDatasetReference {
  return {
    name: item["name"],
    version: item["version"],
  };
}

/** Creation authorizes dialing; every scheduling mode waits for successful preparation. */
export interface TelephonyCampaignSchedule {
  /** How each recipient's earliest dispatch time is determined. */
  /** The discriminator possible values: immediate, scheduled, recipient */
  type: TelephonyCampaignScheduleType;
  /** Exclusive deadline for new attempts, including retries; active calls may finish. Must be later than every scheduled_at. */
  expires_at?: Date;
}

export function telephonyCampaignScheduleSerializer(item: TelephonyCampaignSchedule): any {
  return {
    type: item["type"],
    expires_at: !item["expires_at"]
      ? item["expires_at"]
      : (item["expires_at"].getTime() / 1000) | 0,
  };
}

export function telephonyCampaignScheduleDeserializer(item: any): TelephonyCampaignSchedule {
  return {
    type: item["type"],
    expires_at: !item["expires_at"] ? item["expires_at"] : new Date(item["expires_at"] * 1000),
  };
}

/** Alias for TelephonyCampaignScheduleUnion */
export type TelephonyCampaignScheduleUnion =
  ImmediateSchedule | AtTimeSchedule | PerRecipientSchedule | TelephonyCampaignSchedule;

export function telephonyCampaignScheduleUnionSerializer(
  item: TelephonyCampaignScheduleUnion,
): any {
  switch (item.type) {
    case "immediate":
      return immediateScheduleSerializer(item as ImmediateSchedule);

    case "scheduled":
      return atTimeScheduleSerializer(item as AtTimeSchedule);

    case "recipient":
      return perRecipientScheduleSerializer(item as PerRecipientSchedule);

    default:
      return telephonyCampaignScheduleSerializer(item);
  }
}

export function telephonyCampaignScheduleUnionDeserializer(
  item: any,
): TelephonyCampaignScheduleUnion {
  switch (item["type"]) {
    case "immediate":
      return immediateScheduleDeserializer(item as ImmediateSchedule);

    case "scheduled":
      return atTimeScheduleDeserializer(item as AtTimeSchedule);

    case "recipient":
      return perRecipientScheduleDeserializer(item as PerRecipientSchedule);

    default:
      return telephonyCampaignScheduleDeserializer(item);
  }
}

/** Mutually exclusive ways to determine each recipient's earliest dispatch time. */
export type TelephonyCampaignScheduleType = "immediate" | "scheduled" | "recipient";

/** Dispatch automatically as soon as preparation succeeds and capacity permits. */
export interface ImmediateSchedule extends TelephonyCampaignSchedule {
  /** Identifies immediate scheduling after successful preparation. */
  type: "immediate";
}

export function immediateScheduleSerializer(item: ImmediateSchedule): any {
  return {
    type: item["type"],
    expires_at: !item["expires_at"]
      ? item["expires_at"]
      : (item["expires_at"].getTime() / 1000) | 0,
  };
}

export function immediateScheduleDeserializer(item: any): ImmediateSchedule {
  return {
    type: item["type"],
    expires_at: !item["expires_at"] ? item["expires_at"] : new Date(item["expires_at"] * 1000),
  };
}

/** Uses one earliest dispatch time for all recipients. Past times are allowed; preparation must still succeed. */
export interface AtTimeSchedule extends TelephonyCampaignSchedule {
  /** Identifies scheduling with one common earliest dispatch time. */
  type: "scheduled";
  /** Common earliest dispatch time; successful preparation is required. */
  scheduled_at: Date;
}

export function atTimeScheduleSerializer(item: AtTimeSchedule): any {
  return {
    type: item["type"],
    expires_at: !item["expires_at"]
      ? item["expires_at"]
      : (item["expires_at"].getTime() / 1000) | 0,
    scheduled_at: (item["scheduled_at"].getTime() / 1000) | 0,
  };
}

export function atTimeScheduleDeserializer(item: any): AtTimeSchedule {
  return {
    type: item["type"],
    expires_at: !item["expires_at"] ? item["expires_at"] : new Date(item["expires_at"] * 1000),
    scheduled_at: new Date(item["scheduled_at"] * 1000),
  };
}

/** Uses each recipient's scheduled_at: RFC 3339 with timezone in Datasets, Unix seconds for inline recipients. */
export interface PerRecipientSchedule extends TelephonyCampaignSchedule {
  /** Identifies scheduling with a separate earliest dispatch time for each recipient. */
  type: "recipient";
}

export function perRecipientScheduleSerializer(item: PerRecipientSchedule): any {
  return {
    type: item["type"],
    expires_at: !item["expires_at"]
      ? item["expires_at"]
      : (item["expires_at"].getTime() / 1000) | 0,
  };
}

export function perRecipientScheduleDeserializer(item: any): PerRecipientSchedule {
  return {
    type: item["type"],
    expires_at: !item["expires_at"] ? item["expires_at"] : new Date(item["expires_at"] * 1000),
  };
}

/** Campaign execution state, separate from preparation/cancel/delete LROs. All recipients terminal means completed, not necessarily successful. */
export type TelephonyCampaignStatus =
  "validating" | "running" | "cancelling" | "completed" | "failed" | "cancelled" | "deleting";

/** Recipient execution counts, zero until preparation succeeds; then mutually exclusive and summing to total_recipients. */
export interface TelephonyCampaignProgress {
  /** Total input rows, including invalid rows. Omitted until known; never an estimate. */
  total_recipients?: number;
  /** Recipients waiting for their schedule, capacity or retry after preparation has completed. */
  pending: number;
  /** Recipients with a durable origination reservation or unresolved provider attempt, including dispatching before a call ID is received. */
  active: number;
  /** Recipients whose CallJob completed; not proof of business success. */
  completed: number;
  /** Recipients whose CallJob exhausted retries or failed. */
  failed: number;
  /** Recipients cancelled before completion. Does not include dispatch-window expiry. */
  cancelled: number;
  /** Recipients whose dispatch deadline elapsed before a new attempt could start. */
  expired: number;
}

export function telephonyCampaignProgressDeserializer(item: any): TelephonyCampaignProgress {
  return {
    total_recipients: item["total_recipients"],
    pending: item["pending"],
    active: item["active"],
    completed: item["completed"],
    failed: item["failed"],
    cancelled: item["cancelled"],
    expired: item["expired"],
  };
}

/** Preparation/cancel/delete monitor bound to its original Campaign instance/round, independent of later actions. Omits result. Retained for the Campaign lifetime and at least 24 hours after both completion and deletion. */
export interface TelephonyCampaignOperation {
  /** Server-assigned unique identifier. */
  readonly id: string;
  /** Current lifecycle status. */
  readonly status: JobStatus;
  /** Error details — populated only on failure. */
  readonly error?: ApiError;
  /** Work tracked by this monitor. */
  readonly kind: TelephonyCampaignOperationKind;
  /** Creation time of this operation. */
  readonly created_at: Date;
  /** When preparation, cancellation or deletion finished. */
  readonly finished_at?: Date;
}

export function telephonyCampaignOperationDeserializer(item: any): TelephonyCampaignOperation {
  return {
    id: item["id"],
    status: item["status"],
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
    kind: item["kind"],
    created_at: new Date(item["created_at"] * 1000),
    finished_at: !item["finished_at"] ? item["finished_at"] : new Date(item["finished_at"] * 1000),
  };
}

/** Kind of asynchronous work associated with a Campaign. */
export type TelephonyCampaignOperationKind = "validation" | "cancel" | "delete";

/** Shared Foundry page shape with opaque boundary tokens bound to the original sort position. */
export interface _TelephonyCampaignPageTelephonyCampaign {
  /** The requested list of items. */
  data: TelephonyCampaign[];
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
  /** Opaque cursor for the first returned item; absent when empty. */
  first_id?: string;
  /** Opaque cursor for the last returned item; absent when empty. Deletion/name reuse does not move its original sort boundary. */
  last_id?: string;
}

export function _telephonyCampaignPageTelephonyCampaignDeserializer(
  item: any,
): _TelephonyCampaignPageTelephonyCampaign {
  return {
    data: telephonyCampaignArrayDeserializer(item["data"]),
    has_more: item["has_more"],
    first_id: item["first_id"],
    last_id: item["last_id"],
  };
}

export function telephonyCampaignArraySerializer(result: Array<TelephonyCampaign>): any[] {
  return result.map((item) => {
    return telephonyCampaignSerializer(item);
  });
}

export function telephonyCampaignArrayDeserializer(result: Array<TelephonyCampaign>): any[] {
  return result.map((item) => {
    return telephonyCampaignDeserializer(item);
  });
}

/** Error-only page. During validation this is a partial live view; an empty page does not establish success. */
export interface _TelephonyCampaignValidationErrorPage {
  /** The requested list of items. */
  data: TelephonyCampaignValidationError[];
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
  /** Opaque cursor for the first returned item; absent when empty. */
  first_id?: string;
  /** Opaque cursor for the last returned item; absent when empty. Deletion/name reuse does not move its original sort boundary. */
  last_id?: string;
  /** Pinned Agent version used for preparation, shared by all errors on the page. */
  agent_version?: string;
}

export function _telephonyCampaignValidationErrorPageDeserializer(
  item: any,
): _TelephonyCampaignValidationErrorPage {
  return {
    data: telephonyCampaignValidationErrorArrayDeserializer(item["data"]),
    has_more: item["has_more"],
    first_id: item["first_id"],
    last_id: item["last_id"],
    agent_version: item["agent_version"],
  };
}

export function telephonyCampaignValidationErrorArrayDeserializer(
  result: Array<TelephonyCampaignValidationError>,
): any[] {
  return result.map((item) => {
    return telephonyCampaignValidationErrorDeserializer(item);
  });
}

/** Invalid-row diagnostic for current preparation; execution errors are in CallJobs. */
export interface TelephonyCampaignValidationError {
  /** One-based source row or inline item position. */
  row_number: number;
  /** Row validation error; param identifies the field. Never includes raw values or secrets. */
  error: ApiError;
}

export function telephonyCampaignValidationErrorDeserializer(
  item: any,
): TelephonyCampaignValidationError {
  return {
    row_number: item["row_number"],
    error: apiErrorDeserializer(item["error"]),
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
  /** The effective handoff topology and runtime state, when handoff is configured. */
  handoff?: VoiceAgentHandoffState;
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
    handoff: !item["handoff"] ? item["handoff"] : voiceAgentHandoffStateSerializer(item["handoff"]),
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
    handoff: !item["handoff"]
      ? item["handoff"]
      : voiceAgentHandoffStateDeserializer(item["handoff"]),
    object: item["object"],
    id: item["id"],
    model: item["model"],
    expires_at: !item["expires_at"] ? item["expires_at"] : new Date(item["expires_at"] * 1000),
  };
}

/** The effective topology and runtime state of a voice-agent handoff graph. */
export interface VoiceAgentHandoffState {
  /** The immutable execution pipeline family. */
  pipeline_family: VoiceAgentHandoffPipelineFamily;
  /** The currently committed node identifier or `$entrypoint`. */
  active_node_id: string;
  /** The monotonically increasing generation of the committed active-node configuration. */
  node_generation: number;
  /** The number of successfully completed handoffs. */
  transfer_count: number;
  /** The number of unique reserved handoff attempts. */
  attempt_count: number;
  /** The edge identifiers currently available from the active node. */
  available_edge_ids: string[];
  /** The generated handoff function visible to the active model, or null when no route is available. */
  transfer_tool: VoiceAgentFunctionTool | null;
  /** The compiled handoff nodes, including the implicit or explicit `$entrypoint`. */
  nodes: VoiceAgentHandoffNodeState[];
  /** The compiled handoff edges. */
  edges: VoiceAgentHandoffEdgeState[];
}

export function voiceAgentHandoffStateSerializer(item: VoiceAgentHandoffState): any {
  return {
    pipeline_family: item["pipeline_family"],
    active_node_id: item["active_node_id"],
    node_generation: item["node_generation"],
    transfer_count: item["transfer_count"],
    attempt_count: item["attempt_count"],
    available_edge_ids: item["available_edge_ids"].map((p: any) => {
      return p;
    }),
    transfer_tool: !item["transfer_tool"]
      ? item["transfer_tool"]
      : voiceAgentFunctionToolSerializer(item["transfer_tool"]),
    nodes: voiceAgentHandoffNodeStateArraySerializer(item["nodes"]),
    edges: voiceAgentHandoffEdgeStateArraySerializer(item["edges"]),
  };
}

export function voiceAgentHandoffStateDeserializer(item: any): VoiceAgentHandoffState {
  return {
    pipeline_family: item["pipeline_family"],
    active_node_id: item["active_node_id"],
    node_generation: item["node_generation"],
    transfer_count: item["transfer_count"],
    attempt_count: item["attempt_count"],
    available_edge_ids: item["available_edge_ids"].map((p: any) => {
      return p;
    }),
    transfer_tool: !item["transfer_tool"]
      ? item["transfer_tool"]
      : voiceAgentFunctionToolDeserializer(item["transfer_tool"]),
    nodes: voiceAgentHandoffNodeStateArrayDeserializer(item["nodes"]),
    edges: voiceAgentHandoffEdgeStateArrayDeserializer(item["edges"]),
  };
}

/** The immutable pipeline family selected for a voice-agent handoff graph. */
export type VoiceAgentHandoffPipelineFamily = "cascaded" | "realtime";

export function voiceAgentHandoffNodeStateArraySerializer(
  result: Array<VoiceAgentHandoffNodeState>,
): any[] {
  return result.map((item) => {
    return voiceAgentHandoffNodeStateSerializer(item);
  });
}

export function voiceAgentHandoffNodeStateArrayDeserializer(
  result: Array<VoiceAgentHandoffNodeState>,
): any[] {
  return result.map((item) => {
    return voiceAgentHandoffNodeStateDeserializer(item);
  });
}

/** Non-sensitive topology metadata for one compiled handoff node. */
export interface VoiceAgentHandoffNodeState {
  /** The node identifier or `$entrypoint`. */
  id: string;
  /** The display-only node description. This value is not provided to the model. */
  display_description: string;
  /** Whether this is the implicit `$entrypoint` node. */
  implicit?: boolean;
}

export function voiceAgentHandoffNodeStateSerializer(item: VoiceAgentHandoffNodeState): any {
  return { id: item["id"], description: item["display_description"], implicit: item["implicit"] };
}

export function voiceAgentHandoffNodeStateDeserializer(item: any): VoiceAgentHandoffNodeState {
  return {
    id: item["id"],
    display_description: item["description"],
    implicit: item["implicit"],
  };
}

export function voiceAgentHandoffEdgeStateArraySerializer(
  result: Array<VoiceAgentHandoffEdgeState>,
): any[] {
  return result.map((item) => {
    return voiceAgentHandoffEdgeStateSerializer(item);
  });
}

export function voiceAgentHandoffEdgeStateArrayDeserializer(
  result: Array<VoiceAgentHandoffEdgeState>,
): any[] {
  return result.map((item) => {
    return voiceAgentHandoffEdgeStateDeserializer(item);
  });
}

/** Non-sensitive topology metadata for one compiled handoff edge. */
export interface VoiceAgentHandoffEdgeState {
  /** The edge identifier. */
  id: string;
  /** The source node identifier or `$entrypoint`. */
  source: string;
  /** The target node identifier or `$entrypoint`. */
  target: string;
  /** Whether user interruption before commit cancels the pending handoff. */
  cancel_on_interruption?: boolean;
  /** The minimum delay before target activation, in milliseconds. */
  delay_ms?: number;
  /** The deterministic source-voice announcement played before target activation. */
  transfer_message?: string;
  /** Whether Voice Live automatically starts a response after target activation. */
  target_response?: VoiceAgentHandoffTargetResponse;
}

export function voiceAgentHandoffEdgeStateSerializer(item: VoiceAgentHandoffEdgeState): any {
  return {
    id: item["id"],
    source: item["source"],
    target: item["target"],
    cancel_on_interruption: item["cancel_on_interruption"],
    delay_ms: item["delay_ms"],
    transfer_message: item["transfer_message"],
    target_response: item["target_response"],
  };
}

export function voiceAgentHandoffEdgeStateDeserializer(item: any): VoiceAgentHandoffEdgeState {
  return {
    id: item["id"],
    source: item["source"],
    target: item["target"],
    cancel_on_interruption: item["cancel_on_interruption"],
    delay_ms: item["delay_ms"],
    transfer_message: item["transfer_message"],
    target_response: item["target_response"],
  };
}

/** The `session.handoff.completed` server event. */
export interface VoiceAgentServerEventSessionHandoffCompleted extends RealtimeServerEvent {
  /** The server-generated event identifier. */
  event_id: string;
  /** The server-generated handoff attempt identifier. */
  handoff_id: string;
  /** The configured edge selected for this handoff. */
  edge_id: string;
  /** The source node identifier or `$entrypoint`. */
  from_node_id: string;
  /** The target node identifier or `$entrypoint`. */
  to_node_id: string;
  /** The model active before the handoff. */
  from_model: string;
  /** The model prepared for the target behavior. */
  to_model: string;
  /** The function-call identifier that initiated the handoff. */
  tool_call_id: string;
  /** The source generation for started or aborted events, and the committed target generation for completed events. */
  node_generation: number;
  /** The target-preparation duration. */
  prepare_duration_ms: number;
  /** The total handoff duration. */
  duration_ms: number;
  /** The event type. Always `session.handoff.completed`. */
  type: "session.handoff.completed";
}

export function voiceAgentServerEventSessionHandoffCompletedSerializer(
  item: VoiceAgentServerEventSessionHandoffCompleted,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    handoff_id: item["handoff_id"],
    edge_id: item["edge_id"],
    from_node_id: item["from_node_id"],
    to_node_id: item["to_node_id"],
    from_model: item["from_model"],
    to_model: item["to_model"],
    tool_call_id: item["tool_call_id"],
    node_generation: item["node_generation"],
    prepare_duration_ms: item["prepare_duration_ms"],
    duration_ms: item["duration_ms"],
  };
}

export function voiceAgentServerEventSessionHandoffCompletedDeserializer(
  item: any,
): VoiceAgentServerEventSessionHandoffCompleted {
  return {
    type: item["type"],
    event_id: item["event_id"],
    handoff_id: item["handoff_id"],
    edge_id: item["edge_id"],
    from_node_id: item["from_node_id"],
    to_node_id: item["to_node_id"],
    from_model: item["from_model"],
    to_model: item["to_model"],
    tool_call_id: item["tool_call_id"],
    node_generation: item["node_generation"],
    prepare_duration_ms: item["prepare_duration_ms"],
    duration_ms: item["duration_ms"],
  };
}

/** Type of VoiceAgentServerEventTypeExtension */
export type VoiceAgentServerEventTypeExtension =
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
  | "response.video.delta"
  | "response.system_tool_arguments.delta"
  | "response.system_tool_arguments.done"
  | "input_collection.status"
  | "session.handoff.started"
  | "session.handoff.completed"
  | "session.handoff.aborted";

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

/** A live realtime response returned by the voice-agent service in both `response.created` and `response.done` events. */
export interface VoiceAgentRealtimeResponse {
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
  /** The list of output items generated by the response. */
  output?: RealtimeConversationItemUnion[];
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
  /** The audio configuration used by the live response, including flat voice provider, locale, and format fields under `output`. */
  audio?: VoiceResponseAudio;
}

export function voiceAgentRealtimeResponseSerializer(item: VoiceAgentRealtimeResponse): any {
  return {
    id: item["id"],
    object: item["object"],
    status: item["status"],
    status_details: !item["status_details"]
      ? item["status_details"]
      : realtimeResponseStatusDetailsSerializer(item["status_details"]),
    output: !item["output"]
      ? item["output"]
      : realtimeConversationItemUnionArraySerializer(item["output"]),
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
      : _voiceResponseMaxOutputTokensSerializer(item["max_output_tokens"]),
    audio: !item["audio"] ? item["audio"] : voiceResponseAudioSerializer(item["audio"]),
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
    output: !item["output"]
      ? item["output"]
      : realtimeConversationItemUnionArrayDeserializer(item["output"]),
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
      : _voiceResponseMaxOutputTokensDeserializer(item["max_output_tokens"]),
    audio: !item["audio"] ? item["audio"] : voiceResponseAudioDeserializer(item["audio"]),
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

/** The `session.handoff.started` server event. */
export interface VoiceAgentServerEventSessionHandoffStarted extends RealtimeServerEvent {
  /** The server-generated event identifier. */
  event_id: string;
  /** The server-generated handoff attempt identifier. */
  handoff_id: string;
  /** The configured edge selected for this handoff. */
  edge_id: string;
  /** The source node identifier or `$entrypoint`. */
  from_node_id: string;
  /** The target node identifier or `$entrypoint`. */
  to_node_id: string;
  /** The model active before the handoff. */
  from_model: string;
  /** The model prepared for the target behavior. */
  to_model: string;
  /** The function-call identifier that initiated the handoff. */
  tool_call_id: string;
  /** The source generation for started or aborted events, and the committed target generation for completed events. */
  node_generation: number;
  /** The event type. Always `session.handoff.started`. */
  type: "session.handoff.started";
}

export function voiceAgentServerEventSessionHandoffStartedSerializer(
  item: VoiceAgentServerEventSessionHandoffStarted,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    handoff_id: item["handoff_id"],
    edge_id: item["edge_id"],
    from_node_id: item["from_node_id"],
    to_node_id: item["to_node_id"],
    from_model: item["from_model"],
    to_model: item["to_model"],
    tool_call_id: item["tool_call_id"],
    node_generation: item["node_generation"],
  };
}

export function voiceAgentServerEventSessionHandoffStartedDeserializer(
  item: any,
): VoiceAgentServerEventSessionHandoffStarted {
  return {
    type: item["type"],
    event_id: item["event_id"],
    handoff_id: item["handoff_id"],
    edge_id: item["edge_id"],
    from_node_id: item["from_node_id"],
    to_node_id: item["to_node_id"],
    from_model: item["from_model"],
    to_model: item["to_model"],
    tool_call_id: item["tool_call_id"],
    node_generation: item["node_generation"],
  };
}

/** The `session.handoff.aborted` server event. */
export interface VoiceAgentServerEventSessionHandoffAborted extends RealtimeServerEvent {
  /** The server-generated event identifier. */
  event_id: string;
  /** The server-generated handoff attempt identifier. */
  handoff_id: string;
  /** The configured edge selected for this handoff. */
  edge_id: string;
  /** The source node identifier or `$entrypoint`. */
  from_node_id: string;
  /** The target node identifier or `$entrypoint`. */
  to_node_id: string;
  /** The model active before the handoff. */
  from_model: string;
  /** The model prepared for the target behavior. */
  to_model: string;
  /** The function-call identifier that initiated the handoff. */
  tool_call_id: string;
  /** The source generation for started or aborted events, and the committed target generation for completed events. */
  node_generation: number;
  /** Why the handoff ended before target commit. */
  reason: VoiceAgentHandoffAbortReason;
  /** The handoff failure detail when `reason` is `error`. */
  error?: RealtimeServerEventErrorError;
  /** The event type. Always `session.handoff.aborted`. */
  type: "session.handoff.aborted";
}

export function voiceAgentServerEventSessionHandoffAbortedSerializer(
  item: VoiceAgentServerEventSessionHandoffAborted,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    handoff_id: item["handoff_id"],
    edge_id: item["edge_id"],
    from_node_id: item["from_node_id"],
    to_node_id: item["to_node_id"],
    from_model: item["from_model"],
    to_model: item["to_model"],
    tool_call_id: item["tool_call_id"],
    node_generation: item["node_generation"],
    reason: item["reason"],
    error: !item["error"] ? item["error"] : realtimeServerEventErrorErrorSerializer(item["error"]),
  };
}

export function voiceAgentServerEventSessionHandoffAbortedDeserializer(
  item: any,
): VoiceAgentServerEventSessionHandoffAborted {
  return {
    type: item["type"],
    event_id: item["event_id"],
    handoff_id: item["handoff_id"],
    edge_id: item["edge_id"],
    from_node_id: item["from_node_id"],
    to_node_id: item["to_node_id"],
    from_model: item["from_model"],
    to_model: item["to_model"],
    tool_call_id: item["tool_call_id"],
    node_generation: item["node_generation"],
    reason: item["reason"],
    error: !item["error"]
      ? item["error"]
      : realtimeServerEventErrorErrorDeserializer(item["error"]),
  };
}

/** Why a server-managed handoff ended before target commit. */
export type VoiceAgentHandoffAbortReason = "user_interruption" | "error";

/** An incremental model-argument fragment for a service-managed system tool. */
export interface VoiceAgentServerEventSystemToolArgumentsDelta extends RealtimeServerEvent {
  /** The event type. Always `response.system_tool_arguments.delta`. */
  type: "response.system_tool_arguments.delta";
  /** The unique identifier of this server event. */
  event_id: string;
  /** The response containing the tool invocation. */
  response_id: string;
  /** The generated tool item's identifier. */
  item_id: string;
  /** The item's zero-based position in the response output. */
  output_index: number;
  /** The invocation identifier. */
  call_id: string;
  /** An incremental JSON fragment of the intent arguments. */
  delta: string;
  /** Optional padding metadata with no application semantics. */
  obfuscation?: string;
}

export function voiceAgentServerEventSystemToolArgumentsDeltaSerializer(
  item: VoiceAgentServerEventSystemToolArgumentsDelta,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    call_id: item["call_id"],
    delta: item["delta"],
    obfuscation: item["obfuscation"],
  };
}

export function voiceAgentServerEventSystemToolArgumentsDeltaDeserializer(
  item: any,
): VoiceAgentServerEventSystemToolArgumentsDelta {
  return {
    type: item["type"],
    event_id: item["event_id"],
    response_id: item["response_id"],
    item_id: item["item_id"],
    output_index: item["output_index"],
    call_id: item["call_id"],
    delta: item["delta"],
    obfuscation: item["obfuscation"],
  };
}

/** The completed intent arguments for a system tool, not provider success or a request for a customer function result. */
export interface VoiceAgentServerEventSystemToolArgumentsDone extends RealtimeServerEvent {
  /** The event type. Always `response.system_tool_arguments.done`. */
  type: "response.system_tool_arguments.done";
  /** The unique identifier of this server event. */
  event_id: string;
  /** The response containing the tool invocation. */
  response_id: string;
  /** The generated tool item's identifier. */
  item_id: string;
  /** The item's zero-based position in the response output. */
  output_index: number;
  /** The invocation identifier. */
  call_id: string;
  /** The invoked built-in capability. */
  name: VoiceAgentSystemToolName;
  /** The complete, unexpanded model arguments as a JSON string. */
  arguments: string;
}

export function voiceAgentServerEventSystemToolArgumentsDoneSerializer(
  item: VoiceAgentServerEventSystemToolArgumentsDone,
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

export function voiceAgentServerEventSystemToolArgumentsDoneDeserializer(
  item: any,
): VoiceAgentServerEventSystemToolArgumentsDone {
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

/** Reports collection or telephony outcomes for a model call. */
export interface VoiceAgentServerEventInputCollectionStatus extends RealtimeServerEvent {
  /** The event type. Always `input_collection.status`. */
  type: "input_collection.status";
  /** An optional event identifier. */
  event_id?: string;
  /** The originating system-tool invocation. */
  call_id: string;
  /** The collection operation identifier, when this outcome concerns a collection. */
  collection_id?: string;
  /** The current receiver request identifier, when applicable. */
  request_id?: string;
  /** The collection receiver, omitted for telephony-operation feedback. */
  channel?: VoiceAgentInputCollectionChannel;
  /** The reported outcome. Generation completion of a system-tool item is separate. */
  status: VoiceAgentInputCollectionStatus;
  /** Completed ASCII digits, including leading zeros, only for `secret: false`; absent for private collection and telephony-operation feedback. */
  value?: string;
  /** Actual bare variable name from successful private collection, not its value. May be suffixed on collision; reference it with `{{name}}`. */
  output_ref?: string;
}

export function voiceAgentServerEventInputCollectionStatusSerializer(
  item: VoiceAgentServerEventInputCollectionStatus,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    call_id: item["call_id"],
    collection_id: item["collection_id"],
    request_id: item["request_id"],
    channel: item["channel"],
    status: item["status"],
    value: item["value"],
    output_ref: item["output_ref"],
  };
}

export function voiceAgentServerEventInputCollectionStatusDeserializer(
  item: any,
): VoiceAgentServerEventInputCollectionStatus {
  return {
    type: item["type"],
    event_id: item["event_id"],
    call_id: item["call_id"],
    collection_id: item["collection_id"],
    request_id: item["request_id"],
    channel: item["channel"],
    status: item["status"],
    value: item["value"],
    output_ref: item["output_ref"],
  };
}

/** The receiver used by an input collection. Voice collection is not supported. */
export type VoiceAgentInputCollectionChannel = "sms" | "dtmf";

/** Collection lifecycle and value-free telephony-operation outcomes. Additional outcomes may be introduced over time. */
export type VoiceAgentInputCollectionStatus =
  | "accepted"
  | "listening"
  | "completed"
  | "expired"
  | "cancelled"
  | "failed"
  | "busy"
  | "invalid_input"
  | "invalid_arguments"
  | "stale_collection"
  | "unsupported_channel"
  | "dispatch_failed"
  | "provider_accepted"
  | "transfer_not_answered"
  | "provider_failed_or_unsupported"
  | "provider_result_uncertain"
  | "provider_not_executed";

/** The `session.subagent.started` server event. */
export interface VoiceAgentServerEventSessionSubagentStarted extends RealtimeServerEvent {
  /** The event type. Always `session.subagent.started`. */
  type: "session.subagent.started";
  /** The server-generated event identifier. */
  event_id: string;
  /** The identifier of the subagent consultation. */
  consultation_id: string;
  /** The identifier of the function call that initiated the consultation. */
  call_id: string;
  /** The name of the consulted subagent. */
  subagent_name: string;
}

export function voiceAgentServerEventSessionSubagentStartedSerializer(
  item: VoiceAgentServerEventSessionSubagentStarted,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    consultation_id: item["consultation_id"],
    call_id: item["call_id"],
    subagent_name: item["subagent_name"],
  };
}

export function voiceAgentServerEventSessionSubagentStartedDeserializer(
  item: any,
): VoiceAgentServerEventSessionSubagentStarted {
  return {
    type: item["type"],
    event_id: item["event_id"],
    consultation_id: item["consultation_id"],
    call_id: item["call_id"],
    subagent_name: item["subagent_name"],
  };
}

/** The `session.subagent.completed` server event. */
export interface VoiceAgentServerEventSessionSubagentCompleted extends RealtimeServerEvent {
  /** The event type. Always `session.subagent.completed`. */
  type: "session.subagent.completed";
  /** The server-generated event identifier. */
  event_id: string;
  /** The identifier of the subagent consultation. */
  consultation_id: string;
  /** The identifier of the function call that initiated the consultation. */
  call_id: string;
  /** The name of the consulted subagent. */
  subagent_name: string;
}

export function voiceAgentServerEventSessionSubagentCompletedSerializer(
  item: VoiceAgentServerEventSessionSubagentCompleted,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    consultation_id: item["consultation_id"],
    call_id: item["call_id"],
    subagent_name: item["subagent_name"],
  };
}

export function voiceAgentServerEventSessionSubagentCompletedDeserializer(
  item: any,
): VoiceAgentServerEventSessionSubagentCompleted {
  return {
    type: item["type"],
    event_id: item["event_id"],
    consultation_id: item["consultation_id"],
    call_id: item["call_id"],
    subagent_name: item["subagent_name"],
  };
}

/** The `session.subagent.aborted` server event. */
export interface VoiceAgentServerEventSessionSubagentAborted extends RealtimeServerEvent {
  /** The event type. Always `session.subagent.aborted`. */
  type: "session.subagent.aborted";
  /** The server-generated event identifier. */
  event_id: string;
  /** The identifier of the subagent consultation. */
  consultation_id: string;
  /** The identifier of the function call that initiated the consultation. */
  call_id: string;
  /** The name of the consulted subagent. */
  subagent_name: string;
  /** The reason the consultation was aborted. */
  reason: VoiceAgentSubagentAbortReason;
}

export function voiceAgentServerEventSessionSubagentAbortedSerializer(
  item: VoiceAgentServerEventSessionSubagentAborted,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    consultation_id: item["consultation_id"],
    call_id: item["call_id"],
    subagent_name: item["subagent_name"],
    reason: item["reason"],
  };
}

export function voiceAgentServerEventSessionSubagentAbortedDeserializer(
  item: any,
): VoiceAgentServerEventSessionSubagentAborted {
  return {
    type: item["type"],
    event_id: item["event_id"],
    consultation_id: item["consultation_id"],
    call_id: item["call_id"],
    subagent_name: item["subagent_name"],
    reason: item["reason"],
  };
}

/** The reason a subagent consultation was aborted. */
export type VoiceAgentSubagentAbortReason =
  "unknown_target" | "timeout" | "cancelled" | "stopped_by_user" | "superseded" | "failed";

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

/** The `rtc.call.sdp.created` server event: the SDP answer that completes WebRTC negotiation. */
export interface VoiceAgentServerEventRtcCallSdpCreated extends RealtimeServerEvent {
  /** The event type. Always `rtc.call.sdp.created`. */
  type: "rtc.call.sdp.created";
  /** The server-generated event identifier. */
  event_id: string;
  /** The identifier of the established WebRTC call. */
  rtc_call_id: string;
  /** The server's SDP answer for the WebRTC connection. */
  sdp_answer: string;
}

export function voiceAgentServerEventRtcCallSdpCreatedSerializer(
  item: VoiceAgentServerEventRtcCallSdpCreated,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    rtc_call_id: item["rtc_call_id"],
    sdp_answer: item["sdp_answer"],
  };
}

export function voiceAgentServerEventRtcCallSdpCreatedDeserializer(
  item: any,
): VoiceAgentServerEventRtcCallSdpCreated {
  return {
    type: item["type"],
    event_id: item["event_id"],
    rtc_call_id: item["rtc_call_id"],
    sdp_answer: item["sdp_answer"],
  };
}

/** The `rtc.call.error` server event: a WebRTC signaling failure. */
export interface VoiceAgentServerEventRtcCallError extends RealtimeServerEvent {
  /** The event type. Always `rtc.call.error`. */
  type: "rtc.call.error";
  /** An optional server-generated event identifier. */
  event_id?: string;
  /** The signaling operation that failed, when known. */
  operation?: string;
  /** The identifier of the WebRTC call, when known. */
  rtc_call_id?: string;
  /** The error detail. */
  error: VoiceAgentRtcCallErrorDetails;
}

export function voiceAgentServerEventRtcCallErrorSerializer(
  item: VoiceAgentServerEventRtcCallError,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    operation: item["operation"],
    rtc_call_id: item["rtc_call_id"],
    error: voiceAgentRtcCallErrorDetailsSerializer(item["error"]),
  };
}

export function voiceAgentServerEventRtcCallErrorDeserializer(
  item: any,
): VoiceAgentServerEventRtcCallError {
  return {
    type: item["type"],
    event_id: item["event_id"],
    operation: item["operation"],
    rtc_call_id: item["rtc_call_id"],
    error: voiceAgentRtcCallErrorDetailsDeserializer(item["error"]),
  };
}

/** Details of a WebRTC signaling error. */
export interface VoiceAgentRtcCallErrorDetails {
  /** The error category, following the VoiceLive wire contract: `invalid_request_error` for a client-side signaling fault (for example, a malformed SDP offer) or `server_error` for a service-side failure. Additional categories may be added over time. */
  type: VoiceAgentRtcCallErrorType;
  /** A machine-readable error code, when available. */
  code?: string;
  /** A human-readable error message. */
  message: string;
}

export function voiceAgentRtcCallErrorDetailsSerializer(item: VoiceAgentRtcCallErrorDetails): any {
  return { type: item["type"], code: item["code"], message: item["message"] };
}

export function voiceAgentRtcCallErrorDetailsDeserializer(
  item: any,
): VoiceAgentRtcCallErrorDetails {
  return {
    type: item["type"],
    code: item["code"],
    message: item["message"],
  };
}

/** The error categories reported for WebRTC signaling failures. */
export type VoiceAgentRtcCallErrorType = "invalid_request_error" | "server_error";

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

/** Type of VoiceAgentClientEventTypeExtension */
export type VoiceAgentClientEventTypeExtension = "session.avatar.connect" | "rtc.call.sdp.create";

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
  /**
   * Input items to include in the prompt for the model. Using this field
   *   creates a new context for this Response instead of using the default
   *   conversation. An empty array `[]` will clear the context for this Response.
   *   Note that this can include references to items that previously appeared in the session
   *   using their id.
   */
  input?: RealtimeResponseInputItem[];
  /** Modalities that the response may return. */
  output_modalities?: VoiceOutputModality[];
  /** Response-specific audio settings. */
  audio?: PickPropertiesVoiceAgentAudioConfig;
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
    input: !item["input"] ? item["input"] : realtimeResponseInputItemArraySerializer(item["input"]),
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    audio: !item["audio"]
      ? item["audio"]
      : pickPropertiesVoiceAgentAudioConfigSerializer(item["audio"]),
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
    input: !item["input"]
      ? item["input"]
      : realtimeResponseInputItemArrayDeserializer(item["input"]),
    output_modalities: !item["output_modalities"]
      ? item["output_modalities"]
      : item["output_modalities"].map((p: any) => {
          return p;
        }),
    audio: !item["audio"]
      ? item["audio"]
      : pickPropertiesVoiceAgentAudioConfigDeserializer(item["audio"]),
    pre_generated_assistant_message: !item["pre_generated_assistant_message"]
      ? item["pre_generated_assistant_message"]
      : realtimeConversationItemUnionDeserializer(item["pre_generated_assistant_message"]),
    interim_response: !item["interim_response"]
      ? item["interim_response"]
      : voiceAgentInterimResponseConfigUnionDeserializer(item["interim_response"]),
  };
}

/** The `rtc.call.sdp.create` client event: begins WebRTC signaling with an SDP offer. */
export interface VoiceAgentClientEventRtcCallSdpCreate extends RealtimeClientEvent {
  /** The event type. Always `rtc.call.sdp.create`. */
  type: "rtc.call.sdp.create";
  /** An optional client-generated event identifier. */
  event_id?: string;
  /** The client's SDP offer for the WebRTC connection. */
  sdp_offer: string;
  /** Optional session configuration. For an `/agents` endpoint the service rebuilds it authoritatively from the persisted agent definition. */
  session?: VoiceAgentSessionUpdateConfig;
}

export function voiceAgentClientEventRtcCallSdpCreateSerializer(
  item: VoiceAgentClientEventRtcCallSdpCreate,
): any {
  return {
    type: item["type"],
    event_id: item["event_id"],
    sdp_offer: item["sdp_offer"],
    session: !item["session"]
      ? item["session"]
      : voiceAgentSessionUpdateConfigSerializer(item["session"]),
  };
}

export function voiceAgentClientEventRtcCallSdpCreateDeserializer(
  item: any,
): VoiceAgentClientEventRtcCallSdpCreate {
  return {
    type: item["type"],
    event_id: item["event_id"],
    sdp_offer: item["sdp_offer"],
    session: !item["session"]
      ? item["session"]
      : voiceAgentSessionUpdateConfigDeserializer(item["session"]),
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

/** Decoded model-generated language-switch arguments, not a new client ingress. Unsupported speech components do not gain language support from this tool. */
export interface VoiceAgentLanguageDetectionArguments {
  /** Target language in lowercase ISO 639-1 format, such as es or fr. */
  language: string;
  /** Non-blank reason for switching the conversation language. */
  reason: string;
}

export function voiceAgentLanguageDetectionArgumentsDeserializer(
  item: any,
): VoiceAgentLanguageDetectionArguments {
  return {
    language: item["language"],
    reason: item["reason"],
  };
}

/** Arguments for starting a collection on a model call. */
export interface VoiceAgentCollectionStartArguments {
  /** Required; no default. True returns a private reference, false returns the value. Privacy cannot be downgraded after collection starts. */
  secret: boolean;
  /** Preferred bare name for the output variable, required for `secret: true` and forbidden otherwise. */
  output_variable_name?: string;
  /** The collection timeout in seconds, from 1 to 300, including receiver setup. Overrides the agent timeout; if both are omitted, defaults to 60 seconds. Duplicate calls do not reset the timeout. */
  timeout_seconds?: number;
}

export function voiceAgentCollectionStartArgumentsDeserializer(
  item: any,
): VoiceAgentCollectionStartArguments {
  return {
    secret: item["secret"],
    output_variable_name: item["output_variable_name"],
    timeout_seconds: item["timeout_seconds"],
  };
}

/** Model-call SMS collection arguments, validated before receiver setup. The model supplies the sender, not the collected SMS. */
export interface VoiceAgentCollectSmsStartArguments {
  /** Required; no default. True returns a private reference, false returns the value. Privacy cannot be downgraded after collection starts. */
  secret: boolean;
  /** Preferred bare name for the output variable, required for `secret: true` and forbidden otherwise. */
  output_variable_name?: string;
  /** The collection timeout in seconds, from 1 to 300, including receiver setup. Overrides the agent timeout; if both are omitted, defaults to 60 seconds. Duplicate calls do not reset the timeout. */
  timeout_seconds?: number;
  /** The expected SMS sender in canonical E.164 form, explicitly selected at start without Caller ID fallback. This is routing, not authenticated identity. */
  from_phone_number: string;
}

export function voiceAgentCollectSmsStartArgumentsDeserializer(
  item: any,
): VoiceAgentCollectSmsStartArguments {
  return {
    secret: item["secret"],
    output_variable_name: item["output_variable_name"],
    timeout_seconds: item["timeout_seconds"],
    from_phone_number: item["from_phone_number"],
  };
}

/** Arguments for starting DTMF collection on a model call. */
export interface VoiceAgentCollectDtmfStartArguments {
  /** Required; no default. True returns a private reference, false returns the value. Privacy cannot be downgraded after collection starts. */
  secret: boolean;
  /** Preferred bare name for the output variable, required for `secret: true` and forbidden otherwise. */
  output_variable_name?: string;
  /** The collection timeout in seconds, from 1 to 300, including receiver setup. Overrides the agent timeout; if both are omitted, defaults to 60 seconds. Duplicate calls do not reset the timeout. */
  timeout_seconds?: number;
  /** Required typed object selecting one completion policy and its parameters, not an array of simultaneous rules. */
  completion_mode: VoiceAgentDtmfCompletionMode;
  /** The maximum wait for the first digit in seconds, starting at receiver readiness and bounded by the remaining total deadline. Defaults to 15 seconds. */
  first_digit_timeout_seconds?: number;
}

export function voiceAgentCollectDtmfStartArgumentsDeserializer(
  item: any,
): VoiceAgentCollectDtmfStartArguments {
  return {
    secret: item["secret"],
    output_variable_name: item["output_variable_name"],
    timeout_seconds: item["timeout_seconds"],
    completion_mode: voiceAgentDtmfCompletionModeDeserializer(item["completion_mode"]),
    first_digit_timeout_seconds: item["first_digit_timeout_seconds"],
  };
}

/** One typed keypad completion policy. Unknown types, mixed-mode fields and legacy strings are rejected before receiver setup. */
export type VoiceAgentDtmfCompletionMode =
  | VoiceAgentDtmfFixedLengthCompletionMode
  | VoiceAgentDtmfTerminatorCompletionMode
  | VoiceAgentDtmfInterDigitSilenceCompletionMode;

export function voiceAgentDtmfCompletionModeDeserializer(item: any): VoiceAgentDtmfCompletionMode {
  return item;
}

/** Complete immediately after exactly length digits. Other modes' fields are not accepted. */
export interface VoiceAgentDtmfFixedLengthCompletionMode {
  /** The timeout in seconds between received digits, from 1 to 300, reset after each digit. Defaults to 5 seconds. */
  inter_digit_timeout_seconds?: number;
  /** Select fixed-length completion. */
  type: "fixed_length";
  /** The number of digits to collect; defaults to six. There is no terminator or separate minimum/maximum pair. */
  length?: number;
}

export function voiceAgentDtmfFixedLengthCompletionModeDeserializer(
  item: any,
): VoiceAgentDtmfFixedLengthCompletionMode {
  return {
    inter_digit_timeout_seconds: item["inter_digit_timeout_seconds"],
    type: item["type"],
    length: item["length"],
  };
}

/** Completes when the configured end key follows nonempty digits within service limits. No digit count or length bounds are configured. */
export interface VoiceAgentDtmfTerminatorCompletionMode {
  /** The timeout in seconds between received digits, from 1 to 300, reset after each digit. Defaults to 5 seconds. */
  inter_digit_timeout_seconds?: number;
  /** Select confirmation-key completion. */
  type: "terminator";
  /** Required confirmation key; excluded from the collected value. */
  terminator: VoiceAgentDtmfTerminator;
}

export function voiceAgentDtmfTerminatorCompletionModeDeserializer(
  item: any,
): VoiceAgentDtmfTerminatorCompletionMode {
  return {
    inter_digit_timeout_seconds: item["inter_digit_timeout_seconds"],
    type: item["type"],
    terminator: item["terminator"],
  };
}

/** The two non-numeric keypad keys permitted as confirmation terminators. */
export type VoiceAgentDtmfTerminator = "#" | "*";

/** Completes after nonempty input and an inter-digit pause, within service limits. No key or count is configured; total deadline expiry takes precedence. */
export interface VoiceAgentDtmfInterDigitSilenceCompletionMode {
  /** The timeout in seconds between received digits, from 1 to 300, reset after each digit. Defaults to 5 seconds. */
  inter_digit_timeout_seconds?: number;
  /** Select silence completion. */
  type: "inter_digit_silence";
}

export function voiceAgentDtmfInterDigitSilenceCompletionModeDeserializer(
  item: any,
): VoiceAgentDtmfInterDigitSilenceCompletionMode {
  return {
    inter_digit_timeout_seconds: item["inter_digit_timeout_seconds"],
    type: item["type"],
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

/** Live session resource reported to Foundry clients. GPT Live runs native client delegation for foundry_managed_agent sessions; Foundry reports the effective owner. */
export interface VoiceAgentLiveSessionResource {
  model: ModelIdsLive;
  instructions?: string;
  /** Ordered text-only history supplied before startup. Supports developer, user, and assistant messages with one text part each; at most 128 messages and a configured rendered-token limit (8,192 by default). */
  input?: LiveInitialItemUnion[];
  /** Startup audio configuration. Only primary WebSockets accept audio.format; WebRTC and SIP negotiate their media format. Voice and format are immutable after startup. */
  audio?: LiveInitialSessionAudioParam;
  /** At most one Decisions trigger per transcript event type. Triggers run independently of delegation. On update, omit triggers to keep the current configuration, send a list to replace it, or send an empty list to disable triggers. */
  triggers?: LiveDecisionTriggerInputParam[];
  /** Whether to store the session for later forking and recording download. Defaults to false for new sessions. */
  store?: boolean;
  /** Startup-only capabilities for an untrusted frontend attached to a unified WebRTC session. Trusted sideband connections are unaffected. */
  client?: LiveClientConfigParam;
  /** The unique ID of the Live session. Use this ID for sideband connections, forking, and recording download. */
  id: string;
  /** The Unix timestamp, in seconds, at which the Live session expires. */
  expires_at: number;
  /** The status of the session snapshot. Always `active`, including the final snapshot in session.closed; use the event type to determine that the session has closed. */
  status: "active";
  /** Delegation owner. foundry_managed_agent sessions report the pinned target, including the resolved agent_version. */
  delegation?: VoiceAgentLiveDelegationUnion;
}

export function voiceAgentLiveSessionResourceDeserializer(
  item: any,
): VoiceAgentLiveSessionResource {
  return {
    model: item["model"],
    instructions: item["instructions"],
    input: !item["input"] ? item["input"] : liveInitialItemUnionArrayDeserializer(item["input"]),
    audio: !item["audio"] ? item["audio"] : liveInitialSessionAudioParamDeserializer(item["audio"]),
    triggers: !item["triggers"]
      ? item["triggers"]
      : liveDecisionTriggerInputParamArrayDeserializer(item["triggers"]),
    store: item["store"],
    client: !item["client"] ? item["client"] : liveClientConfigParamDeserializer(item["client"]),
    id: item["id"],
    expires_at: item["expires_at"],
    status: item["status"],
    delegation: !item["delegation"]
      ? item["delegation"]
      : voiceAgentLiveDelegationUnionDeserializer(item["delegation"]),
  };
}

/** Live delegation trigger metadata reported to Foundry clients. This object contains metadata, not the task text. */
export interface VoiceAgentLiveDelegationItem {
  /** The unique ID of the delegation. Use this as delegation_id when replying to client-owned work or correlating backend events. */
  id: string;
  /** The object type, always `delegation`. */
  type: "delegation";
  /** The ID of the Responses API response associated with a Responses delegation. Omitted for client delegations. */
  response_id?: string;
  /** Where the work is handled. foundry_managed_agent sessions report foundry_managed_agent; GPT Live itself uses client. */
  target: VoiceAgentLiveDelegationTarget;
}

export function voiceAgentLiveDelegationItemDeserializer(item: any): VoiceAgentLiveDelegationItem {
  return {
    id: item["id"],
    type: item["type"],
    response_id: item["response_id"],
    target: item["target"],
  };
}

/** The kind-specific inputs for generating and creating an agent. */
export type GenerateAgentRequest = GenerateVoiceAgentRequest;

export function generateAgentRequestSerializer(item: GenerateAgentRequest): any {
  return item;
}

/** Alias for _ListVersionsRequestType */
export type _ListVersionsRequestType = EvaluatorType | "all";

export function _listVersionsRequestTypeSerializer(item: _ListVersionsRequestType): any {
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
  | VoiceAgentClientEventSessionAvatarConnect
  | VoiceAgentClientEventRtcCallSdpCreate;

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
  | VoiceAgentServerEventSystemToolArgumentsDelta
  | VoiceAgentServerEventSystemToolArgumentsDone
  | VoiceAgentServerEventInputCollectionStatus
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
  | VoiceAgentServerEventSessionSubagentStarted
  | VoiceAgentServerEventSessionSubagentCompleted
  | VoiceAgentServerEventSessionSubagentAborted
  | RealtimeServerEventSessionUpdated
  | RealtimeServerEventError
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
  | VoiceAgentServerEventSessionHandoffStarted
  | VoiceAgentServerEventSessionHandoffCompleted
  | VoiceAgentServerEventSessionHandoffAborted;

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

/** Type of AgentObjectType */
export type AgentObjectType =
  "agent" | "agent.version" | "agent.deleted" | "agent.version.deleted" | "agent.container";

/** Feature opt-in keys for agent definition operations supporting conditional preview features. */
export type AgentDefinitionOptInKeys =
  | "WorkflowAgents=V1Preview"
  | "ExternalAgents=V1Preview"
  | "DraftAgents=V1Preview"
  | "VoiceAgents=V1Preview"
  | "DigitalWorker=V1Preview"
  | "GitHubCopilot=V1Preview"
  | "Skills=V1Preview"
  | "MicrosoftCopilot=V1Preview";

/** Type of PageOrder */
export type PageOrder = "asc" | "desc";

/** Vocabulary for the `expand` query parameter on the candidate LIST endpoint. This open union keeps SDKs usable when new expand keys ship server-side. Multiple values are serialized as one comma-separated query parameter. */
export type AgentOptimizationCandidateExpand = "mutations";

/** Type of FoundryFeaturesOptInKeys */
export type FoundryFeaturesOptInKeys =
  | "Evaluations=V1Preview"
  | "Schedules=V1Preview"
  | "RedTeams=V1Preview"
  | "Insights=V1Preview"
  | "MemoryStores=V1Preview"
  | "Routines=V2Preview"
  | "Skills=V1Preview"
  | "DataGenerationJobs=V1Preview"
  | "Models=V1Preview"
  | "ModelRouterControls=V1Preview"
  | "FineTuningSessions=V1Preview";

/** The type of pending upload. */
export type PendingUploadType = "None" | "BlobReference" | "TemporaryBlobReference";

/** Type of MemoryStoreObjectType */
export type MemoryStoreObjectType =
  | "memory_store"
  | "memory_store.deleted"
  | "memory_store.scope.deleted"
  | "memory_store.item.deleted";

/** Microsoft Foundry API versions */
export enum KnownVersions {
  /** Microsoft Foundry API version v1. */
  v1 = "v1",
}

/** The transport used for a voice-agent connection. */
export type VoiceAgentTransport = "websocket" | "webrtc";

export type ToolboxesInvokeLatestToolboxMcpResponse = { body: any };

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

export type GetMicrosoft365PackageResponse = {
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

export type AgentsDownloadOptimizationJobFileResponse = {
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

export type VoiceAgentsConversationsDownloadAudioResponse = {
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

export type VoiceAgentsConversationsDownloadGeneratedAudioItemResponse = {
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

export type VoiceAgentsConversationsDownloadAudioItemResponse = {
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

export type BetaVoiceAgentsLiveConversationsDownloadAudioResponse = {
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

export type BetaVoiceAgentsLiveConversationsDownloadAudioItemResponse = {
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
