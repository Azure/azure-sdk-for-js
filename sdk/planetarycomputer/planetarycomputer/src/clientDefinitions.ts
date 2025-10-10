// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  IngestionOperationsListParameters,
  IngestionOperationsDeleteAllParameters,
  IngestionOperationsGetParameters,
  IngestionOperationsDeleteParameters,
  IngestionRunsListParameters,
  IngestionRunsCreateParameters,
  IngestionRunsGetParameters,
  IngestionsListParameters,
  IngestionsCreateParameters,
  IngestionsGetParameters,
  IngestionsUpdateParameters,
  IngestionsDeleteParameters,
  IngestionSourcesListParameters,
  IngestionSourcesCreateParameters,
  IngestionSourcesGetParameters,
  IngestionSourcesCreateOrReplaceParameters,
  IngestionSourcesDeleteParameters,
  IngestionSourcesListManagedIdentitiesParameters,
  StacCollectionAssetsCreateParameters,
  StacCollectionAssetsCreateOrReplaceParameters,
  StacCollectionAssetsDeleteParameters,
  StacCollectionConfigGetParameters,
  StacCollectionMosaicsGetAllParameters,
  StacCollectionMosaicsAddParameters,
  StacCollectionMosaicsGetParameters,
  StacCollectionMosaicsCreateOrReplaceParameters,
  StacCollectionMosaicsDeleteParameters,
  StacCollectionsGetAllParameters,
  StacCollectionsCreateParameters,
  StacCollectionsGetParameters,
  StacCollectionsCreateOrReplaceParameters,
  StacCollectionsDeleteParameters,
  StacCollectionPartitionTypesGetParameters,
  StacCollectionPartitionTypesReplaceParameters,
  StacCollectionRenderOptionsGetAllParameters,
  StacCollectionRenderOptionsCreateParameters,
  StacCollectionRenderOptionsGetParameters,
  StacCollectionRenderOptionsCreateOrReplaceParameters,
  StacCollectionRenderOptionsDeleteParameters,
  StacCollectionThumbnailsGetParameters,
  StacCollectionTileSettingsGetParameters,
  StacCollectionTileSettingsReplaceParameters,
  StacConformanceClassGetParameters,
  StacItemsGetFeaturesParameters,
  StacItemsCreateParameters,
  StacItemsGetParameters,
  StacItemsCreateOrReplaceParameters,
  StacItemsUpdateParameters,
  StacItemsDeleteParameters,
  StacLandingPagesGetParameters,
  StacQueryablesGetAllParameters,
  StacQueryablesDeleteParameters,
  StacQueryablesCreateOrReplaceParameters,
  StacQueryablesGetAllByCollectionParameters,
  StacQueryablesCreateParameters,
  StacSearchGetParameters,
  StacSearchCreateParameters,
  TileMatrixDefinitionsGetParameters,
  TileMatrixListGetParameters,
  TilerAssetStatisticsGetAllParameters,
  TilerAvailableAssetsGetAllParameters,
  TilerBoundGetAllParameters,
  TilerGeoJsonsCropWidthByHeightFormatParameters,
  TilerGeoJsonsCropFormatParameters,
  TilerGeoJsonStatisticsGetAllParameters,
  TilerStatisticsGetAllParameters,
  TilerInfoGeoJsonOperationsGetParameters,
  TilerInfoOperationsGetParameters,
  TilerPartsGetCroppedToBoundingBoxWidthByHeightParameters,
  TilerPartsGetCroppedToBoundingBoxParameters,
  TilerPointsGetPointParameters,
  TilerPreviewsGetFormatParameters,
  TilerPreviewsGetParameters,
  TilerStaticImagesCreateParameters,
  TilerStaticImagesGetParameters,
  TilerTileJsonTileMatrixSetsGetParameters,
  TilerTileMatrixSetsGetZxyScaleByFormatParameters,
  TilerWmtsTileMatrixSetsGetCapabilitiesXmlParameters,
  MapsClassMapLegendsGetParameters,
  MapsIntervalLegendsGetByClassMapNameParameters,
  MapsLegendsGetParameters,
  MosaicsAssetsForPointsGetPointAssetsParameters,
  MosaicsAssetsForTileMatrixSetsGetZxyAssetsParameters,
  MosaicsInfoSearchGetParameters,
  MosaicsRegisterSearchRegisterParameters,
  MosaicsTileMatrixSetsTileJsonGetParameters,
  MosaicsTileMatrixSetsGetZxyScaleByFormatParameters,
  MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlParameters,
  SasGetTokenParameters,
  SasRevokeTokenParameters,
  SasGetSignParameters,
  TilerTilesGetZxyScaleByFormatParameters,
  TilerTileJsonOperationsGetParameters,
  TilerWmtsGetCapabilitiesXmlParameters,
  MosaicsTilesGetZxyScaleByFormatParameters,
  MosaicsTileJsonOperationsGetParameters,
  MosaicsWmtsMosaicsGetCapabilitiesXmlParameters,
  MosaicsAssetsForTilesGetZxyAssetsParameters,
} from "./parameters.js";
import type {
  IngestionOperationsList200Response,
  IngestionOperationsListDefaultResponse,
  IngestionOperationsDeleteAll204Response,
  IngestionOperationsDeleteAllDefaultResponse,
  IngestionOperationsGet200Response,
  IngestionOperationsGetDefaultResponse,
  IngestionOperationsDelete204Response,
  IngestionOperationsDeleteDefaultResponse,
  IngestionRunsList200Response,
  IngestionRunsListDefaultResponse,
  IngestionRunsCreate201Response,
  IngestionRunsCreateDefaultResponse,
  IngestionRunsGet200Response,
  IngestionRunsGetDefaultResponse,
  IngestionsList200Response,
  IngestionsListDefaultResponse,
  IngestionsCreate201Response,
  IngestionsCreateDefaultResponse,
  IngestionsGet200Response,
  IngestionsGetDefaultResponse,
  IngestionsUpdate200Response,
  IngestionsUpdateDefaultResponse,
  IngestionsDelete202Response,
  IngestionsDeleteDefaultResponse,
  IngestionSourcesList200Response,
  IngestionSourcesListDefaultResponse,
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
  StacCollectionAssetsCreate200Response,
  StacCollectionAssetsCreate201Response,
  StacCollectionAssetsCreateDefaultResponse,
  StacCollectionAssetsCreateOrReplace200Response,
  StacCollectionAssetsCreateOrReplace201Response,
  StacCollectionAssetsCreateOrReplaceDefaultResponse,
  StacCollectionAssetsDelete200Response,
  StacCollectionAssetsDeleteDefaultResponse,
  StacCollectionConfigGet200Response,
  StacCollectionConfigGetDefaultResponse,
  StacCollectionMosaicsGetAll200Response,
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
  StacCollectionMosaicsDeleteDefaultResponse,
  StacCollectionsGetAll200Response,
  StacCollectionsGetAllDefaultResponse,
  StacCollectionsCreate202Response,
  StacCollectionsCreateDefaultResponse,
  StacCollectionsGet200Response,
  StacCollectionsGetDefaultResponse,
  StacCollectionsCreateOrReplace200Response,
  StacCollectionsCreateOrReplaceDefaultResponse,
  StacCollectionsDelete202Response,
  StacCollectionsDeleteDefaultResponse,
  StacCollectionPartitionTypesGet200Response,
  StacCollectionPartitionTypesGetDefaultResponse,
  StacCollectionPartitionTypesReplace200Response,
  StacCollectionPartitionTypesReplace404Response,
  StacCollectionPartitionTypesReplaceDefaultResponse,
  StacCollectionRenderOptionsGetAll200Response,
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
  StacCollectionRenderOptionsDeleteDefaultResponse,
  StacCollectionThumbnailsGet200Response,
  StacCollectionThumbnailsGetDefaultResponse,
  StacCollectionTileSettingsGet200Response,
  StacCollectionTileSettingsGetDefaultResponse,
  StacCollectionTileSettingsReplace200Response,
  StacCollectionTileSettingsReplaceDefaultResponse,
  StacConformanceClassGet200Response,
  StacConformanceClassGetDefaultResponse,
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
  StacLandingPagesGet200Response,
  StacLandingPagesGetDefaultResponse,
  StacQueryablesGetAll200Response,
  StacQueryablesGetAllDefaultResponse,
  StacQueryablesDelete200Response,
  StacQueryablesDeleteDefaultResponse,
  StacQueryablesCreateOrReplace200Response,
  StacQueryablesCreateOrReplace201Response,
  StacQueryablesCreateOrReplaceDefaultResponse,
  StacQueryablesGetAllByCollection200Response,
  StacQueryablesGetAllByCollectionDefaultResponse,
  StacQueryablesCreate201Response,
  StacQueryablesCreateDefaultResponse,
  StacSearchGet200Response,
  StacSearchGetDefaultResponse,
  StacSearchCreate200Response,
  StacSearchCreateDefaultResponse,
  TileMatrixDefinitionsGet200Response,
  TileMatrixDefinitionsGetDefaultResponse,
  TileMatrixListGet200Response,
  TileMatrixListGetDefaultResponse,
  TilerAssetStatisticsGetAll200Response,
  TilerAssetStatisticsGetAllDefaultResponse,
  TilerAvailableAssetsGetAll200Response,
  TilerAvailableAssetsGetAllDefaultResponse,
  TilerBoundGetAll200Response,
  TilerBoundGetAllDefaultResponse,
  TilerGeoJsonsCropWidthByHeightFormat200Response,
  TilerGeoJsonsCropWidthByHeightFormatDefaultResponse,
  TilerGeoJsonsCropFormat200Response,
  TilerGeoJsonsCropFormatDefaultResponse,
  TilerGeoJsonStatisticsGetAll200Response,
  TilerGeoJsonStatisticsGetAllDefaultResponse,
  TilerStatisticsGetAll200Response,
  TilerStatisticsGetAllDefaultResponse,
  TilerInfoGeoJsonOperationsGet200Response,
  TilerInfoGeoJsonOperationsGetDefaultResponse,
  TilerInfoOperationsGet200Response,
  TilerInfoOperationsGetDefaultResponse,
  TilerPartsGetCroppedToBoundingBoxWidthByHeight200Response,
  TilerPartsGetCroppedToBoundingBoxWidthByHeightDefaultResponse,
  TilerPartsGetCroppedToBoundingBox200Response,
  TilerPartsGetCroppedToBoundingBoxDefaultResponse,
  TilerPointsGetPoint200Response,
  TilerPointsGetPointDefaultResponse,
  TilerPreviewsGetFormat200Response,
  TilerPreviewsGetFormatDefaultResponse,
  TilerPreviewsGet200Response,
  TilerPreviewsGetDefaultResponse,
  TilerStaticImagesCreate200Response,
  TilerStaticImagesCreateDefaultResponse,
  TilerStaticImagesGet200Response,
  TilerStaticImagesGetDefaultResponse,
  TilerTileJsonTileMatrixSetsGet200Response,
  TilerTileJsonTileMatrixSetsGetDefaultResponse,
  TilerTileMatrixSetsGetZxyScaleByFormat200Response,
  TilerTileMatrixSetsGetZxyScaleByFormatDefaultResponse,
  TilerWmtsTileMatrixSetsGetCapabilitiesXml200Response,
  TilerWmtsTileMatrixSetsGetCapabilitiesXmlDefaultResponse,
  MapsClassMapLegendsGet200Response,
  MapsClassMapLegendsGetDefaultResponse,
  MapsIntervalLegendsGetByClassMapName200Response,
  MapsIntervalLegendsGetByClassMapNameDefaultResponse,
  MapsLegendsGet200Response,
  MapsLegendsGetDefaultResponse,
  MosaicsAssetsForPointsGetPointAssets200Response,
  MosaicsAssetsForPointsGetPointAssetsDefaultResponse,
  MosaicsAssetsForTileMatrixSetsGetZxyAssets200Response,
  MosaicsAssetsForTileMatrixSetsGetZxyAssetsDefaultResponse,
  MosaicsInfoSearchGet200Response,
  MosaicsInfoSearchGetDefaultResponse,
  MosaicsRegisterSearchRegister200Response,
  MosaicsRegisterSearchRegisterDefaultResponse,
  MosaicsTileMatrixSetsTileJsonGet200Response,
  MosaicsTileMatrixSetsTileJsonGetDefaultResponse,
  MosaicsTileMatrixSetsGetZxyScaleByFormat200Response,
  MosaicsTileMatrixSetsGetZxyScaleByFormatDefaultResponse,
  MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml200Response,
  MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlDefaultResponse,
  SasGetToken200Response,
  SasGetTokenDefaultResponse,
  SasRevokeToken200Response,
  SasRevokeTokenDefaultResponse,
  SasGetSign200Response,
  SasGetSignDefaultResponse,
  TilerTilesGetZxyScaleByFormat200Response,
  TilerTilesGetZxyScaleByFormatDefaultResponse,
  TilerTileJsonOperationsGet200Response,
  TilerTileJsonOperationsGetDefaultResponse,
  TilerWmtsGetCapabilitiesXml200Response,
  TilerWmtsGetCapabilitiesXmlDefaultResponse,
  MosaicsTilesGetZxyScaleByFormat200Response,
  MosaicsTilesGetZxyScaleByFormatDefaultResponse,
  MosaicsTileJsonOperationsGet200Response,
  MosaicsTileJsonOperationsGetDefaultResponse,
  MosaicsWmtsMosaicsGetCapabilitiesXml200Response,
  MosaicsWmtsMosaicsGetCapabilitiesXmlDefaultResponse,
  MosaicsAssetsForTilesGetZxyAssets200Response,
  MosaicsAssetsForTilesGetZxyAssetsDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface IngestionOperationsList {
  /** Get operations of a geo-catalog collection */
  get(
    options?: IngestionOperationsListParameters,
  ): StreamableMethod<
    IngestionOperationsList200Response | IngestionOperationsListDefaultResponse
  >;
  /** Cancel all running operations of a geo-catalog collection */
  delete(
    options?: IngestionOperationsDeleteAllParameters,
  ): StreamableMethod<
    | IngestionOperationsDeleteAll204Response
    | IngestionOperationsDeleteAllDefaultResponse
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

export interface IngestionRunsList {
  /** Get the runs of an ingestion */
  get(
    options?: IngestionRunsListParameters,
  ): StreamableMethod<
    IngestionRunsList200Response | IngestionRunsListDefaultResponse
  >;
  /** Create a new run of an ingestion */
  post(
    options?: IngestionRunsCreateParameters,
  ): StreamableMethod<
    IngestionRunsCreate201Response | IngestionRunsCreateDefaultResponse
  >;
}

export interface IngestionRunsGet {
  /** Get a run of an ingestion */
  get(
    options?: IngestionRunsGetParameters,
  ): StreamableMethod<
    IngestionRunsGet200Response | IngestionRunsGetDefaultResponse
  >;
}

export interface IngestionsList {
  /** Get ingestions of a catalog */
  get(
    options?: IngestionsListParameters,
  ): StreamableMethod<
    IngestionsList200Response | IngestionsListDefaultResponse
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

export interface IngestionSourcesList {
  /** Get ingestion sources in a geo-catalog */
  get(
    options?: IngestionSourcesListParameters,
  ): StreamableMethod<
    IngestionSourcesList200Response | IngestionSourcesListDefaultResponse
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

export interface StacCollectionAssetsCreate {
  /**
   * Create a new asset in the Collection metadata and write the associated
   * file to managed storage.
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
  /** Update an existing asset in a given collection. */
  put(
    options: StacCollectionAssetsCreateOrReplaceParameters,
  ): StreamableMethod<
    | StacCollectionAssetsCreateOrReplace200Response
    | StacCollectionAssetsCreateOrReplace201Response
    | StacCollectionAssetsCreateOrReplaceDefaultResponse
  >;
  /** Delete an asset from a given collection. */
  delete(
    options?: StacCollectionAssetsDeleteParameters,
  ): StreamableMethod<
    | StacCollectionAssetsDelete200Response
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
    | StacCollectionMosaicsDeleteDefaultResponse
  >;
}

export interface StacCollectionsGetAll {
  /** List all collections in the GeoCatalog instance */
  get(
    options?: StacCollectionsGetAllParameters,
  ): StreamableMethod<
    StacCollectionsGetAll200Response | StacCollectionsGetAllDefaultResponse
  >;
  /** Create a new collection in the GeoCatalog instance */
  post(
    options: StacCollectionsCreateParameters,
  ): StreamableMethod<
    StacCollectionsCreate202Response | StacCollectionsCreateDefaultResponse
  >;
}

export interface StacCollectionsGet {
  /** Get a collection in the GeoCatalog instance */
  get(
    options?: StacCollectionsGetParameters,
  ): StreamableMethod<
    StacCollectionsGet200Response | StacCollectionsGetDefaultResponse
  >;
  /** Create or replace a collection in the GeoCatalog instance */
  put(
    options: StacCollectionsCreateOrReplaceParameters,
  ): StreamableMethod<
    | StacCollectionsCreateOrReplace200Response
    | StacCollectionsCreateOrReplaceDefaultResponse
  >;
  /** Delete a collection in the GeoCatalog instance */
  delete(
    options?: StacCollectionsDeleteParameters,
  ): StreamableMethod<
    StacCollectionsDelete202Response | StacCollectionsDeleteDefaultResponse
  >;
}

export interface StacCollectionPartitionTypesGet {
  /** Get the partitiontype for a GeoCatalog Collection. */
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
   */
  put(
    options: StacCollectionPartitionTypesReplaceParameters,
  ): StreamableMethod<
    | StacCollectionPartitionTypesReplace200Response
    | StacCollectionPartitionTypesReplace404Response
    | StacCollectionPartitionTypesReplaceDefaultResponse
  >;
}

export interface StacCollectionRenderOptionsGetAll {
  /** Get all render options for a given collection */
  get(
    options?: StacCollectionRenderOptionsGetAllParameters,
  ): StreamableMethod<
    | StacCollectionRenderOptionsGetAll200Response
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
    | StacCollectionRenderOptionsDeleteDefaultResponse
  >;
}

export interface StacCollectionThumbnailsGet {
  /** Get thumbnail for given collection. */
  get(
    options?: StacCollectionThumbnailsGetParameters,
  ): StreamableMethod<
    | StacCollectionThumbnailsGet200Response
    | StacCollectionThumbnailsGetDefaultResponse
  >;
}

export interface StacCollectionTileSettingsGet {
  /** Get the tile settings for a given collection */
  get(
    options?: StacCollectionTileSettingsGetParameters,
  ): StreamableMethod<
    | StacCollectionTileSettingsGet200Response
    | StacCollectionTileSettingsGetDefaultResponse
  >;
  /** Update the tile settings for a given collection */
  put(
    options: StacCollectionTileSettingsReplaceParameters,
  ): StreamableMethod<
    | StacCollectionTileSettingsReplace200Response
    | StacCollectionTileSettingsReplaceDefaultResponse
  >;
}

export interface StacConformanceClassGet {
  /** Returns the STAC conformance classes. */
  get(
    options?: StacConformanceClassGetParameters,
  ): StreamableMethod<
    StacConformanceClassGet200Response | StacConformanceClassGetDefaultResponse
  >;
}

export interface StacItemsGetFeatures {
  /**
   * Fetch features of the feature collection with id `collectionId`.
   *
   * Every feature in a dataset belongs to a collection. A dataset may
   * consist of multiple feature collections. A feature collection is often a
   * collection of features of a similar type, based on a common schema.
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

export interface StacLandingPagesGet {
  /** Return the STAC landing page. */
  get(
    options?: StacLandingPagesGetParameters,
  ): StreamableMethod<
    StacLandingPagesGet200Response | StacLandingPagesGetDefaultResponse
  >;
}

export interface StacQueryablesGetAll {
  /** List all queryables in the GeoCatalog instance */
  get(
    options?: StacQueryablesGetAllParameters,
  ): StreamableMethod<
    StacQueryablesGetAll200Response | StacQueryablesGetAllDefaultResponse
  >;
}

export interface StacQueryablesDelete {
  /** Delete queryables by name for specified collection. */
  delete(
    options?: StacQueryablesDeleteParameters,
  ): StreamableMethod<
    StacQueryablesDelete200Response | StacQueryablesDeleteDefaultResponse
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
  /** List all queryables in a given collection */
  get(
    options?: StacQueryablesGetAllByCollectionParameters,
  ): StreamableMethod<
    | StacQueryablesGetAllByCollection200Response
    | StacQueryablesGetAllByCollectionDefaultResponse
  >;
  /** Set queryables for a collection given a list of queryable definitions */
  post(
    options: StacQueryablesCreateParameters,
  ): StreamableMethod<
    StacQueryablesCreate201Response | StacQueryablesCreateDefaultResponse
  >;
}

export interface StacSearchGet {
  /** STAC search operation with query parameters. */
  get(
    options?: StacSearchGetParameters,
  ): StreamableMethod<StacSearchGet200Response | StacSearchGetDefaultResponse>;
  /** STAC search operation. */
  post(
    options: StacSearchCreateParameters,
  ): StreamableMethod<
    StacSearchCreate200Response | StacSearchCreateDefaultResponse
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

export interface TileMatrixListGet {
  /** Return Matrix List */
  get(
    options?: TileMatrixListGetParameters,
  ): StreamableMethod<
    TileMatrixListGet200Response | TileMatrixListGetDefaultResponse
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

export interface TilerAvailableAssetsGetAll {
  /** Return a list of supported assets. */
  get(
    options?: TilerAvailableAssetsGetAllParameters,
  ): StreamableMethod<
    | TilerAvailableAssetsGetAll200Response
    | TilerAvailableAssetsGetAllDefaultResponse
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

export interface TilerGeoJsonsCropWidthByHeightFormat {
  /** Create image from a geojson feature. */
  post(
    options: TilerGeoJsonsCropWidthByHeightFormatParameters,
  ): StreamableMethod<
    | TilerGeoJsonsCropWidthByHeightFormat200Response
    | TilerGeoJsonsCropWidthByHeightFormatDefaultResponse
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

export interface TilerGeoJsonStatisticsGetAll {
  /** Get Statistics from a geojson feature or featureCollection. */
  post(
    options: TilerGeoJsonStatisticsGetAllParameters,
  ): StreamableMethod<
    | TilerGeoJsonStatisticsGetAll200Response
    | TilerGeoJsonStatisticsGetAllDefaultResponse
  >;
  /** Merged assets statistics. */
  get(
    options?: TilerStatisticsGetAllParameters,
  ): StreamableMethod<
    TilerStatisticsGetAll200Response | TilerStatisticsGetAllDefaultResponse
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

export interface TilerInfoOperationsGet {
  /** Return dataset's basic info. */
  get(
    options?: TilerInfoOperationsGetParameters,
  ): StreamableMethod<
    TilerInfoOperationsGet200Response | TilerInfoOperationsGetDefaultResponse
  >;
}

export interface TilerPartsGetCroppedToBoundingBoxWidthByHeight {
  /** Create image from part of a dataset. */
  get(
    options?: TilerPartsGetCroppedToBoundingBoxWidthByHeightParameters,
  ): StreamableMethod<
    | TilerPartsGetCroppedToBoundingBoxWidthByHeight200Response
    | TilerPartsGetCroppedToBoundingBoxWidthByHeightDefaultResponse
  >;
}

export interface TilerPartsGetCroppedToBoundingBox {
  /** Create image from part of a dataset. */
  get(
    options?: TilerPartsGetCroppedToBoundingBoxParameters,
  ): StreamableMethod<
    | TilerPartsGetCroppedToBoundingBox200Response
    | TilerPartsGetCroppedToBoundingBoxDefaultResponse
  >;
}

export interface TilerPointsGetPoint {
  /** Get Point value for a dataset. */
  get(
    options?: TilerPointsGetPointParameters,
  ): StreamableMethod<
    TilerPointsGetPoint200Response | TilerPointsGetPointDefaultResponse
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
    TilerStaticImagesGet200Response | TilerStaticImagesGetDefaultResponse
  >;
}

export interface TilerTileJsonTileMatrixSetsGet {
  /** Return the TileJson Tilematrixsetid As a path */
  get(
    options?: TilerTileJsonTileMatrixSetsGetParameters,
  ): StreamableMethod<
    | TilerTileJsonTileMatrixSetsGet200Response
    | TilerTileJsonTileMatrixSetsGetDefaultResponse
  >;
}

export interface TilerTileMatrixSetsGetZxyScaleByFormat {
  /** Create map tile from a dataset. */
  get(
    options?: TilerTileMatrixSetsGetZxyScaleByFormatParameters,
  ): StreamableMethod<
    | TilerTileMatrixSetsGetZxyScaleByFormat200Response
    | TilerTileMatrixSetsGetZxyScaleByFormatDefaultResponse
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

export interface MapsClassMapLegendsGet {
  /** Generate values and color swatches mapping for a given classmap. */
  get(
    options?: MapsClassMapLegendsGetParameters,
  ): StreamableMethod<
    MapsClassMapLegendsGet200Response | MapsClassMapLegendsGetDefaultResponse
  >;
}

export interface MapsIntervalLegendsGetByClassMapName {
  /** Generate values and color swatches mapping for a given interval classmap. */
  get(
    options?: MapsIntervalLegendsGetByClassMapNameParameters,
  ): StreamableMethod<
    | MapsIntervalLegendsGetByClassMapName200Response
    | MapsIntervalLegendsGetByClassMapNameDefaultResponse
  >;
}

export interface MapsLegendsGet {
  /**
   * Generate a legend image for a given colormap.
   *
   * If the colormap has non-contiguous values at the beginning or end,
   * which aren't desired in the output image, they can be trimmed by specifying
   * the number of values to trim.
   */
  get(
    options?: MapsLegendsGetParameters,
  ): StreamableMethod<
    MapsLegendsGet200Response | MapsLegendsGetDefaultResponse
  >;
}

export interface MosaicsAssetsForPointsGetPointAssets {
  /** Return a list of assets for a given point. */
  get(
    options?: MosaicsAssetsForPointsGetPointAssetsParameters,
  ): StreamableMethod<
    | MosaicsAssetsForPointsGetPointAssets200Response
    | MosaicsAssetsForPointsGetPointAssetsDefaultResponse
  >;
}

export interface MosaicsAssetsForTileMatrixSetsGetZxyAssets {
  /** Return a list of assets which overlap a given tile */
  get(
    options?: MosaicsAssetsForTileMatrixSetsGetZxyAssetsParameters,
  ): StreamableMethod<
    | MosaicsAssetsForTileMatrixSetsGetZxyAssets200Response
    | MosaicsAssetsForTileMatrixSetsGetZxyAssetsDefaultResponse
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

export interface MosaicsRegisterSearchRegister {
  /** Register a Search query */
  post(
    options: MosaicsRegisterSearchRegisterParameters,
  ): StreamableMethod<
    | MosaicsRegisterSearchRegister200Response
    | MosaicsRegisterSearchRegisterDefaultResponse
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

export interface MosaicsTileMatrixSetsGetZxyScaleByFormat {
  /** Create map tile. */
  get(
    options?: MosaicsTileMatrixSetsGetZxyScaleByFormatParameters,
  ): StreamableMethod<
    | MosaicsTileMatrixSetsGetZxyScaleByFormat200Response
    | MosaicsTileMatrixSetsGetZxyScaleByFormatDefaultResponse
  >;
}

export interface MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml {
  /** OGC WMTS endpoint. */
  get(
    options?: MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlParameters,
  ): StreamableMethod<
    | MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml200Response
    | MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlDefaultResponse
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

export interface TilerTilesGetZxyScaleByFormat {
  /** Create map tile from a dataset. */
  get(
    options?: TilerTilesGetZxyScaleByFormatParameters,
  ): StreamableMethod<
    | TilerTilesGetZxyScaleByFormat200Response
    | TilerTilesGetZxyScaleByFormatDefaultResponse
  >;
}

export interface TilerTileJsonOperationsGet {
  /** Return TileJson */
  get(
    options?: TilerTileJsonOperationsGetParameters,
  ): StreamableMethod<
    | TilerTileJsonOperationsGet200Response
    | TilerTileJsonOperationsGetDefaultResponse
  >;
}

export interface TilerWmtsGetCapabilitiesXml {
  /** OGC WMTS endpoint. */
  get(
    options?: TilerWmtsGetCapabilitiesXmlParameters,
  ): StreamableMethod<
    | TilerWmtsGetCapabilitiesXml200Response
    | TilerWmtsGetCapabilitiesXmlDefaultResponse
  >;
}

export interface MosaicsTilesGetZxyScaleByFormat {
  /** Create map tile. */
  get(
    options?: MosaicsTilesGetZxyScaleByFormatParameters,
  ): StreamableMethod<
    | MosaicsTilesGetZxyScaleByFormat200Response
    | MosaicsTilesGetZxyScaleByFormatDefaultResponse
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

export interface MosaicsWmtsMosaicsGetCapabilitiesXml {
  /** OGC WMTS endpoint. */
  get(
    options?: MosaicsWmtsMosaicsGetCapabilitiesXmlParameters,
  ): StreamableMethod<
    | MosaicsWmtsMosaicsGetCapabilitiesXml200Response
    | MosaicsWmtsMosaicsGetCapabilitiesXmlDefaultResponse
  >;
}

export interface MosaicsAssetsForTilesGetZxyAssets {
  /** Return a list of assets which overlap a given tile */
  get(
    options?: MosaicsAssetsForTilesGetZxyAssetsParameters,
  ): StreamableMethod<
    | MosaicsAssetsForTilesGetZxyAssets200Response
    | MosaicsAssetsForTilesGetZxyAssetsDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/inma/operations' has methods for the following verbs: get, delete */
  (path: "/inma/operations"): IngestionOperationsList;
  /** Resource for '/inma/operations/\{operationId\}' has methods for the following verbs: get, delete */
  (
    path: "/inma/operations/{operationId}",
    operationId: string,
  ): IngestionOperationsGet;
  /** Resource for '/inma/collections/\{collectionId\}/ingestions/\{ingestionId\}/runs' has methods for the following verbs: get, post */
  (
    path: "/inma/collections/{collectionId}/ingestions/{ingestionId}/runs",
    collectionId: string,
    ingestionId: string,
  ): IngestionRunsList;
  /** Resource for '/inma/collections/\{collectionId\}/ingestions/\{ingestionId\}/runs/\{runId\}' has methods for the following verbs: get */
  (
    path: "/inma/collections/{collectionId}/ingestions/{ingestionId}/runs/{runId}",
    collectionId: string,
    ingestionId: string,
    runId: string,
  ): IngestionRunsGet;
  /** Resource for '/inma/collections/\{collectionId\}/ingestions' has methods for the following verbs: get, post */
  (
    path: "/inma/collections/{collectionId}/ingestions",
    collectionId: string,
  ): IngestionsList;
  /** Resource for '/inma/collections/\{collectionId\}/ingestions/\{ingestionId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/inma/collections/{collectionId}/ingestions/{ingestionId}",
    collectionId: string,
    ingestionId: string,
  ): IngestionsGet;
  /** Resource for '/inma/ingestion-sources' has methods for the following verbs: get, post */
  (path: "/inma/ingestion-sources"): IngestionSourcesList;
  /** Resource for '/inma/ingestion-sources/\{id\}' has methods for the following verbs: get, put, delete */
  (path: "/inma/ingestion-sources/{id}", id: string): IngestionSourcesGet;
  /** Resource for '/inma/ingestion-sources/managed-identities' has methods for the following verbs: get */
  (
    path: "/inma/ingestion-sources/managed-identities",
  ): IngestionSourcesListManagedIdentities;
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
  /** Resource for '/stac/collections' has methods for the following verbs: get, post */
  (path: "/stac/collections"): StacCollectionsGetAll;
  /** Resource for '/stac/collections/\{collectionId\}' has methods for the following verbs: get, put, delete */
  (
    path: "/stac/collections/{collectionId}",
    collectionId: string,
  ): StacCollectionsGet;
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
  /** Resource for '/stac/collections/\{collectionId\}/thumbnail' has methods for the following verbs: get */
  (
    path: "/stac/collections/{collectionId}/thumbnail",
    collectionId: string,
  ): StacCollectionThumbnailsGet;
  /** Resource for '/stac/collections/\{collectionId\}/configurations/tile-settings' has methods for the following verbs: get, put */
  (
    path: "/stac/collections/{collectionId}/configurations/tile-settings",
    collectionId: string,
  ): StacCollectionTileSettingsGet;
  /** Resource for '/stac/conformance' has methods for the following verbs: get */
  (path: "/stac/conformance"): StacConformanceClassGet;
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
  /** Resource for '/stac' has methods for the following verbs: get */
  (path: "/stac"): StacLandingPagesGet;
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
  /** Resource for '/stac/search' has methods for the following verbs: get, post */
  (path: "/stac/search"): StacSearchGet;
  /** Resource for '/data/tile-matrix-sets/\{tileMatrixSetId\}' has methods for the following verbs: get */
  (
    path: "/data/tile-matrix-sets/{tileMatrixSetId}",
    tileMatrixSetId: string,
  ): TileMatrixDefinitionsGet;
  /** Resource for '/data/tile-matrix-sets' has methods for the following verbs: get */
  (path: "/data/tile-matrix-sets"): TileMatrixListGet;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/asset_statistics' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/asset_statistics",
    collectionId: string,
    itemId: string,
  ): TilerAssetStatisticsGetAll;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/assets' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/assets",
    collectionId: string,
    itemId: string,
  ): TilerAvailableAssetsGetAll;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/bounds' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/bounds",
    collectionId: string,
    itemId: string,
  ): TilerBoundGetAll;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/crop/\{width\}x\{height\}.\{format\}' has methods for the following verbs: post */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/crop/{width}x{height}.{format}",
    collectionId: string,
    itemId: string,
    width: number,
    height: number,
    format: string,
  ): TilerGeoJsonsCropWidthByHeightFormat;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/crop.\{format\}' has methods for the following verbs: post */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/crop.{format}",
    collectionId: string,
    itemId: string,
    format: string,
  ): TilerGeoJsonsCropFormat;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/statistics' has methods for the following verbs: post, get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/statistics",
    collectionId: string,
    itemId: string,
  ): TilerGeoJsonStatisticsGetAll;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/info.geojson' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/info.geojson",
    collectionId: string,
    itemId: string,
  ): TilerInfoGeoJsonOperationsGet;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/info' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/info",
    collectionId: string,
    itemId: string,
  ): TilerInfoOperationsGet;
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
  ): TilerPartsGetCroppedToBoundingBoxWidthByHeight;
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
  ): TilerPartsGetCroppedToBoundingBox;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/point/\{longitude\},\{latitude\}' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/point/{longitude},{latitude}",
    collectionId: string,
    itemId: string,
    longitude: number,
    latitude: number,
  ): TilerPointsGetPoint;
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
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/\{tileMatrixSetId\}/tilejson.json' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/{tileMatrixSetId}/tilejson.json",
    collectionId: string,
    itemId: string,
    tileMatrixSetId: string,
  ): TilerTileJsonTileMatrixSetsGet;
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
  ): TilerTileMatrixSetsGetZxyScaleByFormat;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/\{tileMatrixSetId\}/WMTSCapabilities.xml' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/{tileMatrixSetId}/WMTSCapabilities.xml",
    collectionId: string,
    itemId: string,
    tileMatrixSetId: string,
  ): TilerWmtsTileMatrixSetsGetCapabilitiesXml;
  /** Resource for '/data/legend/classmap/\{classmapName\}' has methods for the following verbs: get */
  (
    path: "/data/legend/classmap/{classmapName}",
    classmapName: string,
  ): MapsClassMapLegendsGet;
  /** Resource for '/data/legend/interval/\{classmapName\}' has methods for the following verbs: get */
  (
    path: "/data/legend/interval/{classmapName}",
    classmapName: string,
  ): MapsIntervalLegendsGetByClassMapName;
  /** Resource for '/data/legend/colormap/\{colorMapName\}' has methods for the following verbs: get */
  (
    path: "/data/legend/colormap/{colorMapName}",
    colorMapName: string,
  ): MapsLegendsGet;
  /** Resource for '/data/mosaic/\{searchId\}/\{longitude\},\{latitude\}/assets' has methods for the following verbs: get */
  (
    path: "/data/mosaic/{searchId}/{longitude},{latitude}/assets",
    searchId: string,
    longitude: number,
    latitude: number,
  ): MosaicsAssetsForPointsGetPointAssets;
  /** Resource for '/data/mosaic/\{searchId\}/tiles/\{tileMatrixSetId\}/\{z\}/\{x\}/\{y\}/assets' has methods for the following verbs: get */
  (
    path: "/data/mosaic/{searchId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}/assets",
    searchId: string,
    tileMatrixSetId: string,
    z: number,
    x: number,
    y: number,
  ): MosaicsAssetsForTileMatrixSetsGetZxyAssets;
  /** Resource for '/data/mosaic/\{searchId\}/info' has methods for the following verbs: get */
  (
    path: "/data/mosaic/{searchId}/info",
    searchId: string,
  ): MosaicsInfoSearchGet;
  /** Resource for '/data/mosaic/register' has methods for the following verbs: post */
  (path: "/data/mosaic/register"): MosaicsRegisterSearchRegister;
  /** Resource for '/data/mosaic/\{searchId\}/\{tileMatrixSetId\}/tilejson.json' has methods for the following verbs: get */
  (
    path: "/data/mosaic/{searchId}/{tileMatrixSetId}/tilejson.json",
    searchId: string,
    tileMatrixSetId: string,
  ): MosaicsTileMatrixSetsTileJsonGet;
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
  ): MosaicsTileMatrixSetsGetZxyScaleByFormat;
  /** Resource for '/data/mosaic/\{searchId\}/\{tileMatrixSetId\}/WMTSCapabilities.xml' has methods for the following verbs: get */
  (
    path: "/data/mosaic/{searchId}/{tileMatrixSetId}/WMTSCapabilities.xml",
    searchId: string,
    tileMatrixSetId: string,
  ): MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml;
  /** Resource for '/sas/token/\{collectionId\}' has methods for the following verbs: get */
  (path: "/sas/token/{collectionId}", collectionId: string): SasGetToken;
  /** Resource for '/sas/token/revoke' has methods for the following verbs: post */
  (path: "/sas/token/revoke"): SasRevokeToken;
  /** Resource for '/sas/sign' has methods for the following verbs: get */
  (path: "/sas/sign"): SasGetSign;
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
  ): TilerTilesGetZxyScaleByFormat;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/tilejson.json' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/tilejson.json",
    collectionId: string,
    itemId: string,
  ): TilerTileJsonOperationsGet;
  /** Resource for '/data/collections/\{collectionId\}/items/\{itemId\}/WMTSCapabilities.xml' has methods for the following verbs: get */
  (
    path: "/data/collections/{collectionId}/items/{itemId}/WMTSCapabilities.xml",
    collectionId: string,
    itemId: string,
  ): TilerWmtsGetCapabilitiesXml;
  /** Resource for '/data/mosaic/\{searchId\}/tiles/\{z\}/\{x\}/\{y\}@\{scale\}x.\{format\}' has methods for the following verbs: get */
  (
    path: "/data/mosaic/{searchId}/tiles/{z}/{x}/{y}@{scale}x.{format}",
    searchId: string,
    z: number,
    x: number,
    y: number,
    scale: number,
    format: string,
  ): MosaicsTilesGetZxyScaleByFormat;
  /** Resource for '/data/mosaic/\{searchId\}/tilejson.json' has methods for the following verbs: get */
  (
    path: "/data/mosaic/{searchId}/tilejson.json",
    searchId: string,
  ): MosaicsTileJsonOperationsGet;
  /** Resource for '/data/mosaic/\{searchId\}/WMTSCapabilities.xml' has methods for the following verbs: get */
  (
    path: "/data/mosaic/{searchId}/WMTSCapabilities.xml",
    searchId: string,
  ): MosaicsWmtsMosaicsGetCapabilitiesXml;
  /** Resource for '/data/mosaic/\{searchId\}/tiles/\{z\}/\{x\}/\{y\}/assets' has methods for the following verbs: get */
  (
    path: "/data/mosaic/{searchId}/tiles/{z}/{x}/{y}/assets",
    searchId: string,
    z: number,
    x: number,
    y: number,
  ): MosaicsAssetsForTilesGetZxyAssets;
}

export type PlanetaryComputerClient = Client & {
  path: Routes;
};
