// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, type RecorderStartOptions } from "@azure-tools/test-recorder";
import type { ClientOptions } from "@azure-rest/core-client";
import type { DocumentTranslationClient } from "@azure-rest/ai-translation-document";
import { default as createClient } from "@azure-rest/ai-translation-document";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { createTestCredential } from "@azure-tools/test-credential";
import type { TestContext } from "vitest";
import { getBlobEndpoint, getEndpoint } from "../../utils/injectables.js";
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
      {
        key: "operation-location",
        value: MOCKS.ENDPOINT,
        target: getEndpoint(),
      },
    ],
    bodySanitizers: [
      {
        target: getBlobEndpoint(),
        value: MOCKS.BLOB_ENDPOINT,
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

export async function startRecorder(context: TestContext): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

export async function createDocumentTranslationClient(options: {
  recorder?: Recorder;
  testCredential?: TokenCredential;
  clientOptions?: ClientOptions;
}): Promise<DocumentTranslationClient> {
  const { recorder, clientOptions = {} } = options;
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;
  const credentials = options?.testCredential ?? createTestCredential();
  return createClient(getEndpoint(), credentials, updatedOptions);
}

export async function createDocumentTranslationClientWithEndpointAndCredentials(options: {
  recorder?: Recorder;
  endpointParam: string;
  credentials: TokenCredential | KeyCredential;
  clientOptions?: ClientOptions;
}): Promise<DocumentTranslationClient> {
  const { recorder, clientOptions = {} } = options;
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;
  return createClient(options.endpointParam, options.credentials, updatedOptions);
}
