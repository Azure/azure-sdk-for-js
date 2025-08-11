// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  HybridIdentityMetadata,
  hybridIdentityMetadataDeserializer,
  _HybridIdentityMetadataListResult,
  _hybridIdentityMetadataListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  HybridIdentityMetadataListByVirtualMachineInstanceOptionalParams,
  HybridIdentityMetadataGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByVirtualMachineInstanceSend(
  context: Client,
  resourceUri: string,
  options: HybridIdentityMetadataListByVirtualMachineInstanceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/hybridIdentityMetadata{?api%2Dversion}",
    {
      resourceUri: resourceUri,
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

export async function _listByVirtualMachineInstanceDeserialize(
  result: PathUncheckedResponse,
): Promise<_HybridIdentityMetadataListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _hybridIdentityMetadataListResultDeserializer(result.body);
}

/** Returns the list of HybridIdentityMetadata of the given vm. */
export function listByVirtualMachineInstance(
  context: Client,
  resourceUri: string,
  options: HybridIdentityMetadataListByVirtualMachineInstanceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<HybridIdentityMetadata> {
  return buildPagedAsyncIterator(
    context,
    () => _listByVirtualMachineInstanceSend(context, resourceUri, options),
    _listByVirtualMachineInstanceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceUri: string,
  options: HybridIdentityMetadataGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/hybridIdentityMetadata/default{?api%2Dversion}",
    {
      resourceUri: resourceUri,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<HybridIdentityMetadata> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return hybridIdentityMetadataDeserializer(result.body);
}

/** Implements HybridIdentityMetadata GET method. */
export async function get(
  context: Client,
  resourceUri: string,
  options: HybridIdentityMetadataGetOptionalParams = { requestOptions: {} },
): Promise<HybridIdentityMetadata> {
  const result = await _getSend(context, resourceUri, options);
  return _getDeserialize(result);
}
