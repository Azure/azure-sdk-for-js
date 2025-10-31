// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StacAssetUrlSigningMode } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface StacSearchOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacGetCollectionQueryablesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacListQueryablesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacDeleteQueryableOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacReplaceQueryableOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacCreateQueryablesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacUpdateItemOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StacGetItemCollectionOptionalParams extends OperationOptions {
  /**
   * The optional limit parameter recommends the number of items that should be present in the response document.
   *
   * If the limit parameter value is greater than advertised limit maximum, the server must return the
   * maximum possible number of items, rather than responding with an error.
   *
   * Only items are counted that are on the first level of the collection in the response document.
   * Nested objects contained within the explicitly requested items must not be counted.
   *
   * Minimum = 1. Maximum = 10000. Default = 10.
   */
  limit?: number;
  /**
   * Only features that have a geometry that intersects the bounding box are selected.
   * The bounding box is provided as four or six numbers, depending on whether the
   * coordinate reference system includes a vertical axis (height or depth):
   *
   * - Lower left corner, coordinate axis 1
   * - Lower left corner, coordinate axis 2
   * - Minimum value, coordinate axis 3 (optional)
   * - Upper right corner, coordinate axis 1
   * - Upper right corner, coordinate axis 2
   * - Maximum value, coordinate axis 3 (optional)
   *
   * The coordinate reference system of the values is WGS 84 longitude/latitude
   * (http://www.opengis.net/def/crs/OGC/1.3/CRS84).
   *
   * For WGS 84 longitude/latitude the values are in most cases the sequence of
   * minimum longitude, minimum latitude, maximum longitude and maximum latitude.
   * However, in cases where the box spans the antimeridian the first value
   * (west-most box edge) is larger than the third value (east-most box edge).
   *
   * If the vertical axis is included, the third and the sixth number are
   * the bottom and the top of the 3-dimensional bounding box.
   *
   * If a feature has multiple spatial geometry properties, it is the decision of the
   * server whether only a single spatial geometry property is used to determine
   * the extent or all relevant geometries.
   */
  boundingBox?: string[];
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
}

/** Optional parameters. */
export interface StacGetItemOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacDeleteItemOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StacCreateOrReplaceItemOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StacCreateItemOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StacGetLandingPageOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacGetConformanceClassOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacReplaceTileSettingsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacGetTileSettingsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacGetCollectionThumbnailOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacListRenderOptionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacGetRenderOptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacDeleteRenderOptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacReplaceRenderOptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacCreateRenderOptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacReplacePartitionTypeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacGetPartitionTypeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacListCollectionsOptionalParams extends OperationOptions {
  /** Whether to sign asset URLs in the response. */
  sign?: StacAssetUrlSigningMode;
  /** URL signature duration in minutes. */
  durationInMinutes?: number;
}

/** Optional parameters. */
export interface StacGetCollectionOptionalParams extends OperationOptions {
  /** Whether to sign asset URLs in the response. */
  sign?: StacAssetUrlSigningMode;
  /** URL signature duration in minutes. */
  durationInMinutes?: number;
}

/** Optional parameters. */
export interface StacDeleteCollectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StacCreateOrReplaceCollectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacCreateCollectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StacListMosaicsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacGetMosaicOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacDeleteMosaicOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacReplaceMosaicOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacAddMosaicOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacGetCollectionConfigurationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacDeleteCollectionAssetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacReplaceCollectionAssetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StacCreateCollectionAssetOptionalParams extends OperationOptions {}
