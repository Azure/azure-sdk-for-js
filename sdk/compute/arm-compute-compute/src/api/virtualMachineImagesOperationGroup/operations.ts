// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext as Client } from "../index.js";
import type {
  VirtualMachineImageResource,
  VirtualMachineImage,
  VmImagesInEdgeZoneListResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  virtualMachineImageDeserializer,
  vmImagesInEdgeZoneListResultDeserializer,
  virtualMachineImageResourceArrayDeserializer,
  virtualMachineImageArrayDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualMachineImagesOperationGroupGetOptionalParams,
  VirtualMachineImagesOperationGroupListWithPropertiesOptionalParams,
  VirtualMachineImagesOperationGroupListOptionalParams,
  VirtualMachineImagesOperationGroupListSkusOptionalParams,
  VirtualMachineImagesOperationGroupListOffersOptionalParams,
  VirtualMachineImagesOperationGroupListPublishersOptionalParams,
  VirtualMachineImagesOperationGroupListByEdgeZoneOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  location: string,
  publisherName: string,
  offer: string,
  skus: string,
  version: string,
  options: VirtualMachineImagesOperationGroupGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions/{version}{?api%2Dversion}",
    {
      location: location,
      publisherName: publisherName,
      offer: offer,
      skus: skus,
      version: version,
      subscriptionId: context.subscriptionId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VirtualMachineImage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return virtualMachineImageDeserializer(result.body);
}

/** Gets a virtual machine image. */
export async function get(
  context: Client,
  location: string,
  publisherName: string,
  offer: string,
  skus: string,
  version: string,
  options: VirtualMachineImagesOperationGroupGetOptionalParams = {
    requestOptions: {},
  },
): Promise<VirtualMachineImage> {
  const result = await _getSend(context, location, publisherName, offer, skus, version, options);
  return _getDeserialize(result);
}

export function _listWithPropertiesSend(
  context: Client,
  location: string,
  publisherName: string,
  offer: string,
  skus: string,
  expand: string,
  options: VirtualMachineImagesOperationGroupListWithPropertiesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions?$expand=Properties{?api%2Dversion,%24expand,%24top,%24orderby}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      publisherName: publisherName,
      offer: offer,
      skus: skus,
      "api%2Dversion": context.apiVersion,
      "%24expand": expand,
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

export async function _listWithPropertiesDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineImage[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return virtualMachineImageArrayDeserializer(result.body);
}

export async function listWithProperties(
  context: Client,
  location: string,
  publisherName: string,
  offer: string,
  skus: string,
  expand: string,
  options: VirtualMachineImagesOperationGroupListWithPropertiesOptionalParams = {
    requestOptions: {},
  },
): Promise<VirtualMachineImage[]> {
  const result = await _listWithPropertiesSend(
    context,
    location,
    publisherName,
    offer,
    skus,
    expand,
    options,
  );
  return _listWithPropertiesDeserialize(result);
}

export function _listSend(
  context: Client,
  location: string,
  publisherName: string,
  offer: string,
  skus: string,
  options: VirtualMachineImagesOperationGroupListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions{?api%2Dversion,%24expand,%24top,%24orderby}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      publisherName: publisherName,
      offer: offer,
      skus: skus,
      "api%2Dversion": context.apiVersion,
      "%24expand": options?.expand,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineImageResource[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return virtualMachineImageResourceArrayDeserializer(result.body);
}

/** Gets a list of all virtual machine image versions for the specified location, publisher, offer, and SKU. */
export async function list(
  context: Client,
  location: string,
  publisherName: string,
  offer: string,
  skus: string,
  options: VirtualMachineImagesOperationGroupListOptionalParams = {
    requestOptions: {},
  },
): Promise<VirtualMachineImageResource[]> {
  const result = await _listSend(context, location, publisherName, offer, skus, options);
  return _listDeserialize(result);
}

export function _listSkusSend(
  context: Client,
  location: string,
  publisherName: string,
  offer: string,
  options: VirtualMachineImagesOperationGroupListSkusOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      publisherName: publisherName,
      offer: offer,
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

export async function _listSkusDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineImageResource[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return virtualMachineImageResourceArrayDeserializer(result.body);
}

/** Gets a list of virtual machine image SKUs for the specified location, publisher, and offer. */
export async function listSkus(
  context: Client,
  location: string,
  publisherName: string,
  offer: string,
  options: VirtualMachineImagesOperationGroupListSkusOptionalParams = {
    requestOptions: {},
  },
): Promise<VirtualMachineImageResource[]> {
  const result = await _listSkusSend(context, location, publisherName, offer, options);
  return _listSkusDeserialize(result);
}

export function _listOffersSend(
  context: Client,
  location: string,
  publisherName: string,
  options: VirtualMachineImagesOperationGroupListOffersOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers{?api%2Dversion}",
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

export async function _listOffersDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineImageResource[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return virtualMachineImageResourceArrayDeserializer(result.body);
}

/** Gets a list of virtual machine image offers for the specified location and publisher. */
export async function listOffers(
  context: Client,
  location: string,
  publisherName: string,
  options: VirtualMachineImagesOperationGroupListOffersOptionalParams = {
    requestOptions: {},
  },
): Promise<VirtualMachineImageResource[]> {
  const result = await _listOffersSend(context, location, publisherName, options);
  return _listOffersDeserialize(result);
}

export function _listPublishersSend(
  context: Client,
  location: string,
  options: VirtualMachineImagesOperationGroupListPublishersOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
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

export async function _listPublishersDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineImageResource[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return virtualMachineImageResourceArrayDeserializer(result.body);
}

/** Gets a list of virtual machine image publishers for the specified Azure location. */
export async function listPublishers(
  context: Client,
  location: string,
  options: VirtualMachineImagesOperationGroupListPublishersOptionalParams = {
    requestOptions: {},
  },
): Promise<VirtualMachineImageResource[]> {
  const result = await _listPublishersSend(context, location, options);
  return _listPublishersDeserialize(result);
}

export function _listByEdgeZoneSend(
  context: Client,
  location: string,
  edgeZone: string,
  options: VirtualMachineImagesOperationGroupListByEdgeZoneOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/vmimages{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      edgeZone: edgeZone,
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

export async function _listByEdgeZoneDeserialize(
  result: PathUncheckedResponse,
): Promise<VmImagesInEdgeZoneListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return vmImagesInEdgeZoneListResultDeserializer(result.body);
}

/** Gets a list of all virtual machine image versions for the specified edge zone */
export async function listByEdgeZone(
  context: Client,
  location: string,
  edgeZone: string,
  options: VirtualMachineImagesOperationGroupListByEdgeZoneOptionalParams = {
    requestOptions: {},
  },
): Promise<VmImagesInEdgeZoneListResult> {
  const result = await _listByEdgeZoneSend(context, location, edgeZone, options);
  return _listByEdgeZoneDeserialize(result);
}
