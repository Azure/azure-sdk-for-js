// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspaceEvaluationsListOptionalParams extends OperationOptions {
  /** Opaque continuation token supplied by the returned nextLink. */
  continuationToken?: string;
}

/** Optional parameters. */
export interface WorkspaceEvaluationsGetOptionalParams extends OperationOptions {}
