// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { InterconnectBlockExpandTypes } from "../../models/compute/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface InterconnectBlocksListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InterconnectBlocksListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InterconnectBlocksDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InterconnectBlocksUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InterconnectBlocksCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InterconnectBlocksGetOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. 'instanceView' retrieves a snapshot of the runtime properties of the Interconnect Block that is managed by the platform and can change outside of control plane operations. */
  expand?: InterconnectBlockExpandTypes;
}
