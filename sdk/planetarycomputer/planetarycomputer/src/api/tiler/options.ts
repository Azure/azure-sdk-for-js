// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  GeometryUnion,
  StacSortExtension,
  FilterLanguage,
  Resampling,
  MosaicMetadata,
} from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TilerGetMosaicsWmtsCapabilitiesOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface TilerGetMosaicsTileOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TilerGetMosaicsTileJsonOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface TilerRegisterMosaicsSearchOptionalParams
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
export interface TilerGetMosaicsSearchInfoOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface TilerGetMosaicsAssetsForTileOptionalParams
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
export interface TilerGetMosaicsAssetsForPointOptionalParams
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
export interface TilerGetLegendOptionalParams extends OperationOptions {
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
export interface TilerGetIntervalLegendOptionalParams extends OperationOptions {
  /** Number of items to trim from the start of the cmap */
  trimStart?: number;
  /** Number of items to trim from the end of the cmap */
  trimEnd?: number;
}

/** Optional parameters. */
export interface TilerGetClassMapLegendOptionalParams extends OperationOptions {
  /** Number of items to trim from the start of the cmap */
  trimStart?: number;
  /** Number of items to trim from the end of the cmap */
  trimEnd?: number;
}

/** Optional parameters. */
export interface TilerGetWmtsCapabilitiesOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface TilerGetTileOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TilerGetTileJsonOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TilerListStatisticsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TilerGetStaticImageOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TilerCreateStaticImageOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface TilerGetPreviewWithFormatOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface TilerGetPreviewOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TilerGetPointOptionalParams extends OperationOptions {
  /** Asset's names. */
  assets?: string[];
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  assetBandIndices?: string[];
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
export interface TilerGetPartWithDimensionsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface TilerGetPartOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TilerGetAssetsInfoOptionalParams extends OperationOptions {
  /** Asset's names. */
  assets?: string[];
}

/** Optional parameters. */
export interface TilerGetInfoGeoJsonOptionalParams extends OperationOptions {
  /** Asset's names. */
  assets?: string[];
}

/** Optional parameters. */
export interface TilerGetGeoJsonStatisticsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface TilerCropGeoJsonWithDimensionsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface TilerCropGeoJsonOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TilerListBoundsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TilerListAvailableAssetsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface TilerGetAssetStatisticsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface TilerListTileMatricesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TilerGetTileMatrixDefinitionsOptionalParams
  extends OperationOptions {}
