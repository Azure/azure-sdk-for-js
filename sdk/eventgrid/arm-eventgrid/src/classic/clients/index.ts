// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import { listByNamespace, $delete, createOrUpdate, get } from "../../api/clients/operations.js";
import type {
  ClientsListByNamespaceOptionalParams,
  ClientsDeleteOptionalParams,
  ClientsCreateOrUpdateOptionalParams,
  ClientsGetOptionalParams,
} from "../../api/clients/options.js";
import type { Client } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Clients operations. */
export interface ClientsOperations {
  /** Get all the permission bindings under a namespace. */
  listByNamespace: (
    resourceGroupName: string,
    namespaceName: string,
    options?: ClientsListByNamespaceOptionalParams,
  ) => PagedAsyncIterableIterator<Client>;
  /** Delete an existing client. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    clientName: string,
    options?: ClientsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    namespaceName: string,
    clientName: string,
    options?: ClientsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    clientName: string,
    options?: ClientsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a client with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    clientName: string,
    clientInfo: Client,
    options?: ClientsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Client>, Client>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    clientName: string,
    clientInfo: Client,
    options?: ClientsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Client>, Client>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    clientName: string,
    clientInfo: Client,
    options?: ClientsCreateOrUpdateOptionalParams,
  ) => Promise<Client>;
  /** Get properties of a client. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    clientName: string,
    options?: ClientsGetOptionalParams,
  ) => Promise<Client>;
}

function _getClients(context: EventGridManagementContext) {
  return {
    listByNamespace: (
      resourceGroupName: string,
      namespaceName: string,
      options?: ClientsListByNamespaceOptionalParams,
    ) => listByNamespace(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      clientName: string,
      options?: ClientsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, clientName, options),
    beginDelete: async (
      resourceGroupName: string,
      namespaceName: string,
      clientName: string,
      options?: ClientsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, namespaceName, clientName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      clientName: string,
      options?: ClientsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, namespaceName, clientName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      clientName: string,
      clientInfo: Client,
      options?: ClientsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, namespaceName, clientName, clientInfo, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      namespaceName: string,
      clientName: string,
      clientInfo: Client,
      options?: ClientsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        clientName,
        clientInfo,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      clientName: string,
      clientInfo: Client,
      options?: ClientsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        clientName,
        clientInfo,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      namespaceName: string,
      clientName: string,
      options?: ClientsGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, clientName, options),
  };
}

export function _getClientsOperations(context: EventGridManagementContext): ClientsOperations {
  return {
    ..._getClients(context),
  };
}
