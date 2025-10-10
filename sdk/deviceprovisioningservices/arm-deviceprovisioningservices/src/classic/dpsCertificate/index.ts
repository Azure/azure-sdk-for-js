// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IotDpsContext } from "../../api/iotDpsContext.js";
import {
  verifyCertificate,
  generateVerificationCode,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/dpsCertificate/operations.js";
import type {
  DpsCertificateVerifyCertificateOptionalParams,
  DpsCertificateGenerateVerificationCodeOptionalParams,
  DpsCertificateListOptionalParams,
  DpsCertificateDeleteOptionalParams,
  DpsCertificateCreateOrUpdateOptionalParams,
  DpsCertificateGetOptionalParams,
} from "../../api/dpsCertificate/options.js";
import type {
  CertificateResponse,
  VerificationCodeResponse,
  VerificationCodeRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DpsCertificate operations. */
export interface DpsCertificateOperations {
  /** Verifies the certificate's private key possession by providing the leaf cert issued by the verifying pre uploaded certificate. */
  verifyCertificate: (
    resourceGroupName: string,
    provisioningServiceName: string,
    certificateName: string,
    ifMatch: string,
    request: VerificationCodeRequest,
    options?: DpsCertificateVerifyCertificateOptionalParams,
  ) => Promise<CertificateResponse>;
  /** Generate verification code for Proof of Possession. */
  generateVerificationCode: (
    resourceGroupName: string,
    provisioningServiceName: string,
    certificateName: string,
    ifMatch: string,
    options?: DpsCertificateGenerateVerificationCodeOptionalParams,
  ) => Promise<VerificationCodeResponse>;
  /** Get all the certificates tied to the provisioning service. */
  list: (
    resourceGroupName: string,
    provisioningServiceName: string,
    options?: DpsCertificateListOptionalParams,
  ) => PagedAsyncIterableIterator<CertificateResponse>;
  /** Deletes the specified certificate associated with the Provisioning Service */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    provisioningServiceName: string,
    certificateName: string,
    ifMatch: string,
    options?: DpsCertificateDeleteOptionalParams,
  ) => Promise<void>;
  /** Add new certificate or update an existing certificate. */
  createOrUpdate: (
    resourceGroupName: string,
    provisioningServiceName: string,
    certificateName: string,
    certificateDescription: CertificateResponse,
    options?: DpsCertificateCreateOrUpdateOptionalParams,
  ) => Promise<CertificateResponse>;
  /** Get the certificate from the provisioning service. */
  get: (
    resourceGroupName: string,
    provisioningServiceName: string,
    certificateName: string,
    options?: DpsCertificateGetOptionalParams,
  ) => Promise<CertificateResponse>;
}

function _getDpsCertificate(context: IotDpsContext) {
  return {
    verifyCertificate: (
      resourceGroupName: string,
      provisioningServiceName: string,
      certificateName: string,
      ifMatch: string,
      request: VerificationCodeRequest,
      options?: DpsCertificateVerifyCertificateOptionalParams,
    ) =>
      verifyCertificate(
        context,
        resourceGroupName,
        provisioningServiceName,
        certificateName,
        ifMatch,
        request,
        options,
      ),
    generateVerificationCode: (
      resourceGroupName: string,
      provisioningServiceName: string,
      certificateName: string,
      ifMatch: string,
      options?: DpsCertificateGenerateVerificationCodeOptionalParams,
    ) =>
      generateVerificationCode(
        context,
        resourceGroupName,
        provisioningServiceName,
        certificateName,
        ifMatch,
        options,
      ),
    list: (
      resourceGroupName: string,
      provisioningServiceName: string,
      options?: DpsCertificateListOptionalParams,
    ) => list(context, resourceGroupName, provisioningServiceName, options),
    delete: (
      resourceGroupName: string,
      provisioningServiceName: string,
      certificateName: string,
      ifMatch: string,
      options?: DpsCertificateDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        provisioningServiceName,
        certificateName,
        ifMatch,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      provisioningServiceName: string,
      certificateName: string,
      certificateDescription: CertificateResponse,
      options?: DpsCertificateCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        provisioningServiceName,
        certificateName,
        certificateDescription,
        options,
      ),
    get: (
      resourceGroupName: string,
      provisioningServiceName: string,
      certificateName: string,
      options?: DpsCertificateGetOptionalParams,
    ) => get(context, resourceGroupName, provisioningServiceName, certificateName, options),
  };
}

export function _getDpsCertificateOperations(context: IotDpsContext): DpsCertificateOperations {
  return {
    ..._getDpsCertificate(context),
  };
}
