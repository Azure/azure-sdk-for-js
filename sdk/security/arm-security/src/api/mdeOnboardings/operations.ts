// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenterContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import {
  MdeOnboardingData,
  mdeOnboardingDataDeserializer,
  MdeOnboardingDataList,
  mdeOnboardingDataListDeserializer,
} from "../../models/mdeOnboardingAPI/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { MdeOnboardingsListOptionalParams, MdeOnboardingsGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

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
): Promise<MdeOnboardingDataList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return mdeOnboardingDataListDeserializer(result.body);
}

/** The configuration or data needed to onboard the machine to MDE */
export async function list(
  context: Client,
  options: MdeOnboardingsListOptionalParams = { requestOptions: {} },
): Promise<MdeOnboardingDataList> {
  const result = await _listSend(context, options);
  return _listDeserialize(result);
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<MdeOnboardingData> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return mdeOnboardingDataDeserializer(result.body);
}

/** The default configuration or data needed to onboard the machine to MDE */
export async function get(
  context: Client,
  options: MdeOnboardingsGetOptionalParams = { requestOptions: {} },
): Promise<MdeOnboardingData> {
  const result = await _getSend(context, options);
  return _getDeserialize(result);
}
