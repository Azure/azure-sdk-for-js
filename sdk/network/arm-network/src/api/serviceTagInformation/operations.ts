// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import {
  ServiceTagInformation,
  _ServiceTagInformationListResult,
  _serviceTagInformationListResultDeserializer,
} from "../../models/microsoft/network/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ServiceTagInformationListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  location: string,
  options: ServiceTagInformationListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/locations/{location}/serviceTagDetails{?api%2Dversion,noAddressPrefixes,tagName}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": "2025-07-01",
      noAddressPrefixes: options?.noAddressPrefixes,
      tagName: options?.tagName,
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
): Promise<_ServiceTagInformationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _serviceTagInformationListResultDeserializer(result.body);
}

/** Gets a list of service tag information resources with pagination. */
export function list(
  context: Client,
  location: string,
  options: ServiceTagInformationListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ServiceTagInformation> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-07-01" },
  );
}
