// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ImpactCategory,
  impactCategoryDeserializer,
  _ImpactCategoryListResult,
  _impactCategoryListResultDeserializer,
} from "../../models/models.js";
import {
  ImpactCategoriesListBySubscriptionOptionalParams,
  ImpactCategoriesGetOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  resourceType: string,
  options: ImpactCategoriesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/impactCategories{?api%2Dversion,categoryName,resourceType}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
      categoryName: options?.categoryName,
      resourceType: resourceType,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ImpactCategoryListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _impactCategoryListResultDeserializer(result.body);
}

/** List ImpactCategory resources by subscription */
export function listBySubscription(
  context: Client,
  resourceType: string,
  options: ImpactCategoriesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ImpactCategory> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, resourceType, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  impactCategoryName: string,
  options: ImpactCategoriesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/impactCategories/{impactCategoryName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      impactCategoryName: impactCategoryName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ImpactCategory> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return impactCategoryDeserializer(result.body);
}

/** Get a ImpactCategory */
export async function get(
  context: Client,
  impactCategoryName: string,
  options: ImpactCategoriesGetOptionalParams = { requestOptions: {} },
): Promise<ImpactCategory> {
  const result = await _getSend(context, impactCategoryName, options);
  return _getDeserialize(result);
}
