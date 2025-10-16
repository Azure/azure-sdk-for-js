// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerContext } from "../../api/planetaryComputerContext.js";
import {
  getMosaicsWmtsCapabilities,
  getMosaicsTile,
  getMosaicsTileJson,
  registerMosaicsSearch,
  getMosaicsSearchInfo,
  getMosaicsAssetsForTile,
  getMosaicsAssetsForPoint,
  getLegend,
  getIntervalLegend,
  getClassMapLegend,
  getWmtsCapabilities,
  getTile,
  getTileJson,
  listStatistics,
  getStaticImage,
  createStaticImage,
  getPreviewWithFormat,
  getPreview,
  getPoint,
  getPartWithDimensions,
  getPart,
  getAssetsInfo,
  getInfoGeoJson,
  getGeoJsonStatistics,
  cropGeoJsonWithDimensions,
  cropGeoJson,
  listBounds,
  listAvailableAssets,
  getAssetStatistics,
  listTileMatrices,
  getTileMatrixDefinitions,
} from "../../api/tiler/operations.js";
import {
  TilerGetMosaicsWmtsCapabilitiesOptionalParams,
  TilerGetMosaicsTileOptionalParams,
  TilerGetMosaicsTileJsonOptionalParams,
  TilerRegisterMosaicsSearchOptionalParams,
  TilerGetMosaicsSearchInfoOptionalParams,
  TilerGetMosaicsAssetsForTileOptionalParams,
  TilerGetMosaicsAssetsForPointOptionalParams,
  TilerGetLegendOptionalParams,
  TilerGetIntervalLegendOptionalParams,
  TilerGetClassMapLegendOptionalParams,
  TilerGetWmtsCapabilitiesOptionalParams,
  TilerGetTileOptionalParams,
  TilerGetTileJsonOptionalParams,
  TilerListStatisticsOptionalParams,
  TilerGetStaticImageOptionalParams,
  TilerCreateStaticImageOptionalParams,
  TilerGetPreviewWithFormatOptionalParams,
  TilerGetPreviewOptionalParams,
  TilerGetPointOptionalParams,
  TilerGetPartWithDimensionsOptionalParams,
  TilerGetPartOptionalParams,
  TilerGetAssetsInfoOptionalParams,
  TilerGetInfoGeoJsonOptionalParams,
  TilerGetGeoJsonStatisticsOptionalParams,
  TilerCropGeoJsonWithDimensionsOptionalParams,
  TilerCropGeoJsonOptionalParams,
  TilerListBoundsOptionalParams,
  TilerListAvailableAssetsOptionalParams,
  TilerGetAssetStatisticsOptionalParams,
  TilerListTileMatricesOptionalParams,
  TilerGetTileMatrixDefinitionsOptionalParams,
} from "../../api/tiler/options.js";
import {
  StacAsset,
  TileMatrixSet,
  GetAssetStatisticsOptions,
  StacAssetStatistics,
  StacItemBounds,
  CropGeoJsonOptions,
  Feature,
  GetGeoJsonStatisticsOptions,
  StacItemStatisticsGeoJson,
  TilerInfoGeoJsonFeature,
  InfoOperationResponse,
  GetPartOptions,
  TilerCoreModelsResponsesPoint,
  GetPreviewOptions,
  ImageRequest,
  ImageResponse,
  GetStatisticsOptions,
  StatisticsResponse,
  GetTileJsonOptions,
  TileJsonMetaData,
  GetTileOptions,
  GetWmtsCapabilitiesOptions,
  TilerStacSearchRegistration,
  TilerMosaicSearchRegistrationResponse,
  GetMosaicTileJsonOptions,
  GetMosaicTileOptions,
  GetMosaicWmtsCapabilitiesOptions,
  IntervalLegendsElement,
} from "../../models/models.js";

/** Interface representing a Tiler operations. */
export interface TilerOperations {
  /** OGC WMTS endpoint. */
  getMosaicsWmtsCapabilities: (
    searchId: string,
    tileMatrixSetId: string,
    options: GetMosaicWmtsCapabilitiesOptions,
    optionalParams?: TilerGetMosaicsWmtsCapabilitiesOptionalParams,
  ) => Promise<Uint8Array>;
  /** Create map tile. */
  getMosaicsTile: (
    searchId: string,
    tileMatrixSetId: string,
    z: number,
    x: number,
    y: number,
    scale: number,
    format: string,
    options: GetMosaicTileOptions,
    optionalParams?: TilerGetMosaicsTileOptionalParams,
  ) => Promise<Uint8Array>;
  /** Return TileJSON document for a searchId. */
  getMosaicsTileJson: (
    searchId: string,
    tileMatrixSetId: string,
    options: GetMosaicTileJsonOptions,
    optionalParams?: TilerGetMosaicsTileJsonOptionalParams,
  ) => Promise<TileJsonMetaData>;
  /** Register a Search query */
  registerMosaicsSearch: (
    options?: TilerRegisterMosaicsSearchOptionalParams,
  ) => Promise<TilerMosaicSearchRegistrationResponse>;
  /** Get Search query metadata. */
  getMosaicsSearchInfo: (
    searchId: string,
    options?: TilerGetMosaicsSearchInfoOptionalParams,
  ) => Promise<TilerStacSearchRegistration>;
  /** Return a list of assets which overlap a given tile */
  getMosaicsAssetsForTile: (
    searchId: string,
    tileMatrixSetId: string,
    collectionId: string,
    z: number,
    x: number,
    y: number,
    options?: TilerGetMosaicsAssetsForTileOptionalParams,
  ) => Promise<any[]>;
  /** Return a list of assets for a given point. */
  getMosaicsAssetsForPoint: (
    searchId: string,
    longitude: number,
    latitude: number,
    options?: TilerGetMosaicsAssetsForPointOptionalParams,
  ) => Promise<StacAsset[]>;
  /**
   * Generate a legend image for a given colormap.
   *
   * If the colormap has non-contiguous values at the beginning or end,
   * which aren't desired in the output image, they can be trimmed by specifying
   * the number of values to trim.
   */
  getLegend: (
    colorMapName: string,
    options?: TilerGetLegendOptionalParams,
  ) => Promise<Uint8Array>;
  /** Generate values and color swatches mapping for a given interval classmap. */
  getIntervalLegend: (
    classmapName: string,
    options?: TilerGetIntervalLegendOptionalParams,
  ) => Promise<IntervalLegendsElement[][]>;
  /** Generate values and color swatches mapping for a given classmap. */
  getClassMapLegend: (
    classmapName: string,
    options?: TilerGetClassMapLegendOptionalParams,
  ) => Promise<Record<string, any>>;
  /** OGC WMTS endpoint. */
  getWmtsCapabilities: (
    collectionId: string,
    itemId: string,
    tileMatrixSetId: string,
    options: GetWmtsCapabilitiesOptions,
    optionalParams?: TilerGetWmtsCapabilitiesOptionalParams,
  ) => Promise<Uint8Array>;
  /** Create map tile from a dataset. */
  getTile: (
    collectionId: string,
    itemId: string,
    tileMatrixSetId: string,
    z: number,
    x: number,
    y: number,
    scale: number,
    format: string,
    options: GetTileOptions,
    optionalParams?: TilerGetTileOptionalParams,
  ) => Promise<Uint8Array>;
  /** Return the TileJson Tilematrixsetid As a path */
  getTileJson: (
    collectionId: string,
    itemId: string,
    tileMatrixSetId: string,
    options: GetTileJsonOptions,
    optionalParams?: TilerGetTileJsonOptionalParams,
  ) => Promise<TileJsonMetaData>;
  /** Merged assets statistics. */
  listStatistics: (
    collectionId: string,
    itemId: string,
    options: GetStatisticsOptions,
    optionalParams?: TilerListStatisticsOptionalParams,
  ) => Promise<StatisticsResponse>;
  /** Fetch an existing image export by ID */
  getStaticImage: (
    collectionId: string,
    id: string,
    options?: TilerGetStaticImageOptionalParams,
  ) => Promise<Uint8Array>;
  /** Create a new image export. */
  createStaticImage: (
    collectionId: string,
    body: ImageRequest,
    options?: TilerCreateStaticImageOptionalParams,
  ) => Promise<ImageResponse>;
  /** Create preview of a dataset. */
  getPreviewWithFormat: (
    collectionId: string,
    itemId: string,
    format: string,
    options: GetPreviewOptions,
    optionalParams?: TilerGetPreviewWithFormatOptionalParams,
  ) => Promise<Uint8Array>;
  /** Create preview of a dataset. */
  getPreview: (
    collectionId: string,
    itemId: string,
    options: GetPreviewOptions,
    optionalParams?: TilerGetPreviewOptionalParams,
  ) => Promise<Uint8Array>;
  /** Get Point value for a dataset. */
  getPoint: (
    collectionId: string,
    itemId: string,
    longitude: number,
    latitude: number,
    options?: TilerGetPointOptionalParams,
  ) => Promise<TilerCoreModelsResponsesPoint>;
  /** Create image from part of a dataset. */
  getPartWithDimensions: (
    collectionId: string,
    itemId: string,
    minx: number,
    miny: number,
    maxx: number,
    maxy: number,
    width: number,
    height: number,
    format: string,
    options: GetPartOptions,
    optionalParams?: TilerGetPartWithDimensionsOptionalParams,
  ) => Promise<Uint8Array>;
  /** Create image from part of a dataset. */
  getPart: (
    collectionId: string,
    itemId: string,
    minx: number,
    miny: number,
    maxx: number,
    maxy: number,
    format: string,
    options: GetPartOptions,
    optionalParams?: TilerGetPartOptionalParams,
  ) => Promise<Uint8Array>;
  /** Return dataset's basic info. */
  getAssetsInfo: (
    collectionId: string,
    itemId: string,
    options?: TilerGetAssetsInfoOptionalParams,
  ) => Promise<InfoOperationResponse>;
  /** Return Info Geojson */
  getInfoGeoJson: (
    collectionId: string,
    itemId: string,
    options?: TilerGetInfoGeoJsonOptionalParams,
  ) => Promise<TilerInfoGeoJsonFeature>;
  /** Get Statistics from a geojson feature. */
  getGeoJsonStatistics: (
    collectionId: string,
    itemId: string,
    options: GetGeoJsonStatisticsOptions,
    body: Feature,
    optionalParams?: TilerGetGeoJsonStatisticsOptionalParams,
  ) => Promise<StacItemStatisticsGeoJson>;
  /** Create image from a geojson feature. */
  cropGeoJsonWithDimensions: (
    collectionId: string,
    itemId: string,
    width: number,
    height: number,
    format: string,
    options: CropGeoJsonOptions,
    body: Feature,
    optionalParams?: TilerCropGeoJsonWithDimensionsOptionalParams,
  ) => Promise<Uint8Array>;
  /** Create image from a geojson feature. */
  cropGeoJson: (
    collectionId: string,
    itemId: string,
    format: string,
    options: CropGeoJsonOptions,
    body: Feature,
    optionalParams?: TilerCropGeoJsonOptionalParams,
  ) => Promise<Uint8Array>;
  /** Return all Bounds */
  listBounds: (
    collectionId: string,
    itemId: string,
    options?: TilerListBoundsOptionalParams,
  ) => Promise<StacItemBounds>;
  /** Return a list of supported assets. */
  listAvailableAssets: (
    collectionId: string,
    itemId: string,
    options?: TilerListAvailableAssetsOptionalParams,
  ) => Promise<string[]>;
  /** Per Asset statistics */
  getAssetStatistics: (
    collectionId: string,
    itemId: string,
    options: GetAssetStatisticsOptions,
    optionalParams?: TilerGetAssetStatisticsOptionalParams,
  ) => Promise<StacAssetStatistics>;
  /** Return Matrix List */
  listTileMatrices: (
    options?: TilerListTileMatricesOptionalParams,
  ) => Promise<string[]>;
  /** Return Matrix Definition */
  getTileMatrixDefinitions: (
    tileMatrixSetId: string,
    options?: TilerGetTileMatrixDefinitionsOptionalParams,
  ) => Promise<TileMatrixSet>;
}

function _getTiler(context: PlanetaryComputerContext) {
  return {
    getMosaicsWmtsCapabilities: (
      searchId: string,
      tileMatrixSetId: string,
      options: GetMosaicWmtsCapabilitiesOptions,
      optionalParams?: TilerGetMosaicsWmtsCapabilitiesOptionalParams,
    ) =>
      getMosaicsWmtsCapabilities(
        context,
        searchId,
        tileMatrixSetId,
        options,
        optionalParams,
      ),
    getMosaicsTile: (
      searchId: string,
      tileMatrixSetId: string,
      z: number,
      x: number,
      y: number,
      scale: number,
      format: string,
      options: GetMosaicTileOptions,
      optionalParams?: TilerGetMosaicsTileOptionalParams,
    ) =>
      getMosaicsTile(
        context,
        searchId,
        tileMatrixSetId,
        z,
        x,
        y,
        scale,
        format,
        options,
        optionalParams,
      ),
    getMosaicsTileJson: (
      searchId: string,
      tileMatrixSetId: string,
      options: GetMosaicTileJsonOptions,
      optionalParams?: TilerGetMosaicsTileJsonOptionalParams,
    ) =>
      getMosaicsTileJson(
        context,
        searchId,
        tileMatrixSetId,
        options,
        optionalParams,
      ),
    registerMosaicsSearch: (
      options?: TilerRegisterMosaicsSearchOptionalParams,
    ) => registerMosaicsSearch(context, options),
    getMosaicsSearchInfo: (
      searchId: string,
      options?: TilerGetMosaicsSearchInfoOptionalParams,
    ) => getMosaicsSearchInfo(context, searchId, options),
    getMosaicsAssetsForTile: (
      searchId: string,
      tileMatrixSetId: string,
      collectionId: string,
      z: number,
      x: number,
      y: number,
      options?: TilerGetMosaicsAssetsForTileOptionalParams,
    ) =>
      getMosaicsAssetsForTile(
        context,
        searchId,
        tileMatrixSetId,
        collectionId,
        z,
        x,
        y,
        options,
      ),
    getMosaicsAssetsForPoint: (
      searchId: string,
      longitude: number,
      latitude: number,
      options?: TilerGetMosaicsAssetsForPointOptionalParams,
    ) =>
      getMosaicsAssetsForPoint(context, searchId, longitude, latitude, options),
    getLegend: (colorMapName: string, options?: TilerGetLegendOptionalParams) =>
      getLegend(context, colorMapName, options),
    getIntervalLegend: (
      classmapName: string,
      options?: TilerGetIntervalLegendOptionalParams,
    ) => getIntervalLegend(context, classmapName, options),
    getClassMapLegend: (
      classmapName: string,
      options?: TilerGetClassMapLegendOptionalParams,
    ) => getClassMapLegend(context, classmapName, options),
    getWmtsCapabilities: (
      collectionId: string,
      itemId: string,
      tileMatrixSetId: string,
      options: GetWmtsCapabilitiesOptions,
      optionalParams?: TilerGetWmtsCapabilitiesOptionalParams,
    ) =>
      getWmtsCapabilities(
        context,
        collectionId,
        itemId,
        tileMatrixSetId,
        options,
        optionalParams,
      ),
    getTile: (
      collectionId: string,
      itemId: string,
      tileMatrixSetId: string,
      z: number,
      x: number,
      y: number,
      scale: number,
      format: string,
      options: GetTileOptions,
      optionalParams?: TilerGetTileOptionalParams,
    ) =>
      getTile(
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
        optionalParams,
      ),
    getTileJson: (
      collectionId: string,
      itemId: string,
      tileMatrixSetId: string,
      options: GetTileJsonOptions,
      optionalParams?: TilerGetTileJsonOptionalParams,
    ) =>
      getTileJson(
        context,
        collectionId,
        itemId,
        tileMatrixSetId,
        options,
        optionalParams,
      ),
    listStatistics: (
      collectionId: string,
      itemId: string,
      options: GetStatisticsOptions,
      optionalParams?: TilerListStatisticsOptionalParams,
    ) => listStatistics(context, collectionId, itemId, options, optionalParams),
    getStaticImage: (
      collectionId: string,
      id: string,
      options?: TilerGetStaticImageOptionalParams,
    ) => getStaticImage(context, collectionId, id, options),
    createStaticImage: (
      collectionId: string,
      body: ImageRequest,
      options?: TilerCreateStaticImageOptionalParams,
    ) => createStaticImage(context, collectionId, body, options),
    getPreviewWithFormat: (
      collectionId: string,
      itemId: string,
      format: string,
      options: GetPreviewOptions,
      optionalParams?: TilerGetPreviewWithFormatOptionalParams,
    ) =>
      getPreviewWithFormat(
        context,
        collectionId,
        itemId,
        format,
        options,
        optionalParams,
      ),
    getPreview: (
      collectionId: string,
      itemId: string,
      options: GetPreviewOptions,
      optionalParams?: TilerGetPreviewOptionalParams,
    ) => getPreview(context, collectionId, itemId, options, optionalParams),
    getPoint: (
      collectionId: string,
      itemId: string,
      longitude: number,
      latitude: number,
      options?: TilerGetPointOptionalParams,
    ) => getPoint(context, collectionId, itemId, longitude, latitude, options),
    getPartWithDimensions: (
      collectionId: string,
      itemId: string,
      minx: number,
      miny: number,
      maxx: number,
      maxy: number,
      width: number,
      height: number,
      format: string,
      options: GetPartOptions,
      optionalParams?: TilerGetPartWithDimensionsOptionalParams,
    ) =>
      getPartWithDimensions(
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
        optionalParams,
      ),
    getPart: (
      collectionId: string,
      itemId: string,
      minx: number,
      miny: number,
      maxx: number,
      maxy: number,
      format: string,
      options: GetPartOptions,
      optionalParams?: TilerGetPartOptionalParams,
    ) =>
      getPart(
        context,
        collectionId,
        itemId,
        minx,
        miny,
        maxx,
        maxy,
        format,
        options,
        optionalParams,
      ),
    getAssetsInfo: (
      collectionId: string,
      itemId: string,
      options?: TilerGetAssetsInfoOptionalParams,
    ) => getAssetsInfo(context, collectionId, itemId, options),
    getInfoGeoJson: (
      collectionId: string,
      itemId: string,
      options?: TilerGetInfoGeoJsonOptionalParams,
    ) => getInfoGeoJson(context, collectionId, itemId, options),
    getGeoJsonStatistics: (
      collectionId: string,
      itemId: string,
      options: GetGeoJsonStatisticsOptions,
      body: Feature,
      optionalParams?: TilerGetGeoJsonStatisticsOptionalParams,
    ) =>
      getGeoJsonStatistics(
        context,
        collectionId,
        itemId,
        options,
        body,
        optionalParams,
      ),
    cropGeoJsonWithDimensions: (
      collectionId: string,
      itemId: string,
      width: number,
      height: number,
      format: string,
      options: CropGeoJsonOptions,
      body: Feature,
      optionalParams?: TilerCropGeoJsonWithDimensionsOptionalParams,
    ) =>
      cropGeoJsonWithDimensions(
        context,
        collectionId,
        itemId,
        width,
        height,
        format,
        options,
        body,
        optionalParams,
      ),
    cropGeoJson: (
      collectionId: string,
      itemId: string,
      format: string,
      options: CropGeoJsonOptions,
      body: Feature,
      optionalParams?: TilerCropGeoJsonOptionalParams,
    ) =>
      cropGeoJson(
        context,
        collectionId,
        itemId,
        format,
        options,
        body,
        optionalParams,
      ),
    listBounds: (
      collectionId: string,
      itemId: string,
      options?: TilerListBoundsOptionalParams,
    ) => listBounds(context, collectionId, itemId, options),
    listAvailableAssets: (
      collectionId: string,
      itemId: string,
      options?: TilerListAvailableAssetsOptionalParams,
    ) => listAvailableAssets(context, collectionId, itemId, options),
    getAssetStatistics: (
      collectionId: string,
      itemId: string,
      options: GetAssetStatisticsOptions,
      optionalParams?: TilerGetAssetStatisticsOptionalParams,
    ) =>
      getAssetStatistics(
        context,
        collectionId,
        itemId,
        options,
        optionalParams,
      ),
    listTileMatrices: (options?: TilerListTileMatricesOptionalParams) =>
      listTileMatrices(context, options),
    getTileMatrixDefinitions: (
      tileMatrixSetId: string,
      options?: TilerGetTileMatrixDefinitionsOptionalParams,
    ) => getTileMatrixDefinitions(context, tileMatrixSetId, options),
  };
}

export function _getTilerOperations(
  context: PlanetaryComputerContext,
): TilerOperations {
  return {
    ..._getTiler(context),
  };
}
