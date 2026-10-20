// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions } from "@azure-tools/test-recorder";
import { Recorder, assertEnvironmentVariable, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import type { EdgeActionsManagementClientOptionalParams } from "../../../src/index.js";
import { EdgeActionsManagementClient } from "../../../src/index.js";
import { sanitizedSubscription, sanitizers } from "../../utils/sanitizers.js";

const replaceableVariables: Record<string, string> = {
  SUBSCRIPTION_ID: sanitizedSubscription,
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  sanitizerOptions: sanitizers,
  removeCentralSanitizers: [
    "AZSDK3493", // Preserve test-generated names; package sanitizers redact unrelated resources.
    "AZSDK3430", // Preserve ARM ID structure; package sanitizers redact identifying segments.
    "AZSDK2030", // Preserve Operation-Location; signed query values are sanitized separately.
  ],
};

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : 1000,
};

/**
 * Starts recording or playback before clients read environment variables.
 */
export async function startRecorder(recorder: Recorder): Promise<void> {
  await recorder.start({
    ...recorderEnvSetup,
    envSetupForPlayback: {
      ...replaceableVariables,
      ...(process.env.RESOURCE_GROUP ? { RESOURCE_GROUP: "edgeactions-test-rg" } : {}),
    },
  });
}

export function createClient(
  recorder: Recorder,
  options?: EdgeActionsManagementClientOptionalParams,
): EdgeActionsManagementClient {
  const credential = createTestCredential();
  const subscriptionId = assertEnvironmentVariable("SUBSCRIPTION_ID");
  const client = new EdgeActionsManagementClient(
    credential,
    subscriptionId,
    recorder.configureClientOptions({
      ...options,
      additionalPolicies: [...(options?.additionalPolicies ?? [])],
    }),
  );
  return client;
}
