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
  /** Public preview that adds asynchronous Content Provenance Detection operations. */
  V20260701Preview = "2026-07-01-preview",
}
