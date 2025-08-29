// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import { listByResourceGroup, get } from "../../api/schemaReferences/operations.js";
import {
  SchemaReferencesListByResourceGroupOptionalParams,
  SchemaReferencesGetOptionalParams,
} from "../../api/schemaReferences/options.js";
import { SchemaReference } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SchemaReferences operations. */
export interface SchemaReferencesOperations {
  /** List by specified resource group */
  listByResourceGroup: (
    resourceUri: string,
    options?: SchemaReferencesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SchemaReference>;
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
