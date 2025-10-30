// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  _PagedEvaluatorVersion,
  _pagedEvaluatorVersionDeserializer,
  EvaluatorVersion,
  evaluatorVersionDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  EvaluatorsUpdateVersionOptionalParams,
  EvaluatorsCreateVersionOptionalParams,
  EvaluatorsDeleteVersionOptionalParams,
  EvaluatorsGetVersionOptionalParams,
  EvaluatorsListLatestVersionsOptionalParams,
  EvaluatorsListVersionsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _updateVersionSend(
  context: Client,
  name: string,
  version: string,
  options: EvaluatorsUpdateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}{?api-version}",
    {
      name: name,
      version: version,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _updateVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluatorVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluatorVersionDeserializer(result.body);
}

/** Update an existing EvaluatorVersion with the given version id */
export async function updateVersion(
  context: Client,
  name: string,
  version: string,
  options: EvaluatorsUpdateVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluatorVersion> {
  const result = await _updateVersionSend(context, name, version, options);
  return _updateVersionDeserialize(result);
}

export function _createVersionSend(
  context: Client,
  name: string,
  options: EvaluatorsCreateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
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

export async function _createVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluatorVersion> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluatorVersionDeserializer(result.body);
}

/** Create a new EvaluatorVersion with auto incremented version id */
export async function createVersion(
  context: Client,
  name: string,
  options: EvaluatorsCreateVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluatorVersion> {
  const result = await _createVersionSend(context, name, options);
  return _createVersionDeserialize(result);
}

export function _deleteVersionSend(
  context: Client,
  name: string,
  version: string,
  options: EvaluatorsDeleteVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}{?api-version}",
    {
      name: name,
      version: version,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteVersionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete the specific version of the EvaluatorVersion. The service returns 204 No Content if the EvaluatorVersion was deleted successfully or if the EvaluatorVersion does not exist. */
export async function deleteVersion(
  context: Client,
  name: string,
  version: string,
  options: EvaluatorsDeleteVersionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteVersionSend(context, name, version, options);
  return _deleteVersionDeserialize(result);
}

export function _getVersionSend(
  context: Client,
  name: string,
  version: string,
  options: EvaluatorsGetVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}{?api-version}",
    {
      name: name,
      version: version,
      "api-version": context.apiVersion,
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

export async function _getVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluatorVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluatorVersionDeserializer(result.body);
}

/** Get the specific version of the EvaluatorVersion. The service returns 404 Not Found error if the EvaluatorVersion does not exist. */
export async function getVersion(
  context: Client,
  name: string,
  version: string,
  options: EvaluatorsGetVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluatorVersion> {
  const result = await _getVersionSend(context, name, version, options);
  return _getVersionDeserialize(result);
}

export function _listLatestVersionsSend(
  context: Client,
  options: EvaluatorsListLatestVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators{?api-version,type,limit}",
    {
      "api-version": context.apiVersion,
      type: options?.typeParam as any,
      limit: options?.limit,
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

export async function _listLatestVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedEvaluatorVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedEvaluatorVersionDeserializer(result.body);
}

/** List the latest version of each evaluator */
export function listLatestVersions(
  context: Client,
  options: EvaluatorsListLatestVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluatorVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listLatestVersionsSend(context, options),
    _listLatestVersionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listVersionsSend(
  context: Client,
  name: string,
  options: EvaluatorsListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions{?api-version,type,limit}",
    {
      name: name,
      "api-version": context.apiVersion,
      type: options?.typeParam as any,
      limit: options?.limit,
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

export async function _listVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedEvaluatorVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedEvaluatorVersionDeserializer(result.body);
}

/** List all versions of the given evaluator */
export function listVersions(
  context: Client,
  name: string,
  options: EvaluatorsListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluatorVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, name, options),
    _listVersionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
