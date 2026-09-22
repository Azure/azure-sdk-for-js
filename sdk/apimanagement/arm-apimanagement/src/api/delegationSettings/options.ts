// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DelegationSettingsListSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DelegationSettingsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DelegationSettingsCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface DelegationSettingsGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DelegationSettingsGetOptionalParams extends OperationOptions {}
