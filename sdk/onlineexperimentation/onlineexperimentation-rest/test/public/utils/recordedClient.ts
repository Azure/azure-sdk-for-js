// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env } from "@azure-tools/test-recorder";
import type { VitestTestContext } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import type { ClientOptions } from "@azure-rest/core-client";
import { OnlineExperimentationClient } from "@azure-rest/onlineexperimentation";

const replaceableVariables: Record<string, string> = {
  AZURE_ONLINEEXPERIMENTATION_ENDPOINT: "https://workspaceId.eastus2.exp.azure.net",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
};

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: VitestTestContext): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start({
    envSetupForPlayback: replaceableVariables,
    removeCentralSanitizers: [
      "AZSDK3430", // don't sanitize "id" property in request body
    ],
  });
  return recorder;
}

/**
 * Creates a client for online experimentation service
 */
export function createClient(
  recorder?: Recorder,
  options?: ClientOptions,
): ReturnType<typeof OnlineExperimentationClient> {
  const endpoint = env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT ?? "";
  const testCredential = createTestCredential();

  const client = OnlineExperimentationClient(
    endpoint,
    testCredential,
    recorder?.configureClientOptions(
      options ?? { credentials: { scopes: ["https://exp.azure.net/.default"] } },
    ),
  );

  return client;
}
