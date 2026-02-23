// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  UnmanageActionResourceMode,
  UnmanageActionResourceGroupMode,
  UnmanageActionManagementGroupMode,
  ResourcesWithoutDeleteSupportAction,
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
  unmanageActionResources?: UnmanageActionResourceMode;
  /** Flag to indicate delete rather than detach for unmanaged resource groups. */
  unmanageActionResourceGroups?: UnmanageActionResourceGroupMode;
  /** Flag to indicate delete rather than detach for unmanaged management groups. */
  unmanageActionManagementGroups?: UnmanageActionManagementGroupMode;
  /** Some resources do not support deletion.  This flag will denote how the stack should handle those resources. */
  unmanageActionResourcesWithoutDeleteSupport?: ResourcesWithoutDeleteSupportAction;
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
