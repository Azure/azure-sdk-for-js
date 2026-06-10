// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import {
  listByProject,
  getByProject,
  listByDevCenter,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/devBoxDefinitions/operations.js";
import type {
  DevBoxDefinitionsListByProjectOptionalParams,
  DevBoxDefinitionsGetByProjectOptionalParams,
  DevBoxDefinitionsListByDevCenterOptionalParams,
  DevBoxDefinitionsDeleteOptionalParams,
  DevBoxDefinitionsUpdateOptionalParams,
  DevBoxDefinitionsCreateOrUpdateOptionalParams,
  DevBoxDefinitionsGetOptionalParams,
} from "../../api/devBoxDefinitions/options.js";
import type { DevBoxDefinition, DevBoxDefinitionUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DevBoxDefinitions operations. */
export interface DevBoxDefinitionsOperations {
  /** List Dev Box definitions configured for a project. */
  listByProject: (
    resourceGroupName: string,
    projectName: string,
    options?: DevBoxDefinitionsListByProjectOptionalParams,
  ) => PagedAsyncIterableIterator<DevBoxDefinition>;
  /** Gets a Dev Box definition configured for a project. */
  getByProject: (
    resourceGroupName: string,
    projectName: string,
    devBoxDefinitionName: string,
    options?: DevBoxDefinitionsGetByProjectOptionalParams,
  ) => Promise<DevBoxDefinition>;
  /** List Dev Box definitions for a devcenter. */
  listByDevCenter: (
    resourceGroupName: string,
    devCenterName: string,
    options?: DevBoxDefinitionsListByDevCenterOptionalParams,
  ) => PagedAsyncIterableIterator<DevBoxDefinition>;
  /** Deletes a Dev Box definition. */
  delete: (
    resourceGroupName: string,
    devCenterName: string,
    devBoxDefinitionName: string,
    options?: DevBoxDefinitionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Partially updates a Dev Box definition. */
  update: (
    resourceGroupName: string,
    devCenterName: string,
    devBoxDefinitionName: string,
    body: DevBoxDefinitionUpdate,
    options?: DevBoxDefinitionsUpdateOptionalParams,
  ) => PollerLike<OperationState<DevBoxDefinition>, DevBoxDefinition>;
  /** Creates or updates a Dev Box definition. */
  createOrUpdate: (
    resourceGroupName: string,
    devCenterName: string,
    devBoxDefinitionName: string,
    body: DevBoxDefinition,
    options?: DevBoxDefinitionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DevBoxDefinition>, DevBoxDefinition>;
  /** Gets a Dev Box definition. */
  get: (
    resourceGroupName: string,
    devCenterName: string,
    devBoxDefinitionName: string,
    options?: DevBoxDefinitionsGetOptionalParams,
  ) => Promise<DevBoxDefinition>;
}

function _getDevBoxDefinitions(context: DevCenterContext) {
  return {
    listByProject: (
      resourceGroupName: string,
      projectName: string,
      options?: DevBoxDefinitionsListByProjectOptionalParams,
    ) => listByProject(context, resourceGroupName, projectName, options),
    getByProject: (
      resourceGroupName: string,
      projectName: string,
      devBoxDefinitionName: string,
      options?: DevBoxDefinitionsGetByProjectOptionalParams,
    ) => getByProject(context, resourceGroupName, projectName, devBoxDefinitionName, options),
    listByDevCenter: (
      resourceGroupName: string,
      devCenterName: string,
      options?: DevBoxDefinitionsListByDevCenterOptionalParams,
    ) => listByDevCenter(context, resourceGroupName, devCenterName, options),
    delete: (
      resourceGroupName: string,
      devCenterName: string,
      devBoxDefinitionName: string,
      options?: DevBoxDefinitionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, devCenterName, devBoxDefinitionName, options),
    update: (
      resourceGroupName: string,
      devCenterName: string,
      devBoxDefinitionName: string,
      body: DevBoxDefinitionUpdate,
      options?: DevBoxDefinitionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, devCenterName, devBoxDefinitionName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      devCenterName: string,
      devBoxDefinitionName: string,
      body: DevBoxDefinition,
      options?: DevBoxDefinitionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        devCenterName,
        devBoxDefinitionName,
        body,
        options,
      ),
    get: (
      resourceGroupName: string,
      devCenterName: string,
      devBoxDefinitionName: string,
      options?: DevBoxDefinitionsGetOptionalParams,
    ) => get(context, resourceGroupName, devCenterName, devBoxDefinitionName, options),
  };
}

export function _getDevBoxDefinitionsOperations(
  context: DevCenterContext,
): DevBoxDefinitionsOperations {
  return {
    ..._getDevBoxDefinitions(context),
  };
}
