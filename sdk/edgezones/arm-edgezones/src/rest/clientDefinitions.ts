// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OperationsListParameters,
  ExtendedZonesGetParameters,
  ExtendedZonesListBySubscriptionParameters,
  ExtendedZonesRegisterParameters,
  ExtendedZonesUnregisterParameters,
} from "./parameters.js";
import {
  OperationsList200Response,
  OperationsListDefaultResponse,
  ExtendedZonesGet200Response,
  ExtendedZonesGetDefaultResponse,
  ExtendedZonesListBySubscription200Response,
  ExtendedZonesListBySubscriptionDefaultResponse,
  ExtendedZonesRegister200Response,
  ExtendedZonesRegisterDefaultResponse,
  ExtendedZonesUnregister200Response,
  ExtendedZonesUnregisterDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface OperationsList {
  /** List the operations for the provider */
  get(
    options?: OperationsListParameters,
  ): StreamableMethod<OperationsList200Response | OperationsListDefaultResponse>;
}

export interface ExtendedZonesGet {
  /** Gets an Azure Extended Zone for a subscription */
  get(
    options?: ExtendedZonesGetParameters,
  ): StreamableMethod<ExtendedZonesGet200Response | ExtendedZonesGetDefaultResponse>;
}

export interface ExtendedZonesListBySubscription {
  /** Lists the Azure Extended Zones available to a subscription */
  get(
    options?: ExtendedZonesListBySubscriptionParameters,
  ): StreamableMethod<
    ExtendedZonesListBySubscription200Response | ExtendedZonesListBySubscriptionDefaultResponse
  >;
}

export interface ExtendedZonesRegister {
  /** Registers a subscription for an Extended Zone */
  post(
    options: ExtendedZonesRegisterParameters,
  ): StreamableMethod<ExtendedZonesRegister200Response | ExtendedZonesRegisterDefaultResponse>;
}

export interface ExtendedZonesUnregister {
  /** Unregisters a subscription for an Extended Zone */
  post(
    options: ExtendedZonesUnregisterParameters,
  ): StreamableMethod<ExtendedZonesUnregister200Response | ExtendedZonesUnregisterDefaultResponse>;
}

export interface Routes {
  /** Resource for '/providers/Microsoft.EdgeZones/operations' has methods for the following verbs: get */
  (path: "/providers/Microsoft.EdgeZones/operations"): OperationsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.EdgeZones/extendedZones/\{extendedZoneName\}' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeZones/extendedZones/{extendedZoneName}",
    subscriptionId: string,
    extendedZoneName: string,
  ): ExtendedZonesGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.EdgeZones/extendedZones' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeZones/extendedZones",
    subscriptionId: string,
  ): ExtendedZonesListBySubscription;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.EdgeZones/extendedZones/\{extendedZoneName\}/register' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeZones/extendedZones/{extendedZoneName}/register",
    subscriptionId: string,
    extendedZoneName: string,
  ): ExtendedZonesRegister;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.EdgeZones/extendedZones/\{extendedZoneName\}/unregister' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeZones/extendedZones/{extendedZoneName}/unregister",
    subscriptionId: string,
    extendedZoneName: string,
  ): ExtendedZonesUnregister;
}

export type EdgeZonesContext = Client & {
  path: Routes;
};
