// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RaiBindingsListOptionalParams extends OperationOptions {
  /** The maximum number of RAI bindings to return. Defaults to 50. */
  top?: number;
}

/** Optional parameters. */
export interface RaiBindingsDeleteOptionalParams extends OperationOptions {
  /** Proceed only when the current resource ETag matches this value. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface RaiBindingsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Proceed only when the current resource ETag matches this value. */
  ifMatch?: string;
  /** Proceed only when no current resource ETag matches this value. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface RaiBindingsGetOptionalParams extends OperationOptions {}
