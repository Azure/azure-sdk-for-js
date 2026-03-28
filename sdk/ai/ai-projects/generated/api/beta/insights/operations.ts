// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
import {
  Insight,
  insightSerializer,
  insightDeserializer,
  _PagedInsight,
  _pagedInsightDeserializer,
} from "../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  BetaInsightsListOptionalParams,
  BetaInsightsGetOptionalParams,
  BetaInsightsGenerateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  foundryFeatures: "Insights=V1Preview",
  options: BetaInsightsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/insights{?api%2Dversion,type,evalId,runId,agentName,includeCoordinates}",
    {
      "api%2Dversion": context.apiVersion ?? "v1",
      type: options?.typeParam,
      evalId: options?.evalId,
      runId: options?.runId,
      agentName: options?.agentName,
      includeCoordinates: options?.includeCoordinates,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_PagedInsight> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedInsightDeserializer(result.body);
}

/** List all insights in reverse chronological order (newest first). */
export function list(
  context: Client,
  foundryFeatures: "Insights=V1Preview",
  options: BetaInsightsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Insight> {
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
  insightId: string,
  foundryFeatures: "Insights=V1Preview",
  options: BetaInsightsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/insights/{id}{?api%2Dversion,includeCoordinates}",
    {
      id: insightId,
      "api%2Dversion": context.apiVersion ?? "v1",
      includeCoordinates: options?.includeCoordinates,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Insight> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return insightDeserializer(result.body);
}

/** Get a specific insight by Id. */
export async function get(
  context: Client,
  insightId: string,
  foundryFeatures: "Insights=V1Preview",
  options: BetaInsightsGetOptionalParams = { requestOptions: {} },
): Promise<Insight> {
  const result = await _getSend(context, insightId, foundryFeatures, options);
  return _getDeserialize(result);
}

export function _generateSend(
  context: Client,
  foundryFeatures: "Insights=V1Preview",
  insight: Insight,
  options: BetaInsightsGenerateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/insights{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        "foundry-features": foundryFeatures,
        ...(options?.repeatabilityRequestId !== undefined
          ? { "repeatability-request-id": options?.repeatabilityRequestId }
          : {}),
        ...(options?.repeatabilityFirstSent !== undefined
          ? {
              "repeatability-first-sent": !options?.repeatabilityFirstSent
                ? options?.repeatabilityFirstSent
                : options?.repeatabilityFirstSent.toUTCString(),
            }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: insightSerializer(insight),
    });
}

export async function _generateDeserialize(result: PathUncheckedResponse): Promise<Insight> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return insightDeserializer(result.body);
}

/** Generate Insights */
export async function generate(
  context: Client,
  foundryFeatures: "Insights=V1Preview",
  insight: Insight,
  options: BetaInsightsGenerateOptionalParams = { requestOptions: {} },
): Promise<Insight> {
  const result = await _generateSend(context, foundryFeatures, insight, options);
  return _generateDeserialize(result);
}
