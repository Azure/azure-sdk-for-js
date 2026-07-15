// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext } from "../../api/kustoManagementContext.js";
import {
  checkNameAvailability,
  removePrincipals,
  addPrincipals,
  listPrincipals,
  listByCluster,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/databases/operations.js";
import type {
  DatabasesCheckNameAvailabilityOptionalParams,
  DatabasesRemovePrincipalsOptionalParams,
  DatabasesAddPrincipalsOptionalParams,
  DatabasesListPrincipalsOptionalParams,
  DatabasesListByClusterOptionalParams,
  DatabasesDeleteOptionalParams,
  DatabasesUpdateOptionalParams,
  DatabasesCreateOrUpdateOptionalParams,
  DatabasesGetOptionalParams,
} from "../../api/databases/options.js";
import type {
  CheckNameResult,
  DatabaseUnion,
  DatabasePrincipalListResult,
  DatabasePrincipal,
  DatabasePrincipalListRequest,
  CheckNameRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Databases operations. */
export interface DatabasesOperations {
  /** Checks that the databases resource name is valid and is not already in use. */
  checkNameAvailability: (
    resourceGroupName: string,
    clusterName: string,
    resourceName: CheckNameRequest,
    options?: DatabasesCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameResult>;
  /** Remove Database principals permissions. */
  removePrincipals: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    databasePrincipalsToRemove: DatabasePrincipalListRequest,
    options?: DatabasesRemovePrincipalsOptionalParams,
  ) => Promise<DatabasePrincipalListResult>;
  /** Add Database principals permissions. */
  addPrincipals: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    databasePrincipalsToAdd: DatabasePrincipalListRequest,
    options?: DatabasesAddPrincipalsOptionalParams,
  ) => Promise<DatabasePrincipalListResult>;
  /** Returns a list of database principals of the given Kusto cluster and database. */
  listPrincipals: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: DatabasesListPrincipalsOptionalParams,
  ) => PagedAsyncIterableIterator<DatabasePrincipal>;
  /** Returns the list of databases of the given Kusto cluster. */
  listByCluster: (
    resourceGroupName: string,
    clusterName: string,
    options?: DatabasesListByClusterOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseUnion>;
  /** Deletes the database with the given name. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: DatabasesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: DatabasesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: DatabasesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a database. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: DatabaseUnion,
    options?: DatabasesUpdateOptionalParams,
  ) => PollerLike<OperationState<DatabaseUnion>, DatabaseUnion>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: DatabaseUnion,
    options?: DatabasesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DatabaseUnion>, DatabaseUnion>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: DatabaseUnion,
    options?: DatabasesUpdateOptionalParams,
  ) => Promise<DatabaseUnion>;
  /** Creates or updates a database. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: DatabaseUnion,
    options?: DatabasesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DatabaseUnion>, DatabaseUnion>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: DatabaseUnion,
    options?: DatabasesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DatabaseUnion>, DatabaseUnion>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: DatabaseUnion,
    options?: DatabasesCreateOrUpdateOptionalParams,
  ) => Promise<DatabaseUnion>;
  /** Returns a database. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: DatabasesGetOptionalParams,
  ) => Promise<DatabaseUnion>;
}

function _getDatabases(context: KustoManagementContext) {
  return {
    checkNameAvailability: (
      resourceGroupName: string,
      clusterName: string,
      resourceName: CheckNameRequest,
      options?: DatabasesCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, resourceGroupName, clusterName, resourceName, options),
    removePrincipals: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      databasePrincipalsToRemove: DatabasePrincipalListRequest,
      options?: DatabasesRemovePrincipalsOptionalParams,
    ) =>
      removePrincipals(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        databasePrincipalsToRemove,
        options,
      ),
    addPrincipals: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      databasePrincipalsToAdd: DatabasePrincipalListRequest,
      options?: DatabasesAddPrincipalsOptionalParams,
    ) =>
      addPrincipals(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        databasePrincipalsToAdd,
        options,
      ),
    listPrincipals: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: DatabasesListPrincipalsOptionalParams,
    ) => listPrincipals(context, resourceGroupName, clusterName, databaseName, options),
    listByCluster: (
      resourceGroupName: string,
      clusterName: string,
      options?: DatabasesListByClusterOptionalParams,
    ) => listByCluster(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: DatabasesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, databaseName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: DatabasesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, databaseName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: DatabasesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, databaseName, options);
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: DatabaseUnion,
      options?: DatabasesUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, databaseName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: DatabaseUnion,
      options?: DatabasesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
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
      parameters: DatabaseUnion,
      options?: DatabasesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: DatabaseUnion,
      options?: DatabasesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, clusterName, databaseName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: DatabaseUnion,
      options?: DatabasesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
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
      parameters: DatabaseUnion,
      options?: DatabasesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: DatabasesGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, databaseName, options),
  };
}

export function _getDatabasesOperations(context: KustoManagementContext): DatabasesOperations {
  return {
    ..._getDatabases(context),
  };
}
