// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MissionContext, MissionClientOptionalParams } from "./api/index.js";
import { createMission } from "./api/index.js";
import type { ApprovalOperations } from "./classic/approval/index.js";
import { _getApprovalOperations } from "./classic/approval/index.js";
import type { CommunityOperations } from "./classic/community/index.js";
import { _getCommunityOperations } from "./classic/community/index.js";
import type { CommunityEndpointsOperations } from "./classic/communityEndpoints/index.js";
import { _getCommunityEndpointsOperations } from "./classic/communityEndpoints/index.js";
import type { EnclaveConnectionOperations } from "./classic/enclaveConnection/index.js";
import { _getEnclaveConnectionOperations } from "./classic/enclaveConnection/index.js";
import type { EnclaveEndpointsOperations } from "./classic/enclaveEndpoints/index.js";
import { _getEnclaveEndpointsOperations } from "./classic/enclaveEndpoints/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TransitHubOperations } from "./classic/transitHub/index.js";
import { _getTransitHubOperations } from "./classic/transitHub/index.js";
import type { VirtualEnclaveOperations } from "./classic/virtualEnclave/index.js";
import { _getVirtualEnclaveOperations } from "./classic/virtualEnclave/index.js";
import type { WorkloadOperations } from "./classic/workload/index.js";
import { _getWorkloadOperations } from "./classic/workload/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { MissionClientOptionalParams } from "./api/missionContext.js";

export class MissionClient {
  private _client: MissionContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft Mission Resource Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: MissionClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createMission(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.approval = _getApprovalOperations(this._client);
    this.communityEndpoints = _getCommunityEndpointsOperations(this._client);
    this.enclaveEndpoints = _getEnclaveEndpointsOperations(this._client);
    this.enclaveConnection = _getEnclaveConnectionOperations(this._client);
    this.transitHub = _getTransitHubOperations(this._client);
    this.community = _getCommunityOperations(this._client);
    this.virtualEnclave = _getVirtualEnclaveOperations(this._client);
    this.workload = _getWorkloadOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for approval */
  public readonly approval: ApprovalOperations;
  /** The operation groups for communityEndpoints */
  public readonly communityEndpoints: CommunityEndpointsOperations;
  /** The operation groups for enclaveEndpoints */
  public readonly enclaveEndpoints: EnclaveEndpointsOperations;
  /** The operation groups for enclaveConnection */
  public readonly enclaveConnection: EnclaveConnectionOperations;
  /** The operation groups for transitHub */
  public readonly transitHub: TransitHubOperations;
  /** The operation groups for community */
  public readonly community: CommunityOperations;
  /** The operation groups for virtualEnclave */
  public readonly virtualEnclave: VirtualEnclaveOperations;
  /** The operation groups for workload */
  public readonly workload: WorkloadOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
