// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext as Client } from "../index.js";
import type {
  AdvancedThreatProtectionSettingsModel,
  ThreatProtectionName,
  _AdvancedThreatProtectionSettingsList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  advancedThreatProtectionSettingsModelDeserializer,
  _advancedThreatProtectionSettingsListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AdvancedThreatProtectionSettingsListByServerOptionalParams,
  AdvancedThreatProtectionSettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: AdvancedThreatProtectionSettingsListByServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/advancedThreatProtectionSettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion,
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

export async function _listByServerDeserialize(
  result: PathUncheckedResponse,
): Promise<_AdvancedThreatProtectionSettingsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _advancedThreatProtectionSettingsListDeserializer(result.body);
}

/** Lists state of advanced threat protection settings for a server. */
export function listByServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: AdvancedThreatProtectionSettingsListByServerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AdvancedThreatProtectionSettingsModel> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServerSend(context, resourceGroupName, serverName, options),
    _listByServerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  threatProtectionName: ThreatProtectionName,
  options: AdvancedThreatProtectionSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/advancedThreatProtectionSettings/{threatProtectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      threatProtectionName: threatProtectionName,
      "api%2Dversion": context.apiVersion,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<AdvancedThreatProtectionSettingsModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return advancedThreatProtectionSettingsModelDeserializer(result.body);
}

/** Gets state of advanced threat protection settings for a server. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  threatProtectionName: ThreatProtectionName,
  options: AdvancedThreatProtectionSettingsGetOptionalParams = { requestOptions: {} },
): Promise<AdvancedThreatProtectionSettingsModel> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    threatProtectionName,
    options,
  );
  return _getDeserialize(result);
}
