// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventHubManagementContext } from "../../api/eventHubManagementContext.js";
import {
  listByNamespace,
  $delete,
  createOrUpdateApplicationGroup,
  get,
} from "../../api/applicationGroup/operations.js";
import type {
  ApplicationGroupListByNamespaceOptionalParams,
  ApplicationGroupDeleteOptionalParams,
  ApplicationGroupCreateOrUpdateApplicationGroupOptionalParams,
  ApplicationGroupGetOptionalParams,
} from "../../api/applicationGroup/options.js";
import type { ApplicationGroup } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApplicationGroup operations. */
export interface ApplicationGroupOperations {
  /** Gets a list of application groups for a Namespace. */
  listByNamespace: (
    resourceGroupName: string,
    namespaceName: string,
    options?: ApplicationGroupListByNamespaceOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationGroup>;
  /** Deletes an ApplicationGroup for a Namespace. */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    applicationGroupName: string,
    options?: ApplicationGroupDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an ApplicationGroup for a Namespace. */
  createOrUpdateApplicationGroup: (
    resourceGroupName: string,
    namespaceName: string,
    applicationGroupName: string,
    parameters: ApplicationGroup,
    options?: ApplicationGroupCreateOrUpdateApplicationGroupOptionalParams,
  ) => Promise<ApplicationGroup>;
  /** Gets an ApplicationGroup for a Namespace. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    applicationGroupName: string,
    options?: ApplicationGroupGetOptionalParams,
  ) => Promise<ApplicationGroup>;
}

function _getApplicationGroup(context: EventHubManagementContext) {
  return {
    listByNamespace: (
      resourceGroupName: string,
      namespaceName: string,
      options?: ApplicationGroupListByNamespaceOptionalParams,
    ) => listByNamespace(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      applicationGroupName: string,
      options?: ApplicationGroupDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, applicationGroupName, options),
    createOrUpdateApplicationGroup: (
      resourceGroupName: string,
      namespaceName: string,
      applicationGroupName: string,
      parameters: ApplicationGroup,
      options?: ApplicationGroupCreateOrUpdateApplicationGroupOptionalParams,
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
      options?: ApplicationGroupGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, applicationGroupName, options),
  };
}

export function _getApplicationGroupOperations(
  context: EventHubManagementContext,
): ApplicationGroupOperations {
  return {
    ..._getApplicationGroup(context),
  };
}
