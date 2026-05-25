// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  listByResourceGroup,
  listBySubscription,
  $delete,
  patch,
  createOrUpdate,
  get,
} from "../../api/aiGateways/operations.js";
import {
  AiGatewaysListByResourceGroupOptionalParams,
  AiGatewaysListBySubscriptionOptionalParams,
  AiGatewaysDeleteOptionalParams,
  AiGatewaysPatchOptionalParams,
  AiGatewaysCreateOrUpdateOptionalParams,
  AiGatewaysGetOptionalParams,
} from "../../api/aiGateways/options.js";
import { AiGateway, AiGatewayTagsUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AiGateways operations. */
export interface AiGatewaysOperations {
  /** List AiGateway resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AiGatewaysListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AiGateway>;
  /** List AiGateway resources by subscription ID */
  listBySubscription: (
    options?: AiGatewaysListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AiGateway>;
  /** Delete a AiGateway */
  delete: (
    resourceGroupName: string,
    name: string,
    options?: AiGatewaysDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a AiGateway */
  patch: (
    resourceGroupName: string,
    name: string,
    properties: AiGatewayTagsUpdate,
    options?: AiGatewaysPatchOptionalParams,
  ) => Promise<AiGateway>;
  /** Create a AiGateway */
  createOrUpdate: (
    resourceGroupName: string,
    name: string,
    resource: AiGateway,
    options?: AiGatewaysCreateOrUpdateOptionalParams,
  ) => Promise<AiGateway>;
  /** Get a AiGateway */
  get: (
    resourceGroupName: string,
    name: string,
    options?: AiGatewaysGetOptionalParams,
  ) => Promise<AiGateway>;
}

function _getAiGateways(context: WebSiteManagementContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AiGatewaysListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    listBySubscription: (options?: AiGatewaysListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    delete: (resourceGroupName: string, name: string, options?: AiGatewaysDeleteOptionalParams) =>
      $delete(context, resourceGroupName, name, options),
    patch: (
      resourceGroupName: string,
      name: string,
      properties: AiGatewayTagsUpdate,
      options?: AiGatewaysPatchOptionalParams,
    ) => patch(context, resourceGroupName, name, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      name: string,
      resource: AiGateway,
      options?: AiGatewaysCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, name, resource, options),
    get: (resourceGroupName: string, name: string, options?: AiGatewaysGetOptionalParams) =>
      get(context, resourceGroupName, name, options),
  };
}

export function _getAiGatewaysOperations(context: WebSiteManagementContext): AiGatewaysOperations {
  return {
    ..._getAiGateways(context),
  };
}
