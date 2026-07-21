// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ScheduledActionsCheckNameAvailabilityByScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsRunByScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsListByScopeOptionalParams extends OperationOptions {
  /** May be used to filter scheduled actions by properties/viewId. Supported operator is 'eq'. */
  filter?: string;
}

/** Optional parameters. */
export interface ScheduledActionsDeleteByScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsCreateOrUpdateByScopeOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity. Optional when updating an entity and can be specified to achieve optimistic concurrency. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ScheduledActionsGetByScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsRunOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsListOptionalParams extends OperationOptions {
  /** May be used to filter scheduled actions by properties/viewId. Supported operator is 'eq'. */
  filter?: string;
}

/** Optional parameters. */
export interface ScheduledActionsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity. Optional when updating an entity and can be specified to achieve optimistic concurrency. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ScheduledActionsGetOptionalParams extends OperationOptions {}
