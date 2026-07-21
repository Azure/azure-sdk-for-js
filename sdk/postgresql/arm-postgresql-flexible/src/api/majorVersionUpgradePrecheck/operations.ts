// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext as Client } from "../index.js";
import type {
  MajorVersionUpgradePrecheckResource,
  _MajorVersionUpgradePrecheckResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  majorVersionUpgradePrecheckResourceDeserializer,
  _majorVersionUpgradePrecheckResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MajorVersionUpgradePrecheckListOptionalParams,
  MajorVersionUpgradePrecheckGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: MajorVersionUpgradePrecheckListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/majorVersionUpgradePrecheck{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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
): Promise<_MajorVersionUpgradePrecheckResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _majorVersionUpgradePrecheckResourceListResultDeserializer(result.body);
}

/** Lists major version upgrade prechecks for a flexible server. */
export function list(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: MajorVersionUpgradePrecheckListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MajorVersionUpgradePrecheckResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, serverName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  precheckValidationId: string,
  options: MajorVersionUpgradePrecheckGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/majorVersionUpgradePrecheck/{precheckValidationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      precheckValidationId: precheckValidationId,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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
): Promise<MajorVersionUpgradePrecheckResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return majorVersionUpgradePrecheckResourceDeserializer(result.body);
}

/** Gets information about a major version upgrade precheck for a flexible server. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  precheckValidationId: string,
  options: MajorVersionUpgradePrecheckGetOptionalParams = { requestOptions: {} },
): Promise<MajorVersionUpgradePrecheckResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    precheckValidationId,
    options,
  );
  return _getDeserialize(result);
}
