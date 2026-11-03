// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NginxManagementContext } from "../../api/nginxManagementContext.js";
import {
  analysis,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/configurations/operations.js";
import type {
  ConfigurationsAnalysisOptionalParams,
  ConfigurationsListOptionalParams,
  ConfigurationsDeleteOptionalParams,
  ConfigurationsCreateOrUpdateOptionalParams,
  ConfigurationsGetOptionalParams,
} from "../../api/configurations/options.js";
import type { NginxConfiguration, AnalysisResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Configurations operations. */
export interface ConfigurationsOperations {
  /** Analyze an NGINX configuration without applying it to the NGINXaaS deployment */
  analysis: (
    resourceGroupName: string,
    deploymentName: string,
    configurationName: string,
    options?: ConfigurationsAnalysisOptionalParams,
  ) => Promise<AnalysisResult>;
  /** List the NGINX configuration of given NGINX deployment. */
  list: (
    resourceGroupName: string,
    deploymentName: string,
    options?: ConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<NginxConfiguration>;
  /** Reset the NGINX configuration of given NGINX deployment to default */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    deploymentName: string,
    configurationName: string,
    options?: ConfigurationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    deploymentName: string,
    configurationName: string,
    options?: ConfigurationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    deploymentName: string,
    configurationName: string,
    options?: ConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update the NGINX configuration for given NGINX deployment */
  createOrUpdate: (
    resourceGroupName: string,
    deploymentName: string,
    configurationName: string,
    options?: ConfigurationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NginxConfiguration>, NginxConfiguration>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    deploymentName: string,
    configurationName: string,
    options?: ConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NginxConfiguration>, NginxConfiguration>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    deploymentName: string,
    configurationName: string,
    options?: ConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<NginxConfiguration>;
  /** Get the NGINX configuration of given NGINX deployment */
  get: (
    resourceGroupName: string,
    deploymentName: string,
    configurationName: string,
    options?: ConfigurationsGetOptionalParams,
  ) => Promise<NginxConfiguration>;
}

function _getConfigurations(context: NginxManagementContext) {
  return {
    analysis: (
      resourceGroupName: string,
      deploymentName: string,
      configurationName: string,
      options?: ConfigurationsAnalysisOptionalParams,
    ) => analysis(context, resourceGroupName, deploymentName, configurationName, options),
    list: (
      resourceGroupName: string,
      deploymentName: string,
      options?: ConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, deploymentName, options),
    delete: (
      resourceGroupName: string,
      deploymentName: string,
      configurationName: string,
      options?: ConfigurationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, deploymentName, configurationName, options),
    beginDelete: async (
      resourceGroupName: string,
      deploymentName: string,
      configurationName: string,
      options?: ConfigurationsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        deploymentName,
        configurationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      deploymentName: string,
      configurationName: string,
      options?: ConfigurationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, deploymentName, configurationName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      deploymentName: string,
      configurationName: string,
      options?: ConfigurationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, deploymentName, configurationName, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      deploymentName: string,
      configurationName: string,
      options?: ConfigurationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        deploymentName,
        configurationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      deploymentName: string,
      configurationName: string,
      options?: ConfigurationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        deploymentName,
        configurationName,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      deploymentName: string,
      configurationName: string,
      options?: ConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, deploymentName, configurationName, options),
  };
}

export function _getConfigurationsOperations(
  context: NginxManagementContext,
): ConfigurationsOperations {
  return {
    ..._getConfigurations(context),
  };
}
