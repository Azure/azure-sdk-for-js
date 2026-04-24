// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type {
  SecureScoreAPISecureScoreItem,
  _SecureScoreAPISecureScoresList,
} from "../../models/secureScoreAPI/models.js";
import {
  secureScoreAPISecureScoreItemDeserializer,
  _secureScoreAPISecureScoresListDeserializer,
} from "../../models/secureScoreAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { SecureScoresListOptionalParams, SecureScoresGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: SecureScoresListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/secureScores{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2020-01-01",
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
): Promise<_SecureScoreAPISecureScoresList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _secureScoreAPISecureScoresListDeserializer(result.body);
}

/** List secure scores for all your Microsoft Defender for Cloud initiatives within your current scope. */
export function list(
  context: Client,
  options: SecureScoresListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecureScoreAPISecureScoreItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2020-01-01" },
  );
}

export function _getSend(
  context: Client,
  secureScoreName: string,
  options: SecureScoresGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/secureScores/{secureScoreName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      secureScoreName: secureScoreName,
      "api%2Dversion": "2020-01-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<SecureScoreAPISecureScoreItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return secureScoreAPISecureScoreItemDeserializer(result.body);
}

/** Get secure score for a specific Microsoft Defender for Cloud initiative within your current scope. For the ASC Default initiative, use 'ascScore'. */
export async function get(
  context: Client,
  secureScoreName: string,
  options: SecureScoresGetOptionalParams = { requestOptions: {} },
): Promise<SecureScoreAPISecureScoreItem> {
  const result = await _getSend(context, secureScoreName, options);
  return _getDeserialize(result);
}
