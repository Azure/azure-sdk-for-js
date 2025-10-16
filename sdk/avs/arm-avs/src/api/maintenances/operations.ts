// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureVMwareSolutionAPIContext as Client } from "../index.js";
import type {
  _MaintenanceListResult,
  Maintenance,
  MaintenanceReschedule,
  MaintenanceSchedule,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _maintenanceListResultDeserializer,
  maintenanceDeserializer,
  maintenanceRescheduleSerializer,
  maintenanceScheduleSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MaintenancesInitiateChecksOptionalParams,
  MaintenancesScheduleOptionalParams,
  MaintenancesRescheduleOptionalParams,
  MaintenancesGetOptionalParams,
  MaintenancesListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _initiateChecksSend(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  maintenanceName: string,
  options: MaintenancesInitiateChecksOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/maintenances/{maintenanceName}/initiateChecks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateCloudName: privateCloudName,
      maintenanceName: maintenanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _initiateChecksDeserialize(
  result: PathUncheckedResponse,
): Promise<Maintenance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return maintenanceDeserializer(result.body);
}

/** Initiate maintenance readiness checks */
export async function initiateChecks(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  maintenanceName: string,
  options: MaintenancesInitiateChecksOptionalParams = { requestOptions: {} },
): Promise<Maintenance> {
  const result = await _initiateChecksSend(
    context,
    resourceGroupName,
    privateCloudName,
    maintenanceName,
    options,
  );
  return _initiateChecksDeserialize(result);
}

export function _scheduleSend(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  maintenanceName: string,
  body: MaintenanceSchedule,
  options: MaintenancesScheduleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/maintenances/{maintenanceName}/schedule{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateCloudName: privateCloudName,
      maintenanceName: maintenanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: maintenanceScheduleSerializer(body),
  });
}

export async function _scheduleDeserialize(result: PathUncheckedResponse): Promise<Maintenance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return maintenanceDeserializer(result.body);
}

/** Schedule a maintenance */
export async function schedule(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  maintenanceName: string,
  body: MaintenanceSchedule,
  options: MaintenancesScheduleOptionalParams = { requestOptions: {} },
): Promise<Maintenance> {
  const result = await _scheduleSend(
    context,
    resourceGroupName,
    privateCloudName,
    maintenanceName,
    body,
    options,
  );
  return _scheduleDeserialize(result);
}

export function _rescheduleSend(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  maintenanceName: string,
  body: MaintenanceReschedule,
  options: MaintenancesRescheduleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/maintenances/{maintenanceName}/reschedule{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateCloudName: privateCloudName,
      maintenanceName: maintenanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: maintenanceRescheduleSerializer(body),
  });
}

export async function _rescheduleDeserialize(result: PathUncheckedResponse): Promise<Maintenance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return maintenanceDeserializer(result.body);
}

/** Reschedule a maintenance */
export async function reschedule(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  maintenanceName: string,
  body: MaintenanceReschedule,
  options: MaintenancesRescheduleOptionalParams = { requestOptions: {} },
): Promise<Maintenance> {
  const result = await _rescheduleSend(
    context,
    resourceGroupName,
    privateCloudName,
    maintenanceName,
    body,
    options,
  );
  return _rescheduleDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  maintenanceName: string,
  options: MaintenancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/maintenances/{maintenanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateCloudName: privateCloudName,
      maintenanceName: maintenanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Maintenance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return maintenanceDeserializer(result.body);
}

/** Get a Maintenance */
export async function get(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  maintenanceName: string,
  options: MaintenancesGetOptionalParams = { requestOptions: {} },
): Promise<Maintenance> {
  const result = await _getSend(
    context,
    resourceGroupName,
    privateCloudName,
    maintenanceName,
    options,
  );
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  options: MaintenancesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/maintenances{?api%2Dversion,stateName,status,from,to}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateCloudName: privateCloudName,
      "api%2Dversion": context.apiVersion,
      stateName: options?.stateName,
      status: options?.status,
      from: !options?.fromParam ? options?.fromParam : options?.fromParam.toISOString(),
      to: !options?.to ? options?.to : options?.to.toISOString(),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_MaintenanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _maintenanceListResultDeserializer(result.body);
}

/** List Maintenance resources by subscription ID */
export function list(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  options: MaintenancesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Maintenance> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, privateCloudName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
