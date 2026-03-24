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
} from "../../api/apiDiagnostic/operations.js";
import type {
  ApiDiagnosticListByServiceOptionalParams,
  ApiDiagnosticDeleteOptionalParams,
  ApiDiagnosticUpdateOptionalParams,
  ApiDiagnosticCreateOrUpdateOptionalParams,
  ApiDiagnosticGetEntityTagOptionalParams,
  ApiDiagnosticGetOptionalParams,
} from "../../api/apiDiagnostic/options.js";
import type { DiagnosticContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApiDiagnostic operations. */
export interface ApiDiagnosticOperations {
  /** Lists all diagnostics of an API. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: ApiDiagnosticListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<DiagnosticContract>;
  /** Deletes the specified Diagnostic from an API. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    diagnosticId: string,
    ifMatch: string,
    options?: ApiDiagnosticDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the Diagnostic for an API specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    diagnosticId: string,
    ifMatch: string,
    parameters: DiagnosticContract,
    options?: ApiDiagnosticUpdateOptionalParams,
  ) => Promise<DiagnosticContract>;
  /** Creates a new Diagnostic for an API or updates an existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    diagnosticId: string,
    parameters: DiagnosticContract,
    options?: ApiDiagnosticCreateOrUpdateOptionalParams,
  ) => Promise<DiagnosticContract>;
  /** Gets the entity state (Etag) version of the Diagnostic for an API specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    diagnosticId: string,
    options?: ApiDiagnosticGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the Diagnostic for an API specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    diagnosticId: string,
    options?: ApiDiagnosticGetOptionalParams,
  ) => Promise<DiagnosticContract>;
}

function _getApiDiagnostic(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: ApiDiagnosticListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, apiId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      diagnosticId: string,
      ifMatch: string,
      options?: ApiDiagnosticDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, apiId, diagnosticId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      diagnosticId: string,
      ifMatch: string,
      parameters: DiagnosticContract,
      options?: ApiDiagnosticUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        apiId,
        diagnosticId,
        ifMatch,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      diagnosticId: string,
      parameters: DiagnosticContract,
      options?: ApiDiagnosticCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        apiId,
        diagnosticId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      diagnosticId: string,
      options?: ApiDiagnosticGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, apiId, diagnosticId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      diagnosticId: string,
      options?: ApiDiagnosticGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, apiId, diagnosticId, options),
  };
}

export function _getApiDiagnosticOperations(
  context: ApiManagementContext,
): ApiDiagnosticOperations {
  return {
    ..._getApiDiagnostic(context),
  };
}
