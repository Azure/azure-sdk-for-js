// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProContext as Client } from "../index.js";
import {
  geometryUnionSerializer,
  stacSortExtensionArraySerializer,
  TileMatrixSet,
  tileMatrixSetDeserializer,
  BandStatistics,
  StacItemBounds,
  stacItemBoundsDeserializer,
  Feature,
  featureSerializer,
  StacItemStatisticsGeoJson,
  stacItemStatisticsGeoJsonDeserializer,
  TilerInfoGeoJsonFeature,
  tilerInfoGeoJsonFeatureDeserializer,
  tilerInfoRecordDeserializer,
  TilerInfo,
  TilerCoreModelsResponsesPoint,
  tilerCoreModelsResponsesPointDeserializer,
  ImageParameters,
  imageParametersSerializer,
  ImageResponse,
  imageResponseDeserializer,
  TilerStacItemStatistics,
  tilerStacItemStatisticsDeserializer,
  TileJsonMetadata,
  tileJsonMetadataDeserializer,
  StacItemPointAsset,
  TilerStacSearchRegistration,
  tilerStacSearchRegistrationDeserializer,
  mosaicMetadataSerializer,
  TilerMosaicSearchRegistrationResponse,
  tilerMosaicSearchRegistrationResponseDeserializer,
  IntervalLegendsElement,
  bandStatisticsRecordRecordDeserializer,
  intervalLegendsElementArrayArrayDeserializer,
  stacItemPointAssetArrayDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { stringToUint8Array } from "@azure/core-util";

export function _getMosaicsWmtsCapabilitiesSend(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  options: DataGetMosaicsWmtsCapabilitiesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/{searchId}/{tileMatrixSetId}/WMTSCapabilities.xml{?api%2Dversion,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,algorithm,algorithm_params,tile_format,tile_scale,minzoom,maxzoom,buffer,color_formula,resampling,rescale*,colormap_name,colormap,return_mask}",
    {
      searchId: searchId,
      tileMatrixSetId: tileMatrixSetId,
      "api%2Dversion": context.apiVersion,
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: options?.assetBandIndices,
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      tile_format: options?.tileFormat,
      tile_scale: options?.tileScale,
      minzoom: options?.minZoom,
      maxzoom: options?.maxZoom,
      buffer: options?.buffer,
      color_formula: options?.colorFormula,
      resampling: options?.resampling,
      rescale: !options?.rescale
        ? options?.rescale
        : options?.rescale.map((p: any) => {
            return p;
          }),
      colormap_name: options?.colorMapName,
      colormap: options?.colorMap,
      return_mask: options?.returnMask,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getMosaicsWmtsCapabilitiesDeserialize(
  result: PathUncheckedResponse,
): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return typeof result.body === "string"
    ? stringToUint8Array(result.body, "base64")
    : result.body;
}

/** OGC WMTS endpoint. */
export async function getMosaicsWmtsCapabilities(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  options: DataGetMosaicsWmtsCapabilitiesOptionalParams = {
    requestOptions: {},
  },
): Promise<Uint8Array> {
  const result = await _getMosaicsWmtsCapabilitiesSend(
    context,
    searchId,
    tileMatrixSetId,
    options,
  );
  return _getMosaicsWmtsCapabilitiesDeserialize(result);
}

export function _getMosaicsTileSend(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  format: string,
  options: DataGetMosaicsTileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/{searchId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}@{scale}x.{format}{?api%2Dversion,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,algorithm,algorithm_params,buffer,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask}",
    {
      searchId: searchId,
      tileMatrixSetId: tileMatrixSetId,
      z: z,
      x: x,
      y: y,
      scale: scale,
      format: format,
      "api%2Dversion": context.apiVersion,
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: options?.assetBandIndices,
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      buffer: options?.buffer,
      color_formula: options?.colorFormula,
      collection: options?.collection,
      resampling: options?.resampling,
      pixel_selection: options?.pixelSelection,
      rescale: !options?.rescale
        ? options?.rescale
        : options?.rescale.map((p: any) => {
            return p;
          }),
      colormap_name: options?.colorMapName,
      colormap: options?.colorMap,
      return_mask: options?.returnMask,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getMosaicsTileDeserialize(
  result: PathUncheckedResponse,
): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

/** Create map tile. */
export async function getMosaicsTile(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  format: string,
  options: DataGetMosaicsTileOptionalParams = { requestOptions: {} },
): Promise<Uint8Array> {
  const result = await _getMosaicsTileSend(
    context,
    searchId,
    tileMatrixSetId,
    z,
    x,
    y,
    scale,
    format,
    options,
  );
  return _getMosaicsTileDeserialize(result);
}

export function _getMosaicsTileJsonSend(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  options: DataGetMosaicsTileJsonOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/{searchId}/{tileMatrixSetId}/tilejson.json{?api%2Dversion,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,algorithm,algorithm_params,minzoom,maxzoom,tile_format,tile_scale,buffer,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask}",
    {
      searchId: searchId,
      tileMatrixSetId: tileMatrixSetId,
      "api%2Dversion": context.apiVersion,
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: options?.assetBandIndices,
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      minzoom: options?.minZoom,
      maxzoom: options?.maxZoom,
      tile_format: options?.tileFormat,
      tile_scale: options?.tileScale,
      buffer: options?.buffer,
      color_formula: options?.colorFormula,
      collection: options?.collection,
      resampling: options?.resampling,
      pixel_selection: options?.pixelSelection,
      rescale: !options?.rescale
        ? options?.rescale
        : options?.rescale.map((p: any) => {
            return p;
          }),
      colormap_name: options?.colorMapName,
      colormap: options?.colorMap,
      return_mask: options?.returnMask,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getMosaicsTileJsonDeserialize(
  result: PathUncheckedResponse,
): Promise<TileJsonMetadata> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tileJsonMetadataDeserializer(result.body);
}

/** Return TileJSON document for a searchId. */
export async function getMosaicsTileJson(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  options: DataGetMosaicsTileJsonOptionalParams = { requestOptions: {} },
): Promise<TileJsonMetadata> {
  const result = await _getMosaicsTileJsonSend(
    context,
    searchId,
    tileMatrixSetId,
    options,
  );
  return _getMosaicsTileJsonDeserialize(result);
}

export function _registerMosaicsSearchSend(
  context: Client,
  options: DataRegisterMosaicsSearchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/register{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: {
      collections: !options?.collections
        ? options?.collections
        : options?.collections.map((p: any) => {
            return p;
          }),
      ids: !options?.ids
        ? options?.ids
        : options?.ids.map((p: any) => {
            return p;
          }),
      bbox: options?.boundingBox,
      intersects: !options?.intersects
        ? options?.intersects
        : geometryUnionSerializer(options?.intersects),
      query: options?.query,
      filter: options?.filter,
      datetime: options?.datetime,
      sortby: !options?.sortBy
        ? options?.sortBy
        : stacSortExtensionArraySerializer(options?.sortBy),
      "filter-lang": options?.filterLanguage,
      metadata: !options?.metadata
        ? options?.metadata
        : mosaicMetadataSerializer(options?.metadata),
    },
  });
}

export async function _registerMosaicsSearchDeserialize(
  result: PathUncheckedResponse,
): Promise<TilerMosaicSearchRegistrationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tilerMosaicSearchRegistrationResponseDeserializer(result.body);
}

/** Register a Search query */
export async function registerMosaicsSearch(
  context: Client,
  options: DataRegisterMosaicsSearchOptionalParams = { requestOptions: {} },
): Promise<TilerMosaicSearchRegistrationResponse> {
  const result = await _registerMosaicsSearchSend(context, options);
  return _registerMosaicsSearchDeserialize(result);
}

export function _getMosaicsSearchInfoSend(
  context: Client,
  searchId: string,
  options: DataGetMosaicsSearchInfoOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/{searchId}/info{?api%2Dversion}",
    {
      searchId: searchId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getMosaicsSearchInfoDeserialize(
  result: PathUncheckedResponse,
): Promise<TilerStacSearchRegistration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tilerStacSearchRegistrationDeserializer(result.body);
}

/** Get Search query metadata. */
export async function getMosaicsSearchInfo(
  context: Client,
  searchId: string,
  options: DataGetMosaicsSearchInfoOptionalParams = { requestOptions: {} },
): Promise<TilerStacSearchRegistration> {
  const result = await _getMosaicsSearchInfoSend(context, searchId, options);
  return _getMosaicsSearchInfoDeserialize(result);
}

export function _getMosaicsAssetsForTileSend(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  collectionId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetMosaicsAssetsForTileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/{searchId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}/assets{?api%2Dversion,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,collection}",
    {
      searchId: searchId,
      tileMatrixSetId: tileMatrixSetId,
      z: z,
      x: x,
      y: y,
      "api%2Dversion": context.apiVersion,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      collection: collectionId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getMosaicsAssetsForTileDeserialize(
  result: PathUncheckedResponse,
): Promise<any[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body.map((p: any) => {
    return p;
  });
}

/** Return a list of assets which overlap a given tile */
export async function getMosaicsAssetsForTile(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  collectionId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetMosaicsAssetsForTileOptionalParams = { requestOptions: {} },
): Promise<any[]> {
  const result = await _getMosaicsAssetsForTileSend(
    context,
    searchId,
    tileMatrixSetId,
    collectionId,
    z,
    x,
    y,
    options,
  );
  return _getMosaicsAssetsForTileDeserialize(result);
}

export function _getMosaicsAssetsForPointSend(
  context: Client,
  searchId: string,
  longitude: number,
  latitude: number,
  options: DataGetMosaicsAssetsForPointOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/{searchId}/{longitude},{latitude}/assets{?api%2Dversion,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,coord%2Dcrs}",
    {
      searchId: searchId,
      longitude: longitude,
      latitude: latitude,
      "api%2Dversion": context.apiVersion,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      "coord%2Dcrs": options?.coordinateReferenceSystem,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getMosaicsAssetsForPointDeserialize(
  result: PathUncheckedResponse,
): Promise<StacItemPointAsset[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacItemPointAssetArrayDeserializer(result.body);
}

/** Return a list of assets for a given point. */
export async function getMosaicsAssetsForPoint(
  context: Client,
  searchId: string,
  longitude: number,
  latitude: number,
  options: DataGetMosaicsAssetsForPointOptionalParams = { requestOptions: {} },
): Promise<StacItemPointAsset[]> {
  const result = await _getMosaicsAssetsForPointSend(
    context,
    searchId,
    longitude,
    latitude,
    options,
  );
  return _getMosaicsAssetsForPointDeserialize(result);
}

export function _getLegendSend(
  context: Client,
  colorMapName: string,
  options: DataGetLegendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/legend/colormap/{colorMapName}{?api%2Dversion,height,width,trim_start,trim_end}",
    {
      colorMapName: colorMapName,
      "api%2Dversion": context.apiVersion,
      height: options?.height,
      width: options?.width,
      trim_start: options?.trimStart,
      trim_end: options?.trimEnd,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "image/png", ...options.requestOptions?.headers },
    });
}

export async function _getLegendDeserialize(
  result: PathUncheckedResponse,
): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

/**
 * Generate a legend image for a given colormap.
 *
 * If the colormap has non-contiguous values at the beginning or end,
 * which aren't desired in the output image, they can be trimmed by specifying
 * the number of values to trim.
 */
export async function getLegend(
  context: Client,
  colorMapName: string,
  options: DataGetLegendOptionalParams = { requestOptions: {} },
): Promise<Uint8Array> {
  const result = await _getLegendSend(context, colorMapName, options);
  return _getLegendDeserialize(result);
}

export function _getIntervalLegendSend(
  context: Client,
  classmapName: string,
  options: DataGetIntervalLegendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/legend/interval/{classmapName}{?api%2Dversion,trim_start,trim_end}",
    {
      classmapName: classmapName,
      "api%2Dversion": context.apiVersion,
      trim_start: options?.trimStart,
      trim_end: options?.trimEnd,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getIntervalLegendDeserialize(
  result: PathUncheckedResponse,
): Promise<IntervalLegendsElement[][]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return intervalLegendsElementArrayArrayDeserializer(result.body);
}

/** Generate values and color swatches mapping for a given interval classmap. */
export async function getIntervalLegend(
  context: Client,
  classmapName: string,
  options: DataGetIntervalLegendOptionalParams = { requestOptions: {} },
): Promise<IntervalLegendsElement[][]> {
  const result = await _getIntervalLegendSend(context, classmapName, options);
  return _getIntervalLegendDeserialize(result);
}

export function _getClassMapLegendSend(
  context: Client,
  classmapName: string,
  options: DataGetClassMapLegendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/legend/classmap/{classmapName}{?api%2Dversion,trim_start,trim_end}",
    {
      classmapName: classmapName,
      "api%2Dversion": context.apiVersion,
      trim_start: options?.trimStart,
      trim_end: options?.trimEnd,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getClassMapLegendDeserialize(
  result: PathUncheckedResponse,
): Promise<Record<string, any>> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

/** Generate values and color swatches mapping for a given classmap. */
export async function getClassMapLegend(
  context: Client,
  classmapName: string,
  options: DataGetClassMapLegendOptionalParams = { requestOptions: {} },
): Promise<Record<string, any>> {
  const result = await _getClassMapLegendSend(context, classmapName, options);
  return _getClassMapLegendDeserialize(result);
}

export function _getWmtsCapabilitiesSend(
  context: Client,
  collectionId: string,
  itemId: string,
  tileMatrixSetId: string,
  options: DataGetWmtsCapabilitiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/collections/{collectionId}/items/{itemId}/{tileMatrixSetId}/WMTSCapabilities.xml{?api%2Dversion,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,algorithm,algorithm_params,tile_format,tile_scale,minzoom,maxzoom,buffer,color_formula,resampling,rescale*,colormap_name,colormap,return_mask}",
    {
      collectionId: collectionId,
      itemId: itemId,
      tileMatrixSetId: tileMatrixSetId,
      "api%2Dversion": context.apiVersion,
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: options?.assetBandIndices,
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      tile_format: options?.tileFormat,
      tile_scale: options?.tileScale,
      minzoom: options?.minZoom,
      maxzoom: options?.maxZoom,
      buffer: options?.buffer,
      color_formula: options?.colorFormula,
      resampling: options?.resampling,
      rescale: !options?.rescale
        ? options?.rescale
        : options?.rescale.map((p: any) => {
            return p;
          }),
      colormap_name: options?.colorMapName,
      colormap: options?.colorMap,
      return_mask: options?.returnMask,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getWmtsCapabilitiesDeserialize(
  result: PathUncheckedResponse,
): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return typeof result.body === "string"
    ? stringToUint8Array(result.body, "base64")
    : result.body;
}

/** OGC WMTS endpoint. */
export async function getWmtsCapabilities(
  context: Client,
  collectionId: string,
  itemId: string,
  tileMatrixSetId: string,
  options: DataGetWmtsCapabilitiesOptionalParams = { requestOptions: {} },
): Promise<Uint8Array> {
  const result = await _getWmtsCapabilitiesSend(
    context,
    collectionId,
    itemId,
    tileMatrixSetId,
    options,
  );
  return _getWmtsCapabilitiesDeserialize(result);
}

export function _getTileSend(
  context: Client,
  collectionId: string,
  itemId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  format: string,
  options: DataGetTileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/collections/{collectionId}/items/{itemId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}@{scale}x.{format}{?api%2Dversion,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,algorithm,algorithm_params,buffer,color_formula,resampling,rescale*,colormap_name,colormap,return_mask,subdataset_name,subdataset_bands}",
    {
      collectionId: collectionId,
      itemId: itemId,
      tileMatrixSetId: tileMatrixSetId,
      z: z,
      x: x,
      y: y,
      scale: scale,
      format: format,
      "api%2Dversion": context.apiVersion,
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: options?.assetBandIndices,
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      buffer: options?.buffer,
      color_formula: options?.colorFormula,
      resampling: options?.resampling,
      rescale: !options?.rescale
        ? options?.rescale
        : options?.rescale.map((p: any) => {
            return p;
          }),
      colormap_name: options?.colorMapName,
      colormap: options?.colorMap,
      return_mask: options?.returnMask,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getTileDeserialize(
  result: PathUncheckedResponse,
): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

/** Create map tile from a dataset. */
export async function getTile(
  context: Client,
  collectionId: string,
  itemId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  format: string,
  options: DataGetTileOptionalParams = { requestOptions: {} },
): Promise<Uint8Array> {
  const result = await _getTileSend(
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
  );
  return _getTileDeserialize(result);
}

export function _getTileJsonSend(
  context: Client,
  collectionId: string,
  itemId: string,
  tileMatrixSetId: string,
  options: DataGetTileJsonOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/collections/{collectionId}/items/{itemId}/{tileMatrixSetId}/tilejson.json{?api%2Dversion,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,algorithm,algorithm_params,tile_format,tile_scale,minzoom,maxzoom,buffer,color_formula,resampling,rescale*,colormap_name,colormap,return_mask}",
    {
      collectionId: collectionId,
      itemId: itemId,
      tileMatrixSetId: tileMatrixSetId,
      "api%2Dversion": context.apiVersion,
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: options?.assetBandIndices,
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      tile_format: options?.tileFormat,
      tile_scale: options?.tileScale,
      minzoom: options?.minZoom,
      maxzoom: options?.maxZoom,
      buffer: options?.buffer,
      color_formula: options?.colorFormula,
      resampling: options?.resampling,
      rescale: !options?.rescale
        ? options?.rescale
        : options?.rescale.map((p: any) => {
            return p;
          }),
      colormap_name: options?.colorMapName,
      colormap: options?.colorMap,
      return_mask: options?.returnMask,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getTileJsonDeserialize(
  result: PathUncheckedResponse,
): Promise<TileJsonMetadata> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tileJsonMetadataDeserializer(result.body);
}

/** Return the TileJson Tilematrixsetid As a path */
export async function getTileJson(
  context: Client,
  collectionId: string,
  itemId: string,
  tileMatrixSetId: string,
  options: DataGetTileJsonOptionalParams = { requestOptions: {} },
): Promise<TileJsonMetadata> {
  const result = await _getTileJsonSend(
    context,
    collectionId,
    itemId,
    tileMatrixSetId,
    options,
  );
  return _getTileJsonDeserialize(result);
}

export function _listStatisticsSend(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataListStatisticsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/collections/{collectionId}/items/{itemId}/statistics{?api%2Dversion,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,resampling,max_size,categorical,c,p,histogram_bins,histogram_range}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion,
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: options?.assetBandIndices,
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      resampling: options?.resampling,
      max_size: options?.maxSize,
      categorical: options?.categorical,
      c: !options?.categoriesPixels
        ? options?.categoriesPixels
        : options?.categoriesPixels.map((p: any) => {
            return p;
          }),
      p: !options?.percentiles
        ? options?.percentiles
        : options?.percentiles.map((p: any) => {
            return p;
          }),
      histogram_bins: options?.histogramBins,
      histogram_range: options?.histogramRange,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listStatisticsDeserialize(
  result: PathUncheckedResponse,
): Promise<TilerStacItemStatistics> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tilerStacItemStatisticsDeserializer(result.body);
}

/** Merged assets statistics. */
export async function listStatistics(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataListStatisticsOptionalParams = { requestOptions: {} },
): Promise<TilerStacItemStatistics> {
  const result = await _listStatisticsSend(
    context,
    collectionId,
    itemId,
    options,
  );
  return _listStatisticsDeserialize(result);
}

export function _getStaticImageSend(
  context: Client,
  collectionId: string,
  id: string,
  options: DataGetStaticImageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/collections/{collectionId}/image/static/{id}{?api%2Dversion}",
    {
      collectionId: collectionId,
      id: id,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "image/png", ...options.requestOptions?.headers },
    });
}

export async function _getStaticImageDeserialize(
  result: PathUncheckedResponse,
): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

/** Fetch an existing image export by ID */
export async function getStaticImage(
  context: Client,
  collectionId: string,
  id: string,
  options: DataGetStaticImageOptionalParams = { requestOptions: {} },
): Promise<Uint8Array> {
  const result = await _getStaticImageSend(context, collectionId, id, options);
  return _getStaticImageDeserialize(result);
}

export function _createStaticImageSend(
  context: Client,
  collectionId: string,
  body: ImageParameters,
  options: DataCreateStaticImageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/collections/{collectionId}/image/static{?api%2Dversion}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: imageParametersSerializer(body),
    });
}

export async function _createStaticImageDeserialize(
  result: PathUncheckedResponse,
): Promise<ImageResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return imageResponseDeserializer(result.body);
}

/** Create a new image export. */
export async function createStaticImage(
  context: Client,
  collectionId: string,
  body: ImageParameters,
  options: DataCreateStaticImageOptionalParams = { requestOptions: {} },
): Promise<ImageResponse> {
  const result = await _createStaticImageSend(
    context,
    collectionId,
    body,
    options,
  );
  return _createStaticImageDeserialize(result);
}

export function _getPreviewWithFormatSend(
  context: Client,
  collectionId: string,
  itemId: string,
  format: string,
  options: DataGetPreviewWithFormatOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/collections/{collectionId}/items/{itemId}/preview.{format}{?api%2Dversion,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,algorithm,algorithm_params,color_formula,dst%2Dcrs,resampling,max_size,height,width,rescale*,colormap_name,colormap,return_mask}",
    {
      collectionId: collectionId,
      itemId: itemId,
      format: format,
      "api%2Dversion": context.apiVersion,
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: options?.assetBandIndices,
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      color_formula: options?.colorFormula,
      "dst%2Dcrs": options?.dstCrs,
      resampling: options?.resampling,
      max_size: options?.maxSize,
      height: options?.height,
      width: options?.width,
      rescale: !options?.rescale
        ? options?.rescale
        : options?.rescale.map((p: any) => {
            return p;
          }),
      colormap_name: options?.colorMapName,
      colormap: options?.colorMap,
      return_mask: options?.returnMask,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getPreviewWithFormatDeserialize(
  result: PathUncheckedResponse,
): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

/** Create preview of a dataset. */
export async function getPreviewWithFormat(
  context: Client,
  collectionId: string,
  itemId: string,
  format: string,
  options: DataGetPreviewWithFormatOptionalParams = { requestOptions: {} },
): Promise<Uint8Array> {
  const result = await _getPreviewWithFormatSend(
    context,
    collectionId,
    itemId,
    format,
    options,
  );
  return _getPreviewWithFormatDeserialize(result);
}

export function _getPreviewSend(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetPreviewOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/collections/{collectionId}/items/{itemId}/preview{?api%2Dversion,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,algorithm,algorithm_params,format,color_formula,dst%2Dcrs,resampling,max_size,height,width,rescale*,colormap_name,colormap,return_mask}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion,
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: options?.assetBandIndices,
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      format: options?.format,
      color_formula: options?.colorFormula,
      "dst%2Dcrs": options?.dstCrs,
      resampling: options?.resampling,
      max_size: options?.maxSize,
      height: options?.height,
      width: options?.width,
      rescale: !options?.rescale
        ? options?.rescale
        : options?.rescale.map((p: any) => {
            return p;
          }),
      colormap_name: options?.colorMapName,
      colormap: options?.colorMap,
      return_mask: options?.returnMask,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getPreviewDeserialize(
  result: PathUncheckedResponse,
): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

/** Create preview of a dataset. */
export async function getPreview(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetPreviewOptionalParams = { requestOptions: {} },
): Promise<Uint8Array> {
  const result = await _getPreviewSend(context, collectionId, itemId, options);
  return _getPreviewDeserialize(result);
}

export function _getPointSend(
  context: Client,
  collectionId: string,
  itemId: string,
  longitude: number,
  latitude: number,
  options: DataGetPointOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/collections/{collectionId}/items/{itemId}/point/{longitude},{latitude}{?api%2Dversion,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,coord%2Dcrs,resampling}",
    {
      collectionId: collectionId,
      itemId: itemId,
      longitude: longitude,
      latitude: latitude,
      "api%2Dversion": context.apiVersion,
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: options?.assetBandIndices,
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      "coord%2Dcrs": options?.coordinateReferenceSystem,
      resampling: options?.resampling,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getPointDeserialize(
  result: PathUncheckedResponse,
): Promise<TilerCoreModelsResponsesPoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tilerCoreModelsResponsesPointDeserializer(result.body);
}

/** Get Point value for a dataset. */
export async function getPoint(
  context: Client,
  collectionId: string,
  itemId: string,
  longitude: number,
  latitude: number,
  options: DataGetPointOptionalParams = { requestOptions: {} },
): Promise<TilerCoreModelsResponsesPoint> {
  const result = await _getPointSend(
    context,
    collectionId,
    itemId,
    longitude,
    latitude,
    options,
  );
  return _getPointDeserialize(result);
}

export function _getPartWithDimensionsSend(
  context: Client,
  collectionId: string,
  itemId: string,
  minx: number,
  miny: number,
  maxx: number,
  maxy: number,
  width: number,
  height: number,
  format: string,
  options: DataGetPartWithDimensionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/collections/{collectionId}/items/{itemId}/crop/{minx},{miny},{maxx},{maxy}/{width}x{height}.{format}{?api%2Dversion,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,algorithm,algorithm_params,color_formula,dst%2Dcrs,coord%2Dcrs,resampling,max_size,rescale*,colormap_name,colormap,return_mask}",
    {
      collectionId: collectionId,
      itemId: itemId,
      minx: minx,
      miny: miny,
      maxx: maxx,
      maxy: maxy,
      width: width,
      height: height,
      format: format,
      "api%2Dversion": context.apiVersion,
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: options?.assetBandIndices,
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      color_formula: options?.colorFormula,
      "dst%2Dcrs": options?.dstCrs,
      "coord%2Dcrs": options?.coordinateReferenceSystem,
      resampling: options?.resampling,
      max_size: options?.maxSize,
      rescale: !options?.rescale
        ? options?.rescale
        : options?.rescale.map((p: any) => {
            return p;
          }),
      colormap_name: options?.colorMapName,
      colormap: options?.colorMap,
      return_mask: options?.returnMask,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getPartWithDimensionsDeserialize(
  result: PathUncheckedResponse,
): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

/** Create image from part of a dataset. */
export async function getPartWithDimensions(
  context: Client,
  collectionId: string,
  itemId: string,
  minx: number,
  miny: number,
  maxx: number,
  maxy: number,
  width: number,
  height: number,
  format: string,
  options: DataGetPartWithDimensionsOptionalParams = { requestOptions: {} },
): Promise<Uint8Array> {
  const result = await _getPartWithDimensionsSend(
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
  );
  return _getPartWithDimensionsDeserialize(result);
}

export function _getPartSend(
  context: Client,
  collectionId: string,
  itemId: string,
  minx: number,
  miny: number,
  maxx: number,
  maxy: number,
  format: string,
  options: DataGetPartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/collections/{collectionId}/items/{itemId}/crop/{minx},{miny},{maxx},{maxy}.{format}{?api%2Dversion,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,algorithm,algorithm_params,color_formula,dst%2Dcrs,coord%2Dcrs,resampling,max_size,height,width,rescale*,colormap_name,colormap,return_mask}",
    {
      collectionId: collectionId,
      itemId: itemId,
      minx: minx,
      miny: miny,
      maxx: maxx,
      maxy: maxy,
      format: format,
      "api%2Dversion": context.apiVersion,
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: options?.assetBandIndices,
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      color_formula: options?.colorFormula,
      "dst%2Dcrs": options?.dstCrs,
      "coord%2Dcrs": options?.coordinateReferenceSystem,
      resampling: options?.resampling,
      max_size: options?.maxSize,
      height: options?.height,
      width: options?.width,
      rescale: !options?.rescale
        ? options?.rescale
        : options?.rescale.map((p: any) => {
            return p;
          }),
      colormap_name: options?.colorMapName,
      colormap: options?.colorMap,
      return_mask: options?.returnMask,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getPartDeserialize(
  result: PathUncheckedResponse,
): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

/** Create image from part of a dataset. */
export async function getPart(
  context: Client,
  collectionId: string,
  itemId: string,
  minx: number,
  miny: number,
  maxx: number,
  maxy: number,
  format: string,
  options: DataGetPartOptionalParams = { requestOptions: {} },
): Promise<Uint8Array> {
  const result = await _getPartSend(
    context,
    collectionId,
    itemId,
    minx,
    miny,
    maxx,
    maxy,
    format,
    options,
  );
  return _getPartDeserialize(result);
}

export function _getItemAssetDetailsSend(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetItemAssetDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/collections/{collectionId}/items/{itemId}/info{?api%2Dversion,assets*}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion,
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getItemAssetDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<Record<string, TilerInfo>> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tilerInfoRecordDeserializer(result.body);
}

/** Return dataset's basic info. */
export async function getItemAssetDetails(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetItemAssetDetailsOptionalParams = { requestOptions: {} },
): Promise<Record<string, TilerInfo>> {
  const result = await _getItemAssetDetailsSend(
    context,
    collectionId,
    itemId,
    options,
  );
  return _getItemAssetDetailsDeserialize(result);
}

export function _getInfoGeoJsonSend(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetInfoGeoJsonOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/collections/{collectionId}/items/{itemId}/info.geojson{?api%2Dversion,assets*}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion,
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getInfoGeoJsonDeserialize(
  result: PathUncheckedResponse,
): Promise<TilerInfoGeoJsonFeature> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tilerInfoGeoJsonFeatureDeserializer(result.body);
}

/** Return Info Geojson */
export async function getInfoGeoJson(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetInfoGeoJsonOptionalParams = { requestOptions: {} },
): Promise<TilerInfoGeoJsonFeature> {
  const result = await _getInfoGeoJsonSend(
    context,
    collectionId,
    itemId,
    options,
  );
  return _getInfoGeoJsonDeserialize(result);
}

export function _getGeoJsonStatisticsSend(
  context: Client,
  collectionId: string,
  itemId: string,
  body: Feature,
  options: DataGetGeoJsonStatisticsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/collections/{collectionId}/items/{itemId}/statistics{?api%2Dversion,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,coord%2Dcrs,resampling,max_size,categorical,c,p,histogram_bins,histogram_range}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion,
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: options?.assetBandIndices,
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      "coord%2Dcrs": options?.coordinateReferenceSystem,
      resampling: options?.resampling,
      max_size: options?.maxSize,
      categorical: options?.categorical,
      c: !options?.categoriesPixels
        ? options?.categoriesPixels
        : options?.categoriesPixels.map((p: any) => {
            return p;
          }),
      p: !options?.percentiles
        ? options?.percentiles
        : options?.percentiles.map((p: any) => {
            return p;
          }),
      histogram_bins: options?.histogramBins,
      histogram_range: options?.histogramRange,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: featureSerializer(body),
    });
}

export async function _getGeoJsonStatisticsDeserialize(
  result: PathUncheckedResponse,
): Promise<StacItemStatisticsGeoJson> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacItemStatisticsGeoJsonDeserializer(result.body);
}

/** Get Statistics from a geojson feature. */
export async function getGeoJsonStatistics(
  context: Client,
  collectionId: string,
  itemId: string,
  body: Feature,
  options: DataGetGeoJsonStatisticsOptionalParams = { requestOptions: {} },
): Promise<StacItemStatisticsGeoJson> {
  const result = await _getGeoJsonStatisticsSend(
    context,
    collectionId,
    itemId,
    body,
    options,
  );
  return _getGeoJsonStatisticsDeserialize(result);
}

export function _cropGeoJsonWithDimensionsSend(
  context: Client,
  collectionId: string,
  itemId: string,
  width: number,
  height: number,
  format: string,
  body: Feature,
  options: DataCropGeoJsonWithDimensionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/collections/{collectionId}/items/{itemId}/crop/{width}x{height}.{format}{?api%2Dversion,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,algorithm,algorithm_params,color_formula,coord%2Dcrs,resampling,max_size,rescale*,colormap_name,colormap,return_mask}",
    {
      collectionId: collectionId,
      itemId: itemId,
      width: width,
      height: height,
      format: format,
      "api%2Dversion": context.apiVersion,
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: options?.assetBandIndices,
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      color_formula: options?.colorFormula,
      "coord%2Dcrs": options?.coordinateReferenceSystem,
      resampling: options?.resampling,
      max_size: options?.maxSize,
      rescale: !options?.rescale
        ? options?.rescale
        : options?.rescale.map((p: any) => {
            return p;
          }),
      colormap_name: options?.colorMapName,
      colormap: options?.colorMap,
      return_mask: options?.returnMask,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: featureSerializer(body),
    });
}

export async function _cropGeoJsonWithDimensionsDeserialize(
  result: PathUncheckedResponse,
): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

/** Create image from a geojson feature. */
export async function cropGeoJsonWithDimensions(
  context: Client,
  collectionId: string,
  itemId: string,
  width: number,
  height: number,
  format: string,
  body: Feature,
  options: DataCropGeoJsonWithDimensionsOptionalParams = { requestOptions: {} },
): Promise<Uint8Array> {
  const result = await _cropGeoJsonWithDimensionsSend(
    context,
    collectionId,
    itemId,
    width,
    height,
    format,
    body,
    options,
  );
  return _cropGeoJsonWithDimensionsDeserialize(result);
}

export function _cropGeoJsonSend(
  context: Client,
  collectionId: string,
  itemId: string,
  format: string,
  body: Feature,
  options: DataCropGeoJsonOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/collections/{collectionId}/items/{itemId}/crop.{format}{?api%2Dversion,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,algorithm,algorithm_params,color_formula,coord%2Dcrs,resampling,max_size,height,width,rescale*,colormap_name,colormap,return_mask}",
    {
      collectionId: collectionId,
      itemId: itemId,
      format: format,
      "api%2Dversion": context.apiVersion,
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: options?.assetBandIndices,
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      color_formula: options?.colorFormula,
      "coord%2Dcrs": options?.coordinateReferenceSystem,
      resampling: options?.resampling,
      max_size: options?.maxSize,
      height: options?.height,
      width: options?.width,
      rescale: !options?.rescale
        ? options?.rescale
        : options?.rescale.map((p: any) => {
            return p;
          }),
      colormap_name: options?.colorMapName,
      colormap: options?.colorMap,
      return_mask: options?.returnMask,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: featureSerializer(body),
    });
}

export async function _cropGeoJsonDeserialize(
  result: PathUncheckedResponse,
): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

/** Create image from a geojson feature. */
export async function cropGeoJson(
  context: Client,
  collectionId: string,
  itemId: string,
  format: string,
  body: Feature,
  options: DataCropGeoJsonOptionalParams = { requestOptions: {} },
): Promise<Uint8Array> {
  const result = await _cropGeoJsonSend(
    context,
    collectionId,
    itemId,
    format,
    body,
    options,
  );
  return _cropGeoJsonDeserialize(result);
}

export function _getBoundsSend(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetBoundsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/collections/{collectionId}/items/{itemId}/bounds{?api%2Dversion}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getBoundsDeserialize(
  result: PathUncheckedResponse,
): Promise<StacItemBounds> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacItemBoundsDeserializer(result.body);
}

/** Return all Bounds */
export async function getBounds(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetBoundsOptionalParams = { requestOptions: {} },
): Promise<StacItemBounds> {
  const result = await _getBoundsSend(context, collectionId, itemId, options);
  return _getBoundsDeserialize(result);
}

export function _listAvailableAssetsSend(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataListAvailableAssetsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/collections/{collectionId}/items/{itemId}/assets{?api%2Dversion}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listAvailableAssetsDeserialize(
  result: PathUncheckedResponse,
): Promise<string[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body.map((p: any) => {
    return p;
  });
}

/** Return a list of supported assets. */
export async function listAvailableAssets(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataListAvailableAssetsOptionalParams = { requestOptions: {} },
): Promise<string[]> {
  const result = await _listAvailableAssetsSend(
    context,
    collectionId,
    itemId,
    options,
  );
  return _listAvailableAssetsDeserialize(result);
}

export function _getAssetStatisticsSend(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetAssetStatisticsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/collections/{collectionId}/items/{itemId}/asset_statistics{?api%2Dversion,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,resampling,max_size,categorical,c,p,histogram_bins,histogram_range}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion,
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: options?.assetBandIndices,
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      resampling: options?.resampling,
      max_size: options?.maxSize,
      categorical: options?.categorical,
      c: !options?.categoriesPixels
        ? options?.categoriesPixels
        : options?.categoriesPixels.map((p: any) => {
            return p;
          }),
      p: !options?.percentiles
        ? options?.percentiles
        : options?.percentiles.map((p: any) => {
            return p;
          }),
      histogram_bins: options?.histogramBins,
      histogram_range: options?.histogramRange,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getAssetStatisticsDeserialize(
  result: PathUncheckedResponse,
): Promise<Record<string, Record<string, BandStatistics>>> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return bandStatisticsRecordRecordDeserializer(result.body);
}

/** Per Asset statistics */
export async function getAssetStatistics(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetAssetStatisticsOptionalParams = { requestOptions: {} },
): Promise<Record<string, Record<string, BandStatistics>>> {
  const result = await _getAssetStatisticsSend(
    context,
    collectionId,
    itemId,
    options,
  );
  return _getAssetStatisticsDeserialize(result);
}

export function _listTileMatricesSend(
  context: Client,
  options: DataListTileMatricesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/tile-matrix-sets{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listTileMatricesDeserialize(
  result: PathUncheckedResponse,
): Promise<string[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body.map((p: any) => {
    return p;
  });
}

/** Return Matrix List */
export async function listTileMatrices(
  context: Client,
  options: DataListTileMatricesOptionalParams = { requestOptions: {} },
): Promise<string[]> {
  const result = await _listTileMatricesSend(context, options);
  return _listTileMatricesDeserialize(result);
}

export function _getTileMatrixDefinitionsSend(
  context: Client,
  tileMatrixSetId: string,
  options: DataGetTileMatrixDefinitionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/tile-matrix-sets/{tileMatrixSetId}{?api%2Dversion}",
    {
      tileMatrixSetId: tileMatrixSetId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getTileMatrixDefinitionsDeserialize(
  result: PathUncheckedResponse,
): Promise<TileMatrixSet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tileMatrixSetDeserializer(result.body);
}

/** Return Matrix Definition */
export async function getTileMatrixDefinitions(
  context: Client,
  tileMatrixSetId: string,
  options: DataGetTileMatrixDefinitionsOptionalParams = { requestOptions: {} },
): Promise<TileMatrixSet> {
  const result = await _getTileMatrixDefinitionsSend(
    context,
    tileMatrixSetId,
    options,
  );
  return _getTileMatrixDefinitionsDeserialize(result);
}
