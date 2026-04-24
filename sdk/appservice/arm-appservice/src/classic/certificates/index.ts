// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/certificates/operations.js";
import type {
  CertificatesListOptionalParams,
  CertificatesListByResourceGroupOptionalParams,
  CertificatesDeleteOptionalParams,
  CertificatesUpdateOptionalParams,
  CertificatesCreateOrUpdateOptionalParams,
  CertificatesGetOptionalParams,
} from "../../api/certificates/options.js";
import type { Certificate, CertificatePatchResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Certificates operations. */
export interface CertificatesOperations {
  /** Description for Get all certificates for a subscription. */
  list: (options?: CertificatesListOptionalParams) => PagedAsyncIterableIterator<Certificate>;
  /** Description for Get all certificates in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: CertificatesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Certificate>;
  /** Description for Delete a certificate. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    name: string,
    options?: CertificatesDeleteOptionalParams,
  ) => Promise<void>;
  /** Description for Create or update a certificate. */
  update: (
    resourceGroupName: string,
    name: string,
    certificateEnvelope: CertificatePatchResource,
    options?: CertificatesUpdateOptionalParams,
  ) => Promise<Certificate>;
  /** Description for Create or update a certificate. */
  createOrUpdate: (
    resourceGroupName: string,
    name: string,
    certificateEnvelope: Certificate,
    options?: CertificatesCreateOrUpdateOptionalParams,
  ) => Promise<Certificate>;
  /** Description for Get a certificate. */
  get: (
    resourceGroupName: string,
    name: string,
    options?: CertificatesGetOptionalParams,
  ) => Promise<Certificate>;
}

function _getCertificates(context: WebSiteManagementContext) {
  return {
    list: (options?: CertificatesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: CertificatesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, name: string, options?: CertificatesDeleteOptionalParams) =>
      $delete(context, resourceGroupName, name, options),
    update: (
      resourceGroupName: string,
      name: string,
      certificateEnvelope: CertificatePatchResource,
      options?: CertificatesUpdateOptionalParams,
    ) => update(context, resourceGroupName, name, certificateEnvelope, options),
    createOrUpdate: (
      resourceGroupName: string,
      name: string,
      certificateEnvelope: Certificate,
      options?: CertificatesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, name, certificateEnvelope, options),
    get: (resourceGroupName: string, name: string, options?: CertificatesGetOptionalParams) =>
      get(context, resourceGroupName, name, options),
  };
}

export function _getCertificatesOperations(
  context: WebSiteManagementContext,
): CertificatesOperations {
  return {
    ..._getCertificates(context),
  };
}
