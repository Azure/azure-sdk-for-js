// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import { listByProfile, $delete, update, create, get } from "../../api/authPolicies/operations.js";
import type {
  AuthPoliciesListByProfileOptionalParams,
  AuthPoliciesDeleteOptionalParams,
  AuthPoliciesUpdateOptionalParams,
  AuthPoliciesCreateOptionalParams,
  AuthPoliciesGetOptionalParams,
} from "../../api/authPolicies/options.js";
import type { AuthPolicy, AuthPolicyUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AuthPolicies operations. */
export interface AuthPoliciesOperations {
  /** Lists authorization policies associated with the profile. */
  listByProfile: (
    resourceGroupName: string,
    profileName: string,
    options?: AuthPoliciesListByProfileOptionalParams,
  ) => PagedAsyncIterableIterator<AuthPolicy>;
  /** Deletes an existing authorization policy within a profile. */
  delete: (
    resourceGroupName: string,
    profileName: string,
    authPolicyName: string,
    options?: AuthPoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    profileName: string,
    authPolicyName: string,
    options?: AuthPoliciesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    profileName: string,
    authPolicyName: string,
    options?: AuthPoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing authorization policy within a profile. */
  update: (
    resourceGroupName: string,
    profileName: string,
    authPolicyName: string,
    properties: AuthPolicyUpdateParameters,
    options?: AuthPoliciesUpdateOptionalParams,
  ) => PollerLike<OperationState<AuthPolicy>, AuthPolicy>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    profileName: string,
    authPolicyName: string,
    properties: AuthPolicyUpdateParameters,
    options?: AuthPoliciesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AuthPolicy>, AuthPolicy>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    profileName: string,
    authPolicyName: string,
    properties: AuthPolicyUpdateParameters,
    options?: AuthPoliciesUpdateOptionalParams,
  ) => Promise<AuthPolicy>;
  /** Creates or updates an authorization policy within the specified profile. */
  create: (
    resourceGroupName: string,
    profileName: string,
    authPolicyName: string,
    resource: AuthPolicy,
    options?: AuthPoliciesCreateOptionalParams,
  ) => PollerLike<OperationState<AuthPolicy>, AuthPolicy>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    profileName: string,
    authPolicyName: string,
    resource: AuthPolicy,
    options?: AuthPoliciesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AuthPolicy>, AuthPolicy>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    profileName: string,
    authPolicyName: string,
    resource: AuthPolicy,
    options?: AuthPoliciesCreateOptionalParams,
  ) => Promise<AuthPolicy>;
  /** Gets an existing authorization policy within a profile. */
  get: (
    resourceGroupName: string,
    profileName: string,
    authPolicyName: string,
    options?: AuthPoliciesGetOptionalParams,
  ) => Promise<AuthPolicy>;
}

function _getAuthPolicies(context: CdnManagementContext) {
  return {
    listByProfile: (
      resourceGroupName: string,
      profileName: string,
      options?: AuthPoliciesListByProfileOptionalParams,
    ) => listByProfile(context, resourceGroupName, profileName, options),
    delete: (
      resourceGroupName: string,
      profileName: string,
      authPolicyName: string,
      options?: AuthPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, profileName, authPolicyName, options),
    beginDelete: async (
      resourceGroupName: string,
      profileName: string,
      authPolicyName: string,
      options?: AuthPoliciesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, profileName, authPolicyName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      profileName: string,
      authPolicyName: string,
      options?: AuthPoliciesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, profileName, authPolicyName, options);
    },
    update: (
      resourceGroupName: string,
      profileName: string,
      authPolicyName: string,
      properties: AuthPolicyUpdateParameters,
      options?: AuthPoliciesUpdateOptionalParams,
    ) => update(context, resourceGroupName, profileName, authPolicyName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      profileName: string,
      authPolicyName: string,
      properties: AuthPolicyUpdateParameters,
      options?: AuthPoliciesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        profileName,
        authPolicyName,
        properties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      profileName: string,
      authPolicyName: string,
      properties: AuthPolicyUpdateParameters,
      options?: AuthPoliciesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        profileName,
        authPolicyName,
        properties,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      profileName: string,
      authPolicyName: string,
      resource: AuthPolicy,
      options?: AuthPoliciesCreateOptionalParams,
    ) => create(context, resourceGroupName, profileName, authPolicyName, resource, options),
    beginCreate: async (
      resourceGroupName: string,
      profileName: string,
      authPolicyName: string,
      resource: AuthPolicy,
      options?: AuthPoliciesCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        profileName,
        authPolicyName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      profileName: string,
      authPolicyName: string,
      resource: AuthPolicy,
      options?: AuthPoliciesCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        profileName,
        authPolicyName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      profileName: string,
      authPolicyName: string,
      options?: AuthPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, profileName, authPolicyName, options),
  };
}

export function _getAuthPoliciesOperations(context: CdnManagementContext): AuthPoliciesOperations {
  return {
    ..._getAuthPolicies(context),
  };
}
