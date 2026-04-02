// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/accountCapabilityHosts/operations.js";
import type {
  AccountCapabilityHostsListOptionalParams,
  AccountCapabilityHostsDeleteOptionalParams,
  AccountCapabilityHostsCreateOrUpdateOptionalParams,
  AccountCapabilityHostsGetOptionalParams,
} from "../../api/accountCapabilityHosts/options.js";
import type { CapabilityHost } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AccountCapabilityHosts operations. */
export interface AccountCapabilityHostsOperations {
  /** List capabilityHost. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountCapabilityHostsListOptionalParams,
  ) => PagedAsyncIterableIterator<CapabilityHost>;
  /** Delete account capabilityHost. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    capabilityHostName: string,
    options?: AccountCapabilityHostsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    capabilityHostName: string,
    options?: AccountCapabilityHostsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    capabilityHostName: string,
    options?: AccountCapabilityHostsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update account capabilityHost. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    capabilityHostName: string,
    capabilityHost: CapabilityHost,
    options?: AccountCapabilityHostsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CapabilityHost>, CapabilityHost>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    capabilityHostName: string,
    capabilityHost: CapabilityHost,
    options?: AccountCapabilityHostsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CapabilityHost>, CapabilityHost>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    capabilityHostName: string,
    capabilityHost: CapabilityHost,
    options?: AccountCapabilityHostsCreateOrUpdateOptionalParams,
  ) => Promise<CapabilityHost>;
  /** Get account capabilityHost. */
  get: (
    resourceGroupName: string,
    accountName: string,
    capabilityHostName: string,
    options?: AccountCapabilityHostsGetOptionalParams,
  ) => Promise<CapabilityHost>;
}

function _getAccountCapabilityHosts(context: CognitiveServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: AccountCapabilityHostsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      capabilityHostName: string,
      options?: AccountCapabilityHostsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, capabilityHostName, options),
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      capabilityHostName: string,
      options?: AccountCapabilityHostsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, accountName, capabilityHostName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      capabilityHostName: string,
      options?: AccountCapabilityHostsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, accountName, capabilityHostName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      capabilityHostName: string,
      capabilityHost: CapabilityHost,
      options?: AccountCapabilityHostsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        capabilityHostName,
        capabilityHost,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      accountName: string,
      capabilityHostName: string,
      capabilityHost: CapabilityHost,
      options?: AccountCapabilityHostsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        capabilityHostName,
        capabilityHost,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      capabilityHostName: string,
      capabilityHost: CapabilityHost,
      options?: AccountCapabilityHostsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        capabilityHostName,
        capabilityHost,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      accountName: string,
      capabilityHostName: string,
      options?: AccountCapabilityHostsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, capabilityHostName, options),
  };
}

export function _getAccountCapabilityHostsOperations(
  context: CognitiveServicesManagementContext,
): AccountCapabilityHostsOperations {
  return {
    ..._getAccountCapabilityHosts(context),
  };
}
