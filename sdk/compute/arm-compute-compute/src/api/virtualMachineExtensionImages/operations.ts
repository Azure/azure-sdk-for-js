// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext as Client } from "../index.js";
import type { VirtualMachineExtensionImage } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  virtualMachineExtensionImageDeserializer,
  virtualMachineExtensionImageArrayDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualMachineExtensionImagesListVersionsOptionalParams,
  VirtualMachineExtensionImagesListTypesOptionalParams,
  VirtualMachineExtensionImagesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listVersionsSend(
  context: Client,
  location: string,
  publisherName: string,
  typeParam: string,
  options: VirtualMachineExtensionImagesListVersionsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmextension/types/{type}/versions{?api%2Dversion,%24filter,%24top,%24orderby}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      publisherName: publisherName,
      type: typeParam,
      "api%2Dversion": context.apiVersion,
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24orderby": options?.orderby,
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

export async function _listVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineExtensionImage[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return virtualMachineExtensionImageArrayDeserializer(result.body);
}

/** Gets a list of virtual machine extension image versions. */
export async function listVersions(
  context: Client,
  location: string,
  publisherName: string,
  typeParam: string,
  options: VirtualMachineExtensionImagesListVersionsOptionalParams = {
    requestOptions: {},
  },
): Promise<VirtualMachineExtensionImage[]> {
  const result = await _listVersionsSend(context, location, publisherName, typeParam, options);
  return _listVersionsDeserialize(result);
}

export function _listTypesSend(
  context: Client,
  location: string,
  publisherName: string,
  options: VirtualMachineExtensionImagesListTypesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmextension/types{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      publisherName: publisherName,
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

export async function _listTypesDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineExtensionImage[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return virtualMachineExtensionImageArrayDeserializer(result.body);
}

/** Gets a list of virtual machine extension image types. */
export async function listTypes(
  context: Client,
  location: string,
  publisherName: string,
  options: VirtualMachineExtensionImagesListTypesOptionalParams = {
    requestOptions: {},
  },
): Promise<VirtualMachineExtensionImage[]> {
  const result = await _listTypesSend(context, location, publisherName, options);
  return _listTypesDeserialize(result);
}

export function _getSend(
  context: Client,
  location: string,
  publisherName: string,
  typeParam: string,
  version: string,
  options: VirtualMachineExtensionImagesGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmextension/types/{type}/versions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      publisherName: publisherName,
      type: typeParam,
      version: version,
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
): Promise<VirtualMachineExtensionImage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return virtualMachineExtensionImageDeserializer(result.body);
}

/** Gets a virtual machine extension image. */
export async function get(
  context: Client,
  location: string,
  publisherName: string,
  typeParam: string,
  version: string,
  options: VirtualMachineExtensionImagesGetOptionalParams = {
    requestOptions: {},
  },
): Promise<VirtualMachineExtensionImage> {
  const result = await _getSend(context, location, publisherName, typeParam, version, options);
  return _getDeserialize(result);
}
