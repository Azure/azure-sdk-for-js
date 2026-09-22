// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PurviewManagementContext,
  PurviewManagementClientOptionalParams,
  createPurviewManagement,
} from "./api/index.js";
import { AccountsOperations, _getAccountsOperations } from "./classic/accounts/index.js";
import {
  DefaultAccountsOperations,
  _getDefaultAccountsOperations,
} from "./classic/defaultAccounts/index.js";
import { FeaturesOperations, _getFeaturesOperations } from "./classic/features/index.js";
import {
  IngestionPrivateEndpointConnectionsOperations,
  _getIngestionPrivateEndpointConnectionsOperations,
} from "./classic/ingestionPrivateEndpointConnections/index.js";
import {
  KafkaConfigurationsOperations,
  _getKafkaConfigurationsOperations,
} from "./classic/kafkaConfigurations/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import {
  PrivateLinkResourcesOperations,
  _getPrivateLinkResourcesOperations,
} from "./classic/privateLinkResources/index.js";
import { UsagesOperations, _getUsagesOperations } from "./classic/usages/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { PurviewManagementClientOptionalParams } from "./api/purviewManagementContext.js";

export class PurviewManagementClient {
  private _client: PurviewManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: PurviewManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: PurviewManagementClientOptionalParams,
  );
  /** Creates a Microsoft.Purview management client. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | PurviewManagementClientOptionalParams,
    options?: PurviewManagementClientOptionalParams,
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
    this._client = createPurviewManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.usages = _getUsagesOperations(this._client);
    this.defaultAccounts = _getDefaultAccountsOperations(this._client);
    this.ingestionPrivateEndpointConnections = _getIngestionPrivateEndpointConnectionsOperations(
      this._client,
    );
    this.features = _getFeaturesOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.kafkaConfigurations = _getKafkaConfigurationsOperations(this._client);
    this.accounts = _getAccountsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for usages */
  public readonly usages: UsagesOperations;
  /** The operation groups for defaultAccounts */
  public readonly defaultAccounts: DefaultAccountsOperations;
  /** The operation groups for ingestionPrivateEndpointConnections */
  public readonly ingestionPrivateEndpointConnections: IngestionPrivateEndpointConnectionsOperations;
  /** The operation groups for features */
  public readonly features: FeaturesOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for kafkaConfigurations */
  public readonly kafkaConfigurations: KafkaConfigurationsOperations;
  /** The operation groups for accounts */
  public readonly accounts: AccountsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
