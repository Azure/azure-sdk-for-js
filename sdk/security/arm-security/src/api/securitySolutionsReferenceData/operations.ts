// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type { SecuritySolutionsReferenceDataList } from "../../models/securitySolutionsAPI/models.js";
import { securitySolutionsReferenceDataListDeserializer } from "../../models/securitySolutionsAPI/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SecuritySolutionsReferenceDataListByHomeRegionOptionalParams,
  SecuritySolutionsReferenceDataListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByHomeRegionSend(
  context: Client,
  ascLocation: string,
  options: SecuritySolutionsReferenceDataListByHomeRegionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/locations/{ascLocation}/securitySolutionsReferenceData{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      ascLocation: ascLocation,
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

export async function _listByHomeRegionDeserialize(
  result: PathUncheckedResponse,
): Promise<SecuritySolutionsReferenceDataList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return securitySolutionsReferenceDataListDeserializer(result.body);
}

/** Gets list of all supported Security Solutions for subscription and location. */
export async function listByHomeRegion(
  context: Client,
  ascLocation: string,
  options: SecuritySolutionsReferenceDataListByHomeRegionOptionalParams = { requestOptions: {} },
): Promise<SecuritySolutionsReferenceDataList> {
  const result = await _listByHomeRegionSend(context, ascLocation, options);
  return _listByHomeRegionDeserialize(result);
}

export function _listSend(
  context: Client,
  options: SecuritySolutionsReferenceDataListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/securitySolutionsReferenceData{?api%2Dversion}",
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
): Promise<SecuritySolutionsReferenceDataList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return securitySolutionsReferenceDataListDeserializer(result.body);
}

/** Gets a list of all supported Security Solutions for the subscription. */
export async function list(
  context: Client,
  options: SecuritySolutionsReferenceDataListOptionalParams = { requestOptions: {} },
): Promise<SecuritySolutionsReferenceDataList> {
  const result = await _listSend(context, options);
  return _listDeserialize(result);
}
