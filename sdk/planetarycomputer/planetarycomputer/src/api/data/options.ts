// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  GeometryUnion,
  StacSortExtension,
  FilterLanguage,
  MosaicMetadata,
  Resampling,
  TerrainAlgorithm,
  ColorMapNames,
  TilerImageFormat,
  PixelSelection,
} from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DataGetMosaicsWmtsCapabilitiesOptionalParams
  extends OperationOptions {
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string;
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
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
  buffer?: string;
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
}

/** Optional parameters. */
export interface DataGetMosaicsTileOptionalParams extends OperationOptions {
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string;
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** Return as soon as we scan N items (defaults to 10000 in PgSTAC). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100 in PgSTAC). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5 in PgSTAC). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True in PgSTAC). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True in PgSTAC).
   */
  skipCovered?: boolean;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: string;
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
export interface DataGetMosaicsTileJsonOptionalParams extends OperationOptions {
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string;
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** Return as soon as we scan N items (defaults to 10000 in PgSTAC). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100 in PgSTAC). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5 in PgSTAC). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True in PgSTAC). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True in PgSTAC).
   */
  skipCovered?: boolean;
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
  buffer?: string;
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
export interface DataRegisterMosaicsSearchOptionalParams
  extends OperationOptions {
  /** List of STAC collection IDs to include in the mosaic */
  collections?: string[];
  /** List of specific STAC item IDs to include in the mosaic */
  ids?: string[];
  /** Geographic bounding box to filter items [west, south, east, north] */
  boundingBox?: number;
  /** GeoJSON geometry to spatially filter items by intersection */
  intersects?: GeometryUnion;
  /** Query */
  query?: Record<string, any>;
  /** Filter */
  filter?: Record<string, any>;
  /** Temporal filter in RFC 3339 format or interval */
  datetime?: string;
  /** Criteria for ordering items in the mosaic */
  sortBy?: StacSortExtension[];
  /** Query language format used in the filter parameter */
  filterLanguage?: FilterLanguage;
  /** Additional metadata to associate with the mosaic */
  metadata?: MosaicMetadata;
}

/** Optional parameters. */
export interface DataGetMosaicsSearchInfoOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface DataGetMosaicsAssetsForTileOptionalParams
  extends OperationOptions {
  /** Return as soon as we scan N items (defaults to 10000 in PgSTAC). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100 in PgSTAC). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5 in PgSTAC). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True in PgSTAC). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True in PgSTAC).
   */
  skipCovered?: boolean;
}

/** Optional parameters. */
export interface DataGetMosaicsAssetsForPointOptionalParams
  extends OperationOptions {
  /** Return as soon as we scan N items (defaults to 10000 in PgSTAC). */
  scanLimit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100 in PgSTAC). */
  itemsLimit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5 in PgSTAC). */
  timeLimit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True in PgSTAC). */
  exitWhenFull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True in PgSTAC).
   */
  skipCovered?: boolean;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
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
export interface DataGetWmtsCapabilitiesOptionalParams
  extends OperationOptions {
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string;
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
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
  buffer?: string;
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
}

/** Optional parameters. */
export interface DataGetTileOptionalParams extends OperationOptions {
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string;
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: string;
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
  /** The name of a subdataset within the asset. */
  subdatasetName?: string;
  /** The index of a subdataset band within the asset. */
  subdatasetBands?: string[];
}

/** Optional parameters. */
export interface DataGetTileJsonOptionalParams extends OperationOptions {
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string;
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
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
  buffer?: string;
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
}

/** Optional parameters. */
export interface DataListStatisticsOptionalParams extends OperationOptions {
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string;
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** Resampling method. */
  resampling?: Resampling;
  /** Maximum dimension in pixels for the source data used to calculate statistics */
  maxSize?: number;
  /** Return statistics for categorical dataset. */
  categorical?: boolean;
  /** List of pixel categorical values for which to report counts. */
  categoriesPixels?: string[];
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
}

/** Optional parameters. */
export interface DataGetStaticImageOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataCreateStaticImageOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataGetPreviewWithFormatOptionalParams
  extends OperationOptions {
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string;
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
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
}

/** Optional parameters. */
export interface DataGetPreviewOptionalParams extends OperationOptions {
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string;
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
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
}

/** Optional parameters. */
export interface DataGetPointOptionalParams extends OperationOptions {
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string;
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
  /** Resampling method. */
  resampling?: Resampling;
}

/** Optional parameters. */
export interface DataGetPartWithDimensionsOptionalParams
  extends OperationOptions {
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string;
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** Output Coordinate Reference System. */
  dstCrs?: string;
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
}

/** Optional parameters. */
export interface DataGetPartOptionalParams extends OperationOptions {
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string;
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** Terrain algorithm name */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithmParams?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  colorFormula?: string;
  /** Output Coordinate Reference System. */
  dstCrs?: string;
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
}

/** Optional parameters. */
export interface DataGetItemAssetDetailsOptionalParams
  extends OperationOptions {
  /** Asset's names. */
  assets?: string[];
}

/** Optional parameters. */
export interface DataGetInfoGeoJsonOptionalParams extends OperationOptions {
  /** Asset's names. */
  assets?: string[];
}

/** Optional parameters. */
export interface DataGetGeoJsonStatisticsOptionalParams
  extends OperationOptions {
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string;
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  coordinateReferenceSystem?: string;
  /** Resampling method. */
  resampling?: Resampling;
  /** Maximum dimension in pixels for the source data used to calculate statistics */
  maxSize?: number;
  /** Return statistics for categorical dataset. */
  categorical?: boolean;
  /** List of pixel categorical values for which to report counts. */
  categoriesPixels?: string[];
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
}

/** Optional parameters. */
export interface DataCropGeoJsonWithDimensionsOptionalParams
  extends OperationOptions {
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string;
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
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
}

/** Optional parameters. */
export interface DataCropGeoJsonOptionalParams extends OperationOptions {
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string;
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
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
}

/** Optional parameters. */
export interface DataGetBoundsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataListAvailableAssetsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface DataGetAssetStatisticsOptionalParams extends OperationOptions {
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes, e.g. "image|1,2,3" means use the bands 1, 2, and 3 from the asset named "image") */
  assetBandIndices?: string;
  /** Asset as Band */
  assetAsBand?: boolean;
  /** Overwrite internal Nodata value */
  noData?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** Resampling method. */
  resampling?: Resampling;
  /** Maximum dimension in pixels for the source data used to calculate statistics */
  maxSize?: number;
  /** Return statistics for categorical dataset. */
  categorical?: boolean;
  /** List of pixel categorical values for which to report counts. */
  categoriesPixels?: string[];
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
}

/** Optional parameters. */
export interface DataListTileMatricesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataGetTileMatrixDefinitionsOptionalParams
  extends OperationOptions {}
