// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  listBySchema,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/dynamicSchemas/operations.js";
import {
  DynamicSchemasListBySchemaOptionalParams,
  DynamicSchemasDeleteOptionalParams,
  DynamicSchemasUpdateOptionalParams,
  DynamicSchemasCreateOrUpdateOptionalParams,
  DynamicSchemasGetOptionalParams,
} from "../../api/dynamicSchemas/options.js";
import { DynamicSchema } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DynamicSchemas operations. */
export interface DynamicSchemasOperations {
  /** List by Schema */
  listBySchema: (
    resourceGroupName: string,
    schemaName: string,
    options?: DynamicSchemasListBySchemaOptionalParams,
  ) => PagedAsyncIterableIterator<DynamicSchema>;
  /** Delete a DynamicSchema Resource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    schemaName: string,
    dynamicSchemaName: string,
    options?: DynamicSchemasDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** update a DynamicSchema Resource */
  update: (
    resourceGroupName: string,
    schemaName: string,
    dynamicSchemaName: string,
    properties: DynamicSchema,
    options?: DynamicSchemasUpdateOptionalParams,
  ) => Promise<DynamicSchema>;
  /** Create or update a DynamicSchema Resource */
  createOrUpdate: (
    resourceGroupName: string,
    schemaName: string,
    dynamicSchemaName: string,
    resource: DynamicSchema,
    options?: DynamicSchemasCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DynamicSchema>, DynamicSchema>;
  /** Get a DynamicSchema Resource */
  get: (
    resourceGroupName: string,
    schemaName: string,
    dynamicSchemaName: string,
    options?: DynamicSchemasGetOptionalParams,
  ) => Promise<DynamicSchema>;
}

function _getDynamicSchemas(context: WorkloadOrchestrationManagementContext) {
  return {
    listBySchema: (
      resourceGroupName: string,
      schemaName: string,
      options?: DynamicSchemasListBySchemaOptionalParams,
    ) => listBySchema(context, resourceGroupName, schemaName, options),
    delete: (
      resourceGroupName: string,
      schemaName: string,
      dynamicSchemaName: string,
      options?: DynamicSchemasDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, schemaName, dynamicSchemaName, options),
    update: (
      resourceGroupName: string,
      schemaName: string,
      dynamicSchemaName: string,
      properties: DynamicSchema,
      options?: DynamicSchemasUpdateOptionalParams,
    ) => update(context, resourceGroupName, schemaName, dynamicSchemaName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      schemaName: string,
      dynamicSchemaName: string,
      resource: DynamicSchema,
      options?: DynamicSchemasCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, schemaName, dynamicSchemaName, resource, options),
    get: (
      resourceGroupName: string,
      schemaName: string,
      dynamicSchemaName: string,
      options?: DynamicSchemasGetOptionalParams,
    ) => get(context, resourceGroupName, schemaName, dynamicSchemaName, options),
  };
}

export function _getDynamicSchemasOperations(
  context: WorkloadOrchestrationManagementContext,
): DynamicSchemasOperations {
  return {
    ..._getDynamicSchemas(context),
  };
}
