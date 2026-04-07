// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  listByDatabase,
  listRecommendedByDatabase,
  update,
  listCurrentByDatabase,
  enableRecommendation,
  disableRecommendation,
  $delete,
  createOrUpdate,
  get,
} from "../../api/managedDatabaseSensitivityLabels/operations.js";
import type {
  ManagedDatabaseSensitivityLabelsListByDatabaseOptionalParams,
  ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseOptionalParams,
  ManagedDatabaseSensitivityLabelsUpdateOptionalParams,
  ManagedDatabaseSensitivityLabelsListCurrentByDatabaseOptionalParams,
  ManagedDatabaseSensitivityLabelsEnableRecommendationOptionalParams,
  ManagedDatabaseSensitivityLabelsDisableRecommendationOptionalParams,
  ManagedDatabaseSensitivityLabelsDeleteOptionalParams,
  ManagedDatabaseSensitivityLabelsCreateOrUpdateOptionalParams,
  ManagedDatabaseSensitivityLabelsGetOptionalParams,
} from "../../api/managedDatabaseSensitivityLabels/options.js";
import type {
  SensitivityLabel,
  SensitivityLabelUpdateList,
  SensitivityLabelSource,
  CurrentSensitivityLabelSource,
  RecommendedSensitivityLabelSource,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedDatabaseSensitivityLabels operations. */
export interface ManagedDatabaseSensitivityLabelsOperations {
  /** Gets the sensitivity labels of a given database */
  listByDatabase: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabaseSensitivityLabelsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<SensitivityLabel>;
  /** Gets the sensitivity labels of a given database */
  listRecommendedByDatabase: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<SensitivityLabel>;
  /** Update sensitivity labels of a given database using an operations batch. */
  update: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    parameters: SensitivityLabelUpdateList,
    options?: ManagedDatabaseSensitivityLabelsUpdateOptionalParams,
  ) => Promise<void>;
  /** Gets the sensitivity labels of a given database */
  listCurrentByDatabase: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabaseSensitivityLabelsListCurrentByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<SensitivityLabel>;
  /** Enables sensitivity recommendations on a given column (recommendations are enabled by default on all columns) */
  enableRecommendation: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    schemaName: string,
    tableName: string,
    columnName: string,
    sensitivityLabelSource: RecommendedSensitivityLabelSource,
    options?: ManagedDatabaseSensitivityLabelsEnableRecommendationOptionalParams,
  ) => Promise<void>;
  /** Disables sensitivity recommendations on a given column */
  disableRecommendation: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    schemaName: string,
    tableName: string,
    columnName: string,
    sensitivityLabelSource: RecommendedSensitivityLabelSource,
    options?: ManagedDatabaseSensitivityLabelsDisableRecommendationOptionalParams,
  ) => Promise<void>;
  /** Deletes the sensitivity label of a given column */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    schemaName: string,
    tableName: string,
    columnName: string,
    sensitivityLabelSource: CurrentSensitivityLabelSource,
    options?: ManagedDatabaseSensitivityLabelsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the sensitivity label of a given column */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    schemaName: string,
    tableName: string,
    columnName: string,
    sensitivityLabelSource: CurrentSensitivityLabelSource,
    parameters: SensitivityLabel,
    options?: ManagedDatabaseSensitivityLabelsCreateOrUpdateOptionalParams,
  ) => Promise<SensitivityLabel>;
  /** Gets the sensitivity label of a given column */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    schemaName: string,
    tableName: string,
    columnName: string,
    sensitivityLabelSource: SensitivityLabelSource,
    options?: ManagedDatabaseSensitivityLabelsGetOptionalParams,
  ) => Promise<SensitivityLabel>;
}

function _getManagedDatabaseSensitivityLabels(context: SqlContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      options?: ManagedDatabaseSensitivityLabelsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, managedInstanceName, databaseName, options),
    listRecommendedByDatabase: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      options?: ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseOptionalParams,
    ) =>
      listRecommendedByDatabase(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        options,
      ),
    update: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      parameters: SensitivityLabelUpdateList,
      options?: ManagedDatabaseSensitivityLabelsUpdateOptionalParams,
    ) => update(context, resourceGroupName, managedInstanceName, databaseName, parameters, options),
    listCurrentByDatabase: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      options?: ManagedDatabaseSensitivityLabelsListCurrentByDatabaseOptionalParams,
    ) =>
      listCurrentByDatabase(context, resourceGroupName, managedInstanceName, databaseName, options),
    enableRecommendation: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      schemaName: string,
      tableName: string,
      columnName: string,
      sensitivityLabelSource: RecommendedSensitivityLabelSource,
      options?: ManagedDatabaseSensitivityLabelsEnableRecommendationOptionalParams,
    ) =>
      enableRecommendation(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        schemaName,
        tableName,
        columnName,
        sensitivityLabelSource,
        options,
      ),
    disableRecommendation: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      schemaName: string,
      tableName: string,
      columnName: string,
      sensitivityLabelSource: RecommendedSensitivityLabelSource,
      options?: ManagedDatabaseSensitivityLabelsDisableRecommendationOptionalParams,
    ) =>
      disableRecommendation(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        schemaName,
        tableName,
        columnName,
        sensitivityLabelSource,
        options,
      ),
    delete: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      schemaName: string,
      tableName: string,
      columnName: string,
      sensitivityLabelSource: CurrentSensitivityLabelSource,
      options?: ManagedDatabaseSensitivityLabelsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        schemaName,
        tableName,
        columnName,
        sensitivityLabelSource,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      schemaName: string,
      tableName: string,
      columnName: string,
      sensitivityLabelSource: CurrentSensitivityLabelSource,
      parameters: SensitivityLabel,
      options?: ManagedDatabaseSensitivityLabelsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
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
      managedInstanceName: string,
      databaseName: string,
      schemaName: string,
      tableName: string,
      columnName: string,
      sensitivityLabelSource: SensitivityLabelSource,
      options?: ManagedDatabaseSensitivityLabelsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        schemaName,
        tableName,
        columnName,
        sensitivityLabelSource,
        options,
      ),
  };
}

export function _getManagedDatabaseSensitivityLabelsOperations(
  context: SqlContext,
): ManagedDatabaseSensitivityLabelsOperations {
  return {
    ..._getManagedDatabaseSensitivityLabels(context),
  };
}
