// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext as Client } from "../index.js";
import type {
  DeletedBackupVaultResource,
  _DeletedBackupVaultResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  deletedBackupVaultResourceDeserializer,
  _deletedBackupVaultResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DeletedBackupVaultsListByLocationOptionalParams,
  DeletedBackupVaultsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByLocationSend(
  context: Client,
  location: string,
  options: DeletedBackupVaultsListByLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataProtection/locations/{location}/deletedVaults{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
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

export async function _listByLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeletedBackupVaultResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _deletedBackupVaultResourceListResultDeserializer(result.body);
}

/** Lists deleted backup vaults by location */
export function listByLocation(
  context: Client,
  location: string,
  options: DeletedBackupVaultsListByLocationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeletedBackupVaultResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByLocationSend(context, location, options),
    _listByLocationDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-03-01" },
  );
}

export function _getSend(
  context: Client,
  location: string,
  deletedVaultName: string,
  options: DeletedBackupVaultsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataProtection/locations/{location}/deletedVaults/{deletedVaultName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      deletedVaultName: deletedVaultName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
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
): Promise<DeletedBackupVaultResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return deletedBackupVaultResourceDeserializer(result.body);
}

/** Gets a deleted backup vault */
export async function get(
  context: Client,
  location: string,
  deletedVaultName: string,
  options: DeletedBackupVaultsGetOptionalParams = { requestOptions: {} },
): Promise<DeletedBackupVaultResource> {
  const result = await _getSend(context, location, deletedVaultName, options);
  return _getDeserialize(result);
}
