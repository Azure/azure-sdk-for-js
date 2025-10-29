// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PaloAltoNetworksCloudngfwContext,
  PaloAltoNetworksCloudngfwOptionalParams,
} from "./api/index.js";
import { createPaloAltoNetworksCloudngfw } from "./api/index.js";
import type { CertificateObjectGlobalRulestackOperations } from "./classic/certificateObjectGlobalRulestack/index.js";
import { _getCertificateObjectGlobalRulestackOperations } from "./classic/certificateObjectGlobalRulestack/index.js";
import type { CertificateObjectLocalRulestackOperations } from "./classic/certificateObjectLocalRulestack/index.js";
import { _getCertificateObjectLocalRulestackOperations } from "./classic/certificateObjectLocalRulestack/index.js";
import type { FirewallStatusOperations } from "./classic/firewallStatus/index.js";
import { _getFirewallStatusOperations } from "./classic/firewallStatus/index.js";
import type { FirewallsOperations } from "./classic/firewalls/index.js";
import { _getFirewallsOperations } from "./classic/firewalls/index.js";
import type { FqdnListGlobalRulestackOperations } from "./classic/fqdnListGlobalRulestack/index.js";
import { _getFqdnListGlobalRulestackOperations } from "./classic/fqdnListGlobalRulestack/index.js";
import type { FqdnListLocalRulestackOperations } from "./classic/fqdnListLocalRulestack/index.js";
import { _getFqdnListLocalRulestackOperations } from "./classic/fqdnListLocalRulestack/index.js";
import type { GlobalRulestackOperations } from "./classic/globalRulestack/index.js";
import { _getGlobalRulestackOperations } from "./classic/globalRulestack/index.js";
import type { LocalRulesOperations } from "./classic/localRules/index.js";
import { _getLocalRulesOperations } from "./classic/localRules/index.js";
import type { LocalRulestacksOperations } from "./classic/localRulestacks/index.js";
import { _getLocalRulestacksOperations } from "./classic/localRulestacks/index.js";
import type { MetricsObjectFirewallOperations } from "./classic/metricsObjectFirewall/index.js";
import { _getMetricsObjectFirewallOperations } from "./classic/metricsObjectFirewall/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PaloAltoNetworksCloudngfwOperationsOperations } from "./classic/paloAltoNetworksCloudngfwOperations/index.js";
import { _getPaloAltoNetworksCloudngfwOperationsOperations } from "./classic/paloAltoNetworksCloudngfwOperations/index.js";
import type { PostRulesOperations } from "./classic/postRules/index.js";
import { _getPostRulesOperations } from "./classic/postRules/index.js";
import type { PreRulesOperations } from "./classic/preRules/index.js";
import { _getPreRulesOperations } from "./classic/preRules/index.js";
import type { PrefixListGlobalRulestackOperations } from "./classic/prefixListGlobalRulestack/index.js";
import { _getPrefixListGlobalRulestackOperations } from "./classic/prefixListGlobalRulestack/index.js";
import type { PrefixListLocalRulestackOperations } from "./classic/prefixListLocalRulestack/index.js";
import { _getPrefixListLocalRulestackOperations } from "./classic/prefixListLocalRulestack/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { PaloAltoNetworksCloudngfwOptionalParams } from "./api/paloAltoNetworksCloudngfwContext.js";

export class PaloAltoNetworksCloudngfw {
  private _client: PaloAltoNetworksCloudngfwContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: PaloAltoNetworksCloudngfwOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createPaloAltoNetworksCloudngfw(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.paloAltoNetworksCloudngfwOperations = _getPaloAltoNetworksCloudngfwOperationsOperations(
      this._client,
    );
    this.prefixListLocalRulestack = _getPrefixListLocalRulestackOperations(this._client);
    this.localRules = _getLocalRulesOperations(this._client);
    this.fqdnListLocalRulestack = _getFqdnListLocalRulestackOperations(this._client);
    this.certificateObjectLocalRulestack = _getCertificateObjectLocalRulestackOperations(
      this._client,
    );
    this.firewallStatus = _getFirewallStatusOperations(this._client);
    this.metricsObjectFirewall = _getMetricsObjectFirewallOperations(this._client);
    this.localRulestacks = _getLocalRulestacksOperations(this._client);
    this.firewalls = _getFirewallsOperations(this._client);
    this.preRules = _getPreRulesOperations(this._client);
    this.prefixListGlobalRulestack = _getPrefixListGlobalRulestackOperations(this._client);
    this.postRules = _getPostRulesOperations(this._client);
    this.fqdnListGlobalRulestack = _getFqdnListGlobalRulestackOperations(this._client);
    this.certificateObjectGlobalRulestack = _getCertificateObjectGlobalRulestackOperations(
      this._client,
    );
    this.globalRulestack = _getGlobalRulestackOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for paloAltoNetworksCloudngfwOperations */
  public readonly paloAltoNetworksCloudngfwOperations: PaloAltoNetworksCloudngfwOperationsOperations;
  /** The operation groups for prefixListLocalRulestack */
  public readonly prefixListLocalRulestack: PrefixListLocalRulestackOperations;
  /** The operation groups for localRules */
  public readonly localRules: LocalRulesOperations;
  /** The operation groups for fqdnListLocalRulestack */
  public readonly fqdnListLocalRulestack: FqdnListLocalRulestackOperations;
  /** The operation groups for certificateObjectLocalRulestack */
  public readonly certificateObjectLocalRulestack: CertificateObjectLocalRulestackOperations;
  /** The operation groups for firewallStatus */
  public readonly firewallStatus: FirewallStatusOperations;
  /** The operation groups for metricsObjectFirewall */
  public readonly metricsObjectFirewall: MetricsObjectFirewallOperations;
  /** The operation groups for localRulestacks */
  public readonly localRulestacks: LocalRulestacksOperations;
  /** The operation groups for firewalls */
  public readonly firewalls: FirewallsOperations;
  /** The operation groups for preRules */
  public readonly preRules: PreRulesOperations;
  /** The operation groups for prefixListGlobalRulestack */
  public readonly prefixListGlobalRulestack: PrefixListGlobalRulestackOperations;
  /** The operation groups for postRules */
  public readonly postRules: PostRulesOperations;
  /** The operation groups for fqdnListGlobalRulestack */
  public readonly fqdnListGlobalRulestack: FqdnListGlobalRulestackOperations;
  /** The operation groups for certificateObjectGlobalRulestack */
  public readonly certificateObjectGlobalRulestack: CertificateObjectGlobalRulestackOperations;
  /** The operation groups for globalRulestack */
  public readonly globalRulestack: GlobalRulestackOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
