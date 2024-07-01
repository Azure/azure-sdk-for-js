// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ListParameters,
  GetParameters,
  CreateOrUpdateParameters,
  UpdateParameters,
  DeleteParameters,
  ListByResourceGroupParameters,
  ListBySubscriptionParameters,
  ListVirtualMachineScaleSetsParameters,
} from "./parameters.js";
import {
  List200Response,
  ListDefaultResponse,
  Get200Response,
  GetDefaultResponse,
  CreateOrUpdate200Response,
  CreateOrUpdate201Response,
  CreateOrUpdateDefaultResponse,
  Update200Response,
  Update202Response,
  UpdateDefaultResponse,
  Delete202Response,
  Delete204Response,
  DeleteDefaultResponse,
  ListByResourceGroup200Response,
  ListByResourceGroupDefaultResponse,
  ListBySubscription200Response,
  ListBySubscriptionDefaultResponse,
  ListVirtualMachineScaleSets200Response,
  ListVirtualMachineScaleSetsDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface List {
  /** List the operations for the provider */
  get(
    options?: ListParameters,
  ): StreamableMethod<List200Response | ListDefaultResponse>;
}

export interface Get {
  /** Get a Fleet */
  get(
    options?: GetParameters,
  ): StreamableMethod<Get200Response | GetDefaultResponse>;
  /** Create a Fleet */
  put(
    options: CreateOrUpdateParameters,
  ): StreamableMethod<
    | CreateOrUpdate200Response
    | CreateOrUpdate201Response
    | CreateOrUpdateDefaultResponse
  >;
  /** Update a Fleet */
  patch(
    options: UpdateParameters,
  ): StreamableMethod<
    Update200Response | Update202Response | UpdateDefaultResponse
  >;
  /** Delete a Fleet */
  delete(
    options?: DeleteParameters,
  ): StreamableMethod<
    Delete202Response | Delete204Response | DeleteDefaultResponse
  >;
}

export interface ListByResourceGroup {
  /** List Fleet resources by resource group */
  get(
    options?: ListByResourceGroupParameters,
  ): StreamableMethod<
    ListByResourceGroup200Response | ListByResourceGroupDefaultResponse
  >;
}

export interface ListBySubscription {
  /** List Fleet resources by subscription ID */
  get(
    options?: ListBySubscriptionParameters,
  ): StreamableMethod<
    ListBySubscription200Response | ListBySubscriptionDefaultResponse
  >;
}

export interface ListVirtualMachineScaleSets {
  /** List VirtualMachineScaleSet resources by Fleet */
  get(
    options?: ListVirtualMachineScaleSetsParameters,
  ): StreamableMethod<
    | ListVirtualMachineScaleSets200Response
    | ListVirtualMachineScaleSetsDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/providers/Microsoft.AzureFleet/operations' has methods for the following verbs: get */
  (path: "/providers/Microsoft.AzureFleet/operations"): List;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureFleet/fleets/\{fleetName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}",
    subscriptionId: string,
    resourceGroupName: string,
    fleetName: string,
  ): Get;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureFleet/fleets' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets",
    subscriptionId: string,
    resourceGroupName: string,
  ): ListByResourceGroup;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.AzureFleet/fleets' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureFleet/fleets",
    subscriptionId: string,
  ): ListBySubscription;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureFleet/fleets/\{name\}/virtualMachineScaleSets' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{name}/virtualMachineScaleSets",
    subscriptionId: string,
    resourceGroupName: string,
    name: string,
  ): ListVirtualMachineScaleSets;
}

export type AzureFleetContext = Client & {
  path: Routes;
};
