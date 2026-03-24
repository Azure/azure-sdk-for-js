// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  refreshSecret,
  listByService,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/certificate/operations.js";
import type {
  CertificateRefreshSecretOptionalParams,
  CertificateListByServiceOptionalParams,
  CertificateDeleteOptionalParams,
  CertificateCreateOrUpdateOptionalParams,
  CertificateGetEntityTagOptionalParams,
  CertificateGetOptionalParams,
} from "../../api/certificate/options.js";
import type {
  CertificateContract,
  CertificateCreateOrUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Certificate operations. */
export interface CertificateOperations {
  /** From KeyVault, Refresh the certificate being used for authentication with the backend. */
  refreshSecret: (
    resourceGroupName: string,
    serviceName: string,
    certificateId: string,
    options?: CertificateRefreshSecretOptionalParams,
  ) => Promise<CertificateContract>;
  /** Lists a collection of all certificates in the specified service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: CertificateListByServiceOptionalParams,
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
    certificateId: string,
    ifMatch: string,
    options?: CertificateDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the certificate being used for authentication with the backend. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    certificateId: string,
    parameters: CertificateCreateOrUpdateParameters,
    options?: CertificateCreateOrUpdateOptionalParams,
  ) => Promise<CertificateContract>;
  /** Gets the entity state (Etag) version of the certificate specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    certificateId: string,
    options?: CertificateGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the certificate specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    certificateId: string,
    options?: CertificateGetOptionalParams,
  ) => Promise<CertificateContract>;
}

function _getCertificate(context: ApiManagementContext) {
  return {
    refreshSecret: (
      resourceGroupName: string,
      serviceName: string,
      certificateId: string,
      options?: CertificateRefreshSecretOptionalParams,
    ) => refreshSecret(context, resourceGroupName, serviceName, certificateId, options),
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: CertificateListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      certificateId: string,
      ifMatch: string,
      options?: CertificateDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, certificateId, ifMatch, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      certificateId: string,
      parameters: CertificateCreateOrUpdateParameters,
      options?: CertificateCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, serviceName, certificateId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      certificateId: string,
      options?: CertificateGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, certificateId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      certificateId: string,
      options?: CertificateGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, certificateId, options),
  };
}

export function _getCertificateOperations(context: ApiManagementContext): CertificateOperations {
  return {
    ..._getCertificate(context),
  };
}
