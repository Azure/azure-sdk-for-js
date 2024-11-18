// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as dotenv from "dotenv";
import type { Recorder, TestInfo } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import { JobRouterAdministrationClient, JobRouterClient } from "../../../src/index.js";
import { isNodeLike } from "@azure/core-util";
import type {
  JobRouterAdministrationClientOptions,
  JobRouterClientOptions,
} from "../../../src/index.js";
import { createRecorder } from "./recordedClient.js";

if (isNodeLike) {
  dotenv.config();
}

export interface RecordedRouterClient {
  client: JobRouterClient;
  administrationClient: JobRouterAdministrationClient;
  recorder: Recorder;
}

export async function createRecordedRouterClientWithConnectionString(
  context: TestInfo,
): Promise<RecordedRouterClient> {
  const recorder = await createRecorder(context);

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
