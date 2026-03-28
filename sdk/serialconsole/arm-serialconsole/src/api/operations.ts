// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftSerialConsoleContext as Client } from "./index.js";
import type { SerialConsoleStatus, SerialConsoleOperations } from "../models/models.js";
import {
  serialConsoleStatusDeserializer,
  getSerialConsoleSubscriptionNotFoundDeserializer,
  cloudErrorDeserializer,
  serialConsoleOperationsDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type { ListOperationsOptionalParams, GetConsoleStatusOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listOperationsSend(
  context: Client,
  options: ListOperationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.SerialConsole/operations{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-07-01",
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

export async function _listOperationsDeserialize(
  result: PathUncheckedResponse,
): Promise<SerialConsoleOperations> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return serialConsoleOperationsDeserializer(result.body);
}

/** Gets a list of Serial Console API operations. */
export async function listOperations(
  context: Client,
  options: ListOperationsOptionalParams = { requestOptions: {} },
): Promise<SerialConsoleOperations> {
  const result = await _listOperationsSend(context, options);
  return _listOperationsDeserialize(result);
}

export function _getConsoleStatusSend(
  context: Client,
  defaultParam: string,
  options: GetConsoleStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.SerialConsole/consoleServices/{default}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      default: defaultParam,
      "api%2Dversion": context.apiVersion ?? "2024-07-01",
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

export async function _getConsoleStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<SerialConsoleStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const statusCode = Number.parseInt(result.status);
    if (statusCode === 404) {
      error.details = getSerialConsoleSubscriptionNotFoundDeserializer(result.body);
    } else {
      error.details = cloudErrorDeserializer(result.body);
    }
    throw error;
  }

  return serialConsoleStatusDeserializer(result.body);
}

/** Gets whether or not Serial Console is disabled for a given subscription */
export async function getConsoleStatus(
  context: Client,
  defaultParam: string,
  options: GetConsoleStatusOptionalParams = { requestOptions: {} },
): Promise<SerialConsoleStatus> {
  const result = await _getConsoleStatusSend(context, defaultParam, options);
  return _getConsoleStatusDeserialize(result);
}
