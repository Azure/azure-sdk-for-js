// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesContext as Client } from "../index.js";
import type { _VaultUsageList, VaultUsage } from "../../models/models.js";
import { errorResponseDeserializer, _vaultUsageListDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { UsagesListByVaultsOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByVaultsSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: UsagesListByVaultsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/usages{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
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

export async function _listByVaultsDeserialize(
  result: PathUncheckedResponse,
): Promise<_VaultUsageList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _vaultUsageListDeserializer(result.body);
}

/** Fetches the usages of the vault. */
export function listByVaults(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: UsagesListByVaultsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VaultUsage> {
  return buildPagedAsyncIterator(
    context,
    () => _listByVaultsSend(context, resourceGroupName, vaultName, options),
    _listByVaultsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
