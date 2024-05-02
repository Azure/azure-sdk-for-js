// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import {
  Recorder,
  RecorderStartOptions,
  isPlaybackMode,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import { StaticAccessTokenCredential } from "./StaticAccessTokenCredential";
import createTextTranslationClient, {
  TranslatorCredential,
  TranslatorTokenCredential,
  TextTranslationClient,
} from "../../../src";
import { ClientOptions } from "@azure-rest/core-client";
import { createDefaultHttpClient, createPipelineRequest } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";
import { ClientSecretCredential } from "@azure/identity";

const envSetupForPlayback: Record<string, string> = {
  TEXT_TRANSLATION_API_KEY: "fakeapikey",
  TEXT_TRANSLATION_ENDPOINT: "https://fakeEndpoint.cognitive.microsofttranslator.com",
  TEXT_TRANSLATION_CUSTOM_ENDPOINT: "https://fakeCustomEndpoint.cognitiveservices.azure.com",
  TEXT_TRANSLATION_REGION: "fakeregion",
  TEXT_TRANSLATION_AAD_REGION: "fakeregion",
  TEXT_TRANSLATION_RESOURCE_ID: "fakeresourceid",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback,
};

export async function startRecorder(context: Context): Promise<Recorder> {
  const recorder = new Recorder(context.currentTest);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

export async function createTranslationClient(options: {
  recorder?: Recorder;
  clientOptions?: ClientOptions;
}): Promise<TextTranslationClient> {
  const { recorder, clientOptions = {} } = options;
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;
  const endpoint = assertEnvironmentVariable("TEXT_TRANSLATION_ENDPOINT");
  const apikey = assertEnvironmentVariable("TEXT_TRANSLATION_API_KEY");
  const region = assertEnvironmentVariable("TEXT_TRANSLATION_REGION");

  const translatorCredential: TranslatorCredential = {
    key: apikey,
    region,
  };
  const client = createTextTranslationClient(endpoint, translatorCredential, updatedOptions);
  return client;
}

export async function createCustomTranslationClient(options: {
  recorder?: Recorder;
  clientOptions?: ClientOptions;
}): Promise<TextTranslationClient> {
  const { recorder, clientOptions = {} } = options;
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;
  const customEndpoint = assertEnvironmentVariable("TEXT_TRANSLATION_CUSTOM_ENDPOINT");
  const apikey = assertEnvironmentVariable("TEXT_TRANSLATION_API_KEY");
  const region = assertEnvironmentVariable("TEXT_TRANSLATION_REGION");

  const translatorCredential: TranslatorCredential = {
    key: apikey,
    region,
  };
  const client = createTextTranslationClient(customEndpoint, translatorCredential, updatedOptions);
  return client;
}

export async function createTokenTranslationClient(options: {
  recorder?: Recorder;
  clientOptions?: ClientOptions;
}): Promise<TextTranslationClient> {
  const { recorder, clientOptions = {} } = options;
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;
  const endpoint = assertEnvironmentVariable("TEXT_TRANSLATION_ENDPOINT");
  const apikey = assertEnvironmentVariable("TEXT_TRANSLATION_API_KEY");
  const region = assertEnvironmentVariable("TEXT_TRANSLATION_REGION");

  const issueTokenURL: string =
    "https://" +
    region +
    ".api.cognitive.microsoft.com/sts/v1.0/issueToken?Subscription-Key=" +
    apikey;
  let credential: TokenCredential;
  if (isPlaybackMode()) {
    credential = createMockToken();
  } else {
    const tokenClient = createDefaultHttpClient();
    const request = createPipelineRequest({
      url: issueTokenURL,
      method: "POST",
    });
    request.allowInsecureConnection = true;
    const response = await tokenClient.sendRequest(request);
    const token: string = response.bodyAsText!;
    credential = new StaticAccessTokenCredential(token);
  }
  const client = createTextTranslationClient(endpoint, credential, updatedOptions);
  return client;
}

export async function createAADAuthenticationTranslationClient(options: {
  recorder?: Recorder;
  clientOptions?: ClientOptions;
}): Promise<TextTranslationClient> {
  const { recorder, clientOptions = {} } = options;
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;
  const endpoint = assertEnvironmentVariable("TEXT_TRANSLATION_ENDPOINT");
  const region = assertEnvironmentVariable("TEXT_TRANSLATION_AAD_REGION");
  const azureResourceId = assertEnvironmentVariable("TEXT_TRANSLATION_RESOURCE_ID");

  let tokenCredential: TokenCredential;
  if (isPlaybackMode()) {
    tokenCredential = createMockToken();
  } else {
    const clientId = assertEnvironmentVariable("TEXT_TRANSLATION_CLIENT_ID");
    const tenantId = assertEnvironmentVariable("TEXT_TRANSLATION_TENANT_ID");
    const secret = assertEnvironmentVariable("TEXT_TRANSLATION_CLIENT_SECRET");

    tokenCredential = new ClientSecretCredential(tenantId, clientId, secret);
  }

  const translatorTokenCredentials: TranslatorTokenCredential = {
    tokenCredential,
    azureResourceId,
    region,
  };
  const client = createTextTranslationClient(endpoint, translatorTokenCredentials, updatedOptions);
  return client;
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
