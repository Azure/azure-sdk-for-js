// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DomainsListRecommendationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DomainsGetControlCenterSsoRequestOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DomainsCheckAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DomainsListOwnershipIdentifiersOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DomainsDeleteOwnershipIdentifierOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DomainsUpdateOwnershipIdentifierOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DomainsCreateOrUpdateOwnershipIdentifierOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DomainsGetOwnershipIdentifierOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DomainsTransferOutOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DomainsRenewOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DomainsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DomainsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DomainsDeleteOptionalParams extends OperationOptions {
  /** Specify <code>true</code> to delete the domain immediately. The default is <code>false</code> which deletes the domain after 24 hours. */
  forceHardDeleteDomain?: boolean;
}

/** Optional parameters. */
export interface DomainsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DomainsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DomainsGetOptionalParams extends OperationOptions {}
