// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceContext as Client } from "../index.js";
import {
  errorDeserializer,
  PrivateLinkResourceListResult,
  privateLinkResourceListResultDeserializer,
} from "../../models/models.js";
import { PrivateLinkResourcesListByBotResourceOptionalParams } from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByBotResourceSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: PrivateLinkResourcesListByBotResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByBotResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);
    throw error;
  }

  return privateLinkResourceListResultDeserializer(result.body);
}

/** Gets the private link resources that need to be created for a Bot. */
export async function listByBotResource(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: PrivateLinkResourcesListByBotResourceOptionalParams = {
    requestOptions: {},
  },
): Promise<PrivateLinkResourceListResult> {
  const result = await _listByBotResourceSend(context, resourceGroupName, resourceName, options);
  return _listByBotResourceDeserialize(result);
}
