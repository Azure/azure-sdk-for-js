// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext } from "../../api/kustoManagementContext.js";
import {
  checkNameAvailability,
  dataConnectionValidation,
  listByDatabase,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/dataConnections/operations.js";
import type {
  DataConnectionsCheckNameAvailabilityOptionalParams,
  DataConnectionsDataConnectionValidationOptionalParams,
  DataConnectionsListByDatabaseOptionalParams,
  DataConnectionsDeleteOptionalParams,
  DataConnectionsUpdateOptionalParams,
  DataConnectionsCreateOrUpdateOptionalParams,
  DataConnectionsGetOptionalParams,
} from "../../api/dataConnections/options.js";
import type {
  CheckNameResult,
  DataConnectionUnion,
  DataConnectionValidation,
  DataConnectionValidationListResult,
  DataConnectionCheckNameRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DataConnections operations. */
export interface DataConnectionsOperations {
  /** Checks that the data connection name is valid and is not already in use. */
  checkNameAvailability: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    dataConnectionName: DataConnectionCheckNameRequest,
    options?: DataConnectionsCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameResult>;
  /** Checks that the data connection parameters are valid. */
  dataConnectionValidation: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: DataConnectionValidation,
    options?: DataConnectionsDataConnectionValidationOptionalParams,
  ) => PollerLike<
    OperationState<DataConnectionValidationListResult>,
    DataConnectionValidationListResult
  >;
  /** @deprecated use dataConnectionValidation instead */
  beginDataConnectionValidation: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: DataConnectionValidation,
    options?: DataConnectionsDataConnectionValidationOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<DataConnectionValidationListResult>,
      DataConnectionValidationListResult
    >
  >;
  /** @deprecated use dataConnectionValidation instead */
  beginDataConnectionValidationAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    parameters: DataConnectionValidation,
    options?: DataConnectionsDataConnectionValidationOptionalParams,
  ) => Promise<DataConnectionValidationListResult>;
  /** Returns the list of data connections of the given Kusto database. */
  listByDatabase: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: DataConnectionsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<DataConnectionUnion>;
  /** Deletes the data connection with the given name. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    dataConnectionName: string,
    options?: DataConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    dataConnectionName: string,
    options?: DataConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    dataConnectionName: string,
    options?: DataConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a data connection. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    dataConnectionName: string,
    parameters: DataConnectionUnion,
    options?: DataConnectionsUpdateOptionalParams,
  ) => PollerLike<OperationState<DataConnectionUnion>, DataConnectionUnion>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    dataConnectionName: string,
    parameters: DataConnectionUnion,
    options?: DataConnectionsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DataConnectionUnion>, DataConnectionUnion>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    dataConnectionName: string,
    parameters: DataConnectionUnion,
    options?: DataConnectionsUpdateOptionalParams,
  ) => Promise<DataConnectionUnion>;
  /** Creates or updates a data connection. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    dataConnectionName: string,
    parameters: DataConnectionUnion,
    options?: DataConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DataConnectionUnion>, DataConnectionUnion>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    dataConnectionName: string,
    parameters: DataConnectionUnion,
    options?: DataConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DataConnectionUnion>, DataConnectionUnion>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    dataConnectionName: string,
    parameters: DataConnectionUnion,
    options?: DataConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<DataConnectionUnion>;
  /** Returns a data connection. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    dataConnectionName: string,
    options?: DataConnectionsGetOptionalParams,
  ) => Promise<DataConnectionUnion>;
}

function _getDataConnections(context: KustoManagementContext) {
  return {
    checkNameAvailability: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      dataConnectionName: DataConnectionCheckNameRequest,
      options?: DataConnectionsCheckNameAvailabilityOptionalParams,
    ) =>
      checkNameAvailability(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        dataConnectionName,
        options,
      ),
    dataConnectionValidation: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: DataConnectionValidation,
      options?: DataConnectionsDataConnectionValidationOptionalParams,
    ) =>
      dataConnectionValidation(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        parameters,
        options,
      ),
    beginDataConnectionValidation: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: DataConnectionValidation,
      options?: DataConnectionsDataConnectionValidationOptionalParams,
    ) => {
      const poller = dataConnectionValidation(
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
    beginDataConnectionValidationAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      parameters: DataConnectionValidation,
      options?: DataConnectionsDataConnectionValidationOptionalParams,
    ) => {
      return await dataConnectionValidation(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        parameters,
        options,
      );
    },
    listByDatabase: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: DataConnectionsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, clusterName, databaseName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      dataConnectionName: string,
      options?: DataConnectionsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, clusterName, databaseName, dataConnectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      dataConnectionName: string,
      options?: DataConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        dataConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      dataConnectionName: string,
      options?: DataConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        dataConnectionName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      dataConnectionName: string,
      parameters: DataConnectionUnion,
      options?: DataConnectionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        dataConnectionName,
        parameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      dataConnectionName: string,
      parameters: DataConnectionUnion,
      options?: DataConnectionsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        dataConnectionName,
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
      dataConnectionName: string,
      parameters: DataConnectionUnion,
      options?: DataConnectionsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        dataConnectionName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      dataConnectionName: string,
      parameters: DataConnectionUnion,
      options?: DataConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        dataConnectionName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      dataConnectionName: string,
      parameters: DataConnectionUnion,
      options?: DataConnectionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        dataConnectionName,
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
      dataConnectionName: string,
      parameters: DataConnectionUnion,
      options?: DataConnectionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        dataConnectionName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      dataConnectionName: string,
      options?: DataConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, databaseName, dataConnectionName, options),
  };
}

export function _getDataConnectionsOperations(
  context: KustoManagementContext,
): DataConnectionsOperations {
  return {
    ..._getDataConnections(context),
  };
}
