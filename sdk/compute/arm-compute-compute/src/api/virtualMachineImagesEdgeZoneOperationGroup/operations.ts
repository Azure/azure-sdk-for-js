// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext as Client } from "../index.js";
import type { VirtualMachineImageResource, VirtualMachineImage } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  virtualMachineImageDeserializer,
  virtualMachineImageResourceArrayDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualMachineImagesEdgeZoneOperationGroupGetOptionalParams,
  VirtualMachineImagesEdgeZoneOperationGroupListOptionalParams,
  VirtualMachineImagesEdgeZoneOperationGroupListSkusOptionalParams,
  VirtualMachineImagesEdgeZoneOperationGroupListOffersOptionalParams,
  VirtualMachineImagesEdgeZoneOperationGroupListPublishersOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  location: string,
  edgeZone: string,
  publisherName: string,
  offer: string,
  skus: string,
  version: string,
  options: VirtualMachineImagesEdgeZoneOperationGroupGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions/{version}{?api%2Dversion}",
    {
      location: location,
      edgeZone: edgeZone,
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

/** Gets a virtual machine image in an edge zone. */
export async function get(
  context: Client,
  location: string,
  edgeZone: string,
  publisherName: string,
  offer: string,
  skus: string,
  version: string,
  options: VirtualMachineImagesEdgeZoneOperationGroupGetOptionalParams = {
    requestOptions: {},
  },
): Promise<VirtualMachineImage> {
  const result = await _getSend(
    context,
    location,
    edgeZone,
    publisherName,
    offer,
    skus,
    version,
    options,
  );
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  location: string,
  edgeZone: string,
  publisherName: string,
  offer: string,
  skus: string,
  options: VirtualMachineImagesEdgeZoneOperationGroupListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions{?api%2Dversion,%24expand,%24top,%24orderby}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      edgeZone: edgeZone,
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

/** Gets a list of all virtual machine image versions for the specified location, edge zone, publisher, offer, and SKU. */
export async function list(
  context: Client,
  location: string,
  edgeZone: string,
  publisherName: string,
  offer: string,
  skus: string,
  options: VirtualMachineImagesEdgeZoneOperationGroupListOptionalParams = {
    requestOptions: {},
  },
): Promise<VirtualMachineImageResource[]> {
  const result = await _listSend(context, location, edgeZone, publisherName, offer, skus, options);
  return _listDeserialize(result);
}

export function _listSkusSend(
  context: Client,
  location: string,
  edgeZone: string,
  publisherName: string,
  offer: string,
  options: VirtualMachineImagesEdgeZoneOperationGroupListSkusOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      edgeZone: edgeZone,
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

/** Gets a list of virtual machine image SKUs for the specified location, edge zone, publisher, and offer. */
export async function listSkus(
  context: Client,
  location: string,
  edgeZone: string,
  publisherName: string,
  offer: string,
  options: VirtualMachineImagesEdgeZoneOperationGroupListSkusOptionalParams = {
    requestOptions: {},
  },
): Promise<VirtualMachineImageResource[]> {
  const result = await _listSkusSend(context, location, edgeZone, publisherName, offer, options);
  return _listSkusDeserialize(result);
}

export function _listOffersSend(
  context: Client,
  location: string,
  edgeZone: string,
  publisherName: string,
  options: VirtualMachineImagesEdgeZoneOperationGroupListOffersOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers/{publisherName}/artifacttypes/vmimage/offers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      edgeZone: edgeZone,
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

/** Gets a list of virtual machine image offers for the specified location, edge zone and publisher. */
export async function listOffers(
  context: Client,
  location: string,
  edgeZone: string,
  publisherName: string,
  options: VirtualMachineImagesEdgeZoneOperationGroupListOffersOptionalParams = {
    requestOptions: {},
  },
): Promise<VirtualMachineImageResource[]> {
  const result = await _listOffersSend(context, location, edgeZone, publisherName, options);
  return _listOffersDeserialize(result);
}

export function _listPublishersSend(
  context: Client,
  location: string,
  edgeZone: string,
  options: VirtualMachineImagesEdgeZoneOperationGroupListPublishersOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers{?api%2Dversion}",
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

/** Gets a list of virtual machine image publishers for the specified Azure location and edge zone. */
export async function listPublishers(
  context: Client,
  location: string,
  edgeZone: string,
  options: VirtualMachineImagesEdgeZoneOperationGroupListPublishersOptionalParams = {
    requestOptions: {},
  },
): Promise<VirtualMachineImageResource[]> {
  const result = await _listPublishersSend(context, location, edgeZone, options);
  return _listPublishersDeserialize(result);
}
