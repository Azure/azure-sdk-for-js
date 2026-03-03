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
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type DisconnectedOperation,
  type DisconnectedOperationProperties,
  KnownResourceProvisioningState,
  type ResourceProvisioningState,
  KnownBillingModel,
  type BillingModel,
  KnownConnectionIntent,
  type ConnectionIntent,
  KnownConnectionStatus,
  type ConnectionStatus,
  KnownRegistrationStatus,
  type RegistrationStatus,
  type BillingConfiguration,
  KnownAutoRenew,
  type AutoRenew,
  KnownBillingStatus,
  type BillingStatus,
  type BillingPeriod,
  KnownPricingModel,
  type PricingModel,
  type BenefitPlans,
  KnownBenefitPlanStatus,
  type BenefitPlanStatus,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type DisconnectedOperationCreateOrUpdate,
  type DisconnectedOperationPropertiesCreateOrUpdate,
  type BillingConfigurationCreateCreateOrUpdate,
  type DisconnectedOperationUpdate,
  type DisconnectedOperationUpdateProperties,
  type DisconnectedOperationDeploymentManifest,
  type Image,
  type ImageProperties,
  KnownReleaseType,
  type ReleaseType,
  type ImageUpdateProperties,
  KnownSystemReboot,
  type SystemReboot,
  type ProxyResource,
  type ImageDownloadResult,
  type Artifact,
  type ArtifactProperties,
  type ArtifactDownloadResult,
  type HardwareSetting,
  type HardwareSettingProperties,
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
export { AzureClouds, type AzureSupportedClouds };
