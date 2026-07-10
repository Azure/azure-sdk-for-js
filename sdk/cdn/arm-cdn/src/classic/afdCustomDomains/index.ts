// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import {
  refreshValidationToken,
  listByProfile,
  $delete,
  update,
  create,
  get,
} from "../../api/afdCustomDomains/operations.js";
import type {
  AFDCustomDomainsRefreshValidationTokenOptionalParams,
  AFDCustomDomainsListByProfileOptionalParams,
  AFDCustomDomainsDeleteOptionalParams,
  AFDCustomDomainsUpdateOptionalParams,
  AFDCustomDomainsCreateOptionalParams,
  AFDCustomDomainsGetOptionalParams,
} from "../../api/afdCustomDomains/options.js";
import type { AFDDomain, AFDDomainUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AFDCustomDomains operations. */
export interface AFDCustomDomainsOperations {
  /** Updates the domain validation token. */
  refreshValidationToken: (
    resourceGroupName: string,
    profileName: string,
    customDomainName: string,
    options?: AFDCustomDomainsRefreshValidationTokenOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use refreshValidationToken instead */
  beginRefreshValidationToken: (
    resourceGroupName: string,
    profileName: string,
    customDomainName: string,
    options?: AFDCustomDomainsRefreshValidationTokenOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use refreshValidationToken instead */
  beginRefreshValidationTokenAndWait: (
    resourceGroupName: string,
    profileName: string,
    customDomainName: string,
    options?: AFDCustomDomainsRefreshValidationTokenOptionalParams,
  ) => Promise<void>;
  /** Lists existing AzureFrontDoor domains. */
  listByProfile: (
    resourceGroupName: string,
    profileName: string,
    options?: AFDCustomDomainsListByProfileOptionalParams,
  ) => PagedAsyncIterableIterator<AFDDomain>;
  /** Deletes an existing AzureFrontDoor domain with the specified domain name under the specified subscription, resource group and profile. */
  delete: (
    resourceGroupName: string,
    profileName: string,
    customDomainName: string,
    options?: AFDCustomDomainsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    profileName: string,
    customDomainName: string,
    options?: AFDCustomDomainsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    profileName: string,
    customDomainName: string,
    options?: AFDCustomDomainsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing domain within a profile. */
  update: (
    resourceGroupName: string,
    profileName: string,
    customDomainName: string,
    customDomainUpdateProperties: AFDDomainUpdateParameters,
    options?: AFDCustomDomainsUpdateOptionalParams,
  ) => PollerLike<OperationState<AFDDomain>, AFDDomain>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    profileName: string,
    customDomainName: string,
    customDomainUpdateProperties: AFDDomainUpdateParameters,
    options?: AFDCustomDomainsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AFDDomain>, AFDDomain>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    profileName: string,
    customDomainName: string,
    customDomainUpdateProperties: AFDDomainUpdateParameters,
    options?: AFDCustomDomainsUpdateOptionalParams,
  ) => Promise<AFDDomain>;
  /** Creates a new domain within the specified profile. */
  create: (
    resourceGroupName: string,
    profileName: string,
    customDomainName: string,
    customDomain: AFDDomain,
    options?: AFDCustomDomainsCreateOptionalParams,
  ) => PollerLike<OperationState<AFDDomain>, AFDDomain>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    profileName: string,
    customDomainName: string,
    customDomain: AFDDomain,
    options?: AFDCustomDomainsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AFDDomain>, AFDDomain>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    profileName: string,
    customDomainName: string,
    customDomain: AFDDomain,
    options?: AFDCustomDomainsCreateOptionalParams,
  ) => Promise<AFDDomain>;
  /** Gets an existing AzureFrontDoor domain with the specified domain name under the specified subscription, resource group and profile. */
  get: (
    resourceGroupName: string,
    profileName: string,
    customDomainName: string,
    options?: AFDCustomDomainsGetOptionalParams,
  ) => Promise<AFDDomain>;
}

function _getAFDCustomDomains(context: CdnManagementContext) {
  return {
    refreshValidationToken: (
      resourceGroupName: string,
      profileName: string,
      customDomainName: string,
      options?: AFDCustomDomainsRefreshValidationTokenOptionalParams,
    ) => refreshValidationToken(context, resourceGroupName, profileName, customDomainName, options),
    beginRefreshValidationToken: async (
      resourceGroupName: string,
      profileName: string,
      customDomainName: string,
      options?: AFDCustomDomainsRefreshValidationTokenOptionalParams,
    ) => {
      const poller = refreshValidationToken(
        context,
        resourceGroupName,
        profileName,
        customDomainName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRefreshValidationTokenAndWait: async (
      resourceGroupName: string,
      profileName: string,
      customDomainName: string,
      options?: AFDCustomDomainsRefreshValidationTokenOptionalParams,
    ) => {
      return await refreshValidationToken(
        context,
        resourceGroupName,
        profileName,
        customDomainName,
        options,
      );
    },
    listByProfile: (
      resourceGroupName: string,
      profileName: string,
      options?: AFDCustomDomainsListByProfileOptionalParams,
    ) => listByProfile(context, resourceGroupName, profileName, options),
    delete: (
      resourceGroupName: string,
      profileName: string,
      customDomainName: string,
      options?: AFDCustomDomainsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, profileName, customDomainName, options),
    beginDelete: async (
      resourceGroupName: string,
      profileName: string,
      customDomainName: string,
      options?: AFDCustomDomainsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, profileName, customDomainName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      profileName: string,
      customDomainName: string,
      options?: AFDCustomDomainsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, profileName, customDomainName, options);
    },
    update: (
      resourceGroupName: string,
      profileName: string,
      customDomainName: string,
      customDomainUpdateProperties: AFDDomainUpdateParameters,
      options?: AFDCustomDomainsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        profileName,
        customDomainName,
        customDomainUpdateProperties,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      profileName: string,
      customDomainName: string,
      customDomainUpdateProperties: AFDDomainUpdateParameters,
      options?: AFDCustomDomainsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        profileName,
        customDomainName,
        customDomainUpdateProperties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      profileName: string,
      customDomainName: string,
      customDomainUpdateProperties: AFDDomainUpdateParameters,
      options?: AFDCustomDomainsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        profileName,
        customDomainName,
        customDomainUpdateProperties,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      profileName: string,
      customDomainName: string,
      customDomain: AFDDomain,
      options?: AFDCustomDomainsCreateOptionalParams,
    ) => create(context, resourceGroupName, profileName, customDomainName, customDomain, options),
    beginCreate: async (
      resourceGroupName: string,
      profileName: string,
      customDomainName: string,
      customDomain: AFDDomain,
      options?: AFDCustomDomainsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        profileName,
        customDomainName,
        customDomain,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      profileName: string,
      customDomainName: string,
      customDomain: AFDDomain,
      options?: AFDCustomDomainsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        profileName,
        customDomainName,
        customDomain,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      profileName: string,
      customDomainName: string,
      options?: AFDCustomDomainsGetOptionalParams,
    ) => get(context, resourceGroupName, profileName, customDomainName, options),
  };
}

export function _getAFDCustomDomainsOperations(
  context: CdnManagementContext,
): AFDCustomDomainsOperations {
  return {
    ..._getAFDCustomDomains(context),
  };
}
