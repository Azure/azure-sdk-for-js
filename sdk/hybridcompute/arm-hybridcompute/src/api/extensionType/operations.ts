// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _ExtensionTypeListResult,
  _extensionTypeListResultDeserializer,
  ExtensionType,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ExtensionTypeListOptionalParams } from "./options.js";
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
  options: ExtensionTypeListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.HybridCompute/locations/{location}/publishers/{publisher}/extensionTypes{?api%2Dversion}",
    {
      location: location,
      publisher: publisher,
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
): Promise<_ExtensionTypeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _extensionTypeListResultDeserializer(result.body);
}

/** Gets all Extension types based on location and publisher */
export function list(
  context: Client,
  location: string,
  publisher: string,
  options: ExtensionTypeListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExtensionType> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, publisher, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-16-preview",
    },
  );
}
