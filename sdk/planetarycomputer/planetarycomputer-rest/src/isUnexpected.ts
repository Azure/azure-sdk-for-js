// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
  IngestionsDeleteLogicalResponse,
  IngestionsDeleteDefaultResponse,
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
  StacCollectionAssetsCreate200Response,
  StacCollectionAssetsCreate201Response,
  StacCollectionAssetsCreateDefaultResponse,
  StacCollectionAssetsCreateOrReplace200Response,
  StacCollectionAssetsCreateOrReplace201Response,
  StacCollectionAssetsCreateOrReplaceDefaultResponse,
  StacCollectionAssetsDelete200Response,
  StacCollectionAssetsDelete204Response,
  StacCollectionAssetsDeleteDefaultResponse,
  StacCollectionThumbnailsGet200Response,
  StacCollectionThumbnailsGet204Response,
  StacCollectionThumbnailsGetDefaultResponse,
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
  StacCollectionPartitionTypesGet200Response,
  StacCollectionPartitionTypesGetDefaultResponse,
  StacCollectionPartitionTypesReplace200Response,
  StacCollectionPartitionTypesReplace204Response,
  StacCollectionPartitionTypesReplaceDefaultResponse,
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
  GeoCatalogAzmapsTokenGet200Response,
  GeoCatalogAzmapsTokenGetDefaultResponse,
  GeoCatalogAzmapsClientGetId200Response,
  GeoCatalogAzmapsClientGetIdDefaultResponse,
  GeoCatalogAuthConfigOperationsGet200Response,
  GeoCatalogAuthConfigOperationsGetDefaultResponse,
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
  MapsIntervalLegendsGetByClassmapName200Response,
  MapsIntervalLegendsGetByClassmapName204Response,
  MapsIntervalLegendsGetByClassmapNameDefaultResponse,
  MapsClassmapLegendsGet200Response,
  MapsClassmapLegendsGet204Response,
  MapsClassmapLegendsGetDefaultResponse,
  MapsLegendsGet200Response,
  MapsLegendsGet204Response,
  MapsLegendsGetDefaultResponse,
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
  StacCollectionOperationsGetAll200Response,
  StacCollectionOperationsGetAllDefaultResponse,
  StacCollectionOperationsCreate202Response,
  StacCollectionOperationsCreateLogicalResponse,
  StacCollectionOperationsCreateDefaultResponse,
  StacCollectionOperationsGet200Response,
  StacCollectionOperationsGetDefaultResponse,
  StacCollectionOperationsCreateOrReplace202Response,
  StacCollectionOperationsCreateOrReplaceLogicalResponse,
  StacCollectionOperationsCreateOrReplaceDefaultResponse,
  StacCollectionOperationsDelete202Response,
  StacCollectionOperationsDeleteLogicalResponse,
  StacCollectionOperationsDeleteDefaultResponse,
  StacSearchOperationsGet200Response,
  StacSearchOperationsGet204Response,
  StacSearchOperationsGetDefaultResponse,
  StacSearchOperationsCreate200Response,
  StacSearchOperationsCreate204Response,
  StacSearchOperationsCreateDefaultResponse,
  StacLandingPagesGet200Response,
  StacLandingPagesGetDefaultResponse,
  StacConformanceClassGet200Response,
  StacConformanceClassGetDefaultResponse,
  IngestionsIngestionRunsListAll200Response,
  IngestionsIngestionRunsListAllDefaultResponse,
  IngestionsIngestionRunsCreate201Response,
  IngestionsIngestionRunsCreateDefaultResponse,
  IngestionsIngestionRunsGet200Response,
  IngestionsIngestionRunsGetDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "GET /inma/collections/{collectionId}/ingestions": ["200"],
  "POST /inma/collections/{collectionId}/ingestions": ["201"],
  "GET /inma/collections/{collectionId}/ingestions/{ingestionId}": ["200"],
  "PATCH /inma/collections/{collectionId}/ingestions/{ingestionId}": ["200"],
  "DELETE /inma/collections/{collectionId}/ingestions/{ingestionId}": ["202"],
  "GET /stac/collections/{collectionId}/items": ["200"],
  "POST /stac/collections/{collectionId}/items": ["202"],
  "GET /stac/collections/{collectionId}/items/{itemId}": ["200"],
  "PUT /stac/collections/{collectionId}/items/{itemId}": ["202"],
  "PATCH /stac/collections/{collectionId}/items/{itemId}": ["202"],
  "DELETE /stac/collections/{collectionId}/items/{itemId}": ["202"],
  "GET /inma/ingestion-sources": ["200"],
  "POST /inma/ingestion-sources": ["201"],
  "GET /inma/ingestion-sources/{id}": ["200"],
  "PUT /inma/ingestion-sources/{id}": ["200", "201"],
  "DELETE /inma/ingestion-sources/{id}": ["204"],
  "GET /inma/ingestion-sources/managed-identities": ["200"],
  "GET /inma/operations/{operationId}": ["200"],
  "DELETE /inma/operations/{operationId}": ["204"],
  "GET /inma/operations": ["200"],
  "DELETE /inma/operations": ["204"],
  "POST /stac/collections/{collectionId}/assets": ["200", "201"],
  "PUT /stac/collections/{collectionId}/assets/{assetId}": ["200", "201"],
  "DELETE /stac/collections/{collectionId}/assets/{assetId}": ["200", "204"],
  "GET /stac/collections/{collectionId}/thumbnail": ["200", "204"],
  "GET /stac/collections/{collectionId}/configurations": ["200"],
  "GET /stac/collections/{collectionId}/configurations/mosaics": ["200", "204"],
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
    "204",
  ],
  "GET /stac/collections/{collectionId}/configurations/render-options": [
    "200",
    "204",
  ],
  "POST /stac/collections/{collectionId}/configurations/render-options": [
    "200",
    "201",
  ],
  "GET /stac/collections/{collectionId}/configurations/render-options/{renderOptionId}":
    ["200"],
  "PUT /stac/collections/{collectionId}/configurations/render-options/{renderOptionId}":
    ["200", "201"],
  "DELETE /stac/collections/{collectionId}/configurations/render-options/{renderOptionId}":
    ["200", "204"],
  "GET /stac/collections/{collectionId}/configurations/tile-settings": ["200"],
  "PUT /stac/collections/{collectionId}/configurations/tile-settings": ["200"],
  "GET /stac/collections/{collectionId}/configurations/partition-type": ["200"],
  "PUT /stac/collections/{collectionId}/configurations/partition-type": [
    "200",
    "204",
  ],
  "GET /stac/queryables": ["200", "204"],
  "DELETE /stac/collections/{collectionId}/queryables/{queryableName}": [
    "200",
    "204",
  ],
  "PUT /stac/collections/{collectionId}/queryables/{queryableName}": [
    "200",
    "201",
  ],
  "GET /stac/collections/{collectionId}/queryables": ["200", "204"],
  "POST /stac/collections/{collectionId}/queryables": ["201", "204"],
  "GET /geocatalog/map/token": ["200"],
  "GET /geocatalog/map/id": ["200"],
  "GET /geocatalog/auth": ["200"],
  "POST /data/collections/{collectionId}/image/static": ["200"],
  "GET /data/collections/{collectionId}/image/static/{id}": ["200", "204"],
  "GET /data/collections/{collectionId}/items/{itemId}/bounds": ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/info": ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/info.geojson": ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/assets": ["200", "204"],
  "GET /data/collections/{collectionId}/items/{itemId}/asset_statistics": [
    "200",
  ],
  "GET /data/collections/{collectionId}/items/{itemId}/statistics": ["200"],
  "POST /data/collections/{collectionId}/items/{itemId}/statistics": ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/tiles/{z}/{x}/{y}@{scale}x.{format}":
    ["200", "204"],
  "GET /data/collections/{collectionId}/items/{itemId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}@{scale}x.{format}":
    ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/tilejson.json": ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/{tileMatrixSetId}/tilejson.json":
    ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/WMTSCapabilities.xml": [
    "200",
    "204",
  ],
  "GET /data/collections/{collectionId}/items/{itemId}/{tileMatrixSetId}/WMTSCapabilities.xml":
    ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/point/{lon},{lat}": [
    "200",
  ],
  "GET /data/collections/{collectionId}/items/{itemId}/preview.{format}": [
    "200",
  ],
  "GET /data/collections/{collectionId}/items/{itemId}/preview": ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/crop/{minx},{miny},{maxx},{maxy}/{width}x{height}.{format}":
    ["200"],
  "GET /data/collections/{collectionId}/items/{itemId}/crop/{minx},{miny},{maxx},{maxy}.{format}":
    ["200"],
  "POST /data/collections/{collectionId}/items/{itemId}/crop/{width}x{height}.{format}":
    ["200"],
  "POST /data/collections/{collectionId}/items/{itemId}/crop.{format}": ["200"],
  "GET /data/legend/interval/{classmapName}": ["200", "204"],
  "GET /data/legend/classmap/{classmapName}": ["200", "204"],
  "GET /data/legend/colormap/{cmapName}": ["200", "204"],
  "GET /data/mosaic/{searchId}/tiles/{z}/{x}/{y}@{scale}x.{format}": [
    "200",
    "204",
  ],
  "GET /data/mosaic/{searchId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}@{scale}x.{format}":
    ["200", "204"],
  "GET /data/mosaic/{searchId}/tilejson.json": ["200"],
  "GET /data/mosaic/{searchId}/{tileMatrixSetId}/tilejson.json": ["200"],
  "GET /data/mosaic/{searchId}/WMTSCapabilities.xml": ["200", "204"],
  "GET /data/mosaic/{searchId}/{tileMatrixSetId}/WMTSCapabilities.xml": [
    "200",
    "204",
  ],
  "POST /data/mosaic/register": ["200"],
  "GET /data/mosaic/{searchId}/info": ["200"],
  "GET /data/mosaic/{searchId}/tiles/{z}/{x}/{y}/assets": ["200", "204"],
  "GET /data/mosaic/{searchId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}/assets": [
    "200",
    "204",
  ],
  "GET /data/mosaic/{searchId}/{lon},{lat}/assets": ["200", "204"],
  "GET /data/tile-matrix-sets": ["200", "204"],
  "GET /data/tile-matrix-sets/{tileMatrixSetId}": ["200"],
  "GET /sas/token/{collectionId}": ["200"],
  "POST /sas/token/revoke": ["200"],
  "GET /sas/sign": ["200"],
  "GET /stac/collections": ["200"],
  "POST /stac/collections": ["202"],
  "GET /stac/collections/{collectionId}": ["200"],
  "PUT /stac/collections/{collectionId}": ["202"],
  "DELETE /stac/collections/{collectionId}": ["202"],
  "GET /stac/search": ["200", "204"],
  "POST /stac/search": ["200", "204"],
  "GET /stac": ["200"],
  "GET /stac/conformance": ["200"],
  "GET /inma/collections/{collectionId}/ingestions/{ingestionId}/runs": ["200"],
  "POST /inma/collections/{collectionId}/ingestions/{ingestionId}/runs": [
    "201",
  ],
  "GET /inma/collections/{collectionId}/ingestions/{ingestionId}/runs/{runId}":
    ["200"],
};

export function isUnexpected(
  response: IngestionsListAll200Response | IngestionsListAllDefaultResponse,
): response is IngestionsListAllDefaultResponse;
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
  response:
    | IngestionSourcesListAll200Response
    | IngestionSourcesListAllDefaultResponse,
): response is IngestionSourcesListAllDefaultResponse;
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
    | IngestionOperationsGet200Response
    | IngestionOperationsGetDefaultResponse,
): response is IngestionOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | IngestionOperationsDelete204Response
    | IngestionOperationsDeleteDefaultResponse,
): response is IngestionOperationsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | IngestionOperationsListAll200Response
    | IngestionOperationsListAllDefaultResponse,
): response is IngestionOperationsListAllDefaultResponse;
export function isUnexpected(
  response:
    | IngestionOperationsDeleteAll204Response
    | IngestionOperationsDeleteAllDefaultResponse,
): response is IngestionOperationsDeleteAllDefaultResponse;
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
    | StacCollectionAssetsDelete204Response
    | StacCollectionAssetsDeleteDefaultResponse,
): response is StacCollectionAssetsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionThumbnailsGet200Response
    | StacCollectionThumbnailsGet204Response
    | StacCollectionThumbnailsGetDefaultResponse,
): response is StacCollectionThumbnailsGetDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionConfigGet200Response
    | StacCollectionConfigGetDefaultResponse,
): response is StacCollectionConfigGetDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionMosaicsGetAll200Response
    | StacCollectionMosaicsGetAll204Response
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
    | StacCollectionMosaicsDelete204Response
    | StacCollectionMosaicsDeleteDefaultResponse,
): response is StacCollectionMosaicsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionRenderOptionsGetAll200Response
    | StacCollectionRenderOptionsGetAll204Response
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
    | StacCollectionRenderOptionsDelete204Response
    | StacCollectionRenderOptionsDeleteDefaultResponse,
): response is StacCollectionRenderOptionsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionTileSettingsGetAll200Response
    | StacCollectionTileSettingsGetAllDefaultResponse,
): response is StacCollectionTileSettingsGetAllDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionTileSettingsReplace200Response
    | StacCollectionTileSettingsReplaceDefaultResponse,
): response is StacCollectionTileSettingsReplaceDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionPartitionTypesGet200Response
    | StacCollectionPartitionTypesGetDefaultResponse,
): response is StacCollectionPartitionTypesGetDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionPartitionTypesReplace200Response
    | StacCollectionPartitionTypesReplace204Response
    | StacCollectionPartitionTypesReplaceDefaultResponse,
): response is StacCollectionPartitionTypesReplaceDefaultResponse;
export function isUnexpected(
  response:
    | StacQueryablesGetAll200Response
    | StacQueryablesGetAll204Response
    | StacQueryablesGetAllDefaultResponse,
): response is StacQueryablesGetAllDefaultResponse;
export function isUnexpected(
  response:
    | StacQueryablesDelete200Response
    | StacQueryablesDelete204Response
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
    | StacQueryablesGetAllByCollection204Response
    | StacQueryablesGetAllByCollectionDefaultResponse,
): response is StacQueryablesGetAllByCollectionDefaultResponse;
export function isUnexpected(
  response:
    | StacQueryablesCreate201Response
    | StacQueryablesCreate204Response
    | StacQueryablesCreateDefaultResponse,
): response is StacQueryablesCreateDefaultResponse;
export function isUnexpected(
  response:
    | GeoCatalogAzmapsTokenGet200Response
    | GeoCatalogAzmapsTokenGetDefaultResponse,
): response is GeoCatalogAzmapsTokenGetDefaultResponse;
export function isUnexpected(
  response:
    | GeoCatalogAzmapsClientGetId200Response
    | GeoCatalogAzmapsClientGetIdDefaultResponse,
): response is GeoCatalogAzmapsClientGetIdDefaultResponse;
export function isUnexpected(
  response:
    | GeoCatalogAuthConfigOperationsGet200Response
    | GeoCatalogAuthConfigOperationsGetDefaultResponse,
): response is GeoCatalogAuthConfigOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | TilerStaticImagesCreate200Response
    | TilerStaticImagesCreateDefaultResponse,
): response is TilerStaticImagesCreateDefaultResponse;
export function isUnexpected(
  response:
    | TilerStaticImagesGet200Response
    | TilerStaticImagesGet204Response
    | TilerStaticImagesGetDefaultResponse,
): response is TilerStaticImagesGetDefaultResponse;
export function isUnexpected(
  response: TilerBoundGetAll200Response | TilerBoundGetAllDefaultResponse,
): response is TilerBoundGetAllDefaultResponse;
export function isUnexpected(
  response:
    | TilerInfoOperationsGet200Response
    | TilerInfoOperationsGetDefaultResponse,
): response is TilerInfoOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | TilerInfoGeoJsonOperationsGet200Response
    | TilerInfoGeoJsonOperationsGetDefaultResponse,
): response is TilerInfoGeoJsonOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | TilerAvailableAssetsGetAll200Response
    | TilerAvailableAssetsGetAll204Response
    | TilerAvailableAssetsGetAllDefaultResponse,
): response is TilerAvailableAssetsGetAllDefaultResponse;
export function isUnexpected(
  response:
    | TilerAssetStatisticsGetAll200Response
    | TilerAssetStatisticsGetAllDefaultResponse,
): response is TilerAssetStatisticsGetAllDefaultResponse;
export function isUnexpected(
  response:
    | TilerStatisticsGetAll200Response
    | TilerStatisticsGetAllDefaultResponse,
): response is TilerStatisticsGetAllDefaultResponse;
export function isUnexpected(
  response:
    | TilerGeoJsonStatisticsGetAll200Response
    | TilerGeoJsonStatisticsGetAllDefaultResponse,
): response is TilerGeoJsonStatisticsGetAllDefaultResponse;
export function isUnexpected(
  response:
    | TilerTilesGetZxyScalexFormat200Response
    | TilerTilesGetZxyScalexFormat204Response
    | TilerTilesGetZxyScalexFormatDefaultResponse,
): response is TilerTilesGetZxyScalexFormatDefaultResponse;
export function isUnexpected(
  response:
    | TilerTileMatrixSetsGetZxyScalexFormat200Response
    | TilerTileMatrixSetsGetZxyScalexFormatDefaultResponse,
): response is TilerTileMatrixSetsGetZxyScalexFormatDefaultResponse;
export function isUnexpected(
  response:
    | TilerTileJsonOperationsGet200Response
    | TilerTileJsonOperationsGetDefaultResponse,
): response is TilerTileJsonOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | TilerTileJsonTileMatrixSetsGet200Response
    | TilerTileJsonTileMatrixSetsGetDefaultResponse,
): response is TilerTileJsonTileMatrixSetsGetDefaultResponse;
export function isUnexpected(
  response:
    | TilerWmtsGetCapabilitiesXml200Response
    | TilerWmtsGetCapabilitiesXml204Response
    | TilerWmtsGetCapabilitiesXmlDefaultResponse,
): response is TilerWmtsGetCapabilitiesXmlDefaultResponse;
export function isUnexpected(
  response:
    | TilerWmtsTileMatrixSetsGetCapabilitiesXml200Response
    | TilerWmtsTileMatrixSetsGetCapabilitiesXmlDefaultResponse,
): response is TilerWmtsTileMatrixSetsGetCapabilitiesXmlDefaultResponse;
export function isUnexpected(
  response:
    | TilerPointsGetLonLat200Response
    | TilerPointsGetLonLatDefaultResponse,
): response is TilerPointsGetLonLatDefaultResponse;
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
    | TilerPartsGetMinxMinyMaxxMaxyWidthxHeightFormat200Response
    | TilerPartsGetMinxMinyMaxxMaxyWidthxHeightFormatDefaultResponse,
): response is TilerPartsGetMinxMinyMaxxMaxyWidthxHeightFormatDefaultResponse;
export function isUnexpected(
  response:
    | TilerPartsGetMinxMinyMaxxMaxyFormat200Response
    | TilerPartsGetMinxMinyMaxxMaxyFormatDefaultResponse,
): response is TilerPartsGetMinxMinyMaxxMaxyFormatDefaultResponse;
export function isUnexpected(
  response:
    | TilerGeoJsonsCropWidthxHeightFormat200Response
    | TilerGeoJsonsCropWidthxHeightFormatDefaultResponse,
): response is TilerGeoJsonsCropWidthxHeightFormatDefaultResponse;
export function isUnexpected(
  response:
    | TilerGeoJsonsCropFormat200Response
    | TilerGeoJsonsCropFormatDefaultResponse,
): response is TilerGeoJsonsCropFormatDefaultResponse;
export function isUnexpected(
  response:
    | MapsIntervalLegendsGetByClassmapName200Response
    | MapsIntervalLegendsGetByClassmapName204Response
    | MapsIntervalLegendsGetByClassmapNameDefaultResponse,
): response is MapsIntervalLegendsGetByClassmapNameDefaultResponse;
export function isUnexpected(
  response:
    | MapsClassmapLegendsGet200Response
    | MapsClassmapLegendsGet204Response
    | MapsClassmapLegendsGetDefaultResponse,
): response is MapsClassmapLegendsGetDefaultResponse;
export function isUnexpected(
  response:
    | MapsLegendsGet200Response
    | MapsLegendsGet204Response
    | MapsLegendsGetDefaultResponse,
): response is MapsLegendsGetDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsTilesGetZxyScalexFormat200Response
    | MosaicsTilesGetZxyScalexFormat204Response
    | MosaicsTilesGetZxyScalexFormatDefaultResponse,
): response is MosaicsTilesGetZxyScalexFormatDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsTileMatrixSetsGetZxyScalexFormat200Response
    | MosaicsTileMatrixSetsGetZxyScalexFormat204Response
    | MosaicsTileMatrixSetsGetZxyScalexFormatDefaultResponse,
): response is MosaicsTileMatrixSetsGetZxyScalexFormatDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsTileJsonOperationsGet200Response
    | MosaicsTileJsonOperationsGetDefaultResponse,
): response is MosaicsTileJsonOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsTileMatrixSetsTileJsonGet200Response
    | MosaicsTileMatrixSetsTileJsonGetDefaultResponse,
): response is MosaicsTileMatrixSetsTileJsonGetDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsWmtsMosaicsGetCapabilitiesXml200Response
    | MosaicsWmtsMosaicsGetCapabilitiesXml204Response
    | MosaicsWmtsMosaicsGetCapabilitiesXmlDefaultResponse,
): response is MosaicsWmtsMosaicsGetCapabilitiesXmlDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml200Response
    | MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml204Response
    | MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlDefaultResponse,
): response is MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsRegisterSearchRegister200Response
    | MosaicsRegisterSearchRegisterDefaultResponse,
): response is MosaicsRegisterSearchRegisterDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsInfoSearchGet200Response
    | MosaicsInfoSearchGetDefaultResponse,
): response is MosaicsInfoSearchGetDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsAssetsForTilesGetZxyAssets200Response
    | MosaicsAssetsForTilesGetZxyAssets204Response
    | MosaicsAssetsForTilesGetZxyAssetsDefaultResponse,
): response is MosaicsAssetsForTilesGetZxyAssetsDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsAssetsForTileMatrixSetsGetZxyAssets200Response
    | MosaicsAssetsForTileMatrixSetsGetZxyAssets204Response
    | MosaicsAssetsForTileMatrixSetsGetZxyAssetsDefaultResponse,
): response is MosaicsAssetsForTileMatrixSetsGetZxyAssetsDefaultResponse;
export function isUnexpected(
  response:
    | MosaicsAssetsForPointsGetLonLatAssets200Response
    | MosaicsAssetsForPointsGetLonLatAssets204Response
    | MosaicsAssetsForPointsGetLonLatAssetsDefaultResponse,
): response is MosaicsAssetsForPointsGetLonLatAssetsDefaultResponse;
export function isUnexpected(
  response:
    | TileMatrixListGet200Response
    | TileMatrixListGet204Response
    | TileMatrixListGetDefaultResponse,
): response is TileMatrixListGetDefaultResponse;
export function isUnexpected(
  response:
    | TileMatrixDefinitionsGet200Response
    | TileMatrixDefinitionsGetDefaultResponse,
): response is TileMatrixDefinitionsGetDefaultResponse;
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
    | StacCollectionOperationsGetAll200Response
    | StacCollectionOperationsGetAllDefaultResponse,
): response is StacCollectionOperationsGetAllDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionOperationsCreate202Response
    | StacCollectionOperationsCreateLogicalResponse
    | StacCollectionOperationsCreateDefaultResponse,
): response is StacCollectionOperationsCreateDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionOperationsGet200Response
    | StacCollectionOperationsGetDefaultResponse,
): response is StacCollectionOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionOperationsCreateOrReplace202Response
    | StacCollectionOperationsCreateOrReplaceLogicalResponse
    | StacCollectionOperationsCreateOrReplaceDefaultResponse,
): response is StacCollectionOperationsCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response:
    | StacCollectionOperationsDelete202Response
    | StacCollectionOperationsDeleteLogicalResponse
    | StacCollectionOperationsDeleteDefaultResponse,
): response is StacCollectionOperationsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | StacSearchOperationsGet200Response
    | StacSearchOperationsGet204Response
    | StacSearchOperationsGetDefaultResponse,
): response is StacSearchOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | StacSearchOperationsCreate200Response
    | StacSearchOperationsCreate204Response
    | StacSearchOperationsCreateDefaultResponse,
): response is StacSearchOperationsCreateDefaultResponse;
export function isUnexpected(
  response: StacLandingPagesGet200Response | StacLandingPagesGetDefaultResponse,
): response is StacLandingPagesGetDefaultResponse;
export function isUnexpected(
  response:
    | StacConformanceClassGet200Response
    | StacConformanceClassGetDefaultResponse,
): response is StacConformanceClassGetDefaultResponse;
export function isUnexpected(
  response:
    | IngestionsIngestionRunsListAll200Response
    | IngestionsIngestionRunsListAllDefaultResponse,
): response is IngestionsIngestionRunsListAllDefaultResponse;
export function isUnexpected(
  response:
    | IngestionsIngestionRunsCreate201Response
    | IngestionsIngestionRunsCreateDefaultResponse,
): response is IngestionsIngestionRunsCreateDefaultResponse;
export function isUnexpected(
  response:
    | IngestionsIngestionRunsGet200Response
    | IngestionsIngestionRunsGetDefaultResponse,
): response is IngestionsIngestionRunsGetDefaultResponse;
export function isUnexpected(
  response:
    | IngestionsListAll200Response
    | IngestionsListAllDefaultResponse
    | IngestionsCreate201Response
    | IngestionsCreateDefaultResponse
    | IngestionsGet200Response
    | IngestionsGetDefaultResponse
    | IngestionsUpdate200Response
    | IngestionsUpdateDefaultResponse
    | IngestionsDelete202Response
    | IngestionsDeleteLogicalResponse
    | IngestionsDeleteDefaultResponse
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
    | IngestionSourcesListAll200Response
    | IngestionSourcesListAllDefaultResponse
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
    | IngestionOperationsGet200Response
    | IngestionOperationsGetDefaultResponse
    | IngestionOperationsDelete204Response
    | IngestionOperationsDeleteDefaultResponse
    | IngestionOperationsListAll200Response
    | IngestionOperationsListAllDefaultResponse
    | IngestionOperationsDeleteAll204Response
    | IngestionOperationsDeleteAllDefaultResponse
    | StacCollectionAssetsCreate200Response
    | StacCollectionAssetsCreate201Response
    | StacCollectionAssetsCreateDefaultResponse
    | StacCollectionAssetsCreateOrReplace200Response
    | StacCollectionAssetsCreateOrReplace201Response
    | StacCollectionAssetsCreateOrReplaceDefaultResponse
    | StacCollectionAssetsDelete200Response
    | StacCollectionAssetsDelete204Response
    | StacCollectionAssetsDeleteDefaultResponse
    | StacCollectionThumbnailsGet200Response
    | StacCollectionThumbnailsGet204Response
    | StacCollectionThumbnailsGetDefaultResponse
    | StacCollectionConfigGet200Response
    | StacCollectionConfigGetDefaultResponse
    | StacCollectionMosaicsGetAll200Response
    | StacCollectionMosaicsGetAll204Response
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
    | StacCollectionMosaicsDelete204Response
    | StacCollectionMosaicsDeleteDefaultResponse
    | StacCollectionRenderOptionsGetAll200Response
    | StacCollectionRenderOptionsGetAll204Response
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
    | StacCollectionRenderOptionsDelete204Response
    | StacCollectionRenderOptionsDeleteDefaultResponse
    | StacCollectionTileSettingsGetAll200Response
    | StacCollectionTileSettingsGetAllDefaultResponse
    | StacCollectionTileSettingsReplace200Response
    | StacCollectionTileSettingsReplaceDefaultResponse
    | StacCollectionPartitionTypesGet200Response
    | StacCollectionPartitionTypesGetDefaultResponse
    | StacCollectionPartitionTypesReplace200Response
    | StacCollectionPartitionTypesReplace204Response
    | StacCollectionPartitionTypesReplaceDefaultResponse
    | StacQueryablesGetAll200Response
    | StacQueryablesGetAll204Response
    | StacQueryablesGetAllDefaultResponse
    | StacQueryablesDelete200Response
    | StacQueryablesDelete204Response
    | StacQueryablesDeleteDefaultResponse
    | StacQueryablesCreateOrReplace200Response
    | StacQueryablesCreateOrReplace201Response
    | StacQueryablesCreateOrReplaceDefaultResponse
    | StacQueryablesGetAllByCollection200Response
    | StacQueryablesGetAllByCollection204Response
    | StacQueryablesGetAllByCollectionDefaultResponse
    | StacQueryablesCreate201Response
    | StacQueryablesCreate204Response
    | StacQueryablesCreateDefaultResponse
    | GeoCatalogAzmapsTokenGet200Response
    | GeoCatalogAzmapsTokenGetDefaultResponse
    | GeoCatalogAzmapsClientGetId200Response
    | GeoCatalogAzmapsClientGetIdDefaultResponse
    | GeoCatalogAuthConfigOperationsGet200Response
    | GeoCatalogAuthConfigOperationsGetDefaultResponse
    | TilerStaticImagesCreate200Response
    | TilerStaticImagesCreateDefaultResponse
    | TilerStaticImagesGet200Response
    | TilerStaticImagesGet204Response
    | TilerStaticImagesGetDefaultResponse
    | TilerBoundGetAll200Response
    | TilerBoundGetAllDefaultResponse
    | TilerInfoOperationsGet200Response
    | TilerInfoOperationsGetDefaultResponse
    | TilerInfoGeoJsonOperationsGet200Response
    | TilerInfoGeoJsonOperationsGetDefaultResponse
    | TilerAvailableAssetsGetAll200Response
    | TilerAvailableAssetsGetAll204Response
    | TilerAvailableAssetsGetAllDefaultResponse
    | TilerAssetStatisticsGetAll200Response
    | TilerAssetStatisticsGetAllDefaultResponse
    | TilerStatisticsGetAll200Response
    | TilerStatisticsGetAllDefaultResponse
    | TilerGeoJsonStatisticsGetAll200Response
    | TilerGeoJsonStatisticsGetAllDefaultResponse
    | TilerTilesGetZxyScalexFormat200Response
    | TilerTilesGetZxyScalexFormat204Response
    | TilerTilesGetZxyScalexFormatDefaultResponse
    | TilerTileMatrixSetsGetZxyScalexFormat200Response
    | TilerTileMatrixSetsGetZxyScalexFormatDefaultResponse
    | TilerTileJsonOperationsGet200Response
    | TilerTileJsonOperationsGetDefaultResponse
    | TilerTileJsonTileMatrixSetsGet200Response
    | TilerTileJsonTileMatrixSetsGetDefaultResponse
    | TilerWmtsGetCapabilitiesXml200Response
    | TilerWmtsGetCapabilitiesXml204Response
    | TilerWmtsGetCapabilitiesXmlDefaultResponse
    | TilerWmtsTileMatrixSetsGetCapabilitiesXml200Response
    | TilerWmtsTileMatrixSetsGetCapabilitiesXmlDefaultResponse
    | TilerPointsGetLonLat200Response
    | TilerPointsGetLonLatDefaultResponse
    | TilerPreviewsGetFormat200Response
    | TilerPreviewsGetFormatDefaultResponse
    | TilerPreviewsGet200Response
    | TilerPreviewsGetDefaultResponse
    | TilerPartsGetMinxMinyMaxxMaxyWidthxHeightFormat200Response
    | TilerPartsGetMinxMinyMaxxMaxyWidthxHeightFormatDefaultResponse
    | TilerPartsGetMinxMinyMaxxMaxyFormat200Response
    | TilerPartsGetMinxMinyMaxxMaxyFormatDefaultResponse
    | TilerGeoJsonsCropWidthxHeightFormat200Response
    | TilerGeoJsonsCropWidthxHeightFormatDefaultResponse
    | TilerGeoJsonsCropFormat200Response
    | TilerGeoJsonsCropFormatDefaultResponse
    | MapsIntervalLegendsGetByClassmapName200Response
    | MapsIntervalLegendsGetByClassmapName204Response
    | MapsIntervalLegendsGetByClassmapNameDefaultResponse
    | MapsClassmapLegendsGet200Response
    | MapsClassmapLegendsGet204Response
    | MapsClassmapLegendsGetDefaultResponse
    | MapsLegendsGet200Response
    | MapsLegendsGet204Response
    | MapsLegendsGetDefaultResponse
    | MosaicsTilesGetZxyScalexFormat200Response
    | MosaicsTilesGetZxyScalexFormat204Response
    | MosaicsTilesGetZxyScalexFormatDefaultResponse
    | MosaicsTileMatrixSetsGetZxyScalexFormat200Response
    | MosaicsTileMatrixSetsGetZxyScalexFormat204Response
    | MosaicsTileMatrixSetsGetZxyScalexFormatDefaultResponse
    | MosaicsTileJsonOperationsGet200Response
    | MosaicsTileJsonOperationsGetDefaultResponse
    | MosaicsTileMatrixSetsTileJsonGet200Response
    | MosaicsTileMatrixSetsTileJsonGetDefaultResponse
    | MosaicsWmtsMosaicsGetCapabilitiesXml200Response
    | MosaicsWmtsMosaicsGetCapabilitiesXml204Response
    | MosaicsWmtsMosaicsGetCapabilitiesXmlDefaultResponse
    | MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml200Response
    | MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXml204Response
    | MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlDefaultResponse
    | MosaicsRegisterSearchRegister200Response
    | MosaicsRegisterSearchRegisterDefaultResponse
    | MosaicsInfoSearchGet200Response
    | MosaicsInfoSearchGetDefaultResponse
    | MosaicsAssetsForTilesGetZxyAssets200Response
    | MosaicsAssetsForTilesGetZxyAssets204Response
    | MosaicsAssetsForTilesGetZxyAssetsDefaultResponse
    | MosaicsAssetsForTileMatrixSetsGetZxyAssets200Response
    | MosaicsAssetsForTileMatrixSetsGetZxyAssets204Response
    | MosaicsAssetsForTileMatrixSetsGetZxyAssetsDefaultResponse
    | MosaicsAssetsForPointsGetLonLatAssets200Response
    | MosaicsAssetsForPointsGetLonLatAssets204Response
    | MosaicsAssetsForPointsGetLonLatAssetsDefaultResponse
    | TileMatrixListGet200Response
    | TileMatrixListGet204Response
    | TileMatrixListGetDefaultResponse
    | TileMatrixDefinitionsGet200Response
    | TileMatrixDefinitionsGetDefaultResponse
    | SasGetToken200Response
    | SasGetTokenDefaultResponse
    | SasRevokeToken200Response
    | SasRevokeTokenDefaultResponse
    | SasGetSign200Response
    | SasGetSignDefaultResponse
    | StacCollectionOperationsGetAll200Response
    | StacCollectionOperationsGetAllDefaultResponse
    | StacCollectionOperationsCreate202Response
    | StacCollectionOperationsCreateLogicalResponse
    | StacCollectionOperationsCreateDefaultResponse
    | StacCollectionOperationsGet200Response
    | StacCollectionOperationsGetDefaultResponse
    | StacCollectionOperationsCreateOrReplace202Response
    | StacCollectionOperationsCreateOrReplaceLogicalResponse
    | StacCollectionOperationsCreateOrReplaceDefaultResponse
    | StacCollectionOperationsDelete202Response
    | StacCollectionOperationsDeleteLogicalResponse
    | StacCollectionOperationsDeleteDefaultResponse
    | StacSearchOperationsGet200Response
    | StacSearchOperationsGet204Response
    | StacSearchOperationsGetDefaultResponse
    | StacSearchOperationsCreate200Response
    | StacSearchOperationsCreate204Response
    | StacSearchOperationsCreateDefaultResponse
    | StacLandingPagesGet200Response
    | StacLandingPagesGetDefaultResponse
    | StacConformanceClassGet200Response
    | StacConformanceClassGetDefaultResponse
    | IngestionsIngestionRunsListAll200Response
    | IngestionsIngestionRunsListAllDefaultResponse
    | IngestionsIngestionRunsCreate201Response
    | IngestionsIngestionRunsCreateDefaultResponse
    | IngestionsIngestionRunsGet200Response
    | IngestionsIngestionRunsGetDefaultResponse,
): response is
  | IngestionsListAllDefaultResponse
  | IngestionsCreateDefaultResponse
  | IngestionsGetDefaultResponse
  | IngestionsUpdateDefaultResponse
  | IngestionsDeleteDefaultResponse
  | StacItemsGetFeaturesDefaultResponse
  | StacItemsCreateDefaultResponse
  | StacItemsGetDefaultResponse
  | StacItemsCreateOrReplaceDefaultResponse
  | StacItemsUpdateDefaultResponse
  | StacItemsDeleteDefaultResponse
  | IngestionSourcesListAllDefaultResponse
  | IngestionSourcesCreateDefaultResponse
  | IngestionSourcesGetDefaultResponse
  | IngestionSourcesCreateOrReplaceDefaultResponse
  | IngestionSourcesDeleteDefaultResponse
  | IngestionSourcesListManagedIdentitiesDefaultResponse
  | IngestionOperationsGetDefaultResponse
  | IngestionOperationsDeleteDefaultResponse
  | IngestionOperationsListAllDefaultResponse
  | IngestionOperationsDeleteAllDefaultResponse
  | StacCollectionAssetsCreateDefaultResponse
  | StacCollectionAssetsCreateOrReplaceDefaultResponse
  | StacCollectionAssetsDeleteDefaultResponse
  | StacCollectionThumbnailsGetDefaultResponse
  | StacCollectionConfigGetDefaultResponse
  | StacCollectionMosaicsGetAllDefaultResponse
  | StacCollectionMosaicsAddDefaultResponse
  | StacCollectionMosaicsGetDefaultResponse
  | StacCollectionMosaicsCreateOrReplaceDefaultResponse
  | StacCollectionMosaicsDeleteDefaultResponse
  | StacCollectionRenderOptionsGetAllDefaultResponse
  | StacCollectionRenderOptionsCreateDefaultResponse
  | StacCollectionRenderOptionsGetDefaultResponse
  | StacCollectionRenderOptionsCreateOrReplaceDefaultResponse
  | StacCollectionRenderOptionsDeleteDefaultResponse
  | StacCollectionTileSettingsGetAllDefaultResponse
  | StacCollectionTileSettingsReplaceDefaultResponse
  | StacCollectionPartitionTypesGetDefaultResponse
  | StacCollectionPartitionTypesReplaceDefaultResponse
  | StacQueryablesGetAllDefaultResponse
  | StacQueryablesDeleteDefaultResponse
  | StacQueryablesCreateOrReplaceDefaultResponse
  | StacQueryablesGetAllByCollectionDefaultResponse
  | StacQueryablesCreateDefaultResponse
  | GeoCatalogAzmapsTokenGetDefaultResponse
  | GeoCatalogAzmapsClientGetIdDefaultResponse
  | GeoCatalogAuthConfigOperationsGetDefaultResponse
  | TilerStaticImagesCreateDefaultResponse
  | TilerStaticImagesGetDefaultResponse
  | TilerBoundGetAllDefaultResponse
  | TilerInfoOperationsGetDefaultResponse
  | TilerInfoGeoJsonOperationsGetDefaultResponse
  | TilerAvailableAssetsGetAllDefaultResponse
  | TilerAssetStatisticsGetAllDefaultResponse
  | TilerStatisticsGetAllDefaultResponse
  | TilerGeoJsonStatisticsGetAllDefaultResponse
  | TilerTilesGetZxyScalexFormatDefaultResponse
  | TilerTileMatrixSetsGetZxyScalexFormatDefaultResponse
  | TilerTileJsonOperationsGetDefaultResponse
  | TilerTileJsonTileMatrixSetsGetDefaultResponse
  | TilerWmtsGetCapabilitiesXmlDefaultResponse
  | TilerWmtsTileMatrixSetsGetCapabilitiesXmlDefaultResponse
  | TilerPointsGetLonLatDefaultResponse
  | TilerPreviewsGetFormatDefaultResponse
  | TilerPreviewsGetDefaultResponse
  | TilerPartsGetMinxMinyMaxxMaxyWidthxHeightFormatDefaultResponse
  | TilerPartsGetMinxMinyMaxxMaxyFormatDefaultResponse
  | TilerGeoJsonsCropWidthxHeightFormatDefaultResponse
  | TilerGeoJsonsCropFormatDefaultResponse
  | MapsIntervalLegendsGetByClassmapNameDefaultResponse
  | MapsClassmapLegendsGetDefaultResponse
  | MapsLegendsGetDefaultResponse
  | MosaicsTilesGetZxyScalexFormatDefaultResponse
  | MosaicsTileMatrixSetsGetZxyScalexFormatDefaultResponse
  | MosaicsTileJsonOperationsGetDefaultResponse
  | MosaicsTileMatrixSetsTileJsonGetDefaultResponse
  | MosaicsWmtsMosaicsGetCapabilitiesXmlDefaultResponse
  | MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlDefaultResponse
  | MosaicsRegisterSearchRegisterDefaultResponse
  | MosaicsInfoSearchGetDefaultResponse
  | MosaicsAssetsForTilesGetZxyAssetsDefaultResponse
  | MosaicsAssetsForTileMatrixSetsGetZxyAssetsDefaultResponse
  | MosaicsAssetsForPointsGetLonLatAssetsDefaultResponse
  | TileMatrixListGetDefaultResponse
  | TileMatrixDefinitionsGetDefaultResponse
  | SasGetTokenDefaultResponse
  | SasRevokeTokenDefaultResponse
  | SasGetSignDefaultResponse
  | StacCollectionOperationsGetAllDefaultResponse
  | StacCollectionOperationsCreateDefaultResponse
  | StacCollectionOperationsGetDefaultResponse
  | StacCollectionOperationsCreateOrReplaceDefaultResponse
  | StacCollectionOperationsDeleteDefaultResponse
  | StacSearchOperationsGetDefaultResponse
  | StacSearchOperationsCreateDefaultResponse
  | StacLandingPagesGetDefaultResponse
  | StacConformanceClassGetDefaultResponse
  | IngestionsIngestionRunsListAllDefaultResponse
  | IngestionsIngestionRunsCreateDefaultResponse
  | IngestionsIngestionRunsGetDefaultResponse {
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
