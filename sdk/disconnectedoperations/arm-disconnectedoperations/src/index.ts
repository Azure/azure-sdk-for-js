// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DisconnectedOperationsManagementClient } from "./disconnectedOperationsManagementClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  DisconnectedOperation,
  DisconnectedOperationProperties,
  ResourceProvisioningState,
  BillingModel,
  ConnectionIntent,
  ConnectionStatus,
  RegistrationStatus,
  BillingConfiguration,
  AutoRenew,
  BillingStatus,
  BillingPeriod,
  PricingModel,
  BenefitPlans,
  BenefitPlanStatus,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  DisconnectedOperationUpdate,
  DisconnectedOperationUpdateProperties,
  DisconnectedOperationDeploymentManifest,
  Image,
  ImageProperties,
  ReleaseType,
  ImageUpdateProperties,
  SystemReboot,
  ProxyResource,
  ImageDownloadResult,
  Artifact,
  ArtifactProperties,
  ArtifactDownloadResult,
  HardwareSetting,
  HardwareSettingProperties,
  HardwareSettingCreateOrUpdate,
  HardwareSettingPropertiesCreateOrUpdate,
  DisconnectedOperationCreateOrUpdate,
  DisconnectedOperationPropertiesCreateOrUpdate,
  BillingConfigurationCreateOrUpdate,
  BillingPeriodCreateOrUpdate,
  DisconnectedOperationUpdateUpdate,
  DisconnectedOperationUpdatePropertiesUpdate,
  BillingConfigurationUpdate,
  BillingPeriodUpdate,
} from "./models/index.js";
export {
  KnownResourceProvisioningState,
  KnownBillingModel,
  KnownConnectionIntent,
  KnownConnectionStatus,
  KnownRegistrationStatus,
  KnownAutoRenew,
  KnownBillingStatus,
  KnownPricingModel,
  KnownBenefitPlanStatus,
  KnownCreatedByType,
  KnownReleaseType,
  KnownSystemReboot,
  KnownVersions,
} from "./models/index.js";
export type { DisconnectedOperationsManagementClientOptionalParams } from "./api/index.js";
export type {
  ArtifactsListDownloadUriOptionalParams,
  ArtifactsGetOptionalParams,
  ArtifactsListByParentOptionalParams,
} from "./api/artifacts/index.js";
export type {
  DisconnectedOperationsListDeploymentManifestOptionalParams,
  DisconnectedOperationsListBySubscriptionOptionalParams,
  DisconnectedOperationsListByResourceGroupOptionalParams,
  DisconnectedOperationsDeleteOptionalParams,
  DisconnectedOperationsUpdateOptionalParams,
  DisconnectedOperationsCreateOrUpdateOptionalParams,
  DisconnectedOperationsGetOptionalParams,
} from "./api/disconnectedOperations/index.js";
export type {
  HardwareSettingsDeleteOptionalParams,
  HardwareSettingsCreateOrUpdateOptionalParams,
  HardwareSettingsGetOptionalParams,
  HardwareSettingsListByParentOptionalParams,
} from "./api/hardwareSettings/index.js";
export type {
  ImagesListDownloadUriOptionalParams,
  ImagesGetOptionalParams,
  ImagesListByDisconnectedOperationOptionalParams,
} from "./api/images/index.js";
export type {
  ArtifactsOperations,
  DisconnectedOperationsOperations,
  HardwareSettingsOperations,
  ImagesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
