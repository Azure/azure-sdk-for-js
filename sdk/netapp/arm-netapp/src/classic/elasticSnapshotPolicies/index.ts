// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  listElasticVolumes,
  listByElasticAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/elasticSnapshotPolicies/operations.js";
import type {
  ElasticSnapshotPoliciesListElasticVolumesOptionalParams,
  ElasticSnapshotPoliciesListByElasticAccountOptionalParams,
  ElasticSnapshotPoliciesDeleteOptionalParams,
  ElasticSnapshotPoliciesUpdateOptionalParams,
  ElasticSnapshotPoliciesCreateOrUpdateOptionalParams,
  ElasticSnapshotPoliciesGetOptionalParams,
} from "../../api/elasticSnapshotPolicies/options.js";
import type {
  ElasticVolume,
  ElasticSnapshotPolicy,
  ElasticSnapshotPolicyUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ElasticSnapshotPolicies operations. */
export interface ElasticSnapshotPoliciesOperations {
  /** Get elastic volumes associated with Elastic Snapshot Policy */
  listElasticVolumes: (
    resourceGroupName: string,
    accountName: string,
    snapshotPolicyName: string,
    options?: ElasticSnapshotPoliciesListElasticVolumesOptionalParams,
  ) => PagedAsyncIterableIterator<ElasticVolume>;
  /** List ElasticSnapshotPolicy resources by ElasticAccount */
  listByElasticAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: ElasticSnapshotPoliciesListByElasticAccountOptionalParams,
  ) => PagedAsyncIterableIterator<ElasticSnapshotPolicy>;
  /** Delete a ElasticSnapshotPolicy */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    snapshotPolicyName: string,
    options?: ElasticSnapshotPoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a ElasticSnapshotPolicy */
  update: (
    resourceGroupName: string,
    accountName: string,
    snapshotPolicyName: string,
    body: ElasticSnapshotPolicyUpdate,
    options?: ElasticSnapshotPoliciesUpdateOptionalParams,
  ) => PollerLike<OperationState<ElasticSnapshotPolicy>, ElasticSnapshotPolicy>;
  /** Create a ElasticSnapshotPolicy */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    snapshotPolicyName: string,
    body: ElasticSnapshotPolicy,
    options?: ElasticSnapshotPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ElasticSnapshotPolicy>, ElasticSnapshotPolicy>;
  /** Get a ElasticSnapshotPolicy */
  get: (
    resourceGroupName: string,
    accountName: string,
    snapshotPolicyName: string,
    options?: ElasticSnapshotPoliciesGetOptionalParams,
  ) => Promise<ElasticSnapshotPolicy>;
}

function _getElasticSnapshotPolicies(context: NetAppManagementContext) {
  return {
    listElasticVolumes: (
      resourceGroupName: string,
      accountName: string,
      snapshotPolicyName: string,
      options?: ElasticSnapshotPoliciesListElasticVolumesOptionalParams,
    ) => listElasticVolumes(context, resourceGroupName, accountName, snapshotPolicyName, options),
    listByElasticAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: ElasticSnapshotPoliciesListByElasticAccountOptionalParams,
    ) => listByElasticAccount(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      snapshotPolicyName: string,
      options?: ElasticSnapshotPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, snapshotPolicyName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      snapshotPolicyName: string,
      body: ElasticSnapshotPolicyUpdate,
      options?: ElasticSnapshotPoliciesUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, snapshotPolicyName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      snapshotPolicyName: string,
      body: ElasticSnapshotPolicy,
      options?: ElasticSnapshotPoliciesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, accountName, snapshotPolicyName, body, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      snapshotPolicyName: string,
      options?: ElasticSnapshotPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, snapshotPolicyName, options),
  };
}

export function _getElasticSnapshotPoliciesOperations(
  context: NetAppManagementContext,
): ElasticSnapshotPoliciesOperations {
  return {
    ..._getElasticSnapshotPolicies(context),
  };
}
