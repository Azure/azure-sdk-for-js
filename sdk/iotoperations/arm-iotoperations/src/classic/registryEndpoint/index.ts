// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import {
  listByInstanceResource,
  $delete,
  createOrUpdate,
  get,
} from "../../api/registryEndpoint/operations.js";
import type {
  RegistryEndpointListByInstanceResourceOptionalParams,
  RegistryEndpointDeleteOptionalParams,
  RegistryEndpointCreateOrUpdateOptionalParams,
  RegistryEndpointGetOptionalParams,
} from "../../api/registryEndpoint/options.js";
import type { RegistryEndpointResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RegistryEndpoint operations. */
export interface RegistryEndpointOperations {
  /** List RegistryEndpointResource resources by InstanceResource */
  listByInstanceResource: (
    resourceGroupName: string,
    instanceName: string,
    options?: RegistryEndpointListByInstanceResourceOptionalParams,
  ) => PagedAsyncIterableIterator<RegistryEndpointResource>;
  /** Delete a RegistryEndpointResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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
