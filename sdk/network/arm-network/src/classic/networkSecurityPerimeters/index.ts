// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listBySubscription,
  list,
  $delete,
  patch,
  createOrUpdate,
  get,
} from "../../api/networkSecurityPerimeters/operations.js";
import type {
  NetworkSecurityPerimetersListBySubscriptionOptionalParams,
  NetworkSecurityPerimetersListOptionalParams,
  NetworkSecurityPerimetersDeleteOptionalParams,
  NetworkSecurityPerimetersPatchOptionalParams,
  NetworkSecurityPerimetersCreateOrUpdateOptionalParams,
  NetworkSecurityPerimetersGetOptionalParams,
} from "../../api/networkSecurityPerimeters/options.js";
import type {
  NetworkSecurityPerimeter,
  UpdateTagsRequest,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkSecurityPerimeters operations. */
export interface NetworkSecurityPerimetersOperations {
  /** List all network security perimeters in a subscription. */
  listBySubscription: (
    options?: NetworkSecurityPerimetersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityPerimeter>;
  /** List network security perimeters in a resource group. */
  list: (
    resourceGroupName: string,
    options?: NetworkSecurityPerimetersListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityPerimeter>;
  /** Deletes a network security perimeter. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    options?: NetworkSecurityPerimetersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    options?: NetworkSecurityPerimetersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    options?: NetworkSecurityPerimetersDeleteOptionalParams,
  ) => Promise<void>;
  /** Patch Tags for a Network Security Perimeter. */
  patch: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    parameters: UpdateTagsRequest,
    options?: NetworkSecurityPerimetersPatchOptionalParams,
  ) => Promise<NetworkSecurityPerimeter>;
  /** Creates or updates a Network Security Perimeter. */
  createOrUpdate: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    parameters: NetworkSecurityPerimeter,
    options?: NetworkSecurityPerimetersCreateOrUpdateOptionalParams,
  ) => Promise<NetworkSecurityPerimeter>;
  /** Gets the specified network security perimeter by the name. */
  get: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    options?: NetworkSecurityPerimetersGetOptionalParams,
  ) => Promise<NetworkSecurityPerimeter>;
}

function _getNetworkSecurityPerimeters(context: NetworkManagementContext) {
  return {
    listBySubscription: (options?: NetworkSecurityPerimetersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (resourceGroupName: string, options?: NetworkSecurityPerimetersListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      options?: NetworkSecurityPerimetersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkSecurityPerimeterName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      options?: NetworkSecurityPerimetersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, networkSecurityPerimeterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      options?: NetworkSecurityPerimetersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, networkSecurityPerimeterName, options);
    },
    patch: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      parameters: UpdateTagsRequest,
      options?: NetworkSecurityPerimetersPatchOptionalParams,
    ) => patch(context, resourceGroupName, networkSecurityPerimeterName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      parameters: NetworkSecurityPerimeter,
      options?: NetworkSecurityPerimetersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, networkSecurityPerimeterName, parameters, options),
    get: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      options?: NetworkSecurityPerimetersGetOptionalParams,
    ) => get(context, resourceGroupName, networkSecurityPerimeterName, options),
  };
}

export function _getNetworkSecurityPerimetersOperations(
  context: NetworkManagementContext,
): NetworkSecurityPerimetersOperations {
  return {
    ..._getNetworkSecurityPerimeters(context),
  };
}
