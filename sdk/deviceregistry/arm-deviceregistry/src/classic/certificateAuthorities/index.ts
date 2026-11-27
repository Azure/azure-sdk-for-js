// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  revokeAndRotate,
  activate,
  listByNamespace,
  update,
  $delete,
  createOrReplace,
  get,
} from "../../api/certificateAuthorities/operations.js";
import type {
  CertificateAuthoritiesRevokeAndRotateOptionalParams,
  CertificateAuthoritiesActivateOptionalParams,
  CertificateAuthoritiesListByNamespaceOptionalParams,
  CertificateAuthoritiesUpdateOptionalParams,
  CertificateAuthoritiesDeleteOptionalParams,
  CertificateAuthoritiesCreateOrReplaceOptionalParams,
  CertificateAuthoritiesGetOptionalParams,
} from "../../api/certificateAuthorities/options.js";
import type {
  CertificateAuthority,
  CertificateAuthorityUpdate,
  ActivateCertificateAuthorityRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CertificateAuthorities operations. */
export interface CertificateAuthoritiesOperations {
  /** Revokes a Certificate Authority of type `ICA` and issuer type `Microsoft`. If the Certificate Authority is an invalid type, the API responds with HTTP 400. */
  revokeAndRotate: (
    resourceGroupName: string,
    namespaceName: string,
    certificateAuthorityName: string,
    options?: CertificateAuthoritiesRevokeAndRotateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Activates a Certificate Authority of type `ICA` and issuer type `External`. If the Certificate Authority is an invalid type, the API responds with HTTP 400. */
  activate: (
    resourceGroupName: string,
    namespaceName: string,
    certificateAuthorityName: string,
    body: ActivateCertificateAuthorityRequest,
    options?: CertificateAuthoritiesActivateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List CertificateAuthority resources by Namespace */
  listByNamespace: (
    resourceGroupName: string,
    namespaceName: string,
    options?: CertificateAuthoritiesListByNamespaceOptionalParams,
  ) => PagedAsyncIterableIterator<CertificateAuthority>;
  /** Update a CertificateAuthority */
  update: (
    resourceGroupName: string,
    namespaceName: string,
    certificateAuthorityName: string,
    properties: CertificateAuthorityUpdate,
    options?: CertificateAuthoritiesUpdateOptionalParams,
  ) => PollerLike<OperationState<CertificateAuthority>, CertificateAuthority>;
  /** Delete a CertificateAuthority */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    certificateAuthorityName: string,
    options?: CertificateAuthoritiesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a CertificateAuthority */
  createOrReplace: (
    resourceGroupName: string,
    namespaceName: string,
    certificateAuthorityName: string,
    resource: CertificateAuthority,
    options?: CertificateAuthoritiesCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<CertificateAuthority>, CertificateAuthority>;
  /** Get a CertificateAuthority */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    certificateAuthorityName: string,
    options?: CertificateAuthoritiesGetOptionalParams,
  ) => Promise<CertificateAuthority>;
}

function _getCertificateAuthorities(context: DeviceRegistryManagementContext) {
  return {
    revokeAndRotate: (
      resourceGroupName: string,
      namespaceName: string,
      certificateAuthorityName: string,
      options?: CertificateAuthoritiesRevokeAndRotateOptionalParams,
    ) =>
      revokeAndRotate(context, resourceGroupName, namespaceName, certificateAuthorityName, options),
    activate: (
      resourceGroupName: string,
      namespaceName: string,
      certificateAuthorityName: string,
      body: ActivateCertificateAuthorityRequest,
      options?: CertificateAuthoritiesActivateOptionalParams,
    ) =>
      activate(context, resourceGroupName, namespaceName, certificateAuthorityName, body, options),
    listByNamespace: (
      resourceGroupName: string,
      namespaceName: string,
      options?: CertificateAuthoritiesListByNamespaceOptionalParams,
    ) => listByNamespace(context, resourceGroupName, namespaceName, options),
    update: (
      resourceGroupName: string,
      namespaceName: string,
      certificateAuthorityName: string,
      properties: CertificateAuthorityUpdate,
      options?: CertificateAuthoritiesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        namespaceName,
        certificateAuthorityName,
        properties,
        options,
      ),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      certificateAuthorityName: string,
      options?: CertificateAuthoritiesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, certificateAuthorityName, options),
    createOrReplace: (
      resourceGroupName: string,
      namespaceName: string,
      certificateAuthorityName: string,
      resource: CertificateAuthority,
      options?: CertificateAuthoritiesCreateOrReplaceOptionalParams,
    ) =>
      createOrReplace(
        context,
        resourceGroupName,
        namespaceName,
        certificateAuthorityName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      certificateAuthorityName: string,
      options?: CertificateAuthoritiesGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, certificateAuthorityName, options),
  };
}

export function _getCertificateAuthoritiesOperations(
  context: DeviceRegistryManagementContext,
): CertificateAuthoritiesOperations {
  return {
    ..._getCertificateAuthorities(context),
  };
}
