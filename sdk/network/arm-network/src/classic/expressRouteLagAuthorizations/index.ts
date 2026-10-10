// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listKeys,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/expressRouteLagAuthorizations/operations.js";
import type {
  ExpressRouteLagAuthorizationsListKeysOptionalParams,
  ExpressRouteLagAuthorizationsListOptionalParams,
  ExpressRouteLagAuthorizationsDeleteOptionalParams,
  ExpressRouteLagAuthorizationsCreateOrUpdateOptionalParams,
  ExpressRouteLagAuthorizationsGetOptionalParams,
} from "../../api/expressRouteLagAuthorizations/options.js";
import type {
  ExpressRouteAuthorizationKey,
  ExpressRouteLagAuthorization,
} from "../../models/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExpressRouteLagAuthorizations operations. */
export interface ExpressRouteLagAuthorizationsOperations {
  /** Gets the authorization key associated with the specified express route LAG authorization. */
  listKeys: (
    resourceGroupName: string,
    expressRouteLagName: string,
    authorizationName: string,
    options?: ExpressRouteLagAuthorizationsListKeysOptionalParams,
  ) => Promise<ExpressRouteAuthorizationKey>;
  /** Gets all authorizations in an express route LAG. */
  list: (
    resourceGroupName: string,
    expressRouteLagName: string,
    options?: ExpressRouteLagAuthorizationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressRouteLagAuthorization>;
  /** Deletes the specified authorization from the specified express route LAG. */
  delete: (
    resourceGroupName: string,
    expressRouteLagName: string,
    authorizationName: string,
    options?: ExpressRouteLagAuthorizationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    expressRouteLagName: string,
    authorizationName: string,
    options?: ExpressRouteLagAuthorizationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    expressRouteLagName: string,
    authorizationName: string,
    options?: ExpressRouteLagAuthorizationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an authorization in the specified express route LAG. */
  createOrUpdate: (
    resourceGroupName: string,
    expressRouteLagName: string,
    authorizationName: string,
    authorizationParameters: ExpressRouteLagAuthorization,
    options?: ExpressRouteLagAuthorizationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ExpressRouteLagAuthorization>, ExpressRouteLagAuthorization>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    expressRouteLagName: string,
    authorizationName: string,
    authorizationParameters: ExpressRouteLagAuthorization,
    options?: ExpressRouteLagAuthorizationsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ExpressRouteLagAuthorization>, ExpressRouteLagAuthorization>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    expressRouteLagName: string,
    authorizationName: string,
    authorizationParameters: ExpressRouteLagAuthorization,
    options?: ExpressRouteLagAuthorizationsCreateOrUpdateOptionalParams,
  ) => Promise<ExpressRouteLagAuthorization>;
  /** Gets the specified authorization from the specified express route LAG. */
  get: (
    resourceGroupName: string,
    expressRouteLagName: string,
    authorizationName: string,
    options?: ExpressRouteLagAuthorizationsGetOptionalParams,
  ) => Promise<ExpressRouteLagAuthorization>;
}

function _getExpressRouteLagAuthorizations(context: NetworkManagementContext) {
  return {
    listKeys: (
      resourceGroupName: string,
      expressRouteLagName: string,
      authorizationName: string,
      options?: ExpressRouteLagAuthorizationsListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, expressRouteLagName, authorizationName, options),
    list: (
      resourceGroupName: string,
      expressRouteLagName: string,
      options?: ExpressRouteLagAuthorizationsListOptionalParams,
    ) => list(context, resourceGroupName, expressRouteLagName, options),
    delete: (
      resourceGroupName: string,
      expressRouteLagName: string,
      authorizationName: string,
      options?: ExpressRouteLagAuthorizationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, expressRouteLagName, authorizationName, options),
    beginDelete: async (
      resourceGroupName: string,
      expressRouteLagName: string,
      authorizationName: string,
      options?: ExpressRouteLagAuthorizationsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        expressRouteLagName,
        authorizationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      expressRouteLagName: string,
      authorizationName: string,
      options?: ExpressRouteLagAuthorizationsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        expressRouteLagName,
        authorizationName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      expressRouteLagName: string,
      authorizationName: string,
      authorizationParameters: ExpressRouteLagAuthorization,
      options?: ExpressRouteLagAuthorizationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        expressRouteLagName,
        authorizationName,
        authorizationParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      expressRouteLagName: string,
      authorizationName: string,
      authorizationParameters: ExpressRouteLagAuthorization,
      options?: ExpressRouteLagAuthorizationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        expressRouteLagName,
        authorizationName,
        authorizationParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      expressRouteLagName: string,
      authorizationName: string,
      authorizationParameters: ExpressRouteLagAuthorization,
      options?: ExpressRouteLagAuthorizationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        expressRouteLagName,
        authorizationName,
        authorizationParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      expressRouteLagName: string,
      authorizationName: string,
      options?: ExpressRouteLagAuthorizationsGetOptionalParams,
    ) => get(context, resourceGroupName, expressRouteLagName, authorizationName, options),
  };
}

export function _getExpressRouteLagAuthorizationsOperations(
  context: NetworkManagementContext,
): ExpressRouteLagAuthorizationsOperations {
  return {
    ..._getExpressRouteLagAuthorizations(context),
  };
}
