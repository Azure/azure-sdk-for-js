// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NetworkAnalyticsContext } from "../../api/NetworkAnalyticsContext.js";
import { DataProductsCatalog } from "../../models/models.js";
import {
  dataProductsCatalogsGet,
  dataProductsCatalogsListByResourceGroup,
  dataProductsCatalogsListBySubscription,
} from "../../api/dataProductsCatalogs/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import {
  DataProductsCatalogsGetOptions,
  DataProductsCatalogsListByResourceGroupOptions,
  DataProductsCatalogsListBySubscriptionOptions,
} from "../../models/options.js";

export interface DataProductsCatalogsOperations {
  get: (
    subscriptionId: string,
    resourceGroupName: string,
    options?: DataProductsCatalogsGetOptions,
  ) => Promise<DataProductsCatalog>;
  listByResourceGroup: (
    subscriptionId: string,
    resourceGroupName: string,
    options?: DataProductsCatalogsListByResourceGroupOptions,
  ) => PagedAsyncIterableIterator<DataProductsCatalog>;
  listBySubscription: (
    subscriptionId: string,
    options?: DataProductsCatalogsListBySubscriptionOptions,
  ) => PagedAsyncIterableIterator<DataProductsCatalog>;
}

export function getDataProductsCatalogs(context: NetworkAnalyticsContext) {
  return {
    get: (
      subscriptionId: string,
      resourceGroupName: string,
      options?: DataProductsCatalogsGetOptions,
    ) =>
      dataProductsCatalogsGet(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listByResourceGroup: (
      subscriptionId: string,
      resourceGroupName: string,
      options?: DataProductsCatalogsListByResourceGroupOptions,
    ) =>
      dataProductsCatalogsListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listBySubscription: (
      subscriptionId: string,
      options?: DataProductsCatalogsListBySubscriptionOptions,
    ) =>
      dataProductsCatalogsListBySubscription(context, subscriptionId, options),
  };
}

export function getDataProductsCatalogsOperations(
  context: NetworkAnalyticsContext,
): DataProductsCatalogsOperations {
  return {
    ...getDataProductsCatalogs(context),
  };
}
