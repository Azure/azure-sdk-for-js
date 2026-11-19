// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NeuroShieldProtectedResourcesTriggerInventoryUploadOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NeuroShieldProtectedResourcesListOptionalParams extends OperationOptions {
  /** The maximum number of items to return. */
  top?: number;
  /** The continuation token used to retrieve the next page. */
  skipToken?: string;
}

/** Optional parameters. */
export interface NeuroShieldProtectedResourcesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The entity tag that makes the request conditional. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface NeuroShieldProtectedResourcesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The entity tag that makes the request conditional. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface NeuroShieldProtectedResourcesGetOptionalParams extends OperationOptions {}
