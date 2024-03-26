// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  PagedOperationOutput,
  ErrorResponseOutput,
  CatalogOutput,
  CatalogListResultOutput,
  CountDeviceResponseOutput,
  CountDevicesResponseOutput,
  PagedDeviceInsightOutput,
  DeviceListResultOutput,
  DeploymentListResultOutput,
  DeviceGroupListResultOutput,
  ImageOutput,
  ImageListResultOutput,
  DeviceGroupOutput,
  CertificateOutput,
  CertificateListResultOutput,
  CertificateChainResponseOutput,
  ProofOfPossessionNonceResponseOutput,
  DeploymentOutput,
  DeviceOutput,
  SignedCapabilityImageResponseOutput,
  ProductListResultOutput,
  ProductOutput,
} from "./outputModels.js";

/** Azure operation completed successfully. */
export interface OperationsList200Response extends HttpResponse {
  status: "200";
  body: PagedOperationOutput;
}

export interface OperationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface CatalogsGet200Response extends HttpResponse {
  status: "200";
  body: CatalogOutput;
}

export interface CatalogsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource 'Catalog' update operation succeeded */
export interface CatalogsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: CatalogOutput;
}

export interface CatalogsCreateOrUpdate201Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource 'Catalog' create operation succeeded */
export interface CatalogsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: CatalogOutput;
  headers: RawHttpHeaders & CatalogsCreateOrUpdate201Headers;
}

export interface CatalogsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running createOrUpdate operation */
export interface CatalogsCreateOrUpdateLogicalResponse extends HttpResponse {
  status: "200";
  body: CatalogOutput;
}

/** Azure operation completed successfully. */
export interface CatalogsUpdate200Response extends HttpResponse {
  status: "200";
  body: CatalogOutput;
}

export interface CatalogsUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource deleted successfully. */
export interface CatalogsDeleteOperation200Response extends HttpResponse {
  status: "200";
}

export interface CatalogsDeleteOperation202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
}

/** Resource deletion accepted. */
export interface CatalogsDeleteOperation202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & CatalogsDeleteOperation202Headers;
}

/** Resource does not exist. */
export interface CatalogsDeleteOperation204Response extends HttpResponse {
  status: "204";
}

export interface CatalogsDeleteOperationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running delete operation */
export interface CatalogsDeleteLogicalResponse extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface CatalogsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: CatalogListResultOutput;
}

export interface CatalogsListByResourceGroupDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface CatalogsListBySubscription200Response extends HttpResponse {
  status: "200";
  body: CatalogListResultOutput;
}

export interface CatalogsListBySubscriptionDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface CatalogsDeprecated200Response extends HttpResponse {
  status: "200";
  body: CountDeviceResponseOutput;
}

export interface CatalogsDeprecatedDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface CatalogsCountDevices200Response extends HttpResponse {
  status: "200";
  body: CountDevicesResponseOutput;
}

export interface CatalogsCountDevicesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface CatalogsListDeviceInsights200Response extends HttpResponse {
  status: "200";
  body: PagedDeviceInsightOutput;
}

export interface CatalogsListDeviceInsightsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface CatalogsListDevices200Response extends HttpResponse {
  status: "200";
  body: DeviceListResultOutput;
}

export interface CatalogsListDevicesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface CatalogsListDeployments200Response extends HttpResponse {
  status: "200";
  body: DeploymentListResultOutput;
}

export interface CatalogsListDeploymentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface CatalogsListDeviceGroups200Response extends HttpResponse {
  status: "200";
  body: DeviceGroupListResultOutput;
}

export interface CatalogsListDeviceGroupsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface CatalogsUploadImage202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
}

/** Resource operation accepted. */
export interface CatalogsUploadImage202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & CatalogsUploadImage202Headers;
}

export interface CatalogsUploadImageDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running uploadImage operation */
export interface CatalogsUploadImageLogicalResponse extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface ImagesGet200Response extends HttpResponse {
  status: "200";
  body: ImageOutput;
}

export interface ImagesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface ImagesListByCatalog200Response extends HttpResponse {
  status: "200";
  body: ImageListResultOutput;
}

export interface ImagesListByCatalogDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource 'Image' update operation succeeded */
export interface ImagesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ImageOutput;
}

export interface ImagesCreateOrUpdate201Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource 'Image' create operation succeeded */
export interface ImagesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ImageOutput;
  headers: RawHttpHeaders & ImagesCreateOrUpdate201Headers;
}

export interface ImagesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running createOrUpdate operation */
export interface ImagesCreateOrUpdateLogicalResponse extends HttpResponse {
  status: "200";
  body: ImageOutput;
}

/** Resource deleted successfully. */
export interface ImagesDeleteOperation200Response extends HttpResponse {
  status: "200";
}

export interface ImagesDeleteOperation202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
}

/** Resource deletion accepted. */
export interface ImagesDeleteOperation202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & ImagesDeleteOperation202Headers;
}

/** Resource does not exist. */
export interface ImagesDeleteOperation204Response extends HttpResponse {
  status: "204";
}

export interface ImagesDeleteOperationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running delete operation */
export interface ImagesDeleteLogicalResponse extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface DeviceGroupsListByProduct200Response extends HttpResponse {
  status: "200";
  body: DeviceGroupListResultOutput;
}

export interface DeviceGroupsListByProductDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface DeviceGroupsGet200Response extends HttpResponse {
  status: "200";
  body: DeviceGroupOutput;
}

export interface DeviceGroupsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource 'DeviceGroup' update operation succeeded */
export interface DeviceGroupsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: DeviceGroupOutput;
}

export interface DeviceGroupsCreateOrUpdate201Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource 'DeviceGroup' create operation succeeded */
export interface DeviceGroupsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: DeviceGroupOutput;
  headers: RawHttpHeaders & DeviceGroupsCreateOrUpdate201Headers;
}

export interface DeviceGroupsCreateOrUpdateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running createOrUpdate operation */
export interface DeviceGroupsCreateOrUpdateLogicalResponse
  extends HttpResponse {
  status: "200";
  body: DeviceGroupOutput;
}

/** Resource deleted successfully. */
export interface DeviceGroupsDeleteOperation200Response extends HttpResponse {
  status: "200";
}

export interface DeviceGroupsDeleteOperation202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
}

/** Resource deletion accepted. */
export interface DeviceGroupsDeleteOperation202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DeviceGroupsDeleteOperation202Headers;
}

/** Resource does not exist. */
export interface DeviceGroupsDeleteOperation204Response extends HttpResponse {
  status: "204";
}

export interface DeviceGroupsDeleteOperationDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running delete operation */
export interface DeviceGroupsDeleteLogicalResponse extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface DeviceGroupsUpdate200Response extends HttpResponse {
  status: "200";
  body: DeviceGroupOutput;
}

export interface DeviceGroupsUpdate202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
}

/** Resource update request accepted. */
export interface DeviceGroupsUpdate202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DeviceGroupsUpdate202Headers;
}

export interface DeviceGroupsUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running update operation */
export interface DeviceGroupsUpdateLogicalResponse extends HttpResponse {
  status: "200";
  body: DeviceGroupOutput;
}

/** Azure operation completed successfully. */
export interface DeviceGroupsDeprecatedCountDevices200Response
  extends HttpResponse {
  status: "200";
  body: CountDeviceResponseOutput;
}

export interface DeviceGroupsDeprecatedCountDevicesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface DeviceGroupsCountDevices200Response extends HttpResponse {
  status: "200";
  body: CountDevicesResponseOutput;
}

export interface DeviceGroupsCountDevicesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface DeviceGroupsDeprecatedClaimDevices202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource operation accepted. */
export interface DeviceGroupsDeprecatedClaimDevices202Response
  extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DeviceGroupsDeprecatedClaimDevices202Headers;
}

export interface DeviceGroupsDeprecatedClaimDevicesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface DeviceGroupsClaimDevices202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
}

/** Resource operation accepted. */
export interface DeviceGroupsClaimDevices202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DeviceGroupsClaimDevices202Headers;
}

export interface DeviceGroupsClaimDevicesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running claimDevices operation */
export interface DeviceGroupsClaimDevicesLogicalResponse extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface CertificatesGet200Response extends HttpResponse {
  status: "200";
  body: CertificateOutput;
}

export interface CertificatesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface CertificatesListByCatalog200Response extends HttpResponse {
  status: "200";
  body: CertificateListResultOutput;
}

export interface CertificatesListByCatalogDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface CertificatesRetrieveCertChain200Response extends HttpResponse {
  status: "200";
  body: CertificateChainResponseOutput;
}

export interface CertificatesRetrieveCertChainDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface CertificatesRetrieveProofOfPossessionNonce200Response
  extends HttpResponse {
  status: "200";
  body: ProofOfPossessionNonceResponseOutput;
}

export interface CertificatesRetrieveProofOfPossessionNonceDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface DeploymentsGet200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

export interface DeploymentsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface DeploymentsListByDeviceGroup200Response extends HttpResponse {
  status: "200";
  body: DeploymentListResultOutput;
}

export interface DeploymentsListByDeviceGroupDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource 'Deployment' update operation succeeded */
export interface DeploymentsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

export interface DeploymentsCreateOrUpdate201Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource 'Deployment' create operation succeeded */
export interface DeploymentsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: DeploymentOutput;
  headers: RawHttpHeaders & DeploymentsCreateOrUpdate201Headers;
}

export interface DeploymentsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running createOrUpdate operation */
export interface DeploymentsCreateOrUpdateLogicalResponse extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** Resource deleted successfully. */
export interface DeploymentsDeleteOperation200Response extends HttpResponse {
  status: "200";
}

export interface DeploymentsDeleteOperation202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
}

/** Resource deletion accepted. */
export interface DeploymentsDeleteOperation202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DeploymentsDeleteOperation202Headers;
}

/** Resource does not exist. */
export interface DeploymentsDeleteOperation204Response extends HttpResponse {
  status: "204";
}

export interface DeploymentsDeleteOperationDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running delete operation */
export interface DeploymentsDeleteLogicalResponse extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface DevicesGet200Response extends HttpResponse {
  status: "200";
  body: DeviceOutput;
}

export interface DevicesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource 'Device' update operation succeeded */
export interface DevicesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: DeviceOutput;
}

export interface DevicesCreateOrUpdate201Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource 'Device' create operation succeeded */
export interface DevicesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: DeviceOutput;
  headers: RawHttpHeaders & DevicesCreateOrUpdate201Headers;
}

export interface DevicesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running createOrUpdate operation */
export interface DevicesCreateOrUpdateLogicalResponse extends HttpResponse {
  status: "200";
  body: DeviceOutput;
}

/** Azure operation completed successfully. */
export interface DevicesListByDeviceGroup200Response extends HttpResponse {
  status: "200";
  body: DeviceListResultOutput;
}

export interface DevicesListByDeviceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource deleted successfully. */
export interface DevicesDeleteOperation200Response extends HttpResponse {
  status: "200";
}

export interface DevicesDeleteOperation202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
}

/** Resource deletion accepted. */
export interface DevicesDeleteOperation202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DevicesDeleteOperation202Headers;
}

/** Resource does not exist. */
export interface DevicesDeleteOperation204Response extends HttpResponse {
  status: "204";
}

export interface DevicesDeleteOperationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running delete operation */
export interface DevicesDeleteLogicalResponse extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface DevicesUpdate200Response extends HttpResponse {
  status: "200";
  body: DeviceOutput;
}

export interface DevicesUpdate202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource update request accepted. */
export interface DevicesUpdate202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DevicesUpdate202Headers;
}

export interface DevicesUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface DevicesDeprecatedGenerateCapabilityImage200Response
  extends HttpResponse {
  status: "200";
  body: SignedCapabilityImageResponseOutput;
}

export interface DevicesDeprecatedGenerateCapabilityImage202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource operation accepted. */
export interface DevicesDeprecatedGenerateCapabilityImage202Response
  extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DevicesDeprecatedGenerateCapabilityImage202Headers;
}

export interface DevicesDeprecatedGenerateCapabilityImageDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface DevicesGenerateCapabilityImage200Response
  extends HttpResponse {
  status: "200";
  body: SignedCapabilityImageResponseOutput;
}

export interface DevicesGenerateCapabilityImage202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
}

/** Resource operation accepted. */
export interface DevicesGenerateCapabilityImage202Response
  extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DevicesGenerateCapabilityImage202Headers;
}

export interface DevicesGenerateCapabilityImageDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running generateCapabilityImage operation */
export interface DevicesGenerateCapabilityImageLogicalResponse
  extends HttpResponse {
  status: "200";
  body: SignedCapabilityImageResponseOutput;
}

/** Azure operation completed successfully. */
export interface ProductsListByCatalog200Response extends HttpResponse {
  status: "200";
  body: ProductListResultOutput;
}

export interface ProductsListByCatalogDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface ProductsGet200Response extends HttpResponse {
  status: "200";
  body: ProductOutput;
}

export interface ProductsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource 'Product' update operation succeeded */
export interface ProductsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ProductOutput;
}

export interface ProductsCreateOrUpdate201Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource 'Product' create operation succeeded */
export interface ProductsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ProductOutput;
  headers: RawHttpHeaders & ProductsCreateOrUpdate201Headers;
}

export interface ProductsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running createOrUpdate operation */
export interface ProductsCreateOrUpdateLogicalResponse extends HttpResponse {
  status: "200";
  body: ProductOutput;
}

/** Resource deleted successfully. */
export interface ProductsDeleteOperation200Response extends HttpResponse {
  status: "200";
}

export interface ProductsDeleteOperation202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
}

/** Resource deletion accepted. */
export interface ProductsDeleteOperation202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & ProductsDeleteOperation202Headers;
}

/** Resource does not exist. */
export interface ProductsDeleteOperation204Response extends HttpResponse {
  status: "204";
}

export interface ProductsDeleteOperationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running delete operation */
export interface ProductsDeleteLogicalResponse extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface ProductsUpdate200Response extends HttpResponse {
  status: "200";
  body: ProductOutput;
}

export interface ProductsUpdate202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
}

/** Resource update request accepted. */
export interface ProductsUpdate202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & ProductsUpdate202Headers;
}

export interface ProductsUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running update operation */
export interface ProductsUpdateLogicalResponse extends HttpResponse {
  status: "200";
  body: ProductOutput;
}

/** Azure operation completed successfully. */
export interface ProductsGenerateDefaultDeviceGroups200Response
  extends HttpResponse {
  status: "200";
  body: DeviceGroupListResultOutput;
}

export interface ProductsGenerateDefaultDeviceGroupsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface ProductsDeprecated200Response extends HttpResponse {
  status: "200";
  body: CountDeviceResponseOutput;
}

export interface ProductsDeprecatedDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface ProductsCountDevices200Response extends HttpResponse {
  status: "200";
  body: CountDevicesResponseOutput;
}

export interface ProductsCountDevicesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
