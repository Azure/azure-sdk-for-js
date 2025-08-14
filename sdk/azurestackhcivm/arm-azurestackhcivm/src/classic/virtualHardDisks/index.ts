// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementContext } from "../../api/azureStackHcivmManagementContext.js";
import {
  upload,
  listAll,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/virtualHardDisks/operations.js";
import {
  VirtualHardDisksUploadOptionalParams,
  VirtualHardDisksListAllOptionalParams,
  VirtualHardDisksListByResourceGroupOptionalParams,
  VirtualHardDisksDeleteOptionalParams,
  VirtualHardDisksUpdateOptionalParams,
  VirtualHardDisksCreateOrUpdateOptionalParams,
  VirtualHardDisksGetOptionalParams,
} from "../../api/virtualHardDisks/options.js";
import {
  VirtualHardDisk,
  VirtualHardDisksUpdateRequest,
  VirtualHardDiskUploadRequest,
  VirtualHardDiskUploadResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualHardDisks operations. */
export interface VirtualHardDisksOperations {
  /** The operation to upload a virtual hard disk. */
  upload: (
    resourceGroupName: string,
    virtualHardDiskName: string,
    body: VirtualHardDiskUploadRequest,
    options?: VirtualHardDisksUploadOptionalParams,
  ) => PollerLike<OperationState<VirtualHardDiskUploadResponse>, VirtualHardDiskUploadResponse>;
  /** Lists all of the virtual hard disks in the specified subscription. Use the nextLink property in the response to get the next page of virtual hard disks. */
  listAll: (
    options?: VirtualHardDisksListAllOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualHardDisk>;
  /** Lists all of the virtual hard disks in the specified resource group. Use the nextLink property in the response to get the next page of virtual hard disks. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: VirtualHardDisksListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualHardDisk>;
  /** The operation to delete a virtual hard disk. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualHardDiskName: string,
    options?: VirtualHardDisksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to update a virtual hard disk. */
  update: (
    resourceGroupName: string,
    virtualHardDiskName: string,
    properties: VirtualHardDisksUpdateRequest,
    options?: VirtualHardDisksUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualHardDisk>, VirtualHardDisk>;
  /** The operation to create or update a virtual hard disk. Please note some properties can be set only during virtual hard disk creation. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualHardDiskName: string,
    resource: VirtualHardDisk,
    options?: VirtualHardDisksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualHardDisk>, VirtualHardDisk>;
  /** Gets a virtual hard disk */
  get: (
    resourceGroupName: string,
    virtualHardDiskName: string,
    options?: VirtualHardDisksGetOptionalParams,
  ) => Promise<VirtualHardDisk>;
}

function _getVirtualHardDisks(context: AzureStackHCIVMManagementContext) {
  return {
    upload: (
      resourceGroupName: string,
      virtualHardDiskName: string,
      body: VirtualHardDiskUploadRequest,
      options?: VirtualHardDisksUploadOptionalParams,
    ) => upload(context, resourceGroupName, virtualHardDiskName, body, options),
    listAll: (options?: VirtualHardDisksListAllOptionalParams) => listAll(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: VirtualHardDisksListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      virtualHardDiskName: string,
      options?: VirtualHardDisksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualHardDiskName, options),
    update: (
      resourceGroupName: string,
      virtualHardDiskName: string,
      properties: VirtualHardDisksUpdateRequest,
      options?: VirtualHardDisksUpdateOptionalParams,
    ) => update(context, resourceGroupName, virtualHardDiskName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      virtualHardDiskName: string,
      resource: VirtualHardDisk,
      options?: VirtualHardDisksCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, virtualHardDiskName, resource, options),
    get: (
      resourceGroupName: string,
      virtualHardDiskName: string,
      options?: VirtualHardDisksGetOptionalParams,
    ) => get(context, resourceGroupName, virtualHardDiskName, options),
  };
}

export function _getVirtualHardDisksOperations(
  context: AzureStackHCIVMManagementContext,
): VirtualHardDisksOperations {
  return {
    ..._getVirtualHardDisks(context),
  };
}
