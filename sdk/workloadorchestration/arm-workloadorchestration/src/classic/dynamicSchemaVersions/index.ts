// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  listByDynamicSchema,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/dynamicSchemaVersions/operations.js";
import {
  DynamicSchemaVersionsListByDynamicSchemaOptionalParams,
  DynamicSchemaVersionsDeleteOptionalParams,
  DynamicSchemaVersionsUpdateOptionalParams,
  DynamicSchemaVersionsCreateOrUpdateOptionalParams,
  DynamicSchemaVersionsGetOptionalParams,
} from "../../api/dynamicSchemaVersions/options.js";
import { DynamicSchemaVersion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DynamicSchemaVersions operations. */
export interface DynamicSchemaVersionsOperations {
  /** List by Dynamic Schema */
  listByDynamicSchema: (
    resourceGroupName: string,
    schemaName: string,
    dynamicSchemaName: string,
    options?: DynamicSchemaVersionsListByDynamicSchemaOptionalParams,
  ) => PagedAsyncIterableIterator<DynamicSchemaVersion>;
  /** Delete a Dynamic Schema Version Resource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    schemaName: string,
    dynamicSchemaName: string,
    dynamicSchemaVersionName: string,
    options?: DynamicSchemaVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** update a Dynamic Schema Version Resource */
  update: (
    resourceGroupName: string,
    schemaName: string,
    dynamicSchemaName: string,
    dynamicSchemaVersionName: string,
    properties: DynamicSchemaVersion,
    options?: DynamicSchemaVersionsUpdateOptionalParams,
  ) => Promise<DynamicSchemaVersion>;
  /** Create or update a Dynamic Schema Version Resource */
  createOrUpdate: (
    resourceGroupName: string,
    schemaName: string,
    dynamicSchemaName: string,
    dynamicSchemaVersionName: string,
    resource: DynamicSchemaVersion,
    options?: DynamicSchemaVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DynamicSchemaVersion>, DynamicSchemaVersion>;
  /** Get a Dynamic Schema Version Resource */
  get: (
    resourceGroupName: string,
    schemaName: string,
    dynamicSchemaName: string,
    dynamicSchemaVersionName: string,
    options?: DynamicSchemaVersionsGetOptionalParams,
  ) => Promise<DynamicSchemaVersion>;
}

function _getDynamicSchemaVersions(context: WorkloadOrchestrationManagementContext) {
  return {
    listByDynamicSchema: (
      resourceGroupName: string,
      schemaName: string,
      dynamicSchemaName: string,
      options?: DynamicSchemaVersionsListByDynamicSchemaOptionalParams,
    ) => listByDynamicSchema(context, resourceGroupName, schemaName, dynamicSchemaName, options),
    delete: (
      resourceGroupName: string,
      schemaName: string,
      dynamicSchemaName: string,
      dynamicSchemaVersionName: string,
      options?: DynamicSchemaVersionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        schemaName,
        dynamicSchemaName,
        dynamicSchemaVersionName,
        options,
      ),
    update: (
      resourceGroupName: string,
      schemaName: string,
      dynamicSchemaName: string,
      dynamicSchemaVersionName: string,
      properties: DynamicSchemaVersion,
      options?: DynamicSchemaVersionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        schemaName,
        dynamicSchemaName,
        dynamicSchemaVersionName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      schemaName: string,
      dynamicSchemaName: string,
      dynamicSchemaVersionName: string,
      resource: DynamicSchemaVersion,
      options?: DynamicSchemaVersionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        schemaName,
        dynamicSchemaName,
        dynamicSchemaVersionName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      schemaName: string,
      dynamicSchemaName: string,
      dynamicSchemaVersionName: string,
      options?: DynamicSchemaVersionsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        schemaName,
        dynamicSchemaName,
        dynamicSchemaVersionName,
        options,
      ),
  };
}

export function _getDynamicSchemaVersionsOperations(
  context: WorkloadOrchestrationManagementContext,
): DynamicSchemaVersionsOperations {
  return {
    ..._getDynamicSchemaVersions(context),
  };
}
