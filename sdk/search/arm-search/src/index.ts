// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { SearchManagementClient } from "./searchManagementClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  SearchManagementRequestOptions,
  QuotaUsageResult,
  QuotaUsageResultName,
  CloudError,
  CloudErrorBody,
  OfferingsListResult,
  OfferingsByRegion,
  FeatureOffering,
  SkuOffering,
  Sku,
  SkuName,
  SkuLimits,
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  PrivateEndpointConnection,
  PrivateEndpointConnectionProperties,
  PrivateEndpointConnectionPropertiesPrivateEndpoint,
  PrivateEndpointConnectionPropertiesPrivateLinkServiceConnectionState,
  PrivateLinkServiceConnectionStatus,
  PrivateLinkServiceConnectionProvisioningState,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  SharedPrivateLinkResource,
  SharedPrivateLinkResourceProperties,
  SharedPrivateLinkResourceStatus,
  SharedPrivateLinkResourceProvisioningState,
  NetworkSecurityPerimeterConfiguration,
  NetworkSecurityPerimeterConfigurationProperties,
  NetworkSecurityPerimeterConfigurationProvisioningState,
  ProvisioningIssue,
  ProvisioningIssueProperties,
  IssueType,
  Severity,
  AccessRule,
  AccessRuleProperties,
  AccessRuleDirection,
  AccessRulePropertiesSubscriptionsItem,
  NetworkSecurityPerimeter,
  ResourceAssociation,
  ResourceAssociationAccessMode,
  NetworkSecurityProfile,
  CheckNameAvailabilityInput,
  CheckNameAvailabilityOutput,
  UnavailableNameReason,
  SearchService,
  SearchServiceProperties,
  HostingMode,
  ComputeType,
  PublicNetworkAccess,
  SearchServiceStatus,
  ProvisioningState,
  NetworkRuleSet,
  IpRule,
  SearchBypass,
  SearchDataExfiltrationProtection,
  EncryptionWithCmk,
  SearchEncryptionWithCmk,
  SearchEncryptionComplianceStatus,
  SearchResourceEncryptionKey,
  DataIdentity,
  DataIdentityUnion,
  DataNoneIdentity,
  DataUserAssignedIdentity,
  AzureActiveDirectoryApplicationCredentials,
  DataPlaneAuthOptions,
  DataPlaneAadOrApiKeyAuthOption,
  AadAuthFailureMode,
  SearchSemanticSearch,
  KnowledgeRetrieval,
  UpgradeAvailable,
  Identity,
  IdentityType,
  UserAssignedIdentity,
  TrackedResource,
  SearchServiceUpdate,
  AdminKeyResult,
  QueryKey,
  PrivateLinkResource,
  PrivateLinkResourceProperties,
  ShareablePrivateLinkResourceType,
  ShareablePrivateLinkResourceProperties,
  AdminKeyKind,
} from "./models/index.js";
export {
  KnownSkuName,
  KnownOrigin,
  KnownActionType,
  KnownPrivateLinkServiceConnectionProvisioningState,
  KnownCreatedByType,
  KnownSharedPrivateLinkResourceStatus,
  KnownSharedPrivateLinkResourceProvisioningState,
  KnownNetworkSecurityPerimeterConfigurationProvisioningState,
  KnownIssueType,
  KnownSeverity,
  KnownAccessRuleDirection,
  KnownResourceAssociationAccessMode,
  KnownUnavailableNameReason,
  KnownComputeType,
  KnownPublicNetworkAccess,
  KnownSearchBypass,
  KnownSearchDataExfiltrationProtection,
  KnownSearchSemanticSearch,
  KnownKnowledgeRetrieval,
  KnownUpgradeAvailable,
  KnownIdentityType,
  KnownVersions,
} from "./models/index.js";
export type {
  UsageBySubscriptionSkuOptionalParams,
  SearchManagementClientOptionalParams,
} from "./api/index.js";
export type {
  AdminKeysRegenerateOptionalParams,
  AdminKeysGetOptionalParams,
} from "./api/adminKeys/index.js";
export type {
  NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  NetworkSecurityPerimeterConfigurationsListByServiceOptionalParams,
  NetworkSecurityPerimeterConfigurationsGetOptionalParams,
} from "./api/networkSecurityPerimeterConfigurations/index.js";
export type { OfferingsListOptionalParams } from "./api/offerings/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PrivateEndpointConnectionsListByServiceOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./api/privateEndpointConnections/index.js";
export type { PrivateLinkResourcesListSupportedOptionalParams } from "./api/privateLinkResources/index.js";
export type {
  QueryKeysDeleteOptionalParams,
  QueryKeysListBySearchServiceOptionalParams,
  QueryKeysCreateOptionalParams,
} from "./api/queryKeys/index.js";
export type {
  ServicesUpgradeOptionalParams,
  ServicesListBySubscriptionOptionalParams,
  ServicesListByResourceGroupOptionalParams,
  ServicesDeleteOptionalParams,
  ServicesUpdateOptionalParams,
  ServicesCreateOrUpdateOptionalParams,
  ServicesGetOptionalParams,
  ServicesCheckNameAvailabilityOptionalParams,
} from "./api/services/index.js";
export type {
  SharedPrivateLinkResourcesListByServiceOptionalParams,
  SharedPrivateLinkResourcesDeleteOptionalParams,
  SharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  SharedPrivateLinkResourcesGetOptionalParams,
} from "./api/sharedPrivateLinkResources/index.js";
export type { UsagesListBySubscriptionOptionalParams } from "./api/usages/index.js";
export type {
  AdminKeysOperations,
  NetworkSecurityPerimeterConfigurationsOperations,
  OfferingsOperations,
  OperationsOperations,
  PrivateEndpointConnectionsOperations,
  PrivateLinkResourcesOperations,
  QueryKeysOperations,
  ServicesOperations,
  SharedPrivateLinkResourcesOperations,
  UsagesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
