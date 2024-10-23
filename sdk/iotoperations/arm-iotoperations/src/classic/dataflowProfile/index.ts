// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import {
  dataflowProfileGet,
  dataflowProfileCreateOrUpdate,
  dataflowProfileDelete,
  dataflowProfileListByResourceGroup,
} from "../../api/dataflowProfile/index.js";
import { DataflowProfileResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  DataflowProfileGetOptionalParams,
  DataflowProfileCreateOrUpdateOptionalParams,
  DataflowProfileDeleteOptionalParams,
  DataflowProfileListByResourceGroupOptionalParams,
} from "../../api/options.js";

/** Interface representing a DataflowProfile operations. */
export interface DataflowProfileOperations {
  /** Get a DataflowProfileResource */
  get: (
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    options?: DataflowProfileGetOptionalParams,
  ) => Promise<DataflowProfileResource>;
  /** Create a DataflowProfileResource */
  createOrUpdate: (
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    resource: DataflowProfileResource,
    options?: DataflowProfileCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<DataflowProfileResource>,
    DataflowProfileResource
  >;
  /** Delete a DataflowProfileResource */
  delete: (
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    options?: DataflowProfileDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List DataflowProfileResource resources by InstanceResource */
  listByResourceGroup: (
    resourceGroupName: string,
    instanceName: string,
    options?: DataflowProfileListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DataflowProfileResource>;
}

export function getDataflowProfile(
  context: IoTOperationsContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      options?: DataflowProfileGetOptionalParams,
    ) =>
      dataflowProfileGet(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        dataflowProfileName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      resource: DataflowProfileResource,
      options?: DataflowProfileCreateOrUpdateOptionalParams,
    ) =>
      dataflowProfileCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        dataflowProfileName,
        resource,
        options,
      ),
    delete: (
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      options?: DataflowProfileDeleteOptionalParams,
    ) =>
      dataflowProfileDelete(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        dataflowProfileName,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      instanceName: string,
      options?: DataflowProfileListByResourceGroupOptionalParams,
    ) =>
      dataflowProfileListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        options,
      ),
  };
}

export function getDataflowProfileOperations(
  context: IoTOperationsContext,
  subscriptionId: string,
): DataflowProfileOperations {
  return {
    ...getDataflowProfile(context, subscriptionId),
  };
}
