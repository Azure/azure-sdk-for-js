// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MaintenanceManagementContext as Client } from "../index.js";
import type {
  MaintenanceConfiguration,
  _ListMaintenanceConfigurationsResult,
} from "../../models/models.js";
import {
  maintenanceErrorDeserializer,
  maintenanceConfigurationDeserializer,
  _listMaintenanceConfigurationsResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PublicMaintenanceConfigurationsListOptionalParams,
  PublicMaintenanceConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: PublicMaintenanceConfigurationsListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Maintenance/publicMaintenanceConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

/** Get Public Maintenance Configuration records */
export function list(
  context: Client,
  options: PublicMaintenanceConfigurationsListOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<MaintenanceConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceName: string,
  options: PublicMaintenanceConfigurationsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceName: resourceName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<MaintenanceConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = maintenanceErrorDeserializer(result.body);
    throw error;
  }

  return maintenanceConfigurationDeserializer(result.body);
}

/** Get Public Maintenance Configuration record */
export async function get(
  context: Client,
  resourceName: string,
  options: PublicMaintenanceConfigurationsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<MaintenanceConfiguration> {
  const result = await _getSend(context, resourceName, options);
  return _getDeserialize(result);
}
