// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AttachedAksClustersListOptionalParams extends OperationOptions {
  /** OData filter expression for attachment summaries. */
  filter?: string;
  /** OData ordering expression for attachment summaries. */
  orderby?: string;
  /** Maximum number of attachments per page, from 1 to 100. Defaults to 50. */
  top?: number;
  /** Number of attachments to skip. Defaults to zero. */
  skip?: number;
}

/** Optional parameters. */
export interface AttachedAksClustersDeleteOptionalParams extends OperationOptions {
  /** Retains the physical AKS and AI Manager resources. Only Keep is supported. */
  clusterDisposition?: "Keep";
}

/** Optional parameters. */
export interface AttachedAksClustersCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AttachedAksClustersGetOptionalParams extends OperationOptions {}
