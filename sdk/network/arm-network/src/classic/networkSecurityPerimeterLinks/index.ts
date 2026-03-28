// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/networkSecurityPerimeterLinks/operations.js";
import type {
  NetworkSecurityPerimeterLinksListOptionalParams,
  NetworkSecurityPerimeterLinksDeleteOptionalParams,
  NetworkSecurityPerimeterLinksCreateOrUpdateOptionalParams,
  NetworkSecurityPerimeterLinksGetOptionalParams,
} from "../../api/networkSecurityPerimeterLinks/options.js";
import type { NspLink } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkSecurityPerimeterLinks operations. */
export interface NetworkSecurityPerimeterLinksOperations {
  /** Lists the NSP Link resources in the specified network security perimeter. */
  list: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    options?: NetworkSecurityPerimeterLinksListOptionalParams,
  ) => PagedAsyncIterableIterator<NspLink>;
  /** Deletes an NSP Link resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    linkName: string,
    options?: NetworkSecurityPerimeterLinksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    linkName: string,
    options?: NetworkSecurityPerimeterLinksDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    linkName: string,
    options?: NetworkSecurityPerimeterLinksDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates NSP link resource. */
  createOrUpdate: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    linkName: string,
    parameters: NspLink,
    options?: NetworkSecurityPerimeterLinksCreateOrUpdateOptionalParams,
  ) => Promise<NspLink>;
  /** Gets the specified NSP link resource. */
  get: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    linkName: string,
    options?: NetworkSecurityPerimeterLinksGetOptionalParams,
  ) => Promise<NspLink>;
}

function _getNetworkSecurityPerimeterLinks(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      options?: NetworkSecurityPerimeterLinksListOptionalParams,
    ) => list(context, resourceGroupName, networkSecurityPerimeterName, options),
    delete: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      linkName: string,
      options?: NetworkSecurityPerimeterLinksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkSecurityPerimeterName, linkName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      linkName: string,
      options?: NetworkSecurityPerimeterLinksDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        networkSecurityPerimeterName,
        linkName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      linkName: string,
      options?: NetworkSecurityPerimeterLinksDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        networkSecurityPerimeterName,
        linkName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      linkName: string,
      parameters: NspLink,
      options?: NetworkSecurityPerimeterLinksCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkSecurityPerimeterName,
        linkName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      linkName: string,
      options?: NetworkSecurityPerimeterLinksGetOptionalParams,
    ) => get(context, resourceGroupName, networkSecurityPerimeterName, linkName, options),
  };
}

export function _getNetworkSecurityPerimeterLinksOperations(
  context: NetworkManagementContext,
): NetworkSecurityPerimeterLinksOperations {
  return {
    ..._getNetworkSecurityPerimeterLinks(context),
  };
}
