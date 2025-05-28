// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SecurityPoliciesInterfaceListByTrafficControllerOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface SecurityPoliciesInterfaceDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SecurityPoliciesInterfaceUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SecurityPoliciesInterfaceCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SecurityPoliciesInterfaceGetOptionalParams extends OperationOptions {}
