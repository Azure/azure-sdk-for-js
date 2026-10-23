// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  bulkReviewSolution,
  bulkPublishSolution,
  bulkDeploySolution,
  listBySolutionTemplate,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/solutionTemplateVersions/operations.js";
import type {
  SolutionTemplateVersionsBulkReviewSolutionOptionalParams,
  SolutionTemplateVersionsBulkPublishSolutionOptionalParams,
  SolutionTemplateVersionsBulkDeploySolutionOptionalParams,
  SolutionTemplateVersionsListBySolutionTemplateOptionalParams,
  SolutionTemplateVersionsDeleteOptionalParams,
  SolutionTemplateVersionsUpdateOptionalParams,
  SolutionTemplateVersionsCreateOrUpdateOptionalParams,
  SolutionTemplateVersionsGetOptionalParams,
} from "../../api/solutionTemplateVersions/options.js";
import type {
  SolutionTemplateVersion,
  BulkDeploySolutionParameter,
  BulkPublishSolutionParameter,
  BulkReviewSolutionParameter,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SolutionTemplateVersions operations. */
export interface SolutionTemplateVersionsOperations {
  /** Post request for bulk review */
  bulkReviewSolution: (
    resourceGroupName: string,
    solutionTemplateName: string,
    solutionTemplateVersionName: string,
    body: BulkReviewSolutionParameter,
    options?: SolutionTemplateVersionsBulkReviewSolutionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Post request for bulk publish */
  bulkPublishSolution: (
    resourceGroupName: string,
    solutionTemplateName: string,
    solutionTemplateVersionName: string,
    body: BulkPublishSolutionParameter,
    options?: SolutionTemplateVersionsBulkPublishSolutionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Post request for bulk deploy */
  bulkDeploySolution: (
    resourceGroupName: string,
    solutionTemplateName: string,
    solutionTemplateVersionName: string,
    body: BulkDeploySolutionParameter,
    options?: SolutionTemplateVersionsBulkDeploySolutionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List Solution Template Version Resources */
  listBySolutionTemplate: (
    resourceGroupName: string,
    solutionTemplateName: string,
    options?: SolutionTemplateVersionsListBySolutionTemplateOptionalParams,
  ) => PagedAsyncIterableIterator<SolutionTemplateVersion>;
  /** Delete a Solution Template Version Resource */
  delete: (
    resourceGroupName: string,
    solutionTemplateName: string,
    solutionTemplateVersionName: string,
    options?: SolutionTemplateVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Solution Template Version Resource */
  update: (
    resourceGroupName: string,
    solutionTemplateName: string,
    solutionTemplateVersionName: string,
    properties: SolutionTemplateVersion,
    options?: SolutionTemplateVersionsUpdateOptionalParams,
  ) => Promise<SolutionTemplateVersion>;
  /** Create or update a Solution Template Version Resource */
  createOrUpdate: (
    resourceGroupName: string,
    solutionTemplateName: string,
    solutionTemplateVersionName: string,
    resource: SolutionTemplateVersion,
    options?: SolutionTemplateVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SolutionTemplateVersion>, SolutionTemplateVersion>;
  /** Get a Solution Template Version Resource */
  get: (
    resourceGroupName: string,
    solutionTemplateName: string,
    solutionTemplateVersionName: string,
    options?: SolutionTemplateVersionsGetOptionalParams,
  ) => Promise<SolutionTemplateVersion>;
}

function _getSolutionTemplateVersions(context: WorkloadOrchestrationManagementContext) {
  return {
    bulkReviewSolution: (
      resourceGroupName: string,
      solutionTemplateName: string,
      solutionTemplateVersionName: string,
      body: BulkReviewSolutionParameter,
      options?: SolutionTemplateVersionsBulkReviewSolutionOptionalParams,
    ) =>
      bulkReviewSolution(
        context,
        resourceGroupName,
        solutionTemplateName,
        solutionTemplateVersionName,
        body,
        options,
      ),
    bulkPublishSolution: (
      resourceGroupName: string,
      solutionTemplateName: string,
      solutionTemplateVersionName: string,
      body: BulkPublishSolutionParameter,
      options?: SolutionTemplateVersionsBulkPublishSolutionOptionalParams,
    ) =>
      bulkPublishSolution(
        context,
        resourceGroupName,
        solutionTemplateName,
        solutionTemplateVersionName,
        body,
        options,
      ),
    bulkDeploySolution: (
      resourceGroupName: string,
      solutionTemplateName: string,
      solutionTemplateVersionName: string,
      body: BulkDeploySolutionParameter,
      options?: SolutionTemplateVersionsBulkDeploySolutionOptionalParams,
    ) =>
      bulkDeploySolution(
        context,
        resourceGroupName,
        solutionTemplateName,
        solutionTemplateVersionName,
        body,
        options,
      ),
    listBySolutionTemplate: (
      resourceGroupName: string,
      solutionTemplateName: string,
      options?: SolutionTemplateVersionsListBySolutionTemplateOptionalParams,
    ) => listBySolutionTemplate(context, resourceGroupName, solutionTemplateName, options),
    delete: (
      resourceGroupName: string,
      solutionTemplateName: string,
      solutionTemplateVersionName: string,
      options?: SolutionTemplateVersionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        solutionTemplateName,
        solutionTemplateVersionName,
        options,
      ),
    update: (
      resourceGroupName: string,
      solutionTemplateName: string,
      solutionTemplateVersionName: string,
      properties: SolutionTemplateVersion,
      options?: SolutionTemplateVersionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        solutionTemplateName,
        solutionTemplateVersionName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      solutionTemplateName: string,
      solutionTemplateVersionName: string,
      resource: SolutionTemplateVersion,
      options?: SolutionTemplateVersionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        solutionTemplateName,
        solutionTemplateVersionName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      solutionTemplateName: string,
      solutionTemplateVersionName: string,
      options?: SolutionTemplateVersionsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, solutionTemplateName, solutionTemplateVersionName, options),
  };
}

export function _getSolutionTemplateVersionsOperations(
  context: WorkloadOrchestrationManagementContext,
): SolutionTemplateVersionsOperations {
  return {
    ..._getSolutionTemplateVersions(context),
  };
}
