// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConversationAnalysisClientOptionalParams } from "../../../src/index.js";
import { ConversationAnalysisClient } from "../../../src/index.js";
import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { AzureKeyCredential } from "@azure/core-auth";
import { createTestCredential } from "@azure-tools/test-credential";
import { getEndpoint, getKey1, isDisableLocalAuth } from "../../utils/injectables.js";
import { EnvVarKeys } from "../../utils/constants.js";
import * as MOCKs from "../../utils/constants.js";

const envSetupForPlayback: { [k: string]: string } = {
  [EnvVarKeys.ENDPOINT]: MOCKs.ENDPOINT,
  [EnvVarKeys.KEY1]: MOCKs.KEY1,
  [EnvVarKeys.KEY2]: MOCKs.KEY2,
};

const recorderStartOptions: RecorderStartOptions = {
  envSetupForPlayback,
  removeCentralSanitizers: ["AZSDK2015", "AZSDK2030", "AZSDK3430", "AZSDK3493", "AZSDK4001"],
  sanitizerOptions: {
    bodyKeySanitizers: [
      {
        jsonPath: "$.parameters.deploymentName",
      },
      {
        jsonPath: "$.parameters.projectName",
      },
    ],
  },
};

export type AuthMethod = "APIKey" | "AAD" | "DummyAPIKey";

export function createClient(options: {
  authMethod: AuthMethod;
  recorder?: Recorder;
  clientOptions?: ConversationAnalysisClientOptionalParams;
}): ConversationAnalysisClient | undefined {
  const { authMethod, recorder, clientOptions = {} } = options;
  const endpoint = getEndpoint();
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;

  switch (authMethod) {
    case "APIKey": {
      if (isDisableLocalAuth() && isLiveMode()) {
        return undefined;
      }
      return new ConversationAnalysisClient(
        endpoint,
        new AzureKeyCredential(getKey1()),
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
