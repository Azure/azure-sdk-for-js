// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import {
  restart,
  stop,
  start,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/workbenches/operations.js";
import {
  WorkbenchesRestartOptionalParams,
  WorkbenchesStopOptionalParams,
  WorkbenchesStartOptionalParams,
  WorkbenchesListOptionalParams,
  WorkbenchesDeleteOptionalParams,
  WorkbenchesUpdateOptionalParams,
  WorkbenchesCreateOrUpdateOptionalParams,
  WorkbenchesGetOptionalParams,
} from "../../api/workbenches/options.js";
import { Workbench } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Workbenches operations. */
export interface WorkbenchesOperations {
  /**
   * Restarts a running workbench resource.
   * This is a long-running operation that returns 202 Accepted.
   * Returns 204 if the workbench is already in the target state.
   */
  restart: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    workbenchName: string,
    options?: WorkbenchesRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restart instead */
  beginRestart: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    workbenchName: string,
    options?: WorkbenchesRestartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restart instead */
  beginRestartAndWait: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    workbenchName: string,
    options?: WorkbenchesRestartOptionalParams,
  ) => Promise<void>;
  /**
   * Stops a running workbench resource.
   * This is a long-running operation that returns 202 Accepted.
   * Returns 204 if the workbench is already in the target state.
   */
  stop: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    workbenchName: string,
    options?: WorkbenchesStopOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use stop instead */
  beginStop: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    workbenchName: string,
    options?: WorkbenchesStopOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use stop instead */
  beginStopAndWait: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    workbenchName: string,
    options?: WorkbenchesStopOptionalParams,
  ) => Promise<void>;
  /**
   * Starts a stopped workbench resource.
   * This is a long-running operation that returns 202 Accepted.
   * Returns 204 if the workbench is already in the target state.
   */
  start: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    workbenchName: string,
    options?: WorkbenchesStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    workbenchName: string,
    options?: WorkbenchesStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    workbenchName: string,
    options?: WorkbenchesStartOptionalParams,
  ) => Promise<void>;
  /** Gets the workbenches associated with the project. */
  list: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    options?: WorkbenchesListOptionalParams,
  ) => PagedAsyncIterableIterator<Workbench>;
  /** Deletes the specified workbench associated with the project. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    workbenchName: string,
    options?: WorkbenchesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    workbenchName: string,
    options?: WorkbenchesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    workbenchName: string,
    options?: WorkbenchesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a workbench associated with the project. */
  update: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    workbenchName: string,
    properties: Workbench,
    options?: WorkbenchesUpdateOptionalParams,
  ) => PollerLike<OperationState<Workbench>, Workbench>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    workbenchName: string,
    properties: Workbench,
    options?: WorkbenchesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Workbench>, Workbench>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    workbenchName: string,
    properties: Workbench,
    options?: WorkbenchesUpdateOptionalParams,
  ) => Promise<Workbench>;
  /** Creates or updates a workbench associated with the project. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    workbenchName: string,
    resource: Workbench,
    options?: WorkbenchesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Workbench>, Workbench>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    workbenchName: string,
    resource: Workbench,
    options?: WorkbenchesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Workbench>, Workbench>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    workbenchName: string,
    resource: Workbench,
    options?: WorkbenchesCreateOrUpdateOptionalParams,
  ) => Promise<Workbench>;
  /** Gets the specified workbench associated with the project. */
  get: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    workbenchName: string,
    options?: WorkbenchesGetOptionalParams,
  ) => Promise<Workbench>;
}

function _getWorkbenches(context: CognitiveServicesManagementContext) {
  return {
    restart: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      workbenchName: string,
      options?: WorkbenchesRestartOptionalParams,
    ) => restart(context, resourceGroupName, accountName, projectName, workbenchName, options),
    beginRestart: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      workbenchName: string,
      options?: WorkbenchesRestartOptionalParams,
    ) => {
      const poller = restart(
        context,
        resourceGroupName,
        accountName,
        projectName,
        workbenchName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartAndWait: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      workbenchName: string,
      options?: WorkbenchesRestartOptionalParams,
    ) => {
      return await restart(
        context,
        resourceGroupName,
        accountName,
        projectName,
        workbenchName,
        options,
      );
    },
    stop: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      workbenchName: string,
      options?: WorkbenchesStopOptionalParams,
    ) => stop(context, resourceGroupName, accountName, projectName, workbenchName, options),
    beginStop: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      workbenchName: string,
      options?: WorkbenchesStopOptionalParams,
    ) => {
      const poller = stop(
        context,
        resourceGroupName,
        accountName,
        projectName,
        workbenchName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopAndWait: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      workbenchName: string,
      options?: WorkbenchesStopOptionalParams,
    ) => {
      return await stop(
        context,
        resourceGroupName,
        accountName,
        projectName,
        workbenchName,
        options,
      );
    },
    start: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      workbenchName: string,
      options?: WorkbenchesStartOptionalParams,
    ) => start(context, resourceGroupName, accountName, projectName, workbenchName, options),
    beginStart: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      workbenchName: string,
      options?: WorkbenchesStartOptionalParams,
    ) => {
      const poller = start(
        context,
        resourceGroupName,
        accountName,
        projectName,
        workbenchName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      workbenchName: string,
      options?: WorkbenchesStartOptionalParams,
    ) => {
      return await start(
        context,
        resourceGroupName,
        accountName,
        projectName,
        workbenchName,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      options?: WorkbenchesListOptionalParams,
    ) => list(context, resourceGroupName, accountName, projectName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      workbenchName: string,
      options?: WorkbenchesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, projectName, workbenchName, options),
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      workbenchName: string,
      options?: WorkbenchesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        accountName,
        projectName,
        workbenchName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      workbenchName: string,
      options?: WorkbenchesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        accountName,
        projectName,
        workbenchName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      workbenchName: string,
      properties: Workbench,
      options?: WorkbenchesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        accountName,
        projectName,
        workbenchName,
        properties,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      workbenchName: string,
      properties: Workbench,
      options?: WorkbenchesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        accountName,
        projectName,
        workbenchName,
        properties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      workbenchName: string,
      properties: Workbench,
      options?: WorkbenchesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        accountName,
        projectName,
        workbenchName,
        properties,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      workbenchName: string,
      resource: Workbench,
      options?: WorkbenchesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        projectName,
        workbenchName,
        resource,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      workbenchName: string,
      resource: Workbench,
      options?: WorkbenchesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        projectName,
        workbenchName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      workbenchName: string,
      resource: Workbench,
      options?: WorkbenchesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        projectName,
        workbenchName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      workbenchName: string,
      options?: WorkbenchesGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, projectName, workbenchName, options),
  };
}

export function _getWorkbenchesOperations(
  context: CognitiveServicesManagementContext,
): WorkbenchesOperations {
  return {
    ..._getWorkbenches(context),
  };
}
