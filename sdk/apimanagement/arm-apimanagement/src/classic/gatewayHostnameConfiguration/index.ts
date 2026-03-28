// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/gatewayHostnameConfiguration/operations.js";
import type {
  GatewayHostnameConfigurationListByServiceOptionalParams,
  GatewayHostnameConfigurationDeleteOptionalParams,
  GatewayHostnameConfigurationCreateOrUpdateOptionalParams,
  GatewayHostnameConfigurationGetEntityTagOptionalParams,
  GatewayHostnameConfigurationGetOptionalParams,
} from "../../api/gatewayHostnameConfiguration/options.js";
import type { GatewayHostnameConfigurationContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GatewayHostnameConfiguration operations. */
export interface GatewayHostnameConfigurationOperations {
  /** Lists the collection of hostname configurations for the specified gateway. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    options?: GatewayHostnameConfigurationListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<GatewayHostnameConfigurationContract>;
  /** Deletes the specified hostname configuration from the specified Gateway. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    hcId: string,
    ifMatch: string,
    options?: GatewayHostnameConfigurationDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates of updates hostname configuration for a Gateway. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    hcId: string,
    parameters: GatewayHostnameConfigurationContract,
    options?: GatewayHostnameConfigurationCreateOrUpdateOptionalParams,
  ) => Promise<GatewayHostnameConfigurationContract>;
  /** Checks that hostname configuration entity specified by identifier exists for specified Gateway entity. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    hcId: string,
    options?: GatewayHostnameConfigurationGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Get details of a hostname configuration */
  get: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    hcId: string,
    options?: GatewayHostnameConfigurationGetOptionalParams,
  ) => Promise<GatewayHostnameConfigurationContract>;
}

function _getGatewayHostnameConfiguration(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      options?: GatewayHostnameConfigurationListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, gatewayId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      hcId: string,
      ifMatch: string,
      options?: GatewayHostnameConfigurationDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, gatewayId, hcId, ifMatch, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      hcId: string,
      parameters: GatewayHostnameConfigurationContract,
      options?: GatewayHostnameConfigurationCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, serviceName, gatewayId, hcId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      hcId: string,
      options?: GatewayHostnameConfigurationGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, gatewayId, hcId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      hcId: string,
      options?: GatewayHostnameConfigurationGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, gatewayId, hcId, options),
  };
}

export function _getGatewayHostnameConfigurationOperations(
  context: ApiManagementContext,
): GatewayHostnameConfigurationOperations {
  return {
    ..._getGatewayHostnameConfiguration(context),
  };
}
