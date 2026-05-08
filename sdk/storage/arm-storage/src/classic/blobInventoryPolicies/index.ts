// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext } from "../../api/storageManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/blobInventoryPolicies/operations.js";
import {
  BlobInventoryPoliciesListOptionalParams,
  BlobInventoryPoliciesDeleteOptionalParams,
  BlobInventoryPoliciesCreateOrUpdateOptionalParams,
  BlobInventoryPoliciesGetOptionalParams,
} from "../../api/blobInventoryPolicies/options.js";
import { BlobInventoryPolicy, BlobInventoryPolicyName } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BlobInventoryPolicies operations. */
export interface BlobInventoryPoliciesOperations {
  /** Gets the blob inventory policy associated with the specified storage account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: BlobInventoryPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<BlobInventoryPolicy>;
  /** Deletes the blob inventory policy associated with the specified storage account. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    blobInventoryPolicyName: BlobInventoryPolicyName,
    options?: BlobInventoryPoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Sets the blob inventory policy to the specified storage account. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    blobInventoryPolicyName: BlobInventoryPolicyName,
    properties: BlobInventoryPolicy,
    options?: BlobInventoryPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<BlobInventoryPolicy>;
  /** Gets the blob inventory policy associated with the specified storage account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    blobInventoryPolicyName: BlobInventoryPolicyName,
    options?: BlobInventoryPoliciesGetOptionalParams,
  ) => Promise<BlobInventoryPolicy>;
}

function _getBlobInventoryPolicies(context: StorageManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: BlobInventoryPoliciesListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      blobInventoryPolicyName: BlobInventoryPolicyName,
      options?: BlobInventoryPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, blobInventoryPolicyName, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      blobInventoryPolicyName: BlobInventoryPolicyName,
      properties: BlobInventoryPolicy,
      options?: BlobInventoryPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        blobInventoryPolicyName,
        properties,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      blobInventoryPolicyName: BlobInventoryPolicyName,
      options?: BlobInventoryPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, blobInventoryPolicyName, options),
  };
}

export function _getBlobInventoryPoliciesOperations(
  context: StorageManagementContext,
): BlobInventoryPoliciesOperations {
  return {
    ..._getBlobInventoryPolicies(context),
  };
}
