// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as dotenv from "dotenv";
import { Recorder, env } from "@azure-tools/test-recorder";
import { JobRouterAdministrationClient, JobRouterClient } from "../../../src";
import { Context } from "mocha";
import { isNode } from "@azure/core-util";
import { JobRouterAdministrationClientOptions, JobRouterClientOptions } from "../../../src";
import { createRecorder } from "./recordedClient";

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
