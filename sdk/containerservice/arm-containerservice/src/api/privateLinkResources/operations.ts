// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext as Client } from "../index.js";
import type { PrivateLinkResourcesListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  privateLinkResourcesListResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { PrivateLinkResourcesListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: PrivateLinkResourcesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/privateLinkResources{?api%2Dversion}",
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkResourcesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return privateLinkResourcesListResultDeserializer(result.body);
}

/** To learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters */
export async function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: PrivateLinkResourcesListOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkResourcesListResult> {
  const result = await _listSend(context, resourceGroupName, resourceName, options);
  return _listDeserialize(result);
}
