// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ExtensionValue,
  extensionValueDeserializer,
  _ExtensionValueListResult,
  _extensionValueListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ExtensionMetadataListOptionalParams,
  ExtensionMetadataGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  location: string,
  publisher: string,
  extensionType: string,
  options: ExtensionMetadataListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HybridCompute/locations/{location}/publishers/{publisher}/extensionTypes/{extensionType}/versions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      publisher: publisher,
      extensionType: extensionType,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
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
): Promise<_ExtensionValueListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _extensionValueListResultDeserializer(result.body);
}

/** Gets all Extension versions based on location, publisher, extensionType */
export function list(
  context: Client,
  location: string,
  publisher: string,
  extensionType: string,
  options: ExtensionMetadataListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExtensionValue> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, publisher, extensionType, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-16-preview",
    },
  );
}

export function _getSend(
  context: Client,
  location: string,
  publisher: string,
  extensionType: string,
  version: string,
  options: ExtensionMetadataGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HybridCompute/locations/{location}/publishers/{publisher}/extensionTypes/{extensionType}/versions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      publisher: publisher,
      extensionType: extensionType,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ExtensionValue> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return extensionValueDeserializer(result.body);
}

/** Gets an Extension Metadata based on location, publisher, extensionType and version */
export async function get(
  context: Client,
  location: string,
  publisher: string,
  extensionType: string,
  version: string,
  options: ExtensionMetadataGetOptionalParams = { requestOptions: {} },
): Promise<ExtensionValue> {
  const result = await _getSend(context, location, publisher, extensionType, version, options);
  return _getDeserialize(result);
}
