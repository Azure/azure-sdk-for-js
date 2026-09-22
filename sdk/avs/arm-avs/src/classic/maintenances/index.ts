// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import {
  initiateChecks,
  schedule,
  reschedule,
  get,
  list,
} from "../../api/maintenances/operations.js";
import type {
  MaintenancesInitiateChecksOptionalParams,
  MaintenancesScheduleOptionalParams,
  MaintenancesRescheduleOptionalParams,
  MaintenancesGetOptionalParams,
  MaintenancesListOptionalParams,
} from "../../api/maintenances/options.js";
import type {
  Maintenance,
  MaintenanceReschedule,
  MaintenanceSchedule,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Maintenances operations. */
export interface MaintenancesOperations {
  /** Initiate maintenance readiness checks */
  initiateChecks: (
    resourceGroupName: string,
    privateCloudName: string,
    maintenanceName: string,
    options?: MaintenancesInitiateChecksOptionalParams,
  ) => Promise<Maintenance>;
  /** Schedule a maintenance */
  schedule: (
    resourceGroupName: string,
    privateCloudName: string,
    maintenanceName: string,
    body: MaintenanceSchedule,
    options?: MaintenancesScheduleOptionalParams,
  ) => Promise<Maintenance>;
  /** Reschedule a maintenance */
  reschedule: (
    resourceGroupName: string,
    privateCloudName: string,
    maintenanceName: string,
    body: MaintenanceReschedule,
    options?: MaintenancesRescheduleOptionalParams,
  ) => Promise<Maintenance>;
  /** Get a Maintenance */
  get: (
    resourceGroupName: string,
    privateCloudName: string,
    maintenanceName: string,
    options?: MaintenancesGetOptionalParams,
  ) => Promise<Maintenance>;
  /** List Maintenance resources by subscription ID */
  list: (
    resourceGroupName: string,
    privateCloudName: string,
    options?: MaintenancesListOptionalParams,
  ) => PagedAsyncIterableIterator<Maintenance>;
}

function _getMaintenances(context: AzureVMwareSolutionAPIContext) {
  return {
    initiateChecks: (
      resourceGroupName: string,
      privateCloudName: string,
      maintenanceName: string,
      options?: MaintenancesInitiateChecksOptionalParams,
    ) => initiateChecks(context, resourceGroupName, privateCloudName, maintenanceName, options),
    schedule: (
      resourceGroupName: string,
      privateCloudName: string,
      maintenanceName: string,
      body: MaintenanceSchedule,
      options?: MaintenancesScheduleOptionalParams,
    ) => schedule(context, resourceGroupName, privateCloudName, maintenanceName, body, options),
    reschedule: (
      resourceGroupName: string,
      privateCloudName: string,
      maintenanceName: string,
      body: MaintenanceReschedule,
      options?: MaintenancesRescheduleOptionalParams,
    ) => reschedule(context, resourceGroupName, privateCloudName, maintenanceName, body, options),
    get: (
      resourceGroupName: string,
      privateCloudName: string,
      maintenanceName: string,
      options?: MaintenancesGetOptionalParams,
    ) => get(context, resourceGroupName, privateCloudName, maintenanceName, options),
    list: (
      resourceGroupName: string,
      privateCloudName: string,
      options?: MaintenancesListOptionalParams,
    ) => list(context, resourceGroupName, privateCloudName, options),
  };
}

export function _getMaintenancesOperations(
  context: AzureVMwareSolutionAPIContext,
): MaintenancesOperations {
  return {
    ..._getMaintenances(context),
  };
}
