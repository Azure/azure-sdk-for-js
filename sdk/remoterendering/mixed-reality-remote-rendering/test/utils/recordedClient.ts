// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";

import { AccessToken, AzureKeyCredential } from "@azure/core-auth";
import {
  Recorder,
  isPlaybackMode,
  RecorderStartOptions,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";

import { RemoteRenderingClient } from "../../src";

// When the recorder observes the values of these environment variables
// in any recorded HTTP request or response, it will replace them with
// the values they are mapped to below, which are not real account details.
const envSetupForPlayback: Record<string, string> = {
  REMOTERENDERING_ARR_ACCOUNT_DOMAIN: "eastus2.mixedreality.azure.com",
  REMOTERENDERING_ARR_ACCOUNT_ID: "00000000-1111-2222-3333-444455556666",
  REMOTERENDERING_ARR_ACCOUNT_KEY: "arr_account_key",
  REMOTERENDERING_ARR_BLOB_CONTAINER_NAME: "test",
  REMOTERENDERING_ARR_SAS_TOKEN: "arr_sas_token",
  REMOTERENDERING_ARR_SERVICE_ENDPOINT: "https://remoterendering.eastus2.mixedreality.azure.com",
  REMOTERENDERING_ARR_STORAGE_ACCOUNT_NAME: "sdktest",
};

export const recorderStartOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: {
    generalSanitizers: [
      {
        regex: true,
        target: `"AccessToken":"[^"]*"`,
        value: `"AccessToken":"<access_token>"`,
      },
    ],
  },
};

export function createClient(recorder: Recorder): RemoteRenderingClient {
  const serviceEndpoint = assertEnvironmentVariable("REMOTERENDERING_ARR_SERVICE_ENDPOINT");
  const accountDomain = assertEnvironmentVariable("REMOTERENDERING_ARR_ACCOUNT_DOMAIN");
  const accountId = assertEnvironmentVariable("REMOTERENDERING_ARR_ACCOUNT_ID");
  const accountKey = assertEnvironmentVariable("REMOTERENDERING_ARR_ACCOUNT_KEY");

  if (isPlaybackMode()) {
    // When playing back, we do not want to interact with the STS service, so we use
    // the AccessToken auth path.
    const maxTimestampMs = 8640000000000000;
    const credential: AccessToken = { token: "<access_token>", expiresOnTimestamp: maxTimestampMs };
    return new RemoteRenderingClient(
      serviceEndpoint,
      accountId,
      credential,
      recorder.configureClientOptions({})
    );
  } else {
    const credential: AzureKeyCredential = new AzureKeyCredential(accountKey);
    return new RemoteRenderingClient(
      serviceEndpoint,
      accountId,
      accountDomain,
      credential,
      recorder.configureClientOptions({})
    );
  }
}

/**
 * Creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export function createRecorder(context: Context): Recorder {
  return new Recorder(context.currentTest);
}
