// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyVaultManagementContext as Client } from "../index.js";
import type { MhsmPrivateLinkResourceListResult } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  mhsmPrivateLinkResourceListResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { MhsmPrivateLinkResourcesListByMhsmResourceOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByMhsmResourceSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: MhsmPrivateLinkResourcesListByMhsmResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/managedHSMs/{name}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
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

export async function _listByMhsmResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<MhsmPrivateLinkResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return mhsmPrivateLinkResourceListResultDeserializer(result.body);
}

/** Gets the private link resources supported for the managed hsm pool. */
export async function listByMhsmResource(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: MhsmPrivateLinkResourcesListByMhsmResourceOptionalParams = {
    requestOptions: {},
  },
): Promise<MhsmPrivateLinkResourceListResult> {
  const result = await _listByMhsmResourceSend(context, resourceGroupName, name, options);
  return _listByMhsmResourceDeserialize(result);
}
