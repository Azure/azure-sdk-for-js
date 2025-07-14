// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _BinaryHardeningResourceListResult,
  _binaryHardeningResourceListResultDeserializer,
  BinaryHardeningResource,
} from "../../models/models.js";
import { BinaryHardeningListByFirmwareOptionalParams } from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByFirmwareSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  firmwareId: string,
  options: BinaryHardeningListByFirmwareOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/firmwares/{firmwareId}/binaryHardeningResults{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      firmwareId: firmwareId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByFirmwareDeserialize(
  result: PathUncheckedResponse,
): Promise<_BinaryHardeningResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _binaryHardeningResourceListResultDeserializer(result.body);
}

/** Lists binary hardening analysis results of a firmware. */
export function listByFirmware(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  firmwareId: string,
  options: BinaryHardeningListByFirmwareOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BinaryHardeningResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByFirmwareSend(context, resourceGroupName, workspaceName, firmwareId, options),
    _listByFirmwareDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
