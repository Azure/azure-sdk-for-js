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
export interface DataGetMosaicsWmtsCapabilitiesOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface DataGetMosaicsTileOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataGetMosaicsTileJsonOptionalParams
  extends OperationOptions {}

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
  extends OperationOptions {}

/** Optional parameters. */
export interface DataGetTileOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataGetTileJsonOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataListStatisticsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataGetStaticImageOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataCreateStaticImageOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataGetPreviewWithFormatOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface DataGetPreviewOptionalParams extends OperationOptions {}

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
  extends OperationOptions {}

/** Optional parameters. */
export interface DataGetPartOptionalParams extends OperationOptions {}

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
  extends OperationOptions {}

/** Optional parameters. */
export interface DataCropGeoJsonWithDimensionsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface DataCropGeoJsonOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataGetBoundsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataListAvailableAssetsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface DataGetAssetStatisticsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface DataListTileMatricesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataGetTileMatrixDefinitionsOptionalParams
  extends OperationOptions {}
