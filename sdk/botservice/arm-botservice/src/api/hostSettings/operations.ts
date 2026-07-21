// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureBotServiceContext as Client } from "../index.js";
import type { HostSettingsResponse } from "../../models/models.js";
import { errorDeserializer, hostSettingsResponseDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { HostSettingsGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  options: HostSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.BotService/hostSettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2023-09-15-preview",
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
): Promise<HostSettingsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return hostSettingsResponseDeserializer(result.body);
}

/** Get per subscription settings needed to host bot in compute resource such as Azure App Service */
export async function get(
  context: Client,
  options: HostSettingsGetOptionalParams = { requestOptions: {} },
): Promise<HostSettingsResponse> {
  const result = await _getSend(context, options);
  return _getDeserialize(result);
}
