// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _VaultUsageList,
  _vaultUsageListDeserializer,
  VaultUsage,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { UsagesListByVaultsOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

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
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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

export async function _listByVaultsDeserialize(
  result: PathUncheckedResponse,
): Promise<_VaultUsageList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

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
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}
