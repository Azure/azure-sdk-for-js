// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AssociationsInterfaceListByTrafficControllerOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface AssociationsInterfaceDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AssociationsInterfaceUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AssociationsInterfaceCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AssociationsInterfaceGetOptionalParams extends OperationOptions {}
