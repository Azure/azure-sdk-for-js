// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SignInSettingsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SignInSettingsCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface SignInSettingsGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SignInSettingsGetOptionalParams extends OperationOptions {}
