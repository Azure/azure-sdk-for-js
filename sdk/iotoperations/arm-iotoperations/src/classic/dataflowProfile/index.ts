// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import {
  listByResourceGroup,
  $delete,
  createOrUpdate,
  get,
} from "../../api/dataflowProfile/operations.js";
import type {
  DataflowProfileListByResourceGroupOptionalParams,
  DataflowProfileDeleteOptionalParams,
  DataflowProfileCreateOrUpdateOptionalParams,
  DataflowProfileGetOptionalParams,
} from "../../api/dataflowProfile/options.js";
import type { DataflowProfileResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DataflowProfile operations. */
export interface DataflowProfileOperations {
  /** List DataflowProfileResource resources by InstanceResource */
  listByResourceGroup: (
    resourceGroupName: string,
    instanceName: string,
    options?: DataflowProfileListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DataflowProfileResource>;
  /** Delete a DataflowProfileResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    options?: DataflowProfileDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a DataflowProfileResource */
  createOrUpdate: (
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    resource: DataflowProfileResource,
    options?: DataflowProfileCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DataflowProfileResource>, DataflowProfileResource>;
  /** Get a DataflowProfileResource */
  get: (
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    options?: DataflowProfileGetOptionalParams,
  ) => Promise<DataflowProfileResource>;
}

function _getDataflowProfile(context: IoTOperationsContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      instanceName: string,
      options?: DataflowProfileListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, instanceName, options),
    delete: (
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      options?: DataflowProfileDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, instanceName, dataflowProfileName, options),
    createOrUpdate: (
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      resource: DataflowProfileResource,
      options?: DataflowProfileCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        instanceName,
        dataflowProfileName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      options?: DataflowProfileGetOptionalParams,
    ) => get(context, resourceGroupName, instanceName, dataflowProfileName, options),
  };
}

export function _getDataflowProfileOperations(
  context: IoTOperationsContext,
): DataflowProfileOperations {
  return {
    ..._getDataflowProfile(context),
  };
}
