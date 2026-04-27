// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";
import type { ContentType } from "../models/models.js";

/** Optional parameters. */
export interface RestoreSecretOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BackupSecretOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RecoverDeletedSecretOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PurgeDeletedSecretOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetDeletedSecretOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetDeletedSecretsOptionalParams extends OperationOptions {
  /** Maximum number of results to return in a page. If not specified the service will return up to 25 results. */
  maxresults?: number;
}

/** Optional parameters. */
export interface GetSecretVersionsOptionalParams extends OperationOptions {
  /** Maximum number of results to return in a page. If not specified the service will return up to 25 results. */
  maxresults?: number;
}

/** Optional parameters. */
export interface GetSecretsOptionalParams extends OperationOptions {
  /** Maximum number of results to return in a page. If not specified the service will return up to 25 results. */
  maxresults?: number;
}

/** Optional parameters. */
export interface GetSecretOptionalParams extends OperationOptions {
  /**
   * The media type (MIME type) of the certificate. If a supported format is specified,
   * the certificate content is converted to the requested format. Currently, only PFX to PEM
   * conversion is supported.
   */
  outContentType?: ContentType;
}

/** Optional parameters. */
export interface UpdateSecretOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeleteSecretOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SetSecretOptionalParams extends OperationOptions {}
