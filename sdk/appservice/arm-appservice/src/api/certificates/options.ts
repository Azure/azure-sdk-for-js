// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CertificatesListOptionalParams extends OperationOptions {
  /** Return only information specified in the filter (using OData syntax). For example: $filter=KeyVaultId eq 'KeyVaultId' */
  filter?: string;
}

/** Optional parameters. */
export interface CertificatesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CertificatesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CertificatesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CertificatesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CertificatesGetOptionalParams extends OperationOptions {}
