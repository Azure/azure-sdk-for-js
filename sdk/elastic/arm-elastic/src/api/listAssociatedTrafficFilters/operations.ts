// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext as Client } from "../index.js";
import type { ElasticTrafficFilterResponse } from "../../models/models.js";
import {
  resourceProviderDefaultErrorResponseDeserializer,
  elasticTrafficFilterResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ListAssociatedTrafficFiltersListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: ListAssociatedTrafficFiltersListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/listAssociatedTrafficFilters{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<ElasticTrafficFilterResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return elasticTrafficFilterResponseDeserializer(result.body);
}

/** List all traffic filters associated with your Elastic monitor resource, helping you manage network traffic control. */
export async function list(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: ListAssociatedTrafficFiltersListOptionalParams = {
    requestOptions: {},
  },
): Promise<ElasticTrafficFilterResponse> {
  const result = await _listSend(context, resourceGroupName, monitorName, options);
  return _listDeserialize(result);
}
