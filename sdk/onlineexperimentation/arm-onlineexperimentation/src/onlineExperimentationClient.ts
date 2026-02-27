// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  OnlineExperimentationContext,
  OnlineExperimentationClientOptionalParams} from "./api/index.js";
import {
  createOnlineExperimentation
} from "./api/index.js";
import type {
  OnlineExperimentationWorkspacesOperations} from "./classic/onlineExperimentationWorkspaces/index.js";
import {
  _getOnlineExperimentationWorkspacesOperations,
} from "./classic/onlineExperimentationWorkspaces/index.js";
import type { OperationsOperations} from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";

export type { OnlineExperimentationClientOptionalParams } from "./api/onlineExperimentationContext.js";

export class OnlineExperimentationClient {
  private _client: OnlineExperimentationContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft.OnlineExperimentation Resource Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: OnlineExperimentationClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createOnlineExperimentation(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.onlineExperimentationWorkspaces = _getOnlineExperimentationWorkspacesOperations(
      this._client,
    );
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for onlineExperimentationWorkspaces */
  public readonly onlineExperimentationWorkspaces: OnlineExperimentationWorkspacesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
