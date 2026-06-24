// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { SignalRManagementClient } from "./signalRManagementClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  OperationProperties,
  ServiceSpecification,
  MetricSpecification,
  Dimension,
  LogSpecification,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  SharedPrivateLinkResource,
  SharedPrivateLinkResourceProperties,
  ProvisioningState,
  SharedPrivateLinkResourceStatus,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  SignalRResource,
  SignalRProperties,
  PrivateEndpointConnection,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateLinkServiceConnectionStatus,
  SignalRTlsSettings,
  SignalRFeature,
  FeatureFlags,
  LiveTraceConfiguration,
  LiveTraceCategory,
  ResourceLogConfiguration,
  ResourceLogCategory,
  SignalRCorsSettings,
  ServerlessSettings,
  ServerlessUpstreamSettings,
  UpstreamTemplate,
  UpstreamAuthSettings,
  UpstreamAuthType,
  ManagedIdentitySettings,
  SignalRNetworkACLs,
  ACLAction,
  NetworkACL,
  SignalRRequestType,
  PrivateEndpointACL,
  IPRule,
  ApplicationFirewallSettings,
  ClientConnectionCountRule,
  ClientConnectionCountRuleUnion,
  ClientConnectionCountRuleDiscriminator,
  ThrottleByJwtCustomClaimRule,
  ThrottleByJwtSignatureRule,
  ThrottleByUserIdRule,
  ClientTrafficControlRule,
  ClientTrafficControlRuleUnion,
  ClientTrafficControlRuleDiscriminator,
  TrafficThrottleByJwtCustomClaimRule,
  TrafficThrottleByJwtSignatureRule,
  TrafficThrottleByUserIdRule,
  RouteSettings,
  ResourceSku,
  SignalRSkuTier,
  ServiceKind,
  ManagedIdentity,
  ManagedIdentityType,
  UserAssignedIdentityProperty,
  TrackedResource,
  SignalRKeys,
  RegenerateKeyParameters,
  KeyType,
  SkuList,
  Sku,
  SkuCapacity,
  ScaleType,
  NameAvailabilityParameters,
  NameAvailability,
  PrivateLinkResource,
  PrivateLinkResourceProperties,
  ShareablePrivateLinkResourceType,
  ShareablePrivateLinkResourceProperties,
  CustomCertificate,
  CustomCertificateProperties,
  CustomDomain,
  CustomDomainProperties,
  ResourceReference,
  Replica,
  ReplicaProperties,
  SignalRUsage,
  SignalRUsageName,
} from "./models/index.js";
export {
  KnownProvisioningState,
  KnownSharedPrivateLinkResourceStatus,
  KnownCreatedByType,
  KnownPrivateLinkServiceConnectionStatus,
  KnownFeatureFlags,
  KnownUpstreamAuthType,
  KnownACLAction,
  KnownSignalRRequestType,
  KnownClientConnectionCountRuleDiscriminator,
  KnownClientTrafficControlRuleDiscriminator,
  KnownSignalRSkuTier,
  KnownServiceKind,
  KnownManagedIdentityType,
  KnownKeyType,
  KnownScaleType,
  KnownVersions,
} from "./models/index.js";
export type { SignalRManagementClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  SignalRCheckNameAvailabilityOptionalParams,
  SignalRListReplicaSkusOptionalParams,
  SignalRListSkusOptionalParams,
  SignalRRestartOptionalParams,
  SignalRRegenerateKeyOptionalParams,
  SignalRListKeysOptionalParams,
  SignalRListBySubscriptionOptionalParams,
  SignalRListByResourceGroupOptionalParams,
  SignalRDeleteOptionalParams,
  SignalRUpdateOptionalParams,
  SignalRCreateOrUpdateOptionalParams,
  SignalRGetOptionalParams,
} from "./api/signalR/index.js";
export type {
  SignalRCustomCertificatesListOptionalParams,
  SignalRCustomCertificatesDeleteOptionalParams,
  SignalRCustomCertificatesCreateOrUpdateOptionalParams,
  SignalRCustomCertificatesGetOptionalParams,
} from "./api/signalRCustomCertificates/index.js";
export type {
  SignalRCustomDomainsListOptionalParams,
  SignalRCustomDomainsDeleteOptionalParams,
  SignalRCustomDomainsCreateOrUpdateOptionalParams,
  SignalRCustomDomainsGetOptionalParams,
} from "./api/signalRCustomDomains/index.js";
export type {
  SignalRPrivateEndpointConnectionsListOptionalParams,
  SignalRPrivateEndpointConnectionsDeleteOptionalParams,
  SignalRPrivateEndpointConnectionsUpdateOptionalParams,
  SignalRPrivateEndpointConnectionsGetOptionalParams,
} from "./api/signalRPrivateEndpointConnections/index.js";
export type { SignalRPrivateLinkResourcesListOptionalParams } from "./api/signalRPrivateLinkResources/index.js";
export type {
  SignalRReplicasRestartOptionalParams,
  SignalRReplicasListOptionalParams,
  SignalRReplicasDeleteOptionalParams,
  SignalRReplicasUpdateOptionalParams,
  SignalRReplicasCreateOrUpdateOptionalParams,
  SignalRReplicasGetOptionalParams,
} from "./api/signalRReplicas/index.js";
export type {
  SignalRReplicaSharedPrivateLinkResourcesListOptionalParams,
  SignalRReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  SignalRReplicaSharedPrivateLinkResourcesGetOptionalParams,
} from "./api/signalRReplicaSharedPrivateLinkResources/index.js";
export type {
  SignalRSharedPrivateLinkResourcesListOptionalParams,
  SignalRSharedPrivateLinkResourcesDeleteOptionalParams,
  SignalRSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  SignalRSharedPrivateLinkResourcesGetOptionalParams,
} from "./api/signalRSharedPrivateLinkResources/index.js";
export type { UsagesListOptionalParams } from "./api/usages/index.js";
export type {
  OperationsOperations,
  SignalROperations,
  SignalRCustomCertificatesOperations,
  SignalRCustomDomainsOperations,
  SignalRPrivateEndpointConnectionsOperations,
  SignalRPrivateLinkResourcesOperations,
  SignalRReplicasOperations,
  SignalRReplicaSharedPrivateLinkResourcesOperations,
  SignalRSharedPrivateLinkResourcesOperations,
  UsagesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
