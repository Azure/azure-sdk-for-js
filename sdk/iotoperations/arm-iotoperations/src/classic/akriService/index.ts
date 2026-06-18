// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import {
  listByInstanceResource,
  $delete,
  createOrUpdate,
  get,
} from "../../api/akriService/operations.js";
import {
  AkriServiceListByInstanceResourceOptionalParams,
  AkriServiceDeleteOptionalParams,
  AkriServiceCreateOrUpdateOptionalParams,
  AkriServiceGetOptionalParams,
} from "../../api/akriService/options.js";
import { AkriServiceResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AkriService operations. */
export interface AkriServiceOperations {
  /** List AkriServiceResource resources by InstanceResource */
  listByInstanceResource: (
    resourceGroupName: string,
    instanceName: string,
    options?: AkriServiceListByInstanceResourceOptionalParams,
  ) => PagedAsyncIterableIterator<AkriServiceResource>;
  /** Delete a AkriServiceResource */
  delete: (
    resourceGroupName: string,
    instanceName: string,
    akriServiceName: string,
    options?: AkriServiceDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a AkriServiceResource */
  createOrUpdate: (
    resourceGroupName: string,
    instanceName: string,
    akriServiceName: string,
    resource: AkriServiceResource,
    options?: AkriServiceCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AkriServiceResource>, AkriServiceResource>;
  /** Get a AkriServiceResource */
  get: (
    resourceGroupName: string,
    instanceName: string,
    akriServiceName: string,
    options?: AkriServiceGetOptionalParams,
  ) => Promise<AkriServiceResource>;
}

function _getAkriService(context: IoTOperationsContext) {
  return {
    listByInstanceResource: (
      resourceGroupName: string,
      instanceName: string,
      options?: AkriServiceListByInstanceResourceOptionalParams,
    ) => listByInstanceResource(context, resourceGroupName, instanceName, options),
    delete: (
      resourceGroupName: string,
      instanceName: string,
      akriServiceName: string,
      options?: AkriServiceDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, instanceName, akriServiceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      instanceName: string,
      akriServiceName: string,
      resource: AkriServiceResource,
      options?: AkriServiceCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, instanceName, akriServiceName, resource, options),
    get: (
      resourceGroupName: string,
      instanceName: string,
      akriServiceName: string,
      options?: AkriServiceGetOptionalParams,
    ) => get(context, resourceGroupName, instanceName, akriServiceName, options),
  };
}

export function _getAkriServiceOperations(context: IoTOperationsContext): AkriServiceOperations {
  return {
    ..._getAkriService(context),
  };
}
