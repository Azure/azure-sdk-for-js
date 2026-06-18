// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _ProtectableContainerResourceList,
  _protectableContainerResourceListDeserializer,
  ProtectableContainerResource,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ProtectableContainersListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  options: ProtectableContainersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectableContainers{?api%2Dversion,%24filter}",
    {
      vaultName: vaultName,
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      fabricName: fabricName,
      "api%2Dversion": context.apiVersion ?? "2026-01-31-preview",
      "%24filter": options?.filter,
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
): Promise<_ProtectableContainerResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _protectableContainerResourceListDeserializer(result.body);
}

/** Lists the containers that can be registered to Recovery Services Vault. */
export function list(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  options: ProtectableContainersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProtectableContainerResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, vaultName, resourceGroupName, fabricName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-31-preview",
    },
  );
}
