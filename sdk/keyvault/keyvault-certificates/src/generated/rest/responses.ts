// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import {
  PagedCertificateItemOutput,
  DeletedCertificateBundleOutput,
  ContactsOutput,
  PagedCertificateIssuerItemOutput,
  IssuerBundleOutput,
  CertificateOperationOutput,
  CertificateBundleOutput,
  CertificateListResultOutput,
  CertificatePolicyOutput,
  BackupCertificateResultOutput,
  PagedDeletedCertificateItemOutput,
} from "./outputModels";

/** The request has succeeded. */
export interface GetCertificates200Response extends HttpResponse {
  status: "200";
  body: PagedCertificateItemOutput;
}

export interface GetCertificatesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetCertificatesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetCertificatesDefaultHeaders;
}

/** The request has succeeded. */
export interface DeleteCertificate200Response extends HttpResponse {
  status: "200";
  body: DeletedCertificateBundleOutput;
}

export interface DeleteCertificateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteCertificateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteCertificateDefaultHeaders;
}

/** The request has succeeded. */
export interface SetCertificateContacts200Response extends HttpResponse {
  status: "200";
  body: ContactsOutput;
}

export interface SetCertificateContactsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface SetCertificateContactsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & SetCertificateContactsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetCertificateContacts200Response extends HttpResponse {
  status: "200";
  body: ContactsOutput;
}

export interface GetCertificateContactsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetCertificateContactsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetCertificateContactsDefaultHeaders;
}

/** The request has succeeded. */
export interface DeleteCertificateContacts200Response extends HttpResponse {
  status: "200";
  body: ContactsOutput;
}

export interface DeleteCertificateContactsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteCertificateContactsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteCertificateContactsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetCertificateIssuers200Response extends HttpResponse {
  status: "200";
  body: PagedCertificateIssuerItemOutput;
}

export interface GetCertificateIssuersDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetCertificateIssuersDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetCertificateIssuersDefaultHeaders;
}

/** The request has succeeded. */
export interface SetCertificateIssuer200Response extends HttpResponse {
  status: "200";
  body: IssuerBundleOutput;
}

export interface SetCertificateIssuerDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface SetCertificateIssuerDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & SetCertificateIssuerDefaultHeaders;
}

/** The request has succeeded. */
export interface UpdateCertificateIssuer200Response extends HttpResponse {
  status: "200";
  body: IssuerBundleOutput;
}

export interface UpdateCertificateIssuerDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdateCertificateIssuerDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & UpdateCertificateIssuerDefaultHeaders;
}

/** The request has succeeded. */
export interface GetCertificateIssuer200Response extends HttpResponse {
  status: "200";
  body: IssuerBundleOutput;
}

export interface GetCertificateIssuerDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetCertificateIssuerDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetCertificateIssuerDefaultHeaders;
}

/** The request has succeeded. */
export interface DeleteCertificateIssuer200Response extends HttpResponse {
  status: "200";
  body: IssuerBundleOutput;
}

export interface DeleteCertificateIssuerDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteCertificateIssuerDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteCertificateIssuerDefaultHeaders;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface CreateCertificate202Response extends HttpResponse {
  status: "202";
  body: CertificateOperationOutput;
}

export interface CreateCertificateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateCertificateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateCertificateDefaultHeaders;
}

/** The request has succeeded. */
export interface ImportCertificate200Response extends HttpResponse {
  status: "200";
  body: CertificateBundleOutput;
}

export interface ImportCertificateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ImportCertificateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ImportCertificateDefaultHeaders;
}

/** The request has succeeded. */
export interface GetCertificateVersions200Response extends HttpResponse {
  status: "200";
  body: CertificateListResultOutput;
}

export interface GetCertificateVersionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetCertificateVersionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetCertificateVersionsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetCertificatePolicy200Response extends HttpResponse {
  status: "200";
  body: CertificatePolicyOutput;
}

export interface GetCertificatePolicyDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetCertificatePolicyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetCertificatePolicyDefaultHeaders;
}

/** The request has succeeded. */
export interface UpdateCertificatePolicy200Response extends HttpResponse {
  status: "200";
  body: CertificatePolicyOutput;
}

export interface UpdateCertificatePolicyDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdateCertificatePolicyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & UpdateCertificatePolicyDefaultHeaders;
}

/** The request has succeeded. */
export interface UpdateCertificate200Response extends HttpResponse {
  status: "200";
  body: CertificateBundleOutput;
}

export interface UpdateCertificateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdateCertificateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & UpdateCertificateDefaultHeaders;
}

/** The request has succeeded. */
export interface GetCertificate200Response extends HttpResponse {
  status: "200";
  body: CertificateBundleOutput;
}

export interface GetCertificateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetCertificateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetCertificateDefaultHeaders;
}

/** The request has succeeded. */
export interface UpdateCertificateOperation200Response extends HttpResponse {
  status: "200";
  body: CertificateOperationOutput;
}

export interface UpdateCertificateOperationDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdateCertificateOperationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & UpdateCertificateOperationDefaultHeaders;
}

/** The request has succeeded. */
export interface GetCertificateOperation200Response extends HttpResponse {
  status: "200";
  body: CertificateOperationOutput;
}

export interface GetCertificateOperationDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetCertificateOperationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetCertificateOperationDefaultHeaders;
}

/** The request has succeeded. */
export interface DeleteCertificateOperation200Response extends HttpResponse {
  status: "200";
  body: CertificateOperationOutput;
}

export interface DeleteCertificateOperationDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteCertificateOperationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteCertificateOperationDefaultHeaders;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface MergeCertificate201Response extends HttpResponse {
  status: "201";
  body: CertificateBundleOutput;
}

export interface MergeCertificateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface MergeCertificateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & MergeCertificateDefaultHeaders;
}

/** The request has succeeded. */
export interface BackupCertificate200Response extends HttpResponse {
  status: "200";
  body: BackupCertificateResultOutput;
}

export interface BackupCertificateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface BackupCertificateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & BackupCertificateDefaultHeaders;
}

/** The request has succeeded. */
export interface RestoreCertificate200Response extends HttpResponse {
  status: "200";
  body: CertificateBundleOutput;
}

export interface RestoreCertificateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface RestoreCertificateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & RestoreCertificateDefaultHeaders;
}

/** The request has succeeded. */
export interface GetDeletedCertificates200Response extends HttpResponse {
  status: "200";
  body: PagedDeletedCertificateItemOutput;
}

export interface GetDeletedCertificatesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetDeletedCertificatesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetDeletedCertificatesDefaultHeaders;
}

/** The request has succeeded. */
export interface GetDeletedCertificate200Response extends HttpResponse {
  status: "200";
  body: DeletedCertificateBundleOutput;
}

export interface GetDeletedCertificateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetDeletedCertificateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetDeletedCertificateDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface PurgeDeletedCertificate204Response extends HttpResponse {
  status: "204";
}

export interface PurgeDeletedCertificateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PurgeDeletedCertificateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PurgeDeletedCertificateDefaultHeaders;
}

/** The request has succeeded. */
export interface RecoverDeletedCertificate200Response extends HttpResponse {
  status: "200";
  body: CertificateBundleOutput;
}

export interface RecoverDeletedCertificateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface RecoverDeletedCertificateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & RecoverDeletedCertificateDefaultHeaders;
}
