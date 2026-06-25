// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/schemaReferences/operations.js";
import {
  SchemaReferencesListByResourceGroupOptionalParams,
  SchemaReferencesDeleteOptionalParams,
  SchemaReferencesUpdateOptionalParams,
  SchemaReferencesCreateOrUpdateOptionalParams,
  SchemaReferencesGetOptionalParams,
} from "../../api/schemaReferences/options.js";
import { SchemaReference } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SchemaReferences operations. */
export interface SchemaReferencesOperations {
  /** List by specified resource group */
  listByResourceGroup: (
    resourceUri: string,
    options?: SchemaReferencesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SchemaReference>;
  /** Delete a Schema Reference Resource */
  delete: (
    resourceUri: string,
    schemaReferenceName: string,
    options?: SchemaReferencesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** update a Schema Reference Resource */
  update: (
    resourceUri: string,
    schemaReferenceName: string,
    properties: SchemaReference,
    options?: SchemaReferencesUpdateOptionalParams,
  ) => Promise<SchemaReference>;
  /** Create or update a Schema Reference Resource */
  createOrUpdate: (
    resourceUri: string,
    schemaReferenceName: string,
    resource: SchemaReference,
    options?: SchemaReferencesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SchemaReference>, SchemaReference>;
  /** Get a Schema Reference Resource */
  get: (
    resourceUri: string,
    schemaReferenceName: string,
    options?: SchemaReferencesGetOptionalParams,
  ) => Promise<SchemaReference>;
}

function _getSchemaReferences(context: WorkloadOrchestrationManagementContext) {
  return {
    listByResourceGroup: (
      resourceUri: string,
      options?: SchemaReferencesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceUri, options),
    delete: (
      resourceUri: string,
      schemaReferenceName: string,
      options?: SchemaReferencesDeleteOptionalParams,
    ) => $delete(context, resourceUri, schemaReferenceName, options),
    update: (
      resourceUri: string,
      schemaReferenceName: string,
      properties: SchemaReference,
      options?: SchemaReferencesUpdateOptionalParams,
    ) => update(context, resourceUri, schemaReferenceName, properties, options),
    createOrUpdate: (
      resourceUri: string,
      schemaReferenceName: string,
      resource: SchemaReference,
      options?: SchemaReferencesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceUri, schemaReferenceName, resource, options),
    get: (
      resourceUri: string,
      schemaReferenceName: string,
      options?: SchemaReferencesGetOptionalParams,
    ) => get(context, resourceUri, schemaReferenceName, options),
  };
}

export function _getSchemaReferencesOperations(
  context: WorkloadOrchestrationManagementContext,
): SchemaReferencesOperations {
  return {
    ..._getSchemaReferences(context),
  };
}
