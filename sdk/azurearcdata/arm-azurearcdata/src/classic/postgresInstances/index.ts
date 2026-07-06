// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureArcDataContext } from "../../api/azureArcDataContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/postgresInstances/operations.js";
import type {
  PostgresInstancesListOptionalParams,
  PostgresInstancesListByResourceGroupOptionalParams,
  PostgresInstancesDeleteOptionalParams,
  PostgresInstancesUpdateOptionalParams,
  PostgresInstancesCreateOptionalParams,
  PostgresInstancesGetOptionalParams,
} from "../../api/postgresInstances/options.js";
import type { PostgresInstance, PostgresInstanceUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PostgresInstances operations. */
export interface PostgresInstancesOperations {
  /** List postgres Instance resources in the subscription */
  list: (
    options?: PostgresInstancesListOptionalParams,
  ) => PagedAsyncIterableIterator<PostgresInstance>;
  /** Get a postgres Instances list by Resource group name. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PostgresInstancesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PostgresInstance>;
  /** Deletes a postgres Instance resource */
  delete: (
    resourceGroupName: string,
    postgresInstanceName: string,
    options?: PostgresInstancesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a postgres Instance resource */
  update: (
    resourceGroupName: string,
    postgresInstanceName: string,
    parameters: PostgresInstanceUpdate,
    options?: PostgresInstancesUpdateOptionalParams,
  ) => Promise<PostgresInstance>;
  /** Creates or replaces a postgres Instance resource */
  create: (
    resourceGroupName: string,
    postgresInstanceName: string,
    resource: PostgresInstance,
    options?: PostgresInstancesCreateOptionalParams,
  ) => PollerLike<OperationState<PostgresInstance>, PostgresInstance>;
  /** Retrieves a postgres Instance resource */
  get: (
    resourceGroupName: string,
    postgresInstanceName: string,
    options?: PostgresInstancesGetOptionalParams,
  ) => Promise<PostgresInstance>;
}

function _getPostgresInstances(context: AzureArcDataContext) {
  return {
    list: (options?: PostgresInstancesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: PostgresInstancesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      postgresInstanceName: string,
      options?: PostgresInstancesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, postgresInstanceName, options),
    update: (
      resourceGroupName: string,
      postgresInstanceName: string,
      parameters: PostgresInstanceUpdate,
      options?: PostgresInstancesUpdateOptionalParams,
    ) => update(context, resourceGroupName, postgresInstanceName, parameters, options),
    create: (
      resourceGroupName: string,
      postgresInstanceName: string,
      resource: PostgresInstance,
      options?: PostgresInstancesCreateOptionalParams,
    ) => create(context, resourceGroupName, postgresInstanceName, resource, options),
    get: (
      resourceGroupName: string,
      postgresInstanceName: string,
      options?: PostgresInstancesGetOptionalParams,
    ) => get(context, resourceGroupName, postgresInstanceName, options),
  };
}

export function _getPostgresInstancesOperations(
  context: AzureArcDataContext,
): PostgresInstancesOperations {
  return {
    ..._getPostgresInstances(context),
  };
}
