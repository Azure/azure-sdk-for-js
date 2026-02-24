// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext as Client } from "../index.js";
import type {
  ListRecoveryPointsRecommendedForMoveRequest,
  _RecoveryPointResourceList,
  RecoveryPointResource,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  listRecoveryPointsRecommendedForMoveRequestSerializer,
  _recoveryPointResourceListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { RecoveryPointsRecommendedForMoveListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  containerName: string,
  protectedItemName: string,
  parameters: ListRecoveryPointsRecommendedForMoveRequest,
  options: RecoveryPointsRecommendedForMoveListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}/protectedItems/{protectedItemName}/recoveryPointsRecommendedForMove{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      fabricName: fabricName,
      containerName: containerName,
      protectedItemName: protectedItemName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: listRecoveryPointsRecommendedForMoveRequestSerializer(parameters),
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_RecoveryPointResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _recoveryPointResourceListDeserializer(result.body);
}

/** Lists the recovery points recommended for move to another tier */
export function list(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  containerName: string,
  protectedItemName: string,
  parameters: ListRecoveryPointsRecommendedForMoveRequest,
  options: RecoveryPointsRecommendedForMoveListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RecoveryPointResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSend(
        context,
        vaultName,
        resourceGroupName,
        fabricName,
        containerName,
        protectedItemName,
        parameters,
        options,
      ),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}
