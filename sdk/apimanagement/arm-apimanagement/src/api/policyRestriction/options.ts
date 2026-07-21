// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PolicyRestrictionListByServiceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyRestrictionDeleteOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface PolicyRestrictionUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyRestrictionCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface PolicyRestrictionGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyRestrictionGetOptionalParams extends OperationOptions {}
