// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureArcDataContext as Client } from "../index.js";
import type {
  SqlServerInstance,
  SqlServerInstanceUpdate,
  _SqlServerInstanceListResult,
  SqlServerInstanceTelemetryRequest,
  _SqlServerInstanceTelemetryResponse,
  SqlServerInstanceBpaRequest,
  _SqlServerInstanceBpaResponse,
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
  _ArcSqlServerAvailabilityGroupListResult,
  SqlServerAvailabilityGroupResource,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  sqlServerInstanceSerializer,
  sqlServerInstanceDeserializer,
  sqlServerInstanceUpdateSerializer,
  _sqlServerInstanceListResultDeserializer,
  sqlServerInstanceTelemetryRequestSerializer,
  _sqlServerInstanceTelemetryResponseDeserializer,
  sqlServerInstanceBpaRequestSerializer,
  _sqlServerInstanceBpaResponseDeserializer,
  sqlServerInstanceRunMigrationAssessmentResponseDeserializer,
  sqlServerInstanceRunTargetRecommendationJobRequestSerializer,
  sqlServerInstanceRunTargetRecommendationJobResponseDeserializer,
  sqlServerInstanceTargetRecommendationReportsRequestSerializer,
  sqlServerInstanceTargetRecommendationReportsResponseDeserializer,
  sqlServerInstanceMigrationReadinessReportResponseDeserializer,
  sqlServerInstanceRunBestPracticesAssessmentResponseDeserializer,
  sqlServerInstanceRunMigrationReadinessAssessmentResponseDeserializer,
  sqlServerInstanceJobsStatusRequestSerializer,
  sqlServerInstanceJobsStatusResponseDeserializer,
  sqlServerInstanceJobsRequestSerializer,
  sqlServerInstanceJobsResponseDeserializer,
  sqlServerInstanceManagedInstanceLinkAssessmentRequestSerializer,
  sqlServerInstanceManagedInstanceLinkAssessmentResponseDeserializer,
  availabilityGroupRetrievalFiltersSerializer,
  _arcSqlServerAvailabilityGroupListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getAllAvailabilityGroupsSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesGetAllAvailabilityGroupsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/getAllAvailabilityGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options?.availabilityGroupRetrievalFilters
      ? options?.availabilityGroupRetrievalFilters
      : availabilityGroupRetrievalFiltersSerializer(options?.availabilityGroupRetrievalFilters),
  });
}

export async function _getAllAvailabilityGroupsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ArcSqlServerAvailabilityGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _arcSqlServerAvailabilityGroupListResultDeserializer(result.body);
}

/** Retrieves full properties of all the Availability Groups in a SQL Server instance. */
export function getAllAvailabilityGroups(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesGetAllAvailabilityGroupsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SqlServerAvailabilityGroupResource> {
  return buildPagedAsyncIterator(
    context,
    () => _getAllAvailabilityGroupsSend(context, resourceGroupName, sqlServerInstanceName, options),
    _getAllAvailabilityGroupsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _runManagedInstanceLinkAssessmentSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  sqlServerInstanceManagedInstanceLinkAssessmentRequest: SqlServerInstanceManagedInstanceLinkAssessmentRequest,
  options: SqlServerInstancesRunManagedInstanceLinkAssessmentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/runManagedInstanceLinkAssessment{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sqlServerInstanceManagedInstanceLinkAssessmentRequestSerializer(
      sqlServerInstanceManagedInstanceLinkAssessmentRequest,
    ),
  });
}

export async function _runManagedInstanceLinkAssessmentDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerInstanceManagedInstanceLinkAssessmentResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerInstanceManagedInstanceLinkAssessmentResponseDeserializer(result.body);
}

/** Runs Managed Instance Link assessment for SQL Server instance */
export function runManagedInstanceLinkAssessment(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  sqlServerInstanceManagedInstanceLinkAssessmentRequest: SqlServerInstanceManagedInstanceLinkAssessmentRequest,
  options: SqlServerInstancesRunManagedInstanceLinkAssessmentOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<SqlServerInstanceManagedInstanceLinkAssessmentResponse>,
  SqlServerInstanceManagedInstanceLinkAssessmentResponse
> {
  return getLongRunningPoller(
    context,
    _runManagedInstanceLinkAssessmentDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _runManagedInstanceLinkAssessmentSend(
          context,
          resourceGroupName,
          sqlServerInstanceName,
          sqlServerInstanceManagedInstanceLinkAssessmentRequest,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  ) as PollerLike<
    OperationState<SqlServerInstanceManagedInstanceLinkAssessmentResponse>,
    SqlServerInstanceManagedInstanceLinkAssessmentResponse
  >;
}

export function _postUpgradeSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesPostUpgradeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/postUpgrade{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _postUpgradeDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerInstance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerInstanceDeserializer(result.body);
}

/** Clean up after upgrading. */
export async function postUpgrade(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesPostUpgradeOptionalParams = { requestOptions: {} },
): Promise<SqlServerInstance> {
  const result = await _postUpgradeSend(context, resourceGroupName, sqlServerInstanceName, options);
  return _postUpgradeDeserialize(result);
}

export function _preUpgradeSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesPreUpgradeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/preUpgrade{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _preUpgradeDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerInstance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerInstanceDeserializer(result.body);
}

/** Request Upgrade Permission before upgrading. */
export async function preUpgrade(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesPreUpgradeOptionalParams = { requestOptions: {} },
): Promise<SqlServerInstance> {
  const result = await _preUpgradeSend(context, resourceGroupName, sqlServerInstanceName, options);
  return _preUpgradeDeserialize(result);
}

export function _getJobsSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesGetJobsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/getJobs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options?.sqlServerInstanceJobsRequest
      ? options?.sqlServerInstanceJobsRequest
      : sqlServerInstanceJobsRequestSerializer(options?.sqlServerInstanceJobsRequest),
  });
}

export async function _getJobsDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerInstanceJobsResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerInstanceJobsResponseDeserializer(result.body);
}

/** Gets job details for sql arc resource asynchronously */
export function getJobs(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesGetJobsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SqlServerInstanceJobsResponse>, SqlServerInstanceJobsResponse> {
  return getLongRunningPoller(context, _getJobsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getJobsSend(context, resourceGroupName, sqlServerInstanceName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<SqlServerInstanceJobsResponse>, SqlServerInstanceJobsResponse>;
}

export function _getJobsStatusSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesGetJobsStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/getJobsStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options?.sqlServerInstanceJobsStatusRequest
      ? options?.sqlServerInstanceJobsStatusRequest
      : sqlServerInstanceJobsStatusRequestSerializer(options?.sqlServerInstanceJobsStatusRequest),
  });
}

export async function _getJobsStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerInstanceJobsStatusResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerInstanceJobsStatusResponseDeserializer(result.body);
}

/** Gets jobs status details for sql arc resource */
export async function getJobsStatus(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesGetJobsStatusOptionalParams = { requestOptions: {} },
): Promise<SqlServerInstanceJobsStatusResponse> {
  const result = await _getJobsStatusSend(
    context,
    resourceGroupName,
    sqlServerInstanceName,
    options,
  );
  return _getJobsStatusDeserialize(result);
}

export function _runMigrationReadinessAssessmentSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesRunMigrationReadinessAssessmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/runMigrationReadinessAssessment{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _runMigrationReadinessAssessmentDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerInstanceRunMigrationReadinessAssessmentResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerInstanceRunMigrationReadinessAssessmentResponseDeserializer(result.body);
}

/** The request to run migration readiness assessment asynchronously. */
export function runMigrationReadinessAssessment(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesRunMigrationReadinessAssessmentOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<SqlServerInstanceRunMigrationReadinessAssessmentResponse>,
  SqlServerInstanceRunMigrationReadinessAssessmentResponse
> {
  return getLongRunningPoller(
    context,
    _runMigrationReadinessAssessmentDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _runMigrationReadinessAssessmentSend(
          context,
          resourceGroupName,
          sqlServerInstanceName,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  ) as PollerLike<
    OperationState<SqlServerInstanceRunMigrationReadinessAssessmentResponse>,
    SqlServerInstanceRunMigrationReadinessAssessmentResponse
  >;
}

export function _runBestPracticeAssessmentSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesRunBestPracticeAssessmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/runBestPracticeAssessment{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _runBestPracticeAssessmentDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerInstanceRunBestPracticesAssessmentResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerInstanceRunBestPracticesAssessmentResponseDeserializer(result.body);
}

/** The request to run SQL best practices assessment asynchronously. */
export function runBestPracticeAssessment(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesRunBestPracticeAssessmentOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<SqlServerInstanceRunBestPracticesAssessmentResponse>,
  SqlServerInstanceRunBestPracticesAssessmentResponse
> {
  return getLongRunningPoller(
    context,
    _runBestPracticeAssessmentDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _runBestPracticeAssessmentSend(context, resourceGroupName, sqlServerInstanceName, options),
      resourceLocationConfig: "azure-async-operation",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  ) as PollerLike<
    OperationState<SqlServerInstanceRunBestPracticesAssessmentResponse>,
    SqlServerInstanceRunBestPracticesAssessmentResponse
  >;
}

export function _runBestPracticesAssessmentSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesRunBestPracticesAssessmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/runBestPracticesAssessment{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _runBestPracticesAssessmentDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerInstanceRunBestPracticesAssessmentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerInstanceRunBestPracticesAssessmentResponseDeserializer(result.body);
}

/** The request to run SQL best practices assessment. */
export async function runBestPracticesAssessment(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesRunBestPracticesAssessmentOptionalParams = { requestOptions: {} },
): Promise<SqlServerInstanceRunBestPracticesAssessmentResponse> {
  const result = await _runBestPracticesAssessmentSend(
    context,
    resourceGroupName,
    sqlServerInstanceName,
    options,
  );
  return _runBestPracticesAssessmentDeserialize(result);
}

export function _getMigrationReadinessReportSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesGetMigrationReadinessReportOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/getMigrationReadinessReport{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getMigrationReadinessReportDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerInstanceMigrationReadinessReportResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerInstanceMigrationReadinessReportResponseDeserializer(result.body);
}

/** Retrieves the migration readiness report for the SQL Server instance. The report contains an assessment of the instance's readiness for migration to Azure SQL targets. */
export function getMigrationReadinessReport(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesGetMigrationReadinessReportOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<SqlServerInstanceMigrationReadinessReportResponse>,
  SqlServerInstanceMigrationReadinessReportResponse
> {
  return getLongRunningPoller(
    context,
    _getMigrationReadinessReportDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getMigrationReadinessReportSend(
          context,
          resourceGroupName,
          sqlServerInstanceName,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  ) as PollerLike<
    OperationState<SqlServerInstanceMigrationReadinessReportResponse>,
    SqlServerInstanceMigrationReadinessReportResponse
  >;
}

export function _getTargetRecommendationReportsSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesGetTargetRecommendationReportsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/getTargetRecommendationReports{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options?.sqlServerInstanceTargetRecommendationReportsRequest
      ? options?.sqlServerInstanceTargetRecommendationReportsRequest
      : sqlServerInstanceTargetRecommendationReportsRequestSerializer(
          options?.sqlServerInstanceTargetRecommendationReportsRequest,
        ),
  });
}

export async function _getTargetRecommendationReportsDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerInstanceTargetRecommendationReportsResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerInstanceTargetRecommendationReportsResponseDeserializer(result.body);
}

/** Retrieves the current job status and the latest target recommendation report for the SQL Server instance. The response always includes the jobStatus field, which indicates the state of the most recent target recommendation job (NotStarted, InProgress, Succeeded, or Failed). The report data is included in the response only when the jobStatus is Succeeded. A target recommendation job must be started using the RunTargetRecommendationJob API before calling this API. Only the most recent report is returned. If the report contains more sections than can be returned in a single response, use the nextReportOffset and nextSectionOffset values from the response to retrieve the remaining data. */
export function getTargetRecommendationReports(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesGetTargetRecommendationReportsOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<SqlServerInstanceTargetRecommendationReportsResponse>,
  SqlServerInstanceTargetRecommendationReportsResponse
> {
  return getLongRunningPoller(
    context,
    _getTargetRecommendationReportsDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getTargetRecommendationReportsSend(
          context,
          resourceGroupName,
          sqlServerInstanceName,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  ) as PollerLike<
    OperationState<SqlServerInstanceTargetRecommendationReportsResponse>,
    SqlServerInstanceTargetRecommendationReportsResponse
  >;
}

export function _runTargetRecommendationJobSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesRunTargetRecommendationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/runTargetRecommendationJob{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options?.sqlServerInstanceRunTargetRecommendationJobRequest
      ? options?.sqlServerInstanceRunTargetRecommendationJobRequest
      : sqlServerInstanceRunTargetRecommendationJobRequestSerializer(
          options?.sqlServerInstanceRunTargetRecommendationJobRequest,
        ),
  });
}

export async function _runTargetRecommendationJobDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerInstanceRunTargetRecommendationJobResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerInstanceRunTargetRecommendationJobResponseDeserializer(result.body);
}

/** Starts a target recommendation job for the SQL Server instance. Only one job can run at a time. If the previous job is in a non-terminal state (NotStarted or InProgress), calling this operation again returns the existing job status without creating a new job. A new job is created only when the previous job has reached a terminal state (Succeeded or Failed). This operation does not return recommendations directly. Use the GetTargetRecommendationReports API to check the job status and retrieve the target recommendation report if the jobStatus is Succeeded. */
export function runTargetRecommendationJob(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesRunTargetRecommendationJobOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<SqlServerInstanceRunTargetRecommendationJobResponse>,
  SqlServerInstanceRunTargetRecommendationJobResponse
> {
  return getLongRunningPoller(
    context,
    _runTargetRecommendationJobDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _runTargetRecommendationJobSend(context, resourceGroupName, sqlServerInstanceName, options),
      resourceLocationConfig: "azure-async-operation",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  ) as PollerLike<
    OperationState<SqlServerInstanceRunTargetRecommendationJobResponse>,
    SqlServerInstanceRunTargetRecommendationJobResponse
  >;
}

export function _runMigrationAssessmentSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesRunMigrationAssessmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/runMigrationAssessment{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _runMigrationAssessmentDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerInstanceRunMigrationAssessmentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerInstanceRunMigrationAssessmentResponseDeserializer(result.body);
}

/** Runs migration assessment for SQL Server instance */
export async function runMigrationAssessment(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesRunMigrationAssessmentOptionalParams = { requestOptions: {} },
): Promise<SqlServerInstanceRunMigrationAssessmentResponse> {
  const result = await _runMigrationAssessmentSend(
    context,
    resourceGroupName,
    sqlServerInstanceName,
    options,
  );
  return _runMigrationAssessmentDeserialize(result);
}

export function _getBestPracticesAssessmentSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  sqlServerInstanceBpaRequest: SqlServerInstanceBpaRequest,
  options: SqlServerInstancesGetBestPracticesAssessmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/getBestPracticesAssessment{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sqlServerInstanceBpaRequestSerializer(sqlServerInstanceBpaRequest),
  });
}

export async function _getBestPracticesAssessmentDeserialize(
  result: PathUncheckedResponse,
): Promise<_SqlServerInstanceBpaResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sqlServerInstanceBpaResponseDeserializer(result.body);
}

/** Retrieves SQL best practices assessment results for the SQL Server instance. */
export function getBestPracticesAssessment(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  sqlServerInstanceBpaRequest: SqlServerInstanceBpaRequest,
  options: SqlServerInstancesGetBestPracticesAssessmentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<string[]> {
  const initialPagingPoller = getLongRunningPoller(
    context,
    async (result: PathUncheckedResponse) => result,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getBestPracticesAssessmentSend(
          context,
          resourceGroupName,
          sqlServerInstanceName,
          sqlServerInstanceBpaRequest,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  ) as PollerLike<OperationState<PathUncheckedResponse>, PathUncheckedResponse>;

  return buildPagedAsyncIterator(
    context,
    async () => await initialPagingPoller,
    _getBestPracticesAssessmentDeserialize,
    ["202", "200", "201"],
    {
      itemName: "rows",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _getTelemetrySend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  sqlServerInstanceTelemetryRequest: SqlServerInstanceTelemetryRequest,
  options: SqlServerInstancesGetTelemetryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/getTelemetry{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sqlServerInstanceTelemetryRequestSerializer(sqlServerInstanceTelemetryRequest),
  });
}

export async function _getTelemetryDeserialize(
  result: PathUncheckedResponse,
): Promise<_SqlServerInstanceTelemetryResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sqlServerInstanceTelemetryResponseDeserializer(result.body);
}

/** Retrieves SQL Server instance telemetry */
export function getTelemetry(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  sqlServerInstanceTelemetryRequest: SqlServerInstanceTelemetryRequest,
  options: SqlServerInstancesGetTelemetryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<string[]> {
  const initialPagingPoller = getLongRunningPoller(
    context,
    async (result: PathUncheckedResponse) => result,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getTelemetrySend(
          context,
          resourceGroupName,
          sqlServerInstanceName,
          sqlServerInstanceTelemetryRequest,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  ) as PollerLike<OperationState<PathUncheckedResponse>, PathUncheckedResponse>;

  return buildPagedAsyncIterator(
    context,
    async () => await initialPagingPoller,
    _getTelemetryDeserialize,
    ["202", "200", "201"],
    {
      itemName: "rows",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _listSend(
  context: Client,
  options: SqlServerInstancesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureArcData/sqlServerInstances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_SqlServerInstanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sqlServerInstanceListResultDeserializer(result.body);
}

/** List sqlServerInstance resources in the subscription */
export function list(
  context: Client,
  options: SqlServerInstancesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SqlServerInstance> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: SqlServerInstancesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SqlServerInstanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sqlServerInstanceListResultDeserializer(result.body);
}

/** Gets all sqlServerInstances in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: SqlServerInstancesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SqlServerInstance> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a SQL Server Instance resource */
export function $delete(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, sqlServerInstanceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  parameters: SqlServerInstanceUpdate,
  options: SqlServerInstancesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sqlServerInstanceUpdateSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerInstance> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerInstanceDeserializer(result.body);
}

/** Updates a SQL Server Instance resource */
export function update(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  parameters: SqlServerInstanceUpdate,
  options: SqlServerInstancesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SqlServerInstance>, SqlServerInstance> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, sqlServerInstanceName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<SqlServerInstance>, SqlServerInstance>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  sqlServerInstance: SqlServerInstance,
  options: SqlServerInstancesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sqlServerInstanceSerializer(sqlServerInstance),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerInstance> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerInstanceDeserializer(result.body);
}

/** Creates or replaces a SQL Server Instance resource */
export function create(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  sqlServerInstance: SqlServerInstance,
  options: SqlServerInstancesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SqlServerInstance>, SqlServerInstance> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, sqlServerInstanceName, sqlServerInstance, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<SqlServerInstance>, SqlServerInstance>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SqlServerInstance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerInstanceDeserializer(result.body);
}

/** Retrieves a SQL Server Instance resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerInstancesGetOptionalParams = { requestOptions: {} },
): Promise<SqlServerInstance> {
  const result = await _getSend(context, resourceGroupName, sqlServerInstanceName, options);
  return _getDeserialize(result);
}
