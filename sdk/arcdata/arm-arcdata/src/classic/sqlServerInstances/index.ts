// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureArcDataContext } from "../../api/azureArcDataContext.js";
import {
  getAllAvailabilityGroups,
  runManagedInstanceLinkAssessment,
  postUpgrade,
  preUpgrade,
  getJobs,
  getJobsStatus,
  runMigrationReadinessAssessment,
  runBestPracticeAssessment,
  runBestPracticesAssessment,
  getMigrationReadinessReport,
  getTargetRecommendationReports,
  runTargetRecommendationJob,
  runMigrationAssessment,
  getBestPracticesAssessment,
  getTelemetry,
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/sqlServerInstances/operations.js";
import type {
  SqlServerInstancesGetAllAvailabilityGroupsOptionalParams,
  SqlServerInstancesRunManagedInstanceLinkAssessmentOptionalParams,
  SqlServerInstancesPostUpgradeOptionalParams,
  SqlServerInstancesPreUpgradeOptionalParams,
  SqlServerInstancesGetJobsOptionalParams,
  SqlServerInstancesGetJobsStatusOptionalParams,
  SqlServerInstancesRunMigrationReadinessAssessmentOptionalParams,
  SqlServerInstancesRunBestPracticeAssessmentOptionalParams,
  SqlServerInstancesRunBestPracticesAssessmentOptionalParams,
  SqlServerInstancesGetMigrationReadinessReportOptionalParams,
  SqlServerInstancesGetTargetRecommendationReportsOptionalParams,
  SqlServerInstancesRunTargetRecommendationJobOptionalParams,
  SqlServerInstancesRunMigrationAssessmentOptionalParams,
  SqlServerInstancesGetBestPracticesAssessmentOptionalParams,
  SqlServerInstancesGetTelemetryOptionalParams,
  SqlServerInstancesListOptionalParams,
  SqlServerInstancesListByResourceGroupOptionalParams,
  SqlServerInstancesDeleteOptionalParams,
  SqlServerInstancesUpdateOptionalParams,
  SqlServerInstancesCreateOptionalParams,
  SqlServerInstancesGetOptionalParams,
} from "../../api/sqlServerInstances/options.js";
import type {
  SqlServerInstance,
  SqlServerInstanceUpdate,
  SqlServerInstanceTelemetryRequest,
  SqlServerInstanceBpaRequest,
  SqlServerInstanceRunMigrationAssessmentResponse,
  SqlServerInstanceRunTargetRecommendationJobResponse,
  SqlServerInstanceTargetRecommendationReportsResponse,
  SqlServerInstanceMigrationReadinessReportResponse,
  SqlServerInstanceRunBestPracticesAssessmentResponse,
  SqlServerInstanceRunMigrationReadinessAssessmentResponse,
  SqlServerInstanceJobsStatusResponse,
  SqlServerInstanceJobsResponse,
  SqlServerInstanceManagedInstanceLinkAssessmentRequest,
  SqlServerInstanceManagedInstanceLinkAssessmentResponse,
  SqlServerAvailabilityGroupResource,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SqlServerInstances operations. */
export interface SqlServerInstancesOperations {
  /** Retrieves full properties of all the Availability Groups in a SQL Server instance. */
  getAllAvailabilityGroups: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    options?: SqlServerInstancesGetAllAvailabilityGroupsOptionalParams,
  ) => PagedAsyncIterableIterator<SqlServerAvailabilityGroupResource>;
  /** Runs Managed Instance Link assessment for SQL Server instance */
  runManagedInstanceLinkAssessment: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    sqlServerInstanceManagedInstanceLinkAssessmentRequest: SqlServerInstanceManagedInstanceLinkAssessmentRequest,
    options?: SqlServerInstancesRunManagedInstanceLinkAssessmentOptionalParams,
  ) => PollerLike<
    OperationState<SqlServerInstanceManagedInstanceLinkAssessmentResponse>,
    SqlServerInstanceManagedInstanceLinkAssessmentResponse
  >;
  /** Clean up after upgrading. */
  postUpgrade: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    options?: SqlServerInstancesPostUpgradeOptionalParams,
  ) => Promise<SqlServerInstance>;
  /** Request Upgrade Permission before upgrading. */
  preUpgrade: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    options?: SqlServerInstancesPreUpgradeOptionalParams,
  ) => Promise<SqlServerInstance>;
  /** Gets job details for sql arc resource asynchronously */
  getJobs: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    options?: SqlServerInstancesGetJobsOptionalParams,
  ) => PollerLike<OperationState<SqlServerInstanceJobsResponse>, SqlServerInstanceJobsResponse>;
  /** Gets jobs status details for sql arc resource */
  getJobsStatus: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    options?: SqlServerInstancesGetJobsStatusOptionalParams,
  ) => Promise<SqlServerInstanceJobsStatusResponse>;
  /** The request to run migration readiness assessment asynchronously. */
  runMigrationReadinessAssessment: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    options?: SqlServerInstancesRunMigrationReadinessAssessmentOptionalParams,
  ) => PollerLike<
    OperationState<SqlServerInstanceRunMigrationReadinessAssessmentResponse>,
    SqlServerInstanceRunMigrationReadinessAssessmentResponse
  >;
  /** The request to run SQL best practices assessment asynchronously. */
  runBestPracticeAssessment: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    options?: SqlServerInstancesRunBestPracticeAssessmentOptionalParams,
  ) => PollerLike<
    OperationState<SqlServerInstanceRunBestPracticesAssessmentResponse>,
    SqlServerInstanceRunBestPracticesAssessmentResponse
  >;
  /** The request to run SQL best practices assessment. */
  runBestPracticesAssessment: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    options?: SqlServerInstancesRunBestPracticesAssessmentOptionalParams,
  ) => Promise<SqlServerInstanceRunBestPracticesAssessmentResponse>;
  /** Retrieves the migration readiness report for the SQL Server instance. The report contains an assessment of the instance's readiness for migration to Azure SQL targets. */
  getMigrationReadinessReport: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    options?: SqlServerInstancesGetMigrationReadinessReportOptionalParams,
  ) => PollerLike<
    OperationState<SqlServerInstanceMigrationReadinessReportResponse>,
    SqlServerInstanceMigrationReadinessReportResponse
  >;
  /** Retrieves the current job status and the latest target recommendation report for the SQL Server instance. The response always includes the jobStatus field, which indicates the state of the most recent target recommendation job (NotStarted, InProgress, Succeeded, or Failed). The report data is included in the response only when the jobStatus is Succeeded. A target recommendation job must be started using the RunTargetRecommendationJob API before calling this API. Only the most recent report is returned. If the report contains more sections than can be returned in a single response, use the nextReportOffset and nextSectionOffset values from the response to retrieve the remaining data. */
  getTargetRecommendationReports: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    options?: SqlServerInstancesGetTargetRecommendationReportsOptionalParams,
  ) => PollerLike<
    OperationState<SqlServerInstanceTargetRecommendationReportsResponse>,
    SqlServerInstanceTargetRecommendationReportsResponse
  >;
  /** Starts a target recommendation job for the SQL Server instance. Only one job can run at a time. If the previous job is in a non-terminal state (NotStarted or InProgress), calling this operation again returns the existing job status without creating a new job. A new job is created only when the previous job has reached a terminal state (Succeeded or Failed). This operation does not return recommendations directly. Use the GetTargetRecommendationReports API to check the job status and retrieve the target recommendation report if the jobStatus is Succeeded. */
  runTargetRecommendationJob: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    options?: SqlServerInstancesRunTargetRecommendationJobOptionalParams,
  ) => PollerLike<
    OperationState<SqlServerInstanceRunTargetRecommendationJobResponse>,
    SqlServerInstanceRunTargetRecommendationJobResponse
  >;
  /** Runs migration assessment for SQL Server instance */
  runMigrationAssessment: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    options?: SqlServerInstancesRunMigrationAssessmentOptionalParams,
  ) => Promise<SqlServerInstanceRunMigrationAssessmentResponse>;
  /** Retrieves SQL best practices assessment results for the SQL Server instance. */
  getBestPracticesAssessment: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    sqlServerInstanceBpaRequest: SqlServerInstanceBpaRequest,
    options?: SqlServerInstancesGetBestPracticesAssessmentOptionalParams,
  ) => PagedAsyncIterableIterator<string[]>;
  /** Retrieves SQL Server instance telemetry */
  getTelemetry: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    sqlServerInstanceTelemetryRequest: SqlServerInstanceTelemetryRequest,
    options?: SqlServerInstancesGetTelemetryOptionalParams,
  ) => PagedAsyncIterableIterator<string[]>;
  /** List sqlServerInstance resources in the subscription */
  list: (
    options?: SqlServerInstancesListOptionalParams,
  ) => PagedAsyncIterableIterator<SqlServerInstance>;
  /** Gets all sqlServerInstances in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SqlServerInstancesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SqlServerInstance>;
  /** Deletes a SQL Server Instance resource */
  delete: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    options?: SqlServerInstancesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a SQL Server Instance resource */
  update: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    parameters: SqlServerInstanceUpdate,
    options?: SqlServerInstancesUpdateOptionalParams,
  ) => PollerLike<OperationState<SqlServerInstance>, SqlServerInstance>;
  /** Creates or replaces a SQL Server Instance resource */
  create: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    sqlServerInstance: SqlServerInstance,
    options?: SqlServerInstancesCreateOptionalParams,
  ) => PollerLike<OperationState<SqlServerInstance>, SqlServerInstance>;
  /** Retrieves a SQL Server Instance resource */
  get: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    options?: SqlServerInstancesGetOptionalParams,
  ) => Promise<SqlServerInstance>;
}

function _getSqlServerInstances(context: AzureArcDataContext) {
  return {
    getAllAvailabilityGroups: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      options?: SqlServerInstancesGetAllAvailabilityGroupsOptionalParams,
    ) => getAllAvailabilityGroups(context, resourceGroupName, sqlServerInstanceName, options),
    runManagedInstanceLinkAssessment: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      sqlServerInstanceManagedInstanceLinkAssessmentRequest: SqlServerInstanceManagedInstanceLinkAssessmentRequest,
      options?: SqlServerInstancesRunManagedInstanceLinkAssessmentOptionalParams,
    ) =>
      runManagedInstanceLinkAssessment(
        context,
        resourceGroupName,
        sqlServerInstanceName,
        sqlServerInstanceManagedInstanceLinkAssessmentRequest,
        options,
      ),
    postUpgrade: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      options?: SqlServerInstancesPostUpgradeOptionalParams,
    ) => postUpgrade(context, resourceGroupName, sqlServerInstanceName, options),
    preUpgrade: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      options?: SqlServerInstancesPreUpgradeOptionalParams,
    ) => preUpgrade(context, resourceGroupName, sqlServerInstanceName, options),
    getJobs: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      options?: SqlServerInstancesGetJobsOptionalParams,
    ) => getJobs(context, resourceGroupName, sqlServerInstanceName, options),
    getJobsStatus: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      options?: SqlServerInstancesGetJobsStatusOptionalParams,
    ) => getJobsStatus(context, resourceGroupName, sqlServerInstanceName, options),
    runMigrationReadinessAssessment: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      options?: SqlServerInstancesRunMigrationReadinessAssessmentOptionalParams,
    ) =>
      runMigrationReadinessAssessment(context, resourceGroupName, sqlServerInstanceName, options),
    runBestPracticeAssessment: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      options?: SqlServerInstancesRunBestPracticeAssessmentOptionalParams,
    ) => runBestPracticeAssessment(context, resourceGroupName, sqlServerInstanceName, options),
    runBestPracticesAssessment: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      options?: SqlServerInstancesRunBestPracticesAssessmentOptionalParams,
    ) => runBestPracticesAssessment(context, resourceGroupName, sqlServerInstanceName, options),
    getMigrationReadinessReport: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      options?: SqlServerInstancesGetMigrationReadinessReportOptionalParams,
    ) => getMigrationReadinessReport(context, resourceGroupName, sqlServerInstanceName, options),
    getTargetRecommendationReports: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      options?: SqlServerInstancesGetTargetRecommendationReportsOptionalParams,
    ) => getTargetRecommendationReports(context, resourceGroupName, sqlServerInstanceName, options),
    runTargetRecommendationJob: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      options?: SqlServerInstancesRunTargetRecommendationJobOptionalParams,
    ) => runTargetRecommendationJob(context, resourceGroupName, sqlServerInstanceName, options),
    runMigrationAssessment: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      options?: SqlServerInstancesRunMigrationAssessmentOptionalParams,
    ) => runMigrationAssessment(context, resourceGroupName, sqlServerInstanceName, options),
    getBestPracticesAssessment: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      sqlServerInstanceBpaRequest: SqlServerInstanceBpaRequest,
      options?: SqlServerInstancesGetBestPracticesAssessmentOptionalParams,
    ) =>
      getBestPracticesAssessment(
        context,
        resourceGroupName,
        sqlServerInstanceName,
        sqlServerInstanceBpaRequest,
        options,
      ),
    getTelemetry: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      sqlServerInstanceTelemetryRequest: SqlServerInstanceTelemetryRequest,
      options?: SqlServerInstancesGetTelemetryOptionalParams,
    ) =>
      getTelemetry(
        context,
        resourceGroupName,
        sqlServerInstanceName,
        sqlServerInstanceTelemetryRequest,
        options,
      ),
    list: (options?: SqlServerInstancesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SqlServerInstancesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      options?: SqlServerInstancesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, sqlServerInstanceName, options),
    update: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      parameters: SqlServerInstanceUpdate,
      options?: SqlServerInstancesUpdateOptionalParams,
    ) => update(context, resourceGroupName, sqlServerInstanceName, parameters, options),
    create: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      sqlServerInstance: SqlServerInstance,
      options?: SqlServerInstancesCreateOptionalParams,
    ) => create(context, resourceGroupName, sqlServerInstanceName, sqlServerInstance, options),
    get: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      options?: SqlServerInstancesGetOptionalParams,
    ) => get(context, resourceGroupName, sqlServerInstanceName, options),
  };
}

export function _getSqlServerInstancesOperations(
  context: AzureArcDataContext,
): SqlServerInstancesOperations {
  return {
    ..._getSqlServerInstances(context),
  };
}
