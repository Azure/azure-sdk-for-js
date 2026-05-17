// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIVMManagementContext } from "../../api/azureStackHcivmManagementContext.js";
import {
  listAll,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/publicIPAddresses/operations.js";
import type {
  PublicIPAddressesListAllOptionalParams,
  PublicIPAddressesListByResourceGroupOptionalParams,
  PublicIPAddressesDeleteOptionalParams,
  PublicIPAddressesUpdateTagsOptionalParams,
  PublicIPAddressesCreateOrUpdateOptionalParams,
  PublicIPAddressesGetOptionalParams,
} from "../../api/publicIPAddresses/options.js";
import type { PublicIPAddress, PublicIPAddressTagsUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PublicIPAddresses operations. */
export interface PublicIPAddressesOperations {
  /** Lists all of the publicIPAddresses in the specified subscription. Use the nextLink property in the response to get the next page of PublicIP. */
  listAll: (
    options?: PublicIPAddressesListAllOptionalParams,
  ) => PagedAsyncIterableIterator<PublicIPAddress>;
  /** Lists all of the publicIPAddresses in the specified resource group. Use the nextLink property in the response to get the next page of PublicIP. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PublicIPAddressesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PublicIPAddress>;
  /** The operation to delete a publicIPAddresses. */
  delete: (
    resourceGroupName: string,
    publicIPAddressName: string,
    options?: PublicIPAddressesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a publicIPAddress tags. */
  updateTags: (
    resourceGroupName: string,
    publicIPAddressName: string,
    properties: PublicIPAddressTagsUpdate,
    options?: PublicIPAddressesUpdateTagsOptionalParams,
  ) => PollerLike<OperationState<PublicIPAddress>, PublicIPAddress>;
  /** The operation to create or update a publicIPAddress. Please note some properties can be set only during PublicIP creation. */
  createOrUpdate: (
    resourceGroupName: string,
    publicIPAddressName: string,
    resource: PublicIPAddress,
    options?: PublicIPAddressesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PublicIPAddress>, PublicIPAddress>;
  /** The operation to get a virtual network. */
  get: (
    resourceGroupName: string,
    publicIPAddressName: string,
    options?: PublicIPAddressesGetOptionalParams,
  ) => Promise<PublicIPAddress>;
}

function _getPublicIPAddresses(context: AzureStackHCIVMManagementContext) {
  return {
    listAll: (options?: PublicIPAddressesListAllOptionalParams) => listAll(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: PublicIPAddressesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      publicIPAddressName: string,
      options?: PublicIPAddressesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, publicIPAddressName, options),
    updateTags: (
      resourceGroupName: string,
      publicIPAddressName: string,
      properties: PublicIPAddressTagsUpdate,
      options?: PublicIPAddressesUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, publicIPAddressName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      publicIPAddressName: string,
      resource: PublicIPAddress,
      options?: PublicIPAddressesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, publicIPAddressName, resource, options),
    get: (
      resourceGroupName: string,
      publicIPAddressName: string,
      options?: PublicIPAddressesGetOptionalParams,
    ) => get(context, resourceGroupName, publicIPAddressName, options),
  };
}

export function _getPublicIPAddressesOperations(
  context: AzureStackHCIVMManagementContext,
): PublicIPAddressesOperations {
  return {
    ..._getPublicIPAddresses(context),
  };
}
