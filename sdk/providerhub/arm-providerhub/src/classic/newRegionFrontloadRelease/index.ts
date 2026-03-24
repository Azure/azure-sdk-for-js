// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext } from "../../api/providerHubContext.js";
import {
  generateManifest,
  stop,
  createOrUpdate,
  get,
} from "../../api/newRegionFrontloadRelease/operations.js";
import type {
  NewRegionFrontloadReleaseGenerateManifestOptionalParams,
  NewRegionFrontloadReleaseStopOptionalParams,
  NewRegionFrontloadReleaseCreateOrUpdateOptionalParams,
  NewRegionFrontloadReleaseGetOptionalParams,
} from "../../api/newRegionFrontloadRelease/options.js";
import type {
  ResourceProviderManifest,
  DefaultRollout,
  FrontloadPayload,
} from "../../models/models.js";

/** Interface representing a NewRegionFrontloadRelease operations. */
export interface NewRegionFrontloadReleaseOperations {
  /** Generates the new region frontload manifest. */
  generateManifest: (
    providerNamespace: string,
    properties: FrontloadPayload,
    options?: NewRegionFrontloadReleaseGenerateManifestOptionalParams,
  ) => Promise<ResourceProviderManifest>;
  /** Stops a new region frontload release. */
  stop: (
    providerNamespace: string,
    releaseName: string,
    options?: NewRegionFrontloadReleaseStopOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a new region frontload release. */
  createOrUpdate: (
    providerNamespace: string,
    releaseName: string,
    properties: FrontloadPayload,
    options?: NewRegionFrontloadReleaseCreateOrUpdateOptionalParams,
  ) => Promise<DefaultRollout>;
  /** Gets a new region frontload release. */
  get: (
    providerNamespace: string,
    releaseName: string,
    options?: NewRegionFrontloadReleaseGetOptionalParams,
  ) => Promise<DefaultRollout>;
}

function _getNewRegionFrontloadRelease(context: ProviderHubContext) {
  return {
    generateManifest: (
      providerNamespace: string,
      properties: FrontloadPayload,
      options?: NewRegionFrontloadReleaseGenerateManifestOptionalParams,
    ) => generateManifest(context, providerNamespace, properties, options),
    stop: (
      providerNamespace: string,
      releaseName: string,
      options?: NewRegionFrontloadReleaseStopOptionalParams,
    ) => stop(context, providerNamespace, releaseName, options),
    createOrUpdate: (
      providerNamespace: string,
      releaseName: string,
      properties: FrontloadPayload,
      options?: NewRegionFrontloadReleaseCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, providerNamespace, releaseName, properties, options),
    get: (
      providerNamespace: string,
      releaseName: string,
      options?: NewRegionFrontloadReleaseGetOptionalParams,
    ) => get(context, providerNamespace, releaseName, options),
  };
}

export function _getNewRegionFrontloadReleaseOperations(
  context: ProviderHubContext,
): NewRegionFrontloadReleaseOperations {
  return {
    ..._getNewRegionFrontloadRelease(context),
  };
}
