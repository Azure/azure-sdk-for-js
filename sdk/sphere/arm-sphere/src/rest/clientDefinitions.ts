// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OperationsListParameters,
  CatalogsGetParameters,
  CatalogsCreateOrUpdateParameters,
  CatalogsUpdateParameters,
  CatalogsDeleteParameters,
  CatalogsListByResourceGroupParameters,
  CatalogsListBySubscriptionParameters,
  CatalogsDeprecatedParameters,
  CatalogsCountDevicesParameters,
  CatalogsListDeviceInsightsParameters,
  CatalogsListDevicesParameters,
  CatalogsListDeploymentsParameters,
  CatalogsListDeviceGroupsParameters,
  CatalogsUploadImageParameters,
  ImagesGetParameters,
  ImagesCreateOrUpdateParameters,
  ImagesDeleteParameters,
  ImagesListByCatalogParameters,
  DeviceGroupsListByProductParameters,
  DeviceGroupsGetParameters,
  DeviceGroupsCreateOrUpdateParameters,
  DeviceGroupsDeleteParameters,
  DeviceGroupsUpdateParameters,
  DeviceGroupsDeprecatedCountDevicesParameters,
  DeviceGroupsCountDevicesParameters,
  DeviceGroupsDeprecatedClaimDevicesParameters,
  DeviceGroupsClaimDevicesParameters,
  CertificatesGetParameters,
  CertificatesListByCatalogParameters,
  CertificatesRetrieveCertChainParameters,
  CertificatesRetrieveProofOfPossessionNonceParameters,
  DeploymentsGetParameters,
  DeploymentsCreateOrUpdateParameters,
  DeploymentsDeleteParameters,
  DeploymentsListByDeviceGroupParameters,
  DevicesGetParameters,
  DevicesCreateOrUpdateParameters,
  DevicesDeleteParameters,
  DevicesUpdateParameters,
  DevicesListByDeviceGroupParameters,
  DevicesDeprecatedGenerateCapabilityImageParameters,
  DevicesGenerateCapabilityImageParameters,
  ProductsListByCatalogParameters,
  ProductsGetParameters,
  ProductsCreateOrUpdateParameters,
  ProductsDeleteParameters,
  ProductsUpdateParameters,
  ProductsGenerateDefaultDeviceGroupsParameters,
  ProductsDeprecatedParameters,
  ProductsCountDevicesParameters,
} from "./parameters.js";
import {
  OperationsList200Response,
  OperationsListDefaultResponse,
  CatalogsGet200Response,
  CatalogsGetDefaultResponse,
  CatalogsCreateOrUpdate200Response,
  CatalogsCreateOrUpdate201Response,
  CatalogsCreateOrUpdateDefaultResponse,
  CatalogsUpdate200Response,
  CatalogsUpdateDefaultResponse,
  CatalogsDeleteOperation200Response,
  CatalogsDeleteOperation202Response,
  CatalogsDeleteOperation204Response,
  CatalogsDeleteOperationDefaultResponse,
  CatalogsListByResourceGroup200Response,
  CatalogsListByResourceGroupDefaultResponse,
  CatalogsListBySubscription200Response,
  CatalogsListBySubscriptionDefaultResponse,
  CatalogsDeprecated200Response,
  CatalogsDeprecatedDefaultResponse,
  CatalogsCountDevices200Response,
  CatalogsCountDevicesDefaultResponse,
  CatalogsListDeviceInsights200Response,
  CatalogsListDeviceInsightsDefaultResponse,
  CatalogsListDevices200Response,
  CatalogsListDevicesDefaultResponse,
  CatalogsListDeployments200Response,
  CatalogsListDeploymentsDefaultResponse,
  CatalogsListDeviceGroups200Response,
  CatalogsListDeviceGroupsDefaultResponse,
  CatalogsUploadImage202Response,
  CatalogsUploadImageDefaultResponse,
  ImagesGet200Response,
  ImagesGetDefaultResponse,
  ImagesCreateOrUpdate200Response,
  ImagesCreateOrUpdate201Response,
  ImagesCreateOrUpdateDefaultResponse,
  ImagesDeleteOperation200Response,
  ImagesDeleteOperation202Response,
  ImagesDeleteOperation204Response,
  ImagesDeleteOperationDefaultResponse,
  ImagesListByCatalog200Response,
  ImagesListByCatalogDefaultResponse,
  DeviceGroupsListByProduct200Response,
  DeviceGroupsListByProductDefaultResponse,
  DeviceGroupsGet200Response,
  DeviceGroupsGetDefaultResponse,
  DeviceGroupsCreateOrUpdate200Response,
  DeviceGroupsCreateOrUpdate201Response,
  DeviceGroupsCreateOrUpdateDefaultResponse,
  DeviceGroupsDeleteOperation200Response,
  DeviceGroupsDeleteOperation202Response,
  DeviceGroupsDeleteOperation204Response,
  DeviceGroupsDeleteOperationDefaultResponse,
  DeviceGroupsUpdate200Response,
  DeviceGroupsUpdate202Response,
  DeviceGroupsUpdateDefaultResponse,
  DeviceGroupsDeprecatedCountDevices200Response,
  DeviceGroupsDeprecatedCountDevicesDefaultResponse,
  DeviceGroupsCountDevices200Response,
  DeviceGroupsCountDevicesDefaultResponse,
  DeviceGroupsDeprecatedClaimDevices202Response,
  DeviceGroupsDeprecatedClaimDevicesDefaultResponse,
  DeviceGroupsClaimDevices202Response,
  DeviceGroupsClaimDevicesDefaultResponse,
  CertificatesGet200Response,
  CertificatesGetDefaultResponse,
  CertificatesListByCatalog200Response,
  CertificatesListByCatalogDefaultResponse,
  CertificatesRetrieveCertChain200Response,
  CertificatesRetrieveCertChainDefaultResponse,
  CertificatesRetrieveProofOfPossessionNonce200Response,
  CertificatesRetrieveProofOfPossessionNonceDefaultResponse,
  DeploymentsGet200Response,
  DeploymentsGetDefaultResponse,
  DeploymentsCreateOrUpdate200Response,
  DeploymentsCreateOrUpdate201Response,
  DeploymentsCreateOrUpdateDefaultResponse,
  DeploymentsDeleteOperation200Response,
  DeploymentsDeleteOperation202Response,
  DeploymentsDeleteOperation204Response,
  DeploymentsDeleteOperationDefaultResponse,
  DeploymentsListByDeviceGroup200Response,
  DeploymentsListByDeviceGroupDefaultResponse,
  DevicesGet200Response,
  DevicesGetDefaultResponse,
  DevicesCreateOrUpdate200Response,
  DevicesCreateOrUpdate201Response,
  DevicesCreateOrUpdateDefaultResponse,
  DevicesDeleteOperation200Response,
  DevicesDeleteOperation202Response,
  DevicesDeleteOperation204Response,
  DevicesDeleteOperationDefaultResponse,
  DevicesUpdate200Response,
  DevicesUpdate202Response,
  DevicesUpdateDefaultResponse,
  DevicesListByDeviceGroup200Response,
  DevicesListByDeviceGroupDefaultResponse,
  DevicesDeprecatedGenerateCapabilityImage200Response,
  DevicesDeprecatedGenerateCapabilityImage202Response,
  DevicesDeprecatedGenerateCapabilityImageDefaultResponse,
  DevicesGenerateCapabilityImage200Response,
  DevicesGenerateCapabilityImage202Response,
  DevicesGenerateCapabilityImageDefaultResponse,
  ProductsListByCatalog200Response,
  ProductsListByCatalogDefaultResponse,
  ProductsGet200Response,
  ProductsGetDefaultResponse,
  ProductsCreateOrUpdate200Response,
  ProductsCreateOrUpdate201Response,
  ProductsCreateOrUpdateDefaultResponse,
  ProductsDeleteOperation200Response,
  ProductsDeleteOperation202Response,
  ProductsDeleteOperation204Response,
  ProductsDeleteOperationDefaultResponse,
  ProductsUpdate200Response,
  ProductsUpdate202Response,
  ProductsUpdateDefaultResponse,
  ProductsGenerateDefaultDeviceGroups200Response,
  ProductsGenerateDefaultDeviceGroupsDefaultResponse,
  ProductsDeprecated200Response,
  ProductsDeprecatedDefaultResponse,
  ProductsCountDevices200Response,
  ProductsCountDevicesDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface OperationsList {
  /** List the operations for the provider */
  get(
    options?: OperationsListParameters,
  ): StreamableMethod<
    OperationsList200Response | OperationsListDefaultResponse
  >;
}

export interface CatalogsGet {
  /** Get a Catalog */
  get(
    options?: CatalogsGetParameters,
  ): StreamableMethod<CatalogsGet200Response | CatalogsGetDefaultResponse>;
  /** Create a Catalog */
  put(
    options: CatalogsCreateOrUpdateParameters,
  ): StreamableMethod<
    | CatalogsCreateOrUpdate200Response
    | CatalogsCreateOrUpdate201Response
    | CatalogsCreateOrUpdateDefaultResponse
  >;
  /** Update a Catalog */
  patch(
    options: CatalogsUpdateParameters,
  ): StreamableMethod<
    CatalogsUpdate200Response | CatalogsUpdateDefaultResponse
  >;
  /** Delete a Catalog */
  delete(
    options?: CatalogsDeleteParameters,
  ): StreamableMethod<
    | CatalogsDeleteOperation200Response
    | CatalogsDeleteOperation202Response
    | CatalogsDeleteOperation204Response
    | CatalogsDeleteOperationDefaultResponse
  >;
}

export interface CatalogsListByResourceGroup {
  /** List Catalog resources by resource group */
  get(
    options?: CatalogsListByResourceGroupParameters,
  ): StreamableMethod<
    | CatalogsListByResourceGroup200Response
    | CatalogsListByResourceGroupDefaultResponse
  >;
}

export interface CatalogsListBySubscription {
  /** List Catalog resources by subscription ID */
  get(
    options?: CatalogsListBySubscriptionParameters,
  ): StreamableMethod<
    | CatalogsListBySubscription200Response
    | CatalogsListBySubscriptionDefaultResponse
  >;
}

export interface CatalogsDeprecated {
  /** Counts devices in catalog. */
  post(
    options?: CatalogsDeprecatedParameters,
  ): StreamableMethod<
    CatalogsDeprecated200Response | CatalogsDeprecatedDefaultResponse
  >;
  /** Counts devices in catalog. */
  post(
    options?: CatalogsCountDevicesParameters,
  ): StreamableMethod<
    CatalogsCountDevices200Response | CatalogsCountDevicesDefaultResponse
  >;
}

export interface CatalogsListDeviceInsights {
  /** Lists device insights for catalog. */
  post(
    options?: CatalogsListDeviceInsightsParameters,
  ): StreamableMethod<
    | CatalogsListDeviceInsights200Response
    | CatalogsListDeviceInsightsDefaultResponse
  >;
}

export interface CatalogsListDevices {
  /** Lists devices for catalog. */
  post(
    options?: CatalogsListDevicesParameters,
  ): StreamableMethod<
    CatalogsListDevices200Response | CatalogsListDevicesDefaultResponse
  >;
}

export interface CatalogsListDeployments {
  /** Lists deployments for catalog. */
  post(
    options?: CatalogsListDeploymentsParameters,
  ): StreamableMethod<
    CatalogsListDeployments200Response | CatalogsListDeploymentsDefaultResponse
  >;
}

export interface CatalogsListDeviceGroups {
  /** List the device groups for the catalog. */
  post(
    options: CatalogsListDeviceGroupsParameters,
  ): StreamableMethod<
    | CatalogsListDeviceGroups200Response
    | CatalogsListDeviceGroupsDefaultResponse
  >;
}

export interface CatalogsUploadImage {
  /** Creates an image. Use this action when the image ID is unknown. */
  post(
    options: CatalogsUploadImageParameters,
  ): StreamableMethod<
    CatalogsUploadImage202Response | CatalogsUploadImageDefaultResponse
  >;
}

export interface ImagesGet {
  /** Get a Image */
  get(
    options?: ImagesGetParameters,
  ): StreamableMethod<ImagesGet200Response | ImagesGetDefaultResponse>;
  /** Create a Image */
  put(
    options: ImagesCreateOrUpdateParameters,
  ): StreamableMethod<
    | ImagesCreateOrUpdate200Response
    | ImagesCreateOrUpdate201Response
    | ImagesCreateOrUpdateDefaultResponse
  >;
  /** Delete a Image */
  delete(
    options?: ImagesDeleteParameters,
  ): StreamableMethod<
    | ImagesDeleteOperation200Response
    | ImagesDeleteOperation202Response
    | ImagesDeleteOperation204Response
    | ImagesDeleteOperationDefaultResponse
  >;
}

export interface ImagesListByCatalog {
  /** List Image resources by Catalog */
  get(
    options?: ImagesListByCatalogParameters,
  ): StreamableMethod<
    ImagesListByCatalog200Response | ImagesListByCatalogDefaultResponse
  >;
}

export interface DeviceGroupsListByProduct {
  /** List DeviceGroup resources by Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
  get(
    options?: DeviceGroupsListByProductParameters,
  ): StreamableMethod<
    | DeviceGroupsListByProduct200Response
    | DeviceGroupsListByProductDefaultResponse
  >;
}

export interface DeviceGroupsGet {
  /** Get a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
  get(
    options?: DeviceGroupsGetParameters,
  ): StreamableMethod<
    DeviceGroupsGet200Response | DeviceGroupsGetDefaultResponse
  >;
  /** Create a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
  put(
    options: DeviceGroupsCreateOrUpdateParameters,
  ): StreamableMethod<
    | DeviceGroupsCreateOrUpdate200Response
    | DeviceGroupsCreateOrUpdate201Response
    | DeviceGroupsCreateOrUpdateDefaultResponse
  >;
  /** Delete a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
  delete(
    options?: DeviceGroupsDeleteParameters,
  ): StreamableMethod<
    | DeviceGroupsDeleteOperation200Response
    | DeviceGroupsDeleteOperation202Response
    | DeviceGroupsDeleteOperation204Response
    | DeviceGroupsDeleteOperationDefaultResponse
  >;
  /** Update a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
  patch(
    options: DeviceGroupsUpdateParameters,
  ): StreamableMethod<
    | DeviceGroupsUpdate200Response
    | DeviceGroupsUpdate202Response
    | DeviceGroupsUpdateDefaultResponse
  >;
}

export interface DeviceGroupsDeprecatedCountDevices {
  /** Counts devices in device group. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
  post(
    options?: DeviceGroupsDeprecatedCountDevicesParameters,
  ): StreamableMethod<
    | DeviceGroupsDeprecatedCountDevices200Response
    | DeviceGroupsDeprecatedCountDevicesDefaultResponse
  >;
  /** Counts devices in device group. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
  post(
    options?: DeviceGroupsCountDevicesParameters,
  ): StreamableMethod<
    | DeviceGroupsCountDevices200Response
    | DeviceGroupsCountDevicesDefaultResponse
  >;
}

export interface DeviceGroupsDeprecatedClaimDevices {
  /** Bulk claims the devices. Use '.unassigned' or '.default' for the device group and product names when bulk claiming devices to a catalog only. */
  post(
    options: DeviceGroupsDeprecatedClaimDevicesParameters,
  ): StreamableMethod<
    | DeviceGroupsDeprecatedClaimDevices202Response
    | DeviceGroupsDeprecatedClaimDevicesDefaultResponse
  >;
  /** Bulk claims the devices. Use '.unassigned' or '.default' for the device group and product names when bulk claiming devices to a catalog only. */
  post(
    options: DeviceGroupsClaimDevicesParameters,
  ): StreamableMethod<
    | DeviceGroupsClaimDevices202Response
    | DeviceGroupsClaimDevicesDefaultResponse
  >;
}

export interface CertificatesGet {
  /** Get a Certificate */
  get(
    options?: CertificatesGetParameters,
  ): StreamableMethod<
    CertificatesGet200Response | CertificatesGetDefaultResponse
  >;
}

export interface CertificatesListByCatalog {
  /** List Certificate resources by Catalog */
  get(
    options?: CertificatesListByCatalogParameters,
  ): StreamableMethod<
    | CertificatesListByCatalog200Response
    | CertificatesListByCatalogDefaultResponse
  >;
}

export interface CertificatesRetrieveCertChain {
  /** Retrieves cert chain. */
  post(
    options?: CertificatesRetrieveCertChainParameters,
  ): StreamableMethod<
    | CertificatesRetrieveCertChain200Response
    | CertificatesRetrieveCertChainDefaultResponse
  >;
}

export interface CertificatesRetrieveProofOfPossessionNonce {
  /** Gets the proof of possession nonce. */
  post(
    options: CertificatesRetrieveProofOfPossessionNonceParameters,
  ): StreamableMethod<
    | CertificatesRetrieveProofOfPossessionNonce200Response
    | CertificatesRetrieveProofOfPossessionNonceDefaultResponse
  >;
}

export interface DeploymentsGet {
  /** Get a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
  get(
    options?: DeploymentsGetParameters,
  ): StreamableMethod<
    DeploymentsGet200Response | DeploymentsGetDefaultResponse
  >;
  /** Create a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
  put(
    options: DeploymentsCreateOrUpdateParameters,
  ): StreamableMethod<
    | DeploymentsCreateOrUpdate200Response
    | DeploymentsCreateOrUpdate201Response
    | DeploymentsCreateOrUpdateDefaultResponse
  >;
  /** Delete a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
  delete(
    options?: DeploymentsDeleteParameters,
  ): StreamableMethod<
    | DeploymentsDeleteOperation200Response
    | DeploymentsDeleteOperation202Response
    | DeploymentsDeleteOperation204Response
    | DeploymentsDeleteOperationDefaultResponse
  >;
}

export interface DeploymentsListByDeviceGroup {
  /** List Deployment resources by DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
  get(
    options?: DeploymentsListByDeviceGroupParameters,
  ): StreamableMethod<
    | DeploymentsListByDeviceGroup200Response
    | DeploymentsListByDeviceGroupDefaultResponse
  >;
}

export interface DevicesGet {
  /** Get a Device. Use '.unassigned' or '.default' for the device group and product names when a device does not belong to a device group and product. */
  get(
    options?: DevicesGetParameters,
  ): StreamableMethod<DevicesGet200Response | DevicesGetDefaultResponse>;
  /** Create a Device. Use '.unassigned' or '.default' for the device group and product names to claim a device to the catalog only. */
  put(
    options: DevicesCreateOrUpdateParameters,
  ): StreamableMethod<
    | DevicesCreateOrUpdate200Response
    | DevicesCreateOrUpdate201Response
    | DevicesCreateOrUpdateDefaultResponse
  >;
  /** Delete a Device */
  delete(
    options?: DevicesDeleteParameters,
  ): StreamableMethod<
    | DevicesDeleteOperation200Response
    | DevicesDeleteOperation202Response
    | DevicesDeleteOperation204Response
    | DevicesDeleteOperationDefaultResponse
  >;
  /** Update a Device. Use '.unassigned' or '.default' for the device group and product names to move a device to the catalog level. */
  patch(
    options: DevicesUpdateParameters,
  ): StreamableMethod<
    | DevicesUpdate200Response
    | DevicesUpdate202Response
    | DevicesUpdateDefaultResponse
  >;
}

export interface DevicesListByDeviceGroup {
  /** List Device resources by DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
  get(
    options?: DevicesListByDeviceGroupParameters,
  ): StreamableMethod<
    | DevicesListByDeviceGroup200Response
    | DevicesListByDeviceGroupDefaultResponse
  >;
}

export interface DevicesDeprecatedGenerateCapabilityImage {
  /** Generates the capability image for the device. Use '.unassigned' or '.default' for the device group and product names to generate the image for a device that does not belong to a specific device group and product. */
  post(
    options: DevicesDeprecatedGenerateCapabilityImageParameters,
  ): StreamableMethod<
    | DevicesDeprecatedGenerateCapabilityImage200Response
    | DevicesDeprecatedGenerateCapabilityImage202Response
    | DevicesDeprecatedGenerateCapabilityImageDefaultResponse
  >;
  /** Generates the capability image for the device. Use '.unassigned' or '.default' for the device group and product names to generate the image for a device that does not belong to a specific device group and product. */
  post(
    options: DevicesGenerateCapabilityImageParameters,
  ): StreamableMethod<
    | DevicesGenerateCapabilityImage200Response
    | DevicesGenerateCapabilityImage202Response
    | DevicesGenerateCapabilityImageDefaultResponse
  >;
}

export interface ProductsListByCatalog {
  /** List Product resources by Catalog */
  get(
    options?: ProductsListByCatalogParameters,
  ): StreamableMethod<
    ProductsListByCatalog200Response | ProductsListByCatalogDefaultResponse
  >;
}

export interface ProductsGet {
  /** Get a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
  get(
    options?: ProductsGetParameters,
  ): StreamableMethod<ProductsGet200Response | ProductsGetDefaultResponse>;
  /** Create a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
  put(
    options: ProductsCreateOrUpdateParameters,
  ): StreamableMethod<
    | ProductsCreateOrUpdate200Response
    | ProductsCreateOrUpdate201Response
    | ProductsCreateOrUpdateDefaultResponse
  >;
  /** Delete a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name' */
  delete(
    options?: ProductsDeleteParameters,
  ): StreamableMethod<
    | ProductsDeleteOperation200Response
    | ProductsDeleteOperation202Response
    | ProductsDeleteOperation204Response
    | ProductsDeleteOperationDefaultResponse
  >;
  /** Update a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
  patch(
    options: ProductsUpdateParameters,
  ): StreamableMethod<
    | ProductsUpdate200Response
    | ProductsUpdate202Response
    | ProductsUpdateDefaultResponse
  >;
}

export interface ProductsGenerateDefaultDeviceGroups {
  /** Generates default device groups for the product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
  post(
    options?: ProductsGenerateDefaultDeviceGroupsParameters,
  ): StreamableMethod<
    | ProductsGenerateDefaultDeviceGroups200Response
    | ProductsGenerateDefaultDeviceGroupsDefaultResponse
  >;
}

export interface ProductsDeprecated {
  /** Counts devices in product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
  post(
    options?: ProductsDeprecatedParameters,
  ): StreamableMethod<
    ProductsDeprecated200Response | ProductsDeprecatedDefaultResponse
  >;
  /** Counts devices in product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
  post(
    options?: ProductsCountDevicesParameters,
  ): StreamableMethod<
    ProductsCountDevices200Response | ProductsCountDevicesDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/providers/Microsoft.AzureSphere/operations' has methods for the following verbs: get */
  (path: "/providers/Microsoft.AzureSphere/operations"): OperationsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
  ): CatalogsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs",
    subscriptionId: string,
    resourceGroupName: string,
  ): CatalogsListByResourceGroup;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.AzureSphere/catalogs' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureSphere/catalogs",
    subscriptionId: string,
  ): CatalogsListBySubscription;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/countDevices' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/countDevices",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
  ): CatalogsDeprecated;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/listDeviceInsights' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/listDeviceInsights",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
  ): CatalogsListDeviceInsights;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/listDevices' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/listDevices",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
  ): CatalogsListDevices;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/listDeployments' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/listDeployments",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
  ): CatalogsListDeployments;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/listDeviceGroups' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/listDeviceGroups",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
  ): CatalogsListDeviceGroups;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/uploadImage' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/uploadImage",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
  ): CatalogsUploadImage;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/images/\{imageName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/images/{imageName}",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    imageName: string,
  ): ImagesGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/images' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/images",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
  ): ImagesListByCatalog;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/products/\{productName\}/deviceGroups' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
  ): DeviceGroupsListByProduct;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/products/\{productName\}/deviceGroups/\{deviceGroupName\}' has methods for the following verbs: get, put, delete, patch */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
  ): DeviceGroupsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/products/\{productName\}/deviceGroups/\{deviceGroupName\}/countDevices' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/countDevices",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
  ): DeviceGroupsDeprecatedCountDevices;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/products/\{productName\}/deviceGroups/\{deviceGroupName\}/claimDevices' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/claimDevices",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
  ): DeviceGroupsDeprecatedClaimDevices;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/certificates/\{serialNumber\}' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/certificates/{serialNumber}",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    serialNumber: string,
  ): CertificatesGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/certificates' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/certificates",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
  ): CertificatesListByCatalog;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/certificates/\{serialNumber\}/retrieveCertChain' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/certificates/{serialNumber}/retrieveCertChain",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    serialNumber: string,
  ): CertificatesRetrieveCertChain;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/certificates/\{serialNumber\}/retrieveProofOfPossessionNonce' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/certificates/{serialNumber}/retrieveProofOfPossessionNonce",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    serialNumber: string,
  ): CertificatesRetrieveProofOfPossessionNonce;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/products/\{productName\}/deviceGroups/\{deviceGroupName\}/deployments/\{deploymentName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/deployments/{deploymentName}",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    deploymentName: string,
  ): DeploymentsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/products/\{productName\}/deviceGroups/\{deviceGroupName\}/deployments' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/deployments",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
  ): DeploymentsListByDeviceGroup;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/products/\{productName\}/deviceGroups/\{deviceGroupName\}/devices/\{deviceName\}' has methods for the following verbs: get, put, delete, patch */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/devices/{deviceName}",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    deviceName: string,
  ): DevicesGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/products/\{productName\}/deviceGroups/\{deviceGroupName\}/devices' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/devices",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
  ): DevicesListByDeviceGroup;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/products/\{productName\}/deviceGroups/\{deviceGroupName\}/devices/\{deviceName\}/generateCapabilityImage' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/devices/{deviceName}/generateCapabilityImage",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    deviceName: string,
  ): DevicesDeprecatedGenerateCapabilityImage;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/products' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
  ): ProductsListByCatalog;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/products/\{productName\}' has methods for the following verbs: get, put, delete, patch */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
  ): ProductsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/products/\{productName\}/generateDefaultDeviceGroups' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/generateDefaultDeviceGroups",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
  ): ProductsGenerateDefaultDeviceGroups;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.AzureSphere/catalogs/\{catalogName\}/products/\{productName\}/countDevices' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/countDevices",
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
  ): ProductsDeprecated;
}

export type AzureSphereContext = Client & {
  path: Routes;
};
