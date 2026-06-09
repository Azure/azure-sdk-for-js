// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReportsListByRequestOptionalParams extends OperationOptions {
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface ReportsListByTimeOptionalParams extends OperationOptions {
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
  /** OData order by query option. */
  orderby?: string;
}

/** Optional parameters. */
export interface ReportsListBySubscriptionOptionalParams extends OperationOptions {
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
  /** OData order by query option. */
  orderby?: string;
}

/** Optional parameters. */
export interface ReportsListByGeoOptionalParams extends OperationOptions {
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface ReportsListByProductOptionalParams extends OperationOptions {
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
  /** OData order by query option. */
  orderby?: string;
}

/** Optional parameters. */
export interface ReportsListByOperationOptionalParams extends OperationOptions {
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
  /** OData order by query option. */
  orderby?: string;
}

/** Optional parameters. */
export interface ReportsListByUserOptionalParams extends OperationOptions {
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
  /** OData order by query option. */
  orderby?: string;
}

/** Optional parameters. */
export interface ReportsListByApiOptionalParams extends OperationOptions {
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
  /** OData order by query option. */
  orderby?: string;
}
