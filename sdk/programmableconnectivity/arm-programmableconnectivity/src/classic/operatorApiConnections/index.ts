// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProgrammableConnectivityContext } from "../../api/programmableConnectivityContext.js";
import {
  OperatorApiConnection,
  OperatorApiConnectionUpdate,
} from "../../models/models.js";
import {
  OperatorApiConnectionsListBySubscriptionOptionalParams,
  OperatorApiConnectionsListByResourceGroupOptionalParams,
  OperatorApiConnectionsDeleteOptionalParams,
  OperatorApiConnectionsUpdateOptionalParams,
  OperatorApiConnectionsCreateOptionalParams,
  OperatorApiConnectionsGetOptionalParams,
} from "../../api/operatorApiConnections/options.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/operatorApiConnections/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a OperatorApiConnections operations. */
export interface OperatorApiConnectionsOperations {
  /** List OperatorApiConnection resources by subscription ID. */
  listBySubscription: (
    options?: OperatorApiConnectionsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<OperatorApiConnection>;
  /** List OperatorApiConnection resources by resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: OperatorApiConnectionsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<OperatorApiConnection>;
  /** Delete an Operator API Connection. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    operatorApiConnectionName: string,
    options?: OperatorApiConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update an Operator API Connection. */
  update: (
    resourceGroupName: string,
    operatorApiConnectionName: string,
    properties: OperatorApiConnectionUpdate,
    options?: OperatorApiConnectionsUpdateOptionalParams,
  ) => PollerLike<OperationState<OperatorApiConnection>, OperatorApiConnection>;
  /** Create an Operator API Connection. */
  create: (
    resourceGroupName: string,
    operatorApiConnectionName: string,
    resource: OperatorApiConnection,
    options?: OperatorApiConnectionsCreateOptionalParams,
  ) => PollerLike<OperationState<OperatorApiConnection>, OperatorApiConnection>;
  /** Get an Operator API Connection. */
  get: (
    resourceGroupName: string,
    operatorApiConnectionName: string,
    options?: OperatorApiConnectionsGetOptionalParams,
  ) => Promise<OperatorApiConnection>;
}

function _getOperatorApiConnections(context: ProgrammableConnectivityContext) {
  return {
    listBySubscription: (
      options?: OperatorApiConnectionsListBySubscriptionOptionalParams,
    ) => listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: OperatorApiConnectionsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      operatorApiConnectionName: string,
      options?: OperatorApiConnectionsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, operatorApiConnectionName, options),
    update: (
      resourceGroupName: string,
      operatorApiConnectionName: string,
      properties: OperatorApiConnectionUpdate,
      options?: OperatorApiConnectionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        operatorApiConnectionName,
        properties,
        options,
      ),
    create: (
      resourceGroupName: string,
      operatorApiConnectionName: string,
      resource: OperatorApiConnection,
      options?: OperatorApiConnectionsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        operatorApiConnectionName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      operatorApiConnectionName: string,
      options?: OperatorApiConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, operatorApiConnectionName, options),
  };
}

export function _getOperatorApiConnectionsOperations(
  context: ProgrammableConnectivityContext,
): OperatorApiConnectionsOperations {
  return {
    ..._getOperatorApiConnections(context),
  };
}
