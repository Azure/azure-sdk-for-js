// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type { Snapshot, DeletedSite } from "../../models/models.js";
import {
  defaultErrorResponseDeserializer,
  snapshotArrayDeserializer,
  deletedSiteDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GlobalGetSubscriptionOperationWithAsyncResponseOptionalParams,
  GlobalGetDeletedWebAppSnapshotsOptionalParams,
  GlobalGetDeletedWebAppOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSubscriptionOperationWithAsyncResponseSend(
  context: Client,
  location: string,
  operationId: string,
  options: GlobalGetSubscriptionOperationWithAsyncResponseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/locations/{location}/operations/{operationId}{?api%2Dversion}",
    {
      location: location,
      operationId: operationId,
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getSubscriptionOperationWithAsyncResponseDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Gets an operation in a subscription and given region */
export async function getSubscriptionOperationWithAsyncResponse(
  context: Client,
  location: string,
  operationId: string,
  options: GlobalGetSubscriptionOperationWithAsyncResponseOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getSubscriptionOperationWithAsyncResponseSend(
    context,
    location,
    operationId,
    options,
  );
  return _getSubscriptionOperationWithAsyncResponseDeserialize(result);
}

export function _getDeletedWebAppSnapshotsSend(
  context: Client,
  deletedSiteId: string,
  options: GlobalGetDeletedWebAppSnapshotsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/deletedSites/{deletedSiteId}/snapshots{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      deletedSiteId: deletedSiteId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getDeletedWebAppSnapshotsDeserialize(
  result: PathUncheckedResponse,
): Promise<Snapshot[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return snapshotArrayDeserializer(result.body);
}

/** Description for Get all deleted apps for a subscription. */
export async function getDeletedWebAppSnapshots(
  context: Client,
  deletedSiteId: string,
  options: GlobalGetDeletedWebAppSnapshotsOptionalParams = { requestOptions: {} },
): Promise<Snapshot[]> {
  const result = await _getDeletedWebAppSnapshotsSend(context, deletedSiteId, options);
  return _getDeletedWebAppSnapshotsDeserialize(result);
}

export function _getDeletedWebAppSend(
  context: Client,
  deletedSiteId: string,
  options: GlobalGetDeletedWebAppOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/deletedSites/{deletedSiteId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      deletedSiteId: deletedSiteId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getDeletedWebAppDeserialize(
  result: PathUncheckedResponse,
): Promise<DeletedSite> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return deletedSiteDeserializer(result.body);
}

/** Description for Get deleted app for a subscription. */
export async function getDeletedWebApp(
  context: Client,
  deletedSiteId: string,
  options: GlobalGetDeletedWebAppOptionalParams = { requestOptions: {} },
): Promise<DeletedSite> {
  const result = await _getDeletedWebAppSend(context, deletedSiteId, options);
  return _getDeletedWebAppDeserialize(result);
}
