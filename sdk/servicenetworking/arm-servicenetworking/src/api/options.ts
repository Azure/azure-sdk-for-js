// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OperationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TrafficControllerInterfaceListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface TrafficControllerInterfaceListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface TrafficControllerInterfaceDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TrafficControllerInterfaceUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TrafficControllerInterfaceCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TrafficControllerInterfaceGetOptionalParams extends OperationOptions {}

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
