// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  get,
  list,
  listSkus,
  listOffers,
  listPublishers,
} from "../../api/virtualMachineImagesEdgeZoneOperationGroup/operations.js";
import type {
  VirtualMachineImagesEdgeZoneOperationGroupGetOptionalParams,
  VirtualMachineImagesEdgeZoneOperationGroupListOptionalParams,
  VirtualMachineImagesEdgeZoneOperationGroupListSkusOptionalParams,
  VirtualMachineImagesEdgeZoneOperationGroupListOffersOptionalParams,
  VirtualMachineImagesEdgeZoneOperationGroupListPublishersOptionalParams,
} from "../../api/virtualMachineImagesEdgeZoneOperationGroup/options.js";
import type { VirtualMachineImageResource, VirtualMachineImage } from "../../models/models.js";

/** Interface representing a VirtualMachineImagesEdgeZoneOperationGroup operations. */
export interface VirtualMachineImagesEdgeZoneOperationGroupOperations {
  /** Gets a virtual machine image in an edge zone. */
  get: (
    location: string,
    edgeZone: string,
    publisherName: string,
    offer: string,
    skus: string,
    version: string,
    options?: VirtualMachineImagesEdgeZoneOperationGroupGetOptionalParams,
  ) => Promise<VirtualMachineImage>;
  /** Gets a list of all virtual machine image versions for the specified location, edge zone, publisher, offer, and SKU. */
  list: (
    location: string,
    edgeZone: string,
    publisherName: string,
    offer: string,
    skus: string,
    options?: VirtualMachineImagesEdgeZoneOperationGroupListOptionalParams,
  ) => Promise<VirtualMachineImageResource[]>;
  /** Gets a list of virtual machine image SKUs for the specified location, edge zone, publisher, and offer. */
  listSkus: (
    location: string,
    edgeZone: string,
    publisherName: string,
    offer: string,
    options?: VirtualMachineImagesEdgeZoneOperationGroupListSkusOptionalParams,
  ) => Promise<VirtualMachineImageResource[]>;
  /** Gets a list of virtual machine image offers for the specified location, edge zone and publisher. */
  listOffers: (
    location: string,
    edgeZone: string,
    publisherName: string,
    options?: VirtualMachineImagesEdgeZoneOperationGroupListOffersOptionalParams,
  ) => Promise<VirtualMachineImageResource[]>;
  /** Gets a list of virtual machine image publishers for the specified Azure location and edge zone. */
  listPublishers: (
    location: string,
    edgeZone: string,
    options?: VirtualMachineImagesEdgeZoneOperationGroupListPublishersOptionalParams,
  ) => Promise<VirtualMachineImageResource[]>;
}

function _getVirtualMachineImagesEdgeZoneOperationGroup(context: ComputeManagementContext) {
  return {
    get: (
      location: string,
      edgeZone: string,
      publisherName: string,
      offer: string,
      skus: string,
      version: string,
      options?: VirtualMachineImagesEdgeZoneOperationGroupGetOptionalParams,
    ) => get(context, location, edgeZone, publisherName, offer, skus, version, options),
    list: (
      location: string,
      edgeZone: string,
      publisherName: string,
      offer: string,
      skus: string,
      options?: VirtualMachineImagesEdgeZoneOperationGroupListOptionalParams,
    ) => list(context, location, edgeZone, publisherName, offer, skus, options),
    listSkus: (
      location: string,
      edgeZone: string,
      publisherName: string,
      offer: string,
      options?: VirtualMachineImagesEdgeZoneOperationGroupListSkusOptionalParams,
    ) => listSkus(context, location, edgeZone, publisherName, offer, options),
    listOffers: (
      location: string,
      edgeZone: string,
      publisherName: string,
      options?: VirtualMachineImagesEdgeZoneOperationGroupListOffersOptionalParams,
    ) => listOffers(context, location, edgeZone, publisherName, options),
    listPublishers: (
      location: string,
      edgeZone: string,
      options?: VirtualMachineImagesEdgeZoneOperationGroupListPublishersOptionalParams,
    ) => listPublishers(context, location, edgeZone, options),
  };
}

export function _getVirtualMachineImagesEdgeZoneOperationGroupOperations(
  context: ComputeManagementContext,
): VirtualMachineImagesEdgeZoneOperationGroupOperations {
  return {
    ..._getVirtualMachineImagesEdgeZoneOperationGroup(context),
  };
}
