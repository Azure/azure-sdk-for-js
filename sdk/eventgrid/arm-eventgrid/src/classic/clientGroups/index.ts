// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import {
  listByNamespace,
  $delete,
  createOrUpdate,
  get,
} from "../../api/clientGroups/operations.js";
import type {
  ClientGroupsListByNamespaceOptionalParams,
  ClientGroupsDeleteOptionalParams,
  ClientGroupsCreateOrUpdateOptionalParams,
  ClientGroupsGetOptionalParams,
} from "../../api/clientGroups/options.js";
import type { ClientGroup } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ClientGroups operations. */
export interface ClientGroupsOperations {
  /** Get all the client groups under a namespace. */
  listByNamespace: (
    resourceGroupName: string,
    namespaceName: string,
    options?: ClientGroupsListByNamespaceOptionalParams,
  ) => PagedAsyncIterableIterator<ClientGroup>;
  /** Delete an existing client group. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    clientGroupName: string,
    options?: ClientGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    namespaceName: string,
    clientGroupName: string,
    options?: ClientGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    clientGroupName: string,
    options?: ClientGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a client group with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    clientGroupName: string,
    clientGroupInfo: ClientGroup,
    options?: ClientGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ClientGroup>, ClientGroup>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    clientGroupName: string,
    clientGroupInfo: ClientGroup,
    options?: ClientGroupsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ClientGroup>, ClientGroup>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    clientGroupName: string,
    clientGroupInfo: ClientGroup,
    options?: ClientGroupsCreateOrUpdateOptionalParams,
  ) => Promise<ClientGroup>;
  /** Get properties of a client group. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    clientGroupName: string,
    options?: ClientGroupsGetOptionalParams,
  ) => Promise<ClientGroup>;
}

function _getClientGroups(context: EventGridManagementContext) {
  return {
    listByNamespace: (
      resourceGroupName: string,
      namespaceName: string,
      options?: ClientGroupsListByNamespaceOptionalParams,
    ) => listByNamespace(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      clientGroupName: string,
      options?: ClientGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, clientGroupName, options),
    beginDelete: async (
      resourceGroupName: string,
      namespaceName: string,
      clientGroupName: string,
      options?: ClientGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, namespaceName, clientGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      clientGroupName: string,
      options?: ClientGroupsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, namespaceName, clientGroupName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      clientGroupName: string,
      clientGroupInfo: ClientGroup,
      options?: ClientGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        clientGroupName,
        clientGroupInfo,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      namespaceName: string,
      clientGroupName: string,
      clientGroupInfo: ClientGroup,
      options?: ClientGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        clientGroupName,
        clientGroupInfo,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      clientGroupName: string,
      clientGroupInfo: ClientGroup,
      options?: ClientGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        clientGroupName,
        clientGroupInfo,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      namespaceName: string,
      clientGroupName: string,
      options?: ClientGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, clientGroupName, options),
  };
}

export function _getClientGroupsOperations(
  context: EventGridManagementContext,
): ClientGroupsOperations {
  return {
    ..._getClientGroups(context),
  };
}
