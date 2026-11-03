// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { OperationState } from "../../../models.js";
import {
  ByType,
  tagArraySerializer,
  tagArrayDeserializer,
  Tag,
  ProvisioningState,
} from "../common/models.js";
import { ErrorModel } from "@azure-rest/core-client";

/** A knowledgeBase. */
export interface KnowledgeBase {
  /** The knowledgeBase name. */
  readonly name: string;
  /** The ID for the resource. */
  readonly id?: string;
  /** The name of the associated Bookshelf tracked resource. */
  readonly bookshelfName: string;
  /** Storage asset references to index. */
  storageAssetReferences?: StorageAssetReference[];
  /** URL to access the knowledge base. */
  readonly knowledgeBaseUrl?: string;
  /** Provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** Error details if provisioning failed. */
  readonly error?: ErrorModel;
  /** The status */
  readonly status?: IndexingStatus;
  /** The API version used to create this knowledge base. */
  readonly createdByApiVersion?: string;
  /** The details of the most recent indexing run. */
  readonly lastIndexingRun?: LastIndexingRun;
  /** The timestamp when the resource was created */
  readonly createdAt?: Date;
  /** The ID of the user who created this resource. */
  readonly createdBy?: string;
  /** The type of user who created this resource. */
  readonly createdByType?: ByType;
  /** The timestamp when the resource was last updated */
  readonly lastModifiedAt?: Date;
  /** The ID of the user who updated this resource. */
  readonly lastModifiedBy?: string;
  /** The type of user who updated this resource. */
  readonly lastModifiedByType?: ByType;
  /** The tags */
  tags?: Tag[];
  /** The description */
  description: string;
  /** The copilot instruction */
  copilotInstruction: string;
}

/** The writable properties supplied when creating or updating a {@link KnowledgeBase}. */
export type KnowledgeBaseCreateOrUpdateContent = Pick<
  KnowledgeBase,
  "storageAssetReferences" | "tags" | "description" | "copilotInstruction"
>;

export function knowledgeBaseSerializer(item: KnowledgeBase): any {
  return {
    storageAssetReferences: !item["storageAssetReferences"]
      ? item["storageAssetReferences"]
      : storageAssetReferenceArraySerializer(item["storageAssetReferences"]),
    tags: !item["tags"] ? item["tags"] : tagArraySerializer(item["tags"]),
    description: item["description"],
    copilotInstruction: item["copilotInstruction"],
  };
}

export function knowledgeBaseDeserializer(item: any): KnowledgeBase {
  return {
    name: item["name"],
    id: item["id"],
    bookshelfName: item["bookshelfName"],
    storageAssetReferences: !item["storageAssetReferences"]
      ? item["storageAssetReferences"]
      : storageAssetReferenceArrayDeserializer(item["storageAssetReferences"]),
    knowledgeBaseUrl: item["knowledgeBaseUrl"],
    provisioningState: item["provisioningState"],
    error: !item["error"] ? item["error"] : item["error"],
    status: item["status"],
    createdByApiVersion: item["createdByApiVersion"],
    lastIndexingRun: !item["lastIndexingRun"]
      ? item["lastIndexingRun"]
      : lastIndexingRunDeserializer(item["lastIndexingRun"]),
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    tags: !item["tags"] ? item["tags"] : tagArrayDeserializer(item["tags"]),
    description: item["description"],
    copilotInstruction: item["copilotInstruction"],
  };
}

export function storageAssetReferenceArraySerializer(result: Array<StorageAssetReference>): any[] {
  return result.map((item) => {
    return storageAssetReferenceSerializer(item);
  });
}

export function storageAssetReferenceArrayDeserializer(
  result: Array<StorageAssetReference>,
): any[] {
  return result.map((item) => {
    return storageAssetReferenceDeserializer(item);
  });
}

/** Reference to a storage asset with identity information. */
export interface StorageAssetReference {
  /** The ARM resource ID of the storage asset. */
  id: string;
  /** The ARM resource ID of the User Assigned Managed Identity to access the storage asset. */
  userAssignedIdentity?: string;
}

export function storageAssetReferenceSerializer(item: StorageAssetReference): any {
  return { id: item["id"], userAssignedIdentity: item["userAssignedIdentity"] };
}

export function storageAssetReferenceDeserializer(item: any): StorageAssetReference {
  return {
    id: item["id"],
    userAssignedIdentity: item["userAssignedIdentity"],
  };
}

/** Enum for IndexingStatus */
export enum KnownIndexingStatus {
  /** Indexing Not started */
  NotStarted = "NotStarted",
  /** Running */
  Running = "Running",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * Enum for IndexingStatus \
 * {@link KnownIndexingStatus} can be used interchangeably with IndexingStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: Indexing Not started \
 * **Running**: Running \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type IndexingStatus = string;

/** The details of the last indexing run. */
export interface LastIndexingRun {
  /** The operation run identifier. */
  runId?: string;
  /** The status of the indexing run. */
  status?: IndexingStatus;
  /** Error object that describes the error when status is 'Failed'. */
  error?: ErrorModel;
  /** Indexing metrics for the run. */
  indexingMetrics?: IndexingMetrics;
}

export function lastIndexingRunDeserializer(item: any): LastIndexingRun {
  return {
    runId: item["runId"],
    status: item["status"],
    error: !item["error"] ? item["error"] : item["error"],
    indexingMetrics: !item["indexingMetrics"]
      ? item["indexingMetrics"]
      : indexingMetricsDeserializer(item["indexingMetrics"]),
  };
}

/** Indexing metrics for a run. */
export interface IndexingMetrics {
  /** The number of documents that were successfully processed. */
  documentsProcessed: number;
  /** The number of documents that failed during indexing. */
  documentsFailed: number;
  /** The total number of documents considered for indexing. */
  documentsTotal: number;
  /** The indexing completion percentage from 0 to 100. */
  indexingPercentageComplete: number;
  /** The UTC timestamp when enrichment started. */
  enrichmentStartTimeUtc?: Date;
  /** The UTC timestamp when enrichment ended. */
  enrichmentEndTimeUtc?: Date;
  /** The UTC timestamp when indexing started. */
  indexingStartTimeUtc?: Date;
  /** The UTC timestamp when indexing ended. */
  indexingEndTimeUtc?: Date;
}

export function indexingMetricsDeserializer(item: any): IndexingMetrics {
  return {
    documentsProcessed: item["documentsProcessed"],
    documentsFailed: item["documentsFailed"],
    documentsTotal: item["documentsTotal"],
    indexingPercentageComplete: item["indexingPercentageComplete"],
    enrichmentStartTimeUtc: !item["enrichmentStartTimeUtc"]
      ? item["enrichmentStartTimeUtc"]
      : new Date(item["enrichmentStartTimeUtc"]),
    enrichmentEndTimeUtc: !item["enrichmentEndTimeUtc"]
      ? item["enrichmentEndTimeUtc"]
      : new Date(item["enrichmentEndTimeUtc"]),
    indexingStartTimeUtc: !item["indexingStartTimeUtc"]
      ? item["indexingStartTimeUtc"]
      : new Date(item["indexingStartTimeUtc"]),
    indexingEndTimeUtc: !item["indexingEndTimeUtc"]
      ? item["indexingEndTimeUtc"]
      : new Date(item["indexingEndTimeUtc"]),
  };
}

/** Response indicating the KnowledgeBase operation. */
export interface KnowledgeBaseOperationResponse {
  /** The unique ID of the operation. */
  id: string;
  /** The status of the operation. */
  status: OperationState;
  /** Error object that describes the error when status is 'Failed'. */
  error?: ErrorModel;
  /** The type of operation. */
  /** The discriminator possible values: Indexing, Search */
  operationType: KnowledgeBaseOperationType;
}

export function knowledgeBaseOperationResponseDeserializer(
  item: any,
): KnowledgeBaseOperationResponse {
  return {
    id: item["id"],
    status: item["status"],
    error: !item["error"] ? item["error"] : item["error"],
    operationType: item["operationType"],
  };
}

/** Alias for KnowledgeBaseOperationResponseUnion */
export type KnowledgeBaseOperationResponseUnion =
  | KnowledgeBaseIndexingOperationResponse
  | KnowledgeBaseSearchOperationResponse
  | KnowledgeBaseOperationResponse;

export function knowledgeBaseOperationResponseUnionDeserializer(
  item: any,
): KnowledgeBaseOperationResponseUnion {
  switch (item["operationType"]) {
    case "Indexing":
      return knowledgeBaseIndexingOperationResponseDeserializer(
        item as KnowledgeBaseIndexingOperationResponse,
      );

    case "Search":
      return knowledgeBaseSearchOperationResponseDeserializer(
        item as KnowledgeBaseSearchOperationResponse,
      );

    default:
      return knowledgeBaseOperationResponseDeserializer(item);
  }
}

/** Status indicating the KnowledgeBase operation. */
export enum KnownKnowledgeBaseOperationType {
  /** An indexing operation. */
  Indexing = "Indexing",
  /** A cancel indexing operation. */
  CancelIndexing = "CancelIndexing",
  /** A search operation. */
  Search = "Search",
  /** A delete operation. */
  Delete = "Delete",
}

/**
 * Status indicating the KnowledgeBase operation. \
 * {@link KnownKnowledgeBaseOperationType} can be used interchangeably with KnowledgeBaseOperationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Indexing**: An indexing operation. \
 * **CancelIndexing**: A cancel indexing operation. \
 * **Search**: A search operation. \
 * **Delete**: A delete operation.
 */
export type KnowledgeBaseOperationType = string;

/** Response for indexing operations. */
export interface KnowledgeBaseIndexingOperationResponse extends KnowledgeBaseOperationResponse {
  /** The type of operation. */
  operationType: "Indexing";
  /** Result details for indexing operations. */
  indexingResult?: IndexingOperationResult;
}

export function knowledgeBaseIndexingOperationResponseDeserializer(
  item: any,
): KnowledgeBaseIndexingOperationResponse {
  return {
    id: item["id"],
    status: item["status"],
    error: !item["error"] ? item["error"] : item["error"],
    operationType: item["operationType"],
    indexingResult: !item["indexingResult"]
      ? item["indexingResult"]
      : indexingOperationResultDeserializer(item["indexingResult"]),
  };
}

/** Result details for an indexing operation. */
export interface IndexingOperationResult {
  /** The operation run identifier. */
  runId: string;
  /** Indexing run metrics. */
  metrics?: IndexingMetrics;
}

export function indexingOperationResultDeserializer(item: any): IndexingOperationResult {
  return {
    runId: item["runId"],
    metrics: !item["metrics"] ? item["metrics"] : indexingMetricsDeserializer(item["metrics"]),
  };
}

/** Response for search operations. */
export interface KnowledgeBaseSearchOperationResponse extends KnowledgeBaseOperationResponse {
  /** The type of operation. */
  operationType: "Search";
  /** Result details for search operations. */
  searchResult?: SearchResponse;
}

export function knowledgeBaseSearchOperationResponseDeserializer(
  item: any,
): KnowledgeBaseSearchOperationResponse {
  return {
    id: item["id"],
    status: item["status"],
    error: !item["error"] ? item["error"] : item["error"],
    operationType: item["operationType"],
    searchResult: !item["searchResult"]
      ? item["searchResult"]
      : searchResponseDeserializer(item["searchResult"]),
  };
}

/** Results of a knowledge base search. */
export interface SearchResponse {
  /** The search results. */
  searchResults: SearchResultItem[];
}

export function searchResponseDeserializer(item: any): SearchResponse {
  return {
    searchResults: searchResultItemArrayDeserializer(item["searchResults"]),
  };
}

export function searchResultItemArrayDeserializer(result: Array<SearchResultItem>): any[] {
  return result.map((item) => {
    return searchResultItemDeserializer(item);
  });
}

/** A single search result item. */
export interface SearchResultItem {
  /** The generated response text for this result. */
  text: string;
  /** Source citations for this result. */
  citations?: Citation[];
}

export function searchResultItemDeserializer(item: any): SearchResultItem {
  return {
    text: item["text"],
    citations: !item["citations"]
      ? item["citations"]
      : citationArrayDeserializer(item["citations"]),
  };
}

export function citationArrayDeserializer(result: Array<Citation>): any[] {
  return result.map((item) => {
    return citationDeserializer(item);
  });
}

/** A citation for a generated result. */
export interface Citation {
  /** The type of citation. */
  type: CitationType;
  /** Zero-based index of the citation in the result. */
  index?: number;
  /** The source file name. */
  fileName: string;
  /** Character offset where the cited passage begins. */
  startOffset?: number;
  /** Character offset where the cited passage ends. */
  endOffset?: number;
}

export function citationDeserializer(item: any): Citation {
  return {
    type: item["type"],
    index: item["index"],
    fileName: item["fileName"],
    startOffset: item["startOffset"],
    endOffset: item["endOffset"],
  };
}

/** The type of citation. */
export enum KnownCitationType {
  /** A file citation. */
  FileCitation = "file_citation",
}

/**
 * The type of citation. \
 * {@link KnownCitationType} can be used interchangeably with CitationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **file_citation**: A file citation.
 */
export type CitationType = string;

export function knowledgeBaseArraySerializer(result: Array<KnowledgeBase>): any[] {
  return result.map((item) => {
    return knowledgeBaseSerializer(item);
  });
}

export function knowledgeBaseArrayDeserializer(result: Array<KnowledgeBase>): any[] {
  return result.map((item) => {
    return knowledgeBaseDeserializer(item);
  });
}

/** The search action request body. */
export interface SearchRequest {
  /** The query text to search against the knowledge base. */
  query: string;
}

export function searchRequestSerializer(item: SearchRequest): any {
  return { query: item["query"] };
}
