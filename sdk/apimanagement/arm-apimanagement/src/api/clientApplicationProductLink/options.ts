// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ClientApplicationProductLinkListByClientApplicationsOptionalParams extends OperationOptions {
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface ClientApplicationProductLinkDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClientApplicationProductLinkCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClientApplicationProductLinkGetOptionalParams extends OperationOptions {}
