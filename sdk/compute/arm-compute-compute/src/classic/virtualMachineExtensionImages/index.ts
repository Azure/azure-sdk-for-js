// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  listVersions,
  listTypes,
  get,
} from "../../api/virtualMachineExtensionImages/operations.js";
import type {
  VirtualMachineExtensionImagesListVersionsOptionalParams,
  VirtualMachineExtensionImagesListTypesOptionalParams,
  VirtualMachineExtensionImagesGetOptionalParams,
} from "../../api/virtualMachineExtensionImages/options.js";
import type { VirtualMachineExtensionImage } from "../../models/models.js";

/** Interface representing a VirtualMachineExtensionImages operations. */
export interface VirtualMachineExtensionImagesOperations {
  /** Gets a list of virtual machine extension image versions. */
  listVersions: (
    location: string,
    publisherName: string,
    typeParam: string,
    options?: VirtualMachineExtensionImagesListVersionsOptionalParams,
  ) => Promise<VirtualMachineExtensionImage[]>;
  /** Gets a list of virtual machine extension image types. */
  listTypes: (
    location: string,
    publisherName: string,
    options?: VirtualMachineExtensionImagesListTypesOptionalParams,
  ) => Promise<VirtualMachineExtensionImage[]>;
  /** Gets a virtual machine extension image. */
  get: (
    location: string,
    publisherName: string,
    typeParam: string,
    version: string,
    options?: VirtualMachineExtensionImagesGetOptionalParams,
  ) => Promise<VirtualMachineExtensionImage>;
}

function _getVirtualMachineExtensionImages(context: ComputeContext) {
  return {
    listVersions: (
      location: string,
      publisherName: string,
      typeParam: string,
      options?: VirtualMachineExtensionImagesListVersionsOptionalParams,
    ) => listVersions(context, location, publisherName, typeParam, options),
    listTypes: (
      location: string,
      publisherName: string,
      options?: VirtualMachineExtensionImagesListTypesOptionalParams,
    ) => listTypes(context, location, publisherName, options),
    get: (
      location: string,
      publisherName: string,
      typeParam: string,
      version: string,
      options?: VirtualMachineExtensionImagesGetOptionalParams,
    ) => get(context, location, publisherName, typeParam, version, options),
  };
}

export function _getVirtualMachineExtensionImagesOperations(
  context: ComputeContext,
): VirtualMachineExtensionImagesOperations {
  return {
    ..._getVirtualMachineExtensionImages(context),
  };
}
