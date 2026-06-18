// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ChaosManagementContext,
  ChaosManagementClientOptionalParams,
  createChaosManagement,
} from "./api/index.js";
import {
  ActionVersionsOperations,
  _getActionVersionsOperations,
} from "./classic/actionVersions/index.js";
import { ActionsOperations, _getActionsOperations } from "./classic/actions/index.js";
import {
  CapabilitiesOperations,
  _getCapabilitiesOperations,
} from "./classic/capabilities/index.js";
import {
  CapabilityTypesOperations,
  _getCapabilityTypesOperations,
} from "./classic/capabilityTypes/index.js";
import {
  DiscoveredResourcesOperations,
  _getDiscoveredResourcesOperations,
} from "./classic/discoveredResources/index.js";
import { ExperimentsOperations, _getExperimentsOperations } from "./classic/experiments/index.js";
import {
  OperationStatusesOperations,
  _getOperationStatusesOperations,
} from "./classic/operationStatuses/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PrivateAccessesOperations,
  _getPrivateAccessesOperations,
} from "./classic/privateAccesses/index.js";
import {
  ScenarioConfigurationsOperations,
  _getScenarioConfigurationsOperations,
} from "./classic/scenarioConfigurations/index.js";
import {
  ScenarioRunsOperations,
  _getScenarioRunsOperations,
} from "./classic/scenarioRuns/index.js";
import { ScenariosOperations, _getScenariosOperations } from "./classic/scenarios/index.js";
import { TargetTypesOperations, _getTargetTypesOperations } from "./classic/targetTypes/index.js";
import { TargetsOperations, _getTargetsOperations } from "./classic/targets/index.js";
import { WorkspacesOperations, _getWorkspacesOperations } from "./classic/workspaces/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ChaosManagementClientOptionalParams } from "./api/chaosManagementContext.js";

export class ChaosManagementClient {
  private _client: ChaosManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Chaos Management Client */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ChaosManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createChaosManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.scenarioConfigurations = _getScenarioConfigurationsOperations(this._client);
    this.scenarioRuns = _getScenarioRunsOperations(this._client);
    this.scenarios = _getScenariosOperations(this._client);
    this.discoveredResources = _getDiscoveredResourcesOperations(this._client);
    this.workspaces = _getWorkspacesOperations(this._client);
    this.operationStatuses = _getOperationStatusesOperations(this._client);
    this.targetTypes = _getTargetTypesOperations(this._client);
    this.actionVersions = _getActionVersionsOperations(this._client);
    this.actions = _getActionsOperations(this._client);
    this.privateAccesses = _getPrivateAccessesOperations(this._client);
    this.experiments = _getExperimentsOperations(this._client);
    this.capabilityTypes = _getCapabilityTypesOperations(this._client);
    this.targets = _getTargetsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
    this.capabilities = _getCapabilitiesOperations(this._client);
  }

  /** The operation groups for scenarioConfigurations */
  public readonly scenarioConfigurations: ScenarioConfigurationsOperations;
  /** The operation groups for scenarioRuns */
  public readonly scenarioRuns: ScenarioRunsOperations;
  /** The operation groups for scenarios */
  public readonly scenarios: ScenariosOperations;
  /** The operation groups for discoveredResources */
  public readonly discoveredResources: DiscoveredResourcesOperations;
  /** The operation groups for workspaces */
  public readonly workspaces: WorkspacesOperations;
  /** The operation groups for operationStatuses */
  public readonly operationStatuses: OperationStatusesOperations;
  /** The operation groups for targetTypes */
  public readonly targetTypes: TargetTypesOperations;
  /** The operation groups for actionVersions */
  public readonly actionVersions: ActionVersionsOperations;
  /** The operation groups for actions */
  public readonly actions: ActionsOperations;
  /** The operation groups for privateAccesses */
  public readonly privateAccesses: PrivateAccessesOperations;
  /** The operation groups for experiments */
  public readonly experiments: ExperimentsOperations;
  /** The operation groups for capabilityTypes */
  public readonly capabilityTypes: CapabilityTypesOperations;
  /** The operation groups for targets */
  public readonly targets: TargetsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for capabilities */
  public readonly capabilities: CapabilitiesOperations;
}
