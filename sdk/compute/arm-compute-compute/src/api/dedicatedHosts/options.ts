// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { InstanceViewTypes } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DedicatedHostsRestartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DedicatedHostsRedeployOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DedicatedHostsListAvailableSizesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DedicatedHostsListByHostGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DedicatedHostsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DedicatedHostsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DedicatedHostsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DedicatedHostsGetOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. 'InstanceView' will retrieve the list of instance views of the dedicated host. 'UserData' is not supported for dedicated host. */
  expand?: InstanceViewTypes;
}
