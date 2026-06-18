// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementContext as Client } from "../index.js";
import {
  errorDefinitionDeserializer,
  AccessReviewScheduleSettings,
  accessReviewScheduleSettingsSerializer,
  AccessReviewDefaultSettings,
  accessReviewDefaultSettingsDeserializer,
} from "../../models/microsoft/attributeNamespaces/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AccessReviewDefaultSettingsPutOptionalParams,
  AccessReviewDefaultSettingsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _putSend(
  context: Client,
  properties: AccessReviewScheduleSettings,
  options: AccessReviewDefaultSettingsPutOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewScheduleSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: accessReviewScheduleSettingsSerializer(properties),
    });
}

export async function _putDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessReviewDefaultSettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDefinitionDeserializer(result.body);
    }

    throw error;
  }

  return accessReviewDefaultSettingsDeserializer(result.body);
}

/** Get access review default settings for the subscription */
export async function put(
  context: Client,
  properties: AccessReviewScheduleSettings,
  options: AccessReviewDefaultSettingsPutOptionalParams = { requestOptions: {} },
): Promise<AccessReviewDefaultSettings> {
  const result = await _putSend(context, properties, options);
  return _putDeserialize(result);
}

export function _getSend(
  context: Client,
  options: AccessReviewDefaultSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewScheduleSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessReviewDefaultSettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDefinitionDeserializer(result.body);
    }

    throw error;
  }

  return accessReviewDefaultSettingsDeserializer(result.body);
}

/** Get access review default settings for the subscription */
export async function get(
  context: Client,
  options: AccessReviewDefaultSettingsGetOptionalParams = { requestOptions: {} },
): Promise<AccessReviewDefaultSettings> {
  const result = await _getSend(context, options);
  return _getDeserialize(result);
}
