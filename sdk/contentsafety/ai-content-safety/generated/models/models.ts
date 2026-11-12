// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

/** A request to evaluate and enforce an applicable policy for one workload event. The service uses the first policy it can resolve from policyId and then from the policy binding for targetResourceId, in that order. The request fails if neither selector resolves a policy. */
export interface UnifiedModerateOptions {
  /** The identifier of a policy available to the Content Safety resource. When provided, the service attempts to resolve this policy before using the policy bound to targetResourceId. */
  policyId?: string;
  /** The Azure resource identifier whose policy binding is resolved if no policy is resolved from policyId. The target resource must already have a policy binding available to the Content Safety resource. */
  targetResourceId?: string;
  /** The workload event source. The source selects the policy intervention point. */
  source: UnifiedModerateSource;
  /** The content to evaluate. For input and output sources, provide nonempty plain text. For pre_tool_call, provide a string containing a JSON-encoded object with the proposed tool arguments. For post_tool_call, provide a string containing the JSON-encoded tool result. */
  content: string;
  /** The tool name. Required and nonempty for tool-call sources and not allowed for input or output sources. */
  toolName?: string;
  /** An optional caller-provided tool-call identifier. The service generates one when omitted for a tool-call source. */
  toolCallId?: string;
  /** A string containing a JSON-encoded object with the original arguments for a completed tool call. This property applies only to post_tool_call. The service uses an empty object when omitted. */
  toolArguments?: string;
  /** Whether the completed tool call returned an error. This property applies only to post_tool_call. */
  toolResultIsError?: boolean;
  /** The non-negative duration of the completed tool call, in milliseconds. This property applies only to post_tool_call. */
  toolDurationMs?: number;
  /** Optional agent, session, and request context supplied to policy evaluation. */
  context?: UnifiedModerateContext;
}

export function unifiedModerateOptionsSerializer(item: UnifiedModerateOptions): any {
  return {
    policyId: item["policyId"],
    targetResourceId: item["targetResourceId"],
    source: item["source"],
    content: item["content"],
    toolName: item["toolName"],
    toolCallId: item["toolCallId"],
    toolArguments: item["toolArguments"],
    toolResultIsError: item["toolResultIsError"],
    toolDurationMs: item["toolDurationMs"],
    context: !item["context"] ? item["context"] : unifiedModerateContextSerializer(item["context"]),
  };
}

/** The workload event source evaluated by Unified Moderate. */
export type UnifiedModerateSource = "input" | "output" | "pre_tool_call" | "post_tool_call";

/** Optional agent, session, and request context supplied to policy evaluation. */
export interface UnifiedModerateContext {
  /** Caller-provided identifier of the agent associated with the event. */
  agentId?: string;
  /** Caller-provided identifier of the session associated with the event. */
  sessionId?: string;
  /** Zero-based event sequence within the session, when available. */
  sequence?: number;
  /** Caller-provided end-to-end correlation identifier. */
  correlationId?: string;
  /** Caller-provided workload user identifier. */
  userId?: string;
  /** Caller-provided workload tenant identifier. */
  tenantId?: string;
  /** A string containing a JSON-encoded object with validated host-specific context extensions. */
  extensions?: string;
}

export function unifiedModerateContextSerializer(item: UnifiedModerateContext): any {
  return {
    agentId: item["agentId"],
    sessionId: item["sessionId"],
    sequence: item["sequence"],
    correlationId: item["correlationId"],
    userId: item["userId"],
    tenantId: item["tenantId"],
    extensions: item["extensions"],
  };
}

/** The enforced result of unified moderation. */
export interface UnifiedModerateResult {
  /** The caller-facing enforcement outcome. */
  verdict: UnifiedModerateVerdict;
  /** An optional machine-readable policy reason. */
  reason?: string;
  /** The original or transformed content when allowed, using the same source-specific representation as the request content. Structured content is returned as a string containing the JSON-encoded value. This property is omitted when blocked. */
  content?: string;
  /** The complete Agent Control Specification policy verdict. */
  acsVerdict: AcsVerdict;
}

export function unifiedModerateResultDeserializer(item: any): UnifiedModerateResult {
  return {
    verdict: item["verdict"],
    reason: item["reason"],
    content: item["content"],
    acsVerdict: acsVerdictDeserializer(item["acsVerdict"]),
  };
}

/** The caller-facing enforcement result returned by Unified Moderate. */
export type UnifiedModerateVerdict = "allowed" | "blocked";

/** The complete Agent Control Specification policy verdict. */
export interface AcsVerdict {
  /** The canonical policy decision. */
  decision: AcsDecision;
  /** An optional machine-readable reason for the decision. */
  reason?: string;
  /** An optional human-readable message for the decision. */
  message?: string;
  /** Optional non-blocking warnings produced by policy evaluation. */
  warnings?: string[];
  /** Optional approval metadata for a deny decision. Unified Moderate does not invoke an approval workflow, so the content remains blocked. */
  approval?: AcsApproval;
  /** Canonical transform metadata. Required when the decision is transform. */
  transform?: AcsTransform;
  /** Optional policy evidence and verification pointers. */
  evidence?: AcsEvidence[];
  /** Optional moderation results keyed by harm category. Category names come from the policy harm configuration and are not restricted to a predefined set. A policy deny that is unrelated to a configured harm can omit this property. */
  harmResults?: Record<string, AcsHarmResult>;
}

export function acsVerdictDeserializer(item: any): AcsVerdict {
  return {
    decision: item["decision"],
    reason: item["reason"],
    message: item["message"],
    warnings: !item["warnings"]
      ? item["warnings"]
      : item["warnings"].map((p: any) => {
          return p;
        }),
    approval: !item["approval"] ? item["approval"] : acsApprovalDeserializer(item["approval"]),
    transform: !item["transform"] ? item["transform"] : acsTransformDeserializer(item["transform"]),
    evidence: !item["evidence"] ? item["evidence"] : acsEvidenceArrayDeserializer(item["evidence"]),
    harmResults: !item["harmResults"]
      ? item["harmResults"]
      : acsHarmResultRecordDeserializer(item["harmResults"]),
  };
}

/** The canonical decision returned by Agent Control Specification policy evaluation. */
export type AcsDecision = "allow" | "deny" | "transform";

/** Approval metadata returned by an ACS deny decision. Unified Moderate does not invoke an approval workflow. */
export interface AcsApproval {
  /** The type of approval required by the policy. */
  type: string;
}

export function acsApprovalDeserializer(item: any): AcsApproval {
  return {
    type: item["type"],
  };
}

/** A canonical ACS transform applied by Unified Moderate. */
export interface AcsTransform {
  /** The transformation target path. For input and output sources, the allowed path is `$target.content`. For tool sources, `$target` replaces the complete value and a path rooted at `$target` replaces an individual member. */
  path: string;
  /** A string containing the JSON-encoded replacement value applied at the target path. */
  value: string;
}

export function acsTransformDeserializer(item: any): AcsTransform {
  return {
    path: item["path"],
    value: item["value"],
  };
}

export function acsEvidenceArrayDeserializer(result: Array<AcsEvidence>): any[] {
  return result.map((item) => {
    return acsEvidenceDeserializer(item);
  });
}

/** Evidence or a verification pointer returned by policy evaluation. */
export interface AcsEvidence {
  /** An optional evidence identifier. */
  id?: string;
  /** An optional evidence type. */
  type?: string;
  /** An optional location containing or describing the evidence. */
  uri?: string;
  /** An optional human-readable evidence description. */
  description?: string;
}

export function acsEvidenceDeserializer(item: any): AcsEvidence {
  return {
    id: item["id"],
    type: item["type"],
    uri: item["uri"],
    description: item["description"],
  };
}

export function acsHarmResultRecordDeserializer(
  item: Record<string, any>,
): Record<string, AcsHarmResult> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : acsHarmResultDeserializer(item[key]);
  });
  return result;
}

/** The moderation and policy-attribution result for one harm category. The category name is the key in the harmResults map and is not restricted to a predefined set. */
export interface AcsHarmResult {
  /** Whether this harm contributed to the overall ACS verdict blocking the content. */
  blocked: boolean;
  /** Whether this harm was detected, regardless of whether it caused the overall verdict to block. */
  detected: boolean;
  /** An optional harm-specific severity value. The value is defined by the moderation model or policy that produced the result. */
  severity?: string;
  /** Optional blocklist results. Each item identifies one evaluated blocklist and whether it was detected. */
  details?: AcsHarmDetail[];
  /** An optional internet location associated with detected protected material. */
  url?: string;
  /** An optional license description associated with detected protected material. */
  license?: string;
}

export function acsHarmResultDeserializer(item: any): AcsHarmResult {
  return {
    blocked: item["blocked"],
    detected: item["detected"],
    severity: item["severity"],
    details: !item["details"] ? item["details"] : acsHarmDetailArrayDeserializer(item["details"]),
    url: item["url"],
    license: item["license"],
  };
}

export function acsHarmDetailArrayDeserializer(result: Array<AcsHarmDetail>): any[] {
  return result.map((item) => {
    return acsHarmDetailDeserializer(item);
  });
}

/** The detection result for one blocklist evaluated as part of a harm result. */
export interface AcsHarmDetail {
  /** Whether the blocklist was detected. */
  detected: boolean;
  /** The identifier of the evaluated blocklist. */
  id: string;
}

export function acsHarmDetailDeserializer(item: any): AcsHarmDetail {
  return {
    detected: item["detected"],
    id: item["id"],
  };
}

/** Input describing the media to inspect using Content Provenance Detection. */
export interface DetectProvenanceOptions {
  /** Source content to inspect. */
  content: ProvenanceContent;
}

export function detectProvenanceOptionsSerializer(item: DetectProvenanceOptions): any {
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
export interface AddOrUpdateTextBlocklistItemsOptions {
  /** Array of blocklistItems to add. */
  blocklistItems: TextBlocklistItem[];
}

export function addOrUpdateTextBlocklistItemsOptionsSerializer(
  item: AddOrUpdateTextBlocklistItemsOptions,
): any {
  return { blocklistItems: textBlocklistItemArraySerializer(item["blocklistItems"]) };
}

export function textBlocklistItemArraySerializer(result: Array<TextBlocklistItem>): any[] {
  return result.map((item) => {
    return textBlocklistItemSerializer(item);
  });
}

export function textBlocklistItemArrayDeserializer(result: Array<TextBlocklistItem>): any[] {
  return result.map((item) => {
    return textBlocklistItemDeserializer(item);
  });
}

/** Item in a TextBlocklist. */
export interface TextBlocklistItem {
  /** The service will generate a BlocklistItemId, which will be a UUID. */
  readonly blocklistItemId: string;
  /** BlocklistItem description. */
  description?: string;
  /** BlocklistItem content. The length is counted using Unicode code point. */
  text: string;
  /** An optional properties indicating whether this item is to be matched as a regular expression. */
  isRegex?: boolean;
}

export function textBlocklistItemSerializer(item: TextBlocklistItem): any {
  return { description: item["description"], text: item["text"], isRegex: item["isRegex"] };
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
export interface RemoveTextBlocklistItemsOptions {
  /** Array of blocklistItemIds to remove. */
  blocklistItemIds: string[];
}

export function removeTextBlocklistItemsOptionsSerializer(
  item: RemoveTextBlocklistItemsOptions,
): any {
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
}
