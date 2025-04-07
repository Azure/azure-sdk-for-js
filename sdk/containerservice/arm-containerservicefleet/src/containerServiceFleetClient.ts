// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createContainerServiceFleet,
  ContainerServiceFleetContext,
  ContainerServiceFleetClientOptionalParams,
} from "./api/index.js";
import {
  AutoUpgradeProfileOperationsOperations,
  _getAutoUpgradeProfileOperationsOperations,
} from "./classic/autoUpgradeProfileOperations/index.js";
import {
  AutoUpgradeProfilesOperations,
  _getAutoUpgradeProfilesOperations,
} from "./classic/autoUpgradeProfiles/index.js";
import {
  FleetUpdateStrategiesOperations,
  _getFleetUpdateStrategiesOperations,
} from "./classic/fleetUpdateStrategies/index.js";
import {
  UpdateRunsOperations,
  _getUpdateRunsOperations,
} from "./classic/updateRuns/index.js";
import {
  FleetMembersOperations,
  _getFleetMembersOperations,
} from "./classic/fleetMembers/index.js";
import {
  FleetsOperations,
  _getFleetsOperations,
} from "./classic/fleets/index.js";
import {
  OperationsOperations,
  _getOperationsOperations,
} from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { ContainerServiceFleetClientOptionalParams } from "./api/containerServiceFleetContext.js";

export class ContainerServiceFleetClient {
  private _client: ContainerServiceFleetContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Kubernetes Fleet Manager api client. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ContainerServiceFleetClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createContainerServiceFleet(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.autoUpgradeProfileOperations =
      _getAutoUpgradeProfileOperationsOperations(this._client);
    this.autoUpgradeProfiles = _getAutoUpgradeProfilesOperations(this._client);
    this.fleetUpdateStrategies = _getFleetUpdateStrategiesOperations(
      this._client,
    );
    this.updateRuns = _getUpdateRunsOperations(this._client);
    this.fleetMembers = _getFleetMembersOperations(this._client);
    this.fleets = _getFleetsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for autoUpgradeProfileOperations */
  public readonly autoUpgradeProfileOperations: AutoUpgradeProfileOperationsOperations;
  /** The operation groups for autoUpgradeProfiles */
  public readonly autoUpgradeProfiles: AutoUpgradeProfilesOperations;
  /** The operation groups for fleetUpdateStrategies */
  public readonly fleetUpdateStrategies: FleetUpdateStrategiesOperations;
  /** The operation groups for updateRuns */
  public readonly updateRuns: UpdateRunsOperations;
  /** The operation groups for fleetMembers */
  public readonly fleetMembers: FleetMembersOperations;
  /** The operation groups for fleets */
  public readonly fleets: FleetsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
