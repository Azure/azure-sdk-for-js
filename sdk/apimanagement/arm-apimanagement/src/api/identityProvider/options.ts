// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface IdentityProviderListSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IdentityProviderListByServiceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IdentityProviderDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IdentityProviderUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IdentityProviderCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface IdentityProviderGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IdentityProviderGetOptionalParams extends OperationOptions {}
