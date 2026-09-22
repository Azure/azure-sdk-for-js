// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProtectionContainersRefreshOptionalParams extends OperationOptions {
  /** OData filter options. */
  filter?: string;
}

/** Optional parameters. */
export interface ProtectionContainersInquireOptionalParams extends OperationOptions {
  filter?: string;
}

/** Optional parameters. */
export interface ProtectionContainersUnregisterOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProtectionContainersRegisterOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProtectionContainersGetOptionalParams extends OperationOptions {}
