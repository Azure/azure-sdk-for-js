// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ImpactCategoriesListBySubscriptionOptionalParams extends OperationOptions {
  /** Filter by category name */
  categoryName?: string;
  /** Filter by resource type */
  resourceType?: string;
}

/** Optional parameters. */
export interface ImpactCategoriesGetOptionalParams extends OperationOptions {}
