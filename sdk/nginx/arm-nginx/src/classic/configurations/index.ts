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
import type { NginxConfigurationResponse, AnalysisResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
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
  ) => PagedAsyncIterableIterator<NginxConfigurationResponse>;
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
  /** Create or update the NGINX configuration for given NGINX deployment */
  createOrUpdate: (
    resourceGroupName: string,
    deploymentName: string,
    configurationName: string,
    options?: ConfigurationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NginxConfigurationResponse>, NginxConfigurationResponse>;
  /** Get the NGINX configuration of given NGINX deployment */
  get: (
    resourceGroupName: string,
    deploymentName: string,
    configurationName: string,
    options?: ConfigurationsGetOptionalParams,
  ) => Promise<NginxConfigurationResponse>;
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
    createOrUpdate: (
      resourceGroupName: string,
      deploymentName: string,
      configurationName: string,
      options?: ConfigurationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, deploymentName, configurationName, options),
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
