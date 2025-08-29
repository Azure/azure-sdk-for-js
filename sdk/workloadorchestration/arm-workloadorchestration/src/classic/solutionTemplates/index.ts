// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  removeVersion,
  createVersion,
  update,
  createOrUpdate,
  get,
} from "../../api/solutionTemplates/operations.js";
import {
  SolutionTemplatesListBySubscriptionOptionalParams,
  SolutionTemplatesListByResourceGroupOptionalParams,
  SolutionTemplatesDeleteOptionalParams,
  SolutionTemplatesRemoveVersionOptionalParams,
  SolutionTemplatesCreateVersionOptionalParams,
  SolutionTemplatesUpdateOptionalParams,
  SolutionTemplatesCreateOrUpdateOptionalParams,
  SolutionTemplatesGetOptionalParams,
} from "../../api/solutionTemplates/options.js";
import {
  VersionParameter,
  SolutionTemplateVersion,
  SolutionTemplate,
  SolutionTemplateUpdate,
  SolutionTemplateVersionWithUpdateType,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SolutionTemplates operations. */
export interface SolutionTemplatesOperations {
  /** List by subscription */
  listBySubscription: (
    options?: SolutionTemplatesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<SolutionTemplate>;
  /** List by specified resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SolutionTemplatesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SolutionTemplate>;
  /** Delete a Solution Template Resource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    solutionTemplateName: string,
    options?: SolutionTemplatesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Remove Solution Template Version Resource */
  removeVersion: (
    resourceGroupName: string,
    solutionTemplateName: string,
    body: VersionParameter,
    options?: SolutionTemplatesRemoveVersionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a Solution Template Version Resource */
  createVersion: (
    resourceGroupName: string,
    solutionTemplateName: string,
    body: SolutionTemplateVersionWithUpdateType,
    options?: SolutionTemplatesCreateVersionOptionalParams,
  ) => PollerLike<OperationState<SolutionTemplateVersion>, SolutionTemplateVersion>;
  /** update a Solution Template Resource */
  update: (
    resourceGroupName: string,
    solutionTemplateName: string,
    properties: SolutionTemplateUpdate,
    options?: SolutionTemplatesUpdateOptionalParams,
  ) => Promise<SolutionTemplate>;
  /** Create or update a Solution Template Resource */
  createOrUpdate: (
    resourceGroupName: string,
    solutionTemplateName: string,
    resource: SolutionTemplate,
    options?: SolutionTemplatesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SolutionTemplate>, SolutionTemplate>;
  /** Get a Solution Template Resource */
  get: (
    resourceGroupName: string,
    solutionTemplateName: string,
    options?: SolutionTemplatesGetOptionalParams,
  ) => Promise<SolutionTemplate>;
}

function _getSolutionTemplates(context: WorkloadOrchestrationManagementContext) {
  return {
    listBySubscription: (options?: SolutionTemplatesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SolutionTemplatesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      solutionTemplateName: string,
      options?: SolutionTemplatesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, solutionTemplateName, options),
    removeVersion: (
      resourceGroupName: string,
      solutionTemplateName: string,
      body: VersionParameter,
      options?: SolutionTemplatesRemoveVersionOptionalParams,
    ) => removeVersion(context, resourceGroupName, solutionTemplateName, body, options),
    createVersion: (
      resourceGroupName: string,
      solutionTemplateName: string,
      body: SolutionTemplateVersionWithUpdateType,
      options?: SolutionTemplatesCreateVersionOptionalParams,
    ) => createVersion(context, resourceGroupName, solutionTemplateName, body, options),
    update: (
      resourceGroupName: string,
      solutionTemplateName: string,
      properties: SolutionTemplateUpdate,
      options?: SolutionTemplatesUpdateOptionalParams,
    ) => update(context, resourceGroupName, solutionTemplateName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      solutionTemplateName: string,
      resource: SolutionTemplate,
      options?: SolutionTemplatesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, solutionTemplateName, resource, options),
    get: (
      resourceGroupName: string,
      solutionTemplateName: string,
      options?: SolutionTemplatesGetOptionalParams,
    ) => get(context, resourceGroupName, solutionTemplateName, options),
  };
}

export function _getSolutionTemplatesOperations(
  context: WorkloadOrchestrationManagementContext,
): SolutionTemplatesOperations {
  return {
    ..._getSolutionTemplates(context),
  };
}
