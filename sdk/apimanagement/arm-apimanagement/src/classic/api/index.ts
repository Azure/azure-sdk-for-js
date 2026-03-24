// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByTags,
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/api/operations.js";
import type {
  ApiListByTagsOptionalParams,
  ApiListByServiceOptionalParams,
  ApiDeleteOptionalParams,
  ApiUpdateOptionalParams,
  ApiCreateOrUpdateOptionalParams,
  ApiGetEntityTagOptionalParams,
  ApiGetOptionalParams,
} from "../../api/api/options.js";
import type {
  ApiContract,
  ApiCreateOrUpdateParameter,
  ApiUpdateContract,
  TagResourceContract,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Api operations. */
export interface ApiOperations {
  /** Lists a collection of apis associated with tags. */
  listByTags: (
    resourceGroupName: string,
    serviceName: string,
    options?: ApiListByTagsOptionalParams,
  ) => PagedAsyncIterableIterator<TagResourceContract>;
  /** Lists all APIs of the API Management service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: ApiListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<ApiContract>;
  /** Deletes the specified API of the API Management service instance. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    ifMatch: string,
    options?: ApiDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates the specified API of the API Management service instance. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    ifMatch: string,
    parameters: ApiUpdateContract,
    options?: ApiUpdateOptionalParams,
  ) => Promise<ApiContract>;
  /** Creates new or updates existing specified API of the API Management service instance. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    parameters: ApiCreateOrUpdateParameter,
    options?: ApiCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ApiContract>, ApiContract>;
  /** Gets the entity state (Etag) version of the API specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: ApiGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the API specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: ApiGetOptionalParams,
  ) => Promise<ApiContract>;
}

function _getApi(context: ApiManagementContext) {
  return {
    listByTags: (
      resourceGroupName: string,
      serviceName: string,
      options?: ApiListByTagsOptionalParams,
    ) => listByTags(context, resourceGroupName, serviceName, options),
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: ApiListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      ifMatch: string,
      options?: ApiDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, apiId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      ifMatch: string,
      parameters: ApiUpdateContract,
      options?: ApiUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, apiId, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      parameters: ApiCreateOrUpdateParameter,
      options?: ApiCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, apiId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: ApiGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, apiId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: ApiGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, apiId, options),
  };
}

export function _getApiOperations(context: ApiManagementContext): ApiOperations {
  return {
    ..._getApi(context),
  };
}
