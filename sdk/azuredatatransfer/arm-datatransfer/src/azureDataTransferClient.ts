// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AzureDataTransferContext,
  AzureDataTransferClientOptionalParams,
} from "./api/index.js";
import { createAzureDataTransfer } from "./api/index.js";
import type { AzureDataTransferOperations } from "./classic/azureDataTransfer/index.js";
import { _getAzureDataTransferOperations } from "./classic/azureDataTransfer/index.js";
import type { ConnectionsOperations } from "./classic/connections/index.js";
import { _getConnectionsOperations } from "./classic/connections/index.js";
import type { FlowProfilesOperations } from "./classic/flowProfiles/index.js";
import { _getFlowProfilesOperations } from "./classic/flowProfiles/index.js";
import type { FlowsOperations } from "./classic/flows/index.js";
import { _getFlowsOperations } from "./classic/flows/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PipelinesOperations } from "./classic/pipelines/index.js";
import { _getPipelinesOperations } from "./classic/pipelines/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { AzureDataTransferClientOptionalParams } from "./api/azureDataTransferContext.js";

export class AzureDataTransferClient {
  private _client: AzureDataTransferContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: AzureDataTransferClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: AzureDataTransferClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | AzureDataTransferClientOptionalParams,
    options?: AzureDataTransferClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    this._client = createAzureDataTransfer(credential, subscriptionId ?? "", options);
    this.pipeline = this._client.pipeline;
    this.azureDataTransfer = _getAzureDataTransferOperations(this._client);
    this.flows = _getFlowsOperations(this._client);
    this.connections = _getConnectionsOperations(this._client);
    this.pipelines = _getPipelinesOperations(this._client);
    this.flowProfiles = _getFlowProfilesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for azureDataTransfer */
  public readonly azureDataTransfer: AzureDataTransferOperations;
  /** The operation groups for flows */
  public readonly flows: FlowsOperations;
  /** The operation groups for connections */
  public readonly connections: ConnectionsOperations;
  /** The operation groups for pipelines */
  public readonly pipelines: PipelinesOperations;
  /** The operation groups for flowProfiles */
  public readonly flowProfiles: FlowProfilesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
