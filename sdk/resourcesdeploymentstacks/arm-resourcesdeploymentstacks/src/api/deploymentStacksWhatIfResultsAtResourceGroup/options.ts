// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DeploymentStacksDeleteDetachEnum,
  DeploymentStacksResourcesWithoutDeleteSupportEnum,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DeploymentStacksWhatIfResultsAtResourceGroupWhatIfOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentStacksWhatIfResultsAtResourceGroupDeleteOptionalParams extends OperationOptions {
  /** Flag to indicate delete rather than detach for unmanaged resources. */
  unmanageActionResources?: DeploymentStacksDeleteDetachEnum;
  /** Flag to indicate delete rather than detach for unmanaged resource groups. */
  unmanageActionResourceGroups?: DeploymentStacksDeleteDetachEnum;
  /** Flag to indicate delete rather than detach for unmanaged management groups. */
  unmanageActionManagementGroups?: DeploymentStacksDeleteDetachEnum;
  /** Some resources do not support deletion.  This flag will denote how the stack should handle those resources. */
  unmanageActionResourcesWithoutDeleteSupport?: DeploymentStacksResourcesWithoutDeleteSupportEnum;
  /** Flag to bypass service errors that indicate the stack resource list is not correctly synchronized. */
  bypassStackOutOfSyncError?: boolean;
}

/** Optional parameters. */
export interface DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentStacksWhatIfResultsAtResourceGroupListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentStacksWhatIfResultsAtResourceGroupGetOptionalParams extends OperationOptions {}
