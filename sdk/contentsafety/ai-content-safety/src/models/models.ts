// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";
import { ErrorModel } from "@azure-rest/core-client";
import { uint8ArrayToString } from "@azure/core-util";

/** The image analysis request. */
export interface AnalyzeImageOptions {
  /** The image to be analyzed. */
  image: ImageData;
  /** The categories will be analyzed. If they are not assigned, a default set of analysis results for the categories will be returned. */
  categories?: ImageCategory[];
  /** This refers to the type of image analysis output. If no value is assigned, the default value will be "FourSeverityLevels". */
  outputType?: AnalyzeImageOutputType;
}

export function analyzeImageOptionsSerializer(item: AnalyzeImageOptions): any {
  return {
    image: imageDataSerializer(item["image"]),
    categories: !item["categories"]
      ? item["categories"]
      : item["categories"].map((p: any) => {
          return p;
        }),
    outputType: item["outputType"],
  };
}

/** The image can be either base64 encoded bytes or a blob URL. You can choose only one of these options. If both are provided, the request will be refused. The maximum image size is 2048 x 2048 pixels and should not exceed 4 MB, while the minimum image size is 50 x 50 pixels. */
export interface ImageData {
  /** The Base64 encoding of the image. */
  content?: Uint8Array;
  /** The blob url of the image. */
  blobUrl?: string;
}

export function imageDataSerializer(item: ImageData): any {
  return {
    content: !item["content"] ? item["content"] : uint8ArrayToString(item["content"], "base64"),
    blobUrl: item["blobUrl"],
  };
}

/** The harm category supported in Image content analysis. */
export type ImageCategory = "Hate" | "SelfHarm" | "Sexual" | "Violence";

/** The type of image analysis output. */
export type AnalyzeImageOutputType = "FourSeverityLevels";

/** The image analysis response. */
export interface AnalyzeImageResult {
  /** Analysis result for categories. */
  categoriesAnalysis: ImageCategoriesAnalysis[];
}

export function analyzeImageResultDeserializer(item: any): AnalyzeImageResult {
  return {
    categoriesAnalysis: imageCategoriesAnalysisArrayDeserializer(item["categoriesAnalysis"]),
  };
}

export function imageCategoriesAnalysisArrayDeserializer(
  result: Array<ImageCategoriesAnalysis>,
): any[] {
  return result.map((item) => {
    return imageCategoriesAnalysisDeserializer(item);
  });
}

/** Image analysis result. */
export interface ImageCategoriesAnalysis {
  /** The image analysis category. */
  category: ImageCategory;
  /** The value increases with the severity of the input content. The value of this field is determined by the output type specified in the request. The output type could be ‘FourSeverityLevels’, and the output value can be 0, 2, 4, 6. */
  severity?: number;
}

export function imageCategoriesAnalysisDeserializer(item: any): ImageCategoriesAnalysis {
  return {
    category: item["category"],
    severity: item["severity"],
  };
}

/** The text analysis request. */
export interface AnalyzeTextOptions {
  /** The text to be analyzed. We support a maximum of 10k Unicode characters (Unicode code points) in the text of one request. */
  text: string;
  /** The categories will be analyzed. If they are not assigned, a default set of analysis results for the categories will be returned. */
  categories?: TextCategory[];
  /** The names of blocklists. */
  blocklistNames?: string[];
  /** When set to true, further analyses of harmful content will not be performed in cases where blocklists are hit. When set to false, all analyses of harmful content will be performed, whether or not blocklists are hit. */
  haltOnBlocklistHit?: boolean;
  /** This refers to the type of text analysis output. If no value is assigned, the default value will be "FourSeverityLevels". */
  outputType?: AnalyzeTextOutputType;
}

export function analyzeTextOptionsSerializer(item: AnalyzeTextOptions): any {
  return {
    text: item["text"],
    categories: !item["categories"]
      ? item["categories"]
      : item["categories"].map((p: any) => {
          return p;
        }),
    blocklistNames: !item["blocklistNames"]
      ? item["blocklistNames"]
      : item["blocklistNames"].map((p: any) => {
          return p;
        }),
    haltOnBlocklistHit: item["haltOnBlocklistHit"],
    outputType: item["outputType"],
  };
}

/** The harm category supported in Text content analysis. */
export type TextCategory = "Hate" | "SelfHarm" | "Sexual" | "Violence";

/** The type of text analysis output. */
export type AnalyzeTextOutputType = "FourSeverityLevels" | "EightSeverityLevels";

/** The text analysis response. */
export interface AnalyzeTextResult {
  /** The blocklist match details. */
  blocklistsMatch?: TextBlocklistMatch[];
  /** Analysis result for categories. */
  categoriesAnalysis: TextCategoriesAnalysis[];
}

export function analyzeTextResultDeserializer(item: any): AnalyzeTextResult {
  return {
    blocklistsMatch: !item["blocklistsMatch"]
      ? item["blocklistsMatch"]
      : textBlocklistMatchArrayDeserializer(item["blocklistsMatch"]),
    categoriesAnalysis: textCategoriesAnalysisArrayDeserializer(item["categoriesAnalysis"]),
  };
}

export function textBlocklistMatchArrayDeserializer(result: Array<TextBlocklistMatch>): any[] {
  return result.map((item) => {
    return textBlocklistMatchDeserializer(item);
  });
}

/** The result of blocklist match. */
export interface TextBlocklistMatch {
  /** The name of the matched blocklist. */
  blocklistName: string;
  /** The ID of the matched item. */
  blocklistItemId: string;
  /** The content of the matched item. */
  blocklistItemText: string;
}

export function textBlocklistMatchDeserializer(item: any): TextBlocklistMatch {
  return {
    blocklistName: item["blocklistName"],
    blocklistItemId: item["blocklistItemId"],
    blocklistItemText: item["blocklistItemText"],
  };
}

export function textCategoriesAnalysisArrayDeserializer(
  result: Array<TextCategoriesAnalysis>,
): any[] {
  return result.map((item) => {
    return textCategoriesAnalysisDeserializer(item);
  });
}

/** Text analysis result. */
export interface TextCategoriesAnalysis {
  /** The text analysis category. */
  category: TextCategory;
  /** The value increases with the severity of the input content. The value of this field is determined by the output type specified in the request. The output type could be ‘FourSeverityLevels’ or ‘EightSeverity Levels’, and the output value can be 0, 2, 4, 6 or 0, 1, 2, 3, 4, 5, 6, or 7. */
  severity?: number;
}

export function textCategoriesAnalysisDeserializer(item: any): TextCategoriesAnalysis {
  return {
    category: item["category"],
    severity: item["severity"],
  };
}

/** The request of detecting potential protected material present in the given text. */
export interface DetectTextProtectedMaterialOptions {
  /** The text to be analyzed, which may contain protected material. The characters will be counted in Unicode code points. */
  text: string;
}

export function detectTextProtectedMaterialOptionsSerializer(
  item: DetectTextProtectedMaterialOptions,
): any {
  return { text: item["text"] };
}

/** The combined detection results of potential protected material. */
export interface DetectTextProtectedMaterialResult {
  /** Analysis result for the given text. */
  protectedMaterialAnalysis: TextProtectedMaterialAnalysisResult;
}

export function detectTextProtectedMaterialResultDeserializer(
  item: any,
): DetectTextProtectedMaterialResult {
  return {
    protectedMaterialAnalysis: textProtectedMaterialAnalysisResultDeserializer(
      item["protectedMaterialAnalysis"],
    ),
  };
}

/** The individual detection result of potential protected material. */
export interface TextProtectedMaterialAnalysisResult {
  /** Whether potential protected material is detected or not. */
  detected: boolean;
}

export function textProtectedMaterialAnalysisResultDeserializer(
  item: any,
): TextProtectedMaterialAnalysisResult {
  return {
    detected: item["detected"],
  };
}

/** The request of analyzing potential direct or indirect injection attacks. */
export interface ShieldPromptOptions {
  /** The user prompt to be analyzed, which may contain direct injection attacks. */
  userPrompt?: string;
  /** The documents to be analyzed, which may contain direct or indirect injection attacks. */
  documents?: string[];
}

export function shieldPromptOptionsSerializer(item: ShieldPromptOptions): any {
  return {
    userPrompt: item["userPrompt"],
    documents: !item["documents"]
      ? item["documents"]
      : item["documents"].map((p: any) => {
          return p;
        }),
  };
}

/** The combined analysis results of potential direct or indirect injection attacks. */
export interface ShieldPromptResult {
  /** Direct injection attacks analysis result for the given user prompt. */
  userPromptAnalysis?: UserPromptInjectionAnalysisResult;
  /** Direct and indirect injection attacks analysis result for the given documents. */
  documentsAnalysis?: DocumentInjectionAnalysisResult[];
}

export function shieldPromptResultDeserializer(item: any): ShieldPromptResult {
  return {
    userPromptAnalysis: !item["userPromptAnalysis"]
      ? item["userPromptAnalysis"]
      : userPromptInjectionAnalysisResultDeserializer(item["userPromptAnalysis"]),
    documentsAnalysis: !item["documentsAnalysis"]
      ? item["documentsAnalysis"]
      : documentInjectionAnalysisResultArrayDeserializer(item["documentsAnalysis"]),
  };
}

/** The individual analysis result of potential injection attacks in the given user prompt. */
export interface UserPromptInjectionAnalysisResult {
  /** Whether a potential injection attack is detected or not. */
  attackDetected: boolean;
}

export function userPromptInjectionAnalysisResultDeserializer(
  item: any,
): UserPromptInjectionAnalysisResult {
  return {
    attackDetected: item["attackDetected"],
  };
}

export function documentInjectionAnalysisResultArrayDeserializer(
  result: Array<DocumentInjectionAnalysisResult>,
): any[] {
  return result.map((item) => {
    return documentInjectionAnalysisResultDeserializer(item);
  });
}

/** The individual analysis result of potential injection attacks in the given documents. */
export interface DocumentInjectionAnalysisResult {
  /** Whether a potential injection attack is detected or not. */
  attackDetected: boolean;
}

export function documentInjectionAnalysisResultDeserializer(
  item: any,
): DocumentInjectionAnalysisResult {
  return {
    attackDetected: item["attackDetected"],
  };
}

/** Canonical Agent Hooks 0.1 context. The host supplies the exact point and a target equal to its point-specific payload. Authentication, policy selection and composition are transport or host configuration, not body fields. The service validates conditional payloads and target equality. */
export interface AgentContext {
  /** The supported Agent Hooks specification identifier. */
  spec: "agent-hooks/0.1";
  /** The lifecycle point being evaluated. */
  /** The discriminator possible values: agent_startup, input, pre_model_call, post_model_call, pre_tool_call, post_tool_call, output, agent_shutdown */
  interceptionPoint: AgentInterceptionPoint;
  /** UTC instant when the host constructed the context. */
  timestamp: Date;
  /** Strictly increasing, non-negative emission sequence within the session. */
  sequence: number;
  /** Agent definition metadata. */
  agent: AgentDefinition;
  /** Execution-session metadata. */
  session: AgentSession;
  /** The native JSON value under evaluation. It must equal the corresponding point payload and is the root addressed by a transform. */
  target: any;
  /** Initialization payload when available; required at agent_startup. */
  agentInit?: AgentInitialization;
  /** Input payload when available; required at input. */
  input?: AgentInput;
  /** Model metadata when available; required at both model-call points. */
  model?: AgentModel;
  /** Model messages when available; required at pre_model_call. */
  messages?: AgentMessage[];
  /** Optional model-request correlation identifier. */
  requestId?: string;
  /** Model response when available; required at post_model_call. */
  response?: AgentModelResult;
  /** Optional model token usage. */
  usage?: AgentModelUsage;
  /** Tool-call payload when available; required at both tool-call points. */
  toolCall?: AgentToolCall;
  /** Tool-result payload when available; required at post_tool_call. */
  toolResult?: AgentToolResult;
  /** Optional tools available to the host. */
  tools?: AgentToolDeclaration[];
  /** Output payload when available; required at output. */
  output?: AgentOutput;
  /** Session summary when available; required at agent_shutdown. */
  summary?: AgentSummary;
  /** Optional trace identifiers. */
  trace?: AgentTrace;
  /** Optional caller-reported tenant metadata. */
  tenant?: AgentTenant;
  /** Optional caller-reported actor metadata. */
  actor?: AgentActor;
  /** Optional caller-reported budget counters. */
  budgets?: AgentBudgets;
  /** Namespaced extension values. Namespace keys match ^[a-z][a-z0-9_]*$. Values are native JSON; caller extensions cannot override trusted service annotations. */
  extensions?: AgentContextExtensions;
}

export function agentContextSerializer(item: AgentContext): any {
  return {
    spec: item["spec"],
    interception_point: item["interceptionPoint"],
    timestamp: item["timestamp"].toISOString(),
    sequence: item["sequence"],
    agent: agentDefinitionSerializer(item["agent"]),
    session: agentSessionSerializer(item["session"]),
    target: item["target"],
    agent_init: !item["agentInit"]
      ? item["agentInit"]
      : agentInitializationSerializer(item["agentInit"]),
    input: !item["input"] ? item["input"] : agentInputSerializer(item["input"]),
    model: !item["model"] ? item["model"] : agentModelSerializer(item["model"]),
    messages: !item["messages"] ? item["messages"] : agentMessageArraySerializer(item["messages"]),
    request_id: item["requestId"],
    response: !item["response"] ? item["response"] : agentModelResultSerializer(item["response"]),
    usage: !item["usage"] ? item["usage"] : agentModelUsageSerializer(item["usage"]),
    tool_call: !item["toolCall"] ? item["toolCall"] : agentToolCallSerializer(item["toolCall"]),
    tool_result: !item["toolResult"]
      ? item["toolResult"]
      : agentToolResultSerializer(item["toolResult"]),
    tools: !item["tools"] ? item["tools"] : agentToolDeclarationArraySerializer(item["tools"]),
    output: !item["output"] ? item["output"] : agentOutputSerializer(item["output"]),
    summary: !item["summary"] ? item["summary"] : agentSummarySerializer(item["summary"]),
    trace: !item["trace"] ? item["trace"] : agentTraceSerializer(item["trace"]),
    tenant: !item["tenant"] ? item["tenant"] : agentTenantSerializer(item["tenant"]),
    actor: !item["actor"] ? item["actor"] : agentActorSerializer(item["actor"]),
    budgets: !item["budgets"] ? item["budgets"] : agentBudgetsSerializer(item["budgets"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : agentContextExtensionsSerializer(item["extensions"]),
  };
}

/** Alias for AgentContextUnion */
export type AgentContextUnion =
  | AgentStartupContext
  | AgentInputContext
  | AgentPreModelCallContext
  | AgentPostModelCallContext
  | AgentPreToolCallContext
  | AgentPostToolCallContext
  | AgentOutputContext
  | AgentShutdownContext;

export function agentContextUnionSerializer(item: AgentContextUnion): any {
  switch (item.interceptionPoint) {
    case "agent_startup":
      return agentStartupContextSerializer(item as AgentStartupContext);

    case "input":
      return agentInputContextSerializer(item as AgentInputContext);

    case "pre_model_call":
      return agentPreModelCallContextSerializer(item as AgentPreModelCallContext);

    case "post_model_call":
      return agentPostModelCallContextSerializer(item as AgentPostModelCallContext);

    case "pre_tool_call":
      return agentPreToolCallContextSerializer(item as AgentPreToolCallContext);

    case "post_tool_call":
      return agentPostToolCallContextSerializer(item as AgentPostToolCallContext);

    case "output":
      return agentOutputContextSerializer(item as AgentOutputContext);

    case "agent_shutdown":
      return agentShutdownContextSerializer(item as AgentShutdownContext);

    default:
      throw new TypeError("Unknown Agent Hooks interception point.");
  }
}

/** The closed set of Agent Hooks 0.1 interception points. The service never infers the point from the agent identifier. */
export type AgentInterceptionPoint =
  | "agent_startup"
  | "input"
  | "pre_model_call"
  | "post_model_call"
  | "pre_tool_call"
  | "post_tool_call"
  | "output"
  | "agent_shutdown";

/** Caller-supplied agent definition metadata. This metadata does not authorize policy selection or resource access. */
export interface AgentDefinition {
  /** Stable identifier of the agent definition, shared across its sessions. */
  id: string;
  /** Lowercase framework identifier. */
  framework: string;
  /** Optional display name. */
  name?: string;
  /** Optional agent definition version. */
  version?: string;
}

export function agentDefinitionSerializer(item: AgentDefinition): any {
  return {
    id: item["id"],
    framework: item["framework"],
    name: item["name"],
    version: item["version"],
  };
}

/** Caller-supplied execution-session metadata. */
export interface AgentSession {
  /** Stable identifier of the run or conversation. */
  id: string;
  /** Time the session started. */
  startedAt?: Date;
  /** Non-negative turn number, when available. */
  turn?: number;
}

export function agentSessionSerializer(item: AgentSession): any {
  return {
    id: item["id"],
    started_at: !item["startedAt"] ? item["startedAt"] : item["startedAt"].toISOString(),
    turn: item["turn"],
  };
}

/** The execution-session initialization payload. */
export interface AgentInitialization {
  /** Names of tools registered for this session. */
  toolsRegistered: string[];
}

export function agentInitializationSerializer(item: AgentInitialization): any {
  return {
    tools_registered: item["toolsRegistered"].map((p: any) => {
      return p;
    }),
  };
}

/** An input payload. Content is native JSON, not a JSON-encoded string. */
export interface AgentInput {
  /** The input content as a native JSON value. */
  content: any;
  /** The input origin. */
  role: AgentInputRole;
}

export function agentInputSerializer(item: AgentInput): any {
  return { content: item["content"], role: item["role"] };
}

/** The closed Agent Hooks input-origin set. */
export type AgentInputRole = "user" | "system" | "external";

/** Metadata for a model request or response. */
export interface AgentModel {
  /** Logical model identifier. */
  id: string;
  /** Optional model vendor. */
  vendor?: string;
  /** Optional model parameters as a JSON object. */
  params?: AgentJsonObject;
}

export function agentModelSerializer(item: AgentModel): any {
  return {
    id: item["id"],
    vendor: item["vendor"],
    params: !item["params"] ? item["params"] : agentJsonObjectSerializer(item["params"]),
  };
}

/** A native JSON object whose member values may be any JSON type, including null. */
export interface AgentJsonObject {
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function agentJsonObjectSerializer(item: AgentJsonObject): any {
  return { ...serializeRecord(item.additionalProperties ?? {}) };
}

export function agentJsonObjectDeserializer(item: any): AgentJsonObject {
  return {
    additionalProperties: serializeRecord(item, []),
  };
}

export function agentMessageArraySerializer(result: Array<AgentMessage>): any[] {
  return result.map((item) => {
    return agentMessageSerializer(item);
  });
}

/** One model message. */
export interface AgentMessage {
  /** The message role. */
  role: string;
  /** The message content as a native JSON value. */
  content: any;
}

export function agentMessageSerializer(item: AgentMessage): any {
  return { role: item["role"], content: item["content"] };
}

/** A completed model response. tool_calls is present even when it is an empty array. */
export interface AgentModelResult {
  /** Response content as a native JSON value, including null. */
  content: any;
  /** Tool calls proposed by the model, or an empty array. */
  toolCalls: AgentModelToolCall[];
  /** The model's finish reason. */
  finishReason: string;
}

export function agentModelResultSerializer(item: AgentModelResult): any {
  return {
    content: item["content"],
    tool_calls: agentModelToolCallArraySerializer(item["toolCalls"]),
    finish_reason: item["finishReason"],
  };
}

export function agentModelToolCallArraySerializer(result: Array<AgentModelToolCall>): any[] {
  return result.map((item) => {
    return agentModelToolCallSerializer(item);
  });
}

/** A tool call proposed by a model. */
export interface AgentModelToolCall {
  /** Optional model-supplied call identifier. */
  id?: string;
  /** The proposed tool name. */
  name: string;
  /** Proposed arguments as a native JSON object. */
  args: AgentJsonObject;
}

export function agentModelToolCallSerializer(item: AgentModelToolCall): any {
  return { id: item["id"], name: item["name"], args: agentJsonObjectSerializer(item["args"]) };
}

/** Optional model token usage. */
export interface AgentModelUsage {
  /** Non-negative prompt token count. */
  promptTokens?: number;
  /** Non-negative completion token count. */
  completionTokens?: number;
}

export function agentModelUsageSerializer(item: AgentModelUsage): any {
  return { prompt_tokens: item["promptTokens"], completion_tokens: item["completionTokens"] };
}

/** A tool invocation. For a completed call, args contains the arguments actually dispatched after any host-applied transform. */
export interface AgentToolCall {
  /** Tool-call identifier. */
  id: string;
  /** Tool name. */
  name: string;
  /** Arguments as a native JSON object. */
  args: AgentJsonObject;
  /** Optional host-defined content hash, comparable only within that host. */
  contentHash?: string;
}

export function agentToolCallSerializer(item: AgentToolCall): any {
  return {
    id: item["id"],
    name: item["name"],
    args: agentJsonObjectSerializer(item["args"]),
    content_hash: item["contentHash"],
  };
}

/** A completed tool result. */
export interface AgentToolResult {
  /** The native JSON result value, including null. */
  value: any;
  /** Whether the tool returned an error. */
  isError: boolean;
  /** Optional non-negative call duration in milliseconds. */
  durationMs?: number;
}

export function agentToolResultSerializer(item: AgentToolResult): any {
  return { value: item["value"], is_error: item["isError"], duration_ms: item["durationMs"] };
}

export function agentToolDeclarationArraySerializer(result: Array<AgentToolDeclaration>): any[] {
  return result.map((item) => {
    return agentToolDeclarationSerializer(item);
  });
}

/** A tool declaration available to the host. */
export interface AgentToolDeclaration {
  /** Tool name. */
  name: string;
  /** Optional tool description. */
  description?: string;
  /** Optional tool schema as a JSON object. */
  schema?: AgentJsonObject;
}

export function agentToolDeclarationSerializer(item: AgentToolDeclaration): any {
  return {
    name: item["name"],
    description: item["description"],
    schema: !item["schema"] ? item["schema"] : agentJsonObjectSerializer(item["schema"]),
  };
}

/** Output that the host has not yet released. */
export interface AgentOutput {
  /** Output content as a native JSON value. */
  content: any;
}

export function agentOutputSerializer(item: AgentOutput): any {
  return { content: item["content"] };
}

/** Caller-reported execution-session summary. The evaluation service does not initiate shutdown or undo previous actions. */
export interface AgentSummary {
  /** Why the session ended. */
  reason: AgentShutdownReason;
  /** Optional non-negative tool-call count. */
  toolCalls?: number;
  /** Optional non-negative error count. */
  errors?: number;
  /** Optional non-negative session duration in seconds. */
  durationSeconds?: number;
}

export function agentSummarySerializer(item: AgentSummary): any {
  return {
    reason: item["reason"],
    tool_calls: item["toolCalls"],
    errors: item["errors"],
    duration_seconds: item["durationSeconds"],
  };
}

/** The closed Agent Hooks session-ending reasons. */
export type AgentShutdownReason = "completed" | "error" | "cancelled";

/** Optional trace identifiers. */
export interface AgentTrace {
  /** Trace identifier. */
  traceId?: string;
  /** Span identifier. */
  spanId?: string;
}

export function agentTraceSerializer(item: AgentTrace): any {
  return { trace_id: item["traceId"], span_id: item["spanId"] };
}

/** Caller-reported tenant metadata, not an authorization fact. */
export interface AgentTenant {
  /** Optional tenant identifier. */
  id?: string;
  /** Optional tenant name. */
  name?: string;
}

export function agentTenantSerializer(item: AgentTenant): any {
  return { id: item["id"], name: item["name"] };
}

/** Caller-reported actor metadata, not an authorization fact. */
export interface AgentActor {
  /** Optional actor identifier. */
  id?: string;
  /** Optional actor kind. */
  kind?: AgentActorKind;
}

export function agentActorSerializer(item: AgentActor): any {
  return { id: item["id"], kind: item["kind"] };
}

/** The closed Agent Hooks actor-kind set. */
export type AgentActorKind = "human" | "service" | "agent";

/** Optional caller-reported budget counters. */
export interface AgentBudgets {
  /** Reported tool-call count. */
  toolCallCount?: number;
  /** Reported token count. */
  tokenCount?: number;
  /** Reported elapsed seconds. */
  elapsedSeconds?: number;
  /** Reported cost in US dollars. */
  costUsd?: number;
}

export function agentBudgetsSerializer(item: AgentBudgets): any {
  return {
    tool_call_count: item["toolCallCount"],
    token_count: item["tokenCount"],
    elapsed_seconds: item["elapsedSeconds"],
    cost_usd: item["costUsd"],
  };
}

/** Canonical namespaced extensions, including the optional Azure AI Content Safety (AACS) classifier-role bridge. */
export interface AgentContextExtensions {
  /** Optional Azure AI Content Safety (AACS) metadata; do not copy the legacy Unified Moderate body here. */
  aacs?: AacsContextExtension;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function agentContextExtensionsSerializer(item: AgentContextExtensions): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    aacs: !item["aacs"] ? item["aacs"] : aacsContextExtensionSerializer(item["aacs"]),
  };
}

/** Minimal Azure AI Content Safety (AACS) request metadata for existing non-Hooks classification paths. */
export interface AacsContextExtension {
  /** Optional original classifier subject role for existing Azure AI Content Safety (AACS) prompt, completion and tool paths when the canonical payload cannot represent it. Canonical payload roles take precedence; contradictory claims, unsupported roles, and use at model/startup/shutdown points are rejected. Point-derived roles are defaults only. This does not authorize a caller or change the interception point. */
  role?: AacsSubjectRole;
}

export function aacsContextExtensionSerializer(item: AacsContextExtension): any {
  return { role: item["role"] };
}

/** Classifier subject roles used by existing Azure AI Content Safety (AACS) and Azure OpenAI (AOAI) flows. This is not actor identity or an authorization claim. */
export type AacsSubjectRole = "user" | "system" | "assistant" | "tool" | "function" | (string & {});

/** Startup context. target equals agent_init; a host must reject startup transforms. */
export interface AgentStartupContext extends AgentContext {
  interceptionPoint: "agent_startup";
  agentInit: AgentInitialization;
}

export function agentStartupContextSerializer(item: AgentStartupContext): any {
  return {
    spec: item["spec"],
    interception_point: item["interceptionPoint"],
    timestamp: item["timestamp"].toISOString(),
    sequence: item["sequence"],
    agent: agentDefinitionSerializer(item["agent"]),
    session: agentSessionSerializer(item["session"]),
    target: agentInitializationSerializer(item["target"] as AgentInitialization),
    agent_init: agentInitializationSerializer(item["agentInit"]),
    input: !item["input"] ? item["input"] : agentInputSerializer(item["input"]),
    model: !item["model"] ? item["model"] : agentModelSerializer(item["model"]),
    messages: !item["messages"] ? item["messages"] : agentMessageArraySerializer(item["messages"]),
    request_id: item["requestId"],
    response: !item["response"] ? item["response"] : agentModelResultSerializer(item["response"]),
    usage: !item["usage"] ? item["usage"] : agentModelUsageSerializer(item["usage"]),
    tool_call: !item["toolCall"] ? item["toolCall"] : agentToolCallSerializer(item["toolCall"]),
    tool_result: !item["toolResult"]
      ? item["toolResult"]
      : agentToolResultSerializer(item["toolResult"]),
    tools: !item["tools"] ? item["tools"] : agentToolDeclarationArraySerializer(item["tools"]),
    output: !item["output"] ? item["output"] : agentOutputSerializer(item["output"]),
    summary: !item["summary"] ? item["summary"] : agentSummarySerializer(item["summary"]),
    trace: !item["trace"] ? item["trace"] : agentTraceSerializer(item["trace"]),
    tenant: !item["tenant"] ? item["tenant"] : agentTenantSerializer(item["tenant"]),
    actor: !item["actor"] ? item["actor"] : agentActorSerializer(item["actor"]),
    budgets: !item["budgets"] ? item["budgets"] : agentBudgetsSerializer(item["budgets"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : agentContextExtensionsSerializer(item["extensions"]),
  };
}

/** Input context. target equals the complete input object, not only its content. */
export interface AgentInputContext extends AgentContext {
  interceptionPoint: "input";
  input: AgentInput;
}

export function agentInputContextSerializer(item: AgentInputContext): any {
  return {
    spec: item["spec"],
    interception_point: item["interceptionPoint"],
    timestamp: item["timestamp"].toISOString(),
    sequence: item["sequence"],
    agent: agentDefinitionSerializer(item["agent"]),
    session: agentSessionSerializer(item["session"]),
    target: agentInputSerializer(item["target"] as AgentInput),
    agent_init: !item["agentInit"]
      ? item["agentInit"]
      : agentInitializationSerializer(item["agentInit"]),
    input: agentInputSerializer(item["input"]),
    model: !item["model"] ? item["model"] : agentModelSerializer(item["model"]),
    messages: !item["messages"] ? item["messages"] : agentMessageArraySerializer(item["messages"]),
    request_id: item["requestId"],
    response: !item["response"] ? item["response"] : agentModelResultSerializer(item["response"]),
    usage: !item["usage"] ? item["usage"] : agentModelUsageSerializer(item["usage"]),
    tool_call: !item["toolCall"] ? item["toolCall"] : agentToolCallSerializer(item["toolCall"]),
    tool_result: !item["toolResult"]
      ? item["toolResult"]
      : agentToolResultSerializer(item["toolResult"]),
    tools: !item["tools"] ? item["tools"] : agentToolDeclarationArraySerializer(item["tools"]),
    output: !item["output"] ? item["output"] : agentOutputSerializer(item["output"]),
    summary: !item["summary"] ? item["summary"] : agentSummarySerializer(item["summary"]),
    trace: !item["trace"] ? item["trace"] : agentTraceSerializer(item["trace"]),
    tenant: !item["tenant"] ? item["tenant"] : agentTenantSerializer(item["tenant"]),
    actor: !item["actor"] ? item["actor"] : agentActorSerializer(item["actor"]),
    budgets: !item["budgets"] ? item["budgets"] : agentBudgetsSerializer(item["budgets"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : agentContextExtensionsSerializer(item["extensions"]),
  };
}

/** Pre-model context. target equals the messages array actually proposed for dispatch. */
export interface AgentPreModelCallContext extends AgentContext {
  interceptionPoint: "pre_model_call";
  model: AgentModel;
  messages: AgentMessage[];
}

export function agentPreModelCallContextSerializer(item: AgentPreModelCallContext): any {
  return {
    spec: item["spec"],
    interception_point: item["interceptionPoint"],
    timestamp: item["timestamp"].toISOString(),
    sequence: item["sequence"],
    agent: agentDefinitionSerializer(item["agent"]),
    session: agentSessionSerializer(item["session"]),
    target: agentMessageArraySerializer(item["target"] as AgentMessage[]),
    agent_init: !item["agentInit"]
      ? item["agentInit"]
      : agentInitializationSerializer(item["agentInit"]),
    input: !item["input"] ? item["input"] : agentInputSerializer(item["input"]),
    model: agentModelSerializer(item["model"]),
    messages: agentMessageArraySerializer(item["messages"]),
    request_id: item["requestId"],
    response: !item["response"] ? item["response"] : agentModelResultSerializer(item["response"]),
    usage: !item["usage"] ? item["usage"] : agentModelUsageSerializer(item["usage"]),
    tool_call: !item["toolCall"] ? item["toolCall"] : agentToolCallSerializer(item["toolCall"]),
    tool_result: !item["toolResult"]
      ? item["toolResult"]
      : agentToolResultSerializer(item["toolResult"]),
    tools: !item["tools"] ? item["tools"] : agentToolDeclarationArraySerializer(item["tools"]),
    output: !item["output"] ? item["output"] : agentOutputSerializer(item["output"]),
    summary: !item["summary"] ? item["summary"] : agentSummarySerializer(item["summary"]),
    trace: !item["trace"] ? item["trace"] : agentTraceSerializer(item["trace"]),
    tenant: !item["tenant"] ? item["tenant"] : agentTenantSerializer(item["tenant"]),
    actor: !item["actor"] ? item["actor"] : agentActorSerializer(item["actor"]),
    budgets: !item["budgets"] ? item["budgets"] : agentBudgetsSerializer(item["budgets"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : agentContextExtensionsSerializer(item["extensions"]),
  };
}

/** Post-model context. target equals the complete response object; the service cannot undo the model call. */
export interface AgentPostModelCallContext extends AgentContext {
  interceptionPoint: "post_model_call";
  model: AgentModel;
  response: AgentModelResult;
}

export function agentPostModelCallContextSerializer(item: AgentPostModelCallContext): any {
  return {
    spec: item["spec"],
    interception_point: item["interceptionPoint"],
    timestamp: item["timestamp"].toISOString(),
    sequence: item["sequence"],
    agent: agentDefinitionSerializer(item["agent"]),
    session: agentSessionSerializer(item["session"]),
    target: agentModelResultSerializer(item["target"] as AgentModelResult),
    agent_init: !item["agentInit"]
      ? item["agentInit"]
      : agentInitializationSerializer(item["agentInit"]),
    input: !item["input"] ? item["input"] : agentInputSerializer(item["input"]),
    model: agentModelSerializer(item["model"]),
    messages: !item["messages"] ? item["messages"] : agentMessageArraySerializer(item["messages"]),
    request_id: item["requestId"],
    response: agentModelResultSerializer(item["response"]),
    usage: !item["usage"] ? item["usage"] : agentModelUsageSerializer(item["usage"]),
    tool_call: !item["toolCall"] ? item["toolCall"] : agentToolCallSerializer(item["toolCall"]),
    tool_result: !item["toolResult"]
      ? item["toolResult"]
      : agentToolResultSerializer(item["toolResult"]),
    tools: !item["tools"] ? item["tools"] : agentToolDeclarationArraySerializer(item["tools"]),
    output: !item["output"] ? item["output"] : agentOutputSerializer(item["output"]),
    summary: !item["summary"] ? item["summary"] : agentSummarySerializer(item["summary"]),
    trace: !item["trace"] ? item["trace"] : agentTraceSerializer(item["trace"]),
    tenant: !item["tenant"] ? item["tenant"] : agentTenantSerializer(item["tenant"]),
    actor: !item["actor"] ? item["actor"] : agentActorSerializer(item["actor"]),
    budgets: !item["budgets"] ? item["budgets"] : agentBudgetsSerializer(item["budgets"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : agentContextExtensionsSerializer(item["extensions"]),
  };
}

/** Pre-tool context. target equals tool_call.args. */
export interface AgentPreToolCallContext extends AgentContext {
  interceptionPoint: "pre_tool_call";
  toolCall: AgentToolCall;
}

export function agentPreToolCallContextSerializer(item: AgentPreToolCallContext): any {
  return {
    spec: item["spec"],
    interception_point: item["interceptionPoint"],
    timestamp: item["timestamp"].toISOString(),
    sequence: item["sequence"],
    agent: agentDefinitionSerializer(item["agent"]),
    session: agentSessionSerializer(item["session"]),
    target: agentJsonObjectSerializer(item["toolCall"].args),
    agent_init: !item["agentInit"]
      ? item["agentInit"]
      : agentInitializationSerializer(item["agentInit"]),
    input: !item["input"] ? item["input"] : agentInputSerializer(item["input"]),
    model: !item["model"] ? item["model"] : agentModelSerializer(item["model"]),
    messages: !item["messages"] ? item["messages"] : agentMessageArraySerializer(item["messages"]),
    request_id: item["requestId"],
    response: !item["response"] ? item["response"] : agentModelResultSerializer(item["response"]),
    usage: !item["usage"] ? item["usage"] : agentModelUsageSerializer(item["usage"]),
    tool_call: agentToolCallSerializer(item["toolCall"]),
    tool_result: !item["toolResult"]
      ? item["toolResult"]
      : agentToolResultSerializer(item["toolResult"]),
    tools: !item["tools"] ? item["tools"] : agentToolDeclarationArraySerializer(item["tools"]),
    output: !item["output"] ? item["output"] : agentOutputSerializer(item["output"]),
    summary: !item["summary"] ? item["summary"] : agentSummarySerializer(item["summary"]),
    trace: !item["trace"] ? item["trace"] : agentTraceSerializer(item["trace"]),
    tenant: !item["tenant"] ? item["tenant"] : agentTenantSerializer(item["tenant"]),
    actor: !item["actor"] ? item["actor"] : agentActorSerializer(item["actor"]),
    budgets: !item["budgets"] ? item["budgets"] : agentBudgetsSerializer(item["budgets"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : agentContextExtensionsSerializer(item["extensions"]),
  };
}

/** Post-tool context. target equals tool_result.value; the service cannot undo the tool call. */
export interface AgentPostToolCallContext extends AgentContext {
  interceptionPoint: "post_tool_call";
  toolCall: AgentToolCall;
  toolResult: AgentToolResult;
}

export function agentPostToolCallContextSerializer(item: AgentPostToolCallContext): any {
  return {
    spec: item["spec"],
    interception_point: item["interceptionPoint"],
    timestamp: item["timestamp"].toISOString(),
    sequence: item["sequence"],
    agent: agentDefinitionSerializer(item["agent"]),
    session: agentSessionSerializer(item["session"]),
    target: item["toolResult"].value,
    agent_init: !item["agentInit"]
      ? item["agentInit"]
      : agentInitializationSerializer(item["agentInit"]),
    input: !item["input"] ? item["input"] : agentInputSerializer(item["input"]),
    model: !item["model"] ? item["model"] : agentModelSerializer(item["model"]),
    messages: !item["messages"] ? item["messages"] : agentMessageArraySerializer(item["messages"]),
    request_id: item["requestId"],
    response: !item["response"] ? item["response"] : agentModelResultSerializer(item["response"]),
    usage: !item["usage"] ? item["usage"] : agentModelUsageSerializer(item["usage"]),
    tool_call: agentToolCallSerializer(item["toolCall"]),
    tool_result: agentToolResultSerializer(item["toolResult"]),
    tools: !item["tools"] ? item["tools"] : agentToolDeclarationArraySerializer(item["tools"]),
    output: !item["output"] ? item["output"] : agentOutputSerializer(item["output"]),
    summary: !item["summary"] ? item["summary"] : agentSummarySerializer(item["summary"]),
    trace: !item["trace"] ? item["trace"] : agentTraceSerializer(item["trace"]),
    tenant: !item["tenant"] ? item["tenant"] : agentTenantSerializer(item["tenant"]),
    actor: !item["actor"] ? item["actor"] : agentActorSerializer(item["actor"]),
    budgets: !item["budgets"] ? item["budgets"] : agentBudgetsSerializer(item["budgets"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : agentContextExtensionsSerializer(item["extensions"]),
  };
}

/** Output context. target equals the complete output object. */
export interface AgentOutputContext extends AgentContext {
  interceptionPoint: "output";
  output: AgentOutput;
}

export function agentOutputContextSerializer(item: AgentOutputContext): any {
  return {
    spec: item["spec"],
    interception_point: item["interceptionPoint"],
    timestamp: item["timestamp"].toISOString(),
    sequence: item["sequence"],
    agent: agentDefinitionSerializer(item["agent"]),
    session: agentSessionSerializer(item["session"]),
    target: agentOutputSerializer(item["target"] as AgentOutput),
    agent_init: !item["agentInit"]
      ? item["agentInit"]
      : agentInitializationSerializer(item["agentInit"]),
    input: !item["input"] ? item["input"] : agentInputSerializer(item["input"]),
    model: !item["model"] ? item["model"] : agentModelSerializer(item["model"]),
    messages: !item["messages"] ? item["messages"] : agentMessageArraySerializer(item["messages"]),
    request_id: item["requestId"],
    response: !item["response"] ? item["response"] : agentModelResultSerializer(item["response"]),
    usage: !item["usage"] ? item["usage"] : agentModelUsageSerializer(item["usage"]),
    tool_call: !item["toolCall"] ? item["toolCall"] : agentToolCallSerializer(item["toolCall"]),
    tool_result: !item["toolResult"]
      ? item["toolResult"]
      : agentToolResultSerializer(item["toolResult"]),
    tools: !item["tools"] ? item["tools"] : agentToolDeclarationArraySerializer(item["tools"]),
    output: agentOutputSerializer(item["output"]),
    summary: !item["summary"] ? item["summary"] : agentSummarySerializer(item["summary"]),
    trace: !item["trace"] ? item["trace"] : agentTraceSerializer(item["trace"]),
    tenant: !item["tenant"] ? item["tenant"] : agentTenantSerializer(item["tenant"]),
    actor: !item["actor"] ? item["actor"] : agentActorSerializer(item["actor"]),
    budgets: !item["budgets"] ? item["budgets"] : agentBudgetsSerializer(item["budgets"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : agentContextExtensionsSerializer(item["extensions"]),
  };
}

/** Shutdown context. target equals summary; a host must reject shutdown transforms. */
export interface AgentShutdownContext extends AgentContext {
  interceptionPoint: "agent_shutdown";
  summary: AgentSummary;
}

export function agentShutdownContextSerializer(item: AgentShutdownContext): any {
  return {
    spec: item["spec"],
    interception_point: item["interceptionPoint"],
    timestamp: item["timestamp"].toISOString(),
    sequence: item["sequence"],
    agent: agentDefinitionSerializer(item["agent"]),
    session: agentSessionSerializer(item["session"]),
    target: agentSummarySerializer(item["target"] as AgentSummary),
    agent_init: !item["agentInit"]
      ? item["agentInit"]
      : agentInitializationSerializer(item["agentInit"]),
    input: !item["input"] ? item["input"] : agentInputSerializer(item["input"]),
    model: !item["model"] ? item["model"] : agentModelSerializer(item["model"]),
    messages: !item["messages"] ? item["messages"] : agentMessageArraySerializer(item["messages"]),
    request_id: item["requestId"],
    response: !item["response"] ? item["response"] : agentModelResultSerializer(item["response"]),
    usage: !item["usage"] ? item["usage"] : agentModelUsageSerializer(item["usage"]),
    tool_call: !item["toolCall"] ? item["toolCall"] : agentToolCallSerializer(item["toolCall"]),
    tool_result: !item["toolResult"]
      ? item["toolResult"]
      : agentToolResultSerializer(item["toolResult"]),
    tools: !item["tools"] ? item["tools"] : agentToolDeclarationArraySerializer(item["tools"]),
    output: !item["output"] ? item["output"] : agentOutputSerializer(item["output"]),
    summary: agentSummarySerializer(item["summary"]),
    trace: !item["trace"] ? item["trace"] : agentTraceSerializer(item["trace"]),
    tenant: !item["tenant"] ? item["tenant"] : agentTenantSerializer(item["tenant"]),
    actor: !item["actor"] ? item["actor"] : agentActorSerializer(item["actor"]),
    budgets: !item["budgets"] ? item["budgets"] : agentBudgetsSerializer(item["budgets"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : agentContextExtensionsSerializer(item["extensions"]),
  };
}

/** October Unified Moderate transport response. Verdict is the canonical closed Agent Hooks object. Receipt is separate transport metadata used by the host to fence enforcement and join later host-action evidence. */
export interface AgentEvaluationResult {
  /** Canonical aggregate Agent Hooks Verdict. */
  verdict: AgentVerdictUnion;
  /** Policy-evaluation receipt for this attempt. */
  receipt: AgentPolicyEvaluationReceiptUnion;
}

export function agentEvaluationResultDeserializer(item: any): AgentEvaluationResult {
  return {
    verdict: agentVerdictUnionDeserializer(item["verdict"]),
    receipt: agentPolicyEvaluationReceiptUnionDeserializer(item["receipt"]),
  };
}

/** Canonical closed Agent Hooks Verdict. HTTP 200 indicates evaluation completed, not permission to proceed. Azure AI Content Safety composes the applicable selected, bound, subscription and hierarchy policies within this evaluation. The calling host owns composition across independent interceptors, transform application, final enforcement, approvals, timeouts and audit. The service does not add transport or policy-evaluation metadata to this object. */
export interface AgentVerdict {
  /** Canonical decision: allow, deny or transform. */
  /** The discriminator possible values: allow, deny, transform */
  decision: AgentDecision;
  /** Optional machine-readable reason. host_error: is reserved for host-synthesized failures. */
  reason?: string | null;
  /** Optional human-readable message. */
  message?: string | null;
  /** Optional structured, non-blocking warnings. */
  warnings?: AgentWarning[] | null;
  /** Optional opaque evidence pointer. */
  evidence?: AgentEvidence;
  /** Optional labels. The host persists labels with produced data only if the action proceeds and resurfaces them on later derived contexts. */
  resultLabels?: string[] | null;
}

export function agentVerdictDeserializer(item: any): AgentVerdict {
  return {
    decision: item["decision"],
    reason: item["reason"],
    message: item["message"],
    warnings: !item["warnings"]
      ? item["warnings"]
      : agentWarningArrayDeserializer(item["warnings"]),
    evidence: !item["evidence"] ? item["evidence"] : agentEvidenceDeserializer(item["evidence"]),
    resultLabels: !item["result_labels"]
      ? item["result_labels"]
      : item["result_labels"].map((p1: any) => {
          return p1;
        }),
  };
}

/** Alias for AgentVerdictUnion */
export type AgentVerdictUnion = AgentAllowVerdict | AgentDenyVerdict | AgentTransformVerdict;

export function agentVerdictUnionDeserializer(item: any): AgentVerdictUnion {
  switch (item["decision"]) {
    case "allow":
      return agentAllowVerdictDeserializer(item as AgentAllowVerdict);

    case "deny":
      return agentDenyVerdictDeserializer(item as AgentDenyVerdict);

    case "transform":
      return agentTransformVerdictDeserializer(item as AgentTransformVerdict);

    default:
      throw new TypeError("Unknown Agent Hooks decision.");
  }
}

/** The three canonical Agent Hooks decisions. */
export type AgentDecision = "allow" | "deny" | "transform";

export function agentWarningArrayDeserializer(result: Array<AgentWarning>): any[] {
  return result.map((item) => {
    return agentWarningDeserializer(item);
  });
}

/** A non-blocking concern. Both reason and message are preserved when present. */
export interface AgentWarning {
  /** Optional machine-readable reason, excluding the host_error: namespace. */
  reason?: string | null;
  /** Optional human-readable message. */
  message?: string | null;
}

export function agentWarningDeserializer(item: any): AgentWarning {
  return {
    reason: item["reason"],
    message: item["message"],
  };
}

/** An opaque offline-verifiable evidence pointer. The host must not automatically dereference verification pointers. Its canonical JSON representation is limited to 10,240 UTF-8 bytes. */
export interface AgentEvidence {
  /** Optional content address or URI of an evidence artefact. */
  artefact?: string | null;
  /** Optional named verification pointers. */
  verificationPointers?: Record<string, string>;
}

export function agentEvidenceDeserializer(item: any): AgentEvidence {
  return {
    artefact: item["artefact"],
    verificationPointers: !item["verification_pointers"]
      ? item["verification_pointers"]
      : Object.fromEntries(
          Object.entries(item["verification_pointers"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Permit the original target without mutation. */
export interface AgentAllowVerdict extends AgentVerdict {
  decision: "allow";
}

export function agentAllowVerdictDeserializer(item: any): AgentAllowVerdict {
  return {
    decision: item["decision"],
    reason: item["reason"],
    message: item["message"],
    warnings: !item["warnings"]
      ? item["warnings"]
      : agentWarningArrayDeserializer(item["warnings"]),
    evidence: !item["evidence"] ? item["evidence"] : agentEvidenceDeserializer(item["evidence"]),
    resultLabels: !item["result_labels"]
      ? item["result_labels"]
      : item["result_labels"].map((p1: any) => {
          return p1;
        }),
  };
}

/** Deny the action. Approval metadata makes a deny liftable only by the host's configured approval seam; without a resolver it remains denied. An unconditional mandatory deny cannot be lifted by another policy's approval. */
export interface AgentDenyVerdict extends AgentVerdict {
  decision: "deny";
  /** Optional complete approval metadata as a native JSON object, which may be empty. */
  approval?: AgentJsonObject;
}

export function agentDenyVerdictDeserializer(item: any): AgentDenyVerdict {
  return {
    decision: item["decision"],
    reason: item["reason"],
    message: item["message"],
    warnings: !item["warnings"]
      ? item["warnings"]
      : agentWarningArrayDeserializer(item["warnings"]),
    evidence: !item["evidence"] ? item["evidence"] : agentEvidenceDeserializer(item["evidence"]),
    resultLabels: !item["result_labels"]
      ? item["result_labels"]
      : item["result_labels"].map((p1: any) => {
          return p1;
        }),
    approval: !item["approval"] ? item["approval"] : agentJsonObjectDeserializer(item["approval"]),
  };
}

/** Permit only after the host applies the specified transform. The service does not apply it. */
export interface AgentTransformVerdict extends AgentVerdict {
  decision: "transform";
  /** Required transform metadata. */
  transform: AgentTransform;
}

export function agentTransformVerdictDeserializer(item: any): AgentTransformVerdict {
  return {
    decision: item["decision"],
    reason: item["reason"],
    message: item["message"],
    warnings: !item["warnings"]
      ? item["warnings"]
      : agentWarningArrayDeserializer(item["warnings"]),
    evidence: !item["evidence"] ? item["evidence"] : agentEvidenceDeserializer(item["evidence"]),
    resultLabels: !item["result_labels"]
      ? item["result_labels"]
      : item["result_labels"].map((p1: any) => {
          return p1;
        }),
    transform: agentTransformDeserializer(item["transform"]),
  };
}

/** A replacement the host applies to its target, not a transform already applied by the service. */
export interface AgentTransform {
  /** Path rooted at $target using dot members, bracket indices or quoted members. The deprecated $policy_target alias is accepted by Agent Hooks 0.1. The host rejects unresolvable paths and startup/shutdown transforms. */
  path: string;
  /** Native JSON replacement value, including null. An absent member is equivalent to null; structured values are never JSON-encoded strings. */
  value?: any;
}

export function agentTransformDeserializer(item: any): AgentTransform {
  return {
    path: item["path"],
    value: item["value"],
  };
}

/** Common versioned receipt fields for one AACS evaluation attempt. The receipt proves what was evaluated; it does not replace the Verdict or prove that the calling host enforced it. */
export interface AgentPolicyEvaluationReceipt {
  /** Receipt schema version. This version is tied to the October transport contract rather than customer-controlled feature activation. */
  receiptVersion: "2026-10-15-preview";
  /** Hosted evaluation profile. */
  /** The discriminator possible values: foundryProject, namedPolicy */
  profile: AgentEvaluationProfile;
  /** Stable evaluation identifier used to join AACS evaluation evidence to a separate host action or release attestation. */
  evaluationId: string;
  /** One-based attempt number for evaluation retries sharing the same evaluation identifier. */
  attempt: number;
  /** Binding to the exact API version, AgentContext and admitted selector values evaluated in this attempt. */
  requestBinding: AgentEvaluationRequestBinding;
  /** Exact policy layers evaluated and composed into the aggregate Verdict. */
  evaluatedPolicyLayers: AgentEvaluatedPolicyLayer[];
  /** The single intervention point evaluated by this receipt. */
  evaluatedInterventionPoint: AgentInterceptionPoint;
  /** Intervention points required by every applicable policy layer. This states policy requirements, not host support and not points executed in this evaluation. */
  requiredInterventionPoints: AgentInterceptionPoint[];
  /** AACS host-profile version included in executable artifact identity. */
  hostProfileVersion: string;
  /** Authenticated producer resource ID established by the service transport. This value is service-derived and never accepted from the request body or a customer-settable identity header. */
  authenticatedProducerResourceId: string;
  /** Optional public classifier summaries keyed by harm category. numericSeverity preserves the existing ordinal 0–7 result; raw model scores and internal diagnostics are not exposed. */
  harmResults?: Record<string, AgentHarmResult>;
}

export function agentPolicyEvaluationReceiptDeserializer(item: any): AgentPolicyEvaluationReceipt {
  return {
    receiptVersion: item["receiptVersion"],
    profile: item["profile"],
    evaluationId: item["evaluationId"],
    attempt: item["attempt"],
    requestBinding: agentEvaluationRequestBindingDeserializer(item["requestBinding"]),
    evaluatedPolicyLayers: agentEvaluatedPolicyLayerArrayDeserializer(
      item["evaluatedPolicyLayers"],
    ),
    evaluatedInterventionPoint: item["evaluatedInterventionPoint"],
    requiredInterventionPoints: item["requiredInterventionPoints"].map((p: any) => {
      return p;
    }),
    hostProfileVersion: item["hostProfileVersion"],
    authenticatedProducerResourceId: item["authenticatedProducerResourceId"],
    harmResults: !item["harmResults"]
      ? item["harmResults"]
      : agentHarmResultRecordDeserializer(item["harmResults"]),
  };
}

/** Alias for AgentPolicyEvaluationReceiptUnion */
export type AgentPolicyEvaluationReceiptUnion =
  AgentFoundryProjectReceipt | AgentNamedPolicyReceipt;

export function agentPolicyEvaluationReceiptUnionDeserializer(
  item: any,
): AgentPolicyEvaluationReceiptUnion {
  switch (item["profile"]) {
    case "foundryProject":
      return agentFoundryProjectReceiptDeserializer(item as AgentFoundryProjectReceipt);

    case "namedPolicy":
      return agentNamedPolicyReceiptDeserializer(item as AgentNamedPolicyReceipt);

    default:
      throw new TypeError("Unknown Agent Hooks receipt profile.");
  }
}

/** Hosted Unified Moderate evaluation profile. Local Copilot and WorkIQ integrations use in-process Agent Hooks/ACS and are not represented by this hosted HTTP profile. */
export type AgentEvaluationProfile = "foundryProject" | "namedPolicy";

/** Cryptographic binding between this receipt and the exact Unified Moderate request. The host recomputes the digest before trusting receipt metadata. */
export interface AgentEvaluationRequestBinding {
  /** Digest algorithm. SHA-256 is required for this receipt version. */
  algorithm: "sha256";
  /** Canonicalization algorithm. rfc8785 means the RFC 8785 JSON Canonicalization Scheme applied to the documented digest input. */
  canonicalization: "rfc8785";
  /** Lowercase SHA-256 digest of the RFC 8785 canonical UTF-8 JSON object whose properties are apiVersion, context and selectors, prefixed with sha256:. context is the exact decoded AgentContext request body. For foundryProject, selectors contains targetResourceId, selectedPolicyId, selectedPolicyRevision and selectedPolicySemanticDigest. For namedPolicy, selectors contains policyId. The service derives this value from the accepted request; it is never copied from request metadata. */
  digest: string;
}

export function agentEvaluationRequestBindingDeserializer(
  item: any,
): AgentEvaluationRequestBinding {
  return {
    algorithm: item["algorithm"],
    canonicalization: item["canonicalization"],
    digest: item["digest"],
  };
}

export function agentEvaluatedPolicyLayerArrayDeserializer(
  result: Array<AgentEvaluatedPolicyLayer>,
): any[] {
  return result.map((item) => {
    return agentEvaluatedPolicyLayerDeserializer(item);
  });
}

/** One exact policy artifact evaluated during this attempt. The resource ID, revision and semantic digest identify the admitted policy; the artifact digest identifies the activated manifest, Rego and immutable dependencies under the declared host profile. */
export interface AgentEvaluatedPolicyLayer {
  /** Layer role in the evaluation. */
  kind: AgentPolicyLayerKind;
  /** Full policy resource ID. Service-owned built-ins use their stable service identifier. */
  policyResourceId: string;
  /** Exact opaque policy revision. For current RP/PMS resources this is the RP-assigned ETag, preserved verbatim. */
  policyRevision: string;
  /** SHA-256 digest of the admitted semantic policy closure. This prevents a mutable policy name from resolving to different content during an admitted or resumed operation. */
  policySemanticDigest: string;
  /** SHA-256 digest of the activated manifest, Rego and immutable runtime dependencies under the declared host profile. */
  manifestRegoDigest: string;
  /** Decision returned by this layer before aggregate composition. */
  decision: AgentDecision;
}

export function agentEvaluatedPolicyLayerDeserializer(item: any): AgentEvaluatedPolicyLayer {
  return {
    kind: item["kind"],
    policyResourceId: item["policyResourceId"],
    policyRevision: item["policyRevision"],
    policySemanticDigest: item["policySemanticDigest"],
    manifestRegoDigest: item["manifestRegoDigest"],
    decision: item["decision"],
  };
}

/** The policy layer evaluated by Azure AI Content Safety. Unknown future layer kinds are preserved for forward compatibility and do not change the aggregate Verdict semantics. */
export type AgentPolicyLayerKind =
  "project" | "selected" | "namedPolicy" | "subscription" | "hierarchy" | "builtIn" | (string & {});

export function agentHarmResultRecordDeserializer(
  item: Record<string, any>,
): Record<string, AgentHarmResult> {
  return serializeRecord(item, undefined, agentHarmResultDeserializer);
}

/** Public classifier summary preserved from Unified Moderate. This excludes model family/version, thresholds, private configuration and raw confidence or probability scores. */
export interface AgentHarmResult {
  /** Whether this category contributed to a blocking policy result. */
  blocked: boolean;
  /** Whether the classifier detected this category. */
  detected: boolean;
  /** Optional public risk label. */
  severity?: string;
  /** Optional ordinal public severity on the existing 0–7 Content Safety scale. This is not a confidence or probability. Detection-only categories omit it. */
  numericSeverity?: number;
  /** Optional public detection details. */
  details?: AgentHarmDetail[];
  /** Optional public result URL. */
  url?: string;
  /** Optional public result license. */
  license?: string;
}

export function agentHarmResultDeserializer(item: any): AgentHarmResult {
  return {
    blocked: item["blocked"],
    detected: item["detected"],
    severity: item["severity"],
    numericSeverity: item["numericSeverity"],
    details: !item["details"] ? item["details"] : agentHarmDetailArrayDeserializer(item["details"]),
    url: item["url"],
    license: item["license"],
  };
}

export function agentHarmDetailArrayDeserializer(result: Array<AgentHarmDetail>): any[] {
  return result.map((item) => {
    return agentHarmDetailDeserializer(item);
  });
}

/** One detection detail associated with a public harm summary. */
export interface AgentHarmDetail {
  /** Whether this detail was detected. */
  detected: boolean;
  /** Stable public detail identifier, such as a configured blocklist or provider name. */
  id: string;
}

export function agentHarmDetailDeserializer(item: any): AgentHarmDetail {
  return {
    detected: item["detected"],
    id: item["id"],
  };
}

/** Receipt for a governed Foundry project. The selected Guardrail is identified in evaluatedPolicyLayers. Project fields fence trusted target identity, explicit hierarchy-binding state and host readiness; they do not describe a generated project policy. */
export interface AgentFoundryProjectReceipt extends AgentPolicyEvaluationReceipt {
  profile: "foundryProject";
  /** Required intervention points supported by the admitted Foundry host capability. Foundry's authenticated capability authority supplies this value; AACS must not infer it, echo request metadata or claim support when the authoritative value is unavailable. This is not a list of points evaluated by this receipt. */
  supportedInterventionPoints: AgentInterceptionPoint[];
  /** Foundry-owned effective capability version admitted for this target, region, cohort and operation. AACS obtains it from the authenticated capability authority and fails closed when it cannot. API version and request metadata do not establish this capability. */
  capabilityVersion: string;
  /** Governed project selected by targetResourceId. */
  targetResourceId: string;
  /** Opaque project incarnation that changes when the target is deleted and recreated. */
  targetIncarnation: string;
  /** Monotonic explicit hierarchy-binding state epoch obtained from the authoritative binding interface for this attempt, including a stable no-binding state. AACS must not infer or echo it. Producers constrain this integer to JavaScript's exact range, 0 through 9,007,199,254,740,991. */
  bindingEpoch: number;
  /** Monotonic operation-readiness epoch obtained from the approved authoritative readiness interface for this attempt. AACS must fail closed when it is unavailable and must not infer or echo it. Producers constrain this integer to JavaScript's exact range, 0 through 9,007,199,254,740,991. */
  readinessEpoch: number;
}

export function agentFoundryProjectReceiptDeserializer(item: any): AgentFoundryProjectReceipt {
  return {
    receiptVersion: item["receiptVersion"],
    profile: item["profile"],
    evaluationId: item["evaluationId"],
    attempt: item["attempt"],
    requestBinding: agentEvaluationRequestBindingDeserializer(item["requestBinding"]),
    evaluatedPolicyLayers: agentEvaluatedPolicyLayerArrayDeserializer(
      item["evaluatedPolicyLayers"],
    ),
    evaluatedInterventionPoint: item["evaluatedInterventionPoint"],
    requiredInterventionPoints: item["requiredInterventionPoints"].map((p: any) => {
      return p;
    }),
    hostProfileVersion: item["hostProfileVersion"],
    authenticatedProducerResourceId: item["authenticatedProducerResourceId"],
    harmResults: !item["harmResults"]
      ? item["harmResults"]
      : agentHarmResultRecordDeserializer(item["harmResults"]),
    supportedInterventionPoints: item["supportedInterventionPoints"].map((p: any) => {
      return p;
    }),
    capabilityVersion: item["capabilityVersion"],
    targetResourceId: item["targetResourceId"],
    targetIncarnation: item["targetIncarnation"],
    bindingEpoch: item["bindingEpoch"],
    readinessEpoch: item["readinessEpoch"],
  };
}

/** Receipt for an authorized named-policy gateway evaluation. This profile has no Foundry project incarnation, binding epoch, readiness epoch or project generation. */
export interface AgentNamedPolicyReceipt extends AgentPolicyEvaluationReceipt {
  profile: "namedPolicy";
}

export function agentNamedPolicyReceiptDeserializer(item: any): AgentNamedPolicyReceipt {
  return {
    receiptVersion: item["receiptVersion"],
    profile: item["profile"],
    evaluationId: item["evaluationId"],
    attempt: item["attempt"],
    requestBinding: agentEvaluationRequestBindingDeserializer(item["requestBinding"]),
    evaluatedPolicyLayers: agentEvaluatedPolicyLayerArrayDeserializer(
      item["evaluatedPolicyLayers"],
    ),
    evaluatedInterventionPoint: item["evaluatedInterventionPoint"],
    requiredInterventionPoints: item["requiredInterventionPoints"].map((p: any) => {
      return p;
    }),
    hostProfileVersion: item["hostProfileVersion"],
    authenticatedProducerResourceId: item["authenticatedProducerResourceId"],
    harmResults: !item["harmResults"]
      ? item["harmResults"]
      : agentHarmResultRecordDeserializer(item["harmResults"]),
  };
}

/** A validation, authorization, conflict, throttling or operational failure. This is an HTTP error, never a successful allow verdict. Known codes include InvalidRequest, SelectedPolicyRevisionRequired, SelectedPolicyRevisionMismatch, SelectedPolicyRevisionUnavailable, PolicyFenceChanged, UnsupportedCapability, PolicyLayerUnavailable and NativeRouteDisabled. */
export interface AgentEvaluationError {
  /** The error object. */
  error: AgentEvaluationErrorDetail;
}

export function agentEvaluationErrorDeserializer(item: any): AgentEvaluationError {
  return {
    error: agentEvaluationErrorDetailDeserializer(item["error"]),
  };
}

/** Actionable October Unified Moderate error details. */
export interface AgentEvaluationErrorDetail {
  /** Server-defined error code. Known October codes describe selector, revision, readiness and capability failures. */
  code: AgentEvaluationErrorCode;
  /** Human-readable error message. */
  message: string;
  /** Optional request field or policy resource associated with the failure. */
  target?: string;
  /** Nested errors that contributed to this failure. */
  details?: AgentEvaluationErrorDetail[];
}

export function agentEvaluationErrorDetailDeserializer(item: any): AgentEvaluationErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : agentEvaluationErrorDetailArrayDeserializer(item["details"]),
  };
}

/** Known October Unified Moderate error codes. The standard Azure error response remains extensible. */
export type AgentEvaluationErrorCode =
  | "InvalidRequest"
  | "SelectedPolicyRevisionRequired"
  | "SelectedPolicyRevisionMismatch"
  | "SelectedPolicyRevisionUnavailable"
  | "PolicyFenceChanged"
  | "UnsupportedCapability"
  | "PolicyLayerUnavailable"
  | "NativeRouteDisabled"
  | (string & {});

export function agentEvaluationErrorDetailArrayDeserializer(
  result: Array<AgentEvaluationErrorDetail>,
): any[] {
  return result.map((item) => {
    return agentEvaluationErrorDetailDeserializer(item);
  });
}

/** Input describing the media to inspect using Content Provenance Detection. */
export interface DetectOptions {
  /** Source content to inspect. */
  content: ProvenanceContent;
}

export function detectOptionsSerializer(item: DetectOptions): any {
  return { content: provenanceContentSerializer(item["content"]) };
}

/** Source content descriptor for a Content Provenance Detection operation. */
export interface ProvenanceContent {
  /** Blob URI of the media to inspect. Media up to 100 MB is supported. Supported formats: image (JPEG, PNG, GIF, WebP), audio (MP3, WAV), and video (MP4). */
  uri: string;
}

export function provenanceContentSerializer(item: ProvenanceContent): any {
  return { uri: item["uri"] };
}

/** Enum describing allowed operation states. */
export type OperationState = "NotStarted" | "Running" | "Succeeded" | "Failed" | "Canceled";

/** Result of a Content Provenance Detection operation. */
export interface DetectProvenanceResult {
  /** Top-level outcome of the Content Provenance Detection operation. */
  outcome: DetectOutcome;
  /** Detected provenance signals. Empty or omitted when `outcome` is `NoProvenanceDetected`. */
  results?: DetectedProvenance[];
}

export function detectProvenanceResultDeserializer(item: any): DetectProvenanceResult {
  return {
    outcome: item["outcome"],
    results: !item["results"]
      ? item["results"]
      : detectedProvenanceArrayDeserializer(item["results"]),
  };
}

/** Top-level outcome of a Content Provenance Detection operation. */
export type DetectOutcome = "NoProvenanceDetected" | "ProvenanceDetected";

export function detectedProvenanceArrayDeserializer(result: Array<DetectedProvenance>): any[] {
  return result.map((item) => {
    return detectedProvenanceDeserializer(item);
  });
}

/** A Microsoft-issued provenance signal indicating the media was created or modified using AI. */
export interface DetectedProvenance {
  /** Detected provenance record type. */
  type?: DetectedProvenanceType;
  /** Identifier of the Microsoft provider that generated the content. */
  provider?: string;
  /** Identifier of the generating AI model when available. */
  modelName?: string;
  /** Generation timestamp recorded in the provenance signal. */
  timestamp?: Date;
}

export function detectedProvenanceDeserializer(item: any): DetectedProvenance {
  return {
    type: item["type"],
    provider: item["provider"],
    modelName: item["modelName"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
  };
}

/** Detected provenance record type. */
export type DetectedProvenanceType = "C2PA" | "Watermark";

/** Status and result of an asynchronous Content Provenance Detection operation. */
export interface ProvenanceDetectOperation {
  /** The unique ID of the operation. */
  id: string;
  /** The status of the operation */
  status: OperationState;
  /** Error object that describes the error when status is "Failed". */
  error?: ErrorModel;
  /** The result of the operation. */
  result?: DetectProvenanceResult;
  /** Kind of Content Provenance Detection operation. */
  readonly kind: ProvenanceOperationKind;
  /** Date and time (UTC) when the operation was created. */
  readonly createdAt?: Date;
  /** Date and time (UTC) when the status was last updated. */
  readonly lastUpdatedAt?: Date;
}

export function provenanceDetectOperationDeserializer(item: any): ProvenanceDetectOperation {
  return {
    id: item["id"],
    status: item["status"],
    error: !item["error"] ? item["error"] : item["error"],
    result: !item["result"] ? item["result"] : detectProvenanceResultDeserializer(item["result"]),
    kind: item["kind"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastUpdatedAt: !item["lastUpdatedAt"] ? item["lastUpdatedAt"] : new Date(item["lastUpdatedAt"]),
  };
}

/** Kind of asynchronous Content Provenance Detection operation. */
export type ProvenanceOperationKind = "Detect";

/** The request to add blocklistItems to a text blocklist. */
export interface AddOrUpdateBlocklistItemsOptions {
  /** Array of blocklistItems to add. */
  blocklistItems: TextBlocklistItemInput[];
}

export function addOrUpdateBlocklistItemsOptionsSerializer(
  item: AddOrUpdateBlocklistItemsOptions,
): any {
  return { blocklistItems: textBlocklistItemArraySerializer(item["blocklistItems"]) };
}

export function textBlocklistItemArraySerializer(result: Array<TextBlocklistItemInput>): any[] {
  return result.map((item) => {
    return textBlocklistItemSerializer(item);
  });
}

export function textBlocklistItemArrayDeserializer(result: Array<TextBlocklistItem>): any[] {
  return result.map((item) => {
    return textBlocklistItemDeserializer(item);
  });
}

/** Item to add to a TextBlocklist. */
export interface TextBlocklistItemInput {
  /** BlocklistItem description. */
  description?: string;
  /** BlocklistItem content. The length is counted using Unicode code point. */
  text: string;
  /** An optional property indicating whether this item is to be matched as a regular expression. */
  isRegex?: boolean;
}

export function textBlocklistItemSerializer(item: TextBlocklistItemInput): any {
  return { description: item["description"], text: item["text"], isRegex: item["isRegex"] };
}

/** Item in a TextBlocklist returned by the service. */
export interface TextBlocklistItem {
  /** The service will generate a BlocklistItemId, which will be a UUID. */
  readonly blocklistItemId: string;
  /** BlocklistItem description. */
  description?: string;
  /** BlocklistItem content. The length is counted using Unicode code point. */
  text: string;
  /** An optional property indicating whether this item is to be matched as a regular expression. */
  isRegex?: boolean;
}

export function textBlocklistItemDeserializer(item: any): TextBlocklistItem {
  return {
    blocklistItemId: item["blocklistItemId"],
    description: item["description"],
    text: item["text"],
    isRegex: item["isRegex"],
  };
}

/** The response of adding blocklistItems to the text blocklist. */
export interface AddOrUpdateTextBlocklistItemsResult {
  /** Array of blocklistItems have been added. */
  blocklistItems: TextBlocklistItem[];
}

export function addOrUpdateTextBlocklistItemsResultDeserializer(
  item: any,
): AddOrUpdateTextBlocklistItemsResult {
  return {
    blocklistItems: textBlocklistItemArrayDeserializer(item["blocklistItems"]),
  };
}

/** Text Blocklist. */
export interface TextBlocklist {
  /** Text blocklist name. */
  blocklistName: string;
  /** Text blocklist description. */
  description?: string;
}

export function textBlocklistSerializer(item: TextBlocklist): any {
  return { blocklistName: item["blocklistName"], description: item["description"] };
}

/** Mutable properties used to create or update a text blocklist. */
export interface CreateOrUpdateTextBlocklistOptions {
  /** Text blocklist description. */
  description?: string;
}

export function createOrUpdateTextBlocklistOptionsSerializer(
  item: CreateOrUpdateTextBlocklistOptions,
): any {
  return { description: item["description"] };
}

export function textBlocklistDeserializer(item: any): TextBlocklist {
  return {
    blocklistName: item["blocklistName"],
    description: item["description"],
  };
}

/** Paged collection of TextBlocklistItem items */
export interface _PagedTextBlocklistItem {
  /** The TextBlocklistItem items on this page */
  value: TextBlocklistItem[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedTextBlocklistItemDeserializer(item: any): _PagedTextBlocklistItem {
  return {
    value: textBlocklistItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Paged collection of TextBlocklist items */
export interface _PagedTextBlocklist {
  /** The TextBlocklist items on this page */
  value: TextBlocklist[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedTextBlocklistDeserializer(item: any): _PagedTextBlocklist {
  return {
    value: textBlocklistArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function textBlocklistArraySerializer(result: Array<TextBlocklist>): any[] {
  return result.map((item) => {
    return textBlocklistSerializer(item);
  });
}

export function textBlocklistArrayDeserializer(result: Array<TextBlocklist>): any[] {
  return result.map((item) => {
    return textBlocklistDeserializer(item);
  });
}

/** The request to remove blocklistItems from a text blocklist. */
export interface RemoveBlocklistItemsOptions {
  /** Array of blocklistItemIds to remove. */
  blocklistItemIds: string[];
}

export function removeBlocklistItemsOptionsSerializer(item: RemoveBlocklistItemsOptions): any {
  return {
    blocklistItemIds: item["blocklistItemIds"].map((p: any) => {
      return p;
    }),
  };
}

/** Known values of {@link Versions} that the service accepts. */
export enum KnownVersions {
  /** 2023-10-01 */
  V20231001 = "2023-10-01",
  /** 2024-09-01 */
  V20240901 = "2024-09-01",
  /** Public preview that adds the synchronous Unified Moderate operation. */
  V20260901Preview = "2026-09-01-preview",
  /** Public preview that evolves Unified Moderate to canonical Agent Hooks context evaluation while preserving previously released contracts. */
  V20261015Preview = "2026-10-15-preview",
}
