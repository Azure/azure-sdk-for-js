// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import {
  listByProfile,
  $delete,
  patch,
  create,
  get,
} from "../../api/securityPolicies/operations.js";
import type {
  SecurityPoliciesListByProfileOptionalParams,
  SecurityPoliciesDeleteOptionalParams,
  SecurityPoliciesPatchOptionalParams,
  SecurityPoliciesCreateOptionalParams,
  SecurityPoliciesGetOptionalParams,
} from "../../api/securityPolicies/options.js";
import type { SecurityPolicy, SecurityPolicyUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SecurityPolicies operations. */
export interface SecurityPoliciesOperations {
  /** Lists security policies associated with the profile */
  listByProfile: (
    resourceGroupName: string,
    profileName: string,
    options?: SecurityPoliciesListByProfileOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityPolicy>;
  /** Deletes an existing security policy within profile. */
  delete: (
    resourceGroupName: string,
    profileName: string,
    securityPolicyName: string,
    options?: SecurityPoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    profileName: string,
    securityPolicyName: string,
    options?: SecurityPoliciesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    profileName: string,
    securityPolicyName: string,
    options?: SecurityPoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing security policy within a profile. */
  patch: (
    resourceGroupName: string,
    profileName: string,
    securityPolicyName: string,
    securityPolicyUpdateProperties: SecurityPolicyUpdateParameters,
    options?: SecurityPoliciesPatchOptionalParams,
  ) => PollerLike<OperationState<SecurityPolicy>, SecurityPolicy>;
  /** @deprecated use patch instead */
  beginPatch: (
    resourceGroupName: string,
    profileName: string,
    securityPolicyName: string,
    securityPolicyUpdateProperties: SecurityPolicyUpdateParameters,
    options?: SecurityPoliciesPatchOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SecurityPolicy>, SecurityPolicy>>;
  /** @deprecated use patch instead */
  beginPatchAndWait: (
    resourceGroupName: string,
    profileName: string,
    securityPolicyName: string,
    securityPolicyUpdateProperties: SecurityPolicyUpdateParameters,
    options?: SecurityPoliciesPatchOptionalParams,
  ) => Promise<SecurityPolicy>;
  /** Creates a new security policy within the specified profile. */
  create: (
    resourceGroupName: string,
    profileName: string,
    securityPolicyName: string,
    securityPolicy: SecurityPolicy,
    options?: SecurityPoliciesCreateOptionalParams,
  ) => PollerLike<OperationState<SecurityPolicy>, SecurityPolicy>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    profileName: string,
    securityPolicyName: string,
    securityPolicy: SecurityPolicy,
    options?: SecurityPoliciesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SecurityPolicy>, SecurityPolicy>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    profileName: string,
    securityPolicyName: string,
    securityPolicy: SecurityPolicy,
    options?: SecurityPoliciesCreateOptionalParams,
  ) => Promise<SecurityPolicy>;
  /** Gets an existing security policy within a profile. */
  get: (
    resourceGroupName: string,
    profileName: string,
    securityPolicyName: string,
    options?: SecurityPoliciesGetOptionalParams,
  ) => Promise<SecurityPolicy>;
}

function _getSecurityPolicies(context: CdnManagementContext) {
  return {
    listByProfile: (
      resourceGroupName: string,
      profileName: string,
      options?: SecurityPoliciesListByProfileOptionalParams,
    ) => listByProfile(context, resourceGroupName, profileName, options),
    delete: (
      resourceGroupName: string,
      profileName: string,
      securityPolicyName: string,
      options?: SecurityPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, profileName, securityPolicyName, options),
    beginDelete: async (
      resourceGroupName: string,
      profileName: string,
      securityPolicyName: string,
      options?: SecurityPoliciesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, profileName, securityPolicyName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      profileName: string,
      securityPolicyName: string,
      options?: SecurityPoliciesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, profileName, securityPolicyName, options);
    },
    patch: (
      resourceGroupName: string,
      profileName: string,
      securityPolicyName: string,
      securityPolicyUpdateProperties: SecurityPolicyUpdateParameters,
      options?: SecurityPoliciesPatchOptionalParams,
    ) =>
      patch(
        context,
        resourceGroupName,
        profileName,
        securityPolicyName,
        securityPolicyUpdateProperties,
        options,
      ),
    beginPatch: async (
      resourceGroupName: string,
      profileName: string,
      securityPolicyName: string,
      securityPolicyUpdateProperties: SecurityPolicyUpdateParameters,
      options?: SecurityPoliciesPatchOptionalParams,
    ) => {
      const poller = patch(
        context,
        resourceGroupName,
        profileName,
        securityPolicyName,
        securityPolicyUpdateProperties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPatchAndWait: async (
      resourceGroupName: string,
      profileName: string,
      securityPolicyName: string,
      securityPolicyUpdateProperties: SecurityPolicyUpdateParameters,
      options?: SecurityPoliciesPatchOptionalParams,
    ) => {
      return await patch(
        context,
        resourceGroupName,
        profileName,
        securityPolicyName,
        securityPolicyUpdateProperties,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      profileName: string,
      securityPolicyName: string,
      securityPolicy: SecurityPolicy,
      options?: SecurityPoliciesCreateOptionalParams,
    ) =>
      create(context, resourceGroupName, profileName, securityPolicyName, securityPolicy, options),
    beginCreate: async (
      resourceGroupName: string,
      profileName: string,
      securityPolicyName: string,
      securityPolicy: SecurityPolicy,
      options?: SecurityPoliciesCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        profileName,
        securityPolicyName,
        securityPolicy,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      profileName: string,
      securityPolicyName: string,
      securityPolicy: SecurityPolicy,
      options?: SecurityPoliciesCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        profileName,
        securityPolicyName,
        securityPolicy,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      profileName: string,
      securityPolicyName: string,
      options?: SecurityPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, profileName, securityPolicyName, options),
  };
}

export function _getSecurityPoliciesOperations(
  context: CdnManagementContext,
): SecurityPoliciesOperations {
  return {
    ..._getSecurityPolicies(context),
  };
}
