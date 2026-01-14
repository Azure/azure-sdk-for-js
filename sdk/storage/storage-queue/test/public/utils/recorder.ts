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
  getStorageConnectionString,
  getStorageConnectionStringWithSas,
  getAccountQueueUrl,
} from "../../utils/injectables.js";
import * as MOCKS from "../../utils/constants.js";

const dynamicConnectionStringSanitizers = (
  [
    [getStorageConnectionString(), MOCKS.STORAGE_CONNECTION_STRING],
    [getStorageConnectionStringWithSas(), MOCKS.STORAGE_CONNECTION_STRING_WITH_SAS],
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
];

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {},
  sanitizerOptions: {
    uriSanitizers: (() => {
      const list = [{ target: getAccountQueueUrl(), value: MOCKS.ACCOUNT_QUEUE_URL }];
      return list.filter((s) => Boolean(s.target)) as FindReplaceSanitizer[];
    })(),
    connectionStringSanitizers: dynamicConnectionStringSanitizers,
    headerSanitizers,
  },
  removeCentralSanitizers: ["AZSDK2008", "AZSDK4001", "AZSDK2011"],
};

export async function ensureClientRecording<
  ClientT extends Omit<StorageClient, "isHttps" | "credential">,
>(recorder: Recorder | undefined, client: ClientT): Promise<void> {
  if (!recorder) return;
  if (!recorder.recordingId) {
    await recorder.start(recorderOptions);
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
