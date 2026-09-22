// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  GeometryUnion,
  StacSortExtension,
  FilterLanguage,
  MosaicMetadata,
  SelMethod,
  WarpKernelResampling,
  TerrainAlgorithm,
  TilerImageFormat,
  Resampling,
  ColorMapNames,
  TileMatrixSetId,
  PixelSelection,
} from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DataGetSearchPointWithAssetsOptionalParams extends OperationOptions {
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
}

/** Optional parameters. */
export interface DataGetSearchPointOptionalParams extends OperationOptions {
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
  /** Resampling method. */
  resampling?: Resampling;
}

/** Optional parameters. */
export interface DataGetSearchAssetsForTileNoTmsOptionalParams extends OperationOptions {
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Identifier selecting one of the TileMatrixSetId supported (default: 'WebMercatorQuad') */
  tileMatrixSetId?: TileMatrixSetId;
}

/** Optional parameters. */
export interface DataGetSearchTileNoTmsByScaleAndFormatOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Identifier selecting one of the TileMatrixSetId supported (default: 'WebMercatorQuad') */
  tileMatrixSetId?: TileMatrixSetId;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
}

/** Optional parameters. */
export interface DataGetSearchTileNoTmsByScaleOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Identifier selecting one of the TileMatrixSetId supported (default: 'WebMercatorQuad') */
  tileMatrixSetId?: TileMatrixSetId;
  /** Output format for the tile or image (e.g., png, jpeg, webp) */
  format?: TilerImageFormat;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
}

/** Optional parameters. */
export interface DataGetSearchTileNoTmsByFormatOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Identifier selecting one of the TileMatrixSetId supported (default: 'WebMercatorQuad') */
  tileMatrixSetId?: TileMatrixSetId;
  /** Numeric scale factor for the tile. Higher values produce larger tiles */
  scale?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
}

/** Optional parameters. */
export interface DataGetSearchTileNoTmsOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Identifier selecting one of the TileMatrixSetId supported (default: 'WebMercatorQuad') */
  tileMatrixSetId?: TileMatrixSetId;
  /** Output format for the tile or image (e.g., png, jpeg, webp) */
  format?: TilerImageFormat;
  /** Numeric scale factor for the tile. Higher values produce larger tiles */
  scale?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
}

/** Optional parameters. */
export interface DataGetSearchTileJsonOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Identifier selecting one of the TileMatrixSetId supported (default: 'WebMercatorQuad'). */
  tileMatrixSetId?: TileMatrixSetId;
  /**
   * Default will be automatically defined if the output image needs a mask (png) or
   * not (jpeg).
   */
  tileFormat?: TilerImageFormat;
  /** Tile scale factor affecting output size. Values > 1 produce larger tiles (e.g., 1=256x256, 2=512x512). */
  tileScale?: number;
  /** Overwrite default minzoom. */
  minZoom?: number;
  /** Overwrite default maxzoom. */
  maxZoom?: number;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collectionId?: string;
  /** Resampling method */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colormapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colormap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
}

/** Optional parameters. */
export interface DataGetSearchWmtsCapabilitiesOptionalParams extends OperationOptions {
  /**
   * Identifier selecting one of the TileMatrixSetId supported (default:
   * 'WebMercatorQuad')
   */
  tileMatrixSetId?: TileMatrixSetId;
  /** Output image type. Default is png. */
  tileFormat?: TilerImageFormat;
  /** Tile scale factor affecting output size. Values > 1 produce larger tiles (e.g., 1=256x256, 2=512x512). */
  tileScale?: number;
  /** Overwrite default minzoom. */
  minZoom?: number;
  /** Overwrite default maxzoom. */
  maxZoom?: number;
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
}

/** Optional parameters. */
export interface DataCropSearchFeatureWidthByHeightOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
  /** Image output size limit if width and height limits are not set. */
  maxSize?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Output Coordinate Reference System. */
  destinationCrs?: string;
}

/** Optional parameters. */
export interface DataCropSearchFeatureByFormatOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
  /** Image output size limit if width and height limits are not set. */
  maxSize?: number;
  /** Height in pixels for the output image */
  height?: number;
  /** Width in pixels for the output image */
  width?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Output Coordinate Reference System. */
  destinationCrs?: string;
}

/** Optional parameters. */
export interface DataCropSearchFeatureOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
  /** Image output size limit if width and height limits are not set. */
  maxSize?: number;
  /** Height in pixels for the output image */
  height?: number;
  /** Width in pixels for the output image */
  width?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Output Coordinate Reference System. */
  destinationCrs?: string;
  /** Output image format. */
  format?: TilerImageFormat;
}

/** Optional parameters. */
export interface DataGetSearchBboxAssetsOptionalParams extends OperationOptions {
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
}

/** Optional parameters. */
export interface DataGetSearchBboxCropWithDimensionsOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
  /** Output Coordinate Reference System. */
  destinationCrs?: string;
  /** Image output size limit if width and height limits are not set. */
  maxSize?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
}

/** Optional parameters. */
export interface DataGetSearchBboxCropOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
  /** Output Coordinate Reference System. */
  destinationCrs?: string;
  /** Image output size limit if width and height limits are not set. */
  maxSize?: number;
  /** Height in pixels for the output image */
  height?: number;
  /** Width in pixels for the output image */
  width?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
}

/** Optional parameters. */
export interface DataGetSearchInfoOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataGetSearchWmtsCapabilitiesByTmsOptionalParams extends OperationOptions {
  /** Output image type. Default is png. */
  tileFormat?: TilerImageFormat;
  /** Tile scale factor affecting output size. Values > 1 produce larger tiles (e.g., 1=256x256, 2=512x512). */
  tileScale?: number;
  /** Overwrite default minzoom. */
  minZoom?: number;
  /** Overwrite default maxzoom. */
  maxZoom?: number;
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
}

/** Optional parameters. */
export interface DataGetSearchTileJsonByTmsOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Overwrite default minzoom. */
  minZoom?: number;
  /** Overwrite default maxzoom. */
  maxZoom?: number;
  /**
   * Default will be automatically defined if the output image needs a mask (png) or
   * not (jpeg).
   */
  tileFormat?: TilerImageFormat;
  /** Tile scale factor affecting output size. Values > 1 produce larger tiles (e.g., 1=256x256, 2=512x512). */
  tileScale?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
}

/** Optional parameters. */
export interface DataGetSearchAssetsForTileOptionalParams extends OperationOptions {
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetSearchTileByScaleOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Output format for the tile or image (e.g., png, jpeg, webp) */
  format?: TilerImageFormat;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
}

/** Optional parameters. */
export interface DataGetSearchTileByFormatOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Numeric scale factor for the tile. Higher values produce larger tiles */
  scale?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
}

/** Optional parameters. */
export interface DataGetSearchTileOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Output format for the tile or image (e.g., png, jpeg, webp) */
  format?: TilerImageFormat;
  /** Numeric scale factor for the tile. Higher values produce larger tiles */
  scale?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
}

/** Optional parameters. */
export interface DataGetSearchTileByScaleAndFormatOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
}

/** Optional parameters. */
export interface DataGetSearchTilesetMetadataOptionalParams extends OperationOptions {
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetSearchTilesetsOptionalParams extends OperationOptions {
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetCollectionPointAssetsOptionalParams extends OperationOptions {
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
}

/** Optional parameters. */
export interface DataGetCollectionPointOptionalParams extends OperationOptions {
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
  /** Resampling method. */
  resampling?: Resampling;
}

/** Optional parameters. */
export interface DataCropCollectionFeatureWidthByHeightOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
  /** Image output size limit if width and height limits are not set. */
  maxSize?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Output Coordinate Reference System. */
  destinationCrs?: string;
}

/** Optional parameters. */
export interface DataCropCollectionFeatureByFormatOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
  /** Image output size limit if width and height limits are not set. */
  maxSize?: number;
  /** Height in pixels for the output image */
  height?: number;
  /** Width in pixels for the output image */
  width?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Output Coordinate Reference System. */
  destinationCrs?: string;
}

/** Optional parameters. */
export interface DataCropCollectionFeatureOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
  /** Image output size limit if width and height limits are not set. */
  maxSize?: number;
  /** Height in pixels for the output image */
  height?: number;
  /** Width in pixels for the output image */
  width?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Output Coordinate Reference System. */
  destinationCrs?: string;
  /** Output image format. */
  format?: TilerImageFormat;
}

/** Optional parameters. */
export interface DataGetCollectionBboxCropWithDimensionsOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
  /** Output Coordinate Reference System. */
  destinationCrs?: string;
  /** Image output size limit if width and height limits are not set. */
  maxSize?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
}

/** Optional parameters. */
export interface DataGetCollectionBboxCropOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
  /** Output Coordinate Reference System. */
  destinationCrs?: string;
  /** Image output size limit if width and height limits are not set. */
  maxSize?: number;
  /** Height in pixels for the output image */
  height?: number;
  /** Width in pixels for the output image */
  width?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
}

/** Optional parameters. */
export interface DataGetCollectionInfoOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataGetCollectionAssetsForBboxOptionalParams extends OperationOptions {
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
}

/** Optional parameters. */
export interface DataGetCollectionAssetsForTileNoTmsOptionalParams extends OperationOptions {
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /**
   * Identifier selecting one of the TileMatrixSetId supported (default:
   * 'WebMercatorQuad')
   */
  tileMatrixSetId?: TileMatrixSetId;
}

/** Optional parameters. */
export interface DataGetCollectionAssetsForTileOptionalParams extends OperationOptions {
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetCollectionWmtsCapabilitiesByTmsOptionalParams extends OperationOptions {
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Output image type. Default is png. */
  tileFormat?: TilerImageFormat;
  /** Tile scale factor affecting output size. Values > 1 produce larger tiles (e.g., 1=256x256, 2=512x512). */
  tileScale?: number;
  /** Overwrite default minzoom. */
  minZoom?: number;
  /** Overwrite default maxzoom. */
  maxZoom?: number;
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
}

/** Optional parameters. */
export interface DataGetCollectionWmtsCapabilitiesOptionalParams extends OperationOptions {
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /**
   * Identifier selecting one of the TileMatrixSetId supported (default:
   * 'WebMercatorQuad')
   */
  tileMatrixSetId?: TileMatrixSetId;
  /** Output image type. Default is png. */
  tileFormat?: TilerImageFormat;
  /** Tile scale factor affecting output size. Values > 1 produce larger tiles (e.g., 1=256x256, 2=512x512). */
  tileScale?: number;
  /** Overwrite default minzoom. */
  minZoom?: number;
  /** Overwrite default maxzoom. */
  maxZoom?: number;
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
}

/** Optional parameters. */
export interface DataGetCollectionTileJsonByTmsOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /**
   * Default will be automatically defined if the output image needs a mask (png) or
   * not (jpeg).
   */
  tileFormat?: TilerImageFormat;
  /** Tile scale factor affecting output size. Values > 1 produce larger tiles (e.g., 1=256x256, 2=512x512). */
  tileScale?: number;
  /** Overwrite default minzoom. */
  minZoom?: number;
  /** Overwrite default maxzoom. */
  maxZoom?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
}

/** Optional parameters. */
export interface DataGetCollectionTileJsonOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /**
   * Identifier selecting one of the TileMatrixSetId supported (default:
   * 'WebMercatorQuad')
   */
  tileMatrixSetId?: TileMatrixSetId;
  /**
   * Default will be automatically defined if the output image needs a mask (png) or
   * not (jpeg).
   */
  tileFormat?: TilerImageFormat;
  /** Tile scale factor affecting output size. Values > 1 produce larger tiles (e.g., 1=256x256, 2=512x512). */
  tileScale?: number;
  /** Overwrite default minzoom. */
  minZoom?: number;
  /** Overwrite default maxzoom. */
  maxZoom?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
}

/** Optional parameters. */
export interface DataGetCollectionTileNoTmsByScaleOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /**
   * Identifier selecting one of the TileMatrixSetId supported (default:
   * 'WebMercatorQuad')
   */
  tileMatrixSetId?: TileMatrixSetId;
  /** Output format for the tile or image (e.g., png, jpeg, webp) */
  format?: TilerImageFormat;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
}

/** Optional parameters. */
export interface DataGetCollectionTileNoTmsByFormatOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /**
   * Identifier selecting one of the TileMatrixSetId supported (default:
   * 'WebMercatorQuad')
   */
  tileMatrixSetId?: TileMatrixSetId;
  /** Numeric scale factor for the tile. Higher values produce larger tiles */
  scale?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
}

/** Optional parameters. */
export interface DataGetCollectionTileNoTmsOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /**
   * Identifier selecting one of the TileMatrixSetId supported (default:
   * 'WebMercatorQuad')
   */
  tileMatrixSetId?: TileMatrixSetId;
  /** Output format for the tile or image (e.g., png, jpeg, webp) */
  format?: TilerImageFormat;
  /** Numeric scale factor for the tile. Higher values produce larger tiles */
  scale?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
}

/** Optional parameters. */
export interface DataGetCollectionTileNoTmsByScaleAndFormatOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /**
   * Identifier selecting one of the TileMatrixSetId supported (default:
   * 'WebMercatorQuad')
   */
  tileMatrixSetId?: TileMatrixSetId;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
}

/** Optional parameters. */
export interface DataGetCollectionTileByScaleOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Output format for the tile or image (e.g., png, jpeg, webp) */
  format?: TilerImageFormat;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
}

/** Optional parameters. */
export interface DataGetCollectionTileByFormatOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Numeric scale factor for the tile. Higher values produce larger tiles */
  scale?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
}

/** Optional parameters. */
export interface DataGetCollectionTileOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Output format for the tile or image (e.g., png, jpeg, webp) */
  format?: TilerImageFormat;
  /** Numeric scale factor for the tile. Higher values produce larger tiles */
  scale?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
}

/** Optional parameters. */
export interface DataGetCollectionTileByScaleAndFormatOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Return as soon as we scan N items (defaults to 10000). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True).
   */
  skipCovered?: boolean;
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** STAC Collection ID */
  collection?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Pixel selection method. */
  pixelSelection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
}

/** Optional parameters. */
export interface DataGetCollectionTilesetMetadataOptionalParams extends OperationOptions {
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetCollectionTilesetsOptionalParams extends OperationOptions {
  /** Array of Item ids. */
  ids?: string;
  /** Bounding box (west, south, east, north). */
  bbox?: string;
  /** JSON query expression for filtering items. */
  query?: string;
  /** Sorting expression (e.g. +/-property). */
  sortby?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetItemBboxCropWithDimensionsOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
  /** Output Coordinate Reference System. */
  destinationCrs?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Image output size limit if width and height limits are not set. */
  maxSize?: number;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetItemBboxCropOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
  /** Output Coordinate Reference System. */
  destinationCrs?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Image output size limit if width and height limits are not set. */
  maxSize?: number;
  /** Height in pixels for the output image */
  height?: number;
  /** Width in pixels for the output image */
  width?: number;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetItemPreviewWithFormatOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** Output Coordinate Reference System. */
  dstCrs?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Image output size limit if width and height limits are not set. */
  maxSize?: number;
  /** Height in pixels for the output image */
  height?: number;
  /** Width in pixels for the output image */
  width?: number;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetItemPreviewOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Output format for the tile or image (e.g., png, jpeg, webp). */
  format?: TilerImageFormat;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** Output Coordinate Reference System. */
  dstCrs?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Image output size limit if width and height limits are not set. */
  maxSize?: number;
  /** Height in pixels for the output image */
  height?: number;
  /** Width in pixels for the output image */
  width?: number;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetItemPointOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
  /** Resampling method. */
  resampling?: Resampling;
}

/** Optional parameters. */
export interface DataGetItemWmtsCapabilitiesByTmsOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Output image type. Default is png. */
  tileFormat?: TilerImageFormat;
  /** Tile scale factor affecting output size. Values > 1 produce larger tiles (e.g., 1=256x256, 2=512x512). */
  tileScale?: number;
  /** Overwrite default minzoom. */
  minZoom?: number;
  /** Overwrite default maxzoom. */
  maxZoom?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetItemWmtsCapabilitiesOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /**
   * Identifier selecting one of the TileMatrixSetId supported (default:
   * 'WebMercatorQuad')
   */
  tileMatrixSetId?: TileMatrixSetId;
  /** Output image type. Default is png. */
  tileFormat?: TilerImageFormat;
  /** Tile scale factor affecting output size. Values > 1 produce larger tiles (e.g., 1=256x256, 2=512x512). */
  tileScale?: number;
  /** Overwrite default minzoom. */
  minZoom?: number;
  /** Overwrite default maxzoom. */
  maxZoom?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetItemTileJsonByTmsOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /**
   * Default will be automatically defined if the output image needs a mask (png) or
   * not (jpeg).
   */
  tileFormat?: TilerImageFormat;
  /** Tile scale factor affecting output size. Values > 1 produce larger tiles (e.g., 1=256x256, 2=512x512). */
  tileScale?: number;
  /** Overwrite default minzoom. */
  minZoom?: number;
  /** Overwrite default maxzoom. */
  maxZoom?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetItemTileJsonOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /**
   * Identifier selecting one of the TileMatrixSetId supported (default:
   * 'WebMercatorQuad')
   */
  tileMatrixSetId?: TileMatrixSetId;
  /**
   * Default will be automatically defined if the output image needs a mask (png) or
   * not (jpeg).
   */
  tileFormat?: TilerImageFormat;
  /** Tile scale factor affecting output size. Values > 1 produce larger tiles (e.g., 1=256x256, 2=512x512). */
  tileScale?: number;
  /** Overwrite default minzoom. */
  minZoom?: number;
  /** Overwrite default maxzoom. */
  maxZoom?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetItemFeatureStatisticsOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Maximum dimension in pixels for the source data used to calculate statistics */
  maxSize?: number;
  /** Return statistics for categorical dataset. */
  categorical?: boolean;
  /** List of pixel categorical values for which to report counts. */
  categoriesPixels?: number[];
  /** List of percentile values (default to [2, 98]). */
  percentiles?: number[];
  /**
   * Defines the number of equal-width bins in the given range (10, by default).
   *
   * If bins is a sequence (comma `,` delimited values), it defines a monotonically
   * increasing array of bin edges, including the rightmost edge, allowing for
   * non-uniform bin widths.
   *
   * link: https://numpy.org/doc/stable/reference/generated/numpy.histogram.html
   */
  histogramBins?: string;
  /**
   * Comma `,` delimited range of the bins.
   *
   * The lower and upper range of the bins. If not provided, range is simply
   * (a.min(), a.max()).
   *
   * Values outside the range are ignored. The first element of the range must be
   * less than or equal to the second.
   * range affects the automatic bin computation as well.
   *
   * link: https://numpy.org/doc/stable/reference/generated/numpy.histogram.html
   */
  histogramRange?: string;
  /** Output Coordinate Reference System. */
  destinationCrs?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Algorithm name. */
  algorithm?: string;
  /** Algorithm parameter. */
  algorithmParams?: string;
  /** Force output image height. */
  height?: number;
  /** Force output image width. */
  width?: number;
}

/** Optional parameters. */
export interface DataGetItemStatisticsOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Resampling method. */
  resampling?: Resampling;
  /** Maximum dimension in pixels for the source data used to calculate statistics */
  maxSize?: number;
  /** Return statistics for categorical dataset. */
  categorical?: boolean;
  /** List of pixel categorical values for which to report counts. */
  categoriesPixels?: number[];
  /** List of percentile values (default to [2, 98]). */
  percentiles?: number[];
  /**
   * Defines the number of equal-width bins in the given range (10, by default).
   *
   * If bins is a sequence (comma `,` delimited values), it defines a monotonically
   * increasing array of bin edges, including the rightmost edge, allowing for
   * non-uniform bin widths.
   *
   * link: https://numpy.org/doc/stable/reference/generated/numpy.histogram.html
   */
  histogramBins?: string;
  /**
   * Comma `,` delimited range of the bins.
   *
   * The lower and upper range of the bins. If not provided, range is simply
   * (a.min(), a.max()).
   *
   * Values outside the range are ignored. The first element of the range must be
   * less than or equal to the second.
   * range affects the automatic bin computation as well.
   *
   * link: https://numpy.org/doc/stable/reference/generated/numpy.histogram.html
   */
  histogramRange?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Algorithm name. */
  algorithm?: string;
  /** Algorithm parameter. */
  algorithmParams?: string;
  /** Force output image height. */
  height?: number;
  /** Force output image width. */
  width?: number;
}

/** Optional parameters. */
export interface DataGetItemAssetStatisticsOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Resampling method. */
  resampling?: Resampling;
  /** Maximum dimension in pixels for the source data used to calculate statistics */
  maxSize?: number;
  /** Return statistics for categorical dataset. */
  categorical?: boolean;
  /** List of pixel categorical values for which to report counts. */
  categoriesPixels?: number[];
  /** List of percentile values (default to [2, 98]). */
  percentiles?: number[];
  /**
   * Defines the number of equal-width bins in the given range (10, by default).
   *
   * If bins is a sequence (comma `,` delimited values), it defines a monotonically
   * increasing array of bin edges, including the rightmost edge, allowing for
   * non-uniform bin widths.
   *
   * link: https://numpy.org/doc/stable/reference/generated/numpy.histogram.html
   */
  histogramBins?: string;
  /**
   * Comma `,` delimited range of the bins.
   *
   * The lower and upper range of the bins. If not provided, range is simply
   * (a.min(), a.max()).
   *
   * Values outside the range are ignored. The first element of the range must be
   * less than or equal to the second.
   * range affects the automatic bin computation as well.
   *
   * link: https://numpy.org/doc/stable/reference/generated/numpy.histogram.html
   */
  histogramRange?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Per asset band expression. */
  assetExpression?: string[];
  /** Force output image height. */
  height?: number;
  /** Force output image width. */
  width?: number;
}

/** Optional parameters. */
export interface DataGetItemAvailableAssetsOptionalParams extends OperationOptions {
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetItemInfoGeoJsonOptionalParams extends OperationOptions {
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Asset's names. */
  assets?: string[];
}

/** Optional parameters. */
export interface DataGetItemInfoOptionalParams extends OperationOptions {
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Asset's names. */
  assets?: string[];
}

/** Optional parameters. */
export interface DataGetItemBoundsOptionalParams extends OperationOptions {
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataCropFeatureWidthByHeightOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Image output size limit if width and height limits are not set. */
  maxSize?: number;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Output Coordinate Reference System. */
  destinationCrs?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataCropFeatureByFormatOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Image output size limit if width and height limits are not set. */
  maxSize?: number;
  /** Height in pixels for the output image */
  height?: number;
  /** Width in pixels for the output image */
  width?: number;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Output Coordinate Reference System. */
  destinationCrs?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataCropFeatureOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Image output size limit if width and height limits are not set. */
  maxSize?: number;
  /** Height in pixels for the output image */
  height?: number;
  /** Width in pixels for the output image */
  width?: number;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Output Coordinate Reference System. */
  destinationCrs?: string;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
  /** Output image format. */
  format?: TilerImageFormat;
}

/** Optional parameters. */
export interface DataGetTileNoTmsByScaleAndFormatOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /**
   * Identifier selecting one of the TileMatrixSetId supported (default:
   * 'WebMercatorQuad')
   */
  tileMatrixSetId?: TileMatrixSetId;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetTileNoTmsByScaleOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /**
   * Identifier selecting one of the TileMatrixSetId supported (default:
   * 'WebMercatorQuad')
   */
  tileMatrixSetId?: TileMatrixSetId;
  /** Output format for the tile or image (e.g., png, jpeg, webp) */
  format?: TilerImageFormat;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetTileNoTmsByFormatOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /**
   * Identifier selecting one of the TileMatrixSetId supported (default:
   * 'WebMercatorQuad')
   */
  tileMatrixSetId?: TileMatrixSetId;
  /** Numeric scale factor for the tile. Higher values produce larger tiles */
  scale?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetTileNoTmsOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /**
   * Identifier selecting one of the TileMatrixSetId supported (default:
   * 'WebMercatorQuad')
   */
  tileMatrixSetId?: TileMatrixSetId;
  /** Output format for the tile or image (e.g., png, jpeg, webp) */
  format?: TilerImageFormat;
  /** Numeric scale factor for the tile. Higher values produce larger tiles */
  scale?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetTileByScaleAndFormatOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetTileByScaleOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Output format for the tile or image (e.g., png, jpeg, webp) */
  format?: TilerImageFormat;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetTileByFormatOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Numeric scale factor for the tile. Higher values produce larger tiles */
  scale?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetTileOptionalParams extends OperationOptions {
  /** Dataset band indexes */
  bidx?: number[];
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string[];
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: string;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** WarpKernel resampling algorithm (only used when doing re-projection). Defaults to `nearest`. */
  reproject?: WarpKernelResampling;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** Output format for the tile or image (e.g., png, jpeg, webp) */
  format?: TilerImageFormat;
  /** Numeric scale factor for the tile. Higher values produce larger tiles */
  scale?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: string[];
  /** Colormap name */
  colorMapName?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colorMap?: string;
  /** Add mask to the output data. */
  returnMask?: boolean;
  /** Padding to apply to each tile edge. Helps reduce resampling artefacts along edges. Defaults to `0`. */
  padding?: number;
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetTilesetMetadataOptionalParams extends OperationOptions {
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataGetTilesetsOptionalParams extends OperationOptions {
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: number[];
  /** Coordinate Reference System. */
  crs?: string;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Xarray Indexing using dimension names `{dimension}={value}`. */
  sel?: string[];
  /** Xarray indexing method to use for inexact matches. */
  selMethod?: SelMethod;
}

/** Optional parameters. */
export interface DataRegisterMosaicsSearchOptionalParams extends OperationOptions {
  /** List of STAC collection IDs to include in the mosaic */
  collections?: string[];
  /** List of specific STAC item IDs to include in the mosaic */
  ids?: string[];
  /** Geographic bounding box to filter items [west, south, east, north] */
  boundingBox?: number[];
  /** GeoJSON geometry to spatially filter items by intersection */
  intersects?: GeometryUnion;
  /** Query */
  query?: Record<string, any>;
  /** Filter */
  filter?: Record<string, any>;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
  /** Criteria for ordering items in the mosaic */
  sortBy?: StacSortExtension[];
  /** Query language format used in the filter parameter */
  filterLanguage?: FilterLanguage;
  /** Additional metadata to associate with the mosaic */
  metadata?: MosaicMetadata;
}

/** Optional parameters. */
export interface DataGetLegendOptionalParams extends OperationOptions {
  /** The output height of the legend image */
  height?: number;
  /** The output width of the legend image */
  width?: number;
  /** Number of items to trim from the start of the cmap */
  trimStart?: number;
  /** Number of items to trim from the end of the cmap */
  trimEnd?: number;
}

/** Optional parameters. */
export interface DataGetIntervalLegendOptionalParams extends OperationOptions {
  /** Number of items to trim from the start of the cmap */
  trimStart?: number;
  /** Number of items to trim from the end of the cmap */
  trimEnd?: number;
}

/** Optional parameters. */
export interface DataGetClassMapLegendOptionalParams extends OperationOptions {
  /** Number of items to trim from the start of the cmap */
  trimStart?: number;
  /** Number of items to trim from the end of the cmap */
  trimEnd?: number;
}

/** Optional parameters. */
export interface DataGetTileMatricesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataGetTileMatrixDefinitionsOptionalParams extends OperationOptions {}
