// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type {
  _RestorableMongodbResourcesListResult,
  RestorableMongodbResourcesGetResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  _restorableMongodbResourcesListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { RestorableMongodbResourcesListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  location: string,
  instanceId: string,
  options: RestorableMongodbResourcesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{instanceId}/restorableMongodbResources{?api%2Dversion,restoreLocation,restoreTimestampInUtc}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      instanceId: instanceId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      restoreLocation: options?.restoreLocation,
      restoreTimestampInUtc: options?.restoreTimestampInUtc,
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
): Promise<_RestorableMongodbResourcesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _restorableMongodbResourcesListResultDeserializer(result.body);
}

/** Return a list of database and collection combo that exist on the account at the given timestamp and location. This helps in scenarios to validate what resources exist at given timestamp and location. This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission. */
export function list(
  context: Client,
  location: string,
  instanceId: string,
  options: RestorableMongodbResourcesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RestorableMongodbResourcesGetResult> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, instanceId, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}
