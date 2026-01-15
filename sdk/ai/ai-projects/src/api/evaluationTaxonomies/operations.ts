// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  EvaluationTaxonomy,
  evaluationTaxonomySerializer,
  evaluationTaxonomyDeserializer,
  _PagedEvaluationTaxonomy,
  _pagedEvaluationTaxonomyDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  EvaluationTaxonomiesUpdateOptionalParams,
  EvaluationTaxonomiesCreateOptionalParams,
  EvaluationTaxonomiesDeleteOptionalParams,
  EvaluationTaxonomiesListOptionalParams,
  EvaluationTaxonomiesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _updateSend(
  context: Client,
  name: string,
  body: EvaluationTaxonomy,
  options: EvaluationTaxonomiesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluationtaxonomies/{name}{?api-version}",
    {
      name: name,
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
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: evaluationTaxonomySerializer(body),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluationTaxonomy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluationTaxonomyDeserializer(result.body);
}

/** Update an evaluation taxonomy. */
export async function update(
  context: Client,
  name: string,
  body: EvaluationTaxonomy,
  options: EvaluationTaxonomiesUpdateOptionalParams = { requestOptions: {} },
): Promise<EvaluationTaxonomy> {
  const result = await _updateSend(context, name, body, options);
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  name: string,
  body: EvaluationTaxonomy,
  options: EvaluationTaxonomiesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluationtaxonomies/{name}{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
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
    body: evaluationTaxonomySerializer(body),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluationTaxonomy> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluationTaxonomyDeserializer(result.body);
}

/** Create an evaluation taxonomy. */
export async function create(
  context: Client,
  name: string,
  body: EvaluationTaxonomy,
  options: EvaluationTaxonomiesCreateOptionalParams = { requestOptions: {} },
): Promise<EvaluationTaxonomy> {
  const result = await _createSend(context, name, body, options);
  return _createDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  name: string,
  options: EvaluationTaxonomiesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluationtaxonomies/{name}{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete an evaluation taxonomy by name. */
export async function $delete(
  context: Client,
  name: string,
  options: EvaluationTaxonomiesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, name, options);
  return _$deleteDeserialize(result);
}

export function _listSend(
  context: Client,
  options: EvaluationTaxonomiesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluationtaxonomies{?api-version,inputName,inputType}",
    {
      "api-version": context.apiVersion,
      inputName: options?.inputName,
      inputType: options?.inputType,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedEvaluationTaxonomy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedEvaluationTaxonomyDeserializer(result.body);
}

/** List evaluation taxonomies */
export function list(
  context: Client,
  options: EvaluationTaxonomiesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluationTaxonomy> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  name: string,
  options: EvaluationTaxonomiesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluationtaxonomies/{name}{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<EvaluationTaxonomy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluationTaxonomyDeserializer(result.body);
}

/** Get an evaluation run by name. */
export async function get(
  context: Client,
  name: string,
  options: EvaluationTaxonomiesGetOptionalParams = { requestOptions: {} },
): Promise<EvaluationTaxonomy> {
  const result = await _getSend(context, name, options);
  return _getDeserialize(result);
}
