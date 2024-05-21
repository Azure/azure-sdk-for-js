// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ConversationAnalysisClient, ConversationAnalysisOptions } from "../../../src/";
import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import { AzureKeyCredential } from "@azure/core-auth";
import { Test } from "mocha";
import { createTestCredential } from "@azure-tools/test-credential";

const envSetupForPlayback: { [k: string]: string } = {
  LANGUAGE_API_KEY: "sanitized",
  // Second API key
  LANGUAGE_API_KEY_ALT: "sanitized",
  ENDPOINT: "https://endpoint",
  LANGUAGE_CLU_PROJECT_NAME: "<project-name>",
  LANGUAGE_CLU_DEPLOYMENT_NAME: "<deployment-name>",
  LANGUAGE_ORCHESTRATION_PROJECT_NAME: "<project-name>",
  LANGUAGE_ORCHESTRATION_DEPLOYMENT_NAME: "<deployment-name>",
};

const recorderStartOptions: RecorderStartOptions = {
  envSetupForPlayback,
  removeCentralSanitizers: [
    "AZSDK2030",// "operation-location" is not a secret in itself, main endpoint is masked through other sanitizers (envSetupForPlayback)
  ]
};

export type AuthMethod = "APIKey" | "AAD" | "DummyAPIKey";

export function createClient(options: {
  authMethod: AuthMethod;
  recorder?: Recorder;
  clientOptions?: ConversationAnalysisOptions;
}): ConversationAnalysisClient {
  const { authMethod, recorder, clientOptions = {} } = options;
  const endpoint = assertEnvironmentVariable("ENDPOINT");
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;

  switch (authMethod) {
    case "APIKey": {
      return new ConversationAnalysisClient(
        endpoint,
        new AzureKeyCredential(assertEnvironmentVariable("LANGUAGE_API_KEY")),
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
export async function startRecorder(currentTest?: Test): Promise<Recorder> {
  const recorder = new Recorder(currentTest);
  await recorder.start(recorderStartOptions);
  await recorder.setMatcher("CustomDefaultMatcher", { excludedHeaders: ["Accept-Language"] });
  return recorder;
}
