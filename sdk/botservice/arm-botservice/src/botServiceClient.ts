// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createBotService,
  BotServiceContext,
  BotServiceClientOptionalParams,
} from "./api/index.js";
import {
  OperationResultsOperations,
  _getOperationResultsOperations,
} from "./classic/operationResults/index.js";
import {
  HostSettingsOperations,
  _getHostSettingsOperations,
} from "./classic/hostSettings/index.js";
import {
  QnAMakerEndpointKeysOperations,
  _getQnAMakerEndpointKeysOperations,
} from "./classic/qnAMakerEndpointKeys/index.js";
import {
  BotConnectionOperations,
  _getBotConnectionOperations,
} from "./classic/botConnection/index.js";
import { DirectLineOperations, _getDirectLineOperations } from "./classic/directLine/index.js";
import { ChannelsOperations, _getChannelsOperations } from "./classic/channels/index.js";
import {
  PrivateLinkResourcesOperations,
  _getPrivateLinkResourcesOperations,
} from "./classic/privateLinkResources/index.js";
import { EmailOperations, _getEmailOperations } from "./classic/email/index.js";
import {
  NetworkSecurityPerimeterConfigurationsOperations,
  _getNetworkSecurityPerimeterConfigurationsOperations,
} from "./classic/networkSecurityPerimeterConfigurations/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import { BotsOperations, _getBotsOperations } from "./classic/bots/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { BotServiceClientOptionalParams } from "./api/botServiceContext.js";

export class BotServiceClient {
  private _client: BotServiceContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Bot Service is a platform for creating smart conversational agents. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: BotServiceClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createBotService(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operationResults = _getOperationResultsOperations(this._client);
    this.hostSettings = _getHostSettingsOperations(this._client);
    this.qnAMakerEndpointKeys = _getQnAMakerEndpointKeysOperations(this._client);
    this.botConnection = _getBotConnectionOperations(this._client);
    this.directLine = _getDirectLineOperations(this._client);
    this.channels = _getChannelsOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.email = _getEmailOperations(this._client);
    this.networkSecurityPerimeterConfigurations =
      _getNetworkSecurityPerimeterConfigurationsOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.bots = _getBotsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for operationResults */
  public readonly operationResults: OperationResultsOperations;
  /** The operation groups for hostSettings */
  public readonly hostSettings: HostSettingsOperations;
  /** The operation groups for qnAMakerEndpointKeys */
  public readonly qnAMakerEndpointKeys: QnAMakerEndpointKeysOperations;
  /** The operation groups for botConnection */
  public readonly botConnection: BotConnectionOperations;
  /** The operation groups for directLine */
  public readonly directLine: DirectLineOperations;
  /** The operation groups for channels */
  public readonly channels: ChannelsOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for email */
  public readonly email: EmailOperations;
  /** The operation groups for networkSecurityPerimeterConfigurations */
  public readonly networkSecurityPerimeterConfigurations: NetworkSecurityPerimeterConfigurationsOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for bots */
  public readonly bots: BotsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
