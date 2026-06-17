// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSerialConsoleContext as Client } from "./index.js";
import {
  SerialConsoleStatus,
  serialConsoleStatusDeserializer,
  getSerialConsoleSubscriptionNotFoundDeserializer,
  cloudErrorDeserializer,
  SerialConsoleOperations,
  serialConsoleOperationsDeserializer,
  DisableSerialConsoleResult,
  disableSerialConsoleResultDeserializer,
  EnableSerialConsoleResult,
  enableSerialConsoleResultDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import {
  EnableConsoleOptionalParams,
  DisableConsoleOptionalParams,
  ListOperationsOptionalParams,
  GetConsoleStatusOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _enableConsoleSend(
  context: Client,
  defaultParam: string,
  options: EnableConsoleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.SerialConsole/consoleServices/{default}/enableConsole{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      default: defaultParam,
      "api%2Dversion": context.apiVersion ?? "2024-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _enableConsoleDeserialize(
  result: PathUncheckedResponse,
): Promise<EnableSerialConsoleResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const statusCode = Number.parseInt(result.status);
    if (statusCode === 404) {
      if (result.body) {
        error.details = getSerialConsoleSubscriptionNotFoundDeserializer(result.body);
      }
    } else {
      if (result.body) {
        error.details = cloudErrorDeserializer(result.body);
      }
    }
    throw error;
  }

  return enableSerialConsoleResultDeserializer(result.body);
}

/** Enables the Serial Console service for all VMs and VM scale sets in the provided subscription */
export async function enableConsole(
  context: Client,
  defaultParam: string,
  options: EnableConsoleOptionalParams = { requestOptions: {} },
): Promise<EnableSerialConsoleResult> {
  const result = await _enableConsoleSend(context, defaultParam, options);
  return _enableConsoleDeserialize(result);
}

export function _disableConsoleSend(
  context: Client,
  defaultParam: string,
  options: DisableConsoleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.SerialConsole/consoleServices/{default}/disableConsole{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      default: defaultParam,
      "api%2Dversion": context.apiVersion ?? "2024-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _disableConsoleDeserialize(
  result: PathUncheckedResponse,
): Promise<DisableSerialConsoleResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const statusCode = Number.parseInt(result.status);
    if (statusCode === 404) {
      if (result.body) {
        error.details = getSerialConsoleSubscriptionNotFoundDeserializer(result.body);
      }
    } else {
      if (result.body) {
        error.details = cloudErrorDeserializer(result.body);
      }
    }
    throw error;
  }

  return disableSerialConsoleResultDeserializer(result.body);
}

/** Disables the Serial Console service for all VMs and VM scale sets in the provided subscription */
export async function disableConsole(
  context: Client,
  defaultParam: string,
  options: DisableConsoleOptionalParams = { requestOptions: {} },
): Promise<DisableSerialConsoleResult> {
  const result = await _disableConsoleSend(context, defaultParam, options);
  return _disableConsoleDeserialize(result);
}

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
  return context
    .path(path)
    .get({
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
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

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
  return context
    .path(path)
    .get({
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
      if (result.body) {
        error.details = getSerialConsoleSubscriptionNotFoundDeserializer(result.body);
      }
    } else {
      if (result.body) {
        error.details = cloudErrorDeserializer(result.body);
      }
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
