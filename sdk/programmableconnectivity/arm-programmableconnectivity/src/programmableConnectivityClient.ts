// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createProgrammableConnectivity,
  ProgrammableConnectivityContext,
  ProgrammableConnectivityClientOptionalParams,
} from "./api/index.js";
import {
  OperatorApiPlansOperations,
  _getOperatorApiPlansOperations,
} from "./classic/operatorApiPlans/index.js";
import {
  OperatorApiConnectionsOperations,
  _getOperatorApiConnectionsOperations,
} from "./classic/operatorApiConnections/index.js";
import {
  GatewaysOperations,
  _getGatewaysOperations,
} from "./classic/gateways/index.js";
import {
  OperationsOperations,
  _getOperationsOperations,
} from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { ProgrammableConnectivityClientOptionalParams } from "./api/programmableConnectivityContext.js";

export class ProgrammableConnectivityClient {
  private _client: ProgrammableConnectivityContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Programmable Connectivity Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ProgrammableConnectivityClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createProgrammableConnectivity(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operatorApiPlans = _getOperatorApiPlansOperations(this._client);
    this.operatorApiConnections = _getOperatorApiConnectionsOperations(
      this._client,
    );
    this.gateways = _getGatewaysOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for operatorApiPlans */
  public readonly operatorApiPlans: OperatorApiPlansOperations;
  /** The operation groups for operatorApiConnections */
  public readonly operatorApiConnections: OperatorApiConnectionsOperations;
  /** The operation groups for gateways */
  public readonly gateways: GatewaysOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
