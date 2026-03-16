// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TriggersStopOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TriggersStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TriggersUnsubscribeFromEventsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TriggersGetEventSubscriptionStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TriggersSubscribeToEventsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TriggersListByFactoryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TriggersDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TriggersCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the trigger entity.  Should only be specified for update, for which it should match existing entity or can be * for unconditional update. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface TriggersGetOptionalParams extends OperationOptions {
  /** ETag of the trigger entity. Should only be specified for get. If the ETag matches the existing entity tag, or if * was provided, then no content will be returned. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface TriggersQueryByFactoryOptionalParams extends OperationOptions {}
