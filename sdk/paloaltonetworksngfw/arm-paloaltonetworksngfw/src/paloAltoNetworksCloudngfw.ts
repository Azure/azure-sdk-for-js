// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PaloAltoNetworksCloudngfwContext,
  PaloAltoNetworksCloudngfwOptionalParams,
  createPaloAltoNetworksCloudngfw,
} from "./api/index.js";
import {
  CertificateObjectGlobalRulestackOperations,
  _getCertificateObjectGlobalRulestackOperations,
} from "./classic/certificateObjectGlobalRulestack/index.js";
import {
  CertificateObjectLocalRulestackOperations,
  _getCertificateObjectLocalRulestackOperations,
} from "./classic/certificateObjectLocalRulestack/index.js";
import {
  CustomCaptureConfigurationsFirewallResourcesOperations,
  _getCustomCaptureConfigurationsFirewallResourcesOperations,
} from "./classic/customCaptureConfigurationsFirewallResources/index.js";
import {
  FirewallStatusOperations,
  _getFirewallStatusOperations,
} from "./classic/firewallStatus/index.js";
import { FirewallsOperations, _getFirewallsOperations } from "./classic/firewalls/index.js";
import {
  FqdnListGlobalRulestackOperations,
  _getFqdnListGlobalRulestackOperations,
} from "./classic/fqdnListGlobalRulestack/index.js";
import {
  FqdnListLocalRulestackOperations,
  _getFqdnListLocalRulestackOperations,
} from "./classic/fqdnListLocalRulestack/index.js";
import {
  GlobalRulestackOperations,
  _getGlobalRulestackOperations,
} from "./classic/globalRulestack/index.js";
import { LocalRulesOperations, _getLocalRulesOperations } from "./classic/localRules/index.js";
import {
  LocalRulestacksOperations,
  _getLocalRulestacksOperations,
} from "./classic/localRulestacks/index.js";
import {
  MetricsObjectFirewallOperations,
  _getMetricsObjectFirewallOperations,
} from "./classic/metricsObjectFirewall/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PaloAltoNetworksCloudngfwOperationsOperations,
  _getPaloAltoNetworksCloudngfwOperationsOperations,
} from "./classic/paloAltoNetworksCloudngfwOperations/index.js";
import { PostRulesOperations, _getPostRulesOperations } from "./classic/postRules/index.js";
import { PreRulesOperations, _getPreRulesOperations } from "./classic/preRules/index.js";
import {
  PrefixListGlobalRulestackOperations,
  _getPrefixListGlobalRulestackOperations,
} from "./classic/prefixListGlobalRulestack/index.js";
import {
  PrefixListLocalRulestackOperations,
  _getPrefixListLocalRulestackOperations,
} from "./classic/prefixListLocalRulestack/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { PaloAltoNetworksCloudngfwOptionalParams } from "./api/paloAltoNetworksCloudngfwContext.js";

export class PaloAltoNetworksCloudngfw {
  private _client: PaloAltoNetworksCloudngfwContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: PaloAltoNetworksCloudngfwOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: PaloAltoNetworksCloudngfwOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | PaloAltoNetworksCloudngfwOptionalParams,
    options?: PaloAltoNetworksCloudngfwOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createPaloAltoNetworksCloudngfw(credential, subscriptionId ?? "", {
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
    this.customCaptureConfigurationsFirewallResources =
      _getCustomCaptureConfigurationsFirewallResourcesOperations(this._client);
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
  /** The operation groups for customCaptureConfigurationsFirewallResources */
  public readonly customCaptureConfigurationsFirewallResources: CustomCaptureConfigurationsFirewallResourcesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
