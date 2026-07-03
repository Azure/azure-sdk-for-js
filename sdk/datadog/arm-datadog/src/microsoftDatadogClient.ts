// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftDatadogContext, MicrosoftDatadogClientOptionalParams } from "./api/index.js";
import { createMicrosoftDatadog } from "./api/index.js";
import type { BillingInfoOperations } from "./classic/billingInfo/index.js";
import { _getBillingInfoOperations } from "./classic/billingInfo/index.js";
import type { CreationSupportedOperations } from "./classic/creationSupported/index.js";
import { _getCreationSupportedOperations } from "./classic/creationSupported/index.js";
import type { DatadogMonitorResourcesOperations } from "./classic/datadogMonitorResources/index.js";
import { _getDatadogMonitorResourcesOperations } from "./classic/datadogMonitorResources/index.js";
import type { MarketplaceAgreementsOperations } from "./classic/marketplaceAgreements/index.js";
import { _getMarketplaceAgreementsOperations } from "./classic/marketplaceAgreements/index.js";
import type { MonitoredSubscriptionsOperations } from "./classic/monitoredSubscriptions/index.js";
import { _getMonitoredSubscriptionsOperations } from "./classic/monitoredSubscriptions/index.js";
import type { MonitorsOperations } from "./classic/monitors/index.js";
import { _getMonitorsOperations } from "./classic/monitors/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { OrganizationsOperations } from "./classic/organizations/index.js";
import { _getOrganizationsOperations } from "./classic/organizations/index.js";
import type { SaaSOperationGroupOperations } from "./classic/saaSOperationGroup/index.js";
import { _getSaaSOperationGroupOperations } from "./classic/saaSOperationGroup/index.js";
import type { SingleSignOnConfigurationsOperations } from "./classic/singleSignOnConfigurations/index.js";
import { _getSingleSignOnConfigurationsOperations } from "./classic/singleSignOnConfigurations/index.js";
import type { TagRulesOperations } from "./classic/tagRules/index.js";
import { _getTagRulesOperations } from "./classic/tagRules/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

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
