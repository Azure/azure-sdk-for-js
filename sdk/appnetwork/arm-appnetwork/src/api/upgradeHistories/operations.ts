// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppLinkContext as Client } from "../index.js";
import type { _UpgradeHistoryListResult, UpgradeHistory } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _upgradeHistoryListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { UpgradeHistoriesListByAppLinkMemberOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByAppLinkMemberSend(
  context: Client,
  resourceGroupName: string,
  appLinkName: string,
  appLinkMemberName: string,
  options: UpgradeHistoriesListByAppLinkMemberOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppLink/appLinks/{appLinkName}/appLinkMembers/{appLinkMemberName}/upgradeHistories{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      appLinkName: appLinkName,
      appLinkMemberName: appLinkMemberName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
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

export async function _listByAppLinkMemberDeserialize(
  result: PathUncheckedResponse,
): Promise<_UpgradeHistoryListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _upgradeHistoryListResultDeserializer(result.body);
}

/** List UpgradeHistory resources by AppLinkMember. */
export function listByAppLinkMember(
  context: Client,
  resourceGroupName: string,
  appLinkName: string,
  appLinkMemberName: string,
  options: UpgradeHistoriesListByAppLinkMemberOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<UpgradeHistory> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByAppLinkMemberSend(context, resourceGroupName, appLinkName, appLinkMemberName, options),
    _listByAppLinkMemberDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-08-01-preview",
    },
  );
}
