// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PowerPlatformContext } from "../../api/powerPlatformContext.js";
import { listByEnterprisePolicy, get } from "../../api/privateLinkResources/operations.js";
import {
  PrivateLinkResourcesListByEnterprisePolicyOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "../../api/privateLinkResources/options.js";
import { PrivateLinkResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the private link resources that need to be created for enterprisePolicy. */
  listByEnterprisePolicy: (
    resourceGroupName: string,
    enterprisePolicyName: string,
    options?: PrivateLinkResourcesListByEnterprisePolicyOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
  /** Gets the private link resources that need to be created for an EnterprisePolicy. */
  get: (
    resourceGroupName: string,
    enterprisePolicyName: string,
    groupName: string,
    options?: PrivateLinkResourcesGetOptionalParams,
  ) => Promise<PrivateLinkResource>;
}

function _getPrivateLinkResources(context: PowerPlatformContext) {
  return {
    listByEnterprisePolicy: (
      resourceGroupName: string,
      enterprisePolicyName: string,
      options?: PrivateLinkResourcesListByEnterprisePolicyOptionalParams,
    ) => listByEnterprisePolicy(context, resourceGroupName, enterprisePolicyName, options),
    get: (
      resourceGroupName: string,
      enterprisePolicyName: string,
      groupName: string,
      options?: PrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, enterprisePolicyName, groupName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: PowerPlatformContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
