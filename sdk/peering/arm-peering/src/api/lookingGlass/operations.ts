// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  LookingGlassOutput,
  lookingGlassOutputDeserializer,
  LookingGlassCommand,
  LookingGlassSourceType,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { LookingGlassInvokeOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _invokeSend(
  context: Client,
  command: LookingGlassCommand,
  sourceType: LookingGlassSourceType,
  sourceLocation: string,
  destinationIP: string,
  options: LookingGlassInvokeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/lookingGlass{?api%2Dversion,command,sourceType,sourceLocation,destinationIP}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      command: command,
      sourceType: sourceType,
      sourceLocation: sourceLocation,
      destinationIP: destinationIP,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _invokeDeserialize(
  result: PathUncheckedResponse,
): Promise<LookingGlassOutput> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return lookingGlassOutputDeserializer(result.body);
}

/** Run looking glass functionality */
export async function invoke(
  context: Client,
  command: LookingGlassCommand,
  sourceType: LookingGlassSourceType,
  sourceLocation: string,
  destinationIP: string,
  options: LookingGlassInvokeOptionalParams = { requestOptions: {} },
): Promise<LookingGlassOutput> {
  const result = await _invokeSend(
    context,
    command,
    sourceType,
    sourceLocation,
    destinationIP,
    options,
  );
  return _invokeDeserialize(result);
}
