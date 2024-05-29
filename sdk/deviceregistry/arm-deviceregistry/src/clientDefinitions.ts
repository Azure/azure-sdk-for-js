// Licensed under the MIT license.

import {
  OperationsListParameters,
  OperationStatusGetParameters,
  AssetsGetParameters,
  AssetsCreateOrReplaceParameters,
  AssetsUpdateParameters,
  AssetsDeleteParameters,
  AssetsListByResourceGroupParameters,
  AssetsListBySubscriptionParameters,
  AssetEndpointProfilesGetParameters,
  AssetEndpointProfilesCreateOrReplaceParameters,
  AssetEndpointProfilesUpdateParameters,
  AssetEndpointProfilesDeleteParameters,
  AssetEndpointProfilesListByResourceGroupParameters,
  AssetEndpointProfilesListBySubscriptionParameters,
} from "./parameters.js";
import {
  OperationsList200Response,
  OperationsListDefaultResponse,
  OperationStatusGet200Response,
  OperationStatusGetDefaultResponse,
  AssetsGet200Response,
  AssetsGetDefaultResponse,
  AssetsCreateOrReplace200Response,
  AssetsCreateOrReplace201Response,
  AssetsCreateOrReplaceDefaultResponse,
  AssetsUpdate200Response,
  AssetsUpdate202Response,
  AssetsUpdateDefaultResponse,
  AssetsDelete202Response,
  AssetsDelete204Response,
  AssetsDeleteDefaultResponse,
  AssetsListByResourceGroup200Response,
  AssetsListByResourceGroupDefaultResponse,
  AssetsListBySubscription200Response,
  AssetsListBySubscriptionDefaultResponse,
  AssetEndpointProfilesGet200Response,
  AssetEndpointProfilesGetDefaultResponse,
  AssetEndpointProfilesCreateOrReplace200Response,
  AssetEndpointProfilesCreateOrReplace201Response,
  AssetEndpointProfilesCreateOrReplaceDefaultResponse,
  AssetEndpointProfilesUpdate200Response,
  AssetEndpointProfilesUpdate202Response,
  AssetEndpointProfilesUpdateDefaultResponse,
  AssetEndpointProfilesDelete202Response,
  AssetEndpointProfilesDelete204Response,
  AssetEndpointProfilesDeleteDefaultResponse,
  AssetEndpointProfilesListByResourceGroup200Response,
  AssetEndpointProfilesListByResourceGroupDefaultResponse,
  AssetEndpointProfilesListBySubscription200Response,
  AssetEndpointProfilesListBySubscriptionDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@typespec/ts-http-runtime";

export interface OperationsList {
  /** List the operations for the provider */
  get(
    options?: OperationsListParameters,
  ): StreamableMethod<
    OperationsList200Response | OperationsListDefaultResponse
  >;
}

export interface OperationStatusGet {
  /** Returns the current status of an async operation. */
  get(
    options?: OperationStatusGetParameters,
  ): StreamableMethod<
    OperationStatusGet200Response | OperationStatusGetDefaultResponse
  >;
}

export interface AssetsGet {
  /** Get a Asset */
  get(
    options?: AssetsGetParameters,
  ): StreamableMethod<AssetsGet200Response | AssetsGetDefaultResponse>;
  /** Create a Asset */
  put(
    options: AssetsCreateOrReplaceParameters,
  ): StreamableMethod<
    | AssetsCreateOrReplace200Response
    | AssetsCreateOrReplace201Response
    | AssetsCreateOrReplaceDefaultResponse
  >;
  /** Update a Asset */
  patch(
    options: AssetsUpdateParameters,
  ): StreamableMethod<
    | AssetsUpdate200Response
    | AssetsUpdate202Response
    | AssetsUpdateDefaultResponse
  >;
  /** Delete a Asset */
  delete(
    options?: AssetsDeleteParameters,
  ): StreamableMethod<
    | AssetsDelete202Response
    | AssetsDelete204Response
    | AssetsDeleteDefaultResponse
  >;
}

export interface AssetsListByResourceGroup {
  /** List Asset resources by resource group */
  get(
    options?: AssetsListByResourceGroupParameters,
  ): StreamableMethod<
    | AssetsListByResourceGroup200Response
    | AssetsListByResourceGroupDefaultResponse
  >;
}

export interface AssetsListBySubscription {
  /** List Asset resources by subscription ID */
  get(
    options?: AssetsListBySubscriptionParameters,
  ): StreamableMethod<
    | AssetsListBySubscription200Response
    | AssetsListBySubscriptionDefaultResponse
  >;
}

export interface AssetEndpointProfilesGet {
  /** Get a AssetEndpointProfile */
  get(
    options?: AssetEndpointProfilesGetParameters,
  ): StreamableMethod<
    | AssetEndpointProfilesGet200Response
    | AssetEndpointProfilesGetDefaultResponse
  >;
  /** Create a AssetEndpointProfile */
  put(
    options: AssetEndpointProfilesCreateOrReplaceParameters,
  ): StreamableMethod<
    | AssetEndpointProfilesCreateOrReplace200Response
    | AssetEndpointProfilesCreateOrReplace201Response
    | AssetEndpointProfilesCreateOrReplaceDefaultResponse
  >;
  /** Update a AssetEndpointProfile */
  patch(
    options: AssetEndpointProfilesUpdateParameters,
  ): StreamableMethod<
    | AssetEndpointProfilesUpdate200Response
    | AssetEndpointProfilesUpdate202Response
    | AssetEndpointProfilesUpdateDefaultResponse
  >;
  /** Delete a AssetEndpointProfile */
  delete(
    options?: AssetEndpointProfilesDeleteParameters,
  ): StreamableMethod<
    | AssetEndpointProfilesDelete202Response
    | AssetEndpointProfilesDelete204Response
    | AssetEndpointProfilesDeleteDefaultResponse
  >;
}

export interface AssetEndpointProfilesListByResourceGroup {
  /** List AssetEndpointProfile resources by resource group */
  get(
    options?: AssetEndpointProfilesListByResourceGroupParameters,
  ): StreamableMethod<
    | AssetEndpointProfilesListByResourceGroup200Response
    | AssetEndpointProfilesListByResourceGroupDefaultResponse
  >;
}

export interface AssetEndpointProfilesListBySubscription {
  /** List AssetEndpointProfile resources by subscription ID */
  get(
    options?: AssetEndpointProfilesListBySubscriptionParameters,
  ): StreamableMethod<
    | AssetEndpointProfilesListBySubscription200Response
    | AssetEndpointProfilesListBySubscriptionDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/providers/Microsoft.DeviceRegistry/operations' has methods for the following verbs: get */
  (path: "/providers/Microsoft.DeviceRegistry/operations"): OperationsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.DeviceRegistry/locations/\{location\}/operationStatuses/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/locations/{location}/operationStatuses/{operationId}",
    subscriptionId: string,
    location: string,
    operationId: string,
  ): OperationStatusGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.DeviceRegistry/assets/\{assetName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets/{assetName}",
    subscriptionId: string,
    resourceGroupName: string,
    assetName: string,
  ): AssetsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.DeviceRegistry/assets' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets",
    subscriptionId: string,
    resourceGroupName: string,
  ): AssetsListByResourceGroup;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.DeviceRegistry/assets' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/assets",
    subscriptionId: string,
  ): AssetsListBySubscription;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles/\{assetEndpointProfileName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles/{assetEndpointProfileName}",
    subscriptionId: string,
    resourceGroupName: string,
    assetEndpointProfileName: string,
  ): AssetEndpointProfilesGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles",
    subscriptionId: string,
    resourceGroupName: string,
  ): AssetEndpointProfilesListByResourceGroup;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles",
    subscriptionId: string,
  ): AssetEndpointProfilesListBySubscription;
}

export type DeviceRegistryClient = Client & {
  path: Routes;
};
