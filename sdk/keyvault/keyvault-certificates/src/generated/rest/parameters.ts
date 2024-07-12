// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  Contacts,
  CertificateIssuerSetParameters,
  CertificateIssuerUpdateParameters,
  CertificateCreateParameters,
  CertificateImportParameters,
  CertificatePolicy,
  CertificateUpdateParameters,
  CertificateOperationUpdateParameter,
  CertificateMergeParameters,
  CertificateRestoreParameters,
} from "./models";

export interface GetCertificatesQueryParamProperties {
  /**
   * Maximum number of results to return in a page. If not specified the service
   * will return up to 25 results.
   */
  maxresults?: number;
  /** Specifies whether to include certificates which are not completely provisioned. */
  includePending?: boolean;
}

export interface GetCertificatesQueryParam {
  queryParameters?: GetCertificatesQueryParamProperties;
}

export type GetCertificatesParameters = GetCertificatesQueryParam & RequestParameters;
export type DeleteCertificateParameters = RequestParameters;

export interface SetCertificateContactsBodyParam {
  /** The contacts for the key vault certificate. */
  body: Contacts;
}

export type SetCertificateContactsParameters = SetCertificateContactsBodyParam & RequestParameters;
export type GetCertificateContactsParameters = RequestParameters;
export type DeleteCertificateContactsParameters = RequestParameters;

export interface GetCertificateIssuersQueryParamProperties {
  /**
   * Maximum number of results to return in a page. If not specified the service
   * will return up to 25 results.
   */
  maxresults?: number;
}

export interface GetCertificateIssuersQueryParam {
  queryParameters?: GetCertificateIssuersQueryParamProperties;
}

export type GetCertificateIssuersParameters = GetCertificateIssuersQueryParam & RequestParameters;

export interface SetCertificateIssuerBodyParam {
  /** Certificate issuer set parameter. */
  body: CertificateIssuerSetParameters;
}

export type SetCertificateIssuerParameters = SetCertificateIssuerBodyParam & RequestParameters;

export interface UpdateCertificateIssuerBodyParam {
  /** Certificate issuer update parameter. */
  body: CertificateIssuerUpdateParameters;
}

export type UpdateCertificateIssuerParameters = UpdateCertificateIssuerBodyParam &
  RequestParameters;
export type GetCertificateIssuerParameters = RequestParameters;
export type DeleteCertificateIssuerParameters = RequestParameters;

export interface CreateCertificateBodyParam {
  /** The parameters to create a certificate. */
  body: CertificateCreateParameters;
}

export type CreateCertificateParameters = CreateCertificateBodyParam & RequestParameters;

export interface ImportCertificateBodyParam {
  /** The parameters to import the certificate. */
  body: CertificateImportParameters;
}

export type ImportCertificateParameters = ImportCertificateBodyParam & RequestParameters;

export interface GetCertificateVersionsQueryParamProperties {
  /**
   * Maximum number of results to return in a page. If not specified the service
   * will return up to 25 results.
   */
  maxresults?: number;
}

export interface GetCertificateVersionsQueryParam {
  queryParameters?: GetCertificateVersionsQueryParamProperties;
}

export type GetCertificateVersionsParameters = GetCertificateVersionsQueryParam & RequestParameters;
export type GetCertificatePolicyParameters = RequestParameters;

export interface UpdateCertificatePolicyBodyParam {
  /** The policy for the certificate. */
  body: CertificatePolicy;
}

export type UpdateCertificatePolicyParameters = UpdateCertificatePolicyBodyParam &
  RequestParameters;

export interface UpdateCertificateBodyParam {
  /** The parameters for certificate update. */
  body: CertificateUpdateParameters;
}

export type UpdateCertificateParameters = UpdateCertificateBodyParam & RequestParameters;
export type GetCertificateParameters = RequestParameters;

export interface UpdateCertificateOperationBodyParam {
  /** The certificate operation response. */
  body: CertificateOperationUpdateParameter;
}

export type UpdateCertificateOperationParameters = UpdateCertificateOperationBodyParam &
  RequestParameters;
export type GetCertificateOperationParameters = RequestParameters;
export type DeleteCertificateOperationParameters = RequestParameters;

export interface MergeCertificateBodyParam {
  /** The parameters to merge certificate. */
  body: CertificateMergeParameters;
}

export type MergeCertificateParameters = MergeCertificateBodyParam & RequestParameters;
export type BackupCertificateParameters = RequestParameters;

export interface RestoreCertificateBodyParam {
  /** The parameters to restore the certificate. */
  body: CertificateRestoreParameters;
}

export type RestoreCertificateParameters = RestoreCertificateBodyParam & RequestParameters;

export interface GetDeletedCertificatesQueryParamProperties {
  /**
   * Maximum number of results to return in a page. If not specified the service
   * will return up to 25 results.
   */
  maxresults?: number;
  /** Specifies whether to include certificates which are not completely provisioned. */
  includePending?: boolean;
}

export interface GetDeletedCertificatesQueryParam {
  queryParameters?: GetDeletedCertificatesQueryParamProperties;
}

export type GetDeletedCertificatesParameters = GetDeletedCertificatesQueryParam & RequestParameters;
export type GetDeletedCertificateParameters = RequestParameters;
export type PurgeDeletedCertificateParameters = RequestParameters;
export type RecoverDeletedCertificateParameters = RequestParameters;
