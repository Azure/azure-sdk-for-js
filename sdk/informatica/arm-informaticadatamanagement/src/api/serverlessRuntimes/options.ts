// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServerlessRuntimesServerlessResourceByIdOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServerlessRuntimesStartFailedServerlessRuntimeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServerlessRuntimesCheckDependenciesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServerlessRuntimesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServerlessRuntimesListByInformaticaOrganizationResourceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServerlessRuntimesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServerlessRuntimesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServerlessRuntimesGetOptionalParams extends OperationOptions {}
