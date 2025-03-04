// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Recorder, env } from "@azure-tools/test-recorder";
import type { ClientOptions } from "@azure-rest/core-client";
import type { DocumentTranslationClient } from "../../../src/index.js";
import { default as createClient } from "../../../src/index.js";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { createTestCredential } from "@azure-tools/test-credential";
import type { TestContext } from "vitest";

export async function startRecorder(context: TestContext): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start({
    envSetupForPlayback: {
      DOCUMENT_TRANSLATION_ENDPOINT:
        "https://fakeEndpoint-doctranslation.cognitiveservices.azure.com",
      DOCUMENT_TRANSLATION_STORAGE_NAME: "fakestoragename",
    },
    removeCentralSanitizers: ["AZSDK2030", "AZSDK3430"],
  });
  // SAS token may contain sensitive information
  await recorder.addSanitizers(
    {
      bodyKeySanitizers: [
        {
          value: "Sanitized",
          jsonPath: "$..sourceUrl",
        },
        {
          value: "Sanitized",
          jsonPath: "$..targetUrl",
        },
        {
          value: "Sanitized",
          jsonPath: "$..glossaryUrl",
        },
      ],
    },
    ["record", "playback"],
  );
  return recorder;
}

export async function createDocumentTranslationClient(options: {
  recorder?: Recorder;
  testCredential?: TokenCredential;
  clientOptions?: ClientOptions;
}): Promise<DocumentTranslationClient> {
  const { recorder, clientOptions = {} } = options;
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;
  const endpoint = env.DOCUMENT_TRANSLATION_ENDPOINT ?? "";
  const credentials = options?.testCredential ?? createTestCredential();
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
