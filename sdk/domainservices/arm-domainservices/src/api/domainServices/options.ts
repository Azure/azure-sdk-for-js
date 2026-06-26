// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DomainServicesUnsuspendOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DomainServicesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DomainServicesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DomainServicesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DomainServicesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DomainServicesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DomainServicesGetOptionalParams extends OperationOptions {}
