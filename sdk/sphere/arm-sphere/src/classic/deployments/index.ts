// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureSphereContext } from "../../api/AzureSphereContext.js";
import { Deployment } from "../../models/models.js";
import {
  deploymentsGet,
  deploymentsListByDeviceGroup,
  deploymentsCreateOrUpdate,
  deploymentsDeleteOperation,
} from "../../api/deployments/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  DeploymentsGetOptions,
  DeploymentsListByDeviceGroupOptions,
  DeploymentsCreateOrUpdateOptions,
  DeploymentsDeleteOperationOptions,
} from "../../models/options.js";

export interface DeploymentsOperations {
  get: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    deploymentName: string,
    options?: DeploymentsGetOptions,
  ) => Promise<Deployment>;
  listByDeviceGroup: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    options?: DeploymentsListByDeviceGroupOptions,
  ) => PagedAsyncIterableIterator<Deployment>;
  createOrUpdate: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    deploymentName: string,
    resource: Deployment,
    options?: DeploymentsCreateOrUpdateOptions,
  ) => PollerLike<OperationState<Deployment>, Deployment>;
  deleteOperation: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    deploymentName: string,
    options?: DeploymentsDeleteOperationOptions,
  ) => PollerLike<OperationState<void>, void>;
}

export function getDeployments(context: AzureSphereContext) {
  return {
    get: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      deploymentName: string,
      options?: DeploymentsGetOptions,
    ) =>
      deploymentsGet(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deploymentName,
        options,
      ),
    listByDeviceGroup: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      options?: DeploymentsListByDeviceGroupOptions,
    ) =>
      deploymentsListByDeviceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        options,
      ),
    createOrUpdate: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      deploymentName: string,
      resource: Deployment,
      options?: DeploymentsCreateOrUpdateOptions,
    ) =>
      deploymentsCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deploymentName,
        resource,
        options,
      ),
    deleteOperation: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      deploymentName: string,
      options?: DeploymentsDeleteOperationOptions,
    ) =>
      deploymentsDeleteOperation(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deploymentName,
        options,
      ),
  };
}

export function getDeploymentsOperations(
  context: AzureSphereContext,
): DeploymentsOperations {
  return {
    ...getDeployments(context),
  };
}
