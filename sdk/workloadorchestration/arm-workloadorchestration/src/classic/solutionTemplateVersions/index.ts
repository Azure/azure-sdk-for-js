// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  bulkPublishSolution,
  bulkDeploySolution,
  listBySolutionTemplate,
  get,
} from "../../api/solutionTemplateVersions/operations.js";
import {
  SolutionTemplateVersionsBulkPublishSolutionOptionalParams,
  SolutionTemplateVersionsBulkDeploySolutionOptionalParams,
  SolutionTemplateVersionsListBySolutionTemplateOptionalParams,
  SolutionTemplateVersionsGetOptionalParams,
} from "../../api/solutionTemplateVersions/options.js";
import {
  SolutionTemplateVersion,
  BulkDeploySolutionParameter,
  BulkPublishSolutionParameter,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SolutionTemplateVersions operations. */
export interface SolutionTemplateVersionsOperations {
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
