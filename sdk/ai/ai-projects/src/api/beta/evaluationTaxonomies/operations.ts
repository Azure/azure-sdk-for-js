// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type { EvaluationTaxonomy, _PagedEvaluationTaxonomy } from "../../../models/models.js";
import {
  evaluationTaxonomySerializer,
  evaluationTaxonomyDeserializer,
  _pagedEvaluationTaxonomyDeserializer,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
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
  name: string,
  taxonomy: EvaluationTaxonomy,
  options: BetaEvaluationTaxonomiesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
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
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: evaluationTaxonomySerializer(taxonomy),
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
  taxonomy: EvaluationTaxonomy,
  options: BetaEvaluationTaxonomiesUpdateOptionalParams = { requestOptions: {} },
): Promise<EvaluationTaxonomy> {
  const result = await _updateSend(context, name, taxonomy, options);
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  name: string,
  taxonomy: EvaluationTaxonomy,
  options: BetaEvaluationTaxonomiesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
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
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: evaluationTaxonomySerializer(taxonomy),
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

/** Creates or replaces the specified evaluation taxonomy with the provided definition. */
export async function create(
  context: Client,
  name: string,
  taxonomy: EvaluationTaxonomy,
  options: BetaEvaluationTaxonomiesCreateOptionalParams = { requestOptions: {} },
): Promise<EvaluationTaxonomy> {
  const result = await _createSend(context, name, taxonomy, options);
  return _createDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  name: string,
  options: BetaEvaluationTaxonomiesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
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
      "foundry-features": foundryFeatures,
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

/** Removes the specified evaluation taxonomy from the project. */
export async function $delete(
  context: Client,
  name: string,
  options: BetaEvaluationTaxonomiesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, name, options);
  return _$deleteDeserialize(result);
}

export function _listSend(
  context: Client,
  options: BetaEvaluationTaxonomiesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
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

/** Returns the evaluation taxonomies available in the project, optionally filtered by input name or input type. */
export function list(
  context: Client,
  options: BetaEvaluationTaxonomiesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluationTaxonomy> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion,
      nextPageRequestOptions: {
        headers: {
          "foundry-features": "Evaluations=V1Preview",
        },
      },
    },
  );
}

export function _getSend(
  context: Client,
  name: string,
  options: BetaEvaluationTaxonomiesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
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

/** Retrieves the specified evaluation taxonomy. */
export async function get(
  context: Client,
  name: string,
  options: BetaEvaluationTaxonomiesGetOptionalParams = { requestOptions: {} },
): Promise<EvaluationTaxonomy> {
  const result = await _getSend(context, name, options);
  return _getDeserialize(result);
}
