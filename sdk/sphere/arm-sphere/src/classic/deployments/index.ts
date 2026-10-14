// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSphereContext } from "../../api/azureSphereContext.js";
import {
  listByDeviceGroup,
  $delete,
  createOrUpdate,
  get,
} from "../../api/deployments/operations.js";
import type {
  DeploymentsListByDeviceGroupOptionalParams,
  DeploymentsDeleteOptionalParams,
  DeploymentsCreateOrUpdateOptionalParams,
  DeploymentsGetOptionalParams,
} from "../../api/deployments/options.js";
import type { Deployment } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Deployments operations. */
export interface DeploymentsOperations {
  /** List Deployment resources by DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
  listByDeviceGroup: (
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    options?: DeploymentsListByDeviceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Deployment>;
  /** Delete a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
  delete: (
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    deploymentName: string,
    options?: DeploymentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
  createOrUpdate: (
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    deploymentName: string,
    resource: Deployment,
    options?: DeploymentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Deployment>, Deployment>;
  /** Get a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
  get: (
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    deploymentName: string,
    options?: DeploymentsGetOptionalParams,
  ) => Promise<Deployment>;
}

function _getDeployments(context: AzureSphereContext) {
  return {
    listByDeviceGroup: (
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      options?: DeploymentsListByDeviceGroupOptionalParams,
    ) =>
      listByDeviceGroup(
        context,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      deploymentName: string,
      options?: DeploymentsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deploymentName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      deploymentName: string,
      resource: Deployment,
      options?: DeploymentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deploymentName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      deploymentName: string,
      options?: DeploymentsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deploymentName,
        options,
      ),
  };
}

export function _getDeploymentsOperations(context: AzureSphereContext): DeploymentsOperations {
  return {
    ..._getDeployments(context),
  };
}
