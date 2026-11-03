// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureBotServiceContext, AzureBotServiceOptionalParams } from "./api/index.js";
import { createAzureBotService } from "./api/index.js";
import type { BotConnectionOperations } from "./classic/botConnection/index.js";
import { _getBotConnectionOperations } from "./classic/botConnection/index.js";
import type { BotsOperations } from "./classic/bots/index.js";
import { _getBotsOperations } from "./classic/bots/index.js";
import type { ChannelsOperations } from "./classic/channels/index.js";
import { _getChannelsOperations } from "./classic/channels/index.js";
import type { DirectLineOperations } from "./classic/directLine/index.js";
import { _getDirectLineOperations } from "./classic/directLine/index.js";
import type { EmailOperations } from "./classic/email/index.js";
import { _getEmailOperations } from "./classic/email/index.js";
import type { HostSettingsOperations } from "./classic/hostSettings/index.js";
import { _getHostSettingsOperations } from "./classic/hostSettings/index.js";
import type { NetworkSecurityPerimeterConfigurationsOperations } from "./classic/networkSecurityPerimeterConfigurations/index.js";
import { _getNetworkSecurityPerimeterConfigurationsOperations } from "./classic/networkSecurityPerimeterConfigurations/index.js";
import type { OperationResultsOperations } from "./classic/operationResults/index.js";
import { _getOperationResultsOperations } from "./classic/operationResults/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { QnAMakerEndpointKeysOperations } from "./classic/qnAMakerEndpointKeys/index.js";
import { _getQnAMakerEndpointKeysOperations } from "./classic/qnAMakerEndpointKeys/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { AzureBotServiceOptionalParams } from "./api/azureBotServiceContext.js";

export class AzureBotService {
  private _client: AzureBotServiceContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: AzureBotServiceOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: AzureBotServiceOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | AzureBotServiceOptionalParams,
    options?: AzureBotServiceOptionalParams,
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
    this._client = createAzureBotService(credential, subscriptionId ?? "", {
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
