// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  listVolumes,
  list,
  $delete,
  update,
  create,
  get,
} from "../../api/snapshotPolicies/operations.js";
import type {
  SnapshotPoliciesListVolumesOptionalParams,
  SnapshotPoliciesListOptionalParams,
  SnapshotPoliciesDeleteOptionalParams,
  SnapshotPoliciesUpdateOptionalParams,
  SnapshotPoliciesCreateOptionalParams,
  SnapshotPoliciesGetOptionalParams,
} from "../../api/snapshotPolicies/options.js";
import type {
  SnapshotPolicy,
  SnapshotPolicyPatch,
  SnapshotPolicyVolumeList,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SnapshotPolicies operations. */
export interface SnapshotPoliciesOperations {
  /** Get volumes associated with snapshot policy */
  listVolumes: (
    resourceGroupName: string,
    accountName: string,
    snapshotPolicyName: string,
    options?: SnapshotPoliciesListVolumesOptionalParams,
  ) => Promise<SnapshotPolicyVolumeList>;
  /** List snapshot policy */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: SnapshotPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<SnapshotPolicy>;
  /** Delete snapshot policy */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    snapshotPolicyName: string,
    options?: SnapshotPoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch a snapshot policy */
  update: (
    resourceGroupName: string,
    accountName: string,
    snapshotPolicyName: string,
    body: SnapshotPolicyPatch,
    options?: SnapshotPoliciesUpdateOptionalParams,
  ) => PollerLike<OperationState<SnapshotPolicy>, SnapshotPolicy>;
  /** Create a snapshot policy */
  create: (
    resourceGroupName: string,
    accountName: string,
    snapshotPolicyName: string,
    body: SnapshotPolicy,
    options?: SnapshotPoliciesCreateOptionalParams,
  ) => Promise<SnapshotPolicy>;
  /** Get a snapshot Policy */
  get: (
    resourceGroupName: string,
    accountName: string,
    snapshotPolicyName: string,
    options?: SnapshotPoliciesGetOptionalParams,
  ) => Promise<SnapshotPolicy>;
}

function _getSnapshotPolicies(context: NetAppManagementContext) {
  return {
    listVolumes: (
      resourceGroupName: string,
      accountName: string,
      snapshotPolicyName: string,
      options?: SnapshotPoliciesListVolumesOptionalParams,
    ) => listVolumes(context, resourceGroupName, accountName, snapshotPolicyName, options),
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: SnapshotPoliciesListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      snapshotPolicyName: string,
      options?: SnapshotPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, snapshotPolicyName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      snapshotPolicyName: string,
      body: SnapshotPolicyPatch,
      options?: SnapshotPoliciesUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, snapshotPolicyName, body, options),
    create: (
      resourceGroupName: string,
      accountName: string,
      snapshotPolicyName: string,
      body: SnapshotPolicy,
      options?: SnapshotPoliciesCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, snapshotPolicyName, body, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      snapshotPolicyName: string,
      options?: SnapshotPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, snapshotPolicyName, options),
  };
}

export function _getSnapshotPoliciesOperations(
  context: NetAppManagementContext,
): SnapshotPoliciesOperations {
  return {
    ..._getSnapshotPolicies(context),
  };
}
