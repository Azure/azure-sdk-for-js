// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPIContext } from "../../api/hybridConnectivityManagementAPIContext.js";
import {
  SolutionConfigurationsSyncNowOptionalParams,
  SolutionConfigurationsListOptionalParams,
  SolutionConfigurationsDeleteOptionalParams,
  SolutionConfigurationsUpdateOptionalParams,
  SolutionConfigurationsCreateOrUpdateOptionalParams,
  SolutionConfigurationsGetOptionalParams,
} from "../../api/options.js";
import {
  solutionConfigurationsSyncNow,
  solutionConfigurationsList,
  solutionConfigurationsDelete,
  solutionConfigurationsUpdate,
  solutionConfigurationsCreateOrUpdate,
  solutionConfigurationsGet,
} from "../../api/solutionConfigurations/index.js";
import { SolutionConfiguration, OperationStatusResult } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SolutionConfigurations operations. */
export interface SolutionConfigurationsOperations {
  /** Trigger immediate sync with source cloud */
  syncNow: (
    resourceUri: string,
    solutionConfiguration: string,
    options?: SolutionConfigurationsSyncNowOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** List SolutionConfiguration resources by parent */
  list: (
    resourceUri: string,
    options?: SolutionConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<SolutionConfiguration>;
  /** Delete a SolutionConfiguration */
  delete: (
    resourceUri: string,
    solutionConfiguration: string,
    options?: SolutionConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a SolutionConfiguration */
  update: (
    resourceUri: string,
    solutionConfiguration: string,
    properties: SolutionConfiguration,
    options?: SolutionConfigurationsUpdateOptionalParams,
  ) => Promise<SolutionConfiguration>;
  /** Create a SolutionConfiguration */
  createOrUpdate: (
    resourceUri: string,
    solutionConfiguration: string,
    resource: SolutionConfiguration,
    options?: SolutionConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<SolutionConfiguration>;
  /** Get a SolutionConfiguration */
  get: (
    resourceUri: string,
    solutionConfiguration: string,
    options?: SolutionConfigurationsGetOptionalParams,
  ) => Promise<SolutionConfiguration>;
}

function _getSolutionConfigurations(context: HybridConnectivityManagementAPIContext) {
  return {
    syncNow: (
      resourceUri: string,
      solutionConfiguration: string,
      options?: SolutionConfigurationsSyncNowOptionalParams,
    ) => solutionConfigurationsSyncNow(context, resourceUri, solutionConfiguration, options),
    list: (resourceUri: string, options?: SolutionConfigurationsListOptionalParams) =>
      solutionConfigurationsList(context, resourceUri, options),
    delete: (
      resourceUri: string,
      solutionConfiguration: string,
      options?: SolutionConfigurationsDeleteOptionalParams,
    ) => solutionConfigurationsDelete(context, resourceUri, solutionConfiguration, options),
    update: (
      resourceUri: string,
      solutionConfiguration: string,
      properties: SolutionConfiguration,
      options?: SolutionConfigurationsUpdateOptionalParams,
    ) =>
      solutionConfigurationsUpdate(
        context,
        resourceUri,
        solutionConfiguration,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceUri: string,
      solutionConfiguration: string,
      resource: SolutionConfiguration,
      options?: SolutionConfigurationsCreateOrUpdateOptionalParams,
    ) =>
      solutionConfigurationsCreateOrUpdate(
        context,
        resourceUri,
        solutionConfiguration,
        resource,
        options,
      ),
    get: (
      resourceUri: string,
      solutionConfiguration: string,
      options?: SolutionConfigurationsGetOptionalParams,
    ) => solutionConfigurationsGet(context, resourceUri, solutionConfiguration, options),
  };
}

export function _getSolutionConfigurationsOperations(
  context: HybridConnectivityManagementAPIContext,
): SolutionConfigurationsOperations {
  return {
    ..._getSolutionConfigurations(context),
  };
}
