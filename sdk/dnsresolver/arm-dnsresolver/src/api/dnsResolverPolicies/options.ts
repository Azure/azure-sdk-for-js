// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DnsResolverPoliciesListByVirtualNetworkOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DnsResolverPoliciesListOptionalParams extends OperationOptions {
  /** The maximum number of results to return. If not specified, returns up to 100 results. */
  top?: number;
}

/** Optional parameters. */
export interface DnsResolverPoliciesListByResourceGroupOptionalParams extends OperationOptions {
  /** The maximum number of results to return. If not specified, returns up to 100 results. */
  top?: number;
}

/** Optional parameters. */
export interface DnsResolverPoliciesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface DnsResolverPoliciesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface DnsResolverPoliciesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new resource to be created, but to prevent updating an existing resource. Other values will be ignored. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface DnsResolverPoliciesGetOptionalParams extends OperationOptions {}
