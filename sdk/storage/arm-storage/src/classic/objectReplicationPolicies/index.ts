// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext } from "../../api/storageManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/objectReplicationPolicies/operations.js";
import type {
  ObjectReplicationPoliciesListOptionalParams,
  ObjectReplicationPoliciesDeleteOptionalParams,
  ObjectReplicationPoliciesCreateOrUpdateOptionalParams,
  ObjectReplicationPoliciesGetOptionalParams,
} from "../../api/objectReplicationPolicies/options.js";
import type { ObjectReplicationPolicy } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ObjectReplicationPolicies operations. */
export interface ObjectReplicationPoliciesOperations {
  /** List the object replication policies associated with the storage account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: ObjectReplicationPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<ObjectReplicationPolicy>;
  /** Deletes the object replication policy associated with the specified storage account. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    objectReplicationPolicyId: string,
    options?: ObjectReplicationPoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update the object replication policy of the storage account. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    objectReplicationPolicyId: string,
    properties: ObjectReplicationPolicy,
    options?: ObjectReplicationPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<ObjectReplicationPolicy>;
  /** Get the object replication policy of the storage account by policy ID. */
  get: (
    resourceGroupName: string,
    accountName: string,
    objectReplicationPolicyId: string,
    options?: ObjectReplicationPoliciesGetOptionalParams,
  ) => Promise<ObjectReplicationPolicy>;
}

function _getObjectReplicationPolicies(context: StorageManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: ObjectReplicationPoliciesListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      objectReplicationPolicyId: string,
      options?: ObjectReplicationPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, objectReplicationPolicyId, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      objectReplicationPolicyId: string,
      properties: ObjectReplicationPolicy,
      options?: ObjectReplicationPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        objectReplicationPolicyId,
        properties,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      objectReplicationPolicyId: string,
      options?: ObjectReplicationPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, objectReplicationPolicyId, options),
  };
}

export function _getObjectReplicationPoliciesOperations(
  context: StorageManagementContext,
): ObjectReplicationPoliciesOperations {
  return {
    ..._getObjectReplicationPolicies(context),
  };
}
