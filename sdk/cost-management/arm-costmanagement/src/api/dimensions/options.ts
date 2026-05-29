// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DimensionsListByExternalCloudProviderTypeOptionalParams extends OperationOptions {
  /** May be used to filter dimensions by properties/category, properties/usageStart, properties/usageEnd. Supported operators are 'eq','lt', 'gt', 'le', 'ge'. */
  filter?: string;
  /** May be used to expand the properties/data within a dimension category. By default, data is not included when listing dimensions. */
  expand?: string;
  /** Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls. */
  skiptoken?: string;
  /** May be used to limit the number of results to the most recent N dimension data. */
  top?: number;
}

/** Optional parameters. */
export interface DimensionsListOptionalParams extends OperationOptions {
  /** May be used to filter dimensions by properties/category, properties/usageStart, properties/usageEnd. Supported operators are 'eq','lt', 'gt', 'le', 'ge'. */
  filter?: string;
  /** May be used to expand the properties/data within a dimension category. By default, data is not included when listing dimensions. */
  expand?: string;
  /** Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls. */
  skiptoken?: string;
  /** May be used to limit the number of results to the most recent N dimension data. */
  top?: number;
}
