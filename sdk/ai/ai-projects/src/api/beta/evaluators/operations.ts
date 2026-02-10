// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
import {
  _PagedEvaluatorVersion,
  _pagedEvaluatorVersionDeserializer,
  EvaluatorVersion,
  evaluatorVersionSerializer,
  evaluatorVersionDeserializer,
} from "../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  BetaEvaluatorsUpdateVersionOptionalParams,
  BetaEvaluatorsCreateVersionOptionalParams,
  BetaEvaluatorsDeleteVersionOptionalParams,
  BetaEvaluatorsGetVersionOptionalParams,
  BetaEvaluatorsListLatestVersionsOptionalParams,
  BetaEvaluatorsListVersionsOptionalParams,
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
  evaluatorVersion: EvaluatorVersion,
  options: BetaEvaluatorsUpdateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
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
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: evaluatorVersionSerializer(evaluatorVersion),
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
  evaluatorVersion: EvaluatorVersion,
  options: BetaEvaluatorsUpdateVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluatorVersion> {
  const result = await _updateVersionSend(context, name, version, evaluatorVersion, options);
  return _updateVersionDeserialize(result);
}

export function _createVersionSend(
  context: Client,
  name: string,
  evaluatorVersion: EvaluatorVersion,
  options: BetaEvaluatorsCreateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
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
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: evaluatorVersionSerializer(evaluatorVersion),
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
  evaluatorVersion: EvaluatorVersion,
  options: BetaEvaluatorsCreateVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluatorVersion> {
  const result = await _createVersionSend(context, name, evaluatorVersion, options);
  return _createVersionDeserialize(result);
}

export function _deleteVersionSend(
  context: Client,
  name: string,
  version: string,
  options: BetaEvaluatorsDeleteVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
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
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { "foundry-features": foundryFeatures, ...options.requestOptions?.headers },
  });
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
  options: BetaEvaluatorsDeleteVersionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteVersionSend(context, name, version, options);
  return _deleteVersionDeserialize(result);
}

export function _getVersionSend(
  context: Client,
  name: string,
  version: string,
  options: BetaEvaluatorsGetVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
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
      "foundry-features": foundryFeatures,
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
  options: BetaEvaluatorsGetVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluatorVersion> {
  const result = await _getVersionSend(context, name, version, options);
  return _getVersionDeserialize(result);
}

export function _listLatestVersionsSend(
  context: Client,
  options: BetaEvaluatorsListLatestVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
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
      "foundry-features": foundryFeatures,
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
  options: BetaEvaluatorsListLatestVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluatorVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listLatestVersionsSend(context, options),
    _listLatestVersionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion },
  );
}

export function _listVersionsSend(
  context: Client,
  name: string,
  options: BetaEvaluatorsListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
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
      "foundry-features": foundryFeatures,
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
  options: BetaEvaluatorsListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluatorVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, name, options),
    _listVersionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion },
  );
}
