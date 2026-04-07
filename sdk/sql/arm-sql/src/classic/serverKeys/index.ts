// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { listByServer, $delete, createOrUpdate, get } from "../../api/serverKeys/operations.js";
import type {
  ServerKeysListByServerOptionalParams,
  ServerKeysDeleteOptionalParams,
  ServerKeysCreateOrUpdateOptionalParams,
  ServerKeysGetOptionalParams,
} from "../../api/serverKeys/options.js";
import type { ServerKey } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServerKeys operations. */
export interface ServerKeysOperations {
  /** Gets a list of server keys. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: ServerKeysListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<ServerKey>;
  /** Deletes the server key with the given name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    keyName: string,
    options?: ServerKeysDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    keyName: string,
    options?: ServerKeysDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    keyName: string,
    options?: ServerKeysDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a server key. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    keyName: string,
    parameters: ServerKey,
    options?: ServerKeysCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ServerKey>, ServerKey>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    keyName: string,
    parameters: ServerKey,
    options?: ServerKeysCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ServerKey>, ServerKey>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    keyName: string,
    parameters: ServerKey,
    options?: ServerKeysCreateOrUpdateOptionalParams,
  ) => Promise<ServerKey>;
  /** Gets a server key. */
  get: (
    resourceGroupName: string,
    serverName: string,
    keyName: string,
    options?: ServerKeysGetOptionalParams,
  ) => Promise<ServerKey>;
}

function _getServerKeys(context: SqlContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: ServerKeysListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      keyName: string,
      options?: ServerKeysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, keyName, options),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      keyName: string,
      options?: ServerKeysDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, serverName, keyName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serverName: string,
      keyName: string,
      options?: ServerKeysDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serverName, keyName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      keyName: string,
      parameters: ServerKey,
      options?: ServerKeysCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serverName, keyName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      keyName: string,
      parameters: ServerKey,
      options?: ServerKeysCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        keyName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      keyName: string,
      parameters: ServerKey,
      options?: ServerKeysCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        keyName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      keyName: string,
      options?: ServerKeysGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, keyName, options),
  };
}

export function _getServerKeysOperations(context: SqlContext): ServerKeysOperations {
  return {
    ..._getServerKeys(context),
  };
}
