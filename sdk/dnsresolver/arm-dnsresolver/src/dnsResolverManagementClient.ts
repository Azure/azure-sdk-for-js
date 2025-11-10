// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DnsResolverManagementContext,
  DnsResolverManagementClientOptionalParams,
} from "./api/index.js";
import { createDnsResolverManagement } from "./api/index.js";
import type { DnsForwardingRulesetsOperations } from "./classic/dnsForwardingRulesets/index.js";
import { _getDnsForwardingRulesetsOperations } from "./classic/dnsForwardingRulesets/index.js";
import type { DnsResolverDomainListsOperations } from "./classic/dnsResolverDomainLists/index.js";
import { _getDnsResolverDomainListsOperations } from "./classic/dnsResolverDomainLists/index.js";
import type { DnsResolverPoliciesOperations } from "./classic/dnsResolverPolicies/index.js";
import { _getDnsResolverPoliciesOperations } from "./classic/dnsResolverPolicies/index.js";
import type { DnsResolverPolicyVirtualNetworkLinksOperations } from "./classic/dnsResolverPolicyVirtualNetworkLinks/index.js";
import { _getDnsResolverPolicyVirtualNetworkLinksOperations } from "./classic/dnsResolverPolicyVirtualNetworkLinks/index.js";
import type { DnsResolversOperations } from "./classic/dnsResolvers/index.js";
import { _getDnsResolversOperations } from "./classic/dnsResolvers/index.js";
import type { DnsSecurityRulesOperations } from "./classic/dnsSecurityRules/index.js";
import { _getDnsSecurityRulesOperations } from "./classic/dnsSecurityRules/index.js";
import type { ForwardingRulesOperations } from "./classic/forwardingRules/index.js";
import { _getForwardingRulesOperations } from "./classic/forwardingRules/index.js";
import type { InboundEndpointsOperations } from "./classic/inboundEndpoints/index.js";
import { _getInboundEndpointsOperations } from "./classic/inboundEndpoints/index.js";
import type { OutboundEndpointsOperations } from "./classic/outboundEndpoints/index.js";
import { _getOutboundEndpointsOperations } from "./classic/outboundEndpoints/index.js";
import type { VirtualNetworkLinksOperations } from "./classic/virtualNetworkLinks/index.js";
import { _getVirtualNetworkLinksOperations } from "./classic/virtualNetworkLinks/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { DnsResolverManagementClientOptionalParams } from "./api/dnsResolverManagementContext.js";

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
