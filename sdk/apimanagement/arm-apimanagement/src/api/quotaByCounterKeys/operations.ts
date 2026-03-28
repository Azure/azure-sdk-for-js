// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  QuotaCounterCollection,
  QuotaCounterValueUpdateContract,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  quotaCounterCollectionDeserializer,
  quotaCounterValueUpdateContractSerializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  QuotaByCounterKeysUpdateOptionalParams,
  QuotaByCounterKeysListByServiceOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  quotaCounterKey: string,
  parameters: QuotaCounterValueUpdateContract,
  options: QuotaByCounterKeysUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/quotas/{quotaCounterKey}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      quotaCounterKey: quotaCounterKey,
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
): Promise<QuotaCounterCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return quotaCounterCollectionDeserializer(result.body);
}

/** Updates all the quota counter values specified with the existing quota counter key to a value in the specified service instance. This should be used for reset of the quota counter values. */
export async function update(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  quotaCounterKey: string,
  parameters: QuotaCounterValueUpdateContract,
  options: QuotaByCounterKeysUpdateOptionalParams = { requestOptions: {} },
): Promise<QuotaCounterCollection> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    serviceName,
    quotaCounterKey,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _listByServiceSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  quotaCounterKey: string,
  options: QuotaByCounterKeysListByServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/quotas/{quotaCounterKey}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      quotaCounterKey: quotaCounterKey,
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

export async function _listByServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<QuotaCounterCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return quotaCounterCollectionDeserializer(result.body);
}

/** Lists a collection of current quota counter periods associated with the counter-key configured in the policy on the specified service instance. The api does not support paging yet. */
export async function listByService(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  quotaCounterKey: string,
  options: QuotaByCounterKeysListByServiceOptionalParams = { requestOptions: {} },
): Promise<QuotaCounterCollection> {
  const result = await _listByServiceSend(
    context,
    resourceGroupName,
    serviceName,
    quotaCounterKey,
    options,
  );
  return _listByServiceDeserialize(result);
}
