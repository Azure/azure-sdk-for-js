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
} from "../../api/workspaceDiagnostic/operations.js";
import type {
  WorkspaceDiagnosticListByWorkspaceOptionalParams,
  WorkspaceDiagnosticDeleteOptionalParams,
  WorkspaceDiagnosticUpdateOptionalParams,
  WorkspaceDiagnosticCreateOrUpdateOptionalParams,
  WorkspaceDiagnosticGetEntityTagOptionalParams,
  WorkspaceDiagnosticGetOptionalParams,
} from "../../api/workspaceDiagnostic/options.js";
import type { DiagnosticContract, DiagnosticUpdateContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceDiagnostic operations. */
export interface WorkspaceDiagnosticOperations {
  /** Lists all diagnostics in the specified workspace. */
  listByWorkspace: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    options?: WorkspaceDiagnosticListByWorkspaceOptionalParams,
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
    workspaceId: string,
    diagnosticId: string,
    ifMatch: string,
    options?: WorkspaceDiagnosticDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the Diagnostic specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    diagnosticId: string,
    ifMatch: string,
    parameters: DiagnosticUpdateContract,
    options?: WorkspaceDiagnosticUpdateOptionalParams,
  ) => Promise<DiagnosticContract>;
  /** Creates a new Diagnostic or updates an existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    diagnosticId: string,
    parameters: DiagnosticContract,
    options?: WorkspaceDiagnosticCreateOrUpdateOptionalParams,
  ) => Promise<DiagnosticContract>;
  /** Gets the entity state (Etag) version of the Diagnostic specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    diagnosticId: string,
    options?: WorkspaceDiagnosticGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the Diagnostic specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    diagnosticId: string,
    options?: WorkspaceDiagnosticGetOptionalParams,
  ) => Promise<DiagnosticContract>;
}

function _getWorkspaceDiagnostic(context: ApiManagementContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      options?: WorkspaceDiagnosticListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, serviceName, workspaceId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      diagnosticId: string,
      ifMatch: string,
      options?: WorkspaceDiagnosticDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, serviceName, workspaceId, diagnosticId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      diagnosticId: string,
      ifMatch: string,
      parameters: DiagnosticUpdateContract,
      options?: WorkspaceDiagnosticUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        diagnosticId,
        ifMatch,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      diagnosticId: string,
      parameters: DiagnosticContract,
      options?: WorkspaceDiagnosticCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        diagnosticId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      diagnosticId: string,
      options?: WorkspaceDiagnosticGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, workspaceId, diagnosticId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      diagnosticId: string,
      options?: WorkspaceDiagnosticGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, diagnosticId, options),
  };
}

export function _getWorkspaceDiagnosticOperations(
  context: ApiManagementContext,
): WorkspaceDiagnosticOperations {
  return {
    ..._getWorkspaceDiagnostic(context),
  };
}
