// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  OperationResultContract,
  operationResultContractDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { PolicyRestrictionValidationsByServiceOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _byServiceSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: PolicyRestrictionValidationsByServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/validatePolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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

export async function _byServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationResultContract> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return operationResultContractDeserializer(result.body);
}

/** Validate all policies of API Management services. */
export function byService(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: PolicyRestrictionValidationsByServiceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationResultContract>, OperationResultContract> {
  return getLongRunningPoller(context, _byServiceDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _byServiceSend(context, resourceGroupName, serviceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<OperationResultContract>, OperationResultContract>;
}
