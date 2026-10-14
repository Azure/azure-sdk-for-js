// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CertificatesRetrieveProofOfPossessionNonceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CertificatesRetrieveCertChainOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CertificatesListByCatalogOptionalParams extends OperationOptions {
  /** Filter the result list using the given expression */
  filter?: string;
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

/** Optional parameters. */
export interface CertificatesGetOptionalParams extends OperationOptions {}
