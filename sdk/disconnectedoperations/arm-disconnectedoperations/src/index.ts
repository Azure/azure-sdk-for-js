// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
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
  type BillingConfigurationCreateOrUpdate,
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
export { type DisconnectedOperationsManagementClientOptionalParams } from "./api/index.js";
export {
  type ArtifactsListDownloadUriOptionalParams,
  type ArtifactsGetOptionalParams,
  type ArtifactsListByParentOptionalParams,
} from "./api/artifacts/index.js";
export {
  type DisconnectedOperationsListDeploymentManifestOptionalParams,
  type DisconnectedOperationsListBySubscriptionOptionalParams,
  type DisconnectedOperationsListByResourceGroupOptionalParams,
  type DisconnectedOperationsDeleteOptionalParams,
  type DisconnectedOperationsUpdateOptionalParams,
  type DisconnectedOperationsCreateOrUpdateOptionalParams,
  type DisconnectedOperationsGetOptionalParams,
} from "./api/disconnectedOperations/index.js";
export {
  type HardwareSettingsDeleteOptionalParams,
  type HardwareSettingsCreateOrUpdateOptionalParams,
  type HardwareSettingsGetOptionalParams,
  type HardwareSettingsListByParentOptionalParams,
} from "./api/hardwareSettings/index.js";
export {
  type ImagesListDownloadUriOptionalParams,
  type ImagesGetOptionalParams,
  type ImagesListByDisconnectedOperationOptionalParams,
} from "./api/images/index.js";
export {
  type ArtifactsOperations,
  type DisconnectedOperationsOperations,
  type HardwareSettingsOperations,
  type ImagesOperations,
} from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
