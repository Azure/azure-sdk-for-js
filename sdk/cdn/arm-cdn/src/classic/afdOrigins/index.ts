// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import {
  listByOriginGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/afdOrigins/operations.js";
import type {
  AFDOriginsListByOriginGroupOptionalParams,
  AFDOriginsDeleteOptionalParams,
  AFDOriginsUpdateOptionalParams,
  AFDOriginsCreateOptionalParams,
  AFDOriginsGetOptionalParams,
} from "../../api/afdOrigins/options.js";
import type { AFDOrigin, AFDOriginUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AFDOrigins operations. */
export interface AFDOriginsOperations {
  /** Lists all of the existing origins within an origin group. */
  listByOriginGroup: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    options?: AFDOriginsListByOriginGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AFDOrigin>;
  /** Deletes an existing origin within an origin group. */
  delete: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    originName: string,
    options?: AFDOriginsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    originName: string,
    options?: AFDOriginsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    originName: string,
    options?: AFDOriginsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing origin within an origin group. */
  update: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    originName: string,
    originUpdateProperties: AFDOriginUpdateParameters,
    options?: AFDOriginsUpdateOptionalParams,
  ) => PollerLike<OperationState<AFDOrigin>, AFDOrigin>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    originName: string,
    originUpdateProperties: AFDOriginUpdateParameters,
    options?: AFDOriginsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AFDOrigin>, AFDOrigin>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    originName: string,
    originUpdateProperties: AFDOriginUpdateParameters,
    options?: AFDOriginsUpdateOptionalParams,
  ) => Promise<AFDOrigin>;
  /** Creates a new origin within the specified origin group. */
  create: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    originName: string,
    origin: AFDOrigin,
    options?: AFDOriginsCreateOptionalParams,
  ) => PollerLike<OperationState<AFDOrigin>, AFDOrigin>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    originName: string,
    origin: AFDOrigin,
    options?: AFDOriginsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AFDOrigin>, AFDOrigin>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    originName: string,
    origin: AFDOrigin,
    options?: AFDOriginsCreateOptionalParams,
  ) => Promise<AFDOrigin>;
  /** Gets an existing origin within an origin group. */
  get: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    originName: string,
    options?: AFDOriginsGetOptionalParams,
  ) => Promise<AFDOrigin>;
}

function _getAFDOrigins(context: CdnManagementContext) {
  return {
    listByOriginGroup: (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      options?: AFDOriginsListByOriginGroupOptionalParams,
    ) => listByOriginGroup(context, resourceGroupName, profileName, originGroupName, options),
    delete: (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      originName: string,
      options?: AFDOriginsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, profileName, originGroupName, originName, options),
    beginDelete: async (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      originName: string,
      options?: AFDOriginsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        profileName,
        originGroupName,
        originName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      originName: string,
      options?: AFDOriginsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        profileName,
        originGroupName,
        originName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      originName: string,
      originUpdateProperties: AFDOriginUpdateParameters,
      options?: AFDOriginsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        profileName,
        originGroupName,
        originName,
        originUpdateProperties,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      originName: string,
      originUpdateProperties: AFDOriginUpdateParameters,
      options?: AFDOriginsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        profileName,
        originGroupName,
        originName,
        originUpdateProperties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      originName: string,
      originUpdateProperties: AFDOriginUpdateParameters,
      options?: AFDOriginsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        profileName,
        originGroupName,
        originName,
        originUpdateProperties,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      originName: string,
      origin: AFDOrigin,
      options?: AFDOriginsCreateOptionalParams,
    ) =>
      create(context, resourceGroupName, profileName, originGroupName, originName, origin, options),
    beginCreate: async (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      originName: string,
      origin: AFDOrigin,
      options?: AFDOriginsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        profileName,
        originGroupName,
        originName,
        origin,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      originName: string,
      origin: AFDOrigin,
      options?: AFDOriginsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        profileName,
        originGroupName,
        originName,
        origin,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      originName: string,
      options?: AFDOriginsGetOptionalParams,
    ) => get(context, resourceGroupName, profileName, originGroupName, originName, options),
  };
}

export function _getAFDOriginsOperations(context: CdnManagementContext): AFDOriginsOperations {
  return {
    ..._getAFDOrigins(context),
  };
}
