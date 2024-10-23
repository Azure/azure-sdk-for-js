// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import {
  dataflowEndpointGet,
  dataflowEndpointCreateOrUpdate,
  dataflowEndpointDelete,
  dataflowEndpointListByResourceGroup,
} from "../../api/dataflowEndpoint/index.js";
import { DataflowEndpointResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  DataflowEndpointGetOptionalParams,
  DataflowEndpointCreateOrUpdateOptionalParams,
  DataflowEndpointDeleteOptionalParams,
  DataflowEndpointListByResourceGroupOptionalParams,
} from "../../api/options.js";

/** Interface representing a DataflowEndpoint operations. */
export interface DataflowEndpointOperations {
  /** Get a DataflowEndpointResource */
  get: (
    resourceGroupName: string,
    instanceName: string,
    dataflowEndpointName: string,
    options?: DataflowEndpointGetOptionalParams,
  ) => Promise<DataflowEndpointResource>;
  /** Create a DataflowEndpointResource */
  createOrUpdate: (
    resourceGroupName: string,
    instanceName: string,
    dataflowEndpointName: string,
    resource: DataflowEndpointResource,
    options?: DataflowEndpointCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<DataflowEndpointResource>,
    DataflowEndpointResource
  >;
  /** Delete a DataflowEndpointResource */
  delete: (
    resourceGroupName: string,
    instanceName: string,
    dataflowEndpointName: string,
    options?: DataflowEndpointDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List DataflowEndpointResource resources by InstanceResource */
  listByResourceGroup: (
    resourceGroupName: string,
    instanceName: string,
    options?: DataflowEndpointListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DataflowEndpointResource>;
}

export function getDataflowEndpoint(
  context: IoTOperationsContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      instanceName: string,
      dataflowEndpointName: string,
      options?: DataflowEndpointGetOptionalParams,
    ) =>
      dataflowEndpointGet(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        dataflowEndpointName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      instanceName: string,
      dataflowEndpointName: string,
      resource: DataflowEndpointResource,
      options?: DataflowEndpointCreateOrUpdateOptionalParams,
    ) =>
      dataflowEndpointCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        dataflowEndpointName,
        resource,
        options,
      ),
    delete: (
      resourceGroupName: string,
      instanceName: string,
      dataflowEndpointName: string,
      options?: DataflowEndpointDeleteOptionalParams,
    ) =>
      dataflowEndpointDelete(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        dataflowEndpointName,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      instanceName: string,
      options?: DataflowEndpointListByResourceGroupOptionalParams,
    ) =>
      dataflowEndpointListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        options,
      ),
  };
}

export function getDataflowEndpointOperations(
  context: IoTOperationsContext,
  subscriptionId: string,
): DataflowEndpointOperations {
  return {
    ...getDataflowEndpoint(context, subscriptionId),
  };
}
