// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkspaceContext } from "../../api/workspaceContext.js";
import {
  Investigation,
  InvestigationCreateOrUpdateContent,
  InvestigationOperationStatus,
  DiscoveryEngine,
  DiscoveryEngineUpdate,
  WorkingMemoryEntry,
} from "../../../models/microsoft/discovery/workspace/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";
import {
  updateDiscoveryEngine,
  stopDiscoveryEngine,
  startDiscoveryEngine,
  getDiscoveryEngineMemory,
  getDiscoveryEngine,
  list,
  $delete,
  update,
  createOrReplace,
  getOperationStatus,
  get,
} from "../../api/investigations/operations.js";
import {
  InvestigationsUpdateDiscoveryEngineOptionalParams,
  InvestigationsStopDiscoveryEngineOptionalParams,
  InvestigationsStartDiscoveryEngineOptionalParams,
  InvestigationsGetDiscoveryEngineMemoryOptionalParams,
  InvestigationsGetDiscoveryEngineOptionalParams,
  InvestigationsListOptionalParams,
  InvestigationsDeleteOptionalParams,
  InvestigationsUpdateOptionalParams,
  InvestigationsCreateOrReplaceOptionalParams,
  InvestigationsGetOperationStatusOptionalParams,
  InvestigationsGetOptionalParams,
} from "../../api/investigations/options.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Investigations operations. */
export interface InvestigationsOperations {
  /** Update the discovery engine for an investigation. This will create the discovery engine if it does not already exist. */
  updateDiscoveryEngine: (
    projectName: string,
    investigationName: string,
    body: DiscoveryEngineUpdate,
    options?: InvestigationsUpdateDiscoveryEngineOptionalParams,
  ) => Promise<DiscoveryEngine>;
  /** Stop the discovery engine for an investigation. */
  stopDiscoveryEngine: (
    projectName: string,
    investigationName: string,
    options?: InvestigationsStopDiscoveryEngineOptionalParams,
  ) => Promise<DiscoveryEngine>;
  /** Start the discovery engine for an investigation. */
  startDiscoveryEngine: (
    projectName: string,
    investigationName: string,
    options?: InvestigationsStartDiscoveryEngineOptionalParams,
  ) => Promise<DiscoveryEngine>;
  /** List discovery engine working memory entries for an investigation. */
  listDiscoveryEngineMemory: (
    projectName: string,
    investigationName: string,
    options?: InvestigationsGetDiscoveryEngineMemoryOptionalParams,
  ) => PagedAsyncIterableIterator<WorkingMemoryEntry>;
  /** Get the discovery engine for an investigation. */
  getDiscoveryEngine: (
    projectName: string,
    investigationName: string,
    options?: InvestigationsGetDiscoveryEngineOptionalParams,
  ) => Promise<DiscoveryEngine>;
  /** List Investigation resources */
  list: (
    projectName: string,
    options?: InvestigationsListOptionalParams,
  ) => PagedAsyncIterableIterator<Investigation>;
  /** Delete a Investigation. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    projectName: string,
    investigationName: string,
    options?: InvestigationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an Investigation. */
  update: (
    projectName: string,
    investigationName: string,
    resource: InvestigationCreateOrUpdateContent,
    options?: InvestigationsUpdateOptionalParams,
  ) => Promise<Investigation>;
  /** Creates an Investigation. */
  createOrReplace: (
    projectName: string,
    investigationName: string,
    resource: InvestigationCreateOrUpdateContent,
    options?: InvestigationsCreateOrReplaceOptionalParams,
  ) => Promise<Investigation>;
  /** Get the status of a long-running operation. */
  getOperationStatus: (
    projectName: string,
    investigationName: string,
    operationId: string,
    options?: InvestigationsGetOperationStatusOptionalParams,
  ) => Promise<InvestigationOperationStatus>;
  /** Fetch a Investigation by name. */
  get: (
    projectName: string,
    investigationName: string,
    options?: InvestigationsGetOptionalParams,
  ) => Promise<Investigation>;
}
function _getInvestigations(context: WorkspaceContext) {
  return {
    updateDiscoveryEngine: (
      projectName: string,
      investigationName: string,
      body: DiscoveryEngineUpdate,
      options?: InvestigationsUpdateDiscoveryEngineOptionalParams,
    ) => updateDiscoveryEngine(context, projectName, investigationName, body, options),
    stopDiscoveryEngine: (
      projectName: string,
      investigationName: string,
      options?: InvestigationsStopDiscoveryEngineOptionalParams,
    ) => stopDiscoveryEngine(context, projectName, investigationName, options),
    startDiscoveryEngine: (
      projectName: string,
      investigationName: string,
      options?: InvestigationsStartDiscoveryEngineOptionalParams,
    ) => startDiscoveryEngine(context, projectName, investigationName, options),
    listDiscoveryEngineMemory: (
      projectName: string,
      investigationName: string,
      options?: InvestigationsGetDiscoveryEngineMemoryOptionalParams,
    ) => getDiscoveryEngineMemory(context, projectName, investigationName, options),
    getDiscoveryEngine: (
      projectName: string,
      investigationName: string,
      options?: InvestigationsGetDiscoveryEngineOptionalParams,
    ) => getDiscoveryEngine(context, projectName, investigationName, options),
    list: (projectName: string, options?: InvestigationsListOptionalParams) =>
      list(context, projectName, options),
    delete: (
      projectName: string,
      investigationName: string,
      options?: InvestigationsDeleteOptionalParams,
    ) => $delete(context, projectName, investigationName, options),
    update: (
      projectName: string,
      investigationName: string,
      resource: InvestigationCreateOrUpdateContent,
      options?: InvestigationsUpdateOptionalParams,
    ) => update(context, projectName, investigationName, resource as Investigation, options),
    createOrReplace: (
      projectName: string,
      investigationName: string,
      resource: InvestigationCreateOrUpdateContent,
      options?: InvestigationsCreateOrReplaceOptionalParams,
    ) =>
      createOrReplace(context, projectName, investigationName, resource as Investigation, options),
    getOperationStatus: (
      projectName: string,
      investigationName: string,
      operationId: string,
      options?: InvestigationsGetOperationStatusOptionalParams,
    ) => getOperationStatus(context, projectName, investigationName, operationId, options),
    get: (
      projectName: string,
      investigationName: string,
      options?: InvestigationsGetOptionalParams,
    ) => get(context, projectName, investigationName, options),
  };
}
export function _getInvestigationsOperations(context: WorkspaceContext): InvestigationsOperations {
  return {
    ..._getInvestigations(context),
  };
}
