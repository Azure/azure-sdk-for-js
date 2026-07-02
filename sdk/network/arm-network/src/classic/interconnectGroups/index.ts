// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  getNodeAvailability,
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/interconnectGroups/operations.js";
import type {
  InterconnectGroupsGetNodeAvailabilityOptionalParams,
  InterconnectGroupsListAllOptionalParams,
  InterconnectGroupsListOptionalParams,
  InterconnectGroupsDeleteOptionalParams,
  InterconnectGroupsUpdateTagsOptionalParams,
  InterconnectGroupsCreateOrUpdateOptionalParams,
  InterconnectGroupsGetOptionalParams,
} from "../../api/interconnectGroups/options.js";
import type {
  TagsObject,
  InterconnectGroup,
  InterconnectGroupNodeAvailability,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a InterconnectGroups operations. */
export interface InterconnectGroupsOperations {
  /** Gets node availability for all subgroups in the specified interconnect group. */
  getNodeAvailability: (
    resourceGroupName: string,
    interconnectGroupName: string,
    options?: InterconnectGroupsGetNodeAvailabilityOptionalParams,
  ) => PollerLike<
    OperationState<InterconnectGroupNodeAvailability>,
    InterconnectGroupNodeAvailability
  >;
  /** @deprecated use getNodeAvailability instead */
  beginGetNodeAvailability: (
    resourceGroupName: string,
    interconnectGroupName: string,
    options?: InterconnectGroupsGetNodeAvailabilityOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<InterconnectGroupNodeAvailability>,
      InterconnectGroupNodeAvailability
    >
  >;
  /** @deprecated use getNodeAvailability instead */
  beginGetNodeAvailabilityAndWait: (
    resourceGroupName: string,
    interconnectGroupName: string,
    options?: InterconnectGroupsGetNodeAvailabilityOptionalParams,
  ) => Promise<InterconnectGroupNodeAvailability>;
  /** Gets all interconnect groups in a subscription. */
  listAll: (
    options?: InterconnectGroupsListAllOptionalParams,
  ) => PagedAsyncIterableIterator<InterconnectGroup>;
  /** Gets all interconnect groups in a resource group. */
  list: (
    resourceGroupName: string,
    options?: InterconnectGroupsListOptionalParams,
  ) => PagedAsyncIterableIterator<InterconnectGroup>;
  /** Deletes the specified interconnect group. */
  delete: (
    resourceGroupName: string,
    interconnectGroupName: string,
    options?: InterconnectGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates interconnect group tags. */
  updateTags: (
    resourceGroupName: string,
    interconnectGroupName: string,
    parameters: TagsObject,
    options?: InterconnectGroupsUpdateTagsOptionalParams,
  ) => Promise<InterconnectGroup>;
  /** Creates or updates an interconnect group. */
  createOrUpdate: (
    resourceGroupName: string,
    interconnectGroupName: string,
    parameters: InterconnectGroup,
    options?: InterconnectGroupsCreateOrUpdateOptionalParams,
  ) => Promise<InterconnectGroup>;
  /** Gets information about the specified interconnect group. */
  get: (
    resourceGroupName: string,
    interconnectGroupName: string,
    options?: InterconnectGroupsGetOptionalParams,
  ) => Promise<InterconnectGroup>;
}

function _getInterconnectGroups(context: NetworkManagementContext) {
  return {
    getNodeAvailability: (
      resourceGroupName: string,
      interconnectGroupName: string,
      options?: InterconnectGroupsGetNodeAvailabilityOptionalParams,
    ) => getNodeAvailability(context, resourceGroupName, interconnectGroupName, options),
    beginGetNodeAvailability: async (
      resourceGroupName: string,
      interconnectGroupName: string,
      options?: InterconnectGroupsGetNodeAvailabilityOptionalParams,
    ) => {
      const poller = getNodeAvailability(
        context,
        resourceGroupName,
        interconnectGroupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetNodeAvailabilityAndWait: async (
      resourceGroupName: string,
      interconnectGroupName: string,
      options?: InterconnectGroupsGetNodeAvailabilityOptionalParams,
    ) => {
      return await getNodeAvailability(context, resourceGroupName, interconnectGroupName, options);
    },
    listAll: (options?: InterconnectGroupsListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: InterconnectGroupsListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      interconnectGroupName: string,
      options?: InterconnectGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, interconnectGroupName, options),
    updateTags: (
      resourceGroupName: string,
      interconnectGroupName: string,
      parameters: TagsObject,
      options?: InterconnectGroupsUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, interconnectGroupName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      interconnectGroupName: string,
      parameters: InterconnectGroup,
      options?: InterconnectGroupsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, interconnectGroupName, parameters, options),
    get: (
      resourceGroupName: string,
      interconnectGroupName: string,
      options?: InterconnectGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, interconnectGroupName, options),
  };
}

export function _getInterconnectGroupsOperations(
  context: NetworkManagementContext,
): InterconnectGroupsOperations {
  return {
    ..._getInterconnectGroups(context),
  };
}
