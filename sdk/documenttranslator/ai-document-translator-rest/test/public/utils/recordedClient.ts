// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import { Context } from "mocha";

import { env, Recorder, record, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";
import DocumentTranslator, { DocumentTranslatorClient } from "../../../src";

import "./env";
import { ClientOptions } from "@azure-rest/core-client";

const replaceableVariables: { [k: string]: string } = {
  DOCUMENT_TRANSLATOR_API_KEY: "api_key",
  ENDPOINT: "https://endpoint/",
};

export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string =>
      recording.replace(/"access_token"\s?:\s?"[^"]*"/g, `"access_token":"access_token"`),
    // If we put ENDPOINT in replaceableVariables above, it will not capture
    // the endpoint string used with nock, which will be expanded to
    // https://<endpoint>:443/ and therefore will not match, so we have to do
    // this instead.
    (recording: string): string => {
      const replaced = recording.replace("endpoint:443", "endpoint");
      return replaced;
    },
  ],
  queryParametersToSkip: [],
};

export function createClient(options?: ClientOptions): DocumentTranslatorClient {
  const credential = { key: env.DOCUMENT_TRANSLATOR_API_KEY };
  return DocumentTranslator(env.ENDPOINT, credential, options);
}

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export function createRecorder(context: Context): Recorder {
  return record(context, environmentSetup);
}
