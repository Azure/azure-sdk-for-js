// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureRedHatOpenShiftContext as Client } from "../index.js";
import type { OpenShiftVersion, _OpenShiftVersionList } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  openShiftVersionDeserializer,
  _openShiftVersionListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  OpenShiftVersionsListOptionalParams,
  OpenShiftVersionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  location: string,
  options: OpenShiftVersionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.RedHatOpenShift/locations/{location}/openShiftVersions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-07-25",
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
): Promise<_OpenShiftVersionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _openShiftVersionListDeserializer(result.body);
}

/** The operation returns the installable OpenShift versions as a string. */
export function list(
  context: Client,
  location: string,
  options: OpenShiftVersionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<OpenShiftVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-25" },
  );
}

export function _getSend(
  context: Client,
  location: string,
  openShiftVersion: string,
  options: OpenShiftVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.RedHatOpenShift/locations/{location}/openShiftVersions/{openShiftVersion}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      openShiftVersion: openShiftVersion,
      "api%2Dversion": context.apiVersion ?? "2025-07-25",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<OpenShiftVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return openShiftVersionDeserializer(result.body);
}

/** This operation returns installable OpenShift version as a string. */
export async function get(
  context: Client,
  location: string,
  openShiftVersion: string,
  options: OpenShiftVersionsGetOptionalParams = { requestOptions: {} },
): Promise<OpenShiftVersion> {
  const result = await _getSend(context, location, openShiftVersion, options);
  return _getDeserialize(result);
}
