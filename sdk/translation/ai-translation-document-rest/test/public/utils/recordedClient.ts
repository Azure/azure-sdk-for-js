// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import {
  Recorder,
  RecorderStartOptions,
  env,
} from "@azure-tools/test-recorder";
import { ClientOptions } from "@azure-rest/core-client";
import { DocumentTranslationClient } from "../../../src";
import createClient from "../../../src/documentTranslationClient";
import { KeyCredential, TokenCredential } from "@azure/core-auth";

type BodyKeySanitizers = Required<RecorderStartOptions>["sanitizerOptions"]["bodyKeySanitizers"];

export async function startRecorder(context: Context): Promise<Recorder> {
  const recorder = new Recorder(context.currentTest);
  await recorder.start({
    envSetupForPlayback: {
      DOCUMENT_TRANSLATION_API_KEY: "fakeApiKey",
      DOCUMENT_TRANSLATION_ENDPOINT: "https://fakeEndpoint-doctranslation.cognitiveservices.azure.com",
      DOCUMENT_TRANSLATION_STORAGE_NAME: "fakestoragename",
      DOCUMENT_TRANSLATION_CONNECTION_STRING: "DefaultEndpointsProtocol=https;AccountName=fakeStorageName;AccountKey=fakeKey;EndpointSuffix=core.windows.net"
    }
  });
  // SAS token may contain sensitive information
  await recorder.addSanitizers(getSanitizers(), ["record", "playback"]);
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

export function getSanitizers() {
  const bodyKeySanitizers : BodyKeySanitizers = [    
    {
      value: "Sanitized",
      jsonPath: "$..sourceUrl"
    },
    {
      value: "Sanitized",
      jsonPath: "$..targetUrl"
    },
  ];

  return {
    bodyKeySanitizers: bodyKeySanitizers,
  };
}