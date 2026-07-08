// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type {
  DiagnosticsSettingsDiagnosticSettingsResource,
  _DiagnosticsSettingsDiagnosticSettingsResourceCollection,
} from "../../models/diagnosticsSettings/models.js";
import {
  diagnosticsSettingsDiagnosticSettingsResourceSerializer,
  diagnosticsSettingsDiagnosticSettingsResourceDeserializer,
  _diagnosticsSettingsDiagnosticSettingsResourceCollectionDeserializer,
} from "../../models/diagnosticsSettings/models.js";
import { microsoftCommonErrorResponseDeserializer } from "../../models/microsoft/common/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DiagnosticSettingsListOptionalParams,
  DiagnosticSettingsDeleteOptionalParams,
  DiagnosticSettingsCreateOrUpdateOptionalParams,
  DiagnosticSettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceUri: string,
  options: DiagnosticSettingsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Insights/diagnosticSettings{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": "2021-05-01-preview",
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
): Promise<_DiagnosticsSettingsDiagnosticSettingsResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = microsoftCommonErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _diagnosticsSettingsDiagnosticSettingsResourceCollectionDeserializer(result.body);
}

/** Gets the active diagnostic settings list for the specified resource. */
export function list(
  context: Client,
  resourceUri: string,
  options: DiagnosticSettingsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DiagnosticsSettingsDiagnosticSettingsResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceUri, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2021-05-01-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceUri: string,
  name: string,
  options: DiagnosticSettingsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Insights/diagnosticSettings/{name}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      name: name,
      "api%2Dversion": "2021-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = microsoftCommonErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes existing diagnostic settings for the specified resource. */
export async function $delete(
  context: Client,
  resourceUri: string,
  name: string,
  options: DiagnosticSettingsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceUri, name, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceUri: string,
  name: string,
  parameters: DiagnosticsSettingsDiagnosticSettingsResource,
  options: DiagnosticSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Insights/diagnosticSettings/{name}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      name: name,
      "api%2Dversion": "2021-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: diagnosticsSettingsDiagnosticSettingsResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DiagnosticsSettingsDiagnosticSettingsResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = microsoftCommonErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return diagnosticsSettingsDiagnosticSettingsResourceDeserializer(result.body);
}

/** Creates or updates diagnostic settings for the specified resource. */
export async function createOrUpdate(
  context: Client,
  resourceUri: string,
  name: string,
  parameters: DiagnosticsSettingsDiagnosticSettingsResource,
  options: DiagnosticSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<DiagnosticsSettingsDiagnosticSettingsResource> {
  const result = await _createOrUpdateSend(context, resourceUri, name, parameters, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceUri: string,
  name: string,
  options: DiagnosticSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Insights/diagnosticSettings/{name}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      name: name,
      "api%2Dversion": "2021-05-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<DiagnosticsSettingsDiagnosticSettingsResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = microsoftCommonErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return diagnosticsSettingsDiagnosticSettingsResourceDeserializer(result.body);
}

/** Gets the active diagnostic settings for the specified resource. */
export async function get(
  context: Client,
  resourceUri: string,
  name: string,
  options: DiagnosticSettingsGetOptionalParams = { requestOptions: {} },
): Promise<DiagnosticsSettingsDiagnosticSettingsResource> {
  const result = await _getSend(context, resourceUri, name, options);
  return _getDeserialize(result);
}
