// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext } from "../../api/kustoManagementContext.js";
import {
  checkNameAvailability,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/databasePrincipalAssignments/operations.js";
import type {
  DatabasePrincipalAssignmentsCheckNameAvailabilityOptionalParams,
  DatabasePrincipalAssignmentsListOptionalParams,
  DatabasePrincipalAssignmentsDeleteOptionalParams,
  DatabasePrincipalAssignmentsCreateOrUpdateOptionalParams,
  DatabasePrincipalAssignmentsGetOptionalParams,
} from "../../api/databasePrincipalAssignments/options.js";
import type {
  CheckNameResult,
  DatabasePrincipalAssignment,
  DatabasePrincipalAssignmentCheckNameRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DatabasePrincipalAssignments operations. */
export interface DatabasePrincipalAssignmentsOperations {
  /** Checks that the database principal assignment is valid and is not already in use. */
  checkNameAvailability: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    principalAssignmentName: DatabasePrincipalAssignmentCheckNameRequest,
    options?: DatabasePrincipalAssignmentsCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameResult>;
  /** Lists all Kusto cluster database principalAssignments. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: DatabasePrincipalAssignmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<DatabasePrincipalAssignment>;
  /** Deletes a Kusto principalAssignment. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    principalAssignmentName: string,
    options?: DatabasePrincipalAssignmentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    principalAssignmentName: string,
    options?: DatabasePrincipalAssignmentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    principalAssignmentName: string,
    options?: DatabasePrincipalAssignmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a Kusto cluster database principalAssignment. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    principalAssignmentName: string,
    parameters: DatabasePrincipalAssignment,
    options?: DatabasePrincipalAssignmentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DatabasePrincipalAssignment>, DatabasePrincipalAssignment>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    principalAssignmentName: string,
    parameters: DatabasePrincipalAssignment,
    options?: DatabasePrincipalAssignmentsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DatabasePrincipalAssignment>, DatabasePrincipalAssignment>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    principalAssignmentName: string,
    parameters: DatabasePrincipalAssignment,
    options?: DatabasePrincipalAssignmentsCreateOrUpdateOptionalParams,
  ) => Promise<DatabasePrincipalAssignment>;
  /** Gets a Kusto cluster database principalAssignment. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    principalAssignmentName: string,
    options?: DatabasePrincipalAssignmentsGetOptionalParams,
  ) => Promise<DatabasePrincipalAssignment>;
}

function _getDatabasePrincipalAssignments(context: KustoManagementContext) {
  return {
    checkNameAvailability: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      principalAssignmentName: DatabasePrincipalAssignmentCheckNameRequest,
      options?: DatabasePrincipalAssignmentsCheckNameAvailabilityOptionalParams,
    ) =>
      checkNameAvailability(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        principalAssignmentName,
        options,
      ),
    list: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: DatabasePrincipalAssignmentsListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, databaseName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      principalAssignmentName: string,
      options?: DatabasePrincipalAssignmentsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        principalAssignmentName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      principalAssignmentName: string,
      options?: DatabasePrincipalAssignmentsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        principalAssignmentName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      principalAssignmentName: string,
      options?: DatabasePrincipalAssignmentsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        principalAssignmentName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      principalAssignmentName: string,
      parameters: DatabasePrincipalAssignment,
      options?: DatabasePrincipalAssignmentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        principalAssignmentName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      principalAssignmentName: string,
      parameters: DatabasePrincipalAssignment,
      options?: DatabasePrincipalAssignmentsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        principalAssignmentName,
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
      principalAssignmentName: string,
      parameters: DatabasePrincipalAssignment,
      options?: DatabasePrincipalAssignmentsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        principalAssignmentName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      principalAssignmentName: string,
      options?: DatabasePrincipalAssignmentsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, clusterName, databaseName, principalAssignmentName, options),
  };
}

export function _getDatabasePrincipalAssignmentsOperations(
  context: KustoManagementContext,
): DatabasePrincipalAssignmentsOperations {
  return {
    ..._getDatabasePrincipalAssignments(context),
  };
}
