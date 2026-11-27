// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DigitalAssetsContext, DigitalAssetsClientOptionalParams } from "./api/index.js";
import { createDigitalAssets } from "./api/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PartitionsOperations } from "./classic/partitions/index.js";
import { _getPartitionsOperations } from "./classic/partitions/index.js";
import type { ZkpRollupsOperations } from "./classic/zkpRollups/index.js";
import { _getZkpRollupsOperations } from "./classic/zkpRollups/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { DigitalAssetsClientOptionalParams } from "./api/digitalAssetsContext.js";

export class DigitalAssetsClient {
  private _client: DigitalAssetsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: DigitalAssetsClientOptionalParams = {},
  ) {
    this._client = createDigitalAssets(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.partitions = _getPartitionsOperations(this._client);
    this.zkpRollups = _getZkpRollupsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for partitions */
  public readonly partitions: PartitionsOperations;
  /** The operation groups for zkpRollups */
  public readonly zkpRollups: ZkpRollupsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
