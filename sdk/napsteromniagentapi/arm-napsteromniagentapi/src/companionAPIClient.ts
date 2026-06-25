// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  CompanionAPIContext,
  CompanionAPIClientOptionalParams,
  createCompanionAPI,
} from "./api/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  OrganizationsOperations,
  _getOrganizationsOperations,
} from "./classic/organizations/index.js";
import {
  SaaSOperationGroupOperations,
  _getSaaSOperationGroupOperations,
} from "./classic/saaSOperationGroup/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { CompanionAPIClientOptionalParams } from "./api/companionAPIContext.js";

export class CompanionAPIClient {
  private _client: CompanionAPIContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: CompanionAPIClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createCompanionAPI(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.saaSOperationGroup = _getSaaSOperationGroupOperations(this._client);
    this.organizations = _getOrganizationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for saaSOperationGroup */
  public readonly saaSOperationGroup: SaaSOperationGroupOperations;
  /** The operation groups for organizations */
  public readonly organizations: OrganizationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
