// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type {
  MdeOnboardingAPIMdeOnboardingData,
  _MdeOnboardingAPIMdeOnboardingDataList,
} from "../../models/mdeOnboardingAPI/models.js";
import {
  mdeOnboardingAPIMdeOnboardingDataDeserializer,
  _mdeOnboardingAPIMdeOnboardingDataListDeserializer,
} from "../../models/mdeOnboardingAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MdeOnboardingsListOptionalParams,
  MdeOnboardingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: MdeOnboardingsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/mdeOnboardings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2021-10-01-preview",
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
): Promise<_MdeOnboardingAPIMdeOnboardingDataList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _mdeOnboardingAPIMdeOnboardingDataListDeserializer(result.body);
}

/** The configuration or data needed to onboard the machine to MDE */
export function list(
  context: Client,
  options: MdeOnboardingsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MdeOnboardingAPIMdeOnboardingData> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", apiVersion: "2021-10-01-preview" },
  );
}

export function _getSend(
  context: Client,
  options: MdeOnboardingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/mdeOnboardings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2021-10-01-preview",
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
): Promise<MdeOnboardingAPIMdeOnboardingData> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return mdeOnboardingAPIMdeOnboardingDataDeserializer(result.body);
}

/** The default configuration or data needed to onboard the machine to MDE */
export async function get(
  context: Client,
  options: MdeOnboardingsGetOptionalParams = { requestOptions: {} },
): Promise<MdeOnboardingAPIMdeOnboardingData> {
  const result = await _getSend(context, options);
  return _getDeserialize(result);
}
