// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CertificateProfilesRevokeCertificateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CertificateProfilesListByCodeSigningAccountOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CertificateProfilesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CertificateProfilesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CertificateProfilesGetOptionalParams extends OperationOptions {}
