// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/models.js";
import type {
  CustomRecommendation,
  _CustomRecommendationsList,
} from "../../models/securityStandardsAPI/models.js";
import {
  customRecommendationSerializer,
  customRecommendationDeserializer,
  _customRecommendationsListDeserializer,
} from "../../models/securityStandardsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CustomRecommendationsListOptionalParams,
  CustomRecommendationsDeleteOptionalParams,
  CustomRecommendationsCreateOrUpdateOptionalParams,
  CustomRecommendationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  scope: string,
  options: CustomRecommendationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/customRecommendations{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": "2024-08-01",
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
): Promise<_CustomRecommendationsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _customRecommendationsListDeserializer(result.body);
}

/** Get a list of all relevant custom recommendations over a scope */
export function list(
  context: Client,
  scope: string,
  options: CustomRecommendationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CustomRecommendation> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scope, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-08-01" },
  );
}

export function _$deleteSend(
  context: Client,
  scope: string,
  customRecommendationName: string,
  options: CustomRecommendationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/customRecommendations/{customRecommendationName}{?api%2Dversion}",
    {
      scope: scope,
      customRecommendationName: customRecommendationName,
      "api%2Dversion": "2024-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a custom recommendation over a given scope */
export async function $delete(
  context: Client,
  scope: string,
  customRecommendationName: string,
  options: CustomRecommendationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, scope, customRecommendationName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  scope: string,
  customRecommendationName: string,
  customRecommendationBody: CustomRecommendation,
  options: CustomRecommendationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/customRecommendations/{customRecommendationName}{?api%2Dversion}",
    {
      scope: scope,
      customRecommendationName: customRecommendationName,
      "api%2Dversion": "2024-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: customRecommendationSerializer(customRecommendationBody),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CustomRecommendation> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return customRecommendationDeserializer(result.body);
}

/** Creates or updates a custom recommendation over a given scope */
export async function createOrUpdate(
  context: Client,
  scope: string,
  customRecommendationName: string,
  customRecommendationBody: CustomRecommendation,
  options: CustomRecommendationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<CustomRecommendation> {
  const result = await _createOrUpdateSend(
    context,
    scope,
    customRecommendationName,
    customRecommendationBody,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  scope: string,
  customRecommendationName: string,
  options: CustomRecommendationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/customRecommendations/{customRecommendationName}{?api%2Dversion}",
    {
      scope: scope,
      customRecommendationName: customRecommendationName,
      "api%2Dversion": "2024-08-01",
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
): Promise<CustomRecommendation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return customRecommendationDeserializer(result.body);
}

/** Get a specific custom recommendation for the requested scope by customRecommendationName */
export async function get(
  context: Client,
  scope: string,
  customRecommendationName: string,
  options: CustomRecommendationsGetOptionalParams = { requestOptions: {} },
): Promise<CustomRecommendation> {
  const result = await _getSend(context, scope, customRecommendationName, options);
  return _getDeserialize(result);
}
