// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceContext as Client } from "../index.js";
import {
  errorDeserializer,
  BotChannel,
  botChannelDeserializer,
  SiteInfo,
  siteInfoSerializer,
  RegenerateKeysChannelName,
} from "../../models/models.js";
import { DirectLineRegenerateKeysOptionalParams } from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _regenerateKeysSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  channelName: RegenerateKeysChannelName,
  parameters: SiteInfo,
  options: DirectLineRegenerateKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/channels/{channelName}/regeneratekeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      channelName: channelName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: siteInfoSerializer(parameters),
  });
}

export async function _regenerateKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<BotChannel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);
    throw error;
  }

  return botChannelDeserializer(result.body);
}

/** Regenerates secret keys and returns them for the DirectLine Channel of a particular BotService resource */
export async function regenerateKeys(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  channelName: RegenerateKeysChannelName,
  parameters: SiteInfo,
  options: DirectLineRegenerateKeysOptionalParams = { requestOptions: {} },
): Promise<BotChannel> {
  const result = await _regenerateKeysSend(
    context,
    resourceGroupName,
    resourceName,
    channelName,
    parameters,
    options,
  );
  return _regenerateKeysDeserialize(result);
}
