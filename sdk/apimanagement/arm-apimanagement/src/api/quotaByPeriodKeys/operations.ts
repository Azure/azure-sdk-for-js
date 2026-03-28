// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type { QuotaCounterContract, QuotaCounterValueUpdateContract } from "../../models/models.js";
import {
  errorResponseDeserializer,
  quotaCounterContractDeserializer,
  quotaCounterValueUpdateContractSerializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  QuotaByPeriodKeysUpdateOptionalParams,
  QuotaByPeriodKeysGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  quotaCounterKey: string,
  quotaPeriodKey: string,
  parameters: QuotaCounterValueUpdateContract,
  options: QuotaByPeriodKeysUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/quotas/{quotaCounterKey}/periods/{quotaPeriodKey}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      quotaCounterKey: quotaCounterKey,
      quotaPeriodKey: quotaPeriodKey,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: quotaCounterValueUpdateContractSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<QuotaCounterContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return quotaCounterContractDeserializer(result.body);
}

/** Updates an existing quota counter value in the specified service instance. */
export async function update(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  quotaCounterKey: string,
  quotaPeriodKey: string,
  parameters: QuotaCounterValueUpdateContract,
  options: QuotaByPeriodKeysUpdateOptionalParams = { requestOptions: {} },
): Promise<QuotaCounterContract> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    serviceName,
    quotaCounterKey,
    quotaPeriodKey,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  quotaCounterKey: string,
  quotaPeriodKey: string,
  options: QuotaByPeriodKeysGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/quotas/{quotaCounterKey}/periods/{quotaPeriodKey}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      quotaCounterKey: quotaCounterKey,
      quotaPeriodKey: quotaPeriodKey,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<QuotaCounterContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return quotaCounterContractDeserializer(result.body);
}

/** Gets the value of the quota counter associated with the counter-key in the policy for the specific period in service instance. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  quotaCounterKey: string,
  quotaPeriodKey: string,
  options: QuotaByPeriodKeysGetOptionalParams = { requestOptions: {} },
): Promise<QuotaCounterContract> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serviceName,
    quotaCounterKey,
    quotaPeriodKey,
    options,
  );
  return _getDeserialize(result);
}
