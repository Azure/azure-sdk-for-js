// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ExtensionValueV2,
  extensionValueV2Deserializer,
  _ExtensionValueListResultV2,
  _extensionValueListResultV2Deserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ExtensionMetadataV2ListOptionalParams,
  ExtensionMetadataV2GetOptionalParams,
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
  options: ExtensionMetadataV2ListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.HybridCompute/locations/{location}/publishers/{publisher}/extensionTypes/{extensionType}/versions{?api%2Dversion}",
    {
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
): Promise<_ExtensionValueListResultV2> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _extensionValueListResultV2Deserializer(result.body);
}

/** Gets all Extension versions based on location, publisher, extensionType */
export function list(
  context: Client,
  location: string,
  publisher: string,
  extensionType: string,
  options: ExtensionMetadataV2ListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExtensionValueV2> {
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
  options: ExtensionMetadataV2GetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.HybridCompute/locations/{location}/publishers/{publisher}/extensionTypes/{extensionType}/versions/{version}{?api%2Dversion}",
    {
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ExtensionValueV2> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return extensionValueV2Deserializer(result.body);
}

/** Gets an Extension Metadata based on location, publisher, extensionType and version */
export async function get(
  context: Client,
  location: string,
  publisher: string,
  extensionType: string,
  version: string,
  options: ExtensionMetadataV2GetOptionalParams = { requestOptions: {} },
): Promise<ExtensionValueV2> {
  const result = await _getSend(context, location, publisher, extensionType, version, options);
  return _getDeserialize(result);
}
