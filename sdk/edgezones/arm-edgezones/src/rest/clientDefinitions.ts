// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ListParameters,
  GetParameters,
  ListBySubscriptionParameters,
  RegisterParameters,
  UnregisterParameters,
} from "./parameters.js";
import {
  List200Response,
  ListDefaultResponse,
  Get200Response,
  GetDefaultResponse,
  ListBySubscription200Response,
  ListBySubscriptionDefaultResponse,
  Register200Response,
  RegisterDefaultResponse,
  Unregister200Response,
  UnregisterDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface List {
  /** List the operations for the provider */
  get(
    options?: ListParameters,
  ): StreamableMethod<List200Response | ListDefaultResponse>;
}

export interface Get {
  /** Gets an Azure Extended Zone for a subscription */
  get(
    options?: GetParameters,
  ): StreamableMethod<Get200Response | GetDefaultResponse>;
}

export interface ListBySubscription {
  /** Lists the Azure Extended Zones available to a subscription */
  get(
    options?: ListBySubscriptionParameters,
  ): StreamableMethod<
    ListBySubscription200Response | ListBySubscriptionDefaultResponse
  >;
}

export interface Register {
  /** Registers a subscription for an Extended Zone */
  post(
    options: RegisterParameters,
  ): StreamableMethod<Register200Response | RegisterDefaultResponse>;
}

export interface Unregister {
  /** Unregisters a subscription for an Extended Zone */
  post(
    options: UnregisterParameters,
  ): StreamableMethod<Unregister200Response | UnregisterDefaultResponse>;
}

export interface Routes {
  /** Resource for '/providers/Microsoft.EdgeZones/operations' has methods for the following verbs: get */
  (path: "/providers/Microsoft.EdgeZones/operations"): List;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.EdgeZones/extendedZones/\{extendedZoneName\}' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeZones/extendedZones/{extendedZoneName}",
    subscriptionId: string,
    extendedZoneName: string,
  ): Get;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.EdgeZones/extendedZones' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeZones/extendedZones",
    subscriptionId: string,
  ): ListBySubscription;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.EdgeZones/extendedZones/\{extendedZoneName\}/register' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeZones/extendedZones/{extendedZoneName}/register",
    subscriptionId: string,
    extendedZoneName: string,
  ): Register;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.EdgeZones/extendedZones/\{extendedZoneName\}/unregister' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeZones/extendedZones/{extendedZoneName}/unregister",
    subscriptionId: string,
    extendedZoneName: string,
  ): Unregister;
}

export type EdgeZonesContext = Client & {
  path: Routes;
};
