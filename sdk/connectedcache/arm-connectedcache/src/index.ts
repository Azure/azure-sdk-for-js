// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ConnectedCacheClient } from "./connectedCacheClient.js";
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
  IspCustomerResource,
  CustomerProperty,
  ProvisioningState,
  CustomerEntity,
  AdditionalCustomerProperties,
  CustomerTransitState,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ConnectedCachePatchResource,
  IspCacheNodeResource,
  CacheNodeProperty,
  CacheNodeEntity,
  BgpReviewStateEnum,
  ConfigurationState,
  AutoUpdateRingType,
  AdditionalCacheNodeProperties,
  MccCacheNodeTlsCertificate,
  MccCacheNodeAutoUpdateInfo,
  CacheNodeDriveConfiguration,
  BgpConfiguration,
  ProxyUrlConfiguration,
  ProxyRequired,
  OsType,
  MccCacheNodeBgpCidrDetails,
  BgpCidrsConfiguration,
  MccCacheNodeInstallDetails,
  CacheNodeInstallProperties,
  MccCacheNodeAutoUpdateHistory,
  MccCacheNodeAutoUpdateHistoryProperties,
  MccCacheNodeIssueHistory,
  MccCacheNodeIssueHistoryProperties,
  MccIssue,
  EnterpriseMccCustomerResource,
  EnterpriseMccCacheNodeResource,
  MccCacheNodeTlsCertificateHistory,
  MccCacheNodeTlsCertificateProperties,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownCustomerTransitState,
  KnownCreatedByType,
  KnownBgpReviewStateEnum,
  KnownConfigurationState,
  KnownAutoUpdateRingType,
  KnownProxyRequired,
  KnownOsType,
  KnownVersions,
} from "./models/index.js";
export type { ConnectedCacheClientOptionalParams } from "./api/index.js";
export type {
  EnterpriseMccCacheNodesOperationsGetCacheNodeTlsCertificateHistoryOptionalParams,
  EnterpriseMccCacheNodesOperationsGetCacheNodeMccIssueDetailsHistoryOptionalParams,
  EnterpriseMccCacheNodesOperationsGetCacheNodeAutoUpdateHistoryOptionalParams,
  EnterpriseMccCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams,
  EnterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResourceOptionalParams,
  EnterpriseMccCacheNodesOperationsDeleteOptionalParams,
  EnterpriseMccCacheNodesOperationsUpdateOptionalParams,
  EnterpriseMccCacheNodesOperationsCreateOrUpdateOptionalParams,
  EnterpriseMccCacheNodesOperationsGetOptionalParams,
} from "./api/enterpriseMccCacheNodesOperations/index.js";
export type {
  EnterpriseMccCustomersListBySubscriptionOptionalParams,
  EnterpriseMccCustomersListByResourceGroupOptionalParams,
  EnterpriseMccCustomersDeleteOptionalParams,
  EnterpriseMccCustomersUpdateOptionalParams,
  EnterpriseMccCustomersCreateOrUpdateOptionalParams,
  EnterpriseMccCustomersGetOptionalParams,
} from "./api/enterpriseMccCustomers/index.js";
export type {
  IspCacheNodesOperationsGetCacheNodeMccIssueDetailsHistoryOptionalParams,
  IspCacheNodesOperationsGetCacheNodeAutoUpdateHistoryOptionalParams,
  IspCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams,
  IspCacheNodesOperationsGetBgpCidrsOptionalParams,
  IspCacheNodesOperationsListByIspCustomerResourceOptionalParams,
  IspCacheNodesOperationsDeleteOptionalParams,
  IspCacheNodesOperationsUpdateOptionalParams,
  IspCacheNodesOperationsCreateOrUpdateOptionalParams,
  IspCacheNodesOperationsGetOptionalParams,
} from "./api/ispCacheNodesOperations/index.js";
export type {
  IspCustomersListBySubscriptionOptionalParams,
  IspCustomersListByResourceGroupOptionalParams,
  IspCustomersDeleteOptionalParams,
  IspCustomersUpdateOptionalParams,
  IspCustomersCreateOrUpdateOptionalParams,
  IspCustomersGetOptionalParams,
} from "./api/ispCustomers/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  EnterpriseMccCacheNodesOperationsOperations,
  EnterpriseMccCustomersOperations,
  IspCacheNodesOperationsOperations,
  IspCustomersOperations,
  OperationsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
