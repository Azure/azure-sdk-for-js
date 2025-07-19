// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createOnlineExperimentation,
  OnlineExperimentationContext,
  OnlineExperimentationClientOptionalParams,
} from "./api/index.js";
import {
  OnlineExperimentWorkspacesOperations,
  _getOnlineExperimentWorkspacesOperations,
} from "./classic/onlineExperimentWorkspaces/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { OnlineExperimentationClientOptionalParams } from "./api/onlineExperimentationContext.js";

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
    this.onlineExperimentWorkspaces = _getOnlineExperimentWorkspacesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for onlineExperimentWorkspaces */
  public readonly onlineExperimentWorkspaces: OnlineExperimentWorkspacesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
