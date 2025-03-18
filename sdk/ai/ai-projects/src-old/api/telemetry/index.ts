// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AIProjectContext as Client,
  TelemetryGetAppInsightsOptionalParams,
} from "../index.js";
import {
  GetAppInsightsResponse,
  getAppInsightsResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getAppInsightsSend(
  context: Client,
  appInsightsResourceUrl: string,
  options: TelemetryGetAppInsightsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{appInsightsResourceUrl}{?api-version}",
    {
      appInsightsResourceUrl: appInsightsResourceUrl,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getAppInsightsDeserialize(
  result: PathUncheckedResponse,
): Promise<GetAppInsightsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return getAppInsightsResponseDeserializer(result.body);
}

/** Gets the properties of the specified Application Insights resource */
export async function getAppInsights(
  context: Client,
  appInsightsResourceUrl: string,
  options: TelemetryGetAppInsightsOptionalParams = { requestOptions: {} },
): Promise<GetAppInsightsResponse> {
  const result = await _getAppInsightsSend(
    context,
    appInsightsResourceUrl,
    options,
  );
  return _getAppInsightsDeserialize(result);
}
