// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import "./env.js";
import type { ClientOptions } from "@azure-rest/core-client";
import { UsernamePasswordCredential } from "@azure/identity";
import { NoOpCredential } from "@azure-tools/test-credential";
import type { PurviewWorkflowClient } from "../../../src/index.js";
import PurviewWorkflow from "../../../src/index.js";

const envSetupForPlayback: Record<string, string> = {
  ENDPOINT: "https://endpoint",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback,
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
): Promise<PurviewWorkflowClient> {
  const credential = isPlaybackMode()
    ? new NoOpCredential()
    : new UsernamePasswordCredential(
        env["AZURE_TENANT_ID"] ?? "",
        env["AZURE_CLIENT_ID"] ?? "",
        env["USERNAME"] ?? "",
        env["PASSWORD"] ?? "",
      );
  await recorder.start(recorderEnvSetup);
  return PurviewWorkflow(
    env.ENDPOINT ?? "",
    credential,
    recorder.configureClientOptions({
      options,
    }),
  );
}
