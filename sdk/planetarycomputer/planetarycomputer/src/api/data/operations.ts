// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProContext as Client } from "../index.js";
import { getBinaryStreamResponse } from "#platform/static-helpers/serialization/get-binary-stream-response";
import {
  geometryUnionSerializer,
  stacSortExtensionArraySerializer,
  TileMatrixSet,
  tileMatrixSetDeserializer,
  ClassMapLegendResponse,
  classMapLegendResponseDeserializer,
  mosaicMetadataSerializer,
  TilerMosaicSearchRegistrationResponse,
  tilerMosaicSearchRegistrationResponseDeserializer,
  TileSetList,
  tileSetListDeserializer,
  TileSetMetadata,
  tileSetMetadataDeserializer,
  Feature,
  featureSerializer,
  StacItemBounds,
  stacItemBoundsDeserializer,
  TilerInfoMapResponse,
  tilerInfoMapResponseDeserializer,
  TilerInfoGeoJsonFeature,
  tilerInfoGeoJsonFeatureDeserializer,
  AssetStatisticsResponse,
  assetStatisticsResponseDeserializer,
  TilerStacItemStatistics,
  tilerStacItemStatisticsDeserializer,
  StacItemStatisticsGeoJson,
  stacItemStatisticsGeoJsonDeserializer,
  TileJsonMetadata,
  tileJsonMetadataDeserializer,
  TilerCoreModelsResponsesPoint,
  tilerCoreModelsResponsesPointDeserializer,
  TilerAssetGeoJson,
  TilerStacSearchRegistration,
  tilerStacSearchRegistrationDeserializer,
  StacItemPointAsset,
  tilerAssetGeoJsonArrayDeserializer,
  stacItemPointAssetArrayDeserializer,
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
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
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
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { stringToUint8Array } from "@azure/core-util";

export function _getSearchPointWithAssetsSend(
  context: Client,
  searchId: string,
  longitude: number,
  latitude: number,
  options: DataGetSearchPointWithAssetsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/point/{longitude},{latitude}/assets{?api%2Dversion,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,coord_crs}",
    {
      searchId: searchId,
      longitude: longitude,
      latitude: latitude,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      coord_crs: options?.coordinateReferenceSystem,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSearchPointWithAssetsDeserialize(
  result: PathUncheckedResponse,
): Promise<StacItemPointAsset[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacItemPointAssetArrayDeserializer(result.body);
}

/** Return a list of assets for a given point in a search. */
export async function getSearchPointWithAssets(
  context: Client,
  searchId: string,
  longitude: number,
  latitude: number,
  options: DataGetSearchPointWithAssetsOptionalParams = { requestOptions: {} },
): Promise<StacItemPointAsset[]> {
  const result = await _getSearchPointWithAssetsSend(
    context,
    searchId,
    longitude,
    latitude,
    options,
  );
  return _getSearchPointWithAssetsDeserialize(result);
}

export function _getSearchPointSend(
  context: Client,
  searchId: string,
  longitude: number,
  latitude: number,
  options: DataGetSearchPointOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/point/{longitude},{latitude}{?api%2Dversion,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,coord_crs,resampling}",
    {
      searchId: searchId,
      longitude: longitude,
      latitude: latitude,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      coord_crs: options?.coordinateReferenceSystem,
      resampling: options?.resampling,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSearchPointDeserialize(
  result: PathUncheckedResponse,
): Promise<TilerCoreModelsResponsesPoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tilerCoreModelsResponsesPointDeserializer(result.body);
}

/** Get Point value for a search dataset. */
export async function getSearchPoint(
  context: Client,
  searchId: string,
  longitude: number,
  latitude: number,
  options: DataGetSearchPointOptionalParams = { requestOptions: {} },
): Promise<TilerCoreModelsResponsesPoint> {
  const result = await _getSearchPointSend(context, searchId, longitude, latitude, options);
  return _getSearchPointDeserialize(result);
}

export function _getSearchAssetsForTileNoTmsSend(
  context: Client,
  searchId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetSearchAssetsForTileNoTmsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/tiles/{z}/{x}/{y}/assets{?api%2Dversion,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,TileMatrixSetId}",
    {
      searchId: searchId,
      z: z,
      x: x,
      y: y,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      TileMatrixSetId: options?.tileMatrixSetId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSearchAssetsForTileNoTmsDeserialize(
  result: PathUncheckedResponse,
): Promise<DataGetSearchAssetsForTileNoTmsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    body: result.body.map((p: any) => {
      return p;
    }),
  };
}

/** Return a list of assets which overlap a given tile for a mosaic search. */
export async function getSearchAssetsForTileNoTms(
  context: Client,
  searchId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetSearchAssetsForTileNoTmsOptionalParams = { requestOptions: {} },
): Promise<DataGetSearchAssetsForTileNoTmsResponse> {
  const result = await _getSearchAssetsForTileNoTmsSend(context, searchId, z, x, y, options);
  return _getSearchAssetsForTileNoTmsDeserialize(result);
}

export function _getSearchTileNoTmsByScaleAndFormatSend(
  context: Client,
  searchId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  format: string,
  options: DataGetSearchTileNoTmsByScaleAndFormatOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/tiles/{z}/{x}/{y}@{scale}x.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,algorithm,algorithm_params,TileMatrixSetId,buffer,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,padding}",
    {
      searchId: searchId,
      z: z,
      x: x,
      y: y,
      scale: scale,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      TileMatrixSetId: options?.tileMatrixSetId,
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
      padding: options?.padding,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getSearchTileNoTmsByScaleAndFormatDeserialize(
  result: PathUncheckedResponse & DataGetSearchTileNoTmsByScaleAndFormatResponse,
): Promise<DataGetSearchTileNoTmsByScaleAndFormatResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create a map tile for a mosaic search with specified scale and format. */
export async function getSearchTileNoTmsByScaleAndFormat(
  context: Client,
  searchId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  format: string,
  options: DataGetSearchTileNoTmsByScaleAndFormatOptionalParams = { requestOptions: {} },
): Promise<DataGetSearchTileNoTmsByScaleAndFormatResponse> {
  const streamableMethod = _getSearchTileNoTmsByScaleAndFormatSend(
    context,
    searchId,
    z,
    x,
    y,
    scale,
    format,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getSearchTileNoTmsByScaleAndFormatDeserialize(result);
}

export function _getSearchTileNoTmsByScaleSend(
  context: Client,
  searchId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  options: DataGetSearchTileNoTmsByScaleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/tiles/{z}/{x}/{y}@{scale}x{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,algorithm,algorithm_params,TileMatrixSetId,format,buffer,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,padding}",
    {
      searchId: searchId,
      z: z,
      x: x,
      y: y,
      scale: scale,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      TileMatrixSetId: options?.tileMatrixSetId,
      format: options?.format,
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
      padding: options?.padding,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getSearchTileNoTmsByScaleDeserialize(
  result: PathUncheckedResponse & DataGetSearchTileNoTmsByScaleResponse,
): Promise<DataGetSearchTileNoTmsByScaleResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create a map tile for a mosaic search with specified scale. */
export async function getSearchTileNoTmsByScale(
  context: Client,
  searchId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  options: DataGetSearchTileNoTmsByScaleOptionalParams = { requestOptions: {} },
): Promise<DataGetSearchTileNoTmsByScaleResponse> {
  const streamableMethod = _getSearchTileNoTmsByScaleSend(
    context,
    searchId,
    z,
    x,
    y,
    scale,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getSearchTileNoTmsByScaleDeserialize(result);
}

export function _getSearchTileNoTmsByFormatSend(
  context: Client,
  searchId: string,
  z: number,
  x: number,
  y: number,
  format: string,
  options: DataGetSearchTileNoTmsByFormatOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/tiles/{z}/{x}/{y}.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,algorithm,algorithm_params,TileMatrixSetId,scale,buffer,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,padding}",
    {
      searchId: searchId,
      z: z,
      x: x,
      y: y,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      TileMatrixSetId: options?.tileMatrixSetId,
      scale: options?.scale,
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
      padding: options?.padding,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getSearchTileNoTmsByFormatDeserialize(
  result: PathUncheckedResponse & DataGetSearchTileNoTmsByFormatResponse,
): Promise<DataGetSearchTileNoTmsByFormatResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create a map tile for a mosaic search with specified format. */
export async function getSearchTileNoTmsByFormat(
  context: Client,
  searchId: string,
  z: number,
  x: number,
  y: number,
  format: string,
  options: DataGetSearchTileNoTmsByFormatOptionalParams = { requestOptions: {} },
): Promise<DataGetSearchTileNoTmsByFormatResponse> {
  const streamableMethod = _getSearchTileNoTmsByFormatSend(
    context,
    searchId,
    z,
    x,
    y,
    format,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getSearchTileNoTmsByFormatDeserialize(result);
}

export function _getSearchTileNoTmsSend(
  context: Client,
  searchId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetSearchTileNoTmsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/tiles/{z}/{x}/{y}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,algorithm,algorithm_params,TileMatrixSetId,format,scale,buffer,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,padding}",
    {
      searchId: searchId,
      z: z,
      x: x,
      y: y,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      TileMatrixSetId: options?.tileMatrixSetId,
      format: options?.format,
      scale: options?.scale,
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
      padding: options?.padding,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getSearchTileNoTmsDeserialize(
  result: PathUncheckedResponse & DataGetSearchTileNoTmsResponse,
): Promise<DataGetSearchTileNoTmsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create a map tile for a mosaic search. */
export async function getSearchTileNoTms(
  context: Client,
  searchId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetSearchTileNoTmsOptionalParams = { requestOptions: {} },
): Promise<DataGetSearchTileNoTmsResponse> {
  const streamableMethod = _getSearchTileNoTmsSend(context, searchId, z, x, y, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getSearchTileNoTmsDeserialize(result);
}

export function _getSearchTileJsonSend(
  context: Client,
  searchId: string,
  options: DataGetSearchTileJsonOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/tilejson.json{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,TileMatrixSetId,tile_format,tile_scale,minzoom,maxzoom,padding,buffer,color_formula,collection,resampling,pixel_selection,algorithm,algorithm_params,rescale*,colormap_name,colormap,return_mask}",
    {
      searchId: searchId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      TileMatrixSetId: options?.tileMatrixSetId,
      tile_format: options?.tileFormat,
      tile_scale: options?.tileScale,
      minzoom: options?.minZoom,
      maxzoom: options?.maxZoom,
      padding: options?.padding,
      buffer: options?.buffer,
      color_formula: options?.colorFormula,
      collection: options?.collectionId,
      resampling: options?.resampling,
      pixel_selection: options?.pixelSelection,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      rescale: !options?.rescale
        ? options?.rescale
        : options?.rescale.map((p: any) => {
            return p;
          }),
      colormap_name: options?.colormapName,
      colormap: options?.colormap,
      return_mask: options?.returnMask,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSearchTileJsonDeserialize(
  result: PathUncheckedResponse,
): Promise<TileJsonMetadata> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tileJsonMetadataDeserializer(result.body);
}

/** Return TileJSON document for a search. */
export async function getSearchTileJson(
  context: Client,
  searchId: string,
  options: DataGetSearchTileJsonOptionalParams = { requestOptions: {} },
): Promise<TileJsonMetadata> {
  const result = await _getSearchTileJsonSend(context, searchId, options);
  return _getSearchTileJsonDeserialize(result);
}

export function _getSearchWmtsCapabilitiesSend(
  context: Client,
  searchId: string,
  options: DataGetSearchWmtsCapabilitiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/WMTSCapabilities.xml{?api%2Dversion,TileMatrixSetId,tile_format,tile_scale,minzoom,maxzoom,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject}",
    {
      searchId: searchId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      TileMatrixSetId: options?.tileMatrixSetId,
      tile_format: options?.tileFormat,
      tile_scale: options?.tileScale,
      minzoom: options?.minZoom,
      maxzoom: options?.maxZoom,
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/xml", ...options.requestOptions?.headers },
  });
}

export async function _getSearchWmtsCapabilitiesDeserialize(
  result: PathUncheckedResponse,
): Promise<DataGetSearchWmtsCapabilitiesResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    body: typeof result.body === "string" ? stringToUint8Array(result.body, "base64") : result.body,
  };
}

/** OGC WMTS endpoint. */
export async function getSearchWmtsCapabilities(
  context: Client,
  searchId: string,
  options: DataGetSearchWmtsCapabilitiesOptionalParams = { requestOptions: {} },
): Promise<DataGetSearchWmtsCapabilitiesResponse> {
  const result = await _getSearchWmtsCapabilitiesSend(context, searchId, options);
  return _getSearchWmtsCapabilitiesDeserialize(result);
}

export function _cropSearchFeatureWidthByHeightSend(
  context: Client,
  searchId: string,
  width: number,
  height: number,
  format: string,
  body: Feature,
  options: DataCropSearchFeatureWidthByHeightOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/feature/{width}x{height}.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,algorithm,algorithm_params,coord_crs,max_size,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,dst_crs}",
    {
      searchId: searchId,
      width: width,
      height: height,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      coord_crs: options?.coordinateReferenceSystem,
      max_size: options?.maxSize,
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
      dst_crs: options?.destinationCrs,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
    body: featureSerializer(body),
  });
}

export async function _cropSearchFeatureWidthByHeightDeserialize(
  result: PathUncheckedResponse & DataCropSearchFeatureWidthByHeightResponse,
): Promise<DataCropSearchFeatureWidthByHeightResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create image from a geojson feature with dimensions. */
export async function cropSearchFeatureWidthByHeight(
  context: Client,
  searchId: string,
  width: number,
  height: number,
  format: string,
  body: Feature,
  options: DataCropSearchFeatureWidthByHeightOptionalParams = { requestOptions: {} },
): Promise<DataCropSearchFeatureWidthByHeightResponse> {
  const streamableMethod = _cropSearchFeatureWidthByHeightSend(
    context,
    searchId,
    width,
    height,
    format,
    body,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _cropSearchFeatureWidthByHeightDeserialize(result);
}

export function _cropSearchFeatureByFormatSend(
  context: Client,
  searchId: string,
  format: string,
  body: Feature,
  options: DataCropSearchFeatureByFormatOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/feature.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,algorithm,algorithm_params,coord_crs,max_size,height,width,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,dst_crs}",
    {
      searchId: searchId,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      coord_crs: options?.coordinateReferenceSystem,
      max_size: options?.maxSize,
      height: options?.height,
      width: options?.width,
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
      dst_crs: options?.destinationCrs,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
    body: featureSerializer(body),
  });
}

export async function _cropSearchFeatureByFormatDeserialize(
  result: PathUncheckedResponse & DataCropSearchFeatureByFormatResponse,
): Promise<DataCropSearchFeatureByFormatResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create image from a geojson feature with format. */
export async function cropSearchFeatureByFormat(
  context: Client,
  searchId: string,
  format: string,
  body: Feature,
  options: DataCropSearchFeatureByFormatOptionalParams = { requestOptions: {} },
): Promise<DataCropSearchFeatureByFormatResponse> {
  const streamableMethod = _cropSearchFeatureByFormatSend(context, searchId, format, body, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _cropSearchFeatureByFormatDeserialize(result);
}

export function _cropSearchFeatureSend(
  context: Client,
  searchId: string,
  body: Feature,
  options: DataCropSearchFeatureOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/feature{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,algorithm,algorithm_params,coord_crs,max_size,height,width,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,dst_crs,format}",
    {
      searchId: searchId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      coord_crs: options?.coordinateReferenceSystem,
      max_size: options?.maxSize,
      height: options?.height,
      width: options?.width,
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
      dst_crs: options?.destinationCrs,
      format: options?.format,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
    body: featureSerializer(body),
  });
}

export async function _cropSearchFeatureDeserialize(
  result: PathUncheckedResponse & DataCropSearchFeatureResponse,
): Promise<DataCropSearchFeatureResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create image from a geojson feature (without format in path). */
export async function cropSearchFeature(
  context: Client,
  searchId: string,
  body: Feature,
  options: DataCropSearchFeatureOptionalParams = { requestOptions: {} },
): Promise<DataCropSearchFeatureResponse> {
  const streamableMethod = _cropSearchFeatureSend(context, searchId, body, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _cropSearchFeatureDeserialize(result);
}

export function _getSearchBboxAssetsSend(
  context: Client,
  searchId: string,
  minx: number,
  miny: number,
  maxx: number,
  maxy: number,
  options: DataGetSearchBboxAssetsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/bbox/{minx},{miny},{maxx},{maxy}/assets{?api%2Dversion,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,coord_crs}",
    {
      searchId: searchId,
      minx: minx,
      miny: miny,
      maxx: maxx,
      maxy: maxy,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      coord_crs: options?.coordinateReferenceSystem,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSearchBboxAssetsDeserialize(
  result: PathUncheckedResponse,
): Promise<DataGetSearchBboxAssetsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    body: result.body.map((p: any) => {
      return p;
    }),
  };
}

/** Return a list of assets which overlap a given bounding box for a search. */
export async function getSearchBboxAssets(
  context: Client,
  searchId: string,
  minx: number,
  miny: number,
  maxx: number,
  maxy: number,
  options: DataGetSearchBboxAssetsOptionalParams = { requestOptions: {} },
): Promise<DataGetSearchBboxAssetsResponse> {
  const result = await _getSearchBboxAssetsSend(context, searchId, minx, miny, maxx, maxy, options);
  return _getSearchBboxAssetsDeserialize(result);
}

export function _getSearchBboxCropWithDimensionsSend(
  context: Client,
  searchId: string,
  minx: number,
  miny: number,
  maxx: number,
  maxy: number,
  width: number,
  height: number,
  format: string,
  options: DataGetSearchBboxCropWithDimensionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/bbox/{minx},{miny},{maxx},{maxy}/{width}x{height}.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,algorithm,algorithm_params,coord_crs,dst_crs,max_size,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask}",
    {
      searchId: searchId,
      minx: minx,
      miny: miny,
      maxx: maxx,
      maxy: maxy,
      width: width,
      height: height,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      coord_crs: options?.coordinateReferenceSystem,
      dst_crs: options?.destinationCrs,
      max_size: options?.maxSize,
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getSearchBboxCropWithDimensionsDeserialize(
  result: PathUncheckedResponse & DataGetSearchBboxCropWithDimensionsResponse,
): Promise<DataGetSearchBboxCropWithDimensionsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create an image from part of a dataset (bounding box crop with dimensions). */
export async function getSearchBboxCropWithDimensions(
  context: Client,
  searchId: string,
  minx: number,
  miny: number,
  maxx: number,
  maxy: number,
  width: number,
  height: number,
  format: string,
  options: DataGetSearchBboxCropWithDimensionsOptionalParams = { requestOptions: {} },
): Promise<DataGetSearchBboxCropWithDimensionsResponse> {
  const streamableMethod = _getSearchBboxCropWithDimensionsSend(
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
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getSearchBboxCropWithDimensionsDeserialize(result);
}

export function _getSearchBboxCropSend(
  context: Client,
  searchId: string,
  minx: number,
  miny: number,
  maxx: number,
  maxy: number,
  format: string,
  options: DataGetSearchBboxCropOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/bbox/{minx},{miny},{maxx},{maxy}.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,algorithm,algorithm_params,coord_crs,dst_crs,max_size,height,width,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask}",
    {
      searchId: searchId,
      minx: minx,
      miny: miny,
      maxx: maxx,
      maxy: maxy,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      coord_crs: options?.coordinateReferenceSystem,
      dst_crs: options?.destinationCrs,
      max_size: options?.maxSize,
      height: options?.height,
      width: options?.width,
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getSearchBboxCropDeserialize(
  result: PathUncheckedResponse & DataGetSearchBboxCropResponse,
): Promise<DataGetSearchBboxCropResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create an image from part of a dataset (bounding box crop). */
export async function getSearchBboxCrop(
  context: Client,
  searchId: string,
  minx: number,
  miny: number,
  maxx: number,
  maxy: number,
  format: string,
  options: DataGetSearchBboxCropOptionalParams = { requestOptions: {} },
): Promise<DataGetSearchBboxCropResponse> {
  const streamableMethod = _getSearchBboxCropSend(
    context,
    searchId,
    minx,
    miny,
    maxx,
    maxy,
    format,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getSearchBboxCropDeserialize(result);
}

export function _getSearchInfoSend(
  context: Client,
  searchId: string,
  options: DataGetSearchInfoOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/info{?api%2Dversion}",
    {
      searchId: searchId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSearchInfoDeserialize(
  result: PathUncheckedResponse,
): Promise<TilerStacSearchRegistration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tilerStacSearchRegistrationDeserializer(result.body);
}

/** Get Search query metadata. */
export async function getSearchInfo(
  context: Client,
  searchId: string,
  options: DataGetSearchInfoOptionalParams = { requestOptions: {} },
): Promise<TilerStacSearchRegistration> {
  const result = await _getSearchInfoSend(context, searchId, options);
  return _getSearchInfoDeserialize(result);
}

export function _getSearchWmtsCapabilitiesByTmsSend(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  options: DataGetSearchWmtsCapabilitiesByTmsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/{tileMatrixSetId}/WMTSCapabilities.xml{?api%2Dversion,tile_format,tile_scale,minzoom,maxzoom,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject}",
    {
      searchId: searchId,
      tileMatrixSetId: tileMatrixSetId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      tile_format: options?.tileFormat,
      tile_scale: options?.tileScale,
      minzoom: options?.minZoom,
      maxzoom: options?.maxZoom,
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/xml", ...options.requestOptions?.headers },
  });
}

export async function _getSearchWmtsCapabilitiesByTmsDeserialize(
  result: PathUncheckedResponse,
): Promise<DataGetSearchWmtsCapabilitiesByTmsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    body: typeof result.body === "string" ? stringToUint8Array(result.body, "base64") : result.body,
  };
}

/** OGC WMTS endpoint with TileMatrixSetId as path. */
export async function getSearchWmtsCapabilitiesByTms(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  options: DataGetSearchWmtsCapabilitiesByTmsOptionalParams = { requestOptions: {} },
): Promise<DataGetSearchWmtsCapabilitiesByTmsResponse> {
  const result = await _getSearchWmtsCapabilitiesByTmsSend(
    context,
    searchId,
    tileMatrixSetId,
    options,
  );
  return _getSearchWmtsCapabilitiesByTmsDeserialize(result);
}

export function _getSearchTileJsonByTmsSend(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  options: DataGetSearchTileJsonByTmsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/{tileMatrixSetId}/tilejson.json{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,algorithm,algorithm_params,minzoom,maxzoom,tile_format,tile_scale,buffer,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,padding}",
    {
      searchId: searchId,
      tileMatrixSetId: tileMatrixSetId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
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
      padding: options?.padding,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSearchTileJsonByTmsDeserialize(
  result: PathUncheckedResponse,
): Promise<TileJsonMetadata> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tileJsonMetadataDeserializer(result.body);
}

/** Return TileJSON document for a search with TileMatrixSetId as path. */
export async function getSearchTileJsonByTms(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  options: DataGetSearchTileJsonByTmsOptionalParams = { requestOptions: {} },
): Promise<TileJsonMetadata> {
  const result = await _getSearchTileJsonByTmsSend(context, searchId, tileMatrixSetId, options);
  return _getSearchTileJsonByTmsDeserialize(result);
}

export function _getSearchAssetsForTileSend(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  collectionId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetSearchAssetsForTileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}/assets{?api%2Dversion,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,collection}",
    {
      searchId: searchId,
      tileMatrixSetId: tileMatrixSetId,
      z: z,
      x: x,
      y: y,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      collection: collectionId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSearchAssetsForTileDeserialize(
  result: PathUncheckedResponse,
): Promise<TilerAssetGeoJson[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tilerAssetGeoJsonArrayDeserializer(result.body);
}

/** Return a list of assets which overlap a given tile. */
export async function getSearchAssetsForTile(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  collectionId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetSearchAssetsForTileOptionalParams = { requestOptions: {} },
): Promise<TilerAssetGeoJson[]> {
  const result = await _getSearchAssetsForTileSend(
    context,
    searchId,
    tileMatrixSetId,
    collectionId,
    z,
    x,
    y,
    options,
  );
  return _getSearchAssetsForTileDeserialize(result);
}

export function _getSearchTileByScaleSend(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  options: DataGetSearchTileByScaleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}@{scale}x{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,algorithm,algorithm_params,format,buffer,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,padding}",
    {
      searchId: searchId,
      tileMatrixSetId: tileMatrixSetId,
      z: z,
      x: x,
      y: y,
      scale: scale,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      format: options?.format,
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
      padding: options?.padding,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getSearchTileByScaleDeserialize(
  result: PathUncheckedResponse & DataGetSearchTileByScaleResponse,
): Promise<DataGetSearchTileByScaleResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create map tile (with TileMatrixSetId and scale, without format). */
export async function getSearchTileByScale(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  options: DataGetSearchTileByScaleOptionalParams = { requestOptions: {} },
): Promise<DataGetSearchTileByScaleResponse> {
  const streamableMethod = _getSearchTileByScaleSend(
    context,
    searchId,
    tileMatrixSetId,
    z,
    x,
    y,
    scale,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getSearchTileByScaleDeserialize(result);
}

export function _getSearchTileByFormatSend(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  format: string,
  options: DataGetSearchTileByFormatOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,algorithm,algorithm_params,scale,buffer,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,padding}",
    {
      searchId: searchId,
      tileMatrixSetId: tileMatrixSetId,
      z: z,
      x: x,
      y: y,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      scale: options?.scale,
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
      padding: options?.padding,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getSearchTileByFormatDeserialize(
  result: PathUncheckedResponse & DataGetSearchTileByFormatResponse,
): Promise<DataGetSearchTileByFormatResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create map tile (with TileMatrixSetId and format, without scale). */
export async function getSearchTileByFormat(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  format: string,
  options: DataGetSearchTileByFormatOptionalParams = { requestOptions: {} },
): Promise<DataGetSearchTileByFormatResponse> {
  const streamableMethod = _getSearchTileByFormatSend(
    context,
    searchId,
    tileMatrixSetId,
    z,
    x,
    y,
    format,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getSearchTileByFormatDeserialize(result);
}

export function _getSearchTileSend(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetSearchTileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,algorithm,algorithm_params,format,scale,buffer,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,padding}",
    {
      searchId: searchId,
      tileMatrixSetId: tileMatrixSetId,
      z: z,
      x: x,
      y: y,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      format: options?.format,
      scale: options?.scale,
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
      padding: options?.padding,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getSearchTileDeserialize(
  result: PathUncheckedResponse & DataGetSearchTileResponse,
): Promise<DataGetSearchTileResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create map tile (with TileMatrixSetId, without scale or format). */
export async function getSearchTile(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetSearchTileOptionalParams = { requestOptions: {} },
): Promise<DataGetSearchTileResponse> {
  const streamableMethod = _getSearchTileSend(context, searchId, tileMatrixSetId, z, x, y, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getSearchTileDeserialize(result);
}

export function _getSearchTileByScaleAndFormatSend(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  format: string,
  options: DataGetSearchTileByScaleAndFormatOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}@{scale}x.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,algorithm,algorithm_params,buffer,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,padding}",
    {
      searchId: searchId,
      tileMatrixSetId: tileMatrixSetId,
      z: z,
      x: x,
      y: y,
      scale: scale,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
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
      padding: options?.padding,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getSearchTileByScaleAndFormatDeserialize(
  result: PathUncheckedResponse & DataGetSearchTileByScaleAndFormatResponse,
): Promise<DataGetSearchTileByScaleAndFormatResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create map tile (with TileMatrixSetId, scale, and format in path). */
export async function getSearchTileByScaleAndFormat(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  format: string,
  options: DataGetSearchTileByScaleAndFormatOptionalParams = { requestOptions: {} },
): Promise<DataGetSearchTileByScaleAndFormatResponse> {
  const streamableMethod = _getSearchTileByScaleAndFormatSend(
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
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getSearchTileByScaleAndFormatDeserialize(result);
}

export function _getSearchTilesetMetadataSend(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  options: DataGetSearchTilesetMetadataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/tiles/{tileMatrixSetId}{?api%2Dversion,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      searchId: searchId,
      tileMatrixSetId: tileMatrixSetId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSearchTilesetMetadataDeserialize(
  result: PathUncheckedResponse,
): Promise<TileSetMetadata> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tileSetMetadataDeserializer(result.body);
}

/** Return metadata for a specific tileset of a mosaic search. */
export async function getSearchTilesetMetadata(
  context: Client,
  searchId: string,
  tileMatrixSetId: string,
  options: DataGetSearchTilesetMetadataOptionalParams = { requestOptions: {} },
): Promise<TileSetMetadata> {
  const result = await _getSearchTilesetMetadataSend(context, searchId, tileMatrixSetId, options);
  return _getSearchTilesetMetadataDeserialize(result);
}

export function _getSearchTilesetsSend(
  context: Client,
  searchId: string,
  options: DataGetSearchTilesetsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/searches/{searchId}/tiles{?api%2Dversion,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      searchId: searchId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSearchTilesetsDeserialize(
  result: PathUncheckedResponse,
): Promise<TileSetList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tileSetListDeserializer(result.body);
}

/** Return a list of available tilesets for a mosaic search. */
export async function getSearchTilesets(
  context: Client,
  searchId: string,
  options: DataGetSearchTilesetsOptionalParams = { requestOptions: {} },
): Promise<TileSetList> {
  const result = await _getSearchTilesetsSend(context, searchId, options);
  return _getSearchTilesetsDeserialize(result);
}

export function _getCollectionPointAssetsSend(
  context: Client,
  collectionId: string,
  longitude: number,
  latitude: number,
  options: DataGetCollectionPointAssetsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/point/{longitude},{latitude}/assets{?api%2Dversion,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method,coord_crs}",
    {
      collectionId: collectionId,
      longitude: longitude,
      latitude: latitude,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      coord_crs: options?.coordinateReferenceSystem,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getCollectionPointAssetsDeserialize(
  result: PathUncheckedResponse,
): Promise<StacItemPointAsset[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacItemPointAssetArrayDeserializer(result.body);
}

/** Return a list of assets for a given point in a collection. */
export async function getCollectionPointAssets(
  context: Client,
  collectionId: string,
  longitude: number,
  latitude: number,
  options: DataGetCollectionPointAssetsOptionalParams = { requestOptions: {} },
): Promise<StacItemPointAsset[]> {
  const result = await _getCollectionPointAssetsSend(
    context,
    collectionId,
    longitude,
    latitude,
    options,
  );
  return _getCollectionPointAssetsDeserialize(result);
}

export function _getCollectionPointSend(
  context: Client,
  collectionId: string,
  longitude: number,
  latitude: number,
  options: DataGetCollectionPointOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/point/{longitude},{latitude}{?api%2Dversion,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,coord_crs,resampling}",
    {
      collectionId: collectionId,
      longitude: longitude,
      latitude: latitude,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      coord_crs: options?.coordinateReferenceSystem,
      resampling: options?.resampling,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getCollectionPointDeserialize(
  result: PathUncheckedResponse,
): Promise<TilerCoreModelsResponsesPoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tilerCoreModelsResponsesPointDeserializer(result.body);
}

/** Get Point value for a collection dataset. */
export async function getCollectionPoint(
  context: Client,
  collectionId: string,
  longitude: number,
  latitude: number,
  options: DataGetCollectionPointOptionalParams = { requestOptions: {} },
): Promise<TilerCoreModelsResponsesPoint> {
  const result = await _getCollectionPointSend(context, collectionId, longitude, latitude, options);
  return _getCollectionPointDeserialize(result);
}

export function _cropCollectionFeatureWidthByHeightSend(
  context: Client,
  collectionId: string,
  width: number,
  height: number,
  format: string,
  body: Feature,
  options: DataCropCollectionFeatureWidthByHeightOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/feature/{width}x{height}.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method,algorithm,algorithm_params,coord_crs,max_size,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,dst_crs}",
    {
      collectionId: collectionId,
      width: width,
      height: height,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      coord_crs: options?.coordinateReferenceSystem,
      max_size: options?.maxSize,
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
      dst_crs: options?.destinationCrs,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
    body: featureSerializer(body),
  });
}

export async function _cropCollectionFeatureWidthByHeightDeserialize(
  result: PathUncheckedResponse & DataCropCollectionFeatureWidthByHeightResponse,
): Promise<DataCropCollectionFeatureWidthByHeightResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create image from a geojson feature with dimensions. */
export async function cropCollectionFeatureWidthByHeight(
  context: Client,
  collectionId: string,
  width: number,
  height: number,
  format: string,
  body: Feature,
  options: DataCropCollectionFeatureWidthByHeightOptionalParams = { requestOptions: {} },
): Promise<DataCropCollectionFeatureWidthByHeightResponse> {
  const streamableMethod = _cropCollectionFeatureWidthByHeightSend(
    context,
    collectionId,
    width,
    height,
    format,
    body,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _cropCollectionFeatureWidthByHeightDeserialize(result);
}

export function _cropCollectionFeatureByFormatSend(
  context: Client,
  collectionId: string,
  format: string,
  body: Feature,
  options: DataCropCollectionFeatureByFormatOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/feature.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method,algorithm,algorithm_params,coord_crs,max_size,height,width,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,dst_crs}",
    {
      collectionId: collectionId,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      coord_crs: options?.coordinateReferenceSystem,
      max_size: options?.maxSize,
      height: options?.height,
      width: options?.width,
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
      dst_crs: options?.destinationCrs,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
    body: featureSerializer(body),
  });
}

export async function _cropCollectionFeatureByFormatDeserialize(
  result: PathUncheckedResponse & DataCropCollectionFeatureByFormatResponse,
): Promise<DataCropCollectionFeatureByFormatResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create image from a geojson feature with format. */
export async function cropCollectionFeatureByFormat(
  context: Client,
  collectionId: string,
  format: string,
  body: Feature,
  options: DataCropCollectionFeatureByFormatOptionalParams = { requestOptions: {} },
): Promise<DataCropCollectionFeatureByFormatResponse> {
  const streamableMethod = _cropCollectionFeatureByFormatSend(
    context,
    collectionId,
    format,
    body,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _cropCollectionFeatureByFormatDeserialize(result);
}

export function _cropCollectionFeatureSend(
  context: Client,
  collectionId: string,
  body: Feature,
  options: DataCropCollectionFeatureOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/feature{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method,algorithm,algorithm_params,coord_crs,max_size,height,width,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,dst_crs,format}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      coord_crs: options?.coordinateReferenceSystem,
      max_size: options?.maxSize,
      height: options?.height,
      width: options?.width,
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
      dst_crs: options?.destinationCrs,
      format: options?.format,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
    body: featureSerializer(body),
  });
}

export async function _cropCollectionFeatureDeserialize(
  result: PathUncheckedResponse & DataCropCollectionFeatureResponse,
): Promise<DataCropCollectionFeatureResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create image from a geojson feature (without format in path). */
export async function cropCollectionFeature(
  context: Client,
  collectionId: string,
  body: Feature,
  options: DataCropCollectionFeatureOptionalParams = { requestOptions: {} },
): Promise<DataCropCollectionFeatureResponse> {
  const streamableMethod = _cropCollectionFeatureSend(context, collectionId, body, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _cropCollectionFeatureDeserialize(result);
}

export function _getCollectionBboxCropWithDimensionsSend(
  context: Client,
  collectionId: string,
  minx: number,
  miny: number,
  maxx: number,
  maxy: number,
  width: number,
  height: number,
  format: string,
  options: DataGetCollectionBboxCropWithDimensionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/bbox/{minx},{miny},{maxx},{maxy}/{width}x{height}.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method,algorithm,algorithm_params,coord_crs,dst_crs,max_size,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask}",
    {
      collectionId: collectionId,
      minx: minx,
      miny: miny,
      maxx: maxx,
      maxy: maxy,
      width: width,
      height: height,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      coord_crs: options?.coordinateReferenceSystem,
      dst_crs: options?.destinationCrs,
      max_size: options?.maxSize,
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getCollectionBboxCropWithDimensionsDeserialize(
  result: PathUncheckedResponse & DataGetCollectionBboxCropWithDimensionsResponse,
): Promise<DataGetCollectionBboxCropWithDimensionsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create an image from part of a STAC collection dataset (bounding box crop with dimensions). */
export async function getCollectionBboxCropWithDimensions(
  context: Client,
  collectionId: string,
  minx: number,
  miny: number,
  maxx: number,
  maxy: number,
  width: number,
  height: number,
  format: string,
  options: DataGetCollectionBboxCropWithDimensionsOptionalParams = { requestOptions: {} },
): Promise<DataGetCollectionBboxCropWithDimensionsResponse> {
  const streamableMethod = _getCollectionBboxCropWithDimensionsSend(
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
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getCollectionBboxCropWithDimensionsDeserialize(result);
}

export function _getCollectionBboxCropSend(
  context: Client,
  collectionId: string,
  minx: number,
  miny: number,
  maxx: number,
  maxy: number,
  format: string,
  options: DataGetCollectionBboxCropOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/bbox/{minx},{miny},{maxx},{maxy}.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method,algorithm,algorithm_params,coord_crs,dst_crs,max_size,height,width,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask}",
    {
      collectionId: collectionId,
      minx: minx,
      miny: miny,
      maxx: maxx,
      maxy: maxy,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      coord_crs: options?.coordinateReferenceSystem,
      dst_crs: options?.destinationCrs,
      max_size: options?.maxSize,
      height: options?.height,
      width: options?.width,
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getCollectionBboxCropDeserialize(
  result: PathUncheckedResponse & DataGetCollectionBboxCropResponse,
): Promise<DataGetCollectionBboxCropResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create an image from part of a STAC collection dataset (bounding box crop). */
export async function getCollectionBboxCrop(
  context: Client,
  collectionId: string,
  minx: number,
  miny: number,
  maxx: number,
  maxy: number,
  format: string,
  options: DataGetCollectionBboxCropOptionalParams = { requestOptions: {} },
): Promise<DataGetCollectionBboxCropResponse> {
  const streamableMethod = _getCollectionBboxCropSend(
    context,
    collectionId,
    minx,
    miny,
    maxx,
    maxy,
    format,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getCollectionBboxCropDeserialize(result);
}

export function _getCollectionInfoSend(
  context: Client,
  collectionId: string,
  options: DataGetCollectionInfoOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/info{?api%2Dversion}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getCollectionInfoDeserialize(
  result: PathUncheckedResponse,
): Promise<TilerStacSearchRegistration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tilerStacSearchRegistrationDeserializer(result.body);
}

/** Return search query info from a STAC collection identifier. */
export async function getCollectionInfo(
  context: Client,
  collectionId: string,
  options: DataGetCollectionInfoOptionalParams = { requestOptions: {} },
): Promise<TilerStacSearchRegistration> {
  const result = await _getCollectionInfoSend(context, collectionId, options);
  return _getCollectionInfoDeserialize(result);
}

export function _getCollectionAssetsForBboxSend(
  context: Client,
  collectionId: string,
  minx: number,
  miny: number,
  maxx: number,
  maxy: number,
  options: DataGetCollectionAssetsForBboxOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/bbox/{minx},{miny},{maxx},{maxy}/assets{?api%2Dversion,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method,coord_crs}",
    {
      collectionId: collectionId,
      minx: minx,
      miny: miny,
      maxx: maxx,
      maxy: maxy,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      coord_crs: options?.coordinateReferenceSystem,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getCollectionAssetsForBboxDeserialize(
  result: PathUncheckedResponse,
): Promise<DataGetCollectionAssetsForBboxResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    body: result.body.map((p: any) => {
      return p;
    }),
  };
}

/** Return a list of assets which overlap a given bounding box for a STAC collection. */
export async function getCollectionAssetsForBbox(
  context: Client,
  collectionId: string,
  minx: number,
  miny: number,
  maxx: number,
  maxy: number,
  options: DataGetCollectionAssetsForBboxOptionalParams = { requestOptions: {} },
): Promise<DataGetCollectionAssetsForBboxResponse> {
  const result = await _getCollectionAssetsForBboxSend(
    context,
    collectionId,
    minx,
    miny,
    maxx,
    maxy,
    options,
  );
  return _getCollectionAssetsForBboxDeserialize(result);
}

export function _getCollectionAssetsForTileNoTmsSend(
  context: Client,
  collectionId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetCollectionAssetsForTileNoTmsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/tiles/{z}/{x}/{y}/assets{?api%2Dversion,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method,TileMatrixSetId}",
    {
      collectionId: collectionId,
      z: z,
      x: x,
      y: y,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      TileMatrixSetId: options?.tileMatrixSetId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getCollectionAssetsForTileNoTmsDeserialize(
  result: PathUncheckedResponse,
): Promise<DataGetCollectionAssetsForTileNoTmsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    body: result.body.map((p: any) => {
      return p;
    }),
  };
}

/** Return assets overlapping a tile for a collection using the route without TileMatrixSetId in the path (/tiles/{z}/{x}/{y}/assets). This operation uses the default tile matrix set when none is specified. */
export async function getCollectionAssetsForTileNoTms(
  context: Client,
  collectionId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetCollectionAssetsForTileNoTmsOptionalParams = { requestOptions: {} },
): Promise<DataGetCollectionAssetsForTileNoTmsResponse> {
  const result = await _getCollectionAssetsForTileNoTmsSend(
    context,
    collectionId,
    z,
    x,
    y,
    options,
  );
  return _getCollectionAssetsForTileNoTmsDeserialize(result);
}

export function _getCollectionAssetsForTileSend(
  context: Client,
  collectionId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetCollectionAssetsForTileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}/assets{?api%2Dversion,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method}",
    {
      collectionId: collectionId,
      tileMatrixSetId: tileMatrixSetId,
      z: z,
      x: x,
      y: y,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getCollectionAssetsForTileDeserialize(
  result: PathUncheckedResponse,
): Promise<TilerAssetGeoJson[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tilerAssetGeoJsonArrayDeserializer(result.body);
}

/** Return assets overlapping a tile for a collection using the route with TileMatrixSetId in the path (/tiles/{tileMatrixSetId}/{z}/{x}/{y}/assets). Use this operation when you need an explicit tile matrix set in the URL. */
export async function getCollectionAssetsForTile(
  context: Client,
  collectionId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetCollectionAssetsForTileOptionalParams = { requestOptions: {} },
): Promise<TilerAssetGeoJson[]> {
  const result = await _getCollectionAssetsForTileSend(
    context,
    collectionId,
    tileMatrixSetId,
    z,
    x,
    y,
    options,
  );
  return _getCollectionAssetsForTileDeserialize(result);
}

export function _getCollectionWmtsCapabilitiesByTmsSend(
  context: Client,
  collectionId: string,
  tileMatrixSetId: string,
  options: DataGetCollectionWmtsCapabilitiesByTmsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/{tileMatrixSetId}/WMTSCapabilities.xml{?api%2Dversion,ids,bbox,query,sortby,datetime,tile_format,tile_scale,minzoom,maxzoom,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject}",
    {
      collectionId: collectionId,
      tileMatrixSetId: tileMatrixSetId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      tile_format: options?.tileFormat,
      tile_scale: options?.tileScale,
      minzoom: options?.minZoom,
      maxzoom: options?.maxZoom,
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/xml", ...options.requestOptions?.headers },
  });
}

export async function _getCollectionWmtsCapabilitiesByTmsDeserialize(
  result: PathUncheckedResponse,
): Promise<DataGetCollectionWmtsCapabilitiesByTmsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    body: typeof result.body === "string" ? stringToUint8Array(result.body, "base64") : result.body,
  };
}

/** OGC WMTS endpoint for a STAC collection with TileMatrixSetId as path. */
export async function getCollectionWmtsCapabilitiesByTms(
  context: Client,
  collectionId: string,
  tileMatrixSetId: string,
  options: DataGetCollectionWmtsCapabilitiesByTmsOptionalParams = { requestOptions: {} },
): Promise<DataGetCollectionWmtsCapabilitiesByTmsResponse> {
  const result = await _getCollectionWmtsCapabilitiesByTmsSend(
    context,
    collectionId,
    tileMatrixSetId,
    options,
  );
  return _getCollectionWmtsCapabilitiesByTmsDeserialize(result);
}

export function _getCollectionWmtsCapabilitiesSend(
  context: Client,
  collectionId: string,
  options: DataGetCollectionWmtsCapabilitiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/WMTSCapabilities.xml{?api%2Dversion,ids,bbox,query,sortby,datetime,TileMatrixSetId,tile_format,tile_scale,minzoom,maxzoom,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      TileMatrixSetId: options?.tileMatrixSetId,
      tile_format: options?.tileFormat,
      tile_scale: options?.tileScale,
      minzoom: options?.minZoom,
      maxzoom: options?.maxZoom,
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/xml", ...options.requestOptions?.headers },
  });
}

export async function _getCollectionWmtsCapabilitiesDeserialize(
  result: PathUncheckedResponse,
): Promise<DataGetCollectionWmtsCapabilitiesResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    body: typeof result.body === "string" ? stringToUint8Array(result.body, "base64") : result.body,
  };
}

/** OGC WMTS endpoint for a STAC collection. */
export async function getCollectionWmtsCapabilities(
  context: Client,
  collectionId: string,
  options: DataGetCollectionWmtsCapabilitiesOptionalParams = { requestOptions: {} },
): Promise<DataGetCollectionWmtsCapabilitiesResponse> {
  const result = await _getCollectionWmtsCapabilitiesSend(context, collectionId, options);
  return _getCollectionWmtsCapabilitiesDeserialize(result);
}

export function _getCollectionTileJsonByTmsSend(
  context: Client,
  collectionId: string,
  tileMatrixSetId: string,
  options: DataGetCollectionTileJsonByTmsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/{tileMatrixSetId}/tilejson.json{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method,algorithm,algorithm_params,tile_format,tile_scale,minzoom,maxzoom,buffer,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,padding}",
    {
      collectionId: collectionId,
      tileMatrixSetId: tileMatrixSetId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      tile_format: options?.tileFormat,
      tile_scale: options?.tileScale,
      minzoom: options?.minZoom,
      maxzoom: options?.maxZoom,
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
      padding: options?.padding,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getCollectionTileJsonByTmsDeserialize(
  result: PathUncheckedResponse,
): Promise<TileJsonMetadata> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tileJsonMetadataDeserializer(result.body);
}

/** Return TileJSON document for a STAC collection with TileMatrixSetId as path. */
export async function getCollectionTileJsonByTms(
  context: Client,
  collectionId: string,
  tileMatrixSetId: string,
  options: DataGetCollectionTileJsonByTmsOptionalParams = { requestOptions: {} },
): Promise<TileJsonMetadata> {
  const result = await _getCollectionTileJsonByTmsSend(
    context,
    collectionId,
    tileMatrixSetId,
    options,
  );
  return _getCollectionTileJsonByTmsDeserialize(result);
}

export function _getCollectionTileJsonSend(
  context: Client,
  collectionId: string,
  options: DataGetCollectionTileJsonOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/tilejson.json{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method,algorithm,algorithm_params,TileMatrixSetId,tile_format,tile_scale,minzoom,maxzoom,buffer,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,padding}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      TileMatrixSetId: options?.tileMatrixSetId,
      tile_format: options?.tileFormat,
      tile_scale: options?.tileScale,
      minzoom: options?.minZoom,
      maxzoom: options?.maxZoom,
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
      padding: options?.padding,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getCollectionTileJsonDeserialize(
  result: PathUncheckedResponse,
): Promise<TileJsonMetadata> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tileJsonMetadataDeserializer(result.body);
}

/** Return TileJSON document for a STAC collection. */
export async function getCollectionTileJson(
  context: Client,
  collectionId: string,
  options: DataGetCollectionTileJsonOptionalParams = { requestOptions: {} },
): Promise<TileJsonMetadata> {
  const result = await _getCollectionTileJsonSend(context, collectionId, options);
  return _getCollectionTileJsonDeserialize(result);
}

export function _getCollectionTileNoTmsByScaleSend(
  context: Client,
  collectionId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  options: DataGetCollectionTileNoTmsByScaleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/tiles/{z}/{x}/{y}@{scale}x{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method,algorithm,algorithm_params,TileMatrixSetId,format,buffer,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,padding}",
    {
      collectionId: collectionId,
      z: z,
      x: x,
      y: y,
      scale: scale,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      TileMatrixSetId: options?.tileMatrixSetId,
      format: options?.format,
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
      padding: options?.padding,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getCollectionTileNoTmsByScaleDeserialize(
  result: PathUncheckedResponse & DataGetCollectionTileNoTmsByScaleResponse,
): Promise<DataGetCollectionTileNoTmsByScaleResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create map tile for a STAC collection (with scale, without TileMatrixSetId or format). */
export async function getCollectionTileNoTmsByScale(
  context: Client,
  collectionId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  options: DataGetCollectionTileNoTmsByScaleOptionalParams = { requestOptions: {} },
): Promise<DataGetCollectionTileNoTmsByScaleResponse> {
  const streamableMethod = _getCollectionTileNoTmsByScaleSend(
    context,
    collectionId,
    z,
    x,
    y,
    scale,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getCollectionTileNoTmsByScaleDeserialize(result);
}

export function _getCollectionTileNoTmsByFormatSend(
  context: Client,
  collectionId: string,
  z: number,
  x: number,
  y: number,
  format: string,
  options: DataGetCollectionTileNoTmsByFormatOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/tiles/{z}/{x}/{y}.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method,algorithm,algorithm_params,TileMatrixSetId,scale,buffer,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,padding}",
    {
      collectionId: collectionId,
      z: z,
      x: x,
      y: y,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      TileMatrixSetId: options?.tileMatrixSetId,
      scale: options?.scale,
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
      padding: options?.padding,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getCollectionTileNoTmsByFormatDeserialize(
  result: PathUncheckedResponse & DataGetCollectionTileNoTmsByFormatResponse,
): Promise<DataGetCollectionTileNoTmsByFormatResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create map tile for a STAC collection (with format, without TileMatrixSetId or scale). */
export async function getCollectionTileNoTmsByFormat(
  context: Client,
  collectionId: string,
  z: number,
  x: number,
  y: number,
  format: string,
  options: DataGetCollectionTileNoTmsByFormatOptionalParams = { requestOptions: {} },
): Promise<DataGetCollectionTileNoTmsByFormatResponse> {
  const streamableMethod = _getCollectionTileNoTmsByFormatSend(
    context,
    collectionId,
    z,
    x,
    y,
    format,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getCollectionTileNoTmsByFormatDeserialize(result);
}

export function _getCollectionTileNoTmsSend(
  context: Client,
  collectionId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetCollectionTileNoTmsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/tiles/{z}/{x}/{y}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method,algorithm,algorithm_params,TileMatrixSetId,format,scale,buffer,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,padding}",
    {
      collectionId: collectionId,
      z: z,
      x: x,
      y: y,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      TileMatrixSetId: options?.tileMatrixSetId,
      format: options?.format,
      scale: options?.scale,
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
      padding: options?.padding,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getCollectionTileNoTmsDeserialize(
  result: PathUncheckedResponse & DataGetCollectionTileNoTmsResponse,
): Promise<DataGetCollectionTileNoTmsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create map tile for a STAC collection (without TileMatrixSetId, scale, or format). */
export async function getCollectionTileNoTms(
  context: Client,
  collectionId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetCollectionTileNoTmsOptionalParams = { requestOptions: {} },
): Promise<DataGetCollectionTileNoTmsResponse> {
  const streamableMethod = _getCollectionTileNoTmsSend(context, collectionId, z, x, y, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getCollectionTileNoTmsDeserialize(result);
}

export function _getCollectionTileNoTmsByScaleAndFormatSend(
  context: Client,
  collectionId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  format: string,
  options: DataGetCollectionTileNoTmsByScaleAndFormatOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/tiles/{z}/{x}/{y}@{scale}x.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method,algorithm,algorithm_params,TileMatrixSetId,buffer,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,padding}",
    {
      collectionId: collectionId,
      z: z,
      x: x,
      y: y,
      scale: scale,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      TileMatrixSetId: options?.tileMatrixSetId,
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
      padding: options?.padding,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getCollectionTileNoTmsByScaleAndFormatDeserialize(
  result: PathUncheckedResponse & DataGetCollectionTileNoTmsByScaleAndFormatResponse,
): Promise<DataGetCollectionTileNoTmsByScaleAndFormatResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create map tile for a STAC collection (without TileMatrixSetId, with scale and format). */
export async function getCollectionTileNoTmsByScaleAndFormat(
  context: Client,
  collectionId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  format: string,
  options: DataGetCollectionTileNoTmsByScaleAndFormatOptionalParams = { requestOptions: {} },
): Promise<DataGetCollectionTileNoTmsByScaleAndFormatResponse> {
  const streamableMethod = _getCollectionTileNoTmsByScaleAndFormatSend(
    context,
    collectionId,
    z,
    x,
    y,
    scale,
    format,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getCollectionTileNoTmsByScaleAndFormatDeserialize(result);
}

export function _getCollectionTileByScaleSend(
  context: Client,
  collectionId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  options: DataGetCollectionTileByScaleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}@{scale}x{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method,algorithm,algorithm_params,format,buffer,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,padding}",
    {
      collectionId: collectionId,
      tileMatrixSetId: tileMatrixSetId,
      z: z,
      x: x,
      y: y,
      scale: scale,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      format: options?.format,
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
      padding: options?.padding,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getCollectionTileByScaleDeserialize(
  result: PathUncheckedResponse & DataGetCollectionTileByScaleResponse,
): Promise<DataGetCollectionTileByScaleResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create map tile for a STAC collection (with TileMatrixSetId and scale, without format). */
export async function getCollectionTileByScale(
  context: Client,
  collectionId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  options: DataGetCollectionTileByScaleOptionalParams = { requestOptions: {} },
): Promise<DataGetCollectionTileByScaleResponse> {
  const streamableMethod = _getCollectionTileByScaleSend(
    context,
    collectionId,
    tileMatrixSetId,
    z,
    x,
    y,
    scale,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getCollectionTileByScaleDeserialize(result);
}

export function _getCollectionTileByFormatSend(
  context: Client,
  collectionId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  format: string,
  options: DataGetCollectionTileByFormatOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method,algorithm,algorithm_params,scale,buffer,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,padding}",
    {
      collectionId: collectionId,
      tileMatrixSetId: tileMatrixSetId,
      z: z,
      x: x,
      y: y,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      scale: options?.scale,
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
      padding: options?.padding,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getCollectionTileByFormatDeserialize(
  result: PathUncheckedResponse & DataGetCollectionTileByFormatResponse,
): Promise<DataGetCollectionTileByFormatResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create map tile for a STAC collection (with TileMatrixSetId and format, without scale). */
export async function getCollectionTileByFormat(
  context: Client,
  collectionId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  format: string,
  options: DataGetCollectionTileByFormatOptionalParams = { requestOptions: {} },
): Promise<DataGetCollectionTileByFormatResponse> {
  const streamableMethod = _getCollectionTileByFormatSend(
    context,
    collectionId,
    tileMatrixSetId,
    z,
    x,
    y,
    format,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getCollectionTileByFormatDeserialize(result);
}

export function _getCollectionTileSend(
  context: Client,
  collectionId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetCollectionTileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method,algorithm,algorithm_params,format,scale,buffer,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,padding}",
    {
      collectionId: collectionId,
      tileMatrixSetId: tileMatrixSetId,
      z: z,
      x: x,
      y: y,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      format: options?.format,
      scale: options?.scale,
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
      padding: options?.padding,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getCollectionTileDeserialize(
  result: PathUncheckedResponse & DataGetCollectionTileResponse,
): Promise<DataGetCollectionTileResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create map tile for a STAC collection (with TileMatrixSetId, without scale or format). */
export async function getCollectionTile(
  context: Client,
  collectionId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetCollectionTileOptionalParams = { requestOptions: {} },
): Promise<DataGetCollectionTileResponse> {
  const streamableMethod = _getCollectionTileSend(
    context,
    collectionId,
    tileMatrixSetId,
    z,
    x,
    y,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getCollectionTileDeserialize(result);
}

export function _getCollectionTileByScaleAndFormatSend(
  context: Client,
  collectionId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  format: string,
  options: DataGetCollectionTileByScaleAndFormatOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}@{scale}x.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,scan_limit,items_limit,time_limit,exitwhenfull,skipcovered,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method,algorithm,algorithm_params,buffer,color_formula,collection,resampling,pixel_selection,rescale*,colormap_name,colormap,return_mask,padding}",
    {
      collectionId: collectionId,
      tileMatrixSetId: tileMatrixSetId,
      z: z,
      x: x,
      y: y,
      scale: scale,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      scan_limit: options?.scanLimit,
      items_limit: options?.itemsLimit,
      time_limit: options?.timeLimit,
      exitwhenfull: options?.exitWhenFull,
      skipcovered: options?.skipCovered,
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
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
      padding: options?.padding,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getCollectionTileByScaleAndFormatDeserialize(
  result: PathUncheckedResponse & DataGetCollectionTileByScaleAndFormatResponse,
): Promise<DataGetCollectionTileByScaleAndFormatResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create map tile for a STAC collection (with TileMatrixSetId, scale, and format in path). */
export async function getCollectionTileByScaleAndFormat(
  context: Client,
  collectionId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  format: string,
  options: DataGetCollectionTileByScaleAndFormatOptionalParams = { requestOptions: {} },
): Promise<DataGetCollectionTileByScaleAndFormatResponse> {
  const streamableMethod = _getCollectionTileByScaleAndFormatSend(
    context,
    collectionId,
    tileMatrixSetId,
    z,
    x,
    y,
    scale,
    format,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getCollectionTileByScaleAndFormatDeserialize(result);
}

export function _getCollectionTilesetMetadataSend(
  context: Client,
  collectionId: string,
  tileMatrixSetId: string,
  options: DataGetCollectionTilesetMetadataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/tiles/{tileMatrixSetId}{?api%2Dversion,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method}",
    {
      collectionId: collectionId,
      tileMatrixSetId: tileMatrixSetId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getCollectionTilesetMetadataDeserialize(
  result: PathUncheckedResponse,
): Promise<TileSetMetadata> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tileSetMetadataDeserializer(result.body);
}

/** Return metadata for a specific tileset of a STAC collection. */
export async function getCollectionTilesetMetadata(
  context: Client,
  collectionId: string,
  tileMatrixSetId: string,
  options: DataGetCollectionTilesetMetadataOptionalParams = { requestOptions: {} },
): Promise<TileSetMetadata> {
  const result = await _getCollectionTilesetMetadataSend(
    context,
    collectionId,
    tileMatrixSetId,
    options,
  );
  return _getCollectionTilesetMetadataDeserialize(result);
}

export function _getCollectionTilesetsSend(
  context: Client,
  collectionId: string,
  options: DataGetCollectionTilesetsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/tiles{?api%2Dversion,ids,bbox,query,sortby,datetime,subdataset_name,subdataset_bands,crs,sel*,sel_method}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      ids: options?.ids,
      bbox: options?.bbox,
      query: options?.query,
      sortby: options?.sortby,
      datetime: options?.datetime,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getCollectionTilesetsDeserialize(
  result: PathUncheckedResponse,
): Promise<TileSetList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tileSetListDeserializer(result.body);
}

/** Return a list of available tilesets for a STAC collection. */
export async function getCollectionTilesets(
  context: Client,
  collectionId: string,
  options: DataGetCollectionTilesetsOptionalParams = { requestOptions: {} },
): Promise<TileSetList> {
  const result = await _getCollectionTilesetsSend(context, collectionId, options);
  return _getCollectionTilesetsDeserialize(result);
}

export function _getItemBboxCropWithDimensionsSend(
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
  options: DataGetItemBboxCropWithDimensionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/bbox/{minx},{miny},{maxx},{maxy}/{width}x{height}.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,algorithm,algorithm_params,color_formula,coord_crs,dst_crs,resampling,max_size,rescale*,colormap_name,colormap,return_mask,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
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
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      color_formula: options?.colorFormula,
      coord_crs: options?.coordinateReferenceSystem,
      dst_crs: options?.destinationCrs,
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
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getItemBboxCropWithDimensionsDeserialize(
  result: PathUncheckedResponse & DataGetItemBboxCropWithDimensionsResponse,
): Promise<DataGetItemBboxCropWithDimensionsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create an image from part of a STAC item dataset (bounding box crop with dimensions). */
export async function getItemBboxCropWithDimensions(
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
  options: DataGetItemBboxCropWithDimensionsOptionalParams = { requestOptions: {} },
): Promise<DataGetItemBboxCropWithDimensionsResponse> {
  const streamableMethod = _getItemBboxCropWithDimensionsSend(
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
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getItemBboxCropWithDimensionsDeserialize(result);
}

export function _getItemBboxCropSend(
  context: Client,
  collectionId: string,
  itemId: string,
  minx: number,
  miny: number,
  maxx: number,
  maxy: number,
  format: string,
  options: DataGetItemBboxCropOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/bbox/{minx},{miny},{maxx},{maxy}.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,algorithm,algorithm_params,color_formula,coord_crs,dst_crs,resampling,max_size,height,width,rescale*,colormap_name,colormap,return_mask,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      collectionId: collectionId,
      itemId: itemId,
      minx: minx,
      miny: miny,
      maxx: maxx,
      maxy: maxy,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      color_formula: options?.colorFormula,
      coord_crs: options?.coordinateReferenceSystem,
      dst_crs: options?.destinationCrs,
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
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getItemBboxCropDeserialize(
  result: PathUncheckedResponse & DataGetItemBboxCropResponse,
): Promise<DataGetItemBboxCropResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create an image from part of a STAC item dataset (bounding box crop). */
export async function getItemBboxCrop(
  context: Client,
  collectionId: string,
  itemId: string,
  minx: number,
  miny: number,
  maxx: number,
  maxy: number,
  format: string,
  options: DataGetItemBboxCropOptionalParams = { requestOptions: {} },
): Promise<DataGetItemBboxCropResponse> {
  const streamableMethod = _getItemBboxCropSend(
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
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getItemBboxCropDeserialize(result);
}

export function _getItemPreviewWithFormatSend(
  context: Client,
  collectionId: string,
  itemId: string,
  format: string,
  options: DataGetItemPreviewWithFormatOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/preview.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,algorithm,algorithm_params,color_formula,dst_crs,resampling,max_size,height,width,rescale*,colormap_name,colormap,return_mask,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      collectionId: collectionId,
      itemId: itemId,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      color_formula: options?.colorFormula,
      dst_crs: options?.dstCrs,
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
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getItemPreviewWithFormatDeserialize(
  result: PathUncheckedResponse & DataGetItemPreviewWithFormatResponse,
): Promise<DataGetItemPreviewWithFormatResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create preview of a STAC item dataset with format. */
export async function getItemPreviewWithFormat(
  context: Client,
  collectionId: string,
  itemId: string,
  format: string,
  options: DataGetItemPreviewWithFormatOptionalParams = { requestOptions: {} },
): Promise<DataGetItemPreviewWithFormatResponse> {
  const streamableMethod = _getItemPreviewWithFormatSend(
    context,
    collectionId,
    itemId,
    format,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getItemPreviewWithFormatDeserialize(result);
}

export function _getItemPreviewSend(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetItemPreviewOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/preview{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,algorithm,algorithm_params,format,color_formula,dst_crs,resampling,max_size,height,width,rescale*,colormap_name,colormap,return_mask,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      format: options?.format,
      color_formula: options?.colorFormula,
      dst_crs: options?.dstCrs,
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
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getItemPreviewDeserialize(
  result: PathUncheckedResponse & DataGetItemPreviewResponse,
): Promise<DataGetItemPreviewResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create preview of a STAC item dataset. */
export async function getItemPreview(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetItemPreviewOptionalParams = { requestOptions: {} },
): Promise<DataGetItemPreviewResponse> {
  const streamableMethod = _getItemPreviewSend(context, collectionId, itemId, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getItemPreviewDeserialize(result);
}

export function _getItemPointSend(
  context: Client,
  collectionId: string,
  itemId: string,
  longitude: number,
  latitude: number,
  options: DataGetItemPointOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/point/{longitude},{latitude}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,coord_crs,resampling}",
    {
      collectionId: collectionId,
      itemId: itemId,
      longitude: longitude,
      latitude: latitude,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      coord_crs: options?.coordinateReferenceSystem,
      resampling: options?.resampling,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getItemPointDeserialize(
  result: PathUncheckedResponse,
): Promise<TilerCoreModelsResponsesPoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tilerCoreModelsResponsesPointDeserializer(result.body);
}

/** Get point value for a STAC item dataset. */
export async function getItemPoint(
  context: Client,
  collectionId: string,
  itemId: string,
  longitude: number,
  latitude: number,
  options: DataGetItemPointOptionalParams = { requestOptions: {} },
): Promise<TilerCoreModelsResponsesPoint> {
  const result = await _getItemPointSend(
    context,
    collectionId,
    itemId,
    longitude,
    latitude,
    options,
  );
  return _getItemPointDeserialize(result);
}

export function _getItemWmtsCapabilitiesByTmsSend(
  context: Client,
  collectionId: string,
  itemId: string,
  tileMatrixSetId: string,
  options: DataGetItemWmtsCapabilitiesByTmsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/{tileMatrixSetId}/WMTSCapabilities.xml{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,algorithm,algorithm_params,tile_format,tile_scale,minzoom,maxzoom,buffer,color_formula,resampling,rescale*,colormap_name,colormap,return_mask,padding,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      collectionId: collectionId,
      itemId: itemId,
      tileMatrixSetId: tileMatrixSetId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
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
      padding: options?.padding,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/xml", ...options.requestOptions?.headers },
  });
}

export async function _getItemWmtsCapabilitiesByTmsDeserialize(
  result: PathUncheckedResponse,
): Promise<DataGetItemWmtsCapabilitiesByTmsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    body: typeof result.body === "string" ? stringToUint8Array(result.body, "base64") : result.body,
  };
}

/** OGC WMTS endpoint for a STAC item with TileMatrixSetId as path. */
export async function getItemWmtsCapabilitiesByTms(
  context: Client,
  collectionId: string,
  itemId: string,
  tileMatrixSetId: string,
  options: DataGetItemWmtsCapabilitiesByTmsOptionalParams = { requestOptions: {} },
): Promise<DataGetItemWmtsCapabilitiesByTmsResponse> {
  const result = await _getItemWmtsCapabilitiesByTmsSend(
    context,
    collectionId,
    itemId,
    tileMatrixSetId,
    options,
  );
  return _getItemWmtsCapabilitiesByTmsDeserialize(result);
}

export function _getItemWmtsCapabilitiesSend(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetItemWmtsCapabilitiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/WMTSCapabilities.xml{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,algorithm,algorithm_params,TileMatrixSetId,tile_format,tile_scale,minzoom,maxzoom,buffer,color_formula,resampling,rescale*,colormap_name,colormap,return_mask,padding,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      TileMatrixSetId: options?.tileMatrixSetId,
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
      padding: options?.padding,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/xml", ...options.requestOptions?.headers },
  });
}

export async function _getItemWmtsCapabilitiesDeserialize(
  result: PathUncheckedResponse,
): Promise<DataGetItemWmtsCapabilitiesResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    body: typeof result.body === "string" ? stringToUint8Array(result.body, "base64") : result.body,
  };
}

/** OGC WMTS endpoint for a STAC item. */
export async function getItemWmtsCapabilities(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetItemWmtsCapabilitiesOptionalParams = { requestOptions: {} },
): Promise<DataGetItemWmtsCapabilitiesResponse> {
  const result = await _getItemWmtsCapabilitiesSend(context, collectionId, itemId, options);
  return _getItemWmtsCapabilitiesDeserialize(result);
}

export function _getItemTileJsonByTmsSend(
  context: Client,
  collectionId: string,
  itemId: string,
  tileMatrixSetId: string,
  options: DataGetItemTileJsonByTmsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/{tileMatrixSetId}/tilejson.json{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,algorithm,algorithm_params,tile_format,tile_scale,minzoom,maxzoom,buffer,color_formula,resampling,rescale*,colormap_name,colormap,return_mask,padding,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      collectionId: collectionId,
      itemId: itemId,
      tileMatrixSetId: tileMatrixSetId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
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
      padding: options?.padding,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getItemTileJsonByTmsDeserialize(
  result: PathUncheckedResponse,
): Promise<TileJsonMetadata> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tileJsonMetadataDeserializer(result.body);
}

/** Return TileJSON document for a STAC item with TileMatrixSetId as path. */
export async function getItemTileJsonByTms(
  context: Client,
  collectionId: string,
  itemId: string,
  tileMatrixSetId: string,
  options: DataGetItemTileJsonByTmsOptionalParams = { requestOptions: {} },
): Promise<TileJsonMetadata> {
  const result = await _getItemTileJsonByTmsSend(
    context,
    collectionId,
    itemId,
    tileMatrixSetId,
    options,
  );
  return _getItemTileJsonByTmsDeserialize(result);
}

export function _getItemTileJsonSend(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetItemTileJsonOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/tilejson.json{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,algorithm,algorithm_params,TileMatrixSetId,tile_format,tile_scale,minzoom,maxzoom,buffer,color_formula,resampling,rescale*,colormap_name,colormap,return_mask,padding,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      TileMatrixSetId: options?.tileMatrixSetId,
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
      padding: options?.padding,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getItemTileJsonDeserialize(
  result: PathUncheckedResponse,
): Promise<TileJsonMetadata> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tileJsonMetadataDeserializer(result.body);
}

/** Return TileJSON document for a STAC item. */
export async function getItemTileJson(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetItemTileJsonOptionalParams = { requestOptions: {} },
): Promise<TileJsonMetadata> {
  const result = await _getItemTileJsonSend(context, collectionId, itemId, options);
  return _getItemTileJsonDeserialize(result);
}

export function _getItemFeatureStatisticsSend(
  context: Client,
  collectionId: string,
  itemId: string,
  body: Feature,
  options: DataGetItemFeatureStatisticsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/statistics{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,coord_crs,resampling,max_size,categorical,c,p,histogram_bins,histogram_range,dst_crs,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,algorithm,algorithm_params,height,width}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      coord_crs: options?.coordinateReferenceSystem,
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
      dst_crs: options?.destinationCrs,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      height: options?.height,
      width: options?.width,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: featureSerializer(body),
  });
}

export async function _getItemFeatureStatisticsDeserialize(
  result: PathUncheckedResponse,
): Promise<StacItemStatisticsGeoJson> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacItemStatisticsGeoJsonDeserializer(result.body);
}

/** Get statistics from a GeoJSON feature for a STAC item. */
export async function getItemFeatureStatistics(
  context: Client,
  collectionId: string,
  itemId: string,
  body: Feature,
  options: DataGetItemFeatureStatisticsOptionalParams = { requestOptions: {} },
): Promise<StacItemStatisticsGeoJson> {
  const result = await _getItemFeatureStatisticsSend(context, collectionId, itemId, body, options);
  return _getItemFeatureStatisticsDeserialize(result);
}

export function _getItemStatisticsSend(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetItemStatisticsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/statistics{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,resampling,max_size,categorical,c,p,histogram_bins,histogram_range,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,algorithm,algorithm_params,height,width}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
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
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      height: options?.height,
      width: options?.width,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getItemStatisticsDeserialize(
  result: PathUncheckedResponse,
): Promise<TilerStacItemStatistics> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tilerStacItemStatisticsDeserializer(result.body);
}

/** Merged assets statistics for a STAC item. */
export async function getItemStatistics(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetItemStatisticsOptionalParams = { requestOptions: {} },
): Promise<TilerStacItemStatistics> {
  const result = await _getItemStatisticsSend(context, collectionId, itemId, options);
  return _getItemStatisticsDeserialize(result);
}

export function _getItemAssetStatisticsSend(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetItemAssetStatisticsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/asset_statistics{?api%2Dversion,bidx*,assets*,asset_bidx,nodata,unscale,reproject,resampling,max_size,categorical,c,p,histogram_bins,histogram_range,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,asset_expression,height,width}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
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
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      asset_expression: !options?.assetExpression
        ? options?.assetExpression
        : options?.assetExpression.map((p: any) => {
            return p;
          }),
      height: options?.height,
      width: options?.width,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getItemAssetStatisticsDeserialize(
  result: PathUncheckedResponse,
): Promise<AssetStatisticsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return assetStatisticsResponseDeserializer(result.body);
}

/** Per asset statistics for a STAC item. */
export async function getItemAssetStatistics(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetItemAssetStatisticsOptionalParams = { requestOptions: {} },
): Promise<AssetStatisticsResponse> {
  const result = await _getItemAssetStatisticsSend(context, collectionId, itemId, options);
  return _getItemAssetStatisticsDeserialize(result);
}

export function _getItemAvailableAssetsSend(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetItemAvailableAssetsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/assets{?api%2Dversion,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getItemAvailableAssetsDeserialize(
  result: PathUncheckedResponse,
): Promise<DataGetItemAvailableAssetsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    body: result.body.map((p: any) => {
      return p;
    }),
  };
}

/** Return a list of supported assets for a STAC item. */
export async function getItemAvailableAssets(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetItemAvailableAssetsOptionalParams = { requestOptions: {} },
): Promise<DataGetItemAvailableAssetsResponse> {
  const result = await _getItemAvailableAssetsSend(context, collectionId, itemId, options);
  return _getItemAvailableAssetsDeserialize(result);
}

export function _getItemInfoGeoJsonSend(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetItemInfoGeoJsonOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/info.geojson{?api%2Dversion,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,assets*}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getItemInfoGeoJsonDeserialize(
  result: PathUncheckedResponse,
): Promise<TilerInfoGeoJsonFeature> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tilerInfoGeoJsonFeatureDeserializer(result.body);
}

/** Return info as GeoJSON for a STAC item. */
export async function getItemInfoGeoJson(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetItemInfoGeoJsonOptionalParams = { requestOptions: {} },
): Promise<TilerInfoGeoJsonFeature> {
  const result = await _getItemInfoGeoJsonSend(context, collectionId, itemId, options);
  return _getItemInfoGeoJsonDeserialize(result);
}

export function _getItemInfoSend(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetItemInfoOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/info{?api%2Dversion,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,assets*}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getItemInfoDeserialize(
  result: PathUncheckedResponse,
): Promise<TilerInfoMapResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tilerInfoMapResponseDeserializer(result.body);
}

/** Return dataset's basic info for a STAC item. */
export async function getItemInfo(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetItemInfoOptionalParams = { requestOptions: {} },
): Promise<TilerInfoMapResponse> {
  const result = await _getItemInfoSend(context, collectionId, itemId, options);
  return _getItemInfoDeserialize(result);
}

export function _getItemBoundsSend(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetItemBoundsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/bounds{?api%2Dversion,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getItemBoundsDeserialize(
  result: PathUncheckedResponse,
): Promise<StacItemBounds> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacItemBoundsDeserializer(result.body);
}

/** Return the bounds for a STAC item. */
export async function getItemBounds(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetItemBoundsOptionalParams = { requestOptions: {} },
): Promise<StacItemBounds> {
  const result = await _getItemBoundsSend(context, collectionId, itemId, options);
  return _getItemBoundsDeserialize(result);
}

export function _cropFeatureWidthByHeightSend(
  context: Client,
  collectionId: string,
  itemId: string,
  width: number,
  height: number,
  format: string,
  body: Feature,
  options: DataCropFeatureWidthByHeightOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/feature/{width}x{height}.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,algorithm,algorithm_params,color_formula,coord_crs,resampling,max_size,rescale*,colormap_name,colormap,return_mask,dst_crs,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      collectionId: collectionId,
      itemId: itemId,
      width: width,
      height: height,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      color_formula: options?.colorFormula,
      coord_crs: options?.coordinateReferenceSystem,
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
      dst_crs: options?.destinationCrs,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
    body: featureSerializer(body),
  });
}

export async function _cropFeatureWidthByHeightDeserialize(
  result: PathUncheckedResponse & DataCropFeatureWidthByHeightResponse,
): Promise<DataCropFeatureWidthByHeightResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create image from a geojson feature with dimensions. */
export async function cropFeatureWidthByHeight(
  context: Client,
  collectionId: string,
  itemId: string,
  width: number,
  height: number,
  format: string,
  body: Feature,
  options: DataCropFeatureWidthByHeightOptionalParams = { requestOptions: {} },
): Promise<DataCropFeatureWidthByHeightResponse> {
  const streamableMethod = _cropFeatureWidthByHeightSend(
    context,
    collectionId,
    itemId,
    width,
    height,
    format,
    body,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _cropFeatureWidthByHeightDeserialize(result);
}

export function _cropFeatureByFormatSend(
  context: Client,
  collectionId: string,
  itemId: string,
  format: string,
  body: Feature,
  options: DataCropFeatureByFormatOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/feature.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,algorithm,algorithm_params,color_formula,coord_crs,resampling,max_size,height,width,rescale*,colormap_name,colormap,return_mask,dst_crs,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      collectionId: collectionId,
      itemId: itemId,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      color_formula: options?.colorFormula,
      coord_crs: options?.coordinateReferenceSystem,
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
      dst_crs: options?.destinationCrs,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
    body: featureSerializer(body),
  });
}

export async function _cropFeatureByFormatDeserialize(
  result: PathUncheckedResponse & DataCropFeatureByFormatResponse,
): Promise<DataCropFeatureByFormatResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create image from a geojson feature with format. */
export async function cropFeatureByFormat(
  context: Client,
  collectionId: string,
  itemId: string,
  format: string,
  body: Feature,
  options: DataCropFeatureByFormatOptionalParams = { requestOptions: {} },
): Promise<DataCropFeatureByFormatResponse> {
  const streamableMethod = _cropFeatureByFormatSend(
    context,
    collectionId,
    itemId,
    format,
    body,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _cropFeatureByFormatDeserialize(result);
}

export function _cropFeatureSend(
  context: Client,
  collectionId: string,
  itemId: string,
  body: Feature,
  options: DataCropFeatureOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/feature{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,algorithm,algorithm_params,color_formula,coord_crs,resampling,max_size,height,width,rescale*,colormap_name,colormap,return_mask,dst_crs,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method,format}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      color_formula: options?.colorFormula,
      coord_crs: options?.coordinateReferenceSystem,
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
      dst_crs: options?.destinationCrs,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
      format: options?.format,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
    body: featureSerializer(body),
  });
}

export async function _cropFeatureDeserialize(
  result: PathUncheckedResponse & DataCropFeatureResponse,
): Promise<DataCropFeatureResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create image from a geojson feature (without format in path). */
export async function cropFeature(
  context: Client,
  collectionId: string,
  itemId: string,
  body: Feature,
  options: DataCropFeatureOptionalParams = { requestOptions: {} },
): Promise<DataCropFeatureResponse> {
  const streamableMethod = _cropFeatureSend(context, collectionId, itemId, body, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _cropFeatureDeserialize(result);
}

export function _getTileNoTmsByScaleAndFormatSend(
  context: Client,
  collectionId: string,
  itemId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  format: string,
  options: DataGetTileNoTmsByScaleAndFormatOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/tiles/{z}/{x}/{y}@{scale}x.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,algorithm,algorithm_params,TileMatrixSetId,buffer,color_formula,resampling,rescale*,colormap_name,colormap,return_mask,padding,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      collectionId: collectionId,
      itemId: itemId,
      z: z,
      x: x,
      y: y,
      scale: scale,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      TileMatrixSetId: options?.tileMatrixSetId,
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
      padding: options?.padding,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getTileNoTmsByScaleAndFormatDeserialize(
  result: PathUncheckedResponse & DataGetTileNoTmsByScaleAndFormatResponse,
): Promise<DataGetTileNoTmsByScaleAndFormatResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create map tile from a dataset (with scale and format in path, without TileMatrixSetId). */
export async function getTileNoTmsByScaleAndFormat(
  context: Client,
  collectionId: string,
  itemId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  format: string,
  options: DataGetTileNoTmsByScaleAndFormatOptionalParams = { requestOptions: {} },
): Promise<DataGetTileNoTmsByScaleAndFormatResponse> {
  const streamableMethod = _getTileNoTmsByScaleAndFormatSend(
    context,
    collectionId,
    itemId,
    z,
    x,
    y,
    scale,
    format,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getTileNoTmsByScaleAndFormatDeserialize(result);
}

export function _getTileNoTmsByScaleSend(
  context: Client,
  collectionId: string,
  itemId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  options: DataGetTileNoTmsByScaleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/tiles/{z}/{x}/{y}@{scale}x{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,algorithm,algorithm_params,TileMatrixSetId,format,buffer,color_formula,resampling,rescale*,colormap_name,colormap,return_mask,padding,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      collectionId: collectionId,
      itemId: itemId,
      z: z,
      x: x,
      y: y,
      scale: scale,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      TileMatrixSetId: options?.tileMatrixSetId,
      format: options?.format,
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
      padding: options?.padding,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getTileNoTmsByScaleDeserialize(
  result: PathUncheckedResponse & DataGetTileNoTmsByScaleResponse,
): Promise<DataGetTileNoTmsByScaleResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create map tile from a dataset (with scale in path, without TileMatrixSetId or format). */
export async function getTileNoTmsByScale(
  context: Client,
  collectionId: string,
  itemId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  options: DataGetTileNoTmsByScaleOptionalParams = { requestOptions: {} },
): Promise<DataGetTileNoTmsByScaleResponse> {
  const streamableMethod = _getTileNoTmsByScaleSend(
    context,
    collectionId,
    itemId,
    z,
    x,
    y,
    scale,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getTileNoTmsByScaleDeserialize(result);
}

export function _getTileNoTmsByFormatSend(
  context: Client,
  collectionId: string,
  itemId: string,
  z: number,
  x: number,
  y: number,
  format: string,
  options: DataGetTileNoTmsByFormatOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/tiles/{z}/{x}/{y}.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,algorithm,algorithm_params,TileMatrixSetId,scale,buffer,color_formula,resampling,rescale*,colormap_name,colormap,return_mask,padding,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      collectionId: collectionId,
      itemId: itemId,
      z: z,
      x: x,
      y: y,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      TileMatrixSetId: options?.tileMatrixSetId,
      scale: options?.scale,
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
      padding: options?.padding,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getTileNoTmsByFormatDeserialize(
  result: PathUncheckedResponse & DataGetTileNoTmsByFormatResponse,
): Promise<DataGetTileNoTmsByFormatResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create map tile from a dataset (with format in path, without TileMatrixSetId or scale). */
export async function getTileNoTmsByFormat(
  context: Client,
  collectionId: string,
  itemId: string,
  z: number,
  x: number,
  y: number,
  format: string,
  options: DataGetTileNoTmsByFormatOptionalParams = { requestOptions: {} },
): Promise<DataGetTileNoTmsByFormatResponse> {
  const streamableMethod = _getTileNoTmsByFormatSend(
    context,
    collectionId,
    itemId,
    z,
    x,
    y,
    format,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getTileNoTmsByFormatDeserialize(result);
}

export function _getTileNoTmsSend(
  context: Client,
  collectionId: string,
  itemId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetTileNoTmsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/tiles/{z}/{x}/{y}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,algorithm,algorithm_params,TileMatrixSetId,format,scale,buffer,color_formula,resampling,rescale*,colormap_name,colormap,return_mask,padding,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      collectionId: collectionId,
      itemId: itemId,
      z: z,
      x: x,
      y: y,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      TileMatrixSetId: options?.tileMatrixSetId,
      format: options?.format,
      scale: options?.scale,
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
      padding: options?.padding,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getTileNoTmsDeserialize(
  result: PathUncheckedResponse & DataGetTileNoTmsResponse,
): Promise<DataGetTileNoTmsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create map tile from a dataset (without TileMatrixSetId, scale or format in path). */
export async function getTileNoTms(
  context: Client,
  collectionId: string,
  itemId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetTileNoTmsOptionalParams = { requestOptions: {} },
): Promise<DataGetTileNoTmsResponse> {
  const streamableMethod = _getTileNoTmsSend(context, collectionId, itemId, z, x, y, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getTileNoTmsDeserialize(result);
}

export function _getTileByScaleAndFormatSend(
  context: Client,
  collectionId: string,
  itemId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  format: string,
  options: DataGetTileByScaleAndFormatOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}@{scale}x.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,algorithm,algorithm_params,buffer,color_formula,resampling,rescale*,colormap_name,colormap,return_mask,padding,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      collectionId: collectionId,
      itemId: itemId,
      tileMatrixSetId: tileMatrixSetId,
      z: z,
      x: x,
      y: y,
      scale: scale,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
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
      padding: options?.padding,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getTileByScaleAndFormatDeserialize(
  result: PathUncheckedResponse & DataGetTileByScaleAndFormatResponse,
): Promise<DataGetTileByScaleAndFormatResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create map tile from a dataset (with TileMatrixSetId, scale, and format in path). */
export async function getTileByScaleAndFormat(
  context: Client,
  collectionId: string,
  itemId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  format: string,
  options: DataGetTileByScaleAndFormatOptionalParams = { requestOptions: {} },
): Promise<DataGetTileByScaleAndFormatResponse> {
  const streamableMethod = _getTileByScaleAndFormatSend(
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
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getTileByScaleAndFormatDeserialize(result);
}

export function _getTileByScaleSend(
  context: Client,
  collectionId: string,
  itemId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  options: DataGetTileByScaleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}@{scale}x{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,algorithm,algorithm_params,format,buffer,color_formula,resampling,rescale*,colormap_name,colormap,return_mask,padding,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      collectionId: collectionId,
      itemId: itemId,
      tileMatrixSetId: tileMatrixSetId,
      z: z,
      x: x,
      y: y,
      scale: scale,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      format: options?.format,
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
      padding: options?.padding,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getTileByScaleDeserialize(
  result: PathUncheckedResponse & DataGetTileByScaleResponse,
): Promise<DataGetTileByScaleResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create map tile from a dataset (with scale in path, without format). */
export async function getTileByScale(
  context: Client,
  collectionId: string,
  itemId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  scale: number,
  options: DataGetTileByScaleOptionalParams = { requestOptions: {} },
): Promise<DataGetTileByScaleResponse> {
  const streamableMethod = _getTileByScaleSend(
    context,
    collectionId,
    itemId,
    tileMatrixSetId,
    z,
    x,
    y,
    scale,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getTileByScaleDeserialize(result);
}

export function _getTileByFormatSend(
  context: Client,
  collectionId: string,
  itemId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  format: string,
  options: DataGetTileByFormatOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}.{format}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,algorithm,algorithm_params,scale,buffer,color_formula,resampling,rescale*,colormap_name,colormap,return_mask,padding,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      collectionId: collectionId,
      itemId: itemId,
      tileMatrixSetId: tileMatrixSetId,
      z: z,
      x: x,
      y: y,
      format: format,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      scale: options?.scale,
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
      padding: options?.padding,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getTileByFormatDeserialize(
  result: PathUncheckedResponse & DataGetTileByFormatResponse,
): Promise<DataGetTileByFormatResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create map tile from a dataset (with format in path, without scale). */
export async function getTileByFormat(
  context: Client,
  collectionId: string,
  itemId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  format: string,
  options: DataGetTileByFormatOptionalParams = { requestOptions: {} },
): Promise<DataGetTileByFormatResponse> {
  const streamableMethod = _getTileByFormatSend(
    context,
    collectionId,
    itemId,
    tileMatrixSetId,
    z,
    x,
    y,
    format,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getTileByFormatDeserialize(result);
}

export function _getTileSend(
  context: Client,
  collectionId: string,
  itemId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetTileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}{?api%2Dversion,bidx*,assets*,expression,asset_bidx,asset_as_band,nodata,unscale,reproject,algorithm,algorithm_params,format,scale,buffer,color_formula,resampling,rescale*,colormap_name,colormap,return_mask,padding,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      collectionId: collectionId,
      itemId: itemId,
      tileMatrixSetId: tileMatrixSetId,
      z: z,
      x: x,
      y: y,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      bidx: !options?.bidx
        ? options?.bidx
        : options?.bidx.map((p: any) => {
            return p;
          }),
      assets: !options?.assets
        ? options?.assets
        : options?.assets.map((p: any) => {
            return p;
          }),
      expression: options?.expression,
      asset_bidx: !options?.assetBandIndices
        ? options?.assetBandIndices
        : options?.assetBandIndices.map((p: any) => {
            return p;
          }),
      asset_as_band: options?.assetAsBand,
      nodata: options?.noData,
      unscale: options?.unscale,
      reproject: options?.reproject,
      algorithm: options?.algorithm,
      algorithm_params: options?.algorithmParams,
      format: options?.format,
      scale: options?.scale,
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
      padding: options?.padding,
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept:
        "image/png, image/jpeg, image/jpg, image/webp, image/jp2, image/tiff; application=geotiff, application/x-binary",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getTileDeserialize(
  result: PathUncheckedResponse & DataGetTileResponse,
): Promise<DataGetTileResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Create map tile from a dataset (without scale or format in path). */
export async function getTile(
  context: Client,
  collectionId: string,
  itemId: string,
  tileMatrixSetId: string,
  z: number,
  x: number,
  y: number,
  options: DataGetTileOptionalParams = { requestOptions: {} },
): Promise<DataGetTileResponse> {
  const streamableMethod = _getTileSend(
    context,
    collectionId,
    itemId,
    tileMatrixSetId,
    z,
    x,
    y,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getTileDeserialize(result);
}

export function _getTilesetMetadataSend(
  context: Client,
  collectionId: string,
  itemId: string,
  tileMatrixSetId: string,
  options: DataGetTilesetMetadataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/tiles/{tileMatrixSetId}{?api%2Dversion,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      collectionId: collectionId,
      itemId: itemId,
      tileMatrixSetId: tileMatrixSetId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getTilesetMetadataDeserialize(
  result: PathUncheckedResponse,
): Promise<TileSetMetadata> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tileSetMetadataDeserializer(result.body);
}

/** Return metadata for a specific tileset of a STAC item. */
export async function getTilesetMetadata(
  context: Client,
  collectionId: string,
  itemId: string,
  tileMatrixSetId: string,
  options: DataGetTilesetMetadataOptionalParams = { requestOptions: {} },
): Promise<TileSetMetadata> {
  const result = await _getTilesetMetadataSend(
    context,
    collectionId,
    itemId,
    tileMatrixSetId,
    options,
  );
  return _getTilesetMetadataDeserialize(result);
}

export function _getTilesetsSend(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetTilesetsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/collections/{collectionId}/items/{itemId}/tiles{?api%2Dversion,subdataset_name,subdataset_bands,crs,datetime,sel*,sel_method}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      subdataset_name: options?.subdatasetName,
      subdataset_bands: !options?.subdatasetBands
        ? options?.subdatasetBands
        : options?.subdatasetBands.map((p: any) => {
            return p;
          }),
      crs: options?.crs,
      datetime: options?.datetime,
      sel: !options?.sel
        ? options?.sel
        : options?.sel.map((p: any) => {
            return p;
          }),
      sel_method: options?.selMethod,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getTilesetsDeserialize(result: PathUncheckedResponse): Promise<TileSetList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tileSetListDeserializer(result.body);
}

/** Return a list of available tilesets for a STAC item. */
export async function getTilesets(
  context: Client,
  collectionId: string,
  itemId: string,
  options: DataGetTilesetsOptionalParams = { requestOptions: {} },
): Promise<TileSetList> {
  const result = await _getTilesetsSend(context, collectionId, itemId, options);
  return _getTilesetsDeserialize(result);
}

export function _registerMosaicsSearchSend(
  context: Client,
  options: DataRegisterMosaicsSearchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/mosaic/register{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
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
      bbox: !options?.boundingBox
        ? options?.boundingBox
        : options?.boundingBox.map((p: any) => {
            return p;
          }),
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

export function _getLegendSend(
  context: Client,
  colorMapName: string,
  options: DataGetLegendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/legend/colormap/{colorMapName}{?api%2Dversion,height,width,trim_start,trim_end}",
    {
      colorMapName: colorMapName,
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      height: options?.height,
      width: options?.width,
      trim_start: options?.trimStart,
      trim_end: options?.trimEnd,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "image/png", ...options.requestOptions?.headers },
  });
}

export async function _getLegendDeserialize(
  result: PathUncheckedResponse & DataGetLegendResponse,
): Promise<DataGetLegendResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
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
): Promise<DataGetLegendResponse> {
  const streamableMethod = _getLegendSend(context, colorMapName, options);
  const result = await getBinaryStreamResponse(streamableMethod);
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
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      trim_start: options?.trimStart,
      trim_end: options?.trimEnd,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getIntervalLegendDeserialize(
  result: PathUncheckedResponse,
): Promise<DataGetIntervalLegendResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    body: result.body.map((p: any) => {
      return p.map((p1: any) => {
        return p1.map((p2: any) => {
          return p2;
        });
      });
    }),
  };
}

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
export async function getIntervalLegend(
  context: Client,
  classmapName: string,
  options: DataGetIntervalLegendOptionalParams = { requestOptions: {} },
): Promise<DataGetIntervalLegendResponse> {
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
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
      trim_start: options?.trimStart,
      trim_end: options?.trimEnd,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getClassMapLegendDeserialize(
  result: PathUncheckedResponse,
): Promise<ClassMapLegendResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return classMapLegendResponseDeserializer(result.body);
}

/** Generate values and color swatches mapping for a given classmap. */
export async function getClassMapLegend(
  context: Client,
  classmapName: string,
  options: DataGetClassMapLegendOptionalParams = { requestOptions: {} },
): Promise<ClassMapLegendResponse> {
  const result = await _getClassMapLegendSend(context, classmapName, options);
  return _getClassMapLegendDeserialize(result);
}

export function _getTileMatricesSend(
  context: Client,
  options: DataGetTileMatricesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data/tile-matrix-sets{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getTileMatricesDeserialize(
  result: PathUncheckedResponse,
): Promise<DataGetTileMatricesResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    body: result.body.map((p: any) => {
      return p;
    }),
  };
}

/** Return Matrix List */
export async function getTileMatrices(
  context: Client,
  options: DataGetTileMatricesOptionalParams = { requestOptions: {} },
): Promise<DataGetTileMatricesResponse> {
  const result = await _getTileMatricesSend(context, options);
  return _getTileMatricesDeserialize(result);
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
      "api%2Dversion": context.apiVersion ?? "2026-04-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
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
  const result = await _getTileMatrixDefinitionsSend(context, tileMatrixSetId, options);
  return _getTileMatrixDefinitionsDeserialize(result);
}
