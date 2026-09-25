// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { env, isPlaybackMode } from "@azure-tools/test-recorder";

export function getTestEnvironment(): {
  location: string;
  c2cLocation: string;
  privateLinkServiceResourceGroup: string;
  privateLinkServiceName: string;
} {
  // Live infrastructure overrides must not change requests matched against existing recordings.
  const settings = isPlaybackMode() ? {} : env;
  return {
    location: settings.STORAGE_MOVER_TEST_LOCATION ?? "eastus",
    c2cLocation: settings.STORAGE_MOVER_TEST_LOCATION ?? "westcentralus",
    privateLinkServiceResourceGroup:
      settings.STORAGE_MOVER_PRIVATE_LINK_SERVICE_RESOURCE_GROUP ?? "E2E-Management-RGsyn",
    privateLinkServiceName: settings.STORAGE_MOVER_PRIVATE_LINK_SERVICE_NAME ?? "test-pls-wcs",
  };
}
