// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EdgeActionsManagementContext } from "../../api/edgeActionsManagementContext.js";
import {
  swapDefault,
  getVersionCode,
  deployVersionCode,
  listByEdgeAction,
  $delete,
  update,
  create,
  get,
} from "../../api/edgeActionVersions/operations.js";
import type {
  EdgeActionVersionsSwapDefaultOptionalParams,
  EdgeActionVersionsGetVersionCodeOptionalParams,
  EdgeActionVersionsDeployVersionCodeOptionalParams,
  EdgeActionVersionsListByEdgeActionOptionalParams,
  EdgeActionVersionsDeleteOptionalParams,
  EdgeActionVersionsUpdateOptionalParams,
  EdgeActionVersionsCreateOptionalParams,
  EdgeActionVersionsGetOptionalParams,
} from "../../api/edgeActionVersions/options.js";
import type {
  EdgeActionVersion,
  EdgeActionVersionProperties,
  EdgeActionVersionUpdate,
  VersionCode,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EdgeActionVersions operations. */
export interface EdgeActionVersionsOperations {
  /** Swap the default version for the edge action. */
  swapDefault: (
    resourceGroupName: string,
    edgeActionName: string,
    version: string,
    options?: EdgeActionVersionsSwapDefaultOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get the version code for the edge action version. */
  getVersionCode: (
    resourceGroupName: string,
    edgeActionName: string,
    version: string,
    options?: EdgeActionVersionsGetVersionCodeOptionalParams,
  ) => PollerLike<OperationState<VersionCode>, VersionCode>;
  /** A long-running resource action. */
  deployVersionCode: (
    resourceGroupName: string,
    edgeActionName: string,
    version: string,
    body: VersionCode,
    options?: EdgeActionVersionsDeployVersionCodeOptionalParams,
  ) => PollerLike<OperationState<EdgeActionVersionProperties>, EdgeActionVersionProperties>;
  /** List EdgeActionVersion resources by EdgeAction */
  listByEdgeAction: (
    resourceGroupName: string,
    edgeActionName: string,
    options?: EdgeActionVersionsListByEdgeActionOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeActionVersion>;
  /** Delete a EdgeActionVersion */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    edgeActionName: string,
    version: string,
    options?: EdgeActionVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a EdgeActionVersion */
  update: (
    resourceGroupName: string,
    edgeActionName: string,
    version: string,
    properties: EdgeActionVersionUpdate,
    options?: EdgeActionVersionsUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeActionVersion>, EdgeActionVersion>;
  /** Create a EdgeActionVersion */
  create: (
    resourceGroupName: string,
    edgeActionName: string,
    version: string,
    resource: EdgeActionVersion,
    options?: EdgeActionVersionsCreateOptionalParams,
  ) => PollerLike<OperationState<EdgeActionVersion>, EdgeActionVersion>;
  /** Get a EdgeActionVersion */
  get: (
    resourceGroupName: string,
    edgeActionName: string,
    version: string,
    options?: EdgeActionVersionsGetOptionalParams,
  ) => Promise<EdgeActionVersion>;
}

function _getEdgeActionVersions(context: EdgeActionsManagementContext) {
  return {
    swapDefault: (
      resourceGroupName: string,
      edgeActionName: string,
      version: string,
      options?: EdgeActionVersionsSwapDefaultOptionalParams,
    ) => swapDefault(context, resourceGroupName, edgeActionName, version, options),
    getVersionCode: (
      resourceGroupName: string,
      edgeActionName: string,
      version: string,
      options?: EdgeActionVersionsGetVersionCodeOptionalParams,
    ) => getVersionCode(context, resourceGroupName, edgeActionName, version, options),
    deployVersionCode: (
      resourceGroupName: string,
      edgeActionName: string,
      version: string,
      body: VersionCode,
      options?: EdgeActionVersionsDeployVersionCodeOptionalParams,
    ) => deployVersionCode(context, resourceGroupName, edgeActionName, version, body, options),
    listByEdgeAction: (
      resourceGroupName: string,
      edgeActionName: string,
      options?: EdgeActionVersionsListByEdgeActionOptionalParams,
    ) => listByEdgeAction(context, resourceGroupName, edgeActionName, options),
    delete: (
      resourceGroupName: string,
      edgeActionName: string,
      version: string,
      options?: EdgeActionVersionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, edgeActionName, version, options),
    update: (
      resourceGroupName: string,
      edgeActionName: string,
      version: string,
      properties: EdgeActionVersionUpdate,
      options?: EdgeActionVersionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, edgeActionName, version, properties, options),
    create: (
      resourceGroupName: string,
      edgeActionName: string,
      version: string,
      resource: EdgeActionVersion,
      options?: EdgeActionVersionsCreateOptionalParams,
    ) => create(context, resourceGroupName, edgeActionName, version, resource, options),
    get: (
      resourceGroupName: string,
      edgeActionName: string,
      version: string,
      options?: EdgeActionVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, edgeActionName, version, options),
  };
}

export function _getEdgeActionVersionsOperations(
  context: EdgeActionsManagementContext,
): EdgeActionVersionsOperations {
  return {
    ..._getEdgeActionVersions(context),
  };
}
