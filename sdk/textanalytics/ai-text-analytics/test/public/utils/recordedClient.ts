// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential, TextAnalysisClient, TextAnalysisClientOptions } from "../../../src/";
import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
  env,
} from "@azure-tools/test-recorder";
import { Test } from "mocha";
import { createTestCredential } from "@azure-tools/test-credential";

const envSetupForPlayback: { [k: string]: string } = {
  LANGUAGE_API_KEY: "api_key",
  // Second API key
  LANGUAGE_API_KEY_ALT: "api_key_alt",
  ENDPOINT: "https://endpoint",
  LANGUAGE_CUSTOM_ENTITY_RECOGNITION_PROJECT_NAME: "sanitized",
  LANGUAGE_CUSTOM_ENTITY_RECOGNITION_DEPLOYMENT_NAME: "sanitized",
  LANGUAGE_CUSTOM_SINGLE_LABEL_CLASSIFICATION_PROJECT_NAME: "sanitized",
  LANGUAGE_CUSTOM_SINGLE_LABEL_CLASSIFICATION_DEPLOYMENT_NAME: "sanitized",
  LANGUAGE_CUSTOM_MULTI_LABEL_CLASSIFICATION_PROJECT_NAME: "sanitized",
  LANGUAGE_CUSTOM_MULTI_LABEL_CLASSIFICATION_DEPLOYMENT_NAME: "sanitized",
};

const recorderStartOptions: RecorderStartOptions = {
  envSetupForPlayback,
};

export type AuthMethod = "APIKey" | "AAD" | "DummyAPIKey";

export function createClient(options: {
  authMethod: AuthMethod;
  recorder?: Recorder;
  clientOptions?: TextAnalysisClientOptions;
}): TextAnalysisClient {
  const { authMethod, recorder, clientOptions = {} } = options;
  const endpoint = env.ENDPOINT || "https://dummy.cognitiveservices.azure.com/";
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;

  switch (authMethod) {
    case "APIKey": {
      return new TextAnalysisClient(
        endpoint,
        new AzureKeyCredential(assertEnvironmentVariable("LANGUAGE_API_KEY")),
        updatedOptions
      );
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
export async function startRecorder(currentTest?: Test): Promise<Recorder> {
  const recorder = new Recorder(currentTest);
  await recorder.start(recorderStartOptions);
  await recorder.setMatcher("CustomDefaultMatcher", { excludedHeaders: ["Accept-Language"] });
  return recorder;
}
