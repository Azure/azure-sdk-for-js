// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProContext } from "../../api/planetaryComputerProContext.js";
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
  getItemAssetDetails,
  getInfoGeoJson,
  getGeoJsonStatistics,
  cropGeoJsonWithDimensions,
  cropGeoJson,
  getBounds,
  listAvailableAssets,
  getAssetStatistics,
  listTileMatrices,
  getTileMatrixDefinitions,
} from "../../api/data/operations.js";
import {
  DataGetMosaicsWmtsCapabilitiesOptionalParams,
  DataGetMosaicsTileOptionalParams,
  DataGetMosaicsTileJsonOptionalParams,
  DataRegisterMosaicsSearchOptionalParams,
  DataGetMosaicsSearchInfoOptionalParams,
  DataGetMosaicsAssetsForTileOptionalParams,
  DataGetMosaicsAssetsForPointOptionalParams,
  DataGetLegendOptionalParams,
  DataGetIntervalLegendOptionalParams,
  DataGetClassMapLegendOptionalParams,
  DataGetWmtsCapabilitiesOptionalParams,
  DataGetTileOptionalParams,
  DataGetTileJsonOptionalParams,
  DataListStatisticsOptionalParams,
  DataGetStaticImageOptionalParams,
  DataCreateStaticImageOptionalParams,
  DataGetPreviewWithFormatOptionalParams,
  DataGetPreviewOptionalParams,
  DataGetPointOptionalParams,
  DataGetPartWithDimensionsOptionalParams,
  DataGetPartOptionalParams,
  DataGetItemAssetDetailsOptionalParams,
  DataGetInfoGeoJsonOptionalParams,
  DataGetGeoJsonStatisticsOptionalParams,
  DataCropGeoJsonWithDimensionsOptionalParams,
  DataCropGeoJsonOptionalParams,
  DataGetBoundsOptionalParams,
  DataListAvailableAssetsOptionalParams,
  DataGetAssetStatisticsOptionalParams,
  DataListTileMatricesOptionalParams,
  DataGetTileMatrixDefinitionsOptionalParams,
} from "../../api/data/options.js";
import {
  TileMatrixSet,
  BandStatistics,
  StacItemBounds,
  Feature,
  StacItemStatisticsGeoJson,
  TilerInfoGeoJsonFeature,
  TilerInfo,
  TilerCoreModelsResponsesPoint,
  ImageParameters,
  ImageResponse,
  TilerStacItemStatistics,
  TileJsonMetadata,
  StacItemPointAsset,
  TilerStacSearchRegistration,
  TilerMosaicSearchRegistrationResponse,
  IntervalLegendsElement,
} from "../../models/models.js";

/** Interface representing a Data operations. */
export interface DataOperations {
  /** OGC WMTS endpoint. */
  getMosaicsWmtsCapabilities: (
    searchId: string,
    tileMatrixSetId: string,
    options?: DataGetMosaicsWmtsCapabilitiesOptionalParams,
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
    options?: DataGetMosaicsTileOptionalParams,
  ) => Promise<Uint8Array>;
  /** Return TileJSON document for a searchId. */
  getMosaicsTileJson: (
    searchId: string,
    tileMatrixSetId: string,
    options?: DataGetMosaicsTileJsonOptionalParams,
  ) => Promise<TileJsonMetadata>;
  /** Register a Search query */
  registerMosaicsSearch: (
    options?: DataRegisterMosaicsSearchOptionalParams,
  ) => Promise<TilerMosaicSearchRegistrationResponse>;
  /** Get Search query metadata. */
  getMosaicsSearchInfo: (
    searchId: string,
    options?: DataGetMosaicsSearchInfoOptionalParams,
  ) => Promise<TilerStacSearchRegistration>;
  /** Return a list of assets which overlap a given tile */
  getMosaicsAssetsForTile: (
    searchId: string,
    tileMatrixSetId: string,
    collectionId: string,
    z: number,
    x: number,
    y: number,
    options?: DataGetMosaicsAssetsForTileOptionalParams,
  ) => Promise<any[]>;
  /** Return a list of assets for a given point. */
  getMosaicsAssetsForPoint: (
    searchId: string,
    longitude: number,
    latitude: number,
    options?: DataGetMosaicsAssetsForPointOptionalParams,
  ) => Promise<StacItemPointAsset[]>;
  /**
   * Generate a legend image for a given colormap.
   *
   * If the colormap has non-contiguous values at the beginning or end,
   * which aren't desired in the output image, they can be trimmed by specifying
   * the number of values to trim.
   */
  getLegend: (colorMapName: string, options?: DataGetLegendOptionalParams) => Promise<Uint8Array>;
  /** Generate values and color swatches mapping for a given interval classmap. */
  getIntervalLegend: (
    classmapName: string,
    options?: DataGetIntervalLegendOptionalParams,
  ) => Promise<IntervalLegendsElement[][]>;
  /** Generate values and color swatches mapping for a given classmap. */
  getClassMapLegend: (
    classmapName: string,
    options?: DataGetClassMapLegendOptionalParams,
  ) => Promise<Record<string, any>>;
  /** OGC WMTS endpoint. */
  getWmtsCapabilities: (
    collectionId: string,
    itemId: string,
    tileMatrixSetId: string,
    options?: DataGetWmtsCapabilitiesOptionalParams,
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
    options?: DataGetTileOptionalParams,
  ) => Promise<Uint8Array>;
  /** Return the TileJson Tilematrixsetid As a path */
  getTileJson: (
    collectionId: string,
    itemId: string,
    tileMatrixSetId: string,
    options?: DataGetTileJsonOptionalParams,
  ) => Promise<TileJsonMetadata>;
  /** Merged assets statistics. */
  listStatistics: (
    collectionId: string,
    itemId: string,
    options?: DataListStatisticsOptionalParams,
  ) => Promise<TilerStacItemStatistics>;
  /** Fetch an existing image export by ID */
  getStaticImage: (
    collectionId: string,
    id: string,
    options?: DataGetStaticImageOptionalParams,
  ) => Promise<Uint8Array>;
  /** Create a new image export. */
  createStaticImage: (
    collectionId: string,
    body: ImageParameters,
    options?: DataCreateStaticImageOptionalParams,
  ) => Promise<ImageResponse>;
  /** Create preview of a dataset. */
  getPreviewWithFormat: (
    collectionId: string,
    itemId: string,
    format: string,
    options?: DataGetPreviewWithFormatOptionalParams,
  ) => Promise<Uint8Array>;
  /** Create preview of a dataset. */
  getPreview: (
    collectionId: string,
    itemId: string,
    options?: DataGetPreviewOptionalParams,
  ) => Promise<Uint8Array>;
  /** Get Point value for a dataset. */
  getPoint: (
    collectionId: string,
    itemId: string,
    longitude: number,
    latitude: number,
    options?: DataGetPointOptionalParams,
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
    options?: DataGetPartWithDimensionsOptionalParams,
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
    options?: DataGetPartOptionalParams,
  ) => Promise<Uint8Array>;
  /** Return dataset's basic info. */
  getItemAssetDetails: (
    collectionId: string,
    itemId: string,
    options?: DataGetItemAssetDetailsOptionalParams,
  ) => Promise<Record<string, TilerInfo>>;
  /** Return Info Geojson */
  getInfoGeoJson: (
    collectionId: string,
    itemId: string,
    options?: DataGetInfoGeoJsonOptionalParams,
  ) => Promise<TilerInfoGeoJsonFeature>;
  /** Get Statistics from a geojson feature. */
  getGeoJsonStatistics: (
    collectionId: string,
    itemId: string,
    body: Feature,
    options?: DataGetGeoJsonStatisticsOptionalParams,
  ) => Promise<StacItemStatisticsGeoJson>;
  /** Create image from a geojson feature. */
  cropGeoJsonWithDimensions: (
    collectionId: string,
    itemId: string,
    width: number,
    height: number,
    format: string,
    body: Feature,
    options?: DataCropGeoJsonWithDimensionsOptionalParams,
  ) => Promise<Uint8Array>;
  /** Create image from a geojson feature. */
  cropGeoJson: (
    collectionId: string,
    itemId: string,
    format: string,
    body: Feature,
    options?: DataCropGeoJsonOptionalParams,
  ) => Promise<Uint8Array>;
  /** Return all Bounds */
  getBounds: (
    collectionId: string,
    itemId: string,
    options?: DataGetBoundsOptionalParams,
  ) => Promise<StacItemBounds>;
  /** Return a list of supported assets. */
  listAvailableAssets: (
    collectionId: string,
    itemId: string,
    options?: DataListAvailableAssetsOptionalParams,
  ) => Promise<string[]>;
  /** Per Asset statistics */
  getAssetStatistics: (
    collectionId: string,
    itemId: string,
    options?: DataGetAssetStatisticsOptionalParams,
  ) => Promise<Record<string, Record<string, BandStatistics>>>;
  /** Return Matrix List */
  listTileMatrices: (options?: DataListTileMatricesOptionalParams) => Promise<string[]>;
  /** Return Matrix Definition */
  getTileMatrixDefinitions: (
    tileMatrixSetId: string,
    options?: DataGetTileMatrixDefinitionsOptionalParams,
  ) => Promise<TileMatrixSet>;
}

function _getData(context: PlanetaryComputerProContext) {
  return {
    getMosaicsWmtsCapabilities: (
      searchId: string,
      tileMatrixSetId: string,
      options?: DataGetMosaicsWmtsCapabilitiesOptionalParams,
    ) => getMosaicsWmtsCapabilities(context, searchId, tileMatrixSetId, options),
    getMosaicsTile: (
      searchId: string,
      tileMatrixSetId: string,
      z: number,
      x: number,
      y: number,
      scale: number,
      format: string,
      options?: DataGetMosaicsTileOptionalParams,
    ) => getMosaicsTile(context, searchId, tileMatrixSetId, z, x, y, scale, format, options),
    getMosaicsTileJson: (
      searchId: string,
      tileMatrixSetId: string,
      options?: DataGetMosaicsTileJsonOptionalParams,
    ) => getMosaicsTileJson(context, searchId, tileMatrixSetId, options),
    registerMosaicsSearch: (options?: DataRegisterMosaicsSearchOptionalParams) =>
      registerMosaicsSearch(context, options),
    getMosaicsSearchInfo: (searchId: string, options?: DataGetMosaicsSearchInfoOptionalParams) =>
      getMosaicsSearchInfo(context, searchId, options),
    getMosaicsAssetsForTile: (
      searchId: string,
      tileMatrixSetId: string,
      collectionId: string,
      z: number,
      x: number,
      y: number,
      options?: DataGetMosaicsAssetsForTileOptionalParams,
    ) =>
      getMosaicsAssetsForTile(context, searchId, tileMatrixSetId, collectionId, z, x, y, options),
    getMosaicsAssetsForPoint: (
      searchId: string,
      longitude: number,
      latitude: number,
      options?: DataGetMosaicsAssetsForPointOptionalParams,
    ) => getMosaicsAssetsForPoint(context, searchId, longitude, latitude, options),
    getLegend: (colorMapName: string, options?: DataGetLegendOptionalParams) =>
      getLegend(context, colorMapName, options),
    getIntervalLegend: (classmapName: string, options?: DataGetIntervalLegendOptionalParams) =>
      getIntervalLegend(context, classmapName, options),
    getClassMapLegend: (classmapName: string, options?: DataGetClassMapLegendOptionalParams) =>
      getClassMapLegend(context, classmapName, options),
    getWmtsCapabilities: (
      collectionId: string,
      itemId: string,
      tileMatrixSetId: string,
      options?: DataGetWmtsCapabilitiesOptionalParams,
    ) => getWmtsCapabilities(context, collectionId, itemId, tileMatrixSetId, options),
    getTile: (
      collectionId: string,
      itemId: string,
      tileMatrixSetId: string,
      z: number,
      x: number,
      y: number,
      scale: number,
      format: string,
      options?: DataGetTileOptionalParams,
    ) => getTile(context, collectionId, itemId, tileMatrixSetId, z, x, y, scale, format, options),
    getTileJson: (
      collectionId: string,
      itemId: string,
      tileMatrixSetId: string,
      options?: DataGetTileJsonOptionalParams,
    ) => getTileJson(context, collectionId, itemId, tileMatrixSetId, options),
    listStatistics: (
      collectionId: string,
      itemId: string,
      options?: DataListStatisticsOptionalParams,
    ) => listStatistics(context, collectionId, itemId, options),
    getStaticImage: (
      collectionId: string,
      id: string,
      options?: DataGetStaticImageOptionalParams,
    ) => getStaticImage(context, collectionId, id, options),
    createStaticImage: (
      collectionId: string,
      body: ImageParameters,
      options?: DataCreateStaticImageOptionalParams,
    ) => createStaticImage(context, collectionId, body, options),
    getPreviewWithFormat: (
      collectionId: string,
      itemId: string,
      format: string,
      options?: DataGetPreviewWithFormatOptionalParams,
    ) => getPreviewWithFormat(context, collectionId, itemId, format, options),
    getPreview: (collectionId: string, itemId: string, options?: DataGetPreviewOptionalParams) =>
      getPreview(context, collectionId, itemId, options),
    getPoint: (
      collectionId: string,
      itemId: string,
      longitude: number,
      latitude: number,
      options?: DataGetPointOptionalParams,
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
      options?: DataGetPartWithDimensionsOptionalParams,
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
      ),
    getPart: (
      collectionId: string,
      itemId: string,
      minx: number,
      miny: number,
      maxx: number,
      maxy: number,
      format: string,
      options?: DataGetPartOptionalParams,
    ) => getPart(context, collectionId, itemId, minx, miny, maxx, maxy, format, options),
    getItemAssetDetails: (
      collectionId: string,
      itemId: string,
      options?: DataGetItemAssetDetailsOptionalParams,
    ) => getItemAssetDetails(context, collectionId, itemId, options),
    getInfoGeoJson: (
      collectionId: string,
      itemId: string,
      options?: DataGetInfoGeoJsonOptionalParams,
    ) => getInfoGeoJson(context, collectionId, itemId, options),
    getGeoJsonStatistics: (
      collectionId: string,
      itemId: string,
      body: Feature,
      options?: DataGetGeoJsonStatisticsOptionalParams,
    ) => getGeoJsonStatistics(context, collectionId, itemId, body, options),
    cropGeoJsonWithDimensions: (
      collectionId: string,
      itemId: string,
      width: number,
      height: number,
      format: string,
      body: Feature,
      options?: DataCropGeoJsonWithDimensionsOptionalParams,
    ) =>
      cropGeoJsonWithDimensions(
        context,
        collectionId,
        itemId,
        width,
        height,
        format,
        body,
        options,
      ),
    cropGeoJson: (
      collectionId: string,
      itemId: string,
      format: string,
      body: Feature,
      options?: DataCropGeoJsonOptionalParams,
    ) => cropGeoJson(context, collectionId, itemId, format, body, options),
    getBounds: (collectionId: string, itemId: string, options?: DataGetBoundsOptionalParams) =>
      getBounds(context, collectionId, itemId, options),
    listAvailableAssets: (
      collectionId: string,
      itemId: string,
      options?: DataListAvailableAssetsOptionalParams,
    ) => listAvailableAssets(context, collectionId, itemId, options),
    getAssetStatistics: (
      collectionId: string,
      itemId: string,
      options?: DataGetAssetStatisticsOptionalParams,
    ) => getAssetStatistics(context, collectionId, itemId, options),
    listTileMatrices: (options?: DataListTileMatricesOptionalParams) =>
      listTileMatrices(context, options),
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
