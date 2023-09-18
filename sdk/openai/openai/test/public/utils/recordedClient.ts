// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OpenAIClient, OpenAIKeyCredential } from "../../../src/index.js";
import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import { Test } from "mocha";
import { createTestCredential } from "@azure-tools/test-credential";
import { ClientOptions } from "@azure-rest/core-client";
import { AzureKeyCredential } from "@azure/core-auth";

const envSetupForPlayback: { [k: string]: string } = {
  OPENAI_API_KEY: "openai_api_key",
  AZURE_API_KEY: "azure_api_key",
  ENDPOINT: "https://endpoint/",
  SUBSCRIPTION_ID: "subscription_id",
  AZURE_SEARCH_ENDPOINT: "azure_search_endpoint",
  AZURE_SEARCH_KEY: "azure_search_key",
  AZURE_SEARCH_INDEX: "azure_search_index",
};

const recorderStartOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: {
    generalSanitizers: [
      {
        regex: true,
        target: `\\.png?[^"]+`,
        value: ".png?sanitized",
      },
      {
        regex: true,
        target: `resourceGroups/[\\w-]+/`,
        value: "resourceGroups/openai-shared/"
      },
      {
        regex: true,
        target: `accounts/[\\w-]+/`,
        value: "accounts/openai-shared/"
      }
    ],
  },
};

export type AuthMethod = "AzureAPIKey" | "OpenAIKey" | "AAD" | "DummyAPIKey";

export function createClient(
  authMethod: AuthMethod,
  options: {
    recorder?: Recorder;
    clientOptions?: ClientOptions;
  }
): OpenAIClient {
  const { recorder, clientOptions = {} } = options;
  const endpoint = assertEnvironmentVariable("ENDPOINT");
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;

  switch (authMethod) {
    case "AzureAPIKey": {
      return new OpenAIClient(
        endpoint,
        new AzureKeyCredential(assertEnvironmentVariable("AZURE_API_KEY")),
        updatedOptions
      );
    }
    case "OpenAIKey": {
      return new OpenAIClient(
        new OpenAIKeyCredential(assertEnvironmentVariable("OPENAI_API_KEY")),
        updatedOptions
      );
    }
    case "AAD": {
      return new OpenAIClient(endpoint, createTestCredential(), updatedOptions);
    }
    case "DummyAPIKey": {
      return new OpenAIClient(endpoint, new AzureKeyCredential("whatever"), updatedOptions);
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
