// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  listByResourceGroup,
  $delete,
  update,
  createOrReplace,
  get,
} from "../../api/namespaceDevices/operations.js";
import type {
  NamespaceDevicesListByResourceGroupOptionalParams,
  NamespaceDevicesDeleteOptionalParams,
  NamespaceDevicesUpdateOptionalParams,
  NamespaceDevicesCreateOrReplaceOptionalParams,
  NamespaceDevicesGetOptionalParams,
} from "../../api/namespaceDevices/options.js";
import type { NamespaceDevice, NamespaceDeviceUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NamespaceDevices operations. */
export interface NamespaceDevicesOperations {
  /** List NamespaceDevice resources by Namespace */
  listByResourceGroup: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespaceDevicesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NamespaceDevice>;
  /** Delete a NamespaceDevice */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    deviceName: string,
    options?: NamespaceDevicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a NamespaceDevice */
  update: (
    resourceGroupName: string,
    namespaceName: string,
    deviceName: string,
    properties: NamespaceDeviceUpdate,
    options?: NamespaceDevicesUpdateOptionalParams,
  ) => PollerLike<OperationState<NamespaceDevice>, NamespaceDevice>;
  /** Create a NamespaceDevice */
  createOrReplace: (
    resourceGroupName: string,
    namespaceName: string,
    deviceName: string,
    resource: NamespaceDevice,
    options?: NamespaceDevicesCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<NamespaceDevice>, NamespaceDevice>;
  /** Get a NamespaceDevice */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    deviceName: string,
    options?: NamespaceDevicesGetOptionalParams,
  ) => Promise<NamespaceDevice>;
}

function _getNamespaceDevices(context: DeviceRegistryManagementContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespaceDevicesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      deviceName: string,
      options?: NamespaceDevicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, deviceName, options),
    update: (
      resourceGroupName: string,
      namespaceName: string,
      deviceName: string,
      properties: NamespaceDeviceUpdate,
      options?: NamespaceDevicesUpdateOptionalParams,
    ) => update(context, resourceGroupName, namespaceName, deviceName, properties, options),
    createOrReplace: (
      resourceGroupName: string,
      namespaceName: string,
      deviceName: string,
      resource: NamespaceDevice,
      options?: NamespaceDevicesCreateOrReplaceOptionalParams,
    ) => createOrReplace(context, resourceGroupName, namespaceName, deviceName, resource, options),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      deviceName: string,
      options?: NamespaceDevicesGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, deviceName, options),
  };
}

export function _getNamespaceDevicesOperations(
  context: DeviceRegistryManagementContext,
): NamespaceDevicesOperations {
  return {
    ..._getNamespaceDevices(context),
  };
}
