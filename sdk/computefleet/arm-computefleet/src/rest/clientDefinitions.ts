// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OperationsListParameters,
  FleetsGetParameters,
  FleetsCreateOrUpdateParameters,
  FleetsUpdateParameters,
  FleetsDeleteParameters,
  FleetsListByResourceGroupParameters,
  FleetsListBySubscriptionParameters,
  FleetsListVirtualMachineScaleSetsParameters,
} from "./parameters.js";
import {
  OperationsList200Response,
  OperationsListDefaultResponse,
  FleetsGet200Response,
  FleetsGetDefaultResponse,
  FleetsCreateOrUpdate200Response,
  FleetsCreateOrUpdate201Response,
  FleetsCreateOrUpdateDefaultResponse,
  FleetsUpdate200Response,
  FleetsUpdate202Response,
  FleetsUpdateDefaultResponse,
  FleetsDelete202Response,
  FleetsDelete204Response,
  FleetsDeleteDefaultResponse,
  FleetsListByResourceGroup200Response,
  FleetsListByResourceGroupDefaultResponse,
  FleetsListBySubscription200Response,
  FleetsListBySubscriptionDefaultResponse,
  FleetsListVirtualMachineScaleSets200Response,
  FleetsListVirtualMachineScaleSetsDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface OperationsList {
  /** List the operations for the provider */
  get(
    options?: OperationsListParameters,
  ): StreamableMethod<OperationsList200Response | OperationsListDefaultResponse>;
}

export interface FleetsGet {
  /** Get a Fleet */
  get(
    options?: FleetsGetParameters,
  ): StreamableMethod<FleetsGet200Response | FleetsGetDefaultResponse>;
  /** Create a Fleet */
  put(
    options: FleetsCreateOrUpdateParameters,
  ): StreamableMethod<
    | FleetsCreateOrUpdate200Response
    | FleetsCreateOrUpdate201Response
    | FleetsCreateOrUpdateDefaultResponse
  >;
  /** Update a Fleet */
  patch(
    options: FleetsUpdateParameters,
  ): StreamableMethod<
    FleetsUpdate200Response | FleetsUpdate202Response | FleetsUpdateDefaultResponse
  >;
  /** Delete a Fleet */
  delete(
    options?: FleetsDeleteParameters,
  ): StreamableMethod<
    FleetsDelete202Response | FleetsDelete204Response | FleetsDeleteDefaultResponse
  >;
}

export interface FleetsListByResourceGroup {
  /** List Fleet resources by resource group */
  get(
    options?: FleetsListByResourceGroupParameters,
  ): StreamableMethod<
    FleetsListByResourceGroup200Response | FleetsListByResourceGroupDefaultResponse
  >;
}

export interface FleetsListBySubscription {
  /** List Fleet resources by subscription ID */
  get(
    options?: FleetsListBySubscriptionParameters,
  ): StreamableMethod<
    FleetsListBySubscription200Response | FleetsListBySubscriptionDefaultResponse
  >;
}

export interface FleetsListVirtualMachineScaleSets {
  /** List VirtualMachineScaleSet resources by Fleet */
  get(
    options?: FleetsListVirtualMachineScaleSetsParameters,
  ): StreamableMethod<
    FleetsListVirtualMachineScaleSets200Response | FleetsListVirtualMachineScaleSetsDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/providers/Microsoft.AzureFleet/operations' has methods for the following verbs: get */
  (path: "/providers/Microsoft.AzureFleet/operations"): OperationsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureFleet/fleets/\{fleetName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}",
    subscriptionId: string,
    resourceGroupName: string,
    fleetName: string,
  ): FleetsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureFleet/fleets' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets",
    subscriptionId: string,
    resourceGroupName: string,
  ): FleetsListByResourceGroup;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.AzureFleet/fleets' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureFleet/fleets",
    subscriptionId: string,
  ): FleetsListBySubscription;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureFleet/fleets/\{name\}/virtualMachineScaleSets' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{name}/virtualMachineScaleSets",
    subscriptionId: string,
    resourceGroupName: string,
    name: string,
  ): FleetsListVirtualMachineScaleSets;
}

export type AzureFleetContext = Client & {
  path: Routes;
};
