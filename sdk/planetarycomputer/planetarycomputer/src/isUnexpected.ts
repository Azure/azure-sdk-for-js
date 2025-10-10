// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
  IngestionsDeleteLogicalResponse,
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
  StacCollectionsCreateLogicalResponse,
  StacCollectionsCreateDefaultResponse,
  StacCollectionsGet200Response,
  StacCollectionsGetDefaultResponse,
  StacCollectionsCreateOrReplace200Response,
  StacCollectionsCreateOrReplaceLogicalResponse,
  StacCollectionsCreateOrReplaceDefaultResponse,
  StacCollectionsDelete202Response,
  StacCollectionsDeleteLogicalResponse,
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
  StacItemsCreateLogicalResponse,
  StacItemsCreateDefaultResponse,
  StacItemsGet200Response,
  StacItemsGetDefaultResponse,
  StacItemsCreateOrReplace202Response,
  StacItemsCreateOrReplaceLogicalResponse,
  StacItemsCreateOrReplaceDefaultResponse,
  StacItemsUpdate202Response,
  StacItemsUpdateLogicalResponse,
  StacItemsUpdateDefaultResponse,
  StacItemsDelete202Response,
  StacItemsDeleteLogicalResponse,
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

const responseMap: Record<string, string[]> = {
  "GET /inma/operations": ["200"],
  "DELETE /inma/operations": ["204"],
  "GET /inma/operations/{operationId}": ["200"],
  "DELETE /inma/operations/{operationId}": ["204"],
  "GET /inma/collections/{collectionId}/ingestions/{ingestionId}/runs": ["200"],
  "POST /inma/collections/{collectionId}/ingestions/{ingestionId}/runs": [
    "201",
  ],
  "GET /inma/collections/{collectionId}/ingestions/{ingestionId}/runs/{runId}":
    ["200"],
  "GET /inma/collections/{collectionId}/ingestions": ["200"],
  "POST /inma/collections/{collectionId}/ingestions": ["201"],
  "GET /inma/collections/{collectionId}/ingestions/{ingestionId}": ["200"],
  "PATCH /inma/collections/{collectionId}/ingestions/{ingestionId}": ["200"],
  "DELETE /inma/collections/{collectionId}/ingestions/{ingestionId}": ["202"],
  "GET /inma/ingestion-sources": ["200"],
  "POST /inma/ingestion-sources": ["201"],
  "GET /inma/ingestion-sources/{id}": ["200"],
  "PUT /inma/ingestion-sources/{id}": ["200", "201"],
  "DELETE /inma/ingestion-sources/{id}": ["204"],
  "GET /inma/ingestion-sources/managed-identities": ["200"],
  "POST /stac/collections/{collectionId}/assets": ["200", "201"],
  "PUT /stac/collections/{collectionId}/assets/{assetId}": ["200", "201"],
  "DELETE /stac/collections/{collectionId}/assets/{assetId}": ["200"],
  "GET /stac/collections/{collectionId}/configurations": ["200"],
  "GET /stac/collections/{collectionId}/configurations/mosaics": ["200"],
  "POST /stac/collections/{collectionId}/configurations/mosaics": [
    "200",
    "201",
  ],
  "GET /stac/collections/{collectionId}/configurations/mosaics/{mosaicId}": [
    "200",
  ],
  "PUT /stac/collections/{collectionId}/configurations/mosaics/{mosaicId}": [
    "200",
    "201",
  ],
  "DELETE /stac/collections/{collectionId}/configurations/mosaics/{mosaicId}": [
    "200",
  ],
  "GET /stac/collections": ["200"],
  "POST /stac/collections": ["202"],
  "GET /stac/collections/{collectionId}": ["200"],
  "PUT /stac/collections/{collectionId}": ["200"],
  "DELETE /stac/collections/{collectionId}": ["202"],
  "GET /stac/collections/{collectionId}/configurations/partition-type": ["200"],
  "PUT /stac/collections/{collectionId}/configurations/partition-type": [
    "200",
    "404",
  ],
  "GET /stac/collections/{collectionId}/configurations/render-options": ["200"],
  "POST /stac/collections/{collectionId}/configurations/render-options": [
    "200",
    "201",
  ],
  "GET /stac/collections/{collectionId}/configurations/render-options/{renderOptionId}":
    ["200"],
  "PUT /stac/collections/{collectionId}/configurations/render-options/{renderOptionId}":
    ["200", "201"],
  "DELETE /stac/collections/{collectionId}/configurations/render-options/{renderOptionId}":
    ["200"],
  "GET /stac/collections/{collectionId}/thumbnail": ["200"],
  "GET /stac/collections/{collectionId}/configurations/tile-settings": ["200"],
  "PUT /stac/collections/{collectionId}/configurations/tile-settings": ["200"],
  "GET /stac/conformance": ["200"],
  "GET /stac/collections/{collectionId}/items": ["200"],
  "POST /stac/collections/{collectionId}/items": ["202"],
  "GET /stac/collections/{collectionId}/items/{itemId}": ["200"],
  "PUT /stac/collections/{collectionId}/items/{itemId}": ["202"],
  "PATCH /stac/collections/{collectionId}/items/{itemId}": ["202"],
  "DELETE /stac/collections/{collectionId}/items/{itemId}": ["202"],
  "GET /stac": ["200"],
  "GET /stac/queryables": ["200"],
  "DELETE /stac/collections/{collectionId}/queryables/{queryableName}": ["200"],
  "PUT /stac/collections/{collectionId}/queryables/{queryableName}": [
    "200",
    "201",
  ],
  "GET /stac/collections/{collectionId}/queryables": ["200"],
  "POST /stac/collections/{collectionId}/queryables": ["201"],
  "GET /stac/search": ["200"],
  "POST /stac/search": ["200"],
  "GET /data/tile-matrix-sets/{tileMatrixSetId}": ["200"],
  "GET /data/tile-matrix-sets": ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/asset_statistics": [
    "200",
  ],
  "GET /data/collections/{collectionId}/items/{itemId}/assets": ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/bounds": ["200"],
  "POST /data/collections/{collectionId}/items/{itemId}/crop/{width}x{height}.{format}":
    ["200"],
  "POST /data/collections/{collectionId}/items/{itemId}/crop.{format}": ["200"],
  "POST /data/collections/{collectionId}/items/{itemId}/statistics": ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/statistics": ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/info.geojson": ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/info": ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/crop/{minx},{miny},{maxx},{maxy}/{width}x{height}.{format}":
    ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/crop/{minx},{miny},{maxx},{maxy}.{format}":
    ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/point/{longitude},{latitude}":
    ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/preview.{format}": [
    "200",
  ],
  "GET /data/collections/{collectionId}/items/{itemId}/preview": ["200"],
  "POST /data/collections/{collectionId}/image/static": ["200"],
  "GET /data/collections/{collectionId}/image/static/{id}": ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/{tileMatrixSetId}/tilejson.json":
    ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}@{scale}x.{format}":
    ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/{tileMatrixSetId}/WMTSCapabilities.xml":
    ["200"],
  "GET /data/legend/classmap/{classmapName}": ["200"],
  "GET /data/legend/interval/{classmapName}": ["200"],
  "GET /data/legend/colormap/{colorMapName}": ["200"],
  "GET /data/mosaic/{searchId}/{longitude},{latitude}/assets": ["200"],
  "GET /data/mosaic/{searchId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}/assets": [
    "200",
  ],
  "GET /data/mosaic/{searchId}/info": ["200"],
  "POST /data/mosaic/register": ["200"],
  "GET /data/mosaic/{searchId}/{tileMatrixSetId}/tilejson.json": ["200"],
  "GET /data/mosaic/{searchId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}@{scale}x.{format}":
    ["200"],
  "GET /data/mosaic/{searchId}/{tileMatrixSetId}/WMTSCapabilities.xml": ["200"],
  "GET /sas/token/{collectionId}": ["200"],
  "POST /sas/token/revoke": ["200"],
  "GET /sas/sign": ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/tiles/{z}/{x}/{y}@{scale}x.{format}":
    ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/tilejson.json": ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/WMTSCapabilities.xml": [
    "200",
  ],
  "GET /data/mosaic/{searchId}/tiles/{z}/{x}/{y}@{scale}x.{format}": ["200"],
  "GET /data/mosaic/{searchId}/tilejson.json": ["200"],
  "GET /data/mosaic/{searchId}/WMTSCapabilities.xml": ["200"],
  "GET /data/mosaic/{searchId}/tiles/{z}/{x}/{y}/assets": ["200"],
};

export function isUnexpected(
  response:
    | IngestionOperationsList200Response
    | IngestionOperationsListDefaultResponse,
): response is IngestionOperationsListDefaultResponse;
export function isUnexpected(
  response:
    | IngestionOperationsDeleteAll204Response
    | IngestionOperationsDeleteAllDefaultResponse,
): response is IngestionOperationsDeleteAllDefaultResponse;
export function isUnexpected(
  response:
    | IngestionOperationsGet200Response
    | IngestionOperationsGetDefaultResponse,
): response is IngestionOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | IngestionOperationsDelete204Response
    | IngestionOperationsDeleteDefaultResponse,
): response is IngestionOperationsDeleteDefaultResponse;
export function isUnexpected(
  response: IngestionRunsList200Response | IngestionRunsListDefaultResponse,
): response is IngestionRunsListDefaultResponse;
export function isUnexpected(
  response: IngestionRunsCreate201Response | IngestionRunsCreateDefaultResponse,
): response is IngestionRunsCreateDefaultResponse;
export function isUnexpected(
  response: IngestionRunsGet200Response | IngestionRunsGetDefaultResponse,
): response is IngestionRunsGetDefaultResponse;
export function isUnexpected(
  response: IngestionsList200Response | IngestionsListDefaultResponse,
): response is IngestionsListDefaultResponse;
export function isUnexpected(
  response: IngestionsCreate201Response | IngestionsCreateDefaultResponse,
): response is IngestionsCreateDefaultResponse;
export function isUnexpected(
  response: IngestionsGet200Response | IngestionsGetDefaultResponse,
): response is IngestionsGetDefaultResponse;
export function isUnexpected(
  response: IngestionsUpdate200Response | IngestionsUpdateDefaultResponse,
): response is IngestionsUpdateDefaultResponse;
export function isUnexpected(
  response:
    | IngestionsDelete202Response
    | IngestionsDeleteLogicalResponse
    | IngestionsDeleteDefaultResponse,
): response is IngestionsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | IngestionSourcesList200Response
    | IngestionSourcesListDefaultResponse,
): response is IngestionSourcesListDefaultResponse;
export function isUnexpected(
  response:
    | IngestionSourcesCreate201Response
    | IngestionSourcesCreateDefaultResponse,
): response is IngestionSourcesCreateDefaultResponse;
export function isUnexpected(
  response: IngestionSourcesGet200Response | IngestionSourcesGetDefaultResponse,
): response is IngestionSourcesGetDefaultResponse;
export function isUnexpected(
  response:
    | IngestionSourcesCreateOrReplace200Response
    | IngestionSourcesCreateOrReplace201Response
    | IngestionSourcesCreateOrReplaceDefaultResponse,
): response is IngestionSourcesCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response:
    | IngestionSourcesDelete204Response
    | IngestionSourcesDeleteDefaultResponse,
): response is IngestionSourcesDeleteDefaultResponse;
export function isUnexpected(
  response:
    | IngestionSourcesListManagedIdentities200Response
    | IngestionSourcesListManagedIdentitiesDefaultResponse,
): response is IngestionSourcesListManagedIdentitiesDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionAssetsCreate200Response
    | StacCollectionAssetsCreate201Response
    | StacCollectionAssetsCreateDefaultResponse,
): response is StacCollectionAssetsCreateDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionAssetsCreateOrReplace200Response
    | StacCollectionAssetsCreateOrReplace201Response
    | StacCollectionAssetsCreateOrReplaceDefaultResponse,
): response is StacCollectionAssetsCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionAssetsDelete200Response
    | StacCollectionAssetsDeleteDefaultResponse,
): response is StacCollectionAssetsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionConfigGet200Response
    | StacCollectionConfigGetDefaultResponse,
): response is StacCollectionConfigGetDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionMosaicsGetAll200Response
    | StacCollectionMosaicsGetAllDefaultResponse,
): response is StacCollectionMosaicsGetAllDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionMosaicsAdd200Response
    | StacCollectionMosaicsAdd201Response
    | StacCollectionMosaicsAddDefaultResponse,
): response is StacCollectionMosaicsAddDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionMosaicsGet200Response
    | StacCollectionMosaicsGetDefaultResponse,
): response is StacCollectionMosaicsGetDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionMosaicsCreateOrReplace200Response
    | StacCollectionMosaicsCreateOrReplace201Response
    | StacCollectionMosaicsCreateOrReplaceDefaultResponse,
): response is StacCollectionMosaicsCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionMosaicsDelete200Response
    | StacCollectionMosaicsDeleteDefaultResponse,
): response is StacCollectionMosaicsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionsGetAll200Response
    | StacCollectionsGetAllDefaultResponse,
): response is StacCollectionsGetAllDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionsCreate202Response
    | StacCollectionsCreateLogicalResponse
    | StacCollectionsCreateDefaultResponse,
): response is StacCollectionsCreateDefaultResponse;
export function isUnexpected(
  response: StacCollectionsGet200Response | StacCollectionsGetDefaultResponse,
): response is StacCollectionsGetDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionsCreateOrReplace200Response
    | StacCollectionsCreateOrReplaceLogicalResponse
    | StacCollectionsCreateOrReplaceDefaultResponse,
): response is StacCollectionsCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionsDelete202Response
    | StacCollectionsDeleteLogicalResponse
    | StacCollectionsDeleteDefaultResponse,
): response is StacCollectionsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionPartitionTypesGet200Response
    | StacCollectionPartitionTypesGetDefaultResponse,
): response is StacCollectionPartitionTypesGetDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionPartitionTypesReplace200Response
    | StacCollectionPartitionTypesReplace404Response
    | StacCollectionPartitionTypesReplaceDefaultResponse,
): response is StacCollectionPartitionTypesReplaceDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionRenderOptionsGetAll200Response
    | StacCollectionRenderOptionsGetAllDefaultResponse,
): response is StacCollectionRenderOptionsGetAllDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionRenderOptionsCreate200Response
    | StacCollectionRenderOptionsCreate201Response
    | StacCollectionRenderOptionsCreateDefaultResponse,
): response is StacCollectionRenderOptionsCreateDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionRenderOptionsGet200Response
    | StacCollectionRenderOptionsGetDefaultResponse,
): response is StacCollectionRenderOptionsGetDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionRenderOptionsCreateOrReplace200Response
    | StacCollectionRenderOptionsCreateOrReplace201Response
    | StacCollectionRenderOptionsCreateOrReplaceDefaultResponse,
): response is StacCollectionRenderOptionsCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionRenderOptionsDelete200Response
    | StacCollectionRenderOptionsDeleteDefaultResponse,
): response is StacCollectionRenderOptionsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionThumbnailsGet200Response
    | StacCollectionThumbnailsGetDefaultResponse,
): response is StacCollectionThumbnailsGetDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionTileSettingsGet200Response
    | StacCollectionTileSettingsGetDefaultResponse,
): response is StacCollectionTileSettingsGetDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionTileSettingsReplace200Response
    | StacCollectionTileSettingsReplaceDefaultResponse,
): response is StacCollectionTileSettingsReplaceDefaultResponse;
export function isUnexpected(
  response:
    | StacConformanceClassGet200Response
    | StacConformanceClassGetDefaultResponse,
): response is StacConformanceClassGetDefaultResponse;
export function isUnexpected(
  response:
    | StacItemsGetFeatures200Response
    | StacItemsGetFeaturesDefaultResponse,
): response is StacItemsGetFeaturesDefaultResponse;
export function isUnexpected(
  response:
    | StacItemsCreate202Response
    | StacItemsCreateLogicalResponse
    | StacItemsCreateDefaultResponse,
): response is StacItemsCreateDefaultResponse;
export function isUnexpected(
  response: StacItemsGet200Response | StacItemsGetDefaultResponse,
): response is StacItemsGetDefaultResponse;
export function isUnexpected(
  response:
    | StacItemsCreateOrReplace202Response
    | StacItemsCreateOrReplaceLogicalResponse
    | StacItemsCreateOrReplaceDefaultResponse,
): response is StacItemsCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response:
    | StacItemsUpdate202Response
    | StacItemsUpdateLogicalResponse
    | StacItemsUpdateDefaultResponse,
): response is StacItemsUpdateDefaultResponse;
export function isUnexpected(
  response:
    | StacItemsDelete202Response
    | StacItemsDeleteLogicalResponse
    | StacItemsDeleteDefaultResponse,
): response is StacItemsDeleteDefaultResponse;
export function isUnexpected(
  response: StacLandingPagesGet200Response | StacLandingPagesGetDefaultResponse,
): response is StacLandingPagesGetDefaultResponse;
export function isUnexpected(
  response:
    | StacQueryablesGetAll200Response
    | StacQueryablesGetAllDefaultResponse,
): response is StacQueryablesGetAllDefaultResponse;
export function isUnexpected(
  response:
    | StacQueryablesDelete200Response
    | StacQueryablesDeleteDefaultResponse,
): response is StacQueryablesDeleteDefaultResponse;
export function isUnexpected(
  response:
    | StacQueryablesCreateOrReplace200Response
    | StacQueryablesCreateOrReplace201Response
    | StacQueryablesCreateOrReplaceDefaultResponse,
): response is StacQueryablesCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response:
    | StacQueryablesGetAllByCollection200Response
    | StacQueryablesGetAllByCollectionDefaultResponse,
): response is StacQueryablesGetAllByCollectionDefaultResponse;
export function isUnexpected(
  response:
    | StacQueryablesCreate201Response
    | StacQueryablesCreateDefaultResponse,
): response is StacQueryablesCreateDefaultResponse;
export function isUnexpected(
  response: StacSearchGet200Response | StacSearchGetDefaultResponse,
): response is StacSearchGetDefaultResponse;
export function isUnexpected(
  response: StacSearchCreate200Response | StacSearchCreateDefaultResponse,
): response is StacSearchCreateDefaultResponse;
export function isUnexpected(
  response:
    | TileMatrixDefinitionsGet200Response
    | TileMatrixDefinitionsGetDefaultResponse,
): response is TileMatrixDefinitionsGetDefaultResponse;
export function isUnexpected(
  response: TileMatrixListGet200Response | TileMatrixListGetDefaultResponse,
): response is TileMatrixListGetDefaultResponse;
export function isUnexpected(
  response:
    | TilerAssetStatisticsGetAll200Response
    | TilerAssetStatisticsGetAllDefaultResponse,
): response is TilerAssetStatisticsGetAllDefaultResponse;
export function isUnexpected(
  response:
    | TilerAvailableAssetsGetAll200Response
    | TilerAvailableAssetsGetAllDefaultResponse,
): response is TilerAvailableAssetsGetAllDefaultResponse;
export function isUnexpected(
  response: TilerBoundGetAll200Response | TilerBoundGetAllDefaultResponse,
): response is TilerBoundGetAllDefaultResponse;
export function isUnexpected(
  response:
    | TilerGeoJsonsCropWidthByHeightFormat200Response
    | TilerGeoJsonsCropWidthByHeightFormatDefaultResponse,
): response is TilerGeoJsonsCropWidthByHeightFormatDefaultResponse;
export function isUnexpected(
  response:
    | TilerGeoJsonsCropFormat200Response
    | TilerGeoJsonsCropFormatDefaultResponse,
): response is TilerGeoJsonsCropFormatDefaultResponse;
export function isUnexpected(
  response:
    | TilerGeoJsonStatisticsGetAll200Response
    | TilerGeoJsonStatisticsGetAllDefaultResponse,
): response is TilerGeoJsonStatisticsGetAllDefaultResponse;
export function isUnexpected(
  response:
    | TilerStatisticsGetAll200Response
    | TilerStatisticsGetAllDefaultResponse,
): response is TilerStatisticsGetAllDefaultResponse;
export function isUnexpected(
  response:
    | TilerInfoGeoJsonOperationsGet200Response
    | TilerInfoGeoJsonOperationsGetDefaultResponse,
): response is TilerInfoGeoJsonOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | TilerInfoOperationsGet200Response
    | TilerInfoOperationsGetDefaultResponse,
): response is TilerInfoOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | TilerPartsGetCroppedToBoundingBoxWidthByHeight200Response
    | TilerPartsGetCroppedToBoundingBoxWidthByHeightDefaultResponse,
): response is TilerPartsGetCroppedToBoundingBoxWidthByHeightDefaultResponse;
export function isUnexpected(
  response:
    | TilerPartsGetCroppedToBoundingBox200Response
    | TilerPartsGetCroppedToBoundingBoxDefaultResponse,
): response is TilerPartsGetCroppedToBoundingBoxDefaultResponse;
export function isUnexpected(
  response: TilerPointsGetPoint200Response | TilerPointsGetPointDefaultResponse,
): response is TilerPointsGetPointDefaultResponse;
export function isUnexpected(
  response:
    | TilerPreviewsGetFormat200Response
    | TilerPreviewsGetFormatDefaultResponse,
): response is TilerPreviewsGetFormatDefaultResponse;
export function isUnexpected(
  response: TilerPreviewsGet200Response | TilerPreviewsGetDefaultResponse,
): response is TilerPreviewsGetDefaultResponse;
export function isUnexpected(
  response:
    | TilerStaticImagesCreate200Response
    | TilerStaticImagesCreateDefaultResponse,
): response is TilerStaticImagesCreateDefaultResponse;
export function isUnexpected(
  response:
    | TilerStaticImagesGet200Response
    | TilerStaticImagesGetDefaultResponse,
): response is TilerStaticImagesGetDefaultResponse;
export function isUnexpected(
  response:
    | TilerTileJsonTileMatrixSetsGet200Response
    | TilerTileJsonTileMatrixSetsGetDefaultResponse,
): response is TilerTileJsonTileMatrixSetsGetDefaultResponse;
export function isUnexpected(
  response:
    | TilerTileMatrixSetsGetZxyScaleByFormat200Response
    | TilerTileMatrixSetsGetZxyScaleByFormatDefaultResponse,
): response is TilerTileMatrixSetsGetZxyScaleByFormatDefaultResponse;
export function isUnexpected(
  response:
    | TilerWmtsTileMatrixSetsGetCapabilitiesXml200Response
    | TilerWmtsTileMatrixSetsGetCapabilitiesXmlDefaultResponse,
): response is TilerWmtsTileMatrixSetsGetCapabilitiesXmlDefaultResponse;
export function isUnexpected(
  response:
    | MapsClassMapLegendsGet200Response
    | MapsClassMapLegendsGetDefaultResponse,
): response is MapsClassMapLegendsGetDefaultResponse;
export function isUnexpected(
  response:
    | MapsIntervalLegendsGetByClassMapName200Response
    | MapsIntervalLegendsGetByClassMapNameDefaultResponse,
): response is MapsIntervalLegendsGetByClassMapNameDefaultResponse;
export function isUnexpected(
  response: MapsLegendsGet200Response | MapsLegendsGetDefaultResponse,
): response is MapsLegendsGetDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsAssetsForPointsGetPointAssets200Response
    | MosaicsAssetsForPointsGetPointAssetsDefaultResponse,
): response is MosaicsAssetsForPointsGetPointAssetsDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsAssetsForTileMatrixSetsGetZxyAssets200Response
    | MosaicsAssetsForTileMatrixSetsGetZxyAssetsDefaultResponse,
): response is MosaicsAssetsForTileMatrixSetsGetZxyAssetsDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsInfoSearchGet200Response
    | MosaicsInfoSearchGetDefaultResponse,
): response is MosaicsInfoSearchGetDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsRegisterSearchRegister200Response
    | MosaicsRegisterSearchRegisterDefaultResponse,
): response is MosaicsRegisterSearchRegisterDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsTileMatrixSetsTileJsonGet200Response
    | MosaicsTileMatrixSetsTileJsonGetDefaultResponse,
): response is MosaicsTileMatrixSetsTileJsonGetDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsTileMatrixSetsGetZxyScaleByFormat200Response
    | MosaicsTileMatrixSetsGetZxyScaleByFormatDefaultResponse,
): response is MosaicsTileMatrixSetsGetZxyScaleByFormatDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml200Response
    | MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlDefaultResponse,
): response is MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlDefaultResponse;
export function isUnexpected(
  response: SasGetToken200Response | SasGetTokenDefaultResponse,
): response is SasGetTokenDefaultResponse;
export function isUnexpected(
  response: SasRevokeToken200Response | SasRevokeTokenDefaultResponse,
): response is SasRevokeTokenDefaultResponse;
export function isUnexpected(
  response: SasGetSign200Response | SasGetSignDefaultResponse,
): response is SasGetSignDefaultResponse;
export function isUnexpected(
  response:
    | TilerTilesGetZxyScaleByFormat200Response
    | TilerTilesGetZxyScaleByFormatDefaultResponse,
): response is TilerTilesGetZxyScaleByFormatDefaultResponse;
export function isUnexpected(
  response:
    | TilerTileJsonOperationsGet200Response
    | TilerTileJsonOperationsGetDefaultResponse,
): response is TilerTileJsonOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | TilerWmtsGetCapabilitiesXml200Response
    | TilerWmtsGetCapabilitiesXmlDefaultResponse,
): response is TilerWmtsGetCapabilitiesXmlDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsTilesGetZxyScaleByFormat200Response
    | MosaicsTilesGetZxyScaleByFormatDefaultResponse,
): response is MosaicsTilesGetZxyScaleByFormatDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsTileJsonOperationsGet200Response
    | MosaicsTileJsonOperationsGetDefaultResponse,
): response is MosaicsTileJsonOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsWmtsMosaicsGetCapabilitiesXml200Response
    | MosaicsWmtsMosaicsGetCapabilitiesXmlDefaultResponse,
): response is MosaicsWmtsMosaicsGetCapabilitiesXmlDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsAssetsForTilesGetZxyAssets200Response
    | MosaicsAssetsForTilesGetZxyAssetsDefaultResponse,
): response is MosaicsAssetsForTilesGetZxyAssetsDefaultResponse;
export function isUnexpected(
  response:
    | IngestionOperationsList200Response
    | IngestionOperationsListDefaultResponse
    | IngestionOperationsDeleteAll204Response
    | IngestionOperationsDeleteAllDefaultResponse
    | IngestionOperationsGet200Response
    | IngestionOperationsGetDefaultResponse
    | IngestionOperationsDelete204Response
    | IngestionOperationsDeleteDefaultResponse
    | IngestionRunsList200Response
    | IngestionRunsListDefaultResponse
    | IngestionRunsCreate201Response
    | IngestionRunsCreateDefaultResponse
    | IngestionRunsGet200Response
    | IngestionRunsGetDefaultResponse
    | IngestionsList200Response
    | IngestionsListDefaultResponse
    | IngestionsCreate201Response
    | IngestionsCreateDefaultResponse
    | IngestionsGet200Response
    | IngestionsGetDefaultResponse
    | IngestionsUpdate200Response
    | IngestionsUpdateDefaultResponse
    | IngestionsDelete202Response
    | IngestionsDeleteLogicalResponse
    | IngestionsDeleteDefaultResponse
    | IngestionSourcesList200Response
    | IngestionSourcesListDefaultResponse
    | IngestionSourcesCreate201Response
    | IngestionSourcesCreateDefaultResponse
    | IngestionSourcesGet200Response
    | IngestionSourcesGetDefaultResponse
    | IngestionSourcesCreateOrReplace200Response
    | IngestionSourcesCreateOrReplace201Response
    | IngestionSourcesCreateOrReplaceDefaultResponse
    | IngestionSourcesDelete204Response
    | IngestionSourcesDeleteDefaultResponse
    | IngestionSourcesListManagedIdentities200Response
    | IngestionSourcesListManagedIdentitiesDefaultResponse
    | StacCollectionAssetsCreate200Response
    | StacCollectionAssetsCreate201Response
    | StacCollectionAssetsCreateDefaultResponse
    | StacCollectionAssetsCreateOrReplace200Response
    | StacCollectionAssetsCreateOrReplace201Response
    | StacCollectionAssetsCreateOrReplaceDefaultResponse
    | StacCollectionAssetsDelete200Response
    | StacCollectionAssetsDeleteDefaultResponse
    | StacCollectionConfigGet200Response
    | StacCollectionConfigGetDefaultResponse
    | StacCollectionMosaicsGetAll200Response
    | StacCollectionMosaicsGetAllDefaultResponse
    | StacCollectionMosaicsAdd200Response
    | StacCollectionMosaicsAdd201Response
    | StacCollectionMosaicsAddDefaultResponse
    | StacCollectionMosaicsGet200Response
    | StacCollectionMosaicsGetDefaultResponse
    | StacCollectionMosaicsCreateOrReplace200Response
    | StacCollectionMosaicsCreateOrReplace201Response
    | StacCollectionMosaicsCreateOrReplaceDefaultResponse
    | StacCollectionMosaicsDelete200Response
    | StacCollectionMosaicsDeleteDefaultResponse
    | StacCollectionsGetAll200Response
    | StacCollectionsGetAllDefaultResponse
    | StacCollectionsCreate202Response
    | StacCollectionsCreateLogicalResponse
    | StacCollectionsCreateDefaultResponse
    | StacCollectionsGet200Response
    | StacCollectionsGetDefaultResponse
    | StacCollectionsCreateOrReplace200Response
    | StacCollectionsCreateOrReplaceLogicalResponse
    | StacCollectionsCreateOrReplaceDefaultResponse
    | StacCollectionsDelete202Response
    | StacCollectionsDeleteLogicalResponse
    | StacCollectionsDeleteDefaultResponse
    | StacCollectionPartitionTypesGet200Response
    | StacCollectionPartitionTypesGetDefaultResponse
    | StacCollectionPartitionTypesReplace200Response
    | StacCollectionPartitionTypesReplace404Response
    | StacCollectionPartitionTypesReplaceDefaultResponse
    | StacCollectionRenderOptionsGetAll200Response
    | StacCollectionRenderOptionsGetAllDefaultResponse
    | StacCollectionRenderOptionsCreate200Response
    | StacCollectionRenderOptionsCreate201Response
    | StacCollectionRenderOptionsCreateDefaultResponse
    | StacCollectionRenderOptionsGet200Response
    | StacCollectionRenderOptionsGetDefaultResponse
    | StacCollectionRenderOptionsCreateOrReplace200Response
    | StacCollectionRenderOptionsCreateOrReplace201Response
    | StacCollectionRenderOptionsCreateOrReplaceDefaultResponse
    | StacCollectionRenderOptionsDelete200Response
    | StacCollectionRenderOptionsDeleteDefaultResponse
    | StacCollectionThumbnailsGet200Response
    | StacCollectionThumbnailsGetDefaultResponse
    | StacCollectionTileSettingsGet200Response
    | StacCollectionTileSettingsGetDefaultResponse
    | StacCollectionTileSettingsReplace200Response
    | StacCollectionTileSettingsReplaceDefaultResponse
    | StacConformanceClassGet200Response
    | StacConformanceClassGetDefaultResponse
    | StacItemsGetFeatures200Response
    | StacItemsGetFeaturesDefaultResponse
    | StacItemsCreate202Response
    | StacItemsCreateLogicalResponse
    | StacItemsCreateDefaultResponse
    | StacItemsGet200Response
    | StacItemsGetDefaultResponse
    | StacItemsCreateOrReplace202Response
    | StacItemsCreateOrReplaceLogicalResponse
    | StacItemsCreateOrReplaceDefaultResponse
    | StacItemsUpdate202Response
    | StacItemsUpdateLogicalResponse
    | StacItemsUpdateDefaultResponse
    | StacItemsDelete202Response
    | StacItemsDeleteLogicalResponse
    | StacItemsDeleteDefaultResponse
    | StacLandingPagesGet200Response
    | StacLandingPagesGetDefaultResponse
    | StacQueryablesGetAll200Response
    | StacQueryablesGetAllDefaultResponse
    | StacQueryablesDelete200Response
    | StacQueryablesDeleteDefaultResponse
    | StacQueryablesCreateOrReplace200Response
    | StacQueryablesCreateOrReplace201Response
    | StacQueryablesCreateOrReplaceDefaultResponse
    | StacQueryablesGetAllByCollection200Response
    | StacQueryablesGetAllByCollectionDefaultResponse
    | StacQueryablesCreate201Response
    | StacQueryablesCreateDefaultResponse
    | StacSearchGet200Response
    | StacSearchGetDefaultResponse
    | StacSearchCreate200Response
    | StacSearchCreateDefaultResponse
    | TileMatrixDefinitionsGet200Response
    | TileMatrixDefinitionsGetDefaultResponse
    | TileMatrixListGet200Response
    | TileMatrixListGetDefaultResponse
    | TilerAssetStatisticsGetAll200Response
    | TilerAssetStatisticsGetAllDefaultResponse
    | TilerAvailableAssetsGetAll200Response
    | TilerAvailableAssetsGetAllDefaultResponse
    | TilerBoundGetAll200Response
    | TilerBoundGetAllDefaultResponse
    | TilerGeoJsonsCropWidthByHeightFormat200Response
    | TilerGeoJsonsCropWidthByHeightFormatDefaultResponse
    | TilerGeoJsonsCropFormat200Response
    | TilerGeoJsonsCropFormatDefaultResponse
    | TilerGeoJsonStatisticsGetAll200Response
    | TilerGeoJsonStatisticsGetAllDefaultResponse
    | TilerStatisticsGetAll200Response
    | TilerStatisticsGetAllDefaultResponse
    | TilerInfoGeoJsonOperationsGet200Response
    | TilerInfoGeoJsonOperationsGetDefaultResponse
    | TilerInfoOperationsGet200Response
    | TilerInfoOperationsGetDefaultResponse
    | TilerPartsGetCroppedToBoundingBoxWidthByHeight200Response
    | TilerPartsGetCroppedToBoundingBoxWidthByHeightDefaultResponse
    | TilerPartsGetCroppedToBoundingBox200Response
    | TilerPartsGetCroppedToBoundingBoxDefaultResponse
    | TilerPointsGetPoint200Response
    | TilerPointsGetPointDefaultResponse
    | TilerPreviewsGetFormat200Response
    | TilerPreviewsGetFormatDefaultResponse
    | TilerPreviewsGet200Response
    | TilerPreviewsGetDefaultResponse
    | TilerStaticImagesCreate200Response
    | TilerStaticImagesCreateDefaultResponse
    | TilerStaticImagesGet200Response
    | TilerStaticImagesGetDefaultResponse
    | TilerTileJsonTileMatrixSetsGet200Response
    | TilerTileJsonTileMatrixSetsGetDefaultResponse
    | TilerTileMatrixSetsGetZxyScaleByFormat200Response
    | TilerTileMatrixSetsGetZxyScaleByFormatDefaultResponse
    | TilerWmtsTileMatrixSetsGetCapabilitiesXml200Response
    | TilerWmtsTileMatrixSetsGetCapabilitiesXmlDefaultResponse
    | MapsClassMapLegendsGet200Response
    | MapsClassMapLegendsGetDefaultResponse
    | MapsIntervalLegendsGetByClassMapName200Response
    | MapsIntervalLegendsGetByClassMapNameDefaultResponse
    | MapsLegendsGet200Response
    | MapsLegendsGetDefaultResponse
    | MosaicsAssetsForPointsGetPointAssets200Response
    | MosaicsAssetsForPointsGetPointAssetsDefaultResponse
    | MosaicsAssetsForTileMatrixSetsGetZxyAssets200Response
    | MosaicsAssetsForTileMatrixSetsGetZxyAssetsDefaultResponse
    | MosaicsInfoSearchGet200Response
    | MosaicsInfoSearchGetDefaultResponse
    | MosaicsRegisterSearchRegister200Response
    | MosaicsRegisterSearchRegisterDefaultResponse
    | MosaicsTileMatrixSetsTileJsonGet200Response
    | MosaicsTileMatrixSetsTileJsonGetDefaultResponse
    | MosaicsTileMatrixSetsGetZxyScaleByFormat200Response
    | MosaicsTileMatrixSetsGetZxyScaleByFormatDefaultResponse
    | MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml200Response
    | MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlDefaultResponse
    | SasGetToken200Response
    | SasGetTokenDefaultResponse
    | SasRevokeToken200Response
    | SasRevokeTokenDefaultResponse
    | SasGetSign200Response
    | SasGetSignDefaultResponse
    | TilerTilesGetZxyScaleByFormat200Response
    | TilerTilesGetZxyScaleByFormatDefaultResponse
    | TilerTileJsonOperationsGet200Response
    | TilerTileJsonOperationsGetDefaultResponse
    | TilerWmtsGetCapabilitiesXml200Response
    | TilerWmtsGetCapabilitiesXmlDefaultResponse
    | MosaicsTilesGetZxyScaleByFormat200Response
    | MosaicsTilesGetZxyScaleByFormatDefaultResponse
    | MosaicsTileJsonOperationsGet200Response
    | MosaicsTileJsonOperationsGetDefaultResponse
    | MosaicsWmtsMosaicsGetCapabilitiesXml200Response
    | MosaicsWmtsMosaicsGetCapabilitiesXmlDefaultResponse
    | MosaicsAssetsForTilesGetZxyAssets200Response
    | MosaicsAssetsForTilesGetZxyAssetsDefaultResponse,
): response is
  | IngestionOperationsListDefaultResponse
  | IngestionOperationsDeleteAllDefaultResponse
  | IngestionOperationsGetDefaultResponse
  | IngestionOperationsDeleteDefaultResponse
  | IngestionRunsListDefaultResponse
  | IngestionRunsCreateDefaultResponse
  | IngestionRunsGetDefaultResponse
  | IngestionsListDefaultResponse
  | IngestionsCreateDefaultResponse
  | IngestionsGetDefaultResponse
  | IngestionsUpdateDefaultResponse
  | IngestionsDeleteDefaultResponse
  | IngestionSourcesListDefaultResponse
  | IngestionSourcesCreateDefaultResponse
  | IngestionSourcesGetDefaultResponse
  | IngestionSourcesCreateOrReplaceDefaultResponse
  | IngestionSourcesDeleteDefaultResponse
  | IngestionSourcesListManagedIdentitiesDefaultResponse
  | StacCollectionAssetsCreateDefaultResponse
  | StacCollectionAssetsCreateOrReplaceDefaultResponse
  | StacCollectionAssetsDeleteDefaultResponse
  | StacCollectionConfigGetDefaultResponse
  | StacCollectionMosaicsGetAllDefaultResponse
  | StacCollectionMosaicsAddDefaultResponse
  | StacCollectionMosaicsGetDefaultResponse
  | StacCollectionMosaicsCreateOrReplaceDefaultResponse
  | StacCollectionMosaicsDeleteDefaultResponse
  | StacCollectionsGetAllDefaultResponse
  | StacCollectionsCreateDefaultResponse
  | StacCollectionsGetDefaultResponse
  | StacCollectionsCreateOrReplaceDefaultResponse
  | StacCollectionsDeleteDefaultResponse
  | StacCollectionPartitionTypesGetDefaultResponse
  | StacCollectionPartitionTypesReplaceDefaultResponse
  | StacCollectionRenderOptionsGetAllDefaultResponse
  | StacCollectionRenderOptionsCreateDefaultResponse
  | StacCollectionRenderOptionsGetDefaultResponse
  | StacCollectionRenderOptionsCreateOrReplaceDefaultResponse
  | StacCollectionRenderOptionsDeleteDefaultResponse
  | StacCollectionThumbnailsGetDefaultResponse
  | StacCollectionTileSettingsGetDefaultResponse
  | StacCollectionTileSettingsReplaceDefaultResponse
  | StacConformanceClassGetDefaultResponse
  | StacItemsGetFeaturesDefaultResponse
  | StacItemsCreateDefaultResponse
  | StacItemsGetDefaultResponse
  | StacItemsCreateOrReplaceDefaultResponse
  | StacItemsUpdateDefaultResponse
  | StacItemsDeleteDefaultResponse
  | StacLandingPagesGetDefaultResponse
  | StacQueryablesGetAllDefaultResponse
  | StacQueryablesDeleteDefaultResponse
  | StacQueryablesCreateOrReplaceDefaultResponse
  | StacQueryablesGetAllByCollectionDefaultResponse
  | StacQueryablesCreateDefaultResponse
  | StacSearchGetDefaultResponse
  | StacSearchCreateDefaultResponse
  | TileMatrixDefinitionsGetDefaultResponse
  | TileMatrixListGetDefaultResponse
  | TilerAssetStatisticsGetAllDefaultResponse
  | TilerAvailableAssetsGetAllDefaultResponse
  | TilerBoundGetAllDefaultResponse
  | TilerGeoJsonsCropWidthByHeightFormatDefaultResponse
  | TilerGeoJsonsCropFormatDefaultResponse
  | TilerGeoJsonStatisticsGetAllDefaultResponse
  | TilerStatisticsGetAllDefaultResponse
  | TilerInfoGeoJsonOperationsGetDefaultResponse
  | TilerInfoOperationsGetDefaultResponse
  | TilerPartsGetCroppedToBoundingBoxWidthByHeightDefaultResponse
  | TilerPartsGetCroppedToBoundingBoxDefaultResponse
  | TilerPointsGetPointDefaultResponse
  | TilerPreviewsGetFormatDefaultResponse
  | TilerPreviewsGetDefaultResponse
  | TilerStaticImagesCreateDefaultResponse
  | TilerStaticImagesGetDefaultResponse
  | TilerTileJsonTileMatrixSetsGetDefaultResponse
  | TilerTileMatrixSetsGetZxyScaleByFormatDefaultResponse
  | TilerWmtsTileMatrixSetsGetCapabilitiesXmlDefaultResponse
  | MapsClassMapLegendsGetDefaultResponse
  | MapsIntervalLegendsGetByClassMapNameDefaultResponse
  | MapsLegendsGetDefaultResponse
  | MosaicsAssetsForPointsGetPointAssetsDefaultResponse
  | MosaicsAssetsForTileMatrixSetsGetZxyAssetsDefaultResponse
  | MosaicsInfoSearchGetDefaultResponse
  | MosaicsRegisterSearchRegisterDefaultResponse
  | MosaicsTileMatrixSetsTileJsonGetDefaultResponse
  | MosaicsTileMatrixSetsGetZxyScaleByFormatDefaultResponse
  | MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlDefaultResponse
  | SasGetTokenDefaultResponse
  | SasRevokeTokenDefaultResponse
  | SasGetSignDefaultResponse
  | TilerTilesGetZxyScaleByFormatDefaultResponse
  | TilerTileJsonOperationsGetDefaultResponse
  | TilerWmtsGetCapabilitiesXmlDefaultResponse
  | MosaicsTilesGetZxyScaleByFormatDefaultResponse
  | MosaicsTileJsonOperationsGetDefaultResponse
  | MosaicsWmtsMosaicsGetCapabilitiesXmlDefaultResponse
  | MosaicsAssetsForTilesGetZxyAssetsDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = getParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function getParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: string[] = [];

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (
      let i = candidateParts.length - 1, j = pathParts.length - 1;
      i >= 1 && j >= 1;
      i--, j--
    ) {
      if (
        candidateParts[i]?.startsWith("{") &&
        candidateParts[i]?.indexOf("}") !== -1
      ) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(
          `${candidateParts[i]?.slice(start, end)}`,
        ).test(pathParts[j] || "");

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
