// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import {
  enableCustomHttps,
  disableCustomHttps,
  listByEndpoint,
  $delete,
  create,
  get,
} from "../../api/customDomains/operations.js";
import type {
  CustomDomainsEnableCustomHttpsOptionalParams,
  CustomDomainsDisableCustomHttpsOptionalParams,
  CustomDomainsListByEndpointOptionalParams,
  CustomDomainsDeleteOptionalParams,
  CustomDomainsCreateOptionalParams,
  CustomDomainsGetOptionalParams,
} from "../../api/customDomains/options.js";
import type { CustomDomain, CustomDomainParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CustomDomains operations. */
export interface CustomDomainsOperations {
  /** Enable https delivery of the custom domain. */
  enableCustomHttps: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    customDomainName: string,
    options?: CustomDomainsEnableCustomHttpsOptionalParams,
  ) => PollerLike<OperationState<CustomDomain>, CustomDomain>;
  /** @deprecated use enableCustomHttps instead */
  beginEnableCustomHttps: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    customDomainName: string,
    options?: CustomDomainsEnableCustomHttpsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CustomDomain>, CustomDomain>>;
  /** @deprecated use enableCustomHttps instead */
  beginEnableCustomHttpsAndWait: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    customDomainName: string,
    options?: CustomDomainsEnableCustomHttpsOptionalParams,
  ) => Promise<CustomDomain>;
  /** Disable https delivery of the custom domain. */
  disableCustomHttps: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    customDomainName: string,
    options?: CustomDomainsDisableCustomHttpsOptionalParams,
  ) => PollerLike<OperationState<CustomDomain>, CustomDomain>;
  /** @deprecated use disableCustomHttps instead */
  beginDisableCustomHttps: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    customDomainName: string,
    options?: CustomDomainsDisableCustomHttpsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CustomDomain>, CustomDomain>>;
  /** @deprecated use disableCustomHttps instead */
  beginDisableCustomHttpsAndWait: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    customDomainName: string,
    options?: CustomDomainsDisableCustomHttpsOptionalParams,
  ) => Promise<CustomDomain>;
  /** Lists all of the existing custom domains within an endpoint. */
  listByEndpoint: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    options?: CustomDomainsListByEndpointOptionalParams,
  ) => PagedAsyncIterableIterator<CustomDomain>;
  /** Deletes an existing custom domain within an endpoint. */
  delete: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    customDomainName: string,
    options?: CustomDomainsDeleteOptionalParams,
  ) => PollerLike<OperationState<CustomDomain>, CustomDomain>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    customDomainName: string,
    options?: CustomDomainsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CustomDomain>, CustomDomain>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    customDomainName: string,
    options?: CustomDomainsDeleteOptionalParams,
  ) => Promise<CustomDomain>;
  /** Creates a new custom domain within an endpoint. */
  create: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    customDomainName: string,
    customDomainProperties: CustomDomainParameters,
    options?: CustomDomainsCreateOptionalParams,
  ) => PollerLike<OperationState<CustomDomain>, CustomDomain>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    customDomainName: string,
    customDomainProperties: CustomDomainParameters,
    options?: CustomDomainsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CustomDomain>, CustomDomain>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    customDomainName: string,
    customDomainProperties: CustomDomainParameters,
    options?: CustomDomainsCreateOptionalParams,
  ) => Promise<CustomDomain>;
  /** Gets an existing custom domain within an endpoint. */
  get: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    customDomainName: string,
    options?: CustomDomainsGetOptionalParams,
  ) => Promise<CustomDomain>;
}

function _getCustomDomains(context: CdnManagementContext) {
  return {
    enableCustomHttps: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      customDomainName: string,
      options?: CustomDomainsEnableCustomHttpsOptionalParams,
    ) =>
      enableCustomHttps(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        customDomainName,
        options,
      ),
    beginEnableCustomHttps: async (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      customDomainName: string,
      options?: CustomDomainsEnableCustomHttpsOptionalParams,
    ) => {
      const poller = enableCustomHttps(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        customDomainName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginEnableCustomHttpsAndWait: async (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      customDomainName: string,
      options?: CustomDomainsEnableCustomHttpsOptionalParams,
    ) => {
      return await enableCustomHttps(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        customDomainName,
        options,
      );
    },
    disableCustomHttps: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      customDomainName: string,
      options?: CustomDomainsDisableCustomHttpsOptionalParams,
    ) =>
      disableCustomHttps(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        customDomainName,
        options,
      ),
    beginDisableCustomHttps: async (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      customDomainName: string,
      options?: CustomDomainsDisableCustomHttpsOptionalParams,
    ) => {
      const poller = disableCustomHttps(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        customDomainName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDisableCustomHttpsAndWait: async (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      customDomainName: string,
      options?: CustomDomainsDisableCustomHttpsOptionalParams,
    ) => {
      return await disableCustomHttps(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        customDomainName,
        options,
      );
    },
    listByEndpoint: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      options?: CustomDomainsListByEndpointOptionalParams,
    ) => listByEndpoint(context, resourceGroupName, profileName, endpointName, options),
    delete: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      customDomainName: string,
      options?: CustomDomainsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, profileName, endpointName, customDomainName, options),
    beginDelete: async (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      customDomainName: string,
      options?: CustomDomainsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        customDomainName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      customDomainName: string,
      options?: CustomDomainsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        customDomainName,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      customDomainName: string,
      customDomainProperties: CustomDomainParameters,
      options?: CustomDomainsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        customDomainName,
        customDomainProperties,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      customDomainName: string,
      customDomainProperties: CustomDomainParameters,
      options?: CustomDomainsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        customDomainName,
        customDomainProperties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      customDomainName: string,
      customDomainProperties: CustomDomainParameters,
      options?: CustomDomainsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        customDomainName,
        customDomainProperties,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      customDomainName: string,
      options?: CustomDomainsGetOptionalParams,
    ) => get(context, resourceGroupName, profileName, endpointName, customDomainName, options),
  };
}

export function _getCustomDomainsOperations(
  context: CdnManagementContext,
): CustomDomainsOperations {
  return {
    ..._getCustomDomains(context),
  };
}
