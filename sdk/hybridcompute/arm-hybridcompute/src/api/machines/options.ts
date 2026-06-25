// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InstanceViewTypes } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MachinesInstallPatchesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MachinesAssessPatchesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MachinesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MachinesListByResourceGroupOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}

/** Optional parameters. */
export interface MachinesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MachinesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MachinesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}

/** Optional parameters. */
export interface MachinesGetOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: InstanceViewTypes;
}
