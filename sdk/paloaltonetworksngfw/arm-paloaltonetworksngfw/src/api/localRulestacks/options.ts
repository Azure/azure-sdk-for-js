// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LocalRulestacksRevertOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LocalRulestacksListSecurityServicesOptionalParams extends OperationOptions {
  skip?: string;
  top?: number;
}

/** Optional parameters. */
export interface LocalRulestacksListPredefinedUrlCategoriesOptionalParams extends OperationOptions {
  skip?: string;
  top?: number;
}

/** Optional parameters. */
export interface LocalRulestacksListFirewallsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LocalRulestacksListCountriesOptionalParams extends OperationOptions {
  skip?: string;
  top?: number;
}

/** Optional parameters. */
export interface LocalRulestacksListAppIdsOptionalParams extends OperationOptions {
  appIdVersion?: string;
  appPrefix?: string;
  skip?: string;
  top?: number;
}

/** Optional parameters. */
export interface LocalRulestacksListAdvancedSecurityObjectsOptionalParams extends OperationOptions {
  skip?: string;
  top?: number;
}

/** Optional parameters. */
export interface LocalRulestacksGetSupportInfoOptionalParams extends OperationOptions {
  /** email address on behalf of which this API called */
  email?: string;
}

/** Optional parameters. */
export interface LocalRulestacksGetChangeLogOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LocalRulestacksCommitOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LocalRulestacksListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LocalRulestacksListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LocalRulestacksDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LocalRulestacksUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LocalRulestacksCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LocalRulestacksGetOptionalParams extends OperationOptions {}
