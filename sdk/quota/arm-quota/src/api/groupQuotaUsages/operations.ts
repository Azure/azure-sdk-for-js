// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureQuotaExtensionAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _ResourceUsageList,
  _resourceUsageListDeserializer,
  ResourceUsages,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { GroupQuotaUsagesListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  resourceProviderName: string,
  location: string,
  options: GroupQuotaUsagesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/locationUsages/{location}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      groupQuotaName: groupQuotaName,
      resourceProviderName: resourceProviderName,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-09-01",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_ResourceUsageList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _resourceUsageListDeserializer(result.body);
}

/** Gets the GroupQuotas usages and limits(quota). Location is required paramter. */
export function list(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  resourceProviderName: string,
  location: string,
  options: GroupQuotaUsagesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ResourceUsages> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSend(
        context,
        managementGroupId,
        groupQuotaName,
        resourceProviderName,
        location,
        options,
      ),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-09-01" },
  );
}
