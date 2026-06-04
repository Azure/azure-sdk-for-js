// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DBforPostgreSQLContext,
  DBforPostgreSQLClientOptionalParams,
  createDBforPostgreSQL,
} from "./api/index.js";
import { ClustersOperations, _getClustersOperations } from "./classic/clusters/index.js";
import {
  ConfigurationsOperations,
  _getConfigurationsOperations,
} from "./classic/configurations/index.js";
import {
  FirewallRulesOperations,
  _getFirewallRulesOperations,
} from "./classic/firewallRules/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import {
  PrivateLinkResourcesOperations,
  _getPrivateLinkResourcesOperations,
} from "./classic/privateLinkResources/index.js";
import { RolesOperations, _getRolesOperations } from "./classic/roles/index.js";
import { ServersOperations, _getServersOperations } from "./classic/servers/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { DBforPostgreSQLClientOptionalParams } from "./api/dBforPostgreSQLContext.js";

export class DBforPostgreSQLClient {
  private _client: DBforPostgreSQLContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Cosmos DB for PostgreSQL database service resource provider REST APIs */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: DBforPostgreSQLClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDBforPostgreSQL(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.servers = _getServersOperations(this._client);
    this.roles = _getRolesOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.firewallRules = _getFirewallRulesOperations(this._client);
    this.configurations = _getConfigurationsOperations(this._client);
    this.clusters = _getClustersOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for servers */
  public readonly servers: ServersOperations;
  /** The operation groups for roles */
  public readonly roles: RolesOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for firewallRules */
  public readonly firewallRules: FirewallRulesOperations;
  /** The operation groups for configurations */
  public readonly configurations: ConfigurationsOperations;
  /** The operation groups for clusters */
  public readonly clusters: ClustersOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
