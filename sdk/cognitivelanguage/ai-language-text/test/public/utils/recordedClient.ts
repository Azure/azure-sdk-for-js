// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TextAnalysisClientOptions } from "@azure/ai-language-text";
import { AzureKeyCredential, TextAnalysisClient } from "@azure/ai-language-text";
import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { getEndpoint, getKey1, isDisableLocalAuth, isLiveMode } from "../../utils/injectables.js";

const recorderStartOptions: RecorderStartOptions = {
  envSetupForPlayback: {},
  removeCentralSanitizers: ["AZSDK2015", "AZSDK2030", "AZSDK3430", "AZSDK3493", "AZSDK4001"],
  sanitizerOptions: {
    bodyKeySanitizers: [
      {
        jsonPath: "$.tasks.[*].parameters.deploymentName",
      },
      {
        jsonPath: "$.tasks.[*].parameters.projectName",
      },
    ],
  },
};

export type AuthMethod = "APIKey" | "AAD" | "DummyAPIKey";

export function createClient(
  authMethod: AuthMethod,
  options: {
    recorder?: Recorder;
    clientOptions?: TextAnalysisClientOptions;
  },
): TextAnalysisClient | undefined {
  const { recorder, clientOptions = {} } = options;
  const endpoint = getEndpoint();
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;

  switch (authMethod) {
    case "APIKey": {
      if (isDisableLocalAuth() && isLiveMode()) {
        return undefined;
      }
      return new TextAnalysisClient(endpoint, new AzureKeyCredential(getKey1()), updatedOptions);
    }
    case "AAD": {
      return new TextAnalysisClient(endpoint, createTestCredential(), updatedOptions);
    }
    case "DummyAPIKey": {
      return new TextAnalysisClient(endpoint, new AzureKeyCredential("whatever"), updatedOptions);
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
