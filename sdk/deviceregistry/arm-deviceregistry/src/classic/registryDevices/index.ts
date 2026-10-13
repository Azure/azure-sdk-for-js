// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  listByNamespace,
  $delete,
  update,
  createOrReplace,
  get,
} from "../../api/registryDevices/operations.js";
import type {
  RegistryDevicesListByNamespaceOptionalParams,
  RegistryDevicesDeleteOptionalParams,
  RegistryDevicesUpdateOptionalParams,
  RegistryDevicesCreateOrReplaceOptionalParams,
  RegistryDevicesGetOptionalParams,
} from "../../api/registryDevices/options.js";
import type { RegistryDevice, RegistryDeviceUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RegistryDevices operations. */
export interface RegistryDevicesOperations {
  /** List RegistryDevice resources by Namespace */
  listByNamespace: (
    resourceGroupName: string,
    namespaceName: string,
    options?: RegistryDevicesListByNamespaceOptionalParams,
  ) => PagedAsyncIterableIterator<RegistryDevice>;
  /** Delete a RegistryDevice */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    registryDeviceName: string,
    options?: RegistryDevicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a RegistryDevice */
  update: (
    resourceGroupName: string,
    namespaceName: string,
    registryDeviceName: string,
    properties: RegistryDeviceUpdate,
    options?: RegistryDevicesUpdateOptionalParams,
  ) => PollerLike<OperationState<RegistryDevice>, RegistryDevice>;
  /** Create a RegistryDevice */
  createOrReplace: (
    resourceGroupName: string,
    namespaceName: string,
    registryDeviceName: string,
    resource: RegistryDevice,
    options?: RegistryDevicesCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<RegistryDevice>, RegistryDevice>;
  /** Get a RegistryDevice */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    registryDeviceName: string,
    options?: RegistryDevicesGetOptionalParams,
  ) => Promise<RegistryDevice>;
}

function _getRegistryDevices(context: DeviceRegistryManagementContext) {
  return {
    listByNamespace: (
      resourceGroupName: string,
      namespaceName: string,
      options?: RegistryDevicesListByNamespaceOptionalParams,
    ) => listByNamespace(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      registryDeviceName: string,
      options?: RegistryDevicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, registryDeviceName, options),
    update: (
      resourceGroupName: string,
      namespaceName: string,
      registryDeviceName: string,
      properties: RegistryDeviceUpdate,
      options?: RegistryDevicesUpdateOptionalParams,
    ) => update(context, resourceGroupName, namespaceName, registryDeviceName, properties, options),
    createOrReplace: (
      resourceGroupName: string,
      namespaceName: string,
      registryDeviceName: string,
      resource: RegistryDevice,
      options?: RegistryDevicesCreateOrReplaceOptionalParams,
    ) =>
      createOrReplace(
        context,
        resourceGroupName,
        namespaceName,
        registryDeviceName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      registryDeviceName: string,
      options?: RegistryDevicesGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, registryDeviceName, options),
  };
}

export function _getRegistryDevicesOperations(
  context: DeviceRegistryManagementContext,
): RegistryDevicesOperations {
  return {
    ..._getRegistryDevices(context),
  };
}
