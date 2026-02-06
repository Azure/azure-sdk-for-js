// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext as Client } from "../index.js";
import type { PrivateLinkResource } from "../../models/models.js";
import {
  errorResponseDeserializer,
  privateLinkResourceSerializer,
  privateLinkResourceDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ResolvePrivateLinkServiceIdPostOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _postSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: PrivateLinkResource,
  options: ResolvePrivateLinkServiceIdPostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resolvePrivateLinkServiceId{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: privateLinkResourceSerializer(parameters),
  });
}

export async function _postDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return privateLinkResourceDeserializer(result.body);
}

/** Gets the private link service ID for the specified managed cluster. */
export async function post(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: PrivateLinkResource,
  options: ResolvePrivateLinkServiceIdPostOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkResource> {
  const result = await _postSend(context, resourceGroupName, resourceName, parameters, options);
  return _postDeserialize(result);
}
