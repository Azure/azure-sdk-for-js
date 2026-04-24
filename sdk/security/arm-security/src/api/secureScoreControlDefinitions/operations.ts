// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  SecureScoreControlDefinitionItem,
  _SecureScoreControlDefinitionList,
} from "../../models/secureScoreAPI/models.js";
import { _secureScoreControlDefinitionListDeserializer } from "../../models/secureScoreAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SecureScoreControlDefinitionsListBySubscriptionOptionalParams,
  SecureScoreControlDefinitionsListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: SecureScoreControlDefinitionsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/secureScoreControlDefinitions{?api%2Dversion}",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SecureScoreControlDefinitionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _secureScoreControlDefinitionListDeserializer(result.body);
}

/** For a specified subscription, list the available security controls, their assessments, and the max score */
export function listBySubscription(
  context: Client,
  options: SecureScoreControlDefinitionsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecureScoreControlDefinitionItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2020-01-01" },
  );
}

export function _listSend(
  context: Client,
  options: SecureScoreControlDefinitionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Security/secureScoreControlDefinitions{?api%2Dversion}",
    {
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
): Promise<_SecureScoreControlDefinitionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _secureScoreControlDefinitionListDeserializer(result.body);
}

/** List the available security controls, their assessments, and the max score */
export function list(
  context: Client,
  options: SecureScoreControlDefinitionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecureScoreControlDefinitionItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2020-01-01" },
  );
}
