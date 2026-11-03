// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SignalRManagementContext } from "../../api/signalRManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/signalRCustomDomains/operations.js";
import type {
  SignalRCustomDomainsListOptionalParams,
  SignalRCustomDomainsDeleteOptionalParams,
  SignalRCustomDomainsCreateOrUpdateOptionalParams,
  SignalRCustomDomainsGetOptionalParams,
} from "../../api/signalRCustomDomains/options.js";
import type { CustomDomain } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SignalRCustomDomains operations. */
export interface SignalRCustomDomainsOperations {
  /** List all custom domains. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: SignalRCustomDomainsListOptionalParams,
  ) => PagedAsyncIterableIterator<CustomDomain>;
  /** Delete a custom domain. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    options?: SignalRCustomDomainsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    options?: SignalRCustomDomainsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    options?: SignalRCustomDomainsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a custom domain. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    parameters: CustomDomain,
    options?: SignalRCustomDomainsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CustomDomain>, CustomDomain>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    parameters: CustomDomain,
    options?: SignalRCustomDomainsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CustomDomain>, CustomDomain>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    parameters: CustomDomain,
    options?: SignalRCustomDomainsCreateOrUpdateOptionalParams,
  ) => Promise<CustomDomain>;
  /** Get a custom domain. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    options?: SignalRCustomDomainsGetOptionalParams,
  ) => Promise<CustomDomain>;
}

function _getSignalRCustomDomains(context: SignalRManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: SignalRCustomDomainsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      options?: SignalRCustomDomainsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, name, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      options?: SignalRCustomDomainsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, resourceName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      options?: SignalRCustomDomainsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, resourceName, name, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      parameters: CustomDomain,
      options?: SignalRCustomDomainsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, name, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      parameters: CustomDomain,
      options?: SignalRCustomDomainsCreateOrUpdateOptionalParams,
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
      options?: SignalRCustomDomainsCreateOrUpdateOptionalParams,
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
      options?: SignalRCustomDomainsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, name, options),
  };
}

export function _getSignalRCustomDomainsOperations(
  context: SignalRManagementContext,
): SignalRCustomDomainsOperations {
  return {
    ..._getSignalRCustomDomains(context),
  };
}
