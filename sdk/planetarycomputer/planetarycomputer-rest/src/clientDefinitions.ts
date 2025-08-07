// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  IngestionsListAllParameters,
  IngestionsCreateParameters,
  IngestionsGetParameters,
  IngestionsUpdateParameters,
  IngestionsDeleteParameters,
  StacItemsGetFeaturesParameters,
  StacItemsCreateParameters,
  StacItemsGetParameters,
  StacItemsCreateOrReplaceParameters,
  StacItemsUpdateParameters,
  StacItemsDeleteParameters,
  IngestionSourcesListAllParameters,
  IngestionSourcesCreateParameters,
  IngestionSourcesGetParameters,
  IngestionSourcesCreateOrReplaceParameters,
  IngestionSourcesDeleteParameters,
  IngestionSourcesListManagedIdentitiesParameters,
  IngestionOperationsGetParameters,
  IngestionOperationsDeleteParameters,
  IngestionOperationsListAllParameters,
  IngestionOperationsDeleteAllParameters,
  StacLandingPagesGetParameters,
  StacCollectionOperationsGetAllParameters,
  StacCollectionOperationsCreateParameters,
  StacCollectionOperationsGetParameters,
  StacCollectionOperationsCreateOrReplaceParameters,
  StacCollectionOperationsDeleteParameters,
  StacQueryablesGetAllParameters,
  StacQueryablesDeleteParameters,
  StacQueryablesCreateOrReplaceParameters,
  StacQueryablesGetAllByCollectionParameters,
  StacQueryablesCreateParameters,
  StacConformanceClassGetParameters,
  StacSearchOperationsGetParameters,
  StacSearchOperationsCreateParameters,
  StacCollectionAssetsCreateParameters,
  StacCollectionAssetsCreateOrReplaceParameters,
  StacCollectionAssetsDeleteParameters,
  StacCollectionConfigGetParameters,
  StacCollectionMosaicsGetAllParameters,
  StacCollectionMosaicsAddParameters,
  StacCollectionMosaicsGetParameters,
  StacCollectionMosaicsCreateOrReplaceParameters,
  StacCollectionMosaicsDeleteParameters,
  StacCollectionPartitionTypesGetParameters,
  StacCollectionPartitionTypesReplaceParameters,
  StacCollectionRenderOptionsGetAllParameters,
  StacCollectionRenderOptionsCreateParameters,
  StacCollectionRenderOptionsGetParameters,
  StacCollectionRenderOptionsCreateOrReplaceParameters,
  StacCollectionRenderOptionsDeleteParameters,
  StacCollectionTileSettingsGetAllParameters,
  StacCollectionTileSettingsReplaceParameters,
  StacCollectionThumbnailsGetParameters,
  GeoCatalogAuthConfigOperationsGetParameters,
  GeoCatalogAzmapsClientGetIdParameters,
  GeoCatalogAzmapsTokenGetParameters,
  TilerStaticImagesCreateParameters,
  TilerStaticImagesGetParameters,
  TilerBoundGetAllParameters,
  TilerInfoOperationsGetParameters,
  TilerInfoGeoJsonOperationsGetParameters,
  TilerAvailableAssetsGetAllParameters,
  TilerAssetStatisticsGetAllParameters,
  TilerStatisticsGetAllParameters,
  TilerGeoJsonStatisticsGetAllParameters,
  TilerTilesGetZxyScalexFormatParameters,
  TilerTileMatrixSetsGetZxyScalexFormatParameters,
  TilerTileJsonOperationsGetParameters,
  TilerTileJsonTileMatrixSetsGetParameters,
  TilerWmtsGetCapabilitiesXmlParameters,
  TilerWmtsTileMatrixSetsGetCapabilitiesXmlParameters,
  TilerPointsGetLonLatParameters,
  TilerPreviewsGetFormatParameters,
  TilerPreviewsGetParameters,
  TilerPartsGetMinxMinyMaxxMaxyWidthxHeightFormatParameters,
  TilerPartsGetMinxMinyMaxxMaxyFormatParameters,
  TilerGeoJsonsCropWidthxHeightFormatParameters,
  TilerGeoJsonsCropFormatParameters,
  MapsClassmapLegendsGetParameters,
  MapsLegendsGetParameters,
  MapsIntervalLegendsGetByClassmapNameParameters,
  MosaicsTilesGetZxyScalexFormatParameters,
  MosaicsTileMatrixSetsGetZxyScalexFormatParameters,
  MosaicsTileJsonOperationsGetParameters,
  MosaicsTileMatrixSetsTileJsonGetParameters,
  MosaicsWmtsMosaicsGetCapabilitiesXmlParameters,
  MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlParameters,
  MosaicsRegisterSearchRegisterParameters,
  MosaicsInfoSearchGetParameters,
  MosaicsAssetsForTilesGetZxyAssetsParameters,
  MosaicsAssetsForTileMatrixSetsGetZxyAssetsParameters,
  MosaicsAssetsForPointsGetLonLatAssetsParameters,
  TileMatrixListGetParameters,
  TileMatrixDefinitionsGetParameters,
  SasGetTokenParameters,
  SasRevokeTokenParameters,
  SasGetSignParameters,
  IngestionsIngestionRunsListAllParameters,
  IngestionsIngestionRunsCreateParameters,
  IngestionsIngestionRunsGetParameters,
} from "./parameters.js";
import type {
  IngestionsListAll200Response,
  IngestionsListAllDefaultResponse,
  IngestionsCreate201Response,
  IngestionsCreateDefaultResponse,
  IngestionsGet200Response,
  IngestionsGetDefaultResponse,
  IngestionsUpdate200Response,
  IngestionsUpdateDefaultResponse,
  IngestionsDelete202Response,
  IngestionsDeleteDefaultResponse,
  StacItemsGetFeatures200Response,
  StacItemsGetFeaturesDefaultResponse,
  StacItemsCreate202Response,
  StacItemsCreateDefaultResponse,
  StacItemsGet200Response,
  StacItemsGetDefaultResponse,
  StacItemsCreateOrReplace202Response,
  StacItemsCreateOrReplaceDefaultResponse,
  StacItemsUpdate202Response,
  StacItemsUpdateDefaultResponse,
  StacItemsDelete202Response,
  StacItemsDeleteDefaultResponse,
  IngestionSourcesListAll200Response,
  IngestionSourcesListAllDefaultResponse,
  IngestionSourcesCreate201Response,
  IngestionSourcesCreateDefaultResponse,
  IngestionSourcesGet200Response,
  IngestionSourcesGetDefaultResponse,
  IngestionSourcesCreateOrReplace200Response,
  IngestionSourcesCreateOrReplace201Response,
  IngestionSourcesCreateOrReplaceDefaultResponse,
  IngestionSourcesDelete204Response,
  IngestionSourcesDeleteDefaultResponse,
  IngestionSourcesListManagedIdentities200Response,
  IngestionSourcesListManagedIdentitiesDefaultResponse,
  IngestionOperationsGet200Response,
  IngestionOperationsGetDefaultResponse,
  IngestionOperationsDelete204Response,
  IngestionOperationsDeleteDefaultResponse,
  IngestionOperationsListAll200Response,
  IngestionOperationsListAllDefaultResponse,
  IngestionOperationsDeleteAll204Response,
  IngestionOperationsDeleteAllDefaultResponse,
  StacLandingPagesGet200Response,
  StacLandingPagesGetDefaultResponse,
  StacCollectionOperationsGetAll200Response,
  StacCollectionOperationsGetAllDefaultResponse,
  StacCollectionOperationsCreate202Response,
  StacCollectionOperationsCreateDefaultResponse,
  StacCollectionOperationsGet200Response,
  StacCollectionOperationsGetDefaultResponse,
  StacCollectionOperationsCreateOrReplace202Response,
  StacCollectionOperationsCreateOrReplaceDefaultResponse,
  StacCollectionOperationsDelete202Response,
  StacCollectionOperationsDeleteDefaultResponse,
  StacQueryablesGetAll200Response,
  StacQueryablesGetAll204Response,
  StacQueryablesGetAllDefaultResponse,
  StacQueryablesDelete200Response,
  StacQueryablesDelete204Response,
  StacQueryablesDeleteDefaultResponse,
  StacQueryablesCreateOrReplace200Response,
  StacQueryablesCreateOrReplace201Response,
  StacQueryablesCreateOrReplaceDefaultResponse,
  StacQueryablesGetAllByCollection200Response,
  StacQueryablesGetAllByCollection204Response,
  StacQueryablesGetAllByCollectionDefaultResponse,
  StacQueryablesCreate201Response,
  StacQueryablesCreate204Response,
  StacQueryablesCreateDefaultResponse,
  StacConformanceClassGet200Response,
  StacConformanceClassGetDefaultResponse,
  StacSearchOperationsGet200Response,
  StacSearchOperationsGet204Response,
  StacSearchOperationsGetDefaultResponse,
  StacSearchOperationsCreate200Response,
  StacSearchOperationsCreate204Response,
  StacSearchOperationsCreateDefaultResponse,
  StacCollectionAssetsCreate200Response,
  StacCollectionAssetsCreate201Response,
  StacCollectionAssetsCreateDefaultResponse,
  StacCollectionAssetsCreateOrReplace200Response,
  StacCollectionAssetsCreateOrReplace201Response,
  StacCollectionAssetsCreateOrReplaceDefaultResponse,
  StacCollectionAssetsDelete200Response,
  StacCollectionAssetsDelete204Response,
  StacCollectionAssetsDeleteDefaultResponse,
  StacCollectionConfigGet200Response,
  StacCollectionConfigGetDefaultResponse,
  StacCollectionMosaicsGetAll200Response,
  StacCollectionMosaicsGetAll204Response,
  StacCollectionMosaicsGetAllDefaultResponse,
  StacCollectionMosaicsAdd200Response,
  StacCollectionMosaicsAdd201Response,
  StacCollectionMosaicsAddDefaultResponse,
  StacCollectionMosaicsGet200Response,
  StacCollectionMosaicsGetDefaultResponse,
  StacCollectionMosaicsCreateOrReplace200Response,
  StacCollectionMosaicsCreateOrReplace201Response,
  StacCollectionMosaicsCreateOrReplaceDefaultResponse,
  StacCollectionMosaicsDelete200Response,
  StacCollectionMosaicsDelete204Response,
  StacCollectionMosaicsDeleteDefaultResponse,
  StacCollectionPartitionTypesGet200Response,
  StacCollectionPartitionTypesGetDefaultResponse,
  StacCollectionPartitionTypesReplace200Response,
  StacCollectionPartitionTypesReplace204Response,
  StacCollectionPartitionTypesReplaceDefaultResponse,
  StacCollectionRenderOptionsGetAll200Response,
  StacCollectionRenderOptionsGetAll204Response,
  StacCollectionRenderOptionsGetAllDefaultResponse,
  StacCollectionRenderOptionsCreate200Response,
  StacCollectionRenderOptionsCreate201Response,
  StacCollectionRenderOptionsCreateDefaultResponse,
  StacCollectionRenderOptionsGet200Response,
  StacCollectionRenderOptionsGetDefaultResponse,
  StacCollectionRenderOptionsCreateOrReplace200Response,
  StacCollectionRenderOptionsCreateOrReplace201Response,
  StacCollectionRenderOptionsCreateOrReplaceDefaultResponse,
  StacCollectionRenderOptionsDelete200Response,
  StacCollectionRenderOptionsDelete204Response,
  StacCollectionRenderOptionsDeleteDefaultResponse,
  StacCollectionTileSettingsGetAll200Response,
  StacCollectionTileSettingsGetAllDefaultResponse,
  StacCollectionTileSettingsReplace200Response,
  StacCollectionTileSettingsReplaceDefaultResponse,
  StacCollectionThumbnailsGet200Response,
  StacCollectionThumbnailsGet204Response,
  StacCollectionThumbnailsGetDefaultResponse,
  GeoCatalogAuthConfigOperationsGet200Response,
  GeoCatalogAuthConfigOperationsGetDefaultResponse,
  GeoCatalogAzmapsClientGetId200Response,
  GeoCatalogAzmapsClientGetIdDefaultResponse,
  GeoCatalogAzmapsTokenGet200Response,
  GeoCatalogAzmapsTokenGetDefaultResponse,
  TilerStaticImagesCreate200Response,
  TilerStaticImagesCreateDefaultResponse,
  TilerStaticImagesGet200Response,
  TilerStaticImagesGet204Response,
  TilerStaticImagesGetDefaultResponse,
  TilerBoundGetAll200Response,
  TilerBoundGetAllDefaultResponse,
  TilerInfoOperationsGet200Response,
  TilerInfoOperationsGetDefaultResponse,
  TilerInfoGeoJsonOperationsGet200Response,
  TilerInfoGeoJsonOperationsGetDefaultResponse,
  TilerAvailableAssetsGetAll200Response,
  TilerAvailableAssetsGetAll204Response,
  TilerAvailableAssetsGetAllDefaultResponse,
  TilerAssetStatisticsGetAll200Response,
  TilerAssetStatisticsGetAllDefaultResponse,
  TilerStatisticsGetAll200Response,
  TilerStatisticsGetAllDefaultResponse,
  TilerGeoJsonStatisticsGetAll200Response,
  TilerGeoJsonStatisticsGetAllDefaultResponse,
  TilerTilesGetZxyScalexFormat200Response,
  TilerTilesGetZxyScalexFormat204Response,
  TilerTilesGetZxyScalexFormatDefaultResponse,
  TilerTileMatrixSetsGetZxyScalexFormat200Response,
  TilerTileMatrixSetsGetZxyScalexFormatDefaultResponse,
  TilerTileJsonOperationsGet200Response,
  TilerTileJsonOperationsGetDefaultResponse,
  TilerTileJsonTileMatrixSetsGet200Response,
  TilerTileJsonTileMatrixSetsGetDefaultResponse,
  TilerWmtsGetCapabilitiesXml200Response,
  TilerWmtsGetCapabilitiesXml204Response,
  TilerWmtsGetCapabilitiesXmlDefaultResponse,
  TilerWmtsTileMatrixSetsGetCapabilitiesXml200Response,
  TilerWmtsTileMatrixSetsGetCapabilitiesXmlDefaultResponse,
  TilerPointsGetLonLat200Response,
  TilerPointsGetLonLatDefaultResponse,
  TilerPreviewsGetFormat200Response,
  TilerPreviewsGetFormatDefaultResponse,
  TilerPreviewsGet200Response,
  TilerPreviewsGetDefaultResponse,
  TilerPartsGetMinxMinyMaxxMaxyWidthxHeightFormat200Response,
  TilerPartsGetMinxMinyMaxxMaxyWidthxHeightFormatDefaultResponse,
  TilerPartsGetMinxMinyMaxxMaxyFormat200Response,
  TilerPartsGetMinxMinyMaxxMaxyFormatDefaultResponse,
  TilerGeoJsonsCropWidthxHeightFormat200Response,
  TilerGeoJsonsCropWidthxHeightFormatDefaultResponse,
  TilerGeoJsonsCropFormat200Response,
  TilerGeoJsonsCropFormatDefaultResponse,
  MapsClassmapLegendsGet200Response,
  MapsClassmapLegendsGet204Response,
  MapsClassmapLegendsGetDefaultResponse,
  MapsLegendsGet200Response,
  MapsLegendsGet204Response,
  MapsLegendsGetDefaultResponse,
  MapsIntervalLegendsGetByClassmapName200Response,
  MapsIntervalLegendsGetByClassmapName204Response,
  MapsIntervalLegendsGetByClassmapNameDefaultResponse,
  MosaicsTilesGetZxyScalexFormat200Response,
  MosaicsTilesGetZxyScalexFormat204Response,
  MosaicsTilesGetZxyScalexFormatDefaultResponse,
  MosaicsTileMatrixSetsGetZxyScalexFormat200Response,
  MosaicsTileMatrixSetsGetZxyScalexFormat204Response,
  MosaicsTileMatrixSetsGetZxyScalexFormatDefaultResponse,
  MosaicsTileJsonOperationsGet200Response,
  MosaicsTileJsonOperationsGetDefaultResponse,
  MosaicsTileMatrixSetsTileJsonGet200Response,
  MosaicsTileMatrixSetsTileJsonGetDefaultResponse,
  MosaicsWmtsMosaicsGetCapabilitiesXml200Response,
  MosaicsWmtsMosaicsGetCapabilitiesXml204Response,
  MosaicsWmtsMosaicsGetCapabilitiesXmlDefaultResponse,
  MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml200Response,
  MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml204Response,
  MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlDefaultResponse,
  MosaicsRegisterSearchRegister200Response,
  MosaicsRegisterSearchRegisterDefaultResponse,
  MosaicsInfoSearchGet200Response,
  MosaicsInfoSearchGetDefaultResponse,
  MosaicsAssetsForTilesGetZxyAssets200Response,
  MosaicsAssetsForTilesGetZxyAssets204Response,
  MosaicsAssetsForTilesGetZxyAssetsDefaultResponse,
  MosaicsAssetsForTileMatrixSetsGetZxyAssets200Response,
  MosaicsAssetsForTileMatrixSetsGetZxyAssets204Response,
  MosaicsAssetsForTileMatrixSetsGetZxyAssetsDefaultResponse,
  MosaicsAssetsForPointsGetLonLatAssets200Response,
  MosaicsAssetsForPointsGetLonLatAssets204Response,
  MosaicsAssetsForPointsGetLonLatAssetsDefaultResponse,
  TileMatrixListGet200Response,
  TileMatrixListGet204Response,
  TileMatrixListGetDefaultResponse,
  TileMatrixDefinitionsGet200Response,
  TileMatrixDefinitionsGetDefaultResponse,
  SasGetToken200Response,
  SasGetTokenDefaultResponse,
  SasRevokeToken200Response,
  SasRevokeTokenDefaultResponse,
  SasGetSign200Response,
  SasGetSignDefaultResponse,
  IngestionsIngestionRunsListAll200Response,
  IngestionsIngestionRunsListAllDefaultResponse,
  IngestionsIngestionRunsCreate201Response,
  IngestionsIngestionRunsCreateDefaultResponse,
  IngestionsIngestionRunsGet200Response,
  IngestionsIngestionRunsGetDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface IngestionsListAll {
  /** Get ingestions of a catalog */
  get(
    options?: IngestionsListAllParameters,
  ): StreamableMethod<
    IngestionsListAll200Response | IngestionsListAllDefaultResponse
  >;
  /** Create a new ingestion */
  post(
    options: IngestionsCreateParameters,
  ): StreamableMethod<
    IngestionsCreate201Response | IngestionsCreateDefaultResponse
  >;
}

export interface IngestionsGet {
  /** Get the definition of an ingestion */
  get(
    options?: IngestionsGetParameters,
  ): StreamableMethod<IngestionsGet200Response | IngestionsGetDefaultResponse>;
  /** Update an existing ingestion */
  patch(
    options: IngestionsUpdateParameters,
  ): StreamableMethod<
    IngestionsUpdate200Response | IngestionsUpdateDefaultResponse
  >;
  /** Delete an ingestion from a catalog. All runs of the ingestion will be deleted. Ingestion must not have any runs in progress or queued. */
  delete(
    options?: IngestionsDeleteParameters,
  ): StreamableMethod<
    IngestionsDelete202Response | IngestionsDeleteDefaultResponse
  >;
}

export interface StacItemsGetFeatures {
  /**
   * Fetch features of the feature collection with id `collectionId`.
   *
   * Every feature in a dataset belongs to a collection. A dataset may
   * consist of multiple feature collections. A feature collection is often a
   * collection of features of a similar type, based on a common schema.")
   */
  get(
    options?: StacItemsGetFeaturesParameters,
  ): StreamableMethod<
    StacItemsGetFeatures200Response | StacItemsGetFeaturesDefaultResponse
  >;
  /** Create a new STAC item or a set of items in a collection */
  post(
    options: StacItemsCreateParameters,
  ): StreamableMethod<
    StacItemsCreate202Response | StacItemsCreateDefaultResponse
  >;
}

export interface StacItemsGet {
  /** Fetch a single STAC Item */
  get(
    options?: StacItemsGetParameters,
  ): StreamableMethod<StacItemsGet200Response | StacItemsGetDefaultResponse>;
  /** Create or replace a STAC item in a collection */
  put(
    options: StacItemsCreateOrReplaceParameters,
  ): StreamableMethod<
    | StacItemsCreateOrReplace202Response
    | StacItemsCreateOrReplaceDefaultResponse
  >;
  /** Update a STAC item in a collection */
  patch(
    options: StacItemsUpdateParameters,
  ): StreamableMethod<
    StacItemsUpdate202Response | StacItemsUpdateDefaultResponse
  >;
  /** Delete a STAC item from a collection */
  delete(
    options?: StacItemsDeleteParameters,
  ): StreamableMethod<
    StacItemsDelete202Response | StacItemsDeleteDefaultResponse
  >;
}

export interface IngestionSourcesListAll {
  /** Get ingestion sources in a geo-catalog */
  get(
    options?: IngestionSourcesListAllParameters,
  ): StreamableMethod<
    IngestionSourcesListAll200Response | IngestionSourcesListAllDefaultResponse
  >;
  /** Create a new ingestion source in a geo-catalog */
  post(
    options: IngestionSourcesCreateParameters,
  ): StreamableMethod<
    IngestionSourcesCreate201Response | IngestionSourcesCreateDefaultResponse
  >;
}

export interface IngestionSourcesGet {
  /** Get an ingestion source in a geo-catalog */
  get(
    options?: IngestionSourcesGetParameters,
  ): StreamableMethod<
    IngestionSourcesGet200Response | IngestionSourcesGetDefaultResponse
  >;
  /** Update an existing ingestion source in a geo-catalog */
  put(
    options: IngestionSourcesCreateOrReplaceParameters,
  ): StreamableMethod<
    | IngestionSourcesCreateOrReplace200Response
    | IngestionSourcesCreateOrReplace201Response
    | IngestionSourcesCreateOrReplaceDefaultResponse
  >;
  /** Delete an ingestion source from a geo-catalog */
  delete(
    options?: IngestionSourcesDeleteParameters,
  ): StreamableMethod<
    IngestionSourcesDelete204Response | IngestionSourcesDeleteDefaultResponse
  >;
}

export interface IngestionSourcesListManagedIdentities {
  /** Get all managed identities with access to storage accounts configured for a geo-catalog */
  get(
    options?: IngestionSourcesListManagedIdentitiesParameters,
  ): StreamableMethod<
    | IngestionSourcesListManagedIdentities200Response
    | IngestionSourcesListManagedIdentitiesDefaultResponse
  >;
}

export interface IngestionOperationsGet {
  /** Get an operation of a geo-catalog collection */
  get(
    options?: IngestionOperationsGetParameters,
  ): StreamableMethod<
    IngestionOperationsGet200Response | IngestionOperationsGetDefaultResponse
  >;
  /** Cancel a running operation of a geo-catalog collection */
  delete(
    options?: IngestionOperationsDeleteParameters,
  ): StreamableMethod<
    | IngestionOperationsDelete204Response
    | IngestionOperationsDeleteDefaultResponse
  >;
}

export interface IngestionOperationsListAll {
  /** Get operations of a geo-catalog collection */
  get(
    options?: IngestionOperationsListAllParameters,
  ): StreamableMethod<
    | IngestionOperationsListAll200Response
    | IngestionOperationsListAllDefaultResponse
  >;
  /** Cancel all running operations of a geo-catalog collection */
  delete(
    options?: IngestionOperationsDeleteAllParameters,
  ): StreamableMethod<
    | IngestionOperationsDeleteAll204Response
    | IngestionOperationsDeleteAllDefaultResponse
  >;
}

export interface StacLandingPagesGet {
  /** Endpoint. */
  get(
    options?: StacLandingPagesGetParameters,
  ): StreamableMethod<
    StacLandingPagesGet200Response | StacLandingPagesGetDefaultResponse
  >;
}

export interface StacCollectionOperationsGetAll {
  /** Endpoint. */
  get(
    options?: StacCollectionOperationsGetAllParameters,
  ): StreamableMethod<
    | StacCollectionOperationsGetAll200Response
    | StacCollectionOperationsGetAllDefaultResponse
  >;
  /** Create a new collection in the GeoCatalog instance */
  post(
    options: StacCollectionOperationsCreateParameters,
  ): StreamableMethod<
    | StacCollectionOperationsCreate202Response
    | StacCollectionOperationsCreateDefaultResponse
  >;
}

export interface StacCollectionOperationsGet {
  /** Get a collection in the GeoCatalog instance */
  get(
    options?: StacCollectionOperationsGetParameters,
  ): StreamableMethod<
    | StacCollectionOperationsGet200Response
    | StacCollectionOperationsGetDefaultResponse
  >;
  /** Create or replace a collection in the GeoCatalog instance */
  put(
    options: StacCollectionOperationsCreateOrReplaceParameters,
  ): StreamableMethod<
    | StacCollectionOperationsCreateOrReplace202Response
    | StacCollectionOperationsCreateOrReplaceDefaultResponse
  >;
  /** Delete a collection in the GeoCatalog instance */
  delete(
    options?: StacCollectionOperationsDeleteParameters,
  ): StreamableMethod<
    | StacCollectionOperationsDelete202Response
    | StacCollectionOperationsDeleteDefaultResponse
  >;
}

export interface StacQueryablesGetAll {
  /** Endpoint. */
  get(
    options?: StacQueryablesGetAllParameters,
  ): StreamableMethod<
    | StacQueryablesGetAll200Response
    | StacQueryablesGetAll204Response
    | StacQueryablesGetAllDefaultResponse
  >;
}

export interface StacQueryablesDelete {
  /** Delete queryables by name for specified collection. */
  delete(
    options?: StacQueryablesDeleteParameters,
  ): StreamableMethod<
    | StacQueryablesDelete200Response
    | StacQueryablesDelete204Response
    | StacQueryablesDeleteDefaultResponse
  >;
  /**
   * Updates a queryable given a queryable definition and
   * corresponding collection id.
   */
  put(
    options: StacQueryablesCreateOrReplaceParameters,
  ): StreamableMethod<
    | StacQueryablesCreateOrReplace200Response
    | StacQueryablesCreateOrReplace201Response
    | StacQueryablesCreateOrReplaceDefaultResponse
  >;
}

export interface StacQueryablesGetAllByCollection {
  /** Endpoint. */
  get(
    options?: StacQueryablesGetAllByCollectionParameters,
  ): StreamableMethod<
    | StacQueryablesGetAllByCollection200Response
    | StacQueryablesGetAllByCollection204Response
    | StacQueryablesGetAllByCollectionDefaultResponse
  >;
  /** Set queryables for a collection given a list of queryable definitions */
  post(
    options: StacQueryablesCreateParameters,
  ): StreamableMethod<
    | StacQueryablesCreate201Response
    | StacQueryablesCreate204Response
    | StacQueryablesCreateDefaultResponse
  >;
}

export interface StacConformanceClassGet {
  /** Endpoint. */
  get(
    options?: StacConformanceClassGetParameters,
  ): StreamableMethod<
    StacConformanceClassGet200Response | StacConformanceClassGetDefaultResponse
  >;
}

export interface StacSearchOperationsGet {
  /** Endpoint. */
  get(
    options?: StacSearchOperationsGetParameters,
  ): StreamableMethod<
    | StacSearchOperationsGet200Response
    | StacSearchOperationsGet204Response
    | StacSearchOperationsGetDefaultResponse
  >;
  /** Endpoint. */
  post(
    options: StacSearchOperationsCreateParameters,
  ): StreamableMethod<
    | StacSearchOperationsCreate200Response
    | StacSearchOperationsCreate204Response
    | StacSearchOperationsCreateDefaultResponse
  >;
}

export interface StacCollectionAssetsCreate {
  /**
   * Create a new asset in the Collection metadata and write the associated
   * file to managed storage.
   *
   * Args:
   * request: The incoming request.
   * asset: The Asset object to write, without a valid href to the asset.
   * file: The file to write.
   * collection_id: The ID of the collection to write the asset to.
   * content_type: The content type of the request.
   *
   * Returns:
   * A Response object containing the newly created asset.
   */
  post(
    options: StacCollectionAssetsCreateParameters,
  ): StreamableMethod<
    | StacCollectionAssetsCreate200Response
    | StacCollectionAssetsCreate201Response
    | StacCollectionAssetsCreateDefaultResponse
  >;
}

export interface StacCollectionAssetsCreateOrReplace {
  /**
   * Update an existing asset in a given collection.
   *
   * Args:
   * request: The incoming request.
   * asset: The Asset object to update.
   * file: The file to update (optional).
   * collection_id: The ID of the collection to update the asset in.
   * asset_id: The ID of the asset to update.
   * content_type: The content type of the request.
   *
   * Returns:
   * A Response object containing the updated asset.
   */
  put(
    options: StacCollectionAssetsCreateOrReplaceParameters,
  ): StreamableMethod<
    | StacCollectionAssetsCreateOrReplace200Response
    | StacCollectionAssetsCreateOrReplace201Response
    | StacCollectionAssetsCreateOrReplaceDefaultResponse
  >;
  /**
   * Delete an asset from a given collection.
   *
   * Args:
   * request: The incoming request.
   * collection_id: The ID of the collection to delete the asset from.
   * asset_id: The ID of the asset to delete.
   *
   * Returns:
   * A Response object indicating the success of the deletion.
   */
  delete(
    options?: StacCollectionAssetsDeleteParameters,
  ): StreamableMethod<
    | StacCollectionAssetsDelete200Response
    | StacCollectionAssetsDelete204Response
    | StacCollectionAssetsDeleteDefaultResponse
  >;
}

export interface StacCollectionConfigGet {
  /** Get the complete user configuration for a given collection */
  get(
    options?: StacCollectionConfigGetParameters,
  ): StreamableMethod<
    StacCollectionConfigGet200Response | StacCollectionConfigGetDefaultResponse
  >;
}

export interface StacCollectionMosaicsGetAll {
  /** Get the mosaic definitions for a given collection */
  get(
    options?: StacCollectionMosaicsGetAllParameters,
  ): StreamableMethod<
    | StacCollectionMosaicsGetAll200Response
    | StacCollectionMosaicsGetAll204Response
    | StacCollectionMosaicsGetAllDefaultResponse
  >;
  /** Add a mosaic definition to a given collection */
  post(
    options: StacCollectionMosaicsAddParameters,
  ): StreamableMethod<
    | StacCollectionMosaicsAdd200Response
    | StacCollectionMosaicsAdd201Response
    | StacCollectionMosaicsAddDefaultResponse
  >;
}

export interface StacCollectionMosaicsGet {
  /** Get a mosaic definition from a given collection */
  get(
    options?: StacCollectionMosaicsGetParameters,
  ): StreamableMethod<
    | StacCollectionMosaicsGet200Response
    | StacCollectionMosaicsGetDefaultResponse
  >;
  /** Update a mosaic definition from a given collection */
  put(
    options: StacCollectionMosaicsCreateOrReplaceParameters,
  ): StreamableMethod<
    | StacCollectionMosaicsCreateOrReplace200Response
    | StacCollectionMosaicsCreateOrReplace201Response
    | StacCollectionMosaicsCreateOrReplaceDefaultResponse
  >;
  /** Delete a mosaic definition from a given collection */
  delete(
    options?: StacCollectionMosaicsDeleteParameters,
  ): StreamableMethod<
    | StacCollectionMosaicsDelete200Response
    | StacCollectionMosaicsDelete204Response
    | StacCollectionMosaicsDeleteDefaultResponse
  >;
}

export interface StacCollectionPartitionTypesGet {
  /**
   * Get the partitiontype for a GeoCatalog Collection.
   *
   * Args:
   * collection_id: the collection id to get the partitiontype for.
   *
   * Returns:
   * The partitiontype for the collection.
   */
  get(
    options?: StacCollectionPartitionTypesGetParameters,
  ): StreamableMethod<
    | StacCollectionPartitionTypesGet200Response
    | StacCollectionPartitionTypesGetDefaultResponse
  >;
  /**
   * Updates partition type for a GeoCatalog Collection. This will
   * determine the partitioning scheme for items within the database,
   * and can only be set before any items are loaded.
   *
   * Ideal partitioning schemes result in partitions of roughly 100k items each.
   *
   * The default partitioning scheme is "none" which does not partition items.
   *
   * Args:
   * collection_id: the collection id to add the partitiontype to.
   * partitiontype: the partitiontype to add.
   *
   * Returns:
   * None
   */
  put(
    options: StacCollectionPartitionTypesReplaceParameters,
  ): StreamableMethod<
    | StacCollectionPartitionTypesReplace200Response
    | StacCollectionPartitionTypesReplace204Response
    | StacCollectionPartitionTypesReplaceDefaultResponse
  >;
}

export interface StacCollectionRenderOptionsGetAll {
  /** Get all render options for a given collection */
  get(
    options?: StacCollectionRenderOptionsGetAllParameters,
  ): StreamableMethod<
    | StacCollectionRenderOptionsGetAll200Response
    | StacCollectionRenderOptionsGetAll204Response
    | StacCollectionRenderOptionsGetAllDefaultResponse
  >;
  /** Add a render option for a given collection */
  post(
    options: StacCollectionRenderOptionsCreateParameters,
  ): StreamableMethod<
    | StacCollectionRenderOptionsCreate200Response
    | StacCollectionRenderOptionsCreate201Response
    | StacCollectionRenderOptionsCreateDefaultResponse
  >;
}

export interface StacCollectionRenderOptionsGet {
  /** Get a render option for a given collection */
  get(
    options?: StacCollectionRenderOptionsGetParameters,
  ): StreamableMethod<
    | StacCollectionRenderOptionsGet200Response
    | StacCollectionRenderOptionsGetDefaultResponse
  >;
  /** Update a render option for a given collection */
  put(
    options: StacCollectionRenderOptionsCreateOrReplaceParameters,
  ): StreamableMethod<
    | StacCollectionRenderOptionsCreateOrReplace200Response
    | StacCollectionRenderOptionsCreateOrReplace201Response
    | StacCollectionRenderOptionsCreateOrReplaceDefaultResponse
  >;
  /** Delete a render option for a given collection */
  delete(
    options?: StacCollectionRenderOptionsDeleteParameters,
  ): StreamableMethod<
    | StacCollectionRenderOptionsDelete200Response
    | StacCollectionRenderOptionsDelete204Response
    | StacCollectionRenderOptionsDeleteDefaultResponse
  >;
}

export interface StacCollectionTileSettingsGetAll {
  /** Get the tile settings for a given collection */
  get(
    options?: StacCollectionTileSettingsGetAllParameters,
  ): StreamableMethod<
    | StacCollectionTileSettingsGetAll200Response
    | StacCollectionTileSettingsGetAllDefaultResponse
  >;
  /** Update the tile settings for a given collection */
  put(
    options: StacCollectionTileSettingsReplaceParameters,
  ): StreamableMethod<
    | StacCollectionTileSettingsReplace200Response
    | StacCollectionTileSettingsReplaceDefaultResponse
  >;
}

export interface StacCollectionThumbnailsGet {
  /**
   * Get thumbnail for given collection.
   *
   * Args:
   * request: The incoming request.
   * collection_id: The ID of the collection to retrieve assets for.
   *
   * Returns:
   * thumbnail image
   */
  get(
    options?: StacCollectionThumbnailsGetParameters,
  ): StreamableMethod<
    | StacCollectionThumbnailsGet200Response
    | StacCollectionThumbnailsGet204Response
    | StacCollectionThumbnailsGetDefaultResponse
  >;
}

export interface GeoCatalogAuthConfigOperationsGet {
  /**
   * Get the app id and tenant id information to make a MSAL request for this
   * GeoCatalog instance.
   */
  get(
    options?: GeoCatalogAuthConfigOperationsGetParameters,
  ): StreamableMethod<
    | GeoCatalogAuthConfigOperationsGet200Response
    | GeoCatalogAuthConfigOperationsGetDefaultResponse
  >;
}

export interface GeoCatalogAzmapsClientGetId {
  /**
   * Fetch the client id for the Azure Maps API service based on the current
   * on the current identity. This client id is used for the Explorer to
   * authenticate with the Azure Maps API service.
   */
  get(
    options?: GeoCatalogAzmapsClientGetIdParameters,
  ): StreamableMethod<
    | GeoCatalogAzmapsClientGetId200Response
    | GeoCatalogAzmapsClientGetIdDefaultResponse
  >;
}

export interface GeoCatalogAzmapsTokenGet {
  /**
   * Fetch a token for the Azure Maps API service based on the current
   * service identity. This token is used for the Explorer to authenticate
   * with the Azure Maps API service.
   */
  get(
    options?: GeoCatalogAzmapsTokenGetParameters,
  ): StreamableMethod<
    | GeoCatalogAzmapsTokenGet200Response
    | GeoCatalogAzmapsTokenGetDefaultResponse
  >;
}

export interface TilerStaticImagesCreate {
  /** Create a new image export. */
  post(
    options: TilerStaticImagesCreateParameters,
  ): StreamableMethod<
    TilerStaticImagesCreate200Response | TilerStaticImagesCreateDefaultResponse
  >;
}

export interface TilerStaticImagesGet {
  /** Fetch an existing image export by ID */
  get(
    options?: TilerStaticImagesGetParameters,
  ): StreamableMethod<
    | TilerStaticImagesGet200Response
    | TilerStaticImagesGet204Response
    | TilerStaticImagesGetDefaultResponse
  >;
}

export interface TilerBoundGetAll {
  /** Return all Bounds */
  get(
    options?: TilerBoundGetAllParameters,
  ): StreamableMethod<
    TilerBoundGetAll200Response | TilerBoundGetAllDefaultResponse
  >;
}

export interface TilerInfoOperationsGet {
  /** Return dataset's basic info. */
  get(
    options?: TilerInfoOperationsGetParameters,
  ): StreamableMethod<
    TilerInfoOperationsGet200Response | TilerInfoOperationsGetDefaultResponse
  >;
}

export interface TilerInfoGeoJsonOperationsGet {
  /** Return Info Geojson */
  get(
    options?: TilerInfoGeoJsonOperationsGetParameters,
  ): StreamableMethod<
    | TilerInfoGeoJsonOperationsGet200Response
    | TilerInfoGeoJsonOperationsGetDefaultResponse
  >;
}

export interface TilerAvailableAssetsGetAll {
  /** Return a list of supported assets. */
  get(
    options?: TilerAvailableAssetsGetAllParameters,
  ): StreamableMethod<
    | TilerAvailableAssetsGetAll200Response
    | TilerAvailableAssetsGetAll204Response
    | TilerAvailableAssetsGetAllDefaultResponse
  >;
}

export interface TilerAssetStatisticsGetAll {
  /** Per Asset statistics */
  get(
    options?: TilerAssetStatisticsGetAllParameters,
  ): StreamableMethod<
    | TilerAssetStatisticsGetAll200Response
    | TilerAssetStatisticsGetAllDefaultResponse
  >;
}

export interface TilerStatisticsGetAll {
  /** Merged assets statistics. */
  get(
    options?: TilerStatisticsGetAllParameters,
  ): StreamableMethod<
    TilerStatisticsGetAll200Response | TilerStatisticsGetAllDefaultResponse
  >;
  /** Get Statistics from a geojson feature or featureCollection. */
  post(
    options: TilerGeoJsonStatisticsGetAllParameters,
  ): StreamableMethod<
    | TilerGeoJsonStatisticsGetAll200Response
    | TilerGeoJsonStatisticsGetAllDefaultResponse
  >;
}

export interface TilerTilesGetZxyScalexFormat {
  /** Create map tile from a dataset. */
  get(
    options?: TilerTilesGetZxyScalexFormatParameters,
  ): StreamableMethod<
    | TilerTilesGetZxyScalexFormat200Response
    | TilerTilesGetZxyScalexFormat204Response
    | TilerTilesGetZxyScalexFormatDefaultResponse
  >;
}

export interface TilerTileMatrixSetsGetZxyScalexFormat {
  /** Create map tile from a dataset. */
  get(
    options?: TilerTileMatrixSetsGetZxyScalexFormatParameters,
  ): StreamableMethod<
    | TilerTileMatrixSetsGetZxyScalexFormat200Response
    | TilerTileMatrixSetsGetZxyScalexFormatDefaultResponse
  >;
}

export interface TilerTileJsonOperationsGet {
  /** Return Tilejson */
  get(
    options?: TilerTileJsonOperationsGetParameters,
  ): StreamableMethod<
    | TilerTileJsonOperationsGet200Response
    | TilerTileJsonOperationsGetDefaultResponse
  >;
}

export interface TilerTileJsonTileMatrixSetsGet {
  /** Return the Tilejson Tilematrixsetid As a path */
  get(
    options?: TilerTileJsonTileMatrixSetsGetParameters,
  ): StreamableMethod<
    | TilerTileJsonTileMatrixSetsGet200Response
    | TilerTileJsonTileMatrixSetsGetDefaultResponse
  >;
}

export interface TilerWmtsGetCapabilitiesXml {
  /** OGC WMTS endpoint. */
  get(
    options?: TilerWmtsGetCapabilitiesXmlParameters,
  ): StreamableMethod<
    | TilerWmtsGetCapabilitiesXml200Response
    | TilerWmtsGetCapabilitiesXml204Response
    | TilerWmtsGetCapabilitiesXmlDefaultResponse
  >;
}

export interface TilerWmtsTileMatrixSetsGetCapabilitiesXml {
  /** OGC WMTS endpoint. */
  get(
    options?: TilerWmtsTileMatrixSetsGetCapabilitiesXmlParameters,
  ): StreamableMethod<
    | TilerWmtsTileMatrixSetsGetCapabilitiesXml200Response
    | TilerWmtsTileMatrixSetsGetCapabilitiesXmlDefaultResponse
  >;
}

export interface TilerPointsGetLonLat {
  /** Get Point value for a dataset. */
  get(
    options?: TilerPointsGetLonLatParameters,
  ): StreamableMethod<
    TilerPointsGetLonLat200Response | TilerPointsGetLonLatDefaultResponse
  >;
}

export interface TilerPreviewsGetFormat {
  /** Create preview of a dataset. */
  get(
    options?: TilerPreviewsGetFormatParameters,
  ): StreamableMethod<
    TilerPreviewsGetFormat200Response | TilerPreviewsGetFormatDefaultResponse
  >;
}

export interface TilerPreviewsGet {
  /** Create preview of a dataset. */
  get(
    options?: TilerPreviewsGetParameters,
  ): StreamableMethod<
    TilerPreviewsGet200Response | TilerPreviewsGetDefaultResponse
  >;
}

export interface TilerPartsGetMinxMinyMaxxMaxyWidthxHeightFormat {
  /** Create image from part of a dataset. */
  get(
    options?: TilerPartsGetMinxMinyMaxxMaxyWidthxHeightFormatParameters,
  ): StreamableMethod<
    | TilerPartsGetMinxMinyMaxxMaxyWidthxHeightFormat200Response
    | TilerPartsGetMinxMinyMaxxMaxyWidthxHeightFormatDefaultResponse
  >;
}

export interface TilerPartsGetMinxMinyMaxxMaxyFormat {
  /** Create image from part of a dataset. */
  get(
    options?: TilerPartsGetMinxMinyMaxxMaxyFormatParameters,
  ): StreamableMethod<
    | TilerPartsGetMinxMinyMaxxMaxyFormat200Response
    | TilerPartsGetMinxMinyMaxxMaxyFormatDefaultResponse
  >;
}

export interface TilerGeoJsonsCropWidthxHeightFormat {
  /** Create image from a geojson feature. */
  post(
    options: TilerGeoJsonsCropWidthxHeightFormatParameters,
  ): StreamableMethod<
    | TilerGeoJsonsCropWidthxHeightFormat200Response
    | TilerGeoJsonsCropWidthxHeightFormatDefaultResponse
  >;
}

export interface TilerGeoJsonsCropFormat {
  /** Create image from a geojson feature. */
  post(
    options: TilerGeoJsonsCropFormatParameters,
  ): StreamableMethod<
    TilerGeoJsonsCropFormat200Response | TilerGeoJsonsCropFormatDefaultResponse
  >;
}

export interface MapsClassmapLegendsGet {
  /**
   * Generate values and color swatches mapping for a given classmap.
   *
   * Args:
   * trim_start (int, optional): Number of items to trim
   * from the start of the cmap
   * trim_end (int, optional): Number of items to trim from the end of the cmap
   */
  get(
    options?: MapsClassmapLegendsGetParameters,
  ): StreamableMethod<
    | MapsClassmapLegendsGet200Response
    | MapsClassmapLegendsGet204Response
    | MapsClassmapLegendsGetDefaultResponse
  >;
}

export interface MapsLegendsGet {
  /**
   * Generate a legend image for a given colormap.
   *
   * If the colormap has non-contiguous values at the beginning or end,
   * which aren't desired in the output image, they can be trimmed by specifying
   * the number of values to trim.
   *
   * Args:
   * cmap_name (string): The name of the registered colormap to generate
   * a legend for
   * height (float, optional): The output height of the legend image
   * width (float, optional): The output width of the legend image
   * trim_start (int, optional): Number of items to trim from
   * the start of the cmap
   * trim_end (int, optional): Number of items to trim from the end of the cmap
   *
   * Returns:
   * HTTP response with jpeg encoded image data
   */
  get(
    options?: MapsLegendsGetParameters,
  ): StreamableMethod<
    | MapsLegendsGet200Response
    | MapsLegendsGet204Response
    | MapsLegendsGetDefaultResponse
  >;
}

export interface MapsIntervalLegendsGetByClassmapName {
  /**
   * Generate values and color swatches mapping for a given interval classmap.
   *
   * Args:
   * trim_start (int, optional): Number of items to trim from
   * the start of the cmap
   * trim_end (int, optional): Number of items to trim from the end of the cmap
   */
  get(
    options?: MapsIntervalLegendsGetByClassmapNameParameters,
  ): StreamableMethod<
    | MapsIntervalLegendsGetByClassmapName200Response
    | MapsIntervalLegendsGetByClassmapName204Response
    | MapsIntervalLegendsGetByClassmapNameDefaultResponse
  >;
}

export interface MosaicsTilesGetZxyScalexFormat {
  /** Create map tile. */
  get(
    options?: MosaicsTilesGetZxyScalexFormatParameters,
  ): StreamableMethod<
    | MosaicsTilesGetZxyScalexFormat200Response
    | MosaicsTilesGetZxyScalexFormat204Response
    | MosaicsTilesGetZxyScalexFormatDefaultResponse
  >;
}

export interface MosaicsTileMatrixSetsGetZxyScalexFormat {
  /** Create map tile. */
  get(
    options?: MosaicsTileMatrixSetsGetZxyScalexFormatParameters,
  ): StreamableMethod<
    | MosaicsTileMatrixSetsGetZxyScalexFormat200Response
    | MosaicsTileMatrixSetsGetZxyScalexFormat204Response
    | MosaicsTileMatrixSetsGetZxyScalexFormatDefaultResponse
  >;
}

export interface MosaicsTileJsonOperationsGet {
  /** Return TileJSON document for a searchId. */
  get(
    options?: MosaicsTileJsonOperationsGetParameters,
  ): StreamableMethod<
    | MosaicsTileJsonOperationsGet200Response
    | MosaicsTileJsonOperationsGetDefaultResponse
  >;
}

export interface MosaicsTileMatrixSetsTileJsonGet {
  /** Return TileJSON document for a searchId. */
  get(
    options?: MosaicsTileMatrixSetsTileJsonGetParameters,
  ): StreamableMethod<
    | MosaicsTileMatrixSetsTileJsonGet200Response
    | MosaicsTileMatrixSetsTileJsonGetDefaultResponse
  >;
}

export interface MosaicsWmtsMosaicsGetCapabilitiesXml {
  /** OGC WMTS endpoint. */
  get(
    options?: MosaicsWmtsMosaicsGetCapabilitiesXmlParameters,
  ): StreamableMethod<
    | MosaicsWmtsMosaicsGetCapabilitiesXml200Response
    | MosaicsWmtsMosaicsGetCapabilitiesXml204Response
    | MosaicsWmtsMosaicsGetCapabilitiesXmlDefaultResponse
  >;
}

export interface MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml {
  /** OGC WMTS endpoint. */
  get(
    options?: MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlParameters,
  ): StreamableMethod<
    | MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml200Response
    | MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml204Response
    | MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlDefaultResponse
  >;
}

export interface MosaicsRegisterSearchRegister {
  /** Register a Search query */
  post(
    options: MosaicsRegisterSearchRegisterParameters,
  ): StreamableMethod<
    | MosaicsRegisterSearchRegister200Response
    | MosaicsRegisterSearchRegisterDefaultResponse
  >;
}

export interface MosaicsInfoSearchGet {
  /** Get Search query metadata. */
  get(
    options?: MosaicsInfoSearchGetParameters,
  ): StreamableMethod<
    MosaicsInfoSearchGet200Response | MosaicsInfoSearchGetDefaultResponse
  >;
}

export interface MosaicsAssetsForTilesGetZxyAssets {
  /** Return a list of assets which overlap a given tile */
  get(
    options?: MosaicsAssetsForTilesGetZxyAssetsParameters,
  ): StreamableMethod<
    | MosaicsAssetsForTilesGetZxyAssets200Response
    | MosaicsAssetsForTilesGetZxyAssets204Response
    | MosaicsAssetsForTilesGetZxyAssetsDefaultResponse
  >;
}

export interface MosaicsAssetsForTileMatrixSetsGetZxyAssets {
  /** Return a list of assets which overlap a given tile */
  get(
    options?: MosaicsAssetsForTileMatrixSetsGetZxyAssetsParameters,
  ): StreamableMethod<
    | MosaicsAssetsForTileMatrixSetsGetZxyAssets200Response
    | MosaicsAssetsForTileMatrixSetsGetZxyAssets204Response
    | MosaicsAssetsForTileMatrixSetsGetZxyAssetsDefaultResponse
  >;
}

export interface MosaicsAssetsForPointsGetLonLatAssets {
  /** Return a list of assets for a given point. */
  get(
    options?: MosaicsAssetsForPointsGetLonLatAssetsParameters,
  ): StreamableMethod<
    | MosaicsAssetsForPointsGetLonLatAssets200Response
    | MosaicsAssetsForPointsGetLonLatAssets204Response
    | MosaicsAssetsForPointsGetLonLatAssetsDefaultResponse
  >;
}

export interface TileMatrixListGet {
  /** Return Matrix List */
  get(
    options?: TileMatrixListGetParameters,
  ): StreamableMethod<
    | TileMatrixListGet200Response
    | TileMatrixListGet204Response
    | TileMatrixListGetDefaultResponse
  >;
}

export interface TileMatrixDefinitionsGet {
  /** Return Matrix Definition */
  get(
    options?: TileMatrixDefinitionsGetParameters,
  ): StreamableMethod<
    | TileMatrixDefinitionsGet200Response
    | TileMatrixDefinitionsGetDefaultResponse
  >;
}

export interface SasGetToken {
  /**
   * Generate a [SAS Token](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview#how-a-shared-access-signature-works)
   * for the given storage account and container. The storage account and container
   * must be associated with a Planetary Computer dataset indexed by the STAC API.
   */
  get(
    options?: SasGetTokenParameters,
  ): StreamableMethod<SasGetToken200Response | SasGetTokenDefaultResponse>;
}

export interface SasRevokeToken {
  /**
   * Revoke a [SAS Token](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview#how-a-shared-access-signature-works)
   * for managed storage account of this GeoCatalog.
   */
  post(
    options?: SasRevokeTokenParameters,
  ): StreamableMethod<
    SasRevokeToken200Response | SasRevokeTokenDefaultResponse
  >;
}

export interface SasGetSign {
  /**
   * Signs a HREF (a link URL) by appending a [SAS Token](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview#how-a-shared-access-signature-works).
   * If the HREF is not a Azure Blob Storage HREF, then pass back the HREF unsigned.
   */
  get(
    options: SasGetSignParameters,
  ): StreamableMethod<SasGetSign200Response | SasGetSignDefaultResponse>;
}

export interface IngestionsIngestionRunsListAll {
  /** Get the runs of an ingestion */
  get(
    options?: IngestionsIngestionRunsListAllParameters,
  ): StreamableMethod<
    | IngestionsIngestionRunsListAll200Response
    | IngestionsIngestionRunsListAllDefaultResponse
  >;
  /** Create a new run of an ingestion */
  post(
    options?: IngestionsIngestionRunsCreateParameters,
  ): StreamableMethod<
    | IngestionsIngestionRunsCreate201Response
    | IngestionsIngestionRunsCreateDefaultResponse
  >;
}

export interface IngestionsIngestionRunsGet {
  /** Get a run of an ingestion */
  get(
    options?: IngestionsIngestionRunsGetParameters,
  ): StreamableMethod<
    | IngestionsIngestionRunsGet200Response
    | IngestionsIngestionRunsGetDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/inma/collections/\{collectionId\}/ingestions' has methods for the following verbs: get, post */
  (
    path: "/inma/collections/{collectionId}/ingestions",
    collectionId: string,
  ): IngestionsListAll;
  /** Resource for '/inma/collections/\{collectionId\}/ingestions/\{ingestionId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/inma/collections/{collectionId}/ingestions/{ingestionId}",
    collectionId: string,
    ingestionId: string,
  ): IngestionsGet;
  /** Resource for '/stac/collections/\{collectionId\}/items' has methods for the following verbs: get, post */
  (
    path: "/stac/collections/{collectionId}/items",
    collectionId: string,
  ): StacItemsGetFeatures;
  /** Resource for '/stac/collections/\{collectionId\}/items/\{itemId\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/stac/collections/{collectionId}/items/{itemId}",
    collectionId: string,
    itemId: string,
  ): StacItemsGet;
  /** Resource for '/inma/ingestion-sources' has methods for the following verbs: get, post */
  (path: "/inma/ingestion-sources"): IngestionSourcesListAll;
  /** Resource for '/inma/ingestion-sources/\{id\}' has methods for the following verbs: get, put, delete */
  (path: "/inma/ingestion-sources/{id}", id: string): IngestionSourcesGet;
  /** Resource for '/inma/ingestion-sources/managed-identities' has methods for the following verbs: get */
  (
    path: "/inma/ingestion-sources/managed-identities",
  ): IngestionSourcesListManagedIdentities;
  /** Resource for '/inma/operations/\{operationId\}' has methods for the following verbs: get, delete */
  (
    path: "/inma/operations/{operationId}",
    operationId: string,
  ): IngestionOperationsGet;
  /** Resource for '/inma/operations' has methods for the following verbs: get, delete */
  (path: "/inma/operations"): IngestionOperationsListAll;
  /** Resource for '/stac' has methods for the following verbs: get */
  (path: "/stac"): StacLandingPagesGet;
  /** Resource for '/stac/collections' has methods for the following verbs: get, post */
  (path: "/stac/collections"): StacCollectionOperationsGetAll;
  /** Resource for '/stac/collections/\{collectionId\}' has methods for the following verbs: get, put, delete */
  (
    path: "/stac/collections/{collectionId}",
    collectionId: string,
  ): StacCollectionOperationsGet;
  /** Resource for '/stac/queryables' has methods for the following verbs: get */
  (path: "/stac/queryables"): StacQueryablesGetAll;
  /** Resource for '/stac/collections/\{collectionId\}/queryables/\{queryableName\}' has methods for the following verbs: delete, put */
  (
    path: "/stac/collections/{collectionId}/queryables/{queryableName}",
    collectionId: string,
    queryableName: string,
  ): StacQueryablesDelete;
  /** Resource for '/stac/collections/\{collectionId\}/queryables' has methods for the following verbs: get, post */
  (
    path: "/stac/collections/{collectionId}/queryables",
    collectionId: string,
  ): StacQueryablesGetAllByCollection;
  /** Resource for '/stac/conformance' has methods for the following verbs: get */
  (path: "/stac/conformance"): StacConformanceClassGet;
  /** Resource for '/stac/search' has methods for the following verbs: get, post */
  (path: "/stac/search"): StacSearchOperationsGet;
  /** Resource for '/stac/collections/\{collectionId\}/assets' has methods for the following verbs: post */
  (
    path: "/stac/collections/{collectionId}/assets",
    collectionId: string,
  ): StacCollectionAssetsCreate;
  /** Resource for '/stac/collections/\{collectionId\}/assets/\{assetId\}' has methods for the following verbs: put, delete */
  (
    path: "/stac/collections/{collectionId}/assets/{assetId}",
    collectionId: string,
    assetId: string,
  ): StacCollectionAssetsCreateOrReplace;
  /** Resource for '/stac/collections/\{collectionId\}/configurations' has methods for the following verbs: get */
  (
    path: "/stac/collections/{collectionId}/configurations",
    collectionId: string,
  ): StacCollectionConfigGet;
  /** Resource for '/stac/collections/\{collectionId\}/configurations/mosaics' has methods for the following verbs: get, post */
  (
    path: "/stac/collections/{collectionId}/configurations/mosaics",
    collectionId: string,
  ): StacCollectionMosaicsGetAll;
  /** Resource for '/stac/collections/\{collectionId\}/configurations/mosaics/\{mosaicId\}' has methods for the following verbs: get, put, delete */
  (
    path: "/stac/collections/{collectionId}/configurations/mosaics/{mosaicId}",
    collectionId: string,
    mosaicId: string,
  ): StacCollectionMosaicsGet;
  /** Resource for '/stac/collections/\{collectionId\}/configurations/partition-type' has methods for the following verbs: get, put */
  (
    path: "/stac/collections/{collectionId}/configurations/partition-type",
    collectionId: string,
  ): StacCollectionPartitionTypesGet;
  /** Resource for '/stac/collections/\{collectionId\}/configurations/render-options' has methods for the following verbs: get, post */
  (
    path: "/stac/collections/{collectionId}/configurations/render-options",
    collectionId: string,
  ): StacCollectionRenderOptionsGetAll;
  /** Resource for '/stac/collections/\{collectionId\}/configurations/render-options/\{renderOptionId\}' has methods for the following verbs: get, put, delete */
  (
    path: "/stac/collections/{collectionId}/configurations/render-options/{renderOptionId}",
    collectionId: string,
    renderOptionId: string,
  ): StacCollectionRenderOptionsGet;
  /** Resource for '/stac/collections/\{collectionId\}/configurations/tile-settings' has methods for the following verbs: get, put */
  (
    path: "/stac/collections/{collectionId}/configurations/tile-settings",
    collectionId: string,
  ): StacCollectionTileSettingsGetAll;
  /** Resource for '/stac/collections/\{collectionId\}/thumbnail' has methods for the following verbs: get */
  (
    path: "/stac/collections/{collectionId}/thumbnail",
    collectionId: string,
  ): StacCollectionThumbnailsGet;
  /** Resource for '/geocatalog/auth' has methods for the following verbs: get */
  (path: "/geocatalog/auth"): GeoCatalogAuthConfigOperationsGet;
  /** Resource for '/geocatalog/map/id' has methods for the following verbs: get */
  (path: "/geocatalog/map/id"): GeoCatalogAzmapsClientGetId;
  /** Resource for '/geocatalog/map/token' has methods for the following verbs: get */
  (path: "/geocatalog/map/token"): GeoCatalogAzmapsTokenGet;
  /** Resource for '/data/collections/\{collectionId\}/image/static' has methods for the following verbs: post */
  (
    path: "/data/collections/{collectionId}/image/static",
    collectionId: string,
  ): TilerStaticImagesCreate;
  /** Resource for '/data/collections/\{collectionId\}/image/static/\{id\}' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/image/static/{id}",
    collectionId: string,
    id: string,
  ): TilerStaticImagesGet;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/bounds' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/bounds",
    collectionId: string,
    itemId: string,
  ): TilerBoundGetAll;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/info' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/info",
    collectionId: string,
    itemId: string,
  ): TilerInfoOperationsGet;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/info.geojson' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/info.geojson",
    collectionId: string,
    itemId: string,
  ): TilerInfoGeoJsonOperationsGet;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/assets' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/assets",
    collectionId: string,
    itemId: string,
  ): TilerAvailableAssetsGetAll;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/asset_statistics' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/asset_statistics",
    collectionId: string,
    itemId: string,
  ): TilerAssetStatisticsGetAll;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/statistics' has methods for the following verbs: get, post */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/statistics",
    collectionId: string,
    itemId: string,
  ): TilerStatisticsGetAll;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/tiles/\{z\}/\{x\}/\{y\}@\{scale\}x.\{format\}' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/tiles/{z}/{x}/{y}@{scale}x.{format}",
    collectionId: string,
    itemId: string,
    z: number,
    x: number,
    y: number,
    scale: number,
    format: string,
  ): TilerTilesGetZxyScalexFormat;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/tiles/\{tileMatrixSetId\}/\{z\}/\{x\}/\{y\}@\{scale\}x.\{format\}' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}@{scale}x.{format}",
    collectionId: string,
    itemId: string,
    tileMatrixSetId: string,
    z: number,
    x: number,
    y: number,
    scale: number,
    format: string,
  ): TilerTileMatrixSetsGetZxyScalexFormat;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/tilejson.json' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/tilejson.json",
    collectionId: string,
    itemId: string,
  ): TilerTileJsonOperationsGet;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/\{tileMatrixSetId\}/tilejson.json' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/{tileMatrixSetId}/tilejson.json",
    collectionId: string,
    itemId: string,
    tileMatrixSetId: string,
  ): TilerTileJsonTileMatrixSetsGet;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/WMTSCapabilities.xml' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/WMTSCapabilities.xml",
    collectionId: string,
    itemId: string,
  ): TilerWmtsGetCapabilitiesXml;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/\{tileMatrixSetId\}/WMTSCapabilities.xml' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/{tileMatrixSetId}/WMTSCapabilities.xml",
    collectionId: string,
    itemId: string,
    tileMatrixSetId: string,
  ): TilerWmtsTileMatrixSetsGetCapabilitiesXml;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/point/\{lon\},\{lat\}' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/point/{lon},{lat}",
    collectionId: string,
    itemId: string,
    lon: number,
    lat: number,
  ): TilerPointsGetLonLat;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/preview.\{format\}' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/preview.{format}",
    collectionId: string,
    itemId: string,
    format: string,
  ): TilerPreviewsGetFormat;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/preview' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/preview",
    collectionId: string,
    itemId: string,
  ): TilerPreviewsGet;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/crop/\{minx\},\{miny\},\{maxx\},\{maxy\}/\{width\}x\{height\}.\{format\}' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/crop/{minx},{miny},{maxx},{maxy}/{width}x{height}.{format}",
    collectionId: string,
    itemId: string,
    minx: number,
    miny: number,
    maxx: number,
    maxy: number,
    width: number,
    height: number,
    format: string,
  ): TilerPartsGetMinxMinyMaxxMaxyWidthxHeightFormat;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/crop/\{minx\},\{miny\},\{maxx\},\{maxy\}.\{format\}' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/crop/{minx},{miny},{maxx},{maxy}.{format}",
    collectionId: string,
    itemId: string,
    minx: number,
    miny: number,
    maxx: number,
    maxy: number,
    format: string,
  ): TilerPartsGetMinxMinyMaxxMaxyFormat;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/crop/\{width\}x\{height\}.\{format\}' has methods for the following verbs: post */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/crop/{width}x{height}.{format}",
    collectionId: string,
    itemId: string,
    width: number,
    height: number,
    format: string,
  ): TilerGeoJsonsCropWidthxHeightFormat;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/crop.\{format\}' has methods for the following verbs: post */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/crop.{format}",
    collectionId: string,
    itemId: string,
    format: string,
  ): TilerGeoJsonsCropFormat;
  /** Resource for '/data/legend/classmap/\{classmapName\}' has methods for the following verbs: get */
  (
    path: "/data/legend/classmap/{classmapName}",
    classmapName: string,
  ): MapsClassmapLegendsGet;
  /** Resource for '/data/legend/colormap/\{cmapName\}' has methods for the following verbs: get */
  (path: "/data/legend/colormap/{cmapName}", cmapName: string): MapsLegendsGet;
  /** Resource for '/data/legend/interval/\{classmapName\}' has methods for the following verbs: get */
  (
    path: "/data/legend/interval/{classmapName}",
    classmapName: string,
  ): MapsIntervalLegendsGetByClassmapName;
  /** Resource for '/data/mosaic/\{searchId\}/tiles/\{z\}/\{x\}/\{y\}@\{scale\}x.\{format\}' has methods for the following verbs: get */
  (
    path: "/data/mosaic/{searchId}/tiles/{z}/{x}/{y}@{scale}x.{format}",
    searchId: string,
    z: number,
    x: number,
    y: number,
    scale: number,
    format: string,
  ): MosaicsTilesGetZxyScalexFormat;
  /** Resource for '/data/mosaic/\{searchId\}/tiles/\{tileMatrixSetId\}/\{z\}/\{x\}/\{y\}@\{scale\}x.\{format\}' has methods for the following verbs: get */
  (
    path: "/data/mosaic/{searchId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}@{scale}x.{format}",
    searchId: string,
    tileMatrixSetId: string,
    z: number,
    x: number,
    y: number,
    scale: number,
    format: string,
  ): MosaicsTileMatrixSetsGetZxyScalexFormat;
  /** Resource for '/data/mosaic/\{searchId\}/tilejson.json' has methods for the following verbs: get */
  (
    path: "/data/mosaic/{searchId}/tilejson.json",
    searchId: string,
  ): MosaicsTileJsonOperationsGet;
  /** Resource for '/data/mosaic/\{searchId\}/\{tileMatrixSetId\}/tilejson.json' has methods for the following verbs: get */
  (
    path: "/data/mosaic/{searchId}/{tileMatrixSetId}/tilejson.json",
    searchId: string,
    tileMatrixSetId: string,
  ): MosaicsTileMatrixSetsTileJsonGet;
  /** Resource for '/data/mosaic/\{searchId\}/WMTSCapabilities.xml' has methods for the following verbs: get */
  (
    path: "/data/mosaic/{searchId}/WMTSCapabilities.xml",
    searchId: string,
  ): MosaicsWmtsMosaicsGetCapabilitiesXml;
  /** Resource for '/data/mosaic/\{searchId\}/\{tileMatrixSetId\}/WMTSCapabilities.xml' has methods for the following verbs: get */
  (
    path: "/data/mosaic/{searchId}/{tileMatrixSetId}/WMTSCapabilities.xml",
    searchId: string,
    tileMatrixSetId: string,
  ): MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml;
  /** Resource for '/data/mosaic/register' has methods for the following verbs: post */
  (path: "/data/mosaic/register"): MosaicsRegisterSearchRegister;
  /** Resource for '/data/mosaic/\{searchId\}/info' has methods for the following verbs: get */
  (
    path: "/data/mosaic/{searchId}/info",
    searchId: string,
  ): MosaicsInfoSearchGet;
  /** Resource for '/data/mosaic/\{searchId\}/tiles/\{z\}/\{x\}/\{y\}/assets' has methods for the following verbs: get */
  (
    path: "/data/mosaic/{searchId}/tiles/{z}/{x}/{y}/assets",
    searchId: string,
    z: number,
    x: number,
    y: number,
  ): MosaicsAssetsForTilesGetZxyAssets;
  /** Resource for '/data/mosaic/\{searchId\}/tiles/\{tileMatrixSetId\}/\{z\}/\{x\}/\{y\}/assets' has methods for the following verbs: get */
  (
    path: "/data/mosaic/{searchId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}/assets",
    searchId: string,
    tileMatrixSetId: string,
    z: number,
    x: number,
    y: number,
  ): MosaicsAssetsForTileMatrixSetsGetZxyAssets;
  /** Resource for '/data/mosaic/\{searchId\}/\{lon\},\{lat\}/assets' has methods for the following verbs: get */
  (
    path: "/data/mosaic/{searchId}/{lon},{lat}/assets",
    searchId: string,
    lon: number,
    lat: number,
  ): MosaicsAssetsForPointsGetLonLatAssets;
  /** Resource for '/data/tile-matrix-sets' has methods for the following verbs: get */
  (path: "/data/tile-matrix-sets"): TileMatrixListGet;
  /** Resource for '/data/tile-matrix-sets/\{tileMatrixSetId\}' has methods for the following verbs: get */
  (
    path: "/data/tile-matrix-sets/{tileMatrixSetId}",
    tileMatrixSetId: string,
  ): TileMatrixDefinitionsGet;
  /** Resource for '/sas/token/\{collectionId\}' has methods for the following verbs: get */
  (path: "/sas/token/{collectionId}", collectionId: string): SasGetToken;
  /** Resource for '/sas/token/revoke' has methods for the following verbs: post */
  (path: "/sas/token/revoke"): SasRevokeToken;
  /** Resource for '/sas/sign' has methods for the following verbs: get */
  (path: "/sas/sign"): SasGetSign;
  /** Resource for '/inma/collections/\{collectionId\}/ingestions/\{ingestionId\}/runs' has methods for the following verbs: get, post */
  (
    path: "/inma/collections/{collectionId}/ingestions/{ingestionId}/runs",
    collectionId: string,
    ingestionId: string,
  ): IngestionsIngestionRunsListAll;
  /** Resource for '/inma/collections/\{collectionId\}/ingestions/\{ingestionId\}/runs/\{runId\}' has methods for the following verbs: get */
  (
    path: "/inma/collections/{collectionId}/ingestions/{ingestionId}/runs/{runId}",
    collectionId: string,
    ingestionId: string,
    runId: string,
  ): IngestionsIngestionRunsGet;
}

export type PlanetaryComputerClient = Client & {
  path: Routes;
};
