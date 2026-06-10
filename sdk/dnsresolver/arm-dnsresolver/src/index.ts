// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DnsResolverManagementClient } from "./dnsResolverManagementClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  DnsResolver,
  DnsResolverProperties,
  SubResource,
  DnsResolverState,
  ProvisioningState,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  CloudError,
  CloudErrorBody,
  ErrorDetail,
  ErrorAdditionalInfo,
  DnsResolverPatch,
  InboundEndpoint,
  InboundEndpointProperties,
  IpConfiguration,
  IpAllocationMethod,
  InboundEndpointPatch,
  OutboundEndpoint,
  OutboundEndpointProperties,
  OutboundEndpointPatch,
  DnsForwardingRuleset,
  DnsForwardingRulesetProperties,
  DnsForwardingRulesetPatch,
  VirtualNetworkDnsForwardingRuleset,
  VirtualNetworkLinkSubResourceProperties,
  ForwardingRule,
  ForwardingRuleProperties,
  TargetDnsServer,
  ForwardingRuleState,
  ProxyResource,
  ForwardingRulePatch,
  ForwardingRulePatchProperties,
  VirtualNetworkLink,
  VirtualNetworkLinkProperties,
  VirtualNetworkLinkPatch,
  VirtualNetworkLinkPatchProperties,
  DnsResolverPolicy,
  DnsResolverPolicyProperties,
  ErrorResponse,
  DnsResolverPolicyPatch,
  DnsSecurityRule,
  DnsSecurityRuleProperties,
  DnsSecurityRuleAction,
  ActionType,
  ManagedDomainList,
  DnsSecurityRuleState,
  DnsSecurityRulePatch,
  DnsSecurityRulePatchProperties,
  DnsResolverPolicyVirtualNetworkLink,
  DnsResolverPolicyVirtualNetworkLinkProperties,
  DnsResolverPolicyVirtualNetworkLinkPatch,
  DnsResolverDomainList,
  DnsResolverDomainListProperties,
  DnsResolverDomainListPatch,
  DnsResolverDomainListPatchProperties,
  DnsResolverDomainListBulk,
  DnsResolverDomainListBulkProperties,
  Action,
} from "./models/index.js";
export {
  KnownDnsResolverState,
  KnownProvisioningState,
  KnownCreatedByType,
  KnownIpAllocationMethod,
  KnownForwardingRuleState,
  KnownActionType,
  KnownManagedDomainList,
  KnownDnsSecurityRuleState,
  KnownAction,
  KnownVersions,
} from "./models/index.js";
export type { DnsResolverManagementClientOptionalParams } from "./api/index.js";
export type {
  DnsForwardingRulesetsListByVirtualNetworkOptionalParams,
  DnsForwardingRulesetsListOptionalParams,
  DnsForwardingRulesetsListByResourceGroupOptionalParams,
  DnsForwardingRulesetsDeleteOptionalParams,
  DnsForwardingRulesetsUpdateOptionalParams,
  DnsForwardingRulesetsCreateOrUpdateOptionalParams,
  DnsForwardingRulesetsGetOptionalParams,
} from "./api/dnsForwardingRulesets/index.js";
export type {
  DnsResolverDomainListsBulkOptionalParams,
  DnsResolverDomainListsListOptionalParams,
  DnsResolverDomainListsListByResourceGroupOptionalParams,
  DnsResolverDomainListsDeleteOptionalParams,
  DnsResolverDomainListsUpdateOptionalParams,
  DnsResolverDomainListsCreateOrUpdateOptionalParams,
  DnsResolverDomainListsGetOptionalParams,
} from "./api/dnsResolverDomainLists/index.js";
export type {
  DnsResolverPoliciesListByVirtualNetworkOptionalParams,
  DnsResolverPoliciesListOptionalParams,
  DnsResolverPoliciesListByResourceGroupOptionalParams,
  DnsResolverPoliciesDeleteOptionalParams,
  DnsResolverPoliciesUpdateOptionalParams,
  DnsResolverPoliciesCreateOrUpdateOptionalParams,
  DnsResolverPoliciesGetOptionalParams,
} from "./api/dnsResolverPolicies/index.js";
export type {
  DnsResolverPolicyVirtualNetworkLinksListOptionalParams,
  DnsResolverPolicyVirtualNetworkLinksDeleteOptionalParams,
  DnsResolverPolicyVirtualNetworkLinksUpdateOptionalParams,
  DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateOptionalParams,
  DnsResolverPolicyVirtualNetworkLinksGetOptionalParams,
} from "./api/dnsResolverPolicyVirtualNetworkLinks/index.js";
export type {
  DnsResolversListByVirtualNetworkOptionalParams,
  DnsResolversListOptionalParams,
  DnsResolversListByResourceGroupOptionalParams,
  DnsResolversDeleteOptionalParams,
  DnsResolversUpdateOptionalParams,
  DnsResolversCreateOrUpdateOptionalParams,
  DnsResolversGetOptionalParams,
} from "./api/dnsResolvers/index.js";
export type {
  DnsSecurityRulesListOptionalParams,
  DnsSecurityRulesDeleteOptionalParams,
  DnsSecurityRulesUpdateOptionalParams,
  DnsSecurityRulesCreateOrUpdateOptionalParams,
  DnsSecurityRulesGetOptionalParams,
} from "./api/dnsSecurityRules/index.js";
export type {
  ForwardingRulesListOptionalParams,
  ForwardingRulesDeleteOptionalParams,
  ForwardingRulesUpdateOptionalParams,
  ForwardingRulesCreateOrUpdateOptionalParams,
  ForwardingRulesGetOptionalParams,
} from "./api/forwardingRules/index.js";
export type {
  InboundEndpointsListOptionalParams,
  InboundEndpointsDeleteOptionalParams,
  InboundEndpointsUpdateOptionalParams,
  InboundEndpointsCreateOrUpdateOptionalParams,
  InboundEndpointsGetOptionalParams,
} from "./api/inboundEndpoints/index.js";
export type {
  OutboundEndpointsListOptionalParams,
  OutboundEndpointsDeleteOptionalParams,
  OutboundEndpointsUpdateOptionalParams,
  OutboundEndpointsCreateOrUpdateOptionalParams,
  OutboundEndpointsGetOptionalParams,
} from "./api/outboundEndpoints/index.js";
export type {
  VirtualNetworkLinksListOptionalParams,
  VirtualNetworkLinksDeleteOptionalParams,
  VirtualNetworkLinksUpdateOptionalParams,
  VirtualNetworkLinksCreateOrUpdateOptionalParams,
  VirtualNetworkLinksGetOptionalParams,
} from "./api/virtualNetworkLinks/index.js";
export type {
  DnsForwardingRulesetsOperations,
  DnsResolverDomainListsOperations,
  DnsResolverPoliciesOperations,
  DnsResolverPolicyVirtualNetworkLinksOperations,
  DnsResolversOperations,
  DnsSecurityRulesOperations,
  ForwardingRulesOperations,
  InboundEndpointsOperations,
  OutboundEndpointsOperations,
  VirtualNetworkLinksOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
