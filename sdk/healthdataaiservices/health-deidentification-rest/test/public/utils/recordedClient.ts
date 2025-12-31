// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VitestTestContext } from "@azure-tools/test-recorder";
import { Recorder, assertEnvironmentVariable, env } from "@azure-tools/test-recorder";
import type { TokenCredential } from "@azure/core-auth";
import type { DeidentificationClient } from "../../../src/clientDefinitions.js";
import createClient from "../../../src/deidentificationClient.js";

const fakeStorageAccountLocation =
  "https://fake_storage_account_sas_uri.blob.core.windows.net/container-sdk-dev-fakeid";

const envSetupForPlayback: Record<string, string> = {
  HEALTHDATAAISERVICES_DEID_SERVICE_ENDPOINT: "https://example.api.deid.azure.com",
  HEALTHDATAAISERVICES_STORAGE_ACCOUNT_NAME: "fake_storage_account_sas_uri",
  HEALTHDATAAISERVICES_STORAGE_CONTAINER_NAME: "container-sdk-dev-fakeid",
  HEALTHDATAAISERVICES_STORAGE_ACCOUNT_LOCATION: fakeStorageAccountLocation,
  CONTINUATION_TOKEN: "continuationToken=1234567890",
};

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(testContext: VitestTestContext): Promise<Recorder> {
  const recorder = new Recorder(testContext);
  await recorder.start({
    envSetupForPlayback,
    sanitizerOptions: {
      bodyKeySanitizers: [
        {
          value: fakeStorageAccountLocation,
          jsonPath: "$.sourceLocation.location",
          regex: "^(?!FAKE_STORAGE_ACCOUNT$).*",
        },
        {
          value: fakeStorageAccountLocation,
          jsonPath: "$.targetLocation.location",
          regex: "^(?!FAKE_STORAGE_ACCOUNT$).*",
        },
      ],
      generalSanitizers: [
        {
          regex: true,
          value: env["CONTINUATION_TOKEN"] ?? "",
          target: "continuationToken=[A-Za-z0-9%._~-]+",
        },
      ],
    },
    removeCentralSanitizers: ["AZSDK4001", "AZSDK2030", "AZSDK3430", "AZSDK3493"],
  });
  return recorder;
}

export function getTestEnvironment(): string {
  if (typeof process !== "undefined" && process.versions != null && process.versions.node != null) {
    return "node";
  }

  return "browser";
}

export async function createRecordedDeidentificationClient(
  recorder: Recorder,
  credentials: TokenCredential,
): Promise<DeidentificationClient> {
  const endpoint = assertEnvironmentVariable("HEALTHDATAAISERVICES_DEID_SERVICE_ENDPOINT");
  const client = await createClient(endpoint, credentials, recorder.configureClientOptions({}));
  return client;
}
