// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CostManagementContext as Client } from "../index.js";
import type {
  BenefitUtilizationSummariesRequest,
  BenefitUtilizationSummariesOperationStatus,
} from "../../models/models.js";
import {
  benefitUtilizationSummariesRequestSerializer,
  benefitUtilizationSummariesOperationStatusDeserializer,
  armErrorResponseDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanIdOptionalParams,
  GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanOrderIdOptionalParams,
  GenerateBenefitUtilizationSummariesReportGenerateByReservationIdOptionalParams,
  GenerateBenefitUtilizationSummariesReportGenerateByReservationOrderIdOptionalParams,
  GenerateBenefitUtilizationSummariesReportGenerateByBillingProfileOptionalParams,
  GenerateBenefitUtilizationSummariesReportGenerateByBillingAccountOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _generateBySavingsPlanIdSend(
  context: Client,
  savingsPlanOrderId: string,
  savingsPlanId: string,
  benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
  options: GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanIdOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.BillingBenefits/savingsPlanOrders/{savingsPlanOrderId}/savingsPlans/{savingsPlanId}/providers/Microsoft.CostManagement/generateBenefitUtilizationSummariesReport{?api%2Dversion}",
    {
      savingsPlanOrderId: savingsPlanOrderId,
      savingsPlanId: savingsPlanId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: benefitUtilizationSummariesRequestSerializer(benefitUtilizationSummariesRequest),
  });
}

export async function _generateBySavingsPlanIdDeserialize(
  result: PathUncheckedResponse,
): Promise<BenefitUtilizationSummariesOperationStatus> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = armErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return benefitUtilizationSummariesOperationStatusDeserializer(result.body);
}

/** Triggers generation of a benefit utilization summaries report for the provided savings plan. */
export function generateBySavingsPlanId(
  context: Client,
  savingsPlanOrderId: string,
  savingsPlanId: string,
  benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
  options: GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanIdOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<BenefitUtilizationSummariesOperationStatus>,
  BenefitUtilizationSummariesOperationStatus
> {
  return getLongRunningPoller(context, _generateBySavingsPlanIdDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _generateBySavingsPlanIdSend(
        context,
        savingsPlanOrderId,
        savingsPlanId,
        benefitUtilizationSummariesRequest,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01",
  }) as PollerLike<
    OperationState<BenefitUtilizationSummariesOperationStatus>,
    BenefitUtilizationSummariesOperationStatus
  >;
}

export function _generateBySavingsPlanOrderIdSend(
  context: Client,
  savingsPlanOrderId: string,
  benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
  options: GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanOrderIdOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.BillingBenefits/savingsPlanOrders/{savingsPlanOrderId}/providers/Microsoft.CostManagement/generateBenefitUtilizationSummariesReport{?api%2Dversion}",
    {
      savingsPlanOrderId: savingsPlanOrderId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: benefitUtilizationSummariesRequestSerializer(benefitUtilizationSummariesRequest),
  });
}

export async function _generateBySavingsPlanOrderIdDeserialize(
  result: PathUncheckedResponse,
): Promise<BenefitUtilizationSummariesOperationStatus> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = armErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return benefitUtilizationSummariesOperationStatusDeserializer(result.body);
}

/** Triggers generation of a benefit utilization summaries report for the provided savings plan order. */
export function generateBySavingsPlanOrderId(
  context: Client,
  savingsPlanOrderId: string,
  benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
  options: GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanOrderIdOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<BenefitUtilizationSummariesOperationStatus>,
  BenefitUtilizationSummariesOperationStatus
> {
  return getLongRunningPoller(
    context,
    _generateBySavingsPlanOrderIdDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _generateBySavingsPlanOrderIdSend(
          context,
          savingsPlanOrderId,
          benefitUtilizationSummariesRequest,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-03-01",
    },
  ) as PollerLike<
    OperationState<BenefitUtilizationSummariesOperationStatus>,
    BenefitUtilizationSummariesOperationStatus
  >;
}

export function _generateByReservationIdSend(
  context: Client,
  reservationOrderId: string,
  reservationId: string,
  benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
  options: GenerateBenefitUtilizationSummariesReportGenerateByReservationIdOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.Capacity/reservationorders/{reservationOrderId}/reservations/{reservationId}/providers/Microsoft.CostManagement/generateBenefitUtilizationSummariesReport{?api%2Dversion}",
    {
      reservationOrderId: reservationOrderId,
      reservationId: reservationId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: benefitUtilizationSummariesRequestSerializer(benefitUtilizationSummariesRequest),
  });
}

export async function _generateByReservationIdDeserialize(
  result: PathUncheckedResponse,
): Promise<BenefitUtilizationSummariesOperationStatus> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = armErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return benefitUtilizationSummariesOperationStatusDeserializer(result.body);
}

/** Triggers generation of a benefit utilization summaries report for the provided reservation. */
export function generateByReservationId(
  context: Client,
  reservationOrderId: string,
  reservationId: string,
  benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
  options: GenerateBenefitUtilizationSummariesReportGenerateByReservationIdOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<BenefitUtilizationSummariesOperationStatus>,
  BenefitUtilizationSummariesOperationStatus
> {
  return getLongRunningPoller(context, _generateByReservationIdDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _generateByReservationIdSend(
        context,
        reservationOrderId,
        reservationId,
        benefitUtilizationSummariesRequest,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01",
  }) as PollerLike<
    OperationState<BenefitUtilizationSummariesOperationStatus>,
    BenefitUtilizationSummariesOperationStatus
  >;
}

export function _generateByReservationOrderIdSend(
  context: Client,
  reservationOrderId: string,
  benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
  options: GenerateBenefitUtilizationSummariesReportGenerateByReservationOrderIdOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.Capacity/reservationorders/{reservationOrderId}/providers/Microsoft.CostManagement/generateBenefitUtilizationSummariesReport{?api%2Dversion}",
    {
      reservationOrderId: reservationOrderId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: benefitUtilizationSummariesRequestSerializer(benefitUtilizationSummariesRequest),
  });
}

export async function _generateByReservationOrderIdDeserialize(
  result: PathUncheckedResponse,
): Promise<BenefitUtilizationSummariesOperationStatus> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = armErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return benefitUtilizationSummariesOperationStatusDeserializer(result.body);
}

/** Triggers generation of a benefit utilization summaries report for the provided reservation order. */
export function generateByReservationOrderId(
  context: Client,
  reservationOrderId: string,
  benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
  options: GenerateBenefitUtilizationSummariesReportGenerateByReservationOrderIdOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<BenefitUtilizationSummariesOperationStatus>,
  BenefitUtilizationSummariesOperationStatus
> {
  return getLongRunningPoller(
    context,
    _generateByReservationOrderIdDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _generateByReservationOrderIdSend(
          context,
          reservationOrderId,
          benefitUtilizationSummariesRequest,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-03-01",
    },
  ) as PollerLike<
    OperationState<BenefitUtilizationSummariesOperationStatus>,
    BenefitUtilizationSummariesOperationStatus
  >;
}

export function _generateByBillingProfileSend(
  context: Client,
  billingAccountId: string,
  billingProfileId: string,
  benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
  options: GenerateBenefitUtilizationSummariesReportGenerateByBillingProfileOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/providers/Microsoft.CostManagement/generateBenefitUtilizationSummariesReport{?api%2Dversion}",
    {
      billingAccountId: billingAccountId,
      billingProfileId: billingProfileId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: benefitUtilizationSummariesRequestSerializer(benefitUtilizationSummariesRequest),
  });
}

export async function _generateByBillingProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<BenefitUtilizationSummariesOperationStatus> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = armErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return benefitUtilizationSummariesOperationStatusDeserializer(result.body);
}

/** Triggers generation of a benefit utilization summaries report for the provided billing account and billing profile. */
export function generateByBillingProfile(
  context: Client,
  billingAccountId: string,
  billingProfileId: string,
  benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
  options: GenerateBenefitUtilizationSummariesReportGenerateByBillingProfileOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<BenefitUtilizationSummariesOperationStatus>,
  BenefitUtilizationSummariesOperationStatus
> {
  return getLongRunningPoller(
    context,
    _generateByBillingProfileDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _generateByBillingProfileSend(
          context,
          billingAccountId,
          billingProfileId,
          benefitUtilizationSummariesRequest,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-03-01",
    },
  ) as PollerLike<
    OperationState<BenefitUtilizationSummariesOperationStatus>,
    BenefitUtilizationSummariesOperationStatus
  >;
}

export function _generateByBillingAccountSend(
  context: Client,
  billingAccountId: string,
  benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
  options: GenerateBenefitUtilizationSummariesReportGenerateByBillingAccountOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.CostManagement/generateBenefitUtilizationSummariesReport{?api%2Dversion}",
    {
      billingAccountId: billingAccountId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: benefitUtilizationSummariesRequestSerializer(benefitUtilizationSummariesRequest),
  });
}

export async function _generateByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<BenefitUtilizationSummariesOperationStatus> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = armErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return benefitUtilizationSummariesOperationStatusDeserializer(result.body);
}

/** Triggers generation of a benefit utilization summaries report for the provided billing account. This API supports only enrollment accounts. */
export function generateByBillingAccount(
  context: Client,
  billingAccountId: string,
  benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
  options: GenerateBenefitUtilizationSummariesReportGenerateByBillingAccountOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<BenefitUtilizationSummariesOperationStatus>,
  BenefitUtilizationSummariesOperationStatus
> {
  return getLongRunningPoller(
    context,
    _generateByBillingAccountDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _generateByBillingAccountSend(
          context,
          billingAccountId,
          benefitUtilizationSummariesRequest,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-03-01",
    },
  ) as PollerLike<
    OperationState<BenefitUtilizationSummariesOperationStatus>,
    BenefitUtilizationSummariesOperationStatus
  >;
}
