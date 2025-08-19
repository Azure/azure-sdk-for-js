// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FrontendsInterfaceListByTrafficControllerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FrontendsInterfaceDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FrontendsInterfaceUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FrontendsInterfaceCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FrontendsInterfaceGetOptionalParams extends OperationOptions {}
