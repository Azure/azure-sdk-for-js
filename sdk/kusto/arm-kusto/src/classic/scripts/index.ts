// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext } from "../../api/kustoManagementContext.js";
import {
  checkNameAvailability,
  listByDatabase,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/scripts/operations.js";
import type {
  ScriptsCheckNameAvailabilityOptionalParams,
  ScriptsListByDatabaseOptionalParams,
  ScriptsDeleteOptionalParams,
  ScriptsUpdateOptionalParams,
  ScriptsCreateOrUpdateOptionalParams,
  ScriptsGetOptionalParams,
} from "../../api/scripts/options.js";
import type { CheckNameResult, Script, ScriptCheckNameRequest } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Scripts operations. */
export interface ScriptsOperations {
  /** Checks that the script name is valid and is not already in use. */
  checkNameAvailability: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    scriptName: ScriptCheckNameRequest,
    options?: ScriptsCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameResult>;
  /** Returns the list of database scripts for given database. */
  listByDatabase: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: ScriptsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<Script>;
  /** Deletes a Kusto database script. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    scriptName: string,
    options?: ScriptsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    scriptName: string,
    options?: ScriptsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    scriptName: string,
    options?: ScriptsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a database script. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    scriptName: string,
    parameters: Script,
    options?: ScriptsUpdateOptionalParams,
  ) => PollerLike<OperationState<Script>, Script>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    scriptName: string,
    parameters: Script,
    options?: ScriptsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Script>, Script>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    scriptName: string,
    parameters: Script,
    options?: ScriptsUpdateOptionalParams,
  ) => Promise<Script>;
  /** Creates a Kusto database script. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    scriptName: string,
    parameters: Script,
    options?: ScriptsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Script>, Script>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    scriptName: string,
    parameters: Script,
    options?: ScriptsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Script>, Script>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    scriptName: string,
    parameters: Script,
    options?: ScriptsCreateOrUpdateOptionalParams,
  ) => Promise<Script>;
  /** Gets a Kusto cluster database script. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    scriptName: string,
    options?: ScriptsGetOptionalParams,
  ) => Promise<Script>;
}

function _getScripts(context: KustoManagementContext) {
  return {
    checkNameAvailability: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      scriptName: ScriptCheckNameRequest,
      options?: ScriptsCheckNameAvailabilityOptionalParams,
    ) =>
      checkNameAvailability(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        scriptName,
        options,
      ),
    listByDatabase: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: ScriptsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, clusterName, databaseName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      scriptName: string,
      options?: ScriptsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, databaseName, scriptName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      scriptName: string,
      options?: ScriptsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        scriptName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      scriptName: string,
      options?: ScriptsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        scriptName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      scriptName: string,
      parameters: Script,
      options?: ScriptsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        scriptName,
        parameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      scriptName: string,
      parameters: Script,
      options?: ScriptsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        scriptName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      scriptName: string,
      parameters: Script,
      options?: ScriptsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        scriptName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      scriptName: string,
      parameters: Script,
      options?: ScriptsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        scriptName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      scriptName: string,
      parameters: Script,
      options?: ScriptsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        scriptName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      scriptName: string,
      parameters: Script,
      options?: ScriptsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        scriptName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      scriptName: string,
      options?: ScriptsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, databaseName, scriptName, options),
  };
}

export function _getScriptsOperations(context: KustoManagementContext): ScriptsOperations {
  return {
    ..._getScripts(context),
  };
}
