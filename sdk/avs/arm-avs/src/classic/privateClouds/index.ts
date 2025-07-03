// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import { PrivateCloud, PrivateCloudUpdate, AdminCredentials } from "../../models/models.js";
import {
  PrivateCloudsListAdminCredentialsOptionalParams,
  PrivateCloudsRotateNsxtPasswordOptionalParams,
  PrivateCloudsRotateVcenterPasswordOptionalParams,
  PrivateCloudsDeleteOptionalParams,
  PrivateCloudsUpdateOptionalParams,
  PrivateCloudsCreateOrUpdateOptionalParams,
  PrivateCloudsGetOptionalParams,
  PrivateCloudsListInSubscriptionOptionalParams,
  PrivateCloudsListOptionalParams,
} from "../../api/privateClouds/options.js";
import {
  listAdminCredentials,
  rotateNsxtPassword,
  rotateVcenterPassword,
  $delete,
  update,
  createOrUpdate,
  get,
  listInSubscription,
  list,
} from "../../api/privateClouds/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateClouds operations. */
export interface PrivateCloudsOperations {
  /** List the admin credentials for the private cloud */
  listAdminCredentials: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: PrivateCloudsListAdminCredentialsOptionalParams,
  ) => Promise<AdminCredentials>;
  /** Rotate the NSX-T Manager password */
  rotateNsxtPassword: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: PrivateCloudsRotateNsxtPasswordOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Rotate the vCenter password */
  rotateVcenterPassword: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: PrivateCloudsRotateVcenterPasswordOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Delete a PrivateCloud */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: PrivateCloudsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a PrivateCloud */
  update: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    privateCloudUpdate: PrivateCloudUpdate,
    options?: PrivateCloudsUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateCloud>, PrivateCloud>;
  /** Create a PrivateCloud */
  createOrUpdate: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    privateCloud: PrivateCloud,
    options?: PrivateCloudsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateCloud>, PrivateCloud>;
  /** Get a PrivateCloud */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: PrivateCloudsGetOptionalParams,
  ) => Promise<PrivateCloud>;
  /** List PrivateCloud resources by subscription ID */
  listInSubscription: (
    apiVersion: string,
    options?: PrivateCloudsListInSubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateCloud>;
  /** List PrivateCloud resources by resource group */
  list: (
    apiVersion: string,
    resourceGroupName: string,
    options?: PrivateCloudsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateCloud>;
}

function _getPrivateClouds(context: AzureVMwareSolutionAPIContext) {
  return {
    listAdminCredentials: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: PrivateCloudsListAdminCredentialsOptionalParams,
    ) => listAdminCredentials(context, apiVersion, resourceGroupName, privateCloudName, options),
    rotateNsxtPassword: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: PrivateCloudsRotateNsxtPasswordOptionalParams,
    ) => rotateNsxtPassword(context, apiVersion, resourceGroupName, privateCloudName, options),
    rotateVcenterPassword: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: PrivateCloudsRotateVcenterPasswordOptionalParams,
    ) => rotateVcenterPassword(context, apiVersion, resourceGroupName, privateCloudName, options),
    delete: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: PrivateCloudsDeleteOptionalParams,
    ) => $delete(context, apiVersion, resourceGroupName, privateCloudName, options),
    update: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      privateCloudUpdate: PrivateCloudUpdate,
      options?: PrivateCloudsUpdateOptionalParams,
    ) =>
      update(context, apiVersion, resourceGroupName, privateCloudName, privateCloudUpdate, options),
    createOrUpdate: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      privateCloud: PrivateCloud,
      options?: PrivateCloudsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        privateCloud,
        options,
      ),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: PrivateCloudsGetOptionalParams,
    ) => get(context, apiVersion, resourceGroupName, privateCloudName, options),
    listInSubscription: (
      apiVersion: string,
      options?: PrivateCloudsListInSubscriptionOptionalParams,
    ) => listInSubscription(context, apiVersion, options),
    list: (
      apiVersion: string,
      resourceGroupName: string,
      options?: PrivateCloudsListOptionalParams,
    ) => list(context, apiVersion, resourceGroupName, options),
  };
}

export function _getPrivateCloudsOperations(
  context: AzureVMwareSolutionAPIContext,
): PrivateCloudsOperations {
  return {
    ..._getPrivateClouds(context),
  };
}
