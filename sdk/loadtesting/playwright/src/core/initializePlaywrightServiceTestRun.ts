// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FullConfig } from "@playwright/test";
import { PlaywrightServiceClient } from "../utils/PlaywrightServiceClient.js";
import { PlaywrightServiceConfig } from "../common/playwrightServiceConfig.js";
import { getTestRunConfig } from "../utils/utils.js";
import { CIInfoProvider } from "../utils/cIInfoProvider.js";

/**
 * Initializes the Playwright workspaces by setting up authentication and creating a test run.
 *
 * @param config - The full Playwright configuration
 * @returns Promise that resolves when service initialization is complete
 */
export async function initializePlaywrightServiceTestRun(config: FullConfig): Promise<void> {
  const playwrightServiceApiClient = new PlaywrightServiceClient();
  const playwrightServiceConfig = PlaywrightServiceConfig.instance;
  const ciConfigInfo = CIInfoProvider.getCIInfo();

  const testRunCreatePayload = {
    displayName:
      playwrightServiceConfig.runName === ""
        ? playwrightServiceConfig.runId
        : playwrightServiceConfig.runName,
    config: getTestRunConfig(config),
    ciConfig: ciConfigInfo,
  };

  await playwrightServiceApiClient.createOrUpdateTestRun(testRunCreatePayload);
}
