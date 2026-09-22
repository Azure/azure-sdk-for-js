// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AppLinkClient } from "./appLinkClient.js";
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
  AppLink,
  AppLinkProperties,
  ProvisioningState,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  AppLinkUpdate,
  AppLinkMember,
  AppLinkMemberProperties,
  ClusterType,
  Metadata,
  UpgradeProfile,
  UpgradeMode,
  FullyManagedUpgradeProfile,
  UpgradeReleaseChannel,
  SelfManagedUpgradeProfile,
  ObservabilityProfile,
  MetricsProfile,
  ConnectivityProfile,
  EastWestGatewayProfile,
  EastWestGatewayVisibility,
  PrivateConnectProfile,
  AppLinkMemberUpdate,
  AppLinkMemberUpdateProperties,
  UpgradeHistory,
  UpgradeHistoryProperties,
  ProxyResource,
  AvailableVersion,
  AvailableVersionProperties,
  FullyManagedVersions,
  ReleaseChannelInfo,
  SelfManagedVersions,
  VersionInfo,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownClusterType,
  KnownUpgradeMode,
  KnownUpgradeReleaseChannel,
  KnownEastWestGatewayVisibility,
  KnownVersions,
} from "./models/index.js";
export type { AppLinkClientOptionalParams } from "./api/index.js";
export type {
  AppLinkMembersListByAppLinkOptionalParams,
  AppLinkMembersDeleteOptionalParams,
  AppLinkMembersUpdateOptionalParams,
  AppLinkMembersCreateOrUpdateOptionalParams,
  AppLinkMembersGetOptionalParams,
} from "./api/appLinkMembers/index.js";
export type {
  AppLinksListBySubscriptionOptionalParams,
  AppLinksListByResourceGroupOptionalParams,
  AppLinksDeleteOptionalParams,
  AppLinksUpdateOptionalParams,
  AppLinksCreateOrUpdateOptionalParams,
  AppLinksGetOptionalParams,
} from "./api/appLinks/index.js";
export type { AvailableVersionsListByLocationOptionalParams } from "./api/availableVersions/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { UpgradeHistoriesListByAppLinkMemberOptionalParams } from "./api/upgradeHistories/index.js";
export type {
  AppLinkMembersOperations,
  AppLinksOperations,
  AvailableVersionsOperations,
  OperationsOperations,
  UpgradeHistoriesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
