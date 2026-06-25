// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  NewRelicObservabilityContext,
  NewRelicObservabilityOptionalParams,
  createNewRelicObservability,
} from "./api/index.js";
import { AccountsOperations, _getAccountsOperations } from "./classic/accounts/index.js";
import { BillingInfoOperations, _getBillingInfoOperations } from "./classic/billingInfo/index.js";
import {
  ConnectedPartnerResourcesOperations,
  _getConnectedPartnerResourcesOperations,
} from "./classic/connectedPartnerResources/index.js";
import {
  MonitoredSubscriptionsOperations,
  _getMonitoredSubscriptionsOperations,
} from "./classic/monitoredSubscriptions/index.js";
import { MonitorsOperations, _getMonitorsOperations } from "./classic/monitors/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  OrganizationsOperations,
  _getOrganizationsOperations,
} from "./classic/organizations/index.js";
import { PlansOperations, _getPlansOperations } from "./classic/plans/index.js";
import { SaaSOperations, _getSaaSOperations } from "./classic/saaS/index.js";
import { TagRulesOperations, _getTagRulesOperations } from "./classic/tagRules/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { NewRelicObservabilityOptionalParams } from "./api/newRelicObservabilityContext.js";

export class NewRelicObservability {
  private _client: NewRelicObservabilityContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: NewRelicObservabilityOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createNewRelicObservability(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.saaS = _getSaaSOperations(this._client);
    this.plans = _getPlansOperations(this._client);
    this.organizations = _getOrganizationsOperations(this._client);
    this.accounts = _getAccountsOperations(this._client);
    this.connectedPartnerResources = _getConnectedPartnerResourcesOperations(this._client);
    this.billingInfo = _getBillingInfoOperations(this._client);
    this.monitors = _getMonitorsOperations(this._client);
    this.monitoredSubscriptions = _getMonitoredSubscriptionsOperations(this._client);
    this.tagRules = _getTagRulesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for saaS */
  public readonly saaS: SaaSOperations;
  /** The operation groups for plans */
  public readonly plans: PlansOperations;
  /** The operation groups for organizations */
  public readonly organizations: OrganizationsOperations;
  /** The operation groups for accounts */
  public readonly accounts: AccountsOperations;
  /** The operation groups for connectedPartnerResources */
  public readonly connectedPartnerResources: ConnectedPartnerResourcesOperations;
  /** The operation groups for billingInfo */
  public readonly billingInfo: BillingInfoOperations;
  /** The operation groups for monitors */
  public readonly monitors: MonitorsOperations;
  /** The operation groups for monitoredSubscriptions */
  public readonly monitoredSubscriptions: MonitoredSubscriptionsOperations;
  /** The operation groups for tagRules */
  public readonly tagRules: TagRulesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
