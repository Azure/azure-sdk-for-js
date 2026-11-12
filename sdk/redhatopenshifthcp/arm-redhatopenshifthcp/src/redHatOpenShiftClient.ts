// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedHatOpenShiftContext, RedHatOpenShiftClientOptionalParams } from "./api/index.js";
import { createRedHatOpenShift } from "./api/index.js";
import type { ExternalAuthsOperations } from "./classic/externalAuths/index.js";
import { _getExternalAuthsOperations } from "./classic/externalAuths/index.js";
import type { HcpOpenShiftClustersOperations } from "./classic/hcpOpenShiftClusters/index.js";
import { _getHcpOpenShiftClustersOperations } from "./classic/hcpOpenShiftClusters/index.js";
import type { HcpOpenShiftVersionsOperations } from "./classic/hcpOpenShiftVersions/index.js";
import { _getHcpOpenShiftVersionsOperations } from "./classic/hcpOpenShiftVersions/index.js";
import type { HcpOperatorIdentityRoleSetsOperations } from "./classic/hcpOperatorIdentityRoleSets/index.js";
import { _getHcpOperatorIdentityRoleSetsOperations } from "./classic/hcpOperatorIdentityRoleSets/index.js";
import type { NodePoolsOperations } from "./classic/nodePools/index.js";
import { _getNodePoolsOperations } from "./classic/nodePools/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { RedHatOpenShiftClientOptionalParams } from "./api/redHatOpenShiftContext.js";

export class RedHatOpenShiftClient {
  private _client: RedHatOpenShiftContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: RedHatOpenShiftClientOptionalParams = {},
  ) {
    this._client = createRedHatOpenShift(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.hcpOperatorIdentityRoleSets = _getHcpOperatorIdentityRoleSetsOperations(this._client);
    this.hcpOpenShiftVersions = _getHcpOpenShiftVersionsOperations(this._client);
    this.externalAuths = _getExternalAuthsOperations(this._client);
    this.nodePools = _getNodePoolsOperations(this._client);
    this.hcpOpenShiftClusters = _getHcpOpenShiftClustersOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for hcpOperatorIdentityRoleSets */
  public readonly hcpOperatorIdentityRoleSets: HcpOperatorIdentityRoleSetsOperations;
  /** The operation groups for hcpOpenShiftVersions */
  public readonly hcpOpenShiftVersions: HcpOpenShiftVersionsOperations;
  /** The operation groups for externalAuths */
  public readonly externalAuths: ExternalAuthsOperations;
  /** The operation groups for nodePools */
  public readonly nodePools: NodePoolsOperations;
  /** The operation groups for hcpOpenShiftClusters */
  public readonly hcpOpenShiftClusters: HcpOpenShiftClustersOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
