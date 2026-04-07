// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedDatabaseSensitivityLabelsListByDatabaseOptionalParams extends OperationOptions {
  /** An OData filter expression that filters elements in the collection. */
  filter?: string;
}

/** Optional parameters. */
export interface ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseOptionalParams extends OperationOptions {
  skipToken?: string;
  /** Specifies whether to include disabled recommendations or not. */
  includeDisabledRecommendations?: boolean;
  /** An OData filter expression that filters elements in the collection. */
  filter?: string;
}

/** Optional parameters. */
export interface ManagedDatabaseSensitivityLabelsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedDatabaseSensitivityLabelsListCurrentByDatabaseOptionalParams extends OperationOptions {
  skipToken?: string;
  count?: boolean;
  /** An OData filter expression that filters elements in the collection. */
  filter?: string;
}

/** Optional parameters. */
export interface ManagedDatabaseSensitivityLabelsEnableRecommendationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedDatabaseSensitivityLabelsDisableRecommendationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedDatabaseSensitivityLabelsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedDatabaseSensitivityLabelsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedDatabaseSensitivityLabelsGetOptionalParams extends OperationOptions {}
