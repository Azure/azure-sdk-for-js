// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CheckDnsNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GeneratevirtualwanvpnserverconfigurationvpnprofileOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SupportedSecurityProvidersOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListNetworkManagerEffectiveSecurityAdminRulesOptionalParams extends OperationOptions {
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  top?: number;
}

/** Optional parameters. */
export interface ListNetworkManagerEffectiveConnectivityConfigurationsOptionalParams extends OperationOptions {
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  top?: number;
}

/** Optional parameters. */
export interface ListActiveSecurityAdminRulesOptionalParams extends OperationOptions {
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  top?: number;
}

/** Optional parameters. */
export interface ListActiveConnectivityConfigurationsOptionalParams extends OperationOptions {
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  top?: number;
}

/** Optional parameters. */
export interface ExpressRouteProviderPortOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DisconnectActiveSessionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetActiveSessionsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GetBastionShareableLinkOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeleteBastionShareableLinkByTokenOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeleteBastionShareableLinkOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PutBastionShareableLinkOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
