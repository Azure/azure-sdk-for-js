// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppConfigurationManagementContext } from "../../api/appConfigurationManagementContext.js";
import { create, get } from "../../api/snapshots/operations.js";
import type {
  SnapshotsCreateOptionalParams,
  SnapshotsGetOptionalParams,
} from "../../api/snapshots/options.js";
import type { Snapshot } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Snapshots operations. */
export interface SnapshotsOperations {
  /** Creates a snapshot. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration snapshots the data plane API should be used instead. */
  create: (
    resourceGroupName: string,
    configStoreName: string,
    snapshotName: string,
    body: Snapshot,
    options?: SnapshotsCreateOptionalParams,
  ) => PollerLike<OperationState<Snapshot>, Snapshot>;
  /** Gets the properties of the specified snapshot. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration snapshots the data plane API should be used instead. */
  get: (
    resourceGroupName: string,
    configStoreName: string,
    snapshotName: string,
    options?: SnapshotsGetOptionalParams,
  ) => Promise<Snapshot>;
}

function _getSnapshots(context: AppConfigurationManagementContext) {
  return {
    create: (
      resourceGroupName: string,
      configStoreName: string,
      snapshotName: string,
      body: Snapshot,
      options?: SnapshotsCreateOptionalParams,
    ) => create(context, resourceGroupName, configStoreName, snapshotName, body, options),
    get: (
      resourceGroupName: string,
      configStoreName: string,
      snapshotName: string,
      options?: SnapshotsGetOptionalParams,
    ) => get(context, resourceGroupName, configStoreName, snapshotName, options),
  };
}

export function _getSnapshotsOperations(
  context: AppConfigurationManagementContext,
): SnapshotsOperations {
  return {
    ..._getSnapshots(context),
  };
}
