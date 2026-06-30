// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext as Client } from "../index.js";
import type {
  _ManagedComputeCapacityListResult,
  ManagedComputeCapacity,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _managedComputeCapacityListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ManagedComputeCapacitiesListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  offer: string,
  options: ManagedComputeCapacitiesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/managedComputeCapacities{?api%2Dversion,offer,acceleratorType,deploymentId}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-05-15-preview",
      offer: offer,
      acceleratorType: options?.acceleratorType,
      deploymentId: options?.deploymentId,
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
): Promise<_ManagedComputeCapacityListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _managedComputeCapacityListResultDeserializer(result.body);
}

/**
 * Gets the managed compute capacities for a subscription. Returns available capacity
 * per accelerator type, including deployment size information.
 */
export function list(
  context: Client,
  offer: string,
  options: ManagedComputeCapacitiesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedComputeCapacity> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, offer, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-15-preview",
    },
  );
}
