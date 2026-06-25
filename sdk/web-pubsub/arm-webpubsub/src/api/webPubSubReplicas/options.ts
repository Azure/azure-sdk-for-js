// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WebPubSubReplicasRestartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebPubSubReplicasListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebPubSubReplicasDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebPubSubReplicasUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebPubSubReplicasCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebPubSubReplicasGetOptionalParams extends OperationOptions {}
