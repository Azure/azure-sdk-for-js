// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import {
  listByDataflowProfile,
  $delete,
  createOrUpdate,
  get,
} from "../../api/dataflowGraph/operations.js";
import type {
  DataflowGraphListByDataflowProfileOptionalParams,
  DataflowGraphDeleteOptionalParams,
  DataflowGraphCreateOrUpdateOptionalParams,
  DataflowGraphGetOptionalParams,
} from "../../api/dataflowGraph/options.js";
import type { DataflowGraphResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DataflowGraph operations. */
export interface DataflowGraphOperations {
  /** List DataflowGraphResource resources by DataflowProfileResource */
  listByDataflowProfile: (
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    options?: DataflowGraphListByDataflowProfileOptionalParams,
  ) => PagedAsyncIterableIterator<DataflowGraphResource>;
  /** Delete a DataflowGraphResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    dataflowGraphName: string,
    options?: DataflowGraphDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a DataflowGraphResource */
  createOrUpdate: (
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    dataflowGraphName: string,
    resource: DataflowGraphResource,
    options?: DataflowGraphCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DataflowGraphResource>, DataflowGraphResource>;
  /** Get a DataflowGraphResource */
  get: (
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    dataflowGraphName: string,
    options?: DataflowGraphGetOptionalParams,
  ) => Promise<DataflowGraphResource>;
}

function _getDataflowGraph(context: IoTOperationsContext) {
  return {
    listByDataflowProfile: (
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      options?: DataflowGraphListByDataflowProfileOptionalParams,
    ) =>
      listByDataflowProfile(context, resourceGroupName, instanceName, dataflowProfileName, options),
    delete: (
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      dataflowGraphName: string,
      options?: DataflowGraphDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        instanceName,
        dataflowProfileName,
        dataflowGraphName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      dataflowGraphName: string,
      resource: DataflowGraphResource,
      options?: DataflowGraphCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        instanceName,
        dataflowProfileName,
        dataflowGraphName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      dataflowGraphName: string,
      options?: DataflowGraphGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        instanceName,
        dataflowProfileName,
        dataflowGraphName,
        options,
      ),
  };
}

export function _getDataflowGraphOperations(
  context: IoTOperationsContext,
): DataflowGraphOperations {
  return {
    ..._getDataflowGraph(context),
  };
}
