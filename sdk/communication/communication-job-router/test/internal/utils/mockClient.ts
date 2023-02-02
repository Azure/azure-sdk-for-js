// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";
import { Recorder, env } from "@azure-tools/test-recorder";
import { RouterAdministrationClient, RouterClient } from "../../../src";
import { Context } from "mocha";
import { isNode } from "@azure/core-util";
import { RouterAdministrationClientOptions, RouterClientOptions } from "../../../src";
import { createRecorder } from "../../public/utils/recordedClient";

if (isNode) {
  dotenv.config();
}

export interface RecordedRouterClient {
  client: RouterClient;
  administrationClient: RouterAdministrationClient;
  recorder: Recorder;
}

export async function createRecordedRouterClientWithConnectionString(
  context: Context
): Promise<RecordedRouterClient> {
  const recorder = await createRecorder(context.currentTest);

  return {
    client: new RouterClient(
      env.COMMUNICATION_CONNECTION_STRING as string,
      recorder.configureClientOptions({}) as RouterClientOptions
    ),
    administrationClient: new RouterAdministrationClient(
      env.COMMUNICATION_CONNECTION_STRING as string,
      recorder.configureClientOptions({}) as RouterAdministrationClientOptions
    ),
    recorder,
  };
}
