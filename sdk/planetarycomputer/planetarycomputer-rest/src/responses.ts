// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import type {
  IngestionDefinitionsPagedResponseOutput,
  IngestionDefinitionOutput,
  OperationOutput,
  ItemCollectionModelOutput,
  StacItemModelOutput,
  IngestionSourcesPagedResponseOutput,
  IngestionSourceOutput,
  ManagedIdentitiesPagedResponseOutput,
  OperationsPagedResponseOutput,
  StacCollectionModelOutput,
  UserCollectionSettingsOutput,
  MosaicOutput,
  RenderOptionModelOutput,
  TileSettingsOutput,
  PartitionTypeOutput,
  JsonSchemaOutput,
  QueryableDefinitionOutput,
  AzMapsTokenOutput,
  AzMapsClientIdOutput,
  AuthConfigOutput,
  BoundsResponseOutput,
  InfoOperationResponseOutput,
  TilerInfoGeoJsonFeatureOutput,
  AssetStatisticsResponseOutput,
  StatisticsResponseOutput,
  GeoJsonStatisticsItemCollectionResponseOutput,
  TileJsonResponseOutput,
  TitilerCoreModelsResponsesPointOutput,
  IntervalLegendsElementOutput,
  ClassmapLegendResponseOutput,
  RegisterResponseOutput,
  TitilerPgstacModelInfoOutput,
  TileMatrixSetOutput,
  SasTokenOutput,
  UnsignedLinkOutput,
  FeatureCollectionsOutput,
  LandingPageOutput,
  ConformanceClassesOutput,
  IngestionRunsPagedResponseOutput,
  IngestionRunOutput,
} from "./outputModels.js";

/** The request has succeeded. */
export interface IngestionsListAll200Response extends HttpResponse {
  status: "200";
  body: IngestionDefinitionsPagedResponseOutput;
}

export interface IngestionsListAllDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionsListAllDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionsListAllDefaultHeaders;
}

/** The request has succeeded. */
export interface IngestionsGet200Response extends HttpResponse {
  status: "200";
  body: IngestionDefinitionOutput;
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
  body: IngestionDefinitionOutput;
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
  body: IngestionDefinitionOutput;
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
export interface StacItemsGetFeatures200Response extends HttpResponse {
  status: "200";
  body: ItemCollectionModelOutput;
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
  body: StacItemModelOutput;
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
export interface IngestionSourcesListAll200Response extends HttpResponse {
  status: "200";
  body: IngestionSourcesPagedResponseOutput;
}

export interface IngestionSourcesListAllDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionSourcesListAllDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionSourcesListAllDefaultHeaders;
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
  body: ManagedIdentitiesPagedResponseOutput;
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

/** The request has succeeded. */
export interface IngestionOperationsListAll200Response extends HttpResponse {
  status: "200";
  body: OperationsPagedResponseOutput;
}

export interface IngestionOperationsListAllDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionOperationsListAllDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionOperationsListAllDefaultHeaders;
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
export interface StacCollectionAssetsCreate200Response extends HttpResponse {
  status: "200";
  body: StacCollectionModelOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface StacCollectionAssetsCreate201Response extends HttpResponse {
  status: "201";
  body: StacCollectionModelOutput;
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
  body: StacCollectionModelOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface StacCollectionAssetsCreateOrReplace201Response
  extends HttpResponse {
  status: "201";
  body: StacCollectionModelOutput;
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

/** There is no content to send for this request, but the headers may be useful. */
export interface StacCollectionAssetsDelete204Response extends HttpResponse {
  status: "204";
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

/** There is no content to send for this request, but the headers may be useful. */
export interface StacCollectionThumbnailsGet204Response extends HttpResponse {
  status: "204";
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
  body: Array<MosaicOutput>;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface StacCollectionMosaicsGetAll204Response extends HttpResponse {
  status: "204";
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
  body: MosaicOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface StacCollectionMosaicsAdd201Response extends HttpResponse {
  status: "201";
  body: MosaicOutput;
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
  body: MosaicOutput;
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
  body: MosaicOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface StacCollectionMosaicsCreateOrReplace201Response
  extends HttpResponse {
  status: "201";
  body: MosaicOutput;
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

/** There is no content to send for this request, but the headers may be useful. */
export interface StacCollectionMosaicsDelete204Response extends HttpResponse {
  status: "204";
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
export interface StacCollectionRenderOptionsGetAll200Response
  extends HttpResponse {
  status: "200";
  body: Array<RenderOptionModelOutput>;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface StacCollectionRenderOptionsGetAll204Response
  extends HttpResponse {
  status: "204";
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
  body: RenderOptionModelOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface StacCollectionRenderOptionsCreate201Response
  extends HttpResponse {
  status: "201";
  body: RenderOptionModelOutput;
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
  body: Array<RenderOptionModelOutput>;
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
  body: RenderOptionModelOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface StacCollectionRenderOptionsCreateOrReplace201Response
  extends HttpResponse {
  status: "201";
  body: RenderOptionModelOutput;
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

/** There is no content to send for this request, but the headers may be useful. */
export interface StacCollectionRenderOptionsDelete204Response
  extends HttpResponse {
  status: "204";
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

/** The request has succeeded. */
export interface StacCollectionTileSettingsGetAll200Response
  extends HttpResponse {
  status: "200";
  body: TileSettingsOutput;
}

export interface StacCollectionTileSettingsGetAllDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionTileSettingsGetAllDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionTileSettingsGetAllDefaultHeaders;
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
  body: PartitionTypeOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface StacCollectionPartitionTypesReplace204Response
  extends HttpResponse {
  status: "204";
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
export interface StacQueryablesGetAll200Response extends HttpResponse {
  status: "200";
  body: JsonSchemaOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface StacQueryablesGetAll204Response extends HttpResponse {
  status: "204";
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

/** There is no content to send for this request, but the headers may be useful. */
export interface StacQueryablesDelete204Response extends HttpResponse {
  status: "204";
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
  body: JsonSchemaOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface StacQueryablesGetAllByCollection204Response
  extends HttpResponse {
  status: "204";
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
  body: Array<QueryableDefinitionOutput>;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface StacQueryablesCreate204Response extends HttpResponse {
  status: "204";
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
  body: QueryableDefinitionOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface StacQueryablesCreateOrReplace201Response extends HttpResponse {
  status: "201";
  body: QueryableDefinitionOutput;
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
export interface GeoCatalogAzmapsTokenGet200Response extends HttpResponse {
  status: "200";
  body: AzMapsTokenOutput;
}

export interface GeoCatalogAzmapsTokenGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GeoCatalogAzmapsTokenGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GeoCatalogAzmapsTokenGetDefaultHeaders;
}

/** The request has succeeded. */
export interface GeoCatalogAzmapsClientGetId200Response extends HttpResponse {
  status: "200";
  body: AzMapsClientIdOutput;
}

export interface GeoCatalogAzmapsClientGetIdDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GeoCatalogAzmapsClientGetIdDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GeoCatalogAzmapsClientGetIdDefaultHeaders;
}

/** The request has succeeded. */
export interface GeoCatalogAuthConfigOperationsGet200Response
  extends HttpResponse {
  status: "200";
  body: AuthConfigOutput;
}

export interface GeoCatalogAuthConfigOperationsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GeoCatalogAuthConfigOperationsGetDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GeoCatalogAuthConfigOperationsGetDefaultHeaders;
}

export interface TilerStaticImagesCreate200Headers {
  /** content type */
  "content-type": "application/x-binary";
}

/** Return an image. */
export interface TilerStaticImagesCreate200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & TilerStaticImagesCreate200Headers;
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

/** There is no content to send for this request, but the headers may be useful. */
export interface TilerStaticImagesGet204Response extends HttpResponse {
  status: "204";
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
export interface TilerBoundGetAll200Response extends HttpResponse {
  status: "200";
  body: BoundsResponseOutput;
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

/** Return a list of supported assets. */
export interface TilerAvailableAssetsGetAll200Response extends HttpResponse {
  status: "200";
  body: string[];
}

/** There is no content to send for this request, but the headers may be useful. */
export interface TilerAvailableAssetsGetAll204Response extends HttpResponse {
  status: "204";
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

/** Return dataset's statistics. */
export interface TilerAssetStatisticsGetAll200Response extends HttpResponse {
  status: "200";
  body: AssetStatisticsResponseOutput;
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
export interface TilerGeoJsonStatisticsGetAll200Response extends HttpResponse {
  status: "200";
  body: GeoJsonStatisticsItemCollectionResponseOutput;
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

export interface TilerTilesGetZxyScalexFormat200Headers {
  /** content type */
  "content-type": "application/x-binary";
}

/** Return an image. */
export interface TilerTilesGetZxyScalexFormat200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & TilerTilesGetZxyScalexFormat200Headers;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface TilerTilesGetZxyScalexFormat204Response extends HttpResponse {
  status: "204";
}

export interface TilerTilesGetZxyScalexFormatDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerTilesGetZxyScalexFormatDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerTilesGetZxyScalexFormatDefaultHeaders;
}

export interface TilerTileMatrixSetsGetZxyScalexFormat200Headers {
  /** content type */
  "content-type": "application/x-binary";
}

/** Return an image. */
export interface TilerTileMatrixSetsGetZxyScalexFormat200Response
  extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & TilerTileMatrixSetsGetZxyScalexFormat200Headers;
}

export interface TilerTileMatrixSetsGetZxyScalexFormatDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerTileMatrixSetsGetZxyScalexFormatDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerTileMatrixSetsGetZxyScalexFormatDefaultHeaders;
}

/** The request has succeeded. */
export interface TilerTileJsonOperationsGet200Response extends HttpResponse {
  status: "200";
  body: TileJsonResponseOutput;
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

/** The request has succeeded. */
export interface TilerTileJsonTileMatrixSetsGet200Response
  extends HttpResponse {
  status: "200";
  body: TileJsonResponseOutput;
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

/** There is no content to send for this request, but the headers may be useful. */
export interface TilerWmtsGetCapabilitiesXml204Response extends HttpResponse {
  status: "204";
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
export interface TilerPointsGetLonLat200Response extends HttpResponse {
  status: "200";
  body: TitilerCoreModelsResponsesPointOutput;
}

export interface TilerPointsGetLonLatDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerPointsGetLonLatDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerPointsGetLonLatDefaultHeaders;
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

export interface TilerPartsGetMinxMinyMaxxMaxyWidthxHeightFormat200Headers {
  /** content type */
  "content-type": "application/x-binary";
}

/** Return an image. */
export interface TilerPartsGetMinxMinyMaxxMaxyWidthxHeightFormat200Response
  extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders &
    TilerPartsGetMinxMinyMaxxMaxyWidthxHeightFormat200Headers;
}

export interface TilerPartsGetMinxMinyMaxxMaxyWidthxHeightFormatDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerPartsGetMinxMinyMaxxMaxyWidthxHeightFormatDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    TilerPartsGetMinxMinyMaxxMaxyWidthxHeightFormatDefaultHeaders;
}

export interface TilerPartsGetMinxMinyMaxxMaxyFormat200Headers {
  /** content type */
  "content-type": "application/x-binary";
}

/** Return an image. */
export interface TilerPartsGetMinxMinyMaxxMaxyFormat200Response
  extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & TilerPartsGetMinxMinyMaxxMaxyFormat200Headers;
}

export interface TilerPartsGetMinxMinyMaxxMaxyFormatDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerPartsGetMinxMinyMaxxMaxyFormatDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerPartsGetMinxMinyMaxxMaxyFormatDefaultHeaders;
}

export interface TilerGeoJsonsCropWidthxHeightFormat200Headers {
  /** content type */
  "content-type": "application/x-binary";
}

/** Return an image. */
export interface TilerGeoJsonsCropWidthxHeightFormat200Response
  extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & TilerGeoJsonsCropWidthxHeightFormat200Headers;
}

export interface TilerGeoJsonsCropWidthxHeightFormatDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TilerGeoJsonsCropWidthxHeightFormatDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TilerGeoJsonsCropWidthxHeightFormatDefaultHeaders;
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

export interface MapsIntervalLegendsGetByClassmapName200Headers {
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
export interface MapsIntervalLegendsGetByClassmapName200Response
  extends HttpResponse {
  status: "200";
  body: Array<IntervalLegendsElementOutput>[];
  headers: RawHttpHeaders & MapsIntervalLegendsGetByClassmapName200Headers;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface MapsIntervalLegendsGetByClassmapName204Response
  extends HttpResponse {
  status: "204";
}

export interface MapsIntervalLegendsGetByClassmapNameDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface MapsIntervalLegendsGetByClassmapNameDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & MapsIntervalLegendsGetByClassmapNameDefaultHeaders;
}

/** The request has succeeded. */
export interface MapsClassmapLegendsGet200Response extends HttpResponse {
  status: "200";
  body: ClassmapLegendResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface MapsClassmapLegendsGet204Response extends HttpResponse {
  status: "204";
}

export interface MapsClassmapLegendsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface MapsClassmapLegendsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & MapsClassmapLegendsGetDefaultHeaders;
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

/** There is no content to send for this request, but the headers may be useful. */
export interface MapsLegendsGet204Response extends HttpResponse {
  status: "204";
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

export interface MosaicsTilesGetZxyScalexFormat200Headers {
  /** content type */
  "content-type": "application/x-binary";
}

/** Return an image. */
export interface MosaicsTilesGetZxyScalexFormat200Response
  extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & MosaicsTilesGetZxyScalexFormat200Headers;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface MosaicsTilesGetZxyScalexFormat204Response
  extends HttpResponse {
  status: "204";
}

export interface MosaicsTilesGetZxyScalexFormatDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface MosaicsTilesGetZxyScalexFormatDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & MosaicsTilesGetZxyScalexFormatDefaultHeaders;
}

export interface MosaicsTileMatrixSetsGetZxyScalexFormat200Headers {
  /** content type */
  "content-type": "application/x-binary";
}

/** Return an image. */
export interface MosaicsTileMatrixSetsGetZxyScalexFormat200Response
  extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & MosaicsTileMatrixSetsGetZxyScalexFormat200Headers;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface MosaicsTileMatrixSetsGetZxyScalexFormat204Response
  extends HttpResponse {
  status: "204";
}

export interface MosaicsTileMatrixSetsGetZxyScalexFormatDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface MosaicsTileMatrixSetsGetZxyScalexFormatDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    MosaicsTileMatrixSetsGetZxyScalexFormatDefaultHeaders;
}

/** The request has succeeded. */
export interface MosaicsTileJsonOperationsGet200Response extends HttpResponse {
  status: "200";
  body: TileJsonResponseOutput;
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

/** The request has succeeded. */
export interface MosaicsTileMatrixSetsTileJsonGet200Response
  extends HttpResponse {
  status: "200";
  body: TileJsonResponseOutput;
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

/** There is no content to send for this request, but the headers may be useful. */
export interface MosaicsWmtsMosaicsGetCapabilitiesXml204Response
  extends HttpResponse {
  status: "204";
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

/** There is no content to send for this request, but the headers may be useful. */
export interface MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml204Response
  extends HttpResponse {
  status: "204";
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

/** The request has succeeded. */
export interface MosaicsRegisterSearchRegister200Response extends HttpResponse {
  status: "200";
  body: RegisterResponseOutput;
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
export interface MosaicsInfoSearchGet200Response extends HttpResponse {
  status: "200";
  body: TitilerPgstacModelInfoOutput;
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

/** Return list of assets */
export interface MosaicsAssetsForTilesGetZxyAssets200Response
  extends HttpResponse {
  status: "200";
  body: any[];
}

/** There is no content to send for this request, but the headers may be useful. */
export interface MosaicsAssetsForTilesGetZxyAssets204Response
  extends HttpResponse {
  status: "204";
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

/** Return list of assets */
export interface MosaicsAssetsForTileMatrixSetsGetZxyAssets200Response
  extends HttpResponse {
  status: "200";
  body: any[];
}

/** There is no content to send for this request, but the headers may be useful. */
export interface MosaicsAssetsForTileMatrixSetsGetZxyAssets204Response
  extends HttpResponse {
  status: "204";
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

/** Return list of assets */
export interface MosaicsAssetsForPointsGetLonLatAssets200Response
  extends HttpResponse {
  status: "200";
  body: any[];
}

/** There is no content to send for this request, but the headers may be useful. */
export interface MosaicsAssetsForPointsGetLonLatAssets204Response
  extends HttpResponse {
  status: "204";
}

export interface MosaicsAssetsForPointsGetLonLatAssetsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface MosaicsAssetsForPointsGetLonLatAssetsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & MosaicsAssetsForPointsGetLonLatAssetsDefaultHeaders;
}

/** The request has succeeded. */
export interface TileMatrixListGet200Response extends HttpResponse {
  status: "200";
  body: string[];
}

/** There is no content to send for this request, but the headers may be useful. */
export interface TileMatrixListGet204Response extends HttpResponse {
  status: "204";
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

/** Successful Response */
export interface SasGetToken200Response extends HttpResponse {
  status: "200";
  body: SasTokenOutput;
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
  body: UnsignedLinkOutput;
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

/** The request has succeeded. */
export interface StacCollectionOperationsGetAll200Response
  extends HttpResponse {
  status: "200";
  body: FeatureCollectionsOutput;
}

export interface StacCollectionOperationsGetAllDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionOperationsGetAllDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionOperationsGetAllDefaultHeaders;
}

export interface StacCollectionOperationsCreate202Headers {
  /** Url used to monitor the background operation */
  location: string;
  /** Url used to monitor the background operation */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface StacCollectionOperationsCreate202Response
  extends HttpResponse {
  status: "202";
  body: OperationOutput;
  headers: RawHttpHeaders & StacCollectionOperationsCreate202Headers;
}

export interface StacCollectionOperationsCreateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionOperationsCreateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionOperationsCreateDefaultHeaders;
}

/** The final response for long-running create operation */
export interface StacCollectionOperationsCreateLogicalResponse
  extends HttpResponse {
  status: "200";
  body: OperationOutput;
}

/** The request has succeeded. */
export interface StacCollectionOperationsGet200Response extends HttpResponse {
  status: "200";
  body: StacCollectionModelOutput;
}

export interface StacCollectionOperationsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionOperationsGetDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionOperationsGetDefaultHeaders;
}

export interface StacCollectionOperationsCreateOrReplace202Headers {
  /** Url used to monitor the background operation */
  location: string;
  /** Url used to monitor the background operation */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface StacCollectionOperationsCreateOrReplace202Response
  extends HttpResponse {
  status: "202";
  body: OperationOutput;
  headers: RawHttpHeaders & StacCollectionOperationsCreateOrReplace202Headers;
}

export interface StacCollectionOperationsCreateOrReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionOperationsCreateOrReplaceDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    StacCollectionOperationsCreateOrReplaceDefaultHeaders;
}

/** The final response for long-running createOrReplace operation */
export interface StacCollectionOperationsCreateOrReplaceLogicalResponse
  extends HttpResponse {
  status: "200";
  body: OperationOutput;
}

export interface StacCollectionOperationsDelete202Headers {
  /** Url used to monitor the background operation */
  location: string;
  /** Url used to monitor the background operation */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface StacCollectionOperationsDelete202Response
  extends HttpResponse {
  status: "202";
  body: OperationOutput;
  headers: RawHttpHeaders & StacCollectionOperationsDelete202Headers;
}

export interface StacCollectionOperationsDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacCollectionOperationsDeleteDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacCollectionOperationsDeleteDefaultHeaders;
}

/** The final response for long-running delete operation */
export interface StacCollectionOperationsDeleteLogicalResponse
  extends HttpResponse {
  status: "200";
  body: OperationOutput;
}

/** The request has succeeded. */
export interface StacSearchOperationsGet200Response extends HttpResponse {
  status: "200";
  body: ItemCollectionModelOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface StacSearchOperationsGet204Response extends HttpResponse {
  status: "204";
}

export interface StacSearchOperationsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacSearchOperationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacSearchOperationsGetDefaultHeaders;
}

/** The request has succeeded. */
export interface StacSearchOperationsCreate200Response extends HttpResponse {
  status: "200";
  body: ItemCollectionModelOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface StacSearchOperationsCreate204Response extends HttpResponse {
  status: "204";
}

export interface StacSearchOperationsCreateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StacSearchOperationsCreateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StacSearchOperationsCreateDefaultHeaders;
}

/** The request has succeeded. */
export interface StacLandingPagesGet200Response extends HttpResponse {
  status: "200";
  body: LandingPageOutput;
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
export interface StacConformanceClassGet200Response extends HttpResponse {
  status: "200";
  body: ConformanceClassesOutput;
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
export interface IngestionsIngestionRunsListAll200Response
  extends HttpResponse {
  status: "200";
  body: IngestionRunsPagedResponseOutput;
}

export interface IngestionsIngestionRunsListAllDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionsIngestionRunsListAllDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionsIngestionRunsListAllDefaultHeaders;
}

/** The request has succeeded. */
export interface IngestionsIngestionRunsGet200Response extends HttpResponse {
  status: "200";
  body: IngestionRunOutput;
}

export interface IngestionsIngestionRunsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionsIngestionRunsGetDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionsIngestionRunsGetDefaultHeaders;
}

export interface IngestionsIngestionRunsCreate201Headers {
  /** Url of the created ingestion run */
  location: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface IngestionsIngestionRunsCreate201Response extends HttpResponse {
  status: "201";
  body: IngestionRunOutput;
  headers: RawHttpHeaders & IngestionsIngestionRunsCreate201Headers;
}

export interface IngestionsIngestionRunsCreateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IngestionsIngestionRunsCreateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & IngestionsIngestionRunsCreateDefaultHeaders;
}
