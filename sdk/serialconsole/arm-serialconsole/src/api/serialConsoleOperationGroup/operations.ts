// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftSerialConsoleContext as Client } from "../index.js";
import type { DisableSerialConsoleResult, EnableSerialConsoleResult } from "../../models/models.js";
import {
  getSerialConsoleSubscriptionNotFoundDeserializer,
  cloudErrorDeserializer,
  disableSerialConsoleResultDeserializer,
  enableSerialConsoleResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SerialConsoleOperationGroupEnableConsoleOptionalParams,
  SerialConsoleOperationGroupDisableConsoleOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _enableConsoleSend(
  context: Client,
  defaultParam: string,
  options: SerialConsoleOperationGroupEnableConsoleOptionalParams = { requestOptions: {} },
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
  return context.path(path).post({
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
      error.details = getSerialConsoleSubscriptionNotFoundDeserializer(result.body);
    } else {
      error.details = cloudErrorDeserializer(result.body);
    }
    throw error;
  }

  return enableSerialConsoleResultDeserializer(result.body);
}

/** Enables the Serial Console service for all VMs and VM scale sets in the provided subscription */
export async function enableConsole(
  context: Client,
  defaultParam: string,
  options: SerialConsoleOperationGroupEnableConsoleOptionalParams = { requestOptions: {} },
): Promise<EnableSerialConsoleResult> {
  const result = await _enableConsoleSend(context, defaultParam, options);
  return _enableConsoleDeserialize(result);
}

export function _disableConsoleSend(
  context: Client,
  defaultParam: string,
  options: SerialConsoleOperationGroupDisableConsoleOptionalParams = { requestOptions: {} },
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
  return context.path(path).post({
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
      error.details = getSerialConsoleSubscriptionNotFoundDeserializer(result.body);
    } else {
      error.details = cloudErrorDeserializer(result.body);
    }
    throw error;
  }

  return disableSerialConsoleResultDeserializer(result.body);
}

/** Disables the Serial Console service for all VMs and VM scale sets in the provided subscription */
export async function disableConsole(
  context: Client,
  defaultParam: string,
  options: SerialConsoleOperationGroupDisableConsoleOptionalParams = { requestOptions: {} },
): Promise<DisableSerialConsoleResult> {
  const result = await _disableConsoleSend(context, defaultParam, options);
  return _disableConsoleDeserialize(result);
}
