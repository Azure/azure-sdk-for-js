// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByWorkspace,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/workspaceApiDiagnostic/operations.js";
import type {
  WorkspaceApiDiagnosticListByWorkspaceOptionalParams,
  WorkspaceApiDiagnosticDeleteOptionalParams,
  WorkspaceApiDiagnosticUpdateOptionalParams,
  WorkspaceApiDiagnosticCreateOrUpdateOptionalParams,
  WorkspaceApiDiagnosticGetEntityTagOptionalParams,
  WorkspaceApiDiagnosticGetOptionalParams,
} from "../../api/workspaceApiDiagnostic/options.js";
import type { DiagnosticContract, DiagnosticUpdateContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceApiDiagnostic operations. */
export interface WorkspaceApiDiagnosticOperations {
  /** Lists all diagnostics of an API. */
  listByWorkspace: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    options?: WorkspaceApiDiagnosticListByWorkspaceOptionalParams,
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
    workspaceId: string,
    apiId: string,
    diagnosticId: string,
    ifMatch: string,
    options?: WorkspaceApiDiagnosticDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the Diagnostic for an API specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    diagnosticId: string,
    ifMatch: string,
    parameters: DiagnosticUpdateContract,
    options?: WorkspaceApiDiagnosticUpdateOptionalParams,
  ) => Promise<DiagnosticContract>;
  /** Creates a new Diagnostic for an API or updates an existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    diagnosticId: string,
    parameters: DiagnosticContract,
    options?: WorkspaceApiDiagnosticCreateOrUpdateOptionalParams,
  ) => Promise<DiagnosticContract>;
  /** Gets the entity state (Etag) version of the Diagnostic for an API specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    diagnosticId: string,
    options?: WorkspaceApiDiagnosticGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the Diagnostic for an API specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    diagnosticId: string,
    options?: WorkspaceApiDiagnosticGetOptionalParams,
  ) => Promise<DiagnosticContract>;
}

function _getWorkspaceApiDiagnostic(context: ApiManagementContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      options?: WorkspaceApiDiagnosticListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, serviceName, workspaceId, apiId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      diagnosticId: string,
      ifMatch: string,
      options?: WorkspaceApiDiagnosticDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        diagnosticId,
        ifMatch,
        options,
      ),
    update: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      diagnosticId: string,
      ifMatch: string,
      parameters: DiagnosticUpdateContract,
      options?: WorkspaceApiDiagnosticUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        diagnosticId,
        ifMatch,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      diagnosticId: string,
      parameters: DiagnosticContract,
      options?: WorkspaceApiDiagnosticCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        diagnosticId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      diagnosticId: string,
      options?: WorkspaceApiDiagnosticGetEntityTagOptionalParams,
    ) =>
      getEntityTag(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        diagnosticId,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      diagnosticId: string,
      options?: WorkspaceApiDiagnosticGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, apiId, diagnosticId, options),
  };
}

export function _getWorkspaceApiDiagnosticOperations(
  context: ApiManagementContext,
): WorkspaceApiDiagnosticOperations {
  return {
    ..._getWorkspaceApiDiagnostic(context),
  };
}
