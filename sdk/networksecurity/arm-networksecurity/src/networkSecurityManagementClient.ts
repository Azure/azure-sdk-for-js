// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  NetworkSecurityManagementContext,
  NetworkSecurityManagementClientOptionalParams,
} from "./api/index.js";
import { createNetworkSecurityManagement } from "./api/index.js";
import type { NeuroShieldFindingsOperations } from "./classic/neuroShieldFindings/index.js";
import { _getNeuroShieldFindingsOperations } from "./classic/neuroShieldFindings/index.js";
import type { NeuroShieldMitigationsOperations } from "./classic/neuroShieldMitigations/index.js";
import { _getNeuroShieldMitigationsOperations } from "./classic/neuroShieldMitigations/index.js";
import type { NeuroShieldOperationStatusesOperations } from "./classic/neuroShieldOperationStatuses/index.js";
import { _getNeuroShieldOperationStatusesOperations } from "./classic/neuroShieldOperationStatuses/index.js";
import type { NeuroShieldProtectedResourcesOperations } from "./classic/neuroShieldProtectedResources/index.js";
import { _getNeuroShieldProtectedResourcesOperations } from "./classic/neuroShieldProtectedResources/index.js";
import type { NeuroShieldSummariesOperations } from "./classic/neuroShieldSummaries/index.js";
import { _getNeuroShieldSummariesOperations } from "./classic/neuroShieldSummaries/index.js";
import type { NeuroShieldsOperations } from "./classic/neuroShields/index.js";
import { _getNeuroShieldsOperations } from "./classic/neuroShields/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { NetworkSecurityManagementClientOptionalParams } from "./api/networkSecurityManagementContext.js";

export class NetworkSecurityManagementClient {
  private _client: NetworkSecurityManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: NetworkSecurityManagementClientOptionalParams = {},
  ) {
    this._client = createNetworkSecurityManagement(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.neuroShieldMitigations = _getNeuroShieldMitigationsOperations(this._client);
    this.neuroShieldFindings = _getNeuroShieldFindingsOperations(this._client);
    this.neuroShieldProtectedResources = _getNeuroShieldProtectedResourcesOperations(this._client);
    this.neuroShieldSummaries = _getNeuroShieldSummariesOperations(this._client);
    this.neuroShields = _getNeuroShieldsOperations(this._client);
    this.neuroShieldOperationStatuses = _getNeuroShieldOperationStatusesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for neuroShieldMitigations */
  public readonly neuroShieldMitigations: NeuroShieldMitigationsOperations;
  /** The operation groups for neuroShieldFindings */
  public readonly neuroShieldFindings: NeuroShieldFindingsOperations;
  /** The operation groups for neuroShieldProtectedResources */
  public readonly neuroShieldProtectedResources: NeuroShieldProtectedResourcesOperations;
  /** The operation groups for neuroShieldSummaries */
  public readonly neuroShieldSummaries: NeuroShieldSummariesOperations;
  /** The operation groups for neuroShields */
  public readonly neuroShields: NeuroShieldsOperations;
  /** The operation groups for neuroShieldOperationStatuses */
  public readonly neuroShieldOperationStatuses: NeuroShieldOperationStatusesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
