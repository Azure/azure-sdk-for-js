// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiCenterContext } from "../../api/apiCenterContext.js";
import { list, $delete, createOrUpdate, head, get } from "../../api/metadataSchemas/operations.js";
import type {
  MetadataSchemasListOptionalParams,
  MetadataSchemasDeleteOptionalParams,
  MetadataSchemasCreateOrUpdateOptionalParams,
  MetadataSchemasHeadOptionalParams,
  MetadataSchemasGetOptionalParams,
} from "../../api/metadataSchemas/options.js";
import type { MetadataSchema } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MetadataSchemas operations. */
export interface MetadataSchemasOperations {
  /** Returns a collection of metadata schemas. */
  list: (
    resourceGroupName: string,
    serviceName: string,
    options?: MetadataSchemasListOptionalParams,
  ) => PagedAsyncIterableIterator<MetadataSchema>;
  /** Deletes specified metadata schema. */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    metadataSchemaName: string,
    options?: MetadataSchemasDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates new or updates existing metadata schema. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    metadataSchemaName: string,
    payload: MetadataSchema,
    options?: MetadataSchemasCreateOrUpdateOptionalParams,
  ) => Promise<MetadataSchema>;
  /** Checks if specified metadata schema exists. */
  head: (
    resourceGroupName: string,
    serviceName: string,
    metadataSchemaName: string,
    options?: MetadataSchemasHeadOptionalParams,
  ) => Promise<void>;
  /** Returns details of the metadata schema. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    metadataSchemaName: string,
    options?: MetadataSchemasGetOptionalParams,
  ) => Promise<MetadataSchema>;
}

function _getMetadataSchemas(context: ApiCenterContext) {
  return {
    list: (
      resourceGroupName: string,
      serviceName: string,
      options?: MetadataSchemasListOptionalParams,
    ) => list(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      metadataSchemaName: string,
      options?: MetadataSchemasDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, metadataSchemaName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      metadataSchemaName: string,
      payload: MetadataSchema,
      options?: MetadataSchemasCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, serviceName, metadataSchemaName, payload, options),
    head: (
      resourceGroupName: string,
      serviceName: string,
      metadataSchemaName: string,
      options?: MetadataSchemasHeadOptionalParams,
    ) => head(context, resourceGroupName, serviceName, metadataSchemaName, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      metadataSchemaName: string,
      options?: MetadataSchemasGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, metadataSchemaName, options),
  };
}

export function _getMetadataSchemasOperations(
  context: ApiCenterContext,
): MetadataSchemasOperations {
  return {
    ..._getMetadataSchemas(context),
  };
}
