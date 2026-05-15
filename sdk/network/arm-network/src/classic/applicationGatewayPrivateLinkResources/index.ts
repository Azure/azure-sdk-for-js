// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/applicationGatewayPrivateLinkResources/operations.js";
import { ApplicationGatewayPrivateLinkResourcesListOptionalParams } from "../../api/applicationGatewayPrivateLinkResources/options.js";
import { ApplicationGatewayPrivateLinkResource } from "../../models/microsoft/network/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApplicationGatewayPrivateLinkResources operations. */
export interface ApplicationGatewayPrivateLinkResourcesOperations {
  /** Lists all private link resources on an application gateway. */
  list: (
    resourceGroupName: string,
    applicationGatewayName: string,
    options?: ApplicationGatewayPrivateLinkResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationGatewayPrivateLinkResource>;
}

function _getApplicationGatewayPrivateLinkResources(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      applicationGatewayName: string,
      options?: ApplicationGatewayPrivateLinkResourcesListOptionalParams,
    ) => list(context, resourceGroupName, applicationGatewayName, options),
  };
}

export function _getApplicationGatewayPrivateLinkResourcesOperations(
  context: NetworkManagementContext,
): ApplicationGatewayPrivateLinkResourcesOperations {
  return {
    ..._getApplicationGatewayPrivateLinkResources(context),
  };
}
