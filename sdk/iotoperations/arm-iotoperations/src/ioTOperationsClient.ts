// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createIoTOperations,
  IoTOperationsContext,
  IoTOperationsClientOptionalParams,
} from "./api/index.js";
import {
  DataflowEndpointOperations,
  _getDataflowEndpointOperations,
} from "./classic/dataflowEndpoint/index.js";
import { DataflowOperations, _getDataflowOperations } from "./classic/dataflow/index.js";
import {
  DataflowProfileOperations,
  _getDataflowProfileOperations,
} from "./classic/dataflowProfile/index.js";
import {
  BrokerAuthorizationOperations,
  _getBrokerAuthorizationOperations,
} from "./classic/brokerAuthorization/index.js";
import {
  BrokerAuthenticationOperations,
  _getBrokerAuthenticationOperations,
} from "./classic/brokerAuthentication/index.js";
import {
  BrokerListenerOperations,
  _getBrokerListenerOperations,
} from "./classic/brokerListener/index.js";
import { BrokerOperations, _getBrokerOperations } from "./classic/broker/index.js";
import { InstanceOperations, _getInstanceOperations } from "./classic/instance/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

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
