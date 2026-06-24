// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DynatraceObservabilityContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  CreateResourceSupportedResponse,
  createResourceSupportedResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  CreationSupportedGetOptionalParams,
  CreationSupportedListOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  dynatraceEnvironmentId: string,
  options: CreationSupportedGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Dynatrace.Observability/subscriptionStatuses/{dynatraceEnvironmentId}/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      dynatraceEnvironmentId: dynatraceEnvironmentId,
      "api%2Dversion": context.apiVersion ?? "2024-04-24",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<CreateResourceSupportedResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return createResourceSupportedResponseDeserializer(result.body);
}

/** Informs if the current subscription is being already monitored for selected Dynatrace environment. */
export async function get(
  context: Client,
  dynatraceEnvironmentId: string,
  options: CreationSupportedGetOptionalParams = { requestOptions: {} },
): Promise<CreateResourceSupportedResponse> {
  const result = await _getSend(context, dynatraceEnvironmentId, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  dynatraceEnvironmentId: string,
  options: CreationSupportedListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Dynatrace.Observability/subscriptionStatuses/{dynatraceEnvironmentId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      dynatraceEnvironmentId: dynatraceEnvironmentId,
      "api%2Dversion": context.apiVersion ?? "2024-04-24",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<CreateResourceSupportedResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return createResourceSupportedResponseDeserializer(result.body);
}

/** Informs if the current subscription is being already monitored for selected Dynatrace environment. */
export async function list(
  context: Client,
  dynatraceEnvironmentId: string,
  options: CreationSupportedListOptionalParams = { requestOptions: {} },
): Promise<CreateResourceSupportedResponse> {
  const result = await _listSend(context, dynatraceEnvironmentId, options);
  return _listDeserialize(result);
}
