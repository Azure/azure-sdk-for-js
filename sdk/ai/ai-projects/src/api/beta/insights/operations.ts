// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type { Insight, _PagedInsight } from "../../../models/models.js";
import {
<<<<<<< /tmp/azsdk-dev-toollwiWH1/result/src/api/beta/insights/operations.ts
  apiErrorResponseDeserializer,
  Insight,
||||||| /tmp/azsdk-dev-toollwiWH1/base/sdk/ai/ai-projects/generated/api/beta/insights/operations.ts
  Insight,
=======
>>>>>>> /tmp/azsdk-dev-toollwiWH1/custom/sdk/ai/ai-projects/src/api/beta/insights/operations.ts
  insightSerializer,
  insightDeserializer,
  _pagedInsightDeserializer,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type {
  BetaInsightsListOptionalParams,
  BetaInsightsGetOptionalParams,
  BetaInsightsGenerateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: BetaInsightsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Insights=V1Preview";
  const path = expandUrlTemplate(
<<<<<<< /tmp/azsdk-dev-toollwiWH1/result/src/api/beta/insights/operations.ts
    "/insights{?type,evalId,runId,agentName,includeCoordinates,api%2Dversion}",
||||||| /tmp/azsdk-dev-toollwiWH1/base/sdk/ai/ai-projects/generated/api/beta/insights/operations.ts
    "/insights{?api%2Dversion,type,evalId,runId,agentName,includeCoordinates}",
=======
    "/insights{?api-version,type,evalId,runId,agentName,includeCoordinates}",
>>>>>>> /tmp/azsdk-dev-toollwiWH1/custom/sdk/ai/ai-projects/src/api/beta/insights/operations.ts
    {
<<<<<<< /tmp/azsdk-dev-toollwiWH1/result/src/api/beta/insights/operations.ts
      type: options?.typeParam,
||||||| /tmp/azsdk-dev-toollwiWH1/base/sdk/ai/ai-projects/generated/api/beta/insights/operations.ts
      "api%2Dversion": context.apiVersion ?? "v1",
      type: options?.typeParam,
=======
      "api-version": context.apiVersion,
      type: options?.insightType,
>>>>>>> /tmp/azsdk-dev-toollwiWH1/custom/sdk/ai/ai-projects/src/api/beta/insights/operations.ts
      evalId: options?.evalId,
      runId: options?.runId,
      agentName: options?.agentName,
      includeCoordinates: options?.includeCoordinates,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
<<<<<<< /tmp/azsdk-dev-toollwiWH1/result/src/api/beta/insights/operations.ts
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
||||||| /tmp/azsdk-dev-toollwiWH1/base/sdk/ai/ai-projects/generated/api/beta/insights/operations.ts
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
=======
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
>>>>>>> /tmp/azsdk-dev-toollwiWH1/custom/sdk/ai/ai-projects/src/api/beta/insights/operations.ts
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_PagedInsight> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return _pagedInsightDeserializer(result.body);
}

/** List all insights in reverse chronological order (newest first). */
export function list(
  context: Client,
  options: BetaInsightsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Insight> {
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
          "foundry-features": "Insights=V1Preview",
        },
      },
    },
  );
}

export function _getSend(
  context: Client,
  id: string,
  options: BetaInsightsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Insights=V1Preview";
  const path = expandUrlTemplate(
<<<<<<< /tmp/azsdk-dev-toollwiWH1/result/src/api/beta/insights/operations.ts
    "/insights/{id}{?includeCoordinates,api%2Dversion}",
||||||| /tmp/azsdk-dev-toollwiWH1/base/sdk/ai/ai-projects/generated/api/beta/insights/operations.ts
    "/insights/{id}{?api%2Dversion,includeCoordinates}",
=======
    "/insights/{id}{?api-version,includeCoordinates}",
>>>>>>> /tmp/azsdk-dev-toollwiWH1/custom/sdk/ai/ai-projects/src/api/beta/insights/operations.ts
    {
<<<<<<< /tmp/azsdk-dev-toollwiWH1/result/src/api/beta/insights/operations.ts
      id: id,
||||||| /tmp/azsdk-dev-toollwiWH1/base/sdk/ai/ai-projects/generated/api/beta/insights/operations.ts
      id: insightId,
      "api%2Dversion": context.apiVersion ?? "v1",
=======
      id: id,
      "api-version": context.apiVersion,
>>>>>>> /tmp/azsdk-dev-toollwiWH1/custom/sdk/ai/ai-projects/src/api/beta/insights/operations.ts
      includeCoordinates: options?.includeCoordinates,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
<<<<<<< /tmp/azsdk-dev-toollwiWH1/result/src/api/beta/insights/operations.ts
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
||||||| /tmp/azsdk-dev-toollwiWH1/base/sdk/ai/ai-projects/generated/api/beta/insights/operations.ts
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
=======
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
>>>>>>> /tmp/azsdk-dev-toollwiWH1/custom/sdk/ai/ai-projects/src/api/beta/insights/operations.ts
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Insight> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return insightDeserializer(result.body);
}

/** Get a specific insight by Id. */
export async function get(
  context: Client,
  id: string,
  options: BetaInsightsGetOptionalParams = { requestOptions: {} },
): Promise<Insight> {
  const result = await _getSend(context, id, options);
  return _getDeserialize(result);
}

export function _generateSend(
  context: Client,
  insight: Insight,
  options: BetaInsightsGenerateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Insights=V1Preview";
  const path = expandUrlTemplate(
    "/insights{?api-version}",
    {
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
<<<<<<< /tmp/azsdk-dev-toollwiWH1/result/src/api/beta/insights/operations.ts
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
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
||||||| /tmp/azsdk-dev-toollwiWH1/base/sdk/ai/ai-projects/generated/api/beta/insights/operations.ts
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
=======
  return context.path(path).post({
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
>>>>>>> /tmp/azsdk-dev-toollwiWH1/custom/sdk/ai/ai-projects/src/api/beta/insights/operations.ts
}

export async function _generateDeserialize(result: PathUncheckedResponse): Promise<Insight> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return insightDeserializer(result.body);
}

/** Generate Insights */
export async function generate(
  context: Client,
  insight: Insight,
  options: BetaInsightsGenerateOptionalParams = { requestOptions: {} },
): Promise<Insight> {
  const result = await _generateSend(context, insight, options);
  return _generateDeserialize(result);
}
