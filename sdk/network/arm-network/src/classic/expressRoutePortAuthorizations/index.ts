// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/expressRoutePortAuthorizations/operations.js";
import {
  ExpressRoutePortAuthorizationsListOptionalParams,
  ExpressRoutePortAuthorizationsDeleteOptionalParams,
  ExpressRoutePortAuthorizationsCreateOrUpdateOptionalParams,
  ExpressRoutePortAuthorizationsGetOptionalParams,
} from "../../api/expressRoutePortAuthorizations/options.js";
import { ExpressRoutePortAuthorization } from "../../models/microsoft/network/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExpressRoutePortAuthorizations operations. */
export interface ExpressRoutePortAuthorizationsOperations {
  /** Gets all authorizations in an express route port. */
  list: (
    resourceGroupName: string,
    expressRoutePortName: string,
    options?: ExpressRoutePortAuthorizationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressRoutePortAuthorization>;
  /** Deletes the specified authorization from the specified express route port. */
  delete: (
    resourceGroupName: string,
    expressRoutePortName: string,
    authorizationName: string,
    options?: ExpressRoutePortAuthorizationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    expressRoutePortName: string,
    authorizationName: string,
    options?: ExpressRoutePortAuthorizationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    expressRoutePortName: string,
    authorizationName: string,
    options?: ExpressRoutePortAuthorizationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an authorization in the specified express route port. */
  createOrUpdate: (
    resourceGroupName: string,
    expressRoutePortName: string,
    authorizationName: string,
    authorizationParameters: ExpressRoutePortAuthorization,
    options?: ExpressRoutePortAuthorizationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ExpressRoutePortAuthorization>, ExpressRoutePortAuthorization>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    expressRoutePortName: string,
    authorizationName: string,
    authorizationParameters: ExpressRoutePortAuthorization,
    options?: ExpressRoutePortAuthorizationsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ExpressRoutePortAuthorization>, ExpressRoutePortAuthorization>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    expressRoutePortName: string,
    authorizationName: string,
    authorizationParameters: ExpressRoutePortAuthorization,
    options?: ExpressRoutePortAuthorizationsCreateOrUpdateOptionalParams,
  ) => Promise<ExpressRoutePortAuthorization>;
  /** Gets the specified authorization from the specified express route port. */
  get: (
    resourceGroupName: string,
    expressRoutePortName: string,
    authorizationName: string,
    options?: ExpressRoutePortAuthorizationsGetOptionalParams,
  ) => Promise<ExpressRoutePortAuthorization>;
}

function _getExpressRoutePortAuthorizations(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      expressRoutePortName: string,
      options?: ExpressRoutePortAuthorizationsListOptionalParams,
    ) => list(context, resourceGroupName, expressRoutePortName, options),
    delete: (
      resourceGroupName: string,
      expressRoutePortName: string,
      authorizationName: string,
      options?: ExpressRoutePortAuthorizationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, expressRoutePortName, authorizationName, options),
    beginDelete: async (
      resourceGroupName: string,
      expressRoutePortName: string,
      authorizationName: string,
      options?: ExpressRoutePortAuthorizationsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        expressRoutePortName,
        authorizationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      expressRoutePortName: string,
      authorizationName: string,
      options?: ExpressRoutePortAuthorizationsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        expressRoutePortName,
        authorizationName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      expressRoutePortName: string,
      authorizationName: string,
      authorizationParameters: ExpressRoutePortAuthorization,
      options?: ExpressRoutePortAuthorizationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        expressRoutePortName,
        authorizationName,
        authorizationParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      expressRoutePortName: string,
      authorizationName: string,
      authorizationParameters: ExpressRoutePortAuthorization,
      options?: ExpressRoutePortAuthorizationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        expressRoutePortName,
        authorizationName,
        authorizationParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      expressRoutePortName: string,
      authorizationName: string,
      authorizationParameters: ExpressRoutePortAuthorization,
      options?: ExpressRoutePortAuthorizationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        expressRoutePortName,
        authorizationName,
        authorizationParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      expressRoutePortName: string,
      authorizationName: string,
      options?: ExpressRoutePortAuthorizationsGetOptionalParams,
    ) => get(context, resourceGroupName, expressRoutePortName, authorizationName, options),
  };
}

export function _getExpressRoutePortAuthorizationsOperations(
  context: NetworkManagementContext,
): ExpressRoutePortAuthorizationsOperations {
  return {
    ..._getExpressRoutePortAuthorizations(context),
  };
}
