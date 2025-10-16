// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  FileContents,
  createFilePartDescriptor,
} from "../static-helpers/multipartHelpers.js";
import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";
import { ErrorModel } from "@azure-rest/core-client";

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
  error?: ErrorModel;
}

export function operationDeserializer(item: any): Operation {
  return {
    id: item["id"],
    status: item["status"],
    type: item["type"],
    creationTime: new Date(item["creationTime"]),
    collectionId: item["collectionId"],
    statusHistory: operationStatusHistoryItemArrayDeserializer(
      item["statusHistory"],
    ),
    startTime: !item["startTime"]
      ? item["startTime"]
      : new Date(item["startTime"]),
    finishTime: !item["finishTime"]
      ? item["finishTime"]
      : new Date(item["finishTime"]),
    additionalInformation: item["additionalInformation"],
    error: !item["error"] ? item["error"] : item["error"],
  };
}

/** Operation status */
export type OperationStatus =
  | "Pending"
  | "Running"
  | "Succeeded"
  | "Canceled"
  | "Canceling"
  | "Failed";

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

export function operationStatusHistoryItemDeserializer(
  item: any,
): OperationStatusHistoryItem {
  return {
    timestamp: new Date(item["timestamp"]),
    status: item["status"],
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
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

export function ingestionRunOperationDeserializer(
  item: any,
): IngestionRunOperation {
  return {
    id: item["id"],
    status: item["status"],
    creationTime: new Date(item["creationTime"]),
    statusHistory: operationStatusHistoryItemArrayDeserializer(
      item["statusHistory"],
    ),
    startTime: !item["startTime"]
      ? item["startTime"]
      : new Date(item["startTime"]),
    finishTime: !item["finishTime"]
      ? item["finishTime"]
      : new Date(item["finishTime"]),
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

export function ingestionRunArrayDeserializer(
  result: Array<IngestionRun>,
): any[] {
  return result.map((item) => {
    return ingestionRunDeserializer(item);
  });
}

/** Microsoft Planetary Computer Pro geo-catalog ingestion creation model */
export interface Ingestion {
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

export function ingestionSerializer(item: Ingestion): any {
  return {
    importType: item["importType"],
    displayName: item["displayName"],
    sourceCatalogUrl: item["sourceCatalogUrl"],
    skipExistingItems: item["skipExistingItems"],
    keepOriginalAssets: item["keepOriginalAssets"],
  };
}

export function ingestionDeserializer(item: any): Ingestion {
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
export type IngestionType = "StaticCatalog";
/** Ingestion status */
export type IngestionStatus = "Ready" | "Deleting";

/** Generic paged response model */
export interface _PageIngestion {
  /** The items on the page */
  value: Ingestion[];
  /** Link to the next page of results */
  nextLink?: string;
}

export function _pageIngestionDeserializer(item: any): _PageIngestion {
  return {
    value: ingestionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ingestionArraySerializer(result: Array<Ingestion>): any[] {
  return result.map((item) => {
    return ingestionSerializer(item);
  });
}

export function ingestionArrayDeserializer(result: Array<Ingestion>): any[] {
  return result.map((item) => {
    return ingestionDeserializer(item);
  });
}

/** Ingestion Source */
export interface IngestionSource {
  /** Ingestion source id */
  id: string;
  /** Created time in UTC format */
  readonly created: Date;
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
    created: new Date(item["created"]),
    kind: item["kind"],
  };
}

/** Alias for IngestionSourceUnion */
export type IngestionSourceUnion =
  | SharedAccessSignatureTokenIngestionSource
  | ManagedIdentityIngestionSource
  | IngestionSource;

export function ingestionSourceUnionSerializer(
  item: IngestionSourceUnion,
): any {
  switch (item.kind) {
    case "SasToken":
      return sharedAccessSignatureTokenIngestionSourceSerializer(
        item as SharedAccessSignatureTokenIngestionSource,
      );

    case "BlobManagedIdentity":
      return managedIdentityIngestionSourceSerializer(
        item as ManagedIdentityIngestionSource,
      );

    default:
      return ingestionSourceSerializer(item);
  }
}

export function ingestionSourceUnionDeserializer(
  item: any,
): IngestionSourceUnion {
  switch (item.kind) {
    case "SasToken":
      return sharedAccessSignatureTokenIngestionSourceDeserializer(
        item as SharedAccessSignatureTokenIngestionSource,
      );

    case "BlobManagedIdentity":
      return managedIdentityIngestionSourceDeserializer(
        item as ManagedIdentityIngestionSource,
      );

    default:
      return ingestionSourceDeserializer(item);
  }
}

/** Ingestion source type */
export type IngestionSourceType = "SasToken" | "BlobManagedIdentity";

/** SAS Token ingestion source */
export interface SharedAccessSignatureTokenIngestionSource
  extends IngestionSource {
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
    connectionInfo: sharedAccessSignatureTokenConnectionSerializer(
      item["connectionInfo"],
    ),
  };
}

export function sharedAccessSignatureTokenIngestionSourceDeserializer(
  item: any,
): SharedAccessSignatureTokenIngestionSource {
  return {
    id: item["id"],
    created: new Date(item["created"]),
    kind: item["kind"],
    connectionInfo: sharedAccessSignatureTokenConnectionDeserializer(
      item["connectionInfo"],
    ),
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
    expiration: !item["expiration"]
      ? item["expiration"]
      : new Date(item["expiration"]),
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
    created: new Date(item["created"]),
    kind: item["kind"],
    connectionInfo: managedIdentityConnectionDeserializer(
      item["connectionInfo"],
    ),
  };
}

/** Managed Identity connection information */
export interface ManagedIdentityConnection {
  /** Azure Blob Storage container URL */
  containerUri: string;
  /** Azure Managed Identity configured in the Geo-Catalog with access to the container */
  objectId: string;
}

export function managedIdentityConnectionSerializer(
  item: ManagedIdentityConnection,
): any {
  return { containerUrl: item["containerUri"], objectId: item["objectId"] };
}

export function managedIdentityConnectionDeserializer(
  item: any,
): ManagedIdentityConnection {
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

export function _pageIngestionSourceSummaryDeserializer(
  item: any,
): _PageIngestionSourceSummary {
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
  created: Date;
}

export function ingestionSourceSummaryDeserializer(
  item: any,
): IngestionSourceSummary {
  return {
    id: item["id"],
    kind: item["kind"],
    created: new Date(item["created"]),
  };
}

/** Generic paged response model */
export interface _PageManagedIdentityMetadata {
  /** The items on the page */
  value: ManagedIdentityMetadata[];
  /** Link to the next page of results */
  nextLink?: string;
}

export function _pageManagedIdentityMetadataDeserializer(
  item: any,
): _PageManagedIdentityMetadata {
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

export function managedIdentityMetadataDeserializer(
  item: any,
): ManagedIdentityMetadata {
  return {
    objectId: item["objectId"],
    resourceId: item["resourceId"],
  };
}

/** FormContent model for file upload. */
export interface FormContent {
  /** Asset metadata */
  data: AssetMetadata;
  /** Binary file content to be uploaded. */
  file:
    | FileContents
    | { contents: FileContents; contentType?: string; filename?: string };
}

export function formContentSerializer(item: FormContent): any {
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
}

export function stacCollectionSerializer(item: StacCollection): any {
  return {
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
    assets: !item["assets"]
      ? item["assets"]
      : stacAssetRecordSerializer(item["assets"]),
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
    assets: !item["assets"]
      ? item["assets"]
      : stacAssetRecordDeserializer(item["assets"]),
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
  method?: "GET" | "POST";
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
export type StacLinkType =
  | "image/tiff; application=geotiff"
  | "image/jp2"
  | "image/png"
  | "image/jpeg"
  | "image/jpg"
  | "image/webp"
  | "application/x-binary"
  | "application/xml"
  | "application/json"
  | "application/geo+json"
  | "text/html"
  | "text/plain"
  | "application/x-protobuf";

export function stacAssetRecordSerializer(
  item: Record<string, StacAsset>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : stacAssetSerializer(item[key]);
  });
  return result;
}

export function stacAssetRecordDeserializer(
  item: Record<string, any>,
): Record<string, StacAsset> {
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

export function stacProviderArraySerializer(
  result: Array<StacProvider>,
): any[] {
  return result.map((item) => {
    return stacProviderSerializer(item);
  });
}

export function stacProviderArrayDeserializer(
  result: Array<StacProvider>,
): any[] {
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

export function stacExtensionExtentDeserializer(
  item: any,
): StacExtensionExtent {
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

export function stacExtensionSpatialExtentSerializer(
  item: StacExtensionSpatialExtent,
): any {
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

export function stacExtensionSpatialExtentDeserializer(
  item: any,
): StacExtensionSpatialExtent {
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

export function stacCollectionTemporalExtentSerializer(
  item: StacCollectionTemporalExtent,
): any {
  return {
    interval: item["interval"].map((p: any) => {
      return p.map((p: any) => {
        return !p ? p : !p ? p : p.toISOString();
      });
    }),
  };
}

export function stacCollectionTemporalExtentDeserializer(
  item: any,
): StacCollectionTemporalExtent {
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

export function userCollectionSettingsDeserializer(
  item: any,
): UserCollectionSettings {
  return {
    tileSettings: tileSettingsDeserializer(item["tileSettings"]),
    mosaicConfiguration: stacMosaicConfigurationDeserializer(
      item["mosaicInfo"],
    ),
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

export function stacMosaicConfigurationDeserializer(
  item: any,
): StacMosaicConfiguration {
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

export function renderOptionArraySerializer(
  result: Array<RenderOption>,
): any[] {
  return result.map((item) => {
    return renderOptionSerializer(item);
  });
}

export function renderOptionArrayDeserializer(
  result: Array<RenderOption>,
): any[] {
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
   * A URL query-string encoded string of TiTiler rendering options. Valid only for
   * `raster-tile` types.
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
    legend: !item["legend"]
      ? item["legend"]
      : renderOptionLegendSerializer(item["legend"]),
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
    legend: !item["legend"]
      ? item["legend"]
      : renderOptionLegendDeserializer(item["legend"]),
    conditions: !item["conditions"]
      ? item["conditions"]
      : renderOptionConditionArrayDeserializer(item["conditions"]),
  };
}

/** Specifies the types of render options for map visualization. */
export type RenderOptionType = "raster-tile" | "vt-polygon" | "vt-line";

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

export function renderOptionVectorOptionsSerializer(
  item: RenderOptionVectorOptions,
): any {
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

export function renderOptionVectorOptionsDeserializer(
  item: any,
): RenderOptionVectorOptions {
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
 * (note, `none` is a string literal).Defines the legend configuration types for data visualization.
 */
export type LegendConfigType = "continuous" | "classmap" | "interval" | "none";

export function renderOptionConditionArraySerializer(
  result: Array<RenderOptionCondition>,
): any[] {
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

export function renderOptionConditionSerializer(
  item: RenderOptionCondition,
): any {
  return { property: item["property"], value: item["value"] };
}

export function renderOptionConditionDeserializer(
  item: any,
): RenderOptionCondition {
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

export function stacCatalogCollectionsDeserializer(
  item: any,
): StacCatalogCollections {
  return {
    links: stacLinkArrayDeserializer(item["links"]),
    collections: stacCollectionArrayDeserializer(item["collections"]),
  };
}

export function stacCollectionArraySerializer(
  result: Array<StacCollection>,
): any[] {
  return result.map((item) => {
    return stacCollectionSerializer(item);
  });
}

export function stacCollectionArrayDeserializer(
  result: Array<StacCollection>,
): any[] {
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
export type PartitionTypeScheme = "year" | "month" | "none";

/**
 * https://github.com/radiantearth/stac-api-spec/blob/master/api-spec.md#ogc-api---features-endpoints
 *
 * Represents the OGC API conformance declaration.
 */
export interface StacConformanceClasses {
  /** List of OGC API conformance classes implemented by this API. */
  conformsTo: string[];
}

export function stacConformanceClassesDeserializer(
  item: any,
): StacConformanceClasses {
  return {
    conformsTo: item["conformsTo"].map((p: any) => {
      return p;
    }),
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

export function stacItemOrStacItemCollectionSerializer(
  item: StacItemOrStacItemCollection,
): any {
  return {
    type: item["type"],
    stac_version: item["stacVersion"],
    links: !item["links"]
      ? item["links"]
      : stacLinkArraySerializer(item["links"]),
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

export function stacItemOrStacItemCollectionDeserializer(
  item: any,
): StacItemOrStacItemCollection {
  return {
    type: item["type"],
    stacVersion: item["stac_version"],
    links: !item["links"]
      ? item["links"]
      : stacLinkArrayDeserializer(item["links"]),
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
export type StacModelType = "Feature" | "FeatureCollection";

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
    links: !item["links"]
      ? item["links"]
      : stacLinkArraySerializer(item["links"]),
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
    context: !item["context"]
      ? item["context"]
      : stacContextExtensionSerializer(item["context"]),
  };
}

export function stacItemCollectionDeserializer(item: any): StacItemCollection {
  return {
    type: item["type"],
    stacVersion: item["stac_version"],
    links: !item["links"]
      ? item["links"]
      : stacLinkArrayDeserializer(item["links"]),
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
    context: !item["context"]
      ? item["context"]
      : stacContextExtensionDeserializer(item["context"]),
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
    links: !item["links"]
      ? item["links"]
      : stacLinkArraySerializer(item["links"]),
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
    links: !item["links"]
      ? item["links"]
      : stacLinkArrayDeserializer(item["links"]),
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
export type GeometryType =
  | "Point"
  | "LineString"
  | "Polygon"
  | "MultiPoint"
  | "MultiLineString"
  | "MultiPolygon";

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
    end_datetime: !item["endDatetime"]
      ? item["endDatetime"]
      : item["endDatetime"].toISOString(),
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
    endDatetime: !item["end_datetime"]
      ? item["end_datetime"]
      : new Date(item["end_datetime"]),
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

export function stacContextExtensionSerializer(
  item: StacContextExtension,
): any {
  return {
    returned: item["returned"],
    limit: item["limit"],
    matched: item["matched"],
  };
}

export function stacContextExtensionDeserializer(
  item: any,
): StacContextExtension {
  return {
    returned: item["returned"],
    limit: item["limit"],
    matched: item["matched"],
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
export type StacQueryableDefinitionDataType =
  | "string"
  | "number"
  | "boolean"
  | "timestamp"
  | "date";

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

export function stacSearchParametersSerializer(
  item: StacSearchParameters,
): any {
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
    sortby: !item["sortBy"]
      ? item["sortBy"]
      : stacSortExtensionArraySerializer(item["sortBy"]),
    fields: !item["fields"]
      ? item["fields"]
      : searchOptionsFieldsArraySerializer(item["fields"]),
    filter: item["filter"],
    "filter-crs": item["filterCoordinateReferenceSystem"],
    "filter-lang": item["filterLang"],
    token: item["token"],
  };
}

/** Represent the signature type for asset URLs. */
export type StacAssetUrlSigningMode = "true" | "false";

export function stacSortExtensionArraySerializer(
  result: Array<StacSortExtension>,
): any[] {
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
export type StacSearchSortingDirection = "asc" | "desc";

export function searchOptionsFieldsArraySerializer(
  result: Array<SearchOptionsFields>,
): any[] {
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
export type FilterLanguage = "cql-json" | "cql2-json" | "cql2-text";

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

export function tileMatrixSetBoundingBoxDeserializer(
  item: any,
): TileMatrixSetBoundingBox {
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
export type TileMatrixCornerOfOrigin = "topLeft" | "bottomLeft";

export function variableMatrixWidthArrayDeserializer(
  result: Array<VariableMatrixWidth>,
): any[] {
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

export function variableMatrixWidthDeserializer(
  item: any,
): VariableMatrixWidth {
  return {
    coalesce: item["coalesce"],
    minTileRow: item["minTileRow"],
    maxTileRow: item["maxTileRow"],
  };
}

/** Options for getting asset statistics */
export interface GetAssetStatisticsOptions {}

export function getAssetStatisticsOptionsSerializer(
  item: GetAssetStatisticsOptions,
): any {
  return item;
}

/** Resampling algorithm to use when reading source raster data at different resolutions */
export type Resampling =
  | "nearest"
  | "bilinear"
  | "cubic"
  | "cubic_spline"
  | "lanczos"
  | "average"
  | "mode"
  | "gauss"
  | "rms";

/** Return dataset's statistics. */
export interface StacAssetStatistics {
  /** Response Asset Statistics Api Collections  Collection Id  Items  Item Id  Asset Statistics Get */
  data: Record<string, BandStatistics>;
}

export function stacAssetStatisticsDeserializer(
  item: any,
): StacAssetStatistics {
  return {
    data: bandStatisticsRecordDeserializer(item["data"]),
  };
}

export function bandStatisticsRecordDeserializer(
  item: Record<string, any>,
): Record<string, BandStatistics> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : bandStatisticsDeserializer(item[key]);
  });
  return result;
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

/** Options for cropping GeoJSON */
export interface CropGeoJsonOptions {}

export function cropGeoJsonOptionsSerializer(item: CropGeoJsonOptions): any {
  return item;
}

/** Supported algorithms for terrain and index-based analysis */
export type TerrainAlgorithm =
  | "hillshade"
  | "contours"
  | "normalizedIndex"
  | "terrarium"
  | "terrainrgb";
/** Available color maps for data visualization */
export type ColorMapNames =
  | "accent"
  | "accent_r"
  | "afmhot"
  | "afmhot_r"
  | "ai4g-lulc"
  | "alos-fnf"
  | "alos-palsar-mask"
  | "autumn"
  | "autumn_r"
  | "binary"
  | "binary_r"
  | "blues"
  | "blues_r"
  | "bone"
  | "bone_r"
  | "brbg"
  | "brbg_r"
  | "brg"
  | "brg_r"
  | "bugn"
  | "bugn_r"
  | "bupu"
  | "bupu_r"
  | "bwr"
  | "bwr_r"
  | "c-cap"
  | "cfastie"
  | "chesapeake-lc-13"
  | "chesapeake-lc-7"
  | "chesapeake-lu"
  | "chloris-biomass"
  | "cividis"
  | "cividis_r"
  | "cmrmap"
  | "cmrmap_r"
  | "cool"
  | "cool_r"
  | "coolwarm"
  | "coolwarm_r"
  | "copper"
  | "copper_r"
  | "cubehelix"
  | "cubehelix_r"
  | "dark2"
  | "dark2_r"
  | "drcog-lulc"
  | "esa-cci-lc"
  | "esa-worldcover"
  | "flag"
  | "flag_r"
  | "gap-lulc"
  | "gist_earth"
  | "gist_earth_r"
  | "gist_gray"
  | "gist_gray_r"
  | "gist_heat"
  | "gist_heat_r"
  | "gist_ncar"
  | "gist_ncar_r"
  | "gist_rainbow"
  | "gist_rainbow_r"
  | "gist_stern"
  | "gist_stern_r"
  | "gist_yarg"
  | "gist_yarg_r"
  | "gnbu"
  | "gnbu_r"
  | "gnuplot"
  | "gnuplot2"
  | "gnuplot2_r"
  | "gnuplot_r"
  | "gray"
  | "gray_r"
  | "greens"
  | "greens_r"
  | "greys"
  | "greys_r"
  | "hot"
  | "hot_r"
  | "hsv"
  | "hsv_r"
  | "inferno"
  | "inferno_r"
  | "io-bii"
  | "io-lulc"
  | "io-lulc-9-class"
  | "jet"
  | "jet_r"
  | "jrc-change"
  | "jrc-extent"
  | "jrc-occurrence"
  | "jrc-recurrence"
  | "jrc-seasonality"
  | "jrc-transitions"
  | "lidar-classification"
  | "lidar-hag"
  | "lidar-hag-alternative"
  | "lidar-intensity"
  | "lidar-returns"
  | "magma"
  | "magma_r"
  | "modis-10A1"
  | "modis-10A2"
  | "modis-13A1|Q1"
  | "modis-14A1|A2"
  | "modis-15A2H|A3H"
  | "modis-16A3GF-ET"
  | "modis-16A3GF-PET"
  | "modis-17A2H|A2HGF"
  | "modis-17A3HGF"
  | "modis-64A1"
  | "mtbs-severity"
  | "nipy_spectral"
  | "nipy_spectral_r"
  | "nrcan-lulc"
  | "ocean"
  | "ocean_r"
  | "oranges"
  | "oranges_r"
  | "orrd"
  | "orrd_r"
  | "paired"
  | "paired_r"
  | "pastel1"
  | "pastel1_r"
  | "pastel2"
  | "pastel2_r"
  | "pink"
  | "pink_r"
  | "piyg"
  | "piyg_r"
  | "plasma"
  | "plasma_r"
  | "prgn"
  | "prgn_r"
  | "prism"
  | "prism_r"
  | "pubu"
  | "pubu_r"
  | "pubugn"
  | "pubugn_r"
  | "puor"
  | "puor_r"
  | "purd"
  | "purd_r"
  | "purples"
  | "purples_r"
  | "qpe"
  | "rainbow"
  | "rainbow_r"
  | "rdbu"
  | "rdbu_r"
  | "rdgy"
  | "rdgy_r"
  | "rdpu"
  | "rdpu_r"
  | "rdylbu"
  | "rdylbu_r"
  | "rdylgn"
  | "rdylgn_r"
  | "reds"
  | "reds_r"
  | "rplumbo"
  | "schwarzwald"
  | "seismic"
  | "seismic_r"
  | "set1"
  | "set1_r"
  | "set2"
  | "set2_r"
  | "set3"
  | "set3_r"
  | "spectral"
  | "spectral_r"
  | "spring"
  | "spring_r"
  | "summer"
  | "summer_r"
  | "tab10"
  | "tab10_r"
  | "tab20"
  | "tab20_r"
  | "tab20b"
  | "tab20b_r"
  | "tab20c"
  | "tab20c_r"
  | "terrain"
  | "terrain_r"
  | "twilight"
  | "twilight_r"
  | "twilight_shifted"
  | "twilight_shifted_r"
  | "usda-cdl"
  | "usda-cdl-corn"
  | "usda-cdl-cotton"
  | "usda-cdl-soybeans"
  | "usda-cdl-wheat"
  | "usgs-lcmap"
  | "viirs-10a1"
  | "viirs-13a1"
  | "viirs-14a1"
  | "viirs-15a2H"
  | "viridis"
  | "viridis_r"
  | "winter"
  | "winter_r"
  | "wistia"
  | "wistia_r"
  | "ylgn"
  | "ylgn_r"
  | "ylgnbu"
  | "ylgnbu_r"
  | "ylorbr"
  | "ylorbr_r"
  | "ylorrd"
  | "ylorrd_r";

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
export type FeatureType = "Feature";

/** Options for getting GeoJSON statistics */
export interface GetGeoJsonStatisticsOptions {}

export function getGeoJsonStatisticsOptionsSerializer(
  item: GetGeoJsonStatisticsOptions,
): any {
  return item;
}

/** STAC Item representing a spatiotemporal asset with statistical information */
export interface StacItemStatisticsGeoJson {
  /** Geometry object defining the feature's shape */
  geometry: GeometryUnion;
  /** GeoJSON type identifier for Feature */
  type: FeatureType;
  /** Feature properties */
  properties?: Record<string, any>;
  /** MSFT Created */
  createdOn?: string;
  /** MSFT Updated */
  updatedOn?: string;
  /** MSFT Short Description */
  shortDescription?: string;
  /** Unique identifier for the feature */
  id: string;
  /** Bounding box coordinates for the feature */
  boundingBox: number[];
  /** Stac Version */
  stacVersion?: string;
  /** ID of the STAC collection this item belongs to */
  collection?: string;
  /** MSFT Timestamp */
  timestamp?: string;
  /** MSFT ETag */
  eTag?: string;
  /** List of STAC extension URLs used by this item */
  stacExtensions?: string[];
}

export function stacItemStatisticsGeoJsonDeserializer(
  item: any,
): StacItemStatisticsGeoJson {
  return {
    geometry: geometryUnionDeserializer(item["geometry"]),
    type: item["type"],
    properties: item["properties"],
    createdOn: item["msft:_created"],
    updatedOn: item["msft:_updated"],
    shortDescription: item["msft:short_description"],
    id: item["id"],
    boundingBox: item["bbox"].map((p: any) => {
      return p;
    }),
    stacVersion: item["stac_version"],
    collection: item["collection"],
    timestamp: item["_msft:ts"],
    eTag: item["_msft:etag"],
    stacExtensions: !item["stac_extensions"]
      ? item["stac_extensions"]
      : item["stac_extensions"].map((p: any) => {
          return p;
        }),
  };
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

export function tilerInfoGeoJsonFeatureDeserializer(
  item: any,
): TilerInfoGeoJsonFeature {
  return {
    type: item["type"],
    geometry: geometryUnionDeserializer(item["geometry"]),
    properties: tilerInfoRecordDeserializer(item["properties"]),
    id: item["id"],
    boundingBox: item["bbox"],
  };
}

export function tilerInfoRecordDeserializer(
  item: Record<string, any>,
): Record<string, TilerInfo> {
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
  colorinterp?: string[];
  /** Driver */
  driver?: string;
  /** Count */
  count?: number;
  /** Width */
  width?: number;
  /** Height */
  height?: number;
  /** Overviews */
  overviews?: string[];
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
    colorinterp: !item["colorinterp"]
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
  };
}

export function bandMetadataElementArrayArrayDeserializer(
  result: Array<Array<BandMetadataElement>>,
): any[] {
  return result.map((item) => {
    return bandMetadataElementArrayDeserializer(item);
  });
}

export function bandMetadataElementArrayDeserializer(
  result: Array<BandMetadataElement>,
): any[] {
  return result.map((item) => {
    return bandMetadataElementDeserializer(item);
  });
}

/** Union type for band metadata elements */
export type BandMetadataElement = string | Record<string, string>;

export function bandMetadataElementDeserializer(
  item: any,
): BandMetadataElement {
  return item;
}

/** NoDataType */
export type NoDataType = "Alpha" | "Mask" | "Internal" | "Nodata" | "None";

/** Return dataset's basic info or the list of available assets. */
export interface InfoOperationResponse {
  /** body for info operation response */
  data: TilerInfo;
}

export function infoOperationResponseDeserializer(
  item: any,
): InfoOperationResponse {
  return {
    data: tilerInfoDeserializer(item["data"]),
  };
}

/** Options for getting parts (cropped to bounding box) */
export interface GetPartOptions {}

export function getPartOptionsSerializer(item: GetPartOptions): any {
  return item;
}

/**
 * Point model.
 *
 * response model for `/point` endpointsResponse model for point query operations providing values at a specific location
 */
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

/** Options for getting previews */
export interface GetPreviewOptions {}

export function getPreviewOptionsSerializer(item: GetPreviewOptions): any {
  return item;
}

/** Parameters for requesting a rendered image from a collection */
export interface ImageRequest {
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

export function imageRequestSerializer(item: ImageRequest): any {
  return {
    cql: item["cql"],
    zoom: item["zoom"],
    geometry: !item["geometry"]
      ? item["geometry"]
      : geometryUnionSerializer(item["geometry"]),
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

/** Options for getting statistics */
export interface GetStatisticsOptions {}

export function getStatisticsOptionsSerializer(
  item: GetStatisticsOptions,
): any {
  return item;
}

/** Return dataset's statistics. */
export interface StatisticsResponse {
  /** Additional properties */
  additionalProperties?: Record<string, BandStatistics>;
}

export function statisticsResponseDeserializer(item: any): StatisticsResponse {
  return {
    additionalProperties: serializeRecord(item, [], bandStatisticsDeserializer),
  };
}

/** Options for getting TileJSON */
export interface GetTileJsonOptions {}

export function getTileJsonOptionsSerializer(item: GetTileJsonOptions): any {
  return item;
}

/** Image format specifier for tile and image requests */
export type TilerImageFormat =
  | "png"
  | "npy"
  | "tif"
  | "jpeg"
  | "jpg"
  | "jp2"
  | "webp"
  | "pngraw";

/**
 * TileJSON model.
 *
 * Based on https://github.com/mapbox/tilejson-spec/tree/master/2.2.0TileJSON metadata describing a tile set according to the TileJSON specification
 */
export interface TileJsonMetaData {
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

export function tileJsonMetaDataDeserializer(item: any): TileJsonMetaData {
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
export type TileAddressingScheme = "xyz" | "tms";

/** Options for getting a tile from a dataset */
export interface GetTileOptions {}

export function getTileOptionsSerializer(item: GetTileOptions): any {
  return item;
}

/** Options for getting WMTS capabilities */
export interface GetWmtsCapabilitiesOptions {}

export function getWmtsCapabilitiesOptionsSerializer(
  item: GetWmtsCapabilitiesOptions,
): any {
  return item;
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

export function tilerStacSearchRegistrationDeserializer(
  item: any,
): TilerStacSearchRegistration {
  return {
    search: tilerStacSearchDefinitionDeserializer(item["search"]),
    links: !item["links"]
      ? item["links"]
      : stacLinkArrayDeserializer(item["links"]),
  };
}

/**
 * PgSTAC Search entry.
 *
 * ref:
 * https://github.com/stac-utils/pgstac/blob/3499daa2bfa700ae7bb07503795c169bf2ebafc7/sql/004_search.sql#L907-L915Stored search query in the PgSTAC database
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

export function tilerStacSearchDefinitionDeserializer(
  item: any,
): TilerStacSearchDefinition {
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
export type MosaicMetadataType = "mosaic" | "search";

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
    links: !item["links"]
      ? item["links"]
      : stacLinkArrayDeserializer(item["links"]),
  };
}

/** Options for mosaic TileJSON */
export interface GetMosaicTileJsonOptions {}

export function getMosaicTileJsonOptionsSerializer(
  item: GetMosaicTileJsonOptions,
): any {
  return item;
}

/**
 * Identifier selecting one of the TileMatrixSetId supported (default:
 * 'WebMercatorQuad')Identifier selecting one of the TileMatrixSetId supported (default:
 * 'WebMercatorQuad')Method used to select or compute pixels when creating composites from multiple sources
 */
export type PixelSelection =
  | "first"
  | "highest"
  | "lowest"
  | "mean"
  | "median"
  | "stdev"
  | "lastbandlow"
  | "lastbandhigh";

/** Options for mosaic tiles */
export interface GetMosaicTileOptions {}

export function getMosaicTileOptionsSerializer(
  item: GetMosaicTileOptions,
): any {
  return item;
}

/** Options for mosaic WMTS capabilities */
export interface GetMosaicWmtsCapabilitiesOptions {}

export function getMosaicWmtsCapabilitiesOptionsSerializer(
  item: GetMosaicWmtsCapabilitiesOptions,
): any {
  return item;
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
    expiresOn: !item["msft:expiry"]
      ? item["msft:expiry"]
      : new Date(item["msft:expiry"]),
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

export function sharedAccessSignatureTokenDeserializer(
  item: any,
): SharedAccessSignatureToken {
  return {
    expiresOn: new Date(item["msft:expiry"]),
    token: item["token"],
  };
}

/** Interval legends element used to define a color map */
export type IntervalLegendsElement = number[] | Record<string, string>;

export function intervalLegendsElementDeserializer(
  item: any,
): IntervalLegendsElement {
  return item;
}

/** Represents version information. */
export enum KnownVersions {
  /** Represents the 2025-04-30-preview version. */
  V20250430Preview = "2025-04-30-preview",
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

export function stacAssetArraySerializer(result: Array<StacAsset>): any[] {
  return result.map((item) => {
    return stacAssetSerializer(item);
  });
}

export function stacAssetArrayDeserializer(result: Array<StacAsset>): any[] {
  return result.map((item) => {
    return stacAssetDeserializer(item);
  });
}

export function stacQueryableArraySerializer(
  result: Array<StacQueryable>,
): any[] {
  return result.map((item) => {
    return stacQueryableSerializer(item);
  });
}

export function stacQueryableArrayDeserializer(
  result: Array<StacQueryable>,
): any[] {
  return result.map((item) => {
    return stacQueryableDeserializer(item);
  });
}
