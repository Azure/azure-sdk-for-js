// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import {
  listByResourceGroup,
  $delete,
  createOrUpdate,
  get,
} from "../../api/dataflow/operations.js";
import type {
  DataflowListByResourceGroupOptionalParams,
  DataflowDeleteOptionalParams,
  DataflowCreateOrUpdateOptionalParams,
  DataflowGetOptionalParams,
} from "../../api/dataflow/options.js";
import type { DataflowResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Dataflow operations. */
export interface DataflowOperations {
  /** List DataflowResource resources by DataflowProfileResource */
  listByResourceGroup: (
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
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    dataflowName: string,
    options?: DataflowDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a DataflowResource */
  createOrUpdate: (
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    dataflowName: string,
    resource: DataflowResource,
    options?: DataflowCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DataflowResource>, DataflowResource>;
  /** Get a DataflowResource */
  get: (
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
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      options?: DataflowListByResourceGroupOptionalParams,
    ) =>
      listByResourceGroup(context, resourceGroupName, instanceName, dataflowProfileName, options),
    delete: (
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      dataflowName: string,
      options?: DataflowDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, instanceName, dataflowProfileName, dataflowName, options),
    createOrUpdate: (
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      dataflowName: string,
      resource: DataflowResource,
      options?: DataflowCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        instanceName,
        dataflowProfileName,
        dataflowName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      dataflowName: string,
      options?: DataflowGetOptionalParams,
    ) => get(context, resourceGroupName, instanceName, dataflowProfileName, dataflowName, options),
  };
}

export function _getDataflowOperations(context: IoTOperationsContext): DataflowOperations {
  return {
    ..._getDataflow(context),
  };
}
