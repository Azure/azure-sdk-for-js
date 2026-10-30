// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReplicationVaultSettingListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReplicationVaultSettingCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationVaultSettingGetOptionalParams extends OperationOptions {}
