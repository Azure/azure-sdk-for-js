// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, createOrUpdate, get, $delete } from "../../api/privateDnsZoneGroups/operations.js";
import type {
  PrivateDnsZoneGroupsListOptionalParams,
  PrivateDnsZoneGroupsCreateOrUpdateOptionalParams,
  PrivateDnsZoneGroupsGetOptionalParams,
  PrivateDnsZoneGroupsDeleteOptionalParams,
} from "../../api/privateDnsZoneGroups/options.js";
import type { PrivateDnsZoneGroup } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateDnsZoneGroups operations. */
export interface PrivateDnsZoneGroupsOperations {
  /** Gets all private dns zone groups in a private endpoint. */
  list: (
    resourceGroupName: string,
    privateEndpointName: string,
    options?: PrivateDnsZoneGroupsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateDnsZoneGroup>;
  /** Creates or updates a private dns zone group in the specified private endpoint. */
  createOrUpdate: (
    resourceGroupName: string,
    privateEndpointName: string,
    privateDnsZoneGroupName: string,
    parameters: PrivateDnsZoneGroup,
    options?: PrivateDnsZoneGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateDnsZoneGroup>, PrivateDnsZoneGroup>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    privateEndpointName: string,
    privateDnsZoneGroupName: string,
    parameters: PrivateDnsZoneGroup,
    options?: PrivateDnsZoneGroupsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PrivateDnsZoneGroup>, PrivateDnsZoneGroup>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    privateEndpointName: string,
    privateDnsZoneGroupName: string,
    parameters: PrivateDnsZoneGroup,
    options?: PrivateDnsZoneGroupsCreateOrUpdateOptionalParams,
  ) => Promise<PrivateDnsZoneGroup>;
  /** Gets the private dns zone group resource by specified private dns zone group name. */
  get: (
    resourceGroupName: string,
    privateEndpointName: string,
    privateDnsZoneGroupName: string,
    options?: PrivateDnsZoneGroupsGetOptionalParams,
  ) => Promise<PrivateDnsZoneGroup>;
  /** Deletes the specified private dns zone group. */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    privateEndpointName: string,
    privateDnsZoneGroupName: string,
    options?: PrivateDnsZoneGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    privateEndpointName: string,
    privateDnsZoneGroupName: string,
    options?: PrivateDnsZoneGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    privateEndpointName: string,
    privateDnsZoneGroupName: string,
    options?: PrivateDnsZoneGroupsDeleteOptionalParams,
  ) => Promise<void>;
}

function _getPrivateDnsZoneGroups(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      privateEndpointName: string,
      options?: PrivateDnsZoneGroupsListOptionalParams,
    ) => list(context, resourceGroupName, privateEndpointName, options),
    createOrUpdate: (
      resourceGroupName: string,
      privateEndpointName: string,
      privateDnsZoneGroupName: string,
      parameters: PrivateDnsZoneGroup,
      options?: PrivateDnsZoneGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        privateEndpointName,
        privateDnsZoneGroupName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      privateEndpointName: string,
      privateDnsZoneGroupName: string,
      parameters: PrivateDnsZoneGroup,
      options?: PrivateDnsZoneGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        privateEndpointName,
        privateDnsZoneGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      privateEndpointName: string,
      privateDnsZoneGroupName: string,
      parameters: PrivateDnsZoneGroup,
      options?: PrivateDnsZoneGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        privateEndpointName,
        privateDnsZoneGroupName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      privateEndpointName: string,
      privateDnsZoneGroupName: string,
      options?: PrivateDnsZoneGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, privateEndpointName, privateDnsZoneGroupName, options),
    delete: (
      resourceGroupName: string,
      privateEndpointName: string,
      privateDnsZoneGroupName: string,
      options?: PrivateDnsZoneGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, privateEndpointName, privateDnsZoneGroupName, options),
    beginDelete: async (
      resourceGroupName: string,
      privateEndpointName: string,
      privateDnsZoneGroupName: string,
      options?: PrivateDnsZoneGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        privateEndpointName,
        privateDnsZoneGroupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      privateEndpointName: string,
      privateDnsZoneGroupName: string,
      options?: PrivateDnsZoneGroupsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        privateEndpointName,
        privateDnsZoneGroupName,
        options,
      );
    },
  };
}

export function _getPrivateDnsZoneGroupsOperations(
  context: NetworkManagementContext,
): PrivateDnsZoneGroupsOperations {
  return {
    ..._getPrivateDnsZoneGroups(context),
  };
}
