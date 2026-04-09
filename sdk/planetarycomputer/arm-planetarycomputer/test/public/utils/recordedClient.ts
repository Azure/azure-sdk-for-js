// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, VitestTestContext } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";

const replaceableVariables: Record<string, string> = {
  SUBSCRIPTION_ID: "azure_subscription_id",
  RESOURCE_GROUP: "test-rg",
  CATALOG_NAME: "test-catalog",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  sanitizerOptions: {
    generalSanitizers: [
      {
        regex: true,
        target: "https://[a-zA-Z0-9-]+\\.[a-zA-Z0-9-]+\\.[a-zA-Z0-9-]+\\.geocatalog\\.spatio\\.azure\\.com",
        value: "https://sanitized.sanitized.sanitized.geocatalog.spatio.azure.com",
      },
      {
        regex: true,
        target: "/resourceGroups/[^/]+/providers",
        value: "/resourceGroups/test-rg/providers",
      },
      {
        regex: true,
        target: "/userAssignedIdentities/[^\"]+",
        value: "/userAssignedIdentities/sanitized-identity",
      },
    ],
  },
};

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: VitestTestContext): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderEnvSetup);
  return recorder;
}
