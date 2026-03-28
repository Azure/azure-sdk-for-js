// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  refreshSecret,
  listByWorkspace,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/workspaceCertificate/operations.js";
import type {
  WorkspaceCertificateRefreshSecretOptionalParams,
  WorkspaceCertificateListByWorkspaceOptionalParams,
  WorkspaceCertificateDeleteOptionalParams,
  WorkspaceCertificateCreateOrUpdateOptionalParams,
  WorkspaceCertificateGetEntityTagOptionalParams,
  WorkspaceCertificateGetOptionalParams,
} from "../../api/workspaceCertificate/options.js";
import type {
  CertificateContract,
  CertificateCreateOrUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceCertificate operations. */
export interface WorkspaceCertificateOperations {
  /** From KeyVault, Refresh the certificate being used for authentication with the backend. */
  refreshSecret: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    certificateId: string,
    options?: WorkspaceCertificateRefreshSecretOptionalParams,
  ) => Promise<CertificateContract>;
  /** Lists a collection of all certificates in the specified workspace. */
  listByWorkspace: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    options?: WorkspaceCertificateListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<CertificateContract>;
  /** Deletes specific certificate. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    certificateId: string,
    ifMatch: string,
    options?: WorkspaceCertificateDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the certificate being used for authentication with the backend. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    certificateId: string,
    parameters: CertificateCreateOrUpdateParameters,
    options?: WorkspaceCertificateCreateOrUpdateOptionalParams,
  ) => Promise<CertificateContract>;
  /** Gets the entity state (Etag) version of the certificate specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    certificateId: string,
    options?: WorkspaceCertificateGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the certificate specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    certificateId: string,
    options?: WorkspaceCertificateGetOptionalParams,
  ) => Promise<CertificateContract>;
}

function _getWorkspaceCertificate(context: ApiManagementContext) {
  return {
    refreshSecret: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      certificateId: string,
      options?: WorkspaceCertificateRefreshSecretOptionalParams,
    ) =>
      refreshSecret(context, resourceGroupName, serviceName, workspaceId, certificateId, options),
    listByWorkspace: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      options?: WorkspaceCertificateListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, serviceName, workspaceId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      certificateId: string,
      ifMatch: string,
      options?: WorkspaceCertificateDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        certificateId,
        ifMatch,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      certificateId: string,
      parameters: CertificateCreateOrUpdateParameters,
      options?: WorkspaceCertificateCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        certificateId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      certificateId: string,
      options?: WorkspaceCertificateGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, workspaceId, certificateId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      certificateId: string,
      options?: WorkspaceCertificateGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, certificateId, options),
  };
}

export function _getWorkspaceCertificateOperations(
  context: ApiManagementContext,
): WorkspaceCertificateOperations {
  return {
    ..._getWorkspaceCertificate(context),
  };
}
