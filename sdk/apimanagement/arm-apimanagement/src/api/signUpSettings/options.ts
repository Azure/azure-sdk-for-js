// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SignUpSettingsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SignUpSettingsCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface SignUpSettingsGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SignUpSettingsGetOptionalParams extends OperationOptions {}
