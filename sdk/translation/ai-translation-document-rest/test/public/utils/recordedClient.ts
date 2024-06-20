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
import { KeyCredential, TokenCredential } from "@azure/core-auth";

function getUriSanitizerForQueryParam(paramName: string) {
  return {
    regex: true,
    target: `http.+\\?([^&=]+=[^&=]+&)*(?<param>${paramName}=[^&=]+&?)`,
    groupForReplace: "param",
    value: "",
  };
}

type UriSanitizers = Required<RecorderStartOptions>["sanitizerOptions"]["uriSanitizers"];
const sasParams = ["se", "sig", "sip", "sp", "spr", "srt", "ss", "sr", "st", "sv"];

export const uriSanitizers: UriSanitizers = sasParams.map(getUriSanitizerForQueryParam);

const envSetupForPlayback: Record<string, string> = {
  DOCUMENT_TRANSLATION_API_KEY: "fakeApiKey",
  DOCUMENT_TRANSLATION_ENDPOINT: "https://fakeEndpoint-doctranslation.cognitive.microsofttranslator.com",
  DOCUMENT_TRANSLATION_STORAGE_NAME: "fakeStorageName",
  DOCUMENT_TRANSLATION_CONNECTION_STRING: "DefaultEndpointsProtocol=https;AccountName=fakeStorageName;AccountKey=fakeKey;EndpointSuffix=core.windows.net"
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: {
    uriSanitizers,
  },
};

export async function startRecorder(context: Context): Promise<Recorder> {
  const recorder = new Recorder(context.currentTest);
  //await recorder.start(recorderEnvSetup);
  await recorder.start(
    recorderEnvSetup
  );
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

export async function createDocumentTranslationClientWithEndpointAndCredentials(options: {
  recorder?: Recorder;
  endpointParam: string;
  credentials: TokenCredential | KeyCredential;
  clientOptions?: ClientOptions;
}): Promise<DocumentTranslationClient> {
  const { recorder, clientOptions = {} } = options;
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;
  const client = createClient(options.endpointParam, options.credentials, updatedOptions);
  return client;
}