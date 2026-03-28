// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { UserConfirmationPasswordSendOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _sendSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  options: UserConfirmationPasswordSendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/users/{userId}/confirmations/password/send{?api%2Dversion,appType}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      appType: options?.appType,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _sendDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Sends confirmation */
export async function send(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  options: UserConfirmationPasswordSendOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _sendSend(context, resourceGroupName, serviceName, userId, options);
  return _sendDeserialize(result);
}
