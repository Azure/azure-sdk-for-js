// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ListEnvironmentTypesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetEnvironmentDefinitionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListEnvironmentDefinitionsByCatalogOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListEnvironmentDefinitionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetCatalogOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListCatalogsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeleteEnvironmentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CreateOrUpdateEnvironmentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GetEnvironmentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListEnvironmentsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListAllEnvironmentsOptionalParams extends OperationOptions {}
