// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureVMwareSolutionAPI } from "./azureVMwareSolutionAPI.js";
import {
  _deleteVMGroupDeserialize,
  _updateVMGroupDeserialize,
  _createVMGroupDeserialize,
  _deleteSegmentDeserialize,
  _updateSegmentsDeserialize,
  _createSegmentsDeserialize,
  _deletePublicIPDeserialize,
  _createPublicIPDeserialize,
  _deletePortMirroringDeserialize,
  _updatePortMirroringDeserialize,
  _createPortMirroringDeserialize,
  _deleteDnsZoneDeserialize,
  _updateDnsZoneDeserialize,
  _createDnsZoneDeserialize,
  _deleteDnsServiceDeserialize,
  _updateDnsServiceDeserialize,
  _createDnsServiceDeserialize,
  _deleteDhcpDeserialize,
  _updateDhcpDeserialize,
  _createDhcpDeserialize,
} from "./api/workloadNetworks/operations.js";
import { _restrictMovementDeserialize } from "./api/virtualMachines/operations.js";
import { _checkAvailabilityDeserialize } from "./api/serviceComponents/operations.js";
import {
  _$deleteDeserialize,
  _createOrUpdateDeserialize,
} from "./api/scriptExecutions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializePureStoragePolicies,
  _createOrUpdateDeserialize as _createOrUpdateDeserializePureStoragePolicies,
} from "./api/pureStoragePolicies/operations.js";
import {
  _rotateNsxtPasswordDeserialize,
  _rotateVcenterPasswordDeserialize,
  _$deleteDeserialize as _$deleteDeserializePrivateClouds,
  _updateDeserialize,
  _createOrUpdateDeserialize as _createOrUpdateDeserializePrivateClouds,
} from "./api/privateClouds/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializePlacementPolicies,
  _updateDeserialize as _updateDeserializePlacementPolicies,
  _createOrUpdateDeserialize as _createOrUpdateDeserializePlacementPolicies,
} from "./api/placementPolicies/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeLicenses,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeLicenses,
} from "./api/licenses/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeIscsiPaths,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeIscsiPaths,
} from "./api/iscsiPaths/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeGlobalReachConnections,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeGlobalReachConnections,
} from "./api/globalReachConnections/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeDatastores,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDatastores,
} from "./api/datastores/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeClusters,
  _updateDeserialize as _updateDeserializeClusters,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeClusters,
} from "./api/clusters/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeCloudLinks,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeCloudLinks,
} from "./api/cloudLinks/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeAuthorizations,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeAuthorizations,
} from "./api/authorizations/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeAddons,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeAddons,
} from "./api/addons/operations.js";
import { getLongRunningPoller } from "./static-helpers/pollingHelpers.js";
import type { OperationOptions, PathUncheckedResponse } from "@azure-rest/core-client";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { PollerLike, OperationState, ResourceLocationConfig } from "@azure/core-lro";
import { deserializeState } from "@azure/core-lro";

export interface RestorePollerOptions<
  TResult,
  TResponse extends PathUncheckedResponse = PathUncheckedResponse,
> extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /**
   * The signal which can be used to abort requests.
   */
  abortSignal?: AbortSignalLike;
  /** Deserialization function for raw response body */
  processResponseBody?: (result: TResponse) => Promise<TResult>;
}

/**
 * Creates a poller from the serialized state of another poller. This can be
 * useful when you want to create pollers on a different host or a poller
 * needs to be constructed after the original one is not in scope.
 */
export function restorePoller<TResponse extends PathUncheckedResponse, TResult>(
  client: AzureVMwareSolutionAPI,
  serializedState: string,
  sourceOperation: (...args: any[]) => PollerLike<OperationState<TResult>, TResult>,
  options?: RestorePollerOptions<TResult>,
): PollerLike<OperationState<TResult>, TResult> {
  const pollerConfig = deserializeState(serializedState).config;
  const { initialRequestUrl, requestMethod, metadata } = pollerConfig;
  if (!initialRequestUrl || !requestMethod) {
    throw new Error(
      `Invalid serialized state: ${serializedState} for sourceOperation ${sourceOperation?.name}`,
    );
  }
  const resourceLocationConfig = metadata?.["resourceLocationConfig"] as
    | ResourceLocationConfig
    | undefined;
  const { deserializer, expectedStatuses = [] } =
    getDeserializationHelper(initialRequestUrl, requestMethod) ?? {};
  const deserializeHelper = options?.processResponseBody ?? deserializer;
  if (!deserializeHelper) {
    throw new Error(
      `Please ensure the operation is in this client! We can't find its deserializeHelper for ${sourceOperation?.name}.`,
    );
  }
  return getLongRunningPoller(
    (client as any)["_client"] ?? client,
    deserializeHelper as (result: TResponse) => Promise<TResult>,
    expectedStatuses,
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      resourceLocationConfig,
      restoreFrom: serializedState,
      initialRequestUrl,
    },
  );
}

interface DeserializationHelper {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  deserializer: Function;
  expectedStatuses: string[];
}

const deserializeMap: Record<string, DeserializationHelper> = {
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/vmGroups/{vmGroupId}":
    {
      deserializer: _deleteVMGroupDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/vmGroups/{vmGroupId}":
    {
      deserializer: _updateVMGroupDeserialize,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/vmGroups/{vmGroupId}":
    {
      deserializer: _createVMGroupDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/segments/{segmentId}":
    {
      deserializer: _deleteSegmentDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/segments/{segmentId}":
    {
      deserializer: _updateSegmentsDeserialize,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/segments/{segmentId}":
    {
      deserializer: _createSegmentsDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/publicIPs/{publicIPId}":
    {
      deserializer: _deletePublicIPDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/publicIPs/{publicIPId}":
    {
      deserializer: _createPublicIPDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/portMirroringProfiles/{portMirroringId}":
    {
      deserializer: _deletePortMirroringDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/portMirroringProfiles/{portMirroringId}":
    {
      deserializer: _updatePortMirroringDeserialize,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/portMirroringProfiles/{portMirroringId}":
    {
      deserializer: _createPortMirroringDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dnsZones/{dnsZoneId}":
    {
      deserializer: _deleteDnsZoneDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dnsZones/{dnsZoneId}":
    {
      deserializer: _updateDnsZoneDeserialize,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dnsZones/{dnsZoneId}":
    {
      deserializer: _createDnsZoneDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dnsServices/{dnsServiceId}":
    {
      deserializer: _deleteDnsServiceDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dnsServices/{dnsServiceId}":
    {
      deserializer: _updateDnsServiceDeserialize,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dnsServices/{dnsServiceId}":
    {
      deserializer: _createDnsServiceDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dhcpConfigurations/{dhcpId}":
    {
      deserializer: _deleteDhcpDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dhcpConfigurations/{dhcpId}":
    { deserializer: _updateDhcpDeserialize, expectedStatuses: ["200", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dhcpConfigurations/{dhcpId}":
    {
      deserializer: _createDhcpDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/virtualMachines/{virtualMachineId}/restrictMovement":
    {
      deserializer: _restrictMovementDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.AVS/locations/{location}/serviceComponents/{serviceComponentName}/checkAvailability":
    {
      deserializer: _checkAvailabilityDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/scriptExecutions/{scriptExecutionName}":
    {
      deserializer: _$deleteDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/scriptExecutions/{scriptExecutionName}":
    {
      deserializer: _createOrUpdateDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/pureStoragePolicies/{storagePolicyName}":
    {
      deserializer: _$deleteDeserializePureStoragePolicies,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/pureStoragePolicies/{storagePolicyName}":
    {
      deserializer: _createOrUpdateDeserializePureStoragePolicies,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/rotateNsxtPassword":
    {
      deserializer: _rotateNsxtPasswordDeserialize,
      expectedStatuses: ["202", "204", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/rotateVcenterPassword":
    {
      deserializer: _rotateVcenterPasswordDeserialize,
      expectedStatuses: ["202", "204", "200"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}":
    {
      deserializer: _$deleteDeserializePrivateClouds,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}":
    {
      deserializer: _updateDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}":
    {
      deserializer: _createOrUpdateDeserializePrivateClouds,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/placementPolicies/{placementPolicyName}":
    {
      deserializer: _$deleteDeserializePlacementPolicies,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/placementPolicies/{placementPolicyName}":
    {
      deserializer: _updateDeserializePlacementPolicies,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/placementPolicies/{placementPolicyName}":
    {
      deserializer: _createOrUpdateDeserializePlacementPolicies,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/licenses/{licenseName}":
    {
      deserializer: _$deleteDeserializeLicenses,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/licenses/{licenseName}":
    {
      deserializer: _createOrUpdateDeserializeLicenses,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/iscsiPaths/default":
    {
      deserializer: _$deleteDeserializeIscsiPaths,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/iscsiPaths/default":
    {
      deserializer: _createOrUpdateDeserializeIscsiPaths,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/globalReachConnections/{globalReachConnectionName}":
    {
      deserializer: _$deleteDeserializeGlobalReachConnections,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/globalReachConnections/{globalReachConnectionName}":
    {
      deserializer: _createOrUpdateDeserializeGlobalReachConnections,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/datastores/{datastoreName}":
    {
      deserializer: _$deleteDeserializeDatastores,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/datastores/{datastoreName}":
    {
      deserializer: _createOrUpdateDeserializeDatastores,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}":
    {
      deserializer: _$deleteDeserializeClusters,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}":
    {
      deserializer: _updateDeserializeClusters,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}":
    {
      deserializer: _createOrUpdateDeserializeClusters,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/cloudLinks/{cloudLinkName}":
    {
      deserializer: _$deleteDeserializeCloudLinks,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/cloudLinks/{cloudLinkName}":
    {
      deserializer: _createOrUpdateDeserializeCloudLinks,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/authorizations/{authorizationName}":
    {
      deserializer: _$deleteDeserializeAuthorizations,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/authorizations/{authorizationName}":
    {
      deserializer: _createOrUpdateDeserializeAuthorizations,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/addons/{addonName}":
    {
      deserializer: _$deleteDeserializeAddons,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/addons/{addonName}":
    {
      deserializer: _createOrUpdateDeserializeAddons,
      expectedStatuses: ["200", "201", "202"],
    },
};

function getDeserializationHelper(
  urlStr: string,
  method: string,
): DeserializationHelper | undefined {
  const path = new URL(urlStr).pathname;
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: DeserializationHelper | undefined;

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(deserializeMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (let i = candidateParts.length - 1, j = pathParts.length - 1; i >= 1 && j >= 1; i--, j--) {
      if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.indexOf("}") !== -1) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(`${candidateParts[i]?.slice(start, end)}`).test(
          pathParts[j] || "",
        );

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
