// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DnsResolverManagementClient } from "./dnsResolverManagementClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  DnsResolver,
  DnsResolverProperties,
  SubResource,
  KnownDnsResolverState,
  DnsResolverState,
  KnownProvisioningState,
  ProvisioningState,
  TrackedResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  CloudError,
  CloudErrorBody,
  ErrorDetail,
  ErrorAdditionalInfo,
  DnsResolverPatch,
  InboundEndpoint,
  InboundEndpointProperties,
  IpConfiguration,
  KnownIpAllocationMethod,
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
  KnownForwardingRuleState,
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
  KnownActionType,
  ActionType,
  KnownManagedDomainList,
  ManagedDomainList,
  KnownDnsSecurityRuleState,
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
  KnownAction,
  Action,
  KnownVersions,
} from "./models/index.js";
export { DnsResolverManagementClientOptionalParams } from "./api/index.js";
export {
  DnsForwardingRulesetsListByVirtualNetworkOptionalParams,
  DnsForwardingRulesetsListOptionalParams,
  DnsForwardingRulesetsListByResourceGroupOptionalParams,
  DnsForwardingRulesetsDeleteOptionalParams,
  DnsForwardingRulesetsUpdateOptionalParams,
  DnsForwardingRulesetsCreateOrUpdateOptionalParams,
  DnsForwardingRulesetsGetOptionalParams,
} from "./api/dnsForwardingRulesets/index.js";
export {
  DnsResolverDomainListsBulkOptionalParams,
  DnsResolverDomainListsListOptionalParams,
  DnsResolverDomainListsListByResourceGroupOptionalParams,
  DnsResolverDomainListsDeleteOptionalParams,
  DnsResolverDomainListsUpdateOptionalParams,
  DnsResolverDomainListsCreateOrUpdateOptionalParams,
  DnsResolverDomainListsGetOptionalParams,
} from "./api/dnsResolverDomainLists/index.js";
export {
  DnsResolverPoliciesListByVirtualNetworkOptionalParams,
  DnsResolverPoliciesListOptionalParams,
  DnsResolverPoliciesListByResourceGroupOptionalParams,
  DnsResolverPoliciesDeleteOptionalParams,
  DnsResolverPoliciesUpdateOptionalParams,
  DnsResolverPoliciesCreateOrUpdateOptionalParams,
  DnsResolverPoliciesGetOptionalParams,
} from "./api/dnsResolverPolicies/index.js";
export {
  DnsResolverPolicyVirtualNetworkLinksListOptionalParams,
  DnsResolverPolicyVirtualNetworkLinksDeleteOptionalParams,
  DnsResolverPolicyVirtualNetworkLinksUpdateOptionalParams,
  DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateOptionalParams,
  DnsResolverPolicyVirtualNetworkLinksGetOptionalParams,
} from "./api/dnsResolverPolicyVirtualNetworkLinks/index.js";
export {
  DnsResolversListByVirtualNetworkOptionalParams,
  DnsResolversListOptionalParams,
  DnsResolversListByResourceGroupOptionalParams,
  DnsResolversDeleteOptionalParams,
  DnsResolversUpdateOptionalParams,
  DnsResolversCreateOrUpdateOptionalParams,
  DnsResolversGetOptionalParams,
} from "./api/dnsResolvers/index.js";
export {
  DnsSecurityRulesListOptionalParams,
  DnsSecurityRulesDeleteOptionalParams,
  DnsSecurityRulesUpdateOptionalParams,
  DnsSecurityRulesCreateOrUpdateOptionalParams,
  DnsSecurityRulesGetOptionalParams,
} from "./api/dnsSecurityRules/index.js";
export {
  ForwardingRulesListOptionalParams,
  ForwardingRulesDeleteOptionalParams,
  ForwardingRulesUpdateOptionalParams,
  ForwardingRulesCreateOrUpdateOptionalParams,
  ForwardingRulesGetOptionalParams,
} from "./api/forwardingRules/index.js";
export {
  InboundEndpointsListOptionalParams,
  InboundEndpointsDeleteOptionalParams,
  InboundEndpointsUpdateOptionalParams,
  InboundEndpointsCreateOrUpdateOptionalParams,
  InboundEndpointsGetOptionalParams,
} from "./api/inboundEndpoints/index.js";
export {
  OutboundEndpointsListOptionalParams,
  OutboundEndpointsDeleteOptionalParams,
  OutboundEndpointsUpdateOptionalParams,
  OutboundEndpointsCreateOrUpdateOptionalParams,
  OutboundEndpointsGetOptionalParams,
} from "./api/outboundEndpoints/index.js";
export {
  VirtualNetworkLinksListOptionalParams,
  VirtualNetworkLinksDeleteOptionalParams,
  VirtualNetworkLinksUpdateOptionalParams,
  VirtualNetworkLinksCreateOrUpdateOptionalParams,
  VirtualNetworkLinksGetOptionalParams,
} from "./api/virtualNetworkLinks/index.js";
export {
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
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
