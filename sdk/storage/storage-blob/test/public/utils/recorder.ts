// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RecorderStartOptions,
  Recorder,
  FindReplaceSanitizer,
  HeaderSanitizer,
} from "@azure-tools/test-recorder";
import type { Pipeline } from "@azure/core-rest-pipeline";
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

// Block ID sanitizer: the blockid is base64(UUID+paddedIndex)
// UUID = 36 chars, index = 12 chars, total = 48 chars → 64 base64 chars
// Replace first 48 base64 chars (UUID part), keep last 16 chars (index part)
const BLOCK_ID_SANITIZER: FindReplaceSanitizer = {
  regex: true,
  target: "blockid=(?<uuid>[A-Za-z0-9+/=]{48})(?<index>[A-Za-z0-9+/=]{16})",
  groupForReplace: "uuid",
  value: "c2FuaXRpemVkLWJsb2NrLWlkLXByZWZpeC1zYW5pdGl6ZWQ=",
};

// Block ID sanitizer for XML body in commitBlockList requests
const BLOCK_ID_BODY_SANITIZER: FindReplaceSanitizer = {
  regex: true,
  target: "<Latest>(?<uuid>[A-Za-z0-9+/=]{48})(?<index>[A-Za-z0-9+/=]{16})</Latest>",
  groupForReplace: "uuid",
  value: "c2FuaXRpemVkLWJsb2NrLWlkLXByZWZpeC1zYW5pdGl6ZWQ=",
};

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

// Sanitizers for SAS parameters and block IDs in URIs - applied in both record and playback
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
  BLOCK_ID_SANITIZER,
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

// Sanitizers that must be applied in both record and playback modes for request matching
const matchingSanitizers = {
  uriSanitizers: sasUriSanitizers,
  headerSanitizers,
  bodySanitizers: [BLOCK_ID_BODY_SANITIZER],
};

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
      { target: getEncryptionScope1(), value: MOCKS.ENCRYPTION_SCOPE_1 },
      { target: getEncryptionScope2(), value: MOCKS.ENCRYPTION_SCOPE_2 },
    ],
  },
  removeCentralSanitizers: ["AZSDK2008", "AZSDK4001", "AZSDK2011"],
};

export async function ensureClientRecording(
  recorder: Recorder | undefined,
  client: { url: string; accountName: string },
): Promise<void> {
  if (!recorder) return;
  // Only call start/addSanitizers once per recording session
  if (!recorder.recordingId) {
    await recorder.start(recorderOptions);
    // Ensure sanitizers required for request matching are applied in BOTH record & playback.
    // Otherwise, during playback the request will contain raw values while the recording
    // has sanitized placeholders, causing match failures.
    await recorder.addSanitizers(matchingSanitizers, ["record", "playback"]);
  }
  const options = recorder.configureClientOptions({});

  const pipeline: Pipeline = (client as any).storageClientContext.pipeline;
  for (const { policy } of options.additionalPolicies ?? []) {
    pipeline.addPolicy(policy, { afterPhase: "Sign", afterPolicies: ["injectorPolicy"] });
  }
}
