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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use refreshSecret instead */
  beginRefreshSecret: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    namedValueId: string,
    options?: WorkspaceNamedValueRefreshSecretOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NamedValueContract>, NamedValueContract>>;
  /** @deprecated use refreshSecret instead */
  beginRefreshSecretAndWait: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    namedValueId: string,
    options?: WorkspaceNamedValueRefreshSecretOptionalParams,
  ) => Promise<NamedValueContract>;
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
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    namedValueId: string,
    ifMatch: string,
    parameters: NamedValueUpdateParameters,
    options?: WorkspaceNamedValueUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NamedValueContract>, NamedValueContract>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    namedValueId: string,
    ifMatch: string,
    parameters: NamedValueUpdateParameters,
    options?: WorkspaceNamedValueUpdateOptionalParams,
  ) => Promise<NamedValueContract>;
  /** Creates or updates named value. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    namedValueId: string,
    parameters: NamedValueCreateContract,
    options?: WorkspaceNamedValueCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NamedValueContract>, NamedValueContract>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    namedValueId: string,
    parameters: NamedValueCreateContract,
    options?: WorkspaceNamedValueCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NamedValueContract>, NamedValueContract>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    namedValueId: string,
    parameters: NamedValueCreateContract,
    options?: WorkspaceNamedValueCreateOrUpdateOptionalParams,
  ) => Promise<NamedValueContract>;
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
    beginRefreshSecret: async (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      namedValueId: string,
      options?: WorkspaceNamedValueRefreshSecretOptionalParams,
    ) => {
      const poller = refreshSecret(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        namedValueId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRefreshSecretAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      namedValueId: string,
      options?: WorkspaceNamedValueRefreshSecretOptionalParams,
    ) => {
      return await refreshSecret(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        namedValueId,
        options,
      );
    },
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
    beginUpdate: async (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      namedValueId: string,
      ifMatch: string,
      parameters: NamedValueUpdateParameters,
      options?: WorkspaceNamedValueUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        namedValueId,
        ifMatch,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      namedValueId: string,
      ifMatch: string,
      parameters: NamedValueUpdateParameters,
      options?: WorkspaceNamedValueUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        namedValueId,
        ifMatch,
        parameters,
        options,
      );
    },
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      namedValueId: string,
      parameters: NamedValueCreateContract,
      options?: WorkspaceNamedValueCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        namedValueId,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      namedValueId: string,
      parameters: NamedValueCreateContract,
      options?: WorkspaceNamedValueCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        namedValueId,
        parameters,
        options,
      );
    },
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
