// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CloudHealthContext,
  CloudHealthClientOptionalParams} from "./api/index.js";
import {
  createCloudHealth
} from "./api/index.js";
import type {
  DiscoveryRulesOperations} from "./classic/discoveryRules/index.js";
import {
  _getDiscoveryRulesOperations,
} from "./classic/discoveryRules/index.js";
import type {
  RelationshipsOperations} from "./classic/relationships/index.js";
import {
  _getRelationshipsOperations,
} from "./classic/relationships/index.js";
import type { EntitiesOperations} from "./classic/entities/index.js";
import { _getEntitiesOperations } from "./classic/entities/index.js";
import type {
  AuthenticationSettingsOperations} from "./classic/authenticationSettings/index.js";
import {
  _getAuthenticationSettingsOperations,
} from "./classic/authenticationSettings/index.js";
import type {
  SignalDefinitionsOperations} from "./classic/signalDefinitions/index.js";
import {
  _getSignalDefinitionsOperations,
} from "./classic/signalDefinitions/index.js";
import type {
  HealthModelsOperations} from "./classic/healthModels/index.js";
import {
  _getHealthModelsOperations,
} from "./classic/healthModels/index.js";
import type { OperationsOperations} from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";

export type { CloudHealthClientOptionalParams } from "./api/cloudHealthContext.js";

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
