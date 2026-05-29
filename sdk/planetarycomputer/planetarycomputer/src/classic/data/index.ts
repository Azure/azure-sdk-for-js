// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlanetaryComputerProContext } from "../../api/planetaryComputerProContext.js";
import {
  getSearchPointWithAssets,
  getSearchPoint,
  getSearchAssetsForTileNoTms,
  getSearchTileNoTmsByScaleAndFormat,
  getSearchTileNoTmsByScale,
  getSearchTileNoTmsByFormat,
  getSearchTileNoTms,
  getSearchTileJson,
  getSearchWmtsCapabilities,
  cropSearchFeatureWidthByHeight,
  cropSearchFeatureByFormat,
  cropSearchFeature,
  getSearchBboxAssets,
  getSearchBboxCropWithDimensions,
  getSearchBboxCrop,
  getSearchInfo,
  getSearchWmtsCapabilitiesByTms,
  getSearchTileJsonByTms,
  getSearchAssetsForTile,
  getSearchTileByScale,
  getSearchTileByFormat,
  getSearchTile,
  getSearchTileByScaleAndFormat,
  getSearchTilesetMetadata,
  getSearchTilesets,
  getCollectionPointAssets,
  getCollectionPoint,
  cropCollectionFeatureWidthByHeight,
  cropCollectionFeatureByFormat,
  cropCollectionFeature,
  getCollectionBboxCropWithDimensions,
  getCollectionBboxCrop,
  getCollectionInfo,
  getCollectionAssetsForBbox,
  getCollectionAssetsForTileNoTms,
  getCollectionAssetsForTile,
  getCollectionWmtsCapabilitiesByTms,
  getCollectionWmtsCapabilities,
  getCollectionTileJsonByTms,
  getCollectionTileJson,
  getCollectionTileNoTmsByScale,
  getCollectionTileNoTmsByFormat,
  getCollectionTileNoTms,
  getCollectionTileNoTmsByScaleAndFormat,
  getCollectionTileByScale,
  getCollectionTileByFormat,
  getCollectionTile,
  getCollectionTileByScaleAndFormat,
  getCollectionTilesetMetadata,
  getCollectionTilesets,
  getItemBboxCropWithDimensions,
  getItemBboxCrop,
  getItemPreviewWithFormat,
  getItemPreview,
  getItemPoint,
  getItemWmtsCapabilitiesByTms,
  getItemWmtsCapabilities,
  getItemTileJsonByTms,
  getItemTileJson,
  getItemFeatureStatistics,
  getItemStatistics,
  getItemAssetStatistics,
  getItemAvailableAssets,
  getItemInfoGeoJson,
  getItemInfo,
  getItemBounds,
  cropFeatureWidthByHeight,
  cropFeatureByFormat,
  cropFeature,
  getTileNoTmsByScaleAndFormat,
  getTileNoTmsByScale,
  getTileNoTmsByFormat,
  getTileNoTms,
  getTileByScaleAndFormat,
  getTileByScale,
  getTileByFormat,
  getTile,
  getTilesetMetadata,
  getTilesets,
  registerMosaicsSearch,
  getLegend,
  getIntervalLegend,
  getClassMapLegend,
  getTileMatrices,
  getTileMatrixDefinitions,
} from "../../api/data/operations.js";
import type {
  DataGetSearchPointWithAssetsOptionalParams,
  DataGetSearchPointOptionalParams,
  DataGetSearchAssetsForTileNoTmsOptionalParams,
  DataGetSearchTileNoTmsByScaleAndFormatOptionalParams,
  DataGetSearchTileNoTmsByScaleOptionalParams,
  DataGetSearchTileNoTmsByFormatOptionalParams,
  DataGetSearchTileNoTmsOptionalParams,
  DataGetSearchTileJsonOptionalParams,
  DataGetSearchWmtsCapabilitiesOptionalParams,
  DataCropSearchFeatureWidthByHeightOptionalParams,
  DataCropSearchFeatureByFormatOptionalParams,
  DataCropSearchFeatureOptionalParams,
  DataGetSearchBboxAssetsOptionalParams,
  DataGetSearchBboxCropWithDimensionsOptionalParams,
  DataGetSearchBboxCropOptionalParams,
  DataGetSearchInfoOptionalParams,
  DataGetSearchWmtsCapabilitiesByTmsOptionalParams,
  DataGetSearchTileJsonByTmsOptionalParams,
  DataGetSearchAssetsForTileOptionalParams,
  DataGetSearchTileByScaleOptionalParams,
  DataGetSearchTileByFormatOptionalParams,
  DataGetSearchTileOptionalParams,
  DataGetSearchTileByScaleAndFormatOptionalParams,
  DataGetSearchTilesetMetadataOptionalParams,
  DataGetSearchTilesetsOptionalParams,
  DataGetCollectionPointAssetsOptionalParams,
  DataGetCollectionPointOptionalParams,
  DataCropCollectionFeatureWidthByHeightOptionalParams,
  DataCropCollectionFeatureByFormatOptionalParams,
  DataCropCollectionFeatureOptionalParams,
  DataGetCollectionBboxCropWithDimensionsOptionalParams,
  DataGetCollectionBboxCropOptionalParams,
  DataGetCollectionInfoOptionalParams,
  DataGetCollectionAssetsForBboxOptionalParams,
  DataGetCollectionAssetsForTileNoTmsOptionalParams,
  DataGetCollectionAssetsForTileOptionalParams,
  DataGetCollectionWmtsCapabilitiesByTmsOptionalParams,
  DataGetCollectionWmtsCapabilitiesOptionalParams,
  DataGetCollectionTileJsonByTmsOptionalParams,
  DataGetCollectionTileJsonOptionalParams,
  DataGetCollectionTileNoTmsByScaleOptionalParams,
  DataGetCollectionTileNoTmsByFormatOptionalParams,
  DataGetCollectionTileNoTmsOptionalParams,
  DataGetCollectionTileNoTmsByScaleAndFormatOptionalParams,
  DataGetCollectionTileByScaleOptionalParams,
  DataGetCollectionTileByFormatOptionalParams,
  DataGetCollectionTileOptionalParams,
  DataGetCollectionTileByScaleAndFormatOptionalParams,
  DataGetCollectionTilesetMetadataOptionalParams,
  DataGetCollectionTilesetsOptionalParams,
  DataGetItemBboxCropWithDimensionsOptionalParams,
  DataGetItemBboxCropOptionalParams,
  DataGetItemPreviewWithFormatOptionalParams,
  DataGetItemPreviewOptionalParams,
  DataGetItemPointOptionalParams,
  DataGetItemWmtsCapabilitiesByTmsOptionalParams,
  DataGetItemWmtsCapabilitiesOptionalParams,
  DataGetItemTileJsonByTmsOptionalParams,
  DataGetItemTileJsonOptionalParams,
  DataGetItemFeatureStatisticsOptionalParams,
  DataGetItemStatisticsOptionalParams,
  DataGetItemAssetStatisticsOptionalParams,
  DataGetItemAvailableAssetsOptionalParams,
  DataGetItemInfoGeoJsonOptionalParams,
  DataGetItemInfoOptionalParams,
  DataGetItemBoundsOptionalParams,
  DataCropFeatureWidthByHeightOptionalParams,
  DataCropFeatureByFormatOptionalParams,
  DataCropFeatureOptionalParams,
  DataGetTileNoTmsByScaleAndFormatOptionalParams,
  DataGetTileNoTmsByScaleOptionalParams,
  DataGetTileNoTmsByFormatOptionalParams,
  DataGetTileNoTmsOptionalParams,
  DataGetTileByScaleAndFormatOptionalParams,
  DataGetTileByScaleOptionalParams,
  DataGetTileByFormatOptionalParams,
  DataGetTileOptionalParams,
  DataGetTilesetMetadataOptionalParams,
  DataGetTilesetsOptionalParams,
  DataRegisterMosaicsSearchOptionalParams,
  DataGetLegendOptionalParams,
  DataGetIntervalLegendOptionalParams,
  DataGetClassMapLegendOptionalParams,
  DataGetTileMatricesOptionalParams,
  DataGetTileMatrixDefinitionsOptionalParams,
} from "../../api/data/options.js";
import type {
  TileMatrixSet,
  ClassMapLegendResponse,
  TilerMosaicSearchRegistrationResponse,
  TileSetList,
  TileSetMetadata,
  Feature,
  StacItemBounds,
  TilerInfoMapResponse,
  TilerInfoGeoJsonFeature,
  AssetStatisticsResponse,
  TilerStacItemStatistics,
  StacItemStatisticsGeoJson,
  TileJsonMetadata,
  TilerCoreModelsResponsesPoint,
  TilerAssetGeoJson,
  TilerStacSearchRegistration,
  StacItemPointAsset,
  DataGetSearchAssetsForTileNoTmsResponse,
  DataGetSearchTileNoTmsByScaleAndFormatResponse,
  DataGetSearchTileNoTmsByScaleResponse,
  DataGetSearchTileNoTmsByFormatResponse,
  DataGetSearchTileNoTmsResponse,
  DataGetSearchWmtsCapabilitiesResponse,
  DataCropSearchFeatureWidthByHeightResponse,
  DataCropSearchFeatureByFormatResponse,
  DataCropSearchFeatureResponse,
  DataGetSearchBboxAssetsResponse,
  DataGetSearchBboxCropWithDimensionsResponse,
  DataGetSearchBboxCropResponse,
  DataGetSearchWmtsCapabilitiesByTmsResponse,
  DataGetSearchTileByScaleResponse,
  DataGetSearchTileByFormatResponse,
  DataGetSearchTileResponse,
  DataGetSearchTileByScaleAndFormatResponse,
  DataCropCollectionFeatureWidthByHeightResponse,
  DataCropCollectionFeatureByFormatResponse,
  DataCropCollectionFeatureResponse,
  DataGetCollectionBboxCropWithDimensionsResponse,
  DataGetCollectionBboxCropResponse,
  DataGetCollectionAssetsForBboxResponse,
  DataGetCollectionAssetsForTileNoTmsResponse,
  DataGetCollectionWmtsCapabilitiesByTmsResponse,
  DataGetCollectionWmtsCapabilitiesResponse,
  DataGetCollectionTileNoTmsByScaleResponse,
  DataGetCollectionTileNoTmsByFormatResponse,
  DataGetCollectionTileNoTmsResponse,
  DataGetCollectionTileNoTmsByScaleAndFormatResponse,
  DataGetCollectionTileByScaleResponse,
  DataGetCollectionTileByFormatResponse,
  DataGetCollectionTileResponse,
  DataGetCollectionTileByScaleAndFormatResponse,
  DataGetItemBboxCropWithDimensionsResponse,
  DataGetItemBboxCropResponse,
  DataGetItemPreviewWithFormatResponse,
  DataGetItemPreviewResponse,
  DataGetItemWmtsCapabilitiesByTmsResponse,
  DataGetItemWmtsCapabilitiesResponse,
  DataGetItemAvailableAssetsResponse,
  DataCropFeatureWidthByHeightResponse,
  DataCropFeatureByFormatResponse,
  DataCropFeatureResponse,
  DataGetTileNoTmsByScaleAndFormatResponse,
  DataGetTileNoTmsByScaleResponse,
  DataGetTileNoTmsByFormatResponse,
  DataGetTileNoTmsResponse,
  DataGetTileByScaleAndFormatResponse,
  DataGetTileByScaleResponse,
  DataGetTileByFormatResponse,
  DataGetTileResponse,
  DataGetLegendResponse,
  DataGetIntervalLegendResponse,
  DataGetTileMatricesResponse,
} from "../../models/models.js";

/** Interface representing a Data operations. */
export interface DataOperations {
  /** Return a list of assets for a given point in a search. */
  getSearchPointWithAssets: (
    searchId: string,
    longitude: number,
    latitude: number,
    options?: DataGetSearchPointWithAssetsOptionalParams,
  ) => Promise<StacItemPointAsset[]>;
  /** Get Point value for a search dataset. */
  getSearchPoint: (
    searchId: string,
    longitude: number,
    latitude: number,
    options?: DataGetSearchPointOptionalParams,
  ) => Promise<TilerCoreModelsResponsesPoint>;
  /** The most basic operation. */
  getSearchAssetsForTileNoTms: (
    searchId: string,
    z: number,
    x: number,
    y: number,
    options?: DataGetSearchAssetsForTileNoTmsOptionalParams,
  ) => Promise<DataGetSearchAssetsForTileNoTmsResponse>;
  /** The most basic operation. */
  getSearchTileNoTmsByScaleAndFormat: (
    searchId: string,
    z: number,
    x: number,
    y: number,
    scale: number,
    format: string,
    options?: DataGetSearchTileNoTmsByScaleAndFormatOptionalParams,
  ) => Promise<DataGetSearchTileNoTmsByScaleAndFormatResponse>;
  /** The most basic operation. */
  getSearchTileNoTmsByScale: (
    searchId: string,
    z: number,
    x: number,
    y: number,
    scale: number,
    options?: DataGetSearchTileNoTmsByScaleOptionalParams,
  ) => Promise<DataGetSearchTileNoTmsByScaleResponse>;
  /** The most basic operation. */
  getSearchTileNoTmsByFormat: (
    searchId: string,
    z: number,
    x: number,
    y: number,
    format: string,
    options?: DataGetSearchTileNoTmsByFormatOptionalParams,
  ) => Promise<DataGetSearchTileNoTmsByFormatResponse>;
  /** The most basic operation. */
  getSearchTileNoTms: (
    searchId: string,
    z: number,
    x: number,
    y: number,
    options?: DataGetSearchTileNoTmsOptionalParams,
  ) => Promise<DataGetSearchTileNoTmsResponse>;
  /** Return TileJSON document for a search. */
  getSearchTileJson: (
    searchId: string,
    options?: DataGetSearchTileJsonOptionalParams,
  ) => Promise<TileJsonMetadata>;
  /** OGC WMTS endpoint. */
  getSearchWmtsCapabilities: (
    searchId: string,
    options?: DataGetSearchWmtsCapabilitiesOptionalParams,
  ) => Promise<DataGetSearchWmtsCapabilitiesResponse>;
  /** Create image from a geojson feature with dimensions. */
  cropSearchFeatureWidthByHeight: (
    searchId: string,
    width: number,
    height: number,
    format: string,
    body: Feature,
    options?: DataCropSearchFeatureWidthByHeightOptionalParams,
  ) => Promise<DataCropSearchFeatureWidthByHeightResponse>;
  /** Create image from a geojson feature with format. */
  cropSearchFeatureByFormat: (
    searchId: string,
    format: string,
    body: Feature,
    options?: DataCropSearchFeatureByFormatOptionalParams,
  ) => Promise<DataCropSearchFeatureByFormatResponse>;
  /** Create image from a geojson feature (without format in path). */
  cropSearchFeature: (
    searchId: string,
    body: Feature,
    options?: DataCropSearchFeatureOptionalParams,
  ) => Promise<DataCropSearchFeatureResponse>;
  /** Return a list of assets which overlap a given bounding box for a search. */
  getSearchBboxAssets: (
    searchId: string,
    minx: number,
    miny: number,
    maxx: number,
    maxy: number,
    options?: DataGetSearchBboxAssetsOptionalParams,
  ) => Promise<DataGetSearchBboxAssetsResponse>;
  /** Create an image from part of a dataset (bounding box crop with dimensions). */
  getSearchBboxCropWithDimensions: (
    searchId: string,
    minx: number,
    miny: number,
    maxx: number,
    maxy: number,
    width: number,
    height: number,
    format: string,
    options?: DataGetSearchBboxCropWithDimensionsOptionalParams,
  ) => Promise<DataGetSearchBboxCropWithDimensionsResponse>;
  /** Create an image from part of a dataset (bounding box crop). */
  getSearchBboxCrop: (
    searchId: string,
    minx: number,
    miny: number,
    maxx: number,
    maxy: number,
    format: string,
    options?: DataGetSearchBboxCropOptionalParams,
  ) => Promise<DataGetSearchBboxCropResponse>;
  /** Get Search query metadata. */
  getSearchInfo: (
    searchId: string,
    options?: DataGetSearchInfoOptionalParams,
  ) => Promise<TilerStacSearchRegistration>;
  /** OGC WMTS endpoint with TileMatrixSetId as path. */
  getSearchWmtsCapabilitiesByTms: (
    searchId: string,
    tileMatrixSetId: string,
    options?: DataGetSearchWmtsCapabilitiesByTmsOptionalParams,
  ) => Promise<DataGetSearchWmtsCapabilitiesByTmsResponse>;
  /** Return TileJSON document for a search with TileMatrixSetId as path. */
  getSearchTileJsonByTms: (
    searchId: string,
    tileMatrixSetId: string,
    options?: DataGetSearchTileJsonByTmsOptionalParams,
  ) => Promise<TileJsonMetadata>;
  /** Return a list of assets which overlap a given tile. */
  getSearchAssetsForTile: (
    searchId: string,
    tileMatrixSetId: string,
    collectionId: string,
    z: number,
    x: number,
    y: number,
    options?: DataGetSearchAssetsForTileOptionalParams,
  ) => Promise<TilerAssetGeoJson[]>;
  /** Create map tile (with TileMatrixSetId and scale, without format). */
  getSearchTileByScale: (
    searchId: string,
    tileMatrixSetId: string,
    z: number,
    x: number,
    y: number,
    scale: number,
    options?: DataGetSearchTileByScaleOptionalParams,
  ) => Promise<DataGetSearchTileByScaleResponse>;
  /** Create map tile (with TileMatrixSetId and format, without scale). */
  getSearchTileByFormat: (
    searchId: string,
    tileMatrixSetId: string,
    z: number,
    x: number,
    y: number,
    format: string,
    options?: DataGetSearchTileByFormatOptionalParams,
  ) => Promise<DataGetSearchTileByFormatResponse>;
  /** Create map tile (with TileMatrixSetId, without scale or format). */
  getSearchTile: (
    searchId: string,
    tileMatrixSetId: string,
    z: number,
    x: number,
    y: number,
    options?: DataGetSearchTileOptionalParams,
  ) => Promise<DataGetSearchTileResponse>;
  /** Create map tile (with TileMatrixSetId, scale, and format in path). */
  getSearchTileByScaleAndFormat: (
    searchId: string,
    tileMatrixSetId: string,
    z: number,
    x: number,
    y: number,
    scale: number,
    format: string,
    options?: DataGetSearchTileByScaleAndFormatOptionalParams,
  ) => Promise<DataGetSearchTileByScaleAndFormatResponse>;
  /** Return metadata for a specific tileset of a mosaic search. */
  getSearchTilesetMetadata: (
    searchId: string,
    tileMatrixSetId: string,
    options?: DataGetSearchTilesetMetadataOptionalParams,
  ) => Promise<TileSetMetadata>;
  /** Return a list of available tilesets for a mosaic search. */
  getSearchTilesets: (
    searchId: string,
    options?: DataGetSearchTilesetsOptionalParams,
  ) => Promise<TileSetList>;
  /** Return a list of assets for a given point in a collection. */
  getCollectionPointAssets: (
    collectionId: string,
    longitude: number,
    latitude: number,
    options?: DataGetCollectionPointAssetsOptionalParams,
  ) => Promise<StacItemPointAsset[]>;
  /** Get Point value for a collection dataset. */
  getCollectionPoint: (
    collectionId: string,
    longitude: number,
    latitude: number,
    options?: DataGetCollectionPointOptionalParams,
  ) => Promise<TilerCoreModelsResponsesPoint>;
  /** Create image from a geojson feature with dimensions. */
  cropCollectionFeatureWidthByHeight: (
    collectionId: string,
    width: number,
    height: number,
    format: string,
    body: Feature,
    options?: DataCropCollectionFeatureWidthByHeightOptionalParams,
  ) => Promise<DataCropCollectionFeatureWidthByHeightResponse>;
  /** Create image from a geojson feature with format. */
  cropCollectionFeatureByFormat: (
    collectionId: string,
    format: string,
    body: Feature,
    options?: DataCropCollectionFeatureByFormatOptionalParams,
  ) => Promise<DataCropCollectionFeatureByFormatResponse>;
  /** Create image from a geojson feature (without format in path). */
  cropCollectionFeature: (
    collectionId: string,
    body: Feature,
    options?: DataCropCollectionFeatureOptionalParams,
  ) => Promise<DataCropCollectionFeatureResponse>;
  /** Create an image from part of a STAC collection dataset (bounding box crop with dimensions). */
  getCollectionBboxCropWithDimensions: (
    collectionId: string,
    minx: number,
    miny: number,
    maxx: number,
    maxy: number,
    width: number,
    height: number,
    format: string,
    options?: DataGetCollectionBboxCropWithDimensionsOptionalParams,
  ) => Promise<DataGetCollectionBboxCropWithDimensionsResponse>;
  /** Create an image from part of a STAC collection dataset (bounding box crop). */
  getCollectionBboxCrop: (
    collectionId: string,
    minx: number,
    miny: number,
    maxx: number,
    maxy: number,
    format: string,
    options?: DataGetCollectionBboxCropOptionalParams,
  ) => Promise<DataGetCollectionBboxCropResponse>;
  /** Return search query info from a STAC collection identifier. */
  getCollectionInfo: (
    collectionId: string,
    options?: DataGetCollectionInfoOptionalParams,
  ) => Promise<TilerStacSearchRegistration>;
  /** Return a list of assets which overlap a given bounding box for a STAC collection. */
  getCollectionAssetsForBbox: (
    collectionId: string,
    minx: number,
    miny: number,
    maxx: number,
    maxy: number,
    options?: DataGetCollectionAssetsForBboxOptionalParams,
  ) => Promise<DataGetCollectionAssetsForBboxResponse>;
  /** Return a list of assets which overlap a given tile for a STAC collection (without TileMatrixSetId). */
  getCollectionAssetsForTileNoTms: (
    collectionId: string,
    z: number,
    x: number,
    y: number,
    options?: DataGetCollectionAssetsForTileNoTmsOptionalParams,
  ) => Promise<DataGetCollectionAssetsForTileNoTmsResponse>;
  /** Return a list of assets which overlap a given tile for a STAC collection (with TileMatrixSetId). */
  getCollectionAssetsForTile: (
    collectionId: string,
    tileMatrixSetId: string,
    z: number,
    x: number,
    y: number,
    options?: DataGetCollectionAssetsForTileOptionalParams,
  ) => Promise<TilerAssetGeoJson[]>;
  /** OGC WMTS endpoint for a STAC collection with TileMatrixSetId as path. */
  getCollectionWmtsCapabilitiesByTms: (
    collectionId: string,
    tileMatrixSetId: string,
    options?: DataGetCollectionWmtsCapabilitiesByTmsOptionalParams,
  ) => Promise<DataGetCollectionWmtsCapabilitiesByTmsResponse>;
  /** OGC WMTS endpoint for a STAC collection. */
  getCollectionWmtsCapabilities: (
    collectionId: string,
    options?: DataGetCollectionWmtsCapabilitiesOptionalParams,
  ) => Promise<DataGetCollectionWmtsCapabilitiesResponse>;
  /** Return TileJSON document for a STAC collection with TileMatrixSetId as path. */
  getCollectionTileJsonByTms: (
    collectionId: string,
    tileMatrixSetId: string,
    options?: DataGetCollectionTileJsonByTmsOptionalParams,
  ) => Promise<TileJsonMetadata>;
  /** Return TileJSON document for a STAC collection. */
  getCollectionTileJson: (
    collectionId: string,
    options?: DataGetCollectionTileJsonOptionalParams,
  ) => Promise<TileJsonMetadata>;
  /** Create map tile for a STAC collection (with scale, without TileMatrixSetId or format). */
  getCollectionTileNoTmsByScale: (
    collectionId: string,
    z: number,
    x: number,
    y: number,
    scale: number,
    options?: DataGetCollectionTileNoTmsByScaleOptionalParams,
  ) => Promise<DataGetCollectionTileNoTmsByScaleResponse>;
  /** Create map tile for a STAC collection (with format, without TileMatrixSetId or scale). */
  getCollectionTileNoTmsByFormat: (
    collectionId: string,
    z: number,
    x: number,
    y: number,
    format: string,
    options?: DataGetCollectionTileNoTmsByFormatOptionalParams,
  ) => Promise<DataGetCollectionTileNoTmsByFormatResponse>;
  /** Create map tile for a STAC collection (without TileMatrixSetId, scale, or format). */
  getCollectionTileNoTms: (
    collectionId: string,
    z: number,
    x: number,
    y: number,
    options?: DataGetCollectionTileNoTmsOptionalParams,
  ) => Promise<DataGetCollectionTileNoTmsResponse>;
  /** Create map tile for a STAC collection (without TileMatrixSetId, with scale and format). */
  getCollectionTileNoTmsByScaleAndFormat: (
    collectionId: string,
    z: number,
    x: number,
    y: number,
    scale: number,
    format: string,
    options?: DataGetCollectionTileNoTmsByScaleAndFormatOptionalParams,
  ) => Promise<DataGetCollectionTileNoTmsByScaleAndFormatResponse>;
  /** Create map tile for a STAC collection (with TileMatrixSetId and scale, without format). */
  getCollectionTileByScale: (
    collectionId: string,
    tileMatrixSetId: string,
    z: number,
    x: number,
    y: number,
    scale: number,
    options?: DataGetCollectionTileByScaleOptionalParams,
  ) => Promise<DataGetCollectionTileByScaleResponse>;
  /** Create map tile for a STAC collection (with TileMatrixSetId and format, without scale). */
  getCollectionTileByFormat: (
    collectionId: string,
    tileMatrixSetId: string,
    z: number,
    x: number,
    y: number,
    format: string,
    options?: DataGetCollectionTileByFormatOptionalParams,
  ) => Promise<DataGetCollectionTileByFormatResponse>;
  /** Create map tile for a STAC collection (with TileMatrixSetId, without scale or format). */
  getCollectionTile: (
    collectionId: string,
    tileMatrixSetId: string,
    z: number,
    x: number,
    y: number,
    options?: DataGetCollectionTileOptionalParams,
  ) => Promise<DataGetCollectionTileResponse>;
  /** Create map tile for a STAC collection (with TileMatrixSetId, scale, and format in path). */
  getCollectionTileByScaleAndFormat: (
    collectionId: string,
    tileMatrixSetId: string,
    z: number,
    x: number,
    y: number,
    scale: number,
    format: string,
    options?: DataGetCollectionTileByScaleAndFormatOptionalParams,
  ) => Promise<DataGetCollectionTileByScaleAndFormatResponse>;
  /** Return metadata for a specific tileset of a STAC collection. */
  getCollectionTilesetMetadata: (
    collectionId: string,
    tileMatrixSetId: string,
    options?: DataGetCollectionTilesetMetadataOptionalParams,
  ) => Promise<TileSetMetadata>;
  /** Return a list of available tilesets for a STAC collection. */
  getCollectionTilesets: (
    collectionId: string,
    options?: DataGetCollectionTilesetsOptionalParams,
  ) => Promise<TileSetList>;
  /** Create an image from part of a STAC item dataset (bounding box crop with dimensions). */
  getItemBboxCropWithDimensions: (
    collectionId: string,
    itemId: string,
    minx: number,
    miny: number,
    maxx: number,
    maxy: number,
    width: number,
    height: number,
    format: string,
    options?: DataGetItemBboxCropWithDimensionsOptionalParams,
  ) => Promise<DataGetItemBboxCropWithDimensionsResponse>;
  /** Create an image from part of a STAC item dataset (bounding box crop). */
  getItemBboxCrop: (
    collectionId: string,
    itemId: string,
    minx: number,
    miny: number,
    maxx: number,
    maxy: number,
    format: string,
    options?: DataGetItemBboxCropOptionalParams,
  ) => Promise<DataGetItemBboxCropResponse>;
  /** Create preview of a STAC item dataset with format. */
  getItemPreviewWithFormat: (
    collectionId: string,
    itemId: string,
    format: string,
    options?: DataGetItemPreviewWithFormatOptionalParams,
  ) => Promise<DataGetItemPreviewWithFormatResponse>;
  /** Create preview of a STAC item dataset. */
  getItemPreview: (
    collectionId: string,
    itemId: string,
    options?: DataGetItemPreviewOptionalParams,
  ) => Promise<DataGetItemPreviewResponse>;
  /** Get point value for a STAC item dataset. */
  getItemPoint: (
    collectionId: string,
    itemId: string,
    longitude: number,
    latitude: number,
    options?: DataGetItemPointOptionalParams,
  ) => Promise<TilerCoreModelsResponsesPoint>;
  /** OGC WMTS endpoint for a STAC item with TileMatrixSetId as path. */
  getItemWmtsCapabilitiesByTms: (
    collectionId: string,
    itemId: string,
    tileMatrixSetId: string,
    options?: DataGetItemWmtsCapabilitiesByTmsOptionalParams,
  ) => Promise<DataGetItemWmtsCapabilitiesByTmsResponse>;
  /** OGC WMTS endpoint for a STAC item. */
  getItemWmtsCapabilities: (
    collectionId: string,
    itemId: string,
    options?: DataGetItemWmtsCapabilitiesOptionalParams,
  ) => Promise<DataGetItemWmtsCapabilitiesResponse>;
  /** Return TileJSON document for a STAC item with TileMatrixSetId as path. */
  getItemTileJsonByTms: (
    collectionId: string,
    itemId: string,
    tileMatrixSetId: string,
    options?: DataGetItemTileJsonByTmsOptionalParams,
  ) => Promise<TileJsonMetadata>;
  /** Return TileJSON document for a STAC item. */
  getItemTileJson: (
    collectionId: string,
    itemId: string,
    options?: DataGetItemTileJsonOptionalParams,
  ) => Promise<TileJsonMetadata>;
  /** Get statistics from a GeoJSON feature for a STAC item. */
  getItemFeatureStatistics: (
    collectionId: string,
    itemId: string,
    body: Feature,
    options?: DataGetItemFeatureStatisticsOptionalParams,
  ) => Promise<StacItemStatisticsGeoJson>;
  /** Merged assets statistics for a STAC item. */
  getItemStatistics: (
    collectionId: string,
    itemId: string,
    options?: DataGetItemStatisticsOptionalParams,
  ) => Promise<TilerStacItemStatistics>;
  /** Per asset statistics for a STAC item. */
  getItemAssetStatistics: (
    collectionId: string,
    itemId: string,
    options?: DataGetItemAssetStatisticsOptionalParams,
  ) => Promise<AssetStatisticsResponse>;
  /** Return a list of supported assets for a STAC item. */
  getItemAvailableAssets: (
    collectionId: string,
    itemId: string,
    options?: DataGetItemAvailableAssetsOptionalParams,
  ) => Promise<DataGetItemAvailableAssetsResponse>;
  /** Return info as GeoJSON for a STAC item. */
  getItemInfoGeoJson: (
    collectionId: string,
    itemId: string,
    options?: DataGetItemInfoGeoJsonOptionalParams,
  ) => Promise<TilerInfoGeoJsonFeature>;
  /** Return dataset's basic info for a STAC item. */
  getItemInfo: (
    collectionId: string,
    itemId: string,
    options?: DataGetItemInfoOptionalParams,
  ) => Promise<TilerInfoMapResponse>;
  /** Return the bounds for a STAC item. */
  getItemBounds: (
    collectionId: string,
    itemId: string,
    options?: DataGetItemBoundsOptionalParams,
  ) => Promise<StacItemBounds>;
  /** Create image from a geojson feature with dimensions. */
  cropFeatureWidthByHeight: (
    collectionId: string,
    itemId: string,
    width: number,
    height: number,
    format: string,
    body: Feature,
    options?: DataCropFeatureWidthByHeightOptionalParams,
  ) => Promise<DataCropFeatureWidthByHeightResponse>;
  /** Create image from a geojson feature with format. */
  cropFeatureByFormat: (
    collectionId: string,
    itemId: string,
    format: string,
    body: Feature,
    options?: DataCropFeatureByFormatOptionalParams,
  ) => Promise<DataCropFeatureByFormatResponse>;
  /** Create image from a geojson feature (without format in path). */
  cropFeature: (
    collectionId: string,
    itemId: string,
    body: Feature,
    options?: DataCropFeatureOptionalParams,
  ) => Promise<DataCropFeatureResponse>;
  /** Create map tile from a dataset (with scale and format in path, without TileMatrixSetId). */
  getTileNoTmsByScaleAndFormat: (
    collectionId: string,
    itemId: string,
    z: number,
    x: number,
    y: number,
    scale: number,
    format: string,
    options?: DataGetTileNoTmsByScaleAndFormatOptionalParams,
  ) => Promise<DataGetTileNoTmsByScaleAndFormatResponse>;
  /** Create map tile from a dataset (with scale in path, without TileMatrixSetId or format). */
  getTileNoTmsByScale: (
    collectionId: string,
    itemId: string,
    z: number,
    x: number,
    y: number,
    scale: number,
    options?: DataGetTileNoTmsByScaleOptionalParams,
  ) => Promise<DataGetTileNoTmsByScaleResponse>;
  /** Create map tile from a dataset (with format in path, without TileMatrixSetId or scale). */
  getTileNoTmsByFormat: (
    collectionId: string,
    itemId: string,
    z: number,
    x: number,
    y: number,
    format: string,
    options?: DataGetTileNoTmsByFormatOptionalParams,
  ) => Promise<DataGetTileNoTmsByFormatResponse>;
  /** Create map tile from a dataset (without TileMatrixSetId, scale or format in path). */
  getTileNoTms: (
    collectionId: string,
    itemId: string,
    z: number,
    x: number,
    y: number,
    options?: DataGetTileNoTmsOptionalParams,
  ) => Promise<DataGetTileNoTmsResponse>;
  /** Create map tile from a dataset (with TileMatrixSetId, scale, and format in path). */
  getTileByScaleAndFormat: (
    collectionId: string,
    itemId: string,
    tileMatrixSetId: string,
    z: number,
    x: number,
    y: number,
    scale: number,
    format: string,
    options?: DataGetTileByScaleAndFormatOptionalParams,
  ) => Promise<DataGetTileByScaleAndFormatResponse>;
  /** Create map tile from a dataset (with scale in path, without format). */
  getTileByScale: (
    collectionId: string,
    itemId: string,
    tileMatrixSetId: string,
    z: number,
    x: number,
    y: number,
    scale: number,
    options?: DataGetTileByScaleOptionalParams,
  ) => Promise<DataGetTileByScaleResponse>;
  /** Create map tile from a dataset (with format in path, without scale). */
  getTileByFormat: (
    collectionId: string,
    itemId: string,
    tileMatrixSetId: string,
    z: number,
    x: number,
    y: number,
    format: string,
    options?: DataGetTileByFormatOptionalParams,
  ) => Promise<DataGetTileByFormatResponse>;
  /** Create map tile from a dataset (without scale or format in path). */
  getTile: (
    collectionId: string,
    itemId: string,
    tileMatrixSetId: string,
    z: number,
    x: number,
    y: number,
    options?: DataGetTileOptionalParams,
  ) => Promise<DataGetTileResponse>;
  /** Return metadata for a specific tileset of a STAC item. */
  getTilesetMetadata: (
    collectionId: string,
    itemId: string,
    tileMatrixSetId: string,
    options?: DataGetTilesetMetadataOptionalParams,
  ) => Promise<TileSetMetadata>;
  /** Return a list of available tilesets for a STAC item. */
  getTilesets: (
    collectionId: string,
    itemId: string,
    options?: DataGetTilesetsOptionalParams,
  ) => Promise<TileSetList>;
  /** Register a Search query */
  registerMosaicsSearch: (
    options?: DataRegisterMosaicsSearchOptionalParams,
  ) => Promise<TilerMosaicSearchRegistrationResponse>;
  /**
   * Generate a legend image for a given colormap.
   *
   * If the colormap has non-contiguous values at the beginning or end,
   * which aren't desired in the output image, they can be trimmed by specifying
   * the number of values to trim.
   */
  getLegend: (
    colorMapName: string,
    options?: DataGetLegendOptionalParams,
  ) => Promise<DataGetLegendResponse>;
  /**
   * Generate values and color swatches mapping for a given interval classmap.
   *
   * Returns a color map for intervals, where each interval is defined by
   * a numeric range [min, max] representing the interval boundaries and
   * an RGBA color [red, green, blue, alpha] associated with the interval.
   *
   * The response is a 2D array of interval definitions, where each element is a pair:
   * the first element is an array of two numbers [min, max] defining the interval,
   * and the second element is an array of four numbers [red, green, blue, alpha] defining the RGBA color.
   *
   * Example: [[ [-2, 0], [0, 0, 0, 0] ], [ [1, 32], [255, 255, 178, 255] ]].
   * This defines two intervals: [-2, 0] mapped to transparent black and [1, 32] mapped to opaque yellow.
   */
  getIntervalLegend: (
    classmapName: string,
    options?: DataGetIntervalLegendOptionalParams,
  ) => Promise<DataGetIntervalLegendResponse>;
  /** Generate values and color swatches mapping for a given classmap. */
  getClassMapLegend: (
    classmapName: string,
    options?: DataGetClassMapLegendOptionalParams,
  ) => Promise<ClassMapLegendResponse>;
  /** Return Matrix List */
  getTileMatrices: (
    options?: DataGetTileMatricesOptionalParams,
  ) => Promise<DataGetTileMatricesResponse>;
  /** Return Matrix Definition */
  getTileMatrixDefinitions: (
    tileMatrixSetId: string,
    options?: DataGetTileMatrixDefinitionsOptionalParams,
  ) => Promise<TileMatrixSet>;
}

function _getData(context: PlanetaryComputerProContext) {
  return {
    getSearchPointWithAssets: (
      searchId: string,
      longitude: number,
      latitude: number,
      options?: DataGetSearchPointWithAssetsOptionalParams,
    ) => getSearchPointWithAssets(context, searchId, longitude, latitude, options),
    getSearchPoint: (
      searchId: string,
      longitude: number,
      latitude: number,
      options?: DataGetSearchPointOptionalParams,
    ) => getSearchPoint(context, searchId, longitude, latitude, options),
    getSearchAssetsForTileNoTms: (
      searchId: string,
      z: number,
      x: number,
      y: number,
      options?: DataGetSearchAssetsForTileNoTmsOptionalParams,
    ) => getSearchAssetsForTileNoTms(context, searchId, z, x, y, options),
    getSearchTileNoTmsByScaleAndFormat: (
      searchId: string,
      z: number,
      x: number,
      y: number,
      scale: number,
      format: string,
      options?: DataGetSearchTileNoTmsByScaleAndFormatOptionalParams,
    ) => getSearchTileNoTmsByScaleAndFormat(context, searchId, z, x, y, scale, format, options),
    getSearchTileNoTmsByScale: (
      searchId: string,
      z: number,
      x: number,
      y: number,
      scale: number,
      options?: DataGetSearchTileNoTmsByScaleOptionalParams,
    ) => getSearchTileNoTmsByScale(context, searchId, z, x, y, scale, options),
    getSearchTileNoTmsByFormat: (
      searchId: string,
      z: number,
      x: number,
      y: number,
      format: string,
      options?: DataGetSearchTileNoTmsByFormatOptionalParams,
    ) => getSearchTileNoTmsByFormat(context, searchId, z, x, y, format, options),
    getSearchTileNoTms: (
      searchId: string,
      z: number,
      x: number,
      y: number,
      options?: DataGetSearchTileNoTmsOptionalParams,
    ) => getSearchTileNoTms(context, searchId, z, x, y, options),
    getSearchTileJson: (searchId: string, options?: DataGetSearchTileJsonOptionalParams) =>
      getSearchTileJson(context, searchId, options),
    getSearchWmtsCapabilities: (
      searchId: string,
      options?: DataGetSearchWmtsCapabilitiesOptionalParams,
    ) => getSearchWmtsCapabilities(context, searchId, options),
    cropSearchFeatureWidthByHeight: (
      searchId: string,
      width: number,
      height: number,
      format: string,
      body: Feature,
      options?: DataCropSearchFeatureWidthByHeightOptionalParams,
    ) => cropSearchFeatureWidthByHeight(context, searchId, width, height, format, body, options),
    cropSearchFeatureByFormat: (
      searchId: string,
      format: string,
      body: Feature,
      options?: DataCropSearchFeatureByFormatOptionalParams,
    ) => cropSearchFeatureByFormat(context, searchId, format, body, options),
    cropSearchFeature: (
      searchId: string,
      body: Feature,
      options?: DataCropSearchFeatureOptionalParams,
    ) => cropSearchFeature(context, searchId, body, options),
    getSearchBboxAssets: (
      searchId: string,
      minx: number,
      miny: number,
      maxx: number,
      maxy: number,
      options?: DataGetSearchBboxAssetsOptionalParams,
    ) => getSearchBboxAssets(context, searchId, minx, miny, maxx, maxy, options),
    getSearchBboxCropWithDimensions: (
      searchId: string,
      minx: number,
      miny: number,
      maxx: number,
      maxy: number,
      width: number,
      height: number,
      format: string,
      options?: DataGetSearchBboxCropWithDimensionsOptionalParams,
    ) =>
      getSearchBboxCropWithDimensions(
        context,
        searchId,
        minx,
        miny,
        maxx,
        maxy,
        width,
        height,
        format,
        options,
      ),
    getSearchBboxCrop: (
      searchId: string,
      minx: number,
      miny: number,
      maxx: number,
      maxy: number,
      format: string,
      options?: DataGetSearchBboxCropOptionalParams,
    ) => getSearchBboxCrop(context, searchId, minx, miny, maxx, maxy, format, options),
    getSearchInfo: (searchId: string, options?: DataGetSearchInfoOptionalParams) =>
      getSearchInfo(context, searchId, options),
    getSearchWmtsCapabilitiesByTms: (
      searchId: string,
      tileMatrixSetId: string,
      options?: DataGetSearchWmtsCapabilitiesByTmsOptionalParams,
    ) => getSearchWmtsCapabilitiesByTms(context, searchId, tileMatrixSetId, options),
    getSearchTileJsonByTms: (
      searchId: string,
      tileMatrixSetId: string,
      options?: DataGetSearchTileJsonByTmsOptionalParams,
    ) => getSearchTileJsonByTms(context, searchId, tileMatrixSetId, options),
    getSearchAssetsForTile: (
      searchId: string,
      tileMatrixSetId: string,
      collectionId: string,
      z: number,
      x: number,
      y: number,
      options?: DataGetSearchAssetsForTileOptionalParams,
    ) => getSearchAssetsForTile(context, searchId, tileMatrixSetId, collectionId, z, x, y, options),
    getSearchTileByScale: (
      searchId: string,
      tileMatrixSetId: string,
      z: number,
      x: number,
      y: number,
      scale: number,
      options?: DataGetSearchTileByScaleOptionalParams,
    ) => getSearchTileByScale(context, searchId, tileMatrixSetId, z, x, y, scale, options),
    getSearchTileByFormat: (
      searchId: string,
      tileMatrixSetId: string,
      z: number,
      x: number,
      y: number,
      format: string,
      options?: DataGetSearchTileByFormatOptionalParams,
    ) => getSearchTileByFormat(context, searchId, tileMatrixSetId, z, x, y, format, options),
    getSearchTile: (
      searchId: string,
      tileMatrixSetId: string,
      z: number,
      x: number,
      y: number,
      options?: DataGetSearchTileOptionalParams,
    ) => getSearchTile(context, searchId, tileMatrixSetId, z, x, y, options),
    getSearchTileByScaleAndFormat: (
      searchId: string,
      tileMatrixSetId: string,
      z: number,
      x: number,
      y: number,
      scale: number,
      format: string,
      options?: DataGetSearchTileByScaleAndFormatOptionalParams,
    ) =>
      getSearchTileByScaleAndFormat(
        context,
        searchId,
        tileMatrixSetId,
        z,
        x,
        y,
        scale,
        format,
        options,
      ),
    getSearchTilesetMetadata: (
      searchId: string,
      tileMatrixSetId: string,
      options?: DataGetSearchTilesetMetadataOptionalParams,
    ) => getSearchTilesetMetadata(context, searchId, tileMatrixSetId, options),
    getSearchTilesets: (searchId: string, options?: DataGetSearchTilesetsOptionalParams) =>
      getSearchTilesets(context, searchId, options),
    getCollectionPointAssets: (
      collectionId: string,
      longitude: number,
      latitude: number,
      options?: DataGetCollectionPointAssetsOptionalParams,
    ) => getCollectionPointAssets(context, collectionId, longitude, latitude, options),
    getCollectionPoint: (
      collectionId: string,
      longitude: number,
      latitude: number,
      options?: DataGetCollectionPointOptionalParams,
    ) => getCollectionPoint(context, collectionId, longitude, latitude, options),
    cropCollectionFeatureWidthByHeight: (
      collectionId: string,
      width: number,
      height: number,
      format: string,
      body: Feature,
      options?: DataCropCollectionFeatureWidthByHeightOptionalParams,
    ) =>
      cropCollectionFeatureWidthByHeight(
        context,
        collectionId,
        width,
        height,
        format,
        body,
        options,
      ),
    cropCollectionFeatureByFormat: (
      collectionId: string,
      format: string,
      body: Feature,
      options?: DataCropCollectionFeatureByFormatOptionalParams,
    ) => cropCollectionFeatureByFormat(context, collectionId, format, body, options),
    cropCollectionFeature: (
      collectionId: string,
      body: Feature,
      options?: DataCropCollectionFeatureOptionalParams,
    ) => cropCollectionFeature(context, collectionId, body, options),
    getCollectionBboxCropWithDimensions: (
      collectionId: string,
      minx: number,
      miny: number,
      maxx: number,
      maxy: number,
      width: number,
      height: number,
      format: string,
      options?: DataGetCollectionBboxCropWithDimensionsOptionalParams,
    ) =>
      getCollectionBboxCropWithDimensions(
        context,
        collectionId,
        minx,
        miny,
        maxx,
        maxy,
        width,
        height,
        format,
        options,
      ),
    getCollectionBboxCrop: (
      collectionId: string,
      minx: number,
      miny: number,
      maxx: number,
      maxy: number,
      format: string,
      options?: DataGetCollectionBboxCropOptionalParams,
    ) => getCollectionBboxCrop(context, collectionId, minx, miny, maxx, maxy, format, options),
    getCollectionInfo: (collectionId: string, options?: DataGetCollectionInfoOptionalParams) =>
      getCollectionInfo(context, collectionId, options),
    getCollectionAssetsForBbox: (
      collectionId: string,
      minx: number,
      miny: number,
      maxx: number,
      maxy: number,
      options?: DataGetCollectionAssetsForBboxOptionalParams,
    ) => getCollectionAssetsForBbox(context, collectionId, minx, miny, maxx, maxy, options),
    getCollectionAssetsForTileNoTms: (
      collectionId: string,
      z: number,
      x: number,
      y: number,
      options?: DataGetCollectionAssetsForTileNoTmsOptionalParams,
    ) => getCollectionAssetsForTileNoTms(context, collectionId, z, x, y, options),
    getCollectionAssetsForTile: (
      collectionId: string,
      tileMatrixSetId: string,
      z: number,
      x: number,
      y: number,
      options?: DataGetCollectionAssetsForTileOptionalParams,
    ) => getCollectionAssetsForTile(context, collectionId, tileMatrixSetId, z, x, y, options),
    getCollectionWmtsCapabilitiesByTms: (
      collectionId: string,
      tileMatrixSetId: string,
      options?: DataGetCollectionWmtsCapabilitiesByTmsOptionalParams,
    ) => getCollectionWmtsCapabilitiesByTms(context, collectionId, tileMatrixSetId, options),
    getCollectionWmtsCapabilities: (
      collectionId: string,
      options?: DataGetCollectionWmtsCapabilitiesOptionalParams,
    ) => getCollectionWmtsCapabilities(context, collectionId, options),
    getCollectionTileJsonByTms: (
      collectionId: string,
      tileMatrixSetId: string,
      options?: DataGetCollectionTileJsonByTmsOptionalParams,
    ) => getCollectionTileJsonByTms(context, collectionId, tileMatrixSetId, options),
    getCollectionTileJson: (
      collectionId: string,
      options?: DataGetCollectionTileJsonOptionalParams,
    ) => getCollectionTileJson(context, collectionId, options),
    getCollectionTileNoTmsByScale: (
      collectionId: string,
      z: number,
      x: number,
      y: number,
      scale: number,
      options?: DataGetCollectionTileNoTmsByScaleOptionalParams,
    ) => getCollectionTileNoTmsByScale(context, collectionId, z, x, y, scale, options),
    getCollectionTileNoTmsByFormat: (
      collectionId: string,
      z: number,
      x: number,
      y: number,
      format: string,
      options?: DataGetCollectionTileNoTmsByFormatOptionalParams,
    ) => getCollectionTileNoTmsByFormat(context, collectionId, z, x, y, format, options),
    getCollectionTileNoTms: (
      collectionId: string,
      z: number,
      x: number,
      y: number,
      options?: DataGetCollectionTileNoTmsOptionalParams,
    ) => getCollectionTileNoTms(context, collectionId, z, x, y, options),
    getCollectionTileNoTmsByScaleAndFormat: (
      collectionId: string,
      z: number,
      x: number,
      y: number,
      scale: number,
      format: string,
      options?: DataGetCollectionTileNoTmsByScaleAndFormatOptionalParams,
    ) =>
      getCollectionTileNoTmsByScaleAndFormat(
        context,
        collectionId,
        z,
        x,
        y,
        scale,
        format,
        options,
      ),
    getCollectionTileByScale: (
      collectionId: string,
      tileMatrixSetId: string,
      z: number,
      x: number,
      y: number,
      scale: number,
      options?: DataGetCollectionTileByScaleOptionalParams,
    ) => getCollectionTileByScale(context, collectionId, tileMatrixSetId, z, x, y, scale, options),
    getCollectionTileByFormat: (
      collectionId: string,
      tileMatrixSetId: string,
      z: number,
      x: number,
      y: number,
      format: string,
      options?: DataGetCollectionTileByFormatOptionalParams,
    ) =>
      getCollectionTileByFormat(context, collectionId, tileMatrixSetId, z, x, y, format, options),
    getCollectionTile: (
      collectionId: string,
      tileMatrixSetId: string,
      z: number,
      x: number,
      y: number,
      options?: DataGetCollectionTileOptionalParams,
    ) => getCollectionTile(context, collectionId, tileMatrixSetId, z, x, y, options),
    getCollectionTileByScaleAndFormat: (
      collectionId: string,
      tileMatrixSetId: string,
      z: number,
      x: number,
      y: number,
      scale: number,
      format: string,
      options?: DataGetCollectionTileByScaleAndFormatOptionalParams,
    ) =>
      getCollectionTileByScaleAndFormat(
        context,
        collectionId,
        tileMatrixSetId,
        z,
        x,
        y,
        scale,
        format,
        options,
      ),
    getCollectionTilesetMetadata: (
      collectionId: string,
      tileMatrixSetId: string,
      options?: DataGetCollectionTilesetMetadataOptionalParams,
    ) => getCollectionTilesetMetadata(context, collectionId, tileMatrixSetId, options),
    getCollectionTilesets: (
      collectionId: string,
      options?: DataGetCollectionTilesetsOptionalParams,
    ) => getCollectionTilesets(context, collectionId, options),
    getItemBboxCropWithDimensions: (
      collectionId: string,
      itemId: string,
      minx: number,
      miny: number,
      maxx: number,
      maxy: number,
      width: number,
      height: number,
      format: string,
      options?: DataGetItemBboxCropWithDimensionsOptionalParams,
    ) =>
      getItemBboxCropWithDimensions(
        context,
        collectionId,
        itemId,
        minx,
        miny,
        maxx,
        maxy,
        width,
        height,
        format,
        options,
      ),
    getItemBboxCrop: (
      collectionId: string,
      itemId: string,
      minx: number,
      miny: number,
      maxx: number,
      maxy: number,
      format: string,
      options?: DataGetItemBboxCropOptionalParams,
    ) => getItemBboxCrop(context, collectionId, itemId, minx, miny, maxx, maxy, format, options),
    getItemPreviewWithFormat: (
      collectionId: string,
      itemId: string,
      format: string,
      options?: DataGetItemPreviewWithFormatOptionalParams,
    ) => getItemPreviewWithFormat(context, collectionId, itemId, format, options),
    getItemPreview: (
      collectionId: string,
      itemId: string,
      options?: DataGetItemPreviewOptionalParams,
    ) => getItemPreview(context, collectionId, itemId, options),
    getItemPoint: (
      collectionId: string,
      itemId: string,
      longitude: number,
      latitude: number,
      options?: DataGetItemPointOptionalParams,
    ) => getItemPoint(context, collectionId, itemId, longitude, latitude, options),
    getItemWmtsCapabilitiesByTms: (
      collectionId: string,
      itemId: string,
      tileMatrixSetId: string,
      options?: DataGetItemWmtsCapabilitiesByTmsOptionalParams,
    ) => getItemWmtsCapabilitiesByTms(context, collectionId, itemId, tileMatrixSetId, options),
    getItemWmtsCapabilities: (
      collectionId: string,
      itemId: string,
      options?: DataGetItemWmtsCapabilitiesOptionalParams,
    ) => getItemWmtsCapabilities(context, collectionId, itemId, options),
    getItemTileJsonByTms: (
      collectionId: string,
      itemId: string,
      tileMatrixSetId: string,
      options?: DataGetItemTileJsonByTmsOptionalParams,
    ) => getItemTileJsonByTms(context, collectionId, itemId, tileMatrixSetId, options),
    getItemTileJson: (
      collectionId: string,
      itemId: string,
      options?: DataGetItemTileJsonOptionalParams,
    ) => getItemTileJson(context, collectionId, itemId, options),
    getItemFeatureStatistics: (
      collectionId: string,
      itemId: string,
      body: Feature,
      options?: DataGetItemFeatureStatisticsOptionalParams,
    ) => getItemFeatureStatistics(context, collectionId, itemId, body, options),
    getItemStatistics: (
      collectionId: string,
      itemId: string,
      options?: DataGetItemStatisticsOptionalParams,
    ) => getItemStatistics(context, collectionId, itemId, options),
    getItemAssetStatistics: (
      collectionId: string,
      itemId: string,
      options?: DataGetItemAssetStatisticsOptionalParams,
    ) => getItemAssetStatistics(context, collectionId, itemId, options),
    getItemAvailableAssets: (
      collectionId: string,
      itemId: string,
      options?: DataGetItemAvailableAssetsOptionalParams,
    ) => getItemAvailableAssets(context, collectionId, itemId, options),
    getItemInfoGeoJson: (
      collectionId: string,
      itemId: string,
      options?: DataGetItemInfoGeoJsonOptionalParams,
    ) => getItemInfoGeoJson(context, collectionId, itemId, options),
    getItemInfo: (collectionId: string, itemId: string, options?: DataGetItemInfoOptionalParams) =>
      getItemInfo(context, collectionId, itemId, options),
    getItemBounds: (
      collectionId: string,
      itemId: string,
      options?: DataGetItemBoundsOptionalParams,
    ) => getItemBounds(context, collectionId, itemId, options),
    cropFeatureWidthByHeight: (
      collectionId: string,
      itemId: string,
      width: number,
      height: number,
      format: string,
      body: Feature,
      options?: DataCropFeatureWidthByHeightOptionalParams,
    ) =>
      cropFeatureWidthByHeight(context, collectionId, itemId, width, height, format, body, options),
    cropFeatureByFormat: (
      collectionId: string,
      itemId: string,
      format: string,
      body: Feature,
      options?: DataCropFeatureByFormatOptionalParams,
    ) => cropFeatureByFormat(context, collectionId, itemId, format, body, options),
    cropFeature: (
      collectionId: string,
      itemId: string,
      body: Feature,
      options?: DataCropFeatureOptionalParams,
    ) => cropFeature(context, collectionId, itemId, body, options),
    getTileNoTmsByScaleAndFormat: (
      collectionId: string,
      itemId: string,
      z: number,
      x: number,
      y: number,
      scale: number,
      format: string,
      options?: DataGetTileNoTmsByScaleAndFormatOptionalParams,
    ) =>
      getTileNoTmsByScaleAndFormat(context, collectionId, itemId, z, x, y, scale, format, options),
    getTileNoTmsByScale: (
      collectionId: string,
      itemId: string,
      z: number,
      x: number,
      y: number,
      scale: number,
      options?: DataGetTileNoTmsByScaleOptionalParams,
    ) => getTileNoTmsByScale(context, collectionId, itemId, z, x, y, scale, options),
    getTileNoTmsByFormat: (
      collectionId: string,
      itemId: string,
      z: number,
      x: number,
      y: number,
      format: string,
      options?: DataGetTileNoTmsByFormatOptionalParams,
    ) => getTileNoTmsByFormat(context, collectionId, itemId, z, x, y, format, options),
    getTileNoTms: (
      collectionId: string,
      itemId: string,
      z: number,
      x: number,
      y: number,
      options?: DataGetTileNoTmsOptionalParams,
    ) => getTileNoTms(context, collectionId, itemId, z, x, y, options),
    getTileByScaleAndFormat: (
      collectionId: string,
      itemId: string,
      tileMatrixSetId: string,
      z: number,
      x: number,
      y: number,
      scale: number,
      format: string,
      options?: DataGetTileByScaleAndFormatOptionalParams,
    ) =>
      getTileByScaleAndFormat(
        context,
        collectionId,
        itemId,
        tileMatrixSetId,
        z,
        x,
        y,
        scale,
        format,
        options,
      ),
    getTileByScale: (
      collectionId: string,
      itemId: string,
      tileMatrixSetId: string,
      z: number,
      x: number,
      y: number,
      scale: number,
      options?: DataGetTileByScaleOptionalParams,
    ) => getTileByScale(context, collectionId, itemId, tileMatrixSetId, z, x, y, scale, options),
    getTileByFormat: (
      collectionId: string,
      itemId: string,
      tileMatrixSetId: string,
      z: number,
      x: number,
      y: number,
      format: string,
      options?: DataGetTileByFormatOptionalParams,
    ) => getTileByFormat(context, collectionId, itemId, tileMatrixSetId, z, x, y, format, options),
    getTile: (
      collectionId: string,
      itemId: string,
      tileMatrixSetId: string,
      z: number,
      x: number,
      y: number,
      options?: DataGetTileOptionalParams,
    ) => getTile(context, collectionId, itemId, tileMatrixSetId, z, x, y, options),
    getTilesetMetadata: (
      collectionId: string,
      itemId: string,
      tileMatrixSetId: string,
      options?: DataGetTilesetMetadataOptionalParams,
    ) => getTilesetMetadata(context, collectionId, itemId, tileMatrixSetId, options),
    getTilesets: (collectionId: string, itemId: string, options?: DataGetTilesetsOptionalParams) =>
      getTilesets(context, collectionId, itemId, options),
    registerMosaicsSearch: (options?: DataRegisterMosaicsSearchOptionalParams) =>
      registerMosaicsSearch(context, options),
    getLegend: (colorMapName: string, options?: DataGetLegendOptionalParams) =>
      getLegend(context, colorMapName, options),
    getIntervalLegend: (classmapName: string, options?: DataGetIntervalLegendOptionalParams) =>
      getIntervalLegend(context, classmapName, options),
    getClassMapLegend: (classmapName: string, options?: DataGetClassMapLegendOptionalParams) =>
      getClassMapLegend(context, classmapName, options),
    getTileMatrices: (options?: DataGetTileMatricesOptionalParams) =>
      getTileMatrices(context, options),
    getTileMatrixDefinitions: (
      tileMatrixSetId: string,
      options?: DataGetTileMatrixDefinitionsOptionalParams,
    ) => getTileMatrixDefinitions(context, tileMatrixSetId, options),
  };
}

export function _getDataOperations(context: PlanetaryComputerProContext): DataOperations {
  return {
    ..._getData(context),
  };
}
