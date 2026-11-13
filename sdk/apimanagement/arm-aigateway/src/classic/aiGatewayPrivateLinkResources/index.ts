// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByAiGateway, get } from "../../api/aiGatewayPrivateLinkResources/operations.js";
import type {
  AiGatewayPrivateLinkResourcesListByAiGatewayOptionalParams,
  AiGatewayPrivateLinkResourcesGetOptionalParams,
} from "../../api/aiGatewayPrivateLinkResources/options.js";
import type { AiGatewayPrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AiGatewayPrivateLinkResources operations. */
export interface AiGatewayPrivateLinkResourcesOperations {
  /** List AiGatewayResource PrivateLinks */
  listByAiGateway: (
    resourceGroupName: string,
    aiGatewayName: string,
    options?: AiGatewayPrivateLinkResourcesListByAiGatewayOptionalParams,
  ) => PagedAsyncIterableIterator<AiGatewayPrivateLinkResource>;
  /** Get a AiGatewayResource PrivateLink */
  get: (
    resourceGroupName: string,
    aiGatewayName: string,
    privateLinkResourceName: string,
    options?: AiGatewayPrivateLinkResourcesGetOptionalParams,
  ) => Promise<AiGatewayPrivateLinkResource>;
}

function _getAiGatewayPrivateLinkResources(context: ApiManagementContext) {
  return {
    listByAiGateway: (
      resourceGroupName: string,
      aiGatewayName: string,
      options?: AiGatewayPrivateLinkResourcesListByAiGatewayOptionalParams,
    ) => listByAiGateway(context, resourceGroupName, aiGatewayName, options),
    get: (
      resourceGroupName: string,
      aiGatewayName: string,
      privateLinkResourceName: string,
      options?: AiGatewayPrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, aiGatewayName, privateLinkResourceName, options),
  };
}

export function _getAiGatewayPrivateLinkResourcesOperations(
  context: ApiManagementContext,
): AiGatewayPrivateLinkResourcesOperations {
  return {
    ..._getAiGatewayPrivateLinkResources(context),
  };
}
