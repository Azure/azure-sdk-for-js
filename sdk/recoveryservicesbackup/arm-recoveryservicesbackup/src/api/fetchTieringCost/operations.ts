// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext as Client } from "../index.js";
import type {
  FetchTieringCostInfoRequestUnion,
  TieringCostInfoUnion,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  fetchTieringCostInfoRequestUnionSerializer,
  tieringCostInfoUnionDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { FetchTieringCostPostOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _postSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  parameters: FetchTieringCostInfoRequestUnion,
  options: FetchTieringCostPostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupTieringCost/default/fetchTieringCost{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
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
    body: fetchTieringCostInfoRequestUnionSerializer(parameters),
  });
}

export async function _postDeserialize(
  result: PathUncheckedResponse,
): Promise<TieringCostInfoUnion> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return tieringCostInfoUnionDeserializer(result.body);
}

/**
 * Provides the details of the tiering related sizes and cost.
 * Status of the operation can be fetched using GetTieringCostOperationStatus API and result using GetTieringCostOperationResult API.
 */
export function post(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  parameters: FetchTieringCostInfoRequestUnion,
  options: FetchTieringCostPostOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TieringCostInfoUnion>, TieringCostInfoUnion> {
  return getLongRunningPoller(context, _postDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _postSend(context, resourceGroupName, vaultName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<TieringCostInfoUnion>, TieringCostInfoUnion>;
}
