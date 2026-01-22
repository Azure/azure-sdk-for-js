// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RecorderStartOptions,
  Recorder,
  FindReplaceSanitizer,
  HeaderSanitizer,
} from "@azure-tools/test-recorder";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { BlobChangeFeedClient } from "@azure/storage-blob-changefeed";
import {
  getStorageConnectionString,
  getAccountBlobUrl,
  getDfsAccountBlobUrl,
} from "../injectables.js";
import * as MOCKS from "../constants.js";

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
];

const dynamicConnectionStringSanitizers = (
  [[getStorageConnectionString(), MOCKS.STORAGE_CONNECTION_STRING]] as Array<
    [string | undefined, string]
  >
)
  .filter(([target]) => Boolean(target))
  .map(([actualConnString, fakeConnString]) => ({ actualConnString, fakeConnString }));

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {},
  sanitizerOptions: {
    uriSanitizers: [
      { target: getAccountBlobUrl(), value: MOCKS.ACCOUNT_BLOB_URL },
      { target: getDfsAccountBlobUrl(), value: MOCKS.DFS_ACCOUNT_BLOB_URL },
    ],
    connectionStringSanitizers: dynamicConnectionStringSanitizers,
    headerSanitizers,
  },
  removeCentralSanitizers: ["AZSDK2008", "AZSDK4001", "AZSDK2011"],
};

export async function ensureClientRecording(
  recorder: Recorder | undefined,
  client: BlobChangeFeedClient,
): Promise<void> {
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

  const pipeline: Pipeline = client["blobServiceClient"]["storageClientContext"].pipeline;
  for (const { policy } of options.additionalPolicies ?? []) {
    pipeline.addPolicy(policy, { afterPhase: "Sign", afterPolicies: ["injectorPolicy"] });
  }
}
