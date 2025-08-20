// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";
import type { TextAnalyticsClientOptions } from "@azure/ai-text-analytics";
import { AzureKeyCredential, TextAnalyticsClient } from "@azure/ai-text-analytics";
import { createTestCredential } from "@azure-tools/test-credential";
import { getEndpoint, getKey, isLiveMode, isLocalAuthDisabled } from "../../utils/injectables.js";

const recorderStartOptions: RecorderStartOptions = {
  envSetupForPlayback: {},
  removeCentralSanitizers: [
    "AZSDK2015",
    "AZSDK2021",
    "AZSDK2030",
    "AZSDK2031",
    "AZSDK3430",
    "AZSDK4001",
  ],
};

export type AuthMethod = "APIKey" | "AAD" | "DummyAPIKey";

export function createClient(options: {
  authMethod: AuthMethod;
  recorder?: Recorder;
  clientOptions?: TextAnalyticsClientOptions;
}): TextAnalyticsClient | undefined {
  const { authMethod, recorder, clientOptions = {} } = options;
  const endpoint = getEndpoint();
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;

  switch (authMethod) {
    case "APIKey": {
      if (isLocalAuthDisabled() && isLiveMode()) {
        return undefined;
      }
      return new TextAnalyticsClient(endpoint, new AzureKeyCredential(getKey()), updatedOptions);
    }
    case "AAD": {
      return new TextAnalyticsClient(endpoint, createTestCredential(), updatedOptions);
    }
    case "DummyAPIKey": {
      return new TextAnalyticsClient(endpoint, new AzureKeyCredential("whatever"), updatedOptions);
    }
    default: {
      throw Error(`Unsupported authentication method: ${authMethod}`);
    }
  }
}

/**
 * starts the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function startRecorder(currentTest?: TestInfo): Promise<Recorder> {
  const recorder = new Recorder(currentTest);
  await recorder.start(recorderStartOptions);
  await recorder.setMatcher("CustomDefaultMatcher", { excludedHeaders: ["Accept-Language"] });
  return recorder;
}
