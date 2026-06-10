// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import { listByEndpoint, $delete, update, create, get } from "../../api/originGroups/operations.js";
import type {
  OriginGroupsListByEndpointOptionalParams,
  OriginGroupsDeleteOptionalParams,
  OriginGroupsUpdateOptionalParams,
  OriginGroupsCreateOptionalParams,
  OriginGroupsGetOptionalParams,
} from "../../api/originGroups/options.js";
import type { OriginGroup, OriginGroupUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a OriginGroups operations. */
export interface OriginGroupsOperations {
  /** Lists all of the existing origin groups within an endpoint. */
  listByEndpoint: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    options?: OriginGroupsListByEndpointOptionalParams,
  ) => PagedAsyncIterableIterator<OriginGroup>;
  /** Deletes an existing origin group within an endpoint. */
  delete: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    originGroupName: string,
    options?: OriginGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an existing origin group within an endpoint. */
  update: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    originGroupName: string,
    originGroupUpdateProperties: OriginGroupUpdateParameters,
    options?: OriginGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<OriginGroup>, OriginGroup>;
  /** Creates a new origin group within the specified endpoint. */
  create: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    originGroupName: string,
    originGroup: OriginGroup,
    options?: OriginGroupsCreateOptionalParams,
  ) => PollerLike<OperationState<OriginGroup>, OriginGroup>;
  /** Gets an existing origin group within an endpoint. */
  get: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    originGroupName: string,
    options?: OriginGroupsGetOptionalParams,
  ) => Promise<OriginGroup>;
}

function _getOriginGroups(context: CdnManagementContext) {
  return {
    listByEndpoint: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      options?: OriginGroupsListByEndpointOptionalParams,
    ) => listByEndpoint(context, resourceGroupName, profileName, endpointName, options),
    delete: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      originGroupName: string,
      options?: OriginGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, profileName, endpointName, originGroupName, options),
    update: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      originGroupName: string,
      originGroupUpdateProperties: OriginGroupUpdateParameters,
      options?: OriginGroupsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        originGroupName,
        originGroupUpdateProperties,
        options,
      ),
    create: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      originGroupName: string,
      originGroup: OriginGroup,
      options?: OriginGroupsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        originGroupName,
        originGroup,
        options,
      ),
    get: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      originGroupName: string,
      options?: OriginGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, profileName, endpointName, originGroupName, options),
  };
}

export function _getOriginGroupsOperations(context: CdnManagementContext): OriginGroupsOperations {
  return {
    ..._getOriginGroups(context),
  };
}
