// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DurableTaskContext as Client } from "../index.js";
import type { Detector, _DetectorListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  detectorDeserializer,
  _detectorListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DetectorsListBySchedulerOptionalParams,
  DetectorsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySchedulerSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: DetectorsListBySchedulerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/detectors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

export async function _listBySchedulerDeserialize(
  result: PathUncheckedResponse,
): Promise<_DetectorListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _detectorListResultDeserializer(result.body);
}

/** Lists the diagnostic detectors belonging to a scheduler. */
export function listByScheduler(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: DetectorsListBySchedulerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Detector> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySchedulerSend(context, resourceGroupName, schedulerName, options),
    _listBySchedulerDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  detectorId: string,
  options: DetectorsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/detectors/{detectorId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      detectorId: detectorId,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Detector> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return detectorDeserializer(result.body);
}

/** Gets a diagnostic detector. */
export async function get(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  detectorId: string,
  options: DetectorsGetOptionalParams = { requestOptions: {} },
): Promise<Detector> {
  const result = await _getSend(context, resourceGroupName, schedulerName, detectorId, options);
  return _getDeserialize(result);
}
