// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DnsResolverManagementContext,
  DnsResolverManagementClientOptionalParams,
  createDnsResolverManagement,
} from "./api/index.js";
import {
  DnsForwardingRulesetsOperations,
  _getDnsForwardingRulesetsOperations,
} from "./classic/dnsForwardingRulesets/index.js";
import {
  DnsResolverDomainListsOperations,
  _getDnsResolverDomainListsOperations,
} from "./classic/dnsResolverDomainLists/index.js";
import {
  DnsResolverPoliciesOperations,
  _getDnsResolverPoliciesOperations,
} from "./classic/dnsResolverPolicies/index.js";
import {
  DnsResolverPolicyVirtualNetworkLinksOperations,
  _getDnsResolverPolicyVirtualNetworkLinksOperations,
} from "./classic/dnsResolverPolicyVirtualNetworkLinks/index.js";
import {
  DnsResolversOperations,
  _getDnsResolversOperations,
} from "./classic/dnsResolvers/index.js";
import {
  DnsSecurityRulesOperations,
  _getDnsSecurityRulesOperations,
} from "./classic/dnsSecurityRules/index.js";
import {
  ForwardingRulesOperations,
  _getForwardingRulesOperations,
} from "./classic/forwardingRules/index.js";
import {
  InboundEndpointsOperations,
  _getInboundEndpointsOperations,
} from "./classic/inboundEndpoints/index.js";
import {
  OutboundEndpointsOperations,
  _getOutboundEndpointsOperations,
} from "./classic/outboundEndpoints/index.js";
import {
  VirtualNetworkLinksOperations,
  _getVirtualNetworkLinksOperations,
} from "./classic/virtualNetworkLinks/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { DnsResolverManagementClientOptionalParams } from "./api/dnsResolverManagementContext.js";

export class DnsResolverManagementClient {
  private _client: DnsResolverManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The DNS Resolver Management Client. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: DnsResolverManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDnsResolverManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.dnsResolverDomainLists = _getDnsResolverDomainListsOperations(this._client);
    this.dnsResolverPolicyVirtualNetworkLinks = _getDnsResolverPolicyVirtualNetworkLinksOperations(
      this._client,
    );
    this.dnsSecurityRules = _getDnsSecurityRulesOperations(this._client);
    this.dnsResolverPolicies = _getDnsResolverPoliciesOperations(this._client);
    this.virtualNetworkLinks = _getVirtualNetworkLinksOperations(this._client);
    this.forwardingRules = _getForwardingRulesOperations(this._client);
    this.dnsForwardingRulesets = _getDnsForwardingRulesetsOperations(this._client);
    this.outboundEndpoints = _getOutboundEndpointsOperations(this._client);
    this.inboundEndpoints = _getInboundEndpointsOperations(this._client);
    this.dnsResolvers = _getDnsResolversOperations(this._client);
  }

  /** The operation groups for dnsResolverDomainLists */
  public readonly dnsResolverDomainLists: DnsResolverDomainListsOperations;
  /** The operation groups for dnsResolverPolicyVirtualNetworkLinks */
  public readonly dnsResolverPolicyVirtualNetworkLinks: DnsResolverPolicyVirtualNetworkLinksOperations;
  /** The operation groups for dnsSecurityRules */
  public readonly dnsSecurityRules: DnsSecurityRulesOperations;
  /** The operation groups for dnsResolverPolicies */
  public readonly dnsResolverPolicies: DnsResolverPoliciesOperations;
  /** The operation groups for virtualNetworkLinks */
  public readonly virtualNetworkLinks: VirtualNetworkLinksOperations;
  /** The operation groups for forwardingRules */
  public readonly forwardingRules: ForwardingRulesOperations;
  /** The operation groups for dnsForwardingRulesets */
  public readonly dnsForwardingRulesets: DnsForwardingRulesetsOperations;
  /** The operation groups for outboundEndpoints */
  public readonly outboundEndpoints: OutboundEndpointsOperations;
  /** The operation groups for inboundEndpoints */
  public readonly inboundEndpoints: InboundEndpointsOperations;
  /** The operation groups for dnsResolvers */
  public readonly dnsResolvers: DnsResolversOperations;
}
