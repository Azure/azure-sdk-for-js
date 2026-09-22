// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspaceCertificateRefreshSecretOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceCertificateListByWorkspaceOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| name | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| subject | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| thumbprint | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| expirationDate | filter | ge, le, eq, ne, gt, lt |     |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
  /** When set to true, the response contains only certificates entities which failed refresh. */
  isKeyVaultRefreshFailed?: boolean;
}

/** Optional parameters. */
export interface WorkspaceCertificateDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceCertificateCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface WorkspaceCertificateGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceCertificateGetOptionalParams extends OperationOptions {}
