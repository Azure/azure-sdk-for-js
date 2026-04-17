// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  get,
  listWithProperties,
  list,
  listSkus,
  listOffers,
  listPublishers,
  listByEdgeZone,
} from "../../api/virtualMachineImages/operations.js";
import type {
  VirtualMachineImagesGetOptionalParams,
  VirtualMachineImagesListWithPropertiesOptionalParams,
  VirtualMachineImagesListOptionalParams,
  VirtualMachineImagesListSkusOptionalParams,
  VirtualMachineImagesListOffersOptionalParams,
  VirtualMachineImagesListPublishersOptionalParams,
  VirtualMachineImagesListByEdgeZoneOptionalParams,
} from "../../api/virtualMachineImages/options.js";
import type {
  VirtualMachineImageResource,
  VirtualMachineImage,
  VmImagesInEdgeZoneListResult,
} from "../../models/compute/models.js";

/** Interface representing a VirtualMachineImages operations. */
export interface VirtualMachineImagesOperations {
  /** Gets a virtual machine image. */
  get: (
    location: string,
    publisherName: string,
    offer: string,
    skus: string,
    version: string,
    options?: VirtualMachineImagesGetOptionalParams,
  ) => Promise<VirtualMachineImage>;
  listWithProperties: (
    location: string,
    publisherName: string,
    offer: string,
    skus: string,
    expand: string,
    options?: VirtualMachineImagesListWithPropertiesOptionalParams,
  ) => Promise<VirtualMachineImage[]>;
  /** Gets a list of all virtual machine image versions for the specified location, publisher, offer, and SKU. */
  list: (
    location: string,
    publisherName: string,
    offer: string,
    skus: string,
    options?: VirtualMachineImagesListOptionalParams,
  ) => Promise<VirtualMachineImageResource[]>;
  /** Gets a list of virtual machine image SKUs for the specified location, publisher, and offer. */
  listSkus: (
    location: string,
    publisherName: string,
    offer: string,
    options?: VirtualMachineImagesListSkusOptionalParams,
  ) => Promise<VirtualMachineImageResource[]>;
  /** Gets a list of virtual machine image offers for the specified location and publisher. */
  listOffers: (
    location: string,
    publisherName: string,
    options?: VirtualMachineImagesListOffersOptionalParams,
  ) => Promise<VirtualMachineImageResource[]>;
  /** Gets a list of virtual machine image publishers for the specified Azure location. */
  listPublishers: (
    location: string,
    options?: VirtualMachineImagesListPublishersOptionalParams,
  ) => Promise<VirtualMachineImageResource[]>;
  /** Gets a list of all virtual machine image versions for the specified edge zone */
  listByEdgeZone: (
    location: string,
    edgeZone: string,
    options?: VirtualMachineImagesListByEdgeZoneOptionalParams,
  ) => Promise<VmImagesInEdgeZoneListResult>;
}

function _getVirtualMachineImages(context: ComputeContext) {
  return {
    get: (
      location: string,
      publisherName: string,
      offer: string,
      skus: string,
      version: string,
      options?: VirtualMachineImagesGetOptionalParams,
    ) => get(context, location, publisherName, offer, skus, version, options),
    listWithProperties: (
      location: string,
      publisherName: string,
      offer: string,
      skus: string,
      expand: string,
      options?: VirtualMachineImagesListWithPropertiesOptionalParams,
    ) => listWithProperties(context, location, publisherName, offer, skus, expand, options),
    list: (
      location: string,
      publisherName: string,
      offer: string,
      skus: string,
      options?: VirtualMachineImagesListOptionalParams,
    ) => list(context, location, publisherName, offer, skus, options),
    listSkus: (
      location: string,
      publisherName: string,
      offer: string,
      options?: VirtualMachineImagesListSkusOptionalParams,
    ) => listSkus(context, location, publisherName, offer, options),
    listOffers: (
      location: string,
      publisherName: string,
      options?: VirtualMachineImagesListOffersOptionalParams,
    ) => listOffers(context, location, publisherName, options),
    listPublishers: (
      location: string,
      options?: VirtualMachineImagesListPublishersOptionalParams,
    ) => listPublishers(context, location, options),
    listByEdgeZone: (
      location: string,
      edgeZone: string,
      options?: VirtualMachineImagesListByEdgeZoneOptionalParams,
    ) => listByEdgeZone(context, location, edgeZone, options),
  };
}

export function _getVirtualMachineImagesOperations(
  context: ComputeContext,
): VirtualMachineImagesOperations {
  return {
    ..._getVirtualMachineImages(context),
  };
}
