// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/documentation/operations.js";
import type {
  DocumentationListByServiceOptionalParams,
  DocumentationDeleteOptionalParams,
  DocumentationUpdateOptionalParams,
  DocumentationCreateOrUpdateOptionalParams,
  DocumentationGetEntityTagOptionalParams,
  DocumentationGetOptionalParams,
} from "../../api/documentation/options.js";
import type { DocumentationContract, DocumentationUpdateContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Documentation operations. */
export interface DocumentationOperations {
  /** Lists all Documentations of the API Management service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: DocumentationListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<DocumentationContract>;
  /** Deletes the specified Documentation from an API. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    documentationId: string,
    ifMatch: string,
    options?: DocumentationDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the Documentation for an API specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    documentationId: string,
    ifMatch: string,
    parameters: DocumentationUpdateContract,
    options?: DocumentationUpdateOptionalParams,
  ) => Promise<DocumentationContract>;
  /** Creates a new Documentation or updates an existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    documentationId: string,
    parameters: DocumentationContract,
    options?: DocumentationCreateOrUpdateOptionalParams,
  ) => Promise<DocumentationContract>;
  /** Gets the entity state (Etag) version of the Documentation by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    documentationId: string,
    options?: DocumentationGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the Documentation specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    documentationId: string,
    options?: DocumentationGetOptionalParams,
  ) => Promise<DocumentationContract>;
}

function _getDocumentation(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: DocumentationListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      documentationId: string,
      ifMatch: string,
      options?: DocumentationDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, documentationId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      documentationId: string,
      ifMatch: string,
      parameters: DocumentationUpdateContract,
      options?: DocumentationUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        documentationId,
        ifMatch,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      documentationId: string,
      parameters: DocumentationContract,
      options?: DocumentationCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, serviceName, documentationId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      documentationId: string,
      options?: DocumentationGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, documentationId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      documentationId: string,
      options?: DocumentationGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, documentationId, options),
  };
}

export function _getDocumentationOperations(
  context: ApiManagementContext,
): DocumentationOperations {
  return {
    ..._getDocumentation(context),
  };
}
