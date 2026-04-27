// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext as Client } from "../index.js";
import type {
  ReplicationEligibilityResults,
  ReplicationEligibilityResultsCollection,
} from "../../models/models.js";
import {
  replicationEligibilityResultsDeserializer,
  replicationEligibilityResultsCollectionDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReplicationEligibilityResultsListOptionalParams,
  ReplicationEligibilityResultsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  virtualMachineName: string,
  options: ReplicationEligibilityResultsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Compute/virtualMachines/{virtualMachineName}/providers/Microsoft.RecoveryServices/replicationEligibilityResults{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualMachineName: virtualMachineName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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
): Promise<ReplicationEligibilityResultsCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationEligibilityResultsCollectionDeserializer(result.body);
}

/** Validates whether a given VM can be protected or not in which case returns list of errors. */
export async function list(
  context: Client,
  resourceGroupName: string,
  virtualMachineName: string,
  options: ReplicationEligibilityResultsListOptionalParams = { requestOptions: {} },
): Promise<ReplicationEligibilityResultsCollection> {
  const result = await _listSend(context, resourceGroupName, virtualMachineName, options);
  return _listDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  virtualMachineName: string,
  options: ReplicationEligibilityResultsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Compute/virtualMachines/{virtualMachineName}/providers/Microsoft.RecoveryServices/replicationEligibilityResults/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualMachineName: virtualMachineName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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
): Promise<ReplicationEligibilityResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationEligibilityResultsDeserializer(result.body);
}

/** Validates whether a given VM can be protected or not in which case returns list of errors. */
export async function get(
  context: Client,
  resourceGroupName: string,
  virtualMachineName: string,
  options: ReplicationEligibilityResultsGetOptionalParams = { requestOptions: {} },
): Promise<ReplicationEligibilityResults> {
  const result = await _getSend(context, resourceGroupName, virtualMachineName, options);
  return _getDeserialize(result);
}
