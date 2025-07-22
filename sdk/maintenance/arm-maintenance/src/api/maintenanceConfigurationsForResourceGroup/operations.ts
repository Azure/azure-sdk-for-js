// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementContext as Client } from "../index.js";
import {
  maintenanceErrorDeserializer,
  MaintenanceConfiguration,
  _ListMaintenanceConfigurationsResult,
  _listMaintenanceConfigurationsResultDeserializer,
} from "../../models/models.js";
import { MaintenanceConfigurationsForResourceGroupListOptionalParams } from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: MaintenanceConfigurationsForResourceGroupListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Maintenance/maintenanceConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListMaintenanceConfigurationsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = maintenanceErrorDeserializer(result.body);
    throw error;
  }

  return _listMaintenanceConfigurationsResultDeserializer(result.body);
}

/** Get Configuration records within a subscription and resource group */
export function list(
  context: Client,
  resourceGroupName: string,
  options: MaintenanceConfigurationsForResourceGroupListOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<MaintenanceConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
