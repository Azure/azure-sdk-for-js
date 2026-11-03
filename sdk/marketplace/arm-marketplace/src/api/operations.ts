// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MarketplaceContext as Client } from "./index.js";
import type { RuleListResponse } from "../models/models.js";
import {
  queryUserRulesPropertiesSerializer,
  ruleListResponseDeserializer,
  errorResponseDeserializer,
  setRulesRequestSerializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type {
  QueryRulesOptionalParams,
  SetCollectionRulesOptionalParams,
  QueryUserRulesOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _queryRulesSend(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: QueryRulesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/queryRules{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _queryRulesDeserialize(
  result: PathUncheckedResponse,
): Promise<RuleListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return ruleListResponseDeserializer(result.body);
}

/** Get a list of all private store rules in the given private store and collection */
export async function queryRules(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: QueryRulesOptionalParams = { requestOptions: {} },
): Promise<RuleListResponse> {
  const result = await _queryRulesSend(context, privateStoreId, collectionId, options);
  return _queryRulesDeserialize(result);
}

export function _setCollectionRulesSend(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: SetCollectionRulesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/setRules{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["payload"] ? options["payload"] : setRulesRequestSerializer(options["payload"]),
  });
}

export async function _setCollectionRulesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Set rule for specific private store and collection */
export async function setCollectionRules(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: SetCollectionRulesOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _setCollectionRulesSend(context, privateStoreId, collectionId, options);
  return _setCollectionRulesDeserialize(result);
}

export function _queryUserRulesSend(
  context: Client,
  privateStoreId: string,
  options: QueryUserRulesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/queryUserRules{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["payload"]
      ? options["payload"]
      : queryUserRulesPropertiesSerializer(options["payload"]),
  });
}

export async function _queryUserRulesDeserialize(
  result: PathUncheckedResponse,
): Promise<RuleListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return ruleListResponseDeserializer(result.body);
}

/** All rules approved in the private store that are relevant for user subscriptions */
export async function queryUserRules(
  context: Client,
  privateStoreId: string,
  options: QueryUserRulesOptionalParams = { requestOptions: {} },
): Promise<RuleListResponse> {
  const result = await _queryUserRulesSend(context, privateStoreId, options);
  return _queryUserRulesDeserialize(result);
}
