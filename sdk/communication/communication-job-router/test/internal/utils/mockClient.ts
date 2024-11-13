// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as dotenv from "dotenv";
import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import { JobRouterAdministrationClient, JobRouterClient } from "../../../src/index.js";
import { isNode } from "@azure/core-util";
import type { JobRouterAdministrationClientOptions, JobRouterClientOptions } from "../../../src/index.js";
import { createRecorder } from "./recordedClient.js";

if (isNode) {
  dotenv.config();
}

export interface RecordedRouterClient {
  client: JobRouterClient;
  administrationClient: JobRouterAdministrationClient;
  recorder: Recorder;
}

export async function createRecordedRouterClientWithConnectionString(
  context: Context,
): Promise<RecordedRouterClient> {
  const recorder = await createRecorder(context.currentTest);

  return {
    client: new JobRouterClient(
      env.COMMUNICATION_CONNECTION_STRING as string,
      recorder.configureClientOptions({}) as JobRouterClientOptions,
    ),
    administrationClient: new JobRouterAdministrationClient(
      env.COMMUNICATION_CONNECTION_STRING as string,
      recorder.configureClientOptions({}) as JobRouterAdministrationClientOptions,
    ),
    recorder,
  };
}
