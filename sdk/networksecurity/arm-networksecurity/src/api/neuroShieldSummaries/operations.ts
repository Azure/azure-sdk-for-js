// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkSecurityManagementContext as Client } from "../index.js";
import type { _NeuroShieldSummaryListResult, NeuroShieldSummary } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _neuroShieldSummaryListResultDeserializer,
  neuroShieldSummaryDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NeuroShieldSummariesGetOptionalParams,
  NeuroShieldSummariesListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  options: NeuroShieldSummariesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/neuroShields/{neuroShieldName}/summary/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      neuroShieldName: neuroShieldName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<NeuroShieldSummary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return neuroShieldSummaryDeserializer(result.body);
}

/** Gets the aggregate fleet overview singleton for a NeuroShield resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  options: NeuroShieldSummariesGetOptionalParams = { requestOptions: {} },
): Promise<NeuroShieldSummary> {
  const result = await _getSend(context, resourceGroupName, neuroShieldName, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  options: NeuroShieldSummariesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/neuroShields/{neuroShieldName}/summary{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      neuroShieldName: neuroShieldName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
      "%24top": options?.top,
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
): Promise<_NeuroShieldSummaryListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _neuroShieldSummaryListResultDeserializer(result.body);
}

/** Lists the aggregate fleet overview singleton for a NeuroShield resource. */
export function list(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  options: NeuroShieldSummariesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NeuroShieldSummary> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, neuroShieldName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-01-preview",
    },
  );
}
