// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagementGroupsAPIContext as Client } from "./index.js";
import type {
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResult,
  TenantBackfillStatusResult,
} from "../models/models.js";
import {
  checkNameAvailabilityRequestSerializer,
  checkNameAvailabilityResultDeserializer,
  errorResponseDeserializer,
  tenantBackfillStatusResultDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type {
  TenantBackfillStatusOptionalParams,
  StartTenantBackfillOptionalParams,
  CheckNameAvailabilityOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _tenantBackfillStatusSend(
  context: Client,
  options: TenantBackfillStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/tenantBackfillStatus{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _tenantBackfillStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<TenantBackfillStatusResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tenantBackfillStatusResultDeserializer(result.body);
}

/** Gets tenant backfill status */
export async function tenantBackfillStatus(
  context: Client,
  options: TenantBackfillStatusOptionalParams = { requestOptions: {} },
): Promise<TenantBackfillStatusResult> {
  const result = await _tenantBackfillStatusSend(context, options);
  return _tenantBackfillStatusDeserialize(result);
}

export function _startTenantBackfillSend(
  context: Client,
  options: StartTenantBackfillOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/startTenantBackfill{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _startTenantBackfillDeserialize(
  result: PathUncheckedResponse,
): Promise<TenantBackfillStatusResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tenantBackfillStatusResultDeserializer(result.body);
}

/** Starts backfilling subscriptions for the Tenant. */
export async function startTenantBackfill(
  context: Client,
  options: StartTenantBackfillOptionalParams = { requestOptions: {} },
): Promise<TenantBackfillStatusResult> {
  const result = await _startTenantBackfillSend(context, options);
  return _startTenantBackfillDeserialize(result);
}

export function _checkNameAvailabilitySend(
  context: Client,
  checkNameAvailabilityRequest: CheckNameAvailabilityRequest,
  options: CheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/checkNameAvailability{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkNameAvailabilityRequestSerializer(checkNameAvailabilityRequest),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return checkNameAvailabilityResultDeserializer(result.body);
}

/** Checks if the specified management group name is valid and unique */
export async function checkNameAvailability(
  context: Client,
  checkNameAvailabilityRequest: CheckNameAvailabilityRequest,
  options: CheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityResult> {
  const result = await _checkNameAvailabilitySend(context, checkNameAvailabilityRequest, options);
  return _checkNameAvailabilityDeserialize(result);
}
