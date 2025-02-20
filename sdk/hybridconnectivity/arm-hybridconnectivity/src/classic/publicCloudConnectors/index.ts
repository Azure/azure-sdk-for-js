// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPIContext } from "../../api/hybridConnectivityManagementAPIContext.js";
import {
  PublicCloudConnectorsTestPermissionsOptionalParams,
  PublicCloudConnectorsListBySubscriptionOptionalParams,
  PublicCloudConnectorsListByResourceGroupOptionalParams,
  PublicCloudConnectorsDeleteOptionalParams,
  PublicCloudConnectorsUpdateOptionalParams,
  PublicCloudConnectorsCreateOrUpdateOptionalParams,
  PublicCloudConnectorsGetOptionalParams,
} from "../../api/options.js";
import {
  publicCloudConnectorsTestPermissions,
  publicCloudConnectorsListBySubscription,
  publicCloudConnectorsListByResourceGroup,
  publicCloudConnectorsDelete,
  publicCloudConnectorsUpdate,
  publicCloudConnectorsCreateOrUpdate,
  publicCloudConnectorsGet,
} from "../../api/publicCloudConnectors/index.js";
import { OperationStatusResult, PublicCloudConnector } from "../../models/models.js";
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
  delete: (
    resourceGroupName: string,
    publicCloudConnector: string,
    options?: PublicCloudConnectorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a PublicCloudConnector */
  update: (
    resourceGroupName: string,
    publicCloudConnector: string,
    properties: PublicCloudConnector,
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
    ) =>
      publicCloudConnectorsTestPermissions(
        context,
        resourceGroupName,
        publicCloudConnector,
        options,
      ),
    listBySubscription: (options?: PublicCloudConnectorsListBySubscriptionOptionalParams) =>
      publicCloudConnectorsListBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: PublicCloudConnectorsListByResourceGroupOptionalParams,
    ) => publicCloudConnectorsListByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      publicCloudConnector: string,
      options?: PublicCloudConnectorsDeleteOptionalParams,
    ) => publicCloudConnectorsDelete(context, resourceGroupName, publicCloudConnector, options),
    update: (
      resourceGroupName: string,
      publicCloudConnector: string,
      properties: PublicCloudConnector,
      options?: PublicCloudConnectorsUpdateOptionalParams,
    ) =>
      publicCloudConnectorsUpdate(
        context,
        resourceGroupName,
        publicCloudConnector,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      publicCloudConnector: string,
      resource: PublicCloudConnector,
      options?: PublicCloudConnectorsCreateOrUpdateOptionalParams,
    ) =>
      publicCloudConnectorsCreateOrUpdate(
        context,
        resourceGroupName,
        publicCloudConnector,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      publicCloudConnector: string,
      options?: PublicCloudConnectorsGetOptionalParams,
    ) => publicCloudConnectorsGet(context, resourceGroupName, publicCloudConnector, options),
  };
}

export function _getPublicCloudConnectorsOperations(
  context: HybridConnectivityManagementAPIContext,
): PublicCloudConnectorsOperations {
  return {
    ..._getPublicCloudConnectors(context),
  };
}
