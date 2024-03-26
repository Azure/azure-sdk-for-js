// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureSphereContext } from "../../api/AzureSphereContext.js";
import {
  DeviceGroup,
  CountDeviceResponse,
  CountDevicesResponse,
  Device,
  Deployment,
  Image,
  Catalog,
  CatalogUpdate,
  ListDeviceGroupsRequest,
  DeviceInsight,
} from "../../models/models.js";
import {
  catalogsGet,
  catalogsCreateOrUpdate,
  catalogsUpdate,
  catalogsDeleteOperation,
  catalogsListByResourceGroup,
  catalogsListBySubscription,
  catalogsDeprecated,
  catalogsCountDevices,
  catalogsListDeviceInsights,
  catalogsListDevices,
  catalogsListDeployments,
  catalogsListDeviceGroups,
  catalogsUploadImage,
} from "../../api/catalogs/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  CatalogsGetOptions,
  CatalogsCreateOrUpdateOptions,
  CatalogsUpdateOptions,
  CatalogsDeleteOperationOptions,
  CatalogsListByResourceGroupOptions,
  CatalogsListBySubscriptionOptions,
  CatalogsDeprecatedOptions,
  CatalogsCountDevicesOptions,
  CatalogsListDeviceInsightsOptions,
  CatalogsListDevicesOptions,
  CatalogsListDeploymentsOptions,
  CatalogsListDeviceGroupsOptions,
  CatalogsUploadImageOptions,
} from "../../models/options.js";

export interface CatalogsOperations {
  get: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    options?: CatalogsGetOptions,
  ) => Promise<Catalog>;
  createOrUpdate: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    resource: Catalog,
    options?: CatalogsCreateOrUpdateOptions,
  ) => PollerLike<OperationState<Catalog>, Catalog>;
  update: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    properties: CatalogUpdate,
    options?: CatalogsUpdateOptions,
  ) => Promise<Catalog>;
  deleteOperation: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    options?: CatalogsDeleteOperationOptions,
  ) => PollerLike<OperationState<void>, void>;
  listByResourceGroup: (
    subscriptionId: string,
    resourceGroupName: string,
    options?: CatalogsListByResourceGroupOptions,
  ) => PagedAsyncIterableIterator<Catalog>;
  listBySubscription: (
    subscriptionId: string,
    options?: CatalogsListBySubscriptionOptions,
  ) => PagedAsyncIterableIterator<Catalog>;
  deprecated: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    options?: CatalogsDeprecatedOptions,
  ) => Promise<CountDeviceResponse>;
  countDevices: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    options?: CatalogsCountDevicesOptions,
  ) => Promise<CountDevicesResponse>;
  listDeviceInsights: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    options?: CatalogsListDeviceInsightsOptions,
  ) => PagedAsyncIterableIterator<DeviceInsight>;
  listDevices: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    options?: CatalogsListDevicesOptions,
  ) => PagedAsyncIterableIterator<Device>;
  listDeployments: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    options?: CatalogsListDeploymentsOptions,
  ) => PagedAsyncIterableIterator<Deployment>;
  listDeviceGroups: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    listDeviceGroupsRequest: ListDeviceGroupsRequest,
    options?: CatalogsListDeviceGroupsOptions,
  ) => PagedAsyncIterableIterator<DeviceGroup>;
  uploadImage: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    uploadImageRequest: Image,
    options?: CatalogsUploadImageOptions,
  ) => PollerLike<OperationState<void>, void>;
}

export function getCatalogs(context: AzureSphereContext) {
  return {
    get: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      options?: CatalogsGetOptions,
    ) =>
      catalogsGet(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        options,
      ),
    createOrUpdate: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      resource: Catalog,
      options?: CatalogsCreateOrUpdateOptions,
    ) =>
      catalogsCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        resource,
        options,
      ),
    update: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      properties: CatalogUpdate,
      options?: CatalogsUpdateOptions,
    ) =>
      catalogsUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        properties,
        options,
      ),
    deleteOperation: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      options?: CatalogsDeleteOperationOptions,
    ) =>
      catalogsDeleteOperation(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        options,
      ),
    listByResourceGroup: (
      subscriptionId: string,
      resourceGroupName: string,
      options?: CatalogsListByResourceGroupOptions,
    ) =>
      catalogsListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listBySubscription: (
      subscriptionId: string,
      options?: CatalogsListBySubscriptionOptions,
    ) => catalogsListBySubscription(context, subscriptionId, options),
    deprecated: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      options?: CatalogsDeprecatedOptions,
    ) =>
      catalogsDeprecated(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        options,
      ),
    countDevices: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      options?: CatalogsCountDevicesOptions,
    ) =>
      catalogsCountDevices(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        options,
      ),
    listDeviceInsights: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      options?: CatalogsListDeviceInsightsOptions,
    ) =>
      catalogsListDeviceInsights(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        options,
      ),
    listDevices: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      options?: CatalogsListDevicesOptions,
    ) =>
      catalogsListDevices(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        options,
      ),
    listDeployments: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      options?: CatalogsListDeploymentsOptions,
    ) =>
      catalogsListDeployments(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        options,
      ),
    listDeviceGroups: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      listDeviceGroupsRequest: ListDeviceGroupsRequest,
      options?: CatalogsListDeviceGroupsOptions,
    ) =>
      catalogsListDeviceGroups(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        listDeviceGroupsRequest,
        options,
      ),
    uploadImage: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      uploadImageRequest: Image,
      options?: CatalogsUploadImageOptions,
    ) =>
      catalogsUploadImage(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        uploadImageRequest,
        options,
      ),
  };
}

export function getCatalogsOperations(
  context: AzureSphereContext,
): CatalogsOperations {
  return {
    ...getCatalogs(context),
  };
}
