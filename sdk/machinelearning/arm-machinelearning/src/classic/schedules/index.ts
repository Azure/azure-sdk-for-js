// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/schedules/operations.js";
import type {
  SchedulesListOptionalParams,
  SchedulesDeleteOptionalParams,
  SchedulesCreateOrUpdateOptionalParams,
  SchedulesGetOptionalParams,
} from "../../api/schedules/options.js";
import type { Schedule } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Schedules operations. */
export interface SchedulesOperations {
  /** List schedules in specified workspace. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: SchedulesListOptionalParams,
  ) => PagedAsyncIterableIterator<Schedule>;
  /** Delete schedule. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: SchedulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: SchedulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: SchedulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update schedule. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: Schedule,
    options?: SchedulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Schedule>, Schedule>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: Schedule,
    options?: SchedulesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Schedule>, Schedule>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: Schedule,
    options?: SchedulesCreateOrUpdateOptionalParams,
  ) => Promise<Schedule>;
  /** Get schedule. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: SchedulesGetOptionalParams,
  ) => Promise<Schedule>;
}

function _getSchedules(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: SchedulesListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: SchedulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, options),
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: SchedulesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, workspaceName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: SchedulesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, workspaceName, name, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: Schedule,
      options?: SchedulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: Schedule,
      options?: SchedulesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, workspaceName, name, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: Schedule,
      options?: SchedulesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, workspaceName, name, body, options);
    },
    get: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: SchedulesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, options),
  };
}

export function _getSchedulesOperations(
  context: AzureMachineLearningServicesManagementContext,
): SchedulesOperations {
  return {
    ..._getSchedules(context),
  };
}
