// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  OperationStatus,
  operationStatusDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  GenerateReservationDetailsReportByBillingProfileIdOptionalParams,
  GenerateReservationDetailsReportByBillingAccountIdOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _byBillingProfileIdSend(
  context: Client,
  billingAccountId: string,
  billingProfileId: string,
  startDate: string,
  endDate: string,
  options: GenerateReservationDetailsReportByBillingProfileIdOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/providers/Microsoft.CostManagement/generateReservationDetailsReport{?api%2Dversion,startDate,endDate}",
    {
      billingAccountId: billingAccountId,
      billingProfileId: billingProfileId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      startDate: startDate,
      endDate: endDate,
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

export async function _byBillingProfileIdDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatus> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusDeserializer(result.body);
}

/** Generates the reservations details report for provided date range asynchronously by billing profile. The Reservation usage details can be viewed by only certain enterprise roles by default. For more details on the roles see, https://docs.microsoft.com/en-us/azure/cost-management-billing/reservations/reservation-utilization#view-utilization-in-the-azure-portal-with-azure-rbac-access */
export function byBillingProfileId(
  context: Client,
  billingAccountId: string,
  billingProfileId: string,
  startDate: string,
  endDate: string,
  options: GenerateReservationDetailsReportByBillingProfileIdOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OperationStatus>, OperationStatus> {
  return getLongRunningPoller(context, _byBillingProfileIdDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _byBillingProfileIdSend(
        context,
        billingAccountId,
        billingProfileId,
        startDate,
        endDate,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01",
  }) as PollerLike<OperationState<OperationStatus>, OperationStatus>;
}

export function _byBillingAccountIdSend(
  context: Client,
  billingAccountId: string,
  startDate: string,
  endDate: string,
  options: GenerateReservationDetailsReportByBillingAccountIdOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.CostManagement/generateReservationDetailsReport{?api%2Dversion,startDate,endDate}",
    {
      billingAccountId: billingAccountId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      startDate: startDate,
      endDate: endDate,
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

export async function _byBillingAccountIdDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatus> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusDeserializer(result.body);
}

/** Generates the reservations details report for provided date range asynchronously based on enrollment id. The Reservation usage details can be viewed only by certain enterprise roles. For more details on the roles see, https://docs.microsoft.com/en-us/azure/cost-management-billing/manage/understand-ea-roles#usage-and-costs-access-by-role */
export function byBillingAccountId(
  context: Client,
  billingAccountId: string,
  startDate: string,
  endDate: string,
  options: GenerateReservationDetailsReportByBillingAccountIdOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OperationStatus>, OperationStatus> {
  return getLongRunningPoller(context, _byBillingAccountIdDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _byBillingAccountIdSend(context, billingAccountId, startDate, endDate, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01",
  }) as PollerLike<OperationState<OperationStatus>, OperationStatus>;
}
