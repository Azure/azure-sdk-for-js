// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReplicationProtectableItemsListByReplicationProtectionContainersOptionalParams extends OperationOptions {
  /** OData filter options. */
  filter?: string;
  /** take OData query parameter. */
  take?: string;
  /** skipToken OData query parameter. */
  skipToken?: string;
}

/** Optional parameters. */
export interface ReplicationProtectableItemsGetOptionalParams extends OperationOptions {}
