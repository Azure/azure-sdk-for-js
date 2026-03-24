// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByService, $delete, createOrUpdate, get } from "../../api/contentType/operations.js";
import type {
  ContentTypeListByServiceOptionalParams,
  ContentTypeDeleteOptionalParams,
  ContentTypeCreateOrUpdateOptionalParams,
  ContentTypeGetOptionalParams,
} from "../../api/contentType/options.js";
import type { ContentTypeContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ContentType operations. */
export interface ContentTypeOperations {
  /** Lists the developer portal's content types. Content types describe content items' properties, validation rules, and constraints. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: ContentTypeListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<ContentTypeContract>;
  /** Removes the specified developer portal's content type. Content types describe content items' properties, validation rules, and constraints. Built-in content types (with identifiers starting with the `c-` prefix) can't be removed. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    contentTypeId: string,
    ifMatch: string,
    options?: ContentTypeDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the developer portal's content type. Content types describe content items' properties, validation rules, and constraints. Custom content types' identifiers need to start with the `c-` prefix. Built-in content types can't be modified. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    contentTypeId: string,
    parameters: ContentTypeContract,
    options?: ContentTypeCreateOrUpdateOptionalParams,
  ) => Promise<ContentTypeContract>;
  /** Gets the details of the developer portal's content type. Content types describe content items' properties, validation rules, and constraints. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    contentTypeId: string,
    options?: ContentTypeGetOptionalParams,
  ) => Promise<ContentTypeContract>;
}

function _getContentType(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: ContentTypeListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      contentTypeId: string,
      ifMatch: string,
      options?: ContentTypeDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, contentTypeId, ifMatch, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      contentTypeId: string,
      parameters: ContentTypeContract,
      options?: ContentTypeCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, serviceName, contentTypeId, parameters, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      contentTypeId: string,
      options?: ContentTypeGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, contentTypeId, options),
  };
}

export function _getContentTypeOperations(context: ApiManagementContext): ContentTypeOperations {
  return {
    ..._getContentType(context),
  };
}
