// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import {
  listByResourceGroup,
  $delete,
  createOrUpdate,
  get,
} from "../../api/dataflowEndpoint/operations.js";
import type {
  DataflowEndpointListByResourceGroupOptionalParams,
  DataflowEndpointDeleteOptionalParams,
  DataflowEndpointCreateOrUpdateOptionalParams,
  DataflowEndpointGetOptionalParams,
} from "../../api/dataflowEndpoint/options.js";
import type { DataflowEndpointResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DataflowEndpoint operations. */
export interface DataflowEndpointOperations {
  /** List DataflowEndpointResource resources by InstanceResource */
  listByResourceGroup: (
    resourceGroupName: string,
    instanceName: string,
    options?: DataflowEndpointListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DataflowEndpointResource>;
  /** Delete a DataflowEndpointResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    instanceName: string,
    dataflowEndpointName: string,
    options?: DataflowEndpointDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a DataflowEndpointResource */
  createOrUpdate: (
    resourceGroupName: string,
    instanceName: string,
    dataflowEndpointName: string,
    resource: DataflowEndpointResource,
    options?: DataflowEndpointCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DataflowEndpointResource>, DataflowEndpointResource>;
  /** Get a DataflowEndpointResource */
  get: (
    resourceGroupName: string,
    instanceName: string,
    dataflowEndpointName: string,
    options?: DataflowEndpointGetOptionalParams,
  ) => Promise<DataflowEndpointResource>;
}

function _getDataflowEndpoint(context: IoTOperationsContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      instanceName: string,
      options?: DataflowEndpointListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, instanceName, options),
    delete: (
      resourceGroupName: string,
      instanceName: string,
      dataflowEndpointName: string,
      options?: DataflowEndpointDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, instanceName, dataflowEndpointName, options),
    createOrUpdate: (
      resourceGroupName: string,
      instanceName: string,
      dataflowEndpointName: string,
      resource: DataflowEndpointResource,
      options?: DataflowEndpointCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        instanceName,
        dataflowEndpointName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      instanceName: string,
      dataflowEndpointName: string,
      options?: DataflowEndpointGetOptionalParams,
    ) => get(context, resourceGroupName, instanceName, dataflowEndpointName, options),
  };
}

export function _getDataflowEndpointOperations(
  context: IoTOperationsContext,
): DataflowEndpointOperations {
  return {
    ..._getDataflowEndpoint(context),
  };
}
