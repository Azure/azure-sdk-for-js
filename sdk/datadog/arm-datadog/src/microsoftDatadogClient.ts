// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  MicrosoftDatadogContext,
  MicrosoftDatadogClientOptionalParams,
  createMicrosoftDatadog,
} from "./api/index.js";
import { BillingInfoOperations, _getBillingInfoOperations } from "./classic/billingInfo/index.js";
import {
  CreationSupportedOperations,
  _getCreationSupportedOperations,
} from "./classic/creationSupported/index.js";
import {
  DatadogMonitorResourcesOperations,
  _getDatadogMonitorResourcesOperations,
} from "./classic/datadogMonitorResources/index.js";
import {
  MarketplaceAgreementsOperations,
  _getMarketplaceAgreementsOperations,
} from "./classic/marketplaceAgreements/index.js";
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
import {
  SaaSOperationGroupOperations,
  _getSaaSOperationGroupOperations,
} from "./classic/saaSOperationGroup/index.js";
import {
  SingleSignOnConfigurationsOperations,
  _getSingleSignOnConfigurationsOperations,
} from "./classic/singleSignOnConfigurations/index.js";
import { TagRulesOperations, _getTagRulesOperations } from "./classic/tagRules/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { MicrosoftDatadogClientOptionalParams } from "./api/microsoftDatadogContext.js";

export class MicrosoftDatadogClient {
  private _client: MicrosoftDatadogContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: MicrosoftDatadogClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: MicrosoftDatadogClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | MicrosoftDatadogClientOptionalParams,
    options?: MicrosoftDatadogClientOptionalParams,
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
    this._client = createMicrosoftDatadog(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.creationSupported = _getCreationSupportedOperations(this._client);
    this.marketplaceAgreements = _getMarketplaceAgreementsOperations(this._client);
    this.singleSignOnConfigurations = _getSingleSignOnConfigurationsOperations(this._client);
    this.organizations = _getOrganizationsOperations(this._client);
    this.billingInfo = _getBillingInfoOperations(this._client);
    this.monitors = _getMonitorsOperations(this._client);
    this.saaSOperationGroup = _getSaaSOperationGroupOperations(this._client);
    this.monitoredSubscriptions = _getMonitoredSubscriptionsOperations(this._client);
    this.tagRules = _getTagRulesOperations(this._client);
    this.datadogMonitorResources = _getDatadogMonitorResourcesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for creationSupported */
  public readonly creationSupported: CreationSupportedOperations;
  /** The operation groups for marketplaceAgreements */
  public readonly marketplaceAgreements: MarketplaceAgreementsOperations;
  /** The operation groups for singleSignOnConfigurations */
  public readonly singleSignOnConfigurations: SingleSignOnConfigurationsOperations;
  /** The operation groups for organizations */
  public readonly organizations: OrganizationsOperations;
  /** The operation groups for billingInfo */
  public readonly billingInfo: BillingInfoOperations;
  /** The operation groups for monitors */
  public readonly monitors: MonitorsOperations;
  /** The operation groups for saaSOperationGroup */
  public readonly saaSOperationGroup: SaaSOperationGroupOperations;
  /** The operation groups for monitoredSubscriptions */
  public readonly monitoredSubscriptions: MonitoredSubscriptionsOperations;
  /** The operation groups for tagRules */
  public readonly tagRules: TagRulesOperations;
  /** The operation groups for datadogMonitorResources */
  public readonly datadogMonitorResources: DatadogMonitorResourcesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
