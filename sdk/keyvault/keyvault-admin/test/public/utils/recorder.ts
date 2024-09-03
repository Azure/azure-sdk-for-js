// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isPlaybackMode } from "@azure-tools/test-recorder";

/**
 * Properties that are used to configure our polling operations
 * in tests. During playback mode we don't want any delays. During
 * live mode we can safely increase the default polling interval (currently 2s)
 * to 5s in order to reduce calls to the service.
 */
export const testPollerProperties = {
  intervalInMs: isPlaybackMode() ? 0 : 5 * 1000,
};
