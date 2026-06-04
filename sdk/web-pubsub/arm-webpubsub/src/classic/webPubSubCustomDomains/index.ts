// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebPubSubManagementContext } from "../../api/webPubSubManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/webPubSubCustomDomains/operations.js";
import type {
  WebPubSubCustomDomainsListOptionalParams,
  WebPubSubCustomDomainsDeleteOptionalParams,
  WebPubSubCustomDomainsCreateOrUpdateOptionalParams,
  WebPubSubCustomDomainsGetOptionalParams,
} from "../../api/webPubSubCustomDomains/options.js";
import type { CustomDomain } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WebPubSubCustomDomains operations. */
export interface WebPubSubCustomDomainsOperations {
  /** List all custom domains. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubCustomDomainsListOptionalParams,
  ) => PagedAsyncIterableIterator<CustomDomain>;
  /** Delete a custom domain. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    options?: WebPubSubCustomDomainsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    options?: WebPubSubCustomDomainsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    options?: WebPubSubCustomDomainsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a custom domain. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    parameters: CustomDomain,
    options?: WebPubSubCustomDomainsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CustomDomain>, CustomDomain>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    parameters: CustomDomain,
    options?: WebPubSubCustomDomainsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CustomDomain>, CustomDomain>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    parameters: CustomDomain,
    options?: WebPubSubCustomDomainsCreateOrUpdateOptionalParams,
  ) => Promise<CustomDomain>;
  /** Get a custom domain. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    options?: WebPubSubCustomDomainsGetOptionalParams,
  ) => Promise<CustomDomain>;
}

function _getWebPubSubCustomDomains(context: WebPubSubManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubCustomDomainsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      options?: WebPubSubCustomDomainsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, name, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      options?: WebPubSubCustomDomainsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, resourceName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      options?: WebPubSubCustomDomainsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, resourceName, name, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      parameters: CustomDomain,
      options?: WebPubSubCustomDomainsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, name, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      parameters: CustomDomain,
      options?: WebPubSubCustomDomainsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        name,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      parameters: CustomDomain,
      options?: WebPubSubCustomDomainsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        name,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      options?: WebPubSubCustomDomainsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, name, options),
  };
}

export function _getWebPubSubCustomDomainsOperations(
  context: WebPubSubManagementContext,
): WebPubSubCustomDomainsOperations {
  return {
    ..._getWebPubSubCustomDomains(context),
  };
}
