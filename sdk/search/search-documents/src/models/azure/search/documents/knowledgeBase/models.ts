// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KnowledgeSourceKind } from "../indexes/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Base type for reasoning effort. */
export interface KnowledgeRetrievalReasoningEffort {
  /** The kind of reasoning effort. */
  /** The discriminator possible values: minimal, low, medium, high */
  kind: KnowledgeRetrievalReasoningEffortKind;
}

export function knowledgeRetrievalReasoningEffortSerializer(
  item: KnowledgeRetrievalReasoningEffort,
): any {
  return { kind: item["kind"] };
}

export function knowledgeRetrievalReasoningEffortDeserializer(
  item: any,
): KnowledgeRetrievalReasoningEffort {
  return {
    kind: item["kind"],
  };
}

/** Alias for KnowledgeRetrievalReasoningEffortUnion */
export type KnowledgeRetrievalReasoningEffortUnion =
  | KnowledgeRetrievalMinimalReasoningEffort
  | KnowledgeRetrievalLowReasoningEffort
  | KnowledgeRetrievalMediumReasoningEffort
  | KnowledgeRetrievalHighReasoningEffort
  | KnowledgeRetrievalReasoningEffort;

export function knowledgeRetrievalReasoningEffortUnionSerializer(
  item: KnowledgeRetrievalReasoningEffortUnion,
): any {
  switch (item.kind) {
    case "minimal":
      return knowledgeRetrievalMinimalReasoningEffortSerializer(
        item as KnowledgeRetrievalMinimalReasoningEffort,
      );

    case "low":
      return knowledgeRetrievalLowReasoningEffortSerializer(
        item as KnowledgeRetrievalLowReasoningEffort,
      );

    case "medium":
      return knowledgeRetrievalMediumReasoningEffortSerializer(
        item as KnowledgeRetrievalMediumReasoningEffort,
      );

    case "high":
      return knowledgeRetrievalHighReasoningEffortSerializer(
        item as KnowledgeRetrievalHighReasoningEffort,
      );

    default:
      return knowledgeRetrievalReasoningEffortSerializer(item);
  }
}

export function knowledgeRetrievalReasoningEffortUnionDeserializer(
  item: any,
): KnowledgeRetrievalReasoningEffortUnion {
  switch (item.kind) {
    case "minimal":
      return knowledgeRetrievalMinimalReasoningEffortDeserializer(
        item as KnowledgeRetrievalMinimalReasoningEffort,
      );

    case "low":
      return knowledgeRetrievalLowReasoningEffortDeserializer(
        item as KnowledgeRetrievalLowReasoningEffort,
      );

    case "medium":
      return knowledgeRetrievalMediumReasoningEffortDeserializer(
        item as KnowledgeRetrievalMediumReasoningEffort,
      );

    case "high":
      return knowledgeRetrievalHighReasoningEffortDeserializer(
        item as KnowledgeRetrievalHighReasoningEffort,
      );

    default:
      return knowledgeRetrievalReasoningEffortDeserializer(item);
  }
}

/** The amount of effort to use during retrieval. */
export enum KnownKnowledgeRetrievalReasoningEffortKind {
  /** Does not perform any source selections, any query planning, or any iterative search. */
  Minimal = "minimal",
  /** Use low reasoning during retrieval. */
  Low = "low",
  /** Use a moderate amount of reasoning during retrieval. */
  Medium = "medium",
  /** Use a high amount of reasoning during retrieval. */
  High = "high",
}

/**
 * The amount of effort to use during retrieval. \
 * {@link KnownKnowledgeRetrievalReasoningEffortKind} can be used interchangeably with KnowledgeRetrievalReasoningEffortKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **minimal**: Does not perform any source selections, any query planning, or any iterative search. \
 * **low**: Use low reasoning during retrieval. \
 * **medium**: Use a moderate amount of reasoning during retrieval. \
 * **high**: Use a high amount of reasoning during retrieval.
 */
export type KnowledgeRetrievalReasoningEffortKind = string;

/** Run knowledge retrieval with minimal reasoning effort. */
export interface KnowledgeRetrievalMinimalReasoningEffort
  extends KnowledgeRetrievalReasoningEffort {
  /** The discriminator value. */
  kind: "minimal";
}

export function knowledgeRetrievalMinimalReasoningEffortSerializer(
  item: KnowledgeRetrievalMinimalReasoningEffort,
): any {
  return { kind: item["kind"] };
}

export function knowledgeRetrievalMinimalReasoningEffortDeserializer(
  item: any,
): KnowledgeRetrievalMinimalReasoningEffort {
  return {
    kind: item["kind"],
  };
}

/** Run knowledge retrieval with low reasoning effort. */
export interface KnowledgeRetrievalLowReasoningEffort
  extends KnowledgeRetrievalReasoningEffort {
  /** The discriminator value. */
  kind: "low";
}

export function knowledgeRetrievalLowReasoningEffortSerializer(
  item: KnowledgeRetrievalLowReasoningEffort,
): any {
  return { kind: item["kind"] };
}

export function knowledgeRetrievalLowReasoningEffortDeserializer(
  item: any,
): KnowledgeRetrievalLowReasoningEffort {
  return {
    kind: item["kind"],
  };
}

/** Run knowledge retrieval with medium reasoning effort. */
export interface KnowledgeRetrievalMediumReasoningEffort
  extends KnowledgeRetrievalReasoningEffort {
  /** The discriminator value. */
  kind: "medium";
}

export function knowledgeRetrievalMediumReasoningEffortSerializer(
  item: KnowledgeRetrievalMediumReasoningEffort,
): any {
  return { kind: item["kind"] };
}

export function knowledgeRetrievalMediumReasoningEffortDeserializer(
  item: any,
): KnowledgeRetrievalMediumReasoningEffort {
  return {
    kind: item["kind"],
  };
}

/** Run knowledge retrieval with high reasoning effort. */
export interface KnowledgeRetrievalHighReasoningEffort
  extends KnowledgeRetrievalReasoningEffort {
  /** The discriminator value. */
  kind: "high";
}

export function knowledgeRetrievalHighReasoningEffortSerializer(
  item: KnowledgeRetrievalHighReasoningEffort,
): any {
  return { kind: item["kind"] };
}

export function knowledgeRetrievalHighReasoningEffortDeserializer(
  item: any,
): KnowledgeRetrievalHighReasoningEffort {
  return {
    kind: item["kind"],
  };
}

/** The output configuration for this retrieval. */
export enum KnownKnowledgeRetrievalOutputMode {
  /** Return data from the knowledge sources directly without generative alteration. */
  ExtractiveData = "extractiveData",
  /** Synthesize an answer for the response payload. */
  AnswerSynthesis = "answerSynthesis",
}

/**
 * The output configuration for this retrieval. \
 * {@link KnownKnowledgeRetrievalOutputMode} can be used interchangeably with KnowledgeRetrievalOutputMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **extractiveData**: Return data from the knowledge sources directly without generative alteration. \
 * **answerSynthesis**: Synthesize an answer for the response payload.
 */
export type KnowledgeRetrievalOutputMode = string;

/** The input contract for the retrieval request. */
export interface KnowledgeBaseRetrievalRequest {
  /** A list of chat message style input. */
  messages?: KnowledgeBaseMessage[];
  /** A list of intended queries to execute without model query planning. */
  intents?: KnowledgeRetrievalIntentUnion[];
  /** The maximum runtime in seconds. */
  maxRuntimeInSeconds?: number;
  /** Limits the maximum size of the content in the output. */
  maxOutputSize?: number;
  /** The retrieval reasoning effort configuration. */
  retrievalReasoningEffort?: KnowledgeRetrievalReasoningEffortUnion;
  /** Indicates retrieval results should include activity information. */
  includeActivity?: boolean;
  /** The output configuration for this retrieval. */
  outputMode?: KnowledgeRetrievalOutputMode;
  /** A list of runtime parameters for the knowledge sources. */
  knowledgeSourceParams?: KnowledgeSourceParamsUnion[];
}

export function knowledgeBaseRetrievalRequestSerializer(
  item: KnowledgeBaseRetrievalRequest,
): any {
  return {
    messages: !item["messages"]
      ? item["messages"]
      : knowledgeBaseMessageArraySerializer(item["messages"]),
    intents: !item["intents"]
      ? item["intents"]
      : knowledgeRetrievalIntentUnionArraySerializer(item["intents"]),
    maxRuntimeInSeconds: item["maxRuntimeInSeconds"],
    maxOutputSize: item["maxOutputSize"],
    retrievalReasoningEffort: !item["retrievalReasoningEffort"]
      ? item["retrievalReasoningEffort"]
      : knowledgeRetrievalReasoningEffortUnionSerializer(
          item["retrievalReasoningEffort"],
        ),
    includeActivity: item["includeActivity"],
    outputMode: item["outputMode"],
    knowledgeSourceParams: !item["knowledgeSourceParams"]
      ? item["knowledgeSourceParams"]
      : knowledgeSourceParamsUnionArraySerializer(
          item["knowledgeSourceParams"],
        ),
  };
}

export function knowledgeBaseMessageArraySerializer(
  result: Array<KnowledgeBaseMessage>,
): any[] {
  return result.map((item) => {
    return knowledgeBaseMessageSerializer(item);
  });
}

export function knowledgeBaseMessageArrayDeserializer(
  result: Array<KnowledgeBaseMessage>,
): any[] {
  return result.map((item) => {
    return knowledgeBaseMessageDeserializer(item);
  });
}

/** The natural language message style object. */
export interface KnowledgeBaseMessage {
  /** The role of the tool response. */
  role?: string;
  /** The content of the message. */
  content: KnowledgeBaseMessageContentUnion[];
}

export function knowledgeBaseMessageSerializer(
  item: KnowledgeBaseMessage,
): any {
  return {
    role: item["role"],
    content: knowledgeBaseMessageContentUnionArraySerializer(item["content"]),
  };
}

export function knowledgeBaseMessageDeserializer(
  item: any,
): KnowledgeBaseMessage {
  return {
    role: item["role"],
    content: knowledgeBaseMessageContentUnionArrayDeserializer(item["content"]),
  };
}

export function knowledgeBaseMessageContentUnionArraySerializer(
  result: Array<KnowledgeBaseMessageContentUnion>,
): any[] {
  return result.map((item) => {
    return knowledgeBaseMessageContentUnionSerializer(item);
  });
}

export function knowledgeBaseMessageContentUnionArrayDeserializer(
  result: Array<KnowledgeBaseMessageContentUnion>,
): any[] {
  return result.map((item) => {
    return knowledgeBaseMessageContentUnionDeserializer(item);
  });
}

/** Specifies the type of the message content. */
export interface KnowledgeBaseMessageContent {
  /** The type of the message */
  /** The discriminator possible values: text, image */
  type: KnowledgeBaseMessageContentType;
}

export function knowledgeBaseMessageContentSerializer(
  item: KnowledgeBaseMessageContent,
): any {
  return { type: item["type"] };
}

export function knowledgeBaseMessageContentDeserializer(
  item: any,
): KnowledgeBaseMessageContent {
  return {
    type: item["type"],
  };
}

/** Alias for KnowledgeBaseMessageContentUnion */
export type KnowledgeBaseMessageContentUnion =
  | KnowledgeBaseMessageTextContent
  | KnowledgeBaseMessageImageContent
  | KnowledgeBaseMessageContent;

export function knowledgeBaseMessageContentUnionSerializer(
  item: KnowledgeBaseMessageContentUnion,
): any {
  switch (item.type) {
    case "text":
      return knowledgeBaseMessageTextContentSerializer(
        item as KnowledgeBaseMessageTextContent,
      );

    case "image":
      return knowledgeBaseMessageImageContentSerializer(
        item as KnowledgeBaseMessageImageContent,
      );

    default:
      return knowledgeBaseMessageContentSerializer(item);
  }
}

export function knowledgeBaseMessageContentUnionDeserializer(
  item: any,
): KnowledgeBaseMessageContentUnion {
  switch (item.type) {
    case "text":
      return knowledgeBaseMessageTextContentDeserializer(
        item as KnowledgeBaseMessageTextContent,
      );

    case "image":
      return knowledgeBaseMessageImageContentDeserializer(
        item as KnowledgeBaseMessageImageContent,
      );

    default:
      return knowledgeBaseMessageContentDeserializer(item);
  }
}

/** The type of message content. */
export enum KnownKnowledgeBaseMessageContentType {
  /** Text message content kind. */
  Text = "text",
  /** Image message content kind. */
  Image = "image",
}

/**
 * The type of message content. \
 * {@link KnownKnowledgeBaseMessageContentType} can be used interchangeably with KnowledgeBaseMessageContentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **text**: Text message content kind. \
 * **image**: Image message content kind.
 */
export type KnowledgeBaseMessageContentType = string;

/** Text message type. */
export interface KnowledgeBaseMessageTextContent
  extends KnowledgeBaseMessageContent {
  /** The discriminator value. */
  type: "text";
  /** The text content. */
  text: string;
}

export function knowledgeBaseMessageTextContentSerializer(
  item: KnowledgeBaseMessageTextContent,
): any {
  return { type: item["type"], text: item["text"] };
}

export function knowledgeBaseMessageTextContentDeserializer(
  item: any,
): KnowledgeBaseMessageTextContent {
  return {
    type: item["type"],
    text: item["text"],
  };
}

/** Image message type. */
export interface KnowledgeBaseMessageImageContent
  extends KnowledgeBaseMessageContent {
  /** The discriminator value. */
  type: "image";
  /** The image content. */
  image: KnowledgeBaseImageContent;
}

export function knowledgeBaseMessageImageContentSerializer(
  item: KnowledgeBaseMessageImageContent,
): any {
  return {
    type: item["type"],
    image: knowledgeBaseImageContentSerializer(item["image"]),
  };
}

export function knowledgeBaseMessageImageContentDeserializer(
  item: any,
): KnowledgeBaseMessageImageContent {
  return {
    type: item["type"],
    image: knowledgeBaseImageContentDeserializer(item["image"]),
  };
}

/** Image content. */
export interface KnowledgeBaseImageContent {
  /** The url of the image. */
  url: string;
}

export function knowledgeBaseImageContentSerializer(
  item: KnowledgeBaseImageContent,
): any {
  return { url: item["url"] };
}

export function knowledgeBaseImageContentDeserializer(
  item: any,
): KnowledgeBaseImageContent {
  return {
    url: item["url"],
  };
}

export function knowledgeRetrievalIntentUnionArraySerializer(
  result: Array<KnowledgeRetrievalIntentUnion>,
): any[] {
  return result.map((item) => {
    return knowledgeRetrievalIntentUnionSerializer(item);
  });
}

/** An intended query to execute without model query planning. */
export interface KnowledgeRetrievalIntent {
  /** The type of the intent. */
  /** The discriminator possible values: semantic */
  type: KnowledgeRetrievalIntentType;
}

export function knowledgeRetrievalIntentSerializer(
  item: KnowledgeRetrievalIntent,
): any {
  return { type: item["type"] };
}

/** Alias for KnowledgeRetrievalIntentUnion */
export type KnowledgeRetrievalIntentUnion =
  | KnowledgeRetrievalSemanticIntent
  | KnowledgeRetrievalIntent;

export function knowledgeRetrievalIntentUnionSerializer(
  item: KnowledgeRetrievalIntentUnion,
): any {
  switch (item.type) {
    case "semantic":
      return knowledgeRetrievalSemanticIntentSerializer(
        item as KnowledgeRetrievalSemanticIntent,
      );

    default:
      return knowledgeRetrievalIntentSerializer(item);
  }
}

/** The kind of knowledge base configuration to use. */
export enum KnownKnowledgeRetrievalIntentType {
  /** A natural language semantic query intent. */
  Semantic = "semantic",
}

/**
 * The kind of knowledge base configuration to use. \
 * {@link KnownKnowledgeRetrievalIntentType} can be used interchangeably with KnowledgeRetrievalIntentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **semantic**: A natural language semantic query intent.
 */
export type KnowledgeRetrievalIntentType = string;

/** A semantic query intent. */
export interface KnowledgeRetrievalSemanticIntent
  extends KnowledgeRetrievalIntent {
  /** The discriminator value. */
  type: "semantic";
  /** The semantic query to execute */
  search: string;
}

export function knowledgeRetrievalSemanticIntentSerializer(
  item: KnowledgeRetrievalSemanticIntent,
): any {
  return { type: item["type"], search: item["search"] };
}

export function knowledgeSourceParamsUnionArraySerializer(
  result: Array<KnowledgeSourceParamsUnion>,
): any[] {
  return result.map((item) => {
    return knowledgeSourceParamsUnionSerializer(item);
  });
}

/** Base type for knowledge source runtime parameters. */
export interface KnowledgeSourceParams {
  /** The name of the index the params apply to. */
  knowledgeSourceName: string;
  /** Indicates whether references should be included for data retrieved from this source. */
  includeReferences?: boolean;
  /** Indicates whether references should include the structured data obtained during retrieval in their payload. */
  includeReferenceSourceData?: boolean;
  /** Indicates that this knowledge source should bypass source selection and always be queried at retrieval time. */
  alwaysQuerySource?: boolean;
  /** The reranker threshold all retrieved documents must meet to be included in the response. */
  rerankerThreshold?: number;
  /** The type of the knowledge source. */
  /** The discriminator possible values: searchIndex, azureBlob, indexedSharePoint, indexedOneLake, web, remoteSharePoint */
  kind: KnowledgeSourceKind;
}

export function knowledgeSourceParamsSerializer(
  item: KnowledgeSourceParams,
): any {
  return {
    knowledgeSourceName: item["knowledgeSourceName"],
    includeReferences: item["includeReferences"],
    includeReferenceSourceData: item["includeReferenceSourceData"],
    alwaysQuerySource: item["alwaysQuerySource"],
    rerankerThreshold: item["rerankerThreshold"],
    kind: item["kind"],
  };
}

/** Alias for KnowledgeSourceParamsUnion */
export type KnowledgeSourceParamsUnion =
  | SearchIndexKnowledgeSourceParams
  | AzureBlobKnowledgeSourceParams
  | IndexedSharePointKnowledgeSourceParams
  | IndexedOneLakeKnowledgeSourceParams
  | WebKnowledgeSourceParams
  | RemoteSharePointKnowledgeSourceParams
  | KnowledgeSourceParams;

export function knowledgeSourceParamsUnionSerializer(
  item: KnowledgeSourceParamsUnion,
): any {
  switch (item.kind) {
    case "searchIndex":
      return searchIndexKnowledgeSourceParamsSerializer(
        item as SearchIndexKnowledgeSourceParams,
      );

    case "azureBlob":
      return azureBlobKnowledgeSourceParamsSerializer(
        item as AzureBlobKnowledgeSourceParams,
      );

    case "indexedSharePoint":
      return indexedSharePointKnowledgeSourceParamsSerializer(
        item as IndexedSharePointKnowledgeSourceParams,
      );

    case "indexedOneLake":
      return indexedOneLakeKnowledgeSourceParamsSerializer(
        item as IndexedOneLakeKnowledgeSourceParams,
      );

    case "web":
      return webKnowledgeSourceParamsSerializer(
        item as WebKnowledgeSourceParams,
      );

    case "remoteSharePoint":
      return remoteSharePointKnowledgeSourceParamsSerializer(
        item as RemoteSharePointKnowledgeSourceParams,
      );

    default:
      return knowledgeSourceParamsSerializer(item);
  }
}

/** Specifies runtime parameters for a search index knowledge source */
export interface SearchIndexKnowledgeSourceParams
  extends KnowledgeSourceParams {
  /** The discriminator value. */
  kind: "searchIndex";
  /** A filter condition applied to the index (e.g., 'State eq VA'). */
  filterAddOn?: string;
}

export function searchIndexKnowledgeSourceParamsSerializer(
  item: SearchIndexKnowledgeSourceParams,
): any {
  return {
    knowledgeSourceName: item["knowledgeSourceName"],
    includeReferences: item["includeReferences"],
    includeReferenceSourceData: item["includeReferenceSourceData"],
    alwaysQuerySource: item["alwaysQuerySource"],
    rerankerThreshold: item["rerankerThreshold"],
    kind: item["kind"],
    filterAddOn: item["filterAddOn"],
  };
}

/** Specifies runtime parameters for a azure blob knowledge source */
export interface AzureBlobKnowledgeSourceParams extends KnowledgeSourceParams {
  /** The discriminator value. */
  kind: "azureBlob";
}

export function azureBlobKnowledgeSourceParamsSerializer(
  item: AzureBlobKnowledgeSourceParams,
): any {
  return {
    knowledgeSourceName: item["knowledgeSourceName"],
    includeReferences: item["includeReferences"],
    includeReferenceSourceData: item["includeReferenceSourceData"],
    alwaysQuerySource: item["alwaysQuerySource"],
    rerankerThreshold: item["rerankerThreshold"],
    kind: item["kind"],
  };
}

/** Specifies runtime parameters for a indexed SharePoint knowledge source */
export interface IndexedSharePointKnowledgeSourceParams
  extends KnowledgeSourceParams {
  /** The discriminator value. */
  kind: "indexedSharePoint";
}

export function indexedSharePointKnowledgeSourceParamsSerializer(
  item: IndexedSharePointKnowledgeSourceParams,
): any {
  return {
    knowledgeSourceName: item["knowledgeSourceName"],
    includeReferences: item["includeReferences"],
    includeReferenceSourceData: item["includeReferenceSourceData"],
    alwaysQuerySource: item["alwaysQuerySource"],
    rerankerThreshold: item["rerankerThreshold"],
    kind: item["kind"],
  };
}

/** Specifies runtime parameters for a indexed OneLake knowledge source */
export interface IndexedOneLakeKnowledgeSourceParams
  extends KnowledgeSourceParams {
  /** The discriminator value. */
  kind: "indexedOneLake";
}

export function indexedOneLakeKnowledgeSourceParamsSerializer(
  item: IndexedOneLakeKnowledgeSourceParams,
): any {
  return {
    knowledgeSourceName: item["knowledgeSourceName"],
    includeReferences: item["includeReferences"],
    includeReferenceSourceData: item["includeReferenceSourceData"],
    alwaysQuerySource: item["alwaysQuerySource"],
    rerankerThreshold: item["rerankerThreshold"],
    kind: item["kind"],
  };
}

/** Specifies runtime parameters for a web knowledge source */
export interface WebKnowledgeSourceParams extends KnowledgeSourceParams {
  /** The discriminator value. */
  kind: "web";
  /** The language of the web results. */
  language?: string;
  /** The market of the web results. */
  market?: string;
  /** The number of web results to return. */
  count?: number;
  /** The freshness of web results. */
  freshness?: string;
}

export function webKnowledgeSourceParamsSerializer(
  item: WebKnowledgeSourceParams,
): any {
  return {
    knowledgeSourceName: item["knowledgeSourceName"],
    includeReferences: item["includeReferences"],
    includeReferenceSourceData: item["includeReferenceSourceData"],
    alwaysQuerySource: item["alwaysQuerySource"],
    rerankerThreshold: item["rerankerThreshold"],
    kind: item["kind"],
    language: item["language"],
    market: item["market"],
    count: item["count"],
    freshness: item["freshness"],
  };
}

/** Specifies runtime parameters for a remote SharePoint knowledge source */
export interface RemoteSharePointKnowledgeSourceParams
  extends KnowledgeSourceParams {
  /** The discriminator value. */
  kind: "remoteSharePoint";
  /** A filter condition applied to the SharePoint data source. It must be specified in the Keyword Query Language syntax. It will be combined as a conjunction with the filter expression specified in the knowledge source definition. */
  filterExpressionAddOn?: string;
}

export function remoteSharePointKnowledgeSourceParamsSerializer(
  item: RemoteSharePointKnowledgeSourceParams,
): any {
  return {
    knowledgeSourceName: item["knowledgeSourceName"],
    includeReferences: item["includeReferences"],
    includeReferenceSourceData: item["includeReferenceSourceData"],
    alwaysQuerySource: item["alwaysQuerySource"],
    rerankerThreshold: item["rerankerThreshold"],
    kind: item["kind"],
    filterExpressionAddOn: item["filterExpressionAddOn"],
  };
}

/** The output contract for the retrieval response. */
export interface KnowledgeBaseRetrievalResponse {
  /** The response messages. */
  response?: KnowledgeBaseMessage[];
  /** The activity records for tracking progress and billing implications. */
  activity?: KnowledgeBaseActivityRecordUnion[];
  /** The references for the retrieval data used in the response. */
  references?: KnowledgeBaseReferenceUnion[];
}

export function knowledgeBaseRetrievalResponseDeserializer(
  item: any,
): KnowledgeBaseRetrievalResponse {
  return {
    response: !item["response"]
      ? item["response"]
      : knowledgeBaseMessageArrayDeserializer(item["response"]),
    activity: !item["activity"]
      ? item["activity"]
      : knowledgeBaseActivityRecordUnionArrayDeserializer(item["activity"]),
    references: !item["references"]
      ? item["references"]
      : knowledgeBaseReferenceUnionArrayDeserializer(item["references"]),
  };
}

export function knowledgeBaseActivityRecordUnionArrayDeserializer(
  result: Array<KnowledgeBaseActivityRecordUnion>,
): any[] {
  return result.map((item) => {
    return knowledgeBaseActivityRecordUnionDeserializer(item);
  });
}

/** Base type for activity records. */
export interface KnowledgeBaseActivityRecord {
  /** The ID of the activity record. */
  id: number;
  /** The type of the activity record. */
  /** The discriminator possible values: modelQueryPlanning, modelAnswerSynthesis, agenticReasoning */
  type: string;
  /** The elapsed time in milliseconds for the retrieval activity. */
  elapsedMs?: number;
  /** The error detail explaining why the operation failed. This property is only included when the activity does not succeed. */
  error?: KnowledgeBaseErrorDetail;
}

export function knowledgeBaseActivityRecordDeserializer(
  item: any,
): KnowledgeBaseActivityRecord {
  return {
    id: item["id"],
    type: item["type"],
    elapsedMs: item["elapsedMs"],
    error: !item["error"]
      ? item["error"]
      : knowledgeBaseErrorDetailDeserializer(item["error"]),
  };
}

/** Alias for KnowledgeBaseActivityRecordUnion */
export type KnowledgeBaseActivityRecordUnion =
  | KnowledgeBaseModelQueryPlanningActivityRecord
  | KnowledgeBaseModelAnswerSynthesisActivityRecord
  | KnowledgeBaseAgenticReasoningActivityRecord
  | KnowledgeBaseActivityRecord;

export function knowledgeBaseActivityRecordUnionDeserializer(
  item: any,
): KnowledgeBaseActivityRecordUnion {
  switch (item.type) {
    case "modelQueryPlanning":
      return knowledgeBaseModelQueryPlanningActivityRecordDeserializer(
        item as KnowledgeBaseModelQueryPlanningActivityRecord,
      );

    case "modelAnswerSynthesis":
      return knowledgeBaseModelAnswerSynthesisActivityRecordDeserializer(
        item as KnowledgeBaseModelAnswerSynthesisActivityRecord,
      );

    case "agenticReasoning":
      return knowledgeBaseAgenticReasoningActivityRecordDeserializer(
        item as KnowledgeBaseAgenticReasoningActivityRecord,
      );

    default:
      return knowledgeBaseActivityRecordDeserializer(item);
  }
}

/** The error details. */
export interface KnowledgeBaseErrorDetail {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
  /** The error target. */
  target?: string;
  /** The error details. */
  details?: KnowledgeBaseErrorDetail[];
  /** The error additional info. */
  additionalInfo?: KnowledgeBaseErrorAdditionalInfo[];
}

export function knowledgeBaseErrorDetailDeserializer(
  item: any,
): KnowledgeBaseErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : knowledgeBaseErrorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : knowledgeBaseErrorAdditionalInfoArrayDeserializer(
          item["additionalInfo"],
        ),
  };
}

export function knowledgeBaseErrorDetailArrayDeserializer(
  result: Array<KnowledgeBaseErrorDetail>,
): any[] {
  return result.map((item) => {
    return knowledgeBaseErrorDetailDeserializer(item);
  });
}

export function knowledgeBaseErrorAdditionalInfoArrayDeserializer(
  result: Array<KnowledgeBaseErrorAdditionalInfo>,
): any[] {
  return result.map((item) => {
    return knowledgeBaseErrorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface KnowledgeBaseErrorAdditionalInfo {
  /** The additional info type. */
  type?: string;
  /** The additional info. */
  info?: Record<string, string>;
}

export function knowledgeBaseErrorAdditionalInfoDeserializer(
  item: any,
): KnowledgeBaseErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** Represents an LLM query planning activity record. */
export interface KnowledgeBaseModelQueryPlanningActivityRecord
  extends KnowledgeBaseActivityRecord {
  /** The discriminator value. */
  type: "modelQueryPlanning";
  /** The number of input tokens for the LLM query planning activity. */
  inputTokens?: number;
  /** The number of output tokens for the LLM query planning activity. */
  outputTokens?: number;
}

export function knowledgeBaseModelQueryPlanningActivityRecordDeserializer(
  item: any,
): KnowledgeBaseModelQueryPlanningActivityRecord {
  return {
    id: item["id"],
    type: item["type"],
    elapsedMs: item["elapsedMs"],
    error: !item["error"]
      ? item["error"]
      : knowledgeBaseErrorDetailDeserializer(item["error"]),
    inputTokens: item["inputTokens"],
    outputTokens: item["outputTokens"],
  };
}

/** Represents an LLM answer synthesis activity record. */
export interface KnowledgeBaseModelAnswerSynthesisActivityRecord
  extends KnowledgeBaseActivityRecord {
  /** The discriminator value. */
  type: "modelAnswerSynthesis";
  /** The number of input tokens for the LLM answer synthesis activity. */
  inputTokens?: number;
  /** The number of output tokens for the LLM answer synthesis activity. */
  outputTokens?: number;
}

export function knowledgeBaseModelAnswerSynthesisActivityRecordDeserializer(
  item: any,
): KnowledgeBaseModelAnswerSynthesisActivityRecord {
  return {
    id: item["id"],
    type: item["type"],
    elapsedMs: item["elapsedMs"],
    error: !item["error"]
      ? item["error"]
      : knowledgeBaseErrorDetailDeserializer(item["error"]),
    inputTokens: item["inputTokens"],
    outputTokens: item["outputTokens"],
  };
}

/** Represents an agentic reasoning activity record. */
export interface KnowledgeBaseAgenticReasoningActivityRecord
  extends KnowledgeBaseActivityRecord {
  /** The discriminator value. */
  type: "agenticReasoning";
  /** The number of input tokens for agentic reasoning. */
  reasoningTokens?: number;
  /** The retrieval reasoning effort configuration. */
  retrievalReasoningEffort?: KnowledgeRetrievalReasoningEffortUnion;
}

export function knowledgeBaseAgenticReasoningActivityRecordDeserializer(
  item: any,
): KnowledgeBaseAgenticReasoningActivityRecord {
  return {
    id: item["id"],
    type: item["type"],
    elapsedMs: item["elapsedMs"],
    error: !item["error"]
      ? item["error"]
      : knowledgeBaseErrorDetailDeserializer(item["error"]),
    reasoningTokens: item["reasoningTokens"],
    retrievalReasoningEffort: !item["retrievalReasoningEffort"]
      ? item["retrievalReasoningEffort"]
      : knowledgeRetrievalReasoningEffortUnionDeserializer(
          item["retrievalReasoningEffort"],
        ),
  };
}

export function knowledgeBaseReferenceUnionArrayDeserializer(
  result: Array<KnowledgeBaseReferenceUnion>,
): any[] {
  return result.map((item) => {
    return knowledgeBaseReferenceUnionDeserializer(item);
  });
}

/** Base type for references. */
export interface KnowledgeBaseReference {
  /** The type of the reference. */
  /** The discriminator possible values: searchIndex, azureBlob, indexedSharePoint, indexedOneLake, web, remoteSharePoint */
  type: string;
  /** The ID of the reference. */
  id: string;
  /** The source activity ID for the reference. */
  activitySource: number;
  /** The source data for the reference. */
  sourceData?: Record<string, string>;
  /** The reranker score for the document reference. */
  rerankerScore?: number;
}

export function knowledgeBaseReferenceDeserializer(
  item: any,
): KnowledgeBaseReference {
  return {
    type: item["type"],
    id: item["id"],
    activitySource: item["activitySource"],
    sourceData: item["sourceData"],
    rerankerScore: item["rerankerScore"],
  };
}

/** Alias for KnowledgeBaseReferenceUnion */
export type KnowledgeBaseReferenceUnion =
  | KnowledgeBaseSearchIndexReference
  | KnowledgeBaseAzureBlobReference
  | KnowledgeBaseIndexedSharePointReference
  | KnowledgeBaseIndexedOneLakeReference
  | KnowledgeBaseWebReference
  | KnowledgeBaseRemoteSharePointReference
  | KnowledgeBaseReference;

export function knowledgeBaseReferenceUnionDeserializer(
  item: any,
): KnowledgeBaseReferenceUnion {
  switch (item.type) {
    case "searchIndex":
      return knowledgeBaseSearchIndexReferenceDeserializer(
        item as KnowledgeBaseSearchIndexReference,
      );

    case "azureBlob":
      return knowledgeBaseAzureBlobReferenceDeserializer(
        item as KnowledgeBaseAzureBlobReference,
      );

    case "indexedSharePoint":
      return knowledgeBaseIndexedSharePointReferenceDeserializer(
        item as KnowledgeBaseIndexedSharePointReference,
      );

    case "indexedOneLake":
      return knowledgeBaseIndexedOneLakeReferenceDeserializer(
        item as KnowledgeBaseIndexedOneLakeReference,
      );

    case "web":
      return knowledgeBaseWebReferenceDeserializer(
        item as KnowledgeBaseWebReference,
      );

    case "remoteSharePoint":
      return knowledgeBaseRemoteSharePointReferenceDeserializer(
        item as KnowledgeBaseRemoteSharePointReference,
      );

    default:
      return knowledgeBaseReferenceDeserializer(item);
  }
}

/** Represents an Azure Search document reference. */
export interface KnowledgeBaseSearchIndexReference
  extends KnowledgeBaseReference {
  /** The discriminator value. */
  type: "searchIndex";
  /** The document key for the reference. */
  docKey?: string;
}

export function knowledgeBaseSearchIndexReferenceDeserializer(
  item: any,
): KnowledgeBaseSearchIndexReference {
  return {
    type: item["type"],
    id: item["id"],
    activitySource: item["activitySource"],
    sourceData: item["sourceData"],
    rerankerScore: item["rerankerScore"],
    docKey: item["docKey"],
  };
}

/** Represents an Azure Blob Storage document reference. */
export interface KnowledgeBaseAzureBlobReference
  extends KnowledgeBaseReference {
  /** The discriminator value. */
  type: "azureBlob";
  /** The blob URL for the reference. */
  blobUrl?: string;
}

export function knowledgeBaseAzureBlobReferenceDeserializer(
  item: any,
): KnowledgeBaseAzureBlobReference {
  return {
    type: item["type"],
    id: item["id"],
    activitySource: item["activitySource"],
    sourceData: item["sourceData"],
    rerankerScore: item["rerankerScore"],
    blobUrl: item["blobUrl"],
  };
}

/** Represents an indexed SharePoint document reference. */
export interface KnowledgeBaseIndexedSharePointReference
  extends KnowledgeBaseReference {
  /** The discriminator value. */
  type: "indexedSharePoint";
  /** The document URL for the reference. */
  docUrl?: string;
}

export function knowledgeBaseIndexedSharePointReferenceDeserializer(
  item: any,
): KnowledgeBaseIndexedSharePointReference {
  return {
    type: item["type"],
    id: item["id"],
    activitySource: item["activitySource"],
    sourceData: item["sourceData"],
    rerankerScore: item["rerankerScore"],
    docUrl: item["docUrl"],
  };
}

/** Represents an indexed OneLake document reference. */
export interface KnowledgeBaseIndexedOneLakeReference
  extends KnowledgeBaseReference {
  /** The discriminator value. */
  type: "indexedOneLake";
  /** The document URL for the reference. */
  docUrl?: string;
}

export function knowledgeBaseIndexedOneLakeReferenceDeserializer(
  item: any,
): KnowledgeBaseIndexedOneLakeReference {
  return {
    type: item["type"],
    id: item["id"],
    activitySource: item["activitySource"],
    sourceData: item["sourceData"],
    rerankerScore: item["rerankerScore"],
    docUrl: item["docUrl"],
  };
}

/** Represents a web document reference. */
export interface KnowledgeBaseWebReference extends KnowledgeBaseReference {
  /** The discriminator value. */
  type: "web";
  /** The url the reference data originated from. */
  url: string;
  /** The title of the web document. */
  title?: string;
}

export function knowledgeBaseWebReferenceDeserializer(
  item: any,
): KnowledgeBaseWebReference {
  return {
    type: item["type"],
    id: item["id"],
    activitySource: item["activitySource"],
    sourceData: item["sourceData"],
    rerankerScore: item["rerankerScore"],
    url: item["url"],
    title: item["title"],
  };
}

/** Represents a remote SharePoint document reference. */
export interface KnowledgeBaseRemoteSharePointReference
  extends KnowledgeBaseReference {
  /** The discriminator value. */
  type: "remoteSharePoint";
  /** The url the reference data originated from. */
  webUrl: string;
  /** Information about the sensitivity label applied to the SharePoint document. */
  searchSensitivityLabelInfo?: SharePointSensitivityLabelInfo;
}

export function knowledgeBaseRemoteSharePointReferenceDeserializer(
  item: any,
): KnowledgeBaseRemoteSharePointReference {
  return {
    type: item["type"],
    id: item["id"],
    activitySource: item["activitySource"],
    sourceData: item["sourceData"],
    rerankerScore: item["rerankerScore"],
    webUrl: item["webUrl"],
    searchSensitivityLabelInfo: !item["searchSensitivityLabelInfo"]
      ? item["searchSensitivityLabelInfo"]
      : sharePointSensitivityLabelInfoDeserializer(
          item["searchSensitivityLabelInfo"],
        ),
  };
}

/** Information about the sensitivity label applied to a SharePoint document. */
export interface SharePointSensitivityLabelInfo {
  /** The display name for the sensitivity label. */
  displayName?: string;
  /** The ID of the sensitivity label. */
  sensitivityLabelId?: string;
  /** The tooltip that should be displayed for the label in a UI. */
  tooltip?: string;
  /** The priority in which the sensitivity label is applied. */
  priority?: number;
  /** The color that the UI should display for the label, if configured. */
  color?: string;
  /** Indicates whether the sensitivity label enforces encryption. */
  isEncrypted?: boolean;
}

export function sharePointSensitivityLabelInfoDeserializer(
  item: any,
): SharePointSensitivityLabelInfo {
  return {
    displayName: item["displayName"],
    sensitivityLabelId: item["sensitivityLabelId"],
    tooltip: item["tooltip"],
    priority: item["priority"],
    color: item["color"],
    isEncrypted: item["isEncrypted"],
  };
}
