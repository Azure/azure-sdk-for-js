// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import {
  connect,
  sync,
  getSyncErrorDetails,
  listByDevCenter,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/catalogs/operations.js";
import type {
  CatalogsConnectOptionalParams,
  CatalogsSyncOptionalParams,
  CatalogsGetSyncErrorDetailsOptionalParams,
  CatalogsListByDevCenterOptionalParams,
  CatalogsDeleteOptionalParams,
  CatalogsUpdateOptionalParams,
  CatalogsCreateOrUpdateOptionalParams,
  CatalogsGetOptionalParams,
} from "../../api/catalogs/options.js";
import type { Catalog, CatalogUpdate, SyncErrorDetails } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Catalogs operations. */
export interface CatalogsOperations {
  /** Connects a catalog to enable syncing. */
  connect: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    options?: CatalogsConnectOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use connect instead */
  beginConnect: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    options?: CatalogsConnectOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use connect instead */
  beginConnectAndWait: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    options?: CatalogsConnectOptionalParams,
  ) => Promise<void>;
  /** Syncs templates for a template source. */
  sync: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    options?: CatalogsSyncOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use sync instead */
  beginSync: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    options?: CatalogsSyncOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use sync instead */
  beginSyncAndWait: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    options?: CatalogsSyncOptionalParams,
  ) => Promise<void>;
  /** Gets catalog synchronization error details. */
  getSyncErrorDetails: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    options?: CatalogsGetSyncErrorDetailsOptionalParams,
  ) => Promise<SyncErrorDetails>;
  /** Lists catalogs for a devcenter. */
  listByDevCenter: (
    resourceGroupName: string,
    devCenterName: string,
    options?: CatalogsListByDevCenterOptionalParams,
  ) => PagedAsyncIterableIterator<Catalog>;
  /** Deletes a catalog resource. */
  delete: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    options?: CatalogsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    options?: CatalogsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    options?: CatalogsDeleteOptionalParams,
  ) => Promise<void>;
  /** Partially updates a catalog. */
  update: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    body: CatalogUpdate,
    options?: CatalogsUpdateOptionalParams,
  ) => PollerLike<OperationState<Catalog>, Catalog>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    body: CatalogUpdate,
    options?: CatalogsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Catalog>, Catalog>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    body: CatalogUpdate,
    options?: CatalogsUpdateOptionalParams,
  ) => Promise<Catalog>;
  /** Creates or updates a catalog. */
  createOrUpdate: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    body: Catalog,
    options?: CatalogsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Catalog>, Catalog>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    body: Catalog,
    options?: CatalogsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Catalog>, Catalog>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    body: Catalog,
    options?: CatalogsCreateOrUpdateOptionalParams,
  ) => Promise<Catalog>;
  /** Gets a catalog. */
  get: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    options?: CatalogsGetOptionalParams,
  ) => Promise<Catalog>;
}

function _getCatalogs(context: DevCenterContext) {
  return {
    connect: (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      options?: CatalogsConnectOptionalParams,
    ) => connect(context, resourceGroupName, devCenterName, catalogName, options),
    beginConnect: async (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      options?: CatalogsConnectOptionalParams,
    ) => {
      const poller = connect(context, resourceGroupName, devCenterName, catalogName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginConnectAndWait: async (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      options?: CatalogsConnectOptionalParams,
    ) => {
      return await connect(context, resourceGroupName, devCenterName, catalogName, options);
    },
    sync: (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      options?: CatalogsSyncOptionalParams,
    ) => sync(context, resourceGroupName, devCenterName, catalogName, options),
    beginSync: async (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      options?: CatalogsSyncOptionalParams,
    ) => {
      const poller = sync(context, resourceGroupName, devCenterName, catalogName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSyncAndWait: async (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      options?: CatalogsSyncOptionalParams,
    ) => {
      return await sync(context, resourceGroupName, devCenterName, catalogName, options);
    },
    getSyncErrorDetails: (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      options?: CatalogsGetSyncErrorDetailsOptionalParams,
    ) => getSyncErrorDetails(context, resourceGroupName, devCenterName, catalogName, options),
    listByDevCenter: (
      resourceGroupName: string,
      devCenterName: string,
      options?: CatalogsListByDevCenterOptionalParams,
    ) => listByDevCenter(context, resourceGroupName, devCenterName, options),
    delete: (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      options?: CatalogsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, devCenterName, catalogName, options),
    beginDelete: async (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      options?: CatalogsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, devCenterName, catalogName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      options?: CatalogsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, devCenterName, catalogName, options);
    },
    update: (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      body: CatalogUpdate,
      options?: CatalogsUpdateOptionalParams,
    ) => update(context, resourceGroupName, devCenterName, catalogName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      body: CatalogUpdate,
      options?: CatalogsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, devCenterName, catalogName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      body: CatalogUpdate,
      options?: CatalogsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, devCenterName, catalogName, body, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      body: Catalog,
      options?: CatalogsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, devCenterName, catalogName, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      body: Catalog,
      options?: CatalogsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        devCenterName,
        catalogName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      body: Catalog,
      options?: CatalogsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        devCenterName,
        catalogName,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      options?: CatalogsGetOptionalParams,
    ) => get(context, resourceGroupName, devCenterName, catalogName, options),
  };
}

export function _getCatalogsOperations(context: DevCenterContext): CatalogsOperations {
  return {
    ..._getCatalogs(context),
  };
}
