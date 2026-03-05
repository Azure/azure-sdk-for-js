// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ConnectedCacheClient } from "./connectedCacheClient.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type Operation,
  type OperationDisplay,
  KnownOrigin,
  type Origin,
  KnownActionType,
  type ActionType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type IspCustomerResource,
  type CustomerProperty,
  KnownProvisioningState,
  type ProvisioningState,
  type CustomerEntity,
  type AdditionalCustomerProperties,
  KnownCustomerTransitState,
  type CustomerTransitState,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type ConnectedCachePatchResource,
  type IspCacheNodeResource,
  type CacheNodeProperty,
  type CacheNodeEntity,
  KnownBgpReviewStateEnum,
  type BgpReviewStateEnum,
  KnownConfigurationState,
  type ConfigurationState,
  KnownAutoUpdateRingType,
  type AutoUpdateRingType,
  type AdditionalCacheNodeProperties,
  type MccCacheNodeTlsCertificate,
  type MccCacheNodeAutoUpdateInfo,
  type CacheNodeDriveConfiguration,
  type BgpConfiguration,
  type ProxyUrlConfiguration,
  KnownProxyRequired,
  type ProxyRequired,
  KnownOsType,
  type OsType,
  type MccCacheNodeBgpCidrDetails,
  type BgpCidrsConfiguration,
  type MccCacheNodeInstallDetails,
  type CacheNodeInstallProperties,
  type MccCacheNodeAutoUpdateHistory,
  type MccCacheNodeAutoUpdateHistoryProperties,
  type MccCacheNodeIssueHistory,
  type MccCacheNodeIssueHistoryProperties,
  type MccIssue,
  type EnterpriseMccCustomerResource,
  type EnterpriseMccCacheNodeResource,
  type MccCacheNodeTlsCertificateHistory,
  type MccCacheNodeTlsCertificateProperties,
  KnownVersions,
} from "./models/index.js";
export { type ConnectedCacheClientOptionalParams } from "./api/index.js";
export {
  type EnterpriseMccCacheNodesOperationsGetCacheNodeTlsCertificateHistoryOptionalParams,
  type EnterpriseMccCacheNodesOperationsGetCacheNodeMccIssueDetailsHistoryOptionalParams,
  type EnterpriseMccCacheNodesOperationsGetCacheNodeAutoUpdateHistoryOptionalParams,
  type EnterpriseMccCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams,
  type EnterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResourceOptionalParams,
  type EnterpriseMccCacheNodesOperationsDeleteOptionalParams,
  type EnterpriseMccCacheNodesOperationsUpdateOptionalParams,
  type EnterpriseMccCacheNodesOperationsCreateOrUpdateOptionalParams,
  type EnterpriseMccCacheNodesOperationsGetOptionalParams,
} from "./api/enterpriseMccCacheNodesOperations/index.js";
export {
  type EnterpriseMccCustomersListBySubscriptionOptionalParams,
  type EnterpriseMccCustomersListByResourceGroupOptionalParams,
  type EnterpriseMccCustomersDeleteOptionalParams,
  type EnterpriseMccCustomersUpdateOptionalParams,
  type EnterpriseMccCustomersCreateOrUpdateOptionalParams,
  type EnterpriseMccCustomersGetOptionalParams,
} from "./api/enterpriseMccCustomers/index.js";
export {
  type IspCacheNodesOperationsGetCacheNodeMccIssueDetailsHistoryOptionalParams,
  type IspCacheNodesOperationsGetCacheNodeAutoUpdateHistoryOptionalParams,
  type IspCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams,
  type IspCacheNodesOperationsGetBgpCidrsOptionalParams,
  type IspCacheNodesOperationsListByIspCustomerResourceOptionalParams,
  type IspCacheNodesOperationsDeleteOptionalParams,
  type IspCacheNodesOperationsUpdateOptionalParams,
  type IspCacheNodesOperationsCreateOrUpdateOptionalParams,
  type IspCacheNodesOperationsGetOptionalParams,
} from "./api/ispCacheNodesOperations/index.js";
export {
  type IspCustomersListBySubscriptionOptionalParams,
  type IspCustomersListByResourceGroupOptionalParams,
  type IspCustomersDeleteOptionalParams,
  type IspCustomersUpdateOptionalParams,
  type IspCustomersCreateOrUpdateOptionalParams,
  type IspCustomersGetOptionalParams,
} from "./api/ispCustomers/index.js";
export { type OperationsListOptionalParams } from "./api/operations/index.js";
export {
  type EnterpriseMccCacheNodesOperationsOperations,
  type EnterpriseMccCustomersOperations,
  type IspCacheNodesOperationsOperations,
  type IspCustomersOperations,
  type OperationsOperations,
} from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
