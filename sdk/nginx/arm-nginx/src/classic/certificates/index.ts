// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NginxManagementContext } from "../../api/nginxManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/certificates/operations.js";
import type {
  CertificatesListOptionalParams,
  CertificatesDeleteOptionalParams,
  CertificatesCreateOrUpdateOptionalParams,
  CertificatesGetOptionalParams,
} from "../../api/certificates/options.js";
import type { NginxCertificate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Certificates operations. */
export interface CertificatesOperations {
  /** List all certificates of given NGINX deployment */
  list: (
    resourceGroupName: string,
    deploymentName: string,
    options?: CertificatesListOptionalParams,
  ) => PagedAsyncIterableIterator<NginxCertificate>;
  /** Deletes a certificate from the NGINX deployment */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    deploymentName: string,
    certificateName: string,
    options?: CertificatesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update the NGINX certificates for given NGINX deployment */
  createOrUpdate: (
    resourceGroupName: string,
    deploymentName: string,
    certificateName: string,
    options?: CertificatesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NginxCertificate>, NginxCertificate>;
  /** Get a certificate of given NGINX deployment */
  get: (
    resourceGroupName: string,
    deploymentName: string,
    certificateName: string,
    options?: CertificatesGetOptionalParams,
  ) => Promise<NginxCertificate>;
}

function _getCertificates(context: NginxManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      deploymentName: string,
      options?: CertificatesListOptionalParams,
    ) => list(context, resourceGroupName, deploymentName, options),
    delete: (
      resourceGroupName: string,
      deploymentName: string,
      certificateName: string,
      options?: CertificatesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, deploymentName, certificateName, options),
    createOrUpdate: (
      resourceGroupName: string,
      deploymentName: string,
      certificateName: string,
      options?: CertificatesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, deploymentName, certificateName, options),
    get: (
      resourceGroupName: string,
      deploymentName: string,
      certificateName: string,
      options?: CertificatesGetOptionalParams,
    ) => get(context, resourceGroupName, deploymentName, certificateName, options),
  };
}

export function _getCertificatesOperations(
  context: NginxManagementContext,
): CertificatesOperations {
  return {
    ..._getCertificates(context),
  };
}
