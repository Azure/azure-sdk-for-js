// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ValidationTestCategory,
  validationTestCategoryDeserializer,
  _ValidationTestCategoryListResult,
  _validationTestCategoryListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ValidationTestCategoriesListBySubscriptionOptionalParams,
  ValidationTestCategoriesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: ValidationTestCategoriesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PlatformValidation/validationTestCategories{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
      "%24filter": options?.filter,
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
): Promise<_ValidationTestCategoryListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _validationTestCategoryListResultDeserializer(result.body);
}

/** List validation test category catalog entries for a subscription */
export function listBySubscription(
  context: Client,
  options: ValidationTestCategoriesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ValidationTestCategory> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-08-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  validationTestCategoryName: string,
  options: ValidationTestCategoriesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PlatformValidation/validationTestCategories/{validationTestCategoryName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      validationTestCategoryName: validationTestCategoryName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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
): Promise<ValidationTestCategory> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return validationTestCategoryDeserializer(result.body);
}

/** Get a validation test category catalog entry */
export async function get(
  context: Client,
  validationTestCategoryName: string,
  options: ValidationTestCategoriesGetOptionalParams = { requestOptions: {} },
): Promise<ValidationTestCategory> {
  const result = await _getSend(context, validationTestCategoryName, options);
  return _getDeserialize(result);
}
