// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  getServerFarmSiloVnetIntegrations,
  deleteServerFarmSilo,
  updateServerFarmSilo,
  createOrUpdateServerFarmSilo,
  getServerFarmSilo,
  listServerFarmSilos,
} from "../../api/serverFarmSiloResources/operations.js";
import type {
  ServerFarmSiloResourcesGetServerFarmSiloVnetIntegrationsOptionalParams,
  ServerFarmSiloResourcesDeleteServerFarmSiloOptionalParams,
  ServerFarmSiloResourcesUpdateServerFarmSiloOptionalParams,
  ServerFarmSiloResourcesCreateOrUpdateServerFarmSiloOptionalParams,
  ServerFarmSiloResourcesGetServerFarmSiloOptionalParams,
  ServerFarmSiloResourcesListServerFarmSilosOptionalParams,
} from "../../api/serverFarmSiloResources/options.js";
import type {
  ServerFarmSilo,
  ServerFarmSiloTagsUpdate,
  ServerFarmSiloVnetIntegrationsResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServerFarmSiloResources operations. */
export interface ServerFarmSiloResourcesOperations {
  /** Gets the virtual network integrations associated with an App Service plan silo. */
  getServerFarmSiloVnetIntegrations: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    options?: ServerFarmSiloResourcesGetServerFarmSiloVnetIntegrationsOptionalParams,
  ) => Promise<ServerFarmSiloVnetIntegrationsResult>;
  /** Deletes a silo for an App Service plan. */
  deleteServerFarmSilo: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    options?: ServerFarmSiloResourcesDeleteServerFarmSiloOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteServerFarmSilo instead */
  beginDeleteServerFarmSilo: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    options?: ServerFarmSiloResourcesDeleteServerFarmSiloOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteServerFarmSilo instead */
  beginDeleteServerFarmSiloAndWait: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    options?: ServerFarmSiloResourcesDeleteServerFarmSiloOptionalParams,
  ) => Promise<void>;
  /** Updates only the tags of an App Service plan silo. Silo configuration and provisioning state are not modified. */
  updateServerFarmSilo: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    properties: ServerFarmSiloTagsUpdate,
    options?: ServerFarmSiloResourcesUpdateServerFarmSiloOptionalParams,
  ) => Promise<ServerFarmSilo>;
  /** Creates or updates a silo for an App Service plan. Returns 202 with polling headers when background work is queued, or 200 when no update is needed. */
  createOrUpdateServerFarmSilo: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    resource: ServerFarmSilo,
    options?: ServerFarmSiloResourcesCreateOrUpdateServerFarmSiloOptionalParams,
  ) => PollerLike<OperationState<ServerFarmSilo>, ServerFarmSilo>;
  /** @deprecated use createOrUpdateServerFarmSilo instead */
  beginCreateOrUpdateServerFarmSilo: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    resource: ServerFarmSilo,
    options?: ServerFarmSiloResourcesCreateOrUpdateServerFarmSiloOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ServerFarmSilo>, ServerFarmSilo>>;
  /** @deprecated use createOrUpdateServerFarmSilo instead */
  beginCreateOrUpdateServerFarmSiloAndWait: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    resource: ServerFarmSilo,
    options?: ServerFarmSiloResourcesCreateOrUpdateServerFarmSiloOptionalParams,
  ) => Promise<ServerFarmSilo>;
  /** Gets a specific silo for an App Service plan. */
  getServerFarmSilo: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    options?: ServerFarmSiloResourcesGetServerFarmSiloOptionalParams,
  ) => Promise<ServerFarmSilo>;
  /** Gets all silos for an App Service plan. */
  listServerFarmSilos: (
    resourceGroupName: string,
    name: string,
    options?: ServerFarmSiloResourcesListServerFarmSilosOptionalParams,
  ) => PagedAsyncIterableIterator<ServerFarmSilo>;
}

function _getServerFarmSiloResources(context: WebSiteManagementContext) {
  return {
    getServerFarmSiloVnetIntegrations: (
      resourceGroupName: string,
      name: string,
      siloName: string,
      options?: ServerFarmSiloResourcesGetServerFarmSiloVnetIntegrationsOptionalParams,
    ) => getServerFarmSiloVnetIntegrations(context, resourceGroupName, name, siloName, options),
    deleteServerFarmSilo: (
      resourceGroupName: string,
      name: string,
      siloName: string,
      options?: ServerFarmSiloResourcesDeleteServerFarmSiloOptionalParams,
    ) => deleteServerFarmSilo(context, resourceGroupName, name, siloName, options),
    beginDeleteServerFarmSilo: async (
      resourceGroupName: string,
      name: string,
      siloName: string,
      options?: ServerFarmSiloResourcesDeleteServerFarmSiloOptionalParams,
    ) => {
      const poller = deleteServerFarmSilo(context, resourceGroupName, name, siloName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteServerFarmSiloAndWait: async (
      resourceGroupName: string,
      name: string,
      siloName: string,
      options?: ServerFarmSiloResourcesDeleteServerFarmSiloOptionalParams,
    ) => {
      return await deleteServerFarmSilo(context, resourceGroupName, name, siloName, options);
    },
    updateServerFarmSilo: (
      resourceGroupName: string,
      name: string,
      siloName: string,
      properties: ServerFarmSiloTagsUpdate,
      options?: ServerFarmSiloResourcesUpdateServerFarmSiloOptionalParams,
    ) => updateServerFarmSilo(context, resourceGroupName, name, siloName, properties, options),
    createOrUpdateServerFarmSilo: (
      resourceGroupName: string,
      name: string,
      siloName: string,
      resource: ServerFarmSilo,
      options?: ServerFarmSiloResourcesCreateOrUpdateServerFarmSiloOptionalParams,
    ) =>
      createOrUpdateServerFarmSilo(context, resourceGroupName, name, siloName, resource, options),
    beginCreateOrUpdateServerFarmSilo: async (
      resourceGroupName: string,
      name: string,
      siloName: string,
      resource: ServerFarmSilo,
      options?: ServerFarmSiloResourcesCreateOrUpdateServerFarmSiloOptionalParams,
    ) => {
      const poller = createOrUpdateServerFarmSilo(
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
    beginCreateOrUpdateServerFarmSiloAndWait: async (
      resourceGroupName: string,
      name: string,
      siloName: string,
      resource: ServerFarmSilo,
      options?: ServerFarmSiloResourcesCreateOrUpdateServerFarmSiloOptionalParams,
    ) => {
      return await createOrUpdateServerFarmSilo(
        context,
        resourceGroupName,
        name,
        siloName,
        resource,
        options,
      );
    },
    getServerFarmSilo: (
      resourceGroupName: string,
      name: string,
      siloName: string,
      options?: ServerFarmSiloResourcesGetServerFarmSiloOptionalParams,
    ) => getServerFarmSilo(context, resourceGroupName, name, siloName, options),
    listServerFarmSilos: (
      resourceGroupName: string,
      name: string,
      options?: ServerFarmSiloResourcesListServerFarmSilosOptionalParams,
    ) => listServerFarmSilos(context, resourceGroupName, name, options),
  };
}

export function _getServerFarmSiloResourcesOperations(
  context: WebSiteManagementContext,
): ServerFarmSiloResourcesOperations {
  return {
    ..._getServerFarmSiloResources(context),
  };
}
