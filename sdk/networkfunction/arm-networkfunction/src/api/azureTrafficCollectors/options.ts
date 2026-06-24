// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ResourceReference } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AzureTrafficCollectorsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AzureTrafficCollectorsUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AzureTrafficCollectorsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AzureTrafficCollectorsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The virtualHub to which the Azure Traffic Collector belongs. */
  virtualHub?: ResourceReference;
}
