// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByApi,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/apiSchema/operations.js";
import type {
  ApiSchemaListByApiOptionalParams,
  ApiSchemaDeleteOptionalParams,
  ApiSchemaCreateOrUpdateOptionalParams,
  ApiSchemaGetEntityTagOptionalParams,
  ApiSchemaGetOptionalParams,
} from "../../api/apiSchema/options.js";
import type { SchemaContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ApiSchema operations. */
export interface ApiSchemaOperations {
  /** Get the schema configuration at the API level. */
  listByApi: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: ApiSchemaListByApiOptionalParams,
  ) => PagedAsyncIterableIterator<SchemaContract>;
  /** Deletes the schema configuration at the Api. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    schemaId: string,
    ifMatch: string,
    options?: ApiSchemaDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates schema configuration for the API. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    schemaId: string,
    parameters: SchemaContract,
    options?: ApiSchemaCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SchemaContract>, SchemaContract>;
  /** Gets the entity state (Etag) version of the schema specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    schemaId: string,
    options?: ApiSchemaGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Get the schema configuration at the API level. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    schemaId: string,
    options?: ApiSchemaGetOptionalParams,
  ) => Promise<SchemaContract>;
}

function _getApiSchema(context: ApiManagementContext) {
  return {
    listByApi: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: ApiSchemaListByApiOptionalParams,
    ) => listByApi(context, resourceGroupName, serviceName, apiId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      schemaId: string,
      ifMatch: string,
      options?: ApiSchemaDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, apiId, schemaId, ifMatch, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      schemaId: string,
      parameters: SchemaContract,
      options?: ApiSchemaCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, serviceName, apiId, schemaId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      schemaId: string,
      options?: ApiSchemaGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, apiId, schemaId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      schemaId: string,
      options?: ApiSchemaGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, apiId, schemaId, options),
  };
}

export function _getApiSchemaOperations(context: ApiManagementContext): ApiSchemaOperations {
  return {
    ..._getApiSchema(context),
  };
}
