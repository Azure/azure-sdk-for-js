// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftSerialConsoleContext as Client } from "../index.js";
import type {
  SerialPort,
  SerialPortListResult,
  SerialPortConnectResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  serialPortSerializer,
  serialPortDeserializer,
  serialPortListResultDeserializer,
  serialPortConnectResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SerialPortsConnectOptionalParams,
  SerialPortsListBySubscriptionsOptionalParams,
  SerialPortsListOptionalParams,
  SerialPortsCreateOptionalParams,
  SerialPortsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _connectSend(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourceType: string,
  parentResource: string,
  serialPort: string,
  options: SerialPortsConnectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{+parentResourceType}/{parentResource}/providers/Microsoft.SerialConsole/serialPorts/{serialPort}/connect{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceProviderNamespace: resourceProviderNamespace,
      parentResourceType: parentResourceType,
      parentResource: parentResource,
      serialPort: serialPort,
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

export async function _connectDeserialize(
  result: PathUncheckedResponse,
): Promise<SerialPortConnectResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return serialPortConnectResultDeserializer(result.body);
}

/** Connect to serial port of the target resource */
export async function connect(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourceType: string,
  parentResource: string,
  serialPort: string,
  options: SerialPortsConnectOptionalParams = { requestOptions: {} },
): Promise<SerialPortConnectResult> {
  const result = await _connectSend(
    context,
    resourceGroupName,
    resourceProviderNamespace,
    parentResourceType,
    parentResource,
    serialPort,
    options,
  );
  return _connectDeserialize(result);
}

export function _listBySubscriptionsSend(
  context: Client,
  options: SerialPortsListBySubscriptionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.SerialConsole/serialPorts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listBySubscriptionsDeserialize(
  result: PathUncheckedResponse,
): Promise<SerialPortListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return serialPortListResultDeserializer(result.body);
}

/** Handles requests to list all SerialPort resources in a subscription. */
export async function listBySubscriptions(
  context: Client,
  options: SerialPortsListBySubscriptionsOptionalParams = { requestOptions: {} },
): Promise<SerialPortListResult> {
  const result = await _listBySubscriptionsSend(context, options);
  return _listBySubscriptionsDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourceType: string,
  parentResource: string,
  options: SerialPortsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{+parentResourceType}/{parentResource}/providers/Microsoft.SerialConsole/serialPorts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceProviderNamespace: resourceProviderNamespace,
      parentResourceType: parentResourceType,
      parentResource: parentResource,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<SerialPortListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return serialPortListResultDeserializer(result.body);
}

/** Lists all of the configured serial ports for a parent resource */
export async function list(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourceType: string,
  parentResource: string,
  options: SerialPortsListOptionalParams = { requestOptions: {} },
): Promise<SerialPortListResult> {
  const result = await _listSend(
    context,
    resourceGroupName,
    resourceProviderNamespace,
    parentResourceType,
    parentResource,
    options,
  );
  return _listDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourceType: string,
  parentResource: string,
  serialPort: string,
  parameters: SerialPort,
  options: SerialPortsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{+parentResourceType}/{parentResource}/providers/Microsoft.SerialConsole/serialPorts/{serialPort}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceProviderNamespace: resourceProviderNamespace,
      parentResourceType: parentResourceType,
      parentResource: parentResource,
      serialPort: serialPort,
      "api%2Dversion": context.apiVersion ?? "2024-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: serialPortSerializer(parameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<SerialPort> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return serialPortDeserializer(result.body);
}

/** Creates or updates a serial port */
export async function create(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourceType: string,
  parentResource: string,
  serialPort: string,
  parameters: SerialPort,
  options: SerialPortsCreateOptionalParams = { requestOptions: {} },
): Promise<SerialPort> {
  const result = await _createSend(
    context,
    resourceGroupName,
    resourceProviderNamespace,
    parentResourceType,
    parentResource,
    serialPort,
    parameters,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourceType: string,
  parentResource: string,
  serialPort: string,
  options: SerialPortsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{+parentResourceType}/{parentResource}/providers/Microsoft.SerialConsole/serialPorts/{serialPort}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceProviderNamespace: resourceProviderNamespace,
      parentResourceType: parentResourceType,
      parentResource: parentResource,
      serialPort: serialPort,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SerialPort> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return serialPortDeserializer(result.body);
}

/** Gets the configured settings for a serial port */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourceType: string,
  parentResource: string,
  serialPort: string,
  options: SerialPortsGetOptionalParams = { requestOptions: {} },
): Promise<SerialPort> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceProviderNamespace,
    parentResourceType,
    parentResource,
    serialPort,
    options,
  );
  return _getDeserialize(result);
}
