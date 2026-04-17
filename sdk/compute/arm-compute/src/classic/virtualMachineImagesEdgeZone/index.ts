// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  get,
  list,
  listSkus,
  listOffers,
  listPublishers,
} from "../../api/virtualMachineImagesEdgeZone/operations.js";
import type {
  VirtualMachineImagesEdgeZoneGetOptionalParams,
  VirtualMachineImagesEdgeZoneListOptionalParams,
  VirtualMachineImagesEdgeZoneListSkusOptionalParams,
  VirtualMachineImagesEdgeZoneListOffersOptionalParams,
  VirtualMachineImagesEdgeZoneListPublishersOptionalParams,
} from "../../api/virtualMachineImagesEdgeZone/options.js";
import type {
  VirtualMachineImageResource,
  VirtualMachineImage,
} from "../../models/compute/models.js";

/** Interface representing a VirtualMachineImagesEdgeZone operations. */
export interface VirtualMachineImagesEdgeZoneOperations {
  /** Gets a virtual machine image in an edge zone. */
  get: (
    location: string,
    edgeZone: string,
    publisherName: string,
    offer: string,
    skus: string,
    version: string,
    options?: VirtualMachineImagesEdgeZoneGetOptionalParams,
  ) => Promise<VirtualMachineImage>;
  /** Gets a list of all virtual machine image versions for the specified location, edge zone, publisher, offer, and SKU. */
  list: (
    location: string,
    edgeZone: string,
    publisherName: string,
    offer: string,
    skus: string,
    options?: VirtualMachineImagesEdgeZoneListOptionalParams,
  ) => Promise<VirtualMachineImageResource[]>;
  /** Gets a list of virtual machine image SKUs for the specified location, edge zone, publisher, and offer. */
  listSkus: (
    location: string,
    edgeZone: string,
    publisherName: string,
    offer: string,
    options?: VirtualMachineImagesEdgeZoneListSkusOptionalParams,
  ) => Promise<VirtualMachineImageResource[]>;
  /** Gets a list of virtual machine image offers for the specified location, edge zone and publisher. */
  listOffers: (
    location: string,
    edgeZone: string,
    publisherName: string,
    options?: VirtualMachineImagesEdgeZoneListOffersOptionalParams,
  ) => Promise<VirtualMachineImageResource[]>;
  /** Gets a list of virtual machine image publishers for the specified Azure location and edge zone. */
  listPublishers: (
    location: string,
    edgeZone: string,
    options?: VirtualMachineImagesEdgeZoneListPublishersOptionalParams,
  ) => Promise<VirtualMachineImageResource[]>;
}

function _getVirtualMachineImagesEdgeZone(context: ComputeContext) {
  return {
    get: (
      location: string,
      edgeZone: string,
      publisherName: string,
      offer: string,
      skus: string,
      version: string,
      options?: VirtualMachineImagesEdgeZoneGetOptionalParams,
    ) => get(context, location, edgeZone, publisherName, offer, skus, version, options),
    list: (
      location: string,
      edgeZone: string,
      publisherName: string,
      offer: string,
      skus: string,
      options?: VirtualMachineImagesEdgeZoneListOptionalParams,
    ) => list(context, location, edgeZone, publisherName, offer, skus, options),
    listSkus: (
      location: string,
      edgeZone: string,
      publisherName: string,
      offer: string,
      options?: VirtualMachineImagesEdgeZoneListSkusOptionalParams,
    ) => listSkus(context, location, edgeZone, publisherName, offer, options),
    listOffers: (
      location: string,
      edgeZone: string,
      publisherName: string,
      options?: VirtualMachineImagesEdgeZoneListOffersOptionalParams,
    ) => listOffers(context, location, edgeZone, publisherName, options),
    listPublishers: (
      location: string,
      edgeZone: string,
      options?: VirtualMachineImagesEdgeZoneListPublishersOptionalParams,
    ) => listPublishers(context, location, edgeZone, options),
  };
}

export function _getVirtualMachineImagesEdgeZoneOperations(
  context: ComputeContext,
): VirtualMachineImagesEdgeZoneOperations {
  return {
    ..._getVirtualMachineImagesEdgeZone(context),
  };
}
