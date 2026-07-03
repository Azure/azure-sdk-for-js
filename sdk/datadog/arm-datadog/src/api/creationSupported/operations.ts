// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftDatadogContext as Client } from "../index.js";
import type {
  _CreateResourceSupportedResponseList,
  CreateResourceSupportedResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _createResourceSupportedResponseListDeserializer,
  createResourceSupportedResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CreationSupportedGetOptionalParams,
  CreationSupportedListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  datadogOrganizationId: string,
  options: CreationSupportedGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Datadog/subscriptionStatuses/default{?api%2Dversion,datadogOrganizationId}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-12-26-preview",
      datadogOrganizationId: datadogOrganizationId,
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
): Promise<CreateResourceSupportedResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return createResourceSupportedResponseDeserializer(result.body);
}

/** Informs if the current subscription is being already monitored for selected Datadog organization. */
export async function get(
  context: Client,
  datadogOrganizationId: string,
  options: CreationSupportedGetOptionalParams = { requestOptions: {} },
): Promise<CreateResourceSupportedResponse> {
  const result = await _getSend(context, datadogOrganizationId, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  datadogOrganizationId: string,
  options: CreationSupportedListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Datadog/subscriptionStatuses{?api%2Dversion,datadogOrganizationId}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-12-26-preview",
      datadogOrganizationId: datadogOrganizationId,
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
): Promise<_CreateResourceSupportedResponseList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _createResourceSupportedResponseListDeserializer(result.body);
}

/** Informs if the current subscription is being already monitored for selected Datadog organization. */
export function list(
  context: Client,
  datadogOrganizationId: string,
  options: CreationSupportedListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CreateResourceSupportedResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, datadogOrganizationId, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-12-26-preview",
    },
  );
}
