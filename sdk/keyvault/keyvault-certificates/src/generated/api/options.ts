// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GetCertificatesOptionalParams extends OperationOptions {
  /** Maximum number of results to return in a page. If not specified the service will return up to 25 results. */
  maxresults?: number;
  /** Specifies whether to include certificates which are not completely provisioned. */
  includePending?: boolean;
}

/** Optional parameters. */
export interface DeleteCertificateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SetCertificateContactsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface GetCertificateContactsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface DeleteCertificateContactsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface GetCertificateIssuersOptionalParams extends OperationOptions {
  /** Maximum number of results to return in a page. If not specified the service will return up to 25 results. */
  maxresults?: number;
}

/** Optional parameters. */
export interface SetCertificateIssuerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UpdateCertificateIssuerOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface GetCertificateIssuerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeleteCertificateIssuerOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface CreateCertificateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ImportCertificateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetCertificateVersionsOptionalParams extends OperationOptions {
  /** Maximum number of results to return in a page. If not specified the service will return up to 25 results. */
  maxresults?: number;
}

/** Optional parameters. */
export interface GetCertificatePolicyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UpdateCertificatePolicyOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface UpdateCertificateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetCertificateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UpdateCertificateOperationOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface GetCertificateOperationOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface DeleteCertificateOperationOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface MergeCertificateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BackupCertificateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RestoreCertificateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetDeletedCertificatesOptionalParams extends OperationOptions {
  /** Maximum number of results to return in a page. If not specified the service will return up to 25 results. */
  maxresults?: number;
  /** Specifies whether to include certificates which are not completely provisioned. */
  includePending?: boolean;
}

/** Optional parameters. */
export interface GetDeletedCertificateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PurgeDeletedCertificateOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface RecoverDeletedCertificateOptionalParams
  extends OperationOptions {}
