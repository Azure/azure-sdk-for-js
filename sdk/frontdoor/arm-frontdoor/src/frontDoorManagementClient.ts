// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  FrontDoorManagementContext,
  FrontDoorManagementClientOptionalParams,
} from "./api/index.js";
import { createFrontDoorManagement } from "./api/index.js";
import type { EndpointsOperations } from "./classic/endpoints/index.js";
import { _getEndpointsOperations } from "./classic/endpoints/index.js";
import type { ExperimentsOperations } from "./classic/experiments/index.js";
import { _getExperimentsOperations } from "./classic/experiments/index.js";
import type { FrontDoorNameAvailabilityOperations } from "./classic/frontDoorNameAvailability/index.js";
import { _getFrontDoorNameAvailabilityOperations } from "./classic/frontDoorNameAvailability/index.js";
import type { FrontDoorNameAvailabilityWithSubscriptionOperations } from "./classic/frontDoorNameAvailabilityWithSubscription/index.js";
import { _getFrontDoorNameAvailabilityWithSubscriptionOperations } from "./classic/frontDoorNameAvailabilityWithSubscription/index.js";
import type { FrontDoorsOperations } from "./classic/frontDoors/index.js";
import { _getFrontDoorsOperations } from "./classic/frontDoors/index.js";
import type { FrontendEndpointsOperations } from "./classic/frontendEndpoints/index.js";
import { _getFrontendEndpointsOperations } from "./classic/frontendEndpoints/index.js";
import type { ManagedRuleSetsOperations } from "./classic/managedRuleSets/index.js";
import { _getManagedRuleSetsOperations } from "./classic/managedRuleSets/index.js";
import type { NetworkExperimentProfilesOperations } from "./classic/networkExperimentProfiles/index.js";
import { _getNetworkExperimentProfilesOperations } from "./classic/networkExperimentProfiles/index.js";
import type { PoliciesOperations } from "./classic/policies/index.js";
import { _getPoliciesOperations } from "./classic/policies/index.js";
import type { PreconfiguredEndpointsOperations } from "./classic/preconfiguredEndpoints/index.js";
import { _getPreconfiguredEndpointsOperations } from "./classic/preconfiguredEndpoints/index.js";
import type { ReportsOperations } from "./classic/reports/index.js";
import { _getReportsOperations } from "./classic/reports/index.js";
import type { RulesEnginesOperations } from "./classic/rulesEngines/index.js";
import { _getRulesEnginesOperations } from "./classic/rulesEngines/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { FrontDoorManagementClientOptionalParams } from "./api/frontDoorManagementContext.js";

export class FrontDoorManagementClient {
  private _client: FrontDoorManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: FrontDoorManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: FrontDoorManagementClientOptionalParams,
  );
  /** APIs to manage web application firewall rules. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | FrontDoorManagementClientOptionalParams,
    options?: FrontDoorManagementClientOptionalParams,
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
    this._client = createFrontDoorManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.frontDoorNameAvailabilityWithSubscription =
      _getFrontDoorNameAvailabilityWithSubscriptionOperations(this._client);
    this.frontDoorNameAvailability = _getFrontDoorNameAvailabilityOperations(this._client);
    this.managedRuleSets = _getManagedRuleSetsOperations(this._client);
    this.reports = _getReportsOperations(this._client);
    this.preconfiguredEndpoints = _getPreconfiguredEndpointsOperations(this._client);
    this.networkExperimentProfiles = _getNetworkExperimentProfilesOperations(this._client);
    this.endpoints = _getEndpointsOperations(this._client);
    this.policies = _getPoliciesOperations(this._client);
    this.experiments = _getExperimentsOperations(this._client);
    this.rulesEngines = _getRulesEnginesOperations(this._client);
    this.frontendEndpoints = _getFrontendEndpointsOperations(this._client);
    this.frontDoors = _getFrontDoorsOperations(this._client);
  }

  /** The operation groups for frontDoorNameAvailabilityWithSubscription */
  public readonly frontDoorNameAvailabilityWithSubscription: FrontDoorNameAvailabilityWithSubscriptionOperations;
  /** The operation groups for frontDoorNameAvailability */
  public readonly frontDoorNameAvailability: FrontDoorNameAvailabilityOperations;
  /** The operation groups for managedRuleSets */
  public readonly managedRuleSets: ManagedRuleSetsOperations;
  /** The operation groups for reports */
  public readonly reports: ReportsOperations;
  /** The operation groups for preconfiguredEndpoints */
  public readonly preconfiguredEndpoints: PreconfiguredEndpointsOperations;
  /** The operation groups for networkExperimentProfiles */
  public readonly networkExperimentProfiles: NetworkExperimentProfilesOperations;
  /** The operation groups for endpoints */
  public readonly endpoints: EndpointsOperations;
  /** The operation groups for policies */
  public readonly policies: PoliciesOperations;
  /** The operation groups for experiments */
  public readonly experiments: ExperimentsOperations;
  /** The operation groups for rulesEngines */
  public readonly rulesEngines: RulesEnginesOperations;
  /** The operation groups for frontendEndpoints */
  public readonly frontendEndpoints: FrontendEndpointsOperations;
  /** The operation groups for frontDoors */
  public readonly frontDoors: FrontDoorsOperations;
}
