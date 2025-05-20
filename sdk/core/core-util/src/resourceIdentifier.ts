// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Constants for ARM resource ID segments
 * @internal
 */
const PROVIDERS_KEY = "providers";
const SUBSCRIPTIONS_KEY = "subscriptions";
const RESOURCE_GROUPS_KEY = "resourceGroups";

/**
 * Interface representing a parsed Azure Resource Manager (ARM) resource ID.
 */
export interface ResourceIdentifier {
  /**
   * The full original resource ID string.
   */
  readonly id: string;

  /**
   * The subscription ID found in the resource ID, if any.
   */
  readonly subscriptionId?: string;

  /**
   * The resource group name found in the resource ID, if any.
   */
  readonly resourceGroupName?: string;

  /**
   * The provider namespace (if explicitly specified in the resource ID).
   * Example: "Microsoft.Compute"
   */
  readonly provider?: string;

  /**
   * The resource type name found in the resource ID, if any.
   * Example: "virtualMachines"
   */
  readonly resourceType?: string;

  /**
   * The resource name found in the resource ID.
   */
  readonly name?: string;

  /**
   * Parent components of the resource ID.
   * Contains all path segments between the resource group (or subscription if no resource group)
   * and the resource name.
   */
  readonly parentResources: string[];
}

/**
 * Parse an Azure Resource Manager (ARM) resource ID.
 * @param resourceId - The ARM resource ID to parse
 * @returns A ResourceIdentifier object containing the parsed components
 * @throws If the resourceId is invalid or empty
 */
export function parseResourceId(resourceId: string): ResourceIdentifier {
  if (!resourceId) {
    throw new Error("Invalid resource ID: resourceId cannot be empty");
  }

  if (!resourceId.startsWith("/")) {
    throw new Error(`Invalid resource ID: resource ID '${resourceId}' must start with '/'`);
  }

  // Split the resource ID by '/' and filter out empty segments
  const segments = resourceId.split("/").filter(Boolean);

  if (segments.length < 2) {
    throw new Error(`Invalid resource ID: ${resourceId}`);
  }

  // Initialize with defaults
  let subscriptionId: string | undefined;
  let resourceGroupName: string | undefined;
  let provider: string | undefined;
  let resourceType: string | undefined;
  let name: string | undefined;
  const parentResources: string[] = [];

  // Parse the segments
  let i = 0;
  const remainingSegments: string[] = [];
  
  // Extract the known segments first
  while (i < segments.length) {
    const segment = segments[i];
    const nextSegment = i + 1 < segments.length ? segments[i + 1] : undefined;

    if (segment.toLowerCase() === SUBSCRIPTIONS_KEY.toLowerCase() && nextSegment) {
      subscriptionId = nextSegment;
      i += 2; // Skip the key and value
    } else if (segment.toLowerCase() === RESOURCE_GROUPS_KEY.toLowerCase() && nextSegment) {
      resourceGroupName = nextSegment;
      i += 2; // Skip the key and value
    } else if (segment.toLowerCase() === PROVIDERS_KEY.toLowerCase() && nextSegment) {
      provider = nextSegment;
      i += 2; // Skip the providers key and provider name

      // After providers/providerName, collect remaining segments
      while (i < segments.length) {
        remainingSegments.push(segments[i]);
        i++;
      }
    } else {
      // Add to remaining segments for further processing
      remainingSegments.push(segment);
      i++;
    }
  }

  // Process remaining segments
  if (provider) {
    // Handle provider-based path
    for (i = 0; i < remainingSegments.length - 2; i += 2) {
      parentResources.push(remainingSegments[i]);
      parentResources.push(remainingSegments[i + 1]);
    }
    
    if (remainingSegments.length >= 2) {
      const lastPairStartIndex = remainingSegments.length - 2;
      resourceType = remainingSegments[lastPairStartIndex];
      name = remainingSegments[lastPairStartIndex + 1];
    }
  } else {
    // Handle non-provider path
    if (remainingSegments.length >= 2) {
      // For all but the last pair, add to parentResources
      for (i = 0; i < remainingSegments.length - 2; i += 2) {
        parentResources.push(remainingSegments[i]);
        parentResources.push(remainingSegments[i + 1]);
      }
      
      // Last pair is resource type/name
      resourceType = remainingSegments[remainingSegments.length - 2];
      name = remainingSegments[remainingSegments.length - 1];
    }
  }

  return {
    id: resourceId,
    subscriptionId,
    resourceGroupName,
    provider,
    resourceType,
    name,
    parentResources,
  };
}