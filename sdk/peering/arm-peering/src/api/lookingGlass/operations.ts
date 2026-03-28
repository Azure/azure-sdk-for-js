// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PeeringManagementContext as Client } from "../index.js";
import type {
  LookingGlassOutput,
  LookingGlassCommand,
  LookingGlassSourceType,
} from "../../models/models.js";
import { errorResponseDeserializer, lookingGlassOutputDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { LookingGlassInvokeOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

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
  return context.path(path).post({
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
    error.details = errorResponseDeserializer(result.body);

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
