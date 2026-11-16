// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listAll,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/authenticationPolicies/operations.js";
import type {
  AuthenticationPoliciesListAllOptionalParams,
  AuthenticationPoliciesListOptionalParams,
  AuthenticationPoliciesDeleteOptionalParams,
  AuthenticationPoliciesUpdateOptionalParams,
  AuthenticationPoliciesCreateOrUpdateOptionalParams,
  AuthenticationPoliciesGetOptionalParams,
} from "../../api/authenticationPolicies/options.js";
import type {
  AuthenticationPolicy,
  AuthenticationPolicyUpdateParameters,
} from "../../models/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AuthenticationPolicies operations. */
export interface AuthenticationPoliciesOperations {
  /** Gets all the authentication policies in a subscription. */
  listAll: (
    options?: AuthenticationPoliciesListAllOptionalParams,
  ) => PagedAsyncIterableIterator<AuthenticationPolicy>;
  /** Lists all of the authentication policies within a resource group. */
  list: (
    resourceGroupName: string,
    options?: AuthenticationPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<AuthenticationPolicy>;
  /** Deletes the specified authentication policy. */
  delete: (
    resourceGroupName: string,
    authenticationPolicyName: string,
    options?: AuthenticationPoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the tags and identity of an authentication policy. */
  update: (
    resourceGroupName: string,
    authenticationPolicyName: string,
    parameters: AuthenticationPolicyUpdateParameters,
    options?: AuthenticationPoliciesUpdateOptionalParams,
  ) => Promise<AuthenticationPolicy>;
  /** Creates or updates an authentication policy with the specified name within a resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    authenticationPolicyName: string,
    resource: AuthenticationPolicy,
    options?: AuthenticationPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AuthenticationPolicy>, AuthenticationPolicy>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    authenticationPolicyName: string,
    resource: AuthenticationPolicy,
    options?: AuthenticationPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AuthenticationPolicy>, AuthenticationPolicy>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    authenticationPolicyName: string,
    resource: AuthenticationPolicy,
    options?: AuthenticationPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<AuthenticationPolicy>;
  /** Retrieve the authentication policy with specified name within a resource group. */
  get: (
    resourceGroupName: string,
    authenticationPolicyName: string,
    options?: AuthenticationPoliciesGetOptionalParams,
  ) => Promise<AuthenticationPolicy>;
}

function _getAuthenticationPolicies(context: NetworkManagementContext) {
  return {
    listAll: (options?: AuthenticationPoliciesListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: AuthenticationPoliciesListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      authenticationPolicyName: string,
      options?: AuthenticationPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, authenticationPolicyName, options),
    update: (
      resourceGroupName: string,
      authenticationPolicyName: string,
      parameters: AuthenticationPolicyUpdateParameters,
      options?: AuthenticationPoliciesUpdateOptionalParams,
    ) => update(context, resourceGroupName, authenticationPolicyName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      authenticationPolicyName: string,
      resource: AuthenticationPolicy,
      options?: AuthenticationPoliciesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, authenticationPolicyName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      authenticationPolicyName: string,
      resource: AuthenticationPolicy,
      options?: AuthenticationPoliciesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        authenticationPolicyName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      authenticationPolicyName: string,
      resource: AuthenticationPolicy,
      options?: AuthenticationPoliciesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        authenticationPolicyName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      authenticationPolicyName: string,
      options?: AuthenticationPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, authenticationPolicyName, options),
  };
}

export function _getAuthenticationPoliciesOperations(
  context: NetworkManagementContext,
): AuthenticationPoliciesOperations {
  return {
    ..._getAuthenticationPolicies(context),
  };
}
