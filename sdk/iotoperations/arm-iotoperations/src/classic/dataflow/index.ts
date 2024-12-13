// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import {
  dataflowGet,
  dataflowCreateOrUpdate,
  dataflowDelete,
  dataflowListByResourceGroup,
} from "../../api/dataflow/index.js";
import { DataflowResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  DataflowGetOptionalParams,
  DataflowCreateOrUpdateOptionalParams,
  DataflowDeleteOptionalParams,
  DataflowListByResourceGroupOptionalParams,
} from "../../api/options.js";

/** Interface representing a Dataflow operations. */
export interface DataflowOperations {
  /** Get a DataflowResource */
  get: (
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    dataflowName: string,
    options?: DataflowGetOptionalParams,
  ) => Promise<DataflowResource>;
  /** Create a DataflowResource */
  createOrUpdate: (
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    dataflowName: string,
    resource: DataflowResource,
    options?: DataflowCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DataflowResource>, DataflowResource>;
  /** Delete a DataflowResource */
  delete: (
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    dataflowName: string,
    options?: DataflowDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List DataflowResource resources by DataflowProfileResource */
  listByResourceGroup: (
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    options?: DataflowListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DataflowResource>;
}

export function getDataflow(
  context: IoTOperationsContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      dataflowName: string,
      options?: DataflowGetOptionalParams,
    ) =>
      dataflowGet(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        dataflowProfileName,
        dataflowName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      dataflowName: string,
      resource: DataflowResource,
      options?: DataflowCreateOrUpdateOptionalParams,
    ) =>
      dataflowCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        dataflowProfileName,
        dataflowName,
        resource,
        options,
      ),
    delete: (
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      dataflowName: string,
      options?: DataflowDeleteOptionalParams,
    ) =>
      dataflowDelete(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        dataflowProfileName,
        dataflowName,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      options?: DataflowListByResourceGroupOptionalParams,
    ) =>
      dataflowListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        dataflowProfileName,
        options,
      ),
  };
}

export function getDataflowOperations(
  context: IoTOperationsContext,
  subscriptionId: string,
): DataflowOperations {
  return {
    ...getDataflow(context, subscriptionId),
  };
}
