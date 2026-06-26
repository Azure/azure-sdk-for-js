// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import {
  _VirtualMachineSizeListResult,
  _virtualMachineSizeListResultDeserializer,
  VirtualMachineSize,
} from "../../models/compute/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { VirtualMachineSizesListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  location: string,
  options: VirtualMachineSizesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/vmSizes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": "2026-03-01",
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
): Promise<_VirtualMachineSizeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _virtualMachineSizeListResultDeserializer(result.body);
}

/** This API is deprecated. Use [Resources Skus](https://docs.microsoft.com/rest/api/compute/resourceskus/list) */
export function list(
  context: Client,
  location: string,
  options: VirtualMachineSizesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualMachineSize> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-03-01" },
  );
}
