// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ContainerServiceFleetContext,
  ContainerServiceFleetClientOptionalParams,
} from "./api/index.js";
import { createContainerServiceFleet } from "./api/index.js";
import type { AutoUpgradeProfileOperationsOperations } from "./classic/autoUpgradeProfileOperations/index.js";
import { _getAutoUpgradeProfileOperationsOperations } from "./classic/autoUpgradeProfileOperations/index.js";
import type { AutoUpgradeProfilesOperations } from "./classic/autoUpgradeProfiles/index.js";
import { _getAutoUpgradeProfilesOperations } from "./classic/autoUpgradeProfiles/index.js";
import type { FleetManagedNamespacesOperations } from "./classic/fleetManagedNamespaces/index.js";
import { _getFleetManagedNamespacesOperations } from "./classic/fleetManagedNamespaces/index.js";
import type { FleetMembersOperations } from "./classic/fleetMembers/index.js";
import { _getFleetMembersOperations } from "./classic/fleetMembers/index.js";
import type { FleetUpdateStrategiesOperations } from "./classic/fleetUpdateStrategies/index.js";
import { _getFleetUpdateStrategiesOperations } from "./classic/fleetUpdateStrategies/index.js";
import type { FleetsOperations } from "./classic/fleets/index.js";
import { _getFleetsOperations } from "./classic/fleets/index.js";
import type { GatesOperations } from "./classic/gates/index.js";
import { _getGatesOperations } from "./classic/gates/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { UpdateRunsOperations } from "./classic/updateRuns/index.js";
import { _getUpdateRunsOperations } from "./classic/updateRuns/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

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
    this.autoUpgradeProfileOperations = _getAutoUpgradeProfileOperationsOperations(this._client);
    this.autoUpgradeProfiles = _getAutoUpgradeProfilesOperations(this._client);
    this.fleetUpdateStrategies = _getFleetUpdateStrategiesOperations(this._client);
    this.updateRuns = _getUpdateRunsOperations(this._client);
    this.gates = _getGatesOperations(this._client);
    this.fleetManagedNamespaces = _getFleetManagedNamespacesOperations(this._client);
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
  /** The operation groups for gates */
  public readonly gates: GatesOperations;
  /** The operation groups for fleetManagedNamespaces */
  public readonly fleetManagedNamespaces: FleetManagedNamespacesOperations;
  /** The operation groups for fleetMembers */
  public readonly fleetMembers: FleetMembersOperations;
  /** The operation groups for fleets */
  public readonly fleets: FleetsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
