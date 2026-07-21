// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApplicationGatewaysListAvailableWafRuleSetsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationGatewaysListAvailableResponseHeadersOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationGatewaysListAvailableRequestHeadersOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationGatewaysListAvailableServerVariablesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationGatewaysGetSslPredefinedPolicyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationGatewaysListAvailableSslPredefinedPoliciesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationGatewaysListAvailableSslOptionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationGatewaysBackendHealthOnDemandOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Expands BackendAddressPool and BackendHttpSettings referenced in backend health. */
  expand?: string;
}

/** Optional parameters. */
export interface ApplicationGatewaysBackendHealthOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Expands BackendAddressPool and BackendHttpSettings referenced in backend health. */
  expand?: string;
}

/** Optional parameters. */
export interface ApplicationGatewaysStopOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApplicationGatewaysStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApplicationGatewaysListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationGatewaysListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationGatewaysDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApplicationGatewaysUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationGatewaysCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApplicationGatewaysGetOptionalParams extends OperationOptions {}
