// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PageOrder } from "../../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaManagedAgentIdentityBlueprintsListOptionalParams extends OperationOptions {
  /**
   * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and`desc`
   * for descending order.
   */
  order?: PageOrder;
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the
   * default is 20.
   */
  limit?: number;
}

/** Optional parameters. */
export interface BetaManagedAgentIdentityBlueprintsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaManagedAgentIdentityBlueprintsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateOrUpdateOptionalParams extends OperationOptions {}
