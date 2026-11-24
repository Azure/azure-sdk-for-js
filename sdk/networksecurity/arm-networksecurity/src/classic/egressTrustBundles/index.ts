// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkSecurityManagementContext } from "../../api/networkSecurityManagementContext.js";
import { listByParent, get } from "../../api/egressTrustBundles/operations.js";
import type {
  EgressTrustBundlesListByParentOptionalParams,
  EgressTrustBundlesGetOptionalParams,
} from "../../api/egressTrustBundles/options.js";
import type { EgressTrustBundle } from "../../models/microsoft/networkSecurity/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EgressTrustBundles operations. */
export interface EgressTrustBundlesOperations {
  /**
   * Lists the egress TLS-inspection trust bundles for the fabric. The bundle is a singleton,
   * so this returns the single `default` bundle. It exists because Azure Policy cannot
   * populate compliance data for a resource type that has no collection GET.
   */
  listByParent: (
    resourceGroupName: string,
    agentFabricName: string,
    options?: EgressTrustBundlesListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<EgressTrustBundle>;
  /**
   * Gets the egress TLS-inspection trust bundle for the fabric.
   *
   * The bundle changes rarely, so callers are expected to cache it for the advertised
   * validity period rather than reading it per workload. To decide whether a cached copy is
   * still current, compare `bundleVersion`: it is derived from the anchor set, so it changes
   * exactly when the anchors change and is stable otherwise. Every read returns the full
   * bundle together with refreshed cache metadata.
   */
  get: (
    resourceGroupName: string,
    agentFabricName: string,
    options?: EgressTrustBundlesGetOptionalParams,
  ) => Promise<EgressTrustBundle>;
}

function _getEgressTrustBundles(context: NetworkSecurityManagementContext) {
  return {
    listByParent: (
      resourceGroupName: string,
      agentFabricName: string,
      options?: EgressTrustBundlesListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, agentFabricName, options),
    get: (
      resourceGroupName: string,
      agentFabricName: string,
      options?: EgressTrustBundlesGetOptionalParams,
    ) => get(context, resourceGroupName, agentFabricName, options),
  };
}

export function _getEgressTrustBundlesOperations(
  context: NetworkSecurityManagementContext,
): EgressTrustBundlesOperations {
  return {
    ..._getEgressTrustBundles(context),
  };
}
