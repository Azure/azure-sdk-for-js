// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { EdgeClient } from "./edgeClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  DisconnectedOperation,
  DisconnectedOperationProperties,
  KnownResourceProvisioningState,
  ResourceProvisioningState,
  KnownBillingModel,
  BillingModel,
  KnownConnectionIntent,
  ConnectionIntent,
  KnownConnectionStatus,
  ConnectionStatus,
  KnownRegistrationStatus,
  RegistrationStatus,
  BillingConfiguration,
  KnownAutoRenew,
  AutoRenew,
  KnownBillingStatus,
  BillingStatus,
  BillingPeriod,
  KnownPricingModel,
  PricingModel,
  BenefitPlans,
  KnownBenefitPlanStatus,
  BenefitPlanStatus,
  TrackedResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  DisconnectedOperationCreateOrUpdate,
  DisconnectedOperationPropertiesCreateOrUpdate,
  BillingConfigurationCreateCreateOrUpdate,
  DisconnectedOperationUpdate,
  DisconnectedOperationUpdateProperties,
  DisconnectedOperationDeploymentManifest,
  Image,
  ImageProperties,
  KnownReleaseType,
  ReleaseType,
  ImageUpdateProperties,
  KnownSystemReboot,
  SystemReboot,
  ProxyResource,
  ImageDownloadResult,
  Artifact,
  ArtifactProperties,
  ArtifactDownloadResult,
  HardwareSetting,
  HardwareSettingProperties,
  KnownVersions,
} from "./models/index.js";
export { EdgeClientOptionalParams } from "./api/index.js";
export {
  ArtifactsListDownloadUriOptionalParams,
  ArtifactsGetOptionalParams,
  ArtifactsListByParentOptionalParams,
} from "./api/artifacts/index.js";
export {
  DisconnectedOperationsListDeploymentManifestOptionalParams,
  DisconnectedOperationsListBySubscriptionOptionalParams,
  DisconnectedOperationsListByResourceGroupOptionalParams,
  DisconnectedOperationsDeleteOptionalParams,
  DisconnectedOperationsUpdateOptionalParams,
  DisconnectedOperationsCreateOrUpdateOptionalParams,
  DisconnectedOperationsGetOptionalParams,
} from "./api/disconnectedOperations/index.js";
export {
  HardwareSettingsDeleteOptionalParams,
  HardwareSettingsCreateOrUpdateOptionalParams,
  HardwareSettingsGetOptionalParams,
  HardwareSettingsListByParentOptionalParams,
} from "./api/hardwareSettings/index.js";
export {
  ImagesListDownloadUriOptionalParams,
  ImagesGetOptionalParams,
  ImagesListByDisconnectedOperationOptionalParams,
} from "./api/images/index.js";
export {
  ArtifactsOperations,
  DisconnectedOperationsOperations,
  HardwareSettingsOperations,
  ImagesOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
