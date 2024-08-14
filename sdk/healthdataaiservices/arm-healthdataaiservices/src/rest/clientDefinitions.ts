// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OperationsListParameters,
  DeidServicesGetParameters,
  DeidServicesCreateParameters,
  DeidServicesUpdateParameters,
  DeidServicesDeleteParameters,
  DeidServicesListByResourceGroupParameters,
  DeidServicesListBySubscriptionParameters,
  PrivateEndpointConnectionsGetParameters,
  PrivateEndpointConnectionsCreateParameters,
  PrivateEndpointConnectionsDeleteParameters,
  PrivateEndpointConnectionsListByDeidServiceParameters,
  PrivateLinksListByDeidServiceParameters,
} from "./parameters.js";
import {
  OperationsList200Response,
  OperationsListDefaultResponse,
  DeidServicesGet200Response,
  DeidServicesGetDefaultResponse,
  DeidServicesCreate200Response,
  DeidServicesCreate201Response,
  DeidServicesCreateDefaultResponse,
  DeidServicesUpdate200Response,
  DeidServicesUpdate202Response,
  DeidServicesUpdateDefaultResponse,
  DeidServicesDelete202Response,
  DeidServicesDelete204Response,
  DeidServicesDeleteDefaultResponse,
  DeidServicesListByResourceGroup200Response,
  DeidServicesListByResourceGroupDefaultResponse,
  DeidServicesListBySubscription200Response,
  DeidServicesListBySubscriptionDefaultResponse,
  PrivateEndpointConnectionsGet200Response,
  PrivateEndpointConnectionsGetDefaultResponse,
  PrivateEndpointConnectionsCreate200Response,
  PrivateEndpointConnectionsCreate201Response,
  PrivateEndpointConnectionsCreateDefaultResponse,
  PrivateEndpointConnectionsDelete202Response,
  PrivateEndpointConnectionsDelete204Response,
  PrivateEndpointConnectionsDeleteDefaultResponse,
  PrivateEndpointConnectionsListByDeidService200Response,
  PrivateEndpointConnectionsListByDeidServiceDefaultResponse,
  PrivateLinksListByDeidService200Response,
  PrivateLinksListByDeidServiceDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface OperationsList {
  /** List the operations for the provider */
  get(
    options?: OperationsListParameters,
  ): StreamableMethod<OperationsList200Response | OperationsListDefaultResponse>;
}

export interface DeidServicesGet {
  /** Get a DeidService */
  get(
    options?: DeidServicesGetParameters,
  ): StreamableMethod<DeidServicesGet200Response | DeidServicesGetDefaultResponse>;
  /** Create a DeidService */
  put(
    options: DeidServicesCreateParameters,
  ): StreamableMethod<
    | DeidServicesCreate200Response
    | DeidServicesCreate201Response
    | DeidServicesCreateDefaultResponse
  >;
  /** Update a DeidService */
  patch(
    options: DeidServicesUpdateParameters,
  ): StreamableMethod<
    | DeidServicesUpdate200Response
    | DeidServicesUpdate202Response
    | DeidServicesUpdateDefaultResponse
  >;
  /** Delete a DeidService */
  delete(
    options?: DeidServicesDeleteParameters,
  ): StreamableMethod<
    | DeidServicesDelete202Response
    | DeidServicesDelete204Response
    | DeidServicesDeleteDefaultResponse
  >;
}

export interface DeidServicesListByResourceGroup {
  /** List DeidService resources by resource group */
  get(
    options?: DeidServicesListByResourceGroupParameters,
  ): StreamableMethod<
    DeidServicesListByResourceGroup200Response | DeidServicesListByResourceGroupDefaultResponse
  >;
}

export interface DeidServicesListBySubscription {
  /** List DeidService resources by subscription ID */
  get(
    options?: DeidServicesListBySubscriptionParameters,
  ): StreamableMethod<
    DeidServicesListBySubscription200Response | DeidServicesListBySubscriptionDefaultResponse
  >;
}

export interface PrivateEndpointConnectionsGet {
  /** Get a specific private connection */
  get(
    options?: PrivateEndpointConnectionsGetParameters,
  ): StreamableMethod<
    PrivateEndpointConnectionsGet200Response | PrivateEndpointConnectionsGetDefaultResponse
  >;
  /** Create a Private endpoint connection */
  put(
    options: PrivateEndpointConnectionsCreateParameters,
  ): StreamableMethod<
    | PrivateEndpointConnectionsCreate200Response
    | PrivateEndpointConnectionsCreate201Response
    | PrivateEndpointConnectionsCreateDefaultResponse
  >;
  /** Delete the private endpoint connection */
  delete(
    options?: PrivateEndpointConnectionsDeleteParameters,
  ): StreamableMethod<
    | PrivateEndpointConnectionsDelete202Response
    | PrivateEndpointConnectionsDelete204Response
    | PrivateEndpointConnectionsDeleteDefaultResponse
  >;
}

export interface PrivateEndpointConnectionsListByDeidService {
  /** List private endpoint connections on the given resource */
  get(
    options?: PrivateEndpointConnectionsListByDeidServiceParameters,
  ): StreamableMethod<
    | PrivateEndpointConnectionsListByDeidService200Response
    | PrivateEndpointConnectionsListByDeidServiceDefaultResponse
  >;
}

export interface PrivateLinksListByDeidService {
  /** List private links on the given resource */
  get(
    options?: PrivateLinksListByDeidServiceParameters,
  ): StreamableMethod<
    PrivateLinksListByDeidService200Response | PrivateLinksListByDeidServiceDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/providers/Microsoft.HealthDataAIServices/operations' has methods for the following verbs: get */
  (path: "/providers/Microsoft.HealthDataAIServices/operations"): OperationsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.HealthDataAIServices/deidServices/\{deidServiceName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}",
    subscriptionId: string,
    resourceGroupName: string,
    deidServiceName: string,
  ): DeidServicesGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.HealthDataAIServices/deidServices' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices",
    subscriptionId: string,
    resourceGroupName: string,
  ): DeidServicesListByResourceGroup;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.HealthDataAIServices/deidServices' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.HealthDataAIServices/deidServices",
    subscriptionId: string,
  ): DeidServicesListBySubscription;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.HealthDataAIServices/deidServices/\{deidServiceName\}/privateEndpointConnections/\{privateEndpointConnectionName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    subscriptionId: string,
    resourceGroupName: string,
    deidServiceName: string,
    privateEndpointConnectionName: string,
  ): PrivateEndpointConnectionsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.HealthDataAIServices/deidServices/\{deidServiceName\}/privateEndpointConnections' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateEndpointConnections",
    subscriptionId: string,
    resourceGroupName: string,
    deidServiceName: string,
  ): PrivateEndpointConnectionsListByDeidService;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.HealthDataAIServices/deidServices/\{deidServiceName\}/privateLinkResources' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateLinkResources",
    subscriptionId: string,
    resourceGroupName: string,
    deidServiceName: string,
  ): PrivateLinksListByDeidService;
}

export type HealthDataAIServicesContext = Client & {
  path: Routes;
};
