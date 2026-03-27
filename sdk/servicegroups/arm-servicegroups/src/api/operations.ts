// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagementContext as Client } from "./index.js";
import type { ServiceGroup } from "../models/models.js";
import {
  serviceGroupSerializer,
  serviceGroupDeserializer,
  errorResponseDeserializer,
} from "../models/models.js";
import { getLongRunningPoller } from "../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type {
  DeleteServiceGroupOptionalParams,
  UpdateServiceGroupOptionalParams,
  CreateOrUpdateServiceGroupOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _deleteServiceGroupSend(
  context: Client,
  serviceGroupName: string,
  options: DeleteServiceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      "api%2Dversion": context.apiVersion ?? "2024-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteServiceGroupDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a ServiceGroup */
export function deleteServiceGroup(
  context: Client,
  serviceGroupName: string,
  options: DeleteServiceGroupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteServiceGroupDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _deleteServiceGroupSend(context, serviceGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-02-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateServiceGroupSend(
  context: Client,
  serviceGroupName: string,
  updateServiceGroupRequest: ServiceGroup,
  options: UpdateServiceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      "api%2Dversion": context.apiVersion ?? "2024-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: serviceGroupSerializer(updateServiceGroupRequest),
  });
}

export async function _updateServiceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<ServiceGroup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serviceGroupDeserializer(result.body);
}

/** Update a serviceGroup */
export function updateServiceGroup(
  context: Client,
  serviceGroupName: string,
  updateServiceGroupRequest: ServiceGroup,
  options: UpdateServiceGroupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ServiceGroup>, ServiceGroup> {
  return getLongRunningPoller(context, _updateServiceGroupDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateServiceGroupSend(context, serviceGroupName, updateServiceGroupRequest, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-02-01-preview",
  }) as PollerLike<OperationState<ServiceGroup>, ServiceGroup>;
}

export function _createOrUpdateServiceGroupSend(
  context: Client,
  serviceGroupName: string,
  createServiceGroupRequest: ServiceGroup,
  options: CreateOrUpdateServiceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      "api%2Dversion": context.apiVersion ?? "2024-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: serviceGroupSerializer(createServiceGroupRequest),
  });
}

export async function _createOrUpdateServiceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<ServiceGroup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serviceGroupDeserializer(result.body);
}

/** Create or Update a serviceGroup */
export function createOrUpdateServiceGroup(
  context: Client,
  serviceGroupName: string,
  createServiceGroupRequest: ServiceGroup,
  options: CreateOrUpdateServiceGroupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ServiceGroup>, ServiceGroup> {
  return getLongRunningPoller(
    context,
    _createOrUpdateServiceGroupDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateServiceGroupSend(
          context,
          serviceGroupName,
          createServiceGroupRequest,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
      apiVersion: context.apiVersion ?? "2024-02-01-preview",
    },
  ) as PollerLike<OperationState<ServiceGroup>, ServiceGroup>;
}
