// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createHyperExecute,
  HyperExecuteContext,
  HyperExecuteClientOptionalParams,
} from "./api/index.js";
import {
  OrganizationsOperations,
  _getOrganizationsOperations,
} from "./classic/organizations/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { HyperExecuteClientOptionalParams } from "./api/hyperExecuteContext.js";

export class HyperExecuteClient {
  private _client: HyperExecuteContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: HyperExecuteClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createHyperExecute(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.organizations = _getOrganizationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for organizations */
  public readonly organizations: OrganizationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
