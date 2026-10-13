// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  listByNamespace,
  $delete,
  update,
  createOrReplace,
  get,
} from "../../api/namespaceDiscoveredDevices/operations.js";
import type {
  NamespaceDiscoveredDevicesListByNamespaceOptionalParams,
  NamespaceDiscoveredDevicesDeleteOptionalParams,
  NamespaceDiscoveredDevicesUpdateOptionalParams,
  NamespaceDiscoveredDevicesCreateOrReplaceOptionalParams,
  NamespaceDiscoveredDevicesGetOptionalParams,
} from "../../api/namespaceDiscoveredDevices/options.js";
import type {
  NamespaceDiscoveredDevice,
  NamespaceDiscoveredDeviceUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NamespaceDiscoveredDevices operations. */
export interface NamespaceDiscoveredDevicesOperations {
  /** List NamespaceDiscoveredDevice resources by Namespace */
  listByNamespace: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespaceDiscoveredDevicesListByNamespaceOptionalParams,
  ) => PagedAsyncIterableIterator<NamespaceDiscoveredDevice>;
  /** Delete a NamespaceDiscoveredDevice */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    discoveredDeviceName: string,
    options?: NamespaceDiscoveredDevicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a NamespaceDiscoveredDevice */
  update: (
    resourceGroupName: string,
    namespaceName: string,
    discoveredDeviceName: string,
    properties: NamespaceDiscoveredDeviceUpdate,
    options?: NamespaceDiscoveredDevicesUpdateOptionalParams,
  ) => PollerLike<OperationState<NamespaceDiscoveredDevice>, NamespaceDiscoveredDevice>;
  /** Create a NamespaceDiscoveredDevice */
  createOrReplace: (
    resourceGroupName: string,
    namespaceName: string,
    discoveredDeviceName: string,
    resource: NamespaceDiscoveredDevice,
    options?: NamespaceDiscoveredDevicesCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<NamespaceDiscoveredDevice>, NamespaceDiscoveredDevice>;
  /** Get a NamespaceDiscoveredDevice */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    discoveredDeviceName: string,
    options?: NamespaceDiscoveredDevicesGetOptionalParams,
  ) => Promise<NamespaceDiscoveredDevice>;
}

function _getNamespaceDiscoveredDevices(context: DeviceRegistryManagementContext) {
  return {
    listByNamespace: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespaceDiscoveredDevicesListByNamespaceOptionalParams,
    ) => listByNamespace(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      discoveredDeviceName: string,
      options?: NamespaceDiscoveredDevicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, discoveredDeviceName, options),
    update: (
      resourceGroupName: string,
      namespaceName: string,
      discoveredDeviceName: string,
      properties: NamespaceDiscoveredDeviceUpdate,
      options?: NamespaceDiscoveredDevicesUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, namespaceName, discoveredDeviceName, properties, options),
    createOrReplace: (
      resourceGroupName: string,
      namespaceName: string,
      discoveredDeviceName: string,
      resource: NamespaceDiscoveredDevice,
      options?: NamespaceDiscoveredDevicesCreateOrReplaceOptionalParams,
    ) =>
      createOrReplace(
        context,
        resourceGroupName,
        namespaceName,
        discoveredDeviceName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      discoveredDeviceName: string,
      options?: NamespaceDiscoveredDevicesGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, discoveredDeviceName, options),
  };
}

export function _getNamespaceDiscoveredDevicesOperations(
  context: DeviceRegistryManagementContext,
): NamespaceDiscoveredDevicesOperations {
  return {
    ..._getNamespaceDiscoveredDevices(context),
  };
}
