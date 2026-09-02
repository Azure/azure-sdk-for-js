// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ServiceNetworkingManagementClient } from "./serviceNetworkingManagementClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Association,
  AssociationProperties,
  AssociationType,
  AssociationSubnet,
  ProvisioningState,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  AssociationUpdate,
  AssociationUpdateProperties,
  AssociationSubnetUpdate,
  Frontend,
  FrontendProperties,
  PublicNetworkAccess,
  FrontendAssociation,
  SecurityPolicyConfigurations,
  WafSecurityPolicy,
  IpAccessRulesSecurityPolicy,
  FrontendUpdate,
  FrontendUpdateProperties,
  SecurityPolicy,
  SecurityPolicyProperties,
  PolicyType,
  WafPolicy,
  IpAccessRulesPolicy,
  IpAccessRule,
  IpAccessRuleAction,
  SecurityPolicyUpdate,
  SecurityPolicyUpdateProperties,
  TrafficController,
  TrafficControllerProperties,
  ResourceId,
  TrafficControllerUpdate,
  TrafficControllerUpdateProperties,
  PrivateEndpointConnection,
  PrivateEndpointConnectionProperties,
  PrivateEndpointReference,
  PrivateLinkServiceConnectionState,
  PrivateLinkServiceConnectionStatus,
  ProxyResource,
  PrivateLinkResource,
  PrivateLinkResourceProperties,
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
} from "./models/index.js";
export {
  KnownAssociationType,
  KnownProvisioningState,
  KnownCreatedByType,
  KnownPublicNetworkAccess,
  KnownPolicyType,
  KnownIpAccessRuleAction,
  KnownPrivateLinkServiceConnectionStatus,
  KnownOrigin,
  KnownActionType,
  KnownVersions,
} from "./models/index.js";
export type { ServiceNetworkingManagementClientOptionalParams } from "./api/index.js";
export type {
  AssociationsInterfaceListByTrafficControllerOptionalParams,
  AssociationsInterfaceDeleteOptionalParams,
  AssociationsInterfaceUpdateOptionalParams,
  AssociationsInterfaceCreateOrUpdateOptionalParams,
  AssociationsInterfaceGetOptionalParams,
} from "./api/associationsInterface/index.js";
export type {
  FrontendsInterfaceListByTrafficControllerOptionalParams,
  FrontendsInterfaceDeleteOptionalParams,
  FrontendsInterfaceUpdateOptionalParams,
  FrontendsInterfaceCreateOrUpdateOptionalParams,
  FrontendsInterfaceGetOptionalParams,
} from "./api/frontendsInterface/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PrivateEndpointConnectionsInterfaceListByTrafficControllerOptionalParams,
  PrivateEndpointConnectionsInterfaceDeleteOptionalParams,
  PrivateEndpointConnectionsInterfaceUpdateOptionalParams,
  PrivateEndpointConnectionsInterfaceGetOptionalParams,
} from "./api/privateEndpointConnectionsInterface/index.js";
export type {
  PrivateLinkResourcesInterfaceListByTrafficControllerOptionalParams,
  PrivateLinkResourcesInterfaceGetOptionalParams,
} from "./api/privateLinkResourcesInterface/index.js";
export type {
  SecurityPoliciesInterfaceListByTrafficControllerOptionalParams,
  SecurityPoliciesInterfaceDeleteOptionalParams,
  SecurityPoliciesInterfaceUpdateOptionalParams,
  SecurityPoliciesInterfaceCreateOrUpdateOptionalParams,
  SecurityPoliciesInterfaceGetOptionalParams,
} from "./api/securityPoliciesInterface/index.js";
export type {
  TrafficControllerInterfaceListBySubscriptionOptionalParams,
  TrafficControllerInterfaceListByResourceGroupOptionalParams,
  TrafficControllerInterfaceDeleteOptionalParams,
  TrafficControllerInterfaceUpdateOptionalParams,
  TrafficControllerInterfaceCreateOrUpdateOptionalParams,
  TrafficControllerInterfaceGetOptionalParams,
} from "./api/trafficControllerInterface/index.js";
export type {
  AssociationsInterfaceOperations,
  FrontendsInterfaceOperations,
  OperationsOperations,
  PrivateEndpointConnectionsInterfaceOperations,
  PrivateLinkResourcesInterfaceOperations,
  SecurityPoliciesInterfaceOperations,
  TrafficControllerInterfaceOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
