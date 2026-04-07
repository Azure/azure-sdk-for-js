// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  acquire,
  listByServer,
  $delete,
  createOrUpdate,
  get,
} from "../../api/serverDnsAliases/operations.js";
import type {
  ServerDnsAliasesAcquireOptionalParams,
  ServerDnsAliasesListByServerOptionalParams,
  ServerDnsAliasesDeleteOptionalParams,
  ServerDnsAliasesCreateOrUpdateOptionalParams,
  ServerDnsAliasesGetOptionalParams,
} from "../../api/serverDnsAliases/options.js";
import type { ServerDnsAlias, ServerDnsAliasAcquisition } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServerDnsAliases operations. */
export interface ServerDnsAliasesOperations {
  /** Acquires server DNS alias from another server. */
  acquire: (
    resourceGroupName: string,
    serverName: string,
    dnsAliasName: string,
    parameters: ServerDnsAliasAcquisition,
    options?: ServerDnsAliasesAcquireOptionalParams,
  ) => PollerLike<OperationState<ServerDnsAlias>, ServerDnsAlias>;
  /** @deprecated use acquire instead */
  beginAcquire: (
    resourceGroupName: string,
    serverName: string,
    dnsAliasName: string,
    parameters: ServerDnsAliasAcquisition,
    options?: ServerDnsAliasesAcquireOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ServerDnsAlias>, ServerDnsAlias>>;
  /** @deprecated use acquire instead */
  beginAcquireAndWait: (
    resourceGroupName: string,
    serverName: string,
    dnsAliasName: string,
    parameters: ServerDnsAliasAcquisition,
    options?: ServerDnsAliasesAcquireOptionalParams,
  ) => Promise<ServerDnsAlias>;
  /** Gets a list of server DNS aliases for a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: ServerDnsAliasesListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<ServerDnsAlias>;
  /** Deletes the server DNS alias with the given name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    dnsAliasName: string,
    options?: ServerDnsAliasesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    dnsAliasName: string,
    options?: ServerDnsAliasesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    dnsAliasName: string,
    options?: ServerDnsAliasesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a server DNS alias. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    dnsAliasName: string,
    options?: ServerDnsAliasesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ServerDnsAlias>, ServerDnsAlias>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    dnsAliasName: string,
    options?: ServerDnsAliasesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ServerDnsAlias>, ServerDnsAlias>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    dnsAliasName: string,
    options?: ServerDnsAliasesCreateOrUpdateOptionalParams,
  ) => Promise<ServerDnsAlias>;
  /** Gets a server DNS alias. */
  get: (
    resourceGroupName: string,
    serverName: string,
    dnsAliasName: string,
    options?: ServerDnsAliasesGetOptionalParams,
  ) => Promise<ServerDnsAlias>;
}

function _getServerDnsAliases(context: SqlContext) {
  return {
    acquire: (
      resourceGroupName: string,
      serverName: string,
      dnsAliasName: string,
      parameters: ServerDnsAliasAcquisition,
      options?: ServerDnsAliasesAcquireOptionalParams,
    ) => acquire(context, resourceGroupName, serverName, dnsAliasName, parameters, options),
    beginAcquire: async (
      resourceGroupName: string,
      serverName: string,
      dnsAliasName: string,
      parameters: ServerDnsAliasAcquisition,
      options?: ServerDnsAliasesAcquireOptionalParams,
    ) => {
      const poller = acquire(
        context,
        resourceGroupName,
        serverName,
        dnsAliasName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginAcquireAndWait: async (
      resourceGroupName: string,
      serverName: string,
      dnsAliasName: string,
      parameters: ServerDnsAliasAcquisition,
      options?: ServerDnsAliasesAcquireOptionalParams,
    ) => {
      return await acquire(
        context,
        resourceGroupName,
        serverName,
        dnsAliasName,
        parameters,
        options,
      );
    },
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: ServerDnsAliasesListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      dnsAliasName: string,
      options?: ServerDnsAliasesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, dnsAliasName, options),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      dnsAliasName: string,
      options?: ServerDnsAliasesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, serverName, dnsAliasName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serverName: string,
      dnsAliasName: string,
      options?: ServerDnsAliasesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serverName, dnsAliasName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      dnsAliasName: string,
      options?: ServerDnsAliasesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serverName, dnsAliasName, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      dnsAliasName: string,
      options?: ServerDnsAliasesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, serverName, dnsAliasName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      dnsAliasName: string,
      options?: ServerDnsAliasesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, serverName, dnsAliasName, options);
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      dnsAliasName: string,
      options?: ServerDnsAliasesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, dnsAliasName, options),
  };
}

export function _getServerDnsAliasesOperations(context: SqlContext): ServerDnsAliasesOperations {
  return {
    ..._getServerDnsAliases(context),
  };
}
