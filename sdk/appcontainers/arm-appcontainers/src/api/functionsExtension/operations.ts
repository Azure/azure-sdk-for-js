// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  defaultErrorResponseDeserializer,
  FunctionsExtensionInvokeFunctionsHostResponse,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { FunctionsExtensionInvokeFunctionsHostOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _invokeFunctionsHostSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  revisionName: string,
  functionAppName: string,
  options: FunctionsExtensionInvokeFunctionsHostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/revisions/{revisionName}/providers/Microsoft.App/functions/{functionAppName}/invoke{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      revisionName: revisionName,
      functionAppName: functionAppName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "text/plain", ...options.requestOptions?.headers },
  });
}

export async function _invokeFunctionsHostDeserialize(
  result: PathUncheckedResponse,
): Promise<FunctionsExtensionInvokeFunctionsHostResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Proxies a Functions host call to the function app backed by the container app. */
export async function invokeFunctionsHost(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  revisionName: string,
  functionAppName: string,
  options: FunctionsExtensionInvokeFunctionsHostOptionalParams = { requestOptions: {} },
): Promise<FunctionsExtensionInvokeFunctionsHostResponse> {
  const result = await _invokeFunctionsHostSend(
    context,
    resourceGroupName,
    containerAppName,
    revisionName,
    functionAppName,
    options,
  );
  return _invokeFunctionsHostDeserialize(result);
}
