// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataMigrationManagementContext } from "../../api/dataMigrationManagementContext.js";
import {
  listMonitoringData,
  listMigrations,
  deleteNode,
  regenerateAuthKeys,
  listAuthKeys,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/sqlMigrationServices/operations.js";
import type {
  SqlMigrationServicesListMonitoringDataOptionalParams,
  SqlMigrationServicesListMigrationsOptionalParams,
  SqlMigrationServicesDeleteNodeOptionalParams,
  SqlMigrationServicesRegenerateAuthKeysOptionalParams,
  SqlMigrationServicesListAuthKeysOptionalParams,
  SqlMigrationServicesListBySubscriptionOptionalParams,
  SqlMigrationServicesListByResourceGroupOptionalParams,
  SqlMigrationServicesDeleteOptionalParams,
  SqlMigrationServicesUpdateOptionalParams,
  SqlMigrationServicesCreateOrUpdateOptionalParams,
  SqlMigrationServicesGetOptionalParams,
} from "../../api/sqlMigrationServices/options.js";
import type {
  SqlMigrationService,
  SqlMigrationServiceUpdate,
  AuthenticationKeys,
  RegenAuthKeys,
  DeleteNode,
  DatabaseMigration,
  IntegrationRuntimeMonitoringData,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SqlMigrationServices operations. */
export interface SqlMigrationServicesOperations {
  /** Retrieve the registered Integration Runtime nodes and their monitoring data for a given Database Migration Service. */
  listMonitoringData: (
    resourceGroupName: string,
    sqlMigrationServiceName: string,
    options?: SqlMigrationServicesListMonitoringDataOptionalParams,
  ) => Promise<IntegrationRuntimeMonitoringData>;
  /** Retrieve the List of database migrations attached to the service. */
  listMigrations: (
    resourceGroupName: string,
    sqlMigrationServiceName: string,
    options?: SqlMigrationServicesListMigrationsOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseMigration>;
  /** Delete the integration runtime node. */
  deleteNode: (
    resourceGroupName: string,
    sqlMigrationServiceName: string,
    parameters: DeleteNode,
    options?: SqlMigrationServicesDeleteNodeOptionalParams,
  ) => Promise<DeleteNode>;
  /** Regenerate a new set of Authentication Keys for Self Hosted Integration Runtime. */
  regenerateAuthKeys: (
    resourceGroupName: string,
    sqlMigrationServiceName: string,
    parameters: RegenAuthKeys,
    options?: SqlMigrationServicesRegenerateAuthKeysOptionalParams,
  ) => Promise<RegenAuthKeys>;
  /** Retrieve the List of Authentication Keys for Self Hosted Integration Runtime. */
  listAuthKeys: (
    resourceGroupName: string,
    sqlMigrationServiceName: string,
    options?: SqlMigrationServicesListAuthKeysOptionalParams,
  ) => Promise<AuthenticationKeys>;
  /** Retrieve all SQL migration services in the subscriptions. */
  listBySubscription: (
    options?: SqlMigrationServicesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<SqlMigrationService>;
  /** Retrieve all SQL migration services in the resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SqlMigrationServicesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SqlMigrationService>;
  /** Delete Database Migration Service. */
  delete: (
    resourceGroupName: string,
    sqlMigrationServiceName: string,
    options?: SqlMigrationServicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    sqlMigrationServiceName: string,
    options?: SqlMigrationServicesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    sqlMigrationServiceName: string,
    options?: SqlMigrationServicesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update Database Migration Service. */
  update: (
    resourceGroupName: string,
    sqlMigrationServiceName: string,
    parameters: SqlMigrationServiceUpdate,
    options?: SqlMigrationServicesUpdateOptionalParams,
  ) => PollerLike<OperationState<SqlMigrationService>, SqlMigrationService>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    sqlMigrationServiceName: string,
    parameters: SqlMigrationServiceUpdate,
    options?: SqlMigrationServicesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SqlMigrationService>, SqlMigrationService>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    sqlMigrationServiceName: string,
    parameters: SqlMigrationServiceUpdate,
    options?: SqlMigrationServicesUpdateOptionalParams,
  ) => Promise<SqlMigrationService>;
  /** Create or Update Database Migration Service. */
  createOrUpdate: (
    resourceGroupName: string,
    sqlMigrationServiceName: string,
    parameters: SqlMigrationService,
    options?: SqlMigrationServicesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SqlMigrationService>, SqlMigrationService>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    sqlMigrationServiceName: string,
    parameters: SqlMigrationService,
    options?: SqlMigrationServicesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SqlMigrationService>, SqlMigrationService>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    sqlMigrationServiceName: string,
    parameters: SqlMigrationService,
    options?: SqlMigrationServicesCreateOrUpdateOptionalParams,
  ) => Promise<SqlMigrationService>;
  /** Retrieve the Database Migration Service */
  get: (
    resourceGroupName: string,
    sqlMigrationServiceName: string,
    options?: SqlMigrationServicesGetOptionalParams,
  ) => Promise<SqlMigrationService>;
}

function _getSqlMigrationServices(context: DataMigrationManagementContext) {
  return {
    listMonitoringData: (
      resourceGroupName: string,
      sqlMigrationServiceName: string,
      options?: SqlMigrationServicesListMonitoringDataOptionalParams,
    ) => listMonitoringData(context, resourceGroupName, sqlMigrationServiceName, options),
    listMigrations: (
      resourceGroupName: string,
      sqlMigrationServiceName: string,
      options?: SqlMigrationServicesListMigrationsOptionalParams,
    ) => listMigrations(context, resourceGroupName, sqlMigrationServiceName, options),
    deleteNode: (
      resourceGroupName: string,
      sqlMigrationServiceName: string,
      parameters: DeleteNode,
      options?: SqlMigrationServicesDeleteNodeOptionalParams,
    ) => deleteNode(context, resourceGroupName, sqlMigrationServiceName, parameters, options),
    regenerateAuthKeys: (
      resourceGroupName: string,
      sqlMigrationServiceName: string,
      parameters: RegenAuthKeys,
      options?: SqlMigrationServicesRegenerateAuthKeysOptionalParams,
    ) =>
      regenerateAuthKeys(context, resourceGroupName, sqlMigrationServiceName, parameters, options),
    listAuthKeys: (
      resourceGroupName: string,
      sqlMigrationServiceName: string,
      options?: SqlMigrationServicesListAuthKeysOptionalParams,
    ) => listAuthKeys(context, resourceGroupName, sqlMigrationServiceName, options),
    listBySubscription: (options?: SqlMigrationServicesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SqlMigrationServicesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      sqlMigrationServiceName: string,
      options?: SqlMigrationServicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, sqlMigrationServiceName, options),
    beginDelete: async (
      resourceGroupName: string,
      sqlMigrationServiceName: string,
      options?: SqlMigrationServicesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, sqlMigrationServiceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      sqlMigrationServiceName: string,
      options?: SqlMigrationServicesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, sqlMigrationServiceName, options);
    },
    update: (
      resourceGroupName: string,
      sqlMigrationServiceName: string,
      parameters: SqlMigrationServiceUpdate,
      options?: SqlMigrationServicesUpdateOptionalParams,
    ) => update(context, resourceGroupName, sqlMigrationServiceName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      sqlMigrationServiceName: string,
      parameters: SqlMigrationServiceUpdate,
      options?: SqlMigrationServicesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        sqlMigrationServiceName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      sqlMigrationServiceName: string,
      parameters: SqlMigrationServiceUpdate,
      options?: SqlMigrationServicesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, sqlMigrationServiceName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      sqlMigrationServiceName: string,
      parameters: SqlMigrationService,
      options?: SqlMigrationServicesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, sqlMigrationServiceName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      sqlMigrationServiceName: string,
      parameters: SqlMigrationService,
      options?: SqlMigrationServicesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        sqlMigrationServiceName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      sqlMigrationServiceName: string,
      parameters: SqlMigrationService,
      options?: SqlMigrationServicesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        sqlMigrationServiceName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      sqlMigrationServiceName: string,
      options?: SqlMigrationServicesGetOptionalParams,
    ) => get(context, resourceGroupName, sqlMigrationServiceName, options),
  };
}

export function _getSqlMigrationServicesOperations(
  context: DataMigrationManagementContext,
): SqlMigrationServicesOperations {
  return {
    ..._getSqlMigrationServices(context),
  };
}
