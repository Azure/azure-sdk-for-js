// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/globalSchema/operations.js";
import type {
  GlobalSchemaListByServiceOptionalParams,
  GlobalSchemaDeleteOptionalParams,
  GlobalSchemaCreateOrUpdateOptionalParams,
  GlobalSchemaGetEntityTagOptionalParams,
  GlobalSchemaGetOptionalParams,
} from "../../api/globalSchema/options.js";
import type { GlobalSchemaContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GlobalSchema operations. */
export interface GlobalSchemaOperations {
  /** Lists a collection of schemas registered with service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: GlobalSchemaListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<GlobalSchemaContract>;
  /** Deletes specific Schema. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    schemaId: string,
    ifMatch: string,
    options?: GlobalSchemaDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates new or updates existing specified Schema of the API Management service instance. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    schemaId: string,
    parameters: GlobalSchemaContract,
    options?: GlobalSchemaCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<GlobalSchemaContract>, GlobalSchemaContract>;
  /** Gets the entity state (Etag) version of the Schema specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    schemaId: string,
    options?: GlobalSchemaGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the Schema specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    schemaId: string,
    options?: GlobalSchemaGetOptionalParams,
  ) => Promise<GlobalSchemaContract>;
}

function _getGlobalSchema(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: GlobalSchemaListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      schemaId: string,
      ifMatch: string,
      options?: GlobalSchemaDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, schemaId, ifMatch, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      schemaId: string,
      parameters: GlobalSchemaContract,
      options?: GlobalSchemaCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, schemaId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      schemaId: string,
      options?: GlobalSchemaGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, schemaId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      schemaId: string,
      options?: GlobalSchemaGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, schemaId, options),
  };
}

export function _getGlobalSchemaOperations(context: ApiManagementContext): GlobalSchemaOperations {
  return {
    ..._getGlobalSchema(context),
  };
}
