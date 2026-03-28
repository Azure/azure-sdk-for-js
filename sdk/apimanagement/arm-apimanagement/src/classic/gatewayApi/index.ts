// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  $delete,
  createOrUpdate,
  getEntityTag,
  listByService,
} from "../../api/gatewayApi/operations.js";
import type {
  GatewayApiDeleteOptionalParams,
  GatewayApiCreateOrUpdateOptionalParams,
  GatewayApiGetEntityTagOptionalParams,
  GatewayApiListByServiceOptionalParams,
} from "../../api/gatewayApi/options.js";
import type { ApiContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GatewayApi operations. */
export interface GatewayApiOperations {
  /** Deletes the specified API from the specified Gateway. */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    apiId: string,
    options?: GatewayApiDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds an API to the specified Gateway. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    apiId: string,
    options?: GatewayApiCreateOrUpdateOptionalParams,
  ) => Promise<ApiContract>;
  /** Checks that API entity specified by identifier is associated with the Gateway entity. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    apiId: string,
    options?: GatewayApiGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Lists a collection of the APIs associated with a gateway. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    options?: GatewayApiListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<ApiContract>;
}

function _getGatewayApi(context: ApiManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      apiId: string,
      options?: GatewayApiDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, gatewayId, apiId, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      apiId: string,
      options?: GatewayApiCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, gatewayId, apiId, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      apiId: string,
      options?: GatewayApiGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, gatewayId, apiId, options),
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      options?: GatewayApiListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, gatewayId, options),
  };
}

export function _getGatewayApiOperations(context: ApiManagementContext): GatewayApiOperations {
  return {
    ..._getGatewayApi(context),
  };
}
