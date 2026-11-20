// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MigrateContext } from "../../api/migrateContext.js";
import {
  downloadUrl,
  $delete,
  listByParent,
  get,
  create,
} from "../../api/containerAppsAssessmentOperations/operations.js";
import type {
  ContainerAppsAssessmentOperationsDownloadUrlOptionalParams,
  ContainerAppsAssessmentOperationsDeleteOptionalParams,
  ContainerAppsAssessmentOperationsListByParentOptionalParams,
  ContainerAppsAssessmentOperationsGetOptionalParams,
  ContainerAppsAssessmentOperationsCreateOptionalParams,
} from "../../api/containerAppsAssessmentOperations/options.js";
import type { ContainerAppsAssessment, DownloadUrl } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ContainerAppsAssessmentOperations operations. */
export interface ContainerAppsAssessmentOperationsOperations {
  /** Get URL for downloading Azure Container Apps Assessment Report. */
  downloadUrl: (
    resourceGroupName: string,
    projectName: string,
    assessmentName: string,
    options?: ContainerAppsAssessmentOperationsDownloadUrlOptionalParams,
  ) => PollerLike<OperationState<DownloadUrl>, DownloadUrl>;
  /** Delete a ContainerAppsAssessment */
  delete: (
    resourceGroupName: string,
    projectName: string,
    assessmentName: string,
    options?: ContainerAppsAssessmentOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** List ContainerAppsAssessment resources by AssessmentProject */
  listByParent: (
    resourceGroupName: string,
    projectName: string,
    options?: ContainerAppsAssessmentOperationsListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<ContainerAppsAssessment>;
  /** Get a ContainerAppsAssessment */
  get: (
    resourceGroupName: string,
    projectName: string,
    assessmentName: string,
    options?: ContainerAppsAssessmentOperationsGetOptionalParams,
  ) => Promise<ContainerAppsAssessment>;
  /** Create a ContainerAppsAssessment */
  create: (
    resourceGroupName: string,
    projectName: string,
    assessmentName: string,
    resource: ContainerAppsAssessment,
    options?: ContainerAppsAssessmentOperationsCreateOptionalParams,
  ) => PollerLike<OperationState<ContainerAppsAssessment>, ContainerAppsAssessment>;
}

function _getContainerAppsAssessmentOperations(context: MigrateContext) {
  return {
    downloadUrl: (
      resourceGroupName: string,
      projectName: string,
      assessmentName: string,
      options?: ContainerAppsAssessmentOperationsDownloadUrlOptionalParams,
    ) => downloadUrl(context, resourceGroupName, projectName, assessmentName, options),
    delete: (
      resourceGroupName: string,
      projectName: string,
      assessmentName: string,
      options?: ContainerAppsAssessmentOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, projectName, assessmentName, options),
    listByParent: (
      resourceGroupName: string,
      projectName: string,
      options?: ContainerAppsAssessmentOperationsListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, projectName, options),
    get: (
      resourceGroupName: string,
      projectName: string,
      assessmentName: string,
      options?: ContainerAppsAssessmentOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, projectName, assessmentName, options),
    create: (
      resourceGroupName: string,
      projectName: string,
      assessmentName: string,
      resource: ContainerAppsAssessment,
      options?: ContainerAppsAssessmentOperationsCreateOptionalParams,
    ) => create(context, resourceGroupName, projectName, assessmentName, resource, options),
  };
}

export function _getContainerAppsAssessmentOperationsOperations(
  context: MigrateContext,
): ContainerAppsAssessmentOperationsOperations {
  return {
    ..._getContainerAppsAssessmentOperations(context),
  };
}
