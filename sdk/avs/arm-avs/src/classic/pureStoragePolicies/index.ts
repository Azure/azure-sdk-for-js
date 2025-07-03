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
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    storagePolicyName: string,
    options?: PureStoragePoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a PureStoragePolicy */
  createOrUpdate: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    storagePolicyName: string,
    resource: PureStoragePolicy,
    options?: PureStoragePoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PureStoragePolicy>, PureStoragePolicy>;
  /** Get a PureStoragePolicy */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    storagePolicyName: string,
    options?: PureStoragePoliciesGetOptionalParams,
  ) => Promise<PureStoragePolicy>;
  /** List PureStoragePolicy resources by PrivateCloud */
  list: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: PureStoragePoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<PureStoragePolicy>;
}

function _getPureStoragePolicies(context: AzureVMwareSolutionAPIContext) {
  return {
    delete: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      storagePolicyName: string,
      options?: PureStoragePoliciesDeleteOptionalParams,
    ) =>
      $delete(context, apiVersion, resourceGroupName, privateCloudName, storagePolicyName, options),
    createOrUpdate: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      storagePolicyName: string,
      resource: PureStoragePolicy,
      options?: PureStoragePoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        storagePolicyName,
        resource,
        options,
      ),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      storagePolicyName: string,
      options?: PureStoragePoliciesGetOptionalParams,
    ) => get(context, apiVersion, resourceGroupName, privateCloudName, storagePolicyName, options),
    list: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: PureStoragePoliciesListOptionalParams,
    ) => list(context, apiVersion, resourceGroupName, privateCloudName, options),
  };
}

export function _getPureStoragePoliciesOperations(
  context: AzureVMwareSolutionAPIContext,
): PureStoragePoliciesOperations {
  return {
    ..._getPureStoragePolicies(context),
  };
}
