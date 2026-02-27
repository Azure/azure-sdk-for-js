// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ServiceNetworkingManagementClient } from "./serviceNetworkingManagementClient.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type Association,
  type AssociationProperties,
  KnownAssociationType,
  type AssociationType,
  type AssociationSubnet,
  KnownProvisioningState,
  type ProvisioningState,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type AssociationUpdate,
  type AssociationUpdateProperties,
  type AssociationSubnetUpdate,
  type Frontend,
  type FrontendProperties,
  type SecurityPolicyConfigurations,
  type WafSecurityPolicy,
  type IpAccessRulesSecurityPolicy,
  type FrontendUpdate,
  type FrontendUpdateProperties,
  type SecurityPolicy,
  type SecurityPolicyProperties,
  KnownPolicyType,
  type PolicyType,
  type WafPolicy,
  type IpAccessRulesPolicy,
  type IpAccessRule,
  KnownIpAccessRuleAction,
  type IpAccessRuleAction,
  type SecurityPolicyUpdate,
  type SecurityPolicyUpdateProperties,
  type TrafficController,
  type TrafficControllerProperties,
  type ResourceId,
  type TrafficControllerUpdate,
  type TrafficControllerUpdateProperties,
  type Operation,
  type OperationDisplay,
  KnownOrigin,
  type Origin,
  KnownActionType,
  type ActionType,
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
  SecurityPoliciesInterfaceOperations,
  TrafficControllerInterfaceOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
