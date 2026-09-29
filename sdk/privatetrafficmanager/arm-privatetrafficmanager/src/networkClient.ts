// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkContext, NetworkClientOptionalParams } from "./api/index.js";
import { createNetwork } from "./api/index.js";
import type { EndpointsOperations } from "./classic/endpoints/index.js";
import { _getEndpointsOperations } from "./classic/endpoints/index.js";
import type { HealthPoliciesOperations } from "./classic/healthPolicies/index.js";
import { _getHealthPoliciesOperations } from "./classic/healthPolicies/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { ProfileProbingGatewaysOperations } from "./classic/profileProbingGateways/index.js";
import { _getProfileProbingGatewaysOperations } from "./classic/profileProbingGateways/index.js";
import type { ProfilesOperations } from "./classic/profiles/index.js";
import { _getProfilesOperations } from "./classic/profiles/index.js";
import type { SitesOperations } from "./classic/sites/index.js";
import { _getSitesOperations } from "./classic/sites/index.js";
import type { TopologyMapsOperations } from "./classic/topologyMaps/index.js";
import { _getTopologyMapsOperations } from "./classic/topologyMaps/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { NetworkClientOptionalParams } from "./api/networkContext.js";

export class NetworkClient {
  private _client: NetworkContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft.Network Resource Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: NetworkClientOptionalParams = {},
  ) {
    this._client = createNetwork(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.topologyMaps = _getTopologyMapsOperations(this._client);
    this.sites = _getSitesOperations(this._client);
    this.profileProbingGateways = _getProfileProbingGatewaysOperations(this._client);
    this.profiles = _getProfilesOperations(this._client);
    this.healthPolicies = _getHealthPoliciesOperations(this._client);
    this.endpoints = _getEndpointsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for topologyMaps */
  public readonly topologyMaps: TopologyMapsOperations;
  /** The operation groups for sites */
  public readonly sites: SitesOperations;
  /** The operation groups for profileProbingGateways */
  public readonly profileProbingGateways: ProfileProbingGatewaysOperations;
  /** The operation groups for profiles */
  public readonly profiles: ProfilesOperations;
  /** The operation groups for healthPolicies */
  public readonly healthPolicies: HealthPoliciesOperations;
  /** The operation groups for endpoints */
  public readonly endpoints: EndpointsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
