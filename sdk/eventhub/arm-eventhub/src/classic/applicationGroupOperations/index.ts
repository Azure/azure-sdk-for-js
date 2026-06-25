// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementContext } from "../../api/eventHubManagementContext.js";
import {
  listByNamespace,
  $delete,
  createOrUpdateApplicationGroup,
  get,
} from "../../api/applicationGroupOperations/operations.js";
import {
  ApplicationGroupOperationsListByNamespaceOptionalParams,
  ApplicationGroupOperationsDeleteOptionalParams,
  ApplicationGroupOperationsCreateOrUpdateApplicationGroupOptionalParams,
  ApplicationGroupOperationsGetOptionalParams,
} from "../../api/applicationGroupOperations/options.js";
import { ApplicationGroup } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApplicationGroupOperations operations. */
export interface ApplicationGroupOperationsOperations {
  /** Gets a list of application groups for a Namespace. */
  listByNamespace: (
    resourceGroupName: string,
    namespaceName: string,
    options?: ApplicationGroupOperationsListByNamespaceOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationGroup>;
  /** Deletes an ApplicationGroup for a Namespace. */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    applicationGroupName: string,
    options?: ApplicationGroupOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an ApplicationGroup for a Namespace. */
  createOrUpdateApplicationGroup: (
    resourceGroupName: string,
    namespaceName: string,
    applicationGroupName: string,
    parameters: ApplicationGroup,
    options?: ApplicationGroupOperationsCreateOrUpdateApplicationGroupOptionalParams,
  ) => Promise<ApplicationGroup>;
  /** Gets an ApplicationGroup for a Namespace. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    applicationGroupName: string,
    options?: ApplicationGroupOperationsGetOptionalParams,
  ) => Promise<ApplicationGroup>;
}

function _getApplicationGroupOperations(context: EventHubManagementContext) {
  return {
    listByNamespace: (
      resourceGroupName: string,
      namespaceName: string,
      options?: ApplicationGroupOperationsListByNamespaceOptionalParams,
    ) => listByNamespace(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      applicationGroupName: string,
      options?: ApplicationGroupOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, applicationGroupName, options),
    createOrUpdateApplicationGroup: (
      resourceGroupName: string,
      namespaceName: string,
      applicationGroupName: string,
      parameters: ApplicationGroup,
      options?: ApplicationGroupOperationsCreateOrUpdateApplicationGroupOptionalParams,
    ) =>
      createOrUpdateApplicationGroup(
        context,
        resourceGroupName,
        namespaceName,
        applicationGroupName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      applicationGroupName: string,
      options?: ApplicationGroupOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, applicationGroupName, options),
  };
}

export function _getApplicationGroupOperationsOperations(
  context: EventHubManagementContext,
): ApplicationGroupOperationsOperations {
  return {
    ..._getApplicationGroupOperations(context),
  };
}
