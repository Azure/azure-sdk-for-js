// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedTrafficConfigResourcesUpdateManagedTrafficConfigOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedTrafficConfigResourcesGetManagedTrafficConfigOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedTrafficConfigResourcesListManagedTrafficConfigsOptionalParams extends OperationOptions {
  /** Set to `endpoints` to return the endpoint collection without projection, including both weight and priority for every endpoint. */
  expand?: string;
}
