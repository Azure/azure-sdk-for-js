// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  refreshSiteSilos,
  deleteSiteSilo,
  updateSiteSilo,
  createOrUpdateSiteSilo,
  getSiteSilo,
  listSiteSilos,
} from "../../api/siteSiloResources/operations.js";
import type {
  SiteSiloResourcesRefreshSiteSilosOptionalParams,
  SiteSiloResourcesDeleteSiteSiloOptionalParams,
  SiteSiloResourcesUpdateSiteSiloOptionalParams,
  SiteSiloResourcesCreateOrUpdateSiteSiloOptionalParams,
  SiteSiloResourcesGetSiteSiloOptionalParams,
  SiteSiloResourcesListSiteSilosOptionalParams,
} from "../../api/siteSiloResources/options.js";
import type { SiteSilo, SiteSiloTagsUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SiteSiloResources operations. */
export interface SiteSiloResourcesOperations {
  /** Forces a fresh revision for an Active Backup primary Web App and re-syncs all of its silos. The refresh request is recorded synchronously; silos then converge asynchronously — track progress through each silo's revisionNumber. */
  refreshSiteSilos: (
    resourceGroupName: string,
    name: string,
    options?: SiteSiloResourcesRefreshSiteSilosOptionalParams,
  ) => Promise<void>;
  /** Deletes a silo for a Web App. */
  deleteSiteSilo: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    options?: SiteSiloResourcesDeleteSiteSiloOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteSiteSilo instead */
  beginDeleteSiteSilo: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    options?: SiteSiloResourcesDeleteSiteSiloOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteSiteSilo instead */
  beginDeleteSiteSiloAndWait: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    options?: SiteSiloResourcesDeleteSiteSiloOptionalParams,
  ) => Promise<void>;
  /** Updates only the tags of a Web App silo. Silo configuration and provisioning state are not modified. */
  updateSiteSilo: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    properties: SiteSiloTagsUpdate,
    options?: SiteSiloResourcesUpdateSiteSiloOptionalParams,
  ) => Promise<SiteSilo>;
  /** Creates or updates a silo for a Web App. Returns 202 with polling headers when background work is queued, or 200 when no update is needed. */
  createOrUpdateSiteSilo: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    resource: SiteSilo,
    options?: SiteSiloResourcesCreateOrUpdateSiteSiloOptionalParams,
  ) => PollerLike<OperationState<SiteSilo>, SiteSilo>;
  /** @deprecated use createOrUpdateSiteSilo instead */
  beginCreateOrUpdateSiteSilo: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    resource: SiteSilo,
    options?: SiteSiloResourcesCreateOrUpdateSiteSiloOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SiteSilo>, SiteSilo>>;
  /** @deprecated use createOrUpdateSiteSilo instead */
  beginCreateOrUpdateSiteSiloAndWait: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    resource: SiteSilo,
    options?: SiteSiloResourcesCreateOrUpdateSiteSiloOptionalParams,
  ) => Promise<SiteSilo>;
  /** Gets a specific silo for a Web App. */
  getSiteSilo: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    options?: SiteSiloResourcesGetSiteSiloOptionalParams,
  ) => Promise<SiteSilo>;
  /** Gets all silos for a Web App. */
  listSiteSilos: (
    resourceGroupName: string,
    name: string,
    options?: SiteSiloResourcesListSiteSilosOptionalParams,
  ) => PagedAsyncIterableIterator<SiteSilo>;
}

function _getSiteSiloResources(context: WebSiteManagementContext) {
  return {
    refreshSiteSilos: (
      resourceGroupName: string,
      name: string,
      options?: SiteSiloResourcesRefreshSiteSilosOptionalParams,
    ) => refreshSiteSilos(context, resourceGroupName, name, options),
    deleteSiteSilo: (
      resourceGroupName: string,
      name: string,
      siloName: string,
      options?: SiteSiloResourcesDeleteSiteSiloOptionalParams,
    ) => deleteSiteSilo(context, resourceGroupName, name, siloName, options),
    beginDeleteSiteSilo: async (
      resourceGroupName: string,
      name: string,
      siloName: string,
      options?: SiteSiloResourcesDeleteSiteSiloOptionalParams,
    ) => {
      const poller = deleteSiteSilo(context, resourceGroupName, name, siloName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteSiteSiloAndWait: async (
      resourceGroupName: string,
      name: string,
      siloName: string,
      options?: SiteSiloResourcesDeleteSiteSiloOptionalParams,
    ) => {
      return await deleteSiteSilo(context, resourceGroupName, name, siloName, options);
    },
    updateSiteSilo: (
      resourceGroupName: string,
      name: string,
      siloName: string,
      properties: SiteSiloTagsUpdate,
      options?: SiteSiloResourcesUpdateSiteSiloOptionalParams,
    ) => updateSiteSilo(context, resourceGroupName, name, siloName, properties, options),
    createOrUpdateSiteSilo: (
      resourceGroupName: string,
      name: string,
      siloName: string,
      resource: SiteSilo,
      options?: SiteSiloResourcesCreateOrUpdateSiteSiloOptionalParams,
    ) => createOrUpdateSiteSilo(context, resourceGroupName, name, siloName, resource, options),
    beginCreateOrUpdateSiteSilo: async (
      resourceGroupName: string,
      name: string,
      siloName: string,
      resource: SiteSilo,
      options?: SiteSiloResourcesCreateOrUpdateSiteSiloOptionalParams,
    ) => {
      const poller = createOrUpdateSiteSilo(
        context,
        resourceGroupName,
        name,
        siloName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateSiteSiloAndWait: async (
      resourceGroupName: string,
      name: string,
      siloName: string,
      resource: SiteSilo,
      options?: SiteSiloResourcesCreateOrUpdateSiteSiloOptionalParams,
    ) => {
      return await createOrUpdateSiteSilo(
        context,
        resourceGroupName,
        name,
        siloName,
        resource,
        options,
      );
    },
    getSiteSilo: (
      resourceGroupName: string,
      name: string,
      siloName: string,
      options?: SiteSiloResourcesGetSiteSiloOptionalParams,
    ) => getSiteSilo(context, resourceGroupName, name, siloName, options),
    listSiteSilos: (
      resourceGroupName: string,
      name: string,
      options?: SiteSiloResourcesListSiteSilosOptionalParams,
    ) => listSiteSilos(context, resourceGroupName, name, options),
  };
}

export function _getSiteSiloResourcesOperations(
  context: WebSiteManagementContext,
): SiteSiloResourcesOperations {
  return {
    ..._getSiteSiloResources(context),
  };
}
