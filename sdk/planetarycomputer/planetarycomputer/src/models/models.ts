// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FileContents } from "../static-helpers/multipartHelpers.js";
import { createFilePartDescriptor } from "../static-helpers/multipartHelpers.js";
import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";
import type { ErrorModel } from "@azure-rest/core-client";

/** Microsoft Planetary Computer Pro geo-catalog operation */
export interface Operation {
  /** Operation id */
  id: string;
  /** Operation status */
  status: OperationStatus;
  /** Operation type */
  type: string;
  /** The UTC time at which the operation was created */
  creationTime: Date;
  /** Collection ID */
  collectionId?: string;
  /** The history of the operation status in time */
  statusHistory: OperationStatusHistoryItem[];
  /** The UTC time at which the operation was started */
  startTime?: Date;
  /** The UTC time at which the operation finished its execution */
  finishTime?: Date;
  /** Additional information elements about the particular operation type */
  additionalInformation?: Record<string, string>;
  /** Error information */
  error?: ErrorInfo;
}

export function operationDeserializer(item: any): Operation {
  return {
    id: item["id"],
    status: item["status"],
    type: item["type"],
    creationTime: new Date(item["creationTime"]),
    collectionId: item["collectionId"],
    statusHistory: operationStatusHistoryItemArrayDeserializer(item["statusHistory"]),
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    finishTime: !item["finishTime"] ? item["finishTime"] : new Date(item["finishTime"]),
    additionalInformation: item["additionalInformation"],
    error: !item["error"] ? item["error"] : errorInfoDeserializer(item["error"]),
  };
}

/** Operation status */
export enum KnownOperationStatus {
  /** Operation accepted and ready to be run */
  Pending = "Pending",
  /** Operation is running */
  Running = "Running",
  /** Operation has already finished its execution */
  Succeeded = "Succeeded",
  /** Operation canceled by the user */
  Canceled = "Canceled",
  /** Operation is being canceling */
  Canceling = "Canceling",
  /** Operation failed */
  Failed = "Failed",
}

/**
 * Operation status \
 * {@link KnownOperationStatus} can be used interchangeably with OperationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Operation accepted and ready to be run \
 * **Running**: Operation is running \
 * **Succeeded**: Operation has already finished its execution \
 * **Canceled**: Operation canceled by the user \
 * **Canceling**: Operation is being canceling \
 * **Failed**: Operation failed
 */
export type OperationStatus = string;

export function operationStatusHistoryItemArrayDeserializer(
  result: Array<OperationStatusHistoryItem>,
): any[] {
  return result.map((item) => {
    return operationStatusHistoryItemDeserializer(item);
  });
}

/** Operation status history item */
export interface OperationStatusHistoryItem {
  /** The UTC time at which the status was set */
  timestamp: Date;
  /** The status of the operation */
  status: OperationStatus;
  /** If the status is failed, the error code */
  errorCode?: string;
  /** If the status is failed, the error message */
  errorMessage?: string;
}

export function operationStatusHistoryItemDeserializer(item: any): OperationStatusHistoryItem {
  return {
    timestamp: new Date(item["timestamp"]),
    status: item["status"],
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
  };
}

/** Error information wrapper */
export interface ErrorInfo {
  /** Error details */
  error: ErrorModel;
}

export function errorInfoDeserializer(item: any): ErrorInfo {
  return {
    error: item["error"],
  };
}

/** Generic paged response model */
export interface _PageOperation {
  /** The items on the page */
  value: Operation[];
  /** Link to the next page of results */
  nextLink?: string;
}

export function _pageOperationDeserializer(item: any): _PageOperation {
  return {
    value: operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Microsoft Planetary Computer Pro geo-catalog ingestion run */
export interface IngestionRun {
  /** Run id */
  id: string;
  /** Run id which this run is associated to because it has been retried or rerun */
  parentRunId?: string;
  /** Operation */
  operation: IngestionRunOperation;
  /** Creation time */
  creationTime: Date;
  /** URL of the source catalog */
  sourceCatalogUrl?: string;
  /** Skip any item that already exist in the GeoCatalog */
  skipExistingItems?: boolean;
  /** Keep original source assets */
  keepOriginalAssets?: boolean;
}

export function ingestionRunDeserializer(item: any): IngestionRun {
  return {
    id: item["id"],
    parentRunId: item["parentRunId"],
    operation: ingestionRunOperationDeserializer(item["operation"]),
    creationTime: new Date(item["creationTime"]),
    sourceCatalogUrl: item["sourceCatalogUrl"],
    skipExistingItems: item["skipExistingItems"],
    keepOriginalAssets: item["keepOriginalAssets"],
  };
}

/** Microsoft Planetary Computer Pro geo-catalog ingestion run operation */
export interface IngestionRunOperation {
  /** Operation id */
  id: string;
  /** Operation status */
  status: OperationStatus;
  /** The UTC time at which the operation was created */
  creationTime: Date;
  /** The history of the operation status in time */
  statusHistory: OperationStatusHistoryItem[];
  /** The UTC time at which the operation was started */
  startTime?: Date;
  /** The UTC time at which the operation finished its execution */
  finishTime?: Date;
  /** The number of total items to be processed */
  totalItems: number;
  /** The number of items pending to be processed */
  totalPendingItems: number;
  /** The number of items successfully processed */
  totalSuccessfulItems: number;
  /** The number of items that have failed to be processed */
  totalFailedItems: number;
}

export function ingestionRunOperationDeserializer(item: any): IngestionRunOperation {
  return {
    id: item["id"],
    status: item["status"],
    creationTime: new Date(item["creationTime"]),
    statusHistory: operationStatusHistoryItemArrayDeserializer(item["statusHistory"]),
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    finishTime: !item["finishTime"] ? item["finishTime"] : new Date(item["finishTime"]),
    totalItems: item["totalItems"],
    totalPendingItems: item["totalPendingItems"],
    totalSuccessfulItems: item["totalSuccessfulItems"],
    totalFailedItems: item["totalFailedItems"],
  };
}

/** Generic paged response model */
export interface _PageIngestionRun {
  /** The items on the page */
  value: IngestionRun[];
  /** Link to the next page of results */
  nextLink?: string;
}

export function _pageIngestionRunDeserializer(item: any): _PageIngestionRun {
  return {
    value: ingestionRunArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ingestionRunArrayDeserializer(result: Array<IngestionRun>): any[] {
  return result.map((item) => {
    return ingestionRunDeserializer(item);
  });
}

/** Microsoft Planetary Computer Pro geo-catalog ingestion creation model */
export interface IngestionDefinition {
  /** Ingestion id */
  readonly id: string;
  /** Ingestion type */
  importType: IngestionType;
  /** Ingestion name */
  displayName?: string;
  /** Source catalog URL. Required for StaticCatalog ingestion type */
  sourceCatalogUrl?: string;
  /** Skip processing existing items in the catalog */
  skipExistingItems?: boolean;
  /** Keep original source assets */
  keepOriginalAssets?: boolean;
  /** Ingestion creation time */
  readonly creationTime: Date;
  /** Ingestion status */
  readonly status: IngestionStatus;
}

export function ingestionDefinitionSerializer(item: IngestionDefinition): any {
  return {
    importType: item["importType"],
    displayName: item["displayName"],
    sourceCatalogUrl: item["sourceCatalogUrl"],
    skipExistingItems: item["skipExistingItems"],
    keepOriginalAssets: item["keepOriginalAssets"],
  };
}

export function ingestionDefinitionDeserializer(item: any): IngestionDefinition {
  return {
    id: item["id"],
    importType: item["importType"],
    displayName: item["displayName"],
    sourceCatalogUrl: item["sourceCatalogUrl"],
    skipExistingItems: item["skipExistingItems"],
    keepOriginalAssets: item["keepOriginalAssets"],
    creationTime: new Date(item["creationTime"]),
    status: item["status"],
  };
}

/** Ingestion type */
export enum KnownIngestionType {
  /** Static STAC Catalog */
  StaticCatalog = "StaticCatalog",
}

/**
 * Ingestion type \
 * {@link KnownIngestionType} can be used interchangeably with IngestionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **StaticCatalog**: Static STAC Catalog
 */
export type IngestionType = string;

/** Ingestion status */
export enum KnownIngestionStatus {
  /** Ingestion accepted and ready to be run */
  Ready = "Ready",
  /** Ingestion is being deleting in the background */
  Deleting = "Deleting",
}

/**
 * Ingestion status \
 * {@link KnownIngestionStatus} can be used interchangeably with IngestionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ready**: Ingestion accepted and ready to be run \
 * **Deleting**: Ingestion is being deleting in the background
 */
export type IngestionStatus = string;

/** Generic paged response model */
export interface _PageIngestionDefinition {
  /** The items on the page */
  value: IngestionDefinition[];
  /** Link to the next page of results */
  nextLink?: string;
}

export function _pageIngestionDefinitionDeserializer(item: any): _PageIngestionDefinition {
  return {
    value: ingestionDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ingestionDefinitionArraySerializer(result: Array<IngestionDefinition>): any[] {
  return result.map((item) => {
    return ingestionDefinitionSerializer(item);
  });
}

export function ingestionDefinitionArrayDeserializer(result: Array<IngestionDefinition>): any[] {
  return result.map((item) => {
    return ingestionDefinitionDeserializer(item);
  });
}

/** Ingestion Source */
export interface IngestionSource {
  /** Ingestion source id */
  id: string;
  /** Created time in UTC format */
  readonly created?: Date;
  /** Discriminator for the ingestion source */
  /** The discriminator possible values: SasToken, BlobManagedIdentity */
  kind: IngestionSourceType;
}

export function ingestionSourceSerializer(item: IngestionSource): any {
  return { id: item["id"], kind: item["kind"] };
}

export function ingestionSourceDeserializer(item: any): IngestionSource {
  return {
    id: item["id"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    kind: item["kind"],
  };
}

/** Alias for IngestionSourceUnion */
export type IngestionSourceUnion =
  | SharedAccessSignatureTokenIngestionSource
  | ManagedIdentityIngestionSource
  | IngestionSource;

export function ingestionSourceUnionSerializer(item: IngestionSourceUnion): any {
  switch (item.kind) {
    case "SasToken":
      return sharedAccessSignatureTokenIngestionSourceSerializer(
        item as SharedAccessSignatureTokenIngestionSource,
      );

    case "BlobManagedIdentity":
      return managedIdentityIngestionSourceSerializer(item as ManagedIdentityIngestionSource);

    default:
      return ingestionSourceSerializer(item);
  }
}

export function ingestionSourceUnionDeserializer(item: any): IngestionSourceUnion {
  switch (item.kind) {
    case "SasToken":
      return sharedAccessSignatureTokenIngestionSourceDeserializer(
        item as SharedAccessSignatureTokenIngestionSource,
      );

    case "BlobManagedIdentity":
      return managedIdentityIngestionSourceDeserializer(item as ManagedIdentityIngestionSource);

    default:
      return ingestionSourceDeserializer(item);
  }
}

/** Ingestion source type */
export enum KnownIngestionSourceType {
  /** Azure Blob Storage SAS token */
  SharedAccessSignatureToken = "SasToken",
  /** Azure Blob Managed Identity */
  BlobManagedIdentity = "BlobManagedIdentity",
}

/**
 * Ingestion source type \
 * {@link KnownIngestionSourceType} can be used interchangeably with IngestionSourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SasToken**: Azure Blob Storage SAS token \
 * **BlobManagedIdentity**: Azure Blob Managed Identity
 */
export type IngestionSourceType = string;

/** SAS Token ingestion source */
export interface SharedAccessSignatureTokenIngestionSource extends IngestionSource {
  kind: "SasToken";
  /** SAS token connection information */
  connectionInfo: SharedAccessSignatureTokenConnection;
}

export function sharedAccessSignatureTokenIngestionSourceSerializer(
  item: SharedAccessSignatureTokenIngestionSource,
): any {
  return {
    id: item["id"],
    kind: item["kind"],
    connectionInfo: sharedAccessSignatureTokenConnectionSerializer(item["connectionInfo"]),
  };
}

export function sharedAccessSignatureTokenIngestionSourceDeserializer(
  item: any,
): SharedAccessSignatureTokenIngestionSource {
  return {
    id: item["id"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    kind: item["kind"],
    connectionInfo: sharedAccessSignatureTokenConnectionDeserializer(item["connectionInfo"]),
  };
}

/** SAS Token connection information */
export interface SharedAccessSignatureTokenConnection {
  /** Azure Blob Storage container URL */
  containerUri: string;
  /** SAS token */
  sharedAccessSignatureToken?: string;
  /** Azure Blob Storage SAS token expiration in UTC format */
  readonly expiration?: Date;
}

export function sharedAccessSignatureTokenConnectionSerializer(
  item: SharedAccessSignatureTokenConnection,
): any {
  return {
    containerUrl: item["containerUri"],
    sasToken: item["sharedAccessSignatureToken"],
  };
}

export function sharedAccessSignatureTokenConnectionDeserializer(
  item: any,
): SharedAccessSignatureTokenConnection {
  return {
    containerUri: item["containerUrl"],
    sharedAccessSignatureToken: item["sasToken"],
    expiration: !item["expiration"] ? item["expiration"] : new Date(item["expiration"]),
  };
}

/** Managed Identity ingestion source */
export interface ManagedIdentityIngestionSource extends IngestionSource {
  kind: "BlobManagedIdentity";
  /** Managed identity connection information */
  connectionInfo: ManagedIdentityConnection;
}

export function managedIdentityIngestionSourceSerializer(
  item: ManagedIdentityIngestionSource,
): any {
  return {
    id: item["id"],
    kind: item["kind"],
    connectionInfo: managedIdentityConnectionSerializer(item["connectionInfo"]),
  };
}

export function managedIdentityIngestionSourceDeserializer(
  item: any,
): ManagedIdentityIngestionSource {
  return {
    id: item["id"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    kind: item["kind"],
    connectionInfo: managedIdentityConnectionDeserializer(item["connectionInfo"]),
  };
}

/** Managed Identity connection information */
export interface ManagedIdentityConnection {
  /** Azure Blob Storage container URL */
  containerUri: string;
  /** Azure Managed Identity configured in the Geo-Catalog with access to the container */
  objectId: string;
}

export function managedIdentityConnectionSerializer(item: ManagedIdentityConnection): any {
  return { containerUrl: item["containerUri"], objectId: item["objectId"] };
}

export function managedIdentityConnectionDeserializer(item: any): ManagedIdentityConnection {
  return {
    containerUri: item["containerUrl"],
    objectId: item["objectId"],
  };
}

/** Generic paged response model */
export interface _PageIngestionSourceSummary {
  /** The items on the page */
  value: IngestionSourceSummary[];
  /** Link to the next page of results */
  nextLink?: string;
}

export function _pageIngestionSourceSummaryDeserializer(item: any): _PageIngestionSourceSummary {
  return {
    value: ingestionSourceSummaryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ingestionSourceSummaryArrayDeserializer(
  result: Array<IngestionSourceSummary>,
): any[] {
  return result.map((item) => {
    return ingestionSourceSummaryDeserializer(item);
  });
}

/** Ingestion source summary */
export interface IngestionSourceSummary {
  /** Ingestion source id */
  id: string;
  /** Ingestion source type */
  kind: IngestionSourceType;
  /** Created time in UTC format */
  created?: Date;
}

export function ingestionSourceSummaryDeserializer(item: any): IngestionSourceSummary {
  return {
    id: item["id"],
    kind: item["kind"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
  };
}

/** Generic paged response model */
export interface _PageManagedIdentityMetadata {
  /** The items on the page */
  value: ManagedIdentityMetadata[];
  /** Link to the next page of results */
  nextLink?: string;
}

export function _pageManagedIdentityMetadataDeserializer(item: any): _PageManagedIdentityMetadata {
  return {
    value: managedIdentityMetadataArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedIdentityMetadataArrayDeserializer(
  result: Array<ManagedIdentityMetadata>,
): any[] {
  return result.map((item) => {
    return managedIdentityMetadataDeserializer(item);
  });
}

/** Managed Identity metadata */
export interface ManagedIdentityMetadata {
  /** Object id of the managed identity */
  objectId: string;
  /** ARM path or resource id of the managed identity */
  resourceId: string;
}

export function managedIdentityMetadataDeserializer(item: any): ManagedIdentityMetadata {
  return {
    objectId: item["objectId"],
    resourceId: item["resourceId"],
  };
}

/** FormContent model for file upload. */
export interface StacAssetData {
  /** Asset metadata */
  data: AssetMetadata;
  /** Binary file content to be uploaded. */
  file: FileContents | { contents: FileContents; contentType?: string; filename?: string };
}

export function stacAssetDataSerializer(item: StacAssetData): any {
  return [
    { name: "data", body: assetMetadataSerializer(item["data"]) },
    createFilePartDescriptor("file", item["file"], "application/octet-stream"),
  ];
}

/** Asset metadata model. */
export interface AssetMetadata {
  /** The key of the asset. */
  key: string;
  /** The type of the asset. */
  type: string;
  /** The roles of the asset. */
  roles: string[];
  /** The title of the asset. */
  title: string;
  /** The description of the asset. */
  description: string;
}

export function assetMetadataSerializer(item: AssetMetadata): any {
  return {
    key: item["key"],
    type: item["type"],
    roles: item["roles"].map((p: any) => {
      return p;
    }),
    title: item["title"],
    description: item["description"],
  };
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md
 *
 * Represents a STAC collection.
 */
export interface StacCollection {
  /** MSFT Created */
  createdOn?: string;
  /** MSFT Updated */
  updatedOn?: string;
  /** MSFT Short Description */
  shortDescription?: string;
  /** URLs to STAC extensions implemented by this STAC resource. */
  stacExtensions?: string[];
  /** Unique identifier for the collection. */
  id: string;
  /** Detailed description of the collection. */
  description: string;
  /** Stac Version */
  stacVersion?: string;
  /** Links to related resources and endpoints. */
  links: StacLink[];
  /** Human-readable title for the collection. */
  title?: string;
  /** Type */
  type?: string;
  /** Assets */
  assets?: Record<string, StacAsset>;
  /**
   * Item Assets
   *
   * See the [Item Assets Definition Extension Specification](https://github.com/stac-extensions/item-assets)
   */
  itemAssets?: Record<string, StacItemAsset>;
  /** License identifier for the collection data. */
  license: string;
  /** Spatial and temporal extent of the collection. */
  extent: StacExtensionExtent;
  /** Keywords describing the collection. */
  keywords?: string[];
  /** Organizations or individuals who provide the collection data. */
  providers?: StacProvider[];
  /**
   * Summaries
   *
   * See the [STAC Collection Spec](https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#spatial-extent-object).
   */
  summaries?: Record<string, any>;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function stacCollectionSerializer(item: StacCollection): any {
  return {
    ...serializeRecord(item.additionalProperties),
    "msft:_created": item["createdOn"],
    "msft:_updated": item["updatedOn"],
    "msft:short_description": item["shortDescription"],
    stac_extensions: !item["stacExtensions"]
      ? item["stacExtensions"]
      : item["stacExtensions"].map((p: any) => {
          return p;
        }),
    id: item["id"],
    description: item["description"],
    stac_version: item["stacVersion"],
    links: stacLinkArraySerializer(item["links"]),
    title: item["title"],
    type: item["type"],
    assets: !item["assets"] ? item["assets"] : stacAssetRecordSerializer(item["assets"]),
    item_assets: !item["itemAssets"]
      ? item["itemAssets"]
      : stacItemAssetRecordSerializer(item["itemAssets"]),
    license: item["license"],
    extent: stacExtensionExtentSerializer(item["extent"]),
    keywords: !item["keywords"]
      ? item["keywords"]
      : item["keywords"].map((p: any) => {
          return p;
        }),
    providers: !item["providers"]
      ? item["providers"]
      : stacProviderArraySerializer(item["providers"]),
    summaries: item["summaries"],
  };
}

export function stacCollectionDeserializer(item: any): StacCollection {
  return {
    additionalProperties: serializeRecord(item, [
      "createdOn",
      "updatedOn",
      "shortDescription",
      "stacExtensions",
      "id",
      "description",
      "stacVersion",
      "links",
      "title",
      "type",
      "assets",
      "itemAssets",
      "license",
      "extent",
      "keywords",
      "providers",
      "summaries",
    ]),
    createdOn: item["msft:_created"],
    updatedOn: item["msft:_updated"],
    shortDescription: item["msft:short_description"],
    stacExtensions: !item["stac_extensions"]
      ? item["stac_extensions"]
      : item["stac_extensions"].map((p: any) => {
          return p;
        }),
    id: item["id"],
    description: item["description"],
    stacVersion: item["stac_version"],
    links: stacLinkArrayDeserializer(item["links"]),
    title: item["title"],
    type: item["type"],
    assets: !item["assets"] ? item["assets"] : stacAssetRecordDeserializer(item["assets"]),
    itemAssets: !item["item_assets"]
      ? item["item_assets"]
      : stacItemAssetRecordDeserializer(item["item_assets"]),
    license: item["license"],
    extent: stacExtensionExtentDeserializer(item["extent"]),
    keywords: !item["keywords"]
      ? item["keywords"]
      : item["keywords"].map((p: any) => {
          return p;
        }),
    providers: !item["providers"]
      ? item["providers"]
      : stacProviderArrayDeserializer(item["providers"]),
    summaries: item["summaries"],
  };
}

export function stacLinkArraySerializer(result: Array<StacLink>): any[] {
  return result.map((item) => {
    return stacLinkSerializer(item);
  });
}

export function stacLinkArrayDeserializer(result: Array<StacLink>): any[] {
  return result.map((item) => {
    return stacLinkDeserializer(item);
  });
}

/**
 * Link model.
 *
 * Ref:
 * http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/link.yaml
 *
 * Represents a link.
 */
export interface StacLink {
  /** The relationship type of the link. */
  rel?: string;
  /** The title of the link. */
  title?: string;
  /** The MIME type of the linked resource. */
  type?: StacLinkType;
  /** The URL of the link. */
  href: string;
  /** The language of the linked resource. */
  hreflang?: string;
  /** The length of the linked resource. */
  length?: number;
  /**
   * Specifies the HTTP method that the resource expects.
   * Default: GET.
   */
  method?: string;
  /**
   * Object key-value pairs that map to headers.
   * Example: { "Accept": "application/json" }.
   */
  headers?: Record<string, string>;
  /** For POST requests, the resource can specify the HTTP body as a JSON object. */
  body?: Record<string, any>;
  /**
   * Indicates whether the client is expected to merge the body value into the current request body before following the link.
   * This is only valid when the server is responding to a POST request.
   * Default: false.
   */
  merge?: boolean;
}

export function stacLinkSerializer(item: StacLink): any {
  return {
    rel: item["rel"],
    title: item["title"],
    type: item["type"],
    href: item["href"],
    hreflang: item["hreflang"],
    length: item["length"],
    method: item["method"],
    headers: item["headers"],
    body: item["body"],
    merge: item["merge"],
  };
}

export function stacLinkDeserializer(item: any): StacLink {
  return {
    rel: item["rel"],
    title: item["title"],
    type: item["type"],
    href: item["href"],
    hreflang: item["hreflang"],
    length: item["length"],
    method: item["method"],
    headers: item["headers"],
    body: item["body"],
    merge: item["merge"],
  };
}

/** MIME types for links. */
export enum KnownStacLinkType {
  /** Represents an image/tiff with application=geotiff. */
  ImageTiffApplicationGeotiff = "image/tiff; application=geotiff",
  /** Represents an image/jp2. */
  ImageJp2 = "image/jp2",
  /** Represents an image/png. */
  ImagePng = "image/png",
  /** Represents an image/jpeg. */
  ImageJpeg = "image/jpeg",
  /** Represents an image/jpg. */
  ImageJpg = "image/jpg",
  /** Represents an image/webp. */
  ImageWebp = "image/webp",
  /** Represents an application/x-binary. */
  ApplicationXBinary = "application/x-binary",
  /** Represents an application/xml. */
  ApplicationXml = "application/xml",
  /** Represents an application/json. */
  ApplicationJson = "application/json",
  /** Represents an application/geo+json. */
  ApplicationGeoJson = "application/geo+json",
  /** Represents a text/html. */
  TextHtml = "text/html",
  /** Represents a text/plain. */
  TextPlain = "text/plain",
  /** Represents an application/x-protobuf. */
  ApplicationXProtobuf = "application/x-protobuf",
}

/**
 * MIME types for links. \
 * {@link KnownStacLinkType} can be used interchangeably with StacLinkType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **image\/tiff; application=geotiff**: Represents an image\/tiff with application=geotiff. \
 * **image\/jp2**: Represents an image\/jp2. \
 * **image\/png**: Represents an image\/png. \
 * **image\/jpeg**: Represents an image\/jpeg. \
 * **image\/jpg**: Represents an image\/jpg. \
 * **image\/webp**: Represents an image\/webp. \
 * **application\/x-binary**: Represents an application\/x-binary. \
 * **application\/xml**: Represents an application\/xml. \
 * **application\/json**: Represents an application\/json. \
 * **application\/geo+json**: Represents an application\/geo+json. \
 * **text\/html**: Represents a text\/html. \
 * **text\/plain**: Represents a text\/plain. \
 * **application\/x-protobuf**: Represents an application\/x-protobuf.
 */
export type StacLinkType = string;

export function stacAssetRecordSerializer(item: Record<string, StacAsset>): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : stacAssetSerializer(item[key]);
  });
  return result;
}

export function stacAssetRecordDeserializer(item: Record<string, any>): Record<string, StacAsset> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : stacAssetDeserializer(item[key]);
  });
  return result;
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/item-spec.md#asset-object
 *
 * Represents a STAC asset, which is a file or resource associated with a STAC item.
 */
export interface StacAsset {
  /** Platform that acquired the data. */
  platform?: string;
  /** Instruments that acquired the data. */
  instruments?: string[];
  /** Constellation of satellites that acquired the data. */
  constellation?: string;
  /** Mission associated with the data. */
  mission?: string;
  /** Organizations or individuals who provide the data. */
  providers?: StacProvider[];
  /** Ground sample distance in meters. */
  gsd?: number;
  /** Creation timestamp of the data. */
  created?: Date;
  /** Last update timestamp of the data. */
  updated?: Date;
  /** Human-readable title for the asset. */
  title?: string;
  /** Detailed description of the asset. */
  description?: string;
  /** URL to the asset file. */
  href: string;
  /** Media type of the asset. */
  type?: string;
  /** Roles of the asset within the item. */
  roles?: string[];
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function stacAssetSerializer(item: StacAsset): any {
  return {
    ...serializeRecord(item.additionalProperties),
    platform: item["platform"],
    instruments: !item["instruments"]
      ? item["instruments"]
      : item["instruments"].map((p: any) => {
          return p;
        }),
    constellation: item["constellation"],
    mission: item["mission"],
    providers: !item["providers"]
      ? item["providers"]
      : stacProviderArraySerializer(item["providers"]),
    gsd: item["gsd"],
    created: !item["created"] ? item["created"] : item["created"].toISOString(),
    updated: !item["updated"] ? item["updated"] : item["updated"].toISOString(),
    title: item["title"],
    description: item["description"],
    href: item["href"],
    type: item["type"],
    roles: !item["roles"]
      ? item["roles"]
      : item["roles"].map((p: any) => {
          return p;
        }),
  };
}

export function stacAssetDeserializer(item: any): StacAsset {
  return {
    additionalProperties: serializeRecord(item, [
      "platform",
      "instruments",
      "constellation",
      "mission",
      "providers",
      "gsd",
      "created",
      "updated",
      "title",
      "description",
      "href",
      "type",
      "roles",
    ]),
    platform: item["platform"],
    instruments: !item["instruments"]
      ? item["instruments"]
      : item["instruments"].map((p: any) => {
          return p;
        }),
    constellation: item["constellation"],
    mission: item["mission"],
    providers: !item["providers"]
      ? item["providers"]
      : stacProviderArrayDeserializer(item["providers"]),
    gsd: item["gsd"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"]),
    title: item["title"],
    description: item["description"],
    href: item["href"],
    type: item["type"],
    roles: !item["roles"]
      ? item["roles"]
      : item["roles"].map((p: any) => {
          return p;
        }),
  };
}

export function stacProviderArraySerializer(result: Array<StacProvider>): any[] {
  return result.map((item) => {
    return stacProviderSerializer(item);
  });
}

export function stacProviderArrayDeserializer(result: Array<StacProvider>): any[] {
  return result.map((item) => {
    return stacProviderDeserializer(item);
  });
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#provider-object
 *
 * Represents information about a data provider for STAC collections and items.
 */
export interface StacProvider {
  /** Name of the provider organization or individual. */
  name: string;
  /** Description of the provider. */
  description?: string;
  /** Roles played by the provider (e.g., producer, processor, host). */
  roles?: string[];
  /** URL to the provider's website. */
  url?: string;
}

export function stacProviderSerializer(item: StacProvider): any {
  return {
    name: item["name"],
    description: item["description"],
    roles: !item["roles"]
      ? item["roles"]
      : item["roles"].map((p: any) => {
          return p;
        }),
    url: item["url"],
  };
}

export function stacProviderDeserializer(item: any): StacProvider {
  return {
    name: item["name"],
    description: item["description"],
    roles: !item["roles"]
      ? item["roles"]
      : item["roles"].map((p: any) => {
          return p;
        }),
    url: item["url"],
  };
}

export function stacItemAssetRecordSerializer(
  item: Record<string, StacItemAsset>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : stacItemAssetSerializer(item[key]);
  });
  return result;
}

export function stacItemAssetRecordDeserializer(
  item: Record<string, any>,
): Record<string, StacItemAsset> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : stacItemAssetDeserializer(item[key]);
  });
  return result;
}

/**
 * https://github.com/stac-extensions/item-assets
 *
 * Represents a STAC item asset, which describes the assets available under any item in the collection.
 */
export interface StacItemAsset {
  /** Platform that acquired the data. */
  platform?: string;
  /** Instruments that acquired the data. */
  instruments?: string[];
  /** Constellation of satellites that acquired the data. */
  constellation?: string;
  /** Mission associated with the data. */
  mission?: string;
  /** Organizations or individuals who provide the data. */
  providers?: StacProvider[];
  /** Ground sample distance in meters. */
  gsd?: number;
  /** Creation timestamp of the data. */
  created?: Date;
  /** Last update timestamp of the data. */
  updated?: Date;
  /** Human-readable title for the asset. */
  title: string;
  /** Detailed description of the asset. */
  description?: string;
  /** URL to the asset file. */
  href?: string;
  /** Media type of the asset. */
  type: string;
  /** Roles of the asset within the item. */
  roles?: string[];
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function stacItemAssetSerializer(item: StacItemAsset): any {
  return {
    ...serializeRecord(item.additionalProperties),
    platform: item["platform"],
    instruments: !item["instruments"]
      ? item["instruments"]
      : item["instruments"].map((p: any) => {
          return p;
        }),
    constellation: item["constellation"],
    mission: item["mission"],
    providers: !item["providers"]
      ? item["providers"]
      : stacProviderArraySerializer(item["providers"]),
    gsd: item["gsd"],
    created: !item["created"] ? item["created"] : item["created"].toISOString(),
    updated: !item["updated"] ? item["updated"] : item["updated"].toISOString(),
    title: item["title"],
    description: item["description"],
    href: item["href"],
    type: item["type"],
    roles: !item["roles"]
      ? item["roles"]
      : item["roles"].map((p: any) => {
          return p;
        }),
  };
}

export function stacItemAssetDeserializer(item: any): StacItemAsset {
  return {
    additionalProperties: serializeRecord(item, [
      "platform",
      "instruments",
      "constellation",
      "mission",
      "providers",
      "gsd",
      "created",
      "updated",
      "title",
      "description",
      "href",
      "type",
      "roles",
    ]),
    platform: item["platform"],
    instruments: !item["instruments"]
      ? item["instruments"]
      : item["instruments"].map((p: any) => {
          return p;
        }),
    constellation: item["constellation"],
    mission: item["mission"],
    providers: !item["providers"]
      ? item["providers"]
      : stacProviderArrayDeserializer(item["providers"]),
    gsd: item["gsd"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"]),
    title: item["title"],
    description: item["description"],
    href: item["href"],
    type: item["type"],
    roles: !item["roles"]
      ? item["roles"]
      : item["roles"].map((p: any) => {
          return p;
        }),
  };
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#extent-object
 *
 * Represents the spatial and temporal extent of a STAC collection.
 */
export interface StacExtensionExtent {
  /**
   * Spatial extent defined by bounding boxes.
   *
   * See the [STAC Collection Spec](https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#spatial-extent-object).
   */
  spatial: StacExtensionSpatialExtent;
  /**
   * Temporal extent defined by time intervals.
   *
   * See the [STAC Collection Spec](https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#spatial-extent-object).
   */
  temporal: StacCollectionTemporalExtent;
}

export function stacExtensionExtentSerializer(item: StacExtensionExtent): any {
  return {
    spatial: stacExtensionSpatialExtentSerializer(item["spatial"]),
    temporal: stacCollectionTemporalExtentSerializer(item["temporal"]),
  };
}

export function stacExtensionExtentDeserializer(item: any): StacExtensionExtent {
  return {
    spatial: stacExtensionSpatialExtentDeserializer(item["spatial"]),
    temporal: stacCollectionTemporalExtentDeserializer(item["temporal"]),
  };
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#spatial-extent-object
 *
 * Represents the spatial extent of a STAC collection with bounding boxes.
 */
export interface StacExtensionSpatialExtent {
  /** Array of bounding boxes defining the spatial extent, in format [[west, south, east, north]]. */
  boundingBox?: number[][];
}

export function stacExtensionSpatialExtentSerializer(item: StacExtensionSpatialExtent): any {
  return {
    bbox: !item["boundingBox"]
      ? item["boundingBox"]
      : item["boundingBox"].map((p: any) => {
          return p.map((p: any) => {
            return p;
          });
        }),
  };
}

export function stacExtensionSpatialExtentDeserializer(item: any): StacExtensionSpatialExtent {
  return {
    boundingBox: !item["bbox"]
      ? item["bbox"]
      : item["bbox"].map((p: any) => {
          return p.map((p: any) => {
            return p;
          });
        }),
  };
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#temporal-extent-object
 *
 * Represents the temporal extent of a STAC collection with time intervals.
 */
export interface StacCollectionTemporalExtent {
  /** Array of time intervals in format [[start_datetime, end_datetime]]. */
  interval: (Date | null)[][];
}

export function stacCollectionTemporalExtentSerializer(item: StacCollectionTemporalExtent): any {
  return {
    interval: item["interval"].map((p: any) => {
      return p.map((p: any) => {
        return !p ? p : !p ? p : p.toISOString();
      });
    }),
  };
}

export function stacCollectionTemporalExtentDeserializer(item: any): StacCollectionTemporalExtent {
  return {
    interval: item["interval"].map((p: any) => {
      return p.map((p: any) => {
        return !p ? p : new Date(p);
      });
    }),
  };
}

/** User-specific collection settings for visualization. */
export interface UserCollectionSettings {
  /** Settings for map tile visualization. */
  tileSettings: TileSettings;
  /** Settings for data mosaic visualization. */
  mosaicConfiguration: StacMosaicConfiguration;
}

export function userCollectionSettingsDeserializer(item: any): UserCollectionSettings {
  return {
    tileSettings: tileSettingsDeserializer(item["tileSettings"]),
    mosaicConfiguration: stacMosaicConfigurationDeserializer(item["mosaicInfo"]),
  };
}

/** Configuration for map tile visualization. */
export interface TileSettings {
  /**
   * The minimum zoom level that can be requested for this collection. Provides a
   * hard limit for the tile servers to ensure they don't get requests for low zoom
   * levels, which would cause many files to be fetched and the tile servers to
   * hang.
   */
  minZoom: number;
  /** Maximum number of items to include in a single tile. */
  maxItemsPerTile: number;
  /** Default map location when displaying this collection. */
  defaultLocation?: DefaultLocation;
}

export function tileSettingsSerializer(item: TileSettings): any {
  return {
    minZoom: item["minZoom"],
    maxItemsPerTile: item["maxItemsPerTile"],
    defaultLocation: !item["defaultLocation"]
      ? item["defaultLocation"]
      : defaultLocationSerializer(item["defaultLocation"]),
  };
}

export function tileSettingsDeserializer(item: any): TileSettings {
  return {
    minZoom: item["minZoom"],
    maxItemsPerTile: item["maxItemsPerTile"],
    defaultLocation: !item["defaultLocation"]
      ? item["defaultLocation"]
      : defaultLocationDeserializer(item["defaultLocation"]),
  };
}

/** Defines a default geographic location for map visualization. */
export interface DefaultLocation {
  /** Default zoom level for the map. */
  zoom: number;
  /** Default center coordinates [latitude, longitude] for the map. */
  coordinates: number[];
}

export function defaultLocationSerializer(item: DefaultLocation): any {
  return {
    zoom: item["zoom"],
    coordinates: item["coordinates"].map((p: any) => {
      return p;
    }),
  };
}

export function defaultLocationDeserializer(item: any): DefaultLocation {
  return {
    zoom: item["zoom"],
    coordinates: item["coordinates"].map((p: any) => {
      return p;
    }),
  };
}

/** Configuration for data mosaic visualization. */
export interface StacMosaicConfiguration {
  /** Predefined data mosaics available for this collection. */
  mosaics: StacMosaic[];
  /** Available render options for visualizing the data. */
  renderOptions: RenderOption[];
  /** Default map location when displaying this collection. */
  defaultLocation?: DefaultLocation;
  /** A list of CQL-JSON expressions to use as the default for  this collection. */
  defaultCustomQuery?: Record<string, any>;
}

export function stacMosaicConfigurationDeserializer(item: any): StacMosaicConfiguration {
  return {
    mosaics: stacMosaicArrayDeserializer(item["mosaics"]),
    renderOptions: renderOptionArrayDeserializer(item["renderOptions"]),
    defaultLocation: !item["defaultLocation"]
      ? item["defaultLocation"]
      : defaultLocationDeserializer(item["defaultLocation"]),
    defaultCustomQuery: item["defaultCustomQuery"],
  };
}

export function stacMosaicArraySerializer(result: Array<StacMosaic>): any[] {
  return result.map((item) => {
    return stacMosaicSerializer(item);
  });
}

export function stacMosaicArrayDeserializer(result: Array<StacMosaic>): any[] {
  return result.map((item) => {
    return stacMosaicDeserializer(item);
  });
}

/** Defines a named mosaic with filtering criteria. */
export interface StacMosaic {
  /** Unique identifier for the mosaic. */
  id: string;
  /** Short descriptive name for the mosaic. */
  name: string;
  /** Detailed description of the mosaic. */
  description?: string;
  /** A list of valid CQL2-JSON expressions used to filter the collection to moasic. */
  cql: Record<string, any>[];
}

export function stacMosaicSerializer(item: StacMosaic): any {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    cql: item["cql"].map((p: any) => {
      return p;
    }),
  };
}

export function stacMosaicDeserializer(item: any): StacMosaic {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    cql: item["cql"].map((p: any) => {
      return p;
    }),
  };
}

export function renderOptionArraySerializer(result: Array<RenderOption>): any[] {
  return result.map((item) => {
    return renderOptionSerializer(item);
  });
}

export function renderOptionArrayDeserializer(result: Array<RenderOption>): any[] {
  return result.map((item) => {
    return renderOptionDeserializer(item);
  });
}

/** Defines visualization parameters for rendering data on a map. */
export interface RenderOption {
  /** Unique identifier for the render option. */
  id: string;
  /** Short descriptive name for the render option. */
  name: string;
  /**
   * A longer description of the render option that can be used to explain its
   * content.
   */
  description?: string;
  /** The type of rendering to apply (raster or vector). */
  type?: RenderOptionType;
  /**
   * A URL query-string encoded string of TiTiler rendering options. Valid only for `raster-tile` types.
   *
   * See [Query Parameters](https://developmentseed.org/titiler/endpoints/cog/#description).
   */
  options?: string;
  /**
   * Options for rendering vector tiles. Valid only for `vt-polygon`  and `vt-line`
   * types.
   */
  vectorOptions?: RenderOptionVectorOptions;
  /** Minimum zoom level at which to display this layer. */
  minZoom?: number;
  /** Legend configuration for this render option. */
  legend?: RenderOptionLegend;
  /**
   * A list of property/value conditions that must be in the active mosaic CQL for
   * this render option to be enabled
   */
  conditions?: RenderOptionCondition[];
}

export function renderOptionSerializer(item: RenderOption): any {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    type: item["type"],
    options: item["options"],
    vectorOptions: !item["vectorOptions"]
      ? item["vectorOptions"]
      : renderOptionVectorOptionsSerializer(item["vectorOptions"]),
    minZoom: item["minZoom"],
    legend: !item["legend"] ? item["legend"] : renderOptionLegendSerializer(item["legend"]),
    conditions: !item["conditions"]
      ? item["conditions"]
      : renderOptionConditionArraySerializer(item["conditions"]),
  };
}

export function renderOptionDeserializer(item: any): RenderOption {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    type: item["type"],
    options: item["options"],
    vectorOptions: !item["vectorOptions"]
      ? item["vectorOptions"]
      : renderOptionVectorOptionsDeserializer(item["vectorOptions"]),
    minZoom: item["minZoom"],
    legend: !item["legend"] ? item["legend"] : renderOptionLegendDeserializer(item["legend"]),
    conditions: !item["conditions"]
      ? item["conditions"]
      : renderOptionConditionArrayDeserializer(item["conditions"]),
  };
}

/** Specifies the types of render options for map visualization. */
export enum KnownRenderOptionType {
  /** Raster tile rendering type. */
  RasterTile = "raster-tile",
  /** Vector tile polygon rendering type. */
  VtPolygon = "vt-polygon",
  /** Vector tile line rendering type. */
  VtLine = "vt-line",
}

/**
 * Specifies the types of render options for map visualization. \
 * {@link KnownRenderOptionType} can be used interchangeably with RenderOptionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **raster-tile**: Raster tile rendering type. \
 * **vt-polygon**: Vector tile polygon rendering type. \
 * **vt-line**: Vector tile line rendering type.
 */
export type RenderOptionType = string;

/** Defines parameters for vector tile rendering. */
export interface RenderOptionVectorOptions {
  /** Asset key containing the TileJSON URL. */
  tilejsonKey: string;
  /** Name of the source layer in the vector tiles. */
  sourceLayer: string;
  /** Fill color for polygon features. */
  fillColor?: string;
  /** Stroke color for line features. */
  strokeColor?: string;
  /** Width of line strokes in pixels. */
  strokeWidth?: number;
  /** MapBox GL filter expression to filter features. */
  filter?: string[];
}

export function renderOptionVectorOptionsSerializer(item: RenderOptionVectorOptions): any {
  return {
    tilejsonKey: item["tilejsonKey"],
    sourceLayer: item["sourceLayer"],
    fillColor: item["fillColor"],
    strokeColor: item["strokeColor"],
    strokeWidth: item["strokeWidth"],
    filter: !item["filter"]
      ? item["filter"]
      : item["filter"].map((p: any) => {
          return p;
        }),
  };
}

export function renderOptionVectorOptionsDeserializer(item: any): RenderOptionVectorOptions {
  return {
    tilejsonKey: item["tilejsonKey"],
    sourceLayer: item["sourceLayer"],
    fillColor: item["fillColor"],
    strokeColor: item["strokeColor"],
    strokeWidth: item["strokeWidth"],
    filter: !item["filter"]
      ? item["filter"]
      : item["filter"].map((p: any) => {
          return p;
        }),
  };
}

/** Configuration for generating a data legend. */
export interface RenderOptionLegend {
  /**
   * Legend type to make,
   * one of: `continuous`,
   * `classmap`,
   * `interval` or `none`
   * (note, `none` is a string literal).
   */
  type?: LegendConfigType;
  /** Text labels to display on the legend. */
  labels?: string[];
  /**
   * The number of items to trim from the start of the legend definition. Used if
   * there are values important for rendering (e.g. nodata) that aren't desirable in
   * the legend.
   */
  trimStart?: number;
  /** Number of items to trim from the end of the legend. */
  trimEnd?: number;
  /**
   * A factor to multiply interval legend labels by. Useful for scaled rasters whose
   * colormap definitions map to unscaled values, effectively showing legend labels
   * as scaled values.
   */
  scaleFactor?: number;
}

export function renderOptionLegendSerializer(item: RenderOptionLegend): any {
  return {
    type: item["type"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    trimStart: item["trimStart"],
    trimEnd: item["trimEnd"],
    scaleFactor: item["scaleFactor"],
  };
}

export function renderOptionLegendDeserializer(item: any): RenderOptionLegend {
  return {
    type: item["type"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    trimStart: item["trimStart"],
    trimEnd: item["trimEnd"],
    scaleFactor: item["scaleFactor"],
  };
}

/**
 * Legend type to make, one of: `continuous`, `classmap`, `interval` or `none`
 * (note, `none` is a string literal).
 */
export enum KnownLegendConfigType {
  /** Continuous color ramp legend. */
  Continuous = "continuous",
  /** Classified map with discrete colors for classes. */
  Classmap = "classmap",
  /** Interval-based legend with discrete ranges. */
  Interval = "interval",
  /** No legend. */
  None = "none",
}

/**
 * Legend type to make, one of: `continuous`, `classmap`, `interval` or `none`
 * (note, `none` is a string literal). \
 * {@link KnownLegendConfigType} can be used interchangeably with LegendConfigType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **continuous**: Continuous color ramp legend. \
 * **classmap**: Classified map with discrete colors for classes. \
 * **interval**: Interval-based legend with discrete ranges. \
 * **none**: No legend.
 */
export type LegendConfigType = string;

export function renderOptionConditionArraySerializer(result: Array<RenderOptionCondition>): any[] {
  return result.map((item) => {
    return renderOptionConditionSerializer(item);
  });
}

export function renderOptionConditionArrayDeserializer(
  result: Array<RenderOptionCondition>,
): any[] {
  return result.map((item) => {
    return renderOptionConditionDeserializer(item);
  });
}

/** Defines a condition for enabling a render option. */
export interface RenderOptionCondition {
  /** Property name to check in the active CQL filter. */
  property: string;
  /** Value that the property must equal. */
  value?: string;
}

export function renderOptionConditionSerializer(item: RenderOptionCondition): any {
  return { property: item["property"], value: item["value"] };
}

export function renderOptionConditionDeserializer(item: any): RenderOptionCondition {
  return {
    property: item["property"],
    value: item["value"],
  };
}

/**
 * http://docs.opengeospatial.org/is/17-069r3/17-069r3.html#_feature_collections_rootcollections
 *
 * Represents a collection of STAC collections with links.
 */
export interface StacCatalogCollections {
  /** Links to related resources and endpoints. */
  links: StacLink[];
  /** Array of STAC collections available in the catalog. */
  collections: StacCollection[];
}

export function stacCatalogCollectionsDeserializer(item: any): StacCatalogCollections {
  return {
    links: stacLinkArrayDeserializer(item["links"]),
    collections: stacCollectionArrayDeserializer(item["collections"]),
  };
}

export function stacCollectionArraySerializer(result: Array<StacCollection>): any[] {
  return result.map((item) => {
    return stacCollectionSerializer(item);
  });
}

export function stacCollectionArrayDeserializer(result: Array<StacCollection>): any[] {
  return result.map((item) => {
    return stacCollectionDeserializer(item);
  });
}

/** Defines how data is partitioned for efficient storage and retrieval. */
export interface PartitionType {
  /** Partitioning scheme to use for data organization. */
  scheme?: PartitionTypeScheme;
}

export function partitionTypeSerializer(item: PartitionType): any {
  return { scheme: item["scheme"] };
}

export function partitionTypeDeserializer(item: any): PartitionType {
  return {
    scheme: item["scheme"],
  };
}

/** Defines partitioning schemes for temporal data organization. */
export enum KnownPartitionTypeScheme {
  /** Partition data by year. */
  Year = "year",
  /** Partition data by month. */
  Month = "month",
  /** No partitioning. */
  None = "none",
}

/**
 * Defines partitioning schemes for temporal data organization. \
 * {@link KnownPartitionTypeScheme} can be used interchangeably with PartitionTypeScheme,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **year**: Partition data by year. \
 * **month**: Partition data by month. \
 * **none**: No partitioning.
 */
export type PartitionTypeScheme = string;

/**
 * https://github.com/radiantearth/stac-api-spec/blob/master/api-spec.md#ogc-api---features-endpoints
 *
 * Represents the OGC API conformance declaration.
 */
export interface StacConformanceClasses {
  /** List of OGC API conformance classes implemented by this API. */
  conformsTo: string[];
}

export function stacConformanceClassesDeserializer(item: any): StacConformanceClasses {
  return {
    conformsTo: item["conformsTo"].map((p: any) => {
      return p;
    }),
  };
}

/**
 * https://github.com/radiantearth/stac-api-spec/blob/master/api-spec.md#ogc-api---features-endpoints
 *
 * Represents the STAC API landing page with links to available resources.
 */
export interface StacLandingPage {
  /** MSFT Created */
  createdOn?: string;
  /** MSFT Updated */
  updatedOn?: string;
  /** MSFT Short Description */
  shortDescription?: string;
  /** URLs to STAC extensions implemented by this STAC resource. */
  stacExtensions?: string[];
  /** Unique identifier for the STAC catalog. */
  id: string;
  /** Detailed description of the STAC catalog. */
  description: string;
  /** Human-readable title for the STAC catalog. */
  title?: string;
  /** Stac Version */
  stacVersion?: string;
  /** List of OGC API conformance classes implemented by this API. */
  conformsTo: string[];
  /** Links to related resources and endpoints. */
  links: StacLink[];
  /** Type */
  type?: string;
}

export function stacLandingPageDeserializer(item: any): StacLandingPage {
  return {
    createdOn: item["msft:_created"],
    updatedOn: item["msft:_updated"],
    shortDescription: item["msft:short_description"],
    stacExtensions: !item["stac_extensions"]
      ? item["stac_extensions"]
      : item["stac_extensions"].map((p: any) => {
          return p;
        }),
    id: item["id"],
    description: item["description"],
    title: item["title"],
    stacVersion: item["stac_version"],
    conformsTo: item["conformsTo"].map((p: any) => {
      return p;
    }),
    links: stacLinkArrayDeserializer(item["links"]),
    type: item["type"],
  };
}

/** Base type for STAC items and collections with discriminator. */
export interface StacItemOrStacItemCollection {
  /** Discriminator property for StacItemOrStacItemCollection. */
  /** The discriminator possible values: FeatureCollection, Feature */
  type: StacModelType;
  /** Stac Version */
  stacVersion?: string;
  /** Links to related resources and endpoints. */
  links?: StacLink[];
  /** MSFT Created */
  createdOn?: string;
  /** MSFT Updated */
  updatedOn?: string;
  /** MSFT Short Description */
  shortDescription?: string;
  /** URLs to STAC extensions implemented by this STAC resource. */
  stacExtensions?: string[];
}

export function stacItemOrStacItemCollectionSerializer(item: StacItemOrStacItemCollection): any {
  return {
    type: item["type"],
    stac_version: item["stacVersion"],
    links: !item["links"] ? item["links"] : stacLinkArraySerializer(item["links"]),
    "msft:_created": item["createdOn"],
    "msft:_updated": item["updatedOn"],
    "msft:short_description": item["shortDescription"],
    stac_extensions: !item["stacExtensions"]
      ? item["stacExtensions"]
      : item["stacExtensions"].map((p: any) => {
          return p;
        }),
  };
}

export function stacItemOrStacItemCollectionDeserializer(item: any): StacItemOrStacItemCollection {
  return {
    type: item["type"],
    stacVersion: item["stac_version"],
    links: !item["links"] ? item["links"] : stacLinkArrayDeserializer(item["links"]),
    createdOn: item["msft:_created"],
    updatedOn: item["msft:_updated"],
    shortDescription: item["msft:short_description"],
    stacExtensions: !item["stac_extensions"]
      ? item["stac_extensions"]
      : item["stac_extensions"].map((p: any) => {
          return p;
        }),
  };
}

/** Alias for StacItemOrStacItemCollectionUnion */
export type StacItemOrStacItemCollectionUnion =
  | StacItemCollection
  | StacItem
  | StacItemOrStacItemCollection;

export function stacItemOrStacItemCollectionUnionSerializer(
  item: StacItemOrStacItemCollectionUnion,
): any {
  switch (item.type) {
    case "FeatureCollection":
      return stacItemCollectionSerializer(item as StacItemCollection);

    case "Feature":
      return stacItemSerializer(item as StacItem);

    default:
      return stacItemOrStacItemCollectionSerializer(item);
  }
}

export function stacItemOrStacItemCollectionUnionDeserializer(
  item: any,
): StacItemOrStacItemCollectionUnion {
  switch (item.type) {
    case "FeatureCollection":
      return stacItemCollectionDeserializer(item as StacItemCollection);

    case "Feature":
      return stacItemDeserializer(item as StacItem);

    default:
      return stacItemOrStacItemCollectionDeserializer(item);
  }
}

/** Enum discriminator for STAC item and collection types. */
export enum KnownStacModelType {
  /** GeoJSON Feature type. */
  Feature = "Feature",
  /** GeoJSON FeatureCollection type. */
  FeatureCollection = "FeatureCollection",
}

/**
 * Enum discriminator for STAC item and collection types. \
 * {@link KnownStacModelType} can be used interchangeably with StacModelType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Feature**: GeoJSON Feature type. \
 * **FeatureCollection**: GeoJSON FeatureCollection type.
 */
export type StacModelType = string;

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/itemcollection-spec.md
 *
 * Represents a collection of STAC Items as a GeoJSON FeatureCollection.
 */
export interface StacItemCollection extends StacItemOrStacItemCollection {
  /** GeoJSON FeatureCollection type. */
  type: "FeatureCollection";
  /** Array of STAC Items in the collection. */
  features: StacItem[];
  /** Bounding box of all items in format [west, south, east, north]. */
  boundingBox?: number[];
  /** Context information for the search response. */
  context?: StacContextExtension;
}

export function stacItemCollectionSerializer(item: StacItemCollection): any {
  return {
    type: item["type"],
    stac_version: item["stacVersion"],
    links: !item["links"] ? item["links"] : stacLinkArraySerializer(item["links"]),
    "msft:_created": item["createdOn"],
    "msft:_updated": item["updatedOn"],
    "msft:short_description": item["shortDescription"],
    stac_extensions: !item["stacExtensions"]
      ? item["stacExtensions"]
      : item["stacExtensions"].map((p: any) => {
          return p;
        }),
    features: stacItemArraySerializer(item["features"]),
    bbox: !item["boundingBox"]
      ? item["boundingBox"]
      : item["boundingBox"].map((p: any) => {
          return p;
        }),
    context: !item["context"] ? item["context"] : stacContextExtensionSerializer(item["context"]),
  };
}

export function stacItemCollectionDeserializer(item: any): StacItemCollection {
  return {
    type: item["type"],
    stacVersion: item["stac_version"],
    links: !item["links"] ? item["links"] : stacLinkArrayDeserializer(item["links"]),
    createdOn: item["msft:_created"],
    updatedOn: item["msft:_updated"],
    shortDescription: item["msft:short_description"],
    stacExtensions: !item["stac_extensions"]
      ? item["stac_extensions"]
      : item["stac_extensions"].map((p: any) => {
          return p;
        }),
    features: stacItemArrayDeserializer(item["features"]),
    boundingBox: !item["bbox"]
      ? item["bbox"]
      : item["bbox"].map((p: any) => {
          return p;
        }),
    context: !item["context"] ? item["context"] : stacContextExtensionDeserializer(item["context"]),
  };
}

export function stacItemArraySerializer(result: Array<StacItem>): any[] {
  return result.map((item) => {
    return stacItemSerializer(item);
  });
}

export function stacItemArrayDeserializer(result: Array<StacItem>): any[] {
  return result.map((item) => {
    return stacItemDeserializer(item);
  });
}

/** Represents a STAC Item, which is a GeoJSON Feature with additional metadata. */
export interface StacItem extends StacItemOrStacItemCollection {
  /** Geometry object defining the feature's shape */
  geometry: GeometryUnion;
  /** Unique identifier for the feature */
  id: string;
  /** GeoJSON type identifier for Feature */
  type: "Feature";
  /** ID of the STAC collection this item belongs to. */
  collection?: string;
  /** Bounding box coordinates for the feature */
  boundingBox: number[];
  /** Attributes associated with the feature */
  properties: StacItemProperties;
  /** Assets */
  assets: Record<string, StacAsset>;
  /** MSFT Timestamp */
  timestamp?: string;
  /** MSFT ETag */
  eTag?: string;
}

export function stacItemSerializer(item: StacItem): any {
  return {
    type: item["type"],
    stac_version: item["stacVersion"],
    links: !item["links"] ? item["links"] : stacLinkArraySerializer(item["links"]),
    "msft:_created": item["createdOn"],
    "msft:_updated": item["updatedOn"],
    "msft:short_description": item["shortDescription"],
    stac_extensions: !item["stacExtensions"]
      ? item["stacExtensions"]
      : item["stacExtensions"].map((p: any) => {
          return p;
        }),
    geometry: geometryUnionSerializer(item["geometry"]),
    id: item["id"],
    collection: item["collection"],
    bbox: item["boundingBox"].map((p: any) => {
      return p;
    }),
    properties: stacItemPropertiesSerializer(item["properties"]),
    assets: stacAssetRecordSerializer(item["assets"]),
    "_msft:ts": item["timestamp"],
    "_msft:etag": item["eTag"],
  };
}

export function stacItemDeserializer(item: any): StacItem {
  return {
    type: item["type"],
    stacVersion: item["stac_version"],
    links: !item["links"] ? item["links"] : stacLinkArrayDeserializer(item["links"]),
    createdOn: item["msft:_created"],
    updatedOn: item["msft:_updated"],
    shortDescription: item["msft:short_description"],
    stacExtensions: !item["stac_extensions"]
      ? item["stac_extensions"]
      : item["stac_extensions"].map((p: any) => {
          return p;
        }),
    geometry: geometryUnionDeserializer(item["geometry"]),
    id: item["id"],
    collection: item["collection"],
    boundingBox: item["bbox"].map((p: any) => {
      return p;
    }),
    properties: stacItemPropertiesDeserializer(item["properties"]),
    assets: stacAssetRecordDeserializer(item["assets"]),
    timestamp: item["_msft:ts"],
    eTag: item["_msft:etag"],
  };
}

/**
 * Represents a GeoJSON geometry object as defined by RFC 7946.
 *
 * Supported geometry types include:
 * - **Point**: A single geographic coordinate.
 * - **LineString**: A sequence of geographic coordinates forming a line.
 * - **Polygon**: A closed shape defined by linear rings.
 * - **MultiPoint**: A collection of Points.
 * - **MultiLineString**: A collection of LineStrings.
 * - **MultiPolygon**: A collection of Polygons.
 *
 * Used for spatial filtering in STAC.
 */
export interface Geometry {
  /** Discriminator property for Geometry. */
  /** The discriminator possible values: Point, Polygon, MultiPolygon, MultiLineString, LineString, MultiPoint */
  type: GeometryType;
  /** Optional bounding box of the geometry. */
  boundingBox?: number[];
}

export function geometrySerializer(item: Geometry): any {
  return {
    type: item["type"],
    bbox: !item["boundingBox"]
      ? item["boundingBox"]
      : item["boundingBox"].map((p: any) => {
          return p;
        }),
  };
}

export function geometryDeserializer(item: any): Geometry {
  return {
    type: item["type"],
    boundingBox: !item["bbox"]
      ? item["bbox"]
      : item["bbox"].map((p: any) => {
          return p;
        }),
  };
}

/** Alias for GeometryUnion */
export type GeometryUnion =
  | Point
  | Polygon
  | MultiPolygon
  | MultiLineString
  | LineString
  | MultiPoint
  | Geometry;

export function geometryUnionSerializer(item: GeometryUnion): any {
  switch (item.type) {
    case "Point":
      return pointSerializer(item as Point);

    case "Polygon":
      return polygonSerializer(item as Polygon);

    case "MultiPolygon":
      return multiPolygonSerializer(item as MultiPolygon);

    case "MultiLineString":
      return multiLineStringSerializer(item as MultiLineString);

    case "LineString":
      return lineStringSerializer(item as LineString);

    case "MultiPoint":
      return multiPointSerializer(item as MultiPoint);

    default:
      return geometrySerializer(item);
  }
}

export function geometryUnionDeserializer(item: any): GeometryUnion {
  switch (item.type) {
    case "Point":
      return pointDeserializer(item as Point);

    case "Polygon":
      return polygonDeserializer(item as Polygon);

    case "MultiPolygon":
      return multiPolygonDeserializer(item as MultiPolygon);

    case "MultiLineString":
      return multiLineStringDeserializer(item as MultiLineString);

    case "LineString":
      return lineStringDeserializer(item as LineString);

    case "MultiPoint":
      return multiPointDeserializer(item as MultiPoint);

    default:
      return geometryDeserializer(item);
  }
}

/** Represents the type of a GeoJSON geometry. */
export enum KnownGeometryType {
  /** Represents a Point geometry. */
  Point = "Point",
  /** Represents a LineString geometry. */
  LineString = "LineString",
  /** Represents a Polygon geometry. */
  Polygon = "Polygon",
  /** Represents a MultiPoint geometry. */
  MultiPoint = "MultiPoint",
  /** Represents a MultiLineString geometry. */
  MultiLineString = "MultiLineString",
  /** Represents a MultiPolygon geometry. */
  MultiPolygon = "MultiPolygon",
}

/**
 * Represents the type of a GeoJSON geometry. \
 * {@link KnownGeometryType} can be used interchangeably with GeometryType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Point**: Represents a Point geometry. \
 * **LineString**: Represents a LineString geometry. \
 * **Polygon**: Represents a Polygon geometry. \
 * **MultiPoint**: Represents a MultiPoint geometry. \
 * **MultiLineString**: Represents a MultiLineString geometry. \
 * **MultiPolygon**: Represents a MultiPolygon geometry.
 */
export type GeometryType = string;

/** Represents a GeoJSON Point geometry. */
export interface Point extends Geometry {
  /** The geometry type, always "Point" for Point geometries. */
  type: "Point";
  /** The coordinates of the point as [longitude, latitude]. */
  coordinates: string;
}

export function pointSerializer(item: Point): any {
  return {
    type: item["type"],
    bbox: !item["boundingBox"]
      ? item["boundingBox"]
      : item["boundingBox"].map((p: any) => {
          return p;
        }),
    coordinates: item["coordinates"],
  };
}

export function pointDeserializer(item: any): Point {
  return {
    type: item["type"],
    boundingBox: !item["bbox"]
      ? item["bbox"]
      : item["bbox"].map((p: any) => {
          return p;
        }),
    coordinates: item["coordinates"],
  };
}

/** Represents a Polygon. */
export interface Polygon extends Geometry {
  /** The coordinates of the polygon. */
  coordinates: number[][][];
  /** The type of the polygon. */
  type: "Polygon";
}

export function polygonSerializer(item: Polygon): any {
  return {
    type: item["type"],
    bbox: !item["boundingBox"]
      ? item["boundingBox"]
      : item["boundingBox"].map((p: any) => {
          return p;
        }),
    coordinates: item["coordinates"].map((p: any) => {
      return p.map((p: any) => {
        return p.map((p: any) => {
          return p;
        });
      });
    }),
  };
}

export function polygonDeserializer(item: any): Polygon {
  return {
    type: item["type"],
    boundingBox: !item["bbox"]
      ? item["bbox"]
      : item["bbox"].map((p: any) => {
          return p;
        }),
    coordinates: item["coordinates"].map((p: any) => {
      return p.map((p: any) => {
        return p.map((p: any) => {
          return p;
        });
      });
    }),
  };
}

/** Represents a MultiPolygon. */
export interface MultiPolygon extends Geometry {
  /** The coordinates of the multipolygon. */
  coordinates: number[][][];
  /** The type of the multipolygon. */
  type: "MultiPolygon";
}

export function multiPolygonSerializer(item: MultiPolygon): any {
  return {
    type: item["type"],
    bbox: !item["boundingBox"]
      ? item["boundingBox"]
      : item["boundingBox"].map((p: any) => {
          return p;
        }),
    coordinates: item["coordinates"].map((p: any) => {
      return p.map((p: any) => {
        return p.map((p: any) => {
          return p;
        });
      });
    }),
  };
}

export function multiPolygonDeserializer(item: any): MultiPolygon {
  return {
    type: item["type"],
    boundingBox: !item["bbox"]
      ? item["bbox"]
      : item["bbox"].map((p: any) => {
          return p;
        }),
    coordinates: item["coordinates"].map((p: any) => {
      return p.map((p: any) => {
        return p.map((p: any) => {
          return p;
        });
      });
    }),
  };
}

/** Represents a MultiLineString. */
export interface MultiLineString extends Geometry {
  /** The type of the multilinestring. */
  type: "MultiLineString";
  /** The coordinates of the multilinestring. */
  coordinates: number[][];
}

export function multiLineStringSerializer(item: MultiLineString): any {
  return {
    type: item["type"],
    bbox: !item["boundingBox"]
      ? item["boundingBox"]
      : item["boundingBox"].map((p: any) => {
          return p;
        }),
    coordinates: item["coordinates"].map((p: any) => {
      return p.map((p: any) => {
        return p;
      });
    }),
  };
}

export function multiLineStringDeserializer(item: any): MultiLineString {
  return {
    type: item["type"],
    boundingBox: !item["bbox"]
      ? item["bbox"]
      : item["bbox"].map((p: any) => {
          return p;
        }),
    coordinates: item["coordinates"].map((p: any) => {
      return p.map((p: any) => {
        return p;
      });
    }),
  };
}

/** Represents a LineString. */
export interface LineString extends Geometry {
  /** The type of the linestring. */
  type: "LineString";
  /** The coordinates of the linestring. */
  coordinates: number[];
}

export function lineStringSerializer(item: LineString): any {
  return {
    type: item["type"],
    bbox: !item["boundingBox"]
      ? item["boundingBox"]
      : item["boundingBox"].map((p: any) => {
          return p;
        }),
    coordinates: item["coordinates"].map((p: any) => {
      return p;
    }),
  };
}

export function lineStringDeserializer(item: any): LineString {
  return {
    type: item["type"],
    boundingBox: !item["bbox"]
      ? item["bbox"]
      : item["bbox"].map((p: any) => {
          return p;
        }),
    coordinates: item["coordinates"].map((p: any) => {
      return p;
    }),
  };
}

/** Represents a MultiPoint. */
export interface MultiPoint extends Geometry {
  /** The type of the multipoint. */
  type: "MultiPoint";
  /** The coordinates of the multipoint. */
  coordinates: number[];
}

export function multiPointSerializer(item: MultiPoint): any {
  return {
    type: item["type"],
    bbox: !item["boundingBox"]
      ? item["boundingBox"]
      : item["boundingBox"].map((p: any) => {
          return p;
        }),
    coordinates: item["coordinates"].map((p: any) => {
      return p;
    }),
  };
}

export function multiPointDeserializer(item: any): MultiPoint {
  return {
    type: item["type"],
    boundingBox: !item["bbox"]
      ? item["bbox"]
      : item["bbox"].map((p: any) => {
          return p;
        }),
    coordinates: item["coordinates"].map((p: any) => {
      return p;
    }),
  };
}

/**
 * Properties of a STAC Item containing metadata about the asset.
 *
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/item-spec.md#properties-object
 */
export interface StacItemProperties {
  /** Platform that acquired the data. */
  platform?: string;
  /** Instruments that acquired the data. */
  instruments?: string[];
  /** Constellation of satellites that acquired the data. */
  constellation?: string;
  /** Mission associated with the data. */
  mission?: string;
  /** Organizations or individuals who provide the data. */
  providers?: StacProvider[];
  /** Ground sample distance in meters. */
  gsd?: number;
  /** Creation timestamp of the data. */
  created?: Date;
  /** Last update timestamp of the data. */
  updated?: Date;
  /** Human-readable title for the item. */
  title?: string;
  /** Detailed description of the item. */
  description?: string;
  /** Datetime the asset represents in RFC 3339 format. */
  datetime: string;
  /** Start time of the item observation period. */
  startDatetime?: Date;
  /** End time of the item observation period. */
  endDatetime?: Date;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function stacItemPropertiesSerializer(item: StacItemProperties): any {
  return {
    ...serializeRecord(item.additionalProperties),
    platform: item["platform"],
    instruments: !item["instruments"]
      ? item["instruments"]
      : item["instruments"].map((p: any) => {
          return p;
        }),
    constellation: item["constellation"],
    mission: item["mission"],
    providers: !item["providers"]
      ? item["providers"]
      : stacProviderArraySerializer(item["providers"]),
    gsd: item["gsd"],
    created: !item["created"] ? item["created"] : item["created"].toISOString(),
    updated: !item["updated"] ? item["updated"] : item["updated"].toISOString(),
    title: item["title"],
    description: item["description"],
    datetime: item["datetime"],
    start_datetime: !item["startDatetime"]
      ? item["startDatetime"]
      : item["startDatetime"].toISOString(),
    end_datetime: !item["endDatetime"] ? item["endDatetime"] : item["endDatetime"].toISOString(),
  };
}

export function stacItemPropertiesDeserializer(item: any): StacItemProperties {
  return {
    additionalProperties: serializeRecord(item, [
      "platform",
      "instruments",
      "constellation",
      "mission",
      "providers",
      "gsd",
      "created",
      "updated",
      "title",
      "description",
      "datetime",
      "startDatetime",
      "endDatetime",
    ]),
    platform: item["platform"],
    instruments: !item["instruments"]
      ? item["instruments"]
      : item["instruments"].map((p: any) => {
          return p;
        }),
    constellation: item["constellation"],
    mission: item["mission"],
    providers: !item["providers"]
      ? item["providers"]
      : stacProviderArrayDeserializer(item["providers"]),
    gsd: item["gsd"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"]),
    title: item["title"],
    description: item["description"],
    datetime: item["datetime"],
    startDatetime: !item["start_datetime"]
      ? item["start_datetime"]
      : new Date(item["start_datetime"]),
    endDatetime: !item["end_datetime"] ? item["end_datetime"] : new Date(item["end_datetime"]),
  };
}

/**
 * https://github.com/radiantearth/stac-api-spec/tree/master/extensions/context#context-extension-specification
 *
 * Context information for a search response including pagination details.
 */
export interface StacContextExtension {
  /** Number of items returned in the response. */
  returned: number;
  /** Maximum number of items requested. */
  limit?: number;
  /** Total number of items matching the query. */
  matched?: number;
}

export function stacContextExtensionSerializer(item: StacContextExtension): any {
  return {
    returned: item["returned"],
    limit: item["limit"],
    matched: item["matched"],
  };
}

export function stacContextExtensionDeserializer(item: any): StacContextExtension {
  return {
    returned: item["returned"],
    limit: item["limit"],
    matched: item["matched"],
  };
}

/** Definition of a queryable field for STAC API filtering. */
export interface StacQueryable {
  /** Name of the queryable field. */
  name: string;
  /** Metadata for the queryable field. */
  definition: Record<string, any>;
  /** Whether to create a database index for this field. */
  createIndex?: boolean;
  /** Data type of the queryable field. */
  dataType?: StacQueryableDefinitionDataType;
}

export function stacQueryableSerializer(item: StacQueryable): any {
  return {
    name: item["name"],
    definition: item["definition"],
    create_index: item["createIndex"],
    data_type: item["dataType"],
  };
}

export function stacQueryableDeserializer(item: any): StacQueryable {
  return {
    name: item["name"],
    definition: item["definition"],
    createIndex: item["create_index"],
    dataType: item["data_type"],
  };
}

/**
 * Queryable data types for the queryables extension.
 * These are the data types supported by Basic CQL2.
 */
export enum KnownStacQueryableDefinitionDataType {
  /**
   * Character strings.
   * Example: 'This is a literal string.'
   */
  String = "string",
  /**
   * Numbers including integers and floating point values.
   * Examples: -100, 3.14159
   */
  Number = "number",
  /**
   * Booleans.
   * Examples: true, false
   */
  Boolean = "boolean",
  /**
   * An instant with a granularity of a second or smaller.
   * Example (JSON): { "timestamp": "1969-07-20T20:17:40Z" }
   */
  Timestamp = "timestamp",
  /**
   * An instant with a granularity of a day.
   * Example (JSON): { "date": "1969-07-20" }
   */
  Date = "date",
}

/**
 * Queryable data types for the queryables extension.
 * These are the data types supported by Basic CQL2. \
 * {@link KnownStacQueryableDefinitionDataType} can be used interchangeably with StacQueryableDefinitionDataType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **string**: Character strings.
 * Example: 'This is a literal string.' \
 * **number**: Numbers including integers and floating point values.
 * Examples: -100, 3.14159 \
 * **boolean**: Booleans.
 * Examples: true, false \
 * **timestamp**: An instant with a granularity of a second or smaller.
 * Example (JSON): { "timestamp": "1969-07-20T20:17:40Z" } \
 * **date**: An instant with a granularity of a day.
 * Example (JSON): { "date": "1969-07-20" }
 */
export type StacQueryableDefinitionDataType = string;

/**
 * Search model.
 * *
 * Defines parameters for a STAC search POST request.
 */
export interface StacSearchParameters {
  /** List of collection IDs to search within. */
  collections?: string[];
  /** List of specific item IDs to return. */
  ids?: string[];
  /** Bounding box for spatial filtering in format [west, south, east, north]. */
  boundingBox?: number[];
  /** GeoJSON geometry for spatial filtering. */
  intersects?: GeometryUnion;
  /** Temporal filter in RFC 3339 format, can be a single time or range. */
  datetime?: string;
  /** Maximum number of results to return. */
  limit?: number;
  /**
   * Conf
   *
   * Overrides datetime validation from the base request model.
   */
  conformanceClass?: Record<string, any>;
  /** Whether to sign asset URLs in the response. */
  sign?: StacAssetUrlSigningMode;
  /** URL signature duration in minutes. */
  durationInMinutes?: number;
  /**
   * STAC Query
   *
   * See the [STAC Query Extension](https://github.com/stac-api-extensions/query).
   */
  query?: Record<string, any>;
  /**
   * Sort criteria for the search results.
   *
   * See the [STAC Sort Extension](https://github.com/stac-api-extensions/sort).
   */
  sortBy?: StacSortExtension[];
  /**
   * Specifies which fields to include or exclude in the STAC search results.
   *
   * See the [STAC Fields Extension](https://github.com/stac-api-extensions/fields).
   */
  fields?: SearchOptionsFields[];
  /**
   * CQL2 Filter
   *
   * See the [STAC Filter Extension](https://github.com/stac-api-extensions/filter).
   */
  filter?: Record<string, any>;
  /** Coordinate reference system for the filter. */
  filterCoordinateReferenceSystem?: string;
  /** Filter language to use for the filter expression. */
  filterLang?: FilterLanguage;
  /** Pagination token for fetching the next set of results. */
  token?: string;
}

export function stacSearchParametersSerializer(item: StacSearchParameters): any {
  return {
    collections: !item["collections"]
      ? item["collections"]
      : item["collections"].map((p: any) => {
          return p;
        }),
    ids: !item["ids"]
      ? item["ids"]
      : item["ids"].map((p: any) => {
          return p;
        }),
    bbox: !item["boundingBox"]
      ? item["boundingBox"]
      : item["boundingBox"].map((p: any) => {
          return p;
        }),
    intersects: !item["intersects"]
      ? item["intersects"]
      : geometryUnionSerializer(item["intersects"]),
    datetime: item["datetime"],
    limit: item["limit"],
    conf: item["conformanceClass"],
    sign: item["sign"],
    duration: item["durationInMinutes"],
    query: item["query"],
    sortby: !item["sortBy"] ? item["sortBy"] : stacSortExtensionArraySerializer(item["sortBy"]),
    fields: !item["fields"] ? item["fields"] : searchOptionsFieldsArraySerializer(item["fields"]),
    filter: item["filter"],
    "filter-crs": item["filterCoordinateReferenceSystem"],
    "filter-lang": item["filterLang"],
    token: item["token"],
  };
}

/** Represent the signature type for asset URLs. */
export enum KnownStacAssetUrlSigningMode {
  /** Sign asset URLs in the response. */
  True = "true",
  /** Do not sign asset URLs in the response. */
  False = "false",
}

/**
 * Represent the signature type for asset URLs. \
 * {@link KnownStacAssetUrlSigningMode} can be used interchangeably with StacAssetUrlSigningMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **true**: Sign asset URLs in the response. \
 * **false**: Do not sign asset URLs in the response.
 */
export type StacAssetUrlSigningMode = string;

export function stacSortExtensionArraySerializer(result: Array<StacSortExtension>): any[] {
  return result.map((item) => {
    return stacSortExtensionSerializer(item);
  });
}

/**
 * https://github.com/radiantearth/stac-api-spec/tree/master/extensions/sort#sort-api-extension
 *
 * Represents a sort specification for STAC API queries.
 */
export interface StacSortExtension {
  /** The field name to sort by. */
  field: string;
  /** The sort direction (ascending or descending). */
  direction: StacSearchSortingDirection;
}

export function stacSortExtensionSerializer(item: StacSortExtension): any {
  return { field: item["field"], direction: item["direction"] };
}

/** Defines the sorting directions for query results in STAC API. */
export enum KnownStacSearchSortingDirection {
  /** Sort results in ascending order. */
  Asc = "asc",
  /** Sort results in descending order. */
  Desc = "desc",
}

/**
 * Defines the sorting directions for query results in STAC API. \
 * {@link KnownStacSearchSortingDirection} can be used interchangeably with StacSearchSortingDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **asc**: Sort results in ascending order. \
 * **desc**: Sort results in descending order.
 */
export type StacSearchSortingDirection = string;

export function searchOptionsFieldsArraySerializer(result: Array<SearchOptionsFields>): any[] {
  return result.map((item) => {
    return searchOptionsFieldsSerializer(item);
  });
}

/**
 * FieldsExtension.
 *
 * Attributes:
 * include: set of fields to include.
 * exclude: set of fields to exclude.
 *
 * Controls which fields to include or exclude from the response.
 */
export interface SearchOptionsFields {
  /** Array of field names to include in the response. */
  include?: string[];
  /** Array of field names to exclude from the response. */
  exclude?: string[];
}

export function searchOptionsFieldsSerializer(item: SearchOptionsFields): any {
  return {
    include: !item["include"]
      ? item["include"]
      : item["include"].map((p: any) => {
          return p;
        }),
    exclude: !item["exclude"]
      ? item["exclude"]
      : item["exclude"].map((p: any) => {
          return p;
        }),
  };
}

/**
 * Choices for filter-lang value in a POST request.
 *
 * Based on
 * https://github.com/stac-api-extensions/filter#queryables
 *
 * Note the addition of cql2-json, which is used by the pgstac backend,
 * but is not included in the spec above.
 *
 * Defines the supported filter languages for STAC API queries.
 */
export enum KnownFilterLanguage {
  /** Common Query Language in JSON format. */
  CqlJson = "cql-json",
  /** Common Query Language 2 in JSON format */
  Cql2Json = "cql2-json",
  /** Common Query Language 2 in text format. */
  Cql2Text = "cql2-text",
}

/**
 * Choices for filter-lang value in a POST request.
 *
 * Based on
 * https://github.com/stac-api-extensions/filter#queryables
 *
 * Note the addition of cql2-json, which is used by the pgstac backend,
 * but is not included in the spec above.
 *
 * Defines the supported filter languages for STAC API queries. \
 * {@link KnownFilterLanguage} can be used interchangeably with FilterLanguage,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **cql-json**: Common Query Language in JSON format. \
 * **cql2-json**: Common Query Language 2 in JSON format \
 * **cql2-text**: Common Query Language 2 in text format.
 */
export type FilterLanguage = string;

/**
 * https://github.com/opengeospatial/2D-Tile-Matrix-Set/blob/master/schemas/tms/2.0/json/tileMatrixSet.json
 *
 * A definition of a tile matrix set following the Tile Matrix Set standard.
 * For tileset metadata, such a description (in `tileMatrixSet` property) is only
 * required for offline use,
 * as an alternative to a link with a
 * `http://www.opengis.net/def/rel/ogc/1.0/tiling-scheme` relation type.
 */
export interface TileMatrixSet {
  /** Human-readable title of the tile matrix set */
  title?: string;
  /**
   * Brief narrative description of this tile matrix set, normally available for
   * display to a human
   */
  description?: string;
  /**
   * Unordered list of one or more commonly used or formalized word(s) or phrase(s)
   * used to describe this tile matrix set
   */
  keywords?: string[];
  /** Unique identifier for the tile matrix set */
  id?: string;
  /** URI reference to the official definition */
  uri?: string;
  /** Names of the coordinate axes in order */
  orderedAxes?: string[];
  /** Coordinate reference system identifier */
  crs: string;
  /** URL reference to a standardized scale set */
  wellKnownScaleSet?: string;
  /** Geographic extent of the tile matrix set */
  boundingBox?: TileMatrixSetBoundingBox;
  /** Array of tile matrices at different zoom levels */
  tileMatrices: TileMatrix[];
}

export function tileMatrixSetDeserializer(item: any): TileMatrixSet {
  return {
    title: item["title"],
    description: item["description"],
    keywords: !item["keywords"]
      ? item["keywords"]
      : item["keywords"].map((p: any) => {
          return p;
        }),
    id: item["id"],
    uri: item["uri"],
    orderedAxes: !item["orderedAxes"]
      ? item["orderedAxes"]
      : item["orderedAxes"].map((p: any) => {
          return p;
        }),
    crs: item["crs"],
    wellKnownScaleSet: item["wellKnownScaleSet"],
    boundingBox: !item["boundingBox"]
      ? item["boundingBox"]
      : tileMatrixSetBoundingBoxDeserializer(item["boundingBox"]),
    tileMatrices: tileMatrixArrayDeserializer(item["tileMatrices"]),
  };
}

/** Geographic extent of the tile matrix set expressed in the specified coordinate reference system */
export interface TileMatrixSetBoundingBox {
  /** Lower-left corner coordinates [x, y] of bounding box */
  lowerLeft: string[];
  /** Upper-right corner coordinates [x, y] of bounding box */
  upperRight: string[];
  /** Coordinate reference system identifier */
  crs?: string;
  /** Explicit axis order for the CRS coordinates (e.g., ['x', 'y']) */
  orderedAxes?: string[];
}

export function tileMatrixSetBoundingBoxDeserializer(item: any): TileMatrixSetBoundingBox {
  return {
    lowerLeft: item["lowerLeft"].map((p: any) => {
      return p;
    }),
    upperRight: item["upperRight"].map((p: any) => {
      return p;
    }),
    crs: item["crs"],
    orderedAxes: !item["orderedAxes"]
      ? item["orderedAxes"]
      : item["orderedAxes"].map((p: any) => {
          return p;
        }),
  };
}

export function tileMatrixArrayDeserializer(result: Array<TileMatrix>): any[] {
  return result.map((item) => {
    return tileMatrixDeserializer(item);
  });
}

/**
 * Tile Matrix Definition
 *
 * A tile matrix, usually corresponding to a particular zoom level of a
 * TileMatrixSet.
 *
 * ref:
 * https://github.com/opengeospatial/2D-Tile-Matrix-Set/blob/master/schemas/tms/2.0/json/tileMatrix.json
 *
 * Definition of a tile matrix at a specific zoom level within a tile matrix set
 */
export interface TileMatrix {
  /** Human-readable title of the tile matrix level */
  title?: string;
  /** Human-readable description of this tile matrix level */
  description?: string;
  /**
   * Unordered list of one or more commonly used or formalized word(s) or phrase(s)
   * used to describe this dataset
   */
  keywords?: string[];
  /** Unique identifier for this tile matrix level, often the zoom level */
  id: string;
  /** Scale denominator representing the scale of this tile matrix level */
  scaleDenominator: number;
  /** Size of a pixel in map units at this tile matrix level */
  cellSize: number;
  /**
   * The corner of the tile matrix (_topLeft_ or _bottomLeft_) used as the origin
   * for numbering tile rows and columns. This corner is also a corner of the (0, 0)
   * tile.
   */
  cornerOfOrigin?: TileMatrixCornerOfOrigin;
  /**
   * Precise position in CRS coordinates of the corner of origin (e.g. the top-left
   * corner) for this tile matrix. This position is also a corner of the (0, 0)
   * tile. In previous version, this was 'topLeftCorner' and 'cornerOfOrigin' did
   * not exist.
   */
  pointOfOrigin: number[];
  /** Pixel width of each tile at this level */
  tileWidth: number;
  /** Pixel height of each tile at this level */
  tileHeight: number;
  /** Number of tiles horizontally at this matrix level */
  matrixWidth: number;
  /** Number of tiles vertically at this matrix level */
  matrixHeight: number;
  /**
   * Describes the rows that has variable matrix width
   *
   * ref: https://github.com/opengeospatial/2D-Tile-Matrix-Set/blob/master/schemas/tms/2.0/json/variableMatrixWidth.json
   */
  variableMatrixWidths?: VariableMatrixWidth[];
}

export function tileMatrixDeserializer(item: any): TileMatrix {
  return {
    title: item["title"],
    description: item["description"],
    keywords: !item["keywords"]
      ? item["keywords"]
      : item["keywords"].map((p: any) => {
          return p;
        }),
    id: item["id"],
    scaleDenominator: item["scaleDenominator"],
    cellSize: item["cellSize"],
    cornerOfOrigin: item["cornerOfOrigin"],
    pointOfOrigin: item["pointOfOrigin"].map((p: any) => {
      return p;
    }),
    tileWidth: item["tileWidth"],
    tileHeight: item["tileHeight"],
    matrixWidth: item["matrixWidth"],
    matrixHeight: item["matrixHeight"],
    variableMatrixWidths: !item["variableMatrixWidths"]
      ? item["variableMatrixWidths"]
      : variableMatrixWidthArrayDeserializer(item["variableMatrixWidths"]),
  };
}

/**
 * The corner of the tile matrix (_topLeft_ or _bottomLeft_) used as the origin
 * for numbering tile rows and columns. This corner is also a corner of the (0, 0)
 * tile.
 */
export enum KnownTileMatrixCornerOfOrigin {
  /** Origin at the top-left corner (Y increases downward) */
  TopLeft = "topLeft",
  /** Origin at the bottom-left corner (Y increases upward) */
  BottomLeft = "bottomLeft",
}

/**
 * The corner of the tile matrix (_topLeft_ or _bottomLeft_) used as the origin
 * for numbering tile rows and columns. This corner is also a corner of the (0, 0)
 * tile. \
 * {@link KnownTileMatrixCornerOfOrigin} can be used interchangeably with TileMatrixCornerOfOrigin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **topLeft**: Origin at the top-left corner (Y increases downward) \
 * **bottomLeft**: Origin at the bottom-left corner (Y increases upward)
 */
export type TileMatrixCornerOfOrigin = string;

export function variableMatrixWidthArrayDeserializer(result: Array<VariableMatrixWidth>): any[] {
  return result.map((item) => {
    return variableMatrixWidthDeserializer(item);
  });
}

/** Model for variableMatrixWidth */
export interface VariableMatrixWidth {
  /** Number of tiles in width that coalesce in a single tile for these rows */
  coalesce: number;
  /** First tile row where the coalescence factor applies for this tilematrix */
  minTileRow: number;
  /** Last tile row where the coalescence factor applies for this tilematrix */
  maxTileRow: number;
}

export function variableMatrixWidthDeserializer(item: any): VariableMatrixWidth {
  return {
    coalesce: item["coalesce"],
    minTileRow: item["minTileRow"],
    maxTileRow: item["maxTileRow"],
  };
}

/** Statistical information about a data band. */
export interface BandStatistics {
  /** Minimum value in the band. */
  minimum: number;
  /** Maximum value in the band. */
  maximum: number;
  /** Mean value of the band. */
  mean: number;
  /** Count of pixels in the band. */
  count: number;
  /** Sum of all pixel values in the band. */
  sum: number;
  /** Standard deviation of pixel values in the band. */
  std: number;
  /** Median value of the band. */
  median: number;
  /** Most common value in the band. */
  majority: number;
  /** Least common value in the band. */
  minority: number;
  /** Count of unique values in the band. */
  unique: number;
  /** Histogram of pixel values in the band. */
  histogram: number[][];
  /** Percentage of valid (non-masked) pixels. */
  validPercent: number;
  /** Count of masked pixels in the band. */
  maskedPixels: number;
  /** Count of valid (non-masked) pixels in the band. */
  validPixels: number;
  /**
   * Percentile 2
   * The 2nd percentile value.
   */
  percentile2: number;
  /**
   * Percentile 98
   * The 98th percentile value.
   */
  percentile98: number;
}

export function bandStatisticsDeserializer(item: any): BandStatistics {
  return {
    minimum: item["min"],
    maximum: item["max"],
    mean: item["mean"],
    count: item["count"],
    sum: item["sum"],
    std: item["std"],
    median: item["median"],
    majority: item["majority"],
    minority: item["minority"],
    unique: item["unique"],
    histogram: item["histogram"].map((p: any) => {
      return p.map((p: any) => {
        return p;
      });
    }),
    validPercent: item["valid_percent"],
    maskedPixels: item["masked_pixels"],
    validPixels: item["valid_pixels"],
    percentile2: item["percentile_2"],
    percentile98: item["percentile_98"],
  };
}

/** Geographic extent of a dataset expressed as a bounding box */
export interface StacItemBounds {
  /** Array of coordinates defining the bounding box [west, south, east, north] */
  bounds: number[];
}

export function stacItemBoundsDeserializer(item: any): StacItemBounds {
  return {
    bounds: item["bounds"].map((p: any) => {
      return p;
    }),
  };
}

/** GeoJSON Feature object representing a geographic entity */
export interface Feature {
  /** Geometry object defining the feature's shape */
  geometry: GeometryUnion;
  /** GeoJSON type identifier for Feature */
  type: FeatureType;
  /** Feature properties */
  properties?: Record<string, any>;
}

export function featureSerializer(item: Feature): any {
  return {
    geometry: geometryUnionSerializer(item["geometry"]),
    type: item["type"],
    properties: item["properties"],
  };
}

/** Type identifier for GeoJSON Feature objects */
export enum KnownFeatureType {
  /** Standard GeoJSON Feature type identifier */
  Feature = "Feature",
}

/**
 * Type identifier for GeoJSON Feature objects \
 * {@link KnownFeatureType} can be used interchangeably with FeatureType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Feature**: Standard GeoJSON Feature type identifier
 */
export type FeatureType = string;

/** STAC Item representing a spatiotemporal asset with statistical information */
export interface StacItemStatisticsGeoJson {
  /** Geometry object defining the feature's shape */
  geometry: GeometryUnion;
  /** GeoJSON type identifier for Feature */
  type: FeatureType;
  /** Feature properties */
  properties?: StacItemStatisticsGeoJsonProperties;
}

export function stacItemStatisticsGeoJsonDeserializer(item: any): StacItemStatisticsGeoJson {
  return {
    geometry: geometryUnionDeserializer(item["geometry"]),
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : stacItemStatisticsGeoJsonPropertiesDeserializer(item["properties"]),
  };
}

/** Properties for STAC Item statistics GeoJSON Feature */
export interface StacItemStatisticsGeoJsonProperties {
  /** Statistical information for each band in the asset */
  statistics: Record<string, BandStatistics>;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function stacItemStatisticsGeoJsonPropertiesDeserializer(
  item: any,
): StacItemStatisticsGeoJsonProperties {
  return {
    additionalProperties: serializeRecord(item, ["statistics"]),
    statistics: bandStatisticsRecordDeserializer(item["statistics"]),
  };
}

export function bandStatisticsRecordDeserializer(
  item: Record<string, any>,
): Record<string, BandStatistics> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : bandStatisticsDeserializer(item[key]);
  });
  return result;
}

/** GeoJSON Feature object containing rio-tiler model information */
export interface TilerInfoGeoJsonFeature {
  /** GeoJSON type identifier */
  type: FeatureType;
  /** Geometry object defining the feature's shape */
  geometry: GeometryUnion;
  /** Properties */
  properties: Record<string, TilerInfo>;
  /** Unique identifier for the feature */
  id?: string;
  /** Bounding box coordinates for the feature */
  boundingBox?: number;
}

export function tilerInfoGeoJsonFeatureDeserializer(item: any): TilerInfoGeoJsonFeature {
  return {
    type: item["type"],
    geometry: geometryUnionDeserializer(item["geometry"]),
    properties: tilerInfoRecordDeserializer(item["properties"]),
    id: item["id"],
    boundingBox: item["bbox"],
  };
}

export function tilerInfoRecordDeserializer(item: Record<string, any>): Record<string, TilerInfo> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : tilerInfoDeserializer(item[key]);
  });
  return result;
}

/** Dataset Info. */
export interface TilerInfo {
  /** Bounds */
  bounds: number[];
  /** Band Metadata */
  bandMetadata?: BandMetadataElement[][];
  /** Band Descriptions */
  bandDescriptions?: string[][];
  /** Data type */
  dtype: string;
  /** NoData Type */
  noDataType?: NoDataType;
  /** Color interpretation */
  colorInterpretation?: string[];
  /** Driver */
  driver?: string;
  /** Count */
  count?: number;
  /** Width */
  width?: number;
  /** Height */
  height?: number;
  /** Overviews */
  overviews?: number[];
  /** Scales */
  scales?: number[];
  /** Offsets */
  offsets?: number[];
  /** Colormap */
  colormap?: Record<string, string[]>;
  /** Minzoom */
  minZoom?: number;
  /** Maxzoom */
  maxZoom?: number;
  /** Coordinate Reference System */
  coordinateReferenceSystem?: string;
}

export function tilerInfoDeserializer(item: any): TilerInfo {
  return {
    bounds: item["bounds"].map((p: any) => {
      return p;
    }),
    bandMetadata: !item["band_metadata"]
      ? item["band_metadata"]
      : bandMetadataElementArrayArrayDeserializer(item["band_metadata"]),
    bandDescriptions: !item["band_descriptions"]
      ? item["band_descriptions"]
      : item["band_descriptions"].map((p: any) => {
          return p.map((p: any) => {
            return p;
          });
        }),
    dtype: item["dtype"],
    noDataType: item["nodata_type"],
    colorInterpretation: !item["colorinterp"]
      ? item["colorinterp"]
      : item["colorinterp"].map((p: any) => {
          return p;
        }),
    driver: item["driver"],
    count: item["count"],
    width: item["width"],
    height: item["height"],
    overviews: !item["overviews"]
      ? item["overviews"]
      : item["overviews"].map((p: any) => {
          return p;
        }),
    scales: !item["scales"]
      ? item["scales"]
      : item["scales"].map((p: any) => {
          return p;
        }),
    offsets: !item["offsets"]
      ? item["offsets"]
      : item["offsets"].map((p: any) => {
          return p;
        }),
    colormap: item["colormap"],
    minZoom: item["minzoom"],
    maxZoom: item["maxzoom"],
    coordinateReferenceSystem: item["crs"],
  };
}

export function bandMetadataElementArrayArrayDeserializer(
  result: Array<Array<BandMetadataElement>>,
): any[] {
  return result.map((item) => {
    return bandMetadataElementArrayDeserializer(item);
  });
}

export function bandMetadataElementArrayDeserializer(result: Array<BandMetadataElement>): any[] {
  return result.map((item) => {
    return bandMetadataElementDeserializer(item);
  });
}

/** Union type for band metadata elements */
export type BandMetadataElement = string | Record<string, string>;

export function bandMetadataElementDeserializer(item: any): BandMetadataElement {
  return item;
}

/** NoDataType */
export enum KnownNoDataType {
  /** Nodata represented by alpha channel */
  Alpha = "Alpha",
  /** Nodata represented by a mask */
  Mask = "Mask",
  /** Nodata represented internally in the dataset */
  Internal = "Internal",
  /** Explicit nodata value defined in the dataset */
  Nodata = "Nodata",
  /** No nodata value defined */
  None = "None",
}

/**
 * NoDataType \
 * {@link KnownNoDataType} can be used interchangeably with NoDataType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Alpha**: Nodata represented by alpha channel \
 * **Mask**: Nodata represented by a mask \
 * **Internal**: Nodata represented internally in the dataset \
 * **Nodata**: Explicit nodata value defined in the dataset \
 * **None**: No nodata value defined
 */
export type NoDataType = string;

/** Response model for point query operations providing values at a specific location */
export interface TilerCoreModelsResponsesPoint {
  /** Geographic coordinates [longitude, latitude] of the queried point */
  coordinates: number[];
  /** Array of pixel values at the queried point for each band */
  values: number[];
  /** Names of each band in the raster data */
  bandNames: string[];
}

export function tilerCoreModelsResponsesPointDeserializer(
  item: any,
): TilerCoreModelsResponsesPoint {
  return {
    coordinates: item["coordinates"].map((p: any) => {
      return p;
    }),
    values: item["values"].map((p: any) => {
      return p;
    }),
    bandNames: item["band_names"].map((p: any) => {
      return p;
    }),
  };
}

/** Parameters for requesting a rendered image from a collection */
export interface ImageParameters {
  /** Cql */
  cql: Record<string, any>;
  /** Zoom */
  zoom?: number;
  /** Geometry */
  geometry?: GeometryUnion;
  /** JSON-encoded visualization parameters */
  renderParameters: string;
  /** Width of the output image in pixels */
  columns: number;
  /** Height of the output image in pixels */
  rows: number;
  /** Whether to include branding on the output image */
  showBranding?: boolean;
  /** Image size */
  imageSize?: string;
}

export function imageParametersSerializer(item: ImageParameters): any {
  return {
    cql: item["cql"],
    zoom: item["zoom"],
    geometry: !item["geometry"] ? item["geometry"] : geometryUnionSerializer(item["geometry"]),
    render_params: item["renderParameters"],
    cols: item["columns"],
    rows: item["rows"],
    showBranding: item["showBranding"],
    imageSize: item["imageSize"],
  };
}

/** Response model for image exports */
export interface ImageResponse {
  /** URL of the exported image */
  url: string;
}

export function imageResponseDeserializer(item: any): ImageResponse {
  return {
    url: item["url"],
  };
}

/** Return dataset's statistics. */
export interface TilerStacItemStatistics {
  /** Additional properties */
  additionalProperties?: Record<string, BandStatistics>;
}

export function tilerStacItemStatisticsDeserializer(item: any): TilerStacItemStatistics {
  return {
    additionalProperties: serializeRecord(item, [], bandStatisticsDeserializer),
  };
}

/**
 * TileJSON metadata describing a tile set according to the TileJSON specification
 *
 * Based on https://github.com/mapbox/tilejson-spec/tree/master/2.2.0
 */
export interface TileJsonMetadata {
  /** TileJson */
  tileJson?: string;
  /** Human-readable name of the tile set */
  name?: string;
  /** Human-readable description of the tile set */
  description?: string;
  /** Version */
  version?: string;
  /** Attribution text for the data sources */
  attribution?: string;
  /** URL template for feature info queries */
  template?: string;
  /** URL to legend content for the tile set */
  legend?: string;
  /** Tile addressing scheme (xyz or tms) */
  scheme?: TileAddressingScheme;
  /** Array of tile URL templates */
  tiles: string[];
  /** Array of UTFGrid URL templates */
  grids?: string[];
  /** Array of data file URL templates */
  data?: string[];
  /** Minimum zoom level available in the tile set */
  minZoom?: number;
  /** Maximum zoom level available in the tile set */
  maxZoom?: number;
  /** Bounds */
  bounds?: number[];
  /** Default center point [longitude, latitude, zoom] for the tile set */
  center?: number[];
}

export function tileJsonMetadataDeserializer(item: any): TileJsonMetadata {
  return {
    tileJson: item["tilejson"],
    name: item["name"],
    description: item["description"],
    version: item["version"],
    attribution: item["attribution"],
    template: item["template"],
    legend: item["legend"],
    scheme: item["scheme"],
    tiles: item["tiles"].map((p: any) => {
      return p;
    }),
    grids: !item["grids"]
      ? item["grids"]
      : item["grids"].map((p: any) => {
          return p;
        }),
    data: !item["data"]
      ? item["data"]
      : item["data"].map((p: any) => {
          return p;
        }),
    minZoom: item["minzoom"],
    maxZoom: item["maxzoom"],
    bounds: !item["bounds"]
      ? item["bounds"]
      : item["bounds"].map((p: any) => {
          return p;
        }),
    center: !item["center"]
      ? item["center"]
      : item["center"].map((p: any) => {
          return p;
        }),
  };
}

/** Scheme for tile addressing in TileJSON specification */
export enum KnownTileAddressingScheme {
  /** XYZ tile addressing scheme with origin at top-left */
  Xyz = "xyz",
  /** TMS tile addressing scheme with origin at bottom-left */
  Tms = "tms",
}

/**
 * Scheme for tile addressing in TileJSON specification \
 * {@link KnownTileAddressingScheme} can be used interchangeably with TileAddressingScheme,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **xyz**: XYZ tile addressing scheme with origin at top-left \
 * **tms**: TMS tile addressing scheme with origin at bottom-left
 */
export type TileAddressingScheme = string;

/** Asset information for the specified point */
export interface StacItemPointAsset {
  /** STAC item ID */
  id: string;
  /** Bounding box coordinates for the feature */
  boundingBox: number[];
  /** Asset information for the specified point */
  assets: Record<string, StacAsset>;
  /** Collection ID */
  collectionId: string;
}

export function stacItemPointAssetDeserializer(item: any): StacItemPointAsset {
  return {
    id: item["id"],
    boundingBox: item["bbox"].map((p: any) => {
      return p;
    }),
    assets: stacAssetRecordDeserializer(item["assets"]),
    collectionId: item["collection"],
  };
}

/** Information about a registered STAC search query */
export interface TilerStacSearchRegistration {
  /**
   * Details of the saved search query
   *
   * See the [PgSTAC Search table definition](https://github.com/stac-utils/pgstac/blob/3499daa2bfa700ae7bb07503795c169bf2ebafc7/sql/004_search.sql#L907-L915).
   */
  search: TilerStacSearchDefinition;
  /** Related links for the search query */
  links?: StacLink[];
}

export function tilerStacSearchRegistrationDeserializer(item: any): TilerStacSearchRegistration {
  return {
    search: tilerStacSearchDefinitionDeserializer(item["search"]),
    links: !item["links"] ? item["links"] : stacLinkArrayDeserializer(item["links"]),
  };
}

/**
 * Stored search query
 *
 * See:
 * https://github.com/stac-utils/pgstac/blob/3499daa2bfa700ae7bb07503795c169bf2ebafc7/sql/004_search.sql#L907-L915
 */
export interface TilerStacSearchDefinition {
  /** Unique hash identifier for the search query */
  hash: string;
  /** Search */
  search: Record<string, any>;
  /** SQL WHERE clause representing the search filters */
  where: string;
  /** SQL ORDER BY clause for sorting results */
  orderBy: string;
  /** Timestamp when the search was last accessed */
  lastUsed: Date;
  /** Number of times the search has been accessed */
  useCount: number;
  /** Additional metadata associated with the search */
  metadata: MosaicMetadata;
}

export function tilerStacSearchDefinitionDeserializer(item: any): TilerStacSearchDefinition {
  return {
    hash: item["hash"],
    search: item["search"],
    where: item["_where"],
    orderBy: item["orderby"],
    lastUsed: new Date(item["lastused"]),
    useCount: item["usecount"],
    metadata: mosaicMetadataDeserializer(item["metadata"]),
  };
}

/** Metadata information for mosaic or search results */
export interface MosaicMetadata {
  /** Type of metadata resource */
  type?: MosaicMetadataType;
  /** Geographic bounding box in [west, south, east, north] format */
  bounds?: string;
  /** Minimum zoom level supported */
  minZoom?: number;
  /** Maximum zoom level supported */
  maxZoom?: number;
  /** Human-readable name for the resource */
  name?: string;
  /** List of asset identifiers included in the resource */
  assets?: string[];
  /** Defaults */
  defaults?: Record<string, string>;
}

export function mosaicMetadataSerializer(item: MosaicMetadata): any {
  return {
    type: item["type"],
    bounds: item["bounds"],
    minzoom: item["minZoom"],
    maxzoom: item["maxZoom"],
    name: item["name"],
    assets: !item["assets"]
      ? item["assets"]
      : item["assets"].map((p: any) => {
          return p;
        }),
    defaults: item["defaults"],
  };
}

export function mosaicMetadataDeserializer(item: any): MosaicMetadata {
  return {
    type: item["type"],
    bounds: item["bounds"],
    minZoom: item["minzoom"],
    maxZoom: item["maxzoom"],
    name: item["name"],
    assets: !item["assets"]
      ? item["assets"]
      : item["assets"].map((p: any) => {
          return p;
        }),
    defaults: item["defaults"],
  };
}

/** Type of metadata resource in the system */
export enum KnownMosaicMetadataType {
  /** Metadata for a mosaic of multiple raster assets */
  Mosaic = "mosaic",
  /** Metadata for a search query result */
  Search = "search",
}

/**
 * Type of metadata resource in the system \
 * {@link KnownMosaicMetadataType} can be used interchangeably with MosaicMetadataType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **mosaic**: Metadata for a mosaic of multiple raster assets \
 * **search**: Metadata for a search query result
 */
export type MosaicMetadataType = string;

/** Response from a successful mosaic registration with search ID and related links */
export interface TilerMosaicSearchRegistrationResponse {
  /** Unique identifier for the registered search */
  searchId: string;
  /** Related links for the registered mosaic */
  links?: StacLink[];
}

export function tilerMosaicSearchRegistrationResponseDeserializer(
  item: any,
): TilerMosaicSearchRegistrationResponse {
  return {
    searchId: item["searchid"],
    links: !item["links"] ? item["links"] : stacLinkArrayDeserializer(item["links"]),
  };
}

/**
 * Represents a link that has not been signed with a SAS token.
 * The expiry field will be null for unsigned links.
 */
export interface SharedAccessSignatureSignedLink {
  /** The expiry date of the signed link. This indicates when the link will no longer be valid. */
  expiresOn?: Date;
  /** The URL of the unsigned link. */
  href: string;
}

export function sharedAccessSignatureSignedLinkDeserializer(
  item: any,
): SharedAccessSignatureSignedLink {
  return {
    expiresOn: !item["msft:expiry"] ? item["msft:expiry"] : new Date(item["msft:expiry"]),
    href: item["href"],
  };
}

/** Represents a Shared Access Signature (SAS) token response for accessing Azure Blob Storage. */
export interface SharedAccessSignatureToken {
  /** The expiration date and time of the SAS token in UTC. */
  expiresOn: Date;
  /** The SAS token string used for authentication. */
  token: string;
}

export function sharedAccessSignatureTokenDeserializer(item: any): SharedAccessSignatureToken {
  return {
    expiresOn: new Date(item["msft:expiry"]),
    token: item["token"],
  };
}

/** Interval legends element used to define a color map */
export type IntervalLegendsElement = number[] | Record<string, string>;

export function intervalLegendsElementDeserializer(item: any): IntervalLegendsElement {
  return item;
}

/** Resampling algorithm to use when reading source raster data at different resolutions */
export enum KnownResampling {
  /** Nearest neighbor - fastest method that selects the closest pixel value */
  Nearest = "nearest",
  /** Bilinear interpolation - calculates output values using a weighted average of 2x2 input cells */
  Bilinear = "bilinear",
  /** Cubic interpolation - uses a weighted average of 4x4 input cells for smoother results */
  Cubic = "cubic",
  /** Cubic spline interpolation - similar to cubic but preserves edges better */
  CubicSpline = "cubic_spline",
  /** Lanczos windowed sinc resampling - high-quality with minimal artifacts */
  Lanczos = "lanczos",
  /** Average resampling - calculates the mean of all contributing pixels */
  Average = "average",
  /** Mode resampling - selects the most common value from contributing pixels */
  Mode = "mode",
  /** Gaussian weighted resampling - applies a gaussian weighting to contributing pixels */
  Gauss = "gauss",
  /** Root mean square resampling - useful for resampling error or deviation grids */
  Rms = "rms",
}

/**
 * Resampling algorithm to use when reading source raster data at different resolutions \
 * {@link KnownResampling} can be used interchangeably with Resampling,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **nearest**: Nearest neighbor - fastest method that selects the closest pixel value \
 * **bilinear**: Bilinear interpolation - calculates output values using a weighted average of 2x2 input cells \
 * **cubic**: Cubic interpolation - uses a weighted average of 4x4 input cells for smoother results \
 * **cubic_spline**: Cubic spline interpolation - similar to cubic but preserves edges better \
 * **lanczos**: Lanczos windowed sinc resampling - high-quality with minimal artifacts \
 * **average**: Average resampling - calculates the mean of all contributing pixels \
 * **mode**: Mode resampling - selects the most common value from contributing pixels \
 * **gauss**: Gaussian weighted resampling - applies a gaussian weighting to contributing pixels \
 * **rms**: Root mean square resampling - useful for resampling error or deviation grids
 */
export type Resampling = string;

/** Supported algorithms for terrain and index-based analysis */
export enum KnownTerrainAlgorithm {
  /** Creates hillshade visualization from elevation data */
  Hillshade = "hillshade",
  /** Generates elevation contour lines */
  Contours = "contours",
  /** Calculates normalized difference index between bands */
  NormalizedIndex = "normalizedIndex",
  /** Encodes elevation data in Mapbox Terrarium RGB format */
  Terrarium = "terrarium",
  /** Encodes elevation data in Mapbox TerrainRGB format */
  Terrainrgb = "terrainrgb",
}

/**
 * Supported algorithms for terrain and index-based analysis \
 * {@link KnownTerrainAlgorithm} can be used interchangeably with TerrainAlgorithm,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **hillshade**: Creates hillshade visualization from elevation data \
 * **contours**: Generates elevation contour lines \
 * **normalizedIndex**: Calculates normalized difference index between bands \
 * **terrarium**: Encodes elevation data in Mapbox Terrarium RGB format \
 * **terrainrgb**: Encodes elevation data in Mapbox TerrainRGB format
 */
export type TerrainAlgorithm = string;

/** Available color maps for data visualization */
export enum KnownColorMapNames {
  /** Accent colormap - qualitative colormap with distinct colors */
  Accent = "accent",
  /** Reversed accent colormap */
  AccentR = "accent_r",
  /** Afmhot colormap - sequential black-red-yellow-white colormap */
  Afmhot = "afmhot",
  /** Reversed afmhot colormap */
  AfmhotR = "afmhot_r",
  /** AI for Good land use/land cover colormap */
  Ai4GLulc = "ai4g-lulc",
  /** ALOS forest/non-forest colormap */
  AlosFnf = "alos-fnf",
  /** ALOS PALSAR mask colormap */
  AlosPalsarMask = "alos-palsar-mask",
  /** Autumn colormap - sequential red-orange-yellow colormap */
  Autumn = "autumn",
  /** Reversed autumn colormap */
  AutumnR = "autumn_r",
  /** Binary colormap - simple black and white colormap */
  Binary = "binary",
  /** Reversed binary colormap */
  BinaryR = "binary_r",
  /** Blues colormap - sequential white to dark blue */
  Blues = "blues",
  /** Reversed blues colormap */
  BluesR = "blues_r",
  /** Bone colormap - grayscale with slight blue tint */
  Bone = "bone",
  /** Reversed bone colormap */
  BoneR = "bone_r",
  /** BrBG colormap - diverging brown to blue-green */
  Brbg = "brbg",
  /** Reversed BrBG colormap */
  BrbgR = "brbg_r",
  /** BrG colormap - diverging brown to green */
  Brg = "brg",
  /** Reversed BrG colormap */
  BrgR = "brg_r",
  /** BuGn colormap - sequential white to dark green */
  Bugn = "bugn",
  /** Reversed BuGn colormap */
  BugnR = "bugn_r",
  /** BuPu colormap - sequential white to dark purple */
  Bupu = "bupu",
  /** Reversed BuPu colormap */
  BupuR = "bupu_r",
  /** BWR colormap - diverging blue to red */
  Bwr = "bwr",
  /** Reversed BWR colormap */
  BwrR = "bwr_r",
  /** C-CAP colormap - land cover classification */
  CCap = "c-cap",
  /** Cfastie colormap - high contrast colormap */
  Cfastie = "cfastie",
  /** Chesapeake land cover 13-class colormap */
  ChesapeakeLc13 = "chesapeake-lc-13",
  /** Chesapeake land cover 7-class colormap */
  ChesapeakeLc7 = "chesapeake-lc-7",
  /** Chesapeake land use colormap */
  ChesapeakeLu = "chesapeake-lu",
  /** Chloris biomass colormap */
  ChlorisBiomass = "chloris-biomass",
  /** Cividis colormap - sequential yellow to blue */
  Cividis = "cividis",
  /** Reversed cividis colormap */
  CividisR = "cividis_r",
  /** CMRmap colormap - perceptually uniform colormap */
  Cmrmap = "cmrmap",
  /** Reversed CMRmap colormap */
  CmrmapR = "cmrmap_r",
  /** Cool colormap - sequential cyan to magenta */
  Cool = "cool",
  /** Reversed cool colormap */
  CoolR = "cool_r",
  /** Coolwarm colormap - diverging blue to red */
  Coolwarm = "coolwarm",
  /** Reversed coolwarm colormap */
  CoolwarmR = "coolwarm_r",
  /** Copper colormap - sequential black to copper */
  Copper = "copper",
  /** Reversed copper colormap */
  CopperR = "copper_r",
  /** Cubehelix colormap - sequential black to white with hue rotation */
  Cubehelix = "cubehelix",
  /** Reversed cubehelix colormap */
  CubehelixR = "cubehelix_r",
  /** Dark2 colormap - qualitative colormap with distinct colors */
  Dark2 = "dark2",
  /** Reversed dark2 colormap */
  Dark2R = "dark2_r",
  /** DRCog land use/land cover colormap */
  DrcogLulc = "drcog-lulc",
  /** ESA CCI land cover colormap */
  EsaCciLc = "esa-cci-lc",
  /** ESA WorldCover colormap */
  EsaWorldcover = "esa-worldcover",
  /** Flag colormap - qualitative colormap with distinct colors */
  Flag = "flag",
  /** Reversed flag colormap */
  FlagR = "flag_r",
  /** GAP land use/land cover colormap */
  GapLulc = "gap-lulc",
  /** Gist_earth colormap - perceptually uniform colormap */
  GistEarth = "gist_earth",
  /** Reversed gist_earth colormap */
  GistEarthR = "gist_earth_r",
  /** Gist_gray colormap - grayscale colormap */
  GistGray = "gist_gray",
  /** Reversed gist_gray colormap */
  GistGrayR = "gist_gray_r",
  /** Gist_heat colormap - sequential black-red-yellow-white colormap */
  GistHeat = "gist_heat",
  /** Reversed gist_heat colormap */
  GistHeatR = "gist_heat_r",
  /** Gist_ncar colormap - perceptually uniform colormap */
  GistNcar = "gist_ncar",
  /** Reversed gist_ncar colormap */
  GistNcarR = "gist_ncar_r",
  /** Gist_rainbow colormap - perceptually uniform colormap */
  GistRainbow = "gist_rainbow",
  /** Reversed gist_rainbow colormap */
  GistRainbowR = "gist_rainbow_r",
  /** Gist_stern colormap - perceptually uniform colormap */
  GistStern = "gist_stern",
  /** Reversed gist_stern colormap */
  GistSternR = "gist_stern_r",
  /** Gist_yarg colormap - grayscale colormap */
  GistYarg = "gist_yarg",
  /** Reversed gist_yarg colormap */
  GistYargR = "gist_yarg_r",
  /** GnBu colormap - sequential white to dark blue-green */
  Gnbu = "gnbu",
  /** Reversed GnBu colormap */
  GnbuR = "gnbu_r",
  /** Gnuplot colormap - sequential black to white with hue rotation */
  Gnuplot = "gnuplot",
  /** Gnuplot2 colormap - sequential black to white with hue rotation */
  Gnuplot2 = "gnuplot2",
  /** Reversed gnuplot2 colormap */
  Gnuplot2R = "gnuplot2_r",
  /** Reversed gnuplot colormap */
  GnuplotR = "gnuplot_r",
  /** Gray colormap - grayscale colormap */
  Gray = "gray",
  /** Reversed gray colormap */
  GrayR = "gray_r",
  /** Greens colormap - sequential white to dark green */
  Greens = "greens",
  /** Reversed greens colormap */
  GreensR = "greens_r",
  /** Greys colormap - sequential white to dark gray */
  Greys = "greys",
  /** Reversed greys colormap */
  GreysR = "greys_r",
  /** Hot colormap - sequential black-red-yellow-white colormap */
  Hot = "hot",
  /** Reversed hot colormap */
  HotR = "hot_r",
  /** HSV colormap - hue-saturation-value colormap */
  Hsv = "hsv",
  /** Reversed HSV colormap */
  HsvR = "hsv_r",
  /** Inferno colormap - sequential black to yellow colormap */
  Inferno = "inferno",
  /** Reversed inferno colormap */
  InfernoR = "inferno_r",
  /** IO-BII colormap - biodiversity index colormap */
  IoBii = "io-bii",
  /** IO-LULC colormap - land use/land cover colormap */
  IoLulc = "io-lulc",
  /** IO-LULC 9-class colormap */
  IoLulc9Class = "io-lulc-9-class",
  /** Jet colormap - sequential blue-green-yellow-red colormap */
  Jet = "jet",
  /** Reversed jet colormap */
  JetR = "jet_r",
  /** JRC change colormap */
  JrcChange = "jrc-change",
  /** JRC extent colormap */
  JrcExtent = "jrc-extent",
  /** JRC occurrence colormap */
  JrcOccurrence = "jrc-occurrence",
  /** JRC recurrence colormap */
  JrcRecurrence = "jrc-recurrence",
  /** JRC seasonality colormap */
  JrcSeasonality = "jrc-seasonality",
  /** JRC transitions colormap */
  JrcTransitions = "jrc-transitions",
  /** Lidar classification colormap */
  LidarClassification = "lidar-classification",
  /** Lidar height above ground colormap */
  LidarHag = "lidar-hag",
  /** Alternative lidar height above ground colormap */
  LidarHagAlternative = "lidar-hag-alternative",
  /** Lidar intensity colormap */
  LidarIntensity = "lidar-intensity",
  /** Lidar returns colormap */
  LidarReturns = "lidar-returns",
  /** Magma colormap - sequential black to yellow colormap */
  Magma = "magma",
  /** Reversed magma colormap */
  MagmaR = "magma_r",
  /** MODIS 10A1 colormap */
  Modis10A1 = "modis-10A1",
  /** MODIS 10A2 colormap */
  Modis10A2 = "modis-10A2",
  /** MODIS 13A1|Q1 colormap */
  Modis13A1Q1 = "modis-13A1|Q1",
  /** MODIS 14A1|A2 colormap */
  Modis14A1A2 = "modis-14A1|A2",
  /** MODIS 15A2H|A3H colormap */
  Modis15A2HA3H = "modis-15A2H|A3H",
  /** MODIS 16A3GF-ET colormap */
  Modis16A3GFET = "modis-16A3GF-ET",
  /** MODIS 16A3GF-PET colormap */
  Modis16A3GFPET = "modis-16A3GF-PET",
  /** MODIS 17A2H|A2HGF colormap */
  Modis17A2HA2HGF = "modis-17A2H|A2HGF",
  /** MODIS 17A3HGF colormap */
  Modis17A3HGF = "modis-17A3HGF",
  /** MODIS 64A1 colormap */
  Modis64A1 = "modis-64A1",
  /** MTBS severity colormap */
  MtbsSeverity = "mtbs-severity",
  /** Nipy_spectral colormap - perceptually uniform colormap */
  NipySpectral = "nipy_spectral",
  /** Reversed nipy_spectral colormap */
  NipySpectralR = "nipy_spectral_r",
  /** NRCAN land use/land cover colormap */
  NrcanLulc = "nrcan-lulc",
  /** Ocean colormap - sequential blue to white colormap */
  Ocean = "ocean",
  /** Reversed ocean colormap */
  OceanR = "ocean_r",
  /** Oranges colormap - sequential white to dark orange */
  Oranges = "oranges",
  /** Reversed oranges colormap */
  OrangesR = "oranges_r",
  /** OrRd colormap - sequential white to dark red-orange */
  Orrd = "orrd",
  /** Reversed OrRd colormap */
  OrrdR = "orrd_r",
  /** Paired colormap - qualitative colormap with distinct colors */
  Paired = "paired",
  /** Reversed paired colormap */
  PairedR = "paired_r",
  /** Pastel1 colormap - qualitative colormap with pastel colors */
  Pastel1 = "pastel1",
  /** Reversed pastel1 colormap */
  Pastel1R = "pastel1_r",
  /** Pastel2 colormap - qualitative colormap with pastel colors */
  Pastel2 = "pastel2",
  /** Reversed pastel2 colormap */
  Pastel2R = "pastel2_r",
  /** Pink colormap - sequential white to dark pink */
  Pink = "pink",
  /** Reversed pink colormap */
  PinkR = "pink_r",
  /** PiYG colormap - diverging pink to green */
  Piyg = "piyg",
  /** Reversed PiYG colormap */
  PiygR = "piyg_r",
  /** Plasma colormap - sequential black to yellow colormap */
  Plasma = "plasma",
  /** Reversed plasma colormap */
  PlasmaR = "plasma_r",
  /** PRGn colormap - diverging purple to green */
  Prgn = "prgn",
  /** Reversed PRGn colormap */
  PrgnR = "prgn_r",
  /** Prism colormap - qualitative colormap with distinct colors */
  Prism = "prism",
  /** Reversed prism colormap */
  PrismR = "prism_r",
  /** PuBu colormap - sequential white to dark blue */
  Pubu = "pubu",
  /** Reversed PuBu colormap */
  PubuR = "pubu_r",
  /** PuBuGn colormap - sequential white to dark blue-green */
  Pubugn = "pubugn",
  /** Reversed PuBuGn colormap */
  PubugnR = "pubugn_r",
  /** PuOr colormap - diverging purple to orange */
  Puor = "puor",
  /** Reversed PuOr colormap */
  PuorR = "puor_r",
  /** PuRd colormap - sequential white to dark purple-red */
  Purd = "purd",
  /** Reversed PuRd colormap */
  PurdR = "purd_r",
  /** Purples colormap - sequential white to dark purple */
  Purples = "purples",
  /** Reversed purples colormap */
  PurplesR = "purples_r",
  /** QPE colormap - qualitative colormap with distinct colors */
  Qpe = "qpe",
  /** Rainbow colormap - qualitative colormap with distinct colors */
  Rainbow = "rainbow",
  /** Reversed rainbow colormap */
  RainbowR = "rainbow_r",
  /** RdBu colormap - diverging red to blue */
  Rdbu = "rdbu",
  /** Reversed RdBu colormap */
  RdbuR = "rdbu_r",
  /** RdGy colormap - diverging red to gray */
  Rdgy = "rdgy",
  /** Reversed RdGy colormap */
  RdgyR = "rdgy_r",
  /** RdPu colormap - sequential white to dark red-purple */
  Rdpu = "rdpu",
  /** Reversed RdPu colormap */
  RdpuR = "rdpu_r",
  /** RdYlBu colormap - diverging red to yellow to blue */
  Rdylbu = "rdylbu",
  /** Reversed RdYlBu colormap */
  RdylbuR = "rdylbu_r",
  /** RdYlGn colormap - diverging red to yellow to green */
  Rdylgn = "rdylgn",
  /** Reversed RdYlGn colormap */
  RdylgnR = "rdylgn_r",
  /** Reds colormap - sequential white to dark red */
  Reds = "reds",
  /** Reversed reds colormap */
  RedsR = "reds_r",
  /** Rplumbo colormap - qualitative colormap with distinct colors */
  Rplumbo = "rplumbo",
  /** Schwarzwald colormap - qualitative colormap with distinct colors */
  Schwarzwald = "schwarzwald",
  /** Seismic colormap - diverging blue to red */
  Seismic = "seismic",
  /** Reversed seismic colormap */
  SeismicR = "seismic_r",
  /** Set1 colormap - qualitative colormap with distinct colors */
  Set1 = "set1",
  /** Reversed set1 colormap */
  Set1R = "set1_r",
  /** Set2 colormap - qualitative colormap with distinct colors */
  Set2 = "set2",
  /** Reversed set2 colormap */
  Set2R = "set2_r",
  /** Set3 colormap - qualitative colormap with distinct colors */
  Set3 = "set3",
  /** Reversed set3 colormap */
  Set3R = "set3_r",
  /** Spectral colormap - diverging red to yellow to blue */
  Spectral = "spectral",
  /** Reversed spectral colormap */
  SpectralR = "spectral_r",
  /** Spring colormap - sequential magenta to yellow */
  Spring = "spring",
  /** Reversed spring colormap */
  SpringR = "spring_r",
  /** Summer colormap - sequential green to yellow */
  Summer = "summer",
  /** Reversed summer colormap */
  SummerR = "summer_r",
  /** Tab10 colormap - qualitative colormap with distinct colors */
  Tab10 = "tab10",
  /** Reversed tab10 colormap */
  Tab10R = "tab10_r",
  /** Tab20 colormap - qualitative colormap with distinct colors */
  Tab20 = "tab20",
  /** Reversed tab20 colormap */
  Tab20R = "tab20_r",
  /** Tab20b colormap - qualitative colormap with distinct colors */
  Tab20B = "tab20b",
  /** Reversed tab20b colormap */
  Tab20BR = "tab20b_r",
  /** Tab20c colormap - qualitative colormap with distinct colors */
  Tab20C = "tab20c",
  /** Reversed tab20c colormap */
  Tab20CR = "tab20c_r",
  /** Terrain colormap - sequential black to white with hue rotation */
  Terrain = "terrain",
  /** Reversed terrain colormap */
  TerrainR = "terrain_r",
  /** Twilight colormap - diverging blue to red */
  Twilight = "twilight",
  /** Reversed twilight colormap */
  TwilightR = "twilight_r",
  /** Twilight shifted colormap - diverging blue to red */
  TwilightShifted = "twilight_shifted",
  /** Reversed twilight shifted colormap */
  TwilightShiftedR = "twilight_shifted_r",
  /** USDA CDL colormap - land cover classification */
  UsdaCdl = "usda-cdl",
  /** USDA CDL corn colormap */
  UsdaCdlCorn = "usda-cdl-corn",
  /** USDA CDL cotton colormap */
  UsdaCdlCotton = "usda-cdl-cotton",
  /** USDA CDL soybeans colormap */
  UsdaCdlSoybeans = "usda-cdl-soybeans",
  /** USDA CDL wheat colormap */
  UsdaCdlWheat = "usda-cdl-wheat",
  /** USGS LCMAP colormap */
  UsgsLcmap = "usgs-lcmap",
  /** VIIRS 10A1 colormap */
  Viirs10A1 = "viirs-10a1",
  /** VIIRS 13A1 colormap */
  Viirs13A1 = "viirs-13a1",
  /** VIIRS 14A1 colormap */
  Viirs14A1 = "viirs-14a1",
  /** VIIRS 15A2H colormap */
  Viirs15A2H = "viirs-15a2H",
  /** Viridis colormap - sequential black to yellow colormap */
  Viridis = "viridis",
  /** Reversed viridis colormap */
  ViridisR = "viridis_r",
  /** Winter colormap - sequential blue to green */
  Winter = "winter",
  /** Reversed winter colormap */
  WinterR = "winter_r",
  /** Wistia colormap - sequential white to yellow */
  Wistia = "wistia",
  /** Reversed wistia colormap */
  WistiaR = "wistia_r",
  /** YlGn colormap - sequential white to dark green */
  Ylgn = "ylgn",
  /** Reversed YlGn colormap */
  YlgnR = "ylgn_r",
  /** YlGnBu colormap - sequential white to dark blue-green */
  Ylgnbu = "ylgnbu",
  /** Reversed YlGnBu colormap */
  YlgnbuR = "ylgnbu_r",
  /** YlOrBr colormap - sequential white to dark orange-brown */
  Ylorbr = "ylorbr",
  /** Reversed YlOrBr colormap */
  YlorbrR = "ylorbr_r",
  /** YlOrRd colormap - sequential white to dark red-orange */
  Ylorrd = "ylorrd",
  /** Reversed YlOrRd colormap */
  YlorrdR = "ylorrd_r",
}

/**
 * Available color maps for data visualization \
 * {@link KnownColorMapNames} can be used interchangeably with ColorMapNames,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **accent**: Accent colormap - qualitative colormap with distinct colors \
 * **accent_r**: Reversed accent colormap \
 * **afmhot**: Afmhot colormap - sequential black-red-yellow-white colormap \
 * **afmhot_r**: Reversed afmhot colormap \
 * **ai4g-lulc**: AI for Good land use\/land cover colormap \
 * **alos-fnf**: ALOS forest\/non-forest colormap \
 * **alos-palsar-mask**: ALOS PALSAR mask colormap \
 * **autumn**: Autumn colormap - sequential red-orange-yellow colormap \
 * **autumn_r**: Reversed autumn colormap \
 * **binary**: Binary colormap - simple black and white colormap \
 * **binary_r**: Reversed binary colormap \
 * **blues**: Blues colormap - sequential white to dark blue \
 * **blues_r**: Reversed blues colormap \
 * **bone**: Bone colormap - grayscale with slight blue tint \
 * **bone_r**: Reversed bone colormap \
 * **brbg**: BrBG colormap - diverging brown to blue-green \
 * **brbg_r**: Reversed BrBG colormap \
 * **brg**: BrG colormap - diverging brown to green \
 * **brg_r**: Reversed BrG colormap \
 * **bugn**: BuGn colormap - sequential white to dark green \
 * **bugn_r**: Reversed BuGn colormap \
 * **bupu**: BuPu colormap - sequential white to dark purple \
 * **bupu_r**: Reversed BuPu colormap \
 * **bwr**: BWR colormap - diverging blue to red \
 * **bwr_r**: Reversed BWR colormap \
 * **c-cap**: C-CAP colormap - land cover classification \
 * **cfastie**: Cfastie colormap - high contrast colormap \
 * **chesapeake-lc-13**: Chesapeake land cover 13-class colormap \
 * **chesapeake-lc-7**: Chesapeake land cover 7-class colormap \
 * **chesapeake-lu**: Chesapeake land use colormap \
 * **chloris-biomass**: Chloris biomass colormap \
 * **cividis**: Cividis colormap - sequential yellow to blue \
 * **cividis_r**: Reversed cividis colormap \
 * **cmrmap**: CMRmap colormap - perceptually uniform colormap \
 * **cmrmap_r**: Reversed CMRmap colormap \
 * **cool**: Cool colormap - sequential cyan to magenta \
 * **cool_r**: Reversed cool colormap \
 * **coolwarm**: Coolwarm colormap - diverging blue to red \
 * **coolwarm_r**: Reversed coolwarm colormap \
 * **copper**: Copper colormap - sequential black to copper \
 * **copper_r**: Reversed copper colormap \
 * **cubehelix**: Cubehelix colormap - sequential black to white with hue rotation \
 * **cubehelix_r**: Reversed cubehelix colormap \
 * **dark2**: Dark2 colormap - qualitative colormap with distinct colors \
 * **dark2_r**: Reversed dark2 colormap \
 * **drcog-lulc**: DRCog land use\/land cover colormap \
 * **esa-cci-lc**: ESA CCI land cover colormap \
 * **esa-worldcover**: ESA WorldCover colormap \
 * **flag**: Flag colormap - qualitative colormap with distinct colors \
 * **flag_r**: Reversed flag colormap \
 * **gap-lulc**: GAP land use\/land cover colormap \
 * **gist_earth**: Gist_earth colormap - perceptually uniform colormap \
 * **gist_earth_r**: Reversed gist_earth colormap \
 * **gist_gray**: Gist_gray colormap - grayscale colormap \
 * **gist_gray_r**: Reversed gist_gray colormap \
 * **gist_heat**: Gist_heat colormap - sequential black-red-yellow-white colormap \
 * **gist_heat_r**: Reversed gist_heat colormap \
 * **gist_ncar**: Gist_ncar colormap - perceptually uniform colormap \
 * **gist_ncar_r**: Reversed gist_ncar colormap \
 * **gist_rainbow**: Gist_rainbow colormap - perceptually uniform colormap \
 * **gist_rainbow_r**: Reversed gist_rainbow colormap \
 * **gist_stern**: Gist_stern colormap - perceptually uniform colormap \
 * **gist_stern_r**: Reversed gist_stern colormap \
 * **gist_yarg**: Gist_yarg colormap - grayscale colormap \
 * **gist_yarg_r**: Reversed gist_yarg colormap \
 * **gnbu**: GnBu colormap - sequential white to dark blue-green \
 * **gnbu_r**: Reversed GnBu colormap \
 * **gnuplot**: Gnuplot colormap - sequential black to white with hue rotation \
 * **gnuplot2**: Gnuplot2 colormap - sequential black to white with hue rotation \
 * **gnuplot2_r**: Reversed gnuplot2 colormap \
 * **gnuplot_r**: Reversed gnuplot colormap \
 * **gray**: Gray colormap - grayscale colormap \
 * **gray_r**: Reversed gray colormap \
 * **greens**: Greens colormap - sequential white to dark green \
 * **greens_r**: Reversed greens colormap \
 * **greys**: Greys colormap - sequential white to dark gray \
 * **greys_r**: Reversed greys colormap \
 * **hot**: Hot colormap - sequential black-red-yellow-white colormap \
 * **hot_r**: Reversed hot colormap \
 * **hsv**: HSV colormap - hue-saturation-value colormap \
 * **hsv_r**: Reversed HSV colormap \
 * **inferno**: Inferno colormap - sequential black to yellow colormap \
 * **inferno_r**: Reversed inferno colormap \
 * **io-bii**: IO-BII colormap - biodiversity index colormap \
 * **io-lulc**: IO-LULC colormap - land use\/land cover colormap \
 * **io-lulc-9-class**: IO-LULC 9-class colormap \
 * **jet**: Jet colormap - sequential blue-green-yellow-red colormap \
 * **jet_r**: Reversed jet colormap \
 * **jrc-change**: JRC change colormap \
 * **jrc-extent**: JRC extent colormap \
 * **jrc-occurrence**: JRC occurrence colormap \
 * **jrc-recurrence**: JRC recurrence colormap \
 * **jrc-seasonality**: JRC seasonality colormap \
 * **jrc-transitions**: JRC transitions colormap \
 * **lidar-classification**: Lidar classification colormap \
 * **lidar-hag**: Lidar height above ground colormap \
 * **lidar-hag-alternative**: Alternative lidar height above ground colormap \
 * **lidar-intensity**: Lidar intensity colormap \
 * **lidar-returns**: Lidar returns colormap \
 * **magma**: Magma colormap - sequential black to yellow colormap \
 * **magma_r**: Reversed magma colormap \
 * **modis-10A1**: MODIS 10A1 colormap \
 * **modis-10A2**: MODIS 10A2 colormap \
 * **modis-13A1|Q1**: MODIS 13A1|Q1 colormap \
 * **modis-14A1|A2**: MODIS 14A1|A2 colormap \
 * **modis-15A2H|A3H**: MODIS 15A2H|A3H colormap \
 * **modis-16A3GF-ET**: MODIS 16A3GF-ET colormap \
 * **modis-16A3GF-PET**: MODIS 16A3GF-PET colormap \
 * **modis-17A2H|A2HGF**: MODIS 17A2H|A2HGF colormap \
 * **modis-17A3HGF**: MODIS 17A3HGF colormap \
 * **modis-64A1**: MODIS 64A1 colormap \
 * **mtbs-severity**: MTBS severity colormap \
 * **nipy_spectral**: Nipy_spectral colormap - perceptually uniform colormap \
 * **nipy_spectral_r**: Reversed nipy_spectral colormap \
 * **nrcan-lulc**: NRCAN land use\/land cover colormap \
 * **ocean**: Ocean colormap - sequential blue to white colormap \
 * **ocean_r**: Reversed ocean colormap \
 * **oranges**: Oranges colormap - sequential white to dark orange \
 * **oranges_r**: Reversed oranges colormap \
 * **orrd**: OrRd colormap - sequential white to dark red-orange \
 * **orrd_r**: Reversed OrRd colormap \
 * **paired**: Paired colormap - qualitative colormap with distinct colors \
 * **paired_r**: Reversed paired colormap \
 * **pastel1**: Pastel1 colormap - qualitative colormap with pastel colors \
 * **pastel1_r**: Reversed pastel1 colormap \
 * **pastel2**: Pastel2 colormap - qualitative colormap with pastel colors \
 * **pastel2_r**: Reversed pastel2 colormap \
 * **pink**: Pink colormap - sequential white to dark pink \
 * **pink_r**: Reversed pink colormap \
 * **piyg**: PiYG colormap - diverging pink to green \
 * **piyg_r**: Reversed PiYG colormap \
 * **plasma**: Plasma colormap - sequential black to yellow colormap \
 * **plasma_r**: Reversed plasma colormap \
 * **prgn**: PRGn colormap - diverging purple to green \
 * **prgn_r**: Reversed PRGn colormap \
 * **prism**: Prism colormap - qualitative colormap with distinct colors \
 * **prism_r**: Reversed prism colormap \
 * **pubu**: PuBu colormap - sequential white to dark blue \
 * **pubu_r**: Reversed PuBu colormap \
 * **pubugn**: PuBuGn colormap - sequential white to dark blue-green \
 * **pubugn_r**: Reversed PuBuGn colormap \
 * **puor**: PuOr colormap - diverging purple to orange \
 * **puor_r**: Reversed PuOr colormap \
 * **purd**: PuRd colormap - sequential white to dark purple-red \
 * **purd_r**: Reversed PuRd colormap \
 * **purples**: Purples colormap - sequential white to dark purple \
 * **purples_r**: Reversed purples colormap \
 * **qpe**: QPE colormap - qualitative colormap with distinct colors \
 * **rainbow**: Rainbow colormap - qualitative colormap with distinct colors \
 * **rainbow_r**: Reversed rainbow colormap \
 * **rdbu**: RdBu colormap - diverging red to blue \
 * **rdbu_r**: Reversed RdBu colormap \
 * **rdgy**: RdGy colormap - diverging red to gray \
 * **rdgy_r**: Reversed RdGy colormap \
 * **rdpu**: RdPu colormap - sequential white to dark red-purple \
 * **rdpu_r**: Reversed RdPu colormap \
 * **rdylbu**: RdYlBu colormap - diverging red to yellow to blue \
 * **rdylbu_r**: Reversed RdYlBu colormap \
 * **rdylgn**: RdYlGn colormap - diverging red to yellow to green \
 * **rdylgn_r**: Reversed RdYlGn colormap \
 * **reds**: Reds colormap - sequential white to dark red \
 * **reds_r**: Reversed reds colormap \
 * **rplumbo**: Rplumbo colormap - qualitative colormap with distinct colors \
 * **schwarzwald**: Schwarzwald colormap - qualitative colormap with distinct colors \
 * **seismic**: Seismic colormap - diverging blue to red \
 * **seismic_r**: Reversed seismic colormap \
 * **set1**: Set1 colormap - qualitative colormap with distinct colors \
 * **set1_r**: Reversed set1 colormap \
 * **set2**: Set2 colormap - qualitative colormap with distinct colors \
 * **set2_r**: Reversed set2 colormap \
 * **set3**: Set3 colormap - qualitative colormap with distinct colors \
 * **set3_r**: Reversed set3 colormap \
 * **spectral**: Spectral colormap - diverging red to yellow to blue \
 * **spectral_r**: Reversed spectral colormap \
 * **spring**: Spring colormap - sequential magenta to yellow \
 * **spring_r**: Reversed spring colormap \
 * **summer**: Summer colormap - sequential green to yellow \
 * **summer_r**: Reversed summer colormap \
 * **tab10**: Tab10 colormap - qualitative colormap with distinct colors \
 * **tab10_r**: Reversed tab10 colormap \
 * **tab20**: Tab20 colormap - qualitative colormap with distinct colors \
 * **tab20_r**: Reversed tab20 colormap \
 * **tab20b**: Tab20b colormap - qualitative colormap with distinct colors \
 * **tab20b_r**: Reversed tab20b colormap \
 * **tab20c**: Tab20c colormap - qualitative colormap with distinct colors \
 * **tab20c_r**: Reversed tab20c colormap \
 * **terrain**: Terrain colormap - sequential black to white with hue rotation \
 * **terrain_r**: Reversed terrain colormap \
 * **twilight**: Twilight colormap - diverging blue to red \
 * **twilight_r**: Reversed twilight colormap \
 * **twilight_shifted**: Twilight shifted colormap - diverging blue to red \
 * **twilight_shifted_r**: Reversed twilight shifted colormap \
 * **usda-cdl**: USDA CDL colormap - land cover classification \
 * **usda-cdl-corn**: USDA CDL corn colormap \
 * **usda-cdl-cotton**: USDA CDL cotton colormap \
 * **usda-cdl-soybeans**: USDA CDL soybeans colormap \
 * **usda-cdl-wheat**: USDA CDL wheat colormap \
 * **usgs-lcmap**: USGS LCMAP colormap \
 * **viirs-10a1**: VIIRS 10A1 colormap \
 * **viirs-13a1**: VIIRS 13A1 colormap \
 * **viirs-14a1**: VIIRS 14A1 colormap \
 * **viirs-15a2H**: VIIRS 15A2H colormap \
 * **viridis**: Viridis colormap - sequential black to yellow colormap \
 * **viridis_r**: Reversed viridis colormap \
 * **winter**: Winter colormap - sequential blue to green \
 * **winter_r**: Reversed winter colormap \
 * **wistia**: Wistia colormap - sequential white to yellow \
 * **wistia_r**: Reversed wistia colormap \
 * **ylgn**: YlGn colormap - sequential white to dark green \
 * **ylgn_r**: Reversed YlGn colormap \
 * **ylgnbu**: YlGnBu colormap - sequential white to dark blue-green \
 * **ylgnbu_r**: Reversed YlGnBu colormap \
 * **ylorbr**: YlOrBr colormap - sequential white to dark orange-brown \
 * **ylorbr_r**: Reversed YlOrBr colormap \
 * **ylorrd**: YlOrRd colormap - sequential white to dark red-orange \
 * **ylorrd_r**: Reversed YlOrRd colormap
 */
export type ColorMapNames = string;

/** Image format specifier for tile and image requests */
export enum KnownTilerImageFormat {
  /** Portable Network Graphics format - supports transparency */
  Png = "png",
  /** NumPy array format for raw data access */
  Npy = "npy",
  /** GeoTIFF format for georeferenced raster data */
  Tif = "tif",
  /** JPEG format - smaller file size but lossy compression */
  Jpeg = "jpeg",
  /** Alternate extension for JPEG format */
  Jpg = "jpg",
  /** JPEG 2000 format - supports both lossy and lossless compression */
  Jp2 = "jp2",
  /** WebP format - modern image format with good compression */
  Webp = "webp",
  /** Raw PNG format for access to unprocessed data */
  Pngraw = "pngraw",
}

/**
 * Image format specifier for tile and image requests \
 * {@link KnownTilerImageFormat} can be used interchangeably with TilerImageFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **png**: Portable Network Graphics format - supports transparency \
 * **npy**: NumPy array format for raw data access \
 * **tif**: GeoTIFF format for georeferenced raster data \
 * **jpeg**: JPEG format - smaller file size but lossy compression \
 * **jpg**: Alternate extension for JPEG format \
 * **jp2**: JPEG 2000 format - supports both lossy and lossless compression \
 * **webp**: WebP format - modern image format with good compression \
 * **pngraw**: Raw PNG format for access to unprocessed data
 */
export type TilerImageFormat = string;

/**
 * Identifier selecting one of the TileMatrixSetId supported (default:
 * 'WebMercatorQuad')
 *
 * Represents the method used to select or compute pixels when creating
 * composites from multiple sources
 */
export enum KnownPixelSelection {
  /** Select pixel from the first available image */
  First = "first",
  /** Select pixel with the highest value */
  Highest = "highest",
  /** Select pixel with the lowest value */
  Lowest = "lowest",
  /** Calculate mean of available pixels */
  Mean = "mean",
  /** Calculate median of available pixels */
  Median = "median",
  /** Calculate standard deviation of available pixels */
  StandardDeviation = "stdev",
  /** Select image with lowest value in the last band */
  LastBandLow = "lastbandlow",
  /** Select image with highest value in the last band */
  LastBandHigh = "lastbandhigh",
}

/**
 * Identifier selecting one of the TileMatrixSetId supported (default:
 * 'WebMercatorQuad')
 *
 * Represents the method used to select or compute pixels when creating
 * composites from multiple sources \
 * {@link KnownPixelSelection} can be used interchangeably with PixelSelection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **first**: Select pixel from the first available image \
 * **highest**: Select pixel with the highest value \
 * **lowest**: Select pixel with the lowest value \
 * **mean**: Calculate mean of available pixels \
 * **median**: Calculate median of available pixels \
 * **stdev**: Calculate standard deviation of available pixels \
 * **lastbandlow**: Select image with lowest value in the last band \
 * **lastbandhigh**: Select image with highest value in the last band
 */
export type PixelSelection = string;

/** Represents version information. */
export enum KnownVersions {
  /** Represents the 2025-04-30-preview version. */
  V20250430Preview = "2025-04-30-preview",
}

export function bandStatisticsRecordRecordDeserializer(
  item: Record<string, any>,
): Record<string, Record<string, BandStatistics>> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : bandStatisticsRecordDeserializer(item[key]);
  });
  return result;
}

export function intervalLegendsElementArrayArrayDeserializer(
  result: Array<Array<IntervalLegendsElement>>,
): any[] {
  return result.map((item) => {
    return intervalLegendsElementArrayDeserializer(item);
  });
}

export function intervalLegendsElementArrayDeserializer(
  result: Array<IntervalLegendsElement>,
): any[] {
  return result.map((item) => {
    return intervalLegendsElementDeserializer(item);
  });
}

export function stacItemPointAssetArrayDeserializer(result: Array<StacItemPointAsset>): any[] {
  return result.map((item) => {
    return stacItemPointAssetDeserializer(item);
  });
}

export function stacQueryableArraySerializer(result: Array<StacQueryable>): any[] {
  return result.map((item) => {
    return stacQueryableSerializer(item);
  });
}

export function stacQueryableArrayDeserializer(result: Array<StacQueryable>): any[] {
  return result.map((item) => {
    return stacQueryableDeserializer(item);
  });
}
