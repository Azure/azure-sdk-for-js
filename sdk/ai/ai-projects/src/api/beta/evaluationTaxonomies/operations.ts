// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type { EvaluationTaxonomy, _PagedEvaluationTaxonomy } from "../../../models/models.js";
import {
  evaluationTaxonomySerializer,
  evaluationTaxonomyDeserializer,
  _pagedEvaluationTaxonomyDeserializer,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type {
  BetaEvaluationTaxonomiesUpdateOptionalParams,
  BetaEvaluationTaxonomiesCreateOptionalParams,
  BetaEvaluationTaxonomiesDeleteOptionalParams,
  BetaEvaluationTaxonomiesListOptionalParams,
  BetaEvaluationTaxonomiesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _updateSend(
  context: Client,
  foundryFeatures: "Evaluations=V1Preview",
  name: string,
  body: EvaluationTaxonomy,
  options: BetaEvaluationTaxonomiesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluationtaxonomies/{name}{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "v1",
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
  foundryFeatures: "Evaluations=V1Preview",
  name: string,
  body: EvaluationTaxonomy,
  options: BetaEvaluationTaxonomiesUpdateOptionalParams = { requestOptions: {} },
): Promise<EvaluationTaxonomy> {
  const result = await _updateSend(context, foundryFeatures, name, body, options);
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  foundryFeatures: "Evaluations=V1Preview",
  name: string,
  body: EvaluationTaxonomy,
  options: BetaEvaluationTaxonomiesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluationtaxonomies/{name}{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
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
  foundryFeatures: "Evaluations=V1Preview",
  name: string,
  body: EvaluationTaxonomy,
  options: BetaEvaluationTaxonomiesCreateOptionalParams = { requestOptions: {} },
): Promise<EvaluationTaxonomy> {
  const result = await _createSend(context, foundryFeatures, name, body, options);
  return _createDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  name: string,
  foundryFeatures: "Evaluations=V1Preview",
  options: BetaEvaluationTaxonomiesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluationtaxonomies/{name}{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "v1",
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

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete an evaluation taxonomy by name. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  name: string,
  foundryFeatures: "Evaluations=V1Preview",
  options: BetaEvaluationTaxonomiesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, name, foundryFeatures, options);
  return _$deleteDeserialize(result);
}

export function _listSend(
  context: Client,
  foundryFeatures: "Evaluations=V1Preview",
  options: BetaEvaluationTaxonomiesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluationtaxonomies{?api%2Dversion,inputName,inputType}",
    {
      "api%2Dversion": context.apiVersion ?? "v1",
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
      "foundry-features": foundryFeatures,
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
  foundryFeatures: "Evaluations=V1Preview",
  options: BetaEvaluationTaxonomiesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluationTaxonomy> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, foundryFeatures, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _getSend(
  context: Client,
  name: string,
  foundryFeatures: "Evaluations=V1Preview",
  options: BetaEvaluationTaxonomiesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluationtaxonomies/{name}{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "v1",
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
  foundryFeatures: "Evaluations=V1Preview",
  options: BetaEvaluationTaxonomiesGetOptionalParams = { requestOptions: {} },
): Promise<EvaluationTaxonomy> {
  const result = await _getSend(context, name, foundryFeatures, options);
  return _getDeserialize(result);
}
