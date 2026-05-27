// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CertificatesVerifyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CertificatesGenerateVerificationCodeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CertificatesListByIotHubOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CertificatesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CertificatesCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Certificate. Do not specify for creating a brand new certificate. Required to update an existing certificate. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface CertificatesGetOptionalParams extends OperationOptions {}
