// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApiWikiDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiWikiUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiWikiCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ApiWikiGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiWikiGetOptionalParams extends OperationOptions {}
