// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MicrosoftEntraAdministratorsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MicrosoftEntraAdministratorsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MicrosoftEntraAdministratorsCreateOrReplaceOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MicrosoftEntraAdministratorsGetOptionalParams extends OperationOptions {}
