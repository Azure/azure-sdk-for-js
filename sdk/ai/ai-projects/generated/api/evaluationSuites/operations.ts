// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  _PagedEvaluationSuiteVersion,
  _pagedEvaluationSuiteVersionDeserializer,
  EvaluationSuiteVersion,
  evaluationSuiteVersionSerializer,
  evaluationSuiteVersionDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  EvaluationSuitesCreateOrUpdateVersionOptionalParams,
  EvaluationSuitesDeleteVersionOptionalParams,
  EvaluationSuitesGetVersionOptionalParams,
  EvaluationSuitesListLatestOptionalParams,
  EvaluationSuitesListVersionsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _createOrUpdateVersionSend(
  context: Client,
  name: string,
  evaluationSuiteVersion: EvaluationSuiteVersion,
  version: string,
  options: EvaluationSuitesCreateOrUpdateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluation_suites/{name}/versions/{version}{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/merge-patch+json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: evaluationSuiteVersionSerializer(evaluationSuiteVersion),
    });
}

export async function _createOrUpdateVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluationSuiteVersion> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluationSuiteVersionDeserializer(result.body);
}

/** Create a new or update an existing EvaluationSuiteVersion with the given version id */
export async function createOrUpdateVersion(
  context: Client,
  name: string,
  evaluationSuiteVersion: EvaluationSuiteVersion,
  version: string,
  options: EvaluationSuitesCreateOrUpdateVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluationSuiteVersion> {
  const result = await _createOrUpdateVersionSend(
    context,
    name,
    evaluationSuiteVersion,
    version,
    options,
  );
  return _createOrUpdateVersionDeserialize(result);
}

export function _deleteVersionSend(
  context: Client,
  name: string,
  version: string,
  options: EvaluationSuitesDeleteVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluation_suites/{name}/versions/{version}{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "v1",
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

/** Delete the specific version of the EvaluationSuiteVersion. The service returns 204 No Content if the EvaluationSuiteVersion was deleted successfully or if the EvaluationSuiteVersion does not exist. */
export async function deleteVersion(
  context: Client,
  name: string,
  version: string,
  options: EvaluationSuitesDeleteVersionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteVersionSend(context, name, version, options);
  return _deleteVersionDeserialize(result);
}

export function _getVersionSend(
  context: Client,
  name: string,
  version: string,
  options: EvaluationSuitesGetVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluation_suites/{name}/versions/{version}{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluationSuiteVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluationSuiteVersionDeserializer(result.body);
}

/** Get the specific version of the EvaluationSuiteVersion. The service returns 404 Not Found error if the EvaluationSuiteVersion does not exist. */
export async function getVersion(
  context: Client,
  name: string,
  version: string,
  options: EvaluationSuitesGetVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluationSuiteVersion> {
  const result = await _getVersionSend(context, name, version, options);
  return _getVersionDeserialize(result);
}

export function _listLatestSend(
  context: Client,
  options: EvaluationSuitesListLatestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluation_suites{?api%2Dversion,agent_name}",
    {
      "api%2Dversion": context.apiVersion ?? "v1",
      agent_name: options?.agentName,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listLatestDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedEvaluationSuiteVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedEvaluationSuiteVersionDeserializer(result.body);
}

/** List the latest version of each EvaluationSuiteVersion */
export function listLatest(
  context: Client,
  options: EvaluationSuitesListLatestOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluationSuiteVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listLatestSend(context, options),
    _listLatestDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _listVersionsSend(
  context: Client,
  name: string,
  options: EvaluationSuitesListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluation_suites/{name}/versions{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedEvaluationSuiteVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedEvaluationSuiteVersionDeserializer(result.body);
}

/** List all versions of the given EvaluationSuiteVersion */
export function listVersions(
  context: Client,
  name: string,
  options: EvaluationSuitesListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluationSuiteVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, name, options),
    _listVersionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "v1" },
  );
}
