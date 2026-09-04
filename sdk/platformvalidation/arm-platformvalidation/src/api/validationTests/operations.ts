// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ValidationTest,
  validationTestDeserializer,
  _ValidationTestListResult,
  _validationTestListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ValidationTestsListBySubscriptionOptionalParams,
  ValidationTestsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: ValidationTestsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PlatformValidation/validationTests{?api%2Dversion,%24filter}",
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
): Promise<_ValidationTestListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _validationTestListResultDeserializer(result.body);
}

/** List validation test catalog entries for a subscription */
export function listBySubscription(
  context: Client,
  options: ValidationTestsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ValidationTest> {
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
  validationTestName: string,
  options: ValidationTestsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PlatformValidation/validationTests/{validationTestName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      validationTestName: validationTestName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ValidationTest> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return validationTestDeserializer(result.body);
}

/** Get a validation test catalog entry */
export async function get(
  context: Client,
  validationTestName: string,
  options: ValidationTestsGetOptionalParams = { requestOptions: {} },
): Promise<ValidationTest> {
  const result = await _getSend(context, validationTestName, options);
  return _getDeserialize(result);
}
