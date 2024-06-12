// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import {
  Recorder,
  RecorderStartOptions,
  //SanitizerOptions,
  //isPlaybackMode,
  //assertEnvironmentVariable,
  env,
} from "@azure-tools/test-recorder";
import { ClientOptions } from "@azure-rest/core-client";
import { DocumentTranslationClient } from "../../../src";
import createClient from "../../../src/documentTranslationClient";

const envSetupForPlayback: Record<string, string> = {
  DOCUMENT_TRANSLATION_API_KEY: "fakeApiKey",
  DOCUMENT_TRANSLATION_ENDPOINT: "https://fakeEndpoint-doctranslation.cognitive.microsofttranslator.com",
  DOCUMENT_TRANSLATION_STORAGE_NAME: "fakeStorageName",
  DOCUMENT_TRANSLATION_CONNECTION_STRING: "DefaultEndpointsProtocol=https;AccountName=fakeStorageName;AccountKey=fakeKey;EndpointSuffix=core.windows.net"
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback,
};

export async function startRecorder(context: Context): Promise<Recorder> {
  const recorder = new Recorder(context.currentTest);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

export async function createDocumentTranslationClient(options: {
  recorder?: Recorder;
  clientOptions?: ClientOptions;
}): Promise<DocumentTranslationClient> {
  const { recorder, clientOptions = {} } = options;
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;
  const endpoint = env.DOCUMENT_TRANSLATION_ENDPOINT ?? ""
  const credentials = { key: env.DOCUMENT_TRANSLATION_API_KEY ?? "" };

  const client = createClient(endpoint, credentials, updatedOptions);
  return client;
}