// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  updateExternalValidationStatus,
  publishSolutionVersion,
  reviewSolutionVersion,
  resolveConfiguration,
  removeRevision,
  uninstallSolution,
  installSolution,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/targets/operations.js";
import {
  TargetsUpdateExternalValidationStatusOptionalParams,
  TargetsPublishSolutionVersionOptionalParams,
  TargetsReviewSolutionVersionOptionalParams,
  TargetsResolveConfigurationOptionalParams,
  TargetsRemoveRevisionOptionalParams,
  TargetsUninstallSolutionOptionalParams,
  TargetsInstallSolutionOptionalParams,
  TargetsListBySubscriptionOptionalParams,
  TargetsListByResourceGroupOptionalParams,
  TargetsDeleteOptionalParams,
  TargetsUpdateOptionalParams,
  TargetsCreateOrUpdateOptionalParams,
  TargetsGetOptionalParams,
} from "../../api/targets/options.js";
import {
  SolutionVersion,
  InstallSolutionParameter,
  Target,
  TargetUpdate,
  UninstallSolutionParameter,
  RemoveRevisionParameter,
  SolutionTemplateParameter,
  ResolvedConfiguration,
  SolutionVersionParameter,
  UpdateExternalValidationStatusParameter,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Targets operations. */
export interface TargetsOperations {
  /** Post request to update external validation status */
  updateExternalValidationStatus: (
    resourceGroupName: string,
    targetName: string,
    body: UpdateExternalValidationStatusParameter,
    options?: TargetsUpdateExternalValidationStatusOptionalParams,
  ) => PollerLike<OperationState<SolutionVersion>, SolutionVersion>;
  /** Post request to publish */
  publishSolutionVersion: (
    resourceGroupName: string,
    targetName: string,
    body: SolutionVersionParameter,
    options?: TargetsPublishSolutionVersionOptionalParams,
  ) => PollerLike<OperationState<SolutionVersion>, SolutionVersion>;
  /** Post request to review configuration */
  reviewSolutionVersion: (
    resourceGroupName: string,
    targetName: string,
    body: SolutionTemplateParameter,
    options?: TargetsReviewSolutionVersionOptionalParams,
  ) => PollerLike<OperationState<SolutionVersion>, SolutionVersion>;
  /** Post request to resolve configuration */
  resolveConfiguration: (
    resourceGroupName: string,
    targetName: string,
    body: SolutionTemplateParameter,
    options?: TargetsResolveConfigurationOptionalParams,
  ) => PollerLike<OperationState<ResolvedConfiguration>, ResolvedConfiguration>;
  /** Post request to remove solution version revision */
  removeRevision: (
    resourceGroupName: string,
    targetName: string,
    body: RemoveRevisionParameter,
    options?: TargetsRemoveRevisionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Post request to uninstall */
  uninstallSolution: (
    resourceGroupName: string,
    targetName: string,
    body: UninstallSolutionParameter,
    options?: TargetsUninstallSolutionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Post request to deploy */
  installSolution: (
    resourceGroupName: string,
    targetName: string,
    body: InstallSolutionParameter,
    options?: TargetsInstallSolutionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List by subscription */
  listBySubscription: (
    options?: TargetsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Target>;
  /** List by specified resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: TargetsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Target>;
  /** Delete a Target Resource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    targetName: string,
    options?: TargetsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** update a Target Resource */
  update: (
    resourceGroupName: string,
    targetName: string,
    properties: TargetUpdate,
    options?: TargetsUpdateOptionalParams,
  ) => PollerLike<OperationState<Target>, Target>;
  /** Create or update a Target Resource */
  createOrUpdate: (
    resourceGroupName: string,
    targetName: string,
    resource: Target,
    options?: TargetsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Target>, Target>;
  /** Get a Target Resource */
  get: (
    resourceGroupName: string,
    targetName: string,
    options?: TargetsGetOptionalParams,
  ) => Promise<Target>;
}

function _getTargets(context: WorkloadOrchestrationManagementContext) {
  return {
    updateExternalValidationStatus: (
      resourceGroupName: string,
      targetName: string,
      body: UpdateExternalValidationStatusParameter,
      options?: TargetsUpdateExternalValidationStatusOptionalParams,
    ) => updateExternalValidationStatus(context, resourceGroupName, targetName, body, options),
    publishSolutionVersion: (
      resourceGroupName: string,
      targetName: string,
      body: SolutionVersionParameter,
      options?: TargetsPublishSolutionVersionOptionalParams,
    ) => publishSolutionVersion(context, resourceGroupName, targetName, body, options),
    reviewSolutionVersion: (
      resourceGroupName: string,
      targetName: string,
      body: SolutionTemplateParameter,
      options?: TargetsReviewSolutionVersionOptionalParams,
    ) => reviewSolutionVersion(context, resourceGroupName, targetName, body, options),
    resolveConfiguration: (
      resourceGroupName: string,
      targetName: string,
      body: SolutionTemplateParameter,
      options?: TargetsResolveConfigurationOptionalParams,
    ) => resolveConfiguration(context, resourceGroupName, targetName, body, options),
    removeRevision: (
      resourceGroupName: string,
      targetName: string,
      body: RemoveRevisionParameter,
      options?: TargetsRemoveRevisionOptionalParams,
    ) => removeRevision(context, resourceGroupName, targetName, body, options),
    uninstallSolution: (
      resourceGroupName: string,
      targetName: string,
      body: UninstallSolutionParameter,
      options?: TargetsUninstallSolutionOptionalParams,
    ) => uninstallSolution(context, resourceGroupName, targetName, body, options),
    installSolution: (
      resourceGroupName: string,
      targetName: string,
      body: InstallSolutionParameter,
      options?: TargetsInstallSolutionOptionalParams,
    ) => installSolution(context, resourceGroupName, targetName, body, options),
    listBySubscription: (options?: TargetsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: TargetsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      targetName: string,
      options?: TargetsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, targetName, options),
    update: (
      resourceGroupName: string,
      targetName: string,
      properties: TargetUpdate,
      options?: TargetsUpdateOptionalParams,
    ) => update(context, resourceGroupName, targetName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      targetName: string,
      resource: Target,
      options?: TargetsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, targetName, resource, options),
    get: (resourceGroupName: string, targetName: string, options?: TargetsGetOptionalParams) =>
      get(context, resourceGroupName, targetName, options),
  };
}

export function _getTargetsOperations(
  context: WorkloadOrchestrationManagementContext,
): TargetsOperations {
  return {
    ..._getTargets(context),
  };
}
