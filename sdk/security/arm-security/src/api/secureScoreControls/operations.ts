// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  _SecureScoreControlList,
  SecureScoreControlDetails,
} from "../../models/secureScoreAPI/models.js";
import { _secureScoreControlListDeserializer } from "../../models/secureScoreAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SecureScoreControlsListOptionalParams,
  SecureScoreControlsListBySecureScoreOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: SecureScoreControlsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/secureScoreControls{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2020-01-01",
      "%24expand": options?.expand,
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
): Promise<_SecureScoreControlList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _secureScoreControlListDeserializer(result.body);
}

/** Get all security controls within a scope */
export function list(
  context: Client,
  options: SecureScoreControlsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecureScoreControlDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2020-01-01" },
  );
}

export function _listBySecureScoreSend(
  context: Client,
  secureScoreName: string,
  options: SecureScoreControlsListBySecureScoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/secureScores/{secureScoreName}/secureScoreControls{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      secureScoreName: secureScoreName,
      "api%2Dversion": "2020-01-01",
      "%24expand": options?.expand,
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

export async function _listBySecureScoreDeserialize(
  result: PathUncheckedResponse,
): Promise<_SecureScoreControlList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _secureScoreControlListDeserializer(result.body);
}

/** Get all security controls for a specific initiative within a scope */
export function listBySecureScore(
  context: Client,
  secureScoreName: string,
  options: SecureScoreControlsListBySecureScoreOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecureScoreControlDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySecureScoreSend(context, secureScoreName, options),
    _listBySecureScoreDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2020-01-01" },
  );
}
