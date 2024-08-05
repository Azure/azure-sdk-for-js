// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, RecorderStartOptions, SanitizerOptions, env } from "@azure-tools/test-recorder";
import { TableClient, TableServiceClient, TableServiceClientOptions } from "../../../src";

import { createTestCredential } from "@azure-tools/test-credential";

const mockAccountName = "fakeaccountname";
const fakeConnString =
  "TableEndpoint=https://fakeaccountname.table.core.windows.net/;SharedAccessSignature=st=2021-08-03T08:52:15Z&spr=https&sig=fakesigval";
const replaceableVariables: { [k: string]: string } = {
  ACCOUNT_NAME: `${mockAccountName}`,
  TABLES_URL: `https://fakeaccountname.table.core.windows.net`,
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
};

const sanitizerOptions: SanitizerOptions = {
  removeHeaderSanitizer: { headersForRemoval: ["Connection", "Accept-Charset"] },
  connectionStringSanitizers: [
    {
      actualConnString: env.SAS_CONNECTION_STRING,
      fakeConnString: fakeConnString,
    },
  ],
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  sanitizerOptions,
};

export type CreateClientMode = "TokenCredential";

export async function createTableClient(
  tableName: string,
  recorder?: Recorder,
): Promise<TableClient> {
  let options: TableServiceClientOptions = {};

  if (recorder) {
    await recorder.start(recorderOptions);
    await recorder.setMatcher("HeaderlessMatcher");
    options = { ...options, ...recorder.configureClientOptions({ allowInsecureConnection: true }) };
  }

  const credential = createTestCredential();
  const client = new TableClient(env.TABLES_URL ?? "", tableName, credential, options);

  return client;
}

export async function createTableServiceClient(recorder?: Recorder): Promise<TableServiceClient> {
  let options: TableServiceClientOptions = {};

  if (recorder) {
    await recorder.start(recorderOptions);
    await recorder.setMatcher("HeaderlessMatcher");
    options = { ...options, ...recorder.configureClientOptions({ allowInsecureConnection: true }) };
  }

  const credential = createTestCredential();
  const client = new TableServiceClient(env.TABLES_URL ?? "", credential, {
    ...options,
    version: "2020-12-06",
  });

  return client;
}
