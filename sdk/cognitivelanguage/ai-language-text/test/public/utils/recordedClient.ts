// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential, TextAnalysisClient, TextAnalysisClientOptions } from "../../../src/";
import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import { Test } from "mocha";
import { createTestCredential } from "@azure-tools/test-credential";

const envSetupForPlayback: { [k: string]: string } = {
  LANGUAGE_API_KEY: "api_key",
  // Second API key
  LANGUAGE_API_KEY_ALT: "api_key_alt",
  ENDPOINT: "https://endpoint",
  AZURE_LANGUAGE_ENDPOINT: "https://endpoint",
  AZURE_LANGUAGE_KEY: "api_key",
  CUSTOM_ENTITIES_PROJECT_NAME: "sanitized",
  CUSTOM_ENTITIES_DEPLOYMENT_NAME: "sanitized",
  SINGLE_LABEL_CLASSIFY_PROJECT_NAME: "sanitized",
  SINGLE_LABEL_CLASSIFY_DEPLOYMENT_NAME: "sanitized",
  MULTI_LABEL_CLASSIFY_PROJECT_NAME: "sanitized",
  MULTI_LABEL_CLASSIFY_DEPLOYMENT_NAME: "sanitized",
};

const recorderStartOptions: RecorderStartOptions = {
  envSetupForPlayback,
};

export type AuthMethod = "APIKey" | "AAD" | "DummyAPIKey";

type ResourceKind = "Default" | "CustomText";

function getEndpointEnvVarName(resource: ResourceKind): string {
  switch (resource) {
    case "CustomText":
      return "AZURE_LANGUAGE_ENDPOINT";
    case "Default":
      return "ENDPOINT";
  }
}

function getApiKeyEnvVarName(resource: ResourceKind): string {
  switch (resource) {
    case "CustomText":
      return "AZURE_LANGUAGE_KEY";
    case "Default":
      return "LANGUAGE_API_KEY";
  }
}

export function createClient(
  authMethod: AuthMethod,
  options: {
    resource?: ResourceKind;
    recorder?: Recorder;
    clientOptions?: TextAnalysisClientOptions;
  }
): TextAnalysisClient {
  const { resource = "Default", recorder, clientOptions = {} } = options;
  const endpoint = assertEnvironmentVariable(getEndpointEnvVarName(resource));
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;

  switch (authMethod) {
    case "APIKey": {
      return new TextAnalysisClient(
        endpoint,
        new AzureKeyCredential(assertEnvironmentVariable(getApiKeyEnvVarName(resource))),
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
