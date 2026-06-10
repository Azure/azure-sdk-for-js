// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AdvisorManagementContext as Client } from "../index.js";
import type { AdvisorScoreEntity, _AdvisorScoreResponse } from "../../models/models.js";
import {
  armErrorResponseDeserializer,
  advisorScoreEntityDeserializer,
  _advisorScoreResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { AdvisorScoresListOptionalParams, AdvisorScoresGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: AdvisorScoresListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/advisorScore{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
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
): Promise<_AdvisorScoreResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = armErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _advisorScoreResponseDeserializer(result.body);
}

/** Gets the list of advisor scores. */
export function list(
  context: Client,
  options: AdvisorScoresListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AdvisorScoreEntity> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", apiVersion: context.apiVersion ?? "2026-02-01-preview" },
  );
}

export function _getSend(
  context: Client,
  name: string,
  options: AdvisorScoresGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/advisorScore/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AdvisorScoreEntity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = armErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return advisorScoreEntityDeserializer(result.body);
}

/** Gets the advisor score. */
export async function get(
  context: Client,
  name: string,
  options: AdvisorScoresGetOptionalParams = { requestOptions: {} },
): Promise<AdvisorScoreEntity> {
  const result = await _getSend(context, name, options);
  return _getDeserialize(result);
}
