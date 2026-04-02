// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext as Client } from "../index.js";
import type {
  RaiExternalSafetyProviderSchema,
  RaiExternalSafetyProviderCreateOrUpdateResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  raiExternalSafetyProviderSchemaSerializer,
  raiExternalSafetyProviderSchemaDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RaiExternalSafetyProviderDeleteOptionalParams,
  RaiExternalSafetyProviderCreateOrUpdateOptionalParams,
  RaiExternalSafetyProviderGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  safetyProviderName: string,
  options: RaiExternalSafetyProviderDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/raiExternalSafetyProviders/{safetyProviderName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      safetyProviderName: safetyProviderName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the specified custom topic associated with the subscription. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  safetyProviderName: string,
  options: RaiExternalSafetyProviderDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, safetyProviderName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  safetyProviderName: string,
  safetyProvider: RaiExternalSafetyProviderSchema,
  options: RaiExternalSafetyProviderCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/raiExternalSafetyProviders/{safetyProviderName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      safetyProviderName: safetyProviderName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: raiExternalSafetyProviderSchemaSerializer(safetyProvider),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<RaiExternalSafetyProviderCreateOrUpdateResponse> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return { body: result.body as any };
}

/** Create the rai safety provider associated with the subscription. */
export async function createOrUpdate(
  context: Client,
  safetyProviderName: string,
  safetyProvider: RaiExternalSafetyProviderSchema,
  options: RaiExternalSafetyProviderCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<RaiExternalSafetyProviderCreateOrUpdateResponse> {
  const result = await _createOrUpdateSend(context, safetyProviderName, safetyProvider, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  safetyProviderName: string,
  options: RaiExternalSafetyProviderGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/raiExternalSafetyProviders/{safetyProviderName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      safetyProviderName: safetyProviderName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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
): Promise<RaiExternalSafetyProviderSchema> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return raiExternalSafetyProviderSchemaDeserializer(result.body);
}

/** Gets the specified external safety provider associated with the Subscription */
export async function get(
  context: Client,
  safetyProviderName: string,
  options: RaiExternalSafetyProviderGetOptionalParams = { requestOptions: {} },
): Promise<RaiExternalSafetyProviderSchema> {
  const result = await _getSend(context, safetyProviderName, options);
  return _getDeserialize(result);
}
