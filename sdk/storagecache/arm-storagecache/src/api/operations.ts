// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementContext as Client } from "./index.js";
import {
  amlFilesystemSubnetInfoSerializer,
  cloudErrorDeserializer,
  amlFilesystemCheckSubnetErrorDeserializer,
  requiredAmlFilesystemSubnetsSizeInfoSerializer,
  RequiredAmlFilesystemSubnetsSize,
  requiredAmlFilesystemSubnetsSizeDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import {
  GetRequiredAmlFSSubnetsSizeOptionalParams,
  CheckAmlFSSubnetsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getRequiredAmlFSSubnetsSizeSend(
  context: Client,
  options: GetRequiredAmlFSSubnetsSizeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.StorageCache/getRequiredAmlFSSubnetsSize{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: !options?.requiredAMLFilesystemSubnetsSizeInfo
        ? options?.requiredAMLFilesystemSubnetsSizeInfo
        : requiredAmlFilesystemSubnetsSizeInfoSerializer(
            options?.requiredAMLFilesystemSubnetsSizeInfo,
          ),
    });
}

export async function _getRequiredAmlFSSubnetsSizeDeserialize(
  result: PathUncheckedResponse,
): Promise<RequiredAmlFilesystemSubnetsSize> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return requiredAmlFilesystemSubnetsSizeDeserializer(result.body);
}

/** Get the number of available IP addresses needed for the AML file system information provided. */
export async function getRequiredAmlFSSubnetsSize(
  context: Client,
  options: GetRequiredAmlFSSubnetsSizeOptionalParams = { requestOptions: {} },
): Promise<RequiredAmlFilesystemSubnetsSize> {
  const result = await _getRequiredAmlFSSubnetsSizeSend(context, options);
  return _getRequiredAmlFSSubnetsSizeDeserialize(result);
}

export function _checkAmlFSSubnetsSend(
  context: Client,
  options: CheckAmlFSSubnetsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.StorageCache/checkAmlFSSubnets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: !options?.amlFilesystemSubnetInfo
        ? options?.amlFilesystemSubnetInfo
        : amlFilesystemSubnetInfoSerializer(options?.amlFilesystemSubnetInfo),
    });
}

export async function _checkAmlFSSubnetsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const statusCode = Number.parseInt(result.status);
    if (statusCode === 400) {
      if (result.body) {
        error.details = amlFilesystemCheckSubnetErrorDeserializer(result.body);
      }
    } else {
      if (result.body) {
        error.details = cloudErrorDeserializer(result.body);
      }
    }
    throw error;
  }

  return;
}

/** Check that subnets will be valid for AML file system create calls. */
export async function checkAmlFSSubnets(
  context: Client,
  options: CheckAmlFSSubnetsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkAmlFSSubnetsSend(context, options);
  return _checkAmlFSSubnetsDeserialize(result);
}
