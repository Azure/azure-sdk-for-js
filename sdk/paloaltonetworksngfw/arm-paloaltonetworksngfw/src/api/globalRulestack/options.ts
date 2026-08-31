// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GlobalRulestackRevertOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GlobalRulestackListSecurityServicesOptionalParams extends OperationOptions {
  skip?: string;
  top?: number;
}

/** Optional parameters. */
export interface GlobalRulestackListPredefinedUrlCategoriesOptionalParams extends OperationOptions {
  skip?: string;
  top?: number;
}

/** Optional parameters. */
export interface GlobalRulestackListFirewallsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GlobalRulestackListCountriesOptionalParams extends OperationOptions {
  skip?: string;
  top?: number;
}

/** Optional parameters. */
export interface GlobalRulestackListAppIdsOptionalParams extends OperationOptions {
  appIdVersion?: string;
  appPrefix?: string;
  skip?: string;
  top?: number;
}

/** Optional parameters. */
export interface GlobalRulestackListAdvancedSecurityObjectsOptionalParams extends OperationOptions {
  skip?: string;
  top?: number;
}

/** Optional parameters. */
export interface GlobalRulestackGetChangeLogOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GlobalRulestackCommitOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GlobalRulestackListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GlobalRulestackDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GlobalRulestackUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GlobalRulestackCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GlobalRulestackGetOptionalParams extends OperationOptions {}
