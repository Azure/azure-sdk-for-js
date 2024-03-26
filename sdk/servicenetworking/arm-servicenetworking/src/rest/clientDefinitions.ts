// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AssociationsInterfaceGetParameters,
  AssociationsInterfaceCreateOrUpdateParameters,
  AssociationsInterfaceUpdateParameters,
  AssociationsInterfaceDeleteParameters,
  AssociationsInterfaceListByTrafficControllerParameters,
  FrontendsInterfaceGetParameters,
  FrontendsInterfaceCreateOrUpdateParameters,
  FrontendsInterfaceUpdateParameters,
  FrontendsInterfaceDeleteParameters,
  FrontendsInterfaceListByTrafficControllerParameters,
  TrafficControllerInterfaceGetParameters,
  TrafficControllerInterfaceCreateOrUpdateParameters,
  TrafficControllerInterfaceUpdateParameters,
  TrafficControllerInterfaceDeleteParameters,
  TrafficControllerInterfaceListByResourceGroupParameters,
  TrafficControllerInterfaceListBySubscriptionParameters,
  OperationsListParameters,
} from "./parameters.js";
import {
  AssociationsInterfaceGet200Response,
  AssociationsInterfaceGetDefaultResponse,
  AssociationsInterfaceCreateOrUpdate200Response,
  AssociationsInterfaceCreateOrUpdate201Response,
  AssociationsInterfaceCreateOrUpdateDefaultResponse,
  AssociationsInterfaceUpdate200Response,
  AssociationsInterfaceUpdateDefaultResponse,
  AssociationsInterfaceDeleteOperation200Response,
  AssociationsInterfaceDeleteOperation202Response,
  AssociationsInterfaceDeleteOperation204Response,
  AssociationsInterfaceDeleteOperationDefaultResponse,
  AssociationsInterfaceListByTrafficController200Response,
  AssociationsInterfaceListByTrafficControllerDefaultResponse,
  FrontendsInterfaceGet200Response,
  FrontendsInterfaceGetDefaultResponse,
  FrontendsInterfaceCreateOrUpdate200Response,
  FrontendsInterfaceCreateOrUpdate201Response,
  FrontendsInterfaceCreateOrUpdateDefaultResponse,
  FrontendsInterfaceUpdate200Response,
  FrontendsInterfaceUpdateDefaultResponse,
  FrontendsInterfaceDeleteOperation200Response,
  FrontendsInterfaceDeleteOperation202Response,
  FrontendsInterfaceDeleteOperation204Response,
  FrontendsInterfaceDeleteOperationDefaultResponse,
  FrontendsInterfaceListByTrafficController200Response,
  FrontendsInterfaceListByTrafficControllerDefaultResponse,
  TrafficControllerInterfaceGet200Response,
  TrafficControllerInterfaceGetDefaultResponse,
  TrafficControllerInterfaceCreateOrUpdate200Response,
  TrafficControllerInterfaceCreateOrUpdate201Response,
  TrafficControllerInterfaceCreateOrUpdateDefaultResponse,
  TrafficControllerInterfaceUpdate200Response,
  TrafficControllerInterfaceUpdateDefaultResponse,
  TrafficControllerInterfaceDeleteOperation200Response,
  TrafficControllerInterfaceDeleteOperation202Response,
  TrafficControllerInterfaceDeleteOperation204Response,
  TrafficControllerInterfaceDeleteOperationDefaultResponse,
  TrafficControllerInterfaceListByResourceGroup200Response,
  TrafficControllerInterfaceListByResourceGroupDefaultResponse,
  TrafficControllerInterfaceListBySubscription200Response,
  TrafficControllerInterfaceListBySubscriptionDefaultResponse,
  OperationsList200Response,
  OperationsListDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface AssociationsInterfaceGet {
  /** Get a Association */
  get(
    options?: AssociationsInterfaceGetParameters,
  ): StreamableMethod<
    | AssociationsInterfaceGet200Response
    | AssociationsInterfaceGetDefaultResponse
  >;
  /** Create a Association */
  put(
    options: AssociationsInterfaceCreateOrUpdateParameters,
  ): StreamableMethod<
    | AssociationsInterfaceCreateOrUpdate200Response
    | AssociationsInterfaceCreateOrUpdate201Response
    | AssociationsInterfaceCreateOrUpdateDefaultResponse
  >;
  /** Update a Association */
  patch(
    options: AssociationsInterfaceUpdateParameters,
  ): StreamableMethod<
    | AssociationsInterfaceUpdate200Response
    | AssociationsInterfaceUpdateDefaultResponse
  >;
  /** Delete a Association */
  delete(
    options?: AssociationsInterfaceDeleteParameters,
  ): StreamableMethod<
    | AssociationsInterfaceDeleteOperation200Response
    | AssociationsInterfaceDeleteOperation202Response
    | AssociationsInterfaceDeleteOperation204Response
    | AssociationsInterfaceDeleteOperationDefaultResponse
  >;
}

export interface AssociationsInterfaceListByTrafficController {
  /** List Association resources by TrafficController */
  get(
    options?: AssociationsInterfaceListByTrafficControllerParameters,
  ): StreamableMethod<
    | AssociationsInterfaceListByTrafficController200Response
    | AssociationsInterfaceListByTrafficControllerDefaultResponse
  >;
}

export interface FrontendsInterfaceGet {
  /** Get a Frontend */
  get(
    options?: FrontendsInterfaceGetParameters,
  ): StreamableMethod<
    FrontendsInterfaceGet200Response | FrontendsInterfaceGetDefaultResponse
  >;
  /** Create a Frontend */
  put(
    options: FrontendsInterfaceCreateOrUpdateParameters,
  ): StreamableMethod<
    | FrontendsInterfaceCreateOrUpdate200Response
    | FrontendsInterfaceCreateOrUpdate201Response
    | FrontendsInterfaceCreateOrUpdateDefaultResponse
  >;
  /** Update a Frontend */
  patch(
    options: FrontendsInterfaceUpdateParameters,
  ): StreamableMethod<
    | FrontendsInterfaceUpdate200Response
    | FrontendsInterfaceUpdateDefaultResponse
  >;
  /** Delete a Frontend */
  delete(
    options?: FrontendsInterfaceDeleteParameters,
  ): StreamableMethod<
    | FrontendsInterfaceDeleteOperation200Response
    | FrontendsInterfaceDeleteOperation202Response
    | FrontendsInterfaceDeleteOperation204Response
    | FrontendsInterfaceDeleteOperationDefaultResponse
  >;
}

export interface FrontendsInterfaceListByTrafficController {
  /** List Frontend resources by TrafficController */
  get(
    options?: FrontendsInterfaceListByTrafficControllerParameters,
  ): StreamableMethod<
    | FrontendsInterfaceListByTrafficController200Response
    | FrontendsInterfaceListByTrafficControllerDefaultResponse
  >;
}

export interface TrafficControllerInterfaceGet {
  /** Get a TrafficController */
  get(
    options?: TrafficControllerInterfaceGetParameters,
  ): StreamableMethod<
    | TrafficControllerInterfaceGet200Response
    | TrafficControllerInterfaceGetDefaultResponse
  >;
  /** Create a TrafficController */
  put(
    options: TrafficControllerInterfaceCreateOrUpdateParameters,
  ): StreamableMethod<
    | TrafficControllerInterfaceCreateOrUpdate200Response
    | TrafficControllerInterfaceCreateOrUpdate201Response
    | TrafficControllerInterfaceCreateOrUpdateDefaultResponse
  >;
  /** Update a TrafficController */
  patch(
    options: TrafficControllerInterfaceUpdateParameters,
  ): StreamableMethod<
    | TrafficControllerInterfaceUpdate200Response
    | TrafficControllerInterfaceUpdateDefaultResponse
  >;
  /** Delete a TrafficController */
  delete(
    options?: TrafficControllerInterfaceDeleteParameters,
  ): StreamableMethod<
    | TrafficControllerInterfaceDeleteOperation200Response
    | TrafficControllerInterfaceDeleteOperation202Response
    | TrafficControllerInterfaceDeleteOperation204Response
    | TrafficControllerInterfaceDeleteOperationDefaultResponse
  >;
}

export interface TrafficControllerInterfaceListByResourceGroup {
  /** List TrafficController resources by resource group */
  get(
    options?: TrafficControllerInterfaceListByResourceGroupParameters,
  ): StreamableMethod<
    | TrafficControllerInterfaceListByResourceGroup200Response
    | TrafficControllerInterfaceListByResourceGroupDefaultResponse
  >;
}

export interface TrafficControllerInterfaceListBySubscription {
  /** List TrafficController resources by subscription ID */
  get(
    options?: TrafficControllerInterfaceListBySubscriptionParameters,
  ): StreamableMethod<
    | TrafficControllerInterfaceListBySubscription200Response
    | TrafficControllerInterfaceListBySubscriptionDefaultResponse
  >;
}

export interface OperationsList {
  /** List the operations for the provider */
  get(
    options?: OperationsListParameters,
  ): StreamableMethod<
    OperationsList200Response | OperationsListDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ServiceNetworking/trafficControllers/\{trafficControllerName\}/associations/\{associationName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/associations/{associationName}",
    subscriptionId: string,
    resourceGroupName: string,
    trafficControllerName: string,
    associationName: string,
  ): AssociationsInterfaceGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ServiceNetworking/trafficControllers/\{trafficControllerName\}/associations' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/associations",
    subscriptionId: string,
    resourceGroupName: string,
    trafficControllerName: string,
  ): AssociationsInterfaceListByTrafficController;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ServiceNetworking/trafficControllers/\{trafficControllerName\}/frontends/\{frontendName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/frontends/{frontendName}",
    subscriptionId: string,
    resourceGroupName: string,
    trafficControllerName: string,
    frontendName: string,
  ): FrontendsInterfaceGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ServiceNetworking/trafficControllers/\{trafficControllerName\}/frontends' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/frontends",
    subscriptionId: string,
    resourceGroupName: string,
    trafficControllerName: string,
  ): FrontendsInterfaceListByTrafficController;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ServiceNetworking/trafficControllers/\{trafficControllerName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}",
    subscriptionId: string,
    resourceGroupName: string,
    trafficControllerName: string,
  ): TrafficControllerInterfaceGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ServiceNetworking/trafficControllers' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers",
    subscriptionId: string,
    resourceGroupName: string,
  ): TrafficControllerInterfaceListByResourceGroup;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.ServiceNetworking/trafficControllers' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceNetworking/trafficControllers",
    subscriptionId: string,
  ): TrafficControllerInterfaceListBySubscription;
  /** Resource for '/providers/Microsoft.ServiceNetworking/operations' has methods for the following verbs: get */
  (path: "/providers/Microsoft.ServiceNetworking/operations"): OperationsList;
}

export type ServiceNetworkingContext = Client & {
  path: Routes;
};
