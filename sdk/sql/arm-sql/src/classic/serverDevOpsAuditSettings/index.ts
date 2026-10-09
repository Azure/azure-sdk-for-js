// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByServer,
  createOrUpdate,
  get,
} from "../../api/serverDevOpsAuditSettings/operations.js";
import type {
  ServerDevOpsAuditSettingsListByServerOptionalParams,
  ServerDevOpsAuditSettingsCreateOrUpdateOptionalParams,
  ServerDevOpsAuditSettingsGetOptionalParams,
} from "../../api/serverDevOpsAuditSettings/options.js";
import type {
  ServerDevOpsAuditingSettings,
  DevOpsAuditingSettingsName,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServerDevOpsAuditSettings operations. */
export interface ServerDevOpsAuditSettingsOperations {
  /** Lists DevOps audit settings of a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: ServerDevOpsAuditSettingsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<ServerDevOpsAuditingSettings>;
  /** Creates or updates a server's DevOps audit settings. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    devOpsAuditingSettingsName: DevOpsAuditingSettingsName,
    parameters: ServerDevOpsAuditingSettings,
    options?: ServerDevOpsAuditSettingsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ServerDevOpsAuditingSettings>, ServerDevOpsAuditingSettings>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    devOpsAuditingSettingsName: DevOpsAuditingSettingsName,
    parameters: ServerDevOpsAuditingSettings,
    options?: ServerDevOpsAuditSettingsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ServerDevOpsAuditingSettings>, ServerDevOpsAuditingSettings>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    devOpsAuditingSettingsName: DevOpsAuditingSettingsName,
    parameters: ServerDevOpsAuditingSettings,
    options?: ServerDevOpsAuditSettingsCreateOrUpdateOptionalParams,
  ) => Promise<ServerDevOpsAuditingSettings>;
  /** Gets a server's DevOps audit settings. */
  get: (
    resourceGroupName: string,
    serverName: string,
    devOpsAuditingSettingsName: DevOpsAuditingSettingsName,
    options?: ServerDevOpsAuditSettingsGetOptionalParams,
  ) => Promise<ServerDevOpsAuditingSettings>;
}

function _getServerDevOpsAuditSettings(context: SqlManagementContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: ServerDevOpsAuditSettingsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      devOpsAuditingSettingsName: DevOpsAuditingSettingsName,
      parameters: ServerDevOpsAuditingSettings,
      options?: ServerDevOpsAuditSettingsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        devOpsAuditingSettingsName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      devOpsAuditingSettingsName: DevOpsAuditingSettingsName,
      parameters: ServerDevOpsAuditingSettings,
      options?: ServerDevOpsAuditSettingsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        devOpsAuditingSettingsName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      devOpsAuditingSettingsName: DevOpsAuditingSettingsName,
      parameters: ServerDevOpsAuditingSettings,
      options?: ServerDevOpsAuditSettingsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        devOpsAuditingSettingsName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      devOpsAuditingSettingsName: DevOpsAuditingSettingsName,
      options?: ServerDevOpsAuditSettingsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, devOpsAuditingSettingsName, options),
  };
}

export function _getServerDevOpsAuditSettingsOperations(
  context: SqlManagementContext,
): ServerDevOpsAuditSettingsOperations {
  return {
    ..._getServerDevOpsAuditSettings(context),
  };
}
