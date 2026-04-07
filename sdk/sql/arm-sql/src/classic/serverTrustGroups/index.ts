// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  listByInstance,
  listByLocation,
  $delete,
  createOrUpdate,
  get,
} from "../../api/serverTrustGroups/operations.js";
import type {
  ServerTrustGroupsListByInstanceOptionalParams,
  ServerTrustGroupsListByLocationOptionalParams,
  ServerTrustGroupsDeleteOptionalParams,
  ServerTrustGroupsCreateOrUpdateOptionalParams,
  ServerTrustGroupsGetOptionalParams,
} from "../../api/serverTrustGroups/options.js";
import type { ServerTrustGroup } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServerTrustGroups operations. */
export interface ServerTrustGroupsOperations {
  /** Gets a server trust groups by instance name. */
  listByInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ServerTrustGroupsListByInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<ServerTrustGroup>;
  /** Lists a server trust group. */
  listByLocation: (
    resourceGroupName: string,
    locationName: string,
    options?: ServerTrustGroupsListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<ServerTrustGroup>;
  /** Deletes a server trust group. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    locationName: string,
    serverTrustGroupName: string,
    options?: ServerTrustGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    locationName: string,
    serverTrustGroupName: string,
    options?: ServerTrustGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    locationName: string,
    serverTrustGroupName: string,
    options?: ServerTrustGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a server trust group. */
  createOrUpdate: (
    resourceGroupName: string,
    locationName: string,
    serverTrustGroupName: string,
    parameters: ServerTrustGroup,
    options?: ServerTrustGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ServerTrustGroup>, ServerTrustGroup>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    locationName: string,
    serverTrustGroupName: string,
    parameters: ServerTrustGroup,
    options?: ServerTrustGroupsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ServerTrustGroup>, ServerTrustGroup>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    locationName: string,
    serverTrustGroupName: string,
    parameters: ServerTrustGroup,
    options?: ServerTrustGroupsCreateOrUpdateOptionalParams,
  ) => Promise<ServerTrustGroup>;
  /** Gets a server trust group. */
  get: (
    resourceGroupName: string,
    locationName: string,
    serverTrustGroupName: string,
    options?: ServerTrustGroupsGetOptionalParams,
  ) => Promise<ServerTrustGroup>;
}

function _getServerTrustGroups(context: SqlContext) {
  return {
    listByInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ServerTrustGroupsListByInstanceOptionalParams,
    ) => listByInstance(context, resourceGroupName, managedInstanceName, options),
    listByLocation: (
      resourceGroupName: string,
      locationName: string,
      options?: ServerTrustGroupsListByLocationOptionalParams,
    ) => listByLocation(context, resourceGroupName, locationName, options),
    delete: (
      resourceGroupName: string,
      locationName: string,
      serverTrustGroupName: string,
      options?: ServerTrustGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, locationName, serverTrustGroupName, options),
    beginDelete: async (
      resourceGroupName: string,
      locationName: string,
      serverTrustGroupName: string,
      options?: ServerTrustGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        locationName,
        serverTrustGroupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      locationName: string,
      serverTrustGroupName: string,
      options?: ServerTrustGroupsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, locationName, serverTrustGroupName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      locationName: string,
      serverTrustGroupName: string,
      parameters: ServerTrustGroup,
      options?: ServerTrustGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        locationName,
        serverTrustGroupName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      locationName: string,
      serverTrustGroupName: string,
      parameters: ServerTrustGroup,
      options?: ServerTrustGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        locationName,
        serverTrustGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      locationName: string,
      serverTrustGroupName: string,
      parameters: ServerTrustGroup,
      options?: ServerTrustGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        locationName,
        serverTrustGroupName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      locationName: string,
      serverTrustGroupName: string,
      options?: ServerTrustGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, locationName, serverTrustGroupName, options),
  };
}

export function _getServerTrustGroupsOperations(context: SqlContext): ServerTrustGroupsOperations {
  return {
    ..._getServerTrustGroups(context),
  };
}
