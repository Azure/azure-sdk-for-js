// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { BlockClient } from "./blockClient.js";
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
  Reservation,
  ReservationPropertiesBaseResourceProperties,
  MarketplaceDetails,
  MarketplaceSubscriptionStatus,
  OfferDetails,
  UserDetails,
  CompanyDetails,
  Address,
  ProvisioningState,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ResourceProvisioningState,
  ReservationUpdate,
  ReservationUpdateProperties,
  LimitDetails,
  StoragePoolLimits,
  RangeLimits,
  VolumeLimits,
  ProtectionPolicyLimits,
  PerformancePolicyLimits,
  ReservationBillingStatus,
  ReservationBillingUsageReport,
  BillingUsageProperty,
  UsageSeverity,
  StoragePool,
  StoragePoolProperties,
  VnetInjection,
  AzureVmwareService,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  StoragePoolUpdate,
  StoragePoolUpdateProperties,
  StoragePoolHealthInfo,
  HealthDetails,
  BandwidthUsage,
  IopsUsage,
  Space,
  Alert,
  AlertLevel,
  AvsConnection,
  ServiceInitializationHandle,
  AvsStatus,
  StoragePoolEnableAvsConnectionPost,
  StoragePoolFinalizeAvsConnectionPost,
  ServiceInitializationInfo,
  AvsStorageContainer,
  AvsStorageContainerProperties,
  ProxyResource,
  AvsStorageContainerVolumeUpdate,
  AvsStorageContainerVolumeUpdateProperties,
  SoftDeletion,
  AvsStorageContainerVolume,
  VolumeProperties,
  VolumeType,
  AvsDiskDetails,
  AvsVmUpdate,
  AvsVmUpdateProperties,
  AvsVm,
  AvsVmProperties,
  VolumeContainerType,
  AvsVmDetails,
  VmType,
  AvsVmVolumeUpdate,
  AvsVmVolumeUpdateProperties,
  AvsVmVolume,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownMarketplaceSubscriptionStatus,
  KnownProvisioningState,
  KnownCreatedByType,
  KnownResourceProvisioningState,
  KnownUsageSeverity,
  KnownManagedServiceIdentityType,
  KnownAlertLevel,
  KnownVolumeType,
  KnownVolumeContainerType,
  KnownVmType,
  KnownVersions,
} from "./models/index.js";
export type { BlockClientOptionalParams } from "./api/index.js";
export type {
  AvsStorageContainersListByStoragePoolOptionalParams,
  AvsStorageContainersDeleteOptionalParams,
  AvsStorageContainersGetOptionalParams,
} from "./api/avsStorageContainers/index.js";
export type {
  AvsStorageContainerVolumesListByAvsStorageContainerOptionalParams,
  AvsStorageContainerVolumesDeleteOptionalParams,
  AvsStorageContainerVolumesGetOptionalParams,
  AvsStorageContainerVolumesUpdateOptionalParams,
} from "./api/avsStorageContainerVolumes/index.js";
export type {
  AvsVmsListByStoragePoolOptionalParams,
  AvsVmsDeleteOptionalParams,
  AvsVmsGetOptionalParams,
  AvsVmsUpdateOptionalParams,
} from "./api/avsVms/index.js";
export type {
  AvsVmVolumesListByAvsVmOptionalParams,
  AvsVmVolumesDeleteOptionalParams,
  AvsVmVolumesGetOptionalParams,
  AvsVmVolumesUpdateOptionalParams,
} from "./api/avsVmVolumes/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  ReservationsGetBillingReportOptionalParams,
  ReservationsGetBillingStatusOptionalParams,
  ReservationsGetResourceLimitsOptionalParams,
  ReservationsListBySubscriptionOptionalParams,
  ReservationsListByResourceGroupOptionalParams,
  ReservationsDeleteOptionalParams,
  ReservationsUpdateOptionalParams,
  ReservationsCreateOptionalParams,
  ReservationsGetOptionalParams,
} from "./api/reservations/index.js";
export type {
  StoragePoolsRepairAvsConnectionOptionalParams,
  StoragePoolsFinalizeAvsConnectionOptionalParams,
  StoragePoolsDisableAvsConnectionOptionalParams,
  StoragePoolsEnableAvsConnectionOptionalParams,
  StoragePoolsGetAvsStatusOptionalParams,
  StoragePoolsGetAvsConnectionOptionalParams,
  StoragePoolsGetHealthStatusOptionalParams,
  StoragePoolsListBySubscriptionOptionalParams,
  StoragePoolsListByResourceGroupOptionalParams,
  StoragePoolsDeleteOptionalParams,
  StoragePoolsUpdateOptionalParams,
  StoragePoolsCreateOptionalParams,
  StoragePoolsGetOptionalParams,
} from "./api/storagePools/index.js";
export type {
  AvsStorageContainersOperations,
  AvsStorageContainerVolumesOperations,
  AvsVmsOperations,
  AvsVmVolumesOperations,
  OperationsOperations,
  ReservationsOperations,
  StoragePoolsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
