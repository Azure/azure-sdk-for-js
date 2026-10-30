// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceUpdateContext, DeviceUpdateClientOptionalParams } from "./api/index.js";
import { createDeviceUpdate } from "./api/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { UpdateInstancesOperations } from "./classic/updateInstances/index.js";
import { _getUpdateInstancesOperations } from "./classic/updateInstances/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { DeviceUpdateClientOptionalParams } from "./api/deviceUpdateContext.js";

export class DeviceUpdateClient {
  private _client: DeviceUpdateContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft Device Update resource provider. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: DeviceUpdateClientOptionalParams = {},
  ) {
    this._client = createDeviceUpdate(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.updateInstances = _getUpdateInstancesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for updateInstances */
  public readonly updateInstances: UpdateInstancesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
