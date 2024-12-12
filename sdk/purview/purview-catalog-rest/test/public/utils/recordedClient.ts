// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/// <reference lib="esnext.asynciterable" />

import type { PurviewCatalogClient } from "../../../src/index.js";
import PurviewCatalog from "../../../src/index.js";
import { createTestCredential } from "@azure-tools/test-credential";
import type { ClientOptions } from "@azure-rest/core-client";

import type { Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";

const replaceableVariables: { [k: string]: string } = {
  ENDPOINT: "https://endpoint/",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3478", // .accountname in the body is not a secret and is listed below in the beforeEach section
    "AZSDK2030", // .operation-location in the body is not a secret and is listed below in the beforeEach section
  ],
};

export async function createClient(
  recorder: Recorder,
  options?: ClientOptions,
): Promise<PurviewCatalogClient> {
  const credential = createTestCredential();

  await recorder.start(recorderOptions);

  return PurviewCatalog(
    env.ENDPOINT ?? "",
    credential,
    recorder.configureClientOptions({
      options,
    }),
  );
}
