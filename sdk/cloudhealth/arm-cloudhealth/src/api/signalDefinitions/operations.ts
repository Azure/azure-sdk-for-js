// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SignalDefinition,
  signalDefinitionSerializer,
  signalDefinitionDeserializer,
  _SignalDefinitionListResult,
  _signalDefinitionListResultDeserializer,
} from "../../models/models.js";
import {
  SignalDefinitionsListByHealthModelOptionalParams,
  SignalDefinitionsDeleteOptionalParams,
  SignalDefinitionsCreateOrUpdateOptionalParams,
  SignalDefinitionsGetOptionalParams,
} from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByHealthModelSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  options: SignalDefinitionsListByHealthModelOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/signaldefinitions{?api%2Dversion,timestamp}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      "api%2Dversion": context.apiVersion,
      timestamp: !options?.timestamp ? options?.timestamp : options?.timestamp.toISOString(),
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

export async function _listByHealthModelDeserialize(
  result: PathUncheckedResponse,
): Promise<_SignalDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _signalDefinitionListResultDeserializer(result.body);
}

/** List SignalDefinition resources by HealthModel */
export function listByHealthModel(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  options: SignalDefinitionsListByHealthModelOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SignalDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listByHealthModelSend(context, resourceGroupName, healthModelName, options),
    _listByHealthModelDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  signalDefinitionName: string,
  options: SignalDefinitionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/signaldefinitions/{signalDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      signalDefinitionName: signalDefinitionName,
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

/** Delete a SignalDefinition */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  signalDefinitionName: string,
  options: SignalDefinitionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    healthModelName,
    signalDefinitionName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  signalDefinitionName: string,
  resource: SignalDefinition,
  options: SignalDefinitionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/signaldefinitions/{signalDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      signalDefinitionName: signalDefinitionName,
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
    body: signalDefinitionSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SignalDefinition> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return signalDefinitionDeserializer(result.body);
}

/** Create a SignalDefinition */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  signalDefinitionName: string,
  resource: SignalDefinition,
  options: SignalDefinitionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<SignalDefinition> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    healthModelName,
    signalDefinitionName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  signalDefinitionName: string,
  options: SignalDefinitionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/signaldefinitions/{signalDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      signalDefinitionName: signalDefinitionName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SignalDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return signalDefinitionDeserializer(result.body);
}

/** Get a SignalDefinition */
export async function get(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  signalDefinitionName: string,
  options: SignalDefinitionsGetOptionalParams = { requestOptions: {} },
): Promise<SignalDefinition> {
  const result = await _getSend(
    context,
    resourceGroupName,
    healthModelName,
    signalDefinitionName,
    options,
  );
  return _getDeserialize(result);
}
