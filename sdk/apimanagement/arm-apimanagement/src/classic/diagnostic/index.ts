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
} from "../../api/diagnostic/operations.js";
import type {
  DiagnosticListByServiceOptionalParams,
  DiagnosticDeleteOptionalParams,
  DiagnosticUpdateOptionalParams,
  DiagnosticCreateOrUpdateOptionalParams,
  DiagnosticGetEntityTagOptionalParams,
  DiagnosticGetOptionalParams,
} from "../../api/diagnostic/options.js";
import type { DiagnosticContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Diagnostic operations. */
export interface DiagnosticOperations {
  /** Lists all diagnostics of the API Management service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: DiagnosticListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<DiagnosticContract>;
  /** Deletes the specified Diagnostic. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    diagnosticId: string,
    ifMatch: string,
    options?: DiagnosticDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the Diagnostic specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    diagnosticId: string,
    ifMatch: string,
    parameters: DiagnosticContract,
    options?: DiagnosticUpdateOptionalParams,
  ) => Promise<DiagnosticContract>;
  /** Creates a new Diagnostic or updates an existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    diagnosticId: string,
    parameters: DiagnosticContract,
    options?: DiagnosticCreateOrUpdateOptionalParams,
  ) => Promise<DiagnosticContract>;
  /** Gets the entity state (Etag) version of the Diagnostic specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    diagnosticId: string,
    options?: DiagnosticGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the Diagnostic specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    diagnosticId: string,
    options?: DiagnosticGetOptionalParams,
  ) => Promise<DiagnosticContract>;
}

function _getDiagnostic(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: DiagnosticListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      diagnosticId: string,
      ifMatch: string,
      options?: DiagnosticDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, diagnosticId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      diagnosticId: string,
      ifMatch: string,
      parameters: DiagnosticContract,
      options?: DiagnosticUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, serviceName, diagnosticId, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      diagnosticId: string,
      parameters: DiagnosticContract,
      options?: DiagnosticCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, diagnosticId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      diagnosticId: string,
      options?: DiagnosticGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, diagnosticId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      diagnosticId: string,
      options?: DiagnosticGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, diagnosticId, options),
  };
}

export function _getDiagnosticOperations(context: ApiManagementContext): DiagnosticOperations {
  return {
    ..._getDiagnostic(context),
  };
}
