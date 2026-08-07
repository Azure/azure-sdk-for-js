// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Returns a marker used to verify that management-plane SDK customizations survive regeneration.
 *
 * @returns The customization verification marker.
 */
export function getArmComputeCustomizationMarker(): string {
  return "arm-compute customization preserved";
}
