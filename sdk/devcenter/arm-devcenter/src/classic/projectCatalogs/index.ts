// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import {
  connect,
  sync,
  getSyncErrorDetails,
  list,
  $delete,
  patch,
  createOrUpdate,
  get,
} from "../../api/projectCatalogs/operations.js";
import type {
  ProjectCatalogsConnectOptionalParams,
  ProjectCatalogsSyncOptionalParams,
  ProjectCatalogsGetSyncErrorDetailsOptionalParams,
  ProjectCatalogsListOptionalParams,
  ProjectCatalogsDeleteOptionalParams,
  ProjectCatalogsPatchOptionalParams,
  ProjectCatalogsCreateOrUpdateOptionalParams,
  ProjectCatalogsGetOptionalParams,
} from "../../api/projectCatalogs/options.js";
import type { Catalog, CatalogUpdate, SyncErrorDetails } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ProjectCatalogs operations. */
export interface ProjectCatalogsOperations {
  /** Connects a project catalog to enable syncing. */
  connect: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    options?: ProjectCatalogsConnectOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use connect instead */
  beginConnect: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    options?: ProjectCatalogsConnectOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use connect instead */
  beginConnectAndWait: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    options?: ProjectCatalogsConnectOptionalParams,
  ) => Promise<void>;
  /** Syncs templates for a template source. */
  sync: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    options?: ProjectCatalogsSyncOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use sync instead */
  beginSync: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    options?: ProjectCatalogsSyncOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use sync instead */
  beginSyncAndWait: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    options?: ProjectCatalogsSyncOptionalParams,
  ) => Promise<void>;
  /** Gets project catalog synchronization error details */
  getSyncErrorDetails: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    options?: ProjectCatalogsGetSyncErrorDetailsOptionalParams,
  ) => Promise<SyncErrorDetails>;
  /** Lists the catalogs associated with a project. */
  list: (
    resourceGroupName: string,
    projectName: string,
    options?: ProjectCatalogsListOptionalParams,
  ) => PagedAsyncIterableIterator<Catalog>;
  /** Deletes a project catalog resource. */
  delete: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    options?: ProjectCatalogsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    options?: ProjectCatalogsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    options?: ProjectCatalogsDeleteOptionalParams,
  ) => Promise<void>;
  /** Partially updates a project catalog. */
  patch: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    body: CatalogUpdate,
    options?: ProjectCatalogsPatchOptionalParams,
  ) => PollerLike<OperationState<Catalog>, Catalog>;
  /** @deprecated use patch instead */
  beginPatch: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    body: CatalogUpdate,
    options?: ProjectCatalogsPatchOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Catalog>, Catalog>>;
  /** @deprecated use patch instead */
  beginPatchAndWait: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    body: CatalogUpdate,
    options?: ProjectCatalogsPatchOptionalParams,
  ) => Promise<Catalog>;
  /** Creates or updates a project catalog. */
  createOrUpdate: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    body: Catalog,
    options?: ProjectCatalogsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Catalog>, Catalog>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    body: Catalog,
    options?: ProjectCatalogsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Catalog>, Catalog>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    body: Catalog,
    options?: ProjectCatalogsCreateOrUpdateOptionalParams,
  ) => Promise<Catalog>;
  /** Gets an associated project catalog. */
  get: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    options?: ProjectCatalogsGetOptionalParams,
  ) => Promise<Catalog>;
}

function _getProjectCatalogs(context: DevCenterContext) {
  return {
    connect: (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      options?: ProjectCatalogsConnectOptionalParams,
    ) => connect(context, resourceGroupName, projectName, catalogName, options),
    beginConnect: async (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      options?: ProjectCatalogsConnectOptionalParams,
    ) => {
      const poller = connect(context, resourceGroupName, projectName, catalogName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginConnectAndWait: async (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      options?: ProjectCatalogsConnectOptionalParams,
    ) => {
      return await connect(context, resourceGroupName, projectName, catalogName, options);
    },
    sync: (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      options?: ProjectCatalogsSyncOptionalParams,
    ) => sync(context, resourceGroupName, projectName, catalogName, options),
    beginSync: async (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      options?: ProjectCatalogsSyncOptionalParams,
    ) => {
      const poller = sync(context, resourceGroupName, projectName, catalogName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSyncAndWait: async (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      options?: ProjectCatalogsSyncOptionalParams,
    ) => {
      return await sync(context, resourceGroupName, projectName, catalogName, options);
    },
    getSyncErrorDetails: (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      options?: ProjectCatalogsGetSyncErrorDetailsOptionalParams,
    ) => getSyncErrorDetails(context, resourceGroupName, projectName, catalogName, options),
    list: (
      resourceGroupName: string,
      projectName: string,
      options?: ProjectCatalogsListOptionalParams,
    ) => list(context, resourceGroupName, projectName, options),
    delete: (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      options?: ProjectCatalogsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, projectName, catalogName, options),
    beginDelete: async (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      options?: ProjectCatalogsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, projectName, catalogName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      options?: ProjectCatalogsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, projectName, catalogName, options);
    },
    patch: (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      body: CatalogUpdate,
      options?: ProjectCatalogsPatchOptionalParams,
    ) => patch(context, resourceGroupName, projectName, catalogName, body, options),
    beginPatch: async (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      body: CatalogUpdate,
      options?: ProjectCatalogsPatchOptionalParams,
    ) => {
      const poller = patch(context, resourceGroupName, projectName, catalogName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPatchAndWait: async (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      body: CatalogUpdate,
      options?: ProjectCatalogsPatchOptionalParams,
    ) => {
      return await patch(context, resourceGroupName, projectName, catalogName, body, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      body: Catalog,
      options?: ProjectCatalogsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, projectName, catalogName, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      body: Catalog,
      options?: ProjectCatalogsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        projectName,
        catalogName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      body: Catalog,
      options?: ProjectCatalogsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        projectName,
        catalogName,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      options?: ProjectCatalogsGetOptionalParams,
    ) => get(context, resourceGroupName, projectName, catalogName, options),
  };
}

export function _getProjectCatalogsOperations(
  context: DevCenterContext,
): ProjectCatalogsOperations {
  return {
    ..._getProjectCatalogs(context),
  };
}
