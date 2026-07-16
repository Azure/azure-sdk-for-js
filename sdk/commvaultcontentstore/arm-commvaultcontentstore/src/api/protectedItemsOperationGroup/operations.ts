// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContentStoreContext as Client } from "../index.js";
import type {
  CountProtectedItemsRequest,
  CountProtectedItemsResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  countProtectedItemsRequestSerializer,
  countProtectedItemsResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ProtectedItemsOperationGroupCountByProtectionGroupsOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _countByProtectionGroupsSend(
  context: Client,
  body: CountProtectedItemsRequest,
  options: ProtectedItemsOperationGroupCountByProtectionGroupsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Commvault.ContentStore/protectedItemCount{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: countProtectedItemsRequestSerializer(body),
  });
}

export async function _countByProtectionGroupsDeserialize(
  result: PathUncheckedResponse,
): Promise<CountProtectedItemsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return countProtectedItemsResponseDeserializer(result.body);
}

/** Gets the count of protected items for provided CCA resource IDs across subscriptions. */
export async function countByProtectionGroups(
  context: Client,
  body: CountProtectedItemsRequest,
  options: ProtectedItemsOperationGroupCountByProtectionGroupsOptionalParams = {
    requestOptions: {},
  },
): Promise<CountProtectedItemsResponse> {
  const result = await _countByProtectionGroupsSend(context, body, options);
  return _countByProtectionGroupsDeserialize(result);
}
