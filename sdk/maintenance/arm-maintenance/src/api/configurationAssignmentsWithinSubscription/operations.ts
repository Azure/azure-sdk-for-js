// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementContext as Client } from "../index.js";
import {
  maintenanceErrorDeserializer,
  ConfigurationAssignment,
  _ListConfigurationAssignmentsResult,
  _listConfigurationAssignmentsResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ConfigurationAssignmentsWithinSubscriptionListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: ConfigurationAssignmentsWithinSubscriptionListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Maintenance/configurationAssignments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2023-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListConfigurationAssignmentsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = maintenanceErrorDeserializer(result.body);
    }

    throw error;
  }

  return _listConfigurationAssignmentsResultDeserializer(result.body);
}

/** [UNSUPPORTED] Get configuration assignment within a subscription. This API is not implemented yet. */
export function list(
  context: Client,
  options: ConfigurationAssignmentsWithinSubscriptionListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConfigurationAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2023-10-01-preview",
    },
  );
}
