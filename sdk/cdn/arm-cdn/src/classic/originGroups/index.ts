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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    originGroupName: string,
    options?: OriginGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    originGroupName: string,
    options?: OriginGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing origin group within an endpoint. */
  update: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    originGroupName: string,
    originGroupUpdateProperties: OriginGroupUpdateParameters,
    options?: OriginGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<OriginGroup>, OriginGroup>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    originGroupName: string,
    originGroupUpdateProperties: OriginGroupUpdateParameters,
    options?: OriginGroupsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OriginGroup>, OriginGroup>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    originGroupName: string,
    originGroupUpdateProperties: OriginGroupUpdateParameters,
    options?: OriginGroupsUpdateOptionalParams,
  ) => Promise<OriginGroup>;
  /** Creates a new origin group within the specified endpoint. */
  create: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    originGroupName: string,
    originGroup: OriginGroup,
    options?: OriginGroupsCreateOptionalParams,
  ) => PollerLike<OperationState<OriginGroup>, OriginGroup>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    originGroupName: string,
    originGroup: OriginGroup,
    options?: OriginGroupsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OriginGroup>, OriginGroup>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    originGroupName: string,
    originGroup: OriginGroup,
    options?: OriginGroupsCreateOptionalParams,
  ) => Promise<OriginGroup>;
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
    beginDelete: async (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      originGroupName: string,
      options?: OriginGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        originGroupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      originGroupName: string,
      options?: OriginGroupsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        originGroupName,
        options,
      );
    },
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
    beginUpdate: async (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      originGroupName: string,
      originGroupUpdateProperties: OriginGroupUpdateParameters,
      options?: OriginGroupsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        originGroupName,
        originGroupUpdateProperties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      originGroupName: string,
      originGroupUpdateProperties: OriginGroupUpdateParameters,
      options?: OriginGroupsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        originGroupName,
        originGroupUpdateProperties,
        options,
      );
    },
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
    beginCreate: async (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      originGroupName: string,
      originGroup: OriginGroup,
      options?: OriginGroupsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        originGroupName,
        originGroup,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      originGroupName: string,
      originGroup: OriginGroup,
      options?: OriginGroupsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        originGroupName,
        originGroup,
        options,
      );
    },
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
