// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubContext } from "../../api/iotHubContext.js";
import {
  verify,
  generateVerificationCode,
  listByIotHub,
  $delete,
  createOrUpdate,
  get,
} from "../../api/certificates/operations.js";
import {
  CertificatesVerifyOptionalParams,
  CertificatesGenerateVerificationCodeOptionalParams,
  CertificatesListByIotHubOptionalParams,
  CertificatesDeleteOptionalParams,
  CertificatesCreateOrUpdateOptionalParams,
  CertificatesGetOptionalParams,
} from "../../api/certificates/options.js";
import {
  CertificateDescription,
  CertificateListDescription,
  CertificateWithNonceDescription,
  CertificateVerificationDescription,
} from "../../models/models.js";

/** Interface representing a Certificates operations. */
export interface CertificatesOperations {
  /** Verifies the certificate's private key possession by providing the leaf cert issued by the verifying pre uploaded certificate. */
  verify: (
    resourceGroupName: string,
    resourceName: string,
    certificateName: string,
    ifMatch: string,
    certificateVerificationBody: CertificateVerificationDescription,
    options?: CertificatesVerifyOptionalParams,
  ) => Promise<CertificateDescription>;
  /** Generates verification code for proof of possession flow. The verification code will be used to generate a leaf certificate. */
  generateVerificationCode: (
    resourceGroupName: string,
    resourceName: string,
    certificateName: string,
    ifMatch: string,
    options?: CertificatesGenerateVerificationCodeOptionalParams,
  ) => Promise<CertificateWithNonceDescription>;
  /** Returns the list of certificates. */
  listByIotHub: (
    resourceGroupName: string,
    resourceName: string,
    options?: CertificatesListByIotHubOptionalParams,
  ) => Promise<CertificateListDescription>;
  /** Deletes an existing X509 certificate or does nothing if it does not exist. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    certificateName: string,
    ifMatch: string,
    options?: CertificatesDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds new or replaces existing certificate. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    certificateName: string,
    certificateDescription: CertificateDescription,
    options?: CertificatesCreateOrUpdateOptionalParams,
  ) => Promise<CertificateDescription>;
  /** Returns the certificate. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    certificateName: string,
    options?: CertificatesGetOptionalParams,
  ) => Promise<CertificateDescription>;
}

function _getCertificates(context: IotHubContext) {
  return {
    verify: (
      resourceGroupName: string,
      resourceName: string,
      certificateName: string,
      ifMatch: string,
      certificateVerificationBody: CertificateVerificationDescription,
      options?: CertificatesVerifyOptionalParams,
    ) =>
      verify(
        context,
        resourceGroupName,
        resourceName,
        certificateName,
        ifMatch,
        certificateVerificationBody,
        options,
      ),
    generateVerificationCode: (
      resourceGroupName: string,
      resourceName: string,
      certificateName: string,
      ifMatch: string,
      options?: CertificatesGenerateVerificationCodeOptionalParams,
    ) =>
      generateVerificationCode(
        context,
        resourceGroupName,
        resourceName,
        certificateName,
        ifMatch,
        options,
      ),
    listByIotHub: (
      resourceGroupName: string,
      resourceName: string,
      options?: CertificatesListByIotHubOptionalParams,
    ) => listByIotHub(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      certificateName: string,
      ifMatch: string,
      options?: CertificatesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, certificateName, ifMatch, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      certificateName: string,
      certificateDescription: CertificateDescription,
      options?: CertificatesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        certificateName,
        certificateDescription,
        options,
      ),
    get: (
      resourceGroupName: string,
      resourceName: string,
      certificateName: string,
      options?: CertificatesGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, certificateName, options),
  };
}

export function _getCertificatesOperations(context: IotHubContext): CertificatesOperations {
  return {
    ..._getCertificates(context),
  };
}
