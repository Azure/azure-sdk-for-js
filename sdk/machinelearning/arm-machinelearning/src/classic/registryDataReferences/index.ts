// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { getBlobReferenceSAS } from "../../api/registryDataReferences/operations.js";
import type { RegistryDataReferencesGetBlobReferenceSASOptionalParams } from "../../api/registryDataReferences/options.js";
import type {
  GetBlobReferenceSASRequestDto,
  GetBlobReferenceSASResponseDto,
} from "../../models/models.js";

/** Interface representing a RegistryDataReferences operations. */
export interface RegistryDataReferencesOperations {
  /** Get blob reference SAS Uri. */
  getBlobReferenceSAS: (
    resourceGroupName: string,
    registryName: string,
    name: string,
    version: string,
    body: GetBlobReferenceSASRequestDto,
    options?: RegistryDataReferencesGetBlobReferenceSASOptionalParams,
  ) => Promise<GetBlobReferenceSASResponseDto>;
}

function _getRegistryDataReferences(context: AzureMachineLearningServicesManagementContext) {
  return {
    getBlobReferenceSAS: (
      resourceGroupName: string,
      registryName: string,
      name: string,
      version: string,
      body: GetBlobReferenceSASRequestDto,
      options?: RegistryDataReferencesGetBlobReferenceSASOptionalParams,
    ) =>
      getBlobReferenceSAS(context, resourceGroupName, registryName, name, version, body, options),
  };
}

export function _getRegistryDataReferencesOperations(
  context: AzureMachineLearningServicesManagementContext,
): RegistryDataReferencesOperations {
  return {
    ..._getRegistryDataReferences(context),
  };
}
