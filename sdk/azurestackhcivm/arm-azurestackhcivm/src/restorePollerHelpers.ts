// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "./azureStackHcivmManagementClient.js";
import { _$deleteDeserialize, _createDeserialize } from "./api/guestAgents/operations.js";
import {
  _saveDeserialize,
  _pauseDeserialize,
  _restartDeserialize,
  _stopDeserialize,
  _startDeserialize,
  _$deleteDeserialize as _$deleteDeserializeVirtualMachineInstances,
  _updateDeserialize,
  _createOrUpdateDeserialize,
} from "./api/virtualMachineInstances/operations.js";
import {
  _uploadDeserialize,
  _$deleteDeserialize as _$deleteDeserializeVirtualHardDisks,
  _updateDeserialize as _updateDeserializeVirtualHardDisks,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualHardDisks,
} from "./api/virtualHardDisks/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeStorageContainers,
  _updateDeserialize as _updateDeserializeStorageContainers,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeStorageContainers,
} from "./api/storageContainers/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeSecurityRules,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeSecurityRules,
} from "./api/securityRules/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeNetworkSecurityGroups,
  _updateTagsDeserialize,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeNetworkSecurityGroups,
} from "./api/networkSecurityGroups/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeNetworkInterfaces,
  _updateDeserialize as _updateDeserializeNetworkInterfaces,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeNetworkInterfaces,
} from "./api/networkInterfaces/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeMarketplaceGalleryImages,
  _updateDeserialize as _updateDeserializeMarketplaceGalleryImages,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeMarketplaceGalleryImages,
} from "./api/marketplaceGalleryImages/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeLogicalNetworks,
  _updateDeserialize as _updateDeserializeLogicalNetworks,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeLogicalNetworks,
} from "./api/logicalNetworks/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeGalleryImages,
  _updateDeserialize as _updateDeserializeGalleryImages,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeGalleryImages,
} from "./api/galleryImages/operations.js";
import { getLongRunningPoller } from "./static-helpers/pollingHelpers.js";
import { OperationOptions, PathUncheckedResponse } from "@azure-rest/core-client";
import { AbortSignalLike } from "@azure/abort-controller";
import {
  PollerLike,
  OperationState,
  deserializeState,
  ResourceLocationConfig,
} from "@azure/core-lro";

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
  client: AzureStackHCIVMManagementClient,
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
  deserializer: Function;
  expectedStatuses: string[];
}

const deserializeMap: Record<string, DeserializationHelper> = {
  "DELETE /{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/guestAgents/default":
    {
      deserializer: _$deleteDeserialize,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/guestAgents/default":
    {
      deserializer: _createDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/save": {
    deserializer: _saveDeserialize,
    expectedStatuses: ["202", "200"],
  },
  "POST /{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/pause": {
    deserializer: _pauseDeserialize,
    expectedStatuses: ["202", "200"],
  },
  "POST /{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/restart": {
    deserializer: _restartDeserialize,
    expectedStatuses: ["202", "200"],
  },
  "POST /{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/stop": {
    deserializer: _stopDeserialize,
    expectedStatuses: ["202", "200"],
  },
  "POST /{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/start": {
    deserializer: _startDeserialize,
    expectedStatuses: ["202", "200"],
  },
  "DELETE /{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default": {
    deserializer: _$deleteDeserializeVirtualMachineInstances,
    expectedStatuses: ["202", "204", "200"],
  },
  "PATCH /{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default": {
    deserializer: _updateDeserialize,
    expectedStatuses: ["200", "202"],
  },
  "PUT /{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default": {
    deserializer: _createOrUpdateDeserialize,
    expectedStatuses: ["200", "201", "202"],
  },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/virtualHardDisks/{virtualHardDiskName}/upload":
    { deserializer: _uploadDeserialize, expectedStatuses: ["202", "200"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/virtualHardDisks/{virtualHardDiskName}":
    {
      deserializer: _$deleteDeserializeVirtualHardDisks,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/virtualHardDisks/{virtualHardDiskName}":
    {
      deserializer: _updateDeserializeVirtualHardDisks,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/virtualHardDisks/{virtualHardDiskName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualHardDisks,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/storageContainers/{storageContainerName}":
    {
      deserializer: _$deleteDeserializeStorageContainers,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/storageContainers/{storageContainerName}":
    {
      deserializer: _updateDeserializeStorageContainers,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/storageContainers/{storageContainerName}":
    {
      deserializer: _createOrUpdateDeserializeStorageContainers,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkSecurityGroups/{networkSecurityGroupName}/securityRules/{securityRuleName}":
    {
      deserializer: _$deleteDeserializeSecurityRules,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkSecurityGroups/{networkSecurityGroupName}/securityRules/{securityRuleName}":
    {
      deserializer: _createOrUpdateDeserializeSecurityRules,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkSecurityGroups/{networkSecurityGroupName}":
    {
      deserializer: _$deleteDeserializeNetworkSecurityGroups,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkSecurityGroups/{networkSecurityGroupName}":
    { deserializer: _updateTagsDeserialize, expectedStatuses: ["200", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkSecurityGroups/{networkSecurityGroupName}":
    {
      deserializer: _createOrUpdateDeserializeNetworkSecurityGroups,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkInterfaces/{networkInterfaceName}":
    {
      deserializer: _$deleteDeserializeNetworkInterfaces,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkInterfaces/{networkInterfaceName}":
    {
      deserializer: _updateDeserializeNetworkInterfaces,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkInterfaces/{networkInterfaceName}":
    {
      deserializer: _createOrUpdateDeserializeNetworkInterfaces,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/marketplaceGalleryImages/{marketplaceGalleryImageName}":
    {
      deserializer: _$deleteDeserializeMarketplaceGalleryImages,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/marketplaceGalleryImages/{marketplaceGalleryImageName}":
    {
      deserializer: _updateDeserializeMarketplaceGalleryImages,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/marketplaceGalleryImages/{marketplaceGalleryImageName}":
    {
      deserializer: _createOrUpdateDeserializeMarketplaceGalleryImages,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/logicalNetworks/{logicalNetworkName}":
    {
      deserializer: _$deleteDeserializeLogicalNetworks,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/logicalNetworks/{logicalNetworkName}":
    {
      deserializer: _updateDeserializeLogicalNetworks,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/logicalNetworks/{logicalNetworkName}":
    {
      deserializer: _createOrUpdateDeserializeLogicalNetworks,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/galleryImages/{galleryImageName}":
    {
      deserializer: _$deleteDeserializeGalleryImages,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/galleryImages/{galleryImageName}":
    {
      deserializer: _updateDeserializeGalleryImages,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/galleryImages/{galleryImageName}":
    {
      deserializer: _createOrUpdateDeserializeGalleryImages,
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
