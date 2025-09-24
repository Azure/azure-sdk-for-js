// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RecorderStartOptions,
  Recorder,
  FindReplaceSanitizer,
  HeaderSanitizer,
} from "@azure-tools/test-recorder";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { StorageClient } from "@azure/storage-blob";
import {
  getStorageConnectionString,
  getDfsStorageConnectionString,
  getFullStorageConnectionString,
  getPremiumFileStorageConnectionString,
  getSoftDeleteStorageConnectionString,
  getDfsSoftDeleteStorageConnectionString,
  getStorageConnectionStringWithSas,
  getDfsStorageConnectionStringWithSas,
  getFullStorageConnectionStringWithSas,
  getPremiumFileStorageConnectionStringWithSas,
  getSoftDeleteStorageConnectionStringWithSas,
  getDfsSoftDeleteStorageConnectionStringWithSas,
  getAccountBlobUrl,
  getDfsAccountBlobUrl,
  getFullAccountBlobUrl,
  getSoftDeleteAccountBlobUrl,
  getDfsSoftDeleteAccountBlobUrl,
  getAccountFileUrl,
  getDfsAccountFileUrl,
  getFullAccountFileUrl,
  getSoftDeleteAccountFileUrl,
  getPremiumFileAccountFileUrl,
  getDfsSoftDeleteAccountFileUrl,
  getAccountQueueUrl,
  getDfsAccountQueueUrl,
  getFullAccountQueueUrl,
  getSoftDeleteAccountQueueUrl,
  getDfsSoftDeleteAccountQueueUrl,
  getEncryptionScope1,
  getEncryptionScope2,
  getMdAccountName,
} from "../../utils/injectables.js";
import * as MOCKS from "../../utils/constants.js";

const dynamicConnectionStringSanitizers = (
  [
    [getStorageConnectionString(), MOCKS.STORAGE_CONNECTION_STRING],
    [getDfsStorageConnectionString(), MOCKS.DFS_STORAGE_CONNECTION_STRING],
    [getFullStorageConnectionString(), MOCKS.FULL_STORAGE_CONNECTION_STRING],
    [getPremiumFileStorageConnectionString(), MOCKS.PREMIUM_FILE_STORAGE_CONNECTION_STRING],
    [getSoftDeleteStorageConnectionString(), MOCKS.SOFT_DELETE_STORAGE_CONNECTION_STRING],
    [getDfsSoftDeleteStorageConnectionString(), MOCKS.DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING],
    [getStorageConnectionStringWithSas(), MOCKS.STORAGE_CONNECTION_STRING_WITH_SAS],
    [getDfsStorageConnectionStringWithSas(), MOCKS.DFS_STORAGE_CONNECTION_STRING_WITH_SAS],
    [getFullStorageConnectionStringWithSas(), MOCKS.FULL_STORAGE_CONNECTION_STRING_WITH_SAS],
    [
      getPremiumFileStorageConnectionStringWithSas(),
      MOCKS.PREMIUM_FILE_STORAGE_CONNECTION_STRING_WITH_SAS,
    ],
    [
      getSoftDeleteStorageConnectionStringWithSas(),
      MOCKS.SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS,
    ],
    [
      getDfsSoftDeleteStorageConnectionStringWithSas(),
      MOCKS.DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS,
    ],
  ] as Array<[string | undefined, string]>
)
  .filter(([target]) => Boolean(target))
  .map(([actualConnString, fakeConnString]) => ({ actualConnString, fakeConnString }));

export const sasUriSanitizers: FindReplaceSanitizer[] = [
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
  { key: "x-ms-encryption-key", value: MOCKS.CUSTOMER_PROVIDED_KEY.encryptionKey },
  { key: "x-ms-encryption-key-sha256", value: MOCKS.CUSTOMER_PROVIDED_KEY.encryptionKeySha256 },
  { key: "x-ms-encryption-algorithm", value: MOCKS.CUSTOMER_PROVIDED_KEY.encryptionAlgorithm },
  { key: "x-ms-encryption-scope", value: MOCKS.ENCRYPTION_SCOPE_1 },
  { key: "x-ms-default-encryption-scope", value: MOCKS.ENCRYPTION_SCOPE_1 },
  { key: "x-ms-proposed-lease-id", value: "sanitizedid" },
  { key: "x-ms-lease-id", value: "sanitizedid" },
  ...sasUriSanitizers.map((s) => ({
    ...s,
    key: "x-ms-copy-source",
  })),
];

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {},
  sanitizerOptions: {
    uriSanitizers: (() => {
      const list = [
        { target: getAccountBlobUrl(), value: MOCKS.ACCOUNT_BLOB_URL },
        { target: getDfsAccountBlobUrl(), value: MOCKS.DFS_ACCOUNT_BLOB_URL },
        { target: getFullAccountBlobUrl(), value: MOCKS.FULL_ACCOUNT_BLOB_URL },
        { target: getSoftDeleteAccountBlobUrl(), value: MOCKS.SOFT_DELETE_ACCOUNT_BLOB_URL },
        { target: getDfsSoftDeleteAccountBlobUrl(), value: MOCKS.DFS_SOFT_DELETE_ACCOUNT_BLOB_URL },
        { target: getAccountFileUrl(), value: MOCKS.ACCOUNT_FILE_URL },
        { target: getDfsAccountFileUrl(), value: MOCKS.DFS_ACCOUNT_FILE_URL },
        { target: getFullAccountFileUrl(), value: MOCKS.FULL_ACCOUNT_FILE_URL },
        { target: getSoftDeleteAccountFileUrl(), value: MOCKS.SOFT_DELETE_ACCOUNT_FILE_URL },
        { target: getPremiumFileAccountFileUrl(), value: MOCKS.PREMIUM_FILE_ACCOUNT_FILE_URL },
        { target: getDfsSoftDeleteAccountFileUrl(), value: MOCKS.DFS_SOFT_DELETE_ACCOUNT_FILE_URL },
        { target: getAccountQueueUrl(), value: MOCKS.ACCOUNT_QUEUE_URL },
        { target: getDfsAccountQueueUrl(), value: MOCKS.DFS_ACCOUNT_QUEUE_URL },
        { target: getFullAccountQueueUrl(), value: MOCKS.FULL_ACCOUNT_QUEUE_URL },
        { target: getSoftDeleteAccountQueueUrl(), value: MOCKS.SOFT_DELETE_ACCOUNT_QUEUE_URL },
        {
          target: getDfsSoftDeleteAccountQueueUrl(),
          value: MOCKS.DFS_SOFT_DELETE_ACCOUNT_QUEUE_URL,
        },
      ];
      const mdName = getMdAccountName();
      if (mdName) {
        list.push({ target: mdName, value: MOCKS.MD_ACCOUNT_NAME });
      }
      return list;
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
  removeCentralSanitizers: ["AZSDK2008", "AZSDK4001", "AZSDK2011"],
};

export async function ensureClientRecording<
  ClientT extends Omit<StorageClient, "isHttps" | "credential">,
>(recorder: Recorder | undefined, client: ClientT): Promise<void> {
  if (!recorder) return;
  // Only call start/addSanitizers once per recording session
  if (!recorder.recordingId) {
    await recorder.start(recorderOptions);
    // Ensure both URI and header sanitizers that are required for matching (not just redaction)
    // are applied in BOTH record & playback phases. Otherwise, during playback the request
    // will contain raw values (e.g. real SAS expiry) while the recording has sanitized
    // placeholders (e.g. se=SanitizedExpiry) causing match failures.
    await recorder.addSanitizers(
      { uriSanitizers: sasUriSanitizers, headerSanitizers: headerSanitizers },
      ["record", "playback"],
    );
  }
  const options = recorder.configureClientOptions({});

  const pipeline: Pipeline = (client as any).storageClientContext.pipeline;
  for (const { policy } of options.additionalPolicies ?? []) {
    pipeline.addPolicy(policy, { afterPhase: "Sign", afterPolicies: ["injectorPolicy"] });
  }
}
