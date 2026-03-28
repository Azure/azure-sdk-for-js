// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  reconnect,
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/backend/operations.js";
import type {
  BackendReconnectOptionalParams,
  BackendListByServiceOptionalParams,
  BackendDeleteOptionalParams,
  BackendUpdateOptionalParams,
  BackendCreateOrUpdateOptionalParams,
  BackendGetEntityTagOptionalParams,
  BackendGetOptionalParams,
} from "../../api/backend/options.js";
import type { BackendContract, BackendUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Backend operations. */
export interface BackendOperations {
  /** Notifies the API Management gateway to create a new connection to the backend after the specified timeout. If no timeout was specified, timeout of 2 minutes is used. */
  reconnect: (
    resourceGroupName: string,
    serviceName: string,
    backendId: string,
    options?: BackendReconnectOptionalParams,
  ) => Promise<void>;
  /** Lists a collection of backends in the specified service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: BackendListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<BackendContract>;
  /** Deletes the specified backend. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    backendId: string,
    ifMatch: string,
    options?: BackendDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing backend. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    backendId: string,
    ifMatch: string,
    parameters: BackendUpdateParameters,
    options?: BackendUpdateOptionalParams,
  ) => Promise<BackendContract>;
  /** Creates or Updates a backend. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    backendId: string,
    parameters: BackendContract,
    options?: BackendCreateOrUpdateOptionalParams,
  ) => Promise<BackendContract>;
  /** Gets the entity state (Etag) version of the backend specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    backendId: string,
    options?: BackendGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the backend specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    backendId: string,
    options?: BackendGetOptionalParams,
  ) => Promise<BackendContract>;
}

function _getBackend(context: ApiManagementContext) {
  return {
    reconnect: (
      resourceGroupName: string,
      serviceName: string,
      backendId: string,
      options?: BackendReconnectOptionalParams,
    ) => reconnect(context, resourceGroupName, serviceName, backendId, options),
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: BackendListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      backendId: string,
      ifMatch: string,
      options?: BackendDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, backendId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      backendId: string,
      ifMatch: string,
      parameters: BackendUpdateParameters,
      options?: BackendUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, backendId, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      backendId: string,
      parameters: BackendContract,
      options?: BackendCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, backendId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      backendId: string,
      options?: BackendGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, backendId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      backendId: string,
      options?: BackendGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, backendId, options),
  };
}

export function _getBackendOperations(context: ApiManagementContext): BackendOperations {
  return {
    ..._getBackend(context),
  };
}
