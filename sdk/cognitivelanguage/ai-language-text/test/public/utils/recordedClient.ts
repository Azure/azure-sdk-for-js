// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TextAnalysisClientOptions } from "../../../src/index.js";
import { AzureKeyCredential, TextAnalysisClient } from "../../../src/index.js";
import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { getEndpoint, getKey1 } from "../../utils/injectables.js";

const envSetupForPlayback: { [k: string]: string } = {
  KEY1: "api_key",
  ENDPOINT: "https://endpoint",
};

const recorderStartOptions: RecorderStartOptions = {
  envSetupForPlayback,
  removeCentralSanitizers: ["AZSDK2015", "AZSDK2030", "AZSDK3430", "AZSDK3493", "AZSDK4001"],
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
      const key = getKey1();
      if (!key) {
        return undefined;
      }
      return new TextAnalysisClient(endpoint, new AzureKeyCredential(key), updatedOptions);
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
