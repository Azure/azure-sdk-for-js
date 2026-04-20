// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type {
  _MicrosoftActivityLogsEventDataCollection,
  MicrosoftActivityLogsEventData,
} from "../../models/microsoft/activityLogs/models.js";
import {
  _microsoftActivityLogsEventDataCollectionDeserializer,
  microsoftActivityLogsErrorResponseDeserializer,
} from "../../models/microsoft/activityLogs/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ActivityLogsListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  filter: string,
  options: ActivityLogsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/eventtypes/management/values{?api%2Dversion,%24filter,%24select}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2015-04-01",
      "%24filter": filter,
      "%24select": options?.select,
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
): Promise<_MicrosoftActivityLogsEventDataCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftActivityLogsErrorResponseDeserializer(result.body);

    throw error;
  }

  return _microsoftActivityLogsEventDataCollectionDeserializer(result.body);
}

/** Provides the list of records from the activity logs. */
export function list(
  context: Client,
  filter: string,
  options: ActivityLogsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MicrosoftActivityLogsEventData> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, filter, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2015-04-01" },
  );
}
