// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type { Sli, _SliListResult } from "../../models/models.js";
import {
  sliSerializer,
  sliDeserializer,
  errorResponseDeserializer,
  _sliListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SlisListByParentOptionalParams,
  SlisDeleteOptionalParams,
  SlisCreateOrUpdateOptionalParams,
  SlisGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByParentSend(
  context: Client,
  serviceGroupName: string,
  options: SlisListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.Monitor/slis{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_SliListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _sliListResultDeserializer(result.body);
}

/** Lists all SLI resources under a parent resource. */
export function listByParent(
  context: Client,
  serviceGroupName: string,
  options: SlisListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Sli> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, serviceGroupName, options),
    _listByParentDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  serviceGroupName: string,
  sliName: string,
  options: SlisDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.Monitor/slis/{sliName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      sliName: sliName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an SLI resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  serviceGroupName: string,
  sliName: string,
  options: SlisDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, serviceGroupName, sliName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  serviceGroupName: string,
  sliName: string,
  resource: Sli,
  options: SlisCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.Monitor/slis/{sliName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      sliName: sliName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sliSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Sli> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return sliDeserializer(result.body);
}

/** Creates or updates an SLI resource. */
export async function createOrUpdate(
  context: Client,
  serviceGroupName: string,
  sliName: string,
  resource: Sli,
  options: SlisCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Sli> {
  const result = await _createOrUpdateSend(context, serviceGroupName, sliName, resource, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  serviceGroupName: string,
  sliName: string,
  options: SlisGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.Monitor/slis/{sliName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      sliName: sliName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Sli> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return sliDeserializer(result.body);
}

/** Gets an SLI resource. */
export async function get(
  context: Client,
  serviceGroupName: string,
  sliName: string,
  options: SlisGetOptionalParams = { requestOptions: {} },
): Promise<Sli> {
  const result = await _getSend(context, serviceGroupName, sliName, options);
  return _getDeserialize(result);
}
