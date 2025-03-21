// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConversationAnalysisOptions } from "../../../src/index.js";
import { ConversationAnalysisClient } from "../../../src/index.js";
import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";
import { AzureKeyCredential } from "@azure/core-auth";
import { createTestCredential } from "@azure-tools/test-credential";
import { getEndpoint, getKey1 } from "../../utils/injectables.js";

const envSetupForPlayback: { [k: string]: string } = {
  ENDPOINT: "https://endpoint",
  KEY1: "fakekey",
  KEY2: "fakekey",
  LANGUAGE_CLU_PROJECT_NAME: "<project-name>",
  LANGUAGE_CLU_DEPLOYMENT_NAME: "<deployment-name>",
  LANGUAGE_ORCHESTRATION_PROJECT_NAME: "<project-name>",
  LANGUAGE_ORCHESTRATION_DEPLOYMENT_NAME: "<deployment-name>",
};

const recorderStartOptions: RecorderStartOptions = {
  envSetupForPlayback,
  removeCentralSanitizers: ["AZSDK2030"],
};

export type AuthMethod = "APIKey" | "AAD" | "DummyAPIKey";

export function createClient(options: {
  authMethod: AuthMethod;
  recorder?: Recorder;
  clientOptions?: ConversationAnalysisOptions;
}): ConversationAnalysisClient | undefined {
  const { authMethod, recorder, clientOptions = {} } = options;
  const endpoint = getEndpoint();
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;

  switch (authMethod) {
    case "APIKey": {
      const apiKey = getKey1();
      if (!apiKey) {
        return undefined;
      }
      return new ConversationAnalysisClient(
        endpoint,
        new AzureKeyCredential(apiKey),
        updatedOptions,
      );
    }
    case "AAD": {
      return new ConversationAnalysisClient(endpoint, createTestCredential(), updatedOptions);
    }
    case "DummyAPIKey": {
      return new ConversationAnalysisClient(
        endpoint,
        new AzureKeyCredential("whatever"),
        updatedOptions,
      );
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
