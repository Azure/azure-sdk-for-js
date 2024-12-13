// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  getOperationsOperations,
  OperationsOperations,
} from "./classic/operations/index.js";
import {
  getInstanceOperations,
  InstanceOperations,
} from "./classic/instance/index.js";
import {
  getBrokerOperations,
  BrokerOperations,
} from "./classic/broker/index.js";
import {
  getBrokerListenerOperations,
  BrokerListenerOperations,
} from "./classic/brokerListener/index.js";
import {
  getBrokerAuthenticationOperations,
  BrokerAuthenticationOperations,
} from "./classic/brokerAuthentication/index.js";
import {
  getBrokerAuthorizationOperations,
  BrokerAuthorizationOperations,
} from "./classic/brokerAuthorization/index.js";
import {
  getDataflowProfileOperations,
  DataflowProfileOperations,
} from "./classic/dataflowProfile/index.js";
import {
  getDataflowOperations,
  DataflowOperations,
} from "./classic/dataflow/index.js";
import {
  getDataflowEndpointOperations,
  DataflowEndpointOperations,
} from "./classic/dataflowEndpoint/index.js";
import {
  createIoTOperations,
  IoTOperationsContext,
  IoTOperationsClientOptionalParams,
} from "./api/index.js";
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
    this._client = createIoTOperations(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operations = getOperationsOperations(this._client);
    this.instance = getInstanceOperations(this._client, subscriptionId);
    this.broker = getBrokerOperations(this._client, subscriptionId);
    this.brokerListener = getBrokerListenerOperations(
      this._client,
      subscriptionId,
    );
    this.brokerAuthentication = getBrokerAuthenticationOperations(
      this._client,
      subscriptionId,
    );
    this.brokerAuthorization = getBrokerAuthorizationOperations(
      this._client,
      subscriptionId,
    );
    this.dataflowProfile = getDataflowProfileOperations(
      this._client,
      subscriptionId,
    );
    this.dataflow = getDataflowOperations(this._client, subscriptionId);
    this.dataflowEndpoint = getDataflowEndpointOperations(
      this._client,
      subscriptionId,
    );
  }

  /** The operation groups for Operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for Instance */
  public readonly instance: InstanceOperations;
  /** The operation groups for Broker */
  public readonly broker: BrokerOperations;
  /** The operation groups for BrokerListener */
  public readonly brokerListener: BrokerListenerOperations;
  /** The operation groups for BrokerAuthentication */
  public readonly brokerAuthentication: BrokerAuthenticationOperations;
  /** The operation groups for BrokerAuthorization */
  public readonly brokerAuthorization: BrokerAuthorizationOperations;
  /** The operation groups for DataflowProfile */
  public readonly dataflowProfile: DataflowProfileOperations;
  /** The operation groups for Dataflow */
  public readonly dataflow: DataflowOperations;
  /** The operation groups for DataflowEndpoint */
  public readonly dataflowEndpoint: DataflowEndpointOperations;
}
