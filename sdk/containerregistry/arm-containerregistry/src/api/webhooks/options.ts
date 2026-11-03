// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WebhooksGetCallbackConfigOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebhooksListEventsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebhooksPingOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebhooksListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebhooksDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebhooksUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebhooksCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebhooksGetOptionalParams extends OperationOptions {}
