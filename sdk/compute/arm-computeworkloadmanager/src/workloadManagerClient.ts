// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadManagerContext, WorkloadManagerClientOptionalParams } from "./api/index.js";
import { createWorkloadManager } from "./api/index.js";
import type { CapabilitiesOperations } from "./classic/capabilities/index.js";
import { _getCapabilitiesOperations } from "./classic/capabilities/index.js";
import type { RuntimeBindingsOperations } from "./classic/runtimeBindings/index.js";
import { _getRuntimeBindingsOperations } from "./classic/runtimeBindings/index.js";
import type { RuntimeLinksOperations } from "./classic/runtimeLinks/index.js";
import { _getRuntimeLinksOperations } from "./classic/runtimeLinks/index.js";
import type { WorkloadSpacesOperations } from "./classic/workloadSpaces/index.js";
import { _getWorkloadSpacesOperations } from "./classic/workloadSpaces/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { WorkloadManagerClientOptionalParams } from "./api/workloadManagerContext.js";

export class WorkloadManagerClient {
  private _client: WorkloadManagerContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: WorkloadManagerClientOptionalParams = {},
  ) {
    this._client = createWorkloadManager(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.capabilities = _getCapabilitiesOperations(this._client);
    this.runtimeLinks = _getRuntimeLinksOperations(this._client);
    this.runtimeBindings = _getRuntimeBindingsOperations(this._client);
    this.workloadSpaces = _getWorkloadSpacesOperations(this._client);
  }

  /** The operation groups for capabilities */
  public readonly capabilities: CapabilitiesOperations;
  /** The operation groups for runtimeLinks */
  public readonly runtimeLinks: RuntimeLinksOperations;
  /** The operation groups for runtimeBindings */
  public readonly runtimeBindings: RuntimeBindingsOperations;
  /** The operation groups for workloadSpaces */
  public readonly workloadSpaces: WorkloadSpacesOperations;
}
