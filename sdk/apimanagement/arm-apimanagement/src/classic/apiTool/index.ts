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
} from "../../api/apiTool/operations.js";
import type {
  ApiToolListByApiOptionalParams,
  ApiToolDeleteOptionalParams,
  ApiToolUpdateOptionalParams,
  ApiToolCreateOrUpdateOptionalParams,
  ApiToolGetEntityTagOptionalParams,
  ApiToolGetOptionalParams,
} from "../../api/apiTool/options.js";
import type { ToolContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApiTool operations. */
export interface ApiToolOperations {
  /** Lists a collection of the MCP tools for the specified API. */
  listByApi: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: ApiToolListByApiOptionalParams,
  ) => PagedAsyncIterableIterator<ToolContract>;
  /** Deletes the specified tool in the API. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    toolId: string,
    options?: ApiToolDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the tool in the API specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    toolId: string,
    parameters: ToolContract,
    options?: ApiToolUpdateOptionalParams,
  ) => Promise<ToolContract>;
  /** Creates a new tool in the API or updates an existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    toolId: string,
    parameters: ToolContract,
    options?: ApiToolCreateOrUpdateOptionalParams,
  ) => Promise<ToolContract>;
  /** Gets the entity state (Etag) version of the API tool specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    toolId: string,
    options?: ApiToolGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the API Tool specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    toolId: string,
    options?: ApiToolGetOptionalParams,
  ) => Promise<ToolContract>;
}

function _getApiTool(context: ApiManagementContext) {
  return {
    listByApi: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: ApiToolListByApiOptionalParams,
    ) => listByApi(context, resourceGroupName, serviceName, apiId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      toolId: string,
      options?: ApiToolDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, apiId, toolId, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      toolId: string,
      parameters: ToolContract,
      options?: ApiToolUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, apiId, toolId, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      toolId: string,
      parameters: ToolContract,
      options?: ApiToolCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, serviceName, apiId, toolId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      toolId: string,
      options?: ApiToolGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, apiId, toolId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      toolId: string,
      options?: ApiToolGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, apiId, toolId, options),
  };
}

export function _getApiToolOperations(context: ApiManagementContext): ApiToolOperations {
  return {
    ..._getApiTool(context),
  };
}
