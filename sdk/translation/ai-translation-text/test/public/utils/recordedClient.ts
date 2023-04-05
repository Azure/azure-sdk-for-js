// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { Recorder, RecorderStartOptions, env, isPlaybackMode } from "@azure-tools/test-recorder";
import {StaticAccessTokenCredential} from "../StaticAccessTokenCredential";
import TextTranslationFactory, { TextTranslationClient, TranslatorCredential } from "../../../src";
import { ClientOptions } from "@azure-rest/core-client";
import {
  createDefaultHttpClient,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

const envSetupForPlayback: Record<string, string> = {
  TEXT_TRANSLATION_API_KEY: "fakeapikey",
  TEXT_TRANSLATION_ENDPOINT: "https://fakeEndpoint.cognitive.microsofttranslator.com",
  TEXT_TRANSLATION_CUSTOM_ENDPOINT: "https://fakeCustomEndpoint.cognitiveservices.azure.com",
  TEXT_TRANSLATION_REGION: "fakeregion",
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
  const endpoint =
    env.TEXT_TRANSLATION_ENDPOINT || "https://fakeEndpoint.cognitive.microsofttranslator.com";
  const apikey = env.TEXT_TRANSLATION_API_KEY || "fakeApikey";
  const region = env.TEXT_TRANSLATION_REGION || "fakeRegion";

  const translatorCredential = new TranslatorCredential(apikey, region);
  const client = TextTranslationFactory(endpoint, translatorCredential, updatedOptions);
  return client;
}

export async function createCustomTranslationClient(options: {
  recorder?: Recorder;
  clientOptions?: ClientOptions;
}): Promise<TextTranslationClient> {
  const { recorder, clientOptions = {} } = options;
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;
  const customEndpoint =
    env.TEXT_TRANSLATION_CUSTOM_ENDPOINT ||
    "https://fakeCustomEndpoint.cognitiveservices.azure.com";
  const apikey = env.TEXT_TRANSLATION_API_KEY || "fakeApikey";
  const region = env.TEXT_TRANSLATION_REGION || "fakeRegion";

  const translatorCredential = new TranslatorCredential(apikey, region);
  const client = TextTranslationFactory(customEndpoint, translatorCredential, updatedOptions);
  return client;
}

export async function createLanguageClient(options: {
  recorder?: Recorder;
  clientOptions?: ClientOptions;
}): Promise<TextTranslationClient> {
  const { recorder, clientOptions = {} } = options;
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;
  const endpoint =
    env.TEXT_TRANSLATION_ENDPOINT || "https://fakeEndpoint.cognitive.microsofttranslator.com";
  return TextTranslationFactory(endpoint, undefined, updatedOptions);
}

export async function createTokenTranslationClient(options: {  
  recorder?: Recorder;
  clientOptions?: ClientOptions;
}): Promise<TextTranslationClient> {
  const { recorder, clientOptions = {} } = options;
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;
  const endpoint = env.TEXT_TRANSLATION_ENDPOINT || "https://fakeEndpoint.cognitive.microsofttranslator.com";
  const apikey = env.TEXT_TRANSLATION_API_KEY || "fakeApikey";
  const region = env.TEXT_TRANSLATION_REGION || "fakeRegion"; 
  
  const issueTokenURL: string = "https://" + region + ".api.cognitive.microsoft.com/sts/v1.0/issueToken?Subscription-Key=" + apikey;
  let credential: TokenCredential;
  if (isPlaybackMode()) {
    credential = createMockToken();
  }
  else {  
    const tokenClient = createDefaultHttpClient();
    const request = createPipelineRequest({
      url: issueTokenURL,
      method: "POST"
    });
    request.allowInsecureConnection = true;
    const response = await tokenClient.sendRequest(request);
    const token:string = response.bodyAsText!; 
    credential = new StaticAccessTokenCredential(token);
  }
  const client = TextTranslationFactory (endpoint, credential, updatedOptions);    
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
