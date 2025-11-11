// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceLinkerManagementContext as Client } from "../index.js";
import type {
  DryrunResource,
  DryrunPatch,
  _DryrunList,
  ConfigurationResult,
  LinkerResource,
  LinkerPatch,
  _ResourceList,
  ValidateOperationResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  dryrunResourceSerializer,
  dryrunResourceDeserializer,
  configurationInfoSerializer,
  dryrunPatchSerializer,
  _dryrunListDeserializer,
  configurationResultDeserializer,
  linkerResourceSerializer,
  linkerResourceDeserializer,
  linkerPatchSerializer,
  _resourceListDeserializer,
  validateOperationResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConnectorGenerateConfigurationsOptionalParams,
  ConnectorValidateOptionalParams,
  ConnectorListOptionalParams,
  ConnectorDeleteOptionalParams,
  ConnectorUpdateOptionalParams,
  ConnectorCreateOrUpdateOptionalParams,
  ConnectorGetOptionalParams,
  ConnectorListDryrunOptionalParams,
  ConnectorDeleteDryrunOptionalParams,
  ConnectorUpdateDryrunOptionalParams,
  ConnectorCreateDryrunOptionalParams,
  ConnectorGetDryrunOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _generateConfigurationsSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  connectorName: string,
  options: ConnectorGenerateConfigurationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceLinker/locations/{location}/connectors/{connectorName}/generateConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      connectorName: connectorName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["parameters"]
      ? options["parameters"]
      : configurationInfoSerializer(options["parameters"]),
  });
}

export async function _generateConfigurationsDeserialize(
  result: PathUncheckedResponse,
): Promise<ConfigurationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return configurationResultDeserializer(result.body);
}

/** Generate configurations for a Connector. */
export async function generateConfigurations(
  context: Client,
  resourceGroupName: string,
  location: string,
  connectorName: string,
  options: ConnectorGenerateConfigurationsOptionalParams = {
    requestOptions: {},
  },
): Promise<ConfigurationResult> {
  const result = await _generateConfigurationsSend(
    context,
    resourceGroupName,
    location,
    connectorName,
    options,
  );
  return _generateConfigurationsDeserialize(result);
}

export function _validateSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  connectorName: string,
  options: ConnectorValidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceLinker/locations/{location}/connectors/{connectorName}/validate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      connectorName: connectorName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _validateDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidateOperationResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return validateOperationResultDeserializer(result.body);
}

/** Validate a Connector. */
export function validate(
  context: Client,
  resourceGroupName: string,
  location: string,
  connectorName: string,
  options: ConnectorValidateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ValidateOperationResult>, ValidateOperationResult> {
  return getLongRunningPoller(context, _validateDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateSend(context, resourceGroupName, location, connectorName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ValidateOperationResult>, ValidateOperationResult>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  options: ConnectorListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceLinker/locations/{location}/connectors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_ResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _resourceListDeserializer(result.body);
}

/** Returns list of connector which connects to the resource, which supports to config the target service during the resource provision. */
export function list(
  context: Client,
  resourceGroupName: string,
  location: string,
  options: ConnectorListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LinkerResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, location, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  connectorName: string,
  options: ConnectorDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceLinker/locations/{location}/connectors/{connectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      connectorName: connectorName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a Connector. */
/**
 *  @fixme Delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  location: string,
  connectorName: string,
  options: ConnectorDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, location, connectorName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  connectorName: string,
  parameters: LinkerPatch,
  options: ConnectorUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceLinker/locations/{location}/connectors/{connectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      connectorName: connectorName,
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
    body: linkerPatchSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<LinkerResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return linkerResourceDeserializer(result.body);
}

/** Operation to update an existing Connector. */
export function update(
  context: Client,
  resourceGroupName: string,
  location: string,
  connectorName: string,
  parameters: LinkerPatch,
  options: ConnectorUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<LinkerResource>, LinkerResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, location, connectorName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<LinkerResource>, LinkerResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  connectorName: string,
  parameters: LinkerResource,
  options: ConnectorCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceLinker/locations/{location}/connectors/{connectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      connectorName: connectorName,
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
    body: linkerResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<LinkerResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return linkerResourceDeserializer(result.body);
}

/** Create or update Connector resource. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  location: string,
  connectorName: string,
  parameters: LinkerResource,
  options: ConnectorCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<LinkerResource>, LinkerResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, location, connectorName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<LinkerResource>, LinkerResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  connectorName: string,
  options: ConnectorGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceLinker/locations/{location}/connectors/{connectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      connectorName: connectorName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<LinkerResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return linkerResourceDeserializer(result.body);
}

/** Returns Connector resource for a given name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  location: string,
  connectorName: string,
  options: ConnectorGetOptionalParams = { requestOptions: {} },
): Promise<LinkerResource> {
  const result = await _getSend(context, resourceGroupName, location, connectorName, options);
  return _getDeserialize(result);
}

export function _listDryrunSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  options: ConnectorListDryrunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceLinker/locations/{location}/dryruns{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
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

export async function _listDryrunDeserialize(result: PathUncheckedResponse): Promise<_DryrunList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _dryrunListDeserializer(result.body);
}

/** list dryrun jobs */
export function listDryrun(
  context: Client,
  resourceGroupName: string,
  location: string,
  options: ConnectorListDryrunOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DryrunResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listDryrunSend(context, resourceGroupName, location, options),
    _listDryrunDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _deleteDryrunSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  dryrunName: string,
  options: ConnectorDeleteDryrunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceLinker/locations/{location}/dryruns/{dryrunName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      dryrunName: dryrunName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteDryrunDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** delete a dryrun job */
export async function deleteDryrun(
  context: Client,
  resourceGroupName: string,
  location: string,
  dryrunName: string,
  options: ConnectorDeleteDryrunOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteDryrunSend(context, resourceGroupName, location, dryrunName, options);
  return _deleteDryrunDeserialize(result);
}

export function _updateDryrunSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  dryrunName: string,
  parameters: DryrunPatch,
  options: ConnectorUpdateDryrunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceLinker/locations/{location}/dryruns/{dryrunName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      dryrunName: dryrunName,
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
    body: dryrunPatchSerializer(parameters),
  });
}

export async function _updateDryrunDeserialize(
  result: PathUncheckedResponse,
): Promise<DryrunResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dryrunResourceDeserializer(result.body);
}

/** update a dryrun job to do necessary check before actual creation */
export function updateDryrun(
  context: Client,
  resourceGroupName: string,
  location: string,
  dryrunName: string,
  parameters: DryrunPatch,
  options: ConnectorUpdateDryrunOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DryrunResource>, DryrunResource> {
  return getLongRunningPoller(context, _updateDryrunDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateDryrunSend(context, resourceGroupName, location, dryrunName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<DryrunResource>, DryrunResource>;
}

export function _createDryrunSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  dryrunName: string,
  parameters: DryrunResource,
  options: ConnectorCreateDryrunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceLinker/locations/{location}/dryruns/{dryrunName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      dryrunName: dryrunName,
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
    body: dryrunResourceSerializer(parameters),
  });
}

export async function _createDryrunDeserialize(
  result: PathUncheckedResponse,
): Promise<DryrunResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dryrunResourceDeserializer(result.body);
}

/** create a dryrun job to do necessary check before actual creation */
export function createDryrun(
  context: Client,
  resourceGroupName: string,
  location: string,
  dryrunName: string,
  parameters: DryrunResource,
  options: ConnectorCreateDryrunOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DryrunResource>, DryrunResource> {
  return getLongRunningPoller(context, _createDryrunDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createDryrunSend(context, resourceGroupName, location, dryrunName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<DryrunResource>, DryrunResource>;
}

export function _getDryrunSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  dryrunName: string,
  options: ConnectorGetDryrunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceLinker/locations/{location}/dryruns/{dryrunName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      dryrunName: dryrunName,
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

export async function _getDryrunDeserialize(
  result: PathUncheckedResponse,
): Promise<DryrunResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dryrunResourceDeserializer(result.body);
}

/** get a dryrun job */
export async function getDryrun(
  context: Client,
  resourceGroupName: string,
  location: string,
  dryrunName: string,
  options: ConnectorGetDryrunOptionalParams = { requestOptions: {} },
): Promise<DryrunResource> {
  const result = await _getDryrunSend(context, resourceGroupName, location, dryrunName, options);
  return _getDryrunDeserialize(result);
}
