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
  /** Syncs templates for a template source. */
  sync: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    options?: ProjectCatalogsSyncOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
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
  /** Partially updates a project catalog. */
  patch: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    body: CatalogUpdate,
    options?: ProjectCatalogsPatchOptionalParams,
  ) => PollerLike<OperationState<Catalog>, Catalog>;
  /** Creates or updates a project catalog. */
  createOrUpdate: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    body: Catalog,
    options?: ProjectCatalogsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Catalog>, Catalog>;
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
    sync: (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      options?: ProjectCatalogsSyncOptionalParams,
    ) => sync(context, resourceGroupName, projectName, catalogName, options),
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
    patch: (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      body: CatalogUpdate,
      options?: ProjectCatalogsPatchOptionalParams,
    ) => patch(context, resourceGroupName, projectName, catalogName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      body: Catalog,
      options?: ProjectCatalogsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, projectName, catalogName, body, options),
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
