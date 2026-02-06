// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import {
  listByServer,
  $delete,
  createOrUpdate,
  get,
} from "../../api/administratorsMicrosoftEntra/operations.js";
import type {
  AdministratorsMicrosoftEntraListByServerOptionalParams,
  AdministratorsMicrosoftEntraDeleteOptionalParams,
  AdministratorsMicrosoftEntraCreateOrUpdateOptionalParams,
  AdministratorsMicrosoftEntraGetOptionalParams,
} from "../../api/administratorsMicrosoftEntra/options.js";
import type {
  AdministratorMicrosoftEntra,
  AdministratorMicrosoftEntraAdd,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AdministratorsMicrosoftEntra operations. */
export interface AdministratorsMicrosoftEntraOperations {
  /** List all server administrators associated to a Microsoft Entra principal. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: AdministratorsMicrosoftEntraListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<AdministratorMicrosoftEntra>;
  /** Deletes an existing server administrator associated to a Microsoft Entra principal. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    objectId: string,
    options?: AdministratorsMicrosoftEntraDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    objectId: string,
    options?: AdministratorsMicrosoftEntraDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    objectId: string,
    options?: AdministratorsMicrosoftEntraDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new server administrator associated to a Microsoft Entra principal. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    objectId: string,
    parameters: AdministratorMicrosoftEntraAdd,
    options?: AdministratorsMicrosoftEntraCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AdministratorMicrosoftEntra>, AdministratorMicrosoftEntra>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    objectId: string,
    parameters: AdministratorMicrosoftEntraAdd,
    options?: AdministratorsMicrosoftEntraCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<AdministratorMicrosoftEntra>, AdministratorMicrosoftEntra>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    objectId: string,
    parameters: AdministratorMicrosoftEntraAdd,
    options?: AdministratorsMicrosoftEntraCreateOrUpdateOptionalParams,
  ) => Promise<AdministratorMicrosoftEntra>;
  /** Gets information about a server administrator associated to a Microsoft Entra principal. */
  get: (
    resourceGroupName: string,
    serverName: string,
    objectId: string,
    options?: AdministratorsMicrosoftEntraGetOptionalParams,
  ) => Promise<AdministratorMicrosoftEntra>;
}

function _getAdministratorsMicrosoftEntra(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: AdministratorsMicrosoftEntraListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      objectId: string,
      options?: AdministratorsMicrosoftEntraDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, objectId, options),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      objectId: string,
      options?: AdministratorsMicrosoftEntraDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, serverName, objectId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serverName: string,
      objectId: string,
      options?: AdministratorsMicrosoftEntraDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serverName, objectId, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      objectId: string,
      parameters: AdministratorMicrosoftEntraAdd,
      options?: AdministratorsMicrosoftEntraCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serverName, objectId, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      objectId: string,
      parameters: AdministratorMicrosoftEntraAdd,
      options?: AdministratorsMicrosoftEntraCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        objectId,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      objectId: string,
      parameters: AdministratorMicrosoftEntraAdd,
      options?: AdministratorsMicrosoftEntraCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        objectId,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      objectId: string,
      options?: AdministratorsMicrosoftEntraGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, objectId, options),
  };
}

export function _getAdministratorsMicrosoftEntraOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): AdministratorsMicrosoftEntraOperations {
  return {
    ..._getAdministratorsMicrosoftEntra(context),
  };
}
