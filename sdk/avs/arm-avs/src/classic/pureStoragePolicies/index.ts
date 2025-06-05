// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import { PureStoragePolicy } from "../../models/models.js";
import {
  PureStoragePoliciesDeleteOptionalParams,
  PureStoragePoliciesCreateOrUpdateOptionalParams,
  PureStoragePoliciesGetOptionalParams,
  PureStoragePoliciesListOptionalParams,
} from "../../api/pureStoragePolicies/options.js";
import { $delete, createOrUpdate, get, list } from "../../api/pureStoragePolicies/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PureStoragePolicies operations. */
export interface PureStoragePoliciesOperations {
  /** Delete a PureStoragePolicy */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    privateCloudName: string,
    storagePolicyName: string,
    options?: PureStoragePoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a PureStoragePolicy */
  createOrUpdate: (
    resourceGroupName: string,
    privateCloudName: string,
    storagePolicyName: string,
    resource: PureStoragePolicy,
    options?: PureStoragePoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PureStoragePolicy>, PureStoragePolicy>;
  /** Get a PureStoragePolicy */
  get: (
    resourceGroupName: string,
    privateCloudName: string,
    storagePolicyName: string,
    options?: PureStoragePoliciesGetOptionalParams,
  ) => Promise<PureStoragePolicy>;
  /** List PureStoragePolicy resources by PrivateCloud */
  list: (
    resourceGroupName: string,
    privateCloudName: string,
    options?: PureStoragePoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<PureStoragePolicy>;
}

function _getPureStoragePolicies(context: AzureVMwareSolutionAPIContext) {
  return {
    delete: (
      resourceGroupName: string,
      privateCloudName: string,
      storagePolicyName: string,
      options?: PureStoragePoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, privateCloudName, storagePolicyName, options),
    createOrUpdate: (
      resourceGroupName: string,
      privateCloudName: string,
      storagePolicyName: string,
      resource: PureStoragePolicy,
      options?: PureStoragePoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        privateCloudName,
        storagePolicyName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      privateCloudName: string,
      storagePolicyName: string,
      options?: PureStoragePoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, privateCloudName, storagePolicyName, options),
    list: (
      resourceGroupName: string,
      privateCloudName: string,
      options?: PureStoragePoliciesListOptionalParams,
    ) => list(context, resourceGroupName, privateCloudName, options),
  };
}

export function _getPureStoragePoliciesOperations(
  context: AzureVMwareSolutionAPIContext,
): PureStoragePoliciesOperations {
  return {
    ..._getPureStoragePolicies(context),
  };
}
