// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { list, $delete, update, createOrUpdate, get } from "../../api/certificates/operations.js";
import {
  CertificatesListOptionalParams,
  CertificatesDeleteOptionalParams,
  CertificatesUpdateOptionalParams,
  CertificatesCreateOrUpdateOptionalParams,
  CertificatesGetOptionalParams,
} from "../../api/certificates/options.js";
import { Certificate, CertificatePatch } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Certificates operations. */
export interface CertificatesOperations {
  /** Get the Certificates in a given managed environment. */
  list: (
    resourceGroupName: string,
    environmentName: string,
    options?: CertificatesListOptionalParams,
  ) => PagedAsyncIterableIterator<Certificate>;
  /** Deletes the specified Certificate. */
  delete: (
    resourceGroupName: string,
    environmentName: string,
    certificateName: string,
    options?: CertificatesDeleteOptionalParams,
  ) => Promise<void>;
  /** Patches a certificate. Currently only patching of tags is supported */
  update: (
    resourceGroupName: string,
    environmentName: string,
    certificateName: string,
    certificateEnvelope: CertificatePatch,
    options?: CertificatesUpdateOptionalParams,
  ) => Promise<Certificate>;
  /** Create or Update a Certificate. */
  createOrUpdate: (
    resourceGroupName: string,
    environmentName: string,
    certificateName: string,
    options?: CertificatesCreateOrUpdateOptionalParams,
  ) => Promise<Certificate>;
  /** Get the specified Certificate. */
  get: (
    resourceGroupName: string,
    environmentName: string,
    certificateName: string,
    options?: CertificatesGetOptionalParams,
  ) => Promise<Certificate>;
}

function _getCertificates(context: ContainerAppsAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      environmentName: string,
      options?: CertificatesListOptionalParams,
    ) => list(context, resourceGroupName, environmentName, options),
    delete: (
      resourceGroupName: string,
      environmentName: string,
      certificateName: string,
      options?: CertificatesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, environmentName, certificateName, options),
    update: (
      resourceGroupName: string,
      environmentName: string,
      certificateName: string,
      certificateEnvelope: CertificatePatch,
      options?: CertificatesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        environmentName,
        certificateName,
        certificateEnvelope,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      environmentName: string,
      certificateName: string,
      options?: CertificatesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, environmentName, certificateName, options),
    get: (
      resourceGroupName: string,
      environmentName: string,
      certificateName: string,
      options?: CertificatesGetOptionalParams,
    ) => get(context, resourceGroupName, environmentName, certificateName, options),
  };
}

export function _getCertificatesOperations(
  context: ContainerAppsAPIContext,
): CertificatesOperations {
  return {
    ..._getCertificates(context),
  };
}
