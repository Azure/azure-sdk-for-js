// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  HyperExecuteContext,
  HyperExecuteClientOptionalParams} from "./api/index.js";
import {
  createHyperExecute
} from "./api/index.js";
import type {
  OrganizationsOperations} from "./classic/organizations/index.js";
import {
  _getOrganizationsOperations,
} from "./classic/organizations/index.js";
import type { OperationsOperations} from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";

export type { HyperExecuteClientOptionalParams } from "./api/hyperExecuteContext.js";

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
