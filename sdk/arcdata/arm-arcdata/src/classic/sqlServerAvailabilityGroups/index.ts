// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureArcDataContext } from "../../api/azureArcDataContext.js";
import {
  removeDatabases,
  deleteMiLink,
  failoverMiLink,
  addDatabases,
  forceFailoverAllowDataLoss,
  failover,
  detailView,
  list,
  $delete,
  update,
  create,
  get,
  createManagedInstanceLink,
  createDistributedAvailabilityGroup,
  createAvailabilityGroup,
} from "../../api/sqlServerAvailabilityGroups/operations.js";
import type {
  SqlServerAvailabilityGroupsRemoveDatabasesOptionalParams,
  SqlServerAvailabilityGroupsDeleteMiLinkOptionalParams,
  SqlServerAvailabilityGroupsFailoverMiLinkOptionalParams,
  SqlServerAvailabilityGroupsAddDatabasesOptionalParams,
  SqlServerAvailabilityGroupsForceFailoverAllowDataLossOptionalParams,
  SqlServerAvailabilityGroupsFailoverOptionalParams,
  SqlServerAvailabilityGroupsDetailViewOptionalParams,
  SqlServerAvailabilityGroupsListOptionalParams,
  SqlServerAvailabilityGroupsDeleteOptionalParams,
  SqlServerAvailabilityGroupsUpdateOptionalParams,
  SqlServerAvailabilityGroupsCreateOptionalParams,
  SqlServerAvailabilityGroupsGetOptionalParams,
  SqlServerAvailabilityGroupsCreateManagedInstanceLinkOptionalParams,
  SqlServerAvailabilityGroupsCreateDistributedAvailabilityGroupOptionalParams,
  SqlServerAvailabilityGroupsCreateAvailabilityGroupOptionalParams,
} from "../../api/sqlServerAvailabilityGroups/options.js";
import type {
  SqlServerAvailabilityGroupResource,
  AvailabilityGroupCreateUpdateConfiguration,
  DistributedAvailabilityGroupCreateUpdateConfiguration,
  ManagedInstanceLinkCreateUpdateConfiguration,
  SqlServerAvailabilityGroupUpdate,
  Databases,
  FailoverMiLinkResourceId,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SqlServerAvailabilityGroups operations. */
export interface SqlServerAvailabilityGroupsOperations {
  /** Request removing database(s) from an existing availability group. */
  removeDatabases: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    availabilityGroupName: string,
    databases: Databases,
    options?: SqlServerAvailabilityGroupsRemoveDatabasesOptionalParams,
  ) => Promise<SqlServerAvailabilityGroupResource>;
  /** Deletes the MI Link between an Azure Arc-enabled SQL Server and an Azure SQL Managed Instance. */
  deleteMiLink: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    availabilityGroupName: string,
    options?: SqlServerAvailabilityGroupsDeleteMiLinkOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Request failover of Arc Sql Server to Azure Managed Instance. */
  failoverMiLink: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    availabilityGroupName: string,
    managedInstanceResourceId: FailoverMiLinkResourceId,
    options?: SqlServerAvailabilityGroupsFailoverMiLinkOptionalParams,
  ) => PollerLike<
    OperationState<SqlServerAvailabilityGroupResource>,
    SqlServerAvailabilityGroupResource
  >;
  /** Request adding database(s) to an existing availability group. */
  addDatabases: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    availabilityGroupName: string,
    databases: Databases,
    options?: SqlServerAvailabilityGroupsAddDatabasesOptionalParams,
  ) => Promise<SqlServerAvailabilityGroupResource>;
  /** Request forced failover of the availability group to this server. */
  forceFailoverAllowDataLoss: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    availabilityGroupName: string,
    options?: SqlServerAvailabilityGroupsForceFailoverAllowDataLossOptionalParams,
  ) => Promise<SqlServerAvailabilityGroupResource>;
  /** Request manual failover of the availability group to this server. */
  failover: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    availabilityGroupName: string,
    options?: SqlServerAvailabilityGroupsFailoverOptionalParams,
  ) => Promise<SqlServerAvailabilityGroupResource>;
  /** Retrieves detailed properties of the Availability Group. */
  detailView: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    availabilityGroupName: string,
    options?: SqlServerAvailabilityGroupsDetailViewOptionalParams,
  ) => Promise<SqlServerAvailabilityGroupResource>;
  /** List the availability group associated with the given Arc Sql Server. */
  list: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    options?: SqlServerAvailabilityGroupsListOptionalParams,
  ) => PagedAsyncIterableIterator<SqlServerAvailabilityGroupResource>;
  /** Deletes an Arc Sql Server availability group resource. */
  delete: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    availabilityGroupName: string,
    options?: SqlServerAvailabilityGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an existing Availability Group. */
  update: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    availabilityGroupName: string,
    sqlServerAvailabilityGroupUpdate: SqlServerAvailabilityGroupUpdate,
    options?: SqlServerAvailabilityGroupsUpdateOptionalParams,
  ) => PollerLike<
    OperationState<SqlServerAvailabilityGroupResource>,
    SqlServerAvailabilityGroupResource
  >;
  /** Creates or replaces an Arc Sql Server Availability Group. */
  create: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    availabilityGroupName: string,
    sqlServerAvailabilityGroupResource: SqlServerAvailabilityGroupResource,
    options?: SqlServerAvailabilityGroupsCreateOptionalParams,
  ) => Promise<SqlServerAvailabilityGroupResource>;
  /** Retrieves an Arc Sql Server availability group. */
  get: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    availabilityGroupName: string,
    options?: SqlServerAvailabilityGroupsGetOptionalParams,
  ) => Promise<SqlServerAvailabilityGroupResource>;
  /** Create an Managed Instance Link */
  createManagedInstanceLink: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    createManagedInstanceLinkConfiguration: ManagedInstanceLinkCreateUpdateConfiguration,
    options?: SqlServerAvailabilityGroupsCreateManagedInstanceLinkOptionalParams,
  ) => PollerLike<
    OperationState<SqlServerAvailabilityGroupResource>,
    SqlServerAvailabilityGroupResource
  >;
  /** Create a SQL Server distributed availability group */
  createDistributedAvailabilityGroup: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    createDagConfiguration: DistributedAvailabilityGroupCreateUpdateConfiguration,
    options?: SqlServerAvailabilityGroupsCreateDistributedAvailabilityGroupOptionalParams,
  ) => PollerLike<
    OperationState<SqlServerAvailabilityGroupResource>,
    SqlServerAvailabilityGroupResource
  >;
  /** Create a SQL Server availability group */
  createAvailabilityGroup: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    createAgConfiguration: AvailabilityGroupCreateUpdateConfiguration,
    options?: SqlServerAvailabilityGroupsCreateAvailabilityGroupOptionalParams,
  ) => PollerLike<
    OperationState<SqlServerAvailabilityGroupResource>,
    SqlServerAvailabilityGroupResource
  >;
}

function _getSqlServerAvailabilityGroups(context: AzureArcDataContext) {
  return {
    removeDatabases: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      availabilityGroupName: string,
      databases: Databases,
      options?: SqlServerAvailabilityGroupsRemoveDatabasesOptionalParams,
    ) =>
      removeDatabases(
        context,
        resourceGroupName,
        sqlServerInstanceName,
        availabilityGroupName,
        databases,
        options,
      ),
    deleteMiLink: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      availabilityGroupName: string,
      options?: SqlServerAvailabilityGroupsDeleteMiLinkOptionalParams,
    ) =>
      deleteMiLink(
        context,
        resourceGroupName,
        sqlServerInstanceName,
        availabilityGroupName,
        options,
      ),
    failoverMiLink: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      availabilityGroupName: string,
      managedInstanceResourceId: FailoverMiLinkResourceId,
      options?: SqlServerAvailabilityGroupsFailoverMiLinkOptionalParams,
    ) =>
      failoverMiLink(
        context,
        resourceGroupName,
        sqlServerInstanceName,
        availabilityGroupName,
        managedInstanceResourceId,
        options,
      ),
    addDatabases: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      availabilityGroupName: string,
      databases: Databases,
      options?: SqlServerAvailabilityGroupsAddDatabasesOptionalParams,
    ) =>
      addDatabases(
        context,
        resourceGroupName,
        sqlServerInstanceName,
        availabilityGroupName,
        databases,
        options,
      ),
    forceFailoverAllowDataLoss: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      availabilityGroupName: string,
      options?: SqlServerAvailabilityGroupsForceFailoverAllowDataLossOptionalParams,
    ) =>
      forceFailoverAllowDataLoss(
        context,
        resourceGroupName,
        sqlServerInstanceName,
        availabilityGroupName,
        options,
      ),
    failover: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      availabilityGroupName: string,
      options?: SqlServerAvailabilityGroupsFailoverOptionalParams,
    ) =>
      failover(context, resourceGroupName, sqlServerInstanceName, availabilityGroupName, options),
    detailView: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      availabilityGroupName: string,
      options?: SqlServerAvailabilityGroupsDetailViewOptionalParams,
    ) =>
      detailView(context, resourceGroupName, sqlServerInstanceName, availabilityGroupName, options),
    list: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      options?: SqlServerAvailabilityGroupsListOptionalParams,
    ) => list(context, resourceGroupName, sqlServerInstanceName, options),
    delete: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      availabilityGroupName: string,
      options?: SqlServerAvailabilityGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, sqlServerInstanceName, availabilityGroupName, options),
    update: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      availabilityGroupName: string,
      sqlServerAvailabilityGroupUpdate: SqlServerAvailabilityGroupUpdate,
      options?: SqlServerAvailabilityGroupsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        sqlServerInstanceName,
        availabilityGroupName,
        sqlServerAvailabilityGroupUpdate,
        options,
      ),
    create: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      availabilityGroupName: string,
      sqlServerAvailabilityGroupResource: SqlServerAvailabilityGroupResource,
      options?: SqlServerAvailabilityGroupsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        sqlServerInstanceName,
        availabilityGroupName,
        sqlServerAvailabilityGroupResource,
        options,
      ),
    get: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      availabilityGroupName: string,
      options?: SqlServerAvailabilityGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, sqlServerInstanceName, availabilityGroupName, options),
    createManagedInstanceLink: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      createManagedInstanceLinkConfiguration: ManagedInstanceLinkCreateUpdateConfiguration,
      options?: SqlServerAvailabilityGroupsCreateManagedInstanceLinkOptionalParams,
    ) =>
      createManagedInstanceLink(
        context,
        resourceGroupName,
        sqlServerInstanceName,
        createManagedInstanceLinkConfiguration,
        options,
      ),
    createDistributedAvailabilityGroup: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      createDagConfiguration: DistributedAvailabilityGroupCreateUpdateConfiguration,
      options?: SqlServerAvailabilityGroupsCreateDistributedAvailabilityGroupOptionalParams,
    ) =>
      createDistributedAvailabilityGroup(
        context,
        resourceGroupName,
        sqlServerInstanceName,
        createDagConfiguration,
        options,
      ),
    createAvailabilityGroup: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      createAgConfiguration: AvailabilityGroupCreateUpdateConfiguration,
      options?: SqlServerAvailabilityGroupsCreateAvailabilityGroupOptionalParams,
    ) =>
      createAvailabilityGroup(
        context,
        resourceGroupName,
        sqlServerInstanceName,
        createAgConfiguration,
        options,
      ),
  };
}

export function _getSqlServerAvailabilityGroupsOperations(
  context: AzureArcDataContext,
): SqlServerAvailabilityGroupsOperations {
  return {
    ..._getSqlServerAvailabilityGroups(context),
  };
}
