// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNamedKeyCredential, AzureSASCredential } from "@azure/core-auth";
import type { Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import type { TableServiceClientOptions } from "@azure/data-tables";
import { TableClient, TableServiceClient } from "@azure/data-tables";
import { createTestCredential } from "@azure-tools/test-credential";
import {
  getAccountConnectionString,
  getEndpoint,
  getKey,
  getSasConnectionString,
  getSasToken,
  getAccountName,
  isSharedKeyAccessAllowed,
} from "../../utils/injectables.js";
import * as MOCKS from "../../utils/constants.js";
import { EnvVarKeys } from "../../utils/constants.js";

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {
    [EnvVarKeys.ENDPOINT]: MOCKS.ENDPOINT,
    [EnvVarKeys.ACCOUNT_NAME]: MOCKS.ACCOUNT_NAME,
  },
  sanitizerOptions: {
    uriSanitizers: [
      {
        target: getEndpoint(),
        value: MOCKS.ENDPOINT,
      },
      {
        target: getSasToken(),
        value: MOCKS.SAS_TOKEN,
      },
    ],
    removeHeaderSanitizer: { headersForRemoval: ["Connection", "Accept-Charset"] },
    connectionStringSanitizers: [
      {
        actualConnString: getSasConnectionString(),
        fakeConnString: MOCKS.SAS_CONNECTION_STRING,
      },
      {
        actualConnString: getAccountConnectionString(),
        fakeConnString: MOCKS.CONNECTION_STRING,
      },
    ],
  },
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret
    "AZSDK2015",
    "AZSDK2021",
    "AZSDK2030",
    "AZSDK2031",
    "AZSDK3430",
    "AZSDK4000",
    "AZSDK4001",
    "AZSDK1007",
  ],
};

const createClientModes = [
  "SASConnectionString",
  "SASToken",
  "AccountKey",
  "AccountConnectionString",
  "TokenCredential",
] as const;

export type CreateClientMode = (typeof createClientModes)[number];

export async function createTableClient(
  tableName: string,
  mode: "TokenCredential",
  recorder?: Recorder,
): Promise<TableClient>;
export async function createTableClient(
  tableName: string,
  mode: CreateClientMode,
  recorder?: Recorder,
): Promise<TableClient | undefined>;
export async function createTableClient(
  tableName: string,
  mode: CreateClientMode,
  recorder?: Recorder,
): Promise<TableClient | undefined> {
  let options: TableServiceClientOptions = {};

  if (recorder) {
    await recorder.start(recorderOptions);
    await recorder.setMatcher("HeaderlessMatcher");
    options = { ...options, ...recorder.configureClientOptions({ allowInsecureConnection: true }) };
  }

  let client: TableClient;
  if (
    !isSharedKeyAccessAllowed() &&
    ["SASConnectionString", "SasToken", "AccountKey", "AccountConnectionString"].includes(mode)
  ) {
    return undefined;
  }
  switch (mode) {
    case "SASConnectionString":
      client = TableClient.fromConnectionString(getSasConnectionString(), tableName, options);
      break;

    case "SASToken":
      client = new TableClient(
        getEndpoint(),
        tableName,
        new AzureSASCredential(getSasToken()),
        options,
      );
      break;

    case "AccountKey":
      client = new TableClient(
        getEndpoint(),
        tableName,
        new AzureNamedKeyCredential(getAccountName(), getKey()),
        options,
      );
      break;

    case "TokenCredential": {
      const credential = createTestCredential();
      client = new TableClient(getEndpoint(), tableName, credential, options);
      break;
    }

    case "AccountConnectionString":
      client = TableClient.fromConnectionString(getAccountConnectionString(), tableName, options);
      break;

    default:
      throw new Error(`Unknown authentication mode ${mode}`);
  }

  return client;
}

export async function createTableServiceClient(
  mode: CreateClientMode = "SASConnectionString",
  recorder?: Recorder,
): Promise<TableServiceClient> {
  let options: TableServiceClientOptions = {};

  if (recorder) {
    await recorder.start(recorderOptions);
    await recorder.setMatcher("HeaderlessMatcher");
    options = { ...options, ...recorder.configureClientOptions({ allowInsecureConnection: true }) };
  }

  let client: TableServiceClient;

  switch (mode) {
    case "SASConnectionString":
      client = TableServiceClient.fromConnectionString(getSasConnectionString(), options);
      break;

    case "SASToken":
      client = new TableServiceClient(`${getEndpoint()}?${getSasToken()}`, options);
      break;

    case "AccountKey":
      client = new TableServiceClient(
        getEndpoint(),
        new AzureNamedKeyCredential(getAccountName(), getKey()),
        options,
      );
      break;

    case "TokenCredential": {
      const credential = createTestCredential();
      client = new TableServiceClient(getEndpoint(), credential, {
        ...options,
        version: "2020-12-06",
      });
      break;
    }

    case "AccountConnectionString":
      client = TableServiceClient.fromConnectionString(getAccountConnectionString(), options);
      break;

    default:
      throw new Error(`Unknown authentication mode ${mode}`);
  }

  return client;
}
