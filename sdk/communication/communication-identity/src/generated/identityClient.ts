// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IdentityContext, IdentityClientOptionalParams, createIdentity } from "./api/index.js";
import {
  IdentityOperationsOperations,
  _getIdentityOperationsOperations,
} from "./classic/identityOperations/index.js";
import {
  TeamsExtensionOperationsOperations,
  _getTeamsExtensionOperationsOperations,
} from "./classic/teamsExtensionOperations/index.js";
import {
  TeamsUserOperationsOperations,
  _getTeamsUserOperationsOperations,
} from "./classic/teamsUserOperations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { IdentityClientOptionalParams } from "./api/identityContext.js";

export class IdentityClient {
  private _client: IdentityContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Communication Identity Service */
  constructor(endpointParam: string, options: IdentityClientOptionalParams = {}) {
    this._client = createIdentity(endpointParam, options);
    this.pipeline = this._client.pipeline;
    this.teamsExtensionOperations = _getTeamsExtensionOperationsOperations(this._client);
    this.teamsUserOperations = _getTeamsUserOperationsOperations(this._client);
    this.identityOperations = _getIdentityOperationsOperations(this._client);
  }

  /** The operation groups for teamsExtensionOperations */
  public readonly teamsExtensionOperations: TeamsExtensionOperationsOperations;
  /** The operation groups for teamsUserOperations */
  public readonly teamsUserOperations: TeamsUserOperationsOperations;
  /** The operation groups for identityOperations */
  public readonly identityOperations: IdentityOperationsOperations;
}
