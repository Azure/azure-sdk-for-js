// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  refreshSecret,
  listValue,
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/workspaceNamedValue/operations.js";
import type {
  WorkspaceNamedValueRefreshSecretOptionalParams,
  WorkspaceNamedValueListValueOptionalParams,
  WorkspaceNamedValueListByServiceOptionalParams,
  WorkspaceNamedValueDeleteOptionalParams,
  WorkspaceNamedValueUpdateOptionalParams,
  WorkspaceNamedValueCreateOrUpdateOptionalParams,
  WorkspaceNamedValueGetEntityTagOptionalParams,
  WorkspaceNamedValueGetOptionalParams,
} from "../../api/workspaceNamedValue/options.js";
import type {
  NamedValueContract,
  NamedValueCreateContract,
  NamedValueUpdateParameters,
  NamedValueSecretContract,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WorkspaceNamedValue operations. */
export interface WorkspaceNamedValueOperations {
  /** Refresh the secret of the named value specified by its identifier. */
  refreshSecret: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    namedValueId: string,
    options?: WorkspaceNamedValueRefreshSecretOptionalParams,
  ) => PollerLike<OperationState<NamedValueContract>, NamedValueContract>;
  /** Gets the secret of the named value specified by its identifier. */
  listValue: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    namedValueId: string,
    options?: WorkspaceNamedValueListValueOptionalParams,
  ) => Promise<NamedValueSecretContract>;
  /** Lists a collection of named values defined within a workspace in a service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    options?: WorkspaceNamedValueListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<NamedValueContract>;
  /** Deletes specific named value from the workspace in an API Management service instance. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    namedValueId: string,
    ifMatch: string,
    options?: WorkspaceNamedValueDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the specific named value. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    namedValueId: string,
    ifMatch: string,
    parameters: NamedValueUpdateParameters,
    options?: WorkspaceNamedValueUpdateOptionalParams,
  ) => PollerLike<OperationState<NamedValueContract>, NamedValueContract>;
  /** Creates or updates named value. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    namedValueId: string,
    parameters: NamedValueCreateContract,
    options?: WorkspaceNamedValueCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NamedValueContract>, NamedValueContract>;
  /** Gets the entity state (Etag) version of the named value specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    namedValueId: string,
    options?: WorkspaceNamedValueGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the named value specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    namedValueId: string,
    options?: WorkspaceNamedValueGetOptionalParams,
  ) => Promise<NamedValueContract>;
}

function _getWorkspaceNamedValue(context: ApiManagementContext) {
  return {
    refreshSecret: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      namedValueId: string,
      options?: WorkspaceNamedValueRefreshSecretOptionalParams,
    ) => refreshSecret(context, resourceGroupName, serviceName, workspaceId, namedValueId, options),
    listValue: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      namedValueId: string,
      options?: WorkspaceNamedValueListValueOptionalParams,
    ) => listValue(context, resourceGroupName, serviceName, workspaceId, namedValueId, options),
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      options?: WorkspaceNamedValueListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, workspaceId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      namedValueId: string,
      ifMatch: string,
      options?: WorkspaceNamedValueDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, serviceName, workspaceId, namedValueId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      namedValueId: string,
      ifMatch: string,
      parameters: NamedValueUpdateParameters,
      options?: WorkspaceNamedValueUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        namedValueId,
        ifMatch,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      namedValueId: string,
      parameters: NamedValueCreateContract,
      options?: WorkspaceNamedValueCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        namedValueId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      namedValueId: string,
      options?: WorkspaceNamedValueGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, workspaceId, namedValueId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      namedValueId: string,
      options?: WorkspaceNamedValueGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, namedValueId, options),
  };
}

export function _getWorkspaceNamedValueOperations(
  context: ApiManagementContext,
): WorkspaceNamedValueOperations {
  return {
    ..._getWorkspaceNamedValue(context),
  };
}
