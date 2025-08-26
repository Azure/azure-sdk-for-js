// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createPlaywrightManagement,
  PlaywrightManagementContext,
  PlaywrightManagementClientOptionalParams,
} from "./api/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PlaywrightQuotasOperations,
  _getPlaywrightQuotasOperations,
} from "./classic/playwrightQuotas/index.js";
import {
  PlaywrightWorkspaceQuotasOperations,
  _getPlaywrightWorkspaceQuotasOperations,
} from "./classic/playwrightWorkspaceQuotas/index.js";
import {
  PlaywrightWorkspacesOperations,
  _getPlaywrightWorkspacesOperations,
} from "./classic/playwrightWorkspaces/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { PlaywrightManagementClientOptionalParams } from "./api/playwrightManagementContext.js";

export class PlaywrightManagementClient {
  private _client: PlaywrightManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Playwright Service Management API provides access to Playwright workspace resources and their operations through Azure Resource Manager. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: PlaywrightManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createPlaywrightManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.playwrightWorkspaceQuotas = _getPlaywrightWorkspaceQuotasOperations(this._client);
    this.playwrightQuotas = _getPlaywrightQuotasOperations(this._client);
    this.playwrightWorkspaces = _getPlaywrightWorkspacesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for playwrightWorkspaceQuotas */
  public readonly playwrightWorkspaceQuotas: PlaywrightWorkspaceQuotasOperations;
  /** The operation groups for playwrightQuotas */
  public readonly playwrightQuotas: PlaywrightQuotasOperations;
  /** The operation groups for playwrightWorkspaces */
  public readonly playwrightWorkspaces: PlaywrightWorkspacesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
