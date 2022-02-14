// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import PurviewCatalog, { PurviewCatalogRestClient } from "../../../src";
import { createTestCredential } from "@azure-tools/test-credential";
import { ClientOptions } from "@azure-rest/core-client";
import { createXhrHttpClient, isNode } from "@azure/test-utils";
import * as dotenv from "dotenv";

import { env, Recorder, RecorderStartOptions, isLiveMode } from "@azure-tools/test-recorder";

if (isNode) {
  dotenv.config();
}

const replaceableVariables: { [k: string]: string } = {
  ENDPOINT: "https://endpoint",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
};

export async function createClient(
  recorder: Recorder,
  options?: ClientOptions
): Promise<PurviewCatalogRestClient> {
  const httpClient = isNode || isLiveMode() ? undefined : createXhrHttpClient();
  const credential = createTestCredential();

  await recorder.start(recorderOptions);

  return PurviewCatalog(
    env.ENDPOINT ?? "",
    credential,
    recorder.configureClientOptions({
      ...options,
      httpClient,
    })
  );
}
