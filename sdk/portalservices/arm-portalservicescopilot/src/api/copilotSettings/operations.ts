// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PortalServicesContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  CopilotSettingsResource,
  copilotSettingsResourceSerializer,
  copilotSettingsResourceDeserializer,
  CopilotSettingsResourceUpdate,
  copilotSettingsResourceUpdateSerializer,
} from "../../models/models.js";
import {
  CopilotSettingsDeleteOptionalParams,
  CopilotSettingsUpdateOptionalParams,
  CopilotSettingsCreateOrUpdateOptionalParams,
  CopilotSettingsGetOptionalParams,
} from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  options: CopilotSettingsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.PortalServices/copilotSettings/default{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a CopilotSettingsResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  options: CopilotSettingsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  properties: CopilotSettingsResourceUpdate,
  options: CopilotSettingsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.PortalServices/copilotSettings/default{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: copilotSettingsResourceUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<CopilotSettingsResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return copilotSettingsResourceDeserializer(result.body);
}

/** Update a CopilotSettingsResource */
export async function update(
  context: Client,
  properties: CopilotSettingsResourceUpdate,
  options: CopilotSettingsUpdateOptionalParams = { requestOptions: {} },
): Promise<CopilotSettingsResource> {
  const result = await _updateSend(context, properties, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resource: CopilotSettingsResource,
  options: CopilotSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.PortalServices/copilotSettings/default{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: copilotSettingsResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CopilotSettingsResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return copilotSettingsResourceDeserializer(result.body);
}

/** Create a CopilotSettingsResource */
export async function createOrUpdate(
  context: Client,
  resource: CopilotSettingsResource,
  options: CopilotSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<CopilotSettingsResource> {
  const result = await _createOrUpdateSend(context, resource, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  options: CopilotSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.PortalServices/copilotSettings/default{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<CopilotSettingsResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return copilotSettingsResourceDeserializer(result.body);
}

/** Get a CopilotSettingsResource */
export async function get(
  context: Client,
  options: CopilotSettingsGetOptionalParams = { requestOptions: {} },
): Promise<CopilotSettingsResource> {
  const result = await _getSend(context, options);
  return _getDeserialize(result);
}
