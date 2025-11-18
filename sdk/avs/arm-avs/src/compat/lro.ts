// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { lroCompatMap } from "./lro-metadata.js";
import { wrapOperationGroupFactory, applyClientLroCompat } from "@azure/core-lro/compat";

// Import all operation group factories from their respective classic directories
import { _getPrivateCloudsOperations as originalPrivateClouds } from "../classic/privateClouds/index.js";
import { _getClustersOperations as originalClusters } from "../classic/clusters/index.js";
import { _getAddonsOperations as originalAddons } from "../classic/addons/index.js";
import { _getCloudLinksOperations as originalCloudLinks } from "../classic/cloudLinks/index.js";
import { _getAuthorizationsOperations as originalAuthorizations } from "../classic/authorizations/index.js";
import { _getDatastoresOperations as originalDatastores } from "../classic/datastores/index.js";
import { _getGlobalReachConnectionsOperations as originalGlobalReachConnections } from "../classic/globalReachConnections/index.js";
import { _getIscsiPathsOperations as originalIscsiPaths } from "../classic/iscsiPaths/index.js";
import { _getPlacementPoliciesOperations as originalPlacementPolicies } from "../classic/placementPolicies/index.js";
import { _getPureStoragePoliciesOperations as originalPureStoragePolicies } from "../classic/pureStoragePolicies/index.js";
import { _getScriptExecutionsOperations as originalScriptExecutions } from "../classic/scriptExecutions/index.js";
import { _getVirtualMachinesOperations as originalVirtualMachines } from "../classic/virtualMachines/index.js";
import { _getWorkloadNetworksOperations as originalWorkloadNetworks } from "../classic/workloadNetworks/index.js";

// Wrap all operation group factories with LRO compatibility
export const _getPrivateCloudsOperations = wrapOperationGroupFactory(
  originalPrivateClouds,
  "privateClouds",
  lroCompatMap,
);

export const _getClustersOperations = wrapOperationGroupFactory(
  originalClusters,
  "clusters",
  lroCompatMap,
);

export const _getAddonsOperations = wrapOperationGroupFactory(
  originalAddons,
  "addons",
  lroCompatMap,
);

export const _getCloudLinksOperations = wrapOperationGroupFactory(
  originalCloudLinks,
  "cloudLinks",
  lroCompatMap,
);

export const _getAuthorizationsOperations = wrapOperationGroupFactory(
  originalAuthorizations,
  "authorizations",
  lroCompatMap,
);

export const _getDatastoresOperations = wrapOperationGroupFactory(
  originalDatastores,
  "datastores",
  lroCompatMap,
);

export const _getGlobalReachConnectionsOperations = wrapOperationGroupFactory(
  originalGlobalReachConnections,
  "globalReachConnections",
  lroCompatMap,
);

export const _getIscsiPathsOperations = wrapOperationGroupFactory(
  originalIscsiPaths,
  "iscsiPaths",
  lroCompatMap,
);

export const _getPlacementPoliciesOperations = wrapOperationGroupFactory(
  originalPlacementPolicies,
  "placementPolicies",
  lroCompatMap,
);

export const _getPureStoragePoliciesOperations = wrapOperationGroupFactory(
  originalPureStoragePolicies,
  "pureStoragePolicies",
  lroCompatMap,
);

export const _getScriptExecutionsOperations = wrapOperationGroupFactory(
  originalScriptExecutions,
  "scriptExecutions",
  lroCompatMap,
);

export const _getVirtualMachinesOperations = wrapOperationGroupFactory(
  originalVirtualMachines,
  "virtualMachines",
  lroCompatMap,
);

export const _getWorkloadNetworksOperations = wrapOperationGroupFactory(
  originalWorkloadNetworks,
  "workloadNetworks",
  lroCompatMap,
);

/**
 * Apply LRO compatibility to a client instance.
 * This function adds beginXxx and beginXxxAndWait methods for all LRO operations
 * that are mapped in the lroCompatMap.
 *
 * @param client - The AzureVMwareSolutionAPI client instance
 */
export function applyLroCompatToClient(client: any) {
  applyClientLroCompat(client, lroCompatMap);
}
