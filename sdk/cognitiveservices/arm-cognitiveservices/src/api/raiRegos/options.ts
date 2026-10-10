// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RaiRegosListOptionalParams extends OperationOptions {
  /** The maximum number of reusable Rego artifacts to return. Defaults to 10. */
  top?: number;
}

/** Optional parameters. */
export interface RaiRegosDeleteOptionalParams extends OperationOptions {
  /** Proceed only when the current resource ETag matches this value. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface RaiRegosCreateOrUpdateOptionalParams extends OperationOptions {
  /** Proceed only when the current resource ETag matches this value. */
  ifMatch?: string;
  /** Proceed only when no current resource ETag matches this value. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface RaiRegosGetOptionalParams extends OperationOptions {}
