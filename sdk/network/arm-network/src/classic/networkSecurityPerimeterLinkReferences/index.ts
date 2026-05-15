// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, get } from "../../api/networkSecurityPerimeterLinkReferences/operations.js";
import {
  NetworkSecurityPerimeterLinkReferencesListOptionalParams,
  NetworkSecurityPerimeterLinkReferencesDeleteOptionalParams,
  NetworkSecurityPerimeterLinkReferencesGetOptionalParams,
} from "../../api/networkSecurityPerimeterLinkReferences/options.js";
import { NspLinkReference } from "../../models/microsoft/network/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkSecurityPerimeterLinkReferences operations. */
export interface NetworkSecurityPerimeterLinkReferencesOperations {
  /** Lists the NSP LinkReference resources in the specified network security perimeter. */
  list: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    options?: NetworkSecurityPerimeterLinkReferencesListOptionalParams,
  ) => PagedAsyncIterableIterator<NspLinkReference>;
  /** Deletes an NSP LinkReference resource. */
  delete: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    linkReferenceName: string,
    options?: NetworkSecurityPerimeterLinkReferencesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    linkReferenceName: string,
    options?: NetworkSecurityPerimeterLinkReferencesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    linkReferenceName: string,
    options?: NetworkSecurityPerimeterLinkReferencesDeleteOptionalParams,
  ) => Promise<void>;
  /** Gets the specified NSP linkReference resource. */
  get: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    linkReferenceName: string,
    options?: NetworkSecurityPerimeterLinkReferencesGetOptionalParams,
  ) => Promise<NspLinkReference>;
}

function _getNetworkSecurityPerimeterLinkReferences(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      options?: NetworkSecurityPerimeterLinkReferencesListOptionalParams,
    ) => list(context, resourceGroupName, networkSecurityPerimeterName, options),
    delete: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      linkReferenceName: string,
      options?: NetworkSecurityPerimeterLinkReferencesDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, networkSecurityPerimeterName, linkReferenceName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      linkReferenceName: string,
      options?: NetworkSecurityPerimeterLinkReferencesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        networkSecurityPerimeterName,
        linkReferenceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      linkReferenceName: string,
      options?: NetworkSecurityPerimeterLinkReferencesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        networkSecurityPerimeterName,
        linkReferenceName,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      linkReferenceName: string,
      options?: NetworkSecurityPerimeterLinkReferencesGetOptionalParams,
    ) => get(context, resourceGroupName, networkSecurityPerimeterName, linkReferenceName, options),
  };
}

export function _getNetworkSecurityPerimeterLinkReferencesOperations(
  context: NetworkManagementContext,
): NetworkSecurityPerimeterLinkReferencesOperations {
  return {
    ..._getNetworkSecurityPerimeterLinkReferences(context),
  };
}
