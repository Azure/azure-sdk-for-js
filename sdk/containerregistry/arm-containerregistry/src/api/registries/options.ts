// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RegistriesListPrivateLinkResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RegistriesGetPrivateLinkResourceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RegistriesCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RegistriesGenerateCredentialsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistriesRegenerateCredentialOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RegistriesListCredentialsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RegistriesListUsagesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RegistriesImportImageOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistriesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RegistriesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RegistriesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistriesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistriesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistriesGetOptionalParams extends OperationOptions {}
