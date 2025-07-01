// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import { DataflowEndpointResource } from "../../models/models.js";
import {
  DataflowEndpointListByResourceGroupOptionalParams,
  DataflowEndpointDeleteOptionalParams,
  DataflowEndpointCreateOrUpdateOptionalParams,
  DataflowEndpointGetOptionalParams,
} from "../../api/dataflowEndpoint/options.js";
import {
  listByResourceGroup,
  $delete,
  createOrUpdate,
  get,
} from "../../api/dataflowEndpoint/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DataflowEndpoint operations. */
export interface DataflowEndpointOperations {
  /** List DataflowEndpointResource resources by InstanceResource */
  listByResourceGroup: (
    apiVersion: string,
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
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    dataflowEndpointName: string,
    options?: DataflowEndpointDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a DataflowEndpointResource */
  createOrUpdate: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    dataflowEndpointName: string,
    resource: DataflowEndpointResource,
    options?: DataflowEndpointCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DataflowEndpointResource>, DataflowEndpointResource>;
  /** Get a DataflowEndpointResource */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    dataflowEndpointName: string,
    options?: DataflowEndpointGetOptionalParams,
  ) => Promise<DataflowEndpointResource>;
}

function _getDataflowEndpoint(context: IoTOperationsContext) {
  return {
    listByResourceGroup: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      options?: DataflowEndpointListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, apiVersion, resourceGroupName, instanceName, options),
    delete: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      dataflowEndpointName: string,
      options?: DataflowEndpointDeleteOptionalParams,
    ) =>
      $delete(context, apiVersion, resourceGroupName, instanceName, dataflowEndpointName, options),
    createOrUpdate: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      dataflowEndpointName: string,
      resource: DataflowEndpointResource,
      options?: DataflowEndpointCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        apiVersion,
        resourceGroupName,
        instanceName,
        dataflowEndpointName,
        resource,
        options,
      ),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      dataflowEndpointName: string,
      options?: DataflowEndpointGetOptionalParams,
    ) => get(context, apiVersion, resourceGroupName, instanceName, dataflowEndpointName, options),
  };
}

export function _getDataflowEndpointOperations(
  context: IoTOperationsContext,
): DataflowEndpointOperations {
  return {
    ..._getDataflowEndpoint(context),
  };
}
