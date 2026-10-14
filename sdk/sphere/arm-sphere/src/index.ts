// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AzureSphereClient } from "./azureSphereClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  Catalog,
  CatalogProperties,
  ProvisioningState,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  CatalogUpdate,
  CountDevicesResponse,
  CountElementsResponse,
  Deployment,
  DeploymentProperties,
  Image,
  ImageProperties,
  RegionalDataBoundary,
  ImageType,
  ProxyResource,
  ListDeviceGroupsRequest,
  DeviceGroup,
  DeviceGroupProperties,
  OSFeedType,
  UpdatePolicy,
  AllowCrashDumpCollection,
  DeviceInsight,
  Device,
  DeviceProperties,
  Certificate,
  CertificateProperties,
  CertificateStatus,
  CertificateChainResponse,
  ProofOfPossessionNonceRequest,
  ProofOfPossessionNonceResponse,
  Product,
  ProductProperties,
  ProductUpdate,
  ProductUpdateProperties,
  DeviceGroupUpdate,
  DeviceGroupUpdateProperties,
  ClaimDevicesRequest,
  DeviceUpdate,
  DeviceUpdateProperties,
  GenerateCapabilityImageRequest,
  CapabilityType,
  SignedCapabilityImageResponse,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownCreatedByType,
  KnownRegionalDataBoundary,
  KnownImageType,
  KnownOSFeedType,
  KnownUpdatePolicy,
  KnownAllowCrashDumpCollection,
  KnownCertificateStatus,
  KnownCapabilityType,
  KnownVersions,
} from "./models/index.js";
export type { AzureSphereClientOptionalParams } from "./api/index.js";
export type {
  CatalogsUploadImageOptionalParams,
  CatalogsListDevicesOptionalParams,
  CatalogsListDeviceInsightsOptionalParams,
  CatalogsListDeviceGroupsOptionalParams,
  CatalogsListDeploymentsOptionalParams,
  CatalogsCountDevicesOptionalParams,
  CatalogsListBySubscriptionOptionalParams,
  CatalogsListByResourceGroupOptionalParams,
  CatalogsDeleteOptionalParams,
  CatalogsUpdateOptionalParams,
  CatalogsCreateOrUpdateOptionalParams,
  CatalogsGetOptionalParams,
} from "./api/catalogs/index.js";
export type {
  CertificatesRetrieveProofOfPossessionNonceOptionalParams,
  CertificatesRetrieveCertChainOptionalParams,
  CertificatesListByCatalogOptionalParams,
  CertificatesGetOptionalParams,
} from "./api/certificates/index.js";
export type {
  DeploymentsListByDeviceGroupOptionalParams,
  DeploymentsDeleteOptionalParams,
  DeploymentsCreateOrUpdateOptionalParams,
  DeploymentsGetOptionalParams,
} from "./api/deployments/index.js";
export type {
  DeviceGroupsCountDevicesOptionalParams,
  DeviceGroupsClaimDevicesOptionalParams,
  DeviceGroupsListByProductOptionalParams,
  DeviceGroupsDeleteOptionalParams,
  DeviceGroupsUpdateOptionalParams,
  DeviceGroupsCreateOrUpdateOptionalParams,
  DeviceGroupsGetOptionalParams,
} from "./api/deviceGroups/index.js";
export type {
  DevicesGenerateCapabilityImageOptionalParams,
  DevicesListByDeviceGroupOptionalParams,
  DevicesDeleteOptionalParams,
  DevicesUpdateOptionalParams,
  DevicesCreateOrUpdateOptionalParams,
  DevicesGetOptionalParams,
} from "./api/devices/index.js";
export type {
  ImagesListByCatalogOptionalParams,
  ImagesDeleteOptionalParams,
  ImagesCreateOrUpdateOptionalParams,
  ImagesGetOptionalParams,
} from "./api/images/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  ProductsGenerateDefaultDeviceGroupsOptionalParams,
  ProductsCountDevicesOptionalParams,
  ProductsListByCatalogOptionalParams,
  ProductsDeleteOptionalParams,
  ProductsUpdateOptionalParams,
  ProductsCreateOrUpdateOptionalParams,
  ProductsGetOptionalParams,
} from "./api/products/index.js";
export type {
  CatalogsOperations,
  CertificatesOperations,
  DeploymentsOperations,
  DeviceGroupsOperations,
  DevicesOperations,
  ImagesOperations,
  OperationsOperations,
  ProductsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
