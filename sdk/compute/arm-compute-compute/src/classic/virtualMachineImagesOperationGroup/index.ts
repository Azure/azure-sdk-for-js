// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  get,
  listWithProperties,
  list,
  listSkus,
  listOffers,
  listPublishers,
  listByEdgeZone,
} from "../../api/virtualMachineImagesOperationGroup/operations.js";
import type {
  VirtualMachineImagesOperationGroupGetOptionalParams,
  VirtualMachineImagesOperationGroupListWithPropertiesOptionalParams,
  VirtualMachineImagesOperationGroupListOptionalParams,
  VirtualMachineImagesOperationGroupListSkusOptionalParams,
  VirtualMachineImagesOperationGroupListOffersOptionalParams,
  VirtualMachineImagesOperationGroupListPublishersOptionalParams,
  VirtualMachineImagesOperationGroupListByEdgeZoneOptionalParams,
} from "../../api/virtualMachineImagesOperationGroup/options.js";
import type {
  VirtualMachineImageResource,
  VirtualMachineImage,
  VmImagesInEdgeZoneListResult,
} from "../../models/models.js";

/** Interface representing a VirtualMachineImagesOperationGroup operations. */
export interface VirtualMachineImagesOperationGroupOperations {
  /** Gets a virtual machine image. */
  get: (
    location: string,
    publisherName: string,
    offer: string,
    skus: string,
    version: string,
    options?: VirtualMachineImagesOperationGroupGetOptionalParams,
  ) => Promise<VirtualMachineImage>;
  listWithProperties: (
    location: string,
    publisherName: string,
    offer: string,
    skus: string,
    expand: string,
    options?: VirtualMachineImagesOperationGroupListWithPropertiesOptionalParams,
  ) => Promise<VirtualMachineImage[]>;
  /** Gets a list of all virtual machine image versions for the specified location, publisher, offer, and SKU. */
  list: (
    location: string,
    publisherName: string,
    offer: string,
    skus: string,
    options?: VirtualMachineImagesOperationGroupListOptionalParams,
  ) => Promise<VirtualMachineImageResource[]>;
  /** Gets a list of virtual machine image SKUs for the specified location, publisher, and offer. */
  listSkus: (
    location: string,
    publisherName: string,
    offer: string,
    options?: VirtualMachineImagesOperationGroupListSkusOptionalParams,
  ) => Promise<VirtualMachineImageResource[]>;
  /** Gets a list of virtual machine image offers for the specified location and publisher. */
  listOffers: (
    location: string,
    publisherName: string,
    options?: VirtualMachineImagesOperationGroupListOffersOptionalParams,
  ) => Promise<VirtualMachineImageResource[]>;
  /** Gets a list of virtual machine image publishers for the specified Azure location. */
  listPublishers: (
    location: string,
    options?: VirtualMachineImagesOperationGroupListPublishersOptionalParams,
  ) => Promise<VirtualMachineImageResource[]>;
  /** Gets a list of all virtual machine image versions for the specified edge zone */
  listByEdgeZone: (
    location: string,
    edgeZone: string,
    options?: VirtualMachineImagesOperationGroupListByEdgeZoneOptionalParams,
  ) => Promise<VmImagesInEdgeZoneListResult>;
}

function _getVirtualMachineImagesOperationGroup(context: ComputeManagementContext) {
  return {
    get: (
      location: string,
      publisherName: string,
      offer: string,
      skus: string,
      version: string,
      options?: VirtualMachineImagesOperationGroupGetOptionalParams,
    ) => get(context, location, publisherName, offer, skus, version, options),
    listWithProperties: (
      location: string,
      publisherName: string,
      offer: string,
      skus: string,
      expand: string,
      options?: VirtualMachineImagesOperationGroupListWithPropertiesOptionalParams,
    ) => listWithProperties(context, location, publisherName, offer, skus, expand, options),
    list: (
      location: string,
      publisherName: string,
      offer: string,
      skus: string,
      options?: VirtualMachineImagesOperationGroupListOptionalParams,
    ) => list(context, location, publisherName, offer, skus, options),
    listSkus: (
      location: string,
      publisherName: string,
      offer: string,
      options?: VirtualMachineImagesOperationGroupListSkusOptionalParams,
    ) => listSkus(context, location, publisherName, offer, options),
    listOffers: (
      location: string,
      publisherName: string,
      options?: VirtualMachineImagesOperationGroupListOffersOptionalParams,
    ) => listOffers(context, location, publisherName, options),
    listPublishers: (
      location: string,
      options?: VirtualMachineImagesOperationGroupListPublishersOptionalParams,
    ) => listPublishers(context, location, options),
    listByEdgeZone: (
      location: string,
      edgeZone: string,
      options?: VirtualMachineImagesOperationGroupListByEdgeZoneOptionalParams,
    ) => listByEdgeZone(context, location, edgeZone, options),
  };
}

export function _getVirtualMachineImagesOperationGroupOperations(
  context: ComputeManagementContext,
): VirtualMachineImagesOperationGroupOperations {
  return {
    ..._getVirtualMachineImagesOperationGroup(context),
  };
}
