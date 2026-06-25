// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ManagementGroupAggregatedCostResult,
  managementGroupAggregatedCostResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AggregatedCostGetForBillingPeriodByManagementGroupOptionalParams,
  AggregatedCostGetByManagementGroupOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getForBillingPeriodByManagementGroupSend(
  context: Client,
  managementGroupId: string,
  billingPeriodName: string,
  options: AggregatedCostGetForBillingPeriodByManagementGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Billing/billingPeriods/{billingPeriodName}/providers/Microsoft.Consumption/aggregatedCost{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      billingPeriodName: billingPeriodName,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getForBillingPeriodByManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagementGroupAggregatedCostResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return managementGroupAggregatedCostResultDeserializer(result.body);
}

/** Provides the aggregate cost of a management group and all child management groups by specified billing period */
export async function getForBillingPeriodByManagementGroup(
  context: Client,
  managementGroupId: string,
  billingPeriodName: string,
  options: AggregatedCostGetForBillingPeriodByManagementGroupOptionalParams = {
    requestOptions: {},
  },
): Promise<ManagementGroupAggregatedCostResult> {
  const result = await _getForBillingPeriodByManagementGroupSend(
    context,
    managementGroupId,
    billingPeriodName,
    options,
  );
  return _getForBillingPeriodByManagementGroupDeserialize(result);
}

export function _getByManagementGroupSend(
  context: Client,
  managementGroupId: string,
  options: AggregatedCostGetByManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Consumption/aggregatedcost{?api%2Dversion,%24filter}",
    {
      managementGroupId: managementGroupId,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getByManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagementGroupAggregatedCostResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return managementGroupAggregatedCostResultDeserializer(result.body);
}

/** Provides the aggregate cost of a management group and all child management groups by current billing period. */
export async function getByManagementGroup(
  context: Client,
  managementGroupId: string,
  options: AggregatedCostGetByManagementGroupOptionalParams = { requestOptions: {} },
): Promise<ManagementGroupAggregatedCostResult> {
  const result = await _getByManagementGroupSend(context, managementGroupId, options);
  return _getByManagementGroupDeserialize(result);
}
