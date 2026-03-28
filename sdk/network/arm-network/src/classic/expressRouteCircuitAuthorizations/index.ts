// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/expressRouteCircuitAuthorizations/operations.js";
import type {
  ExpressRouteCircuitAuthorizationsListOptionalParams,
  ExpressRouteCircuitAuthorizationsDeleteOptionalParams,
  ExpressRouteCircuitAuthorizationsCreateOrUpdateOptionalParams,
  ExpressRouteCircuitAuthorizationsGetOptionalParams,
} from "../../api/expressRouteCircuitAuthorizations/options.js";
import type { ExpressRouteCircuitAuthorization } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExpressRouteCircuitAuthorizations operations. */
export interface ExpressRouteCircuitAuthorizationsOperations {
  /** Gets all authorizations in an express route circuit. */
  list: (
    resourceGroupName: string,
    circuitName: string,
    options?: ExpressRouteCircuitAuthorizationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressRouteCircuitAuthorization>;
  /** Deletes the specified authorization from the specified express route circuit. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    circuitName: string,
    authorizationName: string,
    options?: ExpressRouteCircuitAuthorizationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    circuitName: string,
    authorizationName: string,
    options?: ExpressRouteCircuitAuthorizationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    circuitName: string,
    authorizationName: string,
    options?: ExpressRouteCircuitAuthorizationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an authorization in the specified express route circuit. */
  createOrUpdate: (
    resourceGroupName: string,
    circuitName: string,
    authorizationName: string,
    authorizationParameters: ExpressRouteCircuitAuthorization,
    options?: ExpressRouteCircuitAuthorizationsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<ExpressRouteCircuitAuthorization>,
    ExpressRouteCircuitAuthorization
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    circuitName: string,
    authorizationName: string,
    authorizationParameters: ExpressRouteCircuitAuthorization,
    options?: ExpressRouteCircuitAuthorizationsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ExpressRouteCircuitAuthorization>,
      ExpressRouteCircuitAuthorization
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    circuitName: string,
    authorizationName: string,
    authorizationParameters: ExpressRouteCircuitAuthorization,
    options?: ExpressRouteCircuitAuthorizationsCreateOrUpdateOptionalParams,
  ) => Promise<ExpressRouteCircuitAuthorization>;
  /** Gets the specified authorization from the specified express route circuit. */
  get: (
    resourceGroupName: string,
    circuitName: string,
    authorizationName: string,
    options?: ExpressRouteCircuitAuthorizationsGetOptionalParams,
  ) => Promise<ExpressRouteCircuitAuthorization>;
}

function _getExpressRouteCircuitAuthorizations(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      circuitName: string,
      options?: ExpressRouteCircuitAuthorizationsListOptionalParams,
    ) => list(context, resourceGroupName, circuitName, options),
    delete: (
      resourceGroupName: string,
      circuitName: string,
      authorizationName: string,
      options?: ExpressRouteCircuitAuthorizationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, circuitName, authorizationName, options),
    beginDelete: async (
      resourceGroupName: string,
      circuitName: string,
      authorizationName: string,
      options?: ExpressRouteCircuitAuthorizationsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, circuitName, authorizationName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      circuitName: string,
      authorizationName: string,
      options?: ExpressRouteCircuitAuthorizationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, circuitName, authorizationName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      circuitName: string,
      authorizationName: string,
      authorizationParameters: ExpressRouteCircuitAuthorization,
      options?: ExpressRouteCircuitAuthorizationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        circuitName,
        authorizationName,
        authorizationParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      circuitName: string,
      authorizationName: string,
      authorizationParameters: ExpressRouteCircuitAuthorization,
      options?: ExpressRouteCircuitAuthorizationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        circuitName,
        authorizationName,
        authorizationParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      circuitName: string,
      authorizationName: string,
      authorizationParameters: ExpressRouteCircuitAuthorization,
      options?: ExpressRouteCircuitAuthorizationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        circuitName,
        authorizationName,
        authorizationParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      circuitName: string,
      authorizationName: string,
      options?: ExpressRouteCircuitAuthorizationsGetOptionalParams,
    ) => get(context, resourceGroupName, circuitName, authorizationName, options),
  };
}

export function _getExpressRouteCircuitAuthorizationsOperations(
  context: NetworkManagementContext,
): ExpressRouteCircuitAuthorizationsOperations {
  return {
    ..._getExpressRouteCircuitAuthorizations(context),
  };
}
