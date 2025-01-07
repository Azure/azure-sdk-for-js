// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getOperationsOperations, OperationsOperations } from "./classic/operations/index.js";
import {
  getOrganizationsOperations,
  OrganizationsOperations,
} from "./classic/organizations/index.js";
import { createVectorDb, VectorDbContext, VectorDbClientOptionalParams } from "./api/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { VectorDbClientOptionalParams } from "./api/vectorDbContext.js";

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
    this._client = createVectorDb(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operations = getOperationsOperations(this._client);
    this.organizations = getOrganizationsOperations(this._client, subscriptionId);
  }

  /** The operation groups for Operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for Organizations */
  public readonly organizations: OrganizationsOperations;
}
