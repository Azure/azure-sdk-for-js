// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SensitivityLabelsEnableRecommendationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SensitivityLabelsDisableRecommendationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SensitivityLabelsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SensitivityLabelsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SensitivityLabelsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SensitivityLabelsListByDatabaseOptionalParams extends OperationOptions {
  /** An OData filter expression that filters elements in the collection. */
  filter?: string;
}

/** Optional parameters. */
export interface SensitivityLabelsListRecommendedByDatabaseOptionalParams extends OperationOptions {
  skipToken?: string;
  /** Specifies whether to include disabled recommendations or not. */
  includeDisabledRecommendations?: boolean;
  /** An OData filter expression that filters elements in the collection. */
  filter?: string;
}

/** Optional parameters. */
export interface SensitivityLabelsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SensitivityLabelsListCurrentByDatabaseOptionalParams extends OperationOptions {
  skipToken?: string;
  count?: boolean;
  /** An OData filter expression that filters elements in the collection. */
  filter?: string;
}
