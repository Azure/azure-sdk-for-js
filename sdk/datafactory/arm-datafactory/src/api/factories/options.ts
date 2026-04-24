// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FactoriesConfigureFactoryRepoOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FactoriesGetDataPlaneAccessOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FactoriesGetGitHubAccessTokenOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FactoriesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FactoriesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FactoriesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FactoriesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FactoriesCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the factory entity. Should only be specified for update, for which it should match existing entity or can be * for unconditional update. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface FactoriesGetOptionalParams extends OperationOptions {
  /** ETag of the factory entity. Should only be specified for get. If the ETag matches the existing entity tag, or if * was provided, then no content will be returned. */
  ifNoneMatch?: string;
}
