// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReplicationProtectionIntentsListOptionalParams extends OperationOptions {
  /** The pagination token. */
  skipToken?: string;
  /** The page size. */
  takeToken?: string;
}

/** Optional parameters. */
export interface ReplicationProtectionIntentsCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReplicationProtectionIntentsGetOptionalParams extends OperationOptions {}
