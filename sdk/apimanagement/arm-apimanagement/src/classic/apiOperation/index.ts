// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByApi,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/apiOperation/operations.js";
import type {
  ApiOperationListByApiOptionalParams,
  ApiOperationDeleteOptionalParams,
  ApiOperationUpdateOptionalParams,
  ApiOperationCreateOrUpdateOptionalParams,
  ApiOperationGetEntityTagOptionalParams,
  ApiOperationGetOptionalParams,
} from "../../api/apiOperation/options.js";
import type { OperationContract, OperationUpdateContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApiOperation operations. */
export interface ApiOperationOperations {
  /** Lists a collection of the operations for the specified API. */
  listByApi: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: ApiOperationListByApiOptionalParams,
  ) => PagedAsyncIterableIterator<OperationContract>;
  /** Deletes the specified operation in the API. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    operationId: string,
    ifMatch: string,
    options?: ApiOperationDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the operation in the API specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    operationId: string,
    ifMatch: string,
    parameters: OperationUpdateContract,
    options?: ApiOperationUpdateOptionalParams,
  ) => Promise<OperationContract>;
  /** Creates a new operation in the API or updates an existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    operationId: string,
    parameters: OperationContract,
    options?: ApiOperationCreateOrUpdateOptionalParams,
  ) => Promise<OperationContract>;
  /** Gets the entity state (Etag) version of the API operation specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    operationId: string,
    options?: ApiOperationGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the API Operation specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    operationId: string,
    options?: ApiOperationGetOptionalParams,
  ) => Promise<OperationContract>;
}

function _getApiOperation(context: ApiManagementContext) {
  return {
    listByApi: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: ApiOperationListByApiOptionalParams,
    ) => listByApi(context, resourceGroupName, serviceName, apiId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      operationId: string,
      ifMatch: string,
      options?: ApiOperationDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, apiId, operationId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      operationId: string,
      ifMatch: string,
      parameters: OperationUpdateContract,
      options?: ApiOperationUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        apiId,
        operationId,
        ifMatch,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      operationId: string,
      parameters: OperationContract,
      options?: ApiOperationCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        apiId,
        operationId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      operationId: string,
      options?: ApiOperationGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, apiId, operationId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      operationId: string,
      options?: ApiOperationGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, apiId, operationId, options),
  };
}

export function _getApiOperationOperations(context: ApiManagementContext): ApiOperationOperations {
  return {
    ..._getApiOperation(context),
  };
}
