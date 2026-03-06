// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext as Client } from "../index.js";
import type {
  BackupEngineBaseResource,
  _BackupEngineBaseResourceList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  backupEngineBaseResourceDeserializer,
  _backupEngineBaseResourceListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { BackupEnginesListOptionalParams, BackupEnginesGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  options: BackupEnginesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupEngines{?api%2Dversion,%24filter,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
      "%24filter": options?.filter,
      "%24skipToken": options?.skipToken,
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
): Promise<_BackupEngineBaseResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _backupEngineBaseResourceListDeserializer(result.body);
}

/** Backup management servers registered to Recovery Services Vault. Returns a pageable list of servers. */
export function list(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  options: BackupEnginesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BackupEngineBaseResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, vaultName, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  backupEngineName: string,
  options: BackupEnginesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupEngines/{backupEngineName}{?api%2Dversion,%24filter,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      backupEngineName: backupEngineName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
      "%24filter": options?.filter,
      "%24skipToken": options?.skipToken,
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
): Promise<BackupEngineBaseResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return backupEngineBaseResourceDeserializer(result.body);
}

/** Returns backup management server registered to Recovery Services Vault. */
export async function get(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  backupEngineName: string,
  options: BackupEnginesGetOptionalParams = { requestOptions: {} },
): Promise<BackupEngineBaseResource> {
  const result = await _getSend(context, vaultName, resourceGroupName, backupEngineName, options);
  return _getDeserialize(result);
}
