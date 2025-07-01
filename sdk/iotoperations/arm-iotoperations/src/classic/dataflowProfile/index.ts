// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import { DataflowProfileResource } from "../../models/models.js";
import {
  DataflowProfileListByResourceGroupOptionalParams,
  DataflowProfileDeleteOptionalParams,
  DataflowProfileCreateOrUpdateOptionalParams,
  DataflowProfileGetOptionalParams,
} from "../../api/dataflowProfile/options.js";
import {
  listByResourceGroup,
  $delete,
  createOrUpdate,
  get,
} from "../../api/dataflowProfile/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DataflowProfile operations. */
export interface DataflowProfileOperations {
  /** List DataflowProfileResource resources by InstanceResource */
  listByResourceGroup: (
    apiVersion: string,
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
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    options?: DataflowProfileDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a DataflowProfileResource */
  createOrUpdate: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    resource: DataflowProfileResource,
    options?: DataflowProfileCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DataflowProfileResource>, DataflowProfileResource>;
  /** Get a DataflowProfileResource */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    dataflowProfileName: string,
    options?: DataflowProfileGetOptionalParams,
  ) => Promise<DataflowProfileResource>;
}

function _getDataflowProfile(context: IoTOperationsContext) {
  return {
    listByResourceGroup: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      options?: DataflowProfileListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, apiVersion, resourceGroupName, instanceName, options),
    delete: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      options?: DataflowProfileDeleteOptionalParams,
    ) =>
      $delete(context, apiVersion, resourceGroupName, instanceName, dataflowProfileName, options),
    createOrUpdate: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      resource: DataflowProfileResource,
      options?: DataflowProfileCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        apiVersion,
        resourceGroupName,
        instanceName,
        dataflowProfileName,
        resource,
        options,
      ),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      dataflowProfileName: string,
      options?: DataflowProfileGetOptionalParams,
    ) => get(context, apiVersion, resourceGroupName, instanceName, dataflowProfileName, options),
  };
}

export function _getDataflowProfileOperations(
  context: IoTOperationsContext,
): DataflowProfileOperations {
  return {
    ..._getDataflowProfile(context),
  };
}
