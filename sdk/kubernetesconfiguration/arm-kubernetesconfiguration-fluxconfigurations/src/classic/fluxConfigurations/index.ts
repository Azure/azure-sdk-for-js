// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FluxConfigurationContext } from "../../api/fluxConfigurationContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/fluxConfigurations/operations.js";
import type {
  FluxConfigurationsListOptionalParams,
  FluxConfigurationsDeleteOptionalParams,
  FluxConfigurationsUpdateOptionalParams,
  FluxConfigurationsCreateOrUpdateOptionalParams,
  FluxConfigurationsGetOptionalParams,
} from "../../api/fluxConfigurations/options.js";
import type { FluxConfiguration, FluxConfigurationPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FluxConfigurations operations. */
export interface FluxConfigurationsOperations {
  /** List all Flux Configurations. */
  list: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    options?: FluxConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<FluxConfiguration>;
  /** This will delete the YAML file used to set up the Flux Configuration, thus stopping future sync from the source repo. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    fluxConfigurationName: string,
    options?: FluxConfigurationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    fluxConfigurationName: string,
    options?: FluxConfigurationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    fluxConfigurationName: string,
    options?: FluxConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an existing Kubernetes Flux Configuration. */
  update: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    fluxConfigurationName: string,
    fluxConfigurationPatch: FluxConfigurationPatch,
    options?: FluxConfigurationsUpdateOptionalParams,
  ) => PollerLike<OperationState<FluxConfiguration>, FluxConfiguration>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    fluxConfigurationName: string,
    fluxConfigurationPatch: FluxConfigurationPatch,
    options?: FluxConfigurationsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FluxConfiguration>, FluxConfiguration>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    fluxConfigurationName: string,
    fluxConfigurationPatch: FluxConfigurationPatch,
    options?: FluxConfigurationsUpdateOptionalParams,
  ) => Promise<FluxConfiguration>;
  /** Create a new Kubernetes Flux Configuration. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    fluxConfigurationName: string,
    fluxConfiguration: FluxConfiguration,
    options?: FluxConfigurationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FluxConfiguration>, FluxConfiguration>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    fluxConfigurationName: string,
    fluxConfiguration: FluxConfiguration,
    options?: FluxConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FluxConfiguration>, FluxConfiguration>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    fluxConfigurationName: string,
    fluxConfiguration: FluxConfiguration,
    options?: FluxConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<FluxConfiguration>;
  /** Gets details of the Flux Configuration. */
  get: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    fluxConfigurationName: string,
    options?: FluxConfigurationsGetOptionalParams,
  ) => Promise<FluxConfiguration>;
}

function _getFluxConfigurations(context: FluxConfigurationContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      options?: FluxConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, clusterRp, clusterResourceName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      fluxConfigurationName: string,
      options?: FluxConfigurationsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        fluxConfigurationName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      fluxConfigurationName: string,
      options?: FluxConfigurationsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        fluxConfigurationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      fluxConfigurationName: string,
      options?: FluxConfigurationsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        fluxConfigurationName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      fluxConfigurationName: string,
      fluxConfigurationPatch: FluxConfigurationPatch,
      options?: FluxConfigurationsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        fluxConfigurationName,
        fluxConfigurationPatch,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      fluxConfigurationName: string,
      fluxConfigurationPatch: FluxConfigurationPatch,
      options?: FluxConfigurationsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        fluxConfigurationName,
        fluxConfigurationPatch,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      fluxConfigurationName: string,
      fluxConfigurationPatch: FluxConfigurationPatch,
      options?: FluxConfigurationsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        fluxConfigurationName,
        fluxConfigurationPatch,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      fluxConfigurationName: string,
      fluxConfiguration: FluxConfiguration,
      options?: FluxConfigurationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        fluxConfigurationName,
        fluxConfiguration,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      fluxConfigurationName: string,
      fluxConfiguration: FluxConfiguration,
      options?: FluxConfigurationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        fluxConfigurationName,
        fluxConfiguration,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      fluxConfigurationName: string,
      fluxConfiguration: FluxConfiguration,
      options?: FluxConfigurationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        fluxConfigurationName,
        fluxConfiguration,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      fluxConfigurationName: string,
      options?: FluxConfigurationsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        fluxConfigurationName,
        options,
      ),
  };
}

export function _getFluxConfigurationsOperations(
  context: FluxConfigurationContext,
): FluxConfigurationsOperations {
  return {
    ..._getFluxConfigurations(context),
  };
}
