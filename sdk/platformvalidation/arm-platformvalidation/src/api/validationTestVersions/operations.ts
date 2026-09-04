// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ValidationTestVersion,
  validationTestVersionDeserializer,
  _ValidationTestVersionListResult,
  _validationTestVersionListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ValidationTestVersionsListOptionalParams,
  ValidationTestVersionsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  validationTestName: string,
  options: ValidationTestVersionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PlatformValidation/validationTests/{validationTestName}/versions{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      validationTestName: validationTestName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ValidationTestVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _validationTestVersionListResultDeserializer(result.body);
}

/** List validation test version catalog entries */
export function list(
  context: Client,
  validationTestName: string,
  options: ValidationTestVersionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ValidationTestVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, validationTestName, options),
    _listDeserialize,
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
  version: string,
  options: ValidationTestVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PlatformValidation/validationTests/{validationTestName}/versions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      validationTestName: validationTestName,
      version: version,
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
): Promise<ValidationTestVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return validationTestVersionDeserializer(result.body);
}

/** Get a validation test version catalog entry */
export async function get(
  context: Client,
  validationTestName: string,
  version: string,
  options: ValidationTestVersionsGetOptionalParams = { requestOptions: {} },
): Promise<ValidationTestVersion> {
  const result = await _getSend(context, validationTestName, version, options);
  return _getDeserialize(result);
}
