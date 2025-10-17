// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import {
  getVcfLicense,
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
import type {
  PrivateCloudsGetVcfLicenseOptionalParams,
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
import type {
  PrivateCloud,
  VcfLicenseUnion,
  PrivateCloudUpdate,
  AdminCredentials,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateClouds operations. */
export interface PrivateCloudsOperations {
  /** Get the license for the private cloud */
  getVcfLicense: (
    resourceGroupName: string,
    privateCloudName: string,
    options?: PrivateCloudsGetVcfLicenseOptionalParams,
  ) => Promise<VcfLicenseUnion>;
  /** List the admin credentials for the private cloud */
  listAdminCredentials: (
    resourceGroupName: string,
    privateCloudName: string,
    options?: PrivateCloudsListAdminCredentialsOptionalParams,
  ) => Promise<AdminCredentials>;
  /** Rotate the NSX-T Manager password */
  rotateNsxtPassword: (
    resourceGroupName: string,
    privateCloudName: string,
    options?: PrivateCloudsRotateNsxtPasswordOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Rotate the vCenter password */
  rotateVcenterPassword: (
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
    resourceGroupName: string,
    privateCloudName: string,
    options?: PrivateCloudsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a PrivateCloud */
  update: (
    resourceGroupName: string,
    privateCloudName: string,
    privateCloudUpdate: PrivateCloudUpdate,
    options?: PrivateCloudsUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateCloud>, PrivateCloud>;
  /** Create a PrivateCloud */
  createOrUpdate: (
    resourceGroupName: string,
    privateCloudName: string,
    privateCloud: PrivateCloud,
    options?: PrivateCloudsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateCloud>, PrivateCloud>;
  /** Get a PrivateCloud */
  get: (
    resourceGroupName: string,
    privateCloudName: string,
    options?: PrivateCloudsGetOptionalParams,
  ) => Promise<PrivateCloud>;
  /** List PrivateCloud resources by subscription ID */
  listInSubscription: (
    options?: PrivateCloudsListInSubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateCloud>;
  /** List PrivateCloud resources by resource group */
  list: (
    resourceGroupName: string,
    options?: PrivateCloudsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateCloud>;
}

function _getPrivateClouds(context: AzureVMwareSolutionAPIContext) {
  return {
    getVcfLicense: (
      resourceGroupName: string,
      privateCloudName: string,
      options?: PrivateCloudsGetVcfLicenseOptionalParams,
    ) => getVcfLicense(context, resourceGroupName, privateCloudName, options),
    listAdminCredentials: (
      resourceGroupName: string,
      privateCloudName: string,
      options?: PrivateCloudsListAdminCredentialsOptionalParams,
    ) => listAdminCredentials(context, resourceGroupName, privateCloudName, options),
    rotateNsxtPassword: (
      resourceGroupName: string,
      privateCloudName: string,
      options?: PrivateCloudsRotateNsxtPasswordOptionalParams,
    ) => rotateNsxtPassword(context, resourceGroupName, privateCloudName, options),
    rotateVcenterPassword: (
      resourceGroupName: string,
      privateCloudName: string,
      options?: PrivateCloudsRotateVcenterPasswordOptionalParams,
    ) => rotateVcenterPassword(context, resourceGroupName, privateCloudName, options),
    delete: (
      resourceGroupName: string,
      privateCloudName: string,
      options?: PrivateCloudsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, privateCloudName, options),
    update: (
      resourceGroupName: string,
      privateCloudName: string,
      privateCloudUpdate: PrivateCloudUpdate,
      options?: PrivateCloudsUpdateOptionalParams,
    ) => update(context, resourceGroupName, privateCloudName, privateCloudUpdate, options),
    createOrUpdate: (
      resourceGroupName: string,
      privateCloudName: string,
      privateCloud: PrivateCloud,
      options?: PrivateCloudsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, privateCloudName, privateCloud, options),
    get: (
      resourceGroupName: string,
      privateCloudName: string,
      options?: PrivateCloudsGetOptionalParams,
    ) => get(context, resourceGroupName, privateCloudName, options),
    listInSubscription: (options?: PrivateCloudsListInSubscriptionOptionalParams) =>
      listInSubscription(context, options),
    list: (resourceGroupName: string, options?: PrivateCloudsListOptionalParams) =>
      list(context, resourceGroupName, options),
  };
}

export function _getPrivateCloudsOperations(
  context: AzureVMwareSolutionAPIContext,
): PrivateCloudsOperations {
  return {
    ..._getPrivateClouds(context),
  };
}
