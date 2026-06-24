// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DevOpsInfrastructureClient } from "./devOpsInfrastructureClient.js";
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
  Pool,
  PoolProperties,
  ProvisioningState,
  OrganizationProfile,
  OrganizationProfileUnion,
  GitHubOrganizationProfile,
  GitHubOrganization,
  AzureDevOpsOrganizationProfile,
  Organization,
  AzureDevOpsPermissionProfile,
  AzureDevOpsPermissionType,
  AgentProfile,
  AgentProfileUnion,
  ResourcePredictions,
  ResourcePredictionsProfile,
  ResourcePredictionsProfileUnion,
  ResourcePredictionsProfileType,
  ManualResourcePredictionsProfile,
  AutomaticResourcePredictionsProfile,
  PredictionPreference,
  StatelessAgentProfile,
  Stateful,
  FabricProfile,
  FabricProfileUnion,
  VmssFabricProfile,
  DevOpsAzureSku,
  PoolImage,
  EphemeralType,
  OsProfile,
  SecretsManagementSettings,
  CertificateStoreNameOption,
  LogonType,
  StorageProfile,
  OsDiskStorageAccountType,
  DataDisk,
  CachingType,
  StorageAccountType,
  NetworkProfile,
  RuntimeConfiguration,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  PoolUpdate,
  PoolUpdateProperties,
  CheckNameAvailability,
  DevOpsInfrastructureResourceType,
  CheckNameAvailabilityResult,
  AvailabilityStatus,
  CheckNameAvailabilityReason,
  DeleteResourcesDetails,
  ResourceDetailsObject,
  ResourceDetailsObjectProperties,
  ResourceStatus,
  ProxyResource,
  ResourceSku,
  ResourceSkuProperties,
  ResourceSkuLocationInfo,
  ResourceSkuZoneDetails,
  ResourceSkuCapabilities,
  ResourceSkuRestrictions,
  ResourceSkuRestrictionsType,
  ResourceSkuRestrictionInfo,
  ResourceSkuRestrictionsReasonCode,
  Quota,
  QuotaName,
  ImageVersion,
  ImageVersionProperties,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownAzureDevOpsPermissionType,
  KnownResourcePredictionsProfileType,
  KnownPredictionPreference,
  KnownEphemeralType,
  KnownCertificateStoreNameOption,
  KnownLogonType,
  KnownOsDiskStorageAccountType,
  KnownCachingType,
  KnownStorageAccountType,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownDevOpsInfrastructureResourceType,
  KnownAvailabilityStatus,
  KnownCheckNameAvailabilityReason,
  KnownResourceStatus,
  KnownResourceSkuRestrictionsType,
  KnownResourceSkuRestrictionsReasonCode,
  KnownVersions,
} from "./models/index.js";
export type { DevOpsInfrastructureClientOptionalParams } from "./api/index.js";
export type { ImageVersionsListByImageOptionalParams } from "./api/imageVersions/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PoolsDeleteResourcesOptionalParams,
  PoolsCheckNameAvailabilityOptionalParams,
  PoolsListBySubscriptionOptionalParams,
  PoolsListByResourceGroupOptionalParams,
  PoolsDeleteOptionalParams,
  PoolsUpdateOptionalParams,
  PoolsCreateOrUpdateOptionalParams,
  PoolsGetOptionalParams,
} from "./api/pools/index.js";
export type { ResourceDetailsListByPoolOptionalParams } from "./api/resourceDetails/index.js";
export type { SkuListByLocationOptionalParams } from "./api/sku/index.js";
export type { SubscriptionUsagesUsagesOptionalParams } from "./api/subscriptionUsages/index.js";
export type {
  ImageVersionsOperations,
  OperationsOperations,
  PoolsOperations,
  ResourceDetailsOperations,
  SkuOperations,
  SubscriptionUsagesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
