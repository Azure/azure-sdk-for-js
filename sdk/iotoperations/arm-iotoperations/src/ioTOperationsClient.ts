// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IoTOperationsContext, IoTOperationsClientOptionalParams } from "./api/index.js";
import { createIoTOperations } from "./api/index.js";
import type { AkriConnectorOperations } from "./classic/akriConnector/index.js";
import { _getAkriConnectorOperations } from "./classic/akriConnector/index.js";
import type { AkriConnectorTemplateOperations } from "./classic/akriConnectorTemplate/index.js";
import { _getAkriConnectorTemplateOperations } from "./classic/akriConnectorTemplate/index.js";
import type { BrokerOperations } from "./classic/broker/index.js";
import { _getBrokerOperations } from "./classic/broker/index.js";
import type { BrokerAuthenticationOperations } from "./classic/brokerAuthentication/index.js";
import { _getBrokerAuthenticationOperations } from "./classic/brokerAuthentication/index.js";
import type { BrokerAuthorizationOperations } from "./classic/brokerAuthorization/index.js";
import { _getBrokerAuthorizationOperations } from "./classic/brokerAuthorization/index.js";
import type { BrokerListenerOperations } from "./classic/brokerListener/index.js";
import { _getBrokerListenerOperations } from "./classic/brokerListener/index.js";
import type { DataflowOperations } from "./classic/dataflow/index.js";
import { _getDataflowOperations } from "./classic/dataflow/index.js";
import type { DataflowEndpointOperations } from "./classic/dataflowEndpoint/index.js";
import { _getDataflowEndpointOperations } from "./classic/dataflowEndpoint/index.js";
import type { DataflowGraphOperations } from "./classic/dataflowGraph/index.js";
import { _getDataflowGraphOperations } from "./classic/dataflowGraph/index.js";
import type { DataflowProfileOperations } from "./classic/dataflowProfile/index.js";
import { _getDataflowProfileOperations } from "./classic/dataflowProfile/index.js";
import type { InstanceOperations } from "./classic/instance/index.js";
import { _getInstanceOperations } from "./classic/instance/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { RegistryEndpointOperations } from "./classic/registryEndpoint/index.js";
import { _getRegistryEndpointOperations } from "./classic/registryEndpoint/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { IoTOperationsClientOptionalParams } from "./api/ioTOperationsContext.js";

export class IoTOperationsClient {
  private _client: IoTOperationsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft.IoTOperations Resource Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: IoTOperationsClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createIoTOperations(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.akriConnector = _getAkriConnectorOperations(this._client);
    this.akriConnectorTemplate = _getAkriConnectorTemplateOperations(this._client);
    this.registryEndpoint = _getRegistryEndpointOperations(this._client);
    this.dataflowGraph = _getDataflowGraphOperations(this._client);
    this.dataflowEndpoint = _getDataflowEndpointOperations(this._client);
    this.dataflow = _getDataflowOperations(this._client);
    this.dataflowProfile = _getDataflowProfileOperations(this._client);
    this.brokerAuthorization = _getBrokerAuthorizationOperations(this._client);
    this.brokerAuthentication = _getBrokerAuthenticationOperations(this._client);
    this.brokerListener = _getBrokerListenerOperations(this._client);
    this.broker = _getBrokerOperations(this._client);
    this.instance = _getInstanceOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for akriConnector */
  public readonly akriConnector: AkriConnectorOperations;
  /** The operation groups for akriConnectorTemplate */
  public readonly akriConnectorTemplate: AkriConnectorTemplateOperations;
  /** The operation groups for registryEndpoint */
  public readonly registryEndpoint: RegistryEndpointOperations;
  /** The operation groups for dataflowGraph */
  public readonly dataflowGraph: DataflowGraphOperations;
  /** The operation groups for dataflowEndpoint */
  public readonly dataflowEndpoint: DataflowEndpointOperations;
  /** The operation groups for dataflow */
  public readonly dataflow: DataflowOperations;
  /** The operation groups for dataflowProfile */
  public readonly dataflowProfile: DataflowProfileOperations;
  /** The operation groups for brokerAuthorization */
  public readonly brokerAuthorization: BrokerAuthorizationOperations;
  /** The operation groups for brokerAuthentication */
  public readonly brokerAuthentication: BrokerAuthenticationOperations;
  /** The operation groups for brokerListener */
  public readonly brokerListener: BrokerListenerOperations;
  /** The operation groups for broker */
  public readonly broker: BrokerOperations;
  /** The operation groups for instance */
  public readonly instance: InstanceOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
