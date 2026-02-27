// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationsOperations } from "./classic/operations/index.js";
import { getOperationsOperations } from "./classic/operations/index.js";
import type { InstanceOperations } from "./classic/instance/index.js";
import { getInstanceOperations } from "./classic/instance/index.js";
import type { BrokerOperations } from "./classic/broker/index.js";
import { getBrokerOperations } from "./classic/broker/index.js";
import type {
  BrokerListenerOperations} from "./classic/brokerListener/index.js";
import {
  getBrokerListenerOperations
} from "./classic/brokerListener/index.js";
import type {
  BrokerAuthenticationOperations} from "./classic/brokerAuthentication/index.js";
import {
  getBrokerAuthenticationOperations
} from "./classic/brokerAuthentication/index.js";
import type {
  BrokerAuthorizationOperations} from "./classic/brokerAuthorization/index.js";
import {
  getBrokerAuthorizationOperations
} from "./classic/brokerAuthorization/index.js";
import type {
  DataflowProfileOperations} from "./classic/dataflowProfile/index.js";
import {
  getDataflowProfileOperations
} from "./classic/dataflowProfile/index.js";
import type { DataflowOperations } from "./classic/dataflow/index.js";
import { getDataflowOperations } from "./classic/dataflow/index.js";
import type {
  DataflowEndpointOperations} from "./classic/dataflowEndpoint/index.js";
import {
  getDataflowEndpointOperations
} from "./classic/dataflowEndpoint/index.js";
import type {
  IoTOperationsContext,
  IoTOperationsClientOptionalParams} from "./api/index.js";
import {
  createIoTOperations
} from "./api/index.js";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";

export type { IoTOperationsClientOptionalParams } from "./api/ioTOperationsContext.js";

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
    this.brokerListener = getBrokerListenerOperations(this._client, subscriptionId);
    this.brokerAuthentication = getBrokerAuthenticationOperations(this._client, subscriptionId);
    this.brokerAuthorization = getBrokerAuthorizationOperations(this._client, subscriptionId);
    this.dataflowProfile = getDataflowProfileOperations(this._client, subscriptionId);
    this.dataflow = getDataflowOperations(this._client, subscriptionId);
    this.dataflowEndpoint = getDataflowEndpointOperations(this._client, subscriptionId);
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
