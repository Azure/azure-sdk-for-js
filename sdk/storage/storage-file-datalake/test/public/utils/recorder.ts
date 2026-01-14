// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RecorderStartOptions,
  Recorder,
  FindReplaceSanitizer,
  HeaderSanitizer,
} from "@azure-tools/test-recorder";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { StorageClient } from "../../../src/StorageClient.js";
import {
  getDfsStorageConnectionString,
  getDfsSoftDeleteStorageConnectionString,
  getDfsStorageConnectionStringWithSas,
  getDfsSoftDeleteStorageConnectionStringWithSas,
  getDfsAccountUrl,
  getDfsSoftDeleteAccountUrl,
  getEncryptionScope1,
  getEncryptionScope2,
} from "../../utils/injectables.js";
import * as MOCKS from "../../utils/constants.js";

const dynamicConnectionStringSanitizers = (
  [
    [getDfsStorageConnectionString(), MOCKS.DFS_STORAGE_CONNECTION_STRING],
    [getDfsSoftDeleteStorageConnectionString(), MOCKS.DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING],
    [getDfsStorageConnectionStringWithSas(), MOCKS.DFS_STORAGE_CONNECTION_STRING_WITH_SAS],
    [
      getDfsSoftDeleteStorageConnectionStringWithSas(),
      MOCKS.DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS,
    ],
  ] as Array<[string | undefined, string]>
)
  .filter(([target]) => Boolean(target))
  .map(([actualConnString, fakeConnString]) => ({ actualConnString, fakeConnString }));

const sasUriSanitizers: FindReplaceSanitizer[] = [
  {
    regex: true,
    target: `(?<param>_=[^&]+&?)`,
    groupForReplace: "param",
    value: "",
  },
  { regex: true, target: "sig=[^&#]+", value: "sig=sanitizedsig" },
  { regex: true, target: "se=[^&#]+", value: "se=sanitizedexpiry" },
  { regex: true, target: "sktid=[^&#]+", value: "sktid=sanitizedsktid" },
  { regex: true, target: "skoid=[^&#]+", value: "skoid=sanitizedskoid" },
  { regex: true, target: "ses=[^&#]+", value: "ses=sanitizedses" },
  { regex: true, target: "st=[^&#]+", value: "st=sanitizedspr" },
];

const headerSanitizers: HeaderSanitizer[] = [
  { key: "x-ms-date", value: "Sat, 01 Jan 2000 00:00:00 GMT" },
  { key: "x-ms-proposed-lease-id", value: "sanitizedid" },
  { key: "x-ms-lease-id", value: "sanitizedid" },
  { key: "x-ms-encryption-key", value: MOCKS.CUSTOMER_PROVIDED_KEY.encryptionKey },
  { key: "x-ms-encryption-key-sha256", value: MOCKS.CUSTOMER_PROVIDED_KEY.encryptionKeySha256 },
  { key: "x-ms-encryption-scope", value: MOCKS.ENCRYPTION_SCOPE_1 },
  { key: "x-ms-default-encryption-scope", value: MOCKS.ENCRYPTION_SCOPE_1 },
  ...sasUriSanitizers.map((s) => ({
    ...s,
    key: "x-ms-copy-source",
  })),
];

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {},
  sanitizerOptions: {
    uriSanitizers: (() => {
      const list = [
        { target: getDfsAccountUrl(), value: MOCKS.DFS_ACCOUNT_URL },
        { target: getDfsSoftDeleteAccountUrl(), value: MOCKS.DFS_SOFT_DELETE_ACCOUNT_URL },
      ];
      return list.filter((s) => Boolean(s.target)) as FindReplaceSanitizer[];
    })(),
    connectionStringSanitizers: dynamicConnectionStringSanitizers,
    headerSanitizers,
    bodySanitizers: [
      {
        target: getEncryptionScope1(),
        value: MOCKS.ENCRYPTION_SCOPE_1,
      },
      {
        target: getEncryptionScope2(),
        value: MOCKS.ENCRYPTION_SCOPE_2,
      },
    ],
  },
  removeCentralSanitizers: [
    "AZSDK2008", // x-ms-copy-source header - need copy source that is not "sanitized"
    "AZSDK4001", // Host names in URIs - handled by custom URI sanitizers
    "AZSDK2011", // x-ms-encryption-key-sha256 - provided fake value
    "AZSDK3493", // $..name - blob/file names needed for test assertions
  ],
};

/**
 * Starts the recorder and adds all necessary sanitizers.
 * Call this in beforeEach when not using the client factory functions.
 */
export async function startRecording(recorder: Recorder): Promise<void> {
  if (!recorder.recordingId) {
    await recorder.start(recorderOptions);
    await recorder.addSanitizers({ uriSanitizers: sasUriSanitizers, headerSanitizers }, [
      "record",
      "playback",
    ]);
  }
}

/**
 * Configures a storage client to use the recorder.
 * The recorder must already be started.
 */
export function configureStorageClient(recorder: Recorder, client: StorageClient): void {
  const options = recorder.configureClientOptions({});

  const pipeline: Pipeline = client["storageClientContext"].pipeline;
  for (const { policy } of options.additionalPolicies ?? []) {
    pipeline.addPolicy(policy, { afterPhase: "Sign", afterPolicies: ["injectorPolicy"] });
  }
}

/**
 * Ensures the recorder is started and configures the client.
 * This is the preferred method when using client factory functions.
 */
export async function ensureClientRecording(
  recorder: Recorder | undefined,
  client: StorageClient,
): Promise<void> {
  if (!recorder) return;
  await startRecording(recorder);
  configureStorageClient(recorder, client);
}
