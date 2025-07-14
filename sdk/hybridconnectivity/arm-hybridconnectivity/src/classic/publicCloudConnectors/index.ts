// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPIContext } from "../../api/hybridConnectivityManagementAPIContext.js";
import {
  OperationStatusResult,
  PublicCloudConnector,
  PublicCloudConnectorUpdate,
} from "../../models/models.js";
import {
  PublicCloudConnectorsTestPermissionsOptionalParams,
  PublicCloudConnectorsListBySubscriptionOptionalParams,
  PublicCloudConnectorsListByResourceGroupOptionalParams,
  PublicCloudConnectorsDeleteOptionalParams,
  PublicCloudConnectorsUpdateOptionalParams,
  PublicCloudConnectorsCreateOrUpdateOptionalParams,
  PublicCloudConnectorsGetOptionalParams,
} from "../../api/publicCloudConnectors/options.js";
import {
  testPermissions,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/publicCloudConnectors/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PublicCloudConnectors operations. */
export interface PublicCloudConnectorsOperations {
  /** A long-running resource action. */
  testPermissions: (
    resourceGroupName: string,
    publicCloudConnector: string,
    options?: PublicCloudConnectorsTestPermissionsOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** List PublicCloudConnector resources by subscription ID */
  listBySubscription: (
    options?: PublicCloudConnectorsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PublicCloudConnector>;
  /** List PublicCloudConnector resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PublicCloudConnectorsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PublicCloudConnector>;
  /** Delete a PublicCloudConnector */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    publicCloudConnector: string,
    options?: PublicCloudConnectorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a PublicCloudConnector */
  update: (
    resourceGroupName: string,
    publicCloudConnector: string,
    properties: PublicCloudConnectorUpdate,
    options?: PublicCloudConnectorsUpdateOptionalParams,
  ) => Promise<PublicCloudConnector>;
  /** Create a PublicCloudConnector */
  createOrUpdate: (
    resourceGroupName: string,
    publicCloudConnector: string,
    resource: PublicCloudConnector,
    options?: PublicCloudConnectorsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PublicCloudConnector>, PublicCloudConnector>;
  /** Get a PublicCloudConnector */
  get: (
    resourceGroupName: string,
    publicCloudConnector: string,
    options?: PublicCloudConnectorsGetOptionalParams,
  ) => Promise<PublicCloudConnector>;
}

function _getPublicCloudConnectors(context: HybridConnectivityManagementAPIContext) {
  return {
    testPermissions: (
      resourceGroupName: string,
      publicCloudConnector: string,
      options?: PublicCloudConnectorsTestPermissionsOptionalParams,
    ) => testPermissions(context, resourceGroupName, publicCloudConnector, options),
    listBySubscription: (options?: PublicCloudConnectorsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: PublicCloudConnectorsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      publicCloudConnector: string,
      options?: PublicCloudConnectorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, publicCloudConnector, options),
    update: (
      resourceGroupName: string,
      publicCloudConnector: string,
      properties: PublicCloudConnectorUpdate,
      options?: PublicCloudConnectorsUpdateOptionalParams,
    ) => update(context, resourceGroupName, publicCloudConnector, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      publicCloudConnector: string,
      resource: PublicCloudConnector,
      options?: PublicCloudConnectorsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, publicCloudConnector, resource, options),
    get: (
      resourceGroupName: string,
      publicCloudConnector: string,
      options?: PublicCloudConnectorsGetOptionalParams,
    ) => get(context, resourceGroupName, publicCloudConnector, options),
  };
}

export function _getPublicCloudConnectorsOperations(
  context: HybridConnectivityManagementAPIContext,
): PublicCloudConnectorsOperations {
  return {
    ..._getPublicCloudConnectors(context),
  };
}
