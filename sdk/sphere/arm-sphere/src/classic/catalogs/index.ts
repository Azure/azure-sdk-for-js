// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSphereContext } from "../../api/azureSphereContext.js";
import {
  uploadImage,
  listDevices,
  listDeviceInsights,
  listDeviceGroups,
  listDeployments,
  countDevices,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/catalogs/operations.js";
import type {
  CatalogsUploadImageOptionalParams,
  CatalogsListDevicesOptionalParams,
  CatalogsListDeviceInsightsOptionalParams,
  CatalogsListDeviceGroupsOptionalParams,
  CatalogsListDeploymentsOptionalParams,
  CatalogsCountDevicesOptionalParams,
  CatalogsListBySubscriptionOptionalParams,
  CatalogsListByResourceGroupOptionalParams,
  CatalogsDeleteOptionalParams,
  CatalogsUpdateOptionalParams,
  CatalogsCreateOrUpdateOptionalParams,
  CatalogsGetOptionalParams,
} from "../../api/catalogs/options.js";
import type {
  Catalog,
  CatalogUpdate,
  CountDevicesResponse,
  Deployment,
  Image,
  ListDeviceGroupsRequest,
  DeviceGroup,
  DeviceInsight,
  Device,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Catalogs operations. */
export interface CatalogsOperations {
  /** Creates an image. Use this action when the image ID is unknown. */
  uploadImage: (
    resourceGroupName: string,
    catalogName: string,
    uploadImageRequest: Image,
    options?: CatalogsUploadImageOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Lists devices for catalog. */
  listDevices: (
    resourceGroupName: string,
    catalogName: string,
    options?: CatalogsListDevicesOptionalParams,
  ) => PagedAsyncIterableIterator<Device>;
  /** Lists device insights for catalog. */
  listDeviceInsights: (
    resourceGroupName: string,
    catalogName: string,
    options?: CatalogsListDeviceInsightsOptionalParams,
  ) => PagedAsyncIterableIterator<DeviceInsight>;
  /** List the device groups for the catalog. */
  listDeviceGroups: (
    resourceGroupName: string,
    catalogName: string,
    listDeviceGroupsRequest: ListDeviceGroupsRequest,
    options?: CatalogsListDeviceGroupsOptionalParams,
  ) => PagedAsyncIterableIterator<DeviceGroup>;
  /** Lists deployments for catalog. */
  listDeployments: (
    resourceGroupName: string,
    catalogName: string,
    options?: CatalogsListDeploymentsOptionalParams,
  ) => PagedAsyncIterableIterator<Deployment>;
  /** Counts devices in catalog. */
  countDevices: (
    resourceGroupName: string,
    catalogName: string,
    options?: CatalogsCountDevicesOptionalParams,
  ) => Promise<CountDevicesResponse>;
  /** List Catalog resources by subscription ID */
  listBySubscription: (
    options?: CatalogsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Catalog>;
  /** List Catalog resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: CatalogsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Catalog>;
  /** Delete a Catalog */
  delete: (
    resourceGroupName: string,
    catalogName: string,
    options?: CatalogsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Catalog */
  update: (
    resourceGroupName: string,
    catalogName: string,
    properties: CatalogUpdate,
    options?: CatalogsUpdateOptionalParams,
  ) => Promise<Catalog>;
  /** Create a Catalog */
  createOrUpdate: (
    resourceGroupName: string,
    catalogName: string,
    resource: Catalog,
    options?: CatalogsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Catalog>, Catalog>;
  /** Get a Catalog */
  get: (
    resourceGroupName: string,
    catalogName: string,
    options?: CatalogsGetOptionalParams,
  ) => Promise<Catalog>;
}

function _getCatalogs(context: AzureSphereContext) {
  return {
    uploadImage: (
      resourceGroupName: string,
      catalogName: string,
      uploadImageRequest: Image,
      options?: CatalogsUploadImageOptionalParams,
    ) => uploadImage(context, resourceGroupName, catalogName, uploadImageRequest, options),
    listDevices: (
      resourceGroupName: string,
      catalogName: string,
      options?: CatalogsListDevicesOptionalParams,
    ) => listDevices(context, resourceGroupName, catalogName, options),
    listDeviceInsights: (
      resourceGroupName: string,
      catalogName: string,
      options?: CatalogsListDeviceInsightsOptionalParams,
    ) => listDeviceInsights(context, resourceGroupName, catalogName, options),
    listDeviceGroups: (
      resourceGroupName: string,
      catalogName: string,
      listDeviceGroupsRequest: ListDeviceGroupsRequest,
      options?: CatalogsListDeviceGroupsOptionalParams,
    ) =>
      listDeviceGroups(context, resourceGroupName, catalogName, listDeviceGroupsRequest, options),
    listDeployments: (
      resourceGroupName: string,
      catalogName: string,
      options?: CatalogsListDeploymentsOptionalParams,
    ) => listDeployments(context, resourceGroupName, catalogName, options),
    countDevices: (
      resourceGroupName: string,
      catalogName: string,
      options?: CatalogsCountDevicesOptionalParams,
    ) => countDevices(context, resourceGroupName, catalogName, options),
    listBySubscription: (options?: CatalogsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: CatalogsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      catalogName: string,
      options?: CatalogsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, catalogName, options),
    update: (
      resourceGroupName: string,
      catalogName: string,
      properties: CatalogUpdate,
      options?: CatalogsUpdateOptionalParams,
    ) => update(context, resourceGroupName, catalogName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      catalogName: string,
      resource: Catalog,
      options?: CatalogsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, catalogName, resource, options),
    get: (resourceGroupName: string, catalogName: string, options?: CatalogsGetOptionalParams) =>
      get(context, resourceGroupName, catalogName, options),
  };
}

export function _getCatalogsOperations(context: AzureSphereContext): CatalogsOperations {
  return {
    ..._getCatalogs(context),
  };
}
