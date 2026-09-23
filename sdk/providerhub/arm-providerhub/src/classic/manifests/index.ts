// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext } from "../../api/providerHubContext.js";
import { createOrUpdate, get } from "../../api/manifests/operations.js";
import type {
  ManifestsCreateOrUpdateOptionalParams,
  ManifestsGetOptionalParams,
} from "../../api/manifests/options.js";
import type { ManifestInfo } from "../../models/models.js";

/** Interface representing a Manifests operations. */
export interface ManifestsOperations {
  /** Creates or Updates a manifest in manifest repository. */
  createOrUpdate: (
    providerNamespace: string,
    environment: string,
    properties: ManifestInfo,
    options?: ManifestsCreateOrUpdateOptionalParams,
  ) => Promise<ManifestInfo>;
  /** Gets the manifest from the manifest repository. */
  get: (
    providerNamespace: string,
    environment: string,
    options?: ManifestsGetOptionalParams,
  ) => Promise<ManifestInfo>;
}

function _getManifests(context: ProviderHubContext) {
  return {
    createOrUpdate: (
      providerNamespace: string,
      environment: string,
      properties: ManifestInfo,
      options?: ManifestsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, providerNamespace, environment, properties, options),
    get: (providerNamespace: string, environment: string, options?: ManifestsGetOptionalParams) =>
      get(context, providerNamespace, environment, options),
  };
}

export function _getManifestsOperations(context: ProviderHubContext): ManifestsOperations {
  return {
    ..._getManifests(context),
  };
}
