// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  searchResourceEncryptionKeySerializer,
  searchResourceEncryptionKeyDeserializer,
  searchIndexerDataIdentityUnionSerializer,
  searchIndexerDataIdentityUnionDeserializer,
  SearchIndexerDataIdentityUnion,
  KnowledgeSource,
  IndexingSchedule,
  indexingScheduleSerializer,
  indexingScheduleDeserializer,
  CreatedResources,
  createdResourcesSerializer,
  BlobIndexerDataToExtract,
  BlobIndexerImageAction,
  BlobIndexerParsingMode,
  MarkdownHeaderDepth,
  MarkdownParsingSubmode,
  BlobIndexerPDFTextRotationAlgorithm,
} from "./azure/search/documents/indexes/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Configuration for SharePoint knowledge source. */
export interface IndexedSharePointKnowledgeSource extends KnowledgeSource {
  kind: "indexedSharePoint";
  /** The parameters for the knowledge source. */
  indexedSharePointParameters: IndexedSharePointKnowledgeSourceParameters;
}

export function indexedSharePointKnowledgeSourceSerializer(
  item: IndexedSharePointKnowledgeSource,
): any {
  return {
    description: item["description"],
    kind: item["kind"],
    "@odata.etag": item["eTag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
    indexedSharePointParameters: indexedSharePointKnowledgeSourceParametersSerializer(
      item["indexedSharePointParameters"],
    ),
  };
}

export function indexedSharePointKnowledgeSourceDeserializer(
  item: any,
): IndexedSharePointKnowledgeSource {
  return {
    name: item["name"],
    description: item["description"],
    kind: item["kind"],
    eTag: item["@odata.etag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
    indexedSharePointParameters: indexedSharePointKnowledgeSourceParametersDeserializer(
      item["indexedSharePointParameters"],
    ),
  };
}

/** Parameters for SharePoint knowledge source. */
export interface IndexedSharePointKnowledgeSourceParameters {
  /** An explicit identity to use for this knowledge source. */
  identity?: SearchIndexerDataIdentityUnion;
  /** Key-based connection string or the ResourceId format if using a managed identity. */
  connectionString: string;
  /** The name of the SharePoint container. */
  containerName: string;
  /** Optional query to filter SharePoint content. */
  query?: string;
  /** Optional ingestion parameters. */
  ingestionParameters?: KnowledgeSourceIngestionParameters;
}

export function indexedSharePointKnowledgeSourceParametersSerializer(
  item: IndexedSharePointKnowledgeSourceParameters,
): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : searchIndexerDataIdentityUnionSerializer(item["identity"]),
    connectionString: item["connectionString"],
    containerName: item["containerName"],
    query: item["query"],
    ingestionParameters: !item["ingestionParameters"]
      ? item["ingestionParameters"]
      : knowledgeSourceIngestionParametersSerializer(item["ingestionParameters"]),
  };
}

export function indexedSharePointKnowledgeSourceParametersDeserializer(
  item: any,
): IndexedSharePointKnowledgeSourceParameters {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : searchIndexerDataIdentityUnionDeserializer(item["identity"]),
    connectionString: item["connectionString"],
    containerName: item["containerName"],
    query: item["query"],
    ingestionParameters: !item["ingestionParameters"]
      ? item["ingestionParameters"]
      : knowledgeSourceIngestionParametersDeserializer(item["ingestionParameters"]),
  };
}

/** Consolidates all general ingestion settings for knowledge sources. */
export interface KnowledgeSourceIngestionParameters {
  /** The schedule for ingestion. */
  ingestionSchedule?: IndexingSchedule;
  /** The AI Services configuration. */
  aiServices?: AIServices;
  /** The maximum number of items to extract from the source. */
  maxItemsToExtract?: number;
  /** The maximum size of the document to extract. */
  maxDocumentExtractionSize?: number;
  /** The data to extract from the source. */
  dataToExtract?: BlobIndexerDataToExtract;
  /** The action to take on images. */
  imageAction?: BlobIndexerImageAction;
  /** The parsing mode to use. */
  parsingMode?: BlobIndexerParsingMode;
  /** Whether to fail on unprocessable document. */
  failOnUnprocessableDocument?: boolean;
  /** Whether to fail on unsupported content type. */
  failOnUnsupportedContentType?: boolean;
  /** Indexed file name extensions. */
  indexedFileNameExtensions?: string[];
  /** Excluded file name extensions. */
  excludedFileNameExtensions?: string[];
  /** Whether to index storage metadata only for oversized documents. */
  indexStorageMetadataOnlyForOversizedDocuments?: boolean;
  /** Delimited text delimiter. */
  delimitedTextDelimiter?: string;
  /** Whether the first line contains headers. */
  firstLineContainsHeaders?: boolean;
  /** Delimited text headers. */
  delimitedTextHeaders?: string;
  /** The document root. */
  documentRoot?: string;
  /** The markdown header depth. */
  markdownHeaderDepth?: MarkdownHeaderDepth;
  /** The markdown parsing submode. */
  markdownParsingSubmode?: MarkdownParsingSubmode;
  /** The PDF text rotation algorithm. */
  pdfTextRotationAlgorithm?: BlobIndexerPDFTextRotationAlgorithm;
  /** Permission options for ingestion. */
  ingestionPermissionOptions?: KnowledgeSourceIngestionPermissionOption[];
  /** Whether to allow skillset to read file data. */
  allowSkillsetToReadFileData?: boolean;
  /** Optional content extraction mode. Default is 'minimal'. */
  contentExtractionMode?: KnowledgeSourceContentExtractionMode;
}

export function knowledgeSourceIngestionParametersSerializer(
  item: KnowledgeSourceIngestionParameters,
): any {
  return {
    ingestionSchedule: !item["ingestionSchedule"]
      ? item["ingestionSchedule"]
      : indexingScheduleSerializer(item["ingestionSchedule"]),
    aiServices: !item["aiServices"] ? item["aiServices"] : aiServicesSerializer(item["aiServices"]),
    maxItemsToExtract: item["maxItemsToExtract"],
    maxDocumentExtractionSize: item["maxDocumentExtractionSize"],
    dataToExtract: item["dataToExtract"],
    imageAction: item["imageAction"],
    parsingMode: item["parsingMode"],
    failOnUnprocessableDocument: item["failOnUnprocessableDocument"],
    failOnUnsupportedContentType: item["failOnUnsupportedContentType"],
    indexedFileNameExtensions: !item["indexedFileNameExtensions"]
      ? item["indexedFileNameExtensions"]
      : item["indexedFileNameExtensions"].map((p: any) => {
          return p;
        }),
    excludedFileNameExtensions: !item["excludedFileNameExtensions"]
      ? item["excludedFileNameExtensions"]
      : item["excludedFileNameExtensions"].map((p: any) => {
          return p;
        }),
    indexStorageMetadataOnlyForOversizedDocuments:
      item["indexStorageMetadataOnlyForOversizedDocuments"],
    delimitedTextDelimiter: item["delimitedTextDelimiter"],
    firstLineContainsHeaders: item["firstLineContainsHeaders"],
    delimitedTextHeaders: item["delimitedTextHeaders"],
    documentRoot: item["documentRoot"],
    markdownHeaderDepth: item["markdownHeaderDepth"],
    markdownParsingSubmode: item["markdownParsingSubmode"],
    pdfTextRotationAlgorithm: item["pdfTextRotationAlgorithm"],
    ingestionPermissionOptions: !item["ingestionPermissionOptions"]
      ? item["ingestionPermissionOptions"]
      : item["ingestionPermissionOptions"].map((p: any) => {
          return p;
        }),
    allowSkillsetToReadFileData: item["allowSkillsetToReadFileData"],
    contentExtractionMode: item["contentExtractionMode"],
  };
}

export function knowledgeSourceIngestionParametersDeserializer(
  item: any,
): KnowledgeSourceIngestionParameters {
  return {
    ingestionSchedule: !item["ingestionSchedule"]
      ? item["ingestionSchedule"]
      : indexingScheduleDeserializer(item["ingestionSchedule"]),
    aiServices: !item["aiServices"]
      ? item["aiServices"]
      : aiServicesDeserializer(item["aiServices"]),
    maxItemsToExtract: item["maxItemsToExtract"],
    maxDocumentExtractionSize: item["maxDocumentExtractionSize"],
    dataToExtract: item["dataToExtract"],
    imageAction: item["imageAction"],
    parsingMode: item["parsingMode"],
    failOnUnprocessableDocument: item["failOnUnprocessableDocument"],
    failOnUnsupportedContentType: item["failOnUnsupportedContentType"],
    indexedFileNameExtensions: !item["indexedFileNameExtensions"]
      ? item["indexedFileNameExtensions"]
      : item["indexedFileNameExtensions"].map((p: any) => {
          return p;
        }),
    excludedFileNameExtensions: !item["excludedFileNameExtensions"]
      ? item["excludedFileNameExtensions"]
      : item["excludedFileNameExtensions"].map((p: any) => {
          return p;
        }),
    indexStorageMetadataOnlyForOversizedDocuments:
      item["indexStorageMetadataOnlyForOversizedDocuments"],
    delimitedTextDelimiter: item["delimitedTextDelimiter"],
    firstLineContainsHeaders: item["firstLineContainsHeaders"],
    delimitedTextHeaders: item["delimitedTextHeaders"],
    documentRoot: item["documentRoot"],
    markdownHeaderDepth: item["markdownHeaderDepth"],
    markdownParsingSubmode: item["markdownParsingSubmode"],
    pdfTextRotationAlgorithm: item["pdfTextRotationAlgorithm"],
    ingestionPermissionOptions: !item["ingestionPermissionOptions"]
      ? item["ingestionPermissionOptions"]
      : item["ingestionPermissionOptions"].map((p: any) => {
          return p;
        }),
    allowSkillsetToReadFileData: item["allowSkillsetToReadFileData"],
    contentExtractionMode: item["contentExtractionMode"],
  };
}

/** Parameters for AI Services. */
export interface AIServices {
  /** The URI of the AI Services endpoint. */
  uri: string;
  /** The API key for accessing AI Services. */
  apiKey?: string;
}

export function aiServicesSerializer(item: AIServices): any {
  return { uri: item["uri"], apiKey: item["apiKey"] };
}

export function aiServicesDeserializer(item: any): AIServices {
  return {
    uri: item["uri"],
    apiKey: item["apiKey"],
  };
}

/** Permission types to ingest together with document content. */
export enum KnownKnowledgeSourceIngestionPermissionOption {
  /** Ingest explicit user identifiers alongside document content. */
  UserIds = "userIds",
  /** Ingest group identifiers alongside document content. */
  GroupIds = "groupIds",
  /** Ingest RBAC scope information alongside document content. */
  RbacScope = "rbacScope",
}

/**
 * Permission types to ingest together with document content. \
 * {@link KnownKnowledgeSourceIngestionPermissionOption} can be used interchangeably with KnowledgeSourceIngestionPermissionOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **userIds**: Ingest explicit user identifiers alongside document content. \
 * **groupIds**: Ingest group identifiers alongside document content. \
 * **rbacScope**: Ingest RBAC scope information alongside document content.
 */
export type KnowledgeSourceIngestionPermissionOption = string;

/** Optional content extraction mode. Default is 'minimal'. */
export enum KnownKnowledgeSourceContentExtractionMode {
  /** Extracts only essential metadata while deferring most content processing. */
  Minimal = "minimal",
  /** Performs the full default content extraction pipeline. */
  Standard = "standard",
}

/**
 * Optional content extraction mode. Default is 'minimal'. \
 * {@link KnownKnowledgeSourceContentExtractionMode} can be used interchangeably with KnowledgeSourceContentExtractionMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **minimal**: Extracts only essential metadata while deferring most content processing. \
 * **standard**: Performs the full default content extraction pipeline.
 */
export type KnowledgeSourceContentExtractionMode = string;

/** Configuration for OneLake knowledge source. */
export interface IndexedOneLakeKnowledgeSource extends KnowledgeSource {
  kind: "indexedOneLake";
  /** The parameters for the knowledge source. */
  indexedOneLakeParameters: IndexedOneLakeKnowledgeSourceParameters;
}

export function indexedOneLakeKnowledgeSourceSerializer(item: IndexedOneLakeKnowledgeSource): any {
  return {
    description: item["description"],
    kind: item["kind"],
    "@odata.etag": item["eTag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
    indexedOneLakeParameters: indexedOneLakeKnowledgeSourceParametersSerializer(
      item["indexedOneLakeParameters"],
    ),
  };
}

export function indexedOneLakeKnowledgeSourceDeserializer(
  item: any,
): IndexedOneLakeKnowledgeSource {
  return {
    name: item["name"],
    description: item["description"],
    kind: item["kind"],
    eTag: item["@odata.etag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
    indexedOneLakeParameters: indexedOneLakeKnowledgeSourceParametersDeserializer(
      item["indexedOneLakeParameters"],
    ),
  };
}

/** Parameters for OneLake knowledge source. */
export interface IndexedOneLakeKnowledgeSourceParameters {
  /** The Fabric workspace ID. */
  fabricWorkspaceId: string;
  /** The lakehouse ID. */
  lakehouseId: string;
  /** Optional target path within the lakehouse. */
  targetPath?: string;
  /** Optional ingestion parameters. */
  ingestionParameters?: KnowledgeSourceIngestionParameters;
}

export function indexedOneLakeKnowledgeSourceParametersSerializer(
  item: IndexedOneLakeKnowledgeSourceParameters,
): any {
  return {
    fabricWorkspaceId: item["fabricWorkspaceId"],
    lakehouseId: item["lakehouseId"],
    targetPath: item["targetPath"],
    ingestionParameters: !item["ingestionParameters"]
      ? item["ingestionParameters"]
      : knowledgeSourceIngestionParametersSerializer(item["ingestionParameters"]),
  };
}

export function indexedOneLakeKnowledgeSourceParametersDeserializer(
  item: any,
): IndexedOneLakeKnowledgeSourceParameters {
  return {
    fabricWorkspaceId: item["fabricWorkspaceId"],
    lakehouseId: item["lakehouseId"],
    targetPath: item["targetPath"],
    ingestionParameters: !item["ingestionParameters"]
      ? item["ingestionParameters"]
      : knowledgeSourceIngestionParametersDeserializer(item["ingestionParameters"]),
  };
}

/** Knowledge Source targeting web results. */
export interface WebKnowledgeSource extends KnowledgeSource {
  kind: "web";
  /** The parameters for the web knowledge source. */
  webParameters?: WebKnowledgeSourceParameters;
}

export function webKnowledgeSourceSerializer(item: WebKnowledgeSource): any {
  return {
    description: item["description"],
    kind: item["kind"],
    "@odata.etag": item["eTag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
    webParameters: !item["webParameters"]
      ? item["webParameters"]
      : webKnowledgeSourceParametersSerializer(item["webParameters"]),
  };
}

export function webKnowledgeSourceDeserializer(item: any): WebKnowledgeSource {
  return {
    name: item["name"],
    description: item["description"],
    kind: item["kind"],
    eTag: item["@odata.etag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
    webParameters: !item["webParameters"]
      ? item["webParameters"]
      : webKnowledgeSourceParametersDeserializer(item["webParameters"]),
  };
}

/** Parameters for web knowledge source. */
export interface WebKnowledgeSourceParameters {
  /** Domain allow/block configuration for web results. */
  domains?: WebKnowledgeSourceDomains;
}

export function webKnowledgeSourceParametersSerializer(item: WebKnowledgeSourceParameters): any {
  return {
    domains: !item["domains"]
      ? item["domains"]
      : webKnowledgeSourceDomainsSerializer(item["domains"]),
  };
}

export function webKnowledgeSourceParametersDeserializer(item: any): WebKnowledgeSourceParameters {
  return {
    domains: !item["domains"]
      ? item["domains"]
      : webKnowledgeSourceDomainsDeserializer(item["domains"]),
  };
}

/** Domain allow/block configuration for web knowledge source. */
export interface WebKnowledgeSourceDomains {
  /** Domains that are allowed for web results. */
  allowedDomains?: WebKnowledgeSourceDomain[];
  /** Domains that are blocked from web results. */
  blockedDomains?: WebKnowledgeSourceDomain[];
}

export function webKnowledgeSourceDomainsSerializer(item: WebKnowledgeSourceDomains): any {
  return {
    allowedDomains: !item["allowedDomains"]
      ? item["allowedDomains"]
      : webKnowledgeSourceDomainArraySerializer(item["allowedDomains"]),
    blockedDomains: !item["blockedDomains"]
      ? item["blockedDomains"]
      : webKnowledgeSourceDomainArraySerializer(item["blockedDomains"]),
  };
}

export function webKnowledgeSourceDomainsDeserializer(item: any): WebKnowledgeSourceDomains {
  return {
    allowedDomains: !item["allowedDomains"]
      ? item["allowedDomains"]
      : webKnowledgeSourceDomainArrayDeserializer(item["allowedDomains"]),
    blockedDomains: !item["blockedDomains"]
      ? item["blockedDomains"]
      : webKnowledgeSourceDomainArrayDeserializer(item["blockedDomains"]),
  };
}

export function webKnowledgeSourceDomainArraySerializer(
  result: Array<WebKnowledgeSourceDomain>,
): any[] {
  return result.map((item) => {
    return webKnowledgeSourceDomainSerializer(item);
  });
}

export function webKnowledgeSourceDomainArrayDeserializer(
  result: Array<WebKnowledgeSourceDomain>,
): any[] {
  return result.map((item) => {
    return webKnowledgeSourceDomainDeserializer(item);
  });
}

/** Configuration for web knowledge source domain. */
export interface WebKnowledgeSourceDomain {
  /** The address of the domain. */
  address: string;
  /** Whether or not to include subpages from this domain. */
  includeSubpages?: boolean;
}

export function webKnowledgeSourceDomainSerializer(item: WebKnowledgeSourceDomain): any {
  return { address: item["address"], includeSubpages: item["includeSubpages"] };
}

export function webKnowledgeSourceDomainDeserializer(item: any): WebKnowledgeSourceDomain {
  return {
    address: item["address"],
    includeSubpages: item["includeSubpages"],
  };
}

/** Configuration for remote SharePoint knowledge source. */
export interface RemoteSharePointKnowledgeSource extends KnowledgeSource {
  kind: "remoteSharePoint";
  /** The parameters for the remote SharePoint knowledge source. */
  remoteSharePointParameters: RemoteSharePointKnowledgeSourceParameters;
}

export function remoteSharePointKnowledgeSourceSerializer(
  item: RemoteSharePointKnowledgeSource,
): any {
  return {
    description: item["description"],
    kind: item["kind"],
    "@odata.etag": item["eTag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
    remoteSharePointParameters: remoteSharePointKnowledgeSourceParametersSerializer(
      item["remoteSharePointParameters"],
    ),
  };
}

export function remoteSharePointKnowledgeSourceDeserializer(
  item: any,
): RemoteSharePointKnowledgeSource {
  return {
    name: item["name"],
    description: item["description"],
    kind: item["kind"],
    eTag: item["@odata.etag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
    remoteSharePointParameters: remoteSharePointKnowledgeSourceParametersDeserializer(
      item["remoteSharePointParameters"],
    ),
  };
}

/** Parameters for remote SharePoint knowledge source. */
export interface RemoteSharePointKnowledgeSourceParameters {
  /** Keyword Query Language (KQL) expression with queryable SharePoint properties and attributes to scope the retrieval before the query runs. */
  filterExpression?: string;
  /** A list of metadata fields to be returned for each item in the response. Only retrievable metadata properties can be included in this list. By default, no metadata is returned. */
  resourceMetadata?: string[];
  /** Container ID for SharePoint Embedded connection. When this is null, it will use SharePoint Online. */
  containerTypeId?: string;
}

export function remoteSharePointKnowledgeSourceParametersSerializer(
  item: RemoteSharePointKnowledgeSourceParameters,
): any {
  return {
    filterExpression: item["filterExpression"],
    resourceMetadata: !item["resourceMetadata"]
      ? item["resourceMetadata"]
      : item["resourceMetadata"].map((p: any) => {
          return p;
        }),
    containerTypeId: item["containerTypeId"],
  };
}

export function remoteSharePointKnowledgeSourceParametersDeserializer(
  item: any,
): RemoteSharePointKnowledgeSourceParameters {
  return {
    filterExpression: item["filterExpression"],
    resourceMetadata: !item["resourceMetadata"]
      ? item["resourceMetadata"]
      : item["resourceMetadata"].map((p: any) => {
          return p;
        }),
    containerTypeId: item["containerTypeId"],
  };
}

/** Represents service-level indexer runtime counters. */
export interface ServiceIndexersRuntime {
  /** Cumulative runtime of all indexers in the service from the beginningTime to endingTime, in seconds. */
  usedSeconds: number;
  /** Cumulative runtime remaining for all indexers in the service from the beginningTime to endingTime, in seconds. */
  remainingSeconds?: number;
  /** Beginning UTC time of the 24-hour period considered for indexer runtime usage (inclusive). */
  beginningTime: Date;
  /** End UTC time of the 24-hour period considered for indexer runtime usage (inclusive). */
  endingTime: Date;
}

export function serviceIndexersRuntimeDeserializer(item: any): ServiceIndexersRuntime {
  return {
    usedSeconds: item["usedSeconds"],
    remainingSeconds: item["remainingSeconds"],
    beginningTime: new Date(item["beginningTime"]),
    endingTime: new Date(item["endingTime"]),
  };
}

/** Represents the indexer's cumulative runtime consumption in the service. */
export interface IndexerRuntime {
  /** Cumulative runtime of the indexer from the beginningTime to endingTime, in seconds. */
  usedSeconds: number;
  /** Cumulative runtime remaining for all indexers in the service from the beginningTime to endingTime, in seconds. */
  remainingSeconds?: number;
  /** Beginning UTC time of the 24-hour period considered for indexer runtime usage (inclusive). */
  beginningTime: Date;
  /** End UTC time of the 24-hour period considered for indexer runtime usage (inclusive). */
  endingTime: Date;
}

export function indexerRuntimeDeserializer(item: any): IndexerRuntime {
  return {
    usedSeconds: item["usedSeconds"],
    remainingSeconds: item["remainingSeconds"],
    beginningTime: new Date(item["beginningTime"]),
    endingTime: new Date(item["endingTime"]),
  };
}

/** Represents the status and synchronization history of a knowledge source. */
export interface KnowledgeSourceStatus {
  /** The current synchronization status. */
  synchronizationStatus?: KnowledgeSourceSynchronizationStatus;
  /** The created resources. */
  createdResources?: CreatedResources;
  /** The current synchronization state. */
  currentSynchronizationState?: SynchronizationState;
  /** The last synchronization state. */
  lastSynchronizationState?: CompletedSynchronizationState;
  /** The statistics for the knowledge source. */
  statistics?: KnowledgeSourceStatistics;
}

export function knowledgeSourceStatusSerializer(item: KnowledgeSourceStatus): any {
  return {
    synchronizationStatus: item["synchronizationStatus"],
    createdResources: !item["createdResources"]
      ? item["createdResources"]
      : createdResourcesSerializer(item["createdResources"]),
    currentSynchronizationState: !item["currentSynchronizationState"]
      ? item["currentSynchronizationState"]
      : synchronizationStateSerializer(item["currentSynchronizationState"]),
    lastSynchronizationState: !item["lastSynchronizationState"]
      ? item["lastSynchronizationState"]
      : completedSynchronizationStateSerializer(item["lastSynchronizationState"]),
    statistics: !item["statistics"]
      ? item["statistics"]
      : knowledgeSourceStatisticsSerializer(item["statistics"]),
  };
}

/** The current synchronization status of the knowledge source. */
export enum KnownKnowledgeSourceSynchronizationStatus {
  /** The knowledge source is being provisioned. */
  Creating = "creating",
  /** The knowledge source is active and synchronization runs are occurring. */
  Active = "active",
  /** The knowledge source is being deleted. */
  Deleting = "deleting",
}

/**
 * The current synchronization status of the knowledge source. \
 * {@link KnownKnowledgeSourceSynchronizationStatus} can be used interchangeably with KnowledgeSourceSynchronizationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **creating**: The knowledge source is being provisioned. \
 * **active**: The knowledge source is active and synchronization runs are occurring. \
 * **deleting**: The knowledge source is being deleted.
 */
export type KnowledgeSourceSynchronizationStatus = string;

/** Represents the current state of an ongoing synchronization that spans multiple indexer runs. */
export interface SynchronizationState {
  /** The start time of the current synchronization. */
  startTime: Date;
  /** The number of item updates successfully processed in the current synchronization. */
  itemsUpdatesProcessed: number;
  /** The number of item updates that failed in the current synchronization. */
  itemsUpdatesFailed: number;
  /** The number of items skipped in the current synchronization. */
  itemsSkipped: number;
}

export function synchronizationStateSerializer(item: SynchronizationState): any {
  return {
    startTime: item["startTime"].toISOString(),
    itemsUpdatesProcessed: item["itemsUpdatesProcessed"],
    itemsUpdatesFailed: item["itemsUpdatesFailed"],
    itemsSkipped: item["itemsSkipped"],
  };
}

/** Represents the completed state of the last synchronization. */
export interface CompletedSynchronizationState {
  /** The start time of the last completed synchronization. */
  startTime: Date;
  /** The end time of the last completed synchronization. */
  endTime: Date;
  /** The number of item updates successfully processed in the last synchronization. */
  itemsUpdatesProcessed: number;
  /** The number of item updates that failed in the last synchronization. */
  itemsUpdatesFailed: number;
  /** The number of items skipped in the last synchronization. */
  itemsSkipped: number;
}

export function completedSynchronizationStateSerializer(item: CompletedSynchronizationState): any {
  return {
    startTime: item["startTime"].toISOString(),
    endTime: item["endTime"].toISOString(),
    itemsUpdatesProcessed: item["itemsUpdatesProcessed"],
    itemsUpdatesFailed: item["itemsUpdatesFailed"],
    itemsSkipped: item["itemsSkipped"],
  };
}

/** Statistical information about knowledge source synchronization history. */
export interface KnowledgeSourceStatistics {
  /** Total number of synchronizations. */
  totalSynchronization: number;
  /** Average synchronization duration. */
  averageSynchronizationDuration: string;
  /** Average items processed per synchronization. */
  averageItemsProcessedPerSynchronization: number;
}

export function knowledgeSourceStatisticsSerializer(item: KnowledgeSourceStatistics): any {
  return {
    totalSynchronization: item["totalSynchronization"],
    averageSynchronizationDuration: item["averageSynchronizationDuration"],
    averageItemsProcessedPerSynchronization: item["averageItemsProcessedPerSynchronization"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-11-01-preview API version. */
  V20251101Preview = "2025-11-01-preview",
}
