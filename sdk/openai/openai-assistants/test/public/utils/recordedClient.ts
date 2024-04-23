// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AssistantsClient, OpenAIKeyCredential } from "../../../src/index.js";
import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import { Test } from "mocha";
import { createTestCredential } from "@azure-tools/test-credential";
import { ClientOptions } from "@azure-rest/core-client";
import { AzureKeyCredential } from "@azure/core-auth";

const envSetupForPlayback: Record<string, string> = {
  ENDPOINT: "https://endpoint/",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  SUBSCRIPTION_ID: "azure_subscription_id",
  OPENAI_API_KEY: "openai_api_key",
  AZURE_API_KEY: "azure_api_key",
};

const recorderStartOptions: RecorderStartOptions = {
  envSetupForPlayback,
};

export type AuthMethod = "AzureAPIKey" | "OpenAIKey" | "AAD" | "DummyAPIKey";

export function createClient(
  authMethod: AuthMethod,
  options: {
    recorder?: Recorder;
    clientOptions?: ClientOptions;
  },
): AssistantsClient {
  const { recorder, clientOptions = {} } = options;
  const endpoint = assertEnvironmentVariable("ENDPOINT");
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;

  switch (authMethod) {
    case "AzureAPIKey": {
      return new AssistantsClient(
        endpoint,
        new AzureKeyCredential(assertEnvironmentVariable("AZURE_API_KEY")),
        updatedOptions,
      );
    }
    case "OpenAIKey": {
      return new AssistantsClient(
        new OpenAIKeyCredential(assertEnvironmentVariable("OPENAI_API_KEY")),
        updatedOptions,
      );
    }
    case "AAD": {
      return new AssistantsClient(endpoint, createTestCredential(), updatedOptions);
    }
    case "DummyAPIKey": {
      return new AssistantsClient(endpoint, new AzureKeyCredential("whatever"), updatedOptions);
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
