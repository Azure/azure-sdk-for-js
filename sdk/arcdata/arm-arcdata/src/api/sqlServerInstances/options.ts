// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  SqlServerInstanceRunTargetRecommendationJobRequest,
  SqlServerInstanceTargetRecommendationReportsRequest,
  SqlServerInstanceJobsStatusRequest,
  SqlServerInstanceJobsRequest,
  AvailabilityGroupRetrievalFilters,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SqlServerInstancesGetAllAvailabilityGroupsOptionalParams extends OperationOptions {
  availabilityGroupRetrievalFilters?: AvailabilityGroupRetrievalFilters;
}

/** Optional parameters. */
export interface SqlServerInstancesRunManagedInstanceLinkAssessmentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlServerInstancesPostUpgradeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlServerInstancesPreUpgradeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlServerInstancesGetJobsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Contains the parameters to get SQL Server instance agent jobs status. */
  sqlServerInstanceJobsRequest?: SqlServerInstanceJobsRequest;
}

/** Optional parameters. */
export interface SqlServerInstancesGetJobsStatusOptionalParams extends OperationOptions {
  /** Contains the parameters to get SQL Server instance agent jobs status. */
  sqlServerInstanceJobsStatusRequest?: SqlServerInstanceJobsStatusRequest;
}

/** Optional parameters. */
export interface SqlServerInstancesRunMigrationReadinessAssessmentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlServerInstancesRunBestPracticeAssessmentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlServerInstancesRunBestPracticesAssessmentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlServerInstancesGetMigrationReadinessReportOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlServerInstancesGetTargetRecommendationReportsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Contains the parameters to get SQL Server instance target recommendation reports. */
  sqlServerInstanceTargetRecommendationReportsRequest?: SqlServerInstanceTargetRecommendationReportsRequest;
}

/** Optional parameters. */
export interface SqlServerInstancesRunTargetRecommendationJobOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Contains the parameters to run SQL Server instance target recommendation job. */
  sqlServerInstanceRunTargetRecommendationJobRequest?: SqlServerInstanceRunTargetRecommendationJobRequest;
}

/** Optional parameters. */
export interface SqlServerInstancesRunMigrationAssessmentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlServerInstancesGetBestPracticesAssessmentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlServerInstancesGetTelemetryOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlServerInstancesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlServerInstancesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlServerInstancesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlServerInstancesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlServerInstancesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlServerInstancesGetOptionalParams extends OperationOptions {}
