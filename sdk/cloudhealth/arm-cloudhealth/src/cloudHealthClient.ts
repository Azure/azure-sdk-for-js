// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createCloudHealth,
  CloudHealthContext,
  CloudHealthClientOptionalParams,
} from "./api/index.js";
import {
  DiscoveryRulesOperations,
  _getDiscoveryRulesOperations,
} from "./classic/discoveryRules/index.js";
import {
  RelationshipsOperations,
  _getRelationshipsOperations,
} from "./classic/relationships/index.js";
import { EntitiesOperations, _getEntitiesOperations } from "./classic/entities/index.js";
import {
  AuthenticationSettingsOperations,
  _getAuthenticationSettingsOperations,
} from "./classic/authenticationSettings/index.js";
import {
  SignalDefinitionsOperations,
  _getSignalDefinitionsOperations,
} from "./classic/signalDefinitions/index.js";
import {
  HealthModelsOperations,
  _getHealthModelsOperations,
} from "./classic/healthModels/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { CloudHealthClientOptionalParams } from "./api/cloudHealthContext.js";

export class CloudHealthClient {
  private _client: CloudHealthContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: CloudHealthClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createCloudHealth(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.discoveryRules = _getDiscoveryRulesOperations(this._client);
    this.relationships = _getRelationshipsOperations(this._client);
    this.entities = _getEntitiesOperations(this._client);
    this.authenticationSettings = _getAuthenticationSettingsOperations(this._client);
    this.signalDefinitions = _getSignalDefinitionsOperations(this._client);
    this.healthModels = _getHealthModelsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for discoveryRules */
  public readonly discoveryRules: DiscoveryRulesOperations;
  /** The operation groups for relationships */
  public readonly relationships: RelationshipsOperations;
  /** The operation groups for entities */
  public readonly entities: EntitiesOperations;
  /** The operation groups for authenticationSettings */
  public readonly authenticationSettings: AuthenticationSettingsOperations;
  /** The operation groups for signalDefinitions */
  public readonly signalDefinitions: SignalDefinitionsOperations;
  /** The operation groups for healthModels */
  public readonly healthModels: HealthModelsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
