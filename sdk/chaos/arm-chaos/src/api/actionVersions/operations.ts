// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ActionVersion,
  actionVersionDeserializer,
  _ActionVersionListResult,
  _actionVersionListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ActionVersionsListOptionalParams, ActionVersionsGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  location: string,
  actionName: string,
  options: ActionVersionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Chaos/locations/{location}/actions/{actionName}/versions{?api%2Dversion,continuationToken}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      actionName: actionName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      continuationToken: options?.continuationToken,
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
): Promise<_ActionVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _actionVersionListResultDeserializer(result.body);
}

/** Get a list of Action Version resources for a given location and action. */
export function list(
  context: Client,
  location: string,
  actionName: string,
  options: ActionVersionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ActionVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, actionName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  location: string,
  actionName: string,
  versionName: string,
  options: ActionVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Chaos/locations/{location}/actions/{actionName}/versions/{versionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      actionName: actionName,
      versionName: versionName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ActionVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return actionVersionDeserializer(result.body);
}

/** Get an Action Version resource for a given location and action. */
export async function get(
  context: Client,
  location: string,
  actionName: string,
  versionName: string,
  options: ActionVersionsGetOptionalParams = { requestOptions: {} },
): Promise<ActionVersion> {
  const result = await _getSend(context, location, actionName, versionName, options);
  return _getDeserialize(result);
}
