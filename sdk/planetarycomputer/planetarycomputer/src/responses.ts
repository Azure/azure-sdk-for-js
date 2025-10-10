// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import type {
  PageOperationOutput,
  OperationOutput,
  PageIngestionRunOutput,
  IngestionRunOutput,
  PageIngestionOutput,
  IngestionOutput,
  PageIngestionSourceSummaryOutput,
  IngestionSourceOutput,
  PageManagedIdentityMetadataOutput,
  StacCollectionOutput,
  UserCollectionSettingsOutput,
  StacMosaicOutput,
  StacCatalogCollectionsOutput,
  PartitionTypeOutput,
  RenderOptionOutput,
  TileSettingsOutput,
  StacConformanceClassesOutput,
  StacItemCollectionOutput,
  StacItemOutput,
  StacLandingPageOutput,
  StacQueryableOutput,
  TileMatrixSetOutput,
  StacAssetStatisticsOutput,
  StacItemBoundsOutput,
  GeoJsonStatisticsForStacItemCollectionOutput,
  TilerInfoGeoJsonFeatureOutput,
  InfoOperationResponseOutput,
  TilerCoreModelsResponsesPointOutput,
  ImageResponseOutput,
  StatisticsResponseOutput,
  TileJsonMetaDataOutput,
  IntervalLegendsElementOutput,
  StacAssetOutput,
  TilerStacSearchRegistrationOutput,
  TilerMosaicSearchRegistrationResponseOutput,
  SharedAccessSignatureTokenOutput,
  SignedLinkOutput,
} from "./outputModels.js";

/** The request has succeeded. */
export interface IngestionOperationsList200Response extends HttpResponse {
  status: "200";
  body: PageOperationOutput;
}

export interface IngestionOperationsListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionOperationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionOperationsListDefaultHeaders;
}

/** The request has succeeded. */
export interface IngestionOperationsGet200Response extends HttpResponse {
  status: "200";
  body: OperationOutput;
}

export interface IngestionOperationsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionOperationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionOperationsGetDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface IngestionOperationsDelete204Response extends HttpResponse {
  status: "204";
}

export interface IngestionOperationsDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionOperationsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionOperationsDeleteDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface IngestionOperationsDeleteAll204Response extends HttpResponse {
  status: "204";
}

export interface IngestionOperationsDeleteAllDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionOperationsDeleteAllDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionOperationsDeleteAllDefaultHeaders;
}

/** The request has succeeded. */
export interface IngestionRunsList200Response extends HttpResponse {
  status: "200";
  body: PageIngestionRunOutput;
}

export interface IngestionRunsListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionRunsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionRunsListDefaultHeaders;
}

/** The request has succeeded. */
export interface IngestionRunsGet200Response extends HttpResponse {
  status: "200";
  body: IngestionRunOutput;
}

export interface IngestionRunsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionRunsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionRunsGetDefaultHeaders;
}

export interface IngestionRunsCreate201Headers {
  /** Url of the created ingestion run */
  location: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface IngestionRunsCreate201Response extends HttpResponse {
  status: "201";
  body: IngestionRunOutput;
  headers: RawHttpHeaders & IngestionRunsCreate201Headers;
}

export interface IngestionRunsCreateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionRunsCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionRunsCreateDefaultHeaders;
}

/** The request has succeeded. */
export interface IngestionsList200Response extends HttpResponse {
  status: "200";
  body: PageIngestionOutput;
}

export interface IngestionsListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionsListDefaultHeaders;
}

/** The request has succeeded. */
export interface IngestionsGet200Response extends HttpResponse {
  status: "200";
  body: IngestionOutput;
}

export interface IngestionsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionsGetDefaultHeaders;
}

export interface IngestionsCreate201Headers {
  /** Url of the created ingestion */
  location: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface IngestionsCreate201Response extends HttpResponse {
  status: "201";
  body: IngestionOutput;
  headers: RawHttpHeaders & IngestionsCreate201Headers;
}

export interface IngestionsCreateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionsCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionsCreateDefaultHeaders;
}

/** The request has succeeded. */
export interface IngestionsUpdate200Response extends HttpResponse {
  status: "200";
  body: IngestionOutput;
}

export interface IngestionsUpdateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionsUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionsUpdateDefaultHeaders;
}

export interface IngestionsDelete202Headers {
  /** Url used to monitor the background operation */
  location: string;
  /** Url used to monitor the background operation */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface IngestionsDelete202Response extends HttpResponse {
  status: "202";
  body: OperationOutput;
  headers: RawHttpHeaders & IngestionsDelete202Headers;
}

export interface IngestionsDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionsDeleteDefaultHeaders;
}

/** The final response for long-running delete operation */
export interface IngestionsDeleteLogicalResponse extends HttpResponse {
  status: "200";
  body: OperationOutput;
}

/** The request has succeeded. */
export interface IngestionSourcesList200Response extends HttpResponse {
  status: "200";
  body: PageIngestionSourceSummaryOutput;
}

export interface IngestionSourcesListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionSourcesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionSourcesListDefaultHeaders;
}

/** The request has succeeded. */
export interface IngestionSourcesGet200Response extends HttpResponse {
  status: "200";
  body: IngestionSourceOutput;
}

export interface IngestionSourcesGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionSourcesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionSourcesGetDefaultHeaders;
}

export interface IngestionSourcesCreate201Headers {
  /** Url of the created ingestion source */
  location: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface IngestionSourcesCreate201Response extends HttpResponse {
  status: "201";
  body: IngestionSourceOutput;
  headers: RawHttpHeaders & IngestionSourcesCreate201Headers;
}

export interface IngestionSourcesCreateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionSourcesCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionSourcesCreateDefaultHeaders;
}

export interface IngestionSourcesCreateOrReplace200Headers {
  /** Url of the created ingestion source */
  location: string;
}

/** The request has succeeded. */
export interface IngestionSourcesCreateOrReplace200Response
  extends HttpResponse {
  status: "200";
  body: IngestionSourceOutput;
  headers: RawHttpHeaders & IngestionSourcesCreateOrReplace200Headers;
}

export interface IngestionSourcesCreateOrReplace201Headers {
  /** Url of the created ingestion source */
  location: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface IngestionSourcesCreateOrReplace201Response
  extends HttpResponse {
  status: "201";
  body: IngestionSourceOutput;
  headers: RawHttpHeaders & IngestionSourcesCreateOrReplace201Headers;
}

export interface IngestionSourcesCreateOrReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionSourcesCreateOrReplaceDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionSourcesCreateOrReplaceDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface IngestionSourcesDelete204Response extends HttpResponse {
  status: "204";
}

export interface IngestionSourcesDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionSourcesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionSourcesDeleteDefaultHeaders;
}

/** The request has succeeded. */
export interface IngestionSourcesListManagedIdentities200Response
  extends HttpResponse {
  status: "200";
  body: PageManagedIdentityMetadataOutput;
}

export interface IngestionSourcesListManagedIdentitiesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionSourcesListManagedIdentitiesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionSourcesListManagedIdentitiesDefaultHeaders;
}

/** The request has succeeded. */
export interface StacCollectionAssetsCreate200Response extends HttpResponse {
  status: "200";
  body: StacCollectionOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface StacCollectionAssetsCreate201Response extends HttpResponse {
  status: "201";
  body: StacCollectionOutput;
}

export interface StacCollectionAssetsCreateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionAssetsCreateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionAssetsCreateDefaultHeaders;
}

/** The request has succeeded. */
export interface StacCollectionAssetsCreateOrReplace200Response
  extends HttpResponse {
  status: "200";
  body: StacCollectionOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface StacCollectionAssetsCreateOrReplace201Response
  extends HttpResponse {
  status: "201";
  body: StacCollectionOutput;
}

export interface StacCollectionAssetsCreateOrReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionAssetsCreateOrReplaceDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionAssetsCreateOrReplaceDefaultHeaders;
}

/** The request has succeeded. */
export interface StacCollectionAssetsDelete200Response extends HttpResponse {
  status: "200";
}

export interface StacCollectionAssetsDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionAssetsDeleteDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionAssetsDeleteDefaultHeaders;
}

/** The request has succeeded. */
export interface StacCollectionConfigGet200Response extends HttpResponse {
  status: "200";
  body: UserCollectionSettingsOutput;
}

export interface StacCollectionConfigGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionConfigGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionConfigGetDefaultHeaders;
}

/** The request has succeeded. */
export interface StacCollectionMosaicsGetAll200Response extends HttpResponse {
  status: "200";
  body: Array<StacMosaicOutput>;
}

export interface StacCollectionMosaicsGetAllDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionMosaicsGetAllDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionMosaicsGetAllDefaultHeaders;
}

/** The request has succeeded. */
export interface StacCollectionMosaicsAdd200Response extends HttpResponse {
  status: "200";
  body: StacMosaicOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface StacCollectionMosaicsAdd201Response extends HttpResponse {
  status: "201";
  body: StacMosaicOutput;
}

export interface StacCollectionMosaicsAddDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionMosaicsAddDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionMosaicsAddDefaultHeaders;
}

/** The request has succeeded. */
export interface StacCollectionMosaicsGet200Response extends HttpResponse {
  status: "200";
  body: StacMosaicOutput;
}

export interface StacCollectionMosaicsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionMosaicsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionMosaicsGetDefaultHeaders;
}

/** The request has succeeded. */
export interface StacCollectionMosaicsCreateOrReplace200Response
  extends HttpResponse {
  status: "200";
  body: StacMosaicOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface StacCollectionMosaicsCreateOrReplace201Response
  extends HttpResponse {
  status: "201";
  body: StacMosaicOutput;
}

export interface StacCollectionMosaicsCreateOrReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionMosaicsCreateOrReplaceDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionMosaicsCreateOrReplaceDefaultHeaders;
}

/** The request has succeeded. */
export interface StacCollectionMosaicsDelete200Response extends HttpResponse {
  status: "200";
}

export interface StacCollectionMosaicsDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionMosaicsDeleteDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionMosaicsDeleteDefaultHeaders;
}

/** The request has succeeded. */
export interface StacCollectionsGetAll200Response extends HttpResponse {
  status: "200";
  body: StacCatalogCollectionsOutput;
}

export interface StacCollectionsGetAllDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionsGetAllDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionsGetAllDefaultHeaders;
}

export interface StacCollectionsCreate202Headers {
  /** Url used to monitor the background operation */
  location: string;
  /** Url used to monitor the background operation */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface StacCollectionsCreate202Response extends HttpResponse {
  status: "202";
  body: OperationOutput;
  headers: RawHttpHeaders & StacCollectionsCreate202Headers;
}

export interface StacCollectionsCreateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionsCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionsCreateDefaultHeaders;
}

/** The final response for long-running create operation */
export interface StacCollectionsCreateLogicalResponse extends HttpResponse {
  status: "200";
  body: OperationOutput;
}

/** The request has succeeded. */
export interface StacCollectionsGet200Response extends HttpResponse {
  status: "200";
  body: StacCollectionOutput;
}

export interface StacCollectionsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionsGetDefaultHeaders;
}

export interface StacCollectionsCreateOrReplace200Headers {
  /** Url used to monitor the background operation */
  location: string;
  /** Url used to monitor the background operation */
  "operation-location": string;
}

/** The request has succeeded. */
export interface StacCollectionsCreateOrReplace200Response
  extends HttpResponse {
  status: "200";
  body: OperationOutput;
  headers: RawHttpHeaders & StacCollectionsCreateOrReplace200Headers;
}

export interface StacCollectionsCreateOrReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionsCreateOrReplaceDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionsCreateOrReplaceDefaultHeaders;
}

/** The final response for long-running createOrReplace operation */
export interface StacCollectionsCreateOrReplaceLogicalResponse
  extends HttpResponse {
  status: "200";
  body: OperationOutput;
}

export interface StacCollectionsDelete202Headers {
  /** Url used to monitor the background operation */
  location: string;
  /** Url used to monitor the background operation */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface StacCollectionsDelete202Response extends HttpResponse {
  status: "202";
  body: OperationOutput;
  headers: RawHttpHeaders & StacCollectionsDelete202Headers;
}

export interface StacCollectionsDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionsDeleteDefaultHeaders;
}

/** The final response for long-running delete operation */
export interface StacCollectionsDeleteLogicalResponse extends HttpResponse {
  status: "200";
  body: OperationOutput;
}

/** The request has succeeded. */
export interface StacCollectionPartitionTypesGet200Response
  extends HttpResponse {
  status: "200";
  body: PartitionTypeOutput;
}

export interface StacCollectionPartitionTypesGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionPartitionTypesGetDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionPartitionTypesGetDefaultHeaders;
}

/** The request has succeeded. */
export interface StacCollectionPartitionTypesReplace200Response
  extends HttpResponse {
  status: "200";
}

/** The server cannot find the requested resource. */
export interface StacCollectionPartitionTypesReplace404Response
  extends HttpResponse {
  status: "404";
}

export interface StacCollectionPartitionTypesReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionPartitionTypesReplaceDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionPartitionTypesReplaceDefaultHeaders;
}

/** The request has succeeded. */
export interface StacCollectionRenderOptionsGetAll200Response
  extends HttpResponse {
  status: "200";
  body: Array<RenderOptionOutput>;
}

export interface StacCollectionRenderOptionsGetAllDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionRenderOptionsGetAllDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionRenderOptionsGetAllDefaultHeaders;
}

/** The request has succeeded. */
export interface StacCollectionRenderOptionsCreate200Response
  extends HttpResponse {
  status: "200";
  body: RenderOptionOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface StacCollectionRenderOptionsCreate201Response
  extends HttpResponse {
  status: "201";
  body: RenderOptionOutput;
}

export interface StacCollectionRenderOptionsCreateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionRenderOptionsCreateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionRenderOptionsCreateDefaultHeaders;
}

/** The request has succeeded. */
export interface StacCollectionRenderOptionsGet200Response
  extends HttpResponse {
  status: "200";
  body: RenderOptionOutput;
}

export interface StacCollectionRenderOptionsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionRenderOptionsGetDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionRenderOptionsGetDefaultHeaders;
}

/** The request has succeeded. */
export interface StacCollectionRenderOptionsCreateOrReplace200Response
  extends HttpResponse {
  status: "200";
  body: RenderOptionOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface StacCollectionRenderOptionsCreateOrReplace201Response
  extends HttpResponse {
  status: "201";
  body: RenderOptionOutput;
}

export interface StacCollectionRenderOptionsCreateOrReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionRenderOptionsCreateOrReplaceDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    StacCollectionRenderOptionsCreateOrReplaceDefaultHeaders;
}

/** The request has succeeded. */
export interface StacCollectionRenderOptionsDelete200Response
  extends HttpResponse {
  status: "200";
}

export interface StacCollectionRenderOptionsDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionRenderOptionsDeleteDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionRenderOptionsDeleteDefaultHeaders;
}

export interface StacCollectionThumbnailsGet200Headers {
  /** content type */
  "content-type": "application/x-binary";
}

/** Return an image. */
export interface StacCollectionThumbnailsGet200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & StacCollectionThumbnailsGet200Headers;
}

export interface StacCollectionThumbnailsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionThumbnailsGetDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionThumbnailsGetDefaultHeaders;
}

/** The request has succeeded. */
export interface StacCollectionTileSettingsGet200Response extends HttpResponse {
  status: "200";
  body: TileSettingsOutput;
}

export interface StacCollectionTileSettingsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionTileSettingsGetDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionTileSettingsGetDefaultHeaders;
}

/** The request has succeeded. */
export interface StacCollectionTileSettingsReplace200Response
  extends HttpResponse {
  status: "200";
  body: TileSettingsOutput;
}

export interface StacCollectionTileSettingsReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionTileSettingsReplaceDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionTileSettingsReplaceDefaultHeaders;
}

/** The request has succeeded. */
export interface StacConformanceClassGet200Response extends HttpResponse {
  status: "200";
  body: StacConformanceClassesOutput;
}

export interface StacConformanceClassGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacConformanceClassGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacConformanceClassGetDefaultHeaders;
}

/** The request has succeeded. */
export interface StacItemsGetFeatures200Response extends HttpResponse {
  status: "200";
  body: StacItemCollectionOutput;
}

export interface StacItemsGetFeaturesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacItemsGetFeaturesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacItemsGetFeaturesDefaultHeaders;
}

/** The request has succeeded. */
export interface StacItemsGet200Response extends HttpResponse {
  status: "200";
  body: StacItemOutput;
}

export interface StacItemsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacItemsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacItemsGetDefaultHeaders;
}

export interface StacItemsCreate202Headers {
  /** Url used to monitor the background operation */
  location: string;
  /** Url used to monitor the background operation */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface StacItemsCreate202Response extends HttpResponse {
  status: "202";
  body: OperationOutput;
  headers: RawHttpHeaders & StacItemsCreate202Headers;
}

export interface StacItemsCreateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacItemsCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacItemsCreateDefaultHeaders;
}

/** The final response for long-running create operation */
export interface StacItemsCreateLogicalResponse extends HttpResponse {
  status: "200";
  body: OperationOutput;
}

export interface StacItemsCreateOrReplace202Headers {
  /** Url used to monitor the background operation */
  location: string;
  /** Url used to monitor the background operation */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface StacItemsCreateOrReplace202Response extends HttpResponse {
  status: "202";
  body: OperationOutput;
  headers: RawHttpHeaders & StacItemsCreateOrReplace202Headers;
}

export interface StacItemsCreateOrReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacItemsCreateOrReplaceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacItemsCreateOrReplaceDefaultHeaders;
}

/** The final response for long-running createOrReplace operation */
export interface StacItemsCreateOrReplaceLogicalResponse extends HttpResponse {
  status: "200";
  body: OperationOutput;
}

export interface StacItemsUpdate202Headers {
  /** Url used to monitor the background operation */
  location: string;
  /** Url used to monitor the background operation */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface StacItemsUpdate202Response extends HttpResponse {
  status: "202";
  body: OperationOutput;
  headers: RawHttpHeaders & StacItemsUpdate202Headers;
}

export interface StacItemsUpdateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacItemsUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacItemsUpdateDefaultHeaders;
}

/** The final response for long-running update operation */
export interface StacItemsUpdateLogicalResponse extends HttpResponse {
  status: "200";
  body: OperationOutput;
}

export interface StacItemsDelete202Headers {
  /** Url used to monitor the background operation */
  location: string;
  /** Url used to monitor the background operation */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface StacItemsDelete202Response extends HttpResponse {
  status: "202";
  body: OperationOutput;
  headers: RawHttpHeaders & StacItemsDelete202Headers;
}

export interface StacItemsDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacItemsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacItemsDeleteDefaultHeaders;
}

/** The final response for long-running delete operation */
export interface StacItemsDeleteLogicalResponse extends HttpResponse {
  status: "200";
  body: OperationOutput;
}

/** The request has succeeded. */
export interface StacLandingPagesGet200Response extends HttpResponse {
  status: "200";
  body: StacLandingPageOutput;
}

export interface StacLandingPagesGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacLandingPagesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacLandingPagesGetDefaultHeaders;
}

/** The request has succeeded. */
export interface StacQueryablesGetAll200Response extends HttpResponse {
  status: "200";
  body: Record<string, any>;
}

export interface StacQueryablesGetAllDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacQueryablesGetAllDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacQueryablesGetAllDefaultHeaders;
}

/** The request has succeeded. */
export interface StacQueryablesDelete200Response extends HttpResponse {
  status: "200";
}

export interface StacQueryablesDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacQueryablesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacQueryablesDeleteDefaultHeaders;
}

/** The request has succeeded. */
export interface StacQueryablesGetAllByCollection200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, any>;
}

export interface StacQueryablesGetAllByCollectionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacQueryablesGetAllByCollectionDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacQueryablesGetAllByCollectionDefaultHeaders;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface StacQueryablesCreate201Response extends HttpResponse {
  status: "201";
  body: Array<StacQueryableOutput>;
}

export interface StacQueryablesCreateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacQueryablesCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacQueryablesCreateDefaultHeaders;
}

/** The request has succeeded. */
export interface StacQueryablesCreateOrReplace200Response extends HttpResponse {
  status: "200";
  body: StacQueryableOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface StacQueryablesCreateOrReplace201Response extends HttpResponse {
  status: "201";
  body: StacQueryableOutput;
}

export interface StacQueryablesCreateOrReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacQueryablesCreateOrReplaceDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacQueryablesCreateOrReplaceDefaultHeaders;
}

/** The request has succeeded. */
export interface StacSearchGet200Response extends HttpResponse {
  status: "200";
  body: StacItemCollectionOutput;
}

export interface StacSearchGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacSearchGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacSearchGetDefaultHeaders;
}

/** The request has succeeded. */
export interface StacSearchCreate200Response extends HttpResponse {
  status: "200";
  body: StacItemCollectionOutput;
}

export interface StacSearchCreateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacSearchCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacSearchCreateDefaultHeaders;
}

/** The request has succeeded. */
export interface TileMatrixDefinitionsGet200Response extends HttpResponse {
  status: "200";
  body: TileMatrixSetOutput;
}

export interface TileMatrixDefinitionsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TileMatrixDefinitionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TileMatrixDefinitionsGetDefaultHeaders;
}

/** The request has succeeded. */
export interface TileMatrixListGet200Response extends HttpResponse {
  status: "200";
  body: string[];
}

export interface TileMatrixListGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TileMatrixListGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TileMatrixListGetDefaultHeaders;
}

/** Return dataset's statistics. */
export interface TilerAssetStatisticsGetAll200Response extends HttpResponse {
  status: "200";
  body: StacAssetStatisticsOutput;
}

export interface TilerAssetStatisticsGetAllDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerAssetStatisticsGetAllDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerAssetStatisticsGetAllDefaultHeaders;
}

/** Return a list of supported assets. */
export interface TilerAvailableAssetsGetAll200Response extends HttpResponse {
  status: "200";
  body: string[];
}

export interface TilerAvailableAssetsGetAllDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerAvailableAssetsGetAllDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerAvailableAssetsGetAllDefaultHeaders;
}

/** The request has succeeded. */
export interface TilerBoundGetAll200Response extends HttpResponse {
  status: "200";
  body: StacItemBoundsOutput;
}

export interface TilerBoundGetAllDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerBoundGetAllDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerBoundGetAllDefaultHeaders;
}

export interface TilerGeoJsonsCropWidthByHeightFormat200Headers {
  /** content type */
  "content-type": "application/x-binary";
}

/** Return an image. */
export interface TilerGeoJsonsCropWidthByHeightFormat200Response
  extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & TilerGeoJsonsCropWidthByHeightFormat200Headers;
}

export interface TilerGeoJsonsCropWidthByHeightFormatDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerGeoJsonsCropWidthByHeightFormatDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerGeoJsonsCropWidthByHeightFormatDefaultHeaders;
}

export interface TilerGeoJsonsCropFormat200Headers {
  /** content type */
  "content-type": "application/x-binary";
}

/** Return an image. */
export interface TilerGeoJsonsCropFormat200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & TilerGeoJsonsCropFormat200Headers;
}

export interface TilerGeoJsonsCropFormatDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerGeoJsonsCropFormatDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerGeoJsonsCropFormatDefaultHeaders;
}

/** The request has succeeded. */
export interface TilerGeoJsonStatisticsGetAll200Response extends HttpResponse {
  status: "200";
  body: GeoJsonStatisticsForStacItemCollectionOutput;
}

export interface TilerGeoJsonStatisticsGetAllDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerGeoJsonStatisticsGetAllDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerGeoJsonStatisticsGetAllDefaultHeaders;
}

/** The request has succeeded. */
export interface TilerInfoGeoJsonOperationsGet200Response extends HttpResponse {
  status: "200";
  body: TilerInfoGeoJsonFeatureOutput;
}

export interface TilerInfoGeoJsonOperationsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerInfoGeoJsonOperationsGetDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerInfoGeoJsonOperationsGetDefaultHeaders;
}

/** Return dataset's basic info or the list of available assets. */
export interface TilerInfoOperationsGet200Response extends HttpResponse {
  status: "200";
  body: InfoOperationResponseOutput;
}

export interface TilerInfoOperationsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerInfoOperationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerInfoOperationsGetDefaultHeaders;
}

export interface TilerPartsGetCroppedToBoundingBoxWidthByHeight200Headers {
  /** content type */
  "content-type": "application/x-binary";
}

/** Return an image. */
export interface TilerPartsGetCroppedToBoundingBoxWidthByHeight200Response
  extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders &
    TilerPartsGetCroppedToBoundingBoxWidthByHeight200Headers;
}

export interface TilerPartsGetCroppedToBoundingBoxWidthByHeightDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerPartsGetCroppedToBoundingBoxWidthByHeightDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    TilerPartsGetCroppedToBoundingBoxWidthByHeightDefaultHeaders;
}

export interface TilerPartsGetCroppedToBoundingBox200Headers {
  /** content type */
  "content-type": "application/x-binary";
}

/** Return an image. */
export interface TilerPartsGetCroppedToBoundingBox200Response
  extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & TilerPartsGetCroppedToBoundingBox200Headers;
}

export interface TilerPartsGetCroppedToBoundingBoxDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerPartsGetCroppedToBoundingBoxDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerPartsGetCroppedToBoundingBoxDefaultHeaders;
}

/** The request has succeeded. */
export interface TilerPointsGetPoint200Response extends HttpResponse {
  status: "200";
  body: TilerCoreModelsResponsesPointOutput;
}

export interface TilerPointsGetPointDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerPointsGetPointDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerPointsGetPointDefaultHeaders;
}

export interface TilerPreviewsGetFormat200Headers {
  /** content type */
  "content-type": "application/x-binary";
}

/** Return an image. */
export interface TilerPreviewsGetFormat200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & TilerPreviewsGetFormat200Headers;
}

export interface TilerPreviewsGetFormatDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerPreviewsGetFormatDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerPreviewsGetFormatDefaultHeaders;
}

export interface TilerPreviewsGet200Headers {
  /** content type */
  "content-type": "application/x-binary";
}

/** Return an image. */
export interface TilerPreviewsGet200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & TilerPreviewsGet200Headers;
}

export interface TilerPreviewsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerPreviewsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerPreviewsGetDefaultHeaders;
}

/** The request has succeeded. */
export interface TilerStaticImagesCreate200Response extends HttpResponse {
  status: "200";
  body: ImageResponseOutput;
}

export interface TilerStaticImagesCreateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerStaticImagesCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerStaticImagesCreateDefaultHeaders;
}

export interface TilerStaticImagesGet200Headers {
  /** content type */
  "content-type": "image/png";
}

/** Return an image. */
export interface TilerStaticImagesGet200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & TilerStaticImagesGet200Headers;
}

export interface TilerStaticImagesGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerStaticImagesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerStaticImagesGetDefaultHeaders;
}

/** The request has succeeded. */
export interface TilerStatisticsGetAll200Response extends HttpResponse {
  status: "200";
  body: StatisticsResponseOutput;
}

export interface TilerStatisticsGetAllDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerStatisticsGetAllDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerStatisticsGetAllDefaultHeaders;
}

/** The request has succeeded. */
export interface TilerTileJsonTileMatrixSetsGet200Response
  extends HttpResponse {
  status: "200";
  body: TileJsonMetaDataOutput;
}

export interface TilerTileJsonTileMatrixSetsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerTileJsonTileMatrixSetsGetDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerTileJsonTileMatrixSetsGetDefaultHeaders;
}

export interface TilerTileMatrixSetsGetZxyScaleByFormat200Headers {
  /** content type */
  "content-type": "application/x-binary";
}

/** Return an image. */
export interface TilerTileMatrixSetsGetZxyScaleByFormat200Response
  extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & TilerTileMatrixSetsGetZxyScaleByFormat200Headers;
}

export interface TilerTileMatrixSetsGetZxyScaleByFormatDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerTileMatrixSetsGetZxyScaleByFormatDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    TilerTileMatrixSetsGetZxyScaleByFormatDefaultHeaders;
}

export interface TilerWmtsTileMatrixSetsGetCapabilitiesXml200Headers {
  /** content type for WMTSCapabilitiesXmlResponse */
  "content-type": "application/xml";
}

/** Successful Response */
export interface TilerWmtsTileMatrixSetsGetCapabilitiesXml200Response
  extends HttpResponse {
  status: "200";
  body: string;
  headers: RawHttpHeaders & TilerWmtsTileMatrixSetsGetCapabilitiesXml200Headers;
}

export interface TilerWmtsTileMatrixSetsGetCapabilitiesXmlDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerWmtsTileMatrixSetsGetCapabilitiesXmlDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    TilerWmtsTileMatrixSetsGetCapabilitiesXmlDefaultHeaders;
}

/** The request has succeeded. */
export interface MapsClassMapLegendsGet200Response extends HttpResponse {
  status: "200";
  body: Record<string, any>;
}

export interface MapsClassMapLegendsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface MapsClassMapLegendsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & MapsClassMapLegendsGetDefaultHeaders;
}

export interface MapsIntervalLegendsGetByClassMapName200Headers {
  /** content type */
  "content-type": "application/json";
}

/**
 * Interval legend response model.
 *
 * Represents a color map for intervals, where each interval is defined by:
 * - A numeric range `[min, max]` representing the interval boundaries.
 * - An RGBA color `[red, green, blue, alpha]` associated with the interval.
 *
 * The response is a 2D array of interval definitions, where each element is a pair:
 * - The first element is an array of two numbers `[min, max]` defining the interval.
 * - The second element is an array of four numbers `[red, green, blue, alpha]` defining the RGBA color.
 *
 * Example:
 * ```json
 * [
 *   [
 *     [-2, 0], [0, 0, 0, 0]
 *   ],
 *   [
 *     [1, 32], [255, 255, 178, 255]
 *   ]
 * ]
 * ```
 * This example defines two intervals:
 * - The interval `[-2, 0]` is mapped to the color `[0, 0, 0, 0]` (transparent black).
 * - The interval `[1, 32]` is mapped to the color `[255, 255, 178, 255]` (opaque yellow).
 */
export interface MapsIntervalLegendsGetByClassMapName200Response
  extends HttpResponse {
  status: "200";
  body: Array<IntervalLegendsElementOutput>[];
  headers: RawHttpHeaders & MapsIntervalLegendsGetByClassMapName200Headers;
}

export interface MapsIntervalLegendsGetByClassMapNameDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface MapsIntervalLegendsGetByClassMapNameDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & MapsIntervalLegendsGetByClassMapNameDefaultHeaders;
}

export interface MapsLegendsGet200Headers {
  /** content type */
  "content-type": "image/png";
}

/** Return an image. */
export interface MapsLegendsGet200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & MapsLegendsGet200Headers;
}

export interface MapsLegendsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface MapsLegendsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & MapsLegendsGetDefaultHeaders;
}

/** The request has succeeded. */
export interface MosaicsAssetsForPointsGetPointAssets200Response
  extends HttpResponse {
  status: "200";
  body: Array<StacAssetOutput>;
}

export interface MosaicsAssetsForPointsGetPointAssetsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface MosaicsAssetsForPointsGetPointAssetsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & MosaicsAssetsForPointsGetPointAssetsDefaultHeaders;
}

/** Return list of assets */
export interface MosaicsAssetsForTileMatrixSetsGetZxyAssets200Response
  extends HttpResponse {
  status: "200";
  body: any[];
}

export interface MosaicsAssetsForTileMatrixSetsGetZxyAssetsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface MosaicsAssetsForTileMatrixSetsGetZxyAssetsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    MosaicsAssetsForTileMatrixSetsGetZxyAssetsDefaultHeaders;
}

/** The request has succeeded. */
export interface MosaicsInfoSearchGet200Response extends HttpResponse {
  status: "200";
  body: TilerStacSearchRegistrationOutput;
}

export interface MosaicsInfoSearchGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface MosaicsInfoSearchGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & MosaicsInfoSearchGetDefaultHeaders;
}

/** The request has succeeded. */
export interface MosaicsRegisterSearchRegister200Response extends HttpResponse {
  status: "200";
  body: TilerMosaicSearchRegistrationResponseOutput;
}

export interface MosaicsRegisterSearchRegisterDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface MosaicsRegisterSearchRegisterDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & MosaicsRegisterSearchRegisterDefaultHeaders;
}

/** The request has succeeded. */
export interface MosaicsTileMatrixSetsTileJsonGet200Response
  extends HttpResponse {
  status: "200";
  body: TileJsonMetaDataOutput;
}

export interface MosaicsTileMatrixSetsTileJsonGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface MosaicsTileMatrixSetsTileJsonGetDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & MosaicsTileMatrixSetsTileJsonGetDefaultHeaders;
}

export interface MosaicsTileMatrixSetsGetZxyScaleByFormat200Headers {
  /** content type */
  "content-type": "application/x-binary";
}

/** Return an image. */
export interface MosaicsTileMatrixSetsGetZxyScaleByFormat200Response
  extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & MosaicsTileMatrixSetsGetZxyScaleByFormat200Headers;
}

export interface MosaicsTileMatrixSetsGetZxyScaleByFormatDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface MosaicsTileMatrixSetsGetZxyScaleByFormatDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    MosaicsTileMatrixSetsGetZxyScaleByFormatDefaultHeaders;
}

export interface MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml200Headers {
  /** content type for WMTSCapabilitiesXmlResponse */
  "content-type": "application/xml";
}

/** Successful Response */
export interface MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml200Response
  extends HttpResponse {
  status: "200";
  body: string;
  headers: RawHttpHeaders &
    MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml200Headers;
}

export interface MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlDefaultHeaders;
}

/** Successful Response */
export interface SasGetToken200Response extends HttpResponse {
  status: "200";
  body: SharedAccessSignatureTokenOutput;
}

export interface SasGetTokenDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface SasGetTokenDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & SasGetTokenDefaultHeaders;
}

/** The request has succeeded. */
export interface SasRevokeToken200Response extends HttpResponse {
  status: "200";
}

export interface SasRevokeTokenDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface SasRevokeTokenDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & SasRevokeTokenDefaultHeaders;
}

/** Successful Response */
export interface SasGetSign200Response extends HttpResponse {
  status: "200";
  body: SignedLinkOutput;
}

export interface SasGetSignDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface SasGetSignDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & SasGetSignDefaultHeaders;
}

export interface TilerTilesGetZxyScaleByFormat200Headers {
  /** content type */
  "content-type": "application/x-binary";
}

/** Return an image. */
export interface TilerTilesGetZxyScaleByFormat200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & TilerTilesGetZxyScaleByFormat200Headers;
}

export interface TilerTilesGetZxyScaleByFormatDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerTilesGetZxyScaleByFormatDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerTilesGetZxyScaleByFormatDefaultHeaders;
}

/** The request has succeeded. */
export interface TilerTileJsonOperationsGet200Response extends HttpResponse {
  status: "200";
  body: TileJsonMetaDataOutput;
}

export interface TilerTileJsonOperationsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerTileJsonOperationsGetDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerTileJsonOperationsGetDefaultHeaders;
}

export interface TilerWmtsGetCapabilitiesXml200Headers {
  /** content type for wmts capabilities */
  "content-type": "application/xml";
}

/** Successful Response */
export interface TilerWmtsGetCapabilitiesXml200Response extends HttpResponse {
  status: "200";
  body: string;
  headers: RawHttpHeaders & TilerWmtsGetCapabilitiesXml200Headers;
}

export interface TilerWmtsGetCapabilitiesXmlDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerWmtsGetCapabilitiesXmlDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerWmtsGetCapabilitiesXmlDefaultHeaders;
}

export interface MosaicsTilesGetZxyScaleByFormat200Headers {
  /** content type */
  "content-type": "application/x-binary";
}

/** Return an image. */
export interface MosaicsTilesGetZxyScaleByFormat200Response
  extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & MosaicsTilesGetZxyScaleByFormat200Headers;
}

export interface MosaicsTilesGetZxyScaleByFormatDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface MosaicsTilesGetZxyScaleByFormatDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & MosaicsTilesGetZxyScaleByFormatDefaultHeaders;
}

/** The request has succeeded. */
export interface MosaicsTileJsonOperationsGet200Response extends HttpResponse {
  status: "200";
  body: TileJsonMetaDataOutput;
}

export interface MosaicsTileJsonOperationsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface MosaicsTileJsonOperationsGetDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & MosaicsTileJsonOperationsGetDefaultHeaders;
}

export interface MosaicsWmtsMosaicsGetCapabilitiesXml200Headers {
  /** content type for WMTSCapabilitiesXmlResponse */
  "content-type": "application/xml";
}

/** Successful Response */
export interface MosaicsWmtsMosaicsGetCapabilitiesXml200Response
  extends HttpResponse {
  status: "200";
  body: string;
  headers: RawHttpHeaders & MosaicsWmtsMosaicsGetCapabilitiesXml200Headers;
}

export interface MosaicsWmtsMosaicsGetCapabilitiesXmlDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface MosaicsWmtsMosaicsGetCapabilitiesXmlDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & MosaicsWmtsMosaicsGetCapabilitiesXmlDefaultHeaders;
}

/** Return list of assets */
export interface MosaicsAssetsForTilesGetZxyAssets200Response
  extends HttpResponse {
  status: "200";
  body: any[];
}

export interface MosaicsAssetsForTilesGetZxyAssetsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface MosaicsAssetsForTilesGetZxyAssetsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & MosaicsAssetsForTilesGetZxyAssetsDefaultHeaders;
}
