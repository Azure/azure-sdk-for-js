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
import { TokenCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";

const envSetupForPlayback: { [k: string]: string } = {
  LANGUAGE_API_KEY: "api_key",
  // Second API key
  LANGUAGE_API_KEY_ALT: "api_key_alt",
  ENDPOINT: "https://endpoint",
  TEXT_ANALYTICS_RECOGNIZE_CUSTOM_ENTITIES_PROJECT_NAME: "sanitized",
  TEXT_ANALYTICS_RECOGNIZE_CUSTOM_ENTITIES_DEPLOYMENT_NAME: "sanitized",
  TEXT_ANALYTICS_SINGLE_CATEGORY_CLASSIFY_PROJECT_NAME: "sanitized",
  TEXT_ANALYTICS_SINGLE_CATEGORY_CLASSIFY_DEPLOYMENT_NAME: "sanitized",
  TEXT_ANALYTICS_MULTI_CATEGORY_CLASSIFY_PROJECT_NAME: "sanitized",
  TEXT_ANALYTICS_MULTI_CATEGORY_CLASSIFY_DEPLOYMENT_NAME: "sanitized",
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

  let credential: AzureKeyCredential | TokenCredential;
  switch (authMethod) {
    case "APIKey": {
      credential = new AzureKeyCredential(assertEnvironmentVariable("LANGUAGE_API_KEY"));
      break;
    }
    case "AAD": {
      credential = createTestCredential();
      break;
    }
    case "DummyAPIKey": {
      credential = new AzureKeyCredential("whatever");
      break;
    }
    default: {
      throw Error(`Unsupported authentication method: ${authMethod}`);
    }
  }
  return new TextAnalysisClient(
    env.ENDPOINT || "https://dummy.cognitiveservices.azure.com/",
    credential,
    recorder ? recorder.configureClientOptions(clientOptions) : clientOptions
  );
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
