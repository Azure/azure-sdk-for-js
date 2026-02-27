// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VectorDbContext, VectorDbClientOptionalParams } from "./api/index.js";
import { createVectorDb } from "./api/index.js";
import type {
  OrganizationsOperations} from "./classic/organizations/index.js";
import {
  _getOrganizationsOperations,
} from "./classic/organizations/index.js";
import type { OperationsOperations} from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";

export type { VectorDbClientOptionalParams } from "./api/vectorDbContext.js";

export class VectorDbClient {
  private _client: VectorDbContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: VectorDbClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createVectorDb(credential, subscriptionId, {
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
