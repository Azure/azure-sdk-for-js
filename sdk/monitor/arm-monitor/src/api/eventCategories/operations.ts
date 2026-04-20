// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type {
  MicrosoftActivityLogsLocalizableString,
  _MicrosoftActivityLogsEventCategoryCollection,
} from "../../models/microsoft/activityLogs/models.js";
import {
  microsoftActivityLogsErrorResponseDeserializer,
  _microsoftActivityLogsEventCategoryCollectionDeserializer,
} from "../../models/microsoft/activityLogs/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { EventCategoriesListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: EventCategoriesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Insights/eventcategories{?api%2Dversion}",
    {
      "api%2Dversion": "2015-04-01",
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
): Promise<_MicrosoftActivityLogsEventCategoryCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftActivityLogsErrorResponseDeserializer(result.body);

    throw error;
  }

  return _microsoftActivityLogsEventCategoryCollectionDeserializer(result.body);
}

/** Get the list of available event categories supported in the Activity Logs Service.<br>The current list includes the following: Administrative, Security, ServiceHealth, Alert, Recommendation, Policy. */
export function list(
  context: Client,
  options: EventCategoriesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MicrosoftActivityLogsLocalizableString> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2015-04-01" },
  );
}
