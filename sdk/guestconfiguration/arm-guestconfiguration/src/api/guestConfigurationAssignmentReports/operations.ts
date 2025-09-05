// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GuestConfigurationContext as Client } from "../index.js";
import type {
  _GuestConfigurationAssignmentReportList,
  GuestConfigurationAssignmentReport,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _guestConfigurationAssignmentReportListDeserializer,
  guestConfigurationAssignmentReportDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GuestConfigurationAssignmentReportsGetOptionalParams,
  GuestConfigurationAssignmentReportsListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  guestConfigurationAssignmentName: string,
  reportId: string,
  options: GuestConfigurationAssignmentReportsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}/reports/{reportId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      guestConfigurationAssignmentName: guestConfigurationAssignmentName,
      reportId: reportId,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<GuestConfigurationAssignmentReport> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return guestConfigurationAssignmentReportDeserializer(result.body);
}

/** Get a report for the guest configuration assignment, by reportId. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  guestConfigurationAssignmentName: string,
  reportId: string,
  options: GuestConfigurationAssignmentReportsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<GuestConfigurationAssignmentReport> {
  const result = await _getSend(
    context,
    resourceGroupName,
    vmName,
    guestConfigurationAssignmentName,
    reportId,
    options,
  );
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  guestConfigurationAssignmentName: string,
  options: GuestConfigurationAssignmentReportsListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}/reports{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      guestConfigurationAssignmentName: guestConfigurationAssignmentName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_GuestConfigurationAssignmentReportList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _guestConfigurationAssignmentReportListDeserializer(result.body);
}

/** List all reports for the guest configuration assignment, latest report first. */
export async function list(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  guestConfigurationAssignmentName: string,
  options: GuestConfigurationAssignmentReportsListOptionalParams = {
    requestOptions: {},
  },
): Promise<_GuestConfigurationAssignmentReportList> {
  const result = await _listSend(
    context,
    resourceGroupName,
    vmName,
    guestConfigurationAssignmentName,
    options,
  );
  return _listDeserialize(result);
}
