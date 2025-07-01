// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import { DataflowResource } from "../../models/models.js";
import {
  DataflowListByResourceGroupOptionalParams,
  DataflowDeleteOptionalParams,
  DataflowCreateOrUpdateOptionalParams,
  DataflowGetOptionalParams,
} from "../../api/dataflow/options.js";
import {
  listByResourceGroup,
  $delete,
  createOrUpdate,
  get,
} from "../../api/dataflow/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Dataflow operations. */
export interface DataflowOperations {
  /** List DataflowResource resources by DataflowProfileResource */
  listByResourceGroup: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    options?: DataflowListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DataflowResource>;
  /** Delete a DataflowResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    dataflowName: string,
    options?: DataflowDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a DataflowResource */
  createOrUpdate: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    dataflowName: string,
    resource: DataflowResource,
    options?: DataflowCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DataflowResource>, DataflowResource>;
  /** Get a DataflowResource */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    dataflowName: string,
    options?: DataflowGetOptionalParams,
  ) => Promise<DataflowResource>;
}

function _getDataflow(context: IoTOperationsContext) {
  return {
    listByResourceGroup: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      options?: DataflowListByResourceGroupOptionalParams,
    ) =>
      listByResourceGroup(
        context,
        apiVersion,
        resourceGroupName,
        instanceName,
        dataflowProfileName,
        options,
      ),
    delete: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      dataflowName: string,
      options?: DataflowDeleteOptionalParams,
    ) =>
      $delete(
        context,
        apiVersion,
        resourceGroupName,
        instanceName,
        dataflowProfileName,
        dataflowName,
        options,
      ),
    createOrUpdate: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      dataflowName: string,
      resource: DataflowResource,
      options?: DataflowCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        apiVersion,
        resourceGroupName,
        instanceName,
        dataflowProfileName,
        dataflowName,
        resource,
        options,
      ),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      dataflowName: string,
      options?: DataflowGetOptionalParams,
    ) =>
      get(
        context,
        apiVersion,
        resourceGroupName,
        instanceName,
        dataflowProfileName,
        dataflowName,
        options,
      ),
  };
}

export function _getDataflowOperations(context: IoTOperationsContext): DataflowOperations {
  return {
    ..._getDataflow(context),
  };
}
