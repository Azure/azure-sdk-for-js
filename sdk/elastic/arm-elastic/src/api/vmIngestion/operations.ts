// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext as Client } from "../index.js";
import type { VMIngestionDetailsResponse } from "../../models/models.js";
import {
  resourceProviderDefaultErrorResponseDeserializer,
  vmIngestionDetailsResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { VMIngestionDetailsOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _detailsSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: VMIngestionDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/vmIngestionDetails{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _detailsDeserialize(
  result: PathUncheckedResponse,
): Promise<VMIngestionDetailsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return vmIngestionDetailsResponseDeserializer(result.body);
}

/** List detailed information about VM ingestion that will be monitored by the Elastic monitor resource, ensuring optimal observability and performance. */
export async function details(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: VMIngestionDetailsOptionalParams = { requestOptions: {} },
): Promise<VMIngestionDetailsResponse> {
  const result = await _detailsSend(context, resourceGroupName, monitorName, options);
  return _detailsDeserialize(result);
}
