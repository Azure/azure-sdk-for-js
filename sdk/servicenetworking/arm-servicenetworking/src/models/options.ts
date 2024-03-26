// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure-rest/core-client";

export interface AssociationsInterfaceGetOptions extends OperationOptions {}

export interface AssociationsInterfaceCreateOrUpdateOptions
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface AssociationsInterfaceUpdateOptions extends OperationOptions {}

export interface AssociationsInterfaceDeleteOperationOptions
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface AssociationsInterfaceListByTrafficControllerOptions
  extends OperationOptions {}

export interface FrontendsInterfaceGetOptions extends OperationOptions {}

export interface FrontendsInterfaceCreateOrUpdateOptions
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface FrontendsInterfaceUpdateOptions extends OperationOptions {}

export interface FrontendsInterfaceDeleteOperationOptions
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface FrontendsInterfaceListByTrafficControllerOptions
  extends OperationOptions {}

export interface TrafficControllerInterfaceGetOptions
  extends OperationOptions {}

export interface TrafficControllerInterfaceCreateOrUpdateOptions
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface TrafficControllerInterfaceUpdateOptions
  extends OperationOptions {}

export interface TrafficControllerInterfaceDeleteOperationOptions
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface TrafficControllerInterfaceListByResourceGroupOptions
  extends OperationOptions {}

export interface TrafficControllerInterfaceListBySubscriptionOptions
  extends OperationOptions {}

export interface OperationsListOptions extends OperationOptions {}
