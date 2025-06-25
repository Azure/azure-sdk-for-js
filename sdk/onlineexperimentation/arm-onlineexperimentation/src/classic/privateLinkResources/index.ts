// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OnlineExperimentationContext } from "../../api/onlineExperimentationContext.js";
import { PrivateLinkResource } from "../../models/models.js";
import {
  PrivateLinkResourcesListOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "../../api/privateLinkResources/options.js";
import { list, get } from "../../api/privateLinkResources/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the list of private link resources for an online experimentation workspace resource. */
  list: (
    apiVersion: string,
    resourceGroupName: string,
    workspaceName: string,
    options?: PrivateLinkResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
  /** Gets a private link resource for an online experimentation workspace resource. */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    workspaceName: string,
    privateLinkResourceName: string,
    options?: PrivateLinkResourcesGetOptionalParams,
  ) => Promise<PrivateLinkResource>;
}

function _getPrivateLinkResources(context: OnlineExperimentationContext) {
  return {
    list: (
      apiVersion: string,
      resourceGroupName: string,
      workspaceName: string,
      options?: PrivateLinkResourcesListOptionalParams,
    ) => list(context, apiVersion, resourceGroupName, workspaceName, options),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      workspaceName: string,
      privateLinkResourceName: string,
      options?: PrivateLinkResourcesGetOptionalParams,
    ) =>
      get(context, apiVersion, resourceGroupName, workspaceName, privateLinkResourceName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: OnlineExperimentationContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
