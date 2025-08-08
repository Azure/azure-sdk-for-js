// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { listByVirtualMachineInstance, get } from "../../api/hybridIdentityMetadata/operations.js";
import {
  HybridIdentityMetadataListByVirtualMachineInstanceOptionalParams,
  HybridIdentityMetadataGetOptionalParams,
} from "../../api/hybridIdentityMetadata/options.js";
import { HybridIdentityMetadata } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a HybridIdentityMetadata operations. */
export interface HybridIdentityMetadataOperations {
  /** Returns the list of HybridIdentityMetadata of the given vm. */
  listByVirtualMachineInstance: (
    resourceUri: string,
    options?: HybridIdentityMetadataListByVirtualMachineInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<HybridIdentityMetadata>;
  /** Implements HybridIdentityMetadata GET method. */
  get: (
    resourceUri: string,
    options?: HybridIdentityMetadataGetOptionalParams,
  ) => Promise<HybridIdentityMetadata>;
}

function _getHybridIdentityMetadata(context: AzureStackHCIContext) {
  return {
    listByVirtualMachineInstance: (
      resourceUri: string,
      options?: HybridIdentityMetadataListByVirtualMachineInstanceOptionalParams,
    ) => listByVirtualMachineInstance(context, resourceUri, options),
    get: (resourceUri: string, options?: HybridIdentityMetadataGetOptionalParams) =>
      get(context, resourceUri, options),
  };
}

export function _getHybridIdentityMetadataOperations(
  context: AzureStackHCIContext,
): HybridIdentityMetadataOperations {
  return {
    ..._getHybridIdentityMetadata(context),
  };
}
