// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";
import { StaticAccessTokenCredential } from "./StaticAccessTokenCredential.js";
import type { TextTranslationClient } from "../../../src/index.js";
import createTextTranslationClient from "../../../src/index.js";
import type { ClientOptions } from "@azure-rest/core-client";
import { createDefaultHttpClient, createPipelineRequest } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";
import {
  getEndpoint,
  getKey,
  getRegion,
  getResourceId,
  isLiveMode,
} from "../../utils/injectables.js";
import { createTestCredential } from "@azure-tools/test-credential";
import * as MOCKS from "../../utils/constants.js";

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback: {},
  sanitizerOptions: {
    uriSanitizers: [
      {
        target: getEndpoint(),
        value: MOCKS.ENDPOINT,
      },
    ],
    headerSanitizers: [
      {
        key: "Ocp-Apim-Subscription-Key",
        value: MOCKS.KEY,
      },
      {
        key: "Ocp-Apim-Subscription-Region",
        value: MOCKS.REGION,
      },
      {
        key: "Ocp-Apim-ResourceId",
        value: MOCKS.RESOURCE_ID,
      },
    ],
  },
  removeCentralSanitizers: [
    "AZSDK2015",
    "AZSDK2021",
    "AZSDK2030",
    "AZSDK2031",
    "AZSDK3430",
    "AZSDK4001",
  ],
};

export async function startRecorder(context: TestInfo): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

export async function createTranslationClient(options: {
  recorder?: Recorder;
  clientOptions?: ClientOptions;
}): Promise<TextTranslationClient> {
  const { recorder, clientOptions = {} } = options;
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;

  const translatorCredential = {
    key: getKey(),
    region: getRegion(),
  };
  return createTextTranslationClient(getEndpoint(), translatorCredential, updatedOptions);
}

export async function createCustomTranslationClient(options: {
  recorder?: Recorder;
  clientOptions?: ClientOptions;
}): Promise<TextTranslationClient> {
  const { recorder, clientOptions = {} } = options;
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;

  const translatorCredential = {
    key: getKey(),
    region: getRegion(),
  };
  return createTextTranslationClient(getEndpoint(), translatorCredential, updatedOptions);
}

export async function createTokenTranslationClient(options: {
  recorder?: Recorder;
  clientOptions?: ClientOptions;
}): Promise<TextTranslationClient> {
  const { recorder, clientOptions = {} } = options;
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;

  const issueTokenURL =
    "https://" +
    getRegion() +
    ".api.cognitive.microsoft.com/sts/v1.0/issueToken?Subscription-Key=" +
    getKey();
  let credential: TokenCredential;
  if (!isLiveMode()) {
    credential = createMockToken();
  } else {
    const tokenClient = createDefaultHttpClient();
    const request = createPipelineRequest({
      url: issueTokenURL,
      method: "POST",
    });
    request.allowInsecureConnection = true;
    const response = await tokenClient.sendRequest(request);
    const token = response.bodyAsText!;
    credential = new StaticAccessTokenCredential(token);
  }
  return createTextTranslationClient(getEndpoint(), credential, updatedOptions);
}

export async function createAADAuthenticationTranslationClient(options: {
  recorder?: Recorder;
  clientOptions?: ClientOptions;
}): Promise<TextTranslationClient> {
  const { recorder, clientOptions = {} } = options;
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;
  const translatorTokenCredentials = {
    tokenCredential: createTestCredential(),
    azureResourceId: getResourceId(),
    region: getRegion(),
  };
  return createTextTranslationClient(getEndpoint(), translatorTokenCredentials, updatedOptions);
}

export function createMockToken(): {
  getToken: (_scopes: string) => Promise<{ token: string; expiresOnTimestamp: number }>;
} {
  return {
    getToken: async (_scopes: string) => {
      return { token: "testToken", expiresOnTimestamp: 11111 };
    },
  };
}
