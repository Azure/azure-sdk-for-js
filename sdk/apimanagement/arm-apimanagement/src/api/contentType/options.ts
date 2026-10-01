// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ContentTypeListByServiceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContentTypeDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContentTypeCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ContentTypeGetOptionalParams extends OperationOptions {}
