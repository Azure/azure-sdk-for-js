// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ResourceConnectorManagementClient } from "./resourceConnectorManagementClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  Appliance,
  ApplianceProperties,
  KnownDistro,
  Distro,
  AppliancePropertiesInfrastructureConfig,
  KnownProvider,
  Provider,
  KnownStatus,
  Status,
  Event,
  NetworkProfile,
  ProxyConfiguration,
  DnsConfiguration,
  GatewayConfiguration,
  Identity,
  KnownResourceIdentityType,
  ResourceIdentityType,
  TrackedResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  PatchableAppliance,
  ApplianceListCredentialResults,
  HybridConnectionConfig,
  ApplianceCredentialKubeconfig,
  KnownAccessProfileType,
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
  KnownVersions,
  KnownArtifactType,
  ArtifactType,
  KnownSSHKeyType,
  SSHKeyType,
} from "./models/index.js";
export { ResourceConnectorManagementClientOptionalParams } from "./api/index.js";
export {
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
export { AppliancesOperations } from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
