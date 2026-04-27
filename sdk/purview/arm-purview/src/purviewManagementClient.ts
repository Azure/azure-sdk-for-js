// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PurviewManagementContext,
  PurviewManagementClientOptionalParams,
} from "./api/index.js";
import { createPurviewManagement } from "./api/index.js";
import type { AccountsOperations } from "./classic/accounts/index.js";
import { _getAccountsOperations } from "./classic/accounts/index.js";
import type { DefaultAccountsOperations } from "./classic/defaultAccounts/index.js";
import { _getDefaultAccountsOperations } from "./classic/defaultAccounts/index.js";
import type { FeaturesOperations } from "./classic/features/index.js";
import { _getFeaturesOperations } from "./classic/features/index.js";
import type { IngestionPrivateEndpointConnectionsOperations } from "./classic/ingestionPrivateEndpointConnections/index.js";
import { _getIngestionPrivateEndpointConnectionsOperations } from "./classic/ingestionPrivateEndpointConnections/index.js";
import type { KafkaConfigurationsOperations } from "./classic/kafkaConfigurations/index.js";
import { _getKafkaConfigurationsOperations } from "./classic/kafkaConfigurations/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { UsagesOperations } from "./classic/usages/index.js";
import { _getUsagesOperations } from "./classic/usages/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

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
