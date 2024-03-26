// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  Catalog,
  CatalogUpdate,
  ListDeviceGroupsRequest,
  Image,
  DeviceGroup,
  DeviceGroupUpdate,
  ClaimDevicesRequest,
  ProofOfPossessionNonceRequest,
  Deployment,
  Device,
  DeviceUpdate,
  GenerateCapabilityImageRequest,
  Product,
  ProductUpdate,
} from "./models.js";

export type OperationsListParameters = RequestParameters;
export type CatalogsGetParameters = RequestParameters;

export interface CatalogsCreateOrUpdateBodyParam {
  /** Resource create parameters. */
  body: Catalog;
}

export type CatalogsCreateOrUpdateParameters = CatalogsCreateOrUpdateBodyParam &
  RequestParameters;

export interface CatalogsUpdateBodyParam {
  /** The resource properties to be updated. */
  body: CatalogUpdate;
}

export type CatalogsUpdateParameters = CatalogsUpdateBodyParam &
  RequestParameters;
export type CatalogsDeleteParameters = RequestParameters;
export type CatalogsListByResourceGroupParameters = RequestParameters;
export type CatalogsListBySubscriptionParameters = RequestParameters;
export type CatalogsDeprecatedParameters = RequestParameters;
export type CatalogsCountDevicesParameters = RequestParameters;

export interface CatalogsListDeviceInsightsQueryParamProperties {
  /** Filter the result list using the given expression */
  $filter?: string;
  /** The number of result items to return. */
  $top?: number;
  /** The number of result items to skip. */
  $skip?: number;
  /** The maximum number of result items per page. */
  $maxpagesize?: number;
}

export interface CatalogsListDeviceInsightsQueryParam {
  queryParameters?: CatalogsListDeviceInsightsQueryParamProperties;
}

export type CatalogsListDeviceInsightsParameters =
  CatalogsListDeviceInsightsQueryParam & RequestParameters;

export interface CatalogsListDevicesQueryParamProperties {
  /** Filter the result list using the given expression */
  $filter?: string;
  /** The number of result items to return. */
  $top?: number;
  /** The number of result items to skip. */
  $skip?: number;
  /** The maximum number of result items per page. */
  $maxpagesize?: number;
}

export interface CatalogsListDevicesQueryParam {
  queryParameters?: CatalogsListDevicesQueryParamProperties;
}

export type CatalogsListDevicesParameters = CatalogsListDevicesQueryParam &
  RequestParameters;

export interface CatalogsListDeploymentsQueryParamProperties {
  /** Filter the result list using the given expression */
  $filter?: string;
  /** The number of result items to return. */
  $top?: number;
  /** The number of result items to skip. */
  $skip?: number;
  /** The maximum number of result items per page. */
  $maxpagesize?: number;
}

export interface CatalogsListDeploymentsQueryParam {
  queryParameters?: CatalogsListDeploymentsQueryParamProperties;
}

export type CatalogsListDeploymentsParameters =
  CatalogsListDeploymentsQueryParam & RequestParameters;

export interface CatalogsListDeviceGroupsBodyParam {
  /** List device groups for catalog. */
  body: ListDeviceGroupsRequest;
}

export interface CatalogsListDeviceGroupsQueryParamProperties {
  /** Filter the result list using the given expression */
  $filter?: string;
  /** The number of result items to return. */
  $top?: number;
  /** The number of result items to skip. */
  $skip?: number;
  /** The maximum number of result items per page. */
  $maxpagesize?: number;
}

export interface CatalogsListDeviceGroupsQueryParam {
  queryParameters?: CatalogsListDeviceGroupsQueryParamProperties;
}

export type CatalogsListDeviceGroupsParameters =
  CatalogsListDeviceGroupsQueryParam &
    CatalogsListDeviceGroupsBodyParam &
    RequestParameters;

export interface CatalogsUploadImageBodyParam {
  /** Image upload request body. */
  body: Image;
}

export type CatalogsUploadImageParameters = CatalogsUploadImageBodyParam &
  RequestParameters;
export type ImagesGetParameters = RequestParameters;

export interface ImagesListByCatalogQueryParamProperties {
  /** Filter the result list using the given expression */
  $filter?: string;
  /** The number of result items to return. */
  $top?: number;
  /** The number of result items to skip. */
  $skip?: number;
  /** The maximum number of result items per page. */
  $maxpagesize?: number;
}

export interface ImagesListByCatalogQueryParam {
  queryParameters?: ImagesListByCatalogQueryParamProperties;
}

export type ImagesListByCatalogParameters = ImagesListByCatalogQueryParam &
  RequestParameters;

export interface ImagesCreateOrUpdateBodyParam {
  /** Resource create parameters. */
  body: Image;
}

export type ImagesCreateOrUpdateParameters = ImagesCreateOrUpdateBodyParam &
  RequestParameters;
export type ImagesDeleteParameters = RequestParameters;

export interface DeviceGroupsListByProductQueryParamProperties {
  /** Filter the result list using the given expression */
  $filter?: string;
  /** The number of result items to return. */
  $top?: number;
  /** The number of result items to skip. */
  $skip?: number;
  /** The maximum number of result items per page. */
  $maxpagesize?: number;
}

export interface DeviceGroupsListByProductQueryParam {
  queryParameters?: DeviceGroupsListByProductQueryParamProperties;
}

export type DeviceGroupsListByProductParameters =
  DeviceGroupsListByProductQueryParam & RequestParameters;
export type DeviceGroupsGetParameters = RequestParameters;

export interface DeviceGroupsCreateOrUpdateBodyParam {
  /** Resource create parameters. */
  body: DeviceGroup;
}

export type DeviceGroupsCreateOrUpdateParameters =
  DeviceGroupsCreateOrUpdateBodyParam & RequestParameters;
export type DeviceGroupsDeleteParameters = RequestParameters;

export interface DeviceGroupsUpdateBodyParam {
  /** The resource properties to be updated. */
  body: DeviceGroupUpdate;
}

export type DeviceGroupsUpdateParameters = DeviceGroupsUpdateBodyParam &
  RequestParameters;
export type DeviceGroupsDeprecatedCountDevicesParameters = RequestParameters;
export type DeviceGroupsCountDevicesParameters = RequestParameters;

export interface DeviceGroupsDeprecatedClaimDevicesBodyParam {
  /** Bulk claim devices request body. */
  body: ClaimDevicesRequest;
}

export type DeviceGroupsDeprecatedClaimDevicesParameters =
  DeviceGroupsDeprecatedClaimDevicesBodyParam & RequestParameters;

export interface DeviceGroupsClaimDevicesBodyParam {
  /** Bulk claim devices request body. */
  body: ClaimDevicesRequest;
}

export type DeviceGroupsClaimDevicesParameters =
  DeviceGroupsClaimDevicesBodyParam & RequestParameters;
export type CertificatesGetParameters = RequestParameters;

export interface CertificatesListByCatalogQueryParamProperties {
  /** Filter the result list using the given expression */
  $filter?: string;
  /** The number of result items to return. */
  $top?: number;
  /** The number of result items to skip. */
  $skip?: number;
  /** The maximum number of result items per page. */
  $maxpagesize?: number;
}

export interface CertificatesListByCatalogQueryParam {
  queryParameters?: CertificatesListByCatalogQueryParamProperties;
}

export type CertificatesListByCatalogParameters =
  CertificatesListByCatalogQueryParam & RequestParameters;
export type CertificatesRetrieveCertChainParameters = RequestParameters;

export interface CertificatesRetrieveProofOfPossessionNonceBodyParam {
  /** Proof of possession nonce request body */
  body: ProofOfPossessionNonceRequest;
}

export type CertificatesRetrieveProofOfPossessionNonceParameters =
  CertificatesRetrieveProofOfPossessionNonceBodyParam & RequestParameters;
export type DeploymentsGetParameters = RequestParameters;

export interface DeploymentsListByDeviceGroupQueryParamProperties {
  /** Filter the result list using the given expression */
  $filter?: string;
  /** The number of result items to return. */
  $top?: number;
  /** The number of result items to skip. */
  $skip?: number;
  /** The maximum number of result items per page. */
  $maxpagesize?: number;
}

export interface DeploymentsListByDeviceGroupQueryParam {
  queryParameters?: DeploymentsListByDeviceGroupQueryParamProperties;
}

export type DeploymentsListByDeviceGroupParameters =
  DeploymentsListByDeviceGroupQueryParam & RequestParameters;

export interface DeploymentsCreateOrUpdateBodyParam {
  /** Resource create parameters. */
  body: Deployment;
}

export type DeploymentsCreateOrUpdateParameters =
  DeploymentsCreateOrUpdateBodyParam & RequestParameters;
export type DeploymentsDeleteParameters = RequestParameters;
export type DevicesGetParameters = RequestParameters;

export interface DevicesCreateOrUpdateBodyParam {
  /** Resource create parameters. */
  body: Device;
}

export type DevicesCreateOrUpdateParameters = DevicesCreateOrUpdateBodyParam &
  RequestParameters;
export type DevicesListByDeviceGroupParameters = RequestParameters;
export type DevicesDeleteParameters = RequestParameters;

export interface DevicesUpdateBodyParam {
  /** The resource properties to be updated. */
  body: DeviceUpdate;
}

export type DevicesUpdateParameters = DevicesUpdateBodyParam &
  RequestParameters;

export interface DevicesDeprecatedGenerateCapabilityImageBodyParam {
  /** Generate capability image request body. */
  body: GenerateCapabilityImageRequest;
}

export type DevicesDeprecatedGenerateCapabilityImageParameters =
  DevicesDeprecatedGenerateCapabilityImageBodyParam & RequestParameters;

export interface DevicesGenerateCapabilityImageBodyParam {
  /** Generate capability image request body. */
  body: GenerateCapabilityImageRequest;
}

export type DevicesGenerateCapabilityImageParameters =
  DevicesGenerateCapabilityImageBodyParam & RequestParameters;
export type ProductsListByCatalogParameters = RequestParameters;
export type ProductsGetParameters = RequestParameters;

export interface ProductsCreateOrUpdateBodyParam {
  /** Resource create parameters. */
  body: Product;
}

export type ProductsCreateOrUpdateParameters = ProductsCreateOrUpdateBodyParam &
  RequestParameters;
export type ProductsDeleteParameters = RequestParameters;

export interface ProductsUpdateBodyParam {
  /** The resource properties to be updated. */
  body: ProductUpdate;
}

export type ProductsUpdateParameters = ProductsUpdateBodyParam &
  RequestParameters;
export type ProductsGenerateDefaultDeviceGroupsParameters = RequestParameters;
export type ProductsDeprecatedParameters = RequestParameters;
export type ProductsCountDevicesParameters = RequestParameters;
