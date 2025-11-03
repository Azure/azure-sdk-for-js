// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NamespacesCheckAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NamespacesGetPnsCredentialsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NamespacesListAllOptionalParams extends OperationOptions {
  /** Skip token for subsequent requests. */
  skipToken?: string;
  /** Maximum number of results to return. */
  top?: number;
}

/** Optional parameters. */
export interface NamespacesListOptionalParams extends OperationOptions {
  /** Skip token for subsequent requests. */
  skipToken?: string;
  /** Maximum number of results to return. */
  top?: number;
}

/** Optional parameters. */
export interface NamespacesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NamespacesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NamespacesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NamespacesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NamespacesRegenerateKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NamespacesListKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NamespacesListAuthorizationRulesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NamespacesDeleteAuthorizationRuleOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NamespacesCreateOrUpdateAuthorizationRuleOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NamespacesGetAuthorizationRuleOptionalParams extends OperationOptions {}
