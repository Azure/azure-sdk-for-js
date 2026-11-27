// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureResilienceManagementContext as Client } from "../index.js";
import type {
  RecoveryConfigProfile,
  RecoveryConfigProfileCreateOrUpdate,
  RecoveryConfigProfileUpdate,
  _RecoveryConfigProfileListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  recoveryConfigProfileDeserializer,
  recoveryConfigProfileCreateOrUpdateSerializer,
  recoveryConfigProfileUpdateSerializer,
  _recoveryConfigProfileListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RecoveryConfigProfilesDeleteOptionalParams,
  RecoveryConfigProfilesListOptionalParams,
  RecoveryConfigProfilesUpdateOptionalParams,
  RecoveryConfigProfilesCreateOrUpdateOptionalParams,
  RecoveryConfigProfilesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  serviceGroupName: string,
  recoveryPlanName: string,
  recoveryConfigProfileName: string,
  options: RecoveryConfigProfilesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/recoveryConfigProfiles/{recoveryConfigProfileName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      recoveryConfigProfileName: recoveryConfigProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-11-30-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a recovery configuration profile. */
export function $delete(
  context: Client,
  serviceGroupName: string,
  recoveryPlanName: string,
  recoveryConfigProfileName: string,
  options: RecoveryConfigProfilesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, serviceGroupName, recoveryPlanName, recoveryConfigProfileName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-30-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  serviceGroupName: string,
  recoveryPlanName: string,
  options: RecoveryConfigProfilesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/recoveryConfigProfiles{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-11-30-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_RecoveryConfigProfileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _recoveryConfigProfileListResultDeserializer(result.body);
}

/** Lists recovery configuration profiles under a recovery plan. */
export function list(
  context: Client,
  serviceGroupName: string,
  recoveryPlanName: string,
  options: RecoveryConfigProfilesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RecoveryConfigProfile> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, serviceGroupName, recoveryPlanName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-11-30-preview",
    },
  );
}

export function _updateSend(
  context: Client,
  serviceGroupName: string,
  recoveryPlanName: string,
  recoveryConfigProfileName: string,
  properties: RecoveryConfigProfileUpdate,
  options: RecoveryConfigProfilesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/recoveryConfigProfiles/{recoveryConfigProfileName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      recoveryConfigProfileName: recoveryConfigProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-11-30-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: recoveryConfigProfileUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<RecoveryConfigProfile> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return recoveryConfigProfileDeserializer(result.body);
}

/** Updates a recovery configuration profile. Omitted fields remain unchanged. */
export function update(
  context: Client,
  serviceGroupName: string,
  recoveryPlanName: string,
  recoveryConfigProfileName: string,
  properties: RecoveryConfigProfileUpdate,
  options: RecoveryConfigProfilesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RecoveryConfigProfile>, RecoveryConfigProfile> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        serviceGroupName,
        recoveryPlanName,
        recoveryConfigProfileName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-30-preview",
  }) as PollerLike<OperationState<RecoveryConfigProfile>, RecoveryConfigProfile>;
}

export function _createOrUpdateSend(
  context: Client,
  serviceGroupName: string,
  recoveryPlanName: string,
  recoveryConfigProfileName: string,
  resource: RecoveryConfigProfileCreateOrUpdate,
  options: RecoveryConfigProfilesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/recoveryConfigProfiles/{recoveryConfigProfileName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      recoveryConfigProfileName: recoveryConfigProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-11-30-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: recoveryConfigProfileCreateOrUpdateSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<RecoveryConfigProfile> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return recoveryConfigProfileDeserializer(result.body);
}

/** Creates or replaces a recovery configuration profile. */
export function createOrUpdate(
  context: Client,
  serviceGroupName: string,
  recoveryPlanName: string,
  recoveryConfigProfileName: string,
  resource: RecoveryConfigProfileCreateOrUpdate,
  options: RecoveryConfigProfilesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RecoveryConfigProfile>, RecoveryConfigProfile> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        serviceGroupName,
        recoveryPlanName,
        recoveryConfigProfileName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-11-30-preview",
  }) as PollerLike<OperationState<RecoveryConfigProfile>, RecoveryConfigProfile>;
}

export function _getSend(
  context: Client,
  serviceGroupName: string,
  recoveryPlanName: string,
  recoveryConfigProfileName: string,
  options: RecoveryConfigProfilesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/recoveryConfigProfiles/{recoveryConfigProfileName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      recoveryConfigProfileName: recoveryConfigProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-11-30-preview",
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
): Promise<RecoveryConfigProfile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return recoveryConfigProfileDeserializer(result.body);
}

/** Gets a recovery configuration profile. */
export async function get(
  context: Client,
  serviceGroupName: string,
  recoveryPlanName: string,
  recoveryConfigProfileName: string,
  options: RecoveryConfigProfilesGetOptionalParams = { requestOptions: {} },
): Promise<RecoveryConfigProfile> {
  const result = await _getSend(
    context,
    serviceGroupName,
    recoveryPlanName,
    recoveryConfigProfileName,
    options,
  );
  return _getDeserialize(result);
}
