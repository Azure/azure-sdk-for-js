// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type {
  DiagnosticSettingsCategoryResource,
  _DiagnosticSettingsCategoryResourceCollection,
} from "../../models/diagnosticsSettings/models.js";
import {
  diagnosticSettingsCategoryResourceDeserializer,
  _diagnosticSettingsCategoryResourceCollectionDeserializer,
} from "../../models/diagnosticsSettings/models.js";
import { errorResponseDeserializer } from "../../models/microsoft/common/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DiagnosticSettingsCategoryListOptionalParams,
  DiagnosticSettingsCategoryGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceUri: string,
  options: DiagnosticSettingsCategoryListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Insights/diagnosticSettingsCategories{?api%2Dversion}",
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
): Promise<_DiagnosticSettingsCategoryResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _diagnosticSettingsCategoryResourceCollectionDeserializer(result.body);
}

/** Lists the diagnostic settings categories for the specified resource. */
export function list(
  context: Client,
  resourceUri: string,
  options: DiagnosticSettingsCategoryListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DiagnosticSettingsCategoryResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceUri, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2021-05-01-preview" },
  );
}

export function _getSend(
  context: Client,
  resourceUri: string,
  name: string,
  options: DiagnosticSettingsCategoryGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Insights/diagnosticSettingsCategories/{name}{?api%2Dversion}",
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
): Promise<DiagnosticSettingsCategoryResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return diagnosticSettingsCategoryResourceDeserializer(result.body);
}

/** Gets the diagnostic settings category for the specified resource. */
export async function get(
  context: Client,
  resourceUri: string,
  name: string,
  options: DiagnosticSettingsCategoryGetOptionalParams = { requestOptions: {} },
): Promise<DiagnosticSettingsCategoryResource> {
  const result = await _getSend(context, resourceUri, name, options);
  return _getDeserialize(result);
}
