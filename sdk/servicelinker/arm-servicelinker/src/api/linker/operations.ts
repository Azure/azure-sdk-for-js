// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceLinkerManagementContext as Client } from "../index.js";
import type {
  ConfigurationResult,
  LinkerResource,
  LinkerPatch,
  _ResourceList,
  ValidateOperationResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
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
  LinkerListConfigurationsOptionalParams,
  LinkerValidateOptionalParams,
  LinkerListOptionalParams,
  LinkerDeleteOptionalParams,
  LinkerUpdateOptionalParams,
  LinkerCreateOrUpdateOptionalParams,
  LinkerGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listConfigurationsSend(
  context: Client,
  resourceUri: string,
  linkerName: string,
  options: LinkerListConfigurationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ServiceLinker/linkers/{linkerName}/listConfigurations{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      linkerName: linkerName,
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

export async function _listConfigurationsDeserialize(
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

/** list source configurations for a Linker. */
export async function listConfigurations(
  context: Client,
  resourceUri: string,
  linkerName: string,
  options: LinkerListConfigurationsOptionalParams = { requestOptions: {} },
): Promise<ConfigurationResult> {
  const result = await _listConfigurationsSend(context, resourceUri, linkerName, options);
  return _listConfigurationsDeserialize(result);
}

export function _validateSend(
  context: Client,
  resourceUri: string,
  linkerName: string,
  options: LinkerValidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ServiceLinker/linkers/{linkerName}/validateLinker{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      linkerName: linkerName,
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

/** Validate a Linker. */
export function validate(
  context: Client,
  resourceUri: string,
  linkerName: string,
  options: LinkerValidateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ValidateOperationResult>, ValidateOperationResult> {
  return getLongRunningPoller(context, _validateDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _validateSend(context, resourceUri, linkerName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ValidateOperationResult>, ValidateOperationResult>;
}

export function _listSend(
  context: Client,
  resourceUri: string,
  options: LinkerListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ServiceLinker/linkers{?api%2Dversion}",
    {
      resourceUri: resourceUri,
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

/** Returns list of Linkers which connects to the resource. which supports to config both application and target service during the resource provision. */
export function list(
  context: Client,
  resourceUri: string,
  options: LinkerListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LinkerResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceUri, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceUri: string,
  linkerName: string,
  options: LinkerDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ServiceLinker/linkers/{linkerName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      linkerName: linkerName,
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

/** Delete a Linker. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceUri: string,
  linkerName: string,
  options: LinkerDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceUri, linkerName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceUri: string,
  linkerName: string,
  parameters: LinkerPatch,
  options: LinkerUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ServiceLinker/linkers/{linkerName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      linkerName: linkerName,
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
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return linkerResourceDeserializer(result.body);
}

/** Operation to update an existing Linker. */
export function update(
  context: Client,
  resourceUri: string,
  linkerName: string,
  parameters: LinkerPatch,
  options: LinkerUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<LinkerResource>, LinkerResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateSend(context, resourceUri, linkerName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<LinkerResource>, LinkerResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceUri: string,
  linkerName: string,
  parameters: LinkerResource,
  options: LinkerCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ServiceLinker/linkers/{linkerName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      linkerName: linkerName,
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

/** Create or update Linker resource. */
export function createOrUpdate(
  context: Client,
  resourceUri: string,
  linkerName: string,
  parameters: LinkerResource,
  options: LinkerCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<LinkerResource>, LinkerResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceUri, linkerName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<LinkerResource>, LinkerResource>;
}

export function _getSend(
  context: Client,
  resourceUri: string,
  linkerName: string,
  options: LinkerGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ServiceLinker/linkers/{linkerName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      linkerName: linkerName,
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

/** Returns Linker resource for a given name. */
export async function get(
  context: Client,
  resourceUri: string,
  linkerName: string,
  options: LinkerGetOptionalParams = { requestOptions: {} },
): Promise<LinkerResource> {
  const result = await _getSend(context, resourceUri, linkerName, options);
  return _getDeserialize(result);
}
