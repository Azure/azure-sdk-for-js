// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementContext } from "../../api/dataMigrationManagementContext.js";
import {
  listMigrations,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/migrationServices/operations.js";
import {
  MigrationServicesListMigrationsOptionalParams,
  MigrationServicesListBySubscriptionOptionalParams,
  MigrationServicesListByResourceGroupOptionalParams,
  MigrationServicesDeleteOptionalParams,
  MigrationServicesUpdateOptionalParams,
  MigrationServicesCreateOrUpdateOptionalParams,
  MigrationServicesGetOptionalParams,
} from "../../api/migrationServices/options.js";
import {
  MigrationService,
  MigrationServiceUpdate,
  DatabaseMigrationBase,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MigrationServices operations. */
export interface MigrationServicesOperations {
  /** Retrieve the List of database migrations attached to the service. */
  listMigrations: (
    resourceGroupName: string,
    migrationServiceName: string,
    options?: MigrationServicesListMigrationsOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseMigrationBase>;
  /** Retrieve all migration services in the subscriptions. */
  listBySubscription: (
    options?: MigrationServicesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<MigrationService>;
  /** Retrieve all migration services in the resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: MigrationServicesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<MigrationService>;
  /** Delete Database Migration Service. */
  delete: (
    resourceGroupName: string,
    migrationServiceName: string,
    options?: MigrationServicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    migrationServiceName: string,
    options?: MigrationServicesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    migrationServiceName: string,
    options?: MigrationServicesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update Database Migration Service. */
  update: (
    resourceGroupName: string,
    migrationServiceName: string,
    parameters: MigrationServiceUpdate,
    options?: MigrationServicesUpdateOptionalParams,
  ) => PollerLike<OperationState<MigrationService>, MigrationService>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    migrationServiceName: string,
    parameters: MigrationServiceUpdate,
    options?: MigrationServicesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MigrationService>, MigrationService>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    migrationServiceName: string,
    parameters: MigrationServiceUpdate,
    options?: MigrationServicesUpdateOptionalParams,
  ) => Promise<MigrationService>;
  /** Create or Update Database Migration Service. */
  createOrUpdate: (
    resourceGroupName: string,
    migrationServiceName: string,
    parameters: MigrationService,
    options?: MigrationServicesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MigrationService>, MigrationService>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    migrationServiceName: string,
    parameters: MigrationService,
    options?: MigrationServicesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MigrationService>, MigrationService>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    migrationServiceName: string,
    parameters: MigrationService,
    options?: MigrationServicesCreateOrUpdateOptionalParams,
  ) => Promise<MigrationService>;
  /** Retrieve the Database Migration Service */
  get: (
    resourceGroupName: string,
    migrationServiceName: string,
    options?: MigrationServicesGetOptionalParams,
  ) => Promise<MigrationService>;
}

function _getMigrationServices(context: DataMigrationManagementContext) {
  return {
    listMigrations: (
      resourceGroupName: string,
      migrationServiceName: string,
      options?: MigrationServicesListMigrationsOptionalParams,
    ) => listMigrations(context, resourceGroupName, migrationServiceName, options),
    listBySubscription: (options?: MigrationServicesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: MigrationServicesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      migrationServiceName: string,
      options?: MigrationServicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, migrationServiceName, options),
    beginDelete: async (
      resourceGroupName: string,
      migrationServiceName: string,
      options?: MigrationServicesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, migrationServiceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      migrationServiceName: string,
      options?: MigrationServicesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, migrationServiceName, options);
    },
    update: (
      resourceGroupName: string,
      migrationServiceName: string,
      parameters: MigrationServiceUpdate,
      options?: MigrationServicesUpdateOptionalParams,
    ) => update(context, resourceGroupName, migrationServiceName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      migrationServiceName: string,
      parameters: MigrationServiceUpdate,
      options?: MigrationServicesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, migrationServiceName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      migrationServiceName: string,
      parameters: MigrationServiceUpdate,
      options?: MigrationServicesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, migrationServiceName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      migrationServiceName: string,
      parameters: MigrationService,
      options?: MigrationServicesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, migrationServiceName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      migrationServiceName: string,
      parameters: MigrationService,
      options?: MigrationServicesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        migrationServiceName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      migrationServiceName: string,
      parameters: MigrationService,
      options?: MigrationServicesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        migrationServiceName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      migrationServiceName: string,
      options?: MigrationServicesGetOptionalParams,
    ) => get(context, resourceGroupName, migrationServiceName, options),
  };
}

export function _getMigrationServicesOperations(
  context: DataMigrationManagementContext,
): MigrationServicesOperations {
  return {
    ..._getMigrationServices(context),
  };
}
