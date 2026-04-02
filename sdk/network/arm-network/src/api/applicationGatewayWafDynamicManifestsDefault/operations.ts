// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { ApplicationGatewayWafDynamicManifestResult } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  applicationGatewayWafDynamicManifestResultDeserializer,
} from "../../models/microsoft/network/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ApplicationGatewayWafDynamicManifestsDefaultGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  location: string,
  options: ApplicationGatewayWafDynamicManifestsDefaultGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/locations/{location}/applicationGatewayWafDynamicManifests/dafault{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": "2025-05-01",
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
): Promise<ApplicationGatewayWafDynamicManifestResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return applicationGatewayWafDynamicManifestResultDeserializer(result.body);
}

/** Gets the regional application gateway waf manifest. */
export async function get(
  context: Client,
  location: string,
  options: ApplicationGatewayWafDynamicManifestsDefaultGetOptionalParams = { requestOptions: {} },
): Promise<ApplicationGatewayWafDynamicManifestResult> {
  const result = await _getSend(context, location, options);
  return _getDeserialize(result);
}
