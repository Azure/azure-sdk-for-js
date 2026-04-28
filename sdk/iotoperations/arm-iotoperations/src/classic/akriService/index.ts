// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import {
  listByInstanceResource,
  $delete,
  createOrUpdate,
  get,
} from "../../api/akriService/operations.js";
import type {
  AkriServiceListByInstanceResourceOptionalParams,
  AkriServiceDeleteOptionalParams,
  AkriServiceCreateOrUpdateOptionalParams,
  AkriServiceGetOptionalParams,
} from "../../api/akriService/options.js";
import type { AkriServiceResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AkriService operations. */
export interface AkriServiceOperations {
  /** List AkriServiceResource resources by InstanceResource */
  listByInstanceResource: (
    resourceGroupName: string,
    instanceName: string,
    options?: AkriServiceListByInstanceResourceOptionalParams,
  ) => PagedAsyncIterableIterator<AkriServiceResource>;
  /** Delete a AkriServiceResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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
