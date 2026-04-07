// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  enableRecommendation,
  disableRecommendation,
  $delete,
  createOrUpdate,
  get,
  listByDatabase,
  listRecommendedByDatabase,
  update,
  listCurrentByDatabase,
} from "../../api/sensitivityLabels/operations.js";
import type {
  SensitivityLabelsEnableRecommendationOptionalParams,
  SensitivityLabelsDisableRecommendationOptionalParams,
  SensitivityLabelsDeleteOptionalParams,
  SensitivityLabelsCreateOrUpdateOptionalParams,
  SensitivityLabelsGetOptionalParams,
  SensitivityLabelsListByDatabaseOptionalParams,
  SensitivityLabelsListRecommendedByDatabaseOptionalParams,
  SensitivityLabelsUpdateOptionalParams,
  SensitivityLabelsListCurrentByDatabaseOptionalParams,
} from "../../api/sensitivityLabels/options.js";
import type {
  SensitivityLabel,
  SensitivityLabelUpdateList,
  SensitivityLabelSource,
  CurrentSensitivityLabelSource,
  RecommendedSensitivityLabelSource,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SensitivityLabels operations. */
export interface SensitivityLabelsOperations {
  /** Enables sensitivity recommendations on a given column (recommendations are enabled by default on all columns) */
  enableRecommendation: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    schemaName: string,
    tableName: string,
    columnName: string,
    sensitivityLabelSource: RecommendedSensitivityLabelSource,
    options?: SensitivityLabelsEnableRecommendationOptionalParams,
  ) => Promise<void>;
  /** Disables sensitivity recommendations on a given column */
  disableRecommendation: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    schemaName: string,
    tableName: string,
    columnName: string,
    sensitivityLabelSource: RecommendedSensitivityLabelSource,
    options?: SensitivityLabelsDisableRecommendationOptionalParams,
  ) => Promise<void>;
  /** Deletes the sensitivity label of a given column */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    schemaName: string,
    tableName: string,
    columnName: string,
    sensitivityLabelSource: CurrentSensitivityLabelSource,
    options?: SensitivityLabelsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the sensitivity label of a given column */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    schemaName: string,
    tableName: string,
    columnName: string,
    sensitivityLabelSource: CurrentSensitivityLabelSource,
    parameters: SensitivityLabel,
    options?: SensitivityLabelsCreateOrUpdateOptionalParams,
  ) => Promise<SensitivityLabel>;
  /** Gets the sensitivity label of a given column */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    schemaName: string,
    tableName: string,
    columnName: string,
    sensitivityLabelSource: SensitivityLabelSource,
    options?: SensitivityLabelsGetOptionalParams,
  ) => Promise<SensitivityLabel>;
  /** Gets the sensitivity labels of a given database */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: SensitivityLabelsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<SensitivityLabel>;
  /** Gets the sensitivity labels of a given database */
  listRecommendedByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: SensitivityLabelsListRecommendedByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<SensitivityLabel>;
  /** Update sensitivity labels of a given database using an operations batch. */
  update: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: SensitivityLabelUpdateList,
    options?: SensitivityLabelsUpdateOptionalParams,
  ) => Promise<void>;
  /** Gets the sensitivity labels of a given database */
  listCurrentByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: SensitivityLabelsListCurrentByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<SensitivityLabel>;
}

function _getSensitivityLabels(context: SqlContext) {
  return {
    enableRecommendation: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      schemaName: string,
      tableName: string,
      columnName: string,
      sensitivityLabelSource: RecommendedSensitivityLabelSource,
      options?: SensitivityLabelsEnableRecommendationOptionalParams,
    ) =>
      enableRecommendation(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        schemaName,
        tableName,
        columnName,
        sensitivityLabelSource,
        options,
      ),
    disableRecommendation: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      schemaName: string,
      tableName: string,
      columnName: string,
      sensitivityLabelSource: RecommendedSensitivityLabelSource,
      options?: SensitivityLabelsDisableRecommendationOptionalParams,
    ) =>
      disableRecommendation(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        schemaName,
        tableName,
        columnName,
        sensitivityLabelSource,
        options,
      ),
    delete: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      schemaName: string,
      tableName: string,
      columnName: string,
      sensitivityLabelSource: CurrentSensitivityLabelSource,
      options?: SensitivityLabelsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        schemaName,
        tableName,
        columnName,
        sensitivityLabelSource,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      schemaName: string,
      tableName: string,
      columnName: string,
      sensitivityLabelSource: CurrentSensitivityLabelSource,
      parameters: SensitivityLabel,
      options?: SensitivityLabelsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        schemaName,
        tableName,
        columnName,
        sensitivityLabelSource,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      schemaName: string,
      tableName: string,
      columnName: string,
      sensitivityLabelSource: SensitivityLabelSource,
      options?: SensitivityLabelsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        schemaName,
        tableName,
        columnName,
        sensitivityLabelSource,
        options,
      ),
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: SensitivityLabelsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
    listRecommendedByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: SensitivityLabelsListRecommendedByDatabaseOptionalParams,
    ) => listRecommendedByDatabase(context, resourceGroupName, serverName, databaseName, options),
    update: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: SensitivityLabelUpdateList,
      options?: SensitivityLabelsUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, databaseName, parameters, options),
    listCurrentByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: SensitivityLabelsListCurrentByDatabaseOptionalParams,
    ) => listCurrentByDatabase(context, resourceGroupName, serverName, databaseName, options),
  };
}

export function _getSensitivityLabelsOperations(context: SqlContext): SensitivityLabelsOperations {
  return {
    ..._getSensitivityLabels(context),
  };
}
