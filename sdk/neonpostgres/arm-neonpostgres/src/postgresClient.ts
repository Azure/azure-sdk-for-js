// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgresContext, PostgresClientOptionalParams } from "./api/index.js";
import { createPostgres } from "./api/index.js";
import type { BranchesOperations } from "./classic/branches/index.js";
import { _getBranchesOperations } from "./classic/branches/index.js";
import type { ComputesOperations } from "./classic/computes/index.js";
import { _getComputesOperations } from "./classic/computes/index.js";
import type { EndpointsOperations } from "./classic/endpoints/index.js";
import { _getEndpointsOperations } from "./classic/endpoints/index.js";
import type { NeonDatabasesOperations } from "./classic/neonDatabases/index.js";
import { _getNeonDatabasesOperations } from "./classic/neonDatabases/index.js";
import type { NeonRolesOperations } from "./classic/neonRoles/index.js";
import { _getNeonRolesOperations } from "./classic/neonRoles/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { OrganizationsOperations } from "./classic/organizations/index.js";
import { _getOrganizationsOperations } from "./classic/organizations/index.js";
import type { ProjectsOperations } from "./classic/projects/index.js";
import { _getProjectsOperations } from "./classic/projects/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { PostgresClientOptionalParams } from "./api/postgresContext.js";

export class PostgresClient {
  private _client: PostgresContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: PostgresClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createPostgres(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.endpoints = _getEndpointsOperations(this._client);
    this.neonRoles = _getNeonRolesOperations(this._client);
    this.neonDatabases = _getNeonDatabasesOperations(this._client);
    this.computes = _getComputesOperations(this._client);
    this.branches = _getBranchesOperations(this._client);
    this.projects = _getProjectsOperations(this._client);
    this.organizations = _getOrganizationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for endpoints */
  public readonly endpoints: EndpointsOperations;
  /** The operation groups for neonRoles */
  public readonly neonRoles: NeonRolesOperations;
  /** The operation groups for neonDatabases */
  public readonly neonDatabases: NeonDatabasesOperations;
  /** The operation groups for computes */
  public readonly computes: ComputesOperations;
  /** The operation groups for branches */
  public readonly branches: BranchesOperations;
  /** The operation groups for projects */
  public readonly projects: ProjectsOperations;
  /** The operation groups for organizations */
  public readonly organizations: OrganizationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
