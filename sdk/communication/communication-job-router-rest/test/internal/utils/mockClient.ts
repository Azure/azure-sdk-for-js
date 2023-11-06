// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import * as dotenv from "dotenv";
import { Recorder, env } from "@azure-tools/test-recorder";
import JobRouter from "../../../src";
import { AzureCommunicationRoutingServiceClient } from "../../../src";
import { Context } from "mocha";
import { isNode } from "@azure/core-util";
import { createRecorder } from "../../public/utils/recordedClient";

if (isNode) {
  dotenv.config();
}

export interface RecordedRouterClient {
  routerClient: AzureCommunicationRoutingServiceClient;
  recorder: Recorder;
}

export async function createRecordedRouterClientWithConnectionString(
  context: Context
): Promise<RecordedRouterClient> {
  const recorder = await createRecorder(context);

  return {
    routerClient: JobRouter(
      env.COMMUNICATION_CONNECTION_STRING as string,
      undefined,
      recorder.configureClientOptions({}) as ClientOptions
    ),
    recorder,
  };
}
