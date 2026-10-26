// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AgentPlatformContext, AgentPlatformClientOptionalParams } from "./api/index.js";
import { createAgentPlatform } from "./api/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { OrganizationsOperations } from "./classic/organizations/index.js";
import { _getOrganizationsOperations } from "./classic/organizations/index.js";
import type { SaaSOperationGroupOperations } from "./classic/saaSOperationGroup/index.js";
import { _getSaaSOperationGroupOperations } from "./classic/saaSOperationGroup/index.js";
import type { WorkspacesOperations } from "./classic/workspaces/index.js";
import { _getWorkspacesOperations } from "./classic/workspaces/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { AgentPlatformClientOptionalParams } from "./api/agentPlatformContext.js";

export class AgentPlatformClient {
  private _client: AgentPlatformContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /**
   * Kore.AgentPlatform Resource Provider for managing Kore AI Agent Platform
   * Organizations and their Workspaces.
   *
   * Organizations are top-level tracked ARM resources. Each Organization is
   * provisioned together with a default Workspace. Additional Workspaces are
   * managed as a child proxy resource type under the Organization using the
   * standard ARM verbs (PUT / DELETE / GET / LIST) on the workspace URL.
   *
   * Service-to-service authentication between Liftr and Kore uses federated
   * Microsoft Entra credentials and is enforced at the runtime layer
   * (not on the ARM surface).
   */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: AgentPlatformClientOptionalParams = {},
  ) {
    this._client = createAgentPlatform(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.workspaces = _getWorkspacesOperations(this._client);
    this.saaSOperationGroup = _getSaaSOperationGroupOperations(this._client);
    this.organizations = _getOrganizationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for workspaces */
  public readonly workspaces: WorkspacesOperations;
  /** The operation groups for saaSOperationGroup */
  public readonly saaSOperationGroup: SaaSOperationGroupOperations;
  /** The operation groups for organizations */
  public readonly organizations: OrganizationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
