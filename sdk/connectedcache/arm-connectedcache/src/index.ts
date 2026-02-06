// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ConnectedCacheClient } from "./connectedCacheClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  Operation,
  OperationDisplay,
  KnownOrigin,
  Origin,
  KnownActionType,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  IspCustomerResource,
  CustomerProperty,
  KnownProvisioningState,
  ProvisioningState,
  CustomerEntity,
  AdditionalCustomerProperties,
  KnownCustomerTransitState,
  CustomerTransitState,
  TrackedResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  ConnectedCachePatchResource,
  IspCacheNodeResource,
  CacheNodeProperty,
  CacheNodeEntity,
  KnownBgpReviewStateEnum,
  BgpReviewStateEnum,
  KnownConfigurationState,
  ConfigurationState,
  KnownAutoUpdateRingType,
  AutoUpdateRingType,
  AdditionalCacheNodeProperties,
  MccCacheNodeTlsCertificate,
  MccCacheNodeAutoUpdateInfo,
  CacheNodeDriveConfiguration,
  BgpConfiguration,
  ProxyUrlConfiguration,
  KnownProxyRequired,
  ProxyRequired,
  KnownOsType,
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
  KnownVersions,
} from "./models/index.js";
export { ConnectedCacheClientOptionalParams } from "./api/index.js";
export {
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
export {
  EnterpriseMccCustomersListBySubscriptionOptionalParams,
  EnterpriseMccCustomersListByResourceGroupOptionalParams,
  EnterpriseMccCustomersDeleteOptionalParams,
  EnterpriseMccCustomersUpdateOptionalParams,
  EnterpriseMccCustomersCreateOrUpdateOptionalParams,
  EnterpriseMccCustomersGetOptionalParams,
} from "./api/enterpriseMccCustomers/index.js";
export {
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
export {
  IspCustomersListBySubscriptionOptionalParams,
  IspCustomersListByResourceGroupOptionalParams,
  IspCustomersDeleteOptionalParams,
  IspCustomersUpdateOptionalParams,
  IspCustomersCreateOrUpdateOptionalParams,
  IspCustomersGetOptionalParams,
} from "./api/ispCustomers/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export {
  EnterpriseMccCacheNodesOperationsOperations,
  EnterpriseMccCustomersOperations,
  IspCacheNodesOperationsOperations,
  IspCustomersOperations,
  OperationsOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
