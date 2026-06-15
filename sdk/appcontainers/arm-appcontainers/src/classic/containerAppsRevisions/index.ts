// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  restartRevision,
  deactivateRevision,
  activateRevision,
  listRevisions,
  getRevision,
} from "../../api/containerAppsRevisions/operations.js";
import {
  ContainerAppsRevisionsRestartRevisionOptionalParams,
  ContainerAppsRevisionsDeactivateRevisionOptionalParams,
  ContainerAppsRevisionsActivateRevisionOptionalParams,
  ContainerAppsRevisionsListRevisionsOptionalParams,
  ContainerAppsRevisionsGetRevisionOptionalParams,
} from "../../api/containerAppsRevisions/options.js";
import { Revision } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ContainerAppsRevisions operations. */
export interface ContainerAppsRevisionsOperations {
  /** Restarts a revision for a Container App */
  restartRevision: (
    resourceGroupName: string,
    containerAppName: string,
    revisionName: string,
    options?: ContainerAppsRevisionsRestartRevisionOptionalParams,
  ) => Promise<void>;
  /** Deactivates a revision for a Container App */
  deactivateRevision: (
    resourceGroupName: string,
    containerAppName: string,
    revisionName: string,
    options?: ContainerAppsRevisionsDeactivateRevisionOptionalParams,
  ) => Promise<void>;
  /** Activates a revision for a Container App */
  activateRevision: (
    resourceGroupName: string,
    containerAppName: string,
    revisionName: string,
    options?: ContainerAppsRevisionsActivateRevisionOptionalParams,
  ) => Promise<void>;
  /** Get the Revisions for a given Container App. */
  listRevisions: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsRevisionsListRevisionsOptionalParams,
  ) => PagedAsyncIterableIterator<Revision>;
  /** Get a revision of a Container App. */
  getRevision: (
    resourceGroupName: string,
    containerAppName: string,
    revisionName: string,
    options?: ContainerAppsRevisionsGetRevisionOptionalParams,
  ) => Promise<Revision>;
}

function _getContainerAppsRevisions(context: ContainerAppsAPIContext) {
  return {
    restartRevision: (
      resourceGroupName: string,
      containerAppName: string,
      revisionName: string,
      options?: ContainerAppsRevisionsRestartRevisionOptionalParams,
    ) => restartRevision(context, resourceGroupName, containerAppName, revisionName, options),
    deactivateRevision: (
      resourceGroupName: string,
      containerAppName: string,
      revisionName: string,
      options?: ContainerAppsRevisionsDeactivateRevisionOptionalParams,
    ) => deactivateRevision(context, resourceGroupName, containerAppName, revisionName, options),
    activateRevision: (
      resourceGroupName: string,
      containerAppName: string,
      revisionName: string,
      options?: ContainerAppsRevisionsActivateRevisionOptionalParams,
    ) => activateRevision(context, resourceGroupName, containerAppName, revisionName, options),
    listRevisions: (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsRevisionsListRevisionsOptionalParams,
    ) => listRevisions(context, resourceGroupName, containerAppName, options),
    getRevision: (
      resourceGroupName: string,
      containerAppName: string,
      revisionName: string,
      options?: ContainerAppsRevisionsGetRevisionOptionalParams,
    ) => getRevision(context, resourceGroupName, containerAppName, revisionName, options),
  };
}

export function _getContainerAppsRevisionsOperations(
  context: ContainerAppsAPIContext,
): ContainerAppsRevisionsOperations {
  return {
    ..._getContainerAppsRevisions(context),
  };
}
