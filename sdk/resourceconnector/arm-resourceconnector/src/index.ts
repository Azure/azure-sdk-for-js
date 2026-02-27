// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ResourceConnectorManagementClient } from "./resourceConnectorManagementClient.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type Appliance,
  type ApplianceProperties,
  KnownDistro,
  type Distro,
  type AppliancePropertiesInfrastructureConfig,
  KnownProvider,
  type Provider,
  KnownStatus,
  type Status,
  type Event,
  type NetworkProfile,
  type ProxyConfiguration,
  type DnsConfiguration,
  type GatewayConfiguration,
  type Identity,
  KnownResourceIdentityType,
  type ResourceIdentityType,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type PatchableAppliance,
  type ApplianceListCredentialResults,
  type HybridConnectionConfig,
  type ApplianceCredentialKubeconfig,
  KnownAccessProfileType,
  type AccessProfileType,
  type ApplianceListKeysResults,
  type ArtifactProfile,
  type SSHKey,
  type UpgradeGraph,
  type UpgradeGraphProperties,
  type SupportedVersion,
  type SupportedVersionMetadata,
  type SupportedVersionCatalogVersion,
  type SupportedVersionCatalogVersionData,
  type ApplianceOperation,
  type ApplianceOperationValueDisplay,
  type ApplianceGetTelemetryConfigResult,
  KnownVersions,
  KnownArtifactType,
  type ArtifactType,
  KnownSSHKeyType,
  type SSHKeyType,
} from "./models/index.js";
export type { ResourceConnectorManagementClientOptionalParams } from "./api/index.js";
export type {
  AppliancesGetTelemetryConfigOptionalParams,
  AppliancesListOperationsOptionalParams,
  AppliancesGetUpgradeGraphOptionalParams,
  AppliancesListKeysOptionalParams,
  AppliancesListClusterUserCredentialOptionalParams,
  AppliancesListBySubscriptionOptionalParams,
  AppliancesListByResourceGroupOptionalParams,
  AppliancesDeleteOptionalParams,
  AppliancesUpdateOptionalParams,
  AppliancesCreateOrUpdateOptionalParams,
  AppliancesGetOptionalParams,
} from "./api/appliances/index.js";
export type { AppliancesOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
