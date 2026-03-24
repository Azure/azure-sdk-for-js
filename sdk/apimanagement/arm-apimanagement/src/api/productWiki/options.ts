// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProductWikiDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProductWikiUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProductWikiCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ProductWikiGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProductWikiGetOptionalParams extends OperationOptions {}
