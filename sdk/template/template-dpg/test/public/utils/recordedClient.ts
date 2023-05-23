// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import { WidgetServiceClient } from "../../../src/index.js";
import { Test } from "mocha";
import { createTestCredential } from "@azure-tools/test-credential";
import { ClientOptions } from "@azure-rest/core-client";

const envSetupForPlayback: { [k: string]: string } = {
  WIDGET_SERVICE_ENDPOINT: "https://myapp.azconfig.io",
  AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
};

// When the recorder observes the values of these environment variables in any
// recorded HTTP request or response, it will replace them with the values they
// are mapped to below.
const recorderStartOptions: RecorderStartOptions = {
  envSetupForPlayback,
};

export function createClient(options: {
  recorder?: Recorder;
  clientOptions?: ClientOptions;
}): WidgetServiceClient {
  const { recorder, clientOptions = {} } = options;
  // Retrieve the endpoint from the environment variable
  // we saved to the .env file earlier
  const endpoint = assertEnvironmentVariable("WIDGET_SERVICE_ENDPOINT");
  // recorder.configureClientOptions() updates the client options by adding the test proxy policy to
  // redirect the requests to reach the proxy tool in record/playback modes instead of
  // hitting the live service.
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;

  // We use the createTestCredential helper from the test-credential tools package.
  // This function returns the special NoOpCredential in playback mode, which
  // is a special TokenCredential implementation that does not make any requests
  // to AAD.
  return new WidgetServiceClient(endpoint, createTestCredential(), updatedOptions);
}

/**
 * starts the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function startRecorder(currentTest?: Test): Promise<Recorder> {
  const recorder = new Recorder(currentTest);
  await recorder.start(recorderStartOptions);
  await recorder.setMatcher("CustomDefaultMatcher", { excludedHeaders: ["Accept-Language"] });
  return recorder;
}
