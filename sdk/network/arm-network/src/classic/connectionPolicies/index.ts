// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/connectionPolicies/operations.js";
import type {
  ConnectionPoliciesListOptionalParams,
  ConnectionPoliciesDeleteOptionalParams,
  ConnectionPoliciesCreateOrUpdateOptionalParams,
  ConnectionPoliciesGetOptionalParams,
} from "../../api/connectionPolicies/options.js";
import type { ConnectionPolicy } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ConnectionPolicies operations. */
export interface ConnectionPoliciesOperations {
  /** Retrieves the details of all ConnectionPolicies. */
  list: (
    resourceGroupName: string,
    virtualHubName: string,
    options?: ConnectionPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectionPolicy>;
  /** Deletes a ConnectionPolicy. */
  delete: (
    resourceGroupName: string,
    virtualHubName: string,
    connectionPolicyName: string,
    options?: ConnectionPoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualHubName: string,
    connectionPolicyName: string,
    options?: ConnectionPoliciesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    connectionPolicyName: string,
    options?: ConnectionPoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a ConnectionPolicy if it doesn't exist else updates the existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualHubName: string,
    connectionPolicyName: string,
    resource: ConnectionPolicy,
    options?: ConnectionPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ConnectionPolicy>, ConnectionPolicy>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualHubName: string,
    connectionPolicyName: string,
    resource: ConnectionPolicy,
    options?: ConnectionPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ConnectionPolicy>, ConnectionPolicy>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    connectionPolicyName: string,
    resource: ConnectionPolicy,
    options?: ConnectionPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<ConnectionPolicy>;
  /** Retrieves the details of a ConnectionPolicy. */
  get: (
    resourceGroupName: string,
    virtualHubName: string,
    connectionPolicyName: string,
    options?: ConnectionPoliciesGetOptionalParams,
  ) => Promise<ConnectionPolicy>;
}

function _getConnectionPolicies(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      virtualHubName: string,
      options?: ConnectionPoliciesListOptionalParams,
    ) => list(context, resourceGroupName, virtualHubName, options),
    delete: (
      resourceGroupName: string,
      virtualHubName: string,
      connectionPolicyName: string,
      options?: ConnectionPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualHubName, connectionPolicyName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualHubName: string,
      connectionPolicyName: string,
      options?: ConnectionPoliciesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        virtualHubName,
        connectionPolicyName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualHubName: string,
      connectionPolicyName: string,
      options?: ConnectionPoliciesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        virtualHubName,
        connectionPolicyName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      virtualHubName: string,
      connectionPolicyName: string,
      resource: ConnectionPolicy,
      options?: ConnectionPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        connectionPolicyName,
        resource,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualHubName: string,
      connectionPolicyName: string,
      resource: ConnectionPolicy,
      options?: ConnectionPoliciesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        connectionPolicyName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualHubName: string,
      connectionPolicyName: string,
      resource: ConnectionPolicy,
      options?: ConnectionPoliciesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        connectionPolicyName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualHubName: string,
      connectionPolicyName: string,
      options?: ConnectionPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, virtualHubName, connectionPolicyName, options),
  };
}

export function _getConnectionPoliciesOperations(
  context: NetworkManagementContext,
): ConnectionPoliciesOperations {
  return {
    ..._getConnectionPolicies(context),
  };
}
