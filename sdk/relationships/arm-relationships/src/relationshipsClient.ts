// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RelationshipsContext, RelationshipsClientOptionalParams } from "./api/index.js";
import { createRelationships } from "./api/index.js";
import type { DependencyOfRelationshipsOperations } from "./classic/dependencyOfRelationships/index.js";
import { _getDependencyOfRelationshipsOperations } from "./classic/dependencyOfRelationships/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { ServiceGroupMemberRelationshipsOperations } from "./classic/serviceGroupMemberRelationships/index.js";
import { _getServiceGroupMemberRelationshipsOperations } from "./classic/serviceGroupMemberRelationships/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { RelationshipsClientOptionalParams } from "./api/relationshipsContext.js";

export class RelationshipsClient {
  private _client: RelationshipsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft.Relationships Resource Provider management API. */
  constructor(credential: TokenCredential, options: RelationshipsClientOptionalParams = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createRelationships(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.serviceGroupMemberRelationships = _getServiceGroupMemberRelationshipsOperations(
      this._client,
    );
    this.dependencyOfRelationships = _getDependencyOfRelationshipsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for serviceGroupMemberRelationships */
  public readonly serviceGroupMemberRelationships: ServiceGroupMemberRelationshipsOperations;
  /** The operation groups for dependencyOfRelationships */
  public readonly dependencyOfRelationships: DependencyOfRelationshipsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
