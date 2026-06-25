// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BgpPeersListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BgpPeersDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BgpPeersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BgpPeersGetOptionalParams extends OperationOptions {}
