// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementContext } from "../../api/eventHubManagementContext.js";
import {
  listByNamespace,
  $delete,
  createOrUpdate,
  get,
} from "../../api/schemaRegistry/operations.js";
import {
  SchemaRegistryListByNamespaceOptionalParams,
  SchemaRegistryDeleteOptionalParams,
  SchemaRegistryCreateOrUpdateOptionalParams,
  SchemaRegistryGetOptionalParams,
} from "../../api/schemaRegistry/options.js";
import { SchemaGroup } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SchemaRegistry operations. */
export interface SchemaRegistryOperations {
  /** Gets all the Schema Groups in a Namespace. */
  listByNamespace: (
    resourceGroupName: string,
    namespaceName: string,
    options?: SchemaRegistryListByNamespaceOptionalParams,
  ) => PagedAsyncIterableIterator<SchemaGroup>;
  /** Deletes an EventHub schema group. */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    schemaGroupName: string,
    options?: SchemaRegistryDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or Updates an EventHub schema group. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    schemaGroupName: string,
    parameters: SchemaGroup,
    options?: SchemaRegistryCreateOrUpdateOptionalParams,
  ) => Promise<SchemaGroup>;
  /** Gets the details of an EventHub schema group. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    schemaGroupName: string,
    options?: SchemaRegistryGetOptionalParams,
  ) => Promise<SchemaGroup>;
}

function _getSchemaRegistry(context: EventHubManagementContext) {
  return {
    listByNamespace: (
      resourceGroupName: string,
      namespaceName: string,
      options?: SchemaRegistryListByNamespaceOptionalParams,
    ) => listByNamespace(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      schemaGroupName: string,
      options?: SchemaRegistryDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, schemaGroupName, options),
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      schemaGroupName: string,
      parameters: SchemaGroup,
      options?: SchemaRegistryCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        schemaGroupName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      schemaGroupName: string,
      options?: SchemaRegistryGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, schemaGroupName, options),
  };
}

export function _getSchemaRegistryOperations(
  context: EventHubManagementContext,
): SchemaRegistryOperations {
  return {
    ..._getSchemaRegistry(context),
  };
}
