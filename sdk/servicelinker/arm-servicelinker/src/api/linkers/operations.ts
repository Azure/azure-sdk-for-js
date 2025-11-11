// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceLinkerManagementContext as Client } from "../index.js";
import type {
  DryrunResource,
  DryrunPatch,
  _DryrunList,
  ConfigurationResult,
  _DaprConfigurationList,
  DaprConfigurationResource,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  dryrunResourceSerializer,
  dryrunResourceDeserializer,
  configurationInfoSerializer,
  dryrunPatchSerializer,
  _dryrunListDeserializer,
  configurationResultDeserializer,
  _daprConfigurationListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LinkersListDaprConfigurationsOptionalParams,
  LinkersGenerateConfigurationsOptionalParams,
  LinkersListDryrunOptionalParams,
  LinkersDeleteDryrunOptionalParams,
  LinkersUpdateDryrunOptionalParams,
  LinkersCreateDryrunOptionalParams,
  LinkersGetDryrunOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listDaprConfigurationsSend(
  context: Client,
  resourceUri: string,
  options: LinkersListDaprConfigurationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ServiceLinker/daprConfigurations{?api%2Dversion}",
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

export async function _listDaprConfigurationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_DaprConfigurationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _daprConfigurationListDeserializer(result.body);
}

/** List the dapr configuration supported by Service Connector. */
export function listDaprConfigurations(
  context: Client,
  resourceUri: string,
  options: LinkersListDaprConfigurationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DaprConfigurationResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listDaprConfigurationsSend(context, resourceUri, options),
    _listDaprConfigurationsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _generateConfigurationsSend(
  context: Client,
  resourceUri: string,
  linkerName: string,
  options: LinkersGenerateConfigurationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ServiceLinker/linkers/{linkerName}/generateConfigurations{?api%2Dversion}",
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

/** Generate configurations for a Linker. */
export async function generateConfigurations(
  context: Client,
  resourceUri: string,
  linkerName: string,
  options: LinkersGenerateConfigurationsOptionalParams = { requestOptions: {} },
): Promise<ConfigurationResult> {
  const result = await _generateConfigurationsSend(context, resourceUri, linkerName, options);
  return _generateConfigurationsDeserialize(result);
}

export function _listDryrunSend(
  context: Client,
  resourceUri: string,
  options: LinkersListDryrunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ServiceLinker/dryruns{?api%2Dversion}",
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
  resourceUri: string,
  options: LinkersListDryrunOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DryrunResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listDryrunSend(context, resourceUri, options),
    _listDryrunDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _deleteDryrunSend(
  context: Client,
  resourceUri: string,
  dryrunName: string,
  options: LinkersDeleteDryrunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ServiceLinker/dryruns/{dryrunName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
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
  resourceUri: string,
  dryrunName: string,
  options: LinkersDeleteDryrunOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteDryrunSend(context, resourceUri, dryrunName, options);
  return _deleteDryrunDeserialize(result);
}

export function _updateDryrunSend(
  context: Client,
  resourceUri: string,
  dryrunName: string,
  parameters: DryrunPatch,
  options: LinkersUpdateDryrunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ServiceLinker/dryruns/{dryrunName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
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

/** add a dryrun job to do necessary check before actual creation */
export function updateDryrun(
  context: Client,
  resourceUri: string,
  dryrunName: string,
  parameters: DryrunPatch,
  options: LinkersUpdateDryrunOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DryrunResource>, DryrunResource> {
  return getLongRunningPoller(context, _updateDryrunDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateDryrunSend(context, resourceUri, dryrunName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<DryrunResource>, DryrunResource>;
}

export function _createDryrunSend(
  context: Client,
  resourceUri: string,
  dryrunName: string,
  parameters: DryrunResource,
  options: LinkersCreateDryrunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ServiceLinker/dryruns/{dryrunName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
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
  resourceUri: string,
  dryrunName: string,
  parameters: DryrunResource,
  options: LinkersCreateDryrunOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DryrunResource>, DryrunResource> {
  return getLongRunningPoller(context, _createDryrunDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createDryrunSend(context, resourceUri, dryrunName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<DryrunResource>, DryrunResource>;
}

export function _getDryrunSend(
  context: Client,
  resourceUri: string,
  dryrunName: string,
  options: LinkersGetDryrunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ServiceLinker/dryruns/{dryrunName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
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
  resourceUri: string,
  dryrunName: string,
  options: LinkersGetDryrunOptionalParams = { requestOptions: {} },
): Promise<DryrunResource> {
  const result = await _getDryrunSend(context, resourceUri, dryrunName, options);
  return _getDryrunDeserialize(result);
}
