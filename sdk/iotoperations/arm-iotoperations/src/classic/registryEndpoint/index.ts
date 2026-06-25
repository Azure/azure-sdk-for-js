// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import {
  listByInstanceResource,
  $delete,
  createOrUpdate,
  get,
} from "../../api/registryEndpoint/operations.js";
import {
  RegistryEndpointListByInstanceResourceOptionalParams,
  RegistryEndpointDeleteOptionalParams,
  RegistryEndpointCreateOrUpdateOptionalParams,
  RegistryEndpointGetOptionalParams,
} from "../../api/registryEndpoint/options.js";
import { RegistryEndpointResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RegistryEndpoint operations. */
export interface RegistryEndpointOperations {
  /** List RegistryEndpointResource resources by InstanceResource */
  listByInstanceResource: (
    resourceGroupName: string,
    instanceName: string,
    options?: RegistryEndpointListByInstanceResourceOptionalParams,
  ) => PagedAsyncIterableIterator<RegistryEndpointResource>;
  /** Delete a RegistryEndpointResource */
  delete: (
    resourceGroupName: string,
    instanceName: string,
    registryEndpointName: string,
    options?: RegistryEndpointDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a RegistryEndpointResource */
  createOrUpdate: (
    resourceGroupName: string,
    instanceName: string,
    registryEndpointName: string,
    resource: RegistryEndpointResource,
    options?: RegistryEndpointCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<RegistryEndpointResource>, RegistryEndpointResource>;
  /** Get a RegistryEndpointResource */
  get: (
    resourceGroupName: string,
    instanceName: string,
    registryEndpointName: string,
    options?: RegistryEndpointGetOptionalParams,
  ) => Promise<RegistryEndpointResource>;
}

function _getRegistryEndpoint(context: IoTOperationsContext) {
  return {
    listByInstanceResource: (
      resourceGroupName: string,
      instanceName: string,
      options?: RegistryEndpointListByInstanceResourceOptionalParams,
    ) => listByInstanceResource(context, resourceGroupName, instanceName, options),
    delete: (
      resourceGroupName: string,
      instanceName: string,
      registryEndpointName: string,
      options?: RegistryEndpointDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, instanceName, registryEndpointName, options),
    createOrUpdate: (
      resourceGroupName: string,
      instanceName: string,
      registryEndpointName: string,
      resource: RegistryEndpointResource,
      options?: RegistryEndpointCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        instanceName,
        registryEndpointName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      instanceName: string,
      registryEndpointName: string,
      options?: RegistryEndpointGetOptionalParams,
    ) => get(context, resourceGroupName, instanceName, registryEndpointName, options),
  };
}

export function _getRegistryEndpointOperations(
  context: IoTOperationsContext,
): RegistryEndpointOperations {
  return {
    ..._getRegistryEndpoint(context),
  };
}
