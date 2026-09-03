// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import {
  listByParent,
  $delete,
  get,
  createOrUpdate,
} from "../../api/virtualNetworkAddresses/operations.js";
import type {
  VirtualNetworkAddressesListByParentOptionalParams,
  VirtualNetworkAddressesDeleteOptionalParams,
  VirtualNetworkAddressesGetOptionalParams,
  VirtualNetworkAddressesCreateOrUpdateOptionalParams,
} from "../../api/virtualNetworkAddresses/options.js";
import type { VirtualNetworkAddress } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualNetworkAddresses operations. */
export interface VirtualNetworkAddressesOperations {
  /** List VirtualNetworkAddress resources by CloudVmCluster */
  listByParent: (
    resourceGroupName: string,
    cloudvmclustername: string,
    options?: VirtualNetworkAddressesListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetworkAddress>;
  /** Delete a VirtualNetworkAddress */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    cloudvmclustername: string,
    virtualnetworkaddressname: string,
    options?: VirtualNetworkAddressesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get a VirtualNetworkAddress */
  get: (
    resourceGroupName: string,
    cloudvmclustername: string,
    virtualnetworkaddressname: string,
    options?: VirtualNetworkAddressesGetOptionalParams,
  ) => Promise<VirtualNetworkAddress>;
  /** Create a VirtualNetworkAddress */
  createOrUpdate: (
    resourceGroupName: string,
    cloudvmclustername: string,
    virtualnetworkaddressname: string,
    resource: VirtualNetworkAddress,
    options?: VirtualNetworkAddressesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualNetworkAddress>, VirtualNetworkAddress>;
}

function _getVirtualNetworkAddresses(context: OracleDatabaseManagementContext) {
  return {
    listByParent: (
      resourceGroupName: string,
      cloudvmclustername: string,
      options?: VirtualNetworkAddressesListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, cloudvmclustername, options),
    delete: (
      resourceGroupName: string,
      cloudvmclustername: string,
      virtualnetworkaddressname: string,
      options?: VirtualNetworkAddressesDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, cloudvmclustername, virtualnetworkaddressname, options),
    get: (
      resourceGroupName: string,
      cloudvmclustername: string,
      virtualnetworkaddressname: string,
      options?: VirtualNetworkAddressesGetOptionalParams,
    ) => get(context, resourceGroupName, cloudvmclustername, virtualnetworkaddressname, options),
    createOrUpdate: (
      resourceGroupName: string,
      cloudvmclustername: string,
      virtualnetworkaddressname: string,
      resource: VirtualNetworkAddress,
      options?: VirtualNetworkAddressesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        cloudvmclustername,
        virtualnetworkaddressname,
        resource,
        options,
      ),
  };
}

export function _getVirtualNetworkAddressesOperations(
  context: OracleDatabaseManagementContext,
): VirtualNetworkAddressesOperations {
  return {
    ..._getVirtualNetworkAddresses(context),
  };
}
