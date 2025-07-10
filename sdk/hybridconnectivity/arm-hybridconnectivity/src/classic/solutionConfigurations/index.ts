// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPIContext } from "../../api/hybridConnectivityManagementAPIContext.js";
import {
  SolutionConfiguration,
  SolutionConfigurationUpdate,
  OperationStatusResult,
} from "../../models/models.js";
import {
  SolutionConfigurationsSyncNowOptionalParams,
  SolutionConfigurationsListOptionalParams,
  SolutionConfigurationsDeleteOptionalParams,
  SolutionConfigurationsUpdateOptionalParams,
  SolutionConfigurationsCreateOrUpdateOptionalParams,
  SolutionConfigurationsGetOptionalParams,
} from "../../api/solutionConfigurations/options.js";
import {
  syncNow,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/solutionConfigurations/operations.js";
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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceUri: string,
    solutionConfiguration: string,
    options?: SolutionConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a SolutionConfiguration */
  update: (
    resourceUri: string,
    solutionConfiguration: string,
    properties: SolutionConfigurationUpdate,
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
    ) => syncNow(context, resourceUri, solutionConfiguration, options),
    list: (resourceUri: string, options?: SolutionConfigurationsListOptionalParams) =>
      list(context, resourceUri, options),
    delete: (
      resourceUri: string,
      solutionConfiguration: string,
      options?: SolutionConfigurationsDeleteOptionalParams,
    ) => $delete(context, resourceUri, solutionConfiguration, options),
    update: (
      resourceUri: string,
      solutionConfiguration: string,
      properties: SolutionConfigurationUpdate,
      options?: SolutionConfigurationsUpdateOptionalParams,
    ) => update(context, resourceUri, solutionConfiguration, properties, options),
    createOrUpdate: (
      resourceUri: string,
      solutionConfiguration: string,
      resource: SolutionConfiguration,
      options?: SolutionConfigurationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceUri, solutionConfiguration, resource, options),
    get: (
      resourceUri: string,
      solutionConfiguration: string,
      options?: SolutionConfigurationsGetOptionalParams,
    ) => get(context, resourceUri, solutionConfiguration, options),
  };
}

export function _getSolutionConfigurationsOperations(
  context: HybridConnectivityManagementAPIContext,
): SolutionConfigurationsOperations {
  return {
    ..._getSolutionConfigurations(context),
  };
}
