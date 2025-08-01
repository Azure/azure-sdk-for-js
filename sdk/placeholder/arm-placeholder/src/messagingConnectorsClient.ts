// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createMessagingConnectors,
  MessagingConnectorsContext,
  MessagingConnectorsClientOptionalParams,
} from "./api/index.js";
import {
  ConfigOperationsOperations,
  _getConfigOperationsOperations,
} from "./classic/configOperations/index.js";
import {
  ConnectorOperationsOperations,
  _getConnectorOperationsOperations,
} from "./classic/connectorOperations/index.js";
import {
  DataPreviewOperationsOperations,
  _getDataPreviewOperationsOperations,
} from "./classic/dataPreviewOperations/index.js";
import {
  OperationsOperations,
  _getOperationsOperations,
} from "./classic/operations/index.js";
import {
  SchemaOperationsOperations,
  _getSchemaOperationsOperations,
} from "./classic/schemaOperations/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { MessagingConnectorsClientOptionalParams } from "./api/messagingConnectorsContext.js";

export class MessagingConnectorsClient {
  private _client: MessagingConnectorsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft.MessagingConnectors Resource Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: MessagingConnectorsClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createMessagingConnectors(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.configOperations = _getConfigOperationsOperations(this._client);
    this.schemaOperations = _getSchemaOperationsOperations(this._client);
    this.dataPreviewOperations = _getDataPreviewOperationsOperations(
      this._client,
    );
    this.connectorOperations = _getConnectorOperationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for configOperations */
  public readonly configOperations: ConfigOperationsOperations;
  /** The operation groups for schemaOperations */
  public readonly schemaOperations: SchemaOperationsOperations;
  /** The operation groups for dataPreviewOperations */
  public readonly dataPreviewOperations: DataPreviewOperationsOperations;
  /** The operation groups for connectorOperations */
  public readonly connectorOperations: ConnectorOperationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
