// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ResourceConnectorManagementClient } from "./resourceConnectorManagementClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Appliance,
  ApplianceProperties,
  Distro,
  AppliancePropertiesInfrastructureConfig,
  Provider,
  Status,
  Event,
  NetworkProfile,
  ProxyConfiguration,
  DnsConfiguration,
  GatewayConfiguration,
  Identity,
  ResourceIdentityType,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  PatchableAppliance,
  ApplianceListCredentialResults,
  HybridConnectionConfig,
  ApplianceCredentialKubeconfig,
  AccessProfileType,
  ApplianceListKeysResults,
  ArtifactProfile,
  SSHKey,
  UpgradeGraph,
  UpgradeGraphProperties,
  SupportedVersion,
  SupportedVersionMetadata,
  SupportedVersionCatalogVersion,
  SupportedVersionCatalogVersionData,
  ApplianceOperation,
  ApplianceOperationValueDisplay,
  ApplianceGetTelemetryConfigResult,
  ArtifactType,
  SSHKeyType,
} from "./models/index.js";
export {
  KnownDistro,
  KnownProvider,
  KnownStatus,
  KnownResourceIdentityType,
  KnownCreatedByType,
  KnownAccessProfileType,
  KnownVersions,
  KnownArtifactType,
  KnownSSHKeyType,
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
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
