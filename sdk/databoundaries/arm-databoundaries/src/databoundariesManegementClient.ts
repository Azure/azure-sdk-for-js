// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DataboundariesManegementContext,
  DataboundariesManegementClientOptionalParams,
  createDataboundariesManegement,
} from "./api/index.js";
import {
  DataBoundariesOperations,
  _getDataBoundariesOperations,
} from "./classic/dataBoundaries/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { DataboundariesManegementClientOptionalParams } from "./api/databoundariesManegementContext.js";

export class DataboundariesManegementClient {
  private _client: DataboundariesManegementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Provides APIs for data boundary operations. */
  constructor(
    credential: TokenCredential,
    options: DataboundariesManegementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDataboundariesManegement(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.dataBoundaries = _getDataBoundariesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for dataBoundaries */
  public readonly dataBoundaries: DataBoundariesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
